// ==UserScript==
// @name           Random
// @namespace      http://*0chan.ru/*
// @description    Random text in message field.
// @include        http://*0chan.ru/*

function genbred() {
    var intro = ["ололо,","внезапно,","ITT","in b4,","невозбранно","алсо","быстро, решительно","былинно","эпично","в этом ITT","лол,"];
    var verb = ["бампаю","сагаю","нульчую","набигаем на","фапаю на","гарантирую","доставляю","запили мне"];
    var noun = ["капчу","бамп","гет","сажу","нульч","лолей","тян","пикрелейтед","пруфпик","хуйцы","быдло","корованы",
    "хитрый план","копипасту","пинус","рейд","вин","фейл","тред","школоту"];
    var outro = [" овер 9000"," во все поля",", инфа 100%"," - доставило"," - хуита",", годно",", например",", анон"," блджад",", а твоя мать - шлюха"," - баттхёрт",", ну ты понел",", охуенно же"];
    var mark = [".", ".", ".", ".", ".", "!", "!!!", "..."];
    var s = rndw(intro,true)+" "+rndw(verb)+" "+rndw(noun)+rndw(outro,true)+rndw(mark)+" ";
    s = s.replace(/^\s+/, '');
    s = s.charAt(0).toUpperCase() + s.substr(1);
    return s;
    }

function rndw(array, roll) {
    if (roll && (Math.random() < 0.5))
    return "";
    return array[Math.floor(array.length*Math.random())];
    }

function msg() {
document.getElementsByName('message')[0].value+=genbred();
}

field=document.getElementsByTagName('td');
for(var i=0;i<field.length;i++)
if(field[i].innerHTML.match('Текст')) var parent=field[i];
var btn = document.createElement('label');
parent.appendChild(btn);
btn.addEventListener('click', msg, true);
btn.innerHTML='[<a>R</a>]';

// ==/UserScript==