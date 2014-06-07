/*
There's a Babelfish in My Browser!
http://life.lukewarmtapioca.com/articles/2005/05/19/there-s-a-babelfish-in-my-browser

Version 0.2
(c) 2005 Britt Selvitelle
Released under the GPL license
http://www.gnu.org/copyleft/gpl.html
*/

// ==UserScript==
// @name          There's a Babelfish in My Browser!
// @namespace     http://lukearmtapioca.com.com/userscripts/
// @description   Translate textboxes/textareas in webpages.
// @include       *
// @exclude       
// ==/UserScript==

var spinner_img = "data:image/gif;base64,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"; 


var fish_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAOCAYAAAA8E3wEAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QUUDyoqJjAqRwAAAN1JREFUOMu1lMkVwyAMBYe0JGpCNUFNVk3k4AUwxPGS+ILxkzX8jyTH/Sfu9nrmJ3cXlnMASyWRPwd2d5XlHCBZn1BthcbRAdxTZQDI8k3mQzg11rhF+QZ9jdNOcQib6GFQYJYgCFucSRf6GsLU6wEY5yubTFqF2yq1vRwr3INXdQUWG+je1pELX4ED1wDyRAR0WfuAA9gloITyvsFMIMgYInYRqF6rO9Sqz9qkO5ilyo0o3YBwJ+6vrdQonxWUQllhXeHcb/wabMPkP2n81ocAIoLZrMqn/4y2RwP8DcQ+d6rT9ATiAAAAAElFTkSuQmCC";

window.get_set_tr_text = function(iter)  {
  text = all_text[iter].value;

  // if there is no text, return
  if( rightTrim(text).length == 0 ) return;

  var img = document.getElementById('babel_img' + iter);
  img.setAttribute('src', spinner_img);
  img.style.display = 'inline';
  working = true;

  var pre_text = '';
  var post_text = '';

  if( all_text[iter].selectionStart != all_text[iter].selectionEnd ) {
    var pre_text = text.substring(0, all_text[iter].selectionStart);
    var post_text = text.substring(all_text[iter].selectionEnd, all_text[iter].value.length);
    var text = text.substring(all_text[iter].selectionStart, all_text[iter].selectionEnd);

    // get leading and trailing whitespaces that may be nuked in translation
    var tail_ws_reg = /\s*$/;
    if( tail_ws_reg.test(text) ) {
      var tail_ws_cnt = text.match(tail_ws_reg)[0].length;
    }
    var leading_ws_reg = /^\s*/;
    if( leading_ws_reg.test(text) ) {
      var leading_ws_cnt = text.match(leading_ws_reg)[0].length;
    }
  }

  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://babelfish.altavista.com/tr?lp=en_es&text=' + text,
    onload: function(responseDetails) {
      // Nasty screen scraping here! Wish babelfish had an exposed api!
      all_text[iter].value = pre_text;
      for( var i=0; i < leading_ws_cnt; i++ ) { all_text[iter].value += ' ' }
      //all_text[iter].value += responseDetails.responseText.match("px..(.*)..div")[1];
      t = responseDetails.responseText;
      all_text[iter].value += t.substring(t.search("10px;>") + 6, t.search('</div>'));
      for( var i=0; i < tail_ws_cnt; i++ ) { all_text[iter].value += ' ' }
      all_text[iter].value += post_text;

      img.setAttribute('src', fish_img);
      img.style.display = 'none';
      working = false;
    }
  });
}

window.show_fish = function(iter) {
  document.getElementById('babel_img' + iter).style.display = 'inline';
}

window.hide_fish = function(iter) {
  if( !working) document.getElementById('babel_img' + iter).style.display = 'none';
}

window.rightTrim = function( strValue ) {
  var objRegExp = /^([\w\W]*)(\b\s*)$/;
  if(objRegExp.test(strValue)) {
  //remove trailing a whitespace characters
    strValue = strValue.replace(objRegExp, '$1');
  }
  return strValue;
}

var working = false; // don't kill spinner if this is true
var tbs = document.getElementsByTagName('input');
var tas = document.getElementsByTagName('textarea');
var all_text = new Array();
for(var i=0; i < tbs.length; i++) { if(tbs[i].type == 'text') all_text.push(tbs[i]) }
for(var i=0; i < tas.length; i++) { all_text.push(tas[i]) }

for( var i=0; i < all_text.length; i++ ) {
  var babel_img = document.createElement("img");
  babel_img.setAttribute("style", "position:absolute;");
  babel_img.setAttribute("src", fish_img);
  babel_img.setAttribute("onclick", "get_set_tr_text('" + i + "')");
  babel_img.setAttribute("id", "babel_img" + i);
  babel_img.style.display = "none";

  all_text[i].parentNode.insertBefore(babel_img, all_text[i].nextSibling);
  all_text[i].setAttribute("onfocus", "show_fish(" + i + ")");
  all_text[i].setAttribute("onblur", "setTimeout('hide_fish(" + i + ")', 400)");
}


