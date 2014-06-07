// ==UserScript==
// @name           Achive [GW]
// @namespace      Sviatoy
// @description    Достижения [v 1.0]
// @include        http://www.ganjawars.ru/info.ach.php*
// ==/UserScript==


var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var key = 0;
var tmp_meters = new Array();

main_table = root.document.getElementsByTagName('table');
for(i = main_table.length-1, len = 0; i > len; i--){
	if(main_table[i].innerHTML.indexOf("/info.php?id=")!= -1){
		tb_id = main_table[i];
	}
}
	tb_zero = document.getElementsByTagName('center')[0];
var regId =/\?id\=(\d+)"/ ;
tmp_id = regId.exec(tb_id.rows[1].cells[0].innerHTML)[1];

if(location.href.indexOf("http://www.ganjawars.ru/info.ach.php?id="+tmp_id) != -1){
	if(typeof(root.localStorage) == 'undefined' ){
 		alert('Achive [GW]: Ваш браузер не поддерживает LocalStorage(), обновите барузер или удалите скрипт.');
		
 	}else{
		main();
 	}
}

function main(){
	find_now_meters();
	now_achiv = tmp_meters;
	var achiv = localStorage.getItem('achiv');

	if(achiv == null){
		achiv = now_achiv.join("|");
		localStorage.setItem('achiv', achiv);
	}	
		tb_zero.innerHTML = tb_zero.innerHTML.replace("Достижения","<b style='font-size: 10px; cursor:pointer;' onclick='set_new()' id='tb_zero'><u>сбросить счетчики</u></b>");
	print_meters(now_achiv);
}

function find_meters_for(tb_scils,k,l){
	n=0;
	for(i=k; i < l; i++){
		n++;
		tmp_meter = tb_scils.rows[n].textContent; 	
		tmp_meter = /выполнено\s\((.+)\sиз/.exec(tmp_meter)[1];
		tmp_meters[i] = tmp_meter;
	}


}

function find_now_meters(){
	tb_scils1 = root.document.getElementById('group1').parentNode.parentNode.parentNode;
	find_meters_for(tb_scils1,0,14);
	tb_scils2 = root.document.getElementById('group2').parentNode.parentNode.parentNode;
	find_meters_for(tb_scils2,14,27);
	tb_scils3 = root.document.getElementById('group3').parentNode.parentNode.parentNode;
	find_meters_for(tb_scils3,27,32);
	tb_scils4 = root.document.getElementById('group4').parentNode.parentNode.parentNode;
	find_meters_for(tb_scils4,32,40);
	tb_scils5 = root.document.getElementById('group5').parentNode.parentNode.parentNode;
	find_meters_for(tb_scils5,40,52);
	tb_scils6 = root.document.getElementById('group6').parentNode.parentNode.parentNode;
	find_meters_for(tb_scils6,52,54);

}

function print_numbers(k,j,achiv,now_achiv,tb_scils){
	for(i=k; i < j; i++){
		n=i-k;
		meter = tb_scils.rows[n+1].cells[0];	
	
		reg1 = /(\d+)\%\sвыполнено/.exec(meter.textContent)[1];
		if (reg1.match("100")){
			meter.parentNode.innerHTML = "";
		}else{
			tmp = parseFloat(now_achiv[i]) - parseFloat(achiv[i]);
			tmp = tmp.toFixed(0);
			if(tmp>0){
				meter.innerHTML = meter.innerHTML.replace(")<",")</font>&nbsp;&nbsp;<font color=red style='font-size: 9px;'>"+ tmp +"<");
			}
		}
	}
}

function print_meters(now_achiv){	
	achiv = localStorage.getItem('achiv').split("|");
	print_numbers(0,14,achiv,now_achiv,tb_scils1);
	print_numbers(14,27,achiv,now_achiv,tb_scils2);
	print_numbers(27,32,achiv,now_achiv,tb_scils3);
	print_numbers(32,40,achiv,now_achiv,tb_scils4);
	print_numbers(40,52,achiv,now_achiv,tb_scils5);
	print_numbers(52,54,achiv,now_achiv,tb_scils6);
}

root.set_new = function(){
	if(confirm("Сбросить счетчики?")){
		localStorage.setItem('achiv', tmp_meters.join("|"));
	}
}