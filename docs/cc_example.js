// Generated by Haxe 4.0.3
(function ($global) { "use strict";
var Main = function() {
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		window.console.log("" + model_constants_App.NAME + " Dom ready :: build: " + "2019-12-21 19:56:41" + " ");
		_gthis.init2();
	});
};
Main.main = function() {
	var app = new Main();
};
Main.prototype = {
	init2: function() {
		this.init2OnCompletHander();
	}
	,init2OnCompletHander: function() {
		var svgObject = GoSVG.svg(window.document.getElementById("simple-example"));
		var randomOpacity = Math.random();
		var randomRotation = Math.random() * 360;
		GoSVG.to(window.document.getElementById("rect-2"),5).pos(svgObject.width * Math.random(),svgObject.height * Math.random()).opacity(randomOpacity).rotation(100,80,80).onComplete($bind(this,this.init2OnCompletHander));
	}
};
var model_constants_App = function() { };
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
model_constants_App.NAME = "[let.GoSVG]";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=cc_example.js.map