// ==UserScript==
// @name           FastGCUserMenu
// @namespace      www.geohacking.de
// @description    This Script adds a extra menu to get faster access to your home navigation by DieWildenSchafe
// @include        http://www.geocaching.com/
// @include        http://www.geocaching.com/*
// ==/UserScript==
//
// (C) Copyright DieWildenSchafe 2009.

var version="2.1";
var log=GM_log;
var debug=false;

if(debug) log('FastGCUserMenuPersonal start version: ' + version);

function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	if(debug) log('addGlobalStyle');
}

function alphabeticalSort(a, b)
{
var A = a.name.toLowerCase();
var B = b.name.toLowerCase();
if (A < B) return -1;
if (A > B) return 1;
return 0;
}

function displayFastGCUserMenu() {
	if(debug) log('displayFastGCUserMenu start');

	var newDiv =document.createElement("div");
	newDiv.className = "AlignRight";
	var newUL = document.createElement("ul");
	newUL.id="FastGCUserMenu";
	newUL.className='SubMenu';
	if(debug) log(GM_getValue('FastGCUserMenuPersonal'));
	FastGCUserMenu.sort(alphabeticalSort);
	for (var i = 0; i < FastGCUserMenu.length; i++)
	{
		var item = FastGCUserMenu[i];
		if(GM_getValue('FastGCUserMenuPersonal').search(item.name)>=0)
		{
			var newLI = document.createElement("li");
			var newA = document.createElement("a");
			newA.title = item.name;
			newA.href = item.href;
			newA.appendChild(document.createTextNode(item.name));
			newLI.appendChild(newA)
			newUL.appendChild(newLI);
		}
	}	
	var hd =document.getElementsByClassName('Menu');
	if(hd) 
	{
		var newLI = document.createElement("li");
		
		var newA = document.createElement("a");
		newA.id = 'ctl00_hlFastGCMenu';
		newA.href = '#';
		newA.appendChild(document.createTextNode('Fast GC Menu ▼'));
		
		newLI.appendChild(newA);
		
		newLI.appendChild(newUL);
		hd[0].appendChild(newLI);
	}
		
	if(debug) log('displayFastGCUserMenu end');
}

function saveFastGCUserMenuConfig() {
	if(debug) log('saveFastGCUserMenuConfig start');
	var personalMenu = document.getElementById('FastGCUserPersonalMenu');
	if(personalMenu) {
		var str="";
		for (var i = 0; i < personalMenu.length; i++)
		{
			var item = personalMenu[i];
			if(item.selected) str += item.value + ' ';
		}
		GM_setValue('FastGCUserMenuPersonal',str);
		if(debug) log(GM_getValue('FastGCUserMenuPersonal'));
	}
	var fontsize = document.getElementById('FastGCUserPersonalFontSize');
	if(fontsize) {
		GM_setValue('FastGCUserPersonalFontSize',fontsize.value);
		if(debug) log(GM_getValue('FastGCUserPersonalFontSize'));
	}
	var fontweight = document.getElementById('FastGCUserPersonalFontWeight');
	if(fontweight) {
		GM_setValue('FastGCUserPersonalFontWeight',fontweight.value);
		if(debug) log(GM_getValue('FastGCUserPersonalFontWeight'));
	}

	var lat = document.getElementById('FastGCUserPersonalLat');
	if(lat) {
		GM_setValue('FastGCUserPersonalLat',lat.value);
		if(debug) log(GM_getValue('FastGCUserPersonalLat'));
	}

	var lng = document.getElementById('FastGCUserPersonalLng');
	if(lng) {
		GM_setValue('FastGCUserPersonalLng',lng.value);
		if(debug) log(GM_getValue('FastGCUserPersonalLng'));
	}

	//displayFastGCUserMenu();
	window.location.reload();
	if(debug) log('saveFastGCUserMenuConfig end');
}
 		
