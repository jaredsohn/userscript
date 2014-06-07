// ==UserScript==
// @name            300BlackList
// @namespace   Dz7
// @description    Dz7黑名单抹布版300娘专用v010613
// @include        *.yamibo.com/*

// ==/UserScript==

var lang = [];
lang['default'] = {
	listManager:'抹布列表 ',
	listClear:'清除抹布列表 ',
	cls:'塞丫抹布',
	adds:'回收抹布',
	tbl:'此SB已被塞抹布',
	quote:'此SB引用已被塞抹布',
};

//====================interface============================
var interf = []; 
var flag = -1; 
var quoteflag = 1;
var version;
 if(document.getElementById('rightinfo')!= null)
version = document.getElementById('rightinfo').innerHTML.match(/<em>(\d\.\d).*<\/em>/)[1];
 else if(document.getElementById('footlink')!= null)
version = document.getElementById('footlink').innerHTML.match(/<em>(\d\.\d).*<\/em>/)[1];

function PostIDImpl(node){
			var name = node.innerHTML.match(/<b>(.*)<\/b>|<a.*>(.*)<\/a>/);
				if (name[1]!=null)
				return name[1];
			else
				return name[2];
}
function quoteIDImpl(node){
			var name = node.innerHTML.match(/<\i>(.+)<\/\i>|.*<font color.*>(.*)\s发.*<\/font>\s<a.*/);
				if (name[1]!=null)
				return name[1];
			else
				return name[2];
}
function topicIDImpl(node){
			var name = node.innerHTML.match(/<cite>(.*)<\/cite>|<a.*>(.*)<\/a>/);
            if (name[1]!=null){
				return name[1];
                alert("1");
            }
			else{
				return name[2];
                alert("2");
            }
}
interf['old']
={
	post: "getElementsByClass('postauthor','td')",
	quote: "getElementsByClass('msgborder','div')",
	topic: "getElementsByClass('author','td')",
	postID:"PostIDImpl(node)",
	quoteID:"quoteIDImpl(node)",
	topicID:"topicIDImpl(node)"
}
interf['new'] = {
	post:"getElementsByClass('postauthor','td')",
	quote:"getElementsByClass('quote','div')",
	topic:"getElementsByClass('author','td')",
	postID:"PostIDImpl(node)",
	quoteID:"quoteIDImpl(node)",
	topicID:"topicIDImpl(node)"
}
function selectInterface(){
	var result;
	if(getElementsByClass('postauthor','td')!= null && getElementsByClass('quote','div')!=''){
		result = interf['new'];
	}else{
		result = interf['old'];
	}
	return result;
}
//============================================================

var curInterface;
window.addEventListener('load',inits,false);
//界面初始化
function inits(){
	
	curInterface = selectInterface();
	addBtn();
	filter();
	addManager();
}

//控制面板管理
function addManager(){
	var panel = getControlPanel();
	var mLink = document.createElement('a');
	mLink.innerHTML = lang['default'].listManager;
	mLink.title =  "抹布列表管理";
	mLink.href ="javascript:;";
	mLink.addEventListener('click',manageList,false);
	
	var mLink2 = document.createElement('a');
	mLink2.innerHTML = lang['default'].listClear;
	mLink2.title =  "解除全部抹布";
	mLink2.href ="javascript:;";
	mLink2.addEventListener('click',emptyList,false);

	panel.insertBefore(mLink2,panel.childNodes[5]);
	panel.insertBefore(mLink,panel.childNodes[5]);
} 

function getControlPanel(){
	return document.getElementById("umenu");
}
//抹布管理接口
function manageList(){
	var list = getList();
	//emptyList();
	alert(list);
}
function getIDByPost(node){ 
	return eval(curInterface.postID);
} 
function getIDByQuote(node){
	return eval(curInterface.quoteID);
}
function getIDByTopic(node){
	return eval(curInterface.topicID);
}

