// ==UserScript==
// @name           Userscripts Forum Suite
// @namespace	smk
// @description    forum suite: signiture, etc.
// @include	http://userscripts.org/*
// @copyright	smk & Joe Simmons & wesley
//			(thanks to them for the ideas and some code in their scripts I've included)
// ==/UserScript==

/**
history
v0.0.4:
	[add] google script search
v0.0.3:
	[chg] made mark-as-read get request to become head request, to be faster

v0.0.2: 
	[chg] removed linkUserNames as not needed anymore
	[chg] minor update to adapt userscript's new style change

v0.0.1:
	[fix] syntax highlighting not distinguishing between real ';' and '&amp;'
	[add] syntax highlighting
	[fix] unprocess bug when not changing back upong firs edit
	[fix] admin & username with spaces not displaying properly problem
	[add] the code reply system, when have a new post, replace the '&amp;'s  back
*/

/**
to-do:
extend 'new posts' system to script, group post management, monitered topic
add emoticcons option
make syntax highlighting faster: convert whole syntax table to regex instead of looping each character

*/

var options={
	profileName: 'smk',
	refreshRate: 5,
	remindNewPosts: true,
	markAsReadDelay: 0,
	//0: do nothing; 1: add google search icon; 2: make google search default
	googleSearch: 2,
};

Array.prototype.fromLast=function(i) this[this.length-(i>1?i:0)];
Array.prototype.removeAt=function(i) this.splice(i,1);
String.prototype.startsWith=function(str) this.substr(0,str.length)==str;
String.prototype.subStartsWith=function(i,str) this.substr(i,str.length)==str;
String.prototype.replaceAt=function(i,str) this.substr(0,i)+str+this.substr(i+1);
String.prototype.splice=function(i,len,str) this.substr(0,i)+str+this.substr(i+len);

var timeOuts=[];
var googleSearchUrl='http://www.google.com.au/search?q=';

function init(){
	GM_registerMenuCommand('Set Signature Code', sigOptions);
	var i;
	var sig=GM_getValue('signature',null);
	if(sig==null) sigOptions();
	var loc=window.location.href;
	document.addEventListener("click",processAllClicks,false);
	if(loc.indexOf('/userscripts.org/forums')>0 && (loc.indexOf('?page=1')>0 || loc.indexOf('?page=')==-1)){
		var mainForum=getMainForum();
		var users=[];
		for(i=1;i<mainForum.snapshotLength;i++){
			users.push(getUserName(mainForum,i));
		}
		if(options.remindNewPosts){
			if(GM_getValue('userActive',false)==true){
				checkNewest(false);
			}else{
				checkNewest();
			}
		}
	}
	if(options.refreshRate>0) timeOuts.push(window.setTimeout(refresh,options.refreshRate*60*1000));
	markAsRead();
	clickMarkAsRead();
	var editTags=getEditTags();
	if(getReplyButton())
		getReplyButton().addEventListener("click",function(){processTypeBox(getReplyBox);},false);
	for(i=0;i<editTags.snapshotLength;i++)
		editTags.snapshotItem(i).addEventListener("click",function(){processTypeBox(getEditBox);},false);
	var code=document.evaluate('//pre',document,null,6,null);
	for(i=0;i<code.snapshotLength;i++)
		codeHighlightSyntax(code.snapshotItem(i));
	addGoogleSearch();
}

function refresh(){
	if(!GM_getValue('userActive',false)) window.location.reload(true);
}

function sigOptions(){
	var code=prompt('Please enter your signature code');
	if(code==''){
		if(!confirm("Are you sure you don't want a forum signiture?")) sigOptions();
	}
	GM_setValue('signature',code);
	return true;
}

function addSig(pb){
	var sig=GM_getValue('signature',null);
	if(sig && pb.value.indexOf(sig)==-1 && sig!='') pb += "\n<div cite=\"signature\">\n<hr>\n"+sig+"\n</div>";
	return pb;	
}

