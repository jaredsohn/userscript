// ==UserScript==
// @name          Boyzzzzz Stuff Smilies
// @namespace     
// @author	  DAW
// @description   Dream, Achieve and Win
// @include       htt*://*.orkut.*/*

// ==/UserScript==

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
	var pic = new Array();

	pic["1"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S827iKISHtI/AAAAAAAAAWo/e22eg9f4A9Y/s400/6.png";

	pic["2"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S827XtalfCI/AAAAAAAAAWU/Zx6eJBLu744/s400/1.png";

	pic["3"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S827X7LjQLI/AAAAAAAAAWY/8C3otsL498A/s400/2.png";

	pic["4"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S827X_eWiiI/AAAAAAAAAWc/okBxHSoV8pw/s400/3.png";
	
	pic["5"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S827YDfsIJI/AAAAAAAAAWg/Doh6HjU1f7M/s400/4.png";
	
	pic["6"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S827YEygIfI/AAAAAAAAAWk/rf2ozSfH0zY/s400/5.png";

	pic["7"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S827iRBtyOI/AAAAAAAAAWw/PgEuM88Op2E/s400/8%20%282%29.png";

	pic["8"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S827iuTgnrI/AAAAAAAAAW0/-23VMnqclEM/s400/8.png";

	



	pic["9"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S827i9FymgI/AAAAAAAAAW4/JcKlaZjHl1A/s400/9.png";

	pic["10"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S828mZRYcRI/AAAAAAAAAW8/bJ8jwx6KeW4/s400/10.png";

	pic["11"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S828mR_2OmI/AAAAAAAAAXA/XtiJN6jls4s/s400/11.png";


	pic["12"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S828m-HZneI/AAAAAAAAAXI/4-Pv1gZDUAw/s400/13.png";
	
	pic["13"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S828mztQFHI/AAAAAAAAAXM/tjGikF62Tr8/s400/14.png";

	pic["14"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S828_Q-gaRI/AAAAAAAAAXQ/v6Yv-D8dqhw/s400/15.png";

	pic["15"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S828_ovGXCI/AAAAAAAAAXU/hzzZdroONao/s400/16.png";

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
		
		for(title in pic){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+pic[title]+"' title='"+title+"'>";
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
 id: '75082', // Script id on Userscripts.org
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

//Dream, Achieve and Win 