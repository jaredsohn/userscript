// ==UserScript==
// @name           NL cheater V2
// @namespace      Hans Goedegebuure
// @include        http://www*.camorraworld.nl/*
// @exclude        http://www*.camorraworld.nl/casino/*
// ==/UserScript==

// Variabelen
var checked0, checked1, checked2, checked3, checked4, checked5, random, banken, gezondheid, checkcokehoeveelheid;
var value = new Array();
var waarde = new Array();
var tijd = new Array();
var doen = new Array();
var links = new Array();
randomtijd = (Math.random() * 4000) + 3000;
var url = location.href;
var server = location.hostname;
if (url == "http://" + server + "/user/dashboard.php"){
    randomtijd = ((Math.random() * 10000) + 10000);
}
function isInt(x) {
   var y=parseInt(x);
   if (isNaN(y)) return false;
   return x==y && x.toString()==y.toString();
}

// !! Variabelen

stats = setTimeout(naarstats, randomtijd);

// Functies
function pauze(){
    clearTimeout(stats);
}
plaatjes = document.getElementsByTagName('img');
i = 0;
while (i < plaatjes.length){
    if (plaatjes[i].src == "http://" + server + "/sys/captcha/captcha.php"){
        pauze();
        alert("Er moet een code ingevuld worden");   
    }
    i++;
}
function naarstats(){
    window.location.href = "http://" + server + "/user/dashboard.php";
}
// !! Functies

// Cheater script toevoegen
div = document.getElementById('VVDP_SCRIPT_BASE');
if (div){
   cheatdiv = document.createElement('div');
   div.parentNode.insertBefore(cheatdiv, div.nextSibling);
}
// !! Cheater script toevoegen

// anti cheat detectie
i = 0;
aantal = 0;
allelinks = document.getElementsByTagName('a');
while (i < allelinks.length){
  link = allelinks[i];
  if (link.href.match("type=1") == "type=1"){
    if (link.href.match(url) == url){
      if (link.innerHTML.match('width="1"') != 'width="1"'){
        links[aantal] = link.href;
        aantal++;
        if (link.href.search("type=1&answer=54") != "-1"){
          goedelink = link;
        }
      }
    }
  }
  i++;
}
if (aantal > 0){
    if (aantal == 4){
        if (links[0] != url + "?type=1&answer=66" || links[1] != url + "?type=1&answer=6" || links[2] != url + "?type=1&answer=33" || links[3] != url + "?type=1&answer=54"){
            uitloggen();
        }
        else {
            window.location.href = goedelink;
        }
    }
    else {
        if (url != "http://" + server + "/user/cash.php"){
             uitloggen();
        }
    }
}
function uitloggen(){
    window.location.href = "http://" + server + "/sys/login.php?logout";
    alert("Anti cheat veranderd");
}
// !! anti cheat detectie

// Error geven als runnen en cokefabriek beide zijn aangevinkt
if (GM_getValue('runnen') && GM_getValue('CF')){
  alert("Je kunt niet, en runnen, en een cokefabriek hebben..");
}
// !! Error geven als runnen en cokefabriek beide zijn aangevinkt

// Goede vakjes aanvinken
if (GM_getValue('misdaden') != ""){
  value[GM_getValue('misdaden')] = "selected";
}

if (GM_getValue('auto')){
  checked0 = "CHECKED=CHECKED";
}

if (GM_getValue('rijles')){
  checked1 = "CHECKED=CHECKED";
}

if (GM_getValue('schieten')){
  checked2 = "CHECKED=CHECKED";
}

if (GM_getValue('runnen')){
  checked3 = "CHECKED=CHECKED";
}
if (GM_getValue('CF')){
  checked4 = "CHECKED=CHECKED";
}
if (GM_getValue('wachtmetverkopen')){
  checked5 = "CHECKED=CHECKED";
}
if (GM_getValue('junks')){
  waarde[GM_getValue('junks')] = "selected";
}
if (!GM_getValue('banken') || (GM_getValue("banken") == "")){
  value[3] = "niet banken";
}
else{
  value[3] = GM_getValue('banken');
}

