// ==UserScript==
// @name        Wamba Script Runner
// @description A Cash Runner Bot
// @namespace   http://www.tagged.com/apps/pets.html?ll=nav#cashruns*
// @include     http://www.tagged.com/apps/pets.html?ll=nav#cashruns*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     1.1
// ==/UserScript==
var sw1 = 1;
var botCheck = 0;
var playerCount = 15;
var sLevel = "Q";
var maxBuy = "45,000,000";
var dLimBuy = "45,000,000";

function currentMag() { // Valor actual de la mascota
    var valpet = $(".room_info span.value span.shorthand > span").html();
    var dtavalpet = valpet.replace("&nbsp;"," ").split(" ");
    var petvalue = remSpec(dtavalpet[1]);
    return petvalue;
}

function currentPetVal() { // Valor actual de la mascota
    var valpet = $(".room_info span.value span.shorthand > span").html();
    var dtavalpet = valpet.replace("&nbsp;"," ").split(" ");
    var petvalue = remSpec(dtavalpet[0]);
    return parseInt(petvalue);
}

function numWthCommas(x) { // Formatea con commas
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function currentPlayerCount() { // Devuelve Cantidad actual de jugadores
    return parseInt($("span.playerCount").html());
}

function remSpec(x) { // Remover Commas y Simbolos de Moneda
    return x.replace("$","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","");
}

function reducDec(x) { // Reducir 10%
    var y = (x - parseInt((x * 9.090909062520016)/100));
    return y;
}

function aumenDec(x) { // Aumentar 10%
    var y = (x + parseInt(x * 0.10));
    return y;
}

function constructForm() {
    if ($(".cashruns_play > div.col1 > h1").length == 1) {
        $(".cashruns_play > div.col1 > h1").css("font-size","12px");
        var inpt1 = "Players <input id='plCount' style='color: black' type='text' value='"+playerCount+"' maxlength='3' /><br />";
        var inpt2 = "Magnitud <input id='sLvl' style='color: black' type='text' value='"+sLevel+"' maxlength='1' /><br />";
        var inpt3 = "Max Buy <input id='mxBuy' style='color: black' type='text' value='"+maxBuy+"' maxlength='15' readonly /><input type='button' value='*' id='setCurrentVals' style='color: black;' /><input type='button' value='+' id='sumLim' style='color: black;'/><input type='button' value='-' id='resLim' style='color: black;'/><br /> D-Limit <input id='dimLimitBuy' style='color: black' type='text' value='"+dLimBuy+"' maxlength='15' style='width: 48px' style='color: silver; font-size: 10px' readonly />";
        if (botCheck == 1) {
            var col1module = $(".cashruns_play > div.col1 > h1").html();
            var checkcode = "<input id='chkbot' type='checkbox' checked='checked' /><br />";
            $(".cashruns_play > div.col1 > h1").html("Wamba Active: " + checkcode + inpt1 + inpt2 + inpt3 + col1module);
        } else {
            var col1module = $(".cashruns_play > div.col1 > h1").html();
            var checkcode = "<input id='chkbot' type='checkbox' /><br />";
            $(".cashruns_play > div.col1 > h1").html("Wamba Active: " + checkcode + inpt1 + inpt2 + inpt3 + col1module);
        }
        $("#plCount").blur(function() {
            playerCount = $("#plCount").val();
        });
        
        $("#sLvl").blur(function() {
            sLevel = $("#sLvl").val();
        });
        
        $("#mxBuy").blur(function() {
            maxBuy = $("#mxBuy").val();
        });
        
        $('#setCurrentVals').click(function(){
            $('#mxBuy').val(numWthCommas(currentPetVal()));
            $('#dimLimitBuy').val(numWthCommas(currentPetVal()));
            $("#plCount").val(currentPlayerCount() - 2);
            maxBuy = $('#mxBuy').val();
            dLimBuy = $('#dimLimitBuy').val();
            playerCount = $("#plCount").val();
        });
        
        $('#sumLim').click(function(){
            $('#mxBuy').val(numWthCommas(aumenDec(parseInt(remSpec($('#mxBuy').val())))));
            maxBuy = $('#mxBuy').val();
            dLimBuy = $('#dimLimitBuy').val();
            playerCount = $("#plCount").val();
        });
        
        $('#resLim').click(function(){
            $('#mxBuy').val(numWthCommas(reducDec(parseInt(remSpec($('#mxBuy').val())))));
            maxBuy = $('#mxBuy').val();
            dLimBuy = $('#dimLimitBuy').val();
            playerCount = $("#plCount").val();
        });
    }
}

setTimeout(function(){letsPlay()},100);

$(document).ready(function() {
    
});

function letsPlay(){
    if ($("#chkbot").length == 0) {
        constructForm();
    } else {
        if ($("#chkbot").is(":checked")) { procBuy(); } else { botCheck = 0; }
    }
    setTimeout(function(){letsPlay()},100);
}

function procBuy() {
    botCheck = 1;
    if ($(".id-cashrun-waiting").css("display") != "none") { return true; }
    if (parseInt($("span.playerCount").html()) < parseInt($("#plCount").val())) {
    
        if (sLevel == currentMag()) {
            
            var valPerPet = parseInt(remSpec($("#mxBuy").val())) / parseInt($("#plCount").val());
            var DymBuyLimit = reducDec(parseInt(valPerPet) * currentPlayerCount());
            
            $('#dimLimitBuy').val(numWthCommas(DymBuyLimit));
            
            if (parseInt(currentPetVal()) <= DymBuyLimit) {
               
                if ($("#cashrun_buy").hasClass("cashrun-green")){
    
                    if (sw1 == 1) {
                        $(".cashruns_play > div.col1 > h1").css("color","red");
                        sw1 = 0;
                    } else {
                        $(".cashruns_play > div.col1 > h1").css("color","green");
                        sw1 = 1;
                    }
                    
                    $("#cashrun_buy").trigger("click");
                
                }
                
            }
        }
    
    } else {
        var valpet = $(".room_info span.value span.shorthand > span").html();
        var dtavalpet = valpet.replace("&nbsp;"," ").split(" ");
        if (sLevel == dtavalpet[1]) {
        
            $('#dimLimitBuy').val($("#mxBuy").val());
            
            var petvalue = dtavalpet[0].replace("$","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","");
            if (parseInt(petvalue) <= parseInt($("#mxBuy").val().replace("$","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",",""))) {
               
                if ($("#cashrun_buy").hasClass("cashrun-green")){
    
                    if (sw1 == 1) {
                        $(".cashruns_play > div.col1 > h1").css("color","red");
                        sw1 = 0;
                    } else {
                        $(".cashruns_play > div.col1 > h1").css("color","green");
                        sw1 = 1;
                    }
                    
                    $("#cashrun_buy").trigger("click");
                
                }
                
            }
        }
    }
}
