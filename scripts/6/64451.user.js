// ==UserScript==
// @name           websequencediagrams
// @namespace      marcoratto
// @description    Data Persistence For Web Sequence Diagrams
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @version        0.7
// @date           2013-03-24
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/57682
// @include        http://www.websequencediagrams.com/*
// ==/UserScript==

const StringToHex = {
	encode : function (input) {
		var output="";
		var c;
		for (var j=0;j<input.length;j++) {
			c = input.charCodeAt(j).toString(16);
			log4GM.trace("StringToHex.encode:c=" + c);			
			output =  ((c.length < 2) ? "0" : "") + c + output;
		}
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var c;
				 
		for (var j=0,i=1;(j<input.length/2);j++,i+=1) {
			c = input.substring(j*2, i*2);
			log4GM.trace("StringToHex.encode:s=" + c);			
			output = String.fromCharCode("0x"+ c) + output;
		}
		return output;
	}
}
	 
const Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

var log4GM = {
    
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
		var value = GM_getValue('Log4GM_level');
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
		GM_setValue('Log4GM_level', this.loggingLevel);
		this.internal("loggingLevel=" + this.loggingLevel);
	}
	
};

const Persist = {
	'send':function(url, data, onLoad, onError)
	{
		log4GM.debug("Persist.get():url=" + url);
		log4GM.debug("Persist.get():postData=" + postData);
		var postData = '';
		var sep = '';
		for ( var name in data ) {
			postData += sep + name + '=' + encodeURIComponent(data[name]);
			sep = '&';
		}

		log4GM.debug("Persist.get():url=" + url);
		log4GM.debug("Persist.get():postData=" + postData);
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
	const SUC_script_num = 64451;

	var enabled;
	var db_host;
	var db_user;
	var db_pass;
	var db_url;
	var db_sid;
	var nickname;
	var indexComboBox = -1;
	
    // init script
    function init() {
        log4GM.trace("init(): start");
        
        enabled = GM_getValue('Enabled');
        log4GM.debug("generate():enabled=" + enabled);
        
        if (enabled == undefined) {		
			GM_setValue('Enabled', 'true');
		} 
		
		if (enabled != "true") {
			log4GM.debug("Disabled. Exit.");
			return;
		}

	db_url = GM_getValue('Persist_Url');    
	db_host = GM_getValue('Persist_Host');
	db_user = GM_getValue('Persist_User');
	db_pass = GM_getValue('Persist_Pass');
    db_sid = GM_getValue('Persist_Sid');
	nickname = GM_getValue('Nickname');
	
	log4GM.debug("generate():db_host=" + db_host);
	log4GM.debug("generate():db_user=" + db_user);
	log4GM.debug("generate():db_pass=" + db_pass);
	log4GM.debug("generate():db_sid=" + db_sid);
	log4GM.debug("generate():db_url=" + db_url);
	log4GM.debug("generate():nickname=" + nickname);

	if (db_url == undefined) {		
		db_url = prompt("Enter the url of persist:", "");		
		// For changing:
		// about:config
		// greasemonkey.scriptvals.marcoratto/....
		GM_setValue('Persist_Url', db_url);
	}
	
	if (db_host == undefined) {		
		db_host = prompt("Enter the Host of the DB of persist:", "");
		
		// For changing:
		// about:config
		// greasemonkey.scriptvals.marcoratto/....
		GM_setValue('Persist_Host', db_host);
	}

	if (db_user == undefined) {		
		db_user = prompt("Enter the username of persist:", "");		
		// For changing:
		// about:config
		// greasemonkey.scriptvals.marcoratto/....
		GM_setValue('Persist_User', db_user);
	}
        
	if (db_pass == undefined) {		
		db_pass = prompt("Enter the password of persist:", "");
		
		// For changing:
		// about:config
		// greasemonkey.scriptvals.marcoratto/....
		GM_setValue('Persist_Pass', db_pass);
	}

	if (db_sid == undefined) {		
		db_sid = prompt("Enter the SID of persist:", "");		
		// For changing:
		// about:config
		// greasemonkey.scriptvals.marcoratto/....
		GM_setValue('Persist_Sid', db_sid);
	}

	if (nickname == undefined) {		
		nickname = prompt("Enter your nickname:", "");
		
		// For changing:
		// about:config
		// greasemonkey.scriptvals.marcoratto/....
		GM_setValue('Nickname', nickname);
	}

		addHTML();
      log4GM.trace("init(): end");
    }

    function addHTML() {
      log4GM.trace("addHTML(): start");
		
		var item = document.getElementById('menu');
		if ((item != undefined) && 
            (item != null)) {
				log4GM.info("addHTML():tag 'menu' found.");
				// item.parentNode.insertBefore(generateText("Autosave"), item.nextSibling);				
				// item.parentNode.insertBefore(generateCheckBox("flagAutosave", "Autosave"), item.nextSibling);		
				item.parentNode.insertBefore(generateButtonClear("generateButtonClear", "Clear"), item.nextSibling);		
				item.parentNode.insertBefore(generateButtonRename("generateButtonRename", "Rename"), item.nextSibling);
				item.parentNode.insertBefore(generateButtonDelete("generateButtonDelete", "Delete"), item.nextSibling);
				item.parentNode.insertBefore(generateButtonSave("generateButtonSave", "Save"), item.nextSibling);
				item.parentNode.insertBefore(generateButtonSaveAs("generateButtonSaveAs", "Save As"), item.nextSibling);		
				item.parentNode.insertBefore(generateCombo(item), item.nextSibling);
				populateCombo();
		}		
      log4GM.trace("addHTML(): end");
    }
        
   function generateText (value) {
		log4GM.trace("generateText(): start");
		
		var obj = document.createTextNode(value);
		
		log4GM.trace("generateText(): end");
		return obj;
	}

   function generateCheckBox (name, value) {
		log4GM.trace("generateCheckBox(): start");
		var obj = document.createElement('input');
		obj.type = 'checkbox';
		obj.id = name;
		obj.name = name;
		obj.checked = false;
		
		var theText = document.createTextNode(value);
		obj.appendChild(theText);
		
		log4GM.trace("generateCheckBox(): end");
		return obj;
	}
	
	function generateButtonClear (name, value) {
		log4GM.trace("generateButtonClear(): start");
		
		var obj = document.createElement('input');
			obj.type = 'button';
			obj.value = value;
			obj.name = name; 
			obj.id = name;
			obj.addEventListener('click', function(event) {
				document.getElementById('text').value = "";
				
				var objCombo = document.getElementById('listSaved');
				objCombo.options.selectedIndex = 0;
		}, false);
		
		log4GM.trace("generateButtonClear(): end");
		return obj;
   }
	
	function generateButtonSaveAs (name, value) {
		log4GM.trace("generateButtonSaveAs(): start");
		
		var obj = document.createElement('input');
			obj.type = 'button';
			obj.value = value;
			obj.name = name; 
			obj.id = name;
			obj.addEventListener('click', function(event) {
				var objCombo = document.getElementById('listSaved');
				var index = objCombo.options.selectedIndex;
				if (index > 0) {
					nameUML = objCombo.options[index].text;
				}
				log4GM.debug("generateButtonSaveAs(): nameUML=" + nameUML);
				var nameUML = prompt("Name:", nameUML);

				if (nameUML == null) {
					log4GM.info("generateButtonSaveAs(): nameUML is null. Exit.");
					return;
				}
				if (nameUML.length == 0) {
					log4GM.info("generateButtonSaveAs(): nameUML is ZERO length. Exit.");
					return;
				}	
				log4GM.debug("generateButtonSaveAs(): nameUML=" + nameUML);
				var textUML = document.getElementById('text').value;
				log4GM.debug("generateButtonSaveAs(): textUML=" + textUML);
				if (textUML.length == 0) {
					return;
				}	
				var objCombo = document.getElementById('listSaved');

				saveData(nameUML, textUML);				
				var indexFound = 0;
				for (var loop=0; loop <objCombo.options.length; loop++) {
					if (objCombo.options[loop].value == nameUML) {
						indexFound = loop;
					}
				}
				objCombo.options.selectedIndex = indexFound;
		}, false);
		
		log4GM.trace("generateButtonSaveAs(): end");
		return obj;
   }
	
   function generateButtonSave (name, value) {
		log4GM.trace("generateButtonSave(): start");
		
		var obj = document.createElement('input');
			obj.type = 'button';
			obj.value = value;
			obj.name = name; 
			obj.id = name;
			obj.addEventListener('click', function(event) {
				var objCombo = document.getElementById('listSaved');
				var index = objCombo.options.selectedIndex;
				if (index < 1) {
					alert("ERROR: Choose an item from the list!");
					return;
				}
				var nameUML = objCombo.options[index].text;
				var textUML = document.getElementById('text').value;
				var indexUML = objCombo.options[index].value;
				log4GM.debug("generateButtonSave(): nameUML=" + nameUML);
				log4GM.debug("generateButtonSave(): textUML=" + textUML);
				log4GM.debug("generateButtonSave(): indexUML=" + indexUML);
				updateData(nameUML, textUML, indexUML);
		}, false);
		
		log4GM.trace("generateButtonSave(): end");
		return obj;
   }
	
	   function generateButtonRename (name, value) {
		log4GM.trace("generateButtonRename(): start");
		
		var obj = document.createElement('input');
			obj.type = 'button';
			obj.value = value;
			obj.name = name; 
			obj.id = name;
			obj.addEventListener('click', function(event) {				
				var objCombo = document.getElementById('listSaved');
				var index = objCombo.options.selectedIndex;
				if (index < 1) {
					alert("ERROR: Choose an item from the list!");
					return;
				}
				var nameUML = prompt("New Name:", "");

				if (nameUML == null) {
					return;
				}
				if (nameUML.length == 0) {
					return;
				}	
				log4GM.debug("generateButtonSaveAs(): nameUML=" + nameUML);

				var oldNameUML = objCombo.options[index].value;
				var textUML = document.getElementById('text').value;
				log4GM.debug("generateButtonRename(): nameUML=" + nameUML);
				log4GM.debug("generateButtonRename(): textUML=" + textUML);
				updateData(nameUML, textUML, oldNameUML);
				
		}, false);
		
		log4GM.trace("generateButtonRename(): end");
		return obj;
   }
	
   function generateButtonDelete (name, value) {
		log4GM.trace("generateButtonDelete(): start");
		
		var obj = document.createElement('input');
			obj.type = 'button';
			obj.value = value;
			obj.name = name; 
			obj.id = name;
			obj.addEventListener('click', function(event) {
				var objCombo = document.getElementById('listSaved');
				var index = objCombo.options.selectedIndex;
				if (index < 1) {
					alert("ERROR: Choose an item from the list!");
					return;
				}
				
				var nameUML = objCombo.options[index].value;
				log4GM.debug("generateButtonDelete(): nameUML=" + nameUML);
				var confirmed = confirm("Delete record '" + objCombo.options[index].text + "' ?");
				if (!confirmed) {
					return;
				}

				deleteData(nameUML);
				populateCombo();
				this.options.selectedIndex = 0;
				alert("INFO:Record deleted.");
		}, false);
		
		log4GM.trace("generateButtonDelete(): end");
		return obj;
   }
	
   function generateOption(key, text) {
		log4GM.trace("generateOption(): start");
		var newOption = document.createElement('option');
		newOption.value = key;	
		var theText = document.createTextNode(text);
		newOption.appendChild(theText);
		log4GM.trace("generateOption(): end");
		return newOption;
	}

   function generateCombo(item) {
	   log4GM.trace("generateCombo(): start");
	
	   var obj = document.createElement('select');
	   obj.name = 'listSaved';
		obj.id = 'listSaved';
					
		obj.addEventListener('click', function(event) {
		   var index = this.options.selectedIndex;
			if (index > 0) {
				var valueSelected = this.options[index].value;
				log4GM.debug("generateCombo(): valueSelected=" + valueSelected);
				readData(document.getElementById('text'), valueSelected);
				document.getElementById('text').focus();
			}
	}, false);
	
	   log4GM.trace("generateCombo(): end");
	   return obj;
   }

   function readData(elem, name) {		
	  log4GM.trace("readData(): start");
	  var sql = "select CODE FROM websequencediagrams_offline WHERE nickname='" + nickname + "' AND ID=" + name ;
	  log4GM.info("readData(): sql=" + sql);
		Persist.send(db_url, 
		{'db_host': db_host,
		'db_user': db_user,
		'db_pass': db_pass,
		'db_sid': db_sid,
		'db_query': sql
		},	
		function(e) {
				try {
					log4GM.trace("readData(): Persist.send()");
					log4GM.info("readData(): e.responseText=" + e.responseText);
					var json = eval('(' + e.responseText + ')');
					log4GM.debug("readData(): json.length=" + json.length);
					elem.value = StringToHex.decode(json[0]);
				} catch (err) {
                    alert('An error occurred:\n'+err);
                }
			}, function(e) {
				log4GM.trace('An error has occurred. Try again later.');
			});
	  
	  log4GM.trace("readData(): end");	  
  }
  
   function saveData(name, value) {		
	log4GM.trace("saveData(): start");
		var sql = "insert into websequencediagrams_offline(NICKNAME, NAME, CODE) values ('" + nickname + "', '" + name + "', '" + StringToHex.encode(value) + "')";
		log4GM.info("saveData(): sql=" + sql);
		Persist.send(db_url, 
		{'db_host': db_host,
		'db_user': db_user,
		'db_pass': db_pass,
		'db_sid': db_sid,
		'db_query': sql
		},	
		function(e) {
				try {
					log4GM.trace("saveData(): Persist.get");
					var json = eval('(' + e.responseText + ')');
					log4GM.debug("saveData(): json.length=" + json.length);
					populateCombo();
				} catch (err) {
                    alert('An error occurred:\n'+err);
                }
			}, function(e) {
				log4GM.error(e);
			});
	
	log4GM.trace("saveData(): end");
  }	

  function updateData(name, value, key) {		
		log4GM.trace("updateData(): start");
        var sql = "UPDATE websequencediagrams_offline SET NAME='" + name + "', CODE='" + StringToHex.encode(value) + "' WHERE NICKNAME='" + nickname + "' AND ID=" + key;
		indexComboBox = key;
		
		log4GM.info("updateData(): sql=" + sql);
		Persist.send(db_url, 
		{'db_host': db_host,
		'db_user': db_user,
		'db_pass': db_pass,
		'db_sid': db_sid,
		'db_query': sql
		},	
		function(e) {
				try {
					log4GM.debug("updateData(): e.responseText=" + e.responseText);
					var json = eval('(' + e.responseText + ')');
					if (json == undefined) {
						alert("Error! I cannot write to DB via Persist.");
						return;
					}
					log4GM.debug("updateData(): json.length=" + json.length);
					
					populateCombo();

					alert("INFO:Record '" + name + "' updated on DB.");
				} catch (err) {
                    alert('An error occurred:\n'+err);
                }
			}, function(e) {
				log4GM.trace('An error has occurred. Try again later.');
			});
                                        
	log4GM.trace("updateData(): end");
  }	
  
  function deleteData(name) {		
	log4GM.trace("deleteData(): start");
		var sql = "DELETE FROM websequencediagrams_offline WHERE NICKNAME='" + nickname + "' AND ID=" + name;
		log4GM.info("deleteData(): sql=" + sql);
		Persist.send(db_url, 
		{'db_host': db_host,
		'db_user': db_user,
		'db_pass': db_pass,
		'db_sid': db_sid,
		'db_query': sql
		},	
		function(e) {
				try {
					log4GM.trace("deleteData(): Persist.get");
					var json = eval('(' + e.responseText + ')');
					log4GM.debug("deleteData(): json.length=" + json.length);
				} catch (err) {
                    alert('An error occurred:\n'+err);
                }
			}, function(e) {
				log4GM.trace('An error has occurred. Try again later.');
			});

	log4GM.trace("deleteData(): end");
  }
  
	// Once insertCacheHistory() is called, this function is called.  It populates 
// the table with links to all of the articles stored offline.
function populateCombo() {
	log4GM.trace("populateCombo(): start");
	var objCombo = document.getElementById('listSaved');
	objCombo.options.length = 0;

	objCombo.appendChild(generateOption(0, "Choose..."));
	
	var sql = "select ID,NAME from websequencediagrams_offline where NICKNAME='" + nickname + "' order by NAME";
	log4GM.info("populateCombo(): sql=" + sql);
	Persist.send(db_url, 
		{'db_host': db_host,
		'db_user': db_user,
		'db_pass': db_pass,
		'db_sid': db_sid,
		'db_query': sql
		},	
		function(e) {
				try {
					log4GM.trace("populateCombo(): Persist.get");
					log4GM.debug("populateCombo(): " + e.responseText);
					var listOfNames = eval('(' + e.responseText + ')');
					log4GM.debug("populateCombo(): listOfNames.length=" + listOfNames.length);
					for (var j=0; j<listOfNames.length; j++) {
						objCombo.appendChild(generateOption(listOfNames[j].ID, listOfNames[j].NAME));
					}
				} catch (err) {
                    alert('An error occurred:\n'+err);
                }
			}, function(e) {
				log4GM.trace('An error has occurred. Try again later.');
			});
	
	log4GM.trace("populateCombo(): end");
}

function exec_sql(sql, function_on_success, function_on_error) {
		Persist.send(db_url, 
		{'db_host': db_host,
		'db_user': db_user,
		'db_pass': db_pass,
		'db_sid': db_sid,
		'db_query': sql
		},	
		function_on_success, 
		function_on_error);
}

function selectCombo() {
	var objCombo = document.getElementById('listSaved');				
	var indexFound = 0;
	log4GM.debug('indexComboBox=' + indexComboBox);
	for (var j=0; j<objCombo.options.length; j++) {
		log4GM.debug('objCombo.options[loop].value=' + objCombo.options[j].value);
		if (objCombo.options[j].value == indexComboBox) {
			indexFound = j;
		}
	}
	log4GM.debug('indexFound=' + indexFound);
	objCombo.options.selectedIndex = indexFound;
}
	
   function checkForUpdate () {
		log4GM.trace("checkForUpdate(): start");
      if (SUC_script_num == 0) {
        log4GM.info("SUC_script_num is ZERO. Skipped!");
        return;
      }
      try {
          function updateCheck(forced) {
              if ((forced) || 
				      (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms) {
                  try {
                      GM_xmlhttpRequest( {
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
                              if(local_version != -1) {
                                  script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                                  GM_setValue('SUC_target_script_name', script_name);
                                  if (remote_version > local_version) {
                                      if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
                                          GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
                                          GM_setValue('SUC_current_version', remote_version);
                                      }
                                  } else if (forced)
                                      alert('No update is available for "'+script_name+'."');
                              } else {										
                                  GM_setValue('SUC_current_version', remote_version+'');
										}
                          }
                      });
                  } catch (err) {
                      if (forced) {
                          alert('An error occurred while checking for updates:\n'+err);
                      }
                  }
          }          
          GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'Data Persistence For Web Sequence Diagrams') + ' - Manual Update Check', function()
          {
              updateCheck(true);
          });
          log4GM.info("Check for update...");
          updateCheck(false);
      } catch(err) {
          log4GM.fatal(err);
      }    
		log4GM.trace("checkForUpdate(): end");
    }

log4GM.init(log4GM.TRACE);

checkForUpdate();
     
init();
