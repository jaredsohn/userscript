// ==UserScript==
// @name          	BypassFanPages Checker
// @description   	Sick of all the Facebook Fan Pages that make you become a fan then invite all your friends then do a survey just to see the content? Well with BypassFanPages.com you can discover the hidden content, with none of the hassles. Firefox Version
// @version     	1.1.1
// @date 		2010-05-11
// @creator 		admin@bypassfanpages.com
// @include       	http://www.facebook.com/pages/*
// @include       	https://www.facebook.com/pages/*
// ==/UserScript==

var icon = 'data:image/gif;base64,R0lGODlhEAAQALMAAAAAAP///+/w9StEiOvt8ztUk0tinFlvp2B0qWJ2qn6PuoKTvLjC2ujr8f///wAAACH5BAEAAA4ALAAAAAAQABAAAART0MlJqzw46+0OEWAoCsTRNWg6FClqHm1jBGz7xkMwxHe6JDreSRXQDQYI13GZKzp3jcNAoWg6n8pEwnoNRgda7nWQAW+7z4l5mWCM1Ut43EK3RAAAOw==';

var url = encodeURIComponent(document.URL);

var title = encodeURIComponent(document.title);

var bypassed_url = 'http://www.bypassfanpages.com/bypass.php?url='+url+'&title='+title;

var submit_url = 'http://www.bypassfanpages.com/submit.php?url='+url+'&title='+title;

BypassFanPage(bypassed_url);

function BypassFanPage(a) {
	GM_xmlhttpRequest({
				method: "HEAD",
				url: a,
				onload: function(results) {
				var isBypassed = results.statusText.match('OK');
					if (isBypassed) {
						AddBypassBox(results.finalUrl);
					}else{
						AddSubmitBox();
					}
				},
			});
}

function AddBypassBox(final_url) {
	var styles = [
		'#BypassFanPagesBox {position: fixed; left: 5px; bottom: 5px; z-index: 1000;opacity: 0.8;}',
		'#BypassFanPagesBox a {font-size:13px;font-family:Verdana;font-weight:bold;color:#000000 !important;text-align:center;outline:none;background-color: #edeff4;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',
		'#BypassFanPagesBox a:hover {border:1px solid #B6D9EE;background-color:#d8dfea;color:#000000 !important;text-decoration:none;}',
		'#BypassFanPagesBox img, #BypassFanPagesBox a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}'
	];
	
	GM_addStyle(styles.join("\r\n"));

	var bypassBox = document.createElement('div');
	document.body.appendChild(bypassBox);
	bypassBox.id = 'BypassFanPagesBox';
	bypassBox.innerHTML = '<a title="Bypass this Fan Page and see the hidden content instantly" target="_blank" href="' + final_url + '"><img src="'+icon+'" width="24" height="24" /> Bypass</a>';
}

function AddSubmitBox() {
	var styles = [
		'#BypassFanPagesBox {position: fixed; left: 5px; bottom: 5px; z-index: 1000;opacity: 0.8;}',
		'#BypassFanPagesBox a {font-size:13px;font-family:Verdana;font-weight:bold;color:#000000 !important;text-align:center;outline:none;background-color: #edeff4;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',
		'#BypassFanPagesBox a:hover {border:1px solid #B6D9EE;background-color:#d8dfea;color:#000000 !important;text-decoration:none;}',
		'#BypassFanPagesBox img, #BypassFanPagesBox a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}'
	];
	
	GM_addStyle(styles.join("\r\n"));

	var submitBox = document.createElement('div');
	document.body.appendChild(submitBox);
	submitBox.id = 'BypassFanPagesBox';
	submitBox.innerHTML = '<a title="Submit this Fan Page for us to Bypass" target="_blank" href="' + submit_url + '"><img src="'+icon+'" width="24" height="24" /> Submit</a>';
}