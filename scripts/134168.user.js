// ==UserScript==
// @name           It's Console
// @namespace      http://danjeppsson.se/proj_01
// @author         Dan Jeppsson, Eva Candia, Kenny Okoro, Miklas Njor
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version        1.0
// @include         http*://*.itslearning.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// @history        1.0 first version
//
// ==/UserScript==

var title_name = $('#ctl05_TT').text();

// Om titeln på sidan aer Bedoemningsoeversikt, koer detta
if ((title_name == "Bedömningsöversikt") || (title_name == "Assessment record")){
    
    // PLACES THE STYLESHEET FOR WRAPPERS AND BOXES  
    $('.containerbox4').prepend('<style> #ia6_nav_wrapper{background:linear-gradient(bottom,#e6e6e6 22%,#f5f5f5 78%);margin:0 0 1em 0;padding:0em;text-transform:uppercase;font-family:Tahoma,Geneva,sans-serif;border:1px solid #999;border-radius:8px;-moz-border-radius:8px;-webkit-border-radius:8px;-moz-box-shadow:2px 2px 3px #bbb;-webkit-box-shadow:2px 2px 3px #bbb;box-shadow:2px 2px 3px #bbb}   #ia6_nav_wrapper,#ia6_uppg,#ia6_export,#ia6_export #flyttlink{overflow:hidden}   #ia6_nav_wrapper h3.filters{margin:.35em 1em .4em 0;color:#222;text-shadow:0 1px 1px #fff}   .ia6_box{margin:.5em;padding:0 1em 0 0}   .ia6_boxleft{border-right:1px solid #999;float:left}   .classG,#ia6_export #flyttlink{background:#b9e9a9}   .classUD{background:#fffbc1}   .classU{background:#fedede}   input[type="checkbox"]{display:none}   #ia6_fltr_list li{background:none}   #ia6_export #flytta{padding:0;border:1px solid #ddd}   #ia6_export #flyttlink,#ia6_fltr_list .buttn_on{border-style:solid;border-width:1px;border-color:#bbb}   #ia6_export #flyttlink{padding:.2em .6em;margin:0;display:block;text-decoration:none;color:#333}   #ia6_fltr_list .buttn_on{border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px}   #ia6_fltr_list .ia6_nav_name{background:#4d4d4d}   #ia6_fltr_list .ia6_nav_name,#ia6_fltr_list li:hover,#ia6_export #flyttlink:hover{color:#fff}   #ia6_fltr_list li:hover,#ia6_export #flyttlink:hover{background:#ccc}    </style>');
    
    // PLACES THE NAVIGATION wrapper inside the toolbar 
    $('.toolbar').prepend('<div id="ia6_nav_wrapper"><div id="ia6_export" class="ia6_box ia6_boxleft"><h3 class="filters">Export</h3> <div id="flytta"><a id="flyttlink" class="all_buttons" href="#">Export CSV</a></div></div><div id="ia6_uppg" class="ia6_box"><h3 class="filters">Filtrering av Uppgifter</h3><ul id="ia6_fltr_list" class="ia6_nav_list"></ul></div></div> ');
    
    // HITTAR KOLUMNERNA: "GODKAEND", "INTE GODKAEND" OCH "GENOMSNITT" NAER SIDAN LADDAS
    var colIndex = $('table').find('th:contains("Godkänd"),th:contains("Inte godkänd"),th:contains("Genomsnitt"),th:contains("Average")');
   
    // Funktion som tar bort kolumner skickade header-straengar
    // HIDES from the begining the boxes we don't want
        function colRemove(rVal) {
        $.each(rVal, function() {
            var num = $(this).index() + 1;
            $('table').find('tr td:nth-child('+num+'), tr th:nth-child('+num+')', this).remove();
        })
    }

    // Koer colRemove naer sidan laddas
    colRemove(colIndex);
    
    // Funktion som doeljer kolumner skickade header-straengar
    function colHide(hVal) {
        $.each(hVal, function() {
            var num = $(this).index() + 1;
            $('table').find('tr td:nth-child('+num+'), tr th:nth-child('+num+')', this).toggle();
        })
    }

    // Vaerden foer CSS beroende på uppgiftsstatus
    var cellGt0 = $('table').find("tr td:not(:nth-child(1))");
    cellGt0.filter(":contains('G'), :contains('Klar')").addClass('classG');
    cellGt0.filter(":contains('Rättning pågår')").addClass('classUD');
    cellGt0.filter(":contains('Inte godkänd'),:contains('Inte rättad'), :contains('U')").addClass('classU'); 

    // Kollar vaerdet av alla kolumner utom "Namn" AND MAKES A LIST IN THE TOOLBOXBAR
    $('table').find('th:gt(0)').each(function(count){
        var upgGenText = $(this).text();
        $('#ia6_fltr_list').append('<li class="ia6_nav_name buttn_on" ><label><input type="checkbox"  name="chbxUpg" value="1" id="alertButton + '+count+'" />'+upgGenText+'</label></li>');
    });
    
    // Checkbox-funktion. Koer funktionen naer naagot av aendras paa resp. checkbox.
    $('input[name="chbxUpg"]').click(function(){
        //texten av checkbox-elementet.
        var asd = $(this).parent().text();
        colHide($('table').find('th:contains('+asd+')'));
    });
    
    // Open new window with tablelisting	
    function moveClick() {
        var w = window.open();
        var clone = $('.tablelisting').clone(true);
        var html = clone.each(function() {
            $(this).find('a').removeAttr('href');
            $(this).find('img').remove();
            $(this).find('table,th,td').css('border', '1px solid black');
        });
        $(w.document.body).html(html);
    }
    
    
    $(function() {
        $("a#flyttlink").click(moveClick);
    });
   
}