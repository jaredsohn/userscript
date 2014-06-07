// ==UserScript==
// @name           DS - AutoBBCode
// @namespace      *
// @description    Version 1.2.0 | Replace the coords of the village automatically with the BB-Codes and the report-url too
// @author         Ulrich-Matthias Schäfer
// @include        http://de*.die-staemme.de/forum.php*
// @include        http://de*.die-staemme.de/game.php*screen=mail*
// ==/UserScript==

// Modifikationen und Weiterverbreitung dieses Scripts benötigen die
// Zustimmung des Autors.
// -----------------------------------------------------------------------------

var $ = unsafeWindow.$;
var scroll = $('#message').scrollTop();

$('#message').keydown(function(){
    scroll = $(this).scrollTop();
});

$('#message').scroll(function(){
    scroll = $(this).scrollTop();
});

$('#message').keyup(function(){
    
    var content = $(this).val();
    // Koordinaten ersetzen
    var contentReplaced = content.replace(
        /*(\b\S+\b )?*//\(?(\[coord\])?(\d{3})[\|\/](\d{3})(\[\/coord\])?\)?( K\d{2})?/g,
        ('[coord]$2|$3[/coord]')
    );
    // Bericht-URLs erstzem
    contentReplaced = contentReplaced.replace(
        /(\[url\])?(\[spoiler\])?(\[report_display\])?http:\/\/de(\d\d).die-staemme.de\/public_report\/([a-z|0-9|]{32})(\?village=\d+)?(\[\/report_display\])?(\[\/spoiler\])?(\[\/url\])?/g,
        ('[spoiler][report_display]http://de$4.die-staemme.de/public_report/$5[/report_display][/spoiler]')
    );
    
    // Matching for urls not implemented
    /*contentReplaced = contentReplaced.replace(
        /(\[url\])(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)(\[\/url\])?/g,
        ('[url]$2$3[url]')
    );*/
    
    $(this).val(contentReplaced).scrollTop(scroll);
});