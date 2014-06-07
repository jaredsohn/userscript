// ==UserScript==
// @name           redownloader
// @namespace      blog.laptev.info
// @description    download againe torrent if it updated
// @include        http://torrents.ru/*
// @include        http://*.torrents.ru/*   
// @include        http://rutracker.org/*
// @include        http://*.rutracker.org/*
// @version        1.1.0
// ==/UserScript==


// 1.0.1 - fixed bug
// 1.0.2 - rutracker.org correction
// 1.1.0 - rutracker.org downloading correction


var menuconst = '<a href="javascript:lcd()"><b id = "capt2">Удалить</b></a>·<a href="javascript:lcch()"><b id = "capt3">Проверить</b></a> ';
//var track = 'torrents.ru';
var track = 'torrents.ru';
if ( window.location.href.indexOf('rutracker.org', 1)>0 ) {track = 'rutracker.org';}
//Переменные
var pathes = [];
var names = [];
var dates = [];
var newdates = [];
var checkdates = [];
var showed = '0';
var capt1 = 'Открыть';
var capt2 = menuconst;
var cook, cook2, cook3;

GM_registerMenuCommand( "Remember torrent", TRem );
GM_registerMenuCommand( "Show/hide memory", TShow );
GM_registerMenuCommand( "Check all selected", Tcha );

try
  {
cook = GM_getValue("PATHES");
pathes = cook.split("*/*");
cook2 = GM_getValue("NAMES");
names = cook2.split("*/*");
cook3 = GM_getValue("DATES");
dates = cook3.split("*/*");
cook4 = GM_getValue("NEWDATES");
newdates = cook4.split("*/*");
cook5 = GM_getValue("CHECKDATES");
checkdates = cook5.split("*/*");
var tmp = cook;
var tmp1 = cook2;
var tmp2 = cook3;
var tmp3 = cook4;
var tmp4 = cook5;
}
  catch(ex)
  { 
   // alert(ex);
GM_setValue("PATHES", "");
GM_setValue("NAMES", "");
GM_setValue("DATES", "");
GM_setValue("NEWDATES", "");
GM_setValue("CHECKDATES", "");
tmp = "";
tmp1 = "";
tmp2 = "";
tmp3 = "";
tmp4 = "";
  }

function UPDATE_() {
			GM_setValue("PATHES",tmp);
			GM_setValue("NAMES",tmp1);
		        GM_setValue("DATES",tmp2);
			GM_setValue("NEWDATES", tmp3);
			GM_setValue("CHECKDATES", tmp4);
//alert(tmp4);
}

//менюшка
var  zmenu = document.getElementById('main-nav').childNodes[1].childNodes[1].childNodes[0];
znewm = '<td class="nowrap"><a href="javascript:lcl()"><b id = "capt1">'+capt1+'</b></a>·<a href="javascript:lca()"><b id = "capt4">Добавить</b></a></td><td id = "newmenu" class="nowrap"></td>';
zmenu.innerHTML = znewm +  zmenu.innerHTML;
unsafeWindow.lcl = function() 
			{ 
                          TShow();
                        }
unsafeWindow.lca = function() 
			{ 
                          TRem();                                                    
                        }
unsafeWindow.lcd = function() 
			{ 
                          TDel();                                                    
                        } 
unsafeWindow.lcch = function() 
			{ 
                          Tcha();                                                    
                        }
                       
function updatemenu()
{
//Обновляем менюшку при открытии-закрытии панели
 unsafeWindow.document.getElementById('capt1').innerText = capt1;
 unsafeWindow.document.getElementById('newmenu').innerHTML = capt2;
 ztable = createtable();
 init.innerHTML = ztable;    
}

