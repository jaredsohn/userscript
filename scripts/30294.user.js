// ==UserScript==
// @name           Friend & Foe Highlighter
// @namespace      pardus.at
// @description    Highlights Friends and Foes on the Nav screen
// @include        http://*.pardus.at/main.php*
// @include        http://*.pardus.at/diplomacy.php*
// @include        http://*.pardus.at/statistics.php*
// @author         Rhindon
// @version        3.0
// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

var daysToKeepCookies = 9999;
var foeColor = 'orange';
var friendColor = 'green';

var foeIndicator = '! ';
var friendIndicator = '* ';

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value,days) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readCookie(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function eraseCookie(name) {
	createCookie(name,"~~~DELETED~~~");
}

// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////


// Get Friends and Foes automatically
if(document.URL.indexOf('diplomacy.php') >= 0) {

  var friends = "";
  var foes = "";
  
  selects = document.getElementsByTagName('select');
  
  
  
  for(i = 0; i < selects.length; i++) {
  
    if(selects[i].parentNode.name == 'dipl_foe') {
      
      for(j = 0; j < selects[i].options.length; j++) {
        foes += '~' + selects[i].options[j].text + '~';
      }
      
    }

    if(selects[i].parentNode.name == 'dipl_friend') {

      for(j = 0; j < selects[i].options.length; j++) {
        friends += '~' + selects[i].options[j].text + '~';
      }

    }
  
  }
  
  createCookie('friends', friends, daysToKeepCookies);
  createCookie('foes', foes, daysToKeepCookies);

}


//Get Friends and Foes Automatically from Advanced Page
if(document.URL.indexOf('diplomacy_adv.php') >= 0) {
  
  //TODO

}

//Update the look of the user names on the Nav screen
if(document.URL.indexOf('main.php') >= 0) {
  
  foes = readCookie('foes');
  friends = readCookie('friends');
  
//  if(foes == null || friends == null) return;

  var as = document.getElementsByTagName('a');
  var alertText = "";

  for(i = 0; i < as.length; i++){

    if(foes && foes.indexOf('~' + as[i].innerHTML + '~') >= 0) {
      as[i].innerHTML = foeIndicator + as[i].innerHTML;
      as[i].style.color = foeColor;
    }
    
    if(friends && friends.indexOf('~' + as[i].innerHTML + '~') >= 0) {
      as[i].innerHTML = friendIndicator + as[i].innerHTML;
      as[i].style.color = friendColor;
    }
  }
}