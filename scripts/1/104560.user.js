// ==UserScript==
// @name           Game Info Tooltip
// @namespace      http://userscripts.org/users/309384
// @version	0.1
// @description    Display tooltip with game info when hovering jeuxvideo.com links
// @require	http://userscripts.org/scripts/source/49700.user.js
// @require	http://userscripts.org/scripts/source/51832.user.js
// @include        http://*
// ==/UserScript==

/** Init Image **/
var loadingImage = 'data:image/gif;base64,R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQEAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA';
var Stars = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAMAAACMwkUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABgUExURQAAAP7+/fv7/Pn5+vf39/789PPz8+3t7ebm5uDg4Pn12vDqz/XssuParPLnmtbKjbGcMrqnU8O0bcixN9fAP9zNdt/IPODg4OXOQ+jVV+nZc+3ZSfLgVPXssvfnbf///6oVmaEAAAAQdFJOUwAECAsPExciLjlFW5GcvtnZ3S3RAAABKElEQVRYw+3ZzXKEIBAE4BlFEUVl1SysmOz7v2UG1/1JKtccmtq+WH63KaC1lCi/cC7W5GFUG5WFceN1DkbKe8MZGGvvf48HZqxUrXUyb+SqlMI0mcv41xiNaZIfampYSy32tBLYiMq7NgxtRM2BGtz4MR22pSfLsd2wjXRqsFKa4OXdBdGklpsiDdk8igzS5Nzch6o1tL3zzr+mysW+8jCyW8s5GMVtyMJsiFuVgdEqaKGt6lo7DOs5xMs6WNu1su0QjaqPeV6W5RxCjBdJtID2eU1rMrrEoiFhxwxqxL1zSXc++gzRJN1Nl7AWhGxEp32llmUAN+VkvMQjtlXG7RGGttQBzo3tJPo8N4hWTG6SO+5Oc49scm5uXx2Z+xHaiP/4qYhoOeQbGAy9N11bgA4AAAAASUVORK5CYII=';

var gameTooltip = null;
var gameTitle = null;
var gameRating = null;
var gameInfo = null;
var gamePicture = null;
var gameImage = new Image();

initTooltip();
getGameLinks();

function initTooltip() {
	if (document.body != null) {
		gameTooltip = document.body.appendChild(document.createElement('div'));
		gameTooltip.setAttribute('style','position:absolute; visibility:hidden; z-index:100; width:' + GM_config.read().tooltip_size + '; padding:0px; margin:0px; border:0px solid #aaa; background-color:' + GM_config.read().tooltip_color + ';');	
		gameTooltip.id='gametooltip';
		gameTooltip.innerHTML='';
		setOpacity(gameTooltip, GM_config.read().tooltip_opacity);
	}
}

function getGameLinks() {
	links = document.links;
	for(i=0; i < links.length; i++) {
	
		addEvent = false;
		
		if (GM_config.read().jeuxvideo_tooltip) {
			if (links[i].href.indexOf('jeuxvideo.com') != -1) {
				if (links[i].href.indexOf('/jeux/') !=-1 || links[i].href.indexOf('/articles/') !=-1)
					addEvent = true;
			}
		}
				
		if (addEvent) {
			links[i].parentNode.addEventListener('mouseover', linkOver, false);
			links[i].parentNode.addEventListener('mousemove', mouseMove, false);

			if (!GM_config.read().click_to_hide)
				links[i].parentNode.addEventListener('mouseout', linkOut, false);
		}
	}
}

function linkOut() {
	gameTooltip.style.visibility = 'hidden';
	gameTooltip.innerHTML = '';
}

function linkOver(e) {
	if (e.target)
		targ = e.target;
	else if (e.srcElement)
		targ = e.srcElement;
	if (!targ.href && targ.parentNode && targ.parentNode.href) //image/other element inside a link
		targ = targ.parentNode;
	if (targ.href)
		showTooltip(targ);
}

