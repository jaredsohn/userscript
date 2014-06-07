// ==UserScript==
// @name        Google Voice Minimal
// @namespace   http://skoshy.com
// @include     http*://www.google.com/voice*
// @version     1.0.0
// ==/UserScript==

/*
    Begin
*/

var currentVersion = '1.0.0';

var scriptIdentifier = 'gvoicemin';
var scriptName = 'Google Voice Minimal';
var scriptId = '179056';

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
				node.className = 'update-userscript';
				node.setAttribute('data-scriptid', scriptId);
				node.innerHTML = '<p>A new version ('+newVersion+') of <span class="bold">'+scriptName+'</span> is available! Click here to update from '+currentVersion+' to '+newVersion+'</p><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'"> </a>';
				document.body.appendChild(node);
				// Move body down
				document.body.style.marginTop = (parseInt(getStyle(document.body, 'margin-top'))+26)+'px';
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
        addStyles('#gc-gaia-bar {display: none !important;}'
            // For showing notifications when archiving things, etc
            + '.no {position: absolute;}'
            // For showing notifications when archiving things, etc (keep at top of screen)
            + '.w-asV .b8 .vh, .w-asV .cc .vh, .w-asV .cd .vh {top: 0 !important;}'
            // For making top Voice bar narrowere
            + '.gc-appbar {padding: 6px 0;}'
            // Make sidebar narrower
            + '.goog-splitpane-first-container {width: 150px !important;}'
            + '.gc-appbar-label-area, .gc-inbox-sidebar-main {margin-left: 18px;}'
            + '.gc-appbar-label-area {width: 137px;}'
            // Make 
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

addStyles('#thingsidfhgrhug {display:none;}'
  // Button sizes
  + ' .T-I {height: 21px !important; line-height: 21px !important; min-width: 0 !important;}'
  // Update Userscript
  + '.update-userscript {position: absolute; top:0; width: 100%; z-index: 1000; text-align: center; background: rgb(180,223,91); background: -moz-linear-gradient(top,  rgba(180,223,91,1) 0%, rgba(180,223,91,1) 100%); /* FF3.6+ */ background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(180,223,91,1)), color-stop(100%,rgba(180,223,91,1))); background: -webkit-linear-gradient(top,  rgba(180,223,91,1) 0%,rgba(180,223,91,1) 100%); background: -o-linear-gradient(top,  rgba(180,223,91,1) 0%,rgba(180,223,91,1) 100%); background: -ms-linear-gradient(top,  rgba(180,223,91,1) 0%,rgba(180,223,91,1) 100%); background: linear-gradient(to bottom,  rgba(180,223,91,1) 0%,rgba(180,223,91,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#b4df5b\', endColorstr=\'#b4df5b\',GradientType=0 );}'
  + '.update-userscript p {font-size: 14px; line-height: 14px; padding: 5px 0;}'
  + '.update-userscript .bold {font-weight: bold;}'
  + '.update-userscript a {position: absolute; top: 0; left: 0; width: 100%; height: 24px;}'
, scriptIdentifier+'general');
headerComponents();

resize();

// If the script hasn't checked for an update in 12 hours, check for one (happens anytime the script is first opened)
if ((GM_getValue('timeSinceLastUpdateCheck', time()-43210)+43200) < time())
	checkVersion();

// register the handler
handlers['keypress'] = document.addEventListener('keydown', toggleHeader, false); 
