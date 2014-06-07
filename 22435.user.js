// ==UserScript==
// @name          HackHUD
// @description	  Grassroots Media: overlay photos and blog posts on the BBC news site.
// @author        Dharmafly (http://dharmafly.com)
// @namespace     http://dharmafly.com
// @identifier    http://dharmafly.com/hackhud/hackhud.user.js
// @version       0.21
// @date           2008-12-01
//
// @include       http://news.bbc.co.uk/*/hi/*/*.stm*
// @exclude       http://news.bbc.co.uk/*/hi/*/default.stm*
// @exclude       http://news.bbc.co.uk/*/hi/front_page/*

// @info     http://dharmafly.com/projects/hackhud

// ==/UserScript==


// USERSCRIPT INFO
var UserScript = {
	id: 'hackhud',
	title: 'HackHUD',
	version: 0.21,
	date: new Date(2008, 11, 1), // Month -=1 in JavaScript
	author: 'Dharmafly'
};

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


/* / /  / /  / /
\ /  HackHUD  /\
 / /  / /  / / /*


  SEE:- http://dharmafly.com/projects/hackhud



  SUMMARY
  =======
  Hacked in 24 hours for Hack Day London; 16-17 June, 2007.
  
  The original concept was to overlay grassroots media - people taking photos, blogging, tweeting events as they happen in the streets - on top of current news on mainstream media websites.
  
  HackHUD is a Greasemonkey script that activates when you point your browser to a BBC News article <http://news.bbc.co.uk>.

  The script analyses the article’s text for potential tags, or keywords, via the Yahoo Term Extraction API. Each tag gets marked up on the page, ready to be clicked…

  HackHUD contacts Flickr, Technorati or Newsvine, via a Yahoo Pipes system, for relevant user media. These are then popped-up into a little panel that uses the Yahoo User Interface library.




/*  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   / 
  /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /   /
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

(function() {

if (!checkGreasemonkeyVersion()){
	return;
}
GM_log('start');


function _(payload){
	unsafeWindow.console.log(payload);
}



extend(UserScript, {
	// Hours till next update check
	updateInterval: 24,
	
	// Api url to check for updates
	checkUpdateUrl: 'http://dharmafly.com/api/checkupdates/',
	
	// Url for script discussion thread
	metaUrl: 'http://dharmafly.com/hackhud/',
	
	// Function to check for script updates
	checkForUpdates: function(){
		// Does user want to check for updates?
		/* if (!Settings.getValue('checkforUpdates'))
			{ return; } */
		
		// Determine last time script was checked for updates
		var lastCheck = GM_getValue('lastUpdateCheck');
		lastCheck = (typeof lastCheck != 'undefined') ? parseInt(lastCheck) : this.date.getTime();
		
		// Get the current time
		var timeNow = new Date().getTime();
		
		// Guard against weird stuff, like user changing system clock to the future
		if (lastCheck > timeNow)
			{ lastCheck = timeNow; }
		
		// Is it time to check for updates? If not, return
		if (timeNow < (lastCheck + (this.updateInterval * 60 * 60 * 1000)))
			{ return; }
			
		//  Update the lastUpdateCheck local variable
		GM_setValue('lastUpdateCheck', timeNow.toString());
		
		
		// +-+-+-+-+-+-+-+-+


		// Api url for the update check
		var url = this.checkUpdateUrl + '?id=' + this.id + '&version=' + this.version + '&noCache=' + timeNow;
		var that = this;
		
		// Callback function for the AJAX request
		var callback = function(response){
			// Bad response
			if (!response) { return; }
			else if (response == '') { return; }
			
			// Parse the response
			var parser = new DOMParser();
			var dom = parser.parseFromString(response,	"application/xml");
			var rsp = dom.getElementsByTagName('rsp')[0];
			
			// Our request failed! Return.
			if (rsp.getAttribute('stat') != 'ok') { return; }
			
			// Get userscript details
			var userscript = rsp.getElementsByTagName('userscript')[0];
			var v = userscript.getAttribute('version');
			var downloadUrl = userscript.getElementsByTagName('url')[0].textContent;
			var metaUrl = userscript.getElementsByTagName('url')[0].textContent;
			var changes = userscript.getElementsByTagName('changelog')[0].getElementsByTagName('change');
						
			// If there's no version update, then return
			if (v == that.version)
				{ return; }
			
			
			// There's an update! Create a pop-up to tell the user
			var oPanel = (YAHOO.HUD.infoPanel) ? YAHOO.HUD.infoPanel : createPanel();
			oPanel.setHeader(UserScript.title + ": Update Available");
			
			var sText = '<div class="updateAvail"><p>Version ' + v + ' of <a href="' + metaUrl + '" title="' + UserScript.title + ' home">' + UserScript.title + '</a> is now available.<br /><a class="installLink" href="' + downloadUrl + '" title="Install new version of this script">&raquo; Install it!</a></p>';
			if (changes.length > 0){
				sText += '<h2>New Features:</h2>';
				sText += '<ol>';
				for (var i=0; i<changes.length; i++){
					sText += '<li>' + changes[i].textContent + '</li>';
				}
				sText += '</ol>';
			}
			sText += '</div>';
			
			oPanel.setBody(sText);
			oPanel.render(document.body);
			oPanel.show();
		};
		
		// Make the AJAX request
		ajaxRequest(url, callback);
	}
});
UserScript.checkForUpdates();



// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


// GM additions
try {test=GM_includeOnce;}
catch (err) {
    GM_log('adding GM_includeOnce function');
    function GM_includeOnce(assets, callbackOnComplete, callbackOnTimeout, timeout, context) {
        /*
            GM_includeOnce(assets[, callbackOnComplete[, callbackOnTimeout[, timeout[, context]]]])
            assets = [{url:'', existenceTest:func[, type: typeEnum]}] type is calculated from extension if not included
            no callback is made without callbackOnComplete
            default timeout is 10000 (10 seconds)
            context is the object that the scripts are run on, defaults to this
            callbackOnComplete is sent a closure style function as its only parameter which allows access to the variables 
            created in the scripts
        */
        
        //private functions
        var numAssets=assets.length, numJSAssets=0, numJSLoaded=0;
        var timeoutTimer=setTimeout(callbackOnTimeout, timeout||10000);
        var allScript='', allCSS='', importScript='';
        var asset, type, styleLink;
        
        function accessFunc(localVar) {try{return eval(localVar);} catch (err) {}}
        
	    function allScriptsLoaded() {
	        GM_log('allScriptsLoaded');
            clearTimeout(timeoutTimer);
	        //it may be better to add these scripts immediately rather than compiling the big string in some circumstances
	        GM_log('compiling scripts');
	        for (var a=0;a<numAssets;a++) if (assets[a].JSLoaded) allScript+=assets[a].content + '\n';
	        GM_log('setting script(' + allScript.substr(0,20) + '...[' + allScript.length + ']');
	        //execute the script including a closure func at the end for access to the scripts variables
	        GM_log('proceeding to loader completed callback');
	        var func=new Function(allScript + '\nreturn ' + accessFunc.toString() + '\n');
            callbackOnComplete(func.call(context||this));
	    }
	    function aScriptLoaded(asset, responseDetails) {
	        GM_log('GM_includeOnce(' + asset.url + ') loaded, total:' + ++numJSLoaded);
            asset.content=responseDetails.responseText;
            asset.JSLoaded=true;
            if (numJSLoaded==numJSAssets) allScriptsLoaded();
        }

        GM_log('GM_includeOnce started: processing asset requests');
        for (var a = 0; a < numAssets; a++) {
	        asset = assets[a];
	        if (asset.obj&&window[asset.obj]) GM_log('asset window[' + asset.obj + '] already exists');
            else {
    	        type=asset.type||asset.url.substr(asset.url.length-3, 3).replace(/\./g, '');
                switch (type) {
                    case 'js': {
                        numJSAssets++;
                        asset.type='js';
                        GM_xmlhttpRequest({
                            method:"GET",
                            url:asset.url,
                            onload:paramCall(aScriptLoaded, this, [asset]) //will have responseDetails append to parameter list by the event call
                        });
                        break;
                    }
                    case 'css': {
                        asset.type='css';
	                    styleLink =gEBTN('head')[0].appendChild(cE('link'));
    			        styleLink.href = asset.url;
			            styleLink.type = 'text/css';
			            styleLink.rel = 'stylesheet';
                        break;
                    }
                    default: GM_log('unknown asset type [' + type + ']');
                }
	            GM_log('GM_includeOnce(' + asset.url + ') requested');
	        }
        }
    }
}

