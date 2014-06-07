// ==UserScript==
// @name        Add youtube inbox to sidebar with unread comments count
// @namespace   #perunaonparas
// @include     *youtube.com/*
// @version     1.1
// ==/UserScript==

	function getToken (responseString)
{
	var match = responseString.match (/ *'session_token=([^']*).*initEllipsis/) [1];
	return match;
}
var status=1;
if (window.location.href.indexOf("my_subscriptions") > -1) {status=2;}


if (status == 1){
var tgt = document.querySelector(".guide-module-content #gh-personal .guide-item-container .guide-user-links");
var d = document.createElement("li");
d.idName = "guide-item";
d.innerHTML = '<a id=\inboxadd\ class=\guide-item\ href=\/inbox\>Inbox<\/a\>';
tgt.appendChild(d);
}
	var secure ="";
	if (window.location.href.substr (0, 5) == "https") {secure = "s";}
	
	var base = 'http'+secure+'://www.youtube.com/inbox?folder=messages&action_message=1#';
	var req1 = new XMLHttpRequest ();
	var req2 = new XMLHttpRequest ();
	
	req1.onreadystatechange = function ()
	{
		if (req1.readyState == 4 && req1.status == 200)
		{
			req2.onreadystatechange = function ()
			{
				if (req2.readyState == 4 && req2.status == 200)
				{
					var counts = req2.responseText;
					var match = counts.match (new RegExp ('"inbox": ([0-9]*)')) [1];
					var newinbox=parseInt(match, 10);
					if(newinbox=="") {newinbox=0;}
                    if (status == 1){
					document.getElementById('inboxadd').innerHTML="Inbox ("+newinbox+")";	
                    }
                    if (status == 2){
                        var list = document.getElementsByClassName("yt-nav-item");
                        for (var i = 0; i < list.length; i++) {
                            if(list[i].innerHTML.indexOf("Inbox") > -1){ list[i].innerHTML="Inbox ("+newinbox+")";}
                        }
                       
                    }
					
				}
			}
			req2.open ('POST', 'http'+secure+'://www.youtube.com/inbox_ajax?action_ajax=1&type=display_messages&folder=messages', true);
			req2.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
			req2.send ('session_token=' + getToken (req1.responseText) + '&messages=[{"type":"display_messages","request":{"folder":"messages","start":0,"num":20,"messages_deleted":[],"messages_read":[]}}]');
		}
	}
	req1.open ('GET', base, true);
	req1.send ();

// ==UserScript==
// @name         Better Tube
// @id           bytui@em
// @namespace    bytui
// @author       Eldo Mata
// @version      2.3
// @description  Makes the YouTube home page wider, lets you remove videos you don't want to watch, and more.
// @include      http://*.youtube.com/
// @include      https://*.youtube.com/
// @include      http://*.youtube.com/?*
// @include      https://*.youtube.com/?*
// @include      http://*.youtube.com/feed/subscriptions/u
// @include      https://*.youtube.com/feed/subscriptions/u
// @include      http://*.youtube.com/feed/subscriptions
// @include      https://*.youtube.com/feed/subscriptions
// @run-at       document-end
// ==/UserScript==

document.getElementById("page").style.display="none";

	function injectCSS() {

		var headTag = document.getElementsByTagName("head")[0].innerHTML;	
		var newCSS = headTag + '<link rel="stylesheet" type="text/css" href="http://plaku.com/bytui/bytui.css" />';
		document.getElementsByTagName('head')[0].innerHTML += newCSS;
	}
	 
	//Overwrite some of youtube's css
	injectCSS();
	
	loadJQ();
		
	// a function that loads jQuery and calls a callback function when jQuery has finished loading
	function loadJQ() {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://plaku.com/bytui/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		loadJQCookie();
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	
	function loadJQCookie() {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://plaku.com/bytui/jquery.cookie.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		loadMain();
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	
	function loadMain() {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://plaku.com/bytui/bytui.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

// ==UserScript==
// @name         Center Align Youtube's New Layout
// @version	     2.5.0
// @namespace    RedBanHammer
// @description  Properly center align YouTube's layout on every page.
// @match		 http://*.youtube.com/*
// @match		 https://*.youtube.com/*
// @run-at       document-start
// @copyright  2012+, RedBanHammer
// ==/UserScript==

// ==Script Options==
// Set this to false if you want to see the "Send Feedback" button
var hideFeedbackButton = true;

// Set this to false if you want to have the default grey for the dislike bar
var redDislike = true;

// Set this to true if you want your videos to align with the guide sidebar factored in (consistent w/ other pages)
var useGuideWidth = false;

// Set this to true if you want to hide branded video backgrounds (custom images) on watch pages
var hideBrandedStyling = false;

// Set this to true if you want to have the guide sidebar automatically expand on watch pages
var autoExpandGuide = false;
// ==/Script Options==


// For overriding the auto width adjusting with a preset value
var widthOverride = -1;
var parsedPath = location.pathname.substring(1).split("/")[0];
switch (parsedPath) {
    case "watch":
        widthOverride = "1080px";
        break;
    case "user":
        widthOverride = "1150px";
        break;
    case "artist":
        widthOverride = "1003px";
        break;
    default:
        widthOverride = "960px";
        break;
}
// Auto guide expanding
var guideEl = null;
var expandedGuide = false;

// Hide the body until we can center it (this only works with Greasemonkey+Firefox at the moment)
var init = setInterval(function() {initialize();}, 1);
initialize();

var update = setInterval(function() {updateLoop();}, 50);
updateLoop();

function initialize() {
    try {
        if (window.top === window.self && document.getElementsByTagName("head")[0] && init) {
            // Preset styles
            var noTrans = " -webkit-transition: none; -moz-transition: none; -o-transition: none; transition: none;";
            var centerAlign = " margin: 0 auto !important;";
            
            // Width dependant styling
            var s = document.createElement("style");
            s.id = "center-yt-widthdp";
            s.setAttribute("media", "screen and (min-width: 1240px) and (max-width: 9999999px)");
            s.innerHTML = "#page-container, #content-container {" + (parsedPath=="user"?"":"display: table !important; ") + (parsedPath=="watch"&&!useGuideWidth?"padding-right: 135px !important;":"") + centerAlign + noTrans + "}" +
            "#page-container #page.channel.clearfix {max-width: " + widthOverride + ";}" +
            "#yt-masthead-container.yt-grid-box #yt-masthead, #footer-hh-container #footer-hh, #footer-container #footer {" + (widthOverride!=-1?"max-width: " + widthOverride + ";":"") + (parsedPath=="watch"&&!useGuideWidth?"padding-right: 180px !important;":"") + centerAlign + noTrans + "}" +
            "#content-container #baseDiv" + (parsedPath=="feed"||parsedPath==""?"":", #page-container #page") + " {" + centerAlign + noTrans + (parsedPath=="artist"?" max-width: 1003px;":"") + "}" +
            (parsedPath=="watch"&&!useGuideWidth?"#page-container #page {margin-left: -45px !important;}":"") +
            "#body-container {overflow-x: hidden;}" +
            (parsedPath=="results"?".exp-new-site-width #guide + #content {max-width: 780px !important;}":"") +
            "#masthead-expanded {background: #EDEDED; border-bottom: 1px solid #DBDBDB;}" +
            "#masthead-expanded-container {max-width: 1150px; margin-bottom: inherit !important; border-bottom: none !important;}" +
            "#masthead-subnav {padding-left: 25px !important;}" +
            "#masthead-subnav ul {max-width: 1150px;" + centerAlign + "}" +
            "#masthead-subnav.yt-nav.yt-nav-dark {" + centerAlign + noTrans + "}" +
            "#watch7-playlist-container.playlist-floating.scrolled #watch7-playlist-scrollfloater {width: 100% !important; margin-left: -197px !important;}" +
            "#watch7-playlist-container.playlist-floating.scrolled #watch7-playlist-scrollfloater .watch7-playlist-bar {width: 845px !important;" + centerAlign + "}" +
            "#body-container #alerts {margin: 0 auto !important;" + noTrans + "}" +
            "#ticker #ticker-inner .ytg-wide {" + centerAlign + noTrans + "}" +
            "#header #ad_creative_1 {margin: 0 auto -20px auto !important;" + noTrans + "}" +
            // CSS for large player adapted from YouTube 720p Layout by Dykam (http://userstyles.org/styles/57985/youtube-720p-layout)
            "#page.watch-large #watch7-video, #page .watch-large #watch7-video {\nwidth: 1280px !important;\n}\n#page.watch-large #watch7-player, #page .watch-large #watch7-player {\nwidth: 1280px !important;\nheight: 750px !important;\nmargin: 0 auto !important;\n}\n\n.watch-large .watch7-playlist-bar, .watch-large #watch7-main {\nwidth: 1280px !important;\n}\n\n.watch-large #watch7-sidebar {\nwidth: 610px;\n}\n\n.watch-large .watch-sidebar-body li {\ndisplay: inline-block;\nwidth: 300px;\n}\n\n.watch-large #watch-more-related-button {\nmargin-left: 305px;\n}\n\n\n#watch-video.large #watch-player, #watch-video.large #watch-player{\nheight: 750px !important;\nmargin: 0 auto !important;\n}\n#watch-video.large, #watch-video.large, #watch-video.large #watch-player, #watch-video.large #watch-player {\nwidth: 1280px !important;\n}";
            document.getElementsByTagName("head")[0].appendChild(s);
            
            // Width independant styling
            s = document.createElement("style");
            s.id = "center-yt-widthidp";
            s.innerHTML = "#masthead-expanded-lists-container {margin-top: 22.5px;}" +
            (hideFeedbackButton?"#yt-hitchhiker-feedback {display: none;}":"") +
            (redDislike?".video-extras-sparkbar-dislikes {background: #C00;}":"") +
            (hideBrandedStyling?"#watch7-video-container {background: none !important} #watch7-branded-banner {display:none !important} #watch7-sidebar {margin-top: -390px !important}":"");
            document.getElementsByTagName("head")[0].appendChild(s);
            
            clearInterval(init);
            init = null;
        }
    } catch (e) {};
}

function updateLoop() {
    // Keep the masthead width the same as the content width
    if (widthOverride != -1) {
        centerMasthead();
    }
    
	// For Unique YouTube Skin compatibility on watch pages
    fixCompatibility();
    
    // For auto-expanding the YouTube guide
    expandGuide();
}

function centerMasthead() {
    var masthead = document.getElementById("yt-masthead");
        if (!masthead) return;
        var footer = document.getElementById("footer-hh");
        if (!footer) footer = document.getElementById("footer");
    	if (!footer) return;
        
        var pageContainerWidth = document.getElementById("page-container");
        if (!pageContainerWidth) return;
        pageContainerWidth = pageContainerWidth.offsetWidth + "px";
        
        if (masthead.style.maxWidth != pageContainerWidth) masthead.style.maxWidth = widthOverride==-1?pageContainerWidth:widthOverride;
        if (footer.style.maxWidth != pageContainerWidth) footer.style.maxWidth = widthOverride==-1?pageContainerWidth:widthOverride;
}

function fixCompatibility() {
    if (!document.body) return;
    if (getComputedStyle(document.body).backgroundColor == "rgb(4, 4, 4)" && parsedPath == "watch") {
        document.getElementById("center-yt-widthdp").innerHTML = "";
    }
}

function expandGuide() {
    if (autoExpandGuide) {
        if (!guideEl) guideEl = document.getElementsByClassName("guide-module-toggle-label")[0];
        if (guideEl && parsedPath == "watch" && !expandedGuide) {
            guideEl.click();
        }
    }
}

var GMSU_meta_158990 = <><![CDATA[
// ==UserScript==
// @name        Remove featured Youtube videos
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @description as the name states, it removes those stupid movies that show up even though they have nothing to do with your preferences just because the mob is watching them
// @grant	none
// @version     0.3
// @require	http://userscripts.org/scripts/source/51513.user.js
// ==/UserScript==
]]></>;
GMSU.init(158990);

try{
	var junk=document.getElementsByClassName("yt-badge-std");
	for (var i=0;i<junk.length;i++){
		junk[i].parentNode.parentNode.parentNode.parentNode.removeChild(junk[i].parentNode.parentNode.parentNode);
	}
}
catch(err){
	if (junk[i]==0){}
}

// ==UserScript==
// @name           Simple YouTube MP3 Downloader
// @namespace      http://www.youtubeinaudio.com
// @description    A download button will be added to YouTube videos that allow you to download the video in MP3-format. No java required!
// @include        http://*youtube.*/*watch*
// @include        https://*youtube.*/*watch*
// @version        1.4.0
// ==/UserScript==

// ==ChangeLog==
// @history        1.4.0  Server upgrade
// @history        1.3.1  Quick tweak
// @history        1.3.0  Compatible with the latest update
// @history        1.2.2  Server update
// @history        1.2.1  Server update
// @history        1.11 Server edit
// @history        1.00 Initial release.
// ==/ChangeLog==

var DIV = document.createElement('span');
	DIV.innerHTML = '';
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
	divp.appendChild(DIV);

var url = location.href.split("&")[0];


var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','Download MP3');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://youtubeinaudio.com/download.php?quality=128&submit=Download+MP3&youtubeURL=" + url + ""); self.focus();}, false);

// ==UserScript==
// @name           Unique Youtube Skin
// @description    Perfect watch page. Dinamicly adjust player size acc your window size to get biggest video.
// @author         haluk ilhan
// @homepage       http://userscripts.org/scripts/show/120134
// @icon           http://i.imgur.com/VSfpO.jpg
// @updateURL      https://userscripts.org/scripts/source/120134.meta.js
// @downloadURL    https://userscripts.org/scripts/source/120134.user.js
// @version        0.4.79
// @include        http://*youtube.com*
// @include        https://*youtube.com*
// @require        http://code.jquery.com/jquery-1.8.3.js
// ==/UserScript==
// settings 
String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};
var GM_config = {
 storage: 'GM_config2', // This needs to be changed to something unique for localStorage
 init: function() {
        // loop through GM_config.init() arguements
	for(var i=0,l=arguments.length,arg; i<l; ++i) {
		arg=arguments[i];
		switch(typeof arg) {
            case 'object': for(var j in arg) { // could be a callback functions or settings object
							switch(j) {
							case "open": GM_config.onOpen=arg[j]; delete arg[j]; break; // called when frame is gone
							case "close": GM_config.onClose=arg[j]; delete arg[j]; break; // called when settings have been saved
							case "save": GM_config.onSave=arg[j]; delete arg[j]; break; // store the settings objects
							default: var settings = arg;
							}
			} break;
            case 'function': GM_config.onOpen = arg; break; // passing a bare function is set to open
                        // could be custom CSS or the title string
			case 'string': if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1) var css = arg;
				else GM_config.title = arg;
				break;
		}
	}
	if(!GM_config.title) GM_config.title = 'Settings - Anonymous Script'; // if title wasn't passed through init()
	var stored = GM_config.read(); // read the stored settings
	GM_config.passed_values = {};
	for (var i in settings) {
	GM_config.doSettingValue(settings, stored, i, null, false);
	if(settings[i].kids) for(var kid in settings[i].kids) GM_config.doSettingValue(settings, stored, kid, i, true);
	}
	GM_config.values = GM_config.passed_values;
	GM_config.settings = settings;
	if (css) GM_config.css.stylish = css;
 },
 open: function() {
 if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
	// Create frame
	document.body.appendChild((GM_config.frame=GM_config.create('iframe',{id:'GM_config', style:'position:fixed; top:0 !important; left:0 !important; opacity:0; display:none; z-index:999; width:309px; height:600px; border:1px solid #000000; overflow:auto;'})));
        GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
	GM_config.frame.addEventListener('load', function(){
		var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
		obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));
		// Add header and title
		frameBody.appendChild(create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));
		// Append elements
		var anch = frameBody, secNo = 0; // anchor to append elements
		for (var i in settings) {
			var type, field = settings[i], value = obj.values[i];
			if (field.section) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', id:'section_'+secNo, kids:new Array(
				  create('a', {className:'section_header center', href:"javascript:void(0);", id:'c_section_kids_'+secNo, textContent:field.section[0], textContent:"Main Options", onclick:function(){GM_config.toggle(this.id.substring(2));}}),
				  create('div', {id:'section_kids_'+secNo, className:'section_kids', style:obj.getValue('section_kids_'+secNo, "")=="none"?"display: none;":""})
				  )}));
				if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
				secNo++;
			} else if(secNo == 0) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', id:'section_'+secNo, kids:new Array(
				  create('a', {className:'section_header center', href:"javascript:void(0);", id:'c_section_kids_'+secNo,  onclick:function(){GM_config.toggle(this.id.substring(2));}}),
				  create('div', {id:'section_kids_'+secNo, className:'section_kids', style:obj.getValue('section_kids_'+secNo, "")=="none"?"display: none;":""})
				  )}));
				secNo++;
			}
			anch.childNodes[1].appendChild(GM_config.addToFrame(field, i, false));
		}
		// Add save and close buttons
		frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:new Array(
			obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
			obj.create('div', {className:'reset_holder block', kids:new Array(
				obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
		)}))}));
		obj.center(); // Show and center it
		window.addEventListener('resize', obj.center, false); // Center it on resize
		if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
		// Close frame on window close
		window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);
	}, false);
 },
 close: function(save) {
	if(save) {
		var type, fields = GM_config.settings, typewhite=/radio|text|hidden|checkbox/;
		for(f in fields) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
			if(!field.className.find("separator")) {
				if(typewhite.test(field.type)) type=field.type;
					else type=field.tagName.toLowerCase();
				GM_config.doSave(f, field, type);
				if(kids) for(var kid in kids) {
					var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
					if(typewhite.test(field.type)) type=field.type;
						else type=field.tagName.toLowerCase();
					GM_config.doSave(kid, field, type, f);
				}
			}
		}
                if(GM_config.onSave) GM_config.onSave(); // Call the save() callback function
                GM_config.save();
	}
	if(GM_config.frame) GM_config.remove(GM_config.frame);
	delete GM_config.frame;
        if(GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
 },
 set: function(name,val) {
	GM_config.values[name] = val;
 },
 get: function(name) {
	return GM_config.values[name];
 },
 isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
 log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
 getValue : function(name, def) { return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); },
 setValue : function(name, value) { return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); },
 save: function(store, obj) {
    try {
      var val = JSON.stringify(obj||GM_config.values);
      GM_config.setValue((store||GM_config.storage),val);
    } catch(e) {
      GM_config.log("GM_config failed to save settings!");
    }
 },
 read: function(store) {
    try {
      var val = GM_config.getValue((store||GM_config.storage), '{}'), rval = JSON.parse(val);
    } catch(e) {
      GM_config.log("GM_config failed to read saved settings!");
      rval = {};
    }
    return rval;
 },
 reset: function(e) {
	e.preventDefault();
	var type, obj = GM_config, fields = obj.settings;
	for(f in fields) {
		var field = obj.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
		if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
		GM_config.doReset(field, type, null, f, null, false);
		if(kids) for(var kid in kids) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
			if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
			GM_config.doReset(field, type, f, kid, true);
			}
	}
 },
 addToFrame : function(field, i, k) {
	var elem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, create=GM_config.create, isKid = k!=null && k===true;
		switch(field.type) {
				case 'separator': elem = create("span", {textContent:label, id:'field_'+i, className:'field_label separator'});
					break;
				case 'textarea':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					), className: 'config_var'});
					break;
				case 'radio':
					var boxes = new Array();
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('span', {id:'field_'+i, kids:boxes})
					), className: 'config_var'});
					break;
				case 'select':
					var options = new Array();
					if(!Options.inArray) for(var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(j==value)}));
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i, kids:options})
					), className: 'config_var'});
					break;
				case 'checkbox':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					), className: 'config_var'});
					break;
				case 'button':
				var tmp;
					elem = create(isKid ? "span" : "div", {kids:new Array(
						(tmp=create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					), className: 'config_var'});
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'hidden':
				elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i, type:'hidden', value:value})
					), className: 'config_var'});
					break;
				default:
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					), className: 'config_var'});
			}
	if(field.kids) {
	var kids=field.kids;
	for(var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
	}
return elem;
},
 doSave : function(f, field, type, oldf) {
 var isNum=/^[\d\.]+$/, set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
 switch(type) {
				case 'text':
					GM_config.values[f] = ((set[f].type=='text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf(","+set[f].type)!=-1) ? parseFloat(field.value) : false));
					if(set[f]===false) {
						alert('Invalid type for field: '+f+'\nPlease use type: '+set[f].type);
						return;
					}
					break;
				case 'hidden':
					GM_config.values[f] = field.value.toString();
					break;
				case 'textarea':
					GM_config.values[f] = field.value;
					break;
				case 'checkbox':
					GM_config.values[f] = field.checked;
					break;
				case 'select':
					GM_config.values[f] = field.options[field.selectedIndex].value;
					break;
				case 'span':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].checked) GM_config.values[f] = radios[i].value;
					}
					break;
			}
 },
 doSettingValue : function(settings, stored, i, oldi, k) {
		var set = k!=null && k==true && oldi!=null ? settings[oldi]["kids"][i] : settings[i];
			if(",save,open,close".indexOf(","+i) == -1) {
            // The code below translates to:
            // if a setting was passed to init but wasn't stored then 
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            // 		else use the stored value
            try {
            var value = (stored[i]==null || typeof stored[i]=="undefined") ? ((set["default"]==null || typeof set["default"]=="undefined") ? null : (set["default"])) : stored[i];
			} catch(e) {
			var value = stored[i]=="undefined" ? (set["default"]=="undefined" ? null : set["default"]) : stored[i];
			}
            
            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch(set["type"]) {
                    case 'radio': case 'select':
                        value = set.options[0]; break;
                    case 'checkbox':
                        value = false; break;
                    case 'int': case 'float':
                        value = 0; break;
                    default:
					value = (typeof stored[i]=="function") ? stored[i] : "";
                }
			}
			
			}
	GM_config.passed_values[i] = value;
 },
 doReset : function(field, type, oldf, f, k) {
 var isKid = k!=null && k==true, obj=GM_config,
	 set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
 switch(type) {
			case 'text':
				field.value = set['default'] || '';
				break;
			case 'hidden':
				field.value = set['default'] || '';
				break;
			case 'textarea':
				field.value = set['default'] || '';
				break;
			case 'checkbox':
				field.checked = set['default'] || false;
				break;
			case 'select':
				if(set['default']) {
					for(var i=field.options.length-1; i>=0; i--)
					if(field.options[i].value==set['default']) field.selectedIndex=i;
				}
				else field.selectedIndex=0;
				break;
			case 'span':
				var radios = field.getElementsByTagName('input');
				if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
					if(radios[i].value==set['default']) radios[i].checked=true;
				}
				break;
		}
 },
 values: {},
 settings: {},
 css: {
 basic: 'body {background:#FFFFFF;}\n' +
 '.indent40 {margin-left:40%;}\n' +
 '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' +
 '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' +
 '.block {display:block;}\n' +
 '.saveclose_buttons {\n' +
 'margin:16px 10px 10px 10px;\n' +
 'padding:2px 12px 2px 12px;\n' +
 '}\n' +
 '.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
 '.config_header {font-size:20pt; margin:0;}\n' +
 '.config_desc, .section_desc, .reset {font-size:9pt;}\n' +
 '.center {text-align:center;}\n' +
 '.section_header_holder {margin-top:8px;}\n' +
 '.config_var {margin:0 0 4px 0; display:block;}\n' +
 '.section_header {display:none}\n' +
 '.section_kids {margin-top:10px;}\n' +
 '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' +
 'input[type="radio"] {margin-right:8px;}',
 stylish: ''},
 create: function(a,b) {
	var ret=window.document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for(var i=0; i<prop.length; i++) ret.appendChild(prop[i]);
		else if(",style,accesskey,id,name,src,href,for".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}
	return ret;
 },
 center: function() {
	var node = GM_config.frame, style = node.style, beforeOpacity = style.opacity;
	if(style.display=='none') style.opacity='0';
	style.display = '';
	style.opacity = '1';
 },
 run: function() {
    var script=GM_config.getAttribute('script');
    if(script && typeof script=='string' && script!='') {
      func = new Function(script);
      window.setTimeout(func, 0);
    }
 },
 addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr) }, false); },
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); },
 toggle : function(e) {
	var node=GM_config.frame.contentDocument.getElementById(e);
	node.style.display=(node.style.display!='none')?'none':'';
	GM_config.setValue(e, node.style.display);
 },
};
GM_config.addTooltip = function(num,nam) {
  if ( cf=this.frame.contentWindow.document.getElementById('config_fields') ) {
    cf.childNodes[num].setAttribute('title',nam);
  }
}



