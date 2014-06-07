// ==UserScript==
// @name           RatingColorizer
// @namespace      empr
// @description    Меняет цвет фона рейтинга в зависимости от самого рейтинга.
// @include        http://dirty.ru/comments/*
// @include        http://www.dirty.ru/comments/*
// @include        http://dirty.ru/
// @include        http://www.dirty.ru/
// ==/UserScript==



contrast_var                          = 235;               // Контраст
negative_amendment        = 20;//!!!!!!! UNUSED!!! Смещение в более контрастный цвет негативных оценок относительно положительных
bottom_limit  	    = -200;            // Рейтинг, до которого идёт градация цвета негативных оценок
top_limit                                = 200;             // Рейтинг, до которого идёт градация цвета позитивных оценок
change_text_color               = false;           // Менять ли цвет текста, если цвет фона слишком тёмен? (да - true, нет - false)


if (window.location=='http://dirty.ru/' || window.location=='http://www.dirty.ru/')
{
/////////////////////////////////////////////////////////////////////// Настройки для постов на главной странице
contrast_var                          = 235;               // Контраст
negative_amendment         = 20;//!!!!!!! UNUSED!!! Смещение в более контрастный цвет негативных оценок относительно положительных
bottom_limit  	    = -200;            // Рейтинг, до которого идёт градация цвета негативных оценок
top_limit                                = 600;             // Рейтинг, до которого идёт градация цвета позитивных оценок
change_text_color               = false;           // Менять ли цвет текста, если цвет фона слишком тёмен? (да - true, нет - false)
}


function calculateM(r,d) // Расчёт градации
{
if (d===false) {coefficient = Math.abs(bottom_limit); } // Если комментарий плохой, то расчитываем по лимиту рейтинга плохих оценок
             else  {coefficient = top_limit;}                          // Если комментарий хороший, то, соответственно, по другому лимиту

// Эта функция возвращает значение от 0 до 255
resultCode = contrast_var*(r/(coefficient/100)/100);
if(resultCode>120) {resultCode=120;gColor="#FFFFFF";}else{gColor='';}
return(resultCode);
}

function toHex(r) // Перевод в HEX для отображения цвета в веб-формате
{

r=Math.round(Math.min(Math.max(0,r),255));
return("0123456789ABCDEF".charAt((r-r%16)/16)+"0123456789ABCDEF".charAt(r%16));
}

function es_initialization()
{
var gElBc = getElementsByClass('vote_result'); // Получим все интересующие нас ячейки
for (var key in gElBc)
 {
   var val = gElBc[key];
   var rating = val.innerHTML; // Узнаём сам рейтинг

     ////////////////////////////////////////////////////////////
     ////////////////////////////////////////////////////////////

    if (rating>bottom_limit && rating<0)  // Если это НЕГАТИВНЫЙ комментарий в пределах градации

    { var mn = calculateM(Math.abs(rating),false); // Считаем градацию...
      rColor='#FF'+toHex(contrast_var-mn)+toHex(contrast_var-mn); } // Формируем цвет

     ////////////////////////////////////////////////////////////

    if (rating<top_limit && rating>0) // Если это ПОЗИТИВНЫЙ комментарий в пределах градации
    { var mn = calculateM(rating,true); // Считаем градацию...
      rColor='#'+toHex(contrast_var-mn)+'FF'+toHex(contrast_var-mn); } // Формируем цвет

     ////////////////////////////////////////////////////////////

    if (rating==0) // Если рейтинг равен НУЛЮ
    { rColor="#FDFDFF"; } // Стандартный цвет

     ////////////////////////////////////////////////////////////

    if (rating<bottom_limit) // Если это НЕГАТИВНЫЙ комментарий за пределами градации
    { rating=bottom_limit; // Будем считать, что его рейтинг равен пределу градации
                                       // Здесь можно применить и специальные цвета, впрочем
      var mn = calculateM(Math.abs(rating),false); // Считаем градацию...
      rColor='#FF'+toHex(contrast_var-mn)+toHex(contrast_var-mn); } // Формируем цвет

    if (rating>top_limit) // Если это ОХУЕННЫЙ комментарий за пределами градации
    { rating=top_limit; // Будем считать, что его рейтинг равен пределу градации
                                       // Здесь тоже можно применить специальные цвета
      var mn = calculateM(rating,true); // Считаем градацию...
      rColor='#'+toHex(contrast_var-mn)+'FF'+toHex(contrast_var-mn); } // Формируем цвет

     ////////////////////////////////////////////////////////////
     ////////////////////////////////////////////////////////////

         val.style.backgroundColor=rColor; // Устанавливаем цвет
         if (gColor && change_text_color===true) { val.style.color=gColor; }

 }
}

function getElementsByClass(searchClass,node,tag) { // Ну просто очень полезная функция для поиска по классам
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

// Функции всё

window.onload = setTimeout(es_initialization,20);  // Поехали!