function addGoogleSearch(){
	if(options.googleSearch==0) return;
	searchInput=getSearchForm();
	var googleHref=document.createElement('a');
	var googleImg=document.createElement('img');
	googleImg.src='data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7PT7/3zF6/9Ptu//RbHx/0227/+Tzvb/9vv5/97h0f9JeBz'+
					'/NHoA/z98Av9AfAD/PHsA/0F6AP8AAAAA/vz7/1+33/8Mp+z/FrHw/xWy8f8bs/T/Hqrx/3zE7v////'+
					'7/t8qp/zF2A/87gwH/P4ID/z59AP8+egD/Q3kA/97s8v8botj/ELn3/wy58f8PtfL/D7Lw/xuz9P8vq'+
					'+f/8/n///779v9KhR3/OYYA/0GFAv88hgD/QIAC/z17AP/0+/j/N6bM/wC07/8Cxf7/CsP7/wm+9v8A'+
					'qur/SrDb//7+/v///P7/VZEl/zSJAP87jQD/PYYA/0OBBf8+fQH///3//9Dp8/84sM7/CrDf/wC14/8'+
					'CruL/KqnW/9ns8f/8/v//4OjX/z+GDf85kAD/PIwD/z2JAv8+hQD/PoEA/9C7pv/97uv////+/9Xw+v'+
					'+w3ej/ls/e/+rz9///////+/z6/22mSf8qjQH/OJMA/zuQAP85iwL/PIgA/zyFAP+OSSL/nV44/7J+V'+
					'v/AkG7/7trP//7//f/9//7/6/Lr/2uoRv8tjQH/PJYA/zuTAP87kwD/PY8A/z2KAP89hAD/olkn/6RV'+
					'HP+eSgj/mEgR//Ho3//+/v7/5Ozh/1GaJv8tlAD/OZcC/zuXAv84lAD/O5IC/z2PAf89iwL/OIkA/6h'+
					'WFf+cTxD/pm9C/76ihP/8/v//+////8nav/8fdwL/NZsA/zeZAP83mgD/PJQB/zyUAf84jwD/PYsB/z'+
					'6HAf+fXif/1r6s//79///58u//3r+g/+3i2v/+//3/mbiF/yyCAP87mgP/OpgD/zeWAP85lgD/OpEB/'+
					'z+TAP9ChwH/7eHb/////v/28ej/tWwo/7tUAP+5XQ7/5M+5/////v+bsZn/IHAd/zeVAP89lgP/O5MA'+
					'/zaJCf8tZTr/DyuK//3////9////0qmC/7lTAP/KZAT/vVgC/8iQWf/+//3///j//ygpx/8GGcL/ESa'+
					'x/xEgtv8FEMz/AALh/wAB1f///f7///z//758O//GXQL/yGYC/8RaAv/Ojlf/+/////////9QU93/BA'+
					'D0/wAB//8DAP3/AAHz/wAA5f8DAtr///////v7+/+2bCT/yGMA/89mAP/BWQD/0q+D///+/////P7/R'+
					'kbg/wEA+f8AA/z/AQH5/wMA8P8AAev/AADf///7/P////7/uINQ/7lXAP/MYwL/vGIO//Lm3P/8/v//'+
					'1dT2/woM5/8AAP3/AwH+/wAB/f8AAfb/BADs/wAC4P8AAAAA//z7/+LbzP+mXyD/oUwE/9Gshv/8//3'+
					'/7/H5/zo/w/8AAdX/AgL6/wAA/f8CAP3/AAH2/wAA7v8AAAAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA%3D%3D';
	googleHref.appendChild(googleImg);
	googleHref.href='javascript:void(0)';
	googleSearch=function(){
		open(googleSearchUrl+'site%3Ahttp%3A%2F%2Fuserscripts.org%2Fscripts%2F+'+document.getElementById('script_q').value);
	};
	if(options.googleSearch==1){
		googleHref.addEventListener('click',googleSearch,false);
		searchInput.appendChild(googleHref);
	}else if(options.googleSearch==2){
		searchInput.removeChild(document.getElementById('search-go'));
		searchInput.appendChild(googleHref);
		searchInput.action='javascript:void(0)';
		searchInput.addEventListener('submit',googleSearch,false);
	}
}

function encHTMLstr(str,pos){
	var rep=['<','&lt;','>','&gt;','&','&amp;','"','&quot;'];
	for(var i=0;i<rep.length;i+=2)
		if(str.subStartsWith(pos,rep[i])) return {repl:true,orig:rep[i],chr:rep[i+1]};
	return {repl:false,orig:rep[i],chr:rep[i]}
}

