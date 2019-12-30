// Generated by Haxe 4.0.3
(function ($hx_exports, $global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(x1 == elt) {
			return true;
		}
	}
	return false;
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var GoSVG = $hx_exports["GoSVG"] = function(target,duration) {
	this.TRANSFORM = "transform";
	this.VERSION = "2.0.0";
	this.DEBUG = false;
	this.FRAME_RATE = 60;
	this._seconds = 0;
	this._delay = 0;
	this._initTime = 0;
	this._isDelayDone = false;
	this._isWiggle = false;
	this._isCenter = false;
	this._isYoyo = false;
	this._isFrom = false;
	this._props = new haxe_ds_StringMap();
	this._options = { };
	this._easing = cc_lets_easing_Quad.get_easeOut();
	GoSVG._counter++;
	this._id = "[lets.GoSVG]" + this.VERSION + "." + new Date().getTime();
	this._seconds = duration;
	this._target = target;
	this._duration = this.getDuration(duration);
	this._initTime = this._duration;
	this._transform = { };
	GoSVG._tweens.push(this);
	if(this.DEBUG) {
		window.console.log("New GoSVG - _id: \"" + this._id + "\" / _duration: " + this._duration + " / _initTime: " + this._initTime + " / _tweens.length: " + GoSVG._tweens.length);
	}
	haxe_Timer.delay($bind(this,this.init),1);
};
GoSVG.__name__ = true;
GoSVG.test = function(target,duration) {
	if(duration == null) {
		duration = 1.2;
	}
	window.console.log("GoSVG.Test(" + Std.string(target) + ", " + duration + ")");
	var _go = new GoSVG(target,duration);
	return _go;
};
GoSVG.svg = function(element) {
	var svg = element;
	var _id = "";
	var _x = 0;
	var _y = 0;
	var _cx = 0;
	var _cy = 0;
	var _width = 0;
	var _height = 0;
	var tagName = element.tagName;
	console.log("src/cc/lets/GoSVG.hx:112:",tagName);
	_id = tagName;
	if(tagName == "rect") {
		_x = (js_Boot.__cast(svg , SVGRectElement)).x.baseVal.value;
		_y = (js_Boot.__cast(svg , SVGRectElement)).y.baseVal.value;
		_width = (js_Boot.__cast(svg , SVGRectElement)).width.baseVal.value;
		_height = (js_Boot.__cast(svg , SVGRectElement)).height.baseVal.value;
		_cx = (js_Boot.__cast(svg , SVGRectElement)).x.baseVal.value + (js_Boot.__cast(svg , SVGRectElement)).width.baseVal.value / 2;
		_cy = (js_Boot.__cast(svg , SVGRectElement)).y.baseVal.value + (js_Boot.__cast(svg , SVGRectElement)).height.baseVal.value / 2;
	}
	if(element.hasAttribute("viewBox")) {
		var svgViewBox = element.getAttribute("viewBox");
		var svgRect = element.viewBox.baseVal;
		_width = svgRect.width;
		_height = svgRect.height;
		_x = svgRect.x;
		_y = svgRect.y;
	}
	return { _id : _id, x : _x, y : _y, width : _width, height : _height, centerX : _cx, centerY : _cy};
};
GoSVG.to = function(target,duration) {
	var _go = new GoSVG(target,duration);
	_go._isFrom = false;
	return _go;
};
GoSVG.from = function(target,duration) {
	var _go = new GoSVG(target,duration);
	_go._isFrom = true;
	_go.updateProperties(0);
	return _go;
};
GoSVG.timer = function(duration) {
	var _go = new GoSVG(null,duration);
	return _go;
};
GoSVG.frames = function(frames) {
	var _go = new GoSVG(null,frames * 60);
	return _go;
};
GoSVG.wiggle = function(target,x,y,wiggleRoom) {
	if(wiggleRoom == null) {
		wiggleRoom = 10;
	}
	var _go = 1 + Math.random();
	var _go1 = new GoSVG(target,_go);
	_go1._isWiggle = true;
	var max = wiggleRoom;
	var min = -wiggleRoom;
	var value = Math.random() * (max - min);
	var value1 = x + value + min;
	var objValue = 0.0;
	if(_go1._target.hasAttribute("x")) {
		objValue = parseFloat(_go1._target.getAttribute("x"));
	}
	var _range = { key : "x", from : _go1._isFrom ? value1 : objValue, to : !_go1._isFrom ? value1 : objValue};
	var _this = _go1._props;
	if(__map_reserved["x"] != null) {
		_this.setReserved("x",_range);
	} else {
		_this.h["x"] = _range;
	}
	if(_go1._isFrom) {
		_go1.updateProperties(0);
	}
	var value2 = Math.random() * (max - min);
	var value3 = y + value2 + min;
	var objValue1 = 0.0;
	if(_go1._target.hasAttribute("y")) {
		objValue1 = parseFloat(_go1._target.getAttribute("y"));
	}
	var _range1 = { key : "y", from : _go1._isFrom ? value3 : objValue1, to : !_go1._isFrom ? value3 : objValue1};
	var _this1 = _go1._props;
	if(__map_reserved["y"] != null) {
		_this1.setReserved("y",_range1);
	} else {
		_this1.h["y"] = _range1;
	}
	if(_go1._isFrom) {
		_go1.updateProperties(0);
	}
	_go1._easing = cc_lets_easing_Sine.get_easeInOut();
	_go1._options.onComplete = function() {
		GoSVG.wiggle(target,x,y,wiggleRoom);
	};
	_go1._options.onCompleteParams = null;
	return _go1;
};
GoSVG.wiggleProp = function(target,prop,value,wiggleRoom) {
	if(wiggleRoom == null) {
		wiggleRoom = 10;
	}
	var _go = 1 + Math.random();
	var _go1 = new GoSVG(target,_go);
	_go1._isWiggle = true;
	var max = wiggleRoom;
	var min = -wiggleRoom;
	var value1 = Math.random() * (max - min);
	var value2 = value + value1 + min;
	var objValue = 0.0;
	if(_go1._target.hasAttribute(prop)) {
		objValue = parseFloat(_go1._target.getAttribute(prop));
	}
	var _range = { key : prop, from : _go1._isFrom ? value2 : objValue, to : !_go1._isFrom ? value2 : objValue};
	var _this = _go1._props;
	if(__map_reserved[prop] != null) {
		_this.setReserved(prop,_range);
	} else {
		_this.h[prop] = _range;
	}
	if(_go1._isFrom) {
		_go1.updateProperties(0);
	}
	_go1._easing = cc_lets_easing_Sine.get_easeInOut();
	_go1._options.onComplete = function() {
		GoSVG.wiggleProp(target,prop,value,wiggleRoom);
	};
	_go1._options.onCompleteParams = null;
	return _go1;
};
GoSVG.prototype = {
	width: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("width")) {
			objValue = parseFloat(this._target.getAttribute("width"));
		}
		var _range = { key : "width", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["width"] != null) {
			_this.setReserved("width",_range);
		} else {
			_this.h["width"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		return this;
	}
	,height: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("height")) {
			objValue = parseFloat(this._target.getAttribute("height"));
		}
		var _range = { key : "height", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["height"] != null) {
			_this.setReserved("height",_range);
		} else {
			_this.h["height"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		return this;
	}
	,x: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("transform-x")) {
			objValue = parseFloat(this._target.getAttribute("transform-x"));
		}
		var _range = { key : "transform-x", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["transform-x"] != null) {
			_this.setReserved("transform-x",_range);
		} else {
			_this.h["transform-x"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		if(this._transform.translate == null) {
			this._transform.translate = { x : 0};
		}
		this._transform.translate.x = value;
		return this;
	}
	,y: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("transform-y")) {
			objValue = parseFloat(this._target.getAttribute("transform-y"));
		}
		var _range = { key : "transform-y", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["transform-y"] != null) {
			_this.setReserved("transform-y",_range);
		} else {
			_this.h["transform-y"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		if(this._transform.translate == null) {
			this._transform.translate = { x : 0};
		}
		this._transform.translate.y = value;
		return this;
	}
	,z: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("z")) {
			objValue = parseFloat(this._target.getAttribute("z"));
		}
		var _range = { key : "z", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["z"] != null) {
			_this.setReserved("z",_range);
		} else {
			_this.h["z"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		return this;
	}
	,pos: function(x,y,z) {
		var objValue = 0.0;
		if(this._target.hasAttribute("transform-x")) {
			objValue = parseFloat(this._target.getAttribute("transform-x"));
		}
		var _range = { key : "transform-x", from : this._isFrom ? x : objValue, to : !this._isFrom ? x : objValue};
		var _this = this._props;
		if(__map_reserved["transform-x"] != null) {
			_this.setReserved("transform-x",_range);
		} else {
			_this.h["transform-x"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		if(this._transform.translate == null) {
			this._transform.translate = { x : 0};
		}
		this._transform.translate.x = x;
		var objValue1 = 0.0;
		if(this._target.hasAttribute("transform-y")) {
			objValue1 = parseFloat(this._target.getAttribute("transform-y"));
		}
		var _range1 = { key : "transform-y", from : this._isFrom ? y : objValue1, to : !this._isFrom ? y : objValue1};
		var _this1 = this._props;
		if(__map_reserved["transform-y"] != null) {
			_this1.setReserved("transform-y",_range1);
		} else {
			_this1.h["transform-y"] = _range1;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		if(this._transform.translate == null) {
			this._transform.translate = { x : 0};
		}
		this._transform.translate.y = y;
		this._transform.translate.x = x;
		this._transform.translate.y = y;
		if(z != null) {
			var objValue2 = 0.0;
			if(this._target.hasAttribute("z")) {
				objValue2 = parseFloat(this._target.getAttribute("z"));
			}
			var _range2 = { key : "z", from : this._isFrom ? z : objValue2, to : !this._isFrom ? z : objValue2};
			var _this2 = this._props;
			if(__map_reserved["z"] != null) {
				_this2.setReserved("z",_range2);
			} else {
				_this2.h["z"] = _range2;
			}
			if(this._isFrom) {
				this.updateProperties(0);
			}
		}
		return this;
	}
	,rotation: function(degree,x,y) {
		var objValue = 0.0;
		if(this._target.hasAttribute("rotation")) {
			objValue = parseFloat(this._target.getAttribute("rotation"));
		}
		var _range = { key : "rotation", from : this._isFrom ? degree : objValue, to : !this._isFrom ? degree : objValue};
		var _this = this._props;
		if(__map_reserved["rotation"] != null) {
			_this.setReserved("rotation",_range);
		} else {
			_this.h["rotation"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		if(this._transform.rotate == null) {
			this._transform.rotate = { degree : 0};
		}
		this._transform.rotate.degree = degree;
		if(x != null) {
			this._transform.rotate.x = x;
		}
		if(y != null) {
			this._transform.rotate.y = y;
		}
		return this;
	}
	,degree: function(degree) {
		var objValue = 0.0;
		if(this._target.hasAttribute("rotation")) {
			objValue = parseFloat(this._target.getAttribute("rotation"));
		}
		var _range = { key : "rotation", from : this._isFrom ? degree : objValue, to : !this._isFrom ? degree : objValue};
		var _this = this._props;
		if(__map_reserved["rotation"] != null) {
			_this.setReserved("rotation",_range);
		} else {
			_this.h["rotation"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		this._transform.rotate.degree = degree;
		return this;
	}
	,radians: function(degree) {
		var value = degree * Math.PI / 180;
		var objValue = 0.0;
		if(this._target.hasAttribute("rotation")) {
			objValue = parseFloat(this._target.getAttribute("rotation"));
		}
		var _range = { key : "rotation", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["rotation"] != null) {
			_this.setReserved("rotation",_range);
		} else {
			_this.h["rotation"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		this._transform.rotate.degree = degree * Math.PI / 180;
		return this;
	}
	,alpha: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("opacity")) {
			objValue = parseFloat(this._target.getAttribute("opacity"));
		}
		var _range = { key : "opacity", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["opacity"] != null) {
			_this.setReserved("opacity",_range);
		} else {
			_this.h["opacity"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		return this;
	}
	,opacity: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("opacity")) {
			objValue = parseFloat(this._target.getAttribute("opacity"));
		}
		var _range = { key : "opacity", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["opacity"] != null) {
			_this.setReserved("opacity",_range);
		} else {
			_this.h["opacity"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		return this;
	}
	,scale: function(value) {
		var objValue = 0.0;
		if(this._target.hasAttribute("scale")) {
			objValue = parseFloat(this._target.getAttribute("scale"));
		}
		var _range = { key : "scale", from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved["scale"] != null) {
			_this.setReserved("scale",_range);
		} else {
			_this.h["scale"] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		if(this._transform.scale == null) {
			this._transform.scale = { x : 0, y : 0};
		}
		this._transform.scale.x = value;
		this._transform.scale.y = value;
		return this;
	}
	,yoyo: function() {
		this._isYoyo = true;
		return this;
	}
	,useCenter: function() {
		this._isCenter = true;
		return this;
	}
	,delay: function(duration) {
		this._delay = this.getDuration(duration);
		return this;
	}
	,prop: function(key,value) {
		var objValue = 0.0;
		if(this._target.hasAttribute(key)) {
			objValue = parseFloat(this._target.getAttribute(key));
		}
		var _range = { key : key, from : this._isFrom ? value : objValue, to : !this._isFrom ? value : objValue};
		var _this = this._props;
		if(__map_reserved[key] != null) {
			_this.setReserved(key,_range);
		} else {
			_this.h[key] = _range;
		}
		if(this._isFrom) {
			this.updateProperties(0);
		}
		return this;
	}
	,onComplete: function(func,arr) {
		this._options.onComplete = func;
		this._options.onCompleteParams = arr;
		return this;
	}
	,onAnimationStart: function(func,arr) {
		this._options.onAnimationStart = func;
		this._options.onAnimationStartParams = arr;
		return this;
	}
	,onUpdate: function(func,arr) {
		this._options.onUpdate = func;
		this._options.onUpdateParams = arr;
		return this;
	}
	,ease: function(easing) {
		this._easing = easing;
		return this;
	}
	,stop: function() {
		this.destroy();
	}
	,init: function() {
		if(GoSVG._requestId == null) {
			GoSVG._requestId = window.requestAnimationFrame($bind(this,this.onEnterFrameHandler));
			window.console.info("GoSVG (" + this.VERSION + ") Start frame animation (_requestId: " + GoSVG._requestId + ")");
		}
	}
	,onEnterFrameHandler: function(time) {
		if(GoSVG._tweens.length <= 0) {
			window.console.info("GoSVG (" + this.VERSION + ") Kill _requestId: " + GoSVG._requestId);
			window.cancelAnimationFrame(GoSVG._requestId);
			GoSVG._requestId = null;
			return;
		} else {
			var _g = 0;
			var _g1 = GoSVG._tweens.length;
			while(_g < _g1) {
				var i = _g++;
				if(GoSVG._tweens[i] != null) {
					GoSVG._tweens[i].update();
				}
			}
			GoSVG._requestId = window.requestAnimationFrame($bind(this,this.onEnterFrameHandler));
		}
	}
	,update: function() {
		if(this._delay > 0) {
			this._delay--;
			return;
		}
		if(!this._isDelayDone) {
			if(this.DEBUG) {
				window.console.warn("GoSVG (" + this.VERSION + ") Should trigger only once: " + this._id + " / " + GoSVG._requestId + " / " + GoSVG._counter);
			}
			if(Reflect.isFunction(this._options.onAnimationStart)) {
				var func = this._options.onAnimationStart;
				var arr = this._options.onAnimationStartParams != null ? this._options.onAnimationStartParams : [];
				func.apply(func,[arr]);
			}
		}
		this._isDelayDone = true;
		this._initTime--;
		var progressed = this._duration - this._initTime;
		if(progressed >= this._duration) {
			this.updateProperties(this._duration);
			this.complete();
		} else {
			this.updateProperties(progressed);
		}
	}
	,updateProperties: function(time) {
		if(Reflect.isFunction(this._options.onUpdate)) {
			var func = this._options.onUpdate;
			var arr = this._options.onUpdateParams != null ? this._options.onUpdateParams : [time];
			func.apply(func,[arr]);
		}
		if(this._props == null) {
			return;
		}
		var n = this._props.keys();
		while(n.hasNext()) {
			var n1 = n.next();
			var _this = this._props;
			var range = __map_reserved[n1] != null ? _this.getReserved(n1) : _this.h[n1];
			var value = this._easing.ease(time,range.from,range.to - range.from,this._duration);
			switch(n1) {
			case "rotation":
				this._transform.rotate.degree = value;
				this._target.setAttribute(this.TRANSFORM,this.getTransform());
				break;
			case "scale":
				this._transform.scale.x = value;
				this._transform.scale.y = value;
				this._target.setAttribute(this.TRANSFORM,this.getTransform());
				break;
			case "transform-x":
				this._transform.translate.x = value;
				this._target.setAttribute(this.TRANSFORM,this.getTransform());
				break;
			case "transform-y":
				this._transform.translate.y = value;
				this._target.setAttribute(this.TRANSFORM,this.getTransform());
				break;
			default:
				this._target.setAttribute(n1,"" + value);
			}
		}
	}
	,getTransform: function() {
		var str = "";
		if(this._transform.translate != null) {
			if(this._transform.translate.y == null) {
				str += "translate(" + this._transform.translate.x + " ";
			} else if(this._transform.translate.x == null) {
				str += "translate(0 " + this._transform.translate.y + " ";
			} else {
				str += "translate(" + this._transform.translate.x + ", " + this._transform.translate.x + ") ";
			}
		}
		if(this._transform.rotate != null) {
			if(this._transform.rotate.x == null) {
				str += "rotate(" + this._transform.rotate.degree + ") ";
			} else {
				str += "rotate(" + this._transform.rotate.degree + ", " + this._transform.rotate.x + ", " + this._transform.rotate.y + ") ";
			}
		}
		if(this._transform.scale != null) {
			if(this._transform.scale.y == null) {
				str += "scale(" + this._transform.scale.x + " ";
			} else {
				str += "scale(" + this._transform.scale.x + "," + this._transform.scale.y + ") ";
			}
		}
		if(this._transform.skewX != null) {
			str += "skexX(" + this._transform.skewX.degree + ") ";
		}
		if(this._transform.skewY != null) {
			str += "skexX(" + this._transform.skewY.degree + ") ";
		}
		return str;
	}
	,complete: function() {
		if(this.DEBUG) {
			window.console.info("complete :: \"" + this._id + "\", _duration: " + this._duration + ", _seconds: " + this._seconds + ", _initTime: " + this._initTime + " / _tweens.length: " + GoSVG._tweens.length);
		}
		if(this._isYoyo) {
			var n = this._props.keys();
			while(n.hasNext()) {
				var n1 = n.next();
				var _this = this._props;
				var range = __map_reserved[n1] != null ? _this.getReserved(n1) : _this.h[n1];
				var _rangeReverse = { key : n1, from : range.to, to : range.from};
				var _this1 = this._props;
				if(__map_reserved[n1] != null) {
					_this1.setReserved(n1,_rangeReverse);
				} else {
					_this1.h[n1] = _rangeReverse;
				}
			}
			this._initTime = this._duration;
			this._isYoyo = false;
			return;
		}
		var func = this._options.onComplete;
		var arr = this._options.onCompleteParams != null ? this._options.onCompleteParams : [];
		this.destroy();
		if(Reflect.isFunction(func)) {
			func.apply(func,[arr]);
		}
	}
	,getDuration: function(duration) {
		var d = 0;
		if(duration <= 0) {
			duration = 0.1;
		}
		d = duration * this.FRAME_RATE | 0;
		return d;
	}
	,destroy: function() {
		if(Lambda.has(GoSVG._tweens,this)) {
			HxOverrides.remove(GoSVG._tweens,this);
		}
		if(this._options) {
			this._easing = cc_lets_easing_Quad.get_easeOut();
			this._options = { };
			this._target = null;
			this._props = null;
			this._duration = 0;
			this._initTime = 0;
			this._delay = 0;
		}
	}
	,__class__: GoSVG
};
var cc_lets_easing_IEasing = function() { };
cc_lets_easing_IEasing.__name__ = true;
cc_lets_easing_IEasing.__isInterface__ = true;
cc_lets_easing_IEasing.prototype = {
	__class__: cc_lets_easing_IEasing
};
var cc_lets_easing_Quad = function() { };
cc_lets_easing_Quad.__name__ = true;
cc_lets_easing_Quad.get_easeOut = function() {
	return new cc_lets_easing_QuadEaseOut();
};
var cc_lets_easing_QuadEaseOut = function() {
};
cc_lets_easing_QuadEaseOut.__name__ = true;
cc_lets_easing_QuadEaseOut.__interfaces__ = [cc_lets_easing_IEasing];
cc_lets_easing_QuadEaseOut.prototype = {
	ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,__class__: cc_lets_easing_QuadEaseOut
};
var cc_lets_easing_Sine = function() { };
cc_lets_easing_Sine.__name__ = true;
cc_lets_easing_Sine.get_easeInOut = function() {
	return new cc_lets_easing_SineEaseInOut();
};
var cc_lets_easing_SineEaseInOut = function() {
};
cc_lets_easing_SineEaseInOut.__name__ = true;
cc_lets_easing_SineEaseInOut.__interfaces__ = [cc_lets_easing_IEasing];
cc_lets_easing_SineEaseInOut.prototype = {
	ease: function(t,b,c,d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
	,__class__: cc_lets_easing_SineEaseInOut
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,keys: function() {
		return HxOverrides.iter(this.arrayKeys());
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g3 = 0;
			var _g11 = o.length;
			while(_g3 < _g11) {
				var i = _g3++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	if(Object.prototype.hasOwnProperty.call(cc,"__interfaces__")) {
		var intf = cc.__interfaces__;
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
function $getIterator(o) { if( o instanceof Array ) return HxOverrides.iter(o); else return o.iterator(); }
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
var __map_reserved = {};
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
GoSVG._tweens = [];
GoSVG._counter = 0;
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
