// ==UserScript==
// @name        Gmail Minimal
// @namespace   http://skoshy.com
// @include     https://mail.google.com/mail/u/*
// @version     1.0.2
// ==/UserScript==

/*
    Begin
*/

var currentVersion = '1.0.2';

var scriptIdentifier = 'gmailmin';
var scriptId = '178237';

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
				node.innerHTML = '<p>A new version ('+newVersion+') of <span class="bold">Gmail Minimal</span> is available! Click here to update from '+currentVersion+' to '+newVersion+'</p><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'"> </a>';
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
        addStyles('.aiw .qp {display: none !important;}'
            // For showing notifications when archiving things, etc
            + '.no {position: absolute;}'
            // Prevent above rule from making bottom boxes align to the left instead of right
            + '.dw .no {position: relative;}'
            // For showing notifications when archiving things, etc (keep at top of screen)
            + '.w-asV .b8 .vh, .w-asV .cc .vh, .w-asV .cd .vh {top: 0 !important;}'
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
addStyles('#thingsidfhgrhug {display:none;}'
  // Button sizes
  + ' .T-I {height: 21px !important; line-height: 21px !important; min-width: 0 !important;}'
, scriptIdentifier+'general');
headerComponents();

resize();

// If the script hasn't checked for an update in 12 hours, check for one (happens anytime the script is first opened)
if ((GM_getValue('timeSinceLastUpdateCheck', time()-43210)+43200) < time())
	checkVersion();

// register the handler
handlers['keypress'] = document.addEventListener('keydown', toggleHeader, false); 