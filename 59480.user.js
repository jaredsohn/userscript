// ==UserScript==
// @name           NL Cheater V8
// @namespace      Alex Willemsen
// @include        http://www*.camorraworld.nl/*
// @exclude        http://www*.camorraworld.nl/casino/*
// ==/UserScript==

// Variabelen
var checked0, checked1, checked2, checked3, checked4, random, gezondheid;
var value = new Array();
var tijd = new Array();
var doen = new Array();
var links = new Array();
randomtijd = (Math.random() * 8000) + 12000;
i = 0;
var url = location.href;
var server = location.hostname;

function isInt(x) {
   var y=parseInt(x);
   if (isNaN(y)) return false;
   return x==y && x.toString()==y.toString();
}

if (isInt(GM_getValue('banken'))){
    if (!GM_getValue('aantal') || GM_getValue('aantal') >= 250 && GM_getValue('voorraad') != 1){
        window.location.href = "http://" + server + "/user/cash.php";
    }
    else {
        nr = GM_getValue('aantal');
        nr++;
        GM_setValue('aantal', nr);
    }
}

// !! Variabelen

stats = setTimeout(naarstats, randomtijd);

// Functies
function pauze(){
    clearTimeout(stats);
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
if (!GM_getValue('banken')){
   value[3] = "niet banken";
}
else{
    value[3] = GM_getValue('banken');
}
// !! Goede vakjes aanvinken

// Inhoud van de div instellen
cheatdiv.innerHTML = "<div class=\"menu_block\"><div class=\"menu_header\">Cheater</div><div class=\"menu_items\"><ul>    <li><a TITLE=\"Stel hier in welke misdaad je wilt doen.\">Misdaden</a> <select id=misdaden>        <option value=0 " + value[0] + ">Nee</option>        <option value=1 " + value[1] + ">Makkelijk</option>        <option value=2 " + value[2] + ">Moeilijk</option>    </select></li>    <br />    <li><a>Auto\'s jatten</a> <input type=checkbox id=auto " + checked0 + " /></li>    <br />  <li><a>Rijlessen</a> <input type=checkbox id=rijles " + checked1 + " /></li>    <br /> <li><a>Schieten</a> <input type=checkbox id=schieten " + checked2 + " /></li>    <br />  <li><a>Runnen</a> <input type=checkbox id=runnen " + checked3 + " /></li>    <br />  <li><a>Cokefabriek</a> <input type=checkbox id=CF " + checked4 + " /></li>  <br />  <li><a>Geld op zak:</a> <input type=text id=geld size=7 value=" + value[3] + " /></li>    <br />  <li><button id=pauze>Pauze</button></li>    </ul></div></div>";
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
function cokefabriek(){
  GM_setValue('CF', cfbox.checked);
}
function banken(){
  totaan = parseInt(geldtext.value);
  GM_setValue('banken', totaan);
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
  if (GM_getValue('runnen') && GM_getValue('voorraad') == 1){
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
  // !! Random iets uitkiezen om te doen en naar de pagina gaan
}

random = (Math.random() * 8000) + 2000;

function klikknop0(){
    inputs[0].click();
}
function klikknop1(){
    inputs[1].click();
}
function klikknop2(){
    inputs[2].click();
}
function klikknop3(){
    inputs[3].click();
}
function klikknop4(){
    inputs[4].click();
}
inputs = document.getElementsByTagName('input');
if (url == "http://" + server + "/crime/light.php"  && inputs.length == 10  && GM_getValue('misdaden') == 1){
    inputs[2].click();
    setTimeout(klikknop3, random);
}
if (url == "http://" + server + "/crime/medium.php" && inputs.length == 10 && GM_getValue('misdaden') == 2){
    inputs[2].click();
    setTimeout(klikknop3, random);
}
if (url == "http://" + server + "/crime/gta.php" && inputs.length == 9 && GM_getValue('auto')){
    inputs[0].click();
    setTimeout(klikknop2, random);
}
if (url == "http://" + server + "/crime/killpractice.php" && inputs.length == 7 && GM_getValue('schieten')){
    setTimeout(klikknop0, random);
}
if (url == "http://" + server + "/crime/drivinglesson.php" && inputs.length == 8 && inputs[0].type == "hidden" && GM_getValue('rijles')){
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
        setTimeout(klikknop1, random);
    }
}
if (url == "http://" + server + "/business/coke-info.php" && inputs.length == 8 && GM_getValue('runnen')){
    coke = GM_getValue('runmax');
    td = document.getElementsByTagName('td');
    i = 0;
    while (i < td.length){
        if (td[i].innerHTML.match("voorraad") == "voorraad" || td[i].innerHTML.match("Coke in inventory") == "Coke in inventory"){
            i++;
            voorraad = td[i].innerHTML.replace(/[^0-9]+/g, '');
        }
        i++;
    }
    if (voorraad >= coke){
        inputs[0].value = coke;
        GM_setValue('voorraad', 1);
        setTimeout(klikknop1, random);
    }
    if ((voorraad < coke) && (voorraad != "0")){
        inputs[0].value = voorraad;
        GM_setValue('voorraad', 1);
        setTimeout(klikknop1, random);
    }
}
if (url == "http://" + server + "/crime/deal_drugs.php" && inputs.length == 8 && GM_getValue('runnen')){
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
        inputs[0].value = wiet;
        inputs[1].click();
    }
    if (hasj > 0){
        select[1].value = 1;
        inputs[0].value = hasj;
        inputs[1].click();
    }
    if (coke > 0){
        select[1].value = 2;
        inputs[0].value = coke;
        inputs[1].click();
    }
}
if (url == "http://" + server + "/cw/hospital.php" && inputs.length == 8){
    if (inputs[0].value != 0){
        setTimeout(klikknop1, random);
    }
}
if (url == "http://" + server + "/user/cash.php" && inputs.length == 11 && isInt(GM_getValue('banken'))){
    tds = document.getElementsByTagName('td');
    cash = tds[18].innerHTML;
    if (cash.match("cash") == "cash"){
      cash = cash.replace(/[^0-9]+/g, '');
    }
    GM_setValue('aantal', 1);
    if (isInt(cash)){
        if (cash > GM_getValue('banken')){
            inputs[2].click();
            banken = cash - GM_getValue('banken');
            inputs[3].value = banken;
            setTimeout(klikknop4, random);
        }
        if (cash < GM_getValue('banken')){
            banken = cash - GM_getValue('banken');
            banken = banken * -1;
            inputs[3].value = banken;
            setTimeout(klikknop4, random);
        }
    }
}
if (url == "http://" +server+ "/business/coke.php"){
    if (inputs[0].value == "Start inspectie & productie"){
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