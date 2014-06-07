// ==UserScript==
// @name        Google Search Improver
// @namespace   http://compmulti.com/script
// @description Google Search Improver
// @homepage    http://compmulti.com/script
// @version     0.1
// @include     http://www.google.co.jp*
// @include     http://www.google.com*
// @include     https://www.google.co.jp*
// @include     https://www.google.com*
// ==/UserScript==
//
// ( The BSD License )


var width = 1024;
/*Frame size*/
var height = 768;
/*Frame size*/
var interval = 200;
/*Google instance loading interval*/
var topX = 5;
/*topX*/
var chara = "◆";
/*Switch character*/
var num = 0;
/*Preload*/

var appVersion = window.navigator.appVersion.toLowerCase();

function getElementsByClass(searchClass) {
	if(document.all) {
		var classElements = new Array();
		var allElements = document.all;
		for( i = 0, j = 0; i < allElements.length; i++) {
			if(allElements[i].className == searchClass) {
				classElements[j] = allElements[i];
				j++;
			}
		}
	} else if(document.getElementsByTagName) {
		var classElements = new Array();
		var allElements = document.getElementsByTagName("*");
		for( i = 0, j = 0; i < allElements.length; i++) {
			if(allElements[i].className == searchClass) {
				classElements[j] = allElements[i];
				j++;
			}
		}
	} else {
		return;
	}

	return classElements;
}(function() {
	setInterval(function() {
		var checkf = document.getElementById("tabLoad");
		if(!checkf) {
			var tabLoad = document.createElement("div");
			tabLoad.id = "tabLoad";
			tabLoad.setAttribute('style', 'display: none;');
			document.getElementsByTagName("body")[0].appendChild(tabLoad);
		} else {
			if(checkf.innerHTML == "top") {
				var resultsx = document.body.getElementsByClassName("g");
				for(var i = 0, len = topX; i < len; i++) {
					GM_openInTab(resultsx[i].getElementsByTagName("a")[1].href);
				}
				checkf.innerHTML ="";
			} else if(checkf.innerHTML == "all") {
				var resultsx = document.body.getElementsByClassName("g");
				for(var i = 0, len = resultsx.length; i < len; i++) {
					GM_openInTab(resultsx[i].getElementsByTagName("a")[1].href);
				}
				checkf.innerHTML ="";
			}
		}

		// var fr = document.getElementById("iframe0");
	if(document.body.getElementsByClassName("g")[0].getElementsByTagName("a")[0].innerHTML==chara) {
				var auto = document.getElementById("autochange");
			if(parseInt(auto.innerHTML)==document.body.getElementsByClassName("g").length){
				return;
			}
		}
		document.getElementById("appbar").setAttribute('style', 'height:92px;');
		var rso = document.getElementById("rso");
		rso.setAttribute('style', 'width:' + width + 'px;');

		var results = document.body.getElementsByClassName("g");

		var autochange = document.getElementById("autochange");
		if(!autochange){
			var autochange = document.createElement("div");
			autochange.id = "autochange";
			autochange.setAttribute('style', 'display: none;');
			document.body.appendChild(autochange);
		}
			autochange.innerHTML= results.length;

		for(var i = 0, len = results.length; i < len; i++) {
			var result = results[i];
			var link = result.getElementsByTagName("a")[0];
			if(link) {
				try {
					var div = result.getElementsByTagName("div")[0];
					div.removeChild(((appVersion.indexOf("msie") == -1 )?div.getElementsByClassName("vspib"):getElementsByClass("vspib"))[0]);
					var nrgt = (appVersion.indexOf("msie") == -1 ) ? result.getElementsByClassName("nrgt") : getElementsByClass("nrgt");
					if(nrgt.length > 0)
						((appVersion.indexOf("msie") == -1 )?result.getElementsByClassName("nrgt"):getElementsByClass("nrgt"))[0].setAttribute('style', 'width:528px;');
					// var divframe = document.createElement("div");
					// divframe.id = "iframe" + i;
					// divframe.style.display = "none";
					// var ele = document.createElement("iframe");
					// ele.id = "mydiv" + i;
					// if(i < num) {
						// ele.src = link.href;
					// }
					// ele.width = width;
					// ele.height = height;
					// divframe.appendChild(ele);
					var h3 = result.getElementsByTagName("h3")[0];
					h3.id = "myh3" + i;
					var inner = h3.innerHTML;
					h3.innerHTML = "";
					var a = document.createElement("a");
					a.href = "javascript:void(0)";
					a.setAttribute('onclick', 'var d = document.getElementById("mydiv' + i + '");if(!d){var divframe = document.createElement("div");divframe.id = "iframe' + i + '";var ele = document.createElement("iframe");ele.id = "mydiv' + i + '";ele.width = ' + width + ';ele.height = ' + height + ';divframe.appendChild(ele);divframe.setAttribute("style", ";display:none;"); d =ele;document.getElementById("myh3' + i + '").appendChild(divframe);}if(!d.src){d.src="' + link.href + '"};var f = document.getElementById("iframe' + i + '");f.style.display=="none"?f.style.display = "block":f.style.display = "none";');
					a.setAttribute('style', 'text-decoration: none;');
					var str = document.createTextNode(chara);

					a.appendChild(str);
					h3.appendChild(a);
					h3.innerHTML = h3.innerHTML + inner;
					if(appVersion.indexOf("msie") == -1)
						h3.appendChild(divframe);
					else
						result.appendChild(divframe);

				} catch (e) {
					rso.filtered = false;
				}
			}
		}
		var sear = document.getElementById("resultStats");
		if(sear.innerHTML.indexOf("All") == -1) {
			var top3 = document.createElement("a");
			top3.href = "javascript:void(0)";
			top3.setAttribute('onclick', 'var resultsx = document.body.getElementsByClassName("g");for(var i = 0, len = ' + topX + '; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d){var divframe = document.createElement("div");divframe.id = "iframe" + i;var ele = document.createElement("iframe");ele.id = "mydiv" + i;ele.width = ' + width + ';ele.height = ' + height + ';divframe.appendChild(ele);divframe.setAttribute("style", "display:none;"); d =ele;document.getElementById("myh3" + i).appendChild(divframe)};if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[1].href;}var f = document.getElementById("iframe" + i);f.style.display=="none"?f.style.display = "block":f.style.display = "none";}catch(e){}}');
			top3.setAttribute('style', 'text-decoration: none;');
			var strcx = document.createTextNode("Top" + topX + " Open/Close");
			top3.appendChild(strcx);
			sear.innerHTML = sear.innerHTML + "<br>";
			sear.appendChild(top3);

			// var top32 = document.createElement("a");
			// top32.href = "javascript:void(0)";
			// top32.setAttribute('onclick', 'var resultsx = document.getElementById("rso").getElementsByTagName("li");for(var i = 0, len = ' + topX + '; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[1].href;}}catch(e){}}');
			// top32.setAttribute('style', 'text-decoration: none;');
			// var strc2x = document.createTextNode("Top" + topX + " Load");
			// top32.appendChild(strc2x);
			// sear.innerHTML = sear.innerHTML + "<br>";
			// sear.appendChild(top32);
			// sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			// sear.appendChild(top3);

			var all = document.createElement("a");
			all.href = "javascript:void(0)";
			all.setAttribute('onclick', 'var resultsx = document.body.getElementsByClassName("g");for(var i = 0, len = resultsx.length; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d){var divframe = document.createElement("div");divframe.id = "iframe" + i;var ele = document.createElement("iframe");ele.id = "mydiv" + i;ele.width = ' + width + ';ele.height = ' + height + ';divframe.appendChild(ele);divframe.setAttribute("style", "display:none;"); d =ele;document.getElementById("myh3" + i).appendChild(divframe)};if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[1].href;}var f = document.getElementById("iframe" + i);f.style.display=="none"?f.style.display = "block":f.style.display = "none";}catch(e){}}');
			all.setAttribute('style', 'text-decoration: none;');
			var strc = document.createTextNode("All Open/Close");
			all.appendChild(strc);
			sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			sear.appendChild(all);

			// var all2 = document.createElement("a");
			// all2.href = "javascript:void(0)";
			// all2.setAttribute('onclick', 'var resultsx = document.getElementById("rso").getElementsByTagName("li");for(var i = 0, len = resultsx.length; i < len; i++) {try{var d = document.getElementById("mydiv" + i);if(!d.src){d.src=resultsx[i].getElementsByTagName("a")[1].href;}}catch(e){}}');
			// all2.setAttribute('style', 'text-decoration: none;');
			// var strc2 = document.createTextNode("All Load");
			// all2.appendChild(strc2);
			// sear.innerHTML = sear.innerHTML + "<br>";
			// sear.appendChild(all2);
			// sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			// sear.appendChild(all);

			var tab = document.createElement("a");
			tab.href = "javascript:void(0)";
			tab.setAttribute('onclick', 'var checkf = document.getElementById("tabLoad");checkf.innerHTML ="top";');
			tab.setAttribute('style', 'text-decoration: none;');
			var strc = document.createTextNode("Top"+topX+" Tab");
			tab.appendChild(strc);
			sear.innerHTML = sear.innerHTML + "<br>";
			sear.appendChild(tab);

			var tab2 = document.createElement("a");
			tab2.href = "javascript:void(0)";
			tab2.setAttribute('onclick', 'var checkf = document.getElementById("tabLoad");checkf.innerHTML ="all";');
			tab2.setAttribute('style', 'text-decoration: none;');
			var strc = document.createTextNode("All Tab");
			tab2.appendChild(strc);
			sear.innerHTML = sear.innerHTML + "&nbsp;|&nbsp;";
			sear.appendChild(tab2);

		}
	}, interval);
})();