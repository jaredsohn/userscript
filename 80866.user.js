// ==UserScript==
// @name           G2G Chat
// @namespace      http://userscripts.org/scripts/show/7538
// @version        1.4.06d
// @description    G2G Chat
// @author         Nitrol
// @include        http://go2goal.pl/*
// @include        http://www.go2goal.pl/*

// ==/UserScript==

//skrypt chatu
var version="1.0c";
var displayedflag = 0;


unsafeWindow.displayshout = function() {
	if(displayedflag == 0) {
		document.getElementById("shoutframe").innerHTML = '<iframe src="http://Radecky.freeshoutbox.net" width="200" height="100%" frameborder="0" allowtransparency="true" ></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showshout = function() {
document.getElementById("shoutbar").style.left="0px";
}

unsafeWindow.hideshout = function() {
 document.getElementById("shoutbar").style.left="-216px";	
}

vshoutbar = document.createElement("div");
vshoutbar.setAttribute("id", "shoutbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vshoutbar);

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" onclick="showshout()" ondblclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://img230.imageshack.us/img230/9431/tlonowe.gif);">'
	+ '</div>'
	+ '<div id="shoutframe" style="position:absolute;top:3px;bottom:3px;righ:3px;" onmouseover="displayshout()"><center>Najedz kursorem by pokazac Shoutbox G2G</center></div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px></div>';

GM_addStyle("#shoutbar { background:url(http://img230.imageshack.us/img230/9431/tlonowe.gif); padding-top:33px; width:210px; position:absolute; left:-216px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://img718.imageshack.us/img718/508/91835775h.png); width:39px; height:134px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");


//skrypt emotek
addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	

smileyarr["1"]="http://losux.pl/files/tomash_204_126.gif";
smileyarr["2"]="http://losux.pl/files/mirek_142_178.gif";
smileyarr["3"]="http://losux.pl/files/sven_196_183.gif";	

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


//nowe ikony
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://losux.pl/templates/subSilver/images/user_agent/icon_windows_98_nt_2000.gif") {
         img.src = "http://losux.pl/templates/subSilver/images/user_agent/icon_firefox.gif";
    }
    if(img.src == "http://losux.pl/templates/subSilver/images/lang_polish/post.gif") {
         img.src = "http://x.forum.cdaction.pl/style_images/ghoztcraft/t_new.gif";
    }
    if(img.src == "http://losux.pl/templates/subSilver/images/lang_polish/reply.gif") {
         img.src = "http://x.forum.cdaction.pl/style_images/ghoztcraft/t_reply.gif";
    }
    if(img.src == "http://losux.pl/templates/subSilver/images/cat_folder_big.gif") {
         img.src = "http://mody.lastinn.info/templates/subSilver/images/cat_folder_big.gif";
    }
    if(img.src == "http://losux.pl/templates/subSilver/images/folder_big.gif") {
         img.src = "http://mody.lastinn.info/templates/subSilver/images/folder_big.gif";
    }
    if(img.src == "http://losux.pl/templates/subSilver/images/folder_locked_big.gif") {
         img.src = "http://mody.lastinn.info/templates/subSilver/images/folder_locked_big.gif";
    }
}