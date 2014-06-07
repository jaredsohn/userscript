// ==UserScript==
// @name          XFinalEdenModified
// @namespace     ronmi@rmi.twbbs.org
// @description	  original author is YuJianrong@GMail.com
// @include       http://cnc.finaleden.com/Cartoon*
// @include       http://www.finaleden.com/Cartoon*
// @include       http://tel.finaleden.com/Cartoon*
// @include       http://1.finaleden.com/Cartoon*
// ==/UserScript==




( function PostProcess() {

	var evaluateXPath = function(aNode, aExpr) {
		var xpe = new XPathEvaluator();
		var nsResolver = xpe
				.createNSResolver(aNode.ownerDocument == null ? aNode.documentElement
						: aNode.ownerDocument.documentElement);
		var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
		var found = [];
		var res;
		while (res = result.iterateNext())
			found.push(res);
		return found;
	};

	var ff = evaluateXPath(document, "/html/body/script");

	eval(ff[0].text.replace(/window == top/, "false"));

	var e

	e = document.createElement('script');
	e.setAttribute('type', 'text/javascript');
	e
			.setAttribute(
					'src',
					'data:text/javascript;charset=utf-8;base64,ZnVuY3Rpb24gdG9MSU5LKCkNCnsNCiAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTD0nJzsNCiAgICB2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpOw0KICAgIGUuc2V0QXR0cmlidXRlKCd0eXBlJywnYnV0dG9uJyk7DQogICAgZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywnUElDJyk7DQogICAgZS5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCd0b0lNRygpO3JldHVybiBmYWxzZTsnKTsNCiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpOw0KDQogICAgdmFyIGk7DQogICAgZm9yKGk9MTtpPGFycmF5X2ltZy5sZW5ndGg7KytpKQ0KICAgIHsNCiAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwrPSc8YnIgLz48YSBocmVmPSInK3VuZXNjYXBlKGFycmF5X2ltZ1tpXSkrJyI%2BJyt1bmVzY2FwZShhcnJheV9pbWdbaV0pKyc8L2E%2BJzsNCiAgICB9DQp9DQpmdW5jdGlvbiB0b0lNRygpDQp7DQogICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUw9Jyc7DQogICAgdmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTsNCiAgICBlLnNldEF0dHJpYnV0ZSgndHlwZScsJ2J1dHRvbicpOw0KICAgIGUuc2V0QXR0cmlidXRlKCd2YWx1ZScsJ0xJTksnKTsNCiAgICBlLnNldEF0dHJpYnV0ZSgnb25jbGljaycsJ3RvTElOSygpO3JldHVybiBmYWxzZTsnKTsNCiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpOw0KICAgIHZhciBpOw0KICAgIGZvcihpPTE7aTxhcnJheV9pbWcubGVuZ3RoOysraSkNCiAgICB7DQogICAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MKz0nPGJyIC8%2BPGltZyBzcmM9IicrdW5lc2NhcGUoYXJyYXlfaW1nW2ldKSsnIiAvPic7DQogICAgfQ0KfQ0KDQooZnVuY3Rpb24oKXsNCiAgICB2YXIgaTsNCiAgICB2YXIgZT1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpOw0KICAgIGZvcihpPTA7aTxlLmxlbmd0aDtpKyspDQogICAgew0KICAgICAgICBlW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZVtpXSk7DQogICAgfQ0KfSkoKTsNCg0KdG9MSU5LKCk7');
	document.getElementsByTagName('head')[0].appendChild(e);

})();
