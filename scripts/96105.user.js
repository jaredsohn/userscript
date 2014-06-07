// ==UserScript==
// @name            Beyond Business Tycoon Online
// @author          Gosamu / BeyondBTO.com
// @date            August 26, 2012
// @version       	1.2.2
// @namespace       beyondbto
// @description     Adds additional functionality to improve the Business Tycoon Online gaming experience.  This is the BBTO Loader portion of the script.  When it runs, it will connect to http://www.beyondbto.com and pull the 20,000+ lines of code that changes the game.  This approach lets us update users automatically when the game loads.
// @updateURL 		http://userscripts.org/scripts/source/96105.user.js
//
// @exclude http://kgbto.dovogame.com/index.php*
// @include         http://beyondbto.villagesatwar.com/*
// @exclude         http://*.beyondbto.com/wp-admin/*
// @include         http://*.beyondbto.com/*
// @exclude http://*/gamebto/ChatSocket.html*
// @exclude http://*/gamebto/kursaal.php
// @exclude http://*/gamebto/fate.php
// @exclude http://*/gamebto/ajax_action.php*
// @exclude http://*/gamebto/ajax_system.php*
// @exclude http://*/gamebto/task.php*
// @exclude http://*/gamebto/close.php*
// @exclude http://*/gamebto/ajax_toolsuse.php*
// @include http://*/gamebto/* 
// @grant metadata
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// @grant eval
// @grant GM_log
// @grant GM_listValues
// @grant GM_getResourceUrl

