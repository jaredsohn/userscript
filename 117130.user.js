// ==UserScript==
// @name        Inline frame Link Opener
// @namespace   http://compmulti.com/script/iframe.html
// @description Inline frame Link Opener
// @homepage    http://compmulti.com/script/iframe.html
// @version     0.1
// @include     http://*
// @exclude     http://www.google.co.jp/*
// @exclude     http://www.google.com/*
// @exclude     http://search.yahoo.co.jp/search*
// @exclude     http://googleads.*
// ==/UserScript==
//
// ( The MIT License )
//


(function(d, func) {

	var h = d.getElementsByTagName('head')[0];
	var s1 = d.createElement("script");
	s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js");
	s1.addEventListener('load', function() {
		var s2 = d.createElement("script");
		s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
		h.appendChild(s2);
	}, false);
	h.appendChild(s1);
})(document, function($) {

	var width = 1024;
	/*Frame size*/
	var height = 600;

	var chara = "□";

	var limitLinkNum = 200;

	var innerFlag = true;

	var innerCharLen = 15;

	function showIframe(e) {
		e.preventDefault();
		var a = e.target;

		var iframe = document.createElement("iframe");
		iframe.src = a.href;
		iframe.width = "95%";
		iframe.height = "0";
		iframe.style.verticalAlign = "top";
		iframe.style.border = "3px solid #cccccc";
		iframe.addEventListener("load", function(evt) {
			var doc = this.contentWindow.document;
			var dl = doc.getElementsByTagName("dl");
			var h = dl[0].offsetHeight;
			this.height = (h < 1000) ? h : 1000;
			doc.body.scrollTop = parseInt(dl[0].offsetTop);
		}, false);
		var aTag = document.createElement("a");
		aTag.href = a.href;
		aTag.innerHTML = a.innerHTML;
		aTag.target = "_blank";
		aTag.style.border = "3px solid #cccccc";
		aTag.style.backgroundColor = "#cccccc";

		var div = document.createElement("div");
		div.appendChild(aTag);
		div.appendChild(document.createElement("br"));
		div.appendChild(iframe);

		var parent = a.parentNode;
		parent.replaceChild(div, a);
		return false;
	}

	function createAnchorSpan(text, url) {
		var span = document.createElement("span");
		span.appendChild(document.createTextNode(text));
		with(span.style) {
			color = "blue";
			textDecoration = "underline";
			backgroundColor = "#DDDDFF";
			cursor = "pointer";
		}
		span.click = function() {
			showIframe(url);
		};
		return span;
	}

	function modifyLinks() {
		var aTags = document.getElementsByTagName("a");
		var anchorRegExp = /^&gt;&gt;\d+$/;
		var proxyDomainRegExp = /((www\d?\.|)ime\.(nu|st)|pinktower\.com)\//;
		var imageRegExp = /\.(gif|jpeg|jpg|png)$/i;
		for(var i = 0; i < aTags.length; i++) {
			var a = aTags[i];
			if(a.href.indexOf("http") != 0)
				continue;
			if(anchorRegExp.test(a.innerHTML)) {
				a.addEventListener("click", showIframe, true);
				continue;
			}

			a.href = a.href.replace(proxyDomainRegExp, "");
		}
	}

	function ttpToHttpLink() {
		var dd = document.getElementsByTagName("dd");
		var ttp = /([^h])(ttps?:\/\/[\x21-\x7E]+)/ig;
		for(var i = 0; i < dd.length; i++) {
			dd[i].innerHTML = dd[i].innerHTML.replace(ttp, "$1<a href=h$2>$2</a>");
		}
	}

	if(location.href.indexOf(".2ch.net") || location.href.indexOf(".bbspink.com/")) {
		ttpToHttpLink();
		modifyLinks();
	}


 (function() {
 	var array = [];
	var j = 0;
	function recursive(child) {
		if(j == limitLinkNum) {
			return;
		}
		for(var i = 0; i < child.length; i++) {
			if(child[i].nodeName == "A" &&child[i].id.indexOf("aframe")==-1) {
				if(child[i].href&&child[i].innerHTML.indexOf("<img")==-1&&child[i].href!=("javascript:void(0)")&&child[i].href!="#"&&
				((child[i].href.indexOf("http") == 0 && child[i].href.indexOf(window.location.host) == -1)||((innerFlag?(child[i].innerHTML.length>innerCharLen):false)&&(!child[i].onclick)))
				) {
					array.push(child[i]);
					if(j++ == limitLinkNum) {
						return;
					}
				}
				else{

				}
			} else {
				recursive(child[i].childNodes);
			}
		}
	}
	recursive(document.body.childNodes);
	for(var i = 0; i < array.length; i++) {
		var a = document.createElement("a");
		a.id = "aframe" + i;
		a.href = "javascript:void(0)";
		a.setAttribute('onclick', 'var d = document.getElementById("mydiv' + i + '");if(!d){var divframe = document.createElement("div");divframe.id = "iframe' + i + '";var ele = document.createElement("iframe");ele.id = "mydiv' + i + '";ele.width = ' + width + ';ele.height = ' + height + ';divframe.appendChild(ele);divframe.setAttribute("style", "position: absolute;display:none;background-color:white;z-index:1024;"); d =ele;document.getElementById("aframe' + i + '").nextSibling.appendChild(divframe);}if(!d.src){d.src="' + array[i].href + '"};var f = document.getElementById("iframe' + i + '");f.style.display=="none"?f.style.display = "block":f.style.display = "none";var wwidth=1024;if ( window.innerWidth ) {wwidth= window.innerWidth;}else if ( document.documentElement && document.documentElement.clientWidth != 0 ) {wwidth= document.documentElement.clientWidth;}else if ( document.body ) {wwidth= document.body.clientWidth;}var right =f.offsetLeft+(f.parentNode?f.offsetParent.offsetLeft:0)+'+width+';if(right>wwidth){if(wwidth-'+width+'-31>0){f.setAttribute("style", "position: absolute;display:block;background-color:white;z-index:1024;left:"+(wwidth-'+width+'-31)+"px;");d.setAttribute("style", "z-index:1025;");}else{f.setAttribute("style", "position: absolute;display:block;background-color:white;z-index:1024;left:0px;");d.setAttribute("style", "z-index:1025;");}}');
		a.setAttribute('style', 'text-decoration: none;');
		var str = document.createTextNode(chara);
		a.appendChild(str);
		$(array[i]).before(a);
	}

	})();



});
