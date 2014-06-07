// ==UserScript==
// @name           ShackMessageCommentTags
// @namespace      http://www.animalbeach.net/public/monkey/
// @description    Adds Shack Tags below the message form *thanks to Awun for some changes!*
// @include http://*.shacknews.com/msgcenter/new_message.x?*
// @include http://shacknews.com/msgcenter/new_message.x?*
// @include http://*.shacknews.com/msgcenter/new_message.x
// @include http://shacknews.com/msgcenter/new_message.x
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
	    "//textarea[@name='bodytext']",
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
var postf = document.getElementById('form1');
var ShackCommentTags = document.createElement("div");
	ShackCommentTags.setAttribute('style','padding-top:15px; border:none; text-align:center');

ShackCommentTags.innerHTML ='<table cellpadding="2" border="0" cellspacing="0" style="border:none; background:inherit; width:50%" align="center">' +
	'<tr><td colspan="4">ShackCommentTags&#8482;</td></tr>' +
	'<tr><td style="border:1px solid #fff;"><span class="jt_red"><u>r</u>ed</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="r" id="red" name="sctags">r{ ... }r</a></td>' +
	'<td style="border:1px solid #fff;"><i><u>i</u>talics</i></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="i" id="italics" name="sctags">/[ ... ]/</a></td></tr>' +
	'<tr><td style="border:1px solid #fff;"><span class="jt_green"><u>g</u>reen</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="g" id="green" name="sctags">g{ ... }g</a></td>' +
	'<td style="border:1px solid #fff;"><b>bol<u>d</u></b></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="d" id="bold" name="sctags">b[ ... ]b</a></td></tr>' +
	'<tr><td style="border:1px solid #fff;"><span class="jt_blue"><u>b</u>lue</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="b" id="blue" name="sctags">b{ ... }b</a></td>' +
	'<td style="border:1px solid #fff;"><span class="jt_quote"><u>q</u>uote</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="q" id="quote" name="sctags">q[ ... ]q</a></td></tr>' +

	'<tr><td style="border:1px solid #fff;"><span class="jt_yellow"><u>y</u>ellow</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="y" id="yellow" name="sctags">y{ ... }y</a></td>' +
	'<td style="border:1px solid #fff;"><span class="jt_sample">sam<u>p</u>le</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="p" id="sample" name="sctags">s[ ... ]s</a></td></tr>' +
	'<tr><td style="border:1px solid #fff;"><span class="jt_olive">oliv<u>e</u></span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="e" id="olive" name="sctags">e[ ... ]e</a></td>' +
	'<td style="border:1px solid #fff;">u<u>nderline</u></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="u" id="underline" name="sctags">_[ ... ]_</a></td></tr>' +
	'<tr><td style="border:1px solid #fff;"><span class="jt_lime"><u>l</u>imegreen</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="l" id="limegreen" name="sctags">l[ ... ]l</a></td>' +
	'<td style="border:1px solid #fff;"><span class="jt_strike">s<u>t</u>rike</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="t" id="strike" name="sctags">-[ ... ]-</a></td></tr>' +
	'<tr><td style="border:1px solid #fff;"><span class="jt_orange"><u>o</u>range</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="o" id="orange" name="sctags">n[ ... ]n</a></td>' +
	'<td style="border:1px solid #fff;"><u>s</u><span class="jt_spoiler" onclick="return doSpoiler( event );">poiler</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="s" id="spoiler" name="sctags">o[ ... ]o</a></td></tr>' +
	'<tr><td style="border:1px solid #fff;"><span class="jt_pink"><u>m</u>ultisync</span></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="m" id="pink" name="sctags">p[ ... ]p</a></td>' +
	'<td style="border:1px solid #fff;"><pre class="jt_code"><u>c</u>ode</pre></td><td style="border:1px solid #fff;"><a href="javascript:addShackCommentTags()" accesskey="c" id="code" name="sctags">/{{ ... }}/</a></td></tr>' +
	'</table>';

if (postf) {
    postf.parentNode.insertBefore(ShackCommentTags, postf.nextSibling);
}

window.addEventListener('click', addShackCommentTags, true);

})();