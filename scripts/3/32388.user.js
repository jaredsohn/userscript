// ==UserScript==
// @name         Xiaonei Coal Minning Team
// @description  快速指挥校内(xiaonei.com)应用"好友买卖"的宠物进行挖煤
// @version      0.1
// @date         2008-08-24
// @include      http://friendsell.xiaonei.com/friendsell/home.do*
// @include      http://friendsell.xiaonei.com/friendsell/comfort.do*
// @include      http://friendsell.xiaonei.com/friendsell/abuse.do*
// @namespace    http://rbgo.cn
// ==/UserScript==

//======auto update function======
//version for auto update
var ffrb_version = "0.1";
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

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    //var ONE_WEEK = 7 * ONE_DAY;
    //var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < ONE_DAY) return;

    GM_xmlhttpRequest({
      method: 'GET',
  	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
  	  onload: function(result) {
    	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
    
    	  var theOtherVersion = parseFloat(RegExp.$1);
    	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site
    
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
    autoUpdateFromUserscriptsDotOrg({
      url: 'http://userscripts.org/scripts/source/32388.user.js',
      version: ffrb_version,
    });
    
//======xiaonei function======
    var manningButton = document.createElement("input");
    manningButton.type = "button";
    manningButton.className="inputbutton bold";
    manningButton.value = "\u6316\u7164\u56E2\u5F00\u5DE5";
    manningButton.id= "manningButton"
    
    document.getElementById('f_search').parentNode.appendChild(manningButton);
    
    manningButton.addEventListener("click",function(event) {
        var button = document.getElementById('manningButton');
        button.value="\u6316\u7164ing..."
        button.className="inputbutton bold gray";
        button.disable=true;
        var friend_list = document.evaluate('//ul[@class="helotlist"]/li',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
          for(var i=0;i<friend_list.snapshotLength/*1*/;i++){
            var friend_id = /*'sl_251284303';*/friend_list.snapshotItem(i).id;
            //获取id
            friend_id = friend_id.split('_')[1];
            //组织两个post

            GM_xmlhttpRequest({
              method: 'GET',
          	  url: 'http://m.xiaonei.com/friendsell/handle.do?i='+friend_id+'&op=abuse&type=5'
          	});
          }
          
          setTimeout("location.href=location.href",6000);
    },true);