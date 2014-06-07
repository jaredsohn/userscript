// ==UserScript==
// @name           DS - Forum Autoload
// @include        http://de*.die-staemme.de/forum.php*
// ==/UserScript==
var url = document.URL;
var Ausdruck = /screen=view_thread/;
var ergebnis = Ausdruck.exec(url);
function iframesize() {
	var storage = window['localStorage'];
	if (storage.getItem(id+'_'+page)) {
		frame.height = storage.getItem(id+'_'+page);
		window.clearInterval(wait);
		//localStorage.clear();
	}
}
if (ergebnis != null) {
	var Ausdruck = /&iframe=true$/;
	var ergebnis = Ausdruck.exec(url);
	if (ergebnis == null) {
		var main = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0];
		var anzahl = main.getElementsByTagName('table').length-1;
		var td = main.getElementsByTagName('table')[anzahl].getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
		var ergebnis = td.innerHTML.match(/href\s*=\s*\"*[^\">]*/ig);
		var page_now = (parseInt(td.innerHTML.match(/<b>&gt;(.*?)&lt;<\/b>/)[1]) - 1);
		var array = new Array();
		if (ergebnis != null) {
			array = ergebnis.join("|").replace(/href=(.*?)\"/g,"").split("|");
		}
		if (array.length > 0) {
			for (var i = 0; i < array.length; i++) {
				var Ausdruck = /page=(.*?)$/;
				var ergebnis =  Ausdruck.exec(array[i]);
				if (ergebnis.length > 1) {
					var page = ergebnis[1];
					var link = array[i].replace(/&amp;/g, '&') + '&iframe=true';
					if (page_now < page) {
						var id = link.split("forum.php?screen=view_thread&thread_id=")[1].split("&")[0];
						var frame = document.createElement("iframe");
						frame.src = link;frame.style.border = 'none';frame.style.padding = 0;frame.style.margin = 0;frame.frameborder = 0;
						frame.scrolling = "no";frame.width = '100%';frame.height = '3000px';frame.name = 'iframe'+id;frame.id = 'iframe'+id;
						var wait = window.setInterval(iframesize, 100);
						var seiten_trenner = document.createElement("h3");
						seiten_trenner.innerHTML = 'Seite' + (parseInt(page) + 1);
						var table_after = main.getElementsByTagName('table')[anzahl];
						main.insertBefore(frame, table_after);
						main.insertBefore(seiten_trenner, frame);
						iframesize();
					}
				}
			}
		}
	}
	else {
		var main = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0];
		var anzahl = main.getElementsByTagName('table').length-1;
		main.getElementsByTagName('table')[0].style.display = 'none';
		main.getElementsByTagName('table')[1].style.display = 'none';
		main.getElementsByTagName('table')[anzahl].style.display = 'none';
		main.getElementsByTagName('div')[0].style.display = 'none';
		document.body.style.background = "transparent";
		document.body.getElementsByTagName('div')[0].getElementsByTagName('br')[0].style.display = 'none';
		document.body.getElementsByTagName('div')[0].style.background = "transparent";
		document.body.getElementsByTagName('div')[0].style.border = "none";
		document.body.getElementsByTagName('table')[0].style.border = "none";
		document.body.getElementsByTagName('table')[0].style.margin = 0;
		document.body.getElementsByTagName('table')[0].style.padding = 0;
		document.body.getElementsByTagName('table')[0].style.borderSpacing = 0;
		main.style.padding = 0;
		document.body.getElementsByTagName('div')[0].style.margin = 0;
		document.body.getElementsByTagName('div')[0].style.padding = 0;
		var td = main.getElementsByTagName('table')[2].getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
		var Ausdruck = /<a.*href="(.*?)"(?:>|\\ )\[(.*?)\](?:<\/a>)/;
		Ausdruck.exec(td.innerHTML);
		var link = RegExp.$1;
		var page = (parseInt(td.innerHTML.match(/<b>&gt;(.*?)&lt;<\/b>/)[1]) - 1);
		link = link.replace('&amp;', '&') + '&iframe=true';
		var id_arr = link.split("forum.php?screen=view_thread&thread_id=");
		id_arr = id_arr[1].split("&");
		var id = id_arr[0];
		var body = document.getElementsByTagName('body')[0];
		var div = document.getElementsByTagName('div')[0];
		var main2 = div.getElementsByTagName('div')[0];
		document.getElementsByTagName('p')[0].style.display = 'none';
		main2.style.display = 'none';
		body.style.margin = 0;
		body.style.padding = 0;
		div.style.width = "100%";
		div.style.margin = 0;
		div.id = "inhalt";
		var hid = document.createElement("div");
		hid.id = 'size';
		hid.innerHTML = document.body.offsetHeight;
		localStorage.setItem(id+'_'+page, hid.innerHTML);
	}
}