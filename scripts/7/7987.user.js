// ==UserScript==
// @name           GMail and Callwave
// @author	   Martin Grund
// @identifier     http://userscripts.org/scripts/source/7987.user.js
// @namespace      http://blog.grundprinzip.de/projekte
// @description    Sending SMS using Callwave directly from your gmail address book
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Version = 0.4;

// Define some consts mappings
const PHONE_SEND_FROM = 1;
const EMAIL_SEND_FROM = 2;
const LANGUAGE = 3;
const DATE_COUNTER = 4;
const DATE_SMS_COUNTER = 5;
const LAST_UPDATE = 6;

const MAX_SEND_PER_DAY = 5;
const SCRIPT_URL = "http://userscripts.org/scripts/source/7987.user.js";


const FIELD_ARRAY = {
	en : "Mobile:",
	de : "Mobile:",
	fr : "Mobile:",
};

const LANG_STRINGS_EN = {
	VERIFY_SETTINGS : "Your settings are not complete, please verify them!",
	NETWORK_FAILED: "Could not send SMS, please check your network connection", 
	SEND_FAILED: "Could not send SMS, please check the JavaScript log console",
 	SET_PHONE: "Please enter your phone number to use with Callwave",
	SET_MAIL: "Please enter the email addres to be used with Callwave",
	SET_LANG: "Please enter the language to use (en, de, fr)",
	RESET_SETTINGS: "Reset Callwave Settings",
	SEND: "Send",
	CANCEL: "Cancel",
}

const LANG_STRINGS_DE = {
	VERIFY_SETTINGS : "Ihre Einstellungen sind unvollständig, bitte überprüfen Sie diese",
	NETWORK_FAILED: "Die SMS konnte nicht versandt werden, bitte prüfen Sie die Netzwerkeinstellungen", 
	SEND_FAILED: "Die SMS konnte nicht gesendet werden. Bitte prüfen Sie die Meldung in der JavaScript Console",
  SET_PHONE: "Bitte geben Sie die Telefonnummer ein, die Sie für Callwave benutzen wollen:",
	SET_MAIL: "Bitte geben Sie die E-Mail Addresse ein, die für Callwave benutzt werden soll:",
	SET_LANG: "Bitte wählen Sie eine Sprache aus (en, de, fr)",
	RESET_SETTINGS: "Callwave Einstellungen zurücksetzen",
	SEND: "Senden",
	CANCEL: "Abbrechen"
}

var LANG_LIST = {
	en: LANG_STRINGS_EN,
	de: LANG_STRINGS_DE,
	fr: LANG_STRINGS_EN
};

var LANG_STRINGS = {};

// This is the base url for the destination to 
// call
var destination = "http://www.callwave.com/widgets/sms/proxy.aspx";
var dest2 = "http://smsPrimary0.callwave.com/smscwi";

// Parameters
var params_for_url = {
 phoneNumber: "",
 carrierId: -1, // for intl sms
 message: "",
 senderEmail: "",
 senderPhone: "",
 senderCarrierId: -1, //this is for intl sms
 sendFromPreference: 0, //use phone number as reply to
 src: "google_module",
 version: "1.4"
};

// Helper function to set an elements style 
// in a more convenient way.
function setStyle(element, style){
  var s = element.style;
  for (var prop in style){
   s[prop] = style[prop];
  }
  return element; 
}

// Return the list of elements matching 
// the given class name for an element.
function getElementByClassName(value){
  var all = unsafeWindow.document.getElementsByTagName("*");
  for (var i = 0; i< all.length; i++){
    if( all[i].className == value)
      return all[i];
  } 
}

// Format  a date by some rules that we can compare it
function getDateFormat(d){
	return "" + d.getYear() + d.getMonth() + d.getDate() + "";
}

