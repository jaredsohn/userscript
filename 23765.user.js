// ==UserScript==
// @name           CentSports Auto Login
// @namespace      http://centsports.com
// @description    Keeps you logged in
// @include        http://*centsports.com/*
// @exclude        http://*centsports.com/forum/*
// ==/UserScript==


//alert(document.location)

var loc = document.location.pathname

  
// we are on the login page
if (loc.indexOf('login.php') > -1){
    var passwordInput = document.getElementById('password');
    var loginInput = document.getElementById('default_text');

  //  We have a stored login and password
  if (GM_getValue('cslogin') && GM_getValue('csPassword')){
    allDivs = document.evaluate("//input[@type='submit'][@name='Submit']",
              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      
      var bSubmit = allDivs.snapshotItem(0)
      passwordInput.value = GM_getValue('csPassword')
      loginInput.value = GM_getValue('cslogin') 
      GM_setValue('goto', GM_getValue('page'))  
      bSubmit.click()   
  }

    //  Nothing stored - so we want to capture the submit and save login and pword  
  else {
    document.addEventListener('click', function(event) {
      var password = passwordInput.value;
      var login = loginInput.value;
      GM_setValue('cslogin', login)
      GM_setValue('csPassword', password) 
    }, true);
  }
  
}
else if (GM_getValue('goto') && GM_getValue('goto').length > 0) {
  //Not on the login page  - so we goto the last stored click
  document.location.pathname = GM_getValue('goto');
  GM_setValue('goto', '')
}
else {
  //store the page location after we arrive
  GM_setValue('page', loc)
}

// Capture the click - this allows us to redirect on the case when
//    we click a click but have timed out
document.addEventListener('click', captureGoTo, true)


function captureGoTo(e){
   var tagType  =  e.target.tagName
   if (tagType == 'A' && e.target.href.indexOf('logout') == -1){
     GM_setValue('goto', GM_getValue(e.target.href))  
   }
   if (tagType == 'A' && e.target.href.indexOf('logout') != -1){
    GM_setValue(csLogin, '')
    GM_setValue(csPassword, '')
   }
}



/******************************************************************************
 *   Normal self plug header
******************************************************************************/ 
if( ! document.getElementById('poweredBy')) {
    var poweredBy = document.createElement('div')
    poweredBy.style.position = 'fixed'
    poweredBy.id = 'poweredBy'
    poweredBy.style.backgroundColor = 'transparent'
    poweredBy.innerHTML = 'Like my scripts?  Become my  <a href="http://www.centsports.com/crony_invite_action.php?master_id=19322"> cronie.</a> - Puttzy'
    document.body.insertBefore(poweredBy, document.body.firstChild);
}
