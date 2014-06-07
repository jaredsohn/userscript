// ==UserScript==
// @name        Virtual Keyboard bugFIX
// @copyright   2007+, GreyWyvern (http://www.greywyvern.com/code/javascript/keyboard)
// @namespace   http://www.greywyvern.com/
// @version     1.46
// @description Adds a virtual keyboard to text fields, password fields and textareas allowing keyboardless input of text and special characters.  Install the script and double-click on one of the form element types above to display the keyboard.
// @license     BSDL; http://www.opensource.org/licenses/bsd-license.php
// ==/UserScript==

  /* ***** Add stylesheet ****************************************** */
  var VKI_link = document.createElement('style');
      VKI_link.setAttribute('rel', "stylesheet");
      VKI_link.setAttribute('type', "text/css");
      VKI_link.innerHTML = "#keyboardInputMasterUserScript {\
  position:absolute;\
  font:normal 11px Arial,sans-serif;\
  border-top:1px solid #eeeeee;\
  border-right:1px solid #888888;\
  border-bottom:1px solid #444444;\
  border-left:1px solid #cccccc;\
  -webkit-border-radius:0.6em;\
  -moz-border-radius:0.6em;\
  border-radius:0.6em;\
  -webkit-box-shadow:0px 2px 10px #444444;\
  -moz-box-shadow:0px 2px 10px #444444;\
  box-shadow:0px 2px 10px #444444;\
  opacity:0.95;\
  filter:alpha(opacity=95);\
  background-color:#dddddd;\
  text-align:left;\
  z-index:1000000;\
  width:auto;\
  height:auto;\
  min-width:0;\
  min-height:0;\
  margin:0px;\
  padding:0px;\
  line-height:normal;\
  -moz-user-select:none;\
  cursor:default;\
}\
#keyboardInputMasterUserScript * {\
  position:static;\
  color:#000000;\
  background:transparent;\
  font:normal 11px Arial,sans-serif;\
  width:auto;\
  height:auto;\
  min-width:0;\
  min-height:0;\
  margin:0px;\
  padding:0px;\
  border:0px none;\
  outline:0px;\
  vertical-align:baseline;\
  line-height:1.3em;\
}\
#keyboardInputMasterUserScript.keyboardInputSize1,\
#keyboardInputMasterUserScript.keyboardInputSize1 * {\
  font-size:9px;\
}\
#keyboardInputMasterUserScript.keyboardInputSize3,\
#keyboardInputMasterUserScript.keyboardInputSize3 * {\
  font-size:13px;\
}\
#keyboardInputMasterUserScript.keyboardInputSize4,\
#keyboardInputMasterUserScript.keyboardInputSize4 * {\
  font-size:16px;\
}\
#keyboardInputMasterUserScript.keyboardInputSize5,\
#keyboardInputMasterUserScript.keyboardInputSize5 * {\
  font-size:20px;\
}\
\
#keyboardInputMasterUserScript thead tr th {\
  padding:0.3em 0.3em 0.1em 0.3em;\
  background-color:#999999;\
  white-space:nowrap;\
  text-align:right;\
  -webkit-border-radius:0.6em 0.6em 0px 0px;\
  -moz-border-radius:0.6em 0.6em 0px 0px;\
  border-radius:0.6em 0.6em 0px 0px;\
}\
#keyboardInputMasterUserScript thead tr th div {\
  float:left;\
  font-size:130% !important;\
  height:1.3em;\
  font-weight:bold;\
  position:relative;\
  z-index:1;\
  margin-right:0.5em;\
  cursor:pointer;\
  background-color:transparent;\
}\
#keyboardInputMasterUserScript thead tr th div ol {\
  position:absolute;\
  left:0px;\
  top:90%;\
  list-style-type:none;\
  height:9.4em;\
  overflow-y:auto;\
  overflow-x:hidden;\
  background-color:#f6f6f6;\
  border:1px solid #999999;\
  display:none;\
  text-align:left;\
  width:12em;\
}\
#keyboardInputMasterUserScript thead tr th div ol li {\
  padding:0.2em 0.4em;\
  cursor:pointer;\
  white-space:nowrap;\
  width:12em;\
}\
#keyboardInputMasterUserScript thead tr th div ol li.selected {\
  background-color:#ffffcc;\
}\
#keyboardInputMasterUserScript thead tr th div ol li:hover,\
#keyboardInputMasterUserScript thead tr th div ol li.hover {\
  background-color:#dddddd;\
}\
#keyboardInputMasterUserScript thead tr th span,\
#keyboardInputMasterUserScript thead tr th strong,\
#keyboardInputMasterUserScript thead tr th small,\
#keyboardInputMasterUserScript thead tr th big {\
  display:inline-block;\
  padding:0px 0.4em;\
  height:1.4em;\
  line-height:1.4em;\
  border-top:1px solid #e5e5e5;\
  border-right:1px solid #5d5d5d;\
  border-bottom:1px solid #5d5d5d;\
  border-left:1px solid #e5e5e5;\
  background-color:#cccccc;\
  cursor:pointer;\
  margin:0px 0px 0px 0.3em;\
  -webkit-border-radius:0.3em;\
  -moz-border-radius:0.3em;\
  border-radius:0.3em;\
  vertical-align:middle;\
  -webkit-transition:background-color .15s ease-in-out;\
  -o-transition:background-color .15s ease-in-out;\
  transition:background-color .15s ease-in-out;\
}\
#keyboardInputMasterUserScript thead tr th strong {\
  font-weight:bold;\
}\
#keyboardInputMasterUserScript thead tr th small {\
  -webkit-border-radius:0.3em 0px 0px 0.3em;\
  -moz-border-radius:0.3em 0px 0px 0.3em;\
  border-radius:0.3em 0px 0px 0.3em;\
  border-right:1px solid #aaaaaa;\
  padding:0px 0.2em 0px 0.3em;\
}\
#keyboardInputMasterUserScript thead tr th big {\
  -webkit-border-radius:0px 0.3em 0.3em 0px;\
  -moz-border-radius:0px 0.3em 0.3em 0px;\
  border-radius:0px 0.3em 0.3em 0px;\
  border-left:0px none;\
  margin:0px;\
  padding:0px 0.3em 0px 0.2em;\
}\
#keyboardInputMasterUserScript thead tr th span:hover,\
#keyboardInputMasterUserScript thead tr th span.hover,\
#keyboardInputMasterUserScript thead tr th strong:hover,\
#keyboardInputMasterUserScript thead tr th strong.hover,\
#keyboardInputMasterUserScript thead tr th small:hover,\
#keyboardInputMasterUserScript thead tr th small.hover,\
#keyboardInputMasterUserScript thead tr th big:hover,\
#keyboardInputMasterUserScript thead tr th big.hover {\
  background-color:#dddddd;\
}\
\
#keyboardInputMasterUserScript tbody tr td {\
  text-align:left;\
  padding:0.2em 0.3em 0.3em 0.3em;\
  vertical-align:top;\
}\
#keyboardInputMasterUserScript tbody tr td div {\
  text-align:center;\
  position:relative;\
  zoom:1;\
}\
#keyboardInputMasterUserScript tbody tr td table {\
  white-space:nowrap;\
  width:100%;\
  border-collapse:separate;\
  border-spacing:0px;\
}\
#keyboardInputMasterUserScript tbody tr td#keyboardInputNumpad table {\
  margin-left:0.2em;\
  width:auto;\
}\
#keyboardInputMasterUserScript tbody tr td table.keyboardInputCenter {\
  width:auto;\
  margin:0px auto;\
}\
#keyboardInputMasterUserScript tbody tr td table tbody tr td {\
  vertical-align:middle;\
  padding:0px 0.45em;\
  white-space:pre;\
  height:1.8em;\
  font-family:'Lucida Console','Arial Unicode MS',monospace;\
  border-top:1px solid #e5e5e5;\
  border-right:1px solid #5d5d5d;\
  border-bottom:1px solid #5d5d5d;\
  border-left:1px solid #e5e5e5;\
  background-color:#eeeeee;\
  cursor:default;\
  min-width:0.75em;\
  -webkit-border-radius:0.2em;\
  -moz-border-radius:0.2em;\
  border-radius:0.2em;\
  -webkit-transition:background-color .15s ease-in-out;\
  -o-transition:background-color .15s ease-in-out;\
  transition:background-color .15s ease-in-out;\
}\
#keyboardInputMasterUserScript tbody tr td table tbody tr td.last {\
  width:99%;\
}\
#keyboardInputMasterUserScript tbody tr td table tbody tr td.space {\
  padding:0px 4em;\
}\
#keyboardInputMasterUserScript tbody tr td table tbody tr td.deadkey {\
  background-color:#ccccdd;\
}\
#keyboardInputMasterUserScript tbody tr td table tbody tr td.target {\
  background-color:#ddddcc;\
}\
#keyboardInputMasterUserScript tbody tr td table tbody tr td:hover,\
#keyboardInputMasterUserScript tbody tr td table tbody tr td.hover {\
  border-top:1px solid #d5d5d5;\
  border-right:1px solid #555555;\
  border-bottom:1px solid #555555;\
  border-left:1px solid #d5d5d5;\
  background-color:#cccccc;\
}\
#keyboardInputMasterUserScript thead tr th span:active,\
#keyboardInputMasterUserScript thead tr th span.pressed,\
#keyboardInputMasterUserScript tbody tr td table tbody tr td:active,\
#keyboardInputMasterUserScript tbody tr td table tbody tr td.pressed {\
  border-top:1px solid #555555 !important;\
  border-right:1px solid #d5d5d5;\
  border-bottom:1px solid #d5d5d5;\
  border-left:1px solid #555555;\
  background-color:#cccccc;\
}\
\
#keyboardInputMasterUserScript tbody tr td table tbody tr td small {\
  display:block;\
  text-align:center;\
  font-size:0.6em !important;\
  line-height:1.1em;\
}\
\
#keyboardInputMasterUserScript tbody tr td div label {\
  position:absolute;\
  bottom:0.2em;\
  left:0.3em;\
}\
#keyboardInputMasterUserScript tbody tr td div label input {\
  background-color:#f6f6f6;\
  vertical-align:middle;\
  font-size:inherit;\
  width:1.1em;\
  height:1.1em;\
}\
#keyboardInputMasterUserScript tbody tr td div var {\
  position:absolute;\
  bottom:0px;\
  right:3px;\
  font-weight:bold;\
  font-style:italic;\
  color:#444444;\
}";

  var VKI_head = VKI_title = 0;
  try {
    if (VKI_head = document.getElementsByTagName('head')[0]) {
      VKI_head.appendChild(VKI_link);
    } else if (VKI_title = document.getElementByTagName('title')[0])
      VKI_title.parentNode.insertBefore(VKI_link, VKI_title);
  } catch(e) {}