function decHTMLstr(str,pos){
	var rep=['<','&lt;','>','&gt;','&','&amp;','"','&quot;'];
	for(var i=1;i<rep.length;i+=2)
		if(str.subStartsWith(pos,rep[i])) return {repl:true,orig:rep[i],chr:rep[i-1]};
	return {repl:false,orig:rep[i],chr:rep[i]}
}

function processRedundantTags(replyCode,redundantTags,reverse,unconvert){
	//unconvert: array of tags to be ignored
	//var redundantTags=['pre','code'];
	var i,j;
	var inTag=false;
	var ignoreTags=false;
	if(redundantTags==null) ignoreTags=true;
	if(unconvert==null) unconvert=[];
	var tmp;
	for(i=0;i<replyCode.length;i++){
		if(ignoreTags){
			for(var j=0;j<redundantTags.length;j++){
				if(replyCode.subStartsWith(i,'<'+redundantTags[j]) || replyCode.subStartsWith(i,'</'+redundantTags[j])){
					inTag=!inTag;
					i+=redundantTags[j].length;
					j=-1;
				}
			}
		}
		if(inTag || ignoreTags){
			for(j=0;j<unconvert.length;j++){
				if(replyCode.subStartsWith(i,'<'+unconvert[j]) || replyCode.subStartsWith(i,'</'+unconvert[j])){
					for(;i<replyCode.length,replyCode.charAt(i)!='>';i++);
					i++;
					j=-1;
				}
			}
			if(!reverse) tmp=encHTMLstr(replyCode,i);
			else tmp=decHTMLstr(replyCode,i);
			if(tmp.repl){
				replyCode=replyCode.splice(i,tmp.orig.length,tmp.chr);
				i+=tmp.chr.length-1;
			}
		}
	}
	return replyCode;
}

function processTypeBox(func){
	//func returns the element that should be monitered
	if(func==null || func==undefined || typeof(func)!='function') return;
	tmpNode=func();
	if(!tmpNode || !tmpNode.innerHTML || !tmpNode.style || tmpNode.style.display=='none' || !getReplyValueBox(tmpNode)){
		window.setTimeout(function(){processTypeBox(func);},100);
	}else{
		getReplyValueBox(tmpNode).value=processRedundantTags(getReplyValueBox(tmpNode).value,['pre','code'],true);
		with(document.evaluate('.//*[@type="submit"]',tmpNode,null,9,null))
			if(singleNodeValue) singleNodeValue.addEventListener("click",process,false);
	}
}	

function checkNewest(remind){
	var i;
	var postRows=getMainForum();
	var oldPosts,posts=[];
	if(remind==null) remind=true;
	for(i=1;i<postRows.snapshotLength;i++){
		posts.push(getPostsNumber(postRows,i));
	}
	if((oldPosts=GM_getValue('oldPosts_'+window.location,null))==null) GM_setValue('oldPosts_'+window.location,posts.join(';'));
	else if(remind){
		oldPosts=oldPosts.split(';');
		for(i=0;i<oldPosts.length;i++){
			if(oldPosts[i]!=posts[i] && getUserName(postRows,i).innerHTML!=options.profileName){
				alert('New posts available');
				GM_setValue('oldPosts_'+window.location,posts.join(';'));
				break;
			}
		}
	}
}

function checkActivity(){
	GM_setValue('userActive',false);
	refresh();
}

function markSingleAsRead(i,readIcon,url,markLink,maxRetries,retries){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-Agent': 'Mozilla/5.0',
			'Accept': 'text/xml',
		},
		onload: function(e){
			if(!/^2/.test(e.status)) this.onerror();
			else{
				readIcon.setAttribute('class','icon grey');
				var already=parseInt(markLink.innerHTML);
				already++;
				markLink.innerHTML=markLink.innerHTML.replace(/^\d+/,already);
				if(parseInt(markLink.innerHTML.match(/\/(\d+)$/)[1])==already)
					markLink.parentNode.removeChild(markLink);
			}
		},
		onerror: function(e){
			retries++;
			if(retries>maxRetries){
				alert("Mark as read failed: post"+this.i);
			}else{
				markSingleAsRead(i,readIcon,url,maxRetries,retries);
			}
		},
	});
}

