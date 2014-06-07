// ==UserScript==
// @name           FB Wall Manager
// @namespace      FB Wall Manager
// @description    Manages Wall Posts for Various FB Games
// @include        http*://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_getResourceURL
// @version        3.0-b47
// @copyright      Charlie Ewing except where noted
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://userscripts.org/scripts/source/128747.user.js
// @require        http://userscripts.org/scripts/source/150983.user.js
// @require        http://userscripts.org/scripts/source/152610.user.js
// @require        http://userscripts.org/scripts/source/150032.user.js
// @resource       IconSheet http://images.wikia.com/fbwm/images/c/c0/Images.png
// ==/UserScript==

// retired libraries
// @require        http://userscripts.org/scripts/source/29910.user.js
// @require        http://userscripts.org/scripts/source/129006.user.js
// @resource       IconSheet http://i1181.photobucket.com/albums/x430/merricksdad/images.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js

// for testing only
// @include        file:///C:/FB-Wall-Manager/*

// retired autolike functions
// @include        /^https?:\/\/www\.facebook\.com\/.*\/posts\/.*/

// Based on script built by Joe Simmons in Farmville Wall Manager

(function() {
	var sandbox=this;

//***************************************************************************************************************************************
//***** Special Use as post liker
//***************************************************************************************************************************************
	//check for likeit function
	/* retired as of beta 40
	function likeit(){try{
		//it is expected that autolike and autocomment will be done
		//separately, never in the same window. So we determine which
		//one needs done and return a status of 1
	
		var params=location.hash.removePrefix("#");
	
		if (params.getUrlParam("likeit")){
			var like = selectSingleNode(".//div[@id='globalContainer']//li[contains(@id,'stream_story_')]//button[@name='like']");
			if (!like) like = selectSingleNode(".//div[@id='globalContainer']//li[contains(@id,'stream_story_')]//a[@class='UFILikeLink']/span");
			if (like) like = (like.parentNode.getAttribute("data-ft")=="{\"tn\":\">\"}")?like:null; //detect if already liked
			
			//april 2013 version
			if (!like) {
				like = selectSingleNode(".//div[@id='globalContainer']//li[contains(@id,'stream_story_')]//a[@class='UFILikeLink']");
				//validate not already pressed like
				if (like) like = (like.getAttribute("data-ft")=="{\"tn\":\">\"}")?like:null; //detect if already liked
			}
			
			if (like) {
				setTimeout(function(){
					click(like);
					//return that it is liked
					location.hash+="&status=1";
				},500);
			} else {
				setTimeout(likeit,1000);
			}
		}
		
		else if (params.getUrlParam("commentit")){
			log("try comment");
			//this is unfinished
			var say = params.getUrlParam("say");
			

			
			var commentArea = selectSingleNode(".//li[contains(@class,'UFIAddComment')]//textarea[contains(@name,'add_comment_text')]");
			if (commentArea) {
				setTimeout(function(){
					//click the link to place our cursor in the correct location
					debug.print("comment area found");
					var toSay = say||"hi"; //confirm("say");
					commentArea.focus(); //focus must be given to cause the commentInput object to mutate to a ready state
					commentArea.value = toSay;
					commentInput = selectSingleNode(".//li[contains(@class,'UFIAddComment')]//input[contains(@name,'add_comment_text')]");
					if (commentInput) { 
						setTimeout(function(){
							debug.print("comment input found");
							commentInput.value = toSay;
							setTimeout(function(){
								
								//jQuery.event.trigger({ type : 'keypress', which : 13 });
								//debug.print("jquery pressed enter");
								
							},500);
						},500);
					} else {
						debug.print("cannot find comment input");
						setTimeout(likeit,1000);
					}
						
				},2000); //something here in the fb code is erasing or reinitializing the textarea
			} else {
				debug.print("cannot find comment area");
				setTimeout(likeit,1000);
			}
		}
	}catch(e){log("likeit: "+e);}};

	if (location.href.match(/^http:\/\/www\.facebook\.com\/(.*?)\/posts/) ) {
		log(["located",location.hash, location.hash.getUrlParam("likeit"), location.hash.getUrlParam("commentit")]);
		if (location.hash.getUrlParam("likeit") || location.hash.getUrlParam("commentit")) likeit();
		return;
	}
	*/ //end retired likeit functions
	
//***************************************************************************************************************************************
//***** Globals
//***************************************************************************************************************************************
	var version = "3.0-b47";
	var userID="", profile="",userAlias="";
	var iconsURL=GM_getResourceURL("IconSheet");
		
	var apps = {};
	var posts = {};
	var history = {};
	var userConfig=null; //user settings

	sandbox.opts = {}; //global settings reference
	sandbox.quickOpts = {}; //global settings reference type b
	
	var displayGroups={}; //location to store display group nodes
	
	var likeQue=[]; //a que for autolike addresses and timers
	
	var flagManualAuthToken = true;
	var isNumber = function(v){return ((typeof v) == "number");};
	
//***************************************************************************************************************************************
//***** Preload
//***************************************************************************************************************************************
	//dont run in iframes
	try {
		//this does not mean we are using GM's unsafe window
		var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
		if(unsafeWindow.frameElement != null) return;
	} catch(e) {log("preload: "+e);}

//***************************************************************************************************************************************
//***** Debug Object
//***************************************************************************************************************************************
	if (debug) {
		debug.init();
		if (debug.initialized) log("Debug Console Initialized");
	}
	
//***************************************************************************************************************************************
//***** Visual Console Object
//***************************************************************************************************************************************
	var wmConsole = {
		initialized: false,
		sidekickNode: null, //remember the sidekicks list
		feedNode: null, //remember where to put the feed data
		loading: true, //set to false after sidekicks have time to load
		priorityNode: null,
		priorityBuild: null,
		dynamicBuild: null,
		
		//new content
		tabContainer:null, //outer tab control
		configButton:null, //userConfig.open control
		collectTabControl:null, //app filter tab control
		
		dynamicIcons: function(){
			//define a crapload of icons
			var icons={
				//128x128 pixel icons
				row0:["refresh","world","check",null,"moveUpLevelLeft","moveUpLevelRight","moveDownLevelLeft","moveDownLevelRight","filter","plus","minus","multiply","import","reset","object","array"],
				row1:["expandDown","expandUp","expandLeft","expandRight","moveTopLeft","moveBottomLeft",null,"allSidekicks","location","sortAsc","sortDesc","tools","treeExpand","treeCollapse","exportGrab","grab"],
				row2:["playDown","playUp","playLeft","playRight","like","unlike","uncheckAll","checkAll","layoutSmall","layoutDetail","layoutList","sidekick","refreshProcess","cancelProcess","importData"],
				row3:["arrowDown","arrowUp","arrowRight","arrowLeft","rssUpRight","rssUpLeft","rssDownRight","rssDownLeft","pin","pinned","redPhone","shuffle",null,"birth","comment"],
				row4:["plugin","identify","add","remove","openInNewWindow","restoreDown","stop","pause","trash","action","logo",null,"moveOutLevel","moveInLevel","removeGlobal","toGlobal"],
				row5:["clone","hatch","tag","noImage","accordionExpandH","accordionCollapseH","accordionExpandV","accordionCollapseV","gotoLibrary","addFilter","removeFilter","maximize","addFeed","addGlobal","fromGlobal","checkGlobal"],
				
				//32px icons
				row6:["firefox","chrome",null,"tabs"],
				
				//16px icons
				row7:["treeCollapseS","treeExpandS","layoutSmallColor","layoutDetailColor","layoutListColor",null,null,null,null,null,null,"noImageSmall"],
			};
			
			var ret=".resourceIcon {display:block; background-image:url('"+iconsURL+"') !important;}\n";
			
			//create css statements 
			//for rows 0-5,6,7
			var sizes=[8,16,24,32,48,64];
			
			for (var si=0,len=sizes.length;si<len;si++){
				var s=sizes[si];
				for (var r=0;r<=6;r++){
					for (var i=0;i<20;i++){
						var iconName=icons["row"+r][i];
						if (iconName!=null) {
							ret+="."+iconName+s+" {background-position:"+(-i*s)+"px "+(-r*s)+"px; width:"+s+"px; height:"+s+"px; background-size:"+(1024/(64/s))+"px;}\n";
						}
					}
				}
				r=6;
				for (var i=0;i<20;i++){
					var iconName=icons["row"+r][i];
					if (iconName!=null) {
						//6 rows of icons 2 times this size
						var yOffset=(6*s*2);
						ret+="."+iconName+s+" {background-position:"+(-(i*s))+"px "+(-yOffset)+"px; width:"+s+"px; height:"+s+"px; background-size:"+(1024/(64/(s*2)))+"px;}\n";
					}
				}
				r=7;
				for (var i=0;i<20;i++){
					var iconName=icons["row"+r][i];
					if (iconName!=null) {
						//6 rows of icons 4 times this size
						//plus 1 row of icons twice this size
						var yOffset=(6*s*4) + (1*s*2);
						ret+="."+iconName+s+" {background-position:"+(-(i*s))+"px "+(-yOffset)+"px; width:"+s+"px; height:"+s+"px; background-size:"+(1024/(64/(s*4)))+"px;}\n";
					}
				}
			}

			return ret;
		},
		
		globalStyle:function(){try{
			return ""+
			
			//icon sheets
			wmConsole.dynamicIcons()+
			
			"html {height:100%; width:100%;}\n"+
			"body {margin:0 !important; font-family:tahoma,arial; font-size:small;}\n"+
			
			"a:hover {text-decoration: none !important;}\n"+

			"#content {display:none !important; }\n"+

			"#wmContent {background-color:#DDDDEE; position:relative;}\n"+

			".post.classic {position:relative; min-height:90px; border-bottom:1px solid #CCCCDD; padding-bottom:10px; padding-top:10px; clear:both;}\n"+
			".post.classic .actor {margin-top:5px; margin-bottom:10px; font-weight:700; color:#3B5998; display:inline;}\n"+
			".post.classic .picture {padding-top:5px; padding-right:10px; float:left;}\n"+
			".post.classic .picture img {width:90px; height:90px; background-color:white; border:1px solid; border-radius:5px;}\n"+
			".post.classic .body {vertical-align:top;}\n"+
			".post.classic .title {margin-top:5px; font-weight:700; color:#3B5998;display:block;}\n"+
			".post.classic .caption {display:block; }\n"+
			".post.classic .description {padding-top:5px; display:block;}\n"+
			".post.classic .postDate {}\n"+
			".post.classic .appName {position:relative; left:10px;}\n"+
			".post.classic .linkText {color:#899ADB; float:right; padding-right:32px;}\n"+
			".post.classic.noimage {min-height:1px;}\n"+
			
			".post.short {float:left; position:relative;}\n"+
			".post.short .floater {overflow:hidden; display:block; background-color: white; border:0px solid; border-radius:5px; position:absolute; z-index:3; padding:0; width:0px;}\n"+
			".post.short:hover .floater {-moz-transition-property: width,height,padding,border;-moz-transition-delay:1s; width:240px; padding:5px 10px;border:1px solid;}\n"+
			".post.short .actor {display:block;}\n"+
			".post.short .picture {position:relative;}\n"+
			".post.short .picture img {position:relative; width:100%; height:100%; background-color:white;}\n"+
			".post.short .postDate {display:block;}\n"+
			".post.short .appName {display:block;}\n"+
			".post.short .linkText {display:block;}\n"+
			".post.short .progress {opacity:0.25; background-color:#00FF00;}\n"+

			".post.short.working .picture img {opacity:0.25;}\n"+
			".post.short.excluded .picture img {opacity:0.25;}\n"+
			".post.short.timeout .picture img {opacity:0.25;}\n"+
			".post.short.paused .picture img {opacity:0.25;}\n"+
			".post.short.nodef .picture img {opacity:0.25;}\n"+
			".post.short.accepted .picture img {opacity:0.25;}\n"+
			".post.short.failed .picture img {opacity:0.25;}\n"+
			".post.short.colored .picture img {opacity:0.25;}\n"+
			".post.short.scam .picture img {opacity:0.25;}\n"+
			".post.short.pinned .picture img {opacity:0.25;}\n"+

			".post.dev {position:relative; min-height:90px; border-bottom:1px solid #CCCCDD; padding-bottom:20px; padding-top:10px; clear:both;}\n"+
			".post.dev>div:first-child {display: inline-block; margin-right: 16px; border: none;}\n"+

			".wm.content > div > .toolBox {display:inline;}\n"+
			".wm.content > div > .toolBox > div {display:inline;}\n"+
			
			".post .toolBox {display:block; vertical-align:top; position:relative !important;}\n"+
			".post .toolBox > div {display:block; float:right;}\n"+
			
			"div.excluded {background-color:gray !important;}\n"+
			"div.working {background-color:yellow !important;}\n"+
			"div.timeout {background-color:orange !important;}\n"+
			"div.paused {background-color:silver !important;}\n"+
			"div.pinned {background-color:silver !important;}\n"+
			"div.nodef {background-color:deepskyblue !important;}\n"+
			"div.failed {background-color:red !important;}\n"+
			"div.accepted {background-color:limegreen !important;}\n"+
			"div.scam {background-color:purple !important;}\n"+
			
			".pausedHover {display:none; position:absolute; right:50%; top:50%;}\n"+
			".pausedHover>img {margin-left:-32px; margin-top:-32px;}\n"+
			".pausedHover>img:hover {background-color:rgba(0,255,0,0.5); border-radius:20%;}\n"+
			
			".post.paused.short>.floater>.pausedHover>img {background-color:rgba(0,255,0,0.5); border-radius:20%;}\n"+
			".post.paused>.pausedHover, .post.paused>.floater>.pausedHover {display:block;}\n"+
						
			".underline {border-bottom:1px solid #CCCCDD;}\n"+

			".toolTip {display:none; border:1px solid #767676; border-radius:3px; background-color:white; color:black; position:absolute; font-size:8pt; padding:5px; line-height: 12px; z-index:9999;}\n"+
			"*:hover > .toolTip {display:block;}\n"+
			".menuNode {width:0px; height:0px; position:absolute; background:none; border:none;top:-5px;}\n"+
			".toolTip.menuNode > ul {position:absolute; background-color: white; border: 1px solid; border-radius: 5px 5px 5px 5px; padding: 2px; min-width:100px;}\n"+
			".toolTip.menuNode > ul > li {position:relative; line-height:1.28; }\n"+
			".toolTip.right.menuNode {right:5px; }\n"+
			".toolTip.left.menuNode {left:-5px; }\n"+
			".toolTip.right.menuNode > ul {left:0px;}\n"+
			".toolTip.right.menuNode > ul > li {text-align:left;}\n"+
			".toolTip.left.menuNode > ul {right:0px;}\n"+
			".toolTip.left.menuNode > ul > li {text-align:right;}\n"+

			//little button div
			".littleButton {background-color:threedshadow; border-radius:5px; margin:1px; display:inline-block; vertical-align:middle;}\n"+
			".littleButton:hover {background-color:highlight !important;}\n"+
			".littleButton>img {position:relative; display:block; margin:2px;}\n"+
			".littleButton.oddOrange {background-color:#FF9968;}\n"+
			".littleButton.oddBlack {background-color:#82976E;}\n"+
			".littleButton.oddBlue {background-color:#51D1EA;}\n"+
			".littleButton.oddGreen {background-color:#B7E54F;}\n"+
			
			".menuEntry, .menuList > li {position:relative; border-radius:3px; border:1px solid white; padding:3px; min-width:100px;}\n"+
			".menuEntry:hover, .menuList > li:hover {border-color:#CCCCDD; background-color:#E0E8F6; }\n"+

			".accFailBlock {color: white !important;font-size: small !important;left: 16px;line-height: 12px;margin-bottom: -12px;padding: 0 !important;position: relative;top: -32px;}\n"+
			".accFailBlock .fail {background-color: #C3463A; border-radius: 2px 2px 2px 2px; box-shadow: 1px 1px 1px rgba(0, 39, 121, 0.77); padding: 1px 2px;}\n"+
			".accFailBlock .accept {background-color: #46B754; border-radius: 2px 2px 2px 2px; box-shadow: 1px 1px 1px rgba(0, 39, 121, 0.77); padding: 1px 2px;}\n"+

			//rules manager
			"#wmPriorityBuilder {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+
			
			"#wmPriorityBuilder .validator > :before {content:'and: '}\n"+
			"#wmPriorityBuilder .validator:first-child > :before {content:'where: '}\n"+
			"#wmPriorityBuilder .action > :before {content:'and: '}\n"+
			"#wmPriorityBuilder .action:first-child > :before {content:'do: '}\n"+
			
			//collection feed node
			"#wmFeedNode {margin:5px; position: relative; background-color:white;}\n"+

			//sidekick manager
			"#wmSidekickList {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+
			
			//feeds manager
			"#wmFeedsList {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+

			//dynamic grabber
			"#wmDynamicBuilder {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+
			
			//friend tracker
			"#wmFriendTracker {margin:5px; position: relative; background-color:white; min-height:95%;}\n"+

			".expanded {display:block;}\n"+
			".collapsed {display:none;}\n"+
						
			"label {font-weight:bold; margin-right:5px;}\n"+

			".unsaved {background-color:lightyellow !important;}\n"+

			".whiteover:hover {background-color:#FFFFFF !important;}\n"+
			".blueover:hover {background-color:#E0E8F6 !important;}\n"+

			".red {background-color:#C3463A !important; border: 2px solid #982B2F !important; text-shadow: -1px -1px 1px #982B2F, 1px 1px 1px #982B2F, 1px -1px 1px #982B2F, -1px 1px 1px #982B2F; text-transform: none !important; font-color:white !important;}\n"+
			".red:hover {background-color:#EA1515 !important;}\n"+

			".green {background-color:#46B754 !important; border: 2px solid #256E46 !important; text-shadow: -1px -1px 1px #256E46, 1px 1px 1px #256E46, 1px -1px 1px #256E46, -1px 1px 1px #256E46; text-transform: none !important; font-color:white !important;}\n"+
			".green:hover {background-color:#A6E11D !important;}\n"+

			".blue {background-color:#51C2FB !important; border: 2px solid #057499 !important; text-shadow: -1px -1px 1px #057499, 1px 1px 1px #057499, 1px -1px 1px #057499, -1px 1px 1px #057499; text-transform: none !important; font-color:white !important;}\n"+
			".blue:hover {background-color:#C2DEFF !important;}\n"+

			".gray {background-color:#999999 !important; border: 2px solid #666666 !important; text-shadow: -1px -1px 1px #666666, 1px 1px 1px #666666, 1px -1px 1px #666666, -1px 1px 1px #666666; text-transform: none !important; font-color:white !important;}\n"+
			".gray:hover {background-color:#C3C3C3 !important;}\n"+

			".odd {background-image: -moz-linear-gradient(center top , orange, red); box-shadow: 1px 1px 1px black; -moz-transform: rotate(15deg);}\n"+
			".odd:hover {-moz-transform: none;}\n"+

			".post.mosquito {width:16px; height:16px;}\n"+
			".post.tiny {width:24px; height:24px;}\n"+
			".post.small {width:32px; height:32px;}\n"+
			".post.medium {width:48px; height:48px;}\n"+
			".post.large {width:64px; height:64px;}\n"+
			".post.xlarge {width:96px; height:96px;}\n"+

			".floater.mosquito {left:8px;top:8px;}\n"+
			".floater.tiny {left:12px;top:12px;}\n"+
			".floater.small {left:16px;top:16px;}\n"+
			".floater.medium {left:24px;top:24px;}\n"+
			".floater.large {left:32px;top:32px;}\n"+
			".floater.xlarge {left:48px;top:48px;}\n"+

			".post.mosquito.working .picture img {width:24px; height:24px;left:-4px;top:-4px;}\n"+
			".post.tiny.working .picture img {width:32px; height:32px;left:-4px;top:-4px;}\n"+
			".post.small.working .picture img {width:48px; height:48px;left:-8px;top:-8px;}\n"+
			".post.medium.working .picture img {width:64px; height:64px;left:-8px;top:-8px;}\n"+
			".post.large.working .picture img {width:96px; height:96px;left:-16px;top:-16px;}\n"+
			".post.xlarge.working .picture img {width:128px; height:128px;left:-16px;top:-16px;}\n"+

			//"div.pinned {border-radius: 6px; background-color: black !important;}\n"+
			//".post.short.pinned .picture img {border-radius: 5px; height:80% !important; width:80% !important; margin-left:10%; margin-top:10%;}\n"+

			"#wmContent>.jsfTabControl>.tabs {top:10%; width:100px; position:relative;}\n"+
			"#wmContent>.jsfTabControl>.pages {border-radius:5px;}\n"+
			"#wmContent>.jsfTabControl>.tabs>.jsfTab {text-align:center;}\n"+
			
			".jsfTabControl>.tabs {font-family:impact; font-size:large; color:inactivecaptiontext;}\n"+
			"input,select,label,textarea {font-family:tahoma,arial; font-size:small; vertical-align:baseline !important;}\n"+
			".jsfComboBox {line-height:normal;}\n"+
			"button {font-family:tahoma,arial; font-size:small; vertical-align:top !important;}\n"+
			"input[type=\"checkbox\"] {font-family:tahoma,arial; font-size:small; vertical-align:middle !important;}\n"+

			".nomargin {margin:0 !important;}\n"+
			".hidden {display:none !important;}\n"+
			".block {display:block !important;}\n"+
			".alignTop {vertical-align:top !important;}\n"+
			".fit {width:100% !important;}\n"+
			".indent {margin-left:16px;}\n"+
			"img.crisp {image-rendering: -moz-crisp-edges;}\n"+
			
			".listItem {position:relative; clear:both;}\n"+
			".listItem.disabled {opacity:0.5 !important; background-color:#eeeeee;}\n"+
			".listItem .toolBox {position: absolute; right: 0px; top: 0;}\n"+
			".listItem select {border:0px; padding:0px; margin: 0px; margin-left:6px; margin-right:6px; background-color:#eeeeee; vertical-align:middle;}\n"+
			".listItem input {border:0px; padding:0px; margin: 0px; margin-left:6px; margin-right:6px; background-color:#eeeeee; vertical-align:middle;}\n"+
			".listItem textarea {background-color:#eeeeee; border:0px;}\n"+

			".header {background-color: window; font-family:impact; font-size:2em; color:inactivecaptiontext; border-radius:5px 5px 0 0; padding-left:6px;}\n"+
			".headerCaption {background-color: window; color: inactivecaptiontext; font-family: arial; font-size: small; padding-bottom: 6px; padding-left: 16px; padding-right: 16px; padding-top: 6px; border-radius:0 0 5px 5px;}\n"+
			".headerCaption+.toolBox, .header+.toolBox {border-bottom:1px solid activeborder; margin-bottom: 5px; margin-top: 5px; padding-bottom: 5px;}\n"+
			
			".line {border-top:1px solid #c0c0c0; line-height:2em;}\n"+
			".subsection {margin-left:28px;}\n"+
			
			".optioncontainer {max-height:12em; overflow-y:auto; background-color:rgb(238, 238, 238);}\n"+
			".optioncontainer>.line {line-height:normal;}\n"+
			
			".singleCol .post.classic {}\n"+
			".twoCol .post.classic {display: inline-block; width: 50%; vertical-align: top;}\n"+
			".twoCol .post.classic > .body {padding-right:28px;}\n"+
			".threeCol .post.classic {display: inline-block; width: 33%; vertical-align: top;}\n"+
			".threeCol .post.classic > .body {padding-right:28px;}\n"+
			".fourCol .post.classic {display: inline-block; width: 25%; vertical-align: top;}\n"+
			".fourCol .post.classic > .body {padding-right:28px;}\n"+

			".w400 {width:400px;}\n"+


			""
		}catch(e){log("wmConsole.globalStyle: "+e);}},

		init: function(params){try{
			debug.print("wmConsole.init:");
			var validateFBElements=["globalContainer","content"];
			params=params||{};

			//if console does not already exist
			if (!wmConsole.tabContainer) {
				try{
					addGlobalStyle(wmConsole.globalStyle(),"styleConsole");
				}catch(e){log("wmConsole.init.addGlobalStyle: "+e);};

				//attach to facebook page
				var baseNode=$("globalContainer");
				if (baseNode) baseNode=baseNode.parentNode; 
				//or attach to page body
				else baseNode=($("body")||document.body);

				//sort fields shared by post sorting and grouping
				var sortFields = [
					{value:"age",title:"Time elasped since created (ms)."},
					{value:"alreadyProcessed",title:"History contains a status code for this post."},
					{value:"appID"},
					{value:"appName",title:"App name as it appears on FB."},
					{value:"date",title:"The datetime the post was created, in unix format. Does not contain millisecond data."},
					{value:"fromID",title:"The FB id of the person who created this post."},
					{value:"fromName",title:"The display name of the person who created this post."},
					{value:"fromNameLastFirst",title:"As fromName but displayed as LastName, FirstName"},
					{value:"id",title:"The post object id as it is connected with FB."},
					{value:"idText",title:"Either the whichText of the post, or the statusText of a post already processed."},
					{value:"isAccepted"},
					{value:"isFailed"},
					{value:"isTimeout"},
					{value:"isExcluded"},
					{value:"isCollect",title:"A flag for if this post is to be collected."},
					{value:"isForMe"},
					{value:"isLiked"},
					{value:"isMyPost"},
					{value:"isPaused"},
					{value:"isPinned"},
					{value:"isScam"},
					{value:"isStale"},
					{value:"isUndefined"},
					{value:"isWishlist"},
					{value:"isW2W",title:"If this post is a Wall-to-wall post or just a general feed post."},
					{value:"msg",title:"The comment attached to the post body by the post creator."},
					{value:"postedDay",title:"The year/month/day portion of the creation time for this post."},
					{value:"postedHour",title:"The year/month/day/hour portion of the creation time for this post."},
					{value:"priority",title:"Priority 0 being the first post you would want processed, and Priority 50 being default."},
					{value:"status",title:"The status code returned by the sidekick associated with this post."},
					{value:"which",title:"The sidekick-defined bonus type id for this kind of post."},
					{value:"whichText",title:"The text associated with this bonus type id."},
					{value:null,name:"(none)"},
				];

				//create our content window
				baseNode.insertBefore(createElement("div",{id:"wmContent"},[
					//toolbox
					(wmConsole.tabContainer=new jsForms.tabControl({
						dock:"fillAndShare",
						sizeOffset:{height:-3,width:0},
						alignment:"left",
						tabs:[
							{ //collect tab
								text:"Collect",
								image:null,
								onSelect:function(){wmConsole.collectTabControl.redraw();},
								content:[
									createElement("div",{className:"header",textContent:"Collect"}),
									createElement("div",{className:"headerCaption",textContent:"View friends' posts and manage all your collection needs."}),
									createElement("div",{className:"toolBox medium"},[
										createElement("span",{className:"littleButton oddBlue",title:"Fetch Newer Posts Now",onclick:function(){main.fetch({prev:true,bypassPause:true});} },[createElement("img",{className:"resourceIcon rssUpRight24"})]),
										createElement("span",{className:"littleButton",title:"Fetch Older Posts Now",onclick:function(){main.fetch({next:true,bypassPause:true});} },[createElement("img",{className:"resourceIcon rssDownLeft24"})]),
										wmConsole.pauseFetchButton=createElement("span",{className:"littleButton oddOrange",title:"Pause Automatic Fetching",onclick:function(){main.pauseFetching();} },[createElement("img",{className:"resourceIcon expandDown24"})]),
										wmConsole.pauseCollectButton=createElement("span",{className:"littleButton oddOrange",title:"Pause Automatic Collection",onclick:function(){main.pauseCollecting();} },[createElement("img",{className:"resourceIcon stop24"})]),
										createElement("span",{className:"littleButton",name:"0",title:"Classic View",onclick:main.setDisplay},[createElement("img",{className:"resourceIcon layoutListColor24"})]),
										createElement("span",{className:"littleButton",name:"1",title:"Short View",onclick:main.setDisplay},[createElement("img",{className:"resourceIcon layoutSmallColor24"})]),
										createElement("span",{className:"littleButton",name:"2",title:"Developer View",onclick:main.setDisplay},[createElement("img",{className:"resourceIcon layoutDetailColor24"})]),
										createElement("span",{className:"littleButton",title:"Reset Counters",onclick:function(){main.resetCounters();}},[createElement("img",{className:"resourceIcon refresh24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Clean Now",onclick:function(){main.cleanPosts();}},[createElement("img",{className:"resourceIcon trash24"})]),
										createElement("span",{className:"littleButton",title:"ReID All",onclick:function(){main.reIDAll();}},[createElement("img",{className:"resourceIcon identify24"})]),
										
										createElement("label",{className:"indent",textContent:"Sort By: "}),
										createElement("select",{id:"wmSortBy",className:"", title:"Sort By:", onchange:function(){main.sortPosts({by:this.value});main.redrawPosts({postRedraw:false,reorder:true});} },(function(){
											var ret=[];
											for (var i=0;i<sortFields.length;i++) ret.push(createElement("option",{value:sortFields[i].value,title:sortFields[i].title||"",textContent:sortFields[i].name||sortFields[i].value}));
											return ret;
										})()),
										createElement("span",{className:"littleButton oddGreen",title:"Sort Ascending",onclick:function(){main.sortPosts({direction:"asc"});main.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortAsc24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Sort Descending",onclick:function(){main.sortPosts({direction:"desc"});main.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortDesc24"})]),
										
										createElement("label",{className:"indent",textContent:"Group By: "}),
										createElement("select",{id:"wmGroupBy",className:"", title:"Group By:", onchange:function(){main.constructGroups({by:this.value});main.redrawPosts({postRedraw:false,reorder:true});} },(function(){
											var ret=[];
											for (var i=0;i<sortFields.length;i++) ret.push(createElement("option",{value:sortFields[i].value,title:sortFields[i].title||"",textContent:sortFields[i].name||sortFields[i].value}));
											return ret;
										})()),
										createElement("span",{className:"littleButton oddGreen",title:"Group Ascending",onclick:function(){main.sortGroups({direction:"asc"});main.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortAsc24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Group Descending",onclick:function(){main.sortGroups({direction:"desc"});main.redrawPosts({reorder:true, postRedraw:false});}},[createElement("img",{className:"resourceIcon sortDesc24"})]),

										createElement("label",{className:"indent",textContent:"Columns: ",title:"Classic Mode Only"}),
										createElement("select",{title:"Cols:", onchange:function(){main.setDisplayCols({cols:this.value});} },[
											createElement("option",{value:1,textContent:"One",selected:quickOpts.displayCols==1}),
											createElement("option",{value:2,textContent:"Two",selected:quickOpts.displayCols==2}),
											createElement("option",{value:3,textContent:"Three",selected:quickOpts.displayCols==3}),
											createElement("option",{value:4,textContent:"Four",selected:quickOpts.displayCols==4})
										]),
										createElement("span",{className:"littleButton oddBlue",title:"Autolike Queue"},[
											createElement("img",{className:"resourceIcon like24"}),
											createElement("div",{className:"accFailBlock"},[
												wmConsole.likeQueueCounterNode=createElement("span",{className:"accept",textContent:"0"})
											])											
										]),
									]),
									//app filter tabs
									(wmConsole.collectTabControl=new jsForms.tabControl({
										dock:"fillAndShare",
										subStyle:"coolBar",
										shareSinglePage:true,
										preventAutoSelectTab:true,
										tabs:[
											{
												//default show all tab
												text:"Show ALL",
												image:"",
												imageClass:"resourceIcon allSidekicks32",
												appFilter:"All",
												onSelect:main.setAppFilter,
												selected:(quickOpts.filterApp=="All"),
												content:null, //because page is shared
											}
										],
										sharedContent:[
											//bonus display node
											wmConsole.feedNode=createElement("div",{id:"wmFeedNode",style:"position: relative;"}),
										],
									})).node,
								],
							},
							{ //sidekicks tab
								text:"Manage Sidekicks",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Manage Sidekicks"}),
									createElement("div",{className:"headerCaption",textContent:"Control some of the features of sidekicks."}),
									wmConsole.sidekickNode=createElement("div",{id:"wmSidekickList",className:"scrollY"}),
								],
							},
							{ //feeds tab
								text:"Manage Feeds",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Manage Feeds"}),
									createElement("div",{className:"headerCaption",textContent:"Add direct links to friends or other public profiles, and fetch posts from those feeds faster."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("div",{},[
											createElement("div",{className:"littleButton oddGreen",title:"Add Feed",onclick:FeedManager.newFeed},[createElement("img",{className:"resourceIcon plus24"})]),
										])
									]),
									wmConsole.feedManagerNode=createElement("div",{id:"wmFeedsList",className:"scrollY"}),
								],
							},
							{ //rules tab
								text:"Manage Rules",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Manage Rules"}),
									createElement("div",{className:"headerCaption",textContent:"Create rules like macros to control exactly how posts are handled."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("div",{},[
											createElement("div",{className:"littleButton oddGreen",title:"Add Rule",onclick:Priority.newRule},[createElement("img",{className:"resourceIcon plus24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Reset All Limits",onclick:Priority.resetAllLimits},[createElement("img",{className:"resourceIcon reset24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Convert Dynamics",onclick:Priority.convertDynamics},[createElement("img",{className:"resourceIcon exportGrab24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Import Rule",onclick:Priority.importRule},[createElement("img",{className:"resourceIcon importData24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Export All Rules",onclick:Priority.showData},[createElement("img",{className:"resourceIcon object24"})]),
										])
									]),
									wmConsole.priorityBuild=createElement("div",{id:"wmPriorityBuilder",className:"scrollY"}),
								],
							},
							{ //dynamics tab
								text:"Dynamic Grabber",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Dynamic Grabber"}),
									createElement("div",{className:"headerCaption",textContent:"Create tests to capture posts sidekicks might not."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("div",{},[
											createElement("div",{className:"littleButton oddGreen",title:"Add Test",onclick:Grabber.newTest},[createElement("img",{className:"resourceIcon plus24"})]),
											createElement("div",{className:"littleButton oddBlue",title:"Import Test",onclick:Grabber.importTest},[createElement("img",{className:"resourceIcon importData24"})]),
										])
									]),
									wmConsole.dynamicBuild=createElement("div",{id:"wmDynamicBuilder",className:"scrollY"}),
								],
							},
							{ //friends tab
								text:"Friend Tracker",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Friend Tracker"}),
									createElement("div",{className:"headerCaption",textContent:"Track player friends and your interactions with them."}),
									createElement("div",{className:"toolBox medium columnRight"},[
										createElement("span",{className:"littleButton oddOrange",title:"Clean Now",onclick:function(){FriendTracker.clearAll();}},[
											createElement("img",{className:"resourceIcon trash24"})
										]),
										
										createElement("label",{className:"indent",textContent:"Sort By: "}),
										createElement("select",{title:"Sort By:", onchange:function(){FriendTracker.sort({sortBy:this.value});} },[
											createElement("option",{value:"acceptCount",textContent:"acceptCount",title:"How many posts WM remembers as collected successfully from this user."}),
											createElement("option",{value:"failCount",textContent:"failCount",title:"How many posts WM remembers as failed from this user."}),
											createElement("option",{value:"id",textContent:"id",title:"The facebook id of the user."}),
											createElement("option",{value:"lastKnownPostDate",textContent:"lastKnownPostDate",title:"The date of the last known post WM received for this user."}),
											createElement("option",{value:"name",textContent:"name",title:"The name of the user, with last name first."}),
											createElement("option",{value:"postCount",textContent:"postCount",title:"How many posts WM remembers receiving related to this user."}),
											createElement("option",{value:"totalCount",textContent:"totalCount",title:"How many posts WM remembers failed OR accepted from this user."})
										]),
										createElement("span",{className:"littleButton oddGreen",title:"Sort Ascending",onclick:function(){FriendTracker.sort({sortOrder:"asc"});}},[createElement("img",{className:"resourceIcon sortAsc24"})]),
										createElement("span",{className:"littleButton oddOrange",title:"Sort Descending",onclick:function(){FriendTracker.sort({sortOrder:"desc"});}},[createElement("img",{className:"resourceIcon sortDesc24"})]),
									]),
									wmConsole.friendBuild=createElement("div",{id:"wmFriendTracker",className:"scrollY"}),
								],
							},
							{ //options tab
								text:"Options",
								image:null,
								content:[
									createElement("div",{className:"header",textContent:"Options"}),
									createElement("div",{className:"headerCaption",textContent:"Manage script and sidekick configuration, or link to updates."}),
									//config menu button
									createElement("div",{},[
										createElement("label",{textContent:"Open the options menu: "}),
										wmConsole.configButton=createElement("button",{
											className:"jsfHidden",
											textContent:"WM Options",											
											onclick:function(){
												//open options menu
												userConfig.open();
											},
										}),
									]),
									//update script button
									createElement("div",{},[
										createElement("label",{textContent:"Update Script (Current Version: "+version+") :"}),
										createElement("button",{
											className:"",
											textContent:"Update Script",
											onclick:function(){
												//open update url in new window/tab
												window.open("http://userscripts.org/scripts/source/86674.user.js","_blank");
											},
										}),
									]),									
								],
							},
						]
					})).node
				]),  $("globalContainer"));

				//destroy facebook content on page
				if ($("content")) $("content").style.display="none !important";
				
				//init sort order
				$("wmSortBy").value=quickOpts.sortBy;

				//init group order
				$("wmGroupBy").value=quickOpts.groupBy;

				//init display mode
				with (wmConsole.feedNode){
					className = className.toggleWordB(["1","3"].inArray(quickOpts.displayMode),"short");						
				}
				main.setDisplayCols({cols:quickOpts.displayCols});
				
			}
			wmConsole.initialized = true;

			//give sidekicks time to dock
			if (params["callback"]||null) {
				var fx = params["callback"];
				delete params["callback"];
				doAction(fx);
			}
			
		}catch(e){log("wmConsole.init: "+e);}},
		
	};

//***************************************************************************************************************************************
//***** Sidekick Docking Object
//***************************************************************************************************************************************
	var Dock = {
		//restructure menu to append appID before every object
		fixMenu: function(menu,app){try{
			var ret={};
			//for each object in menu
			for (var o in menu){
				//main.message(o);
				ret[app+o]=menu[o];

				//fix button functions and arrays to be prepended by the appID of that sidekick
				var t=menu[o]["type"];
				switch(t){
					case "button_highlight":
					case "button_selectmulti":
					case "button_selectprefix":

						//fix elements in the clearfirst array
						if (menu[o]["clearfirst"]){
							for (var i=0,len=ret[app+o]["clearfirst"].length;i<len;i++){
								ret[app+o]["clearfirst"][i] = app+ret[app+o]["clearfirst"][i];
							}
						}

						//fix elements in the options array
						if (menu[o]["options"]){
							for (var i=0,len=ret[app+o]["options"].length;i<len;i++){
								ret[app+o]["options"][i] = app+ret[app+o]["options"][i];
							}
						}

						if (menu[o]["clearPrefix"]){
							ret[app+o]["clearPrefix"]=app+ret[app+o]["clearPrefix"];
						}

						if (menu[o]["prefix"]){
							ret[app+o]["prefix"]=app+ret[app+o]["prefix"];
						}
				}

				//fix kids
				if (menu[o]["kids"]){
					//rebuild kids object
					ret[app+o]["kids"]=Dock.fixMenu(menu[o]["kids"],app);
				}
			}
			return ret;
		} catch(e) {log("Dock.fixMenu: "+e);}},

		//restructure tests to append appID before every object's return
		fixTests: function(arr,app){try{
			//for each test in array
			for (var t=0,len=arr.length;t<len;t++) {
				var ret=arr[t].ret, kids=arr[t].kids;
				//replace return value
				if (ret) {
					if (ret!="exclude" && ret!="none") {
						arr[t].ret=app.appID+ret;
					}
				}
				//process subtests
				if (kids) Dock.fixTests(kids,app);
			}
		} catch(e) {log("Dock.fixTests: "+e);}},

		fixAcceptTexts:function(app){try{
			var newAccText={};
			for (var s in app.accText) {
				newAccText[app.appID+s]=app.accText[s];
			}
			app.accText=newAccText;
		} catch(e) {log("Dock.fixAcceptTexts: "+e);}},

		parseNewSidekick: function(newNote){try{
			if (newNote){
				var val = newNote.getAttribute('data-ft');
				var newset = JSON.parse(val);

				//save it into the NEW format for games
				var app=(apps[newset.appID]=new App(newset));

				//promptText(JSON.stringify(userConfig.settings));
				main.updateSettingsValues();

				//detach the menu from the newset to reduce duplication
				delete app.menu;

				//erase the door note so we dont add it again later
				newNote.setAttribute('data-ft','');
				
				//fire priority event
				(function(){Priority.doEvent("onSidekickDock",app);})();
				
				//fetch its initial posts
				//app.fetchPosts();
				main.newSidekicks.push(app);
			}
		} catch(e) {log("Dock.parseNewSidekick: "+e);}},
		
		answerDockingDoor: function(){try{
			//log("Sidekick requesting to dock");

			//get all sidekicks that left info on the dock;
			forNodes(".//div[@id='wmDock']/div[(@data-ft) and not(@data-ft='')]",{},Dock.parseNewSidekick);
		} catch(e) {log("Dock.answerDockingDoor: "+e);}},

	};
	
//***************************************************************************************************************************************
//***** Sidekick Object
//***************************************************************************************************************************************
	var Collector = {
		tabs : {}, //container for window objects
		recycle : [], //container for reusable window objects
		queue : [], //container for urls to do in order
		count : 0,

		windowExists : function(hwnd){
			try{
				var testUrl=tab.hwnd.location.toString();
				return true;
			}catch(e) {
				return false;
			}
		},
		
		//requires id, url and callback
		open : function(params) {try{
			//log("Collector.open()",{level:0});

			//check for tab queueing
			if (opts.queuetabs && Collector.count && !(params.emergency||false)) {
				if (params.first||false) {
					//cut in line to be next processed
					Collector.queue.unshift(params);
					return;
				}
				//toss the next action in the queue while we wait for the current one to finish
				Collector.queue.push(params);
				//log("Collector.open: request queued",{level:1});
				return;
			}

			var url = params.url;
			var id = params.id;

			//create a window or use a recycled one
			var tabHwnd;
			if (Collector.recycle.length) {
				tabHwnd = Collector.recycle.shift();
				//watch for missing window objects
				try{
					//use the existing window object if it responds
					tabHwnd.location.href=url;
				} catch (e) {
					//window object missing, make a new one
					//FF22 version
					tabHwnd = GM_openInTab(url,"_blank");
					//FF21 version
					//tabHwnd = ((opts.useGM_openInTab)?GM_openInTab:window.open)(url,"_blank");
				}
			} else {
				//we do not use recycling, just make a new one
				//FF22 version
				tabHwnd = GM_openInTab(url,"_blank");
				//FF21 version
				//tabHwnd = ((opts.useGM_openInTab)?GM_openInTab:window.open)(url,"_blank");
			}

			//window opening
			if (tabHwnd) {
				Collector.count++;
				params.hwnd=tabHwnd; //store the window handle
				params.openTime=timeStamp();
				Collector.tabs[id]=params; //add the tab and all its data to the array

				//pass data to the sidekick top window
				var callback = params.callback;
				if (callback) delete params.callback;
				if (params.msg) {
					remove($(params.msg));
					delete(params.msg);
				}
				
				//details for posts, not for likes
				var app, synApp, isPost;
				if (isPost=(params.post||null)){
					app=params.post.app; 
					synApp=app.parent||app;
				}
				

				if (callback) {
					//log("Collector.open: callback fired",{level:3});
					doAction(function(){
						callback(params);
					});
				}
			} else {
				log("Collector: Tab or Window is not opening or your browser does not support controlling tabs and windows via scripts. Check your popup blocker.",{level:5});
			}
		}catch(e){log("Collector.open: "+e);}},

		doNext : function(){try{Collector.open(Collector.queue.shift());}catch(e){log("Collector.doNext: "+e);}},

		close : function(tab) {try{
			//recycle or close the passed tab
			try{
				if (opts.recycletabsall || opts.queuetabs || (Collector.recycle.length < opts.recycletabs)) {
					//wipe it and put it away
					
					if (tab.hwnd){
						Collector.recycle.push(tab.hwnd);
						tab.hwnd.location.href="about:blank";
						if (Collector.windowExists(tab.hwnd)){
							tab.hwnd.location.hash="";
						}
					} else {
						//tab is busy, laggy or missing
						tab.closeRetries=(tab.closeRetries||0)+1;
						if (tab.closeRetries<3) {
							setTimeout(function(){Collector.close(tab);},1000);
						} else {
							log("Collector.close: Control of window handle lost; cannot recycle. Window may be too busy to communicate with, or has been closed manually.");
						}
						return;
					}
				} else {
					if (tab.hwnd) tab.hwnd.close();
				}
			} catch (e){log("Collector.close: recycler: "+e);}

			try{
				tab.hwnd=null;
				delete tab.signal;
				delete tab.stage;
				delete tab.closeTries;
			
				if (tab.toIntv) clearInterval(tab.toIntv);
				delete tab; 
				tab=null;
				Collector.count--
			}catch(e){log("Collector.close: destroy tab: "+e);}

			//check for items in queue to do next
			if (Collector.queue.length) {
				//check that queueing is still in practice
				if (opts.queuetabs) {
					setTimeout(Collector.doNext,1000); //just do one
				} else {
					//options have changed since queueing was enacted, release all the queue into windows right now
					var offset=1000;
					while (Collector.queue.length && (Collector.count < opts.maxrequests)) {
						setTimeout(Collector.doNext,offset); //open all, up to the limit set in options
						offset+=100;
					}
				}
			}

		} catch (e){log("Collector.close: "+e);}},

		closeAll : function() {try{
			//first delete the queue so close fx doesnt pick them up
			Collector.queue=[]; //empty but dont destroy

			//then close the active windows, moving any to the recycler if that is enabled
			for (var t in Collector.tabs) {
				Collector.close(Collector.tabs[t]);
			}

			//then close any recycled windows
			if (Collector.recycle.length) {
				for (var r=0, hwnd; r < Collector.recycle.length; r++) {
					if (hwnd=Collector.recycle[r]) {
						hwnd.close();
					}
				}
				Collector.recycle=[];
			}
		} catch (e){log("Collector.closeAll: "+e);}},
		
		createTimer : function(tab) {try{
			//create a timeout handler based on options and store the timer on the tab
			tab.toIntv=setTimeout(function(){
				if (tab) if (tab.stage!=4) doAction(function(){
					//tab has been active too long, do timeout
					log("Collector.timer: request timeout ("+tab.id+")",{level:3});
					main.setAsFailed(null, -14, tab.post);
					main.clearURL(tab);
				})
			},opts.reqtimeout*1000);
		} catch (e){
			log("Collector.createTimer: "+e);}
		},

		cancelProcess : function(params) {try{
			params=params||{};
			var c = Collector;
			
			for (t in c.tabs) {
				if (c.tabs[t] && c.tabs[t][params.search] && c.tabs[t][params.search]==params.find){
					//matching collector tab found
					tab=c.tabs[t];
					
					//close the window
					c.close(tab);
				}
			}
		} catch (e){log("Collector.cancelProcess: "+e);}},
		
		refreshProcess : function(params) {try{
			params=params||{};
			var c = Collector;
			for (t in c.tabs) {
				if (c.tabs[t] && c.tabs[t][params.search] && c.tabs[t][params.search]==params.find){
					//matching collector tab found
					tab=c.tabs[t];
					
					//restart the window at its initial url
					if (tab.hwnd.location.href==tab.url) {
						tab.hwnd.location.reload();
					} else {
						tab.hwnd.location.href=tab.url;
					}
				}
			}
		} catch (e){log("Collector.refreshProcess: "+e);}},

	};

//***************************************************************************************************************************************
//***** Dynamic Grabber Object
//***************************************************************************************************************************************
	var Grabber = {
		tests:[],
		opts:{},

		methods:["msg","fromID","fromName","url","body","html","targetID","targetName","caption","title","desc","comments",
				"commentorID","commentorName","likeName","likeID","link","either","img","canvas"],

		init:function(params){try{
			params=(params||{});
			var testsIn = getOptJSON("dynamics_"+profile) || [];
			var globalsIn = getOptJSON("dynamics_global") || {};
			//import locals and intermix globals we have a placeholder for
			if (isArrayAndNotEmpty(testsIn)) {
				for (var t=0; t<testsIn.length; t++) {
					if (testsIn[t].isGlobal) {
						//make sure the global test still exists
						var glob=globalsIn[testsIn[t].uniqueID]||null;
						if (glob){
							//merge global and local data
							//this retains our expanded/enabled parts
							var merge=mergeJSON(glob, testsIn[t]);
							Grabber.newTest(merge);
							//flag it so we don't import it again below
							glob.alreadyUsed=true;
						} else {
							//global missing, can't import
							log("Grabber.init: Global test missing, cannot merge");
						}
					} else {
						//load from locals
						Grabber.newTest(testsIn[t]);
					}
				}
			}
			//import all globals not already accounted for
			for (var t in globalsIn) {
				var glob=globalsIn[t];
				//avoid already imported globals
				if (!glob.alreadyUsed){
					glob.uniqueID=t;
					glob.isGlobal=true;
					Grabber.newTest(glob);
				}
			}
			
		}catch(e){log("Grabber.init: "+e);}},

		save:function(){try{
			var ret=[];
			var retGlobal={};
			
			if (isArrayAndNotEmpty(Grabber.tests)) {
				for (var t=0, len=Grabber.tests.length; t<len; t++){
					var test=Grabber.tests[t];
					if (!test.isGlobal) {
						//save it locally
						ret.push(test.saveableData);
					} else {
						//make a placeholder locally
						ret.push({isGlobal:true, uniqueID:test.uniqueID, enabled:test.enabled, expanded:test.expanded});
						//and save it globally
						var glob=test.saveableData;
						glob.uniqueID=test.uniqueID;
						retGlobal[test.uniqueID]=glob;
					}
				}
			}
			setOptJSON("dynamics_"+profile,ret);
			setOptJSON("dynamics_global",retGlobal);
		}catch(e){log("Grabber.save: "+e);}},

		newTest:function(params){try{
			params=params||{};
			var test = new Test(params);
			Grabber.tests.push(test);
			Grabber.save();
		}catch(e){log("Grabber.newTest: "+e);}},

		importTest:function(){try{
			var params=prompt("Input test data",null);
			if (params) {
				Grabber.newTest(JSON.parse(params));
			}
		}catch(e){log("Grabber.importTest: "+e);}},

		//get the test object with id starting at optional node or at top level
		//may return null
		getTest:function(id,node){try{
			var nodes=(node||Grabber.tests);
			for (var i=0,len=nodes.length;i<len;i++){
				if (nodes[i]["id"]==id) {
					return nodes[i];
				} else if (nodes[i]["kids"]) {
					var ret = Grabber.getTest(id,nodes[i]["kids"]);
					if (ret) return ret;
				}
			}
		}catch(e){log("Grabber.getTest: "+e);}},
	};
	
	//new test object
	var Test = function(params){try{
		this.objType="test";
		var self=this;
		params=params||{};
		
		//defaults
		this.enabled=!(params.disabled||false); //check for WM2 disabled param
		this.expanded=true;
		this.title="";
		this.search=[]; //strings array
		this.find=""; //string
		this.findArray=[]; //string array
		this.kids=[]; //test array
		this.subTests=[]; //strings array
		this.parent=null;
		this.appID="";
		this.ret="dynamic";
		this._findMode="basic";
		this.subNumRange={low:0,high:0};
		this._isGlobal=false;
		
		this.__defineGetter__("saveableData",function(){try{
			var dat={};
				
			//dat.id=this.id;
			dat.label=this.title;
			dat.enabled=this.enabled;
			dat.search=this.search;
			dat.find=(this.findMode=="basic")?this.findArray:this.find;
			dat.ret=this.ret;
			dat.expanded=this.expanded;
			if (this.findMode=="subtests") dat.subTests=this.subTests;
			if (this.findMode=="subnumrange") {
				dat.subNumRange=this.subNumRange.low+","+this.subNumRange.high;
			}
			if (this.findMode=="regex") dat.regex=this.regex;
			dat.appID=this.appID;
			dat.kids=[];
			if (isArrayAndNotEmpty(this.kids)) for (var i=0,kid;(kid=this.kids[i]);i++) {
				dat.kids.push(kid.saveableData);
			}
			return dat;
		}catch(e){log("Test.saveableData: "+e);}});
		
		//set/get wether this test is saved as global or profile
		this.__defineGetter__("isGlobal",function(){try{
			return this._isGlobal;
		}catch(e){log("Test.isGlobal: "+e);}});
		this.__defineSetter__("isGlobal",function(v){try{
			//only top level tests can be global
			if (this.parent) {
				confirm("Only top level tests can be set to global.");
				return;
			} 
			
			if (!v) {
				if (!confirm("Disabling profile sharing on this test will prevent other users on this machine from loading it. Are you sure you wish to make this test locally available only?")) return;
			}
		
			this._isGlobal=v;
			
			//make sure we have a uniqueID
			//but don't destroy one that already exists
			if (v && !exists(this.uniqueID)) this.uniqueID = unique();
			
			//change the color/icon of the isGlobal button
			if (this.toggleGlobalButton) {
				var s=opts.littleButtonSize;
				with (this.toggleGlobalButton) className=className.swapWordB(v,"removeGlobal"+s,"addGlobal"+s);
				with (this.toggleGlobalButton.parentNode) {
					className=className.swapWordB(v,"oddOrange","oddGreen");
					title=(v)?"Disable Profile Sharing":"Share With Other Profiles";
				}
			}
		}catch(e){log("Test.isGlobal: "+e);}});
		
		//use passed params
		for (var p in params) {
			//omit specific params
			if (!(["subNumRange","kids","disabled","label","find"].inArray(p)) ) {
				//copy only params that make it past the checker
				this[p]=params[p];
			}
		}
		
		//calculate subNumRange as an object
		if (exists(params.subNumRange)) {
			var p=params.subNumRange.split(",");
			this.subNumRange={low:p[0]||0, high:p[1]||0};
			this._findMode="subnumrange";
		}
		
		//get the title from the label field
		if (exists(params.label)) this.title=params.label;
		
		//detect which findMode we are using
		//subNumRange was already inspected above
		if (this.regex) this._findMode="regex";
		else if (exists(params.subTests)) this._findMode="subtests";
		//and we default to "basic" already
		
		//import the find field now
		if (isArray(params.find)) this.findArray=params.find;
		else this.find=params.find;
				
		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			Grabber.save();
		}catch(e){log("Test.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			Grabber.save();
		}catch(e){log("Test.disable: "+e);}};

		this.remove=function(noConfirm){try{
			var ask=opts.dynamicConfirmDeleteTest;
			if (noConfirm || (this.isGlobal && confirm("This test is shared with other profiles. Deleting it here will prevent it from loading for other users. Are you sure you wish to delete this test and its children.")) || !ask || (!this.isGlobal && ask && confirm("Delete test and all of its child nodes?"))){
				//remove my data
				var parentContainer=(this.parent)?this.parent.kids:Grabber.tests;
				parentContainer.removeByValue(this);
				//remove my node
				remove(this.node);
				
				doAction(Grabber.save);
			}
		}catch(e){log("Test.remove: "+e);}};

		this.moveUp=function(){try{
			//where is this
			var parentContainer=(this.parent)?this.parent.kids:Grabber.tests;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					Grabber.save();
				}
			}
		}catch(e){log("Test.moveUp: "+e);}};
		
		this.moveDown=function(){try{
			//where is this
			var parentContainer=(this.parent)?this.parent.kids:Grabber.tests;
			//only affects items not already the last in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					Grabber.save();
				}
			}
		}catch(e){log("Test.moveDown: "+e);}};

		this.moveUpLevel=function(){try{
			if (this.parent) {
				//this is not a top level node, so we can move it
				var targetContainer=((this.parent.parent)?this.parent.parent.kids:Grabber.tests);
				//remove from parent
				this.parent.kids.removeByValue(this);
				//set new parent
				this.parent=(this.parent.parent||null); //never point to the top level
				//move the object
				targetContainer.push(this);
				//move the node
				if (this.parent) this.parent.kidsNode.appendChild(this.node);
				else wmConsole.dynamicBuild.appendChild(this.node);
				
				//save it
				Grabber.save();
			}
		}catch(e){log("Test.moveUpLevel: "+e);}};
		
		this.moveDownLevel=function(){try{
			//where is this
			var parentContainer=(this.parent)?this.parent.kids:Grabber.tests;
			//create a new rule at my level
			var newTest = new Test({
				parent:this.parent||null,
			});
			parentContainer.push(newTest);
			//remove me from my current parent
			parentContainer.removeByValue(this);
			//attach me to my new parent
			this.parent=newTest;
			newTest.kids.push(this);
			//move my node
			newTest.kidsNode.appendChild(this.node);
			//save it
			Grabber.save();
		}catch(e){log("Test.moveDownLevel: "+e);}};
		
		this.clone=function(){try{
			var cloneTest=this.saveableData;
			//global clones are not global
			if (this.parent) this.parent.addChild(cloneTest);
			else Grabber.newTest(cloneTest);
		}catch(e){log("Test.clone: "+e);}};

		this.addChild=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			var test=new Test(p);
			this.kids.push(test);
			if (isNew) Grabber.save();
		}catch(e){log("Test.addChild: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			Grabber.save();
		}catch(e){log("Test.toggleContent: "+e);}};
		
		this.populateBonusList=function(){try{
			var node=this.bonusNode;
			var bonuses={};
			//get the list of accept texts for this app
			if (this.appID!="") {
				if (this.appID=="*") {
					//populate list with bonuses from ALL docked sidekicks
				} else {
					//make sure the app is ready
					//if it has not yet docked, it wont be
					var app=apps[this.appID];
					bonuses = (app?(mergeJSON(app.accText,app.userDefinedTypes)||{}):{});
				}
			}			
			//add special return values
			bonuses["dynamic"]="* Dynamic grab";
			bonuses["none"]="* None";
			bonuses["wishlist"]="* Flaged as Wishlist";
			bonuses["exclude"]="* Excluded types";
			bonuses["send"]="* Send Unknown";
			bonuses["doUnknown"]="* Get Unknown";
			bonuses["{%1}"]="* Subtest Value";

			//sort by display text
			bonuses=sortCollection(bonuses,"value");
			
			//add each element to the dropdown
			var elem;
			node.innerHTML=""; //wipe previous list
			for (var i in bonuses) {
				var showI=i.removePrefix(this.appID);
				node.appendChild(
					elem=createElement("option",{textContent:((bonuses[i].startsWith("*"))?"":((showI.startsWith("send"))?"Send ":"Get "))+bonuses[i], value:i, selected:(this.ret==i)})
				);
			}

		}catch(e){log("Test.populateBonusList: "+e);}};
		
		this.populateAppList=function(){try{
			var node=this.appListNode;
			var a={};
			for (var i in apps){
				a[apps[i].appID]=apps[i].name;
			}

			//add special return values
			a["*"]="* All";

			//add each element to the dropdown
			var elem;
			node.innerHTML=""; //wipe previous list
			for (var i in a) {
				node.appendChild(elem=createElement("option",{textContent:a[i], value:i,selected:(this.appID==i)}));
			}

			//sort it
			elementSortChildren(node,"textContent");
		}catch(e){log("Test.populateAppList: "+e);}};

		this.calcSearch=function(){try{
			//collect the checked search fields in their listed order
			if (self.searchNode) {
				self.search=[];
				forNodes(".//input[(@type='checkbox')]",{node:self.searchNode},function(e){
					if (e && e.checked){
						self.search.push(e.value);
						log(e.value);
					}
				});
			}
			Grabber.save();
		}catch(e){log("Test.calcSearch: "+e);}};
		
		this.convertToRule=function(p){try{
			var rule;
			Priority.rules.push( 
				rule=new Rule( Priority.ruleFromTest( this.saveableData ) ) 
			);
			if (opts.rulesJumpToNewRule){
				//jump to rule view
				wmConsole.tabContainer.selectTab(3);
				//scroll to new rule
				rule.node.scrollIntoView();
			}
		}catch(e){log("Test.convertToRule: "+e);}};		
		
		//set/get find field modes
		this.__defineGetter__("findMode",function(){try{
			return this._findMode;
		}catch(e){log("Test.findMode: "+e);}});
		this.__defineSetter__("findMode",function(v){try{
			var lastV = this._findMode;
			this._findMode=v;
			if (lastV==v) return; //no change
			
			//enable disable regex type
			this.regex=(v=="regex" || v=="regexp");
			
			//switch to array/string find field type
			//this.setFindType((v=="basic")?"array":"string");
			
			//show the correct find field
			if (this.findNode) this.findNode.value=((v=="basic")?this.findArray.join("\n"):this.find);

			//show/hide the subtests box
			if (this.subTestsBoxNode) with (this.subTestsBoxNode) className=className.toggleWordB((v!="subtests"),"hidden");
			
			//show/hide the subnumrange picker
			if (this.subNumRangeBoxNode) with (this.subNumRangeBoxNode) className=className.toggleWordB((v!="subnumrange"),"hidden");
			
			Grabber.save();

		}catch(e){log("Test.findMode: "+e);}});

		//draw it
		try{(((this.parent)?this.parent.kidsNode:null)||$("wmDynamicBuilder")).appendChild(
			this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
				createElement("div",{className:"line"},[
					createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
						this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+opts.littleButtonSize:"treeExpand"+opts.littleButtonSize)}),
					]),
					this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
						self.enabled=this.checked;
						with (self.node) className=className.toggleWordB(!this.checked,"disabled");
						Grabber.save();
					}}),
					createElement("label",{textContent:"Title:"}),
					this.titleNode=createElement("input",{value:(this.title||""), onchange:function(){self.title=this.value; Grabber.save();}}),
					
					//toolbox
					createElement("div",{className:"littleButton oddOrange", title:"Remove Test"},[
						createElement("img",{className:"resourceIcon trash"+opts.littleButtonSize,onclick:function(){self.remove();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Clone Test"},[
						createElement("img",{className:"resourceIcon clone"+opts.littleButtonSize,onclick:function(){self.clone();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
						createElement("img",{className:"resourceIcon arrowUp"+opts.littleButtonSize,onclick:function(){self.moveUp();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
						createElement("img",{className:"resourceIcon arrowDown"+opts.littleButtonSize,onclick:function(){self.moveDown();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up Level"},[
						createElement("img",{className:"resourceIcon moveUpLevelLeft"+opts.littleButtonSize,onclick:function(){self.moveUpLevel();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down Level"},[
						createElement("img",{className:"resourceIcon moveInLevel"+opts.littleButtonSize,onclick:function(){self.moveDownLevel();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Show Source"},[
						createElement("img",{className:"resourceIcon object"+opts.littleButtonSize,onclick:function(){promptText(JSON.stringify(self.saveableData),true);}})]),

					createElement("div",{className:"indent littleButton oddBlue", title:"Convert To Rule"},[
						createElement("img",{className:"resourceIcon exportGrab"+opts.littleButtonSize,onclick:function(){self.convertToRule();}})]),

					createElement("div",{className:"indent littleButton "+((this.isGlobal)?"oddOrange":"oddGreen"), title:((this.isGlobal)?"Disable Profile Sharing":"Share With Other Profiles")},[
						this.toggleGlobalButton=createElement("img",{className:"resourceIcon "+((this.isGlobal)?"removeGlobal":"addGlobal")+opts.littleButtonSize,onclick:function(){self.isGlobal=!self.isGlobal; Grabber.save();}})]),
				]),
				this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
					//appID
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"appID:"}),
						this.appIDNode=createElement("input",{value:(this.appID||""), onchange:function(){self.appID=this.value;Grabber.save();self.populateBonusList();}}),
						this.appListNode=createElement("select",{onchange:function(){self.appIDNode.value=this.value; self.appID=this.value; Grabber.save(); self.populateBonusList();}}),
						createElement("div",{className:"littleButton oddBlue", title:"Refresh App List"},[
							createElement("img",{className:"resourceIcon refresh"+opts.littleButtonSize,onclick:function(){self.populateAppList();}})]),
					]),
					//return type
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Return Type ('which'):"}),
						this.retNode=createElement("input",{value:(this.ret||"dynamic"), onchange:function(){self.ret=this.value;Grabber.save();}}),
						this.bonusNode=createElement("select",{onchange:function(){self.retNode.value=this.value; self.ret=this.value; Grabber.save();}}),
						createElement("div",{className:"littleButton oddBlue", title:"Refresh Bonus List"},[
							createElement("img",{className:"resourceIcon refresh"+opts.littleButtonSize,onclick:function(){self.populateBonusList();}})]),
					]),
					//search list
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Search In Field(s):",title:"Specify fields in which to look for data. Adjust order as needed."}),
						this.searchNode=createElement("div",{className:"subsection optioncontainer"},(function(){
							var ret=[];
							
							//draw first the methods we have already selected
							if (isArrayAndNotEmpty(self.search)) for (var m=0; m<self.search.length; m++) {
								var s = self.search[m];
								ret.push(createElement("div",{className:"line"},[
									createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
										createElement("img",{className:"resourceIcon nomargin arrowUp16",onclick:function(){elementMoveUp(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
										createElement("img",{className:"resourceIcon nomargin arrowDown16",onclick:function(){elementMoveDown(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddGreen", title:"Move To Top"},[
										createElement("img",{className:"resourceIcon nomargin moveTopLeft16",onclick:function(){elementMoveTop(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move To Bottom"},[
										createElement("img",{className:"resourceIcon nomargin moveBottomLeft16",onclick:function(){elementMoveBottom(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("input",{type:"checkbox",value:s,checked:true,onchange:function(){self.calcSearch();}}),
									createElement("label",{textContent:s,title:postParts[s]}),								
								]));
							}
							
							//draw the remaining items in their normal order
							for (var m=0; m<Grabber.methods.length; m++){
								var s = Grabber.methods[m];
								//prevent duplicates
								if (self.search.inArray(s)) continue;
								ret.push(createElement("div",{className:"line"},[
									createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
										createElement("img",{className:"resourceIcon nomargin arrowUp16",onclick:function(){elementMoveUp(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
										createElement("img",{className:"resourceIcon nomargin arrowDown16",onclick:function(){elementMoveDown(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddGreen", title:"Move To Top"},[
										createElement("img",{className:"resourceIcon nomargin moveTopLeft16",onclick:function(){elementMoveTop(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("div",{className:"littleButton oddOrange", title:"Move To Bottom"},[
										createElement("img",{className:"resourceIcon nomargin moveBottomLeft16",onclick:function(){elementMoveBottom(this.parentNode.parentNode); self.calcSearch();}})
									]),
									createElement("input",{type:"checkbox",value:s,onchange:function(){self.calcSearch();}}),
									createElement("label",{textContent:s,title:postParts[s]}),
								]));
							}
							
							return ret;
						})()),
					]),
					//find mode
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Find Mode:",title:"Choose the mode you will use to find text."}),
						this.findModeNode=createElement("select",{onchange:function(){self.findMode=this.value;}},[
							createElement("option",{selected:(this.findMode=="basic"),value:"basic",textContent:"Basic",title:"Search for a list of words or phrases."}),
							createElement("option",{selected:(this.findMode=="subnumrange"),value:"subnumrange",textContent:"Number Range",title:"Search for a range of numbers using an insertion point '{%1}' in your find parameter."}),
							createElement("option",{selected:(this.findMode=="subtests"),value:"subtests",textContent:"Sub Tests",title:"Search for a list of words or phrases using an insertion point '{%1}' in your find parameter."}),
							createElement("option",{selected:(this.findMode=="regex"),value:"regex",textContent:"Registered Expression",title:"Search for complex phrases using a regular expression."})
						]),
					]),
					//find list
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Find:",title:"One per line (basic mode), or a single regular expression. First match is used, so mind the order."}),
						createElement("div",{className:"subsection"},[
							this.findNode=createElement("textarea",{className:"fit",textContent:((this.findMode=="basic")?this.findArray.join("\n"):this.find), onchange:function(){
								if (self.findMode=="basic") self.findArray=this.value.split("\n");
								else self.find=this.value;
								Grabber.save();
							}}),
						])
					]),
					//subtests list
					this.subTestsBoxNode=createElement("div",{className:("line").toggleWordB(this.findMode!="subtests","hidden")},[
						createElement("label",{textContent:"Subtest Texts:",title:"Provide text replacements for the insertion point. No regular expressions."}),
						createElement("div",{className:"subsection"},[
							this.subTestsNode=createElement("textarea",{className:"fit",textContent:((isArray(this.subTests)?this.subTests.join("\n"):"")||""), onchange:function(){self.subTests=this.value.split("\n"); Grabber.save();}}),
						])
					]),
					//subnumrange picker
					this.subNumRangeBoxNode=createElement("div",{className:("line").toggleWordB(this.findMode!="subnumrange","hidden")},[
						createElement("label",{textContent:"Subtest Number Range:",title:"Provide a start and end range for the insertion point."}),
						this.subNumRangeLowNode=createElement("input",{value:this.subNumRange.low||0, onchange:function(){self.subNumRange.low=this.value; Grabber.save();}}),
						this.subNumRangeHighNode=createElement("input",{value:this.subNumRange.high||0, onchange:function(){self.subNumRange.high=this.value; Grabber.save();}}),
					]),
					//kids subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Child Tests:",title:"Child tests are nested tests which are applied to matching posts at the same time the parent test is applied. Child rules can have different return values that override the parent return value."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addChild();},title:"Add Child"},[
							createElement("img",{className:"resourceIcon plus"+opts.littleButtonSize}),
						]),
						this.kidsNode=createElement("div",{className:"subsection"}),
					]),
				]),
			])
		);}catch(e){log("Test.init.drawTest: "+e);}
		
		//populate my bonus list
		this.populateAppList();
		this.populateBonusList();

		//list the kids for this test
		if (isArrayAndNotEmpty(params.kids)) for (var i=0,kid; (kid=params.kids[i]); i++) {
			this.addChild(kid);
		}
		
		return self;
	}catch(e){log("Test.init: ")+e}};

//***************************************************************************************************************************************
//***** Feed Objects
//***************************************************************************************************************************************
	var FeedManager = {
		feeds : [],
		
		init : function(){
			var feedsIn=(getOptJSON("feeds3_"+profile)||[]);
			var feedsInGlobal=(getOptJSON("feeds3_global")||[]);
			
			if (isArrayAndNotEmpty(feedsIn)) {
				//import feeds from storage
				for (var f=0;f<feedsIn.length;f++){
					feed=feedsIn[f];
					if (!feed.isGlobal){
						FeedManager.feeds.push(new Feed(feed));
					} else {
						var glob=feedsInGlobal[feed.uniqueID]||null;
						if (glob){
							var merge=mergeJSON(glob,feed);
							FeedManager.newFeed(merge);
							glob.alreadyUsed=true;
						} else {
							log("FeedManager.init: Global feed missing, cannot merge");
						}
					}
				}
			} else {
				//never been used before, create base feeds
				FeedManager.feeds.push(new Feed({title:"My Home Feed", url:"https://graph.facebook.com/me/home", isRemoveable:false}));
				FeedManager.feeds.push(new Feed({title:"My Profile Wall", url:"https://graph.facebook.com/me/feed", isRemoveable:false}));
				
				//import oldstyle feeds
				var feedsOld=getOpt("feeds_"+profile);
				if (feedsOld){
					feedsOld=feedsOld.split("\n");
					if (isArrayAndNotEmpty(feedsOld)) for (var f=0;f<feedsOld.length;f++) {
						//prevent empties
						if (feedsOld[f]) {
							//create the new feed
							FeedManager.newFeed({id:feedsOld[f],title:feedsOld[f]});
						}
					}
				}
				FeedManager.save();
			}
			//import all global feeds not already accounted for
			for (var t in feedsInGlobal) {
				var glob=feedsInGlobal[t];
				if (!glob.alreadyUsed){
					glob.uniqueID=t;
					glob.isGlobal=true;
					FeedManager.newFeed(glob); //newFeed adds app filters, where New Feed() does not
				}
			}
		},
		
		newFeed : function(params){
			params=params||{};
			var feed = new Feed(params);
			FeedManager.feeds.push(feed);
			
			//add filters for each app available
			for (var a in apps){
				feed.addFilter({id:"app_"+a});
			}
		},
		
		save :function(){
			var retFeeds=[];
			var retGlobal={};
			
			if (isArrayAndNotEmpty(FeedManager.feeds)) for (var f=0,len=FeedManager.feeds.length; f<len; f++){
				var feed=FeedManager.feeds[f];
				if (!feed.isGlobal) {
					retFeeds.push(feed.saveableData);
				} else {
					retFeeds.push({isGlobal:true, uniqueID:feed.uniqueID, enabled:feed.enabled, expanded:feed.expanded});
					var glob=feed.saveableData;
					glob.uniqueID=feed.uniqueID;
					retGlobal[feed.uniqueID]=glob;
				}
			}
			setOptJSON("feeds3_"+profile,retFeeds);
			setOptJSON("feeds3_global",retGlobal);
		},
		
	};

	var FeedFilter = function(params){try{
		this.objType="feedFilter";
		params=params||{};
		var self=this;
		
		//set defaults
		this.enabled=true;
		this.expanded=true;
		this._olderLimitReached=false;
		this.next=""; //older edge timestamp
		this.prev=""; //newer edge timestamp
		
		//use passed params
		for (var p in params) this[p]=params[p];

		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			FeedManager.save();
		}catch(e){log("FeedFilter.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			FeedManager.save();
		}catch(e){log("FeedFilter.disable: "+e);}};

		this.toggle=function(){try{
			this.enabled=this.toggleNode.checked;
			this.node.className=this.node.className.swapWordB(this.enabled,"enabled","disabled");
			FeedManager.save();
		}catch(e){log("FeedFilter.toggle: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			FeedManager.save();
		}catch(e){log("FeedFilter.toggleContent: "+e);}};
		
		//remove this
		this.remove=function(){try{
			if (this.node) remove(this.node);
			if (this.parent) delete this.parent.filters[this.id];
			FeedManager.save();
		}catch(e){log("FeedFilter.remove: "+e);}};
		
		//fetch posts for this
		this.fetchNewer=function(){try{
			main.fetch({
				prev:true,
				apps:apps[this.appID],
				feeds:this.parent,
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
				bypassFilterDisabled:true,
			});
		}catch(e){log("FeedFilter.fetchNewer: "+e);}};

		this.fetchOlder=function(){try{
			main.fetch({
				next:true,
				apps:apps[this.appID],
				feeds:this.parent,
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
				bypassFilterDisabled:true,
			});
		}catch(e){log("FeedFilter.fetchOlder: "+e);}};
		
		this.__defineGetter__("olderLimitReached",function(){try{
			return this._olderLimitReached;
		}catch(e){log("FeedFilter.olderLimitReached: "+e);}});
		this.__defineSetter__("olderLimitReached",function(v){try{
			this._olderLimitReached=v;
			//update the sidekick page button graphics
			var node=this.olderLimitNode;
			if (node) node.textContent=v;
			if (v) {
				Priority.doEvent("onFeedFilterOlderLimitReached",this);
			}
		}catch(e){log("FeedFilter.olderLimitReached: "+e);}});

		this.__defineGetter__("appID",function(){try{
			//this assumes its an app filter because so far thats all we use
			return this.id.removePrefix("app_");
		}catch(e){log("FeedFilter.appID: "+e);}});

		this.__defineGetter__("appName",function(){try{
			//this assumes its an app filter because so far thats all we use
			//it also assumes app objects are global, which they are
			//but that they are also available and already filled in by the sidekick, which they may not be
			var a = apps[this.appID];
			if (a!=undefined) {
				//debug.print([this.appID,a]);
				return a.name;
			}
			return "";
		}catch(e){log("FeedFilter.appName: "+e);}});
		
		//draw it
		try{
			if (this.parent.filtersNode) this.parent.filtersNode.appendChild(
				this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+opts.littleButtonSize:"treeExpand"+opts.littleButtonSize)}),
						]),
						this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
							self.enabled=this.checked;
							with (self.node) className=className.toggleWordB(!this.checked,"disabled");
							FeedManager.save();
						}}),
						createElement("span",{textContent:this.appName + " (" + this.id + ")"}),
						
						//toolbox
						createElement("div",{className:"littleButton oddBlue", title:"Fetch Newer"},[
							this.fetchNewerButton=createElement("img",{className:"resourceIcon rssUpRight"+opts.littleButtonSize,onclick:function(){self.fetchNewer();} })
						]),
						createElement("div",{className:"littleButton", title:"Fetch Older"},[
							this.fetchOlderButton=createElement("img",{className:"resourceIcon rssDownLeft"+opts.littleButtonSize,onclick:function(){self.fetchOlder();} })
						]),
					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Older Limit Reached: ",title:"Reports if this filter has reached the user defined oldest post limit."}),
							this.olderLimitNode=createElement("span",{textContent:this.olderLimitReached}),
						]),
					]),
				])
			);
		}catch(e){log("FeedFilter.init:addManagerElement: "+e);};				
		
		return self;
	}catch(e){log("FeedFilter.init: "+e);}};

	var Feed = function(params){try{
		this.objType="feed";
		params=params||{};
		var self=this;

		//set defaults
		this.enabled=true;
		this.expanded=true;
		this.url="";
		this.id="";
		this.filters={};
		this.isRemoveable=true; //set to false on own feeds
		this.title="New Feed";
		this._isGlobal=false;

		//use passed params
		var newFilters=params.filters||{};
		delete params.filters;

		this.__defineGetter__("isGlobal",function(){try{
			return this._isGlobal;
		}catch(e){log("Feed.isGlobal: "+e);}});
		this.__defineSetter__("isGlobal",function(v){try{			
			if (!v) {
				if (!confirm("Disabling profile sharing on this feed will prevent other users on this machine from loading it. Are you sure you wish to make this feed locally available only?")) return;
			}
		
			this._isGlobal=v;
			
			//make sure we have a uniqueID
			//but don't destroy one that already exists
			if (v && !exists(this.uniqueID)) this.uniqueID = unique();
			
			//change the color/icon of the isGlobal button
			if (this.toggleGlobalButton) {
				var s=opts.littleButtonSize;
				with (this.toggleGlobalButton) className=className.swapWordB(v,"removeGlobal"+s,"addGlobal"+s);
				with (this.toggleGlobalButton.parentNode) {
					className=className.swapWordB(v,"oddOrange","oddGreen");
					title=(v)?"Disable Profile Sharing":"Share With Other Profiles";
				}
			}
		}catch(e){log("Feed.isGlobal: "+e);}});
		
		this.__defineGetter__("saveableData",function(){try{
			var ret={};
			
			ret.title=this.title;
			ret.enabled=this.enabled;
			ret.expanded=this.expanded;
			ret.isRemoveable=this.isRemoveable;
			ret.url=this.url;
			if (this.isRemoveable) ret.id=this.id;
			
			//capture filters
			ret.filters={};
			for (var f in this.filters) {
				ret.filters[f]={
					enabled:this.filters[f].enabled,
					expanded:this.filters[f].expanded,
					id:this.filters[f].id,
				};
			}
			
			return ret;
		}catch(e){log("Feed.saveableData: "+e);}});		
				
		for (var p in params) this[p]=params[p];

		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			FeedManager.save();
		}catch(e){log("Feed.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			FeedManager.save();
		}catch(e){log("Feed.disable: "+e);}};

		this.toggle=function(){try{
			this.enabled=this.toggleNode.checked;
			this.node.className=this.node.className.swapWordB(this.enabled,"enabled","disabled");
			FeedManager.save();
		}catch(e){log("Feed.toggle: "+e);}};

		//create a filter for a specific app
		//filter id must be "app_"+appID
		//will not add duplicates
		this.addFilter=function(params){try{
			var isNew=!exists(params);
			params=params||{};
			params.parent=this;
			
			//prevent duplicates
			if (!exists(this.filters[params.id])) {
				return (this.filters[params.id]=new FeedFilter(params));
				if (isNew) FeedManager.save();
			} else {
				return this.filters[params.id];
			}
		}catch(e){log("Feed.addFilter: "+e);}};	

		//remove this
		this.remove=function(noConfirm){try{
			if (this.isRemoveable) {
				var ask=opts.feedsConfirmDeleteFeed;
				if (noConfirm || (this.isGlobal && confirm("This feed is shared with other profiles. Deleting it here will prevent it from loading for other users. Are you sure you wish to delete this feed and its filters.")) || !ask || (!this.isGlobal && ask && confirm("Delete feed and all of its filters?"))){
					//remove my data
					if (this.node) remove(this.node);
					FeedManager.feeds.removeByValue(this);
					
					FeedManager.save();
				}
			}
		}catch(e){log("Feed.remove: "+e);}};

		//fetch posts for this
		this.fetchNewer=function(){try{
			main.fetch({
				prev:true,
				feeds:this,
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
			});
		}catch(e){log("Feed.fetchNewer: "+e);}};

		this.fetchOlder=function(){try{
			main.fetch({
				next:true,
				feeds:this,
				bypassPause:true,
				bypassAppDisabled:true,
				bypassFeedDisabled:true,
			});
		}catch(e){log("Feed.fetchOlder: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			FeedManager.save();
		}catch(e){log("Feed.toggleContent: "+e);}};

		if (this.id && !this.url) this.url="https://graph.facebook.com/"+this.id+"/feed";
		
		//draw it
		try{
			wmConsole.feedManagerNode.appendChild(
				this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+opts.littleButtonSize:"treeExpand"+opts.littleButtonSize)}),
						]),
						this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
							self.enabled=this.checked; 
							with (self.node) className=className.toggleWordB(!this.checked,"disabled");
							FeedManager.save();
						}}),
						this.titleNode=createElement("input",{value:(this.title||""), onchange:function(){self.title=this.value; FeedManager.save();}}),
						
						//toolbox
						createElement("div",{className:"littleButton oddBlue", title:"Fetch Newer"},[
							this.fetchNewerButton=createElement("img",{className:"resourceIcon rssUpRight"+opts.littleButtonSize,onclick:function(){self.fetchNewer();} })
						]),
						createElement("div",{className:"littleButton", title:"Fetch Older"},[
							this.fetchOlderButton=createElement("img",{className:"resourceIcon rssDownLeft"+opts.littleButtonSize,onclick:function(){self.fetchOlder();} })
						]),
						(this.isRemoveable)?createElement("div",{className:"littleButton oddOrange", title:"Remove Feed"},[
							this.removeButtonNode=createElement("img",{className:"resourceIcon trash"+opts.littleButtonSize,onclick:function(){self.remove();} })
						]):null,
						
						(this.isRemoveable)?createElement("div",{className:"indent littleButton "+((this.isGlobal)?"oddOrange":"oddGreen"), title:((this.isGlobal)?"Disable Profile Sharing":"Share With Other Profiles")},[
							this.toggleGlobalButton=createElement("img",{className:"resourceIcon "+((this.isGlobal)?"removeGlobal":"addGlobal")+opts.littleButtonSize,onclick:function(){self.isGlobal=!self.isGlobal; FeedManager.save();}})
						]):null,

					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						(this.isRemoveable)?createElement("div",{className:"line"},[
							createElement("label",{textContent:"Target FB Entity: ",title:"The request address from where WM gets posts for this fb entity."}),
							this.idNode=createElement("input",{value:(this.id||""), onchange:function(){
								self.id=this.value;
								self.url="https://graph.facebook.com/"+this.value+"/feed";
								self.urlNode.textContent=self.url;
								FeedManager.save();
							}}),
							createElement("label",{textContent:"URL: ",title:"The request address from where WM gets posts for this fb entity."}),
							this.urlNode=createElement("span",{textContent:this.url}),
						]):null,
						//app filters sub box
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"App Filters: ",title:"This is a list of filters run on this feed by apps you collect for. Only filters for sidekick-supported apps are used."}),
							this.filtersNode=createElement("div",{className:"subsection"}),
						]),
					]),
				])
			);
		}catch(e){log("Feed.init:addManagerElement: "+e);};		
		
		//add any passed filters
		for (var f in newFilters){
			this.addFilter(newFilters[f]);
		}
		
		return self;
	}catch(e){log("Feed.init: "+e);}};
	
//***************************************************************************************************************************************
//***** Friend Objects
//***************************************************************************************************************************************
	var FriendTracker = {
		friends: {},
		
		init : function(){
			//import friends tracker data
			var friendsIn=getOptJSON('friends_'+profile)||[];
			if (isArrayAndNotEmpty(friendsIn)) for (var f=0,len=friendsIn.length;f<len;f++) {
				FriendTracker.newFriend(friendsIn[f],true);
			}
			FriendTracker.sort();
		},
		
		clean : function(){
			//clean friend tracker data
			var len=0;
			if (opts.useFriendTracker && (len=FriendTracker.friends.length)) {
				var ageDays=opts.trackDays*day;
				var timeNow=timeStamp();
				for (var f=0; f<len; f++){
					var friend=FriendTracker.friends[f];
					if (friend.data && friend.data.posts){
						for (var p in friend.data.posts){
							var post=friend.data.posts[p];
							if ((timeNow-(post.date*1000)) > ageDays) {
								delete friend.data.posts[p];
							}
						}
					}
				}
			}
		},
		
		clearAll : function(noConfirm){
			var ask=opts.trackConfirmClearUser;
			if (noConfirm || !ask || (ask && confirm("Clear tracker history for all users?"))){
				for (var f in FriendTracker.friends){
					FriendTracker.friends[f].remove(true);
				}
			}			
		},
		
		newFriend : function(params,preventSort){
			params=params||{};
			var friend = new Friend(params);
			FriendTracker.friends[friend.id]=friend;
			if (!preventSort) FriendTracker.sort();
			return friend;
		},

		save :function(){
			var ret=[];
			for (var f in FriendTracker.friends){
				ret.push(FriendTracker.friends[f].saveableData);
			}
			setOptJSON("friends_"+profile,ret);
		},
		
		sort : function(params){
			params=params||{};
			
			if (exists(params.sortBy)) quickOpts.sortFriendsBy=params.sortBy;
			if (exists(params.sortOrder)) quickOpts.sortFriendsOrder=params.sortOrder;
			main.saveQuickOpts();

			var sortBy=params.sortBy||quickOpts.sortFriendsBy||"name"
			var sortOrder=params.sortOrd||quickOpts.sortFriendsOrder||"asc"
			
			var friendArray=[];
			for (var f in FriendTracker.friends) {
				friend=FriendTracker.friends[f];
				friendArray.push({id:friend[sortBy],node:friend.node});
			}
			
			if (["asc","ascending"].inArray(sortOrder)) friendArray.sort(function(a,b){return a.id>b.id;});
			else if (["desc","descending"].inArray(sortOrder)) friendArray.sort(function(a,b){return a.id<b.id;});
			
			for (var f=0,len=friendArray.length; f<len; f++) {
				wmConsole.friendBuild.appendChild(friendArray[f].node);
			}
		},
		
		track : function(post){
			//dont track stuff older than our older tracking limit
			var limit=opts.trackTime*day;
			if ( ( timeStamp()-(post.date*1000) ) < limit ) {
				//get/create the friend record
				var friend=FriendTracker.friends[post.fromID]||null;
				if (!friend) {
					friend=FriendTracker.newFriend({id:post.fromID,name:post.fromNameLastFirst});
				}
				//check if this is newer than last known post
				if (opts.trackLastKnownPost) {
					var data;
					if (data=friend.lastKnownPost) {
						if (data.date<post.date){
							data.date=post.date;
							//data.id=post.id.removePrefix(post.fromID+"_");
						}
					} else {
						friend.data.lastKnownPost={date:post.date};
					}
				}
				//add it to history
				if (opts.trackCreated){
					var data={date:post.date};
					if (opts.trackFailed){
						data.failed=(post.status<0 && post.status !=-4 && post.status !=-6);
					}
					if (opts.trackAccepted){
						data.accepted=(post.status>0 || post.status ==-4 || post.status ==-6);
					}
					friend.data.posts[post.id.removePrefix(post.fromID+"_")]=data;
				}
				//save it
				friend.updateStats();
				FriendTracker.save();
				
				//push events
				Priority.doEvent("onFriendDataChanged",friend);
			}
		},
		
		trackStatus : function(post,acceptOrFail){
			var friend=FriendTracker.friends[post.fromID]||null;
			if (friend) {
				var data=friend.data.posts[post.id]||null;
				if (data){
					if (acceptOrFail) {
						data.accepted=true;
						delete data.failed;
					} else {
						data.failed=true;
						delete data.accepted;
					}
					friend.updateStats();
					Priority.doEvent("onFriendDataChanged",friend);
				} else {
					//if post does not exists, we had more errors elsewhere
					//or post id not fit our history range
				}
			} else {
				//if friend does not exist, we had errors elsewhere
				//don't bother fixing it here
			}
		},
	};

	var Friend = function(params){try{
		this.objType="friend";
		params=params||{};
		var self=this;

		//set defaults
		this.expanded=false;
		this.id="";
		this.name="";
		
		this.data={
			lastKnownPost:{date:0},
			posts:{},
		};

		this.__defineGetter__("saveableData",function(){try{
			var ret={};
			
			ret.id=this.id;
			ret.name=this.name;
			ret.enabled=this.enabled;
			ret.expanded=this.expanded;
			
			//capture posts data
			ret.data=this.data;
			
			return ret;
		}catch(e){log("Friend.saveableData: "+e);}});		
						
		for (var p in params) this[p]=params[p];

		//remove this
		this.remove=function(noConfirm){try{
			var ask=opts.trackConfirmClearUser;
			if (noConfirm || !ask || (ask && confirm("Clear history for this user?"))){
				//remove my data
				if (this.node) remove(this.node);
				delete FriendTracker.friends[this.id];					
				FriendTracker.save();
			}
		}catch(e){log("Friend.remove: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			FriendTracker.save();
		}catch(e){log("Friend.toggleContent: "+e);}};
		
		this.addToFeeds=function(){try{
			FeedManager.newFeed({id:this.id, title:this.name});
			FeedManager.save();
		}catch(e){log("Friend.addToFeeds: "+e);}};
		
		this.countAccepted=function(){try{
			var c=0;
			if (this.data.posts) for (var p in this.data.posts) {
				var post=this.data.posts[p];
				if (post.accepted) c++;
			}
			return c;
		}catch(e){log("Friend.countAccepted: "+e);}};

		this.countFailed=function(){try{
			var c=0;
			if (this.data.posts) for (var p in this.data.posts) {
				var post=this.data.posts[p];
				if (post.failed) c++;
			}
			return c;
		}catch(e){log("Friend.countFailed: "+e);}};

		this.countCreated=function(){try{
			var c=0;
			if (this.data.posts) for (var p in this.data.posts) {
				c++
			}
			return c;
		}catch(e){log("Friend.countFailed: "+e);}};

		this.__defineGetter__("lastKnownPost",function(){try{
			if (this.data && (this.data.lastKnownPost||null)){
				return this.data.lastKnownPost;
			}
			return {id:null,date:0};
		}catch(e){log("Friend.lastKnownPost: "+e);}});
		this.__defineGetter__("lastKnownPostDate",function(){try{
			if (this.data && (this.data.lastKnownPost||null)){
				return this.data.lastKnownPost.date;
			}
			return 0;
		}catch(e){log("Friend.lastKnownPostDate: "+e);}});
		this.__defineGetter__("acceptCount",function(){try{
			return this.countAccepted();
		}catch(e){log("Friend.acceptCount: "+e);}});
		this.__defineGetter__("failCount",function(){try{
			return this.countFailed();
		}catch(e){log("Friend.failCount: "+e);}});
		this.__defineGetter__("postCount",function(){try{
			return this.countCreated();
		}catch(e){log("Friend.postCount: "+e);}});
		this.__defineGetter__("totalCount",function(){try{
			return this.failCount+this.acceptCount;
		}catch(e){log("Friend.totalCount: "+e);}});
		
		this.updateStats=function(){try{
			var n=this.statsNode;
			if (n) {
				if (opts.trackLastKnownPost){
					d=new Date((this.lastKnownPost.date||0)*1000).toLocaleString();
					if (!this.lastPostNode) {
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Last Known Post Date: "}),
							this.lastPostNode=createElement("span",{textContent:d})
						]));
					} else {
						this.lastPostNode.textContent=d;
					}
				}

				if (opts.trackCreated){
					if (!this.countCreatedNode) {
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Posts Created: "}),
							this.countCreatedNode=createElement("span",{textContent:this.countCreated()})
						]));
					} else {
						this.countCreatedNode.textContent=this.countCreated();
					}
				}
				
				if (opts.trackAccepted){
					if (!this.countAcceptedNode){
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Posts Accepted: "}),
							this.countAcceptedNode=createElement("span",{textContent:this.countAccepted()})
						]));
					} else {
						this.countAcceptedNode.textContent=this.countAccepted();
					}
				}
				
				if (opts.trackFailed){
					if (!this.countFailedNode){
						n.appendChild(createElement("div",{className:"line"},[
							createElement("label",{textContent:"Posts Failed: "}),
							this.countFailedNode=createElement("span",{textContent:this.countFailed()})
						]));
					} else {
						this.countFailedNode.textContent=this.countFailed();
					}
				}
			}
		}catch(e){log("Friend.updateStats: "+e);}};
		
		//draw it
		try{
			wmConsole.friendBuild.appendChild(
				this.node=createElement("div",{className:"listItem"},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+opts.littleButtonSize:"treeExpand"+opts.littleButtonSize)}),
						]),
						this.titleNode=createElement("input",{value:(this.name||""), onchange:function(){self.name=this.value; FriendTracker.save();}}),
						
						//toolbox
						createElement("div",{className:"littleButton", title:"Add To Feeds"},[
							createElement("img",{className:"resourceIcon addFeed"+opts.littleButtonSize,onclick:function(){self.addToFeeds();} })
						]),
						createElement("div",{className:"littleButton oddOrange", title:"Clear Data"},[
							createElement("img",{className:"resourceIcon trash"+opts.littleButtonSize,onclick:function(){self.remove();} })
						]),
						createElement("div",{onclick:function(){window.open("http://www.facebook.com/profile.php?id="+self.id,"_blank");},title:"Visit Wall",className:"littleButton oddBlue"},[
							createElement("img",{className:"resourceIcon openInNewWindow"+opts.littleButtonSize})
						]),
					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"ID: ",title:"The facebook id of this user."}),
							createElement("span",{textContent:self.id}),
						]),
						//post data sub box
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Statistics: ",title:"Statistics you selected to track."}),
							this.statsNode=createElement("div",{className:"subsection"}),
						]),
					]),
				])
			);
		}catch(e){log("Friend.init:addManagerElement: "+e);};	

		this.updateStats();
		
		return self;
	}catch(e){log("Friend.init: "+e);}};
	
//***************************************************************************************************************************************
//***** Priority/Rule Object
//***************************************************************************************************************************************
	var Priority = {
	
		opts:{},
		
		rules:[],

		init:function(params){try{
			params=(params||{});
			
			// build a kidsNode getter
			Priority.__defineGetter__("kidsNode",function(){try{
				return $("wmPriorityBuilder");
			}catch(e){log("Priority.kidsNode: "+e);}});

			//import rules
			Priority.rules=[];
			var rulesIn=getOptJSON("priority3_"+profile)||{};
			var globalsIn=getOptJSON("priority3_global")||{};
			
			//detect early beta rule lists
			if (isObject(rulesIn)) for (var i in rulesIn){
				var rule=rulesIn[i];
				Priority.rules.push( new Rule(rule) );
				//don't bother with globals here
				
			//or use current version rule arrays
			} else if (isArrayAndNotEmpty(rulesIn)) for (var i=0,rule;(rule=rulesIn[i]);i++) {
				if (rule.isGlobal) {
					var glob=globalsIn[rule.uniqueID]||null;
					if (glob){
						var merge=mergeJSON(glob,rule);
						Priority.rules.push( new Rule(merge) );
						glob.alreadyUsed=true;
					} else {
						log("Priority.init: Global rule missing, cannot merge");
					}
				} else {
					Priority.rules.push( new Rule(rule) );
				}
				
			}
			
			//import all globals not already accounted for
			for (var t in globalsIn) {
				var glob=globalsIn[t];
				//avoid already imported globals
				if (!glob.alreadyUsed){
					glob.uniqueID=t;
					glob.isGlobal=true;
					Priority.rule.push( new Rule(glob) );
				}
			}
			
			
		}catch(e){log("Priority.init: "+e);}},
		
		//check to see if any rules match the post object
		doEvent:function(event,obj){
			//log("Priority.doEvent: event="+event+", post="+post.id);
			for (var r=0,rule;(rule=Priority.rules[r]);r++){
				if (rule.enabled) (function(){rule.doEvent(event,obj);})();
			}
		},
		
		//convert a test (such as dynamic grab entry) to a rule
		ruleFromTest:function(test){
			//[{"id":"_h6qil21n","label":"new test","search":["body"],"find":["nothing"],"ret":"dynamic","kids":[{"id":"_h6qiw4zf","find":[]}],"appID":"102452128776","disabled":true}]
			//[{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[{"search":["body"],"operand":"lessThan","find":"chipmunk"}],"actions":[{"event":"onIdentify","action":"setColor","params":"orange"}],"kids":[{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]},{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]}],"eggs":[{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]},{"enabled":true,"limit":0,"limitCount":0,"expanded":true,"validators":[],"actions":[],"kids":[],"eggs":[]}]}]
			var ret={
				title:(test.label||test.title)||"Converted Dynamic Test",
				enabled:!(test.disabled||false),
				limit:0,
				limitCount:0,
				expanded:true,
				validators:function(){
					var ret=[];
					//add the initial validator
					ret.push({
						search:["appID"],
						operand:"equals",
						find:test.appID
					});
					//detect search/find method
					var method="basic";
					if (isArrayAndNotEmpty(test.subTests) && test.find.contains("{%1}")) method="subTests";
					if (exists(test.subNumRange) && test.find.contains("{%1}")) method="subNumRange";
					if (test.regex==true) method="regexp";
					if (method=="regexp") {
						//leave the expression just as it is
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:test.find,
						});
					} else if (method=="basic") {
						//convert the test.find array into a regular espression
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:arrayToRegExp(test.find),
						});
					} else if (method=="subTests") {
						//insert the subTests into the find insertion point as a regular expression
						//but make the rest of the find parameter not return if found
						var find=test.find;
						if (find.contains("{%1}")){
							find=find.split("{%1}");
							find=(find[0].length?("(?:"+find[0]+")"):"")+arrayToRegExp(test.subTests)+(find[1].length?("(?:"+find[1]+")"):"");
						}
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:find
						});
					} else if (method=="subNumRange") {
						//insert the subNumRange into the find insertion point as a regular expression
						//but make the rest of the find parameter not return if found
						var numRange=("string"==typeof test.subNumRange)?test.subNumRange.split(","):[test.subNumRange.low,test.subNumRange.high];
						var find=test.find;
						if (find.contains("{%1}")){
							find=find.split("{%1}");
							find=(find[0].length?("(?:"+find[0]+")"):"")+integerRangeToRegExp({min:numRange[0],max:numRange[1]})+(find[1].length?("(?:"+find[1]+")"):"");
						}
						ret.push({
							search:test.search||[],
							operand:"matchRegExp",
							find:find
						});
					}
					return ret;
				}(),
				actions:[
					{
						event:"onIdentify",
						action:"setWhich",
						params:test.ret||"dynamic",
					}
				],
				kids:[],
				eggs:[],				
			};
			
			//convert children
			if (isArrayAndNotEmpty(test.kids)) {
				for (var k=0,kid;(kid=test.kids[k]);k++) {
					ret.kids.push(Priority.ruleFromTest(kid));
				}
			}
			
			return ret;
		},
		
		//create a rule based on a specific post
		ruleFromPost:function(post){
			//create some data to get us started
			var rule={
				basedOn:post,
				title:"Based On: "+post.id,
				enabled:false, //start out not using this rule
				validators:[
					{search:["appID"],find:post.appID,operand:"equals"},
					{search:["title"],find:post.name,operand:"matchRegExp"},
					{search:["caption"],find:post.caption,operand:"matchRegExp"},
					{search:["desc"],find:post.description,operand:"matchRegExp"},
					{search:["link"],find:post.linkText,operand:"matchRegExp"},
				],
				actions:[
					{event:"onIdentify",action:"setWhich",params:"dynamic"}
				]
			};
			Priority.rules.push(rule=new Rule(rule));

			if (opts.rulesJumpToNewRule){
				//jump to rule view
				wmConsole.tabContainer.selectTab(3);
				//scroll to new rule
				rule.node.scrollIntoView();
			}
		},
		
		//copy all dynamics to new rules
		//does not destroy dynamics as they are converted
		convertDynamics:function(){
			var tests=Grabber.tests;
			if (isArrayAndNotEmpty(tests)) {
				for (var t=0,test;(test=tests[t]);t++){
					Priority.rules.push( new Rule( Priority.ruleFromTest(test) ) );
				}
			}
		},

		//rest rule limits for all rules and their children
		resetAllLimits:function(params){
			params=params||{};
			var ask=opts.rulesConfirmResetLimit;
			if (params.noConfirm || !ask || (ask && confirm("Reset Limit Counter?"))) {
				if (isArrayAndNotEmpty(Priority.rules)) for (var r=0,rule;(rule=Priority.rules[r]);r++) {
					rule.resetLimit({preventSave:true,resetChildren:true,noConfirm:true});
				}
				Priority.saveRules();
			}
		},
		
		saveRules : function(){try{
			//pack rule objects
			var retRules=[];
			var retGlobal={};
			
			if (isArrayAndNotEmpty(Priority.rules)) {
				for (var r=0,rule; (rule=Priority.rules[r]);r++){
					if (!rule.isGlobal) {
						retRules.push(rule.saveableData);
					} else {
						//make a placeholder locally
						retRules.push({isGlobal:true, uniqueID:rule.uniqueID, enabled:rule.enabled, expanded:rule.expanded});
						//and save it globally
						var glob=rule.saveableData;
						glob.uniqueID=rule.uniqueID;
						retGlobal[rule.uniqueID]=glob;						
					}
				}
			}
			
			//save rules
			setOptJSON("priority3_"+profile,retRules);
			setOptJSON("priority3_global",retGlobal);
		}catch(e){log("Priority.saveRules: "+e);}},	
		
		showData : function(){try{
			promptText(getOpt("priority3_"+profile),true);
		}catch(e){log("Priority.showData: "+e);}},	

		newRule : function(p){try{
			var rule=new Rule(p);
			Priority.rules.push(rule);
			Priority.saveRules(); 
		}catch(e){log("Priority.newRule: "+e);}},

		importRule: function(){try{
			var params=prompt("Input rule data",null);
			if (params) {
				var convertedInput=JSON.parse(params);
				if (isArray(convertedInput)){
					for (var i=0;i<convertedInput.length;i++){
						Priority.newRule(convertedInput[i]);
					}
				} else {
					Priority.newRule(convertedInput);
				}
			}
		}catch(e){log("Priority.importRule: "+e);}},
	};
	
	var priorityActions = {
		"addToFeeds":{name:"Add Poster To Feeds",toolTip:"Add the post's creator to your feeds manager. Can also be used with onFriend* events."}, 
		"appendLink":{name:"Append To Link",toolTip:"Add specific code to the end of the collection link.",hasParam:true,paramType:"textBox","default":""},
		"birth":{name:"Birth Eggs",toolTip:"Clone the egg children to this rule's level, without destroying this rule."}, 
		"cancelInterval":{name:"Cancel Interval",toolTip:"Destroy the repeating timer on this rule."},
		"cancelTimer":{name:"Cancel Timer",toolTip:"Destroy the timer on this rule."} ,
		"cleanPost":{name:"Clean Post",toolTip:"Remove the calling post from the collector."}, 
		"commentPost":{name:"Comment Post",toolTip:"Create a comment on the calling post.",hasParam:true,paramLabel:"comment",paramType:"string","default":"Thanks!"}, 
		"createInterval":{name:"Create Interval",toolTip:"Create a repeating timer on this rule, where 1000 equals 1 second.",hasParam:true,paramType:"timePicker","default":1000} ,
		"createTimer":{name:"Create Timer",toolTip:"Create a timer on this rule, where 1000 equals 1 second.",hasParam:true,paramType:"timePicker","default":1000},
		"decrementCounter":{name:"Decrement Limit Counter",toolTip:"Decrement the rule limit counter.",hasParam:true,paramType:"number","default":1},
		"decrementParentCounter":{name:"Decrement Parent Limit Counter",toolTip:"Decrement the parent rule limit counter.",hasParam:true,paramType:"number","default":1},
		"destroyRule":{name:"Destroy Rule",toolTip:"Permanently removes this rule and all of its children."},
		"disableApp":{name:"Disable App",toolTip:"Disable the specified app. Leave blank to disable the app associated with the activating post.",hasParam:true,paramType:"textBox","default":""},
		"disableAppOption":{name:"Disable App Option",toolTip:"Disable an option in the related sidekick by internal name.",hasParam:true,paramType:"textBox","default":""},
		"disableAutocomment":{name:"Disable Autocomment",toolTip:"Disable the autocomment feature."},
		"disableAutolike":{name:"Disable Autolike",toolTip:"Disable the autolike feature."},
		"disableChildRules":{name:"Disable Child Rules",toolTip:"Disable the immediate children of this rule. Does not disable this rule."},
		"disableHostOption":{name:"Disable Host Option",toolTip:"Disable an option in the wm host by internal name.",hasParam:true},
		"disableRule":{name:"Disable Rule",toolTip:"Disable the current rule."}, 
		"emergencyOpen":{name:"Emergency Open",toolTip:"Move the calling post directly to a new processing window, no matter what your opened window limit is."}, 
		"emptyAutolikeQueue":{name:"emptyAutolikeQueue",toolTip:"Destroys the list of posts you intended to autolike or autocomment."}, 
		"enableApp":{name:"Enable App",toolTip:"Enable the specified app. Leave blank to enable the app associated with the activating post.",hasParam:true,paramType:"textBox","default":""},
		"enableAppOption":{name:"Enable App Option",toolTip:"Enable an option in the related sidekick by internal name.",hasParam:true,paramType:"textBox","default":""},
		"enableAutocomment":{name:"Enable Autocomment",toolTip:"Enable the autocomment feature."},
		"enableAutolike":{name:"Enable Autolike",toolTip:"Enable the autolike feature."},
		"enableChildRules":{name:"Enable Child Rules",toolTip:"Enable the immediate children of this rule."}, 
		"enableHostOption":{name:"Enable Host Option",toolTip:"Enable an option in the wm host by internal name.",hasParam:true},
		"enableRule":{name:"Enable Rule",toolTip:"Enable the current rule."}, 
		"fetchNewer":{name:"Fetch Newer Posts",toolTip:"Fetch some more posts for this app, feed or feed filter."}, 
		"fetchOlder":{name:"Fetch Older Posts",toolTip:"Fetch some more posts for this app, feed or feed filter."}, 
		"fetchHours":{name:"Fetch Hours of Posts",toolTip:"Fetch some more posts for this app, feed or feed filter.",hasParam:true,paramType:"number","default":24}, 
		"forceOpen":{name:"Force Open",toolTip:"Move the calling post directly to the collector queue."}, 
		"forceOpenFirst":{name:"Force Open First",toolTip:"Move the calling post directly to the collector queue AND cut in line to be next processed."}, 
		"hatch":{name:"Hatch Eggs",toolTip:"Hatch the egg-children of the current rule, and destroy this rule."}, 
		"incrementCounter":{name:"Increment Limit Counter",toolTip:"Increment the rule limit counter.",hasParam:true,paramType:"number","default":1},
		"incrementParentCounter":{name:"Increment Parent Limit Counter",toolTip:"Increment the parent rule limit counter.",hasParam:true,paramType:"number","default":1},
		"likePost":{name:"Like Post",toolTip:"Like the calling post."}, 
		"openPostSource":{name:"Open Post Source",toolTip:"Opens the post source in a separate window/tab."},
		"processLast":{name:"Move To Bottom",toolTip:"Move the post to the bottom of the collector window."}, 
		"processFirst":{name:"Move To Top",toolTip:"Move the post to the top of the collector window."}, 
		"pauseAllApps":{name:"Pause All Apps",toolTip:"Pause all apps currently associated with docked sidekicks."}, 
		"pauseApp":{name:"Pause App",toolTip:"Pauses processing anything by this app.",hasParam:true,paramType:"textBox","default":""}, 
		"pauseCollector":{name:"Pause Collector",toolTip:"Pauses collection of all posts."}, 
		"pauseFetch":{name:"Pause Fetching",toolTip:"Pauses fetching of all posts."}, 
		"pauseType":{name:"Pause Type",toolTip:"Pause collection of all bonuses of this type."}, 
		"pinPost":{name:"Pin Post",toolTip:"Pins the calling post."}, //pin the post
		"queueCommentPost":{name:"Queue Comment Post",toolTip:"Comment on the calling post by first using the autolike queue system to delay the autocomment.",hasParam:true,paramLabel:"comment",paramType:"string","default":"Thanks!"},
		"queueLikePost":{name:"Queue Like Post",toolTip:"Like the calling post by first using the autolike queue system to delay the autolike."},
		"refreshBrowser":{name:"Refresh Browser",toolTip:"Reloads the browser window."}, 
		"reIDAll":{name:"ReID All",toolTip:"Re-ID all posts in the collector."},
		"removePriority":{name:"Remove Priority",toolTip:"Sets the priority of the calling post to normal."}, 
		"removePriorityApp":{name:"Remove Priority (App)",toolTip:"Sets the priority of all posts of the calling or specified app to normal.",hasParam:true,paramType:"textBox","default":""}, 
		"removePriorityType":{name:"Remove Priority (Type)",toolTip:"Sets the priority of all posts of the calling app with specified or associated type to normal.",hasParam:true,paramType:"textBox","default":"dynamic"}, 
		"resetAllLimits":{name:"Reset All Limit Counters",toolTip:"Reset all limits in the rules manager."},
		"resetLimit":{name:"Reset Limit Counter",toolTip:"Reset the limit counter of the current rule."},
		"resetBranchLimits":{name:"Reset Branch Limit Counters",toolTip:"Reset the limit counter of ALL rules that are lower in this branch (children, grandchildren, etc.). Does not reset the limit on this rule."},
		"resetChildrenLimits":{name:"Reset Children Limit Counters",toolTip:"Reset the limit counter of immediate child rules of this rule. Does not reset the limit on this rule."},
		"resetParentLimit":{name:"Reset Parent Limit Counter",toolTip:"Reset the limit counter of the parent rule."},
		"setAppOption":{name:"Set App Option",toolTip:"Set an option in the related sidekick by internal name.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox","default":"",paramLabel:"Name"},{paramType:"textBox","default":"",paramLabel:"Value"}]},
		"setAppTab":{name:"Set App Tab",toolTip:"Set the current collection tab by app ID.",hasParam:true,paramType:"textBox","default":"all"},
		"setAsAccepted":{name:"Set As Accepted",toolTip:"Set the calling post as accepted.",hasParam:true,paramType:"checkBox",paramLabel:"saveToHistory","default":false},
		"setAsExcluded":{name:"Set As Excluded",toolTip:"Set the calling post as excluded."}, 
		"setAsFailed":{name:"Set As Failed",toolTip:"Set the calling post as failed.",hasParam:true,paramType:"checkBox",paramLabel:"saveToHistory","default":false},
		"setColor":{name:"Set Post Color",toolTip:"Set the background color of the calling post.",hasParam:true,paramType:"colorPicker","default":"blue"},
		"setHostOption":{name:"Set Host Option",toolTip:"Set the value a host option by internal name.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox","default":"",paramLabel:"Name"},{paramType:"textBox","default":"",paramLabel:"Value"}]},
		"setPriority":{name:"Set Priority",toolTip:"Set the priority of the calling post.",hasParam:true,paramType:"number","default":50}, 
		"setPriorityApp":{name:"Set Priority (App)",toolTip:"Set the priority of the calling app or specified app.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox",paramLabel:"App","default":""},{paramType:"number",paramLabel:"Priority","default":50}]}, 
		"setPriorityType":{name:"Set Priority (Type)",toolTip:"Set the priority of the calling post type or specified type for the same app.",hasParam:true,paramCount:2,paramData:[{paramType:"textBox",paramLabel:"Type Code","default":""},{paramType:"number",paramLabel:"Priority","default":50}]}, 
		"setToCollect":{name:"Set To Collect",toolTip:"Set the calling post to be collected in normal order. Use Force Open to do more immediate collection, or Emergency Open to override your opened window limit."},
		"setToCollectPriority1":{name:"Set To Collect Top Priority",toolTip:"Set the calling post to be collected and also set its priority to 1. Use Force Open to do more immediate collection, or Emergency Open to override your opened window limit."},
		"setWhich":{name:"Set Type",toolTip:"Set the bonus type id of the calling post.",hasParam:true,paramType:"textBox","default":"dynamic"},	
		"uncheckType":{name:"Uncheck Post Type",toolTip:"Unchecks option to collect this bonus in the options menu."},		
		"unpauseAllApps":{name:"Unpause All Apps",toolTip:"Unpause all apps currently associated with docked sidekicks."}, 
		"unpauseAllTypesAllApps":{name:"Unpause All Types",toolTip:"Unpause all bonus types by all apps."}, 
		"unpauseAllTypesByApp":{name:"Unpause All Types By App",toolTip:"Unpause all bonus types associated with the given app, or the app associated with the activating post.",hasParam:true,paramType:"textBox","default":""}, 
		"unpauseApp":{name:"Unpause App",toolTip:"Starts processing anything by this app.",hasParam:true,paramType:"textBox","default":""},		
		"unpauseCollector":{name:"Unpause Collector",toolTip:"Starts collection of posts."}, 
		"unpauseFetch":{name:"Unpause Fetching",toolTip:"Starts fetching of posts."}, 
		"unpauseType":{name:"Unpause Type",toolTip:"Unpause collection of all bonuses of this type."}, 
	};
	
	var priorityActionsCodes = {
		"addToFeeds":1,"appendLink":2,"birth":3,"cancelInterval":4,"cancelTimer":5,"cleanPost":6,"commentPost":7,"createInterval":8,"createTimer":9,
		"decrementCounter":10,"decrementParentCounter":11,"destroyRule":12,"disableApp":13,"disableAppOption":14,"disableAutolike":15,"disableChildRules":16,
		"disableHostOption":17,"disableRule":18,"emergencyOpen":19,"emptyAutolikeQueue":20,"enableApp":21,"enableAppOption":22,"enableAutolike":23,
		"enableChildRules":24,"enableHostOption":25,"enableRule":26,"fetchNewer":27,"fetchOlder":28,"forceOpen":29,"forceOpenFirst":30,"hatch":31,
		"incrementCounter":32,"incrementParentCounter":33,"likePost":34,"openPostSource":35,"processLast":36,"processFirst":37,"pauseAllApps":38,
		"pauseApp":39,"pauseCollector":40,"pauseFetch":41,"pauseType":42,"pinPost":43,"queueCommentPost":44,"queueLikePost":45,"refreshBrowser":46,
		"reIDAll":47,"removePriority":48,"removePriorityApp":49,"removePriorityType":50,"resetAllLimits":51,"resetLimit":52,"resetBranchLimits":53,
		"resetChildrenLimits":54,"resetParentLimit":55,"setAppOption":56,"setAppTab":57,"setAsAccepted":58,"setAsExcluded":59,"setAsFailed":60,"setColor":61,
		"setHostOption":62,"setPriority":63,"setPriorityApp":64,"setPriorityType":65,"setToCollect":66,"setToCollectPriority1":67,"setWhich":68,
		"uncheckType":69,"unpauseAllApps":70,"unpauseAllTypesAllApps":71,"unpauseAllTypesByApp":72,"unpauseApp":73,"unpauseCollector":74,"unpauseFetch":75,
		"unpauseType":76,"fetchHours":77,"enableAutocomment":78,"disableAutocomment":79
	};
	
	var priorityActionByCode = function(code){
		for (c in priorityActionsCodes) {
			if (priorityActionsCodes[c]==code) return c;
		}
		return null;
	};	
	
	var priorityEvents = {
		//post events
		"onIdentify":"Called after a post is (re)identified. Posts are first identified as soon as they are fetched.",
		"onBeforeCollect":"Called before collection opens a sidekick window.",
		"onAfterCollect":"Called after collection is tried. Activates regardless of return status.",
		"onFailed":"Called when a post is marked failed. This could be actual or simulated by the user.",
		"onAccepted":"Called when a post is marked accepted. This could be actual or simulated by the user.",
		"onTimeout":"Called when a post is marked as timed out. This could be actual or simulated by the user.",
		"onValidate":"Called when a post is first fetched, but after its first identification. Not called on posts which fail identification.",
		
		//rule events
		"onLimit":"Called when this rule limit counter equals the rule's limit.",
		"onHatch":"Called when this rule's egg children are hatched.",		
		"onTimer":"Called when the timer on this rule activates.",
		"onInterval":"Called when the repeating timer on this rule activates.",
		"onBirth":"Called when this rule's egg children are birthed.",
		"onRuleCreated":"Called when the rule is created (or loaded on startup).",
		
		//app events
		"onSidekickDock":"Called when the sidekick for this app docks.",
		"onSidekickReady":"Called when the sidekick for this app creates an app object, and after it appends the collection tab for that app.",
		/*
			paused/unpaused
			enabled/disabled
			failCountChanged
			acceptCountChanged
			
		*/
		
		//console events
		"onHeartbeat":"Called when the global heartbeat interval ticks.",
		"onSetAppFilter":"Called when the collection panel app tab changes, including at startup if 'Show All' is selected as default",
		
		//feed events
		"onFeedFilterOlderLimitReached":"Called when a specific feed filter reaches its user-defined older limit.",
		
	};
	
	var priorityEventsCodes ={
		"onIdentify":1,"onBeforeCollect":2,"onAfterCollect":3,"onFailed":4,"onAccepted":5,"onTimeout":6,"onValidate":7,"onLimit":8,"onHatch":9,"onTimer":10,
		"onInterval":11,"onBirth":12,"onRuleCreated":13,"onSidekickDock":14,"onSidekickReady":15,"onHeartbeat":16,"onSetAppFilter":17,
		"onFeedFilterOlderLimitReached":18
	};
	
	var priorityEventByCode = function(code){
		for (c in priorityEventsCodes) {
			if (priorityEventsCodes[c]==code) return c;
		}
		return null;
	};	
	
	var postParts = {
		"age":"The time between the current time and the post creation time (in ms).",
		"acceptCount":"An app's accept counter value. Friend objects also have an acceptCount.",
		"activatorType":"Returns the object type of the rule-activating object: app, post, rule, feed, feedfilter or unknown.",
		"alreadyProcessed":"Reports if a post has already created a history entry.",
		"appID":"The appID of the game for which a post belongs. You can read the appID from the following affected objects: app, post, and feedFilter.",
		"appName":"The appName of the game for which this post belongs, as reported by the FB database.",
		"body":"The body of a post is a compilation of the title, caption, and desc.",
		"canvas":"The canvas of a post is its namespace granted by FB, ie. FarmVille's namespace is 'onthefarm'.",
		"caption":"The caption of a post is one line just below its title (or 'name'). Not all posts have this field.",
		"commentorID":"The commentorID is a list of IDs of all commentors.",
		"commentorName":"The commentorName is a list of names of all commentors.",
		"comments":"The comments are list of all comments made to the post, excluding the initial msg.",
		"currentTime":"The current time (in ms) on your system, not localized. This global value can be referenced from any activating object type.",
		"currentAppTab":"The currently selected collection tab's appID, or the word 'all' if the 'Show All' tab is selected.",
		"date":"The date of a post is its creation time on FB. This time is read as a partial unix date, and is the 'created_time' parameter in fb data packets. This field does not have millisecond data (multiply by 1000 to obtain a standard unix timestamp).",
		"desc":"The desc of a post is two lines below the title. This is the 'description' parameter in fb data packets. Not all posts have this field.",
		"either":"The either of a post is the compilation of the link and body.",
		"enabled":"The enabled state of an activating object.",
		"expanded":"The expanded state of an activating object.",
		"failCount":"An app's fail counter value. Friend objects also have a failCount.",
		"fromID":"The fromID is the ID of the poster.",
		"fromName":"The fromName is the name of the poster.",
		"fromNameLastFirst":"The name of the poster, displayed as Lastname, Firstname",
		"html":"The html of a post is the compilation of ALL visible FB attributes.",		
		"id":"Normally a post ID, which is usually the post creator's ID and a timestamp separated by an underscore. Alternately, you can ask for the id of an activating friend, feed or feed filter object.",
		"idText":"The identified link text of a post.",
		"img":"The img of a post is the url of the icon that displays with the post. This is the 'picture' parameter in fb data packets.",
		"isAccepted":"Reports if the post is set as having already been successfully collected.",
		"isAppPaused":"Reports if the associated app is paused.",
		"isCollect":"Reports if the post is set to be collected.",
		"isExcluded":"Reports if the post has been set as excluded.",
		"isFailed":"Reports if the post is set as having already failed.",
		"isForMe":"Reports if the W2W post targets the current user.",
		"isLiked":"Reports if the post has been identified as already being liked by the current user.",
		"isMyPost":"Reports if the post belongs to the current user.",
		"isPaused":"Reports if the calling object (post or app) is paused. Not specific!",
		"isPinned":"Reports if the post is marked as being pinned.",
		"isRemovable":"Reports if a feed is removeable. Your own profile wall and your home feed are not removeable, only disableable.",
		"isTimeout":"Reports if the post has been marked as a timed out collection attempt.",
		"isTypePaused":"Reports if the associated bonus type is paused.",
		"isScam":"Reports if a post is suspected of being a scam, usually when the canvas and appName do not match.",
		"isStale":"Reports if a post is older than the user-set older limit.",
		"isUndefined":"Reports if the post does not match any id given by the sidekick.",
		"isWishlist":"Reports if the post is deemed a whichlist request.",
		"isWorking":"Reports if the post is currently in the working state (being processed).",
		"isW2W":"Reports if the post is a Wall-To-Wall post, meaning that it was posted to a specific user's wall.",
		"lastKnownPostDate":"A friend object's last known post date (as unix time, no millisecond data).",
		"likeID":"The likeID is a list of IDs of users who liked the post.",
		"likeName":"The likeName is a list of names of users who liked this post.",
		"limit":"This rule's limit number.",
		"limitCount":"This rule's limit counter.",
		"link":"The 'link' of a post is the link text, not the url. This is the 'action.name' in fb data packets.",
		"linkHref":"The original url as it appeared from facebook. This SHOULD be exactly the same as 'url'.",
		"linkText":"The original link text as it appeared from facebook. You may want to NOT use 'link' and instead use this one.",
		"msg":"The msg of a post is the part the poster added as a comment during the post's creation.",
		"name":"With posts, this is the same as 'title', because its the FB name of a post object. With friend objects, this is the friend's text name.",
		"parentLimit":"The parent rule's limit number, or NULL if no parent exists.",
		"parentLimitCount":"The parent rule's limit counter, or NULL if no parent exists.",
		"postCount":"A friend object's count of posts it is tracking.",
		"postedDay":"A partial date-time value containing only the year/month/day portions, which corresponds to the post creation time.",
		"postedHour":"A partial date-time value containing only the year/month/day/hour portions, which corresponds to the post creation time.",
		"priority":"The priority of a post which could have been set by a rule, or by default of 50.",
		"status":"The status of a post is the return code given by a sidekick, or 0 if it has not been processed.",
		"targetID":"The targetID is a list of targets' IDs that the poster intended the post to display to.",
		"targetName":"The targetName is a list of targets the poster intended the post to display to.",
		"title":"The title of a post contains the bold text, usually including the poster's name, at the top of the post. This is the 'name' parameter in facebook data packets.",
		"totalCount":"An app's failcount and acceptcount combined. Friend objects also have a totalCount.",
		"typesPaused":"An app's list of paused bonus types. Only accessible from an activating post. Please stick to the contains/notContains operators because this is an array, not text.",
		"url":"The url of a post is the address to which the post redirects the user when clicked. This is the 'link' or 'action.link' parameter in fb data packets. This is the original url supplied by the app, not a modified url, such as WM's removal of https or a sidekick-modified url. Alternately, you can ask for the URL of a feed object.",
		"which":"The 'which' of a post is its identified codename that defines its bonus type and ties it to option menu entries. The codename starts with an appID and ends with something the sidekick developer uses to key the bonus type.",
		"whichText":"Text associated with this bonus type.",
	};
	
	var postPartsCodes = {
		"age":1,"acceptCount":2,"activatorType":3,"alreadyProcessed":4,"appID":5,"appName":6,"body":7,"canvas":8,"caption":9,"commentorID":10,
		"commentorName":11,"comments":12,"currentTime":13,"currentAppTab":14,"date":15,"desc":16,"either":17,"enabled":18,"expanded":19,"failCount":20,
		"fromID":21,"fromName":22,"fromNameLastFirst":23,"html":24,"id":25,"idText":26,"img":27,"isAccepted":28,"isAppPaused":29,"isCollect":30,
		"isExcluded":31,"isFailed":32,"isForMe":33,"isLiked":34,"isMyPost":35,"isPaused":36,"isPinned":37,"isRemovable":38,"isTimeout":39,"isTypePaused":40,
		"isScam":41,"isStale":42,"isUndefined":43,"isWishlist":44,"isWorking":45,"isW2W":46,"lastKnownPostDate":47,"likeID":48,"likeName":49,"limit":50,
		"limitCount":51,"link":52,"linkHref":53,"linkText":54,"msg":55,"name":56,"parentLimit":57,"parentLimitCount":58,"postCount":59,"postedDay":60,
		"postedHour":61,"priority":62,"status":63,"targetID":64,"targetName":65,"title":66,"totalCount":67,"typesPaused":68,"url":69,"which":70,
		"whichText":71
	};
	
	var postPartByCode = function(code){
		for (c in postPartsCodes) {
			if (postPartsCodes[c]==code) return c;
		}
		return null;
	};
	
	var priorityOperands = {
		"equals":"Property and query must match.",
		"notEquals":"Property and query must not match.",
		"startsWith":"Property must start with query value.",
		"notStartsWith":"Property cannot start with query value.",
		"endsWith":"Property must end with query value.",
		"notEndsWith":"Property cannot end with query value.",
		"contains":"Property contains anywhere the query value.",
		"notContains":"Property does not contain the query value.",
		"matchRegExp":"Property must match the registered expression.", 
		"notMatchRegExp":"Property must not match the registered expression.",
		"greaterThan":"Property must be greater than query value.",
		"lessThan":"Property must be less than query value.",
		"greaterThanOrEquals":"Property must be greater than or equal to query value.",
		"lessThanOrEquals":"Property must be less than or equal to query value.",

		"equalsExactly":"Property and query must match exactly via binary comparison.",
		"notEqualsExactly":"Property and query must not match exactly via binary comparison.",
		
	};

	var priorityOperandsCodes = {
		"equals":1,
		"notEquals":2,
		"startsWith":3,
		"notStartsWith":4,
		"endsWith":5,
		"notEndsWith":6,
		"contains":7,
		"notContains":8,
		"matchRegExp":9, 
		"notMatchRegExp":10,
		"greaterThan":11,
		"lessThan":12,
		"greaterThanOrEquals":13,
		"lessThanOrEquals":14,
		"equalsExactly":15,
		"notEqualsExactly":16,
		
	};	
	
	var priorityOperandByCode = function(code){
		for (c in priorityOperandsCodes) {
			if (priorityOperandsCodes[c]==code) return c;
		}
		return null;
	};	
	
	var RuleValidator = function(params){try{
		var isNew=(!exists(params));
		var self=this;
	
		//return saveable data from this branch
		this.__defineGetter__("saveableData",function(){try{
			var s=self.search, modSearch=[]; //use a second array to avoid accidental overwrite of first byRef
			for (var c=0;c<s.length;c++){
				modSearch.push(postPartsCodes[s[c]]);
			}
			var ret = {search:modSearch, operand:priorityOperandsCodes[self.operand], find:self.find}
			return ret;
		}catch(e){log("RuleValidator.saveableData: "+e);}});

		//remove this from parent
		this.remove=function(){try{
			var ask=opts.rulesConfirmDeleteValidator;
			if (!ask || (ask && confirm("Delete rule validator?"))){
				remove(this.node);
				this.parent.validators.removeByValue(this);
				doAction(Priority.saveRules);
			}
		}catch(e){log("RuleValidator.remove: "+e);}};
	
		this.moveUp=function(){try{
			//where is this
			var parentContainer = this.parent.validators;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					Priority.saveRules();
				}
			}
		}catch(e){log("RuleValidator.moveUp: "+e);}};

		//move down in the list
		this.moveDown=function(){try{
			//where is this
			var parentContainer = this.parent.validators;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					Priority.saveRules();
				}
			}
		}catch(e){log("RuleValidator.moveDown: "+e);}};

		//copy this validator on the parent
		this.clone=function(){try{
			this.parent.addValidator({search:this.search, operand:this.operand, find:this.find});
			Priority.saveRules();
		}catch(e){log("RuleValidator.clone: "+e);}};

		//init
		//this.id=params.id||unique();
		this.parent=params.parent||null;
		if (!this.parent) {
			log("RuleValidator: no parent specified: abort init");
			return null;
		}
		//this.validationNode=parent.validationNode;
		this.search=params.search||["appID"];
		if (!isArray(this.search)) this.search=[].push(this.search);
		//convert number codes to text commands
		for (var e in this.search) {
			//t=this.search[e];
			if (isNumber(this.search[e])) this.search[e]=postPartByCode(this.search[e]);
			//log([this.search[e],t])
		}
		this.operand=params.operand||"matchRegExp";
		if (isNumber(this.operand)) this.operand=priorityOperandByCode(this.operand);
		this.find=params.find||"";
				
		//draw it
		this.parent.validationNode.appendChild(this.node=createElement("div",{className:"validator"},[
			//search portion for this validator
			createElement("div",{className:"line"},[
				this.searchNode=(this.objSearch=new jsForms.comboBox({
					className:"jsfComboBox selectPostPart",
					onChange:function(){
						self.search=this.value;
						Priority.saveRules();
					},
					items:(function(){
						var ret=[];
						for (var i in postParts){
							ret.push(new jsForms.checkBox({
								text:i,
								value:i,
								toolTipText:postParts[i],
								checked:(self.search.inArray(i)),
								size:{width:"200%"},
							}));
						}
						return ret;
					})(),
					borderStyle:"none",
					//borderRadius:{topLeft:"1px", bottomRight:"1px",topRight:"1px",bottomLeft:"1px"},
					//explicitClose:true,
					highlightSelected:true,					
					dropDownSize:{height:"200px"},
					backColor:"#EEEEEE",
				})).node,
							
				//operator portion for this validator
				this.operandNode=createElement("select",{className:"selectOperand",onchange:function(){self.operand=this.value;Priority.saveRules();}},(function(){
					var ret=[],elem;
					for (var i in priorityOperands){
						ret.push(elem=createElement("option",{textContent:i,value:i,title:priorityOperands[i]}));
						if (i==self.operand) elem.selected=true;
					}
					return ret;
				})()),
				//find portion for this validator
				/*
					right here we need to bring up an element based on
						the post part chosen
					for most cases, we just need an input box to accept string values
					for special case "which" we need a dropdown of bonus types
					for boolean flags we need a default value of true and maybe 
						some kind of limitation to true and false in the box
				*/
				this.findNode=createElement("input",{className:"findBox",value:this.find,onchange:function(){self.find=this.value;Priority.saveRules();}}),
				//toolbox
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.remove();},title:"Delete Validator"},[
					createElement("img",{className:"resourceIcon trash"+opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddBlue",onclick:function(){self.clone();},title:"Clone Validator"},[
					createElement("img",{className:"resourceIcon clone"+opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddGreen",onclick:function(){self.moveUp();},title:"Move Up"},[
					createElement("img",{className:"resourceIcon arrowUp"+opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.moveDown();},title:"Move Down"},[
					createElement("img",{className:"resourceIcon arrowDown"+opts.littleButtonSize}),
				]),
				(self.parent.basedOn)?createElement("div",{className:"indent littleButton oddBlue",onclick:function(){
					//if a validator search array exists
					if (isArrayAndNotEmpty(self.search)){
						//fill the 'find' box with the post data linked to the search terms
						var f="";
						var post=self.parent.basedOn;
						for (var s=0;s<self.search.length;s++){
							if (s>0) f+=" ";
							f+=(post.testData[self.search[s]]||post[self.search[s]]||"");
						}
						self.findNode.value=f;
						self.find=f;
						Priority.saveRules();
					}
				},title:"Capture Text From Linked Post"},[
					createElement("img",{className:"resourceIcon importData"+opts.littleButtonSize}),
				]):null,
			]),
		]));
		
		//if (isNew) Priority.saveRules();
		return self;
	}catch(e){log("RuleValidator.init(): "+e);}};

	var RuleAction = function(params){try{
		var isNew=(!exists(params));
		var self=this;
	
		//return saveable data from this branch
		this.__defineGetter__("saveableData",function(){try{
			var a= {event:priorityEventsCodes[this.event], action:priorityActionsCodes[this.action]};
			if (this.hasParam) a.params=this.params;
			if (this.paramCount==2) a.params2=this.params2;
			return a;
		}catch(e){log("RuleAction.saveableData: "+e);}});

		//remove this from parent
		this.remove=function(){try{
			var ask=opts.rulesConfirmDeleteAction;
			if (!ask || (ask && confirm("Delete rule action?"))){
				remove(this.node);
				this.parent.actions.removeByValue(this);
				doAction(Priority.saveRules);
			}
		}catch(e){log("RuleAction.remove: "+e);}};
	
		//move up in the list
		this.moveUp=function(){try{
			//where is this
			var parentContainer = this.parent.actions;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					Priority.saveRules();
				}
			}
		}catch(e){log("RuleAction.moveUp: "+e);}};

		//move down in the list
		this.moveDown=function(){try{
			//where is this
			var parentContainer = this.parent.actions;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					Priority.saveRules();
				}
			}
		}catch(e){log("RuleAction.moveDown: "+e);}};

		//copy this validator on the parent
		this.clone=function(){try{		
			this.parent.addAction(this.saveableData());
			Priority.saveRules();
		}catch(e){log("RuleAction.clone: "+e);}};

		//init
		//this.id=params.id||unique();
		this.parent=params.parent||null;
		if (!this.parent) {
			log("RuleAction: no parent specified: abort init");
			return null;
		}
		//this.actionsNode=parent.actionsNode;
		this.action=params.action||"incrementCounter";
		//log(this.action);
		if (isNumber(this.action)) this.action=priorityActionByCode(this.action);
		this.event=params.event||"onAccepted";
		if (isNumber(this.event)) this.event=priorityEventByCode(this.event);
		
		//setup default values and param types
		//log(this.action);
		var def=priorityActions[this.action];
		this.hasParam = def.hasParam;
		this.params = params.params||def["default"]||((def.paramData||null)?def.paramData[0]["default"]:"");
		this.params2 = params.params2||((def.paramData||null)?def.paramData[1]["default"]:"");
		this.paramCount = def.paramCount;
		
		//draw it
		this.parent.actionsNode.appendChild(this.node=createElement("div",{className:"action"},[
			//event for this action
			createElement("div",{className:"line"},[
				this.eventNode=createElement("select",{className:"selectEvent",onchange:function(){self.event=this.value;Priority.saveRules();}},(function(){
					var actioneventsret=[],elem;
					for (var i in priorityEvents){
						actioneventsret.push(elem=createElement("option",{textContent:i,value:i,title:priorityEvents[i]}));
						if (i==self.event) elem.selected=true;
					}
					return actioneventsret;
				})()),
				//function to call on the event
				this.actionNode=createElement("select",{className:"selectFunction",onchange:function(){
					self.action=this.value;
					Priority.saveRules();
					//set the param type
					var action = priorityActions[this.value];
					self.paramNode.style.display=((action.hasParam)?"":"none");
					self.param2Node.style.display=((action.hasParam && (action.paramCount==2))?"":"none");		

				}},(function(){
					var actionfuncsret=[],elem;
					for (var i in priorityActions){
						entry=priorityActions[i];
						actionfuncsret.push(elem=createElement("option",{textContent:entry.name,value:i,title:entry.toolTip}));
						if (i==self.action) elem.selected=true;
					}
					return actionfuncsret;
				})()),
				//this is for special cases only and should be hidden otherwise
				this.paramNode=createElement("input",{className:"paramBox",value:this.params,onchange:function(){self.params=this.value;Priority.saveRules();}}),
				this.param2Node=createElement("input",{className:"paramBox",value:this.params2,onchange:function(){self.params2=this.value;Priority.saveRules();}}),
				
				//toolbox
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.remove();},title:"Delete Action"},[
					createElement("img",{className:"resourceIcon trash"+opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddBlue",onclick:function(){self.clone();},title:"Clone Action"},[
					createElement("img",{className:"resourceIcon clone"+opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddGreen",onclick:function(){self.moveUp();},title:"Move Up"},[
					createElement("img",{className:"resourceIcon arrowUp"+opts.littleButtonSize}),
				]),
				createElement("div",{className:"littleButton oddOrange",onclick:function(){self.moveDown();},title:"Move Down"},[
					createElement("img",{className:"resourceIcon arrowDown"+opts.littleButtonSize}),
				]),

			]),
		]));	
		
		//hide param node when not used
		self.paramNode.style.display=((self.hasParam)?"":"none");
		self.param2Node.style.display=((self.hasParam && (self.paramCount==2))?"":"none");		

		//if (isNew) Priority.saveRules();
		return self;
	}catch(e){log("RuleAction.init(): "+e);}};

	var Rule = function(params){try{
		this.objType="rule";
		var self=this;
		params=params||{};

		//set defaults
		this.parent=null;
		this.enabled=true;
		this.kids=[]; //child nodes
		this.eggs=[]; //hatchable child nodes
		this.actions=[]; //events:actions list
		this.validators=[]; //search:find list
		this.limitCount=0; 
		this.limit=0;
		this.actionsNode=null;
		this.validationNode=null;
		this.node=null;
		this.isChild=false;
		this.isEgg=false;
		this.expanded=true;		
		this.timers={};
		this.intervals={};
		this._isGlobal=false;
		
		//return savable data from this branch
		this.__defineGetter__("saveableData",function(){try{
			var ret={};
			
			//ret.id=this.id;
			ret.title=this.title;
			ret.enabled=this.enabled;
			ret.limit=this.limit;
			ret.limitCount=this.limitCount;
			//ret.level=this.level;
			ret.expanded=this.expanded;
			
			ret.validators=[];
			if (isArrayAndNotEmpty(this.validators)) for (var i=0,validator;(validator=this.validators[i]);i++) {
				ret.validators.push(validator.saveableData);
			}
			
			ret.actions=[];
			if (isArrayAndNotEmpty(this.actions)) for (var i=0,action;(action=this.actions[i]);i++) {
				ret.actions.push(action.saveableData);
			}
			
			ret.kids=[];
			if (isArrayAndNotEmpty(this.kids)) for (var i=0,kid;(kid=this.kids[i]);i++) {
				ret.kids.push(kid.saveableData);
			}
			
			ret.eggs=[];
			if (isArrayAndNotEmpty(this.eggs)) for (var i=0,egg;(egg=this.eggs[i]);i++) {
				ret.eggs.push(egg.saveableData);
			}
			
			return ret;
		}catch(e){log("Rule.saveableData: "+e);}});		

		//set/get wether this rule is saved as global or profile
		this.__defineGetter__("isGlobal",function(){try{
			return self._isGlobal;
		}catch(e){log("Rule.isGlobal: "+e);}});
		this.__defineSetter__("isGlobal",function(v){try{
			//only top level rule can be global
			if (self.parent) {
				confirm("Only top level rule can be set to global.");
				return;
			} 
			
			if (!v) {
				if (!confirm("Disabling profile sharing on this rule will prevent other users on this machine from loading it. Are you sure you wish to make this rule locally available only?")) return;
			}
		
			self._isGlobal=v;
			
			//make sure we have a uniqueID
			//but don't destroy one that already exists
			if (v && !exists(self.uniqueID)) self.uniqueID = unique();
			
			//change the color/icon of the isGlobal button
			if (self.toggleGlobalButton) {
				var s=opts.littleButtonSize;
				with (self.toggleGlobalButton) className=className.swapWordB(v,"removeGlobal"+s,"addGlobal"+s);
				with (self.toggleGlobalButton.parentNode) {
					className=className.swapWordB(v,"oddOrange","oddGreen");
					title=(v)?"Disable Profile Sharing":"Share With Other Profiles";
				}
			}
		}catch(e){log("Rule.isGlobal: "+e);}});
		
		this.__defineGetter__("parentLimit",function(){try{
			if (self.parent||null) return self.parent.limit;
			return null;
		}catch(e){log("Rule.parentLimit: "+e);}});

		this.__defineGetter__("isBranchDisabled",function(){try{
			var p=self.parent,ret=false;
			while(p) {
				if (!p.enabled) return true;
				p=p.parent;
			}
			return false;
		}catch(e){log("Rule.isBranchDisabled: "+e);}});

		this.__defineGetter__("parentLimitCount",function(){try{
			if (self.parent||null) return self.parent.limitCount;
			return null;
		}catch(e){log("Rule.parentLimitCount: "+e);}});

		//copy passed params to this object
		for (var p in params) {
			//omit specific params
			if (!(["actions","validators","kids","eggs"].inArray(p)) ) {
				//copy only params that make it past the checker
				this[p]=params[p];
			}
		}
		
		this.moveUp=function(){try{
			//where is this
			var parentContainer = 
				(this.isChild)?this.parent.kids:
				(this.isEgg)?this.parent.eggs:
				Priority.rules;
			//only affects items not already the first in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer[0]!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex-1];
					//swap me with my sibling
					parentContainer[myIndex-1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(this.node,sibling.node);
					//save it
					Priority.saveRules();
				}
			}
		}catch(e){log("Rule.moveUp: "+e);}};
		
		this.moveDown=function(){try{
			//where is this
			var parentContainer = 
				(this.isChild)?this.parent.kids:
				(this.isEgg)?this.parent.eggs:
				Priority.rules;
			//only affects items not already the last in the list
			//and not the only child in the list
			if ((parentContainer.length>1) && (parentContainer.last()!=this)) {
				//which index is this?
				var myIndex=parentContainer.inArrayWhere(this);
				if (myIndex != -1) {
					//I have a proper index here
					//who is my sibling
					var sibling = parentContainer[myIndex+1];
					//swap me with my sibling
					parentContainer[myIndex+1]=this;
					parentContainer[myIndex]=sibling;
					//place my node before my sibling node
					sibling.node.parentNode.insertBefore(sibling.node,this.node);
					//save it
					Priority.saveRules();
				}
			}
		}catch(e){log("Rule.moveDown: "+e);}};

		this.moveUpLevel=function(){try{
			if (this.parent) {
				//this is not a top level node, so we can move it
				var targetContainer=((this.parent.parent)?this.parent.parent.kids:Priority.rules);
				//remove from parent
				this.parent[(this.isChild)?"kids":(this.isEgg)?"eggs":null].removeByValue(this);
				//set new parent
				this.parent=(this.parent.parent||null); //never point to the top level
				//set flags
				this.isChild=(this.parent!=null);
				this.isEgg=false;
				//move the object
				targetContainer.push(this);
				//move the node
				if (this.parent) this.parent.kidsNode.appendChild(this.node);
				else wmConsole.priorityBuild.appendChild(this.node);
				
				//save it
				Priority.saveRules();
			}
		}catch(e){log("Rule.moveUpLevel: "+e);}};
		
		this.moveDownLevel=function(){try{
			//where is this
			var parentContainer = 
				(this.isChild)?this.parent.kids:
				(this.isEgg)?this.parent.eggs:
				Priority.rules;
			//create a new rule at my level
			var newRule = new Rule({
				parent:this.parent||null,
				isChild:this.isChild,
				isEgg:this.isEgg,
			});
			parentContainer.push(newRule);
			//remove me from my current parent
			parentContainer.removeByValue(this);
			//attach me to my new parent
			this.parent=newRule;
			this.isChild=true;
			this.isEgg=false;
			newRule.kids.push(this);
			//move my node
			newRule.kidsNode.appendChild(this.node);
			//save it
			Priority.saveRules();			
		}catch(e){log("Rule.moveDownLevel: "+e);}};

		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			Priority.saveRules();
		}catch(e){log("Rule.enable: "+e);}};

		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			Priority.saveRules();
		}catch(e){log("Rule.disable: "+e);}};

		this.disableChildren=function(){try{
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.disable();
			}			
		}catch(e){log("Rule.disableChildren: "+e);}};

		this.enableChildren=function(){try{
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.enable();
			}			
		}catch(e){log("Rule.enableChildren: "+e);}};
		
		this.toggle=function(){try{
			//if(this.enabled)this.disable(); else this.enable();
			
			//this.enabled=!this.enabled;
			this.enabled=this.toggleNode.checked;
			this.node.className=this.node.className.swapWordB(this.enabled,"enabled","disabled");
			Priority.saveRules();
			//this.toggleNode.checked=();

		}catch(e){log("Rule.toggle: "+e);}};

		this.clone=function(){try{
			var cloneRule=this.saveableData;
			//cloneRule.id=unique();
			if (this.isChild) this.parent.addChild(cloneRule);
			else if (this.isEgg) this.parent.addEgg(cloneRule);
			else Priority.newRule(cloneRule);
		}catch(e){log("RuleAction.clone: "+e);}};

		this.resetLimit=function(params){try{
			params=params||{};
			var ask=opts.rulesConfirmResetLimit;
			if (params.noConfirm || !ask || (ask && confirm("Reset Limit Counter?"))) {
				this.limitCount=0;
				this.limitCounterNode.value=this.limitCount;
				if (!(params.resetChildren||false)) {
					if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
						kid.resetLimit(params);
					}
				}
				if (!(params.preventSave||false)) Priority.saveRules();
			}
		}catch(e){log("Rule.resetLimit: "+e);}};
		
		this.resetBranchLimits=function(params){try{
			params=params||{};
			//resets the limits of entire branch rules, but not self limit
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.resetLimit({resetChildren:true,noConfirm:params.noConfirm||false});
			}
		}catch(e){log("Rule.resetBranchLimits: "+e);}};

		this.resetChildrenLimits=function(params){try{
			params=params||{};
			//resets the limits of all immediate children, but not self limit
			if (isArrayAndNotEmpty(this.kids)) for (var k=0,kid;(kid=this.kids[k]);k++){
				kid.resetLimit({noConfirm:params.noConfirm||false});
			}
		}catch(e){log("Rule.resetChildrenLimits: "+e);}};

		this.incrementLimitCounter=function(o,n){try{
			this.limitCount=parseInt(parseInt(this.limitCount)+(exists(n)?parseInt(n):1));
			this.limitCounterNode.value=this.limitCount;
			Priority.saveRules();
			//for reaching of limit
			if (this.limit && (this.limitCount>=this.limit)) this.onEvent("onLimit",o);
		}catch(e){log("Rule.incrementLimitCounter: "+e);}};

		this.decrementLimitCounter=function(o,n){try{
			this.limitCount=parseInt(parseInt(this.limitCount)-(exists(n)?parseInt(n):1));
			//dont allow to drop below 0
			if (this.limitCount<0) this.limitCount=0;
			this.limitCounterNode.value=this.limitCount;
			Priority.saveRules();
		}catch(e){log("Rule.decrementLimitCounter: "+e);}};

		this.remove=function(noConfirm){try{
			var ask=opts.rulesConfirmDeleteRule;
			if (noConfirm || (this.isGlobal && confirm("This rule is shared with other profiles. Deleting it here will prevent it from loading for other users. Are you sure you wish to delete this rule and its children.")) || !ask || (!this.isGlobal && ask && confirm("Delete rule and all of its child nodes?"))){
				//destroy intervals and timers
				this.cleanup();				
				//remove my data
				var parentContainer=((this.isChild)?this.parent.kids:(this.isEgg)?this.parent.eggs:Priority.rules);
				parentContainer.removeByValue(this);
				//remove my node
				remove(this.node);
				
				doAction(Priority.saveRules);
			}
		}catch(e){log("Rule.remove: "+e);}};

		this.cancelAllTimers=function(){try{
			//find the correct timer by target
			for (var t in this.timers){
				if (this.timers[t]!=null) {
					window.clearTimeout(this.timers[t]);
					delete this.timers[t];
				}
			}
		}catch(e){log("Rule.cancelAllTimers: "+e);}};		

		this.cancelTimer=function(target){try{
			//find the correct timer by target
			var timer=null;
			for (var t in this.timers){
				if (this.timers[t].target==target) {
					timer=this.timers[t];
					break;
				}
			}
			if (timer) {
				window.clearTimeout(timer.timer);
				delete this.timers[timer.id];
			}
		}catch(e){log("Rule.cancelTimer: "+e);}};
		
		this.createTimer=function(t,o){try{
			this.cancelTimer(o);
			var self=this;
			var stamp=unique();
			var timer=window.setTimeout(function(){
				self.onEvent("onTimer",o);
			},t);
			this.timers[stamp]={timer:timer, target:o, id:stamp};
		}catch(e){log("Rule.createTimer: "+e);}};
		
		this.cancelAllIntervals=function(){try{
			//find the correct timer by target
			for (var t in this.intervals){
				if (this.intervals[t]!=null) {
					window.clearInterval(this.intervals[t]);
					delete this.intervals[t];
				}
			}
		}catch(e){log("Rule.cancelAllIntervals: "+e);}};		
		
		this.cancelInterval=function(target){try{
			//find the correct timer by target
			var interval=null;
			for (var t in this.intervals){
				if (this.intervals[t].target==target) {
					interval=this.intervals[t];
					break;
				}
			}
			if (interval) {
				window.clearInterval(interval.timer);
				delete this.intervals[interval.id];
			}
		}catch(e){log("Rule.cancelInterval: "+e);}};
		
		this.createInterval=function(t,o){try{
			this.cancelInterval(o);
			var self=this;
			var stamp=unique();
			var interval=window.setInterval(function(){
				self.onEvent("onInterval",o);
			},t);
			this.intervals[stamp]={timer:interval, target:o, id:stamp};
		}catch(e){log("Rule.createInterval: "+e);}};
		
		this.doEvent=function(event,obj,logit){try{
			//check to see if post matches this rule, if it does, perform actions
			//if (this.validators){
				//logit=logit||(obj.objType=="post");
				
				var obj=(obj||{});
				//var self=this;
				var matchPost=true, found=[];
				for (var vl=0,validator;(validator=this.validators[vl]);vl++) { try{
					//within the search array, each result is handled as an OR
					var result=false;
					for (var s=0,search; (search=validator.search[s]); s++) {
						var v = 
							//special request for object type of the object that activated this rule
							(search=="activatorType")?(
								(exists(obj))?(obj.objType||"unknown"):"unknown"
							):
							
							//special specific app being paused test
							(search=="isAppPaused")?(
								(exists(obj) && exists(obj.app))?obj.app.paused:false
							):
							
							//special specific bonus type being paused
							(search=="isTypePaused")?(
								(exists(obj) && exists(obj.which) && exists(obj.app))?obj.app.typesPaused.inArray(obj.which):false
							):
							
							//read from post object test data
							(exists(obj) && exists(obj.testData) && exists(obj.testData[search]))?obj.testData[search]:  
							//read from activating object standard parameters
							(exists(obj) && exists(obj[search]))?obj[search]:
							//read from this rule object
							exists(self[search])?self[search]:
							//read from parameters in the console/main object
							exists(main[search])?main[search]:
							//there is no known reference for this query
							"undefined";

						//fail validators that do not work with this obj
						if (v=="undefined") {result=false; break;}
						//convert functions to values
						if (typeof v=="function") v=v();
						
						var query = validator.find;
						//make the query the same type as the value
						if (!(typeof query == typeof v)) {
							switch (typeof v) {
								case "boolean":
									//convert texts of false/true to actual booleans
									query = cBool(query);
									break;
								case "number":
									//convert text numbers to real numbers
									query=(query=Number(query))?query:0;
									//if (query==null) query=0;
									break;
							}
						}
						
						//if (logit) log([search, v, query]);	

						//compare
						switch(validator.operand){
							case "equals": result=result||(v==query); break; 
							case "notEquals": result=result||(v!=query); break; 
							case "startsWith": result=result||(v.startsWith(query)); break; 
							case "notStartsWith": result=result||(!v.startsWith(query)); break; 
							case "endsWith": result=result||(v.endsWith(query)); break; 
							case "notEndsWith": result=result||(!v.endsWith(query)); break; 
							case "contains": result=result||(v.contains(query)); break; 
							case "notContains": result=result||(!v.contains(query)); break; 
							case "greaterThan": result=result||(v>query); break; 
							case "lessThan": result=result||(v<query); break; 
							case "greaterThanOrEquals": result=result||(v>=query); break; 
							case "lessThanOrEquals": result=result||(v<=query); break; 
							case "matchRegExp":
								var f; //storage space for match array
								var regex = new RegExp(query,"gi");
								f=regex.exec(v);
								result=result||isArrayAndNotEmpty(f);
								//result=result||((f=v.match(regex))!=null);
								if (f) found=found.concat(f);
								break;
							case "notMatchRegExp":
								var regex = new RegExp(query,"gi");
								result=result||(v.match(regex)==null);
								break;
							case "equalsExactly": result=result||(v===query); break; 
							case "notEqualsExactly": result=result||!(v===query); break; 
						}
						//any result of true inside this loop is an automatic success
						if (result) break;
					}
					//evaluate our current result with the previous results
					//outside the search array, each value is handled as an AND
					//any one non-match is a complete failure
					matchPost=(matchPost && result);
					if (!matchPost) break;
				}catch(e){
					log("Rule.doEvent: "+e+"{event:" +event+ ", search:"+search+", value:"+v+", query:"+query+", result:"+result+"}");
					continue;
				}}
				//if after all testing we still matched the object
				//then perform this rule's events and check children
				if (matchPost) {
					//log("post matches all validators");
					//first do every child rule
					for (var k=0,kid;(kid=this.kids[k]);k++){
						kid.doEvent(event,obj,true);
					}
					//now finish up with this rule's actions
					this.onEvent(event,obj,found||null);
				}
			//}
			
			//log("Rule.doEvent: {obj="+obj.id+", event="+event+", matchPost="+matchPost+"}");
		}catch(e){log("Rule.doEvent: "+e);}};

		this.onEvent=function(event,obj,found){try{
			var actionFilter=["*"];
			/*
				handle special events
			*/
			if (event=="onRuleCreated") {
				/*
					we do want onRuleCreated events to fire even if the rule is disabled,
					or intervals won't be set and ready for later, if the user does enable the rule
					this session. But we want to filter which actions are available.
				*/
				if (!this.enabled || this.isBranchDisabled) actionFilter=["createInterval","createTimer"];
				
			} else if ((event=="onInterval")||(event=="onTimer")) {
				//special case for intervals and timers
				if (!this.enabled || this.isBranchDisabled) return;
			} else {
				//always break if this rule is disabled
				if (!this.enabled || this.isBranchDisabled) return;
			}
			/*
				end handle special events
			*/
		
			obj=obj||null;
			//var self=this;
			var post=(self!=obj)?obj:null;
			var app=post?(exists(obj.app)?obj.app:obj):null;
			
			//some insertable post parts
			var inserts=["appID","which","fromID"];
			
			//perform an action based on an event call
			//post object may be null if called from this
			for (var a1=0,action;(action=this.actions[a1]);a1++){
				//filter actions: allow only those in the filter list, or all actions if "*" is in the list				
				if (actionFilter.inArray("*") || actionFilter.inArray(action.action) ) if (action.event==event){
					var param=action.params;
					var param2=action.params2;
					var hasParam=action.hasParam;
					//format some post parts into the param
					if (hasParam && param) {
						for (var i=0;i<inserts.length;i++){
							if (post && (post.replace||null)) {
								param.replace(new RegExp("{%"+inserts[i]+"}","gi"), post.testData[inserts[i]] || post[inserts[i]]);
							}
						}
					}
					
					switch(action.action){
						case "destroyRule":(function(){
							doAction(function(){
								self.remove(true);
							});
							})(); break;
						case "pauseType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								main.pauseByType(a,w);
							});
							})(); break;
						case "unpauseType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								main.unPauseByType(a,w);
							});
							})(); break;
						case "uncheckType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								main.disableOpt(w,a);
								//main.stopCollectionOf(post.which);
							});
							})(); break;

						case "checkType":(function(){
							var w=post.which, a=app;
							doAction(function(){
								main.enableOpt(w,a);
								//main.startCollectionOf(post.which);
							});
							})(); break;
						case "disableAppOption":(function(){
							var c=param, f=found, a=app;
							if (f) c=c.format2(f);
							doAction(function(){
								main.disableOpt(c,a);
							});
							})(); break;
						case "enableAppOption":(function(){
							var c=param, f=found, a=app;
							if (f) c=c.format2(f);
							doAction(function(){
								main.enableOpt(c,a);
							});
							})(); break;
						case "disableHostOption":(function(){
							//debug.print("option disabled");
							var c=param, f=found;
							if (f) c=c.format2(f);
							doAction(function(){
								main.disableOpt(c);
							});
							})(); break;
						case "enableHostOption":(function(){
							//debug.print("option enabled");
							var c=param, f=found;
							if (f) c=c.format2(f);
							doAction(function(){
								main.enableOpt(c);
							});
							})(); break;
						case "disableAutolike":(function(){
							doAction(function(){
								//debug.print("autolike disabled");
								main.disableOpt("useautolike");
							});
							})(); break;
						case "enableAutolike":(function(){
							doAction(function(){
								//debug.print("autolike enabled");
								main.enableOpt("useautolike");
							});
							})(); break;
						case "disableAutocomment":(function(){
							doAction(function(){
								main.disableOpt("useautocomment");
							});
							})(); break;
						case "enableAutocomment":(function(){
							doAction(function(){
								main.enableOpt("useautocomment");
							});
							})(); break;
						case "pauseApp":(function(){
							var a = apps[param]||app;
							doAction(function(){
								a.pause();
							});
							})(); break;
						case "unpauseApp":(function(){
							var a = apps[param]||app;
							doAction(function(){
								a.unPause();
							});
							})(); break;
						case "appendLink":(function(){
							var p=post, v=param||"";
							if (p) doAction(function(){
								p.link=p.linkHref+v;
							});
							})(); break;
						case "unpauseAllTypesByApp":(function(){
							var a = apps[param]||app;
							doAction(function(){
								a.unpauseAllTypes();
							});
							})(); break;
						case "unpauseAllTypesAllApps":(function(){
							doAction(function(){
								for (var a in apps){
									a.unpauseAllTypes();
								}
							});
							})(); break;
						case "unpauseAllApps":(function(){
							doAction(function(){
								for (var a in apps){
									a.unpause();
								}
							});
							})(); break;
						case "pauseAllApps":(function(){
							doAction(function(){
								for (var a in apps){
									a.pause();
								}
							});
							})(); break;
						case "refreshBrowser":(function(){
							doAction(function(){
								window.location.reload();
							});
							})(); break;
						case "pauseCollector":(function(){
							doAction(function(){
								main.pauseCollecting(true);
							});
							})(); break;
						case "unpauseCollector":(function(){
							doAction(function(){
								main.pauseCollecting(false);
							});
							})(); break;
						case "pauseFetch":(function(){
							doAction(function(){
								main.pauseFetching(true);
							});
							})(); break;
						case "unpauseFetch":(function(){
							doAction(function(){
								main.pauseFetching(false);
							});
							})(); break;
						case "likePost":(function(){
							doAction(function(){
								post.like();
							});
							})(); break;
						case "queueLikePost":(function(){
							doAction(function(){
								main.queAutoLike(post);
							});
							})(); break;
						case "commentPost":(function(){
							var p=param,f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								post.comment(p);
							});
							})(); break;						
						case "queueCommentPost":(function(){
							var p=param,f=found;
							if (f) p=p.format2(f);
							//log(["queueCommentPost fired",p]);
							doAction(function(){
								main.queAutoComment(post,p);
							});
							})(); break;
						case "cleanPost":(function(){
							doAction(function(){
								post.remove();
							});
							})(); break;
						case "incrementCounter":(function(){
							var o=obj,p=param,f=found;
							//if (f) p=p.format2(f);
							doAction(function(){
								self.incrementLimitCounter(o,p);
							});
							})(); break;
						case "decrementCounter":(function(){
							var o=obj,p=param,f=found;
							//if (f) p=p.format2(f);
							doAction(function(){
								self.decrementLimitCounter(o,p);
							});
							})(); break;
						case "incrementParentCounter":(function(){
							var o=obj,p=param, f=found;
							//if (f) p=p.format2(f);
							if (this.parent) {
								doAction(function(){
									//passes the activating object, not this rule
									self.parent.incrementLimitCounter(o,p);
								});
							}
							})(); break;
						case "decrementParentCounter":(function(){
							var o=obj,p=param, f=found;
							//if (f) p=p.format2(f);
							if (this.parent){
								doAction(function(){
									//passes the activating object, not this rule
									self.parent.decrementLimitCounter(o,p);
								});
							}
							})(); break;
						case "setColor":(function(){
							var c=param;
							var f=found;
							if (f) c=c.format2(f);
							doAction(function(){
								post.setColor(c);
							});
							})(); break;
						case "pinPost":(function(){
							doAction(function(){
								post.pin();
							});
							})(); break;
						case "setAsAccepted":(function(){
							var saveit=param;
							doAction(function(){
								post.accept(saveit);
							});
							})(); break;
						case "setAsFailed":(function(){
							var saveit=param;
							doAction(function(){
								post.fail(saveit);
							});
							})(); break;
						case "setAsExcluded":(function(){
							doAction(function(){
								post.exclude();
							});
							})(); break;
						case "processFirst":(function(){
							doAction(function(){
								post.moveToTop();
							});
							})(); break;
						case "processLast":(function(){
							doAction(function(){
								post.moveToBottom();
							});
							})(); break;
						case "setPriority":(function(){
							var p=param, f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								post.setPriority(p);
							});
							})(); break;
						case "setPriorityApp":(function(){
							var p=param2, a=apps[param]||app, f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriority(p);
							});
							})(); break;
						case "removePriorityApp":(function(){
							var p=param2, a=apps[param]||app, f=found;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriority(50);
							});
							})(); break;
						case "setPriorityType":(function(){
							var p=param2, a=app, f=found, w=param||post.which;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriorityByType(w,p);
							});
							})(); break;
						case "removePriorityType":(function(){
							var a=app, f=found, w=param||post.which;
							if (f) p=p.format2(f);
							doAction(function(){
								app.setPriorityByType(w,50);
							});
							})(); break;
						case "removePriority":(function(){
							doAction(function(){
								post.setPriority(50);
							});
							})(); break;
						case "resetLimit":(function(){
							doAction(function(){
								self.resetLimit({noConfirm:true});
							});
							})(); break;
						case "resetParentLimit":(function(){
							if (this.parent) {
								doAction(function(){
									self.parent.resetLimit({noConfirm:true});
								});
							}
							})(); break;
						case "resetChildrenLimits":(function(){
							doAction(function(){
								self.resetChildrenLimits({noConfirm:true});
							});
							})(); break;						
						case "resetBranchLimits":(function(){
							doAction(function(){
								self.resetBranchLimits({noConfirm:true});
							});
							})(); break;				
						case "hatch":(function(){
							var o=obj;
							doAction(function(){
								self.hatch(o);
							});
							})(); break;
						case "birth":(function(){
							var o=obj;
							doAction(function(){
								this.birth(o);
							});
							})(); break;
						case "fetchNewer":(function(){
							doAction(function(){
								app.fetchPosts({prev:true,bypassPause:true});
							});
							})(); break;
						case "fetchOlder":(function(){
							doAction(function(){
								app.fetchPosts({next:true,bypassPause:true});
							});
							})(); break;
						case "fetchHours":(function(){
							var p=param, f=found, a=app;
							if (f) p=p.format2(f);
							doAction(function(){
								var t=(timeStamp()-(p*hour)).toString();
								t=t.substr(0,t.length-3);
								log("fetchHours: "+p+" please wait...");
								main.fetch({bypassPause:true,range:{since:t},apps:app});
							});
							})(); break;
						case "disableRule":(function(){
							doAction(function(){						
								self.disable();
							});
							})(); break;
						case "enableRule":(function(){
							doAction(function(){
								self.enable();
							});
							})(); break;
						case "disableChildRules":(function(){
							doAction(function(){						
								self.disableChildren();
							});
							})(); break;
						case "enableChildRules":(function(){
							doAction(function(){
								self.enableChildren();
							});
							})(); break;
						case "disableApp":(function(){
							//check for specified app
							var a = apps[param]||app;
							doAction(function(){
								a.disable();
							});
							})(); break;
						case "enableApp":(function(){
							var a = apps[param]||app;
							doAction(function(){
								a.enable();
							});
							})(); break;
						case "forceOpen":(function(){
							doAction(function(){
								post.forceOpen();
							});
							})(); break;
						case "forceOpenFirst":(function(){
							doAction(function(){
								post.forceOpen({first:true});
							});
							})(); break;
						case "emergencyOpen":(function(){
							doAction(function(){
								post.forceOpen({emergency:true});
							});
							})(); break;
						case "setToCollect":(function(){
							doAction(function(){
								post.collect();
							});
							})(); break;
						case "setToCollectPriority1":(function(){
							doAction(function(){
								post.collect();
								post.setPriority(1);
							});
							})(); break;
						case "createTimer":(function(){
							var o=obj, p=param, f=found;
							if (f) p=p.format2(f);
							//allow new time format entry
							//if the calculated time differs from the passed time, then use that calculated time, as long as it doesn't translate to 0
							var t=calcTime(p);
							if (t!=0 && t!=p) p=t;
							//debug.print(["b",param,t,p]);
							doAction(function(){
								self.createTimer(p,o);
							});
							})(); break;
						case "cancelTimer":(function(){
							var o=obj;
							doAction(function(){
								if (o.objType=="rule") self.cancelAllTimers();
								else self.cancelTimer(o);
							});
							})(); break;
						case "createInterval":(function(){
							var o=obj, p=param, f=found;
							if (f) p=p.format2(f);
							//allow new time format entry
							//if the calculated time differs from the passed time, then use that calculated time, as long as it doesn't translate to 0
							var t=calcTime(p);
							if (t!=0 && t!=p) p=t;
							//debug.print(["b",param,t,p]);
							doAction(function(){
								self.createInterval(p,o);
							});
							})(); break;
						case "cancelInterval":(function(){
							var o=obj;
							doAction(function(){
								if (o.objType=="rule") self.cancelAllIntervals();
								else self.cancelInterval(o);
							});
							})(); break;
						case "setWhich":(function(){
							var w=param;
							var f=found;
							if (f) w=w.format2(f);
							doAction(function(){
								post.setWhich(w);
							});
							})(); break;
						case "reIDAll": (function(){
							doAction(function(){
								main.reIDAll();
							});
							})(); break;
						case "resetAllLimits":(function(){
							doAction(function(){
								Priority.resetAllLimits();
							});
							})(); break;							
						case "openPostSource":(function(){
							doAction(function(){
								post.openSource();
							});
							})(); break;
						case "emptyAutolikeQueue":(function(){
							doAction(function(){
								Main.emptyAutoLikeQueue();
							});
							})(); break;							
						case "setHostOption":(function(){
							var c=param, c2=param2, f=found;
							if (f) c=c.format2(f); //format only param1
							doAction(function(){
								main.setOpt(c,c2);
							});
							})(); break;
						case "setAppOption":(function(){
							var c=param, c2=param2, f=found, a=app;
							if (f) c=c.format2(f); //format only param1
							doAction(function(){
								main.setOpt(c,c2,a);
							});
							})(); break;							
						case "setAppTab":(function(){
							if (param=="all") {
								doAction(function(){
									//switch to Show All
									wmConsole.collectTabControl.selectTab(0);
								});
							} else {
								//check for specified app
								var a = apps[param]||app;
								if (a||null) doAction(function(){
									//switch to associated tab
									click(a.collectionTabNode);
								});
							}})(); break;
					}	
				}
			}
		}catch(e){log("Rule.onEvent: "+e);}};
		
		this.addAction=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			var ret=new RuleAction(p);
			this.actions.push(ret);
			if (isNew) Priority.saveRules();
		}catch(e){log("Rule.addAction: "+e);}};

		this.addValidator=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			var ret=new RuleValidator(p);
			this.validators.push(ret);
			if (isNew) Priority.saveRules();
		}catch(e){log("Rule.addValidator: "+e);}};
		
		this.addChild=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			p.isChild=true;
			var rule=new Rule(p);
			this.kids.push(rule);
			if (isNew) Priority.saveRules();
		}catch(e){log("Rule.addChild: "+e);}};

		this.addEgg=function(p){try{
			var isNew=!exists(p);
			p=p||{};
			p.parent=this;
			p.isEgg=true;
			var rule=new Rule(p);
			this.eggs.push(rule);
			if (isNew) Priority.saveRules();
		}catch(e){log("Rule.addEgg: "+e);}};		
		
		//move eggs to parent node and destroy this node
		this.hatch=function(obj){try{
			var ask=opts.rulesConfirmHatch
			if (!ask || (ask && confirm("Hatch egg child and remove current rule and all its children?")) ) {
				this.onEvent("onHatch",obj||this);
				for (var e=0,egg; (egg=this.eggs[e]); e++){
					egg.moveUpLevel();
				}
				this.remove(true); //with noConfirm
			}
		}catch(e){log("Rule.hatch: "+e);}};

		//clone eggs to parent node
		this.birth=function(obj){try{
			this.onEvent("onBirth",obj||this);
			for (var e=0,egg; (egg=this.eggs[e]); e++){
				var cloneRule=egg.saveableData;
				if (this.isChild) this.parent.addChild(cloneRule);
				else Priority.newRule(cloneRule);
			}
		}catch(e){log("Rule.birth: "+e);}};

		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
			Priority.saveRules();
		}catch(e){log("Rule.toggleContent: "+e);}};

		this.populateBonusList=function(){try{
			var node=this.bonusDropDown;
			var bonuses=[];
			//get the list of accept texts for this app
			if (this.appID!="") {
				if (this.appID=="* All") {
					//populate list with bonuses from ALL docked sidekicks
				} else bonuses = mergeJSON(apps[this.appID].accText,apps[this.appID].userDefinedTypes);
			}
			bonuses["dynamic"]="* Dynamic grab";
			bonuses["none"]="* None";
			bonuses["wishlist"]="* Flaged as Wishlist";
			bonuses["exclude"]="* Excluded types";
			bonuses["send"]="* Send Unknown";
			bonuses["doUnknown"]="* Get Unknown";
			bonuses["*"]="* All"; //perform rule on ALL bonus types for this app

			//sort by display text
			bonuses=sortCollection(bonuses,"value");

			//add each element to the dropdown
			var elem;
			node.innerHTML=""; //wipe previous list
			for (var i in bonuses) {
				var showI=i.removePrefix(this.appID);
				node.appendChild(elem=createElement("option",{textContent:((bonuses[i].startsWith("*"))?"":((showI.startsWith("send"))?"Send ":"Get "))+bonuses[i], value:showI}));
				if (this.bonus== showI) elem.selected = true;
			}
		}catch(e){log("Rule.populateBonusList: "+e);}};

		//draw to priority/rule manager or to the parent node's kids or eggs section
		try{(((this.parent)?this.parent[(this.isChild)?"kidsNode":"eggsNode"]:null)||$("wmPriorityBuilder")).appendChild(
			this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
				createElement("div",{className:"line"},[
					createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
						this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+opts.littleButtonSize:"treeExpand"+opts.littleButtonSize)}),
					]),
					this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
						self.enabled=this.checked;
						with (self.node) className=className.toggleWordB(!this.checked,"disabled");
						Priority.saveRules();
					}}),
					createElement("label",{textContent:"Title:"}),
					this.titleNode=createElement("input",{className:"w400",value:(this.title||""), onchange:function(){self.title=this.value; Priority.saveRules();}}),
					
					//toolbox
					createElement("div",{className:"littleButton oddOrange", title:"Remove Rule"},[
						createElement("img",{className:"resourceIcon trash"+opts.littleButtonSize,onclick:function(){self.remove();}})]),
					createElement("div",{className:"littleButton oddBlue",title:"Hatch Egg Children"},[
						createElement("img",{className:"resourceIcon hatch"+opts.littleButtonSize,onclick:function(){self.hatch();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Reset Limit Counter"},[
						createElement("img",{className:"resourceIcon reset"+opts.littleButtonSize,onclick:function(){self.resetLimit();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Clone Rule"},[
						createElement("img",{className:"resourceIcon clone"+opts.littleButtonSize,onclick:function(){self.clone();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Birth Egg Children"},[
						createElement("img",{className:"resourceIcon birth"+opts.littleButtonSize,onclick:function(){self.birth();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up"},[
						createElement("img",{className:"resourceIcon arrowUp"+opts.littleButtonSize,onclick:function(){self.moveUp();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down"},[
						createElement("img",{className:"resourceIcon arrowDown"+opts.littleButtonSize,onclick:function(){self.moveDown();}})]),
					createElement("div",{className:"littleButton oddGreen", title:"Move Up Level"},[
						createElement("img",{className:"resourceIcon moveUpLevelLeft"+opts.littleButtonSize,onclick:function(){self.moveUpLevel();}})]),
					createElement("div",{className:"littleButton oddOrange", title:"Move Down Level"},[
						createElement("img",{className:"resourceIcon moveInLevel"+opts.littleButtonSize,onclick:function(){self.moveDownLevel();}})]),
					createElement("div",{className:"littleButton oddBlue", title:"Show Source"},[
						createElement("img",{className:"resourceIcon object"+opts.littleButtonSize,onclick:function(){promptText(JSON.stringify(self.saveableData),true);}})]),

					createElement("div",{className:"indent littleButton "+((this.isGlobal)?"oddOrange":"oddGreen"), title:((this.isGlobal)?"Disable Profile Sharing":"Share With Other Profiles")},[
						this.toggleGlobalButton=createElement("img",{className:"resourceIcon "+((this.isGlobal)?"removeGlobal":"addGlobal")+opts.littleButtonSize,onclick:function(){self.isGlobal=!self.isGlobal; Priority.saveRules();}})]),
				]),
				this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
					(this.basedOn)?createElement("div",{className:"line"},[
						createElement("label",{textContent:"This rule is linked to a post: ",title:"This rule is linked to a post. Validators can draw information from that post so you can easily capture similar posts just by editing the captured texts to suit your needs. Post linking is not carried from session to session."}),
						this.basedOnNode=createElement("span",{textContent:this.basedOn.id}),
					]):null,
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Limit:"}),
						this.limitNode=createElement("input",{value:(this.limit||0), onchange:function(){self.limit=this.value;Priority.saveRules();}}),
					]),
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Counter:"}),
						this.limitCounterNode=createElement("input",{value:(this.limitCount||0), onchange:function(){self.limitCount=this.value;Priority.saveRules();}}),
					]),
					//validation subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"For Activating Objects:",title:"These validators attempt to match a post or other activating object, such as feed, feed filter, app, or this rule. All activators that match here then have the following actions performed at certain events."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addValidator();},title:"Add Validator"},[
							createElement("img",{className:"resourceIcon plus"+opts.littleButtonSize}),
						]),
						this.validationNode=createElement("div",{className:"subsection"}),
					]),				
					//actions subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Do Actions:",title:"Actions to perform on matching posts."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addAction();},title:"Add Action"},[
							createElement("img",{className:"resourceIcon plus"+opts.littleButtonSize}),
						]),
						this.actionsNode=createElement("div",{className:"subsection"}),
					]),
					//kids subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Child Rules:",title:"Child rules are nested rules which are applied to matching posts at the same time the parent rule is applied. Child rules can have different validators, but will only activate if the parent validators have already matched a post."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addChild();},title:"Add Child"},[
							createElement("img",{className:"resourceIcon plus"+opts.littleButtonSize}),
						]),
						this.kidsNode=createElement("div",{className:"subsection"}),
					]),
					//egg kids subbox
					createElement("div",{className:"line"},[
						createElement("label",{textContent:"Egg Rules:", title:"Eggs are potential future rules. When 'hatched', these eggs take the place of the parent rule. The parent rule and its normal children are destroyed."}),
						createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addEgg();},title:"Add Egg"},[
							createElement("img",{className:"resourceIcon plus"+opts.littleButtonSize}),
						]),
						this.eggsNode=createElement("div",{className:"subsection"}),
					]),
				]),
			])
		);}catch(e){log("Rule.init.drawRule: "+e);}

		//list the actions for this rule
		if (isArrayAndNotEmpty(params.actions)) for (var i=0,action; (action=params.actions[i]); i++) {
			this.addAction(action);
		}
		//list the validators for this rule
		if (isArrayAndNotEmpty(params.validators)) for (var i=0,validator; (validator=params.validators[i]); i++) {
			this.addValidator(validator);
		}
		//list the kids for this rule
		if (isArrayAndNotEmpty(params.kids)) for (var i=0,kid; (kid=params.kids[i]); i++) {
			this.addChild(kid);
		}
		//list the egg kids for this rule
		if (isArrayAndNotEmpty(params.eggs)) for (var i=0,egg; (egg=params.eggs[i]); i++) {
			this.addEgg(egg);
		}
				
		//create cleanup function
		this.cleanup=function(){try{
			for (var t in this.timers) {
				window.clearTimeout(this.timers[t]);
			}
			for (var i in this.intervals) {
				window.clearInterval(this.intervals[i]);
			}
			var self=this;
			removeEventListener("beforeunload",self.cleanup,false);
		}catch(e){log("Rule.cleanup: "+e);}};
		addEventListener("beforeunload",self.cleanup,false);
		
		this.onEvent("onRuleCreated");
		return self;

	}catch(e){log("Rule.init: "+e);}};

//***************************************************************************************************************************************
//***** App Object
//***************************************************************************************************************************************
	var App = function(params){try{
		this.objType="app";
		var self=this;
	
		//expected: id, name, namespace, icon
		params=params||{};

		//create the masterswitch
		var testms=quickOpts.masterSwitch[params.appID];
		quickOpts.masterSwitch[params.appID]=(testms==null||testms=="undefined")?true:testms;

		//set defaults
		this._enabled=quickOpts.masterSwitch[params.appID]||false;
		this._paused=false;
		this.tests={};
		this.typesPaused=[];
		this.pausedTypesListNodes={};
		this._acceptCount=0;
		this._failCount=0;
		this.node=null;
		this.expanded=false;
		this.kids=[]; //contains additional filtered apps
		
		//setup config for this sidekick
		this.opts = {};
		this.config = new Config({
			storageName:"settings_"+params.appID+"_"+(quickOpts.useGlobalSettings?"global":profile),
			onSave:main.onSave,
			title:"FB Wall Manager "+version+(quickOpts.useGlobalSettings?" (!! Global Settings !!)":""),
			logo:createElement("span",{}[
				createElement("img",{className:"logo",src:"",textContent:"v"+version}),
				createElement("text","v"+version)
			]),
			css:(
				wmConsole.dynamicIcons()+
				jsForms.globalStyle()
			),
			settings:{
				btn_useGlobal:{
					type:"button",
					label:"Use Global Settings", 
					title:"Switch to using a global storage for settings. Those settings can then be used by other accounts (not browser profiles).",
					script:function(){
						if (quickOpts.useGlobalSettings||false) {
							//already using global settings
							return;
						}
						if (confirm("Switch to using global (shared) settings?")){
							quickOpts.useGlobalSettings=true;
							main.saveQuickOpts();
							this.config.title = "FB Wall Manager "+version+" (!! Global Settings !!))";
							this.config.storageName = "settings_"+params.appID+"_global";
							this.config.values=this.config.read();
							this.config.configure();
							this.config.reload();
						}
					},
				},
				btn_useOwnProfile:{
					type:"button",
					label:"Use Profile Settings", 
					title:"Switch to using your own profile storage for settings.",
					script:function(){
						if (!(quickOpts.useGlobalSettings||false)) {
							//already using profile settings
							return;
						}
						if (confirm("Switch to using your own profile settings?")){
							quickOpts.useGlobalSettings=false;
							main.saveQuickOpts();
							this.config.title = "FB Wall Manager "+version;
							this.config.storageName = "settings_"+params.appID+"_"+profile;
							this.config.values=this.config.read();
							this.config.configure();
							this.config.reload();
						}
					},
				},
			
			},
		});
		
		//setup user defined accept texts
		try{
			if (quickOpts.userDefinedTypes) {
				this.userDefinedTypes=quickOpts.userDefinedTypes[params.appID]||{};
			} else {
				quickOpts.userDefinedTypes={};
				quickOpts.userDefinedTypes[params.appID]={};
				main.saveQuickOpts();
			}
		}catch(e){log("App.init: userDefinedTypes: "+e);}

		//use passed params
		for (var p in params) this[p]=params[p];

		//enable/disable all sidekick functions
		this.enable=function(){try{this.enabled=true;}catch(e){log("App.enable: "+e);}};
		this.disable=function(){try{this.enabled=false;}catch(e){log("App.disable: "+e);}};
		this.toggle=function(){try{this.enabled=!this.enabled;}catch(e){log("App.toggle: "+e);}};

		//pause collection for this app
		this.pause=function(){try{this.paused=true;}catch(e){log("App.pause: "+e);}}
		this.unPause=function(){try{this.paused=false;}catch(e){log("App.unPause: "+e);}}

		//user defined types
		this.addUDT=function(params,drawOnly){try{
			//validate params or ask for input
			if (!exists(params) || !params.id) {
				params=params||{};
				var udtname=prompt("Enter the text name of the bonus type you wish to make (ie 'Horse')\n","");
				var udtid=this.appID+udtname.noSpaces().toLowerCase();
				udtid=prompt("OK, your type will read as '"+udtname+"'.\nNow modify this bonus type code to suit your needs.\n\nTip: You should prefix this code with the appID '"+this.appID+"', but it is not required.\nTip: Most sidekicks use lowercase and no spaces, but again, this is not a requirement.\n", udtid);
				if (udtid.trim()){
					params.id=udtid.trim();
					params.name=udtname;
				} else {
					alert("You supplied a blank user defined type ID. No type was created.");
					return false;
				}
			}
			if (!drawOnly){
				this.userDefinedTypes[params.id]=params.name;
				quickOpts.userDefinedTypes[this.appID]=this.userDefinedTypes;
				main.saveQuickOpts();
			}
			
			//draw the udt node
			if (this.udtNode){
				this.udtNode.appendChild(
					createElement("div",{className:"listItem"},[
						createElement("label",{textContent:params.id+" : "}),
						createElement("input",{value:params.name,title:"The display name of this type, used wherever bonus types are identified or selected.", onchange:function(){
							self.userDefinedTypes[params.id]=this.value;
							quickOpts.userDefinedTypes[self.appID]=self.userDefinedTypes;
							main.saveQuickOpts();
						}}),
						createElement("div",{className:"littleButton oddOrange", title:"Remove User-Defined Type"},[
							createElement("img",{className:"resourceIcon trash" +opts.littleButtonSize,onclick:function(){
								var ask=opts.appsConfirmDeleteUDT;
								if (!ask || (ask && confirm("Delete User Defined Type?"))) {
									delete self.userDefinedTypes[params.id];
									quickOpts.userDefinedTypes[self.appID]=self.userDefinedTypes;
									main.saveQuickOpts();
									remove (this.parentNode.parentNode);
								}
							}})
						]),
						(this.accText[params.id]||null)?createElement("span",{title:"The type id you created exactly matches one provided by the sidekick for this app. If you did not intend to overwrite that bonus's display text, you may wish to create another type id and destroy this one.",style:"color:red;",textContent:"Overwrites a sidekick-provided bonus type id."}):null,
					])
				);
			}			
		}catch(e){log("App.addUDT: "+e);}}

		//unpause all bonus types for this app
		this.unpauseAllTypes=function(){try{
			for (var i=this.typesPaused.length-1;i>=0;i--){
				main.unPauseByType(this,this.typesPaused[i]);
			}
		}catch(e){log("App.unpauseAllTypes: "+e);}};


		//mass set priority for entire app post collection
		this.setPriority=function(n){try{
			for (var p in posts) {
				var post=posts[p];
				if (post.app==this) post.setPriority(n);
			}
		}catch(e){log("App.setPriority: "+e);}};

		//mass set priority for all posts of type
		this.setPriorityByType=function(w,n){try{
			for (var p in posts) {
				var post=posts[p];
				if (post.app==this && post.which==w) post.setPriority(n);
			}
		}catch(e){log("App.setPriorityByType: "+e);}};
		
		//reset accept/fail counters
		this.resetCounter=function(){try{
			this.acceptCount=0; 
			this.failCount=0;
		}catch(e){log("App.resetCounter: "+e);}};

		//reset all config options for this app
		//except those outside the standard branch (dontsteal,blockautolike,etc.)
		this.resetConfig=function(){try{
			var ask=opts.configConfirmRestore;
			if (!ask || (ask && confirm("Restore sidekick settings to defaults?"))) {
				this.config.configure({reset:true});
				this.config.save();
			}
		}catch(e){log("App.resetConfig: "+e);}};		
		
		//fetch posts only for this app
		//normally used for initial fetching only
		this.fetchPosts=function(){try{
			main.fetch({bypassPause:true, apps:this});
		}catch(e){log("App.fetchPosts: "+e);}};

		this.fetchNewer=function(){try{
			main.fetch({
				prev:true,
				apps:this,
				bypassPause:true,
				bypassAppDisabled:true,
			});
		}catch(e){log("App.fetchNewer: "+e);}};

		this.fetchOlder=function(){try{
			main.fetch({
				next:true,
				apps:this,
				bypassPause:true,
				bypassAppDisabled:true,
			});
		}catch(e){log("App.fetchOlder: "+e);}};

		//get a list of posts for this app from the global posts list
		this.__defineGetter__("posts",function(){try{
			return matchByParam(posts,"app",this,"object");
		}catch(e){log("App.getPosts: "+e);}});
		
		//detect if this sidekick said it was chrome compatible
		this.__defineGetter__("isVer3",function(){try{
			return this.flags.postMessageCompatible || this.flags.worksInChrome;
		}catch(e){log("App.isVer3: "+e);}});

		//detect if is paused
		this.__defineGetter__("paused",function(){try{
			return this._paused;
		}catch(e){log("App.paused: "+e);}});
		this.__defineSetter__("paused",function(v){try{
			this._paused=v;
			//update the sidekick page button graphics
			var btn=this.pauseButtonNode;
			if (btn) {
				var btnSize=opts.littleButtonSize;
				with (btn.parentNode) 
					className=className.swapWordB(this._paused,"oddGreen","oddOrange");
				with (btn) 
					className=className.swapWordB(this._paused,"playRight"+btnSize,"pause"+btnSize);
			}
			//do events
			if (this._paused) Priority.doEvent("onAppPaused",this);
			else Priority.doEvent("onAppUnpaused",this);			
		}catch(e){log("App.paused: "+e);}});
		
		//detect if is enabled
		this.__defineGetter__("enabled",function(){try{
			return this._enabled;
		}catch(e){log("App.enabled: "+e);}});
		this.__defineSetter__("enabled",function(v){try{
			this._enabled=v;
			
			//update the quickopts
			quickOpts.masterSwitch[this.appID]=this._enabled;
			main.saveQuickOpts();
			
			//update the sidekick page graphics
			if (this.toggleNode) this.toggleNode.checked=this._enabled;
			if (this.node) with (this.node){
				className=className.swapWordB(this._enabled,"enabled","disabled");
			}
			
			//do events
			if (this._enabled) Priority.doEvent("onAppEnabled",this);
			else Priority.doEvent("onAppDisabled",this);
		}catch(e){log("App.enabled: "+e);}});
				
		this.__defineGetter__("acceptCount",function(){try{
			return this._acceptCount;
		}catch(e){log("App.acceptCount: "+e);}});
		this.__defineSetter__("acceptCount",function(v){try{
			this._acceptCount=v;
			if (this.acceptCounterNode) this.acceptCounterNode.textContent=v;
		}catch(e){log("App.acceptCount: "+e);}});
		
		this.__defineGetter__("failCount",function(){try{
			return this._failCount;
		}catch(e){log("App.failCount: "+e);}});
		this.__defineSetter__("failCount",function(v){try{
			this._failCount=v;
			if (this.failCounterNode) this.failCounterNode.textContent=v;
		}catch(e){log("App.failCount: "+e);}});

		this.__defineGetter__("totalCount",function(){try{
			return this._failCount+this._acceptCount;
		}catch(e){log("App.totalCount: "+e);}});

		//detect if this app is bundled with another app
		//return the main app in this bundle
		this.__defineGetter__("synApp",function(){try{
			return this.parent||this;
		}catch(e){log("App.synApp: "+e);}});
		
		this.toggleContent=function(){try{
			this.expanded=!this.expanded;
			var btnSize=opts.littleButtonSize;
			with (this.contentNode)
				className=className.swapWordB(this.expanded,"expanded","collapsed");
			with (this.toggleImgNode)
				className=className.swapWordB(this.expanded,"treeCollapse"+btnSize,"treeExpand"+btnSize);
		}catch(e){log("App.toggleContent: "+e);}};

		this.showConfig=function(){try{
			this.config.open();
		}catch(e){log("App.showConfig: "+e);}};

		this.disableOpt=function(w){try{
			this.opts[w]=false;
			this.config.set(w,false);
			this.config.save();
		}catch(e){log("App.disableOpt: "+e);}};

		this.enableOpt=function(w){try{
			this.opts[w]=true;
			this.config.set(w,true);
			this.config.save();
		}catch(e){log("App.enableOpt: "+e);}};
		
		//add menu elements
		try{
			/* no longer used in WM3
			if (this.menu) {
				//prefix all menu elements with the appID
				this.menu=Dock.fixMenu(this.menu,this.appID);
				//append this app's menu settings
				this.settingsBranch=userConfig.append({branch:"wmtab_games",data:this.menu});
			}
			//prefix all test returns with the appID
			Dock.fixTests(this.tests,this);
			//prefix all accept text id's with the appID
			Dock.fixAcceptTexts(this);
			*/
			
			//new method
			if (this.menu) this.config.append({data:this.menu});
			
			//I should really move these into the sidekick realm
			var data={}; 
			data["dynamic"+this.appID]=checkBox(this.name+" ("+this.appID+")",true);
			userConfig.append({branch:"enableDynamic",data:data});

			data={}; data[this.appID+"dontsteal"]=checkBox(this.name);
			userConfig.append({branch:"dontstealBlock",data:data});
			
			data={}; data["hide"+this.appID]=checkBox(this.name);
			userConfig.append({branch:"filterapps",data:data});
			
			data={}; data["nolike"+this.appID]=checkBox(this.name);
			userConfig.append({branch:"blockautolikebygame",data:data});
		} catch(e) {log("App.init:addMenuElements: "+e);};
					
		//draw to #sidekickList (wmConsole.sidekickNode)
		try{
			wmConsole.sidekickNode.appendChild(
				this.node=createElement("div",{className:"listItem "+((this.enabled)?"enabled":"disabled")},[
					createElement("div",{className:"line"},[
						createElement("div",{className:"littleButton",title:"Toggle Content",onclick:function(){self.toggleContent();}},[
							this.toggleImgNode=createElement("img",{className:"resourceIcon "+(this.expanded?"treeCollapse"+opts.littleButtonSize:"treeExpand"+opts.littleButtonSize)}),
						]),
						this.toggleNode=createElement("input",{type:"checkbox",checked:this.enabled,onchange:function(){
							self.enabled=this.checked;
							with (self.node) className=className.toggleWordB(!this.checked,"disabled");
						}}),
						(this.icon)?createElement("img",{className:"icon crisp", src:this.icon,style:"width: 32px;vertical-align: middle"}):null,
						createElement("label",{textContent: this.name}),
						
						//toolbox
						createElement("div",{className:"littleButton odd"+(this.paused?"Green":"Orange"), title:"Pause/Unpause"},[
							this.pauseButtonNode=createElement("img",{className:"resourceIcon "+(this.paused?"playRight":"pause")+opts.littleButtonSize,onclick:function(){self.paused=!self.paused;}})]),
						createElement("div",{className:"littleButton oddBlue", title:"Reset config for this app"},[
							createElement("img",{className:"resourceIcon uncheckAll"+opts.littleButtonSize,onclick:function(){self.resetConfig();}})]),
						createElement("div",{className:"littleButton oddBlue", title:"Fetch Newer Posts"},[
							createElement("img",{className:"resourceIcon rssUpRight"+opts.littleButtonSize,onclick:function(){self.fetchNewer();}})]),
						createElement("div",{className:"littleButton", title:"Fetch Older Posts"},[
							createElement("img",{className:"resourceIcon rssDownLeft" +opts.littleButtonSize,onclick:function(){self.fetchOlder();}})]),
						
						//new sidekick config button
						this.configButton=createElement("button",{textContent:"Options", onclick:function(){self.config.open();}}),
					]),
					this.contentNode=createElement("div",{className:"subsection "+(this.expanded?"expanded":"collapsed")},[
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"App ID:"}),
							createElement("span",{textContent:this.appID}),
						]),
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Support Provided By:"}),
							(this.desc)?createElement("span",{textContent: this.desc}):null, //provided in sidekick block
						]),
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Sidekick Help Link:"}),
							(this.helpLink)?createElement("a",{href:this.helpLink,textContent:this.helpLink}):null, //provided in sidekick block
						]),
						//browsers supported
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Browsers Supported:",style:"vertical-align:top;"}),
							createElement("img",{className:"resourceIcon firefox16", style:"display:inline-block;",title:"FireFox"}),
							(this.isVer3)?createElement("img",{className:"resourceIcon chrome16", style:"display:inline-block;",title:"Google Chrome"}):null,
						]),
						//types paused subbox
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Types Paused:",title:"This is a list of bonus types that are currently paused for this app."}),
							createElement("div",{className:"littleButton oddGreen",onclick:function(){self.unpauseAllTypes();},title:"Unpause all types by this app."},[
								createElement("img",{className:"resourceIcon playRight"+opts.littleButtonSize}),
							]),
							this.typesPausedNode=createElement("div",{className:"subsection"}),
						]),				
						//attached apps
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Attached Apps:",title:"Additional apps filtered and processed by this sidekick."}),
							this.filtersNode=createElement("div",{className:"subsection"}),
						]),
						//helpers subbox
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"Helpers:",title:"Sidekick helpers"}),
							this.helpersNode=createElement("div",{className:"subsection"}),
						]),
						//user defined types subbox
						createElement("div",{className:"line"},[
							createElement("label",{textContent:"User-Defined Types:",title:"User Defined Types ('which')"}),
							createElement("div",{className:"littleButton oddGreen",onclick:function(){self.addUDT();},title:"Add New User Defined Type"},[
								createElement("img",{className:"resourceIcon plus"+opts.littleButtonSize}),
							]),
							this.udtNode=createElement("div",{className:"subsection"}),
						]),
					]),
				])
			);
		}catch(e){log("App.init:addSidekickElement: "+e);};
		
		//create feed filters for this app
		try{
			var feeds=FeedManager.feeds;
			for (var f=0,len=feeds.length;f<len;f++){
				feeds[f].addFilter({id:"app_"+this.appID});
			}
		}catch(e){log("App.init:createFeedFilters: ")+e;}

		//draw to collection filter coolbar
		try{
			//create game filter buttons on the wmConsole
			var coolBar = wmConsole.collectTabControl;
			if (coolBar) {
				//add a tab for this filter
				var tab = coolBar.addTab({
					text:(this.name||""),
					image:(this.icon||null),
					appFilter:this.appID,
					onSelect:main.setAppFilter,
					selected:(quickOpts.filterApp==this.appID),
				});
				this.collectionTabNode=tab.buttonNode;
				
				//force the image to have the 'crisp' drawing style
				tab.buttonNode.childNodes[0].className="icon crisp";
				
				//add accept/fail counters
				this.failCount=0;
				this.acceptCount=0;
				tab.buttonNode.insertBefore(
					createElement("div",{className:"accFailBlock"},[
						this.failCounterNode=createElement("span",{className:"fail",textContent:"0"}),
						this.acceptCounterNode=createElement("span",{className:"accept",textContent:"0"}),
					])
				, tab.textNode);
			}
		} catch(e) {log("App.init:addConsoleElement: "+e);};
		
		//show additional filtered apps
		try{
			if (isArrayAndNotEmpty(this.addFilters)) {
				for (var f,filt;(filt=this.addFilters[f]);f++){
					//create an app object for this filter
					filt.parent=this;
					this.kids.push(new App(filt));
					if (this.filtersNode) this.filtersNode.appendChild(
						createElement("div",{className:"line"},[
							createElement("img",{className:"icon crisp", src:filt.icon||null}),
							createElement("text",filt.name),
						])
					);
				}
			}
		} catch(e) {log("App.init:addFilteredApps: "+e);};
		
		//draw my user defined types
		try{
			for (var u in this.userDefinedTypes){
				this.addUDT({id:u,name:this.userDefinedTypes[u]},true);
			}
		}catch(e){log("App.init: drawUDTs: "+e);}
		
		//do events
		Priority.doEvent("onSidekickReady",this);
		
		return self;
	}catch(e){log("App.init: "+e);}};

//***************************************************************************************************************************************
//***** Post Object
//***************************************************************************************************************************************
	var Post = function(params){try{
		this.objType="post";
		var self=this;
		params=params||{};

		//set defaults
		this.state=""; //classnames
		this.flags=0; //similar to classnames
		this.node=null; //collector panel node
		this.originalData=mergeJSON(params); //clone the original data from facebook for viewing later

		//set a timer on the post for delayed deletion
		this.drawTime=timeStamp();
		
		this._isLiked=false;
		this._isPinned=false;
		this._isPaused=false;
		this._isScam=false;
		this._isW2W=false;
		this._isForMe=false;
		this._isMyPost=false;
		this._isWishlist=false;
		this._isUndefined=false;
		this._status=0;
		this._isTimeout=false;
		this._isFailed=false;
		this._isAccepted=false;
		this._isExcluded=false;
		this._isStale=false;
		this._isCollect=false;
		this._isWorking=false;
		this._which=null;
		this._idText="";
		
		//use passed params
		for (var p in params) this[p]=params[p];

		//link to our application array of objects
		this.app=apps[this.application.id];

		//shortcuts to app details
		this.__defineGetter__("synApp",function(){try{
			return this.app.synApp;
		}catch(e){log("Post.synApp: "+e);}});

		this.__defineGetter__("postedDay",function(){try{
			var d=new Date(this.date*1000);
			return d.getFullYear()+"/"+d.getMonth()+"/"+d.getDay();
		}catch(e){log("Post.postedDay: "+e);}});

		this.__defineGetter__("postedHour",function(){try{
			var d=new Date(this.date*1000);
			var h=d.getHours();
			var pm=(h/12)>1;
			return d.getFullYear()+"/"+d.getMonth()+"/"+d.getDay()+"   "+((h>12)?h-12:h)+":00"+((pm)?"PM":"AM");
		}catch(e){log("Post.postedHour: "+e);}});

		this.__defineGetter__("appID",function(){try{
			return this.app.appID;
		}catch(e){log("Post.appID: "+e);}});

		this.__defineGetter__("appName",function(){try{
			return this.app.name;
		}catch(e){log("Post.appName: "+e);}});

		//get/set priority
		this.__defineGetter__("priority",function(){try{
			return this._priority;
		}catch(e){log("Post.priority: "+e);}});
		this.__defineSetter__("priority",function(v){try{
			this._priority=v;
		}catch(e){log("Post.priority: "+e);}});

		//get/set liked status
		this.__defineGetter__("isLiked",function(){try{
			return this._isLiked;
		}catch(e){log("Post.isLiked: "+e);}});
		this.__defineSetter__("isLiked",function(v){try{
			this._isLiked=v;
			//remove the toolbutton if liked
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isLiked,"liked");
			if (this.likeButtonNode) with (this.likeButtonNode)
				className=className.toggleWordB(this._isLiked,"hidden");
		}catch(e){log("Post.isLiked: "+e);}});

		//identification flags
		this.__defineGetter__("isScam",function(){try{
			return this._isScam;
		}catch(e){log("Post.isScam: "+e);}});
		this.__defineSetter__("isScam",function(v){try{
			this._isScam=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isScam,"scam");
		}catch(e){log("Post.isScam: "+e);}});

		this.__defineGetter__("isMyPost",function(){try{
			return this._isMyPost;
		}catch(e){log("Post.isMyPost: "+e);}});
		this.__defineSetter__("isMyPost",function(v){try{
			this._isMyPost=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isMyPost,"isMyPost");
		}catch(e){log("Post.isMyPost: "+e);}});

		this.__defineGetter__("isW2W",function(){try{
			return this._isW2W;
		}catch(e){log("Post.isW2W: "+e);}});
		this.__defineSetter__("isW2W",function(v){try{
			this._isW2W=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isW2W,"w2w");
		}catch(e){log("Post.isW2W: "+e);}});

		this.__defineGetter__("isForMe",function(){try{
			return this._isForMe;
		}catch(e){log("Post.isForMe: "+e);}});
		this.__defineSetter__("isForMe",function(v){try{
			this._isForMe=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isForMe,"isForMe");
		}catch(e){log("Post.isForMe: "+e);}});

		this.__defineGetter__("isWishlist",function(){try{
			return this._isWishlist;
		}catch(e){log("Post.isWishlist: "+e);}});
		this.__defineSetter__("isWishlist",function(v){try{
			this._isWishlist=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isWishlist,"wishlist");
		}catch(e){log("Post.isWishlist: "+e);}});

		this.__defineGetter__("isUndefined",function(){try{
			return this._isUndefined;
		}catch(e){log("Post.isUndefined: "+e);}});
		this.__defineSetter__("isUndefined",function(v){try{
			this._isUndefined=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isUndefined,"noDef");
		}catch(e){log("Post.isUndefined: "+e);}});

		this.__defineGetter__("isStale",function(){try{
			return this._isStale;
		}catch(e){log("Post.isStale: "+e);}});
		this.__defineSetter__("isStale",function(v){try{
			this._isStale=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isStale,"stale");
		}catch(e){log("Post.isStale: "+e);}});

		this.__defineGetter__("isTimeout",function(){try{
			return this._isTimeout;
		}catch(e){log("Post.isTimeout: "+e);}});
		this.__defineSetter__("isTimeout",function(v){try{
			this._isTimeout=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isTimeout,"timeout");
		}catch(e){log("Post.isTimeout: "+e);}});

		this.__defineGetter__("isCollect",function(){try{
			return this._isCollect;
		}catch(e){log("Post.isCollect: "+e);}});
		this.__defineSetter__("isCollect",function(v){try{
			this._isCollect=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isCollect,"collect");
		}catch(e){log("Post.isCollect: "+e);}});

		this.__defineGetter__("isExcluded",function(){try{
			return this._isExcluded;
		}catch(e){log("Post.isExcluded: "+e);}});
		this.__defineSetter__("isExcluded",function(v){try{
			this._isExcluded=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isExcluded,"excluded");
		}catch(e){log("Post.isExcluded: "+e);}});

		this.__defineGetter__("isAccepted",function(){try{
			return this._isAccepted;
		}catch(e){log("Post.isAccepted: "+e);}});
		this.__defineSetter__("isAccepted",function(v){try{
			this._isAccepted=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isAccepted,"accepted");
		}catch(e){log("Post.isAccepted: "+e);}});

		this.__defineGetter__("isFailed",function(){try{
			return this._isFailed;
		}catch(e){log("Post.isFailed: "+e);}});
		this.__defineSetter__("isFailed",function(v){try{
			this._isFailed=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isFailed,"failed");
		}catch(e){log("Post.isFailed: "+e);}});

		this.__defineGetter__("isWorking",function(){try{
			return this._isWorking;
		}catch(e){log("Post.isWorking: "+e);}});
		this.__defineSetter__("isWorking",function(v){try{
			this._isWorking=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isWorking,"working");
		}catch(e){log("Post.isWorking: "+e);}});

		this.__defineGetter__("isColored",function(){try{
			return this._isColored;
		}catch(e){log("Post.isColored: "+e);}});
		this.__defineSetter__("isColored",function(v){try{
			this._isColored=v;
			if (this._isColored && this.colorOverride && this.node) this.node.style.setProperty("background-color",this.colorOverride,"important");
		}catch(e){log("Post.isColored: "+e);}});
		
		//get/set post pinned
		this.__defineGetter__("isPinned",function(){try{
			return this._isPinned;
		}catch(e){log("Post.isPinned: "+e);}});
		this.__defineSetter__("isPinned",function(v){try{
			this._isPinned=v;
			//rotate the pin icon
			var btnSize=opts.littleButtonSize;
			if (this.pinImageNode) with (this.pinImageNode) 
				className=className.swapWordB(this._isPinned,"pinned"+btnSize,"pin"+btnSize);
			//pinned class
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isPinned,"pinned");
		}catch(e){log("Post.isPinned: "+e);}});

		//get/set post paused
		this.__defineGetter__("isPaused",function(){try{
			return this._isPaused;
		}catch(e){log("Post.isPaused: "+e);}});
		this.__defineSetter__("isPaused",function(v){try{
			this._isPaused=v;
			if (this.node) with (this.node) 
				className=className.toggleWordB(this._isPaused,"paused");
		}catch(e){log("Post.isPaused: "+e);}});

		//get/set status
		this.__defineGetter__("status",function(){try{
			return this._status;
		}catch(e){log("Post.status: "+e);}});
		this.__defineSetter__("status",function(v){try{
			this._status=v;
			if (this.statusTextNode) this.statusTextNode.textContent=this._status;
		}catch(e){log("Post.status: "+e);}});

		//get/set idText
		this.__defineGetter__("idText",function(){try{
			return this._idText;
		}catch(e){log("Post.idText: "+e);}});
		this.__defineSetter__("idText",function(v){try{
			this._idText=v;
			if (this.linkNode) this.linkNode.textContent=((this._idText||null) && opts.debugrecog)?this._idText:this.linkText;
		}catch(e){log("Post.idText: "+e);}});
		
		//get/set which bonus type this is
		this.__defineGetter__("which",function(){try{
			return this._which;
		}catch(e){log("Post.which: "+e);}});
		this.__defineSetter__("which",function(v){try{
			this._which=v;
			if (this.whichTextNode) this.whichTextNode.textContent=this._which;
		}catch(e){log("Post.which: "+e);}});

		//check if in history already
		this.__defineGetter__("alreadyProcessed",function(){try{
			return exists(history[this.id]);
		}catch(e){log("Post.alreadyProcessed: "+e);}});
		
		//update the namespace parameter if it does not exist
		if (!exists(this.app.namespace)) this.app.namespace=this.application.namespace;

		//validate the application namespace for sidekicks that provide namespace checking
		if (exists(this.app.namespace) && (this.app.namespace!=this.application.namespace)) {
			//Graph API namespace does not match sidekick known namespace, flag as scam
			this.isScam=true; 
		}

		//now drop the application object we got from FB
		if (exists(this.application)) delete this.application;
		
		//shorten the poster data
		if (exists(this.from)){
			this.fromID=this.from.id;
			this.fromName=this.from.name;
			this.fromNameLastFirst=this.fromName;
			var sp=this.fromName.split(" ");
			if (isArray(sp) && sp.length>1) {
				this.fromNameLastFirst = sp.pop()+", "+sp.join(" ");
			}
			delete this.from;
		}
		
		//(re)identify this post
		this.identify=function(params){try{
			params=params||{};
			
			//shortcuts
			var post=this;
			var app=post.app;
			var synApp=app.synApp;
		
			//set/reset priority, state, status & flags
			this.priority=50;
			this.status=0;
			this.state="";
			
			//prevent reset of some data holders
			if (!params.reid) {
				this.testData={};
				this.isLiked=false;
				this.isMyPost=false;
				this.isW2W=false;
				this.isForMe=false;
				this.isScam=false;
			}
			
			//reset data holders
			this.isStale=false;
			this.isCollect=false;
			this.isExcluded=false;
			this.isFailed=false;
			this.isAccepted=false;
			this.isPaused=false;
			this.isPinned=false;
			this.isUndefined=false;
			this.isWishlist=false;
			this.isTimeout=false;
			
			//avoid posts that belong to a disabled sidekick
			if(!quickOpts.masterSwitch[app.appID]) {
				//master switch is off
				this.isExcluded=true;
				return true; //draw without identifying anything
			}

			//hide posts by apps that we specifically told to hide
			if (opts["hide"+app.appID]) {this.remove(); return false;}

			//avoid potential scam posts
			if (opts.scamblock) {
				if (!params.reid) {
					this.isScam=(!this.linkHref.match(new RegExp("^http(s):\/\/apps\.facebook\.com\/"+app.namespace))!=null);
				}
				if (this.isScam){
					this.isExcluded=true;
					if (opts.hidescams) {this.remove(); return false;}
				}
			}

			//avoid posts by self
			if (!params.reid) {
				var whoPosted = this.fromID;
				var whoName = this.fromName;
				this.isMyPost=(whoPosted==userID);
			}
			if (this.isMyPost){
				this.isExcluded=true;
				if (opts.hidemyposts) {this.remove(); return false;}
			}

			//avoid W2W posts not for me
			if (!params.reid){
				this.isForMe = this.getTargets().inArray(userID);
				this.isW2W = this.getTargets().length>0;
			}
			if (opts[app.appID+"dontsteal"] && this.isW2W && !this.isForMe){
				this.isExcluded=true;
				if (opts.hidenotforme) {this.remove(); return false;}
			}

			//avoid posts older than olderLimit
			if (olderLimit!=0) {
				if (this.isStale=this.checkStale(olderLimit)){
					if (opts.skipstale) this.isExcluded=true;
					if (opts.hidestale) {this.remove(); return false;}
				}
			}

			//get bonus type
			var w=(this.which = main.which(this,{reid:params.reid}));

			//check for exclude type
			if (w=="exclude") {
				this.isExcluded=true;
			}

			//check for pause
			if(synApp.typesPaused.inArray(w)) this.isPaused=true;
			
			//check if undefined
			if (w=="none") {
				this.isUndefined=true;
			}
			if (w==synApp.appID+"doUnknown" || w==synApp.appID+"send") {
				this.isUndefined=true;
			}

			//special pin undefined option
			if (opts.pinundefined && this.isUndefined) this.isPinned=true;

			//check if liked by me
			if (this.getLikes().inArray(userID)){
				this.isLiked=true;
				if (opts.skipliked){
					if (opts.markliked) this.status=1; //mark liked as accepted
					this.isExcluded=true;
				}
				if (opts.hideliked) {this.remove(); return false;}
			}

			//check history
			this.status=this.status||0;
			if (this.alreadyProcessed) {
				//post previously processed
				this.status=(history[this.id].status||0);

				var gotItem=((this.status>0) || (this.status==-6) || (this.status==-4) || (this.status==-15 && opts.accepton15));
				if (gotItem) {
					this.isAccepted=true;
				} else if (this.status<0) {
					this.isFailed=true;
				}

				if (opts.hideaccepted && gotItem) {this.remove(); return false;}
				if (opts.hidefailed && this.status<0) {this.remove(); return false;}
			}

			//check if excluded
			if (this.isExcluded && opts.hideexcluded) {this.remove(); return false;}

			//set identified text
			this.idText=main.getAccText(synApp.appID,w,(this.alreadyProcessed),this.status);

			//check if wanted
			this.isCollect=(!this.alreadyProcessed && 
				(w=="dynamic" || apps[this.synApp.appID].opts[w] || 
					(w.startsWith("send") && apps[this.synApp.appID].opts["sendall"])
				)
			);

			//check if wishlist
			if (w.find("wishlist")) {
				this.isWishlist=true;
				if (opts.hideunwanted && !opts.donthidewishlists) {this.remove(); return false;}
			}
			
			//if unwanted
			if (!this.isCollect && opts.hideunwanted) {this.remove(); return false;}
			
			//return true to draw, false to hide
			return true;
			
		}catch(e){log("Post.identify: "+e);}};

		//open this post using the collector system
		this.open=function(params){try{
			params=params||{};
			var post = this;
			var id = this.id;
			var app = this.app;
			var synApp = this.synApp;

			//perform the onBefore Collect event
			Priority.doEvent("onBeforeCollect",post);

			//fix the link based on sidekick alterlink information
			var alterLink=(synApp.alterLink||null);
			var targetHref = post.linkHref;
			var doAlterLink=(synApp.flags.alterLink||false);
			if (doAlterLink && alterLink) {
				//alert("doing alterlink...");
				//pack the alterlink into an array, or detect an array
				if (!isArray(alterLink)) alterLink=[alterLink];
				
				//iterate link alteration commands
				for (var alt=0,alteration;(alteration=alterLink[alt]);alt++) {
				
					//alert("making alteration...");
							
					//note that only find and replace functionality is available right now, no wildcards or array inserts will work
					var find = (alteration.find||"");
					alteration.dataSource=(alteration.dataSource||"either");
					
					//check if user is wanting a regex or string replacement
					if (alteration.isRegex||false) find=new RegExp(find,"");
										
					targetHref = targetHref.replace(find,(alteration.replace||""));


					//check for word specific changes
					if ((alteration.words||null) && (alteration.conversionChart||null)){
						//alert("inserting words...");
						
						//new alterlink capability to change data source from 'either' to another post part
						var dataSource = post.testData[alteration.dataSource].toLowerCase();
						
						//alert(dataSource);
						
						for (var w=0,len=alteration.words.length; w<len; w++) {
							var word=(alteration.words[w]).toLowerCase();
							if (dataSource.contains(word)) {
								//replace the word
								targetHref=targetHref.replace("{%1}",alteration.conversionChart[word.noSpaces()]);
								break;
							}
						}
					}
				
				}
			}

			//fix the link, removing https and switching to http only
			targetHref = targetHref.replace('https://','http://');

			//open the bonus page in a new tab or the previously opened tab object to save memory
			this.isWorking=true;
			post.state="working";
			main.requestsOpen++;
			doAction(function(){Collector.open({url:targetHref,id:id,callback:(synApp.isVer3?main.onFrameLoad3:main.onFrameLoad),post:post,first:params.first||false,emergency:params.emergency||false});});
		}catch(e){log("Post.open: "+e);}};

		//open this post using the collector system even if already tried
		this.forceOpen=function(params){try{
			var post=self;
			this.isCollect=true;
			this.isFailed=false;
			this.isTimeout=false;
			this.isAccepted=false;
			post.open(params);
		}catch(e){log("Post.forceOpen: "+e);}};

		//like this post using the collector system
		this.like=function(){try{
			//var url=this.actionLink("Like");
			var self=this;
			//setTimeout(function(){Collector.open({url:url+"#likeit=true",id:url,callback:main.onLikePost,post:self});},100);
			//Graph.likePost(this.id,{callback:main.onLikePost,post:self});
			setTimeout(function(){Graph.likePost(self.id,{callback:main.onLikePost,post:self});},100);
		}catch(e){log("Post.like: "+e);}};

		//comment on this post using the collector system
		this.comment=function(commentOverride){try{
			if (commentOverride=="") commentOverride = null;
			//not ready
			//confirm("Feature not ready");
			//return;
			//var url=this.actionLink("Like");
			var self=this;
			var say = commentOverride || opts.autocommentlist.split("\n").pickRandom();
			//setTimeout(function(){Collector.open({url:url+"#commentit=true&say="+say,id:url,callback:main.onLikePost,post:self});},100);
			log("commenting "+say);
			//Graph.commentPost(this.id,say);
			setTimeout(function(){Graph.commentPost(self.id,say);},100);
		}catch(e){log("Post.comment: "+e);}};

		//cancel collection in progress
		this.cancelProcess=function(){
			//tell the collector to cancel any processes with post equal this
			//this will cancel both collect and like activities
			Collector.cancelProcess({search:"post",find:this});
			this.processCancelled=true;
		},

		//cancel collection in progress
		this.refreshProcess=function(){
			//tell the collector to reload the href on processes with post equal this
			//this will reload both collect and like activities
			Collector.refreshProcess({search:"post",find:this});
			this.processRestarted=true;
		},

		//change the background color of this post
		this.setColor=function(color){try{
			this.colorOverride=color;
			this.isColored=(cBool(color));
		}catch(e){log("Post.setColor: "+e);}};
		
		//change the bonus type of this post
		//and mark it for collection if needed
		//and update its idText
		this.setWhich=function(w){try{
			this.which=w;
			if ((w=="dynamic") || apps[this.synApp.appID].opts[w] || (w.startsWith("send") && apps[this.synApp.appID].opts["sendall"]) ) {
				this.isCollect=!this.alreadyProcessed;
			}
			//update the identified text
			this.idText=main.getAccText(this.synApp.appID,w,(this.alreadyProcessed),this.status);
		}catch(e){log("Post.setWhich: "+e);}};
		
		//get the time passed since this post was created
		this.__defineGetter__("age",function(){try{
			return timeStamp()-(this.date*1000);
		}catch(e){log("Post.age: "+e);}});

		this.__defineGetter__("whichText",function(){try{
			if (this.which=="dynamic") return "Dynamic Grab";
			return this.synApp.userDefinedTypes[this.which]||this.synApp.accText[this.which];
		}catch(e){log("Post.whichText: "+e);}});

		this.draw=function(redraw,reorder){try{
			var post=this;
			var app=post.app;
			var synApp=app.synApp;
			
			//clean old display
			if (this.node && redraw) {
				remove(this.node);
				this.node=null;
			}

			//prefetch css words
			var tags=("")
				.toggleWordB(post.isAccepted,"accepted")
				.toggleWordB(post.isFailed,"failed")
				.toggleWordB(post.isTimeout,"timeout")
				.toggleWordB(post.isExcluded,"excluded")
				.toggleWordB(post.isStale,"stale")
				.toggleWordB(post.isCollect && !(post.isAccepted||post.isFailed),"collect")
				.toggleWordB(post.isWorking,"working")
				.toggleWordB(post.isW2W,"w2w")
				.toggleWordB(post.isForMe,"isForMe")
				.toggleWordB(post.isMyPost,"isMyPost")
				.toggleWordB(post.isColored,"colored")
				.toggleWordB(post.isPaused,"paused")
				.toggleWordB(post.isPinned,"pinned")
				.toggleWordB(post.isUndefined,"noDef")
				.toggleWordB(post.isWishlist,"wishlist")
				.toggleWordB(post.isScam,"scam")
				.toggleWordB(post.isLiked,"liked");
									
			//detect hidden/drawn image
			var hideimage = (opts.hideimages || (opts.hideimagesunwanted && (post.which==="none" || post.which==="exclude") ) );
			var fakeimage = hideimage && quickOpts.displayMode!="0";
			hideimage=hideimage && quickOpts.displayMode=="0";
			
			//shared elements
			if (redraw){
				post.toolboxNode=createElement("div",{className:"toolBox small inline"});
				post.imageNode=createElement("img",{className:((!fakeimage && post.picture)?"":"resourceIcon noImageSmall16"),src:((!fakeimage)?post.picture:""||""),onerror:function(){this.className=this.className+" resourceIcon noImageSmall16"}});
				post.imageLinkNode=(!hideimage)?
					createElement("span",{href:jsVoid,className:"picture",onclick:function(){post.forceOpen();} },[
						post.imageNode
					]):null;
				post.floaterNode=null;
				post.bodyNode=null;
				post.actorNode=createElement("a",{className:"actor",textContent:post.fromName,href:"http://www.facebook.com/profile.php?id="+post.fromID});
				post.titleNode=createElement("span",{className:"title",textContent:post.name});
				post.captionNode=createElement("span",{className:"caption",textContent:post.caption});
				post.descriptionNode=createElement("span",{className:"description",textContent:post.description});
				post.dateNode=createElement("span",{className:"postDate",textContent:post.realtime});
				post.viaNode=createElement("a",{className:"appName",textContent:"  via "+app.name,href:"http://apps.facebook.com/"+app.namespace+"/",title:app.appID});
				post.linkNode=createElement("a",{className:"linkText"+(post.isExcluded?" excluded":"")+(post.idText?" identified":""),textContent:((post.idText||null) && opts.debugrecog)?post.idText:post.linkText,href:post.linkHref,title:post.linkText});
				post.statusNode=createElement("span",{className:"status",textContent:"Status: "+(post.status||"0")+ " " + (main.statusText[post.status||"0"])});
				post.pausedNode=createElement("div",{className:"pausedHover",title:"Collection for this post is paused, click to reactivate.",onclick:function(){post.isPaused=false;}},[createElement("img",{className:"resourceIcon playRight64"})]);
				
				//create the layout
				switch (quickOpts.displayMode||"0"){

					case "0": //classic mode
						post.node=createElement("div",{id:"post_"+post.id,className:"wm post classic "+tags+((hideimage)?" noimage":""),title:(post.isScam?"Post is possible scam":"")},[
							post.toolboxNode,
							post.actorNode,
							post.imageLinkNode,
							(!opts.hidebody)?post.bodyNode=createElement("div",{className:"body"},[
								post.titleNode,
								(post.caption||null)?post.captionNode:null,
								(post.description||null)?post.descriptionNode:null,
							]):null,
							createElement("div",{style:"margin-top:5px;"},[
								(!opts.hidedate)?post.dateNode:null,
								(!opts.hidevia)?post.viaNode:null,
								post.linkNode,
							]),
							post.pausedNode,
						]);
						break;

					case "1": case "3": //short mode and old priority mode
						post.node=createElement("div",{id:"post_"+post.id,className:"wm post short "+opts.thumbsize+tags,title:(post.isScam?"Post is possible scam":"")},[
							post.imageLinkNode,
							post.floaterNode=createElement("div",{id:"floater_"+post.id,className:"floater "+opts.thumbsize},[
								post.toolboxNode,
								post.actorNode,
								post.dateNode,
								post.viaNode,
								post.linkNode,
								post.statusNode,
								post.pausedNode,
							]),
						]);
						post.imageNode.onmousemove=main.moveFloater;
						break;

					case "2": //dev mode
						var fnLine=function(label,text){
							return createElement("div",{className:"line"},[
								createElement("label",{textContent:label+": "}),
								createElement("span",{textContent:text})
							]);
						};
						post.node=createElement("div",{id:"post_"+post.id,className:"listItem wm post dev "+tags,title:(post.isScam?"Post is possible scam":"")},[
							post.idNode=fnLine("id", post.id),
							post.toolboxNode,
							//post.imageLinkNode,
							createElement("div",{className:"subsection"},(function(){
								var ret = [];
								ret.push(post.actorNode=fnLine("fromName (fromID)", post.fromName+"("+post.fromID+")"));
								ret.push(post.titleNode=fnLine("title",post.name));
								if (post.message||null)ret.push(post.messageNode=fnLine("msg",post.message));
								if (post.caption||null)ret.push(post.captionNode=fnLine("caption",post.caption)); 
								if (post.description||null)ret.push(post.descriptionNode=fnLine("desc",post.description)); 
								ret.push(post.appImageNode=fnLine("img",post.picture));
								ret.push(post.dateNode=fnLine("date",post.realtime));
								ret.push(post.appNameNode=fnLine("appName",app.name));
								ret.push(post.appIDNode=fnLine("appID",app.appID));
								ret.push(post.canvasNode=fnLine("canvas",app.namespace));
								ret.push(post.urlNode=fnLine("url",post.linkHref));

								//show likes
								if (post.likes||null){
									if (post.likes.data||null){
										ret.push(fnLine("likes",""));
										ret.push(post.likesNode=createElement("div",{className:"subsection"},(function(){
											var data=post.likes.data;
											var retData=[];
											for(var d=0,lenL=data.length; d<lenL; d++){
												retData.push(fnLine("likeName(likeID)",data[d].name+"("+data[d].id+")"));
											}
											return retData;
										})()));
									}
								}

								//show comments
								if (post.comments||null){
									if (post.comments.data||null){
										ret.push(fnLine("comments",""));
										ret.push(post.commentsNode=createElement("div",{className:"subsection"},(function(){
											var data=post.comments.data;
											var retData=[];
											for(var d=0,lenC=data.length; d<lenC; d++){
												retData.push(fnLine("commentorName(commentorID)",data[d].from.name+"("+data[d].from.id+")"));
												retData.push(fnLine("comment",data[d].message));
											}
											return retData;
										})()));
									}
								}
								ret.push(post.idTextNode=fnLine("idText",post.idText));
								ret.push(post.whichNode=fnLine("which",post.which));
								ret.push(post.linkTextNode=fnLine("linkText",post.linkText));

								return ret;
							})() ),
							post.pausedNode
						]);
						break;
				}

				//add the toolbox
				post.addToolBox();
			
				//use color override
				if (post.colorOverride) {
					post.node.style.setProperty("background-color",post.colorOverride,"important");
				}
			}

			//if a filter exists check against filter
			var filter=(quickOpts.filterApp||"All");
			if (filter!="All" && filter!=app.appID) {
				//dont show this post in this filter
				if (this.node) remove(this.node);
				return;
			}

			//insert the post into view by sort order
			if (redraw || reorder) {
				var groupBy=quickOpts.groupBy;
				if (groupBy){
					//detect/create group
					var group=main.newGroup({by:post[groupBy]});
					var sibling=post.nextSibling();
					if (sibling) group.insertBefore(post.node,sibling.node);
					else group.appendChild(post.node);
				} else {
					var sibling=post.nextSibling();
					if (sibling) wmConsole.feedNode.insertBefore(post.node, sibling.node);
					else wmConsole.feedNode.appendChild(post.node);
				}
			}
		}catch(e){log("Post.draw: "+e);}};

		this.openSource=function(){try{
			var url=this.actionLink("Like");
			//FF22 version
			GM_openInTab(url,"_blank");
			//FF21 version
			//((opts.useGM_openInTab)?GM_openInTab:window.open)(url,"_blank");
		}catch(e){log("Post.openSource: "+e);}};

		this.addClass=function(s){try{
			if (this.node){
				this.node.className=this.node.className.addWord(s);
			}
		}catch(e){log("Post.addWord: "+e);}};

		this.removeClass=function(s){try{
			if (this.node){
				this.node.className=this.node.className.removeWord(s);
			}
		}catch(e){log("Post.removeWord: "+e);}};

		this.pause=function(){try{
			this.isPaused=true;
		}catch(e){log("Post.pause: "+e);}};

		this.unPause=function(){try{
			this.isPaused=false;
		}catch(e){log("Post.unPause: "+e);}};

		this.exclude=function(){try{
			this.isExcluded=true;
		}catch(e){log("Post.exclude: "+e);}};

		this.collect=function(){try{
			this.isCollect=true;
		}catch(e){log("Post.collect: "+e);}};

		this.stopCollect=function(){try{
			this.isCollect=false;
		}catch(e){log("Post.collect: "+e);}};

		this.togglePin=function(){try{
			this.isPinned=!this.isPinned;
		}catch(e){log("Post.togglePin: "+e);}};

		this.pin=function(){try{
			this.isPinned=true;
		}catch(e){log("Post.pin: "+e);}};

		this.unPin=function(){try{
			this.isPinned=false;
		}catch(e){log("Post.unPin: "+e);}};

		this.addToFeeds=function(){try{
			FeedManager.newFeed({id:this.fromID, title:this.fromName});
			FeedManager.save();
		}catch(e){log("Post.addToFeeds: "+e);}};

		this.accept=function(mark){try{
			this.isAccepted=true;
			this.isFailed=false;
			this.isTimeout=false;
			this.isWorking=false;
			this.isCollect=false;
			if (mark) main.setAsAccepted(null, 3,this);
		}catch(e){log("Post.accept: "+e);}};

		this.fail=function(mark){try{
			this.isFailed=true;
			this.isAccepted=false;
			this.isTimeout=false;
			this.isWorking=false;
			this.isCollect=false;
			if (mark) main.setAsFailed(null, -18,this);
		}catch(e){log("Post.fail: "+e);}};

		this.timeout=function(){try{
			this.isTimeout=true;
			this.isAccepted=false;
			this.isFailed=false;
			this.isWorking=false;
			this.isCollect=false;
		}catch(e){log("Post.timeout: "+e);}};

		this.remove=function(){try{
			var node=(this.node||$("post_"+this.id));
			if (node && node.parentNode) remove(node);
			this.node=null;
			
			//turn this post into a ghost so we can keep its data
			//for linked objects, but not process it in reid or redraw
			this.isGhost=true;
			
			//delete posts[this.id];
		}catch(e){log("Post.remove: "+e);}};

		this.addToolBox=function(){try{
			var post=this;
			if (!opts.showtoolbox) return;
			var toolNode = post.toolboxNode;
			if (toolNode) toolNode.appendChild(
				createElement("div",{},[
					createElement("div",{onclick:function(){post.forceOpen();},title:"Open Post",className:"littleButton oddBlue"+((!opts.showopen)?" hidden":"")},[
						createElement("img",{className:"resourceIcon action"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.cancelProcess();},title:"Cancel Process or AutoLike",className:"littleButton oddBlue"+((!opts.showcancelprocess)?" hidden":"")},[
						createElement("img",{className:"resourceIcon cancelProcess"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.refreshProcess();},title:"Restart Process or AutoLike",className:"littleButton oddBlue"+((!opts.showrestartprocess)?" hidden":"")},[
						createElement("img",{className:"resourceIcon refreshProcess"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){main.pauseByType(post.app, post.which);},title:"Pause all bonuses of this type",className:"littleButton oddOrange"+((!opts.showpausetype)?" hidden":"")},[
						createElement("img",{className:"resourceIcon stop"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){main.unPauseByType(post.app, post.which);},title:"Unpause all bonuses of this type",className:"littleButton oddGreen"+((!opts.showunpausetype)?" hidden":"")},[
						createElement("img",{className:"resourceIcon playRight"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){window.open(post.actionLink("Like"),"_blank");},title:"Show Post Source",className:"littleButton oddBlue"+((!opts.showpostsrc)?" hidden":"")},[
						createElement("img",{className:"resourceIcon openInNewWindow"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.remove();},title:"Clean",className:"littleButton oddOrange"+((!opts.showclean)?" hidden":"")},[
						createElement("img",{className:"resourceIcon trash"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.togglePin();},title:"Pin",className:"littleButton"+((!opts.showpin)?" hidden":"")},[
						post.pinImageNode=createElement("img",{className:"resourceIcon "+(post.isPinned?"pinned":"pin")+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.moveToBottom();},title:"Move to Bottom",className:"littleButton oddOrange"+((!opts.showmovebottom)?" hidden":"")},[
						createElement("img",{className:"resourceIcon moveBottomLeft"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.moveToTop();},title:"Move to Top",className:"littleButton oddGreen"+((!opts.showmovetop)?" hidden":"")},[
						createElement("img",{className:"resourceIcon moveTopLeft"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.reID();},title:"ReID Post",className:"littleButton"+((!opts.showreid)?" hidden":"")},[
						createElement("img",{className:"resourceIcon identify"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.addToFeeds();},title:"Add To Feeds",className:"littleButton"+((!opts.showaddfeed)?" hidden":"")},[
						createElement("img",{className:"resourceIcon addFeed"+opts.littleButtonSize})]),
					post.likeButtonNode=createElement("div",{onclick:function(){post.like();},title:"Like Post",className:"likeButton littleButton oddBlue"+(post.isLiked?" hidden":"")+((!opts.showlike)?" hidden":"")},[
						createElement("img",{className:"resourceIcon like"+opts.littleButtonSize})]),
					
					createElement("div",{onclick:function(){post.comment();},title:"Auto Comment",className:"littleButton oddBlue"+((!opts.showautocomment)?" hidden":"")},[
						createElement("img",{className:"resourceIcon comment"+opts.littleButtonSize})]),
					
					createElement("div",{onclick:function(){post.fail(true);},title:"Mark as Failed",className:"littleButton oddOrange"+((!opts.showmarkfailed)?" hidden":"")},[
						createElement("img",{className:"resourceIcon minus"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){post.accept(true);},title:"Mark as Accepted",className:"littleButton oddGreen"+((!opts.showmarkaccepted)?" hidden":"")},[
						createElement("img",{className:"resourceIcon plus"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){Priority.ruleFromPost(post);},title:"Create Rule From Post",className:"littleButton oddBlue"+((!opts.showmakerule)?" hidden":"")},[
						createElement("img",{className:"resourceIcon gotoLibrary"+opts.littleButtonSize})]),
					createElement("div",{onclick:function(){promptText(JSON.stringify(self.originalData),true);},title:"Show Original Data",className:"littleButton"+((!opts.showoriginaldata)?" hidden":"")},[
						createElement("img",{className:"resourceIcon object"+opts.littleButtonSize})]),
				])
			);
		}catch(e){log("Post.addToolBox: "+e);}};

		this.__defineGetter__("linkText", function(){try{
			if (this.actions.length >=3) return this.actions.last().name||"";
			else return "";
		}catch(e){log("Post.linkText: "+e);}});

		this.__defineGetter__("linkHref", function(){try{
			return this.link||((this.actions.length>=3)?(this.actions.last().link||""):"")||"";

			if (this.actions.length >=3) return this.actions.last().link||"";
			else return this.link||"";
		}catch(e){log("Post.linkHref: "+e);}});

		this.actionLink=function(action){try{
			for (var a=0,act;(act=this.actions[a]);a++) if (act.name.toLowerCase()==action.toLowerCase()) {return act.link; break;}
		}catch(e){log("Post.actionLink: "+e);}};

		this.__defineGetter__("body", function(){try{
			return (this.title||"")+" "+(this.caption||"")+" "+(this.description||"");
		}catch(e){log("Post.body: "+e);}});

		this.__defineGetter__("either", function(){try{
			return this.linkText+" "+this.body;
		}catch(e){log("Post.either: "+e);}});

		this.__defineGetter__("date", function(){try{
			return this["created_time"];
		}catch(e){log("Post.date: "+e);}});

		this.checkStale=function(timeOverride) {try{
			if (exists(timeOverride) && timeOverride==0) return false;
			var now = timeStamp();
			var pubTime = (this.date.length < 10)?this.date+"000":this.date;
			//var pubTime = this.date+"000";
			var aDay = (1000 * 60 * 60 * 24);
			return (now-pubTime)>(timeOverride||aDay);
		}catch(e){log("Post.checkStale: "+e);}};

		//req must equal "id" or "name"
		this.getTargets=function(req){try{
			req = req||"id";
			var ret = [];
			if (exists(this.to)) {
				for (var i=0,target; (target=this.to.data[i]);i++) ret.push(target[req]);
			}
			return ret;
		}catch(e){log("Post.getTargets: "+e);}};

		//ret must equal "id" or "message" or "name" or "count"
		this.getComments=function(req){try{
			var ret = [];
			if (exists(this.comments)) if (this.comments.count) {
				switch(req){
					case "message": for (var i=0,comment; (comment=this.comments.data[i]);i++) ret.push(comment[req]); break;
					case "id":case "name": for (var i=0,comment; (comment=this.comments.data[i]);i++) ret.push(comment.from[req]); break;
					case "count": return this.comments.count; break;
				}
			}
			return ret;
		}catch(e){log("Post.getComments: "+e);}};

		//ret must equal "id" or "name" or "count"
		this.getLikes=function(req){try{
			req = req||"id";
			var ret = [];
			if (exists(this.likes)) if (this.likes.count) {
				switch(req){
					case "id":case "name": for (var i=0,like; (like=this.likes.data[i]); i++) ret.push(like[req]); break;
					case "count": return this.likes.count; break;
				}
			}
			return ret;
		}catch(e){log("Post.getLikes: "+e);}};

		this.moveToTop = function(){try{
			if (this.node||null) this.node.parentNode.insertBefore(this.node,this.node.parentNode.childNodes[0]);
		}catch(e){log("Post.moveToTop: "+e);}};

		this.moveToBottom = function(){try{
			if (this.node||null) this.node.parentNode.appendChild(this.node);
		}catch(e){log("Post.moveToBottom: "+e);}};

		this.setPriority = function(value){try{
			this.priority=value;
			remove(this.node);
			this.draw();
		}catch(e){log("Post.setPriority: "+e);}};		
		
		this.reID = function(params){try{
			params=params||{};
						
			//reidentify
			var oldW=this.which;
			if (this.identify({reid:true})) {
				Priority.doEvent("onIdentify",this);
			}
			
			//sort me into proper location
			main.sortPosts();

			//redraw||reorder
			if (!this.isGhost) {
				this.draw(true,true);
			}
		}catch(e){log("Post.reID: "+e);}};

		//return the next visible sibling post
		//now checks for group and visibility
		this.nextSibling = function(){try{
			//determine if there is an app filter
			var filter=(quickOpts.filterApp||"All");
			
			//determine display grouping
			var groupBy=quickOpts.groupBy;
			var group=(groupBy)?main.newGroup({by:this[groupBy]}):null;
			
			//get visible posts
			var visiblePosts=(filter=="All")?posts:matchByParam(posts,"appID",filter);
			if (groupBy) visiblePosts=matchByParam(visiblePosts,groupBy,this[groupBy]);
			
			//search for the current post
			var found=false, sibling=null;
			for (var p in visiblePosts) {
				if (found && visiblePosts[p].node) {
					if ((!groupBy && visiblePosts[p].node.parentNode==wmConsole.feedNode) 
					|| (groupBy && visiblePosts[p].node.parentNode==group)){
						sibling=visiblePosts[p]; 
						break
					}
				} else if (visiblePosts[p]==this) found=true;
			}

			//return what is found
			return sibling;
			//warning: returns null if this is the last visible post
		}catch(e){log("Post.nextSibling: "+e);}};

		//return the previous visible sibling post
		//now checks for group and visibility
		this.previousSibling = function(){try{
			//determine if there is an app filter
			var filter=(quickOpts.filterApp||"All");
			
			//determine display grouping
			var groupBy=quickOpts.groupBy;
			var group=(groupBy)?main.newGroup({by:this[groupBy]}):null;

			//get visible posts
			var visiblePosts=(filter=="All")?posts:matchByParam(posts,"appID",filter);
			if (groupBy) visiblePosts=matchByParam(visiblePosts,groupBy,this[groupBy]);
			
			//search for the current post
			var sibling=null;
			for (var p in visiblePosts) {
				if (visiblePosts[p]==this) break;
				else if (visiblePosts[p].node) {
					if ((!groupBy && visiblePosts[p].node.parentNode==wmConsole.feedNode)
					|| (groupBy && visiblePosts.node.parentNode==group)){
						sibling=visiblePosts[p];
					}
				}
			}
			
			//return what is found
			return sibling;
			//warning: returns null if this is the first visible post
		}catch(e){log("Post.previousSibling: "+e);}};

		//convert a unix date to a readable date
		this.realtime=(new Date((this.date||0)*1000).toLocaleString());

	}catch(e){log("Post.init: "+e);}};

//***************************************************************************************************************************************
//***** Main Object
//***************************************************************************************************************************************
	var main = {
		paused : false,
		fetchPaused : false,
		requestsOpen : 0,
		reqTO : 30000,
		newSidekicks : [],

		accDefaultText : "Got this!",
		failText : "Oh no! Sorry pardner!",
		overLimitText : "Limit reached!",

		statusText : {
			"20":"Sidekick returned force accept",
			"3":"Marked as accepted by user",
			"2":"Responseless Collection",
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed",
			"-2":"None Left",
			"-3":"Over Limit (App)",
			"-4":"Over Limit, Sent One Anyway",
			"-5":"Server Error",
			"-6":"Already Got",
			"-7":"Server Down For Repairs",
			"-8":"Problem Getting Passback Link",
			"-9":"Final Request Returned Null Page",
			"-10":"Final Request Failure",
			"-11":"Expired",
			"-12":"Not a Neighbor",
			"-13":"Requirements not met",
			"-14":"Timeout",
			"-15":"Unrecognized Response",
			"-16":"Passback Link is missing",
			"-17":"Window Missing",
			"-18":"Marked as failed by user",
			"-20":"Sidekick returned force fail",
			
			"-19":"Over Limit (Bonus Type)",
			"-21":"Cancelled mid-process by user",
			
		},
		
		sortGroups : function(params){
			params=params||{};
			params.direction=(quickOpts.groupDirection=(params.direction||quickOpts.groupDirection||"desc")); //default descending to keep time ordered posts in order newest to oldest
			main.saveQuickOpts();			
			
			//reorder the groups
			var groupsArray=[];
			for (var g in displayGroups) {
				groupsArray.push({id:g,node:displayGroups[g].parentNode,box:displayGroups[g]});
			}
			
			if (["asc","ascending"].inArray(params.direction.toLowerCase())) groupsArray.sort(function(a,b){return a.id>b.id;});
			else if (["desc","descending"].inArray(params.direction.toLowerCase())) groupsArray.sort(function(a,b){return a.id<b.id;});
			
			displayGroups={};
			for (var g=0; g<groupsArray.length; g++) {
				displayGroups[groupsArray[g].id]=groupsArray[g].box;
				wmConsole.feedNode.appendChild(groupsArray[g].node);
			}
		},

		newGroup : function(params){
			params=params||{};

			//prevent duplicates
			if (displayGroups[params.by]||null) return displayGroups[params.by];
			
			//create the nodes
			var box;
			var group=createElement("div",{className:"listItem"},[
				createElement("div",{className:"line", onclick:function(){
					//toggle rollout
					with (this.nextSibling) className=className.swapWordB((className.containsWord("collapsed")),"expanded","collapsed");
					with (this.firstChild.firstChild) className=className.swapWordB((className.containsWord("treeCollapse"+opts.littleButtonSize)),"treeExpand"+opts.littleButtonSize,"treeCollapse"+opts.littleButtonSize);
				}},[
					createElement("div",{className:"littleButton",title:"Toggle Content"},[
						createElement("img",{className:"resourceIcon treeCollapse"+opts.littleButtonSize}),
					]),
					createElement("label",{textContent:params.label||params.by})
				]),
				box=createElement("div",{className:"subsection rollout expanded"}),
			]);
						
			//add it to our group list
			displayGroups[params.by]=box;
			
			main.sortGroups();
			
			return box;
		},
		
		pauseCollecting : function(doPause){
			var isPaused;
			if (exists(doPause)) isPaused = (main.paused = doPause);
			else isPaused=(main.paused = !main.paused);
			var btn=wmConsole.pauseCollectButton;
			btn.className = btn.className.swapWordB(isPaused,"oddGreen","oddOrange");
			btn.title = (isPaused)?"Start Automatic Collection":"Pause Automatic Collection";
			var img = btn.childNodes[0];
			img.className = img.className.swapWordB(isPaused,"playRight24","stop24");
		},

		pauseFetching : function(doPause){
			var isPaused;
			if (exists(doPause)) isPaused = (main.fetchPaused = doPause);
			else isPaused=(main.fetchPaused = !main.fetchPaused);
			var btn=wmConsole.pauseFetchButton;
			btn.className = btn.className.swapWordB(isPaused,"oddGreen","oddOrange");
			btn.title = (isPaused)?"Start Automatic Fetching":"Pause Automatic Fetching";
		},

		clearGroups : function(params){
			//destroy previous groups
			for (var g in displayGroups){
				remove(displayGroups[g].parentNode); //kill the node
				delete displayGroups[g]; //remove from list
			}
		},

		clearPosts : function(){
			//remove all post nodes from the collector panel
			for (var p in posts){
				if (posts[p].node) remove(posts[p].node);
			}
		},
		
		constructGroups : function(params){
			params=params||{};
			//this specifically allows a null so we can remove grouping
			var by=exists(params.by)?params.by:quickOpts.groupBy;
			//if nothing changed, just cancel
			if (by==quickOpts.groupBy) return;
			
			//set the new group order
			quickOpts.groupBy=by;
			main.saveQuickOpts();
			
			main.clearGroups();
		},
		
		sortPosts : function(params){
			params=params||{};
			params.direction=(quickOpts.sortDirection=(params.direction||quickOpts.sortDirection||"desc")); //default descending to keep time ordered posts in order newest to oldest
			params.by=(quickOpts.sortBy=(exists(params.by)?params.by:(quickOpts.sortBy||"created_time"))); //default by date
			main.saveQuickOpts();

			//convert to array
			var postsArray=methodsToArray(posts);

			//sort
			postsArray.sort(function(a,b){
				if (["ascending","asc"].inArray(params.direction.toLowerCase())) return a[params.by]>b[params.by];
				if (["descending","desc"].inArray(params.direction.toLowerCase())) return a[params.by]<b[params.by];
			});

			//convert back to object
			posts=arrayToMethods(postsArray);
		},

		doWhichTestTree : function(post, testList, testData, custom) {try{
			//match post to an app
			var app=post.app;
			var synApp=app.synApp, w=null;

			for (var i=0,test;((test=testList[i]) && (w===null));i++) {

				//run only for tests that are not specifically disabled
				if (test.enabled===false) continue;
				
				//set find mode
				var findMode="auto";
			
				//finish constructing dynamic collection tests
				var ret = test.ret;
				if (custom) {
					if (!ret) ret = "dynamic"; //default to dynamic
					if (ret!="dynamic" && ret!="none" && ret!="exclude" && !ret.startsWith(synApp.appID)) ret=synApp.appID+ret; //add appID except to magic words
					findMode=test.findMode;
				}

			    //part to make dynamic collection tests work only if they are the correct appID
			    //also do not process disabled tests			    
				if (!custom || (custom && (!test.appID || (app.appID==test.appID)))){

					//if the test is not disabled (by test enabled both existing and being false)
					//OR if the test IS a dynamic test and the appID matches
					//OR if the test IS a dynamic test and no appID was supplied
					//then run the test

					//detect test type
					var testType=(test.search||null);
					var types=Grabber.methods;
					if (!testType) for (var tt=0,len=types.length; tt<len; tt++) {if (test[types[tt]]||"") {testType=types[tt];break;}}

					//select the type of data to use
					var src="";
					if (isArray(testType)){ //new search array format
						for (var t=0,tlen=testType.length;t<tlen;t++) src+=(testData[testType[t]]||"");
					}
					else src = (testData[testType]||""); //old test method like testType:text

					if (src){
						//begin processing this test
						var subTests=test.subTests, kids=test.kids, allowNone=false, subNumRange=test.subNumRange,text=(test.find||test[testType]||"");

						//process subtests array
						if (subTests && (findMode=="auto" || findMode=="subtests") && text) {
							for (var i2=0,subTest,found=false;((subTest=subTests[i2]) && (!found));i2++) {
								var testX = text.replace('{%1}',subTest).toLowerCase();

								//do a standard test with the replaced search string
								found=src.find(testX);

								//return a found value, replacing %1 with a lowercase no-space text equal to the subtest string
								w=(found)?ret.replace('{%1}',subTest.noSpaces().toLowerCase()):w;

								testX=null;
							}

						//process number array
						} else if (subNumRange && (findMode=="auto" || findMode=="subnumrange") && text){
							var start=parseInt(subNumRange.split(",")[0]), end=parseInt(subNumRange.split(",")[1]);
							for (var i2=start,found=false;((!found) && i2<=end);i2++)  {
								var testX = text.replace('{%1}',i2).toLowerCase();

								//do a standard test with the replaced search string
								found=src.find(testX);

								//return a found value, replacing %1 with a lowercase no-space text equal to the subtest string
								w=(found)?ret.replace('{%1}',i2):w;

								testX=null;
							}

						//process text array, process similar to subtests
						} else if (text && (findMode=="auto" || findMode=="basic") && (isArray(text))) {
							for (var i2=0,subTest,found=false;((subTest=text[i2]) && (!found));i2++) {
								var testX = subTest.toLowerCase();

								//do a standard test with the replaced search string
								found=src.find(testX);

								//return the same value no matter which element from the array is found
								w=(found)?ret:w;

								testX=null;
							}


						//process regex
						} else if (text && (test.regex||test.isRegex||null) ) {
							var mods = (test.mods||"gi");
							var testRegex = new RegExp(text,mods);
							var match=src.match(testRegex);
							if (match) match=match[0]; //always take the first match
							w=ret||match||w;



						//process single text
						} else if (text) {
							try{
								w=(src.find(text.toLowerCase() ))?ret:w;
							} catch(e){
								log("main.doWhichTestTree:"+e);
								log("--app:"+app.appID);
								log("--test:"+JSON.stringify(test));
							}
						}

					}

					//see if test has type 2 subtests (child node tests based on parent test)
					w = ((kids && w)?main.doWhichTestTree(post, kids, testData, custom):w) || w; //if kids return null, default to key found above

					//if this test tree returned "none", start over with next tree by replacing "none" with null
					//true "none" is handled in the which() function below
					if (w==="none") w=null;


				}//end custom checker
			}

			return w;
		}catch(e){log("main.doWhichTestTree: "+e);}},

		which : function(post,params) {try{
			//prevent the rules manager from mistaking main as a post object
			if (!post) return;
			
			params=params||{};
			//match post to an app
			var w, app=post.app, synApp=app.synApp;

			//create various data for the tests to use
			if (!params.reid) post.testData = {
				title: (post.name||"").toLowerCase(),
				msg: (post.message||"").toLowerCase(),
				caption: (post.caption||"").toLowerCase(),
				desc: (post.description||"").toLowerCase(),
				link: post.linkText.toLowerCase(),
				url: Url.decode(post.linkHref).toLowerCase(),
				img: (post.picture||"").toLowerCase(),
				fromName: post.fromName.toLowerCase(),
				fromID: post.fromID.toLowerCase(),
				targetName: ","+post.getTargets("name").join(",").toLowerCase(),
				targetID: ","+post.getTargets("id").join(",").toLowerCase(),
				canvas: app.namespace.toLowerCase(),
				likeName: ","+post.getLikes("name").join(",").toLowerCase(),
				likeID: ","+post.getLikes("id").join(",").toLowerCase(),
				comments: post.getComments("message").join(" \n").toLowerCase(),
				commentorName: ","+post.getComments("name").join(",").toLowerCase(),
				commentorID: ","+post.getComments("id").join(",").toLowerCase(),
			};
			var testData=post.testData;

			//replacement for old options like body, either and html
			testData.body = testData.title+testData.caption+testData.desc;
			testData.either = testData.link+testData.body;
			testData.html = testData.fromID + testData.fromName + testData.targetID + testData.targetName + testData.message
				+ testData.href + testData.either + testData.img + testData.canvas + testData.likeID + testData.likeName
				+ testData.commentorID + testData.commentorName + testData.comments;

			var dynamicTests = Grabber.tests;

			//check user built dynamic tests first if enabled and told to run first
			if (opts["dynamic"+app.appID] && opts.dynamicFirst && dynamicTests) {
				w=main.doWhichTestTree(post,dynamicTests, testData, true)||"none";
			}

			//process this game's tests if dynamic didn't already get one
			if (w=="none" || !w || w=="") {
				w=((tests=synApp.tests)?main.doWhichTestTree(post,tests, testData):"none")||"none";
			}

			//check user built dynamic tests last if enabled and not told to run first
			if (w=="none" || !w || w=="") {
				if (opts["dynamic"+app.appID] && !opts.dynamicFirst && dynamicTests) {
					w=main.doWhichTestTree(post,dynamicTests,testData, true)||"none";
				}
			}

			//switch to undefined collection if enabled
			w=(w==="none" && app.opts["doUnknown"])?"doUnknown":w;

			return w;
		}catch(e){log("main.which: "+e);}},

		resetAccepted : function(params) {
			params=params||{};
			var ask=opts.historyConfirmClear;
			if (params.noConfirm || !ask || (ask && confirm("Delete all history for this profile?"))){
				doAction(function(){
					history={};
					setOpt('history_'+profile,'{}');
				});
			}
		},

		onWindowResize : function(){
			main.resizeConsole();
		},
		
		onHeartbeat : function(){
			//affect rules at the base level
			Priority.doEvent("onHeartbeat",{});
			
			//affect rules at the app level
			if (opts.heartbeatAffectsApps) {
				for (var a in apps) {
					(function(){
						Priority.doEvent("onHeartbeat",apps[a]);
					})();
				}
			}

			//affect rules at the post level
			if (opts.heartbeatAffectsPosts) {
				for (var p in posts) if (!posts[p].isGhost) {
					(function(){
						Priority.doEvent("onHeartbeat",posts[p]);
					})();
				}
			}

			//affect rules at the rule level
			if (opts.heartbeatAffectsRules) {
				for (var r=0; r<Priority.rules.length; r++) {
					(function(){
						Priority.doEvent("onHeartbeat",Priority.rules[r]);
					})();
				}
			}

			//affect rules at the feed and feed filter levels
			if (opts.heartbeatAffectsFeeds || opts.heartbeatAffectsFeedFilters) {
				var feeds=FeedManager.feeds;
				for (var f=0,len=feeds.length; f<len; f++) {
					//do the feed
					if (opts.heartbeatAffectsFeeds) (function(){
						Priority.doEvent("onHeartbeat",feeds[f]);
					})();
					
					//do the feed filters
					if (opts.heartbeatAffectsFeedFilters) {
						for (var ff in feeds[f].filters){
							(function(){
								Priority.doEvent("onHeartbeat",feeds[f].filters[ff]);
							})();
						}
					}
				}
			}
			
			//check for new sidekick arrivals
			if (isArrayAndNotEmpty(main.newSidekicks)) {
				while (main.newSidekicks.length>0) {
					var app=main.newSidekicks.shift();
					app.fetchPosts();
				}
			}
			
			//check for autolike queue contents
			var quePost = main.checkAutoLikeQue();
			if (quePost) {
				//log([quePost.fn,quePost.post.id]);
				switch (quePost.fn) {
					case "like":quePost.post.like();break;
					case "comment":quePost.post.comment(quePost.say);break;
				}
			}
			
		},

		//this is for when the userConfig and globalConfig settings change
		onSave : function() {
			//recopy the settings array from userConfig
			main.updateSettingsValues();

			//hide or show counters
			if (opts.showcounters) main.showCounters(); else main.hideCounters();

			//update intervals
			main.setIntervals();

			//set new user colors
			main.setColors();
			
			//update config settings
			main.changeConfigSettings();

			//update those settings we use as global variables
			main.changeDebugSettings();
			
			//set console heights
			//main.resizeConsole();
		},

		updateSettingsValues : function(){try{
			opts = userConfig.values;
			
			//new: do this for each of the apps too
			for (var a in apps) apps[a].opts=apps[a].config.values;
			
		}catch(e){"main.updateSettingsValues: "+e}},

		getAccText: function(appID,w,past,status){
			var app=apps[appID].synApp;
			//detect and use a status code message
			if (!(status>-1 || status==-4 || status==-6)) return main.statusText[status];
			//or return a generic message based on post type
			else return (w=="dynamic")?"Dynamic Grab"+((past)?"bed":""):(((w.find("send")?"Sen"+((past)?"t":"d")+" ":w.find("wishlist")?"":"G"+((past?"o":"e"))+"t ") + (app.userDefinedTypes[w]||app.accText[w])) || ((past)?main.accDefaultText:"Get Unknown") || ((w.startsWith(app.appID+"doUnknown"))?"Unknown":"") );
		},

		stopCollectionOf : function(w){
			for (var p in posts) if (!posts[p].isGhost && posts[p].which==w) posts[p].stopCollect();
		},

		startCollectionOf : function(w){
			for (var p in posts) if (!posts[p].isGhost && posts[p].which==w) posts[p].collect();
		},

		pauseByType : function(app,w){
			if (!isArray(w)) w=[w];
			//mark as paused all those posts not yet done
			for (var p in posts) if (!posts[p].isGhost && w.inArray(posts[p].which)) posts[p].pause();
			//store the paused type but dont save it
			var a=(app.parent||app);
			for (var i=0; i<w.length; i++) {
				var t=w[i];
				//add it to the array without making a duplicate
				if (!a.typesPaused.inArray(t)) {
					a.typesPaused.push(t);
					//add a visible node
					a.typesPausedNode.appendChild(
						a.pausedTypesListNodes[t]=createElement("div",{className:"line"},[
							createElement("span",{textContent:(a.userDefinedTypes[t]||a.accText[t])+" ("+t+") "}),
							createElement("div",{className:"littleButton oddGreen", title:"Unpause Type"},[
								createElement("img",{className:"resourceIcon playRight"+opts.littleButtonSize,onclick:function(){
									main.unPauseByType(a,t);
								}})
							])
						])
					);
				}
			}
		},

		unPauseByType : function(app,w){
			if (!isArray(w)) w=[w];
			//unpause all those posts not yet done
			for (var p in posts) if (!posts[p].isGhost && w.inArray(posts[p].which)) posts[p].unPause();
			//remove paused type from list but dont save it
			var a=(app.parent||app);
			for (var i=0; i<w.length; i++) {
				//remove the visible node
				remove (a.pausedTypesListNodes[w[i]]);
				//delete the visible node entry
				delete a.pausedTypesListNodes[w[i]];
				//remove it from the array
				a.typesPaused.removeByValue(w[i]);
			}
		},

		setAsAccepted : function(comment,status, post) {try{
			var app=post.app;
			var synApp=app.synApp;
			post.state="accepted";
			post.status=status;
			post.accept();

			history[post.id]={status:status, date:timeStamp(), which:(post.which||"undefined").removePrefix(synApp.appID), appID:app.appID};
			setOptJSON('history_'+profile,history);

			//do friend tracking
			if (opts.useFriendTracker && opts.trackAccepted){
				FriendTracker.trackStatus(post,true);
			}

			var postNode=post.node||$("post_"+post.id);
			if (postNode){
				var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});

				var text=main.getAccText(synApp.appID,post.which,true,status);

				link.textContent = (comment || text || main.statusText[status] || main.accDefaultText);
				main.updatePostStatus(post.id);
			}

			app.acceptCount++; 

			//perform the onAccepted event
			Priority.doEvent("onAccepted",post);

			//try autolike
			try{
				if (opts.useautolike && (opts.autolikeall || opts.autolikeaccepted || (opts.autolikesent && (post.which||"undefined").startsWith("send")) )) {
					if (!opts["nolike"+app.appID]){
						main.queAutoLike(post);
						//post.like();
					}
				}
			} catch(e){log("setAsAccepted: autolike failed: "+e,{level:3});}
			//try autocomment
			
			try{
				if (opts.useautocomment && (opts.autolikeall || opts.autolikeaccepted || (opts.autolikesent && (post.which||"undefined").startsWith(synApp.appID+"send")) )) {
					if (!opts["nolike"+app.appID]){
						//setTimeout(function(){post.comment();},100+(opts.autolikedelay*1000));
						main.queAutoComment(post,null);
					}
				}
			} catch(e){log("setAsAccepted: autocomment failed: "+e,{level:3});}
			
		}catch(e){log("main.setAsAccepted: "+e);}},

		disableOpt : function(w,app){try{
			var targetConfig=(app||null)?app.config:userConfig;
			((app||null)?app.opts:opts)[w]=false;
			targetConfig.set(w,false);
			targetConfig.save();
			debug.print([w,app,false]);
		}catch(e){log("main.disableOpt: "+e);}},

		enableOpt : function(w,app){try{
			var targetConfig=(app||null)?app.config:userConfig;
			((app||null)?app.opts:opts)[w]=true;
			targetConfig.set(w,true);
			targetConfig.save();
			debug.print([w,app,true]);
		}catch(e){log("main.enableOpt: "+e);}},

		setOpt : function(w,v,app){try{
			var targetConfig=(app||null)?app.config:userConfig;
			((app||null)?app.opts:opts)[w]=v;
			targetConfig.set(w,v);
			targetConfig.save();
			debug.print([w,app,v]);
		}catch(e){log("main.setOpt: "+e);}},

		resetCounters : function(){try{
			for (var a in apps) apps[a].resetCounter();
		}catch(e){log("main.resetCounters: "+e);}},

		setAsFailed : function(comment, status, post){try{
			var app=post.app;
			var synApp=app.synApp;
			var postNode=post.node||$("post_"+post.id);

			//special effects for timeout and cancelProcess
			if ((!opts.failontimeout && status==-14) || status==-21) {
				post.state="timeout";
				post.timeout();
				if (status==-14) Priority.doEvent("onTimeout",post);

			} else {
				post.state="failed";
				post.fail(); // don't pass true or it will loop here

				history[post.id]={status:status, date:timeStamp(), which:(post.which||"undefined").removePrefix(synApp.appID), appID:app.appID};
				setOptJSON('history_'+profile,history);
				
				Priority.doEvent("onFailed",post);
			}
			post.status=status;

			//do friend tracking
			if (opts.useFriendTracker && opts.trackFailed){
				FriendTracker.trackStatus(post,false);
			}
			
			if (postNode) {
				var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
				if (link) {
					//I can see no reason the link should be missing, but since its been proven to fail, here is a patch
					link.textContent = (comment || main.statusText[status] || main.failText);
				}
				main.updatePostStatus(post.id);
			}

			app.failCount++; 
			
			//try autolike
			try{
				if (opts.useautolike && opts.autolikeall) {
					if (!opts["nolike"+app.appID]){
						main.queAutoLike(post);
						//post.like();
						//setTimeout(function(){post.like();},100+(opts.autolikedelay*1000));
					}
				}
			} catch(e){log("setAsFailed: autolike failed: "+e,{level:3});}
			//try autocomment
			
			try{
				if (opts.useautocomment && opts.autolikeall) {
					if (!opts["nolike"+app.appID]){
						//setTimeout(function(){post.comment();},100+(opts.autolikedelay*1000));
						main.queAutoComment(post,null);
					}
				}
			} catch(e){log("setAsFailed: autocomment failed: "+e,{level:3});}
			
		}catch(e){log("main.setAsFailed: "+e);}},

		setPriority : function(){
			var postNode=selectSingleNode(".//ancestor::*[starts-with(@id,'post_')]",{node:this});
			var id=postNode.id.replace("post_","");
			posts[id]["priority"]=this.getAttribute("name");
			remove(postNode);
			posts[id].draw();
		},

		clearURL : function(tab){
			Collector.close(tab);
			main.requestsOpen--;
		},
		
		//constantly update sidekick channel data
		skChannel : {},
		fetchSidekickData : function(){try{
			if (main) {
				var node=selectSingleNode("./div",{node:$("wmDataDump")});
				while (node){
					log("main.fetchSidekickData: found "+JSON.parse(node.getAttribute("data-ft")));
					main.skChannel=mergeJSON(main.skChannel,JSON.parse(node.getAttribute("data-ft")));
					remove(node);
					node=selectSingleNode("./div",{node:$("wmDataDump")});
				}
				setTimeout(main.fetchSidekickData,1000);
			}
		}catch(e){log("main.fetchSidekickData: "+e);}},		
		
		//this is WM3's method of handling conversations with sidekicks
		onFrameLoad3 : function(tab){try{
			log("onFrameLoad3(): tab="+tab.id);
						
			var postID=tab.postID||tab.id;
			var post=tab.post||posts[postID];

			//detect if post process was cancelled by user
			if (post.processCancelled){
				//reset the cancel memory
				post.processCancelled = false;
				log("onFrameLoad3: process cancelled by user");
				//set the timeout flag even though its not timed out
				main.setAsFailed(null,-21,post);
				main.clearURL(tab);
				return;
			}

			//detect if valid Collector window still exists
			var windowExists=(tab.hwnd && !tab.hwnd.closed);
			/*try{
				var testUrl=tab.hwnd.location.toString();
			} catch(e) {
				windowExists=false; 
			}*/
			
			//make sure the post object still exists
			if (!(post||null)){
				log("onFrameLoad3: post is null");
				main.clearURL(tab);
				return;
			}

			//check if window object is missing
			if (!windowExists) {
				log("windowExists = false");
				if (!tab.hwnd) log("onFrameLoad3: tab.hwnd is null");
				if (tab.hwnd.closed) log("onFrameLoad3: tab.hwnd is closed");
				main.setAsFailed(null,-17,post);
				main.clearURL(tab);
				return;
			}
			
			//check timer on this open post
			var openTime=tab.openTime;
			var nowTime=timeStamp();
			if ((opts.reqtimeout*1000)<(nowTime-openTime)){
				log("onFrameLoad3: post timed out");
				main.setAsFailed(null,-14,post);
				main.clearURL(tab);
				return;
			}
			
			//create the retry function
			var retry=function(){setTimeout(function(){main.onFrameLoad3(tab); return;},1000); return;};
			
			//look for status data
			var tabID = tab.id;
			var skData = main.skChannel[tabID]||null;
			if (skData) {
				//data exists for this post
				if (skData.status) {
					//status is available
					delete main.skChannel[tabID];
					
					//get useful post data
					var app=post.app; var synApp=app.parent||app;
					var postNode=post.node||$("post_"+post.id);
					var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
					var w=post.which||"undefined";
					
					//confirm status
					var gotItem=((skData.status>0) || (skData.status==-6) || (skData.status==-4) || (skData.status==-15 && opts.accepton15));
					var failedItem=(skData.status<0);
					
					if (gotItem){
						//build debug block
						switch(skData.status){
							case -6: case -4: case 1:
								// this bonus is available or we still have the ability to send something for no return
								//dont break before next
							case -15: case 2:
								if (!synApp.flags.requiresTwo){
									main.setAsAccepted(null, skData.status, post);
								}
								break;

							default:
								//should not have come here for any reason, but if we did assume its a status code I didnt script for
								main.setAsFailed(null, skData.status, post);
								log("onFrameLoad3: unexpected status code: "+skData.status,{level:2});
								break;
						}
					} else {
						main.setAsFailed(null,skData.status,post);
					}
					
					// click "yes" to accept it, if we got this far we actually found an accept button
					if(synApp.flags.requiresTwo && gotItem) {
						if (skData.nopopLink) {
							var req; req=GM_xmlhttpRequest({
								method: "GET",
								url: skData.nopopLink,
								timeout: opts.reqtimeout*1000,
								onload: function(response) {
									//search for error messages
									var test=response.responseText;
									if (test==""){
										//no text was found at requested href
										log("onFrameLoad3: final stage: null response",{level:2});
										main.setAsFailed(null, -9,post);
									} else {
										//if no errors then we got it
										main.setAsAccepted(null, skData.status,post);
									}
									main.clearURL(tab);
									if(req)req=null;
								},

								onerror: function(response) {
									log("onFrameLoad3: final stage: error returned",{level:2});
									//if final request fails, drop the request for now
									main.setAsFailed(null, -10,post);
									main.clearURL(tab);
									if(req)req=null;
								},

								onabort: function(response) {
									log("onFrameLoad3: final stage: request aborted",{level:2});
									main.setAsFailed(null, -10,post);
									main.clearURL(tab);
									if(req)req=null;
								},
								ontimeout: function(response) {
									log("onFrameLoad3: final stage: request timeout",{level:2});
									main.setAsFailed(null, -10,post);
									main.clearURL(tab);
									if(req)req=null;
								},
							});

						} else {
							log("onFrameLoad3: skData.nopopLink is null and a string was expected",{level:3});
							main.setAsFailed(null, -16,post);
							main.clearURL(tab);
							return;
						}
					} else main.clearURL(tab); //<- default page clearer, do not remove
				} else retry();
			} else {
				retry();
				//send the tab its init message (again)
				tab.hwnd.postMessage({
					channel:"WallManager",
					msg:1,
					tabID:tab.id,
				},"*");
				//log("useGM_openInTab: "+opts.useGM_openInTab);
			}
			
		}catch(e){log("main.onFrameLoad3: "+e);}},		
		
		//this is WM1-2's method of handling conversation with sidekicks
		//WM3 defaults to this if sidekick is not WM3 compatible
		onFrameLoad : function(tab,noDebug){try{
			//tab object contains {id,post,url}
			if (!noDebug) log("onFrameLoad()",{level:0});

			var id=tab.id; var post=tab.post||posts[id];
			if (!(post||null)) {
				//resource deleted while post was out
				main.clearURL(tab);
				return;
			}

			//detect if post process was cancelled by user
			if (post.processCancelled){
				//reset the cancel memory
				post.processCancelled = false;
				log("onFrameLoad3: process cancelled by user");
				//set the timeout flag even though its not timed out
				main.setAsFailed(null,-21,post);
				main.clearURL(tab);
				return;
			}

			var app=post.app;
			var synApp=app.parent||app;

			var httpsTrouble=synApp.flags.httpsTrouble;
			var responseLess=synApp.flags.skipResponse;

			var postNode=post.node||$("post_"+post.id);
			var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
			var w=post.which||"undefined";

			tab.tries=(tab.tries||0)+1;
			if (tab.tries>opts.reqtimeout) {
				log("onFrameLoad: request timeout",{level:3});
				main.setAsFailed(null, -14, post);
				main.clearURL(tab);
				return;
			}

			var retry=function(){setTimeout(function(e){main.onFrameLoad(tab, true);}, 1000);};

			var failedItem=false, gotItem=false, nopopLink;

			//check if window object is missing
			var windowExists=(tab.hwnd && !tab.hwnd.closed);
			if (!windowExists) {main.setAsFailed(null,-17,post); main.clearURL(tab); return;}
			//check if window document does not yet exist
			//if (!(tab.hwnd.document||null)) {retry(); return;}

			//get sidekick return value
			var hashMsg="",hashStatus=0;
			try{
				//if error encountered, reload the page
				if (tab.hwnd.document.title==="Problem loading page"){
					log("processPosts: problem loading page",{level:1});
					tab.hwnd.location.reload();
					retry();
					return;
				}

				var temphash = tab.hwnd.location.hash; //capture a hash if we can
				hashMsg = ((temphash)?temphash.removePrefix("#"):null) || tab.hwnd.location.href.split("#")[1];
				hashStatus=(responseLess)?2:(hashMsg||null)?parseInt(hashMsg.split('status=')[1].split("&")[0]):0;
				gotItem=((hashStatus>0) || (hashStatus==-6) || (hashStatus==-4) || (hashStatus==-15 && opts.accepton15));
				failedItem=(hashStatus<0);
				if (!gotItem && !failedItem) {retry(); return;}

			} catch(e){
				var errText=""+e;
				if (errText.contains("hashMsg is undefined")) {
					//this known issue occurs when a page is not yet fully loaded and the
					//WM script tries to read the page content
					retry();
					return;
				}
				else if (errText.contains("Permission denied to access property")) {
					//we've reached some known cross domain issue
					if (responseLess) {
						//if the sidekick creator has chosen to use responseless collection
						//simply assume the page has loaded and mark the item as collected

						gotItem=true;failedItem=false;hashStatus=2;
					} else {
						//log("onFrameLoad: "+e,{level:2});
						retry();
						return;
					}
				}
				else if (errText.contains("NS_ERROR_INVALID_POINTER")
					|| errText.contains("tab.hwnd.document is null") ) {

					main.setAsFailed(null,-17,post);
					main.clearURL(tab);
					return;
				}
				else {
					log("onFrameLoad: "+e,{level:3});
					retry();
					return;
				}
			}

			//if gotItem then we have been offered the item so far
			if (gotItem){
				//build debug block
		    		switch(hashStatus){
					case -6: case -4: case 1:
						// this bonus is available or we still have the ability to send something for no return
						if (synApp.flags.requiresTwo){
							try{
								nopopLink=hashMsg.split("&link=[")[1].split("]")[0];
							}catch(e){
								//known rare issue where no link is passed back by pioneer trail
							}
						}
						//dont break before next
					case -15: case 2:
						if (!synApp.flags.requiresTwo){
							main.setAsAccepted(null, hashStatus,post);
						}
						break;

					default:
						//should not have come here for any reason, but if we did assume its a status code I didnt script for
						main.setAsFailed(null, hashStatus,post);
						log("onFrameLoad: unexpected status code: "+hashStatus,{level:2});
						break;
		    		}
			} else {
				main.setAsFailed(null,hashStatus,post);
			}


			// click "yes" to accept it, if we got this far we actually found an accept button
			if(synApp.flags.requiresTwo && gotItem) {
				if (nopopLink) {
					var req; req=GM_xmlhttpRequest({
						method: "GET",
						url: nopopLink,
						timeout: opts.reqtimeout*1000,
						onload: function(response) {
							//search for error messages
							var test=response.responseText;
							if (test==""){
								//no text was found at requested href
								log("onFrameLoad: final stage: null response",{level:2});
								main.setAsFailed(null, -9,post);
							} else {
								//if no errors then we got it
								main.setAsAccepted(null, hashStatus,post);
							}
							main.clearURL(tab);
							if(req)req=null;
						},

						onerror: function(response) {
							log("onFrameLoad: final stage: error returned",{level:2});
							//if final request fails, drop the request for now
							main.setAsFailed(null, -10,post);
							main.clearURL(tab);
							if(req)req=null;
						},

						onabort: function(response) {
							log("onFrameLoad: final stage: request aborted",{level:2});
							main.setAsFailed(null, -10,post);
							main.clearURL(tab);
							if(req)req=null;
						},
						ontimeout: function(response) {
							log("onFrameLoad: final stage: request timeout",{level:2});
							main.setAsFailed(null, -10,post);
							main.clearURL(tab);
							if(req)req=null;
						},
					});

				} else {
					log("onFrameLoad: nopopLink is null and a string was expected",{level:3});
					main.setAsFailed(null, -16,post);
					main.clearURL(tab);
					return;
				}
			} else main.clearURL(tab);

		}catch(e){log("main.onFrameLoad: "+e);}},

		toggle : function(opt,app){
			var targetConfig=(app||null)?app.config:userConfig;
			var targetOpts=(app||null)?app.opts:opts;
			if (targetOpts[opt]){
				targetConfig.set(opt, false);
				targetOpts[opt] = false;
			} else {
				targetConfig.set(opt, true);
				targetOpts[opt] = true;
			}
               targetConfig.save();
		},

		getAppDropDownList : function(selectedIndex,allowBlank){
			var retApps=[];
			//add the fake initial option
			retApps.push(createElement("option",{textContent:"select an app",value:""}));
			retApps.push(createElement("option",{textContent:"* All",value:""}));
			if (allowBlank) retApps.push(createElement("option",{textContent:"all apps",value:""}));

			for(var i in apps){
				if (!apps[i].parent) {
					var elem = createElement("option",{textContent:apps[i].name,value:i});
					if ((selectedIndex||null) == i) elem.selected = true;
					retApps.push(elem);
				}
			}
			return retApps;
		},

		getBonusDropDownList : function(params){
			params=params||{};
			var selected = params.selected||"";
			var appID = params.appID||null;
			var dropID = params.dropID||false; //force the element value to drop its appID prefix

			var optsret=[], bonuses={};
			if (appID) bonuses = mergeJSON(apps[appID].accText,apps[appID].userDefinedTypes);
			bonuses["dynamic"]="* Dynamic: Just Grab It";
			bonuses["none"]="* None: Break Identification Circuit";
			bonuses["wishlist"]="* Flag as Wishlist";
			bonuses["exclude"]="* Exclude: Prevent Collection";
			bonuses["send"]="* Send Unknown";
			bonuses["doUnknown"]="* Get Unknown";

			//create option values and names;
			for (var i in bonuses) {
				var elem
				if (appID) elem = createElement("option",{textContent:((i.startsWith(appID+"send"))?"Send ":((bonuses[i].substring(0,1)=="*")?"":"Get "))+bonuses[i],value:((dropID)?i.removePrefix(appID):i)});
				else elem = createElement("option",{textContent:bonuses[i],value:i});

				if (appID) {if (selected==((dropID)?i.removePrefix(appID):i) ) elem.selected = true;}
				else {if (selected==i) elem.selected=true;}

				optsret.push(elem);
			}

			return optsret;
		},

		reIDAll : function(){
			for (var p in posts) {
				if (!posts[p].isGhost && posts[p].identify({reid:true}))
					Priority.doEvent("onIdentify",posts[p]);
			}
			main.sortPosts(); //in this case sorting may cancel movetotop and movetobottom
			main.clearGroups();
			main.redrawPosts({postRedraw:true});
		},

		updatePostStatus : function(id){
			var status = posts[id].status;
			var statusNode = selectSingleNode(".//*[contains(@class,'status')]",{node:$("post_"+id)});
			if (statusNode) statusNode.textContent="Status: "+(status||"0") + " " + (main.statusText[status||"0"]);
			status=null; statusNode=null;
		},

		onLikePost : function(post){
			post.isLiked=true;
			return;
			
			//pre beta 40 stuff
			var postID=tab.id;
			var post=tab.post||posts[postID];

			//detect if post process was cancelled by user
			if (post.processCancelled){
				//reset the cancel memory
				post.processCancelled = false;
				log("onLikePost: feedback cancelled by user");
				Collector.close(tab);
				return;
			}

			//detect if valid Collector window still exists
			var windowExists=(tab.hwnd && !tab.hwnd.closed);

			//check if window object is missing
			if (!windowExists) {
				log("onLikePost: tab.hwnd is null or closed");
				Collector.close(tab);
				return;
			}
			
			try{
				var like=tab.hwnd.location.hash.removePrefix("#").getUrlParam("status")=="1";
				if (like) {
					if (tab.post) {
						//tell the post it is liked
						tab.post.isLiked = true;
						//delete the post reference from the tab
						delete tab.post;
					}
					Collector.close(tab);
					return;
				}
			} catch (e){
				//log(""+e);
			}

			tab.tries=(tab.tries||0)+1;
			if (tab.tries<opts.autoliketimeout) setTimeout(function(){main.onLikePost(tab);}, 1000);
			else {
				log("onLikePost: unable to finish feedback",{level:3});
				doAction(function(){Collector.close(tab);});
			}
		},

		toggleSidekick : function(){
			var appID = this.id.split("master_")[1];
			var opt = !(quickOpts["masterSwitch"][appID]||false); //toggle
			quickOpts["masterSwitch"][appID]=opt;
			var className = this.parentNode.className;
			this.parentNode.className = ((opt)?className.removeWord("disabled"):className.addWord("disabled"));
			this.textContent=((opt)?"Disable":"Enable");
			main.saveQuickOpts();
		},

		saveQuickOpts : function(){
			setOptJSON('quickopts_'+profile, quickOpts);
		},

		setAppFilter : function(tab){
			quickOpts.filterApp=tab.appFilter;
			main.saveQuickOpts();
			main.clearGroups();
			main.redrawPosts({postRedraw:false,reorder:true});
			Priority.doEvent("onSetAppFilter",apps[tab.appFilter]);
			debug.print(["Collection Tab Selected",main.currentAppTab,apps[tab.appFilter]]);
		},
		
		setDisplay : function(){
			var x=this.getAttribute("name");
			quickOpts.displayMode=x;
			main.saveQuickOpts();
			main.redrawPosts({postRedraw:true,reorder:true});
			main.setDisplayCols();
		},
		
		setDisplayCols : function(params){
			params=params||{};
			params.cols=params.cols||quickOpts.displayCols;
			quickOpts.displayCols=params.cols||1;
			main.saveQuickOpts();
			with (wmConsole.feedNode) {
				className=className
					.toggleWordB(params.cols==1,"singleCol")
					.toggleWordB(params.cols==2,"twoCol")
					.toggleWordB(params.cols==3,"threeCol")
					.toggleWordB(params.cols==4,"fourCol");
			}
		},

		redrawPosts : function(params){
			params=params||{};
			var feedNode=wmConsole.feedNode;
			
			//set the proper display mode
			feedNode.className=feedNode.className
				.toggleWordB((quickOpts.displayMode=="1" || quickOpts.displayMode=="3"),"short");
			
			//avoid order issues by removing the posts from the panel
			main.clearPosts();

			//redraw||reorder
			for (var p in posts) {
				var post=posts[p];
				if (!post.isGhost) {
					post.draw(params.postRedraw,params.reorder);
				}
			}
		},

		moveFloater : function(ev){
			if (isChrome) return;
			var img=this, offset=trueOffset(img), scrolled=trueScrollOffset(img),
				post=selectSingleNode(".//ancestor::div[starts-with(@id,'post')]",{node:img}),
				floater=$(post.id.replace("post","floater")), special={};

			//log( (scrolled.left) +","+ (scrolled.top) );

			special.x=(ev.clientX > (document.documentElement.clientWidth/2))?-(240+4+22):0; //width+overshot+BorderAndPadding
			special.y=(ev.clientY > (document.documentElement.clientHeight/2))?-(120+4+12):0;

			floater.style.left=(ev.clientX-(offset.left-scrolled.left))+(2+special.x)+"px";
			floater.style.top=(ev.clientY-(offset.top-scrolled.top))+(2+special.y)+"px";
		},
		
		//create a drip system for autolike, instead of an offset
		queAutoLike : function(post){
			var nowTime = timeStamp();
			var lastInQue = likeQue.last();
			var targetTime = nowTime + (1000*opts.autolikedelay);
			if (lastInQue||null) {
				if (lastInQue.timer>nowTime) {
					targetTime = lastInQue.timer + (1000*opts.autolikedelay);
				}
			}
			likeQue.push({post:post, timer:targetTime, fn:"like"});
			wmConsole.likeQueueCounterNode.textContent = likeQue.length;
		},
		
		//create a drip system for autolike, instead of an offset
		queAutoComment : function(post,say){
			var nowTime = timeStamp();
			var lastInQue = likeQue.last();
			var targetTime = nowTime + (1000*opts.autolikedelay);
			if (lastInQue||null) {
				if (lastInQue.timer>nowTime) {
					targetTime = lastInQue.timer + (1000*opts.autolikedelay);
				}
			}
			likeQue.push({post:post, timer:targetTime, say:say, fn:"comment"});
			wmConsole.likeQueueCounterNode.textContent = likeQue.length;
			//log(["autocomment added",say]);
		},		

		//dump the autolike queue
		emptyAutoLikeQue : function() {
			likeQue=[];
			wmConsole.likeQueueCounterNode.textContent = 0;
		},
		
		//get the next ready autolike target
		checkAutoLikeQue : function() {
			if (likeQue.length<1) return null;
			var nowTime = timeStamp();
			if (likeQue[0].timer<=nowTime) {
				wmConsole.likeQueueCounterNode.textContent = (likeQue.length-1);
				var t=nowTime;
				for (var i in likeQue) {
					i.timer = t;
					t+=(1000*opts.autolikedelay);
				}
				return likeQue.shift(); // no longer returns the post, but the block of what to do with what post
			}
			return null;
		},

		processPosts : function(){
			//dont run if menu is open or if requests are still out or if the console is paused
			if($("Config") || (main.requestsOpen >= opts.maxrequests) || main.paused) return;

			var postNode=selectSingleNode(".//div[starts-with(@id,'post_') and contains(@class,'collect') and not(contains(@class,'paused') or contains(@class,'working'))]",{node:wmConsole.feedNode});
			if (postNode) {
				var post = posts[postNode.id.replace('post_','')];
				if (post) post.open();
			}
		},

		olderPosts : function (params) {
			main.fetch({next:true});
		},

		newerPosts : function (params) {
			main.fetch({prev:true});
		},
		
		fetchRange : function (params) {
			main.fetch({bypassPause:true, range:{since:params.since, until:params.until}});
		},

		cleanPosts : function () {try{
			for (var p in posts) if (!posts[p].isGhost) {
				var post = posts[p];
				with (post) if (!(
					isPinned || isCollect || isWorking ||
					(isTimeout && !opts.cleanTimedOut)
				)) post.remove();
			}
		}catch(e){log("main.cleanPosts(): "+e);}},


		
		setIntervals : function() {try{
			//setup the timer to get new posts
			if (procIntv) window.clearInterval(procIntv);
			procIntv=window.setInterval(main.processPosts, 2000);

			//setup the timer to get new posts
			if (newIntv) window.clearInterval(newIntv);
			if(calcTime(opts.newinterval)>0) newIntv=window.setInterval(main.newerPosts, calcTime(opts.newinterval));

			//setup the timer to get older posts
			if (oldIntv) window.clearInterval(oldIntv);
			if(calcTime(opts.oldinterval)>0) oldIntv=window.setInterval(main.olderPosts, calcTime(opts.oldinterval)+2000);
			olderLimit=calcTime(opts.maxinterval)||0;

			//setup the timer to clean up old posts from the feed
			if (cleanIntv) window.clearInterval(cleanIntv);
			if(calcTime(opts.cleaninterval)>0) cleanIntv=window.setInterval(main.cleanPosts, calcTime(opts.cleaninterval)+250);

			//setup global heartbeat
			if (hbIntv) window.clearInterval(hbIntv);
			hbIntv=window.setInterval(main.onHeartbeat, opts.heartRate);
			
		}catch(e){log("main.setIntervals: "+e);}},

		hideCounters : function(){try{
			hideNodes("//*[contains(@class,'accFailBlock')]");
		}catch(e){log("main.hideCounters: "+e);}},

		showCounters : function(){try{
			showNodes("//*[contains(@class,'accFailBlock')]");
		}catch(e){log("main.showCounters: "+e);}},

		validatePost : function(fbPost){try{
			//validate required post fields
			if (!( exists(fbPost.application) && exists(fbPost.link) && fbPost.type=="link")) {
				return;
			}

			//accept only posts we have sidekicks for
			var app;
			if (!exists(app=apps[fbPost.application.id])) return;

			//accept only posts for which a sidekick is enabled
			if (!quickOpts.masterSwitch[app.appID]) return;

			//create a Post object from the post data
			var post=(posts[fbPost]=new Post(fbPost));
			var hasID=post.identify();
			main.sortPosts(); //make sure new posts fit the current sort order and direction
			if (hasID) {
				Priority.doEvent("onValidate",post);
				Priority.doEvent("onIdentify",post);
				post.draw(true,true);
				
				//track the post
				if (opts.useFriendTracker && !post.isMyPost){
					FriendTracker.track(post);
				}
			}
		}catch(e){log("main.validatePost: "+e);}},

		fetch : function(params) {try{
			params=params||{};
			if (main.fetchPaused && !params.bypassPause) return;

			//convert a single passed app to a single entry list
			if (exists(params.apps) && ((params.apps.objType||null)=="app")) {
				var ret={};
				ret[params.apps.appID]=params.apps;
				params.apps=ret;
			}

			//convert a single passed feed to an array
			if (exists(params.feeds) && ((params.feeds.objType||null)=="feed")) {
				params.feeds=[params.feeds];
			}
						
			//for each feed
			var feeds=params.feeds||FeedManager.feeds;
			for (var f=0,len=feeds.length;f<len;f++) { 
				var feed=feeds[f]; 
				if (feed.enabled || params.bypassFeedDisabled) {
					//for each app
					for (var a in (params.apps||apps)) {
						var app=(params.apps||apps)[a];
						//only fetch for enabled apps
						//where we are fetching new
						//or if we are fetching old we are not at our older limit
						var feedFilter=feed.filters["app_"+a];
						if ((app.enabled || params.bypassAppDisabled) && (feedFilter.enabled || params.bypassFilterDisabled) && !(
								params.next && feedFilter.olderLimitReached
							)
						){
							var G=Graph.fetchPosts({
								callback:main.validatePost,
								next:(params.next||null),
								prev:(params.prev||null),
								limit:olderLimit,
								range:(params.range||null), //special for new rules manager actions
								fetchQty:(opts.fetchQty||25),
								feed:feed,
								appName:app.name,
								filter:"app_"+a
								
								//filter should not be used with
								//any feed not matching
								//feed.url.contains("/me/home")
								//but we use it anyway for storage
								//purposes
							});
							
							if (G) {if (G.requestAlreadyOut) {
							} else if (G.initRequestSlow) {
							} else if (G.olderLimitReached) {
								//set this feed to never fetch older again
								feed.filters["app_"+a].olderLimitReached=true;
							} else if (G.getAuthTokenFailed) {
							}}
						}
					}
				}
			}
		}catch(e){log("main.fetch: "+e);}},
		
		changeDebugSettings : function(){try{
			if (debug && debug.initialized) {
				debug.doDebug = opts.debug;
				debug.debugLevel = parseInt(opts.debugLevel);
				debug.debugMaxComments = opts.debugMaxComments;
				debug.useScrollIntoView = opts.debugScrollIntoView;
				debug.stackRepeats = opts.debugStackRepeats;
			} else {
				if (debug) debug.init();
				setTimeout(main.changeDebugSettings,1000);
			}
		}catch(e){log("main.changeDebugSettings: "+e);}},
				
		changeConfigSettings : function(){try{
			userConfig.sectionsAsTabs=opts.configSectionsAsTabs;
			userConfig.separatorsAsTabs=opts.configSeparatorsAsTabs;
			userConfig.useScrollIntoView=opts.configScrollIntoView;
			userConfig.confirms={
				save:opts.configConfirmSave,
				cancel:opts.configConfirmCancel,
				"import":opts.configConfirmImport,
				restore:opts.configConfirmRestore
			};
		}catch(e){log("main.changeConfigSettings: "+e);}},

		resizeConsole : function(){try{
			//negotiate height with fb bluebar
			var node=$("pagelet_bluebar");
			var h=(node)?elementOuterHeight(node):0;
			
			with($("wmContent")){
				style.height=document.documentElement.offsetHeight-h+"px";
				style.width=document.documentElement.offsetWidth+"px";
			}
			wmConsole.tabContainer.redraw();
			wmConsole.collectTabControl.redraw();

		}catch(e){log("main.resizeConsole: "+e);}},

		setColors : function(){try{
			var colors=["excluded","working","timeout","paused","nodef","failed","accepted","scam","pinned"];
			var css="";
			for (var c=0, color; (color=colors[c]); c++) {
				css+=("div."+color+"{background-color:"+opts["colors"+color]+" !important;}\n");
			}
			//set the new transition delay timer
			css+=(".wm.post.short:hover .floater {-moz-transition-property: padding,border,width,height;-moz-transition-delay:"+opts["transitiondelay"]+"s; width:240px; padding:5px 10px;border:1px solid;}\n");
			remove($("user_colors_css"));
			addGlobalStyle(css,"user_colors_css");
		}catch(e){log("main.setColors: "+e);}},

		initConsole : function(){try{
			wmConsole.loading=false;
			if (wmConsole.initialized) log("WM Console Initialized");

			//show options menu button
			with (wmConsole.configButton) {
				className = className.removeWord("jsfHidden");
			}

			//set console heights
			main.resizeConsole();

			//load feed sources
			FeedManager.init();
			
			//import friend tracker data
			//and delete posts out of bounds with our "track for how many days"
			FriendTracker.init();
			FriendTracker.clean();

			//initialize user colors
			main.setColors();
			
			//set up the priorities and limits object
			//and new rules manager
			Priority.init();

			//decipher the dynamic tests
			Grabber.init();

			//show counters
			if (opts.showcounters) main.showCounters(); else main.hideCounters();
			
			//set intervals
			main.setIntervals();
			
			//set autopause
			if (opts.autopausecollect) main.pauseCollecting(true);
			if (opts.autopausefetch) main.pauseFetching(true);
			
			//open a channel for sidekick communication
			main.fetchSidekickData();

			//add an entrypoint for sidekicks since we know FB gave us access
			var createDock = function(){
				document.body.appendChild(
					createElement('div',{id:'wmDock',style:'display:none;',onclick:function(){
						Dock.answerDockingDoor();
					}})
				);
				document.body.appendChild(
					createElement('div',{id:'wmDataDump',style:'display:none;'})
				);
			};
			
			createDock();			

		}catch(e){log("main.initConsole: "+e);}},

		cleanHistory : function(params){try{
			log("Cleaning History");
			params=params||{};
			var ask=opts.historyConfirmClean;
			if (params.noConfirm || !ask || (ask && confirm("Clean and pack history for this profile?"))){
				//history = getOptJSON("history_"+profile)||{};
				var ageDays=parseInt(opts.itemage);
				var timeNow=timeStamp();
				for(var i in history) {
					if( ( (timeNow-history[i].date) /day) > ageDays) {
						delete history[i];
					}
				}
				setOptJSON("history_"+profile, history);
			}
		}catch(e){log("main.cleanHistory: "+e);}},

		optionsSetup : function(){try{
			debug.print("main.optionsSetup:");

			//create the settings tree
			userConfig = new Config({
				storageName:"settings_"+(quickOpts.useGlobalSettings?"global":profile),
				onSave:main.onSave,
				title:"FB Wall Manager "+version+(quickOpts.useGlobalSettings?" (!! Global Settings !!)":""),
				logo:createElement("span",{}[
					createElement("img",{className:"logo",src:"",textContent:"v"+version}),
					createElement("text","v"+version)
				]),
				css:(
					wmConsole.dynamicIcons()+
					jsForms.globalStyle()
				),
				settings:{
					btn_useGlobal:{
						type:"button",
						label:"Use Global Settings", 
						title:"Switch to using a global storage for settings. Those settings can then be used by other accounts (not browser profiles).",
						script:function(){
							if (quickOpts.useGlobalSettings||false) {
								//already using global settings
								return;
							}
							if (confirm("Switch to using global (shared) settings?")){
								quickOpts.useGlobalSettings=true;
								main.saveQuickOpts();
								userConfig.title = "FB Wall Manager "+version+" (!! Global Settings !!))";
								userConfig.storageName = "settings_global";
								userConfig.values=userConfig.read();
								userConfig.configure();
								userConfig.reload();
							}
						},
					},
					btn_useOwnProfile:{
						type:"button",
						label:"Use Profile Settings", 
						title:"Switch to using your own profile storage for settings.",
						script:function(){
							if (!(quickOpts.useGlobalSettings||false)) {
								//already using profile settings
								return;
							}
							if (confirm("Switch to using your own profile settings?")){
								quickOpts.useGlobalSettings=false;
								main.saveQuickOpts();
								userConfig.title = "FB Wall Manager "+version;
								userConfig.storageName = "settings_"+profile;
								userConfig.values=userConfig.read();
								userConfig.configure();
								userConfig.reload();
							}
						},
					},
				
					wmtab_opts:tabSection("Host Options",{
					
						section_basicopts:section("Basics",{
							/*authTokenTools:optionBlock("Authorization",{
								devAuthToken:checkBox("Automatically check my developer tool app for my Auth Token"),									
							},true),*/
						
							intervals:optionBlock("Post Fetching",{
								newinterval:{
									label:"Get Newer Posts Interval",
									type:"selecttime",
									title:"Fetch new posts from facebook after a set time.",
									options:{
										"off":"Off",
										"tenth":"6 seconds",
										"sixth":"10 seconds",
										"half":"30 seconds",
										"one":"1 minute",
										"two":"2 minutes",
										"three":"3 minutes",
										"four":"4 minutes",
										"five":"5 minutes",
										"ten":"10 minutes",
									},
									"default":"t:30s"
								},

								fetchQty:{
									label:"Fetch how many?",
									type:"select",
									title:"Posts fetched per request. Higher numbers affect speed of fetching.",
									options:{
										"5":"5",
										"10":"10",
										"25":"25",
										"50":"50",
										"100":"100",
										"250":"250",
										"500":"500 (FB maximum)", //known maximum fetch as of 9/8/2013
									},
									"default":"25"
								},

								oldinterval:{
									label:"Get Older Posts Interval",
									type:"selecttime",
									title:"Fetch previous posts from facebook after a set time.",
									options:{
										"off":"Off",
										"tenth":"6 seconds",
										"sixth":"10 seconds",
										"half":"30 seconds",
										"one":"1 minute",
										"two":"2 minutes",
										"three":"3 minutes",
										"four":"4 minutes",
										"five":"5 minutes",
										"ten":"10 minutes",
									},
									"default":"off"
								},

								maxinterval:{
									label:"How old is too old?",
									type:"selecttime",
									title:"Tell WM what you think is a good max post age to fetch. Also affects which posts are considered 'stale'.",
									options:{
										"off":"Off/Infinite",
										"hour":"1",
										"2hour":"2",
										"3hour":"3",
										"4hour":"4",
										"8hour":"8",
										"12hour":"12",
										"18hour":"18",
										"24hour":"24",
										"32hour":"32",
										"48hour":"48",
									},
									"default":"t:1d"
								},

							},true),

							autoPauseBlock:optionBlock("Fetching/Collecting Autopause",{
								autopausefetch:checkBox("Pause Fetching after First Fetch"),
								autopausecollect:checkBox("Pause Collection on Startup"),
							},true),

							multiTaskBlock:optionBlock("Multi-task",{
								maxrequests:inputBox("Max requests simultaneously",1),
								recycletabs:inputBox("Recycle Windows/Tabs",1),
								recycletabsall:checkBox("Recycle All",true),
							},true),

							queBlock:optionBlock("Task-Queue",{
								queuetabs:checkBox("Force all posts and autolikes through one tab using a queue (overrides multi-task)",true),
							},true),

							timeoutBlock:optionBlock("Time-outs",{
								reqtimeout:inputBox("Item Acceptance Page Timeout (seconds)",30),
								failontimeout:checkBox("Mark Timeout as Failure (default: retry indefinitely)"),
							},true),
						}),

						section_access:section("Accessibility",{
							shortModeBlock:optionBlock("Short Mode",{
								thumbsize:{
									label:"Thumbnail Size",
									type:"select",
									title:"Size of bonus thumbnails in display mode: short and .",
									options:{
										"mosquito":"16px",
										"tiny":"24px",
										"small":"32px",
										"medium":"48px",
										"large":"64px",
										"xlarge":"96px",
									},
									"default":"medium"
								},
								transitiondelay:inputBox("Hover Box Delay (s)",1),
							},true),

							accessTweaksBlock:optionBlock("Tweaks",{
								debugrecog:checkBox("Show Identified Text (instead of original link text)",true),
								showcounters:checkBox("Show Accept/Fail Counts",true),
								showdynamictips:checkBox("Show Dynamic Console Tips",true),
								appsConfirmDeleteUDT:checkBox("Confirm Delete User Defined Types",true),
							},true),

							toolBoxBlock:optionBlock("Customize Post Toolbox",{
								showtoolbox:checkBox("Enable ToolBox", true),

								showopen:checkBox("Open Post",true),
								showmarkfailed:checkBox("Mark As Failed",true),
								showmarkaccepted:checkBox("Mark As Accepted",true),
								showlike:checkBox("Like Post",true),
								showreid:checkBox("Re-ID Post",true),
								showmovetop:checkBox("Move to Top",true),
								showmovebottom:checkBox("Move to Bottom",true),
								showpin:checkBox("Pin Post",true),
								showclean:checkBox("Clean Post",true),
								showpostsrc:checkBox("Show Post Source",true),

								//new stuff
								showcancelprocess:checkBox("Cancel Process or Like",true),
								showrestartprocess:checkBox("Restart Process or Like",true),
								showpausetype:checkBox("Pause Bonus Type",true),
								showunpausetype:checkBox("Unpause Bonus Type",true),
								showaddfeed:checkBox("Add To Feeds",true),

								showmakerule:checkBox("Rule From Post",true),
								showoriginaldata:checkBox("Show Original Data",true),
								showautocomment:checkBox("Auto Comment",true),
								
							},true),
							
							littleToolBoxBlock:optionBlock("Customize Mini Toolbox",{
								littleButtonSize:{
									label:"Mini Toolbutton Size (requires refresh to redraw)",
									type:"select",
									title:"Size of buttons on mini toolbars",
									options:{
										"16":"16px",
										"24":"24px",
										"32":"32px",
									},
									"default":"24",
								},
							},true),

							userColorsBlock:optionBlock("Colors",{
								colorsaccepted:colorBox("Accepted","limegreen"),
								colorsfailed:colorBox("Failed","red"),
								colorsworking:colorBox("Working","yellow"),
								colorsexcluded:colorBox("Excluded","gray"),
								colorspaused:colorBox("Paused","silver"),
								colorsnodef:colorBox("No Definition","deepskyblue"),
								colorsscam:colorBox("Potential Scam","purple"),
								colorspinned:colorBox("Pinned","black"),
								colorstimeout:colorBox("Timeout","orange"),
							},true),
							

						}),

						section_feedback:section("Feedback",{
							publishwarning:{type:"message",title:"Autolike has changed",textContent:"As of WM beta 40 you must allow 'publish_actions' on the 'user data permissions' tab in your Graph API Explorer token builder.",newitem:true},
							gotoapiexplorer:anchor("Visit API Explorer","http://developers.facebook.com/tools/explorer"),
							autoSetup:optionBlock("Setup",{
								useautocomment:checkBox("Use Auto-comment (experimental)"),
								useautolike:checkBox("Use Auto-like"),
								//autoliketimeout:inputBox("Timeout (seconds)",30),
								autolikedelay:inputBox("Ban-Prevention Delay (seconds)",3),
							},true),
							autoLikeBlock:optionBlock("Perform Feedback For",{
								autolikeall:checkBox("All Posts"),
								autolikeaccepted:checkBox("Accepted Posts"),
								autolikesent:checkBox("Sent Posts"),
							},true),
							autoCommentListBlock:optionBlock("Comments (experimental)",{
								autocommentlist:textArea("Random Comments (One per line)","Thanks\nThank you\nthanks"),
							},true),
							blockautolikebygame:optionBlock("Block Feedback by Game",{},false),
						}),

						section_filters:section("Filters",{
							displayfilters:optionBlock("Remove Feed Parts (Classic Mode Only)",{
								hideimages:checkBox("Images (All)"),
								hideimagesunwanted:checkBox("Images (Unwanted Posts)"),
								hidebody:checkBox("Post Body Text"),
								hidevia:checkBox("Via App"),
								hidedate:checkBox("Date/Time"),
							},true),

							filters:optionBlock("Hide By Type",{
								hidemyposts:checkBox("My Posts"),
								hideunwanted:checkBox("Unwanted"),
								hideaccepted:checkBox("Accepted"),
								hidefailed:checkBox("Failed"),
								hidescams:checkBox("Scams"),
								hidestale:checkBox("Stale Posts"),
								hideexcluded:checkBox("Excluded"),
								hideliked:checkBox("Liked By Me"),
								hideunsupported:checkBox("Unsupported Apps"),

								donthidewishlists:checkBox("Don't Hide Known Wish Lists"),
							}),

							//allow hiding all posts by particular games
							filterapps:optionBlock("Hide By App",{}),

							//now added dynamically as appID+"dontsteal"
							dontstealBlock:optionBlock("Don't take W2W posts not for me",{}),

							skipopts:optionBlock("Skip By Type",{
								skipliked:checkBox("Liked By Me"),
								skipstale:checkBox("Day-Old Posts"),
							}),

							filterTweaksBlock:optionBlock("Tweaks",{
								accepton15:checkBox("Mark 'Unrecognized Response' As Accepted"),
								markliked:checkBox("Mark Liked As Accepted (must check Skip Liked)"),
							},true),

							filterCleanupBlock:optionBlock("Cleanup",{
								cleaninterval:{
									label:"Cleanup Interval",
									type:"selecttime",
									title:"Remove unwanted posts from collection console after a set time.",
									options:{
										"off":"Off",
										"one":"1 minute",
										"two":"2 minutes",
										"five":"5 minutes",
										"ten":"10 minutes",
										"fifteen":"15 minutes",
										"thirty":"30 minutes",
										"hour":"1 hour",
									},
									"default":"off"
								},
								cleanTimedOut:checkBox("Clean timed out posts",true),
							},true),
						}),

						section_history:section("History",{
							itemage:inputBox("How long to keep tried items in memory (days)",2),
							oblock_historyConfirms:optionBlock("Confirm (Changes available on next config open)",{
								historyConfirmClear:{type:"checkbox",label:"Clear History",title:"Confirm before clearing history.","default":true},
							},true),
							reset:button("Clear History",
								main.resetAccepted
							),
						}),

						section_feedopts:section("Feeds Manager",{
							oblock_feedsConfirms:optionBlock("Confirm",{
								feedsConfirmDeleteFeed:{type:"checkbox",label:"Delete Rule",title:"Require confirmation to delete a feed.","default":true},
							},true),
						}),

						section_dynamicopts:section("Dynamic Grabber",{
							dynamicopts:optionBlock("Dynamic Collection",{
								dynamicFirst:checkBox("Run Dynamics BEFORE Sidekicks",true),
							},true),
							enableDynamic:optionBlock("Enable Dynamics by Game",{}),
							oblock_dynamicConfirms:optionBlock("Confirm",{
								dynamicConfirmDeleteTest:{type:"checkbox",label:"Delete Rule",title:"Require confirmation to delete a test.","default":true},
							},true),
						}),

						section_friendtrackopts:section("Friend Tracker",{
							useFriendTracker:checkBox("Enable Friend Tracking",true),
							trackTime:inputBox("Track For How Many Days",2),
							trackeropts:optionBlock("Track Data",{
								trackCreated:checkBox("Post Creation Counts",true),
								trackLastKnownPost:checkBox("Last Known Post Time",true),
								trackAccepted:checkBox("Bonuses Accepted",true),
								trackFailed:checkBox("Bonuses Failed",true),
							},true),
							oblock_trackerConfirms:optionBlock("Confirm",{
								trackConfirmClearUser:{type:"checkbox",label:"Clear User Data",title:"Require confirmation to clear user data.","default":true},
							},true),
						}),
						
						section_rulesopts:section("Rules Manager",{
							oblock_rulesHeartbeat:optionBlock("Heartbeat",{
								heartRate:inputBox("Global Heartbeat Delay (ms)",1000),
								heartbeatAffectsApps:{type:"checkbox",label:"Affect Apps",title:"Heartbeat can be heard at app level on every rule at once. This can slow down your system."},
								heartbeatAffectsPosts:{type:"checkbox",label:"Affect Posts",title:"Heartbeat can be heard at post level on every rule at once. This can slow down your system."},
								heartbeatAffectsRules:{type:"checkbox",label:"Affect Rules",title:"Heartbeat can be heard at rule level on every rule at once. This can slow down your system."},
								heartbeatAffectsFeeds:{type:"checkbox",label:"Affect Feeds",title:"Heartbeat can be heard at feed level on every rule at once. This can slow down your system."},
								heartbeatAffectsFeedFilters:{type:"checkbox",label:"Affect Feed Filters",title:"Heartbeat can be heard at feed filter level on every rule at once. This can slow down your system."},
							},true),
							oblock_rulesConfirms:optionBlock("Confirm",{
								rulesConfirmDeleteValidator:{type:"checkbox",label:"Delete Validator",title:"Require confirmation to delete a rule's validator.","default":true},
								rulesConfirmDeleteAction:{type:"checkbox",label:"Delete Action",title:"Require confirmation to delete a rule's action.","default":true},
								rulesConfirmDeleteRule:{type:"checkbox",label:"Delete Rule",title:"Require confirmation to delete a rule.","default":true},
								rulesConfirmResetLimit:{type:"checkbox",label:"Reset Limit",title:"Require confirmation to reset individual limits.","default":true},
								rulesConfirmResetAllLimits:{type:"checkbox",label:"Reset All Limits",title:"Require confirmation to reset all limits.","default":true},
								rulesConfirmHatch:{type:"checkbox",label:"Hatch Eggs",title:"Require confirmation to hatch eggs.","default":true},
							},true),
							rulesJumpToNewRule:{type:"checkbox",label:"Jump To New Rules",title:"When new rules are created from tests or posts, select the rules manager tab and scroll the new rule into view.","default":true},
						}),

						section_dev:section("Debug",{
							oblock_debugTweaks:optionBlock("Tweaks",{
								pinundefined:checkBox("Pin Undefined Bonus Types"),
							},true),
							debugOpts:optionBlock("Debug",{
								debug:checkBox("Enable Debug",true),
								debugLevel:{
									label:"Debug Sensitivity",
									title:"Sets the level of errors and warnings to report. 0 is all, 5 shows only the worst.",
									type:"select",
									options:{
										"0":"Function calls",
										"1":"Function subsections & debug notes",
										"2":"Captured expected errors",
										"3":"Known open errors",
										"4":"Unexpected errors",
										"5":"Fatal errors",
									},
									"default":"0"
								},
								debugMaxComments:inputBox("Max debug lines (0 for no limit)",100),
								debugScrollIntoView:checkBox("Use scrollIntoView"),
								debugStackRepeats:checkBox("Stack Immediate Repeats"),

							},true),
							advDebugOpts:optionBlock("Advanced Debug",{
								devDebugFunctionSubsections:checkBox("Debug Function Subsections",false),
								devDebugGraphData:checkBox("Debug Graph Packets (not available for Chrome)",false),
							},true),
							GM_special:optionBlock("Script-runner Options",{
								useGM_openInTab:checkBox("Use GM_openInTab instead of window.open",false),
							},true),

						}),

						section_configopts:section("Config",{
							oblock_configConfirms:optionBlock("Confirm (Changes available on next config open)",{
								configConfirmSave:{type:"checkbox",label:"Save",title:"Confirm before saving settings.","default":true},
								configConfirmCancel:{type:"checkbox",label:"Cancel",title:"Confirm before closing settings without saving.","default":true},
								configConfirmImport:{type:"checkbox",label:"Import",title:"Confirm before importing settings.","default":true},
								configConfirmRestore:{type:"checkbox",label:"Restore Defaults",title:"Confirm before restoring defaults.","default":true},
							},true),
							oblock_configStyling:optionBlock("Styling (Changes available on next config open)",{
								configSectionsAsTabs:{type:"checkbox",label:"Display Sections as Tabs",title:"Converts top level roll-outs only. Display those rollouts as tabs on next open of config."},
								configSeparatorsAsTabs:{type:"checkbox",label:"Display Separators as Tabs",title:"Converts second level roll-outs only. Display those rollouts as tabs on next open of config. Removes select all/none buttons on top of the separator."},
							},true),
							oblock_configTweaks:optionBlock("Tweaks (Changes available on next config open)",{
								configScrollIntoView:{type:"checkbox",label:"Use scrollIntoView",title:"When tabs and sections are opened, use the scrollIntoView function to bring them more fully into view. This is jerky at best."},
							},true),
						}),
					}),

					wmtab_games:tabSection("Sidekick Options",{
						skmovedwarning:{type:"message",title:"Sidekick options have moved",textContent:"Sidekick options have been moved to separate config windows. Access them by using the 'Manage Sidekicks' tab, where you can find new 'Options' buttons for each sidekick."},
					}),

					wmtab_info:tabSection("Info",{
						MainMessageCenter:separator("Documentation - Messages - Help",null,{
							Mainupdate:anchor("Update Script","http://userscripts.org/scripts/source/147225.user.js"),
							donateWM:{type:"link",label:"Donate for FBWM via Paypal",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=merricksdad%40gmail%2ecom&lc=US&item_name=Charlie%20Ewing&item_number=FBWM&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"},
							Mainwikipage:anchor("Wiki Support Page","http://fbwm.wikia.com/wiki/Known_Issues"),
							Mainsetupinfo:anchor("Setup Info","http://fbwm.wikia.com/wiki/New_User_Setup"),
							Maindiscuss:anchor("Known Bugs","http://fbwm.wikia.com/wiki/Known_Issues"),
							Mainrevisionlog:anchor("Revision Log","http://fbwm.wikia.com/wiki/Revisions"),
						},true),
					}),
					
					wmtab_scripts:tabSection("Get More!",{
						
					}),

				},
			});
			
			// add options shortcut to user script commands
			GM_registerMenuCommand("Wall Manager "+version+" Options", function(){userConfig.open();});
		}catch(e){log("main.optionsSetup: "+e);}},

		init : function(){try{
			//capture user id/alias/name and make it global
			userID = Graph.userID;
			userAlias = Graph.userAlias;
			profile = userAlias||userID;

			debug.print("UserID:"+userID+"; UserAlias:"+userAlias+"; WM is Using:"+profile);

			//get quickopts
			quickOpts = getOptJSON('quickopts_'+profile)||{};
			quickOpts["filterApp"]=(quickOpts["filterApp"]||"All");
			quickOpts["displayMode"]=(quickOpts["displayMode"]||"0");
			quickOpts["masterSwitch"]=(quickOpts["masterSwitch"]||{});
			quickOpts["useGlobalSettings"]=(quickOpts["useGlobalSettings"]||false);

			//create the options menu
			main.optionsSetup();

			//duplicate the options saved in userConfig
			main.updateSettingsValues();

			//set up the config with its internal special variables
			main.changeConfigSettings();

			//setup debug beyond its defaults
			main.changeDebugSettings();
			
			//clean history
			history = getOptJSON('history_'+profile)||{};
			main.cleanHistory();
						
			//prep the console now that we have an id and/or alias
			//and then carry on with our init
			wmConsole.init({callback:main.initConsole});
		}catch(e){log("main.init: "+e);}},
		
		receiveSidekickMessage: function(event) {
			if (isObject(event.data)) {
				var data=event.data; //just shorten the typing
				if (data.channel=="WallManager"){
					//log(JSON.stringify(data));
					//$("WM_debugWindow").childNodes[1].lastChild.scrollIntoView();
					switch (data.msg){
						case 2: //getting a comOpen response from sidekick
							//Collector.tabs[data.tabID].comOpen=true;
							break;
							
						case 4: //getting a status package from sidekick
							switch (data.params.action){
								case "onFrameLoad":
									main.onFrameLoad(data.params);
									break;
								case "onFrameLoad3":
									main.onFrameLoad3(data.params);
									break;
							}
							break;
					}
				}
			}
		},		

		run : function() {try{
			// pre-load console images
			//for(var img in imgs) try{new Image().src = imgs[img];}catch(e){log("preload: "+e);}

			//special about:config entry for disabling storage of fb auth token
			//should help multi account users
			//if (getOpt("disableSaveAuthToken")) 
			Graph.authToken=null;
			
			//patch 38 auth token stuff
			var flagManualAuthSuccessful=getOpt("flagManualAuthSuccessful")||false;					
			if (flagManualAuthToken && !flagManualAuthSuccessful) {
				var m="WM can no longer access your FB Access Token without your manual assistance.\nTo successfully fetch posts, please complete the following:\n\n*In a new browser window, visit: http://developers.facebook.com/tools/explorer\n\n*If required, allow that app access to your facebook information\n*Find the 'Get Access Token' button and click it\n*In the panel that appears, click 'extended permissions'\n*Be sure that 'read_stream' is selected or otherwise not blank\n*If you want to use autolike/autocomment also select 'publish_actions' from the 'user data permissions' tab*Click the 'Get Access Token' button\n*Now find the box that says 'Access Token' and select its value\n*Copy that value and paste it into the box on this promp\n\nNote: this token does not last forever, you may need to repeat this process";
				var manualToken = prompt(m,"paste token here");
				
				//validate manualToken at least somewhat
				
				//halt if manual token is not given
				if (manualToken=="" || manualToken==null || manualToken=="paste token here") {
					alert("manual token not accepted, please refresh and try again");
					return;
				}
				
				//pass the manual token along
				Graph.authToken=manualToken;
				
				//consider saving time by looking for auth tokens automatically from here out
				var m = "WM thinks your auth token setup is successful.\nIf you like, I can make it so WM just checks your dev tool for new auth tokens every time.\n\nPress Cancel to continue entering auth codes manually.\n\n*If you have multiple facebook accounts on this computer using WM, please make sure you set up the API explorer with every account.";
				var saveProgress = confirm(m);
				if (saveProgress) {
					setOpt("flagManualAuthSuccessful",true);					
				}
			} 

			var G=Graph.fetchUser({callback:main.init});
			
			if (G){if (G.requestAlreadyOut) {
			} else if (G.initRequestSlow) {
			} else if (G.olderLimitReached) {
			} else if (G.getAuthTokenFailed) {
			}}
			
		}catch(e){log("main.run: "+e);}}
	}; //end of main

	//returns the current date-time in unix format, not localized
	main.__defineGetter__("currentTime",function(){try{
		return timeStamp();
	}catch(e){log("main.currentTime: "+e);}});
	
	//returns the appID of the selected app tab on the collection panel, or 'all' if 'Show All' is selected
	main.__defineGetter__("currentAppTab",function(){try{
		return wmConsole.collectTabControl._selectedTab.appFilter;
	}catch(e){log("main.currentAppTab: "+e);}});
	
	
	//*****short text versions for userConfig menu options*****

	var checkBox=function(l,d,c,n){return ({type:"checkbox",label:l,"default":d||false,kids:c,newitem:n});}
	var hidden=function(l,d,c){return ({type:"hidden",label:l,"default":d,kids:c});}
	var optionBlock=function(l,c,hideSelectAll,n){hideSelectAll=hideSelectAll||false;return ({type:"optionblock",label:l,kids:c,hideSelectAll:hideSelectAll,newitem:n});}
	var separator=function(l,s,c,hideSelectAll){hideSelectAll=hideSelectAll||false; return ({type:"separator",label:l,section:s,kids:c}); }
	var section=function(l,c){return ({type:"section",label:l,kids:c});}
	var tabSection=function(l,c){return ({type:"tab",label:l,kids:c});}
	var inputBox=function(l,d,n){return ({type:"float",label:l,"default":(d||0),newitem:n});}
	var textArea=function(l,d,n){return ({type:"textarea",label:l,"default":(d||0),newitem:n});}
	var colorBox=function(l,d,n){return ({type:"colorbox",label:l,"default":(d||"black"),newitem:n});}
	var button=function(l,s){return ({type:"button",label:l,script:s});}
	var anchor=function(l,u,t){return ({type:"link",label:l,href:u,title:(t||'')});}


//***************************************************************************************************************************************
//***** Immediate
//***************************************************************************************************************************************

	log("Script: main initialized",{level:0});

	// section for reclaiming memory and stopping memory leaks
	var newIntv=null; //refresh interval
	var oldIntv=null; //refresh interval
	var procIntv=null; //process interval
	var cleanIntv=null; //post removal interval
	var olderLimit=day; //default 1 day
	var hbIntv=null; //global heartbeat interval

	var cleanup=function() {try{
		//destroy intervals
		if (newIntv) window.clearInterval(newIntv);
		if (oldIntv) window.clearInterval(oldIntv);
		if (procIntv) window.clearInterval(procIntv);
		if (cleanIntv) window.clearInterval(cleanIntv);
		if (hbIntv) window.clearInterval(hbIntv);
		oldIntv = newIntv = procIntv = cleanIntv = hbIntv = null;

		//close the sidekick tabs
		Collector.closeAll();

		//remove this event listener
		window.removeEventListener("beforeunload", cleanup, false);
		window.removeEventListener("message", main.receiveSidekickMessage, false);
		window.removeEventListener("resize", main.onWindowResize, false);

		//clean up memory
		main=null; wmConsole=null; Dock=null; Graph=null; Collector=null;
		jsForms=null; FriendManager=null; FeedManager=null; Grabber=null;
		olderLimit=null;
		checkBox=null; hidden=null; optionBlock=null; separator=null; 
		section=null; inputBox=null; button=null; anchor=null;
		tabSection=null; textArea=null; colorBox=null;
		history=null; posts=null; apps=null; userConfig=null;
		likeIt=null; opts=null; quickOpts=null; displayGroups=null;
		Test=null; FeedFilter=null; Feed=null; Friend=null;
		Priority=null; priorityAction=null; postPart=null;
		priorityEvents=null; priorityOperands=null;
		RuleValidator=null; RuleAction=null; Rule=null;
		Post=null; App=null; Sidekick=null;
		
	}catch(e){log("cleanup: "+e);}}
	window.addEventListener("beforeunload", cleanup, false);
	window.addEventListener("resize", main.onWindowResize, false);
	
	//start it up
	main.run();
	
})(); // anonymous function wrapper end

/* to do
fix issues caused by closing the autolike window
	
-history manager

--ability to clear history by parameter, like appID or which

-config

--section/separator/tab
---restore defaults
---close children
---open children

-forms

--treeview
---line numbers
---node images
---proper node handles
---show root/branch lines

--time picker
---X (seconds|minutes|hours|days|weeks|years) (since:subtract from now|just the value|until:add to now) and then convert to unix timestamp

--color picker
---fix buttons

-queing

--processing is messed up if options change from queue to multi

-sidekick

--allow multiple sidekicks by the same appID of different dock types

-friend manager

--export list

-other

--help files/buttons
--correct the debug levels of all logs
--give every function within the wm host script a debug entry and sub-entries

*/


/* recent changes
b1-2
window handle loss is now reduced by using delayed retries
option menu tabs look a bit better, nest a bit better, and can be used on the top-most level of a menu
migrated options menu top levels to tabs: this keeps your game options and host options visibly separate, making the menu cleaner
fixed issue with unknown posts not being marked accepted/failed on refresh
added new method of sidekick communication so it works with Google Chrome
upgraded GM_xmlhttpRequest calls to make use of the new GM 1.0+ timeout feature
-WM2 users will no longer have timeout support due to changes in GM 1.0+
substantially upgraded the priority/rules interface and functionality
repaired the following functions in the wmLibrary: inArrayWhere, removeByValue, replace; all of which are part of the array prototype additions. There was a noticeable issue with string.addWord and string.removeWord when used with CSS classnames that caused the first word to be ignored.
updated the sidekick tutorial script to match communication changes for WM3
added ability to try to use GM_openInTab instead of window.open, your choice as defined in the options menu

b3-5
rules manager now contains everything you had with dynamic grabber, plus a lot more
revamped options menu system to 2.0
menu options store cleaner and more accurately
menu can now be opened at a branch instead of the entire thing (not sure I will ever use this for WM)
menu branches can be added easier, making room for special sidekick extension scripts
menu color pickers now show colors chosen
menu section headers are now closed by default
no longer uses a clone of the saved options which should free some memory, however speed is slightly decreased
moved beta 2 rules nodes are now in arrays not keyed pairs, this should save storage space
now storing commonly used console images on your drive as resource files
users can now opt to use a global or personal storage block, or switch between them at will
fixed position of save/cancel/reset buttons in the config so they are always visible
added some much needed confirmation popups, with options to enable/disable specific confirmation points
created a color picker control which can also be used in the options menu
the options menu now has options to modify its own behavior
-using scrollIntoView is now optional, not default. This should make config navigation less jerky.
-confirmation at various points is now optional
-users can now force separators and sections to display as tabs for easier viewing
initial fetching of posts per app is now handled when each sidekick docks so there is no need to force a wait
the debug console now has a few more options such as stacking repeaters and scrolling the view to the most recent entry
discarded status bar
sorting posts no longer causes a complete redraw of post parts, just a realignment
reidentifation of posts no longer causes complete redraw of post parts
upgraded wmLibrary remove function so that it first checks to see if node.parent exists
switching app tabs no longer physically redraws post, just a reattachment
collection console now automatically resizes itselt to fit the window (with minor bugs)
collector now validates sidekick window existance better, with better recycling ability
most console icons are now loaded from a resource file, downloaded at install time
post toolbar now has buttons to: pause/unpause bonus type, cancel/restart process or autolike
options menu has options to show or hide those buttons on the post toolbar
you can now set the icon size on the mini toolbars (to a limited ranged of numbers, and requires refresh)
library function addGlobalStyle now properly accepts a "name" field, and appends an "id" attribute to the style sheet it creates
user set colors no longer stack up in the page header, instead each instance of the same named stylesheet is overwritten
posts now show a "play" icon in the center if they are paused, which causes then to reactivate

b6
fixed ugly console icons caused by photobucket shrinking the base image
the repairs to autolike and the "window missing" issue seem to
--have fixed the "restart process or autolike" function
added confirmation for clearing history
changed layout of the sidekick manager
--more details about the app/sidekick and adjoined apps in that sidekick
--can toggle both enabled and paused on the listing as intended
--shows paused bonus types with unpauseType buttons for each
--more functions available by app
---unpause all types
---reset config
sidekicks no longer need a synAppID parameter (or array) for any reason
--this value is calculated using the addFilters parameter (or array)
sidekicks which use the addFilters parameter can also insert 
--a secondary menu portion via that object
sidekicks which DO NOT use the new chrome supporting Sidekick object
--and its sendStatus function can still tell users their app works 
--in chrome by supplying a worksInChrome:true flag
fixed issue with post pinning not carrying over from one display mode 
--to another and the pin button disappearing if used after mode change
options menu now retains data for sidekicks that are not enabled/docked
the autolike side effects should no longer show debug panels or load
--some other features that might prevent you from using fb controls
sidekicks can now provide a helpLink parameter so devs can point 
--users to your blog/forum/email address for tech support
common library function array.removeByValue now accepts an array of values to remove
Ive removed the enforced 11px font so you don't have to squint so much anymore
Facebook page code is now taking care of your base font size for you
the browser's ability to zoom out is now useful, 
--however zoom in shifts a lot of stuff out of order
fixed an issue with rules where if the first validator passed, 
--then all validators passed
the WM console panel now positions itself to 0,0 no matter what is already on the page
a rule can now increment/decrement the parent rule's limit counter
a rule can now read from the parent rule's limit counter or limit
a rule can now read its own limit

added support for converting dynamic tests to new rules
--with the exception that subtests/subnumranges do not work the same
--{%1} is now the first substring matched by the first matchRegExp line
--which is NOT the same as the last match found by the same line
--you may use any number of {%x} insertion points in your parameter value
--where {%0} equals the LAST match found by the FIRST matchRegExp line
--multiple matchRegExp lines in a single rule concatenate their matches
--so that validator 0 might return three matches and the second
--might return 4 more, and so you have a range of 0 to 6 to use in your
--insertion point {%x}
--determining the meaningfulness of any {%x} may be difficult at best
--but for most posts this will not be an issue
--all rule actions that use the parameter field can accept insertion points
--except setAsFailed and setAsAccepted, which only accept true or false
--this finalizes the function to convert dynamics tests to new rules
--you can find the "Convert Dynamics" importer button on the top of the rules manager

b7
fixed icon size/placement for the sidekick-supplied app icon in the sidekick manager
moved the sidekick worksInChrome beta-parameter to sidekick.flags.worksInChrome
updated the sidekick tutorial script to show some of the enhanced options
fixed (again) an issue with icon sheet segments being displayed poorly
fixed flag/state issues on posts that caused excluded posts to be processed
posts no longer use flags, and post.state is no longer of value
added a few new functions to the common library and updated others
rule.action.setColor now shows in all display modes
marking a post failed/accepted/timeout now properly removes the collect tag
app filter icons are now drawn with the 'crisp' drawing style as in WM2
fixed issue with sidekick manager apps not staying disabled/enabled on reload
fetching posts now remembers which feeds have already reached their older limit and does not try to fetch them again
the Graph library now returns some status details about its last failure
rule.action.fetchNewer and fetchOlder were backwards
rule.actions are now all function wrapped to prevent bleeding over
feeds manager is now like the rest of the pages and contains a lot more data and functions
specific feeds and feed filters can now be disabled if needed, including your own home feed or profile wall
specific feeds and feed filters can now be made to fetch posts
fixed issue with collection page resizing to zero
added some cosmetic improvements, mainly color, font size and layout indentation
fixed issue with disabled manager elements not showing as disabled until refresh
fixed issue with some manager element changes not saving
custom dropdown elements are now locked so you cannot type in the text field
posts now have a button to add the poster to your feed manager, which allows faster fetching of that person's posts
rules can also add the poster to your feed manager
fixed issue with rule moveUpLevel mangling rules
dynamic grabber now looks like other manager pages and has been visually upgraded
you can now convert single dynamic tests to rules from the upgraded dynamic grabber, in addition to being able to convert them all at once from the rules manager. As in beta6, conversion does not remove old grabber tests; you need to do that manually when you are sure you no longer want them.
dropped old wm forms library and its huge css footprint, migrating to the growing JS forms library
rule.validator.matchRegExp now uses regexp.exec instead of string.match, which will allow you to capture matched substrings as originally intended. Insertion point implementation still differs between grabber tests and 3.0's rules in that {%1} in a grabber test generally matches up to {%0} in a rule, and that rules can also capture substring matches starting with {%1} and allow you to use the registered expression non-remembering brackets. For example: /(?:color )(red|green|blue)/ could have a {%0} of 'color red' and a {%1} of 'red' because while the non-remembering brackets did cause the match (the {%0}), the substring matches do not include that portion of the expression.
hopefully fixed issue with invisible posts on redraw and apparent cleaning of wanted posts, which was an illusion
added a global interval that all rules can access called onHeartbeat which can be used to make rules more active and useful. The heartbeat interval time can be set in the options menu under Rules Manager>Heartbeat
fixed rule.resetLimit button and the resetLimit rule action
dev display mode is now more like a manager page, which should allow for easier finding of data devs want, without the unintentional clicking taking you to another page
rules and grabber tests now have import/export abilities so you can backup and share your rules and tests
moved the post.onTimeout and onFailed events so they register better and separately from each other
rules can now be activated by: posts, apps/sidekicks, the rule itself, feeds, and specific feed filters, as well as the global heartbeat interval
rules can now draw data from many more sources depending on the activating object type
the onHeartbeat event can be toggled for every rule-activating object type. Default is off for all types, so only main/console and current rule queries can be made onHeartbeat. Activate the other object types and you get more alive post and app macros, or you could even make macros for specific app post fetching.
because of all the mayhem multiple activators on a single rule could cause, rules can now use the 'activatorType' query to limit the objects that can activate events on a rule.
status text about already processed posts is now displayed correctly on refresh
rule resetAllLimits no longer asks for confirmation on EVERY rule, just once for all rules
Posts now have a 'create rule from post' button which allows you to create a new rule based on that post. The rule manager immediately creates a new disabled rule with a few of the most likely validators already filled in. In addition, until the browser is refreshed, the rule remains linked to that post object. While linked, validators on that rule can import data from the post part(s) for which they perform validation. By default, a based-on-post rule also contains an action to set the post type to 'dynamic' which causes generic collection.
The option to filter images in classic mode had spilled over into short mode, making posts unclickable. I have changed it so that you can choose to not load online images for posts in short mode, however a placeholder icon will still exist so you can see stuff in short mode.
Option menu branches now show a new item count in the header. New items are marked by sidekick devs, so they only represent what is correctly marked. Newitem counts are determined by the newitem flag on each config field. Items colored or marked by different methods are not counted.
Rules can now use the {%appID} insertion point in 3-parameter actions. Because bonus types (a post's 'which' value) are prefixed by that app's ID, this will make using predefined bonus types easier. For example, a Pioneer Trail horse has a 'which' of "266989143414horse", not just "horse", so if you have a need to use the setWhich rule action, you can then supply "{%appID}horse" in the 3rd parameter and get the expected result.
Rules can now attempt to comment on a post. Instead of using the predefined auto-comments, rules use a third parameter where the user supplies a single specific comment.
You can now sort the collection window by more fields
You can now group the collection window posts by the same fields you could use for sorting. Groups are collapsible, which will persist across display mode changes.
Fixed an issue with rules that were disabled still affecting objects
Users can now create user defined bonus types in the sidekick manager. Each types simply needs an ID and a Name, like "horse":"A Horse". These user defined types can be accessed anywhere bonus types are used, including grabber tests and rules. You can even overwrite pre-existing bonus types to give them a new name, modify the text to suit your language, or make other adjustments. One note: if you do not want dropdown lists to prefix your text with 'get' or 'send', add a '*' to the front of your type text (not your type id).
Anywhere bonus type dropdowns are found, the list is now sorted in order of base text. For example, the base text of both 'sendhorse' and 'horse' happens to be 'Horse', so in the dropdown list, Get Horse and Send Horse will appear next to each other. Special types that begin with a '*' will be on top. Anomolous entries, such as those that start with a space, will appear before special entries.
Cleaned up classic display mode so that smaller screens or zoomed-in or shrunken browsers don't have such ugly layouts.
Fixed some minor bugs with redrawing posts: posts recompile visual parts on re-id. posts properly position themselves hopefully every time they redraw.
In classic display mode, you can now show posts in up to 4 columns.
Added initial stuff to the Sidekick object in the common library which allows sidekicks to supply a skType parameter. Default is 0, which tells WM that the sidekick is to be the main sidekick for that app. Consider this parameter a parking spot number. Any sidekick that has a skType of 1 takes spot 1, 2 takes 2 and so on. You can only have one sidekick per parking spot. I leave it up to secondary sidekick devs to furnish a unique number for their script. If you want your sidekick to dock no matter what, I suggest passing the current timeStamp() as the skType. Future versions may have internal functions for certain number ranges. For instance, type 0 loads all of a sidekick's abilities, where other types do not need all their parts.
Expermental parts now exist for an auto-comment feature. In addition, you must now specifically enable auto-like and auto-comment separately with new checkboxes. See your options menu under Host Options > Feedback. As with auto-like, be very careful auto-commenting at high speed. I suspect the possibility of getting comment-blocked is much higher than getting like-banned. I suggest that you use multiple messages in the provided comment box. The more variation, the less bot-like you look. I also ask that you do not advertise the wall manager via your comments. I really don't want people hating WM before they even know what it is.
Currently auto-comment is NOT working due to fb doing their damnedest to prevent such.
Fixed autolike again!
Added likeText and likeHref rule queries to help reduce confusion between link and url. All four will still exist in the rules manager.

b8
Repaired options menu so you can again select which posts you want to autolike
Removed blocking on some features I excluded in chrome. I need to see if they start working and if not, determine why.
Added the initial base for a friends manager, called 'friend tracker'. It may use a bit of storage space, but for many people it will be very useful. I need some input on what you might want to do with something like this.
Modified the collection page, so that like other pages, the toolbars stay on the top no matter how far down you scroll.
It was not noted before but user defined types per app are shared across profiles. I felt it was in the best interest of all users.
Fixed an issue with the sidekick.pause/unpause button not toggling visually
Dynamic tests can now be shared with other FB profiles on this machine. This does not guarantee they are available on other browser profiles.
Repaired an issue in the graph library which tried to make WM2 use WM3 feed and feed filter objects.

b9
Added a 'fillAndShare' option to the jsForms.visualElement object 'dock' parameter (in the jsForms library) which allows the console height to be managed better, give or take about 2 pixels. Unlike 'fill' which makes an element take up the entire container inner height, 'fillAndShare' just takes what is not already taken by all siblings, both before and after that element. As you might expect, you cannot use two or more elements flagged as 'fillAndShare' in the same container, or only the first one will be fully visible.
Ok, for real this time, crisp edges is now turned on for app icons supplied by sidekicks. crisp edges is NOT turned on for toolbar icons because it looks uglier than when not turned on.
Added a whole bunch of stuff to the common library, including: massive expansion for arrays, expansion for strings, a custom jsCollection object that mimics visual studio collections. The jsCollection object will allow you to make collections just like other programming languages, instead of having to use the base object model in JS. Additionally, the jsCollection object gives you all those good methods nobody really wants to attach to the base object model. Most notable are: array.startsWith/endsWith and array.contains.
Rules can now take insertion points for not just {%appID} but also {%which} and {%fromID}. This will allow you to modify an existing which without already having to know exactly what it is. It will also allow you to make bonus type ID's specifically for certain friend's posts.
Creating a rule from a post now also automatically adds a validator for the post appID to the top of the validation list. Again, you need to modify those validators, excluding things like friends' names, and shrinking out anything not required for identification of those bonus types.
Common library function promptText now shows text in a textarea, not in <pre> tags. In addition, the textarea height and width are now set so they should not push the close button out of sight.
Rule.showSource now formats output text in a way that can easily be read, instead of packing it all into one line. It is also displayed in a textarea instead of pre tags, so you can simply right click and select all to copy elsewhere. The same goes for dynamic grabber tests.
Fixed dynamic grabber so that basic mode correctly accepts multiple lines and saves as an array.
Fixed an issue where onHeartbeat used with activators searching 'which' could cause an error "main.which: TypeError: post is undefined"
Rules can now be shared with other FB profiles on this machine. This does not guarantee they are available on other browser profiles.
A new option in the options menu, under host options > rules manager, allows you to jump immediately to a new rule just created. So if you create a rule from a post, or convert a dynamic test to a rule, you can be wisked away to the rules manager panel and the newest rule will scroll into view.
Feeds can now be shared with other FB profiles on this machine. This does not guarantee they are available on other browser profiles.
Deletion confirmation is now required to remove all feeds, rules and test which are shared with other profiles. There is no switch to prevent confirmation.
Friend tracker no longer tracks the current user as a 'friend'
Friend tracker no longer just remembers everything, as it did for testing. Now it will properly NOT store data beyond the user-set "track for how many days".
Friend Tracker and Feed Manager are now their own separate objects. Hopefully that will speed things up like a percent of a percent, and help with cleanup.
Cleanup is now nullifying more than twice as many objects before the window is destroyed.
Added more feed, feedFilter and friend object parts and events to the rules manager.
Added equalsExactly and notEqualsExactly to the operators you can choose from in rules manager, so you can now handle all your binary validation needs.
Whenever user defined types exist for an app, they are now properly checked before app defined types. That way users can overwrite app defined type texts, as intended.
Friend Tracker can now sort by totalCount (failed+accepted) and can clear all tracking history by a tool button.

b10
Fixed an issue with greasemonkey event security being tripped by sidekick spawned post fetching unique to WM3. Its not elegant, but it seems to work.

b11
Fixed an issue with temporary auth codes page url

b12
Fixed an issue with autolike

b13
Removed Autocomment options
Moved icon resources to the wiki. New installs should get that image from the wiki just once every time the resources are edited.
Added a "message" sidekick menu option. It just takes a title and textContent. Nothing special
Moved MOST sidekick options to the "Manage Sidekicks" tab, where you will find new "options" buttons. Users who have existing sidekick options saved may want to enter about:config and just delete your current settings and start over. That would be an entry ending in ".settings_<profile name/id or global>". Settings are now saved separately for each sidekick AND separately for profile and global storage. This should help reduce the size of any one storage location and prevent jamming of the config system. To locate individual settings blocks in the about:config, you can filter out "fb wall manager", then look for entries ending in ".settings_<app_id>_<profile name/id or global>".
Moved autolike into a drip system, which runs off the rules manager's heartbeat system. Autolike now queues posts to be liked in a separate area and looks at that area for posts that are "ready" to be liked. When posts are added to that queue, a timer is set on the post, equal to the timer of the LAST post added to the que, plus X seconds based on your options menu autolike ban prevention delay value. If no posts exist in the queue, the timer of the new post will be set to that delay plus the current time. When the main subroutine checks for posts which are ready to like, those posts are NOT immediately liked. Instead they are passed to the collector queue and will be handled in a first in first out order. Warning: if you refresh the page while items exist in the autolike queue, those items will be erased from that queue and will NOT be autoliked. Likes spawned via the like icon in a post are not queued, they are immediately sent to the collector. Likes spawned with the rules manager are also not queued. Use the rules manager timers to negotiate autolike timers when rules spawn likes.

b14
Further improved the autolike delay by updating the timer every time an item is removed from the post queue.

b15
Removed additional autocomment stuff so you can't crash the autolike feature with them

b16
Repaired timer and interval functionality in rules manager
Added error checking in return links for games such as PT which could cause odd issues on timeouts

b17
Added rules manager actions: 
resetBranchLimits: resets the limits of all children down the branch, but not the limits of the current rule.
resetChildrenLimits: resets the limits of the immediate children, but not the limits of the current rule.
(enable/)disableChildRules: enables/disables the immediate child rules of the current rule.
Rule initiated limit counter resets are no longer messaged to the user for confirmation
Lower branch limit counter reset confirmation uses the answer from the first confirm notice

b18
Add rules manager actions:
disable/enableAppOption: disables an option provided by a sidekick. The affected app is that app associated with the post being handled. You need to already know the internal name of the option. You can use the WM3 developer view to find the "which" or bonus type of a post. You may also be successful in toggling your custom bonus types using this feature.
disable/enableHostOption: disables an option provided by the host. You need to already know the internal name of the option. My might need to poke around in the WM host code to find which option you are looking for, or just ask me.
disable/enableAutolike: a specific case of enable/disableHostOption which toggles the autolike feature only. Immediately changing the value of the "useautolike" option DOES NOT dump the autolike queue.
emptyAutolikeQueue: empties the autolike que. Posts you had intended to be autoliked will no longer be liked this session. Posts already like are not unliked.
Fixed an issue where intervals and timers still affected the host even if their parent rule in the rules manager was disabled. Intervals and timers which belong to a disabled rule still continue to tick, however, they are stopped from doing anything when their onInterval or onTimer events are called.
Actions are now filtered if a rule is disabled. The only accessible actions when a rule is disabled are createTimer and createInterval. This prevents a disabled rule from doing anything really, except initializing those timers/intervals. See previous change for more details.
Do note, even with these changes, using disable/enable with rules including intervals and timers can still be tricky. If there is ever any doubt, simply enable or disable the rule as you want it and refresh WM.
Fixed an issue with collector counts and opening of the same post a number of times equal to your max request limit. Posts are now checked to see if they are already working, not just in the collector, which should help prevent double processing in the future.
Fixed a bug in autolike used in conjunction with sendall sidekick options.

b19
Added rules manager actions:
setAppOption: sets the value of a sidekick's option. Use this specifically for non-checkbox options, such as textboxes that take a text value or a number. These should be rare in sidekicks.
setHostOption: sets the value of a host option. Use this specifically for non-checkbox options, such as time ranges, interval values, etc. See important notes on the [[Rules Manager]] page about this option.
Added three new time formats to the calcTime function. These are specifically for use with the new setHostOption action in the rules manager. See [[Rules Manager]] page for details.
Added the missing parameter box on rules manager actions for enable/disable app/host options. Yeah sorry, that made no sense without the param box.
Rule actions no longer store null parameters in the about:config. This should save a little storage space.

b20
Fixed issues with the t: time format not calculating time as anything other than a zero

b21
Fixed issues with rules manager increment/decrement limit counter accepting hand typed values as text rather than numbers. Incrementing either should now be calculated as a number.
Fixed issues with the rules manager not exporting param2 of some new rules.
Fixed issues with the feed manager add feed button not working.

b22
Fixed issue with enabled rules onRuleCreated event acting as if the rule is disabled
Converted options menu time interval dropdowns to a 4-box system which accepts day:hour:minute:second values. This should help properly display values modified by the rules manager.

b23
Option menu intervals of 0 are now considered OFF instead of really short intervals. There is no off button, just use 0.
Max interval for older posts is now calculated correctly again.
Clean interval for cleaning done and unwanted posts is calculated correctly again.

b24
*Added rules manager actions:
**forceOpenFirst: like force open, this action causes the post to be sent directly to the collector queue, or if you don't queue, directly to a collection window/tab. This also causes the post to cut in line to be next, overriding priority and also overriding posts already sent to the collector via forceOpenFirst.
**emergencyOpen: unlike forceOpen, this action causes the post to be sent directly to a collector window, bypassing any queue or window opened limit you have set in your options.
*Cleared up the description text in the rules manager dropdown for "set as collected" and "force open"
*Changed the beta update location (update script button on options panel) from WM2's script file to the WM3 beta alterate url. (id: 147225)

b25
*Changed enable/disable app action from the rules manager
**The action now accepts a parameter of the id of the app to disable. If left unspecified, the action applies to the app associated with the activating post
**Existing enable/disable rules will have their parameter set to "1" which will fail as an appID, and so the associated post's app will be used

b26
*now allowing rules manager timer and intervals to use the custom time formats in addition to the numeric millisecond values

b27
*fixed issue with config window: import settings never asking for settings to import
*fixed issue with farmville sidekick settings equal to default values being saved

b28
*Added "show original data" button to posts
**which is also toggleable in the options menu. 
**This function shows the exact data as it was handed to WM by FB
**You can share this with me, sidekick devs, or with friends so they can find an exact post
*Increased length of rules manager title field boxes (for use with upcoming new sidekick abilities)
*Added Rules Manager Action: setAppTab
**this allows you to switch to the collection tab associated with an app
**defaults to "all", meaning the "Show All" tab
**specify the appID of the tab you wish to switch to
**if left blank, defaults to the appID of the activating post

b29
*Added rules manager event: onSidekickReady
**this event activates when a sidekick creates an app object. More specifically, it activates directly after adding the collection tab for the supported app(s).
*Repaired rules manager parentLimit and parentLimitCount values

b30
*Added a "export all rules" button to the top of the rules manager panel. DO NOT paste that data into the individual rule importer. 
**This data will exactly match the data from about:config about rules specific to your own profile. 
**It does not show any rules which come from the globally shared rules list

b31
*Fixed rules manager validation loop

b32
*Added rules manager actions:
**unpauseAllTypesByApp: unpauses all currently paused bonus types associated with the given app, or with the app associated with the activating post
**unpauseAllTypesAllApps: unpauses all currently paused bonus types for all apps
**unpauseAllApps: unpauses all apps
**pauseAllApps: pauses all apps
*Added rules manager queries:
**currentAppTab: the appID associated with the currently selected app tab on the collection panel, OR 'all' if the 'Show All' tab is selected
**isAppPaused: a more specific version of isPaused, which specifically tests the associated app. This allows you to then check the app associated with sidekick docking, and app tabs being clicked
**isTypePaused: a more specific version of isPaused which ignores associated apps being paused and only checks the bonus type. So if the app is paused, and the type is not specifically paused, it will return NOT paused.
*Added rules manager events:
**onSetAppFilter: this activates any time the collection app tab changes, including on startup if 'show all' becomes default, and when the rules manager changes the current app tab
*Fixed Rules Manager query currentTime

b33-34
*Modified sidekick alterlink command to accept an array of alterations
**sidekick dev notes will be updated shortly
**still accepts a single alteration object if sidekick is not updated for this change
**WM2 standard is also updated for this new feature

b35
*fixed rules manager events from causing disabled child rules from firing.
**previously, parent rules which contained onRuleCreated events would cause all their child rules to activate even if that top rule was disabled
**now, child rules which are disabled by the parent being disabled can only activate onRuleCreated actions themselves. all other events are inaccessible for disabled child rules
**as before, even disabled rules will activate onRuleCreated. And as before, the only actions they can take are createtimer and createinterval
*added rules manager action appendLink
**this allows a rule to append a string onto the end of the post action link
*modified sidekick functionality
**alterlink can now specify which field to find data from using a dataSource parameter. Default is still the 'either' field. You can choose from any post part available in post.testData
**details will be appended to the sidekick dev docs soon

b36
*added rules manager actions:
**SetToCollectTopPriority combines "set priority = 1" and "set to collect" into a single action
**remove/setPriorityApp: set the priority of all posts for a specified (or related) app to the priority you specify
**remove/setPriorityType: set the priority of all posts for a specified (or related) type to the priority you specify within the related app

b37
*temporary modification for use with Firefox 22

b38
*temporary fix allows you to manually enter auth tokens

b39
*new option menu entry allows you to have WM check your developer tool address for auth tokens automatically

b40
*added new rules manager: commentPost action, supply a message to comment on the post specified, action is performed without collector window
*modified autolike so its immediate and without a secondary collector window

b41
*emergency patch to put autolike back through the queue system, preventing like-bans world wide. sorry about that
*added rules manager action: queueLikePost, similar to likePost but uses the like queue system to prevent like-ban by facebook

b42
*cleaned up now useless items in the options menu
*enabled autocomment in the options menu.
*enabled autocomment's text list. Enter values one per line. If you use the rules manager Comment Post command, you can now leave the message box blank to have WM pick from this list.
*standard autocomment now uses the autolike's queue to reduce the chances of comment-banning for too many comments per timeframe
*added rules manager action: QueueCommentPost. Like CommentPost but uses the autolike queue system to slow down actions.
*Autolike and autocomment now debug to the console any error from facebook's system

b43
*rules manager actions, events, post parts, and operands now save as number values rather than long text. This should reduce your rules manager storage space greatly, however it slows down the initial load slightly.
*added rules manager action FetchHours. You specify the hours you want to fetch, and the calling app rule will fetch that many hours worth of posts, max 1000 returned

b44
*fixed rules manager issue with search selections not saving, or being gone on refresh
**you will need to fix all your rules or import from rules you may have saved as text previously
*fixed issues with rules manager fetchHours command:
**fetchhours now fetches in sets of 250, repeating as needed until if finds a post older than your targetted time
**this is very likely to get you posts older than you asked for
*modified graph functions
**fetchPosts now on timeout will retry up to 3 times
**linked fetches will carry the timeout counter, such as range pulls like rules manager fetchHours
**fixed a bug where forward fetches were reporting range was null and failing to restart forward fetching

b45
*added fetch quantity values of 250 and 500
*added rules manager actions for enable/disable autocomment

b46
*changed the popup message to talk about autolike/autocomment and publish_permissions
*rules manager rule importer can accept single rules or now also rule arrays. Now you can export all your rules and import all your rules back without using about:config
*added reminder in the options menu about the autolike change, as well as a link to take you to the api explorer page

b46-https mod
*changed startup address to include secure browsing due to fb forcing secure browsing after aug 2013 (still in progress)

b47
*added checking for fetchposts empty result sets
*added checking for fetchposts missing pagination data
*added checking for 7 or 10 digit timestamps returned from facebook

*/