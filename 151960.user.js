// ==UserScript==
// @name        How To make MW unlocked
// @namespace   Icemaker
// @description Icemaker is an unlocker for MW. This script may not be sold, copied, or used without permission!
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @version     1873
// ==/UserScript==


function injectScript(source) {
// Utilities
var isFunction = function (arg) {
return (Object.prototype.toString.call(arg) == "[object Function]");
};
var jsEscape = function (str) {
// Replaces quotes with numerical escape sequences to
// avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
if (!str || !str.length)
return str;
// use \W in the square brackets if you have trouble with any values.
var r = /['"<>\/]/g,
result = "",
l = 0,
c;
do {
c = r.exec(str);
result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
} while (c && ((l = r.lastIndex) > 0))
return (result.length ? result : str);
};
var bFunction = isFunction(source);
var elem = document.createElement("script"); // create the new script element.
var script,
ret,
id = "";
if (bFunction) {
// We're dealing with a function, prepare the arguments.
var args = [];
for (var i = 1; i < arguments.length; i++) {
var raw = arguments[i];
var arg;
if (isFunction(raw)) // argument is a function.
arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
arg = "(new Date(" + raw.getTime().toString() + "))";
else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
arg = "(new RegExp(" + raw.toString() + "))";
else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
else
arg = raw.toString(); // Anything else number/boolean
args.push(arg); // push the new argument on the list
}
// generate a random id string for the script block
while (id.length < 16)
id += String.fromCharCode(((!id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
// build the final script string, wrapping the original in a boot-strapper/proxy:
script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('" + id + "').innerText=JSON.stringify(value);})();";
elem.id = id;
} else // plain string, just copy it over.
{
script = source;
}
elem.type = "text/javascript";
elem.innerHTML = script;
// insert the element into the DOM (it starts to execute instantly)
document.head.appendChild(elem);
if (bFunction) {
// get the return value from our function:
ret = JSON.parse(elem.innerText);
// remove the now-useless clutter.
elem.parentNode.removeChild(elem);
// make sure the garbage collector picks it instantly. (and hope it does)
delete(elem);
// see if our returned value was thrown or not
if (ret.throwValue)
throw(ret.callResult);
else
return (ret.callResult);
} else // plain text insertion, return the new script element.
return (elem);
}
var myscript = function () {
$n8FKnzn$glZFeWfsXhi = function (n) {
if (typeof ($n8FKnzn$glZFeWfsXhi.list[n]) == "string") return $n8FKnzn$glZFeWfsXhi.list[n].split("").reverse().join("");
return $n8FKnzn$glZFeWfsXhi.list[n]
};
$n8FKnzn$glZFeWfsXhi.list = [/[^A-Za-z0-9\+\/\=]/g, "cmz_reddof_pupop#", /jobResult":{"city":([7-9]),"id":(\d+),/, " ]])\";etihw dilos xp1 :redrob\",)(gnirts(sniatnoc[elyts@[]\"xifraelc ydob_egassem\"=ssalc@[vid//", " evah ylno uoy ,>\"fig.10_61x61_ygrene_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi< ", " GNIPPOTS deretsam boJ :reyalS", "tiurcer_werc_ntb", /([\d]+) Energy/i, /job_mastery_percentage/, /"group_atk"/, "wen_llac_yxes etihw trohs wen_nottub_yxes", /user not found/i, /too low of a level to declare war/, /<!-- Current Page: war_controller ([\d]+) -->/, "rellortnoc_pam", /local_xw_sig = '([\da-f]+)';/, " rebmem werc ", "\"=crs gmi<>\";)(evomer.)\'rebmemwercetavitca-2vporp#\'($\"=kcilcno \";xp5:pot ;xp5:thgir ;etulosba:noitisop\"=elyts \"ntb-esolc\"=ssalc a<", "rebmemwercetavitca-2vporp", "1=tols_werc&thgif=epyt_psd_werc&porp=epyt_werc&", "etamwerCetavitcA", "8-llatcelloc-2vporp", ">a/<>naps/<>naps/<x2>naps<>\";xp53 :htdiw\"=elyts naps<>\"9\"=ytic \"etamwerCetavitcA neerg trohs wen_nottub_yxes wen_nottub_yxes\"=ssalc \"#\"=ferh \";xp5:nigram;thgir:taolf\"=elyts \"rebmem werc noitcelloc ytreporp x2 etavitcA\"=eltit a<", ">a/<>naps/<>naps/<x2>naps<>\";xp53 :htdiw\"=elyts naps<>\"7\"=ytic \"etamwerCetavitcA neerg trohs wen_nottub_yxes wen_nottub_yxes\"=ssalc \"#\"=ferh \";xp5:nigram;thgir:taolf\"=elyts \"rebmem werc noitcelloc ytreporp x2 etavitcA\"=eltit a<", "\"=crs gmi<>naps<>naps<>\"3_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"kcalb trohs wen_nottub_yxes\"=ssalc a<", "2_elggoTslavir", "\"=crs gmi<>naps<>naps<>\"2_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"neerg trohs wen_nottub_yxes\"=ssalc a<", "\"=crs gmi<>naps<>naps<>\"1_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"kcalb trohs wen_nottub_yxes\"=ssalc a<", "_elggoTtegrat", ">a/<>naps/<>naps/<>\"gnp.61x61_animats_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>naps<>\"", "0_elggoTslavir", ">a/<>naps/<>naps/<>\"", ">a/<>naps/<>naps/<>\"gnp.61x61_animats_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>naps<", "neerg trohs wen_nottub_yxes", "kcalb trohs wen_nottub_yxes", "cni_tl_fed_wmu", "ltt_tl_fed_wmu", ";xp0 :pot ;evitaler :noitisop", "MBmotsuCdekcolnU", "\"=di \"ppa_elggot\"=ssalc \";xp0:pot ;evitaler:noitisop\"=elyts a<;psbn&>\"08\"=htdiw dt<", ">rt/< >dt/<>a/<>\"", "\"=di \"ppa_elggot\"=ssalc\";xp0:pot ;evitaler:noitisop\"=elyts a<;psbn&>\"08\"=htdiw dt<", "\"=di \"ppa_evomer\"=ssalc a< ", ">rb<>llams/<", "\"=crs gmi<>dt<", ">\"4\"=gniddapllec \"0\"=gnicapsllec \"0\"=redrob elbat<>\";llorcs:y-wolfrevo;xp004:thgieh-xam;xp044:htdiw-xam;xp024:htdiw\"=elyts vid<>rb<", ".erotSppA ruoy ot dedda neeb sah ", "levart=unem&=smaraPtxen&1=enoz&gnibbor=morf&", "tsoc_hserfer_bor", "=tols&1=ytic_wx&bor=noitca_wx&gnibbor=rellortnoc_wx?php.revres_lmth/etomer\',\'\'(xaja_od", /RobbingController.robAllHelper\((\d+),/, "sdnoces 03 ni niaga yrt - animats fo tuo gnibboR :reyalS", ">\"xp5:pot;evitaler:noitisop\"=elyts naps<>vid/<>naps/<", ":htdiw;xp5-:pot;evitaler:noitisop\"=elyts vid<>rb<>\"gnp.dekcolnu/segami/moc.wmdekcolnu.ehcac//:ptth\"=crs \";evitaler:noitisop\"=elyts gmi<>retnec<>\";xp0:tfel;xp0:pot;etulosba:noitisop;)ged081(etator:mrofsnart-tikbew-;)ged081(etator:mrofsnart-zom-;)ged081(etator:mrofsnart\"=elyts \"57\"=thgieh \"", " :htdiw;kcolb :yalpsid;xp", "php.nigol-pw/moc.wmdekcolnu//:ptth", "77dimroftsop", /(.+)/, "sgat_tsiletihw_dekcolnu", "delbane_tsilkcalb_dekcolnu", "delbane_tsiletihw_dekcolnu", "nelotswollof", "sgnitteSdekcolnU", ">vid/<>vid/<>aeratxet/<>\";%56:htdiw;enon:eziser\"=elyts \"sgat_tsilkcalb_dekcolnu\"=di aeratxet<>rb<ffO >\"elggot_tsilkcalb_dekcolnu\"=eman \"delbasid_tsilkcalb_dekcolnu\"=di \"oidar\"=epyt tupni<nO >\"elggot_tsilkcalb_dekcolnu\"=eman \"delbane_tsilkcalb_dekcolnu\"=di \"oidar\"=epyt tupni<:tsilkcalB>\".yltcaxe gat emag-ni eht hctam TSUM deretne gat ehT\n\n)tsilthgiF & egap slaviR( .gat siht htiw sreyalp piks lliw reyalS dna ,enil rep eno ,gat ylimaf a retnE\"=eltit vid<>vid/<>aeratxet/<>\";%56:htdiw;enon:eziser\"=elyts \"sgat_tsiletihw_dekcolnu\"=di aeratxet<>rb<ffO >\"elggot_tsiletihw_dekcolnu\"=eman \"delbasid_tsiletihw_dekcolnu\"=di \"oidar\"=epyt tupni<nO >\"elggot_tsiletihw_dekcolnu\"=eman \"delbane_tsiletihw_dekcolnu\"=di \"oidar\"=epyt tupni<:tsiletihW>\".yltcaxe gat emag-ni eht hctam TSUM deretne gat ehT\n\n)ylno egap slaviR( .gat siht kcatta ylno lliw reyalS dna ,enil rep eno ,gat ylimaf a retnE\"=eltit vid<>vid<>rb<>rb<agnyZ yb dewolla deeps tsetsaf eht si 333*>rb<>\"6dimroftsop\"=di \";xp53:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"", ">rb<>rb<sunoB pu-leveL mialC >\"dekcehC\"=eulav \"levelmialc\"=eman \"levelmialc\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<>\"5dimroftsop\"=di \";xp53:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"", "\"=eulav tupni<;psbn&dlohserhT laeH>rb<>rb<>\"7dimroftsop\"=di \";xp05:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"", "\"=eulav tupni<;psbn&gniniamer PX ta esuaP>\"dekcehC\"=eulav \"kcehcesuap\"=eman \"kcehcesuap\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<tahC ediH >\"dekcehC\"=eulav \"tahCevomer.sgnittes.dekcolnu\"=eman \"tahcmer\"=di \"xobkcehc\"=epyt tupni<;psbn&knabotuA >\"dekcehC\"=eulav \"tiknab\"=eman \"knabotua\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<srelaetS ecI >\"dekcehC\"=eulav \"nelotswollof\"=eman \"nelotswollof\"=di \"xobkcehc\"=epyt tupni<;psbn&;psbn&>\"77dimroftsop\"=di \";xp01:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"", "\"=eulav tupni<;psbn& ot seci tsopotuA >\"dekcehC\"=eulav \"tsopotua\"=eman \"tsopotua\"=di \"xobkcehc\"=epyt tupni<>rb<", "\"=eltit \"yerg:roloc\"=elyts naps<( htlaeH", "laeh=noitca_wx&latipsoh=rellortnoc_wx?php.revres_lmth", /,/, "htlaeh_xam_resu", "=ytic_wx&lla_tisoped=noitca_wx&knab=rellortnoc_wx?php.revres_lmth", "=tnuoma&tisopeDknaBnoitcA=noitcaod&5=ytic_wx&noitcaod=noitca_wx&2Vytreporp=rellortnoc_wx?php.revres_lmth", /V\$([\d,]+)/, /Need to whack someone.+/, /Think you can do better.+/, ".slavir ruoy eci ot tsoob thgif eerf a teG", /'feed_js': '(.+?)'/, "dellik_yalrevo_rednefed_2vf", "tnuoc_llik_wmu", /boost', 'link': '(.+?)'/, "tsil_diova_dekcolnu", /'user_cash_chicago'\] = "\\u00a2([\d,]+)"/, /user_fields\['exp_to_next_level'\] = parseInt\("([\d]+)/, "?php.revres_lmth", "])\'niagA kcattA\',)(gnirts(sniatnoc[]\'wen_kcatta_yxes der trohs wen_nottub_yxes\'=ssalc@[a//", "nelots_yalrevo_rednefed_2vf", /user_cash_chicago":"\\u00a2([\d,]+)"/, /user_cash_london":"\\u00a3([\d,]+)"/, "htlaeh_rednefed", "no_tsoob_ntbktarewop_2vthgif", "ntBkcattA2Vthgif yub_eslupmi der trohs wen_nottub_yxes", "sutats_thgif_rekcatta", /The action was not able to be completed/, "8=di_tneilc_wx&", "=dip_tegrat&", /https/, /sf_xw_user_id=([a-z]\|[0-9]+)/, /btn_attack_p/, /Family Rivals/, /Your Rivals/, ".tsilthgif gnidaoL-eR reyalS", " yub_eslupmi wen_kcatta_yxes muidem wen_nottub_yxes", " yub_eslupmi wen_kcatta_yxes trohs wen_nottub_yxes", "!daed ro gnorts oot era stegrat reyalS", "daed_reyalp_tsil_thgif", "=noitanitsed&levart=noitca_wx&levart=rellortnoc_wx?php.revres_lmth/etomer", "yub_eslupmi der trohs wen_nottub_yxes wen_nottub_yxes", /'user_cash_brazil'\] = "([BRL$\d,]+)"/, /'user_cash_london'\] = "([Ð�\d,]+)"/, /exp_to_next_level'\] = parseInt\("([\d]+)/, /percent_complete'\] = "([\d]+)/, /user_cash_nyc'\] = "([$\d,]+)/, /percent_complete":([\d]+),"/, /user_cash_brazil":"([BRL$\d,]+)"/, /user_cash_vegas":"([V$\d,]+)"/, /user_cash_london":"([Ð�\d,]+)"/, "cyn_hsac_resu", "1=emarf_qer_piks&", "dedocnelru-mrof-www-x/noitacilppa", "tseuqeRpttHLMX", /'p\|([\d]+)',0,'(.+)'\);/, /job([\d]+)/, /tab=([\d]+)/, /person=([\d]+)/, /tmp=([\da-f]+)/, /([\d]+) Energy/, "level_txen_ot_pxe", "C7%p=di_tegrat&", "=ytic_wx&raw_eralced=noitca_wx&raw=rellortnoc_wx?php.revres_lmth/etomer", /(^|[^\/])(www\.[\S]+(\b|$))/gim, /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim, ">vid/<>a/<moc.WMdekcolnU @ erom daeR>\"knalb_\"=tegrat \"", ">\" ;xp01 xp0 xp01 xp0 :nigram\"=elyts vid<>naps/<", " >\";xp51 :ezis-tnof\"=elyts \"knalb_\"=tegrat \"", "01=tnuoc&stnemhcatta,stnemmoc,nialp_eltit,noitpac,sutats,sutats_tnemmoc,tnuoc_tnemmoc,rohtua,sgat,seirogetac,deifidom,epyt,guls,tnetnoc=edulcxe&stsop_tnecer_teg=nosj?/moc.wmdekcolnu.ehcac//:ptth", ">retnec/< gnidaoL>\"gnidaol_deef_golb_wmu\"=di retnec<>rb<>rb<>rb<>rb<>rb<>rb<", " :pot ;xp9 :tfel ;00002 :xedni-z ;etulosba :noitisop", ";enon :yalpsid", "deef_golb_wmu", "\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<>\"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc \";xp031:tfel\"=elyts \"ffOnOtsoP\"=di a<>a/<>naps/<>naps/<>\"\"", "\"=crs \"42\"=htdiw \"42\"=thgieh \";xp1 :tfel ;xp4-:pot ;evitaler:noitisop\"=elyts gmi<>naps<>naps<>\"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc \"ogol_wmu\"=di a<>elyts/<} ;xp5-:pot ;evitaler:noitisop { ngilAvWMU.>\"ssc/txet\"=epyt elyts<>\";xp057:htdiw;xp03 :thgieh\"=elyts \"eltit_eludom_eripme xifraelc\"=ssalc \"tnetnoc_rabloot\"=di vid<", "htlaeh_kcolc", "rabloot_kcolnu", "tpircsavaj/txet", "mbdaol_dekcolnu", "sknil_kcolnu", ">\"elddim noitanitsed_yxes\"=ssalc vid<>\"", "> \";x051:htdiw;xp2-:pot-nigram;enon :yalpsid ;02 :xedni-z\"=elyts \"uneMsloot\"=di vid<>a/< >naps/<naps/<slooT>\";suounitnoc :ycilop-enilni-dnuorgkcab-zom- ;gniddap :nigiro-dnuorgkcab-zom- ;redrob :pilc-dnuorgkcab-zom- ;tfel :ngila-txet ;%05 xp57 llorcs taeper-on )fig.worra_levart_nwodpord/scihparg/bfwm/moc.agnyz.citats.bfwm//:ptth(lru tnerapsnart :dnuorgkcab\"=elyts naps<>naps<>\";xp59 :htdiw\"=elyts \"redrob_etihw_kcalb trohs wen_nottub_yxes\"=ssalc a<>\";xp371 :pot ;xp411 :tfel ;etulosba :noitisop ;xp001 :htdiw\"=elyts \"reniatnoc_sloot\"=di vid<>elyts/<};xp2 0 :nigram ;dlob :thgiew-tnof ;xp21 :ezis-tnof ;xp1 xp1 0 :htdiw-redrob ;dcdcdc# dilos xp1 :redrob{ uneMsloot#>\"ssc/txet\"=epyt elyts<", ">vid/<>vid/<>a/<>\"", "eibmoz_daehtsam_wm", "retoof_gol_WMU", "fws.01draobpilCoreZ/segami/moc.wmdekcolnu.ehcac//:ptth", "\"=crs \";6.0 :yticapo;)06=yticapo(ahpla :retlif ;xp4 :pot ;evitaler :noitisop\"=elyts \"retoof_gol_WMU\"=di gmi<>\"077063887536612/emaG-sraW-aifaM-ruoy-kcolnU-WMdekcolnU/segap/moc.koobecaf.www//:ptth\"=ferh \"knalb_=tegrat \"egapnaF WMdekcolnU\"=eltit a<>vid/<", ">ht/<>\"%52\"=htdiw ht<>ht/<>naps/<", ">rt<>\"0\"=redrob elbat<", /^Slayer/, ")1=yticapo(ahpla", "=di_tnenoppo", "stegraT reppoH gnihcteF reyalS", "tegrat reppoH txeN gnidaoL reyalS", "tsilthgif gnidaoL-eR reyalS", "!god sdneirf si lla\'aY reyalS", "evitcA edoM reppoH ykcitS reyalS", "reddof_pupop", ">rb<>rb<>a/<>naps/<>naps/<tratS>naps<>naps<>\"kcalb wen_nottub_yxes\"=ssalc \"hcnuaL\"=di a<>rb<>rb<ykcitS ekaM>\"ykcits\"=di \"xobkcehc\"=epyt tupni<>rb<>\"01dimroftsop\"=di \";xp051:htdiw;enon:eziser\"=elyts \"txet\"=epyt\"", "stegraT reppoH moc.stsilwM thgiF", "etihw muidem wen_nottub_yxes", /Declare war now for/, "evitcA ylimaF thgiF reyalS", /user=(.+?)\"/, "])\"seilimaF\" ,.(sniatnoc[a//])\"tsrif_bat no_bat\" ,ssalc@(sniatnoc[il//", "evitcA edoM slaviR reyalS", "evitcA edoM eliforP reyalS", /user=p\|(\d+)'.+>Profile/, "evitcA edoM gnibboR ykcitS reyalS", "evitcA slaviR ykcitS reyalS", "evitcA tsilthgiF ykcitS reyalS", ">a/<>naps/<>naps/<>\"\"", "ngilAvWMU egnaro trohs wen_nottub_yxes", ">naps/<>naps/<>\"", ">naps/<>naps/<>\"fig.10_61x61_htlaeh_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<", "ngilAvWMU neerg trohs wen_nottub_yxes", ">naps/<>naps/<>\"gnp.61x61_animats_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<", ">retnec/<>b/<serocS metI tsewoL>b<>retnec<", ">rt/<>ht/<0>\"cni_tl_fed_wmu\"=di \"doog\"=ssalc \"%04\"=htdiw ht<>ht/<000,000>\"ltt_tl_fed_wmu\"=di \"esnefed_puorg\"=ssalc \"lamron:thgiew-tnof\"=elyts \"%06\"=htdiw ht<>rt<>rt/<>ht/<0>\"cni_tl_kta_wmu\"=di \"doog\"=ssalc \"%04\"=htdiw ht<>ht/<000,000>\"ltt_tl_kta_wmu\"=di \"kcatta_puorg\"=ssalc \"lamron:thgiew-tnof\"=elyts \"%06\"=htdiw ht<>rt<", "gnikcart_tats_wmu", ">vid/<>\"elddimsba\"=ngila \"61\"=thgieh \"91\"=htdiw \"fig.10_61x22_kcatta_aifam_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>\"serocS metI tsewoL\"=eltit \";xp85:pot;xp01-:tfel;evitaler:noitisop;xp02:htdiw\"=elyts \"", ".esolc ot em kcilC", "nottub_ekil_wm#", "1yalrevOrorrE#", "yalrevOgnidaoL#", "=/+9876543210zyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA", "efil ot kcab thguorb enord s\'ytfeL", "sknil fo not a nepo ot siht esU", ".YLNO gnithgif ot sdrager ni ,esnefed + kcatta rof smeti evitca lla stsiL", "sj.rotarekop/telkramkoob/moc.telkcops//:ptth", "rotan-a-znieH", ".ereht tuo sOH etarc uoy lla roF", ".ay rof sboj staepeR", "sj.tluserelttab/mb/moc.reficul-ufmm//:ptth", "sj.enordu/sppa/moc.wmdekcolnu.rabloot//:ptth", "enorD dekcolnU", "ecivres em.nokcops gnisu SLRU yniT etareneG", "sdneirf ruoy ot sgaB yretsyM deR tfiG", "sj.pxtcellocnalc/mb/moc.reficul-ufmm//:ptth", "PX tcelloC nalC", ".egap elttab morf esu ,elttab ylimaf morf tooL tcelloC", "sj.retsop_lliks/telkramkoob/moc.telkcops//:ptth", "nissassA tnioP llikS", "loot rehto yna naht retteb sessob ylimaf eht sthgiF", "sj.rethgifssobyn/telkramkoob/moc.telkcops//:ptth", "rethgiF ssoB YN", ".serohc ruoy od ot uoy dnimer ,tsilkcehC yliaD", ".egap ylimaf eht no noitamrofni erom teG", "aifam ruoy ot stfig dnes ot siht esU", ".setar PX ot ygrenE seviG", ".pu gnilevel uoy peek ot cte ,sbor ,sboj snuR", ".ffuts elbatfig htiw skrow ,aifam ruoy ot stfig dneS", ".pupop a gnisu ,lru gnol a morf LRUyniT etareneG", ".fo dir teg nac uoy tahw ees ,yrotnevni ruoy sezylanA", "sj.5ssobsmafwm/mb/moc.reficul-ufmm//:ptth", "sj.rennacs-maerts/telkramkoob/moc.telkcops//:ptth", "rennacS maertS", ".siht htiw deen uoy tahw tcelloc ,stfig htiw aifam ruoy gnitsalb retfA", "sj.rethgif-ssob-ylimaf/telkramkoob/moc.telkcops//:ptth", "rethgiF ssoB kcopS", ".smeti depuorg fo evah uoy tool ynam woh no weiv a teg ylkciuQ", "sj.yrotsih_ylimaf/telkramkoob/moc.telkcops//:ptth", "sj.yrotsih_aifam/telkramkoob/moc.telkcops//:ptth", "reganaM aifaM", ".tnemeveihca eht teg meht pleh ,stols sdneirf ruoy yalP", ".aifam eritne ruoy ot stfig fo stsol tsalB", "sj.reganam.ytreporp/telkramkoob/moc.telkcops.www//:ptth", "reganaM ytreporP", ".kcab tfig otua htiw ,retneC egasseM agnyZ eht morf stfiG tcelloC", "sj.kcapinim/aifam/moc.mlohkcops.www//:ptth", "sj.xuder.rebbor/telkramkoob/moc.telkcops//:ptth", "xudeR rebboR", ".egap boR eht no nur eb ot deen ton seod ,telkramkoob gnibboR weN", ".esu erofeb relaeh WMdekcolnU ffo nruT .loot gnithgif hcir erutaeF", "sj.hctiws/moc.wmdekcolnu.rabloot//:ptth", "sj.emarfnu/sppa/moc.wmdekcolnu.rabloot//:ptth", "sj.smegtluav/sppa/moc.wmdekcolnu.rabloot//:ptth", "sj.dliubdeeps/sppa/moc.wmdekcolnu.rabloot//:ptth", "EC39TZqMWdprv7RA6PHmt6072LVm4gzDt", /mw_city(\d)/, "==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,46esab;gnp/egami:atad", "=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,46esab;gnp/egami:atad", "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,46esab;gnp/egami:atad", "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,46esab;gnp/egami:atad", "CCmQuSkTFlEAAAAADL7x2HDQ0Y4Cx/m/79p2njjsumYKyNSz26L83F+fP/4YeVjzvpXbQFnVES9VIMoi6xYptNqb+29YREeYCDX/Djgihj5td4xgCGrxjhNqUPCuk4it+JZo3JiCIk7z3yU8LgiSf1zracOOvqx4x/qK9HeB2Bvk9EKK5tHS50JmgNIBl7snQw3h6ZsvFegPzrITOhCcJAzonJsaPLEKL/OUU5GQcPLDAb5uQ7JMh9zYjaxh1TxOoAfg80WMxR4GajWk5WWC+0sQWMCCipPESzJJbMJIT7smhPgXVAWMHNprf8yOxtJNcJj9HdkqMHPWkRDLs28xd68FIs7GE2Q4EW31ZaQ5YGhFqLR8jhgmeOjTgDPW36nCMCMe41pgjXsaWLqJkAXjN2lBTKXok4J+L5Uvgw9sMEBy+xkJZQivMKlXRt6q6eiTX0oFUibjM2aweUhXH4Q7XI314S+Yq/xiiJXaDN3qDPjM2LQEajZA1b5jatTLEpIMahmwi+Z0ilJF2wmC+oGJheVbM+nBXXe0u85sz8SYhH2hPBCaKp2zkLwWOjJtzZYLO8ijdk9HqLlsBh3b3H7DT2ASB02TLmUr1bmqHwEq8r0JxioEdTtPap6Y45bNIVRQngExsu5P48IFJi+wvGLvKUczJ4SyaX6AC2wnSNqJORfjjvlauEHYqRyw5EhKaVkpKaaf6In/a8PTaHRo5KqX4l39c++/eu3z5xvDJurBitVOvbvhpIpflFKZYWk9ZeZR0n2NSRCX9ZJZYVilIMFduRiFMwMC/IDhKobdlczKVYRtwQltYtVpVmRZWu1aiwOXU1NFcv9zHTRYTiUXT2aj4QVQElEcCAAAh9/8fAAAAYACQAAAAABAAAgUEhUSNAAAAogGK0wROBVi,46esab;gnp/egami:atad", "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,46esab;gnp/egami:atad", "CCmQuSkTFlEAAAAA81iKjhz+A/8nQuv/V4ft7W/lyjfleqa5nPtj9fM+rx/Sp3Zh61yBoW0rZ59Wmc33KlGiCXWaeV9il9Yfq1n+9uc67RmwbnvivJ496UkfZlsxpZcWsxDhLmcX9Cd5txXjSfE9u+zo88wZdk+bWKRyJQBhmpKClu60/m0bJmlNsMydrbyrG865P+6ua9NrRsiw4HuRQBgzvI4UMhTUG3abqYj0VETmEsLhjfqCg3MCUVj90wldeNAWwg7PbpRpfemJO+BjETcQzwHZ7+iEGHGhAL6iMt36SpMdmqJeHzBEXG6VllOlqX+5xnteQBwZqKAcn6jUcO2ASGRgLDgwvAIRsNi/8rozZ90vwYeytYClzXgeCH8PfxHFtR6nC5qwtfUkEAWQWlbG4OabhECWyPzeUDUQW1JqyLzsW3jEWcdYtf7XO0mXP8JD9KU3sqZ3bjuVBJIABoAm/QFaF4U7TM6HtMs3j7sXZhuuU0FKMFN5dVv8rZgsHIKT7Vis3tEQTyAppIkEQZvwHzozeYrtq7yKn3NFwstiLLV1ajHAAAXb45SZi9GZh5SbvNmOM1EW0hFV6laAAAwAGZNmzM1QgM3ay92dlJXaGBSZi9GZBBQZyF2d0Z2bTRHWFRHHAAAAL9ajkDDM6ADMrAjM6YDN6kTMUNTMtQDMtATMwIDAlRXYk1SemlGZv1GdYVEdlAAAAwIpsieOw8yMvcjMAUWbpRFIu9Wa0FWZyNEdYVEdVAAAA8X28sLMwoDMwsCMyojN0oTOxQ1Mx0CNw0CMxAjMAUGdhRWLlRXYlJ3Y0hVR0VCAAAwsd+aGooemVDgvK6zuc9+0VDbvwEiCg4+yjMIoWwP8wHqUhOZiUyBQgGIZzRb+JGX/BQmDZP4LaOhTdVPr8VWQv+v3jKkMiKmWoF8KOZzgvEMKg+uvcOeng+J/d8YzzFI3/aLcC417s2x1Z1bGsbaYcGevj/Zhx1X4cOuzwVFlMvSvNKuuW9gTV4qpgliYFESOGTFogJAf453BG94zFen/wzJ4MhOAazf8c/1HXAC2g6pUEnUDmT08JqGnbhFNrMTDmLBbEhJTinaPYDwlOMpzuyWfnwgGVcDhOPBLEhsJUODLZgjW/8DNmhGk92/WEbOAEfzaur3LsRP5DbrlmpIIyXPT9IwdWaOBhQk77zJ5nnzJ18GZHWm2Mj5pe+Oe22QixSkgdKBlHsvI1IXiqQpQWOoQHKEdlgSUSQDSpBtTA+jeWUsWYEL2Rn4vFSRUE8SMT25y4QVQElUUBAAAD3qxcBAEAAAAQAAAAcWQwZXCAAAA87X3SHgELAAASsAAAMXWIBXCAAAATeavg+PA/Dw/AQ0RLJmBAAAAh9/8fAAAAYACQAAAAABAAAgUEhUSNAAAAogGK0wROBVi,46esab;gnp/egami:atad", "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,46esab;gnp/egami:atad", "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,46esab;gnp/egami:atad", "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,46esab;gnp/egami:atad", "==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,46esab;gnp/egami:atad", "==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,46esab;gnp/egami:atad", "repparw_ytic_wm", ".ylno srebmem PIV rof si loot sihT .PR gnisu gnitfarC ylraE", ".ylno srebmem PIV ruo rof si loot sihT .lizarB ni smeG eht tluaV", ".emag eht emarfnU", ".neercs thgif ro egap eliforp no esU .koobecaf ot sraW aifaM morf sehctiwS", "rotaN-a-nissassA", "sj.rotan-a-nissassa/telkramkoob/moc.telkcops//:ptth", "sj.gb.rebbor/telkramkoob/moc.telkcops.www//:ptth", ".seitreporp cificeps bor ottelkramkoob gnibboR", ".resworb ruoy ni rablooT agnyZ eht gnillatsni tuohtiw tsoob modnar eht teG", "rotcelloC CMZ", "sj.ateb-cmz/telkramkoob/moc.telkcops//:ptth", ".gnitfarc yliad ruoy od dna ,seitreporp ruoy morf tcelloC", "retsalB tfiG", "sj.retsalbtfig/telkramkoob/moc.telkcops//:ptth", "sj.stols_esool/telkramkoob/moc.telkcops//:ptth", ".yalp t\'nod taht seno eht tuo kcik ,aifam ruoy eganaM", "reganaM ylimaF", "spuorG yrotnevnI", "sj.puorgyrotnevni/telkramkoob/moc.telkcops//:ptth", ".thgif ssoB eht ni ecno esu ,sessob ylimaf eht thgiF", "rotcelloC tfiG", "sj.rotcelloctfig/telkramkoob/moc.telkcops//:ptth", ".weivrevo reisae rof meht spuorg dna stsop detaler sraW aifaM rof deef swen ruoy nacS", "rethgiF ssoB reficuL", "rezylanA metI", "sj.rezylana.yrotnevni/telkramkoob/moc.telkcops//:ptth", "sj.ynitteg/mb/moc.reficul-ufmm//:ptth", "sj.rekcuhC/sg/kd.ynomis//:ptth", "sj.SRAlluFenorD/stpircS/aifaM/ten.0ymisrm.ndc//:ptth", "sj.pX2nE/stpircS/aifaM/ten.0ymisrm.ndc//:ptth", "sj.skniltfigwm/mb/moc.reficul-ufmm//:ptth", "sj.ofni_ylimaf/telkramkoob/moc.telkcops//:ptth", "sj.ateb-tsilkcehc/telkramkoob/moc.telkcops//:ptth", ".YN ni sessob eht sthgiF", "rethgiF ssoB dekcolnU", "sj.ssob_ylimaf/sppa/moc.wmdekcolnu.rabloot//:ptth", ".stniop lliks ruoy sngissA", "rotcelloC elttaB", "sj.sdrawerelttab/mb/moc.reficul-ufmm//:ptth", "ffuts yretsam ylimaf morf PX tcelloc ot siht esU", "retfiG gaB yretsyM deR", "sj.bm_der/sppa/moc.wmdekcolnu.rabloot//:ptth", "sj.renetrohs_lru/sppa/moc.wmdekcolnu.rabloot//:ptth", "!enorD wen ruo tseT ateB", "selttab ylimaf eht tuoba ofni tnatropmi teG", "xudeR boJtaepeR", "sj.xuder.bojtaeper/telkramkoob/moc.telkcops//:ptth", "sj.reyuBetarC/stpircS/aifaM/ten.0ymisrm.ndc//:ptth", ".ay rof mekop eht syalP", "smetI evitcA yM", "sj.smeti_evitca_ym/sppa/moc.wmdekcolnu.rabloot//:ptth", "sj.renepoknil/telkramkoob/moc.telkcops//:ptth", "sj.redaolpgo/sg/kd.ynomis//:ptth", /20273871374b6c215c21337054646e44347627713c7e22455378464c27/, "dnuorgkcaBgnidaoL#", "2yalrevOrorrE#", ";)(elggot.eludoMsmetItsroW.WM", "\"=kcilcno vid<", ";kcolb :yalpsid", ";xp521 :htdiw;xp5:pot;xp7-:tfel;evitaler:noitisop", "eldnahtnihmetiwol", "ngilAvWMU der trohs wen_nottub_yxes", "ngilAvWMU kcalb trohs wen_nottub_yxes", ">naps/<>naps/<>\"fig.10_61x61_htlaeh_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<", "\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<", ">naps/<>naps/<>\"fig.10_61x61_ygrene_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<", "deppotS reyalS", "])\"srethgiF\" ,.(sniatnoc[a//])\"elddim_bat no_bat\" ,ssalc@(sniatnoc[il//", "])\"slaviR\" ,.(sniatnoc[a//])\"elddim_bat no_bat\" ,ssalc@(sniatnoc[il//", "])\"gnibboR\" ,.(sniatnoc[a//])\"no_bat\" ,ssalc@(sniatnoc[il//", "])\"eliforP\" ,.(sniatnoc[a//])\"reniatnoc_bat\" ,di@(sniatnoc[vid//", /levels">\((.*?)\)/, "evitcA edoM tsilthgiF reyalS", "evitcA edoM gnibboR reyalS", "detceles bat_van_nalc", "evitcA edoM elttaB reyalS", "daeh_raw_eralced", ".yrter neht ,eralced ot tnaw yllaer uoy fi tser remit a esahcrup ,raw ta ydaerlA", "eludoMetadpUreyalP", "\"=eulav tupni<;psbn& DI tekcuB kcattA>rb<>rb<>rb<!reppoh morf stegrat thgif yllacitamotua ot WMdekcolnU esu won nac uoy ,moc.stsilwm ta sdneirf ruo morf ecivres a si reppoH>rb<", "hcnuaLreppoH", "01dimroftsop", /This player is currently part of your mafia/, "lautxetnoc tpmorp_yub_eslupmi", "0=bat&weiv=noitca_wx&thgif=rellortnoc_wx?php.revres_lmth/etomer", "=tekcub?php.wmdekcolnu_evilteg/stelkraMkooB/moc.stsilwm//:ptth", /opponent_id=p%7C\d+/, "gnorts oot llA ro stegraT eviL oN :reyalS", ")06=yticapo(ahpla", ">\";xp682:htdiw;xp051 :thgieh-nim ;xp003 :thgieh-xam;kcolb:x-wolfrevo;llorcs:y-wolfrevo\"=elyts vid<>a/<;psbn&;psbn&goL raelC;psbn&;psbn&>\"gol_raelc-WMU\"=di a<>\";2.0 :yticapo;)02=yticapo(ahpla :retlif;xp2-:pot;evitaler:noitisop;%09:htdiw\"=elyts rh<", ">\";xp2-:pot;xp5:tfel;evitaler:noitisop\"=elyts naps<>\"%57\"=htdiw ht<", ">\";2.0 :yticapo;)02=yticapo(ahpla :retlif;xp1-:pot;evitaler:noitisop;%09:htdiw\"=elyts rh<>elbat/<>rt/<", ">vid/<>vid/<>a/<>naps/<>naps/<)!ateb( ypoC>naps<>naps<>\";xp03-:pot ;xp081:tfel ;evitaler:noitisop\"=elyts \"wen_nottub_yxes\"=ssalc \"#\"=ferh \"golelbaypoc\"=di a<>a/<>\"", ">naps/<>naps/<!deipoC secI>naps<>naps<", "gol_raelc-WMU", "\"=crs \";6.0 :yticapo;)06=yticapo(ahpla :retlif ;xp9 :pot ;evitaler :noitisop\"=elyts \"retoof_gol_WMU\"=di gmi<>\"077063887536612/emaG-sraW-aifaM-ruoy-kcolnU-WMdekcolnU/segap/moc.koobecaf.www//:ptth\"=ferh \"knalb_=tegrat \"egapnaF WMdekcolnU\"=eltit a<>vid/<(: deggol sgnihtoN>\";yerg:roloc;%43:tfel;xp2:pot;evitaler:noitisop\"=elyts vid<>\";kcolb:x-wolfrevo;kcolb:y-wolfrevo;xp56:thgieh-nim;xp073:thgieh-xam;xp6:pot;xp6 :pot ;xp6 xp6 :suidar-tfel-mottob-redrob ;xp6 xp6 :suidar-thgir-mottob-redrob ;xp6 :thgirmottob-suidar-redrob-zom- ;xp6 :tfelmottob-suidar-redrob-zom-;kcalb:roloc-dnuorgkcab;xp691-:tfel;evitaler:noitisop;xp092:htdiw;xp1-:pot-nigram;enon :yalpsid ;02 :xedni-z\"=elyts \"gol-WMU\"=di vid<>a/< >naps/<naps/<goL>\";suounitnoc :ycilop-enilni-dnuorgkcab-zom- ;gniddap :nigiro-dnuorgkcab-zom- ;redrob :pilc-dnuorgkcab-zom- ;tfel :ngila-txet ;%05 xp57 llorcs taeper-on )fig.worra_levart_nwodpord/scihparg/bfwm/moc.agnyz.citats.bfwm//:ptth(lru tnerapsnart :dnuorgkcab\"=elyts naps<>naps<>\";xp59 :htdiw\"=elyts \"redrob_etihw_kcalb trohs wen_nottub_yxes\"=ssalc a<>\";xp371 :pot ;xp056 :tfel ;xp001 :htdiw;etulosba:noitisop\"=elyts \"reniatnoc_gol\"=di vid<>elyts/<};xp8- :pot ;evitaler :noitisop ;xp5 :mottob-nigram ;otua :thgir-nigram ;otua :tfel-nigram ;kcolb :yalpsid{ retoof_gol_WMU# };xp2 0 :nigram ;dlob :thgiew-tnof ;xp21 :ezis-tnof ;xp1 xp1 xp1 :htdiw-redrob ;dcdcdc# dilos xp1 :redrob{gol-WMU#>\"ssc/txet\"=epyt elyts<", "reniatnoc_gol", "\"=di \"mbdaol_dekcolnu\"=ssalc a<", ">vid/<>vid/<", "reniatnoc_sloot", /unlocked_toolbar=(ey[^\&]+)&/, "=ytic_wx&metIsunoBdda=noitca_wx&sunoBpUlevel=rellortnoc_wx?php.revres_lmth/etomer", "sgnitteSkcolnu", ">a/<!WON LAEH>\"#\"=ferh a<", "\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<>\"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc \";xp521:tfel\"=elyts \"ffOnOlivE\"=di a<>a/<>naps/<>naps/<>\"gnp.hcnerw_remmah_noci/3v/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<>\"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc \";xp021:tfel\"=elyts \"sgnitteSkcolnu\"=di a<>a/<>naps/<>naps/<>\"fig.10_61x61_hsac_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>naps<>\"xp01:tfel\"=elyts \"BnottuBknaB\"=di \"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc a<>vid/<>\";enon :yalpsid\"=elyts \"xob_pop\"=ssalc \"deef_golb_wmu\"=di vid<>a/<>naps/<>naps/<>\"", ">vid/<>naps/<>naps/<0>\";yerg:roloc;xp04:htdiw;xp5:tfel;evitaler:noitisop\"=elyts \")slliK + secI( latoT\"=eltit \"tnuoc_latot_wmu\"=di naps<>naps/<:T >\";xp5:tfel;evitaler:noitisop\"=elyts naps<>naps/<0>\";yerg:roloc;xp04:htdiw;xp5:tfel;evitaler:noitisop\"=elyts \"slliK\"=eltit \"tnuoc_llik_wmu\"=di naps<>naps/<:K >\";xp5:tfel;evitaler:noitisop\"=elyts naps<>naps/<0>\";yerg:roloc;xp04:htdiw;evitaler:noitisop\"=elyts \"secI\"=eltit \"tnuoc_eci_wmu\"=di naps<>naps/<:I>naps<>\"sutatSdekcolnu\"=di \";xp81:ezis-tnof;xp002:htdiw;xp651:tfel;xp2-:pot;evitaler:noitisop\"=elyts naps<>a/<>naps/<>naps/<>\"fig.10_61x61_ygrene_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<>\"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc \";xp541:tfel\"=elyts \"ffOnOsboJ\"=di a<>a/<>naps/<>naps/<>\"gnp.61x61_animats_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<>\"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc \";xp041:tfel\"=elyts \"ffOnOmatS\"=di a<>a/<>naps/<>naps/<>\"fig.10_61x61_htlaeh_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>\"wen_htlaeh_yxes\"=ssalc naps<>\"ngilAvWMU kcalb trohs wen_nottub_yxes\"=ssalc \";xp531:tfel\"=elyts \"ffOnOlaeH\"=di a<>a/<>naps/<>naps/<>\"", /px/, "rabloot_mlohkcops", "xp0 :thgieh ;xp0 :thgieh-nim ;xp0 :thgieh-xam ;xp0 :htdiw ;xp0 :htdiw-nim ;xp0 :htdiw-xam ;kcolb :yalpsid ;xp", "gnidaol_deef_golb_wmu", ">rb<>a/<>\")\';enon :yalpsid\',\'elyts\'(etubirttAtes.)\'deef_golb_wmu\'(dIyBtnemelEteg.tnemucod\"=kcilcno \"esolc_pop\"=ssalc \"#\"=ferh \"esolC_poPym\"=di a<>a/<>\"gnp.dekcolnu/segami/moc.wmdekcolnu.ehcac//:ptth\"=crs gmi<>\"knalb_\"=tegrat \"moc.wmdekcolnu//:ptth\"=ferh a<>\";xp082 :thgieh-nim ;xp717 :htdiw-nim;xp082 :thgieh-xam ;xp717 :htdiw-xam;xp082 :thgieh ;xp717 :htdiw;ezilatipac:mrofsnart-txet;xp21 :ezis-tnof;neddih :x-wolfrevo ;otua :y-wolfrevo ;xp01 xp01 xp01 xp01 :nigram\"=elyts vid<", ">\";yerGmid :roloc\"=elyts naps<psbn&-;psbn&>a/<", "\"=ferh a< >rb<", ">\";2.0 :yticapo;)02=yticapo(ahpla :retlif;%09:htdiw\"=elyts rh<", ">a/<1$>\"knalb_\"=tegrat \"1$\"=ferh a<", ">a/<2$>\"knalb_\"=tegrat \"2$//:ptth\"=ferh a<1$", /([\d]+)/, "egap_raw_eralced=morf&", "]])\";etihw dilos xp1 :redrob\",)(gnirts(sniatnoc[elyts@[]\"xifraelc ydob_egassem\"=ssalc@[vid//", "=ytic_wx&bojod=noitca_wx&boj=rellortnoc_wx?php.revres_lmth", /cb=([\da-f]+)/, /job=([\d]+)/, "]])\"552 ,552 ,552\",)(gnirts(sniatnoc[elyts@[]\"ofni_boj\"=ssalc@[vid//", /(p\|[\d]+)/, "htiW-detseuqeR-X", "epyT-tnetnoC", "=di_resu_wx_fs&1=daoletil&1=xaja", /user_cash_nyc":"([$\d,]+)"/, "nodnol_hsac_resu", "sagev_hsac_resu", "lizarb_hsac_resu", " :htdiw ;tfel :taolf ;tfel :ngila-txet ;)94 ,202 ,14(bgr :roloc-dnuorgkcab ;neddih :y-wolfrevo ;neddih :x-wolfrevo", /"user_stamina":([\d]+),"user_max_stamina/, /user_energy'\] = parseInt\("([\d]+)/, /user_cash'\] = parseInt\("([\d]+)/, /user_cash_nyc'\] = "([$\d,]+)"/, /'user_cash_vegas'\] = "([V$\d,]+)"/, "ntb-etanimile-tidnab", "=resu&weiv=noitca_wx&stats=rellortnoc_wx?php.revres_lmth/etomer", "levart=unem&=smaraPtxen&xedni=morf&", "p_kcatta_ntb", "!tsilkcalb eht no si ylimaf stegrat reyalS", "wen_hserfer_egap_yxes wen_nottub_yxes", /10 Attack/, "1=bat&weiv=noitca_wx&thgif=rellortnoc_wx?php.revres_lmth/etomer", /targetToggle/, /Your Attackers/, /Mafia you Attacked/, /xw_controller=hitlist&xw_action=set&xw_city=(\d+).*?tmp=([a-z0-9]+).*?cb=([a-z0-9]+).*?target_pid=(\d+).*?mwzy_token=([a-f0-9]+)/, "=ytic_wx&tes=noitca_wx&tsiltih=rellortnoc_wx?php.revres_lmth/etomer/bfwm/moc.agnyz.srawaifam.koobecaf//:", "=nekot_yzwm&", /is already dead or too weak!/, ".skcus kcehceci agnyZ :reyalS", /Lost/, "ntBkcattA2Vthgif yub_hctab_eslupmi der trohs wen_nottub_yxes", "ffo_tsoob_ntbktarewop_2vthgif", /exp_to_next_level":([\d]+),/, "ogacihc_hsac_resu", /user_stamina":([\d]+)/, "yub_eslupmi wen_kcatta_yxes der muidem wen_nottub_yxes", /message_body">You <strong>LOST<\/strong> the fight/, /xw_controller=hitlist&xw_action=attack([&\w\d=]+)/, /'user_cash_london'\] = "\\u00a3([\d,]+)"/, /user_fields\['user_stamina'\] = parseInt\("([\d]+)/, "deci_yalrevo_rednefed_2vf", "tnuoc_eci_wmu", "tnuoc_latot_wmu", /msg.fight_result =/, /var feed = (.+?); MW\.Feed/, ".slavir ruoy eci ot tsoob thgif eerf ruoy teG", /Need help icing yours.+/, "tsoob eerf a teG", /\,/g, "8=di_tneilc_wx&5=ytic&6=epyt_gnidliub&", "0000000001=tnuoma&", "yevrus_spn_wohs=noitca_wx&yevrus=rellortnoc_wx?php.revres_lmth", "1=yticx&laeh=noitca_wx&latipsoh=rellortnoc_wx?php.revres_lmth", "tnoc_htlaeh_tats", ">\"niaga laeh nac ew litnu sdnoces ", "\"=eulav tupni< fo stsruB esU>\"dekcehC\"=eulav \"tsrub\"=eman \"tsrub\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<>\"dimroftsop\"=di \";xp09:htdiw;enon:eziser\"=elyts \"txet\"=epyt \"", "\"=eulav tupni<;psbn&tegrat rep skcatta mumixaM>\"dekcehC\"=eulav \"kcehcpots\"=eman \"kcehcpots\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<stegraT yhtlaeH diovA;psbn&>\"dekcehC\"=eulav \"yhtlaeh\"=eman \"yhtlaeh\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<>\"3dimroftsop\"=di \";xp05:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"", "\"=eulav tupni<;psbn&etaR yaleD gnibboR/sdauqS boR>\"dekcehC\"=eulav \"dauqsbor\"=eman \"dauqsbor\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<YN ni;psbn&>\"dekcehC\"=eulav \"ynlaeh\"=eman \"ynlaeh\"=di \"xobkcehc\"=epyt tupni<>\"2dimroftsop\"=di \";xp05:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"", "\"=eulav tupni<;psbn&]0001-*333[ etaR kcattA thgiF", ">vid/<>a/<>naps/<>naps/<etadpU & egarotS raelC>naps<>naps<>\"kcalb wen_nottub_yxes\"=ssalc \"etaDpUecroF\"=di a<>rb<>rb<>a/<>naps/<>naps/<erotS ppA>naps<>naps<>\"kcalb wen_nottub_yxes\"=ssalc \"MBmotsuC\"=di a<;psbn&;psbn&>a/<>naps/<>naps/<evaS>naps<>naps<>\"kcalb wen_nottub_yxes\"=ssalc \"sgnitteSevaS\"=di a<", "sgnitteSevaS", /true/, "delbasid_tsiletihw_dekcolnu", "delbasid_tsilkcalb_dekcolnu", "sgat_tsilkcalb_dekcolnu", /\n/g, "!WM ot kcab emoc neht ,txen WMdekcolnU ot nigol ot deen lliw uoY .WMdekcolnU ruoy etadpu tsum uoY", ":tfel;xp001:pot;etulosba:noitisop\"=elyts \" xob_pop\"=ssalc \"", "\"=htdiw \"fig.002x067_tneidarg_gb/eripme/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>\"pop_ofni_PE_inim\"=ssalc \"99999:xedni-z\"=elyts vid<>a/<>\"))di.edoNtnerap.siht(dIyBtnemelEteg.tnemucod(dlihCevomer.)\'reddof_pupop\'(dIyBtnemelEteg.tnemucod\"=kcilcno \"esolc_pop\"=ssalc \"#\"=ferh \"esolC_poPym\"=di a<>\";999999:xedni-z;xp", ">\"xp5-:pot;evitaler:noitisop\"=elyts \"eltit_pupoPym\"=di naps<>\"eltit_eludom_eripme\"=ssalc \"xp02:thgieh;xp", ">vid/<>vid/<>retnec/<>naps/<", "gnibboR ot nruteR :reyalS", "llAboRkcilCeno", ";)bor.rellortnoCgnibboR ,)2(boRerp.rellortnoCgnibboR ,0 ,1 ,\'", "=noitanitsed&7=ytic_wx&levart=noitca_wx&levart=rellortnoc_wx?php.revres_lmth/etomer", "])\'0 :hserfeR\',)(gnirts(sniatnoc[naps//naps//]\"tsoc_hserfer_bor\"=di@[a//", "!ylranG gnihtemoS", ">\"030303#\"=rolocgb rt<", ">llams<>dt<>dt/<>\"", ">dt/< >llams/<", ">dt/< >llams/<>a/<evomer>\"", "\"=crs gmi<>\"", "\"=crs gmi<>\"knalb_\"=tegrat \"/piv-ot-edargpu/moc.wmdekcolnu//:ptth\"=ferh \"ppa_elggot\"=ssalc \";xp0:pot ;evitaler:noitisop\"=elyts a<;psbn&>\"08\"=htdiw dt<", ">vid/<>elbat/<", "erotS ppA telkramkooB", "ltt_tl_kta_wmu", "cni_tl_kta_wmu", /rivalsToggle_(\d+)/, "\"=crs gmi<>naps<>naps<", /targetToggle_(\d+)/, "\"=crs gmi<>naps<>naps<>\"0_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"neerg trohs wen_nottub_yxes\"=ssalc a<", "\"=crs gmi<>naps<>naps<>\"0_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"kcalb trohs wen_nottub_yxes\"=ssalc a<", "_elggoTtegrat\"=di \";evitaler:noitisop\"=elyts \"neerg trohs wen_nottub_yxes\"=ssalc a<", "_elggoTtegrat\"=di \";evitaler:noitisop\"=elyts \"kcalb trohs wen_nottub_yxes\"=ssalc a<", "\"=crs gmi<>naps<>naps<>\"1_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"neerg trohs wen_nottub_yxes\"=ssalc a<", "1_elggoTslavir", "\"=crs gmi<>naps<>naps<>\"2_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"kcalb trohs wen_nottub_yxes\"=ssalc a<", "\"=crs gmi<>naps<>naps<>\"3_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"neerg trohs wen_nottub_yxes\"=ssalc a<", "3_elggoTslavir", ">a/<>naps/<>naps/<x2>naps<>\";xp53 :htdiw\"=elyts naps<>\"8\"=ytic \"etamwerCetavitcA neerg trohs wen_nottub_yxes wen_nottub_yxes\"=ssalc \"#\"=ferh \";xp5:nigram;thgir:taolf\"=elyts \"rebmem werc noitcelloc ytreporp x2 etavitcA\"=eltit a<", "7-llatcelloc-2vporp", "9-llatcelloc-2vporp", "=ytic_werc&1=xajasi&etavitca=noitca_wx&werCytiC=rellortnoc_wx?php.revres_lmth/etomer/bfwm/moc.agnyz.srawaifam.koobecaf//:", "/: nwodlooc no si", ";xp006 :pot ;%94 :tfel ;%04 :htdiw ;kcolb :yalpsid", ">rb<>retnec<>\"eltit-fnoc\"=ssalc vid<>a/<>\"41\"=htdiw \"41\"=thgieh \"fig.10_41x41_nottub_esolc_kcalb/scihparg/bfwm/6e/ten.dwnll.sh.vpagnyz//:", ">vid/<>retnec/<>rb<>rb<", "rellortnoc_boj", "tidnab-boj ofni-tidnab", /their war status/, /are already at war/, /does not exist/i, "wen_llac_yxes. raw_eralced#", / Current Page: index_controller /, /Job Mastery: ([\d]+)%/, /masteryTotal/, "boj a ton yltnerappA", " seriuqer boJ :reyalS", "GNIPPOTS >\"fig.10_61x61_ygrene_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi< ", /jobResult":{"city":([7-9])/, "rabloot_dekcolnu", "sgnittes_dekcolnu", "repparw_tegdiw_2vf"];

localStorage.setItem("scriptumw", "1");
var k = {
unlocked_icon: $n8FKnzn$glZFeWfsXhi(253),
fb_icon: $n8FKnzn$glZFeWfsXhi(254),
evil_icon: $n8FKnzn$glZFeWfsXhi(252),
spock_app: $n8FKnzn$glZFeWfsXhi(255),
mmfu_app: $n8FKnzn$glZFeWfsXhi(251),
unlocked_app: $n8FKnzn$glZFeWfsXhi(256),
simony_app: $n8FKnzn$glZFeWfsXhi(250),
guessx_app: $n8FKnzn$glZFeWfsXhi(257),
installed: $n8FKnzn$glZFeWfsXhi(249),
disabled: $n8FKnzn$glZFeWfsXhi(258),
viponly: $n8FKnzn$glZFeWfsXhi(248),
autostart: $n8FKnzn$glZFeWfsXhi(259)
};
var l = {
log: new Array(),
user: {
firstRun: true,
group_atk: 0,
group_def: 0,
start_group_atk: 0,
start_group_def: 0,
group_atk_inc: 0,
group_def_inc: 0,
tth: 0,
},
tthInt: 0,
xw_user: User.id,
city: $n8FKnzn$glZFeWfsXhi(247).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(260)).className)[1],
umwavoidlist: new Array(),
rivalcycle: new Array(),
livelinks: new Array(),
livelinkindex: 0,
familytargets: new Array(),
familymodeOn: false,
familyindex: 0,
newfighton: false,
defaultappcount: 0,
settings: {
stamOn: false,
postOn: false,
healOn: false,
fbfeedloc: "",
jobsOn: false,
healat: 500,
healny: true,
umwicesteal: false,
burstOn: true,
pauseOn: false,
stopat: 500,
autopostOn: false,
rref: 187,
FighterInt: 1000,
autoBank: false,
removeChat: false,
abortOn: false,
abortHeal: false,
abortAt: 40,
hopperid: $n8FKnzn$glZFeWfsXhi(246),
userobsquads: false,
claimlevel: false,
slayerOn: false,
slayerMode: 0,
evilCity: $n8FKnzn$glZFeWfsXhi(247).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(260)).className)[1],
count: 1,
bursts: 4,
customRivals: new Array(),
Whitelist_enabled: false,
Whitelist: new Array(),
Blacklist_enabled: false,
Blacklist: new Array(),
AppStore: new Array({
vendor : "Spockholms",
name : "Addme-o-matic",
description : "Add to mafia",
url : "http://resdogs.us/Scripts/addomatic.js",
isvip : false,
isinstalled : false
}, {
vendor : "Spockholms",
name : "New Property Parts",
description : "New Property Parts",
url : "http://spocklet.com/bookmarklet/missionlink.js",
isvip : false,
isinstalled : true
}, {
vendor : "Spockholms",
name : "Get promotion",
description : "Get promotion",
url : "https://spocklet.com/bookmarklet/getpromo.js",
isvip : false,
isinstalled : true
}, {
vendor : "Lucifer",
name : "Multi-Open",
description : "Multi-Link-Opener",
url : "https://dl.dropbox.com/s/l3c65snwoynjy89/multiopen_m.js?dl=1",
isvip : false,
isinstalled : false
}, {
vendor : "Spockholms",
name : "Demon New",
description : "Demon",
url : "https://dl.dropbox.com/s/m3p96f9hs25t65g/demon.js?dl=1",
isvip : false,
isinstalled : false
}, {
vendor : "Spockholms",
name : "Demon 850",
description : "Demon",
url : "https://dl.dropbox.com/s/4haeojlali1oajw/850f.js?dl=1",
isvip : false,
isinstalled : false
}, {
vendor : "Spockholms",
name : "Secret District Boss Fighter",
description : "Secret District Boss Fighter",
url : "http://spocklet.com/bookmarklet/secretboss.js",
isvip : false,
isinstalled : true
}, {
vendor : "Spockholms",
name : "Inventory Grouper",
description : "Inventory Grouper",
url : "http://leothelion96.screepts.com/InventoryGrouper.js",
isvip : false,
isinstalled : false
}, {
vendor : "Lucifer",
name : "Family Rivals Adder",
description : "Family Rivals Adder",
url : "http://cdn.nzhost.me/bm/familybulkadder.js",
isvip : false,
isinstalled : false
}, {
vendor: "GuessX",
name: "Drone Full",
description: "Drone Full",
url: "https://dl.dropbox.com/s/p8fbqakmt16fhym/DroneFull.js?dl=1",
isvip: false,
isinstalled: false
}, {
vendor : "Spockholms",
name : "VLA-a-nator",
description : "Dump extra loot",
url : "https://spocklet.com/bookmarklet/vlanator.js",
isvip : false,
isinstalled : false
}, {
vendor : "Spockholms",
name : "Bonus-Link Getter",
description : "Bonus-Link Getter",
url : "https://dl.dropbox.com/s/p8fbqakmt16fhym/DroneFull.js?dl=1",
isvip : false,
isinstalled : true
}, {
vendor: "UnlockedMW",
name: "Speedbuild",
description: "Speedbuild",
url: "https://dl.dropbox.com/s/7swoyqdmya8e0kw/speedbuild.js?dl=1",
isvip: true,
isinstalled: false
}, {
vendor: "UnlockedMW",
name: "Vault Gems",
description: "Vault Gems",
url: "https://dl.dropbox.com/s/qyc7n3ylmqzf37f/vaultgems.js?dl=1",
isvip: true,
isinstalled: false
}, {
vendor: "UnlockedMW",
name: "Unframe",
description: $n8FKnzn$glZFeWfsXhi(263),
url: $n8FKnzn$glZFeWfsXhi(243),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: "Switch",
description: $n8FKnzn$glZFeWfsXhi(264),
url: $n8FKnzn$glZFeWfsXhi(242),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(265),
description: $n8FKnzn$glZFeWfsXhi(241),
url: $n8FKnzn$glZFeWfsXhi(266),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: "Robber BG",
description: $n8FKnzn$glZFeWfsXhi(240),
url: $n8FKnzn$glZFeWfsXhi(267),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(239),
description: $n8FKnzn$glZFeWfsXhi(268),
url: $n8FKnzn$glZFeWfsXhi(238),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: "MiniPack",
description: $n8FKnzn$glZFeWfsXhi(269),
url: $n8FKnzn$glZFeWfsXhi(237),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(270),
description: $n8FKnzn$glZFeWfsXhi(236),
url: $n8FKnzn$glZFeWfsXhi(271),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(235),
description: $n8FKnzn$glZFeWfsXhi(272),
url: $n8FKnzn$glZFeWfsXhi(234),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(273),
description: $n8FKnzn$glZFeWfsXhi(233),
url: $n8FKnzn$glZFeWfsXhi(274),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: "Loose Slots",
description: $n8FKnzn$glZFeWfsXhi(232),
url: $n8FKnzn$glZFeWfsXhi(275),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(231),
description: $n8FKnzn$glZFeWfsXhi(276),
url: $n8FKnzn$glZFeWfsXhi(230),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(277),
description: $n8FKnzn$glZFeWfsXhi(276),
url: $n8FKnzn$glZFeWfsXhi(229),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(278),
description: $n8FKnzn$glZFeWfsXhi(228),
url: $n8FKnzn$glZFeWfsXhi(279),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(227),
description: $n8FKnzn$glZFeWfsXhi(280),
url: $n8FKnzn$glZFeWfsXhi(226),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(281),
description: $n8FKnzn$glZFeWfsXhi(225),
url: $n8FKnzn$glZFeWfsXhi(282),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(224),
description: $n8FKnzn$glZFeWfsXhi(283),
url: $n8FKnzn$glZFeWfsXhi(223),
isvip: false,
isinstalled: false
}, {
vendor: "Lucifer",
name: $n8FKnzn$glZFeWfsXhi(284),
description: $n8FKnzn$glZFeWfsXhi(280),
url: $n8FKnzn$glZFeWfsXhi(222),
isvip: false,
isinstalled: true
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(285),
description: $n8FKnzn$glZFeWfsXhi(221),
url: $n8FKnzn$glZFeWfsXhi(286),
isvip: false,
isinstalled: false
}, {
vendor: "Lucifer",
name: "Tiny Urls",
description: $n8FKnzn$glZFeWfsXhi(220),
url: $n8FKnzn$glZFeWfsXhi(287),
isvip: false,
isinstalled: false
}, {
vendor: "Simony",
name: "Chucker",
description: $n8FKnzn$glZFeWfsXhi(219),
url: $n8FKnzn$glZFeWfsXhi(288),
isvip: false,
isinstalled: true
}, {
vendor: "GuessX",
name: "Drone.x",
description: $n8FKnzn$glZFeWfsXhi(218),
url: $n8FKnzn$glZFeWfsXhi(289),
isvip: false,
isinstalled: false
}, {
vendor: "GuessX",
name: "En2XP.x",
description: $n8FKnzn$glZFeWfsXhi(217),
url: $n8FKnzn$glZFeWfsXhi(290),
isvip: false,
isinstalled: true
}, {
vendor: "Lucifer",
name: "Gift Sender",
description: $n8FKnzn$glZFeWfsXhi(216),
url: $n8FKnzn$glZFeWfsXhi(291),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: "Family Info",
description: $n8FKnzn$glZFeWfsXhi(215),
url: $n8FKnzn$glZFeWfsXhi(292),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: "Checklist",
description: $n8FKnzn$glZFeWfsXhi(214),
url: $n8FKnzn$glZFeWfsXhi(293),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(213),
description: $n8FKnzn$glZFeWfsXhi(294),
url: $n8FKnzn$glZFeWfsXhi(212),
isvip: false,
isinstalled: false
}, {
vendor: "UnlockedMW",
name: $n8FKnzn$glZFeWfsXhi(295),
description: $n8FKnzn$glZFeWfsXhi(211),
url: $n8FKnzn$glZFeWfsXhi(296),
isvip: true,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(210),
description: $n8FKnzn$glZFeWfsXhi(297),
url: $n8FKnzn$glZFeWfsXhi(209),
isvip: false,
isinstalled: false
}, {
vendor: "Lucifer",
name: $n8FKnzn$glZFeWfsXhi(298),
description: $n8FKnzn$glZFeWfsXhi(208),
url: $n8FKnzn$glZFeWfsXhi(299),
isvip: false,
isinstalled: false
}, {
vendor: "Lucifer",
name: $n8FKnzn$glZFeWfsXhi(207),
description: $n8FKnzn$glZFeWfsXhi(300),
url: $n8FKnzn$glZFeWfsXhi(206),
isvip: false,
isinstalled: true
}, {
vendor: "UnlockedMW",
name: $n8FKnzn$glZFeWfsXhi(301),
description: $n8FKnzn$glZFeWfsXhi(205),
url: $n8FKnzn$glZFeWfsXhi(302),
isvip: true,
isinstalled: false
}, {
vendor: "UnlockedMW",
name: "URL Shorten",
description: $n8FKnzn$glZFeWfsXhi(204),
url: $n8FKnzn$glZFeWfsXhi(303),
isvip: false,
isinstalled: true
}, {
vendor: "UnlockedMW",
name: $n8FKnzn$glZFeWfsXhi(203),
description: $n8FKnzn$glZFeWfsXhi(304),
url: $n8FKnzn$glZFeWfsXhi(202),
isvip: true,
isinstalled: false
}, {
vendor: "Lucifer",
name: "Battle Info",
description: $n8FKnzn$glZFeWfsXhi(305),
url: $n8FKnzn$glZFeWfsXhi(201),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(306),
description: $n8FKnzn$glZFeWfsXhi(200),
url: $n8FKnzn$glZFeWfsXhi(307),
isvip: false,
isinstalled: false
}, {
vendor: "GuessX",
name: "CrateBuyer",
description: $n8FKnzn$glZFeWfsXhi(199),
url: $n8FKnzn$glZFeWfsXhi(308),
isvip: false,
isinstalled: false
}, {
vendor: "Spockholms",
name: $n8FKnzn$glZFeWfsXhi(198),
description: $n8FKnzn$glZFeWfsXhi(309),
url: $n8FKnzn$glZFeWfsXhi(197),
isvip: false,
isinstalled: false
}, {
vendor: "UnlockedMW",
name: $n8FKnzn$glZFeWfsXhi(310),
description: $n8FKnzn$glZFeWfsXhi(196),
url: $n8FKnzn$glZFeWfsXhi(311),
isvip: true,
isinstalled: false
}, {
vendor: "Spockholms",
name: "LinkOpener",
description: $n8FKnzn$glZFeWfsXhi(195),
url: $n8FKnzn$glZFeWfsXhi(312),
isvip: false,
isinstalled: false
}, {
vendor: "Simony",
name: "OGP",
description: $n8FKnzn$glZFeWfsXhi(194),
url: $n8FKnzn$glZFeWfsXhi(313),
isvip: false,
isinstalled: true
}),
},
hitlist: false,
abortCount: 0,
CurHealth: 0,
evilOn: false,
NYjobon: false,
Bjobon: false,
popcount: 0,
targetid: 0,
target_name: "",
ajax: false,
icecount: 0,
killcount: 0,
Bjobid: 0,
ILVjobon: false,
fightwatchdogtimout: 0,
icecheckfail: false,
fightInterval: 0,
healInterval: 0,
energyInterval: 0,
keyStr: $n8FKnzn$glZFeWfsXhi(193),
evilInterval: 0,
closing: false,
fightActionRunning: false,
declaring_war: false,
currlevel: $("#user_level").text(),
is_vip: true,
RHangCHKInterval: 0,
RobbingHung: false
};