GM_config.init('Unique Youtube Skin Settings',{
  dimmer:  { label: 'Auto Dim Sidebar', title:'Dims sidebar until mouse enter', type: 'checkbox', default: false },
  hider:   { label: 'Auto Hide Sidebar', title:'Scale videos full window size and hide sidebar until mouse scroll or arrow keys pressed', type: 'checkbox', default: true },
  cooler:  { label: 'Cool Black Theme', title:'Make background dark in very cool way', type: 'checkbox', default: true },
 reverser: { label: 'Reverse Layout', title:'Move sidebar right', type: 'checkbox', default: false },
 expander: { label: 'Auto Expand Description', type: 'checkbox', default: false },
 expande2: { label: 'Expand Description onhover', title:'Collapse description and expand auto on mouseover', type: 'checkbox', default: true },
 collapse: { label: 'Collapse Comments', title:'Collapse comments and expand auto on mouseover', type: 'checkbox', default: true },
 collaps2: { label: 'Collapse Related Videos', title:'Collapse related videos and expand on mouseover', type: 'checkbox', default: true },
  relogo:  { label: 'Youtube Logo to Subscriptions', title:'Redirect youtube logo to subscription uploads', type: 'checkbox', default: true },
  ybfixer: { label: 'Search Bar Allways Visible', title:'Make youtube logo and search bar allways visible', type: 'checkbox', default: false },
  sbhider: { label: 'Hide Scrollbar', title:'Hide scrollbar (only for chrome)', type: 'checkbox', default: true },
  vrhider: { label: 'Hide Video Responses', type: 'checkbox', default: true },
  cshider: { label: 'Hide Comments', type: 'checkbox', default: false },
  rvhider: { label: 'Hide Related Videos', type: 'checkbox', default: false },
  ybhider: { label: 'Hide Logo and Search Bar', type: 'checkbox', default: false },
  lbhider: { label: 'Hide Like Bar and View Count', type: 'checkbox', default: false },
  alloper: { label: 'Loop Always On', type: 'checkbox', default: false },
  bypassr: { label: 'Bypass Age Verification', type: 'checkbox', default: true },
  speeder: { label: 'Show Video Size and Buffer Speed', title:'Not working on firefox for now', type: 'checkbox', default: true },
  pbhider: { label: 'Auto Hide Player Controls', type: 'checkbox', default: true },
  hideAnnotations : {
	label : "Hide Annotations",
	type : "checkbox",
	"default" : true
},
  autoBuffer : {
	label : "Auto Play/Buffer",
    title:'OnFocus: Autoplays if video opened in foreground, Buffers if video opened in background',
	type : "select",
	options : {
		"buffer" : "OnFocus",
		"play" : "On",
		"none" : "Off"
	},
	"default" : "buffer"
},
autoHD : {
	label : "Auto HD",
	type : "select",
	options : {
		"240p" : "240p",
		"360p" : "360p",
		"480p" : "480p",
		"720p" : "720p",
		"1080p" : "1080p",
        "default" : "auto"
	},
	"default" : "720p"
},
}, " \
.indent40 { margin-left: auto !important; text-align: center !important; } \
.config_header { font-size: 16pt !important; } \
.section_header { margin:5px 0 5px 0 !important; } \
div.section_header_holder { margin-top: 0 !important; } \
h2.section_header { text-align: left !important; } \
.config_var { padding-left:20px; } \
.config_var .field_label { margin-left: 10px !important; } \
.config_var input[type='checkbox'] { position: absolute !important; left: 15px !important; margin: 1px 4px 0 0 !important; } \
#field_customCSS{ display: block; font: 12px monospace; margin-left: 25px; } ", {
    save: function () {
        location.reload();
    }
});

  if(window.location.href.indexOf("youtube.com/watch") >= 0)         {
 
       if (GM_config.get("hider")) {
    $("#watch7-video").css( "padding-left","0px" );
    $("#watch7-video").css( "padding-right","0px" );
    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask, #lightsOut").css( "display","none" );
    }
if (!GM_config.get("hider")) {    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","block" );} 
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}
GM_addStyle(" \
#guide, #footer-container, #yt-masthead-content #masthead-upload-button-group, #yt-masthead-signin, #yt-masthead-user-displayname, #comments-view .comment .close, #yt-masthead-user .yt-masthead-user-icon, #comments-view .comment .yt-user-photo, #watch-owner-container, .watch7-card-promo, .watch7-playlist-bar-left {display:none;}\
#watch7-video { padding-left: 311px; padding-right: 1px; width: auto; z-index:inherit;}\
#yt-masthead-container.yt-grid-box {border:0px; padding: 0px; width: 311px; float: left; position: relative; z-index: 7; padding-bottom:6px; display:none;}\
#watch7-main-container {padding-left: 0 !important; position: absolute; left: 0; top: 0; float: left; width: 311px; margin-top: 38px; display:none;}\
.sidebar-expanded #watch7-video { width: auto; height:100%;}\
#watch7-video-container {padding-top: 0px; padding-left: 0px !important; position: fixed; width: 100%; height: 100%;}\
#watch7-content {width: 311px;}\
#watch7-main.clearfix { width: auto!important; left: 0px!important; }\
#page.watch {margin-left: 0px!important;}\
#watch7-views-info { position: absolute!important; top: 68px; right: 22px; min-width: 160px!important; max-width: 160px!important; zoom: 0.96!important; -moz-transform: scale(0.96); -moz-transform-origin: 800px 0 0; -o-transform: scale(0.96);}\
#watch7-secondary-actions .yt-uix-button { float:left; height: 3em!important; margin-left: 6px!important;}\
#watch7-user-header {zoom: 0.96; -moz-transform: scale(0.96); -moz-transform-origin: 0 0; -o-transform: scale(0.9); padding: 0px!important; margin-left: 3px;}\
#watch7-user-header .yt-uix-button-subscription-container, #watch7-user-header .ypc-container {margin-left: 10px!important; zoom: 0.9!important; -moz-transform: scale(0.9); -moz-transform-origin: 0 0; -o-transform: scale(0.9);}\
#watch7-sentiment-actions { float: left!important; margin-top: 8px!important; zoom:0.8;  -moz-transform: scale(0.8);  -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
#watch7-headline, #watch7-notification-area, #watch7-user-header { padding: 5px 0!important; border:0px;}\
.action-panel-content {padding: 5px 0!important; width: 310px!important;}\
#watch7-sidebar { float: left!important; width: 300px!important; padding: 0!important; padding-top:20px !important; margin-top: 2px!important; padding-right: 15px!important; margin-left: -4px!important;}\
.watch-wide #watch7-sidebar, .watch-playlist #watch7-sidebar, .watch-branded #watch7-sidebar {margin-top: 20px !important;}\
#watch7-discussion {border: 0px!important; margin-left: 5px; padding: 0!important;}\
#watch7-discussion .comments-post-container {padding-bottom: 0px!important; padding-top: 10px!important; width: 85%; zoom: 0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 0; -o-transform: scale(0.9);}\
#comments-view hr {margin: 0!important;}\
.site-left-aligned #yt-masthead-content {max-width: 244px!important; zoom: 0.9!important;  -moz-transform: scale(0.9); -moz-transform-origin: 0 0; -o-transform: scale(0.9);}\
.site-left-aligned.sidebar-expanded #yt-masthead {margin:0 !important;}\
#yt-masthead #logo-container {margin-left: 0px!important;margin-right: 0px!important;}\
.site-left-aligned.exp-new-site-width #yt-masthead, #yt-masthead, .site-left-aligned #yt-masthead-container {min-width: 311px!important; max-width: 311px!important;}\
#watch7-action-buttons {padding: 0; border:0px; border-bottom:1px solid #E6E6E6;}\
#watch-description.yt-uix-expander-collapsed #watch-description-content {margin-bottom: 8px;}\
#watch-description-expand, #watch-description-collapse {zoom:0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
#watch7-headline.yt-uix-expander-collapsed h1 {white-space: normal;}\
#watch7-headline h1 {font-size: 15px;}\
.comment-list .comment .content {width: 300px;}\
#watch-description-clip {width: 300px;}\
#yt-masthead-user {margin-left: 5px;}\
#watch7-secondary-actions {float: left; margin-top: 22px; zoom: 0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 0;  -o-transform: scale(0.9);}\
#watch7-action-panels {border: 0px;}\
.yt-uix-button-panel {margin-left: 2px;}\
#action-panel-share .share-panel {zoom: 0.8;  -moz-transform: scale(0.8);  -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
.caption-line-text {width: 300px;}\
p.metadata {zoom: 0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8); position: absolute; bottom: -18px; margin-left: -1px;}\
#comments-view .comment-list .comment {margin-bottom:30px !important;}\
#comments-view .comment-actions {zoom: 0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
#comments-view .comment.child, #comments-view .comment .comments-post {margin-left: 0px;}\
.sidebar-expanded .watch7-playlist-bar-right {width: 314px; z-index: 9; left: 0; bottom:0; position: fixed; margin-left: -4px;}\
#yt-masthead-dropdown {position: relative; display: inline-block; border: 7px solid transparent; border-top-color: #999; top: 9px; right:3px;}\
#comments-view h4, #comments-view h4 a {margin: 6px 0;}\
#watch7-playlist-tray, #watch7-playlist-tray-mask {border:0px !important; position: fixed; z-index: 3; width: 346px; height: auto; background: #2B2B2B; left: 0; bottom: 34px; zoom:0.9;  -moz-transform: scale(0.9); -moz-transform-origin: 0 150px 0;  -o-transform: scale(0.9);}\
.watch7-playlist-bar {height:50px; border-top: 0px !important;}\
#watch7-video-container, .watch7-playlist {padding-top:0 !important;}\
#comments-view h4, #comments-view h4 a {margin-top: 15px;}\
#comments-view .comment .close {position:absolute; top:10px; right:10px;}\
.yt-uix-pager, #comments-view .comments-pagination {zoom: 0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);}\
#watch7-playlist-tray { height: 22%; }\
#yt-masthead #search-btn .yt-uix-button-content {margin: 0 8px;}\
body { overflow-x: hidden; }\
#watch7-player {height:100%; width: 100%;}\
.watch-medium #watch7-player {width: 100%; height: 100%;}\
.watch-large #watch7-player {width: 100%; height: 100%;}\
#watch-description.yt-uix-expander-collapsed {cursor: default;}\
.comments-post-alert, .comments-textarea-container textarea {height: 16px;}\
 #comments-view .yt-thumb-square-48 {height: 28px; width: 28px;}\
 #comments-view .comments-textarea-container {margin-left: 38px; width:250px;}\
.yt-uix-button {border:none !important;}\
#comments-view .content, #comments-view .comment.child, #comments-view .comment .child, #comments-view .comment .comments-post, #comments-view .comments-approval-hold-warning, #comments-view .comments-remaining, #comments-view .comments-threshold-countdown {margin-left: 0px; width:300px;}\
.comments-post.has-focus .needs-focus {zoom: 0.9; -moz-transform: scale(0.9); -moz-transform-origin: 0 0;  -o-transform: scale(0.9); margin-right: 16px;}\
.comments-post-buttons {z-index: 2;}\
#page.watch {padding-top: 0px;}\
\ ");
  
  
  
  
  
  
  
  
if (!document.hasFocus ()) { $(window).one("focus", function() { var player = document.getElementById('movie_player'); player.playVideo(); } );  }


$(document).ready(function(){

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// setVar by JoeSimmons
// Syntax: "autoplay=1&hq=0&ads=1".setVar("ads", "0").setVar("hq", "1");
String.prototype.setVar = function(q, v) {
var regex = new RegExp("([\&\?])?"+q+"=[^\&\#]*", "g");
return regex.test(this) ? this.replace(regex, "$1"+q+"="+v) : this+"&"+q+"="+v;
}

String.prototype.getPref = function(s, splitter) {
return this.split(s+"=")[1].split((splitter||"&"))[0];
};

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

function addScript(s, id) {
	var head = document.getElementsByTagName("head")[0],
		aS = document.createElement("script");
	if(!head) {return;}
	aS.setAttribute("type", "text/javascript");
	aS.setAttribute("id", id);
	try {aS.innerHTML = s;} catch(e) {aS.innerText = s;}
	head.appendChild(aS);
}

function main(GM_config) {

function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) c.forEach(function(e) { ret.appendChild(e); });
	return ret;
}

function debug(s) {
	var d=$("debugT");
	if(!d) document.body.insertBefore(d=create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:80%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(create("text",s))), document.body.firstChild);
		else d.innerHTML+="\n\n\n\n"+s;
	if(d.style.display=="none") d.style.display="";
}


var mp = $("movie_player"),
	mpC = mp.cloneNode(true),
	regex = {
		ads:/[&\?]?(ad_(tag)?|infringe|watermark)((?!url)[=]*)?=[&]*/gi,
		begin_end:/(^[\&\?]*)|([\&\?]*$)/g
	},
	opHD = GM_config.get("autoHD"),
	volume = parseInt(GM_config.get("volume"), 10),
	fv = mpC.getAttribute("flashvars").setVar("autoplay", (GM_config.get("autoBuffer")=="play"?"1":"0")).setVar("enablejsapi", "1").setVar("fs", "1").setVar("iv_load_policy", (GM_config.get("hideAnnotations")===true?"3":"1")).setVar("autohide", (GM_config.get("pbhider")===true?"1":"2"));

 if (GM_config.get("autoBuffer")=="buffer" && document.hasFocus ()) { fv = fv.setVar("autoplay","1");}


// find the right/best quality according to the options
switch(opHD) {
	case "720p": fv = fv.setVar("vq", "hd720"); break;
    case "240p": fv = fv.setVar("vq", "small"); break;
	case "360p": fv = fv.setVar("vq", "medium"); break;
	case "480p": fv = fv.setVar("vq", "large"); break;
	case "1080p": fv = fv.setVar("vq", "hd1080"); break;
	case "default": fv = fv.setVar("vq", "default"); break;
	default: fv = fv.setVar("vq", "hd720");
}

//debug(fv.split("&").join("\n\n"));

mpC.setAttribute("flashvars", fv.replace(regex["begin_end"],""));
mp.parentNode.replaceChild(mpC, mp);



	function onYouTubePlayerReady(playerId) {
		g_YouTubePlayerIsReady=true;
		var mp = document.getElementById("movie_player"),
			startTime = mp.getCurrentTime();
		
		// Add the event listeners so functions get executed when the player state/format changes
		mp.addEventListener("onStateChange","stateChange");
		mp.addEventListener("onPlaybackQualityChange","onPlayerFormatChanged");
		
		// Play the video if autobuffer enabled, otherwise just set volume
		if(autobuffer === "buffer") mp.playVideo();
//			else if(volume !== 1000) mp.setVolume(volume);
	}
    
    
	function stateChange() {
		var state = document.getElementById("movie_player").getPlayerState();
		switch(state) {
			case 1: // 1 = playing
				if(alreadyBuffered === false && autobuffer === "buffer") {
                alreadyBuffered = true;
					var mp=document.getElementById("movie_player"),
						vol=mp.getVolume(), // get the current player volume
						muted=mp.isMuted(), // check if it's muted or not
						startTime = mp.getCurrentTime(); // get the current player time
if (document.hasFocus () ) {mp.playVideo();}
 else if( history.length < 2) {
					// Pause the video so it can buffer
                    mp.pauseVideo();

}
					// Seek back to the beginning, or pre-defined starting time (url #t=xx)
					mp.seekTo((startTime <= 3 ? 0 : startTime), true);
					
				}

			break;
		}
	}
	addScript("var alreadyBuffered = false, volume = "+volume+", autobuffer = \""+GM_config.get("autoBuffer")+"\";\n\n"+onYouTubePlayerReady+"\n\n"+stateChange, "stateChange");

}
if(location.href.find("#t=")) location.href = location.href.replace("#t=", "&t=");


// This function waits for the navbar and movie player to
// be ready before starting
main(GM_config);

});

  
  
  
  
  
  
  
  
  
  
