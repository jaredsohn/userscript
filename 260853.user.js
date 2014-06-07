// ==UserScript==
// @name       Fooby percent overall column
// @version    0.1
// @description  Adds % damage column to fooby dotd logs
// @author     wpatter6
// @include    *fooby.de/dotd/log.php*
// @require    http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function main(){
    var h = $("div#procs tr.tablesorter-headerRow"),t=parseFloat($("div.dotd-overview tbody tr").children().eq(1).text().replace(/,/g,""));
    h.append((function(){return h.children().eq(0).clone().text("Percent Overall").attr("data-column","6")})());
    $("div#procs tbody tr").each(function(){var c=$(this).children().eq(5).clone();$(this).append((function(){var e=c;e.text(Math.round(parseFloat(e.text().replace(/,/g,""))/t*100000)/1000+"%");return e;})());});
}
var d = document;
if(/fooby\.de\/dotd\/log/i.test(d.location.href)){
	var script = d.createElement("script");
	script.appendChild(d.createTextNode('('+main+')()'));
	(d.head || d.body || d.documentElement).appendChild(script);
}