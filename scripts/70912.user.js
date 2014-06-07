// ==UserScript==
// @name           	FB auto switch CA user
// @namespace      	AngusH_CA
// @require        	http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @description    	FB auto switch CA user
// @include         http://*.facebook.com/*
// @include         https://*.facebook.com/*
// @include         http://facebook.com/*
// @include         https://facebook.com/*
// @version         1.1.4
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////////////
// 
// Global Value
//
///////////////////////////////////////////////////////////////////////////////////////////////////
var debug = false;
var scriptVersion = "1.1.3";

///////////////////////////////////////////////////////////////////////////////////////////////////
// 
// Global Function
//
///////////////////////////////////////////////////////////////////////////////////////////////////
if(!GM_log) 
{
	GM_log = console.debug;
}

function $x1(xpath,root) 
{ 
	return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; 
}


/////////////////////////////////////////////////////////////////////
//
// Cookie Function
//
/////////////////////////////////////////////////////////////////////
var Cookie = {
	Create:function(name,value,days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		document.cookie = name+"="+value+expires+"; path=/";
	},

	Read:function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	Erase:function(name) {
		Cookie.Create(name,"",-1);
	},

	Clear:function() {
		var ca = document.cookie.split(';');
		for(var i = 0 ; i < ca.length ; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			Cookie.Erase(c);
		}	
	},
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// HTML TOOLS
//
// this object contains general methods for wading through the DOM and dealing with HTML
///////////////////////////////////////////////////////////////////////////////////////////////////

var xpath = 
{
	string : XPathResult.STRING_TYPE,
	unordered: XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	first : XPathResult.FIRST_ORDERED_NODE_TYPE
};

var nHtml =
{
	FindByAttrContains:function(obj,tag,attr,className) {
		if(attr=="className") { attr="class"; }
		className=className.toLowerCase();
		var q=document.evaluate(".//"+tag+
			"[contains(translate(@"+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
			"')]",obj,null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	},
	FindByAttrXPath:function(obj,tag,className) {
		var q=null;
		try {
			var xpath=".//"+tag+"["+className+"]";
			if(obj==null) {
				GM_log('Trying to find xpath with null obj:'+xpath);
				return null;
			}
			q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		} catch(err) {
			GM_log("XPath Failed:"+xpath+","+err);
		}
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	},
	FindByAttr:function(obj,tag,attr,className) {
		if(className.exec==undefined) {
			if(attr=="className") { attr="class"; }
			var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
			if(q && q.singleNodeValue) { return q.singleNodeValue; }
			return null;
		}
		var divs=obj.getElementsByTagName(tag);
		for(var d=0; d<divs.length; d++) {
			var div=divs[d];
			if(className.exec!=undefined) {
				if(className.exec(div[attr])) {
					return div;
				}
			} else if(div[attr]==className) {
				return div;
			}
		}
		return null;
	},
	FindByClassName:function(obj,tag,className) {
		return this.FindByAttr(obj,tag,"className",className);
	},
	spaceTags:{'td':1,'br':1,'hr':1,'span':1,'table':1
	},
	GetText:function(obj) {
		var txt=' ';
		if(obj.tagName!=undefined && this.spaceTags[obj.tagName.toLowerCase()]) {
			txt+=" ";
		}
		if(obj.nodeName=="#text") { return txt+obj.textContent; }
		for(var o=0; o<obj.childNodes.length; o++) {
			var child=obj.childNodes[o];
			txt+=this.GetText(child);
		}
		return txt;
	},
	
	htmlRe:new RegExp('<[^>]+>','g'),
	StripHtml:function(html) {
		return html.replace(this.htmlRe,'').replace(/&nbsp;/g,'');
	},
	
	timeouts:{},
	setTimeout:function(func,millis) {
		var t=window.setTimeout(function() {
			func();
			nHtml.timeouts[t]=undefined;
		},millis);
		this.timeouts[t]=1;
	},
	clearTimeouts:function() {
		for(var t in this.timeouts) {
			window.clearTimeout(t);
		}
		this.timeouts={};
	},
	getX:function(path,parent,type) {
		switch (type) {
			case xpath.string : return document.evaluate(path,parent,null,type,null).stringValue;
			case xpath.first : return document.evaluate(path,parent,null,type,null).singleNodeValue;
			case xpath.unordered : return document.evaluate(path,parent,null,type,null);
			default :
		}
	},
	getHTMLPredicate:function(HTML){
		for (var x = HTML.length; x > 1; x--) {
			if (HTML.substr(x,1) == '/') {
				return HTML.substr(x + 1);
			}
		}
		return HTML
	},
	
	OpenInIFrame:function(url, key) {
		//if(!iframe = document.getElementById(key))
		iframe = document.createElement("iframe");
		//GM_log ("Navigating iframe to " + url);
		iframe.setAttribute("src", url);
		iframe.setAttribute("id", key);
		iframe.setAttribute("style","width:0;height:0;");
		document.body.insertBefore(iframe, document.body.firstChild);
	},
	
	ResetIFrame:function(key) {
		if(iframe = document.getElementById(key)){
			gm.log("Deleting iframe = "+key);
			iframe.parentNode.removeChild(iframe);
		}else gm.log("Frame not found = "+key);
		if(document.getElementById(key))gm.log("Found iframe");
	}
};

gm = {
	procName:"AngusFbAutoSwitch",
	gameName:'castle_age',
	
	log:function(mess) {
		//GM_log('v'+thisVersion + ': ' +mess);
		GM_log(mess);
	},
	
	debug:function(mess) {
		if(debug) { gm.log("[Debug]"+mess); }
	},

	setValue:function(n,v) {
		//gm.debug('Set ' + n + ' to ' + v);
		GM_setValue(gm.procName+"__"+n,v);
		return v;
	},
	
	getValue:function(n,v) {
		//gm.debug('Get ' +n + ' value ' + GM_getValue(gm.procName+"__"+n,v));
		return GM_getValue(gm.procName+"__"+n,v);
	},
	
	deleteValue:function(n) {
		//gm.debug('Delete ' +n + ' value ');
		return GM_deleteValue(gm.procName+"__"+n);
	},
	
	getObjVal:function(objName,label,defaultValue) {
		objStr = gm.getValue(objName);
		if (!objStr) return defaultValue;
		if (!(itemStr = gm.listFindItemByPrefix(objStr.split(vs),label+ls))) return defaultValue;
		return itemStr.split(ls)[1];
	},
	
	getCAAPValue:function(n,v) {
		//gm.debug('Get ' +n + ' value ' + GM_getValue(gm.procName+"__"+n,v));
		return GM_getValue(gm.gameName+"__"+n,v);
	},
	
	setCAAPValue:function(n,v) {
		//gm.debug('Set ' + n + ' to ' + v);
		GM_setValue(gm.gameName+"__"+n,v);
		return v;
	},	
};

fbAccountHelper = {
	ID_ACCOUNT_INDEX:"AccountIndex",
	ID_PRE_LOGOUT_TIME:"PreLogoutTime_",
	ID_PRE_LOGOUT_STA:"PreLogoutSta_",
	URL_LOGIN:"http://www.facebook.com",
	URL_LOGOUT:$x1('//a[contains(@href,"logout.php")]'),
	URL_FB_HOME:"http://www.facebook.com/home.php",
	URL_REDIRECT:"http://www.facebook.com/?ref=home",
	URL_CA:"http://apps.facebook.com/castle_age",
	URL_CA_KEEP:"http://apps.facebook.com/castle_age/keep.php",
	loginTimeout:30*60*1000,

	accountList:null,
	elemEmail:null,
	elemPassword:null,
	elemPersistent:null,
	
	digit_char: new Array( '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'),
	
	GetEmailElement:function() {
		return document.getElementById("email");
	},

	GetPasswordElement:function() {
		return document.getElementById("pass");
	},

	GetPersistentElement:function() {
		return document.getElementById("persistent");;
	},
	
	AtRedirectPage:function() {
		gm.debug("In fbAccountHelper.AtRedirectPage()");
		
		if ( location.href.indexOf(fbAccountHelper.URL_REDIRECT) >= 0 )
			return true;
		else if ( location.href.indexOf('https://ssl.facebook.com/roadblock') >= 0 )
			return true;		
		else
			return false;
	},
	
	AtLoginPage:function() {
		gm.debug("In fbAccountHelper.AtLoginPage()");
		
		if ( location.href.indexOf(fbAccountHelper.URL_LOGIN) < 0 )
			return false;
			
		fbAccountHelper.elemEmail = fbAccountHelper.GetEmailElement();
		fbAccountHelper.elemPassword = fbAccountHelper.GetPasswordElement();
		
		if ( fbAccountHelper.elemEmail && fbAccountHelper.elemPassword ) 
			return true;
		else
			return false;
	},
	
	AtHomePage:function() {
		gm.debug("In fbAccountHelper.AtHomePage()");
		/*
		if ( location.href.indexOf(fbAccountHelper.URL_FB_HOME) >= 0 )
			return true;
		else if ( location.href.indexOf('www.facebook.com/add_email.php') >= 0 )
			return true;
		else
			return false;
			*/
		if ( fbAccountHelper.AtRedirectPage() )
			return false;
			
		if ( location.href.indexOf("http://www.facebook.com/update_security_info.php?wizard") >= 0 )
			return true;
		if ( location.href.indexOf("http://www.facebook.com/login/setashome.php?ref=genlogin") >= 0 )
			return true;
		if ( location.href.indexOf("http://www.facebook.com/add_email.php") >= 0 )
			return true;
		if ( location.href.indexOf("http://www.facebook.com/home.php	") >= 0 )
			return true;	
			
		var welcomeBox = nHtml.FindByAttrContains(document.body,"div","class",'UIImageBlock clearfix fbxWelcomeBox');			
		var welcomeImg = nHtml.FindByAttrContains(document.body,"a","class",'fbxWelcomeBoxBlock UIImageBlock_Image UIImageBlock_MED_Image');
		
		if ( welcomeBox && welcomeImg )
			return true;
		else
			return false;
	},
	
	AtCAPage:function() {
		gm.debug("In fbAccountHelper.AtCAPage()");
		
		if( location.href.indexOf(fbAccountHelper.URL_CA) >= 0 )
			return true;
		else
			return false;
	},	
	
	GotoLoginURL:function() {
		gm.debug("In fbAccountHelper.GotoLoginURL()");
		Cookie.Clear();
		document.location.href = fbAccountHelper.URL_LOGIN;
	},
	
	GotoCAKeepURL:function()
	{
		gm.debug("In fbAccountHelper.GoToCAKeepURL()");
		document.location.href = fbAccountHelper.URL_CA_KEEP;		
	},	
	
	GotoNextAccountIndex:function()	{
		gm.debug("In fbAccountHelper.GotoNextAccountIndex()");
		var accountIndex = fbAccountHelper.GetNowIndex();
		var newAccountIndex = (accountIndex+1) % fbAccountHelper.accountList.length;		
		gm.setValue(fbAccountHelper.ID_ACCOUNT_INDEX, newAccountIndex);
		gm.debug("Change accountIndex from " + accountIndex + " to " + newAccountIndex);
	},	
	
	GotoNextAccount:function() {
		gm.debug("In fbAccountHelper.GotoNextAccount()");
		fbAccountHelper.GotoNextAccountIndex();
		fbAccountHelper.GotoLoginURL();
	},
		
	GetNowIndex:function() {
		var result = gm.getValue(fbAccountHelper.ID_ACCOUNT_INDEX, 0);
		if ( result >= fbAccountHelper.accountList.length )
			result = 0;
		return result;
	},

	DoLogin:function() {
		gm.debug("In fbAccountHelper.DoLogin()");

		//Check Login Element ========================================
		fbAccountHelper.elemEmail			= fbAccountHelper.GetEmailElement();
		fbAccountHelper.elemPassword 	= fbAccountHelper.GetPasswordElement();
		fbAccountHelper.elemPersistent	= fbAccountHelper.GetPersistentElement();
		if ( !fbAccountHelper.elemEmail || !fbAccountHelper.elemPassword || !fbAccountHelper.elemPersistent ) {
			gm.log("Can't found E-mail or Password or Persistent Element!!, Login failed");
			return false;
		}
							
		//Get account information ====================================
		var accountIndex = fbAccountHelper.GetNowIndex();
		gm.log("accountIndex="+accountIndex);
		var accountInfo = new Array();
		accountInfo = fbAccountHelper.accountList[accountIndex].split("|");		
		gm.log("Try to Login [Idx:" + accountIndex + ", Name:" + accountInfo[0] + "]");	
		if ( !accountInfo[0] || !accountInfo[1] ) {
			gm.log("Account Info failed, don't do anything");	
			return false;
		}

		//Fill acoount information and submit ========================
		fbAccountHelper.elemEmail.value = accountInfo[0];
		fbAccountHelper.elemPassword.value = accountInfo[1];
		fbAccountHelper.elemPersistent.checked = true;
				
		setTimeout( function() {fbAccountHelper.elemPassword.form.submit();}, 1000);
	},
	
	GetNowDate:function() {
		return (new Date().getTime());
	},
	
	RecordLogoutTime:function() {
		gm.debug("In fbAccountHelper.RecordLogoutTime()");
		var accountIndex = fbAccountHelper.GetNowIndex();
		var nowDateString = fbAccountHelper.GetNowDate().toString();
		gm.debug("Record Account_" + accountIndex + " Logout date [" + nowDateString + "]");
		gm.setValue(fbAccountHelper.ID_PRE_LOGOUT_TIME+accountIndex, nowDateString);
	},
	
	GetPreLogoutTime:function(accountIndex) {
		gm.debug("In fbAccountHelper.GetPreLogoutTime()");
		if ( accountIndex >= fbAccountHelper.accountList.length ) {
			gm.debug("ERROR!!! accountIndex >= fbAccountHelper.accountList.length");
			return null;
		}
		
		return gm.getValue(fbAccountHelper.ID_PRE_LOGOUT_TIME+accountIndex, "");
	},
		

	RecordLogoutSta:function(sta) {
		gm.debug("In fbAccountHelper.RecordLogoutSta()");
		var accountIndex = fbAccountHelper.GetNowIndex();
		gm.debug("Record Account_" + accountIndex + " Logout sta [" + sta + "]");
		gm.setValue(fbAccountHelper.ID_PRE_LOGOUT_STA+accountIndex, sta);
	},	
	
	GetPreLogoutSta:function(accountIndex) {
		gm.debug("In fbAccountHelper.GetPreLogoutSta()");
		if ( accountIndex >= fbAccountHelper.accountList.length ) {
			gm.log("ERROR!!! accountIndex >= fbAccountHelper.accountList.length");
			return 0;
		}
		
		return gm.getValue(fbAccountHelper.ID_PRE_LOGOUT_STA+accountIndex, 0);
	},

	IsDigit:function(in_value) {
		var chk = in_value.toLowerCase();
		var found = 0;
		
		if ( chk.length <= 0 )
			return 0;
		
		for ( var i = 0 ; i < chk.length ; i++ ) {
			for ( var j = 0 ; j < fbAccountHelper.digit_char.length ; j++ ) {
				if ( chk[i] == fbAccountHelper.digit_char[j] ) {
					//gm.log("chk:" + chk[i] + ", digit_char:" + fbAccountHelper.digit_char[j]);
					found = 1;
					break;
				}
			}
			if ( !found )
				return 0;
		}
	
		return 1;
	},
		
	DoLogout:function()	{
		gm.debug("In fbAccountHelper.DoLogout()");
		fbAccountHelper.RecordLogoutTime();
		fbAccountHelper.GotoNextAccountIndex();		
		var logoutId = nHtml.FindByAttrContains(document.body,"input","name","h").value;
		var ss = document.evaluate(".//input[contains(@name,'h')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for(var s=0; s<ss.snapshotLength; s++) {
			var tmp = ss.snapshotItem(s).value;

			if ( fbAccountHelper.IsDigit(tmp) == 1 ) {
				logoutId = tmp;
				gm.log("logoutId:"+logoutId);
				break;
			}
		}	
		
		var logoutURL = "http://www.facebook.com/logout.php?" + "h=" + logoutId + "&ref=mb";		
		document.location.href = logoutURL;
	},			
	
	CheckLogoutLoop:function() {
		gm.debug("In fbAccountHelper.CheckLogoutLoop()");
		if ( !fbCAHelper.AtRedirectPage() ) {
			document.location.href = fbAccountHelper.URL_REDIRECT;
			setTimeout(fbCAHelper.CheckLogoutLoop, 1000);	
		}
	},
	
	DoSafetyLogout:function() {
		gm.debug("In fbAccountHelper.DoSafetyLogout()");
		document.location.href = fbAccountHelper.URL_REDIRECT;
		setTimeout(fbCAHelper.CheckLogoutLoop, 1000);
	},			
	
	RecordLoginChk:function() {
		gm.setValue("LoginChkIndex", fbAccountHelper.GetNowIndex() );
		gm.setValue("LoginChkTime", fbAccountHelper.GetNowDate().toString() );
	},
	
	DoLoginChk:function()	{
		var loginChkIndex = gm.getValue("LoginChkIndex", 0 );
		var loginChkTime = parseFloat(gm.getValue("LoginChkTime", 0 ));
		
		var nowIndex = fbAccountHelper.GetNowIndex();
		var nowTime = parseFloat(fbAccountHelper.GetNowDate());
		
		//gm.log("loginChkIndex:" + loginChkIndex + ", loginChkTime:" + loginChkTime);
		//gm.log("nowIndex:" + nowIndex + ", nowTime:" + nowTime);
		
		if ( loginChkIndex == nowIndex ) {
			var runningTime = nowTime - loginChkTime;
			if ( runningTime >= fbAccountHelper.loginTimeout ) {
				gm.log("Login timeout[" + fbAccountHelper.loginTimeout/1000 + "sec], login out now");
				fbAccountHelper.DoSafetyLogout();
				return false;
			}
		}
		
		return true;
	},	
};

fbCAAPHelper = {
	ID_PLAYER_NAME:"PlayerName",
	stats:{},	
	levelRe:new RegExp('Level\\s*:\\s*([0-9]+)','i'),
	userRe:new RegExp("(userId=|user=|/profile/|uid=)([0-9]+)"),
	statusRe:new RegExp('([0-9\\.]+)\\s*/\\s*([0-9]+)','i'),
	statChkCount:0,
	  
	Init:function() {
		gm.setValue(fbCAAPHelper.ID_PLAYER_NAME, "");
	},	
          
	GetStatusNumbers:function(node) {
		var txt=nHtml.GetText(node);
		var staminam=fbCAAPHelper.statusRe.exec(txt);
		if(staminam) {
			return {'num':parseInt(staminam[1]),'max':parseInt(staminam[2])};
		} else {
			gm.log('Cannot find status:'+txt);
		}
		return null;
	},
	
	CheckTimer:function(name) {
		nameTimer = gm.getValue(name)
		if (!nameTimer) return true;
		var now = new Date().getTime();
		return (nameTimer < now);
	},
	
	FormatTime:function(time) {
		return time.toDateString().match(/^\w+ /) + time.toLocaleTimeString().replace(/:\d+ /i,' ').replace(/:\d+$/i,'')
	},
	
	DisplayTimer:function(name) {
		nameTimer = gm.getValue(name);
		if (!nameTimer) return false;
		var newTime = new Date();
		newTime.setTime(parseInt(nameTimer));
		return fbCAAPHelper.FormatTime(newTime);
	},
	
	SetTimer:function(name, time) {
		var now = (new Date().getTime());
		now += time*1000
		gm.setValue(name, now.toString());
	},
	
	NumberOnly:function(num) {
		var numOnly=parseFloat(num.toString().replace(/[^0-9\.]/g,""));
		return numOnly;
	},
	
	GetPlayerName:function() {
		return gm.getValue(fbCAAPHelper.ID_PLAYER_NAME, "");
	},
	
	GetStats:function() {
		fbCAAPHelper.stats={};
	
		// Facebook ID ============================================================
		if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
			var webSlice=nHtml.FindByAttrContains(document.body,"a","href","party.php");
			if (webSlice) {
				var m=fbCAAPHelper.userRe.exec(webSlice.getAttribute('href'));
				if(m) {
					var txt=m[2];
					gm.setValue('FBID',txt);
				}
			}
		}
	
		// Player Name ============================================================
		var attrDiv =nHtml.FindByAttrContains(document.body,"div","class",'keep_stat_title');
		if (attrDiv) {
			var userName = nHtml.GetText(attrDiv).match(/"(.+)"/);
			gm.setValue(fbCAAPHelper.ID_PLAYER_NAME, userName[1]);
		}
		
		// Health =================================================================
		var health=nHtml.FindByAttrContains(document.body,"span","id",'_current_health');
		var healthMess='';
		if(!health) {
			health=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_health') and not(contains(@id,'health_time'))");
		}
		if(health!=null) {
			fbCAAPHelper.stats['health']=fbCAAPHelper.GetStatusNumbers(health.parentNode);
			if(fbCAAPHelper.stats.health) {
				healthMess="Health: "+fbCAAPHelper.stats.health.num;
			}
		} else {
			gm.log('Could not find health, go to keep');
			//if ( ++this.statChkCount > 4 )
				setTimeout( fbAccountHelper.GotoCAKeepURL, 5000 );
			return false
		}
	
		// Stamina ================================================================
		//fbCAAPHelper.stats.stamina = null;
		var stamina=nHtml.FindByAttrContains(document.body,"span","id",'_current_stamina');
		if(!stamina) {
			stamina=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_stamina') and not(contains(@id,'stamina_time'))");
		}
		if(stamina!=null) {
			fbCAAPHelper.stats['stamina']=fbCAAPHelper.GetStatusNumbers(stamina.parentNode);
			fbAccountHelper.RecordLogoutSta(fbCAAPHelper.stats.stamina.num);
		} else {
			gm.log('Could not find stamina, go to keep');
			//if ( ++this.statChkCount > 4 )
				setTimeout( fbAccountHelper.GotoCAKeepURL, 5000 );
			return false;
		}
	
		// Energy =================================================================
		var energy=nHtml.FindByAttrContains(document.body,"span","id",'_current_energy');
		if(!energy) {
			energy=nHtml.FindByAttrXPath(document.body,'span',"contains(@id,'_energy') and not(contains(@id,'energy_time'))");
		}
		if(energy!=null) {
			fbCAAPHelper.stats['energy']=fbCAAPHelper.GetStatusNumbers(energy.parentNode);
		} else {
			gm.log('Could not find energy, go to keep');
			//if ( ++this.statChkCount > 4 )
				setTimeout( fbAccountHelper.GotoCAKeepURL, 5000 );
			return false;
		}
	
		// Level ==================================================================
		var level=nHtml.FindByAttrContains(document.body,"div","title",'experience points');
		if(level!=null) {
			var txt=nHtml.GetText(level);
			var levelm=fbCAAPHelper.levelRe.exec(txt);
			if (levelm) {
				fbCAAPHelper.stats['level']=parseInt(levelm[1]);
			} else {
				gm.log('Could not find level re');
			}
		} else {
			gm.log('Could not find level obj, go to keep');
			//if ( ++this.statChkCount > 4 )
				setTimeout( fbAccountHelper.GotoCAKeepURL, 5000 );
			return false;
		}
		
		this.statChkCount = 0;
	
		// gold
		/*
		cashObj=nHtml.FindByAttrXPath(document.body,"strong","contains(string(),'$')");
		if(cashObj) {
			var cashTxt=nHtml.GetText(cashObj);
			var cash=fbCAAPHelper.NumberOnly(cashTxt);
			fbCAAPHelper.stats.cash=cash;
		} else {
			gm.log('Could not find cash');
		}*/
	
		return (health!=null);
	},	

	GetNeededExp:function() {
	    var st_2_5 = $("#app46755028429_st_2_5"), exp = $("strong", st_2_5);
	    var arrExp = exp.text().split("/");
	    return (arrExp[1] - arrExp[0]);
	},
	
	GetLastAct:function() {
		var result = 'Unknown';
		var actID = 'activity_mess';
		var lastActElement = document.getElementById('AutoZynga_' + actID);	
		if ( !lastActElement )
			lastActElement = document.getElementById('caap_' + actID);	
			
		if ( lastActElement ) {
			result = lastActElement.innerHTML.replace('Current activity: ', '');
		}
			
		return result;
	},
	
	GetStaminaReq:function() {
		var result = (fbCAAPHelper.stats.level >= 80 ) ? 5 : 1;
		var autoFightID = 'fight_mess';
		var autoFightElement = document.getElementById('AutoZynga_' + autoFightID);	
		if ( !autoFightElement )
			autoFightElement = document.getElementById('caap_' + autoFightID);	
	
		if ( autoFightElement && autoFightElement.innerHTML.length > 0 ) {
			var keyWord = '/';
			var firstIndex = autoFightElement.innerHTML.indexOf(keyWord) + keyWord.length;
			var needStamina = parseInt(autoFightElement.innerHTML.substring(firstIndex)); 
			if ( needStamina > 0 )
				result = needStamina;
		}
			
		return result;
	},	
		

	GetEnergyReq:function() {
		var result = 9;
		var autoQuestID = 'quest_mess';
		var autoQuestElement = document.getElementById('AutoZynga_' + autoQuestID);	
		if ( !autoQuestElement )
			autoQuestElement = document.getElementById('caap_' + autoQuestID);	
	
		if ( autoQuestElement && autoQuestElement.innerHTML.length > 0 ) {
			var keyWord = '/';
			var firstIndex = autoQuestElement.innerHTML.indexOf(keyWord) + keyWord.length;
			var needEnergy = parseInt(autoQuestElement.innerHTML.substring(firstIndex)); 
			if ( needEnergy > 0 )
				result = needEnergy;
		}
			
		return result;
	},	
};

fbCAHelper = {
	ID_LONG_TIME_MODE:"LongTimeMode",
	ID_STA_THRESHOLD:"StaThreshold",
	ID_LOGOUT_COUNT:"LogoutCount",
	ID_IDLE_CHK_COUNT:"IdleChkCount",
	waitMilliSecs:15000,
	oneProcSta:50,
	
	Init:function() {
		gm.setValue(fbCAHelper.ID_LONG_TIME_MODE, 0);
		gm.setValue(fbCAHelper.ID_STA_THRESHOLD, 0 );
		gm.setValue(fbCAHelper.ID_LOGOUT_COUNT, 0);		
		gm.setValue(fbCAHelper.ID_IDLE_CHK_COUNT, 0);
	},	
	
	CreatePanel:function() {
		if ( document.getElementById('AngusH_AUTOSWITCH_Container') )
			return;
				
		var mainBox = document.createElement('div');
		mainBox.setAttribute('id', 'AngusH_AUTOSWITCH_Container');
		//mainBox.setAttribute('style', 'background-color: #FFFF80; clear: both; text-align: center; -moz-user-select:none; border-width: 1px; border-style: solid; margin-bottom: 5px;');
		mainBox.setAttribute('style', 'background-color: #FFFF80; clear: both; text-align: center; border-width: 1px; border-style: solid; margin-bottom: 5px;');
		
		var titleBox = document.createElement('div');
		titleBox.setAttribute('id', 'AngusH_AUTOSWITCH_Container');
		titleBox.setAttribute('style', 'background-color: #FF6010; padding-left: 1px; padding-right: 1px; font-weight: bold; border-bottom-style: solid;');
		titleBox.innerHTML = 'Auto Switch CA User';
		mainBox.appendChild(titleBox);
		
		//Login Time ============================================================	
		/*
		var itemLoginTime = document.createElement('div');
		itemLoginTime.setAttribute('id', 'AngusH_AUTOSWITCH_item_login_time');
		
		var time = new Date();
		//var timString = time.toDateString().match(/^\w+ /) + time.toLocaleTimeString().replace(/:\d+ /i,' ').replace(/:\d+$/i,'') );	
		itemLoginTime.innerHTML = 'Login Time: ' + time.toLocaleTimeString();
		mainBox.appendChild(itemLoginTime);		
		*/
		//Account ===============================================================	
		var itemAcct = document.createElement('div');
		itemAcct.setAttribute('id', 'AngusH_AUTOSWITCH_item_account');
		itemAcct.innerHTML = 'Account: Unknown';
		mainBox.appendChild(itemAcct);

		//Total Sta ===============================================================	
		var itemTotalSta = document.createElement('div');
		itemTotalSta.setAttribute('id', 'AngusH_AUTOSWITCH_item_totalsta');
		itemTotalSta.innerHTML = 'Total stamina: Unknown';
		mainBox.appendChild(itemTotalSta);

		//User ====================================================================	
		var itemUser = document.createElement('div');
		itemUser.setAttribute('id', 'AngusH_AUTOSWITCH_item_user');
		itemUser.innerHTML = 'User: Unknown';
		mainBox.appendChild(itemUser);

		//Level ==================================================================	
		var itemLv = document.createElement('div');
		itemLv.setAttribute('id', 'AngusH_AUTOSWITCH_item_lv');
		itemLv.innerHTML = 'Level: Unknown';
		mainBox.appendChild(itemLv);

		//HP ====================================================================	
		var itemHP = document.createElement('div');
		itemHP.setAttribute('id', 'AngusH_AUTOSWITCH_item_hp');
		itemHP.innerHTML = 'Health: Unknown';
		mainBox.appendChild(itemHP);

		//Eng ====================================================================	
		var itemEng = document.createElement('div');
		itemEng.setAttribute('id', 'AngusH_AUTOSWITCH_item_eng');
		itemEng.innerHTML = 'Energy: Unknown';
		mainBox.appendChild(itemEng);
		
		//Sta =====================================================================
		var itemSta = document.createElement('div');
		itemSta.setAttribute('id', 'AngusH_AUTOSWITCH_item_sta');
		itemSta.innerHTML = 'Stamina: Unknown';
		mainBox.appendChild(itemSta);		

		//Sta =====================================================================
		var itemLastAct = document.createElement('div');
		itemLastAct.setAttribute('id', 'AngusH_AUTOSWITCH_item_last_act');
		itemLastAct.innerHTML = 'Last Action: Unknown';
		mainBox.appendChild(itemLastAct);		

		//Wait time ===============================================================
		var itemSta = document.createElement('div');
		itemSta.setAttribute('id', 'AngusH_AUTOSWITCH_item_wait_time');
		itemSta.innerHTML = '<br />';
		mainBox.appendChild(itemSta);		
	
		//Account Box ============================================================
		var accBox = document.createElement('textarea')
		accBox.setAttribute('id', 'AngusH_AUTOSWITCH_item_acc_box');
		accBox.setAttribute('style', 'padding-left: 1px; padding-right: 1px;');
		accBox.setAttribute('title', 'Account Box');
		accBox.setAttribute('type', 'text');
		accBox.setAttribute('cols', '35');
		accBox.setAttribute('rows', '5');
		accBox.setAttribute('style', 'font-size: 10px');
		accBox.textContent = gm.getValue('account_list','');
		
		accBox.addEventListener('change',function(e) {
			gm.setValue('account_list',e.target.value);
		},false);
						
		mainBox.appendChild(accBox);		
				
		//Other Links =============================================================
		var br = document.createElement('div');
		br.innerHTML = '<br />';
		mainBox.appendChild(br);

		var theScript = document.createElement('div');
		theScript.setAttribute('id', 'AngusH_AUTOSWITCH_ScriptSection');
		theScript.innerHTML = '<a href="http://userscripts.org/scripts/show/70912" target=_blank>Script Homepage</a>';
		mainBox.appendChild(theScript);
		
		var verElement = document.createElement('div');
		verElement.innerHTML = "Version: " + scriptVersion;
		mainBox.appendChild(verElement);		
		
		//========================================================================
		var theAds = document.getElementById('pagelet_canvas_nav_content');
		
		if ( theAds ) {
			theAds.innerHTML = '';
			theAds.parentNode.appendChild(mainBox);
		} else {	
			var b=nHtml.FindByAttrContains(document.body, 'div', 'className', 'UIStandardFrame_Container');
			if(b)
				b.insertBefore(mainBox, b.childNodes[1]);
		}		
	},

	GetRemainSta:function(curAccountSta)
	{
		var nowAccountIndex = fbAccountHelper.GetNowIndex();
		var nowTimeFloat = parseFloat(fbAccountHelper.GetNowDate());
		var totalSta = curAccountSta;
		
		//gm.log("AccountIndex[" + nowAccountIndex + "], sta[" + curAccountSta + "]");
		for (var index=0 ; index < fbAccountHelper.accountList.length ; index++) {
			if ( index == nowAccountIndex )
				continue;
			
			var preLogoutTimeString = fbAccountHelper.GetPreLogoutTime(index);
			var preLogoutTimeFloat = parseFloat(preLogoutTimeString);
			var preLogoutSta = fbAccountHelper.GetPreLogoutSta(index);
			var recoverSta = 0;
			
			if ( preLogoutTimeString == 0 ) {
				gm.debug("CAN'T GET PRE LOGOUT TIME! AccountIndex[" + index + "]");
			} else {
				var runningTime = nowTimeFloat - preLogoutTimeFloat;
				var recoverThreshold = 5 * 60 * 1000;
				if ( runningTime >= recoverThreshold ) {
					recoverSta = parseInt(runningTime/recoverThreshold);
				}
			}
			
			//gm.log("AccountIndex[" + index + "], preSta[" + preLogoutSta + "], recoverSta[" + recoverSta + "]");
			totalSta = totalSta + preLogoutSta + recoverSta;
		}
		
		return totalSta;
	},

	UpdateInfo:function()
	{
		var elem;		
		elem = document.getElementById('AngusH_AUTOSWITCH_item_account');
		if ( elem )
			elem.innerHTML = 'Account: ' + (fbAccountHelper.GetNowIndex()+1) + '/' + fbAccountHelper.accountList.length;
			
		elem = document.getElementById('AngusH_AUTOSWITCH_item_totalsta');
		if ( elem )
			elem.innerHTML = 'Total stamina: ' + fbCAHelper.GetRemainSta(fbCAAPHelper.stats.stamina.num);
			
		elem = document.getElementById('AngusH_AUTOSWITCH_item_user');
		if ( elem )
			elem.innerHTML = 'User: ' + fbCAAPHelper.GetPlayerName();

		elem = document.getElementById('AngusH_AUTOSWITCH_item_lv');
		if ( elem )
			elem.innerHTML = 'Level: ' + fbCAAPHelper.stats.level + ' (' + fbCAAPHelper.GetNeededExp() + ')';
		
		elem = document.getElementById('AngusH_AUTOSWITCH_item_hp');
		if ( elem && fbCAAPHelper.stats.health.num )
			elem.innerHTML = 'Health: ' + fbCAAPHelper.stats.health.num;
		
		elem = document.getElementById('AngusH_AUTOSWITCH_item_eng');
		if ( elem && fbCAAPHelper.stats.energy.num )
			elem.innerHTML = 'Energy: ' + fbCAAPHelper.stats.energy.num;
		
		elem = document.getElementById('AngusH_AUTOSWITCH_item_sta');
		if ( elem && fbCAAPHelper.stats.stamina.num )
			elem.innerHTML = 'Stamina: ' + fbCAAPHelper.stats.stamina.num;

		elem = document.getElementById('AngusH_AUTOSWITCH_item_last_act');
		if ( elem )
			elem.innerHTML = 'Last Action: ' + fbCAAPHelper.GetLastAct();

		var logoutCount = gm.getValue(fbCAHelper.ID_LOGOUT_COUNT, 0);
		var waitTime = logoutCount * fbCAHelper.waitMilliSecs / 1000;										 
		if ( logoutCount > 0 ) {
			elem = document.getElementById('AngusH_AUTOSWITCH_item_wait_time');
			if ( elem )
				elem.innerHTML = 'Wait Logout: ' + waitTime + ' sec';
		}
	},
	
	MainLoop:function() 
	{
		gm.debug("In MainLoop()");
			
		// Get CA Information =====================================================		 
		fbCAAPHelper.GetStats();
		fbCAHelper.UpdateInfo();
		
		// Check is waiting logout ================================================
		var preLogoutCount = gm.getValue(fbCAHelper.ID_LOGOUT_COUNT, 0);
		if ( preLogoutCount > 0 ) {
			fbCAHelper.WaitLogout();
			return true;
		}
		
		// Check CAAP Status ======================================================
		if ( fbCAAPHelper.GetLastAct() == 'Idle' ) {
			var chkStaThreshold = fbCAAPHelper.GetStaminaReq();
			var idleChkCount = gm.getValue(fbCAHelper.ID_IDLE_CHK_COUNT, 0);
			
			if ( fbCAAPHelper.stats.stamina.num >= chkStaThreshold ||
					 fbCAAPHelper.stats.energy.num >= 10 ) {
				idleChkCount++;
				gm.setValue(fbCAHelper.ID_IDLE_CHK_COUNT, idleChkCount);
				gm.log("CCAP idle [" + idleChkCount + "]");
			}
			
			if ( idleChkCount*fbCAHelper.waitMilliSecs >= 2*60*1000 ) {
				gm.log("CCAP idle, but still has eng and sta, logout");
				gm.setValue(fbCAHelper.ID_IDLE_CHK_COUNT, 0);
				setTimeout( fbAccountHelper.DoSafetyLogout, 1000 );
				return;
			}
		} else {
			gm.setValue(fbCAHelper.ID_IDLE_CHK_COUNT, 0);
		}
		
		// Check CAAP Quest Energy ================================================
		var engThreshold = fbCAAPHelper.GetEnergyReq();
	
		//Calculate goto next account delay time ==================================
		var gotoNextAccount = false;
		var gotoNextAccountDelay = 20*60*1000 / fbAccountHelper.accountList.length;
		if ( fbAccountHelper.accountList.length >= 20 )
			gotoNextAccountDelay = 1000;
		
		if ( fbCAAPHelper.stats.energy.num < engThreshold ) {
			var staReq = fbCAAPHelper.GetStaminaReq();
			if ( fbCAAPHelper.stats.health.num < 10 && fbCAAPHelper.stats.stamina.num < 5 ) {
				gm.log("Eng < " + engThreshold + ", HP < 10, Sta < 5, goto Next Account(After " + gotoNextAccountDelay/1000 + " sec)");
				gotoNextAccount = true;
			} else if ( fbCAAPHelper.stats.stamina.num < staReq ) {
				gm.log("Eng < " + engThreshold + ", Sta < " + staReq + ", goto Next Account(After " + gotoNextAccountDelay/1000 + " sec)");
				gotoNextAccount = true;
			} else if ( fbCAAPHelper.stats.level < 80 && fbCAAPHelper.stats.stamina.num < 5 ) {
				gm.log("Eng < " + engThreshold + ", Lv < 80, Sta < 5, goto Next Account(After " + gotoNextAccountDelay/1000 + " sec)");
				gotoNextAccount = true;				
			}
		}
		
		if ( !fbAccountHelper.DoLoginChk() )
			return;
							
		if ( gotoNextAccount ) {
			var logoutCount = parseInt(gotoNextAccountDelay/fbCAHelper.waitMilliSecs);
			gm.setValue(fbCAHelper.ID_LOGOUT_COUNT, logoutCount);
			
			if ( logoutCount < 1 )
				setTimeout( fbAccountHelper.DoSafetyLogout, gotoNextAccountDelay );
			else
				fbCAHelper.WaitLogout();
		}
		else
			fbCAHelper.WaitMainLoop();
	},
	
	WaitLogout:function()
	{
		var logoutCount = gm.getValue(fbCAHelper.ID_LOGOUT_COUNT, 0);
		var newLogoutCount = logoutCount - 1;
		gm.debug("In WaitLogout(), Logout count:" + logoutCount);
		gm.setValue("LogoutCount", newLogoutCount);
				
		if ( newLogoutCount <= 0 )
			fbAccountHelper.DoSafetyLogout();
		else {
			fbCAHelper.UpdateInfo();
			setTimeout( function() { fbCAHelper.WaitLogout(); }, 
									fbCAHelper.waitMilliSecs * (1 + Math.random() * 0.2));		
		}
	},
	  
	WaitMainLoop:function()
	{
		gm.debug("In WaitMainLoop()");
		setTimeout( function() { fbCAHelper.MainLoop(); }, 
								fbCAHelper.waitMilliSecs * (1 + Math.random() * 0.2));
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Main Process
//
///////////////////////////////////////////////////////////////////////////////////////////////////
function HomeLoginChk()
{
	if ( fbAccountHelper.DoLoginChk() ) {
		setTimeout( HomeLoginChk , 60*1000 );
	}
}

//window.addEventListener("load", function(e) {
function MainEntry() {
	if ( location.href.indexOf('action=heal_avatar&bqh=') >= 0 ) {
		gm.log("Heal Tab, Don't do anything");
		return false;
	}

	if ( location.href.indexOf('&ang108=closetab') >= 0 ) {
		gm.log("Closed Tab, Don't do anything");
		return false;
	}
	
	//Reload account list
	var all_accountList = gm.getValue('account_list','');
	if ( all_accountList.substring(all_accountList.length-1) == '\n' )
		all_accountList = all_accountList.substring(0, all_accountList.length-1);
	fbAccountHelper.accountList = all_accountList.split(/[\n,]/);	
	//gm.log("fbAccountHelper.accountList.length="+fbAccountHelper.accountList.length);
	//for ( var k = 0 ; k < fbAccountHelper.accountList.length ; k++ )
	//	gm.log("acc_" + k + "=" + fbAccountHelper.accountList[k]);
			
	
	// Maintain =================================================================
	if ( location.href.indexOf('/common/error.html') >=0 ) {
		gm.log('Detected error page, go to next account');
		setTimeout( fbAccountHelper.GotoNextAccount, 10*1000);
		return true;
	}
	
	if ( location.href.indexOf('/sorry.php') >=0 ) {
		gm.log('Detected sorry page, go to next account');
		setTimeout( fbAccountHelper.GotoNextAccount, 10*1000);
		return true;
	}
	
	if ( location.href.indexOf('login.php?login_attempt=') >=0 ) {
		gm.log('Detected sorry page, go to next account');
		setTimeout( fbAccountHelper.GotoNextAccount, 10*1000);
		return true;
	}	
		
/*
	var chkError = document.evaluate("//link[@type='stylesheet']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 	
	for (var i = 0; i < chkError.snapshotLength; i++)	{  
		var chker = chkError.snapshotItem(i);
		if ( chker.href.indexOf('sorry.php_files') >= 0 ) {
		gm.log('Maintan!! Go to next account');
			setTimeout( fbAccountHelper.GotoNextAccount, 10*1000);
			return false;		
		}
	}
*/
	// Try again ================================================================
	if(document.getElementById('try_again_button')) {
		gm.log('Detected Try Again message, go to next account');
		setTimeout( fbAccountHelper.GotoNextAccount, 10*1000);
		return true;
	}

	//Disconnect ? ==============================================================
	var pageBody = document.getElementsByTagName('body');
	if ( pageBody[0] && pageBody[0].innerHTML.indexOf("errorTitle") >= 0 && 
		                  pageBody[0].innerHTML.indexOf("errorLongDesc") >= 0 ) 
	{
		gm.log("Disconnect!!, Try again after 5 mins");
		window.setTimeout(fbAccountHelper.GotoCAKeepURL, 5*60*1000);
		return true;
	}
	
	//At Redirect page ==========================================================
	if ( fbAccountHelper.AtRedirectPage() ) 
	{
		gm.log("In Redirect page");
		setTimeout( fbAccountHelper.DoLogout, 500 );
		return true;
	}
	
	//At login page =============================================================
	if ( fbAccountHelper.AtLoginPage() ) 
	{
		gm.log("In FB login page");
		
		if( location.href.indexOf('https://login.facebook.com/login.php?login_attempt=') >= 0 ) {
			gm.log("Too busy to change account, wait more time");
			setTimeout( fbAccountHelper.GotoNextAccount, 10*1000);
			return true;
		}	
		if( location.href.indexOf('/login.php?login_attempt=')>=0) {
			gm.log("Found E-mail/Password error, use next acoount");
			fbAccountHelper.GotoNextAccount();
			return true;
		}
		if( location.href.indexOf('/login.php') >= 0 )
		{
			gm.log("No Login, try again :" + location.href);
			fbAccountHelper.GotoLoginURL();
			return true;
		}
			
		setTimeout( fbAccountHelper.DoLogin, 2000 );
		return true;
	}
	
	//At Home page ==============================================================
	if( fbAccountHelper.AtHomePage() )
	{	
		gm.log("In FB home page");

		fbCAAPHelper.Init();	
		fbCAHelper.Init();
		
		fbAccountHelper.RecordLoginChk();
			
		setTimeout( fbAccountHelper.GotoCAKeepURL, 5000 );
		setTimeout( HomeLoginChk , 60*1000 );
	
		return true;
	}	

	//At CA page ================================================================
	if( location.href.indexOf('http://apps.facebook.com/castle_age')>=0 )
	{
		gm.log("In CA home page");
		fbCAHelper.CreatePanel();
		fbCAHelper.MainLoop();
		return true;
	}	
}

window.setTimeout( function() { MainEntry();},100 );
	


