// ==UserScript==
// @name           Facebook Filter Manager
// @namespace      muaddib
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://apps.facebook.com/*
// @include        https://apps.facebook.com/*
// @copyright      Chris Hendry and MuadDib
// @description    Adds Filters For Your Applications on Facebook by adding the url to the application. Based off original work by Chris Hendry and expanded by MuadDib.
// @version        1.1.32
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=70094&days=1
// @require        http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==

var version = '1.1.32';

/*
Changelog:
	v1.0.0  - Original work by Chris Hendry
	v1.0.1  - MuadDib - Initial upload version
	v1.0.2  - MuadDib - rewrite of main div element for my likes of looks. Also updated to remove and re-add buffer iframe as needed.
	v1.0.21 - MuadDib - Changed location of + and - again lol.
	v1.0.3  - MuadDib - Added ability to remove individual filter entries instead of just the bottom entry.
	v1.0.31 - MuadDib - Added more console logging for some debugging.
	v1.0.32 - MuadDib - Fixed "Loading...", fixed issue with ghosted filters until refresh (thx to Scriptmutt), and fixed issue with when removing via the - readding the old when +
	v1.0.33 - MuadDib - Added check to highlight current used filter as blue.
	v1.0.4  - MuadDib - Wrapped base code into main{}. Debating spreading this out such as popOut{} and so forth also for more organization.
	v1.1.0  - MuadDib - Added GM_Config and updated all event code to run off raw javascript such as this.parentNode etc.
	v1.1.1  - MuadDib - Temp, dirty fix for broken Facebook filters.
	v1.1.12 - MuadDib - Rewrote to use sk=for filters.
	v1.1.13 - MuadDib - Fix for new facebook layouts of wall feeds.
	v1.1.2  - MuadDib - Added options to click on all similar post links and option to set minimum number of posts for filter. New Options system.
	v1.1.21 - MuadDib - Updated for facebook homepage changes
	v1.1.213 - MuadDib - Update for backwards compatibility of wall post styles. Facebook needs to quick randomly changing selective people.
	v1.1.22 - MuadDib - Typo Fix. Should address freezing issues on specific profiles.
	v1.1.30 - MuadDib - Updated for new method submitted by JoeSimmons to clean and remove for filter feed posts.
	v1.1.31 - Post length fix in cleanfilter.
	v1.1.32 - Added timeout to cleanFilter calls, to fix duplication of wall posts.
*/

/*
to-do:
2.) Add a button on apps urls to create the feed while in the app.
*/

unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
if(unsafeWindow.frameElement != null) return;

// Image pre-loading
var imgs = {
	bg : "http://i44.tinypic.com/314ee0o.jpg",
	logo : "http://i39.tinypic.com/23hk5kj.jpg",
	icon : "http://i42.tinypic.com/2qx9u2r.jpg"
};
for(var img in imgs) new Image().src = imgs[img];

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, O) {
	if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
	var obj=O||({del:false,type:6,node:document}), r, t,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
	if(idclass_re.test(que)) {
		var s=que.split(' '), r=new Array(), c;
		for(var n=0; n<s.length; n++) {
			switch(s[n].substring(0,1)) {
				case '#': r.push(document.getElementById(s[n].substring(1))); break;
				case '.': c=document.getElementsByClassName(s[n].substring(1));
					if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
			}
		}
		if(r.length==1) r=r[0];
	} else if(xp_re.test(que)) {
		r = document.evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
		if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
	}
	if(r && obj['del']===true) {
		if(r.nodeType==1) r.parentNode.removeChild(r);
	else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
	else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
	} return r;
}

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

String.prototype.getPref = function(s, splitter) {
if (!this.split(s+"=")[1])
	return '';
else
	return this.split(s+"=")[1].split((splitter||"&"))[0];
};

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
};

