// ==UserScript==

// @name           cz_catchup

// @namespace      http://userscripts.org/users/93551

// @include        *lolthai*/oforums.php*
// @include        *lolthai*/forums.php*
// @include        *lolthai*/markets.php*

// @include        *madoomee*/oforums.php*
// @include        *madoomee*/forums.php*
// @include        *madoomee*/markets.php*

// ==/UserScript==


var APP_NAME = "CATCHUP"
var VERSION = "0.5.2";
var ID_PREFIX = APP_NAME + "_" + VERSION + "_";
var maxSize = 100;
var service_server = 'http://lolthai-ext.appspot.com/catchup/';
var archive_mode = 'a';
var forums_mode = 'f';
var markets_mode = 'm';
var bookmark_text = 'Bookmark This Topic';
var title_text = '--- :: Catch up';
var heading_text = 'Catch up';
var default_style = 'styles/default.css';

/*
 * Greasemonkey Value
 */
var uid_val_name = 'cz_user_id'
var style_val_name = 'css_style';
var head_template_val_name = 'head_template';
var body_template_val_name = 'body_template';
var fid_val_name = 'forums_ids';
var ftitle_val_name = 'forums_names';
var mid_val_name = 'markets_ids';
var mtitle_val_name = 'markets_names';

function xpathFirst(p, c) {
  var doc = document;
  if( c && c.ownerDocument ){
    doc = c.ownerDocument;
  }
  return doc.evaluate( p, c||doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;
}

function $x(p,c) {
  var i, r = [], x=document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (i=x.iterateNext()) r.push(i);
  return r;
}

/* warper for get value */
function get_value(id, default_value){
	if(window.localStorage){
		var value = window.localStorage.getItem(ID_PREFIX+id);
		if(value){
			return value;
		}
	}else if(GM_getValue){
		return GM_getValue(ID_PREFIX+id, default_value);
	}else{
		return default_value;
	}
}

/* warper for save value */
function set_value(id, value){
	if(window.localStorage){
		window.localStorage.setItem(ID_PREFIX+id, value);
	}else if(GM_setValue){
		GM_setValue(ID_PREFIX+id, value);
	}
}

/* warper for http request */
function httpRequest(method, url, loadFunction, data){
	GM_xmlhttpRequest({
		method:method,
		url:url,
		headers:{
			"User-Agent":APP_NAME+"_"+VERSION,
			"Content-type":"application/x-www-form-urlencoded",
			"Accept":"text/monkey,text/xml",
		},
		data:data,
		onload:loadFunction
	});	
}

function getTemplate(){
	set_value(head_template_val_name, xpathFirst('//head').innerHTML);
	set_value(body_template_val_name, xpathFirst('//body').innerHTML);
}

function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return;
}

function isLastPage(doc){
	var multiPage = xpathFirst("//body/table[2]/tbody/tr[2]/td/p/a", doc);
	if(!multiPage){
		return true;
	}
	var notLastPage = xpathFirst("//body/table[2]/tbody/tr[2]/td/p/a[last()]", doc).innerHTML.match("Next");
	return notLastPage?false:true;
}

function getUserId(){
	//try to get from cookie first
	if(getCookie('xid')){
		set_value(uid_val_name, getCookie('xid'));
		return;
	}
	
	//get profile page
	var url = xpathFirst("//a[(text()='Profile')]").href;
	if(url){
		httpRequest("GET", url, 
			function(result) {
				//get user id from user instead
				if (result.status != 200) {
					var user_id = prompt("Cannot get user id, please put your user id:");
					while(user_id  == null || user_id  == ''){
						if(user_id ==null)return;
							user_id = prompt("Please Enter Anything");
					} 
					set_value(uid_val_name, id);
					return;
				}

				var doc = document.createElement("div");
				doc.innerHTML = result.responseText;
				var id = xpathFirst("//h1/a", doc).href.match("id=(.*)")[1];
				
				set_value(uid_val_name, id);
				
				doc.innerHTML = '';
			}
		);
	}
}

function getCatchUp(mode){
	httpRequest("GET", service_server+"query?u="+get_value(uid_val_name)+"&m="+mode,
		function(result){
			if (result.status != 200) {
				return;
			}
			
			var response = result.responseText;

			// no bookmark
			if(response=='x')
				return;
				
			//	get JSON from server and change to javascript object
			var myObj = eval('(' + response + ')');
			var temp1 = new Array();
			var temp2 = new Array();
			var temp3 = new Array();
			for (var i in myObj.b){
				temp1.push(myObj.b[i].i);
				temp2.push(myObj.b[i].t);
				temp3.push(myObj.b[i].l);
			}

			catchUp(temp1, temp2, mode, temp3);
			document.title = title_text;
		}
	);
}

