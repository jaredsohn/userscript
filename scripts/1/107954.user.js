// ==UserScript==
// @name                Google Calendar Minimal
// @namespace           http://skoshy.com
// @version             1.2.1
// @description         Styles Google Calendar and allows toggling of its components
// @include             http*//www.google.com/calendar/*
// @include             http*//google.com/calendar/*
// ==/UserScript==

/*
    Begin
*/

var currentVersion = '1.2.1';

var scriptIdentifier = 'gcalmin';
var scriptId = '107954';

var intervals = [];
var handlers = [];

// From here: http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};
}

function addStyles(rules, id) {
    var node = document.createElement("style");
    node.setAttribute("type", "text/css");
    node.innerHTML = rules;
    if (id) node.setAttribute("id", id);

    document.getElementsByTagName("head")[0].appendChild(node);
}

// From http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/ - Gets rendered style of an element
function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

// Returns unix time in seconds
function time() {
	var foo = new Date; // Generic JS date object
	var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
	return parseInt(unixtime_ms / 1000);
}

function checkVersion() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/'+scriptId,
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(response) {
			var newVersion = response.responseText.match(/[\/]*[\t ]@version[\t ]*[\d\w\.]*/)[0].match(/[\d]+[\d\.\w]+/);
			if (newVersion != currentVersion) {
				var node = document.createElement('div');
				node.id = scriptIdentifier+'update';
				node.setAttribute('data-scriptid', scriptId);
				node.innerHTML = '<p>A new version ('+newVersion+') of <span class="bold">Google Calendar Minimal</span> is available! Click here to update from '+currentVersion+' to '+newVersion+'</p><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'"> </a>';
				document.body.appendChild(node);
				// Move body down
				document.body.style.marginTop = (parseInt(getStyle(document.body, 'margin-top'))+26)+'px';
				// Move Google Bar down
				document.getElementById('gbz').style.marginTop = (parseInt(getStyle(document.getElementById('gbz'), 'margin-top'))+26)+'px';
				document.getElementById('gbg').style.marginTop = (parseInt(getStyle(document.getElementById('gbg'), 'margin-top'))+26)+'px';
				document.getElementById('gbx3').style.marginTop = (parseInt(getStyle(document.getElementById('gbx3'), 'margin-top'))+26)+'px';
				document.getElementById('gbx4').style.marginTop = (parseInt(getStyle(document.getElementById('gbx4'), 'margin-top'))+26)+'px';
				// Resize window
				resize();
			}
			// Update the "update-check" time
			GM_setValue('timeSinceLastUpdateCheck', time());
		}
	});
}

function headerComponents(display) {
    if (document.getElementById(scriptIdentifier+'header') == null) {
        addStyles('#gb, #srreg, .domainlogoparent {display: none !important;}'
            + '#ntowner {top: 32px !important;}'
            + '#vr-proto-header {height: 0px !important;}'
            + '#vr-header {height: 0px !important;}'
        , scriptIdentifier+'header');
    } else {
        document.getElementsByTagName('head')[0].removeChild(document.getElementById(scriptIdentifier+'header'));
    }
    resize();
}

function resize() {
    eventFire(window, 'resize');
}

