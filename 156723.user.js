// ==UserScript==
// @name       Fantasy Online Server Hopper
// @namespace  http://www.darklan.net/
// @version    1.3
// @description  easy server switching for FO
// @match      http://www.fantasy-mmorpg.com/?server*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require    http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js
// @copyright  2012+, Emanuele Conti
// ==/UserScript==
var maxSrv = 10;
var createButton = function (label, func, src, alt)
{
	var b = document.createElement("input");
	b.setAttribute("id", label + "Button");
    b.setAttribute("title", alt);
	if (src == null)
	{
		b.setAttribute("type", "button");
		b.setAttribute("value", label);
	}
	else 
	{
		b.setAttribute("type", "image");
		b.setAttribute("src", src);
	}
    $(b).css('height', '30px').css('margin', '5px');
	b.onclick = func;
	return b;
}
var findSrv = function()
{
	return parseInt(document.location.href.substring(40));
}
var goToSrv = function(srv)
{
	var srvTxt = srv +1;
	srvSel.value = srvTxt;
	if (srv < 10) srv = "0"+srv;
	document.location = "http://www.fantasy-mmorpg.com/?server=FO" + srv;
}
var changeSrv = function() 
{
	var wantedSrv = parseInt(srvSel.value)-1;
	if (isNaN(wantedSrv) || wantedSrv < 0 || wantedSrv > maxSrv) return;
	goToSrv(parseInt(srvSel.value)-1);
}
var hopFw = function()
{
	var next = (findSrv() + 1) % maxSrv;
	goToSrv(next);
}
var hopBk = function()
{
	var next = findSrv() - 1;
	if (next < 0) next = maxSrv-1;
	goToSrv(next);
}
var createLink = function(link, text, blankTarget)
{
    var anchor = document.createElement("a");
    anchor.setAttribute("href", link);
    if (blankTarget)
	    anchor.setAttribute("target", "_blank");
    anchor.appendChild(document.createTextNode(text));
    var linkImg = document.createElement("img");
    linkImg.setAttribute("src", "http://www.darklan.net/img/link.png");
    anchor.appendChild(linkImg);
    $(anchor).css('color', 'white').css('margin', '10px');
    anchor.appendChild(document.createElement("br"));
    div.appendChild(anchor);
}
var div = document.createElement("div");
$('body').append(div);
$(div).css('position', 'absolute').css('top', '30px').css('left', (document.width-760)/2 - 140 + 'px').css('vertical-align', 'top').width('140px').css('background-color','black');
createLink("http://www.fantasy-mmorpg.com/", "Select Server", false);
var s = document.createElement("span");
$(s).append(document.createTextNode("Current:")).css('margin-left', '10px').css('margin-top', '5px').css('display','inline-block');
$(div).append(s);
var srvNum = findSrv() + 1;
var srvSel = document.createElement("input");
srvSel.setAttribute("type", "text");
srvSel.setAttribute("id", "serverNumber");
$(srvSel).css('margin','5px').width('30px').height('15px').css('font-size', '14px').css('vertical-align', 'top');
srvSel.onchange = changeSrv;
srvSel.value = srvNum;
div.appendChild(srvSel);
div.appendChild(document.createElement("br"));
div.appendChild(createButton("prev", hopBk, "http://www.darklan.net/img/blue left arrow.png", "go to previous server"));
div.appendChild(createButton("next", hopFw, "http://www.darklan.net/img/blue right arrow.png", "go to next server"));
div.appendChild(createButton("refresh", changeSrv, "http://www.darklan.net/img/refresh.png", "refresh this server"));
div.appendChild(document.createElement("br"));
createLink("http://www.fantasy-mmorpg.com/forums/", "Fo Forum", true);
$(div).draggable();