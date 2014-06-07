// ==UserScript==
// @name        カタソでルールを表示するMOD
// @namespace   http://userscripts.org/users/ptsglock
// @description カタソでルールを表示するMOD
// @include     http://tkmax.github.io/tkmonline/cataso/*
// @version     1
// @grant       none
// ==/UserScript==

//インターフェイスの作成
    var sta = 0;
    img =document.createElement("img"); //表示データ
    img.src="http://www.part-time-soldiers.net/img/kataso3.jpg";

    div = document.createElement("div");
    div.id = "help";
    div.style="    position: absolute;top: 670px;left: 10px;"
br = document.createElement("br");

    formButton = document.createElement("input"); //button用
    formButton.type = "button";
    formButton.id = "ASbutton";
    formButton.value = "カタソのヘルプを切り替える";
    formButton.addEventListener("click", change_img, false);
    
    document.body.insertBefore(div, document.getElementById("footer").nextsibling);
    document.getElementById("help").insertBefore(img, document.getElementById("help").firstChild);
    document.getElementById("help").insertBefore(br, document.getElementById("help").firstChild);
    document.getElementById("help").insertBefore(formButton, document.getElementById("help").firstChild);
    var delNode = document.getElementById('footer');
    delNode.parentNode.removeChild(delNode);  
    div.id = "footer";
function change_img(){
    sta = sta + 1;
    if (sta > 3){
            sta = 0;
    }
    if (sta == 1){
            img.src="http://www.part-time-soldiers.net/img/kataso.jpg";

    }else if(sta == 2){
            img.src="http://www.part-time-soldiers.net/img/kataso2.jpg";

    }else if(sta == 3){
            img.src="http://www.part-time-soldiers.net/img/kataso4.jpg";

    }else if(sta == 0){
            img.src="http://www.part-time-soldiers.net/img/kataso3.jpg";

    }
    document.getElementById("help").appendChild(img);

    };
