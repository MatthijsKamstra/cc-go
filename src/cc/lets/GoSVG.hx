package cc.lets;

import haxe.Timer;
import js.Browser.*;
import cc.lets.Easing;
import cc.lets.easing.Quad;
import cc.lets.easing.IEasing;
import js.html.svg.Rect;
import js.html.svg.SVGElement;
import js.html.svg.Element;
import js.html.svg.*;

/**


	/**
	* version
	* 		2.0.0 - Start with GoSVG/ removing timebased stuff
	* 		1.1.0 - 3D additions (z-dir)
	* 		1.0.9 - Haxe 4 update
	* 		1.0.8 - arc
	* 		1.0.7 - wiggle
	* 		1.0.6 - convert to js only
 */
@:expose
@:native("GoSVG")
class GoSVG {
	private static var _requestId:Int; // requestAnimationFrame
	private static var _tweens:Array<GoSVG> = new Array<GoSVG>();
	public static var _counter = 0;

	private var _id:String;
	private var _target:js.html.svg.Element;
	private var _duration:Int; // is set in seconds, but is eventually converted to miliseconds
	// private var _easing:Float->Float = Easing.linear;
	private var _easing:IEasing = Quad.easeOut;
	private var _options:Dynamic = cast {};
	private var _transform:Transform;
	private var _props = new Map<String, Range>();
	private var _isFrom:Bool = false;
	private var _isYoyo:Bool = false;
	private var _isCenter:Bool = false;
	private var _isWiggle:Bool = false;
	private var _isDelayDone:Bool = false; // default is frameBased
	private var _initTime:Int = 0; // should work with time (miliseconds) and frames (FPS)
	private var _delay:Int = 0;
	private var _seconds:Float = 0;
	private var FRAME_RATE:Int = 60; // 60 frames per second (FPS)
	private var DEBUG:Bool = false;
	private var VERSION:String = '2.0.0';
	// var names
	private var TRANSFORM = 'transform';

	/**
	 * Animate an object to another state (like position, scale, rotation, alpha)
	 *
	 * @example		cc.lets.GoSVG.to(foobarMc, 1.5);
	 *
	 * @param target   	object to animate
	 * @param duration 	in seconds
	 */
	public function new(target:js.html.svg.Element, duration:Float) {
		// console.log('new GoSVG($target, $duration)');
		_counter++;
		this._id = '[lets.GoSVG]$VERSION.' + Date.now().getTime();
		this._seconds = duration;
		this._target = target;
		this._duration = getDuration(duration);
		this._initTime = this._duration;
		this._transform = {};
		_tweens.push(this);
		if (DEBUG)
			console.log('New GoSVG - _id: "$_id" / _duration: '
				+ _duration
				+ ' / _initTime: '
				+ _initTime
				+ ' / _tweens.length: '
				+ _tweens.length);
		// [mck] extreme little delay to make sure all the values are set
		haxe.Timer.delay(init, 1); // 1 milisecond delay
		// [mck] TODO check if there is a tween attached to the same animation?
	}

	static inline public function test(target:js.html.svg.Element, duration:Float = 1.2):GoSVG {
		console.log('GoSVG.Test($target, $duration)');
		var _go = new GoSVG(target, duration);
		return _go;
	}

	/**
	 * tool to extract data from svg element,
	 * - start postion x svg document
	 * - start postion y svg document
	 * - start postion width svg document
	 * - start postion height	 svg document
	 *
	 * @example: 	var svgObject = GoSVG.svg(cast document.getElementById('simple-example'));
	 *
	 * @param element		SVGElement
	 * @return SVGObject
	 */
	static inline public function svg(element:js.html.svg.SVGElement):SVGObject {
		var svg:SVGElement = element;
		var _id:String = '';
		var _x:Float = 0;
		var _y:Float = 0;
		var _cx:Float = 0;
		var _cy:Float = 0;
		var _width:Float = 0;
		var _height:Float = 0;
		var tagName = element.tagName;
		trace(tagName);
		_id = tagName;
		switch (tagName) {
			case 'rect':
				_x = cast(svg, RectElement).x.baseVal.value;
				_y = cast(svg, RectElement).y.baseVal.value;
				_width = cast(svg, RectElement).width.baseVal.value;
				_height = cast(svg, RectElement).height.baseVal.value;
				_cx = cast(svg, RectElement).x.baseVal.value + (cast(svg, RectElement).width.baseVal.value / 2);
				_cy = cast(svg, RectElement).y.baseVal.value + (cast(svg, RectElement).height.baseVal.value / 2);
		}

		if (element.hasAttribute('viewBox')) {
			var svgViewBox = element.getAttribute('viewBox');
			var svgRect:Rect = (element.viewBox.baseVal);
			_width = svgRect.width;
			_height = svgRect.height;
			_x = svgRect.x;
			_y = svgRect.y;
		}
		return {
			_id: _id,
			x: _x,
			y: _y,
			width: _width,
			height: _height,
			centerX: _cx,
			centerY: _cy,
		};
	}

