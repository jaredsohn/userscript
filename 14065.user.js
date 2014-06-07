// ==UserScript==
// @name           Codejunkies Copy Button
// @namespace      http://sizeart.free.fr
// @description    Add a copy button for the codes on the codejunkies Database website (No more copy paste manually)
// @include        http://*.codejunkies.com/search/codes/*
// ==/UserScript==

/* This script is very usefull if you own a M3/R4 Nintendo DS linker and you usually visit the CodeJunkies Database
   Unfortunately, the only way to get the codes is to copy-paste manually every codenames, codes digits... soo boring and useless !
   
   Here you just have to click on the "Copy" button and paste your selection onto the Code Editors (or anywhere else)
   It includes several buttons such as "Game ID, Game Name, Code Name and Code".
   
   Enjoy! You are a true lazy person now :D
   
   UPDATE: This new version is simplified and is now compatible with the new codejunkies website! YEEPI!
   UPDATE2: Fixed a problem with empty categories displaying a copy button and the error width within a title
   UPDATE3: Included the copy function straight into body tag which prevents the browser to process the code each time you press "Copy" and fixed the category's bug
   UPDATE4: Fixed to work with the slight changes they added
*/

// Courtesy of http://www.krikkit.net/howto_javascript_copy_clipboard.html
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.innerHTML = "function Copy(meintext){  netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);if (!clip) return; var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable); if (!trans) return; trans.addDataFlavor('text/unicode'); var str = new Object(); var len = new Object(); var str = Components.classes['@mozilla.org/supports-string;1'].createInstance(Components.interfaces.nsISupportsString); var copytext = meintext; str.data = copytext; trans.setTransferData('text/unicode', str, copytext.length * 2); var clipid = Components.interfaces.nsIClipboard; if (!clip) return false; clip.setData(trans,null,clipid.kGlobalClipboard); return false;}";
body = document.getElementsByTagName('body')[0];
body.appendChild(script);

// Game Names
var gamename = document.getElementById('CodeSearch');
var text = gamename.innerHTML;
text = text.split('</h1>');
text = text[0].replace("<h1>Cheat Codes for ", "");
text = text.replace("'", "");
gamename.innerHTML = '<div style="float: right"><input type="button" onclick="return Copy(\''+text+'\');" value="Copy Name" /></div>'+gamename.innerHTML;

// Code Names
var gameid = document.getElementById('ctl00_MainContentHolder_lblCheatCodesSubHeader');
var text = gameid.innerHTML;
t_text = text.split('&nbsp;');
var text = t_text[0];
var text = text.replace('Game ID: ', '');
gameid.innerHTML = '<div style="float: right"><input type="button" onclick="return Copy(\''+text+'\');" value="Copy GameID" /></div>'+gameid.innerHTML;

for (var i = 0; i < document.getElementsByTagName('span').length; i++)
{
  var matches = document.getElementsByTagName('span')[i].className;
  
  if (matches == "consoleTextColour"){ // Category's title
    var oNode = document.getElementsByTagName('span')[i];
    var text = oNode.innerHTML;
    var t_text = text.split('</div>');
    
    if (t_text[1]){
      var text = t_text[1].split("\n").join("");
      text = text.replace("</div>", "");
      text = text.replace("'", "");
      oNode.innerHTML += '<input type="button" onclick="return Copy(\''+text+'\');" value="Copy" />';
     }
  }else if (matches == "clsSearchResultsText"){ // Codes
    var oNode = document.getElementsByTagName('span')[i];
    var text = oNode.innerHTML;
    text = text.split("\n").join("");
    text = text.split("<br>").join("\t");
    
    if (text != ""){
      oNode.innerHTML = '<div style="float: right"><input type="button" onclick="return Copy(\''+text+'\')" value="Copy" /></div>'+oNode.innerHTML;
      }
  }
}