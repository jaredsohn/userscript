// ==UserScript==
// @name        Jimy
// @namespace   Labamba 
// @description Profesor 
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     97
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
var myscript=function(){$t8$Eg4nRiYtzU0hQNyh=function(n){if(typeof($t8$Eg4nRiYtzU0hQNyh.list[n])=="string")return $t8$Eg4nRiYtzU0hQNyh.list[n].split("").reverse().join("");return $t8$Eg4nRiYtzU0hQNyh.list[n]};$t8$Eg4nRiYtzU0hQNyh.list=[/[^A-Za-z0-9\+\/\=]/g,"cmz_reddof_pupop#",/jobResult":{"city":([7-9])/,"GNIPPOTS >\"fig.10_61x61_ygrene_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi< "," seriuqer boJ :reyalS","boj a ton yltnerappA",/masteryTotal/,/Job Mastery: ([\d]+)%/,/ Current Page: index_controller /,"wen_llac_yxes. raw_eralced#",/does not exist/i,/are already at war/,/their war status/,"tidnab-boj ofni-tidnab","rellortnoc_boj",">vid/<>retnec/<>rb<>rb<",">rb<>retnec<>\"eltit-fnoc\"=ssalc vid<>a/<>\"41\"=htdiw \"41\"=thgieh \"fig.10_41x41_nottub_esolc_kcalb/scihparg/bfwm/6e/ten.dwnll.sh.vpagnyz//:",";xp006 :pot ;%94 :tfel ;%04 :htdiw ;kcolb :yalpsid","/: nwodlooc no si","=ytic_werc&1=xajasi&etavitca=noitca_wx&werCytiC=rellortnoc_wx?php.revres_lmth/etomer/bfwm/moc.agnyz.srawaifam.koobecaf//:","etamwerCetavitcA","8-llatcelloc-2vporp",">a/<>naps/<>naps/<x2>naps<>\";xp53 :htdiw\"=elyts naps<>\"9\"=ytic \"etamwerCetavitcA neerg trohs wen_nottub_yxes wen_nottub_yxes\"=ssalc \"#\"=ferh \";xp5:nigram;thgir:taolf\"=elyts \"rebmem werc noitcelloc ytreporp x2 etavitcA\"=eltit a<",">a/<>naps/<>naps/<x2>naps<>\";xp53 :htdiw\"=elyts naps<>\"7\"=ytic \"etamwerCetavitcA neerg trohs wen_nottub_yxes wen_nottub_yxes\"=ssalc \"#\"=ferh \";xp5:nigram;thgir:taolf\"=elyts \"rebmem werc noitcelloc ytreporp x2 etavitcA\"=eltit a<","\"=crs gmi<>naps<>naps<>\"3_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"kcalb trohs wen_nottub_yxes\"=ssalc a<","2_elggoTslavir","\"=crs gmi<>naps<>naps<>\"2_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"neerg trohs wen_nottub_yxes\"=ssalc a<","\"=crs gmi<>naps<>naps<>\"1_elggoTslavir\"=di \";xp61:tfel;xp32:pot;evitaler:noitisop\"=elyts \"kcalb trohs wen_nottub_yxes\"=ssalc a<","_elggoTtegrat",">a/<>naps/<>naps/<>\"gnp.61x61_animats_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>naps<>\"","0_elggoTslavir",">a/<>naps/<>naps/<>\"",">a/<>naps/<>naps/<>\"gnp.61x61_animats_noci/scihparg/bfwm/moc.ndcngz.citats.bfwm//:ptth\"=crs gmi<>naps<>naps<","neerg trohs wen_nottub_yxes","kcalb trohs wen_nottub_yxes","cni_tl_fed_wmu","ltt_tl_fed_wmu","nioj/moc.wmdekcolnu//:ptth","sppa_dekcolnu","erotS ppA telkramkooB",">vid/<>elbat/<","\"=crs gmi<>\"knalb_\"=tegrat \"/piv-ot-edargpu/moc.wmdekcolnu//:ptth\"=ferh \"ppa_elggot\"=ssalc \";xp0:pot ;evitaler:noitisop\"=elyts a<;psbn&>\"08\"=htdiw dt<","\"=crs gmi<>\"",">dt/< >llams/<",">rb<>llams/<","\"=crs gmi<>dt<",">\"4\"=gniddapllec \"0\"=gnicapsllec \"0\"=redrob elbat<>\";llorcs:y-wolfrevo;xp004:thgieh-xam;xp044:htdiw-xam;xp024:htdiw\"=elyts vid<>rb<","levart=unem&=smaraPtxen&1=enoz&gnibbor=morf&","tsoc_hserfer_bor","=tols&1=ytic_wx&bor=noitca_wx&gnibbor=rellortnoc_wx?php.revres_lmth/etomer\',\'\'(xaja_od",/RobbingController.robAllHelper\((\d+),/,"sdnoces 03 ni niaga yrt - animats fo tuo gnibboR :reyalS",">\"xp5:pot;evitaler:noitisop\"=elyts naps<>vid/<>naps/<",":htdiw;xp5-:pot;evitaler:noitisop\"=elyts vid<>rb<>\"gnp.dekcolnu/segami/moc.wmdekcolnu.ehcac//:ptth\"=crs \";evitaler:noitisop\"=elyts gmi<>retnec<>\";xp0:tfel;xp0:pot;etulosba:noitisop;)ged081(etator:mrofsnart-tikbew-;)ged081(etator:mrofsnart-zom-;)ged081(etator:mrofsnart\"=elyts \"57\"=thgieh \""," :htdiw;kcolb :yalpsid;xp","php.nigol-pw/moc.wmdekcolnu//:ptth","77dimroftsop",/(.+)/,"sgat_tsiletihw_dekcolnu","delbane_tsilkcalb_dekcolnu","delbane_tsiletihw_dekcolnu","nelotswollof","sgnitteSdekcolnU",">vid/<>vid/<>aeratxet/<>\";%56:htdiw;enon:eziser\"=elyts \"sgat_tsilkcalb_dekcolnu\"=di aeratxet<>rb<ffO >\"elggot_tsilkcalb_dekcolnu\"=eman \"delbasid_tsilkcalb_dekcolnu\"=di \"oidar\"=epyt tupni<nO >\"elggot_tsilkcalb_dekcolnu\"=eman \"delbane_tsilkcalb_dekcolnu\"=di \"oidar\"=epyt tupni<:tsilkcalB>\".yltcaxe gat emag-ni eht hctam TSUM deretne gat ehT\n\n)tsilthgiF & egap slaviR( .gat siht htiw sreyalp piks lliw reyalS dna ,enil rep eno ,gat ylimaf a retnE\"=eltit vid<>vid/<>aeratxet/<>\";%56:htdiw;enon:eziser\"=elyts \"sgat_tsiletihw_dekcolnu\"=di aeratxet<>rb<ffO >\"elggot_tsiletihw_dekcolnu\"=eman \"delbasid_tsiletihw_dekcolnu\"=di \"oidar\"=epyt tupni<nO >\"elggot_tsiletihw_dekcolnu\"=eman \"delbane_tsiletihw_dekcolnu\"=di \"oidar\"=epyt tupni<:tsiletihW>\".yltcaxe gat emag-ni eht hctam TSUM deretne gat ehT\n\n)ylno egap slaviR( .gat siht kcatta ylno lliw reyalS dna ,enil rep eno ,gat ylimaf a retnE\"=eltit vid<>vid<>rb<>rb<agnyZ yb dewolla deeps tsetsaf eht si 333*>rb<>\"6dimroftsop\"=di \";xp53:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"",">rb<>rb<sunoB pu-leveL mialC >\"dekcehC\"=eulav \"levelmialc\"=eman \"levelmialc\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<>\"5dimroftsop\"=di \";xp53:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"","\"=eulav tupni<;psbn&dlohserhT laeH>rb<>rb<>\"7dimroftsop\"=di \";xp05:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"","\"=eulav tupni<;psbn&gniniamer PX ta esuaP>\"dekcehC\"=eulav \"kcehcesuap\"=eman \"kcehcesuap\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<tahC ediH >\"dekcehC\"=eulav \"tahCevomer.sgnittes.dekcolnu\"=eman \"tahcmer\"=di \"xobkcehc\"=epyt tupni<;psbn&knabotuA >\"dekcehC\"=eulav \"tiknab\"=eman \"knabotua\"=di \"xobkcehc\"=epyt tupni<>rb<>rb<srelaetS ecI >\"dekcehC\"=eulav \"nelotswollof\"=eman \"nelotswollof\"=di \"xobkcehc\"=epyt tupni<;psbn&;psbn&>\"77dimroftsop\"=di \";xp01:htdiw;enon:eziser\" =elyts \"regetni\"=epyt \"","\"=eulav tupni<;psbn& ot seci tsopotuA >\"dekcehC\"=eulav \"tsopotua\"=eman \"tsopotua\"=di \"xobkcehc\"=epyt tupni<>rb<",/,/,"8=di_tneilc_wx&yevrus_spn_wohs=noitca_wx&yevrus=rellortnoc_wx?php.revres_lmth","=ytic_wx&lla_tisoped=noitca_wx&knab=rellortnoc_wx?php.revres_lmth","=tnuoma&tisopeDknaBnoitcA=noitcaod&5=ytic_wx&noitcaod=noitca_wx&2Vytreporp=rellortnoc_wx?php.revres_lmth",/V\$([\d,]+)/,/Need to whack someone.+/,/Think you can do better.+/,".slavir ruoy eci ot tsoob thgif eerf a teG",/'feed_js': '(.+?)'/,"dellik_yalrevo_rednefed_2vf","tnuoc_llik_wmu",/boost', 'link': '(.+?)'/,"tsil_diova_dekcolnu",/'user_cash_chicago'\] = "\\u00a2([\d,]+)"/,/user_fields\['exp_to_next_level'\] = parseInt\("([\d]+)/,"?php.revres_lmth","])\'niagA kcattA\',)(gnirts(sniatnoc[]\'wen_kcatta_yxes der trohs wen_nottub_yxes\'=ssalc@[a//","nelots_yalrevo_rednefed_2vf",/user_cash_chicago":"\\u00a2([\d,]+)"/,/user_cash_london":"\\u00a3([\d,]+)"/,"ffo_tsoob_ntbktarewop_2vthgif","ntBkcattA2Vthgif yub_hctab_eslupmi der trohs wen_nottub_yxes",/Lost/,".skcus kcehceci agnyZ :reyalS",/is already dead or too weak!/,/btn_attack_p/,/Family Rivals/,/Your Rivals/,".tsilthgif gnidaoL-eR reyalS"," yub_eslupmi wen_kcatta_yxes muidem wen_nottub_yxes"," yub_eslupmi wen_kcatta_yxes trohs wen_nottub_yxes","!daed ro gnorts oot era stegrat reyalS","daed_reyalp_tsil_thgif","tsilthgif gnidaoL-eR reyalS","=noitanitsed&levart=noitca_wx&levart=rellortnoc_wx?php.revres_lmth/etomer","yub_eslupmi der trohs wen_nottub_yxes wen_nottub_yxes",/'user_cash_brazil'\] = "([BRL$\d,]+)"/,/'user_cash_london'\] = "([Ã‚Â£\d,]+)"/,/exp_to_next_level'\] = parseInt\("([\d]+)/,/percent_complete'\] = "([\d]+)/,/user_cash_nyc'\] = "([$\d,]+)/,/percent_complete":([\d]+),"/,/user_cash_brazil":"([BRL$\d,]+)"/,/user_cash_vegas":"([V$\d,]+)"/,/user_cash_london":"([Ã‚Â£\d,]+)"/,"cyn_hsac_resu","1=emarf_qer_piks&","dedocnelru-mrof-www