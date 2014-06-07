var scr_meta=<><![CDATA[
// ==UserScript==
// @name           4chan Runescape fucker (Removes Spam)
// @namespace      FuckWilderTuesday
// @description    Remove the fuckin ALL spams
// @include        *4chan.org*
// @version        0.22356
// ==/UserScript==
]]></>.toString();

const spam = new Array(
	"4Chan Spam Tool:",
	"http://www.youtube.com/watch?v=CHVhwcOg6y8",
	"http://www.youtube.com/watch?v=9gav8zsR8KY",
	"Steps to unlocking a 4chan Gold",
	"If you guys are tired of hitting f5 to wade through shitty threads",
	"ento. Puede que el sitio Web tenga problemas técnicos o que neces",
	"ht be experiencing technical difficulties, or you may need to adjust yo",
	"Impossibile visualizzare la pagina Web in questo programma",
	"Holy Shit, Sexy Teen Goes Crazy With 2 Friends!! - NO SHARECASH BULLSHIT - Direct Streaming Video!!",
	"Este programa no puede mostrar la página web",
	"4Chan Spamming tool: http://h1.ripway.com/taser/index.html",
	"Here is the new 4Chan spammer everyone is talking about.",
	"De momento, a página que procura não está disponível. O Web site poderá estar com problemas técnicos ou talvez seja necessário ajustar as definições do browser.",
	"http://investorrehablist.com/DDoSer.exe",
	"Play The Best Runescape Private Server! In need of a few moderators http://omegars.coz.bz",
	"This program cannot display the webpage",
	"ipside Interactive, L.L.C. All photos and electronic content uploaded or install",
	"NATHU DO YOU NOT GET IT?",
	"ereço da página na barra de ender",
	"WHY SPAM 4CHAN FAGGOT?",
	"http://www.youtube.com/watch?v=0EOc6y3Wd6U",
	"apaz de resolver o nome do host pres",
	"ama não pode exibir a página da W",
	"free component of a fully functioning",
	"www.2dogs1chainsaw.",
	"giornare la pag",
	"ested host could not be reached. Cli",
	"orazione della pagina Web è stata annu",
	"paste the following into Notepad",
	"Look what I found r0fll http://links2pinks.com/megansextape/",
	"http://freemeganfoxsex.info",
	"mootsecret.com and clicked some random link",
	"us n’êtes pas connecté à Intern",
	"ses les plus proba",
	"j spV r j ",
	"eos from all popular porn sites, not 1 but over 2 do",
	"dadDesarrolladoresEmpleoCond",
	"i swear she can't be over 16",
	"Obama's Murder Video",
	"MEGAN FOX - http://megansextapefree.info/",
	"ZOMG SECRET RAID BOARD",
	"i swear she can't be over 16",
	"Account SuspendedThis Account Has Been Suspended",
	"Use FakeWebcam [Gifs Included] ",
	"Archivo no encontrado",
	"OMFGWTFOMGOMGGOMAPDASD!!11",
	"561-674-4256",
	"Open the teamwaffle.net",
	"see all the best tits the interwebs has",
	"have archived every single timestampd pic of cumdumpsters"
);
var tables = document.getElementsByTagName("table");
for (var i = tables.length - 1; i >= 0; --i)
{
	var tCell = tables[i].rows[0].cells;
	for ( var j = tCell.length - 1; j >= 0; --j)
	{
		for(var s = spam.length - 1; s>=0; --s) {
			if(tCell[j].innerHTML.indexOf(spam[s]) >= 0) {
				var spamFaggery = tCell[j].parentNode;
				spamFaggery.parentNode.removeChild(spamFaggery);
				break;
			}
		}
	}
}

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '69068', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) )
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();