// ==UserScript==
// @name           Soccer Manager auto-login
// @namespace      SM_AutoLogin
// @description    Automatically log in to Soccer Manager then open all your teams in a new tab.
// @include        http://*.soccermanager.com/*
// @include        http://soccermanager.com/*
// ==/UserScript==

//Note: I realise that the server forwards requests from soccermanager.com to www. but I've included for future proof code incase
//      the server config changes.

//Using xpath purely to make it easier to update if the pages code is changed.
var links3 = $x("/html/body/div[3]/div[3]/table/tbody/tr/td[2]/table/tbody/tr/td[3]/a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE), $loggedIn = 3;
links3.forEach(function(links) {  // Loop over every anchor to check for signin/login links.

  switch (links.innerHTML) {
	case 'Login':
	case 'Sign Up':
	case 'Help':
		$loggedIn--;
		break;
	default:
		$loggedIn++;
  }
});
//Starting loggedIn at 3 and -1 everytime the links are at Login,Sign Up or Help should mean if we're not logged in it'll be at 0 worth wise 5.
//The value will not matter as long as it is > 0 to return a true value.


if (!$loggedIn) {
	//If we're not logged in, check if we already have the login credentials stored, if we do use them.
	if (typeof GM_getValue("username") != 'undefined') {
		//Grab the user/pass and submit fields, has to be complex like this because the index page is quite different from the other pages.
		var username   = $x("//input[@name='username']", XPathResult.FIRST_ORDERED_NODE_TYPE);
		var password   = $x("//input[@name='password']", XPathResult.FIRST_ORDERED_NODE_TYPE);
		var formSubmit = $x("//input[@name='submit' and @type='submit']", XPathResult.FIRST_ORDERED_NODE_TYPE);
		
		username.value = GM_getValue("username");
		password.value = GM_getValue("password");
		
		formSubmit.click();
	}
	//If we don't know the login credentials then change the login fields to on submit store the details for future use.
	else {
		var loginForm=$x("//input[@name='username']", XPathResult.FIRST_ORDERED_NODE_TYPE).parentNode;
		//loginForm.setAttribute('onsubmit', 'return false;');
		loginForm.addEventListener('blur', checkFormAndSave, false);
		//'var $a = login_form_check(this); if ($a) { GM_setValue("username",this.getElementsName("username")[0].nodeText); } return $a;');
	}
}
//If we are logged in and $loggedIn is true
else {
}

function checkFormAndSave() {
alert('entered');
		var username   = $x("//input[@name='username']", XPathResult.FIRST_ORDERED_NODE_TYPE);
alert(username.value);
		var password   = $x("//input[@name='password']", XPathResult.FIRST_ORDERED_NODE_TYPE);
		alert("User is "+username.value+" and password is "+password.value);
}
/*
function login_form_check(a){
	if(a.username.value==""){
		alert("Please enter a value for the Username (e-mail address) field.");
		a.username.focus();
		return(false)
	}
	if(!valid_email(a.username.value)){
		a.username.focus();
		return(false)
	}
	if(a.password.value==""){
		alert("Please enter a value for the Password field.");
		a.password.focus();
		return(false)
	}
	return true
}
function valid_email(a){
	if(a.indexOf("@") == -1 || a.indexOf(".") == -1){
		alert("Email addresses must contain one @ symbol and at least one dot");
		return false
	}
	var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'0123456789_-.@";
	var b=a;
	var c=true;
	for(i=0;i<b.length;i++){
		ch=b.charAt(i);
		if(e.indexOf(ch)==-1){
			alert('Please enter only letter, digit and "_-\'.@" characters in this email field.');
			return(false)
		}
	}
	return(true)
}
*/
/*
 * function $x() from http://wiki.greasespot.net/XPath_Helper to enable xpath in grease monkey.
 */
function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

 /*************************************************************************************\
| * Below is the Update Checker for userscripts.org                                     |
| * for more info on this script please see http://userscripts.org/scripts/review/20145 |
 \*************************************************************************************/
var SUC_script_num = 86371;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}