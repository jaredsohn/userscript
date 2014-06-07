	// ==UserScript==
	// @name           Better Beta FriendFeed
	// @namespace http://sheenonline.biz/
	// @include        http://beta.friendfeed.com/*
        // @include        http://friendfeed.com/*
	// ==/UserScript==

	var betterffbeta_version = "0.22";

	var defaultTabs = new Array();
	defaultTabs[0] = new Object();
	defaultTabs[0].name = "Google Reader";
	defaultTabs[0].url = "http://google.com/reader";
	defaultTabs[0].favicon = "http://www.google.com/reader/ui/favicon.ico";
	defaultTabs[0].checked = "checked";

	defaultTabs[1] = new Object();
	defaultTabs[1].name = "GMail";
	defaultTabs[1].url = "https://mail.google.com/mail/?ui=html&zy=a";
	defaultTabs[1].favicon = "http://mail.google.com/mail/images/favicon.ico";
	defaultTabs[1].checked = "checked";

	defaultTabs[2] = new Object();
	defaultTabs[2].name = "Identi.ca";
	defaultTabs[2].url = "http://identi.ca/";
	defaultTabs[2].favicon = "http://identi.ca/favicon.ico";
	defaultTabs[2].checked = "checked";

	function Settingsobject(){
	  this.prefix="";
	  this.default={};
	}
	Settingsobject.prototype.set=function(name, value){
	  if(typeof value == "boolean")
	    value = value ? "{b}1" : "{b}0";
	  else if(typeof value == "string")
	    value = "{s}" + value;
	  else if(typeof value == "number")
	    value = "{n}" + value;
	  else
	    value = "{o}" + value.toSource();
	  GM_setValue(this.prefix+""+name, value);
	}
	Settingsobject.prototype.get=function(name){
	  var value=GM_getValue(this.prefix+""+name, this.default[name] || "{b}0")
	  if(!value.indexOf)
	    return value;
	  if(value.indexOf("{o}")==0){
	    try{
	      return eval("("+value.substr(3)+")");
	    }catch(e){
	      GM_log("Error while calling variable "+name+" while translating into an object: \n\n"+e+"\n\ncode:\n"+value.substr(3))
	      return false;
	    }
	  }
	  if(value.indexOf("{b}")==0)
	    return !!parseInt(value.substr(3));
	  if(value.indexOf("{n}")==0)
	    return parseFloat(value.substr(3));
	  if(value.indexOf("{s}")==0)
	    return value.substr(3);
	  return value;
	}
	Settingsobject.prototype.register=function(name, defaultvalue){
	  this.default[name]=defaultvalue;
	  return true;
	}

	var globalSettings=new Settingsobject();
	globalSettings.prefix="global.";

	var theTabs = globalSettings.get("fftabs") ? globalSettings.get("fftabs") : defaultTabs;
	var cleanerFF = globalSettings.get("cleanerFF") ? globalSettings.get("cleanerFF") : false;
	var rewordLike = globalSettings.get("rewordLike") ? globalSettings.get("rewordLike") : false;
	var rewordLikeWord = globalSettings.get("rewordLikeWord") ? globalSettings.get("rewordLikeWord") : "Flag";

	(function() {
	
	  autoUpdateFromUserscriptsDotOrg({
		name: 'Better Beta FriendFeed',
		url: 'http://userscripts.org/scripts/source/32513.user.js',
		version: betterffbeta_version,
	});	 	
			
	  function hideOptions()
	  {
		document.getElementById("optionsDiv").className="hidden";
		document.getElementById("modalDiv").className="hidden";
	  }
	  
	  function setOptions(event) { 
		i = event.target.id.replace(/[^0-9]+/,'');
		theTabs[i].checked == "checked" ? theTabs[i].checked = "" : theTabs[i].checked = "checked";
	  }
	  
	  function cleanerFFcb(event) { 
		cleanerFF = event.target.checked;
	  }
	  
	  function rewordLikecb(event) { 
		rewordLike = event.target.checked;
		rewordLikeWord = getElementById("rewordLikeWord").value;
	  }
	  
	  function saveOptions(event) { 
		globalSettings.set("fftabs", theTabs);
		globalSettings.set("cleanerFF", cleanerFF);
		globalSettings.set("rewordLike", rewordLike);
		globalSettings.set("rewordLikeWord", rewordLikeWord);
	  }
	  
	  function addTab() {
	    newTab = new Object();
		newTab.name = document.getElementById("tabName").value;
		newTab.url = document.getElementById("tabURL").value;
		newTab.checked = "checked";
		newTab.favicon = document.getElementById("tabIcon").value == "" ? newTab.url + "/favicon.ico" : document.getElementById("tabIcon").value;
		theTabs.push(newTab);
		globalSettings.set("fftabs", theTabs);
	  }
	  
	  function delTab(event) {
		i = event.target.id.replace(/[^0-9]+/,'');

		theTabs.splice(i,1);
		globalSettings.set("fftabs", theTabs);
	  }

	  function showOptions() {	
		var div1=document.getElementById("modalDiv");
		if (div1==null)
		{
			GM_addStyle("#modalDiv{position:fixed; top:0px; left:0px; z-index:10; width:100%; height:100%; background-color:black; opacity:0.75;}");
			GM_addStyle(".hidden{display:none; visibility:hidden;}");
			
			div1=document.createElement("DIV");
			div1.id="modalDiv";
			div1.className="hidden";
			div1.title="Click to cancel and close";
			document.body.appendChild(div1);
			
			div1.addEventListener("click",hideOptions,false);
		}
		var div2=document.getElementById("optionsDiv");
		if (div2==null)
		{
			GM_addStyle("#optionsDiv{position:fixed; top:10%; left:20%; z-index:20; width:50%; height:80%; background-color:white; border:solid 3px #0033CC; overflow:auto;} #optionsDiv fieldset {float:left; width: 20%;} #optionsFooter {clear:both;} #addButton {float:left;} ");
			
			div2=document.createElement("DIV");
			div2.id="optionsDiv";
			div2.className="hidden";
			div2.setAttribute("style","text-align:justify;padding:10px");
			
			var text1="";
			text1+="<center><font size=\"+1\">Better Beta FriendFeed</a> Options</font><br>By:&nbsp;<a href=\"http://sheenonline.biz\" target=\"_blank\">Rahsheen Porter</a></center>";
			text1+="<form id=\"YTTA\" name=\"titleform\">";
			text1+="<span>Enable Cleaner FF&nbsp;<input id='cleanerFFcheckbox' type='checkbox' " + (cleanerFF ? "checked" : "") + "/></span><br/><br/>";
			text1+="<span><input id='rewordLikecheckbox' type='checkbox' " + (rewordLike ? "checked" : "") + "/>";
			text1+="<span>Replace \"Like\" with <input id='rewordLikeInput' type='text' value='" + rewordLikeWord + "'/></span><br/><br/>";
			text1+="<span id='defineNewTab'><br/>Define New Tab:</span>";
			text1+="<fieldset><legend>Name</legend><input type='text' id='tabName'/></fieldset>";
			text1+="<fieldset><legend>URL</legend><input type='text' id='tabURL'/></fieldset>";
			text1+="<fieldset><legend>Favicon URL (optional)</legend><input type='text' id='tabIcon'/></fieldset><input type='button' value='Add' id='addButton' /><br/><br/>";
			text1+="<hr id=\"optionsFooter\"/><center><input type=\"button\" value=\"Ok\" id=\"okButton\" /><input type=\"button\" value=\"Cancel\" id=\"cancelButton\" /></center></form>";
			div2.innerHTML=text1;
			document.body.appendChild(div2);
			document.getElementById("okButton").addEventListener("click",function(){saveOptions();hideOptions();location.reload(true);},false);
			document.getElementById("cancelButton").addEventListener("click",function(){hideOptions();},false);
			document.getElementById("addButton").addEventListener("click",function(){addTab();hideOptions();location.reload(true);},false);
			document.getElementById("cleanerFFcheckbox").addEventListener("click",function(e){cleanerFFcb(e);},false);
			document.getElementById("rewordLikecheckbox").addEventListener("click",function(e){rewordLikecb(e);},false);
			
			for (var i=0;i<theTabs.length;i++)
			{
				theId = theTabs[i].name.toLowerCase().replace(/[^a-zA-Z 0-9]+|\s+/g,'');
				theName = theTabs[i].name;
				theIcon = theTabs[i].favicon;
				theUrl = theTabs[i].url;
				
				checkOption = document.createElement("div");
	            checkOption.innerHTML = "<a href='#' id='del" + theId + i + "'>x</a>&nbsp;<img width=16 height=16 src='" + theIcon + "' id='" + theId + "icon'/>&nbsp;<span id='" + theId + "label'>" + theName + "</span>";
				
				newCheck = document.createElement('input');
				newCheck.type = "checkbox";
				newCheck.checked = theTabs[i].checked;
				newCheck.id = theId + i;
				newCheck.addEventListener("click",function(e){setOptions(e);},false);
				checkOption.appendChild(newCheck);
							
				theEnd = document.getElementById("defineNewTab");
				theEnd.parentNode.insertBefore(checkOption, theEnd);
				
				delButton = document.getElementById("del" + theId + i);
				delButton.addEventListener("click",function(e){delTab(e);hideOptions();location.reload(true);},false);
			}

		}
		document.getElementById("optionsDiv").className="";
		document.getElementById("modalDiv").className="";
		div1.className="";
		div2.className="";
	  }

	  function tab_setup(name, url, favicon) {
	    //Based on the awesome works of Duncan Riley
		//homepage   http://www.inquisitr.com/
	    
		tabLink = name.toLowerCase().replace(/[^a-zA-Z 0-9]+|\s+/g,'');

		$('.account').before('<td class="l_tab" style="padding-right: 10px;" id="tdtabtm"><div class="rounded bb" id="tabtm"><div class="t"><div class="l"><div class="r"><div class="tl"><div class="tr"><div class="body"><a id="tab-link-' + tabLink + '" href="#"><img width=16 height=16 src="' + favicon  + '"></a></div></div></div></div></div></div></div></td>');
		$('#tab-link-' + tabLink).click(function() {
				$('#subtabs').hide();
				$('#main').css("height","100%").html('<div class=iframe style="width:100%;height:100%;"><iframe id="content_iframe" marginWidth=0 marginHeight=0 src="' + url + '" frameBorder=0 style="width:100%;height:100%;overflow:auto;"></iframe></div>');
				$('.tabs').find('td').removeClass("selected");
				$('.tabs').find('td').find('.rounded').removeClass("white");
				$('.account').find('#tabtm').addClass("white");
				$('.account').find('#tdtabtm').addClass("selected");
			});
	  }
	  
	  function lets_jquery() {
		GM_registerMenuCommand('Better Beta FriendFeed', showOptions);
		
			if (cleanerFF) {
				//Based on the Cleaner FriendFeed Script
				// author        AJ Batac
				// homepage   http://www.allanjosephbatac.com/blog/
				var css = "@namespace url(http://www.w3.org/1999/xhtml); *::-moz-selection{ background:#ECF2FA !important; color:#ffffff !important; } *{ font-family: \"Trebuchet MS\", \"Arial\", \"Serif\" !important; color: #000000; } a,a:link,a:visited{ text-decoration:none !important; color:#276DCD !important; } a:hover{ color:#333333 !important; border-bottom:1px dotted #333333 !important; } a:active{ text-decoration:none !important; color:#f4a460 !important; } .comment {color: black !important;} .comment.friend { color: black !important; background-color:#ffffe0 !important; /*Highlight your friends comments*/ } .comment.owner.friend { background-color:#e1f0ff !important; /*Highlight your own comments*/ } .tabs{ left:2.2em !important; } #infobox .body .tl{ background:none !important; } #infobox{ padding-top:2em !important; } .account{ font-size:.8em !important;} #rightsearch{ font-size:.8em !important; padding-top:2.3em !important; } .cluster{ border-bottom:1px dotted #708090 !important; padding-bottom:1em !important; }";
				if (typeof GM_addStyle != "undefined") {
					GM_addStyle(css);
				} else if (typeof addStyle != "undefined") {
					addStyle(css);
				} else {
					var heads = document.getElementsByTagName("head");
					if (heads.length > 0) {
						var node = document.createElement("style");
						node.type = "text/css";
						node.appendChild(document.createTextNode(css));
						heads[0].appendChild(node); 
					}
				}
			}
			
			if(rewordLike) {
				var allSpans, thisSpan;
				allSpans = document.evaluate(
				  "//span[@class='like']",
				  document,
				  null,
				  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				  null
				);
				for (var i = 0; i < allSpans.snapshotLength; i++) {
				  thisSpan = allSpans.snapshotItem(i);		
				  thisSpan.innerHTML = ' - <a class="l_like" href="#">' + rewordLikeWord + '</a>';
				}
			}
			
			for (var i=0; i<theTabs.length; i++)
			{
				if(theTabs[i].checked == "checked") {
					tab_setup(theTabs[i].name, theTabs[i].url, theTabs[i].favicon);
				}
			}
	  } 

	  function jquery_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
		else { $ = unsafeWindow.jQuery; lets_jquery(); }
	  }

	  jquery_wait();

	})();
	
function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
  //   name: 'RSS+Atom Feed Subscribe Button Generator',
  //   url: 'http://userscripts.org/scripts/source/688.user.js',
  //   version: "1.2",
  // });
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}