//// ==UserScript==
// @name          imhonet
// @author        phantom
// @include       http://films.imhonet.ru/*
// @include       http://imhonet.ru/*
// ==/UserScript==
(function() {
if (location.pathname.indexOf('/element/') != 0 || location.hostname.indexOf('films.imhonet.ru') == -1) {return}
function embedScript(s){document.body.appendChild(document.createElement('script')).innerHTML=s}
function main() {
    function a(text,fav){
        var a = document.createElement('a');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', text);
        var img = document.createElement('img');
        img.setAttribute('src',fav);
        img.setAttribute('width', '16px');
        img.setAttribute('height', '16px');
        a.appendChild(img);
        return $(a);
    }
    parts = location.pathname.split('/');
    id = parts[parts.length-2];
    var rutracker = 'http://rutracker.org/forum/tracker.php?nm=';
    var rutrackerFav = 'http://rutracker.org/favicon.ico';
    var kinobaza = 'http://kinobaza.tv/search?search_type=films&imhonet_id='+id+'&query=';
    var kinobazaFav = 'http://kinobaza.tv/img/fav.png';
    // russian name
    var r = $('.headline');
    var e = $('.title-english');
    var text = encodeURIComponent(r.text().trim());
    r.after(a(kinobaza+text,kinobazaFav));
    r.after(a(rutracker+text,rutrackerFav));
    // original name
    text = encodeURIComponent(e.text().trim());
    e.after(a(kinobaza+text,kinobazaFav));
    e.after(a(rutracker+text,rutrackerFav));
}
embedScript('(' + main.toString() + ')();');
})();
