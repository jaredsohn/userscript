// ==UserScript==
// @name          LeproPosts Killer
// @namespace     Vizzy
// @description   Убирает посты, содержащие определенный текст
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==

var allPosts = document.getElementsByClassName('dt'); //массив с постами
var killText = new Array('leprofm', 'lepro fm', 'лепрофм', 'лепро фм'); //keywords
var parentClass;
var postText;

for (i in allPosts) //проверяем все посты по очереди
    {
    postText = allPosts[i].innerHTML.toLowerCase();
    for (x in killText) //смотрим все нужные слова
        {
        if (postText.indexOf(killText[x]) != -1) //проверяем пост на нужность
            {
            parentClass = document.getElementsByClassName(allPosts[i].parentNode.className)[0]; //берем parent поста
            parentClass.parentNode.removeChild(parentClass); //удаляем пост
//            alert('post removed with keyword: ' + killText[x]);
            }
        }
    }
