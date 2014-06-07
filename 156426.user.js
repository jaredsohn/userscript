// ==UserScript==
// @name        Better NERDZ Gravatar Images
// @namespace   tag: better,nerdz,gravatar,images
// @include     http://www.nerdz.eu/*
// @version     1.0
// ==/UserScript==

(function() {
	var stuff = {
			inject: function (func) {
				var elm = document.createElement ("script");
				elm.appendChild (document.createTextNode ("(" + func + ")()"));
				(document.body || document.head || document.documentElement).appendChild (elm);
			},
			doThings: function() {
				if (typeof N.html.post == 'undefined')
					return;
				var _op = N.html.post;
				N.html.post = function (path, param, cb) {
					if (/comments\.html\.php\?action=show$/.test (path))
					{
						$.ajax ({ type: "POST", url: path, data: param, dataType: "html" }).done (function (d) {
							var doNerdzGayStuff = function (dxta) {
								cb (dxta);
								N.reloadCaptcha();
								$("#body").syntaxHighlight();
								MathJax.Hub.Queue (["Typeset"], MathJax.Hub, "body");
								N.html.eval (dxta);
							};
							// apply our gravatar fixes
							// first determine if the gravatars are enabled
							if (!/<img src="http:\/\/www\.gravatar\.com\/avatar/.test (d))
								return doNerdzGayStuff (d);
							// time for some serious regex stuff
							var sxp = /(<div id="c\d+">)<div class="nerdz_from">(?:<span style="float: right">.+?<\/span>)?<a [^>]+>(<img src="(http:\/\/www\.gravatar\.com\/avatar\/[^"]+)"[^>]+>&nbsp;)/g, match;
							while (match = sxp.exec (d))
							{
								var divid = match[1], gravatarlink = match[3], imgtag = match[2];
								// first, remove the tag from the HTML.
								d = d.replace (imgtag, "");
								// create a new img tag and put it just after the comment tag
								var newImgTag = "<img src='";
								newImgTag += gravatarlink.replace (/s=20/, "s=30");
								newImgTag += "' style='";
								newImgTag += "width: 30px; height: 30px; float: left; padding-top: 5px; padding-right: 2px;";
								newImgTag += "'/>";
								// add it
								d = d.replace (divid, divid + newImgTag);
								// fix nerdz_comments
								d = d.replace ("<div class=\"nerdz_comments\">", "<div class=\"nerdz_comments\" style=\"width: auto\">");
								//console.log ("div id " + match[1] + ", gravatar lnk " + match[3] + ", img tag " + match[2]);
							}
							//alert ((sxp.exec (d))[1]);
							// launch gay nerdz functions
							doNerdzGayStuff (d);
						});
					}
					else
						_op (path, param, cb);
				};
			}
		};
	if (typeof GM_xmlhttpRequest == "function")
		stuff.inject (stuff.doThings);
	else
		$(document).ready (stuff.doThings);
})();