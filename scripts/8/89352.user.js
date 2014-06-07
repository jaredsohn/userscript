// ==UserScript==
// @name           Uesugi Clan Toolbar
// @description    Adds a navigation Tab to the Gaia Navigation Bar for the Uesugi Clan
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// ==/UserScript==
//Note: This script Absol's Gaia Online Search Bar v2 Script. 
//...with lots of editing.
function getId(id){
	return document.getElementById(id);
}
function uesugi(place){
	if(place=='undefined'){
		return;
	}
	else{
		GM_openInTab('http://www.gaiaonline.com/'+place);
		return;
	}
}
if(getId('newmenu')){
	var ql=getId('quickLinks');
	if(ql){ql.setAttribute('style','border-right: 1px solid rgb(156, 150, 156) ! important;')}
	var newElement = document.createElement('li');
	newElement.id='uesugi_tab';
	newElement.setAttribute('class','megamenu-standard-menu');
	newElement.innerHTML=(<><![CDATA[
		<a class="megamenu-section-trigger" href="http://userscripts.org/scripts/show/56399">Uesugi&nbsp;Clan</a>
		<ul class="panel-links">
			<li class="first">
				<form id="uesugi_tab_Form" onsubmit="return false">
				<select name="place" id="uesugi_tab_place" onfocus="this.parentNode.style.height='343px';" onblur="this.parentNode.style.height='';">
					<option class="one" value="undefined">Choose a Location</option>
					<option value="undefined"></option>
					<option class="one" value="guilds/id.179709">Home</option>
					<optgroup label="Forums">
						<option class="two" value="guilds/viewforum.php?f=562127">Main Forum</option>
						<option class="two four" value="undefined">Sub-Forums</option>
							<option class="three" value="guilds/viewforum.php?f=602841">Manga/Anime discussion</option>
							<option class="three" value="guilds/viewforum.php?f=602843">ZOMG</option>
							<option class="three" value="guilds/viewforum.php?f=618089">Crew's private toilet</option>
							<option class="three" value="guilds/viewforum.php?f=623471">Contents</option>
							<option class="three" value="guilds/viewforum.php?f=623539">Past announcements/stickies</option>
							<option class="three" value="guilds/viewforum.php?f=752131">Text/Spam</option>
					</optgroup>
					<optgroup label="Members">
						<option class="two" value="guilds/memberlist/id.179709">Members List</option>
					</optgroup>
				</select>
				<input type="submit" value="Go..."/>
				</form>
			</li>
		</ul>
	]]></>);
	getId('newmenu').getElementsByTagName('ul')[0].appendChild(newElement);
	getId('uesugi_tab_Form').addEventListener("submit", function (e) {uesugi(getId('uesugi_tab_place').value)}, false);
	GM_addStyle(<><![CDATA[
		#newmenu #nav li#uesugi_tab{border-right: none !important; width: 100px;}
		#uesugi_tab ul,#uesugi_tab li{width:338px !important;}
		#uesugi_tab_Form{padding:5px !important;}
		#uesugi_tab_place{font-size:13px !important;height:20px;width:105px;padding:0px;}
		#uesugi_tab_place .one {font-weight: bold;}
		#uesugi_tab_place .two {padding-left:16px;}
		#uesugi_tab_place .three {padding-left:32px;}
		#uesugi_tab_place .four {font-weight: italic;}
		#uesugi_tab_Text{margin-top:1px;display:inline;font-size:12px;padding:0px;height:16px;width:100px;position:relative;top:-1px;}
	]]></>);
	if(getId('home_menu').getAttribute('class').indexOf('standard')==-1){
		var gs=getId('uesugi_tab');
		var gsul=gs.getElementsByTagName('ul')[0];
		var gsli=gs.getElementsByTagName('li')[0];
		var gmsf=getId('uesugi_tab_Form');
		if(ql){ql.removeAttribute('style');}
		gs.setAttribute("onmouseover", "this.className='megamenu-standard-menu panel-open'");
		gs.setAttribute("onmouseout","this.className='megamenu-standard-menu'");
		gsul.className='main_panel_container';
		//create elements
		var sp=document.createElement('span');
		sp.className='panel_bottom';
		gsul.appendChild(sp);
		var div=document.createElement('div');
		div.className='main_panel';
		div.innerHTML='<div class="panel-left"><div class="panel-title">The Uesugi Clan</div></div><div class="panel-right"><div class="panel-title"></div></div>';
		gmsf.parentNode.insertBefore(div,gmsf);
		//thats over :)
		gsli.className='main_panel';
		gsli.setAttribute('style','width:453px !important');
		gs.childNodes[1].innerHTML='<span class="lt_selector"></span>Uesugi&nbsp;Clan<span class="rt_selector"></span>';
		getId('games_menu').setAttribute('style','border-right:none !important');
		getId('uesugi_tab_place').setAttribute("onfocus","this.parentNode.style.height='272px';");
	}
	var divider = document.createElement('li');
	divider.className='megamenu-divider';
	var gFail = getId('menu_search');
	if (gFail){
		gFail.parentNode.insertBefore(newElement,gFail);
		gFail.parentNode.insertBefore(divider,gFail);
	}
	
}