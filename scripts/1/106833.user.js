// ==UserScript==
// @name           YouTube Player (2010)
// @namespace      YouTube Player
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==

/**
 * TODO:
 *   -Modify "flashvars" in 'movie_player' to correct cc_module, cc3_module, and
 *    endscreen_module
 */
mp=document.getElementById('movie_player');
mp.setAttribute('style', 'min-height:390px');
document.getElementById('watch-player').setAttribute('style', 'background: none repeat scroll 0% 0% transparent;min-height:390px');

// In this version, I reformatted the "url_encoded_fmt_stream_map" to match the original
// format in "fmt_url_map" and all other vars that YouTube just threw away.

// On a personal note, I'm not sure how much more I'll be updating this script because
// I get the feeling that YouTube will change something drastic that will drop information
// not utilized by the new player but utilized by the old player.  It's an unfortunate
// realization that popular websites on the WWW need more APIs to let people be more
// creative instead of being conformists.

attr = mp.getAttribute('flashvars');
m1 = attr.match(/_map\=(.+?)\&/gi);
m1d = unescape(m1[0].substring(5));
ftpl = '[q]|[u]||[b]';
fsm = '';
fmts = m1d.split(',');
for(j=0;j<fmts.length;j++) {
	tmpfmt = fmts[j].split('&');
	tmptpl = ftpl;
	for (k=0;k<tmpfmt.length;k++) {
		tmpattr = tmpfmt[k].split('=');
		if (tmpattr[0] == 'url') tmptpl = tmptpl.replace(/\[u\]/gi, unescape(tmpattr[1]));
		else if (tmpattr[0] == 'itag') tmptpl = tmptpl.replace(/\[q\]/gi, tmpattr[1]);
		else if (tmpattr[0] == 'fallback_host') tmptpl = tmptpl.replace(/\[b\]/gi, tmpattr[1]);
	}
	if (fsm != '') fsm += ',';
	fsm += tmptpl;
}

attr += '&fmt_stream_map=' + escape(fsm);
attr += '&fmt_url_map=' + escape(fsm);
attr += '&fmt_map=' + escape(fsm);

attr += '&html5_unavailable=1';
str1 = '&rv.?.author=netnet336&rv.?.id=ttQSs35Z7nE&rv.%.length_seconds=167&rv.%.rating=&rv.%.thumbnailUrl=http%3A%2F%2Fi4.ytimg.com%2Fvi%2FGRHAwXzky_E%2Fdefault.jpg&rv.%.title=Hello+Fellow+User&rv.%.url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D8kgKBRW79Mw&rv.%.view_count=9001';
for (j=0;j<9;j++) attr+=str1.replace(/\?/g, j);
attr += '&sourceid=yw';

mp.setAttribute('flashvars', attr);
mp.setAttribute('src', 'http://s.ytimg.com/yt/swfbin/watch_as3-vflC42htw.swf');
