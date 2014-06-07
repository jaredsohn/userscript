// ==UserScript==
// @name           Browser-Utils
// @namespace      *
// @include        *
// @author         hyo1411
// ==/UserScript==

//1. ctr+-> next page in a thread
//   ctr+-< prev page in a thread
//
//2. Remove voz redirect page when navigating to other links outside voz
function HotkeyManagment () {
    this.isParsed = false;
    this.parseDocument = function() {
        if (this.isParsed) {
            return;
        }
        allNextAnchors = document.evaluate(
                "//*[a='>']/a",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
        allPrevAnchors = document.evaluate(
                "//*[a='<']/a",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);        

        if (allNextAnchors.snapshotLength > 0) {
            this.nextAnchor = allNextAnchors.snapshotItem(0);
        }
        
        if (allPrevAnchors.snapshotLength > 0) {
            this.prevAnchor = allPrevAnchors.snapshotItem(0);
        }
        this.isParsed = true;
    }
    
	function gotoAnchorHref(anchor) {
		if (typeof anchor != 'undefined') {
			document.location = anchor.href;
		}
	}
	
	this.next = function() {
        this.parseDocument();
		gotoAnchorHref(this.nextAnchor);
	}
	
	this.prev = function() {
        this.parseDocument();
		gotoAnchorHref(this.prevAnchor);
	}
}

var hotkeyManager = new HotkeyManagment();

document.addEventListener('keyup', function(event) { 
	if (event.ctrlKey == true) {
		if (event.keyCode == 39) { 
			// next
			hotkeyManager.next();
		} else if (event.keyCode == 37) {
			// prev
			hotkeyManager.prev();
		}
	}
}, true);


/**************************************************************************/
// replace all link that need confirmation
var REDIRECT_TOKEN = "http://vozforums.com/redirect/index.php?link=";
var REDIRECT_TOKEN_LENGHT = REDIRECT_TOKEN.length;

allRedirectAnchor = document.evaluate(
		"//a[starts-with(@href, '/redirect/index.php?link=')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
for (var i = 0; i < allRedirectAnchor.snapshotLength; i++) {
	thisAnchor = allRedirectAnchor.snapshotItem(i);
	if (thisAnchor.href.indexOf(REDIRECT_TOKEN) == 0) {
		thisAnchor.href = unescape(
				thisAnchor.href.substr(REDIRECT_TOKEN_LENGHT));
	}
}

document.addEventListener('click', function(event) { 
    if (event.target.href && event.target.href.indexOf(REDIRECT_TOKEN) == 0) {
        event.target.href = unescape(
				event.target.href.substr(REDIRECT_TOKEN_LENGHT))
    }
}, true);