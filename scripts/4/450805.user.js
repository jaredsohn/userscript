// ==UserScript==
// @name           HWM_AH_Helper
// @author         Рианти
// @description    Скрипт упрощает выставление лотов на рынке
// @version        1.1
// @homepage       http://userscripts.org/scripts/show/450805
// @include        http://www.heroeswm.ru/auction_new_lot.php
// ==/UserScript==

//====Init Vars====//
var artsArray = { 'leatherhat' : 'helm', 'leather_helm' : 'helm', 'wizard_cap' : 'helm', 'chain_coif' : 'helm', 'necrohelm2' : 'helm', 'xymhelmet15' : 'helm', 'mhelmetzh13' : 'helm', 'hunter_roga1' : 'helm', 'mif_lhelmet' : 'helm', 'tj_helmet3' : 'helm', 'zxhelmet13' : 'helm', 'shelm12' : 'helm', 'steel_helmet' : 'helm', 'mif_hhelmet' : 'helm', 'tj_helmet1' : 'helm', 'shelm16' : 'helm', 'gm_hat' : 'helm', 'tj_helmet2' : 'helm', 'sh_helmet' : 'helm', 'lizard_helm' : 'helm', 'mage_helm' : 'helm', 'hunter_helm' : 'helm', 'ogre_helm' : 'helm', 'orc_hat' : 'helm', 'shelm8' : 'helm', 'myhelmet15' : 'helm', 'helmet17' : 'helm', 'necrohelm3' : 'helm', 'necrohelm1' : 'helm', 'mhelmet17' : 'helm', 'knowledge_hat' : 'helm', 'hunter_hat1' : 'helm', 'wzzamulet16' : 'necklace', 'gm_amul' : 'necklace', 'mmzamulet16' : 'necklace', 'smamul17' : 'necklace', 'sh_amulet2' : 'necklace', 'hunter_amulet1' : 'necklace', 'bafamulet15' : 'necklace', 'amulet_of_luck' : 'necklace', 'samul14' : 'necklace', 'wzzamulet13' : 'necklace', 'sharik' : 'necklace', '5years_star' : 'necklace', 'zub' : 'necklace', 'warrior_pendant' : 'necklace', 'mamulet19' : 'necklace', 'power_pendant' : 'necklace', 'hunter_pendant1' : 'necklace', 'amulet19' : 'necklace', 'magic_amulet' : 'necklace', 'bravery_medal' : 'necklace', 'mmzamulet13' : 'necklace', 'snowjinka' : 'necklace', 'sosulka' : 'necklace', 'samul17' : 'necklace', 'smamul14' : 'necklace', '2year_amul_lords' : 'necklace', '7ka' : 'necklace', '3year_amul' : 'necklace', 'rog_demon' : 'necklace', 'samul8' : 'necklace', '4year_klever' : 'necklace', 'hauberk' : 'cuirass', 'gm_arm' : 'cuirass', 'sh_armor' : 'cuirass', 'hunter_armor1' : 'cuirass', 'tjarmor2' : 'cuirass', 'armor15' : 'cuirass', 'marmor17' : 'cuirass', 'lizard_armor' : 'cuirass', 'sarmor16' : 'cuirass', 'armor17' : 'cuirass', 'leather_shiled' : 'cuirass', 'leatherplate' : 'cuirass', 'mif_light' : 'cuirass', 'tjarmor3' : 'cuirass', 'sarmor9' : 'cuirass', 'miff_plate' : 'cuirass', 'sarmor13' : 'cuirass', 'mage_armor' : 'cuirass', 'robewz15' : 'cuirass', 'wiz_robe' : 'cuirass', 'hunter_jacket1' : 'cuirass', 'ciras' : 'cuirass', 'full_plate' : 'cuirass', 'tjarmor1' : 'cuirass', 'cloack17' : 'cloack', 'cloackwz15' : 'cloack', 'scloack8' : 'cloack', 'gm_protect' : 'cloack', 'sh_cloak' : 'cloack', 'hunter_mask1' : 'cloack', 'soul_cape' : 'cloack', 'wiz_cape' : 'cloack', 'scloack16' : 'cloack', 'powercape' : 'cloack', 'scoutcloack' : 'cloack', 'antiair_cape' : 'cloack', 'antimagic_cape' : 'cloack', 'antifire_cape' : 'cloack', 'sunart2' : 'weapon', 'staff' : 'weapon', 'sword18' : 'weapon', 'wood_sword' : 'weapon', 'long_bow' : 'weapon', 'dubina' : 'weapon', 'ogre_bum' : 'weapon', 'gdubina' : 'weapon', 'gm_kastet' : 'weapon', 'hunterdagger' : 'weapon', 'tunnel_kirka' : 'weapon', 'bludgeon' : 'weapon', 'sunart1' : 'weapon', 'kopie' : 'weapon', 'sh_spear' : 'weapon', 'pika' : 'weapon', 'shortbow' : 'weapon', 'dem_kosa' : 'weapon', 'huntersword2' : 'weapon', 'gnome_hammer' : 'weapon', 'gm_abow' : 'weapon', 'goblin_bow' : 'weapon', 'sh_bow' : 'weapon', 'centaurbow' : 'weapon', 'hunter_bow2' : 'weapon', 'hunter_bow1' : 'weapon', 'bow14' : 'weapon', 'bow17' : 'weapon', 'scroll18' : 'weapon', 'gm_sword' : 'weapon', 'power_sword' : 'weapon', 'sunart3' : 'weapon', 'requital_sword' : 'weapon', 'firsword15' : 'weapon', 'ssword16' : 'weapon', 'ssword8' : 'weapon', 'sh_sword' : 'weapon', 'ssword10' : 'weapon', 'sunart4' : 'weapon', 'dem_dmech' : 'weapon', 'broad_sword' : 'weapon', 'def_sword' : 'weapon', 'blacksword' : 'weapon', 'blacksword1' : 'weapon', 'slayersword' : 'weapon', 'mif_sword' : 'weapon', 'mif_staff' : 'weapon', 'molot_tan' : 'weapon', 'ssword13' : 'weapon', 'mstaff13' : 'weapon', 'mstaff8' : 'weapon', 'smstaff16' : 'weapon', 'staff18' : 'weapon', 'sor_staff' : 'weapon', 'ffstaff15' : 'weapon', 'mstaff10' : 'weapon', 'mm_sword' : 'weapon', 'mm_staff' : 'weapon', 'hunterdsword' : 'weapon', 'energy_scroll' : 'weapon', 'composite_bow' : 'weapon', 'steel_blade' : 'weapon', 'hunter_sword1' : 'weapon', 'dem_dtopor' : 'weapon', 'orc_axe' : 'weapon', 'topor_skelet' : 'weapon', 'sea_trident' : 'weapon', 'large_shield' : 'shield', 'round_shiled' : 'shield', 'tj-shield3' : 'shield', 'shield13' : 'shield', 's_shield' : 'shield', 'ru_statue' : 'shield', 'tj-shield1' : 'shield', 'gm_defence' : 'shield', 'tj-shield2' : 'shield', 'dragon_shield' : 'shield', 'sh_shield' : 'shield', 'huntershield2' : 'shield', 'hunter_shield1' : 'shield', 'shield16' : 'shield', 'shield19' : 'shield', 'sshield5' : 'shield', 'sshield11' : 'shield', 'defender_shield' : 'shield', 'sshield14' : 'shield', 'boots2' : 'boots', 'leatherboots' : 'boots', 'hunter_boots' : 'boots', 'mif_lboots' : 'boots', 'tj_vboots3' : 'boots', 'hunter_boots3' : 'boots', 'boots13' : 'boots', 'sboots12' : 'boots', 'sboots16' : 'boots', 'gm_spdb' : 'boots', 'tj_vboots2' : 'boots', 'sh_boots' : 'boots', 'lizard_boots' : 'boots', 'hunter_boots2' : 'boots', 'hunter_boots1' : 'boots', 'boots15' : 'boots', 'boots17' : 'boots', 'mboots17' : 'boots', 'mboots14' : 'boots', 'sboots9' : 'boots', 'steel_boots' : 'boots', 'shoe_of_initiative' : 'boots', 'wiz_boots' : 'boots', 'mif_hboots' : 'boots', 'tj_vboots1' : 'boots', 'warring13' : 'ring', 'gm_rring' : 'ring', 'ring19' : 'ring', 'wwwring16' : 'ring', 'warriorring' : 'ring', 'ring2013' : 'ring', 'mmmring16' : 'ring', 'i_ring' : 'ring', 'gm_sring' : 'ring', 'sh_ring1' : 'ring', 'hunter_ring2' : 'ring', 'smring10' : 'ring', 'mring19' : 'ring', 'circ_ring' : 'ring', 'hunter_ring1' : 'ring', 'powerring' : 'ring', 'bring14' : 'ring', 'sring4' : 'ring', 'sh_ring2' : 'ring', 'doubt_ring' : 'ring', 'rashness_ring' : 'ring', 'darkring' : 'ring', 'sring17' : 'ring', 'verve_ring' : 'ring', 'smring17' : 'ring', 'magring13' : 'ring', 'sring10' : 'ring', '6ring' : 'ring', 'thief_paper' : 'other', 'hunter_gloves1' : 'other', 'gm_3arrows' : 'other', 'sh_4arrows' : 'other', 'hunter_arrows1' : 'other', 'thief_neckl' : 'thief', 'tm_amulet' : 'thief', 'thief_arb' : 'thief', 'tm_arb' : 'thief', 'thief_goodarmor' : 'thief', 'tm_armor' : 'thief', 'thief_ml_dagger' : 'thief', 'tm_knife' : 'thief', 'tm_mring' : 'thief', 'ring_of_thief' : 'thief', 'tm_wring' : 'thief', 'thief_msk' : 'thief', 'tm_msk' : 'thief', 'thief_cape' : 'thief', 'tm_cape' : 'thief', 'thief_fastboots' : 'thief', 'tm_boots' : 'thief', 'tact1w1_wamulet' : 'tactic', 'tactcv1_armor' : 'tactic', 'tactsm0_dagger' : 'tactic', 'tactspw_mring' : 'tactic', 'tactwww_wring' : 'tactic', 'tact765_bow' : 'tactic', 'tactms1_mamulet' : 'tactic', 'tactpow_cloack' : 'tactic', 'tactmag_staff' : 'tactic', 'tactzl4_boots' : 'tactic', 'tactaz_axe' : 'tactic', 'tacthapp_helmet' : 'tactic', 'tactdff_shield' : 'tactic', 'v_1armor' : 'verb', 'verb11_sword' : 'verb', 'verbboots' : 'verb', 've_helm' : 'verb', 'vrb_shild' : 'verb' }
var elementsTable = { 'EL_42' : 'abrasive', 'EL_43' : 'snake_poison', 'EL_46' : 'tiger_tusk', 'EL_44' : 'ice_crystal', 'EL_45' : 'moon_stone', 'EL_40' : 'fire_crystal', 'EL_37' : 'meteorit', 'EL_41' : 'witch_flower', 'EL_39' : 'wind_flower', 'EL_78' : 'fern_flower', 'EL_38' : 'badgrib' };