function n() {
if ($($n8FKnzn$glZFeWfsXhi(192))) {
$($n8FKnzn$glZFeWfsXhi(192)).remove();
$($n8FKnzn$glZFeWfsXhi(315)).remove();
$($n8FKnzn$glZFeWfsXhi(191)).remove();
$($n8FKnzn$glZFeWfsXhi(316)).remove();
$($n8FKnzn$glZFeWfsXhi(190)).remove();
$("#zbar").parent().remove()
}
var c = document.getElementsByTagName("\x61"),
d = $n8FKnzn$glZFeWfsXhi(317);
for (var i = 0; i < c.length; i++) {
if (c[i].innerHTML === "\x69") {
c[i].setAttribute("title", "\x20");
c[i].parentNode.setAttribute("title", $n8FKnzn$glZFeWfsXhi(189));
c[i].parentNode.setAttribute("onclick", d);
c[i].innerHTML = $n8FKnzn$glZFeWfsXhi(318) + d + $n8FKnzn$glZFeWfsXhi(188);
c[i].parentNode.parentNode.setAttribute("style", $n8FKnzn$glZFeWfsXhi(319));
i == c.length
}
}
var T = document.getElementById("lowitemhint");
T.removeChild(T.lastChild);
T.removeChild(T.lastChild);
T.style.width = "230px";
var U = document.createElement("table");
U.id = $n8FKnzn$glZFeWfsXhi(187);
U.border = 0;
U.setAttribute("style", $n8FKnzn$glZFeWfsXhi(320));
var V = $n8FKnzn$glZFeWfsXhi(186);
T.appendChild(U);
document.getElementById($n8FKnzn$glZFeWfsXhi(187)).innerHTML = V;
document.getElementById($n8FKnzn$glZFeWfsXhi(321)).innerHTML = $n8FKnzn$glZFeWfsXhi(185)
}
function o() {
if (l.settings.stamOn == true) {
l.settings.stamOn = 2;
document.getElementById("StamOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("StamOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(184)
} else {
if (l.settings.stamOn == 2) {
l.settings.stamOn = false;
l.newfighton = false;
clearInterval(l.fightInterval);
document.getElementById("StamOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("StamOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(184)
} else {
l.fightInterval = setInterval(Fighter, l.settings.FighterInt);
l.settings.stamOn = true;
document.getElementById("StamOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("StamOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(184)
}
}
writeSettings()
}
function p() {
if (l.settings.healOn == true) {
l.settings.healOn = "red";
document.getElementById("HealOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("HealOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(324)
} else {
if (l.settings.healOn == "red") {
l.settings.healOn = false;
clearInterval(l.healInterval);
document.getElementById("HealOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("HealOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(324)
} else {
l.healInterval = setInterval(DoAutoHeal, 1000);
l.settings.healOn = true;
document.getElementById("HealOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("HealOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(182)
}
}
writeSettings()
}
function q() {
if (l.settings.postOn == true) {
l.settings.postOn = false;
document.getElementById("PostOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("PostOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.fb_icon + $n8FKnzn$glZFeWfsXhi(181)
} else {
l.settings.postOn = true;
document.getElementById("PostOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("PostOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.fb_icon + $n8FKnzn$glZFeWfsXhi(181)
}
writeSettings()
}
function s() {
if (l.settings.jobsOn == true) {
clearInterval(l.energyInterval);
l.energyInterval = setInterval(Jobber, 1000);
l.settings.jobsOn = 2;
document.getElementById("JobsOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("JobsOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(326)
} else {
if (l.settings.jobsOn == 2) {
l.NYjobon = false;
l.settings.jobsOn = false;
clearInterval(l.energyInterval);
document.getElementById("JobsOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("JobsOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(326)
} else {
l.energyInterval = setInterval(Jobber, 1000);
l.settings.jobsOn = true;
document.getElementById("JobsOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(180));
document.getElementById("JobsOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(326)
}
}
writeSettings()
}
function t() {
if (l.evilOn == true) {
if (l.settings.slayerOn == true) {
l.settings.slayerOn = false;
writeSettings();
l.evilOn = false;
l.familymodeOn = false;
l.livelinks = [];
l.livelinkindex = 0;
clearInterval(l.evilInterval);
logEntry($n8FKnzn$glZFeWfsXhi(327));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179)
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(328), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.settings.slayerMode = 0;
logEntry($n8FKnzn$glZFeWfsXhi(178));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.settings.slayerOn = true;
writeSettings()
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(329), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.settings.slayerMode = 1;
logEntry($n8FKnzn$glZFeWfsXhi(177));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.settings.slayerOn = true;
writeSettings()
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(330), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.settings.slayerMode = 2;
logEntry($n8FKnzn$glZFeWfsXhi(176));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.settings.slayerOn = true;
writeSettings()
} else {
l.evilOn = false;
l.familymodeOn = false;
l.livelinks = [];
l.livelinkindex = 0;
clearInterval(l.evilInterval);
logEntry($n8FKnzn$glZFeWfsXhi(327));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179)
}
}
}
}
} else {
l.settings.evilCity = $n8FKnzn$glZFeWfsXhi(247).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(260)).className)[1];
if (document.evaluate($n8FKnzn$glZFeWfsXhi(331), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.targetid = "p|" + ($n8FKnzn$glZFeWfsXhi(175).exec(document.body.innerHTML)[1]);
l.target_name = $n8FKnzn$glZFeWfsXhi(332).exec(document.body.innerHTML)[1];
l.evilInterval = setInterval(PureEvil, 15000);
l.evilOn = true;
logEntry($n8FKnzn$glZFeWfsXhi(174));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
PureEvil()
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(328), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.evilOn = true;
logEntry($n8FKnzn$glZFeWfsXhi(333));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.evilInterval = setInterval(Fightlist, 5000);
Fightlist()
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(329), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.evilOn = true;
logEntry($n8FKnzn$glZFeWfsXhi(173));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.evilInterval = setInterval(Rivals, 5000);
Rivals()
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(330), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.evilOn = true;
logEntry($n8FKnzn$glZFeWfsXhi(334));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
setTimeout(LetThereBeRobberies, 1000)
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(172), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
var S = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(335));
if (S.length > 0 && S[0].id == "battle_tab") {
l.evilOn = true;
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.familymodeOn = true;
var T = document.getElementsByClassName("fl");
for (i = 1; i < T.length - 1; i++) {
var U = decodeID($n8FKnzn$glZFeWfsXhi(171).exec(T[i].innerHTML)[1]);
if (l.umwavoidlist.isAvoid(U)) {
l.familytargets[i - 1] = new familyMember(U, "strong")
} else {
l.familytargets[i - 1] = new familyMember(U, "weak")
}
}
l.evilInterval = setInterval(Battle, 5000);
logEntry($n8FKnzn$glZFeWfsXhi(336));
Battle()
} else {
l.evilOn = true;
l.familymodeOn = true;
var j = 0;
l.familyindex = 0;
l.familytargets.length = 0;
var T = document.getElementsByClassName("name_n_rank");
for (i = 0; i < T.length; i++) {
if (T[i].style.clear == "both") {
l.familytargets[j++] = new familyMember(decodeID($n8FKnzn$glZFeWfsXhi(171).exec(T[i].innerHTML)[1]), "weak")
}
}
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.evilInterval = setInterval(FightFamily, 5000);
logEntry($n8FKnzn$glZFeWfsXhi(170));
FightFamily()
}
} else {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(337)) && $n8FKnzn$glZFeWfsXhi(169).test(document.body.innerHTML)) {
alert($n8FKnzn$glZFeWfsXhi(338));
return
} else {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(337)) && document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(168))) {
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.evilOn = true;
declare_war(null)
} else {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(339))) {
popupTitle = $n8FKnzn$glZFeWfsXhi(167);
content = $n8FKnzn$glZFeWfsXhi(340) + l.settings.hopperid + $n8FKnzn$glZFeWfsXhi(166);
height = "280";
myPop($n8FKnzn$glZFeWfsXhi(341), popupTitle, content, height);
document.getElementById("Launch").onclick = hopper
}
}
}
}
}
}
}
}
}
}
function hopper() {
setTimeout(function () {
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).removeChild(document.getElementById($n8FKnzn$glZFeWfsXhi(341)))
}, 10);
l.settings.hopperid = document.getElementById($n8FKnzn$glZFeWfsXhi(342)).value;
if (document.getElementById("sticky").checked == true) {
l.settings.slayerMode = 3;
logEntry($n8FKnzn$glZFeWfsXhi(164));
l.settings.slayerOn = true;
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322))
} else {
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183))
}
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
writeSettings();
l.evilOn = true;
loadNextHopper();
l.evilInterval = setInterval(Hopperlist, 4000)
}
function Hopperlist() {
if ($n8FKnzn$glZFeWfsXhi(343).test(document.body.innerHTML)) {
closeFightPop();
logEntry($n8FKnzn$glZFeWfsXhi(163))
}
if (commonFightCheck()) {
return
}
stickyCity();
if (l.settings.autoBank) {
Bank()
}
if ((document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(344)).length > 0) || (document.evaluate($n8FKnzn$glZFeWfsXhi(328), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength == 0)) {
logEntry($n8FKnzn$glZFeWfsXhi(162));
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(345), 1, 1, 0, 0);
return
} else {
logEntry($n8FKnzn$glZFeWfsXhi(161));
l.livelinkindex++;
loadNextHopper()
}
}
function u() {
$.getJSON($n8FKnzn$glZFeWfsXhi(346) + l.settings.hopperid + "&callback=?", function (S) {
var T = eval(S);
for (i = 0; i < T.length; i++) {
if (T[i].mwid != "none") {
l.livelinks[l.livelinks.length] = T[i].mwid
}
}
})
}
function loadNextHopper() {
if (l.livelinkindex >= l.livelinks.length) {
logEntry($n8FKnzn$glZFeWfsXhi(160));
l.livelinkindex = 0;
l.livelinks = [];
u();
setTimeout(loadHopperTarget, 1500)
} else {
loadHopperTarget()
}
}
function loadHopperTarget() {
if (l.settings.stamOn != 2) {
for (var i = l.livelinkindex; i <= l.livelinks.length; i++) {
if (!l.umwavoidlist.isAvoid(l.livelinks[i])) {
break
}
l.livelinkindex++
}
}
if (l.livelinkindex < l.livelinks.length) {
var S = document.getElementsByClassName("action");
S[1].firstElementChild.href = S[1].firstElementChild.href.replace($n8FKnzn$glZFeWfsXhi(347), $n8FKnzn$glZFeWfsXhi(159) + l.livelinks[l.livelinkindex]);
l.targetid = l.livelinks[l.livelinkindex];
S[1].firstElementChild.click()
} else {
logEntry($n8FKnzn$glZFeWfsXhi(348))
}
}
function v() {
var S = document.getElementById("toolsMenu");
if (S) {
S.style.display = "block"
}
}
function x() {
var S = document.getElementById("toolsMenu");
if (S) {
S.style.display = "none"
}
}
function y() {
var S = document.getElementById("toolsMenu");
if (S) {
if (S.style.display == "none") {
S.style.display = "block"
}
if (S.style.display == "block") {
S.style.display = "none"
}
}
}
function z() {
if (this.id) {
document.getElementById(this.id).style.filter = $n8FKnzn$glZFeWfsXhi(158);
document.getElementById(this.id).style.opacity = "\x31"
}
}
function A() {
if (this.id) {
document.getElementById(this.id).style.filter = $n8FKnzn$glZFeWfsXhi(349);
document.getElementById(this.id).style.opacity = "0.6"
}
}
var B;

