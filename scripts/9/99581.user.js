// ==UserScript==
// @name           warehouse+
// @namespace      virtonomic*
// @include        http://virtonomic*.*/*/main/unit/view/*/sale/offer
// @include        http://virtonomic*.*/*/main/unit/view/*/sale
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
var sel=3;//Только для своей компании
var hidd=1;//0-не прятать пустые ряды,1-прятать 

//склад/не склад?
if(/(?:Склад)/.test($('div[class*="officePlace"]').prop('textContent'))){

var inp=$('<td><input id="xxx"></td>');
var show=hidd;


/////////прячем/не прячем ряды по умолчанию
if(hidd){$('table.grid>tbody>tr:gt(0)').each(function(){ 
if($('tr>td:contains("Себестоимость")',this).next().prop('textContent')=="---")
{$(this).css('display','none')}})}

/////////функция показать/спрятать пустые позиции
$('table.grid>tbody>tr th:eq(3)').click(function(){
var disp=(show==0?'none':'table-row');
$('table.grid>tbody>tr:gt(0)').each(function(){
if($('tr>td:contains("Себестоимость")',this).next().prop('textContent')=="---"){$(this).css('display',disp);}
});
//переносим форму ввода изменений цены в первую видимую строку после работы функции
show==1?inp.insertBefore($('table.grid>tbody>tr td>input.money[ss]:first')):inp.insertBefore($('table.grid>tbody>tr td>input.money[ss!="--"]:first'));
$('input#xxx').css('width',"80px");
show+=1;show=show%2;})

//////////индикатор изменения цены и красные индикаторы
$('table.grid>tbody>tr:gt(0)').each(function(){
var tdd=$('<td id="td1"></td><td id="td2"></td>');
tdd.insertAfter($('td>input.money',this)).css('textAlign',"left");
$('td#td1').css('width',"40px");$('td#td2').css('width',"40px");
var price=($('td>input.money',this).attr('value')-0).toFixed(2);
$('td>input.money',this).attr('price1',price).attr('price2',price);
var ss=$('tr>td:contains("Себестоимость")',this).next().prop('textContent').slice(0,-1).replace(' ','');
$('td>input.money',this).attr('ss',ss);
if(ss>0&&price==0){$('td>input.money',this).css('background',"#ff9999")};
if($('td:last select',this).attr('selectedIndex')==0&&ss>0){$('td:last select',this).css('background',"#ff9999")};
})


/////////////переносим форму ввода изменений цены в первую видимую строку при загрузке
hidd==0?inp.insertBefore($('table.grid>tbody>tr td>input.money[ss]:first')):inp.insertBefore($('table.grid>tbody>tr td>input.money[ss!="--"]:first'));
$('input#xxx').css('width',"80px");

////////////////////////////Групповые изменения////////////////////////////////////////
$('table.grid>tbody>tr th:eq(6)').click(function(e){
$('table.grid>tbody>tr:gt(0)').each(function(){
var price=$('td>input.money',this).attr('value');
$('td>input.money',this).attr('price2',price);
})
var izmen=$('input#xxx').attr('value');
if(izmen!=''){
var proc=izmen.slice(-1)=="%"?1:0;  //проценты или сумма?
var znak=izmen.slice(0,1)=="+"?0:(izmen.slice(0,1)=="-"?1:2);        // +, - или =?
var izmen_fix=izmen.replace(/[^\d\.]/g,'');
if(e.altKey){set_ss_alt(izmen_fix,proc,znak);} else
if(e.shiftKey){set_ss_shift();} else
if(e.ctrlKey){set_ss_ctrl(izmen_fix,proc,znak);} else set_all_ss();}
else if(e.shiftKey){set_ss_shift();} else set_all_ss()});

//всё по сс
function set_all_ss(){
$('table.grid>tbody>tr:gt(0)').each(function(){
var elem=$('td>input.money',this);
var ss=elem.attr('ss');
elem.attr('value',ss);
if(elem.attr('value')!=elem.attr('price1')&&ss>0)
{elem.css('background',"#99ff99");$('td#td1',this).prop('textContent',elem.attr('price1'));
$('td#td2',this).prop('textContent',(elem.attr('value')-elem.attr('price1')).toFixed(2));}else {elem.css('background',"#ffffff");$('td#td1',this).prop('textContent',"");
$('td#td2',this).prop('textContent',"");}
})}

/////////////////////////////////////вычисления по сс////////
function set_ss_ctrl(i,p,z){
$('table.grid>tbody>tr:gt(0)').each(function(){
var elem=$('td>input.money',this);
var ss=elem.attr('ss');
var ss=ss>0?ss:0;
var val;
if((ss!=0)&&(p==0)) /////////работа с числами////////
{switch(z){
case 0:val=((ss-0)+(i-0)).toFixed(2);break;  //сумма
case 1:val=(ss-i).toFixed(2);break;  //разность
case 2:val=i;break;}}     //установка введённой суммы
else  if ((ss!=0)&&(p==1))        //////////работа с процентами///////
{switch(z){
case 0:val=(ss*(1+i/100)).toFixed(2);break;  //сумма
case 1:val=(ss*(1-i/100)).toFixed(2);break;  //разность
case 2:val=(i*ss/100).toFixed(2);break;}}  //установка
elem.attr('value',val>0?val:(0-0));
if(elem.attr('value')!=elem.attr('price1')&&elem.attr('price1')>0)
{elem.css('background',"#99ff99");$('td#td1',this).prop('textContent',elem.attr('price1'));
$('td#td2',this).prop('textContent',(elem.attr('value')-elem.attr('price1')).toFixed(2));} else {elem.css('background',"#ffffff");$('td#td1',this).prop('textContent',"");
$('td#td2',this).prop('textContent',"");}
if(ss>0&&elem.attr('value')==0){elem.css('background',"#ff9999");}
})}

///////////////////////////вычисления по предыдущему значению///////////
function set_ss_alt(i,p,z){
$('table.grid>tbody>tr:gt(0)').each(function(){
var elem=$('td>input.money',this);
var ss=elem.attr('price2');
var val;
if((ss!=0)&&(p==0)) /////////работа с числами////////
{switch(z){
case 0:val=((ss-0)+(i-0)).toFixed(2);break;  //сумма
case 1:val=(ss-i).toFixed(2);break;  //разность
case 2:val=i;break;}}     //установка введённой суммы
else  if ((ss!=0)&&(p==1))        //////////работа с процентами///////
{switch(z){
case 0:val=(ss*(1+i/100)).toFixed(2);break;  //сумма
case 1:val=(ss*(1-i/100)).toFixed(2);break;  //разность
case 2:val=(i*ss/100).toFixed(2);break;}}  //установка
elem.attr('value',val>0?val:0);
if(elem.attr('value')!=elem.attr('price1')&&elem.attr('price1')>0)
{elem.css('background',"#99ff99");$('td#td1',this).prop('textContent',elem.attr('price1'));
$('td#td2',this).prop('textContent',(elem.attr('value')-elem.attr('price1')).toFixed(2));}else {elem.css('background',"#ffffff");$('td#td1',this).prop('textContent',"");
$('td#td2',this).prop('textContent',"");}
if(ss>0&&elem.attr('value')==0){elem.css('background',"#ff9999");}
})}

//возврат прежних значений
function set_ss_shift(){
$('table.grid>tbody>tr:gt(0)').each(function(){
var ss=$('td>input.money',this).attr('price1');
$('td>input.money',this).attr('value',ss).css('background',"#ffffff");
$('td#td1',this).prop('textContent',"");
$('td#td2',this).prop('textContent',"");})}

////////////////////////////////////////////////////////Одиночные изменения////////////////////////////////////////
$('table.grid>tbody>tr:gt(0)>td>input.money').dblclick(function(e){
var elem=$(this);
var price=elem.attr('value');
elem.attr('price2',price);
var izmen=$('input#xxx').attr('value');
if(izmen!=''){
var proc=izmen.slice(-1)=="%"?1:0;  //проценты или сумма?
var znak=izmen.slice(0,1)=="+"?0:(izmen.slice(0,1)=="-"?1:2);        // +, - или =?
var izmen_fix=izmen.replace(/[^\d\.]/g,'');
if(e.altKey){set_alt(izmen_fix,proc,znak,elem);} else
if(e.shiftKey){set_shift(elem);} else
if(e.ctrlKey){set_ctrl(izmen_fix,proc,znak,elem);} else set_ss(elem);}
else if(e.shiftKey){set_shift(elem);} else set_ss(elem)});

///////////////////////////вычисления по предыдущему значению///////////
function set_alt(i,p,z,e){
var ss=e.attr('price2');
var val;
if((ss!=0)&&(p==0)) /////////работа с числами////////
{switch(z){
case 0:val=((ss-0)+(i-0)).toFixed(2);break;  //сумма
case 1:val=(ss-i).toFixed(2);break;  //разность
case 2:val=i;break;}}     //установка введённой суммы
else  if ((ss!=0)&&(p==1))        //////////работа с процентами///////
{switch(z){
case 0:val=(ss*(1+i/100)).toFixed(2);break;  //сумма
case 1:val=(ss*(1-i/100)).toFixed(2);break;  //разность
case 2:val=(i*ss/100).toFixed(2);break;}}  //установка
e.attr('value',val>0?val:0);
if(e.attr('value')!=e.attr('price1')&&e.attr('price1')>0)
{e.css('background',"#99ff99");e.next().prop('textContent',e.attr('price1'));
e.next().next().prop('textContent',(e.attr('value')-e.attr('price1')).toFixed(2));}else {e.css('background',"#ffffff");e.next().prop('textContent',"");
e.next().next().prop('textContent',"");}
if(e.attr('ss')>0&&e.attr('value')==0){e.css('background',"#ff9999");}
}

function set_ss(e){
var ss=e.attr('ss');
e.attr('value',ss);
if(e.attr('value')!=e.attr('price1')&&e.attr('price1')>0)
{e.css('background',"#99ff99");e.next().prop('textContent',e.attr('price1'));
e.next().next().prop('textContent',(e.attr('value')-e.attr('price1')).toFixed(2));}else {e.css('background',"#ffffff");e.next().prop('textContent',"");
e.next().next().prop('textContent',"");}}

/////////////////////////////////////вычисления по сс////////
function set_ctrl(i,p,z,e){
var ss=e.attr('ss');
var ss=ss>0?ss:0;
var val;
if((ss!=0)&&(p==0)) /////////работа с числами////////
{switch(z){
case 0:val=((ss-0)+(i-0)).toFixed(2);break;  //сумма
case 1:val=(ss-i).toFixed(2);break;  //разность
case 2:val=i;break;}}     //установка введённой суммы
else  if ((ss!=0)&&(p==1))        //////////работа с процентами///////
{switch(z){
case 0:val=(ss*(1+i/100)).toFixed(2);break;  //сумма
case 1:val=(ss*(1-i/100)).toFixed(2);break;  //разность
case 2:val=(i*ss/100).toFixed(2);break;}}  //установка
e.attr('value',val>0?val:0);
if(e.attr('value')!=e.attr('price1')&&e.attr('price1')>0)
{e.css('background',"#99ff99");e.next().prop('textContent',e.attr('price1'));
e.next().next().prop('textContent',(e.attr('value')-e.attr('price1')).toFixed(2));}else {e.css('background',"#ffffff");e.next().prop('textContent',"");
e.next().next().prop('textContent',"");}
if(e.attr('ss')>0&&e.attr('value')==0){e.css('background',"#ff9999");}}

//возврат прежнего значения
function set_shift(e){
var ss=e.attr('price1');
e.attr('value',ss).css('background',"#ffffff");
e.next().prop('textContent',"");
e.next().next().prop('textContent',"");}

//////////////////////////////////////////////////////////////Политика сбыта//////////////////////////////////////
$('table.grid>tbody>tr th:eq(7)').click(function(){set_pol_sb();});
function set_pol_sb(){
$('table.grid>tbody>tr:gt(0)').each(function(){
$('td:last select',this).attr('selectedIndex',sel);
$.each($('td:last select>option',this),function(index,value){
index==sel?$(value).prop('selected','selected'):$(value).prop('selected','');})
sel==2?$('td:last select',this).next('div').css('display','block'):$('td:last select',this).next('div').css('display','none');
(sel==0&&$('td>input.money',this).attr('ss')>0)?$('td:last select',this).css('background',"#ff9999"):$('td:last select',this).css('background',"#ffffff");
})
sel+=1;sel=sel%4;
}}
