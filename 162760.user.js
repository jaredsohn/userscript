// ==UserScript==
// @name           Virtonomica: Обзор технологий
// @namespace      virtonomica
// @description    Фильтрация по технам, преобразование таблицы в читабельном виде.
// @include	   http://*virtonomic*.*/*/main/globalreport/technology_market/total
// @version        1.6
// ==/UserScript==





var run = function() 
{


    	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    	$ = win.$;

//       установка кнопки "отобразить все"
	var text0='<input type="button" id="inpbat" value="отобразить все"/>'
	var elth=$( 'div.#mainContent table.list tbody th:eq(1)')
	$(text0).insertBefore($(elth));
	$(elth).css('display','none')
	
	

//       установка кнопок "выбрать", подсветка техн, преобразование чисел
	var nteh
	var x=0
	$( 'div.#mainContent table.list tr=[class]').each( function()
	  {
	    x=x+1
	    var text1='<input type="button" id="hider'+x+'"  value="  выбрать   "/>'
	    $(text1).insertBefore($( 'a:eq(1)',this));
   	    
	    var children = this.children
	    nteh=children.length // количество столбцов техн
	    var xvalsum=0

	    for(var i=1; i<nteh; i++) {
	     var xx=children[nteh-i]
	     var xval=$(xx).prop('title').replace(' ', '').replace(' ', '').replace(' ', '') 
	     if(xval=="--") xval="0" // не совсем верно, но...
	     $(xx).css('white-space','pre-wrap') // ужимаем таблицу
	     xval=parseFloat(xval) // цена техны
	     xvalsum=xvalsum+xval  // сумма техн
	     if (xvalsum<1000000000) $(xx).css('background','#FFF68F') // подсветка техн сумма котрых не превышает ярда
	     var tval=$(xx).prop('textContent') 
	     tval=reduce_txt(tval)
	     $(xx).prop('textContent',tval) 


	      }
	  });

// получение информации о своих изученных технах	
	var stab = []
	var tmurl=$( 'ul.#menutop a:contains("Предприятия")').attr('href').slice(0,-10)
	var numpos=tmurl.indexOf("company")
	var tmurl0=tmurl.substring(numpos+12) // 
	tmurl=tmurl.substring(0,numpos) // 
	tmurl=tmurl+"management_action"+tmurl0+"/investigations/technologies";

	$.get(tmurl,function(data){
	  
	  var tehlen=($( 'div.tech_title_cell',data)).length //количество изучаемых/купленых техн
	  
 	  for (t=0; t<tehlen; t++)
 	  {
 	    var ttt="div.tech_row:eq("+(t*2+1)+")" // только чётные (каждый 2-й)
 	    var tname=$(ttt,data).children()
	    var tnt=tname[0].children
	    var tarr=[]
	    tarr[0]=tnt[2].textContent	// наименование техны
	    
	    for (u=1;u<tname.length;u++)
	    {
	      tarr[u]=parseInt(tname[u].textContent)  // номер техны
	      var tnt4=tname[u].firstElementChild.className // класс - tech_b - куплена, остальные варианты - техна своя
	      if (tnt4=="tech_b") tarr[u]=0 // техна куплена и не изучена
	    }
	    stab[t]=tarr.join(';'); //сжимаем
	    
	  }
	  set_color_teh () // выводим свои техны в подсветку
	})

  function set_color_teh(){
	  stab.sort()  // установка списка своих техн в алфавитном порядке
   
	  var y=0
	  $( 'div.#mainContent table.list tr=[class]').each( function()
	  {
	    var children = this.children
	    var nteh=children.length // количество столбцов техн
	    var nameteh=children[0].textContent // название техны
	    var trow1 = stab[y]
	    var trow = trow1.split(';') // разжимаем 
	    var mynameteh=trow[0]

	    if (mynameteh==nameteh) // названия техн совпали
	    {
	     
	     for(var i=1; i<nteh; i++) {
	     var xx=children[nteh-i]
	     if ((i+1)==trow[trow.length-1])   
	      {
		var bc1=$(xx).css('background-color')+"" // 
		var bc2="rgb(255, 246, 143)" //255 246 143
		$(xx).css('background','#00F5FF') // установка подсветки изученных техн
		
		if (bc1==bc2) $(xx).css('background','#9AFF9A') // подсветка техны и изученной и игровой
		trow.pop()
	      }
	     if(trow.length==1) break // выход из цикла если все изученные отобразили
	      }

	    }
	    else {y=y-1} //
	    y=y+1

	      
	  });
	  }
	
	
  function reduce_txt(tv) {		// преобразование чисел в сокращенную форму с ккк
	  if(tv=="--") tv="0"
	  tv=tv.replace(' ', '').replace(' ', '').replace(' ', '')
	  tv=tv+" k"
	  var vl=tv.length
	  if(tv=="0 k") tv="--"
	  if (vl<6) return tv
	  tv=((parseInt(tv))/1000).toFixed(0)
	  tv=tv+" kk"
	  if (vl<9) return tv
	  tv=((parseInt(tv))/1000).toFixed(0)
	  tv=tv+" kkk"
	  return tv
	}

	$("input[id^='hider']").click( function() { // обработчик кнопки выбрать
	var inp = $(this);
	var elnam=(inp.attr('id')).slice(5)
	var x=0
   	$('div.#mainContent table.list tr=[class]').each( function()
	  {
	  x=x+1
	  if (elnam!=x) $(this).css('display','none');
	 });
	  
	});

	$("input[id='inpbat']").click( function() {  // обработчик кнопки отобразить все
	$('div.#mainContent table.list tr=[class]').each( function()
	  {
	  $(this).css('display','table-row');
	});
	 });
	  	
}


var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
