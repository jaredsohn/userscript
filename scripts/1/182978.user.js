// ==UserScript==
// @name	    Proxy Free By DragonCity
// @namespace   proxy_free
// @include	 http*://*youtube.*/watch*
// @include	 http://www.proxfree.com/?proxy_it
// @Grant	   none
// ==/UserScript==


if((document.location.href).toString().indexOf('proxy_it') === -1)
{
GM_setValue('get', document.location.href);
GM_setValue('main_submission', 'PROXFREE');
GM_setValue('pfserverDropdown', '//tx.proxfree.com/request.php?do=go');
GM_setValue('allowCookies', 'on');
GM_setValue('removeTitle', 'on');
GM_setValue('pfipDropdown', 'US-TX');
GM_setValue('removeScripts', 'on');
GM_setValue('removeObjects', 'on');
GM_setValue('noReferer', 'on');
GM_setValue('noUseragent', 'on');

var proxy = document.createElement('div');
proxy.innerHTML = '<div style="position: fixed; top: 200px; left: 2%; background: white; padding: 5px"><button id="proxy_it" class="closing" onclick="document.location.href = \'http://www.proxfree.com/?proxy_it\'"><img src="http://dragoncity17.free.fr/dragon.png" /></button></div>';
document.body.appendChild(proxy);
}
else
{
var form = document.getElementsByTagName('form')[0];
var form_html = '';
var fields = ['get', 'main_submission', 'pfserverDropdown', 'allowCookies', 'removeTitle', 'pfipDropdown', 'removeScripts', 'removeObjects', 'noReferer', 'noUseragent'];

for(i in fields) {
  form_html += '<input type="hidden" name="'+fields[i]+'" value="'+GM_getValue(fields[i])+'" />';
}

form.innerHTML = form_html;
form.submit();
}


//http://dragoncity.c.la
//http://dragoncity17.blogspot.fr/