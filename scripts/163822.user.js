// ==UserScript==
// @name       	System Empires - Resources
// @namespace  	http://extreme.sysemp.com/
// @version    	1.4
// @description Shows user productions . Daily, Weekly, Biweekly, Monthly
// @include http://*sysemp.com/empire.php?tab=6*
// @copyright  	02/04/2013, Magnus Man, A4V
// @require		http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function setData() {
    var metal = parseInt($("#vm0").text().replace('.','').replace('.','').replace('.',''));
    var diamante = parseInt($("#vm1").text().replace('.','').replace('.','').replace('.',''));
    var hidrogenio = parseInt($("#vm2").text().replace('.','').replace('.','').replace('.',''));
    var zion = parseInt($("#vm3").text().replace('.','').replace('.','').replace('.',''));
    var nanite = parseInt($("#vm4").text().replace('.','').replace('.','').replace('.',''));
    
    var innerHTML = '<tr style="height:15px;" class="toBeRemoved"><td colspan="100"></td></tr>';
    innerHTML += '<tr class="b670t toBeRemoved"><td colspan="100"></td></tr>';
    innerHTML += '<tr class="b670 center toBeRemoved" height="25" style="" id="e0">';
    innerHTML += '<td><img class="imgShowHide" style="cursor:pointer;" src="http://www.systemempires.com/skin/black/img/others/maximize.png"></td>';
    innerHTML += '<td colspan="3">Lista de produções</td>';
    innerHTML += '<td>Metal</td><td>Diamante</td><td>Hidrogénio</td><td>Zion</td><td>Nanite</td>';
    innerHTML += '</tr>';
    innerHTML += '<tr class="b670 center toBeRemoved toHideShow" height="25" style="display:none;" id="e0">';
    innerHTML += '<td>&nbsp;</td>';
    innerHTML += '<td colspan="3">Dia</td>';
    innerHTML += '<td>' + numberWithCommas(metal*24) + '</td><td>' + numberWithCommas(diamante*24) + '</td><td>' + numberWithCommas(hidrogenio*24) + '</td><td>' + numberWithCommas(zion*24) + '</td><td>' + numberWithCommas(nanite*24) + '</td>';
    innerHTML += '</tr>';
    innerHTML += '<tr class="b670 center toBeRemoved toHideShow" height="25" style="display:none;" id="e0">';
    innerHTML += '<td>&nbsp;</td>';
    innerHTML += '<td colspan="3">Semana</td>';
    innerHTML += '<td>' + numberWithCommas(metal*24*7) + '</td><td>' + numberWithCommas(diamante*24*7) + '</td><td>' + numberWithCommas(hidrogenio*24*7) + '</td><td>' + numberWithCommas(zion*24*7) + '</td><td>' + numberWithCommas(nanite*24*7) + '</td>';
    innerHTML += '</tr>';
    innerHTML += '<tr class="b670 center toBeRemoved toHideShow" height="25" style="display:none;" id="e0">';
    innerHTML += '<td>&nbsp;</td>';
    innerHTML += '<td colspan="3">Bi-Semana</td>';
    innerHTML += '<td>' + numberWithCommas(metal*24*14) + '</td><td>' + numberWithCommas(diamante*24*14) + '</td><td>' + numberWithCommas(hidrogenio*24*14) + '</td><td>' + numberWithCommas(zion*24*14) + '</td><td>' + numberWithCommas(nanite*24*14) + '</td>';
    innerHTML += '</tr>';
    innerHTML += '<tr class="b670 center toBeRemoved toHideShow" height="25" style="display:none;" id="e0">';
    innerHTML += '<td>&nbsp;</td>';
    innerHTML += '<td colspan="3">Mês</td>';
    innerHTML += '<td>' + numberWithCommas(metal*24*30) + '</td><td>' + numberWithCommas(diamante*24*30) + '</td><td>' + numberWithCommas(hidrogenio*24*30) + '</td><td>' + numberWithCommas(zion*24*30) + '</td><td>' + numberWithCommas(nanite*24*30) + '</td>';
    innerHTML += '</tr>';
    innerHTML += '<tr class="b670b toBeRemoved"><td colspan="100"></td></tr>';
    $(".b670b:last").after(innerHTML);    
}

$(document).ready(function(){
    setData();
    var expanded = false;
    $(".imgShowHide").live("click",function(){
        if($(this).attr("src") == "http://www.systemempires.com/skin/black/img/others/maximize.png") {
            $(".toHideShow").show();
            expanded = true;
        } else {
            $(".toHideShow").hide();
            expanded = false;
        }
        
        $(this).attr("src",($(this).attr("src") == "http://www.systemempires.com/skin/black/img/others/maximize.png" ? "http://www.systemempires.com/skin/black/img/others/minimize.png" : "http://www.systemempires.com/skin/black/img/others/maximize.png"));
        
        
    });
    $("input[type=checkbox]").click(function(){
        $(".toBeRemoved").remove();
        setData();
        if(expanded){
            $(".imgShowHide").click();
        }
    });
});