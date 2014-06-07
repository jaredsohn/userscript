// ==UserScript==
// @name 	Keep Tube: Download Youtube Videos (HD/HQ MP4, FLV, 3GP) Dailymotion, Metacafe, Google, Spike, Myspace, Facebook, Veoh, Break, Current, Redtube and more!
// @namespace 	http://userscripts.org/users/47636
// @description Download Youtube Videos (HD/HQ MP4, FLV, 3GP) Dailymotion (HQ MP4, FLV), Google (HQ MP4, FLV), Break (HQ MP4, FLV), Metacafe, Spike, Myspace, Facebook, Veoh, Current, Redtube and more! Check out http://keep-tube.com/supported-websites.php for more info.
// @version     1
// @date 	2009-05-01
// @creator 	webmaster@keep-tube.com
// @include	http://*youtube.com/*v=*
// @include	http://video.google.*docid=*
// @include	http://*dailymotion.*video*
// @include	http://*metacafe.*watch*
// @include	http://*veoh.*videos*
// @include	http://*myspace.com/*VideoID=*
// @include	http://*facebook.com/*video*
// @include	http://*spike.com/*video*
// @include	http://*current.com/*
// @include	http://*break.com/*
// @include	http://redtube.com/*
// @include	http://www.redtube.com/*
// @include	http://*youporn.com/*watch*
// @include	http://*pornhub.com/*video*
// @include	http://*spankwire.com/*video*
// @include	http://*pornotube.com/*media*
// @include	http://*pornotube.com/*m=*
// @exclude	http://*break.com/
// @exclude	http://*current.com/
// @exclude	http://*redtube.com/
// @exclude	http://keep-tube.com/*
// @exclude	http://www.keep-tube.com/*
// @homepage	http://keep-tube.com
// ==/UserScript==

var keepTubeIcon = 'data:image/gif;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPjyb/zQxsf8xLrP/Mi+3/ysnuP8sKLr/LSm7/y0qu/8rKLr/Kye5/zMvuf8yL7X/MC2w/0ZEtf8AAAAAPT2L/yoo3f8/PtT/R0bV/ygmzf9WVdj/T03V/0JA0/9BP9L/U1LW/1ZV2P8kIsz/PjzT/2Vk3f8tK9b/aWjP/zMzp/8iItn/////sEFB1f/j4/f/wsHv/6Wl6/9qavD/n5/p/7y87v/i4vj/Vlbl/8fG8f+6uu7/tLTt/01M2v84OLz/Jyfg/////7lPT9//ysv0/2Bg6v+oqO7/T0/f/6Ok7f9fXun/w8Pz/5eY6//T0/X/UVHn/15e6v9NTN//Pz/L/y4t6P////+5U1Pl/87O9v9kZO3/qany/1NT5f+mpvH/YWDs/8TE9v+Wlu7/4uL5/7+/8//CwfX/T07m/0JBz/80MvH/////uVpZ7f/Y2Pn/Z2fv/7Oz9v9aWe3/pKT0/7u79v/n5/v/YWDt/9TU+P+xsPT/v7/2/1NU7f8/P8T/OTn2/////7lISO3/eXnv/11d7v9lZe//SEjt/62u9v9dXe7/YWHu/zo67P9lZe//mpzz/1Ja7v9nb/P/Pj6u/////8z////vm5vz/y4u7f86Ou7/Li3t/0pK7f+npvP/YWHv/ysr7v9AQvD/P0Xw/0RQ8f9ecfX/lqH1/4ODpf9GRvf/Q0Pv/0JC7P9CQuz/PT3u/z097v89Pe7/P0Ds/0FC7v9ESfD/TVjx/15v9P97j/f/l6b7/9rc9/8AAAAAs7PL/7S07/+mpvT/m5v1/5iY9v+YmPb/mZn2/5iY9v+Zmfb/nJ/3/6Wp9v+ztvX/yMrz/9DR4/8AAAAAAJQS/wCUEjEAlBLwAJQSkwCUEv8AlBL+AJQS4gCUElkAlBL+AJQS/gCUEuUAlBJZAJQS6gCUEn4AAAAAAAAAAACUEv8AlBK1AJQS/ACUElkAlBL/AJQSnGrAdETU7dcOAJQS+gCUEpFqwHRA1O3XDgCUEvgAlBKUKqU5KAAAAAAAlBL/AJQS9ACUEpAAAAAAAJQS/wCUEvAGlhjlVLdgOwCUEvkAlBLwBpYY4lS3YDsAlBL/AJQS7ACUEtsZnil/AJQS/wCUEv8AlBKHAAAAAACUEv8AlBLWEZshxn/JiCwAlBL7AJQS0h6gLqh/yYgsAJQS/wCUEjEAlBKoAJQS3ACUEv8AlBK5AJQS7ACUElkAlBL/AJQSpVS3YFKp268dAJQS/wCUEqVUt2BSqduvHQCUEv8AlBIxAJQSkwCUEtwAlBL/AJQSWQCUEv8AlBKTAJQS/wCUEvMAlBLSAJQSWQCUEv8AlBLzAJQS2wCUElkAlBL/AJQS/wCUEv8AlBIxgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAAADAAAAAQAAEAAAABAAAAAAAAAAAAAAAA==';

var url = escape(document.URL);
var dl_url = 'http://keep-tube.com/?url='+url;

checkForUpdate(false);

addDownloadBox();

if (url.indexOf('youtube.com')!=-1){
	addDownloadLink();
}

function checkForUpdate(a) {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (a || !lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://userscripts.org/scripts/source/47636.user.js',
			onload: function(results) {
			var version = results.responseText.match(/version[ ]*([0-9]+)/i)[1];
				if (version.length && version.length<5 && version != 1) {
					if (confirm('[ Greasemonkey ] Keep Tube : Version '+ version +' is now available. Update?')) {
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

function addDownloadLink(url){
	var title = document.getElementById("watch-vid-title").innerHTML.replace("</h1>","");
	title +=' [ <img src="' + keepTubeIcon + '" alt="" valign="middle"/> <a href="' + dl_url + '">Download</a> ]';
	document.getElementById("watch-vid-title").innerHTML = title;
}

function addDownloadBox(url) {
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