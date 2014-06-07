// ==UserScript==
// @name           OGame ReDesign Links
// @namespace      calypso beta2
// @description    Diverse Links
// @include        http://*.ogame.de/game/*
// @exclude http://*.ogame.*ajax*
// @exclude http://*.ogame.*eventList*
// ==/UserScript==
// thx an Lark für den spio-diff calc
// für RD - Unis

(function() 
{
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}
	
	var $ = unsafe.$;
	var session = unsafe.session;

	if ( !$ ) return;

	try {
        var message_num = document.getElementById('message_alert_box');
        var m_num = 0;
        if(message_num) m_num = message_num.children[0].textContent.replace(/\D/g, '');
        var objButton = $('#menuTable li').eq(1).clone(true);
        objButton.find('.menu_icon').html('');
        objButton.find('.menubutton')
            .removeClass('selected')
            .attr('href', 'index.php?page=messages&session='+session)
            .attr('target', '_self')
            .find('.textlabel').html('Messages : '+m_num);
        objButton.appendTo('#menuTable');
        message_num = document.getElementById('menuTable');
        if(m_num > 0)
            message_num.children[message_num.childElementCount-1].children[1].className = "menubutton premiumHighligt";
        if (document.location.href.indexOf('page=messages') > -1) 
            message_num.children[message_num.childElementCount-1].children[1].className = "menubutton selected";
	var img = document.createElement('img');
	img.setAttribute('src', 'http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif');
	img.setAttribute('height', '29');
	img.setAttribute('width', '38');
	img.setAttribute('style', 'cursor:pointer');
	img.setAttribute('onmouseover', "this.src='http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif';");
	img.setAttribute('onmouseout', "this.src='http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif';");


	a.appendChild(img);
	span.appendChild(a);
}
   	catch (e) {}
}) ()

function searchPlayer() {
	var player = document.getElementById('playersearch').value;
	if (player != 'Spielersuche') {
		var universe = 'andromeda';
		var country = 'org';
	
		var url = document.location.href;
		var pattern = /http:\/\/(.*?)\..*?\.(.*?)\//i;
		var matches = pattern.exec(url);
		if (matches != null) {
			universe = matches[1];
			country = matches[2];
		}
	
		var player = document.getElementById('playersearch').value;
		window.open('http://www.war-riders.de/'+country+'/'+universe+'/search/player/'+player);
	}
}

function addButton() {
	var menu = document.getElementById("menuTable");
    
	var span = document.createElement('span');
	span.setAttribute('class', 'menu_icon');

	var a = document.createElement('a');
	a.setAttribute('onClick', 'searchPlayer()');

	var img = document.createElement('img');
	img.setAttribute('src', 'http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif');
	img.setAttribute('height', '29');
	img.setAttribute('width', '38');
	img.setAttribute('style', 'cursor:pointer');
	img.setAttribute('onmouseover', "this.src='http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif';");
	img.setAttribute('onmouseout', "this.src='http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif';");


	a.appendChild(img);
	span.appendChild(a);
    
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id', 'playersearch');
	input.setAttribute('value', 'Spielersuche');
	input.setAttribute('style', 'width: 119px; border: 0px solid #767f88; color: #767f88; background-color: transparent; text-align: center; padding: 2px 0 2px; margin: 3px 7px; font:bold 11px/14px verdana, arial, helvetica, sans-serif; ');
	input.setAttribute('onclick', "if(this.value=='Spielersuche'){this.value='';this.style.border='1px solid #767f88';this.style.color='#f1f1f1';}");
	input.setAttribute('onblur', "if(this.value==''){this.value='Spielersuche';this.style.border='0px solid #767f88';this.style.color='#767f88';}");
	input.setAttribute('onKeyDown', "if(event.keyCode==13) searchPlayer();");

	var span2 = document.createElement('span');
	span2.setAttribute('class', 'textlabel');

	span2.appendChild(input);

	var li = document.createElement('li');
	li.setAttribute('class', 'menubutton_table');

	li.appendChild(span);
	li.appendChild(span2);

	menu.appendChild(li);

	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "" + searchPlayer + "";
	
	document.body.appendChild(script);
}

window.addEventListener('load', addButton, true);

var usersession = unsafeWindow.session; 






var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://bontchev.my.contact.bg/ogame/expeditions.html" accesskey="" target="_blank"><span class="textlabel">Expo-Rechner1</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://ogame.broken-by-design.org/?page_id=75/" accesskey="" target="_blank"><span class="textlabel">Expo-Rechner2</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://ogame.broken-by-design.org/?page_id=79/" accesskey="" target="_blank"><span class="textlabel">Flottenflucht</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://www.savekb.de/" accesskey="" target="_blank"><span class="textlabel">SaveKB</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://gixl.de/OGSim/spioDiff.html" accesskey="" target="_blank"><span class="textlabel">Spio-Diff</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://mines.oprojekt.net" accesskey="" target="_blank"><span class="textlabel">Minen Signatur</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://www.oraiders.com/calculators.php" accesskey="" target="_blank"><span class="textlabel">oRaiders</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://owiki.de/Hauptseite" accesskey="" target="_blank"><span class="textlabel">oWiki</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://Forum-Addi1/" accesskey="" target="_blank"><span class="textlabel">Ally-Forum2</span></a></li>';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdncf/11b32cf746afcdd4bc896373186a3d.gif" height="29" width="38"></span><a class="menubutton " href="http://Forum-Addi2/index.php" accesskey="" target="_blank"><span class="textlabel">Ally-Forum2</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);

var pseudo = document.getElementsByClassName('textBeefy')[0].innerHTML;

function removeElement(divNum) {
  var d = document.getElementById('menuTable');
  var olddiv = document.getElementById(divNum);
  d.removeChild(olddiv);
}

