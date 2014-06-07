// ==UserScript==
// @name          Travian NPC-AddIn
// @version       2.5.5
// @namespace     http://travian.de
// @description   Add-in for the NPC merchant
// @author        Toxon
/////////////////////////////////////////////////////////////////////////////
// @include       http://*.travian.*/dorf*
// @include       http://travian.*/dorf*
// @include       http://*.travian.*/build*
// @include       http://travian.*/build*
// @include       http://*.travian.*/spieler*
// @include       http://travian.*/spieler*
// @include       http://*.travian.*/plus*
// @include       http://travian.*/plus*
// @include       http://*.travian.*/allianz*
// @include       http://travian.*/allianz*
// @include       http://*.travian.*/nachrichten*
// @include       http://travian.*/nachrichten*
// @include       http://*.travian.*/berichte*
// @include       http://travian.*/berichte*
/////////////////////////////////////////////////////////////////////////////
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////
// Extends the NPC merchant :
// * Optimizes your ressources for building as much troops as possible.
// * Changing all your resources to one with just 2 clicks
// * Adds a link for the NPC merchant to the menu.
// * Adds a NPC link to the buildings site if you have enough resources to trade but not to build.
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
// Languages depending on the server
///////////////////////////////////////////////////////////////////////////////

var localStr   = new Array();
var country;

// ----------
// ae arabic
// ----------
country = 'ae'
localStr[country] = new Array()
localStr[country]['npc'] = 'NPC'

localStr[country]['res'] = '\u0627\u0644\u0627\u0646\u062A\u0627\u062C'
localStr[country]['re1'] = '\u0627\u0644\u062E\u0634\u0628'
localStr[country]['re2'] = '\u0627\u0644\u0637\u064A\u0646'
localStr[country]['re3'] = '\u0627\u0644\u062D\u062F\u064A\u062F'
localStr[country]['re4'] = '\u0627\u0644\u0642\u0645\u062D'

localStr[country]['ro_'] = '\u0627\u0644\u0631\u0648\u0645\u0627\u0646'
localStr[country]['ro0'] = '\u062C\u0646\u062F\u064A \u0623\u0648\u0644'
localStr[country]['ro1'] = '\u062D\u0631\u0627\u0633 \u0627\u0644\u0623\u0645\u0628\u0631\u0627\u0637\u0648\u0631'
localStr[country]['ro2'] = '\u062C\u0646\u062F\u064A \u0645\u0647\u0627\u062C\u0645'
localStr[country]['ro3'] = '\u0641\u0631\u0642\u0629 \u062A\u062C\u0633\u0633'
localStr[country]['ro4'] = '\u0633\u0644\u0627\u062D \u0627\u0644\u0641\u0631\u0633\u0627\u0646'
localStr[country]['ro5'] = '\u0641\u0631\u0633\u0627\u0646 \u0642\u064A\u0635\u0631'
localStr[country]['ro6'] = '\u0643\u0628\u0634'
localStr[country]['ro7'] = '\u0627\u0644\u0645\u0642\u0644\u0627\u0639 \u0627\u0644\u0646\u0627\u0631\u064A'
localStr[country]['ro8'] = '\u062D\u0643\u064A\u0645'
localStr[country]['ro9'] = '\u0645\u0633\u062A\u0648\u0637\u0646'

localStr[country]['ga_'] = '\u0627\u0644\u0627\u063A\u0631\u064A\u0642'
localStr[country]['ga0'] = '\u0627\u0644\u0643\u062A\u064A\u0628\u0647'
localStr[country]['ga1'] = '\u0645\u0628\u0627\u0631\u0632'
localStr[country]['ga2'] = '\u0627\u0644\u0645\u0633\u062A\u0643\u0634\u0641'
localStr[country]['ga3'] = '\u0631\u0639\u062F \u0627\u0644\u062C\u0631\u0645\u0627\u0646'
localStr[country]['ga4'] = '\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0633\u0644\u062A'
localStr[country]['ga5'] = '\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u0647\u064A\u062F\u0648\u0627\u0646\u0631'
localStr[country]['ga6'] = '\u0645\u062D\u0637\u0645\u0629 \u0627\u0644\u0627\u0628\u0648\u0627\u0628 \u0627\u0644\u062E\u0634\u0628\u064A\u0629'
localStr[country]['ga7'] = '\u0627\u0644\u0645\u0642\u0644\u0627\u0639 \u0627\u0644\u062D\u0631\u0628\u064A'
localStr[country]['ga8'] = '\u0631\u0626\u064A\u0633'
localStr[country]['ga9'] = '\u0645\u0633\u062A\u0648\u0637\u0646'

localStr[country]['ge_'] = '\u0627\u0644\u062C\u0631\u0645\u0627\u0646'
localStr[country]['ge0'] = '\u0645\u0642\u0627\u062A\u0644 \u0628\u0647\u0631\u0627\u0648\u0629'
localStr[country]['ge1'] = '\u0645\u0642\u0627\u062A\u0644 \u0628\u0631\u0645\u062D'
localStr[country]['ge2'] = '\u0645\u0642\u0627\u062A\u0644 \u0628\u0641\u0623\u0633'
localStr[country]['ge3'] = '\u0627\u0644\u0643\u0634\u0627\u0641'
localStr[country]['ge4'] = '\u0645\u0642\u0627\u062A\u0644 \u0627\u0644\u0642\u064A\u0635\u0631'
localStr[country]['ge5'] = '\u0641\u0631\u0633\u0627\u0646 \u0627\u0644\u062C\u0631\u0645\u0627\u0646'
localStr[country]['ge6'] = '\u0645\u062D\u0637\u0645\u0629 \u0627\u0644\u0627\u0628\u0648\u0627\u0628'
localStr[country]['ge7'] = '\u0627\u0644\u0645\u0642\u0644\u0627\u0639'
localStr[country]['ge8'] = '\u0627\u0644\u0632\u0639\u064A\u0645'
localStr[country]['ge9'] = '\u0645\u0633\u062A\u0648\u0637\u0646'

// ----------
// at oestereich
// ----------
country = 'at';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC-H\u00E4ndler';

localStr[country]['res'] = 'Rohstoffe';
localStr[country]['re1'] = 'Holz';
localStr[country]['re2'] = 'Lehm';
localStr[country]['re3'] = 'Eisen';
localStr[country]['re4'] = 'Getreide';

localStr[country]['ro_'] = 'R\u00F6mer';
localStr[country]['ro0'] = 'Legion\u00E4r';
localStr[country]['ro1'] = 'Pr\u00E4torianer';
localStr[country]['ro2'] = 'Imperianer';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ramme';
localStr[country]['ro7'] = 'Feuerkatapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Siedler';

localStr[country]['ga_'] = 'Gallier';
localStr[country]['ga0'] = 'Phalanx';
localStr[country]['ga1'] = 'Schwertk\u00E4mpfer';
localStr[country]['ga2'] = 'Sp\u00E4her';
localStr[country]['ga3'] = 'Theutates Blitz';
localStr[country]['ga4'] = 'Druidenreiter';
localStr[country]['ga5'] = 'Haeduaner';
localStr[country]['ga6'] = 'Ramme';
localStr[country]['ga7'] = 'Kriegskatapult';
localStr[country]['ga8'] = 'H\u00E4uptling';
localStr[country]['ga9'] = 'Siedler';

localStr[country]['ge_'] = 'Germanen';
localStr[country]['ge0'] = 'Keulenschwinger';
localStr[country]['ge1'] = 'Speerk\u00E4mpfer';
localStr[country]['ge2'] = 'Axtk\u00E4mpfer';
localStr[country]['ge3'] = 'Kundschafter';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teutonenreiter';
localStr[country]['ge6'] = 'Ramme';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Stammesf\u00FChrer';
localStr[country]['ge9'] = 'Siedler';


// ----------
// ba bosnisch
// ----------
country = 'ba';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Rimljani';
localStr[country]['ro0'] = 'Legionar';
localStr[country]['ro1'] = 'Pretorijanac';
localStr[country]['ro2'] = 'Imperijanac';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ratni ovan';
localStr[country]['ro7'] = 'Vatreni katapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Naseljenik';

localStr[country]['ga_'] = 'Gali';
localStr[country]['ga0'] = 'Falanga';
localStr[country]['ga1'] = 'Ma\u010Devalac';
localStr[country]['ga2'] = 'Izvi\u0111a\u010D';
localStr[country]['ga3'] = 'Teutateov grom';
localStr[country]['ga4'] = 'Druidski jaha\u010D';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Ovan';
localStr[country]['ga7'] = 'Katapult';
localStr[country]['ga8'] = 'Starje\u0161ina';
localStr[country]['ga9'] = 'Naseljenik';

localStr[country]['ge_'] = 'Teutonci';
localStr[country]['ge0'] = 'Batinar';
localStr[country]['ge1'] = 'Kopljanik';
localStr[country]['ge2'] = 'Borac sa sjekirom';
localStr[country]['ge3'] = 'Izvi\u0111a\u010D';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teutonski Vitez';
localStr[country]['ge6'] = 'Ovan';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Poglavica';
localStr[country]['ge9'] = 'Naseljenik';

// ----------
// bg bulgarisch
// ----------
country = 'bg'
localStr[country] = new Array()

localStr[country]['npc'] = 'NPC \u0442\u044A\u0440\u0433\u043E\u0432\u0435\u0446'

localStr[country]['res'] = '\u0420\u0435\u0441\u0443\u0440\u0441\u0438'
localStr[country]['re1'] = '\u0414\u044A\u0440\u0432\u0435\u0441\u0438\u043D\u0430'
localStr[country]['re2'] = '\u0413\u043B\u0438\u043D\u0430'
localStr[country]['re3'] = '\u0416\u0435\u043B\u044F\u0437\u043E'
localStr[country]['re4'] = '\u0416\u0438\u0442\u043E'

