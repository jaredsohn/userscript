// PHURI - Click2Voice (call any phone for free)
// v1.02
// by Damian
// damian@click2voice.com
//
// Parse pages for matches on these patterns:
//  202-456-1111
//  (202) 456-1111
//  (202)456-1111
//  202-456-1111
//  202 456 1111
//  202.456.1111
//  202/456/1111
//  2024561111
//
// Create hyperlink for the Click2Voice webservice so that the user can call them for free with any phone they choose.
//
// ==UserScript==
// @description    Looks for phone numbers in pages and makes hyperlinks out of them. When clicking on the link, uses the free http://click2voice.com web service to make the call to the phone you are registered with and connects that phone with the number in the link that you clicked on.
// @name           PHURI - Click2Voice (call any phone for free)
// @include        *
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function linkInfo(evt) {
	var phUri	= evt.target
	phUri.setAttribute ("title", "Call [" + phUri.id + "] with [" + userPhone + "]");
}

function callCancel() {
	var c2vLogo = document.getElementById('c2vLogo');
	var settingsBar = document.getElementById('settingsBar');
	var callControlBox = document.getElementById('callControlBox');
	var callStatusDisplay = document.getElementById('callStatusDisplay');
	
 	c2vContainer.parentNode.removeChild(c2vContainer);
	c2vLogo.parentNode.removeChild(c2vLogo);
 	callControlBox.parentNode.removeChild(callControlBox);
 	callStatusDisplay.parentNode.removeChild(callStatusDisplay);
	settingsBar.parentNode.removeChild(settingsBar);
}

function toggleSettings() {
var e = document.getElementById('settingsBar').style
	if (!e.display) {
	  e.display = "block";
	  } else {
		e.display = "";
	}
}

function makeCall(evt) {
	destNum =  evt.target.id;
	window.open('http://click2voice.com/c2v_cti/call_functions.php?action=fcall&channel=' + userPhone + '&exten=' + destNum + '&user=' + username);
	callCancel();
}

