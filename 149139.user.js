// ==UserScript==
// @name           Orzx Helper
// @description    Make [bt.orzx.co] have a better download method.
// @namespace      http://jixun.org/
// @require        http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js
// @include        http://bt.orzx.co/*.php?*
// @version        1.0
// @copyright  2012+, jixun66
// ==/UserScript==
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
var dl_link = getURLParameter('id');
var dl_html;
var l_href  = location.href;
var pref, html;
function next() {
	var t = $(pref + '.showdowntd1:eq(0)').removeAttr('bgcolor').css('background-color', '#F5F8F3');// Style fix
	var n = t.before(t.clone().wrap('<p/>').parent().html());
	n.css('background-color', 'white');
	var d = n.find('td:eq(0)').html('DL Link:').parent().find('td:eq(1)');
	d.html('Loading...');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://bt.orzx.co/Download.php?id=' + dl_link,
		onload: function(response){
			dl_link = '/' + (new RegExp(/\" action=\"(.+?)\"/im).exec(response.responseText.replace(/'/gi,"\""))||[,""])[1];
			$('.showdowntd1:last a').attr('href', dl_link);
			dl_html = '<a class="redLink" href="' + dl_link + '">　&gt;&gt; Click here to download the torrent &lt;&lt;</a>';
			d.html(dl_html);
			$(".redLink").css('color', 'red')
		},
		onerror: function(e){
			d.html('Unknown error occurred.');
			$(".redLink").css('color', 'red');
		}
	});
}

if (l_href.search(/\/view\.php/i) != -1) {
    // If is on view.php, then:
	pref = 'tr ';
	next ();
} else if (l_href.search(/\/display\.php/i) != -1) {
    // If is on display.php, then:
	pref = '#tDl_div ';
	var dl_box=$('dl.hotAct ').parent().parent().append('<div id="tDl_div"><h3>Download info</h3></div>').find(pref);
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://bt.orzx.co/view.php?id=' + dl_link,
		onload: function(response){
			html = (new RegExp(/id\=\"showdownload\"([\s\S]*)<img src=\"images\/loading\.gif\"/im).exec(response.responseText)||[,""])[1];
			html = (new RegExp(/>([\s\S]*)<tr>/im).exec(html)||[,""])[1];
			/* Thanks for regexpal.com providing such a good RegExp debuging tool :D */
			html = html.replace ((new RegExp(/<td width=\"([\d]+)%\"(.+)rowspan=\"([\d]+)\"( |>)([\s\S]*?)<\/td>/im).exec(html))[0], '');
			dl_box.append ('<table>' + html + '</table>');
			dl_box.find('tr:eq(0) td:eq(1)').css('width','85%');// Style fix
			next();
		},
		onerror: function(e){
			dl_box.append ('<p>Unknown error occurred.</p>');
		}
	});
} else {
	// Do nothing.
}
