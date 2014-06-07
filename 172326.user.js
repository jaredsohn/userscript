// ==UserScript==
// @name          WBB Quick Reply Plus
// @namespace     erosman
// @description   Adds More formatting buttons to Quick/Standard Reply
// @updateURL     https://userscripts.org/scripts/source/172326.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172326.user.js
// @include       http://www.warez-bb.org/viewtopic.php*
// @include       http://www.warez-bb.org/posting.php*
// @include       http://www.warez-bb.org/privmsg.php*
// @exclude       http://www.warez-bb.org/privmsg.php?folder=*
// @grant         none
// @author        erosman
// @version       1.7
// ==/UserScript==


/* --------- Note ---------
  This script adds more formatting options (B, i, u, List, List=) to the Quick Reply Box
  as well as Quote=, Font Size & Font Colour
  Also new functionality of 'RemoveTag', 'To Uppercase', 'To Lowercase' & 'TitleCase'
  Script now adds the functionality to Quick Reply, Normal Reply with/without Quote,
  PM reply and their Preview pages


  --------- History ---------

  1.7 Code Improvement
  1.6 Code Improvement + Removed Capitalize (can be done with TitleCase)
  1.5 New RemoveTags function + Minor CSS change
  1.4 Code Improvement + Added Quote= (which is valid but is missing from phpBB inputs)
      + Added Font Size + Added Font Colour
  1.3 Code Improvement + Added PM pages
  1.2 Added TitleCase and new functions + Added script to reply page + Preview page
      + Error checking on phpBB post redirect page
  1.1 Added toLower, toUpper & Capitalize
  1.0 Initial release

*/


(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict'; // ECMAScript 5

if (frameElement) { return; } // end execution if in a frame, object or other embedding points

var bbcode = (document.getElementsByClassName('bbcode') || [0])[0];
if (!bbcode) { return; }  // end execution if not found


insert(function() {
/* WBB Quick Reply Plus by erosman */
if (document.URL.indexOf('viewtopic.php') !== -1) {
  bbtags.push('[b]', '[/b]', '[i]', '[/i]', '[u]', '[/u]', '[list]', '[/list]', '[list=]', '[/list]');
}

bbtags.push('[quote=""]', '[/quote]');

function makeChange(val, val2) {
  var obj = document.getElementById('message');
  obj.selectionEnd = (obj.selectionEnd > obj.value.length ? obj.value.length : obj.selectionEnd);

  if (obj.selectionEnd > obj.selectionStart) {

    var startPos = obj.selectionStart, endPos = obj.selectionEnd,
        theSelection = obj.value.substring(startPos, endPos),
        openTaglength = 0, tagLength = 0;

    switch (val) {
      case 'lower':
        theSelection = theSelection.toLowerCase();
        break;

      case 'upper':
        theSelection = theSelection.toUpperCase();
        break;

      case 'titlecase':
        theSelection = toTitleCase(theSelection);
        break;

      case 'remove':
        var ret = remove(theSelection);
        theSelection = ret[0];
        tagLength = ret[1];
        break;

      default: //adds tag around the selection
       theSelection = val + theSelection + val2;
       openTaglength = val.length;
    }

    obj.value = obj.value.substring(0,startPos) + theSelection + obj.value.substring(endPos);
    obj.selectionStart = startPos + openTaglength;
    obj.selectionEnd = endPos + openTaglength - tagLength;
    obj.focus();
  }
  else {
    alert ('Nothing was selected');
  }
}

function toTitleCase(txt) {
  return txt.replace(/\w\S*/g,
    function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
}

function remove(txt) {
  var pat = /\[\/?(b|i|u|img|code|quote[^\]]*|list[^\]]*|color[^\]]*|size[^\]]*)\]/gi;
  return [txt.replace(pat, ''), txt.match(pat).join('').length];
}

}); // end of insert()


function insert(code) {
  code += ''; // convert to string
  code = code.replace(/^[^/]+([\s\S]+)}$/, '$1');

  // insert the JavaScript in the page
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.textContent = code;
  document.body.appendChild(s);
}


var extra1 = ' \
<input type="button" name="addbbcode16" id="addbbcode16" value="Quote=" onclick="bbstyle(16)" class="first-button" /> \
<input type="button" value="RemoveTag" onclick="makeChange(\'remove\')" /> \
<input type="button" value="toLower" onclick="makeChange(\'lower\')" /> \
<input type="button" value="toUpper" onclick="makeChange(\'upper\')" /> \
<input type="button" value="TitleCase" onclick="makeChange(\'titlecase\')" class="last-button" /> ';

var extra2 = ' \
<br style="clear: both;" /> \
<input type="button" accesskey="b" name="addbbcode6" id="addbbcode6" value="B" onclick="bbstyle(6)" style="font-weight: bold;" class="first-button" /> \
<input type="button" accesskey="i" name="addbbcode8" id="addbbcode8" value="i" onclick="bbstyle(8)" style="font-style: italic;" /> \
<input type="button" accesskey="u" name="addbbcode10" id="addbbcode10" value="u" onclick="bbstyle(10)" style="text-decoration: underline;" /> \
<input type="button" accesskey="l" name="addbbcode12" id="addbbcode12" value="List" onclick="bbstyle(12)" /> \
<input type="button" accesskey="o" name="addbbcode14" id="addbbcode14" value="List=" onclick="bbstyle(14)"  class="last-button" /> \
&nbsp; Font colour: \
<select name="addbbcode18" onchange="makeChange(\'[color=\' + this.form.addbbcode18.options[this.form.addbbcode18.selectedIndex].value+ \']\', \'[/color]\'); this.selectedIndex=0;"> \
<option value="#">Default</option> \
<option style="color: darkred;" value="darkred">Dark Red</option> \
<option style="color: red;" value="red">Red</option> \
<option style="color: orange;" value="orange">Orange</option> \
<option style="color: brown;" value="brown">Brown</option> \
<option style="color: yellow;" value="yellow">Yellow</option> \
<option style="color: green;" value="green">Green</option> \
<option style="color: olive;" value="olive">Olive</option> \
<option style="color: cyan;" value="cyan">Cyan</option> \
<option style="color: blue;" value="blue">Blue</option> \
<option style="color: darkblue;" value="darkblue">Dark Blue</option> \
<option style="color: indigo;" value="indigo">Indigo</option> \
<option style="color: violet;" value="violet">Violet</option> \
<option style="color: white;" value="white">White</option> \
<option style="color: black;" value="black">Black</option> \
</select> \
&nbsp; Font size: \
<select name="addbbcode20" onchange="makeChange(\'[size=\' + this.form.addbbcode20.options[this.form.addbbcode20.selectedIndex].value + \']\', \'[/size]\'); this.selectedIndex=2;"> \
<option value="7">Tiny</option> \
<option value="9">Small</option> \
<option value="12" selected="selected">Normal</option> \
<option value="18">Large</option> \
<option value="24">Huge</option> \
</select>';


// insert the extra elements in the page
bbcode.innerHTML += extra1 + (document.URL.indexOf('viewtopic.php') !== -1 ? extra2 : '');

})(); // end of anonymous function
