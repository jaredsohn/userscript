scr_meta=<><![CDATA[
// ==UserScript==
// @name	Kitty
// @version	0.0.1.1
// @author	Amrit
// @namespace     Nautanki Gang   http://www.orkut.co.in/Main#Community?cmm=93080004
// @description   Dream, Achieve and Win
// @include       htt*://*.orkut.*/*

// ==/UserScript==
]]></>;

addEventListener('load', function(event) 
{
	function getTextArea(n) 
	{
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley()
{
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function pictures() 
{
	var kit = new Array();	
	
	kit["1"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8MwpTRpKdI/AAAAAAAAASA/2-BTiA8krN0/s400/anime_kitties-9790.png";

	kit["2"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8Mwptr083I/AAAAAAAAASE/JWyp2JcKpSM/s400/anime_kitties-9791.png";

	kit["3"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8MwplwUX0I/AAAAAAAAASI/faitLEYFA2U/s400/anime_kitties-9792.png";
	
	kit["4"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8Mwp_3lsGI/AAAAAAAAASM/yczrdiHRLu0/s400/anime_kitties-9793.png";
	
	kit["5"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8Mwp8zt81I/AAAAAAAAASQ/HzM446jy430/s400/anime_kitties-9794.png";
		
	kit["6"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8MxXf6R2aI/AAAAAAAAASY/A2kR9Ju14ro/s400/anime_kitties-9797.png";

	kit["7"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8MxXe8jBeI/AAAAAAAAASc/0hWubqDzRbo/s400/anime_kitties-9798.png";

	kit["8"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8MxXeGwMMI/AAAAAAAAASg/a43kZf9FKDM/s400/anime_kitties-9799.png";

	kit["9"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8MxXk7cjII/AAAAAAAAASk/1GrcIrZIMmw/s400/anime_kitties-9800.png";

	kit["10"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8Mx6He2PDI/AAAAAAAAASo/9HW_FgbE_Jc/s400/hello_kitty_kaos_01.png";

	

	kit["11"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8Mx6xTAQJI/AAAAAAAAASs/M82WFr8mg_U/s400/hello_kitty_kaos_02.png";

	kit["12"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8Mx6_IekII/AAAAAAAAASw/eLq0hDBrFMU/s400/hello_kitty_kaos_04.png";

	kit["13"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8Mx7MOXBbI/AAAAAAAAAS0/S8M7K12rJ84/s400/hello_kitty_kaos_05.png";

	kit["14"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8Mx7IkHdMI/AAAAAAAAAS4/NaR8VER8WxE/s400/hello_kitty_kaos_07.png";

	kit["15"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8MyTzVRj8I/AAAAAAAAAS8/gJtF1mA-hgU/s400/hello_kitty_kaos_08.png";

	kit["16"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8MyUMO1qDI/AAAAAAAAATA/MsAtdmzwMYU/s400/hello_kitty_kaos_11.png";

	kit["17"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8MyUWwoUlI/AAAAAAAAATI/U_53HBJTfEE/s400/hello_kitty_kaos_17.png";

	kit["18"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8MyUpQfjeI/AAAAAAAAATM/lk-gNmAmCFw/s400/hello_kitty_sm_16.png";

	kit["PicnicTime"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8M0m7ubc2I/AAAAAAAAATQ/YC5ho220eSY/s400/10.png";

	kit["SaddySaddy"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8M0nCI1RSI/AAAAAAAAATU/8nldlWy-Ltc/s400/hello_kitty65.png";


	kit["Sleepy"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8M0nKtLdLI/AAAAAAAAATY/RSpJ034vWyw/s400/hello_kitty66.png";

	kit["Stary"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8M0ndbLCQI/AAAAAAAAATc/4_oVLHlWTrI/s400/hello_kitty70.png";

	kit["Butterfly"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8M0nnyd_QI/AAAAAAAAATg/aEA1g-C1s5Q/s400/HKbutterfly.png";

	kit["Tigeress"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8M05fYESdI/AAAAAAAAATk/nQKzWmIDgLw/s400/Kitty_xs003%282%29.png";
	
	kit["Buggy"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8M05Rie7RI/AAAAAAAAATo/wKwjoVj1coc/s400/Kitty_xs041.png";
	
	kit["Pinky"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8M05ho-gzI/AAAAAAAAATs/ofU74r164gQ/s400/Kitty_xs047.png";
	
	kit["Floral"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8M051-Wc_I/AAAAAAAAATw/n9y7fnlqfDU/s400/Kitty_xs058.png";
	
	kit["Playing"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8M053oEWJI/AAAAAAAAAT0/xjOVm5o_32I/s400/thbabyhellokittyfofuxa.png";
	
	kit["LoveisintheAir"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8M1JLfqXLI/AAAAAAAAAT4/LuBpV3wpuJA/s400/thfof42.png";

	kit["FunTime"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8M1JGH2-pI/AAAAAAAAAT8/Cw71zR9KCII/s400/thfof43.png";

	kit["Princess"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8M1JZk-98I/AAAAAAAAAUA/s_TMiEAj390/s400/thhelloprincess.png";
	
	kit["Fun"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8M1JnDuSYI/AAAAAAAAAUE/Lhl435Xm4mM/s400/thkitty19.png";
	
	kit["Fruity"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8M1Jx9PeaI/AAAAAAAAAUI/344ZTKqWzFE/s400/thkittykitty105.png";
	
	kit["Bubbly"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8M1TQgoKII/AAAAAAAAAUM/_fOZdlq9ZSw/s400/thkk7.png";
	
	kit["Heart"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8M1TnpesrI/AAAAAAAAAUQ/XUsvYNSF7BU/s400/thpo.png";

	kit["Magical"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8M1T1I-43I/AAAAAAAAAUU/rEWHiWNHHPo/s400/ththhellokitty7.png";

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++)
	{
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in kit)
		{
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+kit[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
pictures();
}, false);

// Auto Updator
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '74213', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) 
 {
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