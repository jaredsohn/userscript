// ==UserScript==
// @name           dgg2
// @namespace      digg.com
// @description    Blacklist filter for digg
// @include        http://digg.com/*
// @exclude        http://digg.com/users/*
// @exclude        http://digg.com/podcasts*
// @author         listrophy
// ==/UserScript==

// Edited by Jason Kleinberg (http://ustice.blogspot.com) for the following reasons
// Bug fix [bf00001]: Script was only running on the first page.
// Bug fix [bf00002]: Script now works on upcoming page.
// Added functionality [af00001]: Allow the user to filter stories that start with a number.  This allow them to remove all of the silly top 10 lists that appear on digg for link-bait.
// Added functionality [af00002]: Added RegEx support through the 'regex:' tag.
//
// Note that tags were added to the comments for easy viewing of changes
// End of comments by Jason Kleinberg

// Edit [af00002]
//var DEFAULT_BLACKLIST = 'iphone\nsite:veoh.com\nsite:doubleviking.com';

var DEFAULT_BLACKLIST = 'site:theonion.com\nregex:[0-9]+ [bB]est\nregex:[tT]op [0-9]+\nregex:[0-9]+ [wW]orst\nregex:[0-9]+ [tT]op';
// End [af00002]

/*
var LOCS = new Array(
	"technology",
		"apple", "design", "gadgets", "hardware", "tech_news", "linux_unix",
		"microsoft", "mods", "programming", "security", "software",
	"world_business",
		"business_finance", "world_news", "politics", "political_opinion",
		"2008_us_elections",
	"science",
		"environment", "general_sciences", "space",
	"gaming",
		"gaming_news", "pc_games", "playable_web_games", "nintendo",
		"playstation", "xbox",
	"lifestyle",
		"arts_culture", "autos", "educational", "food_drink", "health",
		"travel_places",
	"entertainment",
		"celebrity", "movies", "music", "television", "comics_animation",
	"sports",
		"baseball", "basketball", "extreme_sports", "football", "golf",
		"hockey", "motorsport", "soccer", "tennis", "other_sports",
	"offbeat",
		"comedy", "odd_stuff", "people", "pets_animals");
*/
var newStyles = '';



//Where are we? Determine the functionality
function determineFunctionality(){
	var p = document.location.pathname;
	
	
	if(p == '/') return mainFilter;
	
	if(p.substr(0,17) == '/settings/viewing')
		return viewingPreferences;
	if(p.substr(0,9) == '/settings')
		return otherPreferences;
	var i = p.substr(1).indexOf('/');
	
// Edited [bf00001]
//  if(i == p.length-2 || i < 0) return mainFilter;
// End [bf00001]
// Edited [bf00002]
//if(i == p.length-2 || i < 0 || p.substr(i+2,4)=="page") return mainFilter;
// End [bf00002]
if(i == p.length-2 || i < 0 || p.substr(i+2,4)=="page" || p.substr(i+2,8) == "upcoming") return mainFilter;
	
	return function(){};
}


