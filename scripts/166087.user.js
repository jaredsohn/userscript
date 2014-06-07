// ==UserScript==
// @name        FeliuBadalo millorat
// @namespace   http://userscripts.org/users/392674
// @description Afageix la informació dels productes a la pàgina de cerca.
// @include     http*//www.feliubadalo.com/Busqueda.aspx*
// @version     0.3
// ==/UserScript==

function myLog(s){
    console.log("[FeliuBadalo enhacer] " + s);
};

function identifyProducts(){
    $("#Contenido_ListadoNo").children("tbody").children("tr").children("td").addClass("product");
    $(".product").find("div:eq(1)").addClass("productId");
    $(".product").find("div:eq(2)").addClass("productName");
};

function addGUI(){
    $(".product").append($("<div class='moar_panel'></div>").hide());
    $(".productId").after($("<img class='moar_btn' src='http://www.faviconer.com/uploads/192/110/favicon.png'></img>"));
};

$(document).ready(function(){
    $("head").append("<script src='//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>");

    identifyProducts();
    addGUI();
    
    $(".moar_btn").click(function(){
        myLog($.trim($(this).parent().text()) + " clicked");
        var panel = $(this).closest(".product").find(".moar_panel");
        
        if (panel.is(':empty')){
            panel.text("loading...");
            
            var dir = $(this).parent().find("a").attr("href");
            myLog(dir);
            $.get(dir, function(data){
                var w = $($.trim(data)).find(".main_content");
                var img = w.find("#Contenido_Imagen");
                var desc = w.find("#Contenido_Descripcion");
                var content = $('<table style="text-align: left; width: 100%;" border="1" cellpadding="2" cellspacing="2"><tbody><tr><td><img src=' + img.prop("src") + ' width="300" height="300" </img></td><td>' + desc.html() + '</td></tr></tbody></table>');
                panel.html("").append(content);
            });
            
            panel.slideToggle();
            
        } else {
            panel.slideToggle();
        };
    });    
});