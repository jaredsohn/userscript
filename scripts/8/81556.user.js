// ==UserScript==
// @name           NewB Xiaxiao
// @description    add functions for NetEase WeiBo
// @namespace      robaggio.net
// @version        4.1
// @date           2010-10-05
// @include        http://t.163.com/*
// ==/UserScript==
// Changes
// 1.0 2010-07-15 first edition.
// 1.1 2010-07-22 search back.
// 1.2 2010-07-31 for newb 2.0, quote retweet.
// 1.2.1 2010-08-01 quote retweet for microlife page.
// 1.2.2 2010-08-02 html decode & reply div css
// 2.0 2010-08-07 merge firefox script and chrome script, add deep retweet and vancl
// 2.1 2010-09-05 rounded corner icon & linked source
// 2.2 2010-09-06 checkbox for linked source
// 2.3 2010-09-08 bug fix
// 3.0 2010-10-05 delete quote retweet function, add location service
// 4.0 2011-01-02 delete location service, add susu support (http://t.163.com/CanHear)
// 4.1 2011-01-12 soloparty support(http://t.163.com/tw0cold)

//version for auto update
var ffrb_version = "4.1";
isChrome = navigator.userAgent.indexOf("Chrome") > -1 ; 

// * Feature 1: css style
GM_addStyle("/*hometimeline top padding*/.status-update  {height:190px;   !important;} .timeLine{margin-top:5px !important;}");

//rounded corner icon
GM_addStyle(".statuses .author{display:inline-block;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;border:solid 0px #999;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.6);-moz-box-shadow:0 1px 3px rgba(0,0,0,.6);}.statuses .author{margin-left:-58px;}.statuses .author img{opacity:0;}");

//reply input
GM_addStyle(".status-talkBox-inputfocus .status-talkBox-textarea{height:54px !important;overflow:auto !important;width: 436px !important;}");

//clear notice
GM_addStyle("#recommend-topiclist{display:none}");

//mouseover action
GM_addStyle(".status-optionbar .option-item:nth-last-child(-n+7){visibility: hidden;} .li-hover .option-item{visibility: visible !important;} .status-optionbar .option-item{float:right !important;}");


