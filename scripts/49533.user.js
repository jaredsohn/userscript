// ==UserScript==
// @name           FriendFeed Don't Scroll off!
// @namespace      http://mistapostle.blogspot.com/
// @description    Make FriendFeed don't scroll off when updates comes in realtime mode. The number of new updates will be shown in a message box at the top. The new entries that are hidden can be display by clicking the link in the message box.
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*      
// @version        0.3
// @author         Mistapostle (Jammy Lee)
// @homepage       http://mistapostle.appspot.com/
// @copyright      2009,Mistapostle (http://mistapostle.appspot.com/)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript== 
var version = 0.3 ;
var scriptId = 49533  ; 
var current_news_count = 0 ;
/*function addGlobalStyle(css){
	var head,style;
	head = document.getElementsByTagName('head')[0] ;
	if (!head) return ; 
	style = document.createElement('style');
	style.type="text/css" ; 
	style.innerHTML = css ; 
	head.appendChild(style);
}*/

function xpath(path){
	return document.evaluate(path,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

function show_entries(){
	//GM_log("show_entries ");
	var l_entries =  xpath("//div[@class='l_entry entry']");
	for( var i = 0 ; i < l_entries.snapshotLength; i++){
		var e = l_entries.snapshotItem(i) ; 
		e.setAttribute('class','l_entry entry _jam_show');
	}
	current_news_count = 0 
	refresh_win() ;
	window.scrollTo(0,0);
}
function check_news(){
	var l_entries = xpath("//div[@id='feed']/div");
	var count = 0 ;
	for ( ;count < l_entries.snapshotLength && l_entries.snapshotItem(count).getAttribute('class') == 'l_entry entry';count++) ; 
       	if ( count > current_news_count){ 
		//alert( count + " news ") ; 
		current_news_count = count; 
		refresh_win(); 
	}
	//GM_log('check_news : ' + current_news_count ) ;
}
function refresh_win(){
	jam_win.innerHTML = '<a href="#" > '+current_news_count + " update(s)</a>" ; 
	jam_win.style.left = document.body.clientWidth /2 - jam_win.style.width /2 + "px" ;
}
function check_version(){
	var current_date = Math.round(new Date().getTime() /1000);
	var last_check_date = GM_getValue('last_check_date',0);
	//GM_log('check_version');
	//GM_log("last_check_date="+last_check_date);
	//GM_log("current_date="+current_date);
	if((current_date - last_check_date ) >86400){
		//GM_log('do check');
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptId+".meta.js",
			headers: {
			"User-Agent": "Mozilla/5.0",            // Recommend using navigator.userAgent when possible
			/*"Accept": "text/xml" */
			},
			onload: function(response) {
				if (response.status=200){
					//GM_log(response.responseText);
					var site_version = parseFloat(/@version *(\d*\.\d*)/i.exec(response.responseText)[1]);
					if (site_version > version){
						//show update msg
						var update_msg_div =document.createElement("div");
						update_msg_div.id = "_scroll_off_new_version_div";
						var left = document.body.clientWidth /2 + 150 + "px";
						GM_addStyle("#_scroll_off_new_version_div{position:absolute;background:yellow;padding:0px 5px 2px 5px;font-size: 13px;width:320px ;top:0px ; left:"+ left+" } #_scroll_off_new_version_div p{padding:0;margin:0}#_close_scroll_off_new_version_div{text-align:right;font-size:120%}");

						update_msg_div.innerHTML='<p id="_close_scroll_off_new_version_div"><a href="#">X</a></p><p>New version of "FriendFeed Don\'t scroll off" is available now. Please click <a target="_blank" href="http://userscripts.org/scripts/show/49533" >this link</a> to see details and install the  new version.(This message will be hide in one minute)';
						document.body.appendChild(update_msg_div); 
						function _hide_msg(){
							update_msg_div.style.display="none" ; 

						}
						document.getElementById('_close_scroll_off_new_version_div').addEventListener('click', function (event){
								_hide_msg() ; 
								event.stopPropagation();
								event.preventDefault();
								},true) ; 
						setTimeout(_hide_msg,60000);


						
					}
					GM_setValue('last_check_date', current_date);
					//GM_log('last_check_date='+GM_getValue('last_check_date'));
				}else{
				GM_log(response.status) ; 
				}
			}});
	}	

}
var realtimestatus = xpath("//div[@id='realtimestatus']");
if(realtimestatus.snapshotLength ==1 && !realtimestatus.snapshotItem(0).innerHTML){
	check_version();
	GM_addStyle("div.l_entry.entry{display:none  !important}div.l_entry.entry._jam_show{display:block  !important}/*div.l_entry.entry:not(._jam_show)  ~ div.l_entry.entry._jam_show{display:block}*/div.l_entry.entry._jam_show  ~ div.l_entry.entry:not(._jam_show){display:block  !important}");
	GM_addStyle("#_jam_win{-moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;padding:1px 9px 1px 9px;font-weight:900;position:fixed;top:0px;background:yellow;}");

	var jam_win = document.createElement('div');
	jam_win.id= "_jam_win" ; 

	document.body.appendChild(jam_win); 

	jam_win.addEventListener('click', function (event){
			show_entries() ; 
			event.stopPropagation();
			event.preventDefault();
			},true) ; 

	show_entries() ; 

	window.setInterval( check_news , 5000) ; 

}