function mouseMove(e) {
	posx=0,posy=0;
	if(!e) e=window.event;
	if(e.pageX || e.pageY) {
		posx=e.pageX;
		posy=e.pageY;
	}
	else if(e.clientX||e.clientY) {
		posx = e.clientX + document.body.scrollLeft+document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop+document.documentElement.scrollTop;
	}
	
	var arrayPageSize = getPageSize();
		
	if (posx > arrayPageSize[0] / 2)
		gameTooltip.style.left=(posx - gameTooltip.offsetWidth - 15)+'px';
	else
		gameTooltip.style.left=(posx + 15)+'px';
	
	if (e.clientY - (gameTooltip.offsetHeight / 4) < 0)
		gameTooltip.style.top = document.body.scrollTop + document.documentElement.scrollTop + 'px';
	else if (e.clientY + 3*(gameTooltip.offsetHeight / 4) > arrayPageSize[3])
		gameTooltip.style.top = (arrayPageSize[3] + document.body.scrollTop + document.documentElement.scrollTop - gameTooltip.offsetHeight - 15)+'px';
	else
		gameTooltip.style.top = (posy - (gameTooltip.offsetHeight / 4))+'px';
}

function showTooltip(el) {
	/* Create the tooltip */
	var tooltipHTML = '<table border=0><tr><td rowspan="3" valign="top">';
	tooltipHTML += '<div id="gamepicture"><img src="' + loadingImage + '"> Loading ...</div>';
	tooltipHTML += '<td align="left">';
	tooltipHTML += '<div id="gametitle"></div>';
	tooltipHTML += '</td></tr><tr><td align="left">';
	tooltipHTML += '<br><div id="gamerating"></div><br>';
	tooltipHTML += '</td></tr><tr><td align="left">';
	tooltipHTML += '<div id="gameinfo"></div>';
	tooltipHTML += '</td></tr></table>';
	
	gameTooltip.innerHTML = tooltipHTML;
	
	gameTitle = document.getElementById('gametitle');
	gameRating = document.getElementById('gamerating');
	gameInfo = document.getElementById('gameinfo');
	gamePicture = document.getElementById('gamepicture');
	
	if(gameTooltip.style.visibility=='hidden') {
		gameTooltip.style.visibility='visible';
	}
	
	if (el.href.indexOf('jeuxvideo.com') != -1) {
		if (el.href.indexOf('/jeux/') !=-1)
			getJeuxVideoInfo(el.href);
		if (el.href.indexOf('/articles/') !=-1)
			jeuxvideoRequest(el.href);
	}
}

function jeuxvideoRequest(url) {
	GM_xmlhttpRequest({
		method: 'get',
		url: url,
		onload: function (result) {
			jvHtml = document.createElement('div');
			jvHtml.innerHTML = result.responseText;
			
			jvUrl = jvHtml.getElementsByClassName('onglet_fiche')[0].getElementsByTagName('a')[0].href;
			getMetacriticInfo(jvUrl);
		}
	});
}

function getJeuxVideoInfo(jvUrl) {
	GM_xmlhttpRequest({
		method: 'get',
		url: jvUrl,
		overrideMimeType: "text/html; charset=ISO-8859-1",
		onload: function (result) {
			jvHtml = document.createElement('div');
			jvHtml.innerHTML = result.responseText;
			
			if (typeof jvHtml.getElementsByClassName('jaquette')[0] != 'undefined' && typeof jvHtml.getElementsByClassName('jaquette')[0].getElementsByTagName('img')[0] != 'undefined')
				jvPicture = jvHtml.getElementsByClassName('jaquette')[0].getElementsByTagName('img')[0].src;
			else
				jvPicture = 'http://image.jeuxvideo.com/pics/pasjaquette.gif';
			
			if (typeof jvHtml.getElementsByClassName('bloc1 fiche_tech')[0] != 'undefined' && typeof jvHtml.getElementsByClassName('bloc1 fiche_tech')[0].getElementsByClassName('bloc_inner')[0] != 'undefined')
				jvInfo = jvHtml.getElementsByClassName('bloc1 fiche_tech')[0].getElementsByClassName('bloc_inner')[0].innerHTML;
			else
				jvInfo = 'N/A';
			
			if (typeof jvHtml.getElementsByClassName('note_redac')[0] != 'undefined')
				jvNoteRedac = jvHtml.getElementsByClassName('note_redac')[0].innerHTML; //.match(/d+\/20/);
			else
				jvNoteRedac = 'Note rédaction : N/A';
			
			if (typeof jvHtml.getElementsByClassName('moy_lecteurs')[0] != 'undefined' && typeof jvHtml.getElementsByClassName('moy_lecteurs')[0].getElementsByTagName('a')[0] != 'undefined')
				jvNoteMoy = jvHtml.getElementsByClassName('moy_lecteurs')[0].getElementsByTagName('a')[0].innerHTML;
			else
				jvNoteMoy = 'Note moyenne des Lecteurs : N/A';
				
			if (typeof jvHtml.getElementsByTagName('h1')[0] != 'undefined' && typeof jvHtml.getElementsByTagName('h1')[0].getElementsByTagName('a')[0] != 'undefined')	
				jvTitre = jvHtml.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].innerHTML;
			else
				jvTitre = 'N/A';
			
			addGamePicture(jvPicture);
			gameTitle.innerHTML = '<b>' + jvTitre + '</b>';
			gameInfo.innerHTML = jvInfo;
			gameRating.innerHTML = '<b>' + jvNoteRedac + '</b><br><b>' + jvNoteMoy + '</b>';
		}
	});
}