if(GM_getValue("AH_Helper_Setting_1") == null) GM_setValue("AH_Helper_Setting_1", 2);
if(GM_getValue("AH_Helper_Setting_2") == null) GM_setValue("AH_Helper_Setting_2", 2);
if(GM_getValue("AH_Helper_Setting_3") == null) GM_setValue("AH_Helper_Setting_3", 1);
if(GM_getValue("AH_Helper_Setting_4") == null) GM_setValue("AH_Helper_Setting_4", 1);

var artsToShow = 3;
//=================//

//====AJAX functions====//
function getPageContent(url)
{
    var xmlhttp = get_xmlHttp();
    xmlhttp.open("GET", url, false);
    xmlhttp.overrideMimeType('text/plain; charset=windows-1251');
    xmlhttp.send(null);
    if(xmlhttp.status == 200)
        return xmlhttp.responseText;
    return '';
}
function get_xmlHttp()
{
    var xmlhttp;
    try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch(e){
        try{ xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
        catch(e){ xmlhttp = false; }
    }
    if(!xmlhttp && typeof XMLHttpRequest != 'undefined')
    { xmlhttp = new XMLHttpRequest(); }
    return xmlhttp;
}
//======================//
//====Script Logic====//
function selectionChanged(){
    var artName = select.options[select.selectedIndex].value;
    var artData = select.options[select.selectedIndex].text;
    artSelected(artName, artData);
}
function artSelected(artName, artData){
    if(elementsTable[artName] != null){
        var temp = artData.split(' ');
        var quantity = (temp[temp.length-1].split('(')[1]).split(')')[0];
        elementSelected(elementsTable[artName], quantity);
    }
    else {
        artName = artName.split('@')[0];
        if(artsArray[artName] == null) return;
        var itemParseRegexp = /.* (\d+)\/(\d+)( \((\d+)\)|)/;
        var data = artData.match(itemParseRegexp);
        var dur1 = data[1]; var dur2 = data[2];
        var quantity = 1; if (data[4] != null) quantity = data[4];
        ammunitionSelected(artName, dur1, dur2, quantity);
    }
}
function elementSelected(element, quantity){
    var countField = document.getElementsByName("count")[0];
    if(quantity > 10) countField.value = 10;
    else countField.value = quantity;
    var arts = findOffersForElement(element);
    if(arts.length == 0) {
        showNoArtsFound();
        return;
    }
    arts.sort(comparePrice);
    msgBox1.innerHTML = "<b>Лоты конкурентов:</b>";
    var numerator = artsToShow, htmlOutput = "", bestPrice;
    for (var id in arts){
        if(numerator == artsToShow){
            bestPrice = arts[id].price;
        }
        if(numerator-- == 0) break;
        htmlOutput += presentElementsOffer(arts[id]);
        if (numerator > 0) htmlOutput += "<br>";
    }
    msgBox2.innerHTML = htmlOutput;

    var priceField = document.getElementsByName("price")[0];
    priceField.value = bestPrice - GM_getValue("AH_Helper_Setting_3");
}
function ammunitionSelected(artName, artDur1, artDur2, quantity){
    var countField = document.getElementsByName("count")[0];
    if(quantity > 3) countField.value = 3;
    else countField.value = quantity;
    var marketOffers = findOffersForArt(artName);
    var arts = [];
    for (var offer in marketOffers){
        if(GM_getValue("AH_Helper_Setting_2") == 2){
            if(marketOffers[offer].dur1 != artDur1 || marketOffers[offer].dur2 != artDur2) continue;
        }
        arts[offer] = marketOffers[offer];
    }
    if(arts.length == 0) {
        showNoArtsFound();
        return;
    }
    arts.sort(comparePPB);
    msgBox1.innerHTML = "<b>Лоты конкурентов:</b>";
    var numerator = artsToShow, htmlOutput = "", bestPPB, bestPrice;
    for (var id in arts){
        if(numerator == artsToShow){
            bestPPB = arts[id].ppb;
            bestPrice = arts[id].price;
        }
        if(numerator-- == 0) break;
        htmlOutput += presentAmmunitionOffer(arts[id]);
        if (numerator > 0) htmlOutput += "<br>";
    }
    msgBox2.innerHTML = htmlOutput;

    var priceField = document.getElementsByName("price")[0];
    if(GM_getValue("AH_Helper_Setting_1") == 2){
        if(GM_getValue("AH_Helper_Setting_2") == 1) {
            priceField.value = Math.floor(artDur1 * bestPPB) - GM_getValue("AH_Helper_Setting_3");
        } else {
            priceField.value = bestPrice - GM_getValue("AH_Helper_Setting_3");
        }
    } else{
        priceField.value = artDur1 * Math.floor((bestPPB - GM_getValue("AH_Helper_Setting_3")));
    }
}
function findOffersForArt(artName){
    var artCategory = artsArray[artName];
    var artAHurl = 'http://www.heroeswm.ru/auction.php?cat=' + artCategory + '&sort=4&type=0&art_type=' + artName + '&sbn=1&sau=0';
    var page = getPageContent(artAHurl);
    var lotRegexp = /<a href="art_info\.php\?id=[\s\S]+?Прочность: (\d+?)\/(\d+?)".+?(|<b>(\d) шт\.<\/b>)<\/td><\/tr><\/table>.+?alt=""><\/td><td>([,\d]+?)<\/td><\/tr>.+?<\/table><\/td><td>(.*?) <\/td>.+?(<a class=pi href="pl_info\.php\?id=\d+?"><b>.+?<\/b><\/a>)<BR>/g;
    var match, offers = [], quantity, price;
    while (match = lotRegexp.exec(page))
    {
        quantity = 1;
        if(match[4] != null) quantity = match[4];
        price = parseInt(deleteAll(match[5], ','));
        offers.push({'dur1' : match[1], 'dur2' : match[2], 'quantity' : quantity, 'price' : price, 'priceString' : match[5], 'length' : match[6], 'owner' : match[7], 'ppb' : Math.round(10 * price / parseInt(match[1])) / 10});
    }
    return offers;
}
function findOffersForElement(elementName){
    var artAHurl = 'http://www.heroeswm.ru/auction.php?cat=elements&sort=4&type=0&art_type=' + elementName + '&sbn=1&sau=0';
    var page = getPageContent(artAHurl);
    var lotRegexp = /\[i\]<\/a><\/b><BR><b>(\d+?) шт\.<\/b><\/td>.*?"Золото" alt=""><\/td><td>([,\d]+?)<\/td><\/tr>.*?<\/tr><\/table><\/td><td>(.+?) <\/td><td valign=top.*?(<a class=pi href="pl_info\.php\?id=\d+?"><b>.*?<\/b><\/a>)<BR>/g
    var match, offers = [];
    while (match = lotRegexp.exec(page))
    {
        offers.push({'quantity' : match[1], 'price' : parseInt(deleteAll(match[2], ',')), 'priceString' : match[2], 'length' : match[3], 'owner' : match[4]});
    }
    return offers;
}
function presentAmmunitionOffer(offer){
    return 'Цена за бой: ' + offer.ppb + ' Цена: ' + offer.priceString + ' Прочность: ' + offer.dur1 + '/' + offer.dur2 + ' Кол-во: ' + offer.quantity + ' Длительность: ' + offer.length + ' Владелец: ' + offer.owner;
}
function presentElementsOffer(offer){
    return 'Цена: ' + offer.priceString + ' Кол-во: ' + offer.quantity + ' Длительность: ' + offer.length + ' Владелец: ' + offer.owner;
}
function comparePPB(a, b) {
    if (a.ppb < b.ppb)
        return -1;
    if (a.ppb > b.ppb)
        return 1;
    return 0;
}
function comparePrice(a, b) {
    if (a.price < b.price)
        return -1;
    if (a.price > b.price)
        return 1;
    return 0;
}
function deleteAll(string, valToDel){
    return string.split(valToDel).join('');
}
function showNoArtsFound(){
    alert("Подобных артефактов на рынке не найдено.");
}
//====================//

//====UI====//
var ss1 = document.createElement("input"); ss1.type = "radio"; ss1.name = "DiscountType"; ss1.value = 1; if(GM_getValue("AH_Helper_Setting_1") == 1) ss1.checked = true; ss1.onchange = function(){GM_setValue("AH_Helper_Setting_1", 1); selectionChanged();};
var ss2 = document.createElement("input"); ss2.type = "radio"; ss2.name = "DiscountType"; ss2.value = 2; if(GM_getValue("AH_Helper_Setting_1") == 2) ss2.checked = true; ss2.onchange = function(){GM_setValue("AH_Helper_Setting_1", 2); selectionChanged();};
var ss3 = document.createElement("input"); ss3.type = "radio"; ss3.name = "CompetitorFilterType"; ss3.value = 1; if(GM_getValue("AH_Helper_Setting_2") == 1) ss3.checked = true; ss3.onchange = function(){GM_setValue("AH_Helper_Setting_2", 1); selectionChanged();};
var ss4 = document.createElement("input"); ss4.type = "radio"; ss4.name = "CompetitorFilterType"; ss4.value = 2; if(GM_getValue("AH_Helper_Setting_2") == 2) ss4.checked = true; ss4.onchange = function(){GM_setValue("AH_Helper_Setting_2", 2); selectionChanged();};
var ss5 = document.createElement("input"); ss5.type = "text"; ss5.name = "DiscountValue"; ss5.size = "2"; ss5.value = GM_getValue("AH_Helper_Setting_3"); ss5.onchange = function(){GM_setValue("AH_Helper_Setting_3", ss5.value); selectionChanged();};

var ssLabel0 = document.createElement("b"); ssLabel0.style="font-size:12px;"; ssLabel0.innerHTML = "Настройки скрипта<br><br>";
var ssLabel1 = document.createElement("i"); ssLabel1.style="font-size:12px;"; ssLabel1.innerHTML = "Выставление цены со скидкой: снижение цены за бой<br>";
var ssLabel2 = document.createElement("i"); ssLabel2.style="font-size:12px;"; ssLabel2.innerHTML = "Выставление цены со скидкой: снижение конечной цены артефакта<br><br>";
var ssLabel3 = document.createElement("i"); ssLabel3.style="font-size:12px;"; ssLabel3.innerHTML = "Учёт конкурентов: учитывать все лоты<br>";
var ssLabel4 = document.createElement("i"); ssLabel4.style="font-size:12px;"; ssLabel4.innerHTML = "Учёт конкурентов: учитывать только лоты с идентичной прочностью артефактов<br><br>";
var ssLabel5 = document.createElement("i"); ssLabel5.style="font-size:12px;"; ssLabel5.innerHTML = "Скидка: ";

var workTable = document.querySelector(".wbwhite");
workTable.appendChild(ssLabel0); workTable.appendChild(ss1); workTable.appendChild(ssLabel1);
workTable.appendChild(ss2); workTable.appendChild(ssLabel2); workTable.appendChild(ss3); workTable.appendChild(ssLabel3);
workTable.appendChild(ss4); workTable.appendChild(ssLabel4); workTable.appendChild(ssLabel5); workTable.appendChild(ss5);

var outputBox = document.createElement("div"); outputBox.style = "font-size:12px;"; outputBox.innerHTML = ""; workTable.insertBefore(outputBox, workTable.firstChild);
var msgBox1 = document.createElement("p"); msgBox1.style = "font-size:12px;"; outputBox.appendChild(msgBox1);
var msgBox2 = document.createElement("p"); msgBox2.style = "font-size:12px;"; outputBox.appendChild(msgBox2);
//==========//

var duration = document.getElementsByName("duration")[0];
duration.value = GM_getValue("AH_Helper_Setting_4");
duration.onchange = function(){ GM_setValue("AH_Helper_Setting_4", duration.value); };

var select = document.getElementsByName("item")[0];
select.onchange = selectionChanged;