var main = {
	
	// empty options object for later modification
	opts : {},
	editFilter : 'false',
	removeFilter : 'false',
	filterID : '',
	expandOn : true,
	streamID : "home_stream",
	
	config : function() {
		GM_config.open();
	},

	refreshFilters : function() {
		GM_log('FFM: Refreshing Filters');
		document.getElementById('gm_filtersHolder').innerHTML="<div class=\"clearfix uiHeader uiHeaderNav online_header uiHeaderTopBorder\"><div class=\"lfloat\" style=\"height:12px;\"><h4>Filters<\/h4><h4 style='position:relative; top:-13px; left:138px;'><a href='#' id='addFilter' style=\"font-color: black;\">+</a><a href='#' id='removeFilter' style=\"font-color: black;\">-</a></h4><\/div>";

		var numFilters = GM_getValue('numFilters');
		if(!numFilters) 
		{
			numFilters = 4;  GM_setValue('numFilters', '4');
		}

		main.editFilter = 'false';
		main.removeFilter = 'false';
		var eventListeners = new Array();
		for(i=1; i<=numFilters; i++) {
			var filterId = GM_getValue('filterId_'+i);
			var filterName = GM_getValue('filterName_'+i);
			if(!filterName) {filterName = "Empty Filter";};
			var icon = GM_getValue('icon'+i);
			if(!icon) {var icon = 'http://radicalpi.net/hosted/scripts/missing_icon.png'; }
			document.getElementById('gm_filtersHolder').innerHTML+="<a id='filterLink"+i+"' href=\"javascript:void(0);\" class=\"item\"" + (location.href.indexOf(filterId)>-1?" style=\"background-color: #d8dfea;\"":" ") + "\"><span class=\"imgWrap\"><img id='filters_icon_"+i+"' class=\"img\" src=\""+icon+"\" \/><\/span><span id='"+filterId+"'>"+filterName+" Feed<span id='removeImg"+i+"' style='position:absolute; right:20px; top:4px; width:12px; height:12px; background-image:url(http://www.facebook.com/rsrc.php/z3LAW/hash/38fffwed.png); background-repeat:no-repeat; display:none;'></span><span id='filterImg"+i+"' style='position:absolute; right:5px; top:4px; width:12px; height:12px; background-image:url(http://radicalpi.net/hosted/scripts/config_icon.png); background-repeat:no-repeat; display:none;'></span></span></a>";
			if (location.href.indexOf(filterId)>-1)
				main.cleanFilter(filterId);
			eventListeners[i] = i;
		}

		document.getElementById('gm_filtersHolder').innerHTML+="<a id='filterOptions' class=\"item\" href=\"javascript:void(0);\"><span class=\"imgWrap\"><img id='filters_options' class=\"img\" src=\"data:image/gif;base64,R0lGODlhEAAQAPeCAO5zXPWCY+psWetuWvN8YOxwW/u9qednV+92XfB4X/Kpn+ViVeJfU/F6X/i0oPN+YehpWPOmkeZlVvaJa/SAYvfRyOO6styfk/SmkvLi3/ezpONmW8FLMuySf/Cfjvbm4/ezoPWEatBiS/LLwu7d2e/IwN1wXcthS/CXg/SZhPKMdNqdkPPi3/mSe+yAaPiGbOuJfeywo+6glc1iTfGTgtVgR/Gon8ZbRe2SifrZ0+2flfDf2+l2Xd19b+WOg/SsoelvX+O7s+qNe/S5rPi2oeOEdeeRhe/e2+FdUuyBbOeQhPfm4/iiicRONvXl4eBzXOySiPq8qOnBufGdkPGXhOyYifaLdOeAacxVPN18b+eqnt1vWPGlmevEu/KAZfmNduRnXOBzYOVyWe6DbvWwo+qHfdFhUOl9aPijisNMNN6ileyLf/m5pvSEZ/i1pc9ZQeNhVPGom8ZWQPWBYvi+sfONdva7reaIePOvpsNTPO17YPihiNRkUudsXdduWPeGbM5dTP////b29gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIIALAAAAAAQABAAAAjSAAUJHEiwYMEldFr8CVFniBODgip8GYPBgYMIZ1yMKFjhBRUDaCZMYBKlg5gSAz9YQWEgQIBAgR4QYCPkSQaBdpK0nEMBZoMECNyY0CJQRYQ9FGTCRACgAI0qfgTqIdKGwE+YBQYIABLnjUAeILwABZAjkAAIB/pwwSLwiocUTQdMwXNAwgIYRmYIjBFGg1YIMBfAYaDAzAWBLLbcIVMXBxQGSBT0kHNkYJcaRX6sAbOhjI0sHIIUlCKCjxIZOnwAymMB4g41J5qkubGCBMTbBQMCADs=\" \/><\/span><span id='testSpanOptions'>FFM Options</span></a>";
		document.getElementById('filterOptions').addEventListener('click', function(){main.config();}, false);
	
		for (var i = 1; i < eventListeners.length; i++) {
			var item = eventListeners[i];
			
			document.getElementById('filterLink'+item).addEventListener('mouseover', function(){main.showEdit(this.childNodes[1].childNodes[2].id); main.showEdit(this.childNodes[1].childNodes[1].id);}, false);
			document.getElementById('filterLink'+item).addEventListener('mouseout', function(){main.hideEdit(this.childNodes[1].childNodes[2].id); main.hideEdit(this.childNodes[1].childNodes[1].id);}, false);
			document.getElementById('filterLink'+item).addEventListener('click', function(){if(main.editFilter!='true' && main.removeFilter!='true') {if(this.childNodes[1].id != 'empty') { location.href='http://www.facebook.com/home.php?filter=app_'+this.childNodes[1].id+(main.opts["showHidden"]==true?'&show_hidden=true':'') + (main.opts["ignoreSelf"]==true?'&ignore_self=true':'') + '&sk=lf' } else location.href='http://www.facebook.com/home.php'} main.editFilter='false';}, false);

			document.getElementById('filterImg'+item).addEventListener('mouseover', function(){main.editFilter='true';}, false);
			document.getElementById('filterImg'+item).addEventListener('click', function(){main.setFilter(this.parentNode.parentNode.id);}, false);
			document.getElementById('removeImg'+item).addEventListener('mouseover', function(){main.removeFilter='true';}, false);
			document.getElementById('removeImg'+item).addEventListener('mouseout', function(){main.removeFilter='false';}, false);
			document.getElementById('removeImg'+item).addEventListener('click', function(){main.removeFilters(this.parentNode.id);}, false);
		}

		document.getElementById('addFilter').addEventListener('click', function(){main.addEmptyFilter();}, false);
		document.getElementById('removeFilter').addEventListener('click', function(){main.removeLastFilter();}, false);
	},

	// click something
	click : function(e, type) {
		if(!e && typeof e=='string')
			e=document.getElementById(e);
		if(!e)
		{
			return;
		}
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
	},

	cleanFilter : function() {
		GM_addStyle("#home_stream *[id^=\"div_story_\"]:not([class*=\"aid_"+main.filterID+"\"]), #home_stream *[id^=\"li_story_\"]:not([class*=\"aid_"+main.filterID+"\"]), #home_stream *[id^=\"stream_story_\"]:not([class*=\"aid_"+main.filterID+"\"]) {display:none !important;}");
		
		posts = document.evaluate(".//div[starts-with(@id,'div_story_') or starts-with(@id,'li_story_') or starts-with(@id,'stream_story_')]/.[not(contains(@class,'aid_"+main.filterID+"'))]", stream, null, 6, null);
		if (posts.snapshotLength == 0)
			posts = document.evaluate(".//li[starts-with(@id,'div_story_') or starts-with(@id,'li_story_') or starts-with(@id,'stream_story_')]/.[not(contains(@class,'aid_"+main.filterID+"'))]", stream, null, 6, null);		
		var i=0, len=posts.snapshotLength;
		if (len > 0)
		{
			do {
				var post = posts.snapshotItem(i);
				post.parentNode.removeChild(post);
			} while (++i < len);
		}

		switch(main.expandOn && main.opts["minposts"] != "off") {
			case true: main.expand(); break;
		}

		switch(main.opts["clicksimilar"]) {
			case true: main.similarPosts(); break;
		}
	},

	similarPosts : function() {
		// Auto click "show x similar posts" links
		var similarposts = $g(".//a[@rel='async' and contains(@href,'oldest=') and contains(@href,'newest=') and contains(@href,'expand_story_uid=')]", {node:$(main.streamID)});
		var i = 0, l = similarposts.snapshotLength;
		if(l==0)
			return;
		do {
			main.click(similarposts.snapshotItem(i));
		} while(++i < l);
	}, // end similarPosts

	expand : function() {
		var posts=$g("count(.//li[starts-with(@id,'stream_story_') and contains(@class,'"+main.filterID+"')])", {node:$(main.streamID), type:1}),
		more=$g("//div[@class='UIShowMore_ShowMore']/a[@class='PagerMoreLink' and @rel='async' and not(contains(@class,'async_saving'))]", {type:9});
		if (typeof posts != 'number')
			posts = 0;
		if (posts == 0)
			posts=$g("count(.//div[starts-with(@id,'div_story_') and contains(@class,'"+main.filterID+"')])", {node:$(main.streamID), type:1});
		if (typeof posts != 'number')
			posts = 0;
		if(more) switch(posts < parseInt(main.opts["minposts"])) {
			case true: main.click(more); break;
			case false: main.expandOn=false; break;
		}
	},

	addEmptyFilter : function() {
		var numFilters = GM_getValue('numFilters');
		if(numFilters < 20) { 
			GM_log('FFM: Adding New Empty Filter Slot');
			numFilters++; 
			GM_setValue('numFilters', numFilters); 
			GM_setValue('filterName_'+numFilters, 'Empty Filter');
			GM_setValue('filterId_'+numFilters, 'empty');
			GM_setValue('icon'+numFilters, 'http://radicalpi.net/hosted/scripts/missing_icon.png');
			main.refreshFilters();
		} else {
			GM_log('FFM: A Maximum of 20 Filters is Allowed');
			alert('A Maximum of 20 Filters is Allowed');
		}
	},

	removeLastFilter : function() {
		var numFilters = GM_getValue('numFilters');
		if(numFilters > 1) {
			GM_log('FFM: Removing Last Filter In List');
			GM_deleteValue('filterName_'+numFilters);
			GM_deleteValue('filterId_'+numFilters);
			GM_deleteValue('icon'+numFilters);
			numFilters--; 
			GM_setValue('numFilters', numFilters);
			main.refreshFilters();
		} else { 
			GM_log('FFM: A Minimum of 1 Filter is Required');
			alert('A Minimum of 1 Filter is Required');
		}
	},
	
	removeFilters : function(appId) {
		GM_log('FFM: Removing Filter for App ID - ' + appId);
		var numFilters = GM_getValue('numFilters');
		if(numFilters > 1)
		{
			var found = false;
			for(j=1; j<=numFilters; j++) {
				var i = GM_getValue('filterId_'+j);
				if (i != appId && found == false)
					continue;
				if (i == appId)
				{
					GM_log('FFM: Found Filter To Remove, Cleaning Filter ' + i);
					GM_deleteValue('filterName_'+j);
					GM_deleteValue('filterId_'+j);
					GM_deleteValue('icon'+j);
					found = true;
					continue;
				}
				GM_log('FFM: Moving Filter Up List - ' + j);

				GM_setValue('filterName_'+(j-1), GM_getValue('filterName_'+j));
				GM_setValue('filterId_'+(j-1), GM_getValue('filterId_'+j));
				GM_setValue('icon'+(j-1), GM_getValue('icon'+j));
				GM_deleteValue('filterName_'+j);
				GM_deleteValue('filterId_'+j);
				GM_deleteValue('icon'+j);			

				GM_log('FFM: Filter Moved Up List - ' + j);
			}
			numFilters--;
			GM_setValue('numFilters', numFilters);
			main.refreshFilters();
		} else {
			alert('A Minimum of 1 Filter is Required');
		}
	},
	
	// filterLink<number>
	setFilter : function(i) {
		i = i.substring(i.length-1);
		filter = prompt('Enter URL for Filter #'+i, document.location);

		if(filter.indexOf('apps.facebook.com') != -1) {
			document.getElementById('filters_icon_'+i).src = "http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif";
			main.getIcon(filter, i);
		} else {
			alert('Only apps.facebook.com links are supported at this time.');
			filter="";
			main.setFilter(i);
		}
	},
	
	getIcon : function(target, i) {
		if (document.getElementById('buffer') == null)
		{
			var bufferFrame = document.createElement('iframe');
			bufferFrame.setAttribute('id', 'buffer');
			bufferFrame.setAttribute('style', 'display: none; visibility: hidden; width: 0; height: 0;');
			bufferFrame.addEventListener("load", function(e) {
				main.handleBuffer(e.target);
			},false);
			document.getElementById('bufferDiv').appendChild(bufferFrame);
			GM_log('FFM: iFrame created!');
		}
		main.loadBuffer(target, i);
	},
	
	loadBuffer : function(url, i) {
		GM_setValue('item', i);
		var myFrame = document.getElementById('buffer');
		if ( myFrame )
		{
			myFrame.src = url;
			GM_log("FFM: Loading buffer");
		} 
		return false;
	},
	
	handleBuffer : function(event) {
		GM_log('FFM: Buffer iFrame Loaded!');
		var myFrame = event.contentDocument;
		var i = GM_getValue('item');
		var title = myFrame.title;
		var img = 'http://radicalpi.net/hosted/scripts/missing_icon.png';
		var target='#';

		if(myFrame.body.innerHTML.indexOf('Page Not Found') != -1) 
		{
			GM_log('FFM: Error adding filter! App Not Found!');
			main.showPopup("Error Adding Filter", "The App Cannot Be Found", 0);
		} else if(myFrame.body.innerHTML.indexOf('Log in to') != -1) {
			GM_log('FFM: Error adding filter! Allow Access Before Adding Filter!');
			main.showPopup("Error Adding Filter", "Allow Access Before Adding Filter", 0);
		} else if(myFrame.body.innerHTML.indexOf('Login |') != -1) {
			GM_log('FFM: Error adding filter! Please login to Facebook!');
			main.showPopup("Error Adding Filter", "Please login to Facebook", 0);
		} else {
			title = title.split("on Facebook");
			value1 = myFrame.childNodes[1].innerHTML.split("<link rel=\"shortcut icon\" href=\"");
			if (value1[1] == undefined)
			{
				GM_log('FFM: Unable to find shortcut icon!');
				main.showPopup("Error Adding Filter", "Unable to find shortcut icon", 0);
				return;
			}
			imgSrc = value1[1].split("\"");
			value2 = myFrame.body.innerHTML.split("<div id=\"app_content_");
			filterId = value2[1].split("\"");

			document.getElementById('filters_icon_'+i).src = imgSrc[0];
			GM_log('FFM: New Filter Added! '+title);
			main.showPopup("New Filter Added", "<img src='"+imgSrc[0]+"'>&nbsp;"+title[0], 0);
			img = imgSrc[0];
		}
		
		GM_setValue('filterName_'+i, title[0]);
		GM_setValue('filterId_'+i, filterId[0]);
		GM_setValue('icon'+i, img);
		GM_setValue('item', 0);

		GM_log('FFM: New Filter Added!');
		setTimeout(function() {main.refreshFilters();}, 100);
	},
	
	showPopup : function(title, message, value) {
		if(value == 0) {
			document.getElementById('gm_popupHolder').innerHTML="<div id='gm_popup' style='position:fixed; left:10px; bottom:30px; width:180px; height:40px; background-color:#D8DFEA; border:1px solid #526EA6; -moz-border-radius:5px; padding:4px;'><b>"+title+"</b></div>"
			document.getElementById('gm_popup').innerHTML+="<a href='#' id='closePopup'><div style='position:absolute; top:0px; right:4px; color:#526EA6'>X</div></a>";
			document.getElementById('gm_popup').innerHTML+="<div style='height:6px;'></div>&nbsp;&nbsp;&nbsp;&nbsp;"+message+"</div>";
		}

		if(value < 1.1 && value > .1) {
			document.getElementById('gm_popupHolder').style.opacity=value;
			value+=.1;
			setTimeout(function() {main.showPopup('null', 'null', value);}, 50);
		} else {
			document.getElementById('closePopup').removeEventListener('click', function() {main.closePopup(0.9);}, false );
			document.getElementById('closePopup').addEventListener('click', function() {main.closePopup(0.9);}, false );
			closeTimeout = setTimeout(function() {main.closePopup(0.9);}, 5000);
		}
	},
	
	closePopup : function(value) {
		clearTimeout(closeTimeout);

		if(value > -.1) {
			document.getElementById('gm_popupHolder').style.opacity=value;
			value-=.1;
			setTimeout(function() {main.closePopup(value);}, 75);
		} else {
			document.getElementById('closePopup').removeEventListener('click', function() {main.closePopup(0.9);}, false );
			document.getElementById('gm_popupHolder').innerHTML="";
		}
	},
	
	showEdit : function(target) {
		document.getElementById(target).style.display="block";
	},

	hideEdit : function(target) {
		document.getElementById(target).style.display="none";
	},
	
	onLoadPage_WWW : function() {
		var bufferDiv = document.createElement('div');
		bufferDiv.id = 'bufferDiv';
		document.body.appendChild(bufferDiv);
	
		var filtersHolder = document.createElement('div');
		filtersHolder.id='gm_filtersHolder';
		var feeds = $g("//li[starts-with(@id, 'navItem')]", {type:9});
		if(feeds) {
			feeds.parentNode.appendChild(filtersHolder);
		} else {
			return;
		}

		var popupHolder = document.createElement('div');
		popupHolder.id = 'gm_popupHolder';
		document.body.appendChild(popupHolder);

		main.refreshFilters();
	}
};

