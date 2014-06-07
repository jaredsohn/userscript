// ==UserScript==
// @name         jiwai.de UI optimizer
// @description  improve some UI element for website www.jiwai.de.
// @version      1.0
// @date         2009-01-25
// @include      http://jiwai.com/*
// @include      http://jiwai.de/*
// @exclude      http://jiwai.com/wo/direct_messages/*
// @exclude      http://jiwai.de/wo/direct_messages/*
// @namespace    http://rbgo.cn
// ==/UserScript==
// Changes
// 0.1.0 2008.02.25 clean the padding of jiwai.de's UI to render more content in one screen.
// 0.2.0 2008.02.26 show the full href for external links which are truncated in jiwai.de.
// 0.2.1 2008.03.05 register menu commands to enable or disable some of the features.
// 0.2.2 2008.03.09 clean more padding of jiwai.de's UI.
// 0.3.0 2008.03.10 "re-tweet" status button in every status' function area.
// 0.4   2008.07.21 auto update
// 0.5   2008.11.22 support the new domain name(jiwai.com) of jiwai and register a update command.
// 0.6   2008.12.01 support both domain names - jiwai.de and jiwai.com
// 1.0   2009.01.25 for the new UI of jiwai.de

// Notice
// i use unsafeWindow a lot, because i trust jiwai.de, and trust users have the ability to keep away from phishing website.

//version for auto update
var ffrb_version = "1.0";

// * Feature 1: clean the padding css
//   Since: 0.1.0
if(registerMenuAndGetPref('enableCleaningPadding', 'cleaning padding')){
  GM_addStyle(<><![CDATA[
  	#header{
		margin-bottom:0px; !important;
  	}
	
	.update {
		margin-bottom:0;!important;
	}
	
	#jw_status{
		height:3.7em; !important;
	}
	
	.mar_b20 {
		margin-bottom:10px;!important;
	}
	
	.one {
		margin-top:0px;!important;
	}
	
	#lefter .one:hover {
		background-color:#f8f8f8;
	}
	
	.one div.lightbg,.msg div.lightbg {
		visibility: hidden;
	}
	
	.one:hover div.lightbg,.msg:hover div.lightbg {
		visibility: visible;
	}
	
	.one .con {
		min-height:50px;
	}
	
	.mar_b50 {
		margin-bottom:15px;!important;
	}
	
	.side1, .side2 {
		margin-bottom:10px;!important;
		padding:0;!important;
	}
	
	.page {
		margin-top:10px;!important;
	}
	
	.rss {
		line-height:20px;!important;
		margin-top: 5px;
	}

  
  ]]></>);
  
  //move the search bar
  var searchBar = unsafeWindow.$ES('ul[class^=jsbor]','lefter');
  if(searchBar.length)
  {
	//move it to the right side column
	searchBar = searchBar[0];
	searchBar.setAttribute('style','padding-top:15px;');
	searchBar.className = 'jsbor';
	unsafeWindow.$ES('div[class=side2]')[0].appendChild(searchBar);
  }
  
  
  //set a timeout to hide the tipnotes
  if(document.getElementById('tipnote'))
	setTimeout(function(){unsafeWindow.JiWai.KillNote('tipnote');},3000);
  
}

// * Feature 2: show the full href for external link
// 	 Since: 0.2.0
if(registerMenuAndGetPref('enableCompletingUrl','completing url')){
   unsafeWindow.$ES('.extlink','lefter').each(function(link){link.innerHTML = link.getAttribute('href')});
}

