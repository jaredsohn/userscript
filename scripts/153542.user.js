// ==UserScript==
// @author   	xxxxExxxx 
// @name        zzzzEzzzz-Firefox
// @namespace   yyyyEyyyy
// @version		12
// @include		http://www.erepublik.com/*/military/battlefield/*
// @description zzzzEzzzz-Firefox
// @downloadURL http://userscripts.org/scripts/source/153542.user.js
// @updateURL	http://userscripts.org/scripts/source/153542.meta.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

// Firefox 12 = Rezolvat bug la divizie si fereastra de report.
// Firefox 11 = Rezolvat bug la hits.
// Firefox 10 = Adaugat buton de REPORT in fereastra de stats, in cazul in care se termina campania si nu s-a trimis la timp damage-ul. S-au scos ferestrele cu topurile. In fereastra de report apare damage-ul pe runda si damage-ul total, pentru verificare.
// Firefox 9 = Get data from battle-stats
// Firefox 8 = Solved cheats for dmg,side,region
// Firefox 7 = Solved bugs after template change
// Firefox 6 = Solved bug if My Damage is 0
// Firefox 5 = Added Daily Order tracking

var VERSIONo = "Firefox 12";
scriptName='zzzzEzzzz-Firefox';
scriptId='153542';
scriptVersion=12;
scriptUpdateText='Rezolvat bug la divizie si fereastra de report.';

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3 1C=z;3 r="1o";3 e="n://t.k.b/y/1d?f=1o#1l=0";3 c="n://t.k.b/y/1d?f=1y#1l=0";3 1I=[\'1x\',\'1w\'];3 24=[\'1Y\',\'1X\'];3 1v=P.m;3 1W=1v.g;$=7=7.1J(21);3 1N=7(\'.1Q a\').Q();3 1R=7("#1P").Q();3 H={1s:4(){6{Z:"I",10:"1O 1K 1L 1M 1T 1 1U 22 Y a j.",X:"S 1a 14 11 W a j?",U:"23",V:"20 1Z 1V. S 1a 14 11 W a j?",19:"17",16:"13 T",j:"1F",15:"1G",N:"1H 1E 1D. 1z, 1A Y 1B j 1S."}},2c:4(){6{Z:"2w",10:"2x L 2y 2z 2v 1 2u 2q a 2r J.",X:"12 L 18 J?",U:"R",V:"2s s-a 2t. 12 L 18 J?",19:"17",16:"13 T",j:"2B",15:"25 R",N:"2G 2F. 2C 2D 2E."}}};F.C.2A=4(o){6 d.E(o+"$")==o};F.C.K=4(o){6 d.E("^"+o)==o};F.C.2o=4(){6 d.G(/^[\\s\\O]+/,"").G(/[\\s\\O]+$/,"")};3 2b=4(){;3 s=q[0];1q(3 i=q.g-1;i>=0;i--){;s=s.G(2p 2d(\'\\\\{\'+i+\'\\\\}\',\'2a\'),q[i+1])};6 s};3 29=(4(){;3 m=x.P.m;3 D=m.1b(".b/")+5;3 1n=m.1b("/",D+1);3 1r=m.M(D,1n);3 h=H[1r];6 h!=z?h():H["1s"]()})();(4(){p(e.K("n://t.k.b/")){;3 l=e.u("#");3 r=e.M(e.u("f=")+8,(l>0?l:e.g));e="n://1h.k.b/y/1f?1m=I&f="+r+"&1t"}})();(4(){p(c.K("n://t.k.b/")){;3 l=c.u("#");3 r=c.M(c.u("f=")+8,(l>0?l:c.g));c="n://1h.k.b/y/1f?1m=I&f="+r+"&1t"}})();7=$=(4(w){;p(x.28.2e.E(/2f/)){;3 v=1k.2l("v");v.2m("1g","6 x;");w=v.1g()};6 w.7})(w);4 2n(){;1q(3 i=0;i<q.g;i++){;3 h=7(q[i]);p(h.g)6 h};6 z};4 2k(){;3 1p=d;3 $A=z;d.2j=4(){;$A=7("#2g").2h(4(){1p.B()})};d.2i=4(9){;$9=7(9);$9.1i("2H",(7(x).1j()-$9.1j())/2);$9.1i("27",(7(1k).1u()-$9.1u())/2);$9.1c(1e);$A.1c(1e);6 $9};d.B=4(9){;$A.B();7(".26").B();p(9)6 7(9)}};',62,168,'|||var|function||return|jQuery||popup||com|URLMyForm|this|FORM_URL|formkey|length|result||report|google|lastIndex|href|https|str|if|arguments|formKey||docs|lastIndexOf|div|unsafeWindow|window|spreadsheet|null|mask|hide|prototype|startIndex|match|String|replace|LOCALE|en_US|raport|startsWith|sa|substring|report_failed|xA0|location|html|Raport|Do|Status|button_send|round_end|send|send_report|sending|locale|no_damage|to|Vrei|DO|want|report_title|DO_status|Damage|trimiti|damage|you|indexOf|fadeIn|viewform|1000|formResponse|onclick|spreadsheets|css|height|document|gid|hl|endIndex|dGhVWVpPbkVRWVphSTIwVnktVWYwZ2c6MQ|self|for|localeCode|en|ifq|width|pageURL|yy|xx|dGNEWEFCS3RFMGE1M1R1UUtLWG4yRmc6MQ|Please|try|your|military_unit|occured|error|REPORT|UM|Unknow|UMs_full|noConflict|must|deal|at|nickname|You|select_zone|user_info|round|again|least|kill|finished|pageURLSize|FAR|SP|has|Round|true|before|Report|UMs_abrev|Trimite|bs_window|left|navigator|resource|gm|formatString|ro|RegExp|vendor|Google|bs_popups_mask|click|show|initialize|PopupManager|createElement|setAttribute|selectFirst|trim|new|pentru|trimite|Runda|terminat|inamic|putin|ro_RO|Trebuie|omori|cel|endsWith|RAPORT|Te|rugam|reincearca|necunoscuta|Eroare|top'.split('|')))
	
	function BattlePage() {

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('9 11=Q;9 f=1a;9 1c={1v:"3.0.5",1f:"3.1.5",1j:"3.2.5",1n:"3.4.5",1u:"3.6.5",1k:"3.8.5",1l:"3.10.5",1m:"3.12.5",1i:"3.14.5",1e:"3.16.5",1g:"3.18.5",1h:"3.20.5",1o:"3.22.5",1w:"3.24.5",1x:"3.25.5",1y:"3.27.5",1z:"3.28.5",1d:"3.29.5",1q:"3.1r.5",1s:"3.1A.5"};9 V={};p 7(H,r){9 n=H+"{";Y(9 t T r){n+=(t+":"+r[t].Z()+";")}n+="}";f.19+=n}9 15=p(){1b(17.X)};Q.U=p(){f=C.W("1p");f.1K("2i","l/2h");7(".L",{"e":"2f","O":"S","i":"2j","g":"2m"});7(".L:F",{"d-s":"q"});7(".G",{"l-21":"1Z","a-c":"#23","k-h":"b b b b","c":"#1B","d-B":"2c","d-s":"q","2b":"b j b w","l-2d":"2a(0, 0, 0, 0.2) 0 -26 0","u-i":"1Y","v":"2e","g":"-2l",});7(".G:F",{"a-c":"#2n",});7("#2k",{"u":"0","z-K":"2g","a-c":"#1W","v":"o","I":"0.8","-N-I":".1I","e":"y","g":"J","i":"J","P":"E%","R":"E%","l-D":"1J","1X-D":"1H"});7("#1G",{"e":"y","v":"o","z-K":"1C","d-B":"1D","d-s":"q","R":"1E","-1F-k-h":"j","-N-k-h":"j","k-h":"j","a-e":"-1L -1M","P":"1T"});7("#1U",{"u-i":"1V"});7("#1S",{"O":"S","e":"1R","g":"-w","m":"-w"});7("#1N",{"m":"1O"});7("#1P",{"A":"m","a-M":"o","c":"#x"});7("#1Q",{"A":"m","a-M":"o","c":"#x"});C.13.1t(f)};',62,148,'|||entry||single||addStyle||var|background|5px|color|font|position|customCss|top|radius|left|10px|border|text|right|newStyle|none|function|bold|properties|weight|property|margin|display|8px|000000|fixed||float|size|document|align|100|hover|bs_report_button|selector|opacity|0px|index|bs_last_report|image|moz|cursor|width|this|height|pointer|in|initialize|MyFieldsMap|createElement|report_failed|for|toString||self||head||onReportFail||resource||innerHTML|null|alert|fieldsMap|total_dmg|fightingside|name|currentregion|version|hits|time|wall|donate|strenght|damage|extra|style|total_kills|31|daily_order|appendChild|battle|eday|round|um|hitq7|level|32|FFFFFF|30100|14px|300px|webkit|bs_popup_report|middle|80|center|setAttribute|12px|6px|close_bstats|15px|bs_report_pop_dmg|bs_report_pop_dmg2|absolute|bs_close_report|372px|bs_report_pop_send|26px|000|vertical|140px|uppercase||transform||f67777|||1px||||rgba|padding|11px|shadow|block|relative|30000|css|type|240px|bs_popups_mask|200px|65px|333333'.split('|')))
		
		this.createReportObject = function() {

		var rankar={"Recruit":1, "Private":2, "Private *":3, "Private **":4, "Private ***":5,"Corporal":6, "Corporal *":7, "Corporal **":8, "Corporal ***":9, "Sergeant":10,"Sergeant *":11, "Sergeant **":12, "Sergeant ***":13, "Lieutenant":14, "Lieutenant *":15,"Lieutenant **":16, "Lieutenant ***":17, "Captain":18, "Captain *":19, "Captain **":20,"Captain ***":21, "Major":22, "Major *":23, "Major **":24, "Major ***": 25,"Commander":26, "Commander *":27, "Commander **":28, "Commander ***":29, "Lt Colonel":30,"Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35,"Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40,"General ***":41, "Field Marshal":42, "Field Marshal *":43, "Field Marshal **":44, "Field Marshal ***":45,"Supreme Marshal":46, "Supreme Marshal *":47, "Supreme Marshal **":48, "Supreme Marshal ***":49, "National Force":50,"National Force *":51, "National Force **":52, "National Force ***":53, "World Class Force":54, "World Class Force *":55,"World Class Force **":56, "World Class Force ***":57, "Legendary Force":58, "Legendary Force *":59, "Legendary Force **":60,"Legendary Force ***":61, "God of War":62, "God of War *":63, "God of War **":64, "God of War ***": 65, "Recrut":1, "Soldat":2, "Soldat *":3, "Soldat **":4, "Soldat ***":5,"Caporal":6, "Caporal *":7, "Caporal **":8, "Caporal ***":9, "Sergent":10,"Sergent *":11, "Sergent **":12, "Sergent ***":13, "Locotenent":14, "Locotenent *":15,"Locotenent **":16, "Locotenent ***":17, "Capitan":18, "Capitan *":19, "Capitan **":20,"Capitan ***":21, "Maior":22, "Maior *":23, "Maior **":24, "Maior ***": 25,"Comandor":26, "Comandor *":27, "Comandor **":28, "Comandor ***":29, "Lt Colonel":30,"Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35,"Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40,"General ***":41, "Mareșal":42, "Mareșal *":43, "Mareșal **":44, "Mareșal ***":45,"Mareșal Suprem":46, "Mareșal Suprem *":47, "Mareșal Suprem **":48, "Mareșal Suprem ***":49, "Putere Națională":50,"Putere Națională *":51, "Putere Națională **":52, "Putere Națională ***":53, "Putere Mondială":54, "Putere Mondială *":55,"Putere Mondială **":56, "Putere Mondială ***":57, "Luptător de Legendă":58, "Luptător de Legendă *":59, "Luptător de Legendă **":60,"Luptător de Legendă ***":61, "Zeu al Războiului":62, "Zeu al Războiului *":63, "Zeu al Războiului **":64, "Zeu al Războiului ***": 65 };

		eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('X F(w){W w.t().y(/(\\d)(?=(\\d\\d\\d)+(?!\\d))/g,"$1.")}2 v=4("#j .V .U");2 Y=v.q("12");2 11=T.13.R.K.t();2 i,7=4(\'#C\').q(\'z\');i=k(4(\'#L\').6().m().y(/,/g,\'\'));B(N 7==\'S\'||7.O==0){7=4(\'#C\').q(\'10-z\').E(15).m()}1j{7=7.E(15).m()}2 o=1h[7];2 l=F(4("#e #f .h .s r p").6());B(l==0){2 l="0"}2 n=4("#e #f .h .s r p").6();2 D=8.9(8.9((G(o)+5)*(k(i)+x)*0.A)*3);2 1g=8.9(n/D);2 18=8.9(n/((8.9(8.9((G(o)+5)*(k(i)+x)*0.A)))*3));2 1c=a.c[\'I\'];2 1d=a.c[\'I\'];2 1e=4("#j .H b").6();2 1b=a.c[\'1a\'];2 16=4("#17 19").6();2 1f=4("#j .1m .H b").6();2 1k=1l(4("#1i").6());2 14=4("#e #f .h P").6();2 Q=4("#e #f .h .s r b").6();2 M=a.c[\'Z\'];2 J=a.c[\'J\'];2 u=a.c[\'u\'];',62,85,'||var||jQuery||text|ranks|Math|floor|unsafeWindow||SERVER_DATA||myPersBox|MyTable||CHTable2|str|large_sidebar|parseFloat|dmg|trim|dmg2|rankl||attr|td|BHTable|toString|division|userLink|number|400|replace|title|005|if|rank_icon|dmgq6|substr|digits|parseInt|user_level|battleId|fighterCountryId|pathname|fighter_skill|bround|typeof|length|strong|kills|location|undefined|parent|user_avatar|user_section|return|function|profileUrl|zoneId|original|path|href|document|dmgTotal||currentregion10|pvp_header|hits0|h2|countryId|fightingside10|battle0|battleid0|level0|level10|dmgq6hit|rankar|blue_domination|else|blueDomination|encodeURIComponent|user_info'.split('|')))

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$.r({v:"u",s:\'c://9.7.8/d/E/K/\'+2.y(2.x("/")+1),w:"3",t:j,q:h(0){5 e=$(0).g(".R S").3();5 a=Q.P(e);L(a==-1){6=e}N{6=M[a]}$(".U z").4(J.F+": "+6)}});$.r({v:"u",s:\'c://9.7.8/d\',w:"3",t:j,q:h(0){5 f=$(0).g("#T i").3();l=f}});5 0={V:n.m("G"),D:6,I:n.m("H"),C:l,A:o("#B .O .1h b").4(),1p:1q,1r:1o,1n:W,1k:1l,k:o("#1m .1t .1x .k i").4(),1A:1B.1z[\'1y\'],1u:1v("#1w","#1s").4(),p:"c://9.7.8/d/1i/p-13/"+2.y(2.x("/")+1),14:15,12:11,X:Y,Z:10,16:17,1e:1f,1g:1d,1c:18,19:1a,1b:1j};',62,100,'data||profileUrl|html|text|var|military_unit|erepublik|com|www|test||http|en|raw|daily|find|function|strong|false|eday|unit_order|attr|userLink|jQuery|donate|success|ajax|url|async|GET|type|dataType|lastIndexOf|substr|h2|level|large_sidebar|daily_order|um|citizen|report_title|title|href|profilelink|resource|profile|if|UMs_abrev|else|user_info|indexOf|UMs_full|one_newspaper|span|orderContainer|heading|name|dmgq6|hits|hits0|extra|division|bround|round|items|strenght|str|fightingside|fightingside10|battleid0|total_dmg|dmgTotal|total_kills|battleid|VERSIONo|currentregion|currentregion10|version|user_level|economy|kills|battle|battle0|header|hitq7|dmgq6hit|damage|dmg|dq6hit|blue_domination|header_top|wall|selectFirst|blue_domination_f|erpk_time|zoneElapsedTime|SERVER_DATA|time|unsafeWindow'.split('|')))

