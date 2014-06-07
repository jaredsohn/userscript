// ==UserScript==
// @name           Booty Bitches Tab
// @description    Adds a tab just for Booty Bitches Lovers
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @version        4
// @fullname       Booty Bitches Official Tab
// @author         Awesomolocity is Gaia name. Prongs Rage is Usersripts.org name.
// @require        http://sizzlemctwizzle.com/updater.php?id=67086
// ==/UserScript==
function getId(id){
	return document.getElementById(id);
}
if(getId('newmenu')){
	var ql=getId('quickLinks');
	if(ql){ql.setAttribute('style','border-right: 1px solid rgb(156, 150, 156) ! important;')}
	var GS=getId('gm_search');
	if(GS){GS.setAttribute('style','border-right: 1px solid rgb(156, 150, 156) ! important;')}
	var newElement = document.createElement('li');
	newElement.id='booty_bitches';
	newElement.setAttribute('class','standard');
	newElement.innerHTML=(<><![CDATA[
		<a class="header" href="www.gaiaonline.com">B.Bitches</a><ul><li class="first"><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=718889">Guild</a></li><li><a href="/forum/t.53570755">Booty Bitches I</a></li><li><a href="/forum/t.53969269/">Booty Bitches II</a></li><li><a href="/forum/t.55236673/">Remembrance Thread</a></li><li><a href="/forum/t.56432733/">Dolphin Land</a></li><li><a href="awesomolocity.webs.com">Website</a></li></li></ul></li></ul>;
	]]></>);
	getId('newmenu').getElementsByTagName('ul')[0].appendChild(newElement);
		GM_addStyle(<><![CDATA[
	#newmenu #nav li#games_menu{
		border-right:1px solid #9c969c !important;
	}
	#newmenu #nav li#booty_bitches{
		border-right:black !important;
		border-left:black !important;
		border-bottom:black !important;
	}
	#booty_bitches ul,#booty_bitches li{
		width:445px !important;
		background-color: #FFFFFF
	}
	#GM_Search_Form{
		padding:5px !important;
	}
	]]></>);
	if(getId('home_menu').getAttribute('class').indexOf('standard')==-1){
		var gs=getId('booty_bitches');
		var gsul=gs.getElementsByTagName('ul')[0];
		var gsli=gs.getElementsByTagName('li')[0];
		var gmsf=getId('GM_Search_Form');
		var li=document.createElement('li');
		li.className='divider';
		getId('nav').appendChild(li);
		if(ql){ql.removeAttribute('style');}
		gs.setAttribute("onmouseover", "this.className='standard panel-open'");
		gs.setAttribute("onmouseout","this.className='standard'");
		gsul.className='main_panel_container';
		//create elements
		var sp=document.createElement('span');
		sp.className='panel_bottom';
		gsul.appendChild(sp);
		//thats over :)
		gsli.className='main_panel';
		gsli.setAttribute('style','width:445px !important');
		gs.childNodes[1].innerHTML='<span class="lt_selector"></span>B.Bitches<span class="rt_selector"></span>';
		getId('games_menu').setAttribute('style','border-right:none !important');
	}
}