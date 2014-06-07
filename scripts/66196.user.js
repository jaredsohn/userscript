// ==UserScript==
// @name           Radio Deejay 50Songs ComboBox
// @namespace      marcoratto
// @description    List the 50Songs Hit List of Radio Deejay
// @include        http://www.youtube.com*
// @require        http://marcoratto.googlecode.com/svn/trunk/Greasemonkey/Log4GM/Log4GM.js
// @version        0.4
// @date           2010-01-11
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/57682
// ==/UserScript==

var Log4GM = {
    
	 // Only for this class
    INTERNAL : 6,

	 // Severe errors that cause premature termination. Expect these to be immediately visible on a status console.     
    FATAL : 5,
    
	 // Other runtime errors or unexpected conditions. Expect these to be immediately visible on a status console.
    ERROR : 4,
    
	 // Use of deprecated APIs, poor use of API, 'almost' errors, other runtime situations that are undesirable or unexpected, but not necessarily "wrong". Expect these to be immediately visible on a status console.     
    WARN : 3,
    
	 // Interesting runtime events (startup/shutdown). Expect these to be immediately visible on a console, so be conservative and keep to a minimum.
    INFO : 2,

    // Detailed information on flow of through the system. Expect these to be written to logs only.    
    DEBUG : 1,

    // Detailed information on flow of through the system. Expect these to be written to logs only.     
    TRACE : 0,
	 	 	 
    LEVEL_NAMES : new Array("TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "INTERNAL"),
	 	 
	 loggingLevel : this.TRACE, 
	 
	 log : function (level, message) {
	   if (level < this.TRACE || level > this.INTERNAL) {
         alert("Logging level must be between TRACE(" + this.DEBUG + ") and FATAL(" + this.FATAL + ")");
      }
      if ((level < this.loggingLevel) && (level != this.INTERNAL)) {
            return;
      }
	   if (typeof GM_log == 'function') {
		   GM_log(this.LEVEL_NAMES[this.loggingLevel] + "-" + message); 
	   } else {
		   alert(this.LEVEL_NAMES[this.loggingLevel] + "-" + message);
	   }
   },
	
	setLoggingLevel : function (level) {
        if (level < this.TRACE || level > this.FATAL) {
            return;
        }
        this.loggingLevel = level;
		  this.log(this.INTERNAL, "Level set to " + this.LEVEL_NAMES[this.loggingLevel]);
   },
	
	getLoggingLevel : function () {
        return this.loggingLevel;
   },
	
	trace : function (message) {
    	this.log(this.TRACE, message);    	
   }, 
	
	debug : function (message) {
    	this.log(this.DEBUG, message);    	
   },
	
	info : function (message) {
    	this.log(this.INFO, message);    	
   }, 
	
	warn : function (message) {
    	this.log(this.WARN, message);    	
   },
	
	error : function (message) {
    	this.log(this.ERROR, message);    	
   },
	
	fatal : function (message) {
    	this.log(this.FATAL, message);    	
   }
	
}

var RadioDeejay50Songs = {

    // Change this to the number given to the script by userscripts.org (check the address bar)
    SUC_script_num : 66196, 

    // init script
    init : function() {

      Log4GM.trace("init(): start");
		
      this.checkForUpdate();
      this.addHTML();
      // this.addDownloadButton();
      Log4GM.trace("init(): end");
    },

        addHTML : function  () {
        Log4GM.trace("addHTML(): start");
        // find the form field
        var item = null;
        item = document.getElementById('masthead-search-term');
        if (item == null) {
          Log4GM.warn("addHTML(): why 'masthead-search-term' is null?");
        } else {
          item.parentNode.insertBefore(this.generateCombo(item), item.nextSibling);
          this.populateCombo();
        }
      Log4GM.trace("addHTML(): end");
        },
    
    generateOption : function (text, value) {
        Log4GM.trace("generateOption(): start");
        var newOption = document.createElement('option');
        newOption.value = value;
        var theText = document.createTextNode(text);
        newOption.appendChild(theText);
        Log4GM.trace("generateOption(): end");
        return newOption;
    }, 

    generateCombo : function (item) {
       Log4GM.trace("generateCombo(): start");
    
        var obj = document.createElement('select');
        obj.name = 'listSaved';
        obj.id = 'listSaved';
                    
        obj.addEventListener('click', function(event) {
           var index = this.options.selectedIndex;
            if (index > 0) {
                var valueSelected = this.options[index].value;
                Log4GM.debug("generateCombo(): valueSelected=" + valueSelected);
                document.getElementById('masthead-search-term').value = valueSelected;
                
                unsafeWindow.document.searchForm.submit();

            }
    }, false);
    
       Log4GM.trace("generateCombo(): end");
       return obj;
   }, 
   
    populateCombo : function() {
      Log4GM.trace("populateCombo(): start");
      
      var objCombo = document.getElementById('listSaved');
      objCombo.options.length = 0;
      objCombo.appendChild(this.generateOption("Radio Deejay (50 Songs)", ""));
      objCombo.appendChild(this.generateOption("Wait!I'm loading the data...", ""));
      
      this.download();
      
      Log4GM.trace("populateCombo(): end");
    }, 
    
    download : function() {
      Log4GM.trace("download(): start");
    
          var pUrl = 'http://marcoratto.co.uk/tidy/50songs2json.php';
          
          Log4GM.debug("downloadPage(): starting download " + pUrl);
          GM_xmlhttpRequest({
              method: "GET",
              url: pUrl,
              headers: {
                  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                  'Accept': 'application/xml,text/xml',
              },        
              onload: function(results) {
                  Log4GM.trace("downloadPage(): download finished.");
                  Log4GM.debug("downloadPage(): results.status=" + results.status);
                  
                  Log4GM.debug("downloadPage(): Readed " + results.responseText.length + " bytes.");
                  Log4GM.debug("downloadPage(): Buffer:" + results.responseText);
                  
                  try {
                    var objCombo = document.getElementById('listSaved');
                    var entries = eval('(' + results.responseText + ')');
                    RadioDeejay50Songs.songs = entries;
                    Log4GM.debug("downloadPage():entries.length=" + entries.length);
                    
                    objCombo.options.length = 0;
                    objCombo.appendChild(RadioDeejay50Songs.generateOption("Radio Deejay (50 Songs)", ""));
                    for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        var songPosition = entries[i].position;
                        var songTitle = entries[i].title;
                        var songAuthor = entries[i].singer;
                        Log4GM.debug("downloadPage():songPosition=" + songPosition);
                        Log4GM.debug("downloadPage():songTitle=" + songTitle);
                        Log4GM.debug("downloadPage():songAuthor=" + songAuthor);                        
                        objCombo.appendChild(RadioDeejay50Songs.generateOption(songPosition + "," + songAuthor + "," + songTitle, songAuthor + " - " + songTitle));
                        }
                  } catch (e) {
                    Log4GM.error("downloadPage(): Error!" + e);
                  }                
              }
          });
        Log4GM.trace("downloadPage(): end");
    },
    
    checkForUpdate : function() {
      if (this.SUC_script_num == 0) {
        Log4GM.info("SUC_script_num is ZERO. Skipped!");
        return;
      }
      try
      {
          function updateCheck(forced)
          {
              if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
              {
                  try {
                      var pUrl = 'http://userscripts.org/scripts/source/' + RadioDeejay50Songs.SUC_script_num + '.meta.js';
							 Log4GM.info("url=" + pUrl);
							 
							 GM_xmlhttpRequest({
                          method: 'GET',
                          url: pUrl,
                          headers: {'Cache-Control': 'no-cache'},
                          onload: function(resp)
                          {
                              var local_version, remote_version, rt, script_name;
                              
                              rt=resp.responseText;
                              GM_setValue('SUC_last_update', new Date().getTime()+'');
                              remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                              local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
                              if(local_version!=-1)
                              {
                                  script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                                  GM_setValue('SUC_target_script_name', script_name);
                                  if (remote_version > local_version)
                                  {
                                      if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
                                      {
                                          GM_openInTab('http://userscripts.org/scripts/show/' + RadioDeejay50Songs.SUC_script_num);
                                          GM_setValue('SUC_current_version', remote_version);
                                      }
                                  }
                                  else if (forced)
                                      alert('No update is available for "'+script_name+'."');
                              }
                              else
                                  GM_setValue('SUC_current_version', remote_version+'');
                          }
                      });
                  } catch (err) {
                      if (forced) {
                          alert('An error occurred while checking for updates:\n'+err);
                      }
                  }
              }
          }
          GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Radio Deejay 50songs') + ' - Manual Update Check', function()
          {
              updateCheck(true);
          });
          Log4GM.info("Check for update...");
          updateCheck(false);
      } catch(err) {
          debug(err.description);
      }    
    }   
}

Log4GM.setLoggingLevel(Log4GM.WARN);

RadioDeejay50Songs.init();		