function C() {
var S = document.getElementById("UMW-log");
if (S) {
if (S.style.display == "none") {
document.getElementById("UMW-log").style.display = "block";
UMW_update_log()
} else {
if (S.style.display == "block") {
document.getElementById("UMW-log").style.display = "none";
B.destroy()
}
}
}
}
function logEntry(S) {
if ($n8FKnzn$glZFeWfsXhi(157).test(S) || l.log[l.log.length - 1] != S) {
l.log[l.log.length] = S
}
UMW_update_log()
}
function UMW_update_log() {
var S = null,
T = l.log,
U = "";
S = $n8FKnzn$glZFeWfsXhi(350);
for (var i = 0; i < T.length; i++) {
var V = $n8FKnzn$glZFeWfsXhi(156);
V += $n8FKnzn$glZFeWfsXhi(351) + T[i] + $n8FKnzn$glZFeWfsXhi(155);
V += $n8FKnzn$glZFeWfsXhi(352);
S += V;
if (!$n8FKnzn$glZFeWfsXhi(157).test(T[i])) {
U += T[i] + "\n"
}
}
S += $n8FKnzn$glZFeWfsXhi(154) + k.unlocked_icon + $n8FKnzn$glZFeWfsXhi(353);
document.getElementById("UMW-log").innerHTML = S;
ZeroClipboard.setMoviePath($n8FKnzn$glZFeWfsXhi(153));
B = new ZeroClipboard.Client();
B.setText(U);
B.setHandCursor(true);
B.setCSSEffects(true);
B.addEventListener("complete", function (W, X) {
document.getElementById("copyablelog").innerHTML = $n8FKnzn$glZFeWfsXhi(354)
});
B.glue("copyablelog");
document.getElementById($n8FKnzn$glZFeWfsXhi(152)).addEventListener("mouseover", z, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(152)).addEventListener("mouseout", A, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(355)).addEventListener("click", UMW_clear_log, false)
}
function UMW_clear_log() {
l.log = new Array();
UMW_update_log()
}
function D() {
var S = document.getElementById($n8FKnzn$glZFeWfsXhi(151));
if (S) {
var T, U = $n8FKnzn$glZFeWfsXhi(356) + k.unlocked_icon + $n8FKnzn$glZFeWfsXhi(150);
if (document.getElementById("unlock_log")) {
document.getElementById($n8FKnzn$glZFeWfsXhi(357)).addEventListener("click", C, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(152)).addEventListener("mouseover", z, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(152)).addEventListener("mouseout", A, false);
document.getElementById("UMW-log").addEventListener("click", C, false)
} else {
T = document.createElement("div");
T.id = "unlock_log";
S.appendChild(T);
T.innerHTML = U;
document.getElementById($n8FKnzn$glZFeWfsXhi(357)).addEventListener("click", C, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(152)).addEventListener("mouseover", z, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(152)).addEventListener("mouseout", A, false);
document.getElementById("UMW-log").addEventListener("click", C, false)
}
}
}
function E() {
var S = document.getElementById($n8FKnzn$glZFeWfsXhi(151));
if (S) {
var T, U = $n8FKnzn$glZFeWfsXhi(149);
for (var i = 0; i < l.settings.AppStore.length; i++) {
if (l.settings.AppStore[i].isinstalled) {
U += $n8FKnzn$glZFeWfsXhi(358) + i + $n8FKnzn$glZFeWfsXhi(148) + l.settings.AppStore[i].name + "</div></a>"
}
}
U += $n8FKnzn$glZFeWfsXhi(359);
if (document.getElementById($n8FKnzn$glZFeWfsXhi(147))) {
document.getElementById($n8FKnzn$glZFeWfsXhi(147)).innerHTML = U;
T = document.getElementById($n8FKnzn$glZFeWfsXhi(147));
document.getElementById($n8FKnzn$glZFeWfsXhi(360)).addEventListener("click", y, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(360)).addEventListener("mouseover", v, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(360)).addEventListener("mouseout", x, false);
for (var i = 0; i < document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(146)).length; i++) {
document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(146))[i].onclick = loadbm
}
} else {
T = document.createElement("div");
T.id = $n8FKnzn$glZFeWfsXhi(147);
S.appendChild(T);
T.innerHTML = U;
document.getElementById($n8FKnzn$glZFeWfsXhi(360)).addEventListener("click", y, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(360)).addEventListener("mouseover", v, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(360)).addEventListener("mouseout", x, false);
for (var i = 0; i < document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(146)).length; i++) {
document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(146))[i].onclick = loadbm
}
}
}
}
function F() {
var m, S;
if (m = $n8FKnzn$glZFeWfsXhi(361).exec(document.location.href)) {
S = m[1];
add_code(unescape(S))
}
}
function loadbm() {
var S = parseInt(this.id);
bm_url = l.settings.AppStore[S].url;
var a = document.createElement("script");
a.type = $n8FKnzn$glZFeWfsXhi(145);
a.src = bm_url + "\x3f" + Math.random();
document.getElementsByTagName("head")[0].appendChild(a)
}
function G() {
if (l.settings.claimlevel) {
var S = $("#user_level").text();
if (S != l.currlevel) {
for (i = 0; i < l.settings.count; i++) {
do_ajax("", $n8FKnzn$glZFeWfsXhi(362) + l.city + "&no_load=1")
}
l.currlevel++
}
}

var U = document.getElementById("menubar");
if (l.settings.removeChat) {
try {
document.getElementById("clanChat").parentNode.removeChild(document.getElementById("clanChat"))
} catch (V) {}
}
if (U) {
var W;
if (document.getElementById($n8FKnzn$glZFeWfsXhi(144))) {
W = document.getElementById($n8FKnzn$glZFeWfsXhi(144));
document.getElementById("BankButtonB").addEventListener("click", Bank, false);
document.getElementById("PostOnOff").addEventListener("click", q, false);
document.getElementById("HealOnOff").addEventListener("click", p, false);
document.getElementById("StamOnOff").addEventListener("click", o, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(363)).addEventListener("click", Settings, false);
document.getElementById("EvilOnOff").addEventListener("click", t, false)
} else {
W = document.createElement("div");
W.id = $n8FKnzn$glZFeWfsXhi(144);
U.appendChild(W);
var X = document.getElementById($n8FKnzn$glZFeWfsXhi(143));
healbutton_div = document.createElement("div");
healbutton_div.id = "quickheal";
X.appendChild(healbutton_div);
healbutton_div.innerHTML = $n8FKnzn$glZFeWfsXhi(364);
document.getElementById("quickheal").addEventListener("click", HealNY, false);
var Y = $n8FKnzn$glZFeWfsXhi(142) + k.unlocked_icon + $n8FKnzn$glZFeWfsXhi(365) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(141) + k.fb_icon + $n8FKnzn$glZFeWfsXhi(366);
W.innerHTML = Y;
document.getElementById("BankButtonB").addEventListener("click", Bank, false);
document.getElementById("PostOnOff").addEventListener("click", q, false);
document.getElementById("HealOnOff").addEventListener("click", p, false);
document.getElementById("StamOnOff").addEventListener("click", o, false);
document.getElementById("JobsOnOff").addEventListener("click", s, false);
document.getElementById($n8FKnzn$glZFeWfsXhi(363)).addEventListener("click", Settings, false);
document.getElementById("EvilOnOff").addEventListener("click", t, false);
document.getElementById("umw_logo").addEventListener("click", toggleBlogFeed, false);
if (l.settings.stamOn == true) {
document.getElementById("StamOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("StamOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(184)
} else {
if (l.settings.stamOn == 2) {
document.getElementById("StamOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("StamOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(184)
}
}
if (l.settings.healOn == true) {
document.getElementById("HealOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("HealOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(182)
} else {
if (l.settings.healOn == "red") {
document.getElementById("HealOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("HealOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(182)
}
}
if (l.settings.postOn == true) {
document.getElementById("PostOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("PostOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.fb_icon + $n8FKnzn$glZFeWfsXhi(181)
}
if (l.settings.jobsOn == true) {
document.getElementById("JobsOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(180));
document.getElementById("JobsOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(326)
} else {
if (l.settings.jobsOn == 2) {
document.getElementById("JobsOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("JobsOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(326)
}
}
if (l.settings.evilOn == true) {
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(183));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179)
}
if (l.settings.slayerOn == true) {
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(322));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179)
}
}
}
E();
D()
}
function H(S) {
var a = document.getElementById($n8FKnzn$glZFeWfsXhi(140)),
w, h;
w = parseInt(a.style.width.replace($n8FKnzn$glZFeWfsXhi(367), ""));
h = parseInt(a.style.height.replace($n8FKnzn$glZFeWfsXhi(367), ""));
if (w < 737) {
w = w + 12;
if (w > 737) {
w = 737
}
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).style.maxWidth = w + "px";
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).style.minWidth = w + "px";
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).style.width = w + "px"
}
if (h < 300) {
h = h + 6;
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).style.maxHeight = h + "px";
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).style.minHeight = h + "px";
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).style.height = h + "px"
}
if (w < 737) {
setTimeout(H, 1)
}
}
function toggleBlogFeed() {
var a = document.getElementById($n8FKnzn$glZFeWfsXhi(140));
if (a.style.display == "block") {
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).setAttribute("style", $n8FKnzn$glZFeWfsXhi(139))
} else {
var S = 205;
if (document.getElementById($n8FKnzn$glZFeWfsXhi(368))) {
S = 242
}
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).setAttribute("style", $n8FKnzn$glZFeWfsXhi(138) + S + $n8FKnzn$glZFeWfsXhi(369));
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).innerHTML = $n8FKnzn$glZFeWfsXhi(137);
var T = 550;
for (var i = 1; i < 4; i++) {
setTimeout(function () {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(370))) {
document.getElementById($n8FKnzn$glZFeWfsXhi(370)).innerHTML += ". "
}
}, (T * i))
}
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).style.display = "block";
H();
$.ajax({
type: "GET",
url: $n8FKnzn$glZFeWfsXhi(136),
timeout: 30000,
dataType: "jsonp",
success: function (msg) {
var U = parseInt(msg.count),
V = $n8FKnzn$glZFeWfsXhi(371);
for (var i = 0; i < U; i++) {
msg.posts[i].excerpt = linkify(msg.posts[i].excerpt);
V += '<a href="' + msg.posts[i].url + $n8FKnzn$glZFeWfsXhi(135) + msg.posts[i].title + $n8FKnzn$glZFeWfsXhi(372) + msg.posts[i].date + $n8FKnzn$glZFeWfsXhi(134) + msg.posts[i].excerpt + $n8FKnzn$glZFeWfsXhi(373) + msg.posts[i].url + $n8FKnzn$glZFeWfsXhi(133);
if ((i + 1) != U) {
V += $n8FKnzn$glZFeWfsXhi(374)
}
}
document.getElementById($n8FKnzn$glZFeWfsXhi(140)).innerHTML = V + "</div>"
},
error: function (U, status, V) {
return
}
})
}
}
function linkify(S) {
var T, U, V, W;
U = $n8FKnzn$glZFeWfsXhi(132);
replacedText = S.replace(U, $n8FKnzn$glZFeWfsXhi(375));
V = $n8FKnzn$glZFeWfsXhi(131);
replacedText = replacedText.replace(V, $n8FKnzn$glZFeWfsXhi(376));
return replacedText
}
function declare_war(S) {
var T = null;
if (parseInt(S)) {
T = S
} else {
if (!S || S == undefined) {
var a = Math.floor(Math.random() * 11);
if (a > 5) {
b = 9999999
} else {
b = 999999
}
T = Math.floor(Math.random() * b)
}
}
var U = $n8FKnzn$glZFeWfsXhi(130) + l.city + "&xw_person=" + $n8FKnzn$glZFeWfsXhi(377).exec(l.xw_user)[1] + $n8FKnzn$glZFeWfsXhi(129) + T + $n8FKnzn$glZFeWfsXhi(378);
l.declaring_war = true;
do_ajax("inner_page", U, 1, 1)
}
function Jobber() {
var S = JSON.parse(localStorage.getItem("scriptumw"));
if (l.NYjobon || l.ILVjobon || l.Bjobon) {
if (l.settings.pauseOn) {
if (parseInt(document.getElementById($n8FKnzn$glZFeWfsXhi(128)).innerHTML) < l.settings.stopat) {
l.NYjobon = false;
l.ILVjobon = false;
l.Bjobon = false;
return
}
}
var T, U;
if (l.NYjobon) {
T = document.evaluate($n8FKnzn$glZFeWfsXhi(379), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
T = T.snapshotItem(0).innerHTML;
l.city = $n8FKnzn$glZFeWfsXhi(247).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(260)).className)[1];
if (parseInt(document.getElementById("user_energy").innerHTML) < parseInt(($n8FKnzn$glZFeWfsXhi(127).exec(T))[1])) {
l.NYjobon = false;
return
}
U = $n8FKnzn$glZFeWfsXhi(380) + l.city + "&tmp=" + ($n8FKnzn$glZFeWfsXhi(126).exec(T))[1] + "&cb=" + ($n8FKnzn$glZFeWfsXhi(381).exec(T))[1] + "&xw_person=" + ($n8FKnzn$glZFeWfsXhi(125).exec(T))[1] + "&job=" + ($n8FKnzn$glZFeWfsXhi(382).exec(T))[1] + "&tab=" + ($n8FKnzn$glZFeWfsXhi(124).exec(T))[1]
} else {
if (l.ILVjobon) {
if (document.getElementsByClassName("buy_prompt").length > 0) {
l.ILVjobon = false;
return
}
l.city = $n8FKnzn$glZFeWfsXhi(247).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(260)).className)[1];
T = document.evaluate($n8FKnzn$glZFeWfsXhi(383), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
T = parseInt(($n8FKnzn$glZFeWfsXhi(123).exec(T.snapshotItem(0).id))[1]);
if (([4, 6, 8, 13, 16, 25, 28, 31, 39, 42, 46, 49, 52, 59, 60, 61, 70, 74, 79, 82].indexOf(T) !== -1 && l.city == 6) || ([5, 11, 12, 20, 23, 33, 41, 46, 51, 54, 56, 62, 65, 67, 72, 76, 78].indexOf(T) !== -1 && l.city == 5)) {
ExpertMapController.selectNode(T);
return MapController.doFightJob(T, ($n8FKnzn$glZFeWfsXhi(384).exec(document.getElementById("fight_list0").onclick))[1], 1, ($n8FKnzn$glZFeWfsXhi(122).exec(document.getElementById("fight_list0").onclick))[2])
} else {
ExpertMapController.selectNode(T);
return MapController.panelButtonDoJob(T)
}
} else {
if (l.Bjobon) {
document.getElementById("btn_dojob_" + l.Bjobid).click();
return
}
}
}
var V = new XMLHttpRequest();
V.open("POST", U, true);
V.setRequestHeader($n8FKnzn$glZFeWfsXhi(385), $n8FKnzn$glZFeWfsXhi(121));
V.setRequestHeader("Accept", "*/*");
V.setRequestHeader($n8FKnzn$glZFeWfsXhi(386), $n8FKnzn$glZFeWfsXhi(120));
V.send($n8FKnzn$glZFeWfsXhi(387) + l.xw_user + "&sf_xw_sig=" + local_xw_sig + $n8FKnzn$glZFeWfsXhi(119));
V.onreadystatechange = function () {
if (this.readyState == 4) {
response = V.responseText;
if (($n8FKnzn$glZFeWfsXhi(388).test(response))) {
document.getElementById($n8FKnzn$glZFeWfsXhi(118)).innerHTML = ($n8FKnzn$glZFeWfsXhi(388).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(389)).innerHTML = ($n8FKnzn$glZFeWfsXhi(117).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(390)).innerHTML = ($n8FKnzn$glZFeWfsXhi(116).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(391)).innerHTML = ($n8FKnzn$glZFeWfsXhi(115).exec(response))[1];
document.getElementById("level_bar").setAttribute("style", $n8FKnzn$glZFeWfsXhi(392) + ($n8FKnzn$glZFeWfsXhi(114).exec(response))[1] + "%;");
document.getElementById("user_stamina").innerHTML = ($n8FKnzn$glZFeWfsXhi(393).exec(response))[1]
} else {
if (($n8FKnzn$glZFeWfsXhi(113).test(response))) {
document.getElementById("inner_page").innerHTML = response;
document.getElementById("user_energy").innerHTML = ($n8FKnzn$glZFeWfsXhi(394).exec(response))[1];
document.getElementById("level_bar").setAttribute("style", $n8FKnzn$glZFeWfsXhi(392) + ($n8FKnzn$glZFeWfsXhi(112).exec(response))[1] + "%;");
document.getElementsByClassName("cur_cash").innerHTML = ($n8FKnzn$glZFeWfsXhi(395).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(128)).innerHTML = ($n8FKnzn$glZFeWfsXhi(111).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(118)).innerHTML = ($n8FKnzn$glZFeWfsXhi(396).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(389)).innerHTML = ($n8FKnzn$glZFeWfsXhi(110).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(390)).innerHTML = ($n8FKnzn$glZFeWfsXhi(397).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(391)).innerHTML = ($n8FKnzn$glZFeWfsXhi(109).exec(response))[1]
}
}
}
};
}
}
function I() {
l.NYjobon = false;
l.ILVjobon = false;
l.Bjobon = false;
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(398)).length > 0) {
document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(108))[0].click()
}
return
}
function J(S) {
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(399) + S, 1, 1, 0, 0)
}
function commonFightCheck() {
if (l.fightActionRunning || isFightPopOpen() || (parseInt(document.getElementById("user_stamina").innerHTML) <= 10) || (l.settings.healOn && parseInt(document.getElementById("user_health").innerHTML) < l.settings.healat) || (parseInt(document.getElementById("user_health").innerHTML < 30))) {
return true
} else {
return false
}
}
function stickyCity() {
l.city = $n8FKnzn$glZFeWfsXhi(247).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(260)).className)[1];
if (l.settings.evilCity != l.city) {
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(107) + l.settings.evilCity + $n8FKnzn$glZFeWfsXhi(400), 1, 1, 0, 0)
}
}
function Fightlist() {
var i;
if (commonFightCheck()) {
return
}
if ((document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(344)).length > 0) || (document.evaluate($n8FKnzn$glZFeWfsXhi(328), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength == 0)) {
logEntry($n8FKnzn$glZFeWfsXhi(162));
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(345), 1, 1, 0, 0);
return
}
stickyCity();
if (l.settings.autoBank && (l.city != 5)) {
Bank()
}
l.fightActionRunning = true;
clearTimeout(l.fightwatchdogtimout);
l.fightwatchdogtimout = setTimeout(resetfightaction, 15000);
var S = document.getElementsByClassName("action"),
T = Math.floor(Math.random() * (S.length - 1)) + 1;
for (i = S.length - T; i > 1; i--) {
var U = S[i].parentNode.firstElementChild.className;
if ((U != $n8FKnzn$glZFeWfsXhi(106)) && (l.settings.stamOn == 2 || !l.umwavoidlist.isAvoid(S[i].firstElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|")))) {
break
}
}
l.targetid = S[i].firstElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|");
var V;
try {
if (S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].getAttribute("style") == "color:red") {
V = escape(S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].innerHTML)
}
} catch (W) {
V = 0
}
if (l.umwavoidlist.isAvoid(l.targetid)) {
logEntry($n8FKnzn$glZFeWfsXhi(105));
l.fightActionRunning = false;
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(345), 1, 1, 0, 0);
return
} else {
if (V && (l.settings.Blacklist_enabled == true && l.settings.Blacklist.isWhitelist(V))) {
logEntry($n8FKnzn$glZFeWfsXhi(402));
l.fightActionRunning = false;
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(345), 1, 1, 0, 0);
return
}
}
S[i].firstElementChild.click()
}
Array.prototype.findIndex = function (S) {
var T = "";
for (var i = 0; i < this.length; i++) {
if (this[i].pid == S) {
return i
}
}
return T
};

