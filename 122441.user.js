// ==UserScript==
// @name           Zandagort Top lista átalakítás
// @namespace      http://sza.lonna.hu
// @match          http://*.zandagort.hu/top/
// ==/UserScript==

GM_addStyle(".felhasznalokaszovetsegben{ width: 100%; background-color: #333; border: 1px solid #fff; }\
    .felhasznalokaszovetsegben tr:first-child{ background-color: #444; }\
    .felhasznalokaszovetsegben tr:nth-of-type(even){ background-color: #3F3F3F;");

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
    var table_szovetsegesek = $($("#kulso_resz_v2").children("table")[0]).children("tbody");
    var table_jatekosok     = $($("#kulso_resz_v2").children("table")[1]).children("tbody");
    $(table_szovetsegesek).children("tr").each(function(){
        var elozo_tartalom = $(this).html();
        var szovetseg_nev  = $($(this).children("td")[2]).text();
        var tagok;
        if(szovetseg_nev.length != 0){
            tagok = $(table_jatekosok).children("tr:contains('" + szovetseg_nev + "')");
            var felhasznalos_html = "<td colspan=6><table style=\"width: 100%\"><tr>" + elozo_tartalom + "</tr></table><table class=\"felhasznalokaszovetsegben\"><tr><th>hely</th><th colspan=2>név</th><th>bolygók száma</th><th>szövetség</th></tr><tr>";
            $(tagok).each(function(){ felhasznalos_html += "<tr>" + $(this).html() + "</tr>"; });
            felhasznalos_html += "</table></td>";
            $(this).attr("allapot", "csakszovetseg");
            $(this).click(function(){
                if($(this).attr("allapot") == "csakszovetseg"){
                    $(this).html(felhasznalos_html);
                    $(this).attr("allapot", "szovetsegesjatekosok");
                }else{
                    $(this).html(elozo_tartalom);
                    $(this).attr("allapot", "csakszovetseg");
                }
            });
        }
    })
}
addJQuery(main);
