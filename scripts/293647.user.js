// ==UserScript==
// @name        HWM - Resourses as images Style Mod
// @namespace   Resourses as images
// @author      code: Dinozon2; style: sw.East
// @version     0.2
// @description Заменяет текстовое описание ресурсов на изображения
// @include     http://www.heroeswm.ru/pl_info.php?*
// ==/UserScript==

// css style
GM_addStyle('\
#box{\
   width: 93%;\
   height: 100%;\
   margin: 0 5px 0 -5px;\
}\
#amount_slot{\
   overflow: hidden;\
   float: right;\
   width: 48px;\
   height: 48px;\
   margin: 5px 5px 5px 0;\
   padding: 0;\
   border: 3px solid #fff;\
   box-shadow: 0px 0px 5px #aaa;\
   z-index: 1;\
}\
#amount_slot img {\
   display: block;\
   width: 42px;\
   height: 42px;\
   margin: 3px 0 0 3px;\
   padding: 0;\
}\
#amount_slot a img {\
   -webkit-transition: all 0.2s linear;\
      -moz-transition: all 0.2s linear;\
       -ms-transition: all 0.2s linear;\
        -o-transition: all 0.2s linear;\
           transition: all 0.2s linear;\
}\
#amount_slot:hover a img {\
   -webkit-transform: scale(1.20,1.20);\
      -moz-transform: scale(1.20,1.20);\
       -ms-transform: scale(1.20,1.205);\
        -o-transform: scale(1.20,1.20);\
           transform: scale(1.20,1.20);\
   opacity:1;\
}\
#amount_slot a{\
   text-decoration: none;\
}\
.amount_wrap {\
   position: absolute;\
   min-width:14px; \
   height: 13px;\
   margin: -48px 0 0 -3px;\
   padding:0 1px 1px;\
   color:#fff;\
   border:2px solid #fff;\
   background:#222;\
   -webkit-box-shadow: 1px 1px 1px #aaa;\
      -moz-box-shadow: 1px 1px 1px #aaa;\
           box-shadow: 1px 1px 1px #aaa;\
   z-index: 15;\
   font-size: 10px;\
   text-align: center;\
   text-decoration: none !important;\
   text-shadow: 1px 1px 1px rgba(0,0,0, 0.8);\
   cursor: pointer;\
   opacity:.7;\
   -webkit-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;\
      -moz-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;\
       -ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;\
        -o-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;\
           transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;\
}\
');
// the end

var HTMLOut='<div id="box">';

var ElementsArray = [];
ElementsArray['Кожа']=              'http://radikall.com/images/2014/01/29/xQAF.png';
ElementsArray['Сталь']=             'http://radikall.com/images/2014/01/29/SVRCM.png';
ElementsArray['Никель']=            'http://radikall.com/images/2014/01/29/xCm1P.png';
ElementsArray['Волшебный порошок']= 'http://radikall.com/images/2014/01/29/0fU3O.png';
ElementsArray['Мифриловая руда']=   'http://radikall.com/images/2014/01/29/CFXKO.png';
ElementsArray['Обсидиан']=          'http://radikall.com/images/2014/01/29/likBh.png';
ElementsArray['Мифрил']=            'http://radikall.com/images/2014/01/29/av3Hr.png';
ElementsArray['Орихалк']=           'http://radikall.com/images/2014/01/29/t3esN.png';
ElementsArray['осколок метеорита']= 'meteorit';
ElementsArray['абразив']=           'abrasive';
ElementsArray['змеиный яд']=        'snake_poison';
ElementsArray['клык тигра']=        'tiger_tusk';
ElementsArray['ледяной кристалл']=  'ice_crystal';
ElementsArray['лунный камень']=     'moon_stone';
ElementsArray['огненный кристалл']= 'fire_crystal';
ElementsArray['цветок ведьм']=      'witch_flower';
ElementsArray['цветок ветров']=     'wind_flower';
ElementsArray['цветок папоротника']='fern_flower';
ElementsArray['ядовитый гриб']=     'badgrib';

var a = document.body.getElementsByClassName("wb");

for (var i = 0, length = a.length; i < length; i++) {
	if (i in a) {
	    // Находим блок с элементами
		if (a[i].innerHTML.indexOf('&nbsp;&nbsp;&nbsp;&nbsp;<b>') + 1){
			// создаем массив из строк:
			var text=a[i].innerHTML;
		    var arr = text.split('<br>');  
			// очищаем строку от мусора
			for (var k=0,len=arr.length;k<len;k++) {
		 if (k==Math.round((len-1)/2)) {HTMLOut = HTMLOut+'<div id="top">';}
				var line=arr[k];       
                
				line=line.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
				line=line.replace('<b>', '');
				line=line.replace('</b>', '');
				var res = line.split(':');

				//    res[0] - название элемента
				//    res[1] - количество

				if (res[1]>0) {

				        //   фикс ширины
                                        if      (res[1]>9999) var w_length = 39;
                                        else if (res[1]>999)  var w_length = 31;
                                        else if (res[1]>99)   var w_length = 24;
                                        else                  var w_length = 13;

					if(ElementsArray[res[0]].length>19){
						HTMLOut = HTMLOut + '<div id="amount_slot">'+
                                               '<a href="#"> '+
                                                  '<img src="'+ElementsArray[res[0]]+'" alt="'+line+'" title="'+line+'">'+
                                               '</a>'+
                                               '<div class="amount_wrap" style="width:'+w_length+'px">'+res[1]+'</div>'+
                                            '</div>';
					} else {
						HTMLOut = HTMLOut + '<div id="amount_slot">'+
                                               '<a href="/auction.php?cat=elements&sort=0&art_type='+ElementsArray[res[0]]+'"> '+
                                                  '<img src="/i/'+ElementsArray[res[0]]+'.gif" alt="'+line+'" title="'+line+'"> '+
                                               '</a>'+
                                               '<div class="amount_wrap" style="width:'+w_length+'px">'+res[1]+'</div>'+
                                            '</div>';
					}
				}
  			}

			HTMLOut = HTMLOut+'</div>';
			// Выводим на страницу
			a[i].innerHTML = HTMLOut;
		}
	}
}