jQuery("#pvp_header .crowns").each(function() {
                data.round += parseInt(jQuery(this).attr("class").split(" ")[1].substr(2));
        });
       
        return data;
};
		
		this.isDamageValid = function(reportObject) {
        return !isNaN(reportObject.damage) && reportObject.damage > 0;
};
		this.isTDamageValid = function(reportObject) {
        return !isNaN(reportObject.total_dmg) && reportObject.total_dmg > 0;
};

		
		this.sendReportObject = function(data) {
			if(data == null) data = self.createReportObject();
			
//			if(!self.isDamageValid(data)) {
//				alert(resource.no_damage);
//				return false;
//			}
			
			var report = {pageNumber: "0", backupCache: "", submit: "Submit"};
			for(var fieldName in fieldsMap) {
				report[fieldsMap[fieldName]] = data[fieldName];
			}
			var headers = {"Content-Type": "application/x-www-form-urlencoded"};
			GM_xmlhttpRequest({method: "POST", url: FORM_URL, data: $.param(report), headers: headers, onerror: onReportFail});



			var reportDB = {pageNumber: "0", backupCache: "", submit: "Submit"};
			for(var fieldName in MyFieldsMap ) {
				reportDB[MyFieldsMap[fieldName]] = data[fieldName];
			}
			var Myheaders = {"Content-Type": "application/x-www-form-urlencoded"};
			GM_xmlhttpRequest({method: "POST", url: URLMyForm, data: $.param(reportDB), headers: Myheaders, onerror: onReportFail});
		
		return true;
		};
	}
	
	var lastReport = null;
	var $reportButton = null;
	var battlePage = null;
	var popUpManager = new PopupManager();
	
	var reportHandler = function() {		
	lastReport = battlePage.createReportObject();
		
	if(battlePage.isDamageValid(lastReport)) {
			popUpManager.show("#bs_popup_report").find("#bs_report_pop_dmg").text(lastReport.damage);
			popUpManager.show("#bs_popup_report").find("#bs_report_pop_dmg2").text(lastReport.total_dmg);
	}
//	else {alert(resource.no_damage);}
	else {
		popUpManager.show("#bs_popup_report").find("#bs_report_pop_dmg").text(lastReport.damage);
		popUpManager.show("#bs_popup_report").find("#bs_report_pop_dmg2").text(lastReport.total_dmg);
		}
		
	return false;
	};
	
	var reportEndHandler = function() {	
		if(confirm(resource.round_end)) {
			reportHandler();
		}		
		return false;
	};
	
	var sendLastReport = function() {
		if(battlePage.sendReportObject(lastReport)) {
			$reportButton.css("display", "none");
		}	
		popUpManager.hide();
	};
	
	function createReportDialog() {
		var $reportDialog = jQuery('<div id="bs_popup_report" class="pop enemy_defeated bs_window"> \
			<div class="heading">																										   \
<img id="bs_close_report" alt="Close window" src="http://www.erepublik.com/images/modules/pvp/close_button.png">		   \
<h2>' + resource.report_title + '</h2>																					   \
			</div>                                                                                                                         \
<div class="content" style="margin-left: 30px">                                                                                \
				<div>                                                                                                                      \
<img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">                           \
<strong>' + resource.damage + ' Runda: </strong><big id="bs_report_pop_dmg"></big>										   \
				</div>                                                                                                                     \
			<div>                                                                                                                      \
<img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">                           \
<strong>' + resource.damage + ' Total: </strong><big id="bs_report_pop_dmg2"></big>										   \
				</div>                                                                                                                     \
			</div> 																														   \
<div style="clear: both; height: 1.5em"></div>																				   \
<a title="' + resource.button_send + '" href="#" id="bs_report_pop_send">' + resource.button_send + '</a>					   \
</div>');
		
jQuery("body").append($reportDialog).append('<div id="bs_popups_mask"></div>');
jQuery("#bs_close_report").click(function() { 
popUpManager.hide(); 
return false;
});
		
document.getElementById("bs_report_pop_send").addEventListener("click", sendLastReport, false);
}
	
