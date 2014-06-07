// ==UserScript==
// @name     HWM Utils
// @version  0.1
// @author   Мяунчик
// @include  http://www.heroeswm.ru/*
// @exclude  http://www.heroeswm.ru/warlog.php*
// @exclude  http://www.heroeswm.ru/war.php*
// @exclude  http://www.heroeswm.ru/brd.php
// @exclude  http://www.heroeswm.ru/rightcol.php
// @exclude  http://www.heroeswm.ru/ch_box.php
// @exclude  http://www.heroeswm.ru/chatonline.php*
// @exclude  http://www.heroeswm.ru/chat_line.php*
// @exclude  http://www.heroeswm.ru/chatpost.php*
// @exclude  http://www.heroeswm.ru/chat.php*
// @exclude  http://www.heroeswm.ru/ticker.php*
// @exclude  http://www.heroeswm.ru/cgame.php*
// @exclude  http://www.heroeswm.ru/battlechat.php*
// @exclude  http://www.heroeswm.ru/
// ==/UserScript==

if (location.href.indexOf("object_do.php") > -1){
    if (checkWorkPage){
        var cur = new Date();
        cur.setHours(cur.getHours() + 1);
        GM_setValue("hwmWorkStart", cur);
    }
}

if (location.href.indexOf("map.php") > -1){
    var els = document.getElementsByTagName("a");
    
    if (els.length > 0){
        for (var i = 0; i < els.length; i++){
            if ((els[i].href.indexOf("map.php?action=attack") > -1) || (els[i].href.indexOf("map.php?action=skip") > -1)){
                els[i].addEventListener("click", setHuntTimer, false);
            }
        }
    }
}

if ((location.href.indexOf("home.php") > -1) || (location.href.indexOf("inventory.php") > -1) || (location.href.indexOf("pl_info.php") > -1) || (location.href.indexOf("auction.php") > -1)){
    drawDurability();
}

drawCounters();
setInterval(counterFunc, 30000);
counterFunc();

//==============================================================
GM_registerMenuCommand("Считать время охоты 100%", function(){
    GM_setValue("hwmHuntMod", 100);
    location.reload();
});
GM_registerMenuCommand("Считать время охоты 75%", function(){
    GM_setValue("hwmHuntMod", 75);
    location.reload();
});
GM_registerMenuCommand("Считать время охоты 50%", function(){
    GM_setValue("hwmHuntMod", 50);
    location.reload();
});
//==============================================================

function setHuntTimer(){
    var cur = new Date();
    var maxTime = (40 / 100) * GM_getValue("hwmHuntMod", 100);
    var curHour = cur.getHours();
    
    if (curHour >= 0 && curHour < 8) maxTime /= 2;
    
    cur.setMinutes(cur.getMinutes() + maxTime);
    
    GM_setValue("hwmHuntStart", cur);
    
    counterFunc();
}

function drawDurability(){
    var els = document.getElementsByTagName("img");
    
    if (els.length > 0){
        for (var i = 0; i < els.length; i++){
            if (els[i].width == 50){
                var dur = els[i].title.match(/: (\d+)\/(\d+)/);
                
                if (!dur) continue;
                
                var divDur = document.createElement("div");
                
                divDur.innerHTML = dur[1];
                divDur.style.fontSize = "9px";
                divDur.style.padding = "0px 1px";
                divDur.style.border = "1px solid #808080";
                divDur.style.margin = "1px";
                divDur.style.position = "absolute";
                
                if (dur[1] > (dur[2] / 2)){
                    divDur.style.background = "#88FF88";
                }else if (dur[1] > (dur[2] / 4)){
                    divDur.style.background = "#FFFF88";
                }else if (dur [1] == 0){
                    divDur.style.background = "#000000";
                    divDur.style.color = "FF0000";
                }else{
                    divDur.style.background = "#FF8888";
                }
                
                els[i].parentNode.insertBefore(divDur, els[i]) ;
            }
        }
    }
}

