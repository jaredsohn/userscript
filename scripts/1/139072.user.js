// ==UserScript==
// @version        1.3
// @name           Add Gmail Subject With Unique Code
// @namespace      http://arl-consulting.com
// @description    Add Unique code (if not exists) to subject of each message you send
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// @grant          GM_setValue
// ==/UserScript==

// by Sergey Tuymetov, sergevic@gmail.com
// I used following scripts during writting this one
// http://userscripts.org/scripts/show/108040
// http://userscripts.org/scripts/review/86865

// SETTINGS
var restrictToDomain = false;
var domain = '@domain.com'; // this scripts works only if email links like 'user@domain.com' found in signature
var generatedCodeLength = 8;


// delay start so gmail plays nice
window.setTimeout(function() { main() }, 3000);
var globalCanvas;

/* find canvas and add listener */
function main()  {
    globalCanvas = document; //findCanvas();
    if (globalCanvas === undefined) { 
        return; 
    }
    
    prepareControls(globalCanvas);
    globalCanvas.addEventListener('click', function() { prepareControls(globalCanvas); }, false);
}

/* returns the main gmail iframe canvas */
function findCanvas() {
    var iframes = document.getElementsByTagName('iframe');
    var iframes_length = iframes.length;
    for(var i=0; i < iframes_length; i++) {
        var iframe = iframes[i];
        if (iframe.id == 'canvas_frame') {
            if ( iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
                return iframe.contentDocument;
            }
            return;
        }
    }
}

/* find send button and subject input field, add listeners */
function prepareControls(canvas) {
    var sendButtons = findSendButtons(canvas);
    if (sendButtons === undefined) {
        return; 
    }
    
    var input = findSubject(canvas);
    if (input === undefined) {
        return; 
    }
    //alert(input.value);
    
    // It is a very, very strange method to check if we already added
	// events to button or not. But it is the only method which works.
    if (canvas.getElementById('gab_attached')) return;
    
    for (var i = 0; i < sendButtons.length; i++) {
		var sendButton = sendButtons[i];
		var div = sendButton.ownerDocument.createElement('span');
		div.id = 'gab_attached';
		div.style.display = 'none';
		sendButton.parentNode.insertBefore(div, sendButton);
		addButtonEvents(sendButton, input); 
	}
}

function addButtonEvents(sendButton, input) {
    sendButton.addEventListener('mouseover', function() { AddCodeToSubject(input); }, false);
    sendButton.addEventListener('focus', function() { AddCodeToSubject(input); }, false);
}

function findSubject(canvas) {
    var inputs = canvas.getElementsByTagName('input');
    var inputs_length = inputs.length;
    for(var i=0; i < inputs_length; i++) {
        if (inputs[i].name == 'subject') {        
            return inputs[i];
        }
    }
}

function isAccountValid(canvas) {
    if (!restrictToDomain) return true;
    //alert(window.location.href);
    // search in message text any link with email and test against domain
    var iframes = canvas.getElementsByTagName('iframe');
    for(var i=0; i < iframes.length; i++) {
        //alert(iframes[i].src);
        if (iframes[i].src == '') { // do not try to access iframe from another sites, usually such iframes appears for Google Docs, Google Calendar and so on
            var links = iframes[i].contentDocument.getElementsByTagName('a');
            for(var j=0; j < links.length; j++) {
                if (links[j].text.indexOf(domain) != -1)
                    return true;
            }
        }
    }
    return false;
}

function findSendButtons(canvas) {
	var bs = canvas.getElementsByTagName('B');
	var buttons = [];
	for (var i = bs.length - 1; i >= 0; i--) {
		var e = bs[i].parentNode;
		var role = e.getAttribute('role');
		if (role == 'button' && e.parentNode.parentNode.getAttribute('role') == "navigation") {
			buttons.push(e); // this is either 'Send' button, or 'Send & Archive'
            buttons.push(e.nextSibling); // next button (either 'Send' or 'Save Now')
		}
	}
	return buttons;
}

/* update subject with unique code */ 
function AddCodeToSubject(input) {
    var regexp = new RegExp('\\s*\\[ARL Ref:.{8}\\]', 'ig');
    if (isAccountValid(globalCanvas))
    {
        // add code if it does not exist
        if (!regexp.test(input.value))
            input.value += ' [ARL Ref:' + generateUniqueCode() + ']';
    }
    else
    {
        // remove code if it was already added (it may be possible if you switch account from which mail should be send)
        input.value = input.value.replace(regexp, '');
    }
}

function generateUniqueCode() {
    var result = '';
    var numArr = new Array("0", "1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" ); // Add elements here
    for(var i=0; i<generatedCodeLength; i++) {
        result += numArr[Math.round((numArr.length-1)*Math.random())];
    }
    return result;
}