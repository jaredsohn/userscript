// ==UserScript==
// @name           BrowserBookmarks
// @namespace      marcoratto
// @description    Browser Bookmarks Persistence
// @version        0.14
// @date           2010-10-20
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*
// @include        https://*
// @include        ftp://*
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
        
    'loggingLevel' : this.TRACE,
        
    'log' : function (level, message) {
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
   
   'setLoggingLevel' : function (level) {
       if (level < this.TRACE || level > this.FATAL) {
           return;
       }
       this.loggingLevel = level;
       this.log(this.INTERNAL, "Level set to " + this.LEVEL_NAMES[this.loggingLevel]);
  },
   
   'getLoggingLevel' : function () {
       return this.loggingLevel;
  },
   
   'trace' : function (message) {
       this.log(this.TRACE, message);        
  },
   
   'debug' : function (message) {
       this.log(this.DEBUG, message);        
  },
   
   'info' : function (message) {
       this.log(this.INFO, message);        
  },
   
   'warn' : function (message) {
       this.log(this.WARN, message);        
  },    
   'error' : function (message) {
       this.log(this.ERROR, message);        
  },    
   'fatal' : function (message) {
       this.log(this.FATAL, message);        
  },
   'internal' : function (message) {
       this.log(this.INTERNAL, message);        
  },
   'init' : function(level) {
       this.loggingLevel = this.INTERNAL;
       var value = Config.getValue('Log4GM_level');
       this.internal("Log4GM_level=" + value);
       
       if (value == undefined) {
           this.setLoggingLevel(level);
       } else {
         try {
           this.loggingLevel = parseInt(value, 10);
         } catch (err) {
           this.internal("Error:" + err);
           this.setLoggingLevel(level);
         }
       }        
       Config.setValue('Log4GM_level', this.loggingLevel);
       this.internal("loggingLevel=" + this.loggingLevel);
   }
   
};

var Config = {

	setValue : function (key, value) {
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
	        localStorage.setItem(key, value);
	  } else {
		GM_setValue(key, value);
	  }
	  Log4GM.info(key + "=" + value);
	},

	getValue : function (key, defaultValue) {
	   var out = defaultValue;
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
		out = localStorage.getItem(key);
	  } else {
		out = GM_getValue(key, defaultValue);
	  }
	  Log4GM.info(key + "=" + out);
	  return out;
	}
}

const Persist = {
   'send':function(url, data, onLoad, onError)
   {
       var postData = '';
       var sep = '';
       for ( var name in data ) {
           postData += sep + name + '=' + encodeURIComponent(data[name]);
           sep = '&';
       }

       Log4GM.debug("Persist.get():url=" + url);
       Log4GM.debug("Persist.get():postData=" + postData);
       GM_xmlhttpRequest({
           'url':url,
           'method':'post',
           'headers':{
               'Content-Type':'application/x-www-form-urlencoded'
           },
           'data': postData,
           'onload':function(e)
           {
               if (/^2/.test(e.status))
                   onLoad && onLoad(e);
               else if (onError)
                   onError(e);
           },
           'onerror':onError
       });
   }
};

