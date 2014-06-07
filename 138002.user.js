// ==UserScript==
// @name        draugiem_lv
// @namespace   mani_skripti
// @include     http://www.draugiem.lv/*
// @version     1
// ==/UserScript==

document.title = "Oranžais MegaPortāls";
var element, list, regexp, url = window.location, n, ID;

// Atrodam lietotāja ID numuru.
element = document.getElementById("logout");
element = element.lastChild;
ID = element.href.substring(element.href.indexOf('=')+1);

// Novācam tādas reklāmaas kā <div id="adv229" class="adv "></div>.
var result = document.evaluate("//div[starts-with(@id,'adv')]", document, null,
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
regexp = new RegExp("adv\d*");
for (var i = 0; i < result.snapshotLength; i++) {
    element = result.snapshotItem(i);
    if (regexp.test(element.id)) {
        element.parentNode.removeChild(element); } }

// Draugiem.lv logo un paziņojums "Tev nav kredītu" (ekrāna augšējā kreisā stūrī)
element = document.getElementById('headings');
element.parentNode.removeChild(element);
// "Neredzamības actiņa" (ekrāna augšējā labā stūrī)
element = document.getElementById('invisibility');
element.parentNode.removeChild(element);
// Dažas augšējā menu sadaļas, kuras mani neinteresē
element = document.getElementById('menuApp');
element = element.parentNode;
var saraksts = [8,7,6,4,2,1]; // 0 ir "mājiņa", 1 ir galerijas, 2 ir aplikācijas, utt.
for (var i = 0; i < saraksts.length; i++) {
    element.removeChild(element.childNodes[saraksts[i]*2+1]); }

// Lapas apakša
element = document.getElementById('footer');
element.parentNode.removeChild(element);
element = document.getElementById('skinFootWrap');
element.parentNode.removeChild(element);

// Sākuma lapa. Viss ekrāna vidējā daļā - random cilvēki (draugi, draugu draugi u.c.), reklāmas un "Runā"
if (url == 'http://www.draugiem.lv/') {
    element = document.getElementById('ct'); element.parentNode.removeChild(element); }
// Sākuma lapa, profila lapa. Viss ekrāna labajā pusē - top linki, ieteikumi u.c.
if (url == 'http://www.draugiem.lv/' || url == ('http://www.draugiem.lv/user/'+ID+'/')) {
    element = document.getElementById('rt'); element.parentNode.removeChild(element); }
// Sejiņa virs profila bildes
element = document.getElementById('fpemo');
if (element != null) {
    element.parentNode.removeChild(element); }

// Labās puses apakša dažādām draugiem.lv sadaļām
element = document.getElementById('lt');
if (element != null) {
    regexp = new RegExp("http://www.draugiem.lv/(music/.*|groups/|friends/|messages/)");
    if (regexp.test(url)) {
        while (element.childNodes.length > 3) {
            element.removeChild(element.lastChild); } } }

// Mūziķu pļāpas un Top 10 mūzikas sadaļā
if (url == 'http://www.draugiem.lv/music/' || url == 'http://www.draugiem.lv/music/?t=1') {
    element = document.getElementById('actual-left');
    element.parentNode.removeChild(element);
    element = document.getElementById('actual-right');
    element.parentNode.removeChild(element); }

// Dienas aktīvākās grupas un jaunākās grupas domubiedru katalogā.
if (url == 'http://www.draugiem.lv/groups/?t=2') {
    list = document.getElementsByClassName('left col');
    if (list.length > 0) {
        list[0].parentNode.removeChild(list[0]); }
    list = document.getElementsByClassName('right col');
    if (list.length > 0) {
        list[0].parentNode.removeChild(list[0]); } }