function markPostsAsRead(posts,readIcon,markLink,maxRetries){
	var mainForum=getMainForum();
	for(var i=0;i<posts.length;i++){
		setTimeout(function(post,readIcon,mainForum,markLink,maxRetries){
			markSingleAsRead(post,readIcon,getTopicLinkURL(mainForum,post),markLink,maxRetries);
		},options.markAsReadDelay*i,posts[i],readIcon[i],mainForum,markLink,maxRetries);
	}
}

function markAsRead(maxRetries){
	var mainForum=getMainForum();
	var readIcon=[];
	var tmpReadIcon;
	var posts=[];
	if(maxRetries==null) maxRetries=3;
	for(var i=1;i<mainForum.snapshotLength;i++){
		tmpReadIcon=getReadIcon(mainForum,i);
		if(tmpReadIcon && tmpReadIcon.getAttribute('class')=='icon green'){
			posts.push(i);
			readIcon.push(tmpReadIcon);
		}
	}
	if(posts.length>0){
		var newTopic=document.evaluate('//a[@href[contains(.,"/topics/new?")]]',document,null,9,null).singleNodeValue;
		if(newTopic){
			var markAsReadLink=newTopic.cloneNode(true);
			markAsReadLink.href='javascript:void(0)';
			markAsReadLink.textContent='Mark as read';
			newTopic.parentNode.insertBefore(markAsReadLink,newTopic);
			markAsReadLink.addEventListener('click',function(){
					markPostsAsRead(posts,readIcon,markAsReadLink,maxRetries);
					this.textContent='0/'+posts.length;
			},false);
		}
	}
}

function clickMarkAsRead(){
	var mainForum=getMainForum();
	for(var i=1;i<mainForum.snapshotLength;i++){
		tmpReadIcon=getReadIcon(mainForum,i);
		if(tmpReadIcon && tmpReadIcon.getAttribute('class')=='icon green'){
			with(getTopicLink(mainForum,i)){
				setAttribute('idI',i);
				addEventListener('click',function(e){
					getReadIcon(mainForum,this.getAttribute('idI')).setAttribute('class','icon grey');
				},false);
			}
		}
	}
}

