// ==UserScript==
// @name          IEScripts for UserScripts
// @namespace     http://iescripts.org/
// @description	  Display IE7Pro's IEScripts in http://userscripts.org/
// @include       http://userscripts.org/
// @include       http://www.userscripts.org/
// ==/UserScript==

//
// IE7pro Script
//

(function() {

var logo_iescripts = 'data:image/gif;base64,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';


function getValue(s, start, end)
{
	var p1 = s.indexOf(start);
	if(p1 == -1) return '';

	p1 += start.length;

	var p2 = s.indexOf(end, p1);
	if(p2 == -1) return '';

	return s.substring(p1, p2);
}

function trim(str)
{
	return str.replace(/^\s*|\s*$/g,"");
}

//get script list from userscripts.org

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://iescripts.org/',
	onload: function(resp){

		var text = resp.responseText;

		//locate position
		var form = document.getElementsByTagName('form')[0];
		var div = document.createElement('div');
		div.style.width='220px';
		div.style.marginTop = '15px';
		div.style.marginLeft = '4px';
		div.style.marginBottom = '12px';
		div.style.padding = '0px';
		div.style.fontSize = '11px';

		var subs = getValue(text, '<table width=280 align=center cellpadding=10 cellspacing=1 bgcolor=#dddddd>', '</table>');

/*
<tr><td align=left><li class=text><a class=text href=view-scripts-59p1.htm>ActiveX Control Auto Activate </a></li></td><td align=left><font color=#999999>2007-04-27</font></td></tr>
*/
		var content = '<table width=280  cellpadding=10 cellspacing=1 bgcolor=#ffffff>';
		content += '<tr><td colspan=2><span align=middle><img width=35 height=35 src="' + logo_iescripts + '"><a href=http://iescripts.org/ target=_blank><span style="font-size:18px;color:#0000FF;">IEScripts Releases</span></span></a></td></tr>';
		var p1 = 0;
		while(true){
			var delim = '<tr><td align=left><li class=text>';
			p1 = subs.indexOf(delim, p1);
			if(p1 == -1) break;
			p1 += delim.length;
			var p2 = subs.indexOf('</tr>', p1);
			if(p2 == -1) break;

			var s0 = subs.substring(p1, p2);

			var url = getValue(s0, ' href=', '>');
			url = 'http://iescripts.org/' + url;

			var s1 = getValue(s0, 'href=', '</li>');
			var name = getValue(s1, '>', '</a>');

			var time = getValue(s0, '<font color=#999999>', '</font>');

			content += '<tr><td><a href=' + url + ' target=_blank>' + name + '</a></td>';
			content += '<td>' + time + '</td></tr>';
			p1 = p2; 
		}

		content += '</table>';
		div.innerHTML = content;

		form.parentNode.insertBefore(div, form.nextSibling);
	}
});

})();