function GRT_key(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     typing = (element.type == "text" || element.type == "password");
   } else {
     typing = (elementName == "textarea");
   }
   if (typing) return true;
   if (String.fromCharCode(event.which)=="Z" && !event.ctrlKey && !event.altKey && !event.metaKey) {
       if (GM_config.get("reverser")) {       $("#watch7-video").css( "padding-right","0px" );  $("#watch7-video").css( "padding-left","0px" );   $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","none" ); }else{ 
       $("#watch7-video").css( "padding-left","0px" );  $("#watch7-video").css( "padding-right","0px" );   $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","none" );
 		}
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
       if (String.fromCharCode(event.which)=="X" && !event.ctrlKey && !event.altKey && !event.metaKey) {
       if (GM_config.get("reverser")) {       $("#watch7-video").css( "padding-right","311px" );  $("#watch7-video").css( "padding-left","1px" );   $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","block" ); }else{ 
       $("#watch7-video").css( "padding-left","311px" );  $("#watch7-video").css( "padding-right","1px" );   $(".watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask, #watch7-main-container, #yt-masthead-container").css( "display","block" );
 		}
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
        if (String.fromCharCode(event.which)=="C" && !event.ctrlKey && !event.altKey && !event.metaKey) {
 
GM_config.open();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }  
 }

if (GM_config.get("hider")) {
document.addEventListener("keydown", GRT_key, false);
$("#watch7-video").bind('mousedown', function(e) { 
   if( (e.which == 2) ) {
      e.preventDefault();
      if (GM_config.get("reverser")) {        $("#watch7-video").css( "padding-right","0px" );  $("#watch7-video").css( "padding-left","1px" );  $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","none" ); }
      else  { $("#watch7-video").css( "padding-left","0px" );  $("#watch7-video").css( "padding-right","1px" );  $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","none" );
}
}});
$(window).mousemove(function(e) {
   var now = e.pageX;
   var past =  $(window).width()-20;
   if(now > past) {   $("#lightsOut, #watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","none" );  $("#watch7-video").css( "padding-left","0px" ); $("#watch7-video").css( "padding-right","0px" );
  }
});
}

if (GM_config.get("reverser")) {
    $("#watch7-video").css( "padding-right","311px" );
    $("#watch7-video").css( "padding-left","0px" );
    $("#watch7-main-container, #yt-masthead-container").css( "right","0" );
    $("#watch7-main-container, #yt-masthead-container").css( "left","auto" );
    $("#watch7-main-container, #yt-masthead-container").css( "float","right" );
    $("#watch7-playlist-tray, #watch7-playlist-tray-mask").css( "right","0" );
    $("#watch7-playlist-tray, #watch7-playlist-tray-mask").css( "left","auto" );
    $(".sidebar-expanded .watch7-playlist-bar-right").css( "right","0" );
    $(".sidebar-expanded .watch7-playlist-bar-right").css( "left","auto" );
}                 
if (GM_config.get("sbhider")) {
   $(document).ready(function() {
       GM_addStyle("::-webkit-scrollbar { display: none !important; }" );
       });
 }      
function addLightsButton()
{
    var offButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe1JREFUeNpkU02rcVEUXuc4vkOGRAwpZSgxUZShuQm/4vYO3pzzdsd+jCjyF5QiKQMkmSDymc/97meVm3vvqtXe7bOetZ71rHUUIQS9bLPZVNbrtb7f7wl+Pp/p8XiQ2WymYDCoRyIR4xWrvIDj8VhcLhdyOp1ks9nIYrGQoiiEN5mM+v0+x+Xzed3tdhsMHAwGwuFwkNfrpefzSff7nR3V8B2JkLDT6dBwOKRSqaQrk8lEgFIgEKDr9cqVQA0nDBW32y17OBymWq1GHo+H1NlsxheAQE3TNK4CABwM7HY7mUwmGo1GlEwmmba22+2YyvF4JFVVv1HECSCSrlYr7jUUCrFoGqocDgeyWq3U7Xb5BFUkARhBOJfLJbeDQmClgTcopFIpDsAH0Hr1h17lmPgei8Wo3W6THAup0WhUx6NUlhKJxBfodruxwwDOZrM0nU45LpfLVTRJyUin09RoNHQEoVdIz3Skw7AMi8WCWq0Wj8Llcv37WgBsTbPZ1CEAgOgR4qDnXq9HcuhULpd1v99vfNsc2Hw+r9TrdR10oSKqn04nrlatVv9K0OcrVqU3k6oZUBjjgYJyP0kG8xzfQTCNfhhWz+fzUTweJywHhi17ol8Gqu8uaf0pFotCKicymYwoFApC/gAfP+P+CzAAmPhAEzyJ4TsAAAAASUVORK5CYII=";
    var overButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoFJREFUeNpsUltLVFEU/vY5e67OTVMnqSxBKHLK1BBS6gdED+FT89ZLPfVcoNCciaIbBPVeD12g6KWwwgtCFJJBhRReEhlpsshRZ5wZz5mZc/bMbs3IhFmLvdjszfet9a0Lk1KiaunEbKSYWdBUsQJZWIM00xD5HAoCkL6QtqsrHK1iWZlo5rMR/eeE5nYUoToDYA5y7gZjDKW8AZGKQZ9/iUxWR23PgOYPtkaZsAqRdGxQ89YFofp2U6wSHZ1SmJAls/JmNj8FacD65COszAwhePKBxhJzQ9LnErAHOwhogCkuQPFs3GTlP2l+R8mKg3uOYPnVRayaTigsPQ3V00wIg4RzcmclS4VADinAVB/9cYj1Ufg6T0NZfAfOCkkoDi9KYolINuLkIItFugWktKgJJFkxUCzEIK152P09BMmBF/ImRDYBHvDATDwmiW7kPsxRAspMxGJmCTXHuqlJM7D5O2AmlygQh2J5QzAW3pCc7ZTFQubFEzgONcAR8sC+3wZ3716k7l9FqbAKvq0PyYmHsOrboezsCt9Ir/yCPjsMR9MZKrHcFJqtSvXxcncllBov3Hv6kZ2cRHJqBM3H+zWuqvyCv/OskRy/pkEy2LwHNiZcdFF9zkoQXteNzKd5/Bi9hZoT17VAsCXKqpuTXJyOLL+9o/lyC6htscG+T1RmWYoF8H14HCl7C4J9N7UdbUejfzanal8/T0TGnt3VfPWN0PXXWNctJFJt+Db1EZdv39Na2w7/vXKbLdJ/TraGekmqAiOnI2vk8H7sOZ4OjrDNOI4tJmmETcFGtB9sRzwex5epafB/UP8hhsOntEj0iramCwhhwWUHogPnL23F/RZgALZtJ5mXblnLAAAAAElFTkSuQmCC";
    var spanSubscriptionContainer = document.evaluate("//div[contains(@id,'watch7-user-header')]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    spanSubscriptionContainer.appendChild(document.createTextNode("\n"));
    var buttonLights = spanSubscriptionContainer.appendChild(document.createElement('button'));
    buttonLights.setAttribute('class', 'yt-subscription-button  yt-uix-button yt-uix-button-hh-default yt-uix-tooltip');
    buttonLights.setAttribute('id', 'lights');
    buttonLights.setAttribute('style', 'padding: 0px 6px; opacity:1; zoom:0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);');
    var imgLights = buttonLights.appendChild(document.createElement('img'));
    imgLights.alt = '';
    imgLights.src = offButton;
    if (spanSubscriptionContainer) {
        imgLights.setAttribute('style', 'padding: 0px 0px;');
    }
    buttonLights.addEventListener('mouseover', function() { imgLights.src = overButton; }, false);
    buttonLights.addEventListener('mouseout', function() { imgLights.src = offButton; }, false);
    buttonLights.setAttribute('onclick', '; return false;');
    buttonLights.addEventListener('click', function() { lightsOut(); }, false);
    if (location.href.match(/youtube\.com\/user\//i)) {
        var divPlayer = document.evaluate("//div[@id='player-container']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    } else {
        var divPlayer = document.evaluate("//div[@id='watch7-player']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    }
    if (divPlayer) {
        divPlayer.style.zIndex = "200";
    }
}
function lightsOut()
{
    var lightImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlOzEo46UAAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
    var mediumImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlPNpTNmawAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
    var darkImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUCAgJ4xuoaAAAAAXRSTlPnfoivvQAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
    var outImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUCAgJ4xuoaAAAADklEQVQYlWNgGAWDCQAAAZAAAdjzlT8AAAAASUVORK5CYII=";
    
    if(!document.getElementById('lightsOut')) {
        var imgLightsOut = document.createElement('img');
         if (GM_config.get("dimmer")) {
            imgLightsOut.src = mediumImg; 
        }else {
            imgLightsOut.src = mediumImg; 
        }
        imgLightsOut.setAttribute('id', 'lightsOut');
        if (GM_config.get("reverser")) {
        imgLightsOut.setAttribute('style', 'position:fixed;top:0;right:0;width:311px;height:' + document.documentElement.scrollHeight + 'px;z-index:199;');
            }else {
        imgLightsOut.setAttribute('style', 'position:fixed;top:0;left:0;width:311px;height:' + document.documentElement.scrollHeight + 'px;z-index:199;');
                }
        imgLightsOut.addEventListener('click', function () { 
          document.body.removeChild(document.getElementById('lightsOut'));     
        }, false);
        document.body.appendChild(imgLightsOut);
    } else {
        document.getElementById('lightsOut').src = mediumImg;
    }
}
addLightsButton();
if (GM_config.get("dimmer")) {
lightsOut();
$("#lightsOut").one("mouseenter", function() {
    $("#lightsOut").remove();
    });
}
 if (GM_config.get("hider")) {
    $("#watch7-video").css( "padding-left","0px" );
    $("#watch7-video").css( "padding-right","0px" );
    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask, #lightsOut").css( "display","none" );
    }
if (!GM_config.get("hider")) {    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","block" );}     
if (!GM_config.get("reverser")) {
    $(window).bind('mousewheel', function () { $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","block" );   $("#watch7-video").css( "padding-left","311px" );  $("#watch7-video").css( "padding-right","1px" );  } );
    $(window).bind('DOMMouseScroll', function () { $("#watch7-video").css( "padding-left","311px" );  $("#watch7-video").css( "padding-right","1px" );    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","block" );} );
    }
else {
    $(window).bind('mousewheel', function () { $("#watch7-video").css( "padding-right","311px" );    $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","block" );} );
    $(window).bind('DOMMouseScroll', function () { $("#watch7-video").css( "padding-right","311px" );   $("#watch7-main-container, #yt-masthead-container, .watch7-playlist-bar-right, #watch7-playlist-tray, #watch7-playlist-tray-mask").css( "display","block" );} );
    }
    
if(document.getElementById("watch7-ytcenter-buttons")) {
        $("#watch7-ytcenter-buttons").css( "zoom","0.8" );
        $("#watch7-ytcenter-buttons").css( "-moz-transform","scale(0.8)" );
        $("#watch7-ytcenter-buttons").css( "-moz-transform-origin","0 0" );
        $("#watch7-views-info").css( "top","88px" );
    }
if (GM_config.get("cshider")) {
    GM_addStyle("#watch7-discussion {display:none;}" );
 }
if (GM_config.get("rvhider")) {
    GM_addStyle("#watch7-sidebar {display:none;}" );
 }
if (GM_config.get("ybhider")) {
    GM_addStyle("#watch7-main-container {margin-top: 0px; z-index:8;}" );
 }
if (GM_config.get("ybfixer")) {
    GM_addStyle("#yt-masthead-container.yt-grid-box {position:fixed; }" );
 }
if (GM_config.get("lbhider")) {
    GM_addStyle("#watch7-views-info, watch7-sentiment-actions {display:none;}" );
 }
if(document.getElementById("watch7-playlist-tray")) {
var togb = document.createElement('button');
	togb.setAttribute('class','yt-subscription-button  yt-uix-button yt-uix-button-hh-default yt-uix-tooltip');
	togb.setAttribute('title','Toggle Playlist');
    togb.setAttribute('style', 'padding: 0px 6px; opacity:1; zoom:0.8; -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);');
    var togplace = document.getElementById("watch7-user-header");
	togplace.appendChild(togb);
	togb.addEventListener('click', function() { toggle(); }, false);
var offButton4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/ElEQVR4nJTy/0f7/////58v1zWzbVcGBZQAIoKCSZUNkCwZw1WZ2MhUWQYm0CR13RJWWwLSZsxAywBMigAGMKp1BdtWa9u2666X6/Waa7bpqutVOnPhwulyOZ7Pp/P5jKAXmUxGZzabCYvF0s5ms0aSJHWgEM1mk7fZbJ8IIVFSh/pPTCbTNM/z6/l83lsul5cxxktKAL1eL+ZyuXMAuJcBOI4bA4CFQqGgMxqNEwRBzCtVIIrfiW9/AaxWaxwA4r0/+73zZwwqSCQSkwihZYTQkSiKi9JR+k4QhCgIQsLpdOZlFjDGswAQ4DguotVqVwBgUyW/5OENAOQAiqIuksnkJUVRPAB4o9HojpoBj8fD9aUBgKbpUYZh5gDgJhwOT7Xb7RklgDQ+mqazPp+vKAMIgrDK8zwdCoXuut3uFkLIpVYBQmgXAE5lgEajEcEYp4LBYNXv92+TJHmoZgFj/NKXBoBarWbQarXSLhQxxuZ6vT6uBOB5HnieLwFAVwZACG1wHHfsdrtHBEE44DhuTa0ChNCe1DYZQBTFq06n8xiLxcoulytgMBiulSxgjEGv1z/1pQGAYZiWRqN5le6VSuWDZdlntR5Uq9VWX/ppQVoc2uFwDBMEcSIIwv+mwLJsiiCIUjqdfrfb7WcIoQcVgLTKWQAAAICvAAAA//96ftTcfjndfQAAAABJRU5ErkJggg==";
var imgLights4 = togb.appendChild(document.createElement('img'));
    imgLights4.alt = 'Toggle Playlist';
    imgLights4.setAttribute('style', 'padding: 0px 0px; height:16px');
    imgLights4.src = offButton4;
} 
function toggle() {
var comments = document.getElementById("watch7-playlist-tray");
if (comments.style.height == "55%") {
	comments.style.height = "22%";    
} else {
	comments.style.height = "55%";
	}
} 
                

if (!GM_config.get("alloper")) {
myScript10 = function() {

	var ytLoop = false;
	var ytPlayList;
	var ytPLIndex;
	var lpButton = "yt-subscription-button  yt-uix-button yt-uix-button-hh-default yt-uix-tooltip"; // Button stuff
	var lpConOff = "LoopyOff"
	var lpConOn = "LoopyOn";

	loopy = document.createElement("button");
	loopy.id = "eLoopy";
	loopy.setAttribute("onClick", "LoopyOnOff(); return false;");
	loopy.setAttribute("class", lpButton);
	loopy.setAttribute("role", "button");
	loopy.setAttribute("data-button-toggle", "true");
	loopy.setAttribute("type", "button");
	loopy.setAttribute('style', 'padding: 0px 0px; opacity:1; zoom:0.8; -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);');
	loopy.id = "loopyButton";

	a = document.createElement("span");
	 a.innerHTML = '<img height=18 width=27 id="loopyContent" class="LoopyOff" src="http://i.imgur.com/sBzSU.png" alt="Loopy"/><span class="yt-uix-button-valign"/>';


	loopy.appendChild(a);

	window.setTimeout(function() { initLoopy(true); }, 2500);
	window.setTimeout(function() { initLoopy(false); }, 3000);
	window.setTimeout(function() { initLoopy(false); }, 3500);

		function initLoopy(addElement) {
			if (addElement) { document.getElementById("watch7-user-header").appendChild(loopy); }
			ytPlayer = document.getElementById("movie_player");
			ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
			}

	onPlayerStateChange = function(newState) {
		if (ytLoop && newState == "0"){
				window.setTimeout(function() { ytPlayer.playVideo(); }, 360);
			}
	}

	LoopyOnOff = function() {
		if (ytLoop) {
//			document.getElementById("loopyButton").setAttribute("data-tooltip-text", "Enable auto loop");
			document.getElementById("loopyButton").setAttribute("data-button-toggle", "true");
			document.getElementById("loopyContent").setAttribute("class", lpConOff);

			ytLoop = false;
		} else {
//			document.getElementById("loopyButton").setAttribute("data-tooltip-text", "Disable auto loop");
			document.getElementById("loopyButton").setAttribute("data-button-toggle", "false");
			document.getElementById("loopyContent").setAttribute("class", lpConOn);
			ytLoop = true;
		}
	}

	function getCookie(name) {
		var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		if (results) {
			return unescape(results[2]);
		} else {
			return null;
		}
	}

	function setCookie(name, value) {
		document.cookie = name + "=" + escape(value);
	}


};

document.body.appendChild(document.createElement("script")).innerHTML = "("+myScript10+")()";
}
else {
myScript9 = function() {

	var ytLoop = true;
	var ytPlayList;
	var ytPLIndex;
	var lpButton = "yt-subscription-button  yt-uix-button yt-uix-button-hh-default yt-uix-tooltip"; // Button stuff
	var lpConOff = "LoopyOff"
	var lpConOn = "LoopyOn";

	loopy = document.createElement("button");
	loopy.id = "eLoopy";
	loopy.setAttribute("onClick", "LoopyOnOff(); return false;");
	loopy.setAttribute("class", lpButton);
	loopy.setAttribute("role", "button");
	loopy.setAttribute("data-button-toggle", "true");
	loopy.setAttribute("type", "button");
	loopy.setAttribute('style', 'padding: 0px 0px; opacity:1; zoom:0.8; -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);');
	loopy.id = "loopyButton";

	a = document.createElement("span");
	 a.innerHTML = '<img height=18 width=27 id="loopyContent" class="LoopyOff" src="http://i.imgur.com/sBzSU.png" alt="Loopy"/><span class="yt-uix-button-valign"/>';


	loopy.appendChild(a);

	window.setTimeout(function() { initLoopy(true); }, 2500);
	window.setTimeout(function() { initLoopy(false); }, 3000);
	window.setTimeout(function() { initLoopy(false); }, 3500);

		function initLoopy(addElement) {
			if (addElement) { document.getElementById("watch7-user-header").appendChild(loopy); }
			ytPlayer = document.getElementById("movie_player");
			ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
			}

	onPlayerStateChange = function(newState) {
		if (ytLoop && newState == "0"){
				window.setTimeout(function() { ytPlayer.playVideo(); }, 60);
			}
	}

	LoopyOnOff = function() {
		if (ytLoop) {
//			document.getElementById("loopyButton").setAttribute("data-tooltip-text", "Enable auto loop");
			document.getElementById("loopyButton").setAttribute("data-button-toggle", "true");
			document.getElementById("loopyContent").setAttribute("class", lpConOff);

			ytLoop = false;
		} else {
//			document.getElementById("loopyButton").setAttribute("data-tooltip-text", "Disable auto loop");
			document.getElementById("loopyButton").setAttribute("data-button-toggle", "false");
			document.getElementById("loopyContent").setAttribute("class", lpConOn);
			ytLoop = true;
		}
	}

	function getCookie(name) {
		var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		if (results) {
			return unescape(results[2]);
		} else {
			return null;
		}
	}

	function setCookie(name, value) {
		document.cookie = name + "=" + escape(value);
	}

};

document.body.appendChild(document.createElement("script")).innerHTML = "("+myScript9+")()";
}


var toge = document.createElement('button');
toge.setAttribute('style', 'padding: 0px 5px; opacity:1; zoom:0.8;  -moz-transform: scale(0.8); -moz-transform-origin: 0 0; -o-transform: scale(0.8);');
toge.setAttribute('class','yt-subscription-button  yt-uix-button yt-uix-button-hh-default yt-uix-tooltip');
var togplacese = document.getElementById("watch7-user-header");
	togplacese.appendChild(toge);
	toge.addEventListener('click', function() { GM_config.open() }, false);
var offButton2 = "data:image/png;base64,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";
var imgLights2 = toge.appendChild(document.createElement('img'));
    imgLights2.alt = '';
    imgLights2.src = offButton2;
    imgLights2.setAttribute('style', 'padding: 0px 0px;');
function toggles3() {
GM_config.open()
}
if (GM_config.get("expander")) {
  $("#watch-description-content").css( "height","auto" );
  $("#watch-description-expand, #watch-description-collapse").css( "display","none" );
  $("#watch-description-extras").css( "display","block" );
    }
var timer;
if (GM_config.get("expande2")) {
  $("#watch-description-expand, #watch-description-collapse").css( "display","none" );
  $("#watch-description").on( 'mouseenter', function(){
    timer = setTimeout(function () { $("#watch-description-content").css( "height","auto" );  $("#watch-description-extras").css( "display","block" ); }, 700);
});
    $('#watch-description').mouseleave(function() {
    clearTimeout(timer);
});
    }
if (GM_config.get("vrhider")) {
 $("#comments-view .video-list, .comments-section-description").css( "display","none" );
    }
if (GM_config.get("collapse")) {
 $("#comments-view").css( "max-height","300px" ); 
 $("#comments-view").css( "overflow","hidden" );  
 $("#comments-view").on( 'mouseenter', function(){
    timer2 = setTimeout(function () {  $("#comments-view").css( "height","auto" ); $("#comments-view").css( "max-height","none" ); }, 700);
}); 
    $('#comments-view').mouseleave(function() {
    clearTimeout(timer2);
}); 
}         
if (GM_config.get("collaps2")) {
 $("#watch7-sidebar").css( "height","230px" ); 
 $("#watch7-sidebar").css( "overflow","hidden" );       
 $("#watch7-sidebar").on( 'mouseenter', function(){
    timer3 = setTimeout(function () {  $("#watch7-sidebar").css( "height","auto" ); $("#watch7-sidebar").css( "opacity","0.9" );  }, 700);
}); 
        $('#watch7-sidebar').mouseleave(function() {
    clearTimeout(timer3);
}); 
} 

if (!GM_config.get("cooler")) {
GM_addStyle("#watch7-content, #watch7-headline, #watch7-notification-area, #watch7-user-header, #watch7-action-panels #watch7-action-panel-footer, .watch-branded #watch7-sidebar, #watch7-sidebar, #watch7-video-container {background:#F1F1F1;}" ); 
}

$(document).ready(function(){
function bytesToSize(bytes, precision)
    {  
        var kilobyte = 1024;
        var megabyte = kilobyte * 1024;
        var gigabyte = megabyte * 1024;
        var terabyte = gigabyte * 1024;
       
        if ((bytes >= 0) && (bytes < kilobyte)) {
            return (bytes / megabyte).toFixed(2) + ' MB';
     
        } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
            return (bytes / megabyte).toFixed(2) + ' MB';
     
        } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
            return (bytes / megabyte).toFixed(precision) + ' MB';
     
        } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
            return (bytes / gigabyte).toFixed(precision) + ' GB';
     
        } else if (bytes >= terabyte) {
            return (bytes / terabyte).toFixed(precision) + ' TB';
     
        } else {
            return bytes + ' B';
        }
    }
	
var d=1;
var lastbytes=0;
var loadedbytes=0;
var totalbytes=0;
var startedbytes=0;
function bytesloaded() {
    if(elem = document.getElementById('movie_player')) {
	
		if (typeof elem.getVideoBytesTotal == 'function') {
		//if (elem.getVideoBytesTotal()) {
			totalbytes = elem.getVideoBytesTotal();
			loadedbytes = elem.getVideoBytesLoaded();
			//if (loadedbytes > 0) {
			//alert(d);
				if (d < 4) {
					/*
					var now = elem.getVideoBytesLoaded();
					var tot = (now-lastbytes2)*4;
					lastbytes2 = now;
					document.getElementById('bufferspeed').innerHTML = bytesToSize(tot) + "/s";
					*/
					
					

					if (document.getElementById('bytesload')) {
						document.getElementById('bytesload').innerHTML = bytesToSize(loadedbytes);
						document.getElementById('bytestotal').innerHTML = bytesToSize(totalbytes);
						d++;
					}
					else {
						document.getElementById('watch-headline-title').innerHTML +=  '<BR><span style="font-size:10px; font-weight:normal; opacity:0.5;" id="bytesload"></span>&nbsp;<span style="font-size:10px; font-weight:normal; opacity:0.5;">/</span>&nbsp;<span style="font-size:10px; font-weight:normal; opacity:0.5;" id="bytestotal"> </span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:10px; font-weight:normal; opacity:0.5;" id="bufferspeed"></span>';						
                        document.getElementById('bytesload').innerHTML = bytesToSize(loadedbytes);
						document.getElementById('bytestotal').innerHTML = bytesToSize(totalbytes);
					}
				}
				else if (d == 4) {
					var now = elem.getVideoBytesLoaded();
					var tot = (now-lastbytes)/4;
					lastbytes = now;
					document.getElementById('bufferspeed').innerHTML = bytesToSize(tot) + "/s";
					document.getElementById('bytesload').innerHTML = bytesToSize(loadedbytes);
					document.getElementById('bytestotal').innerHTML = bytesToSize(totalbytes);
					d=1;
				}
			//}
			//alert(bytesToSize(loadedbytes) + "/" + bytesToSize(totalbytes));""
		//}
		}
	}
    setTimeout(function () {
        bytesloaded();
    }, 1000);
}
if (GM_config.get("speeder")) {
bytesloaded();
}
});






/*
if (!GM_config.get("reverser")) {
myScript = function()
{
	function checkVideo()
	{
		var player = document.getElementById('movie_player');
		if( player.getPlayerState() == 0)
		{
         document.getElementById("watch7-video").style.paddingLeft="311px"  
         document.getElementById("watch7-main-container").style.display="block" 
         document.getElementById("yt-masthead-container").style.display="block"
         document.getElementById("lightsOut").style.display="none"
        }
	}
	setInterval(checkVideo,100);
}
document.body.appendChild(document.createElement("script")).innerHTML = "("+myScript+")()"; }
if (GM_config.get("reverser")) {
myScript2 = function()
{
	function checkVideo2()
	{
		var player = document.getElementById('movie_player');
		if( player.getPlayerState() == 0)
		{
         document.getElementById("watch7-video").style.paddingRight="311px"  
         document.getElementById("watch7-main-container").style.display="block"
         document.getElementById("yt-masthead-container").style.display="block"
         document.getElementById("lightsOut").style.display="none"
		}
	}
	setInterval(checkVideo2,100);
}
document.body.appendChild(document.createElement("script")).innerHTML = "("+myScript2+")()"; }  
if (!GM_config.get("cooler")) {
    GM_addStyle("#watch7-video-container  {background-image: none !important; background-color:transparent !important;}" );
}
*/



//
//
//

//meshur
}
//silme

for (var ems = document.embeds, i = 0, em; em = ems[i]; i++) {
	em.setAttribute('wmode', 'direct');
	var nx = em.nextSibling, pn = em.parentNode;
	pn.removeChild(em);
	pn.insertBefore(em, nx);
}


if (GM_config.get("relogo")) {
document.getElementById("logo-container").href = "/feed/subscriptions/u";
}
if (GM_config.get("cooler")) {
(function() {
var css7 = "#watch7-sidebar, p.metadata, #comments-view .comment-actions {\nopacity:0.5;\n}\n.feed-item-main a.title {\ncolor: #D02525;\n}\nbody .yt-uix-button-subscribe-branded, body .yt-uix-button-subscribed-branded {\nborder: 1px solid #333;\n}\n.yt-uix-button-subscribe-branded .yt-uix-button-content {\ncolor: #999;\n}\n.yt-subscription-button-subscriber-count-branded-horizontal, .yt-subscription-button-subscriber-count-unbranded-horizontal {\ncolor: #999; background-color: #333; border: 1px solid #333;\n}\n.yt-uix-button-subscribe-branded, #masthead-search-terms input, .comments-textarea {\n    background: #333 !important;\n}\nbody, #yt-masthead-container, #watch7-video-container, #watch7-content, #watch7-headline, #watch7-notification-area, #watch7-user-header, #watch7-action-panels #watch7-action-panel-footer, .branded-page-v2-primary-col, .watch-branded #watch7-sidebar {\n    background: url(\"http://z4.ifrm.com/30093/71/0/f5254725/refreshbg.png\") repeat #040404 !important;\n}\n#yt-masthead #logo, #footer-hh-logo img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -36px -51px !important;\n width: 72px !important;\n}\n#yt-masthead-container.yt-grid-box {\n border:none !important;\n}\n.lohp-large-shelf-container, .lohp-medium-shelves-container, .lohp-newspaper-shelf, .lohp-shelf-cell-container.last-shelf-in-line, .lohp-shelf-cell-container.lohp-category-shelf  {\n border-color: #0A0A0A!important;\n}\n.lohp-shelf-title {\n color: #CCCCCC !important;\n}\n.lohp-shelf-cell-container:hover {\n background-color: #444444 !important;\n}\n#feed .no-recent-activity {\n height: 700px !important;\n margin: 0 !important;\n padding-top:13px !important;\n}\n#channel-subheader {\n border-color: #0A0A0A !important;\n}\n.channel-header .branded-page-header-title .spf-link {\n color: #CCCCCC !important;\n}\n#channel-search .show-search img, #channel-search .yt-uix-button-icon-search {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -16px -242px !important;\n}\n.c4-box, #video-page-subnav {\n border-color: #0A0A0A !important;\n}\n#page.feed .branded-page-v2-primary-col {\n background: white !important;\n}\n.branded-page-module-title, .branded-page-module-title a:visited, .branded-page-module-title a {\n color: #CCCCCC !important;\n}\n.time-published {\n color: #CCCCCC !important;\n}\n.profile {\n border-color: #0A0A0A !important;\n}\n#masthead-search-terms, .guide-quick-filter {\n background:#333 !important;\n}\n#masthead-search-terms input, .guide-quick-filter {\n color: #FFFFFF !important;\n text-shadow: 0 1px 1px #333333 !important;\n}\n.masthead-search-terms-border, .guide-quick-filter {\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.yt-uix-button-default, .yt-uix-button-hh-default, .yt-uix-button-subscription, a.yt-uix-button-default .yt-uix-button-content, a.yt-uix-button-hh-default .yt-uix-button-content {\n color: #CCCCCC !important;\n}\n.yt-masthead-hh #masthead-search .search-btn-component .yt-uix-button-content {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -16px -242px !important;\n}\n.yt-uix-button-default, .yt-uix-button-hh-default, .yt-uix-button-subscription, .yt-uix-button-panel:hover .yt-uix-button-text, .yt-uix-button-panel:hover .yt-uix-button-hh-text, body .yt-uix-button-default[disabled], body .yt-uix-button-hh-default[disabled] {\n text-shadow:0 1px 0 rgba(0,0,0,.45) !important;\n border-color:#454545 !important;\n background-color:#2B2B2B !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n}\nbody #masthead-expanded-container {\n background:#121212 !important;\n border-bottom: 1px solid #222222 !important;\n box-shadow:0 5px 5px #222222 !important;\n}\n#masthead-expanded .yt-uix-slider-next:active,#masthead-expanded .yt-uix-slider-prev:active,#masthead-expanded .yt-uix-slider-next:focus,#masthead-expanded .yt-uix-slider-prev:focus {\n -moz-box-shadow:inset 0 1px 1px #555 !important;\n -ms-box-shadow:inset 0 1px 1px #555 !important;\n -webkit-box-shadow:inset 0 1px 1px #555 !important;\n box-shadow:inset 0 1px 1px #555 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#000000,EndColorStr=#1F1F19) !important;\n background-image:-moz-linear-gradient(bottom,#000000 0,#1F1F19 100%) !important;\n background-image:-ms-linear-gradient(bottom,#000000 0,#1F1F19 100%) !important;\n background-image:-o-linear-gradient(bottom,#000000 0,#1F1F19 100%) !important;\n background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#000000),color-stop(100%,#1F1F19)) !important;\n background-image:-webkit-linear-gradient(bottom,#000000 0,#1F1F19 100%) !important;\n background-image:linear-gradient(to top,#000000 0,#1F1F19 100%) !important;\n}\n#yt-masthead-user-displayname {\n color: #CCCCCC !important;\n}\n\n#guide {\n background:#272727 !important;\n}\n.guide-item, .guide-header-item {\n color:#888888 !important;\n}\n#guide-container .guide-item.guide-item-selected, #guide-container .guide-item.guide-item-selected:hover {\n color:#FFFFFF !important;\n}\n#guide-container .guide-notification-enabled .guide-item, #guide-container .guide-notification-enabled .guide-item:hover, .collapsed .guide-notification-enabled.guide-module-toggle-icon {\n background: #84A345 !important;\n color: #FFFFFF !important;\n}\n.guide-section-separator {\n border-bottom: 1px solid #040404 !important;\n}\n.branded-page-v2-col-container {\n background: transparent !important;\n border-left: 1px solid #222222 !important;\n}\n.branded-page-related-channels h3 a, .branded-page-related-channels h3 {\n color: #CCCCCC !important;\n}\n.branded-page-related-channels h2 a:hover, .branded-page-related-channels h3 a:hover, .branded-page-related-channels-item .yt-uix-button-link:hover {\n color: #438BC5 !important;\n}\n.guide-module.collapsed .guide-module-toggle:hover, .guide-module.collapsed .guide-module-toggle:hover .context-back-link {\n color: #CCCCCC !important;\n}\n#guide-main .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -71px -506px !important;\n}\n#guide-main .guide-module-toggle:hover .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -71px -486px !important;\n}\n#watch-context-container .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -91px -498px !important;\n}\n#watch-context-container .guide-module-toggle-icon:hover img, #watch-context-container.collapsed .guide-module-toggle:hover .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -20px -116px !important;\n}\n.guide-module-toggle-icon .guide-module-toggle-arrow{\n border-right-color: #666666 !important;\n}\n.guide-module-toggle-icon:hover .guide-module-toggle-arrow{\n border-right-color: #999999 !important;\n}\n.feed-header {\n border-bottom: none !important;\n}\n#social-promo h4 {\n color: #999999 !important;\n}\n#social-promo .social-service-status {\n color: #999999 !important;\n}\n\n#social-promo li {\n width: 120px !important;\n}\n.filter-match {\n color: #CCCCCC !important;\n}\n.guide-quick-filter-clear img {\n background: no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -94px -654px !important;\n}\n.yt-uix-button-subscribe-unbranded, .yt-uix-button-context-light .yt-uix-button-subscribed-branded, .yt-uix-button-context-light .yt-uix-button-subscribed-unbranded {\n border-color:#333 !important;\n background-image:-moz-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-ms-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-o-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#444)) !important;\n background-image:-webkit-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:linear-gradient(to bottom,#333 0,#444 100%) !important;\n}\n.yt-uix-button-subscribe-branded {\n border-color:#333 !important;\n background-image:-moz-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-ms-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-o-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#444)) !important;\n background-image:-webkit-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:linear-gradient(to bottom,#333 0,#444 100%) !important;\n}\n.yt-uix-button-subscribe-branded .yt-uix-button-content {\n color: #CCCCCC !important;\n text-shadow: 0 1px 0 #000000 !important;\n}\n.yt-uix-button-subscribe-branded:hover, .yt-uix-button-subscribe-branded:active {\n border-color: #CCCCCC !important;\n}\n.yt-subscription-button-subscriber-count-branded-vertical:after, .yt-subscription-button-subscriber-count-unbranded-vertical:after {\n border-color: #333333 transparent !important;\n}\n.yt-subscription-button-subscriber-count-unbranded-vertical {\n border-color: #AAAAAA transparent !important;\n}\n.yt-subscription-button-subscriber-count-unbranded-horizontal, .yt-subscription-button-subscriber-count-unbranded-vertical {\n border: 1px solid #333 !important;\n color: #A8A8A8 !important;\n}\n.yt-subscription-button-subscriber-count-branded-horizontal:after, .yt-subscription-button-subscriber-count-unbranded-horizontal:after {\n border-color:transparent #3B3B3B !important;\n}\n.yt-subscription-button-subscriber-count-branded-vertical, .yt-subscription-button-subscriber-count-unbranded-vertical, .yt-subscription-button-subscriber-count-branded-horizontal, .yt-subscription-button-subscriber-count-unbranded-horizontal {\n border: 1px solid #333 !important;\n background-image:-moz-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-ms-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-o-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#444)) !important;\n background-image:-webkit-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:linear-gradient(to bottom,#333 0,#444 100%) !important;\n}\n.yt-uix-button-subscribed-unbranded .yt-uix-button-icon-subscribe-unbranded,.yt-uix-button-context-light .yt-uix-button-subscribed-branded .yt-uix-button-icon-subscribe-branded {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -81px -654px !important;\n}\n.yt-uix-button-subscribed-branded.hover-enabled:hover, .yt-uix-button-subscribed-unbranded.hover-enabled:hover, .yt-uix-button-subscribed-unbranded.hover-enabled:hover {\n background:#A9382E !important;\n border:1px solid #880904 !important;\n}\n.subscribed-hh-label {\n color:#CCCCCC !important;\n}\n.unsubscribe-hh-label {\n color:#FFFFFF !important;\n}\n.yt-uix-button-subscribed-branded.hover-enabled:hover .yt-uix-button-icon-subscribe-branded, .yt-uix-button-subscribed-unbranded.hover-enabled:hover .yt-uix-button-icon-subscribe-unbranded {\n background:url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") no-repeat scroll 0 -654px transparent !important;\n}\n.yt-uix-button-subscribe-unbranded:hover, .yt-uix-button-subscribe-unbranded:focus, .yt-uix-button-subscribe-unbranded:active {\n background-image:-moz-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:-ms-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:-o-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#555)) !important;\n background-image:-webkit-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:linear-gradient(to bottom,#333 0,#555 100%) !important;\n color: #AAAAAA !important;\n}\nbutton.yt-uix-button.addto-watch-later-button-success {\n background-image:-moz-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:-ms-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:-o-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#74a446),color-stop(100%,#4d7730)) !important;\n background-image:-webkit-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:linear-gradient(to bottom,#74a446 0,#4d7730 100%) !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#74a446,EndColorStr=#4d7730) !important;\n}\n.feed-page {\n background:white !important;\n}\n.feed-promo {\n background-color: #3A3A3A !important;\n border-bottom: 1px solid #3A3A3A !important;\n}\n.feed-promo h3 {\n color: #CCCCCC !important;\n}\n.branded-page-v2-detached-top .branded-page-v2-primary-col {\n border: none !important;\n}\n.feed-load-more-container {\n background:#222222 !important;\n margin: 0px !important;\n padding: 10px !important;\n}\n.branded-page-v2-col-container-bottom-border {\n display: none !important;\n}\n.feed-item-container:hover {\n background:white !important;\n}\n.branded-page-v2-body .feed-item-container:hover {\n background:white !important;\n}\n.feed-item-main .feed-item-time {\n color: #999999 !important;\n}\n.feed-item-container:hover .feed-item-time {\n color: #CCCCCC !important;\n}\n.feed-item-content .yt-user-name {\n color: #CCCCCC !important;\n}\n.hitchhiker-enabled .feed-author-bubble {\n background: url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") no-repeat scroll 0 -569px transparent !important;\n}\nbody #footer-hh-container {\n background-color: #222222 !important;\n border-top: 1px solid #444444 !important;\n}\n#footer-hh-main {\n border-bottom: 1px solid #040404 !important;\n}\n#footer-hh-links-primary a {\n color: #CCCCCC !important;\n}\n\n.feed-channel-header-title a {\n color: #FFFFFF !important;\n}\n.feed-header .metadata, .feed-header .metadata a {\n color: #AAAAAA !important;\n}\n.epic-nav-item-heading, body a.yt-uix-button.yt-uix-button-epic-nav-item:hover {\n color:#9C9C9C !important;\n}\nbody a.yt-uix-button.yt-uix-button-epic-nav-item {\n color:#333 !important;\n}\n.feed-subscribe-channel-link a {\n color: #438BC5 !important;\n}\n#subscription-manager-container .subscription-manager-header {\n border-color: #0A0A0A !important;\n}\n#subscription-manager-container .even td {\n background: #222222 !important;\n border-color: #0A0A0A !important;\n}\n\n#page.watch #guide-container.branded {\n background:#272727 !important;\n background:rgba(39,39,39,.80) !important;\n}\n#watch7-sidebar .video-list-item .title {\n color: #CCCCCC !important;\n}\n#watch7-sidebar .video-list-item:hover .title {\n color: #1C62B9 !important;\n}\n#watch7-headline h1 {\n color: #FFFFFF !important;\n}\n#watch7-headline h1 a {\n color: #CCCCCC !important;\n}\n.yt-uix-expander-head, #eow-title {\n color: #FFFFFF !important;\n}\n#watch7-user-header .yt-user-name {\n color: #CCCCCC !important;\n}\n.watch-view-count {\n color: #CCCCCC !important;\n}\n.video-extras-sparkbars {\n background: #CCCCCC !important;\n}\n.video-extras-sparkbar-dislikes {\n background: #993300 !important;\n}\n#watch7-secondary-actions .yt-uix-button {\n background: transparent !important;\n border-color: transparent !important;\n}\n#watch7-secondary-actions .yt-uix-button {\n color:#999999 !important;\n}\n#watch7-secondary-actions .yt-uix-button:hover, #watch7-secondary-actions .yt-uix-button:active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-toggled {\n border-bottom-color: #993300 !important;\n color:#CCCCCC !important;\n}\n.yt-uix-button-hh-text, body .yt-uix-button-hh-text[disabled] {\n text-shadow: 0 1px 0 #000000 !important;\n}\n#watch7-action-buttons, #watch7-action-panels {\n border-left-color:#222222 !important;\n border-right-color:#222222 !important;\n border-bottom-color:#0A0A0A !important;\n}\n#watch7-discussion {\n border-color:#222222 !important;    \n}\n#watch-description {\n color: #999999 !important;\n}\n#watch-uploader-info, #watch-description-extras .title {\n color: #AAAAAA !important;\n}\n.yt-horizontal-rule {\n border-color: #0A0A0A !important;\n}\n.metadata-inline {\n background: #222222 !important;\n}\n#share-panel-buttons .yt-uix-button {\n background: transparent !important;\n border-top: none !important;\n border-color: transparent !important;\n}\n#share-panel-buttons .yt-uix-button:hover, #share-panel-buttons .yt-uix-button:active, #share-panel-buttons .yt-uix-button.yt-uix-button-active, #share-panel-buttons .yt-uix-button.yt-uix-button-toggled {\n background: transparent !important;\n border-top: none !important;\n border-color: #FFFFFF !important;\n}\n#share-panel-buttons .yt-uix-button {\n color: #999999 !important;\n}\n#hangout-popout-icon {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") 0 -461px !important;\n}\n.share-panel {\n color: #999999 !important;\n}\n.share-panel-url, .share-panel-start-at-time, .share-embed-code, .share-embed-size-custom-width, .share-embed-size-custom-height, .share-email-recipients, .share-email-note, .playlist-note, .new-playlist-title, .report-video-timestamp, .report-video-details, .comments-textarea {\n color: #FFFFFF !important;\n text-shadow: 0 1px 1px #333333 !important;\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.share-group.secondary .overlay {\n background: #222222 !important;\n}\n.yt-uix-form-input-select {\n color: #CCCCCC !important;\n text-shadow:0 1px 0 rgba(0,0,0,.45) !important;\n border-color:#454545 !important;\n background-color:#2B2B2B !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n}\n.share-email-preview-container {\n background: #111111 !important;\n border-color: #444444 !important;\n color: #444444 !important;\n}\n.watch-playlists-drawer h3, .watch-playlists-drawer label {\n color: #CCCCCC !important;\n}\n.yt-uix-form-input-checkbox-container .yt-uix-form-input-checkbox-element,.yt-uix-form-input-radio-container .yt-uix-form-input-radio-element {\n border-color: #AAAAAA !important;\n background-color: #CCCCCC !important;\n}\n.yt-uix-form-input-checkbox-container:hover .yt-uix-form-input-checkbox-element,.yt-uix-form-input-radio-container:hover .yt-uix-form-input-radio-element {\n background-color: #FFFFFF !important;\n}\n.yt-uix-form-input-checkbox-container input:checked+.yt-uix-form-input-checkbox-element {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -34px -175px #CCCCCC !important;\n}\n.watch-playlists-drawer ul {\n color: #CCCCCC !important;\n text-shadow:0 1px 0 rgba(0,0,0,.45) !important;\n border:none !important;\n background-color:#2B2B2B !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n -moz-box-shadow:none !important;\n -ms-box-shadow:none !important;\n -webkit-box-shadow:none !important;\n box-shadow:none !important;\n}\n.watch-playlists-drawer .selected {\n background: #333 !important;\n}\n.watch-playlists-drawer .selected:hover{\n color: #CCCCCC !important;\n}\n#action-panel-stats {\n background: #FFFFFF !important;\n}\n#action-panel-stats a.yt-uix-expander-head {\n color: #333333 !important;\n}\n#action-panel-report {\n color: #999999 !important;\n}\n.action-panel-content .report-video-title {\n border-bottom: 2px solid #FFFFFF !important;\n color: #FFFFFF !important;\n}\n.action-panel-content h3 {\n color: #FFFFFF !important;\n}\n.report-video-addition p {\n color: #CCCCCC !important;\n}\n#watch-like span {\n color: #999999 !important;\n}\n#watch-like:hover span {\n color: #CCCCCC !important;\n}\n.yt-uix-button-icon-watch-like {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -22px 0 !important;\n}\n.yt-uix-button:hover .yt-uix-button-icon-watch-like {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -86px -569px !important;\n}\n.yt-uix-button:active .yt-uix-button-icon-watch-like,.yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-like {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -118px -273px !important;\n}\n.yt-uix-button-icon-watch-dislike {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -107px -215px !important;\n}\n.yt-uix-button:active .yt-uix-button-icon-watch-dislike,.yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-dislike {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -35px -136px !important;\n}\n.yt-uix-button .yt-uix-button-icon-action-panel-transcript {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") 0 -509px !important;\n}\n.yt-uix-button .yt-uix-button-icon-action-panel-stats {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -123px -654px !important;\n}\n.yt-uix-button .yt-uix-button-icon-action-panel-report {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -62px -241px !important;\n}\n.caption-line {\n border:1px solid #0A0A0A !important;\n}\n.caption-line-text {\n color: #CCCCCC !important;\n}\n.caption-line:hover {\n background-color: #431D1D !important;\n}\n.caption-line-highlight {\n background-color: #2D2020 !important;\n color: #FFFFFF !important;\n}\n.caption-line-time {\n color: #999999 !important;\n}\n#watch-description-extra-info .metadata-info-title {\n color: #AAAAAA !important;\n}\n.comments-post-video-response-link, .comment-show-hide em, .comment-body em {\n color:#666666 !important;\n}\n#comments-view .comment-text, #comments-view .comment-text a, .comments-section-description {\n color:#999999 !important;\n}\n#comments-view a:hover,#comments-view .comment:hover .yt-uix-button,#comments-view:hover .comment-text a {\n color:#468ACA !important;\n}\n#comments-view hr {\n border-top: 1px solid #0A0A0A !important;\n}\n#watch-response-content-sort {\n border-bottom: 1px solid #0A0A0A !important;\n}\n.live-comments-setting, .comments-post-alert {\n border-color: #181818 !important;\n background: #181818 !important;\n color: #CCCCCC !important;\n}\n#live-comments-section #live-comments-setting-scroll {\n background: transparent !important;\n}\n#live-comments-section #live-comments-count, #live-comments-section  .live-comments-setting-option, #live-comments-section #live-comments-setting-no-scroll {\n border-color: #0A0A0A !important;\n background: #0A0A0A !important;\n}\n#watch7-sidebar .watch-sidebar-head, #watch7-sidebar .watch-sidebar-foot {\n color: #999999 !important;\n}\n\n#watch-response {\n background:#222222 !important;\n}\n.branded-page-v2-secondary-column-hidden .branded-page-v2-primary-col, .primary-col {\n background:#222222 !important;\n border: none !important;\n}\n#watch-response-content {\n border-top: 1px solid #0A0A0A !important;\n}\n#watch-response-header-content p a, .watch-response-item-content p a {\n color: #CCCCCC !important;\n}\n#content-container #baseDiv.video-info {\n background: transparent !important;\n}\n#content-container #baseDiv.video-info #header div div {\n color: #CCCCCC !important;\n}\n#choose-tab-content, #upload-tab-content {\n background: #222222 !important;\n min-height:317px !important;\n}\n.gray-tab-box-header {\n background-color: #999999 !important;;\n}\nspan.grayText, #upload-video-info ul {\n color: #999999 !important;\n}\n#choose-video-list {\n color: #999999 !important;\n background-color: #272727 !important;\n}\n#side-column {\n color: #999999 !important;\n background-color: #3A3A3A !important;\n}\n#choose-video-success {\n color: #FFFFFF !important;\n}\n#attribution-container h2 {\n color: #999999 !important;\n}\n#attribution-container .video-title {\n color: #CCCCCC !important;\n}\n\n.channel-layout-two-column .tab-content-body, #playlist-pane-container {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254728/channelbg.png\") repeat-y scroll 0 0 #333333 !important;\n}\n#post-channel-comment-message, #post-bulletin-message, .yt-uix-form-input-text, #description {\n color: #FFFFFF !important;\n text-shadow: 0 1px 1px #333333 !important;\n background:#333 !important;\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.feed-author-bubble {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670748/dark-guide-vfldLzYdT.png\") 0 -1412px !important;\n}\n.yt-uix-button-hh-default:hover,.yt-uix-button-subscription:hover,.yt-uix-button-hh-text:hover,.yt-uix-button-panel .yt-uix-button-hh-text:hover, .yt-uix-button-hh-default:active, .yt-uix-button-subscription:active, .yt-uix-button-subscription.yt-uix-button-active, .yt-uix-button-hh-text:active, .yt-uix-button-panel .yt-uix-button-hh-text:active, .yt-uix-button-hh-default.yt-uix-button-active, .yt-uix-button-hh-default.yt-uix-button-toggled, .yt-uix-button-hh-text.yt-uix-button-active {\n border-color:#454545 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n}\n.yt-uix-button-hh-text, a.yt-uix-button-hh-text .yt-uix-button-content {\n color: #999999 !important;\n}\n.channels-browse-filter {\n text-shadow: 0 1px 0 #0A0A0A !important;\n}\n.channels-browse-filter a {\n color: #CCCCCC !important;\n}\n.channels-browse-filter.selected a {\n color: #FFFFFF !important;\n}\n.primary-pane h2, .secondary-pane h2 {\n color: #FFFFFF !important;\n}\n.profile-view-module .user-profile-item .item-name {\n color: #CCCCCC !important;\n}\n.profile-view-module a {\n color: #CCCCCC !important;\n}\n.yt-tile-default, .yt-tile-static, .yt-tile-visible {\n color: #FF0000 !important;\n}\n.yt-tile-default, .yt-tile-default a, .yt-tile-visible, .yt-tile-visible a {\n color: #CCCCCC !important;\n}\n.yt-tile-default h3, .yt-tile-default h3 a, .yt-tile-visible h3, .yt-tile-visible h3 a {\n color: #CCCCCC !important;\n}\n.yt-tile-default h3 a:visited,.yt-tile-visible h3 a:visited {\n color: #CCCCCC !important;\n}\n.playlist .description {\n color: #CCCCCC !important;\n}\n.channel-summary-info .subscriber-count {\n color: #AAAAAA !important;\n}\n.channels-featured-video-metadata {\n color: #AAAAAA !important;\n}\n.channels-featured-video-details .view-count, .channels-featured-video-details .concurrent-viewers {\n color: #AAAAAA !important;\n}\n#search-results .yt-tile-static,#search-results .yt-tile-visible,#search-results .yt-tile-default:hover {\n background:#333333 !important;\n}\n.yt-tile-static, .yt-tile-visible, .yt-tile-default:hover {\n background:#333 !important;\n -moz-box-shadow:0 1px 2px #AAAAAA !important;\n -ms-box-shadow:0 1px 2px #AAAAAA !important;\n -webkit-box-shadow:0 1px 2px #AAAAAA !important;\n box-shadow:0 1px 2px #AAAAAA !important;\n}\n.yt-tile-visible:hover {\n -moz-box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n -ms-box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n -webkit-box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n background-image:-moz-linear-gradient(top,#333 0,#373737 100%) !important;\n background-image:-ms-linear-gradient(top,#333 0,#373737 100%) !important;\n background-image:-o-linear-gradient(top,#333 0,#373737 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#373737)) !important;\n background-image:-webkit-linear-gradient(top,#333 0,#373737 100%) !important;\n background-image:linear-gradient(to bottom,#333 0,#373737 100%) !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#333,EndColorStr=#373737) !important;\n}\n.yt-uix-button .yt-uix-button-icon-watch-flag {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -96px -119px !important;\n}\n.active .yt-uix-button-icon-watch-flag,.yt-uix-button:hover .yt-uix-button-icon-watch-flag {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -75px -66px !important;\n}\n.channel-layout-full-width .tab-content-body {\n background-color: #222222 !important;\n}\n.channel-section-heading {\n color: #CCCCCC !important;\n}\n.playlist-video-item.even, .playlist-video-item:nth-child(2n), .playlist-video-item.odd, .playlist-video-item:nth-child(2n+1) {\n background: #222222 !important;\n}\n.playlist-video-item {\n border-color: #0A0A0A !important;\n}\n.playlist-video-item-base-content .video-overview .video-title {\n color: #CCCCCC !important;\n}\n.playlist-sparkbars {\n border: none !important;\n}\n.playlist-sparkbar-likes {\n border-right: none !important;\n}\n.feed-unavailable-message {\n color: #CCCCCC !important;\n}\n.single-playlist .annotation, .post-item .post-item-heading {\n color: #999999 !important;\n}\n.post-item .comment-text {\n color: #CCCCCC !important;\n}\n.playlist-video-item .video-annotation .annotation-text {\n color: #999999 !important;\n border-color: #999999 !important;\n}\n.yt-playall-link {\n border:3px solid #4f4f4f !important;\n -moz-box-shadow:0 2px 1px #222 !important;\n -ms-box-shadow:0 2px 1px #222 !important;\n -webkit-box-shadow:0 2px 1px #222 !important;\n box-shadow:0 2px 1px #222 !important;\n}\n.yt-playall-link:active,.yt-playall-link:focus {\n -moz-box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n -ms-box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n -webkit-box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n}\n.playlist-video-item .video-info .playlist-video-item-range-container {\n border: 1px solid #0A0A0A !important;\n}\n.playlist-thumb-strip, .ux-thumb {\n background: #000000 !important;\n}\n\nbody #yt-admin.vm-has-videolist.hh {\n background-color: #272727 !important;\n}\n.vm-vertical-nav {\n border-top: 1px solid #272727 !important;\n}\n.hh #yt-admin-content {\n background-color: #3A3A3A !important;\n border: none !important;\n}\n#improved-dashboard-promo {\n background-color: #3A3A3A !important;\n}\n#improved-dashboard-promo h2 strong {\n color: #AF2B26 !important;\n}\n#improved-dashboard-promo h2 {\n color: #CCCCCC !important;\n}\n.yt-default p, p.yt {\n color: #999999 !important;\n}\n.dismiss-improved-dashboard-promo img.yt-close-img {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -40px -212px transparent !important;\n}\n.hh #vm-page-subheader {\n background-color:#3A3A3A !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#3A3A3A,EndColorStr=#111111) !important;\n background-image:-moz-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-ms-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-o-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3A3A3A),color-stop(100%,#111111)) !important;\n background-image:-webkit-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:linear-gradient(to bottom,#3A3A3A 0,#111111 100%) !important;\n}\n#vm-page-subheader h3 {\n color: #CCCCCC !important;\n}\n#vm-page-subheader .yt-badge-vm {\n background-color: #CCCCCC !important;\n color: #0F0F0F !important;\n}\n#vm-video-actions-inner {\n border-top:1px solid #333333 !important;\n border-bottom:1px solid #333333 !important;\n background-color:#111111 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#1A1A1A,EndColorStr=#222222) !important;\n background-image:-moz-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:-ms-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:-o-linear-gradient(top,#1A1A1A 0,#222222 100% !important);\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#1A1A1A),color-stop(100%,#222222)) !important;\n background-image:-webkit-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:linear-gradient(to bottom,#1A1A1A 0,#222222 100%) !important;\n}\n.vm-list-view .vm-video-metrics {\n border-left:1px solid #111111 !important;\n background: #222222 !important;\n background-image:-moz-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:-ms-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:-o-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:-webkit-gradient(linear,left top,right top,color-stop(0,#1B1B1B),color-stop(11px,#222)) !important;\n background-image:-webkit-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:linear-gradient(to right,#1B1B1B 0,#222 11px) !important;\n}\n.vm-list-view .vm-video-list li, .vm-video-item {\n background: #222222 !important;\n}\n.vm-list-view .vm-video-item-content {\n border-bottom: none !important;\n}\n.yt-uix-button-hh-default:active, .yt-uix-button-subscription:active, .yt-uix-button-subscription.yt-uix-button-active, .yt-uix-button-hh-text:active, .yt-uix-button-panel .yt-uix-button-hh-text:active, .yt-uix-button-hh-default.yt-uix-button-active, .yt-uix-button-hh-default.yt-uix-button-toggled, .yt-uix-button-hh-text.yt-uix-button-active {\n border-color:#454545 !important;\n background-color:#2B2B2B !important;\n background-image:none !important;\n -moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n -ms-box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n}\n.vm-beauty-view .vm-video-item-content {\n background: #222222 !important;\n box-shadow: 0 2px 5px #111111 !important;\n}\n.vm-list-view .vm-video-title .vm-video-title-content {\n color: #CCCCCC !important;\n}\n.vm-list-view .vm-video-metrics a:hover {\n background: #333333 !important;\n}\n.vm-video-metrics .video-view-count img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll -11px 0 transparent !important;\n}\n.vm-video-metrics a:hover .video-view-count img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll 0 -267px transparent !important;\n}\n.vm-video-metrics .video-comments img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll 0 -177px transparent !important;\n}\n.vm-video-metrics a:hover .video-comments img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll 0 0 transparent !important;\n}\n.vm-video-metrics .video-likes-count img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll -14px -355px transparent !important;\n}\n.vm-video-metrics a:hover .video-likes-count img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll 0 -163px transparent !important;\n}\n.vm-video-metrics .video-dislikes-count img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll 0 -11px transparent !important;\n}\n.vm-video-metrics a:hover .video-dislikes-count img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll 0 -430px transparent !important;\n}\n.vm-video-audioswap img {\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254944/videomanager.png\") no-repeat scroll 0 -391px transparent !important;\n}\n#dashboard-header h1 {\n color: #CCCCCC !important;\n text-shadow:0 1px 0 #000000 !important;\n}\n#dashboard-header .dashboard-stat-value, #dashboard-header .dashboard-stat-name {\n text-shadow:0 1px 0 #000000 !important;\n}\n#dashboard-header .dashboard-stat-name {\n color: #BBBBBB !important;\n}\n.yt-uix-slider-num {\n background: #FFFFFF !important;\n}\n.dashboard-widget.promos .yt-uix-pager .yt-uix-slider-num-current, .dashboard-widget.promos .yt-uix-pager .yt-uix-slider-num:hover {\n background: #FFFFFF !important;\n color: #999999 !important;\n}\n.yt-uix-pager {\n padding-bottom: 15px !important;\n}\n#yt-admin-sidebar-hh a {\n color: #888888 !important;\n}\n#video-media-filters, #video-media-list {\n background: #FBFBFB !important;\n}\n#video-search-input.yt-search-field {\n box-shadow: none !important;\n border: none !important;\n}\n.yt-search-field-search-button .yt-uix-button-content {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") -16px -241px !important;\n}\n#yt-admin-sidebar-hh a {\n background:#272727 !important;\n}\n#yt-admin-sidebar-hh .selected,#yt-admin-sidebar-hh .selected:hover {\n color:#fff !important;\n background:#af2b26 !important;\n background-image:-moz-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-ms-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-o-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#af2b26),color-stop(100%,#942422)) !important;\n background-image:-webkit-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:linear-gradient(to bottom,#af2b26 0,#942422 100%) !important;\n}\n#yt-admin-sidebar-hh a:hover {\n text-decoration:none !important;\n background:#444 !important;\n background-image:-moz-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-ms-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-o-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#444),color-stop(100%,#333)) !important;\n background-image:-webkit-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:linear-gradient(to bottom,#444 0,#333 100%) !important;\n}\n#vm-page-subheader {\n border-bottom: none !important;\n}\n#vm-video-list-container {\n border-top: none !important;\n}\n#yt-admin-content.ytg-fl {\n background: #222222 !important;\n}\n#vm-view-toggle .list img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll 0 -95px !important;\n}\n#vm-view-toggle .list-selected img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll 0 -115px !important;\n}\n#vm-view-toggle .grid img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll -48px -95px !important;\n}\n#vm-view-toggle .grid-selected img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll -48px -115px !important;\n}\n.vm-grid-video-list .vm-video-data {\n color: #CCCCCC !important;\n}\n#vm-pagination {\n background:#222222 !important;\n border-top: 1px solid #3A3A3A !important;\n}\n.vm-video-list li {\n border-top: 1px solid #111111 !important;\n}\n.vm-video-list .vm-video-info {\n color: #999999 !important;\n}\n.vm-list-view .vm-video-metrics, .vm-video-metrics {\n border-left:1px solid #111111 !important;\n}\n.vm-video-metrics dd {\n color: #CCCCCC !important;\n}\n#yt-admin-recommendations h2, #vm-page-subheader {\n border-bottom: 1px solid #0A0A0A !important;\n box-shadow: none !important;\n}\n#yt-admin-recommendations h2, #yt-admin-recommendations .find-more {\n background-image:-moz-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image:-ms-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image:-o-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image: -webkit-gradient(linear,left top,right top,color-stop(0,rgba(188,188,188,0.8)),color-stop(100%,transparent)) !important;\n background-image:-webkit-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image:linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n}\n#yt-admin.recommendations h2, #yt-admin.recommendations h3, #yt-admin-recommendations .find-more a {\n color: #CCCCCC !important;\n}\n#yt-admin .channel-recommendation .metas {\n color: #999999 !important;\n}\n.yt-close-img,.box-close-link img,.yt-uix-clickcard-close,.close-small {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -40px -212px !important;\n}\n\n.channel-recommendation-dismiss {\n color: transparent !important;\n}\n\n\n.GJOPA4DCGJ #contentTable {\n border-bottom: none !important;\n}\n#insight {\n margin: 0 5px 0 -5px !important;\n background-color: #272727 !important;\n}\n.GJOPA4DCPU .GJOPA4DCHU a, .GJOPA4DCPU a.GJOPA4DCHU, .GJOPA4DCPU .GJOPA4DCHU a:focus, .GJOPA4DCPU a.GJOPA4DCHU:focus, .GJOPA4DCPU .GJOPA4DCHU a:active .GJOPA4DCPU a.GJOPA4DCHU:active {\n color:#888888 !important;\n}\n.GJOPA4DCPU .GJOPA4DCAV > .GJOPA4DCHU a, .GJOPA4DCPU .GJOPA4DCAV > .GJOPA4DCHU:hover a {\n color: #FFFFFF !important;\n}\n.GJOPA4DCOU .GJOPA4DCLU {\n background: url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") no-repeat -122px -100px transparent !important;\n}\n.GJOPA4DCJU .GJOPA4DCLU {\n background: url(\"http://z3.ifrm.com/22/130/0/f670749/dark-hitchhiker-vflMCg1ne.png\") no-repeat -132px -100px transparent !important;\n}\n#body-container #content-container #baseDiv #insight table#contentTable td div div #gwt-debug-titlePanel div div h2 {\n background: #FFFFFF !important;\n}\n\n#folder_title.yt-admin-h2 {\n color: #CCCCCC !important;\n background-color:#3A3A3A !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#3A3A3A,EndColorStr=#111111) !important;\n background-image:-moz-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-ms-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-o-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3A3A3A),color-stop(100%,#111111)) !important;\n background-image:-webkit-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:linear-gradient(to bottom,#3A3A3A 0,#111111 100%) !important;\n border: none !important;\n}\n.buttonbar {\n color: #CCCCCC !important;\n border-top:1px solid #333333 !important;\n border-bottom:1px solid #333333 !important;\n background-color:#111111 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#1A1A1A,EndColorStr=#222222) !important;\n background-image:-moz-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:-ms-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:-o-linear-gradient(top,#1A1A1A 0,#222222 100% !important);\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#1A1A1A),color-stop(100%,#222222)) !important;\n background-image:-webkit-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:linear-gradient(to bottom,#1A1A1A 0,#222222 100%) !important;\n}\n.yt-admin-h2 {\n background: #272727 !important;\n}\n.sorterbar th {\n background-color: #3C3C3C !important;\n filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3c3c3c', endColorstr='#151515',GradientType=0 ) !important;\n background: -moz-linear-gradient(top,  #3c3c3c 0%, #151515 100%) !important;\n background: -ms-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: -o-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3c3c3c), color-stop(100%,#151515)) !important;\n background: -webkit-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: linear-gradient(to bottom,  #3c3c3c 0%,#151515 100%) !important;\n border-color: #333333 !important;\n}\n.m_nohighlight {\n background-color: #111111 !important;\n}\n.m_highlight {\n background-color: #151515 !important;\n}\n.message.closed td, .message-display a {\n color: #CCCCCC !important;\n}\n.message.open td {\n background-color: #111111 !important;\n border-color: #666666 !important;\n color: #FFFFFF !important;\n}\n.subject .video-details {\n max-width: 390px !important;\n}\n\n.yt-user-name {\n line-height:20px !important;\n}\n.message .yt-admin-h3, .message .body {\n overflow: visible !important;\n}\n.addressbook {\n margin: 0 !important;\n}\n\nbody #yt-admin.hh {\n background: #272727 !important;\n}\n#body-container #content-container #baseDiv h2 {\n background: #3A3A3A !important;\n color: #CCCCCC !important;\n padding:5px !important;\n}\n#content-container #baseDiv {\n background: #272727 !important;\n margin-bottom: 190px !important;\n width: 1003px !important;\n}\n#ab-rightcontainer-contacts {\n background: #222222 !important;\n width: 803px !important;\n}\n.ab-main {\n border: none !important;\n width: auto !important;\n}\n.ab-new-divider-spacer {\n display:none !important;\n}\n.ab-new {\n width:180px !important;\n}\n#body-container #content-container #baseDiv #ab-main.ab-main h2#ab-current-group-title {\n color: #CCCCCC !important;\n border-left:1px solid #3A3A3A !important;\n padding: 17.5px 10px !important;\n width: 695px !important;\n background-color:#3A3A3A !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#3A3A3A,EndColorStr=#111111) !important;\n background-image:-moz-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-ms-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-o-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3A3A3A),color-stop(100%,#111111)) !important;\n background-image:-webkit-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:linear-gradient(to bottom,#3A3A3A 0,#111111 100%) !important;\n}\n#ab-pagination-top {\n color: #CCCCCC !important;\n border-right:1px solid #3A3A3A !important;\n margin:0px !important;\n padding: 17.5px 5px 17.5px 6px !important;\n width: 75px !important;\n background-color:#3A3A3A !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#3A3A3A,EndColorStr=#111111) !important;\n background-image:-moz-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-ms-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-o-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3A3A3A),color-stop(100%,#111111)) !important;\n background-image:-webkit-linear-gradient(top,#3A3A3A 0,#111111 100%) !important;\n background-image:linear-gradient(to bottom,#3A3A3A 0,#111111 100%) !important;\n}\n#ab-rightcontainer-contacts table td:only-child {\n width: auto !important;\n border: 1px solid #3A3A3A !important;\n background-color:#111111 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#1A1A1A,EndColorStr=#222222) !important;\n background-image:-moz-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:-ms-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:-o-linear-gradient(top,#1A1A1A 0,#222222 100% !important);\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#1A1A1A),color-stop(100%,#222222)) !important;\n background-image:-webkit-linear-gradient(top,#1A1A1A 0,#222222 100%) !important;\n background-image:linear-gradient(to bottom,#1A1A1A 0,#222222 100%) !important;\n}\n.ab-layout-table {\n border: none !important;\n}\n#ab-group-_all_contacts_, #ab-group-_blocked_, .ab-group-subscribe-link {\n color: #888888 !important;\n padding:0px !important;\n}\n.ab-group-name, .ab-contact {\n color: #888888 !important;\n padding:0 0 0 20px !important;\n text-indent:0px !important;\n line-height:28px !important;\n font-size:11px !important;\n text-decoration:none !important;\n border-bottom:none !important;\n text-shadow:none !important;\n box-shadow:none !important;\n -moz-box-shadow:none !important;\n -webkit-box-shadow:none !important;\n}\n.ab-group-name:hover, .ab-contact:hover {\n text-decoration:none !important;\n background:#444 !important;\n background-image:-moz-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-ms-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-o-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#444),color-stop(100%,#333)) !important;\n background-image:-webkit-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:linear-gradient(to bottom,#444 0,#333 100%) !important;\n}\n#ab-group-_all_contacts_.ab-leftpane-sel, #ab-group-_blocked_.ab-leftpane-sel {\n background:#af2b26 !important;\n background-image:-moz-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-ms-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-o-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#af2b26),color-stop(100%,#942422)) !important;\n background-image:-webkit-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:linear-gradient(to bottom,#af2b26 0,#942422 100%) !important;\n}\n#ab-group-_all_contacts_.ab-leftpane-sel .ab-group-name, #ab-group-_blocked_.ab-leftpane-sel .ab-group-name {\n color:#fff !important;\n font-weight:bold !important;\n}\n.ab-layout-table table {\n width: auto !important;\n}\nth.ab-users-head {\n background-color: #3C3C3C !important;\n filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3c3c3c', endColorstr='#151515',GradientType=0 ) !important;\n background: -moz-linear-gradient(top,  #3c3c3c 0%, #151515 100%) !important;\n background: -ms-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: -o-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3c3c3c), color-stop(100%,#151515)) !important;\n background: -webkit-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: linear-gradient(to bottom,  #3c3c3c 0%,#151515 100%) !important;\n border-color: #333333 !important;\n}\nth.ab-users-head span {\n margin-left:-20px !important;\n color:#CCCCCC !important;\n}\nth.ab-users-head img {\n display:none !important;\n}\ntr.ab-users {\n background-color: #151515 !important;\n color: #CCCCCC !important;\n}\ntr.ab-users:nth-child(2n+1) {\n background: #111111 !important;\n}\n.ab-midpane {\n background: #212121 !important;\n}\n#ab-contacts-table {\n border-top: none !important;\n}\n.ab-rightpane {\n width: 601px !important;\n}\n.ab-mulsel-hdr {\n color: #CCCCCC !important;\n padding: 5px 10px !important;\n margin-right: 0px !important;\n height: 14px !important;\n background-color: #3C3C3C !important;\n filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3c3c3c', endColorstr='#151515',GradientType=0 ) !important;\n background: -moz-linear-gradient(top,  #3c3c3c 0%, #151515 100%) !important;\n background: -ms-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: -o-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3c3c3c), color-stop(100%,#151515)) !important;\n background: -webkit-linear-gradient(top,  #3c3c3c 0%,#151515 100%) !important;\n background: linear-gradient(to bottom,  #3c3c3c 0%,#151515 100%) !important;\n border-color: #333333 !important;\n}\n\n.account-sidebar {\n background: #272727 !important;\n}\n.account-sidebar-section li a, .account-sidebar-section h6 {\n color: #888888 !important;\n}\n.account-sidebar-section li a.selected, .account-sidebar-section li a.selected:hover {\n color: #FFFFFF !important;\n}\n.account-container {\n background: #222222 !important;\n border-color: #3A3A3A !important;\n}\n.account-header h2 {\n color: #CCCCCC !important;;\n}\n.account-page {\n color: #999999 !important;\n}\n.yt-dialog-bg, .yt-uix-overlay-bg {\n background-color: #222222 !important;\n}\n.vm-video-actions-delete-overlay .vm-video-actions-delete-header, .yt-dialog-fg, .yt-uix-overlay-fg {\n border-color: #3A3A3A !important;\n background: url(\"http://z4.ifrm.com/30093/71/0/f5254725/refreshbg.png\") repeat #040404 !important;\n}\n.yt-alert-naked .yt-alert-content, .vm-video-actions-delete-overlay .vm-video-actions-delete-main-area, .subscription-confirmation-display-name {\n color: #CCCCCC !important;\n}\n.yt-dialog-fg-content h2, .yt-uix-overlay-fg-content h2, .yt-uix-overlay-header {\n border-bottom: 1px solid #3A3A3A !important;\n color: #CCCCCC !important;\n}\n#profile-picture li {\n color: #CCCCCC !important;\n}\n.social-connector {\n background: #444444 !important;\n border-color: #999999 !important;\n color: #CCCCCC !important;\n}\n.account-sharing-preference-headers .disabled {\n color: #333333 !important;\n}\n.guidelines .yt-uix-expander .yt-uix-expander-arrow {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll -10px 0 !important;\n margin-top: 7px !important;\n}\n.guidelines .yt-uix-expander-collapsed .yt-uix-expander-arrow{\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll 0 0 !important;\n margin-top: 7px !important;\n}\n.example h4 {\n color: #999999 !important;\n}\n\n#page.search-base div.primary-col {\n border: none !important;\n background: #222222 !important;\n}\n.yt-lockup2:hover {\n background: #333333 !important;\n}\n.search-header {\n border: none !important;\n}\n#filter-dropdown {\n background: #3A3A3A !important;\n}\n.filter-top button span {\n color: #CCCCCC !important;\n}\n.filter-col-title {\n color: #CCCCCC !important;\n}\n.filter-content {\n color: #CCCCCC !important;\n}\n.filter-content:hover {\n background: #333 !important;\n}\n.yt-lockup2 .yt-lockup2-meta a, .yt-lockup2 .yt-lokcup2-meta b {\n color: #CCCCCC !important;\n}\n.yt-lockup2 p, .yt-lockup2-badges {\n color: #999999 !important;\n}\n#search-results a:visited{\n color: #26639D !important;\n}\n#page.search-base {\n min-height:650px !important;\n}\n.result-item-onebox {\n border-color: #333 !important;\n}\n.username-prepend {\n color: #999999 !important;\n}\n\n#upload-sidebar .social-connector .info .social-network-name {\n color: #CCCCCC !important;\n margin-bottom: 0 !important;\n padding-top: 2px !important;\n}\n#upload-sidebar .social-connector img {\n margin-top: 2px !important;\n}\n#upload-other-options-list .upload-option-text {\n color: #999999 !important;\n}\n.upload-sidebar-header {\n color: #CCCCCC !important;\n}\n#upload-help-links li {\n color: #999999 !important;\n}\n#main-content .starting-box {\n background: #222222 !important;\n border: none !important;\n}\n#upload-prompt-box {\n border: none !important;\n margin: 0 !important;\n}\nbutton#upload-delay-publishing-options {\n background: transparent !important;\n}\nbutton#start-upload-button-single {\n background: transparent !important;\n border: none !important;\n}\n#upload-button-text {\n color: #CCCCCC !important;\n}\n#upload-page .yt-uix-form-textarea {\n color: #FFFFFF !important;\n text-shadow: 0 1px 1px #333333 !important;\n background:#898989 !important;\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.upload-item {\n background-color: #222222 !important;\n border: none !important;\n}\n.item-title {\n color: #CCCCCC !important;\n}\n.item-sub-title {\n color: #999999 !important;;\n}\n.yt-uix-button-icon-upload-add, .yt-uix-button-icon-addto {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670751/dark-videomanager-vfldLcpwi.png\") no-repeat -23px 0 !important;\n}\n#upload-page li.tab-header {\n background-color: transparent !important; \n}\n#upload-page .metadata-editor-container .tab-bg {\n background-color: #222222 !important; \n border-bottom: 1px solid #0A0A0A !important;\n}\n#upload-page .metadata-editor-container .tab-header.selected a, #upload-page .metadata-editor-container .tab-header a:hover {\n color: #9C9C9C !important;\n}\n#upload-page .metadata-editor-container .tab-header a {\n color: #333 !important;\n}\n#upload-page .metadata-tab {\n background-color: #222222 !important; \n}\n#upload-page h4 {\n color: #CCCCCC !important;\n}\n#upload-page .video-settings-add-tag {\n background: #898989 !important;\n color: #CCCCCC !important;\n}\n#upload-page .yt-chip {\n color:#CCCCCC !important;\n background:#999999 !important;\n border:1px solid #444444 !important;\n -moz-box-shadow:0 1px 0 black !important;\n -ms-box-shadow:0 1px 0 black !important;\n -webkit-box-shadow:0 1px 0 black !important;\n box-shadow:0 1px 0 black !important;\n}\n#upload-page .yt-selected-chip{\n border:1px solid #CCCCCC !important;\n}\n#upload-page .yt-chip .yt-delete-chip {\n background: url(\"http://z3.ifrm.com/22/130/0/f670751/dark-videomanager-vfldLcpwi.png\") no-repeat scroll -12px -466px transparent !important;\n}\n#upload-page label {\n color: #CCCCCC !important;\n}\n\n#page.about-pages #content, .rtl #content {\n border:none !important;\n background:#222222 !important;\n background:-moz-linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,#222 100%) !important;\n background:-o-linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,#222 100%) !important;\n background:-webkit-linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,#222 100%) !important;\n background:linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,222 100%) !important;\n}\n#page.about-pages .ytg-wide {\n width: 1003px !important;\n}\n#yts-article #header, .with-divider, #yts-article p {\n border-color: #0A0A0A !important;\n color: #CCCCCC !important;\n}\n#yts-article, #yts-article a.anchor {\n color: #999999 !important;\n}\n#yts-nav ol li.top-level a:link, #yts-nav ol li.top-level a:visited {\n color: #CCCCCC !important;\n}\n#yts-nav ol.indented li a:link, #yts-nav ol.indented li a:visited {\n color: #999999 !important;\n}\n.separator {\n border-color: #0A0A0A !important;\n}\n#yts-nav .indented,#yts-nav .top-level-single {\n border-bottom: none !important;\n text-shadow: 0 1px 1px rgba(0,0,0,.5);\n text-shadow: 0 0 0 transparent,0 1px 1px rgba(0,0,0,.5);\n -moz-box-shadow: none !important;\n -ms-box-shadow: none !important;\n -webkit-box-shadow: none !important;\n box-shadow: none !important;\n}\n#yts-nav ol.indented li a:hover, #yts-nav ol.indented li .item-highlight {\n background:#444 !important;\n background-image:-moz-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-ms-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-o-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#444),color-stop(100%,#333)) !important;\n background-image:-webkit-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:linear-gradient(to bottom,#444 0,#333 100%) !important;\n}\n#yts-article .grey-rounded-box {\n background-color: #444444 !important;\n}\n.video-slideshow .video-list-item .title {\n color: #999999 !important;\n}\n.video-list-item a:hover {\n background: transparent !important;\n}\n.with-border {\n border: 1px solid #333 !important;\n}\n#yts-article .with-separator, #yts-article .with-bottom-separator, .dev-page .ytg-box {\n border-color: #0A0A0A !important;\n}\n#content .nav-box-gray, #yts-article .box-gray {\n color: #CCCCCC !important;\n background-color: #333333 !important;\n border: 1px solid #333 !important;\n}\n#yt-creator-survey {\n display:none;\n}\n#yts-nav .top-level-multiple h3 {\n color: #CCCCCC !important;\n}\n#error-page-content p {\n  color: #FFFFFF !important;\n}";
// 555555 olanlar 333 olcak, textarea user-header silincek, .feed-page white, feed-item-container  white, #page.feed .branded-page-v2-primary-col white,
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css7);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css7);
} else if (typeof addStyle != "undefined") {
	addStyle(css7);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
}







const LOOP_INTERVAL = 1000; // 1000 = 1 second
var loopHandler, img, imgs;

document.addEventListener('mouseover', mo, false);

GM_registerMenuCommand('Youtube Thumbs: toogle buttons', function(){GM_setValue('noButtons',!GM_getValue('noButtons'))});

function mo(evt)
{
	if( evt.target.nodeName=='IMG' && evt.target.getAttribute('src') && (evt.target.getAttribute('src').search(/default\.jpg$/)>-1 || 
	evt.target.getAttribute('src').search(/0\.jpg$/)>-1) )     // vfede's fix
	{
		start(evt);
		evt.target.addEventListener('mouseout', end, false);		
	}
}

function start(evt) {
	img = evt.target;
	imgZIndex(evt);
	img.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/1.jpg'));
	loopHandler = setInterval(loop, LOOP_INTERVAL);
}

function loop() {
	var num = parseInt( img.getAttribute('src').match(/(\d)\.jpg$/)[1] );
        if(num==1) 
		num++; // vfede's fix
	if(num==3) 
		num = 0;	
	else 
		num++;
	img.setAttribute('src', img.getAttribute('src').replace(/\d\.jpg$/, +num+'.jpg')); 
}

function end(evt) {
	var node;
	clearInterval(loopHandler);
	evt.target.setAttribute('src', img.getAttribute('src').replace(/\/[^\/]+\.jpg$/, '/0.jpg'));            // vfede's fix
	img.style.zIndex = null;
	img = null;
}

function imgZIndex(evt) {
	if(GM_getValue('noButtons') || evt.ctrlKey){
		img.style.zIndex = '999999999';
	}else{
		img.style.zIndex = null;
	}	
}



$(document).ready(function(){

var loaded = {};
loaded[""] = true;
window.addEventListener (
    'scroll',
    function (e) {
      iterateClips(document.getElementsByClassName('yt-thumb-clip'));
    },
    false);
var wm = document.getElementById("watch-more-related");
if (wm) {
  // On "Load More Suggestions" button click
  wm.addEventListener (
    'DOMNodeInserted',
    function (e) {
      iterateClips(e.target.getElementsByClassName('yt-thumb-clip'));
    },
    false);
}

// starts here 
iterateClips(document.getElementsByClassName('yt-thumb-clip'));

function iterateClips(clips)
{
  if (clips)
  {
    for (var i=0; i<clips.length; ++i) 
      if (isVisible(clips[i])) 
        requestRating(clips[i]);
  } 
}

function requestRating(box)
{ 
  var id = getVideoId(box);
  if (loaded[id])
    return;

  loaded[id] = true;
  setTimeout( function() {
    GM_xmlhttpRequest({
      method: 'GET',
      url: "http://gdata.youtube.com/feeds/api/videos/" + id + "?v=2&alt=json&fields=yt:rating",
      onload: function(response) 
      {
        if (response.status == 200) 
        {
          var rsp = eval( '(' + response.responseText + ')' );
          if (rsp && rsp.entry && rsp.entry.yt$rating)
            attachBar(box, parseInt(rsp.entry.yt$rating.numLikes),
                           parseInt(rsp.entry.yt$rating.numDislikes));
        } 
        else
          delete loaded[id]; // give it a chance to reload while scrolling 
      }
    });
  }, 0);
}

function getVideoId(box)
{
  var anchor=box.parentNode.parentNode;
  var isAnchorFound = 2;
  while (anchor && anchor.tagName != undefined) 
  {
    if (anchor.tagName.toLowerCase()=="a")
      break;
    anchor = anchor.parentNode; 
    --isAnchorFound;
    if (0==isAnchorFound)
      break;
  }
  if ( isAnchorFound>0 )
  {
    var href = anchor.getAttribute("href");
    if (href)
    {
      var id = href.replace(/.*v=([^&]*).*/, "$1");
      if (id.length<href.length) 
        return id;
    }
  }
  return "";
}

function attachBar(videoThumb, likes, dislikes) 
{
  var total = likes + dislikes;

  if (total > 0)
  {
    var ratingDiv = document.createElement("div");
    ratingDiv.setAttribute("class", "video-extras-sparkbarks");
    ratingDiv.setAttribute("style", "position: relative; top: 1px;" );
    ratingDiv.setAttribute("title",  likes + " likes, " + dislikes + " dislikes");

    var likesDiv = document.createElement("div");
    likesDiv.setAttribute("class", "video-extras-sparkbar-likes"); 
    likesDiv.setAttribute("style", "width: "+(100*likes)/total+"%"); 

    var dislikesDiv = document.createElement("div");
    dislikesDiv.setAttribute("class", "video-extras-sparkbar-dislikes"); 
    dislikesDiv.setAttribute("style", "width: "+(100*dislikes)/total+"%;"+"background: #C00;"); 

    ratingDiv.appendChild(likesDiv);
    ratingDiv.appendChild(dislikesDiv);
    videoThumb.parentNode.parentNode.appendChild(ratingDiv);
    //videoThumb.appendChild(ratingDiv);

    // fixing time element position to be inside of the thumb image
    var spans = videoThumb.parentNode.parentNode.getElementsByTagName("span");
    for (var i=0; i<spans.length; ++i )
      if (spans[i].getAttribute("class")=="video-time")
      {
        spans[i].style.bottom = "6px";
        break;
      }
  }
}

function isVisible ( el )
{
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}



if (GM_config.get("bypassr")) {
if(document.getElementById('watch7-player-age-gate-content')) {
	var iframe=document.createElement('iframe');
	iframe.style.width="100%";
	iframe.style.height="100%";
	iframe.src=window.location.href.split('/watch')[0] + '/v/' + window.location.href.split('v=')[1].split('&')[0];
	var toReplace=document.getElementById('watch7-player-unavailable');
	toReplace.parentNode.replaceChild(iframe, toReplace);
}
}
});

// ==UserScript==
// @name		Youtube - Hide watched videos and other useless stuff
// @description	This script will hide all activities on your Youtube-Feed-Subscriptions and shows only uploaded (unseen) videos.
// @namespace	johns-youtube-hide-watched-videos
// @include		https://*.youtube.com/feed/*
// @include		https://*.youtube.com/channel/*
// @include		https://*.youtube.com/user/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version		1.1
// @grant		none
// @run-at		document-end
// ==/UserScript==


//Redirect, if the Link contains "/channel/" redirect to the recent uploads
var oldUrlPath  = window.location.pathname;
if ( /\/channel\//.test(oldUrlPath)) {
	var menuItems = document.getElementById("channel-navigation-menu").getElementsByTagName("li");
	
	for (var i=0; i < menuItems.length; i++)
	{
		var currentElement = menuItems[i];	
		var linky = currentElement.innerHTML.match(/\/user\/.*\/videos/);

		if(linky != null){			
			window.location.replace("https://www.youtube.com" + linky);
			break;															//just for safety
		}
	} 
}
//Redirect, if the feed url doesn't end with "/u" (for uploads) or ! "/subscriptions" or ! "/user/"
else if ( ! /\/u$/.test(oldUrlPath) && ! /\/feed\/subscriptions$/.test(oldUrlPath) && ! /\/user\//.test(oldUrlPath)) {
    var newURL  = window.location.protocol + "//"
                + window.location.hostname
                + oldUrlPath + "/u"
                + window.location.search
                + window.location.hash
                ;
    window.location.replace(newURL);
}


//If we are on the "feed" page
if( /\/u$/.test(oldUrlPath) || /\/feed\/subscriptions$/.test(oldUrlPath)){

	//Hide the first static loaded elements
	hideFeed($("div.feed-page"));

	//Hide dynamically added elements
	$('div.feed-page').live('DOMNodeInserted' ,function(event){
		if(event.target.attributes["class"].nodeValue == 'feed-page'){
			hideFeed($(this));
		}
	});
}


//If we are on the "user" or "channel" page
if( /\/user\//.test(oldUrlPath)){

	//Hide the first static loaded elements
	$(".watched").parent().parent().hide();
	
	//Hide dynamically added elements
	$('li.channels-content-item').live('DOMNodeInserted' ,function(event){
		if(event.target.attributes["class"].nodeValue == 'channels-content-item'){
			$(this).find("div.channel-video-thumb-watched").parent().parent().parent().hide();
		}
	});
}


//The magic happens here for the feed
function hideFeed(e) {
	e.find("li>div.feed-item-container").has("span:contains('replied to a')").hide();
			
	e.find("li>div.feed-item-container").has("span:contains('liked')").hide();

	e.find("li>div.feed-item-container").has("span:contains('commented')").hide();

	e.find("li>div.feed-item-container").has("span:contains('added ')").hide();

	e.find("li>div.feed-item-container").has("span:contains('posted')").hide();
	
	e.find("li>div.feed-item-container").has("span:contains('created')").hide();

	e.find("li>div.feed-item-container").has("span:contains('subscribed to a channel')").hide();
				
	e.find("li>div.feed-item-container").has("span.feed-item-rec").hide();

	//Show combinations of "uploaded and ..."
	e.find("li>div.feed-item-container").has("span:contains('uploaded and ')").show();

	//But hide watched videos
	e.find("li>div.feed-item-container").has("div:contains('WATCHED')").hide();
}

// ==UserScript==
// @name          YouTube "Earth Hour 2012" Dark Theme Redux
// @namespace     http://userstyles.org
// @description	  A dark theme for YouTube that was originally based on the "Earth Hour 2012" look.
// @author        BRYN
// @homepage      http://userstyles.org/styles/63482
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body, #yt-masthead-container {\n background:url(\"http://z4.ifrm.com/30093/71/0/f5254725/refreshbg.png\") repeat #040404 !important;\n}\n#yt-masthead #logo, #footer-hh-logo img, #footer-logo img {\n background:url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") no-repeat -86px -302px !important;\n}\n#yt-masthead #logo-container.doodle img {\n background-color:#F1F1F1 !important;\n box-shadow: 0 0 4px 4px #EBEBEB !important;\n}\n#footer .yt-uix-button-icon-footer-language {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -168px -173px !important;\n}\n#footer .questionmark {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -210px -133px !important;\n}\n#yt-masthead-container.yt-masthead-hh, #yt-masthead-container.yt-grid-box {\n border:none !important;\n}\n#channel-subheader, .c4-box, #video-page-subnav, .profile, .lohp-large-shelf-container, .lohp-medium-shelves-container, .lohp-newspaper-shelf, .lohp-shelf-cell-container.last-shelf-in-line, .lohp-shelf-cell-container.lohp-category-shelf, .lohp-large-shelf-container .lohp-blog-headline, .lohp-pyv-shelf-container  {\n border-color:#0A0A0A !important;\n}\n.pyv-shelf-wrapper, .pyv-feed-item-inner-content-wrapper {\n background:#333 !important;\n}\n.pyv-feed-item-view-count {\n color:#CCC !important;\n}\n.pyv-feed-item-description {\n color:#777 !important;\n}\n#masthead-expanded-loading-message, .lohp-shelf-title, .stat, .channel-header .branded-page-header-title .spf-link, .time-published, #yt-masthead-user-displayname {\n color:#CCC !important;\n}\n.lohp-shelf-cell-container:hover {\n background-color:#444 !important;\n}\n#feed .no-recent-activity {\n height:700px !important;\n margin:0 !important;\n padding-top:13px !important;\n}\n.yt-masthead-hh #masthead-search .search-btn-component .yt-uix-button-content, #masthead-search .search-btn-component .yt-uix-button-content, #channel-search .show-search img, #channel-search .yt-uix-button-icon-search, .yt-search-field-search-button .yt-uix-button-content, .vm-search-btn .yt-uix-button-content {\n background:url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") no-repeat -184px -207px !important;\n}\n#page.feed .branded-page-v2-primary-col {\n background:transparent !important;\n border-color:transparent !important;\n}\n.branded-page-module-title, .branded-page-module-title a:visited, .branded-page-module-title a {\n color:#CCC !important;\n}\n#masthead-search-terms, .guide-quick-filter {\n background:#898989 !important;\n}\n#masthead-search-terms input, .guide-quick-filter {\n color:#FFF !important;\n text-shadow:0 1px 1px #333 !important;\n}\n.masthead-search-terms-border, .guide-quick-filter {\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.yt-uix-button-default, .yt-uix-button-hh-default, .yt-uix-button-subscription, a.yt-uix-button-default .yt-uix-button-content, a.yt-uix-button-hh-default .yt-uix-button-content {\n color:#CCC !important;\n}\n.yt-uix-button-default, .yt-uix-button-hh-default, .yt-uix-button-subscription, .yt-uix-button-panel:hover .yt-uix-button-text, .yt-uix-button-panel:hover .yt-uix-button-hh-text, body .yt-uix-button-default[disabled], body .yt-uix-button-hh-default[disabled] {\n text-shadow:0 1px 0 rgba(0,0,0,.45) !important;\n border-color:#454545 !important;\n background-color:#2B2B2B !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n}\nbody #masthead-expanded-container {\n background:#121212 !important;\n border-bottom:1px solid #222 !important;\n box-shadow:0 5px 5px #222 !important;\n}\n#masthead-expanded .yt-uix-slider-next:active,#masthead-expanded .yt-uix-slider-prev:active,#masthead-expanded .yt-uix-slider-next:focus,#masthead-expanded .yt-uix-slider-prev:focus {\n -moz-box-shadow:inset 0 1px 1px #555 !important;\n -ms-box-shadow:inset 0 1px 1px #555 !important;\n -webkit-box-shadow:inset 0 1px 1px #555 !important;\n box-shadow:inset 0 1px 1px #555 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#000,EndColorStr=#1F1F19) !important;\n background-image:-moz-linear-gradient(bottom,#000 0,#1F1F19 100%) !important;\n background-image:-ms-linear-gradient(bottom,#000 0,#1F1F19 100%) !important;\n background-image:-o-linear-gradient(bottom,#000 0,#1F1F19 100%) !important;\n background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#000),color-stop(100%,#1F1F19)) !important;\n background-image:-webkit-linear-gradient(bottom,#000 0,#1F1F19 100%) !important;\n background-image:linear-gradient(to top,#000 0,#1F1F19 100%) !important;\n}\n\n#guide {\n background:#272727 !important;\n}\n.guide-item, .guide-header-item {\n color:#888 !important;\n}\n#guide-container .guide-item.guide-item-selected, #guide-container .guide-item.guide-item-selected:hover {\n color:#FFF !important;\n}\n#guide-container .guide-notification-enabled .guide-item, #guide-container .guide-notification-enabled .guide-item:hover, .collapsed .guide-notification-enabled.guide-module-toggle-icon {\n background:#84A345 !important;\n color:#FFF !important;\n}\n.guide-section-separator {\n border-bottom:1px solid #040404 !important;\n}\n.branded-page-v2-col-container {\n background:transparent !important;\n border-left:1px solid #222 !important;\n}\n.branded-page-related-channels h3 a, .branded-page-related-channels h3, .guide-module.collapsed .guide-module-toggle:hover, .guide-module.collapsed .guide-module-toggle:hover .context-back-link, .filter-match {\n color:#CCC !important;\n}\n.branded-page-related-channels h2 a:hover, .branded-page-related-channels h3 a:hover, .branded-page-related-channels-item .yt-uix-button-link:hover {\n color:#438BC5 !important;\n}\n#guide-main .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -51px 0 !important;\n}\n#guide-main .guide-module-toggle:hover .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") 0 -22px !important;\n}\n#watch-context-container .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -166px -40px !important;\n}\n#watch-context-container .guide-module-toggle-icon:hover img, #watch-context-container.collapsed .guide-module-toggle:hover .guide-module-toggle-icon img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -136px -224px !important;\n}\n.guide-module-toggle-icon .guide-module-toggle-arrow{\n border-right-color:#666 !important;\n}\n.guide-module-toggle-icon:hover .guide-module-toggle-arrow{\n border-right-color:#999 !important;\n}\n.feed-header {\n border-bottom:none !important;\n}\n#social-promo h4 {\n color:#777 !important;\n}\n#social-promo .social-service-status {\n color:#999 !important;\n}\n\n#social-promo li {\n width:120px !important;\n}\n.guide-quick-filter-clear img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -188px -40px !important;\n}\n.yt-uix-button-subscribe-unbranded, .yt-uix-button-context-light .yt-uix-button-subscribed-branded, .yt-uix-button-context-light .yt-uix-button-subscribed-unbranded, .yt-uix-button-subscribe-branded, .yt-subscription-button-subscriber-count-branded-vertical, .yt-subscription-button-subscriber-count-unbranded-vertical, .yt-subscription-button-subscriber-count-branded-horizontal, .yt-subscription-button-subscriber-count-unbranded-horizontal {\n border-color:#555 !important;\n background-image:-moz-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-ms-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-o-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#444)) !important;\n background-image:-webkit-linear-gradient(top,#333 0,#444 100%) !important;\n background-image:linear-gradient(to bottom,#333 0,#444 100%) !important;\n}\n.yt-uix-button-subscribe-branded .yt-uix-button-content {\n color:#CCC !important;\n text-shadow:0 1px 0 #000 !important;\n}\n.yt-uix-button-subscribe-branded:hover, .yt-uix-button-subscribe-branded:active {\n border-color:#CCC !important;\n}\n.yt-subscription-button-subscriber-count-branded-vertical:after, .yt-subscription-button-subscriber-count-unbranded-vertical:after {\n border-color:#333 transparent !important;\n}\n.yt-subscription-button-subscriber-count-unbranded-vertical {\n border-color:#AAA transparent !important;\n}\n.yt-subscription-button-subscriber-count-unbranded-horizontal, .yt-subscription-button-subscriber-count-unbranded-vertical {\n border:1px solid #555 !important;\n color:#A8A8A8 !important;\n}\n.yt-subscription-button-subscriber-count-branded-horizontal:after, .yt-subscription-button-subscriber-count-unbranded-horizontal:after {\n border-color:transparent #3B3B3B !important;\n}\n.yt-uix-button-subscribed-unbranded .yt-uix-button-icon-subscribe-unbranded,.yt-uix-button-context-light .yt-uix-button-subscribed-branded .yt-uix-button-icon-subscribe-branded {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -19px -268px !important;\n}\n.yt-uix-button-subscribed-branded.hover-enabled:hover, .yt-uix-button-subscribed-unbranded.hover-enabled:hover, .yt-uix-button-subscribed-unbranded.hover-enabled:hover {\n background:#A9382E !important;\n border:1px solid #880904 !important;\n}\n.subscribed-hh-label, .feed-promo h3, .feed-item-container:hover .feed-item-time, .feed-item-content .yt-user-name, .feed-item-content .metadata .view-count, #footer-hh-links-primary a, #footer-links-primary a {\n color:#CCC !important;\n}\n.unsubscribe-hh-label {\n color:#FFF !important;\n}\n.yt-uix-button-subscribed-branded.hover-enabled:hover .yt-uix-button-icon-subscribe-branded, .yt-uix-button-subscribed-unbranded.hover-enabled:hover .yt-uix-button-icon-subscribe-unbranded {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -274px -133px !important;\n}\n.yt-uix-button-subscribe-unbranded:hover, .yt-uix-button-subscribe-unbranded:focus, .yt-uix-button-subscribe-unbranded:active {\n background-image:-moz-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:-ms-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:-o-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#555)) !important;\n background-image:-webkit-linear-gradient(top,#333 0,#555 100%) !important;\n background-image:linear-gradient(to bottom,#333 0,#555 100%) !important;\n color:#AAA !important;\n}\nbutton.yt-uix-button.addto-watch-later-button-success {\n background-image:-moz-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:-ms-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:-o-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#74a446),color-stop(100%,#4d7730)) !important;\n background-image:-webkit-linear-gradient(top,#74a446 0,#4d7730 100%) !important;\n background-image:linear-gradient(to bottom,#74a446 0,#4d7730 100%) !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#74a446,EndColorStr=#4d7730) !important;\n}\n.feed-page {\n background:#222 !important;\n}\n.feed-promo {\n background-color:#3A3A3A !important;\n border-bottom:1px solid #3A3A3A !important;\n}\n.feed-item-container .feed-item-main {\n border-bottom:1px solid #040404 !important;\n color:#CCC !important;\n}\n.branded-page-v2-detached-top .branded-page-v2-primary-col {\n border:none !important;\n}\n.feed-load-more-container {\n background:#222 !important;\n margin:0px !important;\n padding:10px !important;\n}\n.branded-page-v2-col-container-bottom-border {\n display:none !important;\n}\n.feed-item-container:hover {\n background:#333 !important;\n border-top-color:#222 !important;\n border-bottom-color:#222 !important;\n}\n.branded-page-v2-body .feed-item-container:hover {\n background:#333 !important;\n}\n.feed-item-main .feed-item-time {\n color:#777 !important;\n}\n.hitchhiker-enabled .feed-author-bubble {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -106px -133px !important;\n}\nbody #footer-hh-container, body #footer-container {\n background-color:#222 !important;\n border-top:1px solid #444 !important;\n}\n#footer-hh-main, #footer-main {\n border-bottom:1px solid #040404 !important;\n}\n#yt-admin-sidebar-hh {\n padding-left: 20px !important;\n}\n\n.feed-channel-header-title a {\n color:#FFF !important;\n}\n.feed-header .metadata, .feed-header .metadata a {\n color:#AAA !important;\n}\n.epic-nav-item-heading, body a.yt-uix-button.yt-uix-button-epic-nav-item:hover {\n color:#9C9C9C !important;\n}\nbody a.yt-uix-button.yt-uix-button-epic-nav-item {\n color:#555 !important;\n}\n.feed-subscribe-channel-link a {\n color:#438BC5 !important;\n}\n#subscription-manager-container .subscription-manager-header {\n border-color:#0A0A0A !important;\n}\n#subscription-manager-container .even td {\n background:#222 !important;\n border-color:#0A0A0A !important;\n}\n\n#page.watch #guide-container.branded {\n background:#272727 !important;\n background:rgba(39,39,39,.80) !important;\n}\n.watch-branded #watch7-sidebar {\n background-color:#272727 !important;\n}\n#watch7-sidebar .video-list-item .title {\n color:#CCC !important;\n}\n#watch7-sidebar .video-list-item:hover .title {\n color:#1C62B9 !important;\n}\n#watch7-headline h1 {\n color:#FFF !important;\n}\n#watch7-headline h1 a {\n color:#CCC !important;\n}\n#watch7-content {\n background:#222 !important;\n}\n#watch7-headline, #watch7-notification-area, #watch7-user-header {\n background:#222 !important;\n}\n.yt-uix-expander-head, #eow-title {\n color:#FFF !important;\n}\n#watch7-user-header .yt-user-name {\n color:#CCC !important;\n}\n.watch-view-count {\n color:#CCC !important;\n}\n.video-extras-sparkbars {\n background:#CCC !important;\n}\n.video-extras-sparkbar-dislikes {\n background:#993300 !important;\n}\n#watch7-secondary-actions .yt-uix-button {\n background:transparent !important;\n border-color:transparent !important;\n color:#999 !important;\n}\n#watch7-secondary-actions .yt-uix-button:hover, #watch7-secondary-actions .yt-uix-button:active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-toggled {\n border-bottom-color:#993300 !important;\n color:#CCC !important;\n}\n.yt-uix-button-hh-text, .yt-uix-button-text, body .yt-uix-button-hh-text[disabled], body .yt-uix-button-text[disabled] {\n text-shadow:0 1px 0 #000 !important;\n}\n#watch7-action-buttons, #watch7-action-panels {\n border-left-color:#222 !important;\n border-right-color:#222 !important;\n border-bottom-color:#0A0A0A !important;\n}\n#watch7-discussion {\n border-color:#222 !important;\n}\n#watch-description {\n color:#777 !important;\n}\n#watch-uploader-info, #watch-description-extras .title {\n color:#AAA !important;\n}\n#watch7-action-panels #watch7-action-panel-footer {\n background-color:#222 !important;\n}\n#watch7-action-panel-footer .yt-horizontal-rule {\n border-color:#0A0A0A !important;\n}\n.metadata-inline {\n background:#222 !important;\n}\n#share-panel-buttons .yt-uix-button {\n background:transparent !important;\n border-top:none !important;\n border-color:transparent !important;\n color:#999 !important;\n}\n#share-panel-buttons .yt-uix-button:hover, #share-panel-buttons .yt-uix-button:active, #share-panel-buttons .yt-uix-button.yt-uix-button-active, #share-panel-buttons .yt-uix-button.yt-uix-button-toggled {\n background:transparent !important;\n border-top:none !important;\n border-color:#FFF !important;\n}\n#hangout-popout-icon {\n background:url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") no-repeat -119px -40px !important;\n}\n.share-panel {\n color:#999 !important;\n}\n.share-panel-url, .share-panel-start-at-time, .share-embed-code, .share-embed-size-custom-width, .share-embed-size-custom-height, .share-email-recipients, .share-email-note, .playlist-note, .new-playlist-title, .report-video-timestamp, .report-video-details, .comments-textarea,  {\n color:#FFF !important;\n text-shadow:0 1px 1px #333 !important;\n background:#898989 !important;\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.share-group.secondary .overlay {\n background:#222 !important;\n}\n.yt-uix-form-input-select {\n color:#CCC !important;\n text-shadow:0 1px 0 rgba(0,0,0,.45) !important;\n border-color:#454545 !important;\n background-color:#2B2B2B !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n}\n.share-email-preview-container {\n background:#111 !important;\n border-color:#444 !important;\n color:#444 !important;\n}\n.watch-playlists-drawer h3, .watch-playlists-drawer label {\n color:#CCC !important;\n}\n.yt-uix-form-input-checkbox-container .yt-uix-form-input-checkbox-element,.yt-uix-form-input-radio-container .yt-uix-form-input-radio-element {\n border-color:#AAA !important;\n background-color:#CCC !important;\n}\n.yt-uix-form-input-checkbox-container:hover .yt-uix-form-input-checkbox-element,.yt-uix-form-input-radio-container:hover .yt-uix-form-input-radio-element {\n background-color:#FFF !important;\n}\n.yt-uix-form-input-checkbox-container input:checked+.yt-uix-form-input-checkbox-element {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -277px -264px #CCC !important;\n}\n.watch-playlists-drawer ul {\n color:#CCC !important;\n text-shadow:0 1px 0 rgba(0,0,0,.45) !important;\n border:none !important;\n background-color:#2B2B2B !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n -moz-box-shadow:none !important;\n -ms-box-shadow:none !important;\n -webkit-box-shadow:none !important;\n box-shadow:none !important;\n}\n.watch-playlists-drawer .selected {\n background:#555 !important;\n}\n.watch-playlists-drawer .selected:hover{\n color:#CCC !important;\n}\n#action-panel-stats {\n background:#FFF !important;\n}\n#action-panel-stats a.yt-uix-expander-head {\n color:#333 !important;\n}\n#action-panel-report {\n color:#777 !important;\n}\n.action-panel-content .report-video-title {\n border-bottom:2px solid #FFF !important;\n color:#FFF !important;\n}\n.action-panel-content h3 {\n color:#FFF !important;\n}\n.report-video-addition p {\n color:#CCC !important;\n}\n#watch-like span {\n color:#999 !important;\n}\n#watch-like:hover span {\n color:#CCC !important;\n}\n.yt-uix-button-icon-watch-like {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -158px -193px !important;\n}\n.yt-uix-button:hover .yt-uix-button-icon-watch-like {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") 0 -173px !important;\n}\n.yt-uix-button:active .yt-uix-button-icon-watch-like,.yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-like {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -66px -186px !important;\n}\n.yt-uix-button-icon-watch-dislike {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -26px -85px !important;\n}\n.yt-uix-button:active .yt-uix-button-icon-watch-dislike,.yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-dislike {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -136px 0 !important;\n}\n.yt-uix-button .yt-uix-button-icon-action-panel-transcript {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -46px -110px !important;\n}\n.yt-uix-button .yt-uix-button-icon-action-panel-stats {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -257px -264px !important;\n}\n.yt-uix-button .yt-uix-button-icon-action-panel-report {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") -52px -40px !important;\n}\n.caption-line {\n border:1px solid #0A0A0A !important;\n}\n.caption-line-text {\n color:#CCC !important;\n}\n.caption-line:hover {\n background-color:#431D1D !important;\n}\n.caption-line-highlight {\n background-color:#2D2020 !important;\n color:#FFF !important;\n}\n.caption-line-time {\n color:#777 !important;\n}\n#watch-description-extra-info .metadata-info-title {\n color:#AAA !important;\n}\n.comments-post-video-response-link, .comment-show-hide em, .comment-body em {\n color:#666 !important;\n}\n#comments-view .comment-text, #comments-view .comment-text a, .comments-section-description {\n color:#777 !important;\n}\n#comments-view a:hover,#comments-view .comment:hover .yt-uix-button,#comments-view:hover .comment-text a {\n color:#468ACA !important;\n}\n#comments-view hr {\n border-top:1px solid #0A0A0A !important;\n}\n#watch-response-content-sort {\n border-bottom:1px solid #0A0A0A !important;\n}\n.live-comments-setting, .comments-post-alert {\n border-color:#181818 !important;\n background:#181818 !important;\n color:#CCC !important;\n}\n#live-comments-section #live-comments-setting-scroll {\n background:transparent !important;\n}\n#live-comments-section #live-comments-count, #live-comments-section  .live-comments-setting-option, #live-comments-section #live-comments-setting-no-scroll {\n border-color:#0A0A0A !important;\n background:#0A0A0A !important;\n}\n#watch7-sidebar .watch-sidebar-head, #watch7-sidebar .watch-sidebar-foot {\n color:#777 !important;\n}\n.watch-editable:hover {\n background:#535353 !important;\n}\n.watch-editable:hover #watch-description {\n color:#CCC !important;\n}\n.watch-pencil-icon .yt-uix-button-icon-pencil {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671313/dark-watchedit-vflekSnZa.png\") 0 -130px !important;\n}\n.comments-textarea-container .comments-textarea-tip {\n border-right-color:#6B6B6B !important;\n left:-4px !important;\n}\n.action-panel-content .report-video-confirmation {\n background-color:#460000 !important;\n}\n\n#watch-response {\n background:#222 !important;\n}\n.branded-page-v2-secondary-column-hidden .branded-page-v2-primary-col {\n background:#222 !important;\n border-right:none !important;\n}\n#watch-response-content {\n border-top:1px solid #0A0A0A !important;\n}\n#watch-response-header-content p a, .watch-response-item-content p a, #content-container #baseDiv.video-info #header div div, #attribution-container .video-title {\n color:#CCC !important;\n}\n#content-container #baseDiv.video-info {\n background:transparent !important;\n}\n#choose-tab-content, #upload-tab-content {\n background:#222 !important;\n min-height:317px !important;\n}\n.gray-tab-box-header {\n background-color:#999 !important;;\n}\nspan.grayText, #upload-video-info ul, #attribution-container h2 {\n color:#777 !important;\n}\n#choose-video-list {\n color:#777 !important;\n background-color:#272727 !important;\n}\n#side-column {\n color:#999 !important;\n background-color:#3A3A3A !important;\n}\n#choose-video-success {\n color:#FFF !important;\n}\n\n.channel-layout-two-column .tab-content-body, #playlist-pane-container {\n background:url(\"http://z4.ifrm.com/30093/71/0/f5254728/channelbg.png\") repeat-y scroll 0 0 #333 !important;\n}\n#post-channel-comment-message, #post-bulletin-message, .yt-uix-form-input-text, #description {\n color:#FFF !important;\n text-shadow:0 1px 1px #333 !important;\n background:#898989 !important;\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.feed-author-bubble {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f670748/dark-guide-vfldLzYdT.png\") 0 -1412px !important;\n}\n.yt-uix-button-hh-default:hover,.yt-uix-button-subscription:hover,.yt-uix-button-hh-text:hover,.yt-uix-button-panel .yt-uix-button-hh-text:hover, .yt-uix-button-hh-default:active, .yt-uix-button-subscription:active, .yt-uix-button-subscription.yt-uix-button-active, .yt-uix-button-hh-text:active, .yt-uix-button-panel .yt-uix-button-hh-text:active, .yt-uix-button-hh-default.yt-uix-button-active, .yt-uix-button-hh-default.yt-uix-button-toggled, .yt-uix-button-hh-text.yt-uix-button-active {\n border-color:#454545 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#ff474747,EndColorStr=#ff2B2B2B) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2B2B2B)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2B2B2B 100%) !important;\n}\n.yt-uix-button-hh-text, a.yt-uix-button-hh-text .yt-uix-button-content {\n color:#999 !important;\n}\n.channels-browse-filter {\n text-shadow:0 1px 0 #0A0A0A !important;\n}\n.channels-browse-filter a {\n color:#CCC !important;\n}\n.channels-browse-filter.selected a, .primary-pane h2, .secondary-pane h2 {\n color:#FFF !important;\n}\n.profile-view-module .user-profile-item .item-name, .profile-view-module a, .yt-tile-default, .yt-tile-default a, .yt-tile-visible, .yt-tile-visible a, .yt-tile-default h3, .yt-tile-default h3 a, .yt-tile-visible h3, .yt-tile-visible h3 a, .yt-tile-default h3 a:visited,.yt-tile-visible h3 a:visited, .playlist .description {\n color:#CCC !important;\n}\n.yt-tile-default, .yt-tile-static, .yt-tile-visible {\n color:#FF0000 !important;\n}\n.channel-summary-info .subscriber-count, .channels-featured-video-metadata, .channels-featured-video-details .view-count, .channels-featured-video-details .concurrent-viewers {\n color:#AAA !important;\n}\n#search-results .yt-tile-static,#search-results .yt-tile-visible,#search-results .yt-tile-default:hover {\n background:#333 !important;\n}\n.yt-tile-static, .yt-tile-visible, .yt-tile-default:hover {\n background:#555 !important;\n -moz-box-shadow:0 1px 2px #AAA !important;\n -ms-box-shadow:0 1px 2px #AAA !important;\n -webkit-box-shadow:0 1px 2px #AAA !important;\n box-shadow:0 1px 2px #AAA !important;\n}\n.yt-tile-visible:hover {\n -moz-box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n -ms-box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n -webkit-box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n box-shadow:0 1px 3px rgba(0,0,0,.5),inset 0 -1px 0 #373737 !important;\n background-image:-moz-linear-gradient(top,#555 0,#373737 100%) !important;\n background-image:-ms-linear-gradient(top,#555 0,#373737 100%) !important;\n background-image:-o-linear-gradient(top,#555 0,#373737 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#555),color-stop(100%,#373737)) !important;\n background-image:-webkit-linear-gradient(top,#555 0,#373737 100%) !important;\n background-image:linear-gradient(to bottom,#555 0,#373737 100%) !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#555,EndColorStr=#373737) !important;\n}\n.yt-uix-button .yt-uix-button-icon-watch-flag {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -96px -119px !important;\n}\n.active .yt-uix-button-icon-watch-flag,.yt-uix-button:hover .yt-uix-button-icon-watch-flag {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -75px -66px !important;\n}\n.channel-layout-full-width .tab-content-body {\n background-color:#222 !important;\n}\n.channel-section-heading, .playlist-video-item-base-content .video-overview .video-title, .feed-unavailable-message {\n color:#CCC !important;\n}\n.playlist-video-item.even, .playlist-video-item:nth-child(2n), .playlist-video-item.odd, .playlist-video-item:nth-child(2n+1) {\n background:#222 !important;\n}\n.playlist-video-item {\n border-color:#0A0A0A !important;\n}\n.playlist-sparkbars {\n border:none !important;\n}\n.playlist-sparkbar-likes {\n border-right:none !important;\n}\n.single-playlist .annotation, .post-item .post-item-heading {\n color:#777 !important;\n}\n.post-item .comment-text {\n color:#CCC !important;\n}\n.playlist-video-item .video-annotation .annotation-text {\n color:#777 !important;\n border-color:#999 !important;\n}\n.yt-playall-link {\n border:3px solid #4f4f4f !important;\n -moz-box-shadow:0 2px 1px #222 !important;\n -ms-box-shadow:0 2px 1px #222 !important;\n -webkit-box-shadow:0 2px 1px #222 !important;\n box-shadow:0 2px 1px #222 !important;\n}\n.yt-playall-link:active,.yt-playall-link:focus {\n -moz-box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n -ms-box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n -webkit-box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n box-shadow:inset 0 1px 1px #000,0 2px 1px #000 !important;\n}\n.playlist-video-item .video-info .playlist-video-item-range-container {\n border:none !important;\n}\n.playlist-video-item.annotated .video-annotation-text, .playlist-video-item .clipped-video .playlist-video-item-range-container {\n border:1px solid #0A0A0A !important;\n color:#AAA !important;\n}\n.playlist-thumb-strip, .ux-thumb {\n background:#000 !important;\n}\n#playlist-bar-bar-container {\n background-color:#333 !important;\n background-image:linear-gradient(to top, #474747 0, #2B2B2B 100%) !important;\n background-image:-moz-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2B2B2B 100%) !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, startColorStr=\\\"#FF474747\\\", endColorStr=\\\"#FF2B2B2B\\\") !important;\n border-color:#333 !important;\n}\n.legacy-playlist-bar #playlist-bar-title .playlist-title {\n color:#FFF !important;\n}\n.legacy-playlist-bar #playlist-bar-controls .yt-uix-button {\n color:#CCC !important;\n}\n.legacy-playlist-bar #playlist-bar-bar .yt-uix-button:hover, .legacy-playlist-bar #playlist-bar-bar .yt-uix-button:focus, .legacy-playlist-bar #playlist-bar-bar .yt-uix-button-text:hover, .legacy-playlist-bar #playlist-bar-bar .yt-uix-button-text:focus {\n color:#333 !important;\n}\n.playlist-quick-sort-container, #playlist-privacy-setting label, #playlist-other-settings label, .removed-label, .no-recent-activity, .channel-page-no-videos-message {\n color:#CCC !important;\n}\n.yt-horizontal-rule {\n border-color:#CCC !important;\n}\n\nbody #yt-admin.vm-has-videolist.hh {\n background-color:#272727 !important;\n}\n.vm-vertical-nav {\n border-top:1px solid #272727 !important;\n}\n.hh #yt-admin-content {\n background-color:#3A3A3A !important;\n border:none !important;\n}\n#improved-dashboard-promo {\n background-color:#3A3A3A !important;\n}\n#improved-dashboard-promo h2 strong {\n color:#AF2B26 !important;\n}\n#improved-dashboard-promo h2 {\n color:#CCC !important;\n}\n.yt-default p, p.yt {\n color:#777 !important;\n}\n.dismiss-improved-dashboard-promo img.yt-close-img {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -40px -212px transparent !important;\n}\n.hh #vm-page-subheader {\n background-color:#3A3A3A !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#3A3A3A,EndColorStr=#111) !important;\n background-image:-moz-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:-ms-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:-o-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3A3A3A),color-stop(100%,#111)) !important;\n background-image:-webkit-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:linear-gradient(to bottom,#3A3A3A 0,#111 100%) !important;\n}\n#vm-page-subheader h3 {\n color:#CCC !important;\n}\n#vm-page-subheader .yt-badge-vm {\n background-color:#CCC !important;\n color:#0F0F0F !important;\n}\n#vm-video-actions-inner {\n border-top:1px solid #333 !important;\n border-bottom:1px solid #333 !important;\n background-color:#111 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#1A1A1A,EndColorStr=#222) !important;\n background-image:-moz-linear-gradient(top,#1A1A1A 0,#222 100%) !important;\n background-image:-ms-linear-gradient(top,#1A1A1A 0,#222 100%) !important;\n background-image:-o-linear-gradient(top,#1A1A1A 0,#222 100% !important);\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#1A1A1A),color-stop(100%,#222)) !important;\n background-image:-webkit-linear-gradient(top,#1A1A1A 0,#222 100%) !important;\n background-image:linear-gradient(to bottom,#1A1A1A 0,#222 100%) !important;\n}\n.vm-list-view .vm-video-metrics {\n border-left:1px solid #111 !important;\n background:#222 !important;\n background-image:-moz-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:-ms-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:-o-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:-webkit-gradient(linear,left top,right top,color-stop(0,#1B1B1B),color-stop(11px,#222)) !important;\n background-image:-webkit-linear-gradient(left,#1B1B1B 0,#222 11px) !important;\n background-image:linear-gradient(to right,#1B1B1B 0,#222 11px) !important;\n}\n.vm-list-view .vm-video-list li, .vm-video-item {\n background:#222 !important;\n}\n.vm-list-view .vm-video-item-content {\n border-bottom:none !important;\n}\n.yt-uix-button-hh-default:active, .yt-uix-button-subscription:active, .yt-uix-button-subscription.yt-uix-button-active, .yt-uix-button-hh-text:active, .yt-uix-button-panel .yt-uix-button-hh-text:active, .yt-uix-button-hh-default.yt-uix-button-active, .yt-uix-button-hh-default.yt-uix-button-toggled, .yt-uix-button-hh-text.yt-uix-button-active {\n border-color:#454545 !important;\n background-color:#2B2B2B !important;\n background-image:none !important;\n -moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n -ms-box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n box-shadow:inset 0 1px 1px rgba(0,0,0,.20) !important;\n}\n.vm-beauty-view .vm-video-item-content {\n background:#222 !important;\n box-shadow:0 2px 5px #111 !important;\n}\n.vm-list-view .vm-video-title .vm-video-title-content {\n color:#CCC !important;\n}\n.vm-list-view .vm-video-metrics a:hover {\n background:#333 !important;\n}\n.vm-list-view .vm-video-metrics .video-view-count img, .video-view-count img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -17px -349px !important;\n}\n.vm-list-view .vm-video-metrics a:hover .video-view-count img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -7px -529px !important;\n}\n.vm-list-view .vm-video-metrics .video-comments img, .video-comments img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -8px -261px !important;\n}\n.vm-list-view .vm-video-metrics a:hover .video-comments img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -22px -337px !important;\n}\n.vm-list-view .vm-video-metrics .video-likes-count img, .video-likes-count img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") 0 -337px !important;\n}\n.vm-list-view .vm-video-metrics a:hover .video-likes-count img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") 0 -44px !important;\n}\n.vm-list-view .vm-video-metrics .video-dislikes-count img, .video-dislikes-count img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") 0 -452px !important;\n}\n.vm-list-view .vm-video-metrics a:hover .video-dislikes-count img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -11px -337px !important;\n}\n.vm-list-view .vm-video-audioswap img {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -17px -27px !important;\n}\n#creator-sidebar .creator-sidebar-bullet {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -12px -641px !important;\n}\n.yt-uix-button-icon-vm-beauty-view {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") 0 -167px !important;\n}\n.yt-uix-button-icon-vm-list-view{\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") 0 -186px !important;\n}\n#dashboard-header h1 {\n color:#CCC !important;\n text-shadow:0 1px 0 #000 !important;\n}\n#dashboard-header .dashboard-stat-value, #dashboard-header .dashboard-stat-name {\n text-shadow:0 1px 0 #000 !important;\n}\n#dashboard-header .dashboard-stat-name {\n color:#BBB !important;\n}\n.yt-uix-slider-num {\n background:#FFF !important;\n}\n.dashboard-widget.promos .yt-uix-pager .yt-uix-slider-num-current, .dashboard-widget.promos .yt-uix-pager .yt-uix-slider-num:hover {\n background:#FFF !important;\n color:#777 !important;\n}\n.yt-uix-pager {\n padding-bottom:15px !important;\n}\n#yt-admin-sidebar-hh a {\n color:#888 !important;\n background:#272727 !important;\n}\n#yt-admin-sidebar-hh a:hover {\n text-decoration:none !important;\n background:#444 !important;\n background-image:-moz-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-ms-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-o-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#444),color-stop(100%,#333)) !important;\n background-image:-webkit-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:linear-gradient(to bottom,#444 0,#333 100%) !important;\n}\n#video-media-filters, #video-media-list {\n background:#FBFBFB !important;\n}\n#video-search-input.yt-search-field {\n box-shadow:none !important;\n border:none !important;\n}\n#creator-sidebar .creator-sidebar-section.selected, #creator-sidebar .creator-sidebar-section.selected:hover, #creator-sidebar .creator-sidebar-channel-link {\n background:none !important;\n border-color:#0A0A0A !important;\n}\n#yt-admin-sidebar-hh .selected,#yt-admin-sidebar-hh .selected:hover {\n color:#fff !important;\n background:#af2b26 !important;\n background-image:-moz-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-ms-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-o-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#af2b26),color-stop(100%,#942422)) !important;\n background-image:-webkit-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:linear-gradient(to bottom,#af2b26 0,#942422 100%) !important;\n}\n#vm-page-subheader {\n border-bottom:none !important;\n}\n#vm-video-list-container {\n border-top:none !important;\n}\n#yt-admin-content.ytg-fl {\n background:#222 !important;\n}\n#vm-view-toggle .list img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll 0 -95px !important;\n}\n#vm-view-toggle .list-selected img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll 0 -115px !important;\n}\n#vm-view-toggle .grid img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll -48px -95px !important;\n}\n#vm-view-toggle .grid-selected img {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll -48px -115px !important;\n}\n.vm-grid-video-list .vm-video-data {\n color:#CCC !important;\n}\n#vm-pagination {\n background:#222 !important;\n border-top:1px solid #3A3A3A !important;\n}\n.vm-video-list li {\n border-top:1px solid #111 !important;\n}\n.vm-video-list .vm-video-info {\n color:#999 !important;\n}\n.vm-list-view .vm-video-metrics, .vm-video-metrics {\n border-left:1px solid #111 !important;\n}\n.vm-video-metrics dd {\n color:#CCC !important;\n}\n#yt-admin-recommendations h2, #vm-page-subheader {\n border-bottom:1px solid #0A0A0A !important;\n box-shadow:none !important;\n}\n#yt-admin-recommendations h2, #yt-admin-recommendations .find-more {\n background-image:-moz-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image:-ms-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image:-o-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image:-webkit-gradient(linear,left top,right top,color-stop(0,rgba(188,188,188,0.8)),color-stop(100%,transparent)) !important;\n background-image:-webkit-linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n background-image:linear-gradient(left,rgba(188,188,188,.08) 0,transparent 100%) !important;\n}\n#yt-admin.recommendations h2, #yt-admin.recommendations h3, #yt-admin-recommendations .find-more a {\n color:#CCC !important;\n}\n#yt-admin .channel-recommendation .metas {\n color:#999 !important;\n}\n.yt-close-img,.box-close-link img,.yt-uix-clickcard-close,.close-small {\n background:no-repeat url(\"http://z4.ifrm.com/30093/71/0/f5254724/refresh.png\") -40px -212px !important;\n}\n\n.channel-recommendation-dismiss {\n color:transparent !important;\n}\n\n\n.GJOPA4DCGJ #contentTable {\n border-bottom:none !important;\n}\n#insight {\n margin:0 5px 0 -5px !important;\n background-color:#272727 !important;\n}\n.GO1CBYXDBV .GO1CBYXDJU a, .GO1CBYXDBV a.GO1CBYXDJU, .GO1CBYXDBV .GO1CBYXDJU a:focus, .GO1CBYXDBV a.GO1CBYXDJU:focus, .GO1CBYXDBV .GO1CBYXDJU a:active .GO1CBYXDBV a.GO1CBYXDJU:active {\n color:#888 !important;\n}\n.GO1CBYXDBV .GO1CBYXDCV > .GO1CBYXDJU a, .GO1CBYXDBV .GO1CBYXDCV > .GO1CBYXDJU:hover a {\n color:#FFF !important;\n}\n.GO1CBYXDAV .GO1CBYXDNU {\n background:url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") no-repeat -106px -1px transparent !important;\n}\n.GO1CBYXDLU .GO1CBYXDNU {\n background:url(\"http://z3.ifrm.com/22/130/0/f671314/dark-hitchhiker-vflX22WRH.png\") no-repeat -106px -13px transparent !important;\n}\n#body-container #content-container #baseDiv #insight table#contentTable td div div #gwt-debug-titlePanel div div h2 {\n background:#FFF !important;\n}\n\n#folder_title.yt-admin-h2 {\n color:#CCC !important;\n border:none !important;\n} \n#folder_title.yt-admin-h2, #body-container #content-container #baseDiv #ab-main.ab-main h2#ab-current-group-title, #ab-pagination-top {\n background-color:#3A3A3A !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#3A3A3A,EndColorStr=#111) !important;\n background-image:-moz-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:-ms-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:-o-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#3A3A3A),color-stop(100%,#111)) !important;\n background-image:-webkit-linear-gradient(top,#3A3A3A 0,#111 100%) !important;\n background-image:linear-gradient(to bottom,#3A3A3A 0,#111 100%) !important;\n}\n.buttonbar {\n color:#CCC !important;\n border-top:1px solid #333 !important;\n border-bottom:1px solid #333 !important;\n}\n.buttonbar, #ab-rightcontainer-contacts table td:only-child {\n background-color:#111 !important;\n filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#1A1A1A,EndColorStr=#222) !important;\n background-image:-moz-linear-gradient(top,#1A1A1A 0,#222 100%) !important;\n background-image:-ms-linear-gradient(top,#1A1A1A 0,#222 100%) !important;\n background-image:-o-linear-gradient(top,#1A1A1A 0,#222 100% !important);\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#1A1A1A),color-stop(100%,#222)) !important;\n background-image:-webkit-linear-gradient(top,#1A1A1A 0,#222 100%) !important;\n background-image:linear-gradient(to bottom,#1A1A1A 0,#222 100%) !important;\n}\n.yt-admin-h2 {\n background:#272727 !important;\n}\n.sorterbar th, th.ab-users-head, .ab-mulsel-hdr {\n background-color:#3C3C3C !important;\n filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#3c3c3c',endColorstr='#151515',GradientType=0) !important;\n background:-moz-linear-gradient(top,#3c3c3c 0%, #151515 100%) !important;\n background:-ms-linear-gradient(top,#3c3c3c 0%,#151515 100%) !important;\n background:-o-linear-gradient(top,#3c3c3c 0%,#151515 100%) !important;\n background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#3c3c3c),color-stop(100%,#151515)) !important;\n background:-webkit-linear-gradient(top,#3c3c3c 0%,#151515 100%) !important;\n background:linear-gradient(to bottom,#3c3c3c 0%,#151515 100%) !important;\n border-color:#333 !important;\n}\n.m_nohighlight {\n background-color:#111 !important;\n}\n.m_highlight {\n background-color:#151515 !important;\n}\n.message.closed td, .message-display a {\n color:#CCC !important;\n}\n.message.open td {\n background-color:#111 !important;\n border-color:#666 !important;\n color:#FFF !important;\n}\n.subject .video-details {\n max-width:390px !important;\n}\n\n.yt-user-name {\n line-height:20px !important;\n}\n.message .yt-admin-h3, .message .body {\n overflow:visible !important;\n}\n.addressbook {\n margin:0 !important;\n}\n\nbody #yt-admin.hh {\n background:#272727 !important;\n}\n#body-container #content-container #baseDiv h2 {\n background:#3A3A3A !important;\n color:#CCC !important;\n padding:5px !important;\n}\n#content-container #baseDiv {\n background:#272727 !important;\n margin-bottom:190px !important;\n width:1003px !important;\n}\n#ab-rightcontainer-contacts {\n background:#222 !important;\n width:803px !important;\n}\n.ab-main {\n border:none !important;\n width:auto !important;\n}\n.ab-new-divider-spacer {\n display:none !important;\n}\n.ab-new {\n width:180px !important;\n}\n#body-container #content-container #baseDiv #ab-main.ab-main h2#ab-current-group-title {\n color:#CCC !important;\n border-left:1px solid #3A3A3A !important;\n padding:17.5px 10px !important;\n width:695px !important;\n}\n#ab-pagination-top {\n color:#CCC !important;\n border-right:1px solid #3A3A3A !important;\n margin:0px !important;\n padding:17.5px 5px 17.5px 6px !important;\n width:75px !important;\n}\n#ab-rightcontainer-contacts table td:only-child {\n width:auto !important;\n border:1px solid #3A3A3A !important;\n}\n.ab-layout-table {\n border:none !important;\n}\n#ab-group-_all_contacts_, #ab-group-_blocked_, .ab-group-subscribe-link {\n color:#888 !important;\n padding:0px !important;\n}\n.ab-group-name, .ab-contact {\n color:#888 !important;\n padding:0 0 0 20px !important;\n text-indent:0px !important;\n line-height:28px !important;\n font-size:11px !important;\n text-decoration:none !important;\n border-bottom:none !important;\n text-shadow:none !important;\n box-shadow:none !important;\n -moz-box-shadow:none !important;\n -webkit-box-shadow:none !important;\n}\n.ab-group-name:hover, .ab-contact:hover {\n text-decoration:none !important;\n background:#444 !important;\n background-image:-moz-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-ms-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-o-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#444),color-stop(100%,#333)) !important;\n background-image:-webkit-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:linear-gradient(to bottom,#444 0,#333 100%) !important;\n}\n#ab-group-_all_contacts_.ab-leftpane-sel, #ab-group-_blocked_.ab-leftpane-sel {\n background:#af2b26 !important;\n background-image:-moz-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-ms-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-o-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#af2b26),color-stop(100%,#942422)) !important;\n background-image:-webkit-linear-gradient(top,#af2b26 0,#942422 100%) !important;\n background-image:linear-gradient(to bottom,#af2b26 0,#942422 100%) !important;\n}\n#ab-group-_all_contacts_.ab-leftpane-sel .ab-group-name, #ab-group-_blocked_.ab-leftpane-sel .ab-group-name {\n color:#fff !important;\n font-weight:bold !important;\n}\n.ab-layout-table table {\n width:auto !important;\n}\nth.ab-users-head span {\n margin-left:-20px !important;\n color:#CCC !important;\n}\nth.ab-users-head img {\n display:none !important;\n}\ntr.ab-users {\n background-color:#151515 !important;\n color:#CCC !important;\n}\ntr.ab-users:nth-child(2n+1) {\n background:#111 !important;\n}\n.ab-midpane {\n background:#212121 !important;\n}\n#ab-contacts-table {\n border-top:none !important;\n}\n.ab-rightpane {\n width:601px !important;\n}\n.ab-mulsel-hdr {\n color:#CCC !important;\n padding:5px 10px !important;\n margin-right:0px !important;\n height:14px !important;\n}\n\n.account-sidebar {\n background:#272727 !important;\n}\n.account-sidebar-section li a, .account-sidebar-section h6 {\n color:#888 !important;\n}\n.account-sidebar-section li a.selected, .account-sidebar-section li a.selected:hover {\n color:#FFF !important;\n}\n.account-container {\n background:#222 !important;\n border-color:#3A3A3A !important;\n}\n.account-header h2 {\n color:#CCC !important;;\n}\n.account-page {\n color:#777 !important;\n}\n.yt-dialog-bg, .yt-uix-overlay-bg {\n background-color:#222 !important;\n}\n.vm-video-actions-delete-overlay .vm-video-actions-delete-header, .yt-dialog-fg, .yt-uix-overlay-fg {\n border-color:#3A3A3A !important;\n background:url(\"http://z4.ifrm.com/30093/71/0/f5254725/refreshbg.png\") repeat #040404 !important;\n}\n.yt-alert-naked .yt-alert-content, .vm-video-actions-delete-overlay .vm-video-actions-delete-main-area, .subscription-confirmation-display-name {\n color:#CCC !important;\n}\n.yt-dialog-fg-content h2, .yt-uix-overlay-fg-content h2, .yt-uix-overlay-header {\n border-bottom:1px solid #3A3A3A !important;\n color:#CCC !important;\n}\n#profile-picture li {\n color:#CCC !important;\n}\n.social-connector {\n background:#444 !important;\n border-color:#777 !important;\n color:#CCC !important;\n}\n.account-sharing-preference-headers .disabled {\n color:#333 !important;\n}\n.guidelines .yt-uix-expander .yt-uix-expander-arrow {\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll -10px 0 !important;\n margin-top:7px !important;\n}\n.guidelines .yt-uix-expander-collapsed .yt-uix-expander-arrow{\n background:transparent url(\"http://z3.ifrm.com/22/130/0/f670750/dark-mmimgs-vfl0a1hhX.png\") no-repeat scroll 0 0 !important;\n margin-top:7px !important;\n}\n.example h4 {\n color:#999 !important;\n}\n\n#page.search-base div.primary-col {\n border:none !important;\n background:#222 !important;\n}\n.yt-lockup2:hover {\n background:#333 !important;\n}\n.search-header {\n border:none !important;\n}\n#filter-dropdown {\n background:#3A3A3A !important;\n}\n.filter-top button span {\n color:#CCC !important;\n}\n.filter-col-title {\n color:#CCC !important;\n}\n.filter-content {\n color:#CCC !important;\n}\n.filter-content:hover {\n background:#555 !important;\n}\n.filter {\n color:#999 !important;\n}\n.filter:hover {\n color:#CCC !important;\n}\n.yt-lockup2 .yt-lockup2-meta a, .yt-lockup2 .yt-lokcup2-meta b {\n color:#CCC !important;\n}\n.yt-lockup2 p, .yt-lockup2-badges {\n color:#777 !important;\n}\n#search-results a:visited{\n color:#26639D !important;\n}\n#page.search-base {\n min-height:650px !important;\n}\n.result-item-onebox {\n border-color:#555 !important;\n}\n.username-prepend {\n color:#777 !important;\n}\n\n#upload-sidebar .social-connector .info .social-network-name {\n color:#CCC !important;\n margin-bottom:0 !important;\n padding-top:2px !important;\n}\n#upload-sidebar .social-connector img {\n margin-top:2px !important;\n}\n#upload-other-options-list .upload-option-text {\n color:#777 !important;\n}\n.upload-sidebar-header {\n color:#CCC !important;\n}\n#upload-help-links li {\n color:#777 !important;\n}\n#main-content .starting-box {\n background:#222 !important;\n border:none !important;\n}\n#upload-prompt-box {\n border:none !important;\n margin:0 !important;\n}\nbutton#upload-delay-publishing-options {\n background:transparent !important;\n}\nbutton#start-upload-button-single {\n background:transparent !important;\n border:none !important;\n}\n#upload-button-text {\n color:#CCC !important;\n}\n.yt-uix-form-textarea, #upload-page .yt-uix-form-textarea, .yt-uix-form-input-select, .yt-uix-form-input-text, .yt-uix-form-input-textarea, .video-settings-tag-chips-container {\n color:#FFF !important;\n text-shadow:0 1px 1px #333 !important;\n background:#898989 !important;\n border:1px solid #333 !important;\n -moz-box-shadow:inset 0 1px 2px #333 !important;\n -ms-box-shadow:inset 0 1px 2px #333 !important;\n -webkit-box-shadow:inset 0 1px 2px #333 !important;\n box-shadow:inset 0 1px 2px #333 !important;\n}\n.video-settings-add-tag {\n color:#FFF !important;\n text-shadow:0 1px 1px #333 !important;\n background:#898989 !important;\n}\n.upload-item {\n background-color:#222 !important;\n border:none !important;\n}\n.item-title {\n color:#CCC !important;\n}\n.item-sub-title {\n color:#999 !important;;\n}\n.yt-uix-button-icon-upload-add, .yt-uix-button-icon-addto {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -24px -143px !important;\n}\n#upload-page li.tab-header {\n background-color:transparent !important; \n}\n#upload-page .metadata-editor-container .tab-bg {\n background-color:#222 !important; \n border-bottom:1px solid #0A0A0A !important;\n}\n#upload-page .metadata-editor-container .tab-header.selected a, #upload-page .metadata-editor-container .tab-header a:hover {\n color:#9C9C9C !important;\n}\n#upload-page .metadata-editor-container .tab-header a {\n color:#555 !important;\n}\n#upload-page .metadata-tab {\n background-color:#222 !important; \n}\n#upload-page h4 {\n color:#CCC !important;\n}\n#upload-page .video-settings-add-tag {\n background:#898989 !important;\n color:#CCC !important;\n}\n#upload-page .yt-chip, .hh .tag, .my_videos_edit .yt-chip {\n color:#CCC !important;\n background:#777 !important;\n border:1px solid #444 !important;\n -moz-box-shadow:0 1px 0 black !important;\n -ms-box-shadow:0 1px 0 black !important;\n -webkit-box-shadow:0 1px 0 black !important;\n box-shadow:0 1px 0 black !important;\n}\n#upload-page .yt-selected-chip{\n border:1px solid #CCC !important;\n}\n#upload-page .yt-chip .yt-delete-chip {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") -19px -261px !important;\n}\n#upload-page label, .tag-suggest-title, .thumb-placeholder.large-thumb-dimensions, .metadata-privacy-option-desc, .creator-share-limit-exceeded-warning {\n color:#CCC !important;\n}\n.yt-uix-button-icon-upload-cancel {\n background:no-repeat url(\"http://z3.ifrm.com/22/130/0/f671481/dark-videomanager-vflpGt7Bv.png\") 0 -638px !important;\n}\n.my_videos_edit #content, .enhance #content, #inline-editor-main, .audio #content, .page-default #content, #annotator-div {\n background:#222 !important;\n border:none !important;\n}\n.my_videos_edit #content, .hh .metadata-container, .hh .metadata-editor-container .video-settings-form, .hh .metadata-editor-container .tab-bg, .hh .metadata-editor-container .tab-header.selected {\n background:#222 !important;\n}\n.creator-editor-nav {\n  background:url(\"http://z4.ifrm.com/30093/71/0/f5254725/refreshbg.png\") repeat #040404 !important;\n}\n.creator-editor-icon-edit, .creator-editor-icon-enhance, .creator-editor-icon-audio, .creator-editor-icon-annotate, .creator-editor-icon-captions {\n background-image:url(\"http://z3.ifrm.com/22/130/0/f671287/dark-creatoreditor-vfluqdrTu.png\") !important;\n}\n#video-header #title, .creator-editor-nav-tabs li span, .creator-editor-nav-tabs li a, .creator-editor-title a, #player-and-info-pane #video-info h2, .my_videos_edit h4, .my_videos_edit label {\n color:#CCC !important;\n}\n#player-and-info-pane #video-info dt, #player-and-info-pane #video-info dd {\n color:#777 !important;\n}\n.creator-editor-title a:hover {\n color:#468ACA !important;\n}\n.creator-editor-nav-tabs li {\n border-bottom:4px solid transparent !important;\n}\n.creator-editor-nav-tabs li.selected, .creator-editor-nav-tabs li:hover {\n border-bottom:4px solid #8F2F27 !important;\n}\n.video-header-divider, .creator-editor-header, .creator-editor-content #inline-editor-header, .hh .metadata-editor-container .tab-bg, #inline-editor-revert-container, #audio-ui-pagefold, #annotator-add-div, #annotator-select-div, .annotation-details-container li.annotation-time-pair, .annotation-link {\n border-color:#040404 !important;\n}\n.hh .metadata-editor-container .tab-header.selected a, .hh .metadata-editor-container .tab-header a:hover, div.annotation-header, .annotation-label-start, .annotation-label-end, .annotation-link-heading, .captions-status {\n color:#CCC !important;\n}\n#audio-ui-featured-table-container thead td {\n background-image:-moz-linear-gradient(top,#474747 0,#2b2b2b 100%) !important;\n background-image:-ms-linear-gradient(top,#474747 0,#2b2b2b 100%) !important;\n background-image:-o-linear-gradient(top,#474747 0,#2b2b2b 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#474747),color-stop(100%,#2b2b2b)) !important;\n background-image:-webkit-linear-gradient(top,#474747 0,#2b2b2b 100%) !important;\n background-image:linear-gradient(to bottom,#474747 0,#2b2b2b 100%) !important;\n color:#CCC !important;\n}\nimg.audio-ui-add-audio {\n background-image:url(\"http://z3.ifrm.com/22/130/0/f671311/dark-editor-vfl4N9FCz.png\") !important;\n}\n.yt-uix-button-icon-annotation-add, .icon-annotation-add, .yt-uix-button-icon-annotation-edit, .icon-annotation-edit {\n background-image:url(\"http://z3.ifrm.com/22/130/0/f671310/dark-annotations-vfl5ypbTd.png\") !important;\n}\n#audio-ui-featured-table, .audio-ui-featured-row {\n border-color:#2B2B2B !important;\n box-shadow:none !important;\n}\n.audio-ui-featured-row:hover {\n background-color:#2B2B2B !important;\n}\n#audio-ui-search-input-field {\n background-color:transparent !important;\n box-shadow:none !important;\n border:none !important;\n}\n\n#page.about-pages #content, .rtl #content {\n border:none !important;\n background:#222 !important;\n background:-moz-linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,#222 100%) !important;\n background:-o-linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,#222 100%) !important;\n background:-webkit-linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,#222 100%) !important;\n background:linear-gradient(left,transparent,transparent 175px,rgba(255,255,255,.08) 204px,rgba(0,0,0,.12) 205px,#222 205px,222 100%) !important;\n}\n#page.about-pages .ytg-wide {\n width:1003px !important;\n}\n#yts-article #header, .with-divider, #yts-article p {\n border-color:#0A0A0A !important;\n color:#CCC !important;\n}\n#yts-article, #yts-article a.anchor, .video-slideshow .video-list-item .title {\n color:#777 !important;\n}\n#yts-nav ol li.top-level a:link, #yts-nav ol li.top-level a:visited {\n color:#CCC !important;\n}\n#yts-nav ol.indented li a:link, #yts-nav ol.indented li a:visited {\n color:#999 !important;\n}\n#yts-article .with-separator, #yts-article .with-bottom-separator, .dev-page .ytg-box, .separator {\n border-color:#0A0A0A !important;\n}\n#yts-nav .indented,#yts-nav .top-level-single {\n border-bottom:none !important;\n text-shadow:0 1px 1px rgba(0,0,0,.5);\n \n -moz-box-shadow:none !important;\n -ms-box-shadow:none !important;\n -webkit-box-shadow:none !important;\n box-shadow:none !important;\n}\n#yts-nav ol.indented li a:hover, #yts-nav ol.indented li .item-highlight {\n background:#444 !important;\n background-image:-moz-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-ms-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-o-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#444),color-stop(100%,#333)) !important;\n background-image:-webkit-linear-gradient(top,#444 0,#333 100%) !important;\n background-image:linear-gradient(to bottom,#444 0,#333 100%) !important;\n}\n#yts-article .grey-rounded-box {\n background-color:#444 !important;\n}\n.video-list-item a:hover {\n background:transparent !important;\n}\n.with-border {\n border:1px solid #555 !important;\n}\n#content .nav-box-gray, #yts-article .box-gray {\n color:#CCC !important;\n background-color:#333 !important;\n border:1px solid #555 !important;\n}\n#yt-creator-survey {\n display:none;\n}\n#yts-nav .top-level-multiple h3 {\n color:#CCC !important;\n}\n#error-page-content p {\n  color:#FFF !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

// ==UserScript==
// @name           YouTube Auto Buffer & Auto HD & Remove Ads
// @namespace      userscripts.org
// @description    Buffers the video without autoplaying, removes in-video ads, and puts it in hd if the option is on. For Firefox and Opera
// @include        http*://*.youtube.com/*
// @include        http*://youtube.com/*
// @copyright      JoeSimmons
// @version        1.2.70
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://usocheckup.redirectme.net/49366.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// Make sure it's running on the main page, no frames
try {
	var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
	if(unsafeWindow.frameElement != null) return;
} catch(e) {}

var GM_config = {
 storage: 'GM_config', // This needs to be changed to something unique for localStorage
 init: function() {
        // loop through GM_config.init() arguements
	for(var i=0,l=arguments.length,arg; i<l; ++i) {
		arg=arguments[i];
		switch(typeof arg) {
            case 'object': for(var j in arg) { // could be a callback functions or settings object
							switch(j) {
							case "open": GM_config.onOpen=arg[j]; delete arg[j]; break; // called when frame is gone
							case "close": GM_config.onClose=arg[j]; delete arg[j]; break; // called when settings have been saved
							case "save": GM_config.onSave=arg[j]; delete arg[j]; break; // store the settings objects
							default: var settings = arg;
							}
			} break;
            case 'function': GM_config.onOpen = arg; break; // passing a bare function is set to open
                        // could be custom CSS or the title string
			case 'string': if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1) var css = arg;
				else GM_config.title = arg;
				break;
		}
	}
	if(!GM_config.title) GM_config.title = 'Settings - Anonymous Script'; // if title wasn't passed through init()
	var stored = GM_config.read(); // read the stored settings
	GM_config.passed_values = {};
	for (var i in settings) {
	GM_config.doSettingValue(settings, stored, i, null, false);
	if(settings[i].kids) for(var kid in settings[i].kids) GM_config.doSettingValue(settings, stored, kid, i, true);
	}
	GM_config.values = GM_config.passed_values;
	GM_config.settings = settings;
	if (css) GM_config.css.stylish = css;
 },
 open: function() {
 if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
	// Create frame
	document.body.appendChild((GM_config.frame=GM_config.create('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
	GM_config.frame.addEventListener('load', function(){
		var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
		obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

		// Add header and title
		frameBody.appendChild(create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

		// Append elements
		var anch = frameBody, secNo = 0; // anchor to append elements
		for (var i in settings) {
			var type, field = settings[i], value = obj.values[i];
			if (field.section) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', id:'section_'+secNo, kids:new Array(
				  create('a', {className:'section_header center', href:"javascript:void(0);", id:'c_section_kids_'+secNo, textContent:field.section[0], onclick:function(){GM_config.toggle(this.id.substring(2));}}),
				  create('div', {id:'section_kids_'+secNo, className:'section_kids', style:obj.getValue('section_kids_'+secNo, "")==""?"":"display: none;"})
				  )}));
				if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
				secNo++;
			}
			anch.childNodes[1].appendChild(GM_config.addToFrame(field, i, false));
		}

		// Add save and close buttons
		frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:new Array(
			obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
			obj.create('div', {className:'reset_holder block', kids:new Array(
				obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
		)}))}));

		obj.center(); // Show and center it
		window.addEventListener('resize', obj.center, false); // Center it on resize
		if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
		// Close frame on window close
		window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);
	}, false);
 },
 close: function(save) {
	if(save) {
		var type, fields = GM_config.settings, typewhite=/radio|text|hidden|checkbox/;
		for(f in fields) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
			if(typewhite.test(field.type)) type=field.type;
				else type=field.tagName.toLowerCase();
			GM_config.doSave(f, field, type);
			if(kids) for(var kid in kids) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
			if(typewhite.test(field.type)) type=field.type;
				else type=field.tagName.toLowerCase();
			GM_config.doSave(kid, field, type, f);
			}
		}
                if(GM_config.onSave) GM_config.onSave(); // Call the save() callback function
                GM_config.save();
	}
	if(GM_config.frame) GM_config.remove(GM_config.frame);
	delete GM_config.frame;
        if(GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
 },
 set: function(name,val) {
	GM_config.values[name] = val;
 },
 get: function(name) {
	return GM_config.values[name];
 },
 isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
 log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
 getValue : function(name, def) { return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); },
 setValue : function(name, value) { return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); },
 save: function(store, obj) {
    try {
      var val = JSON.stringify(obj||GM_config.values);
      GM_config.setValue((store||GM_config.storage),val);
    } catch(e) {
      GM_config.log("GM_config failed to save settings!");
    }
 },
 read: function(store) {
    try {
      var val = GM_config.getValue((store||GM_config.storage), '{}'), rval = JSON.parse(val);
    } catch(e) {
      GM_config.log("GM_config failed to read saved settings!");
      rval = {};
    }
    return rval;
 },
 reset: function(e) {
	e.preventDefault();
	var type, obj = GM_config, fields = obj.settings;
	for(f in fields) {
		var field = obj.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
		if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
		GM_config.doReset(field, type, null, f, null, false);
		if(kids) for(var kid in kids) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
			if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
			GM_config.doReset(field, type, f, kid, true);
			}
	}
 },
 addToFrame : function(field, i, k) {
	var elem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, create=GM_config.create, isKid = k!=null && k===true;
		switch(field.type) {
				case 'textarea':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					), className: 'config_var'});
					break;
				case 'radio':
					var boxes = new Array();
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('span', {id:'field_'+i, kids:boxes})
					), className: 'config_var'});
					break;
				case 'select':
					var options = new Array();
					if(!Options.inArray) for(var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(j==value)}));
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i, kids:options})
					), className: 'config_var'});
					break;
				case 'checkbox':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					), className: 'config_var'});
					break;
				case 'button':
				var tmp;
					elem = create(isKid ? "span" : "div", {kids:new Array(
						(tmp=create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					), className: 'config_var'});
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'hidden':
				elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i, type:'hidden', value:value})
					), className: 'config_var'});
					break;
				default:
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					), className: 'config_var'});
			}
	if(field.kids) {
	var kids=field.kids;
	for(var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
	}
return elem;
},
 doSave : function(f, field, type, oldf) {
 var isNum=/^[\d\.]+$/, set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
 switch(type) {
				case 'text':
					GM_config.values[f] = ((set[f].type=='text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf(","+set[f].type)!=-1) ? parseFloat(field.value) : false));
					if(set[f]===false) {
						alert('Invalid type for field: '+f+'\nPlease use type: '+set[f].type);
						return;
					}
					break;
				case 'hidden':
					GM_config.values[f] = field.value.toString();
					break;
				case 'textarea':
					GM_config.values[f] = field.value;
					break;
				case 'checkbox':
					GM_config.values[f] = field.checked;
					break;
				case 'select':
					GM_config.values[f] = field.options[field.selectedIndex].value;
					break;
				case 'span':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].checked) GM_config.values[f] = radios[i].value;
					}
					break;
			}
 },
 doSettingValue : function(settings, stored, i, oldi, k) {
		var set = k!=null && k==true && oldi!=null ? settings[oldi]["kids"][i] : settings[i];
			if(",save,open,close".indexOf(","+i) == -1) {
            // The code below translates to:
            // if a setting was passed to init but wasn't stored then 
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            // 		else use the stored value
            try {
            var value = (stored[i]==undefined ? (set["default"]==undefined ? null : set["default"]) : stored[i]);
			} catch(e) {
			var value = (stored[i]=="undefined" ? (set["default"]=="undefined" ? null : set["default"]) : stored[i]);
			}
            
            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch(set["type"]) {
                    case 'radio': case 'select':
                        value = set.options[0]; break;
                    case 'checkbox':
                        value = false; break;
                    case 'int': case 'float':
                        value = 0; break;
                    default:
					value = (typeof stored[i]=="function") ? stored[i] : "";
                }
			}
			
			}
	GM_config.passed_values[i] = value;
 },
 doReset : function(field, type, oldf, f, k) {
 var isKid = k!=null && k==true, obj=GM_config,
	 set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
 switch(type) {
			case 'text':
				field.value = set['default'] || '';
				break;
			case 'hidden':
				field.value = set['default'] || '';
				break;
			case 'textarea':
				field.value = set['default'] || '';
				break;
			case 'checkbox':
				field.checked = set['default'] || false;
				break;
			case 'select':
				if(set['default']) {
					for(var i=field.options.length-1; i>=0; i--)
					if(field.options[i].value==set['default']) field.selectedIndex=i;
				}
				else field.selectedIndex=0;
				break;
			case 'span':
				var radios = field.getElementsByTagName('input');
				if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
					if(radios[i].value==set['default']) radios[i].checked=true;
				}
				break;
		}
 },
 values: {},
 settings: {},
 css: {
 basic: 'body {background:#FFFFFF;}\n' +
 '.indent40 {margin-left:40%;}\n' +
 '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' +
 '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' +
 '.block {display:block;}\n' +
 '.saveclose_buttons {\n' +
 'margin:16px 10px 10px 10px;\n' +
 'padding:2px 12px 2px 12px;\n' +
 '}\n' +
 '.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
 '.config_header {font-size:20pt; margin:0;}\n' +
 '.config_desc, .section_desc, .reset {font-size:9pt;}\n' +
 '.center {text-align:center;}\n' +
 '.section_header_holder {margin-top:8px;}\n' +
 '.config_var {margin:0 0 4px 0; display:block;}\n' +
 '.section_header {font-size:13pt; background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' +
 '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' +
 'input[type="radio"] {margin-right:8px;}',
 stylish: ''},
 create: function(a,b) {
	var ret=window.document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for(var i=0; i<prop.length; i++) ret.appendChild(prop[i]);
		else if(",style,accesskey,id,name,src,href,for".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}
	return ret;
 },
 center: function() {
	var node = GM_config.frame, style = node.style, beforeOpacity = style.opacity;
	if(style.display=='none') style.opacity='0';
	style.display = '';
	style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
	style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
	style.opacity = '1';
 },
 run: function() {
    var script=GM_config.getAttribute('script');
    if(script && typeof script=='string' && script!='') {
      func = new Function(script);
      window.setTimeout(func, 0);
    }
 },
 addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr) }, false); },
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); },
 toggle : function(e) {
	var node=GM_config.frame.contentDocument.getElementById(e);
	node.style.display=(node.style.display!='none')?'none':'';
	GM_config.setValue(e, node.style.display);
 },
};

