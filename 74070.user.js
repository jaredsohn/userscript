scr_meta=<><![CDATA[
// ==UserScript==
// @name	Mania II
// @version	0.0.0.2
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
	var boy = new Array();	
	boy["1"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8AMQ3549OI/AAAAAAAAANk/67KvQ08adNY/s400/0003.png";
	boy["2"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8AMROjwwgI/AAAAAAAAANo/40I7_-KphZY/s400/0006.png";
	boy["3"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8AMRLnytXI/AAAAAAAAANs/lFNVLeFSYj8/s400/0009.png";
	boy["4"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8AMRbtaUqI/AAAAAAAAANw/ono_EVxondk/s400/0010.png";
	boy["5"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8AM70XiNwI/AAAAAAAAAN4/ltgaXddikU4/s400/0011.png";
	boy["6"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8AM8BlsPZI/AAAAAAAAAN8/ds20qJM5ULQ/s400/0013.png";
	boy["7"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8AM8JWPPHI/AAAAAAAAAOA/XHm6ykGDhdY/s400/0015.png";

	boy["8"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8AM8W1lnwI/AAAAAAAAAOE/DtimBv5Sax0/s400/0017.png";
	boy["9"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8AM8o-2LmI/AAAAAAAAAOI/PvblU4mJWes/s400/0018.png";
	boy["10"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8A-PDQPWWI/AAAAAAAAAOs/zKxiows327A/s400/0040.png";
	boy["11"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8A-PfT7tuI/AAAAAAAAAOw/BWerT9FyKrw/s400/0038.png";
	boy["12"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8CCLctdjyI/AAAAAAAAAPQ/ImRg-4X9iz0/s400/0048.png";
	boy["13"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8CCLXMGd-I/AAAAAAAAAPU/QkH-9tCWF1I/s400/0047.png";
	boy["14"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8CCLT0apOI/AAAAAAAAAPY/qcLAQV6sWD4/s400/0051.png";


	boy["15"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8CCLzYDtDI/AAAAAAAAAPc/7nZaewZVdFw/s400/0057.png";
	boy["16"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8CCx9za3YI/AAAAAAAAAPg/eKxgIE9zlG4/s400/0058.png";
	boy["17"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8CDS0qJ8rI/AAAAAAAAAPs/x2RtDVzs-0Q/s400/0083.png";
	boy["18"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8CCyLTFRxI/AAAAAAAAAPo/_7k3nwRDav8/s400/0074.png";
	boy["19"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S8CDTEwNDKI/AAAAAAAAAPw/KTXtu916hgI/s400/0088.png";
	boy["20"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S8CDTNXnd9I/AAAAAAAAAP0/LELrL0rjci8/s400/0089.png";
	boy["21"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8CDfmVge0I/AAAAAAAAAP4/gKWKq6Jv9ow/s400/0091.png";
	boy["22"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S8CDfjjilPI/AAAAAAAAAP8/g5QLDpY617A/s400/0093.png";
	boy["23"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S8CDf51LYKI/AAAAAAAAAQA/XQyiKAanhbY/s400/0094.png";
	

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
		
		for(title in boy)
		{
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+boy[title]+"' title='"+title+"'>";
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
 id: '45651', // Script id on Userscripts.org
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