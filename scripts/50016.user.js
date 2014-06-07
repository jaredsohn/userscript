// ==UserScript==
// @name           test3
// @description    tayyar test3
// @copyright      2009, Hasan Tayyar BEŞİK (http://hasantayyar.tekabul.com)
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        *
// ==/UserScript==

// Add jQuery
var jq = document.createElement('script');
jq.src = 'http://jquery.com/src/jquery-latest.js';
jq.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jq);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; fonksiyon(); }
}
GM_wait();



function fonksiyon(){
	var obje = document.createElement("div");
	obje.innerHTML = 	'<div style="width:100%;height:25px;z-index:100; background:#7FDFF8;color:#050505;position:relative; top:0" id="twits">'+
						'</div>';
	document.body.insertBefore(obje, document.body.firstChild);

	var siteName = 'htayyar';
		$.getJSON(
			'http://search.twitter.com/search.json?callback=?&rpp=50&q=from:' + siteName,
			function(data) {
				$.each(data, function(i, tweets) {
					//for(var num = 0; num < tweets.length; num++) {
							//if(tweets[num].text !== undefined) {
							//$('#twits').append('<span>' + tweets[num].text + '</span><br />');
							if(tweets[0].text !== undefined) {
							$('#twits').append('<span>' + tweets[0].text + '</span><br />');
						}
					// }
				});
			}
		);
	var st=setTimeout("fonksiyon()",2000); 
}