// Allow opera to use the GM functions, but re-written (from TarquinWJ)
if(window.opera) {
GM_xmlhttpRequest = XMLHttpRequest;
GM_log = opera.postError;
window._content = window;
function GM_setValue( cookieName, cookieValue, lifeTime ) {
	if( !cookieName ) { return; }
	if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
	document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
}
function GM_getValue( cookieName, oDefault ) {
	var cookieJar = document.cookie.split( "; " );
	for( var x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] == escape( cookieName ) ) {
			try {
				eval('var footm = '+unescape( oneCookie[1] ));
			} catch(e) { return oDefault; }
			return footm;
		}
	}
	return oDefault;
}
function GM_deleteValue( oKey ) {
	GM_setValue( oKey, '', 'delete' );
}
}

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// setVar by JoeSimmons
// Syntax: "autoplay=1&hq=0&ads=1".setVar("ads", "0").setVar("hq", "1");
String.prototype.setVar = function(q, v) {
var regex = new RegExp("([\&\?])?"+q+"=[^\&\#]*", "g");
return regex.test(this) ? this.replace(regex, "$1"+q+"="+v) : this+"&"+q+"="+v;
}

String.prototype.getPref = function(s, splitter) {
return this.split(s+"=")[1].split((splitter||"&"))[0];
};

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

