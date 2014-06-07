// ==UserScript==
// @name         Automatic Repost VK.com
// @namespace    http://vk.com/chipchipchipchipideyl
// @version      2.8
// @description  Автоматический репост ВКонтакте (Automatic Repost VK.com) 
// @icon         http://vk.com/favicon.ico
// @match        http://m.vk.com/*
// @copyright    2014+, Egor Sokolov
// ==/UserScript==

// Изменить на false для выхода из режима тестирования
var test = true;

// Подписчики сообщества || Отправить сообщением || Друзья и подписчики
var repostTo = "Подписчики сообщества";

// Имена друзей для сообщения / названия групп на которые постить / На мою стену - для своей стены.
var repostNames = ["Ссылки-ловушки Ask, Спрашивай, Twitter, Instagra",
                   "Узнай гостей Ask, Спрашивай, Twitter, Instagram",
                   "Узнайте гостей Ask, Спрашивай, Twitter, Instagra",
                   "Ловушки гостей на Ask, Спрашивай, Твиттер, Insta"
                  ];

//var randomNames = Math.floor((Math.random()*repostNames.length)+1) - 1; // Можно в случайном порядке
//var repostName = repostNames[randomNames].substr(0, 23) + "..";
var repostName = repostNames[0].substr(0, 23) + "..";

var today = new Date();
var hour = today.getHours();

// По какому поисковому запросу репостить.
var listSearchQ = ["domain%3Aaskfm.su",
                   "domain%3Asparshivai.ru",
                   "domain%3Asprashivaii.ru",
                   "domain%3Aask.fm%20задай%20-sprashivai",
                   "domain%3Asprashivai.ru%20-ask",
                   "domain%3Aask.fm%20-задай"
                  ];

var randomSearchQ = Math.floor((Math.random()*listSearchQ.length)+1) - 1; // Можно в случайном порядке
var repostUrl = "http://m.vk.com/feed?section=search&q="+listSearchQ[randomSearchQ];
//var repostUrl = "http://m.vk.com/feed?section=search&q="+listSearchQ[0];

// Массив с сообщениями к репосту
var mess = ["Хотите узнать гостей бесплатно? Почитайте отзывы - vk.com/vtop25",
            "Гостей узнать бесплатно нет желания? Почитайте отзывы - vk.com/vtop25",
            "Гость не догадается, что попался. Узнайте как сделать ссылку-ловушку бесплатно - vk.com/vtop25",
            "Бесплатно получите ссылку-ловушку и узнайте посетителей Вашей страницы. Отзывы - vk.com/vtop25",
            "Ваших гостей не увидит никто, кроме Вас. Отзывы - vk.com/vtop25"
           ];

var parsUrl = window.document.URL;
var nowUrl = parsUrl.match(/(feed\?|like\?)/gi);

if (nowUrl[0] == "feed?") {
    var nodeList = document.getElementsByTagName("a");
    var listWall = [];
    if (test == true) {
        var numzPlus = 0;
        var numz = 2;
    }
    else {
        var numzPlus = 0;
        var numz = 6;
    }
    for (var i = 0; i < nodeList.length; ++i) {
        if (nodeList[i].innerHTML == "Ответить") {
            numzPlus = numzPlus+1;
            (function(i) {
                var randomz = Math.floor((Math.random()*3)+1);
                setTimeout(function(){
                    listWall[i] = nodeList[i].href;
                    window.open(nodeList[i].href,"NewWin","width=700, height=200");
                }, numzPlus*((randomz*1000)+9000));
            })(i);
            
            if (numzPlus == numz) {
                if (numz != 1) {
            		setTimeout(function(){window.open(repostUrl,"_self")}, 120000);
                }
                break;
            }
        }
    }
}
else if (nowUrl[0] == "like?") {
        var checking = document.getElementsByClassName("ri_label");
        top:
        for (var i = 0; i < checking.length; ++i) {
            if (checking[i].innerHTML == repostTo) {
                checking[i].click();
                
                if (repostTo == "Друзья и подписчики") {
                    var clicking = document.getElementsByClassName("button");
                    for (var iii = 0; iii < clicking.length; ++iii) {
                        if (clicking[iii].value == "Поделиться") {
                            if (test == true) {
                                alert("В режиме тестирования, все работает отлично! Вы отправите запись себе на стену.");
                            }
                            else {
                                clicking[iii].click();
                            }
                            break top;
                        }
                    }
                }
                else {
                    var checkGroup = document.getElementsByClassName("ii_owner");
                    for (var ii = 0; ii < checkGroup.length; ++ii) {
                        if (checkGroup[ii].innerHTML == repostName) {
                            checkGroup[ii].click();
                            var clicking = document.getElementsByClassName("button");
                            for (var iii = 0; iii < clicking.length; ++iii) {
                                if (clicking[iii].value == "Поделиться") {
                                    var textarea = document.getElementsByClassName("textfield");
                                    for (var iiiii = 0; iiiii < textarea.length; ++iiiii) {
                                        if (textarea[iiiii].placeholder == "Введите Ваш комментарий..") {
                                            var ran = Math.floor((Math.random()*mess.length)+1) - 1;
                                            textarea[iiiii].value = mess[ran];
                                            break;
                                        }
                                    }
                                    if (test == true) {
                                        alert("В режиме тестирования, все работает отлично!");
                                    }
                                    else {
                                        document.getElementById('publish_add_form').setAttribute('target', '_blank')
										clicking[iii].click();
                                    }
                                    break top;
                                }
                            }
                        }
                    }
                }
            }
        }
}