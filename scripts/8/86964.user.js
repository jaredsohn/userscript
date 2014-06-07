// ==UserScript==
// @name           Demonoid Registrations Open
// @namespace      demonoid_registrations_open
// @description    Inform if Registration is Open in Demonoid.com
// @Include        http://*.demonoid.com
// ==/UserScript==

var hora = new Date().getTime();
var gmhora = GM_getValue('demonoid_time');

if (gmhora == null) {

	GM_setValue('demonoid_time', new Date().getTime() + "");
	test();
	version();
	
} else {

	var gmrestahora = hora - gmhora;
	if ( gmrestahora > 1200000 ) {
		GM_setValue('demonoid_time', new Date().getTime() + "");
		test();
		version();
	}

}


function test() {

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.demonoid.com/',
		onload: function(html)
		{
			html = html.responseText;
			var open = html.match(/\<b\>closed\<\/b\>/);
			if(!open){
			alert('Registration in Demonoid is Open.');
			GM_setValue('demonoid_time', new Date().getTime() + "");
			window.location.href = 'http://www.demonoid.com/register.php';
			}
		}
	});
	
}

function version() {

var scriptv = '1.000';
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/show/86964',
    onload: function(html)
    {
        html = html.responseText;
        var latestv = html.match(/Version: \<b\>(.*)\<\/b\>/);
        latestv = latestv[1];
        if(latestv > scriptv)
        {
            alert('There is an update to Script Demonoid Registrations Open - please install it once you are redirected.');
            window.location.href = 'http://userscripts.org/scripts/show/86964';
        }
}
                  });
}