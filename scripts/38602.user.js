// ==UserScript==
// @name           LKBlackList
// @namespace      www.lkong.net
// @include        http://www.lkong.net/forum.php?mod=viewthread*
// @include        http://www.lkong.net/thread-*
// ==/UserScript==

var lang = [];
var ID_DELIMITER = "@$";
var HIDDEN_MODE = {
	SILENCE:0,
	SIMPLY:1,
	CUSTOM:2
}
var $ = function(id){ return  (typeof(id) == 'string') ? document.getElementById(id) : null;};
lang['default'] = {
	listManager:'黑名单管理',  
	cls:'封杀乃',
	quote:'风轻云淡～',
	tbc:'to be continued'
};
GM_addStyle(".hidden{display:none;}");
GM_addStyle(".custom_hidden{color:brown;font-style: italic;}")
GM_addStyle("#bl_control{text-align:center;border:1px solid #C2D5E3;background-color:#FFFFFF;display:none;z-index:10;position:absolute;width:200px;height:100px;left:30%;top:30%; }");
GM_addStyle(".bl_button{background-coloe:blue;border: medium none;color: #000000;cursor: pointer;height: 32px;width: 51px;}");

//====================interface============================
var interf = []; 
interf['old']
={
	post: "getElementsByClass('postauthor','td') ",
	quote: "getElementsByClass('msgborder','div'); ",
	postID:"oldPostIDImpl(node)",
	quoteID:"//b/i"
}
 
function  oldPostIDImpl(node){
	for(var i=0,j=node.childNodes.length;i<j;i++){
		if(node.childNodes[i].tagName !=null && node.childNodes[i].tagName.toLowerCase() == 'cite'){
			return node.childNodes[i].innerHTML.match(/<b>(.*)<\/b>/)[1];
		}
	}
}

interf['new'] = {
	post: function(){
			var ps = $x("body/div[4]/div/div[4]/div[2]/div",XPathResult.ORDERED_NODE_ITERATOR_TYPE);			
			var result = [];
			if(typeof ps == 'array'){
				ps.pop();	//remove the reply div
				result = ps;
			}else{
				for(var i=0,j=ps.length-1;i<j;i++){
					result.push(ps[i]);
				}
			}
			return result;
		},
	quote:function(){
			var qs = getElementsByClass('msgborder','div',$('postlist'));
			return qs;
		},
	postID:function(node){ 
			
			if(node == null){
				return null;
			}
			var field = getElementsByClass('','font',node);
			if(field == null || field.length == 0){
				return '';
			}
			return field[0].innerHTML;
		},
	quoteID:function(node){
			
			if(node == null){
				return null;
			}else{
				var field = node.innerHTML.match(/<i>(\S+)<\/i>/);
				if(field == null || field.length < 2){
					return '';
				}
				return  field[1];
				
			}
		}
}
function selectInterface(){
	var result;
	if(getElementsByClass('postauthor','td')!= null && getElementsByClass('quote','div')!= null){
		result = interf['new']; 
	}else{
		result = interf['old'];
	}
	return result;
}
//============================================================

var curInterface;
window.addEventListener('load',inits,false);
//the story begins
function inits(){
	curInterface = selectInterface();	
	addBtn();
	filter();
	addManager();
}

//manager console
function addManager(){
	var panel = getControlPanel();
	var sperator = document.createElement('span');
	sperator.className = 'pipe';
	sperator.style.display = 'inline';
	panel.appendChild(sperator);
	
	var mLink = document.createElement('a');
	mLink.innerHTML = lang['default'].listManager;
	mLink.title = "黑名单管理";
	mLink.href ="javascript:;";
	mLink.addEventListener('click',manageList,false);
	mLink.style.display = 'inline'; 
	panel.appendChild(mLink);
	
	var div = document.createElement('div');
	div.innerHTML = "内容过滤替代词:<textarea name='sub_text' id='sub_text' ></textarea><br/>";
	div.id = 'bl_control';
	var savBtn = document.createElement('input');
	savBtn.type = 'button';
	savBtn.value = 'save';
	savBtn.className = 'bl_button';
	savBtn.addEventListener('click',saveBLConf,false);
	div.appendChild(savBtn);
	document.body.appendChild(div);
} 

function saveBLConf(){
	var txt = $('sub_text').value;
	if(txt != unescape(GM_getValue('sub_text'))){
		GM_setValue('sub_text',escape(txt));
		filter();
	}

	$('bl_control').style.display = 'none';
	GM_setValue('hidden_mode',HIDDEN_MODE.CUSTOM);
}
function getControlPanel(){
	var um  = $("um");
	if(um.childNodes[1].tagName == 'p'){
		return um.childNodes[1];
	}
	return um;
}
//get strategy
function manageList(){
	var div = $('bl_control');

	var curStyle = document.defaultView.getComputedStyle(div,'');
	var left = (getWinWidth() - curStyle.getPropertyValue('width').match(/\d+/g)[0]/1)/2 + 'px';
	var top = (getWinHeight() - curStyle.getPropertyValue('height').match(/\d+/g)[0]/1)/2 + 'px';
	div.style.left = left;
	div.style.top = top;
	div.style.display = 'block';
	var txt = GM_getValue('sub_text');
	if(txt != null && txt != ''){
		$('sub_text').value = unescape(txt);
	}
}
function getIDByPost(node){ 
	return curInterface.postID(node);
} 
function getIDByQuote(node){
	return curInterface.quoteID(node);
}

