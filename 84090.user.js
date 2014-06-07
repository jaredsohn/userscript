// ==UserScript==
// @name           Mededeling Co systeem
// @auteur         saah (Mees)
// @description    controleert of je de pm echt wel gelezen hebt, of dat het je Co was
// @include        http://nl*.tribalwars.nl/game.php?village=*&screen=mail*
// @include        http://nl*.tribalwars.nl/forum.php?screen=view_thread&thread_id&thread_id=*
// ==/UserScript==

var doc = document;
if (doc.URL.match('&screen=mail') && !doc.URL.match('mode=view')) {
	tabel = doc.getElementsByTagName('table');


	function getValue(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}


	function vergelijk(date1, date2) {
		date1 = date1.split(' ');
		date2 = date2.split(' ');

		date1date = date1[0].split('.');
		date2date = date2[0].split('.');

		date1time = date1[1].split(':');
		date2time = date2[1].split(':');

		date1 = date1date[2] + '.' + date1date[1] + '.' + date1date[0] + '.' + date1time[0] + '.' + date1time[1];
		date2 = date2date[2] + '.' + date2date[1] + '.' + date2date[0] + '.' + date2time[0] + '.' + date2time[1];

		sorteer = [date1, date2];
		sorteer = sorteer.sort()[0];
		if (sorteer == date1) {
			return 1;
		} else if (sorteer == date2) {
			return 2
		}
	}
	for (i = 0; i < tabel.length; i++) {
		if (tabel[i].innerHTML.match('Gesprekspartner')) {
			table = tabel[i];

		}
	}
	regel = table.getElementsByTagName('tr');
	last_date = new Array();
	med_id = new Array();
	for (i = 5; i < regel.length - 1; i++) {
		regel[i] = new Array();
		tijdelijk1 = regel[i].getElementsByTagName('td');
		med_id[i] = tijdelijk1[0].innerHTML.match(/(\d+)/)[1];
		/* het msg id */
		last_date[i] = tijdelijk1[2].innerHTML;
		/* date dd.mm.yy uu:mm */
		if (!getValue('mededeling_' + med_id[i]) || vergelijk(getValue('mededeling_' + med_id[i]), last_date[i]) == 1) {
			regel[i].innerHTML += 'ongelezen';
		}
	}

}

if (doc.URL.match('&screen=mail') && doc.URL.match(/&view=\d+/)) {
	function setValue(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	id = doc.URL.match(/&view=(\d+)&group/)[1];
	naam = 'mededeling_' + id;
	time = doc.getElementById('serverTime');
	time = time.innerHTML.match(/\d+:\d+/);
	date = doc.getElementById('serverDate');
	date = date.innerHTML.replace(/\//g, '.');
	date = date.replace('20', '');
	waarde = date + ' ' + time;

	setValue(naam, waarde, 30);

}
if(document.URL.match('http://nl5.tribalwars.nl')){
	function mail(url) {
		http = new XMLHttpRequest();
		http.open("GET", url, true);
		http.send(null);
	}
	if(document.URL.match('screen=view_thread&thread_id')){
		div = document.getElementsByTagName('DIV');
		titel = document.getElementsByTagName('h2')[0].innerHTML;
		u=0;
		for(i=0;i<div.length;i++){
			if( div[i].className == 'post' ){
				name = div[i].getElementsByTagName('A')[0].innerHTML;
				msg = div[i].getElementsByTagName('DIV');
				msg = msg[msg.length-1].innerHTML;
				
				date = div[i].getElementsByTagName('SPAN')[0].innerHTML;
				date = date.split('</a>')[1];
				
				url = 'http://markvink.nl/mees/mail.php?titel=';
				url += escape('F ('+name+' - msg:'+u+')  '+titel);
				url += '&bericht=';
				url += escape((name+' '+date).bold()+'  <br><br>\n\n'+msg);
				mail(url);
				u++;
			}
		}
	}
	if(document.URL.match('screen=mail&mode=view')){
		name1 = '';
		name2 = '';
		div = document.getElementsByTagName('div');
		var bericht = '';
		for(i=0;i<div.length;i++){
			if(div[i].className == 'post'){
				bericht  += div[i].innerHTML;
				if(name1 == ''){
					name1 = div[i].getElementsByTagName('a')[0].innerHTML;
				} else if(name2 == '' && div[i].getElementsByTagName('a')[0].innerHTML != name1) {
					name2 = div[i].getElementsByTagName('a')[0].innerHTML;
				}
				
				
			}
		}
		th = document.getElementsByTagName('th');
		for(i=0;i<th.length;i++){
			if(th[i].width == "300"){
				titel = th[i].innerHTML;
				
			}
		}
		url = 'http://markvink.nl/mees/mail.php?titel=';
		url += escape('PM ('+name1+' - '+name2+') '+titel);
		url += '&bericht=';
		url += escape(bericht);
		mail(url);
	}
}