try {test=GM_addScript;}
catch (err) {
    GM_log('adding GM_addScript function');
    function GM_addScript(scripts) {
	    GM_log('adding scripts');
        //adds a script into unsafeWindow. This poses security and invisibility issues.
	    if (typeof scripts == 'string') { scripts = [scripts]; }
	    var script = gEBTN('head')[0].appendChild(cE('script'));
	    script.appendChild(cTN(scripts.join('\n')));    
    }
}
try {test=GM_addStyle;}
catch (err) {
    GM_log('adding GM_addStyle function');
    function GM_addStyle(styles){
	    GM_log('adding styles');
	    if (typeof styles == 'string') { styles = [styles]; }
	    var style = gEBTN('head')[0].appendChild(cE('style'));
	    style.type = 'text/css';
	    style.appendChild(cTN(styles.join(' ')));
    }
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//initialisation object
var hackHUD = {
    markupComplete: false,
    YUILoadComplete: false,
	init: function(){
        GM_log('hackHUD:init');
		var article = getArticle();
		var context = getArticleContext(article);
		var query = getArticleQuery(article);
		var YUIversion='2.3.0';
		var baseYUIURL='http://yui.yahooapis.com/' + YUIversion + '/build/';
		GM_includeOnce([
		    {url: baseYUIURL + 'container/assets/container.css' },
            {url: baseYUIURL + 'menu/assets/menu.css' },
            {obj: 'YAHOO', url: baseYUIURL + 'utilities/utilities.js' },
            {obj: 'YAHOO.util.Dom', url: baseYUIURL + 'dom/dom-min.js' },
            {obj: 'YAHOO.util.Event', url: baseYUIURL + 'event/event-min.js' },
            {obj: 'YAHOO.util.Anim', url: baseYUIURL + 'animation/animation-min.js' },
            {obj: 'YAHOO.widget.Container', url: baseYUIURL + 'container/container-min.js' },
            {obj: 'YAHOO.util.Menu', url: baseYUIURL + 'menu/menu-min.js' }
		    ], this.YUIComplete, this.YUITimeout
		);
		getTags(context, query, hackHUD.MarkupComplete); //get content analysis asynchronously
	    GM_log(new Date() + ':init completed');
	},
	
	MarkupComplete: function(aTags){
	    addHackTags(aTags);
	    hackHUD.markupComplete=true;
	    if (hackHUD.YUILoadComplete) addMenuListeners();
	    else GM_log('still waiting for the YUI to load before addMenuListeners');
	    GM_log(new Date() + ':Markup completed');
	},
	
	YUIComplete: function(closureFunc){
	    if (window.YAHOO||(window.YAHOO=closureFunc('YAHOO'))) {
	        unsafeWindow.YAHOO=YAHOO;
	        YAHOO.namespace('HUD');
	        YAHOO.HUD.currentMenuID = 1;
	        hackHUD.YUILoadComplete=true;
	        if (hackHUD.markupComplete) addMenuListeners();
	        else GM_log('still waiting for content analysis to return before addMenuListeners');
	    } else alert('could not get YAHOO variable from GM_includeOnce scripts');
	    GM_log(new Date() + ':YUI completed');
    },
	
	YUITimeout: function(){
	    alert('Failed to load Yahoo libraries. Cannot display menus.');
	}
}



// STYLE
var hackTagIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHAQMAAAD%2BnMWQAAAAA3NCSVQICAjb4U%2FgAAAABlBMVEX%2F%2F%2F%2BZAACnAFABAAAAAnRSTlMA%2F1uRIrUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMDcvMDfYyXT0AAAAJXRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyBNWCAyMDA0h3aszwAAABBJREFUeJxjEGAAwX9gUgAACaABXx%2FE%2FnQAAAAASUVORK5CYII%3D';
var hackTagIconHover = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHAQMAAAD%2BnMWQAAAAA3NCSVQICAjb4U%2FgAAAABlBMVEX%2F%2F%2F%2F%2F%2F%2F9VfPVsAAAAAnRSTlMA%2F1uRIrUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMDcvMDfYyXT0AAAAJXRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyBNWCAyMDA0h3aszwAAABBJREFUeJxjEGAAwX9gUgAACaABXx%2FE%2FnQAAAAASUVORK5CYII%3D';

var styles = '';
styles += 'a.hackTag { border-bottom:1px #990000 dotted; cursor:pointer; background:transparent url("' + hackTagIcon + '") center right no-repeat; padding-right:10px; margin-right:0.3em; font-size:inherit; text-decoration:none; color:black; }';
styles += 'a.hackTag:hover { background-color:#990000; color:white; border:none; background-image:url("' + hackTagIconHover + '"); }';
styles += '#hackHUD_panel { width:430px; }';
styles += '#hackHUD_panel a { font-size:1em; color:#900; }';
styles += '#hackHUD_panel a:hover { color:white; background-color:#900; }';

styles += '#hackHUD_panel .container-close { opacity:0.7; }';
styles += '#hackHUD_panel .hd { background-color:#900; }';
styles += '#hackHUD_panel .bd { min-height:320px; max-height:450px; overflow:auto; }';
styles += '#hackHUD_panel .ft { font-size:0.8em; color:#999; }';
styles += '.yuimenuitem a.yuimenuitemlabel.selected { background-color:#900; text-decoration:none; }';

styles += '#hackHUD_panel .flickr { list-style:none; }';
styles += '#hackHUD_panel .flickr li { float: left; margin: 0 20px 20px 0; height:152px; }';
styles += '#hackHUD_panel .flickr a { border:1px solid #f99; padding:4px; display:block; }';
styles += '#hackHUD_panel .flickr a:hover { background-color:#900; border-color:#900; }';
styles += '#hackHUD_panel .flickr span { display:block; overflow:hidden; max-height:140px; border:1px solid white; }';
styles += '#hackHUD_panel .flickr img { display:block; border:none; width: 140px; }';
styles += '#hackHUD_panel > .bd > ul >li { margin-top:1.6em; } ';
styles += '#hackHUD_panel .updateAvail { margin:1.5em 2em; }';
styles += '#hackHUD_panel .updateAvail h2 { color:#777; margin:1.5em 0 0; border-top:1px solid #777; padding:0.5em 0; }';
styles += '#hackHUD_panel .updateAvail a.installLink { font-size:1.2em; font-weight:bold; }';
styles += '#hackHUD_panel .updateAvail ol { margin:0 1em; padding:0; list-style-position: inside; }';
styles += '#hackHUD_panel .updateAvail li { margin:0.5em 0; padding:0; }';
GM_addStyle(styles);

hackHUD.init();
// Debug mode
//GM_log('adding debug Hack Tags (synchronous)');
//addHackTags(['web developer', 'hack', 'london', 'bbc', 'yahoo']);




// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

// Extend an object with properties from another object
function extend(destination, source) {	
	for (property in source)
		{ destination[property] = source[property]; }
	return destination;
};


// Closure for parameterised object reference calls
function paramCall(func, obj, params) {
    //return pointer to an inner function creating closure, maintaining the scope chain and its values
    //closure lasts for the lifetime of the variable assigned to the return of this function
    return function(){
        var totalParams=params;
        //add in any parameters passed directly to the function call (like from events etc.)
        for (var i=0;i<arguments.length;i++) totalParams=totalParams.concat(arguments[i]);
        func.apply(obj, totalParams);
    };
}
function setTimeoutParam(func, obj, params, timeout) {
    //setup closure, assign closed function to setTimeout call
    setTimeout(paramCall(func, obj, params), timeout);
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


// DOM FUNCTIONS

// createElement
function cE(node){
	return document.createElement(node);
}

// createTextNode
function cTN(node){
	return document.createTextNode(node);
}

// getElementsByTagName
function gEBTN(tagName, container){
	container = container || document;
	return container.getElementsByTagName(tagName);
}

// getElementById
function $(id){
	if (typeof id == 'string'){
		return document.getElementById(id);
	}
	else {
		return id;	
	}
}



// getElementsByCssClass
// Get elements from the document with a specific cssClass
function gEBCC(tagName, cssClass, container){
	// Construct empty array to return
	var returnArray = [];
	
	// Get divs in the document
	var elements = gEBTN(tagName, container);
	
	// Cycle through elements
	for (var i=0; i<elements.length; i++)
		{
			// Find the element with the css class
			if (elements[i].getAttribute('class') == cssClass)
				{ returnArray.push(elements[i]); }
		}
	
	// Return array
	return returnArray;
}


// Get text node value from within an element node
function getTextValue(node){
	for (var i=0; i<node.childNodes.length; i++){
		var child = node.childNodes[i];
		if (child.nodeName == '#text'){
			return trim(child.nodeValue);
		}
	}
	return '';
}

// Check if parent node has specified node name
function parentIsElement(oNode, sParentNodeName){
	return (oNode.parentNode.nodeName.toLowerCase() == sParentNodeName.toLowerCase());
}

// Check if text node
function isTextNode(oNode){
	return (oNode.nodeType == 3);
}

// Check if comment node
function isCommentNode(oNode){
	return (oNode.nodeName == '#comment');
}


// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


//TEXT FUNCTIONS

// Trim leading and trailing space - optional arg: trim inner multi-space (default: false)
function trim(str){
	var trimMultispace = (arguments.length > 1) ? arguments[1] : false;
	str = str.replace(/\s*(.*)\s*/gm, '$1');
	return (trimMultispace) ? str.replace(/\s+/gm, ' ') : str;
}

function fName(fFunc) {
    var strConstructor=fFunc.toString();
    return strConstructor.substr(9, strConstructor.indexOf('(', 11)-9);
}

function fBody(fFunc) {
    var strConstructor=fFunc.toString();
    return strConstructor.substr(strConstructor.indexOf('{'), strConstructor.length);
}

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


// BBC SITE SPECIFIC FUNCTIONS


// Get the title of the currently viewed article
function getArticleTitle(){
	var storycontent = gEBCC('table', 'storycontent')[0];
	return getTextValue(storycontent.getElementsByTagName('h1')[0]);
}


function getArticleNode(){
	return gEBCC('td', 'storybody')[0];
}




// Get the content of the currently viewed article
function getArticleContent(){
	var node, p, leader, content;
	node = getArticleNode();
	p = node.getElementsByTagName('p');
	leader = getTextValue(p[0]);
	
	content = '';
	for (var i=0; p[i]; i++){
		content +=  (p[i].firstChild.nodeValue !== null) ? p[i].firstChild.nodeValue : '';
	}
	content = trim(content, true);
	return {
		leader: leader,
		content: content
	};
}


// Get an object for the article
function getArticle(){
	var article = getArticleContent();
	article.title = getArticleTitle();
	return article;
}


function getArticleContext(article){
	return article.leader + ' ' + article.content;
}

function getArticleQuery(article){
	return article.title + ' ' + article.leader;	
}




// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+



// TERM EXTRACTION => RENDERING


// 1. Post content to term extraction API
// 2. Receive list of tags as response
// 3. Send tags to the callback function
function getTags(context, query, callback) {       
	/* Get extracted tags from the news article */
    GM_log('getTags("' + context.substr(0, 50) + '...",' + query + ',' + fName(callback) + ')');
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://search.yahooapis.com/ContentAnalysisService/V1/termExtraction',
		
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'application/atom+xml,application/xml,text/xml'
		},
		
		// Data to be posted
		data: 'context=' + context + '&appid=vonS923V34HFd4o4i3JpMUrWIWkYCjaxEn7Lz8h1fge7DkpBAgsy8SaUSsZFskQ-' + '&query=' + query + '&output=json',
		
		onload: function(responseDetails) {
			// Evaluate the response
			aResults = eval('(' + responseDetails.responseText + ')');
			
			// Store tags in global var
			aArticleTags = aResults['ResultSet']['Result'];
			
			// Send tags to callback function
			callback(aArticleTags);
		}
	});     
}