function addGamePicture(imgsrc) {
	gamePicture.innerHTML = '<img src="' + loadingImage + '"> Loading ...';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: imgsrc,
		onload: function (responseDetails) {
			
			gameImage.addEventListener('load', function(){
				thumbsize = GM_config.read().picture_size;
				tscale = Math.max(gameImage.width, gameImage.height);
				tscale = (thumbsize/tscale)<1?(thumbsize/tscale):1.0;
				gamePicture.innerHTML = '<img src="'+gameImage.src+'"  style=\'width:'+gameImage.width*tscale+'px;height:'+gameImage.height*tscale+'px;\'>';
			}, false);
				
			gameImage.src = imgsrc;
		}
	});
}

function setOpacity(elem, value) {
	value = (value == 1)?0.99999:value;
 
	elem.style.opacity = value;
	elem.style.filter = 'alpha(opacity=' + value*100 + ')';
	elem.style.MozOpacity = value;
	elem.style.KhtmlOpacity = value;
}

// Based on http://userscripts.org/scripts/show/1868
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}

/*********************/
/****** CONFIG ******/
/*********************/

GM_trans.setTranslations('en',{
  'language_option':'Display language',
  'language_section':'Language',
  'jeuxvideo_tooltip':'Display the jeuxvideo.com tooltip',
  'opacity':'Opacity',
  'size':'Size',
  'color':'Color',
  'picture_size':'Picture size',
});

GM_trans.setTranslations('fr',{
  'language_option':'Langue d\'affichage',
  'language_section':'Langue',
  'jeuxvideo_tooltip':'Afficher le tooltip jeuxvideo.com',
  'opacity':'Transparence',
  'size':'Taille',
  'color':'Couleur',
  'domain':'Domaine',
  'picture_size':'Taille de l\'image',
});

//Setting Language (if language not set yet, use EN)
if (GM_config.read()['language_option'])
	GM_trans.setLang(GM_config.read()['language_option']);
else
	GM_trans.setLang('en');
	
var configStyle = <><![CDATA[
/* Remove the 40% wasted space to the left */
.field_label {padding-left:10px;}
]]></>.toString();

GM_config.init("Game Info Tooltip",
{
	'language_option':
	{
		section : ['General'],
		label: GM_trans.lang('language_option'),
		type:'select',
		options:{'fr':'Français','en':'English'},
		default:'en'
	},
	'tooltip_size': 
	{
		label: GM_trans.lang('size'), 
		type: 'select',
		options:{'40%':'40%','50%':'50%','60%':'60%'},
		default: '50%' 
	},
	'tooltip_color': 
	{
		label: GM_trans.lang('color'), 
		type: 'text',
		default: '#FFFFFF'
	},
	'tooltip_opacity': 
	{
		label: GM_trans.lang('opacity'), 
		type: 'select',
		options:{'0.5':'0.5','0.6':'0.6','0.7':'0.7','0.8':'0.8','0.9':'0.9','1.0':'1.0'},
		default: '0.8'
	},
	'picture_size': 
	{
		label: GM_trans.lang('picture_size'), 
		type: 'select',
		options:{192:'192px',256:'256px',320:'320px'},
		default: 192
	},
	'jeuxvideo_tooltip': 
	{
		section : ['jeuxvideo.com'],
		label: GM_trans.lang('jeuxvideo_tooltip'), 
		type: 'checkbox',
		default: false 
	},
},
configStyle,
  {
	open: function() {},
	save: function() { 
			location.reload(); 
	},
	close: function() {
	}
  }
);

GM_registerMenuCommand("Game Info Tooltip", GM_config.open);