//Проверяем выделенные торренты
function Tcha() 
{ 
var zchk = document.getElementsByClassName("zchk-1");
var aaa, bb;
for(var i=0; i<zchk.length; i++)
	{
		 if (zchk[i].checked) 
		 {
			for (ii in pathes)
					{
					if (pathes[ii] == zchk[i].id.substr(3,zchk[i].id.length-3)) 
						{
						 //alert('Проверяем торрент '+zchk[i].id.substr(3,zchk[i].id.length-3)); 
						//***************
						aaa = zchk[i].id.substr(3,zchk[i].id.length-3); 
                                                	
						bb = ''; 
						
						for (ii in pathes)
						{
						 if ( pathes[ii] == aaa )  {bb = dates[ii]; iii = ii;}
						}
			                        asd=unsafeWindow.document.getElementById('ztl'+aaa);
		                                newinf = TCheck(u(aaa));
		                                checkdates[iii] = torrdtostr2(Date().substr(3,Date().length-15));
						tmp4 =checkdates.join('*/*');
						
		
						if ( torrdtostr(newinf[1]) != bb )
							{
								asd.innerHTML='<b>Обновлен</b> '+convtorealdate(torrdtostr(newinf[1]));
								asd.innerHTML = asd.innerHTML + '</td><td><a href="javascript:dnl('  + aaa +  ')" >'+imgsave()+'</a>';                                               newdates[iii]=torrdtostr(newinf[1]);
								//asd.innerHTML =asd.innerHTML +imgsave();
								tmp4 =checkdates.join('*/*');  
							}
							else
							{
							   asd.innerHTML=convtorealdate(torrdtostr2(Date().substr(3,Date().length-15)))+' не изменился';
							}
						window.setTimeout(UPDATE_, 0 );
		                                aimg=unsafeWindow.document.getElementById('zimg'+aaa);
                                  
						//***********************	
						}
	
					}
		 }
	}
///TShow();
//TShow();  
}     


//Удаление выделенных торрентов из списка
function TDel()
{
var zdel = document.getElementsByClassName("zchk-1");
for(var i=0; i<zdel.length; i++)
	{
		 if (zdel[i].checked) 
		 {
			for (ii in pathes)
					{
					if (pathes[ii] == zdel[i].id.substr(3,zdel[i].id.length-3)) 
						{
						pathes.splice( ii,1);
						names.splice( ii,1);
						dates.splice( ii,1);
                                                newdates.splice( ii,1);
                                                checkdates.splice( ii,1);
						if (pathes != null)
							{
	                                         	tmp = pathes.join('*/*');
							tmp1 =names.join('*/*');
							tmp2 =dates.join('*/*');
	                                                tmp3 =newdates.join('*/*');
                                                        tmp4 =checkdates.join('*/*');
							}
	                                         
						}
					
	
					}
		 }
	}
window.setTimeout(UPDATE_, 0 );
TShow();
TShow();
}



function TRem()
{
tmp = "";
tmp1 = "";
tmp2 = "";
tmp3 = "";
tmp4 = "";
//Запоминаем торрент

var title = document.title;
title = title.replace(/ :: torrents.ru/, "");
title = title.replace(/ :: RuTracker.org/, "");
title = title.replace(/(ex torrents.ru)/, "");
title = translit ('en', title);

var datea = document.getElementsByClassName("attach bordered med");
var datec = datea[0].childNodes[1].childNodes[2].childNodes[3].innerHTML;
dn = datec.indexOf('[', 1);
if (dn != (-1)) 
 {
	dk = datec.indexOf(']', dn);
	if (dk == (-1)) // Если находимся на 1 странице
	{	    
		dk = datec.length;  
	}
	dt = datec.substr(dn+1,(dk-dn-1));
        //транслитерирую дату, потом сделать нормальное отображение
	dt = translit ('en', dt);
	dt = torrdtostr(dt);
 }

 //alert (title);
var url = window.location.href;
tn = url.indexOf('php?t=', 1);
if (tn != (-1)) 
 {
	tk = url.indexOf('&', tn);
	if (tk == (-1)) // Если находимся на 1 странице
		{	
			tk = url.length;
	   		tt = url.substr(tn+6,(tk-tn-6));
			ta = 1;
			for (i in pathes)
				{
				if (pathes[i] == tt) {ta = 0;}

				}
			if (ta == 1) 
				{
				pathes.push(tt); // добавим в массив торрентов
				names.push(title);
				dates.push(dt);
				newdates.push(dt);
				checkdates.push(torrdtostr2(Date().substr(3,Date().length-15)));
				alert(title+'  добавлено в список');
				TShow();
				TShow();
				} else { alert(title+'  уже есть в списке');};
			//alert (pathes);
			
			if (pathes != null) 
				{
			        // проходимся по массиву, собирая значения в переменную и разделяя их запятой ./ 
				 	if (pathes[i] != "") 
						{
						tmp = pathes.join('*/*');
						tmp1 =names.join('*/*');
						tmp2 =dates.join('*/*');
                                                tmp3 =newdates.join('*/*');
                                                tmp4 =checkdates.join('*/*');
				 		}
					window.setTimeout(UPDATE_, 0 );
					
			  	}

	      
		} else 
		{ 
		alert ("Add torrent from 1-st page");
		}
 }
}