function initCall(evt) {
	destNum = evt.target.id
	userPhone = GM_getValue('userPhone');
	userPhone = (String(userPhone).replace(/[\-\s\/\(\)\.]/g, ''));
	dUsername = GM_getValue('username');

	// look for a callControlBox on the page already
	callStatus = document.getElementById('callControlBox');

	// tell the user to finish with the current callControlBox 
	if (callStatus)	{
		callCancel();
		} else {


		c2vContainer = document.createElement('div');
		c2vContainer.id = 'c2vContainer';
		document.body.appendChild(c2vContainer);

		c2vLogo = document.createElement('div');
		c2vLogo.id = 'c2vLogo';
		c2vLogo.title = 'Click2Voice.';
		c2vLogo.innerHTML = '<embed src="http://click2voice.com/images/logo.swf" width="250" height="90" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>' ;
		c2vContainer.appendChild(c2vLogo);


		// create the call status display
		callStatusDisplay = document.createElement('div');
		callStatusDisplay.id = 'callStatusDisplay';
		callStatusDisplay.title = 'Clicking Yes will call this number, No will Cancel.';
		c2vContainer.appendChild(callStatusDisplay);
		
		callStatusText = document.createElement('div');
		callStatusText.id = 'callStatusText';
		callStatusText.title = 'Clicking Yes will call this number, No will Cancel.';
		callStatusText.innerHTML = 'Call <font color="#ccff00">' + destNum + '</font> right now?' ;
		callStatusDisplay.appendChild(callStatusText);


		// create the call control box and inject it at the end of the page
		callControlBox = document.createElement('div');
		callControlBox.id = 'callControlBox';
		callControlBox.title = 'Clicking Yes will call this number, No will Cancel.';
		callStatusDisplay.appendChild(callControlBox);
		
		c2vSettingsButton = document.createElement('div');
		c2vSettingsButton.title = 'Click to change your Click2Voice settings.';
		c2vSettingsButton.innerHTML = 'Settings' ;
		c2vSettingsButton.setAttribute('class', 'c2vSettingsButton');
		c2vSettingsButton.addEventListener("click", toggleSettings, false);
		callControlBox.appendChild(c2vSettingsButton);

		callCancelButton = document.createElement('div');
		callCancelButton.title = 'Click to cancel this number.';
		callCancelButton.innerHTML = 'No'
		callCancelButton.setAttribute('class', 'callCancelButton');
		callCancelButton.addEventListener("click", callCancel, false);
		callControlBox.appendChild(callCancelButton);
		
		callConfirmButton = document.createElement('div');
		callConfirmButton.id = destNum;
		callConfirmButton.title = 'Click to call this number.';
		callConfirmButton.setAttribute('class', 'callConfirmButton');
		callConfirmButton.addEventListener("click", makeCall, false)
		callConfirmButton.innerHTML = 'Yes'
		callControlBox.appendChild(callConfirmButton);
		

		// create the settings bar
		settingsBar = document.createElement('div');
		settingsBar.id = 'settingsBar';
		settingsBar.title = 'click to change settings';
		callControlBox.appendChild(settingsBar);
		
		
		phoneLabel = document.createElement('div');
		phoneLabel.id = 'userPhoneLabel';
		phoneLabel.innerHTML = 'phone:';
		settingsBar.appendChild(phoneLabel);

		phoneValue = document.createElement('div');
		phoneValue.id = 'userPhoneValue';
		phoneValue.innerHTML = userPhone;
		phoneValue.addEventListener('click', editPhoneInfo, false);  
		settingsBar.appendChild(phoneValue);


		userLabel = document.createElement('div');
		userLabel.id = 'usernameLabel';
		userLabel.innerHTML = 'username:';
		settingsBar.appendChild(userLabel);

		userValue = document.createElement('div');
		userValue.id = 'usernameValue';
		userValue.innerHTML = dUsername;
		userValue.addEventListener('click', editUserInfo, false);		
		settingsBar.appendChild(userValue);
	}
}

var userPhone = ''

if (!GM_getValue('userPhone')) {
	userPhone = prompt("Your 10 digit phone #");
	userPhone = (String(userPhone).replace(/[\-\s\/\(\)\.]/g, ''));
	GM_setValue('userPhone', userPhone);
} else {
	userPhone = GM_getValue('userPhone');
	userPhone = (String(userPhone).replace(/[\-\s\/\(\)\.]/g, ''));

}
var username = '';
if (!GM_getValue('username')) {
	username = prompt("Enter your Click2Voice username:");
	GM_setValue('username', username);
} else {
	dUsername = GM_getValue('username');
	username = 'agreaseymonkey';
}


function editPhoneInfo () {
	phoneValue = document.getElementById('userPhoneValue');
	settingsBar = document.getElementById('settingsBar')
	userPhone = GM_getValue('userPhone')
	userPhone = (String(userPhone).replace(/[\-\s\/\(\)\.]/g, ''));

	if (phoneValue) {
		phoneInput = document.createElement('input');
		phoneInput.id = 'phoneInput';	
		phoneInput.type = 'text';
		phoneInput.value = userPhone;
		phoneInput.addEventListener('blur', savePhoneInfo, false);  
		settingsBar.replaceChild(phoneInput, phoneValue); 
		phoneInput.focus();
	}		
}

function editUserInfo () {
	userValue = document.getElementById('usernameValue');
	settingsBar = document.getElementById('settingsBar')
	dUsername = GM_getValue('username')
	if (userValue) {
		usernameInput = document.createElement('input');
		usernameInput.id = 'usernameInput';	
		usernameInput.type = 'text';
		usernameInput.value = dUsername;
		usernameInput.addEventListener('blur', saveUserInfo, false);  
		settingsBar.replaceChild(usernameInput, userValue);
		usernameInput.focus();
	}		
}

