// ==UserScript==
// @name            Dz7_BlackList
// @namespace   Dz7
// @description    Dz7黑名单
// @include        */viewthread.php*
// @include        */thread*
// @include        */redirect.php*

// ==/UserScript==

var lang = [];
lang['default'] = {
	listManager:'黑名单 ',
	cls:'屏蔽该用户',
	adds:'解除屏蔽',
	tbl:'该用户已被屏蔽',
	quote:'该用户引用已被屏蔽',
	tbc:'正在建设ing'
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
interf['old']
={
	post: "getElementsByClass('postauthor','td')",
	quote: "getElementsByClass('msgborder','div')",
	postID:"PostIDImpl(node)",
	quoteID:"quoteIDImpl(node)"
}
interf['new'] = {
	post:"getElementsByClass('postauthor','td')",
	quote:"getElementsByClass('quote','div')",
	postID:"PostIDImpl(node)",
	quoteID:"quoteIDImpl(node)"
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
	mLink.title =  "黑名单管理";
	mLink.href ="javascript:;";
	mLink.addEventListener('click',manageList,false);
	panel.insertBefore(mLink,panel.childNodes[5]);
} 

function getControlPanel(){
	return document.getElementById("umenu");
}
//黑名单管理接口
function manageList(){
	var list = getList();
	emptyList();
	alert(list);
}
function getIDByPost(node){ 
	return eval(curInterface.postID);
} 
function getIDByQuote(node){
	return eval(curInterface.quoteID);
}

function filter(){
	var list = getList();
	//filter post 
	var posts = eval(curInterface.post);
	for(var i=0,j=posts.length;i<j-1;i+=3){
		var curId = getIDByPost(posts[i]);
		if(list.indexOf(curId +',') >= 0) {
			var tblPost;
			if(version>7.1)
				{
				if( i==0 && posts[i].parentNode.childNodes[3].childNodes[4].childNodes[5])
					tblPost = posts[i].parentNode.childNodes[3].childNodes[4].childNodes[5].childNodes[3];
				else
					tblPost = posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[1];
				}
			else
				{
				if( i==0 && posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[5])
					tblPost = posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[3];
				else
					tblPost = posts[i].parentNode.childNodes[3].childNodes[3].childNodes[5].childNodes[1];
				}
		tblPost.innerHTML = ('<span>'+'<font size="2">'+lang['default'].tbl+'</font>'+'</span>');
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
