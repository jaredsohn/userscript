scr_meta=<><![CDATA[
// ==UserScript==
// @name	Mickey Smileys By Sreejan
// @version	1.00
// @author	Sreejan Sur :P
// @namespace	TEAM BLAKUT
// @description	 Use the animated smileys(for Orkut only) in your ScrapBook and HTML community Forums. Just click on the smiley to insert. Enjoy...
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
smileyarr["AddEmoticons1049"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPA295PCcI/AAAAAAAAA6c/iAJeSVRNAvA/AddEmoticons1049.gif";
smileyarr["AddEmoticons1048"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPA3okEa7I/AAAAAAAAA6g/Mb6Gt-fS8hI/AddEmoticons1048.gif";
smileyarr["AddEmoticons1047"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPA4sIC_mI/AAAAAAAAA6k/6Pitc6PsjCM/AddEmoticons1047.gif";
smileyarr["AddEmoticons1046"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPA5gTQOBI/AAAAAAAAA6o/tkDm3C9AXl0/AddEmoticons1046.gif";
smileyarr["AddEmoticons10452"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPA7Dc9gnI/AAAAAAAAA6s/G-GUsev358o/AddEmoticons10452.gif";
smileyarr["AddEmoticons10451"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPA_VW-GqI/AAAAAAAAA6w/TfpfCv9p9Rg/AddEmoticons10451.gif";
smileyarr["AddEmoticons10450"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBAUXj36I/AAAAAAAAA60/Xim2pzjx2nU/AddEmoticons10450.gif";
smileyarr["AddEmoticons1045"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBBT3rfXI/AAAAAAAAA64/4y3o5y9HYo8/AddEmoticons1045.gif";
smileyarr["AddEmoticons10449"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBCIAaJCI/AAAAAAAAA68/b_zRDOzVhZw/AddEmoticons10449.gif";
smileyarr["AddEmoticons10448"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBDZdcZtI/AAAAAAAAA7A/5zKdS7YZfqo/AddEmoticons10448.gif";
smileyarr["AddEmoticons10447"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBFiOItDI/AAAAAAAAA7E/UGzxwfc-XOw/AddEmoticons10447.gif";
smileyarr["AddEmoticons10446"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBGxy_VfI/AAAAAAAAA7I/PXZr_ywB_ws/AddEmoticons10446.gif";
smileyarr["AddEmoticons10445"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBH0aCjEI/AAAAAAAAA7M/7EKIgjUjcCM/AddEmoticons10445.gif";
smileyarr["AddEmoticons10444"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBI3dFuOI/AAAAAAAAA7Q/igNweE0caIY/AddEmoticons10444.gif";
smileyarr["AddEmoticons10443"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBJ9mN5CI/AAAAAAAAA7U/y4DRpguVEBo/AddEmoticons10443.gif";
smileyarr["AddEmoticons10442"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBLJQ4-MI/AAAAAAAAA7Y/--2kwru2RqU/AddEmoticons10442.gif";
smileyarr["AddEmoticons10441"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBMV_o9eI/AAAAAAAAA7c/UGM6RVDJ9-4/AddEmoticons10441.gif";
smileyarr["AddEmoticons10440"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBNB1HCfI/AAAAAAAAA7g/Xd4j7PZMq-M/AddEmoticons10440.gif";
smileyarr["AddEmoticons1044"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBOdpYctI/AAAAAAAAA7k/uwzUdKCUVyE/AddEmoticons1044.gif";
smileyarr["AddEmoticons10439"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBQaJYuvI/AAAAAAAAA7o/EnSz3ZPtm-M/AddEmoticons10439.gif";
smileyarr["AddEmoticons10438"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBRbuz3GI/AAAAAAAAA7s/WAYKvpbTSnA/AddEmoticons10438.gif";
smileyarr["AddEmoticons10437"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBSCBdvPI/AAAAAAAAA7w/TabvsQTqA_E/AddEmoticons10437.gif";
smileyarr["AddEmoticons10436"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBTWYYX8I/AAAAAAAAA70/zdZqq80JOY0/AddEmoticons10436.gif";
smileyarr["AddEmoticons10435"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBUEZTE-I/AAAAAAAAA74/yWgbZFECivI/AddEmoticons10435.gif";
smileyarr["AddEmoticons10434"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBU9DUF_I/AAAAAAAAA78/jM5sBmrfvuM/AddEmoticons10434.gif";
smileyarr["AddEmoticons10433"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBWwQSJLI/AAAAAAAAA8A/k9Y_mgHNMu0/AddEmoticons10433.gif";
smileyarr["AddEmoticons10432"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBYYh-OLI/AAAAAAAAA8E/IwjoNHIXMx8/AddEmoticons10432.gif";
smileyarr["AddEmoticons10431"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBZe8VPOI/AAAAAAAAA8I/Jsh79bshIhs/AddEmoticons10431.gif";
smileyarr["AddEmoticons10430"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBa6KtJvI/AAAAAAAAA8M/e1e3XY3g6LQ/AddEmoticons10430.gif";
smileyarr["AddEmoticons1043"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBbxnCP3I/AAAAAAAAA8U/qQSm7d2Fh7M/AddEmoticons1043.gif";
smileyarr["AddEmoticons10429"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBcw5_gUI/AAAAAAAAA8Y/bFoUFKvIzTU/AddEmoticons10429.gif";
smileyarr["AddEmoticons10428"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBeHJO6xI/AAAAAAAAA8c/bcHmjjV8BAs/AddEmoticons10428.gif";
smileyarr["AddEmoticons10427"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBe3dYhAI/AAAAAAAAA8g/A3GOLLx3rUk/AddEmoticons10427.gif";
smileyarr["AddEmoticons10426"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBfxWN3tI/AAAAAAAAA8k/yt4JPOYrQGo/AddEmoticons10426.gif";
smileyarr["AddEmoticons10425"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBgigxzlI/AAAAAAAAA8o/GL69iN9UdhQ/AddEmoticons10425.gif";
smileyarr["AddEmoticons10424"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBhS4BRGI/AAAAAAAAA8s/qNxsXjABhto/AddEmoticons10424.gif";
smileyarr["AddEmoticons10423"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBiCHqQ5I/AAAAAAAAA8w/bRtUe9p_-O8/AddEmoticons10423.gif";
smileyarr["AddEmoticons10422"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBjjFaFBI/AAAAAAAAA80/i3AOLhr109U/AddEmoticons10422.gif";
smileyarr["AddEmoticons10421"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBkiN7p-I/AAAAAAAAA84/qAMdM6GqM4U/AddEmoticons10421.gif";
smileyarr["AddEmoticons10420"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBll0zVYI/AAAAAAAAA88/wlcDiepOu0E/AddEmoticons10420.gif";
smileyarr["AddEmoticons1042"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBmZYbJAI/AAAAAAAAA9A/g0ED1kjTzj8/AddEmoticons1042.gif";
smileyarr["AddEmoticons10419"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBncdnr0I/AAAAAAAAA9E/-I8B5mcqRqY/AddEmoticons10419.gif";
smileyarr["AddEmoticons10418"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBoDqVHcI/AAAAAAAAA9I/fLibLncK0oo/AddEmoticons10418.gif";
smileyarr["AddEmoticons10417"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBo8DjEEI/AAAAAAAAA9M/cMUQOlTTJwY/AddEmoticons10417.gif";
smileyarr["AddEmoticons10416"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdPBplLu5AI/AAAAAAAAA9Q/vDRNy0pAjKI/AddEmoticons10416.gif";
smileyarr["AddEmoticons10415"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBqpXXAwI/AAAAAAAAA9U/O9wV4DFiY3o/AddEmoticons10415.gif";
smileyarr["AddEmoticons10414"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBrX_g_hI/AAAAAAAAA9Y/49Rqv49rD-4/AddEmoticons10414.gif";
smileyarr["AddEmoticons10413"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdPBstb7iAI/AAAAAAAAA9c/gCJBUsyYXXM/AddEmoticons10413.gif";
smileyarr["AddEmoticons10412"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBt5HEnHI/AAAAAAAAA9g/_youU-jfHVE/AddEmoticons10412.gif";
smileyarr["AddEmoticons10411"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdPBvEPSUBI/AAAAAAAAA9k/NrzKxFbJTBY/AddEmoticons10411.gif";
smileyarr["AddEmoticons10410"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBxM5j-iI/AAAAAAAAA9o/TU18aNnvLOE/AddEmoticons10410.gif";
smileyarr["AddEmoticons1041"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdPBy4Yo6xI/AAAAAAAAA9s/JIP52Shp2J4/AddEmoticons1041.gif";

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
 id: '45651', // Script id on Userscripts.org
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