// ==/UserScript==


	unsafeWindow.jQuery("body").append("<div id='bbtoLoaderIndicator' style='text-align:center;width:100%;height:75px;padding:10px;background-color:#000000;color:#00FF00;font-size:1.4em'><hr>Beyond Business Tycoon Online is Loading ...<hr>If this message does not disappear, check <a href='http://userscripts.org/scripts/show/96105'>User Scripts Beyond Business Tycoon Online for an Update</a><hr>");
	
	function getCookie(name){var cookies = document.cookie;if (cookies.indexOf(name) != -1){var startpos = cookies.indexOf(name)+name.length+1;var endpos = cookies.indexOf(";",startpos)-1;if (endpos == -2) endpos = cookies.length;return unescape(cookies.substring(startpos,endpos));}else{return null;}}
	function setCookie(name, value, expires){if (!expires) expires = new Date(new Date().getTime()+ (1000 * 60 * 60 * 24 * (365*10))); document.cookie = name + "=" + escape(value) + "; expires=" + expires.toUTCString() + "; path=/";}
	function getBbtoid(){var BBTO_id = GM_getValue("BBTO.ID");if (BBTO_id==undefined || BBTO_id==null) BBTO_id = localStorage.getItem("BBTO.ID");if (BBTO_id==undefined || BBTO_id==null) BBTO_id = getCookie("BBTO.ID");if (BBTO_id==undefined || BBTO_id==null) BBTO_id = "";return "&tid="+escape(BBTO_id);}
	function setBbtoid(i){setTimeout(function(){GM_setValue("BBTO.ID",i)},0);localStorage.setItem("BBTO.ID",i);setCookie("BBTO.ID",i);}
	function replaceAll( str, sO, sN ) {try {var sOR = new RegExp(sO,'g');} catch(err) {return str;}if (str==null||str==undefined) return "";try {return str.replace(sOR,sN);} catch(err) {return str;}}
	function safeURL(u) {var nu = encodeURI(u);nu = replaceAll(nu,encodeURI(">"),"");nu = replaceAll(nu,encodeURI("<"),"");nu = replaceAll(nu,encodeURI("http://"),"");nu = replaceAll(nu,encodeURI("https://"),"");return nu;}

	function consolelog() {for (var aI in arguments) {var s = arguments[aI];if (typeof(s)=='object' || typeof(s)=='array') s = interrogate(s,false,true);if (console && console.log) { console.log(s); } else { alert(s); }}}
	function interrogate() {
		var what = arguments[0],doAlert = true,doValue = false,returnCount = false,nestedInterrogate = true,c = 0,output = '';
		if (arguments.length>=2) doAlert=arguments[1]; if (arguments.length>=3) doValue=arguments[2]; if (arguments.length>=4) returnCount=arguments[3]; if (arguments.length>=5) nestedInterrogate=arguments[4];
		for (var i in what) {
			c++; if (returnCount) {} else {
				output += i+'';
				try {if (doValue) {
						if (what[i]==undefined) output += ' [!undefined!] ';else if( what[i]==null ) output += ' [~null~] ';else if( null !== what[i] && 'object' == typeof(what[i])) output += ' [{' + ((nestedInterrogate)? XCMSJQ.fn.interrogate(what[i],false,true,true):'...object...') +'}] ';else if( null !== what[i] && 'function' == typeof(what[i])) output += ' [...function...] ';else if (what[i].toString) output += ' ['+what[i].toString()+'] ';else output += ' [?] ';
				}} catch(err) {}
				if (c % 5==0) {output += '\n';} else output += '  ';
			}
		}
		if (returnCount) { if (doAlert) alert(c);return c;
		} else { if (doAlert) alert(output);return output;
		}
	}

	
	var bbtocode = "";
	
	if (unsafeWindow.location.href.indexOf('beyondbto.com')>0) {
		
	} else if (unsafeWindow.location.href.indexOf('beyondbto.com')>0) {
		unsafeWindow.execGreaseMonkey({version:'1.0'});
	
	} else if (unsafeWindow.location.href.indexOf('www.kongregate.com')>0) {
		var WRAP_Name="KONG";
		
		/*Support for other sites that want to 'wrap' BTO in their own interfaces */
		
		var WRAP_version = GM_getValue(WRAP_Name+".Version");
		if (WRAP_version==undefined) WRAP_version=0;
		var WRAP_url = "http://beyondbto.com/bbto.php?"+safeURL("wrapper="+WRAP_Name+"&"+bbtocode+"version="+WRAP_version);
		GM_xmlhttpRequest({ method: 'GET', url: WRAP_url, onload: function(r) {
			var aR = r.responseText.split("|");
			if (aR[0]==WRAP_version+'DEV') {
				var WRAP_code = GM_getValue(WRAP_Name+".Code");
				try {
					var myFucn = new Function(WRAP_code);
					eval('setTimeout(myFucn, 0)');
					return;
				} catch(err) {
					//Grab current server version
				}
			}
			WRAP_version=aR[0];
			consolelog('WRAP.'+WRAP_Name+"."+WRAP_version+' :: Fetching Code '+WRAP_version);
			
			var WRAP_url = "http://beyondbto.com/bbto.php?"+safeURL("wrapper="+WRAP_Name+"&"+bbtocode+"code="+BBTO_version);
			GM_xmlhttpRequest({method: 'GET', url: WRAP_url, onload: function(r) {
				var WRAP_code = r.responseText;
				try {
					var myFucn = new Function("WRAP_Name='"+WRAP_Name+"';\n" + WRAP_code);
					eval('setTimeout(myFucn, 0)');
					setTimeout(function(){
						GM_setValue(WRAP_Name+".Version",WRAP_version);
						GM_setValue(WRAP_Name+".Code",WRAP_code);
					},0);
					setTimeout(function() {
						//unsafeWindow.jQuery("#bbtoV").html(WRAP_version+" (new)");
					},1000);

				} catch(err) {
					var WRAP_code = GM_getValue(WRAP_Name+".Code");
					if (WRAP_code!=undefined) {
						var myFucn = new Function(WRAP_code);
						eval('setTimeout(myFucn, 0)');
					}
					setTimeout(function() {
						//unsafeWindow.jQuery("#bbtoV").html(BBTO_version+" (error)");
					},1000);
				}
				
			}});
			return;
		}});
		
	} else if (unsafeWindow.a==undefined) {
		//On Landing page or Login Page
	} else {
		try {
			var BBTO_version = GM_getValue("BBTO.Version");
			if (BBTO_version==undefined) BBTO_version=0;
		} catch(err) {
			consolelog('Window.getItem Error (102):\n'+err.name+' :: '+err.message+'\nAborting the loading of BeyondBTO.');
			return false;
		}
		/* TEMPORARILY DISABLED
		try {
			var failvars="", GMvals = {v: GM_listValues(), __exposedProps__ : { v:"r"}};
			window.wrappedJSObject.GMvals = GMvals;
			alert(window.GMvals.v);
			
			unsafeWindow.GMvals = GMvals;
			alert(unsafeWindow.GMvals);
			
			consolelog( window.wrappedJSObject.GMvals.v.toString() );
			setTimeout(function() {for each(var val in window.GMvals) if (localStorage.getItem(val)==undefined || localStorage.getItem(val)==null) {
				if (val=='BBTO.Code' || val=='BBTO.Version' || val=='BBTO.ID') {
					//Do not save local
				} else {
					try {
					localStorage.setItem(val, GM_getValue(val));
					} catch(err){
						consolelog('Window.setItem Error (107):\n'+err.name+' :: '+err.message+'\n\nNo values can be saved reducing a lot of the functionality of BeyondBTO.\n\nhttps://developer.mozilla.org/en/Table_Of_Errors\nPlease check for new version at:\nhttp://userscripts.org/scripts/show/96105');
						break;
					}
				}
			}},0);
		} catch(err) {
			alert('Window.setItem Error (113):\n'+err.name+' :: '+err.message+'\nAborting the loading of BeyondBTO.\nPlease check for new version at:\nhttp://userscripts.org/scripts/show/96105');
			return false;
		}
		*/
		
		try {
		var BBTO_accountinfo="";
		/*	PRIVACY : START
			Remove the // from the line below to not submit any Business Tycoon Online account information.
			Each parameter being sent is documented so that you can individually comment them out.
		*/
		
	
		/* APPRECIATED VARIABLES */
		BBTO_accountinfo+="&sid="+unsafeWindow.a.ServerId; /* Server Id - server number */
		BBTO_accountinfo+="&sn="+unsafeWindow.a.ServerName; /* ServerName */
		BBTO_accountinfo+="&pid="+unsafeWindow.a.UserId; /* User Id - Payer number - while never shown, it is passed in the code all the time */
		BBTO_accountinfo+="&pn="+unsafeWindow.a.VUserName; /* Player Name */
		BBTO_accountinfo+="&aid="+unsafeWindow.a.UNUserId; /* Guild Id - Guild Id - not Guild Name, would of made life simplier if they had just included that too */
		BBTO_accountinfo+="&pf="+unsafeWindow.a.user_pic; /* Player Face - might use this to create personel Beyond BTO Relationship Information Manager */
		BBTO_accountinfo+="&it="+unsafeWindow.a.IndustryId; /* Industry Type (Service, Sales, etc. */
		
		/* NOT REQUIRED VARIABLES */
		BBTO_accountinfo+="&pa="+unsafeWindow.a.user_regdays; /* The number of days the player has been playing. This is for statistical analysis - not required */
		BBTO_accountinfo+="&e="+unsafeWindow.a.user_Employees+"."+unsafeWindow.a.MaxEmployees; /* Current and Maximum Employees */
		BBTO_accountinfo+="&s="+unsafeWindow.a.user_OwnerShops+"."+unsafeWindow.a.MaxShopNums; /* Current and Maximum Employees */
		BBTO_accountinfo+="&d="+unsafeWindow.a.user_diamond; /* Diamonds user has bought */
		BBTO_accountinfo+="&m="+unsafeWindow.a.user_yesterdayearning; /* Yesterday's earning */
		
		//BBTO_accountinfo = ""; /* <---- This is the line to remove the // from. It will blank the account info */
		
		/*	PRIVACY : END */
		var BBTO_url = "http://beyondbto.com/bbto.php?"+safeURL(bbtocode+"version="+BBTO_version+getBbtoid()+BBTO_accountinfo);
		GM_xmlhttpRequest({method: 'GET', url: BBTO_url, onload: function(r) {
			if (r.status==200) {
				var aR = r.responseText.split("|");
			} else {
				var aR = ("RELOAD").split("|");
			}
			if (aR[0]==BBTO_version+'DEV') {
				var BBTO_code = GM_getValue("BBTO.Code");
				try {
					var myFucn = new Function(BBTO_code);
					eval('setTimeout(myFucn, 0)');
					setTimeout(function() {
						unsafeWindow.jQuery("#bbtoV").html(BBTO_version+"");
						var BBTO_news = GM_getValue("BBTO.News");
						if (BBTO_news==undefined) {
							/* Grab latest news - only send version number - no account information */
							var BBTO_url = "http://beyondbto.com/bbto.php?"+safeURL("news="+BBTO_version+"");
							GM_xmlhttpRequest({method: 'GET', url: BBTO_url, onload: function(r) {
								unsafeWindow.BBTO_news = unsafeWindow.jQuery.parseJSON(r.responseText);
								setTimeout(function(){
									GM_setValue("BBTO.News",r.responseText);
								},0);
							}});
						} else {
							unsafeWindow.BBTO_news = unsafeWindow.jQuery.parseJSON(BBTO_news);
						}
						
					},1000);
					
					return;
				} catch(err) {
					//Grab current server version
				}
			}
			BBTO_version=aR[0];
			
			unsafeWindow.jQuery("body:first").append("<div id='bbto-scriptloading' class='bnrlist' style='color:lime;'>Loading BBTO v"+BBTO_version+"</div>");
			setTimeout(function() {
				if (unsafeWindow.jQuery("#bbto-scriptloading").length==1) {
					unsafeWindow.jQuery("#bbto-scriptloading").html("Loading BBTO v"+BBTO_version+"")
						.css('color','yellow');
					setTimeout(function() {
						if (unsafeWindow.jQuery("#bbto-scriptloading").length==1) {
							unsafeWindow.jQuery("#bbto-scriptloading").html("Failed <a href='http://www.beyondbto.com/' target='_blank'>BBTO v"+BBTO_version+"</a>")
								.css('color','red');
						}
					},15000);
				}
			},10000);
			
			consolelog('BBTO.'+BBTO_version+' :: Fetching Code '+BBTO_version);
			var BBTO_url = "http://beyondbto.com/bbto.php?"+safeURL(bbtocode+"code="+BBTO_version+getBbtoid()+BBTO_accountinfo);
			GM_xmlhttpRequest({method: 'GET', url: BBTO_url, onload: function(r) {
				//alert('199.r.responseText :: '+r.responseText);
				var BBTO_code = r.responseText;
				try {
					var myFucn = new Function(BBTO_code);
					eval('setTimeout(myFucn, 0)');
					setTimeout(function(){
						GM_setValue("BBTO.Version",BBTO_version);
						GM_setValue("BBTO.Code",BBTO_code);
					},0);
					setTimeout(function() {
						unsafeWindow.jQuery("#bbtoV").html(BBTO_version+(bbtocode==""?" (new)":""));
					},1000);
					unsafeWindow.jQuery("#bbto-scriptloading").remove();
					/* Grab latest news - only send version number - no account information */
					var BBTO_url = "http://beyondbto.com/bbto.php?"+safeURL("news="+BBTO_version+"");
					GM_xmlhttpRequest({method: 'GET', url: BBTO_url, onload: function(r) {
						unsafeWindow.BBTO_news = unsafeWindow.jQuery.parseJSON(r.responseText);
						setTimeout(function(){
							GM_setValue("BBTO.News",r.responseText);
						},0);
					}});
					unsafeWindow.jQuery("#bbtoLoaderIndicator").remove();
				} catch(err) {
					var BBTO_code = GM_getValue("BBTO.Code");
					if (BBTO_code!=undefined) {
						var myFucn = new Function(BBTO_code);
						eval('setTimeout(myFucn, 0)');
					}
					setTimeout(function() {
						unsafeWindow.jQuery("#bbtoV").html( (bbtocode==""?BBTO_version:"(error.221)") );
					},1000);
				} finally {
					/* do nothing */
				}
			}});
			return;
		}});
		} catch(err) {
			alert('Window.GM_xmlhttpRequest (137):\n'+err.name+' :: '+err.message+'\nAborting the loading of BeyondBTO.\nPlease check for new version at:\nhttp://userscripts.org/scripts/show/96105');
			return false;
		}
		
	}