	/**
	 * Animate an object TO another state (like position, scale, rotation, alpha)
	 *
	 * @example		lets.GoSVG.to(foobarMc, 1.5);
	 *
	 * @param target   	object to animate
	 * @param duration 	in seconds
	 * @return          Go
	 */
	static inline public function to(target:js.html.svg.Element, duration:Float):GoSVG {
		var _go = new GoSVG(target, duration);
		_go._isFrom = false;
		return _go;
	}

	/**
	 * Animate an object FROM another state (like position, scale, rotation, alpha)
	 *
	 * @example		lets.GoSVG.from(foobarMc, 1.5);
	 *
	 * @param target   	object to animate
	 * @param duration 	in seconds
	 * @return          Go
	 */
	static inline public function from(target:Dynamic, duration:Float):GoSVG {
		var _go = new GoSVG(target, duration);
		_go._isFrom = true;
		_go.updateProperties(0); // this can't be done faster
		return _go;
	}

	/**
	 * Use Go to do a delayed call to a function
	 *
	 * @example		lets.GoSVG.timer(1.5).onComplete(onCompleteHandler);
	 *
	 * @param duration 	in seconds
	 * @return          Go
	 */
	static inline public function timer(duration:Float):GoSVG {
		var _go = new GoSVG(null, duration);
		return _go;
	}

	/**
	 * Use GoSVG.frames to create a time/delay to a functoin
	 *
	 * @example		GoSVG.frames(1).onComplete(onCompleteHandler);
	 *
	 * @param frames 	frames to wait
	 * @return GoSVG
	 */
	static inline public function frames(frames:Int):GoSVG {
		var _go = new GoSVG(null, (frames * 60));
		return _go;
	}

	/**
	 * continues wiggling of an object in random x and y dir
	 *
	 * @example		GoSVG.wiggle(foobarMc, 10, 10, 10);
	 *
	 * @param target   		object to animate
	 * @param x				centerpoint x
	 * @param y				centerpoint y
	 * @param wiggleRoom	offset from x and y
	 * @return GoSVG
	 */
	static inline public function wiggle(target:Dynamic, x:Float, y:Float, ?wiggleRoom:Float = 10):GoSVG {
		var _go = new GoSVG(target, 1 + (Math.random()));
		_go._isWiggle = true;
		var max = wiggleRoom;
		var min = -wiggleRoom;
		_go.prop('x', x + (Math.random() * (max - min)) + min);
		_go.prop('y', y + (Math.random() * (max - min)) + min);
		_go.ease(cc.lets.easing.Sine.easeInOut);
		_go.onComplete(function() {
			GoSVG.wiggle(target, x, y, wiggleRoom);
		});
		return _go;
	}

	/**
	 * continues wiggling of an object in random dir
	 *
	 * @example		GoSVG.wiggleProp(foobarMc.position, 'z', 0, 20);
	 *
	 * @param target   		object contains the data to animate
	 * @param prop			value you want to animate
	 * @param value			starting point value
	 * @param wiggleRoom	offset from starting point, max min
	 * @return GoSVG
	 */
	static inline public function wiggleProp(target:Dynamic, prop:String, value:Float, ?wiggleRoom:Float = 10):GoSVG {
		var _go = new GoSVG(target, 1 + (Math.random()));
		_go._isWiggle = true;
		var max = wiggleRoom;
		var min = -wiggleRoom;
		_go.prop(prop, value + (Math.random() * (max - min)) + min);
		_go.ease(cc.lets.easing.Sine.easeInOut);
		_go.onComplete(function() {
			GoSVG.wiggleProp(target, prop, value, wiggleRoom);
		});
		return _go;
	}

