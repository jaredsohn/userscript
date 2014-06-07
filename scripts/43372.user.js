scr_meta=<><![CDATA[
// ==UserScript==
// @name           Smiley Script Constructor for Orkut
// @namespace      Swashata
// @version        1.4.2
// @author	   Team Blakut
// @description    Get the  Image Links in plane Text Format at the right hand side of the Album page with the readymade format for pasting in smiley script :D
// @include        http://picasaweb.google.*/*/*
// ==/UserScript==
]]></>;
//Change Log 1.4.0
/*
Now smileyarr[1] will be replaced by smileyarr[Name of the smiley]
Trying to exclude the .gif .png extentions*/
//get all script tags
var scripts=document.getElementsByTagName('script');

//define what to search for (start and end)
var searchFor='\"plain\",\"';
var endFor=',\"height\"';

for (var i=0; i<scripts.length; i++) {
  //does the searchstring exists in the script text?
  if (scripts[i].text.indexOf(searchFor)>0) {
     
     var scriptText=scripts[i].text;
     var y=0;

     //cut every text between start and end out of the script text
     while(scriptText.indexOf(searchFor)>0) {
       y=y+1;
       var whole=scriptText.substring(scriptText.indexOf(searchFor)+searchFor.length);
       whole=whole.substring(0,whole.indexOf(endFor));

//I have cut the whole to avoid conflict after the next loop

	var searchForlink='\"content\":[{\"url\":\"';
	var endForlink='\"';

	var link=scriptText.substring(scriptText.indexOf(searchForlink)+searchForlink.length);
	link=link.substring(0,link.indexOf(endForlink));

	var searchForname='\"plain\",\"title\":\"';

	var naming=scriptText.substring(scriptText.indexOf(searchForname)+searchForname.length);
	naming=naming.substring(0,naming.indexOf(endForlink));
//Remove the extensions
	naming=naming.replace(/.gif/gi, '');
	naming=naming.replace(/.png/gi, '');
	naming=naming.replace(/.jpg/gi, '');
	naming=naming.replace(/.jpeg/gi, '');

    
       //create a new text link with the cutted text
       var a = document.createTextNode('smileyarr["'+naming +'"]="' +link +'";');
       document.getElementById('lhid_album_title').parentNode.appendChild(a);
       a.parentNode.appendChild(document.createElement('br'));
       
       //now its time to redefine scriptText excluding the used part!
       scriptText=scriptText.substring(scriptText.indexOf(searchFor)+searchFor.length+whole.length)

    }

  }
}


//////////////////
//Auto Updater///
////////////////
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '43372', // Script id on Userscripts.org
 days: 7, // Days to wait between update checks
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