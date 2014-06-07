// ==UserScript==
// @name       ele.me black tech
// @namespace  http://acgpl.us/
// @version    0.1
// @description  roll点神器，按B产生90+点数
// @include    http://ele.me/*
// @copyright  2013 liliclinton&dreamtalen
// ==/UserScript==

$(function() {
	var a = function() {
		function e() {
			return Math.round(Math.random() * 100)
		}

		function e2() {
			return Math.round(Math.random() * 10 + 90)
		}

		function c(j, k, l) {
			if (j.nodeType !== 1) {
				throw (j + " is not a dom element node.")
			}
			if (j.addEventListener) {
				j.addEventListener(k, l, false)
			} else {
				if (j.attachEvent) {
					j.attachEvent("on" + k, l)
				} else {
					throw ("browser don't support event attach.")
				}
			}
		}
		var b = document.getElementById("trigger");
		var f = document.getElementById("result");
		var g = document.getElementById("lastResult");
		var d = 101;
		var h = new Array();
		f.innerHTML = "";

		function i(n, m) {
			if (h.length >= 10) {
				if (h.shift() == d) {
					h.shift();
					h.unshift(d)
				}
			}
			var o = n.getAttribute("count") || 0;
			n.setAttribute("count", ++o);
			do {
				var j = e();
				var l = false;
				for (var k in h) {
					if (h.hasOwnProperty(k)) {
						if (h[k] == j) {
							l = true
						}
					}
				}
			} while (l || j > 100);
			h.push(j);
			d = d < j ? d : j;
			n.innerHTML = "";
			for (var k in h) {
				if (h.hasOwnProperty(k)) {
					if (h[k] == d) {
						n.innerHTML += '<li class="you-item">扔出了一个 ' + h[k] + "</li>"
					} else {
						n.innerHTML += "<li>扔出了一个 " + h[k] + "</li>"
					}
				}
			}
			g.innerHTML = "";
			if (o >= 10) {
				n.setAttribute("rows", o + 1)
			}
			b.focus()
		}

		function i2(n, m) {
			if (h.length >= 10) {
				if (h.shift() == d) {
					h.shift();
					h.unshift(d)
				}
			}
			var o = n.getAttribute("count") || 0;
			n.setAttribute("count", ++o);
			do {
				var j = e2();
				var l = false;
				for (var k in h) {
					if (h.hasOwnProperty(k)) {
						if (h[k] == j) {
							l = true
						}
					}
				}
			} while (l || j > 100);
			h.push(j);
			d = d < j ? d : j;
			n.innerHTML = "";
			for (var k in h) {
				if (h.hasOwnProperty(k)) {
					if (h[k] == d) {
						n.innerHTML += '<li class="you-item">扔出了一个 ' + h[k] + "</li>"
					} else {
						n.innerHTML += "<li>扔出了一个 " + h[k] + "</li>"
					}
				}
			}
			g.innerHTML = "";
			if (o >= 10) {
				n.setAttribute("rows", o + 1)
			}
			b.focus()
		}
		b.removeAttribute("disabled");
		$("#trigger").click(function() {
			i(f)
		});
		$(document).keydown(function(j) {
			if (j.which === 32) {
				i(f);
				$("#trigger").addClass("active");
				return false
			}

			if (j.which === 66) {
				i2(f);
				$("#trigger").addClass("active");
				return false
			}
			
		}).keyup(function(j) {
			$("#trigger").removeClass("active")
		});
		$("#trigger").mousedown(function() {
			$(this).addClass("active")
		});
		$("#trigger").mouseup(function() {
			$(this).removeClass("active")
		})
	};
	$("#shuiqunawaimai_open, #activity-shuiqunawaimai").click(function() {
		a();
		$("#modal-shuiqunawaimai").modal({
			backdrop: "static"
		});
		return false
	})
});