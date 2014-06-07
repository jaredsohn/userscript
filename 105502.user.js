// ==UserScript==
// @name           noobtypewiker
// @namespace      http://userscripts.org/users/352597
// @description    Noobtype Wiki integration to iichan.ru
// @include        http://iichan.ru/b/*
// ==/UserScript==
/*************
 * Constants *
 *************/

var articles = new Array("2008", "410chan", "410чан", "Cirno", "Dobrochan.ru", "Futaba", "I-bbs.org", "IIchan.ru", "IiChan", "IiChan.net", "Iichan.ru", "Imageboard", "Lolbot", "Mithgirl", "Nichan", "Noko", "Noobtype", "Photon", "Photon.css", "Sage", "Stephanie", "Unyl", "Wakachan", "Ічан", "Їчан", "Аноним", "Анонимус", "Борда", "Вайп", "Видодъска", "Вордфильтр", "Гендо", "Гет", "Два.ч", "Двач", "Двач-тан", "Двач-тян", "Доброчан", "Иичан", "Имиджборд", "Имиджборда", "Коллайдер-сама", "Конгломерат", "Ктулху-сан", "Лолбот", "Луркоморье", "Мицгел", "Мицгол", "Мицгёл", "Мицгёрл", "Мод-тян", "Монстрорена", "Нанодесу", "Нубтайп", "Радуга-кун", "Ручан", "Слоупок", "Стефанифагготрия", "Сырно", "Умночан", "Умночанъ", "Футаба", "Ханю", "Ханюфагготрия", "Хигурашефагготрия", "Хостинг", "Хуле", "Хулѣ", "Чан", "Чаносфера", "Ычан", "Юке");

/************
 * Routines *
 ************/

var dubug = {enabled : false,
             alert : function(s) {
                         if(this.enabled) {
                             alert(s);
                         }
                     }
            };

/***************
 * Actual code *
 ***************/

var messages = document.getElementsByTagName("blockquote");
var words;
var tagreg = /(<.+?>)/;
var wordreg = /([\w\-а-яА-ЯёЁ\.ѣ]+)/;
var untag;
var tagflag = false;
for (var i = 0; i < messages.length; i++) {
    var out = "";
    if (messages[i].innerHTML.length <= 2000) {
        untag = messages[i].innerHTML.split(tagreg);
        dubug.alert("untag.length=" + untag.length);
        for (var j = 0; j < untag.length; j++) {
            if (untag[j][0] == '<' && untag[j][1] != '/' && untag[j][untag[j].length - 2] != '/' && untag[j][untag[j].length - 1] == '>') {
                if (untag[j] != "<p>") {
                    tagflag = true;
                    dubug.alert("Tag mode ON.");
                }
                out += untag[j];
            } else if (untag[j][0] == '<' && untag[j][untag[j].length - 2] == '/' && untag[j][untag[j].length - 1] == '>') {
                tagflag = false;
                dubug.alert("Tag mode OFF.");
                out += untag[j];
            } else if (untag[j][0] == '<' && untag[j][1] == '/' && untag[j][untag[j].length - 1] == '>') {
                tagflag = false;
                dubug.alert("Tag mode OFF.");
                out += untag[j];
            } else if (tagflag) {
                out += untag[j];
                dubug.alert("We in tag mode.");
            } else {
                words = untag[j].split(wordreg);
                for (var k = 0; k < words.length; k++) {
                    for (var l = 0; l < articles.length; l++) {
                        if (words[k].toLowerCase().indexOf(articles[l].toLowerCase()) == 0) {
                            dubug.alert("Got " + words[k]);
                            words[k] = "<a target=\"_blank\" "
                                     + "href=\"http://noobtype.co.cc/index.php/"
                                     + articles[l] + "\">" + words[k] + "</a>";
                            break;
                        }
                    }
                    out += words[k];
                }
                tagflag = false;
                dubug.alert("Tag mode OFF.");
            }
        }
        dubug.alert(out);
    }
    if (messages[i].innerHTML != out) {
        messages[i].innerHTML = out;
    }
}