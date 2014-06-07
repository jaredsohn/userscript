scr_meta=<><![CDATA[
// ==UserScript==
// @name	Food Smileys For Orkut By Sreejan
// @version	1.00
// @author	Sreejan Sur :P
// @namespace	TEAM BLAKUT
// @description	Use the animated smileys(for Orkut only) in your ScrapBook and HTML community Forums. Just click on the smiley to insert. Enjoy...
// @include        http://*.orkut.*/*Scrapbook*
// @include        http://*.orkut.*/*CommMsgs*
// @include        http://*.orkut.*/*CommMsgPost*
// ==/UserScript==
]]></>;

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
smileyarr["Appetit_9"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGBC-IptI/AAAAAAAAAeY/-Kop6caneto/Appetit_9.gif";
smileyarr["Appetit_8"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGCgKmKTI/AAAAAAAAAec/sBIc1Uocvlk/Appetit_8.gif";
smileyarr["Appetit_7"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGDTUgxxI/AAAAAAAAAeg/ODU4mlOm8Yc/Appetit_7.gif";
smileyarr["Appetit_6"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHGEMg-pGI/AAAAAAAAAek/j5lBbtGH3SM/Appetit_6.gif";
smileyarr["Appetit_5"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHGEzr_8DI/AAAAAAAAAeo/DTr5AKHtsS8/Appetit_5.gif";
smileyarr["Appetit_46"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHGF3aT91I/AAAAAAAAAes/dKeWiGQP5GQ/Appetit_46.gif";
smileyarr["Appetit_45"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGGlMFIQI/AAAAAAAAAew/n2XKBH5tdY0/Appetit_45.gif";
smileyarr["Appetit_44"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGH5O-opI/AAAAAAAAAe0/XccKGZvwDMw/Appetit_44.gif";
smileyarr["Appetit_43"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGI34NlgI/AAAAAAAAAe4/6CIIt2bWNxU/Appetit_43.gif";
smileyarr["Appetit_42"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGJoCL3mI/AAAAAAAAAe8/umwlRbgesQM/Appetit_42.gif";
smileyarr["Appetit_41"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGKSeK3QI/AAAAAAAAAfA/dTg4urtC1SA/Appetit_41.gif";
smileyarr["Appetit_40"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGLMQFPkI/AAAAAAAAAfE/qJGbVe8NQDM/Appetit_40.gif";
smileyarr["Appetit_4"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGLu0HpbI/AAAAAAAAAfI/NkkuDV2Wkvc/Appetit_4.gif";
smileyarr["Appetit_39"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGMkTLtII/AAAAAAAAAfM/4Ly3DD6r9Pg/Appetit_39.gif";
smileyarr["Appetit_38"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGNHMEOvI/AAAAAAAAAfQ/PcU8Efa3M7o/Appetit_38.gif";
smileyarr["Appetit_37"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGOIdvPaI/AAAAAAAAAfU/o2LTvhQgE8k/Appetit_37.gif";
smileyarr["Appetit_36"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGOtKxp9I/AAAAAAAAAfY/wmQD07WQz8U/Appetit_36.gif";
smileyarr["Appetit_35"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGPc4SknI/AAAAAAAAAfc/JaubELbIUs4/Appetit_35.gif";
smileyarr["Appetit_34"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGP7aEqtI/AAAAAAAAAfg/4V72bLRpbNs/Appetit_34.gif";
smileyarr["Appetit_33"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHGQdoFYDI/AAAAAAAAAfk/7jGTYleQq8M/Appetit_33.gif";
smileyarr["Appetit_32"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGQ8e-ReI/AAAAAAAAAfo/mEswS_HY4fM/Appetit_32.gif";
smileyarr["Appetit_31"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGRhHb0PI/AAAAAAAAAfs/JkoHfWhFZ4E/Appetit_31.gif";
smileyarr["Appetit_30"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGS0tWF2I/AAAAAAAAAfw/ieD6MIbYrvM/Appetit_30.gif";
smileyarr["Appetit_3"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGTWuWP1I/AAAAAAAAAf0/P_zMSiUhWjk/Appetit_3.gif";
smileyarr["Appetit_29"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGT3EmZvI/AAAAAAAAAf4/KuoTMaAcs_E/Appetit_29.gif";
smileyarr["Appetit_28"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGUfoUCpI/AAAAAAAAAf8/8fM9w_kqc2g/Appetit_28.gif";
smileyarr["Appetit_27"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGU7jk5JI/AAAAAAAAAgA/RnQb1puawuE/Appetit_27.gif";
smileyarr["Appetit_26"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGVpbKC_I/AAAAAAAAAgE/ZWhIXlqcXCs/Appetit_26.gif";
smileyarr["Appetit_25"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGWDcTXWI/AAAAAAAAAgI/Fs1GZd_ro3E/Appetit_25.gif";
smileyarr["Appetit_24"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGWZEQFFI/AAAAAAAAAgM/RJR-4jQIsSY/Appetit_24.gif";
smileyarr["Appetit_23"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGXYxLCSI/AAAAAAAAAgQ/FNHyR8ZW-1s/Appetit_23.gif";
smileyarr["Appetit_22"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHGX60PbNI/AAAAAAAAAgU/vm_qw8M5tEE/Appetit_22.gif";
smileyarr["Appetit_21"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHGYpUguOI/AAAAAAAAAgY/8_RPPXCN1rk/Appetit_21.gif";
smileyarr["Appetit_20"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGZMLLhxI/AAAAAAAAAgc/QXQ3TQipdsw/Appetit_20.gif";
smileyarr["Appetit_2"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGZ-LujiI/AAAAAAAAAgg/MzKWcQ6Nbv0/Appetit_2.gif";
smileyarr["Appetit_19"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGbS9oFtI/AAAAAAAAAgk/lfFjPr4rfjY/Appetit_19.gif";
smileyarr["Appetit_18"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdHGcz9vhDI/AAAAAAAAAgo/vKKc554FShw/Appetit_18.gif";
smileyarr["Appetit_17"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGde1jjpI/AAAAAAAAAgs/jJbwsWe18S0/Appetit_17.gif";
smileyarr["Appetit_16"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGeF8b5jI/AAAAAAAAAgw/QWcdsvYrL0Q/Appetit_16.gif";
smileyarr["Appetit_15"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGesvzRrI/AAAAAAAAAg0/MW7ygfcLOJ8/Appetit_15.gif";
smileyarr["Appetit_14"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGfIZXoaI/AAAAAAAAAg4/V8gH884B8hc/Appetit_14.gif";
smileyarr["Appetit_13"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGgTVaLbI/AAAAAAAAAg8/kizoN_9529Y/Appetit_13.gif";
smileyarr["Appetit_12"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGhhPPpuI/AAAAAAAAAhA/T35ssaBHkds/Appetit_12.gif";
smileyarr["Appetit_11"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGiAfZkiI/AAAAAAAAAhE/n7s5mRP_GNU/Appetit_11.gif";
smileyarr["Appetit_10"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdHGjMGdEGI/AAAAAAAAAhI/CBPNT85r1is/Appetit_10.gif";
smileyarr["Appetit_1"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdHGjj5yClI/AAAAAAAAAhM/jb3Dv2x6cYI/Appetit_1.gif";
smileyarr["Appetit"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdHGkNyDlAI/AAAAAAAAAhQ/S2EtXGbNA24/Appetit.gif";
	

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// Auto Updator
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '45537', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();