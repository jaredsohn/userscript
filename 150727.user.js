// ==UserScript==
// @id             www.lenta.ru-b15c91de-44eb-44cd-98a4-95a6f0662890@script
// @name           lenta news chooser
// @version        1.2
// @history        1.2 Центровка настроек и убирание мелких полосок сверху и снизу
// @history        1.1 Обновлены вхождения
// @history        1.0 Initial release
// @namespace      http://userscripts.org/scripts/show/150727
// @author         Black_Sun
// @include        http://lenta.ru/#close
// @include        http://www.lenta.ru/#close
// @include        http://lenta.ru/#openModal
// @include        http://www.lenta.ru/#openModal
// @include        http://lenta.ru/
// @include        http://www.lenta.ru/
// @require	   http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

function loadlist(){
for(var b=0;b<$(".rubhead").length;b++);
$(".rubhead").each(function(a){$("#openModal>div>span").append("<input type='checkbox' id='chtoggle"+a+"' style='cursor:pointer'><label for='chtoggle"+a+"'>"+$(this).text()+"</label><br>");});
}
function blokh(){
$(".rubhead").each(function(a){
$("#chtoggle"+a).click(function(){
if($('.peredovica').eq(a+1).is(":hidden")){
$(this).removeAttr("checked");
$('.peredovica').eq(a+1).show();
$('.hrg').eq(a+1).show();
eraseCookie('toggler'+a);
} else {
$(this).attr("checked","true");
$('.peredovica').eq(a+1).hide();
$('.hrg').eq(a+1).hide();
setCookie("toggler"+a,"a",3650)
}})});
for(var b=0;b<$(".rubhead").length;b++){
if(getCookie("toggler"+b)){
getCookie("toggler"+b)?$("#chtoggle"+b).attr("checked","true"):$("#chtoggle"+b).removeAttr("checked")
}}
}
function check(){for(j=0;$(".rubhead").length>=j;j++)getCookie("toggler"+j)?($('.peredovica').eq(j+1).hide(),$('.hrg').eq(j+1).hide()):($('.peredovica').eq(j+1).show(),$('.hrg').eq(j+1).show())}

function setCookie(a,b,c){if(c){var d=new Date;d.setTime(d.getTime()+c*864E5);c="; expires="+d.toGMTString()}else c="";document.cookie=a+"="+b+c+"; path=/"}
function getCookie(a){a+="=";for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)==0)return d.substring(a.length,d.length)}return null}
function eraseCookie(a){setCookie(a,"",-1)}
$('#current-time').after('<a id="modalopen" href="#openModal">Открыть настройки</a><style>.modalDialog{margin-top:-1px!important;height:100%!important;position:fixed!important;font-family:Arial,Helvetica,sans-serif!important;top:0!important;right:0!important;bottom:0!important;left:0!important;background:rgba(0,0,0,0.8)!important;z-index:99999!important;-webkit-transition:opacity 400ms ease-in!important;-moz-transition:opacity 400ms ease-in!important;transition:opacity 400ms ease-in!important;display:none!important;pointer-events:none!important}.modalDialog:target{display:block!important;pointer-events:auto!important}.modalDialog span{-webkit-column-count:2;-moz-column-count:2;column-count:2;display:block}.modalDialog>div{top:50%!important;left:50%!important;width:400px!important;position:relative!important;margin:-155px auto auto -200px!important;height:310px!important;padding:5px 20px 13px 20px!important;border-radius:10px!important;background:#fff!important;background:-moz-linear-gradient(#fff,#999)!important;background:-webkit-linear-gradient(#fff,#999)!important;background:-o-linear-gradient(#fff,#999)!important}.close{background:#606061!important;color:#fff!important;line-height:25px!important;position:absolute!important;right:-12px!important;text-align:center!important;top:-10px!important;width:24px!important;text-decoration:none!important;font-weight:bold!important;-webkit-border-radius:12px!important;-moz-border-radius:12px!important;border-radius:12px!important;-moz-box-shadow:1px 1px 3px #000!important;-webkit-box-shadow:1px 1px 3px #000!important;box-shadow:1px 1px 3px #000!important}.close:hover{background:#00d9ff!important}</style><div id="openModal" class="modalDialog"><div><a href="#close" title="Закрыть" class="close">X</a><h2>Настройки скрытия блоков не интересующих новостей.</h2><center><input type="button" id="modalcheck" value="Применить настройки"/></center><br><span></span></div></div>');
$('#modalopen').click(function(){blokh()});$('#modalcheck').click(function(){check()});check();loadlist()