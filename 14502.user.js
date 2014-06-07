// ==UserScript==

// @name           Signature in Comm Msg & SB By Crazy Downloads<http://www.orkut.com/Community.aspx?cmm=31281855>

// @namespace      Rizwan

// @description    Signature in SB and Comm Msg By Crazy Downloads http://www.orkut.com/Community.aspx?cmm=31281855

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
	document.getElementsByTagName('TEXTAREA').item(0).value=e+"\n\n\n[b][red]Signed By:\n\n[/red][blue]Rizwan Ibrahim\n[/blue][/b][green][i][b]Moderator Of [link=http://www.orkut.com/Community.aspx?cmm=37665282]Download Evolution[/link]"
}
	function dip() {
	text=getTextArea();
	if (!text) return;
	c=text.parentNode;
	d=document.createElement("div");
	d.className="T";
	d.style.fontSize="11px";
	d.align="left";
	
        
        d.style.marginTop="10px";
	c.appendChild(d);
	
	os=document.createElement("a");
	os.href="javascript:;";
	os.innerHTML="<img src=http://lh4.google.com/_-FjW21KXIrU/Rv9YHClAlXI/AAAAAAAAARg/YwOKyAmObU8/s144/images.jpg>";
	os.addEventListener("click", sign, true);
	d.appendChild(os);



}
dip();
}, false);