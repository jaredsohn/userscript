// ==UserScript==
// @name           Usuluddin - FB Wall Manager
// @namespace      Usuluddin - FB Wall Manager
// @description    Manages Wall Posts for Various FB Games
// @include        https://www.facebook.com/pages/Usuluddin/*
// @include        http://www.facebook.com/pages/Usuluddin/*
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://*.facebook.com/
// @include        http://*.facebook.com/
// @include        /^https?:\/\/www\.facebook\.com\/.*\/posts\/.*/
// @include        /^http?:\/\/www\.facebook\.com\/.*\/posts\/.*/
// @license        http://usuluddin.16mb.com/#!/
// @version        2.2.1
// @copyright      Usuluddin
// @require        http://userscripts.org/scripts/source/29910.user.js
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://userscripts.org/scripts/source/128747.user.js
// @require        http://userscripts.org/scripts/source/129006.user.js
// @require        http://userscripts.org/scripts/source/130453.user.js
// @require        http://userscripts.org/scripts/source/130454.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=86674&days=1
// ==/UserScript== 

// Based on script built by Usuluddin

(function() {

//***************************************************************************************************************************************
//***** Globals
//***************************************************************************************************************************************
	var version = "2.2.1";
	var userID="", profile="",userAlias="";

	var feeds = {
		me:{url:"https://graph.facebook.com/me/home", next:"", prev:"", enabled:true, filters:{} },
		wall:{url:"https://graph.facebook.com/me/feed", next:"", prev:"", enabled:true, filters:{} }
	};
	var rules = {};
	var groups = {};
	var apps = {};
	var posts = {};
	var history = {};
	
	this.opts = {}; //make it global
	this.quickOpts = {};
	
	var sortFields = ["created_time","which","fromID","fromName","priority","appID","id","status","state"];
	
	var typesPaused = [];

//***************************************************************************************************************************************
//***** Preload
//***************************************************************************************************************************************

	//dont run in iframes
	try {
		var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
		if(unsafeWindow.frameElement != null) return;
	} catch(e) {log("preload: "+e);}

//***************************************************************************************************************************************
//***** Functions
//***************************************************************************************************************************************

	//returns all members of an array that have a specified parameter with a specified value
	//replaces same function from WM Library Script
	this.matchByParam=function(o,param,value,outputType){try{
		if(!exists(outputType)) outputType="array";
		var inputType=(isArray(o))?"array":((typeof o) == "object")?"object":"unknown";
		
		var ret=(outputType=="object")?{}:[]; //default to array on error

		switch(inputType){
			case "array": for (var i=0,e;(e=o[i]);i++){
				switch(outputType){
					case "array": if (e[param]==value) ret.push(e); break;
					case "object": if (e[param]==value) ret[i]=e; break;
				}
			};break;

			case "object": for (var i in o){
				var e=o[i];
				switch(outputType){
					case "array": if (e[param]==value) ret.push(e); break;
					case "object": if (e[param]==value) ret[i]=e; break;
				}
			};break;
		}
		return ret;
	}catch(e){log("matchByParam: "+e);}};


//***************************************************************************************************************************************
//***** Special Use as post liker
//***************************************************************************************************************************************
	//check for likeit function
	function likeit(){try{
		log("likeit");
		var like = selectSingleNode(".//div[@id='globalContainer']//li[contains(@id,'stream_story_')]//button[@name='like']");
		if (like) {
			setTimeout(function(){
				click(like); 
				setTimeout(function(){
					sendMessage("status=1");
				},500);
			},500);
		} else {
			setTimeout(likeit,1000);
		}
	}catch(e){log("likeit: "+e);}};

	if (location.href.startsWith("http://www.facebook.com/") && location.href.contains("/posts/")) {
		if (location.hash.contains("likeit")) likeit();
		return;
	}

//***************************************************************************************************************************************
//***** Debug Object
//***************************************************************************************************************************************
	if (debug) {
		debug.init();
		if (debug.initialized) log("Debug Console Initialized");
	}

//***************************************************************************************************************************************
//***** Status Object
//***************************************************************************************************************************************
	var doStatus = true; //always true until told otherwise after gmconfig loads
	var status = {
		initialized: false,
		windowNode: null,
		messageNode: null,
		progressNode: null,
		progressTextNode: null,
		progressValueNode: null,

		fadeInterval:null,
		linger:false,

		init: function(params){
			params=params||{};

			if (!($("WM_statusWindow"))) {
				addGlobalStyle(""+
					"#WM_statusWindow {padding:0px; border:1px solid #99A8C7; background-color:#E1E6EE; overflow:hidden; border-radius:3px; height:44px; width:99%;}\n"+
					"#WM_statusWindow > .message {margin:3px; display:inline-block; border-right:1px solid #BFCADE; background-color:#91FF91;}\n"+
					"#WM_statusWindow > .message:last-child {border-right:0px;}\n"+
					"#WM_statusWindow > .message:hover {background-color:#CAD1DE;}\n"+
					"#WM_statusWindow > .message > .icon {width:16px; height:16px; margin-left:2px; display:inline-block; vertical-align:top;}\n"+
					"#WM_statusWindow > .message > .text {margin-left:7px; display:inline-block; width:176px; vertical-align:top; font-size:11px; text-overflow:ellipsis; color:#3B5998;}\n"+
					"#WM_statusWindow > .message > .closetool {visibility:hidden; display:inline-block; width:14px; height:14px; vertical-align:top;}\n"+
					"#WM_statusWindow > .message > .closetool:hover {background-color:#3B5998;}\n"+
					"#WM_statusWindow > .message:hover > .closetool {visibility:visible;}\n"+

					/*"#WM_statusWindow .progressBar {display:inline; position:relative; width:200px; height:14px; border:1px solid #CCDDAA; border-radius:5px; overflow:hidden;}\n"+
					"#WM_statusWindow .progressBar .gfxValue {position:absolute; top:0px; left:0px; background-color:#DDFFCC; width:200px; height:14px; border-right:3px solid #CCDDAA;}\n"+
					"#WM_statusWindow .progressBar .txtValue {position:absolute; top:0px; left:0px; width:200px; height:14px; text-align:center;}\n"+*/

					""
				,"styleStatus");
				document.body.appendChild(
					status.windowNode = createElement("div",{id:"WM_statusWindow"},[ 
						//status.messageNode=createElement("div",{className:"message"}),
						/*status.progressNode=createElement("div",{className:"progressBar"},[
							status.progressValueNode=createElement("div",{className:"gfxValue"}),
							status.progressTextNode=createElement("div",{className:"txtValue"}),
						])*/
					])
				);
			}
			status.initialized = true;
		},

		print: function(msg, params){
			if (!doStatus) return;
			params=params||{};

			if (!status.initialized) status.init();
			if (!status.initialized) return;
			
			//create a new message node
			var id=unique();
			var messageNode=createElement("div",{id:id, className:"message"},[
				createElement("img",{className:"icon",src:params.icon}),
				createElement("div",{className:"text",textContent:msg}),
				createElement("img",{className:"closetool",src:imgs.x,onclick:function(){remove(this.parentNode);}}),
			]);
			/*if (status.progressNode) {//params.progress && 
				status.progressNode.style.display="block";
				status.progressTextNode.textContent=params.progressMsg||params.progress||msg||"";
				status.progressValueNode.style.width=params.progress||"100%";
			}*/

			//append message to display
			status.windowNode.appendChild(messageNode);

			//reset fade timer
			status.show();
			if (status.fadeInterval) window.clearTimeout(status.fadeInterval);
			if (!(params.linger||null)){
				status.fadeInterval = setTimeout(status.hide,5000);
			}
			
			//destroy this message after a timer
			if (!(params.linger||null)) setTimeout(function(){
				remove($(id));
			},5000);

			//pass back the id of this message so we can delete it externally
			return id;

		},

		show: function(){
			if (!status.initialized) status.init();
			if (!status.initialized) return;

			if (status.windowNode) status.windowNode.style.visibility="";
		},

		hide: function(){
			if (!status.initialized) status.init();
			if (!status.initialized) return;

			if (status.windowNode) status.windowNode.style.visibility="hidden";
		},
	};
	status.init();
	if (status.initialized) status.print("",{progress:"100%",progressMsg:"Status Console Initialized"});

//***************************************************************************************************************************************
//***** CSS Library and Constructors for Visual Form Elements
//***************************************************************************************************************************************
	if (forms) {
		forms.init();
		if (debug.initialized) log("Forms Library Initialized");
	}

//***************************************************************************************************************************************
//***** Visual Console Object
//***************************************************************************************************************************************
	var wmConsole = {
		initialized: false,
		tabsNode: null, //container for tab container, left side
		pagesNode: null, //container for tab pages, right side
		curTab: "Feed", //remember the tab currently opened
		sidekickNode: null, //remember the sidekicks list
		feedNode: null, //remember where to put the feed data
		dynamicTree: null, //remember where to put the dynamic grabber tests
		dynamicViewer: null, //remember where to put the dynamic grabber data viewer
		loading: true, //set to false after sidekicks have time to load
		priorityNode: null,
		priorityBuild: null,

		showTab: function(){
			forms.selectTabAndSection(this.id.split("_")[1],"wmMainItem","wmMainPage");
			wmConsole.curTab = this.id.split("_")[1];
		},

		init: function(params){try{
			var validateFBElements=["globalContainer","content"];
			for (var e=0,elen=validateFBElements.length;e<elen;e++){
				if (!($(validateFBElements[e]))) {
					log("wmConsole.init: Expected element \""+validateFBElements[e]+"\" does not exist");
				}
			}

			params=params||{};
			status.print("Initializing Console");

			if (!($("wmTabContainer"))) {
				try{addGlobalStyle(""+
					"a:hover {text-decoration: none !important;}\n"+

					//"#mainContainer {background-color:#DDDDEE; padding-right:20px; padding-top:20px;}\n"+
					//".hasLeftCol #mainContainer {border-right:none;}\n"+
					//"#leftColContainer {float:left;}\n"+
					//"#contentCol {border-radius: 5px 5px 0px 0px; padding:0px !important;}\n"+
					//"#contentCurve {border-radius: 0px 0px 5px 5px; background-color:#EEEEFF; margin-right:1px;}\n"+
					//"#footerContainer {border: none;}\n"+

					"#content {display:none !important; }\n"+

					"#wmContent {background-color:#DDDDEE; position:relative;}\n"+
					"#wmLeftCol {display:table-cell; position:relative; vertical-align:top;}\n"+
					"#wmRightCol {display:table-cell; position:relative; width:100%;vertical-align:top;}\n"+

					"#contentCurve {display:none;}\n"+
				

					".consoleButton {border-radius: 5px 5px 5px 5px; color: #3B5998; font-size: 11pt; padding: 10px; position: absolute; text-align: center;}\n"+
					".consoleButton.left {background-color: #EEEEFF; border: 1px solid #CCCCDD; }\n"+
					".consoleButton.right {background-color: #E0E8F6; border: 1px solid #DDDDEE; }\n"+
					".consoleButton.icon {width:24px; height:24px; padding:5px; line-height:24px; font-weight:900; font-family:arial; font-size:20px;}\n"+
					".consoleButton.icon img {width:24px; height:24px; }\n"+
					".consoleButton.selected {background-color: #FFFFFF !important;}\n"+

					"#wmOptions {top: 395px; left:30px; width: 105px;}\n"+
					"#wmVersion {top: 440px; left:30px; width: 105px;}\n"+
					"#wmPause {color: white; left: 30px; top: 30px;}\n"+
					"#wmPause:hover {font-size: 26px; }\n"+
					"#wmOlder {color: white; left: 70px; top: 30px;}\n"+
					"#wmOlder:hover {font-size: 26px; }\n"+
					"#wmNewer {color: white; left: 110px; top: 30px;}\n"+
					"#wmNewer:hover {font-size: 26px; }\n"+

					"#wmTabContainer {width:181px; padding-top:66px;}\n"+
					".wm.sideBar {text-align:center; position:relative; border:1px solid #DDDDEE; border-radius:5px 0px 0px 5px; height:50px; display:block; left:20px; width:160px; border-right:1px solid #CCCCDD;}\n"+
					".wm.sideBar.selected {background-color:#EEEEFF; border: 1px solid #CCCCDD; border-right:1px solid #EEEEFF; right:-1px; z-index:9999;}\n"+
					".wm.sideBar .title {font-size:12pt; line-height:50px;}\n"+

					"#wmPageContainer {position:relative; border-radius:5px; background-color:#EEEEFF; border: 1px solid #CCCCDD; overflow:hidden; height:500px;}\n"+
					".wm.content {display:none; overflow:hidden;}\n"+
					".wm.content.selected {display:block;}\n"+
					".wm.content > .header {line-height:30px; padding-left:10px; font-size:12pt; border-bottom:1px solid #CCCCDD;}\n"+

					"#wmSidekickList {position: relative; height:440px; padding:5px;}\n"+
					".wmSidekickEntry {height:64px; border-bottom:1px solid #CCCCDD; position:relative;}\n"+
					".wmSidekickEntry .icon {position:absolute; height:32px; width:32px; left:16px; top:16px;}\n"+
					".wmSidekickEntry .title {position:absolute; line-height:32px; left:64px; top:0px; font-size:12pt;}\n"+
					".wmSidekickEntry .desc {position:absolute; line-height:32px; left:64px; top:32px; font-size:8pt;}\n"+
					".wmSidekickEntry .master {position:absolute; padding:5px; bottom:10px; right:10px;}\n"+

					"#wmPageContainer > div {height:100%;}\n"+

					"#wmMainPage_FeedSource > textarea {margin: 5px; height: 430px; font-size:11pt;}\n"+
					"#wmMainPage_FeedSource > .caption {position:absolute; font-size:11pt; padding:10px;}\n"+
					"#wmFeedsSave {top: 200px; right:30px; width: 105px;}\n"+

					//"#wmMainPage_Dynamics > textarea {margin: 5px; height: 430px; font-size:11pt;}\n"+
					//"#wmDynTutorial {top: 35px; right:165px; width: 105px;}\n"+
					//"#wmDynSave {top: 35px; right:30px; width: 105px;}\n"+
					//"#wmDynOpts {position:absolute; top:35px; left:35px; width:105px;}\n"+

					"#wmDynamicTree {width:50%; display:inline-block; vertical-align:top;}\n"+
					"#wmDynamicViewer {width:50%; display:inline-block; vertical-align:top;}\n"+
					"#wmDynamicViewer input, #wmDynamicViewer select, #wmDynamicViewer textArea {border-radius:4px; border:1px solid #BDC7D8; padding:3px; margin:6px;}\n"+

					"#wmPageTools {position:absolute; right:17px; z-index:2; border:1px solid black; border-radius:5px; padding:2px; background-color:#808080; color:black;}\n"+
					"#wmPageTools > * {display:none; }\n"+
					"#wmPageTools label {vertical-align:baseline;}\n"+
					"#wmPageTools .toolIcon {width:16px; height:16px; display:block !important;}\n"+
					"#wmPageTools:hover {background-color:white;}\n"+
					"#wmPageTools:hover > * {display:block;}\n"+
					"#wmPageTools:hover .toolIcon {display:none !important;}\n"+
					"#wmPageViewSelector {font-weight:bold; color:#666666; border:none;}\n"+

					".wm.post.classic {position:relative; min-height:90px; margin-left:10px; margin-right:10px; font-size:11px; color:#808080; border-bottom:1px solid #CCCCDD; padding-bottom:20px; padding-top:10px; clear:both;}\n"+
					".wm.post.classic .actor {margin-top:5px; margin-bottom:10px; font-weight:700; color:#3B5998;}\n"+
					".wm.post.classic .picture {float:left;padding-top:5px; padding-right:10px; }\n"+
					".wm.post.classic .picture img {width:90px; height:90px; background-color:white; border:1px solid; border-radius:5px;}\n"+
					".wm.post.classic .title {margin-top:5px; font-weight:700; color:#3B5998;display:block;}\n"+
					".wm.post.classic .caption {display:block; }\n"+
					".wm.post.classic .description {padding-top:5px; display:block;}\n"+
					".wm.post.classic .postDate {}\n"+
					".wm.post.classic .appName {position:relative; left:10px;}\n"+
					".wm.post.classic .linkText {color:#899ADB; float:right; padding-right:32px;}\n"+
					".wm.post.classic.scam {}\n"+
					".wm.post.classic.noimage {min-height:1px;}\n"+

					"#wmFeedNode.short {padding:20px;}\n"+
					".wm.post.short {float:left; position:relative; font-size:11px; color:#808080;}\n"+
					".wm.post.short .floater {display:none; background-color: white; border:1px solid; border-radius:5px; position:absolute; z-index:3; padding:5px 10px; width:240px; height:120px;}\n"+
					".wm.post.short:hover .floater {display:block;}\n"+
					".wm.post.short .actor {display:block;}\n"+
					".wm.post.short .picture {position:relative;}\n"+
					".wm.post.short .picture img {position:relative; width:100%; height:100%; background-color:white;}\n"+
					".wm.post.short .postDate {display:block;}\n"+
					".wm.post.short .appName {display:block;}\n"+
					".wm.post.short .linkText {display:block;}\n"+
					".wm.post.short .progress {opacity:0.25; background-color:#00FF00;}\n"+
					".wm.post.short.working .picture img {z-index:2;border-radius:5px; border:1px solid;}\n"+
					".wm.post.short.excluded .picture img {opacity:0.25;}\n"+
					".wm.post.short.timeout .picture img {opacity:0.25;}\n"+
					".wm.post.short.paused .picture img {opacity:0.25;}\n"+
					".wm.post.short.nodef .picture img {opacity:0.25;}\n"+
					".wm.post.short.scam {}\n"+
					".wm.post.short.accepted .picture img {opacity:0.25;}\n"+
					".wm.post.short.failed .picture img {opacity:0.25;}\n"+

					".wm.post.dev {position:relative; min-height:90px; margin-left:10px; margin-right:10px; font-size:11px; color:#808080; border-bottom:1px solid #CCCCDD; padding-bottom:20px; padding-top:10px; clear:both;}\n"+
					".wm.post.dev .postid {display:block; }\n"+
					".wm.post.dev .actor {display:block; padding-top:5px; font-weight:700; color:#3B5998;}\n"+
					".wm.post.dev .picture {float:left;padding-top:5px; padding-right:10px; }\n"+
					".wm.post.dev .picture img {width:90px; height:90px; background-color:white; border:1px solid; border-radius:5px;}\n"+
					".wm.post.dev .title {padding-top:5px; font-weight:700; color:#3B5998;display:block;}\n"+
					".wm.post.dev .msg {padding-top:5px; display:block; }\n"+
					".wm.post.dev .caption {padding-top:5px; display:block; }\n"+
					".wm.post.dev .description {padding-top:5px; display:block;}\n"+
					".wm.post.dev .url {display:block; padding-top:5px; word-wrap:break-word;}\n"+
					".wm.post.dev .imgsrc {display:block; padding-top:5px; word-wrap:break-word;}\n"+
					".wm.post.dev .postDate {display:block; padding-top:5px;}\n"+
					".wm.post.dev .appName {display:block; padding-top:5px;}\n"+
					".wm.post.dev .linkText {color:#899ADB; float:right; padding-right:32px;}\n"+
					".wm.post.dev .likes {display:block;}\n"+
					".wm.post.dev .likeElement {display:block;}\n"+
					".wm.post.dev .comments {display:block;}\n"+
					".wm.post.dev .commentElement {display:block;}\n"+
					".wm.post.dev .commentComment {display:block;}\n"+
					".wm.post.dev.scam {}\n"+

					".wm.content > div > .toolBox {display:inline;}\n"+
					".wm.content > div > .toolBox > div {display:inline;}\n"+
					
					".wm.post > .toolBox {display:inline;}\n"+
					".wm.post > .toolBox > div {display:inline;}\n"+
					".wm.post.classic > .toolBox {position: absolute; right: 0; top: 0;}\n"+

					".toolBox.small .toolButton {height:24px;width:24px;}\n"+
					".toolBox.medium .toolButton {height:32px;width:32px;}\n"+
					".toolBox.large .toolButton {height:48px;width:48px;}\n"+
					".toolBox.xlarge .toolButton {height:64px;width:64px;}\n"+

					".toolBox.small .toolButton > a {height:22px;width:22px; top:1px; left:1px;}\n"+
					".toolBox.medium .toolButton > a {height:28px;width:28px; top:2px; left:2px;}\n"+
					".toolBox.large .toolButton > a {height:42px;width:42px; top:3px; left:3px;}\n"+
					".toolBox.xlarge .toolButton > a {height:56px;width:56px; top:4px; left:4px;}\n"+

					".toolBox.small .toolButton > a > img {height:20px;width:20px; top:1px; left:1px;}\n"+
					".toolBox.medium .toolButton > a > img {height:24px;width:24px; top:2px; left:2px;}\n"+
					".toolBox.large .toolButton > a > img {height:36px;width:36px; top:3px; left:3px;}\n"+
					".toolBox.xlarge .toolButton > a > img {height:48px;width:48px; top:4px; left:4px;}\n"+

					".toolBox.inline .toolButton {float: right;}\n"+
					".toolBox.columnRight .toolButton {float: right; clear:both;}\n"+
					".toolBox.columnLeft .toolButton {float: left; clear:both;}\n"+
					
					"a.identified:after {content: url('"+imgs.identified+"'); padding-left:6px; margin-top:2px;}\n"+
					"a.excluded:after {content: url('"+imgs.excluded+"'); padding-left:6px; margin-top:2px;}\n"+

					"div.excluded {background-color:gray !important;}\n"+
					"div.identified {}\n"+
					"div.working {background-color:yellow !important;}\n"+
					"div.timeout {background-color:orange !important;}\n"+
					"div.paused {background-color:silver !important;}\n"+
					"div.nodef {background-color:deepskyblue !important;}\n"+
					"div.failed {background-color:red !important;}\n"+
					"div.accepted {background-color:limegreen !important;}\n"+

					"div.scam {background-color:purple !important;}\n"+
					"div.scam * {color:black !important; text-decoration:none !important;}\n"+
					"div.scam:after {content:url('"+imgs.warning+"'); position:absolute; right:0; top:0;}\n"+

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

					".toolButton { border-radius: 7px; display: block; }\n"+
					".toolButton > a { border-radius: 6px; display: block; position: relative; }\n"+
					".toolButton > a > img { border-radius: 5px; position: relative; display:block;}\n"+

					".toolButton.oddBlue {background-image: -moz-linear-gradient(center top , #51D1EA 0%, #00758B 100%); background-color:#51D1EA;}\n"+
					".toolButton.oddBlue > a {background-image: -moz-linear-gradient(center top , white 0%, #54CBE1 100%);background-color:white;}\n"+
					".toolButton.oddBlue > a > img {background-image: -moz-linear-gradient(center top , #54CBE1 0%, #1FAABF 100%); background-color:#51D1EA;}\n"+

					".toolButton.oddGreen {background-image: -moz-linear-gradient(center top , #B7E54F 0%, #5A8F00 100%);background-color:#B7E54F;}\n"+
					".toolButton.oddGreen > a {background-image: -moz-linear-gradient(center top , white 0%, #7DBB00 100%);background-color:white;}\n"+
					".toolButton.oddGreen > a > img {background-image: -moz-linear-gradient(center top , #AAE636 0%, #76AE0D 100%); background-color:#B7E54F;}\n"+

					".toolButton.oddOrange {background-image: -moz-linear-gradient(center top , #FF9968 0%, #832000 100%);background-color:#FF9968;}\n"+
					".toolButton.oddOrange > a {background-image: -moz-linear-gradient(center top , white 0%, #E83400 100%);background-color:white;}\n"+
					".toolButton.oddOrange > a > img {background-image: -moz-linear-gradient(center top , #FA9052 0%, #D94213 100%); background-color:#FF9968;}\n"+

					".toolButton.oddBlack {background-image: -moz-linear-gradient(center top , #82976E 0%, #090C05 100%);background-color:#82976E;}\n"+
					".toolButton.oddBlack > a {background-image: -moz-linear-gradient(center top , white 0%, #2F3825 100%); background-color:white;}\n"+
					".toolButton.oddBlack > a > img {background-image: -moz-linear-gradient(center top , #7D8F67 0%, #3F4835 100%); background-color:#82976E;}\n"+

					".toolButton.separator {width:0 !important; border:1px solid silver !important; margin:0 5px !important;}\n"+
					
					".toolDropDown {border:1px solid silver; border-radius:5px; padding:7.5px 5px; float:right; color:white; font-weight:bold; background-color:gray; box-shadow: 0 0 2px 2px white inset;}\n"+
					
					".menuEntry, .menuList > li {position:relative; border-radius:3px; border:1px solid white; padding:3px; min-width:100px;}\n"+
					".menuEntry:hover, .menuList > li:hover {border-color:#CCCCDD; background-color:#E0E8F6; }\n"+

					".oldcoolPage {}\n"+

					".accFailBlock {color: white; font-size: 9px; font-weight: bold; left: 0; line-height: 1.28; position: absolute; top: 0; width: 64px;}\n"+
					".accFailBlock .fail {background-color: #C3463A; border-radius: 2px 2px 2px 2px; box-shadow: 1px 1px 1px rgba(0, 39, 121, 0.77); float: right; padding: 1px 2px;}\n"+
					".accFailBlock .accept {background-color: #46B754; border-radius: 2px 2px 2px 2px; box-shadow: 1px 1px 1px rgba(0, 39, 121, 0.77); float: right; padding: 1px 2px;}\n"+

					".priority {clear:both;}\n"+
					".priority .title {border-bottom: 1px solid; border-top: 1px solid; display: block; font-size: 12px; font-weight: bold;}\n"+

					//"#wmMainPage_Prioritize > textarea {margin: 5px; height: 150px; font-size:11pt; width:780px;}\n"+

					"#wmPriorityBuilder {margin:5px; position: relative;}\n"+
					"#wmPriorityBuilder .listItem {position:relative; border-radius: 5px; border: 1px solid #BDC7D8; padding: 5px;}\n"+
					"#wmPriorityBuilder .listItem .toolBox {position: absolute; right: 0; top: 0;}\n"+
					"#wmPriorityBuilder .listItem .accept {background-color: #46B754; border-radius: 2px 2px 2px 2px; box-shadow: 1px 1px 1px rgba(0, 39, 121, 0.77); padding: 5px; color: white; font-size: 9px; font-weight: bold; line-height: 1.28; postition:relative; top:-2px; margin:3px;}\n"+
					"#wmPriorityBuilder select {border-radius: 4px; margin: 6px; padding: 3px;}\n"+
					"#wmPriorityBuilder .selectAppID {}\n"+
					"#wmPriorityBuilder .selectBonus {}\n"+
					"#wmPriorityBuilder .selectPriority {}\n"+
					"#wmPriorityBuilder .selectLimit {}\n"+
					"#wmPriorityBuilder .selectTask {}\n"+

					".unsaved {background-color:lightyellow !important;}\n"+

					".whiteover:hover {background-color:#FFFFFF !important;}\n"+
					".blueover:hover {background-color:#E0E8F6 !important;}\n"+

					".buildMode * {background-image:url('"+imgs.grid50+"') !important;}\n"+

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

					".post.pinned {border-radius: 6px; background-color: black;}\n"+
					".post.short.pinned .picture img {border-radius: 5px; height:80% !important; width:80% !important; margin-left:10%; margin-top:10%;}\n"+

					""
				,"styleConsole")}catch(e){log("wmConsole.init.addGlobalStyle: "+e);};

				//create a new wmContent div
				($("body")||document.body).insertBefore(createElement("div",{id:"wmContent"},[
					createElement("div",{id:"wmLeftCol"}),
					createElement("div",{id:"wmRightCol"}),
				]),  $("globalContainer")  );

				if ($("content")) $("content").style.display="none !important";

				//create the left tabs
				$("wmLeftCol").appendChild(
					wmConsole.tabsNode = createElement("div",{id:"wmTabContainer"},[
						createElement("a",{id:"wmMainItem_Feed",href:jsVoid,className:"wm sideBar whiteover selected",onclick:wmConsole.showTab},[
							createElement("span",{className:"title",href:jsVoid, textContent:"Collect"})
						]),
						createElement("a",{id:"wmMainItem_Sidekicks",href:jsVoid,className:"wm sideBar whiteover",onclick:wmConsole.showTab},[
							createElement("span",{className:"title", textContent:"Manage Sidekicks"})
						]),
						createElement("a",{id:"wmMainItem_Dynamics",href:jsVoid,className:"wm sideBar whiteover",onclick:wmConsole.showTab},[
							createElement("span",{className:"title", textContent:"Dynamic Grabber"})
						]),
						createElement("a",{id:"wmMainItem_FeedSource",href:jsVoid,className:"wm sideBar whiteover",onclick:wmConsole.showTab},[
							createElement("span",{className:"title", textContent:"Manage Feeds"})
						]),
						createElement("a",{id:"wmMainItem_Prioritize",href:jsVoid,className:"wm sideBar whiteover",onclick:wmConsole.showTab},[
							createElement("span",{className:"title", textContent:"Prioritize"})
						]),
					])
				);

				//add update/reinstall button
				$("wmLeftCol").appendChild(
					createElement("a",{className:"whiteover consoleButton left",id:"wmVersion",textContent:"V."+version,href:"http://userscripts.org/scripts/source/86674.user.js"},[
						createElement("span",{className:"toolTip",innerHTML:"CTRL+Click to update<br/>Refresh after install"})
					])
				);

				//add panels
				$("wmRightCol").appendChild(
					wmConsole.pagesNode = createElement("div",{id:"wmPageContainer"},[
						//feeds panel
						createElement("div",{id:"wmMainPage_Feed",href:jsVoid,className:"wm content selected"},[
							//apps tab
							forms.createCoolBar({tabs:[
								{id:"feedAll", title:"Show ALL", selected:(quickOpts["filterApp"]=="All"),func:wmConsole.selectFilter,kids:[
									wmConsole.feedNode=createElement("div",{id:"wmFeedNode",className:""}),
								]},
							]}),
						]),
						//sidekicks panel
						createElement("div",{id:"wmMainPage_Sidekicks",href:jsVoid,className:"wm content"},[
							createElement("div",{className:"header",textContent:"Sidekicks"}),
							wmConsole.sidekickNode=createElement("div",{id:"wmSidekickList",className:"scrollY"}),
						]),
						//dynamics panel
						createElement("div",{id:"wmMainPage_Dynamics",href:jsVoid,className:"wm content"},[
							createElement("div",{className:"header",textContent:"Dynamic Grabber"}),
							wmConsole.dynamicTree=createElement("div",{id:"wmDynamicTree",className:"scrollY"}),
							wmConsole.dynamicViewer=createElement("div",{id:"wmDynamicViewer",className:"scrollY"}),
						]),
						//feeds panel
						createElement("div",{id:"wmMainPage_FeedSource",href:jsVoid,className:"wm content"},[
							createElement("div",{className:"header",textContent:"Feed Sources"}),
							wmConsole.feedSourceNode=createElement("textarea",{textContent:getOpt("feeds_"+profile,'')||""}),
							createElement("span",{className:"caption",innerHTML:"Enter the id or alias of a user or page to collect from those object's feeds.<br/>One id per line.<br/>The base feed source is your own news feed, which includes your profile wall. If you want to collect from another specific source, find that source's FB id."}),
							createElement("span",{id:"wmFeedsSave",className:"whiteover consoleButton right",textContent:"Compile",onclick:main.compileFeedSources}),
						]),
						//rules panel
						createElement("div",{id:"wmMainPage_Prioritize",href:jsVoid,className:"wm content"},[
							createElement("div",{className:"header",textContent:"Priorities and Limits"}),
							createElement("div",{className:"toolBox medium columnRight"},[
								createElement("div",{},[
									createElement("div",{className:"toolButton oddGreen"},[createElement("a",{title:"Add Rule",href:jsVoid,onclick:main.newRule},[createElement("img",{src:imgs.markasaccepted})])]),
									createElement("div",{className:"toolButton oddBlue"},[createElement("a",{title:"Reset All Limits",href:jsVoid,onclick:main.resetAllLimits},[createElement("img",{src:imgs.refresh})])]),
								])
							]),
							wmConsole.priorityBuild=createElement("div",{id:"wmPriorityBuilder",className:"scrollY"},[]),
						]),
					])
				);

				//collection panel toolbar
				wmConsole.feedNode.parentNode.className+=" scrollY selected";
				wmConsole.feedNode.parentNode.parentNode.insertBefore(
					createElement("div",{className:"toolBox medium inline",style:"display:inline-block;"},[
						createElement("div",{},[
							createElement("div",{className:"toolButton oddBlack"},[createElement("a",{title:"ReID All",href:jsVoid,onclick:main.reIDAll},[createElement("img",{src:imgs.reidentify})])]),
							createElement("div",{className:"toolButton oddBlack"},[createElement("a",{title:"Clean Now",href:jsVoid,onclick:main.cleanPosts},[createElement("img",{src:imgs.trash})])]),
							createElement("div",{className:"toolButton oddBlack"},[createElement("a",{title:"Reset Counters",href:jsVoid,onclick:main.resetCounters},[createElement("img",{src:imgs.refresh})])]),

							createElement("div",{className:"toolButton separator"}),
							
							(isChrome)?null:createElement("div",{className:"toolButton oddBlack"},[createElement("a",{title:"Sort Descending",href:jsVoid,onclick:function(){main.sortPosts({direction:"desc"});main.redrawPosts();} },[createElement("img",{src:"http://i1181.photobucket.com/albums/x430/merricksdad/sortdesc.png"})])]),
							(isChrome)?null:createElement("div",{className:"toolButton oddBlack"},[createElement("a",{title:"Sort Ascending",href:jsVoid,onclick:function(){main.sortPosts({direction:"asc"});main.redrawPosts();} },[createElement("img",{src:"http://i1181.photobucket.com/albums/x430/merricksdad/sortasc.png"})])]),
							(isChrome)?null:createElement("select",{id:"wmSortBy",className:"toolDropDown", title:"Sort By:", onchange:function(){main.sortPosts({by:this.value});main.redrawPosts();} },optionsFromArray(sortFields)),

							(isChrome)?null:createElement("div",{className:"toolButton separator"}),

							createElement("div",{className:"toolButton oddBlue"},[createElement("a",{name:"2",title:"Developer View",href:jsVoid,onclick:main.setDisplay},[createElement("img",{src:imgs.dev})])]),
							createElement("div",{className:"toolButton oddBlue"},[createElement("a",{name:"1",title:"Short View",href:jsVoid,onclick:main.setDisplay},[createElement("img",{src:imgs.short})])]),
							createElement("div",{className:"toolButton oddBlue"},[createElement("a",{name:"0",title:"Classic View",href:jsVoid,onclick:main.setDisplay},[createElement("img",{src:imgs.classic})])]),
							
							createElement("div",{className:"toolButton separator"}),

							createElement("div",{className:"toolButton oddOrange"},[createElement("a",{id:"wmpausecollect",title:"Pause Automatic Collection",href:jsVoid,onclick:main.pauseCollecting},[createElement("img",{src:imgs.stop})])]),
							createElement("div",{className:"toolButton oddOrange"},[createElement("a",{id:"wmpausefetch",title:"Pause Automatic Fetching",href:jsVoid,onclick:main.pauseFetching},[createElement("img",{src:imgs.expand2})])]),
							createElement("div",{className:"toolButton oddBlack"},[createElement("a",{title:"Fetch Older Posts Now",href:jsVoid,onclick:function(){main.fetch({next:true,bypassPause:true});} },[createElement("img",{src:imgs.feeds})])]),
							createElement("div",{className:"toolButton oddBlue"},[createElement("a",{title:"Fetch Newer Posts Now",href:jsVoid,onclick:function(){main.fetch({prev:true,bypassPause:true});} },[createElement("img",{src:imgs.feeds})])]),
						])
					])

				, wmConsole.feedNode.parentNode);
				
				//restore saved sort order
				if (!isChrome) selectDropDownElement($("wmSortBy"),quickOpts.sortBy);

				//$("wmPageViewSelector").selectedIndex = (quickOpts.displayMode||0);
				var cn = wmConsole.feedNode.className;
				wmConsole.feedNode.className = (quickOpts.displayMode=="1" || quickOpts.displayMode=="3")?cn.addWord("short"):cn.removeWord("short");

			}
			wmConsole.initialized = true;

			//give sidekicks time to dock
			if (params["callback"]||null) {
				var fx = params["callback"];
				delete params["callback"];
				doAction(fx);
			}
		}catch(e){log("wmConsole.init: "+e);}},
	
		selectFilter: function(){
			if (this.className.containsWord("selected") ) return;
			var tabs=this.parentNode.childNodes;
			if (tabs.length) for (var t=0,tab;(tab=tabs[t]);t++) tab.className=tab.className.removeWord("selected");
			this.className=this.className.addWord("selected");
			quickOpts["filterApp"]=this.id.split("_feed")[1];
			main.saveQuickOpts();
			main.redrawPosts();
		}
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

		addMenuElements:function(app){try{	
			//add various WM based options for this app
			GM_config.settings["section_dynamicopts"]["kids"]["enableDynamic"]["kids"]["dynamic"+app.appID]=checkBox(app.name+" ("+app.appID+")",true);
			GM_config.settings["section_filters"]["kids"]["dontstealBlock"]["kids"][app.appID+"dontsteal"]=checkBox(app.name);
			GM_config.settings["section_filters"]["kids"]["filterapps"]["kids"]["hide"+app.appID]=checkBox(app.name);
			GM_config.settings["section_basicopts"]["kids"]["blockautolikebygame"]["kids"]["nolike"+app.appID]=checkBox(app.name);

			var testms=quickOpts["masterSwitch"][app.appID];
			quickOpts.masterSwitch[app.appID]=(testms==null||testms=="undefined")?true:testms;
		} catch(e) {log("Dock.addMenuElements: "+e);}},

		addSidekickElement:function(app){try{
			//create an entry for the sidekick on the wmConsole
			var sidekickNode = wmConsole.sidekickNode || $("wmSidekickList");
			if (sidekickNode) {
				sidekickNode.appendChild(
					createElement("div",{className:"wmSidekickEntry"+((quickOpts.masterSwitch[app.appID]||false)?"":" disabled")},[
						createElement("img",{className:"icon crisp",src:(app.icon||imgs.plugin)}),
						createElement("span",{className:"title",textContent:app.name}),
						createElement("span",{className:"desc",textContent:(app.desc||"no description")}),
					createElement("a",{id:"master_"+app.appID,className:"master consoleButton right",href:jsVoid,textContent:((quickOpts.masterSwitch[app.appID]||false)?"Disable":"Enable"),onclick:main.toggleSidekick}),
					])
				);
			} else {
				log("wmconsole sidekicknode is null");
			}
		} catch(e) {log("Dock.addSidekickElement: "+e);}},
	
		addConsoleElement:function(app){try{
			//create game filter buttons on the wmConsole
			var coolBar = $("wmCoolItem_feedAll").parentNode;
			if (coolBar) {
				var title=(app.name||"");
				var icon=(app.icon||null);
				var node = coolBar.appendChild(
					forms.createCoolBarButton({id:"feed"+app.appID,title:title,icon:icon,func:wmConsole.selectFilter,selected:(quickOpts.filterApp==app.appID)})
				);
				//add accept/fail counters
				app.failCount=0;
				app.acceptCount=0;
				if (node) node.appendChild(
					createElement("div",{className:"accFailBlock"},[
						createElement("span",{className:"fail",textContent:"0"}),
						createElement("span",{className:"accept",textContent:"0"}),
					])
				);

				var btnCount = coolBar.childNodes.length;
				coolBar.style.width=(btnCount*64)+"px";
				coolBar.parentNode.className = coolBar.parentNode.className.addWord("scrollX");
			}
		} catch(e) {log("Dock.addConsoleElement: "+e);}},

		answerDockingDoor: function(){try {
			log("Sidekick requesting to dock");

			//get all sidekicks that left info on the dock;
			forNodes(".//div[@id='wmDock']/div[(@data-ft) and not(@data-ft='')]",{},function(newNote){
				if (newNote){
					var val = newNote.getAttribute('data-ft');
					var newset = JSON.parse(val);

					//save it into the NEW format for games
					var game=(apps[newset.appID]=new App(newset));

					//append the appID in front of every menu and test element id
					game.menu=Dock.fixMenu(game.menu,game.appID);
					Dock.fixTests(game.tests,game);
					Dock.fixAcceptTexts(game);

					Dock.addMenuElements(game);
					Dock.addSidekickElement(game);
					Dock.addConsoleElement(game);

					//add similar options for grouped apps
					var filters=(newset.addFilters||[]);
					for (var f=0,filt;(filt=filters[f]);f++) {
						Dock.addMenuElements(filt);
						Dock.addSidekickElement(filt);
						Dock.addConsoleElement(filt);
					
						//create a new App for each sub-app and link parent and child pointers
						filt.parent=game; //point to parent game
						(game.kids=(game.kids||[])).push(apps[filt.appID]=new App(filt));
					}

					//add synonym appID's for side games, avoiding already created filters
					var synID=newset["synAppID"]||null;
					if (synID) for (var s=0;s<synID.length;s++) if (!apps[synID[s]]) {
						(game.kids=(game.kids||[])).push(apps[synID[s]]=new App({appID:synID[s],parent:game}));
					}

					//add menu items
					GM_config.append(game.menu);
					main.updateSettingsValues();

					//detach the menu from the newset to reduce duplication
					delete game.menu;

					//erase the door note so we dont add it again later
					newNote.setAttribute('data-ft','');

					return;
			
				}
			});
		} catch(e) {log("Dock.answerDockingDoor: "+e);}},

	};
	log("Script: WM initialized",{level:0});
	
//***************************************************************************************************************************************
//***** Sidekick Object
//***************************************************************************************************************************************
	var Collector = {
		tabs : {}, //container for window objects
		recycle : [], //container for reusable window objects
		queue : [], //container for urls to do in order
		count : 0,
		
		//requires id, url and callback
		open : function(params) {try{
			params.msg=status.print("Collecting...",{});
			//log("Collector.open()",{level:0});

			//check for tab queueing
			if (opts.queuetabs && Collector.count) {
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
				tabHwnd.location.href=url;
				//log("Collector.open: window reused",{level:1});
			} else {
				tabHwnd = open(url,"_blank");
				//log("Collector.open: new window created",{level:1});
			}

			//window opening
			if (tabHwnd) {
				Collector.count++;
				params.hwnd=tabHwnd; //store the window handle
				params.openTime=timeStamp();
				Collector.tabs[id]=params; //add the tab and all its data to the array
				var callback = params.callback;
				if (callback) {
					delete params.callback;
					//log("Collector.open: callback fired",{level:3});
					doAction(function(){
						remove($(params.msg));
						callback(params);
					});
				}
			} else {
				log("Collector: Tab or Window is not opening or your browser does not support controlling tabs and windows via scripts.",{level:5});
			}
		}catch(e){log("Collector.open: "+e);}},

		doNext : function(){try{Collector.open(Collector.queue.shift());}catch(e){log("Collector.doNext: "+e);}},

		close : function(tab) {try{
			//recycle or close the passed tab
			try{
				if (opts.recycletabsall || opts.queuetabs || (Collector.recycle.length < opts.recycletabs)) {
					//wipe it and put it away
					tab.hwnd.location.hash="";
					tab.hwnd.location.href="about:blank";
					Collector.recycle.push(tab.hwnd);
				} else {
					if (tab.hwnd) tab.hwnd.close();
				}
				tab.hwnd=null;
			} catch (e){log("Collector.close: close or recycle: "+e);}
			delete tab;
			Collector.count--

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
	};


//***************************************************************************************************************************************
//***** New Prioritizer Object
//***************************************************************************************************************************************
	//enums
	var PRIORITY_DESTROY_RULE = 0;
	var PRIORITY_PAUSE_TYPE = 1;
	var PRIORITY_UNCHECK_TYPE = 2;
	var PRIORITY_PAUSE_APPID = 3;
	var PRIORITY_REFRESH_BROWSER = 4;
	var PRIORITY_PAUSE_ALL = 5;

	var Priority = {
		opts:{},

		init:function(params){
			params=(params||{});
			Priority.opts = getOptJSON("priorityOpts_"+profile)||{};
			
			//import rules
			rules={};
			var rulesIn=getOptJSON("priority_"+profile)||{};
			for (var r in rulesIn){
				var rule=new Rule(rulesIn[r]);
				rules[rule.id]=rule;
			}
		},
	};


//***************************************************************************************************************************************
//***** New Dynamic Grabber Object
//***************************************************************************************************************************************
	var Grabber = {

		treeview:null, //container for treeview object
		tests:[],
		opts:{},

		methods:["msg","fromID","fromName","url","body","html","targetID","targetName","caption","title","desc","comments",
				"commentorID","commentorName","likeName","likeID","link","either","img","canvas"],

		init:function(params){try{
			params=(params||{});

			Grabber.opts=getOptJSON("dynamicOpts_"+profile)||{};

			//get current tests or try to upgrade from older WM
			var testString=(getOpt("dynamics_"+profile)||""), failed;

			if (testString=="") {//never used dynamics before
				log("Grabber.init: Dynamics never used before");
				setOpt("dynamics_"+profile, "[{}]");
			} 

			else if (testString.startsWith("[")) { //already stored in an array
				if (testString.startsWith("[{")) {//should be ok from here
					try{
						var test=JSON.parse(testString);
						failed=((test==null) || ((typeof test)!="object"));
					} catch (e) {
						failed=true;
					}
				}
				else if (testString=="[]"){ //no tests exist, add a default test
					log("Grabber.init: No initial dynamic test...add one");
					setOpt("dynamics_"+profile, "[{}]");
				}
				else failed=true; //format not correct
			} 

			else if (testString.startsWith("{")) { //already stored in an object
				try{
					var test=JSON.parse("["+testString+"]");
					failed=((test==null) || ((typeof test)!="object"));
					if (!failed) {
						log("Grabber.init: Upgraded");
						setOptJSON("dynamics_"+profile, test); //upgrade
					}

				} catch (e) {
					failed=true;
				}
			} 

			else failed=true; //format not correct

			if (failed) {
				if (confirm("I Cannot convert your dynamic tests to objects. I need to discard your tests to procede.")) {
				} else {
					alert("OK, but I cannot run your current tests. I will store them for you in the about:config under \".dynamicBackup\" and give you a fresh grabber console.");
					setOpt("dynamicBackup_"+profile, testString);
				}
				setOpt("dynamics_"+profile, "[{}]");
			}

			Grabber.tests = getOptJSON("dynamics_"+profile) || [{}];
		}catch(e){log("Grabber.init: "+e);}},

		save:function(){try{
			setOptJSON("dynamics_"+profile,Grabber.tests);
			setOptJSON("dynamicOpts_"+profile,Grabber.opts);
		}catch(e){log("Grabber.save: "+e);}},

		add:function(){try{
			var test={enabled:true};
			Grabber.tests.push(test);
			Grabber.save();
			return test;
		}catch(e){log("Grabber.add: "+e);}},
		
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


//***************************************************************************************************************************************
//***** Feed Object
//***************************************************************************************************************************************

	//feed object type
	var Feed = function(){try{
		params=params||{};

		//set defaults
		this.enabled=true;

		//use passed params
		for (var p in params) this[p]=params[p];

		this.enable=function(){try{this.enabled=true;}catch(e){log("Feed.enable: "+e);}};
		this.disable=function(){try{this.enabled=false;}catch(e){log("Feed.disable: "+e);}};
		this.toggle=function(){try{if(this.enabled)this.disable(); else this.enable();}catch(e){log("Feed.toggle: "+e);}};
		

	}catch(e){log("Feed.init: "+e);}};


//***************************************************************************************************************************************
//***** Priority/Rule Object
//***************************************************************************************************************************************

	//priority onLimit actions
	var priorityActions = new Enum("DESTROY_RULE","PAUSE_TYPE","UNCHECK_TYPE","PAUSE_APPID","REFRESH_BROWSER","PAUSE_ALL");

	//priority object type
	var Rule = function(params){try{
		params=params||{};

		//set defaults
		this.enabled=true;
		this.limitCount=0; this.limit=0; 
		this.level=50; this.appID=null; this.bonus=null;

		//use passed params
		for (var p in params) this[p]=params[p];
		
		this.id=this.id||unique();
		
		this.enable=function(){try{
			this.enabled=true;
			this.node.className=this.node.className.removeWord("disabled");
			main.saverules();
		}catch(e){log("Rule.enable: "+e);}};
		
		this.disable=function(){try{
			this.enabled=false;
			this.node.className=this.node.className.addWord("disabled");
			main.saveRules();
		}catch(e){log("Rule.disable: "+e);}};
		
		this.toggle=function(){try{
			if(this.enabled)this.disable(); else this.enable();
		}catch(e){log("Rule.toggle: "+e);}};

		this.resetLimit=function(){try{
			this.limitCount=0;
			this.limitCounterNode.textContent=this.limitCount;
			main.saveRules();
		}catch(e){log("Feed.resetLimit: "+e);}};
		
		this.incrementLimitCounter=function(){try{
			this.limitCount++;
			this.limitCounterNode.textContent=this.limitCount;
			main.saveRules();
		}catch(e){log("Feed.incrementLimitCounter: "+e);}};
		
		this.remove=function(){try{
			remove(this.node);
			delete rules[this.id];
			main.saveRules();
		}catch(e){log("Feed.remove: "+e);}};
		
		this.populateBonusList=function(){try{
			var node=this.bonusDropDown;
			var bonuses=[];
			//get the list of accept texts for this app
			if (this.appID!="") bonuses = apps[this.appID].accText;
			bonuses["dynamic"]="* Dynamic: Just Grab It";
			bonuses["none"]="* None: Break Identification Circuit";
			bonuses["wishlist"]="* Flag as Wishlist";
			bonuses["exclude"]="* Exclude: Prevent Collection";
			bonuses["send"]="* Send Unknown";
			bonuses["doUnknown"]="* Get Unknown";
			
			//add each element to the dropdown
			var elem;
			node.innerHTML=""; //wipe previous list
			for (var i in bonuses) {
				var showI=i.removePrefix(this.appID);
				node.appendChild(elem=createElement("option",{textContent:((bonuses[i].substring(0,1)=="*")?"":((showI.startsWith("send"))?"Send ":"Get "))+bonuses[i], value:showI}));
				if (this.bonus== showI) elem.selected = true;
			}
		}catch(e){log("Rule.populateBonusList: "+e);}};
		
		//draw to priority/rule manager
		var rule=this;
		try{$("wmPriorityBuilder").insertBefore(
			this.node=createElement("div",{className:"listItem"+((!this.enabled)?" disabled":"")},[
				createElement("label",{textContent:"appID:"}),
				this.appDropDown=createElement("select",{className:"selectAppID",onchange:function(){rule.appID=this.value; rule.populateBonusList(); main.saveRules();}},main.getAppDropDownList(this.appID)),
				createElement("label",{textContent:"Bonus:"}),
				this.bonusDropDown=createElement("select",{className:"selectBonus",onchange:function(){rule.bonus=this.value; main.saveRules();}},main.getBonusDropDownList({appID:params.appID,selected:params.bonus,dropID:true})),
				createElement("br"),
				createElement("label",{textContent:"Priority:"}),
				this.levelDropDown=createElement("select",{className:"selectPriority",onchange:function(){rule.level=parseInt(this.value); main.saveRules();}},(function(){
					var optsret=[]; 
					//create option values and names;
					var ddopts = {};
					for (var i=0;i<100;i++) {ddopts[i.toString()]=i.toString();}
					ddopts["0"]="Top"; ddopts["50"]="Default"; ddopts["99"]="Bottom";

					//add option values to list
					for (var i in ddopts) {
						var elem = createElement("option",{textContent:ddopts[i],value:i});
						if ((this.level||null) == i) elem.selected=true;
						optsret.push(elem);
					}
					return optsret;
				})()),
				createElement("label",{textContent:"Limit:"}),
				this.limitCounterNode=createElement("span",{className:"accept",textContent:this.limitCount,title:"Current Counter"}),
				this.limitDropDown=createElement("select",{className:"selectLimit",onchange:function(){rule.limit=this.value; main.saveRules();}},(function(){
					var optsret=[]; 
					//create option values and names;
					var ddopts = {}; var lims=[-1,1,2,3,4,5,10,15,20,30,50];
					for (var i=0;i<lims.length;i++) {ddopts[lims[i].toString()]=lims[i].toString();}
					ddopts["-1"]="No Limit";

					//add option values to list
					for (var i in ddopts) {
						var elem = createElement("option",{textContent:ddopts[i],value:i});
						if ((this.limit||null) == i) elem.selected=true;
						optsret.push(elem);
					}
					return optsret;
				})()),
				createElement("label",{textContent:"onLimit:"}),
				this.taskDropDown=createElement("select",{className:"selectTask",onchange:function(){rule.onLimit=this.value; main.saveRules();}},(function(){
					var optsret=[]; 

					//create option values and names;
					var ddopts = {"0":"Destroy Rule","1":"Pause Bonus","2":"Uncheck Bonus","3":"Pause AppID",
						"4":"Refresh Browser","5":"Pause All"};

					//add option values to list
					for (var i in ddopts) {
						var elem = createElement("option",{textContent:ddopts[i],value:i});
						if ((this.onLimit||null) == i) elem.selected=true;
						optsret.push(elem);
					}
					return optsret;
				})()),
				createElement("div",{className:"toolBox medium inline"},[
					createElement("div",{},[
						createElement("div",{className:"toolButton oddOrange"},[createElement("a",{title:"Delete Rule",href:jsVoid,onclick:function(){rule.remove();}},[createElement("img",{src:imgs.trash})])]),
						createElement("div",{className:"toolButton oddBlue"},[createElement("a",{title:"Reset Limit",href:jsVoid,onclick:function(){rule.resetLimit();}},[createElement("img",{src:imgs.refresh})])]),
						createElement("div",{className:"toolButton oddBlack"},[createElement("a",{title:"Toggle",href:jsVoid,onclick:function(){rule.toggle();}},[createElement("img",{src:imgs.check})])]),
					])
				])
			])
		, $("wmPriorityBuilder").firstChild);}catch(e){log("Rule.init.drawRule: "+e);}	

	}catch(e){log("Rule.init: "+e);}};

	
//***************************************************************************************************************************************
//***** Group Object
//***************************************************************************************************************************************

	//bonus group object type
	var BonusGroup = function(){try{
		params=params||{};
		for (var p in params) this[p]=params[p];
		
	}catch(e){log("BonusGroup.init: "+e);}};


//***************************************************************************************************************************************
//***** App Object
//***************************************************************************************************************************************

	//app object type
	var App = function(params){try{
		//expected: id, name, namespace, icon
		params=params||{};

		//set defaults
		this.enabled=true; this.failCount=0; this.acceptCount=0;
		this.paused=false;
		this.tests={};

		//use passed params
		for (var p in params) this[p]=params[p];
		
		this.enable=function(){try{this.enabled=true;}catch(e){log("App.enable: "+e);}};
		this.disable=function(){try{this.enabled=false;}catch(e){log("App.disable: "+e);}};
		this.toggle=function(){try{if(this.enabled)this.disable(); else this.enable();}catch(e){log("App.toggle: "+e);}};
		
		this.resetCounter=function(){try{
			this.acceptCount=0; this.failCount=0;
			this.updateCounters();
		}catch(e){log("App.resetCounter: "+e);}};
		
		this.updateCounters=function(){try{
			var node = selectSingleNode(".//*[contains(@class,'accFailBlock')]/*[contains(@class,'fail')]",{node:$("wmCoolItem_feed"+this.appID)});
			if (node) node.textContent=this.failCount;
			node = selectSingleNode(".//*[contains(@class,'accFailBlock')]/*[contains(@class,'accept')]",{node:$("wmCoolItem_feed"+this.appID)});
			if (node) node.textContent=this.acceptCount;
		}catch(e){log("App.updateCounters: "+e);}}

		this.fetchPosts=function(){try{
			//request posts from facebook
		}catch(e){log("App.fetchPosts: "+e);}}

		this.pause=function(){try{this.paused=true;}catch(e){log("App.pause: "+e);}}
		this.unPause=function(){try{this.paused=false;}catch(e){log("App.unPause: "+e);}}

		//get a list of posts for this app from the global posts list
		this.getPosts=function(){try{
			return matchByParam(posts,"app",this,"object");
		}catch(e){log("App.getPosts: "+e);}}

	}catch(e){log("App.init: "+e);}};


//***************************************************************************************************************************************
//***** Post Object
//***************************************************************************************************************************************

	//post binary flags
	var postFlags = new EnumFlags("COLLECT","SCAM","FAILED","ACCEPTED","EXCLUDED","PAUSED","PINNED","LIKED","MYPOST","STALE","NODEF","WISHLIST","WORKING","TIMEOUT");

	//post object type
	var Post = function(params){try{
		params=params||{};

		//set defaults
		this.status=0; this.state=""; this.flags=0;
		this.node=null; //collector panel node

		//use passed params
		for (var p in params) this[p]=params[p];

		//link to our application array of objects
		var app=(this.app=apps[this.application.id]);
		var synApp=app.parent||app;

		//set another appID param specifically for sorting purposes
		this.appID=app.appID;
		this.appName=app.name;

		//update the namespace parameter if it does not exist
		if (!exists(app.namespace)) app.namespace=this.application.namespace;

		//validate the application namespace for sidekicks that provide namespace checking
		if (exists(app.namespace)) if (app.namespace!=this.application.namespace) {
			this.flags=this.flags|postFlags.SCAM; //Graph API namespace does not match sidekick known namespace, flag as scam
		}

		//now drop the application object we got from FB
		if (exists(this.application)) delete this.application;

		//add some functions
		this.identify=function(){try{
			//set a timer on the post for delayed deletion
			this.drawTime=timeStamp();

			//set/reset priority, state, status & flags
			this.priority=50;
			this.status=0;
			this.state="";
			this.flags=0;
			this.removeAllClasses();
			if (this.node||null) this.node=null; //detach the node object

			//avoid posts that belong to a disabled sidekick
			if(!quickOpts.masterSwitch[app.appID]) {
				//master switch is off
				this.exclude();
				return true;
			}

			//hide posts by apps that we specifically told to hide
			if (opts["hide"+app.appID]) {this.remove(); return false;}

			var whoPosted = (this.fromID=this.from.id);
			var whoName = (this.fromName=this.from.name);

			//convert a unix date to a readable date
			this.realtime=(new Date((this.date()||0)*1000).toLocaleString());

			//avoid potential scam posts
			if (opts.scamblock) {
				if ( !this.linkHref.startsWith("http://apps.facebook.com/"+app.namespace) && !this.linkHref.startsWith("https://apps.facebook.com/"+app.namespace) ){
					this.flags |= (postFlags.SCAM | postFlags.EXCLUDED);
					if (opts.hidescams) {this.remove(); return false;}
					return true;
				}
			}

			//avoid posts by self
			if (whoPosted==userID){
				this.exclude();
				if (opts.hidemyposts) {this.remove(); return false;}
				return true;
			}

			//avoid W2W posts not for me
			var isForMe = this.getTargets().inArray(userID);
			var isW2W = this.getTargets().length>0;
			if (opts[app.appID+"dontsteal"] && isW2W && !isForMe){
				this.exclude();
				if (opts.hidenotforme) {this.remove(); return false;}
				return true;
			}

			//avoid posts older than olderLimit
			if (olderLimit!=0) {
				if (this.isStale(olderLimit) && opts.skipstale) {
					this.exclude();
					if (opts.hidestale) {this.remove(); return false;}
					return true;
				}
			}
							
			//get bonus type
			var w=(this.which = main.which(this));

			//check for pause
			if(typesPaused.inArray(w)) this.pause();

			//check for excluded or unknown posts
			if (w=="none" || w=="exclude") {
				if (w=="exclude") {
					this.exclude();
					if (opts.hideexcluded) {this.remove(); return false;}
				} else if (w=="none") {
					this.flags |= postFlags.NODEF;
					if (opts.pinundefined) this.pin();
				}
				return true;
			} else {
				//set identified text
				this.idText=main.getAccText(synApp.appID,w);

				if (w==synApp.appID+"doUnknown" || w==synApp.appID+"send") {
					this.flags |= postFlags.NODEF;
					if (opts.pinundefined) this.pin();
				}
				
				//check for priority
				for (r in rules) {
					var rule = rules[r];
					if (rule.enabled && (rule.appID+rule.bonus) == w) {
						//affected by this rule
						this.priority=rule.level;
					}
				}
			}

			//avoid liked posts
			if (this.getLikes().inArray(userID) && opts.skipliked){
				if (opts.markliked) this.status=1; //mark liked as accepted
				this.exclude();
				if (opts.hideliked) {this.remove(); return false;}
				return true;
			}

			//Check history
			this.status=this.status||0;
			if (exists(history[this.id])) {
				//post previously processed
				this.status=(history[this.id].status||0);

				var gotItem=((this.status>0) || (this.status==-6) || (this.status==-4) || (this.status==-15 && opts.accepton15));
				if (gotItem) this.flags |= postFlags.ACCEPTED; 
				else if (this.status<0) this.flags |= postFlags.FAILED;

				if (opts.hideaccepted && gotItem) {this.remove(); return false;}
				if (opts.hidefailed && this.status<0) {this.remove(); return false;}
				return true;
			}

			//check if wanted
			if ((w=="dynamic") || opts[w] || (w.startsWith((this.app.parent||this.app).appID+"send") && opts[(this.app.parent||this.app).appID+"sendall"]) ) {
				//bonus type is wanted
				this.collect();
				return true;
			}

			//bonus type is unwanted
			if (w.find("wishlist")) {
				this.flags |= postFlags.WISHLIST;
				if (opts.hideunwanted && !opts.donthidewishlists) {this.remove(); return false;} 
			}
			if (opts.hideunwanted) {this.remove(); return false;}
			return true;

		}catch(e){log("Post.identify: "+e);}};

		this.open=function(){try{
			var post = this;
			var id = post.id;
			var app = this.app;
			var synApp = app.parent||app;

			//fix the link based on sidekick alterlink information
			var alterLink=(synApp.alterLink||null);
			var targetHref = post.linkHref();
			var doAlterLink=(synApp.flags.alterLink||false);

			if (doAlterLink && alterLink) {
				//note that only find and replace functionality is available right now, no wildcards or array inserts will work
				var find = (alterLink.find||"");
				//check if user is wanting a regex or string replacement
				if (alterLink.isRegex||false) find=new RegExp(find,"");

				targetHref = targetHref.replace(find,(alterLink.replace||""));

				//check for word specific changes
				if ((alterLink.words||null) && (alterLink.conversionChart||null)){
					var either = post.either().toLowerCase();
					for (var w=0,len=alterLink.words.length; w<len; w++) {
						var word=(alterLink.words[w]).toLowerCase();
						if (either.contains(word)) {
							//replace the word
							targetHref=targetHref.replace("{%1}",alterLink.conversionChart[word.noSpaces()]);
							break;
						}
					}
				}
			}

			//fix the link, removing https and switching to http only
			targetHref = targetHref.replace('https://','http://');

			//open the bonus page in a new tab or the previously opened tab object to save memory
			post.flags = ((post.flags | postFlags.WORKING) & (~postFlags.COLLECT));
			post.fixClasses();
			post.state="working";
			main.requestsOpen++;
			doAction(function(){Collector.open({url:targetHref,id:id,callback:main.onFrameLoad,post:post});});
		}catch(e){log("Post.open: "+e);}};

		this.forceOpen=function(){try{
			var post=this;
			post.flags |= postFlags.COLLECT;
			post.flags &= ~(postFlags.FAILED | postFlags.TIMEOUT | postFlags.ACCEPTED);
			post.fixClasses();
			post.open();
		}catch(e){log("Post.forceOpen: "+e);}};

		this.like=function(){try{
			var url=this.actionLink("Like");
			setTimeout(function(){Collector.open({url:url+"#likeit",id:url,callback:main.onLikePost});},100);
		}catch(e){log("Post.like: "+e);}};

		this.draw=function(redraw){try{
			var post=this;
			var app=post.app, synApp=app.parent||app;

			//if a filter exists check against filter
			var filter=(quickOpts.filterApp||"All");
			if (filter!="All" && filter!=app.appID) return; //dont show this post in this filter

			//prefetch css words
			var tags = " " + post.state;
			for (var f in postFlags) if (post.flags & postFlags[f]) tags=tags.addWord(f.toLowerCase());
			//disallow certain combinations
			if (tags.containsWord("accepted") || tags.containsWord("failed")) tags=tags.removeWord("collect");

			//create the layout
			var layout=function(){
				switch (quickOpts.displayMode||"0"){			

					case "0": //classic mode
						var hideimage = (opts.hideimages || (opts.hideimagesunwanted && (post.which==="none" || post.which==="exclude") ) );
						var placeholder=createElement("div");
						return createElement("div",{id:"post_"+post.id,className:"wm post classic"+tags+((hideimage)?" noimage":""),title:((post.flags & postFlags.SCAM)?"Post is possible scam":"")},[
							createElement("a",{className:"actor",textContent:post.from.name,href:"http://www.facebook.com/profile.php?id="+post.from.id}),
							createElement("div",{className:"toolBox small inline"}),
							(!hideimage)?createElement("a",{href:post.link,className:"picture"},[
								createElement("img",{src:(post.picture||imgs.noimage)})
							]):placeholder.cloneNode(true),
							(!opts.hidebody)?createElement("div",{},(function(){
								var ret = [];
								ret.push(createElement("a",{className:"title",textContent:post.name,href:post.link}));
								if (post.caption||null)ret.push(createElement("span",{className:"caption",textContent:post.caption}) );
								if (post.description||null)ret.push(createElement("span",{className:"description",textContent:post.description}) );
								return ret;
							})() ):placeholder.cloneNode(true),
							createElement("div",{style:"position:absolute; bottom:5px; left:100px; width:660px;"},[
								(!opts.hidedate)?createElement("span",{className:"postDate",textContent:post.realtime}):placeholder.cloneNode(true),
								(!opts.hidevia)?createElement("a",{className:"appName",textContent:"  via "+app.name,href:"http://apps.facebook.com/"+app.namespace+"/",title:app.appID}):placeholder.cloneNode(true),
								createElement("a",{className:"linkText"+((post.flags & postFlags.EXCLUDED)?" excluded":"")+(post.idText?" identified":""),textContent:((post.idText||null) && opts.debugrecog)?post.idText:post.linkText(),href:post.linkHref(),title:post.linkText()}),
							]),
						]);
						placeholder=null;
						break;

					case "1": case "3": //short mode and priority mode
						return createElement("div",{id:"post_"+post.id,className:"wm post short "+opts.thumbsize+tags,title:((post.flags & postFlags.SCAM)?"Post is possible scam":"")},[
							createElement("a",{href:jsVoid,className:"picture",onclick:function(){post.forceOpen();}},[
								createElement("img",{src:post.picture||imgs.noimage,onmousemove:main.moveFloater})
							]),
							createElement("div",{id:"floater_"+post.id,className:"floater "+opts.thumbsize},[
								createElement("div",{className:"toolBox small inline"}),
								createElement("a",{className:"actor",textContent:"From: "+post.from.name,href:"http://www.facebook.com/profile.php?id="+post.from.id}),
								createElement("span",{className:"postDate",textContent:"Date: "+post.realtime}),
								createElement("a",{className:"appName",textContent:"App: "+app.name,href:"http://apps.facebook.com/"+app.namespace+"/",title:app.appID}),
								createElement("a",{className:"linkText"+((post.flags & postFlags.EXCLUDED)?" excluded":"")+(post.idText?" identified":""),textContent:"Action: "+(((post.idText||null) && opts.debugrecog)?post.idText:post.linkText()), href:post.linkHref(), title:post.linkText()}),
								createElement("span",{className:"status",textContent:"Status: "+(post.status||"0")+ " " + (main.statusText[post.status||"0"])}),
							]),
						]);
						break;

					case "2": //dev mode
						return createElement("div",{id:"post_"+post.id,className:"wm post dev"+tags,title:((post.flags & postFlags.SCAM)?"Post is possible scam":"")},[
							createElement("a",{className:"postid",textContent:"postID: "+post.id, href:post.actionLink("Like"), target:"_blank"}),
							createElement("span",{className:"actor",textContent:"fromName(fromID): "+post.from.name+"("+post.from.id+")"}),
							createElement("div",{className:"toolBox small inline"}),
							createElement("a",{href:post.link,className:"picture"},[
								createElement("img",{src:post.picture||imgs.noimage})
							]),
							createElement("div",{},(function(){
								var ret = [];
								ret.push(createElement("span",{className:"title",textContent:"title: "+post.name}));
								if (post.message||null)ret.push(createElement("span",{className:"msg",textContent:"msg: "+post.message}) );
								if (post.caption||null)ret.push(createElement("span",{className:"caption",textContent:"caption: "+post.caption}) );
								if (post.description||null)ret.push(createElement("span",{className:"description",textContent:"desc: "+post.description}) );
								ret.push(createElement("span",{className:"imgsrc",textContent:"img: "+(post.picture||"")}));
								ret.push(createElement("span",{className:"postDate",textContent:post.realtime}));
								ret.push(createElement("span",{className:"appName",textContent:" via appName: "+app.name+"(appID: "+app.appID+", canvas: "+app.namespace+")"}));
								ret.push(createElement("a",{className:"url",textContent:"url: "+post.link,href:post.link}) );

								//show likes
								if (post.likes||null){
									if (post.likes.data||null){
										ret.push(createElement("div",{className:"likes"},(function(){
											var data=post.likes.data;
											var retData=[];
											for(var d=0,lenL=data.length; d<lenL; d++){
												retData.push(createElement("span",{className:"likeElement",textContent:"likeName(likeID):"+data[d].name+"("+data[d].id+")"}));
											}
											return retData;
										})()));
									}
								}

								//show comments
								if (post.comments||null){
									if (post.comments.data||null){
										ret.push(createElement("div",{className:"comments"},(function(){
											var data=post.comments.data;
											var retData=[];
											for(var d=0,lenC=data.length; d<lenC; d++){
												retData.push(createElement("span",{className:"commentElement",textContent:"commentorName(commentorID): "+data[d].from.name+"("+data[d].from.id+")"}));
												retData.push(createElement("span",{className:"commentComment",textContent:"comments: "+data[d].message}));
											}
											return retData;
										})()));
									}
								}
								return ret;
							})() ),
							createElement("div",{style:"position:absolute; bottom:5px; left:100px; width:660px;"},[
								createElement("a",{className:"linkText",textContent:("identified linkText: "+post.idText+" (which: "+post.which+")")+" || "+("original linkText: "+post.linkText()), href:post.linkHref(),title:post.linkText()}),
							]),
						]);
						break;
				}
			}();

			//store the DOM object
			post.node=layout;

			//determine draw location
			var sibling=(redraw)?null:post.nextSibling();
			if (sibling||null) wmConsole.feedNode.insertBefore(layout, sibling.node);
			else wmConsole.feedNode.appendChild(layout);

			main.addToolBox(post);
		}catch(e){log("Post.draw: "+e);}};

		this.openSource=function(){try{
			var url=this.actionLink("Like");
			open(url,"_blank");
		}catch(e){log("Post.openSource: "+e);}};

		this.addClass=function(s){try{
			if (this.node){
				this.node.className=this.node.className.addWord(s);
			}
		}catch(e){log("Post.addWord: "+e);}};
		
		this.removeAllClasses=function(){try{
			for (var c in postFlags) this.removeClass(c);
		}catch(e){log("Post.removeAllClasses: "+e);}};
		
		this.removeClass=function(s){try{
			if (this.node){
				this.node.className=this.node.className.removeWord(s);
			}
		}catch(e){log("Post.removeWord: "+e);}};

		this.pause=function(){try{
			this.flags |= postFlags.PAUSED;
			this.addClass("paused");
		}catch(e){log("Post.pause: "+e);}};

		this.unPause=function(){try{
			this.flags &= ~postFlags.PAUSED;
			this.removeClass("paused");
		}catch(e){log("Post.unPause: "+e);}};

		this.exclude=function(){try{
			this.flags |= postFlags.EXCLUDED;
			this.addClass("excluded");
		}catch(e){log("Post.exclude: "+e);}};

		this.collect=function(){try{
			this.flags |= postFlags.COLLECT;
			this.addClass("collect");
		}catch(e){log("Post.collect: "+e);}};

		this.stopCollect=function(){try{
			this.flags &= ~postFlags.COLLECT;
			this.removeClass("collect");
		}catch(e){log("Post.collect: "+e);}};

		this.togglePin=function(){try{
			if (this.flags & postFlags.PINNED) this.unPin(); else this.pin();
		}catch(e){log("Post.togglePin: "+e);}};

		this.pin=function(){try{
			this.flags |= postFlags.PINNED;
			this.addClass("pinned");

			if (this.node||null) {
				var btn=selectSingleNode(".//div[contains(@class,'toolButton')]//a[contains(@title,'Pin')]/img",{node:this.node});
				if (btn) btn.className=btn.className.addWord("rotateRight");
			}
		}catch(e){log("Post.pin: "+e);}};

		this.unPin=function(){try{
			this.flags &= ~postFlags.PINNED;
			this.removeClass("pinned");

			if (this.node||null) {
				var btn=selectSingleNode(".//div[contains(@class,'toolButton')]//a[contains(@title,'Pin')]/img",{node:this.node});
				if (btn) btn.className=btn.className.removeWord("rotateRight");
			}
		}catch(e){log("Post.unPin: "+e);}};

		this.fixClasses=function(){try{
			//"COLLECT","SCAM","FAILED","ACCEPTED","EXCLUDED","PAUSED","PINNED","LIKED","MYPOST","STALE","NODEF","WISHLIST","WORKING","TIMEOUT"
			for (var f in postFlags) if (postFlags[f] & this.flags) this.addClass(f.toLowerCase()); else this.removeClass(f.toLowerCase());
		}catch(e){log("Post.fixClasses: "+e);}};
		
		this.accept=function(mark){try{
			this.flags |= postFlags.ACCEPTED;
			this.flags &= ~(postFlags.FAILED | postFlags.WORKING | postFlags.COLLECT | postFlags.TIMEOUT);
			this.fixClasses();
			if (mark) main.setAsAccepted(null, 3,this);
		}catch(e){log("Post.accept: "+e);}};

		this.fail=function(mark){try{
			this.flags |= postFlags.FAILED;
			this.flags &= ~(postFlags.ACCEPTED | postFlags.WORKING | postFlags.COLLECT | postFlags.TIMEOUT);
			this.fixClasses();
			if (mark) main.setAsFailed(null, -18,this);
		}catch(e){log("Post.fail: "+e);}};

		this.timeout=function(){try{
			this.flags |= postFlags.TIMEOUT;
			this.flags &= ~(postFlags.FAILED | postFlags.WORKING | postFlags.ACCEPTED);
			this.fixClasses();
		}catch(e){log("Post.timeout: "+e);}};
		
		this.remove=function(){try{
			var node=(this.node||$("post_"+this.id));
			if (node) if (node.parentNode||null) remove(node);
			this.node=null;
			delete posts[this.id];
		}catch(e){log("Post.remove: "+e);}};

		this.linkText=function(){try{
			if (this.actions.length >=3) return this.actions.last().name||"";
			else return "";
		}catch(e){log("Post.linkText: "+e);}};

		this.linkHref=function(){try{
			return this.link||((this.actions.length>=3)?(this.actions.last().link||""):"")||"";
		
			if (this.actions.length >=3) return this.actions.last().link||"";
			else return this.link||"";
		}catch(e){log("Post.linkHref: "+e);}};

		this.actionLink=function(action){try{
			for (var a=0,act;(act=this.actions[a]);a++) if (act.name.toLowerCase()==action.toLowerCase()) {return act.link; break;}
		}catch(e){log("Post.actionLink: "+e);}};

		this.body=function(){try{
			return (this.title||"")+" "+(this.caption||"")+" "+(this.description||"");
		}catch(e){log("Post.body: "+e);}};

		this.either=function(){try{
			return this.linkText()+" "+this.body();
		}catch(e){log("Post.either: "+e);}};

		this.date=function(){try{
			return this["created_time"];
		}catch(e){log("Post.date: "+e);}};

		this.isStale=function(timeOverride) {try{
			if (exists(timeOverride)) if(timeOverride==0) return false;
			var now = timeStamp();
			var pubTime = this.date()+"000";
			var aDay = (1000 * 60 * 60 * 24);
			return (now-pubTime)>(timeOverride||aDay);
		}catch(e){log("Post.isStale: "+e);}};

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

		this.reID = function(){try{
			if (this.node||null) {
				//remember its location
				var sibling=this.node.nextSibling; // else its on the bottom of the list
				//drop from display
				remove(this.node);
			}
			//reidentify and redraw
			if (this.identify()) this.draw();
			//if it redraws, its still good
			if (this.node) {
				//move it to where it was before
				if (sibling) sibling.parentNode.insertBefore(this.node,sibling);
				else this.node.parentNode.appendChild(this.node);
			}
		}catch(e){log("Post.reID: "+e);}};

		//return the next visible sibling post
		this.nextSibling = function(){try{
			//determine if there is a filter
			var filter=(quickOpts.filterApp||"All");
			//get visible posts
			var visiblePosts=(filter=="All")?posts:matchByParam(posts,"appID",filter);
			//search for the current post
			var found=false, sibling=null;
			for (var p in visiblePosts) {
				if (found) {sibling=visiblePosts[p]; break}
				else if (visiblePosts[p]==this) found=true;
			}
			//return what is found
			return sibling;
		}catch(e){log("Post.nextSibling: "+e);}};

		//return the previous visible sibling post
		this.previousSibling = function(){try{
			//determine if there is a filter
			var filter=(quickOpts.filterApp||"All");
			//get visible posts
			var visiblePosts=(filter=="All")?posts:matchByParam(posts,"appID",filter);
			//search for the current post
			var sibling=null;
			for (var p in visiblePosts) {
				if (visiblePosts[p]==this) break;
				else sibling=visiblePosts[p];
			}
			//return what is found
			return sibling;
		}catch(e){log("Post.previousSibling: "+e);}};

	}catch(e){log("Post.init: "+e);}};

//***************************************************************************************************************************************
//***** Main Object
//***************************************************************************************************************************************

	var main = {
		paused : false,
		fetchPaused : false,
		requestsOpen : 0,
		reqTO : 30000,

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
			"-3":"Over Limit",
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
		},

		pauseCollecting : function(){
			var isPaused=(main.paused = !main.paused);
			var btn=$("wmpausecollect");
			btn.parentNode.className = (isPaused)?btn.parentNode.className.replaceWord("oddOrange","oddGreen"):btn.parentNode.className.replaceWord("oddGreen","oddOrange");
			btn.childNodes[0].src = (isPaused)?imgs.play:imgs.stop;
			btn.title = (isPaused)?"Collect":"Pause Automatic Collection";
		},

		pauseFetching : function(){
			var isPaused=(main.fetchPaused = !main.fetchPaused);
			var btn=$("wmpausefetch");
			btn.parentNode.className = (isPaused)?btn.parentNode.className.replaceWord("oddOrange","oddGreen"):btn.parentNode.className.replaceWord("oddGreen","oddOrange");
			btn.title = (isPaused)?"Fetch":"Pause Automatic Fetching";
		},
		
		sortPosts : function(params){
			params=params||{}; 
			params.direction=(quickOpts.sortDirection=(params.direction||quickOpts.sortDirection||"desc")); //default descending to keep time ordered posts in order newest to oldest
			params.by=(quickOpts.sortBy=(params.by||quickOpts.sortBy||"created_time")); //default by date
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
			var synApp=(app.parent||app), w=null;

			for (var i=0,test;((test=testList[i]) && (w===null));i++) {

			    //finish constructing dynamic collection tests
			    var ret = test.ret; 
			    if (custom) {
					if (!ret) ret = "dynamic"; //default to dynamic
					if (ret!="dynamic" && ret!="none" && ret!="exclude") ret=synApp.appID+ret; //add appID except to magic words
			    }

			    //part to make dynamic collection tests work only if they are the correct appID
			    //also do not process disabled tests
			    if (!test.disabled && (!custom || (custom && (!test.appID || (app.appID==test.appID))))){

					//if the test is not a dynamic grabber test
					//OR if the test IS a dynamic test and the appID matches
					//OR if the test IS a dynamic test and no appID was supplied
					//then run the test

					//detect test type
					var testType=(test.search||null);
					var types=Grabber.methods;
					if (!testType) for (var tt=0,len=types.length; tt<len; tt++) {if (test[types[tt]]||"") {testType=types[tt];break;}}

					//select the type of data to use
					var src;
					if (isArray(testType)){ //new search array format
						for (var t=0,tlen=testType.length;t<tlen;t++) src+=(testData[testType[t]]||"");
					}
					else src = (testData[testType]||""); //old test method like testType:text

					if (src){
					//begin processing this test

					var subTests=test.subTests, kids=test.kids, allowNone=false, subNumRange=test.subNumRange,text=(test.find||test[testType]||"");

					//process subtests array
					if (subTests && text) {
						for (var i2=0,subTest,found=false;((subTest=subTests[i2]) && (!found));i2++) {
							var testX = text.replace('{%1}',subTest).toLowerCase();

							//do a standard test with the replaced search string
							found=src.find(testX);

							//return a found value, replacing %1 with a lowercase no-space text equal to the subtest string
							w=(found)?ret.replace('{%1}',subTest.noSpaces().toLowerCase()):w;
							
							testX=null;
						}

					//process number array
					} else if (subNumRange && text){
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
					} else if (text && (isArray(text))) {
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

					}//end src exists

					//see if test has type 2 subtests (child node tests based on parent test)
					w = ((kids && w)?main.doWhichTestTree(post, kids, testData, custom):w) || w; //if kids return null, default to key found above

					//if this test tree returned "none", start over with next tree by replacing "none" with null
					//true "none" is handled in the which() function below
					if (w==="none") w=null;


			    }//end custom checker
			}

			return w;
		}catch(e){log("main.doWhichTestTree: "+e);}},

		which : function(post) {try{
			//match post to an app
			var w, app=post.app, synApp=(app.parent||app);
			
			//create various data for the tests to use
			var testData = {
				title: (post.name||"").toLowerCase(),
				msg: (post.message||"").toLowerCase(),
				caption: (post.caption||"").toLowerCase(),
				desc: (post.description||"").toLowerCase(),
				link: post.linkText().toLowerCase(),
				url: Url.decode(post.linkHref()).toLowerCase(),
				img: (post.picture||"").toLowerCase(),
				fromName: post.from.name.toLowerCase(),
				fromID: post.from.id.toLowerCase(),
				targetName: ","+post.getTargets("name").join(",").toLowerCase(),
				targetID: ","+post.getTargets("id").join(",").toLowerCase(),
				canvas: app.namespace.toLowerCase(),
				likeName: ","+post.getLikes("name").join(",").toLowerCase(),
				likeID: ","+post.getLikes("id").join(",").toLowerCase(),
				comments: post.getComments("message").join(" \n").toLowerCase(),
				commentorName: ","+post.getComments("name").join(",").toLowerCase(),
				commentorID: ","+post.getComments("id").join(",").toLowerCase(),
			};
			
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
			w=(w==="none" && opts[synApp.appID+"doUnknown"])?synApp.appID+"doUnknown":w;

			return w;
		}catch(e){log("main.which: "+e);}},

		resetAccepted : function() {
			if(confirm("Really clear all history?")) doAction(function(){
				history={};
				setOpt('history_'+profile,'{}');
			});
		},
		
		onWindowResize : function(){
			w=window.innerWidth;
			if ($('wmCoolItem_feedAll')) $('wmCoolItem_feedAll').parentNode.parentNode.parentNode.style.width=(w-200+"px"); //181 for sidebar, 17 for slider, 2 for borders
		},

		onSave : function() {
			//recopy the settings array from GM_Config
			main.updateSettingsValues();

			//update those settings we use as global variables
			debug.doDebug = opts.debug;
			debug.debugLevel = opts.debugLevel;
			debug.debugMaxComments = opts.debugmaxcomments;

			//hide or show counters
			if (opts.showcounters) main.showCounters(); else main.hideCounters();

			//update intervals
			main.setIntervals();

			//set console heights
			main.resizeConsole();
			
			//set new user colors
			main.setColors();
		},
	
		getSettingsTree : function(i,settings,tempopts) {
			var field = settings[i];			
			var value=GM_config.get(i), kids=field.kids;
			switch(field.type) {
				case "checkbox": 
					tempopts[i] = value; break;
				default: tempopts[i] = value;
			}

			if(kids && typeof kids=="object") for(var kid in kids) { 
				tempopts=main.getSettingsTree(kid,kids,tempopts);
			}

			value=null; kids=null; field=null;
			return tempopts;
		},

		updateSettingsValues : function(){try{
			//log("main.updateSettingsValues()");
			var tempopts={}, settings=GM_config.settings;
			for(var i in settings) tempopts=main.getSettingsTree(i,settings,tempopts);
			opts = tempopts; tempopts=null; settings=null;
		}catch(e){"main.updateSettingsValues: "+e}},

		getAccText: function(appID,w,past){
			var app=apps[appID]; if (app.parent) app=app.parent;
			return (w=="dynamic")?"Dynamic Grab"+((past)?"bed":""):(((w.find("send")?"Sen"+((past)?"t":"d")+" ":w.find("wishlist")?"":"G"+((past?"o":"e"))+"t ") + app.accText[w]) || ((past)?main.accDefaultText:"Get Unknown") || ((w.startsWith(app.appID+"doUnknown"))?"Unknown":"") );
		},

		stopCollectionOf : function(w){
			for (var p in posts) if (posts[p].which==w) posts[p].stopCollect();
		},

		pauseByType : function(w){
			//mark as paused all those posts not yet done
			for (var p in posts) if (posts[p].which==w) posts[p].pause();
			//store the paused type but dont save it
			typesPaused.push(w);
		},

		unPauseByType : function(w){
			//unpause all those posts not yet done
			for (var p in posts) if (posts[p].which==w) posts[p].unPause();
			//remove paused type from list but dont save it
			typesPaused.removeByValue(w);
		},

		setAsAccepted : function(comment,status, post) {try{
			var app=post.app;
			var synApp=app.parent||app;
			post.state="accepted";
			post.status=status;
			post.accept();

			history[post.id]={status:status, date:timeStamp(), which:(post.which||"undefined").removePrefix(app.appID), appID:app.appID};
			setOptJSON('history_'+profile,history);

			var postNode=post.node||$("post_"+post.id);
			if (postNode){
				var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
			
				var text=main.getAccText(synApp.appID,post.which,true);

				link.textContent = (comment || text || main.statusText[status] || main.accDefaultText);
				main.updatePostStatus(post.id);
			}

			app.acceptCount++; app.updateCounters();

			//check if any limit rule affects this bonus type
			for (r in rules) {
				var rule = rules[r];
				if ((rule.appID+rule.bonus) == post.which) {
					if (rule.limit!="-1") {
						//tick this rule up one
						rule.incrementLimitCounter();
						//check the limit value
						if (rule.limitCount>=rule.limit) {
							//limit reached
							switch(rule.onLimit){
								case "0": //destroy rule
									rule.remove();
									break;
	
								case "1": //pause collection of this bonus type
									//select all bonuses of this type prepped to run
									main.pauseByType(post.which);
									break;

								case "2": //uncheck bonus type in options menu
									main.disableOpt(post.which);
									//now mark those that are already set for collection to NOT collect
									main.stopCollectionOf(post.which);
									break;
							}
						}
					}
				}
			}

			//try autolike
			try{
				if (opts.autolikeall || opts.autolikeaccepted || (opts.autolikesent && (post.which||"undefined").startsWith(synApp.appID+"send")) ) {
					if (!opts["nolike"+app.appID]){
						setTimeout(function(){post.like();},100+(opts.autolikedelay*1000));
					}
				}					
			} catch(e){log("setAsAccepted: autolike failed: "+e,{level:3});}
		}catch(e){log("main.setAsAccepted: "+e);}},

		disableOpt : function(w){
			opts[w]=false;
			GM_config.set(w,false);
			GM_config.save();			
		},

		enableOpt : function(w){
			opts[w]=true;
			GM_config.set(w,true);
			GM_config.save();			
		},
		
		resetCounters : function(){try{
			for (var a in apps) apps[a].resetCounter();
		}catch(e){log("main.resetCounters: "+e);}},
		
		setAsFailed : function(comment, status, post){try{
			var app=post.app; 
			var synApp=app.parent||app;
			var postNode=post.node||$("post_"+post.id);

			if (!opts.failontimeout && status==-14) {
				post.state="timeout";
				post.timeout();
					
			} else {
				post.state="failed";
				post.fail();

				history[post.id]={status:status, date:timeStamp(), which:(post.which||"undefined").removePrefix(app.appID), appID:app.appID};
				setOptJSON('history_'+profile,history);
			}
			post.status=status;
			
			if (postNode) {
				var link=selectSingleNode(".//a[contains(@class,'linkText')]",{node:postNode});
				link.textContent = (comment || main.statusText[status] || main.failText);
				main.updatePostStatus(post.id);
			}

			app.failCount++; app.updateCounters();
				
			//try autolike
			try{
				if (opts.autolikeall) {
					if (!opts["nolike"+app.appID]){
						setTimeout(function(){post.like();},100+(opts.autolikedelay*1000));
					}
				}					
			} catch(e){log("setAsFailed: autolike failed: "+e,{level:3});}
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

		onFrameLoad : function(tab,noDebug){try{
			//tab object contains {id,post,url}
			if (!noDebug) log("onFrameLoad()",{level:0});

			var id=tab.id; var post=tab.post||posts[id];
			if (!(post||null)) {
				//resource deleted while post was out
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
			if (!(tab.hwnd)) {main.setAsFailed(null,-17,post); main.clearURL(tab); return;}
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
					});setTimeout(function(){if(req)req.abort(); if(req)req=null;},opts.reqtimeout*1000);

				} else {
					log("onFrameLoad: nopopLink is null and a string was expected",{level:3});
					main.setAsFailed(null, -16,post);
					main.clearURL(tab);
					return;
				}
			} else main.clearURL(tab);

		}catch(e){log("main.onFrameLoad: "+e);}},

		toggle : function(opt){
			if (opts[opt]){
				GM_config.set(opt, false);
				opts[opt] = false;
			} else {
				GM_config.set(opt, true);
				opts[opt] = true;
			}
                	GM_config.save();
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

		saveRules : function(){try{
			setOptJSON("priority_"+profile,rules); //functions are omitted
			setOptJSON("priorityOpts_"+profile,Priority.opts);
		}catch(e){log("main.saveRules: "+e);}},
		
		newRule : function(){try{
			var rule=new Rule();
			rules[rule.id]=rule;
			main.saveRules();
		}catch(e){log("main.newRule: "+e);}},
		
		getBonusDropDownList : function(params){
			params=params||{};
			var selected = params.selected||"";
			var appID = params.appID||null;
			var dropID = params.dropID||false; //force the element value to drop its appID prefix

			var optsret=[], bonuses={};
			if (appID) bonuses = apps[appID].accText;
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

		resetAllLimits : function(){
			for (var r in rules) {
				rules[r].resetLimit();
			}
			main.saveRules();
		},

		reIDAll : function(){
			for (var p in posts) posts[p].identify();
			main.sortPosts();
			main.redrawPosts();
		},

		addToolBox : function(post){
			if (!opts.showtoolbox) return;
			var toolNode = selectSingleNode(".//div[contains(@class,'toolBox')]",{node:$("post_"+post.id)});
			if (toolNode) toolNode.appendChild(
				createElement("div",{},[
					createElement("div",{className:"toolButton oddBlue"+((!opts.showpostsrc)?" hidden":"")},[createElement("a",{title:"Show Post Source",href:post.actionLink("Like"),target:"_blank"},[createElement("img",{src:imgs.newwindow})])]),
					createElement("div",{className:"toolButton oddBlack"+((!opts.showclean)?" hidden":"")},[createElement("a",{title:"Clean",href:jsVoid,onclick:function(){post.remove();}},[createElement("img",{src:imgs.trash})])]),
					createElement("div",{className:"toolButton oddBlack"+((!opts.showpin)?" hidden":"")},[createElement("a",{title:"Pin",href:jsVoid,onclick:function(){post.togglePin();}},[createElement("img",{src:imgs.pin})])]),
					createElement("div",{className:"toolButton oddOrange"+((!opts.showmovebottom)?" hidden":"")},[createElement("a",{title:"Move to Bottom",href:jsVoid,onclick:function(){post.moveToBottom();}},[createElement("img",{src:imgs.movetobottom})])]),
					createElement("div",{className:"toolButton oddGreen"+((!opts.showmovetop)?" hidden":"")},[createElement("a",{title:"Move to Top",href:jsVoid,onclick:function(){post.moveToTop();}},[createElement("img",{src:imgs.movetotop})])]),
					createElement("div",{className:"toolButton oddBlack"+((!opts.showreid)?" hidden":"")},[createElement("a",{title:"ReID Post",href:jsVoid,onclick:function(){post.reID();}},[createElement("img",{src:imgs.reidentify})])]),
					createElement("div",{className:"toolButton oddBlue"+((!opts.showlike)?" hidden":"")},[createElement("a",{title:"Like Post",href:jsVoid,onclick:function(){post.like();}},[createElement("img",{src:imgs.likepost})])]),
					createElement("div",{className:"toolButton oddOrange"+((!opts.showmarkfailed)?" hidden":"")},[createElement("a",{title:"Mark as Failed",href:jsVoid,onclick:function(){post.fail(true);}},[createElement("img",{src:imgs.markasfailed})])]),
					createElement("div",{className:"toolButton oddGreen"+((!opts.showmarkaccepted)?" hidden":"")},[createElement("a",{title:"Mark as Accepted",href:jsVoid,onclick:function(){post.accept(true);}},[createElement("img",{src:imgs.markasaccepted})])]),
					createElement("div",{className:"toolButton oddBlue"+((!opts.showopen)?" hidden":"")},[createElement("a",{title:"Open Post",href:jsVoid,onclick:function(){post.forceOpen();}},[createElement("img",{src:imgs.do})])]),
				])
			);
		},

		updatePostStatus : function(id){
			var status = posts[id].status;
			var statusNode = selectSingleNode(".//*[contains(@class,'status')]",{node:$("post_"+id)});
			if (statusNode) statusNode.textContent="Status: "+(status||"0") + " " + (main.statusText[status||"0"]);
			status=null; statusNode=null;
		},

		onLikePost : function(tab){
			try{
				var like=tab.hwnd.location.hash.removePrefix("#").getUrlParam("status")=="1";
				if (like) {
					Collector.close(tab);
					return;
				}
			} catch (e){
				//log(""+e);
			}

			tab.tries=(tab.tries||0)+1;
			if (tab.tries<opts.autoliketimeout) setTimeout(function(){main.onLikePost(tab);}, 1000);
			else {
				log("onLikePost: unable to finish auto-like",{level:3});
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
		
		setDisplay : function(){
			var x=this.getAttribute("name");
			quickOpts.displayMode=x;
			main.saveQuickOpts();
			main.redrawPosts();
		},

		redrawPosts : function(){
			status.print("Redrawing Posts");
			//clear the feed
			wmConsole.feedNode.innerHTML="";
			wmConsole.feedNode.className=(quickOpts.displayMode=="1" || quickOpts.displayMode=="3")?"short":"";
			for (var p in posts) posts[p].draw(true);
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

		processPosts : function(){
			//dont run if menu is open or if requests are still out or if the console is paused
			if($("GM_config") || (main.requestsOpen >= opts.maxrequests) || main.paused) return;

			var postNode=selectSingleNode(".//div[starts-with(@id,'post_') and contains(@class,'collect') and not(contains(@class,'paused'))]",{node:wmConsole.feedNode});
			if (postNode) {
				var post = posts[postNode.id.replace('post_','')];
				if (post) post.open();
			}
		},

		olderPosts : function () {
			main.fetch({next:true});
		},

		newerPosts : function () {
			main.fetch({prev:true});
		},

		cleanPosts : function () {try{
			for (var p in posts) {
				var post = posts[p];
				if (!(
					(post.flags & (postFlags.PINNED | postFlags.COLLECT | postFlags.WORKING)) ||
					((post.flags & postFlags.TIMEOUT) && !opts.cleanTimedOut)
				)) post.remove();
			}
		}catch(e){log("main.cleanPosts(): "+e);}},

		calcTime : function (timer) {
			var t=2;
			switch(GM_config.get(timer+"interval")) {
				case "tenth": t = 0.1; break; // 6 seconds
				case "sixth": t = 0.1666667; break; // 10 seconds
				case "third": t = 0.3333333; break; // 20 seconds
				case "half": t = 0.5; break; // 30 seconds
				case "one": t = 1; break; // 1 minute
				case "two": t = 2; break; // 2 minutes
				case "three": t = 3; break; // 3 minutes
				case "four": t = 4; break; // 4 minutes
				case "five": t = 5; break; // 5 minutes
				case "ten": t = 10; break; // 10 minutes
				case "fifteen": t = 15; break; // 15 minutes
				case "thirty": t = 30; break; // 30 minutes
				case "hour": t = 60; break; // 1 hour
				case "2hour": t = 60*2; break; // 2 hours
				case "3hour": t = 60*3; break; // 3 hours
				case "4hour": t = 60*4; break; // 4 hours
				case "8hour": t = 60*8; break; // 8 hours
				case "12hour": t = 60*12; break; // 12 hours
				case "18hour": t = 60*18; break; // 18 hours
				case "24hour": t = 60*24; break; // 1 day
				case "36hour": t = 60*36; break; // 1.5 days
				case "48hour": t = 60*48; break; // 2 days
				case "30s2m": t = (Math.random() * 1.5) + 0.5; break; // random between 30s and 2m
				case "2m5m": t = (Math.random() * 3) + 2; break; // random between 2m and 5m
				case "5m10m": t = (Math.random() * 5) + 5; break; // random between 5m and 10m
			}
			return Math.round((t*60000)+(Math.random()*(t*100)));
		},

		dynamicTestAllowUpdate : true,
		dynamicTestUpdate : function(){
			//if (!main.dynamicTestAllowUpdate) return;
			var tabs=$("wmTabPage_wmDynamicData").parentNode;
			var id=selectSingleNode(".//input[@name='id']",{node:tabs}).value;
			var retList=selectSingleNode(".//select[contains(@class,'retList')]",{node:tabs});
			var name=this.name;
			var test=Grabber.getTest(id);

			switch(name){
				case "label":case "appID":case "ret": case "action":
					test[name]=this.value;
					if (name=="appID") {
						//update the bonus list
						retList.innerHTML="";
						appendChildren(retList,main.getBonusDropDownList({appID:test.appID,selected:test.ret,dropID:true}));
					}
					else if (name=="label") {
						//update the treeview branch title
						var branch=selectSingleNode(".//div[@id='"+test.id+"']/div[contains(@class,'title')]",{node:$("wmDynamicTree")});
						if (branch) branch.textContent=test.label;
					}
					break;
				case "regex":
					test.regex = this.checked;
					if (test.regex) {
						test.find = this.previousSibling.previousSibling.value.split(/\r?\n|\r/g)[0];
						delete test.subNumRange; delete test.subTests;
					}
					else test.find = this.previousSibling.previousSibling.value.split(/\r?\n|\r/g);
					break;
				case "find": case "search":
					test[name]=this.value.split(/\r?\n|\r/g);
					if ((name=="find") && (test.regex || test.subTests || test.subNumRange)) test.find=test.find[0]; //if regex is used then only take the first entry
					break;
				case "sub":
					if (this.nextSibling.nextSibling.checked) {test.subNumRange=this.value; delete test.subTests;}
					else {
						test.subTests=this.value.split(/\r?\n|\r/g);
						delete test.subNumRange;
						//can only use first text entry
						if (isArray(test.find)) test.find=test.find[0];
					}
					break;
				case "searchDD":
					this.previousSibling.value+=("\n"+this.value);
					break;
				case "retDD":
					this.previousSibling.value=this.value;
					test.ret=this.value;
					break;
				case "note":
					test[name]=this.value;
					break;
				case "disabled":
					test[name]=this.checked;
					break;
				case "numRange":
					var subTest=this.previousSibling.previousSibling;
					if (this.checked) { test.subNumRange=subTest.value; delete test.subTests; }
					else { test.subTests=this.value.split(/\r?\n|\r/g); delete test.subNumRange; }
					break;
				default:
					test[name]=this.value;
					break;
			}

			//validate and show warnings

			Grabber.save();
		},

		validateDynamics : function(test){
			Grabber.save();
		},

		showDynamicBranch : function(treeNode){try{
			//prevent loading of data to register as an edit
			main.dynamicTestAllowUpdate=false;

			var test=treeNode.data;
			var id=test.id;

			//draw the data
			var appID,search,find,retID,note,regex,subTest,numRange,title,retList,action;
			wmConsole.dynamicViewer.innerHTML=""; //clear it out
			wmConsole.dynamicViewer.appendChild(
				forms.createTabs({height:"400", subType:"fat", tabs:[
					{id:"wmDynamicData",caption:"Data",selected:true,kids:[
						createElement("div",{className:"toolBox medium inline"},[
							createElement("div",{},[
								createElement("div",{className:"toolButton oddGreen"},[createElement("a",{title:"New Test",href:jsVoid,onclick:function(){treeNode.addChild();},name:"new"},[createElement("img",{src:imgs.plus})])]),
								createElement("div",{className:"toolButton oddOrange"},[createElement("a",{title:"Delete Test",href:jsVoid,onclick:function(){treeNode.remove(); $("wmDynamicViewer").innerHTML="";},name:"delete"},[createElement("img",{src:imgs.trash})])]),
								createElement("div",{className:"toolButton oddBlue"},[createElement("a",{title:"Move Up",href:jsVoid,onclick:function(){treeNode.moveUp();},name:"moveup"},[createElement("img",{src:imgs.arrowup})])]),
								createElement("div",{className:"toolButton oddBlue"},[createElement("a",{title:"Move Down",href:jsVoid,onclick:function(){treeNode.moveDown();},name:"movedown"},[createElement("img",{src:imgs.arrowdown})])]),
								createElement("div",{className:"toolButton oddBlue"},[createElement("a",{title:"Move Up One Level",href:jsVoid,onclick:function(){treeNode.moveUpLevel();},name:"uplevel"},[createElement("img",{src:imgs.uplevel})])]),
								createElement("div",{className:"toolButton oddBlue"},[createElement("a",{title:"Move To Top Level",href:jsVoid,onclick:function(){treeNode.moveToTop();},name:"uptop"},[createElement("img",{src:imgs.movetotop})])]),
							])
						]),

						testID=createElement("input",{name:"id",type:"hidden",className:"id",title:"This test's internal id."}),

						createElement("label",{textContent:"Title:"}),
						title=createElement("input",{name:"label",type:"text",className:"label",title:"Give your test an identifying title.",onchange:main.dynamicTestUpdate}),
						createElement("br"),

						createElement("label",{textContent:"appID:"}),
						appID=createElement("select",{name:"appID",className:"appID",title:"What game are you testing against?",onchange:main.dynamicTestUpdate},main.getAppDropDownList(test.appID)),

						createElement("label",{textContent:"Disable:"}),
						disable=createElement("input",{name:"disabled",type:"checkbox",className:"checkbox",title:"Disable this test and its kids.",onchange:main.dynamicTestUpdate}),
						createElement("br"),

						function(){
							try{
								return 	forms.createSelectionList({
									id:"wmDynamicSelectSearch",
									subType:"fat",
									onChange:function(list){test.search=list.toArray(); main.validateDynamics(test);},
									allowSelect:true,
									allowMove:true,
									title:"Search",
									name:"search",
									data:Grabber.methods,
									selected:(isArray(test.search))?test.search:((test.search)?[].push(test.search):[]),
									moveUpImage:imgs.arrowup,
									moveDownImage:imgs.arrowdown,
									moveTopImage:imgs.movetotop,
									moveBottomImage:imgs.movetobottom,
									width:"75%",
								});
							}catch(e){log("showDynamicBranch()[search]:"+e); return null;}
						}(),
						createElement("br"),

						createElement("input",{type:"button", name:"mode", value:"Standard", className:"mode", value:"Standard", disabled:(!test.regex && !test.subTests && !test.subNumRange), onclick: function(){
							if (this.disabled) return;
							delete test.regex;
							delete test.subNumRange;
							delete test.subTests;
							if (!isArray(test.find)) test.find=[].push(test.find);
							main.showDynamicBranch(treeNode);
						} }),
						createElement("input",{type:"button", name:"mode", className:"mode", value:"Sub Tests", disabled:(test.subTests), onclick:function(){
							if (this.disabled) return;
							delete test.regex;
							delete test.subNumRange;
							if (isArray(test.find)) test.find=test.find[0];
							test.subTests=test.subTests||[];
							main.showDynamicBranch(treeNode);
						}}),
						createElement("input",{type:"button", name:"mode", className:"mode", value:"Sub Number Range", disabled:(test.subNumRange), onclick:function(){
							if (this.disabled) return;
							delete test.regex;
							delete test.subTests;
							if (isArray(test.find)) test.find=test.find[0];
							test.subNumRange=test.subNumRange||"0,0";
							main.showDynamicBranch(treeNode);
						}}),
						createElement("input",{type:"button", name:"mode", className:"mode", value:"RegExp", disabled:(test.regex), onclick:function(){
							if (this.disabled) return;
							delete test.subTests;
							delete test.subNumRange;
							if (isArray(test.find)) test.find=test.find[0];
							test.regex=true;
							main.showDynamicBranch(treeNode);
						}}),

						//draw the finding methods
						function(){
							try{
								if (!test.regex && !test.subTests && !test.subNumRange){
									return createElement("div",{id:"wmDynamicMode"},[
										forms.createSelectionList({
											id:"wmDynamicSelectFind",
											subType:"fat",
											onChange:function(list){test.find=list.toArray(true); main.validateDynamics(test);},
											allowMove:true,
											allowAdd:true,
											allowRemove:true,
											requireUnique:true,
											title:"Find",
											name:"findMulti",
											data:(isArray(test.find))?test.find:((test.find)?[].push(test.find):[]),
											moveUpImage:imgs.arrowup,
											moveDownImage:imgs.arrowdown,
											moveTopImage:imgs.movetotop,
											moveBottomImage:imgs.movetobottom,
											removeImage:imgs.x,
											addImage:imgs.plus,
											width:"75%",
										})
									])
								} else {
									return createElement("div",{id:"wmDynamicMode"},[
										(opts.showdynamictips)?createElement("p",{textContent:"Enter a find string below. If you are using the RegExp mode, your find string will be converted to a registered expression, and the return value will be equal to what is found, or you can override it with a return value below. If you are instead using SubTests or a Number Range, include a {%1} in your string as an insertion point for the range of data."}):null,
										createElement("label",{textContent:"Find:"}),
										createElement("input",{type:"test",name:"find",value:((isArray(test.find))?test.find[0]:test.find),onchange:function(){
											test.find=this.value; 
											main.validateDynamics(test);
										} }),
										(test.subTests)?(
											forms.createSelectionList({
												id:"wmDynamicSelectSubtests",
												subType:"fat",
												onChange:function(list){test.subTests=list.toArray(true); main.validateDynamics(test);},
												allowMove:true,
												allowAdd:true,
												allowRemove:true,
												requireUnique:true,
												title:"SubTests",
												name:"subTests",
												data:(isArray(test.subTests))?test.subTests:((test.subTests)?[].push(test.subTests):[]),
												moveUpImage:imgs.arrowup,
												moveDownImage:imgs.arrowdown,
												moveTopImage:imgs.movetotop,
												moveBottomImage:imgs.movetobottom,
												removeImage:imgs.x,
												addImage:imgs.plus,
												width:"75%",
											})
										):null,
										(test.subNumRange)?(
											createElement("div",{},[
												(opts.showdynamictips)?createElement("p",{textContent:"Enter a number range below, which will be mechanically entered into your find string."}):null,
												createElement("label",{textContent:"Number Range (start, end):"}),
												createElement("input",{type:"text",value:(test.subNumRange.split(",")[0]||"0"), onchange:function(){
													var start = parseInt(this.value) || "0";
													var end = parseInt(this.nextSibling.value) || "0";
													test.subNumRange=start+","+end;
													main.validateDynamics(test);
												} }),
												createElement("input",{type:"text",value:(test.subNumRange.split(",")[1]||"0"), onchange:function(){
													var start = parseInt(this.previousSibling.value) || "0";
													var end = parseInt(this.value) || "0";
													test.subNumRange=start+","+end;
													main.validateDynamics(test);
												} }),
											])
										):null,
									])
								}
							}catch(e){log("showDynamicBranch()[find modes]:"+e); return null;}
						}(),

						createElement("br"),
						(opts.showdynamictips)?createElement("p",{textContent:"Select a predefined identification from the dropdown. You may leave this field blank to use the default identifier 'dynamic'."}):null,
						//createElement("br"),
						createElement("label",{textContent:"Return ID:"}),
						retID=createElement("input",{name:"ret",type:"text",className:"ret",title:"Give your test a return value.",onchange:main.dynamicTestUpdate}),
						createElement("select",{name:"retDD",className:"retList",title:"Select a predefined return value from the list.",onchange:main.dynamicTestUpdate},main.getBonusDropDownList({appID:test.appID,dropID:true,selected:test.ret})),
						createElement("br"),

						/*
						(opts.showdynamictips)?createElement("p",{textContent:"This new feature allows you to make dynamically identified posts behave differently."}):null,
						//createElement("br"),
						createElement("label",{textContent:"Action:"}),
						action=createElement("select",{name:"action",className:"action",title:"Select an action from the list.",onchange:main.dynamicTestUpdate},optionsFromArray(["normal","open","hide","fail","accept","pin"],test.action||"normal")),
						createElement("br"),
						*/

					]},
					{id:"wmDynamicNote",caption:"Notes",kids:[
						createElement("label",{textContent:"Note:"}),
						createElement("br"),
						note=createElement("textArea",{name:"note",className:"note",title:"Attach a note to your test.",onchange:main.dynamicTestUpdate}),
					]},
					{id:"wmDynamicOther",caption:"Other",kids:[
						(opts.showdynamictips)?createElement("p",{textContent:"This panel contains other parameters found on the test entry. Many of these parameters are probably vestigial parameters replaced by more currently supported parameters found on the data panel. You may continue using these parameters or delete them and start using the newer parameters."}):null,
					]},
				]})
			);


			//fill in the standard data
			testID.value=test.id;
			title.value = test.label || "<no title>";
			appID.value = test.appID || "";
			//search.value = (isArray(test.search))?test.search.join("\n"):test.search;
			//find.value = (isArray(test.find))?test.find.join("\n"):test.find;
			//regex.checked = test.regex;
			//subTest.value = ((test.subTests)?test.subTests.join("\n"):null) || test.subNumRange || ""; //remembering that subTests is an array
			//numRange.checked = test.subNumRange;
			retID.value = test.ret || "";
			note.value = test.note || "";

			//draw anything not matching the above parameters to the "Other" tab
			var standard=["label","appID","search","find","regex","subTest","subNumRange","ret","note","kids","id","do"];
			for (p in test){
				if (!(standard.inArray(p))) {
					$("wmTabPage_wmDynamicOther").appendChild(
						createElement("div",{},[
							createElement("label",{textContent:p+":"}),
							createElement("input",{name:p,type:"text",className:"other", value:test[p],onchange:main.dynamicTestUpdate}),
						])
					);
				}				
			}
			//let edits take place again
			main.dynamicTestAllowUpdate=true;

		}catch(e){log("main.showDynamicBranch: "+e);}},
		
		setIntervals : function() {try{
			//setup the timer to get new posts
			if (procIntv) window.clearInterval(procIntv);
			procIntv=window.setInterval(main.processPosts, 2000);

			//setup the timer to get new posts
			if (newIntv) window.clearInterval(newIntv);
			if(opts.newinterval != "off") newIntv=window.setInterval(main.newerPosts, main.calcTime("new"));

			//setup the timer to get new posts
			if (oldIntv) window.clearInterval(oldIntv);
			if(opts.oldinterval != "off") oldIntv=window.setInterval(main.olderPosts, main.calcTime("old")+2000);
			if(opts.maxinterval == "off") olderLimit=0; else olderLimit=(main.calcTime("max")||olderLimit);

			//setup the timer to clean up old posts from the feed
			if (cleanIntv) window.clearInterval(cleanIntv);
			if(opts.cleaninterval != "off") cleanIntv=window.setInterval(main.cleanPosts, main.calcTime("clean")+250);			
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
			if (hasID) post.draw();
		}catch(e){log("main.validatePost: "+e);}},

		fetch : function(params) {try{
			if (main.fetchPaused && !params.bypassPause) return;
			params=params||{};

			//for each feed source
			for (var f in feeds) { var feed=feeds[f]; if (feed.enabled) {

				//for each app under that feed source, as long as its not a neighbor wall

				if (feed.url.contains("/me/home")) for (var a in apps) {
					//dont request posts for a game who's masterswitch is off
					if (quickOpts.masterSwitch[a]){
						var app=apps[a];
						Graph.fetchPosts({
							callback:main.validatePost,
							next:(params.next||null),
							prev:(params.prev||null),
							limit:olderLimit,
							fetchQty:(opts.fetchQty||25),
							feed:feed,
							appName:app.name,
							filter:"app_"+a //run once for each app filter
						});
					}
				
				/* the option to NOT use app filters is no longer available
				} else if (feed.url.contains("/me/home")){
					Graph.fetchPosts({
						callback:main.validatePost,
						next:(params.next||null),
						prev:(params.prev||null),
						limit:olderLimit,
						fetchQty:(opts.fetchQty||25),
						feed:feed,
						filter:"cg" //default to only games feed
					});
				*/
				} else {
					Graph.fetchPosts({
						callback:main.validatePost,
						next:(params.next||null),
						prev:(params.prev||null),
						limit:olderLimit,
						fetchQty:(opts.fetchQty||25),
						appName:"feed:"+feed,
						feed:feed,
						//filter:null //cannot be used with profile walls
					});
				}
			}}
		}catch(e){log("main.fetch: "+e);}},

		firstFetch : function(){try{
			main.fetch();
			if (opts.showcounters) main.showCounters(); else main.hideCounters();
			main.setIntervals();
			if (opts.autopausecollect) main.pauseCollecting();
			if (opts.autopausefetch) main.pauseFetching();
		}catch(e){log("main.firstFetch: "+e);}},

		afterSidekicksDock : function(){try{
			//set up the priorities and limits object
			Priority.init();

			//decipher the dynamic tests
			Grabber.init();

			//draw the dynamic grabber console's tree base
			var visTreeView = createElement("div",{className:"forms wrapper fat"});
			wmConsole.dynamicTree.appendChild(visTreeView); //it must be bound to the document first

			//create the behind the scenes tree structure and start jamming branches on
			Grabber.treeview = new forms.TREEVIEW({
				data:Grabber.tests, 
				onSelect:main.showDynamicBranch, 
				node:visTreeView,
				collapsedImage:imgs.down,
				expandedImage:imgs.up,
				onNodeAdded:Grabber.save,
				onNodeRemoved:Grabber.save,
				onNodeMoved:Grabber.save,
			});

			//start fetching posts
			main.firstFetch();
		}catch(e){log("main.afterSidekicksDock: "+e);}},

		compileFeedSources : function(){try{
			var feedsInput = wmConsole.feedSourceNode.value
			setOpt('feeds_'+profile,wmConsole.feedSourceNode.value);

			//add feeds entries to graph list
			var newFeeds = {me:feeds.me, wall:feeds.wall}; //always put our own feed in there first

			//for each new feed, check if that feed already exists in the list so we can preserve next/prev location
			for (var f=0,feedsToAdd=feedsInput.split("\n"),toAdd; (toAdd=feedsToAdd[f]); f++) if (toAdd.trim()!="") {
				var feed = "https://graph.facebook.com/"+toAdd+"/feed", found=false;
				//check current feeds to see if it exists
				if (feeds[toAdd]||null){
					//found, copy the old version to preserve next/prev location
					newFeeds[toAdd]=feeds[toAdd]; found=true;
				}
				//if not found, add it new
				if (!found) newFeeds[toAdd]={url:feed, next:"",prev:"",enabled:true,filters:{} };
			}
			
			//overwrite the old feeds list
			feeds=newFeeds;
		}catch(e){log("main.compileFeedSources: "+e);}},

		resizeConsole : function(){try{
			var ht=opts.windowstdheight;

			$("wmPageContainer").style.height=ht+"px";

			$("wmCoolPage_feedAll").style.height=ht-81-36+"px"; //coolbar is 81px with slider, toolbar is 34 + border 1

			$("wmSidekickList").style.height=ht-40+"px"; //header is 30px + padding 5

			$("wmPriorityBuilder").style.height=ht-40+"px"; //header is 30px + padding 5

			$("wmDynamicTree").style.height=ht-30+"px"; //header is 30px
			$("wmDynamicViewer").style.height=ht-30+"px"; //header is 30px

			//wmConsole.dynamicNode.style.height=ht+"px";
			//wmConsole.feedSourceNode.style.height=ht+"px";
		}catch(e){log("main.resizeConsole: "+e);}},

		setColors : function(){try{
			var colors=["pinned","excluded","paused","scam","nodef","timeout","working","failed","accepted"];
			var css="";
			for (var c=0, color; (color=colors[c]); c++) {
				css+=("div."+color+"{background-color:"+opts["colors"+color]+" !important;}\n");
			}
			remove($("user_colors_css"));
			addGlobalStyle(css,"user_colors_css");
		}catch(e){log("main.setColors: "+e);}},
		
		initConsole : function(){try{
			wmConsole.loading=false;
			if (wmConsole.initialized) log("WM Console Initialized");

			//add an entrypoint for sidekicks since we know FB gave us access
			document.body.appendChild(createElement('div',{id:'wmDock',style:'display:none;',onclick:Dock.answerDockingDoor}));

			//add the options opener now that options exist
			$("wmLeftCol").appendChild(
				createElement("span",{className:"whiteover consoleButton left",id:"wmOptions",textContent:"WM Options",onclick:GM_config.open},[
					createElement("span",{className:"toolTip",innerHTML:"Click to view options menu"})
				])
			);

			//set console heights
			main.resizeConsole();

			//compile the feed sources before first run
			main.compileFeedSources();

			//wait some time before fetching posts to make sure all sidekicks are docked
			setTimeout(main.afterSidekicksDock,(opts.waitDocking*1000));

			//jam the status object inside the "mainContainer"
			$('wmContent').insertBefore(status.windowNode,$('wmLeftCol'));
			
			//initialize user colors
			main.setColors();
		}catch(e){log("main.initConsole: "+e);}},

		cleanHistory : function(){try{
			//history = getOptJSON("history_"+profile)||{};
			var ageDays=parseInt(opts.itemage);
			var timeNow=timeStamp();
			for(var i in history) {
				if( ( (timeNow-history[i].date) /day) > ageDays) {
					delete history[i];
				}
			}
			setOptJSON("history_"+profile, history);
		}catch(e){log("main.cleanHistory: "+e);}},

		optionsSetup : function(){try{
	
			GM_config.storage="settings_"+profile;
			GM_config.init("<img class='logo' src='"+imgs.logo+"'> v"+version, {
				import:button("Import Settings",GM_config.importSettings),
				export:button("Export Settings",GM_config.exportSettings),

				section_main:section("Wall Manager Info",{
					MainMessageCenter:separator("Documentation - Messages - Help",null,{
						Mainupdate:anchor("Update Script","http://userscripts.org/scripts/source/86674.user.js"),
						donateWM:{type:"link",label:"Donate for FBWM via Paypal",href:"https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=merricksdad%40gmail%2ecom&lc=US&item_name=Charlie%20Ewing&item_number=FBWM&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"},
						Mainwikipage:anchor("Wiki Support Page","http://fbwm.wikia.com/wiki/Known_Issues"),
						Mainsetupinfo:anchor("Setup Info","http://fbwm.wikia.com/wiki/New_User_Setup"),
						Maindiscuss:anchor("Known Bugs","http://fbwm.wikia.com/wiki/Known_Issues"),
						Mainrevisionlog:anchor("Revision Log","http://fbwm.wikia.com/wiki/Revisions"),
					},true),
				}),

				section_dev:section("Dev/Debug Options",{
					styling:optionBlock("Styling",{
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
								"1":"Function subsections & messages",
								"2":"Captured expected errors",
								"3":"Known unfixed errors",
								"4":"Unexpected errors",
								"5":"Fatal errors",
							},
							"default":"0"
						},
						debugmaxcomments:inputBox("Max debug lines (0 for no limit)",100),
						
					},true),
					advDebugOpts:optionBlock("Advanced Debug",{
						devDebugFunctionSubsections:checkBox("Debug Function Subsections",false),
						devDebugGraphData:checkBox("Debug Graph Packets (not available for Chrome)",false),
					},true),
					
				}),

				section_history:section("History Options",{
					itemage:inputBox("How long to keep tried items in memory (days)",2),			
					reset:button("Clear History",main.resetAccepted),	
				}),

				section_access:section("Accessibility Options",{		
					shortmodeopts:optionBlock("Short Mode",{
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
					},true),
	
					styling:optionBlock("Styling",{
						debugrecog:checkBox("Show Identified Text (instead of original link text)",true),
						showcounters:checkBox("Show Accept/Fail Counts",true),
						windowstdheight:inputBox("Adjust Console Height (px)",500),
						showdynamictips:checkBox("Show Dynamic Console Tips",true),
					},true),

					toolboxopts:optionBlock("Customize Post Toolbox",{
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
					},true),

				}),

				section_colors:section("Display Colors (as words or #values)",{
					colorsaccepted:inputBox("Accepted","limegreen"),
					colorsfailed:inputBox("Failed","red"),
					colorsworking:inputBox("Working","yellow"),
					colorsexcluded:inputBox("Excluded","gray"),
					colorspaused:inputBox("Paused","silver"),
					colorsnodef:inputBox("No Definition","deepskyblue"),
					colorsscam:inputBox("Potential Scam","purple"),
					colorspinned:inputBox("Pinned","black"),
					colorstimeout:inputBox("Timeout","orange"),
				}),
				
				section_filters:section("Feed Filter Options",{
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

					rules:optionBlock("Styling Rules",{
						accepton15:checkBox("Mark 'Unrecognized Response' As Accepted"),
						markliked:checkBox("Mark Liked As Accepted (must check Skip Liked)"),
					},true),

					cleanupblock:optionBlock("Cleanup",{
						cleaninterval:{
							label:"Cleanup Interval",
							type:"select",
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

				section_basicopts:section("Basic Tech Options",{						
					intervals:optionBlock("Post Fetching",{
						newinterval:{
							label:"Get Newer Posts Interval",
							type:"select",
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
							"default":"half"
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
							},
							"default":"25"
						},

						oldinterval:{
							label:"Get Older Posts Interval",
							type:"select",
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
							label:"How old is too old? (hours)",
							type:"select",
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
							"default":"24hour"
						},

					},true),

					restrictors:optionBlock("Fetching/Collecting Autopause",{
						autopausefetch:checkBox("Pause Fetching after First Fetch"),
						autopausecollect:checkBox("Pause Collection on Startup"),
					},true),

					autoLikeBlock:optionBlock("Auto-Like (overrides max requests)",{
						autolikeall:checkBox("All Posts"),
						autolikeaccepted:checkBox("Accepted Posts"),
						autolikesent:checkBox("Sent Posts"),
						autoliketimeout:inputBox("Auto-Like Timeout (seconds)",30),
						autolikedelay:inputBox("Auto-Like Ban-Prevention Delay (seconds)",3),
					},true),
	
					blockautolikebygame:optionBlock("Block Auto-like by Game",{},false),

					docking:optionBlock("Sidekick Docking",{
						waitDocking:inputBox("Sidekick Docking Wait (seconds)",3),
					},true),

					multitask:optionBlock("Multi-task",{
						maxrequests:inputBox("Max requests simultaneously",1),
						recycletabs:inputBox("Recycle Windows/Tabs",1),
						recycletabsall:checkBox("Recycle All",true),
					},true),

					queueing:optionBlock("Task-Queue",{
						queuetabs:checkBox("Force all posts and autolikes through one tab using a queue (overrides multi-task)",true),
					},true),	

					timeouts:optionBlock("Time-outs",{
						reqtimeout:inputBox("Item Acceptance Page Timeout (seconds)",30),
						failontimeout:checkBox("Mark Timeout as Failure (default: retry indefinitely)"),
					},true),

				}),

				section_dynamicopts:section("Dynamic Grabber Options",{						
					dynamicopts:optionBlock("Dynamic Collection",{		
						dynamicFirst:checkBox("Run Dynamics BEFORE Sidekicks",true),
					},true),
					enableDynamic:optionBlock("Enable Dynamics by Game",{}),
				}),
			},
			"", //forms.css // Custom styling for the options interface 
			{"save":main.onSave});

			// add options shortcut to user script commands
			GM_registerMenuCommand("Wall Manager "+version+" Options", GM_config.open);
		}catch(e){log("main.optionsSetup: "+e);}},

		init : function(){try{
			//capture user id/alias/name and make it global
			userID = Graph.userID;
			userAlias = Graph.userAlias;
			profile = userAlias||userID;
			
			//create the options menu
			main.optionsSetup();

			//duplicate the options saved in gm_config
			main.updateSettingsValues();

			//setup debug beyond its defaults
			debug.doDebug = opts.debug;
			debug.debugLevel = opts.debugLevel;
			debug.debugMaxComments = opts.debugmaxcomments;

			// clean history
			history = getOptJSON('history_'+profile)||{};
			main.cleanHistory();

			//get quickopts
			quickOpts = getOptJSON('quickopts_'+profile)||{};
			quickOpts["filterApp"]=(quickOpts["filterApp"]||"All");
			quickOpts["displayMode"]=(quickOpts["displayMode"]||"0");
			quickOpts["masterSwitch"]=(quickOpts["masterSwitch"]||{});

			//prep the console now that we have an id and/or alias
			wmConsole.init({callback:main.initConsole});
		}catch(e){log("main.init: "+e);}},

		run : function() {try{
			// pre-load console images
			for(var img in imgs) try{new Image().src = imgs[img];}catch(e){log("preload: "+e);}

			Graph.fetchUser({callback:main.init});
		}catch(e){log("main.run: "+e);}}
	}; //end of main

	//*****short text versions for GM_config menu options*****

	var checkBox=function(l,d,c,n){return ({type:"checkbox",label:l,"default":d||false,kids:c,newitem:n});}
	
	var hidden=function(l,d,c){return ({type:"hidden",label:l,"default":d,kids:c});}

	var optionBlock=function(l,c,hideSelectAll,n){hideSelectAll=hideSelectAll||false;return ({type:"optionblock",label:l,kids:c,hideSelectAll:hideSelectAll,newitem:n});}

	var separator=function(l,s,c,hideSelectAll){hideSelectAll=hideSelectAll||false; return ({type:"separator",label:l,section:s,kids:c}); }
	
	var section=function(l,c){return ({type:"section",label:l,kids:c});}

	var inputBox=function(l,d,n){return ({type:"float",label:l,"default":(d||0),newitem:n});}
	
	var button=function(l,s){return ({type:"button",label:l,script:s});}

	var anchor=function(l,u,t){return ({type:"link",label:l,href:u,title:(t||'')});}


//***************************************************************************************************************************************
//***** Immediate
//***************************************************************************************************************************************

	status.print("Starting Script");
	log("Script: main initialized",{level:0});
	
	// section for reclaiming memory and stopping memory leaks
	var newIntv=null; //refresh interval
	var oldIntv=null; //refresh interval
	var procIntv=null; //process interval
	var cleanIntv=null; //post removal interval
	var olderLimit=day; //default 1 day

	var cleanup=function() {try{
		//destroy intervals
		if (newIntv) window.clearInterval(newIntv);
		if (oldIntv) window.clearInterval(oldIntv);
		if (procIntv) window.clearInterval(procIntv);
		if (cleanIntv) window.clearInterval(cleanIntv);
		oldIntv = newIntv = procIntv = cleanIntv = null;

		//close the sidekick tabs
		Collector.closeAll();

		//remove this event listener
		window.removeEventListener("beforeunload", cleanup, false);
		window.removeEventListener("resize", main.onWindowResize, false);

		//clean up memory
		main=null; wmConsole=null; Dock=null; Graph=null; Collector=null;
		olderLimit=null; 
		checkBox=null; hidden=null; optionBlock=null; separator=null; section=null; inputBox=null; button=null; anchor=null;		
		history = feeds = rules = groups = apps = posts = null;	
	}catch(e){log("cleanup: "+e);}}
	window.addEventListener("beforeunload", cleanup, false);
	window.addEventListener("resize", main.onWindowResize, false);

	//start it up
	main.run();


})(); // anonymous function wrapper end

/* to do

-dynamics
--add button to define a dynamic test to the post toolbar
--allow editing of dynamics in text mode for advanced users
--show custom dynamic return values in the dropdown

-priorities
--add button to define a priority to the post toolbar
--allow priorities to use wildcards

-console
--allow the user to choose the data shown per post via a dropdown with checkboxes
--stop drawing all the content for hover boxes ahead of time. They should be created on the fly when needed only
--rebuild the options menu into some tabs
--fix it so an initial tab is open
--give tabs a set height and y scolling
--section headers are automatically closed by default, not open

-data
--dynamics: id:{} not {id:}
--dynamics: show dynamic options in options menu
--history: ability to clear by appID or which
--settings: much better tree structure, not just values
--settings: never delete values or structure just because a sidekick didn't dock
--settings: store settings separately by appID?

-forms
--treeview: refine, add root and branch images as well as show roots and branches options

-group by [appid, author, priority, day, hour]
--expand/collapse groups

-dev tools
--ability to dump a post's data

-fixes and requests
--problem splitting request urls if first fetch didn't return yet
--re-id all after priority/dynamic menu change (as option)


-recent fixes


*/