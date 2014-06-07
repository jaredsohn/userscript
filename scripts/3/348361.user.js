// ==UserScript==
// @name        ANNO1777
// @namespace   anno_1777
// @description Anno1777 alert
// @include     http://www.anno1777.com/pages/*
// @version     1
// @grant       none
// ==/UserScript==
var timerID = setInterval(function(){
                var obj = document.getElementById('hours');
                if(document.contains(obj)){
                    if(obj.innerHTML == "-1" || obj.innerHTML == -1){
                        alert("It's over!!!");
                        clearInterval(timerID);
                    }
                }
            },3000);