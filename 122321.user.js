// ==UserScript==
// @name           Megaupload to Synology
// @namespace      Laymain
// @include        http://www.megaupload.com/?d=*
// ==/UserScript==

var synology_host = 'nas:5000';
var destination = 'Archives/Downloads';

var IntegrationEnum = Object.freeze({
	'SILENT':0, // Directly send to Synology *unrecommended*
	'BUTTON':1, // Add a button next to the Premium download button
	'CONFIRM':2 // Ask if should download
});

var integration_type = IntegrationEnum.BUTTON;

function xh_request(method, host, uri, params)
{
	var options = {
		method:		method == 'POST' ? 'POST' : 'GET',
		headers:	{ 'Content-Type':'application/x-www-form-urlencoded' },
		url:		'http://'+host+'/'+uri + (method == 'GET' ? '?' + params : ''),
	}
	if (method == 'POST') options.data = params;
	GM_xmlhttpRequest(options);

}
function send_to_sinology()
{
	var synology_button = document.getElementById('send_to_sinology');
	if (synology_button) synology_button.parentNode.removeChild(synology_button);
	var uri = 'webman/modules/DownloadStation/dlm/downloadman.cgi';
	var params = 'action=add_url_task&desttext=' + encodeURIComponent(destination) + '&urls=' + encodeURIComponent('["' + document.location.href + '"]');
	var res = xh_request('POST', synology_host, uri, params);
}

function add_download_button()
{
	var download_button = document.evaluate('//a[@class="download_premium_but"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (!download_button)
		return;
	var button = document.createElement('button');
	button.id = 'send_to_sinology';
	button.title = 'Send to Synology';
	button.style.cssText = 'margin-left:50px;border:none;cursor:alias;float:left;height:62px;width:62px;display:block;background-image: url(https://addons.opera.com/media/extensions/65/11465/0.9.0-rev1/icons/icon_64x64.png);background-color:transparent;';
	button.addEventListener('click', send_to_sinology, false);
	download_button.parentNode.insertBefore(button, download_button.nextSibling);
}

if (unsafeWindow.console)
	var log = unsafeWindow.console.log;

if (integration_type == IntegrationEnum.BUTTON)
{
	add_download_button();
}
else
{
	var download = integration_type == IntegrationEnum.BUTTON || confirm('Send to Sinology?');
	if (download) send_to_sinology();
}
