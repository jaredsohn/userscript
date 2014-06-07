// ==UserScript==
// @name       Tucao Fixer - Beta!
// @namespace  FireAway-剑仙乘仙剑
// @version    0.3
// @description  
// @include      http://www.tucao.cc/play/h*
// @updateURL       http://userscripts.org/scripts/source/166475.meta.js
// @downloadURL     http://userscripts.org/scripts/source/166475.user.js
// @copyright  FireAway~
// @run-at document-start
// ==/UserScript==
function getInfo(){
    var whole = document.getElementsByTagName("body")[0];
    
    var int=self.setInterval(
        function(){
            if(!whole){
                whole = document.getElementsByTagName("body")[0];
                if(whole){
                    var x = whole.innerHTML.toString();
                    var vid1 = x.split("vid=")[1].split("|")[0];
                    
                    //var vid2 = x.split("vid=")[2].split("|")[0];
                    //alert(vid1);
                    
                    var a = /\/play\/h(\d+)(?:\/index_(\d+))?/.exec(location.pathname);
                    var b = a[1].toString();
                    var c = b.split("");
                    var d = c[0]+c[1]+"-"+c[2]+c[3]+c[4]+c[5]+"-1-0";
                    var e = "&cid="+d.toString();
                    var f = vid1
                    var g = "type=sina&vid="+f.toString()+e;
                    var path = g;
                    window.clearInterval(int);
                    replace(path);
                }
            }
        }
        ,1000);   
}
function replace(path) {
    //alert(path);
    var tucao = document.createElement("embed");
    
    tucao.width = 964;
    tucao.height = 452;
    tucao.src = "http://www.tucao.cc/player.swf";
    tucao.type = "application/x-shockwave-flash";
    tucao.setAttribute("quality", "high");
    tucao.setAttribute("allowfullscreen", "true");
    
    tucao.setAttribute("flashvars", path);
    
    tucao.setAttribute("allowscriptaccess", "always");
    tucao.setAttribute("allownetworking", "all");
    
    var player = document.getElementById("player");
    
    //var int=self.setInterval(
    //    function(){
    //        if(!player){
    //            player = document.getElementById("player");
     //           if(player){
     //               window.clearInterval(int);
    //            }
    //        }
            player.innerHTML = "";
   //     }
   //     ,1000);  
    player.appendChild(tucao);
};

window.onload = getInfo();

// SouGou metasr
// Chrome chrome safari
// Firefox firefox
// 360Chrome safari
// 360se safari
// Maxton maxthon chrome safari
// Safari safari