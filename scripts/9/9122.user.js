/*
    Google Ad Art!
    (c) Pedro Markun, pedromarkun@jornaldedebates.com.br
    http://www.auszug.org/

    =)
*/

// ==UserScript==
// @name            Google Ad art!
// @namespace       http://www.auszug.org/
// @description     (2007-05-08) Exchanges Google Ads for neat Haikus!
// @include         http://*
// @include         https://*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

haiku = new Array();
haiku[0] = 'An old mere<br />When the frogs jump in<br />The sound of water';
haiku[1] = 'up to now<br />people tramped there...<br />field of flowers';
haiku[2] = 'for three pennies<br />nothing but mist...<br />telescope';
haiku[3] = "on New Year's day<br />a cute little pilgrim<br />at the gate";
haiku[4] = 'blossoms--<br />from this morning on<br />39 springs to go';
haiku[5] = 'birds in the clouds<br />people in the sea...<br />a holiday';
haiku[6] = 'To a leg of a heron<br />Adding a long shank<br />Of a pheasant.';
haiku[7] = 'The wind from Mt. Fuji<br />I put it on the fan.<br />Here, the souvenir from Edo.';
haiku[8] = 'Sleep on horseback,<br />The far moon in a continuing dream,<br />Steam of roasting tea.';
haiku[9] = 'Spring departs.<br />Birds cry<br />Fishes eyes are filled with tears';
haiku[10] = 'A autumn wind<br />More white<br />Than the rocks in the rocky mountain.<br />';
haiku[11] = 'Even a wild boar<br />With all other things<br />Blew in this storm.';
haiku[12] = 'Bush clover in blossom waves<br />Without spilling<br />A drop of dew.';
haiku[13] = 'The crescent lights<br />The misty ground.<br />Buckwheat flowers.';
haiku[14] = 'birds in the clouds<br />people in the sea...<br />a holiday';
haiku[15] = 'camellia blossoms<br />come falling in...<br />bamboo grove';
haiku[16] = 'kindly the wind<br />sweeps my sooty<br />hut';
haiku[17] = 'even soot-sweeping<br />on an unlucky day...<br />so much harder!';
haiku[18] = 'after a hacking cold<br />right away...<br />Twelfth Month singers';
haiku[19] = 'my dwelling--<br />somewhere behind<br />the bundled snow';
haiku[20] = 'on the fresh-plowed<br />field fallen leaves<br />scatter';
haiku[21] = 'the kitten dances<br />round and round...<br />falling leaves';
haiku[22] = 'a new spring starting<br />early, so early<br />turns sour';
haiku[23] = 'from this year on<br />clear profit, carousing<br />in this world';
haiku[24] = "springs first dawn--<br />there's not a village<br />where it isn't";
haiku[25] = 'roof after roof<br />windows open all at once...<br />first of spring';
haiku[26] = 'at my gate<br />wildly it grows...<br />spring pine<br />';
haiku[27] = "it's sooty too--<br />the New Year god's<br />home";
haiku[28] = "even on Honen's Death-Day--<br />shaky feet<br />shaky hands";
haiku[29] = 'on the fast day<br />even the foot mill<br />is idle';
haiku[30] = "even for the man<br />pooping in the field...<br />New Year's pine";
haiku[31] = "the treasured child<br />writes with a cane...<br />year's first calligraphy";

var scripts = document.getElementsByTagName('body')[0];
if (!scripts) return;
scripts = scripts.getElementsByTagName('script');
if (!scripts) return;

var google_url = 'http://pagead2.googlesyndication.com/pagead/show_ads.js';
var yahoo_url = 'http://ypn-js.overture.com/partner/js/ypn.js';

var len = scripts.length;

for (var i = len-1; i >= 0; i--) {
	var f = scripts[i];
	var replace_text = '';

	if (f.src == google_url) {
		replace_text = haiku[Math.floor(Math.random() * haiku.length)];
	} else if (f.src == yahoo_url) {
		replace_text = 'Yahoo Ads Removed';
	}
	if (replace_text != '')
	{
		var ad_notice = document.createElement("div");
		f.parentNode.insertBefore(ad_notice, f);
		ad_notice.innerHTML = replace_text;
		ad_notice.className = 'removed-ads';
		f.parentNode.removeChild(f);
	}
}

addGlobalStyle("iframe[name='google_ads_frame'], a[href^='http://pagead2.googlesyndication.com'] { display: none ! important; }");
addGlobalStyle("iframe[src^='http://ypn-js.overture.com'] { display: none ! important; }");
addGlobalStyle("div.removed-ads, " +
               " a.ad_origin[href='http://www.google.com/ads_by_google.html']:link, " +
			   " a.ad_origin[href='http://www.google.com/ads_by_google.html']:visited, " +
			   " a.ad_origin[href='http://www.google.com/ads_by_google.html']:hover, " +
			   " a.ad_origin[href='http://www.google.com/ads_by_google.html']:active { width: 100%; border: 1px solid #CCC; text-align: center; color: #333; background-color: #FFF; font-weight: bold; text-decoration: none ! important; }");
addGlobalStyle("a.ad_origin[href='http://www.google.com/ads_by_google.html']:after { content: ' Removed'; }");