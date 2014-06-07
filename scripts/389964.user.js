// ==UserScript==
// @name       Onai - SalesForce Login Screen
// @namespace  http://userscripts.onai.net/
// @version    0.7.0
// @description  Fixes the tiny login/username box on SalesForce new login pages
// @include           https://test.salesforce.com/*
// @include           https://login.salesforce.com/*
// @include           https://chg*.my.salesforce.com/*
// @include           https://chg*.visual.force.com/*
// @copyright  2013, kevin.gwynn@gmail.com
// ==/UserScript==

console.log('kgwynn salesforce tiny login tamper...');


// User ICON -- SalesForce seems to have removed this now --20130705 kag
//document.getElementById('user').style.display = 'none';
// User container DIV
var container = document.getElementById('usrn');
if (container == null) {
    container = document.getElementById('username').parentNode;
}
    
if (container != null) {
    container.style.width='355px';
    container.style.paddingLeft = '3px';
    container.style.position = 'relative';
    container.style.left = '-10px';
    container.value = 'kevin.gwynn@chghealthcare.com.';
    document.getElementById('login_wrapper').style.width='390px';
    
    // User INPUT
    document.getElementById('username').style.width = '340px';
    document.getElementById('username').style.display = 'block';
    window.setTimeout(function() {
        document.getElementById('username').select();
        document.getElementById('username').focus();
    }, 500);
    
    if (document.getElementById('clrUsr') != null) {
        document.getElementById('clrUsr').innerHTML = '';
        document.getElementById('clrUsr').style.width = '0px';
        document.getElementById('clrUsr').style.margin = '0px';
    }
}

// User ICON
// They finally got rid of the stupid icon
// J/k, it's back --2014.04.28 kag
var loginthumb = document.getElementById('loginthumb');
if (loginthumb != null) loginthumb.style.display = 'none';

// User INPUT
//document.getElementById('username').style.width = '345px';

document.getElementById('marketing').innerHTML = '';
document.getElementById('marketing').style.display = 'none';
