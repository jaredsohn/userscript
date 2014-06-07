// ==UserScript==
// @name        Bloodwars Sortowanie w widoku klanu
// @namespace   http://mega.szajb.us/juenizer/
// @description Bloodwars Sortowanie w widoku klanu
// @include     http://r*.bloodwars.interia.pl/?a=aliance
// @version     2
// by juen@o2.pl
// v2 - final?
// ==/UserScript==

var nowe = new Array(); var x=0; var cells = document.getElementsByTagName("tr");
for (var i = 0; i < cells.length; i++) {
        cel_tst = cells[i].innerHTML; tst = cel_tst.search(' do kolejnej ekspedycji ');
        if (tst>-1) {
                tds=cells[i].getElementsByTagName("td");
                nowe[x]= new Array(7);
				pkt = tds[5].innerHTML;
				for (pkts = 6 - pkt.length;pkts>0; pkts--) pkt="0"+pkt;
                nowe[x][0]=pkt;
                nowe[x][1]=tds[0].innerHTML;
                nowe[x][2]=tds[1].innerHTML;
                nowe[x][3]=tds[3].innerHTML;
                nowe[x][4]=tds[2].innerHTML;
                nowe[x][5]=tds[4].innerHTML;
                nowe[x++][6]=tds[6].innerHTML;
        }
}
nowe.sort();
nowe.reverse();
tabela="                                <tr class=\"tblheader\">\
                                        <td>POZIOM</td>\
                                        <td width=\"130\" style=\"padding: 5px;\">Imię</td>\
                                        <td width=\"60\">On-line</td>\
                                        <td width=\"110\">Ranga</td>\
                                        <td width=\"80\">ADRES</td>\
                                        <td width=\"50\">PUNKTY</td>\
                                        <td width=\"150\">Data dołączenia</td></tr>"
for (var i = 0; i < nowe.length; i++) {
        if (i%2==0) tabela+="<tr align=center>"; else  tabela+="<tr align=center class=even>";
        tabela+="<td>"+nowe[i][5]+"</td>";
        tabela+="<td>"+nowe[i][1]+"</td>";
        tabela+="<td>"+nowe[i][2]+"</td>";
        tabela+="<td>"+nowe[i][3]+"</td>";
        tabela+="<td>"+nowe[i][4]+"</td>";
        tabela+="<td>"+(nowe[i][0]-0)+"</td>";
        tabela+="<td>"+nowe[i][6]+"</td>";
        tabela+="</tr>";
}
miejsce=document.getElementsByTagName('table');
miejsce[5].innerHTML=tabela;
