// ==UserScript==
// @name          Facebook Album CSV exporter - Caption;Download_link
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include       https://www.facebook.com/media/set/*
// @include       https://www.facebook.com/*/photos_stream*
// @include       https://www.facebook.com/*/media_set*
// ==/UserScript==

css = 
"a.export, a.export:visited, a.export3, a.export3:visited, a.export2, a.export2:visited, a.export4, a.export4:visited { color:#000; background-color:#ddd; border: 1px solid #ccc; padding:8px; }" +
"#result { display : none; }" +
".myform { position : absolute; top: 20px; left : 20px; z-index : 100; -moz-transform: scale(3); } " +
".myeditbox { position : absolute; top: 20px; left : 100px; z-index : 100; -moz-transform: scale(2); } " +
"#csv { margin : 10px; background-color: white; -moz-border-radius: 5px; -moz-box-shadow: 0 0 5px 5px black; position: fixed; top: 0; left: 5%; z-index: 9999999; }";

function addcheckboxes() {
    $("input.myeditbox").remove();
    $("input.myform").remove();
    $("#selecao").text("0");
    $("div#fbTimelinePhotosContent a.uiMediaThumb").each(function( index ) {
        $(this).css("border", "3px solid red").parent().prepend("<input class='myform' type='checkbox'><input size ='5' type='text' class='myeditbox'>");
    });
    
     $(".myform").click( function() {
        if($(this).is(":checked")) {
            $(this).next().focus();
        }
        else {
            $(this).next().val("");
        }
    });

    $(".myeditbox").click( function() {
        if(!$(this).prev().is(":checked")) {
            $(this).prev().click();
        }
    });

    $('.myform').change(function() {
        if($(this).is(":checked")) {
            $(this).next().next().css("border", "5px solid green");
            $("#selecao").text(parseInt($("#selecao").text())+1);
        }
        else {
            $(this).next().next().css("border", "3px solid red");
            $("#selecao").text(parseInt($("#selecao").text())-1);
        }
        
    });
}


$(document).ready(function () {
    GM_addStyle(css);
    $('<div id="csv"><p id="texto">Csv Exporter v1.3</p><p>Selecionados:<span id="selecao">0</span></p><a href="#" class="export">Get photos</a><a href="#" class="export2">Hide</a><a href="#" class="export3">Refresh</a><a href="#" class="export4">Select All</a><textarea id="result" rows="30" cols="200"></textarea></div>')
        .appendTo('body');
    
    addcheckboxes();

    $(".export4").on('click', function (event) {
        $("#selecao").text("0");
        $('.myform').each(function() { 
            $(this).next().next().css("border", "5px solid green");
            $("#selecao").text(parseInt($("#selecao").text())+1);
            this.checked = true;  //select all checkboxes with class "checkbox1"              
        });
    });
    $(".export3").on('click', function (event) {
        addcheckboxes();
    });

    $(".export").on('click', function (event) {
//        var meuregex = /[0-9]*\,?[0-9]?/g;
        var linha = "";
        var imagem_actual = 0;
        var total_imagens = $("input.myform:checked").size();
        if(total_imagens == 0) {
            $("#texto").text("Csv Exporter v1.2");
            return false;
        }
        $("#texto").text("Working....");
        $("div#fbTimelinePhotosContent a.uiMediaThumb").each(function(index) {
            if($(this).prev().prev().is(":checked")) {
                jQuery.ajaxSetup({async:false});
                var $this = $(this);
                $.get($(this).attr("ajaxify"), function(data) { 
                    imagem_actual++; 
                    $("#texto").text("Status:" + imagem_actual + " / " + total_imagens);                  
                    var text = $(data).find("span.hasCaption").text();
    //                var preco = meuregex.exec(text)[0];
                    var link = $(data).find("a:contains('Download'), a:contains('Transferir')").attr("href").replace(/\??\&?dl=1/g,''); 
    //                linha += preco + ";" + link + "\r\n";
                    linha += $this.prev().val() + ";" + text + ";" + link + "\r\n"; 
                    if (imagem_actual == total_imagens) {
                        $("#texto").text("Status:" + imagem_actual + " / " + total_imagens + " - DONE");
                        matches = linha.match(/\n/g),
                        breaks = matches ? matches.length : 2;
                        $('#result').attr('rows',breaks + 2);
                        $("#result").text(linha).show();
                    }
                });

            }
        });
    });
    $(".export2").on('click', function (event) {
        $("#result").hide();
        $("#texto").text("Csv Exporter v1.2");
    });
});