function savePhoneInfo() {
	phoneInput = document.getElementById('phoneInput');
	input = phoneInput.value
	GM_setValue('userPhone',input);

	phoneValue = document.createElement('div');
	phoneValue.id = 'userPhoneValue';
	phoneValue.innerHTML = input;
	phoneValue.addEventListener('click', editPhoneInfo, false);
	settingsBar.replaceChild(phoneValue, phoneInput); 
}

function saveUserInfo() {
	usernameInput = document.getElementById('usernameInput');
	input = usernameInput.value
	GM_setValue('username',input);
	
	userValue = document.createElement('div');
	userValue.id = 'usernameValue';
	userValue.innerHTML = input;
	userValue.addEventListener('click', editUserInfo, false);
	settingsBar.replaceChild(userValue, usernameInput);
}

function clearUserInfo () {
	userPhone = prompt("Your 10 digit phone number: (example: 1234567890)");
	userPhone = (String(userPhone).replace(/[\-\s\/\(\)\.]/g, ''));
	GM_setValue('userPhone', userPhone);
	GM_setValue('username',prompt("Enter your Click2Voice username:",dUsername));
}

function clearUserPhone () {
	userPhone = prompt("Your 10 digit phone number: (example: 1234567890)");
	userPhone = (String(userPhone).replace(/[\-\s\/\(\)\.]/g, ''));
	GM_setValue('userPhone', userPhone);
}

function clearUsername () {
	GM_setValue('username',prompt("Enter your Click2Voice username:",dUsername));
}


GM_registerMenuCommand("change phone number: [" + userPhone + "]", clearUserPhone);
GM_registerMenuCommand("change click2voice user: [" + dUsername + "]", clearUsername);


(function () {
	const defaultPrefix= '';
	const trackRegex = /(?:\([2-9][0-8]\d\)\ ?|[2-9][0-8]\d[\- \.\/]?)[2-9]\d{2}[- \.\/]?\d{4}\b/g;
	function scanPage(t) {
		if (String(t).charAt(0)!= '+') t= defaultPrefix + String(t);
		var phoneNum=(String(t).replace(/[\-\s\/\(\)\.]/g, ''));
		return phoneNum;
	}
    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "nobr", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
        ];
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" + "]";
    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (trackRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;
            cand.parentNode.replaceChild(span, cand);
            trackRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = trackRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                var a = document.createElement("a");
								var number = scanPage(match[0]);
								var phone_icon = document.createElement("img");
								phone_icon.setAttribute("src", "http://click2voice.com/images/phuri/c2vlink_icon_a.gif");
								phone_icon.setAttribute("width", "11");
								phone_icon.setAttribute("height", "14");
								a.appendChild(phone_icon);
								a.setAttribute("class", "c2vLink");
								a.setAttribute("id", number)								
								a.addEventListener("click", initCall, false);
								a.addEventListener("mouseover", linkInfo, false);
								a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);
                lastLastIndex = trackRegex.lastIndex;
            }
            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }
})();