function TCheck(uuri)
{         
	var aaa = [];
	 var vd = document.createElement('div');
//alert (uuri);
	 vd.innerHTML = loader(uuri)  ;
	 var ddatea = vd.getElementsByClassName("attach bordered med");
	 var dlink = vd.getElementsByClassName("dl-stub dl-link");
		dlink = dlink[0].href;
	 var ddatec = ddatea[0].childNodes[1].childNodes[2].childNodes[3].innerHTML;
	 ddn = ddatec.indexOf('[', 1);
	 if (ddn != (-1)) 
		 {
			ddk = ddatec.indexOf(']', ddn);
			if (ddk == (-1)) // Если находимся на 1 странице
			{	    
				ddk = ddatec.length;  
			}
			ddt = ddatec.substr(ddn+1,(ddk-ddn-1));
			//транслитерирую дату, потом сделать нормально
			ddt = translit ('en', ddt);
		}
	 //ddt = win2unicode(ddt);
           //alert(ddt);
aaa[0] = dlink;
aaa[1] = ddt;
//alert (aaa);
return aaa ;
}

function TShow() { 
if (showed == '0') {
  openWin3();
capt1 ='Закрыть';
capt2 = menuconst;
updatemenu();
		} else 
		{		
			if (showed == '1') 
			{
			ddiv=unsafeWindow.document.getElementById('checkingtorrents');
			ddiv.style.display = "none" ;
			showed = '2'; 
			capt1 ='Открыть';
			capt2 = '';
			updatemenu();
			} else
			{ 
			if (showed == '2') 
			{
			ddiv=unsafeWindow.document.getElementById('checkingtorrents');
			ddiv.style.display = "" ;
			 showed = '1';
			capt1 ='Закрыть'; 
			capt2 = menuconst;
			updatemenu();
			} ;
			}
		}
}

function openWin3() 
{
     	 	 
	 var ini = document.body.firstChild; 
     	 init = document.createElement("div");
         
	 init.id='checkingtorrents';
	ztable = createtable();
    	init.innerHTML = ztable; //+'\u000A'+cj(); 
    	document.body.insertBefore(init, ini); 
        showed = '1';
 	
}

function convtorealdate(date)
{
dd =  date.substr(0,2);
mm = date.substr(2,2);
yy = date.substr(4,2);
time =  date.substr(6,2) + ':'+date.substr(8,2);
return dd+'.'+mm+'.20'+yy+' '+time; 
}

function createtable()
{
          zhtml = '<table>';
	  zhtml = zhtml+'<tr><td></td><td></td><td><b>Название и ссылка на страницу торрента</b></td><td><b>Дата в памяти</b></td><td></td><td><b>Дата проверки и статус обновления</b></td><td></td></tr>';
	  for (i in pathes)
		{
		if (pathes[i]!='') {
		zhtml = zhtml+'<tr>';
		a = u(pathes[i]);
	        a1 = "'"+a+"'";
		//alert (a);
	        butt = '<td>&nbsp;' +  '<a href="javascript:ld('  + pathes[i] +  ')" id="'+'ztt'+pathes[i]+'"><b>Проверить торрент</b></a></td><td><span id="'+'ztl'+ pathes[i]+'">'+convtorealdate(checkdates[i])+'</span></td><td><b id="'+'zimg'+pathes[i]+'"></b></td> &nbsp'; 
		chk = '<input class = "zchk-1" checked="checked" id="'+'chk'+pathes[i]+'" name="'+'chkn'+pathes[i]+'" value="1" type="checkbox">';
		zhtml=zhtml+'<td>'+chk+'</td>'+'<td>'+i+'</td>'+'<td width = 50%>'+". <a href="+a+">"+names[i]+"</a></td><td>"+convtorealdate(dates[i])+'</td>'+butt+" <BR>";
	       	unsafeWindow.ld = function(aa) 
			{       
				var bb;
				bb = ''; 
				
				for (ii in pathes)
				{
				 if ( pathes[ii] == aa )  {bb = dates[ii]; iii = ii;}
				}
	                        asd=unsafeWindow.document.getElementById('ztl'+aa);
                                newinf = TCheck(u(aa));
                                checkdates[iii] = torrdtostr2(Date().substr(3,Date().length-15));
				tmp4 =checkdates.join('*/*');
				
				if ( torrdtostr(newinf[1]) != bb )
					{
						asd.innerHTML='<b>Обновлен</b> '+convtorealdate(torrdtostr(newinf[1]));
						asd.innerHTML = asd.innerHTML + '</td><td><a href="javascript:dnl('  + aa +  ')" >'+imgsave()+'</a>';
						//asd.innerHTML =asd.innerHTML +imgsave();
						newdates[iii]=torrdtostr(newinf[1]);  
						tmp4 =checkdates.join('*/*');
					}
					else
					{
					   asd.innerHTML=convtorealdate(torrdtostr2(Date().substr(3,Date().length-15)))+' не изменился';
					}
                                window.setTimeout(UPDATE_, 0 );
                                aimg=unsafeWindow.document.getElementById('zimg'+aa);

			 };
				
			zhtml = zhtml+'</tr>';
	}   }
	zhtml = zhtml+'</table>';
return zhtml;
}

