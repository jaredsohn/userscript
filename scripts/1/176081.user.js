// ==UserScript==
// @name       Proto Long Pages
// @namespace  http://ninjakiwi.com
// @version    0.1009
// @description  Prototype page lengthener
// @include    /http://ninjakiwi\.com/forums/[^/]*/posts[.]*/
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
var pageurl = window.location.href;
var pagenum = pageurl.replace(/http:\/\/ninjakiwi.com\/forums\/[^\/]*\/posts\??(page=)?/gi,"").replace(/\&?(sort=.*)?/gi,""); //Regex of "/http:\/\/ninjakiwi.com\/forums\/[^\/]*\/posts\??(page=[\d]*)?&?(sort=.*)?/i";
if (pagenum.length == 0) {
    pagenum = 1;
}
//var nowpage = pagenum;
var nexpage = pagenum;
nexpage++;
var pagenumstrings = pageurl.split(/\?(page=[\d]*)?/gi);
//alert('This is page: ' + nowpage + '. The next page is page: ' + nexpage);
if (pagenumstrings[2] === undefined) {
    pagenumstrings[2] = "";
}
//alert(pagenumstrings[0] + '?page=' + nexpage + pagenumstrings[2]);
var moarpagebutton = '<hr><div id="extrapages"><div id="xtratemp" style="text-align: center !important;"><button id="xtrabutton" style="height: 25px !important;">Load extra pages</button></div></div>';
$('.forum').append(moarpagebutton);
$("#xtrabutton").click(function() {
    $('#xtratemp').replaceWith('<div style="text-align: center !important; height: 25px !important;">Loading extra pages, please wait...</div>');
    $('#extrapages').load(pagenumstrings[0] + '?page=' + nexpage + pagenumstrings[2] + ' .forum', function(response, status, xhr) {
        if (status == "error") {
            var errormsg = "An error occured while loading: ";
            $("#extrapages").html(errormsg + xhr.status + " " + xhr.statusText);
        }
    });
//$('.forum').append(moarpagebutton);
});
