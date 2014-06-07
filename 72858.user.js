// ==UserScript==
// @name           News Farmville Italia 
// @include        http://apps.facebook.com/onthefarm/inde*
// ==/UserScript==

var versione = '1.0';

var contenuto =''

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://farmville-italia.com/news.txt',
    onload: function(responseDetails) {
		document.getElementById('data').innerHTML = responseDetails.responseText;
    }
});

(function() {
var head = document.getElementsByTagName('head')[0], 
    style = document.createElement('style'), 
    css = '#right_column { width: 77% !important; }' +
          ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
          ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
          ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
          '.PYMK_Reqs_Sidebar, .LSplitPage_Right { display:' +
          ' none !important; } #wallpage { width: 700px !important; }' +
          ' .LSplitView_ContentWithNoLeftColumn, ' +
          '.FN_feedbackview { width: 100% !important; }';
if (!head || self.location != top.location) {return}
style.type = 'text/css';
try {style.innerHTML = css}
catch(x) {style.innerText = css}
head.appendChild(style);
})();

var outFrame = '<div id="data"></div>';

var outData=document.createElement("div");
	outData.setAttribute("style", "border: 1px solid rgb(59, 89, 152); padding: 5px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; position: fixed; left: 2px; top: 43px;");

	outData.innerHTML=outFrame;

document.getElementById('content').appendChild(outData);