function addScript(s, id) {
	var head = document.getElementsByTagName("head")[0],
		aS = document.createElement("script");
	if(!head) {return;}
	aS.setAttribute("type", "text/javascript");
	aS.setAttribute("id", id);
	try {aS.innerHTML = s;} catch(e) {aS.innerText = s;}
	head.appendChild(aS);
}

var navID = "watch7-user-header";

function main(GM_config) {

function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) c.forEach(function(e) { ret.appendChild(e); });
	return ret;
}

function debug(s) {
	var d=$("debugT");
	if(!d) document.body.insertBefore(d=create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:80%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(create("text",s))), document.body.firstChild);
		else d.innerHTML+="\n\n\n\n"+s;
	if(d.style.display=="none") d.style.display="";
}

GM_config.init("YouTube Auto Buffer Options", {
autoBuffer : {
	label : "Auto[Buffer/Play]",
	type : "select",
	section : ["Main Options"],
	options : {
		"buffer" : "Autobuffer",
		"play" : "Autoplay",
		"none" : "Both off"
	},
	"default" : "buffer"
},
autoHD : {
	label : "Auto HD",
	type : "select",
	options : {
		"240p" : "240p",
		"360p" : "360p (normal)",
		"480p" : "480p",
		"720p" : "720p (HD)",
		"1080p" : "1080p (HD)"
	},
	"default" : "360p"
},
volume : {
	label : "Set volume to: ",
	type : "select",
	options : {
		1000 : "Disabled (no effect)",
		5 : "5%",
		10 : "10%",
		20 : "20%",
		25 : "25% (quarter)",
		30 : "30%",
		40 : "40%",
		50 : "50% (half)",
		60 : "60%",
		70 : "70%",
		75 : "75% (three quarters",
		80 : "80%",
		90 : "90%",
		100 : "100% (full)",
	},
	title : "What to set the volume to",
	"default" : 1000
},
hideAds : {
	label : "Hide in-video ads?",
	type : "checkbox",
	"default" : false
},
hideAnnotations : {
	label : "Hide annotations?",
	type : "checkbox",
	"default" : true
}
}, "#config_header {font-size:16pt !important;} .config_var {margin-left:20% !important;} #header {margin-bottom:30px !important;} .indent40 {margin-left:20% !important;}", {
open : function(){ var frame=GM_config.frame; frame.style.height="50%";frame.style.width="50%"; GM_config.center(); }
});

