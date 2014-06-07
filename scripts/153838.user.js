// ==UserScript==
// @name           Virtonomica: Склад+
// @namespace      virtonomic*
// @include        http://virtonomic*.*/*/main/unit/view/*/sale/offer
// @include        http://virtonomic*.*/*/main/unit/view/*/sale
// @version        1.0
// ==/UserScript==
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$=win.$;
var sel=3;//Только для своей компании
var sel1=0// 0-по СС
var hidd=1;//0-не прятать пустые ряды,1-прятать 

//склад/не склад?
if(/(?:Склад)/.test($('div[class*="officePlace"]').prop('textContent'))){
 
 $('table.grid>tbody>tr th:eq(3)').css('background','#D7DF01');
 $('table.grid>tbody>tr th:eq(3)').prop('textContent','На складе (в наличии)');
 $('table.grid>tbody>tr th:eq(3)').css('border-bottom','2px inset #1F1C1B');
 $('table.grid>tbody>tr th:eq(3)').css('border-radius','5px');
 
 $('table.grid>tbody>tr th:eq(6)').css('background','#D7DF01');
 $('table.grid>tbody>tr th:eq(6)').prop('textContent','Цена (гр. уст.)');
 $('table.grid>tbody>tr th:eq(6)').css('border-bottom','2px inset #1F1C1B');
 $('table.grid>tbody>tr th:eq(6)').css('border-radius','5px');

 $('table.grid>tbody>tr th:eq(7)').css('background','#D7DF01');
 $('table.grid>tbody>tr th:eq(7)').prop('textContent','Политика сбыта (гр. уст.)');
 $('table.grid>tbody>tr th:eq(7)').css('border-bottom','2px inset #1F1C1B');
 $('table.grid>tbody>tr th:eq(7)').css('border-radius','5px');

var inp=$('<td id="xxx" style  >---</td>');
var show=hidd;
  if (show==0) {
   $('table.grid>tbody>tr th:eq(3)').prop('textContent','На складе (Все поз.)');
  }



/////////прячем/не прячем ряды по умолчанию
if(hidd){$('table.grid>tbody>tr:gt(0)').each(function(){ 
if($('tr>td:contains("Себестоимость")',this).next().prop('textContent')=="---")
{$(this).css('display','none')}})}

/////////функция показать/спрятать пустые позиции
$('table.grid>tbody>tr th:eq(3)').click(function(){
   $('table.grid>tbody>tr th:eq(3)').prop('textContent','На складе (Все поз.)');
  if (show==0) {
   $('table.grid>tbody>tr th:eq(3)').prop('textContent','На складе (В наличии)');
  }
var disp=(show==0?'none':'table-row');
$('table.grid>tbody>tr:gt(0)').each(function(){
if($('tr>td:contains("Себестоимость")',this).next().prop('textContent')=="---"){$(this).css('display',disp);}
});

//переносим форму ввода изменений цены в первую видимую строку после работы функции
show==1?inp.insertBefore($('table.grid>tbody>tr td>input.money[ss]:first')):inp.insertBefore($('table.grid>tbody>tr td>input.money[ss!="--"]:first'));
$('td#xxx').css('width',"80px");
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
$('td#xxx').css('width',"80px");

////////////////////////////Групповые изменения////////////////////////////////////////
$('table.grid>tbody>tr th:eq(6)').click(function(e){
  $('table.grid>tbody>tr:gt(0)').each(function(){
    var price=$('td>input.money',this).attr('value');
    $('td>input.money',this).attr('price2',price);
  })

    var proc=1
    var znak=0
    var izmen_fix=10*sel1;
    
    if (sel1==1) { izmen_fix=5; znak=1;$('table.grid>tbody td#xxx').prop('textContent',"-5%")}

    if (sel1==2) { izmen_fix=5; znak=0;$('table.grid>tbody td#xxx').prop('textContent',"+5%")}

    if (sel1==3) { izmen_fix=10; znak=1;$('table.grid>tbody td#xxx').prop('textContent',"-10%")}

    if (sel1==4) { izmen_fix=10; znak=0;$('table.grid>tbody td#xxx').prop('textContent',"+10%")}
    
    set_np(izmen_fix,proc,znak)
    
    if (sel1==0) {set_all_ss();$('table.grid>tbody td#xxx').prop('textContent',"CC")}

    sel1+=1;sel1=sel1%5
})

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

///////////////////////////вычисления относительно начальной цены///////////
function set_np(i,p,z){
$('table.grid>tbody>tr:gt(0)').each(function(){
var elem=$('td>input.money',this);
var np=elem.attr('price1');// np-- начальная цена продажи
var val;
if ((np!=0)&&(p==1))        //////////работа с процентами///////
{switch(z){
case 0:val=(np*(1+i/100)).toFixed(2);break;  //сумма
case 1:val=(np*(1-i/100)).toFixed(2);break;  //разность
case 2:val=(i*np/100).toFixed(2);break;}}  //установка

elem.attr('value',val>0?val:0);
if(elem.attr('value')!=elem.attr('price1')&&elem.attr('price1')>0) {
  elem.css('background',"#99ff99");$('td#td1',this).prop('textContent',elem.attr('price1'));
  $('td#td2',this).prop('textContent',(elem.attr('value')-elem.attr('price1')).toFixed(2));}else {elem.css('background',"#ffffff");$('td#td1',this).prop('textContent',"");
  $('td#td2',this).prop('textContent',"");
}
if(np>0&&elem.attr('value')==0){elem.css('background',"#ff9999");}
if(np>0&&elem.attr('value')<elem.attr('ss')){elem.css('background',"#ff9999");}

})}

//возврат прежних значений
function set_ss_shift(){
  $('table.grid>tbody>tr:gt(0)').each(function(){
    var ss=$('td>input.money',this).attr('price1');
    $('td>input.money',this).attr('value',ss).css('background',"#ffffff");
    $('td#td1',this).prop('textContent',"");
    $('td#td2',this).prop('textContent',"");
  })
}

/////////////////////////////////////////////////////////////Политика сбыта//////////////////////////////////////
$('table.grid>tbody>tr th:eq(7)').click(function(){set_pol_sb();});
function set_pol_sb(){
  $('table.grid>tbody>tr:gt(0)').each(function(){
    $('td:last select',this).attr('selectedIndex',sel);
    $.each($('td:last select>option',this),function(index,value){
      index==sel?$(value).prop('selected','selected'):$(value).prop('selected','');
    })
    if (sel==2) $('td:last select',this).next('div').css('display','block');

    if (sel!=2) $('td:last select',this).next('div').css('display','none');

    (sel==0&&$('td>input.money',this).attr('ss')>0)?$('td:last select',this).css('background',"#ff9999"):$('td:last select',this).css('background',"#ffffff");
  })
sel+=1;sel=sel%5;
}
  
}
