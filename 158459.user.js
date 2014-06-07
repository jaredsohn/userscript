// ==UserScript==
// @author   	xxxxExxxx 
// @name        zzzzEzzzz-Chrome
// @namespace   yyyyEyyyy
// @version		7
// @include		http://www.erepublik.com/*/military/battlefield/*
// @description zzzzEzzzz
// @downloadURL http://userscripts.org/scripts/source/158459.user.js
// @updateURL	http://userscripts.org/scripts/source/158459.meta.js
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==

//Chrome 7 = Rezolvat bug la divizie, hits si fereastra de report.
//Chrome 6 = S-au scos ferestrele cu topurile.
//Chrome 5 = Get data from battle-stats.
//Chrome 4 = Solved bug with military unit.
//Chrome 3 = Solved bugs after template change.
//Chrome 2 = Solved bug if My Damage is 0.

var VERSIONo="Chrome 7";
scriptName='zzzzEzzzz-Chrome';
scriptId='158459';
scriptVersion=7;
scriptUpdateText='Rezolvat bug la divizie, hits si fereastra de report.';

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('4 B=1;4 j="A";4 z="y://C.D.8/x?F="+j;$=0=0.E(H);u(w 7==="v")7=m;m.t("G",3(){0(\'#U\').o({\'i\':\'1\',\'e\':\'#f\'});0(\'#T\').o({\'i\':\'1\',\'e\':\'#f\'});S();9(5);g()},V);3 g(){a{4 h=7.I[\'W\'];4 k="r://s.l.8/q/X/R/"+h}b(2){d("Q: "+2.c)}0.p(k,3(6){a{L=0(".K J",6).n()}b(2){d("M: "+2.c)}})}5="r://s.l.8/q";3 9(5){0.p(5,3(6){a{N=0("#P O",6).n()}b(2){d("9: "+2.c)}})}',60,60,'jQuery||err|function|var|urlDO|data|unsafeWindow|com|getDO|try|catch|message|alert|color|fff|militaryUnit|citID|opacity|formKey|urlProfile|erepublik|window|html|css|get|en|http|www|addEventListener|if|undefined|typeof|formResponse|https|URLGoogleForm|dGhVWVpPbkVRWVphSTIwVnktVWYwZ2c6MQ|sendToSpread|spreadsheets|google|noConflict|formkey|DOMContentLoaded|true|SERVER_DATA|span|one_newspaper|military_unit|getProfile|daily_order|strong|orderContainer|href|profile|createReportButtons|red_domination|blue_domination|false|citizenId|citizen'.split('|')))

