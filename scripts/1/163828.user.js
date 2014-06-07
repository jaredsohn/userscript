// ==UserScript==
// @name       	System Empires - Resources Capacity
// @namespace  	http://extreme.sysemp.com/
// @version    	1.1
// @description Shows capacity needed to move all resources 
// @include		http://*sysemp.com/mainview.php*
// @copyright  	02/04/2013, Magnus Man, A4V
// @require		http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


/* CARGOS CAPACITY */
var cargoL			= 10000;
var cargoP 			= 100000;
var cargoB 			= 1000000;
var NC				= 20000;

/* CHANGE THIS TO YOUR CHARGE TEC LEVEL */
var chargeTecLevel	= 10;

/* CHANGE THIS FOR WHAT CHARGE CAPACITY YOU WANT */

function setInformations(capacity) {
    var selectedCargo 	= parseInt(capacity);
    
    var metal = parseInt($(".ecobmetal").children().eq(1).text().replace('.','').replace('.','').replace('.',''));
    var diamante = parseInt($(".ecobdiamond").children().eq(1).text().replace('.','').replace('.','').replace('.',''));
    var hidrogenio = parseInt($(".ecobhydrogen").children().eq(1).text().replace('.','').replace('.','').replace('.',''));
    var zion = parseInt($(".ecobzion").children().eq(1).text().replace('.','').replace('.','').replace('.',''));
    var nanite = parseInt($(".ecobnanite").children().eq(1).text().replace('.','').replace('.','').replace('.',''));
    
    var totalCharge		= parseInt(selectedCargo + (selectedCargo * (chargeTecLevel * 3) / 100));
    //alert(numberWithCommas(totalCharge) + " - " + metal + " - " + diamante + " - " + hidrogenio + " - " + zion + " - " + nanite);
    
    var totalResources	= parseInt(parseInt(metal) + parseInt(diamante) + parseInt(hidrogenio) + parseInt(zion) + parseInt(nanite));
    
    var totalCargosNeed = parseInt(totalResources * 1 / totalCharge);
    
    var innerHTML2 = "<span class='mainInfo' style='padding-left:5px;'>Precisas de <b>" 
    + numberWithCommas((totalCargosNeed < 1 ? 1 : totalCargosNeed)) 
    + "</b> " + $("#chargeType").find(":selected").text() + " para movimentar <b>" 
    + numberWithCommas(totalResources) + "</b> de recursos.</span>";
    
    return innerHTML2;
}

$(document).ready(function(){
    var innerHtml = "<tr><td class='vgcenterp' style='padding:5px;' colspan='5'><select id='chargeType'>"
    + "<option value='10000'>Cargueiro ligeiro</option>"
    + "<option value='100000'>Cargueiro Pesado</option>"
    + "<option value='1000000'>Cargueiro Blindado</option>"
    + "<option value='20000'>Nave de comércio</option>"
    + "</select></td></tr>";

    $(".vgcenterp").parent().before(innerHtml);
    

    $("#chargeType").after(setInformations($("#chargeType").find(":selected").val()));

    $("#chargeType").live("change",function(){
    	$(".mainInfo").remove();
    
        $("#chargeType").after(setInformations($("#chargeType").find(":selected").val()));
    });
    
});