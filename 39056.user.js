// ==UserScript==
// @name           Vkontakte Apps Counter
// @namespace      http://physicsforumgame.us.to 
// @description    Count them all!
// @include        *
// ==/UserScript==

//alert("!"); appRow

//      <tr>
//       <td class="label">Популярность:</td>
//       <td> 
//        31 участник
//       </td>
//      </tr>
//    "//td[contains(@class, 'label')]",

function strstr( haystack, needle, bool ) { 
    var pos = 0;
 
    haystack += '';
    pos = haystack.indexOf( needle );
    if( pos == -1 ){
        return false;
    } else{
        if( bool ){
            return haystack.substring( 0, pos );
        } else{
            return haystack.substring( 0, pos );
        }
    }
}

var spaceRe = / +/g;
function removeSpaces(s) {
    return s.replace(spaceRe, "");
}

allApps = document.evaluate(
    "//td[contains(@class, 'label')]",
   document, null, XPathResult.ANY_TYPE, null);
var a = 0;
var thisApp = allApps.iterateNext(); 
var alertText = 0;
while (thisApp) {
  if (strstr(thisApp.textContent,'ность')) {
      //parentNode
      var child = thisApp.parentNode.childNodes[3];
      if (a=removeSpaces(strstr(child.textContent,' уч'))) {        
          alertText += parseInt(a);
      }
  }
  thisApp = allApps.iterateNext();
}
alert(alertText); 