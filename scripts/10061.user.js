// ==UserScript==
// @name           ShackCommentTags
// @namespace      http://www.animalbeach.net/public/monkey/
// @description    Adds Shack Tags besides the comment form *thanks to Awun for some changes!*
// @include http://*.shacknews.com/laryn.x?*
// @include http://shacknews.com/laryn.x?*
// @include http://*.shacknews.com/frame_laryn.x?*
// @include http://shacknews.com/frame_laryn.x?*
// ==/UserScript==

(function() {

function addShackCommentTags(e) {
	var el=e.target;
	if (!el) return;
	if (!el.id) return;
	if ('sctags'!=el.name) return;

	var what=el.id;

	var input = prompt("Type in the text you want to be "+what+".", "");

	var allDivs, thisDiv;
	allDivs = document.evaluate(
	    "//textarea[@name='body']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
	    thisDiv = allDivs.snapshotItem(i);

		var format = new Array(
			new Array("red", "green", "blue", "yellow", "limegreen", "olive", "orange", "pink", "italics", "bold", "quote", "sample", "underline", "strike", "spoiler", "code"),
			new Array("r{", "g{", "b{", "y{", "l[", "e[", "n[", "p[", "/[", "b[", "q[", "s[", "_[", "-[", "o[", "/{{"),
			new Array("}r", "}g", "}b", "}y", "]l", "]e", "]n", "]p", "]/", "]b", "]q", "]s", "]_", "]-", "]o", "}}/")
		);
		for(var n=0; n<format[0].length; n++) {
			if(what == format[0][n]) {
				if(input == null) {
					break;
				} else {

				var startPos = thisDiv.selectionStart;
				var endPos = thisDiv.selectionEnd;

				thisDiv.value = thisDiv.value.substring(0, startPos) + format[1][n] + input + format[2][n] + thisDiv.value.substring(endPos, thisDiv.value.length);
				
				thisDiv.focus(thisDiv.value.length);
				
				break;
				}
			}
		}
	}
}


// adds comment tags besides the comments form
var postf = document.getElementById('postform');
	postf.style.cssFloat = 'left';
var ShackCommentTags = document.createElement("div");
	ShackCommentTags.setAttribute('style','float:left; padding:5px');

ShackCommentTags.innerHTML = 'ShackCommentTags&#8482;<br /><br />' +
	'<table cellpadding="2" border="0" cellspacing="0">' +
	'<tr><td><span class="jt_red"><u>r</u>ed</span></td><td><a href="javascript:addShackCommentTags()" accesskey="r" id="red" name="sctags">r{ ... }r</a></td>' +
	'<td><i><u>i</u>talics</i></td><td><a href="javascript:addShackCommentTags()" accesskey="i" id="italics" name="sctags">/[ ... ]/</a></td></tr>' +
	'<tr><td><span class="jt_green"><u>g</u>reen</span></td><td><a href="javascript:addShackCommentTags()" accesskey="g" id="green" name="sctags">g{ ... }g</a></td>' +
	'<td><b>bol<u>d</u></b></td><td><a href="javascript:addShackCommentTags()" accesskey="d" id="bold" name="sctags">b[ ... ]b</a></td></tr>' +
	'<tr><td><span class="jt_blue"><u>b</u>lue</span></td><td><a href="javascript:addShackCommentTags()" accesskey="b" id="blue" name="sctags">b{ ... }b</a></td>' +
	'<td><span class="jt_quote"><u>q</u>uote</span></td><td><a href="javascript:addShackCommentTags()" accesskey="q" id="quote" name="sctags">q[ ... ]q</a></td></tr>' +

	'<tr><td><span class="jt_yellow"><u>y</u>ellow</span></td><td><a href="javascript:addShackCommentTags()" accesskey="y" id="yellow" name="sctags">y{ ... }y</a></td>' +
	'<td><span class="jt_sample">sam<u>p</u>le</span></td><td><a href="javascript:addShackCommentTags()" accesskey="p" id="sample" name="sctags">s[ ... ]s</a></td></tr>' +
	'<tr><td><span class="jt_olive">oliv<u>e</u></span></td><td><a href="javascript:addShackCommentTags()" accesskey="e" id="olive" name="sctags">e[ ... ]e</a></td>' +
	'<td>u<u>nderline</u></td><td><a href="javascript:addShackCommentTags()" accesskey="u" id="underline" name="sctags">_[ ... ]_</a></td></tr>' +
	'<tr><td><span class="jt_lime"><u>l</u>imegreen</span></td><td><a href="javascript:addShackCommentTags()" accesskey="l" id="limegreen" name="sctags">l[ ... ]l</a></td>' +
	'<td><span class="jt_strike">s<u>t</u>rike</span></td><td><a href="javascript:addShackCommentTags()" accesskey="t" id="strike" name="sctags">-[ ... ]-</a></td></tr>' +
	'<tr><td><span class="jt_orange"><u>o</u>range</span></td><td><a href="javascript:addShackCommentTags()" accesskey="o" id="orange" name="sctags">n[ ... ]n</a></td>' +
	'<td><u>s</u><span class="jt_spoiler" onclick="return doSpoiler( event );">poiler</span></td><td><a href="javascript:addShackCommentTags()" accesskey="s" id="spoiler" name="sctags">o[ ... ]o</a></td></tr>' +
	'<tr><td><span class="jt_pink"><u>m</u>ultisync</span></td><td><a href="javascript:addShackCommentTags()" accesskey="m" id="pink" name="sctags">p[ ... ]p</a></td>' +
	'<td><pre class="jt_code"><u>c</u>ode</pre></td><td><a href="javascript:addShackCommentTags()" accesskey="c" id="code" name="sctags">/{{ ... }}/</a></td></tr>' +
	'</table>'
	
	
	
;

if (postf) {
    postf.parentNode.insertBefore(ShackCommentTags, postf.nextSibling);
}

window.addEventListener('click', addShackCommentTags, true);

})();