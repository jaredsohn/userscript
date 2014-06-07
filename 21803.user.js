// ==UserScript==
// @name           Signature in Comm Msg & SB
// @namespace      Gautam
// @description    Signature in SB and Comm Msg
// @include        http://www.orkut.com/CommMsgPost.aspx?cmm=*
// @include        http://www.orkut.com/Scrapbook.aspx*
// ==/UserScript==
addEventListener('load', function(event) {
function getTextArea() {
	return document.getElementsByTagName('textarea')[0];
}
//----------------------------
// -- To Edit, Install This Script, Go to Tools, Greasemonkey, Manage User Scripts, Select this Script and click on Edit, after edited, press ctrl + s and Enjoy!! --
//----------------------------

function sign() {
	e=document.getElementsByTagName('TEXTAREA').item(0).value;
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"\n\n\n [silver]---------------------------[/silver][red][b]\nRegards:\n Baldev";
}
	function Gautam() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
	
        
        d.style.marginTop="10px";
	c.appendChild(d);
	
	sig=document.createElement("a");
	sig.href="javascript:;";
	sig.innerHTML="Add Signature";
	sig.addEventListener("click", sign, true);
	d.appendChild(sig);