// !! Goede vakjes aanvinken

// Inhoud van de div instellen
cheatdiv.innerHTML = "<div class=\"menu_block\"><div class=\"menu_header\">Cheater</div><div class=\"menu_items\"><ul>    <li><a TITLE=\"Stel hier in welke misdaad je wilt doen.\">Misdaden</a> <select id=misdaden>        <option value=0 " + value[0] + ">Nee</option>        <option value=1 " + value[1] + ">Makkelijk</option>        <option value=2 " + value[2] + ">Moeilijk</option>    </select></li>    <br />    <li><a>Auto\'s jatten</a> <input type=checkbox id=auto " + checked0 + " /></li>    <br />  <li><a>Rijlessen</a> <input type=checkbox id=rijles " + checked1 + " /></li>    <br /> <li><a>Schieten</a> <input type=checkbox id=schieten " + checked2 + " /></li>    <br />  <li><a>Runnen</a> <input type=checkbox id=runnen " + checked3 + " /></li>    <br />  <li><a>Cokefabriek</a> <input type=checkbox id=CF " + checked4 + " /></li>  <br />  <li><a>Geld op zak</a> <input type=text size=7 id=geld value=" + value[3] + " /></li>    <br />  <li><a>Junkies</a> <select id=jmanagement><option value=0>Nee</option><option value=3 " + waarde[3] +">Rekruteren</option><option value=4 " + waarde[4] + ">Verdienen</option></select></li><br><li><button id=pauze>Pauze</button></li></ul></div></div>";
// !! Inhoud van de div instellen

// Inputs van de gebruiker in de gaten houden
misdadenselect = document.getElementById('misdaden');
misdadenselect.addEventListener("change", misdaden, false);
autobox = document.getElementById('auto');
autobox.addEventListener("click", auto, false);
rijlesbox = document.getElementById('rijles');
rijlesbox.addEventListener("click", rijles, false);
schietbox = document.getElementById('schieten');
schietbox.addEventListener("click", schieten, false);
runbox = document.getElementById('runnen');
runbox.addEventListener("click", runnen, false);
cfbox = document.getElementById('CF');
cfbox.addEventListener("click", cokefabriek, false);
geldtext = document.getElementById('geld');
geldtext.addEventListener("keyup", banken, false);
junkselect = document.getElementById('jmanagement');
junkselect.addEventListener("change", junks, false);
pauzeknop = document.getElementById('pauze');
pauzeknop.addEventListener("click", pauze, false);
// !! Inputs van de gebruiker in de gaten houden

// Functies voor het opslaan van gegevens
function misdaden(){
  GM_setValue('misdaden', misdadenselect.value);
}
function auto(){
  GM_setValue('auto', autobox.checked);
}
function rijles(){
  GM_setValue('rijles', rijlesbox.checked);
}
function schieten(){
  GM_setValue('schieten', schietbox.checked);
}
function runnen(){
  GM_setValue('runnen', runbox.checked);
}
function wachten(){
  GM_setValue('wachtmetverkoop', wachtbox.checked);
}
function cokefabriek(){
  GM_setValue('CF', cfbox.checked);
}
function banken(){
  if (!isInt(geldtext.value)){
    GM_setValue('banken', '');
  }
  else{
    totaan = parseInt(geldtext.value);
    GM_setValue('banken', totaan);
  }
}
function junks(){
  junknummer = parseInt(junkselect.value);
  GM_setValue('junks', junknummer);
}
// !! Functies voor het opslaan van gegevens
// Headers opvangen
div = document.getElementsByTagName("div");

if (url == "http://" + server + "/crime/deal_drugs.php"){
    i = 0;
    while (i < div.length){
        if (div[i].innerHTML.match("Deal succesvol afgerond!") == "Deal succesvol afgerond!" || div[i].innerHTML.match("Deal completed successfully!") == "Deal completed successfully!"){
            GM_setValue('voorraad', 0);
        }
        i++;
    }
}
// !! Headers opvangen

