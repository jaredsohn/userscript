// ==UserScript==
// @name        Google Search Result Simplifier
// @namespace   kobachi
// @include     https://www.google.co*/search?*
// @version     0.1
// ==/UserScript==

(function(){
	function addCSSRules(){
		var s = document.createElement("style");
		s.innerHTML = [
			"em { color: #EE0000 !important; } ",
			".vspib { display: none !important; }",
			"#center_col { margin-right: 120px !important; width: auto !important; }",
			".s { max-width: inherit !important; }",
			"#rso { counter-reset: result_no; }",
			".vsc > h3 { counter-increment: result_no; }",
			'.vsc > h3.r:before { content: counter(result_no); position: absolute; right: 0px; color: #EEEEEE; font-size: 150%; font-style: italic; }'
		].join("\n");
		document.querySelector("head").appendChild(s);
	}

	function removeInjection(){
		Array.forEach(document.querySelectorAll("a[href^=http]"), function(a){
			a.onclick = function(){};
			a.removeAttribute("onclick", "");
			a.onmousedown = function(){};
			a.removeAttribute("onmousedown", "");
		});
	}

	var dl = false;

	function beginAutoPager(){
		if(dl){
			return;
		}
		dl = true;
		var u = document.querySelector("#pnnext").getAttribute("href");
		var x = new XMLHttpRequest();
		x.open("get", u, true);
		x.onreadystatechange = function(){
			if(x.readyState == 4){
				if(x.status == 200){
					var d = new DOMParser().parseFromString(x.responseText, "text/html");
					//insert new result
					var src = d.querySelector("#rso");
					var dst = document.querySelector("#rso");
					//
					var tmp = document.createElement("div");
					tmp.innerHTML = src.innerHTML;
					//
					Array.forEach(tmp.querySelectorAll("li"), function(li){
						dst.appendChild(li);
					});
					//replace pager
					document.querySelector("#nav").innerHTML = d.querySelector("#nav").innerHTML;
				}
				dl = false;
			}
		};
		x.send("");
	}

	document.addEventListener("DOMContentLoaded", function(){
		addCSSRules();
		removeInjection();
		document.body.addEventListener("DOMSubtreeModified", removeInjection);
	});

	document.addEventListener("scroll", function(){
		if(document.documentElement.scrollHeight - document.documentElement.clientHeight - 40 <= document.documentElement.scrollTop){
			beginAutoPager();
		}
	});
})();
