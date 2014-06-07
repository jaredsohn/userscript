// ==UserScript==
// @name        kias fix
// @namespace   mishavolkin@gmail.com/kias_fix
// @description Делает заполнение отчетов на kias.rfbr.ru более удобным.
// @include     http://kias.rfbr.ru/editreport.aspx*
// @exclude     /(#save|#check|#submit)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/autosize.js/1.17.1/autosize-min.js
// @version     0.1.1
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function(){
// Изменяем размеры отдельных элементов дязайна,
// освобождая дополниетельное место для полей ввода
    $("table.mainwrapper").width("100%");
    $("table.mainwrapper td.content").width("99%");
    $("table.mainwrapper td.title").width("10%");
    $("table.mainwrapper div.editor").width("100%");
    $("table.mainwrapper div.input").width("100%");
// Все текстовые поля автоматически меняют размер по своему содержимому	
	$('textarea').autosize({append: "\n"});

});