// Tijden ophalen
i = 0;
if (url == "http://" + server + "/user/dashboard.php"){
  // Gezondheid checken

  if (isInt(GM_getValue('banken'))){
    if ((!GM_getValue('aantal')) || (GM_getValue('aantal') >= 250) && (GM_getValue('voorraad') != 1)){
        banken = true;
    }
    else {
        nr = GM_getValue('aantal');
        nr++;
        GM_setValue('aantal', nr);
    }
  }
  tds = document.getElementsByTagName('td');
  while (i < tds.length){
    if (tds[i].innerHTML.match("Gezondheid") == "Gezondheid" || tds[i].innerHTML.match("Health") == "Health"){
      i = i + 14;
      zoeken2 = tds[i].innerHTML.match("100%");
      if (zoeken2 != "100%"){
        gezondheid = true;
      }
    }
    i++;
  }
  if (GM_getValue("runnen") && (!GM_getValue("runmax"))){
    checkcokehoeveelheid = true;
  }
  // !! Gezondheid checken

  scripts = document.getElementsByTagName("script");
  i = 0;
  while (i < scripts.length){
    zoek = scripts[i].innerHTML.search("StartWaitCountdowns");
    if (zoek != "-1"){
      script = scripts[i].innerHTML;
    }
    i++;
  }
  i = 0;
  while (i < 12){
    teller = script.search("teller");
    script = script.substring(teller, script.length);
    puntkomma = script.search(";") + 1;

    sub = script.substring(0, puntkomma);
    tijd[i] = sub.replace(/[^0-9 -]+/g, '');

    script = script.substring(puntkomma ,script.length);
    i++;
  }
  // !! Tijden ophalen

  // Kijken wat kan/wat jij wilt doen
  i = 0;
  if (gezondheid){
    doen[i] = "ziekenhuis";
    i++;
  }
  if (banken == true){
    doen[i] = "banken";
    i++;
  }
  if (checkcokehoeveelheid == true){
    doen[i] = "voorraadwegwerken";
    i++;
  }
  if (tijd[0] < 0 && GM_getValue('misdaden') != 0){
    doen[i] = "misdaad";
    i++;
  }

  if (tijd[1] < 0 && GM_getValue('auto')){
    doen[i] = "auto";
    i++;
  }
  if (tijd[2] < 0 && GM_getValue('schieten')){
    doen[i] = "schieten";
    i++;
  }
  if (tijd[8] < 0 && GM_getValue('runnen') && GM_getValue('voorraad') != 1 && GM_getValue('runmax') > 14){
    doen[i] = "runnen";
    i++;
  }
  if (GM_getValue('runnen') && GM_getValue('voorraad') == 1 && (!GM_getValue('wachtmetverkopen'))){
    doen[i] = "voorraadwegwerken";
    i++;
  }
  if (GM_getValue('runnen') && GM_getValue('voorraad') == 1 && GM_getValue('wachtmetverkopen') && (GM_getValue('tijdvoorverkopen') < Number(Date()))){
    doen[i] = "voorraadwegwerken";
    i++;
  }  
  if (tijd[10] < 0 && GM_getValue('rijles')){
    doen[i] = "rijles";
    i++;
  }

  if (!GM_getValue('kooptijd')){
    GM_setValue('kooptijd', 0);
  }
  if ((Number(new Date()) > GM_getValue('kooptijd')) && (GM_getValue('CF'))){
    doen[i] = "cokekopen";
    i++;
  }
  if ((Number(new Date()) > GM_getValue('junksbijwerken')) && (GM_getValue('junks'))){
     doen[i] = "junks";
     i++;
  } 
  // !! Kijken wat kan/wat jij wilt doen

  // Random iets uitkiezen om te doen en naar de pagina gaan
  i--;
  rand = Math.random();
  rand = Math.round(rand * i);

  if (doen[rand] == "ziekenhuis"){
      window.location.href = "http://" + server + "/cw/hospital.php";
  }
  if (doen[rand] == "misdaad"){
    if (GM_getValue('misdaden') == 1){
      window.location.href = "http://" + server + "/crime/light.php";
    }
    if (GM_getValue('misdaden') == 2){
      window.location.href = "http://" + server + "/crime/medium.php";
    }
  }
  if (doen[rand] == "auto"){
    window.location.href = "http://" + server + "/crime/gta.php";
  }
  if (doen[rand] == "schieten"){
    window.location.href = "http://" + server + "/crime/killpractice.php";
  }
  if (doen[rand] == "voorraadwegwerken"){
    window.location.href = "http://" + server + "/crime/deal_drugs.php";
  }
  if (doen[rand] == "runnen"){
    if (GM_getValue('voorraad') != 1){
      window.location.href = "http://" + server + "/business/coke-info.php";
    }
  }
  if (doen[rand] == "rijles"){
    window.location.href = "http://" + server + "/crime/drivinglesson.php";
  }
  if (doen[rand] == "cokekopen"){
    window.location.href = "http://" + server + "/business/coke.php";
  }
  if (doen[rand] == "junks"){
    window.location.href = "http://" + server + "/crime/junkies.php";
  }
  if (doen[rand] == "banken"){
    window.location.href = "http://" + server + "/user/cash.php";
  }
  // !! Random iets uitkiezen om te doen en naar de pagina gaan
}

