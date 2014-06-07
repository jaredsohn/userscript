// ==UserScript==
// @name           Mejor emol (hardcore)
// @author         KAWB
// @version        2013-11-02
// @namespace      www.emol.com
// @updateURL      https://userscripts.org/scripts/source/163088.meta.js
// @download       https://userscripts.org/scripts/source/163088.user.js
// @description    Elimina OnClick + mugre general (propaganda, redes sociales, suscripciones, futbol ('deportes'), farandula, header, etc)
// @include        http://www.emol.com/*
// @include        http://emol.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


function deleteOnClick() {
    var xpath = function(query) {
        return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    };

    for (var items = xpath.call(this, '//a[@onclick]'), i = 0; i < items.snapshotLength; i++) {
        var item = items.snapshotItem(i);
        item.removeAttribute('onclick');
    }
}

for (var i = 0; i < 5; i++) {
    if (i === 0) {
        $("div#header_logo").remove();
        $("div.cont_iz").css({'margin': '60px 0 0'});
        $("div#texto_noticia").css({'padding': '15px 0px 15px 0px'});
        $("div.cont_der").css({'margin': '85px 0 0 10px'});
        $("div#menu_corp_cont").remove();
        var temp_html = "";
        $("div.divico_relacionado").each(function() {
            temp_html = $(this).html();
            if (temp_html.indexOf("/deportes/") !== -1 || temp_html.indexOf("/tendenciasymujer/") !== -1) {
                $(this).remove();
            }
        });
        $("div#col_center_420px").children("div").each(function() {
            temp_html = $(this).html();
            if (temp_html.indexOf("/deportes/") !== -1 || temp_html.indexOf("/tendenciasymujer/") !== -1) {
                $(this).remove();
            }
        });
        $("div#col_left_320px").children("div").each(function() {
            temp_html = $(this).html();
            if (temp_html.indexOf("/deportes/") !== -1 || temp_html.indexOf("/tendenciasymujer/") !== -1) {
                $(this).remove();
            }
        });
        $("div.caja_contenedor_masvistos").children("div").each(function() {
            temp_html = $(this).html();
            if (temp_html.indexOf("/deportes/") !== -1 || temp_html.indexOf("/tendenciasymujer/") !== -1) {
                $(this).remove();
            }
        });
        $("div.cont_right_200px").children("div").each(function() {
            temp_html = $(this).html();
            if (temp_html.indexOf("/deportes/") !== -1 || temp_html.indexOf("/tendenciasymujer/") !== -1) {
                $(this).remove();
            }
        });
        $("div#bus_opcion").remove();
        $("div#economicosSidebar").remove();
        $("div#clubright200px").remove();
        $("div#eltiempo_home").remove();
        $("div.div_cont_caja_izq_emol_tv").remove();
        $("div.div_cont_caja_izq_emol_tv_sup").remove();
        $("div#header").remove();
        $("div#barra-herramientas").remove();
        $("div#VideosEmolTVxCanal").remove();
        $("div.cont_iz_cuerpo_recuadro_top").remove();
        $("div#cont_tw_txt_300").remove();
        $("div.cont_full_right_200px_movil").remove();
        $("div#divRestaurantesEmol").remove();
        $("div#caja_mapas").remove();
        $("div#CajaFarox2").remove();
        $("div#divViveDescto").remove();
        $("div#ContenedorMasVistoFarox").remove();
        $("div#divFarox").remove();
        $("div#mercurio_center_710px").remove();
        $("div#Caja01").remove();
        $("div#Caja02").remove();
        $("div#Caja03").remove();
        $("div#divFaroxP").remove();
        $("div#divguioteca").remove();
        $("div.cont_tw_txt_300").remove();
        $("div#divredes_sociales").remove();
        $("div#divcaja_juegos").remove();
        $("div#ContenedorMasVistoCanal").children("div").each(function() {
            temp_html = $(this).html();
            if (temp_html.indexOf("/deportes/") !== -1 || temp_html.indexOf("/tendenciasymujer/") !== -1) {
                $(this).remove();
            }
        });
        $("div#divcaja_movil_otros").remove();
        $("div#Caja06").remove();
        $("div#divcol_clasificados").remove();
        $("div#bottom").remove();
        $("div#Caja07").remove();
        $("div#divClubLectores").remove();
        $("div#cont_iz_cuerpo_recuadro").remove();
        $("div.cont_tw_txt_300").remove();
        $("div#divFrmClasificado").remove();
        $("div#divcaja_educacion").remove();
        $("div#caja_der_04").remove();
    }
    setTimeout(function() {
        deleteOnClick();
    }, 1000);
}