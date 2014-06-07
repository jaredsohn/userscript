// ==UserScript==
// @name           War Stats for Poks [GW]
// @namespace      гном убийца
// @description    Показывает число побед, поражений и ничьих, с ботами, на странице логов боев. (v 1.0.03.11.10.1702)
// @include        http://www.ganjawars.ru/info.warstats.php?id=*
// ==/UserScript==


var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var request = new XMLHttpRequest();
var data = [];
var warlog = '';
var tmp_span = document.createElement('span');
var new_span = document.createElement('span');

var vins = 0;
var louses = 0;
var draw = 0;
var total = 0;

var my_url = document.getElementsByTagName('center')[0].getElementsByTagName('a')[0].href;
var page_id = 1; if(location.href.indexOf('page_id=')!= -1){page_id = parseInt(location.href.split('=')[2], 10) + 1;};

var url = 'http://www.ganjawars.ru/info.warstats.php?id=' + /^http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)/.exec(my_url)[1] + '&page_id=' + page_id;

var nobr = document.getElementsByTagName('nobr');
var last_day = nobr[nobr.length-2].textContent.split('.')[0];
var ins_nobr = nobr[1];

if(nobr[1] != null){
	 new_span.innerHTML += SummNobr(nobr, 0);
	 REQ(url, 'GET', null, false, function (req) {tmp_span.innerHTML = req.responseText;});
	 nobr = tmp_span.getElementsByTagName('nobr');
	 new_span.innerHTML += SummNobr(nobr, 1);
	 
	 main(new_span);
}

function SummNobr(nobr, key){
	str = '';
	for(var i=1, len = nobr.length; i < len; i++){
		if(key == 0){
	 		str += "<nobr>" + nobr[i].innerHTML + "</nobr><br>";
		}else{
			if(i%2){
				if(last_day == nobr[i].textContent.split('.')[0]){
					str += "<nobr>" + nobr[i].innerHTML + "</nobr><nobr>" + nobr[i+1].innerHTML + "</nobr><br>";
				}else{
					return str;	
				}
			}
		}
	}
	return str;
}



function main(new_span){
 var nobr = new_span.getElementsByTagName('nobr');
 var day = nobr[0].textContent.split('.')[0];
 
 for(var i=0, j=0, len = nobr.length; i < len; i++){
	next_day = nobr[i].textContent.split('.')[0];
	
	warlog = nobr[i + 1];
	
	if(day != next_day ){
		j++;
		louses = vins = draw = total = 0; 
	};
	
	if(warlog.innerHTML.indexOf(' vs ')!= -1){
		warlog_vs = warlog.innerHTML.split(' vs ');
	
		if(warlog_vs[0].indexOf('</a>') == -1 || warlog_vs[1].indexOf('</a>') == -1){
			_a = warlog.getElementsByTagName('a');
			for(var k=0, len_a = _a.length; k < len_a; k++){
				if(_a[k].href == my_url){
					if(_a[k].style.color == '#0000ff' || _a[k].style.color == 'blue'){
						louses++;
					}
					if(_a[k].style.color == '#ff0000' || _a[k].style.color == 'red'){
						vins++;
					}
					if(_a[k].style.color == '#008000' || _a[k].style.color == 'green'){
						draw++;
					}
					break
				}
			}
			total++;
		}
	}
	
	data[j] = [parseInt(day, 10), vins, louses, draw, total];
	
	day = nobr[i].textContent.split('.')[0];
	i++;
 }

 html = '';

 for(var i=0, len = data.length; i < len; i++){
	
	vins = data[i][1];
	louses = data[i][2];
	draw = data[i][3];
	total = data[i][4];
	
	if(total != 0){
		percent_v = parseInt((vins * 100)/ total, 10);
		percent_l = parseInt((louses * 100)/ total, 10);
		percent_d = parseInt((draw * 100)/ total, 10);
		
		html += '&nbsp;&nbsp;Бои с ботами за <b>'+data[i][0]+'-е</b>, из них: <font color=red>побед - <b>'+vins+'</b> ('+percent_v+'%)</font>, <font color=blue>поражений - <b>'+louses+'</b> ('+percent_l+'%)</font>, <font color=green>ничьих - <b>'+draw+'</b> ('+percent_d+'%)</font>, всего - <b>'+total+'</b>;<br>';
	}
 }
 
 if(html != ''){
 var stat_content = document.createElement('span');
 	 stat_content.innerHTML = html + '<br>';
	 ins_nobr.parentNode.insertBefore(stat_content, ins_nobr);
 }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
function REQ(url, method, param, async, onsuccess, onfailure) {
       request.open(method, url, async);
       request.send(param);
       if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
       else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
}
///////////////////////////////////////////////////////////////////////////////////////////////////