// ==UserScript==
// @name           GoogleReader2Kaixin
// @namespace      http://userscripts.org/xmurobi
// @description    Share items in Google Reader to Kaixin
// @include        https://*.google.com/reader*
// @include        http://*.google.com/reader*
// ==/UserScript==

var SITE_KAIXIN = 'Kaixin';
var SITE_RENREN = 'Renren';

function getFirstElementMatchingClassName(root,tag,class) {
  var elements=root.getElementsByTagName(tag); var i=0;
  while (elements[i] && !elements[i].className.match(class)) { i++; }
  return ((!elements[i]) ? null : (elements[i]));
}

function getElementsByClassName(root,tag,class) {
	var elements = root.getElementsByTagName(tag);
  var results = new Array();
  for(var i=0; i<elements.length; i++) { if(elements[i].className.indexOf(class)>-1) { results.push(elements[i]); } }
  return (results);
}

function findParentNode(el,tag,class) {
	el=el.parentNode;
  if (arguments.length==3)
  {
    // Find first element's parent node matching tag and className
    while (el.nodeName.toLowerCase()!='body' && (el.nodeName.toLowerCase()!=tag || (el.className!=class && el.className.indexOf(class+' ')==-1))) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }
  else
  {
    // Find first element's parent node matching tag
    while (el.nodeName.toLowerCase()!='body' && el.nodeName.toLowerCase()!=tag) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }	
}

function getEntryDOMObject(index) {
	// Because of repaint, entry doesn't point to correct DOM object, we need to find entry using index
	var entries=document.getElementById('entries');
	var i=0;
	entry=entries.firstChild;
	while ((i++)<index) {
		entry=entry.nextSibling;
	}	
	return entry;
} 

function catchEntryAdded(e) {
	var el = e.target;
	if (el.nodeName=='DIV' && el.className.indexOf('entry')>-1) {
		if (el.className.indexOf('entry-actions')>-1) {
    	// Expanding article in list view
      addButton(el,'Kaixin',post2Kaixin);
      addButton(el,'Renren',post2Renren);
		}
		else {
			// Adding article in expanded view
			addButton(getFirstElementMatchingClassName(el,'div','entry-actions'),SITE_KAIXIN,post2Kaixin);
			addButton(getFirstElementMatchingClassName(el,'div','entry-actions'),SITE_RENREN,post2Renren);
    }
  }
}

function addButton(el,name,fun) {
	var entry = findParentNode(el,'div','entry');	
	var span = document.createElement('span');
	span.className = 'item-preview kx link';	
	span.innerHTML = name;
  
  if (entry && entry.className.indexOf('alreadyPosted-' + name)>-1) { 
  	span.setAttribute('style',gpeStyles.kxActive); 
  } else { 
  	span.setAttribute('style',gpeStyles.kxInactive); 
  }
  
  var p = document.createElement('span');
  p.appendChild(span);
  el.appendChild(p);
  p.addEventListener('click', fun, false);	
}
  
function calcEntryIndex(e){
	var index=0;
	while (e.previousSibling)  {
      index++;
      e=e.previousSibling;
	}
	return index;
}

function post2Kaixin(e){
	var el = e.target;
	var entry = findParentNode(el,'div','entry');
	var index = calcEntryIndex(entry);
	
	if (entry.className.indexOf('alreadyPosted-' + SITE_KAIXIN) >= 0) return;
	
	//root = getEntryDOMObject(index);
	// extract content from current entry
	var body = getFirstElementMatchingClassName(entry,'div','entry-body');
	var sharebody = getFirstElementMatchingClassName(entry,'div','entry-body');
	var shareurl= getFirstElementMatchingClassName(entry,'a','entry-title-link');

	// use ajax
	submitKaixinRequest(shareurl.text,sharebody.innerHTML,el,entry);

}

function submitKaixinRequest(title,content,el,entry){
	var e1 = encodeURIComponent;
	var a = 'http://www.kaixin001.com/diary/write_submit.php';
	var p = 'did=&start=&uploadfile=&tags=&texttype=html&draft=0&ctimeupdate=1&privacy=1&passwd=&repaste=1&type=0' +
						'&classid=132271257' +
						'&title=' + e1('[ZZ]' + title) +
						'&content=' + e1(content);
	GM_xmlhttpRequest({
	  method:"POST",
	  url:	a,
	  data: p,
	  
	  headers:{
	    "Content-type":		"application/x-www-form-urlencoded",
	  },
	  
	  onload:function(details) {
	  	//logmsg('onload',details);
			// remember already posted
		  entry.className = entry.className + ' alreadyPosted-' + SITE_KAIXIN;
		  el.setAttribute('style',gpeStyles.kxActive); 
	  },
	  
	  onreadystatechange:function(details) {
	  	//logmsg('onreadystatechange',details);
	  },
	  
	  onerror:function(details) {
	  	//logmsg('onerror',details);
	  }
	});		
}

