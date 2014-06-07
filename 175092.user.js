// ==UserScript==
// @id             www.dropbox.com-fa36d6c4-db54-4999-beaf-dc4ba483c987@scriptish
// @name           dropbox short link
// @version        1.0.1
// @history        1.0.1 Изменилась ссылка, добавил проверку на https
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/175092
// @author         Black_Sunlight
// @description    Добавляет поле с короткой ссылкой (db.tt) на эту страницу
// @include        https://www.dropbox.com/*
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==
$(function(){
var short=$('#share-button').attr('onclick').match(/http(s)?\:\/\/db\.tt\/+[^"||']*/ig)
$('.logo').closest('div').append('<input type="text" style="cursor:normal; left: 140px; position: absolute;top: 10px;" readonly value="'+short+'" size="20" onclick="this.select()" />')
});