function filter(){
	var list = getList();

//===== filter topic =====
	var threads = getElementsByClass('threadpages','span');
	if(threads.length>0){
		var topics = eval(curInterface.topic);
		for(var i=1,j=topics.length;i<j-1;i+=1){
			var curId = getIDByTopic(topics[i]);
			if(list.indexOf(curId +',') >= 0) {
				if(typeof(topics[i].parentNode.childNodes[5].childNodes[4])!="undefined"&&typeof(topics[i].parentNode.childNodes[5].childNodes[4].innerHTML)!="undefined"){
					topics[i].parentNode.childNodes[5].childNodes[4].innerHTML = ('<span>'+'<font size="2" color="red">'+lang['default'].tbl+'</font>'+'</span>');
				}else{
					if(document.getElementById('rightinfo')!= null){
						var templates = document.getElementById('rightinfo').innerHTML;
						if(templates.indexOf('Designed By PoprainS')>=0){
							topics[i].parentNode.childNodes[6].childNodes[4].innerHTML = ('<span>'+'<font size="2" color="red">'+lang['default'].tbl+'</font>'+'</span>');
						}else{
							topics[i].parentNode.childNodes[5].childNodes[3].innerHTML = ('<span>'+'<font size="2" color="red">'+lang['default'].tbl+'</font>'+'</span>');
						}
					}
				}
				if(typeof(topics[i].parentNode.childNodes[5].childNodes[5])!="undefined"){
					topics[i].parentNode.childNodes[5].childNodes[5].innerHTML = "";
				}
			}
		}
	}
//===== filter topic =====

	//filter post 
	var posts = eval(curInterface.post);
	for(var i=0,j=posts.length;i<j-1;i+=3){
		var curId = getIDByPost(posts[i]);
		if(list.indexOf(curId +',') >= 0) {
			var tblPost;
			var tbUserSign;
			var tbUserInfo;
			if(version>7.1)
				{
				if( i==0 && posts[i].parentNode.childNodes[3].childNodes[4].childNodes[5])
					{
						tblPost = posts[i].parentNode.childNodes[3].childNodes[4].childNodes[5].childNodes[3];
					}
				else
					{
						tblPost = posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[1];
					}
				}
			else
				{
				if( i==0 && posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[5])
					{
						tblPost = posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[3];
					//1st Post , disable title 
						posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].innerHTML = ('<span>'+'<font size="2" color="red">'+lang['default'].tbl+'</font>'+'</span>');
					//Disable UserInfo
						tbUserSign = posts[i].parentNode.childNodes[3].childNodes[5];
                        tbUserInfo = posts[i].parentNode.childNodes[1].childNodes[5];
					}
				else
					{
						tblPost = posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[1];
					//Disable UserInfo
						tbUserSign = posts[i].parentNode.childNodes[3].childNodes[5];
                        tbUserInfo = posts[i].parentNode.childNodes[1].childNodes[5];
					}					
					tbUserSign.innerHTML= ('<span>'+'<font size="2" color="red"><P align="center">'+lang['default'].tbl+'</P></font>'+'</span>')
				}
		    tblPost.innerHTML = ('<span>'+'<font size="2" color="red">'+lang['default'].tbl+'</font>'+'</span>');
		    tbUserInfo.innerHTML = ('<span>'+'<p align="center"><font size="2" color="red">'+lang['default'].tbl+'</font></p>'+'</span>');
		}
	}
	//filter quote 
	if(quoteflag)
	{var quotes = eval(curInterface.quote);
	for(var i=0,j=quotes.length;i<j;i++){
		if(list.indexOf(getIDByQuote(quotes[i])+',')>=0){
			quotes[i].innerHTML = ('\n<blockquote>\n<i>'+lang['default'].quote+'</i></blockquote>');}
		}
	}
	addBtn();
}

function hideID(){ 
	var targetID;
	targetID = getIDByPost(this.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]);
	addtoList(targetID);
	quoteflag = 1;
	filter();
}
function recoverID(){
	var targetID;
	targetID = getIDByPost(this.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1]);
	removefromList(targetID);
	quoteflag = 0;
	filter();
	alert('刷新后显示');
	window.location.reload();

}
function addBtn(){
	flag++;
	var posts = eval(curInterface.post);
	for(var i=0,j=posts.length;i<j-1;i+=3){
		var temp;
		if( i==0 && posts[i].parentNode.childNodes[3].childNodes[4].childNodes[5])
			temp = posts[i].parentNode.childNodes[3].childNodes[2].childNodes[3].childNodes[3];
		else
			temp = posts[i].parentNode.childNodes[3].childNodes[1].childNodes[3].childNodes[3];
		var pipe= document.createElement('span');
		pipe.innerHTML='| ';
		temp.appendChild(pipe);
		var list = getList();
		var curId = getIDByPost(posts[i]);
		if(list.indexOf(curId +',') >= 0) 
			{
			var adds = document.createElement('a');
			adds.innerHTML=lang['default'].adds;
			adds.href ="javascript:;";
			adds.addEventListener('click',recoverID,false);
			if(flag)
				{temp.removeChild(get_lastchild(temp));
				temp.removeChild(get_lastchild(temp));}
			temp.appendChild(adds);
			}
		else
			{
			var cls = document.createElement('a');
			cls.innerHTML=lang['default'].cls;
			cls.href ="javascript:;";
			cls.addEventListener('click',hideID,false);
			if(flag)
				{temp.removeChild(get_lastchild(temp));
				temp.removeChild(get_lastchild(temp));}
			temp.appendChild(cls);
			}
	}
}

function addtoList(id){
	var list = getList();
	if(list.indexOf(id+',') < 0){
		list += id+',';
	}
	GM_setValue('blackList',escape(list));
}
function removefromList(id){
	var list = getList();
	list = list.split(id+',').join('');
	GM_setValue('blackList',escape(list));
}
function getList(){
	return GM_getValue('blackList') != null ? unescape(GM_getValue('blackList')) :'';
}
function emptyList(){
	var list = getList();
	list = '';
	GM_setValue('blackList',escape(list));
	alert('已解除所有抹布');
}
function getElementsByClass(name,tag){
	var items = document.getElementsByTagName(tag);
	var result = [];
	
	for(var i=0,j=items.length;i<j;i++){
		if(items[i].className.indexOf(name) >=0)  {
			result.push(items[i]);
		}
	}
	return result;
}
function get_lastchild(n)
{
var x=n.lastChild;
while (x.nodeType!=1)
  {
  x=x.previousSibling;
  }
return x;
}