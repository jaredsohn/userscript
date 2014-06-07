// ==UserScript==
// @name       Insert Side Bar Vkontakte
// @namespace  http://vk.net.ru
// @version    0.1
// @description  Insert links to side bar vkontakte
// @include    http://vk.com/*
// @copyright  2011, Lex
// ==/UserScript==
function ins_bar(link,title) {
    var newdiv=document.getElementById('side_bar').getElementsByTagName("ol")[0];
    var newli=document.createElement("li");
    var newa=document.createElement("a");
    newa.setAttribute("href",link);
    newa.innerHTML=title;
    newli.appendChild(newa);
    newdiv.appendChild(newli);
}
ins_bar("http://your_url","your_title"); //измените здесь your_url на Вашу ссылку и your_title 
                                         //на Ваше название