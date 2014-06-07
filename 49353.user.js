// ==UserScript==
// @name            WolframAlphaQuickSearch
// @author          darkyndy
// @description     WolframAlpha on every page, quick search
// @include         *
// @exclude         *wolframalpha.com*
// @version         1.00
// ==/UserScript==

/*
ChangeLog
version 1.00
- add a search box for Wolfram Alpha
- the box will follow you as you scroll the page
*/

function availableScreen(){
  var availWidth = window.innerWidth;
  var availHeight = window.innerHeight;
  var availSize = [availWidth, availHeight];
  return availSize;
}

var availScreen = availableScreen();
var topQuick = availScreen[1]-70; //set x offset of box in pixels
var leftQuick = availScreen[0]-250; //set y offset of box in pixels
var verticalpos="fromtop";

// Add styles BEGIN
function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle('.wolframFormBox { background: #FED36E; width: 205px; position: fixed; margin:0px; border:0px; z-index:99; display:block; text-align:left;line-height:14px; font-size:10px; font-style:normal; color:#000000; top: '+topQuick+'px; left: '+leftQuick+'px;} #calculate { height:50px; margin-bottom:5px; position:relative; width:200px; z-index:100;} .wolframInput{ border:0px; font-size:13px; font-size-adjust:none; font-stretch:normal; font-style:normal; font-variant:normal; font-weight:normal; line-height:16px; margin:9px 0 0 12px; outline-style:none; outline-width:medium; vertical-align:middle; width:150px; z-index:100; } #equal { background: transparent; cursor:pointer; border:0 none; font-size:14px; height:30px; width:15px; margin:auto 0; overflow:hidden; position:absolute; right:11px; top:0px; } #input { border:1px #000000 dotted; height:36px; margin:0 auto; padding:0; position:relative; top:30%; width:195px; z-index:100;}');
// Add styles END

insertForm();

function insertForm(){
  var formHTML = "<form id=\"calculate\" accept-charset=\"UTF-8\" class=\"\" action=\"http:\/\/www.wolframalpha.com\/input\/\" method=\"get\"><fieldset id=\"input\"><input type=\"text\" value=\"\" maxlength=\"200\" name=\"i\" class=\"wolframInput\" \/><input type=\"submit\" id=\"equal\" title=\"compute\" value=\"=\" \/><\/fieldset><\/form>";
  var wolframNewElement = document.createElement('div');
  wolframNewElement.setAttribute('id', 'wolframQuickSearch');
  wolframNewElement.setAttribute('class', 'wolframFormBox');
  
  wolframNewElement.innerHTML = formHTML;
  var body = document.getElementsByTagName('body')[0];
  if (!body) { return; }
  body.appendChild(wolframNewElement);
}