scr_meta=<><![CDATA[
// ==UserScript==
// @name	Sreejan Emoticons V2
// @version	2.00
// @author	Sreejan Sur :P
// @namespace	TEAM BLAKUT
// @description	Use the animated emoticons(for Orkut only) in your ScrapBook and HTML community Forums. Just click on the emoticon to insert. Enjoy...
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
smileyarr["smiley_96"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYiZJdugI/AAAAAAAAAX0/SpJ3yE2xs0U/smiley_96.gif";
smileyarr["smiley_95"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYjO2TiTI/AAAAAAAAAX4/LE7S-_C-12E/smiley_95.gif";
smileyarr["smiley_94"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYj21xNKI/AAAAAAAAAX8/EUjTD0tsk-M/smiley_94.gif";
smileyarr["smiley_93"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGYkqcL1hI/AAAAAAAAAYA/8Zp1FZD-1tM/smiley_93.gif";
smileyarr["smiley_92"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYlLeiAiI/AAAAAAAAAYE/y19tZF_dTxo/smiley_92.gif";
smileyarr["smiley_91"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYlwJJ2bI/AAAAAAAAAYI/RGvzC3QZ2Bc/smiley_91.gif";
smileyarr["smiley_90"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYmXptPFI/AAAAAAAAAYM/GEitt4aruUI/smiley_90.gif";
smileyarr["smiley_89"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYnNsWyYI/AAAAAAAAAYQ/T4zgA2jZutg/smiley_89.gif";
smileyarr["smiley_88"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYn0Vp7zI/AAAAAAAAAYU/W4y-bn13yNo/smiley_88.gif";
smileyarr["smiley_87"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGYogo_x9I/AAAAAAAAAYY/10IS7CWhhEw/smiley_87.gif";
smileyarr["smiley_86"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYpPh_mfI/AAAAAAAAAYc/qh3Z-5XmEuM/smiley_86.gif";
smileyarr["smiley_85"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYp9U9xrI/AAAAAAAAAYg/QllnUfmP6z4/smiley_85.gif";
smileyarr["smiley_84"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYql9UXuI/AAAAAAAAAYk/Sodo0ZChaF8/smiley_84.gif";
smileyarr["smiley_83"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYrW83PEI/AAAAAAAAAYo/V4Imwz2Ir1U/smiley_83.gif";
smileyarr["smiley_82"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYsHrTdSI/AAAAAAAAAYs/Kq0gy4aO6PA/smiley_82.gif";
smileyarr["smiley_81"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYtSY9bsI/AAAAAAAAAYw/GBb_QyHuRMw/smiley_81.gif";
smileyarr["smiley_80"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGYu9y1yeI/AAAAAAAAAY0/4gls5e5y1hQ/smiley_80.gif";
smileyarr["smiley_79"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGYv94-PtI/AAAAAAAAAY4/srrLd9qfqiY/smiley_79.gif";
smileyarr["smiley_78"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYxKa_gDI/AAAAAAAAAY8/iHCkJYUpdh0/smiley_78.gif";
smileyarr["smiley_77"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGYyDZLNlI/AAAAAAAAAZA/Jw0iFQzUen0/smiley_77.gif";
smileyarr["smiley_76"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGYzFiOIpI/AAAAAAAAAZE/d7iz5OgbE94/smiley_76.gif";
smileyarr["smiley_75"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY0JX0mZI/AAAAAAAAAZI/6dDHhPk_T5A/smiley_75.gif";
smileyarr["smiley_74"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGY1Hy_fyI/AAAAAAAAAZM/LDCW9XiF0cU/smiley_74.gif";
smileyarr["smiley_73"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY18XhW_I/AAAAAAAAAZQ/IeZXalW5F-0/smiley_73.gif";
smileyarr["smiley_72"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY27a174I/AAAAAAAAAZU/CpfLhu9vbV8/smiley_72.gif";
smileyarr["smiley_71"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGY3-wQ3jI/AAAAAAAAAZY/022PyResiBw/smiley_71.gif";
smileyarr["smiley_70"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGY44WKRLI/AAAAAAAAAZc/Uon6NRK6BfQ/smiley_70.gif";
smileyarr["smiley_69"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGY53eInOI/AAAAAAAAAZg/LofojkD0tLI/smiley_69.gif";
smileyarr["smiley_68"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGY6g90M3I/AAAAAAAAAZk/_9bANfDJ9wo/smiley_68.gif";
smileyarr["smiley_67"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY7bt7ZNI/AAAAAAAAAZo/HXfyu2ZMudg/smiley_67.gif";
smileyarr["smiley_66"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGY8edH8oI/AAAAAAAAAZs/wf5bvoyiAuM/smiley_66.gif";
smileyarr["smiley_65"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGY9xI_ygI/AAAAAAAAAZw/ZBgIgk-pFMA/smiley_65.gif";
smileyarr["smiley_64"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGY_NrlXOI/AAAAAAAAAZ0/-BPls2VGPo4/smiley_64.gif";
smileyarr["smiley_63"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGY_1m6AUI/AAAAAAAAAZ4/GBroo569li4/smiley_63.gif";
smileyarr["smiley_62"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZA9qbHaI/AAAAAAAAAZ8/qh-irc2GcHw/smiley_62.gif";
smileyarr["smiley_61"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZBiDrsdI/AAAAAAAAAaA/qMTSxUdK_lc/smiley_61.gif";
smileyarr["smiley_60"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZCj0icQI/AAAAAAAAAaE/fWaXYOnOmsg/smiley_60.gif";
smileyarr["smiley_59"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZDfBv1zI/AAAAAAAAAaI/5TzjJRIENmw/smiley_59.gif";
smileyarr["smiley_58"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZD1U9GYI/AAAAAAAAAaM/XLEBVcUOoT0/smiley_58.gif";
smileyarr["smiley_57"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZE5-fv3I/AAAAAAAAAaQ/hZpKukDCoCk/smiley_57.gif";
smileyarr["smiley_56"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZF1UsKzI/AAAAAAAAAaU/Wxe1hYNVI3A/smiley_56.gif";
smileyarr["smiley_55"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZG19Cy0I/AAAAAAAAAaY/41hV4YKtuT8/smiley_55.gif";
smileyarr["smiley_54"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZIPRWONI/AAAAAAAAAac/fkub6x1HHjw/smiley_54.gif";
smileyarr["smiley_53"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZI2xDGdI/AAAAAAAAAag/e5hfIhVItGs/smiley_53.gif";
smileyarr["smiley_52"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZJ9MZrNI/AAAAAAAAAak/ZuT5noC6VQM/smiley_52.gif";
smileyarr["smiley_51"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZKuvgolI/AAAAAAAAAao/3ICVcjbmHn8/smiley_51.gif";
smileyarr["smiley_50"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZL-rdTEI/AAAAAAAAAas/6U1fGLYLL-4/smiley_50.gif";
smileyarr["smiley_49"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZNSHaYYI/AAAAAAAAAaw/f_obe9FKx8g/smiley_49.gif";


	

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
 id: '45528', // Script id on Userscripts.org
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
