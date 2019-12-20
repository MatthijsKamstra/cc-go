package;

import js.Syntax;
import js.html.svg.Element;
import js.Browser.*;
import model.constants.App;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 *
 */
class Main {
	public function new() {
		init();
	}

	function init() {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('${App.NAME} Dom ready :: build: ${App.getBuildDate()} ');

			// search for element in svg
			var svgCircle:Element = cast document.getElementById('circle-1');
			svgCircle.setAttributeNS(null, 'cx', '111');
			svgCircle.setAttribute('cy', '111');

			Syntax.code('GoSVG.to({0}, {1}).x({2}).y({3})', svgCircle, 5, 500, 100);

			// console.log('${svgCircle}');

			var svgRect:Element = cast document.getElementById('rect-1');
			// console.log('${svgRect}');

			// Syntax.code('GoSVG.test({0}, {1})', svgCircle, 2.4);
			Syntax.code('GoSVG.to({0}, {1}).x({2}).y({3})', svgRect, 10, 500, 555);

			// var _svgRect:js.html.svg.RectElement = cast document.getElementById('rect-1');
			// _svgRect.setAttributeNS(null, 'x', '100');
			// _svgRect.setAttribute('y', '100');

			// console.log('${_svgRect.x}');
			// trace(Reflect.field(_svgRect, 'y'));

			var svgs = document.getElementsByTagName('svg');
			trace(svgs.length);

			var svg = document.getElementsByTagName('svg')[0];
			var children = (svg.children);
			for (i in children) {
				var child = i;
				// console.log(i.tagName);
			}

			// var els = svg.get

			Syntax.code('GoSVG.to({0}, {1}).x({2}).y({3})', document.getElementById('line-1'), 5, 500, 100);

			var _svgPolyLine:Element = cast document.getElementById('polyline-1');
			_svgPolyLine.setAttribute('transform', 'translate(333)');

			trace(_svgPolyLine);
		});
	}

	static public function main() {
		var app = new Main();
	}
}
