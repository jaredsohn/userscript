// ==UserScript==
// @name          VKOpt 1.3 beta
// @namespace     http://vkopt.nm.ru/
// @description   Vkontakte Optimizer 1.3 beta for MOZILLA FIREFOX
// @include       *
// ==/UserScript==


(function() {

//--- Main Variables ---//

var vVersion	= 12.5;

var vQuery	= '';
var vHost	= ''; 
var vPHP	= '';
var vAct	= null;
var vId		= null;


//--- Auxiliary functions ---//
 
function setCookie(cookieName,cookieValue,nDays) 
{
	var today = new Date();
	var expire = new Date();
	if (nDays==null || nDays==0) nDays=365;
	expire.setTime(today.getTime()+ 3600000*24*nDays);
	document.cookie= cookieName+ "="+ escape(cookieValue)+
	";expires="+ expire.toGMTString();
}
 
function getCookie(name) 
{
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) 
	{
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else 
	{
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) 
	{
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}


/**********************************************************************************
POEHALI

Funktsii delyatsya 
na VkoptNNN() - sobstvenno kornevye, 
i na AvkNNN() - vyzyvaemye iz kornevyh
**********************************************************************************/


//--- Functions. Area: Vkontakte.ru ---//


function VkoptAudio()
/* knopka dlya skachivaniya audio
   thanks to [Sergey GrayFace Rojenko]
   (iznachal'naya ideya vzyata u nego, no pererabotana dlya
   sovmestimosti s FireFox */
{
	var bar = document.getElementById("audioBar");

	if (bar)
	{
		bar = bar.firstChild;
		if (bar) bar = bar.nextSibling; // <div class="column mainPanel">
		if (bar) bar = bar.firstChild;
		if (bar) bar = bar.nextSibling; // <div id="audios"
	}
	else
	{
		bar = document.getElementById("audios");
		if (bar)
		{
			bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div class="bOpen">
			if (bar) bar = bar.nextSibling;
			if (bar) bar = bar.nextSibling; // <div class="c">
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div class="whenOpen">
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div class="fSub clearFix">
			if (bar) bar = bar.nextSibling;
			if (bar) bar = bar.nextSibling; // <div class="flexBox clearFix"
		}
		else
		{
			bar = document.getElementById("bigResult");
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div>
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div style="padding:20px" >
		}
	}
	
	if (bar)
	{
		var row = bar.firstChild;
		if (row) row = row.nextSibling;

		while (row && (row.className== 'audioRow'))
		{
			var td = row.getElementsByTagName('td')[0];

			// Generate URL
			var script = td.innerHTML.split('onclick="')[1].split('"')[0];
			script = script.substring(script.indexOf('(') + 1, script.indexOf(')'));
			var params = script.split(',');
			var server = params[1];
			var user = params[2];
			while (user.length < 5) user = '0' + user;
			var fname = params[3];
			fname = fname.substring(1, fname.length - 1); // remove '
			
			fname = 'http://cs' + server + '.vkontakte.ru/u' + user + '/audio/' + fname + '.mp3';

			// Add link
			td.style.width = '48px';
			td.innerHTML+=
				'<a href= "'+ fname+ '"><img src= "http://vkopt.nm.ru/save2.gif"></a>';
						
			row = row.nextSibling;
			if (row) row = row.nextSibling;
		}
	}
}



function VkoptGroupsInCols()
/* Sdelat' spisok grupp na glavnoi stranitse v stolbik */
{
	if (document.getElementById('groups'))
		if (document.getElementById('groups').getElementsByTagName('div')[9])
		{
			if (document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</A>')[1]) // Opera-like uppercase tags
				document.getElementById('groups').getElementsByTagName('div')[9].innerHTML= 
				'&#x25AA; '+ document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</A>').join('</A><BR>');

			else if (document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</a>')) // FF-like lowercase tags
				document.getElementById('groups').getElementsByTagName('div')[9].innerHTML= 
				'&#x25AA; '+ document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</a>').join('</a><br>');
		}
}



function VkoptVideo()
/* knopki dlya:
   skachivaniya video 
   skachivaniya FLV-pleera
   formirovaniya koda proigryvatelya dlya bloga*/
{
	// adres thumbnail'a
	var vStyle  = document.getElementById("flash_player_container_outer").style.background;
	var uuThumb = vStyle.split('(')[1].split(')')[0];
	if (uuThumb.split('"')[1])
		uuThumb= uuThumb.split('"')[1];

	var j = 0;

	var sr = document.body.innerHTML;

	// vytseplyaem znacheniya peremennyh dovol'no kosym metodom
	var uuHost = sr.split("addVariable('host'")[1].split("'")[1].split("');")[0];
	var uuTag  = sr.split("addVariable('vtag'")[1].split("'")[1].split("');")[0];
	var uuKid  = sr.split("addVariable('vkid'")[1].split("'")[1].split("');")[0];

	var uuLink = sr.split("addVariable('link'")[1].split("'")[1].split("');")[0];
	var uuTitle= sr.split("addVariable('md_title'")[1].split("'")[1].split("');")[0];
	var uuAuth = sr.split("addVariable('md_author'")[1].split("'")[1].split("');")[0];

	if (sr.split("addVariable('folder_id'")[1]) // адрес папки есть только у видео, загруженных текущим пользователем
	{
		var uuFold = sr.split("addVariable('folder_id'")[1].split("'")[1].split("');")[0];
	}
	else
	{
		var uuFold = '';
	}

	var vPath  = 'http://'+ uuHost+ '/assets/videos/';
	var vVideo = uuTag+ uuKid+ '.vk.flv';

	var vObject = 
		'<object id="player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="460" height="345" >'+
		'<param name="movie" value="http:/'+ '/1.vkadre.ru/VkontaktePlayer.swf?14" />'+
		'<param name="allowfullscreen" value="true" />'+
		'<param name="flashvars" value="overstretch=false&vid='+
		'&host='+ uuHost+
		'&vtag='+ uuTag+
		'&vkid='+ uuKid+
		'&link='+ uuLink+
		'&md_title='+ uuTitle+
		'&md_author='+ uuAuth+
		'&folder_id='+ uuFold+
		'" />'+
		'<embed type="application/x-shockwave-flash" src="http:/'+ '/1.vkadre.ru/VkontaktePlayer.swf?14" width="460" height="345" id="player" name="player" allowfullscreen="true" flashvars='+
		'"overstretch=false&vid='+
		'&host='+ uuHost+
		'&vtag='+ uuTag+
		'&vkid='+ uuKid+
		'&link='+ uuLink+
		'&md_title='+ uuTitle+
		'&md_author='+ uuAuth+
		'&folder_id='+ uuFold+
		'" /></object>';

	// sobstvenno ob'ekt (vObject) vstavlyaem v krasivuyu tablitsu so ssylkoi na stranitsu s video

	var vEmbed=
		'<table border= 0 cellspacing= 0 cellpadding= 0 style= "background-color: black;">'+
		'<tr><td width="460" height="345" style= "background-image: url('+ uuThumb+
		');" id= "cont"><center>'+ vObject+ '</center></td></tr><tr><td><center><b><a href="'+
		unescape(uuLink).split('+').join(' ')+
		'" style= "font-family: Arial, Tahoma; color: #EEEEEE; font-size: 10pt;">'+
		unescape(uuLink).split('+').join(' ')+
		'</a></b></center></td></tr><tr style= "height: 2px;"><td style= "height: 2px;"></td></tr></table>';


	// knopka dlya skachivaniya video
	window.document.getElementById("videoactions").innerHTML+= 
		'<a href= "'+ vPath+ vVideo+ '"><img src= "http://vkopt.nm.ru/vkDownloadVid.png" alt= "Skachat video">&nbsp;<img src= "http://vkopt.nm.ru/vk.gif" alt= "VKOpt"></a>';
	
	// knopka dlya skachivaniya proigryvatelya FLV-failov
	if (getCookie('VkoptDownPlayer')!= 'n')
		window.document.getElementById("videoactions").innerHTML+= 
			'<a href= "http://dl.filekicker.com/send/file/193122-0O88/FLVPlayerSetup.exe"><img src= "http://vkopt.nm.ru/vkDownloadPlayer.png" style= "position: relative; top: 1px;" alt= "Skachat FLV-pleer">&nbsp;<img src= "http://vkopt.nm.ru/vk.gif" alt= "VKOpt"></a>';

	// knopka, pod kotoroy skryt input s kodom dlya bloga
	if (getCookie('VkoptBlCod')!= 'n')
	{
		window.document.getElementById("videoactions").innerHTML+= 
			'<a id= "cfthref" onmouseover= "this.style.display= \'none\'; document.getElementById(\'cft\').style.display= \'block\';" style= "display: block; cursor: pointer;"><img src= "http://vkopt.nm.ru/vkGetCode.png" alt= "Kod video dlya bloga">&nbsp;<img src= "http://vkopt.nm.ru/vk.gif" alt= "VKOpt"></a>'+
			'<input id= "cft" style= "width: 148px; display: none;" type= "text" readonly value= "" onmouseout= "this.style.display= \'none\'; document.getElementById(\'cfthref\').style.display= \'block\';" onClick= "this.focus();this.select()">';
		document.getElementById('cft').value= vEmbed;
	}
}



function AvkFillEvent()
/* Otmechaet vseh druzey galochkami v priglashenii na vstrechu posle nazhatiya sootv. knopki */
{
	var i = 0;
	for(i= 0; i< 10000; i++)
		document.getElementById('inviteFriends').elements[i].checked= true;
}



function VkoptEvent()
/* dobavlyaet knopku "Select All" v priglashenie na vstrechu */
{
	var Swap = document.getElementById("inviteFriends").getElementsByTagName("table")[0].innerHTML;
	document.getElementById("inviteFriends").getElementsByTagName("table")[0].innerHTML=
	'<tr><td><input type= "checkbox" checked onClick= "AvkFillEvent(); checked= true"></td><td><font style= "color: #36638E; cursor: pointer;" onClick= "location.href= location.href+ \'&select=all\'"><img src= "http://vkopt.nm.ru/vkEventSelect.png" alt= "Vydelit vsex">&nbsp;&nbsp;<img src= "http://vkopt.nm.ru/vk.gif" alt= "VKOpt"></font></td></tr>'+
	Swap+
	'<tr><td><input type= "checkbox" checked onClick= "AvkFillEvent(); checked= true"></td><td><font style= "color: #36638E; cursor: pointer;" onClick= "location.href= location.href+ \'&select=all\'"><img src= "http://vkopt.nm.ru/vkEventSelect.png" alt= "Vydelit vsex">&nbsp;&nbsp;<img src= "http://vkopt.nm.ru/vk.gif" alt= "VKOpt"></font></td></tr>';
}



function AvkFillGroup()
/* Otmechaet vseh druzey galochkami v priglashenii v gruppu posle nazhatiya sootv. knopki */
{
	var k = 0;
	var j = 0;

	document.getElementById('toinvite').style.display= 'block';

	var ins = document.getElementsByTagName('input');
	var queued = new Array();

	for (k= 0; k< ins.length; k++)
	{
		if (ins[k].type== 'checkbox')
			if (isFinite(ins[k].name))
				queued.push(ins[k].name);
	}

	for (j= 0; j< queued.length; j++)
	{
		var node = document.createElement('DIV');
		node.id = 'toinvite'+ queued[j];
		node.innerHTML = 
			"<div class='mName'><a href='/id"+ queued[j] +"'>"+ 
			document.getElementById("friend"+ queued[j]).innerHTML+
			"</a></div><div class='mOption'><a href='#' onClick='return delToInvite("+ queued[j] +");'>"+
			"x" + "</a></div><input type='hidden' name='"+ queued[j] +"' value='1'>";
		node.className = 'mRow clearFix';
		document.getElementById('toinvitemembers').appendChild(node);
		document.getElementById('friendtr'+ queued[j]).style.display= 'none';
	}
}



function VkoptGroup()
/* dobavlyaet knopku "Select All" v priglashenie v gruppu */
{
	var j = 0;
	var divs = document.getElementsByTagName('div');

	for (j = 0; j< divs.length; j++)
		if (divs[j].className== 'iPanel')
			break;

	var Qout = divs[j].getElementsByTagName('table')[0];

	var Swap = Qout.innerHTML;
	Qout.innerHTML=
		'<tr><td><input id= "VkoptCheck" type= "checkbox" style= "cursor: pointer;" onClick= "AvkFillGroup(); checked= true;"></td><td><font style= "color: #36638E; cursor: pointer; border-top: 3px solid white;" onClick= "location.href= location.href+ \'&select=all\'"><img src= "http://vkopt.nm.ru/vkEventSelect.png" alt= "Vydelit vsex">&nbsp;<img src= "http://vkopt.nm.ru/vk.gif" alt= "VKOpt"></font><img src= "http://vkontakte.ru/images/upload.gif" id= "waitBar" style= "visibility: hidden;"></td></tr>'+
		Swap;
}



function AvkAlert()
/* OCHEN' VAZHNAYA FUNKTSIYA!!! */
{
	alert('wtf');
}



function VkoptUnwrap()
/* razvorachivaet kartinki na stene v shirinu steny */
{
	var j = 0;
	var m = 0;
	var iAddress = 0;
	var iDiv = null;
	var iNewImg = null;
	var iNewA = null;

	var divs = document.getElementsByTagName('div');

	for (j= 0; j< divs.length; j++)
	{
		if (divs[j].getElementsByTagName('img')[0])
			if (divs[j].getElementsByTagName('img')[0].className== 'iIcon')
			{
				iNewImg= divs[j].getElementsByTagName('img')[1].src;
				iNewA= divs[j].getElementsByTagName('a')[1].href;

				divs[j].innerHTML=
				'<div class= "feedPhotos"><a href= "'+ iNewA+ '"><img src= "'+ iNewImg+ '" style= "width: 95%;"></a></div>';
			}
	}
}



function VkoptSettings(vkMode)
/* Formiruet stranitsu s nastroikami 
   vkMode = 0 --> pokazat'
   vkMode = 1 --> sohranit' i pokazat' */
{
	document.getElementById('content').getElementsByTagName('li')[0].className= '';

	document.getElementById('content').getElementsByTagName('ul')[0].innerHTML+=
	'<LI class= "activeLink"><A href= "settings.php?act=vkopt" class= "activeLink" style= "width: 4.5em;">VKOpt</A></LI>';

	document.getElementById('content').getElementsByTagName('div')[1].innerHTML= 
	'<div id="password" class="settingsPanel"><h4>Vkontakte Optimizer 1.3 <small>beta</small> services</h4>'+

	'<form method="post" id="VkoptSettings" name="VkoptSettings" action="settings.php">'+

	'<table class="editor" style="margin-left:0px; width: 340px" border="0" cellspacing="0">'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptAudio" id= "VkoptAudio"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkDnAudio.png" alt= "Skachivaniye audio"></td></tr>'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptVideo" id= "VkoptVideo"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkDnVideo.png" alt= "Skachivaniye video"></td></tr>'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptBlCod" id= "VkoptBlCod"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkCodeBlog.png" alt= "Pokazivat kod video dlya bloga"></td></tr>'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptDownPlayer" id= "VkoptDownPlayer"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkGetPlayer.png" alt= "Pokazivat Skachat FLV-player"></td></tr>'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptEG" id= "VkoptEG"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkSelAll.png" alt= "Pokazivat Videlit vseh"></td></tr>'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptImage" id= "VkoptImage"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkUnwrap.png" alt= "Avto-razvertka kartinok na stene"></td></tr>'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptNotify" id= "VkoptNotify"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkNotify.png" alt= "Uvedomlyat o vyhode novoi versii"></td></tr>'+

	'<tr><td style= "width: 60px; text-align: right;">'+
	'<input type= "checkbox" name= "VkoptGroupsInCols" id= "VkoptGroupsInCols"></td>'+
	'<td style= "width: 150px; text-align: left;"><img src= "http://vkopt.nm.ru/vkGroupCol.png" alt= "Gruppi v stolbik"></td></tr>'+

/*	'<tr><td style= "width: 60px; text-align: right;"></td>'+
	'<td style= "width: 150px; text-align: left;">'+
	'<img src= "http://vkopt.nm.ru/vkInterval.png" alt= "Interval v Slideshow">&nbsp;'+
	'<input type= "text" name= "VkoptSlideshowPause" id= "VkoptSlideshowPause" style= "width: 20px;" value= "">'+
	'&nbsp;<img src= "http://vkopt.nm.ru/vkSek.png" alt= "sec">&nbsp;<font style= "position: relative; top: -2px;">(Opera only)</font>'+
	'</td></tr>'+*/

	'<tr><td style= "width: 60px; text-align: right;"></td>'+
	'<td style= "width: 120px; text-align: left;">'+
	'<ul class="buttonRow" style="margin:0px;padding:0px">'+
	'<li style="width:9.5em"><a style="width:8.5em" href= "#" onClick= "var res= new Array(); for(var m = 0; m< 8; m++) res.push(document.VkoptSettings.getElementsByTagName(\'input\')[m].checked); location.href= \'./settings.php?act=vkopt&saved=\'+ res.join(\'+\');">Save</a></li></ul>'+
	'</td></tr>'+

	'</table></form><h4><img src= "http://vkopt.nm.ru/vkH4.png" alt= "Eti nastroyki sohranyayutsyua tolko na vashem kompyutere!"></h4></div>';

	if (vkMode== 1) // sohranyaem to, chto bylo peredano cherez "&saved="
	{
		var qNew = location.href.split('&saved=')[1].split('+');
		var k = 0;
		for (k= 0; k< 8; k++)
		{
			if (qNew[k]== 'false')
				setCookie(document.getElementById('VkoptSettings').getElementsByTagName('input')[k].name, 'n');
			else
				setCookie(document.getElementById('VkoptSettings').getElementsByTagName('input')[k].name, 'y');
		}
/*		setCookie('VkoptSlideshowPause', 2);
		if (isFinite(qNew[8]))
			setCookie('VkoptSlideshowPause', qNew[8]);*/
	}

	var j = 0;

	for (j= 0; j< 8; j++)
		if ((getCookie(document.getElementById('VkoptSettings').getElementsByTagName('input')[j].name)== 'y')
		 || (getCookie(document.getElementById('VkoptSettings').getElementsByTagName('input')[j].name)== null))
			document.getElementById('VkoptSettings').getElementsByTagName('input')[j].checked= true;

/*	if (getCookie('VkoptSlideshowPause')== null)
		document.getElementById('VkoptSlideshowPause').value= 2;
	else
		document.getElementById('VkoptSlideshowPause').value= getCookie('VkoptSlideshowPause');*/
}



function VkoptNotify()
/* Soobschaet o nalichii obnovleniya */
{
	if (vAct== 'updateNotify')
	{
		document.getElementById('sideBar').innerHTML+=
		'<div class= "leftAd" id= "VkoptUpd" style= "display: block; margin-bottom: 10px;"><h4><img src= "http://vkopt.nm.ru/vk.gif" alt= "VK">Opt update</h4><p><div style="text-align: center">New version is available <a href= "http://vkopt.nm.ru/index.html?update">here&gt;&gt;</a></div></p></div>'
	}
	else
	{
		document.getElementById('sideBar').innerHTML+=
		'<iframe style= "display: none;" src= "http://vkopt29.narod.ru/check.html?'+ vVersion+ '&'+ location.href+ '"></iframe>';
	}
}



function VkoptHomeClub()
/* izmenyaet nekotorye veschi na stranitse gruppy Vkontakte Optimizer */
{
/*	var divs = document.getElementsByTagName('div');
	var ancs = document.getElementsByTagName('a');

	// vydelyaem FAQ sinim
	var j = 0;
	for (j= 0; j< divs.length; j++)
		if ((divs[j].className== 'boardTopic clearFix') 
		 && (divs[j].getElementsByTagName('a')[0].innerText== 'FAQ'))
		{
			alert('good');
			divs[j].style.background= '#DAE2EA';
			divs[j].style.cursor= 'pointer';
			divs[j].onclick= 'location.href= \'http://vkontakte.ru/board.php?act=topic&tid=1312272\'';
		}

	// esli otvet administratora (menya) - posledniy v obsuzhdenii, to budet napisano: "Avtor: Admin"
	var k = 0;
	for (k= 0; k< ancs.length; k++)
		if (ancs[k].href== 'id46053')
		{
			ancs[k].innerHTML= '<i style= \'color: #880000;\'>Admin</i>';
			ancs[k].href= document.getElementsByTagName('a')[k+1].href;
		}*/
}




//--- Functions. Area: Vkadre.ru ---//


function VkoptVideoVkadre()
/* knopka dlya skachivaniya video */
{
	var sr = document.body.innerHTML;

	// vytseplyaem znacheniya peremennyh dovol'no kosym metodom
	var uuHost = sr.split("addVariable('host'")[1].split("'")[1].split("');")[0];
	var uuTag  = sr.split("addVariable('vtag'")[1].split("'")[1].split("');")[0];
	var uuKid  = sr.split("addVariable('vkid'")[1].split("'")[1].split("');")[0];

	var uuLink = sr.split("addVariable('link'")[1].split("'")[1].split("');")[0];
	var uuTitle= sr.split("addVariable('md_title'")[1].split("'")[1].split("');")[0];
	var uuAuth = sr.split("addVariable('md_author'")[1].split("'")[1].split("');")[0];

	if (sr.split("addVariable('folder_id'")[1]) // адрес папки есть только у видео, загруженных текущим пользователем
	{
		var uuFold = sr.split("addVariable('folder_id'")[1].split("'")[1].split("');")[0];
	}
	else
	{
		var uuFold = '';
	}

	var vPath  = 'http://'+ uuHost+ '/assets/videos/';
	var vVideo = uuTag+ uuKid+ '.vk.flv';

	document.getElementById('first-panel').innerHTML= 
		document.getElementById('first-panel').innerHTML.split('<br')[0].split('<BR')[0]+
		'<a href= "'+ vPath+ vVideo+ '" class= "desel" style= "position: relative; top: -2px;">Download <img src= "http://vkopt.nm.ru/vk.gif" border= 0></a>'+
		'<br clear="both" style="clear:both" />';
}



function AvkDisplayEnv()
{
	alert
	(
		'Env|variables:'+
		'\nvHost = '+ vHost+
		'\nvPHP  = '+ vPHP+
		'\nvAct  = '+ vAct+
		'\nvId   = '+ vId 
	);
}



//--- Start Function ---//

	var Splinter =	location.href.split('/');

	// adres Host'a
	var vHost =	Splinter[2].split('.').reverse()[1]; // s podvyvertom, no zato vozvraschaet "vkontakte" dazhe esli na samom dele eto zerkalo (cs00 i t. d.)

	// stranitsa (vsyo posle "vkontakte.ru/")
	var Page =	Splinter.reverse()[0];


//--- Area: Vkontakte.ru---//

	if (vHost== 'vkontakte')
	{
		if (Page.split('.')[1]) // pryamoe ukazanie na PHP-fail
			vPHP= Page.split('.')[0];
	
		if (Page.split('?')[1]) // est' query
		{
			vQuery= Page.split('?')[1];
			if (Page.split('?')[2]) vQuery+= Page.split('?')[2]; // po-moemu, eto na sluchai ./idNNN?MMM
			if (vQuery.split('act=')[1]) 
			{
				vAct= vQuery.split('act=')[1].split('&')[0];
			}
			else
			{
				vAct= 'really_nothing'; // uzhe ne pomnyu v chem smysl, no tak nado!
			}

			if (vQuery.split('id=')[1])
			{
				vId= vQuery.split('id=')[1].split('&')[0];
			}
		}
		else
		{
			if (Page.split('club')[1])
			{
				vId= Page.split('club')[1];
			}
			if (Page.split('id')[1])
			{
				vId= Page.split('id')[1];
			}
		}

		if (!Page.split('.')[1]) // ne PHP-ssylka ("/club1" vmesto "/groups.php?act=s&id=1")
		{
			vPHP= Page.split('')[0]+ Page.split('')[1];
		
			if (vPHP== 'id')
				vPHP= 'profile';
			if (vPHP== 'cl')
				vPHP= 'groups';
			if (vPHP== 'vi')
				vPHP= 'video';
			if (vPHP== 'ev')
				vPHP= 'events';
		}
	
		if ((vPHP== 'video') && (vAct!= 'really_nothing') && (getCookie('VkoptVideo')!= 'n'))
			VkoptVideo();

		if ((vPHP== 'events') && (vAct== 'members') && (getCookie('VkoptEG')!= 'n') && (!location.href.split('&select=')[1]))
			VkoptEvent();

		if ((vPHP== 'events') && (vAct== 'members') && (getCookie('VkoptEG')!= 'n') && (location.href.split('&select=')[1]))
			AvkFillEvent();

		if ((vPHP== 'groups') && (vAct== 'members') && (getCookie('VkoptEG')!= 'n') && (!location.href.split('&select=')[1]))
			VkoptGroup();

		if ((vPHP== 'groups') && (vAct== 'members') && (getCookie('VkoptEG')!= 'n') && (location.href.split('&select=')[1]))
			AvkFillGroup();

		if ((vPHP== 'settings') && (vAct!= 'vkopt'))
			document.getElementById('content').getElementsByTagName('ul')[0].innerHTML+=
			'<LI><A href="settings.php?act=vkopt" style="width:4.5em">VKOpt</font></A></LI>';

		if ((vPHP== 'settings') && (vAct== 'vkopt') && (!location.href.split('&saved=')[1])) // pokazat' nastroiki
			VkoptSettings(0);

		if ((vPHP== 'settings') && (vAct== 'vkopt') && (location.href.split('&saved=')[1])) // sohranit' nastroiki
			VkoptSettings(1);

		if (((vPHP== 'groups') || (vPHP== 'profile') || (vPHP== 'wall'))  && (getCookie('VkoptImage')!= 'n'))
			VkoptUnwrap();

		if ((vPHP== 'profile') && (getCookie('VkoptNotify')!= 'n'))
			VkoptNotify();

		if ((vPHP== 'profile') && (getCookie('VkoptGroupsInCols')!= 'n'))
			VkoptGroupsInCols();

/*		if ((vPHP== 'photos') && (vAct== 'album')) // dobavlyaem ssylku na slideshow v al'bom
		{
			var vkBlock = document.getElementById('searchResults').getElementsByTagName('div')[0].getElementsByTagName('a')[0];
			vkSlideTitle = '';

			document.getElementById('content').getElementsByTagName('div')[1].innerHTML+= 
				'<span class= "divider">|</span><a class="notbold" href="'+ 
				'./photos.php?act=slideshow&title='+ escape(vkSlideTitle)+ '&start='+ escape(vkBlock.href.split('&id=')[1])+ '&return='+ escape(location.href.split('vkontakte.ru/')[1])
				+ '">Slideshow</a>';
		}

		if ((vPHP== 'photos') && (vAct== 'user')) // dobavlyaem ssylku na slideshow v "fotografii s pol'zovatelem"
			{
				if (document.getElementById('searchResults').getElementsByTagName('div')[1]) // est' <div id= 'album'>
				if (document.getElementById('searchResults').getElementsByTagName('div')[1].getElementsByTagName('a')[0]) // est' vnutri ssylki
					document.getElementById('searchResults').getElementsByTagName('div')[0].innerHTML+= '<span class= "divider">|</span><a class="notbold" href="javascript:AvkSlideshow(1, \' \')">Slideshow</a>';

				if (document.getElementById('searchResults').getElementsByTagName('div')[3]) // est' vtoroi <div id= 'album'>
				if (document.getElementById('searchResults').getElementsByTagName('div')[3].getElementsByTagName('a')[0]) // est' vnutri ssylki
					document.getElementById('searchResults').getElementsByTagName('div')[2].innerHTML+= '<span class= "divider">|</span><a class="notbold" href="javascript:AvkSlideshow(3, \' \')">Slideshow</a>';
			}

		if ((vPHP== 'photos') && (location.href.split('noimages=')[1])) // nuzhno chtoby v slaidshou gruzilos' bystree (ubiraem vse kartinki krome samoi foty)
			{
				var k = 0;
				while (document.getElementsByTagName('img')[k])
					{
						if ((!document.getElementsByTagName('img')[k].attributes['id']) ||
						     (document.getElementsByTagName('img')[k].attributes['id'].value!= 'myphoto'))
							document.getElementsByTagName('img')[k].src= '';
						k++;
					}
			}

		if ((vPHP== 'photos') && (vAct== 'slideshow')) // sobstvenno slideshow
			VkoptSlideshow();
*/

		if ((vPHP== 'board') && (vAct== 'topic') && (vId== '1312272')) // VKOpt FAQ
			document.getElementById('addPost').getElementsByTagName('h4')[0].innerText= 'Ask your question';

		if ((vPHP== 'friends') && (location.href.split('noimages=')[1])) // nuzhno dlya togo, chtoby v messendzhere bystree zagruzhalsya kontakt-list
			{
				var k = 0;
				while (document.getElementsByTagName('div')[k])
				{
					if ((document.getElementsByTagName('div')[k].attributes['class']) &&
					    (document.getElementsByTagName('div')[k].attributes['class'].value== 'image'))
					{
						document.getElementsByTagName('div')[k].innerHTML= document.getElementsByTagName('div')[k].getElementsByTagName('img')[0].src;
					}
					k++;
				}
			}

		if (getCookie('VkoptAudio')!= 'n')
			VkoptAudio();
	}

//--- Area: Vkadre.ru---//

	if ((vHost== 'vkadre') && (location.href.split('video')[1]))
		VkoptVideoVkadre();

})();