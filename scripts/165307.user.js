// ==UserScript==
// @name        B2B Intesa - Save Username Password
// @namespace   marcoratto
// @description Save Username Password on Intesa B2B
// @include     https://www.ivecocoll-dealer.intesa.it/login.jsp
// @include     https://www.ivecocoll-dealer.intesa.it/login_err.jsp
// @include     https://www.iveco-dealer.biz/login.jsp
// @include     https://www.iveco-dealer.biz/login_err.jsp
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @version        0.7
// @date           2013-06-17
// @namespace      marcoratto
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// ==/UserScript==

// Change this to the number given to the script by userscripts.org (check the address bar)
var SUC_script_num = 165307; 

var Log4GM = {
    
	 // Only for this class
    INTERNAL : 7,

	 // None
    NONE : 6,
    
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
	 	 	 
    LEVEL_NAMES : new Array("TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "NONE", "INTERNAL"),
	 	 
	 'loggingLevel' : this.TRACE, 
	 	 
	 'log' : function (level, message) {
	   if (level < this.TRACE || level > this.INTERNAL) {
         alert("Logging level must be between TRACE(" + this.TRACE + ") and NONE(" + this.NONE + ")");
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
        if (level < this.TRACE || level > this.NONE) {
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
	'setValue' : function (key, value) {
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
	        localStorage.setItem(key, value);
	  } else {
		GM_setValue(key, value);
	  }
	  this.internal(key + "=" + value);
	},

	'getValue' : function (key, defaultValue) {
	  var out = defaultValue;
	  if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {
		out = localStorage.getItem(key);
	  } else {
		out = GM_getValue(key, defaultValue);
	  }
	  this.internal(key + "=" + out);
	  return out;
	}
};

	function updateCheck(forced) {
		if (SUC_script_num == 0) {
			Log4GM.info("SUC_script_num is ZERO. Skipped!");
        		return;
		}

		// Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime())))  {
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

									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);

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
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}

function main() {
	Log4GM.trace("main():start");
	var items = document.body.getElementsByTagName('input');
    var flaggToAdd = true;
	for(i in items) {
		var item = items[i];
		if ((item.type == 'reset') && (flaggToAdd == true)) {
			flaggToAdd = false;			
			Log4GM.info("main():item Invio found.");
			var buttonWorkaround = getButtonWorkaround();
			item.parentNode.insertBefore(buttonWorkaround, item.nextSibling);
			
			var buttonReset = getButtonReset();
			item.parentNode.insertBefore(buttonReset, buttonWorkaround);
		}
	}
	Log4GM.trace("main():end");
}

/*
<input type="submit" name="SubmitCreds" value="Log On" onmouseout="this.className='btn'" onclick="clkLgn()" onmouseover="this.className='btnOnMseOvr'" id="SubmitCreds" onmousedown="this.className='btnOnMseDwn'" class="btn">
*/
function getButtonWorkaround() {
	Log4GM.trace("getButtonWorkaround():start");
	var helper = document.createElement('input');
	helper.type = 'button';
	helper.value = 'Workaround';
	helper.setAttribute("class", "bottone");
	helper.addEventListener('click', function(event) {	
        var hostname = location.hostname;
        Log4GM.info("hostname=" + hostname);
        
        var usernameObj = document.getElementsByName("username")[0];
        var jusernameObj = document.getElementsByName("j_username")[0];
        var passwordObj = document.getElementsByName("j_password")[0];
        
        var user = GM_getValue('Username_' + hostname);
        var pass = GM_getValue('Password_' + hostname);
        var lastUpdate = GM_getValue('LastUpdate_' + hostname);
        
        Log4GM.info("getButtonWorkaround():user=" + user);
        Log4GM.info("getButtonWorkaround():pass=" + pass);

            var oneMonth = 30 * 24 * 60 * 60 * 1000;	
        // Checks more than 1 month (30d * 24h * 60m * 60s * 1000ms)
        if ((user == undefined) ||
            (user == '') ||  
            (pass == undefined) ||
            (pass == '') ||  
                (parseInt(lastUpdate) + oneMonth <= (new Date().getTime()))) {
            user = prompt("Enter the username:", ((user == undefined) ? "" : user));
            pass = prompt("Enter the password:", ((pass == undefined) ? "" : pass));
            // For changing:
            // about:config
            // filter for:
            // B2B Intesa - Save Username Password
            GM_setValue('Username_' + hostname, user);
            GM_setValue('Password_' + hostname, pass);
            GM_setValue('LastUpdate_' + hostname, '' + new Date().getTime());
        }
        usernameObj.value = user;
        jusernameObj.value = user;
        passwordObj.value = pass;
        // Log4GM.info("Call the login button...");
        // document.frmLogin.submit();
	}, false);
	Log4GM.trace("getButtonWorkaround():end");	
	return helper;
}

function getButtonReset() {
	Log4GM.trace("getButtonReset():start");
	var helper = document.createElement('input');
	helper.type = 'button';
	helper.value = 'Reset';
	helper.setAttribute("class", "bottone");
	helper.addEventListener('click', function(event) {
		var hostname = location.hostname;
        Log4GM.info("hostname=" + hostname);

        var oneMonthAgo = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
        
        GM_setValue('LastUpdate_' + hostname, '' + oneMonthAgo);
		alert("Password set to expired!");
	}, false);
	Log4GM.trace("getButtonReset():end");	
	return helper;
}

Log4GM.setLoggingLevel(Log4GM.TRACE);

try {
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'B2B Save Username Password') + ' - Manual Update Check', 
		function() {
			updateCheck(true);
		});	
	Log4GM.info("Check for update...");
	updateCheck(false);
} catch(err) {
	Log4GM.error(err.description);
}

main();
