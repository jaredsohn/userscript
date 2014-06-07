// ==UserScript==
// @name           nicovideo peephole
// @namespace      http://fuba.moaningnerds.org/
// @include        http://www.nicovideo.jp/mylist/*
// ==/UserScript==

(function () {
if (document.getElementById('mylists')) return;

var atom = document.getElementsByTagName('link')[0].href;
var req = new XMLHttpRequest();
req.open('GET', atom, false);
req.send(null);
if (req.status == 200) {
	var xml = req.responseXML;
	var xmltitle = xml.getElementsByTagName('title')[0].textContent;
	var xmlsubtitle = xml.getElementsByTagName('subtitle')[0].textContent;
	var entries = xml.getElementsByTagName('entry');
	
	var b = document.getElementById('PAGEBODY');
	
	var html = <div style="margin: 0pt 160px; width: 640px; text-align: center;">
		<div class="mb16p4">
			<h1 style="border-bottom: solid 2px #666;margin-bottom: 4px;">{xmltitle}</h1>
			<p class="TXT12">{xmlsubtitle}</p>
		</div>
		<table width="640" cellspacing="0" cellpadding="4" border="0" style="margin-bottom: 16px;" summary="一覧" id="mylists">
        </table>
	</div>;
	
	for (var i=entries.length-1;i>=0;i--) {
		var title = entries[i].getElementsByTagName('title')[0].textContent;
		var link = entries[i].getElementsByTagName('link')[0].attributes.getNamedItem('href').value;
		
		var txt = entries[i].getElementsByTagName('content')[0].textContent;
		var content = new XML('<p class="TXT12">' + txt + '</p>');
		
		var tr = <tr>
			<td>
				<h3 style="margin: 4px 0px;">
					<a href={link} class="video">{title}</a>
				</h3>
			</td>
		</tr>;
		
		tr.td.appendChild(content);
		
		html..table.appendChild(tr);
	}
	
	b.innerHTML = html.toString() + b.innerHTML;
}
})();

