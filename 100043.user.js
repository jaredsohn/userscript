@@ -1,21 +1,29 @@
 // ==UserScript==
-// @name           Org cheater V2
+// @name           ORG cheater V2
 // @namespace      Hans Goedegebuure
 // @include        http://www*.camorraworld.org/*
-// @exclude        http://www*.camorrawordl.org/casino/*
+// @exclude        http://www*.camorraworld.org/casino/*
 // ==/UserScript==
 
 // Variabelen
 var checked0, checked1, checked2, checked3, checked4, random, gezondheid;
 var value = new Array();
+var waarde = new Array();
 var tijd = new Array();
 var doen = new Array();
 var links = new Array();
-randomtijd = (Math.random() * 8000) + 12000;
-i = 0;
+randomtijd = (Math.random() * 4000) + 3000;
 var url = location.href;
 var server = location.hostname;
+if (url == "http://" + server + "/user/dashboard.php"){
+    randomtijd = ((Math.random() * 10000) + 10000);
+}
+i = 0;
 
+if (!GM_getValue('waarschuwing')){
+    alert("Deze versie van de cheater lost geen anti-cheat op, maar pauzeert wanneer er een code ingevuld moet worden.");
+    GM_setValue('waarschuwing', "gedaan");
+}
 function isInt(x) {
    var y=parseInt(x);
    if (isNaN(y)) return false;
@@ -41,6 +49,15 @@
 function pauze(){
     clearTimeout(stats);
 }
+plaatjes = document.getElementsByTagName('img');
+i = 0;
+while (i < plaatjes.length){
+    if (plaatjes[i].src == "http://" + server + "/sys/captcha/captcha.php"){
+        pauze();
+        alert("Er moet een code ingevuld worden");   
+    }
+    i++;
+}
 function naarstats(){
     window.location.href = "http://" + server + "/user/dashboard.php";
 }
@@ -74,8 +91,8 @@
   i++;
 }
 if (aantal > 0){
-    if (aantal == 3){
-        if (links[0] != url + "?type=1&answer=6" || links[1] != url + "?type=1&answer=33" || links[2] != url + "?type=1&answer=54"){
+    if (aantal == 4){
+        if (links[0] != url + "?type=1&answer=66" || links[1] != url + "?type=1&answer=6" || links[2] != url + "?type=1&answer=33" || links[3] != url + "?type=1&answer=54"){
             uitloggen();
         }
         else {
@@ -123,16 +140,20 @@
 if (GM_getValue('CF')){
   checked4 = "CHECKED=CHECKED";
 }
+if (GM_getValue('junks')){
+  waarde[GM_getValue('junks')] = "selected";
+}
 if (!GM_getValue('banken')){
    value[3] = "niet banken";
 }
 else{
     value[3] = GM_getValue('banken');
 }
+
 // !! Goede vakjes aanvinken
 
 // Inhoud van de div instellen
-cheatdiv.innerHTML = "<div class=\"menu_block\"><div class=\"menu_header\">Cheater</div><div class=\"menu_items\"><ul>    <li><a TITLE=\"Stel hier in welke misdaad je wilt doen.\">Misdaden</a> <select id=misdaden>        <option value=0 " + value[0] + ">Nee</option>        <option value=1 " + value[1] + ">Makkelijk</option>        <option value=2 " + value[2] + ">Moeilijk</option>    </select></li>    <br />    <li><a>Auto\'s jatten</a> <input type=checkbox id=auto " + checked0 + " /></li>    <br />  <li><a>Rijlessen</a> <input type=checkbox id=rijles " + checked1 + " /></li>    <br /> <li><a>Schieten</a> <input type=checkbox id=schieten " + checked2 + " /></li>    <br />  <li><a>Runnen</a> <input type=checkbox id=runnen " + checked3 + " /></li>    <br />  <li><a>Cokefabriek</a> <input type=checkbox id=CF " + checked4 + " /></li>  <br />  <li><a>Geld op zak:</a> <input type=text id=geld size=7 value=" + value[3] + " /></li>    <br />  <li><button id=pauze>Pauze</button></li>    </ul></div></div>";
+cheatdiv.innerHTML = "<div class=\"menu_block\"><div class=\"menu_header\">Cheater</div><div class=\"menu_items\"><ul>    <li><a TITLE=\"Stel hier in welke misdaad je wilt doen.\">Misdaden</a> <select id=misdaden>        <option value=0 " + value[0] + ">Nee</option>        <option value=1 " + value[1] + ">Makkelijk</option>        <option value=2 " + value[2] + ">Moeilijk</option>    </select></li>    <br />    <li><a>Auto\'s jatten</a> <input type=checkbox id=auto " + checked0 + " /></li>    <br />  <li><a>Rijlessen</a> <input type=checkbox id=rijles " + checked1 + " /></li>    <br /> <li><a>Schieten</a> <input type=checkbox id=schieten " + checked2 + " /></li>    <br />  <li><a>Runnen</a> <input type=checkbox id=runnen " + checked3 + " /></li>    <br />  <li><a>Cokefabriek</a> <input type=checkbox id=CF " + checked4 + " /></li>  <br />  <li><a>Geld op zak</a> <input type=text size=7 id=geld value=" + value[3] + " /></li>    <br />  <li><a>Junkies</a> <select id=jmanagement><option>Nee</option><option value=3 " + waarde[3] +">Rekruteren</option><option value=4 " + waarde[4] + ">Verdienen</option></select></li><br><li><button id=pauze>Pauze</button></li></ul></div></div>";
 // !! Inhoud van de div instellen
 
 // Inputs van de gebruiker in de gaten houden
@@ -150,6 +171,8 @@
 cfbox.addEventListener("click", cokefabriek, false);
 geldtext = document.getElementById('geld');
 geldtext.addEventListener("keyup", banken, false);
+junkselect = document.getElementById('jmanagement');
+junkselect.addEventListener("change", junks, false);
 pauzeknop = document.getElementById('pauze');
 pauzeknop.addEventListener("click", pauze, false);
 // !! Inputs van de gebruiker in de gaten houden
@@ -177,6 +200,10 @@
   totaan = parseInt(geldtext.value);
   GM_setValue('banken', totaan);
 }
+function junks(){
+  junknummer = parseInt(junkselect.value);
+  GM_setValue('junks', junknummer);
+}
 // !! Functies voor het opslaan van gegevens
 // Headers opvangen
 div = document.getElementsByTagName("div");
@@ -271,6 +298,10 @@
     doen[i] = "cokekopen";
     i++;
   }
+  if ((Number(new Date()) > GM_getValue('junksbijwerken')) && (GM_getValue('junks'))){
+     doen[i] = "junks";
+     i++;
+  } 
   // !! Kijken wat kan/wat jij wilt doen
 
   // Random iets uitkiezen om te doen en naar de pagina gaan
@@ -309,10 +340,13 @@
   if (doen[rand] == "cokekopen"){
     window.location.href = "http://" + server + "/business/coke.php";
   }
+  if (doen[rand] == "junks"){
+    window.location.href = "http://" + server + "/crime/junkies.php";
+  }
   // !! Random iets uitkiezen om te doen en naar de pagina gaan
 }
 
-random = (Math.random() * 8000) + 2000;
+random = (randomtijd - (Math.random() * 3000));
 
 function klikknop0(){
     inputs[0].click();
@@ -438,8 +472,10 @@
 }
 if (url == "http://" + server + "/user/cash.php" && inputs.length == 11 && isInt(GM_getValue('banken'))){
     tds = document.getElementsByTagName('td');
-    cash = tds[18].innerHTML;
+    cash = tds[18].innerHTML;;
     if (cash.match("cash") == "cash"){
+      teken = cash.search(">");
+      cash = cash.substring(teken, cash.length);
       cash = cash.replace(/[^0-9]+/g, '');
     }
     GM_setValue('aantal', 1);
@@ -473,3 +509,18 @@
         GM_setValue('kooptijd', over5min);
     }
 }
\ No newline at end of file
+if (url == "http://" +server+ "/crime/junkies.php"){
+    selects = document.getElementsByTagName("select");
+    i = 0;
+    while (i < selects.length){
+        if (selects[i].name.match("junk") == "junk"){
+            selects[i].value = GM_getValue('junks');
+            setTimeout(klikknop0, random);
+            tijd = Number(new Date());
+            over5min = tijd + 300000;
+            over5min = over5min.toString();
+        }
+        i++;
+    }
+    GM_setValue('junksbijwerken', over5min);
+}