	// ____________________________________ properties ____________________________________

	/**
	 * [Description]
	 * @param value
	 * @return GoSVG
	 */
	inline public function width(value:Float):GoSVG {
		prop('width', value);
		return this;
	}

	/**
	 * [Description]
	 * @param value
	 * @return GoSVG
	 */
	inline public function height(value:Float):GoSVG {
		prop('height', value);
		return this;
	}

	/**
	 * change the x value of an object
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).x(10);
	 *
	 * @param value 	x-position
	 * @return       GoSVG
	 */
	inline public function x(value:Float):GoSVG {
		// var tagName = this._target.tagName;
		// switch (tagName) {
		// 	case 'rect':
		// 		prop('x', value);
		// 	case 'circle', 'ellipse':
		// 		prop('cx', value);
		// 	case 'line', 'polyline', 'polygon', 'path', 'g':
		// 		prop('transform-x', value);
		// 	// console.warn('${tagName}.x doesn\'t work yet');
		// 	default:
		// 		console.warn('new tagName: ${tagName}??');
		// }
		prop('transform-x', value);
		if (this._transform.translate == null) {
			this._transform.translate = {x: 0};
		}
		this._transform.translate.x = value;
		return this;
	}

	/**
	 * change the y value of an object
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).y(10);
	 *
	 * @param value 	y-position
	 * @return       GoSVG
	 */
	inline public function y(value:Float):GoSVG {
		// var tagName = this._target.tagName;
		// switch (tagName) {
		// 	case 'rect':
		// 		prop('y', value);
		// 	case 'circle', 'ellipse':
		// 		prop('cy', value);
		// 	case 'line', 'polyline', 'polygon', 'path', 'g':
		// 		prop('transform-y', value);
		// 	default:
		// 		console.warn('new tagName: ${tagName}??');
		// }
		prop('transform-y', value);
		if (this._transform.translate == null) {
			this._transform.translate = {x: 0};
		}
		this._transform.translate.y = value;
		return this;
	}

	/**
	 * change the z value of an object
	 * 3D z added
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).z(10);
	 *
	 * @param value
	 * @return GoSVG
	 */
	inline public function z(value:Float):GoSVG {
		prop('z', value);
		return this;
	}

	/**
	 * change the y value of an object
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).pos(10,20);
	 *
	 * @param x 	x-position
	 * @param y 	y-position
	 * @param z 	(optinal) z-position
	 * @return       GoSVGSVG
	 */
	inline public function pos(x:Float, y:Float, ?z:Float):GoSVG {
		this.x(x);
		this.y(y);
		this._transform.translate.x = x;
		this._transform.translate.y = y;
		if (z != null)
			this.z(z);
		return this;
	}

	/**
	 * change the rotation value of an object
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).rotation(10);
	 *
	 * @param degree 	rotation in degrees (360)
	 * @param x			(optional) center point x
	 * @param y 		(optional) center point x
	 * @return GoSVGSVG
	 */
	inline public function rotation(degree:Float, ?x:Float, ?y:Float):GoSVG {
		prop('rotation', degree);
		if (this._transform.rotate == null) {
			this._transform.rotate = {degree: 0};
		}
		this._transform.rotate.degree = degree;
		if (x != null)
			this._transform.rotate.x = x;
		if (y != null)
			this._transform.rotate.y = y;
		return this;
	}

	// [mck] might be not so useful anymore!
	inline public function degree(degree:Float):GoSVG {
		prop('rotation', degree);
		this._transform.rotate.degree = degree;
		// see rotation
		return this;
	}

	// [mck] might be not so useful anymore!
	inline public function radians(degree:Float):GoSVG {
		prop('rotation', degree * Math.PI / 180);
		this._transform.rotate.degree = (degree * Math.PI / 180);
		// see rotation
		return this;
	}

	// [mck] do I need a conversion between degree and radians?