function mouseEvent(parent, type) {
        var evt = parent.ownerDocument.createEvent('MouseEvents');
        evt.initMouseEvent(type, true, true,
parent.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false,
false, 0, null);
        return parent.dispatchEvent(evt);
        }

function click(parent) {
        return mouseEvent(parent, 'click');
        }

function clickLink(target) {
        var notCanceled = click(target);
        if(target.tagName=="A" && notCanceled) window.location.href =
target.href;
        }


 function cclick()
{
	var ifr = document.getElementById('asdrt');
	var link = ifr.firstChild.contentDocument.body.getElementsByClassName("dl-stub dl-link");
	window.setTimeout(clickLink(link[0]), 1000 );
	window.setTimeout(alert('asdrt'), 1000 );
}
function del (id)
{
  var ifr = document.getElementById('asdrt');
ifr.free;
}

unsafeWindow.dnl = function(au) {
				var tmp;
//alert ('asd');
tmp = document.createElement("div");
tmp.id = 'asdrt';

				tmp.innerHTML = '<iframe src="http://'+track+'/forum/viewtopic.php?t='+ au +'" style="position:absolute; left:0px; top:0px; width:0px; height:0px"></iframe>';
				//alert (tmp.innerHTML);
				document.body.insertBefore(tmp, document.body.firstChild);
				var ifr = document.getElementById('asdrt');

                                ifr.firstChild.addEventListener('load', cclick, false);
                              
					 //document.location = 'http://dl.torrents.ru/forum/dl.php?t='+au;
				// document.location = 'http://dl.'+track+'/forum/dl.php?t='+au;
                                 for (ii in pathes)
				{
				 if ( pathes[ii] == au ) 
					 {
				        if (confirm("Обновить дату торрента в памяти?")) {dates[ii]=newdates[ii];tmp2 =dates.join('*/*');window.setTimeout(UPDATE_, 0 );TShow();TShow();}
					
					}
				}


				}

 function u(a)
{
 //return  "http://torrents.ru/forum/viewtopic.php?t="+a;   
   return  "http://"+track+"/forum/viewtopic.php?t="+a;
}



 
function translit(lng, text)
{
var arrru = new Array ("А", "а", "Б", "б", "В", "в", "Г", "г", "Д", "д", "Е", "е", "Ё", "ё", "Ж" ,"ж", "З", "з", "И", "и", "Й", "й", "К", "к", "Л", "л", "М", "м", "Н", "н", "О", "о", "П", "п", "Р", "р", "С", "с", "Т", "т", "У", "у", "Ф", "ф", "Х", "х", "Ц", "ц", "Ч", "ч", "Ш", "ш", "Щ", "щ", "Ъ", "ъ", "Ы", "ы", "Ь", "ь", "Э", "э", "Ю", "ю", "Я", "я");
var arren = new Array ("A", "a", "B", "b", "V", "v", "G", "g", "D", "d", "E", "e", "E", "e", "Zh", "zh", "Z", "z", "I", "i", "Y", "y", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "R", "r", "S", "s", "T", "t", "U", "u", "Ph", "f", "H", "h", "C", "c", "Ch", "ch", "Sh", "sh", "Sh", "sh", "", "", "I", "i", "", "'", "E", "e", "Yu", "yu", "Ya", "ya"); 
out="";
y=0;
for(var i=0; i<text.length; i++){
  for(var ii=0; ii<arrru.length; ii++){
  if (text[i]==arrru[ii]){
	out=out+arren[ii];
	y=1;
	}
}
if (y==0) {out=out+text[i];}
y=0;
}
//for(var i=0; i<arrru.length; i++){
//text.replace(/arrru[i]/g, arren[i]);
// var litnow = new RegExp(arrru[i], "g");
// textout = textout.replace( litnow, arren[i]);
// }
return out;
}