random = (randomtijd - (Math.random() * 3000));
i = 0;
inputs = document.getElementsByTagName('input');
while (inputs[i].type == "hidden"){
    i++;
}
aantalhidden = i;
function klikknop0(){
    inputs[0 + aantalhidden].click();
}
function klikknop1(){
    inputs[1 + aantalhidden].click();
}
function klikknop2(){
    inputs[2 + aantalhidden].click();
}
function klikknop3(){
    inputs[3 + aantalhidden].click();
}
function klikknop4(){
    inputs[4 + aantalhidden].click();
}

if (url == "http://" + server + "/crime/light.php"  && inputs.length == 10 + aantalhidden  && GM_getValue('misdaden') == 1){
    inputs[2 + aantalhidden].click();
    setTimeout(klikknop3, random);
}
if (url == "http://" + server + "/crime/medium.php" && inputs.length == 10 + aantalhidden && GM_getValue('misdaden') == 2){
    inputs[2 + aantalhidden].click();
    setTimeout(klikknop3, random);
}
if (url == "http://" + server + "/crime/gta.php" && inputs.length == 9 + aantalhidden && GM_getValue('auto')){
    inputs[0 + aantalhidden].click();
    setTimeout(klikknop2, random);
}
if (url == "http://" + server + "/crime/killpractice.php" && inputs.length == 7 + aantalhidden && GM_getValue('schieten')){
    setTimeout(klikknop0, random);
}
if (url == "http://" + server + "/crime/drivinglesson.php" && inputs.length == 8 + aantalhidden && GM_getValue('rijles')){
    div = document.getElementsByTagName('td');
    i = 0;
    while (i < div.length){
        if (div[i].innerHTML.match("1.000.000 per les") == "1.000.000 per les"){
            GM_setValue('rijles', false);
            window.location.href = "http://" + server + "/user/dashboard.php";
        }
        i++;
    }
    if (GM_getValue('rijles')){
        setTimeout(klikknop0, random);
    }
}
if (url == "http://" + server + "/business/coke-info.php" && inputs.length == 8 + aantalhidden && GM_getValue('runnen')){
    coke = GM_getValue('runmax');
    td = document.getElementsByTagName('td');
    j = 0;
    while (j < td.length){
        if (td[j].innerHTML.match("voorraad") == "voorraad" || td[i].innerHTML.match("Coke in inventory") == "Coke in inventory"){
            j++;
            voorraad = td[j].innerHTML.replace(/[^0-9]+/g, '');
        }
        j++;
    }
    if (voorraad >= coke){
        inputs[0 + aantalhidden].value = coke;
        GM_setValue('voorraad', 1);
        setTimeout(klikknop1, random);
    }
    if ((voorraad < coke) && (voorraad != "0")){
        inputs[0 + aantalhidden].value = voorraad;
        GM_setValue('voorraad', 1);
        setTimeout(klikknop1, random);
    }
}
if (url == "http://" + server + "/crime/deal_drugs.php" && inputs.length == 8 + aantalhidden && GM_getValue('runnen')){
    td = document.getElementsByTagName('td');
    td = td[0].innerHTML;

    coke = td.search('kg coke');
    max = td.search('kg</i></a>');
    maxcoke = td.substring(coke, max);
    maxcoke = maxcoke.replace(/[^0-9]+/g, '');
    maxcoke = parseInt(maxcoke);
    GM_setValue('runmax', maxcoke);

    wiet = td.search('<b>');
    wiet2 = td.search('wiet');
    wiet = td.substring(wiet, wiet2);
    wiet = wiet.replace(/[^0-9]+/g, '');

    td = td.substring(wiet2, td.length);
    hasj = td.search('<b>');
    hasj2 = td.search('hasj');
    hasj = td.substring(hasj, hasj2);
    hasj = hasj.replace(/[^0-9]+/g, '');

    td = td.substring (hasj2, td.length);
    coke = td.search('<b>');
    coke2 = td.search('coke');
    coke = td.substring(coke, coke2);
    coke = coke.replace(/[^0-9]+/g, '');

    select = document.getElementsByTagName('select');
    select[0].value = 2;

    if (coke == 0){
        GM_setValue('voorraad', 0);
    }
    if (wiet > 0){
        select[1].value = 3;
        inputs[0 + aantalhidden].value = wiet;
        inputs[1 + aantalhidden].click();
    }
    if (hasj > 0){
        select[1].value = 1;
        inputs[0 + aantalhidden].value = hasj;
        inputs[1 + aantalhidden].click();
    }
    if (coke > 0){
        select[1].value = 2;
        inputs[0 + aantalhidden].value = coke;
        inputs[1 + aantalhidden].click();
    }
}
if (url == "http://" + server + "/cw/hospital.php" && inputs.length == 8 + aantalhidden){
    if (inputs[0 + aantalhidden].value != 0){
        setTimeout(klikknop1, random);
    }
}
if (url == "http://" + server + "/user/cash.php" && inputs.length == 10 + aantalhidden && isInt(GM_getValue('banken'))){
    tds = document.getElementsByTagName('td');
    j = 17;
    while(tds[j]){
        if (tds[j].innerHTML.indexOf("cash</a>") > -1){
            break;
        }
        j++;
    }
    cash = tds[j].innerHTML;
    if (cash.match("cash") == "cash"){
      teken = cash.search(">");
      cash = cash.substring(teken, cash.length);
      cash = cash.replace(/[^0-9]+/g, '');
    }
    GM_setValue('aantal', 1);
    if (isInt(cash)){
        if (cash > GM_getValue('banken')){
            inputs[1 + aantalhidden].click();
            banken = cash - GM_getValue('banken');
            inputs[2 + aantalhidden].value = banken;
            setTimeout(klikknop3, random);
        }
        if (cash < GM_getValue('banken')){
            banken = cash - GM_getValue('banken');
            banken = banken * -1;
            inputs[2 + aantalhidden].value = banken;
            setTimeout(klikknop3, random);
        }
    }
}
if (url == "http://" +server+ "/business/coke.php"){
    if (inputs[0 + aantalhidden].value == "Start inspectie & productie"){
        setTimeout(klikknop0, random);
        tijd = Number(new Date());
        over1uur = tijd + 3660000;
        over1uur = over1uur.toString();
        GM_setValue('kooptijd', over1uur);
    }
    else{
        tijd = Number(new Date());
        over5min = tijd + 300000;
        over5min = over5min.toString();
        GM_setValue('kooptijd', over5min);
    }
}
if (url == "http://" +server+ "/crime/junkies.php"){
    selects = document.getElementsByTagName("select");
    j = 0;
    while (j < selects.length){
        if (selects[j].name.match("junk") == "junk"){
            selects[j].value = GM_getValue('junks');
            setTimeout(klikknop0, random);
            
        }
        j++;
    }
    tijd = Number(new Date());
    over5min = tijd + 300000;
    over5min = over5min.toString();
    GM_setValue('junksbijwerken', over5min);
}