// Used from http://stackoverflow.com/questions/2705583/simulate-click-javascript
function eventFire(el, etype){
    if (el.fireEvent) {
        (el.fireEvent('on' + etype));
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

// Checks to see if the user is typing into an input box / textarea
function checkIfInputting() {
    if (document.activeElement.localName != 'textarea' && document.activeElement.localName != 'input')
        return true;
    else
        return false;
}

function addFontLink() {
    var node = document.createElement('link');
    node.href = 'http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic';
    	// First, make sure the protocols match
    var gcalProtocol = window.location.protocol;
    
    if (gcalProtocol == 'https:' && node.href.indexOf('http://') == 0)
    	node.href = node.href.replace('http://', 'https://');
    else if (gcalProtocol == 'http:' && node.href.indexOf('https://') == 0)
    	node.href = node.href.replace('https://', 'http://');
    
    node.rel = 'stylesheet';
    node.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node);
}

// define a handler
function toggleHeader(e) {
    // make sure someone isn't typing something into a textarea
    console.log(e);
    if (checkIfInputting()) {
        if (e.keyCode == 87) {
            headerComponents();
        } else if (e.keyCode == 89) {
            //yahooToggle();
        }
    }
}

addFontLink();
addStyles('#nav, #sidebar {width: 141px;}'
    + '#nav {margin-left: 16px;}'
    + '#mainbody, sidebar {padding-top: 8px;}'
    + '#sidebar .goog-imageless-button:not(.qnb-qab) {min-width: 105px;}'
    + '.dp-cell, .dp-onhover, .calListLabelOuter {-webkit-transition: background 300ms ease; -moz-transition: background 300ms ease; -o-transition: background 300ms ease; transition: background 300ms ease;}'
    + '.applogo {left: 13px !important; text-align: center; width: 150px; font-weight: bold; text-shadow: 1px 1px 1px #ABABAB}'
    + 'body, .dp-cell, .calListLabel, .calListLabel-sel, input, textarea, select, .sng-frame, .st-c, .chip dt, .chip dd, .eb-root, #gb, .st-c .evt-lk {font-family: \'Source Sans Pro\', \'Arial\', sans-serif !important;}'
    + '.calListLabel, .calListLabel-sel, .dp-cell, .goog-imageless-button, .navbuttonouter, .date-top, .wk-dayname, .st-c, .chip dd, #lo, .cb-root {font-size: 13px;}'
	+ '.wk-scrolltimedevents {font-size: 12px;}'
    + '#mainlogo {font-size: 20px !important;}'
    + '.dp-cell.dp-dayh {text-align: center;}'
	// Update CSS
	+ '#'+scriptIdentifier+'update {cursor: pointer; position: fixed; top: 0; left: 0; width: 100%; margin: 0; padding: 5px; height: 16px; background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.22, rgba(250,219,95,0)),color-stop(1, rgba(252,255,163)));background-image: -moz-linear-gradient(center bottom,rgba(250,219,95,0) 22%,rgb(252,255,163) 100%); background-color: rgb(250,219,95);-webkit-transition: background 400ms ease;-moz-transition: background 400ms ease;-o-transition: background 400ms ease;transition: background 400ms ease;}'
	+ '#'+scriptIdentifier+'update:hover {background-color: rgb(230,199,75);}'
	+ '#'+scriptIdentifier+'update p {text-align: center; width: 100%; margin: 0; padding: 0; font-size: 14px;}'
	+ '#'+scriptIdentifier+'update p .bold {font-weight: bold;}'
	+ '#'+scriptIdentifier+'update a {display: inline-block; position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;}'
    // Left-hand Headers
    + '.dpdiv.goog-zippy-expanded .zippy-arrow, .calHeader .zippy-arrow {margin-right: -12px;}'
    + '.calHeader, #dp_0_cur {padding-left: 14px;}'
    + '.calHeaderSpace {margin-left: 15px;}'
    // Change buttons to blue
    + '.qnb-container .goog-imageless-button, .action-btn-wrapper .goog-imageless-button, #df-fdbk {background: linear-gradient(center top , #4D90FE, #4787ED) repeat scroll 0 0 #4D90FE !important; background-image: -webkit-linear-gradient(top , #4D90FE, #4787ED) !important; background: -moz-linear-gradient(center top , #4D90FE, #4787ED) repeat scroll 0 0 #4D90FE !important;}'
    + '.qnb-container .goog-imageless-button-hover, .action-btn-wrapper .goog-imageless-button-hover, #df-fdbk:hover {border: 1px solid #2f5bb7 !important;}'
	+ '.qnb-container .goog-imageless-button {border-left-color: #4A6EFF;}'
    + '#mainlogo {color: blue;}'
    // Loading notification
    + '#lo {background-color: rgba(204, 68, 68, .85); padding: 4px;}'
    // "Added event" notification
    + '.mbox-cont {background-color: rgba(249, 237, 190, .5);}'
    // Event flair fixes
    + '.cwci {width: 13px; height: 13px; margin-right: 2px;}'
	// CloudMagic Fixes
	+ '.mb-search-container {background: none !important; border: 0 !important;}'
    // Logo stuff
    + '.logo-blue {color: blue;}'
    + '.logo-red {color: #F52C2C;}'
    + '.logo-yellow {color: #FFD000;}'
    + '.logo-green {color: #1BE02B;}'
, scriptIdentifier+'general');
headerComponents();

document.getElementById('mainlogo').innerHTML = '<span class="logo-blue">G</span><span class="logo-red">o</span><span class="logo-yellow">o</span><span class="logo-blue">g</span><span class="logo-green">l</span><span class="logo-red">e</span> Calendar';

resize();

// If the script hasn't checked for an update in 12 hours, check for one (happens anytime the script is first opened)
if ((GM_getValue('timeSinceLastUpdateCheck', time()-43210)+43200) < time())
	checkVersion();

// register the handler
handlers['keypress'] = document.addEventListener('keydown', toggleHeader, false); 