// Receive tags from API and get everything to start using them
function addHackTags(aTags){
    GM_log('addHackTags(' + aTags + ')');
	var oNode = processChildren(getArticleNode(), aTags);
	return oNode;
}


// Check if all tags have been added to the document
function allTagsAdded(aTags){
	for (var i=0; i<aTags.length; i++){
		if (typeof aTags[i] != 'undefined'){
			return false;
		}
	}
	return true;
}


// Convert text into a a tag id
function tagTextToId(sText){
	// Replace whitespace with underscores
	var sTag = sText.replace(/\s/g, '_');
	
	// Lowercase
	sTag = sTag.toLowerCase();
	
	return sTag;
}


// Get text from a node and convert to a tag id
function tagNodeToId(oNode){
	return tagTextToId(oNode.firstChild.nodeValue);
}


// Iterate through children of a node, applying tags
function processChildren(oNode, aTags){	
	// Get child nodes
	var aNodes = oNode.childNodes;
	if (!aNodes){
		return false;	
	}
	
	// Loop through child nodes
	for (var i=0; i < aNodes.length; i++){
		
		// Check if all tags have been found
		if (allTagsAdded(aTags)){
			return true;
		}
		processChild(aNodes[i], aTags);
	}
	
	return oNode;
}



// Process different nodes in different ways
// Text nodes are scanned for presence of text containing the tags
function processChild(oChild, aTags){
	// It's an anchor or comment -> return
	if (parentIsElement(oChild, 'a') || isCommentNode(oChild)){
		return false;
	}
	
	// It's a text node -> add hack tags
	else if (isTextNode(oChild)){
		if (oChild.nodeValue){
			oChild.nodeValue = trim(oChild.nodeValue, true);
			if (oChild.nodeValue != '') {
				return addHackTag(oChild, aTags);
			}
		}
	}
	
	// It's a different node -> process children
	else {
		return processChildren(oChild, aTags);
	}
}