	/**
	 * change the alpha value of an object
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).alpha(.1);
	 *
	 * @param value 	transparanty value (maximum value 1)
	 * @return       GoSVG
	 */
	inline public function alpha(value:Float):GoSVG {
		prop('opacity', value);
		return this;
	}

	inline public function opacity(value:Float):GoSVG {
		prop('opacity', value);
		return this;
	}

	/**
	 * change the scale of an object
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).scale(2);
	 *
	 * @param value 	scale (1 is 100% (original scale), 0.5 is 50%, 2 is 200%)
	 * @return       GoSVG
	 */
	inline public function scale(value:Float):GoSVG {
		prop('scale', value);
		if (this._transform.scale == null) {
			this._transform.scale = {x: 0, y: 0};
		}
		this._transform.scale.x = value;
		this._transform.scale.y = value;
		return this;
	}

	/**
	 * yoyo to the original values of an object
	 * its back and forth, only once.. use oncomplete to continuesly to do this
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).yoyo();
	 *
	 * @return       GoSVGSVG
	 */
	inline public function yoyo():GoSVG {
		_isYoyo = true;
		return this;
	}

	/**
	 * WIP
	 * should calculate the center for rotation
	 *
	 * @return GoSVG
	 */
	inline public function useCenter():GoSVG {
		_isCenter = true;
		return this;
	}

	/**
	 * delay the animation in seconds
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).delay(1.5);
	 *
	 * @param duration 	delay in seconds
	 * @return       GoSVG
	 */
	inline public function delay(duration:Float):GoSVG {
		_delay = getDuration(duration);
		return this;
	}

	/**
	 * change the property of an object
	 *
	 * @example		GoSVG.to(foobarMc, 1.5).prop('counter',10);
	 *
	 * @param key   	description of the property as string
	 * @param value 	change to this value
	 * @return       GoSVG
	 */
	inline public function prop(key:String, value:Float):GoSVG {
		// [mck] TODO set zero value if it doesn't exist
		var objValue = 0.0;

		// TODO: might need to figure out this value is is color/fill/stroke?
		if (_target.hasAttribute(key)) {
			objValue = Std.parseFloat(_target.getAttribute(key));
		}

		var _range = {key: key, from: (_isFrom) ? value : objValue, to: (!_isFrom) ? value : objValue};
		_props.set(key, _range);

		// [mck] make sure the `_isFrom` is set asap
		if (_isFrom)
			updateProperties(0);

		return this;
	}

	/**
	 * on completion of the animation call a function with param(s)
	 *
	 * @param func         	function to call when animition is complete
	 * @param arr<Dynamic> 	params send to function
	 * @return              GoSVG
	 */
	inline public function onComplete(func:Dynamic, ?arr:Array<Dynamic>):GoSVG {
		_options.onComplete = func;
		_options.onCompleteParams = arr;
		return this;
	}

	/**
	 * on update of the animation call a function with param(s)
	 *
	 * @param func         	function to call when animition is updated
	 * @param arr<Dynamic> 	params send to function
	 * @return              GoSVG
	 */
	inline public function onAnimationStart(func:haxe.Constraints.Function, ?arr:Array<Dynamic>):GoSVG {
		_options.onAnimationStart = func;
		_options.onAnimationStartParams = arr;
		return this;
	}

	/**
	 * on update of the animation call a function with param(s)
	 *
	 * ```
	 * GoSVG.to(rect, 1.5).x(600).onUpdate(onUpdateHandler, [rect]).onComplete(onAnimateHandler, []);
	 * ```
	 *
	 * @param func         	function to call when animation is updated
	 * @param arr<Dynamic> 	params send to function
	 * @return              GoSVG
	 */
	inline public function onUpdate(func:Dynamic, ?arr:Array<Dynamic>):GoSVG {
		_options.onUpdate = func;
		_options.onUpdateParams = arr;
		return this;
	}

	/**
	 * change the default (Easing.linear) easing
	 *
	 * @example		GoSVG.from(foobarMc, 1.5).x(500).easing(Easing.quad);
	 *
	 * @param easing->Float 		check Easing class
	 * @return		Go
	 */
	// inline public function ease(easing:Float->Float):GoSVG {
	inline public function ease(easing:IEasing):GoSVG {
		this._easing = easing;
		return this;
	}

