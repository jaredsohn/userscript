// ==UserScript==
// @name       		Smart Filmes
// @version    		2.0
// @description  	Remove os ads, inicia o video e salva o ultimo EP visto.
// @copyright  		2013+, Wesley Nascimento
// @require   		http://code.jquery.com/jquery-1.9.1.min.js
// @updateURL    	http://userscripts.org/scripts/source/178036.meta.js
// ==/UserScript==

var url = location.href;
if( url.indexOf("adclient") > 0 || url.indexOf("ad-sys") > 0 || url.indexOf("google") > 0 || url.indexOf("facebook") > 0){
    return;
}

$(function () {
    "use strict";
    var Smart = {};	
    Smart.init = {
        init : function () {
            console.log("Iniciando...");
            var url = location.href;
            
            var seriepageindent = $(".assistir #itens");
            var videopageindent = $("#geral #centro iframe");
            var playerpageindent = $("#overlayPPU");
            
            if (videopageindent.length > 0 ) {
                Smart.videoPage.saveVideoUrl();
                Smart.videoPage.open();
            } else if (playerpageindent.length > 0) {
                Smart.playerPage.removeADS();
                Smart.playerPage.play();
            } else if(url.indexOf("filmesonlinegratis") > 0){
                Smart.seriePage.loadEps();
            }
                console.log("Nenhuma função realizada...");
        }
    };
    Smart.design = {
        draw : function () {
            $("head").append('<link rel="stylesheet" type="text/css" href="https://dl.dropboxusercontent.com/u/109527059/smartBot.css">');
            $("body").append("<section id='smartBot'></section>");
            var smart = $("section#smartBot");
            smart.append("<div id='smartBotTitle'><div class='smartTitle'>SmartBot</div></div>");
            smart.append('<div id="smartBotButtons" class="smartBotSection"></div>');	
            
            var bottons = $("#smartBotButtons");
            bottons.append('<div class="smartButton" id="showeps" title="Mostra episodios já assistidos.">Mostrar EPS</div>');
            
            $("#showeps").bind("click", function(){
                $(this).attr("class", "smartButton active");
                Smart.seriePage.loadEps();
            });
        }
    };
    
    Smart.seriePage = {
        loadEps : function(){            
            $("#filmes a").each(function(){
                var href = $(this).attr("href");
                var link = getData(href, false);
                
                if(link == true){
                    $("<span style='color: green;'> Ok</span>").insertAfter(this);
                    console.log("Adicionado");
                }
                
                $(this).bind('click', function(){						
                    var href = $(this).attr("href");
                    
                    var link = getData(href, false);
                    
                    if(!link){								
                        $("<span style='color: green;'> Ok</span>").insertAfter(this);
                        setData(href, true);
                    }
                });
            });
        }
    };
    
    Smart.videoPage = {
        open : function () {
            console.log("video page, open");
            if ($("#geral #centro iframe").length > 0) {
                location.href = $("#geral #centro iframe").attr("src");
            } else {
                console.log("Erro ao abrir player page.");
            }
        },
        saveVideoUrl : function () {
            console.log("video page, saveVideoUrl");
        }
    };
    
    Smart.playerPage = {
        removeADS : function () {
            console.log("player page, removeAds");
            for (var i = 0; i < 10; i++) {
                var ad = $("#ad" + i);
                if (ad.length > 0) {
                    ad.remove();
                }
            }
        },
        play : function () {
            console.log("player page, play");
            $("#overlayPPU").attr("style", "display: none;");
            location.href = "javascript:jwplayer().play();";
            
            setTimeout(function () {
                location.href = "javascript:jwplayer().play();";
            }, 1000);
        }
    };
    
    Smart.init.init();
});

function setData(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
}

function getData(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (!value)
        if (defaultValue == undefined){
            return '';
        } else {
            return defaultValue;
        }
    var type = value[0];
    value = value.substring(1);
    switch (type) {
        case 'b':
            return value == 'true';
        case 'n':
            return Number(value);
        default:
            return value;
    }
}

String.prototype.replace_all = function(encontrar, substituir){
    while(this.indexOf(encontrar)>=0)
        this = this.replace(encontrar, substituir);
}