function checkWorkPage(){
    var els = document.getElementsByTagName("center");
    
    if (els.length > 0){
        for (var i = 0; i < els.length; i++){
            if (els[i].innerHtml == "Вы устроены на работу."){
                return true;
            }
        }
    }
    
    return false;
}

function drawCounters(){
    var imgGold = document.getElementsByTagName("img");
    
    if (imgGold.length > 0){
        for (var i = 0; i < imgGold.length; i++){
            if (imgGold[i].title == "Золото" && imgGold[i].width == 24 && imgGold[i].height == 24){
                var trNode = imgGold[i].parentNode.parentNode;
                var huntNode = document.createElement("td");
                var workNode = document.createElement("td");
                
                var huntImg = document.createElement("img");
                huntImg.src = "http://dcdn.heroeswm.ru/i/r4.gif";
                huntImg.title = "Расчет времени за " + GM_getValue("hwmHuntMod", 100) + "%";
                huntImg.style.cursor = "pointer";
                huntImg.addEventListener("click", setHuntTimer, false);
                huntNode.appendChild(huntImg);
                
                var huntSpan = document.createElement("span");
                huntSpan.id = "span_hunt";
                huntSpan.innerHTML = "00";
                huntSpan.title = "Расчет времени за " + GM_getValue("hwmHuntMod", 100) + "%";
                huntSpan.style.cursor = "pointer";
                huntSpan.addEventListener("click", setHuntTimer, false);
                huntNode.appendChild(huntSpan);
                
                huntNode.appendChild(document.createTextNode("\u00A0"));
                workNode.appendChild(document.createTextNode("\u00A0"));
                
                var workImg = document.createElement("img");
                workImg.src = "http://dcdn.heroeswm.ru/i/r8.gif";
                workNode.appendChild(workImg);
                
                var workSpan = document.createElement("span");
                workSpan.id = "span_work";
                workSpan.innerHTML = "00";
                workNode.appendChild(workSpan);
                
                trNode.insertBefore(huntNode, trNode.firstChild);
                trNode.appendChild(workNode);
                
                return;
            }
        }
    }
}

function counterFunc(){
    var workStart = GM_getValue("hwmWorkStart", null);
    var huntStart = GM_getValue("hwmHuntStart", null);
    var curTime = new Date();
    
    var workCounter = document.getElementById("span_work");
    var huntCounter = document.getElementById("span_hunt");
    
    if (workStart != null){
        var workDate = new Date(workStart);
        var workDiff = (workDate.getTime() - curTime.getTime());
        
        if (workDiff > 0){
            var workMinutes = Math.round(workDiff / 60000) + 1;
            
            workCounter.innerHTML = (workMinutes < 10) ? "0" + workMinutes : workMinutes;
        }else{
            GM_setValue("hwmWorkStart", null);
            
            GM_notification("Можно устроиться на работу!", "HWM: Нужна работа?", "http://www.heroeswm.ru/i/repair_common.gif", function(){
                location.href = "http://www.heroeswm.ru/map.php";
            });
            
            workCounter.innerHtml = "00";
        }
    }
    
    if (huntStart != null){
        var huntDate = new Date(huntStart);
        var huntDiff = (huntDate.getTime() - curTime.getTime());
        
        if (huntDiff > 0){
            var huntMinutes = Math.round(huntDiff / 60000) + 1;
            
            huntCounter.innerHTML = (huntMinutes < 10) ? "0" + huntMinutes : huntMinutes;
        }else{
            GM_setValue("hwmHuntStart", null);
            
            GM_notification("Пора на охоту!", "HWM: Охотиться будем?", "http://dcdn.heroeswm.ru/i/artifacts/hunter_roga1_s.jpg", function(){
                location.href = "http://www.heroeswm.ru/map.php";
            });
            
            huntCounter.innerHtml = "00";
        }
    }
}