// ==UserScript==
// @name           Group_Maks_Filtr [GW]
// @namespace      гном убийца
// @description    Фильтр групповых боев по максимальному уровню. (v 2.0.09.08.2009)
// @include        http://www.ganjawars.ru/wargroup.php?war=armed*
// ==/UserScript==

(function() {

var command='red'
var key = 0;
var level_min = 5;
var level_max = 50;
var option_code = new String();
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

   
 var a = root.document.getElementsByTagName('a');
 for (i = 0; i < 50; i++) {
 	if(a[i].innerHTML == '&lt;&lt;Назад'){
 		back = a[i];
 	}
 }
 
 var tr = root.document.getElementsByTagName('font');
 for (i = 0, l = tr.length; i < l; i++) {
 	if(tr[i].color == command && tr[i].innerHTML !='+' ){
 	  id = 'hidden_'+i;
      tr[i].parentNode.parentNode.parentNode.setAttribute('style','visibility: hidden');
      tr[i].parentNode.parentNode.parentNode.setAttribute('id',id);
 	}
 }

 cookie_txt = document.cookie;
 cookie_txt = cookie_txt.split(";");
 
 for(k=0; k < cookie_txt.length; k++){
 	if (cookie_txt[k].lastIndexOf("levelmax") != -1){
 		level_max = cookie_txt[k].split("=");
 		level_max = parseInt(level_max[1]);
 		key = 1;
 	}
 }
 
 var filtr = document.createElement('span');
     html_code = ' | Фильтр по:<select id="filrt_form" value="" style=" font-weight: 500; font-family: Verdana; background-color: rgb(245, 255, 245); font-size: 12px; text-align: center; width: 50px; border-style: none;">';
     for(s = 5; s <= 50; s++){
     	if (level_max == s){
     	  option_code = option_code + '<option selected>'+s+'</option>';
     	}else{
     	  option_code = option_code + '<option>'+s+'</option>';
     	}
     }
     html_code = html_code + option_code + ' <input type="button" id="filtr_button" value=">>" style="font-weight: 800; font-family: Verdana; background-color: rgb(245, 255, 245); font-size: 12px; border-style: none;">';
     filtr.innerHTML = html_code;
     back.parentNode.insertBefore(filtr, back.nextSibling);
 
 if(key == 1){
 	Update_page(level_max, level_min);
 }else{
   document.cookie="levelmax=50;";
   Update_page(level_max, level_min);
 }

function Update_page(level_max, level_min){
 
 for(j=level_min; j <= level_max; j++){
 	
   var f = root.document.getElementsByTagName('font');
       level = '-'+j;
   for (i = 0, l = f.length; i < l; i++) {
     if(f[i].color == command && f[i].innerHTML !='+' ){
       var a = f[i].innerHTML;
       var stroka = f[i].innerHTML;
       if (stroka.lastIndexOf(level) != -1) {
       	 level_new = stroka.split("-");
       	 level_new = level_new[1];
       	 if ((level != '-5' && level_new !='50') || level_max == 50 ){
            f[i].parentNode.parentNode.parentNode.setAttribute('style','visibility: visible');
            f[i].parentNode.parentNode.parentNode.setAttribute('id','visible');
       	 }
       } 
     }
   }
 }
 
  for (h = 0 ; h < l; h++){
  	    id = 'hidden_'+h;
  	var idh = root.document.getElementById(id);
  	if (idh != null){
  	    	idh.setAttribute('style','display: none;');
  	}
  }
}

var Button = root.document.getElementById('filtr_button');	
    Button.onclick = function(){
    new_level_max = "levelmax=" + root.document.getElementById('filrt_form').value;
    document.cookie=new_level_max;
    document.location.href='http://www.ganjawars.ru/wargroup.php?war=armed';
    }


})();