function alertChild(node){
	for(var i=0,j=node.childNodes.length;i<j;i++){
		var t = window.confirm(node.childNodes[i].tagName+":"+i);
		if(!t) continue; 
		alertChild(node.childNodes[i]);
	} 
}

function filter(){
	var list = getList();
	//filter post 
	var posts = curInterface.post();
	for(var i=0,j=posts.length;i<j;i++){
		var curId = getIDByPost(posts[i]);
		if(list.indexOf(curId) >= 0) {
			hideByMode(posts[i]);
		}
	}

	//filter quote 
	var quotes = curInterface.quote();
	for(var m=0,n=quotes.length;m<n;m++){
		var qID = getIDByQuote(quotes[m]);
		if(list.indexOf(qID)>=0){
			hideByMode(quotes[m]);
		}
	}
	//refilter 
	var filteredPost = getElementsByClass('custom_hidden','div',$('postlist'));
	for(var x=0,y=filteredPost.length;x<y;x++){
		hideByMode(filteredPost[x]);
	}	
}
function hideByMode(targetNode){
	var mode = GM_getValue('hidden_mode');
	if(mode == null || mode == ''){
		mode = HIDDEN_MODE.SILENCE;
	}
	switch(mode){
		case HIDDEN_MODE.SILENCE:{targetNode.setAttribute('class','hidden');break;}
		case HIDDEN_MODE.SIMPLE:{
			targetNode.innerHTML = lang['default'].quote;
			if(targetNode.className.indexOf(' custom_hidden') < 0)
				targetNode.className += " custom_hidden";
			break;
		}
		case HIDDEN_MODE.CUSTOM:{
			targetNode.innerHTML = unescape(GM_getValue('sub_text'));
			if(targetNode.className.indexOf(' custom_hidden') < 0)
				targetNode.className += " custom_hidden";
			break;
		}
	}
}
function hideID(){ 
	var targetID;
	targetID = getIDByPost(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
	addtoList(targetID);
	filter();
}
function addBtn(){
	var posts = curInterface.post();
	for(var i=0,j=posts.length;i<j;i++){
		var temp = getElementsByClass('authi','div',posts[i])[0];
		var cls = document.createElement('span');
		cls.innerHTML="<a href='javascript:;'>"+lang['default'].cls+'</a>';
		cls.addEventListener('click',hideID,false);
		temp.appendChild(cls);
	}
}

function addtoList(id){
	var list = getList();
	if(list.indexOf(id) < 0){
		list.push(id);
	}
	GM_setValue('blackList',escape(list.join(ID_DELIMITER)));
}
function removefromList(id){
	var list = getList();
	for(var i=0,j=list.length;i<j;i++){
		if(id == list[i]){
			list.splice(i,1);
			break;
		}
	}
	GM_setValue('blackList',escape(list.join(ID_DELIMITER)));
}
function getList(){
	var list = GM_getValue('blackList') != null ? unescape(GM_getValue('blackList')) :'';
	return list.split(ID_DELIMITER);
}


function getElementsByClass(name,tag,node){
	var aNode;
	if(node != null){
		aNode = node;
	}else{
		aNode = document;
	}
	
	var items = aNode.getElementsByTagName(tag);
	var result = [];
	
	for(var i=0,j=items.length;i<j;i++){
		if(name == ''){
			if(items[i].className == null || items[i].className == ''){
				result.push(items[i]);
			}
		}else{
			if(items[i].className.indexOf(name) >= 0)  {
				result.push(items[i]);
			}
		}
		
	}
	return result;
}
/**
 * analyse xpath
 * https://developer.mozilla.org/en/Using_XPath
 */
function getXPathImpl(aNode, aExpr) {  
  var result = document.evaluate(aExpr, aNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);  
  var found = [];  
  var res;  
  while (res = result.iterateNext())  
    found.push(res);  
  return found;  
}  

function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    

  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

  function toArray(xp) {
    var f=[], next;
    while (next=xp.iterateNext()) {
      f.push(next);
    }
    return f;
  }
  
// 获取窗口高度
function getWinHeight() {
	var winHeight;
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	// 通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
	}

	return winHeight;
}
  // 获取窗口宽度
function getWinWidth() {
	var winWidth;
	if (window.innerWidth)
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	// 通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winWidth = document.documentElement.clientWidth;
	}
	return winWidth;
 }