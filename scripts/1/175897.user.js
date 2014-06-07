// ==UserScript==
// @name        HWM - Dinozon2 Mod
// @namespace   Resourses as links
// @description Заменяет текстовое описание ресурсов на изображения, проставляет ссылки в шапке ресурсов. Добавляютстя таймеры при странице Бои за территории. Ссылка Битвы ведет на страницу Бои за территории.
// @include     http://www.heroeswm.ru/*
// @version     1.2
// ==/UserScript==

//ver 1.4
// в плане: при продаже лота отображать картинку и цену (монеты)

//ver 1.3
// в плане: свободно рабочих мест

//ver 1.2
// [+] добавлен таймер до начала битвы с сурвилургами
// [+] в меню замены ссылки Битвы на Бои за территории
// [*] переписан код, добавлена совместимость с таймерами охот/гв/гн

//ver 1.1
// [+] в шапке проставлены ссылки на закупку ресурсов на рынке

//ver 1.0
// [+] на странице персонажа ресурсы заменяются на изображения

var HTMLOut='<table align=center width=100%><tr><td>';

var ElementsArray = [];
ElementsArray['Кожа']='http://s018.radikal.ru/i503/1303/15/b9d4bfe143ecx.jpg';
ElementsArray['Сталь']='http://s017.radikal.ru/i432/1303/e1/aaa5513317b3.jpg';
ElementsArray['Никель']='http://s020.radikal.ru/i721/1303/64/c909f5abf608.jpg';
ElementsArray['Волшебный порошок']='http://i049.radikal.ru/1303/ea/d490c66ef334.jpg';
ElementsArray['Мифриловая руда']='http://s017.radikal.ru/i425/1303/da/c4ebcbcea427.jpg';
ElementsArray['Обсидиан']='http://s59.radikal.ru/i166/1303/57/fc0515e741e7.jpg';
ElementsArray['осколок метеорита']='meteorit';
ElementsArray['абразив']='abrasive';
ElementsArray['змеиный яд']='snake_poison';
ElementsArray['клык тигра']='tiger_tusk';
ElementsArray['ледяной кристалл']='ice_crystal';
ElementsArray['лунный камень']='moon_stone';
ElementsArray['огненный кристалл']='fire_crystal';
ElementsArray['цветок ведьм']='witch_flower';
ElementsArray['цветок ветров']='wind_flower';
ElementsArray['цветок папоротника']='fern_flower';
ElementsArray['ядовитый гриб']='badgrib';

var a = document.body.getElementsByClassName("wb");

for (var i = 0, length = a.length; i < length; i++) {
    if (i in a) {
        if (a[i].innerHTML.indexOf('&nbsp;&nbsp;&nbsp;&nbsp;<b>') + 1){ // Находим блок с элементами
            
            // создаем массив из строк:
            var text=a[i].innerHTML;
            
            var arr = text.split('<br>');
            
            // очищаем строку от мусора
            for (var k=0,len=arr.length;k<len;k++) {
                
                if (k==Math.round((len-1)/2)) {HTMLOut = HTMLOut+'<td valign=top>';}
                
                var line=arr[k];
                line=line.replace('&nbsp;&nbsp;&nbsp;&nbsp;', '');
                line=line.replace('<b>', '');
                line=line.replace('</b>', '');
                
                var res = line.split(':');
                //    res[0] - название элемента
                //    res[1] - количество
                
                if (res[1]>0) {
                    if(ElementsArray[res[0]].length>15){
                        HTMLOut = HTMLOut + '<img align=middle width=50 height=50 src='+ElementsArray[res[0]]+' alt="'+line+'" title="'+line+'"><b>'+res[1]+'&nbsp;шт.</b><br>';
                    } else {
                        HTMLOut = HTMLOut + '<a href=/auction.php?cat=elements&sort=0&art_type='+ElementsArray[res[0]]+'><img align=middle width=50 height=50 src=/i/'+ElementsArray[res[0]]+'.gif alt="'+line+'" title="'+line+'"></a><b>'+res[1]+'&nbsp;шт.</b><br>';
                    }
                }
                
            }
            
            HTMLOut = HTMLOut+'</td></tr></table>';
            
            //HTMLOut = HTMLOut+'<h4><center><a href=http://www.witchhammer.ru/viewpage.php?hero=*********&page_id=15 target=_top>Посчитать стоимость</a></center></h4>';
            
            // Выводим на страницу
            a[i].innerHTML = HTMLOut;
        }
    }
}

var a = document.body.getElementsByTagName("img");

for (var i = 0, length = a.length; i < length; i++) {
    //if (i in a) {
    if (a[i].title=="Древесина"){
        a[i].outerHTML = '<a href=/auction.php?cat=res&sort=0&type=1>'+a[i].outerHTML+'</a>';
    } else if (a[i].title=="Руда"){
        a[i].outerHTML = '<a href=/auction.php?cat=res&sort=0&type=2>'+a[i].outerHTML+'</a>';	  
    } else if (a[i].title=="Ртуть"){
        a[i].outerHTML = '<a href=/auction.php?cat=res&sort=0&type=3>'+a[i].outerHTML+'</a>';	  
    } else if (a[i].title=="Сера"){
        a[i].outerHTML = '<a href=/auction.php?cat=res&sort=0&type=4>'+a[i].outerHTML+'</a>';	  
    } else if (a[i].title=="Кристаллы"){
        a[i].outerHTML = '<a href=/auction.php?cat=res&sort=0&type=5>'+a[i].outerHTML+'</a>';	  
    } else if (a[i].title=="Самоцветы"){
        a[i].outerHTML = '<a href=/auction.php?cat=res&sort=0&type=6>'+a[i].outerHTML+'</a>';  
    } else if (a[i].title=="Золото"){
        a[i].outerHTML = a[i].outerHTML;	   
    }
        
        }