function loader(uurl)
{
var res;
  try
  {
    var request=new XMLHttpRequest();
    request.open("GET", uurl,false);
    request.overrideMimeType('text/plain;charset=windows-1251');
    request.onload = function() 
                            {                               
                               if(request.readyState == 4) 
                               {
                                 if(request.status==200)
                                 {
                                   	//alert(request.responseText);
					res = request.responseText;
                                 }
                                 else
                                 {
                                   alert("Loading Error");
                                 }
                               }
                            }
    
    request.onerror = function() 
                             {
                             alert("Error");
                             } 
    request.send("");
  }
  catch(ex)
  { 
    alert(ex); 
  }
return  res;
}

function imgsave()
{
	var iimg;
	 iimg = '<img src="data:image/gif,GIF89a%16%00%16%00%E6%7F%00qz%C7%E6%E9%FF%F3%F3%F3%EF%F2%F5%99%A1%D8%A5%A9%AD%94%9D%DD%E2%E6%FF%CB%CB%CB%87%93%E8%E1%E1%E1%99%9B%C0%99%A2%E4%F8%FA%FF%5Bd%B4%92%99%D2%91%95%99%C5%C5%C5%FE%FE%FF%D2%D5%F1%CE%D2%F3%E6%E6%E6%87%8C%91%D8%DC%F9nt%B8%E9%E9%E9%BD%C3%F5%F2%F4%FF%8B%94%D9%CA%CF%F6r%7D%D6%F4%F6%FF%C2%C7%ECz%85%D1%DA%DD%F4%C4%CA%FBx~%83v%80%CA%E4%E4%E4%88%91%D4lrx%5Dci%80%86%8B%FA%FC%FF%E0%E4%FA%DB%E0%FA%D5%DA%F9%DA%DA%DA%D1%D5%F8%EC%EE%FEhr%C8%82%8D%D8%F1%F3%FF%B6%BC%EE%8D%92%97%8F%98%DC%E4%E7%F6%EA%ED%FFx%83%CE%F6%F9%FF%BB%C1%E8%F6%F7%FF%81%8A%D2%EE%F1%FF%A9%AE%B2%C6%CB%ED%96%9B%A0%AE%B2%B6Xb%AF%EE%EE%EE%8D%99%F1%82%8D%E0fkq%87%8F%D6%E4%E6%FFty%7F%7D%82%88%84%8E%D2djokt%C9%B6%B9%BD%7D%88%D6Y_d%FB%FE%FF%C3%C3%C3%DF%DF%DF%F9%FC%FF%EB%EE%FF%EF%F2%FF%ED%F0%FF%FB%FB%FB%CA%CD%EA%7D%84%B6V%60%9F%93%9C%E0%D0%D3%D5%93%95%BDx%83%DF%A3%AD%EF%A9%B1%EA%AC%B4%F3%B4%BC%F6%95%A2%F9%CF%D0%D1%9E%A3%A7%60k%BE%E8%EB%FFbm%C7%8D%90%AA%E4%E7%FAnx%CE%E6%E8%F8%9E%A8%EC%EE%F0%FB%9F%A3%C7%B3%B7%DB%9D%A6%E8%E9%EC%FC%E9%EC%FF%EB%ED%FD%90%9C%F6%ED%F0%FD%7F%8A%DA%EF%F2%FDjt%C4Uc%B3%D7%DB%F6%FF%FF%FF!%F9%04%01%00%00%7F%00%2C%00%00%00%00%16%00%16%00%00%07%FF%80%7F_CP%85%86%87%88PCgZ%7FC%23%3C8%03%93%94%95%93%227f%05%02%7F%40%23%1A%7BS%A2%A3%A4%2BV8IxB%19%9D%1A5y%2B%B1V%B3%B4V%0D%3B%2CGF%10%AC%05ecu%0D%B6%0D%C4%C5%B7%1F-a%BB%BDdtm%3D%D0%1F%D2%D3%1F%1B4%17%1EF6%15%7Fhb%5E%2C4%E2X%E4%E5%3F%3FY.%1E%09%16%DChp7-YY1W%F6%F7%F690%EB%ED%7FBt%1C.%D8%B1%A3%26%80%C1%83%07%F7%1D%E9\'%84%01%07%17%06%95%1C%98H%91b%077GTp%83%C0%E0%04%08%180%3A%88%1CI%B2%06F%26%DCl0%F0%D1%C4%87%0E7Od%C8%94%F9%A4%E6%935zHp%B3%60%A0%E7%0D%0E3%A2%08%1DJT%A8%CE%3F%16n%DC%081%E7%40%80%1C%1B%ACH%98%DA%E0%C2%894QB%2C%E1%A6%22%89%8F4r%028%E0%D3d%C5%14%2B%1Fb(y%E0%20D%08%14%DC%88%98%84%D0%01V%8D%03%00%1Cnm%C8%C1%E2%02%5B%1D%3AP%98%F8CBG%09%07%0B%B2%60%00p%A2%C7%86%3B%2C%FCPx%40%A4D%09%C1%84-%F7%01C%03%C4%03%02%1Bb%E0%10A!%08e%CBH%06%2F%B1L%84%CD%96hq%DE%88%98%10%84%07%97.%96%9D%0C.%80%24%85%94%DF%C0%83%FFv%D2%3B%05%04nE%5E%20%88%C0%9C%8A%F3%E7%CE%99%23%40p%E6E%91%3FZ%04T0%A1%40A%95%EF%E0%BFw7Q%A1%88%00-%81%00%00%3B">';
	return iimg;
} 

