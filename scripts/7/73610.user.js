// ==UserScript==
// @name           Banden-Finanzen
// @namespace      11235813[Bande:Dritteliga Penner]
// @description    Ermittelt Gesamt-Auszahlung / Bilanz der letzten 7 Tage
// @include        http://*game*/gang/memberlist/*
// @include        http://*bumrise*/gang/memberlist/*
// @require		   http://github.com/Zahlii/Greasemonkey/raw/master/extend_js.js
// ==/UserScript==
var user = {};
var SHOW_LAST = 7;
GM_addStyle('.positive {color:#00CC00;} .negative {color:#FF0000;}');
function get_data() {
	HTTP_Request(
	{
		 method:'GET',
		 url:'http://'+document.location.hostname+'/gang/credit/?showall=1',
		 autoparse:true,
		 onSuccess:function(dom) {
			 var table = $('table',dom);
			 for(var a = 1;a < table.length;a++) {
				 var current = table[a];
				 var name = $('a',current)[0].textContent;
				 if(!user[name]) user[name] = {};
				 var date = current.textContent.match(/\d{2,2}\.\d{2,2}\.\s+\d{2,2}:\d{2,2}/);
				 if(!is_facility(current.textContent)) {
					 user[name][date] = trim($('span',current)[1].textContent);
				 } else {
					 //alert(current.textContent);
				 }
			 }
			 finish();
		 }
	}
	);
}
function finish() {
	var target = $('#pgmemberlist-table')[0];
	target.style.width = '750px';
	var heading = createElement('th',{class:'pg-list-cash'},'Letzte '+SHOW_LAST);
	var headrow = $('.pg-list-rank',target)[0].parentNode;
        headrow.insertBefore(heading,$('.pg-list-rank',target)[0]);
	var heading = createElement('th',{class:'pg-list-cash'},'Auszahlung &sum;');
        headrow.insertBefore(heading,$('.pg-list-rank',target)[0]);
	var rows = $('tr',target);
	for(var b = 1;b<rows.length;b++) {
		var row = rows[b];
		var name = $('a',row)[0].textContent;
		var sum = get_sum(user[name],false,'NEG');
		var sum2 = get_sum(user[name],SHOW_LAST,'POS');
		var feld = createElement('td',{class:(sum[1]?'positive':'negative')},sum[0]);
                row.insertBefore(feld,$('td',row)[2]);
		var feld = createElement('td',{class:(sum2[1]?'positive':'negative')},sum2[0]);
		row.insertBefore(feld,$('td',row)[2]);
	}
	document.body.appendChild(createElement('script',{type:'text/javascript'},'new SortingTable("pgmemberlist-table");'));
}
function is_facility(string) {
	return Boolean(string.match(/(a commencé|startete|started)/) || string.match(/gekauft/));
}
function get_sum(data,range,flag) {
	if(!data) data = {'':'0'};
	if(!flag) flag = 'ALL';
	if(!range) range = false;
	var sum = 0;
	for(var date in data) {
		z = data[date];
		d = strtotime(date,'d.m. H:i','NOW_TO_DEFAULT');
		var dif = ((new Date)-d);
		if(range && dif>range*1000*24*3600) continue;
		pos = !z.match(/-/);
		z = z.match(/\d+/g).join('');
		z = parseInt(z,10)/100;
		z = pos ? z : -1*z;
		//alert(z);
		if(flag=='ALL') {
			sum += z;
		} else if(flag=='POS' && z>=0) {
			sum += z;
		} else if(flag=='NEG' && z<0) {
			sum += z;
		}
	}
	var plus = sum>=0;
	sum = number_format(sum,2,',','.');
	sum = sum.replace(/-/,'-&euro;');
	sum = sum.match(/-/) ? sum: '&euro;'+sum;
	return [sum,plus];
}
get_data();