// SiyaBasScript
// version 1.1 BETA!
// 2009-12-09
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script 
//           to convert  Sinhala Non
//  Unicode Text to their Unicode equivalents.
// Customized to view HotHotLanka.blogspot.com GossipLanka.blogspot.com 
//      Lankaenews.com and LankaScreen.com
// 
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "SiyaBasScript", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SiyaBasScript
// @namespace     http://galpotha.wordpress.com
// @description   Convert Non Unicode Text to Unicode
// @include       http://gossiplanka.blogspot.com/*
// @include       http://www.gossiplankanews.com/*
// @include       http://www.hothotlanka.com/*
// @include       http://hothotlanka.blogspot.com/*
// @include       http://www.lankascreen.com/*
// @include       http://www.lankaenews.com/Sinhala/*
// @include       http://mirisa.org/*
// @include       http://www.mirisa.org/*
// @include       http://www.lakbima.lk/*
//@include       http://lakbima.lk/*
// @include       http://www.lankadeepa.lk/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//
// --------------------------------------------------------------------
//

/* BEGIN LICENSE BLOCK

 Copyright (C) 2009 Keheliya Gallaba

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 END LICENSE BLOCK */

(function() {

	var replacements, regex, key, textnodes, node, i, s;
	regex = {};
	for (key in replacements) {
		regex[key] = new RegExp(key, 'g');
	}

	if (/^http:\/\/hothotlanka\.blogspot\.com\//.test(location.href) || /^http:\/\/www\.hothotlanka\.com\//.test(location.href) ) {
textnodes = document.evaluate("//* [@style='font-family: Dhananjayaweb;']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();

textnodes = document.evaluate("//body//div [@class='post-body entry-content']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();

		/*textnodes = document.evaluate(
				"//body//div [@id='main-wrapper']//text()["
						+ "not(ancestor::script) and not(ancestor::style)]",
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
*/
	} else if (/^http:\/\/gossiplanka\.blogspot\.com\//.test(location.href) || /^http:\/\/www\.gossiplankanews\.com\//.test(location.href)) {
		textnodes = document.evaluate("//body//span [@style='font-family: Dhananjayaweb;']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
		/*textnodes = document.evaluate(
				"//body//div [@class='widget-content']//text()["
						+ "not(ancestor::script) and not(ancestor::style)]",
				document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();*/
	} else if (/^http:\/\/www\.lankaenews\.com\//.test(location.href)) {
/*
var arElements = document.getElementsByTagName('*');
for (var i = arElements.length - 1; i >= 0; i--) {
var elm = arElements[i];
var style = getComputedStyle(elm, '');
if (style.fontFamily.match(/sandaru-n/i)) {
alert(elm.text());
}
}

var jPrelimNodes    = $("*:not(html, head, title, meta, script, link, style, body)");

textnodes    = jPrelimNodes.map 
                    (
                        function () 
                        {
                            var jThis   = $(this);
                        //    if (jThis.children().length <= 3)   //-- Ignore containers.
                            {
                                if (/^\bsandaru-n\b/i.test (jThis.css ("font-family") ) )
				
                                    return jThis.text(); // Or return "this" or "jThis.text()", as desired.

                            }
                            return null;
                        } 
                    ).get ();

for (var i in textnodes) {
       GM_log('boo :'+textnodes[i]);
}
var j=0;
SiyaBas_convert_special();
var fullnodes    = jPrelimNodes.map 
                    (
                        function () 
                        {
                            var jThis   = $(this);
                        //  if (jThis.children().length <= 3)   //-- Ignore containers.
                            {
                                if (/^\bsandaru-n\b/i.test (jThis.css ("font-family") ) )
{			
				jThis.text(textnodes[j]);j+=1;
                                    return this; // Or return "this" or "jThis.text()", as desired.
}

                            }
                            return null;
                        } 
                    ).get ();*/

/*
var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
 if (style.fontFamily.match(/sandaru-n/i)) {
textnodes.push(tags[i]);
}
        }
SiyaBas_convert();


texts = document.evaluate("//text()", document,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i in texts) {
        var style = getComputedStyle(texts[i].parentNode(), '');
 if (style.fontFamily.match(/sandaru-n/i)) {
alert(texts[i]);
textnodes.push(texts[i]);
}
SiyaBas_convert();


var tags = document.getElementsByTagName('*');
for (var i in tags) {
        var style = getComputedStyle(tags[i], '');
        if (style.fontFamily.match(/sandaru-n/i)) {
                textnodes.push(i);
alert(style.fontFamily);

        }
}
SiyaBas_convert();

textnodes = document.evaluate("//* [@style='font-family: sandaru-n;']//text()", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();

*/

		textnodes = document.evaluate("//body//tbody//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();


	} else if (/^http:\/\/www\.lankascreen\.com\//.test(location.href)) {
		textnodes = document.evaluate("//body//tbody//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
	} else if (/^http:\/\/mirisa\.org\//.test(location.href)||/^http:\/\/www\.mirisa\.org\//.test(location.href)) {
		textnodes = document.evaluate("//body//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_conv();
	
	} else if (/^http:\/\/www\.lakbima\.lk\//.test(location.href)||/^http:\/\/lakbima\.lk\//.test(location.href)) {
		textnodes = document.evaluate("//body//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_conv();

	} else if (/^http:\/\/www\.lankadeepa\.lk\//.test(location.href)) {
textnodes = document.evaluate("//* [@face='wijeya']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
textnodes = document.evaluate("//* [@face='Wijeya']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
/*textnodes = document.evaluate("//body//font[@face='wijeya']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
textnodes = document.evaluate("//body//font[@face='Wijeya']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
*/
		/*textnodes = document.evaluate("//body//td[@width='90%']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
		textnodes = document.evaluate("//body//td[@height='92']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
		textnodes = document.evaluate("//body//td[@height='700']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
		textnodes = document.evaluate("//body//td[@height='300']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
		textnodes = document.evaluate("//body//td[@valign='top']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
		textnodes = document.evaluate("//body//td[@height='82']//text()["
				+ "not(ancestor::script) and not(ancestor::style)]", document,
				null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		SiyaBas_convert();
*/
	}
else if  (/^http:\/\/www\.metta\.lk\/tipitaka\//.test(location.href)) {
      textnodes = document.evaluate("//body//text()[" +"not(ancestor::script) and not(ancestor::style)]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
SiyaBas_metta_convert();
}
else if  (/^http:\/\/www\.metta\.lk\/sinhala\//.test(location.href)) {
      textnodes = document.evaluate("//body//text()[" +"not(ancestor::script) and not(ancestor::style)]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
SiyaBas_metta_convert();
}
	function SiyaBas_convert() {
GM_log('entered function');
		for (i = 0; i < textnodes.snapshotLength; i += 1) {

			node = textnodes.snapshotItem(i);
			text = node.data;
GM_log('node data'+ node);
GM_log('inside func'+text);
			text = text.replace(/\'/g, "♥");
			text = text.replace(/\^/g, "Ѫ");
			text = text.replace(/\&/g, "Ѧ");
			text = text.replace(/\"/g, "ʘ");
			text = text.replace(/@/g, "Ϣ");
			text = text.replace(/\(/g, "ƨ");
			text = text.replace(/\]/g, "Ɣ");
			text = text.replace(/\$/g, "ɤ");
			text = text.replace(/ff;%/g, "ත්‍රෛ");
			text = text.replace(/ffY/g, "ශෛ");
			text = text.replace(/ffp/g, "චෛ");
			text = text.replace(/ffc/g, "ජෛ");
			text = text.replace(/ffl/g, "කෛ");
			text = text.replace(/ffu/g, "මෛ");
			text = text.replace(/ffm/g, "පෛ");
			text = text.replace(/ffo/g, "දෛ");
			text = text.replace(/ff;/g, "තෛ");
			text = text.replace(/ffk/g, "නෛ");
			text = text.replace(/ffO/g, "ධෛ");
			text = text.replace(/ffj/g, "වෛ");
			text = text.replace(/fm%!/g, "ප්‍රෞ");
			text = text.replace(/fIHda/g, "ෂ්‍යෝ");
			text = text.replace(/fPHda/g, "ඡ්‍යෝ");
			text = text.replace(/fVHda/g, "ඪ්‍යෝ");
			text = text.replace(/f>Hda/g, "ඝ්‍යෝ");
			text = text.replace(/fLHda/g, "ඛ්‍යෝ");
			text = text.replace(/f<Hda/g, "ළ්‍යෝ");
			text = text.replace(/fMHda/g, "ඵ්‍යෝ");
			text = text.replace(/fGHda/g, "ඨ්‍යෝ");
			text = text.replace(/fYHda/g, "ශ්‍යෝ");
			text = text.replace(/fÌHda/g, "ක්‍ෂ්‍යෝ");
			text = text.replace(/fnHda/g, "බ්‍යෝ");
			text = text.replace(/fpHda/g, "ච්‍යෝ");
			text = text.replace(/fâHda/g, "ඩ්‍යෝ");
			text = text.replace(/f\*Hda/g, "ෆ්‍යෝ");
			text = text.replace(/f\.Hda/g, "ග්‍යෝ");
			text = text.replace(/fcHda/g, "ජ්‍යෝ");
			text = text.replace(/flHda/g, "ක්‍යෝ");
			text = text.replace(/f,Hda/g, "ල්‍යෝ");
			text = text.replace(/fuHda/g, "ම්‍යෝ");
			text = text.replace(/fkHda/g, "න්‍යෝ");
			text = text.replace(/fmHda/g, "ප්‍යෝ");
			text = text.replace(/foHda/g, "ද්‍යෝ");
			text = text.replace(/fiHda/g, "ස්‍යෝ");
			text = text.replace(/fgHda/g, "ට්‍යෝ");
			text = text.replace(/fjHda/g, "ව්‍යෝ");
			text = text.replace(/f;Hda/g, "ත්‍යෝ");
			text = text.replace(/fNHda/g, "භ්‍යෝ");
			text = text.replace(/fOHda/g, "ධ්‍යෝ");
			text = text.replace(/f:Hda/g, "ථ්‍යෝ");
			text = text.replace(/fIHd/g, "ෂ්‍යො");
			text = text.replace(/fYHd/g, "ශ්‍යො");
			text = text.replace(/fLHd/g, "ඛ්‍යො");
			text = text.replace(/fÌHd/g, "ක්‍ෂ්‍යො");
			text = text.replace(/fnHd/g, "බ්‍යො");
			text = text.replace(/fjHd/g, "ව්‍යො");
			text = text.replace(/fvHd/g, "ඩ්‍යො");
			text = text.replace(/f\*Hd/g, "ෆ්‍යො");
			text = text.replace(/f\.Hd/g, "ග්‍යො");
			text = text.replace(/fcHd/g, "ජ්‍යො");
			text = text.replace(/flHd/g, "ක්‍යො");
			text = text.replace(/fuHd/g, "ම්‍යො");
			text = text.replace(/fmHd/g, "ප්‍යො");
			text = text.replace(/foHd/g, "ද්‍යො");
			text = text.replace(/fiHd/g, "ස්‍යො");
			text = text.replace(/fgHd/g, "ට්‍යො");
			text = text.replace(/fjHd/g, "ව්‍යො");
			text = text.replace(/fkHd/g, "න්‍යො");
			text = text.replace(/f;Hd/g, "ත්‍යො");
			text = text.replace(/fNHd/g, "භ්‍යො");
			text = text.replace(/fOHd/g, "ධ්‍යො");
			text = text.replace(/f:Hd/g, "ථ්‍යො");
			text = text.replace(/fIH/g, "ෂ්‍යෙ");
			text = text.replace(/fPH/g, "ඡ්‍යෙ");
			text = text.replace(/f<H/g, "ළ්‍යෙ");
			text = text.replace(/fKH/g, "ණ්‍යෙ");
			text = text.replace(/fpH/g, "ච්‍යෙ");
			text = text.replace(/f,H/g, "ල්‍යෙ");
			text = text.replace(/fkH/g, "න්‍යෙ");
			text = text.replace(/fYH/g, "ශ්‍යෙ");
			text = text.replace(/fLH/g, "ඛ්‍යෙ");
			text = text.replace(/fÌH/g, "ක්‍ෂ්‍ය");
			text = text.replace(/fnH/g, "බ්‍යෙ");
			text = text.replace(/fvH/g, "ඩ්‍යෙ");
			text = text.replace(/f\*H/g, "ෆ්‍යෙ");
			text = text.replace(/f\.H/g, "ග්‍යෙ");
			text = text.replace(/fcH/g, "ජ්‍යෙ");
			text = text.replace(/flH/g, "ක්‍යෙ");
			text = text.replace(/fuH/g, "ම්‍යෙ");
			text = text.replace(/fmH/g, "ප්‍යෙ");
			text = text.replace(/foH/g, "ද්‍යෙ");
			text = text.replace(/fiH/g, "ස්‍යෙ");
			text = text.replace(/fgH/g, "ට්‍යෙ");
			text = text.replace(/fjH/g, "ව්‍යෙ");
			text = text.replace(/f;H/g, "ත්‍යෙ");
			text = text.replace(/fNH/g, "භ්‍යෙ");
			text = text.replace(/fOH/g, "ධ්‍යෙ");
			text = text.replace(/f:H/g, "ථ්‍යෙ");
			text = text.replace(/fI%da/g, "ෂ්‍රෝ");
			text = text.replace(/f>%da/g, "ඝ්‍රෝ");
			text = text.replace(/fY%da/g, "ශ්‍රෝ");
			text = text.replace(/fÌ%da/g, "ක්‍ෂ්‍රෝ");
			text = text.replace(/fn%da/g, "බ්‍රෝ");
			text = text.replace(/fv%da/g, "ඩ්‍රෝ");
			text = text.replace(/f\*%da/g, "ෆ්‍රෝ");
			text = text.replace(/f\.%da/g, "ග්‍රෝ");
			text = text.replace(/fl%da/g, "ක්‍රෝ");
			text = text.replace(/fm%da/g, "ප්‍රෝ");
			text = text.replace(/føda/g, "ද්‍රෝ");
			text = text.replace(/fi%da/g, "ස්‍රෝ");
			text = text.replace(/fg%da/g, "ට්‍රෝ");
			text = text.replace(/f;%da/g, "ත්‍රෝ");
			text = text.replace(/fY%d/g, "ශ්‍රො");
			text = text.replace(/fv%d/g, "ඩ්‍රො");
			text = text.replace(/f\*%d/g, "ෆ්‍රො");
			text = text.replace(/f\.%d/g, "ග්‍රො");
			text = text.replace(/fl%d/g, "ක්‍රො");
			text = text.replace(/fm%d/g, "ප්‍රො");
			text = text.replace(/fød/g, "ද්‍රො");
			text = text.replace(/fi%d/g, "ස්‍රො");
			text = text.replace(/fg%d/g, "ට්‍රො");
			text = text.replace(/f;%d/g, "ත්‍රො");
			text = text.replace(/%a/g, "a%");
			text = text.replace(/fYa%/g, "ශ්‍රේ");
			text = text.replace(/fí%/g, "බ්‍රේ");
			text = text.replace(/fâ%/g, "ඩ්‍රේ");
			text = text.replace(/f\*a%/g, "ෆ්‍රේ");
			text = text.replace(/f\.a%/g, "ග්‍රේ");
			text = text.replace(/fla%/g, "ක්‍රේ");
			text = text.replace(/fma%/g, "ප්‍රේ");
			text = text.replace(/føa/g, "ද්‍රේ");
			text = text.replace(/fia%/g, "ස්‍රේ");
			text = text.replace(/f;a%/g, "ත්‍රේ");
			text = text.replace(/fè%/g, "ධ්‍රේ");
			text = text.replace(/fI%/g, "ෂ්‍රෙ");
			text = text.replace(/fY%/g, "ශ්‍රෙ");
			text = text.replace(/fn%/g, "බ්‍රෙ");
			text = text.replace(/f\*%/g, "ෆ්‍රෙ");
			text = text.replace(/f\.%/g, "ග්‍රෙ");
			text = text.replace(/fl%/g, "ක්‍රෙ");
			text = text.replace(/fm%/g, "ප්‍රෙ");
			text = text.replace(/fø/g, "ද්‍රෙ");
			text = text.replace(/fi%/g, "ස්‍රෙ");
			text = text.replace(/f;%/g, "ත්‍රෙ");
			text = text.replace(/fN%/g, "භ්‍රෙ");
			text = text.replace(/fO%/g, "ධ්‍රෙ");
			text = text.replace(/H/g, "්‍ය");
			text = text.replace(/%/g, "්‍ර");
			text = text.replace(/fI!/g, "ෂෞ");
			text = text.replace(/fP!/g, "ඡෞ");
			text = text.replace(/fY!/g, "ශෞ");
			text = text.replace(/fn!/g, "බෞ");
			text = text.replace(/fp!/g, "චෞ");
			text = text.replace(/fv!/g, "ඩෞ");
			text = text.replace(/f\*!/g, "ෆෞ");
			text = text.replace(/f\.!/g, "ගෞ");
			text = text.replace(/fc!/g, "ජෞ");
			text = text.replace(/fl!/g, "කෞ");
			text = text.replace(/f,!/g, "ලෞ");
			text = text.replace(/fu!/g, "මෞ");
			text = text.replace(/fk!/g, "නෞ");
			text = text.replace(/fm!/g, "පෞ");
			text = text.replace(/fo!/g, "දෞ");
			text = text.replace(/fr!/g, "රෞ");
			text = text.replace(/fi!/g, "සෞ");
			text = text.replace(/fg!/g, "ටෞ");
			text = text.replace(/f;!/g, "තෞ");
			text = text.replace(/fN!/g, "භෞ");
			text = text.replace(/f\[!/g, "ඤෞ");
			text = text.replace(/fIda/g, "ෂෝ");
			text = text.replace(/fUda/g, "ඹෝ");
			text = text.replace(/fPda/g, "ඡෝ");
			text = text.replace(/fVda/g, "ඪෝ");
			text = text.replace(/f>da/g, "ඝෝ");
			text = text.replace(/fLda/g, "ඛෝ");
			text = text.replace(/f<da/g, "ළෝ");
			text = text.replace(/fÛda/g, "ඟෝ");
			text = text.replace(/fKda/g, "ණෝ");
			text = text.replace(/fMda/g, "ඵෝ");
			text = text.replace(/fGda/g, "ඨෝ");
			text = text.replace(/fËda/g, "ඬෝ");
			text = text.replace(/fYda/g, "ශෝ");
			text = text.replace(/f\{da/g, "ඥෝ");
			text = text.replace(/f\|da/g, "ඳෝ");
			text = text.replace(/fÌda/g, "ක්‍ෂෝ");
			text = text.replace(/fnda/g, "බෝ");
			text = text.replace(/fpda/g, "චෝ");
			text = text.replace(/fvda/g, "ඩෝ");
			text = text.replace(/f\*da/g, "ෆෝ");
			text = text.replace(/f\.da/g, "ගෝ");
			text = text.replace(/fyda/g, "හෝ");
			text = text.replace(/fcda/g, "ජෝ");
			text = text.replace(/flda/g, "කෝ");
			text = text.replace(/f,da/g, "ලෝ");
			text = text.replace(/fuda/g, "මෝ");
			text = text.replace(/fkda/g, "නෝ");
			text = text.replace(/fmda/g, "පෝ");
			text = text.replace(/foda/g, "දෝ");
			text = text.replace(/frda/g, "රෝ");
			text = text.replace(/fida/g, "සෝ");
			text = text.replace(/fgda/g, "ටෝ");
			text = text.replace(/fjda/g, "වෝ");
			text = text.replace(/f;da/g, "තෝ");
			text = text.replace(/fNda/g, "භෝ");
			text = text.replace(/fhda/g, "යෝ");
			text = text.replace(/f\[da/g, "ඤෝ");
			text = text.replace(/fOda/g, "ධෝ");
			text = text.replace(/f:da/g, "ථෝ");
			text = text.replace(/fId/g, "ෂො");
			text = text.replace(/fUd/g, "ඹො");
			text = text.replace(/fPd/g, "ඡො");
			text = text.replace(/fVd/g, "ඪො");
			text = text.replace(/f>d/g, "ඝො");
			text = text.replace(/fLd/g, "ඛො");
			text = text.replace(/f<d/g, "ළො");
			text = text.replace(/fÕd/g, "ඟො");
			text = text.replace(/fKd/g, "ණො");
			text = text.replace(/fMd/g, "ඵො");
			text = text.replace(/fGd/g, "ඨො");
			text = text.replace(/fËd/g, "ඬො");
			text = text.replace(/fYd/g, "ශො");
			text = text.replace(/f\{d/g, "ඥො");
			text = text.replace(/f\|d/g, "ඳො");
			text = text.replace(/fÌd/g, "ක්‍ෂො");
			text = text.replace(/fnd/g, "බො");
			text = text.replace(/fpd/g, "චො");
			text = text.replace(/fvd/g, "ඩො");
			text = text.replace(/f\*d/g, "ෆො");
			text = text.replace(/f\.d/g, "ගො");
			text = text.replace(/fyd/g, "හො");
			text = text.replace(/fcd/g, "ජො");
			text = text.replace(/fld/g, "කො");
			text = text.replace(/f,d/g, "ලො");
			text = text.replace(/fud/g, "මො");
			text = text.replace(/fkd/g, "නො");
			text = text.replace(/fmd/g, "පො");
			text = text.replace(/fod/g, "දො");
			text = text.replace(/frd/g, "රො");
			text = text.replace(/fid/g, "සො");
			text = text.replace(/fgd/g, "ටො");
			text = text.replace(/fjd/g, "වො");
			text = text.replace(/f;d/g, "තො");
			text = text.replace(/fNd/g, "භො");
			text = text.replace(/fhd/g, "යො");
			text = text.replace(/f\[d/g, "ඤො");
			text = text.replace(/fOd/g, "ධො");
			text = text.replace(/f:d/g, "ථො");
			text = text.replace(/fIa/g, "ෂේ");
			text = text.replace(/fò/g, "ඹේ");
			text = text.replace(/fþ/g, "ඡේ");
			text = text.replace(/f\\a/g, "ඪේ");
			text = text.replace(/f>a/g, "ඝේ");
			text = text.replace(/fÄ/g, "ඛේ");
			text = text.replace(/f<a/g, "ළේ");
			text = text.replace(/fÛa/g, "ඟේ");
			text = text.replace(/fKa/g, "ණේ");
			text = text.replace(/fMa/g, "ඵේ");
			text = text.replace(/fGa/g, "ඨේ");
			text = text.replace(/få/g, "ඬේ");
			text = text.replace(/fYa/g, "ශේ");
			text = text.replace(/f\{a/g, "ඥේ");
			text = text.replace(/f\|a/g, "ඳේ");
			text = text.replace(/fÌa/g, "ක්‍ෂේ");
			text = text.replace(/fí/g, "බේ");
			text = text.replace(/fÉ/g, "චේ");
			text = text.replace(/fâ/g, "ඩේ");
			text = text.replace(/f\*a/g, "ෆේ");
			text = text.replace(/f\.a/g, "ගේ");
			text = text.replace(/fya/g, "හේ");
			text = text.replace(/fma/g, "පේ");
			text = text.replace(/fla/g, "කේ");
			text = text.replace(/f,a/g, "ලේ");
			text = text.replace(/fï/g, "මේ");
			text = text.replace(/fka/g, "නේ");
			text = text.replace(/f\–/g, "ජේ");
			text = text.replace(/foa/g, "දේ");
			text = text.replace(/f¾/g, "රේ");
			text = text.replace(/fia/g, "සේ");
			text = text.replace(/fÜ/g, "ටේ");
			text = text.replace(/fõ/g, "වේ");
			text = text.replace(/f;a/g, "තේ");
			text = text.replace(/fNa/g, "භේ");
			text = text.replace(/fha/g, "යේ");
			text = text.replace(/f\[a/g, "ඤේ");
			text = text.replace(/fè/g, "ධේ");
			text = text.replace(/f:a/g, "ථේ");
			text = text.replace(/fI/g, "ෂෙ");
			text = text.replace(/fU/g, "ඹෙ");
			text = text.replace(/ft/g, "ඓ");
			text = text.replace(/fP/g, "ඡෙ");
			text = text.replace(/fV/g, "ඪෙ");
			text = text.replace(/f>/g, "ඝෙ");
			text = text.replace(/fn/g, "ඛෙ");
			text = text.replace(/f</g, "ළෙ");
			text = text.replace(/fÛ/g, "ඟෙ");
			text = text.replace(/fK/g, "ණෙ");
			text = text.replace(/fM/g, "ඵෙ");
			text = text.replace(/fG/g, "ඨෙ");
			text = text.replace(/fË/g, "ඬෙ");
			text = text.replace(/fY/g, "ශෙ");
			text = text.replace(/f\{/g, "ඥෙ");
			text = text.replace(/fË/g, "ඳෙ");
			text = text.replace(/fÌ/g, "ක්‍ෂෙ");
			text = text.replace(/fn/g, "බෙ");
			text = text.replace(/fp/g, "චෙ");
			text = text.replace(/fv/g, "ඩෙ");
			text = text.replace(/f\*/g, "ෆෙ");
			text = text.replace(/f\./g, "ගෙ");
			text = text.replace(/fy/g, "හෙ");
			text = text.replace(/fc/g, "ජෙ");
			text = text.replace(/fl/g, "කෙ");
			text = text.replace(/f,/g, "ලෙ");
			text = text.replace(/fu/g, "මෙ");
			text = text.replace(/fk/g, "නෙ");
			text = text.replace(/fm/g, "පෙ");
			text = text.replace(/fo/g, "දෙ");
			text = text.replace(/fr/g, "රෙ");
			text = text.replace(/fi/g, "සෙ");
			text = text.replace(/fg/g, "ටෙ");
			text = text.replace(/fj/g, "වෙ");
			text = text.replace(/f;/g, "තෙ");
			text = text.replace(/fN/g, "භෙ");
			text = text.replace(/fh/g, "යෙ");
			text = text.replace(/f\[/g, "ඤෙ");
			text = text.replace(/fO/g, "ධෙ");
			text = text.replace(/f:/g, "ථෙ");
			text = text.replace(/;=/g, "තු");
			text = text.replace(/\.=/g, "ගු");
			text = text.replace(/l=/g, "කු");
			text = text.replace(/;\+/g, "තූ");
			text = text.replace(/N\+/g, "භූ");
			text = text.replace(/N\=/g, "භු");
			text = text.replace(/\.\+/g, "ගූ");
			text = text.replace(/l\+/g, "කූ");
			text = text.replace(/re/g, "රු");
			text = text.replace(/rE/g, "රූ");
			text = text.replace(/wd/g, "ආ");
			text = text.replace(/we/g, "ඇ");
			text = text.replace(/wE/g, "ඈ");
			text = text.replace(/W!/g, "ඌ");
			text = text.replace(/T!/g, "ඖ");
			text = text.replace(/ta/g, "ඒ");
			text = text.replace(/\´/g, "ඕ");
			text = text.replace(/¢/g, "ඳි");
			text = text.replace(/£/g, "ඳී");
			text = text.replace(/¥/g, "දූ");
			text = text.replace(/§/g, "දී");
			text = text.replace(/\¨/g, "ලූ");
			text = text.replace(/©/g, "ර්‍ය");
			text = text.replace(/ª/g, "ඳූ");
			text = text.replace(/¾/g, "ර්");
			text = text.replace(/À/g, "ඨි");
			text = text.replace(/Á/g, "ඨී");
			text = text.replace(/Â/g, "ඡී");
			text = text.replace(/Ä/g, "ඛ්");
			text = text.replace(/Å/g, "ඛි");
			text = text.replace(/Æ/g, "ලු");
			text = text.replace(/Ç/g, "ඛී");
			text = text.replace(/È/g, "දි");
			text = text.replace(/É/g, "ච්");
			text = text.replace(/Ê/g, "ජ්");
			text = text.replace(/Í/g, "රී");
			text = text.replace(/Î/g, "ඪී");
			text = text.replace(/Ð/g, "ඪී");
			text = text.replace(/Ñ/g, "චි");
			text = text.replace(/Ò/g, "ථී");
			text = text.replace(/Ó/g, "ථී");
			text = text.replace(/Ô/g, "ජී");
			text = text.replace(/Ö/g, "චී");
			text = text.replace(/Ù/g, "ඞ්");
			text = text.replace(/Ú/g, "ඵී");
			text = text.replace(/Ü/g, "ට්");
			text = text.replace(/Ý/g, "ඵි");
			text = text.replace(/ß/g, "රි");
			text = text.replace(/à/g, "ටී");
			text = text.replace(/á/g, "ටි");
			text = text.replace(/â/g, "ඩ්");
			text = text.replace(/ã/g, "ඩී");
			text = text.replace(/ä/g, "ඩි");
			text = text.replace(/å/g, "ඬ්");
			text = text.replace(/ç/g, "ඬි");
			text = text.replace(/è/g, "ධ්");
			text = text.replace(/é/g, "ඬී");
			text = text.replace(/ê/g, "ධි");
			text = text.replace(/ë/g, "ධී");
			text = text.replace(/ì/g, "බි");
			text = text.replace(/í/g, "බ්");
			text = text.replace(/î/g, "බී");
			text = text.replace(/ï/g, "ම්");
			text = text.replace(/ð/g, "ජි");
			text = text.replace(/ñ/g, "මි");
			text = text.replace(/ò/g, "ඹ්");
			text = text.replace(/ó/g, "මී");
			text = text.replace(/ô/g, "ඹි");
			text = text.replace(/õ/g, "ව්");
			text = text.replace(/ö/g, "ඹී");
			text = text.replace(/÷/g, "ඳු");
			text = text.replace(/ø/g, "ද්‍ර");
			text = text.replace(/ù/g, "වී");
			text = text.replace(/ú/g, "වි");
			text = text.replace(/û/g, "ඞ්");
			text = text.replace(/ü/g, "ඞී");
			text = text.replace(/ý/g, "ඡි");
			text = text.replace(/þ/g, "ඡ්");
			text = text.replace(/ÿ/g, "දු");
			text = text.replace(/±/g, "දැ");
			text = text.replace(/\–/g, "ජ්");
			text = text.replace(/\“/g, "ර්‍ණ");
			text = text.replace(/\"/g, "ණී");
			text = text.replace(/„/g, "ජී");
			text = text.replace(/‰/g, "ඡි");
			text = text.replace(//g, "ඩි");
			text = text.replace(/™/g, "ඤු");
			text = text.replace(/\./g, "ග");
			text = text.replace(/¿/g, "ළු");
			text = text.replace(/I/g, "ෂ");
			text = text.replace(/x/g, "ං");
			text = text.replace(/\#/g, "ඃ");
			text = text.replace(/U/g, "ඹ");
			text = text.replace(/P/g, "ඡ");
			text = text.replace(/V/g, "ඪ");
			text = text.replace(/>/g, "ඝ");
			text = text.replace(/B/g, "ඊ");
			text = text.replace(/CO/g, "ඣ");
			text = text.replace(/L/g, "ඛ");
			text = text.replace(/</g, "ළ");
			text = text.replace(/Û/g, "ඟ");
			text = text.replace(/Ë/g, "ඬ");
			text = text.replace(/K/g, "ණ");
			text = text.replace(/M/g, "ඵ");
			text = text.replace(/G/g, "ඨ");
			text = text.replace(/\#/g, "ඃ");
			text = text.replace(/\&/g, ")");
			text = text.replace(/\(/g, ":");
			text = text.replace(/\)/g, "-");
			text = text.replace(/\*/g, "ෆ");
			text = text.replace(/\,/g, "ල");
			text = text.replace(/\-/g, "-");
			text = text.replace(/\//g, "රැ");
			text = text.replace(/:/g, "ථ");
			text = text.replace(/;/g, "ත");
			text = text.replace(/</g, "ළ");
			text = text.replace(/>/g, "ඝ");
			text = text.replace(/\?/g, "රෑ");
			text = text.replace(/B/g, "ඊ");
			text = text.replace(/C/g, "ක‍");
			text = text.replace(/F/g, "ත‍");
			text = text.replace(/G/g, "ඨ");
			text = text.replace(/H/g, "්‍ය");
			text = text.replace(/I/g, "ෂ");
			text = text.replace(/J/g, "න‍");
			text = text.replace(/K/g, "ණ");
			text = text.replace(/L/g, "ඛ");
			text = text.replace(/M/g, "ඵ");
			text = text.replace(/N/g, "භ");
			text = text.replace(/O/g, "ධ");
			text = text.replace(/P/g, "ඡ");
			text = text.replace(/R/g, "ඍ");
			text = text.replace(/T/g, "ඔ");
			text = text.replace(/U/g, "ඹ");
			text = text.replace(/V/g, "ඪ");
			text = text.replace(/W/g, "උ");
			text = text.replace(/Y/g, "ශ");
			text = text.replace(/\[/g, "ඤ");
			text = text.replace(/b/g, "ඉ");
			text = text.replace(/c/g, "ජ");
			text = text.replace(/g/g, "ට");
			text = text.replace(/h/g, "ය");
			text = text.replace(/i/g, "ස");
			text = text.replace(/j/g, "ව");
			text = text.replace(/k/g, "න");
			text = text.replace(/l/g, "ක");
			text = text.replace(/m/g, "ප");
			text = text.replace(/n/g, "බ");
			text = text.replace(/o/g, "ද");
			text = text.replace(/p/g, "ච");
			text = text.replace(/r/g, "ර");
			text = text.replace(/t/g, "එ");
			text = text.replace(/u/g, "ම");
			text = text.replace(/v/g, "ඩ");
			text = text.replace(/w/g, "අ");
			text = text.replace(/y/g, "හ");
			text = text.replace(/Õ/g, "ඟ");
			text = text.replace(/\{/g, "ඥ");
			text = text.replace(/\|/g, "ඳ");
			text = text.replace(/Ì/g, "ක්‍ෂ");
			text = text.replace(/µ/g, "ද්‍ය");
			text = text.replace(/e/g, "ැ");
			text = text.replace(/E/g, "ෑ");
			text = text.replace(/f/g, "ෙ");
			text = text.replace(/q/g, "ු");
			text = text.replace(/s/g, "ි");
			text = text.replace(/Q/g, "ූ");
			text = text.replace(/S/g, "ී");
			text = text.replace(/D/g, "ෘ");
			text = text.replace(/DD/g, "ෲ");
			text = text.replace(/\!/g, "ෟ");
			text = text.replace(/d/g, "ා");
			text = text.replace(/a/g, "්");
			text = text.replace(/♥/g, ".");
			text = text.replace(/Ѫ/g, "(");
			text = text.replace(/Ѧ/g, ")");
			text = text.replace(/ʘ/g, ",");
			text = text.replace(/Ϣ/g, "?");
			text = text.replace(/ƨ/g, ":");
			text = text.replace(/Ɣ/g, "%");
			text = text.replace(/ɤ/g, "/");

			node.data = text;

		}
	}
function SiyaBas_convert_special() {
GM_log('entered function special');
		for (var i in textnodes){

			node = textnodes[i];
			text = node;
/*
		for (i = 0; i < textnodes.snapshotLength; i += 1) {
			node = textnodes.snapshotItem(i);
			text = node;
*/

GM_log('node data special'+ node);
GM_log('inside func special'+text);
			text = text.replace(/\'/g, "♥");
			text = text.replace(/\^/g, "Ѫ");
			text = text.replace(/\&/g, "Ѧ");
			text = text.replace(/\"/g, "ʘ");
			text = text.replace(/@/g, "Ϣ");
			text = text.replace(/\(/g, "ƨ");
			text = text.replace(/\]/g, "Ɣ");
			text = text.replace(/\$/g, "ɤ");
			text = text.replace(/ff;%/g, "ත්‍රෛ");
			text = text.replace(/ffY/g, "ශෛ");
			text = text.replace(/ffp/g, "චෛ");
			text = text.replace(/ffc/g, "ජෛ");
			text = text.replace(/ffl/g, "කෛ");
			text = text.replace(/ffu/g, "මෛ");
			text = text.replace(/ffm/g, "පෛ");
			text = text.replace(/ffo/g, "දෛ");
			text = text.replace(/ff;/g, "තෛ");
			text = text.replace(/ffk/g, "නෛ");
			text = text.replace(/ffO/g, "ධෛ");
			text = text.replace(/ffj/g, "වෛ");
			text = text.replace(/fm%!/g, "ප්‍රෞ");
			text = text.replace(/fIHda/g, "ෂ්‍යෝ");
			text = text.replace(/fPHda/g, "ඡ්‍යෝ");
			text = text.replace(/fVHda/g, "ඪ්‍යෝ");
			text = text.replace(/f>Hda/g, "ඝ්‍යෝ");
			text = text.replace(/fLHda/g, "ඛ්‍යෝ");
			text = text.replace(/f<Hda/g, "ළ්‍යෝ");
			text = text.replace(/fMHda/g, "ඵ්‍යෝ");
			text = text.replace(/fGHda/g, "ඨ්‍යෝ");
			text = text.replace(/fYHda/g, "ශ්‍යෝ");
			text = text.replace(/fÌHda/g, "ක්‍ෂ්‍යෝ");
			text = text.replace(/fnHda/g, "බ්‍යෝ");
			text = text.replace(/fpHda/g, "ච්‍යෝ");
			text = text.replace(/fâHda/g, "ඩ්‍යෝ");
			text = text.replace(/f\*Hda/g, "ෆ්‍යෝ");
			text = text.replace(/f\.Hda/g, "ග්‍යෝ");
			text = text.replace(/fcHda/g, "ජ්‍යෝ");
			text = text.replace(/flHda/g, "ක්‍යෝ");
			text = text.replace(/f,Hda/g, "ල්‍යෝ");
			text = text.replace(/fuHda/g, "ම්‍යෝ");
			text = text.replace(/fkHda/g, "න්‍යෝ");
			text = text.replace(/fmHda/g, "ප්‍යෝ");
			text = text.replace(/foHda/g, "ද්‍යෝ");
			text = text.replace(/fiHda/g, "ස්‍යෝ");
			text = text.replace(/fgHda/g, "ට්‍යෝ");
			text = text.replace(/fjHda/g, "ව්‍යෝ");
			text = text.replace(/f;Hda/g, "ත්‍යෝ");
			text = text.replace(/fNHda/g, "භ්‍යෝ");
			text = text.replace(/fOHda/g, "ධ්‍යෝ");
			text = text.replace(/f:Hda/g, "ථ්‍යෝ");
			text = text.replace(/fIHd/g, "ෂ්‍යො");
			text = text.replace(/fYHd/g, "ශ්‍යො");
			text = text.replace(/fLHd/g, "ඛ්‍යො");
			text = text.replace(/fÌHd/g, "ක්‍ෂ්‍යො");
			text = text.replace(/fnHd/g, "බ්‍යො");
			text = text.replace(/fjHd/g, "ව්‍යො");
			text = text.replace(/fvHd/g, "ඩ්‍යො");
			text = text.replace(/f\*Hd/g, "ෆ්‍යො");
			text = text.replace(/f\.Hd/g, "ග්‍යො");
			text = text.replace(/fcHd/g, "ජ්‍යො");
			text = text.replace(/flHd/g, "ක්‍යො");
			text = text.replace(/fuHd/g, "ම්‍යො");
			text = text.replace(/fmHd/g, "ප්‍යො");
			text = text.replace(/foHd/g, "ද්‍යො");
			text = text.replace(/fiHd/g, "ස්‍යො");
			text = text.replace(/fgHd/g, "ට්‍යො");
			text = text.replace(/fjHd/g, "ව්‍යො");
			text = text.replace(/fkHd/g, "න්‍යො");
			text = text.replace(/f;Hd/g, "ත්‍යො");
			text = text.replace(/fNHd/g, "භ්‍යො");
			text = text.replace(/fOHd/g, "ධ්‍යො");
			text = text.replace(/f:Hd/g, "ථ්‍යො");
			text = text.replace(/fIH/g, "ෂ්‍යෙ");
			text = text.replace(/fPH/g, "ඡ්‍යෙ");
			text = text.replace(/f<H/g, "ළ්‍යෙ");
			text = text.replace(/fKH/g, "ණ්‍යෙ");
			text = text.replace(/fpH/g, "ච්‍යෙ");
			text = text.replace(/f,H/g, "ල්‍යෙ");
			text = text.replace(/fkH/g, "න්‍යෙ");
			text = text.replace(/fYH/g, "ශ්‍යෙ");
			text = text.replace(/fLH/g, "ඛ්‍යෙ");
			text = text.replace(/fÌH/g, "ක්‍ෂ්‍ය");
			text = text.replace(/fnH/g, "බ්‍යෙ");
			text = text.replace(/fvH/g, "ඩ්‍යෙ");
			text = text.replace(/f\*H/g, "ෆ්‍යෙ");
			text = text.replace(/f\.H/g, "ග්‍යෙ");
			text = text.replace(/fcH/g, "ජ්‍යෙ");
			text = text.replace(/flH/g, "ක්‍යෙ");
			text = text.replace(/fuH/g, "ම්‍යෙ");
			text = text.replace(/fmH/g, "ප්‍යෙ");
			text = text.replace(/foH/g, "ද්‍යෙ");
			text = text.replace(/fiH/g, "ස්‍යෙ");
			text = text.replace(/fgH/g, "ට්‍යෙ");
			text = text.replace(/fjH/g, "ව්‍යෙ");
			text = text.replace(/f;H/g, "ත්‍යෙ");
			text = text.replace(/fNH/g, "භ්‍යෙ");
			text = text.replace(/fOH/g, "ධ්‍යෙ");
			text = text.replace(/f:H/g, "ථ්‍යෙ");
			text = text.replace(/fI%da/g, "ෂ්‍රෝ");
			text = text.replace(/f>%da/g, "ඝ්‍රෝ");
			text = text.replace(/fY%da/g, "ශ්‍රෝ");
			text = text.replace(/fÌ%da/g, "ක්‍ෂ්‍රෝ");
			text = text.replace(/fn%da/g, "බ්‍රෝ");
			text = text.replace(/fv%da/g, "ඩ්‍රෝ");
			text = text.replace(/f\*%da/g, "ෆ්‍රෝ");
			text = text.replace(/f\.%da/g, "ග්‍රෝ");
			text = text.replace(/fl%da/g, "ක්‍රෝ");
			text = text.replace(/fm%da/g, "ප්‍රෝ");
			text = text.replace(/føda/g, "ද්‍රෝ");
			text = text.replace(/fi%da/g, "ස්‍රෝ");
			text = text.replace(/fg%da/g, "ට්‍රෝ");
			text = text.replace(/f;%da/g, "ත්‍රෝ");
			text = text.replace(/fY%d/g, "ශ්‍රො");
			text = text.replace(/fv%d/g, "ඩ්‍රො");
			text = text.replace(/f\*%d/g, "ෆ්‍රො");
			text = text.replace(/f\.%d/g, "ග්‍රො");
			text = text.replace(/fl%d/g, "ක්‍රො");
			text = text.replace(/fm%d/g, "ප්‍රො");
			text = text.replace(/fød/g, "ද්‍රො");
			text = text.replace(/fi%d/g, "ස්‍රො");
			text = text.replace(/fg%d/g, "ට්‍රො");
			text = text.replace(/f;%d/g, "ත්‍රො");
			text = text.replace(/%a/g, "a%");
			text = text.replace(/fYa%/g, "ශ්‍රේ");
			text = text.replace(/fí%/g, "බ්‍රේ");
			text = text.replace(/fâ%/g, "ඩ්‍රේ");
			text = text.replace(/f\*a%/g, "ෆ්‍රේ");
			text = text.replace(/f\.a%/g, "ග්‍රේ");
			text = text.replace(/fla%/g, "ක්‍රේ");
			text = text.replace(/fma%/g, "ප්‍රේ");
			text = text.replace(/føa/g, "ද්‍රේ");
			text = text.replace(/fia%/g, "ස්‍රේ");
			text = text.replace(/f;a%/g, "ත්‍රේ");
			text = text.replace(/fè%/g, "ධ්‍රේ");
			text = text.replace(/fI%/g, "ෂ්‍රෙ");
			text = text.replace(/fY%/g, "ශ්‍රෙ");
			text = text.replace(/fn%/g, "බ්‍රෙ");
			text = text.replace(/f\*%/g, "ෆ්‍රෙ");
			text = text.replace(/f\.%/g, "ග්‍රෙ");
			text = text.replace(/fl%/g, "ක්‍රෙ");
			text = text.replace(/fm%/g, "ප්‍රෙ");
			text = text.replace(/fø/g, "ද්‍රෙ");
			text = text.replace(/fi%/g, "ස්‍රෙ");
			text = text.replace(/f;%/g, "ත්‍රෙ");
			text = text.replace(/fN%/g, "භ්‍රෙ");
			text = text.replace(/fO%/g, "ධ්‍රෙ");
			text = text.replace(/H/g, "්‍ය");
			text = text.replace(/%/g, "්‍ර");
			text = text.replace(/fI!/g, "ෂෞ");
			text = text.replace(/fP!/g, "ඡෞ");
			text = text.replace(/fY!/g, "ශෞ");
			text = text.replace(/fn!/g, "බෞ");
			text = text.replace(/fp!/g, "චෞ");
			text = text.replace(/fv!/g, "ඩෞ");
			text = text.replace(/f\*!/g, "ෆෞ");
			text = text.replace(/f\.!/g, "ගෞ");
			text = text.replace(/fc!/g, "ජෞ");
			text = text.replace(/fl!/g, "කෞ");
			text = text.replace(/f,!/g, "ලෞ");
			text = text.replace(/fu!/g, "මෞ");
			text = text.replace(/fk!/g, "නෞ");
			text = text.replace(/fm!/g, "පෞ");
			text = text.replace(/fo!/g, "දෞ");
			text = text.replace(/fr!/g, "රෞ");
			text = text.replace(/fi!/g, "සෞ");
			text = text.replace(/fg!/g, "ටෞ");
			text = text.replace(/f;!/g, "තෞ");
			text = text.replace(/fN!/g, "භෞ");
			text = text.replace(/f\[!/g, "ඤෞ");
			text = text.replace(/fIda/g, "ෂෝ");
			text = text.replace(/fUda/g, "ඹෝ");
			text = text.replace(/fPda/g, "ඡෝ");
			text = text.replace(/fVda/g, "ඪෝ");
			text = text.replace(/f>da/g, "ඝෝ");
			text = text.replace(/fLda/g, "ඛෝ");
			text = text.replace(/f<da/g, "ළෝ");
			text = text.replace(/fÛda/g, "ඟෝ");
			text = text.replace(/fKda/g, "ණෝ");
			text = text.replace(/fMda/g, "ඵෝ");
			text = text.replace(/fGda/g, "ඨෝ");
			text = text.replace(/fËda/g, "ඬෝ");
			text = text.replace(/fYda/g, "ශෝ");
			text = text.replace(/f\{da/g, "ඥෝ");
			text = text.replace(/f\|da/g, "ඳෝ");
			text = text.replace(/fÌda/g, "ක්‍ෂෝ");
			text = text.replace(/fnda/g, "බෝ");
			text = text.replace(/fpda/g, "චෝ");
			text = text.replace(/fvda/g, "ඩෝ");
			text = text.replace(/f\*da/g, "ෆෝ");
			text = text.replace(/f\.da/g, "ගෝ");
			text = text.replace(/fyda/g, "හෝ");
			text = text.replace(/fcda/g, "ජෝ");
			text = text.replace(/flda/g, "කෝ");
			text = text.replace(/f,da/g, "ලෝ");
			text = text.replace(/fuda/g, "මෝ");
			text = text.replace(/fkda/g, "නෝ");
			text = text.replace(/fmda/g, "පෝ");
			text = text.replace(/foda/g, "දෝ");
			text = text.replace(/frda/g, "රෝ");
			text = text.replace(/fida/g, "සෝ");
			text = text.replace(/fgda/g, "ටෝ");
			text = text.replace(/fjda/g, "වෝ");
			text = text.replace(/f;da/g, "තෝ");
			text = text.replace(/fNda/g, "භෝ");
			text = text.replace(/fhda/g, "යෝ");
			text = text.replace(/f\[da/g, "ඤෝ");
			text = text.replace(/fOda/g, "ධෝ");
			text = text.replace(/f:da/g, "ථෝ");
			text = text.replace(/fId/g, "ෂො");
			text = text.replace(/fUd/g, "ඹො");
			text = text.replace(/fPd/g, "ඡො");
			text = text.replace(/fVd/g, "ඪො");
			text = text.replace(/f>d/g, "ඝො");
			text = text.replace(/fLd/g, "ඛො");
			text = text.replace(/f<d/g, "ළො");
			text = text.replace(/fÕd/g, "ඟො");
			text = text.replace(/fKd/g, "ණො");
			text = text.replace(/fMd/g, "ඵො");
			text = text.replace(/fGd/g, "ඨො");
			text = text.replace(/fËd/g, "ඬො");
			text = text.replace(/fYd/g, "ශො");
			text = text.replace(/f\{d/g, "ඥො");
			text = text.replace(/f\|d/g, "ඳො");
			text = text.replace(/fÌd/g, "ක්‍ෂො");
			text = text.replace(/fnd/g, "බො");
			text = text.replace(/fpd/g, "චො");
			text = text.replace(/fvd/g, "ඩො");
			text = text.replace(/f\*d/g, "ෆො");
			text = text.replace(/f\.d/g, "ගො");
			text = text.replace(/fyd/g, "හො");
			text = text.replace(/fcd/g, "ජො");
			text = text.replace(/fld/g, "කො");
			text = text.replace(/f,d/g, "ලො");
			text = text.replace(/fud/g, "මො");
			text = text.replace(/fkd/g, "නො");
			text = text.replace(/fmd/g, "පො");
			text = text.replace(/fod/g, "දො");
			text = text.replace(/frd/g, "රො");
			text = text.replace(/fid/g, "සො");
			text = text.replace(/fgd/g, "ටො");
			text = text.replace(/fjd/g, "වො");
			text = text.replace(/f;d/g, "තො");
			text = text.replace(/fNd/g, "භො");
			text = text.replace(/fhd/g, "යො");
			text = text.replace(/f\[d/g, "ඤො");
			text = text.replace(/fOd/g, "ධො");
			text = text.replace(/f:d/g, "ථො");
			text = text.replace(/fIa/g, "ෂේ");
			text = text.replace(/fò/g, "ඹේ");
			text = text.replace(/fþ/g, "ඡේ");
			text = text.replace(/f\\a/g, "ඪේ");
			text = text.replace(/f>a/g, "ඝේ");
			text = text.replace(/fÄ/g, "ඛේ");
			text = text.replace(/f<a/g, "ළේ");
			text = text.replace(/fÛa/g, "ඟේ");
			text = text.replace(/fKa/g, "ණේ");
			text = text.replace(/fMa/g, "ඵේ");
			text = text.replace(/fGa/g, "ඨේ");
			text = text.replace(/få/g, "ඬේ");
			text = text.replace(/fYa/g, "ශේ");
			text = text.replace(/f\{a/g, "ඥේ");
			text = text.replace(/f\|a/g, "ඳේ");
			text = text.replace(/fÌa/g, "ක්‍ෂේ");
			text = text.replace(/fí/g, "බේ");
			text = text.replace(/fÉ/g, "චේ");
			text = text.replace(/fâ/g, "ඩේ");
			text = text.replace(/f\*a/g, "ෆේ");
			text = text.replace(/f\.a/g, "ගේ");
			text = text.replace(/fya/g, "හේ");
			text = text.replace(/fma/g, "පේ");
			text = text.replace(/fla/g, "කේ");
			text = text.replace(/f,a/g, "ලේ");
			text = text.replace(/fï/g, "මේ");
			text = text.replace(/fka/g, "නේ");
			text = text.replace(/f\–/g, "ජේ");
			text = text.replace(/foa/g, "දේ");
			text = text.replace(/f¾/g, "රේ");
			text = text.replace(/fia/g, "සේ");
			text = text.replace(/fÜ/g, "ටේ");
			text = text.replace(/fõ/g, "වේ");
			text = text.replace(/f;a/g, "තේ");
			text = text.replace(/fNa/g, "භේ");
			text = text.replace(/fha/g, "යේ");
			text = text.replace(/f\[a/g, "ඤේ");
			text = text.replace(/fè/g, "ධේ");
			text = text.replace(/f:a/g, "ථේ");
			text = text.replace(/fI/g, "ෂෙ");
			text = text.replace(/fU/g, "ඹෙ");
			text = text.replace(/ft/g, "ඓ");
			text = text.replace(/fP/g, "ඡෙ");
			text = text.replace(/fV/g, "ඪෙ");
			text = text.replace(/f>/g, "ඝෙ");
			text = text.replace(/fn/g, "ඛෙ");
			text = text.replace(/f</g, "ළෙ");
			text = text.replace(/fÛ/g, "ඟෙ");
			text = text.replace(/fK/g, "ණෙ");
			text = text.replace(/fM/g, "ඵෙ");
			text = text.replace(/fG/g, "ඨෙ");
			text = text.replace(/fË/g, "ඬෙ");
			text = text.replace(/fY/g, "ශෙ");
			text = text.replace(/f\{/g, "ඥෙ");
			text = text.replace(/fË/g, "ඳෙ");
			text = text.replace(/fÌ/g, "ක්‍ෂෙ");
			text = text.replace(/fn/g, "බෙ");
			text = text.replace(/fp/g, "චෙ");
			text = text.replace(/fv/g, "ඩෙ");
			text = text.replace(/f\*/g, "ෆෙ");
			text = text.replace(/f\./g, "ගෙ");
			text = text.replace(/fy/g, "හෙ");
			text = text.replace(/fc/g, "ජෙ");
			text = text.replace(/fl/g, "කෙ");
			text = text.replace(/f,/g, "ලෙ");
			text = text.replace(/fu/g, "මෙ");
			text = text.replace(/fk/g, "නෙ");
			text = text.replace(/fm/g, "පෙ");
			text = text.replace(/fo/g, "දෙ");
			text = text.replace(/fr/g, "රෙ");
			text = text.replace(/fi/g, "සෙ");
			text = text.replace(/fg/g, "ටෙ");
			text = text.replace(/fj/g, "වෙ");
			text = text.replace(/f;/g, "තෙ");
			text = text.replace(/fN/g, "භෙ");
			text = text.replace(/fh/g, "යෙ");
			text = text.replace(/f\[/g, "ඤෙ");
			text = text.replace(/fO/g, "ධෙ");
			text = text.replace(/f:/g, "ථෙ");
			text = text.replace(/;=/g, "තු");
			text = text.replace(/\.=/g, "ගු");
			text = text.replace(/l=/g, "කු");
			text = text.replace(/;\+/g, "තූ");
			text = text.replace(/N\+/g, "භූ");
			text = text.replace(/N\=/g, "භු");
			text = text.replace(/\.\+/g, "ගූ");
			text = text.replace(/l\+/g, "කූ");
			text = text.replace(/re/g, "රු");
			text = text.replace(/rE/g, "රූ");
			text = text.replace(/wd/g, "ආ");
			text = text.replace(/we/g, "ඇ");
			text = text.replace(/wE/g, "ඈ");
			text = text.replace(/W!/g, "ඌ");
			text = text.replace(/T!/g, "ඖ");
			text = text.replace(/ta/g, "ඒ");
			text = text.replace(/\´/g, "ඕ");
			text = text.replace(/¢/g, "ඳි");
			text = text.replace(/£/g, "ඳී");
			text = text.replace(/¥/g, "දූ");
			text = text.replace(/§/g, "දී");
			text = text.replace(/\¨/g, "ලූ");
			text = text.replace(/©/g, "ර්‍ය");
			text = text.replace(/ª/g, "ඳූ");
			text = text.replace(/¾/g, "ර්");
			text = text.replace(/À/g, "ඨි");
			text = text.replace(/Á/g, "ඨී");
			text = text.replace(/Â/g, "ඡී");
			text = text.replace(/Ä/g, "ඛ්");
			text = text.replace(/Å/g, "ඛි");
			text = text.replace(/Æ/g, "ලු");
			text = text.replace(/Ç/g, "ඛී");
			text = text.replace(/È/g, "දි");
			text = text.replace(/É/g, "ච්");
			text = text.replace(/Ê/g, "ජ්");
			text = text.replace(/Í/g, "රී");
			text = text.replace(/Î/g, "ඪී");
			text = text.replace(/Ð/g, "ඪී");
			text = text.replace(/Ñ/g, "චි");
			text = text.replace(/Ò/g, "ථී");
			text = text.replace(/Ó/g, "ථී");
			text = text.replace(/Ô/g, "ජී");
			text = text.replace(/Ö/g, "චී");
			text = text.replace(/Ù/g, "ඞ්");
			text = text.replace(/Ú/g, "ඵී");
			text = text.replace(/Ü/g, "ට්");
			text = text.replace(/Ý/g, "ඵි");
			text = text.replace(/ß/g, "රි");
			text = text.replace(/à/g, "ටී");
			text = text.replace(/á/g, "ටි");
			text = text.replace(/â/g, "ඩ්");
			text = text.replace(/ã/g, "ඩී");
			text = text.replace(/ä/g, "ඩි");
			text = text.replace(/å/g, "ඬ්");
			text = text.replace(/ç/g, "ඬි");
			text = text.replace(/è/g, "ධ්");
			text = text.replace(/é/g, "ඬී");
			text = text.replace(/ê/g, "ධි");
			text = text.replace(/ë/g, "ධී");
			text = text.replace(/ì/g, "බි");
			text = text.replace(/í/g, "බ්");
			text = text.replace(/î/g, "බී");
			text = text.replace(/ï/g, "ම්");
			text = text.replace(/ð/g, "ජි");
			text = text.replace(/ñ/g, "මි");
			text = text.replace(/ò/g, "ඹ්");
			text = text.replace(/ó/g, "මී");
			text = text.replace(/ô/g, "ඹි");
			text = text.replace(/õ/g, "ව්");
			text = text.replace(/ö/g, "ඹී");
			text = text.replace(/÷/g, "ඳු");
			text = text.replace(/ø/g, "ද්‍ර");
			text = text.replace(/ù/g, "වී");
			text = text.replace(/ú/g, "වි");
			text = text.replace(/û/g, "ඞ්");
			text = text.replace(/ü/g, "ඞී");
			text = text.replace(/ý/g, "ඡි");
			text = text.replace(/þ/g, "ඡ්");
			text = text.replace(/ÿ/g, "දු");
			text = text.replace(/±/g, "දැ");
			text = text.replace(/\–/g, "ජ්");
			text = text.replace(/\“/g, "ර්‍ණ");
			text = text.replace(/\"/g, "ණී");
			text = text.replace(/„/g, "ජී");
			text = text.replace(/‰/g, "ඡි");
			text = text.replace(//g, "ඩි");
			text = text.replace(/™/g, "ඤු");
			text = text.replace(/\./g, "ග");
			text = text.replace(/¿/g, "ළු");
			text = text.replace(/I/g, "ෂ");
			text = text.replace(/x/g, "ං");
			text = text.replace(/\#/g, "ඃ");
			text = text.replace(/U/g, "ඹ");
			text = text.replace(/P/g, "ඡ");
			text = text.replace(/V/g, "ඪ");
			text = text.replace(/>/g, "ඝ");
			text = text.replace(/B/g, "ඊ");
			text = text.replace(/CO/g, "ඣ");
			text = text.replace(/L/g, "ඛ");
			text = text.replace(/</g, "ළ");
			text = text.replace(/Û/g, "ඟ");
			text = text.replace(/Ë/g, "ඬ");
			text = text.replace(/K/g, "ණ");
			text = text.replace(/M/g, "ඵ");
			text = text.replace(/G/g, "ඨ");
			text = text.replace(/\#/g, "ඃ");
			text = text.replace(/\&/g, ")");
			text = text.replace(/\(/g, ":");
			text = text.replace(/\)/g, "-");
			text = text.replace(/\*/g, "ෆ");
			text = text.replace(/\,/g, "ල");
			text = text.replace(/\-/g, "-");
			text = text.replace(/\//g, "රැ");
			text = text.replace(/:/g, "ථ");
			text = text.replace(/;/g, "ත");
			text = text.replace(/</g, "ළ");
			text = text.replace(/>/g, "ඝ");
			text = text.replace(/\?/g, "රෑ");
			text = text.replace(/B/g, "ඊ");
			text = text.replace(/C/g, "ක‍");
			text = text.replace(/F/g, "ත‍");
			text = text.replace(/G/g, "ඨ");
			text = text.replace(/H/g, "්‍ය");
			text = text.replace(/I/g, "ෂ");
			text = text.replace(/J/g, "න‍");
			text = text.replace(/K/g, "ණ");
			text = text.replace(/L/g, "ඛ");
			text = text.replace(/M/g, "ඵ");
			text = text.replace(/N/g, "භ");
			text = text.replace(/O/g, "ධ");
			text = text.replace(/P/g, "ඡ");
			text = text.replace(/R/g, "ඍ");
			text = text.replace(/T/g, "ඔ");
			text = text.replace(/U/g, "ඹ");
			text = text.replace(/V/g, "ඪ");
			text = text.replace(/W/g, "උ");
			text = text.replace(/Y/g, "ශ");
			text = text.replace(/\[/g, "ඤ");
			text = text.replace(/b/g, "ඉ");
			text = text.replace(/c/g, "ජ");
			text = text.replace(/g/g, "ට");
			text = text.replace(/h/g, "ය");
			text = text.replace(/i/g, "ස");
			text = text.replace(/j/g, "ව");
			text = text.replace(/k/g, "න");
			text = text.replace(/l/g, "ක");
			text = text.replace(/m/g, "ප");
			text = text.replace(/n/g, "බ");
			text = text.replace(/o/g, "ද");
			text = text.replace(/p/g, "ච");
			text = text.replace(/r/g, "ර");
			text = text.replace(/t/g, "එ");
			text = text.replace(/u/g, "ම");
			text = text.replace(/v/g, "ඩ");
			text = text.replace(/w/g, "අ");
			text = text.replace(/y/g, "හ");
			text = text.replace(/Õ/g, "ඟ");
			text = text.replace(/\{/g, "ඥ");
			text = text.replace(/\|/g, "ඳ");
			text = text.replace(/Ì/g, "ක්‍ෂ");
			text = text.replace(/µ/g, "ද්‍ය");
			text = text.replace(/e/g, "ැ");
			text = text.replace(/E/g, "ෑ");
			text = text.replace(/f/g, "ෙ");
			text = text.replace(/q/g, "ු");
			text = text.replace(/s/g, "ි");
			text = text.replace(/Q/g, "ූ");
			text = text.replace(/S/g, "ී");
			text = text.replace(/D/g, "ෘ");
			text = text.replace(/DD/g, "ෲ");
			text = text.replace(/\!/g, "ෟ");
			text = text.replace(/d/g, "ා");
			text = text.replace(/a/g, "්");
			text = text.replace(/♥/g, ".");
			text = text.replace(/Ѫ/g, "(");
			text = text.replace(/Ѧ/g, ")");
			text = text.replace(/ʘ/g, ",");
			text = text.replace(/Ϣ/g, "?");
			text = text.replace(/ƨ/g, ":");
			text = text.replace(/Ɣ/g, "%");
			text = text.replace(/ɤ/g, "/");

			node = text;
GM_log('final stuff: '+node);
			textnodes[i]=node;
GM_log('final stuff_special: '+textnodes[i]);


		}
	}

	function SiyaBas_metta_convert() {

		for (i = 0; i < textnodes.snapshotLength; i += 1) {

			node = textnodes.snapshotItem(i);
			text = node.data;
			text = text.replace(/\'/g, "♥");
			text = text.replace(/\^/g, "Ѫ");
			text = text.replace(/\&/g, "Ѧ");
			text = text.replace(/\"/g, "ʘ");
			text = text.replace(/@/g, "Ϣ");
			text = text.replace(/\(/g, "ƨ");
			text = text.replace(/\]/g, "Ɣ");
			text = text.replace(/\$/g, "ɤ");
text = text.replace(/1/g, "්‍ර");
			text = text.replace(/ff;%/g, "ත්‍රෛ");
			text = text.replace(/ffY/g, "ශෛ");
			text = text.replace(/ffp/g, "චෛ");
			text = text.replace(/ffc/g, "ජෛ");
			text = text.replace(/ffl/g, "කෛ");
			text = text.replace(/ffu/g, "මෛ");
			text = text.replace(/ffm/g, "පෛ");
			text = text.replace(/ffo/g, "දෛ");
			text = text.replace(/ff;/g, "තෛ");
			text = text.replace(/ffk/g, "නෛ");
			text = text.replace(/ffO/g, "ධෛ");
			text = text.replace(/ffj/g, "වෛ");
			text = text.replace(/fm%!/g, "ප්‍රෞ");
			text = text.replace(/fIHda/g, "ෂ්‍යෝ");
			text = text.replace(/fPHda/g, "ඡ්‍යෝ");
			text = text.replace(/fVHda/g, "ඪ්‍යෝ");
			text = text.replace(/f>Hda/g, "ඝ්‍යෝ");
			text = text.replace(/fLHda/g, "ඛ්‍යෝ");
			text = text.replace(/f<Hda/g, "ළ්‍යෝ");
			text = text.replace(/fMHda/g, "ඵ්‍යෝ");
			text = text.replace(/fGHda/g, "ඨ්‍යෝ");
			text = text.replace(/fYHda/g, "ශ්‍යෝ");
			text = text.replace(/fÌHda/g, "ක්‍ෂ්‍යෝ");
			text = text.replace(/fnHda/g, "බ්‍යෝ");
			text = text.replace(/fpHda/g, "ච්‍යෝ");
			text = text.replace(/fâHda/g, "ඩ්‍යෝ");
			text = text.replace(/f\*Hda/g, "ෆ්‍යෝ");
			text = text.replace(/f\.Hda/g, "ග්‍යෝ");
			text = text.replace(/fcHda/g, "ජ්‍යෝ");
			text = text.replace(/flHda/g, "ක්‍යෝ");
			text = text.replace(/f,Hda/g, "ල්‍යෝ");
			text = text.replace(/fuHda/g, "ම්‍යෝ");
			text = text.replace(/fkHda/g, "න්‍යෝ");
			text = text.replace(/fmHda/g, "ප්‍යෝ");
			text = text.replace(/foHda/g, "ද්‍යෝ");
			text = text.replace(/fiHda/g, "ස්‍යෝ");
			text = text.replace(/fgHda/g, "ට්‍යෝ");
			text = text.replace(/fjHda/g, "ව්‍යෝ");
			text = text.replace(/f;Hda/g, "ත්‍යෝ");
			text = text.replace(/fNHda/g, "භ්‍යෝ");
			text = text.replace(/fOHda/g, "ධ්‍යෝ");
			text = text.replace(/f:Hda/g, "ථ්‍යෝ");
			text = text.replace(/fIHd/g, "ෂ්‍යො");
			text = text.replace(/fYHd/g, "ශ්‍යො");
			text = text.replace(/fLHd/g, "ඛ්‍යො");
			text = text.replace(/fÌHd/g, "ක්‍ෂ්‍යො");
			text = text.replace(/fnHd/g, "බ්‍යො");
			text = text.replace(/fjHd/g, "ව්‍යො");
			text = text.replace(/fvHd/g, "ඩ්‍යො");
			text = text.replace(/f\*Hd/g, "ෆ්‍යො");
			text = text.replace(/f\.Hd/g, "ග්‍යො");
			text = text.replace(/fcHd/g, "ජ්‍යො");
			text = text.replace(/flHd/g, "ක්‍යො");
			text = text.replace(/fuHd/g, "ම්‍යො");
			text = text.replace(/fmHd/g, "ප්‍යො");
			text = text.replace(/foHd/g, "ද්‍යො");
			text = text.replace(/fiHd/g, "ස්‍යො");
			text = text.replace(/fgHd/g, "ට්‍යො");
			text = text.replace(/fjHd/g, "ව්‍යො");
			text = text.replace(/fkHd/g, "න්‍යො");
			text = text.replace(/f;Hd/g, "ත්‍යො");
			text = text.replace(/fNHd/g, "භ්‍යො");
			text = text.replace(/fOHd/g, "ධ්‍යො");
			text = text.replace(/f:Hd/g, "ථ්‍යො");
			text = text.replace(/fIH/g, "ෂ්‍යෙ");
			text = text.replace(/fPH/g, "ඡ්‍යෙ");
			text = text.replace(/f<H/g, "ළ්‍යෙ");
			text = text.replace(/fKH/g, "ණ්‍යෙ");
			text = text.replace(/fpH/g, "ච්‍යෙ");
			text = text.replace(/f,H/g, "ල්‍යෙ");
			text = text.replace(/fkH/g, "න්‍යෙ");
			text = text.replace(/fYH/g, "ශ්‍යෙ");
			text = text.replace(/fLH/g, "ඛ්‍යෙ");
			text = text.replace(/fÌH/g, "ක්‍ෂ්‍ය");
			text = text.replace(/fnH/g, "බ්‍යෙ");
			text = text.replace(/fvH/g, "ඩ්‍යෙ");
			text = text.replace(/f\*H/g, "ෆ්‍යෙ");
			text = text.replace(/f\.H/g, "ග්‍යෙ");
			text = text.replace(/fcH/g, "ජ්‍යෙ");
			text = text.replace(/flH/g, "ක්‍යෙ");
			text = text.replace(/fuH/g, "ම්‍යෙ");
			text = text.replace(/fmH/g, "ප්‍යෙ");
			text = text.replace(/foH/g, "ද්‍යෙ");
			text = text.replace(/fiH/g, "ස්‍යෙ");
			text = text.replace(/fgH/g, "ට්‍යෙ");
			text = text.replace(/fjH/g, "ව්‍යෙ");
			text = text.replace(/f;H/g, "ත්‍යෙ");
			text = text.replace(/fNH/g, "භ්‍යෙ");
			text = text.replace(/fOH/g, "ධ්‍යෙ");
			text = text.replace(/f:H/g, "ථ්‍යෙ");
			text = text.replace(/fI%da/g, "ෂ්‍රෝ");
			text = text.replace(/f>%da/g, "ඝ්‍රෝ");
			text = text.replace(/fY%da/g, "ශ්‍රෝ");
			text = text.replace(/fÌ%da/g, "ක්‍ෂ්‍රෝ");
			text = text.replace(/fn%da/g, "බ්‍රෝ");
			text = text.replace(/fv%da/g, "ඩ්‍රෝ");
			text = text.replace(/f\*%da/g, "ෆ්‍රෝ");
			text = text.replace(/f\.%da/g, "ග්‍රෝ");
			text = text.replace(/fl%da/g, "ක්‍රෝ");
			text = text.replace(/fm%da/g, "ප්‍රෝ");
			text = text.replace(/føda/g, "ද්‍රෝ");
			text = text.replace(/fi%da/g, "ස්‍රෝ");
			text = text.replace(/fg%da/g, "ට්‍රෝ");
			text = text.replace(/f;%da/g, "ත්‍රෝ");
			text = text.replace(/fY%d/g, "ශ්‍රො");
			text = text.replace(/fv%d/g, "ඩ්‍රො");
			text = text.replace(/f\*%d/g, "ෆ්‍රො");
			text = text.replace(/f\.%d/g, "ග්‍රො");
			text = text.replace(/fl%d/g, "ක්‍රො");
			text = text.replace(/fm%d/g, "ප්‍රො");
			text = text.replace(/fød/g, "ද්‍රො");
			text = text.replace(/fi%d/g, "ස්‍රො");
			text = text.replace(/fg%d/g, "ට්‍රො");
			text = text.replace(/f;%d/g, "ත්‍රො");
			text = text.replace(/%a/g, "a%");
			text = text.replace(/fYa%/g, "ශ්‍රේ");
			text = text.replace(/fí%/g, "බ්‍රේ");
			text = text.replace(/fâ%/g, "ඩ්‍රේ");
			text = text.replace(/f\*a%/g, "ෆ්‍රේ");
			text = text.replace(/f\.a%/g, "ග්‍රේ");
			text = text.replace(/fla%/g, "ක්‍රේ");
			text = text.replace(/fma%/g, "ප්‍රේ");
			text = text.replace(/føa/g, "ද්‍රේ");
			text = text.replace(/fia%/g, "ස්‍රේ");
			text = text.replace(/f;a%/g, "ත්‍රේ");
			text = text.replace(/fè%/g, "ධ්‍රේ");
			text = text.replace(/fI%/g, "ෂ්‍රෙ");
			text = text.replace(/fY%/g, "ශ්‍රෙ");
			text = text.replace(/fn%/g, "බ්‍රෙ");
			text = text.replace(/f\*%/g, "ෆ්‍රෙ");
			text = text.replace(/f\.%/g, "ග්‍රෙ");
			text = text.replace(/fl%/g, "ක්‍රෙ");
			text = text.replace(/fm%/g, "ප්‍රෙ");
			text = text.replace(/fø/g, "ද්‍රෙ");
			text = text.replace(/fi%/g, "ස්‍රෙ");
			text = text.replace(/f;%/g, "ත්‍රෙ");
			text = text.replace(/fN%/g, "භ්‍රෙ");
			text = text.replace(/fO%/g, "ධ්‍රෙ");
			text = text.replace(/H/g, "්‍ය");
			text = text.replace(/%/g, "්‍ර");
			text = text.replace(/ZM/g, "ළු");
			text = text.replace(/fI#/g, "ෂෞ");
			text = text.replace(/fP#/g, "ඡෞ");
			text = text.replace(/fY#/g, "ශෞ");
			text = text.replace(/fn#/g, "බෞ");
			text = text.replace(/fp#/g, "චෞ");
			text = text.replace(/fv#/g, "ඩෞ");
			text = text.replace(/f\*#/g, "ෆෞ");
			text = text.replace(/f\.#/g, "ගෞ");
			text = text.replace(/fc#/g, "ජෞ");
			text = text.replace(/fl#/g, "කෞ");
			text = text.replace(/f,#/g, "ලෞ");
			text = text.replace(/fu#/g, "මෞ");
			text = text.replace(/fk#/g, "නෞ");
			text = text.replace(/fm#/g, "පෞ");
			text = text.replace(/fo#/g, "දෞ");
			text = text.replace(/fr#/g, "රෞ");
			text = text.replace(/fi#/g, "සෞ");
			text = text.replace(/fg#/g, "ටෞ");
			text = text.replace(/f;#/g, "තෞ");
			text = text.replace(/fN#/g, "භෞ");
			text = text.replace(/f\[#/g, "ඤෞ");
			text = text.replace(/fIda/g, "ෂෝ");
			text = text.replace(/fUda/g, "ඹෝ");
			text = text.replace(/fPda/g, "ඡෝ");
			text = text.replace(/fVda/g, "ඪෝ");
			text = text.replace(/f>da/g, "ඝෝ");
			text = text.replace(/fLda/g, "ඛෝ");
			text = text.replace(/f<da/g, "ළෝ");
			text = text.replace(/fZ\.da/g, "ඟෝ");
			text = text.replace(/fKda/g, "ණෝ");
			text = text.replace(/fMda/g, "ඵෝ");
			text = text.replace(/fGda/g, "ඨෝ");
			text = text.replace(/fËda/g, "ඬෝ");
			text = text.replace(/fYda/g, "ශෝ");
			text = text.replace(/f\{da/g, "ඥෝ");
			text = text.replace(/fZoda/g, "ඳෝ");
			text = text.replace(/fÌda/g, "ක්‍ෂෝ");
			text = text.replace(/fnda/g, "බෝ");
			text = text.replace(/fpda/g, "චෝ");
			text = text.replace(/fvda/g, "ඩෝ");
			text = text.replace(/f\*da/g, "ෆෝ");
			text = text.replace(/f\.da/g, "ගෝ");
			text = text.replace(/fyda/g, "හෝ");
			text = text.replace(/fcda/g, "ජෝ");
			text = text.replace(/flda/g, "කෝ");
			text = text.replace(/f,da/g, "ලෝ");
			text = text.replace(/fuda/g, "මෝ");
			text = text.replace(/fkda/g, "නෝ");
			text = text.replace(/fmda/g, "පෝ");
			text = text.replace(/foda/g, "දෝ");
			text = text.replace(/frda/g, "රෝ");
			text = text.replace(/fida/g, "සෝ");
			text = text.replace(/fgda/g, "ටෝ");
			text = text.replace(/fjda/g, "වෝ");
			text = text.replace(/f;da/g, "තෝ");
			text = text.replace(/fNda/g, "භෝ");
			text = text.replace(/fhda/g, "යෝ");
			text = text.replace(/f\[da/g, "ඤෝ");
			text = text.replace(/fOda/g, "ධෝ");
			text = text.replace(/f:da/g, "ථෝ");
			text = text.replace(/fId/g, "ෂො");
			text = text.replace(/fUd/g, "ඹො");
			text = text.replace(/fPd/g, "ඡො");
			text = text.replace(/fVd/g, "ඪො");
			text = text.replace(/f>d/g, "ඝො");
			text = text.replace(/fLd/g, "ඛො");
			text = text.replace(/f<d/g, "ළො");
			text = text.replace(/fZ\.d/g, "ඟො");
			text = text.replace(/fKd/g, "ණො");
			text = text.replace(/fMd/g, "ඵො");
			text = text.replace(/fGd/g, "ඨො");
			text = text.replace(/fËd/g, "ඬො");
			text = text.replace(/fYd/g, "ශො");
			text = text.replace(/f\{d/g, "ඥො");
			text = text.replace(/fZod/g, "ඳො");
			text = text.replace(/fÌd/g, "ක්‍ෂො");
			text = text.replace(/fnd/g, "බො");
			text = text.replace(/fpd/g, "චො");
			text = text.replace(/fvd/g, "ඩො");
			text = text.replace(/f\*d/g, "ෆො");
			text = text.replace(/f\.d/g, "ගො");
			text = text.replace(/fyd/g, "හො");
			text = text.replace(/fcd/g, "ජො");
			text = text.replace(/fld/g, "කො");
			text = text.replace(/f,d/g, "ලො");
			text = text.replace(/fud/g, "මො");
			text = text.replace(/fkd/g, "නො");
			text = text.replace(/fmd/g, "පො");
			text = text.replace(/fod/g, "දො");
			text = text.replace(/frd/g, "රො");
			text = text.replace(/fid/g, "සො");
			text = text.replace(/fgd/g, "ටො");
			text = text.replace(/fjd/g, "වො");
			text = text.replace(/f;d/g, "තො");
			text = text.replace(/fNd/g, "භො");
			text = text.replace(/fhd/g, "යො");
			text = text.replace(/f\[d/g, "ඤො");
			text = text.replace(/fOd/g, "ධො");
			text = text.replace(/f:d/g, "ථො");
			text = text.replace(/fIa/g, "ෂේ");
			text = text.replace(/fò/g, "ඹේ");
			text = text.replace(/fþ/g, "ඡේ");
			text = text.replace(/f\\a/g, "ඪේ");
			text = text.replace(/f>a/g, "ඝේ");
			text = text.replace(/fÄ/g, "ඛේ");
			text = text.replace(/f<a/g, "ළේ");
			text = text.replace(/fZ\.a/g, "ඟේ");
			text = text.replace(/fKA/g, "ණේ");
			text = text.replace(/fMa/g, "ඵේ");
			text = text.replace(/fGa/g, "ඨේ");
			text = text.replace(/få/g, "ඬේ");
			text = text.replace(/fYa/g, "ශේ");
			text = text.replace(/f\{a/g, "ඥේ");
			text = text.replace(/fZoa/g, "ඳේ");
			text = text.replace(/fÌa/g, "ක්‍ෂේ");
			text = text.replace(/fí/g, "බේ");
			text = text.replace(/fÉ/g, "චේ");
			text = text.replace(/fjz/g, "වේ");
			text = text.replace(/fâ/g, "ඩේ");
			text = text.replace(/f\*a/g, "ෆේ");
			text = text.replace(/f\.a/g, "ගේ");
			text = text.replace(/fya/g, "හේ");
			text = text.replace(/fma/g, "පේ");
			text = text.replace(/fla/g, "කේ");
			text = text.replace(/f,a/g, "ලේ");
			text = text.replace(/fuz/g, "මේ");
			text = text.replace(/fka/g, "නේ");
			text = text.replace(/f\–/g, "ජේ");
			text = text.replace(/foa/g, "දේ");
			text = text.replace(/frA/g, "රේ");
			text = text.replace(/fia/g, "සේ");
			text = text.replace(/fÜ/g, "ටේ");
			text = text.replace(/fõ/g, "වේ");
			text = text.replace(/f;a/g, "තේ");
			text = text.replace(/fNa/g, "භේ");
			text = text.replace(/fha/g, "යේ");
			text = text.replace(/f\[a/g, "ඤේ");
			text = text.replace(/fè/g, "ධේ");
			text = text.replace(/f:a/g, "ථේ");
			text = text.replace(/fI/g, "ෂෙ");
			text = text.replace(/fU/g, "ඹෙ");
			text = text.replace(/ft/g, "ඓ");
			text = text.replace(/fP/g, "ඡෙ");
			text = text.replace(/fV/g, "ඪෙ");
			text = text.replace(/f>/g, "ඝෙ");
			text = text.replace(/fn/g, "බෙ");
			text = text.replace(/f</g, "ළෙ");
			text = text.replace(/fZ\./g, "ඟෙ");
			text = text.replace(/fK/g, "ණෙ");
			text = text.replace(/fM/g, "ඵෙ");
			text = text.replace(/fG/g, "ඨෙ");
			text = text.replace(/fË/g, "ඬෙ");
			text = text.replace(/fY/g, "ශෙ");
			text = text.replace(/f\{/g, "ඥෙ");
			text = text.replace(/fZo/g, "ඳෙ");
			text = text.replace(/fÌ/g, "ක්‍ෂෙ");
			text = text.replace(/fn/g, "බෙ");
			text = text.replace(/fp/g, "චෙ");
			text = text.replace(/fv/g, "ඩෙ");
			text = text.replace(/f\*/g, "ෆෙ");
			text = text.replace(/f\./g, "ගෙ");
			text = text.replace(/fy/g, "හෙ");
			text = text.replace(/fc/g, "ජෙ");
			text = text.replace(/fl/g, "කෙ");
			text = text.replace(/f,/g, "ලෙ");
			text = text.replace(/fu/g, "මෙ");
			text = text.replace(/fk/g, "නෙ");
			text = text.replace(/fm/g, "පෙ");
			text = text.replace(/fo/g, "දෙ");
			text = text.replace(/fr/g, "රෙ");
			text = text.replace(/fi/g, "සෙ");
			text = text.replace(/fg/g, "ටෙ");
			text = text.replace(/fj/g, "වෙ");
			text = text.replace(/f;/g, "තෙ");
			text = text.replace(/fN/g, "භෙ");
			text = text.replace(/fh/g, "යෙ");
			text = text.replace(/f\[/g, "ඤෙ");
			text = text.replace(/fO/g, "ධෙ");
			text = text.replace(/f:/g, "ථෙ");
			text = text.replace(/;2/g, "තු");
text = text.replace(/Y2/g, "ශු");
			text = text.replace(/Z\.2/g, "ඟු");
			text = text.replace(/\.2/g, "ගු");
			text = text.replace(/l2/g, "කු");
			text = text.replace(/;\+/g, "තූ");
			text = text.replace(/N\+/g, "භූ");
			text = text.replace(/N\2/g, "භු");
			text = text.replace(/\.\+/g, "ගූ");
			text = text.replace(/l\+/g, "කූ");
			text = text.replace(/re/g, "රු");
			text = text.replace(/rE/g, "රූ");
			text = text.replace(/wd/g, "ආ");
			text = text.replace(/we/g, "ඇ");
			text = text.replace(/wE/g, "ඈ");
			text = text.replace(/W!/g, "ඌ");
			text = text.replace(/T!/g, "ඖ");
			text = text.replace(/ta/g, "ඒ");
			text = text.replace(/\´/g, "ඕ");
			text = text.replace(/¢/g, "ඳි");
			text = text.replace(/£/g, "ඳී");
			text = text.replace(/¥/g, "දූ");
			text = text.replace(/§/g, "දී");
			text = text.replace(/\¨/g, "ලූ");
			text = text.replace(/©/g, "ර්‍ය");
			text = text.replace(/ª/g, "ඳූ");
			text = text.replace(/rA/g, "ර්");
			
			text = text.replace(/À/g, "ඨි");
			text = text.replace(/Á/g, "ඨී");
			text = text.replace(/Â/g, "ඡී");
			text = text.replace(/Ä/g, "ඛ්");
			text = text.replace(/Å/g, "ඛි");
			text = text.replace(/Æ/g, "ලු");
			text = text.replace(/Ç/g, "ඛී");
			text = text.replace(/È/g, "දු");
			text = text.replace(/É/g, "ච්");
			text = text.replace(/Ê/g, "ජ්");
			text = text.replace(/Í/g, "රී");
			text = text.replace(/Î/g, "ඪී");
			text = text.replace(/Ð/g, "ඪී");
			text = text.replace(/Ñ/g, "චි");
			text = text.replace(/Ò/g, "ථී");
			text = text.replace(/Ó/g, "ථී");
			text = text.replace(/Ô/g, "ජී");
			text = text.replace(/Ö/g, "චී");

			text = text.replace(/Ú/g, "ඵී");
			text = text.replace(/Ü/g, "ට්");
			text = text.replace(/Ý/g, "ඵි");
			text = text.replace(/ß/g, "රි");
			text = text.replace(/à/g, "ටී");
			text = text.replace(/á/g, "ටි");
			text = text.replace(/â/g, "ඩ්");
			text = text.replace(/ã/g, "ඩී");
			text = text.replace(/ä/g, "ඩි");
			text = text.replace(/å/g, "ඬ්");
			text = text.replace(/ç/g, "ඬි");
			text = text.replace(/è/g, "ධ්");
			text = text.replace(/é/g, "ඬී");
			text = text.replace(/ê/g, "ධි");
			text = text.replace(/ë/g, "ධී");
			text = text.replace(/ì/g, "බි");
			text = text.replace(/í/g, "බ්");
			text = text.replace(/î/g, "බී");
			text = text.replace(/ï/g, "ම්");
			text = text.replace(/ð/g, "ජි");
			text = text.replace(/ñ/g, "මි");
			text = text.replace(/ò/g, "ඹ්");
			text = text.replace(/ó/g, "මී");
			text = text.replace(/ô/g, "ඹි");
			text = text.replace(/õ/g, "ව්");
			text = text.replace(/ö/g, "ඹී");
			text = text.replace(/Zÿ/g, "ඳු");
			text = text.replace(/ø/g, "ද්‍ර");
			text = text.replace(/ù/g, "වී");
			text = text.replace(/ú/g, "වි");
			text = text.replace(/û/g, "ඞ්");
			text = text.replace(/ü/g, "ඞී");
			text = text.replace(/ý/g, "ඡි");
			text = text.replace(/þ/g, "ඡ්");
			text = text.replace(/ÿ/g, "දු");
			text = text.replace(/±/g, "දැ");
			text = text.replace(/cA/g, "ජ්");
			text = text.replace(/\“/g, "ර්‍ණ");
			text = text.replace(/\"/g, "ණී");
			text = text.replace(/Ù/g, "\"");
			text = text.replace(/KA/g, "ණ්");
			text = text.replace(/„/g, "ජී");
			text = text.replace(/‰/g, "ඡි");
			text = text.replace(//g, "ඩි");
			text = text.replace(/™/g, "ඤු");
			text = text.replace(/Z\./g, "ඟ");
			text = text.replace(/\./g, "ග");
			text = text.replace(/¿/g, "ළු");
			text = text.replace(/I/g, "ෂ");
			text = text.replace(/x/g, "ං");
			
			text = text.replace(/U/g, "ඹ");
			text = text.replace(/P/g, "ඡ");
			text = text.replace(/V/g, "ඪ");
			text = text.replace(/>/g, "ඝ");
			text = text.replace(/B/g, "ඊ");
			text = text.replace(/CO/g, "ඣ");
			text = text.replace(/L/g, "ඛ");
			text = text.replace(/</g, "ළ");
			text = text.replace(/Z\./g, "ඟ");
			text = text.replace(/Zv/g, "ඬ");
			text = text.replace(/K/g, "ණ");
			text = text.replace(/M/g, "ඵ");
			text = text.replace(/G/g, "ඨ");
			text = text.replace(/W\#/g, "ඌ");
			text = text.replace(/\&/g, ")");
			text = text.replace(/\(/g, ")");
			text = text.replace(/\)/g, "-");
			text = text.replace(/\*/g, "(");
			text = text.replace(/\,/g, "ල");
			text = text.replace(/\-/g, "-");
			text = text.replace(/\//g, "රැ");
			text = text.replace(/:/g, "ථ");
			text = text.replace(/;/g, "ත");
			text = text.replace(/</g, "ළ");
			text = text.replace(/>/g, "ඝ");
			text = text.replace(/\?/g, "රෑ");
			text = text.replace(/B/g, "ඊ");
			text = text.replace(/C/g, "ක‍");
			text = text.replace(/F/g, "ත‍");
			text = text.replace(/G/g, "ඨ");

			text = text.replace(/H/g, "්‍ය");
			text = text.replace(/I/g, "ෂ");
			text = text.replace(/J/g, "න‍");
			text = text.replace(/K/g, "ණ");
			text = text.replace(/L/g, "ඛ");
			text = text.replace(/M/g, "ඵ");
			text = text.replace(/N/g, "භ");
			text = text.replace(/X/g, "ධ");
			text = text.replace(/O/g, "ධ");
			text = text.replace(/P/g, "ඡ");
			text = text.replace(/R/g, "ඍ");
			text = text.replace(/T/g, "ඔ");
			text = text.replace(/U/g, "ඹ");
			text = text.replace(/V/g, "ඪ");
			text = text.replace(/W/g, "උ");
			text = text.replace(/Y/g, "ශ");
			text = text.replace(/\[/g, "ඤ");
			text = text.replace(/b/g, "ඉ");
			text = text.replace(/c/g, "ජ");
			text = text.replace(/g/g, "ට");
			text = text.replace(/h/g, "ය");
			text = text.replace(/i/g, "ස");
			text = text.replace(/j/g, "ව");
			text = text.replace(/k/g, "න");
			text = text.replace(/l/g, "ක");
			text = text.replace(/m/g, "ප");
			text = text.replace(/n/g, "බ");
			text = text.replace(/Zo/g, "ඳ");
			text = text.replace(/o/g, "ද");
			text = text.replace(/p/g, "ච");
			text = text.replace(/r/g, "ර");
			text = text.replace(/t/g, "එ");
text = text.replace(/u!/g, "ර්‍ම");
			text = text.replace(/u/g, "ම");
			text = text.replace(/v/g, "ඩ");
			text = text.replace(/w/g, "අ");
			text = text.replace(/y/g, "හ");
			text = text.replace(/Õ/g, "ඟ");
			text = text.replace(/\{/g, "ඥ");
			text = text.replace(/\|/g, "ඳ");
			text = text.replace(/Ì/g, "ක්‍ෂ");
			text = text.replace(/µ/g, "ද්‍ය");
			text = text.replace(/e/g, "ැ");
			text = text.replace(/E/g, "ෑ");
			text = text.replace(/f/g, "ෙ");
			text = text.replace(/q/g, "ු");
			text = text.replace(/s/g, "ි");
			text = text.replace(/Q/g, "ූ");
			text = text.replace(/S/g, "ී");
			text = text.replace(/D/g, "ෘ");
			text = text.replace(/DD/g, "ෲ");
			text = text.replace(/\!/g, "ෟ");
			text = text.replace(/d/g, "ා");
			text = text.replace(/z/g, "්");
			text = text.replace(/a/g, "්");
			text = text.replace(/\?/g, "ූ");
			text = text.replace(/♥/g, ".");
			text = text.replace(/Ѫ/g, "(");
			text = text.replace(/Ѧ/g, ")");
			text = text.replace(/ʘ/g, ",");
			text = text.replace(/Ϣ/g, "ූ");
			text = text.replace(/ƨ/g, ")");
			text = text.replace(/Ɣ/g, "%");
			text = text.replace(/ɤ/g, "/");
text = text.replace(/Z/g, "ද්");
text = text.replace(/\//g, "\?");

			node.data = text;

		}
	}


	function SiyaBas_conv() {

		for (i = 0; i < textnodes.snapshotLength; i += 1) {
			node = textnodes.snapshotItem(i);
			text = node.data;
			text = text.replace(/»r°/g, "පෞ");
			text = text.replace(/»\[°/g, "ගෞ");
			text = text.replace(/»~°/g, "සෞ");
			text = text.replace(/»p°/g, "නෞ");
			text = text.replace(/»r±ˆ/g, "ප්‍රේ");
			text = text.replace(/»G±/g, "ට්‍රේ");
			text = text.replace(/»æ£‰/g, "ද්‍රෝ");
			text = text.replace(/»»{/g, "වෛ");
			text = text.replace(/Ã²/g, "ක්‍රි");
			text = text.replace(/Ü²/g, "ත්‍රි");
			text = text.replace(/Ä²/g, "ක්‍රී");
			text = text.replace(/Ý²/g, "ත්‍රී");
			text = text.replace(/ç/g, "ද්‍රි");
			text = text.replace(/\|›²/g, "ශ්‍රී");
			text = text.replace(/\[²¦/g, "ග්‍රෑ");

			// text = text.replace(/»»/g, "ෛ");
			text = text.replace(/»y£‰/g, "රෝ");
			text = text.replace(/»n£‰/g, "දෝ");
			text = text.replace(/»t£‰/g, "බෝ");
			text = text.replace(/»~£‰/g, "සෝ");
			text = text.replace(/»Y£‰/g, "කෝ");
			text = text.replace(/»p£‰/g, "නෝ");
			text = text.replace(/»Z£‰/g, "ඛෝ");
			text = text.replace(/»x£‰/g, "යෝ");
			text = text.replace(/»v£‰/g, "මෝ");
			text = text.replace(/»c£‰/g, "ජෝ");
			text = text.replace(/»ƒ£‰/g, "හෝ");
			text = text.replace(/»\[£‰/g, "ගෝ");
			text = text.replace(/»z£‰/g, "ලෝ");
			text = text.replace(/»u£‰/g, "භෝ");
			text = text.replace(/»\|£‰/g, "ශෝ");
			text = text.replace(/»a£‰/g, "චෝ");
			text = text.replace(/»{£‰/g, "වෝ");
			text = text.replace(/»r£‰/g, "පෝ");
			text = text.replace(/»‡£/g, "ෆො");
			text = text.replace(/»K/g, "මේ");
			text = text.replace(/»L/g, "ඹේ");
			text = text.replace(/»N/g, "වේ");
			text = text.replace(/»J/g, "බේ");
			text = text.replace(/»H/g, "ඩේ");
			text = text.replace(/»nŠ/g, "දේ");
			text = text.replace(/»p‰/g, "නේ");
			text = text.replace(/»\|‰/g, "තේ");
			text = text.replace(/»Y‰/g, "කේ");
			text = text.replace(/»ƒ‰/g, "හේ");
			text = text.replace(/»rˆ/g, "පේ");
			text = text.replace(/»z‰/g, "ලේ");
			text = text.replace(/»…‰/g, "ළේ");
			text = text.replace(/»M/g, "රේ");
			text = text.replace(/»F/g, "ජේ");
			text = text.replace(/»\[‰/g, "ගේ");
			text = text.replace(/»~ˆ/g, "සේ");
			text = text.replace(/»D/g, "චේ");
			text = text.replace(/Ë/g, "ජි");
			text = text.replace(/»xˆ/g, "යේ");
			text = text.replace(/»G/g, "ටේ");
			text = text.replace(/»\|‰/g, "ශේ");
			text = text.replace(/t°/g, "බෞ");
			text = text.replace(/U°/g, "ඌ");
			text = text.replace(/l¯/g, "තෘ");
			text = text.replace(/r¯/g, "පෘ");
			text = text.replace(/Y¯/g, "කෘ");
			text = text.replace(/{¯/g, "වෘ");
			text = text.replace(/Õ/g, "ඩි");
			text = text.replace(/ß/g, "ථි");
			text = text.replace(/Ö/g, "ඩී");
			text = text.replace(/È/g, "චී");
			text = text.replace(/Ä/g, "කී");
			text = text.replace(/Ä/g, "කී");
			text = text.replace(/Å/g, "ඛි");
			text = text.replace(/Ú/g, "ණි");
			text = text.replace(/Þ/g, "ථි");
			text = text.replace(/F/g, "ජ්");
			text = text.replace(/ä/g, "දූ");
			text = text.replace(/r«/g, "පූ");
			text = text.replace(/}«/g, "ෂූ");
			text = text.replace(/æ/g, "ද්‍ර");
			text = text.replace(/¿/g, "ක්");
			text = text.replace(/»r£/g, "පො");
			text = text.replace(/»à/g, "දො");
			text = text.replace(/â/g, "දේ");
			text = text.replace(/b/g, "ඡ");
			text = text.replace(/T/g, "ඊ");
			text = text.replace(/…¹/g, "ළං");
			text = text.replace(/a¹/g, "වං");
			text = text.replace(/x¹/g, "යං");
			text = text.replace(/j¹/g, "ණං");
			text = text.replace(/~¹/g, "සං");
			text = text.replace(/z¹/g, "ලං");
			text = text.replace(/Y¹/g, "කං");
			text = text.replace(/p¹/g, "නං");
			text = text.replace(/{¹/g, "වං");
			text = text.replace(/r¹/g, "පං");
			text = text.replace(/n¹/g, "දං");
			text = text.replace(/o¹/g, "ධං");
			text = text.replace(/R¹/g, "අං");
			text = text.replace(/v¹/g, "මං");
			text = text.replace(/ƒ¹/g, "හං");
			text = text.replace(/c¹/g, "ජං");
			text = text.replace(/U¹/g, "උං");
			text = text.replace(/f¹/g, "ටං");
			text = text.replace(/h¹/g, "ඩං");
			text = text.replace(/g¹/g, "ඨං");
			text = text.replace(/\[¹/g, "ගං");
			text = text.replace(/l¹/g, "තං");
			text = text.replace(/t¹/g, "බං");
			text = text.replace(/y¹/g, "රං");
			text = text.replace(/\|¹/g, "ශං");
			text = text.replace(/W¹/g, "එං");
			text = text.replace(/S¹/g, "ඉං");
			text = text.replace(/u¹/g, "හං");
			text = text.replace(/¹/g, "න්");
			text = text.replace(/¼ã/g, "ඳු");
			text = text.replace(/ã/g, "දු");
			text = text.replace(/u®/g, "භූ");
			text = text.replace(/û/g, "ලු");
			text = text.replace(/j©/g, "ණු");
			text = text.replace(/c«/g, "ජූ");
			text = text.replace(/Ü/g, "ති");
			text = text.replace(/ë/g, "නි");
			text = text.replace(/ê/g, "ධී");
			text = text.replace(/ì/g, "නී");
			text = text.replace(/ú/g, "රී");
			text = text.replace(/¼µ/g, "ඳී");
			text = text.replace(/¼´/g, "ඳි");
			text = text.replace(/´/g, "දි");
			text = text.replace(/ñ/g, "මි");
			text = text.replace(/†/g, "ළු");
			text = text.replace(/J/g, "බ්");
			text = text.replace(/Yª/g, "කු");
			text = text.replace(/R¦/g, "ඈ");
			text = text.replace(/Y®/g, "කූ");
			text = text.replace(/Y¥/g, "කැ");
			text = text.replace(/p¦/g, "නෑ");
			text = text.replace(/t¦/g, "බෑ");
			text = text.replace(/z¦/g, "ලෑ");
			text = text.replace(/~¦/g, "සෑ");
			text = text.replace(/v¦/g, "මෑ");
			text = text.replace(/y¦/g, "රූ");
			text = text.replace(/h¦/g, "ඩෑ");
			text = text.replace(/÷/g, "රැ");
			text = text.replace(/{«/g, "වූ");
			text = text.replace(/ü/g, "ලූ");
			text = text.replace(/ð/g, "බී");
			text = text.replace(/Ý/g, "තී");
			text = text.replace(/Û/g, "ණී");
			text = text.replace(/µ/g, "දී");
			text = text.replace(/á/g, "දැ");
			text = text.replace(/à/g, "දා");
			text = text.replace(/»n/g, "දෙ");
			text = text.replace(/»x/g, "යෙ");
			text = text.replace(/»{/g, "වෙ");
			text = text.replace(/»j/g, "ණෙ");
			text = text.replace(/»q/g, "ඳෙ");
			text = text.replace(/»~/g, "සෙ");
			text = text.replace(/»z/g, "ලෙ");
			text = text.replace(/»Y/g, "කෙ");
			text = text.replace(/»p/g, "නෙ");
			text = text.replace(/»t/g, "බෙ");
			text = text.replace(/»r/g, "පෙ");
			text = text.replace(/»o/g, "ධෙ");
			text = text.replace(/»v/g, "මෙ");
			text = text.replace(/»ƒ/g, "හෙ");
			text = text.replace(/»c/g, "ජෙ");
			text = text.replace(/R¥/g, "ඇ");
			text = text.replace(/»f/g, "ටෙ");
			text = text.replace(/»h/g, "ඩෙ");
			text = text.replace(/»`/g, "ඟ");
			text = text.replace(/»\[/g, "ගෙ");
			text = text.replace(/\[¦/g, "ගෑ");
			text = text.replace(/y¥/g, "රු");
			text = text.replace(/x¦/g, "යෑ");
			text = text.replace(/r¦/g, "පෑ");
			text = text.replace(/Ð/g, "ඥා");
			text = text.replace(/»l/g, "තෙ");
			text = text.replace(/»t/g, "බෙ");
			text = text.replace(/»y/g, "රෙ");
			text = text.replace(/»\|/g, "ශෙ");
			text = text.replace(/»w/g, "ඹෙ");
			text = text.replace(/»…/g, "ළෙ");
			text = text.replace(/»W/g, "ඓ");
			text = text.replace(/r£/g, "පා");
			text = text.replace(/Y£/g, "කා");
			text = text.replace(/z‹/g, "ලි");
			text = text.replace(/Ñ/g, "ටි");
			text = text.replace(/Ò/g, "ටී");
			text = text.replace(/é/g, "ධි");
			text = text.replace(/ý/g, "වි");
			text = text.replace(/þ/g, "වී");
			text = text.replace(/ù/g, "රි");
			text = text.replace(/R£/g, "ආ");
			text = text.replace(/lª/g, "තු");
			text = text.replace(/\|®/g, "ශු");
			text = text.replace(/Q/g, "ශ්‍රී");
			text = text.replace(/k/g, "ඬ");
			text = text.replace(/s/g, "ඵ");
			text = text.replace(/p‰/g, "න්");
			text = text.replace(/l‰/g, "ත්");
			text = text.replace(/z‰/g, "ල්");
			text = text.replace(/N/g, "ව්");
			text = text.replace(/D/g, "ච්");
			text = text.replace(/H/g, "ඩ්");
			text = text.replace(/…/g, "ළ");
			text = text.replace(/a/g, "ච");
			text = text.replace(/]/g, "ඝ");
			text = text.replace(/‡/g, "ෆ");
			text = text.replace(/x/g, "ය");
			text = text.replace(/j/g, "ණ");
			text = text.replace(/q/g, "ඳ");
			text = text.replace(/~/g, "ස");
			text = text.replace(/z/g, "ල");
			text = text.replace(/Y/g, "ක‍");
			text = text.replace(/p/g, "න");
			text = text.replace(/{/g, "ව");
			text = text.replace(/r/g, "ප");
			text = text.replace(/¼n/g, "ඳ");
			text = text.replace(/n/g, "ද");
			text = text.replace(/o/g, "ධ");
			text = text.replace(/R/g, "අ");
			text = text.replace(/v/g, "ම");
			text = text.replace(/ƒ/g, "හ");
			text = text.replace(/c/g, "ජ");
			text = text.replace(/U/g, "උ");
			text = text.replace(/¿}/g, "ක්‍ෂ");
			text = text.replace(/f/g, "ට");
			text = text.replace(/h/g, "ඩ");
			text = text.replace(/`/g, "ඟ");
			text = text.replace(/g/g, "ඨ");
			text = text.replace(/\[/g, "ග");
			text = text.replace(/}/g, "ෂ");
			text = text.replace(/A/g, "ඒ");
			text = text.replace(/X/g, "ඔ");
			text = text.replace(/w/g, "ඹ");
			text = text.replace(/G/g, "ට්");
			text = text.replace(/Z/g, "ඛ");
			text = text.replace(/l/g, "ත");
			text = text.replace(/K/g, "ම්");
			text = text.replace(/E/g, "ජ්");
			text = text.replace(/t/g, "බ");
			text = text.replace(/y/g, "ර");
			text = text.replace(/\|/g, "ශ");
			text = text.replace(/W/g, "එ");
			text = text.replace(/S/g, "ඉ");
			text = text.replace(/u/g, "භ");
			text = text.replace(/B/g, "ඕ");
			text = text.replace(/Ã/g, "කි");
			text = text.replace(/Ì/g, "ජී");
			text = text.replace(/ò/g, "මී");
			text = text.replace(/Ç/g, "චි");
			text = text.replace(/ï/g, "බි");
			text = text.replace(/m/g, "ථ");
			// text = text.replace(/»/g, "ෙ");
			text = text.replace(/‹/g, "ි");
			text = text.replace(/£/g, "ා");
			text = text.replace(/š/g, "ී");
			text = text.replace(/M/g, "ර්");
			text = text.replace(/‰/g, "්");
			text = text.replace(/ˆ/g, "්");
			text = text.replace(/Š/g, "්");
			text = text.replace(/¥/g, "ැ");
			text = text.replace(/Œ/g, "ි");
			text = text.replace(/³/g, "්‍ය");
			text = text.replace(/¨/g, "ු");
			text = text.replace(/ª/g, "ු");
			text = text.replace(/›/g, "ී");
			text = text.replace(/²/g, "්‍ර");
			text = text.replace(/±/g, "්‍ර");
			text = text.replace(/§/g, "ු");
			text = text.replace(/‍¯/g, "ෘ");
			text = text.replace(/‍¹/g, "ං");
			text = text.replace(/‍¦/g, "ෑ");
			text = text.replace(/‍«/g, "ූ");
			text = text.replace(/¬/g, "ූ");
			text = text.replace(/©/g, "ු");
			text = text.replace(/®/g, "ු");
			text = text.replace(/e/g, "ඥ");

			node.data = text;
		}

	}

})();