function torrdtostr(str)
{  
 var m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, dd, yy, time;
 m1 = str.indexOf('Yanv', 1); if ( m1 != (-1)) {m = '01';};
 m2 = str.indexOf('Phev', 1); if ( m2 != (-1)) {m = '02';};
 m3 = str.indexOf('Mar', 1); if ( m3 != (-1)) {m = '03';};
 m4 = str.indexOf('Apr', 1); if ( m4 != (-1)) {m = '04';};
 m5 = str.indexOf('May', 1); if ( m5 != (-1)) {m = '05';};
 m6 = str.indexOf('Iyun', 1); if ( m6 != (-1)) {m = '06';};
 m7 = str.indexOf('Iyul', 1); if ( m7 != (-1)) {m = '07';};
 m8 = str.indexOf('Avg', 1); if ( m8 != (-1)) {m = '08';};
 m9 = str.indexOf('Sen', 1); if ( m9 != (-1)) {m = '09';};
 m10 = str.indexOf('Okt', 1); if ( m10 != (-1)) {m = '10';};
 m11 = str.indexOf('Noya', 1); if ( m11 != (-1)) {m = '11';};
 m12 = str.indexOf('Dek', 1); if ( m12 != (-1)) {m = '12';};
dd =  str.substr(1,2);
yy = str.substr(str.length-9,2);
time =  str.substr(str.length-6,2) + str.substr(str.length-3,2); 
return dd+m+yy+time;
}

function torrdtostr2(str)
{  
 var m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, dd, yy, time;
 m1 = str.indexOf('Jan', 1); if ( m1 != (-1)) {m = '01';};
 m2 = str.indexOf('Feb', 1); if ( m2 != (-1)) {m = '02';};
 m3 = str.indexOf('Mar', 1); if ( m3 != (-1)) {m = '03';};
 m4 = str.indexOf('Apr', 1); if ( m4 != (-1)) {m = '04';};
 m5 = str.indexOf('May', 1); if ( m5 != (-1)) {m = '05';};
 m6 = str.indexOf('Jun', 1); if ( m6 != (-1)) {m = '06';};
 m7 = str.indexOf('Jul', 1); if ( m7 != (-1)) {m = '07';};
 m8 = str.indexOf('Aug', 1); if ( m8 != (-1)) {m = '08';};
 m9 = str.indexOf('Sep', 1); if ( m9 != (-1)) {m = '09';};
 m10 = str.indexOf('Oct', 1); if ( m10 != (-1)) {m = '10';};
 m11 = str.indexOf('Nov', 1); if ( m11 != (-1)) {m = '11';};
 m12 = str.indexOf('Dec', 1); if ( m12 != (-1)) {m = '12';};
dd =  str.substr(5,2);
yy = str.substr(10,2);
time =  str.substr(str.length-5,2) + str.substr(str.length-2,2); 
return dd+m+yy+time;
}