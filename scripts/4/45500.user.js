scr_meta=<><![CDATA[
// ==UserScript==
// @name	Sree Signature button
// @version	2.00
// @author	Sreejan Sur
// @namespace	TEAM BLAKUT
// @description Use the Signature Button(for orkut only) in your ScrapBook and community Forums. Use either HTML signature or Simple text signature 
// @include        http://*.orkut.*/*Scrapbook*
// @include        http://*.orkut.*/*CommMsgs*
// @include        http://*.orkut.*/*CommMsgPost*
// ==/UserScript==
]]></>;

//-->Customize your Script here<--

var signa = "Sreejan Was Here"; //Edit your signature 

var borcol = "#000000";//edit border colour code of template 1
var bgcol = "#CA875A";//edit background colour code of template 1
var fface = "Arial";//edit font face of template 1
var fcol = "#000000";//edit font colour of template 1

var borcol1 = "#FF0000";//edit border colour code of template 2
var bgcol1 = "#000000";//edit background colour code of template 2
var fface1 = "Forte";//edit font face of template 2
var fcol1 = "#FFFFFF";//edit font colour of template 2

//Dont change anything below unless u know what u r doing :P -->



var sightml = "<br><br><center>"+"<div style=\"border: 3px ridge #0D1348; padding: 2px 3px; background: #DDC984 none repeat scroll 0% 50%; width: 20%; -moz-background-clip: initial; -moz-background-origin: initial; -moz-background-inline-policy: initial; font-weight: bold; font-style: italic; font-size: 9pt; color: #2C0C4B; font-family: Comic Sans MS; margin-left: 0; margin-right: 0; text-decoration: blink; text-align: center;\">"+signa+"</div>"+"</center>";
var signhtm = "\n\n"+signa;

function sreejan(n)
{
	return document.getElementsByTagName('textarea')[n];
}

function signahtml() 
{
	ss=sreejan(this.getAttribute("gult"));
	sreejan(this.getAttribute("gult")).focus();
	ss.value+=sightml;
}

function signanohtml()
{
	sss=sreejan(this.getAttribute("gult"));
	sreejan(this.getAttribute("gult")).focus();
	sss.value+=signhtm;
}

function templatehtml()
{
	ssss=sreejan(this.getAttribute("gult"));
	sreejan(this.getAttribute("gult")).focus();
	ssss.value+="<br /><div style=\"border: 5px solid "+borcol+"; padding: 12px 18px; background: "+bgcol+" none repeat scroll 0% 50%; -moz-background-clip: initial; -moz-background-origin: initial; -moz-background-inline-policy: initial; font-size: 10pt; color: "+fcol+"; font-family: "+fface+"; margin-left: 20px; margin-right: 20px; text-decoration: none; text-align: center;\">[b]WRITE HERE[/b]</div><br />";
}
function templatehtml1()
{
	sssss=sreejan(this.getAttribute("gult"));
	sreejan(this.getAttribute("gult")).focus();
	sssss.value+="<br /><div style=\"border: 7px ridge "+borcol1+";margin: 10px; padding: 25px; background: "+bgcol1+" none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin:-moz-initial; -moz-background-inline-policy: -moz-initial;width: 600px; font-size: 34px; color: "+fcol1+"; font-family: "+fface1+"; text-align: center;\">♛WRITE HERE♛</div><br />";
}

function dip()
{
	for (i=0;i<30;i++)
	{
		text=sreejan(i);
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		d.innerHTML="<b></b><br />";
		d.style.marginTop="10px";
		c.appendChild(d);
	
	
		s1=document.createElement("a");
		s1.href="javascript:;";
		s1.innerHTML="Simple Signature";
		s1.setAttribute("gult", i);
		s1.addEventListener("click", signanohtml, true);
			d.appendChild(s1);
	
		sgap=document.createElement("b");
		sgap.innerHTML="&nbsp;&nbsp;&nbsp;"
			d.appendChild(sgap);
	
		s2=document.createElement("a");
		s2.href="javascript:;";
		s2.innerHTML='<img src="http://img22.imageshack.us/img22/599/sigbutton.png">';
		s2.setAttribute("gult", i);
		s2.addEventListener("click", signahtml, true);
			d.appendChild(s2);
			
		sgap2=document.createElement("b");
		sgap2.innerHTML="&nbsp;&nbsp;&nbsp;"
			d.appendChild(sgap2);		
		
		templ=document.createElement("a");
		templ.href="javascript:;";
		templ.innerHTML='<img src="http://lh3.ggpht.com/_mkcswd7p9hc/Sc9Z8nBtPGI/AAAAAAAAAFI/K6B_WVHkDSk/s400/Sreetemplate.PNG">';
		templ.setAttribute("gult", i);
		templ.addEventListener("click", templatehtml, true);
			d.appendChild(templ);
                sgap3=document.createElement("b");
		sgap3.innerHTML="&nbsp;&nbsp;&nbsp;"
			d.appendChild(sgap3);		
		
		temp2=document.createElement("a");
		temp2.href="javascript:;";
		temp2.innerHTML='<img src="http://lh6.ggpht.com/_mkcswd7p9hc/SddVvyfP56I/AAAAAAAABAA/jm5WbXPjnSk/s400/sree_template_v2.JPG">';
		temp2.setAttribute("gult", i);
		temp2.addEventListener("click", templatehtml1, true);
			d.appendChild(temp2);
		}
}

dip();

//Auto Updater
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '45500', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
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