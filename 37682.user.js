// ==UserScript==
// @name           Leprosorium my things
// @namespace      Leprosorium.ru
// @description    blogistan my things script.
// @include        *leprosorium.ru/my/
// ==/UserScript==

(function() {

postsCounted = false;
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
var caution = false;
function setCookie(name, value, expires, path, domain, secure) {
        var curCookie = name + "=" + escape(value) +
                ((expires) ? "; expires=" + expires.toGMTString() : "") +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                ((secure) ? "; secure" : "");
        if (!caution || (name + "=" + escape(value)).length <= 4000)  document.cookie = curCookie;
        else
                if (confirm("Cookie exceeds 4KB and will be cut!"))
                document.cookie = curCookie
}

function getCookie(name) {
        var prefix = name + "=";
        var cookieStartIndex = document.cookie.indexOf(prefix);
        if (cookieStartIndex == -1)  return null;
        var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
        if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
        return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}



function setActiveTab(elem) {
	var thing = elem.id;
//	GM_setValue("lepra.mythings.tabselected", thing);
	var expires = new Date(2012,10,10);
	setCookie('lepra.mythings.tabselected', thing , expires);
	document.getElementById('allThings').setAttribute('class','tab-link');
	document.getElementById('lepraThings').setAttribute('class','tab-link');
	document.getElementById('leprogradThings').setAttribute('class','tab-link');
	elem.setAttribute('class','tab-link-active');
	
	countPosts=0;
	countComments=0;
	countNewComments=0;
	countPostsLeprograd=0;
	countCommentsLeprograd=0;
	countNewCommentsLeprograd=0;
	re = /(\d+)/i; 
	var posts = document.evaluate("//div[contains(@class,'post ord')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var idx = 0; idx<posts.snapshotLength; idx++){
		var post=posts.snapshotItem(idx);
		var id=post.getAttribute("id");
	//	post = document.getElementById(id);
		console.log(post);
		var comments = document.evaluate("div[@class='dd']/div[@class='p']/span/a", post, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		console.log(comments);
		var isLeprograd = document.evaluate("div[@class='dd']/div[@class='p']/span/a[contains(@href,'.leprosorium.ru') and not(contains(@href,'www.leprosorium.ru'))]", post, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength;
		if(!postsCounted) {
			if(comments.snapshotLength > 0) {
				comm = comments.snapshotItem(0);
				
				if(re.test(comm.innerHTML))	commCount = RegExp.$1;
				else commCount = 0;
				if(comments.snapshotLength >= 2) {
					commnew = comments.snapshotItem(1);
					if(re.test(commnew.innerHTML))  commnewCount = RegExp.$1;
					else commnewCount = 0;
				} else commnewCount = 0;
			}
			countPosts += 1;
			countComments += parseInt(commCount);
			countNewComments += parseInt(commnewCount);
			if(isLeprograd>0) {
				countPostsLeprograd += 1;
				countCommentsLeprograd += parseInt(commCount);
				countNewCommentsLeprograd += parseInt(commnewCount);
			}
		}
		switch(thing) {
			case 'allThings':
				post.style.display = '';
				break;
			case 'lepraThings':
				if(isLeprograd>0) post.style.display = '';
				else post.style.display = 'none';
				break;
			case 'leprogradThings':
				if(isLeprograd>0) post.style.display = 'none';
				else post.style.display = '';
				break;
		}
	}
	if(!postsCounted) {
		postsCounted = true;
		document.getElementById('countTotalPosts').innerHTML = countPosts;
		document.getElementById('countTotalComments').innerHTML = countComments;
		document.getElementById('countTotalNewComments').innerHTML = countNewComments;
		document.getElementById('countPostsLeprograd').innerHTML = countPostsLeprograd;
		document.getElementById('countCommentsLeprograd').innerHTML = countCommentsLeprograd;
		document.getElementById('countNewCommentsLeprograd').innerHTML = countNewCommentsLeprograd;
		document.getElementById('countPostsLepra').innerHTML = countPosts-countPostsLeprograd;
		document.getElementById('countCommentsLepra').innerHTML = countComments-countCommentsLeprograd;
		document.getElementById('countNewCommentsLepra').innerHTML = countNewComments-countNewCommentsLeprograd;
	}
}


function action(){
	var style = '#tabs-table2 {'+
'empty-cells:show;'+
'height:28px ! important;'+
'position:relative;'+
'width:100%;'+
'z-index:1;margin-bottom:10px;'+
'}'+
'#tabs-table2 td {'+
'font-size:10px;'+
'height:27px ! important;'+
'text-align:center;'+
'vertical-align:middle;'+
'}'+
'#tabs-table2 .td2 {'+
'width:33%;'+
'}'+
'#tabs-table2 .td3 {'+
'width:33%;'+
'}'+
'#tabs-table2 .td4 {'+
'width:33%;'+
'}';
	addGlobalStyle(style);
	var selected = getCookie('lepra.mythings.tabselected');
	if(selected  == null) selected = 'allThings';
	
	var posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
	var tabsContent = '<table id="tabs-table2" cellpadding="0" cellspacing="0">'+
				'<tbody><tr>'+
					'<td class="td2">'+
					'	<a href="javascript:void(0);" onclik="setActiveTab(\'all\',this); return:false;" id="allThings" class="tab-link-active"><span class="tab-bg-right"><span class="tab-bg-middle"><span class="valign-fix-1"><span class="valign-fix-2">все (постов: <span id="countTotalPosts">0</span> | коммментов: <span id="countTotalComments">0</span>/<strong><span id="countTotalNewComments">0</span></strong>)</span></span></span></span></a>'+
					'</td>'+
					'<td class="td3">'+
					'	<a href="javascript:void(0);" id="lepraThings" onclik="setActiveTab(\'lepra\',this); return:false;"  class="tab-link"><span class="tab-bg-right"><span class="tab-bg-middle"><span class="valign-fix-1"><img src="http://img.leprosorium.com/41277" style="height:25px;" valign="middle"><span class="valign-fix-2"> подлепры (постов: <span id="countPostsLeprograd">0</span> | коммментов: <span id="countCommentsLeprograd">0</span>/<strong><span id="countNewCommentsLeprograd">0</span></strong>)</span></span></span></span></a>'+
					'</td>'+
					'<td class="td4">'+
					'	<a href="javascript:void(0);" id="leprogradThings" onclik="setActiveTab(\'leprograd\',this); return:false;"  class="tab-link"><span class="tab-bg-right"><span class="tab-bg-middle"><span class="valign-fix-1"><span class="valign-fix-2">БЛ (постов: <span id="countPostsLepra">0</span> | коммментов: <span id="countCommentsLepra">0</span>/<strong><span id="countNewCommentsLepra">0</span></strong>)</span></span></span></span></a>'+
					'</td>'+
				'</tr>'+
			'</tbody></table>';
	tabs=document.createElement("div");
	post=posts.snapshotItem(0);
	post.parentNode.insertBefore(tabs, post);
	tabs.setAttribute("id", "addTabs");
	tabs.innerHTML = tabsContent;
	document.getElementById('allThings').addEventListener("click", function(e){ setActiveTab(this); return false;}, true);
	document.getElementById('lepraThings').addEventListener("click", function(e){ setActiveTab(this); return false;}, true);
	document.getElementById('leprogradThings').addEventListener("click", function(e){ setActiveTab(this); return false;}, true);
	setActiveTab(document.getElementById(selected));
}


action();

})();