// ==UserScript==
// @name           Vigilâncias Portal ISEP for Microformats Operator
// @namespace      http://www.nunobett.info/scripts/greasemonkey/
// @description    Utiliza a tabela global de vigilâncias do Portal do ISEP, para ser possível extrair para o Outlook ou outro programa do género.
// @include        https://portal.isep.ipp.pt/INTRANET/educacao/ver_vigilancias.asp*
// @copyright      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/pt/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/2.5/pt/88x31.png" /></a><br /><span xmlns:dc="http://purl.org/dc/elements/1.1/" href="http://purl.org/dc/dcmitype/Text" property="dc:title" rel="dc:type">Script for recreating exams table to microformats</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.nunobett.info/" property="cc:attributionName" rel="cc:attributionURL">Nuno Bettencourt</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/2.5/pt/">Creative Commons Attribution-Non-Commercial-Share Alike 2.5 Portugal License</a>.<br />Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.nunobett.info/scripts/greasemonkey/vigilancias_portal_isep.user.copyright.html" rel="cc:morePermissions">vigilancias_portal_isep.user.copyright.html</a>.
// @last-update	   2010-02-09
// ==/UserScript==

// get reference to table
var table = document.getElementsByTagName("table")[13];
trs = table.getElementsByTagName("tr")
trs_length = trs.length
//alert("Número de filhos:" + trs_length)
for (i=1;i<trs_length;i++)
{
    //coloca o class no tr
    trs[i].setAttribute("class", "vevent")

    // coloca o summary na descrição
    first_a = trs[i].getElementsByTagName("a")[0]
    first_a.setAttribute("class", "summary")

    // coloca o dtstart na coluna2
    var td = trs[i].getElementsByTagName("td")[1]
    var td_temp = trs[i].getElementsByTagName("td")[2]
    var dt_start_text = td.firstChild.textContent + " " + td_temp.firstChild.textContent
    td.firstChild.textContent = ""
//    alert(dt_start_text)
    var span_dtstart = document.createElement("span");
    span_dtstart.setAttribute("class", "dtstart")
    var span_text = document.createTextNode(dt_start_text);
    span_dtstart.appendChild(span_text)
    td.appendChild(span_dtstart)   

    // coloca a location na ultima coluna 
    td = trs[i].getElementsByTagName("td")[5]
    td.setAttribute("class", "location")

}