// ==UserScript==
// @name        Ikariam Auto Piracy
// @namespace   ikariam
// @description Automatically click capture button, though you need to input verification code from time to time. Please note the beta versions are still not functioning!
// @include     http://*-*.ikariam.gameforge.com/index.php?*
// @version     beta 0.1
// @grant       none
// ==/UserScript==

/**
 * Auto Piracy
 */
//Mod Space:
//eg.class="IMModSpace0"
//0:addPirateFortressHandlers()

$(document).ready(function(){
    initVariableSpace();
    addAutoPiracyButton();
});
/*********************************************************
 *                         Front                         *
 *********************************************************/
function isAutoPiracyRunning(){
    return $("#btn_ap").css("background-color")==="green";
}
function addPirateFortressHandlers(){
    $("#js_mainBoxHeaderTitle").attr({
        "title":"Leave the Pirate Fortress",
        "onclick":"stopAutoPiracy();$(this).siblings().filter(\"div.close\").click();"
    });
    var tc=$("#js_tabCrew"), tbq=$("#js_tabBootyQuest"), sModSpace="IMModeSpace0";
    function onclickTc(){
        if(!tbq.hasClass(sModSpace)){
            addEventToTbq();
            tbq.addClass(sModSpace);
        }
        autoConvert();
    }
    function onclickTbq(){
        if(!tc.hasClass(sModSpace)){
            addEventToTc();
            tc.addClass(sModSpace);
        }
    }
    function addEventToTc(){
        tc.click(function(){
            setTimeout("onclickTc()",3000);
        });
    }
    function addEventToTbq(){
        tbq.click(function(){
            setTimeout("onclickTbq()",3000);
        });
    }
    addEventToTbq();
}
function toggleAutoPiracy(){
    if(isAutoPiracyRunning()){stopAutoPiracy();}
    else{startAutoPiracy();}
}
function stopAutoPiracy(){
    $("#btn_ap").css("background-color","red");
}
function startAutoPiracy(){
    $("#btn_ap").css("background-color","green");
    var mainBoxHeaderTitle=$("#js_mainBoxHeaderTitle");
    if(mainBoxHeaderTitle.size()===0){
        $("#js_CityPosition17Link").click();
        addPirateFortressHandlers();
        setTimeout("tryAutoPiracy()",5000);
    }else{
        tryAutoPiracy();
    }
}
function tryAutoPiracy(){
    if($("#js_mainBoxHeaderTitle").text()==="Pirate Fortress"){
        if($("#captcha").size()!==0){
            alert("You need to input captcha code!");
            $("#captcha").parent().siblings().filter("div.centerButton").children("input.button").click(function(){
                setTimeout("tryAutoPiracy()",1000);
            });
            stopAutoPiracy();
        }else if(isAutoPiracyRunning()){
            var btn_capture=$("a.button").not("button_disabled");
            if(btn_capture.size()===1){
                btn_capture.click();
                setTimeout("tryAutoPiracy()",150000);
            }else{
                setTimeout("tryAutoPiracy()",500);
            }
        }
    }else{
        stopAutoPiracy();
    }
}
function autoConvert(){
    if($("#js_tabCrew").hasClass("selected")){
        if($("#ongoingConversion").size()!==0){
            var aTime=$("#conversionProgressTime").text().match(/\d+/g);/*.replace("s","").split("m ");*/
            var iTime=(parseInt(aTime[0])*60+parseInt(aTime[1]))*1000;
            setTimeout("autoConvert()",iTime());
        }else{
            var cp=parseInt($("#pirateFortress>div.bd.mainContentScroll>div.mainContent.minimizableContent>div.pirateHeader>ul.resources>li.capturePoints>span.value").text().replace(",",""))-7000;
            if(cp>1150){
                var iCp=cp/10;
                function tryConvert(){
                    if($("#CPToCrewSubmit").hasClass("button_disabled")){
                        $("#CPToCrewInput").val(iCp).click();
                        setTimeout("tryConvert()",500);
                    }else{
                        $("#CPToCrewSubmit").click();
                        //setTimeout("autoConvert()",iCp*7000+156000);
                    }
                }
                tryConvert();
            }
        }
    }else{
        $("#js_tabCrew").click();
        setTimeout("autoConvert()",1000);
    }
}
/********************************************************
 *                         Back                         *
 ********************************************************/
function initVariableSpace(){
    registerScriptsWithFunctions(
        isAutoPiracyRunning,
        addPirateFortressHandlers,
        toggleAutoPiracy,
        stopAutoPiracy,
        startAutoPiracy,
        tryAutoPiracy,
        autoConvert,
    );
    registerCssWithContent(
        "#btn_ap{width:300px; height:15px; border:black solid thin; background-color:red; color:white; cursor:pointer; text-align:center; }"
    );
    initLockPrototype();
    return true;
}
function addAutoPiracyButton(){
    var btnAP="<div id='btn_ap' title='Auto Piracy Status' onclick='toggleAutoPiracy();'>Ikariam Manager - Auto Piracy</div>";
    $("#breadcrumbs").append(btnAP);
    return true;
}
function registerScriptsWithFunctions(functions){
    var result="";
    for(var i=0;i<arguments.length;i++){result+=arguments[i].toString();result+="\n";}
    var node=document.createElement("script");
    node.appendChild(document.createTextNode(result));
    document.getElementsByTagName("head")[0].appendChild(node);
    $(node).attr("class","im");
    return node;
}
function registerCssWithContent(css_content){
    $("head").append("<style type='text/css' class='im'>"+css_content+"</style>");
    return true;
}
/********************************************************
 *                         Test                         *
 ********************************************************/
/*
//strict backup
function locateButton(target_name){
    if(target_name==undefined||target_name==""){
        target_name="Smugglers";
    }
    $("#pirateCaptureBox tr").each(function(){
        if($(this).children("td").filter(function(){return $(this).attr("class")===undefined;}).text()===target_name){
            return $(this).siblings().filter("td.action").find("a.button");
        }
    });
}
function Lock(){
}
function initLockPrototype(){
    Lock.prototype.tryLock=function(time){
        var iLen=arguments.length;
        var bResult;
        if(iLen==1){
            setTimeout("__tryLockInn__(this)",time);
        }else if(iLen==0){
            __tryLockInn__(this);
        }
        function __tryLockInn__(lock){
            if(lock.__isLock__){
                bResult=false;
            }else{
                lock.__isLock__=true;
                bResult=true;
            }
        }
    };
    Lock.prototype.users=new Array();
    Lock.prototype.__isLock__=false;
    Lock.prototype.nUsers=0;
    Lock.prototype.__addLockUser__=function(user){
        this.users[this.nUsers++]=user;
    };
    Lock.prototype.unlock=function(){
        this.__isLock__=false;
    };
}
//*/