addGlobalStyle(
'a.c2vLink {'+
'cursor:pointer;' +
'padding:0px;'+
'color:#306eff;'+
'background:#ffffff;'+
'text-decoration:none;'+
'font-weight:bold;'+
'border:1px solid #dddddd;'+
'}'+

'a.c2vLink:hover {'+
'text-decoration:none;'+
'color:#333333;'+
'background:#ccff00;'+
'border:1px solid #3066ff;'+
'}' +


'#c2vContainer {' +
'  z-index: 99998;' +
'  position: fixed;' +
'  text-align: center;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: 50%;' +
'  top: auto;' +
'  margin: 0 auto;' +
'  border: 2px solid silver;' +
'  background: #000;' +
'  width: 377px;' +
'}' +

'#c2vLogo {' +
'  z-index: 99998;' +
'  position: relative;' +
'  text-align: center;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: auto;' +
'  top: auto;' +
'  margin: 0 auto;' +
'  border: 1px solid silver;' +
'  background: white;' +
'  width: 375px;' +
'}' +


'#callStatusDisplay {' +
'  clear: both;' +
'  z-index: 99998;' +
'  position: relative;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: auto;' +
'  top: auto;' +
'  margin: 0 auto;' +
'  border: 0px solid silver;' +
'  background: black;' +
'  color: white;' +
'  width: 375px;' +
'  font-family: Verdana, sans-serif;' +
'  font-size: 15px;' +
'}' +

'#callStatusText {' +
'  text-align: center;' +
'  color: #dddddd;' +
'  padding: 3px;' +
'}' +


'#callControlBox {' +
'  clear: both;' +
'  z-index: 99998;' +
'  position: relative;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: 0;' +
'  top: auto;' +
'  margin: 0 auto;' +
'  background: black;' +
'  color: white;' +
'  padding: 2px;' +
'  font-family: Verdana, sans-serif;' +
'  font-size: 15px;' +
'}' +

'#callControlBox .c2vSettingsButton {' +
'  float: left;' +
'  color: #fff;' +
'  font-size: 10px;' +
'  padding: 5px;' +
'  margin-top: 10px;' +
'  cursor: default;' +
'}' +
'#callControlBox .callConfirmButton {' +
'  float: right;' +
'  color: #555;' +
'  padding: 2px;' +
'  margin: 3px;' +
'  border: 1px solid #555;' +
'  background: #ccff00;' +
'  cursor: default;' +
'}' +
'#callControlBox .callCancelButton {' +
'  float: right;' +
'  color: #555;' +
'  border: 1px solid #555;' +
'  padding: 2px;' +
'  margin: 3px;' +
'  background: #ff5500;' +
'  cursor: default;' +
'}' +
'#callControlBox .c2vSettingsButton:hover {' +
'  color: #ccff00;' +
'  background: #555555;' +
'}' +
'#callControlBox .callConfirmButton:hover {' +
'  color: #eeeeee;' +
'  border: 1px solid #eeeeee;' +
'  background: #111111;' +
'}' +
'#callControlBox .callCancelButton:hover {' +
'  color: #eeeeee;' +
'  border: 1px solid #eeeeee;' +
'  background: #111111;' +
'}' +


'#settingsBar {' +
'  display: none;' +
'  clear: both;' +
'  z-index: 99999;' +
'  position: fixed;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: 0;' +
'  top: auto;' +
'  background: black;' +
'  color: white;' +
'  margin: 0 auto;' +
'  padding: 2px;' +
'  padding-left: 15px;' +
'  padding-right: 15px;' +
'  width: 350px;' +
'  font-family: Verdana, sans-serif;' +
'  font-size: 10px;' +
'}' +

'#settingsBar:hover {'+
'  background: #555;' +
'}' +

'#userPhoneLabel {' +
'  float: left;' +
'  color: #fff;' +
'  font-weight: bold;' +
'}' +
'#usernameLabel {' +
'  float: left;' +
'  color: #fff;' +
'  font-weight: bold;' +
'}' +

'#userPhoneValue {' +
'  float: left;' +
'  color: #ccff00;' +
'  margin-left: 3px;' +
'  margin-right: 10px;' +
'}' +
'#usernameValue {' +
'  float: left;' +
'  color: #ccff00;' +
'  margin-left: 3px;' +
'  margin-right: 10px;' +
'}' +

'#userPhoneValue:hover {' +
'  color: #ff0000;' +
'}' +
'#usernameValue:hover {' +
'  color: #ff0000;' +
'}' +

'#phoneInput {' +
'  float: left;' +
'  color: #ccff00;' +
'  background: black;' +
'  margin: 3px;' +
'  margin-right: 10px;' +
'  width: 100px;' +
'  font-family: Verdana, sans-serif;' +
'}' +
'#usernameInput {' +
'  float: left;' +
'  color: #ccff00;' +
'  background: black;' +
'  margin: 3px;' +
'  width: 100px;' +
'  font-family: Verdana, sans-serif;' +
'}' );