function showFastGCUserMenuConfig() {
	if(debug) log('showFastGCUserMenuConfig start');
	if(document.getElementById("FastGCUserMenuConfig")) return;
	if(document.URL.search("www\.geocaching\.com\/my\/")>=0)
	{
		var sidebar=document.getElementById("ctl00_ContentBody_WidgetMiniProfile1_LoggedInPanel");
		if(!sidebar) return false;
		var header=document.createElement("h3");
		header.setAttribute("class","widget-header");
		header.setAttribute("id","showFastGCUserMenuConfigheader");
    	header.addEventListener('click',function(){ document.getElementById("FastGCUserMenuConfig").style.display= ( document.getElementById("FastGCUserMenuConfig").style.display=='none')?"block":"none"; }, false);
		var toggleButton= document.createElement('img');
    	toggleButton.src = toggleConfigImageString;
    	toggleButton.class = 'toggleButton';
	    toggleButton.style.cursor = 'pointer';
//    	toggleButton.addEventListener('click',function(){ document.getElementById("FastGCUserMenuConfig").style.display= ( document.getElementById("FastGCUserMenuConfig").style.display=='none')?"block":"none"; }, false);
		header.appendChild(toggleButton);
		header.appendChild(document.createTextNode(" FastGCUserMenu Configuration"));
	
		var div=document.createElement("div");
		div.setAttribute("class","widget-content");
		div.setAttribute("style","display:none");
		div.id="FastGCUserMenuConfig";
		var p=document.createElement("p");
		p.appendChild(document.createTextNode("Select Menu Items:"));
		div.appendChild(p);
		var personalMenu=document.createElement("select");
		//personalMenu.setAttribute("type","password");
		personalMenu.setAttribute("style","margin:1px 0px 1px 3px");
		personalMenu.id="FastGCUserPersonalMenu";
		personalMenu.multiple = true;
		personalMenu.size = FastGCUserMenu.length;		
		for (var i = 0; i < FastGCUserMenu.length; i++)
		{
			var item = FastGCUserMenu[i];
			var objOption = document.createElement("option");
			objOption.text=item.name;
			objOption.value=item.name;
			objOption.selected= (GM_getValue('FastGCUserMenuPersonal').search(item.name)>=0) ? true:false;
			personalMenu.options.add(objOption);
		}
		div.appendChild(personalMenu);
		
		var p=document.createElement("p");
		p.appendChild(document.createTextNode("Font Size:"));
		var fontsize=document.createElement("input");
		fontsize.type='text';
		fontsize.id='FastGCUserPersonalFontSize';
		fontsize.size=2;
		fontsize.value=GM_getValue('FastGCUserPersonalFontSize');
		p.appendChild(fontsize);
		div.appendChild(p);

		var p=document.createElement("p");
		p.appendChild(document.createTextNode("Font Weight:"));
		var fontweight=document.createElement("select");
		fontweight.id='FastGCUserPersonalFontWeight';
		var fw= new Array();
		fw[0]='bold';
		fw[1]='normal';
		for(var i=0;i<fw.length;i++){
			var objOption = document.createElement("option");
			objOption.text=fw[i];
			objOption.value=fw[i];
			objOption.selected= (GM_getValue('FastGCUserPersonalFontWeight') && GM_getValue('FastGCUserPersonalFontWeight').search(fw[i])>=0) ? true:false;
			fontweight.options.add(objOption);
			
		}
		fontweight.value=GM_getValue('FastGCUserPersonalFontWeight');
		p.appendChild(fontweight);
		div.appendChild(p);

		var p=document.createElement("p");
		p.appendChild(document.createTextNode("Lat:"));
		var lat=document.createElement("input");
		lat.type='text';
		lat.id='FastGCUserPersonalLat';
		lat.value=GM_getValue('FastGCUserPersonalLat');
		p.appendChild(lat);
		div.appendChild(p);

		var p=document.createElement("p");
		p.appendChild(document.createTextNode("Lng:"));
		var lng=document.createElement("input");
		lng.type='text';
		lng.id='FastGCUserPersonalLng';
		lng.value=GM_getValue('FastGCUserPersonalLng');
		p.appendChild(lng);
		div.appendChild(p);


		var saveMenu=document.createElement("input");
		saveMenu.type='button';
		saveMenu.value='Save and Reload';
		saveMenu.addEventListener("click",saveFastGCUserMenuConfig,true);
		div.appendChild(saveMenu);
		
		sidebar.appendChild(header);
		sidebar.appendChild(div);

	}
	if(debug) log('showFastGCUserMenuConfig end');
}