$(navID).appendChild(create("button", {id: "autobuffer-options", style: "padding: 2px; font-size: 10pt; font-weight: bold; border: 1px solid #CCCCCC; background-image: linear-gradient(to bottom, #FFFFFF 0px, #E0E0E0 100%); border-radius: 2px 2px 2px 2px; font-weight: bold; vertical-align: middle; cursor: pointer;", type: "button", textContent: "Autobuffer Options", title: "Click here to set default Autobuffer options", onclick: GM_config.open}));

var mp = $("movie_player"),
	mpC = mp.cloneNode(true),
	regex = {
		ads:/[&\?]?(ad_(tag)?|infringe|watermark)((?!url)[=]*)?=[&]*/gi,
		begin_end:/(^[\&\?]*)|([\&\?]*$)/g
	},
	opHD = GM_config.get("autoHD"),
	volume = parseInt(GM_config.get("volume"), 10),
	fv = mpC.getAttribute("flashvars").setVar("autoplay", (GM_config.get("autoBuffer")=="play"?"1":"0")).setVar("enablejsapi", "1").setVar("fs", "1").setVar("iv_load_policy", (GM_config.get("hideAnnotations")===true?"3":"1"));

// find the right/best quality according to the options
switch(opHD) {
	case "240p": fv = fv.setVar("vq", "small"); break;
	case "360p": fv = fv.setVar("vq", "medium"); break;
	case "480p": fv = fv.setVar("vq", "large"); break;
	case "720p": fv = fv.setVar("vq", "hd720"); break;
	case "1080p": fv = fv.setVar("vq", "hd1080"); break;
	default: fv = fv.setVar("vq", "medium");
}