// Edit [af00002]
// function filterOnKeywords(node, keywords, sites){
function filterOnKeywords(node, keywords, sites, regexes){
// End [af00002]
	var i;
	var xpath  = "div[@class='news-body']/h3/a";
	var title =
		document.evaluate ( xpath, node, null,
		 XPathResult.FIRST_ORDERED_NODE_TYPE,
		null ).singleNodeValue.textContent;
	xpath = "div[@class='news-body']/p[not(@class='news-submitted')]";
	var text_elem = document.evaluate ( xpath, node, null,
		 XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var text = text_elem.singleNodeValue == null ? "" : text_elem.singleNodeValue.textContent;
	var found = new Array();
	
	xpath = "div[@class='news-body']/p/em | div[@class='news-body']/div[@class='v-details']/em";
	var source = document.evaluate(xpath, node, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;
	 GM_log("source: " + source);
	for( i=0; i<sites.length; i++ ){
		if(source.textContent.toLowerCase().indexOf(sites[i].toLowerCase()) != -1){
			GM_log("found a site: " + sites[i]);
			found.push(sites[i]);
			break;
		}
	}

// Added [af00002]
// Check for regular expressions and if a match is found, add it to the list.
	if(found.length == 0){
		for (regexIndex = 0; regexIndex < regexes.length; regexIndex++) {
			regEx = new RegExp(regexes[regexIndex]);
		
			if(title.match(regEx))
				found.push(regexes[regexIndex]);	
		}
	}
// End [af00002]

	
	

	if(found.length == 0){

		for(i = 0;i<keywords.length;i++){
			if(title.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1 ||
					text.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1){
			
				found.push(keywords[i]);
			}
		}
	}

// Added [af00001]
//
// If the user enabled the option, remove any story that starts with a number.
	if (GM_getValue("removeNumbers","checked")== "checked" & !isNaN(title.substr(0,1))) 
		found.push(title);
// End [af00001]


	if(found.length > 0){
		var empty = document.createElement("div");
		empty.className = "diggfiltered";
		empty.title = title;
		empty.textContent = "blocked: " + found.join(",");
		empty.id = "empty-" + i;
		empty.style.cursor = "pointer";
		
		node.parentNode.insertBefore(empty,node);
		node.className += " dggHidden news-buried";
		
//		return title;
		
		
		xpath = "div[@class='news-body']/div[@class='news-details']/a[@class='tool comments']";
		var link = document.evaluate(xpath, node, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		xpath = "div[@class='news-body']/h3/a";
		var text = document.evaluate(xpath, node, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

//		console.log(link);
		
		l = document.createElement('a');
		l.href = link.href;
		l.innerHTML = text.innerHTML;
		l.style.backgroundColor = "#0000FF !important";
		l.style.color = "#0000FF !important";
		l.style.border = "0 !important";
		l.style.margin = "0 !important";
//		console.log(link.innerHTML + ": " + link.href);
		
		return l;

	}
	return false;
}

function dggOff(){
	addStyle("#dggAnnounce{position:absolute;left:-70pt;border-left:0px;}");
	
	var elem = document.getElementById("section-profile");
	var new_elem = dggm({elem:"a",href:"/settings/viewing",id:"dggAnnounce",
		title:"dgg is off"});
	new_elem.innerHTML = "dgg is off";
	elem.parentNode.insertBefore(new_elem,elem);
	
}

function mainFilter(){
	if(GM_getValue("dggEnabled") != "checked"){
		dggOff();
		return;
	}
	addStyle("\
	.diggfiltered { display:none;}\
	.dggHidden {display: none;}");
//	#dggAnnounce{position:absolute;left:-130pt;border-left:0px; }");



// !!! EXPERIMENTAL START !!!	
//	addStyle(" #dggAnnounce{color: #D2DCF3 !important;  font-weight: bold;} #dgg_menu{list-style: none !important; float: left; margin-top: 9px !important;} #dgg_menu li{position: relative; clear: left;} #dgg_menu ul{position: absolute; z-index: 500;} #dgg_menu ul{display: none; border-style: solid; border-width: 2px; border-color: #000000; -moz-border-radius: .5em; padding: .25em;} #dgg_menu li:hover ul {display: block; background-color: #FFFFFF; width: 500px; border-style: solid; border-width: 1px;}   #dgg_menu li ul li a,#dgg_menu li ul li{margin:0 !important; padding:1px; !important; border: none !important;} .dggMenuItem{background: transparent url(/img/link-line.gif) repeat-x scroll 0pt 95% !important; text-decoration: none !important; cursor:pointer; color: #105CB6 !important; size:1.2em; padding: 3px 0px !important;} .dggMenuItem:hover, .dggMenuItem:focus {color: #000033 !important;} ");

	addStyle("\
		#dgg_list{\
			position:absolute;\
			left:-130pt;\
			border-left:0px;\
			list-style: none !important;\
			float: left;\
			margin-top: 9px !important;\
		}\
		#dgg_list li{\
			display: relative;\
		}\
		#dgg_list:hover #dgg_menu{\
			display: block;\
			-moz-border-radius-bottomleft: 6px;\
			-moz-border-radius-bottomright: 6px;\
		}\
		#dgg_list #dgg_menu {\
			display: none;\
			position: absolute;\
		}\
		#dgg_title{\
			color: #98c3eb;\
			font-size: 1.4em !important;\
			margin: 5px 10px;\
		}\
		#dgg_menu{\
			color: #D2DCF3 !important;\
			background: #1b5790 url(http://ustice.googlepages.com/dgg_bg.jpg) repeat-x scroll bottom left;\
			min-width: 400px;\
			z-index: 1000;\
			top: 36px;\
			display: block;\
			min-height: 195px !important;\
		}\
		#dgg_top_link{\
			color: #D2DCF3 !important;\
			font-weight: bold;\
			height: 40px;\
		}\
		#dgg_logo_a{\
			/*display: block;*/\
			positon: relative !important;\
			bottom: 0px !important;\
			right: 0px !important;\
			width: 54px !important;\
			height: 41px !important;\
		}\
		#dgg_logo{\
			border-style: none;\
			positon: relative !important;\
			bottom: 3px !important;\
			right: 3px !important;\
			top: auto !important;\
			left: auto !important;\
		}\
		.dggMenuItem{\
			background: transparent   !important;\
			text-decoration: none !important;\
			cursor:pointer;\
			color: #D2DCF3 !important;\
			font-size: .9em !important;\
			padding: 3px 3px !important;\
			margin: 0 !important;\
			font-weight: normal !important;\
			border-style: none !important;\
			clear: both !important;\
			display: list-item !important;\
			width: 100% !importtant;\
		}\
		.dggMenuItem:hover,\
		.dggMenuItem:focus{\
			color: #FFFFFF !important;\
		}\
		#dgg_settings{\
			dispaly: block;\
			position: absolute;\
			clear: both;\
			bottom: 0px;\
			left: 0px;\
			top: auto;\
			right: auto;\
			width: 100%;\
		}\
		#dgg_settings a{\
			text-decoration: none !important;\
			border: none;\
			padding: 10px 10px !important;\
			margin: 0 !important;\
			font-size: .9em !important;\
			font-weight: normal !important;\
		}\
		#dgg_links{\
			/*list-style-image: none !important;*/\
			list-style-type: none !important;\
			clear: both !important;\
			display: list-item !important;\
			padding-bottom: 60px;\
		}\
		#dgg_links li{\
			margin: 0px 10px;\
			padding: 0px;\
			width: 100% !important;\
		}\
		#dgg_links li a{\
			clear: both !important;\
			word-spacing: 0 !important;\
		}\
");


// !!! EXPERIMENTAL END !!!
	
	var xpath  = '//div[@class="main"]/div[contains(@class,"news-summary")]';
	var result = document.evaluate( xpath, document.getElementById("wrapper"),
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var blacklist = GM_getValue('dggList', DEFAULT_BLACKLIST).split("\n");
	var sites = [];
// Added [af00002]
	var regexes = [];
// End [af00002]
	for ( var j = 0; j < blacklist.length; j++ ){
		if ( blacklist[j] == "" || blacklist[j] == " "){
			blacklist.splice(j,1);
			j--;
			continue;
		}
		if ( blacklist[j].substring(0,5) == 'site:'){
			sites.push(blacklist[j].substring(5));
			blacklist.splice(j,1);
			j--;
			continue;
		}
// Added [af00002]
		if (blacklist[j].substring(0,6) == 'regex:'){
			regexes.push(blacklist[j].substring(6));
			blacklist.splice(j,1);
			j--;
		}
// End [af00002]
	}
	
	var c = [];
	var cc;
	for ( var i = 0; i < result.snapshotLength; i++ ){
// Edit [af00002]
//		cc = filterOnKeywords(result.snapshotItem(i), blacklist, sites);
		cc = filterOnKeywords(result.snapshotItem(i), blacklist, sites, regexes);
// End [af00002]
		if(cc) c.push(cc);
	}
	
//	var elem = document.getElementById("section-profile");
//	var new_elem = dggm({elem:"a",href:"/settings/viewing",id:"dggAnnounce",
//		title:c.join("; ")});
//	new_elem.innerHTML = c.length + " stor" + 
//		(c.length == 1 ? "y" : "ies") + " filtered by dgg";
//	elem.parentNode.insertBefore(new_elem,elem);
	
//  !!! EXPERIMENTAL START !!!	
//  *** ORIGINAL CODE START *** 
/*
	var elem = document.getElementById("section-profile");
	var new_elem = dggm({elem:"a",href:"/settings/viewing",id:"dggAnnounce",
		title:c.join("; ")});
	new_elem.innerHTML = c.length + " stor" + 
		(c.length == 1 ? "y" : "ies") + " filtered by dgg";
	elem.parentNode.insertBefore(new_elem,elem);
*/
//  *** ORIGINAL CODE END ***
/*
	var elem = document.getElementById("section-profile");
//	var new_elem = dggm({elem:"a",href:"/settings/viewing",id:"dggAnnounce", title:c.join("; ")});
	var new_elem = dggm({elem:"a",href:"/settings/viewing"});
	new_elem.className = " dggMenuItem";
	
	posts_found = c.length + " stor" + (c.length == 1 ? "y" : "ies") + " filtered by dgg";
	
	new_elem.innerHTML = "dgg Options";
	new_elem.className += " dggMenuTitle"; 


	var dgg_menu = document.createElement('ul');
	dgg_menu.id = 'dgg_menu';

	elem.parentNode.insertBefore(dgg_menu,elem);


	var dgg_menu_items = document.createElement('li');
	dgg_menu.appendChild(dgg_menu_items);
//	dgg_menu_items.appendChild(new_elem);
	dgg_menu_items.innerHTML = "<span id='dggAnnounce'>" + posts_found + "</span>";

	var dgg_submenu = document.createElement('ul');
	dgg_menu_items.appendChild(dgg_submenu);
	
	var item = document.createElement('li');
	item.appendChild(new_elem);
	dgg_submenu.appendChild(item);
	
	for (var ce = 0; ce < c.length; ce++)
	{
//		console.log(c[ce]);
		c[ce].className += " dggMenuItem"
		var item = document.createElement('li');
		item.appendChild(c[ce]);
		
		dgg_submenu.appendChild(item);
	}
*/	
	
	var dgg_list = dggm({elem:'ul',id:'dgg_list'});

	var elem = document.getElementById("section-profile");
	elem.parentNode.insertBefore(dgg_list,elem);


	var dgg_top_link = dggm({elem:'li',id:'dgg_top_link'});
	dgg_top_link.innerHTML = c.length + " stor" + (c.length == 1 ? "y" : "ies") + " filtered by dgg";
	dgg_list.appendChild(dgg_top_link);

	var dgg_menu = dggm({elem:'div',id:'dgg_menu'});
	dgg_list.appendChild(dggm({elem:'li'}).appendChild(dgg_menu));

	var dgg_title = dggm({elem:'div',id:'dgg_title'});
	dgg_title.innerHTML = "Filtered Stories";
	dgg_menu.appendChild(dgg_title);

	var dgg_links = dggm({elem:'ul',id:'dgg_links'});
	dgg_menu.appendChild(dgg_links);
	
	var dgg_settings = dggm({elem:'div',id:'dgg_settings'});
		dgg_settings.innerHTML = '<a href="/settings/viewing">dgg Settings</a>';
	dgg_menu.appendChild(dgg_settings);
	
	var dgg_logo_link = dggm({elem:'a',id:'dgg_logo_link', href: 'http://userscripts.org/scripts/show/25791'});
	dgg_menu.appendChild(dgg_logo_link);
	
	var dgg_logo = dggm({elem:'img', id:'dgg_logo', src:'http://ustice.googlepages.com/dgg_logo.png'});
	dgg_logo_link.appendChild(dgg_logo);

	for (var ce = 0; ce < c.length; ce++)
	{
		c[ce].className += " dggMenuItem"
		var item = dggm({elem:'li'});
		item.appendChild(c[ce]);
		
		dgg_links.appendChild(item);
	}

	
	
	
	
/*

<ul id="dgg_list">
	<li> __ stories filtered by dgg </li>	
	<li>
		<div id="dgg_menu">
			<div id="dgg_title">Filtered Stories<div>	
			<ul id="dgg_links">
				<li><a ...> ... </a></li>
				...
			</ul>
			<div id="dgg_settings">dgg Settings</div>
			<img id="dgg_logo" src="http://ustice.googlepages.com/dgg_logo.png"/>
		</div>
	</li>
</ul>

<style>
#dgg_list #dgg_menu {display: none;}
#dgg_list li:hover #dgg_menu{display: block;}
#dgg_title{
	color: #98c3eb;
	size: 1.3em;
}
#dgg_menu{
	background: #1b5790 url(http://ustice.googlepages.com/dgg_logo.png) repeat-x scroll bottom left;
}

</style>

*/


//  !!! EXPERIMENTAL END !!!	
	
	
}

function viewingPreferences(){
	var submit_elem, elem, wrapper, s, result, div;
	addStyle(".dggOptionsCurrent {display:inline;float:none !important;font-weight:bold !important;}");
	addStyle("#dgglistlabel {margin-top:10px !important;}");
	
	wrapper = document.getElementById('wrapper');

	s = '//form[@class="profile-form"]/div[@class="form-submit"]';
	result = document.evaluate(s, wrapper, 
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	submit_elem = result.singleNodeValue;
	
	// Options sub-menu on right side of screen
	s = '//li[@class="side-view"]/a';
	result = document.evaluate(s, wrapper, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	elem = result.singleNodeValue;
	elem.innerHTML += "<span class='dggOptionsCurrent'>&nbsp;&nbsp;(dgg keyword filter)</span>";
	
	//
	//Adding the preference pane
	//
	div = document.createElement("div");
	//dggEnabled UI
	var input_elem = dggm({elem:"input",type:"checkbox", name:"dggenabled",
		id:"dggenabled"});
	if(GM_getValue("dggEnabled","checked") == "checked")
		input_elem.checked = "checked";
	var label_elem = dggm({elem:"label",for:"dggenabled"});
	label_elem.className = "form-checkbox inline";
	label_elem.innerHTML = " Enable dgg Keyword Filter";
	div.appendChild(input_elem);
	div.appendChild(label_elem);
	
	//dggEnabled functionality
	embedFunction(saveDgg);
	s = '//input[@class="button1"]';
	result = document.evaluate(s, submit_elem, 
		null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	result.singleNodeValue.addEventListener("click", saveDgg, true);
	
	//list
	var text_elem = dggm({elem:"textarea",name:"dgglist",id:"dgglist",rows:15,
		cols:30});
	text_elem.value = GM_getValue("dggList", "iphone\nsite:doubleviking.com\nsite:veoh.com");
	
	//label for list
	label_elem = dggm({elem:"label",for:"dgglist",id:"dgglistlabel"});
	label_elem.innerHTML = "dgg Keyword Filter List (case-insensitive) <a href='http://dgg-script.blogspot.com'>dgg&nbsp;website</a>";

	div.appendChild(document.createElement("br"));
	div.appendChild(label_elem);
	div.appendChild(document.createElement("br"));
	div.appendChild(text_elem);	
	div.appendChild(document.createElement("br"));
	
	
//Added [af00001]	
	
	var input_elem = dggm({elem:"input",type:"checkbox", name:"removeNumbers",
		id:"removeNumbers"});
	if(GM_getValue("removeNumbers","checked") == "checked")
		input_elem.checked = "checked";
	var label_elem = dggm({elem:"label",for:"removeNumbers"});
	label_elem.className = "form-checkbox inline";
	label_elem.innerHTML = " Remove stories that start with a number (Mostly top 10)";
	div.appendChild(input_elem);
	div.appendChild(label_elem);	
//End [af00001]	
	
	
	
	

	submit_elem.parentNode.insertBefore(div,submit_elem);

}



function otherPreferences(){
	var style_to_add = ".dggOptionsNotCurrent {display:inline;float:none !important;color:#CC0000 !important;font-weight:bold !important;}";
	
//  !!! EXPERIMENTAL START !!!
/*
	style_to_add .= "" .
		"#dgg_menu{" . "\n" . 
		"	list-style: none;" . "\n" . 
		"	margin: 0;" . "\n" . 
		"	padding:0;" . "\n" . 
		"	float: left;" . "\n" . 
		"	width: 12em;" . "\n" . 
		"}" . "\n" . 
		"#dgg_menu li{" . "\n" . 
		"	position: relative;" . "\n" . 
		"}" . "\n" . 
		"#dgg_menu ul{" . "\n" . 
		"	position: absolute;" . "\n" . 
		"	z-index: 500;" . "\n" . 
		"}" . "\n" . 
		"ul#dgg_menu ul{" . "\n" . 
		"	display:none;" . "\n" . 
		"}" . "\n" . 
		"ul#dgg_menu:hover li{" . "\n" . 
		"	display: block;" . "\n" . 
		"}" . "\n" .
	"";
	// #dgg_menu{list-style: none; margin: 0; padding:0; float: left; width: 12em;} #dgg_menu li{position: relative;} ul#dgg_menu li ul li {display:none ;}  #dgg_menu ul{position: absolute; z-index: 500;} ul#dgg_menu ul{ display:none;} ul#dgg_menu:hover li{display: block;} #dggAnnounce{color: #FFFFFF;}
	
*/	

	style_to_add = ".dggOptionsNotCurrent {display:inline;float:none !important;color:#CC0000 !important;font-weight:bold !important;}";
	
	addStyle(style_to_add);


//  !!! EXPERIMENTAL END !!!	
	
	
	
	
	var wrapper = document.getElementById('wrapper');
	var s = '//li[@class="side-view"]/a';
	var result = document.evaluate(s, wrapper,	null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var a_elem = result.singleNodeValue;
	a_elem.innerHTML = a_elem.innerHTML +
		"<span class='dggOptionsNotCurrent'>&nbsp;&nbsp;(dgg keyword filter)</span>";
	
}


//
// Styles
//

// add a string to the page as css
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addStyle(css){
	newStyles += css;
}

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function saveDgg(){
	var enabled_elem = document.getElementById("dggenabled");
	GM_setValue("dggEnabled", enabled_elem.checked ? "checked" : "unchecked");
	GM_log("dggEnabled: " + (enabled_elem.checked ? "checked" : "unchecked"));
	var list_elem = document.getElementById("dgglist");
	GM_setValue("dggList", list_elem.value);
	GM_log("dggList: " + list_elem.value);
//Added [af00001]
	var enabled_elem = document.getElementById("removeNumbers");
	GM_setValue("removeNumbers", enabled_elem.checked ? "checked" : "unchecked");
	GM_log("removeNumbers: " + (enabled_elem.checked ? "checked" : "unchecked"));
//End [af00001]
	
	
}

function dggm(a){
	var r = document.createElement(a.elem);
	for(var i in a)
		if(i != "elem")
			r.setAttribute(i, a[i]);
	return r;
}


function GM_wait(){
	if(typeof unsafeWindow.jQuery == 'undefined'){window.setTimeout(GM_wait,100);}
	else{ $ = unsafeWindow.jQuery; }
}


var functionality = determineFunctionality();
functionality();
addGlobalStyle(newStyles);


