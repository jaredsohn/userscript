// ==UserScript==
// @name       	System Empires Reload
// @namespace  	http://reload.sysemp.com/
// @version    	1.6
// @description Múltiplos detalhes extra
// @include		http://reload.sysemp.com/*
// @copyright  	17/09/2013, Magnus Man 
// ==/UserScript==



var showExtraToolTips = true; // true = mostra | false = esconde tooltips extra
var showExtraProductionInToolTip = true;  // true = mostra | false = esconde extra produzido
var showFinishTime = true;  // true = mostra | false = esconde tempo de finalização
var showTimeNeeded = true;
var showTripFinishTime = true;
// Funções
// Calcular o tempo de finalização de unidades
// Formato a passar: -d --h --m --s
function formatNumber(number) {
    return number.replace('.','').replace(',','.');   
}

// Validar recursos
function validateResource(resourceNumber) {
    if(resourceNumber == undefined 
       || resourceNumber == null 
       || isNaN(resourceNumber) 
       || resourceNumber < 0 
       || resourceNumber == "null" 
       || resourceNumber == "undefined") {
        return 0;
    } else {
        return resourceNumber;   
    }
}
// Obter o tipo de CountDown
function getCountDownTime(time) {
    if(time.indexOf("s") > -1) {
        return 0; // formated time
    } else if(time.indexOf(":") > -1) {
        return 1; // normal time
    } else if(time.indexOf("-") > -1) {
        return 2; // ended
    } else {
        return 1;   
    }
}

// Calcular a data de finalização
function getFinishTime(time, type) {
    if (type == 0) {
        var array1 = time.split(" ");
        if (array1.length == 4) {
            array1[0] = array1[0].replace("d", "");
            array1[1] = array1[1].replace("h", "");
            array1[2] = array1[2].replace("m", "");
            array1[3] = array1[3].replace("s", "");
            
            var d1 = new Date(),
                d2 = new Date(d1);
            d2.setDate(d1.getDate() + parseInt(array1[0]));
            d2.setHours(d1.getHours() + parseInt(array1[1]));
            d2.setMinutes(d1.getMinutes() + parseInt(array1[2]));
            d2.setSeconds(d1.getSeconds() + parseInt(array1[3]));
            
            return formateDate(d2);
            
        } else if (array1.length == 3) {
            
            array1[0] = array1[0].replace("h", "");
            array1[1] = array1[1].replace("m", "");
            array1[2] = array1[2].replace("s", "");
            
            var d1 = new Date(),
                d2 = new Date(d1);
            d2.setHours(d1.getHours() + parseInt(array1[0]));
            d2.setMinutes(d1.getMinutes() + parseInt(array1[1]));
            d2.setSeconds(d1.getSeconds() + parseInt(array1[2]));
            
            return formateDate(d2);
            
        } else if (array1.length == 2) {
            
            array1[0] = array1[0].replace("m", "");
            array1[1] = array1[1].replace("s", "");
            
            var d1 = new Date(),
                d2 = new Date(d1);
            
            d2.setMinutes(d1.getMinutes() + parseInt(array1[0]));
            d2.setSeconds(d1.getSeconds() + parseInt(array1[1]));
            
            return formateDate(d2);
            
        } else if (array1.length == 1) {
            
            array1[0] = array1[0].replace("s", "");
            
            var d1 = new Date(),
                d2 = new Date(d1);
            
            d2.setSeconds(d1.getSeconds() + parseInt(array1[0]));
            
            return formateDate(d2);
            
        }
            } else if (type == 1) {
                var array1 = time.split(":");
                if (array1.length == 4) {
                    var d1 = new Date(),
                        d2 = new Date(d1);
                    d2.setDate(d1.getDate() + parseInt(array1[0]));
                    d2.setHours(d1.getHours() + parseInt(array1[1]));
                    d2.setMinutes(d1.getMinutes() + parseInt(array1[2]));
                    d2.setSeconds(d1.getSeconds() + parseInt(array1[3]));
                    
                    return formateDate(d2);
                    
                } else if (array1.length == 3) {
                    var d1 = new Date(),
                        d2 = new Date(d1);
                    d2.setHours(d1.getHours() + parseInt(array1[0]));
                    d2.setMinutes(d1.getMinutes() + parseInt(array1[1]));
                    d2.setSeconds(d1.getSeconds() + parseInt(array1[2]));
                    
                    return formateDate(d2);
                    
                } else if (array1.length == 2) {
                    var d1 = new Date(),
                        d2 = new Date(d1);
                    
                    d2.setMinutes(d1.getMinutes() + parseInt(array1[0]));
                    d2.setSeconds(d1.getSeconds() + parseInt(array1[1]));
                    
                    return formateDate(d2);
                    
                } else if (array1.length == 1) {
                    var d1 = new Date(),
                        d2 = new Date(d1);
                    
                    d2.setSeconds(d1.getSeconds() + parseInt(array1[0]));
                    
                    return formateDate(d2);
                    
                }
                    
                    } else if (type == 2) {
                        return;
                        
                    }
                }