String.prototype.strip = function(){
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

function autoUpdate(){
	// only check for updates one time a day
  var d = new Date();
    
  if (GM_getValue(LAST_UPDATE) == d.getDate()) {
        return;
  }
    
  GM_setValue(LAST_UPDATE,d.getDate());
    
  // check for update
  GM_xmlhttpRequest({
	method:"GET",
	url: SCRIPT_URL,
	onload:function(result) {
		var data = result.responseText;
		var sp = data.indexOf('const Version = ')+16;
		var ep = data.indexOf(';', sp);
		var ver = parseFloat(data.substring(sp, ep));	// get version number
		
		if ( ver > Version ) {		// current version is an old one
		alert( "New Version of'GMail and Callwave' available please check the website for the new download");
		//var elmInsertPoint = document.body;
		//var elmA = document.createElement("a");
		//elmA.setAttribute("href", SCRIPT_URL);
		//elmA.appendChild(document.createTextNode('There is a new version of the "Gmail and Callwave" userscript. Click here to install it'));
		//elmInsertPoint.insertBefore(elmA, elmInsertPoint.firstChild);
	}
	}
	});
}

// This is the Send message function. Used to send the real sms.
// it uses the GM_xmlhttpRequest method to send
// requests that may have a different domain.
function sendMessage(receiver, text){

	if (!checkSettings()){
		alert(LANG_STRINGS.VERIFY_SETTINGS);		
	}

  params_for_url["phoneNumber"] = receiver;
  params_for_url["message"] = text;
	params_for_url.senderEmail = GM_getValue( EMAIL_SEND_FROM );
	params_for_url.senderPhone = GM_getValue( PHONE_SEND_FROM );

  // Encode the message
  var string = dest2 + "?";
  for (var prop in params_for_url){
    string += prop + "=" + params_for_url[prop] + "&";
  }

  var ajax_url = destination + "?url=" + escape(string);

	// Use the priviliged xml http request
	var req = GM_xmlhttpRequest({
		method: "GET",
		url: ajax_url,
		onreadystatechange: function(e){
			if ( e.readyState == 4 && e.status == 200){
				var result = e.responseText;
				if (/<responseCode>OK<\/responseCode>/.test( result) ){
					GM_setValue(DATE_SMS_COUNTER, GM_getValue(DATE_SMS_COUNTER) + 1);
				} else {
					GM_log(result);
					alert( LANG_STRINGS.SEND_FAILED ); 
				}
				// Finally close the window
				closeMessageWindow();
			}
		},
	  onerror: function(){
			alert( LANG_STRINGS.NETWORK_FAILED );
		}
	});	
}


// This function is used to open a window to 
// send the sms
function openSendingWindow(receiver){
  var div = document.createElement("div");
  document.getElementsByTagName("body")[0].appendChild(div);

  div.id = "sms_window";
  setStyle(div, {
	  position: "absolute",
 	  width: "300px", height: "340px", 
	  top: "20%", left: "20%",
	  margin: "auto", background: "white", color: "#BA0C0B",
		border: "1px solid #BA0C0B"
	}); 
  div.style.opacity = 0.9;
  div.style.fontSize = "11pt";

	var img = document.createElement("img");
	img["src"] = "http://www.callwave.com/images/rebrand/callwave_logo_SM.gif"
	div.appendChild( img );

  // Now add the form wich is actually only a textbox and two buttons,
  // one for sending and the other for cancelling the request
  var area = document.createElement("textarea");
  setStyle(area, {
	  margin: "10px",
	  width: "280px",
	  height: "200px", border: "1px solid gray", color: "#BA0C0B"
	});
 area.id = "sms_text";
 div.appendChild(area);
 
 //links
 var send, cancel;
 send = document.createElement("a");
 send["href"] = "";
 setStyle(send,{
	  display: "block", width: "100px", padding: "10px", color: "#BA0C0B", fontWeight: "bold"
	});
 send.style.cssFloat = "left";
 send.innerHTML = LANG_STRINGS.SEND;
 send.addEventListener("click", function(e){
	sendMessage( receiver.strip(), document.getElementById("sms_text").value);
	
	e.cancelBubble = true;
	e.preventDefault();
	e.stopPropagation();
	}, false)
 div.appendChild(send);

 cancel= document.createElement("a");
 cancel["href"] = "";
 setStyle(cancel,{
	  display: "block", width: "100px", padding: "10px",
	  textAlign: "right", color: "#BA0C0B", fontWeight: "bold"
	});
 cancel.style.cssFloat = "right";
 cancel.innerHTML = LANG_STRINGS.CANCEL;

 // Register the Event Listener to close
 cancel.addEventListener("click", function(e){
	closeMessageWindow();
	
	e.cancelBubble = true;
	e.preventDefault();
	if (e.stopPropagation) e.stopPropagation();
	}, false)
 div.appendChild(cancel);

	// Append the messages left text to the
  // window
	div.appendChild(setStyle(document.createElement("br"),{clear: "both"}));
	var p = document.createElement("p");
	setStyle(p, { fontSize: "9pt", textAlign: "center", color: "#BA0C0B"});
	p.innerHTML = "You have " + (MAX_SEND_PER_DAY - GM_getValue(DATE_SMS_COUNTER)  * 1) + 
			" SMS for today left";
	div.appendChild(p);
}

function closeMessageWindow(){
  var div = document.getElementById("sms_window");
  div.parentNode.removeChild(div); 
}


// Using this function the settings for the current user will be set.
// In a basic way it does parameter checking and re-calls
// the method
function setSettings(){
	var res = prompt(LANG_STRINGS.SET_PHONE);
	if (res && res != ""){
		GM_setValue(PHONE_SEND_FROM, res);
	} else {
		//setSettings();
	}

	res = prompt(LANG_STRINGS.SET_MAIL);
	if (res && res != ""){
		GM_setValue(EMAIL_SEND_FROM, res);
	} else {
		//setSettings();
	}

	res = prompt(LANG_STRINGS.SET_LANG);
	if (res && res.length == 2){
		GM_setValue(LANGUAGE, res);
	} else {
		//setSettings();
	}
}

function checkSettings() {
	var flag = true;
	flag = GM_getValue(PHONE_SEND_FROM) != "";
	flag = GM_getValue(EMAIL_SEND_FROM) != "";
	flag = GM_getValue(LANGUAGE) != "" && GM_getValue( LANGUAGE ) == ("de" || "en" || "fr");
	return flag;
}

//Define the callback, to check if we are on a contact page
// This is the start page. It regularly checks the page for 
// the element we need. if this element is available it registers
// itself in the dom tree and returns.
function find_contact_entry()
{
  // FInd the list
  var elem = getElementByClassName( "cti" ); 
  if (elem){
    
    var children = elem.childNodes;
    var table;
    for (var j=0;j<children.length;j++){
      if (children[j].tagName == "TABLE"){
        table = children[j]; break;
      }
    }

    var found = false;
    var clist = table.getElementsByTagName("*");
    for (var i=0; i<clist.length; i++){
      if (!found && clist[i].className == "ctlf"){
      	if (!found && clist[i].innerHTML == FIELD_ARRAY.en){
          found = true;
        }  
      } else if (found && clist[i].className == "ctrf") {
				// This is the mobile number that we have. The next step is to
				// open a window and send the sms
				var number = clist[i].innerHTML;
				var a = unsafeWindow.document.createElement("a");
				a["href"] = "";
				a.addEventListener("click", function(e){
					openSendingWindow(number);
					e.preventDefault();
					e.stopPropagation();
				}, false);
				a.innerHTML = "SMS"
				clist[i].appendChild(unsafeWindow.document.createTextNode(" "));
				clist[i].appendChild(a);
				found = false;
			}
		}
	} else {
		setTimeout( find_contact_entry, 1000);
	}
}



// Set the language strings
if (GM_getValue(LANGUAGE)){
	LANG_STRINGS = LANG_LIST[GM_getValue(LANGUAGE)];
} else {
	LANG_STRINGS = LANG_LIST["en"];
}

autoUpdate();

// Set the default settings for the app
if (!GM_getValue(PHONE_SEND_FROM)){
	setSettings();
}

// Entrypoint for the whole app
setTimeout(find_contact_entry, 1000);

GM_registerMenuCommand(LANG_STRINGS.RESET_SETTINGS, setSettings);

// Check to what date the date counter is set. This
// pref value is used to check how many SMS the user can
// still send for this day
if (!GM_getValue(DATE_COUNTER)){
	GM_setValue(DATE_COUNTER, getDateFormat( new Date() ) );
	GM_setValue( DATE_SMS_COUNTER, 0 );
} else {
  var res = GM_getValue( DATE_COUNTER );	
	if (res < getDateFormat( new Date() ) * 1 ){
		GM_setValue( DATE_COUNTER, getDateFormat( new Date() ) );
		GM_setValue( DATE_SMS_COUNTER, 0 );
	}
}
