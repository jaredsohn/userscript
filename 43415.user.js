/*
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA1

*/

// ==UserScript==
// @name		SoftBank Emoji Reader
// @namespace	http://xent.com/~bsittler/softbank_emoji_reader.user.js
// @description	Makes Emoji (絵文字, a.k.a. pictograms/emoticons) encoded in the Unicode Private Use Area according to SoftBank's scheme viewable in Firefox. The icons inserted are copyrighted and hosted by SoftBank and are apparently free for personal, non-commercial use: http://creation.mb.softbank.jp/web/web_pic_about.html NOTE: The author of this script is in no way associated with SoftBank, and any trademarks referenced herein remain the sole property of their owners.
// @include	*
// ==/UserScript==

// Original script by photar.
//
// Partial speedup, text alternates and switch to SoftBank's
// free-for-personal-noncommercial-use animated GIFs by bsittler.
//
// Description of SoftBank/Vodaphone Emoji:
//   http://creation.mb.softbank.jp/web/web_pic_about.html
//
// Summary of iPhone Emoji support, including screenshots:
//   http://www.eddiewong.net/2008/11/24/emoji-on-iphone-3g/comment-page-1/
//
// Longer-term, a proposal for Unicode Emoji standardization:
//   http://unicode.org/~scherer/emoji4unicode/snapshot/full.html
//
// Source of many of the Kaomoji used in "text" theme:
//   http://jankey.hp.infoseek.co.jp/kaomoj.shtml

// TODO: Hook DOM mutation events and use a timeout to rescan
// after the document changes and subsequently restabilizes.
//   http://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-eventgroupings-mutationevents