// * Feature 3: "re-tweet" status button in every status' function area.
// 	 Since: 0.3.0
if(registerMenuAndGetPref('enableReji','retweet button')){

	//if it is a refresh action
	var rejiwaiText = GM_getValue("tempReji",'');
	if(rejiwaiText!='' && haveTextarea())
	{
		var textarea = document.getElementById('jw_status');	
		textarea.value = decodeURIComponent (rejiwaiText);
		GM_setValue("tempReji",'');
	}

	// a re-tweet button image 
	var rejiwaiButtonImage = 'data:image/gif;base64,'+
    'R0lGODlhDgAOALMAANuBUP35y/3Dpuandf/Xv//75umRZequifbYq//59f//2+GIXvfg1v/Yufyz'+
    'kP///yH5BAEHAA8ALAAAAAAOAA4AAARa8MlJ60sY21ecaKAgJNXAZFjjVEZSvG8wsEptBwZDfM9i'+
    '34YXQ3QQKALIwOGQKbQWDQRgeoC9DBwD4GAIFH6KxUSAWCBgNVyFYRi4A4qcZShYuA+byWBBkEQA'+
    'ADs=';
	
	var img = document.createElement('img');
	img.src = rejiwaiButtonImage;
	//img.title = '\u9510\u63A8';

	unsafeWindow.$ES('div[class$=lightbg]','lefter').each(function(s){

		//get the status id
		var id = s.firstChild.getAttribute('rel');
		if(!id)return;
		id = id.substring(0,id.indexOf(':'));
		var rejiwaiLink = s.appendChild(document.createElement('a'));
		rejiwaiLink.setAttribute('href', 'javascript:void(0)');
		rejiwaiLink.setAttribute('title','\u9510\u63A8');
		rejiwaiLink.setAttribute('style','padding-left: 10px;');
		var img_ = img.cloneNode(false);
		rejiwaiLink.appendChild(img_);
		rejiwaiLink.appendText('\u9510\u63A8');
		rejiwaiLink.addEventListener("click",function(e){
			try{
				GM_xmlhttpRequest
				({
		            method:'GET',
		            url: 'http://api.jiwai.de/statuses/show/' + id + '.json',
		            onload:function(httpObj){
						var status = eval('(' + httpObj.responseText + ')');
						var pattern = "\u9510\u63A8\u81EA %s: %t";
						var text = pattern.replace(/%s/ig,"@" + status.user.screen_name).replace(/%t/ig,status.text);

						if(haveTextarea())
						{
							var textarea = document.getElementById('jw_status');
							textarea.value = text;
							document.getElementById('updaterForm').scrollIntoView();
							textarea.focus();
						}else
						{
							// save the text and goto the /wo/ page
							GM_setValue("tempReji",encodeURIComponent (text));
							window.location.href = "/wo/";
							
						}
					}
				});
			}catch(ex){}
		if(!haveTextarea())e.preventDefault();
      	},true);
		
	});
}

//helper method to register menu command
function registerMenuAndGetPref(key,desc,callback)
{
  var value = Number(GM_getValue(key, 1));
  GM_registerMenuCommand(
            (value ? 'Disable ' : 'Enable ') + desc, 
                    function(){
                      GM_setValue(key,value ? 0 : 1);
					  if(null!=callback)callback(value?0:1);
                      window.location.href = window.location.href;
                    });
  return value;
}
//helper method to determine whether we are in the home page
function haveTextarea()
{
	//just look up the textarea
	return document.getElementById('jw_status');
}

//helper method to auto update
function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
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

    if (!SCRIPT.forceUpdate && isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    //var ONE_WEEK = 7 * ONE_DAY;
    //var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (!SCRIPT.forceUpdate && lastChecked && (now - lastChecked) < ONE_DAY) return;

    GM_xmlhttpRequest({
      method: 'GET',
  	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
  	  onload: function(result) {
    	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
    
    	  var theOtherVersion = parseFloat(RegExp.$1);
    	  if (theOtherVersion <= parseFloat(SCRIPT.version))       
        {
          // no updates or older version on userscripts.orge site
          if(SCRIPT.forceUpdate)
          {
            alert("Your installed version " + SCRIPT.version + " is the newest version.")
          }
          return;
        }
        //find the name of the script
        result.responseText.match(/@name\s+(.+)/);
        var scriptName = RegExp.$1;
    
    	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + scriptName + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
    	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
    	  }
  	 }
    });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}

function update(forceUpdate)
{
  autoUpdateFromUserscriptsDotOrg({
    url: 'http://userscripts.org/scripts/source/23208.user.js',
    version: ffrb_version,
    forceUpdate: forceUpdate
  });
}

update(false);

GM_registerMenuCommand('Update from userscript.org',function(){update(true)});

