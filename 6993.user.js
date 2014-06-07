// ==UserScript==
// @name            Multi-Page AutoLogin With Token
// @namespace       http://onemorebug.com/greasemonkey/multipageloginwithtoken.user.js
// @description     Automatically Log in to a site that requires a password login, and then a SECOND login with a VPN token + pin.  Prompts for the VPN token code.
// @include         https://mySecureSite.com/
// ==/UserScript==

(function (list, count) {
  var myCell = list[count];  //cant use pop() on a Collection!
  if( myCell.innerHTML.indexOf('Token username') != -1 ) {
    document.forms[0][1].value = 'userId';
    document.forms[0][2].value = 'vpnPin' + prompt('Enter code from token.');
    document.forms[0].submit();
    //      GM_log('token login page');
  } else if (list.length-1 == count) {
    document.forms[0][1].value = 'userId'; 
    document.forms[0][2].value = 'myPassword';
    document.forms[0].submit();
    //      GM_log('first page of form');
  } else {
    arguments.callee(list, ++count);
  }
})(document.getElementsByTagName('td'), 0);
  


  

