 // ==UserScript==
// @name        Autosrunka
// @namespace   http://1chan.ru/
// @include     http://1chan.ru/*
// @version     1
// @grant       none
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var title = '­­­­­­­­';
var link = 'http://PRRRRR.com';
var text;

var prr = document.createElement("input");prr.type = "button";prr.value = "Срунька";prr.onclick = prrr;prr.setAttribute("style", "margin-left: 125px;");$('.b-blog-form h1').append(prr);
var blank = document.createElement("input");blank.type = "button";blank.value = "Пустые символы";blank.setAttribute("style", "margin-left:5px;");blank.onclick = blank_f;$('.b-blog-form h1').append(blank);
var bagorn = document.createElement("input");bagorn.type = "button";bagorn.value = "Багорн";bagorn.onclick = bagorn_a;bagorn.setAttribute("style", "margin-left: 160px;");$('.b-blog-form h1').append(bagorn);
var newrooster = document.createElement("input");newrooster.type = "button";newrooster.value = "Ньюрустер A";newrooster.setAttribute("style", "margin-left: 130px;");newrooster.onclick = newrooster_a;$('.b-blog-form h1').append(newrooster);
var newrooster = document.createElement("input");newrooster.type = "button";newrooster.value = "Ньюрустер B";newrooster.setAttribute("style", "margin-left: 1px;");newrooster.onclick = newrooster_b;$('.b-blog-form h1').append(newrooster);

function prrr() {text = "\"[:52506018:]\":http://rghost.ru/52506018/image.png\n**ПPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP ПOCPАЛ В KOЛЧOК HE CМЫЛ БAЧОK**\n*****\n&nbsp;\n";posrat();}
function blank_f() {text = "\n";for (var i = 1; i < 337; i++) {text = text + "&nbsp;\n";}posrat();}
function bagorn_a() {text = "\"[:52506018:]\":http://rghost.ru/52506018/image.png\n**ПPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP ПOCPАЛ В KOЛЧOК HE CМЫЛ БAЧОK**\n*****\n&nbsp;\n"; for (var i = 1; i < 270; i++) {text = text + "&nbsp;\n";}posrat();}
function newrooster_a() {text = "\nПредставьте, что вы заходите в колчок, в /all/, а там одни новости. Что, уже обосрались? Правильно, никому такой колчок не нужен. Все высеры новостного петуха, все говнорепосты и пуки сосаки будут смыты, смыты всепоглощающим потоком говна в беспросветную бездну колчка.\n\n&nbsp;\n"; for (var i = 1; i < 250; i++) {text = text + "&nbsp;\n";}posrat();}
function newrooster_b() {text = "\nСука, проклятый вонючий новостной петух. Развернул бурную экспансию против колчка. Игнорируем провокации этой лицемерной твари, этого вонючего сраного новостного петуха, который срал тут годами, а теперь вздумал зафорсить, что на колчке есть место новостям. Колчок будет спасён от вонючих говнорепостов, смыт священными потоками говна.\n\n&nbsp;\n"; for (var i = 1; i < 220; i++) {text = text + "&nbsp;\n";}posrat();}

function posrat() {$("input[name=\"title\"]").val(title);$("input[name=\"link\"]").val(link); $("textarea[name=\"text\"]").val(text);$("input[name=\"captcha\"]").focus();}