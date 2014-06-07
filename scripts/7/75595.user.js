// ==UserScript==
// @name           GrabCambridge
// @namespace      marcoratto
// @description    Grab Cambridge MP3 voices
// @include        http://dictionary.cambridge.org/dictionary/*
// @homepage       http://userscripts.org/scripts/show/75595
// @date           2010-04-30
// @version        0.3
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
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

var GrabCambridge = {

    // Change this to the number given to the script by userscripts.org (check the address bar)
    SUC_script_num : 75595, 

    // init script
    init : function() {

      Log4GM.trace("init(): start");
		
      this.checkForUpdate();
      this.addHTML();
      // this.addDownloadButton();
      Log4GM.trace("init(): end");
    },
	 
	 gup : function( name ) {
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)";
		  var regex = new RegExp( regexS );
		  var results = regex.exec( window.location.href );
		  if( results == null )
			 return "";
		  else
			 return unescape(results[1]);
		},

    addHTML : function  () {
        Log4GM.trace("addHTML(): start");
		  	
        // find the form field
var items = document.body.getElementsByTagName('img');
for(i in items) {
	var item = items[i];
	Log4GM.debug(item.alt);
	var pos = item.alt.indexOf('UK pronunciation');
	if (pos != -1) {
		// build our 'scan barcode' helper button
		// then insert it after the query form field
		// var helper = generate(item);
		// item.parentNode.insertBefore(helper, item.nextSibling);
		var onclick = item.getAttribute("onclick");
		Log4GM.debug(onclick);
		var startPos = onclick.indexOf("('") + 2;
		var endPos = onclick.indexOf("',");
		Log4GM.debug(startPos);
		Log4GM.debug(endPos);
		var mp3File = onclick.substring(startPos, endPos);
		Log4GM.debug(mp3File);
		
		Log4GM.debug("addHTML():" + document.location.href);
		Log4GM.debug("addHTML():" + document.location.protocol);
		Log4GM.debug("addHTML():" + document.location.hostname);
		Log4GM.debug("addHTML():" + document.location.port);
		Log4GM.debug("addHTML():" + document.location.pathname);		
		var url = document.location.protocol + "://" + document.location.hostname + mp3File; 		
		Log4GM.debug("addHTML():" + url);
		item.setAttribute("onclick", "javascript:window.open('" + mp3File + "');");
		
		var newElement = document.createElement("a");
	    newElement.href = mp3File;
	    newElement.target = "_new";
		 
		 var logo = document.createElement('img');
	    logo.src = "data:image/gif;base64," +
						"R0lGODlhEAAQAOMIAAAAAAAAgAAA/wCAAH9/fwD/AMDAwPj4+P//////////////////////////" +
						"/////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAgALAAAAAAQABAAAARDEMmJQgA00yCw1pz3" +
						"bd04WSEgfpxQmlI4EnQN1LVEGHzv84TbYUgsDmm3329QQO6UP6cBR91JjcZpsMoNSlTgcFgSAQA7";
	    
	    logo.lowsrc = 'data:image/gif;base64,R0lGODlhDQAOAJEAANno6wBmZgAAAAAAACH5BAAAAAAALAAAAAANAA4AQAIjjI8Iyw3GhACSQecutsFV3nzgNi7SVEbo06lZa66LRib2UQAAOw%3D%3D';
	    logo.alt = 'Grab Cambridge';
		 logo.setAttribute("border", "0");
	    
	    newElement.appendChild(logo);
	    	    
	    item.parentNode.insertBefore(newElement, item.nextSibling);
	}
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

    generateButton : function (item) {
       Log4GM.trace("generateButton(): start");
    
        var obj = document.createElement('input');
		  obj.type = 'button';
        obj.name = 'grab';
        obj.id = 'grab';
		  
		  	var allLinks;
	  
        allLinks = document.evaluate("/html/body/div[1]/table[@id='Results']/tbody//td",
											 document,
											 null,
											 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
											 null);
					
		  Log4GM.info("generateButton():allLinks.snapshotLength=" + allLinks.snapshotLength);
                   
       Log4GM.trace("generateButton(): end");
       return obj;
   }, 
   
    populate : function() {
      Log4GM.trace("populateCombo(): start");
      
		  var url = document.location.href;
		  Log4GM.debug("addHTML():" + url);
		  
		  var Series_Name = GrabCambridge.gup('Series_Name');
		  Log4GM.debug("addHTML():" + Series_Name);
		  
		  var Book_No = GrabCambridge.gup('Book_No');
		  Log4GM.debug("addHTML():" + Book_No);		  		
		  
		var allLinks = document.evaluate("/html/body/div[1]/table[@id='Results']/tbody/tr",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
		if (allLinks != null) {
			for (var i = 0; i < allLinks.snapshotLength; i++) {
					var thisElement = allLinks.snapshotItem(i);
					if (thisElement.innerHTML != "<td>&nbsp;</td>") {
					Log4GM.debug("addHTML():" + thisElement.innerHTML);
					Log4GM.debug("addHTML():" + thisElement.id);
					
					var newElement = document.createElement("a");
	    newElement.href="http://www.htmlc0mics.com/" + escape(Series_Name) + "/" + escape(Book_No) + "/" + thisElement.id + ".jpg";
	    newElement.target="_new";
	    
	    // add text to our link
	    // var statusDivContent = document.createTextNode('You Tube');
	    // newElement.appendChild(statusDivContent);
	    var logo = document.createElement('img');
	    logo.src = "data:image/png;base64," +
						"iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A" +
						"/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEDxAfMss53xEAAAAZdEVYdENv" +
						"bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEG0lEQVRYw+2WT2gcVQDGfzOzu5lsujuTtZtN" +
						"TFLWJhBjMd0EWnNraEFz0uq5YG+VXhK9eAjYCEo82RZqUBFbC4ViwSJ4iKmhiSCkJZAueKjNapNK" +
						"NQ1JM7NJdv7tzPPQJhgDabbbgko+GBjevHnz4/vmzTewrW39zySVce/l2r2Nh8OhECE5hCJL/Dk7" +
						"x8qMcQp4+3EXDZUBpL/+yZuk4s+wc4fGDjXKqc+/4Eb/D5lyHCoHCDUcIRpR0Spj7IzpRJRw2ZHJ" +
						"/4bsy3HoNaD34XnG8TwKro1pLeMLH9f3ADLA1YdzeoFsKQ9QSgT6NP7G7q6GV1vTTa+8oMbqdGRJ" +
						"wg8CbM/hD3uB0POaGn0plXZCftq/szILjD1NoGk/7x7VXt5FrDGBJEkEQuD6RQquTbI6QcNzDdyd" +
						"nWXu65sGRfEWYD5NoJlgyTMcw+oOv1iNEIKi7+N4LiuuzZJT4Odfb/HLxz8hFr3uUuN6HKC9QNq7" +
						"u9LphgOVxkpc38P2XFYci1lznpufjZP2a7h///7o4wA96qXWgKNAV2tra1dbW5ve1tZGc3MzfX19" +
						"3Ku9y3JLgogSRpYk5q/c5kB1B2cunKGnp+fc0NAQwFdPbLfqun775MmT6UwmQyQSwXEcHMfB8zym" +
						"pqboffcd5N7dSJUhirk8tVd8Tp8+TXNzMwA9PT0MDQ0dLQVq08j2799/amBgAEVZP00Iga7r7Hq2" +
						"ke8HvyHSnoAvf+fD9z+grq4Oy7Koqanh0KFD5HK5w7lcbnqr8W0KVF9f33/kyBEqKyspFosboBoa" +
						"GqgSKj9+9C0n+t6jvb197VosFiMajXLw4MGSoKRHOCQuXbpEIpFAlmUMw8C2bWzbXhffP1VVVUUy" +
						"mUSWZWRZxrZtjh8/vqX4Nq0O3/cpFAosLi4SBAG6rqOqKqqqUlFRQUVFBeHw+v6KRqNomkaxWEQI" +
						"gRACVVU5f/48e/bsOVfWLpuamprOZrPp1Siqq6vRdR3DMDbMDYKAeDy+Br06JoRAlmWEEMTj8fLK" +
						"NZ/PHz527NiNyclJLMva4FQ8HieVStHU1ERLSwvJZBJJkrAsC8dxCIJgLTbf9wmCoOy2z5qm2fV3" +
						"qIWFhTWoSCSC53mYpolpmliWtQahKAqKopA1Jxi+9x1GwXwiQADmKtTExAS2bTM3N4dlWSwvL+O6" +
						"7poLiqKsg5Flmd8Kt5hfmie/lN8S0Farw3Ec5+LIyEh3R0dHbSqVelCsQYAkSRtgfN/HcRzy+TzB" +
						"HZnc2G0uXrjI2NhY/6Pav9T/Kk3TtNHBwcFMZ2cnsvzAYEmSHhRtscj09DTXrl3j+vXrZLPZGzMz" +
						"M6PA6mGW9R3aDOrs2bOZTCaDYRgMDw8zPj7O5ORkyQBPShpwed++fVeBE8CBh2Pb2ta2tvWf11/w" +
						"FOgy86wWywAAAABJRU5ErkJggg==";
	    
	    logo.lowsrc = 'data:image/gif;base64,R0lGODlhDQAOAJEAANno6wBmZgAAAAAAACH5BAAAAAAALAAAAAANAA4AQAIjjI8Iyw3GhACSQecutsFV3nzgNi7SVEbo06lZa66LRib2UQAAOw%3D%3D';
		 logo.setAttribute("border", "0");
		 logo.setAttribute("alt", "Grab");
		 logo.setAttribute("title", "Grab");
	    
	    newElement.appendChild(logo);	    
	    var newColumn = document.createElement("td");	    
	    newColumn.appendChild(newElement);
	    thisElement.parentNode.insertBefore(newColumn, thisElement.nextSibling);
					}
			}
		}
      
      Log4GM.trace("populateCombo(): end");
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
                      var pUrl = 'http://userscripts.org/scripts/source/' + GrabCambridge.SUC_script_num + '.meta.js';
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
                                          GM_openInTab('http://userscripts.org/scripts/show/' + GrabCambridge.SUC_script_num);
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
          GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Grab Cambridge') + ' - Manual Update Check', function()
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

Log4GM.setLoggingLevel(Log4GM.INFO);

GrabCambridge.init();		
