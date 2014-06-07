scr_meta=<><![CDATA[ // for the auto update script
// ==UserScript==
// @name           Image Host Checker (auto update) - PlanetSuzy.org
// @version        2011-05-24
// @namespace      *
// @include        http://planetsuzy.org/*
// @include        http://*.planetsuzy.org/*
// ==/UserScript==
]]></>.toString();

var banned_hosts = new  Array(
	"10pix.ru",
	"abload.de",
	"bigpichost.com",
	"Cocoimage.com",
	"easyloadfiles.net",
	"funnyzoneimages.hi2.ro",
	"hotlinkimage.com",
	"imgiga.com",
	"immage.de",
	"images.bz",
	"imageban.ru",
	"imagebanana.com",
	"imageporter.com",
	"imageshack.us",
	"imagesocket.com",
	"ipicture.ru",
	"megafotka.net",
	"messyshare.com",
	"pic2profit.com",
	"pic4you.ru",
	"pic5you.ru",
	"pic-upload.de",
	"pic.nhjnji.com",
	"picfoco.com",
	"picjackal.com",
	"pixshock.net",
	"pornimghost.com",
	"radikal.ru",
	"screenlist.ru",
	"sharedimages.org",
	"sharefoco.com",
	"sfwimages4u.com",
	"tinypic.com",
	"up-pic.ru",
	"ximages.net");

var images = document.getElementsByTagName('img');
var images_count = images.length;
for(i = 0; i < images_count; i++){
	image = images[i];
	
	// Set the title to url if no title already set
	if(image.hasAttribute("title") == false){
		image.setAttribute("title",image.src);
	}
	
	// Put a red border around pictures hosted on banned hosts
	banned_hosts_count = banned_hosts.length;
	for(j = 0; j < banned_hosts_count; j++){
		if(image.src.indexOf(banned_hosts[j]) >= 0){
			image.style.border = "medium solid red";
		}
	}
}

// Auto update script by sizzlemctwizzle (http://userscripts.org/scripts/show/38017)

CheckScriptForUpdate = {
 id: '38017', // Script id on Userscripts.org
 days: 1, // Days to wait between update checks
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