// Formatar o tempo Final
function formateDate(date) { 
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var curr_hour = date.getHours();
    var curr_min = date.getMinutes();
    var curr_sec = date.getSeconds();
    return NumberUtils.atLeastTwo(curr_hour) + ":" + NumberUtils.atLeastTwo(curr_min) + ":" + NumberUtils.atLeastTwo(curr_sec) + " " + NumberUtils.atLeastTwo(curr_date) + "/" + NumberUtils.atLeastTwo(curr_month);
}


// Calcular os pontos a partir da economia
function calcPoints(metal, diamond, hydrogen, zion) {
    var racioMetal 		= 1;
    var racioDiamond 	= 2;
    var racioHydrogen 	= 3;	
    var racioZion 		= 50;
    var metal = validateResource(metal);
    var diamond = validateResource(diamond);
    var hydrogen = validateResource(hydrogen);
    var zion = validateResource(zion);
    
    return ((metal*racioMetal)+(diamond*racioDiamond)+(hydrogen*racioHydrogen)+(zion*racioZion));
}	
function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;
    
    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }
    
    return s;
}

var showExtraToolTips = true;
var showExtraProductionInToolTip = true;
var showFinishTime = true;
function secondstotime(secs)
{
    var t = new Date(1970,0,1);
    t.setSeconds(secs);
    var s = t.toTimeString().substr(0,8);
    if(secs > 86399)
        s = Math.floor((t - Date.parse("1/1/70")) / 3600000) + s.substr(2);
    return s;
}

