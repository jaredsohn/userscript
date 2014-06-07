// ==UserScript==
// @name           shoutbox_ANKEM
// @description    Shoutbox for ANKEM
// @version        0.2
// @include        http://s1.ikariam.vn/*
// @include        http://board.ikariam.vn/*
// @author         Zaraza107 (edited by chaudu)^^
// ==/UserScript==


var version="0.2";
var displayedflag = 0;


unsafeWindow.displayshout = function() {
	if(displayedflag == 0) {
		document.getElementById("shoutframe").innerHTML = '<iframe src=" http://ankem.cbox.ws/" width="200" height="200%" frameborder="0" allowtransparency="true" ></iframe>';
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

document.getElementById("shoutbar").innerHTML ='<div id="shouttab" ondblclick="showshout()" onclick="hideshout()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#f10707; line-height: 15px; font-size: 10px; font-weight: bold;width:205px;position:absolute;top:0px;left:0px;height:30px;background:url(http://i49.servimg.com/u/f49/11/49/77/42/fond311.jpg);">'
	+ '<a style="color: #f10707;" href="http://s1.ikariam.vn/index.php?view=embassy&id=17884&position=5" target="_blank">Forum ANKEM</a> <br/> <a style="color: #f10707;" onClick="window.open(this.href, this.target, \'width=670,height=635\')" </a></div>'
	+ '<div id="shoutframe" style="position:absolute;top:60px;bottom:3px;righ:4px;" onmouseover="displayshout()"><center>Shoutbox sojuszu SPAM</center></div>'

	+ '<div style="width:210px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://i49.servimg.com/u/f49/11/49/77/42/fond311.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#shoutbar { background:url(http://i49.servimg.com/u/f49/11/49/77/42/fond311.jpg); padding-top:33px; width:210px; position:absolute; left:-216px; top:50px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#shouttab { background:url(http://img341.imageshack.us/img341/9650/shouttabxo0.png); width:41px; height:154px; position:absolute; right:-41px; top:0px; } ");
GM_addStyle("#shouttab:click { left: 0px; } ");