function setDefaultFastGCUserMenuPersonal(){
	if(debug) log('setDefaultFastGCUserMenuPersonal start');

	// http://www.geocaching.com/map/default.aspx?lat=49.412478&lng=8.686856
	var flatlng = GM_getValue('FastGCUserPersonalLat');
	if(!flatlng)
	{
		var atags = document.getElementsByTagName("a");
		for(var i = 0;i<atags.length;i++)
		{
			var Ausdruck = /http\:\/\/www.geocaching.com\/map\/default.aspx\?lat\=(\d+)\.(\d+)\&lng\=(\d+)\.(\d+)/;
			var Ergebnis = Ausdruck.exec(atags[i]);
			if(RegExp.$1)
			{
				GM_setValue('FastGCUserPersonalLat',+RegExp.$1+'.'+RegExp.$2);
				GM_setValue('FastGCUserPersonalLng',+RegExp.$3+'.'+RegExp.$4);
			}
		}
	}
	FastGCUserMenu.push({'name':'Map','href':'/map/default.aspx?lat='+GM_getValue('FastGCUserPersonalLat')+'&lng='+GM_getValue('FastGCUserPersonalLng')});
	FastGCUserMenu.push({'name':'Map beta','href':'/map/beta/default.aspx?lat='+GM_getValue('FastGCUserPersonalLat')+'&lng='+GM_getValue('FastGCUserPersonalLng')});

	var str = GM_getValue('FastGCUserMenuPersonal');
	if(!str)
	{
		str="";
		for (var i = 0; i < FastGCUserMenu.length; i++)
		{
			var item = FastGCUserMenu[i];
			str += item.name + ' ';
		}
		GM_setValue('FastGCUserMenuPersonal',str);
	}
	var fsize = GM_getValue('FastGCUserPersonalFontSize');
	if(!fsize)
	{
		GM_setValue('FastGCUserPersonalFontSize',9);
	}
	if(document.URL.search("www\.geocaching\.com\/my\/")>=0) {
		var details = new Object();
		details.method = 'GET';
		details.url = 'http://www.geohacking.de/downloads/fastgcusermenu_updates.xml';
		details.onload = function(response) {parseUpdateXMLResponse(response.responseText)};
		details.onerror = function(response) { alert('Cant check for updates - please visit http://userscripts.org/scripts/show/54817 to check manually, thanks  diewildenschafe@geohacking.de ');};
		GM_xmlhttpRequest(details);
	}
	
	if(debug) log('setDefaultFastGCUserMenuPersonal end');
	
}

/* Thanks to Martin Georgi from GCBBCode for the parseUpdateXMLResponse snippet */
function parseUpdateXMLResponse(xmlString)
{
	if(debug) log('parseUpdateXMLResponse start');
	var updateNode;
	var xmlDoc = (new DOMParser()).parseFromString(xmlString, "application/xml");
	var string = '';
	var scriptElements = xmlDoc.getElementsByTagName('script');
	for(var i = 0;i< scriptElements.length;i++){
		if ( scriptElements[i].getAttribute ('id') == 'fastgcusermenu'){
			var versions = scriptElements[i].getElementsByTagName('version');
			var currentVersion = 0; 
			var currentVersionIndex; 
			for(var j = 0;j< versions.length;j++){
				if(versions[j].getAttribute('number') > currentVersion)
				{
					currentVersion = versions[j].getAttribute('number');
					currentVersionIndex = j;
				}
			}
			if (currentVersion > version) updateNode = versions[currentVersionIndex];
		}		
	}
	if(updateNode){
		var confirmString = 'There is a new version of FastGCUserMenu.\n\t'+version+' -> '+updateNode.getAttribute('number')+'\nChanges:\n';		
		var changes = updateNode.getElementsByTagName('change');
		for(var j = 0;j< changes.length;j++){
				confirmString += '\t+ '+changes[j].textContent+'\n';
		}
		confirmString += '\nDo you want to update?';
		if (confirm(confirmString)) {
			GM_openInTab('http://userscripts.org/scripts/show/54817');
		}
	}
	if(debug) log('parseUpdateXMLResponse end');
}