function main(isChrome){
	if(isChrome){
		unsafeWindow = window;
	}


	
	/*Feature 2: clear notice board*/
	if(unsafeWindow.$('#update')){
		setTimeout(function(){unsafeWindow.$('#update').style.display='none';},10000);
	}
	
	
	var area = unsafeWindow.$('#sendinfo_text');

	//if it is a refresh action
		var quote_retweet_text = unsafeWindow.$.cookie.get("quote_retweet_text")//GM_getValue("quote_retweet_text",'');
		if(quote_retweet_text!='' && area)
		{
			area.value = decodeURIComponent (quote_retweet_text);
			area.focus();
			area.selectionStart =0;
			area.selectionEnd = 0; 
			//GM_setValue("quote_retweet_text",'');
			unsafeWindow.$.cookie.del("quote_retweet_text");
		}

	// * Feature 3: report spam
	if(unsafeWindow.listPage && unsafeWindow.listPage._pageType=='mine'){
		//we are in some one's page
		var report_link = document.createElement('a');
		report_link.setAttribute('href', 'javascript:void(0)');
		report_link.setAttribute('class','appbtn-icon u-msgBtn');
		report_link.innerHTML = '<em>举报</em>';
		report_link.addEventListener("click",function(e){
					var report_text = "爱微博，爱网易，爱亚运，爱夏小家族，也爱@微博小易，我痛恨spammer，鄙视虚假中奖消息，我是@"+unsafeWindow.userInfo._userName + " 我要举报@" + unsafeWindow.listPage._username;
					unsafeWindow.$.cookie.set("quote_retweet_text", encodeURIComponent (report_text), 5, null, "/");
					window.location.href = "/home";
		      	},true);
	
		unsafeWindow.$("#focus").appendChild(report_link);
	}
	
	
	// * Feature 4: rounded icon
	if(unsafeWindow.templates["status"]){
		unsafeWindow.templates["status"]  = unsafeWindow.templates["status"].replace(/<span class=\"author\">/g,"<span class=\"author\" style=\"background: url(\'<#=_user.profile_image_url#>\') no-repeat scroll left top transparent;width:48px;height:48px\" >");

	}
	
	if(unsafeWindow.templates["retwitterList"]){
		unsafeWindow.templates["retwitterList"]  = unsafeWindow.templates["retwitterList"].replace(/<span class=\"author\">/g,"<span class=\"author\" style=\"background: url(\'<#=_user.profile_image_url#>\') no-repeat scroll left top transparent;width:48px;height:48px\" >");
	}
	
	if (unsafeWindow.templates["message"] ) {
		unsafeWindow.templates["message"]  = unsafeWindow.templates["message"].replace(/<span class=\"author\">/g,"<span class=\"author\" style=\"background: url(\'<#=message._sender.profile_image_url#>\') no-repeat scroll left top transparent;width:48px;height:48px\" >");
	};
	
	//for some reason, some span.author may already been created before the modification of the templtes, so we have to check those span
	var authorSpans = unsafeWindow.$('.author');
	for(i=0;i<authorSpans.length;i++){
		if(!authorSpans[i].style.background){	
			var src = unsafeWindow.$('img',authorSpans[i])[0].src
			authorSpans[i].style.background="url("+ src +") no-repeat scroll left top transparent";
			authorSpans[i].style.width = "48px";
			authorSpans[i].style.height = "48px";
		}
	}
	
	// * Feature 5: susu support
if(unsafeWindow.templates["status"]){
		unsafeWindow.templates["status"]  = unsafeWindow.templates["status"].replace(/取消收藏<\/a>/g,'取消收藏</a> <span class="option-item">|</span> <a onclick="susu_message(\'<#=_id#>\');" hideFocus="true" href="javascript:void(0)" class="option-item" title="用诉诉匿名回复">诉诉</a>');
	}
	
	unsafeWindow.susu_message = function(id){
		var status = unsafeWindow.Status.data[id];
		var rttext = status._text;
		var temp = document.createElement("div");
		temp.innerHTML = rttext;
		rttext = temp.textContent;temp = null; 
		rttext = " ||@" + status._user.name + " " + rttext;
		unsafeWindow.Message.prototype.sendMessage('诉诉','-8122445887266352007');
		var m = unsafeWindow.$("#message_text");
		m.value = rttext;
		m.focus();
		m.selectionStart =0;
		m.selectionEnd = 0; 
	}
	
	var bars = unsafeWindow.$('.status-optionbar');
	for(i=0;i<bars.length;i++){
		//find id
		var status_id = bars[i].parentNode.getAttribute("id");
		status_id = status_id.split("_")[0];
		
		var susu_span = bars[i].appendChild(document.createElement("span"));
		
		susu_span.setAttribute('class','option-item'); 
		susu_span.innerHTML="|";
		susu_span = bars[i].appendChild(document.createElement("span"));
		susu_span.setAttribute('class','option-item'); 
		var susu_link = document.createElement('a');
		susu_link.setAttribute('href', 'javascript:void(0)');
		susu_link.setAttribute('class','option-item');
		susu_link.setAttribute('title','用诉诉匿名回复');
		susu_link.setAttribute('status_id',status_id);
		susu_link.innerHTML = '诉诉';
		susu_link.addEventListener("click",function(e){
		 			unsafeWindow.susu_message(this.getAttribute('status_id'));
		      	},true);
		susu_span.appendChild(susu_link);
	}
	
	//top input
	if(unsafeWindow.$('#sendinfo_lbsbox')){
		var c = unsafeWindow.$('#sendinfo_lbsbox').parentNode;
		var susu_span = c.appendChild(document.createElement("span"));
		susu_span.setAttribute('class','status-update-options');
		susu_span.setAttribute('style','padding-left:8px');
		susu_span.innerHTML = '<span class="link-lb"><a href="javascript:void(0)" class="option" title="用诉诉帮你匿名说话"><em style="background: url(http://oimagea3.ydstatic.com/image?w=16&h=16&url=http%3A%2F%2F126.fm%2FaCHPT) no-repeat scroll 0 0 transparent;cursor: pointer;float: left;height: 16px;margin-right: 3px;margin-top: 2px;padding: 0;width: 16px;"></em><span class="fl">诉诉</span></a></span>';
		susu_span.addEventListener("click",function(e){
				unsafeWindow.Message.prototype.sendMessage('诉诉','-8122445887266352007');
		},true); 
	}
	
	//feature 6 message quote reply

	if(unsafeWindow.listPage && unsafeWindow.listPage._pageType=='message'){
		if (unsafeWindow.templates["message"] ) {
			unsafeWindow.templates["message"]  = unsafeWindow.templates["message"].replace(/_followed_by\) { #>/g,'_followed_by) { #><a href="javascript:void(0)" onclick="quote_message(\'<#=message._messageId#>\')">引用回复</a> | ');
		};
		unsafeWindow.quote_message = function(id){
			unsafeWindow.Message.data[id].reply();
			var message = unsafeWindow.Message.data[id];
			var rttext = message._messageText;
			var temp = document.createElement("div");
			temp.innerHTML = rttext;
			rttext = temp.textContent;temp = null; 
			
			//soloparty转发的时候不要发件人
			
			if(unsafeWindow.listPage._index == 0){
				if(message._sender.name=='SoloParty'){
					rttext = " || " + rttext;
				}else{
					rttext = " ||@" + message._sender.name + " " + rttext;
				}
			}else{
				if(message._sender.name=='SoloParty'){
					rttext = " || " + rttext;
				}else{
					rttext = " ||@" + message._receiver.name + " " + rttext;
				}
			}
			

			var m = unsafeWindow.$("#message_text");
			m.value = rttext;
			m.focus();
			m.selectionStart =0;
			m.selectionEnd = 0; 
		}
		var bars = unsafeWindow.$(".option");
		for(i=0;i<bars.length;i++){
			bars[i].insertBefore(document.createTextNode(" | "), bars[i].firstChild);
			var message_id = bars[i].parentNode.parentNode.parentNode.getAttribute("id");
			var quote_a = document.createElement("a");
			quote_a.setAttribute('href', 'javascript:void(0)')
			quote_a.setAttribute('message_id',message_id);
			quote_a.innerHTML = '引用回复';
			bars[i].insertBefore(quote_a, bars[i].firstChild);
			
			
			quote_a.addEventListener("click",function(e){
						unsafeWindow.quote_message(this.getAttribute('message_id'));
					},true);
		}
		//add button
		var soloparty_button = unsafeWindow.$('.private-link')[0].appendChild(document.createElement("a"));
		soloparty_button.setAttribute('href', 'javascript:void(0)');
		soloparty_button.setAttribute('class','sendinfo-btn fr');
		soloparty_button.setAttribute('style','margin-right:10px');
		soloparty_button.innerHTML='SoloParty';
		soloparty_button.addEventListener("click",function(e){
				unsafeWindow.Message.prototype.sendMessage();
				unsafeWindow.$("#replyer").value = 'SoloParty';
				unsafeWindow.listPage._replyerFlag = true;
				unsafeWindow.$("#message_text").focus();
		},true); 
	}
	
}

if(isChrome){
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')(true);'));
	(document.body || document.head || document.documentElement).appendChild(script);
}else{
	main(false);
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
	    url: 'http://userscripts.org/scripts/source/81556.user.js',
	    version: ffrb_version,
	    forceUpdate: forceUpdate
	  });
	}

	update(false);

	GM_registerMenuCommand('Update from userscript.org',function(){update(true)});
	
}