if(GM_config.get("hideAds") === true) {
	fv = fv.replace(/([&\?])?(afv_ad_tag(_restricted_to_instream)?|ad_channel_code_instream|afv_inslate_ad_tag|ad_host(_tier)?|ad_(slots|flags|device|eurl|tag)|ad_video_pub_id|ad_preroll|afv_inslate_ad_tag|adsense_video_doc_id|aftv?|ad_channel_code_overlay|watermark|xfp_tag|ad3_module)=[^&]+/gi, "").setVar("invideo", "false");
}

//debug(fv.split("&").join("\n\n"));

mpC.setAttribute("flashvars", fv.replace(regex["begin_end"],""));
mp.parentNode.replaceChild(mpC, mp);

	function onYouTubePlayerReady(playerId) {
		g_YouTubePlayerIsReady=true;
		var mp = document.getElementById("movie_player"),
			startTime = mp.getCurrentTime();
		
		// Add the event listeners so functions get executed when the player state/format changes
		mp.addEventListener("onStateChange","stateChange");
		mp.addEventListener("onPlaybackQualityChange","onPlayerFormatChanged");
		
		// Play the video if autobuffer enabled, otherwise just set volume
		if(autobuffer === "buffer") mp.playVideo();
			else if(volume !== 1000) mp.setVolume(volume);
	}

	function stateChange() {
		var state = document.getElementById("movie_player").getPlayerState();
		switch(state) {
			case 1: // 1 = playing
				if(alreadyBuffered === false && autobuffer === "buffer") {
					var mp=document.getElementById("movie_player"),
						vol=mp.getVolume(), // get the current player volume
						muted=mp.isMuted(), // check if it's muted or not
						startTime = mp.getCurrentTime(); // get the current player time

					// Pause the video so it can buffer
					mp.pauseVideo();
					
					// Set the volume to the user's preference
					mp.setVolume((volume !== 1000 ? volume : vol));

					// Seek back to the beginning, or pre-defined starting time (url #t=xx)
					mp.seekTo((startTime <= 3 ? 0 : startTime), true);

					// Make sure it doesn't auto-buffer again when you press play
					alreadyBuffered = true;
				}
				
			break;
		}
	}
	addScript("var alreadyBuffered = false, volume = "+volume+", autobuffer = \""+GM_config.get("autoBuffer")+"\";\n\n"+onYouTubePlayerReady+"\n\n"+stateChange, "stateChange");

}

if(location.href.find("#t=")) location.href = location.href.replace("#t=", "&t=");


