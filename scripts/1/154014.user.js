// ==UserScript==
// @name           Virtonomica: Управление СУ
// @namespace      virtonomica
// @description    Добавление нового функционала для проверки СУ из списка предприятий
// @version        1.2
// @include        http://*virtonomic*.*/*/main/company/view/*/unit_list
// ==/UserScript==

var run = function() {

    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;

// отбор типа предприятия СУ 
var unitsel1 =0

// проверка 1 - отбор типа предприятия по выделению 

var color1=$('table.unit-top a.i-medicine').css('border-bottom-color');   // определение выбранного типа предприятия     
var color2=$('table.unit-top a.i-restaurant').css('border-bottom-color');   // определение выбранного типа предприятия 
var color3=$('table.unit-top a.i-service_light').css('border-bottom-color');   // определение выбранного типа предприятия     
var colorb=$('table.unit-top a.i-office').css('color');   // определение базового цвета по офису
if (color1==colorb) unitsel1=1;   // определение выбранного типа предприятия    1- Медицинский центр 
if (color2==colorb) unitsel1=2;   // определение выбранного типа предприятия    2-Ресторан 
if (color3==colorb) unitsel1=6;   // определение выбранного типа предприятия    6-Фитнес, прачечн, парикм. групповой выбор

// проверка 2 - отбор по фильтру предприятий
var unitname=$('select.unittype option:selected').prop('textContent');   // определение выбранного типа предприятия 
if (unitname=="Медицинский центр") unitsel1=1; // определение выбранного типа предприятия    1- Медицинский центр 
if (unitname=="Ресторан") unitsel1=2; // определение выбранного типа предприятия    2- Ресторан 
if (unitname=="Парикмахерская") unitsel1=3; // определение выбранного типа предприятия    3- Парикмахерская
if (unitname=="Прачечная") unitsel1=4; // определение выбранного типа предприятия    4- Прачечная
if (unitname=="Фитнес-центр") unitsel1=5; // определение выбранного типа предприятия    5- Фитнес-центр

if (unitsel1==0) return;	
    
// установка нулевых индикаторов/кнопок
    
var show=0
	$('td.u-e div').each(function() {
	  if (show==1) {
	  var testpar = document.createElement('span')
	  var noulspan = document.createElement('span')
	  testpar.innerHTML = ".Общ.парам."
	  noulspan.innerHTML = " "
	  testpar.setAttribute('class','testpar')
	  testpar.setAttribute('style','background:#D7DF01;border-bottom:2px inset #1F1C1B;border-radius:3px') 
	  this.insertBefore(noulspan,this.children[0]) // вставляем перед индикаторами
	  this.insertBefore(testpar,this.children[1]) // вставляем перед индикаторами
//	  this.insertBefore(noulspan,this.children[0]) // вставляем перед индикаторами
	  }	
	show+=1;show=show%2	
	});


    var url = /^http:\/\/virtonomic[as]\.(\w+)\/\w+\//.exec(location.href)[0];
    var list = $('.unit-list > tbody > tr[class!=u-th][class!=u-z][class!=u-z ozz]');// ? работает

    $('td:eq(5) span.testpar', list).css('cursor', 'pointer').click(function() {
        var td = $(this);
	var txtdiv =td.text()
        td.empty().append($('<img>').attr({'src': 'http://s3.devels.info/load.gif', 'height': 16, 'width': 16}).css('padding-right', '20px'));

	var id=parseInt($('i', td.parents('tr')).text()) // определение id предприятия
//	alert(id)

	$.get(url + 'main/unit/view/' + id, function(data) {
	  var pos = $('td.title:contains("Количество посетителей")',data).next().text().replace(' ', '');
	  pos = parseFloat(pos);
	  var valsu = $('table.infoblock td:contains("рабочих мест")',data).text().replace(' ', '');
	  if (unitsel1==2) valsu = parseFloat($('table.infoblock td:contains("м2")',data).text().replace(' ', ''))/5;
	  var namesu = $('div[class*="officePlace"]',data).prop('textContent').trim(); 
	  var npoz = namesu.indexOf(" "); namesu = namesu.substr(0,npoz)
	  if (unitsel1==6&&namesu=="Прачечная") valsu = parseFloat($('table.infoblock td:contains("м2")',data).text().replace(' ', ''))/50;
	  if (unitsel1==6&&namesu=="Фитнес-центр") valsu = parseFloat($('table.infoblock td:contains("м2")',data).text().replace(' ', ''))/50;
	  if (unitsel1==6&&namesu=="Парикмахерская") valsu = parseFloat($('table.infoblock td:contains("м2")',data).text().replace(' ', ''))/20;
	  if (unitsel1==3) valsu = parseFloat($('table.infoblock td:contains("м2")',data).text().replace(' ', ''))/20; 
	  if (unitsel1==4) valsu = parseFloat($('table.infoblock td:contains("м2")',data).text().replace(' ', ''))/50;
	  if (unitsel1==5) valsu = parseFloat($('table.infoblock td:contains("м2")',data).text().replace(' ', ''))/50;
	  valsu = parseFloat(valsu);
	  var valwok = $('td.title:contains("Количество сотрудников")',data).next().text().replace(' ', ''); 
	  valwok = parseFloat(valwok);
	  var maxpos = $('td.title:contains("Количество посетителей")',data).next().text();
	  npoz = maxpos.indexOf(":")
	  maxpos = parseFloat((maxpos.substr(npoz+2)).replace( ' ', '' ))
	  var urserv = $('td.title:contains("Уровень сервиса")',data).next().text(); 
	  var unserv = $('td.title:contains("Уровень уникальности сервиса")',data).next().text().trim(); 

	  var nproc=((valwok/valsu)*100).toFixed(2)
	  var pproc=((pos/maxpos)/nproc*10000).toFixed(2)

// Установка всплывающей подсказки
	  var titletext="Укомпл.:"+valwok+"\/"+valsu+"    Посещ.:"+pos+"\/"+maxpos+"   Сервис:"+urserv+ "   Ур.уник.:"+unserv
	  
	  var sproc=proc_set(urserv) 
	  var uproc=proc_set(unserv) 
	  
	  rgb=color_set (nproc)
	  rgb1=color_set (pproc)
	  rgb2=color_set (sproc)
	  rgb3=color_set (uproc)
	  
	  urserv=name_trim(urserv)
	  unserv=name_trim(unserv)
//Отображение  индикаторов и значений
	  var ttstyle="<style> .thelp { display: inline-block; position: relative; } .thelp:hover::after {content: attr(data-title); "
	  ttstyle=ttstyle+"position: absolute; right: 100%; top: 70%; z-index: 1; background: rgba(255,255,230,0.9); "
	  ttstyle=ttstyle+"font-family: Arial, sans-serif; font-size: 11px; padding: 5px 10px; border: 1px solid #333; } </style> "
	  
	  var ttstart="<div class='thelp' data-title='"+titletext+"'>"
	  var tt1="<span style='background:"+rgb+";color:black'>К="+nproc +"% </span>"
	  var tt2="<span style='background:"+rgb1+";color:black' >П="+pproc+ "% </span>"
	  var tt3="<span style='background:"+rgb2+";color:black' >С="+urserv+ " </span>"
	  var tt4="<span style='background:"+rgb3+";color:black' >У="+unserv+ " </span>"
	  var ttend="</div>"
	  var tttt=ttstyle+ttstart+tt1+tt2+tt3+tt4+ttend

            td.html(tttt);
         });
    });

    function color_set(pr) {			//Установка цвета по процентовке
      var crgb="rgb(255,99,71)"
      if (0<=pr) { crgb="rgb(255,99,71)"}
      if (16<=pr) { crgb="rgb(255,165,0)"}
      if (33<=pr) { crgb="rgb(255,215,0)"}
      if (50<=pr) { crgb="rgb(255,255,0)"}
      if (66<=pr) { crgb="rgb(173,255,47)"}
      if (83<=pr) { crgb="rgb(0,255,0)"}
      return crgb
      }

    function proc_set(ur) {			//Установка процента по текстовому уровню
      var sp=0
      if (ur=="Очень низкий") sp=15
      if (ur=="Низкий") sp=30
      if (ur=="Нормальный") sp=45
      if (ur=="Высокий") sp=60
      if (ur=="Очень высокий") sp=80
      if (ur=="Элитный"||ur=="Эксклюзив") sp=100 
      return sp
      }
    function name_trim(nur) {			//Установка сокращения
      var sn=0
      if (nur=="Очень низкий") sn="Оч.Низ"
      if (nur=="Низкий") sn="Низкий"
      if (nur=="Нормальный") sn="Нормал"
      if (nur=="Высокий") sn="Высок."
      if (nur=="Очень высокий") sn="Оч.Выс"
      if (nur=="Элитный") sn="Элитн."
      if (nur=="Эксклюзив") sn="Экслюз"
      return sn
      }

}


// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);