main.filterID = document.URL.getPref("filter").substring(4), stream = ($("home_stream") || $("pagelet_intentional_stream") || $("contentArea"));

GM_config.init("<img src='"+imgs.logo+"'> v"+version, {
	 'showHidden': {
		'section': [
		"News Feed Filter Options"
		],
		'label': "Show Hidden Posts?",
		'type': "checkbox",
		'default' : true
	},
	'ignoreSelf' : {
		'label' : "Ignore Your Own Posts?",
		'type' : "checkbox",
		'default' : true
	},
	'clicksimilar' : {
		'label' : "Click on similar link posts?",
		'type' : "checkbox",
		"default" : true
	},
	'minposts' : {
		'label' : "Minimum number of posts to show",
		'type' : "select",
		'options' : {
		'off' : "Off",
		 5 : "5",
		10 : "10",
		20 : "20",
		30 : "30",
		40 : "40",
		50 : "50"
		},
		"default" : "10"
	},
},  // Custom styling for the options interface
"body {color:#FFFFFF !important; margin:0 !important; background: url('"+imgs.bg+"') !important;}"+
".section_header {background:#333333 !important;}"+
".section_header_holder {padding:0 6px 0 6px !important; margin-top:8px !important;}"+
".field_label {font-size:11px !important;}"+
"span>label.field_label {margin-right:3px !important;}"+
"#header {font-size:18px !important;}"+
"span.config_var {display:inline !important; margin-left:14px !important;}"+
"#resetLink {color: #FFFFFF !important;}"+
"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}"+
"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}"+
"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}"
);

// method to speed up script considerably
var tempopts={}, settings=GM_config.settings;
for(var thing in settings) { // go through the options making cached options copy
var g=GM_config.get(thing), kids=settings[thing].kids;
switch(typeof g) {
case "boolean": tempopts[thing] = g ? true : false; break;
case "number": tempopts[thing] = g || 0; break;
case "text": tempopts[thing] = g || ""; break;
default: tempopts[thing] = g;
}
if(kids && typeof kids=="object") for(var kid in kids) { // go through the extended settings also
var k=GM_config.get(kid);
switch(typeof k) {
case "boolean": tempopts[kid] = k ? true : false; break;
case "number": tempopts[kid] = k || 0; break;
case "text": tempopts[kid] = k || ""; break;
default: tempopts[kid] = k;
}
}
}
main.opts = tempopts; tempopts=null; k=null; g=null;

window.addEventListener("load", function(event) {
	
	switch(document.location.href.indexOf('www.facebook.com')!= -1) {
		case true:	main.onLoadPage_WWW();
					break;
		default:	
					break;
	};
},false);

stream.addEventListener("DOMNodeInserted", function() {setTimeout(main.cleanFilter, 1000)}, false);