var FastGCUserMenu =
[
	{'name':'Account Details','href':'/account/default.aspx'},
	{'name':'My Benchmarks','href':'/my/benchmarks.aspx'},
	{'name':'Bookmarks','href':'/bookmarks/'},
	{'name':'Challenges','href':'/challenges/default.aspx'},
	{'name':'Favorites','href':'/my/favorites.aspx'},
	{'name':'Fieldnotes','href':'/my/fieldnotes.aspx'},
	{'name':'Fieldnotes Upload','href':'/my/uploadfieldnotes.aspx'},
	{'name':'Friends','href':'/my/myfriends.aspx'},
	{'name':'Caches (hide / seek)','href':'/seek/default.aspx'},
	{'name':'My own Caches','href':'/my/owned.aspx'},
	{'name':'My Challenges','href':'/my/challenges.aspx'},
	{'name':'Your Profile','href':'/my/'},
	{'name':'Statistics','href':'/my/statistics.aspx'},
	{'name':'Souvenirs','href':'/my/souvenirs.aspx'},
	{'name':'Trackables','href':'/my/travelbugs.aspx'},
	{'name':'Trackables (search for)','href':'/track/default.aspx'},
	{'name':'Public Profile','href':'/profile/'},
	{'name':'PocketQ','href':'/pocket/'},
	{'name':'Watchlist','href':'/my/watchlist.aspx'},
];


var toggleConfigImageString = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ6SURBVDjLpZNZSNRRGMV//2XGsjFrMg2z0so2K21xIFpepYUiAsGIICLffI8eWiBBeg3qQV+KwBYKLB8qpHUmrahcKLc0QsxldNSxdPz/79LD1ChBUXTh8sG93POdc75zDa01/7NsgGvPR09rzQmpVZZSCqlAKIWUCqk0QqoZWyKFRir1uvxIbsAGUFqXHQqkpP1L57M3Pm5MMJBKpQHUdF9BKIGQAlcJXOlOVykSdye3leO6MmkGQNyHw+uO/1X3bzGBK+S0B1IqAKqDg3986HeCZPffwvJtoNT7lOZLvUdtAPEDAKBkRzo3QwMUb89InN1uGGD3spdE214xe8MRUnM2MfppNW0Pqy7YAK5UKK2xLbhdP4hlmdxpGMQwwQT8ziNiI534c7cT6WrFazikzF2Eb8HS1IQEDdiWwcHAQmpehTkQSAcgNvSMiYFW5uUUMdV3HW+ywefGNqITJsbUUL75k4FWYJtQ+yaMZcXrk1ANk/33mbdiD7EvlRieETy+FJLkMFcjRRSW3emIAwiF1hqPBfu2LGSWbbA1uZ41SfWkrtxPrPcypsfFiWYzFGzGKTjFV28WEJeIUHETLdOgrmkI1VdHpCdEet5enP4qLK9mKrqMgedv6cyrAP+qxOTiUxAi7oEJi8frELoFoTLpa7nI/HQvscgSRt+0kV1SSW7qYtp7xrBMphm4Mi5h/VIfTcEq1u0oJaknSEdNiMYHET7UvcMpPEN31Ed7zxgASmk1I0g6dK66s8CRak5mVxjnfS05+TsZCw/T9baTx1nnGb47DrQksjE6HrsHYPz6nYt3+Sc3L8+wA2tz0J6pF5OD4WP7Kpq7f5fO79DfSxjdtCtDAAAAAElFTkSuQmCC";


//window.addEventListener('load', function(event) {
	var $ = unsafeWindow.jQuery;
	if($().jquery){
		setDefaultFastGCUserMenuPersonal();
		addGlobalStyle('ul#FastGCUserMenu {padding:0 0 10px;} ul#FastGCUserMenu li {min-width:150px;}ul#FastGCUserMenu li a {font-size:'+ GM_getValue('FastGCUserPersonalFontSize') + 'px; font-weight:'+ GM_getValue('FastGCUserPersonalFontWeight') + '; padding:0 1em;} #FastGCUserMenuConfig {padding:10px;} #showFastGCUserMenuConfigheader{border-bottom:1px solid white;cursor:pointer;}');
		showFastGCUserMenuConfig();
		displayFastGCUserMenu();
	} else {
		alert('Fast GC Menu can not load, sorry !');
	}
 

//}, 'false');
