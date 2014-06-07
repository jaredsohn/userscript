scr_meta=<><![CDATA[
// ==UserScript==
// @name	Sreejan Emoticons v1
// @version	1.00
// @author	Sreejan Sur :P
// @namespace	TEAM BLAKUT
// @description	Use these animated emoticons(only for Orkut) in your ScrapBook and HTML community Forums. Just click on the emoticon to insert. Enjoy...
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
smileyarr["AddEmoticons0429"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEXqLozHjI/AAAAAAAAASE/tKu7ruHdNIs/AddEmoticons0429.gif";
smileyarr["AddEmoticons04287"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEXq5MSwnI/AAAAAAAAASI/uNv3DtcxKHg/AddEmoticons04287.gif";
smileyarr["AddEmoticons04286"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEXrQ9gcKI/AAAAAAAAASM/waNmqxeaj_Y/AddEmoticons04286.gif";
smileyarr["AddEmoticons04285"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEXsH5akyI/AAAAAAAAASQ/eq0CugpMkAY/AddEmoticons04285.gif";
smileyarr["AddEmoticons04284"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEXtraxSqI/AAAAAAAAASU/ay5zOrYYHlo/AddEmoticons04284.gif";
smileyarr["AddEmoticons04283"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEXuVn2HJI/AAAAAAAAASY/p4jcHPt10F8/AddEmoticons04283.gif";
smileyarr["AddEmoticons04282"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEXvdL57gI/AAAAAAAAASc/947KSElOxDI/AddEmoticons04282.gif";
smileyarr["AddEmoticons04281"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEXw-8mKUI/AAAAAAAAASg/eIRY_95MMV8/AddEmoticons04281.gif";
smileyarr["AddEmoticons04280"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEXxQL8MWI/AAAAAAAAASk/wBeYG6Ygzh0/AddEmoticons04280.gif";
smileyarr["AddEmoticons0428"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEXyYMof-I/AAAAAAAAASo/5BRgDCy3gMo/AddEmoticons0428.gif";
smileyarr["AddEmoticons04279"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEX0R0INNI/AAAAAAAAASs/l9TWX68e6zU/AddEmoticons04279.gif";
smileyarr["AddEmoticons04278"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEX1NKObiI/AAAAAAAAASw/p5x2yRjC_hw/AddEmoticons04278.gif";
smileyarr["AddEmoticons04277"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEX1glrvQI/AAAAAAAAAS0/9qJ93t1YY38/AddEmoticons04277.gif";
smileyarr["AddEmoticons04276"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEX2MkIB0I/AAAAAAAAAS4/6ZOY0MHsXBY/AddEmoticons04276.gif";
smileyarr["AddEmoticons04275"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEX27imrEI/AAAAAAAAAS8/pXbyKzQOBzk/AddEmoticons04275.gif";
smileyarr["AddEmoticons04274"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEX3gWoLrI/AAAAAAAAATA/kMb29i80BKA/AddEmoticons04274.gif";
smileyarr["AddEmoticons04273"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEX4Ukz1YI/AAAAAAAAATE/W4Bip53s470/AddEmoticons04273.gif";
smileyarr["AddEmoticons04272"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEX5VhnsgI/AAAAAAAAATI/_cqhVzeYaY4/AddEmoticons04272.gif";
smileyarr["AddEmoticons04271"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEX6iswAnI/AAAAAAAAATM/epkxggGVbSQ/AddEmoticons04271.gif";
smileyarr["AddEmoticons04270"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEX7rmoFeI/AAAAAAAAATQ/3maYUQgaQUs/AddEmoticons04270.gif";
smileyarr["AddEmoticons0427"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEX8045ugI/AAAAAAAAATU/p68UGtNWtrk/AddEmoticons0427.gif";
smileyarr["AddEmoticons04269"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEX92WXMFI/AAAAAAAAATY/VZE9GZ5s33k/AddEmoticons04269.gif";
smileyarr["AddEmoticons04268"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEX-azGn3I/AAAAAAAAATc/gx653Pj0xIc/AddEmoticons04268.gif";
smileyarr["AddEmoticons04267"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEX-_QEArI/AAAAAAAAATg/l_sYTSD5ATM/AddEmoticons04267.gif";
smileyarr["AddEmoticons04266"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYBFgNZKI/AAAAAAAAATk/dSt3DPGl9QQ/AddEmoticons04266.gif";
smileyarr["AddEmoticons04265"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYB9hdswI/AAAAAAAAATo/I1Qk5I4Jxo4/AddEmoticons04265.gif";
smileyarr["AddEmoticons04264"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYCa1lxUI/AAAAAAAAATs/uXcREMAfb20/AddEmoticons04264.gif";
smileyarr["AddEmoticons04263"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYDJ8Xw5I/AAAAAAAAATw/SUOR4Cy7_kQ/AddEmoticons04263.gif";
smileyarr["AddEmoticons04262"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYD6nihuI/AAAAAAAAAT0/H7f-mYuVj7s/AddEmoticons04262.gif";
smileyarr["AddEmoticons04261"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYE6SxstI/AAAAAAAAAT4/wIp2EGSAznE/AddEmoticons04261.gif";
smileyarr["AddEmoticons04260"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYGPkdR5I/AAAAAAAAAT8/NqTnkCzUqZQ/AddEmoticons04260.gif";
smileyarr["AddEmoticons0426"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYHbxYlwI/AAAAAAAAAUA/5tFDADLCLSI/AddEmoticons0426.gif";
smileyarr["AddEmoticons04259"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYIPz94cI/AAAAAAAAAUE/0Phhi68jK-U/AddEmoticons04259.gif";
smileyarr["AddEmoticons04258"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYJRzzQ5I/AAAAAAAAAUI/jkB-tLKRSAA/AddEmoticons04258.gif";
smileyarr["AddEmoticons04257"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYJwxRy0I/AAAAAAAAAUM/a9iexwb7syk/AddEmoticons04257.gif";
smileyarr["AddEmoticons04256"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYK1G0HmI/AAAAAAAAAUQ/V6BAqRrX5uc/AddEmoticons04256.gif";
smileyarr["AddEmoticons04255"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYLqMmJVI/AAAAAAAAAUU/N2_yPEnjbcc/AddEmoticons04255.gif";
smileyarr["AddEmoticons04254"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYNDl05AI/AAAAAAAAAUY/oC-CE4JzOII/AddEmoticons04254.gif";
smileyarr["AddEmoticons04253"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYNyDJ_fI/AAAAAAAAAUc/4T_WHf9Vp_E/AddEmoticons04253.gif";
smileyarr["AddEmoticons04252"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYP0ZCxuI/AAAAAAAAAUg/6LfOJk7jN2s/AddEmoticons04252.gif";
smileyarr["AddEmoticons04251"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYQpD3fvI/AAAAAAAAAUk/1S_SkdZYh5Y/AddEmoticons04251.gif";
smileyarr["AddEmoticons04250"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYRc1-t2I/AAAAAAAAAUo/WW-vFtIx86I/AddEmoticons04250.gif";
smileyarr["AddEmoticons0425"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYSRwoXOI/AAAAAAAAAUs/llGKuDdnIHI/AddEmoticons0425.gif";
smileyarr["AddEmoticons04249"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYTs7iSOI/AAAAAAAAAUw/2I8D_PU9zsA/AddEmoticons04249.gif";
smileyarr["AddEmoticons04248"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYUSnQS_I/AAAAAAAAAU0/W-XRNV_1io0/AddEmoticons04248.gif";
smileyarr["AddEmoticons04247"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYVHpuVcI/AAAAAAAAAU4/q-mO7nbwkzM/AddEmoticons04247.gif";
smileyarr["AddEmoticons04246"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYWNTOq2I/AAAAAAAAAU8/e7sbx1Z_d6E/AddEmoticons04246.gif";
smileyarr["AddEmoticons04245"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYW4iP3QI/AAAAAAAAAVA/bnZniDjUlcM/AddEmoticons04245.gif";
smileyarr["AddEmoticons04244"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYX2o58tI/AAAAAAAAAVE/PYJTsZHt1lc/AddEmoticons04244.gif";
smileyarr["AddEmoticons04243"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYYk19GUI/AAAAAAAAAVI/7FAHDkU1eTE/AddEmoticons04243.gif";
smileyarr["AddEmoticons04242"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYZ-1eCxI/AAAAAAAAAVM/LlNwiwpWdQQ/AddEmoticons04242.gif";
smileyarr["AddEmoticons04241"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYau5JfHI/AAAAAAAAAVQ/w27biRwTTnk/AddEmoticons04241.gif";
smileyarr["AddEmoticons04240"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYbz-9D_I/AAAAAAAAAVU/PkXbOYpnums/AddEmoticons04240.gif";
smileyarr["AddEmoticons0424"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYcptHFgI/AAAAAAAAAVY/yvRrFWO5Gm8/AddEmoticons0424.gif";
smileyarr["AddEmoticons04239"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYde_QtSI/AAAAAAAAAVc/EHd0mW7Em4k/AddEmoticons04239.gif";
smileyarr["AddEmoticons04238"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYdze2luI/AAAAAAAAAVg/AQC2UTZSLCo/AddEmoticons04238.gif";
smileyarr["AddEmoticons04237"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYe5H0hxI/AAAAAAAAAVk/Ek8VlMSKXlA/AddEmoticons04237.gif";
smileyarr["AddEmoticons04236"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYfRK6LZI/AAAAAAAAAVs/136C91hbh6s/AddEmoticons04236.gif";
smileyarr["AddEmoticons04235"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYgNhP9iI/AAAAAAAAAVw/gDdkTLQLJ08/AddEmoticons04235.gif";
smileyarr["AddEmoticons04234"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYhaD2a3I/AAAAAAAAAV0/YyPzCxQhdy8/AddEmoticons04234.gif";
smileyarr["AddEmoticons04233"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYiaFi6FI/AAAAAAAAAV4/rv1a3dQEG-w/AddEmoticons04233.gif";
smileyarr["AddEmoticons04232"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYjgDuLrI/AAAAAAAAAV8/MT_-R2EqTPU/AddEmoticons04232.gif";
smileyarr["AddEmoticons04231"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYkcFx5gI/AAAAAAAAAWA/XclM9S6raVE/AddEmoticons04231.gif";
smileyarr["AddEmoticons04230"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYk2hcgJI/AAAAAAAAAWE/80S6j5fj17Y/AddEmoticons04230.gif";
smileyarr["AddEmoticons0423"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYlpSreUI/AAAAAAAAAWI/PD7mrtDK0Xc/AddEmoticons0423.gif";
smileyarr["AddEmoticons04229"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYmCHsQ5I/AAAAAAAAAWM/3KcfLi2hBpY/AddEmoticons04229.gif";
smileyarr["AddEmoticons04228"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYnBwWsOI/AAAAAAAAAWQ/IwF6rJHgUAY/AddEmoticons04228.gif";
smileyarr["AddEmoticons04227"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYnizgCPI/AAAAAAAAAWU/00yh1W8e2bg/AddEmoticons04227.gif";
smileyarr["AddEmoticons04226"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYoUGjyBI/AAAAAAAAAWY/EpBN5hnlNrM/AddEmoticons04226.gif";
smileyarr["AddEmoticons04225"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYpkO2oDI/AAAAAAAAAWc/0dp4Vi4uAJ4/AddEmoticons04225.gif";
smileyarr["AddEmoticons04224"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYqdXE5pI/AAAAAAAAAWg/LXiP7B8t7Co/AddEmoticons04224.gif";
smileyarr["AddEmoticons04223"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYrAZN0sI/AAAAAAAAAWk/O1rAGTKm_Go/AddEmoticons04223.gif";
smileyarr["AddEmoticons04222"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYrwj-ovI/AAAAAAAAAWo/yQWPuNqCqTY/AddEmoticons04222.gif";
smileyarr["AddEmoticons04221"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYsy2mU-I/AAAAAAAAAWs/14TRUetCShM/AddEmoticons04221.gif";
smileyarr["AddEmoticons04220"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEYto8m0EI/AAAAAAAAAWw/vjtCkjlEKZA/AddEmoticons04220.gif";
smileyarr["AddEmoticons0422"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYvppJIRI/AAAAAAAAAW0/ZAphryECR6o/AddEmoticons0422.gif";
smileyarr["AddEmoticons04219"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYwUhAgII/AAAAAAAAAW4/LDlkR6av1yI/AddEmoticons04219.gif";
smileyarr["AddEmoticons04218"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEYxCgpbHI/AAAAAAAAAW8/hZYs0SfIVr0/AddEmoticons04218.gif";
smileyarr["AddEmoticons04217"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYx9WMELI/AAAAAAAAAXA/IrvB1wQnwCc/AddEmoticons04217.gif";
smileyarr["AddEmoticons04216"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEYy5zILXI/AAAAAAAAAXE/2v_MHtMJWtI/AddEmoticons04216.gif";
smileyarr["AddEmoticons04215"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEYz9pbIvI/AAAAAAAAAXI/h3-jjqGlOiE/AddEmoticons04215.gif";
smileyarr["AddEmoticons04214"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEY0irnu5I/AAAAAAAAAXM/GXeD0KEQaK0/AddEmoticons04214.gif";
smileyarr["AddEmoticons04213"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdEY1cc-33I/AAAAAAAAAXQ/QX7uLmy3mQY/AddEmoticons04213.gif";
smileyarr["AddEmoticons04212"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdEY2INC-LI/AAAAAAAAAXU/LF5ggkRjzAU/AddEmoticons04212.gif";
smileyarr["AddEmoticons04211"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEY2zymEMI/AAAAAAAAAXY/8Ne6_IWxEZ4/AddEmoticons04211.gif";
smileyarr["AddEmoticons04210"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdEY4LgJgVI/AAAAAAAAAXc/Tmgv-lcMUuE/AddEmoticons04210.gif";
smileyarr["AddEmoticons0421"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdEY4npet1I/AAAAAAAAAXg/iked8cX2yOI/AddEmoticons0421.gif";

	
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
//Auto updater
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '45513', // Script id on Userscripts.org
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