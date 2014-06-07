// ==UserScript==
// @name           Radio_Deejay_50_Songs_mp3skull
// @namespace      marcoratto
// @description    Button MP3skull for Radio Deejay 50 Songs
// @include        http://www.deejay.it/dj/radio/programma/classifiche/11/50-Songs*
// @version        0.8
// @date           2012-02-01
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// ==/UserScript==


var SUC_script_num = 124422; // Change this to the number given to the script by userscripts.org (check the address bar)


var Config = {

	setValue : function (key, value) {
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
	        localStorage[key] = value;
	  } else {
		GM_setValue(key, value);
	  }
	  Log4GM.info(key + " set with value " + value);
	},

	getValue : function (key, defaultValue) {
	   var out = defaultValue;
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
		out = localStorage[key] || defaultValue;
	  } else {
		out = GM_getValue(key, defaultValue);
	  }
	  Log4GM.info(key + " return has value " + out);
	  return out;
	}
}

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

function updateCheck(forced) {
	Log4GM.info("updateCheck:" + forced);
		if (SUC_script_num == 0) {
			Log4GM.info("SUC_script_num is ZERO. Skipped!");
        		return;
		}

		// Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		if ((forced) || (parseInt(Config.getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime())))  {
			try {
				GM_xmlhttpRequest(
				{



					method: 'GET',



					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js',



					headers: {'Cache-Control': 'no-cache'},



					onload: function(resp)



					{



						var local_version, remote_version, rt, script_name;



						



						rt=resp.responseText;



						Config.setValue('SUC_last_update', new Date().getTime()+'');



						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);



						local_version=parseInt(Config.getValue('SUC_current_version', '-1'));



						if(local_version!=-1)



						{



							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];



							Config.setValue('SUC_target_script_name', script_name);



							if (remote_version > local_version)



							{



								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))



								{



									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);



									Config.setValue('SUC_current_version', remote_version);



								}



							}



							else if (forced)



								alert('No update is available for "'+script_name+'."');



						}



						else



							Config.setValue('SUC_current_version', remote_version+'');



					}



				});



			}



			catch (err)



			{



				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}


	  if (!GM_registerMenuCommand || (GM_registerMenuCommand.toString && GM_registerMenuCommand.toString().indexOf("not supported")>-1)) {
		Log4GM.warn("GM_registerMenuCommand not supported. Skipped!");
	  } else {
		GM_registerMenuCommand(Config.getValue('SUC_target_script_name', 'Button MP3skull for Radio Deejay 50 Songs') + ' - Manual Update Check', function() {
			updateCheck(true);
		});
	  }

