// ==UserScript==
// @name           LookItUp++
// @namespace      #aVg
// @description    Become a smart monkey by easily looking up words you don't know!
// @include        *
// @version        0.1.2
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
(function() {
if(window.top != self) return;
// adapted from: http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
	var curleft = 0, curtop = 0;
	do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return {
		left : curleft,
		top : curtop
	};
}
function isChildOf(lostChild, theParent)
{
	var nextParent = lostChild;
	while((nextParent=nextParent.parentNode)!= undefined) if(nextParent==theParent) return true;
	return false;
}
function doLookup(w) {
	var sel = window.getSelection(), word = sel.toString().toLowerCase().replace(/^\s+|\s+$/g, "");
	word = w || word;
	if(word != "")
	GM_xmlhttpRequest({
		method : "POST",
		data : "123",
		url : "http://ninjawords.com/definitions/get/" + word,
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded"
		},
		onload : function(A) {
			def.innerHTML = JSON.parse(A.responseText)[0].html;
			var node = sel.anchorNode;
			if(node.nodeType==3) node = node.parentNode;
			if(!w || !isChildOf(node, def)) {
				var pos = findPos(node);
				def.style.left = pos.left + "px";
				def.style.top = pos.top + "px";
			} def.style.display = "";
			var links = def.getElementsByTagName("a");
			for(var i = links.length - 1; i>=0; --i) {
				links[i].addEventListener("click", function(e) {
					e.preventDefault();
					doLookup(this.textContent);
				}, false);
			}
		}
	});
}
var def = document.createElement("div");
def.setAttribute("style", "position: absolute; background-color: white; padding: 20px; left: 692px; top: 442px; -moz-border-radius: 10px 10px 10px 10px; border: 16px outset red;position: absolute; background-color: white; padding: 20px; left: 692px; top: 442px; -moz-border-radius: 10px 10px 10px 10px; border: 16px outset red;display:none;");
document.body.appendChild(def);
document.addEventListener("click", function(e) {
	if(!isChildOf(e.target, def)) def.style.display = "none";
}, false);
document.addEventListener("keydown", function(e) {
	if(e.keyCode == 27) def.style.display = "none";
	else if(e.ctrlKey && "INPUTEXTAREA".indexOf(e.target.nodeName) == -1) doLookup();
}, false);
document.addEventListener("dblclick", function() {
	doLookup();
}, false);
})();