// ==UserScript==
// @name           li_post_del_hack
// @version        0.1
// @namespace      li_post_del_hack
// @description    li_post_del_hack
// @include        *
// @author         Nexis
// ==/UserScript==

/**
*	Да в коментариях маты. А нехуй читать корявый джавасрипт-код)
*/


var post_ID_s_container = document.getElementById('liru_sccount-list'); //ДИВ-контейнер для ДИВов-постов
if( !post_ID_s_container ) return;   //если нету - уебываем.

var post_ID_divs = new Array();    //массив блоков постов
var post_ID_list = new Array();    //массив идентификаторов постов
var post_ID_num = new Array();     //массив идентификаторов постов в цифровом виде
var delimg=document.createElement("img");
    delimg.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRF61RU/6ur+4qK5zs7/vz81JKS/8/P3BMT5QEB04OD83FxyouL05mZ4ioqz6Cg////7GWdjAAAABB0Uk5T////////////////////AOAjXRkAAACFSURBVHjaXI8LDgQhCEORii4iev/bLn4mmQxRY1/SVml+hmKPce5DDjAiW7pT0xxgUCkIIiiZ5YLkZkilbBCWVFKtcTQ9oQZOHIv0tkzzxszQp3b2WgF3e0D3X0x1XMvVAWiHDiyptkDrAQRLz6kOtPWOrO47X8OSd6jI+VwPfWrf8xdgAI8oCorey/U1AAAAAElFTkSuQmCC";

//Находим родительский бокс, в который будем заталкивать ссылки
if( post_ID_s_container ){
	post_ID_divs = post_ID_s_container.getElementsByClassName('CONBL');
  	for(var i=0;i<post_ID_divs.length;i++) { 
       post_ID_list[i] = post_ID_divs[i].id;          //выдираем id дива
       post_ID_num[i] = post_ID_list[i].match(/\d+/); //ищем циферки
    };
                          
  	for( var i=0;i<post_ID_num.length;i++ ) {
      var span = document.createElement("span");
      var span_place = document.getElementsByClassName('GL_TXTSM GL_MAR5B')[i].lastChild.previousSibling.previousSibling; //найдем предпоследний элемент
      //var span_inner = " ID Поста: " + post_ID_num[i]; 
      
      var span_inner = "\n" + "<form method=post name=vbform1 action=http://www.liveinternet.ru/journal_delpost.php enctype=multipart/form-data>" + 
                       "\n" + "<input type=hidden value=delpost name=action>" +
                       "\n" + "<input type=hidden value=editpost name=draft>" +
                       "\n" + "<input type=hidden value=" + post_ID_num[i] + " name=jpostid>" +
                       "\n" + "<input type=hidden value=" + unsafeWindow.curj + " name=journalid>" +
                       "\n" + "<input type=checkbox value=yes name=deletepost style='margin:0px;'>" + 
                       "\n" + "УДАЛИТЬ" + 
                       //"\n" + "<input type=submit value=ok>" + 
                       "\n" + "<input type=image src=" + delimg.src + " style='margin:0px;' title='удалить пост'>" + 
                       "\n" + "</form>"; 
      
      span.innerHTML = span_inner; 
      span.style.margin = '0px';  
      span.style.verticalAlign = 'middle';
			span_place.parentNode.insertBefore(span, span_place.previousSibling);
        //alert(document.getElementsByClassName('GL_TXTSM GL_MAR5B')[i].lastChild.nodeName);
        //document.getElementsByClassName('GL_TXTSM GL_MAR5B')[i].lastChild.nextSibling.innerHTML = document.getElementsByClassName('GL_TXTSM GL_MAR5B')[i].lastChild.nextSibling.innerHTML + post_del_HTML + "<br>";
    };   
};





//окончание работы
//Прибъем все объявления для экономии памяти
post_ID_s_container = null;
post_ID_divs = null;
post_ID_list = null;
post_ID_num = null;
span = null;
span_place = null;
span_inner = null;
delimg = null;

      /*

     */


//рутинная шняжка