// замена ссылок на Битвы
var a = document.body.getElementsByTagName("a");
for (var i = 0, length = a.length; i < length; i++) {
    
    if (a[i].getAttribute('href')=='bselect.php') {
        a[i].setAttribute('href','mapwars.php');      
    }
    
    // ver 1.3 - количество свободных мест на предприятиях
    //if (a[i].getAttribute('href').indexOf('object')+1){    
    //	alert(a[i].getAttribute('href'));
    //};
}


var zayvok=0;
var freecell=0;
var allcell=0;
var timetogo = 0;
var cnt=0;
var alreadyin = 0;
var freecellavaibale = 0;
var bb = document.getElementsByTagName("title");


// таймер до начала боя с Сурвилургами только на странице боев

//if (window.location.pathname == '/map.php'){ }
if (window.location.pathname == '/mapwars.php'){  
    
    // узнаем количество свободных мест
    var f = document.body.getElementsByTagName("font");
    for (var x = 0, length = f.length; x < length; x++) {
        
        // всего вступило участников
        if (f[x].getAttribute('style')=='font-size:9px;'){
            if(0==f[x].innerHTML.indexOf('[')){	
                cnt=cnt+1;
            }                        
        }
        
        // всего защит
        if (f[x].innerHTML.indexOf('Сурвилурги')+1) {
            zayvok=zayvok+1;
        }
        
        if (f[x].innerHTML=='Вы уже в заявке, ожидайте начала битвы!') {
            alreadyin = 1;
        }
        
    }      
    
   
    // свободных мест
    freecell = (Math.ceil(cnt/21)*21)-cnt;
    
    // всего мест
    allcell = Math.ceil(cnt/21)*21;
  
    var c = document.body.getElementsByTagName("td");
    for (var i = 0, length = c.length; i < length; i++) {
        
        if (c[i].innerHTML.length==37&&c[i].getAttribute('class')=='wb') {            
            
            // если больше нет свободных мест и игрок не успле зайти смотрим следующую ближайшую заявку
            if (alreadyin==0&&freecell==0) {continue;}
            
            //красное время
            redtime = c[i].innerHTML[21] + c[i].innerHTML[22] + c[i].innerHTML[23] + c[i].innerHTML[24] + c[i].innerHTML[25];        
            
            // еще не в заявке -> считаем свободные слоты
            var b = document.body.getElementsByTagName("b");
            for (var bi = 0, length = b.length; bi < length; bi++) {

                if(b[bi].innerHTML=='[Вступить]'){// есть свободные места
                    
                    // замена заголовка/////////////////////////// freecell  allcell
                    // узнаем сколько осталось до начала
                    var h = new Date();
                    startmin = c[i].innerHTML[24] + c[i].innerHTML[25];
                    startmin = parseInt(startmin);
                    curmin = h.getMinutes();
                    
                    timetogo = startmin - curmin;
                    if (timetogo<0){
                        timetogo = timetogo + 60;
                    }                     
                    
                    bb[0].innerHTML = freecell + ' ('+ timetogo +' мин) свободно';  
                    var freecellavaibale =1;
                    //Math.round(freecell/allcell*100)
                    
                    break;
                    
                    
                }             
                
            }
            
            
            //if (freecellavaibale) { // уже в заявке - > начало через x минут.

                
                if (alreadyin){
                    
                    // узнаем сколько осталось до начала
                    var h = new Date();
                    startmin = c[i].innerHTML[24] + c[i].innerHTML[25];
                    startmin = parseInt(startmin);
                    curmin = h.getMinutes();
                    
                    timetogo = startmin - curmin;
                    if (timetogo<0){
                        timetogo = timetogo + 60;
                    } 
                    // замена заголовка///////////////////////////                   
                    bb[0].innerHTML = timetogo + ' мин до вступления на защиту';
                }
               // break;
            //}   
            
            // "обычное" время
        } else if (c[i].innerHTML.length==5&&c[i].getAttribute('class')=='wb') {
            // обычное время - ищем первое и стоп   
            
            
            // узнаем сколько осталось до начала
            if (c[i].innerHTML.indexOf(':')+1) {
                var txt=c[i].innerHTML;                   
                txt.toString();
                txt.split(':');
                var h = new Date();
                var curmin = h.getMinutes();
                var dtime1 = parseInt(txt[3]+txt[4])-15;
                if (dtime1>curmin) {
                    dif = dtime1 - curmin;
                } else {
                    dif = 60 + dtime1 - curmin;
                }
                
                // dif - осталось минут до боя  
                
                // замена заголовка///////////////////////////
                bb[0].innerHTML = dif + ' мин до вступления на защиту';
            }
            
            break;
        }
   }  
}    