// Markup tags contained in the text of a text node
function addHackTag(oTextNode, aTags){
	var sClassName = 'hackTag';
	var sTitleAttr = 'Click for Info';
	var sText = oTextNode.nodeValue;
	var oParent = oTextNode.parentNode;

	// Strange JavaScript behaviour... a child node without a parent node...
	if (!oParent) { return; }


	// Loop through global aTags
	for (var i=0; i < aTags.length; i++) {
		// Check if tag has been deleted (i.e. previously found and marked up)
		var sTag = aTags[i];
		if (typeof sTag == 'undefined'){
			continue;
		}
		
		// Check if the tag is contained in the text
		var sRegexpString = sTag;
		var oRegexp = new RegExp(sRegexpString, "mi");
		var aResult = sText.match(oRegexp);
		if (!aResult){
			continue;
		}
		
		// Match found!
		var sMatch = aResult[0];
		var nPos = aResult.index;
		
		// Delete tag from array now that it's been found
		delete(aTags[i]);
		
		
		// Change the HTML

		// Replace the existing text node with the text before the tag
		var sPreTag = sText.slice(0, nPos);
		var oPreElement = cTN(sPreTag);
		oParent.replaceChild(oPreElement, oTextNode);
		
		// Add the tag in a container
		var sTagContainer = cE('a');
		sTagContainer.appendChild(cTN(sMatch));
		sTagContainer.className = sClassName;
		sTagContainer.href = 'javascript:void(0);';
		//sTagContainer.setAttribute('onclick', 'return false;');
		oParent.insertBefore(sTagContainer, oPreElement.nextSibling);
		
		// Add the text after the tag
		var sPostTag = sText.slice(nPos + sMatch.length);
		var oPostElement = cTN(sPostTag);
		oParent.insertBefore(oPostElement, sTagContainer.nextSibling);
		
		// Pass the pre and post text nodes back through the function
		aTags = addHackTag(oPreElement, aTags);
		aTags = addHackTag(oPostElement, aTags);
		
		// Exit the loop
		break;
	}
	
	// Return the updated list of unfound tags
	return aTags;
}




// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


// YUI FUNCTIONS


function addMenuListeners() {
    GM_log('addMenuListeners');
	aHackTags = YAHOO.util.Dom.getElementsByClassName('hackTag');
	
	for (var i=0;i<aHackTags.length;i++) {
		var oNode = aHackTags[i];
		var sMenuId = tagNodeToId(oNode) + '_menu';
		
        YAHOO.HUD[sMenuId] = new YAHOO.widget.Menu(
			sMenuId, {
				//fixedcenter:true
			}
		);
		var oMenu = YAHOO.HUD[sMenuId];
		oMenu.addItems([
			{text:"Flickr"},
			{text:"Technorati"},			
			{text:"Newsvine"},			
			{text:"Wikipedia"},
			{text:"Twitter"}
		]);
        oMenu.render(document.body);
		oMenu.hide();
		
		// OnClick event
		oNode.addEventListener('click', toggleMenu, false);		
		
		function getId(node){ // Big ugly hack
			return node.parentNode.parentNode.parentNode.parentNode.id.slice(0,-5);
		}
		var oMenuItems = gEBCC('a', 'yuimenuitemlabel', $(sMenuId));
		for (var j=0; j<oMenuItems.length; j++){
			switch (getTextValue(oMenuItems[j])){
				case 'Flickr':
				oMenuItems[j].addEventListener('click', function(){addContentToPanel("Flickr", getFlickrPipesData, getId(this));}, false);
				break;
				
				case 'Technorati':
				oMenuItems[j].addEventListener('click', function(){addContentToPanel("Technorati", getTechnoratiPipesData, getId(this));}, false);
				break;
				
				case 'Newsvine':
				oMenuItems[j].addEventListener('click', function(){addContentToPanel("Newsvine", getNewsvinePipesData, getId(this));}, false);
				break;
				
				case 'Wikipedia':
				oMenuItems[j].addEventListener('click', function(){addContentToPanel("Wikipedia", getWikipediaPipesData, getId(this));}, false);
				break;
				
				case 'Twitter':
				oMenuItems[j].addEventListener('click', function(){addContentToPanel("Twitter", getTwitterPipesData, getId(this));}, false);
				break;
			}
		}
	}
	
	
	// Called on a HackTag HTML element
	function toggleMenu(e) {
		var oNode = e.currentTarget;
		var sMenuId = tagNodeToId(oNode) + '_menu';
		var xy = [YAHOO.util.Event.getPageX(e), YAHOO.util.Event.getPageY(e)];
		eMenu = YAHOO.util.Dom.get(sMenuId);
		eMenu.style.left = xy[0]+'px';
		eMenu.style.top = xy[1]+'px';
		if(eMenu.style.visibility == 'hidden') eMenu.style.visibility = 'visible';
		return false;
	}
}

