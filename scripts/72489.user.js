// ==UserScript==
// @name           Portal Team TR Collapsor
// @namespace      se.ericsson.wiki.trcollapsor
// @description    Collapses done trs
// @include        http://wiki.tcm.lab.tn.sw.ericsson.se/index.php/Portal_Team*
// @author         Gustav Axelsson egusaxe
// @version        1.0
// ==/UserScript==

(function ()
{
    var completedRows = [];
    var completedRowsHidden = true;
    
    function showHideCompletedRows()
    {
        try
        {
            var i;
            if (completedRowsHidden)
            {
                for (i = 0; i < completedRows.length; i += 1)
                {
                    completedRows[i].style.display = "table-row";
                }
            }
            else
            {
                for (i = 0; i < completedRows.length; i += 1)
                {
                    completedRows[i].style.display = "none";
                }
            }
            completedRowsHidden = !completedRowsHidden;
        }
        catch (error)
        {
            alert("showHideCompletedRows error " + error);
        }
    }
    
    function addToggleButton()
    {
        try
        {
            var toggleButton = document.createElement("button");
            toggleButton.appendChild(document.createTextNode("Show/hide completed TRs"));
            document.body.appendChild(toggleButton);
            toggleButton.style.position = "fixed";
            toggleButton.style.top = "0.1em";
            toggleButton.style.right = "0.1em";
            toggleButton.style.zIndex = "99";
            toggleButton.addEventListener("click", showHideCompletedRows, true);
            
        }
        catch (error)
        {
            alert("addToggleButton error " + error);
        }
    }
    
    function start ()
    {
        try
        {
            var trs = document.getElementsByTagName("tr"), tr, i;
            for (i = 0; i < trs.length; i += 1)
            {
                tr = trs[i];
                if (tr.style.background.length)
                {
                    completedRows[completedRows.length] = tr;
                    tr.style.display = "none";
                }
            }
        }
        catch (error)
        {
            alert(error);
        }
    }
    
    start();
    addToggleButton();
})();

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '72489', // Script id on Userscripts.org
 days: 7, // Days to wait between update checks
 
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