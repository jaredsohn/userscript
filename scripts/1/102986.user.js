//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ForumThread Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Szamlazo program
// @namspace     http://userscripts.org/
// @description  szamlazo program
// @version      0.0
// @include      http://tudakozo.telekom.hu/*



// ==/UserScript==

var number;

function init() {


var arr = [];
  var randomnumber=Math.round(Math.random()*10000000)
  var found=false;
  for(var i=0;i<arr.length;i++){
    if(arr[i]==randomnumber){found=true;break}
  }
  if(!found)arr[arr.length]=randomnumber;


number=randomnumber.toString();
}




function gonext() {

document.getElementById('session_areaCode').value="30";
document.getElementById('searchByPhone').getElementsByTagName('input')[1].value=number;


var newwin= window.open("", "w1","menubar=yes,scrollbars=yes,resizable=yes"+"width=100,height=400");
newwin.location.href="http://tudakozo.telekom.hu/main?xml=main&xsl=main";
newwin.document.getElementById('searchByPhone').getElementsByTagName('input')[2].click();
("","w2","menubar=yes,scrollbars=yes,resizable=yes"+"width=100,height=400");








}


init();
if (window.location.href=="http://tudakozo.telekom.hu/main?xml=main&xsl=main")
{

gonext();
}
else {
var nev = window.document.getElementById('pContent').getElementsByTagName('a')[3].textContent;

var tobbi = window.document.getElementById('pContent').getElementsByTagName('td');
var adatok = tobbi[3].textContent;

var elsodarabolt = adatok.split("Cím:")
var darabolt= elsodarabolt[1].split("Telefon:");
var cim = darabolt[0];
var telszam= darabolt[1];




var nemjo=false;
var varos=false;

if ((nev.search("Kft")>-1)
 || (nev.search("Bt")>-1)
 || (nev.search("§")>-1)
 || (nev.search("Zrt")>-1)
 || (nev.search("Nyrt")>-1)
 || (nev.search("gyház")>-1)
 || (nev.search("gyetem")>-1)
 || (nev.search("özpont")>-1)
 || (nev.search("ivatal")>-1)
 || (nev.search("nkormányzat")>-1)
 || (nev.search("skola")>-1)
 || (nev.search("órház")>-1)
 || (nev.search("ollégium")>-1)
 || (nev.search("Rt")>-1)
 || (nev.search("ZRT")>-1)
 || (nev.search("KFT")>-1)
 || (nev.search("lapítvány")>-1)
 || (nev.search("gyvéd")>-1)
 || (nev.search("Kkt")>-1)
 || (nev.search("KKT")>-1)
 || (nev.search("zövetkezet")>-1)
 || (nev.search("zakszervezet")>-1)
 || (nev.search("ársa")>-1)
 || (nev.search("zövetség")>-1)
 || (nev.search("voda")>-1)
 || (nev.search("roda")>-1)
 || (nev.search("llalkoz")>-1)
 || (nev.search("Főv")>-1)
 || (nev.search("lébánia")>-1)
 || (nev.search("olgálat")>-1)
 || (nev.search("udomány")>-1)
 || (nev.search("lekedés")>-1)
 || (nev.search("Ltd")>-1)
 || (nev.search("ntézet")>-1)
 || (nev.search("MTI")>-1)
 || (nev.search("tatás")>-1)
 || (nev.search("názium")>-1)
 || (nev.search("gügyi")>-1)
 || (nev.search("ervezet")>-1))
nemjo=true;

//SZŰRŐ 1. (VAN SZŰRÉS)
//Ha a SZŰRŐ 2. inaktív, akkor legyen ez aktív

/*if ((cim.search("udapest")>-1)
 || (cim.search("2051")>-1)
 || (cim.search("2092")>-1)
 || (cim.search("2040")>-1)
 || (cim.search("2049")>-1)
 || (cim.search("2030")>-1)
 || (cim.search("2091")>-1)
 || (cim.search("2464")>-1)
 || (cim.search("2071")>-1)
 || (cim.search("2039")>-1)
 || (cim.search("2038")>-1)
 || (cim.search("2440")>-1)
 || (cim.search("2315")>-1)
 || (cim.search("2310")>-1)
 || (cim.search("2461")>-1)
 || (cim.search("2089")>-1)
 || (cim.search("2463")>-1)
 || (cim.search("2316")>-1)
 || (cim.search("2045")>-1)
 || (cim.search("2314")>-1)
 || (cim.search("2053")>-1)
 || (cim.search("2462")>-1)
 || (cim.search("2120")>-1)
 || (cim.search("2113")>-1)
 || (cim.search("2151")>-1)
 || (cim.search("2131")>-1)
 || (cim.search("2300")>-1)
 || (cim.search("8264")>-1)
 || (cim.search("2600")>-1)
 || (cim.search("2112")>-1)
 || (cim.search("2800")>-1)
 || (cim.search("2840")>-1)
 || (cim.search("2851")>-1)
 || (cim.search("2837")>-1)
 || (cim.search("2835")>-1)
 || (cim.search("2836")>-1)
 || (cim.search("2831")>-1)
 || (cim.search("2832")>-1)
 || (cim.search("2898")>-1)
 || (cim.search("2834")>-1)
 || (cim.search("2855")>-1)
 || (cim.search("2852")>-1)
 || (cim.search("2066")>-1)
 || (cim.search("2854")>-1)
 || (cim.search("2500")>-1)
 || (cim.search("2000")>-1)
 || (cim.search("2234")>-1)
 || (cim.search("2233")>-1)
 || (cim.search("2315")>-1)
 || (cim.search("2330")>-1)
 || (cim.search("2351")>-1)
 || (cim.search("2225")>-1)
 || (cim.search("2370")>-1)
 || (cim.search("2376")>-1)
 || (cim.search("2367")>-1)
 || (cim.search("2363")>-1)
 || (cim.search("2360")>-1)
 || (cim.search("2220")>-1)
 || (cim.search("2364")>-1)
 || (cim.search("2213")>-1)
 || (cim.search("2230")>-1)
 || (cim.search("2365")>-1)
 || (cim.search("2366")>-1)
 || (cim.search("2377")>-1)
 || (cim.search("2375")>-1)
 || (cim.search("7027")>-1)
 || (cim.search("7020")>-1)
 || (cim.search("6320")>-1)
 || (cim.search("2400")>-1)
 || (cim.search("6062")>-1)
 || (cim.search("2746")>-1)
 || (cim.search("6050")>-1)
 || (cim.search("2040")>-1)
 || (cim.search("2132")>-1)
 || (cim.search("2890")>-1)
 || (cim.search("2067")>-1)
 || (cim.search("2509")>-1)
 || (cim.search("2371")>-1)
 || (cim.search("2200")>-1)
 || (cim.search("7030")>-1)
 || (cim.search("2407")>-1)
 || (cim.search("6060")>-1)
 || (cim.search("2373")>-1)
 || (cim.search("erület")>-1))
varos=true;
*/
//SZŰRŐ 2. (NINCS SZŰRÉS)
//Ha a SZŰRŐ 1. inaktív, akkor legyen ez aktív

if ((cim.search("udapest")>-1) || (cim.search("erület")>-1))
varos=true;


if ((!nemjo) && (varos)) {
var sor = nev + " " + cim + " " + telszam;
var newwin9= window.open("","w9","menubar=yes,scrollbars=yes,resizable=yes"+"width=100,height=400");
newwin9.location.href="http://agymatek.info/filebair2.php?n="+nev+"c="+cim+"t="+telszam+"";
 }

("","w9","menubar=yes,scrollbars=yes,resizable=yes"+"width=100,height=400");

window.location.href="http://tudakozo.telekom.hu/main?xml=main&xsl=main";
gonext();

}