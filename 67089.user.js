// ==UserScript==
// @name           Dolphin Mania
// @description    Dolphin Mania Tab
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @version        11
// @fullname       Dolphin Mania official tab
// @author         Awesomolocity is Gaia name. Prongs Rage is Usersripts.org name.
// @require        http://sizzlemctwizzle.com/updater.php?id=67089
// ==/UserScript==
function getId(id){
	return document.getElementById(id);
}
var gaiaFailSearch=document.getElementById('menu_search');
if (gaiaFailSearch){
	GM_addStyle("#menu_search{\n\display: none ! important;\n");
	}
	else{

	}
if(getId('newmenu')){
	var ql=getId('quickLinks');
	if(ql){ql.setAttribute('style','border-right: 1px solid rgb(156, 150, 156) ! important;')}
	var GS=getId('gm_search');
	if(GS){GS.setAttribute('style','border-right: 1px solid rgb(156, 150, 156) ! important;')}
	var newElement = document.createElement('li');
	newElement.id='dolphin_mania';
	newElement.setAttribute('class','standard');
	newElement.innerHTML=(<><![CDATA[
		<a class="header" href="http://dolphinmania.pandaandpenguin.com/">D.Mania</a><ul><li class-"first"><a href="/forum/t.56237483/">Thread</a></li><li><a href="http://www.gaiaonline.com/guilds/?guild_id=245893">Guild</a><ul><li class="first"><a href="http://www.gaiaonline.com/guilds/?guild_id=245893">Home</a></li><li><a href="http://www.gaiaonline.com/guilds/viewforum.php?f=693715">Forum</a></li><li><a href="http://www.gaiaonline.com/guilds/?gmode=memberlist&guild_id=245893">Members</a></li><li><a href="http://www.gaiaonline.com/guilds/?guild_id=245893&gmode=requestjoin">Join</a></li></ul></li><li><a target="_blank" href="http://pandaandpenguin.com/forum/">P&P Forums</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/">About</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/dolphinmania/index.php">Dolphin Mania</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/meatmania/index.php">Meat Mania</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/monstermania/index.php">Monster Mania</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/momomania/index.php">Momo Mania</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/gweemania/index.php">Gwee Mania</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/mixedmania/index.php">Mixed Mania</a></li><li><a target="_blank" href="http://dolphinmania.pandaandpenguin.com/mermaidmania/index.php">Mermaid Mania</a></li><li><a target="_blank" href="http://bootygrab.pandaandpenguin.com/">Classic Mania</a><ul><li class="first"><a target="_blank" href="http://bootygrab.pandaandpenguin.com/index.php">Dolphins</a></li><li><a target="_blank" href="http://bootygrab.pandaandpenguin.com/meats/index.php">Meats</a></li><li><a target="_blank" href="http://bootygrab.pandaandpenguin.com/monsters/index.php">Monsters</a></li><li><a target="_blank" href="http://bootygrab.pandaandpenguin.com/momos/index.php">Momos</a></li><li><a target="_blank" href="http://bootygrab.pandaandpenguin.com/mixed/index.php">Mixed</a></li><li><a target="_blank" href="http://bootygrab.pandaandpenguin.com/gwees/index.php">Gwees</a></li></ul></li></ul>;
	]]></>);
	getId('newmenu').getElementsByTagName('ul')[0].appendChild(newElement);
		GM_addStyle(<><![CDATA[
	#newmenu #nav li#games_menu{
		border-right:1px solid #9c969c !important;
	}
	#newmenu #nav li#dolphin_mania{
		border-right:black !important;
		border-left:black !important;
		border-bottom:black !important;
	}
	#dolphin_mania ul,#dolphin_mania li{
		width:145px !important;
		background-color: #FFFFFF
	}
	#GM_Search_Form{
		padding:5px !important;
	}
	]]></>);
	if(getId('home_menu').getAttribute('class').indexOf('standard')==-1){
		var gs=getId('dolphin_mania');
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
		gsli.setAttribute('style','width:100px !important');
		gs.childNodes[1].innerHTML='<span class="lt_selector"></span>D.Mania<span class="rt_selector"></span>';
		getId('games_menu').setAttribute('style','border-right:none !important');
	}
}