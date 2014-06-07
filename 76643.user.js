// ==UserScript==
// @name 	Download Videos Youtube, Facebook...
// @description Download Videos 
// @version     0.1
// @include	http://youtube.com/*v=*
// @run-at document-start
// ==/UserScript==

var local_version = '2.5';

var youtubeTitleLink = 1;	// Replace 1 to 0 in order to hide the download link near the title of youtube videos.

var vars = {};

var url = encodeURIComponent(document.URL);

var dl_url = 'iuhiuj;

checkForUpdate(false);

if (url.indexOf('megavideo.com')!=-1 || url.indexOf('megaporn.com')!=-1){
	getMegaVars();
}

addDownloadBox();

if (url.indexOf('youtube.com')!=-1 && youtubeTitleLink){
	addDownloadLink();
}

function checkForUpdate(a) {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (a || !lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
			method: "GET",
			onload: function(results) {
			var global_version = results.responseText.match(/version[ ]*([0-9.]+)/i)[1];
				if (global_version.length && global_version != local_version) {
					if (confirm('[ Greasemonkey ] Keep Tube : Version '+ global_version +' is now available. Update?')) {
						GM_openInTab('http://userscripts.org/scripts/show/47636');
					}
				}
				else if (a) {
					alert('[ Greasemonkey ] Keep Tube : No new version found.');
				}
			},
		});
	}
	GM_setValue('lastCheck',today);
}


function getMegaVars() {
	var scripts = document.getElementsByTagName("script");
	for (var i = 0, len = scripts.length; i < len; i++) {
		var str = scripts[i].innerHTML;
		if (str.match(/\svar flashvars/)) {
			extractVars(str);
			dl_url = dl_url + '&megavars='+ vars.v +'.'+ vars.s +'.'+ vars.un +'.'+ vars.k1 +'.'+ vars.k2 +'.'+ vars.hd_s +'.'+ vars.hd_un +'.'+ vars.hd_k1 +'.'+ vars.hd_k2;
			break;
		}
	}
	function extractVars(str) {
		vars.hd_s=vars.hd_un=vars.hd_k1=vars.hd_k2='';
		vars.v 		= str.match(/flashvars\.v = \"(.*)\";\n/)[1];
		vars.s 		= str.match(/flashvars\.s = \"(.*)\";\n/)[1];
		vars.un 	= str.match(/flashvars\.un = \"(.*)\";\n/)[1];
		vars.k1 	= str.match(/flashvars\.k1 = \"(.*)\";\n/)[1];
		vars.k2 	= str.match(/flashvars\.k2 = \"(.*)\";\n/)[1];
		if (str.indexOf('flashvars.hd_s')!=-1){
			vars.hd_s 	= '' || (str.match(/flashvars\.hd_s = \"(.*)\";\n/)[1]);
			vars.hd_un 	= str.match(/flashvars\.hd_un = \"(.*)\";\n/)[1];
			vars.hd_k1 	= str.match(/flashvars\.hd_k1 = \"(.*)\";\n/)[1];
			vars.hd_k2 	= str.match(/flashvars\.hd_k2 = \"(.*)\";\n/)[1];
		}
	}
}

function addDownloadLink(){
	var link =' [ <a href="' + dl_url + '" title="Download with Keep Tube!"><img src="' + keepTubeIcon + '" alt="" valign="middle"/></a> ]';
	var title = document.getElementById("watch-vid-title").innerHTML.replace("</h1>",link+"</h1>");
	document.getElementById("watch-vid-title").innerHTML = title;
}

function addDownloadBox() {
	var styles = [
		'#keepTubeBox {position: fixed; right: 5px; bottom: 5px; z-index: 1000;opacity: 0.8;}',
		'#keepTubeBox a {font-size:11px;font-family:Verdana;font-weight:bold;color:#008C00 !important;text-align:center;outline:none;background-color: #DFF1FD;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',
		'#keepTubeBox a:hover {border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;text-decoration:none;}',
		'#keepTubeBox img, #keepTubeBox a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}'
	];
	
	GM_addStyle(styles.join("\r\n"));

	var downloadBox = document.createElement('div');
	document.body.appendChild(downloadBox);
	downloadBox.id = 'keepTubeBox';
	downloadBox.innerHTML = '<a title="Download" target="_blank" href="' + dl_url + '"><img src="' + keepTubeIcon + '" width="16" height="16" /> Download</a>';
}