// ==UserScript==
// @name           My Brute Login Bot
// @description    Automatically logs in your brutes to My Brute sites mybrute.com, elbruto.es and labrute.fr
// @version        0.3.2
// @include        http://*.mybrute.com/login*
// @include        http://*.mybrute.com/cellule*
// @include        http://*.elbruto.es/login*
// @include        http://*.elbruto.es/cellule*
// @include        http://*.labrute.fr/login*
// @include        http://*.labrute.fr/cellule*
// @include        http://*.meinbrutalo.de/login*
// @include        http://*.meinbrutalo.de/cellule*
// ==/UserScript==

// Initialization
var myBrutes  = GM_getValue('my.brutes', false);
    myBrutes  = blank(myBrutes) ? [] : myBrutes.split(";");
var brute     = location.host.split(".")[0];
var page      = /^\/(\w*)/.exec(location.pathname)[1];
var isManaged = include(myBrutes, brute);

var autoRegister = GM_getValue('autoRegister', true);
GM_registerMenuCommand('Toggle Tournament auto-registration', toggleAutoRegister);

// Main logic
register();

window.addEventListener("load", autoLogin, false);

function autoLogin() {
  if (page == 'login') {
    if(isManaged)
      logIn();
    else
      manage();
  } else { // on cellule
    if(isManaged)
      checkLogin();
  }
}

// Core functions
function logIn() {
  var loginFailed = document.getElementsByClassName('error').length > 0;
  if(!loginFailed)
    document.forms[0].submit();
}

function checkLogin() {
  var notLoggedIn = document.querySelector("a[href='/login']");
  if(notLoggedIn)
    go('login');
}

function manage() {
  var hasNoPassword = blank(document.forms[0].elements[0].value);
  if(hasNoPassword) return;
  myBrutes.push(brute);
  GM_setValue('my.brutes', myBrutes.join(';'));
  logIn();
}

function register() {
  if(!isManaged || !autoRegister) return;
  var registerDiv = document.getElementById('tournament');
  if(!registerDiv) return;
  var registerLink = registerDiv.querySelector("a[href='/sub']");
  if(!registerLink) return;

  GM_xmlhttpRequest({
    url: '/sub', method: 'GET',
    onreadystatechange: function(response) {
      if(response.readyState != 2) return;
      with(registerDiv) {
        removeChild(children[2]);
        removeChild(children[1]);
        style.backgroundColor = '#DEEE9E';
        style.color = '#3A8B17';
      }
    }
  });
}

function toggleAutoRegister() {
  autoRegister = !autoRegister;
  GM_setValue('autoRegister', autoRegister);
  alert('Tournament auto-registration is now '+(autoRegister?'En':'Dis')+'abled.');
  register();
}

// Utils
function include(array, element) { return array.indexOf(element) != -1; }
function go(page) { location.pathname = page; }
function blank(string) { return string == '' }