(function () {

var textMap, animated, replacements, regex, key, textnodes, node, s;

// SoftBank provides animated GIFs for these Emoji
animated = [
'E101','E102','E103','E104','E105','E106','E107','E108','E10D','E10F',
'E113','E115','E117','E11B','E11D','E12B','E130','E201','E206','E219',
'E30C','E310','E311','E312','E313','E317','E31E','E31F','E320','E325',
'E326','E327','E328','E329','E32E','E335','E336','E337','E34B','E409',
'E40D','E412','E417','E41C','E41E','E41F','E422','E423','E428','E429',
'E42D','E433','E437','E43E','E440','E442','E447','E44B','E51F'];

// These are the supported Emoji
replacements = [
'E001','E002','E003','E004','E005','E006','E007','E008','E009','E00A',
'E00B','E00C','E00D','E00E','E00F','E010','E011','E012','E013','E014',
'E015','E016','E017','E018','E019','E01A','E01B','E01C','E01D','E01E',
'E01F','E020','E021','E022','E023','E024','E025','E026','E027','E028',
'E029','E02A','E02B','E02C','E02D','E02E','E02F','E030','E031','E032',
'E033','E034','E035','E036','E037','E038','E039','E03A','E03B','E03C',
'E03D','E03E','E03F','E040','E041','E042','E043','E044','E045','E046',
'E047','E048','E049','E04A','E04B','E04C','E04D','E04E','E04F','E050',
'E051','E052','E053','E054','E055','E056','E057','E058','E059','E05A',
'E101','E102','E103','E104','E105','E106','E107','E108','E109','E10A',
'E10B','E10C','E10D','E10E','E10F','E110','E111','E112','E113','E114',
'E115','E116','E117','E118','E119','E11A','E11B','E11C','E11D','E11E',
'E11F','E120','E121','E122','E123','E124','E125','E126','E127','E128',
'E129','E12A','E12B','E12C','E12D','E12E','E12F','E130','E131','E132',
'E133','E134','E135','E136','E137','E138','E139','E13A','E13B','E13C',
'E13D','E13E','E13F','E140','E141','E142','E143','E144','E145','E146',
'E147','E148','E149','E14A','E14B','E14C','E14D','E14E','E14F','E150',
'E151','E152','E153','E154','E155','E156','E157','E158','E159','E15A',
'E201','E202','E203','E204','E205','E206','E207','E208','E209','E20A',
'E20B','E20C','E20D','E20E','E20F','E210','E211','E212','E213','E214',
'E215','E216','E217','E218','E219','E21A','E21B','E21C','E21D','E21E',
'E21F','E220','E221','E222','E223','E224','E225','E226','E227','E228',
'E229','E22A','E22B','E22C','E22D','E22E','E22F','E230','E231','E232',
'E233','E234','E235','E236','E237','E238','E239','E23A','E23B','E23C',
'E23D','E23E','E23F','E240','E241','E242','E243','E244','E245','E246',
'E247','E248','E249','E24A','E24B','E24C','E24D','E24E','E24F','E250',
'E251','E252','E253','E301','E302','E303','E304','E305','E306','E307',
'E308','E309','E30A','E30B','E30C','E30D','E30E','E30F','E310','E311',
'E312','E313','E314','E315','E316','E317','E318','E319','E31A','E31B',
'E31C','E31D','E31E','E31F','E320','E321','E322','E323','E324','E325',
'E326','E327','E328','E329','E32A','E32B','E32C','E32D','E32E','E32F',
'E330','E331','E332','E333','E334','E335','E336','E337','E338','E339',
'E33A','E33B','E33C','E33D','E33E','E33F','E340','E341','E342','E343',
'E344','E345','E346','E347','E348','E349','E34A','E34B','E34C','E34D',
'E401','E402','E403','E404','E405','E406','E407','E408','E409','E40A',
'E40B','E40C','E40D','E40E','E40F','E410','E411','E412','E413','E414',
'E415','E416','E417','E418','E419','E41A','E41B','E41C','E41D','E41E',
'E41F','E420','E421','E422','E423','E424','E425','E426','E427','E428',
'E429','E42A','E42B','E42C','E42D','E42E','E42F','E430','E431','E432',
'E433','E434','E435','E436','E437','E438','E439','E43A','E43B','E43C',
'E43D','E43E','E43F','E440','E441','E442','E443','E444','E445','E446',
'E447','E448','E449','E44A','E44B','E44C','E501','E502','E503','E504',
'E505','E506','E507','E508','E509','E50A','E50B','E50C','E50D','E50E',
'E50F','E510','E511','E512','E513','E514','E515','E516','E517','E518',
'E519','E51A','E51B','E51C','E51D','E51E','E51F','E520','E521','E522',
'E523','E524','E525','E526','E527','E528','E529','E52A','E52B','E52C',
'E52D','E52E','E52F','E530','E531','E532','E533','E534','E535','E536',
'E537'];

// text fallbacks
textMap = {
'E001':'[boy]','E002':'[girl]','E003':'[lips]',
'E004':'[man]','E005':'[woman]',
'E006':'[shirt]','E007':'[shoe]','E008':'[camera]','E009':'\u260e',
'E00A':'[mobilephone]',
'E00B':'[fax]','E00C':'[computer]','E00D':'( -_-)\uff1d\u25cb',
'E00E':'[thumbsup]','E00F':'\u261d','E010':'[fist]','E011':'\u270c',
'E012':'[hand]','E013':'[skiing]',
'E014':'[golf]','E015':'[tennis]','E016':'[baseball]',
'E017':'[surfing]','E018':'[soccer]','E019':'(\uff9f)#))<<','E01A':'[horse]',
'E01B':'[car]','E01C':'[sailboat]',
'E01D':'\u2708','E01E':'[streetcar]','E01F':'[bullettrain]',
'E020':'[?]','E021':'\u2762','E022':'\u2764','E023':'[broken\u2764]',
'E024':'[clock1]','E025':'[clock2]','E026':'[clock3]',
'E027':'[clock4]','E028':'[clock5]','E029':'[clock6]',
'E02A':'[clock7]','E02B':'[clock8]','E02C':'[clock9]',
'E02D':'[clock10]','E02E':'[clock11]','E02F':'[clock12]',
'E030':'[cherryblossom]',
'E031':'[emblem]','E032':'[rose]','E033':'[xmastree]','E034':'[ring]',
'E035':'[diamond]','E036':'[house]','E037':'[church]',
'E038':'[office]','E039':'[eki]','E03A':'[gas]','E03B':'[fuji]',
'E03C':'[karaoke]','E03D':'[videocamera]',
'E03E':'\u266a','E03F':'[key]','E040':'[sax]',
'E041':'[guitar]','E042':')>\u0448=(^\uff61^ )',
'E043':'[meal]','E044':'[martini]','E045':'\u2615',
'E046':'[cake]','E047':'[beer]',
'E048':'\u2603','E049':'\u2601','E04A':'\u2600',
'E04B':'\u2614','E04C':'\u263d',
'E04D':'[\u2600rise]','E04E':'[angel]','E04F':'(=^\uff65^=)','E050':'[tiger]',
'E051':'[bear]','E052':'u\u30fb\u30a7\u30fbu','E053':'<\u201d )\u301c',
'E054':'[whale]','E055':'[penguin]',
'E056':'[glad]','E057':':D','E058':'\u2639',
'E059':'>:(','E05A':'[poo]',
'E101':'[mailbox]','E102':'[postbox]','E103':'[\u27a1\u2709]',
'E104':'[\u27a1\u260e]',
'E105':';P','E106':'(\u2764_\u2764)','E107':')\uff9f0\uff9f(',
'E108':'[coldsweat]',
'E109':'(\u30fb_\u30fb)','E10A':'\uff23:\uff61\u30df',
'E10B':'(^o_o^)','E10C':'[alien]',
'E10D':'[rocket]','E10E':'[crown]','E10F':'[light]',
'E110':'[fourleaf]','E111':'[smooch]','E112':'[present]',
'E113':'[pistol]','E114':'[search]','E115':'[run]','E116':'[hammer]',
'E117':'[fireworks]','E118':'[mapleleaf]',
'E119':'[fallenleaf]','E11A':'>:)','E11B':'[ghost]','E11C':'[skull]',
'E11D':'[fire]','E11E':'[briefcase]','E11F':'[seat]',
'E120':'[hamburger]',
'E121':'[fountain]','E122':'[camping]','E123':'\u2668',
'E124':'[ferris]','E125':'[ticket]','E126':'[CD]','E127':'[DVD]',
'E128':'[radio]','E129':'[video]',
'E12A':'[TV]','E12B':'[alien]','E12C':'\u303d',
'E12D':'\ud83c\udc04',
'E12E':'[VS]','E12F':'[money]','E130':'[target]',
'E131':'[trophy]','E132':'[goal]',
'E133':'[Slots777]','E134':'[racehorse]','E135':'[speedboat]',
'E136':'[bike]','E137':'[roadblock]','E138':'[\u2642]',
'E139':'[\u2640]','E13A':'\u263arz',
'E13B':'[syringe]','E13C':'(-.-)Zzz','E13D':'\u26a1','E13E':'[highheel]',
'E13F':'[bath]','E140':'[toilet]','E141':'[speaker]','E142':'[notice]',
'E143':'[holiday]','E144':'[locked]','E145':'[unlocked]',
'E146':'[city\u2600set]',
'E147':'[egg]','E148':'[book]','E149':'[$\u21c6\u00a5]','E14A':'[rate]',
'E14B':'[satelliteantenna]',
'E14C':'[strength]','E14D':'[bank]',
'E14E':'[redlights]','E14F':'[parking]',
'E150':'[busstop]','E151':'[\u2642\u2640]','E152':'[police]',
'E153':'[postoffice]',
'E154':'[atm]','E155':'[hospital]','E156':'[conveniencestore]',
'E157':'[school]','E158':'[hotel]','E159':'[bus]','E15A':'[taxi]',
'E201':'[walk]','E202':'[boat]',
'E203':'[\uff7a\uff7a]','E204':'[\u2764]',
'E205':'\u2734','E206':'\u2733','E207':'[18+]',
'E208':'( -.-)\uff89 \u2312 \uff3f.~~','E209':'[beginner]','E20A':'\u267f',
'E20B':'[signal]','E20C':'\u2665','E20D':'\u2666',
'E20E':'\u2660','E20F':'\u2663',
'E210':'[#]','E211':'[freedial]','E212':'[NEW]',
'E213':'[UP!]','E214':'[COOL]','E215':'[\u6709]',
'E216':'[\u7121]','E217':'[\u6708]','E218':'[\u7533]',
'E219':'[\u26ab1]','E21A':'[\u26ab2]','E21B':'[\u26ab3]',
'E21C':'[1]','E21D':'[2]','E21E':'[3]',
'E21F':'[4]','E220':'[5]','E221':'[6]',
'E222':'[7]','E223':'[8]','E224':'[9]',
'E225':'[0]','E226':'[\u5f97]','E227':'[\u5272]',
'E228':'[\u30b5]','E229':'[ID]','E22A':'[\u6e80]',
'E22B':'[\u7a7a]','E22C':'[\u6307]','E22D':'[\u55b6]',
'E22E':'[\u2191]','E22F':'[\u2193]','E230':'[\u2190]',
'E231':'[\u2192]','E232':'\u2b06','E233':'\u2b07',
'E234':'\u27a1','E235':'\u2b05',
'E236':'\u2197','E237':'\u2196','E238':'\u2198',
'E239':'\u2199','E23A':'\u25b6',
'E23B':'\u25c0','E23C':'[\u25b6\u25b6]','E23D':'[\u25c0\u25c0]',
'E23E':'[fortunetelling]',
'E23F':'\u2648','E240':'\u2649','E241':'\u264a',
'E242':'\u264b','E243':'\u264c',
'E244':'\u264d','E245':'\u264e','E246':'\u264f',
'E247':'\u2650','E248':'\u2651',
'E249':'\u2652','E24A':'\u2653','E24B':'[ophiuchus]','E24C':'[TOP]',
'E24D':'[OK]','E24E':'\u00a9','E24F':'\u00ae',
'E250':'[vibratemode]',
'E251':'[phoneoff]','E252':'\u26a0','E253':'[service]','E301':'\uff3f\u3006(.. )',
'E302':'[necktie]','E303':'[hibiscus]','E304':'[tulip]',
'E305':'[sunflower]',
'E306':'[bouquet]','E307':'[palmtree]','E308':'[cactus]',
'E309':'[watercloset]',
'E30A':'[headphones]','E30B':'[sake]','E30C':'[cheers]',
'E30D':'\u3297','E30E':'( -.-)\uff3f.~~','E30F':'[pill]',
'E310':'[balloon]','E311':'(o-)\u30fb\u30fb\u30fb\u25cf',
'E312':'[party]','E313':'\u2702','E314':'[ribbon]',
'E315':'\u3299','E316':'[minidisc]',
'E317':'[megaphone]','E318':'[hat]','E319':'[dress]','E31A':'[sandal]',
'E31B':'[boots]','E31C':'[lipstick]','E31D':'[manicure]',
'E31E':'[facemassage]','E31F':'[haircut]','E320':'[barberpole]',
'E321':'[kimono]','E322':'[bikini]',
'E323':'[handbag]','E324':'[action]','E325':'\u0fc4','E326':'\u266b',
'E327':'[\u2747\u2764]','E328':'[pink\u2764]',
'E329':'[\u2199\u2764]',
'E32A':'[blue\u2764]','E32B':'[green\u2764]',
'E32C':'[yellow\u2764]','E32D':'[purple\u2764]','E32E':'\u2747',
'E32F':'\u2b50','E330':'\u03b5=','E331':'[sweat]','E332':'\u25cb',
'E333':'\u2716','E334':'[anger]','E335':'[\u2606]',
'E336':'[?]','E337':'[\u2762]','E338':'\u65e6~~','E339':'[bread]',
'E33A':'[icecream]','E33B':'[fries]','E33C':'\u2212\u25ce\u25cb\u25cf-',
'E33D':'[senbei]','E33E':'[ricebowl]','E33F':'[spaghetti]',
'E340':'[ramen]','E341':'[curry]',
'E342':'[onigiri]','E343':'[oden]','E344':'[sushi]','E345':'[apple]',
'E346':'[orange]','E347':'[strawberry]','E348':'[watermelon]',
'E349':'[tomato]','E34A':'[eggplant]','E34B':'[birthdaycake]',
'E34C':'[bento]','E34D':'[hotpot]',
'E401':'[ohwell]','E402':'[smirk]','E403':'[pensive]',
'E404':'[biggrin]','E405':';)','E406':'><','E407':'[confounded]',
'E408':'[sleep]','E409':'XD',
'E40A':'[whew]','E40B':'D:','E40C':'[sick]','E40D':'[flushed]',
'E40E':'(\u00ac_\u00ac)',
'E40F':'[flustered]','E410':'[stagger]','E411':'[crying]',
'E412':'[cryingjoy]',
'E413':'[sad]','E414':'\u263a','E415':'[happy]',
'E416':'(\uff40\u3078\u00b4)','E417':'[kiss]',
'E418':'[smooch]','E419':'\u25c9\u25c9','E41A':'[nose]','E41B':'[ear]',
'E41C':'[mouth]','E41D':'(>\u4eba<)','E41E':'[handwave]',
'E41F':'(^o^)//\u201d','E420':'[okhand]','E421':'q(^_^)p',
'E422':'[ohhaa]','E423':'[nogood]',
'E424':'[ok!]','E425':'[\u2764couple]','E426':'m(_ _)m',
'E427':'\uff3c(^o^)\uff0f',
'E428':'(*\uff3e\u25bd\uff3e)\u4eba(\uff3e\u25bd\uff3e*)','E429':'[linedance]','E42A':'[basketball]',
'E42B':'[amfootball]','E42C':'[billiards]','E42D':'[swimming]',
'E42E':'[bluecar]','E42F':'[lorry]',
'E430':'[ firetruck]','E431':'[ambulance]','E432':'[policecar]',
'E433':'[rollercoaster]',
'E434':'[trainsign]','E435':'[highspeedtrain]',
'E436':'[pinedecoration]',
'E437':'[wrapped\u2764]','E438':'[hinamatsuri]',
'E439':'[graduationceremony]',
'E43A':'[schoolentranceceremony]','E43B':'[carpstreamer]',
'E43C':'[umbrella]','E43D':'[wedding]','E43E':'[wave]',
'E43F':'[shavedice]','E440':'[sparkler]',
'E441':'[shell]','E442':'[windchime]','E443':'[typhoon]',
'E444':'[earofrice]',
'E445':'[halloween]','E446':'[tsukimi]','E447':'[breeze]',
'E448':'[santaclaus]',
'E449':'[morning\u2600]','E44A':'[evening\u2600]',
'E44B':'[\u2606\u5f61]',
'E44C':'[rainbow]','E501':'[lovehotel]','E502':'[palette]',
'E503':'[tophat]','E504':'[departmentstore]',
'E505':'[japanesecastle]','E506':'[castle]',
'E507':'[filmsign]','E508':'[factory]','E509':'[tokyotower]',
'E50A':'[shibuya]','E50B':'[JP]','E50C':'[US]','E50D':'[FR]',
'E50E':'[DE]','E50F':'[IT]',
'E510':'[GB]','E511':'[ES]','E512':'[RU]',
'E513':'[CN]','E514':'[KR]',
'E515':'[westerner]','E516':'[chinese]','E517':'[indian]',
'E518':'[grandfather]',
'E519':'[grandmother]','E51A':'o(\u0398.\u0398)o','E51B':'[constructionworker]',
'E51C':'[princess]','E51D':'[liberty]','E51E':'[guard]',
'E51F':'\u266a\u2514|\u2235|\u2510\u266a\u2514|\u2235|\u2518\u266a\u250c|\u2235|\u2518','E520':'[dolphin]','E521':'[bird]',
'E522':'[tropicalfish]','E523':'[chick]',
'E524':'[hamster]','E525':'[bug]','E526':'[elephant]','E527':'\u25bd(\u30fbo\u30fb)\u25bd',
'E528':'C((\u30fb\u22a5\u30fb))D','E529':'[ram]','E52A':'[wolf]',
'E52B':'[cow]','E52C':'[rabbit]',
'E52D':'~>\u309c)\u301c\u301c\u301c','E52E':'\u2312(\u0451)\u2312','E52F':'[boar]','E530':'[camel]',
'E531':'n(\u2019\u301c\u2019)n','E532':'[A]','E533':'[B]',
'E534':'[AB]','E535':'[O]',
'E536':'[footprints]','E537':'\u2122'};

var themes;
themes = {
'SoftBank': function (code, isAnimated)
{
    return ('http://creation.mb.softbank.jp/web/img/'
            +
            code.substr(0, 2)
            +
            '01/'
            +
            code
            +
            '_20'
            +
            (isAnimated ? '_ani' : '') + '.gif');
},
'text': function (code, isAnimated)
{
    return void(null);
}};

var defaultTheme = 'SoftBank';

var insertAfter;
insertAfter = function (new_node, existing_node) {
  if (existing_node.nextSibling) {
    existing_node.parentNode.insertBefore(
      new_node,
      existing_node.nextSibling);
  } else {
    existing_node.parentNode.appendChild(new_node);
  }
}

var getValue = (function(key, defvalue) {
    if (typeof(GM_getValue) != 'undefined')
    {
        return GM_getValue(key, defvalue);
    }
    return defvalue;
});

var setValue = (function(key, value) {
    if (typeof(GM_setValue) != 'undefined')
    {
        return GM_setValue(key, value);
    }
});

var registerMenuCommand = (
function (title, fn, accel, accelMod, access) {

    var e;
    try {
        return GM_registerMenuCommand(title,
                                      fn,
                                      accel,
                                      accelMod,
                                      access);
    } catch (e) {
    }
    try {
        return GM_registerMenuCommand(title,
                                      fn,
                                      accel,
                                      accelMod);
    } catch (e) {
    }
    try {
        return GM_registerMenuCommand(title,
                                      fn,
                                      accel);
    } catch (e) {
    }
    try {
        return GM_registerMenuCommand(title,
                                      fn);
    } catch (e) {
    }
});

var emojiPath = "//text()["
    +
    ((function(){
      var a=[];
      for(var i=0;i<replacements.length;i++)
        a[a.length]=(
          "contains(.,'"
          + String.fromCharCode(parseInt(replacements[i],16))
          + "')");
      return a;})()).join("or ")
    +
    "]";

var rescanDocument;

rescanDocument = function (document) {


var uriMap = {};

var uriForCode;
uriForCode = themes[getValue('theme', defaultTheme)];
if (! uriForCode) uriForCode = themes[defaultTheme];

var j = 0;

for (var i = 0; i < replacements.length; i ++)
{
    var code = replacements[i];
    var charcode = String.fromCharCode(parseInt(code, 16));
    while (animated[j] < code) j++;
    var isAnimated = (animated[j] == code);
    if (uriForCode)
      uriMap[charcode] = uriForCode(code,
                                    isAnimated);
}

var contentType = document.contentType;

if (! contentType)
{
  contentType = 'text/html';
}

var xhtmlNS = 'http://www.w3.org/1999/xhtml';
var nullNS = '';

if (! (({'text/html': true,
         'application/xhtml+xml': true,
         'text/plain': true})[contentType]))
{
  return;
}

textnodes = document.evaluate(
    emojiPath,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var documentIsHTML = false;

if (document.documentElement)
 if (! document.documentElement.namespaceURI)
  if (document.documentElement.tagName.toLowerCase()
      == 'html')
{
  documentIsHTML = true;
}

for (var i = 0; i < textnodes.snapshotLength; i++)
{
  node = textnodes.snapshotItem(i);
  s = node.data;
  var node_data = [];
  var parentURI = ('{'
                   +
                   (node.parentNode.namespaceURI
                    ? node.parentNode.namespaceURI
                    : (documentIsHTML ? xhtmlNS : nullNS))
                   +
                   '}'
                   +
                   ((node.parentNode.namespaceURI
                     || ! documentIsHTML)
                    ? node.parentNode.localName
                    : node.parentNode.tagName.toLowerCase()));

  if ((parentURI == '{' + xhtmlNS + '}' + 'script')
      ||
      (parentURI == '{' + xhtmlNS + '}' + 'style'))
  {
    continue;
  }
  for( var n = 0; n < s.length; n++ )
  {
    var charcode = s.charCodeAt(n);
    var char = s.charAt(n);
    var uri = uriMap[char];
    var text = textMap[charcode.toString(16).toUpperCase()];
    if (! text) text = char;
    if ((parentURI == '{' + xhtmlNS + '}' + 'textarea')
        ||
        (parentURI == '{' + xhtmlNS + '}' + 'title'))
    {
      uri = void(null);
    }
    if (uri)
    {
      var e;
      try
      {
        var newimg = ((documentIsHTML
                       ? (! node.parentNode.namespaceURI)
                       : false)
                      ? document.createElement('img')
                      : document.createElementNS(xhtmlNS,
                                                 'img'));
        newimg.setAttribute('src', uri);
        newimg.setAttribute('alt', text);
        newimg.setAttribute('title', text);
        newimg.setAttribute('border', '0');
        newimg.style.verticalAlign = 'middle';
        insertAfter(newimg, node);
        var newnode = document.createTextNode("");
        insertAfter(newnode, newimg);
        node.data = node_data.join("");
        node_data = [];
        node = newnode;
      }
      catch (e)
      {
        uri = void(null);
      }
    }
    if (! uri)
    {
      node_data[node_data.length] = text;
    }
  }
  s = node_data.join("");
  if (node.data != s)
  {
    node.data = s;
  }
}

};

var rescan;
rescan = function () {

rescanDocument(document);

var e;

allFrames = [];

for (var i = 0; i < window.frames.length; i ++)
{
  try
  {
    allFrames[allFrames.length] = window.frames[i];
  }
  catch (e)
  {
  }
}

for (var i = 0; i < allFrames.length; i ++)
{
  try
  {
    var frame = allFrames[i];
    for (var j = 0; j < frame.frames.length; j ++)
    {
      allFrames[allFrames.length] = frame.frames[j];
    }
  }
  catch (e)
  {
  }
}

for (var i = 0; i < allFrames.length; i ++)
{
  try
  {
    rescanDocument(allFrames[i].document);
  }
  catch (e)
  {
  }
}

};

rescan();

registerMenuCommand('Re-scan Emoji', rescan);

for (var theme in themes)
{
    registerMenuCommand('Emoji Theme ' + theme + '',
        (function(theme){
            return function(){
                setValue('theme', theme);
            };
        })(theme));
}

})();

/*
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.8 (Darwin)
Comment: Use GnuPG with Firefox : http://getfiregpg.org (Version: 0.7.4)

iEYEARECAAYFAkmuzK8ACgkQ+vNHg6gC02J7VACfaldalNcE7tgKX96AqPbAFngx
3VAAn3At91eyW1CSHc1AKb1F3LV9zm1Q
=Nn7F
-----END PGP SIGNATURE-----
*/
