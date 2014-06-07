// ==UserScript==
// @name            Torrents Calculator
// @autor           Copyright (icq:190800)
// @version         1.2.2
// @namespace       Torrents
// @description     Active Torrents Calculator based on Russian language
// @include         http://*/forum/tracker.php*
// ==/UserScript==

function getElemByName(name){return document.getElementsByName(name)[0];}
function trim(string){return string.replace(/(^\s+)|(\s+$)/g, "");}
function set_cookie(name, value){expires=new Date();expires.setTime(expires.getTime()+86400000);document.cookie=name+"="+escape(value)+"; expires="+expires.toGMTString()+"; path=/forum/";}
function getCookie(name){var cookie=" "+document.cookie;var search=" "+name+"=";var setStr=null;var offset=0;var end=0;if(cookie.length>0){offset=cookie.indexOf(search);if(offset!=-1){offset+=search.length;end=cookie.indexOf(";", offset);if(end==-1){end=cookie.length;}setStr=unescape(cookie.substring(offset, end));}}return(setStr);}
function my_torrents(){getElemByName('my').checked=true;getElemByName('submit').click();}
function to_page(numb){numb=(numb-1)*30;window.location.href = 'http://torrents.telecom.by/forum/tracker.php?start='+numb;}
function to_total_size(numeric, unit){if(unit=='MB'){kb=parseFloat(numeric)*1024;}else if(unit=='GB'){kb = parseFloat(numeric)*1048576;}else{kb = parseFloat(numeric);}sum_size += kb;}

var sum_size = 0;
var checked = 0;
var not_checked = 0;
var adress = window.location.href;
var pg = (a=adress.match(/([0-9]+)/))?a[0]/30+1:1;
function calculate(){
	if(getElemByName('prev_my').value==0){
		my_torrents();
	}else{
		var torrents = document.getElementsByClassName('forumline')[0];
		var torrents_numbs = torrents.rows.length;
		for(var i=1;i<torrents_numbs-1;i++){
			a = torrents.rows[i].cells[1].innerHTML.replace(new RegExp("<b>|</b>|</span>|<span(?:[^>]+(?:[>]+))",'g'), "");
			if(trim(a)=='√'){
				arr = torrents.rows[i].cells[6].innerHTML.split('&nbsp;');
				to_total_size(arr[0],arr[1]);
				checked++;
			}else{
				not_checked++;
			}
		}
		pages = Math.ceil(document.getElementsByClassName('floatR')[0].innerHTML.match(/([0-9]+)/)[0]/30);
		next_page = pg+1;
		if(next_page==2){set_cookie('sum_size',0);set_cookie('checked',0);set_cookie('not_checked',0);}
		set_cookie('sum_size',sum_size+parseFloat(getCookie('sum_size')));
		set_cookie('checked',checked+parseFloat(getCookie('checked')));
		set_cookie('not_checked',not_checked+parseFloat(getCookie('not_checked')));
		if(next_page<=pages){
			to_page(next_page);
		}else{
			result_size = parseFloat(getCookie('sum_size'));
			result_count = parseFloat(getCookie('checked'));
			result_not_checked = parseFloat(getCookie('not_checked'));
			if(result_size/1048576>1){size_txt=result_size/1048576;size_pref='Гб';}
			else if(result_size/1024>1){size_txt=result_size/1024;size_pref='Мб';}
			else{size_txt=result_size;size_pref='Кб';}
			result_block = '<div style="border:1px solid rgb(183,192,197);"><div class="thHead">Калькулятор : Результаты</div><div class="row1" style="padding:5px;"><p><b>Размер проверенных торрентов: </b>'+size_txt.toFixed(2)+' '+size_pref+'</p><p><b>Количество проверенных торрентов: </b>'+result_count+'</p><p><b>Количество непроверенных/неодобренных торрентов: </b>'+result_not_checked+'</p></div><div class="row3 pad_4 tCenter">&nbsp;</div></div>';
			document.getElementById('result_size').innerHTML = result_block;
		}
	}
}

function main(){
	document.getElementById('main_content_wrap').innerHTML = '<div style="text-align:center"><input class="bold long" value="Произвести расчёт" type="button" id="a_calc"></div><br/><div id="result_size"></div>'+document.getElementById('main_content_wrap').innerHTML;
	a_calc=document.getElementById('a_calc');
	a_calc.addEventListener('click', function () {if(pg==1){calculate();}}, false);

	if(pg>1){calculate();a_calc.disabled=true;}
}

main();
