	// ____________________________________ public ____________________________________

	/**
	 * stop a Go tween while its animating
	 *
	 * @example 	var tween : Go = lets.GoSVG.to(foobarMc, 20).x(100);
	 *           	// oh dumb dumb, I want to stop that long animation because x-reason
	 *           	tween.stop();
	 */
	public function stop():Void {
		destroy();
	}

	// ____________________________________ private ____________________________________
	private function init():Void {
		if (_requestId == null) {
			_requestId = window.requestAnimationFrame(onEnterFrameHandler);
			console.info('GoSVG (${VERSION}) Start frame animation (_requestId: $_requestId)');
		}
	}

	private function onEnterFrameHandler(?time:Float):Void {
		// if (_initTime == 0) return;
		if (_tweens.length <= 0) {
			// [mck] stop timer, we are done!
			console.info('GoSVG (${VERSION}) Kill _requestId: $_requestId');
			window.cancelAnimationFrame(_requestId);
			_requestId = null;
			return;
		} else {
			for (i in 0..._tweens.length) {
				// [mck] FIXME :: don't know exactly why I need to check if _tweens[i] != null, but I do.
				if (_tweens[i] != null)
					_tweens[i].update();
			}

			_requestId = window.requestAnimationFrame(onEnterFrameHandler);
		}
	}

	private function update():Void {
		// [mck] check for delay, simply count down the delay before we animate

		if (_delay > 0) {
			_delay--;
			return;
		}
		if (!_isDelayDone) {
			if (DEBUG)
				console.warn('GoSVG (${VERSION}) Should trigger only once: ${_id} / ${_requestId} / ${_counter}');
			if (Reflect.isFunction(_options.onAnimationStart)) {
				var func = _options.onAnimationStart;
				var arr:Array<Dynamic> = (_options.onAnimationStartParams != null) ? _options.onAnimationStartParams : [];
				Reflect.callMethod(func, func, [arr]);
			}
		}
		_isDelayDone = true;

		this._initTime--;
		var progressed = (this._duration - this._initTime);

		// trace ('$progressed >= $_duration');
		if (progressed >= this._duration) {
			// [mck] setProperties in the final state
			updateProperties(this._duration);
			complete();
		} else {
			updateProperties(progressed);
		}
	}

	private function updateProperties(time:Float):Void {
		if (Reflect.isFunction(_options.onUpdate)) {
			var func = _options.onUpdate;
			var arr = (_options.onUpdateParams != null) ? _options.onUpdateParams : [time];
			Reflect.callMethod(func, func, [arr]);
		}
		// [mck] for some reason this can be null
		if (_props == null)
			return;
		for (n in _props.keys()) {
			var range = _props.get(n);
			var value = _easing.ease(time, range.from, (range.to - range.from), _duration);
			// svg changes
			switch (n) {
				case 'transform-x':
					this._transform.translate.x = value;
					_target.setAttribute(TRANSFORM, getTransform());
				case 'transform-y':
					this._transform.translate.y = value;
					_target.setAttribute(TRANSFORM, getTransform());
				case 'rotation':
					this._transform.rotate.degree = value;
					_target.setAttribute(TRANSFORM, getTransform());
				case 'scale':
					this._transform.scale.x = value;
					this._transform.scale.y = value;
					_target.setAttribute(TRANSFORM, getTransform());
				default:
					// stroke, fill might be a different pupy
					// x, y, stroke-width (might become `strokeWidth`), opacity, width, height, r, cx, cy, rx, ry
					_target.setAttribute(n, '${value}');
			}
		}
		// else throw( "Property "+propertyName+" not found in target!" );
	}