function Battle() {
var S;
if (commonFightCheck()) {
return
}
stickyCity();
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(104)).length > 0) {
var T = document.getElementsByClassName("fl");
if (T.length - 1 > l.familytargets.length) {
for (i = 1; i < T.length; i++) {
var U = decodeID($n8FKnzn$glZFeWfsXhi(171).exec(T[i].innerHTML)[1]);
if (l.familytargets.findIndex(U) === "") {
if (l.umwavoidlist.isAvoid(U)) {
l.familytargets[l.familytargets.length] = new familyMember(U, "strong")
} else {
l.familytargets[l.familytargets.length] = new familyMember(U, "weak")
}
}
}
}
S = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(104));
i = Math.floor(Math.random() * S.length);
if (l.familytargets[l.familytargets.findIndex(S[i].id.replace($n8FKnzn$glZFeWfsXhi(401), "p|"))].stat == "strong") {
for (i = 0; i < S.length; i++) {
if (l.familytargets[l.familytargets.findIndex(S[i].id.replace($n8FKnzn$glZFeWfsXhi(401), "p|"))].stat == "weak") {
break
}
}
}
if (i >= S.length) {
S = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(403));
S[0].click()
}
l.familyindex = l.familytargets.findIndex(S[i].id.replace($n8FKnzn$glZFeWfsXhi(401), "p|"));
if (l.familytargets[l.familyindex].stat == "strong") {
S = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(403));
S[0].click()
} else {
l.targetid = l.familytargets[l.familyindex].pid;
S[i].click()
}
} else {
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(103)).length > 0) {
S = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(103));
if (!$n8FKnzn$glZFeWfsXhi(404).test(S[0].innerHTML)) {
return
}
for (i = 0; i < 5; i++) {
S[0].click()
}
} else {
S = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(403));
S[0].click()
}
}
}
function Rivals() {
var i;
if (commonFightCheck()) {
return
}
stickyCity();
if ((document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(344)).length > 0) || (document.evaluate($n8FKnzn$glZFeWfsXhi(329), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength == 0)) {
logEntry($n8FKnzn$glZFeWfsXhi(102));
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(405), 1, 1, 0, 0);
return
}
if (l.settings.autoBank && (l.city != 5)) {
Bank()
}
l.fightActionRunning = true;
clearTimeout(l.fightwatchdogtimout);
l.fightwatchdogtimout = setTimeout(resetfightaction, 15000);
var S = document.getElementsByClassName("action");
if (l.is_vip) {
for (i = 0; i < S.length; i++) {
if ($n8FKnzn$glZFeWfsXhi(101).test(S[i].parentNode.firstElementChild.innerHTML) && (l.settings.customRivals[0] == 1)) {
var j = 10;
i++;
while (i < S.length && $n8FKnzn$glZFeWfsXhi(406).test(S[i].firstElementChild.id)) {
var T = S[i].parentNode.firstElementChild.className,
U = 0;
try {
if (S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].getAttribute("style") == "color:red") {
U = escape(S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].innerHTML)
}
} catch (V) {}
if ((l.settings.customRivals[j] == 1) && (T != $n8FKnzn$glZFeWfsXhi(106)) && (l.settings.stamOn == 2 || !l.umwavoidlist.isAvoid(S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|"))) && (l.settings.Whitelist_enabled == false || (U && l.settings.Whitelist_enabled == true && l.settings.Whitelist.isWhitelist(U))) && (l.settings.Blacklist_enabled == false || (l.settings.Blacklist_enabled == true && !l.settings.Blacklist.isWhitelist(U)))) {
if (!l.rivalcycle[i]) {
l.rivalcycle[i] = true;
l.targetid = S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|");
S[i].lastElementChild.click();
return
}
}
j++;
i++
}
i--
} else {
if ($n8FKnzn$glZFeWfsXhi(100).test(S[i].parentNode.firstElementChild.innerHTML) && (l.settings.customRivals[1] == 1)) {
var j = 20;
i++;
while (i < S.length && $n8FKnzn$glZFeWfsXhi(406).test(S[i].firstElementChild.id)) {
var T = S[i].parentNode.firstElementChild.className,
U = 0;
try {
if (S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].getAttribute("style") == "color:red") {
U = escape(S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].innerHTML)
}
} catch (V) {}
if ((l.settings.customRivals[j] == 1) && (T != $n8FKnzn$glZFeWfsXhi(106)) && (l.settings.stamOn == 2 || !l.umwavoidlist.isAvoid(S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|"))) && (l.settings.Whitelist_enabled == false || (U && l.settings.Whitelist_enabled == true && l.settings.Whitelist.isWhitelist(U))) && (l.settings.Blacklist_enabled == false || (l.settings.Blacklist_enabled == true && !l.settings.Blacklist.isWhitelist(U)))) {
if (!l.rivalcycle[i]) {
l.rivalcycle[i] = true;
l.targetid = S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|");
S[i].lastElementChild.click();
return
}
}
j++;
i++
}
i--
} else {
if ($n8FKnzn$glZFeWfsXhi(407).test(S[i].parentNode.firstElementChild.innerHTML) && l.settings.customRivals[2] == 1) {
i++;
while (i < S.length && $n8FKnzn$glZFeWfsXhi(99).test(S[i].firstElementChild.id)) {
var T = S[i].parentNode.firstElementChild.className,
U = 0;
try {
if (S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].getAttribute("style") == "color:red") {
U = escape(S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].innerHTML)
}
} catch (V) {}
if ((T != $n8FKnzn$glZFeWfsXhi(106)) && (l.settings.stamOn == 2 || !l.umwavoidlist.isAvoid(S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|"))) && (l.settings.Whitelist_enabled == false || (U && l.settings.Whitelist_enabled == true && l.settings.Whitelist.isWhitelist(U))) && (l.settings.Blacklist_enabled == false || (l.settings.Blacklist_enabled == true && !l.settings.Blacklist.isWhitelist(U)))) {
if (!l.rivalcycle[i]) {
l.rivalcycle[i] = true;
l.targetid = S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|");
S[i].lastElementChild.click();
return
}
}
j++;
i++
}
i--
} else {
if ($n8FKnzn$glZFeWfsXhi(408).test(S[i].parentNode.firstElementChild.innerHTML) && l.settings.customRivals[3] == 1) {
i++;
while (i < S.length && $n8FKnzn$glZFeWfsXhi(99).test(S[i].firstElementChild.id)) {
var T = S[i].parentNode.firstElementChild.className,
U = 0;
try {
if (S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].getAttribute("style") == "color:red") {
U = escape(S[i].parentNode.childNodes[1].childNodes[3].childNodes[3].childNodes[0].innerHTML)
}
} catch (V) {}
if ((T != $n8FKnzn$glZFeWfsXhi(106)) && (l.settings.stamOn == 2 || !l.umwavoidlist.isAvoid(S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|"))) && (l.settings.Whitelist_enabled == false || (U && l.settings.Whitelist_enabled == true && l.settings.Whitelist.isWhitelist(U))) && (l.settings.Blacklist_enabled == false || (l.settings.Blacklist_enabled == true && !l.settings.Blacklist.isWhitelist(U)))) {
if (!l.rivalcycle[i]) {
l.rivalcycle[i] = true;
l.targetid = S[i].lastElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|");
S[i].lastElementChild.click();
return
}
}
j++;
i++
}
i--
}
}
}
}
}
logEntry($n8FKnzn$glZFeWfsXhi(105));
for (var j = 0; j < l.rivalcycle.length; j++) {
l.rivalcycle[j] = false
}
l.fightActionRunning = false;
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(405), 1, 1, 0, 0);
return
} else {
for (i = 1; i < S.length; i++) {
if (!S[i].firstElementChild) {
break
}
}
for (; i > 0; i--) {
if (S[i].firstElementChild) {
var T = S[i].parentNode.firstElementChild.className;
if ((T != $n8FKnzn$glZFeWfsXhi(106)) && (l.settings.stamOn == 2 || !l.umwavoidlist.isAvoid(S[i].firstElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|")))) {
if (!l.rivalcycle[i]) {
l.rivalcycle[i] = true;
break
}
}
}
}
if (l.rivalcycle[1] == true) {
for (var j = 0; j < l.rivalcycle.length; j++) {
l.rivalcycle[j] = false
}
}
if (i == 0) {
logEntry($n8FKnzn$glZFeWfsXhi(105));
for (var j = 0; j < l.rivalcycle.length; j++) {
l.rivalcycle[j] = false
}
l.fightActionRunning = false;
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(405), 1, 1, 0, 0);
return
}
l.targetid = S[i].firstElementChild.id.replace($n8FKnzn$glZFeWfsXhi(401), "p|");
S[i].firstElementChild.click()
}
}
function FightFamily() {
if ($n8FKnzn$glZFeWfsXhi(343).test(document.body.innerHTML)) {
closeFightPop();
logEntry($n8FKnzn$glZFeWfsXhi(163))
}
if (commonFightCheck()) {
return
}
stickyCity();
if (l.settings.autoBank) {
Bank()
}
if ((document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(344)).length > 0) || (document.evaluate($n8FKnzn$glZFeWfsXhi(328), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength == 0)) {
logEntry($n8FKnzn$glZFeWfsXhi(162));
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(345), 1, 1, 0, 0);
return
} else {
l.familyindex++;
if (l.familyindex >= l.familytargets.length) {
l.familyindex = 0
}
if (l.settings.stamOn != 2) {
for (i = l.familyindex; i < l.familytargets.length; i++) {
if (!l.umwavoidlist.isAvoid(l.familytargets[l.familyindex].pid)) {
break
}
l.familyindex++
}
}
var S = document.getElementsByClassName("action");
S[1].firstElementChild.href = S[1].firstElementChild.href.replace($n8FKnzn$glZFeWfsXhi(347), $n8FKnzn$glZFeWfsXhi(159) + l.familytargets[l.familyindex].pid);
l.targetid = l.familytargets[l.familyindex].pid;
S[1].firstElementChild.click()
}
}
function PureEvil() {
if (commonFightCheck()) {
return
}
stickyCity();
if (l.settings.autoBank) {
Bank()
}
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(344)).length > 0) {
setTimeout(PureEvil, 1500);
J(l.targetid);
return
}
if (document.evaluate($n8FKnzn$glZFeWfsXhi(331), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
var S, T = document.getElementsByTagName("\x61"),
U = $n8FKnzn$glZFeWfsXhi(98).exec(document.body.innerHTML)[1];
for (var i = 0; i < T.length; i++) {
if (hit = $n8FKnzn$glZFeWfsXhi(409).exec(T[i].href)) {
var V;
if ($n8FKnzn$glZFeWfsXhi(97).test(window.location.href)) {
V = "https"
} else {
V = "http"
}
S = V + $n8FKnzn$glZFeWfsXhi(410) + hit[1] + "&tmp=" + hit[2] + "&cb=" + hit[3] + "&xw_person=" + U.substr(2, U.length) + $n8FKnzn$glZFeWfsXhi(96) + hit[4] + $n8FKnzn$glZFeWfsXhi(411) + hit[5] + $n8FKnzn$glZFeWfsXhi(95)
}
}
var W = {
ajax: 1,
liteload: 1,
sf_xw_user_id: l.xw_user,
sf_xw_sig: local_xw_sig
};
$.ajax({
type: "POST",
url: S,
timeout: 30000,
data: W,
success: function (msg) {
if ($n8FKnzn$glZFeWfsXhi(412).test(msg)) {
logEntry("Slayer " + l.target_name + " is dead");
return
} else {
if ($n8FKnzn$glZFeWfsXhi(94).test(msg)) {
logEntry($n8FKnzn$glZFeWfsXhi(413));
return
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(331), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
document.getElementById("btn_attack_" + l.targetid.replace("\x7c", "")).click()
}
}
}
},
error: function (X, status, Y) {
return
}
})
} else {
setTimeout(PureEvil, 1500);
J(l.targetid)
}
}
function Fighter() {
var S, i, T;
if (!l.newfighton && isFightPopOpen() && !l.closing) {
l.newfighton = true;
if (l.fightActionRunning) {
l.fightActionRunning = false;
clearTimeout(l.fightwatchdogtimout)
}
}
if (l.newfighton) {
if (l.settings.pauseOn) {
if (parseInt(document.getElementById($n8FKnzn$glZFeWfsXhi(128)).innerHTML) < l.settings.stopat) {
l.newfighton = false;
return
}
}
if (isFightPopOpen()) {
var U = document.getElementById($n8FKnzn$glZFeWfsXhi(93));
if (!$n8FKnzn$glZFeWfsXhi(414).test(U.innerHTML) || l.settings.stamOn == 2) {
U = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(92));
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(415)).length > 0) {
U = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(415))[1]
}
if (document.getElementById($n8FKnzn$glZFeWfsXhi(91)).style.display == "block" || document.getElementById($n8FKnzn$glZFeWfsXhi(416)).style.display == "block") {
T = parseInt(document.getElementById("user_health").innerHTML);
if ((l.settings.healOn && T < l.settings.healat) || T < 30) {
return
}
url = U.href.replace("remote/", "");
l.abortCount++;
if (l.settings.abortOn && l.abortCount > l.settings.abortAt) {
l.newfighton = false;
l.abortCount = 0;
if (!l.closing) {
setTimeout(closeFightPop, 2500)
}
l.closing = true;
return
}
if (l.settings.burstOn) {
url = url.replace("click_amt=1", "click_amt=" + l.settings.bursts)
}
if (l.settings.FighterInt >= 500 && l.is_vip) {
bursts = 2 + l.abortCount / 20
} else {
if (!l.is_vip) {
bursts = 2
} else {
bursts = 1
}
}
for (i = 0; i < bursts; i++) {
var V = new XMLHttpRequest();
V.open("POST", url, true);
V.setRequestHeader($n8FKnzn$glZFeWfsXhi(385), $n8FKnzn$glZFeWfsXhi(121));
V.setRequestHeader("Accept", "*/*");
V.setRequestHeader($n8FKnzn$glZFeWfsXhi(386), $n8FKnzn$glZFeWfsXhi(120));
V.send($n8FKnzn$glZFeWfsXhi(387) + l.xw_user + "&sf_xw_sig=" + local_xw_sig + $n8FKnzn$glZFeWfsXhi(119));
V.onreadystatechange = function () {
if (this.readyState == 4) {
response = V.responseText;
try {
var msg = JSON.parse(response)
} catch (X) {
return
}
if (!msg.fight_result) {
return
}
if (msg.user_fields.user_health) {
document.getElementById("user_health").innerHTML = msg.user_fields.user_health;
User.health = msg.user_fields.user_health;
l.CurHealth = msg.user_fields.user_health;
document.getElementById($n8FKnzn$glZFeWfsXhi(90)).innerHTML = "Health:" + msg.fight_result.defender.current_health_pct + "\x25"
}
if (l.settings.abortHeal == true && l.abortCount > 3 && msg.fight_result.defender.current_health_pct >= 96) {
l.newfighton = false;
l.abortCount = 0;
if (!l.closing) {
setTimeout(closeFightPop, 2500)
}
l.closing = true;
return
}
FightV2.powerAttack(msg, this);
var Y = ($n8FKnzn$glZFeWfsXhi(114).exec(response))[1];
document.getElementById("level_bar").setAttribute("style", $n8FKnzn$glZFeWfsXhi(392) + Y + "%;");
document.getElementById($n8FKnzn$glZFeWfsXhi(128)).innerHTML = ($n8FKnzn$glZFeWfsXhi(417).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(118)).innerHTML = ($n8FKnzn$glZFeWfsXhi(388).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(390)).innerHTML = ($n8FKnzn$glZFeWfsXhi(116).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(391)).innerHTML = ($n8FKnzn$glZFeWfsXhi(115).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(389)).innerHTML = "Ð�" + ($n8FKnzn$glZFeWfsXhi(89).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(418)).innerHTML = "Ñ�" + ($n8FKnzn$glZFeWfsXhi(88).exec(response))[1];
document.getElementById("user_stamina").innerHTML = ($n8FKnzn$glZFeWfsXhi(419).exec(response))[1];
parseNewFightResults(response)
}
};
return
}
}
}
l.newfighton = false;
l.abortCount = 0;
if (l.settings.umwicesteal) {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(87)).style.display == "block") {
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(420)).length > 0) {
document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(420))[0].click();
return
}
}
}
if (!l.closing) {
setTimeout(closeFightPop, 2500)
}
l.closing = true
}
}
if (l.hitlist) {
if (l.settings.pauseOn) {
if (parseInt(document.getElementById($n8FKnzn$glZFeWfsXhi(128)).innerHTML) < l.settings.stopat) {
l.hitlist = false;
return
}
}
element = document.evaluate($n8FKnzn$glZFeWfsXhi(86), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (element.snapshotLength > 0) {
element = element.snapshotItem(0).href;
var W = document.getElementById("content_row").innerHTML;
if (!($n8FKnzn$glZFeWfsXhi(421).test(W))) {
url = $n8FKnzn$glZFeWfsXhi(85) + ($n8FKnzn$glZFeWfsXhi(422).exec(element))[0]
} else {
l.hitlist = false;
return
}
}
T = parseInt(document.getElementById("user_health").innerHTML);
if ((l.settings.healOn && T < l.settings.healat) || T < 30) {
return
}
var V = new XMLHttpRequest();
V.open("POST", url, true);
V.setRequestHeader($n8FKnzn$glZFeWfsXhi(385), $n8FKnzn$glZFeWfsXhi(121));
V.setRequestHeader("Accept", "*/*");
V.setRequestHeader($n8FKnzn$glZFeWfsXhi(386), $n8FKnzn$glZFeWfsXhi(120));
V.send($n8FKnzn$glZFeWfsXhi(387) + l.xw_user + "&sf_xw_sig=" + local_xw_sig + $n8FKnzn$glZFeWfsXhi(119));
V.onreadystatechange = function () {
if (this.readyState == 4) {
response = V.responseText;
document.getElementById($n8FKnzn$glZFeWfsXhi(128)).innerHTML = ($n8FKnzn$glZFeWfsXhi(84).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(118)).innerHTML = ($n8FKnzn$glZFeWfsXhi(396).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(390)).innerHTML = ($n8FKnzn$glZFeWfsXhi(397).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(391)).innerHTML = ($n8FKnzn$glZFeWfsXhi(109).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(389)).innerHTML = "Ð�" + ($n8FKnzn$glZFeWfsXhi(423).exec(response))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(418)).innerHTML = "Ñ�" + ($n8FKnzn$glZFeWfsXhi(83).exec(response))[1];
document.getElementById("user_stamina").innerHTML = ($n8FKnzn$glZFeWfsXhi(424).exec(response))[1];
document.getElementById("inner_page").innerHTML = response
}
};
}
}
function parseNewFightResults(S) {
var T = document.getElementById($n8FKnzn$glZFeWfsXhi(93));
if (!T) {
return
}
var U = $n8FKnzn$glZFeWfsXhi(414).test(T.innerHTML);
if (U) {
if (!l.umwavoidlist.isAvoid(l.targetid)) {
l.umwavoidlist[l.umwavoidlist.length] = l.targetid;
localStorage.setItem($n8FKnzn$glZFeWfsXhi(82), JSON.stringify(l.umwavoidlist))
}
}
if (l.familymodeOn && U) {
l.familytargets[l.familyindex].stat = "strong"
}
if (!U || (l.settings.stamOn == 2)) {
if (!l.newfighton) {
l.newfighton = true
}
} else {
l.newfighton = false;
l.abortCount = 0;
if (l.settings.stamOn && isFightPopOpen()) {
if (l.settings.umwicesteal) {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(87)).style.display == "block") {
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(420)).length > 0) {
document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(420))[0].click();
return
}
}
}
setTimeout(closeFightPop, 2500)
}
}
if (document.getElementById($n8FKnzn$glZFeWfsXhi(425)).style.display == "block") {
if (($n8FKnzn$glZFeWfsXhi(81).test(S))) {
document.getElementById($n8FKnzn$glZFeWfsXhi(426)).innerHTML = ++l.icecount;
document.getElementById($n8FKnzn$glZFeWfsXhi(80)).innerHTML = l.killcount;
document.getElementById($n8FKnzn$glZFeWfsXhi(427)).innerHTML = l.icecount + l.killcount * 2;
publishIce(S)
}
}
if (document.getElementById($n8FKnzn$glZFeWfsXhi(79)).style.display == "block") {
if (($n8FKnzn$glZFeWfsXhi(81).test(S))) {
document.getElementById($n8FKnzn$glZFeWfsXhi(426)).innerHTML = l.icecount;
document.getElementById($n8FKnzn$glZFeWfsXhi(80)).innerHTML = ++l.killcount;
document.getElementById($n8FKnzn$glZFeWfsXhi(427)).innerHTML = l.icecount + l.killcount * 2;
publishIce(S)
}
}
}
function publishIce(S) {
var T;
if ($n8FKnzn$glZFeWfsXhi(428).test(S)) {
try {
T = $n8FKnzn$glZFeWfsXhi(78).exec(S)[0]
} catch (U) {
return
}
} else {
try {
var msg = JSON.parse(S);
T = msg.fight_result.feed_js
} catch (U) {
return
}
}
var V = $n8FKnzn$glZFeWfsXhi(429).exec(T)[1];
V = "\x28" + V + "\x29";
var W = eval(V),
X = W.description.replace($n8FKnzn$glZFeWfsXhi(77), "");
X = X.replace($n8FKnzn$glZFeWfsXhi(430), "");
X = X.replace($n8FKnzn$glZFeWfsXhi(76), "");
X = X.replace($n8FKnzn$glZFeWfsXhi(431), "");
logEntry(X.replace($n8FKnzn$glZFeWfsXhi(75), ""));
if (l.settings.fbfeedloc != "") {
W.targetId = l.settings.fbfeedloc
}
if (l.settings.autopostOn) {
W.actionLinks[0].name = W.actionLinks[0].name.replace("Get a boost", "Get a Boost");
W.actionLinks[0].name = W.actionLinks[0].name.replace($n8FKnzn$glZFeWfsXhi(432), "Get a Boost")
}
if (l.settings.postOn) {
MW.Feed(W)
}
}
function Bank() {
l.city = $n8FKnzn$glZFeWfsXhi(247).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(260)).className)[1];
if (l.city == 5) {
vegascash = $n8FKnzn$glZFeWfsXhi(74).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(390)).innerHTML)[1];
vegascash = parseInt(vegascash.replace($n8FKnzn$glZFeWfsXhi(433), ""));
url = $n8FKnzn$glZFeWfsXhi(73) + vegascash + $n8FKnzn$glZFeWfsXhi(434)
} else {
url = $n8FKnzn$glZFeWfsXhi(72) + l.city + $n8FKnzn$glZFeWfsXhi(435)
}
var S = {
ajax: 1,
liteload: 1,
sf_xw_user_id: l.xw_user,
sf_xw_sig: local_xw_sig
};
$.ajax({
type: "POST",
url: url,
timeout: 30000,
data: S,
success: function (T) {
if (($n8FKnzn$glZFeWfsXhi(388).test(T))) {
document.getElementById($n8FKnzn$glZFeWfsXhi(118)).innerHTML = ($n8FKnzn$glZFeWfsXhi(388).exec(T))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(389)).innerHTML = "Ð�" + ($n8FKnzn$glZFeWfsXhi(89).exec(T))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(390)).innerHTML = ($n8FKnzn$glZFeWfsXhi(116).exec(T))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(391)).innerHTML = ($n8FKnzn$glZFeWfsXhi(115).exec(T))[1];
document.getElementById($n8FKnzn$glZFeWfsXhi(418)).innerHTML = "Ñ�" + ($n8FKnzn$glZFeWfsXhi(88).exec(T))[1]
}
}
})
}
function DoAutoHeal() {
var S = false,
b, T = parseInt(document.getElementById($n8FKnzn$glZFeWfsXhi(71)).innerHTML);
l.CurHealth = parseInt(document.getElementById("user_health").innerHTML);
if (l.user.tth <= 0 && parseInt(l.CurHealth) < l.settings.healat && l.settings.healOn == "red" && parseInt(User.stamina) > 5 && (l.evilOn || l.newfighton)) {
HealNY();
S = true
} else {
if (l.user.tth <= 0 && parseInt(l.CurHealth) < l.settings.healat && l.settings.healOn == true) {
HealNY();
S = true
}
}
var U = new XMLHttpRequest();
U.open("POST", $n8FKnzn$glZFeWfsXhi(436), true);
U.setRequestHeader($n8FKnzn$glZFeWfsXhi(385), $n8FKnzn$glZFeWfsXhi(121));
U.setRequestHeader("Accept", "*/*");
U.setRequestHeader($n8FKnzn$glZFeWfsXhi(386), $n8FKnzn$glZFeWfsXhi(120));
U.send($n8FKnzn$glZFeWfsXhi(387) + l.xw_user + "&sf_xw_sig=" + local_xw_sig + $n8FKnzn$glZFeWfsXhi(119));
U.onreadystatechange = function () {
if (this.readyState == 4) {
response = U.responseText;
if (U.responseText.length > 15 && JSON.parse(U.responseText)) {
var b = JSON.parse(U.responseText);
document.getElementById("user_health").innerHTML = b.user_fields.user_health;
document.getElementById("user_stamina").innerHTML = b.user_fields.user_stamina;
document.getElementById("user_energy").innerHTML = b.user_fields.user_energy;
l.CurHealth = b.user_fields.user_health;
User.health = b.user_fields.user_health;
l.user.group_atk = b.fightbar.group_atk;
l.user.group_def = b.fightbar.group_def;
if (l.user.firstRun == true) {
l.user.start_group_atk = b.fightbar.group_atk.replace($n8FKnzn$glZFeWfsXhi(70), "");
l.user.start_group_def = b.fightbar.group_def.replace($n8FKnzn$glZFeWfsXhi(70), "");
l.user.firstRun = false
}
update_user_scores()
}
}
};
if (S === false && l.user.tth <= 0 && parseInt(l.CurHealth) < l.settings.healat && l.settings.healOn == "red" && parseInt(User.stamina) > 5 && (l.evilOn || l.newfighton)) {
HealNY()
} else {
if (S === false && l.user.tth <= 0 && parseInt(l.CurHealth) < l.settings.healat && l.settings.healOn == true) {
HealNY()
}
}
}
function HealNY() {
var b, S = (l.settings.healny === true) ? $n8FKnzn$glZFeWfsXhi(437) : $n8FKnzn$glZFeWfsXhi(69),
T = new XMLHttpRequest();
T.open("POST", S, true);
T.setRequestHeader($n8FKnzn$glZFeWfsXhi(385), $n8FKnzn$glZFeWfsXhi(121));
T.setRequestHeader($n8FKnzn$glZFeWfsXhi(386), $n8FKnzn$glZFeWfsXhi(120));
T.send($n8FKnzn$glZFeWfsXhi(387) + l.xw_user + "&sf_xw_sig=" + local_xw_sig);
T.onreadystatechange = function () {
if (this.readyState == 4) {
if (T.responseText.length > 15 && JSON.parse(T.responseText)) {
var b = JSON.parse(T.responseText);
document.getElementById("user_health").innerHTML = b.user_fields.user_health;
l.CurHealth = b.user_fields.user_health;
User.health = b.user_fields.user_health;
l.user.group_atk = b.fightbar.group_atk;
l.user.group_def = b.fightbar.group_def;
if (l.user.firstRun == true) {
l.user.start_group_atk = b.fightbar.group_atk.replace($n8FKnzn$glZFeWfsXhi(70), "");
l.user.start_group_def = b.fightbar.group_def.replace($n8FKnzn$glZFeWfsXhi(70), "");
l.user.firstRun = false
}
update_user_scores();
l.user.tth = b.waitHealTimer;
if (l.tthInt === 0) {
l.tthInt = setInterval(function () {
l.user.tth--;
document.getElementById($n8FKnzn$glZFeWfsXhi(438)).getElementsByClassName("health")[0].innerHTML = $n8FKnzn$glZFeWfsXhi(68) + l.user.tth + $n8FKnzn$glZFeWfsXhi(439) + l.user.tth + "</span>)";
if (l.user.tth <= 0) {
clearInterval(l.tthInt);
l.tthInt = 0
}
}, 1000)
}
f;
if (b.heal_success === 1) {
logEntry("Slayer: " + b.hospital_message)
}
}
}
};
}
function Settings() {
var S = ".9.9d",
T = l.settings.fbfeedloc;
popupTitle = "Sarap Fighter";
if (l.is_vip) {
popupTitle += " VIP 4"
} else {
popupTitle += " PRO 3"
}
popupTitle += S;
content = $n8FKnzn$glZFeWfsXhi(67) + T + $n8FKnzn$glZFeWfsXhi(440) + l.settings.bursts + $n8FKnzn$glZFeWfsXhi(66) + l.settings.stopat + $n8FKnzn$glZFeWfsXhi(441) + l.settings.abortAt + $n8FKnzn$glZFeWfsXhi(65) + l.settings.healat + $n8FKnzn$glZFeWfsXhi(442) + l.settings.rref + $n8FKnzn$glZFeWfsXhi(64);
if (l.is_vip) {
content += $n8FKnzn$glZFeWfsXhi(443) + l.settings.FighterInt + $n8FKnzn$glZFeWfsXhi(63)
}
content += $n8FKnzn$glZFeWfsXhi(444);
height = "760";
myPop($n8FKnzn$glZFeWfsXhi(62), popupTitle, content, height);
document.getElementById($n8FKnzn$glZFeWfsXhi(445)).onclick = saveSettings;
document.getElementById("CustomBM").onclick = display_appstore;
document.getElementById("ForceUpDate").onclick = forceupDate;
if (l.settings.umwicesteal) {
document.getElementById($n8FKnzn$glZFeWfsXhi(61)).checked = true
}
if (l.settings.burstOn) {
document.getElementById("burst").checked = true
}
if (l.settings.pauseOn) {
document.getElementById("pausecheck").checked = true
}
if (l.settings.abortOn) {
document.getElementById("stopcheck").checked = true
}
if (l.settings.autopostOn) {
document.getElementById("autopost").checked = true
}
if (l.settings.autoBank) {
document.getElementById("autobank").checked = true
}
if (l.settings.removeChat) {
document.getElementById("remchat").checked = true
}
if (l.settings.userobsquads) {
document.getElementById("robsquad").checked = true
}
if (l.settings.healny) {
document.getElementById("healny").checked = true
}
if (l.settings.abortHeal) {
document.getElementById("healthy").checked = true
}
if (l.settings.claimlevel) {
document.getElementById("claimlevel").checked = true
}
if ($n8FKnzn$glZFeWfsXhi(446).test(l.settings.Whitelist_enabled)) {
document.getElementById($n8FKnzn$glZFeWfsXhi(60)).checked = true
} else {
document.getElementById($n8FKnzn$glZFeWfsXhi(447)).checked = true
}
if ($n8FKnzn$glZFeWfsXhi(446).test(l.settings.Blacklist_enabled)) {
document.getElementById($n8FKnzn$glZFeWfsXhi(59)).checked = true
} else {
document.getElementById($n8FKnzn$glZFeWfsXhi(448)).checked = true
}
if (l.settings.Whitelist) {
var a = unescape(l.settings.Whitelist[0]);
for (var i = 1; i < l.settings.Whitelist.length; i++) {
a += "\n" + unescape(l.settings.Whitelist[i])
}
document.getElementById($n8FKnzn$glZFeWfsXhi(58)).value = a
}
if (l.settings.Blacklist) {
var a = unescape(l.settings.Blacklist[0]);
for (var i = 1; i < l.settings.Blacklist.length; i++) {
a += "\n" + unescape(l.settings.Blacklist[i])
}
document.getElementById($n8FKnzn$glZFeWfsXhi(449)).value = a
}
}
function saveSettings() {
setTimeout(function () {
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).removeChild(document.getElementById($n8FKnzn$glZFeWfsXhi(62)))
}, 10);
if (l.is_vip) {
l.settings.FighterInt = document.getElementById("postformid6").value;
if (document.getElementById($n8FKnzn$glZFeWfsXhi(59)).checked) {
l.settings.Blacklist_enabled = true
} else {
l.settings.Blacklist_enabled = false
}
if (document.getElementById($n8FKnzn$glZFeWfsXhi(60)).checked) {
l.settings.Whitelist_enabled = true
} else {
l.settings.Whitelist_enabled = false
}
if ($n8FKnzn$glZFeWfsXhi(57).test(document.getElementById($n8FKnzn$glZFeWfsXhi(58)).value)) {
var a = document.getElementById($n8FKnzn$glZFeWfsXhi(58)).value.split($n8FKnzn$glZFeWfsXhi(450));
l.settings.Whitelist = new Array();
for (var i = 0; i < a.length; i++) {
l.settings.Whitelist[i] = escape(a[i])
}
}
if ($n8FKnzn$glZFeWfsXhi(57).test(document.getElementById($n8FKnzn$glZFeWfsXhi(449)).value)) {
var a = document.getElementById($n8FKnzn$glZFeWfsXhi(449)).value.split($n8FKnzn$glZFeWfsXhi(450));
l.settings.Blacklist = new Array();
for (var i = 0; i < a.length; i++) {
l.settings.Blacklist[i] = escape(a[i])
}
}
}
l.settings.rref = parseInt(document.getElementById("postformid5").value);
l.settings.fbfeedloc = document.getElementById("postformid").value;
l.settings.healat = parseInt(document.getElementById("postformid2").value);
l.settings.stopat = parseInt(document.getElementById("postformid3").value);
l.settings.abortAt = parseInt(document.getElementById("postformid7").value);
l.settings.bursts = parseInt(document.getElementById($n8FKnzn$glZFeWfsXhi(56)).value);
if (document.getElementById($n8FKnzn$glZFeWfsXhi(61)).checked == true) {
l.settings.umwicesteal = true
} else {
l.settings.umwicesteal = false
}
if (document.getElementById("autopost").checked == true) {
l.settings.autopostOn = true
} else {
l.settings.autopostOn = false
}
if (document.getElementById("burst").checked == true) {
l.settings.burstOn = true
} else {
l.settings.burstOn = false
}
if (document.getElementById("pausecheck").checked == true) {
l.settings.pauseOn = true
} else {
l.settings.pauseOn = false
}
if (document.getElementById("stopcheck").checked == true) {
l.settings.abortOn = true
} else {
l.settings.abortOn = false
}
if (document.getElementById("autobank").checked == true) {
l.settings.autoBank = true
} else {
l.settings.autoBank = false
}
if (document.getElementById("robsquad").checked == true) {
l.settings.userobsquads = true
} else {
l.settings.userobsquads = false
}
if (document.getElementById("remchat").checked == true) {
l.settings.removeChat = true
} else {
l.settings.removeChat = false
}
if (document.getElementById("healthy").checked == true) {
l.settings.abortHeal = true
} else {
l.settings.abortHeal = false
}
if (document.getElementById("healny").checked == true) {
l.settings.healny = true
} else {
l.settings.healny = false
}
if (document.getElementById("claimlevel").checked == true) {
l.settings.claimlevel = true
} else {
l.settings.claimlevel = false
}
writeSettings()
}
function forceupDate() {
if (confirm($n8FKnzn$glZFeWfsXhi(451))) {
localStorage.clear();
top.location.href = $n8FKnzn$glZFeWfsXhi(55)
}
}
function K(S) {
var T = null,
i;
for (i = 0; i < S.length; i++) {
if (S[i].checked) {
T = S[i].value;
break
}
}
return T
}
function myPop(S, T, U, V, W, X) {
if (!V || V == undefined) {
V = "600"
}
if (!W || W == undefined) {
W = "330"
}
var Y = '<div id="' + S + $n8FKnzn$glZFeWfsXhi(452) + (375 - (W / 2)) + $n8FKnzn$glZFeWfsXhi(54) + W + "px;height:" + V + $n8FKnzn$glZFeWfsXhi(453) + W + $n8FKnzn$glZFeWfsXhi(53) + (W - 10) + $n8FKnzn$glZFeWfsXhi(454) + T + $n8FKnzn$glZFeWfsXhi(52) + U + $n8FKnzn$glZFeWfsXhi(455);
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).innerHTML += Y;
if (X) {
setTimeout(function () {
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).removeChild(document.getElementById(S))
}, X)
}
}
function L() {
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).removeChild(document.getElementById("myPopup"))
}
function LetThereBeRobberies() {
var S = parseInt(document.getElementById("user_stamina").innerHTML);
if (!l.evilOn || l.RobbingHung) {
return
}
if (l.settings.pauseOn) {
if (parseInt(document.getElementById($n8FKnzn$glZFeWfsXhi(128)).innerHTML) < l.settings.stopat) {
l.evilOn = false;
logEntry($n8FKnzn$glZFeWfsXhi(327));
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
return
}
}
if (S < 50) {
logEntry($n8FKnzn$glZFeWfsXhi(51));
setTimeout(LetThereBeRobberies, 30000)
} else {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(330), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength == 0) {
TravelRobbing();
logEntry($n8FKnzn$glZFeWfsXhi(456));
setTimeout(LetThereBeRobberies, 3000)
} else {
if (parseInt($n8FKnzn$glZFeWfsXhi(50).exec(document.getElementById($n8FKnzn$glZFeWfsXhi(457)).onclick)[1]) > 0 && l.settings.userobsquads) {
setTimeout(RefreshMeRS, (6900));
document.getElementById($n8FKnzn$glZFeWfsXhi(457)).click()
} else {
l.RobbingHung = true;
l.RHangCHKInterval = setTimeout(RobbingWatchdog, 30000);
robTheBoard();
setTimeout(RefreshMe, 6900)
}
}
}
}
function robTheBoard() {
if (l.RobbingHung) {
var S = 8;
for (var i = 8; i >= 0; i--) {
setTimeout($n8FKnzn$glZFeWfsXhi(49) + S + $n8FKnzn$glZFeWfsXhi(458), i * l.settings.rref);
S--
}
}
}
function RefreshMeRS() {
CloseDoopidPopup();
setTimeout(LetThereBeRobberies, 4000);
document.getElementById($n8FKnzn$glZFeWfsXhi(48)).click()
}
function RobbingWatchdog() {
clearTimeout(l.RHangCHKInterval);
l.RobbingHung = false;
TravelRobbing();
setTimeout(LetThereBeRobberies, 5000);
return
}
function TravelRobbing() {
do_ajax("inner_page", $n8FKnzn$glZFeWfsXhi(459) + l.settings.evilCity + $n8FKnzn$glZFeWfsXhi(47), 1, 1, 0, 0)
}
function RefreshMe() {
try {
var S = document.evaluate($n8FKnzn$glZFeWfsXhi(460), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (S.snapshotLength >= 1) {
clearTimeout(l.RHangCHKInterval);
l.RobbingHung = false;
CloseDoopidPopup();
setTimeout(LetThereBeRobberies, 4000);
document.getElementById($n8FKnzn$glZFeWfsXhi(48)).click()
} else {
if (l.RobbingHung) {
robTheBoard();
setTimeout(RefreshMe, 5000)
}
}
} catch (T) {}
}
function resetfightaction() {
l.fightActionRunning = false;
closeFightPop()
}
function add_code(S) {
try {
code = JSON.parse(atob(S))
} catch (e) {
code = null
}
if (code && code.name && code.url) {
code.isvip = false;
code.isinstalled = true;
l.settings.AppStore.push(code);
writeSettings();
alert(code.name + $n8FKnzn$glZFeWfsXhi(46))
} else {
alert($n8FKnzn$glZFeWfsXhi(461))
}
}
function display_appstore() {
try {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(62))) {
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).removeChild(document.getElementById($n8FKnzn$glZFeWfsXhi(62)))
}
} catch (e) {}
var b = $n8FKnzn$glZFeWfsXhi(45),
d = 500,
i;
for (i = 0; i < l.settings.AppStore.length; i++) {
if (i % 2 == 0) {
b += "<tr>"
} else {
b += $n8FKnzn$glZFeWfsXhi(462)
}
var S;
if (l.settings.AppStore[i].vendor == "Spockholms") {
S = k.spock_app
} else {
if (l.settings.AppStore[i].vendor == "Simony") {
S = k.simony_app
} else {
if (l.settings.AppStore[i].vendor == "GuessX") {
S = k.guessx_app
} else {
if (l.settings.AppStore[i].vendor == "Lucifer") {
S = k.mmfu_app
} else {
S = k.unlocked_app
}
}
}
}
b += $n8FKnzn$glZFeWfsXhi(44) + S + $n8FKnzn$glZFeWfsXhi(463) + l.settings.AppStore[i].vendor + $n8FKnzn$glZFeWfsXhi(43) + (i + 1) + ".&nbsp;" + l.settings.AppStore[i].name + "</td>";
if (i < l.defaultappcount) {
b += "<td><small>" + l.settings.AppStore[i].description + $n8FKnzn$glZFeWfsXhi(464)
} else {
b += "<td><small>" + l.settings.AppStore[i].description + $n8FKnzn$glZFeWfsXhi(42) + i + $n8FKnzn$glZFeWfsXhi(465)
}
if (l.settings.AppStore[i].isinstalled == 2) {
b += $n8FKnzn$glZFeWfsXhi(41) + i + $n8FKnzn$glZFeWfsXhi(466) + k.autostart + $n8FKnzn$glZFeWfsXhi(40)
} else {
if (l.settings.AppStore[i].isinstalled == true) {
b += $n8FKnzn$glZFeWfsXhi(41) + i + $n8FKnzn$glZFeWfsXhi(466) + k.installed + $n8FKnzn$glZFeWfsXhi(40)
} else {
if (l.settings.AppStore[i].isvip && !l.is_vip) {
b += $n8FKnzn$glZFeWfsXhi(467) + k.viponly + $n8FKnzn$glZFeWfsXhi(40)
} else {
b += $n8FKnzn$glZFeWfsXhi(39) + i + $n8FKnzn$glZFeWfsXhi(466) + k.disabled + $n8FKnzn$glZFeWfsXhi(40)
}
}
}
}
b += $n8FKnzn$glZFeWfsXhi(468);
myPop($n8FKnzn$glZFeWfsXhi(38), $n8FKnzn$glZFeWfsXhi(469), b, d, "440");
var T = document.getElementsByClassName("toggle_app");
for (var r = 0; r < T.length; r++) {
document.getElementsByClassName("toggle_app")[r].onclick = toggle_app
}
var U = document.getElementsByClassName("remove_app");
for (var r = 0; r < U.length; r++) {
document.getElementsByClassName("remove_app")[r].onclick = remove_app
}
}
function toggle_app() {
var S = parseInt(this.id);
if (l.settings.AppStore[S].isvip && !l.is_vip) {
return
}
if (l.settings.AppStore[S].isinstalled == 2) {
l.settings.AppStore[S].isinstalled = false;
document.getElementsByClassName("toggle_app")[S].innerHTML = '<img src="' + k.disabled + '">';
document.getElementsByClassName("toggle_app")[S].setAttribute("style", $n8FKnzn$glZFeWfsXhi(37))
} else {
if (l.settings.AppStore[S].isinstalled == true) {
l.settings.AppStore[S].isinstalled = 2;
document.getElementsByClassName("toggle_app")[S].innerHTML = '<img src="' + k.autostart + '">';
document.getElementsByClassName("toggle_app")[S].setAttribute("style", $n8FKnzn$glZFeWfsXhi(37))
} else {
l.settings.AppStore[S].isinstalled = true;
document.getElementsByClassName("toggle_app")[S].innerHTML = '<img src="' + k.installed + '">';
document.getElementsByClassName("toggle_app")[S].setAttribute("style", $n8FKnzn$glZFeWfsXhi(37))
}
}
writeSettings();
E()
}
function remove_app() {
var S = parseInt(this.id);
l.settings.AppStore.splice(S, 1);
writeSettings();
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).removeChild(document.getElementById($n8FKnzn$glZFeWfsXhi(38)));
display_appstore()
}
function update_user_scores() {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(187))) {
var S = l.user;
document.getElementById($n8FKnzn$glZFeWfsXhi(470)).innerHTML = S.group_atk;
document.getElementById($n8FKnzn$glZFeWfsXhi(36)).innerHTML = S.group_def;
var T = parseInt(parseInt(S.group_atk.replace($n8FKnzn$glZFeWfsXhi(70), "")) - parseInt(S.start_group_atk.replace($n8FKnzn$glZFeWfsXhi(70), ""))),
U = document.getElementById($n8FKnzn$glZFeWfsXhi(471));
if (T >= 0) {
U.innerHTML = "\x2b" + T;
U.className = "good"
} else {
if (T < 0) {
U.innerHTML = T;
U.className = "bad"
}
}
var V = parseInt(parseInt(S.group_def.replace($n8FKnzn$glZFeWfsXhi(70), "")) - parseInt(S.start_group_def.replace($n8FKnzn$glZFeWfsXhi(70), ""))),
W = document.getElementById($n8FKnzn$glZFeWfsXhi(35));
if (V >= 0) {
W.innerHTML = "\x2b" + V;
W.className = "good"
} else {
if (V < 0) {
W.innerHTML = V;
W.className = "bad"
}
}
}
}
function M() {
var S = this.id;
rivalindex = $n8FKnzn$glZFeWfsXhi(472).exec(S)[1];
if (l.settings.customRivals[rivalindex] == 1) {
document.getElementById(S).setAttribute("class", $n8FKnzn$glZFeWfsXhi(34));
document.getElementById(S).innerHTML = $n8FKnzn$glZFeWfsXhi(473) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.settings.customRivals[rivalindex] = 0;
writeSettings()
} else {
document.getElementById(S).setAttribute("class", $n8FKnzn$glZFeWfsXhi(33));
document.getElementById(S).innerHTML = $n8FKnzn$glZFeWfsXhi(473) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.settings.customRivals[rivalindex] = 1;
writeSettings()
}
}
function N() {
var S = this.id;
rivalindex = $n8FKnzn$glZFeWfsXhi(474).exec(S)[1];
if (l.settings.customRivals[rivalindex] == 1) {
document.getElementById(S).setAttribute("class", $n8FKnzn$glZFeWfsXhi(34));
document.getElementById(S).innerHTML = $n8FKnzn$glZFeWfsXhi(32);
l.settings.customRivals[rivalindex] = 0;
writeSettings()
} else {
document.getElementById(S).setAttribute("class", $n8FKnzn$glZFeWfsXhi(33));
document.getElementById(S).innerHTML = $n8FKnzn$glZFeWfsXhi(32);
l.settings.customRivals[rivalindex] = 1;
writeSettings()
}
}
function O() {
var S = document.getElementsByClassName("action");
for (i = 0; i < S.length; i++) {
if (!S[i].firstElementChild) {
if ($n8FKnzn$glZFeWfsXhi(101).test(S[i].parentNode.firstElementChild.innerHTML)) {
var j = 10;
if (l.settings.customRivals[0] == 1) {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(475) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
} else {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(476) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
}
document.getElementById($n8FKnzn$glZFeWfsXhi(30)).onclick = M;
i++;
while (i < S.length && S[i].firstElementChild) {
S[i].setAttribute("style", "width:200px");
if (l.settings.customRivals[j] == 1) {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(477) + j + $n8FKnzn$glZFeWfsXhi(29) + S[i].innerHTML
} else {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(478) + j + $n8FKnzn$glZFeWfsXhi(29) + S[i].innerHTML
}
document.getElementById($n8FKnzn$glZFeWfsXhi(28) + j).onclick = N;
j++;
i++
}
i--
} else {
if ($n8FKnzn$glZFeWfsXhi(100).test(S[i].parentNode.firstElementChild.innerHTML)) {
var j = 20;
if (l.settings.customRivals[1] == 1) {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(479) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
} else {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(27) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
}
document.getElementById($n8FKnzn$glZFeWfsXhi(480)).onclick = M;
i++;
while (i < S.length && S[i].firstElementChild) {
S[i].setAttribute("style", "width:200px");
if (l.settings.customRivals[j] == 1) {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(477) + j + $n8FKnzn$glZFeWfsXhi(29) + S[i].innerHTML
} else {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(478) + j + $n8FKnzn$glZFeWfsXhi(29) + S[i].innerHTML
}
document.getElementById($n8FKnzn$glZFeWfsXhi(28) + j).onclick = N;
j++;
i++
}
i--
} else {
if ($n8FKnzn$glZFeWfsXhi(407).test(S[i].parentNode.firstElementChild.innerHTML)) {
if (l.settings.customRivals[2] == 1) {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(26) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
} else {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(481) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
}
document.getElementById($n8FKnzn$glZFeWfsXhi(25)).onclick = M
} else {
if (l.settings.customRivals[3] == 1) {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(482) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
} else {
S[i].innerHTML = $n8FKnzn$glZFeWfsXhi(24) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(31)
}
document.getElementById($n8FKnzn$glZFeWfsXhi(483)).onclick = M
}
}
}
}
}
}
function P() {
var S = $n8FKnzn$glZFeWfsXhi(23),
T = $n8FKnzn$glZFeWfsXhi(484),
U = $n8FKnzn$glZFeWfsXhi(22);
document.getElementById($n8FKnzn$glZFeWfsXhi(485)).innerHTML += S;
document.getElementById($n8FKnzn$glZFeWfsXhi(21)).innerHTML += T;
document.getElementById($n8FKnzn$glZFeWfsXhi(486)).innerHTML += U;
var V = document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(20));
for (var i = 0; i < V.length; i++) {
document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(20))[i].onclick = ActivateCrewmate
}
}
function ActivateCrewmate() {
var S = parseInt(this.getAttribute("city"));
if (S) {
var T;
if ($n8FKnzn$glZFeWfsXhi(97).test(window.location.href)) {
T = "https"
} else {
T = "http"
}
var U = ["Brazil", "Chicago", "London"],
V = "",
W = T + $n8FKnzn$glZFeWfsXhi(487) + S + $n8FKnzn$glZFeWfsXhi(19);
$.ajax({
type: "POST",
url: W,
timeout: 30000,
data: V,
success: function (msg) {
var X = JSON.parse(msg),
Y;
if (X.data.crewstatus == "ok") {
Y = "activated !"
} else {
if (X.data.crewmsg) {
Y = $n8FKnzn$glZFeWfsXhi(488)
}
}
if (Y.length > 0) {
var Z = document.createElement("div");
Z.id = $n8FKnzn$glZFeWfsXhi(18);
Z.setAttribute("class", "pop_box");
Z.setAttribute("style", $n8FKnzn$glZFeWfsXhi(489));
Z.innerHTML = $n8FKnzn$glZFeWfsXhi(17) + T + $n8FKnzn$glZFeWfsXhi(490) + U[(S - 7)] + $n8FKnzn$glZFeWfsXhi(16) + Y + $n8FKnzn$glZFeWfsXhi(491);
document.getElementById($n8FKnzn$glZFeWfsXhi(165)).appendChild(Z)
}
},
error: function (X, status, Y) {
return
}
})
}
}
$("body").ajaxComplete(function (e, S, T) {
if (l.is_vip) {
if (document.evaluate($n8FKnzn$glZFeWfsXhi(329), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
O()
}
}
var U = S.responseText;
if ($n8FKnzn$glZFeWfsXhi(15).test(U)) {
local_xw_sig = $n8FKnzn$glZFeWfsXhi(15).exec(U)[1]
}
if (l.ajax) {
l.ajax = false;
return
}
if (l.fightActionRunning) {
l.fightActionRunning = false;
clearTimeout(l.fightwatchdogtimout)
}
if (document.getElementById($n8FKnzn$glZFeWfsXhi(93))) {
parseNewFightResults(U)
}
if (document.evaluate($n8FKnzn$glZFeWfsXhi(86), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.hitlist = true
} else {
if (l.hitlist) {
l.hitlist = false
}
}
if (l.settings.jobsOn != false && (document.getElementById("inner_page").getAttribute("class") === $n8FKnzn$glZFeWfsXhi(492) || (document.getElementById("inner_page").getAttribute("class") === $n8FKnzn$glZFeWfsXhi(14)))) {
if (document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(398)).length > 0 && document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(493)).length > 0) {
document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(108))[0].click()
}
setTimeout(function () {
handleJobresponse(U)
}, 50);
return
}
if (l.declaring_war == true && $n8FKnzn$glZFeWfsXhi(13).test(U)) {
if ($n8FKnzn$glZFeWfsXhi(494).test(U)) {
setTimeout(function () {
declare_war(null)
}, 0)
} else {
if ($n8FKnzn$glZFeWfsXhi(12).test(U)) {
setTimeout(function () {
fP(null)
}, 0)
} else {
if ($n8FKnzn$glZFeWfsXhi(495).test(U)) {
l.declaring_war = false
} else {
if ($n8FKnzn$glZFeWfsXhi(11).test(U) || $n8FKnzn$glZFeWfsXhi(496).test(U)) {
setTimeout(function () {
declare_war(null)
}, 0)
} else {
setTimeout(function () {
var V = $n8FKnzn$glZFeWfsXhi(377).exec(document.getElementsByClassName($n8FKnzn$glZFeWfsXhi(10))[0].getAttribute("onclick"))[1];
MW.Feed(postFeedAndSendCallForHelpNew);
$($n8FKnzn$glZFeWfsXhi(497)).css("display", "none");
MW.Popup.hideAndRemove(V);
l.declaring_war = false
}, 1500);
document.getElementById("EvilOnOff").setAttribute("class", $n8FKnzn$glZFeWfsXhi(323));
document.getElementById("EvilOnOff").innerHTML = $n8FKnzn$glZFeWfsXhi(325) + k.evil_icon + $n8FKnzn$glZFeWfsXhi(179);
l.evilOn = false
}
}
}
}
return
}
if (($n8FKnzn$glZFeWfsXhi(9).test(U))) {
var b = eval("\x28" + U + "\x29");
l.user.group_atk = b.fightbar.group_atk;
l.user.group_def = b.fightbar.group_def;
if (l.user.firstRun == true) {
l.user.start_group_atk = b.fightbar.group_atk.replace($n8FKnzn$glZFeWfsXhi(70), "");
l.user.start_group_def = b.fightbar.group_def.replace($n8FKnzn$glZFeWfsXhi(70), "");
l.user.firstRun = false
}
update_user_scores()
}
if ($n8FKnzn$glZFeWfsXhi(498).test(U)) {
P()
}
});