function createReportButtons() {
$reportButton = jQuery('<a class="bs_report_button" title="Report" href="#">' + resource.report + '!</a>');
$reportButton.appendTo(jQuery("#total_damage")).bind("click", reportHandler);

$reportButton2 = jQuery('<a class="bs_report_button" title="Report" href="#">' + resource.report + '!</a>');
$reportButton2.appendTo(jQuery("#close_bstats").append('</tr><tr><td id="bs_report_td2"></td>')).bind("click", reportHandler);

document.getElementById("total_damage").setAttribute("title", "");
			
var lastButton = '<a class="bs_last_report" href="#">&lt;&lt; Report &gt;&gt;</a>';

jQuery([jQuery("#battle_end"), jQuery("#battle_loader")]).each(function() {
jQuery(this).append(lastButton).find(".bs_last_report").bind("click", reportEndHandler);
});
}

jQuery(document).ready(function() {
	createReportDialog();			
	battlePage = new BattlePage();
	battlePage.initialize();
	popUpManager.initialize();		
	createReportButtons();
	CheckForUpdate();
});
	
var top5ABH = new Array(4);
var top5DBH = new Array(4);

function str_replace(str, oldstr, replacestr) {
  return str.split(oldstr).join(replacestr);
} 
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('L 14(C,G){$j(\'#2O\').1w();$j(\'#2F\').1w()}L 2x(2Y){$j(\'#2W\').1w()}L 2p(29){$j(\'#2m\').1w();$j(\'n#1c\').2X(\'<n K="2m">\'+\'<n 2r="2b" N="2g:J"><1n 2r="1g"><r><13>m.y.t.o.t.a.l</13><13><b>k.i.l.l.s</b></13><13>3o</13></r>\'+29+\'</1n></n>\'+\'<n N="3h:2K;2h-O:Y;O:Y;"></n></n>\')}L 1E(){x(R c.1m==\'S\'){27.2M(1E,20)}1b{$j=c.1m;2a()}}1E();L V(28){1L 28.2y().2D(/(\\d)(?=(\\d\\d\\d)+(?!\\d))/g,"$1.")}L 2a(){x(R c==\'S\'){c=27}c.1m.32.2Q=2Z;7 2d=\'<N 2U="2i/T"> \'+\'n.1g { F: 1o; O: 2V; 1r: 1f 26 #23; 1r-24: 1u; 1q: 2T; 1O-H: #25; } \'+\'n.2S { F: 1o; O: 2R; 1r: 1f 26 #23; 1r-24: 1u; 1q: 1f 1d 1d; 1O-H: #25; } \'+\'n.2b { F: 1o; O: 2f; 1q: 1f 1d 1d; 1O-H: #W; } \'+\'1n.1g { 1a: 0; 1q: 2E; F: 20%; 2C-2v: 2j; 2i-2B: J; } \'+\'1n.1g r { O: 2j; 2h-O: 2N;} \'+\'#19, #15, #1k, #1c { H: #W; } \'+\'#19 a, #15 a, #1k a, #1c a { H: #W; }\'+\'#19 a:1p, #15 a:1p, #1k a:1p, #1c a:1p { H: #2I; } \'+\'#2J {1a-Z: Y; 1a-J: Y; 1a-33: Y; 18: 3b;}\'+\'#3t{Z:35 !1i; J:3u !1i;}\'+\'#19 v,#15 v{2g:1W !1i; 1a:Y;}\'+\'.3r{z-X:22 !1i;}\'+\'</N>\';$j(\'3x\').2k(2d);7 1F=$j(\'n#3B\');1F.3C(\'<n K="19" N="z-X:21; 18: 1j; Z: 1Z; J: 3y; F: 1U; P: 0.9;"></n>\'+\'<n K="1k" N="z-X:1; 18: 1j; Z: 3A; J: 2e; F: 1U; P: 0.8;"></n>\'+\'<n K="1c" N="z-X:1; 18: 1j; Z: 3m; J: 2e; F: 1o; O: 2f;P: 0.8;"></n>\');1F.2k(\'<n K="15" N="z-X:21; 18: 1j; Z: 1Z; J: 3e; F: 1U; P: 0.9;"></n>\');$j(\'#3i\').T({\'P\':\'1\',\'H\':\'#W\'});$j(\'#3f\').T({\'P\':\'1\',\'H\':\'#W\'});$j(\'b.1X\').T({\'F\':\'1V\'});$j(\'b.2c\').T({\'F\':\'1V\'});$j(\'b.1X 2s\').T({\'1W\':\'1u\',\'P\':\'1\',\'H\':\'#W\'});$j(\'b.2c 2s\').T({\'J\':\'1u\',\'P\':\'1\',\'H\':\'#W\'});$j(\'#3g\').T({\'z-X\':\'3\'});$j(3j).3l(L(){3k(c.3d);c.38=1});$j("37").36(L(e,2q,2w){x(2w.39.3a(\'/3c-f/\')>-1&&c.u.3n!=1){7 C=c.u.2n;7 G=c.u.2o;x(c.u.1N){C=c.u.2o;G=c.u.2n}7 q=c.u.3q;7 2u=c.u.1l;7 6=3z("("+2q.3w+")");7 11=6[\'f\'][\'3p\'][0][c.u.1l];x(R 6[\'f\'][\'1h\'][q]==\'S\'){7 1T="0"}1b{7 1T=6[\'f\'][\'1h\'][q][2u][0][\'U\']}7 1S=6[\'f\'][\'1h\'][0][c.u.1l];x(R 6[\'f\'][\'1h\'][0][c.u.1l]==\'S\'){7 2t=1m("#3s .3v .2L");7 1v=2t.2H("2G");7 1M=\'<r><5></5><5><b>0</b></5><5><v>0</v></5><5><p>0</p></5></r>\'}1b{7 1M=\'<r><5></5><5><b>\'+1S[0].1x+\'</b></5><5><v>\'+V(1S[0].U)+\'</v></5><5><p>\'+1T+\'</p></5></r>\'}7 1Q=\'17: <16 K="1s" 2v="1">\'+\'<Q 1e="1" \'+(c.u.h==1?\'M="M"\':\'\')+\'>17 I</Q><Q 1e="2" \'+(c.u.h==2?\'M="M"\':\'\')+\'>17 34</Q><Q 1e="3" \'+(c.u.h==3?\'M="M"\':\'\')+\'>17 2P</Q><Q 1e="4" \'+(c.u.h==4?\'M="M"\':\'\')+\'>17 30</Q>\'+\'</16>\';1t(7 i=0;i<11.1P;i++){1Q+=\'<r><5><a 1R="1I" 1G="1y://1C.1A.1z/1B/1H/1D/\'+6.10[11[i].12].K+\'">\'+6.10[11[i].12].1v+\'</a></5><5>\'+11[i].1x+\'</5><5><v>\'+V(11[i].U)+\'</v></5></r>\'}2x(1Q);2p(1M);E[0]=\'\';E[1]=\'\';E[2]=\'\';E[3]=\'\';A[0]=\'\';A[1]=\'\';A[2]=\'\';A[3]=\'\';7 D=$j(\'16#1s\').2l();x(R 6[\'f\'][\'w\']==\'S\'){1L}x(R 6[\'f\'][\'w\'][q]==\'S\'){1L}1t(7 i=0;i<4;i++){7 h=(i+1).2y();7 1K=0;7 1J=0;x(R 6[\'f\'][\'w\'][q][h][C]!=\'S\'){1t(7 j=0;j<6[\'f\'][\'w\'][q][h][C].1P;j++){E[i]+=\'<r><5><a 1R="1I" 1G="1y://1C.1A.1z/1B/1H/1D/\'+6.10[6[\'f\'][\'w\'][q][h][C][j].12].K+\'">\'+6.10[6[\'f\'][\'w\'][q][h][C][j].12].1v+\'</a></5><5>\'+6[\'f\'][\'w\'][q][h][C][j].1x+\'</5><5><v>\'+V(6[\'f\'][\'w\'][q][h][C][j].U)+\'</v></5></r>\';1K+=B(6[\'f\'][\'w\'][q][h][C][j].U)}E[i]+=\'<r><5>2z 2A</5><5>--</5><5><v>\'+V(1K)+\'</v></5></r>\'}x(R 6[\'f\'][\'w\'][q][h][G]!=\'S\'){1t(7 j=0;j<6[\'f\'][\'w\'][q][h][G].1P;j++){A[i]+=\'<r><5><a 1R="1I" 1G="1y://1C.1A.1z/1B/1H/1D/\'+6.10[6[\'f\'][\'w\'][q][h][G][j].12].K+\'">\'+6.10[6[\'f\'][\'w\'][q][h][G][j].12].1v+\'</a></5><5>\'+6[\'f\'][\'w\'][q][h][G][j].1x+\'</5><5><v>\'+V(6[\'f\'][\'w\'][q][h][G][j].U)+\'</v></5></r>\';1J+=B(6[\'f\'][\'w\'][q][h][G][j].U)}A[i]+=\'<r><5>2z 2A</5><5>--</5><5><v>\'+V(1J)+\'</v></5></r>\'}}x(c.u.1N==1Y)14(A[B(D)-1],E[B(D)-1]);1b 14(E[B(D)-1],A[B(D)-1])}$j(\'16#1s\').31(L(){7 D=$j(\'16#1s\').2l();x(c.u.1N==1Y)14(A[B(D)-1],E[B(D)-1]);1b 14(E[B(D)-1],A[B(D)-1])})})}',62,225,'|||||td|bh|var|||||unsafeWindow|||stats||division||||||div|||zone|tr|||SERVER_DATA|strong|current|if|||top5DBH|Number|att|myDivision|top5ABH|width|def|color||left|id|function|selected|style|height|opacity|option|typeof|undefined|css|damage|digits|fff|index|0px|top|fightersData|history|citizen_id|th|bhStats|myStatBoxR|select|Division|position|myStatBoxL|margin|else|myPersBox|3px|value|1px|BHTable|personal|important|absolute|myOverBox|countryId|jQuery|table|180px|hover|padding|border|BHdivision|for|5px|name|remove|kills|http|com|erepublik|en|www|profile|GM_wait|content|href|citizen|_blank|dBHTotal|aBHTotal|return|MyPers|mustInvert|background|length|top5HIST|target|mydmg|Rdmg|200px|67px|right|pdomi_left|false|375px|100|||000|radius|262620|solid|window|number|pers|letsJQuery|CHTable2|pdomi_right|styles|285px|20px|float|line|text|10px|append|val|MyTable|invaderId|defenderId|myhistStats|res|class|em|userLink|side|size|opt|histStats|toString|Total|Damage|align|font|replace|2px|BHTableR|title|attr|0dd1ff|multihit_start|both|user_avatar|setTimeout|12px|BHTableL|III|off|92px|CHTable|6px|type|85px|OOTable|html|hist|true|IV|change|fx|bottom|II|90px|ajaxSuccess|body|shootLockout|url|indexOf|relative|battle|globalSleepInterval|540px|red_domination|drop_part|clear|blue_domination|document|clearInterval|ready|700px|onlySpectator|Influence|overall|zoneId|allies_tooltip|large_sidebar|change_weapon|150px|user_section|responseText|head|18px|eval|280px|pvp|prepend'.split('|')))	

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