// Convert 'some_tag' to 'Some Tag'
function tagToUCWords(sTag){
	var words = sTag.split('_');
	for (var i=0; i<words.length; i++){
		words[i] = words[i][0].toUpperCase() + words[i].substring(1);
	}
	return words.join(' ');
}

// Convert 'some_tag' to 'some%20tag'
function tagToUrl(sTag){
	return sTag.replace(/_/g, '%20');
}

function createPanel(){
	YAHOO.HUD.infoPanel = new YAHOO.widget.Panel("hackHUD_panel",{ 
		close:true,  
		visible:true,  
		width:"430px",
		draggable:true,
		fixedcenter:true,
		effect:{
			effect:YAHOO.widget.ContainerEffect.FADE,
			duration:0.5
		}
	});
	
	YAHOO.HUD.infoPanel.setFooter(UserScript.title + ' (v' + UserScript.version + ')');
	return YAHOO.HUD.infoPanel;
}

function addContentToPanel(sSourceName, fContentFunction, sTag) {
	var oPanel = (YAHOO.HUD.infoPanel) ? YAHOO.HUD.infoPanel : createPanel();	
	oPanel.setHeader("'" + tagToUCWords(sTag) + "' on " + sSourceName);	
	oPanel.setBody('');
	oPanel.render(document.body);
	oPanel.show();
	fContentFunction(sTag, oPanel);
	
	var o = gEBTN('object');
	for (var i=0; i<o.length; i++){
		o[i].style.visibility = 'hidden';
	}	
	gEBCC('span', 'container-close', $('hackHUD_panel'))[0].addEventListener('click', function(){
		var o = gEBTN('object');
		for (var k=0; k<o.length; k++){
			o[k].style.visibility = 'visible';
		}
	}, false);
}

/* function addContentToPanel(sSourceName, fContentFunction, a, b, oMenu) {
	var oMenuCaller = oMenu.parent;
	var sId = oMenuCaller.id;
	var sTag = sId.slice(0, -5);
	var oPanel = (YAHOO.HUD.infoPanel) ? YAHOO.HUD.infoPanel : createPanel();
	
	oPanel.setHeader("'" + tagToUCWords(sTag) + "' on " + sSourceName);	
	oPanel.setBody('');
	oPanel.render(document.body);
	oPanel.show();
	fContentFunction(sTag, oPanel);
} */

// Make an AJAX request
function ajaxRequest(url){ // optional: callback, method, data
	var callback, method, request, data, dataString;
	
	// Optional args
	// Callback function - default: no function
	callback = (arguments.length > 1) ? arguments[1] : function(){};
	// HTTP Method - default: GET
	method = (arguments.length > 2) ? arguments[2].toUpperCase() : 'GET';
	
	// Request object
	request = {
		method: method,
		url:url,
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey' + (typeof UserScript !== 'undefined' && typeof UserScript.title !== 'undefined' ? ': ' + UserScript.title : ''),
			'Accept': 'application/atom+xml, application/xml, application/xml+xhtml, text/xml, text/html, application/json, application-x/javascript'
		},
		onload:function(response){
			GM_log('ajaxRequest: AJAX response successful');
			
			if (response.status !== 200){
				GM_log ('ajaxRequest: Response status ' + response.status);
				return callback(false);
			}			
			if (response.responseText === ''){
				GM_log('ajaxRequest: AJAX response empty');
				return callback(false);
			}
			callback(response.responseText);
		},
		onerror:function(response){
			GM_log('ajaxRequest: AJAX request failed');
			callback(false);
		}
	};
	
	// POST data
	if (method === 'POST'){
		data = (typeof arguments[3] === 'object') ? arguments[3] : {};
		dataString = '';
		
		for (prop in data){
			if (dataString !== ''){
				dataString += '&';
			}
			dataString += prop + '=' + encodeURI(data[prop]);
		}
		request.data = dataString;
		request.headers['Content-type'] = 'application/x-www-form-urlencoded';
	}			
	
	// Send request
	GM_log('ajaxRequest: Sending AJAX request:');
	GM_xmlhttpRequest(request);
}

