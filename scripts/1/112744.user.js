// ==UserScript==
// @name           PassThePopcorn - Rehost to ptpimg.me
// @namespace      http://userscripts.org/users/183236
// @description    Rehost images to ptpimg.me
// @include	   http://*passthepopcorn.me/torrents.php?id=*
// @include        https://*passthepopcorn.me/torrents.php?id=*
// @version        0.01
// ==/UserScript==
/*-------------------------------------------------------------------------------------\
CHANGELOG:

0.01 - Initial Release
\-------------------------------------------------------------------------------------*/

GM_addStyle('#rehost {position: fixed; bottom: 10px; right: 10px; z-index: 1000;}');

// utility fn
function insertAfter(newElement,targetElement) {
  //target is what you want it to go after. Look for this elements parent.
  var parent = targetElement.parentNode;
  
  //if the parents lastchild is the targetElement...
  if(parent.lastchild == targetElement) {
    //add the newElement after the target element.
    parent.appendChild(newElement);
    } else {
    // else the target has siblings, insert the new element between the target and it's next sibling.
    parent.insertBefore(newElement, targetElement.nextSibling);
    }
}



GM_xmlhttpRequest({
                method: "GET",
                url: 'http://ptpimg.me/index.php?type=uploadv2&key=QT5LGz7ktGFVZpfFArVHCpEvDcC3qrUZrf0kP&uid=999999&url=' + userSubmit,
                headers: { "Content-Type" : "application/x-www-form-urlencoded" },
                onload: function(response) {
                    //alert(response.responseText);[{"status":1,"code":"887len","ext":"jpg"}]
                    var temp = response.responseText;
                    //,status,:1,,code,:,887len,,,ext,:,jpg,
                    var tempName = temp.substring(temp.indexOf('code')+7, temp.length);
                    tempName = tempName.substring(0, tempName.indexOf('"'));
                    var tempExt = temp.substring(temp.indexOf('ext"')+6, temp.length);
                    tempExt = tempExt.substring(0, tempExt.indexOf('"'));
                    var finalLink = 'http://ptpimg.me/'+tempName+'.'+tempExt;