function postBookmark(h1, atag, mode, text, last){
	var tid = window.location.href.match("topicid=([0-9]*)")[1];
	
	httpRequest("POST", service_server+"update",
		function(result){
			if (result.status != 200) {
				return;
			}

			var response = result.responseText;
			if(response=='d'){	//duplicate
				alert('Already bookmarked');
			}else if(response=='m'){	//max allow bookmark
				alert('Too much bookmarks ('+maxSize+'), try to remove other topics');
			}else if(response=='y'){	//successful, get CSS style
				set_value(style_val_name, xpathFirst('//link[contains(@rel,"style")]').href.match("styles.*")[0]);
				h1.removeChild(atag);
			}
		}
		,"u="+get_value(uid_val_name)+"&m="+mode+"&i="+tid+"&t="+text+"&l="+last);
}


function catchUp(ids, titles, mode, lasts){

	if(ids.length==0)
		return;
	
	// head and css
	var head = xpathFirst('//head');
	if (get_value(head_template_val_name)){
		tempValue = get_value(head_template_val_name);
		
		//replace style if exists
		if(get_value(style_val_name)){
			tempValue = tempValue.replace(/styles\/[^\\"]*css/, get_value(style_val_name, default_style));
		}
		
		head.innerHTML = tempValue

	}else{

		var styles = get_value(style_val_name, default_style);
		var newSS=document.createElement('link');
		newSS.rel='stylesheet';
		newSS.type='text/css';
		newSS.href=escape(styles);
		head.appendChild(newSS);
	}

	
	// body
	var body = xpathFirst('//body');
	var outertd = buildTD(ids, titles, mode, lasts);

	if (get_value(body_template_val_name)){
		body.innerHTML = get_value(body_template_val_name);
		var old_td = body.getElementsByClassName('outer')[1];
		var outertr = old_td.parentNode;

		//remove old td
		outertr.innerHTML = '';
		outertr.appendChild(outertd);
	}else{
		//outer table
		var outertable = document.createElement("table")
		outertable.setAttribute("width", "100%");
		outertable.setAttribute("cellspacing", "0");
		outertable.setAttribute("cellpadding", "10");
		outertable.setAttribute("class", "mainouter");
		outertable.setAttribute("border", "1");
		outertable.setAttribute("align", "center");

		//outer tr,td
		var outertr = document.createElement("tr");
		outertr.appendChild(outertd);
		outertable.appendChild(outertr)
		
		body.innerHTML = '';
		body.appendChild(outertable);
	}
	
	//do new post check
	catchRefresh();
}
	
function catchRefresh(){
	//goto all link and check for new post
	var at = $x('//a[@name="topic"]');
	var as = $x('//a[@name="last"]');
	for (i in at){
		//go to last page and get last post, make request
		window.setTimeout(httpRequest, i*1000, "GET", at[i].href, checkNewerPostWith(as[i]));
	}
}

function getLastPost(text){
	var myRegexp = /name=([^<|>]+)[^<]*<a name=last>/g;
	var match = myRegexp.exec(text);
	return match[1];
}

function checkNewerPostWith(atag){
	return function(result) {
		if (result.status != 200) {
			return;
		}
		
		var lastPost = getLastPost(result.responseText);
		if(lastPost != atag.id){
			atag.innerHTML = " <b>(<font color='red'>NEW!</font>)</b> ";
			atag.last = lastPost;
		}
	};
}
	
function buildTD(ids, titles, mode, lasts){
	
	var outertd = document.createElement("td")
	outertd.setAttribute("style", "padding-top: 20px; padding-bottom: 20px;");
	outertd.setAttribute("class", "outer");
	outertd.setAttribute("align", "center");
	
	//heading text
	var h1 = document.createElement('h1');
	h1.innerHTML = heading_text;
	outertd.appendChild(h1);
	
	//inner table
	var tabletag = document.createElement("table")
	tabletag.setAttribute("cellspacing", "0");
	tabletag.setAttribute("cellpadding", "5");
	tabletag.setAttribute("class", "tablea");
	
	//header row
	var trtag = document.createElement("tr");
	var tdtag1 = document.createElement("td");
	var tdtag2 = document.createElement("td");
	
	trtag.setAttribute("class", "tabletitle");

	tdtag1.setAttribute("class", "colhead");
	tdtag2.setAttribute("class", "colhead");
	tdtag2.innerHTML = "Topic";
	
	trtag.appendChild(tdtag1);
	trtag.appendChild(tdtag2);
	tabletag.appendChild(trtag);
	
	for(var i=0;i<ids.length;i++){	
		trtag = document.createElement("tr");
		tdtag1 = document.createElement("td");
		tdtag2 = document.createElement("td");
		var utag = document.createElement("u");
		
		var atag1 = document.createElement("a");
		atag1.id = ids[i];
		atag1.innerHTML = 'Remove';
		atag1.setAttribute("onmouseover","this.style.cursor='pointer'");
		atag1.addEventListener("click", function(ev){
			httpRequest("GET", service_server+"remove?u="+get_value(uid_val_name)+"&m="+mode+"&i="+ev.target.id,
				function(result){
					if (result.status != 200) {
						return;
					}
					tabletag.removeChild(ev.target.parentNode.parentNode.parentNode);
				}
			);
		}, true);
		
		
		tdtag1.setAttribute("class", "tablea");
		tdtag2.setAttribute("class", "tablea");
		
		utag.appendChild(atag1);
		tdtag1.appendChild(utag);
		
		var atag2 = document.createElement("a");
		atag2.id = ids[i];
		atag2.name = 'topic';
		atag2.href = "?action=viewtopic&topicid="+ids[i]+"&page=last#last";
		atag2.innerHTML = "<b>"+titles[i]+"</b>";
		atag2.addEventListener("click", function(ev){
			var tid = ev.target.parentNode.id;
			var last = ev.target.parentNode.nextSibling.last;
			if(last){
				httpRequest("POST", service_server+"last", null, "u="+get_value(uid_val_name)+"&m="+mode+"&i="+tid+"&l="+last);
			}
		}, true);
		
		var atag3 = document.createElement("a");
		atag3.name = 'last';
		atag3.id = lasts[i]
		
		tdtag2.appendChild(atag2);
		tdtag2.appendChild(atag3);

		trtag.appendChild(tdtag1);
		trtag.appendChild(tdtag2);
		
		tabletag.appendChild(trtag);
	}
	
	outertd.appendChild(tabletag);
	
	return outertd;
}

function display(val1, val2, mode){
	var h1 = xpathFirst('//h1');
	var text = h1.lastChild.nodeValue.substring(2);
	if(!xpathFirst('//a[@id=BM]')){
		h1.innerHTML = h1.innerHTML + ' ';
		
		var atag = document.createElement("a");
		atag.id = "BM"
		atag.href = "#";
		atag.innerHTML = '<b><font size=3 color=blue>'+bookmark_text+'</font></b>';

		// add this topic to bookmark
		atag.addEventListener("click", function(){
			if(!isLastPage()){
				//not last page, make request
				var currentPage = location.href;

				var reg = /page=(.*)/;

				var url = '';
				if(currentPage.match(reg)){
					url = currentPage.replace(reg, "page=last");
				}else{
					url = location.href + '&page=last';
				}
				
				if(url){
					httpRequest("GET", url, 
						function(result) {
							if (result.status != 200) {
								return;
							}
							
							var doc = document.createElement("div");
							try{
								doc.innerHTML = result.responseText;
								var lastPost = getLastPost(result.responseText);
								
								//post to server
								postBookmark(h1, atag, mode, text, lastPost);
								
							}catch(e){
							}finally{
								document.removeChild(doc);
							}
						}
					);
				}
			}else{
				//get from xpath
				var aLast = xpathFirst("//a[@name='last']");
				var lastPost = aLast.previousSibling.name;
				
				//and post
				postBookmark(h1, atag, mode, text, lastPost);
			}
		}, true);
		
		h1.appendChild(atag);
	}
}

function showHistory(mode){
	var action;
	
	if (mode==forums_mode) action = "viewnewposts";	
	else if(mode==markets_mode) action = "viewmarkets";
	else if (mode==archive_mode) action = "viewposts";
	else return;

	var ps = $x('//p[contains(@align,"center")]');
	for (i in ps){
		ps[i].innerHTML = ps[i].innerHTML + " | <a href=userhistory.php?action="+action+"&id="+get_value(uid_val_name)+"><b>History</b></a>";
	}

}

function main(){
	var url = window.location.href;

	// get user id if it doesn't already exist
	if(!get_value(uid_val_name))
		getUserId();

	// get template if it doesn't already exist, on page that is not catch up
	if(!(get_value(head_template_val_name) && get_value(body_template_val_name)))
		if(url.search("(.*)oforums(.*)catchup(.*)")==-1 || url.search("(.*)forums(.*)catchup(.*)")==-1 || url.search("(.*)markets(.*)catchup(.*)")==-1)
			getTemplate();
		

	//show history
	if(url.search(/(.*)oforums\.php$/)!=-1) showHistory(archive_mode);
	else if(url.search(/(.*)forums\.php$/)!=-1) showHistory(forums_mode);
	else if(url.search(/(.*)markets\.php$/)!=-1) showHistory(markets_mode);

	if(url.search("(.*)oforums(.*)topicid(.*)")!=-1) display(fid_val_name, ftitle_val_name, archive_mode);
	else if(url.search("(.*)oforums(.*)catchup(.*)")!=-1) getCatchUp(archive_mode);
	else if(url.search("(.*)forums(.*)topicid(.*)")!=-1) display(fid_val_name, ftitle_val_name, forums_mode);
	else if(url.search("(.*)forums(.*)catchup(.*)")!=-1) getCatchUp(forums_mode);
	else if(url.search("(.*)markets(.*)topicid(.*)")!=-1) display(mid_val_name, mtitle_val_name, markets_mode);
	else if(url.search("(.*)markets(.*)catchup(.*)")!=-1) getCatchUp(markets_mode);
}

main();