localStr[country]['ro_'] = '\u0420\u0438\u043C\u043B\u044F\u043D\u0438'
localStr[country]['ro0'] = '\u041B\u0435\u0433\u0438\u043E\u043D\u0435\u0440'
localStr[country]['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0438\u0430\u043D\u0435\u0446'
localStr[country]['ro2'] = '\u0418\u043C\u0435\u043F\u0435\u0440\u0438\u0430\u043D'
localStr[country]['ro3'] = 'Equites Legati'
localStr[country]['ro4'] = 'Equites Imperatoris'
localStr[country]['ro5'] = 'Equites Caesaris'
localStr[country]['ro6'] = '\u0421\u0442\u0435\u043D\u043E\u0431\u043E\u0439\u043D\u043E \u041E\u0440\u044A\u0434\u0438\u0435'
localStr[country]['ro7'] = '\u041E\u0433\u043D\u0435\u043D \u043A\u0430\u0442\u0430\u043F\u0443\u043B\u0442'
localStr[country]['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440'
localStr[country]['ro9'] = '\u0417\u0430\u0441\u0435\u043B\u043D\u0438\u043A'

localStr[country]['ge_'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0446\u0438'
localStr[country]['ge0'] = '\u0411\u043E\u0435\u0446 \u0441 \u0431\u043E\u0437\u0434\u0443\u0433\u0430\u043D'
localStr[country]['ge1'] = '\u041A\u043E\u043F\u0438\u0435\u043D\u043E\u0441\u0435\u0446'
localStr[country]['ge2'] = '\u0411\u043E\u0435\u0446 \u0441 \u0431\u0440\u0430\u0434\u0432\u0430'
localStr[country]['ge3'] = '\u0421\u044A\u0433\u043B\u0435\u0434\u0432\u0430\u0447'
localStr[country]['ge4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D'
localStr[country]['ge5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u043A\u0438 \u0440\u0438\u0446\u0430\u0440'
localStr[country]['ge6'] = '\u0422\u0430\u0440\u0430\u043D'
localStr[country]['ge7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u0442'
localStr[country]['ge8'] = '\u041F\u0440\u0435\u0434\u0432\u043E\u0434\u0438\u0442\u0435\u043B'
localStr[country]['ge9'] = '\u0417\u0430\u0441\u0435\u043B\u043D\u0438\u043A'

localStr[country]['ga_'] = '\u0413\u0430\u043B\u0438'
localStr[country]['ga0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430'
localStr[country]['ga1'] = '\u041C\u0435\u0447\u043E\u043D\u043E\u0441\u0435\u0446'
localStr[country]['ga2'] = '\u0421\u043B\u0435\u0434\u043E\u0442\u044A\u0440\u0441\u0430\u0447'
localStr[country]['ga3'] = 'Theutates Thunder'
localStr[country]['ga4'] = '\u0414\u0440\u0443\u0438\u0434 \u043A\u043E\u043D\u043D\u0438\u043A'
localStr[country]['ga5'] = '\u0425\u0435\u0434\u0443\u0430\u043D'
localStr[country]['ga6'] = '\u0422\u0430\u0440\u0430\u043D'
localStr[country]['ga7'] = '\u0422\u0440\u0435\u0431\u0443\u0447\u0435\u0442'
localStr[country]['ga8'] = '\u0412\u043E\u0436\u0434'
localStr[country]['ga9'] = '\u0417\u0430\u0441\u0435\u043B\u043D\u0438\u043A'

// ----------
// cat katalanisch
// ----------
country = 'cat';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romans';
localStr[country]['ro0'] = 'Legionari';
localStr[country]['ro1'] = 'Pretori\u00E0';
localStr[country]['ro2'] = 'Imper\u00E0';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ariet';
localStr[country]['ro7'] = 'Catapulta de foc';
localStr[country]['ro8'] = 'Senador';
localStr[country]['ro9'] = 'Colon';

localStr[country]['ga_'] = 'Gals';
localStr[country]['ga0'] = 'Falange';
localStr[country]['ga1'] = 'Lluitador d\'Espasa';
localStr[country]['ga2'] = 'Batedor';
localStr[country]['ga3'] = 'Genet Llampec';
localStr[country]['ga4'] = 'Genet Druida';
localStr[country]['ga5'] = 'Genet Edu';
localStr[country]['ga6'] = 'Ariet';
localStr[country]['ga7'] = 'Catapulta de guerra';
localStr[country]['ga8'] = 'Cacic';
localStr[country]['ga9'] = 'Colon';

localStr[country]['ge_'] = 'Germ\u00E0nics';
localStr[country]['ge0'] = 'Lluitador de Clava';
localStr[country]['ge1'] = 'Llancer';
localStr[country]['ge2'] = 'Lluitador de Destral';
localStr[country]['ge3'] = 'Emissari';
localStr[country]['ge4'] = 'Palad\u00ED';
localStr[country]['ge5'] = 'Genet Teut\u00F3';
localStr[country]['ge6'] = 'Ariet';
localStr[country]['ge7'] = 'Catapulta';
localStr[country]['ge8'] = 'Capitost';
localStr[country]['ge9'] = 'Colon';

// ----------
// cl chilenisch
// ----------
country = 'cl';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romanos';
localStr[country]['ro0'] = 'Legionario';
localStr[country]['ro1'] = 'Pretoriano';
localStr[country]['ro2'] = 'Imperano';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ariete Romano';
localStr[country]['ro7'] = 'Catapulta de fuego';
localStr[country]['ro8'] = 'Senador';
localStr[country]['ro9'] = 'Colono';

localStr[country]['ga_'] = 'Galos';
localStr[country]['ga0'] = 'Falange';
localStr[country]['ga1'] = 'Luchador de Espada';
localStr[country]['ga2'] = 'Batidor';
localStr[country]['ga3'] = 'Trueno de Theutates';
localStr[country]['ga4'] = 'Jinete Druida';
localStr[country]['ga5'] = 'Jinete Eduo';
localStr[country]['ga6'] = 'Ariete';
localStr[country]['ga7'] = 'Catapulta de guerra';
localStr[country]['ga8'] = 'Cacique';
localStr[country]['ga9'] = 'Colono';

localStr[country]['ge_'] = 'Germanos';
localStr[country]['ge0'] = 'Luchador de Porra';
localStr[country]['ge1'] = 'Lancero';
localStr[country]['ge2'] = 'Luchador de Hacha';
localStr[country]['ge3'] = 'Emisario';
localStr[country]['ge4'] = 'Palad\u00EDn';
localStr[country]['ge5'] = 'Caballero Teut\u00F3n';
localStr[country]['ge6'] = 'Ariete';
localStr[country]['ge7'] = 'Catapulta';
localStr[country]['ge8'] = 'Cabecilla';
localStr[country]['ge9'] = 'Colono';

// ----------
// cn chinesisch
// ----------
country = 'cn';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romans';
localStr[country]['ro0'] = '\u53E4\u7F85\u99AC\u6B65\u5175';
localStr[country]['ro1'] = '\u7981\u885B\u5175';
localStr[country]['ro2'] = '\u5E1D\u570B\u5175';
localStr[country]['ro3'] = '\u4F7F\u8005\u9A0E\u58EB';
localStr[country]['ro4'] = '\u5E1D\u570B\u9A0E\u58EB';
localStr[country]['ro5'] = '\u5C07\u8ECD\u9A0E\u58EB';
localStr[country]['ro6'] = '\u885D\u649E\u8ECA';
localStr[country]['ro7'] = '\u706B\u7130\u6295\u77F3\u6A5F';
localStr[country]['ro8'] = '\u53C3\u8B70\u54E1';
localStr[country]['ro9'] = '\u958B\u62D3\u8005';

localStr[country]['ga_'] = 'Gauls';
localStr[country]['ga0'] = '\u65B9\u9663\u5175';
localStr[country]['ga1'] = '\u528D\u58EB';
localStr[country]['ga2'] = '\u63A2\u8DEF\u8005';
localStr[country]['ga3'] = '\u96F7\u6CD5\u5E2B';
localStr[country]['ga4'] = '\u5FB7\u9B6F\u4F0A\u9A0E\u5175';
localStr[country]['ga5'] = '\u6D77\u9813\u8056\u9A0E';
localStr[country]['ga6'] = '\u885D\u649E\u8ECA';
localStr[country]['ga7'] = '\u6295\u77F3\u6A5F';
localStr[country]['ga8'] = '\u65CF\u9577';
localStr[country]['ga9'] = '\u958B\u62D3\u8005';

localStr[country]['ge_'] = 'Teutons';
localStr[country]['ge0'] = '\u68CD\u68D2\u5175';
localStr[country]['ge1'] = '\u77DB\u5175';
localStr[country]['ge2'] = '\u65A7\u982D\u5175';
localStr[country]['ge3'] = '\u5075\u5BDF\u5175';
localStr[country]['ge4'] = '\u4FE0\u5BA2';
localStr[country]['ge5'] = '\u689D\u9813\u9A0E\u58EB';
localStr[country]['ge6'] = '\u885D\u649E\u8ECA';
localStr[country]['ge7'] = '\u6295\u77F3\u6A5F';
localStr[country]['ge8'] = '\u53F8\u4EE4\u5B98';
localStr[country]['ge9'] = '\u958B\u62D3\u8005';

// ----------
// com english
// ----------
country = 'com';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC merchant';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romans';
localStr[country]['ro0'] = 'Legionnaire';
localStr[country]['ro1'] = 'Praetorian';
localStr[country]['ro2'] = 'Imperian';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Battering Ram';
localStr[country]['ro7'] = 'Fire Catapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Settler';

localStr[country]['ga_'] = 'Gauls';
localStr[country]['ga0'] = 'Phalanx';
localStr[country]['ga1'] = 'Swordsman';
localStr[country]['ga2'] = 'Pathfinder';
localStr[country]['ga3'] = 'Theutates Thunder';
localStr[country]['ga4'] = 'Druidrider';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Ram';
localStr[country]['ga7'] = 'Trebuchet';
localStr[country]['ga8'] = 'Chiefain';
localStr[country]['ga9'] = 'Settler';

localStr[country]['ge_'] = 'Teutons';
localStr[country]['ge0'] = 'Clubswinger';
localStr[country]['ge1'] = 'Spearman';
localStr[country]['ge2'] = 'Axeman';
localStr[country]['ge3'] = 'Scout';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teutonic Knight';
localStr[country]['ge6'] = 'Ram';
localStr[country]['ge7'] = 'Catapult';
localStr[country]['ge8'] = 'Chieftain';
localStr[country]['ge9'] = 'Settler';

// ----------
// cz tschechisch
// ----------
country = 'cz';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Suroviny';
localStr[country]['re1'] = 'D\u0159evo';
localStr[country]['re2'] = 'Hl\u00EDna';
localStr[country]['re3'] = '\u017Delezo';
localStr[country]['re4'] = 'Obil\u00ED';

localStr[country]['ro_'] = '\u0158\u00EDman\u00E9';
localStr[country]['ro0'] = 'Legion\u00E1\u0159';
localStr[country]['ro1'] = 'Pretori\u00E1n';
localStr[country]['ro2'] = 'Imperi\u00E1n';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = '\u0158\u00EDmansk\u00E9 beranidlo';
localStr[country]['ro7'] = 'Ohniv\u00FD katapult';
localStr[country]['ro8'] = 'Sen\u00E1tor';
localStr[country]['ro9'] = 'Osadn\u00EDk';

localStr[country]['ga_'] = 'Galov\u00E9';
localStr[country]['ga0'] = 'Falanga';
localStr[country]['ga1'] = '\u0160erm\u00ED\u0159';
localStr[country]['ga2'] = 'Sl\u00EDdi\u010D';
localStr[country]['ga3'] = 'Theutates Blesk';
localStr[country]['ga4'] = 'Druid jezdec';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'D\u0159ev\u011Bn\u00E9 beranidlo';
localStr[country]['ga7'] = 'V\u00E1le\u010Dn\u00FD katapult';
localStr[country]['ga8'] = 'N\u00E1\u010Deln\u00EDk';
localStr[country]['ga9'] = 'Osadn\u00EDk';

localStr[country]['ge_'] = 'Germ\u00E1ni';
localStr[country]['ge0'] = 'P\u00E1lka\u0159';
localStr[country]['ge1'] = 'O\u0161t\u011Bpa\u0159';
localStr[country]['ge2'] = 'Sekern\u00EDk';
localStr[country]['ge3'] = 'Zv\u011Bd';
localStr[country]['ge4'] = 'Ryt\u00ED\u0159';
localStr[country]['ge5'] = 'Teuton jezdec';
localStr[country]['ge6'] = 'Germ\u00E1nsk\u00E9 beranidlo';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Kmenov\u00FD v\u016Fdce';
localStr[country]['ge9'] = 'Osadn\u00EDk';

// ----------
// de deutsch
// ----------
localStr['de']     = localStr['at']

// ----------
// dk daenisch
// ----------
country = 'dk';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romere';
localStr[country]['ro0'] = 'Legion\u00E6r';
localStr[country]['ro1'] = 'Pr\u00E6torianer';
localStr[country]['ro2'] = 'Imperianer';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Rambuk';
localStr[country]['ro7'] = 'Brandkatapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Bos\u00E6tter';

localStr[country]['ga_'] = 'Gallere';
localStr[country]['ga0'] = 'Falanks';
localStr[country]['ga1'] = 'Sv\u00E6rdk\u00E6mper';
localStr[country]['ga2'] = 'Spion';
localStr[country]['ga3'] = 'Theutaterlyn';
localStr[country]['ga4'] = 'Druiderytter';
localStr[country]['ga5'] = 'Haeduaner';
localStr[country]['ga6'] = 'Rambuktr\u00E6';
localStr[country]['ga7'] = 'Krigskatapult';
localStr[country]['ga8'] = 'H\u00F8vding';
localStr[country]['ga9'] = 'Bos\u00E6tter';

localStr[country]['ge_'] = 'Germanere';
localStr[country]['ge0'] = 'K\u00F8llesvinger';
localStr[country]['ge1'] = 'Spydk\u00E6mper';
localStr[country]['ge2'] = '\u00D8ksek\u00E6mper';
localStr[country]['ge3'] = 'Spejder';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teutonrytter';
localStr[country]['ge6'] = 'Rambuk';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Stammef\u00F8rer';
localStr[country]['ge9'] = 'Bos\u00E6tter';

// ----------
// fi finnisch
// ----------
country = 'fi';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Roomalaiset';
localStr[country]['ro0'] = 'Legioonalainen';
localStr[country]['ro1'] = 'Pretoriaani';
localStr[country]['ro2'] = 'Imperiaani';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Muurinmurtaja';
localStr[country]['ro7'] = 'Tulikatapultti';
localStr[country]['ro8'] = 'Senaattori';
localStr[country]['ro9'] = 'Uudisasukas';

localStr[country]['ga_'] = 'Gallialaiset';
localStr[country]['ga0'] = 'Falangi';
localStr[country]['ga1'] = 'Miekkasoturi';
localStr[country]['ga2'] = 'Tunnustelija';
localStr[country]['ga3'] = 'Teutateen Salama';
localStr[country]['ga4'] = 'Druidiratsastaja';
localStr[country]['ga5'] = 'Haeduaani';
localStr[country]['ga6'] = 'Muurinmurtaja';
localStr[country]['ga7'] = 'Heittokone';
localStr[country]['ga8'] = 'Teutateen Salama';
localStr[country]['ga9'] = 'Uudisasukas';

localStr[country]['ge_'] = 'Teutonit';
localStr[country]['ge0'] = 'Nuijamies';
localStr[country]['ge1'] = 'Keih\u00E4smies';
localStr[country]['ge2'] = 'Kirvessoturi';
localStr[country]['ge3'] = 'Tiedustelija';
localStr[country]['ge4'] = 'Paladiini';
localStr[country]['ge5'] = 'Teutoniritari';
localStr[country]['ge6'] = 'Muurinmurtaja';
localStr[country]['ge7'] = 'Katapultti';
localStr[country]['ge8'] = 'P\u00E4\u00E4llikk\u00F6';
localStr[country]['ge9'] = 'Uudisasukas';

// ----------
// fr franzoesisch
// ----------
country = 'fr';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romains';
localStr[country]['ro0'] = 'L\u00E9gionnaire';
localStr[country]['ro1'] = 'Pr\u00E9torien';
localStr[country]['ro2'] = 'Imp\u00E9rian';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'B\u00E9lier';
localStr[country]['ro7'] = 'Catapulte de feu';
localStr[country]['ro8'] = 'S\u00E9nateur';
localStr[country]['ro9'] = 'Colon';

localStr[country]['ga_'] = 'Gaulois';
localStr[country]['ga0'] = 'Phalange';
localStr[country]['ga1'] = 'Combattant \u00E0 l\'\u00E9p\u00E9e';
localStr[country]['ga2'] = 'Eclaireur';
localStr[country]['ga3'] = 'Eclair de Toutatis';
localStr[country]['ga4'] = 'Cavalier druide';
localStr[country]['ga5'] = 'H\u00E9douin';
localStr[country]['ga6'] = 'B\u00E9lier';
localStr[country]['ga7'] = 'Catapulte de Guerre';
localStr[country]['ga8'] = 'Chiefain';
localStr[country]['ga9'] = 'Colon';

localStr[country]['ge_'] = 'Teutons';
localStr[country]['ge0'] = 'B\u00E9lier';
localStr[country]['ge1'] = 'Combattant \u00E0 la lance';
localStr[country]['ge2'] = 'Combattant \u00E0 la hache';
localStr[country]['ge3'] = 'Eclaireur';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Cavalier Teuton';
localStr[country]['ge6'] = 'B\u00E9lier';
localStr[country]['ge7'] = 'Catapulte';
localStr[country]['ge8'] = 'Chef de tribu';
localStr[country]['ge9'] = 'Colon';

// ----------
// gr griechisch
// ----------
country = 'gr';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = '\u03A1\u03C9\u03BC\u03B1\u03AF\u03BF\u03B9';
localStr[country]['ro0'] = '\u039B\u03B5\u03B3\u03B5\u03C9\u03BD\u03AC\u03C1\u03B9\u03BF\u03C2';
localStr[country]['ro1'] = '\u03A0\u03C1\u03B1\u03B9\u03C4\u03C9\u03C1\u03B9\u03B1\u03BD\u03CC\u03C2';
localStr[country]['ro2'] = '\u0399\u03BC\u03C0\u03B5\u03C1\u03B9\u03B1\u03BD\u03CC\u03C2';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = '\u03A0\u03BF\u03BB\u03B9\u03BF\u03C1\u03BA\u03B7\u03C4\u03B9\u03BA\u03CC\u03C2 \u03BA\u03C1\u03B9\u03CC\u03C2';
localStr[country]['ro7'] = '\u039A\u03B1\u03C4\u03B1\u03C0\u03AD\u03BB\u03C4\u03B7\u03C2 \u03C6\u03C9\u03C4\u03B9\u03AC\u03C2';
localStr[country]['ro8'] = '\u0393\u03B5\u03C1\u03BF\u03C5\u03C3\u03B9\u03B1\u03C3\u03C4\u03AE\u03C2';
localStr[country]['ro9'] = '\u0386\u03C0\u03BF\u03B9\u03BA\u03BF\u03C2';

localStr[country]['ga_'] = '\u0393\u03B1\u03BB\u03AC\u03C4\u03B5\u03C2';
localStr[country]['ga0'] = '\u03A6\u03AC\u03BB\u03B1\u03BD\u03BE';
localStr[country]['ga1'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03BE\u03AF\u03C6\u03BF\u03C2';
localStr[country]['ga2'] = '\u0391\u03BD\u03B9\u03C7\u03BD\u03B5\u03C5\u03C4\u03AE\u03C2';
localStr[country]['ga3'] = '\u0391\u03C3\u03C4\u03C1\u03B1\u03C0\u03AE \u03C4\u03BF\u03C5 \u03A4\u03BF\u03C5\u03C4\u03B1\u03C4\u03AE';
localStr[country]['ga4'] = '\u0394\u03C1\u03BF\u03C5\u03AF\u03B4\u03B7\u03C2';
localStr[country]['ga5'] = '\u0399\u03B4\u03BF\u03C5\u03B1\u03BD\u03CC\u03C2';
localStr[country]['ga6'] = '\u03A0\u03BF\u03BB\u03B9\u03BF\u03C1\u03BA\u03B7\u03C4\u03B9\u03BA\u03CC\u03C2 \u03BA\u03C1\u03B9\u03CC\u03C2';
localStr[country]['ga7'] = '\u03A0\u03BF\u03BB\u03B5\u03BC\u03B9\u03BA\u03CC\u03C2 \u03BA\u03B1\u03C4\u03B1\u03C0\u03AD\u03BB\u03C4\u03B7\u03C2';
localStr[country]['ga8'] = '\u0391\u03C1\u03C7\u03B7\u03B3\u03CC\u03C2';
localStr[country]['ga9'] = '\u0386\u03C0\u03BF\u03B9\u03BA\u03BF\u03C2';

localStr[country]['ge_'] = '\u03A4\u03B5\u03CD\u03C4\u03BF\u03BD\u03B5\u03C2';
localStr[country]['ge0'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03C1\u03CC\u03C0\u03B1\u03BB\u03BF';
localStr[country]['ge1'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03B1\u03BA\u03CC\u03BD\u03C4\u03B9\u03BF';
localStr[country]['ge2'] = '\u039C\u03B1\u03C7\u03B7\u03C4\u03AE\u03C2 \u03BC\u03B5 \u03C4\u03C3\u03B5\u03BA\u03BF\u03CD\u03C1\u03B9';
localStr[country]['ge3'] = '\u0391\u03BD\u03B9\u03C7\u03BD\u03B5\u03C5\u03C4\u03AE\u03C2';
localStr[country]['ge4'] = '\u03A0\u03B1\u03BB\u03B1\u03C4\u03B9\u03BD\u03CC\u03C2';
localStr[country]['ge5'] = '\u03A4\u03B5\u03CD\u03C4\u03BF\u03BD\u03B1\u03C2 \u03B9\u03C0\u03C0\u03CC\u03C4\u03B7\u03C2';
localStr[country]['ge6'] = '\u03A0\u03BF\u03BB\u03B9\u03BF\u03C1\u03BA\u03B7\u03C4\u03B9\u03BA\u03CC\u03C2 \u03BA\u03C1\u03B9\u03CC\u03C2';
localStr[country]['ge7'] = '\u039A\u03B1\u03C4\u03B1\u03C0\u03AD\u03BB\u03C4\u03B7\u03C2';
localStr[country]['ge8'] = '\u03A6\u03CD\u03BB\u03B1\u03C1\u03C7\u03BF\u03C2';
localStr[country]['ge9'] = '\u0386\u03C0\u03BF\u03B9\u03BA\u03BF\u03C2';

// ----------
// hk hongkong
// ----------
localStr['hk'] = localStr['cn']

// ----------
// com.hr kroatisch
// ----------
country = 'com.hr';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Rimljane';
localStr[country]['ro0'] = 'Legionar';
localStr[country]['ro1'] = 'Pretorian';
localStr[country]['ro2'] = 'Imperian';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ovan za probijanje';
localStr[country]['ro7'] = 'Vatreni katapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Naseljenik';

localStr[country]['ga_'] = 'Gale';
localStr[country]['ga0'] = 'Falanga';
localStr[country]['ga1'] = 'Ma\u010Devalac';
localStr[country]['ga2'] = 'Traga\u010D';
localStr[country]['ga3'] = 'Theutatesov grom';
localStr[country]['ga4'] = 'Druid jaha\u010D';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Ovan za probijanje';
localStr[country]['ga7'] = 'Trebu\u0161e';
localStr[country]['ga8'] = 'Starje\u0161ina';
localStr[country]['ga9'] = 'Naseljenik';

localStr[country]['ge_'] = 'Teutonce';
localStr[country]['ge0'] = 'Gor\u0161tak';
localStr[country]['ge1'] = 'Kopljanik';
localStr[country]['ge2'] = 'Borac sa sjekirom';
localStr[country]['ge3'] = 'Izvidnik';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teutonski vitez';
localStr[country]['ge6'] = 'Ovan za probijanje';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Poglavica';
localStr[country]['ge9'] = 'Naseljenik';

// ----------
// hu ungarisch
// ----------
country = 'hu';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'R\u00F3maiak';
localStr[country]['ro0'] = 'L\u00E9gi\u00F3';
localStr[country]['ro1'] = 'Test\u0151rs\u00E9g';
localStr[country]['ro2'] = 'Birodalmi';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Falt\u00F6r\u0151 kos';
localStr[country]['ro7'] = 'T\u0171zkatapult';
localStr[country]['ro8'] = 'Szen\u00E1tor';
localStr[country]['ro9'] = 'Telepes';

localStr[country]['ga_'] = 'Gallok';
localStr[country]['ga0'] = 'Phalanx';
localStr[country]['ga1'] = 'Kardos';
localStr[country]['ga2'] = 'Felder\u00EDt\u0151';
localStr[country]['ga3'] = 'Theutat Vill\u00E1m';
localStr[country]['ga4'] = 'Druida lovas';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Falrombol\u00F3';
localStr[country]['ga7'] = 'Harci-katapult';
localStr[country]['ga8'] = 'F\u0151n\u00F6k';
localStr[country]['ga9'] = 'Telepes';

localStr[country]['ge_'] = 'Germ\u00E1nok';
localStr[country]['ge0'] = 'Buzog\u00E1nyos';
localStr[country]['ge1'] = 'L\u00E1ndzs\u00E1s';
localStr[country]['ge2'] = 'Csatab\u00E1rdos';
localStr[country]['ge3'] = 'Csatab\u00E1rdos';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teuton lovag';
localStr[country]['ge6'] = 'Falt\u00F6r\u0151 kos';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'T\u00F6rzsi vezet\u00F6';
localStr[country]['ge9'] = 'Telepes';

// ----------
// il Hebrew
// ----------
country = 'co.il';
localStr[country] = new Array();
localStr[country]['npc'] = '\u05DE\u05E1\u05D7\u05E8 NPC';

localStr[country]['res'] = '\u05DE\u05E9\u05D0\u05D1\u05D9\u05DD';
localStr[country]['re1'] = '\u05E2\u05E6\u05D9\u05DD';
localStr[country]['re2'] = '\u05D8\u05D9\u05D8';
localStr[country]['re3'] = '\u05D1\u05E8\u05D6\u05DC';
localStr[country]['re4'] = '\u05D9\u05D1\u05D5\u05DC';

localStr[country]['ro_'] = '\u05E8\u05D5\u05DE\u05D0\u05D9\u05DD';
localStr[country]['ro0'] = '\u05DC\u05D9\u05D2\u05D9\u05D5\u05E0\u05E8';
localStr[country]['ro1'] = '\u05E4\u05E8\u05D0\u05D8\u05D5\u05E8';
localStr[country]['ro2'] = '\u05D0\u05D9\u05DE\u05E4\u05E8\u05D9\u05D9\u05DF';
localStr[country]['ro3'] = '\u05D0\u05E7\u05D5\u05D5\u05D9\u05D8\u05E1 \u05DC\u05D2\u05D8\u05D9';
localStr[country]['ro4'] = '\u05D0\u05E7\u05D5\u05D5\u05D9\u05D8\u05E1 \u05D0\u05D9\u05DE\u05E4\u05E8\u05D8\u05D5\u05E8\u05D9\u05E1';
localStr[country]['ro5'] = '\u05D0\u05E7\u05D5\u05D5\u05D9\u05D8\u05E1 \u05E7\u05D9\u05E1\u05E8\u05D9\u05E1';
localStr[country]['ro6'] = '\u05D0\u05D9\u05DC \u05D1\u05E8\u05D6\u05DC';
localStr[country]['ro7'] = '\u05D1\u05DC\u05D9\u05E1\u05D8\u05E8\u05D4';
localStr[country]['ro8'] = '\u05E1\u05E0\u05D8\u05D5\u05E8';
localStr[country]['ro9'] = '\u05DE\u05EA\u05D9\u05D9\u05E9\u05D1';

localStr[country]['ga_'] = '\u05D2\u05D0\u05DC\u05D9\u05D4';
localStr[country]['ga0'] = '\u05E4\u05D0\u05DC\u05D0\u05E0\u05E7\u05E1';
localStr[country]['ga1'] = '\u05D0\u05D9\u05E9 \u05D7\u05E8\u05D1';
localStr[country]['ga2'] = '\u05DE\u05D5\u05E6\u05D0 \u05D3\u05E8\u05DA';
localStr[country]['ga3'] = '\u05D1\u05E8\u05E7 \u05D8\u05D0\u05D5\u05D8\u05D0\u05D8\u05E1';
localStr[country]['ga4'] = '\u05D3\u05E8\u05D5\u05D0\u05D9\u05D3\u05E8\u05D9\u05D9\u05D3\u05E8';
localStr[country]['ga5'] = '\u05D4\u05D0\u05D5\u05D3\u05DF';
localStr[country]['ga6'] = '\u05D0\u05D9\u05D9\u05DC \u05D1\u05E8\u05D6\u05DC';
localStr[country]['ga7'] = '\u05D1\u05DC\u05D9\u05E1\u05D8\u05E8\u05D4';
localStr[country]['ga8'] = '\u05E6\'\u05D9\u05E4\u05D8\u05DF';
localStr[country]['ga9'] = '\u05DE\u05EA\u05D9\u05D9\u05E9\u05D1';

localStr[country]['ge_'] = '\u05D8\u05D0\u05D5\u05D8\u05D5\u05E0\u05D9\u05DD';
localStr[country]['ge0'] = '\u05DE\u05E0\u05D9\u05E3 \u05D0\u05DC\u05D4';
localStr[country]['ge1'] = '\u05D0\u05D9\u05E9 \u05D7\u05E0\u05D9\u05EA';
localStr[country]['ge2'] = '\u05D0\u05D9\u05E9 \u05D2\u05E8\u05D6\u05DF';
localStr[country]['ge3'] = '\u05E1\u05D9\u05D9\u05E8';
localStr[country]['ge4'] = '\u05E4\u05D0\u05DC\u05D0\u05D3\u05D9\u05DF';
localStr[country]['ge5'] = '\u05D0\u05D1\u05D9\u05E8 \u05D8\u05D0\u05D5\u05D8\u05D5\u05E0\u05D9';
localStr[country]['ge6'] = '\u05D0\u05D9\u05D9\u05DC \u05D1\u05E8\u05D6\u05DC';
localStr[country]['ge7'] = '\u05D1\u05DC\u05D9\u05E1\u05D8\u05E8\u05D4';
localStr[country]['ge8'] = '\u05E6\'\u05D9\u05E3';
localStr[country]['ge9'] = '\u05DE\u05EA\u05D9\u05D9\u05E9\u05D1';

// ----------
// it italienisch
// ----------
country = 'it';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Risorse';
localStr[country]['re1'] = 'Legno';
localStr[country]['re2'] = 'Argilla ';
localStr[country]['re3'] = 'Ferro ';
localStr[country]['re4'] = 'Grano';

localStr[country]['ro_'] = 'Romani';
localStr[country]['ro0'] = 'Legionario';
localStr[country]['ro1'] = 'Pretoriano';
localStr[country]['ro2'] = 'Imperiano';
localStr[country]['ro3'] = 'Legionario a cavallo';
localStr[country]['ro4'] = 'Imperiano a cavallo';
localStr[country]['ro5'] = 'Cavalleria Romana';
localStr[country]['ro6'] = 'Ariete da sfondamento';
localStr[country]['ro7'] = 'Catapulta';
localStr[country]['ro8'] = 'Senatore';
localStr[country]['ro9'] = 'Decurione';

localStr[country]['ga_'] = 'Galli';
localStr[country]['ga0'] = 'Lanciere';
localStr[country]['ga1'] = 'Combattente con spada';
localStr[country]['ga2'] = 'Esploratore';
localStr[country]['ga3'] = 'Cavalleria Gallica';
localStr[country]['ga4'] = 'Cavalleria di difesa';
localStr[country]['ga5'] = 'Cavalleria avanzata';
localStr[country]['ga6'] = 'Ariete';
localStr[country]['ga7'] = 'Catapulta';
localStr[country]['ga8'] = 'Capo trib\u00F9';
localStr[country]['ga9'] = 'Decurione';

localStr[country]['ge_'] = 'Teutoni';
localStr[country]['ge0'] = 'Combattente';
localStr[country]['ge1'] = 'Lanciere';
localStr[country]['ge2'] = 'Combattente con ascia';
localStr[country]['ge3'] = 'Esploratore';
localStr[country]['ge4'] = 'Paladino';
localStr[country]['ge5'] = 'Cavalleria Teutonica';
localStr[country]['ge6'] = 'Ariete';
localStr[country]['ge7'] = 'Catapulta';
localStr[country]['ge8'] = 'Comandante';
localStr[country]['ge9'] = 'Decurione';

// ----------
// lt litauisch
// ----------
country = 'lt';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'rom\u0117n\u0173';
localStr[country]['ro0'] = 'legionierius';
localStr[country]['ro1'] = 'pretorionas';
localStr[country]['ro2'] = 'imperionas';
localStr[country]['ro3'] = 'raitas legatas';
localStr[country]['ro4'] = 'imperatoriaus raitelis';
localStr[country]['ro5'] = 'cezario raitelis';
localStr[country]['ro6'] = 'm\u016Bradau\u017Eys';
localStr[country]['ro7'] = 'ugnin\u0117 katapulta';
localStr[country]['ro8'] = 'senatorius';
localStr[country]['ro9'] = 'rom\u0117n\u0173 kolonistas';

localStr[country]['ga_'] = 'gal\u0173';
localStr[country]['ga0'] = 'falanga';
localStr[country]['ga1'] = 'p\u0117stininkas su kardu';
localStr[country]['ga2'] = 'p\u0117dsekys';
localStr[country]['ga3'] = 'raitas perk\u016Bnas';
localStr[country]['ga4'] = 'raitas druidas';
localStr[country]['ga5'] = 'raitas hedujas';
localStr[country]['ga6'] = 'taranas';
localStr[country]['ga7'] = 'trebu\u0161etas';
localStr[country]['ga8'] = 'kunigaik\u0161tis';
localStr[country]['ga9'] = 'gal\u0173 kolonistas';

localStr[country]['ge_'] = 'german\u0173';
localStr[country]['ge0'] = 'p\u0117stininkas su kuoka';
localStr[country]['ge1'] = 'ietininkas';
localStr[country]['ge2'] = 'p\u0117stininkas su kirviu';
localStr[country]['ge3'] = '\u017Evalgas';
localStr[country]['ge4'] = 'paladinas';
localStr[country]['ge5'] = 'german\u0173 raitelis';
localStr[country]['ge6'] = 'taranas';
localStr[country]['ge7'] = 'katapulta';
localStr[country]['ge8'] = 'german\u0173 vadas';
localStr[country]['ge9'] = 'kolonistas';

// ----------
// com.mx spanisch
// ----------
country = 'com.mx';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romanos';
localStr[country]['ro0'] = 'Legionario';
localStr[country]['ro1'] = 'Pretoriano';
localStr[country]['ro2'] = 'Imperano';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Carnero';
localStr[country]['ro7'] = 'Catapulta de fuego';
localStr[country]['ro8'] = 'Senador';
localStr[country]['ro9'] = 'Colono';

localStr[country]['ga_'] = 'Galos';
localStr[country]['ga0'] = 'Falange';
localStr[country]['ga1'] = 'Luchador de Espada';
localStr[country]['ga2'] = 'Batidor';
localStr[country]['ga3'] = 'Rayo de Teutates';
localStr[country]['ga4'] = 'Jinete Druida';
localStr[country]['ga5'] = 'Jinete Eduo';
localStr[country]['ga6'] = 'Carnero de madera';
localStr[country]['ga7'] = 'Catapulta de guerra';
localStr[country]['ga8'] = 'Cacique';
localStr[country]['ga9'] = 'Colono';

localStr[country]['ge_'] = 'Germanos';
localStr[country]['ge0'] = 'Luchador de Porra';
localStr[country]['ge1'] = 'Lancero';
localStr[country]['ge2'] = 'Luchador de Hacha';
localStr[country]['ge3'] = 'Emisario';
localStr[country]['ge4'] = 'Palad\u00EDn';
localStr[country]['ge5'] = 'Jinete Teut\u00F3n';
localStr[country]['ge6'] = 'Ariete';
localStr[country]['ge7'] = 'Catapulta';
localStr[country]['ge8'] = 'Cabecilla';
localStr[country]['ge9'] = 'Colono';

// ----------
// net spanisch
// ----------
localStr['net'] = localStr['com.mx']

// ----------
// nl hollaendisch
// ----------

country = 'nl';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC handel';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romeinen';
localStr[country]['ro0'] = 'Legionair';
localStr[country]['ro1'] = 'Praetoriaan';
localStr[country]['ro2'] = 'Imperiaan';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ram';
localStr[country]['ro7'] = 'Vuurkatapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Kolonist';

localStr[country]['ga_'] = 'Galli\u00EBrs';
localStr[country]['ga0'] = 'Phalanx';
localStr[country]['ga1'] = 'Zwaardvechter';
localStr[country]['ga2'] = 'Padvinder';
localStr[country]['ga3'] = 'Toetatis Donder';
localStr[country]['ga4'] = 'Druideruiter';
localStr[country]['ga5'] = 'Haeduaan';
localStr[country]['ga6'] = 'Trebuchet';
localStr[country]['ga7'] = 'Krigskatapult';
localStr[country]['ga8'] = 'Onderleider';
localStr[country]['ga9'] = 'Kolonist';

localStr[country]['ge_'] = 'Germanen';
localStr[country]['ge0'] = 'Knuppelvechter';
localStr[country]['ge1'] = 'Speervechter';
localStr[country]['ge2'] = 'Bijlvechter';
localStr[country]['ge3'] = 'Verkenner';
localStr[country]['ge4'] = 'Paladijn';
localStr[country]['ge5'] = 'Germaanse Ridder';
localStr[country]['ge6'] = 'Ram';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Leider';
localStr[country]['ge9'] = 'Kolonist';

// ----------
// no norwegisch
// ----------
country = 'no';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romere';
localStr[country]['ro0'] = 'Legion\u00E6r';
localStr[country]['ro1'] = 'Pretorianer';
localStr[country]['ro2'] = 'Imperian';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Rambukk';
localStr[country]['ro7'] = 'Brannkatapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Nybygger';

localStr[country]['ga_'] = 'Gallere';
localStr[country]['ga0'] = 'Phalanx';
localStr[country]['ga1'] = 'Sverdmann';
localStr[country]['ga2'] = 'Stifinner';
localStr[country]['ga3'] = 'Theutates Torden';
localStr[country]['ga4'] = 'Druidrider';
localStr[country]['ga5'] = 'Haeduaner';
localStr[country]['ga6'] = 'Rambukk';
localStr[country]['ga7'] = 'Krigskatapult';
localStr[country]['ga8'] = 'H\u00F8vding';
localStr[country]['ga9'] = 'Nybyggere';

localStr[country]['ge_'] = 'Germanere';
localStr[country]['ge0'] = 'Klubbemann';
localStr[country]['ge1'] = 'Spydmann';
localStr[country]['ge2'] = '\u00D8ksemann';
localStr[country]['ge3'] = 'Speider';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Teutonic Ridder';
localStr[country]['ge6'] = 'Rambukk';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'H\u00F8vding';
localStr[country]['ge9'] = 'Nybyggere';

// ----------
// org deutsch
// ----------
localStr['org'] = localStr['de']

// ----------
// pl polnisch
// ----------
country = 'pl';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Rzymianie';
localStr[country]['ro0'] = 'Legionista';
localStr[country]['ro1'] = 'Pretorianin';
localStr[country]['ro2'] = 'Centurion';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Taran';
localStr[country]['ro7'] = 'Ognista Katapulta';
localStr[country]['ro8'] = 'Konsul';
localStr[country]['ro9'] = 'Osadnik';

localStr[country]['ga_'] = 'Galowie';
localStr[country]['ga0'] = 'Falanga';
localStr[country]['ga1'] = 'Miecznik';
localStr[country]['ga2'] = 'Tropiciel';
localStr[country]['ga3'] = 'Grom Teutatesa';
localStr[country]['ga4'] = 'Jez\'dziec Druidzki';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Taran';
localStr[country]['ga7'] = 'Trebusz';
localStr[country]['ga8'] = 'Herszt';
localStr[country]['ga9'] = 'Osadnik';

localStr[country]['ge_'] = 'Germanie';
localStr[country]['ge0'] = 'Pa\u0322karz';
localStr[country]['ge1'] = 'Oszczepnik';
localStr[country]['ge2'] = 'Topornik';
localStr[country]['ge3'] = 'Zwiadowca';
localStr[country]['ge4'] = 'Paladyn';
localStr[country]['ge5'] = 'German\'ski Rycerz';
localStr[country]['ge6'] = 'Taran';
localStr[country]['ge7'] = 'Katapulta';
localStr[country]['ge8'] = 'W\u00F3dz';
localStr[country]['ge9'] = 'Osadnik';

// ----------
// pt portugiesisch
// ----------
country = 'pt';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Recursos';
localStr[country]['re1'] = 'Madeira';
localStr[country]['re2'] = 'Barro';
localStr[country]['re3'] = 'Ferro';
localStr[country]['re4'] = 'Cereal';

localStr[country]['ro_'] = 'Romanos';
localStr[country]['ro0'] = 'Legion\u0225rio';
localStr[country]['ro1'] = 'Pretoriano';
localStr[country]['ro2'] = 'Imperiano';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ar\u00EDete';
localStr[country]['ro7'] = 'Catapulta de Fogo';
localStr[country]['ro8'] = 'Senador';
localStr[country]['ro9'] = 'Colonizador';

localStr[country]['ga_'] = 'Gauleses';
localStr[country]['ga0'] = 'Falange';
localStr[country]['ga1'] = 'Espadachim';
localStr[country]['ga2'] = 'Batedor';
localStr[country]['ga3'] = 'Trov\u0227o Theutate';
localStr[country]['ga4'] = 'Cavaleiro Druida';
localStr[country]['ga5'] = 'Haeduano';
localStr[country]['ga6'] = 'Ar\u00EDete';
localStr[country]['ga7'] = 'Trabuquete';
localStr[country]['ga8'] = 'Chefe de Cl\u0227';
localStr[country]['ga9'] = 'Colonizador';

localStr[country]['ge_'] = 'Teut\u00F5es';
localStr[country]['ge0'] = 'Salteador';
localStr[country]['ge1'] = 'Lanceiro';
localStr[country]['ge2'] = 'Barbaro';
localStr[country]['ge3'] = 'Espi\u0227o';
localStr[country]['ge4'] = 'Paladino';
localStr[country]['ge5'] = 'Cavaleiro Teut\u0227o';
localStr[country]['ge6'] = 'Ariete';
localStr[country]['ge7'] = 'Catapulta';
localStr[country]['ge8'] = 'Chefe';
localStr[country]['ge9'] = 'Colonizadores';


// ----------
// ro rumaenien
// ----------
country = 'ro';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resurse';
localStr[country]['re1'] = 'Lemn';
localStr[country]['re2'] = 'Lut';
localStr[country]['re3'] = 'Fier';
localStr[country]['re4'] = 'Hrana';

localStr[country]['ro_'] = 'Romani';
localStr[country]['ro0'] = 'Legionar';
localStr[country]['ro1'] = 'Pretorian';
localStr[country]['ro2'] = 'Imperian';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Berbec';
localStr[country]['ro7'] = 'Catapulta';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Colonist';

localStr[country]['ga_'] = 'Daci';
localStr[country]['ga0'] = 'Scutier';
localStr[country]['ga1'] = 'Pedestru';
localStr[country]['ga2'] = 'Iscoada';
localStr[country]['ga3'] = 'Calaret Fulger';
localStr[country]['ga4'] = 'Druidier';
localStr[country]['ga5'] = 'Tarabostes';
localStr[country]['ga6'] = 'Berbec';
localStr[country]['ga7'] = 'Catapulta';
localStr[country]['ga8'] = 'General';
localStr[country]['ga9'] = 'Colonist';

localStr[country]['ge_'] = 'Barbari';
localStr[country]['ge0'] = 'Maciucar';
localStr[country]['ge1'] = 'Lancier';
localStr[country]['ge2'] = 'Executor';
localStr[country]['ge3'] = 'Spion';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Cavaler teuton';
localStr[country]['ge6'] = 'Berbec';
localStr[country]['ge7'] = 'Catapulta';
localStr[country]['ge8'] = 'Capetenie';
localStr[country]['ge9'] = 'Colonist';

// ----------
// rs serbisch
// ----------
country = 'rs';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = '\u0420\u0438\u043C\u0459\u0430\u043D\u0438';
localStr[country]['ro0'] = '\u041B\u0435\u0433\u0438\u043E\u043D\u0430\u0440';
localStr[country]['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0438j\u0430\u043D\u0430\u0446';
localStr[country]['ro2'] = '\u0418\u043C\u043F\u0435\u0440\u0438j\u0430\u043D\u0430\u0446';
localStr[country]['ro3'] = '\u0418\u0437\u0432\u0438\u0452\u0430\u0447';
localStr[country]['ro4'] = '\u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432\u0430 \u041A\u043E\u045A\u0438\u0446\u0430';
localStr[country]['ro5'] = '\u0426\u0435\u0437\u0430\u0440\u0435\u0432\u0430 \u041A\u043E\u045A\u0438\u0446\u0430';
localStr[country]['ro6'] = '\u041E\u0432\u0430\u043D';
localStr[country]['ro7'] = '\u0412\u0430\u0442\u0440\u0435\u043D\u0438 \u043A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
localStr[country]['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440';
localStr[country]['ro9'] = '\u041D\u0430\u0441\u0435\u0459\u0435\u043D\u0438\u043A';

localStr[country]['ga_'] = '\u0413\u0430\u043B\u0438';
localStr[country]['ga0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430';
localStr[country]['ga1'] = '\u041C\u0430\u0447\u0435\u0432\u0430\u043B\u0430\u0446';
localStr[country]['ga2'] = '\u0418\u0437\u0432\u0438\u0452\u0430\u0447';
localStr[country]['ga3'] = '\u0413\u0430\u043B\u0441\u043A\u0438 \u0412\u0438\u0442\u0435\u0437';
localStr[country]['ga4'] = '\u0414\u0440\u0443\u0438\u0434';
localStr[country]['ga5'] = '\u041A\u043E\u045A\u0430\u043D\u0438\u043A';
localStr[country]['ga6'] = '\u041E\u0432\u0430\u043D';
localStr[country]['ga7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
localStr[country]['ga8'] = '\u0421\u0442\u0430\u0440\u0435\u0448\u0438\u043D\u0430';
localStr[country]['ga9'] = '\u041D\u0430\u0441\u0435\u0459\u0435\u043D\u0438\u043A';

localStr[country]['ge_'] = '\u0422\u0435\u0443\u0442\u043E\u043D\u0446\u0438';
localStr[country]['ge0'] = '\u0411\u0430\u0442\u0438\u043D\u0430\u0440';
localStr[country]['ge1'] = '\u041A\u043E\u043F\u0459\u0430\u043D\u0438\u043A';
localStr[country]['ge2'] = '\u0421\u0435\u043A\u0438\u0440\u0430\u0448';
localStr[country]['ge3'] = '\u0418\u0437\u0432\u0438\u0452\u0430\u0447';
localStr[country]['ge4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D';
localStr[country]['ge5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u043A\u0438 \u0432\u0438\u0442\u0435\u0437';
localStr[country]['ge6'] = '\u041E\u0432\u0430\u043D';
localStr[country]['ge7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u0442';
localStr[country]['ge8'] = '\u041F\u043E\u0433\u043B\u0430\u0432\u0438\u0446\u0430';
localStr[country]['ge9'] = '\u041D\u0430\u0441\u0435\u0459\u0435\u043D\u0438\u043A';

// ----------
// ru russisch
// ----------
country = 'ru';
localStr[country] = new Array();

localStr[country]['npc'] = 'NPC \u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446';

localStr[country]['res'] = '\u0420\u0435\u0441\u0443\u0440\u0441\u044B';
localStr[country]['re1'] = '\u0414\u0435\u0440\u0435\u0432\u043E';
localStr[country]['re2'] = '\u0413\u043B\u0438\u043D\u0430';
localStr[country]['re3'] = '\u0416\u0435\u043B\u0435\u0437\u043E';
localStr[country]['re4'] = '\u0417\u0435\u0440\u043D\u043E';

localStr[country]['ro_'] = '\u0420\u0438\u043C\u043B\u044F\u043D\u0435';
localStr[country]['ro0'] = '\u041B\u0435\u0433\u0438\u043E\u043D\u0435\u0440';
localStr[country]['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0438\u0430\u043D\u0435\u0446';
localStr[country]['ro2'] = '\u0418\u043C\u0435\u043F\u0435\u0440\u0438\u0430\u043D\u0435\u0446';
localStr[country]['ro3'] = '\u041A\u043E\u043D\u043D\u044B\u0439 \u0420\u0430\u0437\u0432\u0435\u0434\u0447\u0438\u043A';
localStr[country]['ro4'] = '\u041A\u043E\u043D\u043D\u0438\u0446\u0430 \u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430';
localStr[country]['ro5'] = '\u041A\u043E\u043D\u043D\u0438\u0446\u0430 \u0426\u0435\u0437\u0430\u0440\u044F';
localStr[country]['ro6'] = '\u0422\u0430\u0440\u0430\u043D';
localStr[country]['ro7'] = '\u041E\u0433\u043D\u0435\u043D\u043D\u0430\u044F \u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
localStr[country]['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440';
localStr[country]['ro9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446';

localStr[country]['ga_'] = '\u0413\u0435\u0440\u043C\u0430\u043D\u0446\u044B';
localStr[country]['ga0'] = '\u0414\u0443\u0431\u0438\u043D\u0449\u0438\u043A';
localStr[country]['ga1'] = '\u041A\u043E\u043F\u044C\u0435\u043D\u043E\u0441\u0435\u0446';
localStr[country]['ga2'] = '\u0422\u043E\u043F\u043E\u0440\u0449\u0438\u043A';
localStr[country]['ga3'] = '\u0421\u043A\u0430\u0443\u0442';
localStr[country]['ga4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D';
localStr[country]['ga5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u043A\u0430\u044F \u041A\u043E\u043D\u043D\u0438\u0446\u0430';
localStr[country]['ga6'] = '\u0421\u0442\u0435\u043D\u043E\u0431\u0438\u0442\u043D\u043E\u0435 \u041E\u0440\u0443\u0434\u0438\u0435';
localStr[country]['ga7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
localStr[country]['ga8'] = '\u0412\u043E\u0436\u0434\u044C';
localStr[country]['ga9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446';

localStr[country]['ge_'] = '\u0413\u0430\u043B\u043B\u044B';
localStr[country]['ge0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430';
localStr[country]['ge1'] = '\u041C\u0435\u0447\u043D\u0438\u043A';
localStr[country]['ge2'] = '\u0421\u043B\u0435\u0434\u043E\u043F\u044B\u0442';
localStr[country]['ge3'] = '\u0422\u0435\u0432\u0442\u0430\u0442\u0441\u043A\u0438\u0439 \u0413\u0440\u043E\u043C';
localStr[country]['ge4'] = '\u0414\u0440\u0443\u0438\u0434-\u0412\u0441\u0430\u0434\u043D\u0438\u043A';
localStr[country]['ge5'] = '\u042D\u0434\u0443\u0439\u0441\u043A\u0430\u044F \u041A\u043E\u043D\u043D\u0438\u0446\u0430';
localStr[country]['ge6'] = '\u0422\u0430\u0440\u0430\u043D';
localStr[country]['ge7'] = '\u0422\u0440\u0435\u0431\u0443\u0447\u0435\u0442';
localStr[country]['ge8'] = '\u041F\u0440\u0435\u0434\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C';
localStr[country]['ge9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446';

// ----------
// se swedish
// ----------
country = 'se';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC handel';

localStr[country]['res'] = 'Resurser';
localStr[country]['re1'] = 'Tr\u00E4';
localStr[country]['re2'] = 'Lera';
localStr[country]['re3'] = 'J\u00E4rn';
localStr[country]['re4'] = 'Vete';

localStr[country]['ro_'] = 'Romare';
localStr[country]['ro0'] = 'Legion\u00E4rer';
localStr[country]['ro1'] = 'Praetorianer';
localStr[country]['ro2'] = 'Imperiesoldater';
localStr[country]['ro3'] = 'Sp\u00E5rare';
localStr[country]['ro4'] = 'Imperieriddare';
localStr[country]['ro5'] = 'Ceasarriddare';
localStr[country]['ro6'] = 'Murbr\u00E4cka';
localStr[country]['ro7'] = 'Eldkatapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Nybyggare';

localStr[country]['ga_'] = 'Galler';
localStr[country]['ga0'] = 'Falanx';
localStr[country]['ga1'] = 'Sv\u00E4rdsk\u00E4mpe';
localStr[country]['ga2'] = 'Sp\u00E5rare';
localStr[country]['ga3'] = 'Theutates Blixt';
localStr[country]['ga4'] = 'Druidryttare';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Murbr\u00E4cka';
localStr[country]['ga7'] = 'Krigskatapult';
localStr[country]['ga8'] = 'H\u00F6vding';
localStr[country]['ga9'] = 'Nybyggare';

localStr[country]['ge_'] = 'Germaner';
localStr[country]['ge0'] = 'Klubbman';
localStr[country]['ge1'] = 'Spjutman';
localStr[country]['ge2'] = 'Yxman';
localStr[country]['ge3'] = 'Scout';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Germansk knekt';
localStr[country]['ge6'] = 'Murbr\u00E4cka';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Stamledare';
localStr[country]['ge9'] = 'Nybyggare';

// ----------
// si slowenien
// ----------
country = 'si';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC trgovanje';

localStr[country]['res'] = 'Surovine';
localStr[country]['re1'] = 'Les';
localStr[country]['re2'] = 'Glina';
localStr[country]['re3'] = '\u017Delezo';
localStr[country]['re4'] = '\u017Dito';

localStr[country]['ro_'] = 'Rimljani';
localStr[country]['ro0'] = 'Legionar';
localStr[country]['ro1'] = 'Praetorian';
localStr[country]['ro2'] = 'Imperian';
localStr[country]['ro3'] = 'Izvidnik';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Oblegovalni oven';
localStr[country]['ro7'] = 'Ognjeni katapult';
localStr[country]['ro8'] = 'Senator';
localStr[country]['ro9'] = 'Kolonist';

localStr[country]['ga_'] = 'Galci';
localStr[country]['ga0'] = 'Falanga';
localStr[country]['ga1'] = 'Me\u010Devalec';
localStr[country]['ga2'] = 'Stezosledec';
localStr[country]['ga3'] = 'Theutatesova Strela';
localStr[country]['ga4'] = 'Druid';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Oblegovalni Oven';
localStr[country]['ga7'] = 'Trebu\u0161et';
localStr[country]['ga8'] = 'Poglavar';
localStr[country]['ga9'] = 'Kolonist';

localStr[country]['ge_'] = 'Tevtoni';
localStr[country]['ge'] = 'Gorja\u010Dar';
localStr[country]['ge'] = 'Suli\u010Dar';
localStr[country]['ge'] = 'Metalec sekir';
localStr[country]['ge'] = 'Skavt';
localStr[country]['ge'] = 'Paladin';
localStr[country]['ge'] = 'Tevtonski vitez';
localStr[country]['ge'] = 'Oblegovalni oven';
localStr[country]['ge'] = 'Katapult';
localStr[country]['ge'] = 'Vodja';
localStr[country]['ge'] = 'Kolonist';


// ----------
// sk slowakei
// ----------
country = 'sk';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Rimania';
localStr[country]['ro0'] = 'Legion\u00E1r';
localStr[country]['ro1'] = 'Pretori\u00E1n';
localStr[country]['ro2'] = 'Imperi\u00E1n';
localStr[country]['ro3'] = 'Equites Leg\u00E1ti';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'R\u00EDmske baranidlo';
localStr[country]['ro7'] = 'Ohniv\u00FD katapult';
localStr[country]['ro8'] = 'Sen\u00E1tor';
localStr[country]['ro9'] = 'Osadn\u00EDk';

localStr[country]['ga_'] = 'Galovia';
localStr[country]['ga0'] = 'Falanx';
localStr[country]['ga1'] = '\u0160ermiar';
localStr[country]['ga2'] = 'Sliedi\u010D';
localStr[country]['ga3'] = 'Theutates Blesk';
localStr[country]['ga4'] = 'Druid jazdec';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Dreven\u00E9 baranidlo';
localStr[country]['ga7'] = 'Vojensk\u00FD katapult';
localStr[country]['ga8'] = 'N\u00E1\u010Deln\u00EDk';
localStr[country]['ga9'] = 'Osadn\u00EDk';

localStr[country]['ge_'] = 'Germ\u00E1ni';
localStr[country]['ge0'] = 'P\u00E1lkar';
localStr[country]['ge1'] = 'O\u0161tep\u00E1r';
localStr[country]['ge2'] = 'Bojovn\u00EDk so sekerou';
localStr[country]['ge3'] = '\u0160peh';
localStr[country]['ge4'] = 'Rytier';
localStr[country]['ge5'] = 'Teuton jazdec';
localStr[country]['ge6'] = 'Germ\u00E1nske baranidlo';
localStr[country]['ge7'] = 'Katapult';
localStr[country]['ge8'] = 'Kme\u0148ov\u00FD vodca';
localStr[country]['ge9'] = 'Osadn\u00EDk';

// ----------
// com.tr tuerkei
// ----------
country = 'com.tr';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = 'Romal\u0131lar';
localStr[country]['ro0'] = 'Lejyoner';
localStr[country]['ro1'] = 'Pretoryan';
localStr[country]['ro2'] = 'Emperyan';
localStr[country]['ro3'] = 'Equites Legati';
localStr[country]['ro4'] = 'Equites Imperatoris';
localStr[country]['ro5'] = 'Equites Caesaris';
localStr[country]['ro6'] = 'Ko\u00E7ba\u015F\u0131';
localStr[country]['ro7'] = 'Ate\u015F Manc\u0131n\u0131\u011F\u0131';
localStr[country]['ro8'] = 'Senat\u00F6r';
localStr[country]['ro9'] = 'G\u00F6\u00E7men';

localStr[country]['ga_'] = 'Galyal\u0131lar';
localStr[country]['ga0'] = 'Phalanx';
localStr[country]['ga1'] = 'K\u0131l\u0131\u00E7l\u0131';
localStr[country]['ga2'] = 'Casus';
localStr[country]['ga3'] = 'Toytat\u0131n \u015Eim\u015Fe\u011Fi';
localStr[country]['ga4'] = 'Druyid';
localStr[country]['ga5'] = 'Haeduan';
localStr[country]['ga6'] = 'Ko\u00E7ba\u015F\u0131';
localStr[country]['ga7'] = 'Manc\u0131n\u0131k';
localStr[country]['ga8'] = 'Kabile Reisi';
localStr[country]['ga9'] = 'G\u00F6\u00E7men';

localStr[country]['ge_'] = 'Cermenler';
localStr[country]['ge0'] = 'Tokmak Sallayan';
localStr[country]['ge1'] = 'M\u0131zrak\u00E7\u0131';
localStr[country]['ge2'] = 'Balta Sallayan';
localStr[country]['ge3'] = 'Casus';
localStr[country]['ge4'] = 'Paladin';
localStr[country]['ge5'] = 'Toyton';
localStr[country]['ge6'] = 'Toyton';
localStr[country]['ge7'] = 'Manc\u0131n\u0131k';
localStr[country]['ge8'] = 'Reis';
localStr[country]['ge9'] = 'G\u00F6\u00E7men';

// ----------
// com.ua ukraine
// ----------
country = 'com.ua';
localStr[country] = new Array();
localStr[country]['npc'] = 'NPC';

localStr[country]['res'] = 'Resources';
localStr[country]['re1'] = 'Wood';
localStr[country]['re2'] = 'Clay';
localStr[country]['re3'] = 'Iron';
localStr[country]['re4'] = 'Crop';

localStr[country]['ro_'] = '\u0440\u0438\u043C\u043B\u044F\u043D\u0438';
localStr[country]['ro0'] = '\u041B\u0435\u0433\u0456\u043E\u043D\u0435\u0440';
localStr[country]['ro1'] = '\u041F\u0440\u0435\u0442\u043E\u0440\u0456\u0430\u043D\u0435\u0446\u044C';
localStr[country]['ro2'] = '\u0406\u043C\u043F\u0435\u0440\u0456\u0430\u043D\u0435\u0446\u044C';
localStr[country]['ro3'] = '\u041A\u0456\u043D\u043D\u0438\u0439 \u0440\u043E\u0437\u0432\u0456\u0434\u043D\u0438\u043A';
localStr[country]['ro4'] = '\u041A\u0456\u043D\u043D\u043E\u0442\u0430 \u0456\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430';
localStr[country]['ro5'] = '\u041A\u0456\u043D\u043D\u043E\u0442\u0430 \u0426\u0435\u0437\u0430\u0440\u044F';
localStr[country]['ro6'] = '\u0422\u0430\u0440\u0430\u043D';
localStr[country]['ro7'] = '\u0412\u043E\u0433\u043D\u044F\u043D\u0430 \u043A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
localStr[country]['ro8'] = '\u0421\u0435\u043D\u0430\u0442\u043E\u0440';
localStr[country]['ro9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446\u044C';

localStr[country]['ga_'] = '\u0433\u0430\u043B\u043B\u0438';
localStr[country]['ga0'] = '\u0424\u0430\u043B\u0430\u043D\u0433\u0430';
localStr[country]['ga1'] = '\u041C\u0435\u0447\u043D\u0438\u043A';
localStr[country]['ga2'] = '\u0421\u043B\u0456\u0434\u043E\u043F\u0438\u0442';
localStr[country]['ga3'] = '\u0422\u0435\u0432\u0442\u0430\u0446\u044C\u043A\u0438\u0439 \u0433\u0440\u0456\u043C';
localStr[country]['ga4'] = '\u0414\u0440\u0443\u0457\u0434-\u0432\u0435\u0440\u0448\u043D\u0438\u043A';
localStr[country]['ga5'] = '\u0415\u0434\u0443\u0439\u0441\u044C\u043A\u0430 \u043A\u0456\u043D\u043D\u043E\u0442\u0430';
localStr[country]['ga6'] = '\u0422\u0430\u0440\u0430\u043D';
localStr[country]['ga7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
localStr[country]['ga8'] = '\u041B\u0456\u0434\u0435\u0440';
localStr[country]['ga9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446\u044C';

localStr[country]['ge_'] = '\u0442\u0435\u0432\u0442\u043E\u043D\u0446\u0456';
localStr[country]['ge0'] = '\u0414\u0443\u0431\u0438\u043D\u043D\u0438\u043A';
localStr[country]['ge1'] = '\u0421\u043F\u0438\u0441\u043D\u0438\u043A';
localStr[country]['ge2'] = '\u0421\u043E\u043A\u0438\u0440\u043D\u0438\u043A';
localStr[country]['ge3'] = '\u0421\u043A\u0430\u0443\u0442';
localStr[country]['ge4'] = '\u041F\u0430\u043B\u0430\u0434\u0438\u043D';
localStr[country]['ge5'] = '\u0422\u0435\u0432\u0442\u043E\u043D\u0441\u044C\u043A\u0438\u0439 \u0432\u0435\u0440\u0448\u043D\u0438\u043A';
localStr[country]['ge6'] = '\u0421\u0442\u0456\u043D\u043E\u0431\u0438\u0442\u043D\u0435 \u0437\u043D\u0430\u0440\u044F\u0434\u0434\u044F';
localStr[country]['ge7'] = '\u041A\u0430\u0442\u0430\u043F\u0443\u043B\u044C\u0442\u0430';
localStr[country]['ge8'] = '\u0412\u0430\u0442\u0430\u0436\u043E\u043A';
localStr[country]['ge9'] = '\u041F\u043E\u0441\u0435\u043B\u0435\u043D\u0435\u0446\u044C';

// ----------
// co.uk english
// ----------
localStr['co.uk']  = localStr['com']

// ----------
// us english
// ----------
localStr['us']     = localStr['com']


///////////////////////////////////////////////////////////////////////////////
// Variables
///////////////////////////////////////////////////////////////////////////////
var vorrat = new Array();
var lager = new Array();
var elAllDiv, newTABLE, newTEXT, newTR, newTD, newB, newBR, volk;
var volkK = new Array ('', 'ro_', 'ga_', 'ge_');
var summe = 0;
var spieler = '';


///////////////////////////////////////////////////////////////////////////////
// Units : Name, Cost Wood / Clay / Iron / Wheat, Sum
///////////////////////////////////////////////////////////////////////////////
var einheit = new Array();

function einheitenFestlegen(country) {
   var v = volkK[1];
   // Roemer
   einheit[v]    = new Array();
   einheit[v][0] = new Array(localStr[country]['ro0'], 120, 100, 180, 40, 440);
   einheit[v][1] = new Array(localStr[country]['ro1'], 100, 130, 160, 70, 460);
   einheit[v][2] = new Array(localStr[country]['ro2'], 150, 160, 210, 80, 600);
   einheit[v][3] = new Array(localStr[country]['ro3'], 140, 160, 20, 40, 360);
   einheit[v][4] = new Array(localStr[country]['ro4'], 550, 440, 320, 100, 1410);

   einheit[v][5] = new Array(localStr[country]['ro5'], 550, 640, 800, 180, 2170);
   einheit[v][6] = new Array(localStr[country]['ro6'], 900, 360, 500, 70, 1830);
   einheit[v][7] = new Array(localStr[country]['ro7'], 950, 1350, 600, 90, 2990);
   einheit[v][8] = new Array(localStr[country]['ro8'], 30750, 27200, 45000, 37500, 140450);
   einheit[v][9] = new Array(localStr[country]['ro9'], 5800, 5300, 7200, 5500, 23800);

   var v = volkK[2];
   // Gallier
   einheit[v]    = new Array();
   einheit[v][0] = new Array(localStr[country]['ga0'], 100, 130, 55, 30, 315);
   einheit[v][1] = new Array(localStr[country]['ga1'], 140, 150, 185, 60, 535);
   einheit[v][2] = new Array(localStr[country]['ga2'], 170, 150, 20, 40, 380);
   einheit[v][3] = new Array(localStr[country]['ga3'], 350, 450, 230, 60, 1090);
   einheit[v][4] = new Array(localStr[country]['ga4'], 360, 330, 280, 120, 1090);
   einheit[v][5] = new Array(localStr[country]['ga5'], 500, 620, 675, 170, 1965);
   einheit[v][6] = new Array(localStr[country]['ga6'], 950, 555, 330, 75, 1910);
   einheit[v][7] = new Array(localStr[country]['ga7'], 960, 1450, 630, 90, 3130);
   einheit[v][8] = new Array(localStr[country]['ga8'], 30750, 45400, 31000, 37500, 144650);
   einheit[v][9] = new Array(localStr[country]['ga9'], 5500, 7000, 5300, 4900, 22700);

   var v = volkK[3];
   // Germanen
   einheit[v]    = new Array();
   einheit[v][0] = new Array(localStr[country]['ge0'], 95, 75, 40, 40, 250);
   einheit[v][1] = new Array(localStr[country]['ge1'], 145, 70, 85, 40, 340);
   einheit[v][2] = new Array(localStr[country]['ge2'], 130, 120, 170, 70, 490);
   einheit[v][3] = new Array(localStr[country]['ge3'], 160, 100, 50, 50, 360);
   einheit[v][4] = new Array(localStr[country]['ge4'], 370, 270, 290, 75, 1005);
   einheit[v][5] = new Array(localStr[country]['ge5'], 450, 515, 480, 80, 1525);
   einheit[v][6] = new Array(localStr[country]['ge6'], 1000, 300, 350, 70, 1720);
   einheit[v][7] = new Array(localStr[country]['ge7'], 900, 1200, 600, 60, 2760);
   einheit[v][8] = new Array(localStr[country]['ge8'], 35500, 26600, 25000, 27200, 114300);
   einheit[v][9] = new Array(localStr[country]['ge9'], 7200, 5500, 5800, 6500, 25000);
}

///////////////////////////////////////////////////////////////////////////////
// Unicode Letters
///////////////////////////////////////////////////////////////////////////////
var summenzeichen = '\u2211';
var fragezeichen  = '?';
var haken         = '\u2714';


///////////////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////////////

function kleinster(a, b) { if (a < b) {return a} else {return b }; }
// liefert den kleineren der beiden werte


function seite() { return window.location.pathname.substr(window.location.pathname.indexOf(fragezeichen) + 1);}
// liefert die aufgerufene seite ohne parameter


function seite_parameter() { 
// liefert die parameter der aufgerufene seite
  var idx = window.location.href.indexOf(fragezeichen);
  if (idx==-1) {return ''} else {return window.location.href.substr(idx + 1); }
}


function contains(a, b) {return (a.indexOf(b) != - 1)}
// liefert true, wenn b in a enthalten ist


function gup( name )
// extrahiert den Parameter 'name' aus einer URL
// www.beispiel.de ? test = gelungen
// gup('test') liefert 'gelungen'
{
   name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
   var regexS = "[\\?&]" + name + "=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec( window.location.href );
   if( results == null )
   return "";
   else
   return results[1];
}


function language() {
   // liefert die 'Sprache' XXX = Server - Adresse travian.XXX
   var myHost = window.location.host;
   var sprache = myHost.substr(myHost.indexOf('travian.') + 8)
   if (localStr[sprache] == null) {
      sprache = 'com'
   }
   // falls noch keine Uebersetzung fuer diesen Server vorliegt -> English
   return sprache;
}


function calculateRest(tmp) {
   var resObj = document.getElementsByName("m2[]");
   var rest = summe;

   // restliche Ressis ermitteln
   for (var i = 0; i < resObj.length; i ++ ) {
      rest -= tmp[i];

   }
   // restliche Ressis verteilen
   while (rest > 0) {
      for (var i = 0; ((i < 4) && (rest > 0)); i ++ )  {
         if (tmp[i] < lager[i]) {
            tmp[i] += 1;
            rest -= 1;
         }
      }
   }
   for (var i = 0; i < 4; i ++ )  {
      // eintragen
      resObj[i].value = tmp[i];
      // differenz ermitteln, ggf. vorzeichen + hinzufuegen
      dif = tmp[i] - parseInt(document.getElementById("org" + i).innerHTML);
      if (dif > 0) newHTML = "+" + dif;
      document.getElementById("diff" + i).innerHTML = dif;
   }
   document.getElementById("newsum").innerHTML = summe;
   document.getElementById("remain").innerHTML = 0;
   document.getElementById("submitText").innerHTML = "";
   document.getElementById("submitButton").style.display = "block";
}


function ressisAuslesen() {
   // analysiert die Original - Seite und liest die vorhandenen Ressis ein
   var elAllTD, kn;
   var cnt = 0;
   // Zaehlt die gefundenen Ressi - Arten (max = 4 : Holz, Lehm, Eisen, Getreide)
   summe = 0;
   // hier kommt die Gesamtsumme rein

   var elAllTD = document.getElementsByTagName('TD');
   for (var i = 0; ((i < elAllTD.length) && (cnt < 4));
   i ++ ) {
      // untersuche alle TD - Elemente, bis alle 4 Ressi - Arten gefunden wurden
      kn = elAllTD[i].firstChild;
      while ((kn != null) && (cnt < 4)){
         if (kn.nodeType == 3) {
            // falls es ein Text - Knoten ist
            zeile = kn.data;
            if ((contains(zeile, '/')) && (contains('1234567890', zeile.substr(0, 1)))) {
               vorrat[cnt] = parseInt(zeile.substr(0, zeile.indexOf('/')));
               lager[cnt] = parseInt(zeile.substr(zeile.indexOf('/') + 1));
               summe += vorrat[cnt];
               cnt += 1;
            }
         }
         kn = kn.nextSibling;
      }
   }
}

function berechneAnzahl(v, nr) {
   // die maximale Anzahl der zu erschaffenden Truppen
   var anzahl;
   anzahl = (summe / einheit[v][nr][5]);
   for (var i = 0; i < 4; i ++ ) {
      if ((anzahl * einheit[v][nr][i + 1]) > lager[i]) {
         anzahl = lager[i] / einheit[v][nr][i + 1];
      }
   }
   anzahl = Math.floor(anzahl) // auf ganze Zahlen abrunden
   return anzahl
}


function berechneRessis (v, nr) {
   // berechnet die einzelnen Ressis fuer die maximale Anzahl der zu erschaffenden Truppen
   var resObj = document.getElementsByName("m2[]");
   var tmp = new Array;
   anzahl = berechneAnzahl(v, nr);
   if (anzahl > 0) {
      for (var i = 0; i < 4; i ++ ) {
         tmp[i] = anzahl * einheit[v][nr][i + 1]
      }
      calculateRest(tmp);
   }
}


function insertTruppenLink(v, nr, elt, addy) {
   // fuegt einen Link ein
   var setupLink = document.createElement('A');
   setupLink.innerHTML = '<font size="-2"><nobr> (' + berechneAnzahl(v, nr, summe)  + ') ' + einheit[v][nr][0] + '</nobr></FONT>';
   setupLink.setAttribute("href", '#');
   setupLink.addEventListener("click", function() {
      berechneRessis (v, nr, summe);
   }
   , false);

   newIMG = document.createElement('IMG');
   newIMG.src = 'http://help.travian.de/images/troops/tid' + parseInt(addy) + '.gif';

   newBR = document.createElement('BR');

   elt.appendChild(newIMG);
   elt.appendChild(setupLink);
   elt.appendChild(newBR);
}


function insertRessiLink(r, elt) {
   // fuegt einen Link ein
   newIMG = document.createElement('IMG');
   newIMG.src = '/img/un/r/' + r + '.gif';
   elt.appendChild(newIMG);

   var setupLink = document.createElement('A');
   setupLink.innerHTML = '<font size="-2"> ' + localStr[language()]['re' + r] + '</FONT>';
   setupLink.setAttribute("href", '#');
   setupLink.addEventListener("click", function() {
      setRessis(r - 1, summe);
   }
   , false);
   elt.appendChild(setupLink);

   newBR = document.createElement('BR');
   elt.appendChild(newBR);
}

function setRessis (r) {
   // verteilt die ressis entsprechend des geforderten rohstoffes
   var tmp = new Array;

   for (var i = 0; i < 4; i ++ ) {
      if (i == r) {
         if (i < 3) {
            tmp[i] = kleinster (lager[0], summe);
         }
         else {
            tmp[i] = kleinster (lager[3], summe);
         }
      }
      else {
         tmp[i] = 0;
      }
   }
   calculateRest(tmp);
}


function generiereNPCEintrag() {
   // erzeugt den Eintrag auf der Seite

   function einfuegen(r) {
      var a;
      switch (parseInt(r)) {
         case 2 :
            a = 21;
            break;
         case 3 :
            a = 11;
            break;
         default :
            a = 1;
      }
      newTD = document.createElement('TD');
      newTD.vAlign = 'top';
      newTD.width = '40%';
      newTR.appendChild(newTD);

      newB = document.createElement('B');
      newTEXT = document.createTextNode(localStr[language()][volkK[r]]);
      newB.appendChild(newTEXT);
      newTD.appendChild(newB);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j = 0;j < 3;j ++ ) {
         insertTruppenLink(volkK[r], j, newTD, j + a);
      }

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j = 3;j < 6;j ++ ) {
         insertTruppenLink(volkK[r], j, newTD, j + a);
      }

      newTD = document.createElement('TD');
      newTD.width = '40%';
      newTD.vAlign = 'top';
      newTR.appendChild(newTD);

      newBR = document.createElement('BR');
      newTD.appendChild(newBR);

      for (j = 6;j < 10;j ++ ) {
         insertTruppenLink(volkK[r], j, newTD, j + a);
      }
   }

   if (contains(seite_parameter(), '&tribe=')) {
      volk = gup('tribe');
      GM_setValue(window.location.hostname + spieler + '_volk_', volk);
   }


   elAllDiv = document.getElementsByTagName('P');
   for ( i = 0; i < elAllDiv.length; i ++ ) {
      if (i == 0 ) {
         elAllDiv[i].parentNode.removeChild(elAllDiv[i]);

      }
      if (i == 2 ) {
         elAllDiv[i].innerHTML = '';

         newDIVall = document.createElement('DIV');
         elAllDiv[i].parentNode.insertBefore(newDIVall, elAllDiv[i]);

         // Tabelle
         newBR = document.createElement('BR');
         newDIVall.appendChild(newBR);

         newDIV = document.createElement('DIV');
         newDIV.className = 'f10 b';
         newDIVall.appendChild(newDIV);

         newTABLE = document.createElement('TABLE');
         newTABLE.className = 'f10';
         newDIVall.appendChild(newTABLE);

         newTR = document.createElement('TR');
         newTABLE.appendChild(newTR);

         einfuegen(volk);

         // Rohstoffe
         newTD = document.createElement('TD');
         newTD.vAlign = 'top';
         newTD.width = '15%';
         newTR.appendChild(newTD);

         newB = document.createElement('B');
         newTEXT = document.createTextNode(localStr[language()]['res']);
         newB.appendChild(newTEXT);
         newTD.appendChild(newB);

         newBR = document.createElement('BR');
         newTD.appendChild(newBR);

         for (j = 1;j < 5;j ++ ) {
            insertRessiLink(j, newTD)
         }
      }
   }

   var tmp = new Array();
   for (var i = 1; i < 5; i ++ ) {
      if ( ! (p = parseInt(gup('r' + i)))) {
         p = 0
      }
      tmp[i - 1] = p;
   }
   if (gup('r1') != '') {
      calculateRest(tmp);

   }
   ;
}


function generiereNPCLink() {
   // erzeugt den Link in der Menu - Leiste
   elAllDiv = document.getElementsByTagName('A');
   newA = document.createElement('A');
   newA.href = '/build.php?gid=17&t=3';
   newA.innerHTML = localStr[language()]['npc'];
   elAllDiv[12].parentNode.insertBefore(newA, elAllDiv[12]);
}


function volkAuslesen() {
   // liest das gespeicherte Volk aus. Falls keins gespeichert ist, wird Roemer als Standard gesetzt
   volk = GM_getValue(window.location.hostname + spieler + '_volk_');
   if (volk) {
      if ((volk != '1') && (volk != '2') && (volk != '3')){
         volk = 0;
      }
   }
   else {
      volk = 0
   }
   ;
   GM_setValue(window.location.hostname + spieler + '_volk_', volk);
}


function ermittlevolkAusProfil_old() {
   // wertet die geladene Profilseite aus
   return;
   elTD = document.getElementsByTagName('TD');
   for (var i in elTD) {
   if (contains(elTD[i].innerHTML, spieler)) {
      if (contains (elTD[i+9].innerHTML, localStr[language()]['ga_'].substr(0, 3))) {
         volk = 2;
      }
      else {
         if (contains (elTD[i+9].innerHTML, localStr[language()]['ge_'].substr(0, 3))) {
            volk = 3;
         }
         else {
            if (contains (elTD[i+9].innerHTML, localStr[language()]['ro_'].substr(0, 3))) {
               volk = 1;
            }
            else {
               volk = 0;
            }
         }
      }
      GM_setValue(window.location.hostname + spieler + '_volk_', volk);
      fuegeSwitchEin();
    }
  }
}

function ermittlevolkAusProfil() {
  // wertet die geladene Profilseite aus
  elTR = document.getElementsByTagName('TR');
  var cnt = 0;
  volk = 0;

  for (var i=0; volk==0; i++) {
    var TD = elTR[i].firstChild;
    if (TD.innerHTML != undefined) {
      cnt += 1;
      if (cnt == 3) {
        TD = TD.nextSibling;
        v = TD.innerHTML;
        if (contains (v, localStr[language()]['ga_'].substr(0, 3))) { volk = 2; }
        else {
           if (contains (v, localStr[language()]['ge_'].substr(0, 3))) { volk = 3; }
           else { volk = 1; }
        }
        GM_setValue(window.location.hostname + spieler + '_volk_', volk);

        var newINPUT = document.createElement('INPUT');

        newTR = document.createElement('TR');
        elTR[i].parentNode.insertBefore(newTR, elTR[i+1]);

        newTD = document.createElement('TD');
        newTD.className = "s7";
        newTR.appendChild(newTD);

        newTEXT = document.createTextNode(localStr[language()]['npc'] + ':');
        newTD.appendChild(newTEXT);

        newTD = document.createElement('TD');
        newTR.appendChild(newTD);

        newTABLE = document.createElement('TABLE');
        newTD.appendChild(newTABLE);

        for (var i = 1; i < 4; i ++ ) {
           newTR = document.createElement('TR');
           newTABLE.appendChild(newTR);

           newTD = document.createElement('TD');
           newTD.align = 'left';
           newTR.appendChild(newTD);

           newINPUT = document.createElement('INPUT');
           newINPUT.type = 'radio';
           newINPUT.name = 'tribe';
           newINPUT.value = i;
           newINPUT.disabled = true;
           if (volk == i) {
              newINPUT.checked = i;
     
           }
           newTD.appendChild(newINPUT);
     
           newA = document.createElement('A');
           newA.href = '/build.php?gid=17&t=3&tribe=' + i;
           newA.innerHTML = localStr[language()][volkK[i]];
           newTD.appendChild(newA);
        }

        var elTD = document.getElementsByTagName('TD');
        for (var j in elTD) {
          if (elTD[j].className == 'slr3') {
            elTD[j].rowSpan = 12;
          }
        }
      }
    }
  }
}


function getZahlen(s) {
   // extrahiert aus dem String s die Kosten
   var tmp = new Array;
   var sum = 0;
   var i;
   s = s.split(' | ');
   for (var i = 0; i < 4; i ++ ) {
      tmp[i] = '';
      for (j = s[i].length - 1; j > 0; j -- ) {
         if ((s[i].charAt(j) >= "0") && (s[i].charAt(j) <= "9")) {
            tmp[i] = s[i].charAt(j) + tmp[i];
         }
         else {
            j = 0
         }
      }
      sum += parseInt(tmp[i]);
   }
   tmp[4] = sum;
   return tmp;
}


function bearbeiteGebaeudeseite() {
   // fuegt auf der Gebaeude - Seite den Link zum NPC ein
   var url;
   elAllDiv = document.getElementsByTagName('TABLE');
   for (var i = 0; i < elAllDiv.length; i ++ ) {
      if (elAllDiv[i].firstChild.innerHTML) {
         if ((elAllDiv[i].className == 'f10') && (contains(elAllDiv[i].firstChild.innerHTML, 'img class="res"')) && (contains(elAllDiv[i].firstChild.innerHTML, ' | ')))  {
            var s = elAllDiv[i].firstChild.innerHTML;
            t = getZahlen(s);
            // Kosten extrahieren
            if (t[4] <= summe) { // nur wenn genug zum Tauschen vorhanden
              if ( ! ( (vorrat[0] >= t[0]) && (vorrat[1] >= t[1]) && (vorrat[2] >= t[2]) && (vorrat[3] >= t[3]))){ 
                // wenn noch nicht genug von jedem rohstoff da ist
                newA = document.createElement('A');
                newA.href = '/build.php?gid=17&t=3&r1=' + t[0] + '&r2=' + t[1] + '&r3=' + t[2] + '&r4=' + t[3];
                newA.innerHTML = localStr[language()]['npc'];
                elAllDiv[i].appendChild(newA);
              } 
            } else {

              newTR = document.createElement('TR');
              elAllDiv[i].appendChild(newTR);

              newTD = document.createElement('TD');
              newTD.colSpan = 3;
              newTR.appendChild(newTD);
            
              newIMG = document.createElement('IMG');
              newIMG.src = "/img/un/r/1.gif";
              newTD.appendChild(newIMG);
              
              newIMG = document.createElement('IMG');
              newIMG.src = "/img/un/r/2.gif";
              newTD.appendChild(newIMG);
              
              newIMG = document.createElement('IMG');
              newIMG.src = "/img/un/r/3.gif";
              newTD.appendChild(newIMG);
              
              newIMG = document.createElement('IMG');
              newIMG.src = "/img/un/r/4.gif";
              newTD.appendChild(newIMG);
              
              
              newTEXT = document.createTextNode('NPC: '+(summe - t[4]));
              newTD.appendChild(newTEXT);
            }
         }
      }
   }
}


function replaceSome (s) {
   // wandelt alle % 20 zeichen in leerzeichen um
   var sign = '%20';
   while (s.indexOf(sign) > 0) {
      s = s.substr(0, s.indexOf(sign)) + ' ' + s.substr(s.indexOf(sign) + sign.length)
   }
   return s;
}


function leseSpielerNamen() {
   // liest den Spielernamen aus dem Chat - Link aus
   var dl = '?chatname';
   elAllDiv = document.getElementsByTagName('A');
   for (var i = 0; i < elAllDiv.length; i ++ ) {
      var s = elAllDiv[i].href;
      if (contains(s, dl)) {
         s = s.substr(s.indexOf(dl) + dl.length);
         dl = '|';
         spieler = s.substr(s.indexOf(dl) + dl.length);
         spieler = replaceSome(spieler);
      }
   }
}


var tmpSend;
var elAllInputRes;

function rohstoffeEintragen() {
    elAllInputRes[1].value = tmpSend[0]; 
    elAllInputRes[2].value = tmpSend[1]; 
    elAllInputRes[3].value = tmpSend[2]; 
    elAllInputRes[4].value = tmpSend[3]; 
}


function rohstoffeVerschicken () {
  var r = 0;
  var tmpVorrat = new Array;
  
  // kapazitaet der haendler aus dem original script ermitteln
  var haendlerK = unsafeWindow.carry;
  if (!haendlerK) { return false } // function nur ausfuehren, wenn haendlerK definiert ist = wenn Haendlerseite aufgerufen wurde
  
  // anzahl der haendler aus dem original script ermitteln
  var haendler = unsafeWindow.haendler;
       
  ressisAuslesen();
   
  var haendlerKgesamt = kleinster (haendler * haendlerK, summe);
  
  tmpVorrat = vorrat;
  tmpSend   = new Array (0,0,0,0);

  var hKg = haendlerKgesamt;

  while (hKg > 0)
  {
    if (tmpVorrat[r] > 0) {
      tmpSend[r] += 1;
      tmpVorrat[r] -= 1;
      hKg -= 1;
    }
    r += 1; if (r == 4) {r = 0};
  }

  elAllInputRes = document.getElementsByTagName('INPUT');

  elAllTD = document.getElementsByTagName('TD');
  
  for (i in elAllTD) {
    var s = elAllTD[i].innerHTML;
    if (s) {
      if ((contains(s,'upd_res(4,1)')) && (!contains(s,'table'))){
        newTR = document.createElement('TR');
        elAllTD[i].parentNode.parentNode.appendChild(newTR);

        newTD = document.createElement('TD');
        newTD.colSpan = 2;
        newTR.appendChild(newTD);

        newA = document.createElement('A');
        newA.setAttribute("href", '#');
        newA.addEventListener("click", function() {rohstoffeEintragen();  } , false);
        newA.innerHTML = '<img src="/img/un/r/1.gif"> <img src="/img/un/r/2.gif"> <img src="/img/un/r/3.gif"> <img src="/img/un/r/4.gif">';
        newTD.appendChild(newA);
      
        newTD = document.createElement('TD');
        newTR.appendChild(newTD);

        newINPUT = document.createElement('INPUT');
        newINPUT.type = 'Text';
        newINPUT.className = "fm";
        newINPUT.name = 'tribe';
        newINPUT.value = haendlerKgesamt;
        newINPUT.size = 4;
        newINPUT.maxLength = "5" 
        newINPUT.disabled = true;
        newTD.appendChild(newINPUT);      

        newTD = document.createElement('TD');
        newTD.align="center";
        newTD.className = "s7 f8";
        newTR.appendChild(newTD);

        newA = document.createElement('A');
        newA.setAttribute("href", '#');
        newA.addEventListener("click", function() {rohstoffeEintragen();  } , false);
        newA.innerHTML = ' (max)';
        newTD.appendChild(newA);
      }
    }
  }
}


function insertBack() {
  if (unsafeWindow.carry) { return false } 
  // function nur ausfuehren, wenn haendlerK undefiniert ist = wenn nicht Haendlerseite aufgerufen wurde
  
  var elAllP = document.getElementsByTagName('P');
  if (elAllP.length>0) {
    newA = document.createElement('A');
    newA.setAttribute("href", '#');
    newA.addEventListener("click", function() {history.go(-2); } , false);
    newA.innerHTML = '[<<]';
    elAllP[0].parentNode.appendChild(newA);
  }
}

///////////////////////////////////////////////////////////////////////////////
// Main
///////////////////////////////////////////////////////////////////////////////

einheitenFestlegen(language());
// erst einmal die Spracheinstellung

leseSpielerNamen();

if (seite() == '/spieler.php') {
// wenn das Profil aufgerufen wird, immer volk daraus ermitteln und abspeichern
ermittlevolkAusProfil();
}
else {
volkAuslesen();

}

if (volk == 0) {
// wenn das Volk noch nicht abgespeichert wurde, erstmal zum Profil wechseln
document.location.href = document.location.protocol + document.location.hostname + '/spieler.php'
}

if (seite() != '/') {
// wenn die Seite nicht Login - Seite ist
generiereNPCLink();
}

if (seite() == '/build.php') {
// wenn die Gebaeude - Seite aufgerufen wurde
  ressisAuslesen();
  bearbeiteGebaeudeseite();
  rohstoffeVerschicken(); // bearbeitet Haendler-Seite
  if (contains(seite_parameter(), '&t=3')) {
     // wenn die Seite der NPC - Haendler ist
     generiereNPCEintrag();
  }
  if (seite_parameter() == '') {
    insertBack();
  }
}
