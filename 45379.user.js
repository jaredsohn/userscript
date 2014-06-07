scr_meta=<><![CDATA[
// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      Swashata
// @version        0.0.1
// @description    You can use emoticons in Blogger!! Fixed the issue which used to cause the text size to stop work
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==
]]></>;

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton("arrow", "http://wolverinex02.googlepages.com/icon_arrow.gif");
	buttons += emoticonButton("biggrin", "http://wolverinex02.googlepages.com/icon_biggrin.gif");
	buttons += emoticonButton("confused", "http://wolverinex02.googlepages.com/icon_confused.gif");
	buttons += emoticonButton("cool", "http://wolverinex02.googlepages.com/icon_cool.gif");
	buttons += emoticonButton("cry", "http://wolverinex02.googlepages.com/icon_cry.gif");
	buttons += emoticonButton("eek", "http://wolverinex02.googlepages.com/icon_eek.gif");
	buttons += emoticonButton("evil", "http://wolverinex02.googlepages.com/icon_evil.gif");
	buttons += emoticonButton("exclaim", "http://wolverinex02.googlepages.com/icon_exclaim.gif");
	buttons += emoticonButton("idea", "http://wolverinex02.googlepages.com/icon_idea.gif");
	buttons += emoticonButton("lol", "http://wolverinex02.googlepages.com/icon_lol.gif");
	buttons += emoticonButton("mad", "http://wolverinex02.googlepages.com/icon_mad.gif");
	buttons += emoticonButton("mrgreen", "http://wolverinex02.googlepages.com/icon_mrgreen.gif");
	buttons += emoticonButton("neutral", "http://wolverinex02.googlepages.com/icon_neutral.gif");
	buttons += emoticonButton("question", "http://wolverinex02.googlepages.com/icon_question.gif");
	buttons += emoticonButton("razz", "http://wolverinex02.googlepages.com/icon_razz.gif");
	buttons += emoticonButton("rolleyes", "http://wolverinex02.googlepages.com/icon_rolleyes.gif");
	buttons += emoticonButton("redface", "http://wolverinex02.googlepages.com/icon_redface.gif");
	buttons += emoticonButton("sad", "http://wolverinex02.googlepages.com/icon_sad.gif");
	buttons += emoticonButton("smile", "http://wolverinex02.googlepages.com/icon_smile.gif");
	buttons += emoticonButton("surprised", "http://wolverinex02.googlepages.com/icon_surprised.gif");
	buttons += emoticonButton("twisted", "http://wolverinex02.googlepages.com/icon_twisted.gif");
	buttons += emoticonButton("wink", "http://wolverinex02.googlepages.com/icon_wink.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<a href='javascript:;' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></a>\n";
}

function separator() {
//  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
  return "<br/>"
}

setemoticons("labels-container");

 }, false);


//////////////////
//Auto Updater///
////////////////
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '45379', // Script id on Userscripts.org
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