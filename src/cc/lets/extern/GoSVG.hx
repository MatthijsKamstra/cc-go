package cc.lets.extern;

import js.html.svg.SVGElement;
import cc.lets.easing.IEasing;
import js.html.svg.Element;

@:native("GoSVG")
extern class GoSVG {
	// static var SOME_PROP:Int;
	// static function someFunc():String;
	// var myProp:String;
	// function new();
	// function myFunc(prop:String):Void;
	static function test(target:Element, duration:Float):GoSVG;
	static function svg(element:SVGElement):SVGObject;

	static function to(target:js.html.svg.Element, duration:Float):GoSVG;
	static function from(target:Dynamic, duration:Float):GoSVG;

	static function timer(duration:Float):GoSVG;
	static function frames(frames:Int):GoSVG;

	static function wiggle(target:Dynamic, x:Float, y:Float, ?wiggleRoom:Float = 10):GoSVG;
	static function wiggleProp(target:Dynamic, prop:String, value:Float, ?wiggleRoom:Float = 10):GoSVG;

	// properties
	function width(value:Float):GoSVG;
	function height(value:Float):GoSVG;

	function x(value:Float):GoSVG;
	function y(value:Float):GoSVG;
	function z(value:Float):GoSVG;

	function pos(x:Float, y:Float, ?z:Float):GoSVG;
	function rotation(degree:Float, ?x:Float, ?y:Float):GoSVG;

	function degree(degree:Float):GoSVG;
	function radians(degree:Float):GoSVG;

	function alpha(value:Float):GoSVG;
	function opacity(value:Float):GoSVG;

	function scale(value:Float):GoSVG;
	function yoyo():GoSVG;
	function delay(duration:Float):GoSVG;
	function prop(key:String, value:Float):GoSVG;

	function onComplete(func:Dynamic, ?arr:Array<Dynamic>):GoSVG;
	function onAnimationStart(func:haxe.Constraints.Function, ?arr:Array<Dynamic>):GoSVG;
	function onUpdate(func:Dynamic, ?arr:Array<Dynamic>):GoSVG;

	function ease(easing:IEasing):GoSVG;

	public function stop():Void;
}

typedef SVGObject = {
	@:optional var _id:Int;
	var x:Float;
	var y:Float;
	var width:Float;
	var height:Float;
};
