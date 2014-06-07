scr_meta=<><![CDATA[
// ==UserScript==
// @name	Cat Smileys By Sreejan
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
smileyarr["AddEmoticons0099"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7SdQoGbI/AAAAAAAAAmM/ZJDqI-BJvDc/AddEmoticons0099.gif";
smileyarr["AddEmoticons0098"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7TYvOuLI/AAAAAAAAAmQ/lqInXsWCD3U/AddEmoticons0098.gif";
smileyarr["AddEmoticons0097"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7UQlhzkI/AAAAAAAAAmU/u52RIBBfLDI/AddEmoticons0097.gif";
smileyarr["AddEmoticons0096"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7VUqCO0I/AAAAAAAAAmY/94iRPNWJ4wE/AddEmoticons0096.gif";
smileyarr["AddEmoticons00957"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7WQYQmAI/AAAAAAAAAmc/8jZEn5HPNcA/AddEmoticons00957.gif";
smileyarr["AddEmoticons00956"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7YFWHkmI/AAAAAAAAAmg/ENFis91Vq4w/AddEmoticons00956.gif";
smileyarr["AddEmoticons00955"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7Z08RHLI/AAAAAAAAAmk/LXy0PM-Y-wQ/AddEmoticons00955.gif";
smileyarr["AddEmoticons00954"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7bgfgm2I/AAAAAAAAAmo/MPUSPFJItRE/AddEmoticons00954.gif";
smileyarr["AddEmoticons00953"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7cty2AUI/AAAAAAAAAms/SpNqrfWLIq8/AddEmoticons00953.gif";
smileyarr["AddEmoticons00952"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7dXcZYpI/AAAAAAAAAmw/KyQ_Kbz0mN8/AddEmoticons00952.gif";
smileyarr["AddEmoticons00951"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7eBXgNFI/AAAAAAAAAm0/w588APMpjKE/AddEmoticons00951.gif";
smileyarr["AddEmoticons00950"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7e2KDx_I/AAAAAAAAAm4/KmBxwN26d04/AddEmoticons00950.gif";
smileyarr["AddEmoticons0095"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7f2qMWJI/AAAAAAAAAm8/i7bW74Ky1lE/AddEmoticons0095.gif";
smileyarr["AddEmoticons00949"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7gt_coRI/AAAAAAAAAnA/JLl4YzZQiMQ/AddEmoticons00949.gif";
smileyarr["AddEmoticons00948"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7hUopXDI/AAAAAAAAAnE/3B1czdK0bVI/AddEmoticons00948.gif";
smileyarr["AddEmoticons00947"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7iLjlKMI/AAAAAAAAAnI/eg1TDyEL3Y4/AddEmoticons00947.gif";
smileyarr["AddEmoticons00946"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7jVPvezI/AAAAAAAAAnM/rZPdKk14z-I/AddEmoticons00946.gif";
smileyarr["AddEmoticons00945"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7lQQyAJI/AAAAAAAAAnQ/2-CiSgXP6F4/AddEmoticons00945.gif";
smileyarr["AddEmoticons00944"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7qmBeSkI/AAAAAAAAAnU/ThZAhmv1qU4/AddEmoticons00944.gif";
smileyarr["AddEmoticons00943"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7r4WBEQI/AAAAAAAAAnY/dsSKypjuZgo/AddEmoticons00943.gif";
smileyarr["AddEmoticons00942"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7sowVgMI/AAAAAAAAAnc/VeAIk4N0MfA/AddEmoticons00942.gif";
smileyarr["AddEmoticons00941"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7tYGi55I/AAAAAAAAAng/4goLmCw-Epw/AddEmoticons00941.gif";
smileyarr["AddEmoticons00940"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7u07CGXI/AAAAAAAAAnk/_fZs8ZYec4o/AddEmoticons00940.gif";
smileyarr["AddEmoticons0094"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7wLr-9gI/AAAAAAAAAno/olCM_cB_jtc/AddEmoticons0094.gif";
smileyarr["AddEmoticons00939"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH7wzAcL2I/AAAAAAAAAns/lU4vTsLWSo8/AddEmoticons00939.gif";
smileyarr["AddEmoticons00938"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7xjCqigI/AAAAAAAAAnw/eGX0e-LRD24/AddEmoticons00938.gif";
smileyarr["AddEmoticons00937"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7ye1kicI/AAAAAAAAAn0/KHhHRL50Aec/AddEmoticons00937.gif";
smileyarr["AddEmoticons00936"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH7y9Lm3aI/AAAAAAAAAn4/XYLC7YErHgc/AddEmoticons00936.gif";
smileyarr["AddEmoticons00935"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH71_tyeKI/AAAAAAAAAn8/6TigWo11_Ts/AddEmoticons00935.gif";
smileyarr["AddEmoticons00934"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH73mwNFcI/AAAAAAAAAoA/rW9v6MRIXOw/AddEmoticons00934.gif";
smileyarr["AddEmoticons00933"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH756HWvzI/AAAAAAAAAoE/iPlPF6w5KK8/AddEmoticons00933.gif";
smileyarr["AddEmoticons00932"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH76kgY0jI/AAAAAAAAAoI/j-cYYgpf4ME/AddEmoticons00932.gif";
smileyarr["AddEmoticons00931"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH77pmzt2I/AAAAAAAAAoM/upzAAIZmAQ0/AddEmoticons00931.gif";
smileyarr["AddEmoticons00930"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH78F0u8lI/AAAAAAAAAoQ/2oJqusWIKQ4/AddEmoticons00930.gif";
smileyarr["AddEmoticons0093"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH79Edvb6I/AAAAAAAAAoU/oVnWY2V9GL8/AddEmoticons0093.gif";
smileyarr["AddEmoticons00929"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH7-GA4HrI/AAAAAAAAAoY/VjgNkfI0mgY/AddEmoticons00929.gif";
smileyarr["AddEmoticons00928"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH7-zdfHWI/AAAAAAAAAoc/5hP3ycflAeE/AddEmoticons00928.gif";
smileyarr["AddEmoticons00927"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8AhTmS1I/AAAAAAAAAog/ASnmlT7aybM/AddEmoticons00927.gif";
smileyarr["AddEmoticons00926"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8BgdaAyI/AAAAAAAAAok/AwSQdXNf1hM/AddEmoticons00926.gif";
smileyarr["AddEmoticons00925"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8DkSuF6I/AAAAAAAAAoo/b8pdmWdl73E/AddEmoticons00925.gif";
smileyarr["AddEmoticons00924"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8FjZxM8I/AAAAAAAAAos/nyJffc_1w-c/AddEmoticons00924.gif";
smileyarr["AddEmoticons00923"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH8G9tLWeI/AAAAAAAAAow/vbKp3Jup6g0/AddEmoticons00923.gif";
smileyarr["AddEmoticons00922"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8Iayi1WI/AAAAAAAAAo0/YowguPzQyl8/AddEmoticons00922.gif";
smileyarr["AddEmoticons00921"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH8J2Mn2BI/AAAAAAAAAo4/cuNbM04f3k8/AddEmoticons00921.gif";
smileyarr["AddEmoticons00920"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8LL-ck5I/AAAAAAAAAo8/up9L34vxYCM/AddEmoticons00920.gif";
smileyarr["AddEmoticons0092"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH8MY1cPrI/AAAAAAAAApA/EacEmGJC6_g/AddEmoticons0092.gif";
smileyarr["AddEmoticons00919"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8NHbrKkI/AAAAAAAAApE/IqEGktKd_kk/AddEmoticons00919.gif";
smileyarr["AddEmoticons00918"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8N46degI/AAAAAAAAApI/fkXkJc7QuGs/AddEmoticons00918.gif";
smileyarr["AddEmoticons00917"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH8OhujcUI/AAAAAAAAApM/ivP3PsoAGJk/AddEmoticons00917.gif";
smileyarr["AddEmoticons00916"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8PNSLBlI/AAAAAAAAApQ/RtY36AKLWAc/AddEmoticons00916.gif";
smileyarr["AddEmoticons00915"]="http://lh4.ggpht.com/_mkcswd7p9hc/SdH8QKCqUpI/AAAAAAAAApU/4X8QJNIrvtM/AddEmoticons00915.gif";
smileyarr["AddEmoticons00914"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8RPGXulI/AAAAAAAAApY/ah28h2bzQ6g/AddEmoticons00914.gif";
smileyarr["AddEmoticons00913"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8SfIvv7I/AAAAAAAAApc/9ck0SeTO9Zs/AddEmoticons00913.gif";
smileyarr["AddEmoticons00912"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8TOdQAoI/AAAAAAAAApg/pYtYIluLRjY/AddEmoticons00912.gif";
smileyarr["AddEmoticons00911"]="http://lh6.ggpht.com/_mkcswd7p9hc/SdH8VKVw69I/AAAAAAAAApk/1b89V0ToQcI/AddEmoticons00911.gif";
smileyarr["AddEmoticons00910"]="http://lh3.ggpht.com/_mkcswd7p9hc/SdH8WPqN1KI/AAAAAAAAApo/qgX286fdQdA/AddEmoticons00910.gif";
smileyarr["AddEmoticons0091"]="http://lh5.ggpht.com/_mkcswd7p9hc/SdH8W9tkTaI/AAAAAAAAAps/6JJcI8VTGVk/AddEmoticons0091.gif";
	

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
 id: '45548', // Script id on Userscripts.org
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