function post2Renren(e){
	var el = e.target;
	var entry = findParentNode(el,'div','entry');
	var index = calcEntryIndex(entry);
	
	if (entry.className.indexOf('alreadyPosted-' + SITE_RENREN) >= 0) return;
	
	//root = getEntryDOMObject(index);
	// extract content from current entry
	var body = getFirstElementMatchingClassName(entry,'div','entry-body');
	var sharebody = getFirstElementMatchingClassName(entry,'div','entry-body');
	var shareurl= getFirstElementMatchingClassName(entry,'a','entry-title-link');

	// use ajax
	submitRenrenRequest(shareurl.text,sharebody.innerHTML,el,entry);
}

function submitRenrenRequest(title,content,el,entry){
	var e1 = encodeURIComponent;
	var a = 'http://blog.renren.com/blog/0/addBlog';
	GM_xmlhttpRequest({
		method:"GET",
		url: a,
		onload:function(details){
			var iframe = getCacheFrame();
			var doc = iframe.contentDocument;

			doc.body.innerHTML=details.responseText;
			var pfid = doc.getElementById('postFormId');
			var p = 'categoryId=0&blogControl=99&passwordProtedted=&passWord=&editBlogControl=99&newLetterId=&blog_pic_id=&pic_path=&activity=&id=&relative_optype=&isVip=false' +
						'&postFormId=' + pfid.value +
						'&title=' + e1('[ZZ]' + title) +
						'&body=' + e1(content);
			//console.log(pfid);
			GM_xmlhttpRequest({
			  method:"POST",
			  url:	a,
			  data: p,
			  
			  headers:{
			    "Content-type":		"application/x-www-form-urlencoded",
			  },
			  
			  onload:function(details) {
			  	//logmsg('onload',details);
					// remember already posted
				  entry.className = entry.className + ' alreadyPosted-' + SITE_RENREN;
				  el.setAttribute('style',gpeStyles.kxActive); 
			  },
			  
			  onreadystatechange:function(details) {
			  	//logmsg('onreadystatechange',details);
			  },
			  
			  onerror:function(details) {
			  	//logmsg('onerror',details);
			  }
			});				
		}
	});					
}

function getCacheFrame(){
	var iframe = document.getElementById('cache-123');
	if (iframe){
	}else{
		iframe = document.createElement('iframe');
		iframe.style.display='none';
		iframe.setAttribute('width','1px');
		iframe.setAttribute('height','1px');
		iframe.setAttribute('id','cache-123');
		iframe.setAttribute('src','about:blank');
		document.body.appendChild(iframe); 
	}
	return iframe;
}

function logmsg(msg, details){
	var txt = details.responseText;
	if (details.responseText.length > 120)
		txt = 'too more html...';
	
	var log = 'status[' + details.status + 
	  				'] statusText[' + details.statusText + 
	  				'] responseHeaders[' + details.responseHeaders + 
	  				'] responseText[' + txt +
	  				'] readyState[' + details.readyState;
	  				
	console.log(msg + ' >>>>' + log);	
}
   
var gpeStyles =
{      
  entryBody : 'max-width: 98%',
  kxInactive : 'background: url("data:image/gif,GIF89a%10%00%10%00%D5%13%00%D8%D8%D8%FA%FA%FA%CB%CB%CB%C8%C8%C8%D2%D2%D2%BA%BA%BA%C6%C6%C6%A1%A1%A1%9C%9C%9C%BD%BD%BD%C9%C9%C9%AB%AB%AB%F4%F4%F4%BF%BF%BF%FC%FC%FC%DB%DB%DB%AD%AD%AD%FF%FF%FF%CC%CC%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%13%00%2C%00%00%00%00%10%00%10%00%00%06I%C0%89pH%2C%1A%8F%C8d%F1!i%3A%9F%8F%E1%03B%ADZ%A9%D1%89%04%12%E9z%BF%10%89p%FB-G%C2c%AE%D9%8B%D6%AA%03_%F8Y%EC%8E%C8%E3%F3%F4%9AM\'%7B%1D%0E%60t%00W%85%10%00RO%8A%12YJ%8E%8EA%00%3B") no-repeat; padding-left: 16px;',
  kxActive : 'background: url("data:image/gif,GIF89a%10%00%10%00%C2%05%00%3BY%98%AD%AD%AD%CC%CC%CC%D8%D8%D8%DB%DB%DB%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%036x%BA%DC%FE06%22%AA%BDd%91%C0%BB%E7%D9!%04%40i%9E%81%A0%8Cg%0B%A4%2B%E9%9A%B0(%CF%AFj%E3e%CD%F2%BE%DB%AC6%F8%18%03%03%CDe)%08I%9E%CF%04%00%3B") no-repeat; padding-left: 16px;'
}      
       
document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
