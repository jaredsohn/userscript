// ==UserScript==
// @name           cuevana
// @namespace      "fisica.x10.mx"
// @version        1.2
// @include        http://www.cuevana.tv/player/sources*
// @resource       meta http://userscripts.org/scripts/source/98017.meta.js
// @resource       i18n http://i18n.pastebin.com/download.php?i=U5SnFgKz
// @require       http://jquery.com/src/jquery-latest.js
// ==/UserScript==

var JDownloaderPort=10025 //para el control remoto del JD para que se agreguen a la peli y el sub directamente de la pagina
var ID
var link,sub,jd
var suburl
var linkarray

function remote() {
    for(i in linkArray)
        $.get('http://127.0.0.1:'+JDownloaderPort+'/action/add/links/'+linkArray[i])
}

function show_links() { 
    s = window.wrappedJSObject.sources  //fuentes disponibles por def, audio, host
    sel = window.wrappedJSObject.sel_source     // fuente seleccionada por idem
    linkArray=[suburl]
    link.html('')
    for(host in s[sel.def][sel.audio]) { //post para pedir el link
        $.post('source_get', {def: sel.def, audio:sel.audio, host:s[sel.def][sel.audio][host], id:ID, tipo:'pelicula'}, function(u) {
                var fileurl=u.replace(/\?.*/,''); // link de la peli
                linkArray.push(fileurl)
                link.append(fileurl+'<br>');
            }
        ); 
    }
}

$(function() {
    var regexS = "[\\?&]"+'id'+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    ID = decodeURIComponent(results[1].replace(/\+/g, " "));

    $('#player_frame',window.parent.document).css('height','400')
    $('.video.main',window.parent.document).find(".video").css('height','400')

    var e = $("#error")
    e.html('<p id=links></p><p id=sub></p><p id=jd></p>')
    link = e.find('#links')
    sub = e.find('#sub')
    jd = e.find('#jd')
    
    suburl= 'http://sc.cuevana.tv/files/s/sub/'+ ID+'_ES'+'.srt'
    sub.html('<a href="' +suburl + '" >Subtitulo</a>')
    jd.html('<a id=jdlink href="#">Bajar con JDownloader</a>')
    $("li").live("click", show_links);
    $("#jdlink").live("click", remote);

    show_links()
});