function main() {
    Log4GM.trace("start");
    var allSingers, allTitles, thisElement;
	  		  
    allSingers = document.evaluate("/html/body//div[@id='page']/div/div[1]/div[1]/div/ol//span[4]/strong",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    if ((allSingers == null) || (allSingers.snapshotLength == 0)) {
    	Log4GM.warn("The xpath return an empty list!");
	return;
    }

    Log4GM.info("Found " + allSingers.snapshotLength + " elements for singers.");

    // /html/body//div[@id='page']/div/div[1]/div[1]/div/ol/li[" + $index.to_s() + "]/span[4]/em
    allTitles = document.evaluate("/html/body//div[@id='page']/div/div[1]/div[1]/div/ol//span[4]/em",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

    Log4GM.info("Found " + allTitles.snapshotLength + " elements for titles.");

    for (var i = 0; i < allTitles.snapshotLength; i++) {
        var songAuthorItem = allSingers.snapshotItem(i);
	var songTitleItem = allTitles.snapshotItem(i);

	var songAuthor = trim(songAuthorItem.innerHTML);
	var songTitle = trim(songTitleItem.innerHTML);
	Log4GM.debug("songAuthor=" + songAuthor);
	Log4GM.debug("songTitle=" + songTitle);

	var aStartPos = songAuthor.indexOf("title=\"\">");
	var aEndPos = songAuthor.indexOf("</a>");
	if ((aStartPos != -1) && (aEndPos != -1)) {
		songAuthor = songAuthor.substring(aStartPos+9, aEndPos);
		Log4GM.debug("songAuthor=" + songAuthor);
	}

	songAuthor = trim(songAuthor.replace(/[^a-z|^A-Z|^0-9|^\ |^\'^\.]/g, ""));
	Log4GM.debug("songAuthor=" + songAuthor);

	    var newElement = document.createElement("a");
	    newElement.href="http://mp3skull.com/search.php?q=" + escape (songAuthor + " - " + songTitle);
	    newElement.target="_new";
	    
	    // add text to our link
	    var logo = document.createElement('img');
	    logo.src = "data:image/gif;base64,R0lGODlhEAAQAMZ9AAwoSwkrUgYwXAcwXQ8vVhUvThY6ZRc7ZBc9aBc+aRY+bhZBdRpCcCtLdC1N" +
	    "dzdOajFRdzlTdC9WhTlVdkFUaTpVdDJZhT1bgUdacDtdhjthjUZgfUZggElhgUhigT5kjkZijk5i" +
	    "fEZjj0lliElmh01sk1pxjlxylFxylV51j193l2d3lF97nWV+m2OApmaBpXOFnXCJpneIqHiLtnqM" +
	    "t3uMtXqNunuNun2OtnuPuX6QtH6TvISUuYSVw4iXyI+e0JmlxZel2aWx46ay46+43bG88bO89bO9" +
	    "87O99bS99LS99bW99bS+8rW+9bW+9rW/9ba/9ba/97e/+LbA9bfA9rfA97fB9bjB97nB+rjC97nC" +
	    "9brC+rrD9brD9rvD9bvE9bzE87vE97zE9rzE/LzF9r7F9b/G9L7G97/G9b7G/L/G/b7H/cDI9cHI" +
	    "9cLK7sHJ/sTL78TL+sPL/cfM/sbN/cfO9cjP9cjO/8jP/8nP/svR/M3T+9PZ/////////////yH+" +
	    "EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAAQABAAAAe1gH+Cg38bFSmEiYIeHCcoJhOK" +
	    "gxeDdIIqLYosf2NOSUhKWH8viRp/c0ZNT1BPTVt/H4MSFn9SU1peX1xWSnEuC38xCiV/UV1lbG1o" +
	    "YlRpfwwZJAYjRVlgenV2e2Zaan8HEDABHXk+DTlucDsOPXgyBBF/DwVEQQgCPDoDCT98IQCDMKwI" +
	    "Y2MGjho0blwBQkHSmjsiQOR5I0eSICpHhghh8sTioCZVqijxOIiKkiVNSA46Q0ZSIAA7";
	    
	    logo.lowsrc = 'data:image/gif;base64,R0lGODlhDQAOAJEAANno6wBmZgAAAAAAACH5BAAAAAAALAAAAAANAA4AQAIjjI8Iyw3GhACSQecutsFV3nzgNi7SVEbo06lZa66LRib2UQAAOw%3D%3D';
	    logo.alt = 'MP3Skull';
	    logo.setAttribute("style", "vertical-align:middle");
	    
	    newElement.appendChild(logo);
	    
	    var newColumn = document.createElement("span");
	    // newColumn.setAttribute("class", "song");
	    newColumn.setAttribute("style", "vertical-align:middle");
	    
	    newColumn.appendChild(newElement);

	    songTitleItem.parentNode.insertBefore(newColumn, songTitleItem.nextSibling);

    }
    	    
    Log4GM.trace("end");
}


function trim(value) {
    var val = new Array();
    var len = value.length;
    var st = 0;
    var off = 0;

    for (var j=0; j<len; j++) {
      val[j] = value.substring(j, j+1);
    }

    while ((st < len) && (val[off + st].indexOf(" ") != -1)) {
        st++;
    }
    while ((st < len) && (val[off + len - 1].indexOf(" ") != -1)) {
        len--;
    }
    return ((st > 0) || (len < value.length)) ? value.substring(st, len) : value;
}

Log4GM.setLoggingLevel(Log4GM.TRACE);

try {
	updateCheck(false);
} catch(err) {
	Log4GM.error(err.description);
}

window.addEventListener("load", main, false);