var rankar={"Recruit":1, "Private":2, "Private *":3, "Private **":4, "Private ***":5,"Corporal":6, "Corporal *":7, "Corporal **":8, "Corporal ***":9, "Sergeant":10,"Sergeant *":11, "Sergeant **":12, "Sergeant ***":13, "Lieutenant":14, "Lieutenant *":15,"Lieutenant **":16, "Lieutenant ***":17, "Captain":18, "Captain *":19, "Captain **":20,"Captain ***":21, "Major":22, "Major *":23, "Major **":24, "Major ***": 25,"Commander":26, "Commander *":27, "Commander **":28, "Commander ***":29, "Lt Colonel":30,"Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35,"Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40,"General ***":41, "Field Marshal":42, "Field Marshal *":43, "Field Marshal **":44, "Field Marshal ***":45,"Supreme Marshal":46, "Supreme Marshal *":47, "Supreme Marshal **":48, "Supreme Marshal ***":49, "National Force":50,"National Force *":51, "National Force **":52, "National Force ***":53, "World Class Force":54, "World Class Force *":55,"World Class Force **":56, "World Class Force ***":57, "Legendary Force":58, "Legendary Force *":59, "Legendary Force **":60,"Legendary Force ***":61, "God of War":62, "God of War *":63, "God of War **":64, "God of War ***": 65, "Recrut":1, "Soldat":2, "Soldat *":3, "Soldat **":4, "Soldat ***":5,"Caporal":6, "Caporal *":7, "Caporal **":8, "Caporal ***":9, "Sergent":10,"Sergent *":11, "Sergent **":12, "Sergent ***":13, "Locotenent":14, "Locotenent *":15,"Locotenent **":16, "Locotenent ***":17, "Capitan":18, "Capitan *":19, "Capitan **":20,"Capitan ***":21, "Maior":22, "Maior *":23, "Maior **":24, "Maior ***": 25,"Comandor":26, "Comandor *":27, "Comandor **":28, "Comandor ***":29, "Lt Colonel":30,"Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35,"Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40,"General ***":41, "Mareșal":42, "Mareșal *":43, "Mareșal **":44, "Mareșal ***":45,"Mareșal Suprem":46, "Mareșal Suprem *":47, "Mareșal Suprem **":48, "Mareșal Suprem ***":49, "Putere Națională":50,"Putere Națională *":51, "Putere Națională **":52, "Putere Națională ***":53, "Putere Mondială":54, "Putere Mondială *":55,"Putere Mondială **":56, "Putere Mondială ***":57, "Luptător de Legendă":58, "Luptător de Legendă *":59, "Luptător de Legendă **":60,"Luptător de Legendă ***":61, "Zeu al Războiului":62, "Zeu al Războiului *":63, "Zeu al Războiului **":64, "Zeu al Războiului ***": 65 };

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('l V(){c 1y=9("#T .1N .1L").r("Y");c 1b=9(\'.1x a\').r("G").2r("/");c 2p=1b[1b.1n-1];c 2v=2u.1M;c 1j=9("#2w .2o .2q .1j I").j();c 1v=D.A[\'2S\'];c k=9("#o #s .t .M n p").j();1c(k==0){c k="0"}c Z=2M.S.1M.2L.2K();c 1t=D.A[\'2x\'];c 2n=2P(9("#2H").j());c 1O=9("#T .1N .1L");c E=1O.r("G");c X="u://1Q.21.2j/1K/2A/X-2z/"+E.O(E.26("/")+1);c 2b="u://1Q.21.2j/1K/2D/2b/"+E.O(E.26("/")+1);c H,q=9(\'#1o\').r(\'Y\');H=1g(9(\'#2F\').j().11().2O(/,/g,\'\'));1c(2E q==\'2G\'||q.1n==0){q=9(\'#1o\').r(\'2C-Y\').O(15).11()}2y{q=q.O(15).11()}c 1l=2B[q];c 1w=C.x(k/((C.x(C.x((1A(1l)+5)*(1g(H)+1H)*0.1F)))*3));c 1s=D.A[\'2I\'];c 1u=9("#2Q 2R").j();c 1G=9("#T .1x .2N b").j();c 1I=D.A[\'2J\'];c 1k=D.A[\'1k\'];c 1B=C.x(C.x((1A(1l)+5)*(1g(H)+1H)*0.1F)*3);c v=9("#o #s .t I").j();c 1z=9("#o #s .t .M n b").j();1c(2t==1){c u;c 1C=2s+"&d.0.e="+1j+"&d.1.e="+1y+"&d.2.e="+1v+"&d.4.e="+k+"&d.6.e="+1t+"&d.8.e="+2n+"&d.10.e="+X+"&d.12.e="+H+"&d.14.e="+1w+"&d.16.e="+1s+"&d.18.e="+1u+"&d.20.e="+3p+"&d.22.e="+1k+"&d.24.e="+1I+"&d.25.e="+W+"&d.27.e="+1B+"&d.28.e="+1G+"&d.29.e="+v+"&d.31.e="+1z+"&d.32.e="+3A+"&3l=3k";u=33 34();u.35("36",1C,30);u.2Z(2T)}}l 1r(Z,1E,B,y){L{13="2V";B=B||"";c Q=9(S.1J("Q")).r({"1p":y,"P":y,"13":13,"2U":Z,"B":B});9.1f(1E,l(17,F){9.1f(F 2X 2Y?F:[F],l(i,1q){9(S.1J("38")).r({"3g":"3h","1p":17,"P":y+"3i"+17,"F":1q}).R(Q)})});Q.R(S.3j)}K(m){w("1r: "+m.J+" "+y)}}l 3e(){L{2e=9(\'<a 1d="h" G="#">1i!</a>\');2e.R(9(".2h z").1m(\'</z><z><n P="3a"></n>\')).1h("U",1e);2c=9(\'<a 1d="h" G="#">1i!</a>\');2c.R(9("#2a").1m(\'</z><z><n P="39"></n>\')).1h("U",1e);9("#2a").f("3b","3c");9(".2h").f("3d","3v");9(".h").f("2l-2i",9("#1Y 1Z").f("2l-2i"));9(".h").f("3f",\'#37\');9(".h").f("2W",\'3z\');9(".h").f("3y",\'3x\');9(".h").f("1S-3C",\'3B\');9(".h").f("1S-3E",\'3F\');9(".h").f("1V",\'1X\');9(".h").f("3D-1V",\'1X\');9(".h").f("1a",\'0.7\');9(".h").f("3w",\'0 3o\');9(".h").f("j-3n",\'#3m 1P 3q 1P\');9(".h:1W").f("1a",9("#1Y 1Z:1W").f("1a"));c 1T=\'<a 1d="1R" G="#">&2k;&2k; 1i &1U;&1U;</a>\';9([9("#3r"),9("#3u")]).1f(l(){9(3t).1m(1T).3s(".1R").1h("U",23)})}K(m){w("19: "+m.J)}}c 1e=l(){L{c v=9("#o #s .t I").j();c k=9("#o #s .t .M n p").j()}K(m){w("19: "+m.J)}w("2m "+W+" / N 2g: "+k+" / N 2d: "+v);V();2f 1D};c 23=l(){L{c v=9("#o #s .t I").j();c k=9("#o #s .t .M n p").j()}K(m){w("19: "+m.J)}w("2m "+W+" / N 2g: "+k+" / N 2d: "+v);V();2f 1D};',62,228,'|||||||||jQuery|||var|entry|single|css||bs_report_button||text|rDamage|function|err|td|myPersBox||ranks|attr|MyTable|CHTable2|http|dmgTotal|alert|floor|formName|tr|SERVER_DATA|target|Math|unsafeWindow|profileUrl|value|href|str|strong|message|catch|try|BHTable|Damage|substr|id|form|appendTo|document|large_sidebar|click|getData|military_unit|donate|title|path||trim||method||||key||reportButton|opacity|citIDArr|if|class|reportHandler|each|parseFloat|bind|Report|eday|division|rankl|append|length|rank_icon|name|val|addForm|fightingside10|battle0|currentregion10|time|hits0|user_info|citName|kills|parseInt|hitq7|url|false|params|005|level|400|bround|createElement|en|user_avatar|location|user_section|userLink|0px|www|bs_last_report|font|lastButton|gt|height|hover|25px|total_damage|small||erepublik||reportEndHandler|||lastIndexOf||||close_bstats|profile|jQueryreportButton2|Total|jQueryreportButton|return|Runda|damage_aligner|image|com|lt|background|Raport|blueDomination|header_top|citID|erpk_time|split|URLGoogleForm|sendToSpread|window|locAll|header|battleId|else|items|economy|rankar|original|citizen|typeof|fighter_skill|undefined|blue_domination|countryId|zoneId|toString|pathname|parent|user_level|replace|encodeURIComponent|pvp_header|h2|zoneElapsedTime|null|action|post|display|instanceof|Array|send|true|||new|XMLHttpRequest|open|GET|FFFFFF|input|bs_report_td2|bs_report_td|right|15px|top|createReportButtons|color|type|hidden|_|body|Submit|submit|333333|shadow|5px|VERSIONo|1px|battle_end|find|this|battle_loader|250px|padding|left|float|block|daily_order|11px|size|line|weight|bold'.split('|')))

