scr_meta=<><![CDATA[
// ==UserScript==
// @name	Sreejan Emoticons V3
// @version	3.00
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
smileyarr["smiley_48"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZZnShGLI/AAAAAAAAAa4/_2gRGgK7gVY/smiley_48.gif";
smileyarr["smiley_47"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZaopI_zI/AAAAAAAAAa8/pbJtPOF9N3Y/smiley_47.gif";
smileyarr["smiley_46"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZcckeIqI/AAAAAAAAAbA/9QnvMqCZVeg/smiley_46.gif";
smileyarr["smiley_45"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZdA4_hEI/AAAAAAAAAbE/enj3wIt0Hlg/smiley_45.gif";
smileyarr["smiley_44"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZeH4Wn1I/AAAAAAAAAbI/8AImzSO0FU8/smiley_44.gif";
smileyarr["smiley_43"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZfck0gEI/AAAAAAAAAbM/t9V2DgzUmTM/smiley_43.gif";
smileyarr["smiley_42"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZgljBCuI/AAAAAAAAAbQ/ftGOExIqsHE/smiley_42.gif";
smileyarr["smiley_41"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZhqJMiEI/AAAAAAAAAbU/Plg91rZe4HU/smiley_41.gif";
smileyarr["smiley_40"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZiNWhM8I/AAAAAAAAAbY/nELqWVeah5I/smiley_40.gif";
smileyarr["smiley_39"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZjc9nvII/AAAAAAAAAbc/pzlGuaMtypE/smiley_39.gif";
smileyarr["smiley_38"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZkbHop5I/AAAAAAAAAbg/PkeqlYlekB8/smiley_38.gif";
smileyarr["smiley_37"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZlZdgK8I/AAAAAAAAAbk/Z4thWTlrxLU/smiley_37.gif";
smileyarr["smiley_36"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZmtmByuI/AAAAAAAAAbo/-ZqZ1kvnvzg/smiley_36.gif";
smileyarr["smiley_35"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZn1r12qI/AAAAAAAAAbs/Vm7TwTQ0zxQ/smiley_35.gif";
smileyarr["smiley_34"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZoxkMI6I/AAAAAAAAAbw/I9284CMkgi4/smiley_34.gif";
smileyarr["smiley_33"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZpqWmp2I/AAAAAAAAAb0/LY_q-iesupk/smiley_33.gif";
smileyarr["smiley_32"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZqjWTpsI/AAAAAAAAAb4/6GjTmxNVtrQ/smiley_32.gif";
smileyarr["smiley_31"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZr9ifiWI/AAAAAAAAAb8/MXOwkm2qGxs/smiley_31.gif";
smileyarr["smiley_30"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZtfzrtBI/AAAAAAAAAcA/QciU_OxliNo/smiley_30.gif";
smileyarr["smiley_29"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZuHKtJ3I/AAAAAAAAAcE/moBqa6GReYw/smiley_29.gif";
smileyarr["smiley_28"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZvoBUcHI/AAAAAAAAAcI/MDLUXvRrNu4/smiley_28.gif";
smileyarr["smiley_27"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZwQAN3yI/AAAAAAAAAcM/VRtKaFxUkbI/smiley_27.gif";
smileyarr["smiley_26"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZxXqsxeI/AAAAAAAAAcQ/YfK6ibUnQR0/smiley_26.gif";
smileyarr["smiley_25"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZyfIEKBI/AAAAAAAAAcU/PU-W1-4GWks/smiley_25.gif";
smileyarr["smiley_24"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZzCEN-QI/AAAAAAAAAcY/607AvfK8Bwc/smiley_24.gif";
smileyarr["smiley_23"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZ1ZmrLdI/AAAAAAAAAcc/P0uDryGKdIc/smiley_23.gif";
smileyarr["smiley_22"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZ2wMcRwI/AAAAAAAAAcg/xCQhcKUw7TQ/smiley_22.gif";
smileyarr["smiley_21"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZ4MjeZ9I/AAAAAAAAAck/ji557aLEftU/smiley_21.gif";
smileyarr["smiley_20"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGZ5_-OofI/AAAAAAAAAco/4rnEeUCkkmE/smiley_20.gif";
smileyarr["smiley_19"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGZ7GJ7m7I/AAAAAAAAAcs/tj7IJSSwruc/smiley_19.gif";
smileyarr["smiley_18"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZ775nl-I/AAAAAAAAAcw/waSNQgdIo0A/smiley_18.gif";
smileyarr["smiley_17"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGZ9j-40EI/AAAAAAAAAc0/HhKbaWhHyBI/smiley_17.gif";
smileyarr["smiley_16"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGZ_2eJbLI/AAAAAAAAAc4/HXczVVxhdgA/smiley_16.gif";
smileyarr["smiley_15"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGaAg2BipI/AAAAAAAAAc8/fXzrT_tXcms/smiley_15.gif";
smileyarr["smiley_14"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGaByGggTI/AAAAAAAAAdA/Ycd_W4jT8fg/smiley_14.gif";
smileyarr["smiley_13"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGaC-38p3I/AAAAAAAAAdE/99J4P5vms9Q/smiley_13.gif";
smileyarr["smiley_12"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGaD2pUjvI/AAAAAAAAAdI/f8DDL5rEn0o/smiley_12.gif";
smileyarr["smiley_11"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGaE0nvTlI/AAAAAAAAAdM/cfs_FvyHy8c/smiley_11.gif";
smileyarr["smiley_10"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGaF7xBCGI/AAAAAAAAAdQ/cPLAsokr1OA/smiley_10.gif";
smileyarr["smiley_09"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGaHHdd3oI/AAAAAAAAAdU/QlyfSaqVzN0/smiley_09.gif";
smileyarr["smiley_08"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdGaICSG1bI/AAAAAAAAAdY/flLijmRZXt8/smiley_08.gif";
smileyarr["smiley_07"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGaIjOWNUI/AAAAAAAAAdc/tyKQwEo0ySg/smiley_07.gif";
smileyarr["smiley_06"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGaJdtUxaI/AAAAAAAAAdg/PSp2PUKD-dY/smiley_06.gif";
smileyarr["smiley_05"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGaKqZNtoI/AAAAAAAAAdk/BuxogiJRt0I/smiley_05.gif";
smileyarr["smiley_04"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdGaL0gQ8VI/AAAAAAAAAdo/u9f109WpMM4/smiley_04.gif";
smileyarr["smiley_03"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGaMlHz8-I/AAAAAAAAAds/81uCcc3mTf4/smiley_03.gif";
smileyarr["smiley_02"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdGaN_PGiTI/AAAAAAAAAdw/iT81rp7JwqQ/smiley_02.gif";
smileyarr["smiley"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdGaPI_kQGI/AAAAAAAAAd0/53nAEZ07I3c/smiley.gif";

	

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
 id: '45529', // Script id on Userscripts.org
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
