// ==UserScript==
// @name		Clearer
// @autho		Javier Galardi
// @namespace	
// @description	Eliminar publicidad y contenido no deseado
// @include		*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

function changeTitle() {
    document.title = "Mozilla Firefox (Build 20090715094852) - " + document.title;
}

function safetyCar() {
    $("div#google_ads_frame1, div.right_side, div#top, iframe#google_ads_frame2, " +
      "div.commentbar-line1, div.commentbar-line2, div.commentbar-line3, div.date, div.story-footer").remove();
    $("div.mpart + table").remove();
    $("a[name='comments'] + div").remove();
}

function thef1() {
    $("td#portal-column-one, td#portal-column-two, td#portal-column-four, div#global_cabecera_hachette, " +
      "div#ajaxtabs_portlet_rating, div#portal-footer, iframe#google_ads_frame1, iframe#google_ads_frame2").remove();
    $("div.titular").css("width", "100%");
    $("div.subtitular").css("width", "49%");
}

function diariovasco() {
    $("div#publicidades_top, div.robapaginas-fijo, div.robapaginas, div.patrocinio, div.publicidad_especial, div#publi1_noxtrum, " +
      "div#pie, div#enlacesvocento, div.zonaD, div.clasificadosvocento, div.separa, div.modulo-especial, div#publi1_auh, div#compartir2, div#gebruiker_shadow, div#mensenwat").remove();
    $("iframe[name='iframeQDQ']").remove();
}

function elpais() {
    $("div.banner_top, div.publi, div#google_noticia, div.publi_h, div.estruc_10, div.pie_enlaces_inferiores, div.contorno_f, div.patrocinio").remove();
}

function elmundo() {
    $("div#publicidad_principal, div.publicidad, div#modulo_economia, div#modulo_xtb, div.modulo_patrocinio, div.patrocinio, " +
      "div.bloque_tienda, div.bloque_pie_enlaces, div#info_site, div.google_cintillo, div.google_bloque, " +
      "div.publicidad_lateral_a, div.publicidad_lateral_b, div#publicidadsuperior, div.publicidadnoticia, " +
      "div.publicidadtexto_abajo, div.publicidadpie, li.compartir, div.publicidad_horizontal, div.herramientas, div.migaymas, div#piepagina, div.buscadorymas, div#cabecera, div.columnaderecha, div.superior, ul#nav_herramientas, ul#nav_secundaria, div.contenido_noticia_02, div#contenido_secundario").remove();
}

function marca() {
    $("div#publi_sup, div#publi_abajo, div#bloque_tiramillas, div#derecha-movil, div.publi_agenda_inf, div.publi, " + 
      "div.publi990, div#anunciosGoogle, div.banner-tienda").remove();
}

function as() {
    $("div.banner_sup, div.publi").remove();
}

function liveEurosport() {
    $("div#yeug-header, div#yeug-related, div#yeug-nav-tertiary, div#co, div#yeug-footer").remove();
}

function elotrolado() {
    $("div#banner_top, div#leftcontent, div#publiright, div.banner, div#columna_derecha").remove();
    $("div#rightcontent, div#page-footer").css("margin-left", "0px");
    $("div#columna_central").css("width", "100%");
}

function dswii() {
    $("div.blogocio, div.header, div.footer, div.sidebar, div.pub-hor").remove();
}

function freetoview() {
    $("center").remove();
}

function kproxy() {
    $("table.bn, div#guser, div#gbar, div.gbh, table.ft, table.l").remove();
    $("img[alt='Gmail de Google']").remove();
    $("input[name='nvp_site_web']").remove();
    $("table, tr, td").attr("bgcolor", "");
    $("font").attr("color", "#898989");
    $("a").css("color", "#000099");
    $("body").attr("bgcolor", "FCFCFF");
    $("input, textarea, select").css("border", "1px solid #969696");
    $("input[type='submit']").css("background-color", "DBDBDB");
    $(".th td, .th th").css("border-bottom", "1px solid #DBDBDB");
    if ($("input[name='nvp_bu_send']").length == 0 && $("select[name='tact']").length > 0) {
        $("select[name='tact']").before(" <input type='checkbox' name='sel_all' onchange='var sc = this.checked; for (var i = 0; i < document.forms.length; i++) { var tf = document.forms[i]; for (var j = 0; j < tf.elements.length; j++) { var te = tf.elements[j]; if (te.type == \"checkbox\") te.checked = sc; } }'/> ");
    }

    // Si estamos en la bandeja de entrada, refrescar cada minuto
    if (document.title.indexOf("Recibidos") != -1) window.setTimeout("window.location.reload()", 60000);

}

if (/^http:\/\/www\.safety-car\.net\//.test(window.location.href)) {
    changeTitle();
    safetyCar();
} else if (/^http:\/\/www\.thef1\.com\//.test(window.location.href)) {
    changeTitle();
    thef1();
} else if (/^http:\/\/www\.diariovasco\.com\//.test(window.location.href)) {
    changeTitle();
    diariovasco();
} else if (/^http:\/\/www\.elpais\.com\//.test(window.location.href)) {
    changeTitle();
    elpais();
} else if (/^http:\/\/www\.elmundo\.es\//.test(window.location.href)) {
    changeTitle();
    elmundo();
} else if (/^http:\/\/www\.elotrolado\.net\//.test(window.location.href)) {
    changeTitle();
    elotrolado();
} else if (/^http:\/\/www\.marca\.com\//.test(window.location.href)) {
    changeTitle();
    marca();
} else if (/^http:\/\/www\.as\.com\//.test(window.location.href)) {
    changeTitle();
    as();
} else if (/^https?:\/\/www\.google\.com\/reader\//.test(window.location.href)) {
    changeTitle();
} else if (/^http:\/\/www\.google\.com\/ig\?/.test(window.location.href)) {
    changeTitle();
} else if (/^http:\/\/.*\.kproxy\.com\//.test(window.location.href)) {
    changeTitle();
    kproxy();
} else if (/^http:\/\/es\.eurosport\.yahoo\.com\/cycling\/livematch\//.test(window.location.href)) {
    changeTitle();
    liveEurosport();
} else if (/^http:\/\/dswii\.es\//.test(window.location.href)) {
    changeTitle();
    dswii();
} else if (/^http:\/\/www\.freetoview\.net\//.test(window.location.href)) {
    kproxy();
    freetoview();
}