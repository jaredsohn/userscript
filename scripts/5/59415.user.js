// ==UserScript==
// @name           twitter account switcher
// @revision       9
// @author         KID a.k.a. blueberrystream
// @description    Twitterのログインフォームをドロップダウンリストにしちゃいます。
// @namespace      http://kid0725.usamimi.info
// @include        http*://twitter.com/
// @include        http*://twitter.com/#!/login*
// @include        http*://dev.twitter.com/login*
// ==/UserScript==

void(function() {

// アカウント設定
var ACCOUNTS = new Array();
ACCOUNTS.push("account1:password1");
ACCOUNTS.push("account2:password2");

// アカウント名を選んだときにログインボタンを押すことにするかどうか(true: する, false: しない)
var LOGIN_BUTTON_AUTO_CLICK = true;
// 「次回から入力を省略」チェックボックスを自動的にONにする(true: する, false: しない)
var REMEMBER_CHECKBOX_AUTO_ON = true;


////// こっから先は変えないでください ////////////////////////////////////////////////////////////////////////////////
var USERNAME = 'session[username_or_email]';
var PASSWORD = 'session[password]';
var REMEMBER = 'remember_me';
var SITES = [
  'twitter.com/#!/login',
  'dev.twitter.com/login',
  'twitter.com',
];

var site = -1;
for (var i = 0; i < SITES.length; i++) {
  if (-1 < location.href.indexOf(SITES[i])) {
    site = i;
    break;
  }
}
var index = -1;
var formIndex = -1;
switch (site) {
  case 0: // twitter.com/#!/login
    index = 2;
    formIndex = 6;
    break;
  case 1: // dev.twitter.com/login
    index = 0;
    formIndex = 1;
    break;
  case 2: // twitter.com
    index = 1;
    formIndex = 2;
    break;
  default:
    break;
}

var timerId = window.setInterval(check, 200);

function check() {
  if (byName(USERNAME)[index]) {
    window.clearInterval(timerId);
    insert();
  }
}

function insert() {
  var usernameInput = byName(USERNAME)[index];
  var passwordInput = byName(PASSWORD)[index];
  var rememberCheckbox = byName(REMEMBER)[index];
  var usernameInputParent = usernameInput.parentNode;

  usernameInput.style.display = 'none';

  var selectStyle = '';
  switch (site) {
    case 0: // twitter.com/#!/login
      selectStyle += 'width: 310px;';
      selectStyle += 'height: 34px;';
      selectStyle += 'font-size: 18px;';
      selectStyle += 'border-color: #999;';
      selectStyle += '-moz-border-radius: 3px;';
      selectStyle += '-webkit-border-radius: 3px;';
      selectStyle += '-o-border-radius: 3px;';
      selectStyle += 'border-radius: 3px;';
      selectStyle += 'border: 1px solid #CCC;';
      selectStyle += 'font: 13px Arial,sans-serif;';
      selectStyle += 'padding: 6px 6px 4px;';
      break;
    case 1: // dev.twitter.com/login
      selectStyle += 'margin: 0;';
      selectStyle += 'width: 174px;';
      selectStyle += 'border: 1px solid #CCC;';
      selectStyle += 'font: 14px "Helvetica Neue",Helvetica Neue,Helvetica,Arial,sans-serif;';
      selectStyle += 'padding: 5px 10px;';
      selectStyle += '-moz-border-radius: 5px;';
      selectStyle += '-webkit-border-radius: 5px;';
      selectStyle += '-o-border-radius: 5px;';
      selectStyle += 'border-radius: 5px;';
      selectStyle += 'background: white;';
      break;
    case 2: // twitter.com
      selectStyle += 'width: 116px;';
      selectStyle += 'height: 28px;';
      selectStyle += 'font-size: 13px;';
      selectStyle += 'padding: 6px;';
      selectStyle += '-moz-border-radius: 3px;';
      selectStyle += '-webkit-border-radius: 3px;';
      selectStyle += '-o-border-radius: 3px;';
      selectStyle += 'border-radius: 3px;';
      selectStyle += 'border: 1px solid #CCC;';
      selectStyle += 'font: 13px Arial,sans-serif;';
      selectStyle += 'border: none!important;';
      selectStyle += '-webkit-box-shadow: 0 -1px 0 rgba(0, 0, 0, .3),inset 0 1px 2px rgba(0, 0, 0, .2);';
      selectStyle += '-moz-box-shadow: 0 -1px 0 rgba(0, 0, 0, .3),inset 0 1px 2px rgba(0, 0, 0, .2);';
      selectStyle += '-o-box-shadow: 0 -1px 0 rgba(0, 0, 0, .3),inset 0 1px 2px rgba(0, 0, 0, .2);';
      selectStyle += 'box-shadow: 0 -1px 0 rgba(0, 0, 0, .3),inset 0 1px 2px rgba(0, 0, 0, .2);';
      selectStyle += 'background-color: white;';
      selectStyle += 'color: #567792;';
      selectStyle += 'opacity: .7;';
      selectStyle += '-webkit-transition: opacity 1s;';
      selectStyle += '-moz-transition: opacity 1s;';
      selectStyle += '-o-transition: opacity 1s;';
      selectStyle += 'transition: opacity 1s;';
      break;
    default:
      break;
  }

  var selectOnchange = '';
  selectOnchange += 's=document.getElementById("__TAS_INSERTED_SELECT__");';
  selectOnchange += 'o=s.options[s.selectedIndex];';
  selectOnchange += 'document.getElementsByName("' + USERNAME + '")[' + index + '].value=o.innerHTML;';
  selectOnchange += 'document.getElementsByName("' + PASSWORD + '")[' + index + '].value=o.value;';
  if (LOGIN_BUTTON_AUTO_CLICK) {
    selectOnchange += 'f=document.forms[' + formIndex + '];';
    selectOnchange += 'if(f){f.submit();}';
  }

  var select = document.createElement('select');
  select.setAttribute('id', '__TAS_INSERTED_SELECT__');
  select.setAttribute('style', selectStyle);
  select.setAttribute('onchange', selectOnchange);
  usernameInputParent.appendChild(select);

  select = byId('__TAS_INSERTED_SELECT__');
  for (i = 0; i < ACCOUNTS.length; i++) {
    var option = document.createElement('option');
    option.innerHTML = ACCOUNTS[i].split(':')[0];
    option.value = ACCOUNTS[i].split(':')[1];
    select.appendChild(option);
  }

  usernameInput.value = ACCOUNTS[0].split(':')[0];
  passwordInput.value = ACCOUNTS[0].split(':')[1];

  if (rememberCheckbox) {
    rememberCheckbox.checked = REMEMBER_CHECKBOX_AUTO_ON;
  }
}

function byId(id, parent) {
  var e = parent ? parent : document;
  return e.getElementById(id);
}
function byClass(className, parent) {
  var e = parent ? parent : document;
  return e.getElementsByClassName(className);
}
function byTag(tagName, parent) {
  var e = parent ? parent : document;
  return e.getElementsByTagName(tagName);
}
function byName(name, parent) {
  var e = parent ? parent : document;
  return e.getElementsByName(name);
}

})();