$(document).ready(function() { 
    var arrayResources = new Array("Metal","Diamond","Hydrogen","Zion"); 
    if(showFinishTime) {
        $(".countdown").each(function() { 
            if($(this).parent().parent().parent().attr("id") != "missionShortList") {
                $(this).after(" - <b style='color:#1479ad;'>" + getFinishTime($(this).text(),getCountDownTime($(this).text())) + "<b/>");   
                $(".time").css("right","40px");
                $(".unityTime").css("right","40px");
            } else if($(this).parent().parent().parent().attr("id") == "missionShortList") {
                setTimeout(function() {
                    $("#missionShortList").children().children().children().attr("style","right:0p"); 
                },1); 
                $(this).parent().attr("title", getFinishTime($(this).text(),getCountDownTime($(this).text())));
                
            }
                });
    }
    if(showExtraToolTips) {
        var arrayIds = new Array("#profileAlianceName", ".ctlListCancel", "#msgWarReposts", "#msgGeneric", "#msgSpyReposts", "#logout", ".CLPos1",".CLPos2",".CLPos3",".CLPos4");
        var arrayMessages = new Array("Página da aliança", "Remover da lista", "Relatórios de Ataque","Mensagens","Relatórios de Espionagem", "Sair","Lista de construção de Edifícios","Lista de construção de Tecnologias","Lista de construção de Hangar","Lista de construção de Armamento");
        
        for(var setMessage in arrayIds) {
            $(arrayIds[setMessage]).attr("title", arrayMessages[setMessage]);
        }
    }
    if(showExtraProductionInToolTip) {
        
        var tempMetal = $("#ttResMetal").find("span").eq(1).text();
        var tempDiamond = $("#ttResDiamond").find("span").eq(1).text();
        var tempHydrogen = $("#ttResHydrogen").find("span").eq(1).text();
        var tempZion = $("#ttResZion").find("span").eq(1).text();
        var arrayTempValues = new Array(tempMetal,tempDiamond,tempHydrogen,tempZion);
        setInterval(function() {
            for(var resource in arrayResources) {
                $("#res" + arrayResources[resource] + "Value").html(NumberUtils.convertToAbrv($("#ajax" + arrayResources[resource]).val()));
                $("#ttRes" + arrayResources[resource]).find("span").eq(1).html(arrayTempValues[resource] + " (+" + NumberUtils.convertToAbrv(parseInt($("#ajax" + arrayResources[resource]).val()-formatNumber(arrayTempValues[resource])))+")");  
            }
        },1000);
    } 
    if(showTimeNeeded) {
        $(".tipTime").each(function(index) {
            var HTML = '<li style="margin-top:10px;">Data Conclusão<br>';
            HTML += '<span class="time setTipTime'+ index +'" style="background: url(http://www.sysemp.com/jse_files/_img/tooltipTimeIcon.png) left center no-repeat; display: inline-block; margin-top: 3px; padding-left:23px;"></span>';
            HTML += '</li>';
            $(this).parent().after(HTML);
        });
        
        
        //console.log("Número de filhos: " + $(this).children().length + " - Tempo máximo de espera " + $(this).parent().text().substring($(this).parent().text().indexOf('Max espera:'),$(this).parent().text().length).replace(/\s+/g, " "));
        $(".tipResource").each(function(index) {
            if($(this).parent().text().indexOf("Recursos Insuficientes") > -1) {
                if($(this).children().length > 1) {   
                    var HTML = '<li style="margin-top:10px; color: rgb(34, 114, 138);" >Recursos Insuficientes até<br>';
                    HTML += '<span class="time setResourcesLeft'+ index +'" style="background: url(http://www.sysemp.com/jse_files/_img/tooltipTimeIcon.png) left center no-repeat; display: inline-block; margin-top: 3px; padding-left:23px; color: rgb(19, 120, 172);"></span>';
                    HTML += '</li>';
                    $(this).parent().after(HTML);
                } else {
                    var HTML = '<li style="margin-top:10px; color: rgb(34, 114, 138);" >Recursos Insuficientes até<br>';
                    HTML += '<span class="time setResourcesOneUnitLeft'+ index +'" style="background: url(http://www.sysemp.com/jse_files/_img/tooltipTimeIcon.png) left center no-repeat; display: inline-block; margin-top: 3px; padding-left:23px; color: rgb(19, 120, 172);"></span>';
                    HTML += '</li>';
                    $(this).parent().after(HTML);
                }
            }
        });
        $(".tipResource").each(function(index) {
            if($(this).parent().text().indexOf("Recursos Insuficientes") > -1) {
                if($(this).children().length > 1) {   
                    var timeText = $(this).parent().text().substring($(this).parent().text().indexOf('Max espera:')+12,$(this).parent().text().length).replace(/\s+/g, " ");
                    $(".setResourcesLeft"+index).html(getFinishTime(timeText.substring(0,timeText.length-1),getCountDownTime(timeText.substring(0,timeText.length-1))));
                } else {
                    var timeText = $(this).children().text();
                    $(".setResourcesOneUnitLeft"+index).html(getFinishTime(timeText,getCountDownTime(timeText)));
                    
                }
            }                                     
        });
        setInterval(function() {
            $(".tipTime").each(function(index) {
                $('.setTipTime'+ index).html(getFinishTime($(this).text(),0));
            });
        },1000);
    }
    
    if(showTripFinishTime) {
        var HTML = '<li style="margin-top:10px;">Data Chegada: ';
        HTML += '<span class="time finishTripTime" style="display: inline-block; margin-top: 3px;"></span>';
        HTML += '</li>';
        if($(".genericCenterWrapper").text().indexOf("Transferir") == "-1") {
            HTML += '<li style="margin-top:10px;margin-bottom:10px;">Data Regresso: ';
            HTML += '<span class="time finishTripTime2" style="display: inline-block; margin-top: 3px;"></span>';
            HTML += '</li>';
        }
        $("#tripTime").parent().after(HTML);
        
        var hms = $("#tripTime").text().replace('h ',':').replace('m ',':').replace('s','');   // your input string
        var times = hms.split(":");
        var hours = times[0];
        var minutes = times[1];
        var seconds = times[2];
        seconds = hmsToSecondsOnly(hms);
        $(".finishTripTime").html(getFinishTime($("#tripTime").text(),getCountDownTime($("#tripTime").text())));
        if($(".genericCenterWrapper").text().indexOf("Transferir") == "-1") {
            $(".finishTripTime2").html(getFinishTime(secondstotime(seconds * 2),1));
        }
        setInterval(function() {
            
            var hms = $("#tripTime").text().replace('h ',':').replace('m ',':').replace('s','');   // your input string
            var times = hms.split(":");
            var hours = times[0];
            var minutes = times[1];
            var seconds = times[2];
            seconds = hmsToSecondsOnly(hms);
            $(".finishTripTime").html(getFinishTime($("#tripTime").text(),getCountDownTime($("#tripTime").text())));
            if($(".genericCenterWrapper").text().indexOf("Transferir") == "-1") {
                $(".finishTripTime2").html(getFinishTime(secondstotime(seconds * 2),1));
            }
        },1000);
    }
});