function handleJobresponse(S) {
var T, U;
if ($n8FKnzn$glZFeWfsXhi(8).test(S)) {
var jobObj = JSON.parse(S);
jobObj = JSON.parse(jobObj.data);
T = parseInt(jobObj.job_results.job_mastery_percentage);
U = parseInt(jobObj.job_results.energy_consumed)
} else {
if ($n8FKnzn$glZFeWfsXhi(499).test(S)) {
T = parseInt($n8FKnzn$glZFeWfsXhi(499).exec(S)[1]);
U = parseInt($n8FKnzn$glZFeWfsXhi(7).exec(S)[1])
} else {
if ($n8FKnzn$glZFeWfsXhi(500).test(S)) {
var jobObj = JSON.parse(S);
T = parseInt(jobObj.jobResult.masteryTotal);
U = parseInt(jobObj.jobResult.energy);
if (document.getElementById("btn_queue").childNodes[0].childNodes[0].childNodes[2].innerHTML && (parseInt(document.getElementById("btn_queue").childNodes[0].childNodes[0].childNodes[2].innerHTML) <= 22)) {
document.getElementById($n8FKnzn$glZFeWfsXhi(6)).click()
}
} else {
console.log($n8FKnzn$glZFeWfsXhi(501))
}
}
}
if (l.settings.jobsOn != 2 && T == 100) {
logEntry($n8FKnzn$glZFeWfsXhi(5));
I();
return
} else {
if (U > User.energy) {
logEntry($n8FKnzn$glZFeWfsXhi(502) + U + $n8FKnzn$glZFeWfsXhi(4) + jobObj.user_fields.user_energy + $n8FKnzn$glZFeWfsXhi(503));
I();
return
} else {
if (l.settings.jobsOn == 2 && document.evaluate($n8FKnzn$glZFeWfsXhi(3), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
l.NYjobon = true;
return
} else {
if (l.NYjobon) {
l.NYjobon = false;
return
}
}
if (document.evaluate($n8FKnzn$glZFeWfsXhi(383), document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0 && document.getElementsByClassName("buy_prompt").length == 0) {
l.ILVjobon = true;
return
} else {
if (l.ILVjobon) {
l.ILVjobon = false;
return
}
}
if ($n8FKnzn$glZFeWfsXhi(504).test(S)) {
if ($n8FKnzn$glZFeWfsXhi(2).test(S)) {
l.Bjobid = $n8FKnzn$glZFeWfsXhi(2).exec(S)[2]
}
l.Bjobon = true;
return
} else {
if (l.Bjobon) {
l.Bjobon = false;
return
}
}
}
}
}
function Q() {
n();
if (document.location.href.indexOf($n8FKnzn$glZFeWfsXhi(505)) != -1) {
setTimeout(F, 9000)
}
if (!localStorage.getItem($n8FKnzn$glZFeWfsXhi(82))) {
l.umwavoidlist[0] = "p|45293801";
localStorage.setItem($n8FKnzn$glZFeWfsXhi(82), JSON.stringify(l.umwavoidlist))
} else {
l.umwavoidlist = JSON.parse(localStorage.getItem($n8FKnzn$glZFeWfsXhi(82)))
}
readSettings();
G();
if (l.settings.stamOn == true || l.settings.stamOn == 2) {
l.fightInterval = setInterval(Fighter, l.settings.FighterInt)
}
if ((l.settings.healOn == true) || (l.settings.healOn == "red")) {
l.healInterval = setInterval(DoAutoHeal, 1000)
}
if (l.settings.jobsOn == true || l.settings.jobsOn == 2) {
l.energyInterval = setInterval(Jobber, 1000)
}
if (l.settings.slayerOn == true) {
if (l.settings.slayerMode == 0) {
l.evilInterval = setInterval(Fightlist, 5000);
l.evilOn = true
} else {
if (l.settings.slayerMode == 1) {
l.evilInterval = setInterval(Rivals, 5000);
l.evilOn = true
} else {
if (l.settings.slayerMode == 2) {
setTimeout(LetThereBeRobberies, 3000);
l.evilOn = true
} else {
if (l.settings.slayerMode == 3) {
l.evilOn = true;
loadNextHopper();
l.evilInterval = setInterval(Hopperlist, 4000)
}
}
}
}
}
setInterval(G, 10000);
setTimeout(KillStupidPop, 10000);
for (var i = 0; i < l.settings.AppStore.length; i++) {
if (l.settings.AppStore[i].isinstalled == 2) {
var S = l.settings.AppStore[i].url,
a = document.createElement("script");
a.type = $n8FKnzn$glZFeWfsXhi(145);
a.src = S + "\x3f" + Math.random();
document.getElementsByTagName("head")[0].appendChild(a)
}
}
setTimeout(P, 500)
}
if (document.getElementById($n8FKnzn$glZFeWfsXhi(144))) {
return
} else {
Q()
}
function KillStupidPop() {
if ($($n8FKnzn$glZFeWfsXhi(1)).css("display") == "block") {
$($n8FKnzn$glZFeWfsXhi(1)).css("display", "none")
}
}
function writeSettings() {
localStorage.setItem($n8FKnzn$glZFeWfsXhi(506), JSON.stringify(l.settings))
}
function readSettings() {
l.defaultappcount = l.settings.AppStore.length;
if (!localStorage.getItem($n8FKnzn$glZFeWfsXhi(506))) {
writeSettings()
} else {
tempsettings = JSON.parse(localStorage.getItem($n8FKnzn$glZFeWfsXhi(506)));
if (Object.keys(tempsettings).length != Object.keys(l.settings).length) {
writeSettings()
} else {
if (tempsettings.AppStore.length < l.settings.AppStore.length) {
writeSettings()
} else {
l.settings = tempsettings
}
}
}
}
function R(S, T) {
T = T || document;
return document.evaluate(S, T, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
}
HTMLElement.prototype.click = function () {
$(this).click()
};

function familyMember(S, T) {
this.pid = S;
this.stat = T
}
function decodeID(S) {
S = unescape(S);
if (isNaN(S)) {
S = decode64(S)
}
return S
}
function decode64(S) {
var T = "",
U, V, W = "",
X, Y, Z, aa = "",
i = 0,
ab = $n8FKnzn$glZFeWfsXhi(0);
if (ab.exec(S)) {}
S = S.replace($n8FKnzn$glZFeWfsXhi(0), "");
do {
X = l.keyStr.indexOf(S.charAt(i++));
Y = l.keyStr.indexOf(S.charAt(i++));
Z = l.keyStr.indexOf(S.charAt(i++));
aa = l.keyStr.indexOf(S.charAt(i++));
U = (X << 2) | (Y >> 4);
V = ((Y & 15) << 4) | (Z >> 2);
W = ((Z & 3) << 6) | aa;
T = T + String.fromCharCode(U);
if (Z != 64) {
T = T + String.fromCharCode(V)
}
if (aa != 64) {
T = T + String.fromCharCode(W)
}
U = V = W = "";
X = Y = Z = aa = ""
} while (i < S.length);
return T
}
function isFightPopOpen() {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(507))) {
if (document.getElementById($n8FKnzn$glZFeWfsXhi(507)).style.display != "none") {
return true
} else {
return false
}
} else {
return false
}
}
function closeFightPop() {
l.ajax = true;
l.closing = false;
CloseJS()
}
function CloseDoopidPopup() {
if ($(".pop_bg").length > 0) {
$(".pop_bg").each(function () {
var S = this.id;
MW.Popup.hide(S.substr(S.lastIndexOf("\x5f") + 1))
})
}
}
Array.prototype.isAvoid = function (S) {
for (var i = 0; i < this.length; i++) {
if (this[i] == S) {
return true
}
}
return false
};
Array.prototype.isWhitelist = function (S) {
for (var i = 0; i < this.length; i++) {
if (this[i] == S) {
return true
}
}
return false
};
Array.prototype.isBlacklist = function (S) {
for (var i = 0; i < this.length; i++) {
if (this[i] == S) {
return true
}
}
return false
};
};
injectScript(myscript);