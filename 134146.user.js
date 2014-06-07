// ==UserScript==
// @name           easy_screenshot_taynik
// @description    Adds new feature to online game chernobyl-soul.com
// @version	   1
// @versionnumber  1
// @author         shift2501
// ==/UserScript==

var t = '';

function big_field(){
    if(t==''){
    t = document.body.innerHTML + '';
    document.getElementsByClassName('cop-mid')[0].getElementsByTagName('div')[0].setAttribute('id', 'field_1');
    document.getElementsByClassName('cop-mid')[1].getElementsByTagName('div')[0].setAttribute('id', 'field_2');
    document.body.innerHTML = "<a href='javascript://' onclick='big_field()' class='button-standard'>Выключить</a>" + document.getElementsByClassName('cop-mid')[0].innerHTML + document.getElementsByClassName('cop-mid')[1].innerHTML;
    document.getElementById('field_1').style.width = "49%";
    document.getElementById('field_1').style.height = "100%";
    document.getElementById('field_1').style.styleFloat = 'left';
    document.getElementById('field_1').style.cssFloat = 'left';
    document.getElementById('field_1').style.border = '1px solid white';
    document.getElementById('field_2').style.width = "49%";
    document.getElementById('field_2').style.height = "100%";
    document.getElementById('field_2').style.styleFloat = 'right';
    document.getElementById('field_2').style.cssFloat = 'right';
    document.getElementById('field_2').style.border = '1px solid yellow';
    }else{
        document.body.innerHTML = t;
        t = '';
    }
}

object = window.addEventListener || window.attachEvent ? window : document.addEventListener ? document : null;
type = 'load';
object.addEventListener(type,function(){
        if(location.href=='http://chernobyl-soul.com/php/habar.php'){
            document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('div')[0].innerHTML = "<a href='javascript://' onclick='big_field()' class='button-standard'>Режим для скринов</a>" + document.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('div')[0].innerHTML;
            }
},false);