function codeHighlightSyntax(node){
	var i,j,k;
	var tmp;
	//these needs to be in html
	var syntax=['color:green',[/[^\\](\/\/.*?)(\n|$)/,-1],
				'color:blue',[/[^\\](\/\*(.|\n)*?\*\/)/,-1],
				'font-weight:bold',['(',')',';','.','[',']','\\','&&','||','{','}'],
				'color:grey',[/[^\\]('.*?(?!\\)')/,-1,/[^\\](".*?[^\\]")/,-1,'""'],
				//html tags
				//'color:orange',[/<[^>]*>/,-1],
				'color:purple',[/[^\w@#\$\)\]\}\.](\/.*?[^\\]\/[a-z]*)/,-1],
				'color:red',[/(?!\\)\W(\d\w*)/,-1],
				'font-weight:bold; font-style:italic; color:blue',[/\W(function|var|new|for|if|else|do|while|switch|break|try|catch|throw|return|prototype|case|true|false|this|typeof)\W/,-1],
				'color:darkBlue',[/\W(null|undefined|NaN)\W/,-1],
				//objects
				'color:lightBlue',[/\W(Object|Number|Array|String|Date|RegExp)\W/i,-1],
				];
	var regex;
	var replace,replaceText;
	var value=' '+node.innerHTML;
	//escape value html attributes
	var htmlAttributesPre=[];
	var htmlAttributesSuf=[];
	for(i=0;i<value.length;i++){
		if(value.charAt(i)=='\'') for(;i<value.length && value.charAt(i)!='\'';i++);
		if(value.charAt(i)=='"') for(;i<value.length && value.charAt(i)!='"';i++);
		if(value.charAt(i)=='<'){
			htmlAttributesPre.push(tmp=new RegExp('^<[^<>]*?>').exec(value.substr(i))[0]);
			htmlAttributesPre.push(i);
			//alert(tmp);
			htmlAttributesSuf.push(tmp=new RegExp('<[^<>]*?>').exec(value.substr(i))[0]);
			htmlAttributesSuf.push(i);
			//alert(tmp);
			i+=tmp.length;
		}
	}
	for(j=0;j<syntax.length;j+=2){
		for(k=0;k<syntax[j+1].length;k++){
			regex=syntax[j+1][k];
			if(regex.constructor==RegExp){
				regex=regex.toString();
				syntax[j+1][k]=new RegExp('^'+regex.substr(0,regex.length-1).substr(1));
			}
		}
	}
	for(i=0;i<value.length;i++){
		for(j=0;j<syntax.length;j+=2){
			for(k=0;k<syntax[j+1].length;k++){
				regex=syntax[j+1][k];
				replaceText='';
				if(regex.constructor==RegExp){
					if(replace=value.substr(i+syntax[j+1][k+1]).match(regex)){
						replace=replace[1];
						replaceText='<span style="'+syntax[j]+'">'+replace+'</span>';
					}else k++;
				}else if(value.subStartsWith(i,syntax[j+1][k])){
					replace=syntax[j+1][k];
					replaceText='<span style="'+syntax[j]+'">'+replace+'</span>';
				}else{
					tmp=decHTMLstr(value,i);
					if(tmp.repl) i+=tmp.orig.length;
				}
				if(replaceText.length>0){
					value=value.splice(i,replace.length,replaceText);
					i+=replaceText.length;
					j=-2;
					break;
				}
			}
		}
	}
	if(value.charAt(0)==' ') value=value.substr(1);
	node.innerHTML=value;
	return value;
}

function processAllClicks(){
	GM_setValue('userActive',true);
	while(timeOuts.length>0){
		window.clearTimeout(timeOuts[0]);
		timeOuts.pop();
	}
	timeOuts.push(window.setTimeout(checkActivity,options.refreshRate*60*1000));
	//alert(GM_getValue('oldPosts_'+window.location,'null'));
	var tmpNode;
	if(window.location.href.indexOf('http://userscripts.org/topics/new?')>0)
		with(document.evaluate('//input[@value="Post topic"]',document,null,9,null))
			if(singleNodeValue) singleNodeValue.addEventListener("click",process,false);
}

function process(){
	var reply=getReplyValueBox();
	var replyCode=reply.value;
	if(typeof replyCode!='undefined' && replyCode!=''){
		replyCode=addSig(replyCode);
		replyCode=processRedundantTags(replyCode,['pre','code']);
		reply.value=replyCode;
	}
}

function getMainForum() document.evaluate('//table[@class[contains(.,"forums") or contains(.,"topics")]]/tbody/tr',document,null,6,null);
function getUserName(mainForum,i){
	var userNode=mainForum.snapshotItem(i).lastChild.previousSibling;
	var div1;
	if(div1=document.evaluate('.//strong',userNode,null,9,null).singleNodeValue) return div1;
	return document.evaluate('.//*[class=author]',userNode,null,9,null);
}

function getPostsNumber(mainForum,i) mainForum.snapshotItem(i).childNodes[5].innerHTML;
function getTopicLinkURL(mainForum,i) document.evaluate('.//a[@href[contains(.,"/topics")]]',mainForum.snapshotItem(i),null,9,null).singleNodeValue.href;
function getReadIcon(mainForum,i) document.evaluate('.//img[@src[contains(.,"/comment.gif")]]',mainForum.snapshotItem(i),null,9,null).singleNodeValue;
function getTopicLink(mainForum,i) document.evaluate('.//a[contains(@href,"/topics/")]',mainForum.snapshotItem(i),null,9,null).singleNodeValue;
function getReplyBox() document.getElementById('reply') || document.evaluate('//form[@id="new_topic"]',document,null,9,null).singleNodeValue;
function getReplyButton() document.evaluate('//a[contains(@onclick,"Reply")]',document,null,9,null).singleNodeValue;
function getReplyValueBox(div){
	if(!div) div=document;
	return document.evaluate(".//textarea[contains(@id,'body')]",div,null,9,null).singleNodeValue;
}
function getEditBox() document.getElementById('edit');
function getEditTags() document.evaluate('//*[@class="edit"]',document,null,6,null);
function getSearchForm() document.getElementById('script_q').parentNode;

init();
