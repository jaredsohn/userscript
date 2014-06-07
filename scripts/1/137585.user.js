// ==UserScript==
// @name        Facebook AutoHideChat
// @namespace   http://userscripts.org/users/249211
// @description Hide automatically your presence in chat
// @include     *facebook*
// @version     1
// ==/UserScript==

function generatePhstamp(qs, dtsg)
{ //reference: http://www.blackhatworld.com/blackhat-seo/facebook/411272-cracked-facebooks-phstamp.html
  var input_len = qs.length;
  numeric_csrf_value='';
  for(var ii=0;ii<dtsg.length;ii++) {
    numeric_csrf_value+=dtsg.charCodeAt(ii);
  }
  return '1' + numeric_csrf_value + input_len;
}

function Hide_stat()
{
  var window_id=document.cookie.split('EtwF')[1].split('Eat')[0];
  var user=document.cookie.split('c_user=')[1].split(';')[0];
  var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;
  var str="visibility=0&window_id="+window_id+"&__user="+user+"&__a=1&fb_dtsg="+fb_dtsg;
  var phstamp=generatePhstamp(str,fb_dtsg);
  str+="&phstamp="+phstamp;
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://www.facebook.com/ajax/chat/privacy/visibility.php",
    data: str,
    headers: {
      "X-SVN-Rev": "584451",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Referer":"http://www.facebook.com/"
    }
  })

}

Hide_stat();