// Change this to the number given to the script by userscripts.org (check the address bar)
const SUC_script_num = 0;

   var enabled;
   var db_host;
   var db_user;
   var db_pass;
   var db_url;
    var db_sid;
    var nickname;
   
    // init script
    function init() {
       Log4GM.trace("init(): start");
       
       enabled = Config.getValue('Enabled');
       Log4GM.debug("generate():enabled=" + enabled);
       
       if (enabled == undefined) {      
           Config.setValue('Enabled', 'true');
       }
       
       if (enabled != "true") {
           Log4GM.debug("Disabled. Exit.");
           return;
       }
       db_host = Config.getValue('Persist_Host');
       db_url = Config.getValue('Persist_Url');
       db_sid = Config.getValue('Persist_Sid');
       db_user = Config.getValue('Persist_User');
       db_pass = Config.getValue('Persist_Pass');
       nickname = Config.getValue('Nickname');
   
   Log4GM.debug("db_host=" + db_host);
   Log4GM.debug("db_url=" + db_url);
   Log4GM.debug("db_sid=" + db_sid);
   Log4GM.debug("db_user=" + db_user);
   Log4GM.debug("db_pass=" + db_pass);
   Log4GM.debug("nickname=" + nickname);
   
   if (db_host == undefined) {            
       db_host = prompt("Enter the Host of the DB of persist:", "");
       
       // For changing:
       // about:config
       // greasemonkey.scriptvals.marcoratto/....
       Config.setValue('Persist_Host', db_host);
   }
   if (db_url == undefined) {        
       db_url = prompt("Enter the url of persist:", "");
       
       // For changing:
       // about:config
       // greasemonkey.scriptvals.marcoratto/....
       Config.setValue('Persist_Url', db_url);
   }

   if (db_sid == undefined) {        
       db_sid = prompt("Enter the sid of persist:", "");
       
       // For changing:
       // about:config
       // greasemonkey.scriptvals.marcoratto/....
       Config.setValue('Persist_Sid', db_sid);
   }

   if (db_user == undefined) {        
       db_user = prompt("Enter the username of persist:", "");
       
       // For changing:
       // about:config
       // greasemonkey.scriptvals.marcoratto/....
       Config.setValue('Persist_User', db_user);
   }
       
   if (db_pass == undefined) {        
       db_pass = prompt("Enter the password of persist:", "");
       
       // For changing:
       // about:config
       // greasemonkey.scriptvals.marcoratto/....
       Config.setValue('Persist_Pass', db_pass);
   }

   if (nickname == undefined) {        
       nickname = prompt("Enter your nickname:", "");
       
       // For changing:
       // about:config
       // greasemonkey.scriptvals.marcoratto/....
       Config.setValue('Nickname', nickname);
   }
       
       checkForUpdate();
   
   Log4GM.info("url=" + trim(this.location.href));

   var keywords = "";
   var description = "";
   var listOfMeta = document.getElementsByTagName("meta");
   if (listOfMeta != undefined) {
       for (var j=0; j<listOfMeta.length;j++) {
           var meta_name = listOfMeta[j].name.toLowerCase();
           Log4GM.trace("meta-" + j + "=" + meta_name);
           if (meta_name == "keywords") {
               keywords = trim(listOfMeta[j].content);
           } else if (meta_name == "description") {
               description = trim(listOfMeta[j].content);
           }
       }
   }
   Log4GM.info("keywords=" + keywords);
   Log4GM.info("description=" + description);
   
   var host = this.location.host;
   Log4GM.info("host=" + host);
   
   var hostname = this.location.hostname;
   Log4GM.info("hostname=" + hostname);
   
   var pathname = this.location.pathname;
   Log4GM.info("pathname=" + pathname);
   
   var port = this.location.port;
   Log4GM.info("port=" + port);
   
   var protocol = this.location.protocol;
   Log4GM.info("protocol=" + protocol);
   
   var search = trim(this.location.search);
   Log4GM.info("search=" + search);
   
   var target = this.location.target;
   Log4GM.info("target=" + target);
   
   var href = trim(this.location.href);
   Log4GM.info("href=" + href);

   var now = getTimestamp();
   
   var sql = "insert into browser_bookmarks (created, nickname,hostname,protocol,port,search,pathname,url,keywords,description) values ('" + now + "','" + nickname + "','" + hostname + "','" + protocol + "','" + port + "','" + search + "','" + pathname + "','" + href + "','" + quote(keywords) + "','" + quote(description) + "'" + ");";
   Log4GM.info("sql=" + sql);

       Persist.send(db_url,
       {'db_host': db_host,
        'db_user': db_user,
       'db_pass': db_pass,
       'db_sid': db_sid,
       'db_query': sql
       },    
       function(e) {
               Log4GM.info("saveData():" + e.responseText);
           }, function(e) {
               Log4GM.error('An error has occurred. Try again later.');
           });
   
     Log4GM.trace("init(): end");
 }    

  function format_two_digit(x) {
	return ((x<10) ? "0" : "") + x;
  }

  function getTimestamp() {
	var d=new Date();
        Log4GM.info("now=" + d.toUTCString());
	var now_d = d.getDate();
	var now_m = d.getMonth();
	var now_y = d.getFullYear();
	var now_hh = d.getHours();
	var now_mm = d.getMinutes();
	var now_ss = d.getSeconds();
	var now_ms = d.getMilliseconds();
	var out = now_y + "-" + format_two_digit(now_m) + "-" + format_two_digit(now_d) + " " + format_two_digit(now_hh) + ":" + format_two_digit(now_mm) + ":" + format_two_digit(now_ss);
        return out;
  }
   
  function checkForUpdate () {
       Log4GM.trace("checkForUpdate(): start");
     if (SUC_script_num == 0) {
       Log4GM.info("SUC_script_num is ZERO. Skipped!");
       return;
     }
     try {
         function updateCheck(forced) {
             if ((forced) ||
                     (parseInt(Config.getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms) {
                 try {
                     GM_xmlhttpRequest( {
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
                             if(local_version != -1) {
                                 script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                                 Config.setValue('SUC_target_script_name', script_name);
                                 if (remote_version > local_version) {
                                     if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
                                         GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
                                         Config.setValue('SUC_current_version', remote_version);
                                     }
                                 } else if (forced)
                                     alert('No update is available for "'+script_name+'."');
                             } else {                                        
                                 Config.setValue('SUC_current_version', remote_version+'');
                                       }
                         }
                     });
                 } catch (err) {
                     if (forced) {
                         alert('An error occurred while checking for updates:\n'+err);
                     }
                 }
         }          
         GM_registerMenuCommand(Config.getValue('SUC_target_script_name', 'Browser Bookmarks') + ' - Manual Update Check', function()
         {
             updateCheck(true);
         });
         Log4GM.info("Check for update...");
         updateCheck(false);
     } catch(err) {
         Log4GM.fatal(err);
     }    
       Log4GM.trace("checkForUpdate(): end");
    }

function trim(str, chars) {
   return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
   chars = chars || "\\s";
   return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
   chars = chars || "\\s";
   return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function quote(str) {
   return str.replace(new RegExp("[']", "g"), "\\'");
}

Log4GM.init(Log4GM.TRACE);
     
init();

