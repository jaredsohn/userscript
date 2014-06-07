// ==UserScript==
// @name        Youtube Proxfree Button
// @description	Add a (horrible) button to switch to Proxfree Proxy
// @include     http*://*youtube.*/watch*
// @include     http://www.proxfree.com/?proxy_it
// @version     1.1
// ==/UserScript==
 
 
if((document.location.href).toString().indexOf('proxy_it') === -1) 
{
	GM_setValue('get', document.location.href);
	GM_setValue('main_submission', 'PROXFREE');
	GM_setValue('pfserverDropdown', 'http://eu.proxfree.com/request.php?do=go');
	GM_setValue('allowCookies', 'on');
	GM_setValue('removeTitle', 'on');
	GM_setValue('pfipDropdown', 'default');
	GM_setValue('removeScripts', 'on');
	GM_setValue('removeObjects', 'on');
	GM_setValue('noReferer', 'on');
	GM_setValue('noUseragent', 'on');
 
	var proxy = document.createElement('div');
	proxy.innerHTML = '<div style="position: fixed; top: 100px; left: 0; background: red; padding: 5px"><button id="proxy_it" onclick="document.location.href = \'http://www.proxfree.com/?proxy_it\'">PROXY</button></div>';
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