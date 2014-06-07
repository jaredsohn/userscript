// Systembolagets beställningsvaror i butik
// 2008-09-29
// Copyright (c) 2008, Andreas Mattsson
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Systembolagets beställningsvaror i butik
// @namespace     http://userscripts.org/users/68195/
// @description   Gör det möjligt att se vilka butiker som har artiklar ur Systemetbolagets beställningssortiment i lager
// @include       http://*systembolaget.se/SokDrycker/*
// ==/UserScript==

var bestVara = document.evaluate("//a[@href='/ButikerOppettider']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if(bestVara.snapshotLength){
    var laggVara = document.evaluate("//img[@class='LaggTillMinaVaror']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var rubrik = document.evaluate("//td[@class='text_tabell_rubrik']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(rubrik.snapshotLength)
        rubrik.snapshotItem(rubrik.snapshotLength-1).appendChild(document.createTextNode("Var finns varan?"));
    for (var i = 0; i < bestVara.snapshotLength; i++) {
        var ny_data = document.createElement("div");
        var artikelNr = laggVara.snapshotItem(i).getAttribute("onclick");
        artikelNr = artikelNr.substring(19, artikelNr.length-3);
        ny_data.innerHTML = 
            '<select name="ProductDetail1:DropDownListCounties' + i + '" id="ProductDetail1_DropDownListCounties' + i + '" class="dropdownrecept">' + 
            '<option value="00">Hela landet</option>' + 
            '<option value="10">Blekinge l&#228;n</option>' + 
            '<option value="20">Dalarnas l&#228;n</option>' + 
            '<option value="09">Gotlands l&#228;n</option>' + 
            '<option value="21">G&#228;vleborgs l&#228;n</option>' + 
            '<option value="13">Hallands l&#228;n</option>' + 
            '<option value="23">J&#228;mtlands l&#228;n</option>' + 
            '<option value="06">J&#246;nk&#246;pings l&#228;n</option>' + 
            '<option value="08">Kalmar l&#228;n</option>' + 
            '<option value="07">Kronobergs l&#228;n</option>' + 
            '<option value="25">Norrbottens l&#228;n</option>' + 
            '<option value="12">Sk&#229;ne l&#228;n</option>' + 
            '<option value="01">Stockholms l&#228;n</option>' + 
            '<option value="04">S&#246;dermanlands l&#228;n</option>' + 
            '<option value="03">Uppsala l&#228;n</option>' + 
            '<option value="17">V&#228;rmlands l&#228;n</option>' + 
            '<option value="24">V&#228;sterbottens l&#228;n</option>' + 
            '<option value="22">V&#228;sternorrlands l&#228;n</option>' + 
            '<option value="19">V&#228;stmanlands l&#228;n</option>' + 
            '<option value="14">V&#228;stra G&#246;talands l&#228;n</option>' + 
            '<option value="18">&#214;rebro l&#228;n</option>' + 
            '<option value="05">&#214;sterg&#246;tlands l&#228;n</option>' + 
            '</select>&nbsp;<a href="javascript:VarFinnsVaran(\''+artikelNr+'\', \'DropDownListCounties' + i + '\' );"><img src="/Images/button_sok.gif" width="34" height="18" align="top" border="0" alt="S&ouml;k"/></a></td>'
            ;
        bestVara.snapshotItem(i).parentNode.nextSibling.appendChild(ny_data);
    }
}