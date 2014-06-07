// ==UserScript==
// @id             ucoz-fb220657-ed32-4a5b-99c9-afc0de882249
// @name           ucoz forum all massive delete messages
// @version        1.0.0
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/439361
// @author         Black_Sunlight
// @description    
// @include        http://*/forum/*
// @require	https://raw.github.com/Black-Sunlight/lib-files/master/jquery.js
// @run-at         document-end
// ==/UserScript==

$('#delPtBut').eq(0).before('<div style="height:25px;text-align: center;"><label for="all">Выделить/снять всё: </label><input type="checkbox" id="all" title="Выделить/снять всё"/></div>')
$('#delPtBut').parent().before('<button id="delall" style="float:left">Удалить все сообщения со страницы</button><br>')

$('#all').on('click',function(){
if($(this).prop('checked')==true){$('.postBottom').find('input[type="checkbox"]').click();$('#delPtBut').show()}
else{$('.postBottom').find('input[type="checkbox"]').click();$('#delPtBut').hide()}
});
$('#delall').on('click',function(){
$('.postBottom').find('input[type="checkbox"]').click();
$('#delPtBut').find('form').submit()
});