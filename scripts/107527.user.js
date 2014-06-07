// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Jan Di (http://momoiro-box.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticonku
// @namespace      http://cheerinsideme.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "&lt;br /&gt;";


buttons += emoticonButton("-1-", "http://4.bp.blogspot.com/-EF0QIxjf4_U/TcrOGqXdE-I/AAAAAAAACdM/An0DKc_aWt8/s400/4c12bf494ada4896e82b48fb0857b333.gif");
buttons += emoticonButton("-2-", "http://2.bp.blogspot.com/-aW5Dsqmalrs/TcrOGabsEHI/AAAAAAAACdE/Zkjtk08_Ku8/s400/4b7fde2f2302a533fc2c832ef035fb42.gif");
buttons += emoticonButton("-3-", "http://4.bp.blogspot.com/-4fpTFWnzW7c/TcrOGH5Dt0I/AAAAAAAACc8/1tP6ltTRxY4/s400/0d9e398d61a9d06c83cc9f967361af56.gif");
buttons += emoticonButton("-4-", "http://2.bp.blogspot.com/-_UQirjAynnc/TcrOPxvi-SI/AAAAAAAACdU/MAVer0mdrEw/s400/7e075603ed9ac6da5eab0197113e2aa9.gif");
buttons += emoticonButton("-5-", "http://4.bp.blogspot.com/-lFnXe073UNA/TcrOP-60TDI/AAAAAAAACdc/cUOOjFvi3Vc/s400/9dd6312f4397b49730b213367e519df7.gif");

buttons += emoticonButton("-6-", "http://2.bp.blogspot.com/-L7h0qtz5SGs/TcrOQLCtMqI/AAAAAAAACdk/Ex2rlF3ljoE/s400/11b5b2c09bc43eb2604857f450b79125.gif");
buttons += emoticonButton("-7-", "http://2.bp.blogspot.com/-EzFLDrJJG8Y/TcrO6T-AWCI/AAAAAAAACeM/3H8ECxIy2ks/s400/89b50523aae55d61c20e8b2bca8604c5.gif");
buttons += emoticonButton("-8-", "http://4.bp.blogspot.com/-Z2VEW7A3arY/TcrO6bnWtFI/AAAAAAAACeE/jU06Q0QSMyA/s400/87a1bc088fcecfcd1547ab683d081be5.gif");
buttons += emoticonButton("-9-", "http://1.bp.blogspot.com/-iY1nb2iyMec/TcrO507JrHI/AAAAAAAACd8/7-ENH2bGtoY/s400/44af5f1556a39d103919f92b04bb3f07.gif");
buttons += emoticonButton("-10-", "http://4.bp.blogspot.com/-jr4l2ffbNec/TcrO5o-904I/AAAAAAAACd0/JheLicS0TQg/s400/43f643a3042b6e1d867e93cc0aaf832f.gif");




	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "&lt;span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"&lt;img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" /&gt;\";})();ButtonMouseDown(this);'&gt;&lt;img src='" + url + "' alt='" + name + "' border='0'&gt;&lt;/span&gt;\n";
}

function separator() {
  return "&lt;div style=\"display: block;\" class=\"vertbar\"&gt;&lt;span style=\"display: block;\" class=\"g\"&gt;&amp;nbsp;&lt;/span&gt;&lt;span style=\"display: block;\" class=\"w\"&gt;&amp;nbsp;&lt;/span&gt;&lt;/div&gt;\n";
}

setemoticons("formatbar");

 }, false);