// This function waits for the navbar and movie player to
// be ready before starting
function waitForReady(GM_config) {
	if($(navID) && $("movie_player")) {
		window.clearInterval(intStart);
		main(GM_config);
	}
	sec++;
	if(sec >= 120) window.clearInterval(intStart);
}

// Quit if the "Autobuffer Options" button already exists
if(!$("autobuffer-options")) intStart = window.setInterval(waitForReady, 250, GM_config), sec=0;

// ==UserScript==
// @name       YouTube Hide recommended videos
// @namespace  http://www.agixo.de/
// @version    1.1
// @description  Hides the recommended videos on your stream (new design)
// @include      *://youtube.com/*
// @include      *://*.youtube.com/*
// @copyright  2012, Daniel Lehr <daniel@agixo.de>
// ==/UserScript==
!(function() {
  window.setTimeout(function check() {
    if (document.getElementsByClassName('feed-author-bubble')) {
      main();
    }
    window.setTimeout(check, 250);
  }, 250);

  function main() {
    var a = document.getElementsByClassName('feed-author-bubble');
    for(var i = 0, len = a.length; i < len; i++) {
      if (/\/feed\/recommended$/.test(a[i].href)) {
        a[i].parentNode.parentNode.style.display = 'none';
      }
    }
  }
})();

// ==UserScript==
// @name        Youtube Layout Fixer
// @namespace   somepotato.yt.layout
// @description Fix youtubes atrocious non-widescreen layout.
// @include     *youtube.com/*
// @exclude *youtube.com/user/*
// @version     1
// ==/UserScript==
if(document.location.toString().indexOf('/watch?')!=-1){

    var content=document.getElementById('watch7-content');
    content.style.width="100%";
    var sidebar=document.getElementById('watch7-sidebar');
    sidebar.style.width=content.offsetWidth+"px";
    return;
}
var content=document.getElementsByClassName("branded-page-v2-container enable-fancy-subscribe-button")[0]
var guide=document.getElementById("guide")
content.style.width=window.innerWidth-(guide.offsetWidth+70)+"px";

// ==UserScript==
// @name       Youtube modifications
// @namespace  http://www.jojosapps.com
// @version    1.5.1b
// @description  A script that adds various functionality to youtube. Check description for more info
// @include    http://www.youtube.com/
// @include    http://www.youtube.com/inbox?to_users=*&action_compose=1#CuPm
// @include    http://www.youtube.com/subscription_manager
// @require    http://code.jquery.com/jquery-1.7.1.min.js
// @copyright  2011, Jenna
// ==/UserScript==

/*The script is currently removing the copyright footer due to some loading bug that happens if the overlay loaded directly on the body.
  This will be changed later though.*/

/*
***CREDITS***
Zenkerdus (Twitter) for helping with testing
AllGenGamers for idea for extended pin list


***BETA***

1.5.1b

--Front page
*Added animation for switching between grid and row mode


1.5b

--Front page
*Added a button to remove the sidebar (Located on the upper right). Broke the PM formating for some reason
*Made row and grid icons work. Not 100% though.
*Merry xmas!!


1.4b

--Front page
*Added extended pin menu
*Added another page the script includes: http://www.youtube.com/subscription_manager
*Started with the cleanup of the code to make everything easier to read


1.3b

--Front page
*Added a grid icon. CUrrently doesn't work, but will make it so that the videos appear in a grid instead.
*Fixed a Quick PM glitch


1.2.2b

--Front page
*Fixed firefox problem. It should work on firefox now


1.2.1b

--Inbox page
*Fixed so that loading CuPm in inbox removes the "Friends promo" element that popped up as youtube made more changes to the site.
*Fixed the top margin to be -25 instead of -35. To make the CuPm page look slightly more clean.


1.2b

--Front page stuff
*Added a PM icon as a data URL in the code
*Added quick PM functionality to the upload timeline on the front page. For subscriptions only at the moment. To be improved upon next version
*Added -moz css to add a box shadow and border radius to firefox browsers

--Inbox page
*Included a special compose url in order to make quick PM work.
*Styled the inbox page for when #CuPm is found in the url.


1.1b

--Front page stuff
*Improved quick view layout. It's currently minimized view only, but will add option later to have it go full screen.
*Changed position of quick view. It's now on the thumbnail of subscription video
*Added animation to quick view popup.
*Added settings item in the master head menu. Doesn't do anything yet.
*Fixed a bug where comments page and quick view wasn't the correct one for each video.


1.0b
*Initial coding

--Front page stuff
*Added quick view to the side of the title.
*Added the ability to click to view all comments of a video directly from the subscription feed

*/

var CuMailImage = "data:image/png;base64,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";
var CuGridImage = "data:image/gif;base64,R0lGODlhIgAiANUAAAAAAP///4GBgYCAgH9/f319fXx8fHt7e3p6enl5eXh4eGdnZ2ZmZmFhYWBgYF9fX1hYWFdXV1ZWVlVVVVNTU1JSUlFRUU9PT01NTUxMTEpKSklJSUhISEZGRkRERENDQ0FBQT8/Pz4+Pj09PTs7Ozo6Ojk5OTc3NzY2NjU1NTMzMzIyMjExMTAwMC8vLy4uLiwsLCsrKyoqKigoKP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADQALAAAAAAiACIAAAb/QIhwSCwaj8aIcslsOp9OiXRKrVqv1ol2y+16v16KeEwum8/minrNbrvfbot8Tq/b7/aLfs/v+/9+GIKDhIWGh4YZiouMjY6PjhqSk5MbBQKYBRuSlpgCmpShHKOkpB4Hngceo6epq6WlHbKzsyAJngkgsra4urS0HsHCwiEJBMcJIcHFxwTJw9Af0tPTIQsNDg0LIdLW2Nrc1NQg5OXlIicq6ici5OjqKuzm8yL19vYjJCX7JCP1+ftK9LtHcITBgwgTKlyokITDhxAjSpwoMaDFfSYMDNhowARGjRw9XgxooqRJkygQeEKAomTKlS1PnjxBs2ZNFQo8KYiXLiemj502g6IYSpToCgXNFKwYejTp0qJFU0idOpUFAwcPHDBgIdUqVq1cqVKFR1Zdixgz0sZoYRatWrZl4a2YS5cuCxcuXuBlMfdu3r11A7MYTLiw4cOID7dYzLix48eQH+OdTLmy5cuXX2jezLmz58+eYYgeTbq06dOoU6teLTqG69ewY8ueLVuG7du4c+verTsIADs=";
var CuPinImage = "data:image/png;base64,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";

$(document).ready(function(){
	
    /*$("a").live("mouseenter", function(){
			
        $(this).stop(true);
        
        $(this).animate({
            opacity: 0.8
        }, 300 );
        
    });
    $("a").live("mouseleave", function(){
        
        $(this).stop(true);
        
        $(this).animate({
            opacity: 1
        }, 300 );
        
    });*/
    
    
    if(navigator.userAgent.search("Chrome") != -1)//Chrome only
    {
       //$('#masthead-search-term').blur();
    }
    if(navigator.userAgent.search("Firefox") != -1)//Firefox only
    {
       
    }
        
        
     
    
    document.getElementById('masthead-nav').innerHTML += "<span class=\"masthead-link-separator\">|</span> <a href=\"\">Settings</a>";
    
    
    
    
    
    var arr = document.getElementsByClassName("feed-item-visual-thumb");
    var vidId = $(".feed-container .title");
    var AllComments = $(".feed-container .metadata .yt-user-name");
    var UserNamesPmIcons = $(".feed-item-owner .yt-user-name");
    var GridIcon = $(".feed-header-thumb");
    
    var CuSizeOfWinX = 765;
    var CuSizeOfWinY = 530;
    var CuGeneralPadding = 10;
    var CuTopPadding = 25;
    
    var CuSizeOfPmWinX = 300;
    var CuSizeOfPmWinY = 400;
    
    
    /*Extended pin menu stuff*/
    var CuPin = $(".subscription-options");
    
    if(document.URL.search("subscription_manager") != -1)
    {
        
        for(var dd = 0; dd < CuPin.length; ++dd)
        {
           CuPin[dd]./*$(".subscription-pin").*/innerHTML += "<a class=\"subscription-pin\" title=\"Pin on the homepage plus\" data-tooltip-text=\"Pin on the homepage\"><img src=\"" + CuPinImage + "\"/></a>";
        }
    }
    
    
    /*Set save variables if not yet set*/
    if(localStorage.getItem("Row") == null)//Check if sidebar is hidden or not.. If it's null, set it to 1
    {
       localStorage.setItem("Row", "1");
    }
    
    
    
    /*Hide/Show sidebar*/
    if(localStorage.getItem("ShowingSidebar") == null)//Check if sidebar is hidden or not.. If it's null, set it to 1
    {
       localStorage.setItem("ShowingSidebar", "1");
    }
    
    if(localStorage.getItem("ShowingSidebar") == 1)
    {
       $("#feed-main-all, #feed-background").css("width", "465px");
       $("#video-sidebar").css("width", "300px");
       $("#video-sidebar").css("opacity", "1");
    }
    if(localStorage.getItem("ShowingSidebar") == 0)
    {
       $("#feed-main-all, #feed-background").css("width", "765px");
       $("#video-sidebar").css("width", "0px");
       $("#video-sidebar").css("opacity", "0");
    }
    
    //$(".feed-header-subscribe .thumb")[0].innerHTML += "hej";
    var Element = document.createElement('span');
    Element.innerHTML = "<span id=\"CuHideShowSidebar\" style=\"float: right; cursor: pointer; padding: 4px; margin: -4px; margin-left: -8px; background: rgba(255,255,255, 0.16); -webkit-border-radius: 4px; -moz-border-radius: 4px; border: 1px solid rgba(0,0,0, 0.07); display: block;\"><</span>";
    document.getElementById("masthead_child_div").appendChild(Element);
    //$("#masthead_child_div").css("padding-bottom", "6px");
    
    
    $("#CuHideShowSidebar").click(function(event) {
    
        //event.preventDefault();
        
        $("#video-sidebar *").css("white-space", "nowrap");
        
        if(localStorage.getItem("ShowingSidebar") == 1)
        {
            $("#video-sidebar").stop(true);
            $("#feed-main-all, #feed-background").stop(true);
            
            $("#video-sidebar").animate({
                opacity: 0,
                width: "0px"
            }, 350, function() {
                
                $("#feed-main-all, #feed-background").animate({
                    width: "765px"
                }, 350);
                
                localStorage.setItem("ShowingSidebar", "0");
                if(localStorage.getItem("Row") == 0)
                {
                    $("#feed-main-all .feed-item-container").css("width", "230px");
                }
                
            });
        }
        else if(localStorage.getItem("ShowingSidebar") == 0)
        {
           
            $("#video-sidebar").stop(true);
            $("#feed-main-all").stop(true);
            
            $("#feed-main-all, #feed-background").animate({
                width: "465px"
            }, 350, function() {
                
                $("#video-sidebar").animate({
                opacity: 1,
                width: "300px"
                }, 350);
                
                localStorage.setItem("ShowingSidebar", "1");
                if(localStorage.getItem("Row") == 0)
                {
                    $("#feed-main-all .feed-item-container").css("width", "200px");
                }
                
            });
        }
         
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*Format of the PM page*/
    
    if(document.URL.search("inbox") != -1 && document.URL.search("#CuPm") != -1 && document.URL.search("to_users") != -1)
    {
       //alert("hejsan");
        
        document.body.style.overflow = "hidden";
        
        document.getElementById("masthead-container").style.display = "none";
        document.getElementById("footer-container").style.display = "none";
        
        document.getElementById("yt-admin-sidebar").style.display = "none";
        document.getElementById("folder_title").style.display = "none";
        document.getElementById("folder_title").style.display = "none";
        
        document.getElementById("compose_from").style.display = "none";
        
        
        document.getElementById("composeform").style.width = "500px";
        document.getElementById("yt-admin-content").style.left = "0";
        document.getElementById("yt-admin-content").style.top = "0";
        
        document.getElementById("field_reference_video").style.display = "none";
        
        document.getElementById("compose_message").style.height = "200px";
        document.getElementById("yt-admin").style.width = "754px";
        document.getElementById("yt-admin").style.marginTop = "-25px";
                
        document.getElementById("baseDiv").style.width = "100%";
        document.getElementById("inbox_send_message").style.marginLeft = "-430px";
        
        $(".yt-alert-promo").css("display", "none");
        $(".compose_header").css("display", "none");
        $(".compose_input").css("width", "255px");
        
        
    }
    
    
    
    /*var cuf = $('#CuFrame').attr('src');*/
    
    /**Grid icon and row icon stuff***/
    GridIcon[0].innerHTML += "<img class=\"feed-header-icon all\" src=\"" + CuGridImage + "\" style=\"padding-right: 6px;\"/>";
    $(".feed-header-thumb img").live("click", function(){
     
        if($(this).attr('src') != CuGridImage)
        {
            /*Save setting to be row, and set css accordingly*/
            
            $("#feed-main-all .feed-container").animate({
                opacity: 0
            }, 350, function(){
            
                $("#feed-main-all .feed-item-container").css("display", "inline");
                $("#feed-main-all .feed-item-container").css("width", "100%");
                $("#feed-main-all .feed-item-container").css("height", "114px");
                $("#feed-main-all .feed-item-visual").css("height", "114px");
                $("#feed-main-all .feed-item-visual-thumb").css("display", "inline");
                
                
                $("#feed-main-all .feed-item-visual-content").css("margin-top", "0px");
                $("#feed-main-all .feed-item-visual-content").css("position", "static");
                $("#feed-main-all .feed-item-visual-content").css("margin-left", "-10px");
                $("#feed-main-all .description").css("display", "inline");
                
                $("#feed-main-all .feed-container").animate({
                opacity: 1
                }, 350);
                
            });
            
        }
        else
        {
            //alert("This is the grid icon");
            
            $("#feed-main-all .feed-container").animate({
                opacity: 0
            }, 350, function(){
            
                $("#feed-main-all .feed-item-container").css("display", "inline-table");
                $("#feed-main-all .feed-item-container").css("width", "230px");
                $("#feed-main-all .feed-item-container").css("height", "230px");
                $("#feed-main-all .feed-item-visual").css("height", "200px");
                $("#feed-main-all .feed-item-visual-thumb").css("display", "block");
                
                
                $("#feed-main-all .feed-item-visual-content").css("margin-top", "100px");
                $("#feed-main-all .feed-item-visual-content").css("position", "absolute");
                $("#feed-main-all .feed-item-visual-content").css("margin-left", "-10px");
                $("#feed-main-all .description").css("display", "none");
            
            $("#feed-main-all .feed-container").animate({
                opacity: 1
                }, 350);
                
            });
        }
    });
    
    
    
    
    
    
    
    
    for(var dd = 0; dd < arr.length; ++dd)
    {
        //arr[dd].innerHTML += "<span style=\"float: left !important; cursor: pointer; position: absolute; margin-top: -30px;\" onmousedown=\"document.body.style.overflow = 'hidden'; document.getElementById('CuOverlay').style.display = 'inline'; document.getElementById('CuFrame').src = '" + "http://www.youtube.com/embed/" + vidId[dd].href.slice(31, 42) + "?rel=0&controls=0&autoplay=1" + "';\">Quick view</span>";
        AllComments[dd].innerHTML +=  "<a href=\"http://www.youtube.com/all_comments?v=" + vidId[dd].href.slice(31, 42) + "\">Comments</a>";
        
    }
    
    
    /*A window used for a quick PM sending thing.*/
    document.getElementById("masthead-container").innerHTML += "<div style=\" display: none; position: absolute; z-index: 20; left: 0px; top: 0px; width: " + CuSizeOfPmWinX + "px; height: " + CuSizeOfPmWinY + "px; background: #000000; -webkit-box-shadow: 0 3px 13px rgba(0,0,0, 0.5); -moz-box-shadow: 0 3px 13px rgba(0,0,0, 0.5);\" id=\"CuPmWin\"><iframe id=\"CuPmWinFrame\" width=\"100%\" height=\"100%\" src=\"\"></iframe></div>";
    for(var dd = 0; dd < UserNamesPmIcons.length; ++dd)
    {
        $(".feed-item-owner")[dd].innerHTML += "<img class=\"CuPm\" src=\"" + CuMailImage + "\" style=\"float: right; cursor: pointer;\" title=\"Send a PM to this user\"/>";
    }
    
/*

<iframe width="560" height="315" src="http://www.youtube.com/embed/OADkgY4Kx1c?rel=0" frameborder="0" allowfullscreen></iframe>

*/

    
    
    
    /*This one should be a live element later. To be able to apply this to anything else that loads as well.*/
    $(".feed-container .feed-item-visual-thumb .clip img").click(function(event) {
    
        event.preventDefault();
        //alert($(this).attr('src'));
    
        //document.body.style.overflow = 'hidden';//This one should be applied only to the fullscreen quick watch mode.
        
        //document.getElementById('CuOverlay').style.display = 'inline';
        //document.getElementById('CuFrame').src = "http://www.youtube.com/embed/" + $(this).attr('src').slice(18, 30) + "?rel=0&controls=1&autoplay=1"
    
        //alert("http:" + $(this).attr('src'));
        
        var CuThisOne = $(this);
        
            //The temporary picture effect when clicking on a quick view link.
            document.getElementById('footer-links-primary').innerHTML = "<img id=\"CuTempPic\" style=\"opacity: 0.3; position: fixed; top:" + ($(this).offset().top-$(window).scrollTop()) + "px; left:" + $(this).offset().left + "px; z-index: 10;\" width=\"" + $(this).width() + "\" height=\"" + $(this).height() + "\" src=\"http:" + $(this).attr('src') + "\"/>";
        
        
        $("#CuTempPic").stop(true);
        
        $("#CuTempPic").animate({
            opacity: 1,
            width: CuSizeOfWinX,
            height: CuSizeOfWinY,
            left: (($(window).width()/2)-(CuSizeOfWinX/2))+2,
            top: (($(window).height()/2)-(CuSizeOfWinY/2))+9
        }, 300, function()
                                {
                                    
                                    document.getElementById('CuOverlay').style.display = 'inline';
                                    document.getElementById('CuOverlay').style.opacity = '0';
    
                                    $("#CuOverlay").animate({
                                        opacity: 1
                                    }, 300, function() { document.getElementById('CuFrame').src = "http://www.youtube.com/embed/" + CuThisOne.attr('src').slice(18, 30) + "?rel=0&controls=1&autoplay=1"; });
                                }
                               );
            
    });
    
    /*Full screened one*/
    
    //document.getElementById('footer-logo').innerHTML = "<span id=\"CuOverlay\" style=\"display: none; width: " + $(window).width() + "px; height: " + $(window).height() + "px; position: fixed; left: 0px; top: 0px; z-index: 10; background: #000000; \"><iframe id=\"CuFrame\" width=\"" + $(window).width() + "\" height=\"" + ($(window).height()-20) + "\" style=\"margin-top: 20px;\" src=\"\" frameborder=\"0\" allowfullscreen></iframe><div id\"cuxbutton\" style=\"position: absolute; right: 10px; top: 1px; z-index: 1; color: #ffffff; cursor: pointer;\" onmousedown=\"document.getElementById('CuOverlay').style.display = 'none'; document.getElementById('CuFrame').src = ''; \">X</div></span>";
    
    
    /*Windowed one*/
    
    document.getElementById('footer-logo').innerHTML = "<span id=\"CuOverlay\" style=\"display: none; width: " + CuSizeOfWinX + "px; height: " + CuSizeOfWinY + "px; position: fixed; left: " + (($(window).width()/2)-(CuSizeOfWinX/2)-CuGeneralPadding) + "px; top: " + (($(window).height()/2)-(CuSizeOfWinY/2)-CuGeneralPadding-((CuTopPadding-CuGeneralPadding)/2)) + "px; z-index: 10; background: #f9f9f9; padding:" + CuGeneralPadding + "px; padding-top:" + CuTopPadding + "px; -webkit-box-shadow: 0 2px 15px rgba(0,0,0, 0.4); -moz-box-shadow: 0 2px 15px rgba(0,0,0, 0.4); -webkit-border-radius: 4px; -moz-border-radius: 4px; border: 1px solid #afafaf; border-bottom-color: #999999; \"><iframe id=\"CuFrame\" width=\"" + CuSizeOfWinX + "\" height=\"" + CuSizeOfWinY + "\" style=\"margin-top: 0px;\" src=\"\" frameborder=\"0\" allowfullscreen></iframe><div id=\"cuxbutton\" style=\"position: absolute; right: 10px; top: 1px; z-index: 1; color: #888; font-size: 16px; font-family: arial; padding: 3px 10px 3px 10px; border-left: 1px solid #cccccc; border-right: 1px solid #cccccc; cursor: pointer;\" >X</div></span>";
    
    
    
    $("#cuxbutton").live("click", function(){
        
        document.getElementById('CuFrame').src = '';
        
        /*$("#CuOverlay").animate({
            opacity: 0,
            width: CuSizeOfWinX/2,
            height: CuSizeOfWinY/2,
            left: CuSizeOfWinX/2,
            top: CuSizeOfWinY/2
        }, 1000, function(){
        */
        document.getElementById('CuOverlay').style.display = 'none';
        document.getElementById('CuTempPic').style.display = 'none';
        //});
    });
    
    
    /*Compose PM action*/
    $(".CuPm").live("click", function(){
    
        //alert(UserNamesPmIcons[$(this).index(".CuPm")].href.slice(28, UserNamesPmIcons[$(this).index(".CuPm")].href.length-12));
        
        //alert($(this).offset().top);
        
        document.getElementById("CuPmWinFrame").src = "http://www.youtube.com/inbox?to_users=" + UserNamesPmIcons[$(this).index(".CuPm")].href.slice(28, UserNamesPmIcons[$(this).index(".CuPm")].href.length-12) + "&action_compose=1#CuPm";
        document.getElementById("CuPmWin").style.display = "inline";
        document.getElementById("CuPmWin").style.top = $(this).offset().top + "px";
        document.getElementById("CuPmWin").style.left = ($(this).offset().left+40) + "px";
        
        //CuPmWinFrame
        
        //http://www.youtube.com/inbox?to_users=JoshJepson&action_compose=1
        //document.URL
    
    });
    
    //alert(document.URL.search("inbox"));
    
    
    
    
    
});

// ==UserScript==
// @name          YouTube replace Logo
// @namespace     http://userstyles.org
// @description	  <br/>
// @author        miki1998
// @homepage      http://userstyles.org/styles/63867
// @include       www.youtube.com/*
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#logo {\n  background-image: url(\"http://img43.imageshack.us/img43/3308/defin3.png\") !important;\n  background-position: -0px -0px !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

// ==UserScript==
// @name           YouTube Sidebar Remover & Subscription Enlarger
// @namespace      SqTH & girst
// @description    Removes Video-Sidebar from Youtube homepage AND maximise the with of your subscriptions
// @include        http://*.youtube.com/
// @include        http://*.youtube.com/index*
// @include        http://*.youtube.com/?*
// @grant          none
// ==/UserScript==
//this is a modified version of http://userscripts.org/scripts/review/119738. I added 
//http://webdesignblog.de/allgemein/javascript-trick-getelementbyclass-versteckter-content-fur-sumas-direkt-sichtbar/
//to hide the left bar and to draw a border around the subscription list.
//use in combination with http://userscripts.org/scripts/show/123111 (or http://userscripts.org/scripts/show/120703)
//to get a nearly classical start page. In script 123111 comment line 251 to stop automatical deletion of watched vids.
//inbox-adder by http://woork.blogspot.co.at/2007/10/ajax-add-new-element-into-list-using.html
document.getElementById("video-sidebar").style.display = "none";
document.getElementById("feed").style.width = "770px";
document.getElementById("feed-background").style.width = "970px";//770;
document.getElementById("feed").style.width = "970px";//770;
document.getElementById("feed").style.margin = "0px";
document.getElementById("feed-background").style.position = "absolute";
document.getElementById("feed-background").style.left = "0px";
if (document.getElementById("guide-reminders")) { document.getElementById("guide-reminders").style.display="inline";}

var posteingang = document.getElementById("masthead-expanded-menu-list").innerHTML.split('folder=messages">')[1].split('</a>')[0];
if (posteingang.indexOf("(") != -1) {
var container = document.getElementsByTagName('ul')[3];
var new_element = document.createElement('li');
new_element.className="guide-reminder mail";
var countmail = posteingang.split('(')[1].split(')')[0];
new_element.innerHTML = '<img class="guide-reminder-icon" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><a class="guide-reminder-text" href="/inbox?feature=mhee&folder=messages"><span class="guide-count">'+countmail+'</span>'+posteingang.split('(')[0]+'</a>';
container.insertBefore(new_element, container.firstChild);
}
var allElems = document.getElementsByTagName('*');
for (var i = 0; i < allElems.length; i++) {
var thisElem = allElems[i];
if (thisElem.className && thisElem.className == 'feed') {
thisElem.style.zIndex = 9999;
}
if (thisElem.className && thisElem.className == 'guide-container') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'guide-background') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'yt-uix-button-group') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'guide-reminder upgrade') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'guide-count') {
thisElem.style.marginRight = '770px';
}
if (thisElem.className && thisElem.className == 'feed-filter-separator') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'feed-header-details') {
thisElem.style.marginBottom = "5px";
}
if (thisElem.className && thisElem.className == 'feed-header before-feed-content') {
thisElem.style.borderTopLeftRadius="5px";
if (document.getElementById("guide-reminders")) { thisElem.innerHTML=thisElem.innerHTML+document.getElementById("guide-reminders").outerHTML;}
}
if (thisElem.className && thisElem.className == 'feed-container') {
thisElem.style.border="1px solid #333333";
thisElem.style.borderBottomLeftRadius="5px";
thisElem.style.borderBottomRightRadius="5px";
}
}

String.prototype.between = function(prefix, suffix) {
/*http://snipplr.com/view/14074/*/
s = this;
var i = s.indexOf(prefix);
if (i >= 0) {
s = s.substring(i + prefix.length);
}
else {
return '';
}
if (suffix) {
i = s.indexOf(suffix);
if (i >= 0) {
s = s.substring(0, i);
}
else {
return '';
}
}
return s;
}



function sleep(milliseconds) {
/*http://www.phpied.com/sleep-in-javascript/*/
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


// ==UserScript==
// @name           YouTube Top Menu Mod v1.2
// @description    Replaces the expandable "My Playlists" bar at the top of YouTube with a more compact, more practical navigation bar displaying your account links.
// @namespace      www.vertigofx.com
// @include        http://*.youtube.com/*
// ==/UserScript==

/* CHANGE THESE VALUES IF YOU LIKE */
var fontSize = '15px';
var alignment = 'center';


/* REMOVING THE CLASS ATTRIBUTE FROM THE BAR PREVENTS IT FROM BEING HIDDEN ON PAGE LOAD */
document.getElementById('masthead-expanded').removeAttribute('class');

/* GATHER THE INFORMATION FOR THE LINKS */
mychannel = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[0].innerHTML;
myvideos = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[1].innerHTML;
myfavs = '<a href="http://www.youtube.com/my_favorites">My Favorites</a>';
mylikes = '<a href="http://www.youtube.com/my_liked_videos">My Liked Videos</a>';
myhistory = '<a href="http://www.youtube.com/my_history">My History</a>';
mysubs = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[2].innerHTML;
myinbox = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[3].innerHTML;
mysettings = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[4].innerHTML;
signout = document.getElementById("masthead-expanded-menu-list").getElementsByTagName("li")[5].innerHTML;

/* DISPLAY THE NEW LINKS AND FORMAT THE BAR */
document.getElementById('masthead-expanded-container').innerHTML = "<div style='padding:5px;font-weight:bold;text-align:"+alignment+";font-size:"+fontSize+";' class='custommenu'>" + mychannel + " | " + myvideos + " | " + myfavs + " | " + mylikes + " | " + myhistory + " | " + mysubs + " | " + myinbox + " | " + mysettings + " | " + signout + "</div>";
document.getElementById('masthead-expanded').style.height = "auto";
document.getElementById('masthead-expanded-container').style.height = "auto";
document.getElementById('masthead-expanded').style.textAlign = "center";

// ==UserScript==
// @name        youtube.com : 'my subscriptions' enhancer
// @namespace   tukkek
// @include     http*://www.youtube.com/feed/subscriptions/activity
// @version     1
// ==/UserScript==
function hidden(element){
  return window.getComputedStyle(element)['display']=='none';
}

function found(text,find){
  return text.textContent.indexOf(find)!=-1;
}

new MutationObserver(function(mutations) {
  var items=document.getElementsByClassName('feed-item-container');
  for (item=0;item<items.length;item++){
    var i = items[item];
    var action=i.getElementsByClassName('feed-item-actions-line')[0];
    if (
      found(action,'replied to a comment') &&
      !found(action,'uploaded') &&
      i.getElementsByClassName('yt-user-name').length==0
    ){
      i.style.opacity='.5';
    }
  }
}).observe(document.body, { childList: true, subtree: true });

var clicker=setInterval(function(){
  var loadMore=document.querySelector('.feed-load-more');
  var parent=hidden(loadMore.parentNode);
  var spinner=hidden(loadMore.querySelector('.spinner'));
  if (spinner){
    if (parent){
      clearInterval(clicker);
    } else {
      loadMore.click();
    }
  }
},5000)
