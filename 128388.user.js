// ==UserScript==
// @name           travian 4 hero auction helper
// @description    it will calculate cost
// @author         mrreza
// @license        I don't know,maybe:GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @exclude        http://ts*.travian.ir/hero_auction.php?action=sell*
// @exclude        http://ts*.travian.ir/hero_auction.php?action=bids*
// @include        http://ts*.travian.*/hero_auction.php*
// ==/UserScript==

firsttab = document.getElementsByTagName("tr")[0].insertCell(0)
firsttab.innerHTML="one";

t_loop = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;

for(i=0 ; i<t_loop ; i++){

base = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i]

if(base.childElementCount=="6"){

nam2 = base.getElementsByTagName("td")[1].textContent;

number = nam2.split("x");

silv2 = base.getElementsByTagName("td")[3].textContent;

cost = (Math.round((silv2 / number[0])*10))/10;
//perhaps for left to right language you should change "number[0]" with "number[1]"
final = base.insertCell(0).innerHTML=cost
}
else
{
selected = base.insertCell(0).innerHTML="buy"
}

}
