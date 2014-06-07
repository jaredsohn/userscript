// ==UserScript==
// @name        GwChangePic
// @namespace   gw
// @include     http://www.ganjawars.ru/me/*
// @include     http://www.ganjawars.ru/info.php?id=*
// @version     1
// @grant       none
// ==/UserScript==
(function(){


    var keyLS       = 'item_img_replace';
    var ls          = localStorage.getItem(keyLS) ? JSON.parse(localStorage.getItem(keyLS)) : {};

    var queryPath = document.URL.split('/')[3].split('.')[0] == 'info'
        ? 'body > div > table:nth-of-type(3) > tbody > tr:nth-of-type(4) img'
        : 'body > div > table:nth-of-type(2) > tbody > tr > td > table:nth-of-type(3)> tbody > tr > td > table img';

    var rows = document.querySelectorAll(queryPath);

    for(i = 0; i < rows.length; i++){

        fileNameIndex = rows[i].src.lastIndexOf("/") + 1;
        filename = rows[i].src.substr(fileNameIndex).split('.')[0];

        if(ls[filename]){
            rows[i].src = ls[filename];
            rows[i].setAttribute('data-original', filename);

        }

        rows[i].oncontextmenu = function(i){
            return function(){
                var newSrc = prompt('заменить картинку на \n (для возврата к стандартной 0)','');
                fileNameIndex = rows[i].src.lastIndexOf("/") + 1;
                filename = rows[i].src.substr(fileNameIndex).split('.')[0];
                if(newSrc){
                    if(newSrc == 0){
                        delete ls[this.getAttribute("data-original")];
                        localStorage.setItem(keyLS, JSON.stringify(ls));
                        this.src = 'http://images.ganjawars.ru/img/items/'+this.getAttribute("data-original")+'.jpg'
                    } else {
                        ls[filename] = newSrc;
                        localStorage.setItem(keyLS, JSON.stringify(ls));
                        this.src = ls[filename];
                    }
                }
                return false;
            }
        }(i);
    }
}())