	/**
	 *
	 * @source: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
	 *
	 * 	<g fill="grey"
	 *		transform="rotate(-10 50 100)
	 *		translate(-36 45.5)
	 *		skewX(40)
	 *		scale(1 0.5)">
	 *	</g>
	 */
	private function getTransform() {
		var str = '';
		if (this._transform.translate != null) {
			if (this._transform.translate.y == null) {
				str += 'translate(${this._transform.translate.x} ';
			} else if (this._transform.translate.x == null) {
				str += 'translate(0 ${this._transform.translate.y} ';
			} else {
				str += 'translate(${this._transform.translate.x}, ${this._transform.translate.x}) ';
			}
		}
		if (this._transform.rotate != null) {
			if (this._transform.rotate.x == null) {
				str += 'rotate(${this._transform.rotate.degree}) ';
			} else {
				str += 'rotate(${this._transform.rotate.degree}, ${this._transform.rotate.x}, ${this._transform.rotate.y}) ';
			}
		}
		if (this._transform.scale != null) {
			if (this._transform.scale.y == null) {
				str += 'scale(${this._transform.scale.x} ';
			} else {
				str += 'scale(${this._transform.scale.x},${this._transform.scale.y}) ';
			}
		}
		if (this._transform.skewX != null) {
			str += 'skexX(${this._transform.skewX.degree}) ';
		}
		if (this._transform.skewY != null) {
			str += 'skexX(${this._transform.skewY.degree}) ';
		}
		return str;
	}

	// private function getTransform(t:js.html.svg.Element):Dynamic {
	// 	var att = t.getAttribute(TRANSFORM);
	// 	if (att == null)
	// 		return {x: 0, y: 0}; // TODO [mck] not sure this is the best solution
	// 	var trans:String = att.split('(')[1].split(')')[0];
	// 	var arr:Array<String> = trans.split(',');
	// 	return {x: arr[0], y: arr[1]};
	// }

	private function complete():Void {
		if (DEBUG)
			console.info('complete :: "$_id", _duration: $_duration, _seconds: $_seconds, _initTime: '
				+ _initTime
				+ ' / _tweens.length: '
				+ _tweens.length);

		if (_isYoyo) {
			// [mck] reverse the props back to the original state
			for (n in _props.keys()) {
				var range = _props.get(n);
				var _rangeReverse = {key: n, from: range.to, to: range.from};
				_props.set(n, _rangeReverse);
			}
			// [mck] reset the time and ignore this function for now... :)
			this._initTime = _duration;
			_isYoyo = false;
			return;
		}

		var func = _options.onComplete;
		var arr = (_options.onCompleteParams != null) ? _options.onCompleteParams : [];

		destroy();

		if (Reflect.isFunction(func))
			Reflect.callMethod(func, func, [arr]);
	}

	/**
	 * function to calculate the duration (frames or miliseconds)
	 * @param duration 	given in seconds, recalculated to miliseconds OR frame
	 */
	function getDuration(duration:Float):Int {
		var d = 0;
		if (duration <= 0)
			duration = 0.1;
		d = Std.int(duration * FRAME_RATE); // seconds * FPS = frames
		return d;
	}

	private function destroy():Void {
		if (Lambda.has(_tweens, this))
			_tweens.remove(this);
		// [mck] cleaning up
		if (_options) {
			_easing = Quad.easeOut;
			_options = cast {};
			_target = null;
			_props = null;
			_duration = 0;
			_initTime = 0;
			_delay = 0;
		}
	}
}

typedef Range = {key:String, from:Null<Float>, to:Null<Float>}

typedef Transform = {
	@:optional var translate:Translate;
	@:optional var scale:Scale;
	@:optional var rotate:Rotate;
	@:optional var skewX:SkewX;
	@:optional var skewY:SkewY;
}

typedef Translate = {
	@:optional var _id:Int;
	var x:Float;
	@:optional var y:Float;
};

typedef Scale = {
	@:optional var _id:Int;
	var x:Float; // x-dir
	@:optional var y:Float; // y-dir
};

typedef Rotate = {
	@:optional var _id:Int;
	var degree:Float;
	@:optional var x:Float;
	@:optional var y:Float;
};

typedef SkewX = {
	@:optional var _id:Int;
	var degree:Float;
};

typedef SkewY = {
	@:optional var _id:Int;
	var degree:Float;
};

typedef SVGObject = {
	@:optional var _id:String;
	var x:Float;
	var y:Float;
	@:optional var centerX:Float;
	@:optional var centerY:Float;
	var width:Float;
	var height:Float;
};
