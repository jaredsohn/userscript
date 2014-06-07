// ==UserScript==
// @name        4chan bold italic
// @namespace   http://userscripts.org/users/33432
// @include     http://boards.4chan.org/*
// @version     1.0
// ==/UserScript==

function foreach(list,func){
	for(var i=0;i<list.length;i++) {
		func(list[i],i);
	}
}

function info(){
	return;

	var params = []
	for (var i = 0; i < arguments.length; i++) {
		params.push('_' + i)
	}
	params = params.join(',')
	Function(params, 'console.log(' + params + ')').apply(null, arguments)
}

var code_0="\ufeff";
var code_1="\u180e";
//var code_0="0";
//var code_1="1";

function encode(no){
	var res="";

	if(no<0) no=-no;
	var iter=0;

	do{
		if(iter++>=400){
			return "";
		}
		
		for(var i=0;i<4;i++){
			if(no&1) res+=code_1;
			else res+=code_0;
			
			no>>=1;
		}
		
		if(no!=0) res+=code_1;
		else res+=code_0;
	} while(no!=0)
	
	return res;
}

function decode(text){
	var res=0;
	var off=0;
	var expecting=4;

	for(var i=0;i<text.length;i++){
		var c=text[i];
		var bit;
		
		if(c==code_1) bit=1;
		else if(c==code_0) bit=0;
		else return res;
		
		if(expecting){
			expecting--;
			
			res|=(bit<<off);
			off++;
		} else{
			if(bit==0)
				return res;
			else
				expecting=4;
		}
	}
	
	return res;
}

var textexp = new RegExp("([^]*?)\\[(/?)([a-zA-Z]+)\\]([^]*)");
var tags={
	"b":		{ code: 1, tag: "b",  },
	"i":		{ code: 2, tag: "i",  },
	"u":		{ code: 3, tag: "u",  },
	"o":		{ code: 4, tag: "span", func: function(e){ e.style.textDecoration="overline"; } },
	"sup":		{ code: 5, tag: "sup",  },
	"sub":		{ code: 6, tag: "sub",  },
}
var tagNos=[];
for(i in tags){ tagNos[tags[i].code]=tags[i] }

function encodeText(text){
	var res="";
	var m;
	var stack=[];
	
	while(text!=undefined && (m=text.match(textexp))){
		var pre=m[1];
		var closing=m[2];
		var tag=m[3];
		var post=m[4];
		
		res+=pre;
		text=post;
		
		var taginfo=tags[tag.toLowerCase()];
		if(!taginfo || taginfo.code==0){
			res+="["+closing+tag+"]";
			continue;
		}
		
		if(closing){
			while(stack.length>0 && stack[stack.length-1]!=tag){
				res+=encode(0);
				stack.pop();
			}
			
			if(stack.length>0){
				res+=encode(0);
				stack.pop();
			}
		} else{
			stack.push(tag);
			res+=encode(taginfo.code);
		}
	}
	
	res+=text;
	
	while(stack.length>0){
		res+=encode(0);
		stack.pop();
	}
	
	return res;
}

function createNodeFromCode(code){
	var taginfo=tagNos[code];
	if(! taginfo) return null;

	var node=document.createElement(taginfo.tag);
	if(taginfo.func) taginfo.func(node);

	node.custom=1;
	node.customCode=code;
	
	return node;
}

function canStackInside(e){
	if(e.nodeType==3) return true;
	if(e.custom) return true;
	if(e.tagName=="A") return true;
	if(e.tagName=="BR") return true;
	
	return false;
}

function findNextText(e,escape){
	while(e!=null && e!=escape){
		if(e.nextSibling) e=e.nextSibling;
		else e=e.parentNode;
		
		if(e.nodeType==3) return e;
	}
	
	return null;
}

var retext = "([^]*?)(["+code_0+code_1+"]{4}"+("("+code_1+"["+code_0+code_1+"]{4}"+")*")+code_0+")([^]*)";
var regexp = new RegExp(retext);

function decodeElement(elem,stack){
	if(! elem) return;
	if(! stack) stack=[]
	
	var closing;
	var starter=elem.parentNode;
	
	
	for(var e=elem;e!=starter && e!=null;e=(e.nextSibling==null?e.parentNode:e.nextSibling)){
		info("e: ",e);
		
		var canStack=canStackInside(e);
		
		if(e.nodeType==3){
			var text=e.textContent;
			
			var m=text.match(regexp);
			var ee;
			
			if(m==null && ((ee=findNextText(e,starter))!=null)){
				/* special case: tag was cut off by a line break */
				var newText=text+ee.textContent;
				
				var mm=newText.match(regexp);
				
				if(mm && mm[1].length<text.length){
					ee.textContent="";
					text=newText;
					m=mm;
				}
			}
			
			if(m!=null){
				var pre=m[1];
				var codeText=m[2];
				var post=m[4];
				
				info("text: ",pre,"|[",decode(codeText),"]|",post,"|")
				
				e.textContent=pre;
				
				var code=decode(codeText);
				info(code);
				
				var postNode=document.createTextNode(post);
				e.parentNode.insertBefore(postNode,e.nextSibling);
				
				if(code==0){
					closing=1;
				} else{
					var node=createNodeFromCode(code);
					if(node) e.parentNode.insertBefore(node,e.nextSibling);
				}
			}
			
		} else if(! canStack){
			
			for(var i=0;i<stack.length;i++){
				var node=createNodeFromCode(stack[i].customCode);
				e.insertBefore(node,e.firstChild);
			}
			
			var innerStack=[];
			if(e.tagName=="PRE"){
				innerStack=stack;
			} else{
				decodeElement(e.firstChild,innerStack);
			}
			
			for(var i=0;i<innerStack.length;i++){
				var node=createNodeFromCode(innerStack[i].customCode);
				e.parentNode.insertBefore(node,e.nextSibling);
			}
			
			stack=[];
		}
		
		if(stack.length!=0 && stack.indexOf(e)==-1 && canStack){
			info("appending ",e," to ",stack[stack.length-1])
			
			e.parentNode.removeChild(e);
			stack[stack.length-1].appendChild(e);
		}
			
		if(closing){
			stack.pop();
			
			if(stack.length==0) "switching parent back to nothing";
			else info("switching parent back to ",stack[stack.length-1])
			
			closing=0;
		}
		
		if(e.custom==1){
			stack.push(e);
			info("switching parent to ",e) //," with initial content of ",e
			
			e.custom=2;
		}
	}
}

function processPosts(elem){
	if(!elem || !elem.getElementsByTagName) return;
	var list=elem.getElementsByTagName('blockquote');

	for(var i=0;i<list.length;i++){
		var bq = list[i];
		decodeElement(bq.firstChild);
	}
}

function processForms(elem){
	if(! elem || !elem.getElementsByTagName) return;
	var list=elem.getElementsByTagName('form');

	foreach(list,function(form){
		form.addEventListener("submit", function(){
			form.elements["com"].value=encodeText(form.elements["com"].value);
		},false);
	});
}

processForms(document.body)
processPosts(document.body)

document.addEventListener('DOMNodeInserted', function (e) {
	processForms(e.target);
	processPosts(e.target);
}, false);


