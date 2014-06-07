// ==UserScript==
// @name         cnBeta.COM 2 jiwai.de
// @description  将在cnBeta.COM的打分和评论支持同步发送到jiwai.de上。
// @version      0.3
// @date         2008-07-24
// @include      http://www.cnbeta.com/articles/*.htm
// @namespace    http://rbgo.cn
// ==/UserScript==

//version for auto update
var ffrb_version = "0.3";

var title = document.getElementById('news_title').innerHTML;
var link = location.href;

function handleStarLinkEvents(){

	var links= document.evaluate("//a[contains(@class,' rater')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(links==null) return;
	
	for(var i=0;i<links.snapshotLength;i++){
		links.snapshotItem(i).addEventListener("click",function(e){
		
		  if(!isSync())return;
		  
		  var scoreTarget;
      //通过href中是否以&s=1结尾判断，是给文章打分，还是给人或事打分
      if(e.target.href.indexOf("&s=1")!= e.target.href.length-4){
        scoreTarget = "这篇文章";
      } else {
        scoreTarget = "文中人物事件"
      }
			var status = "在cnBeta拜读了\"" + title + "\" - "+ link+" ，觉得" + scoreTarget + "\"" + e.target.title + "\"。";
			
			//GM_log(status);
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://api.jiwai.de/statuses/update.xml', 
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: 'status=' + status,
				onload: function(responseDetails) {
				  if(responseDetails.status==200){
				    //we do not have enough space so
				    var p = document.evaluate("//p[contains(@class,'voted')]",document.getElementById('mark_content'),null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
				    p.innerHTML = p.innerHTML.substring(2);
				    //find out the thanks span
				    var span= document.evaluate("//span[contains(@class,'thanks')]",document.getElementById('mark_content'),null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
            span.innerHTML="已同步到叽歪";
          }

				}
			});
			e.preventDefault();
		},true);

	}
}

function handleSupportLinkEvents(){
  var sps= document.evaluate("//span[contains(@class,'mark')]/a[2]",document.getElementById('contentWrapper'),null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(sps==null) return;
	for(var i=0;i<sps.snapshotLength;i++){
	   sps.snapshotItem(i).addEventListener("click",function(e){
	     
	     if(!isSync())return;
	     
	      var status = e.target.parentNode.parentNode.previousSibling.previousSibling.innerHTML.replace(/^\s+/, '').replace(/\s+$/, '');
	      status = "在cnBeta支持了评论\""+status+"\",来自文章\""+title+"\"-" + link;
	      //注意，这里有时候cnbeta会因为已经支持过一次而不让用户再次支持，但不会影响同步到叽歪
	      
	     	GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://api.jiwai.de/statuses/update.xml', 
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: 'status=' + status,
				onload: function(responseDetails) {
				  if(responseDetails.status==200){
				    
				    var tipDiv = e.target.parentNode.parentNode.nextSibling.nextSibling.childNodes[1];
            tipDiv.innerHTML = tipDiv.textContent + ", 已同步到叽歪";
          }

				}
			});
	   },true);
	}
}

function addSwitchCheckbox(){
  var div = document.getElementById('news').childNodes[3];
  var checkbox = document.createElement('input');
  checkbox.type='checkbox';
  checkbox.id='sync_jiwai';
    //save preference when click
  checkbox.addEventListener('click',function(e){
    GM_setValue("sync",checkbox.checked?1:0);
  },false);
  
  div.appendChild(checkbox);
  var span = document.createElement('label');
  span.innerHTML='同步到叽歪';
  span.setAttribute('for','sync_jiwai');
  span.setAttribute('style','color:#993366; font-weight:bold');
  div.appendChild(span);
  //set checkbox
  var needSync = Number(GM_getValue("sync", 1));
  if(needSync){
    checkbox.checked=true;
  }  

}

function isSync(){
  return document.getElementById('sync_jiwai').checked;
}

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

addSwitchCheckbox();
handleStarLinkEvents();
handleSupportLinkEvents();
autoUpdateFromUserscriptsDotOrg({
  url: 'http://userscripts.org/scripts/source/24347.user.js',
  version: ffrb_version,
});