var top5ABH = new Array(4);
var top5DBH = new Array(4);

function str_replace(str, oldstr, replacestr) {
  return str.split(oldstr).join(replacestr);
}

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('L 18(B,C){$j(\'#2L\').1h();$j(\'#2K\').1h()}L 2v(32){$j(\'#2X\').1h()}L 2w(2k){$j(\'#2f\').1h();$j(\'h#1a\').2S(\'<h K="2f">\'+\'<h 2l="2u" N="20:J"><1s 2l="1p"><u><Z>m.y.t.o.t.a.l</Z><Z><b>k.i.l.l.s</b></Z><Z>2T</Z></u>\'+2k+\'</1s></h>\'+\'<h N="2D:2R;2c-H:12;H:12;"></h></h>\')}L 1D(){x(S c.1j==\'T\'){2p.2A(1D,2G)}19{$j=c.1j;2q()}}1D();L U(2j){1M 2j.24().2F(/(\\d)(?=(\\d\\d\\d)+(?!\\d))/g,"$1.")}L 2q(){x(S c==\'T\'){c=2p}c.1j.2W.2M=2Z;7 26=\'<N 31="29/O"> \'+\'h.1p { F: 1w; H: 30; 1b: 1o 2z #2x; 1b-1y: 15; 1v: 2V; 2t-M: #2y; } \'+\'h.2U { F: 1w; H: 2N; 1b: 1o 2z #2x; 1b-1y: 15; 1v: 1o 1u 1u; 2t-M: #2y; } \'+\'h.2u { F: 1w; H: 2d; 1b-1y: 15; 1v: 1o 1u 1u; } \'+\'1s.1p { 16: 0; 1v: 2Q; F: 2O%; 2P-2o: 2e; 29-2Y: J; } \'+\'1s.1p u { H: 2e; 2c-H: 2H;} \'+\'#1c, #1e, #1q, #1a { M: #Y; } \'+\'#1c a, #1e a, #1q a, #1a a { M: #Y; }\'+\'#1c a:1x, #1e a:1x, #1q a:1x, #1a a:1x { M: #2I; } \'+\'#2C {16-W: 12; 16-J: 12; 16-2J: 12; 1d: 2E;}\'+\'#2B{W:36 !1g; J:3B !1g;}\'+\'#1c v,#1e v{20:1W !1g; 16:12;}\'+\'.3v{z-X:22 !1g;}\'+\'</N>\';$j(\'3w\').1Z(26);7 1B=$j(\'h#3u\');1B.3t(\'<h K="1c" N="z-X:21; 1d: 1i; W: 2b; J: 3q; F: 1A; R: 0.9;"></h>\'+\'<h K="1q" N="z-X:1; 1d: 1i; W: 3r; J: 28; F: 1A; H: 3z; R: 0.8;"></h>\'+\'<h K="1a" N="z-X:1; 1d: 1i; W: 3s; J: 28; F: 1w; H: 2d; R: 0.8;"></h>\');1B.1Z(\'<h K="1e" N="z-X:21; 1d: 1i; W: 2b; J: 3y; F: 1A; R: 0.9;"></h>\');$j(\'#3C\').O({\'R\':\'1\',\'M\':\'#Y\'});$j(\'#3A\').O({\'R\':\'1\',\'M\':\'#Y\'});$j(\'b.1X\').O({\'F\':\'25\'});$j(\'b.2g\').O({\'F\':\'25\'});$j(\'b.1X 1V\').O({\'1W\':\'15\',\'R\':\'1\',\'M\':\'#Y\'});$j(\'b.2g 1V\').O({\'J\':\'15\',\'R\':\'1\',\'M\':\'#Y\'});$j(\'#33\').O({\'z-X\':\'3\'});$j(3D).3E(L(){3x(c.3o);c.3a=1});$j("3b").3c(L(e,2m,2r){x(2r.39.38(\'/34-f/\')>-1&&c.r.35!=1){7 B=c.r.2h;7 C=c.r.2i;x(c.r.1S){B=c.r.2i;C=c.r.2h}7 q=c.r.3p;7 2n=c.r.1n;7 6=37("("+2m.3d+")");7 10=6[\'f\'][\'3e\'][0][c.r.1n];x(S 6[\'f\'][\'1k\'][q]==\'T\'){7 1C="0"}19{7 1C=6[\'f\'][\'1k\'][q][2n][0][\'V\']}7 1z=6[\'f\'][\'1k\'][0][c.r.1n];x(S 6[\'f\'][\'1k\'][0][c.r.1n]==\'T\'){7 2s=1j("#3l .3m .3n");7 1f=2s.3k("3j");7 1L=\'<u><5></5><5><b>0</b></5><5><v>0</v></5><5><p>0</p></5></u>\'}19{7 1L=\'<u><5></5><5><b>\'+1z[0].1r+\'</b></5><5><v>\'+U(1z[0].V)+\'</v></5><5><p>\'+1C+\'</p></5></u>\'}7 1N=\'17: <14 K="1m" 2o="1">\'+\'<P 1l="1" \'+(c.r.n==1?\'Q="Q"\':\'\')+\'>17 I</P><P 1l="2" \'+(c.r.n==2?\'Q="Q"\':\'\')+\'>17 3f</P><P 1l="3" \'+(c.r.n==3?\'Q="Q"\':\'\')+\'>17 3g</P><P 1l="4" \'+(c.r.n==4?\'Q="Q"\':\'\')+\'>17 3h</P>\'+\'</14>\';1t(7 i=0;i<10.1P;i++){1N+=\'<u><5><a 1K="1J" 1F="1E://1G.1H.1R/1I/1Q/1T/\'+6.11[10[i].13].K+\'">\'+6.11[10[i].13].1f+\'</a></5><5>\'+10[i].1r+\'</5><5><v>\'+U(10[i].V)+\'</v></5></u>\'}2v(1N);2w(1L);A[0]=\'\';A[1]=\'\';A[2]=\'\';A[3]=\'\';G[0]=\'\';G[1]=\'\';G[2]=\'\';G[3]=\'\';7 E=$j(\'14#1m\').1Y();x(S 6[\'f\'][\'w\']==\'T\'){1M}x(S 6[\'f\'][\'w\'][q]==\'T\'){1M}1t(7 i=0;i<4;i++){7 n=(i+1).24();7 1O=0;7 1U=0;x(S 6[\'f\'][\'w\'][q][n][B]!=\'T\'){1t(7 j=0;j<6[\'f\'][\'w\'][q][n][B].1P;j++){A[i]+=\'<u><5><a 1K="1J" 1F="1E://1G.1H.1R/1I/1Q/1T/\'+6.11[6[\'f\'][\'w\'][q][n][B][j].13].K+\'">\'+6.11[6[\'f\'][\'w\'][q][n][B][j].13].1f+\'</a></5><5>\'+6[\'f\'][\'w\'][q][n][B][j].1r+\'</5><5><v>\'+U(6[\'f\'][\'w\'][q][n][B][j].V)+\'</v></5></u>\';1O+=D(6[\'f\'][\'w\'][q][n][B][j].V)}A[i]+=\'<u><5>27 2a</5><5>--</5><5><v>\'+U(1O)+\'</v></5></u>\'}x(S 6[\'f\'][\'w\'][q][n][C]!=\'T\'){1t(7 j=0;j<6[\'f\'][\'w\'][q][n][C].1P;j++){G[i]+=\'<u><5><a 1K="1J" 1F="1E://1G.1H.1R/1I/1Q/1T/\'+6.11[6[\'f\'][\'w\'][q][n][C][j].13].K+\'">\'+6.11[6[\'f\'][\'w\'][q][n][C][j].13].1f+\'</a></5><5>\'+6[\'f\'][\'w\'][q][n][C][j].1r+\'</5><5><v>\'+U(6[\'f\'][\'w\'][q][n][C][j].V)+\'</v></5></u>\';1U+=D(6[\'f\'][\'w\'][q][n][C][j].V)}G[i]+=\'<u><5>27 2a</5><5>--</5><5><v>\'+U(1U)+\'</v></5></u>\'}}x(c.r.1S==23)18(G[D(E)-1],A[D(E)-1]);19 18(A[D(E)-1],G[D(E)-1])}$j(\'14#1m\').3i(L(){7 E=$j(\'14#1m\').1Y();x(c.r.1S==23)18(G[D(E)-1],A[D(E)-1]);19 18(A[D(E)-1],G[D(E)-1])})})}',62,227,'|||||td|bh|var|||||unsafeWindow|||stats||div||||||division|||zone|SERVER_DATA|||tr|strong|current|if|||top5ABH|att|def|Number|myDivision|width|top5DBH|height||left|id|function|color|style|css|option|selected|opacity|typeof|undefined|digits|damage|top|index|fff|th|history|fightersData|0px|citizen_id|select|5px|margin|Division|bhStats|else|myPersBox|border|myStatBoxL|position|myStatBoxR|name|important|remove|absolute|jQuery|personal|value|BHdivision|countryId|1px|BHTable|myOverBox|kills|table|for|3px|padding|180px|hover|radius|mydmg|200px|content|Rdmg|GM_wait|http|href|www|erepublik|en|_blank|target|MyPers|return|top5HIST|aBHTotal|length|citizen|com|mustInvert|profile|dBHTotal|em|right|pdomi_left|val|append|float|||false|toString|67px|styles|Total|285px|text|Damage|375px|line|20px|10px|MyTable|pdomi_right|invaderId|defenderId|number|pers|class|res|side|size|window|letsJQuery|opt|userLink|background|CHTable2|histStats|myhistStats|000|262620|solid|setTimeout|change_weapon|multihit_start|clear|relative|replace|200|12px|0dd1ff|bottom|BHTableR|BHTableL|off|100px|100|font|2px|both|html|Influence|CHTable|6px|fx|OOTable|align|true|85px|type|hist|drop_part|battle|onlySpectator|90px|eval|indexOf|url|shootLockout|body|ajaxSuccess|responseText|overall|II|III|IV|change|title|attr|large_sidebar|user_section|user_avatar|globalSleepInterval|zoneId|18px|250px|700px|prepend|pvp|allies_tooltip|head|clearInterval|540px|110px|red_domination|150px|blue_domination|document|ready'.split('|')))

var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
		    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
		    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
			    		GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
			    		newversion = document.createElement("div");
			    		newversion.setAttribute('id', 'gm_update_alert');
			    		newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			          		document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			    	}
	    		}
		});
	}