function getPanelContentsElement(){
	return $('hackHUD_panel').getElementsByTagName('div')[1];
}

function standardParser(classUL, responseDetails) {
	aResults = eval("(" + responseDetails + ")");
	aItems = aResults['value']['items'];
	
	// If no results
	if (aItems.length == 0){
		getPanelContentsElement().innerHTML = noResults();
		return;
	}
	
	var sContent = '';
	for(var i=0; i<aItems.length;i++) {
		sPermalink = aItems[i]['link'];
		sTitle = aItems[i]['title'];
		sDescription = aItems[i]['description'];
		sContent += '<li><a href="' + sPermalink + '">' + sTitle + '</a><div class="description">' + sDescription + '</div></li>';
	}
	sContent = '<ul class="' + classUL + '">' + sContent + '</ul>';
	
	$('hackHUD_panel').getElementsByTagName('div')[1].innerHTML = sContent;			
}

function getYahooPipe(sId, sTags, nNumber, fCallback) {
	sUrl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + sId + '&_render=json&keywords="' + tagToUrl(sTags) + '"&number=' + (nNumber||4) + '&rand=' + Math.random();
	ajaxRequest(sUrl, fCallback);
}

function getFlickrPipesData(sTags, oInfoPanel) {
	getYahooPipe('0vC_uEjo3BGQh310mLokhQ', sTags, 4, 
		function(responseDetails) {
			aResults = eval("(" + responseDetails + ")");
			aItems = aResults['value']['items'];
			
			// If no results
			if (aItems.length == 0){
				getPanelContentsElement().innerHTML = noResults();
				return;
			}
			
			var sContent = '';
			for(var i=0; i<aItems.length;i++) {
				sPermalink = aItems[i]['y:flickr']['link'];
				sSrc = aItems[i]['y:flickr']['img'];
				sTitle = aItems[i]['title'];
				sContent += '<li><a title="' + sTitle + '" href="' + sPermalink + '"><span><img src="' + sSrc + '"/></span></a></li>';
			}
			sContent = '<ul class="flickr">' + sContent + '</ul>';
			
			$('hackHUD_panel').getElementsByTagName('div')[1].innerHTML = sContent;		
		}
	);	
}

function getTechnoratiPipesData(sTags, oInfoPanel) {
	getYahooPipe('ePSZ2ldD3BGRoggvqWIyXQ', sTags, 4, paramCall(standardParser, this, ['technorati']));
}

function getNewsvinePipesData(sTags, oInfoPanel) {
	getYahooPipe('Iiu5jV5D3BGni70xqWIyXQ', sTags, 4, paramCall(standardParser, this, ['newsvine']));
}

function getWikipediaPipesData(sTags, oInfoPanel) {
	getYahooPipe('f5092f6843f0ed59a060cd56833f4889', sTags, 4, paramCall(standardParser, this, ['wikipedia']));
}

function getTwitterPipesData(sTags, oInfoPanel) {
	getYahooPipe('ae8c04a2fd41f088efc4296cf8546444', sTags, 4, paramCall(function(classUL, responseDetails) {
	aResults = eval("(" + responseDetails + ")");
	aItems = aResults['value']['items'];
	
	// If no results
	if (aItems.length == 0){
		getPanelContentsElement().innerHTML = noResults();
		return;
	}
	
	var sContent = '';
	for(var i=0; i<aItems.length;i++) {
		sPermalink = aItems[i]['link'];
		sTitle = aItems[i]['title'];
		sDescription = aItems[i]['description'];
		sContent += '<li><a href="' + sPermalink + '">' + sTitle + '</a></li>';
	}
	sContent = '<ul class="' + classUL + '">' + sContent + '</ul>';
	
	$('hackHUD_panel').getElementsByTagName('div')[1].innerHTML = sContent;			
}, this, ['twitter']));
}

function noResults() {
	return '<p>Sorry... There are no results for this tag.</p>';
}

function checkGreasemonkeyVersion(){
	// Check that Greasemonkey extension is sufficiently up-to-date
	if (!GM_xmlhttpRequest) {
		if (window.confirm('You do not have the latest version of Greasemonkey installed.\nWould you like to get it now?')){
			window.location.href = 'http://greasemonkey.mozdev.org';
		}
		return false;
	}
	
	else {
		return true;
	}
}


// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
})(); // THE END!