// ==UserScript==
// @name				Pure Reader for Firefox
// @description Pixel specialist Na Wong (http://nadesign.net/safari/) hand-crafted the most beautiful Google Reader restyling of modern times, Pure Reader. I ported it from Safari to Firefox so more people can enjoy the awesome design.
// @include			https://*.google.com/reader/view/*
// @include			http://*.google.com/reader/view/*
// @include			htt*://*.google.*/reader/view*
// @author			Jimmy Ti (http://www.twitter.com/jimmyti) 
// ==/UserScript==

// Due to a bug in Firefox, "float" elements need to be specified before all other "non-floating" elements.
// Hence, this section of code is needed to find all unread-count DOM elements and insert their previousSibling to the end of their parentNode children list.
/*!
	Sizzle CSS Selector Engine - v1.0
	 Copyright 2009, The Dojo Foundation
	 Released under the MIT, BSD, and GPL Licenses.
	 More information: http://sizzlejs.com/
 */
(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;[0,0].sort(function(){baseHasDuplicate=false;return 0;});var Sizzle=function(selector,context,results,seed){results=results||[];context=context||document;var origContext=context;if(context.nodeType!==1&&context.nodeType!==9){return[];}if(!selector||typeof selector!=="string"){return results;}var m,set,checkSet,extra,ret,cur,pop,i,prune=true,contextXML=Sizzle.isXML(context),parts=[],soFar=selector;do{chunker.exec("");m=chunker.exec(soFar);if(m){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}}while(m);if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift();}set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}if(context){ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}while(parts.length){cur=parts.pop();pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}if(pop==null){pop=context;}Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}if(!checkSet){checkSet=set;}if(!checkSet){Sizzle.error(cur||selector);}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&Sizzle.contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.matchesSelector=function(node,expr){return Sizzle(expr,null,null,[node]).length>0;};Sizzle.find=function(expr,context,isXML){var set;if(!expr){return[];}for(var i=0,l=Expr.order.length;i<l;i++){var match,type=Expr.order[i];if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}if(!set){set=context.getElementsByTagName("*");}return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var match,anyFound,old=expr,result=[],curLoop=set,isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){var found,item,filter=Expr.filter[type],left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue;}if(curLoop===result){result=[];}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}if(found!==undefined){if(!inplace){curLoop=result;}expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}break;}}}if(expr===old){if(anyFound==null){Sizzle.error(expr);}else{break;}}old=expr;}return curLoop;};Sizzle.error=function(msg){throw"Syntax error, unrecognized expression: "+msg;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag){part=part.toLowerCase();}for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part;}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part){var elem,isPartStr=typeof part==="string",i=0,l=checkSet.length;if(isPartStr&&!/\W/.test(part)){part=part.toLowerCase();for(;i<l;i++){elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false;}}}else{for(;i<l;i++){elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!/\W/.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m&&m.parentNode?[m]:[];}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}return ret.length===0?null:ret;}},TAG:function(match,context){return context.getElementsByTagName(match[1]);}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";if(isXML){return match;}for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n\r]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem);}}else if(inplace){curLoop[i]=false;}}}return false;},ID:function(match){return match[1].replace(/\\/g,"");},TAG:function(match,curLoop){return match[1].toLowerCase();},CHILD:function(match){if(match[1]==="nth"){if(!match[2]){Sizzle.error(match[0]);}match[2]=match[2].replace(/^\+|\s*/g,'');var test=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}else if(match[2]){Sizzle.error(match[0]);}match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}if(match[2]==="~="){match[4]=" "+match[4]+" ";}return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return(/h\d/i).test(elem.nodeName);},text:function(elem){return"text"===elem.type;},radio:function(elem){return"radio"===elem.type;},checkbox:function(elem){return"checkbox"===elem.type;},file:function(elem){return"file"===elem.type;},password:function(elem){return"password"===elem.type;},submit:function(elem){return"submit"===elem.type;},image:function(elem){return"image"===elem.type;},reset:function(elem){return"reset"===elem.type;},button:function(elem){return"button"===elem.type||elem.nodeName.toLowerCase()==="button";},input:function(elem){return(/input|select|textarea|button/i).test(elem.nodeName);}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0===i;},eq:function(elem,i,match){return match[3]-0===i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||Sizzle.getText([elem])||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var j=0,l=not.length;j<l;j++){if(not[j]===elem){return false;}}return true;}else{Sizzle.error(name);}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false;}}if(type==="first"){return true;}node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false;}}return true;case"nth":var first=match[2],last=match[3];if(first===1&&last===0){return true;}var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}parent.sizcache=doneName;}var diff=elem.nodeIndex-last;if(first===0){return diff===0;}else{return(diff%first===0&&diff/first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS,fescape=function(all,num){return"\\"+(num-0+1);};for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape));}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;}catch(e){makeArray=function(array,results){var i=0,ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var l=array.length;i<l;i++){ret.push(array[i]);}}else{for(;array[i];i++){ret.push(array[i]);}}}return ret;};}var sortOrder,siblingCheck;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(a===b){hasDuplicate=true;return 0;}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;}return a.compareDocumentPosition(b)&4?-1:1;};}else{sortOrder=function(a,b){var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;if(a===b){hasDuplicate=true;return 0;}else if(aup===bup){return siblingCheck(a,b);}else if(!aup){return-1;}else if(!bup){return 1;}while(cur){ap.unshift(cur);cur=cur.parentNode;}cur=bup;while(cur){bp.unshift(cur);cur=cur.parentNode;}al=ap.length;bl=bp.length;for(var i=0;i<al&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i]);}}return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1);};siblingCheck=function(a,b,ret){if(a===b){return ret;}var cur=a.nextSibling;while(cur){if(cur===b){return-1;}cur=cur.nextSibling;}return 1;};}Sizzle.getText=function(elems){var ret="",elem;for(var i=0;elems[i];i++){elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue;}else if(elem.nodeType!==8){ret+=Sizzle.getText(elem.childNodes);}}return ret;};(function(){var form=document.createElement("div"),id="script"+(new Date()).getTime(),root=document.documentElement;form.innerHTML="<a name='"+id+"'/>";root.insertBefore(form,root.firstChild);if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}results=tmp;}return results;};}div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}div=null;})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div"),id="__sizzle__";div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}Sizzle=function(query,context,extra,seed){context=context||document;query=query.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!seed&&!Sizzle.isXML(context)){if(context.nodeType===9){try{return makeArray(context.querySelectorAll(query),extra);}catch(qsaError){}}else if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){var old=context.getAttribute("id"),nid=old||id,hasParent=context.parentNode,relativeHierarchySelector=/^\s*[+~]/.test(query);if(!old){context.setAttribute("id",nid);}else{nid=nid.replace(/'/g,"\\$&");}if(relativeHierarchySelector&&hasParent){context=context.parentNode;}try{if(!relativeHierarchySelector||hasParent){return makeArray(context.querySelectorAll("[id='"+nid+"'] "+query),extra);}}catch(pseudoError){}finally{if(!old){context.removeAttribute("id");}}}}return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}div=null;})();}(function(){var html=document.documentElement,matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector,pseudoWorks=false;try{matches.call(document.documentElement,"[test!='']:sizzle");}catch(pseudoError){pseudoWorks=true;}if(matches){Sizzle.matchesSelector=function(node,expr){expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!Sizzle.isXML(node)){try{if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){return matches.call(node,expr);}}catch(e){}}return Sizzle(expr,null,null,[node]).length>0;};}})();(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return;}div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return;}Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}if(elem.nodeName.toLowerCase()===cur){match=elem;break;}elem=elem[dir];}checkSet[i]=match;}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}elem=elem[dir];}checkSet[i]=match;}}}if(document.documentElement.contains){Sizzle.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);};}else if(document.documentElement.compareDocumentPosition){Sizzle.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16);};}else{Sizzle.contains=function(){return false;};}Sizzle.isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};var posProcess=function(selector,context){var match,tmpSet=[],later="",root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}return Sizzle.filter(later,tmpSet);};
  document.getElementById("sub-tree").addEventListener("DOMSubtreeModified",function () {
  	var unreadCountNodes = Sizzle("span.name > span.name-text + span.unread-count");
  	var unreadCountNodesLength = unreadCountNodes.length;
  	for (var i=0; i<unreadCountNodesLength; i++) {
  		var unreadCountNode = unreadCountNodes[i];
  		if (typeof(unreadCountNode.wrappedJSObject) !== "undefined") {
  		  var actualNode = unreadCountNode.wrappedJSObject;
  		  actualNode.parentNode.appendChild(actualNode.previousSibling);
  		} else {
  		  unreadCountNode.parentNode.appendChild(unreadCountNode.previousSibling);
  		}
  	}
  }, true);	
})();

// see below for the uncompressed CSS rules
var pureReaderCSS = 'body{font-family:"Helvetica Neue","Helvetica",sans-serif !important;text-rendering:optimizeLegibility}div#message-area-outer,div#loading-area{}table.info-bubble{background:rgb(255,255,255) !important}div#loading-area div,div#message-area-outer div{background:transparent !important;color:rgb(210,208,206) !important;font-weight:500 !important;text-shadow:rgb(0,0,0) 0 -1px 1px !important;padding-bottom:6px !important;text-transform:uppercase !important;margin-top:0px !important}div#guser nobr a,div#guser nobr a u,div#message-area-outer div a{color:rgb(150,150,150) !important;text-decoration:none !important;-webkit-transition-duration:400ms;-moz-transition-duration:400ms}div#guser nobr a:hover,div#message-area-outer div a:hover{color:rgb(180,180,180) !important;text-decoration:none !important}div#loading-area div.message-area-text-container,div#message-area-outer div.message-area-text-container{padding-top:8px !important}div.message-area-bottom-1,div.message-area-bottom-2,div.message-area-bottom-3{display:none !important}table#chrome-viewer-container{z-index:1200 !important}div#quick-add-success{position:relative !important;margin-top:-1px !important;padding:9px 18px 12px !important;-webkit-box-shadow:rgba(0,0,0,.3) 0 1px 2px !important;-moz-box-shadow:rgba(0,0,0,.3) 0 1px 2px !important;background:rgba(243,241,239,.8) !important;border-top:1px solid rgba(255,255,255,1) !important;border-bottom:1px solid rgb(167,162,160) !important;color:rgb(88,88,88) !important;text-shadow:rgb(255,255,255) 0 1px 0 !important;z-index:1000 !important}div nobr .gbm,div.goog-menu{z-index:1010}div#stream-prefs-menu-menu{top:55px !important}div#guser nobr .gbm{position:absolute !important;top:20px !important;width:auto !important;padding:0 !important;margin:0 !important}div#guser nobr #gbg{right:62px !important}div#guser nobr #gb2{right:142px !important}div#guser nobr .gbm a,div#guser nobr .gbm b{padding:0 !important;margin:0 !important;color:rgb(30,30,30) !important;-webkit-transition-duration:0 !important;-moz-transition-duration:0 !important}div#guser nobr .gbm,div.goog-menu{border:1px solid rgb(255,255,255) !important;-moz-border-radius:4px !important;border-radius:4px !important;-webkit-box-shadow:rgba(0,0,0,.5) 0 1px 4px !important;-moz-box-shadow:rgba(0,0,0,.5) 0 1px 4px !important;background:rgb(255,255,255) !important;z-index:1009 !important}div#guser nobr .gbm .gb2,div.goog-menu .goog-menuitem-content{line-height:24px !important;margin:0 6px !important}div#guser nobr .gbm .gb2,div.goog-menu .goog-menuitem{padding:0 18px 0 20px !important}div.goog-menuitem-content span.goog-submenu-arrow{margin-right:6px !important;font-size:10px !important}.gbm .gb2:first-child,div.goog-menu .goog-menuitem:first-child{	-moz-border-radius-topleft:4px;	 -moz-border-radius-topright:4px;border-top-left-radius:4px;border-top-right-radius:4px}.gbm .gb2:last-child,div.goog-menu .goog-menuitem:last-child{	 -moz-border-radius-bottomleft:4px;	 -moz-border-radius-bottomright:4px;border-bottom-left-radius:4px;border-bottom-right-radius:4px}div#guser nobr .gbm a.gb2:hover,div.goog-menuitem-highlight,div.goog-menu .goog-menuitem:hover{background:-webkit-gradient(		linear,		left top,		left bottom,	color-stop(0,rgb(74,73,72)),	color-stop(0.3,rgb(64,63,62)),	color-stop(0.7,rgb(54,53,52)),	 color-stop(1,rgb(34,33,32))) !important;background:-moz-linear-gradient(		 top,	 rgb(74,73,72),			rgb(64,63,62) 30%,		 rgb(54,53,52) 70%,			rgb(34,33,32)) !important;color:rgb(255,255,255) !important}div#explore-promo a,div.small-interruption a,div.small-interruption span.link{text-decoration:none !important;color:rgb(60,60,60) !important}div.small-interruption div{line-height:22px !important;font-size:12px !important}div.small-interruption{padding:16px 20px !important}div#explore-promo,div.small-interruption,div#no-entries-msg,div.preview-interruption{border:0 !important;background:-webkit-gradient(		 linear,	 left top,	 left bottom,	 color-stop(0,rgb(239,237,235)),	color-stop(0.3,rgb(244,242,240)),	 color-stop(0.95,rgb(249,247,245)),		color-stop(1,rgb(255,255,255))) !important;background:-moz-linear-gradient(		 top,			rgb(239,237,235),			rgb(244,242,240) 30%,			rgb(249,247,245) 95%,			rgb(255,255,255)) !important;-webkit-box-shadow:rgba(0,0,0,.34) 0 1px 4px,inset 0 0px 12px rgba(255,255,255,.5);-moz-box-shadow:rgba(0,0,0,.34) 0 1px 4px,inset 0 0px 12px rgba(255,255,255,.5);border-top:1px solid rgba(255,255,255,.7) !important;font-size:12px !important;line-height:1.5em !important;-moz-border-radius:0 !important;border-radius:0 !important}div#explore-promo{padding:8px 20px 8px 20px !important;color:rgb(90,100,110) !important;width:96% !important}div.small-interruption a,div.small-interruption span.link,div#no-entries-msg span.link{padding:4px 16px !important;background:-webkit-gradient(		 linear,	 left top,	 left bottom,		color-stop(0,rgb(256,254,252)),	 color-stop(0.1,rgb(246,244,242)),	 color-stop(0.9,rgb(233,231,229)),	 color-stop(1,rgb(223,221,219))) !important;background:-moz-linear-gradient(		top,	 rgb(256,254,252),		 rgb(246,244,242) 10%,		 rgb(233,231,229) 90%,		 rgb(223,221,219)) !important;border:1px solid rgb(203,201,199) !important;-moz-border-radius:12px !important;border-radius:12px !important;-webkit-box-shadow:rgb(255,255,255) 0 1px 0 !important;-moz-box-shadow:rgb(255,255,255) 0 1px 0 !important;font-size:12px !important;text-shadow:rgb(255,255,255) 0 1px 0 !important}div#quick-add-input-div div.goog-button-body:hover,span.dismiss-link.link:hover,div.interruption.self-interruption div.goog-button-body:hover,div.fr-modal-dialog-buttons button:hover,div.goog-button-body span.subscribe-button:hover,div.entry-conversation div.goog-button-base-outer-box div div.goog-button-body:hover,div.small-interruption a:hover,div.small-interruption span.link:hover,div#no-entries-msg span.link:hover{background:-webkit-gradient(		 linear,	 left top,	 left bottom,		color-stop(0,rgb(246,244,242)),	 color-stop(0.1,rgb(236,234,232)),	 color-stop(0.9,rgb(223,221,219)),	 color-stop(1,rgb(213,211,209))) !important;background:-moz-linear-gradient(		top,	 rgb(246,244,242),		 rgb(236,234,232) 10%,		 rgb(223,221,219) 90%,		 rgb(213,211,209)) !important;border:1px solid rgb(183,181,179) !important}div#quick-add-input-div div.goog-button-body:active,span.dismiss-link.link:active,div.interruption.self-interruption div.goog-button-body:active,div.fr-modal-dialog-buttons button:active,div.goog-button-body span.subscribe-button:active,div.entry-conversation div.goog-button-base-outer-box div div.goog-button-body:active,div.small-interruption a:active,div.small-interruption span.link:active,div#no-entries-msg span.link:active{-webkit-box-shadow:rgb(255,255,255) 0 1px 0,inset rgba(0,0,0,.7) 0 2px 5px !important;-moz-box-shadow:rgb(255,255,255) 0 1px 0,inset rgba(0,0,0,.7) 0 2px 5px !important;background:-webkit-gradient(		 linear,	 left top,	 left bottom,		color-stop(0,rgb(206,204,202)),	 color-stop(0.1,rgb(196,194,192)),	 color-stop(0.9,rgb(173,171,169)),	 color-stop(1,rgb(153,151,149))) !important;background:-moz-linear-gradient(		top,	 rgb(206,204,202),	rgb(196,194,192) 10%,		rgb(173,171,169) 90%,		rgb(153,151,149)) !important;border:1px solid rgb(123,121,119) !important;text-shadow:rgba(255,255,255,.5) 0 1px 0 !important;color:rgb(85,85,85) !important}div.preview-interruption div.preview-interruption-related-streams{background:transparent !important;border:0 !important;border-left:1px dotted rgb(205,203,202) !important;padding-left:20px !important;margin-left:20px !important}div#no-entries-msg h2,div.preview-interruption h3.header,div.preview-interruption .interruption-header{color:rgb(42,41,40) !important;text-shadow:rgba(255,255,255,1) 0 1px 0}div.preview-interruption div div span{margin-bottom:0.5em;display:block}div#no-entries-msg span.link,div.preview-interruption div.related-streams a span{color:rgb(70,80,90) !important;text-decoration:none !important}div#no-entries-msg span.link:hover,div.preview-interruption div.related-streams a:hover span{color:rgb(20,30,40) !important;text-decoration:none !important}div#no-entries-msg h2{font-size:22px !important;line-height:30px !important}div#explore-promo-close{margin-top:8px !important;margin-right:6px !important}table.info-bubble{background:none !important}table.info-bubble td.arrow{display:none !important}div#quick-add-bubble-holder,div.fr-confirm-dialog.fr-modal-dialog,div.friends-bubble-contents{background:rgb(243,241,239) !important;padding:14px 20px !important;-moz-border-radius:4px !important;border-radius:4px !important;-webkit-box-shadow:rgba(0,0,0,.5) 0 1px 4px;-moz-box-shadow:rgba(0,0,0,.5) 0 1px 4px}div.fr-confirm-dialog.fr-modal-dialog div{background:transparent !important}div.fr-confirm-dialog.fr-modal-dialog{border:0 !important;font-size:14px !important;color:rgb(100,100,100) !important}div.friends-bubble-contents a{text-decoration:none !important}div#quick-add-bubble-holder{z-index:1010 !important;padding:10px !important;top:34px !important;left:4px !important}div.entry-comments{background:transparent !important;padding:0 40px !important;margin-bottom:2em !important}div.entry-conversation{border-top:1px solid rgb(230,230,230) !important;border-bottom:1px solid rgb(230,230,230) !important}div.entry-conversation span.generic-comments-header{color:rgb(171,170,170) !important;font-weight:400 !important;font-size:14px !important}div.entry-conversation span.add-comment-link{float:right !important;text-decoration:none !important;color:rgb(120,120,120) !important;font-size:12px !important}div.comment-add span.add-comment-warning{margin-left:2px !important;font-size:11px !important}div.entry-conversation div.goog-button-base-outer-box div{padding:0 !important;margin:0 !important}div.goog-button-body span.subscribe-button{margin-left:-6px !important}div.fr-modal-dialog-buttons button{outline:none !important;margin:0 2px !important}div#quick-add-input-div div.goog-button-body,span.dismiss-link.link,div.interruption.self-interruption div.goog-button-body,div.fr-modal-dialog-buttons button,div.goog-button-body span.subscribe-button,div.entry-conversation div.goog-button-base-outer-box div div.goog-button-body{color:rgb(100,100,100) !important;padding:1px 12px !important;background:-webkit-gradient(		linear,		left top,		left bottom,	 color-stop(0,rgb(256,254,252)),	color-stop(0.1,rgb(246,244,242)),		color-stop(0.9,rgb(233,231,229)),		color-stop(1,rgb(223,221,219))) !important;background:-moz-linear-gradient(		 top,		rgb(256,254,252),	 rgb(246,244,242) 10%,	 rgb(233,231,229) 90%,	 rgb(223,221,219)) !important;border:1px solid rgb(203,201,199) !important;-moz-border-radius:12px !important;border-radius:12px !important;-webkit-box-shadow:rgb(255,255,255) 0 1px 0 !important;-moz-box-shadow:rgb(255,255,255) 0 1px 0 !important;font-size:12px !important;text-shadow:rgb(255,255,255) 0 1px 0 !important;text-decoration:none !important}span.item-link-menuitem img.item-link-menuitem-image{position:relative !important;top:-2px !important;left:-4px !important}div#quick-add-input-div div.goog-button-body{margin-top:4px !important;margin-left:-4px !important}div.goog-button-base-outer-box{border:0 !important}div.goog-button-base-outer-box div{background:transparent !important;border:0 !important}.goog-menu-button:active .goog-button-base-outer-box,.goog-menu-button:active .goog-button-base-inner-box,.goog-combobox-active .goog-button-base-outer-box,.goog-combobox-active .goog-button-base-inner-box,.goog-menu-button.goog-button-base-open .goog-button-base-outer-box,.goog-menu-button.goog-button-base-open .goog-button-base-inner-box{background:transparent !important}.goog-menu-button:active .goog-button-base-content,.goog-comboxbox-active .goog-button-base-content,.goog-menu-button.goog-button-base-open .goog-button-base-content{color:rgb(0,0,0) !important}div#search{position:relative !important;left:0 !important;top:27px !important;height:22px !important;padding:8px 10px;border-top:1px solid rgb(200,200,200);border-bottom:1px solid rgb(140,140,140);background:-webkit-gradient(		linear,		left bottom,	 left top,	 color-stop(0.05,rgb(216,214,212)),		color-stop(0.2,rgb(226,224,222)),		color-stop(0.4,rgb(236,234,232)),		color-stop(0.7,rgb(246,244,242)),		color-stop(0.99,rgb(256,254,252)),	 color-stop(1,rgb(255,255,255)));background:-moz-linear-gradient(		 bottom,			 rgb(216,214,212) 5%,		rgb(226,224,222) 20%,		rgb(236,234,232) 40%,		rgb(246,244,242) 70%,			rgb(256,254,252) 99%,		rgb(255,255,255));width:240px;xxxxdisplay:none !important}div#search input#search-input{width:222px !important;-moz-border-radius:16px;border-radius:16px;padding:3px 8px !important;border:1px solid rgba(50,50,50,.5);-webkit-box-shadow:rgba(255,255,255,.4) 0 1px 0;-moz-box-shadow:rgba(255,255,255,.4) 0 1px 0;outline:none}body.lhn-hidden div#search{display:none !important}body.lhn-menu div#search{top:32px !important;left:12px !important;z-index:1004 !important;display:block !important}.search-stream span#chrome-view-links{}span#view-search-container{}span#viewer-single-parent{float:left !important;margin-top:-1px !important;color:rgb(80,80,80) !important;text-shadow:rgb(255,255,255) 0 1px 0}span#viewer-single-parent b{font-weight:500 !important;color:rgb(50,50,50) !important;font-style:italic !important}b.highlighted0{background:rgb(255,220,0) !important;color:rgb(50,50,50) !important;font-weight:400 !important;padding:0 4px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:rgba(0,0,0,.5) 0 1px 2px;-moz-box-shadow:rgba(0,0,0,.5) 0 1px 2px}div#entries.search div.search-result a,div#entries.search div.search-result h2.entry-title a{text-decoration:none !important}div#entries.search div.entry-0 div.search-result h2.entry-title a,div#entries.search div#current-entry div.search-result h2.entry-title a{margin-top:-2px !important}div.results div.result a.result-title{margin-bottom:8px !important;color:rgb(104,102,100) !important;line-height:28px !important;font-size:16px !important;text-decoration:none;font-weight:500}div#entries.search div.search-result h2.entry-title a{margin-bottom:8px !important;color:rgb(104,102,100) !important;display:block !important;clear:both !important;margin-top:-9px !important;line-height:18px !important;font-size:16px !important}div#entries.search div.entry-attribution{margin-top:1em !important;margin-bottom:1em !important;font-size:12px !important}div.search-result{border-bottom:1px solid rgb(240,238,236) !important}div.search .entry{width:92% !important;margin:0 auto !important}div#chrome.search-stream.item-stream div#chrome-header{height:14px}span#viewer-single-item-parent{display:block !important;z-index:1009 !important;position:relative !important;top:-2px !important;left:5px !important}span#viewer-single-item-parent span{text-decoration:none;color:rgb(80,80,80) !important;text-shadow:rgb(255,255,255) 0 1px 0}div.result-snippet{margin:2px 0 8px !important}div.feed-result-stats{color:rgb(120,120,120) !important;font-size:11px}div.feed-result-stats span.number{color:rgb(80,80,80) !important;font-size:18px !important;font-weight:500 !important}span#chrome-view-links span#view-search{display:none !important}div#guser{display:block !important;background:-webkit-gradient(		linear,		left top,		left bottom,	color-stop(0,rgb(94,93,92)),	color-stop(0.1,rgb(84,83,82)),	color-stop(0.5,rgb(54,53,52)),	 color-stop(1,rgb(34,33,32))) !important;background:-moz-linear-gradient(		 top,	 rgb(94,93,92),	 rgb(84,83,82) 10%,	 rgb(54,53,52) 50%,		rgb(34,33,32)) !important;height:26px !important;z-index:1001 !important;clear:both !important;position:relative !important;padding-bottom:0 !important}div#guser nobr{opacity:0;-webkit-transition-duration:500ms;-moz-transition-duration:500ms;position:relative;font-size:12px;top:2px;color:rgba(255,255,255,0) !important}div#guser nobr b{color:rgb(240,238,236) !important;font-weight:400 !important;font-size:12px !important}div#guser:hover nobr{opacity:1}div#guser nobr a{margin:0 2px !important}div#nav > div:nth-child(2){position:fixed !important;z-index:1001;top:2px !important;left:4px !important;border-top:0 !important}div#nav > div:nth-child(2) div{float:left !important}div#nav > div:nth-child(2) div a{background:transparent !important}div#nav > div:nth-child(2) div:nth-child(5) div:nth-child(2) a{padding:0px 0px 2px 24px !important}div#nav > div:nth-child(2) div.selector{padding:2px 4px !important;margin:0 !important}div#lhn-selectors{background:transparent !important}div#nav > div:nth-child(2) a.link span{color:rgb(158,156,154) !important;text-shadow:rgb(16,16,16) 0 -1px 0;font-weight:400 !important;-webkit-transition-duration:300ms;-moz-transition-duration:300ms;padding-left:0 !important}div#nav > div:nth-child(2) div.selected{background:transparent !important}div#nav > div:nth-child(2) li.tree-selected span,div#nav > div:nth-child(2) div.selected a.link span{color:rgb(255,255,255) !important}div#nav > div:nth-child(2){z-index:1004 !important}div#nav > div:nth-child(2) ul#your-items-tree{width:300px !important}div#nav > div:nth-child(2) ul#your-items-tree > li ul{display:block !important;float:left !important;width:400px !important}div#nav > div:nth-child(2) ul#your-items-tree > li ul li{float:left;background:transparent !important}div#nav > div:nth-child(2) ul#your-items-tree > li ul li a{padding:2px 8px !important}div#nav > div:nth-child(2) ul#your-items-tree > li ul li a span.icon{top:4px !important;left:7px !important}div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-1-main,div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-2-main,#lhn-selectors .selector{opacity:.5 !important;-webkit-transition-duration:400ms;-moz-transition-duration:400ms}div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-1-main.tree-selected,div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-2-main.tree-selected,div#nav > div:nth-child(2) div.selected,#lhn-selectors .selector.selected{background:rgba(0,0,0,.2) !important;-moz-border-radius:4px;border-radius:4px;-webkit-box-shadow:inset rgba(0,0,0,.5) 0 1px 3px;-moz-box-shadow:inset rgba(0,0,0,.5) 0 1px 3px;opacity:1 !important}div#nav > div:nth-child(2) ul#your-items-tree > li ul li:hover,#lhn-selectors .selector:hover{background:transparent !important;opacity:1 !important}div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-1-main:hover,div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-2-main:hover{opacity:1 !important}div#nav > div:nth-child(2) ul#your-items-tree > li ul li:hover span.name-text,#lhn-selectors .selector:hover span.text{color:rgb(255,255,255) !important}#mark-all-as-read-options{margin-top:-2px !important;width:8px !important;margin-right:3px !important}body div#nav > div:nth-child(2){margin-left:6px !important}body.lhn-hidden div#chrome-header{z-index:1001 !important;margin-top:1px !important;margin-bottom:-14px !important;width:80px}body.lhn-hidden div#chrome-header span#chrome-view-links{left:-14px !important;top:6px !important;margin-bottom:-5px !important}body.lhn-hidden.lhn-menu div#nav{z-index:1003 !important;top:-21px !important;border:1px solid rgba(255,255,255,0) !important;-webkit-box-shadow:rgba(0,0,0,.6) 0 1px 5px;-moz-box-shadow:rgba(0,0,0,.6) 0 1px 5px;-moz-border-radius:4px;border-radius:4px}body.lhn-hidden div#nav > div:nth-child(2){margin-left:88px !important}body.lhn-hidden div#viewer-header{margin-top:-11px !important;z-index:1004 !important}body.lhn-hidden div#viewer-header div#viewer-top-controls{margin-left:100px !important;margin-top:0px !important}div#chrome-lhn-menu div.goog-button-body{position:fixed;top:5px !important;color:rgb(255,255,255)}div#nav{position:absolute !important;top:0px !important}div#nav > div:nth-child(5){border-top:0 !important}div#nav > div:nth-child(5) div.lhn-section-primary{display:block !important;background:-webkit-gradient(		 linear,	 left top,	 left bottom,		color-stop(0,rgb(256,254,252)),	 color-stop(0.1,rgb(246,244,242)),	 color-stop(0.9,rgb(233,231,229)),	 color-stop(1,rgb(223,221,219))) !important;background:-moz-linear-gradient(		top,	 rgb(256,254,252),	rgb(246,244,242) 10%,		rgb(233,231,229) 90%,		rgb(223,221,219)) !important;height:25px !important;margin-left:0 !important;text-indent:10px !important;font-size:12px;line-height:26px !important;color:rgb(100,100,100) !important;text-shadow:rgb(255,255,255) 0 1px 0;border-top:1px solid rgb(255,255,255);padding-top:1px !important}div.lhn-section-primary span{font-weight:500 !important}div#nav ul#sub-tree{top:40px !important;margin-bottom:40px !important;background:rgb(250,248,245) !important}div#nav > div:nth-child(5) li{background:transparent !important;line-height:28px !important}div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded a.link{margin-left:0 !important;padding-left:22px !important}div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded span.favicon,div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded span.sub-icon,div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded a.link .favicon{top:6px !important;background-color:transparent !important}span.sub-name span.name-text,div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded span.name-text-d-2{padding-left:4px !important;font-weight:400 !important;font-size:12px;color:rgb(90,95,100) !important}div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a{border-top:1px solid rgb(255,255,255) !important;border-bottom:1px solid rgb(240,238,236) !important}div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a:hover{background:rgb(255,255,255) !important;border-top:1px solid rgb(255,255,255) !important}div#nav > div:nth-child(5) ul#sub-tree li.folder > a{background:-webkit-gradient(		linear,		left top,		left bottom,	 color-stop(0,rgb(256,254,252)),	color-stop(0.1,rgb(246,244,242)),		color-stop(1,rgb(233,231,229))) !important;background:-moz-linear-gradient(		 top,		rgb(256,254,252),	 rgb(246,244,242) 10%,	 rgb(233,231,229)) !important;border-bottom:1px solid rgb(181,180,178) !important;padding-left:22px !important}div#nav > div:nth-child(5) ul#sub-tree li.folder > a span{padding-left:1px !important}div#nav > div:nth-child(5) ul#sub-tree > li.expanded > ul > li.expanded{border-bottom:1px solid rgb(190,188,187) !important}.scroll-tree li.tag.tree-selected a:hover,.scroll-tree li.tag a.tree-link-selected,div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a.tree-link-selected{background:-webkit-gradient(		linear,		left top,		left bottom,	 color-stop(0,rgb(103,102,101)),	color-stop(0.1,rgb(113,112,111)),	 color-stop(0.6,rgb(135,133,132)),	 color-stop(1,rgb(152,150,149))) !important;border-bottom:1px solid rgb(133,131,130) !important;border-top:1px solid rgb(95,94,93) !important;-webkit-box-shadow:inset 0 1px 20px rgba(0,0,0,.25)}div#nav li.tag.tree-selected span:nth-child(1),div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a.tree-link-selected span{color:rgb(255,255,255) !important;text-shadow:rgb(95,94,93) 0 1px 2px;font-weight:500 !important}div li.sub span.sub-unread-count,div span.unread-count-d-1,div span.unread-count-d-2{font-weight:400 !important;float:right;margin-right:10px}div span.unread-count-d-2{font-size:12px !important}div span.unread-count-d-1,span.folder-name-text.name-text-d-1{color:rgb(71,70,69)!important;font-weight:500 !important;font-size:13px !important;text-shadow:rgb(255,255,255) 0 1px 0}div.folder-toggle{position:relative;top:4px !important}div.tree-item-action-container{background:transparent !important;top:4px !important;right:4px !important}.lhn-section-footer{height:28px !important;background:-webkit-gradient(		linear,		left top,		left bottom,	 color-stop(0,rgb(256,254,252)),	color-stop(0.1,rgb(246,244,242)),		color-stop(0.9,rgb(233,231,229)),		color-stop(1,rgb(223,221,219))) !important;background:-moz-linear-gradient(		 top,			rgb(256,254,252),			rgb(246,244,242) 10%,			rgb(233,231,229) 90%,			rgb(223,221,219)) !important;border-top:1px solid rgb(203,201,199)}.lhn-section-footer a{position:relative !important;top:4px !important}div#nav > div:nth-child(5) ul#sub-tree li.folder > a.tree-link-selected{background:-webkit-gradient(		 linear,	 left top,	 left bottom,		color-stop(0,rgb(246,244,242)),	 color-stop(0.1,rgb(236,234,232)),	 color-stop(0.9,rgb(223,221,219)),	 color-stop(1,rgb(213,211,209))) !important;background:-moz-linear-gradient(		top,		 rgb(246,244,242),		 rgb(236,234,232) 10%,		 rgb(223,221,219) 90%,		 rgb(213,211,209)) !important}div#nav > div:nth-child(5) ul#sub-tree li.tree-selected li.sub a.link{background:rgba(102,101,100,.1) !important;border-top:1px solid rgba(0,0,0,.05) !important}a.link.tree-link-selected span.name-text-d-1{color:rgb(0,0,0) !important}div#nav li.tag{margin-left:-18px !important;padding-left:2px !important}div#nav li.tag span:nth-child(1){padding-left:0px !important;font-size:11px !important;text-transform:uppercase !important;font-weight:500 !important;text-shadow:rgba(255,255,255,.9) 0 1px 1px;color:rgb(90,90,90) !important}.scroll-tree li.tag a:hover{background:rgb(255,255,250) !important}div#lhn-friends{z-index:2000 !important;border:none !important;height:24px !important;margin-bottom:24px !important;position:relative;display:none !important}div#lhn-friends .folder{background:transparent !important;border:none !important}div#lhn-friends .folder a{background:-webkit-gradient(		linear,		left top,		left bottom,	 color-stop(0,rgb(256,254,252)),	color-stop(0.1,rgb(246,244,242)),		color-stop(1,rgb(233,231,229))) !important;border-bottom:1px solid rgb(181,180,178) !important;padding-left:22px !important;line-height:28px}div#main{top:30px !important}div#lhn-add-subscription-section{position:absolute;top:-23px;z-index:1001}div#lhn-add-subscription-section > div{margin:0}div#viewer-container{position:relative !important;top:10px !important;z-index:1}div#viewer-page-container{background:transparent !important;margin-bottom:1em !important}div#home .overview-item-link,div#home div#overview .item-title .link{text-decoration:none !important;color:rgb(100,100,100) !important}div#home div.overview-header span a{display:block;padding:3px 6px;color:rgb(86,86,85) !important;font-weight:600 !important;border-top:1px dotted rgb(196,193,191) !important;border-bottom:1px dotted rgb(196,193,191) !important;font-size:16px !important;line-height:30px !important;margin:20px 0 10px !important;-webkit-transition-duration:500ms;-moz-transition-duration:500ms;text-shadow:rgb(255,255,255) 0 1px 0;font-weight:500 !important}div#home div.overview-header span a:hover{background:rgba(240,238,236,.5)}div#home div.overview-header span.unread span{color:rgba(0,0,0,0) !important;float:right;font-size:1px !important}div#home div.overview-header span.unread span b{color:rgb(106,106,105) !important;font-weight:normal;font-size:14px;top:-2px;right:3px;position:relative}div#home div#overview span.item-title{display:block !important}div.overview-metadata{padding:0 6px !important;margin-bottom:1.2em !important}div#home div#overview div.label{margin-right:6px !important;margin-top:1em !important;font-size:14px !important;color:rgb(150,150,150) !important;font-style:italic !important}div.overview-section-header,td#right-section,div#recent-activity{display:none}div#home div#overview{padding:0 2% !important}#overview .overview-segment img{max-width:40% !important;height:auto !important;margin:0.5em;clear:right !important}div#home,div.card div.entry-container{width:95% !important;margin:0 auto !important}body.lhn-hidden div#home,body.lhn-hidden div.card div.entry-container{width:90% !important;margin:0 auto !important}div#entries{top:-10px !important}div#viewer-top-controls{height:16px !important;min-width:400px !important}div#chrome{border-left:1px solid rgb(146,147,147) !important;background:rgb(250,249,248) !important}div.card-actions,div#viewer-top-controls,div#viewer-container,div.entry,table#chrome-viewer-container tr td,span#chrome-view-links,div#viewer-header,div#chrome-header{background:transparent !important;border:0 !important}div#viewer-header{background:-webkit-gradient(		 linear,	 left top,	 left bottom,		color-stop(0,rgb(256,254,252)),	 color-stop(0.1,rgb(246,244,242)),	 color-stop(0.9,rgb(233,231,229)),	 color-stop(1,rgb(223,221,219))) !important;background:-moz-linear-gradient(		top,	rgb(256,254,252),			rgb(246,244,242) 10%,			rgb(233,231,229) 90%,			rgb(223,221,219)) !important;height:26px;margin-top:-2px !important;border-top:1px solid rgb(255,255,255) !important;border-bottom:1px solid rgb(181,180,178) !important;margin-left:-8px !important;z-index:1001 !important}div.card{border:0 !important;background:transparent !important}#current-entry .card .card-content,.card .card-content{padding:1em 0 0 !important}div.entry div.entry-main{margin-left:24px !important}div.entry-main p iframe{display:none}a.entry-title-link{background:transparent !important}div.card{-webkit-box-shadow:none !important;-moz-box-shadow:none !important;margin-top:1em !important}div#viewer-top-controls div#mark-all-as-read{margin-left:12px !important}div#viewer-top-controls div#stream-prefs-menu,div#viewer-top-controls div#viewer-refresh,div#viewer-top-controls div#mark-all-as-read{z-index:1000;position:relative !important;top:-2px !important}div#viewer-top-controls div#stream-prefs-menu div,div#viewer-top-controls div#viewer-refresh div,div#viewer-top-controls div#mark-all-as-read div{margin:0 1px !important;padding:0 !important}div#viewer-top-controls div#stream-prefs-menu{margin-left:8px !important}div#viewer-top-controls div#stream-prefs-menu div{display:none}div#chrome-header span#chrome-title a{color:rgb(130,130,130);text-shadow:rgb(255,255,255) 0 1px 0}.entry .entry-body div.item-body{margin-top:0.8em !important}.entry .entry-body div.item-body h3{clear:both;margin-top:1em !important}.entry .entry-body div.item-body ol,.entry .entry-body div.item-body ul{display:block !important;padding-left:0 !important;margin-left:2em !important;clear:left}.entry .entry-body div.item-body ol li,.entry .entry-body div.item-body ul li{margin-bottom:0.8em !important}.entry .entry-body div.item-body dt{color:rgb(0,0,0) !important}div.entry-author,.collapsed div.entry-date,div.entry-container div.entry-date{color:rgb(150,150,150) !important}div.entry-container div.entry-date{xxxxfloat:left !important;margin-top:5px !important}.collapsed div.entry-date{margin-top:2px !important;margin-right:8px !important}div.single-source .collapsed div.entry-date{margin-top:10px !important}h2.entry-title{clear:left;display:block}div.card-content h2.entry-title{-webkit-transition-duration:400ms !important;-moz-transition-duration:400ms !important;opacity:.6 !important;top:24px !important;position:relative;margin-bottom:36px !important}div.single-source.cards div.card-content h2.entry-title{top:-3px !important;margin-bottom:0 !important}div#entries.single-source.cards div#current-entry div.card-content h2.entry-title{top:-10px !important;margin-bottom:-7px !important}h2.entry-title a{color:rgb(46,46,45) !important;font-size:24px;line-height:28px;font-weight:500 !important}div#current-entry h2.entry-title{opacity:1 !important}.entry .item-body,.entry .entry-body,.entry .entry-title,.entey .entry-likers{max-width:96% !important}div.entry-main{overflow:hidden !important}div.entry-author{position:absolute !important;top:4px !important;font-size:12px !important;clear:left !important;display:block !important}.state-stream div.entry-author div.entry-via{display:none !important}div.single-source.cards div.entry-author{display:none !important}span.entry-author-parent{display:none !important;font-style:italic !important}div.card-actions{-moz-border-radius:0 !important;border-radius:0 !important;border-bottom:1px dotted rgb(196,193,191) !important;padding-bottom:3.2em !important;padding-left:22px !important}div.entry-actions{margin-left:2.1% !important}div.entry-actions span{color:rgb(124,122,121) !important;opacity:0}div#current-entry.expanded div.entry-actions span,div.entry:hover div.card-actions span,div#current-entry div.card-actions span{opacity:1}div.entry-body span.link.popout{display:none}span#chrome-view-links{float:right !important;position:relative !important;top:8px !important;z-index:1002 !important;font-size:9px !important;letter-spacing:-1px;color:rgba(255,255,255,0);width:52px;height:21px;right:-16px !important}span#chrome-view-links span.link{font-size:12px !important;letter-spacing:0px !important}div#chrome-header{margin-bottom:-22px !important;margin-top:0px !important}div#chrome-header span#chrome-title{display:none !important}div#viewer-all-new-links{text-indent:-10px !important;color:rgba(255,255,255,0);z-index:1000;position:relative !important;font-size:9px !important;letter-spacing:-2px;top:-3px !important}div#viewer-all-new-links span.link{font-size:12px !important;font-weight:normal !important;padding:2px 8px !important;-moz-border-radius:12px;border-radius:12px;color:rgb(136,134,133) !important;letter-spacing:0px !important}div#viewer-all-new-links span.link-selected{background:rgb(136,134,133) !important;color:rgb(251,248,246) !important;text-shadow:rgba(0,0,0,.7) 0 1px 0;-webkit-box-shadow:rgba(255,255,255,.7) 0 2px 0,inset 0 1px 4px rgba(0,0,0,.5);-moz-box-shadow:rgba(255,255,255,.7) 0 2px 0,inset 0 1px 4px rgba(0,0,0,.5)}div.entry-0{padding-top:0 !important}.entry .item-body,.entry .entry-body{padding-top:0 !important;color:rgb(70,70,69) !important}.entry .item-body p,.entry .entry-body p{margin-bottom:2em !important}.entry .item-body p em,.entry .entry-body p em{color:rgb(70,70,75) !important}.entry .entry-body p strong{color:rgb(70,70,70) !important;font-weight:500}.entry .entry-body code pre{padding:16px 24px;background:rgb(245,243,243) !important;-moz-border-radius:4px !important;border-radius:4px !important;-webkit-box-shadow:rgb(255,255,255) 0 1px 0 !important;-moz-box-shadow:rgb(255,255,255) 0 1px 0 !important;color:rgb(50,50,50) !important;text-shadow:rgb(255,255,255) 0 0 3px;line-height:22px !important}.entry .entry-body p img{margin:1em 4px !important;clear:both !important;display:block !important;max-width:100% !important;height:auto !important}.entry .entry-body hr{height:0 !important;border:none;border-top:1px solid rgb(170,170,175);border-bottom:1px solid rgb(255,255,255)}div.entry blockquote{border-left:1px dotted rgba(136,134,133,.4);margin-left:4px !important;padding-left:36px !important;color:rgb(70,70,75) !important;text-shadow:rgb(255,255,255) 0 1px 0}div.entry ul li,div.entry ol li{margin-bottom:0.7em !important}div.entry-body div dl dd{margin-left:1.2em !important;margin-bottom:0.5em !important}div.collapsed,div.collapsed .entry-date,div.collapsed .entry-secondary{}div.collapsed{height:72px !important;background:transparent !important;border-left:0 !important;border-right:0 !important;border-top:1px solid rgb(255,255,255) !important;border-bottom:1px solid rgb(240,238,236) !important;padding:6px 0 !important;width:92% !important;margin-left:4% !important}div#current-entry div.collapsed{height:14px !important}div.samedir div#current-entry.expanded div.collapsed,div.single-source div#current-entry.expanded div.collapsed{border-bottom:0 !important}div.samedir div#entries.list div#current-entry div.collapsed{height:72px !important}div.single-source div#current-entry.expanded div.collapsed{margin-bottom:-36px !important}div.single-source div#current-entry.expanded div.collapsed h2.entry-title{height:21px !important;overflow:hidden !important;opacity:0 !important}div.samedir div#current-entry.expanded div.collapsed .entry-secondary,div.single-source div#current-entry.expanded div.collapsed .entry-date,div.single-source div#current-entry.expanded div.collapsed .entry-secondary{opacity:0 !important}div.single-source div#current-entry.expanded div.collapsed div.entry-icons{margin-top:10px !important}.samedir #entries.list .collapsed .entry-secondary{width:88% !important;margin:0 48px 0 24px !important;height:66px !important;display:block !important;padding-top:5px !important}div.collapsed span.entry-source-title{display:block !important;clear:both !important;position:relative !important;left:0 !important;top:0px !important;font-size:13px !important;height:24px !important;width:auto !important;text-indent:1px !important}div.collapsed h2.entry-title{display:block !important;clear:both !important;margin-top:22px !important;line-height:18px !important;font-size:16px !important;margin-bottom:6px !important}div.collapsed h2.entry-title{font-weight:400 !important;color:rgb(44,42,40) !important}div.read div.collapsed h2.entry-title{color:rgb(144,142,140) !important}div.single-source div.collapsed div.entry-icons div.item-star-active,div.single-source div.collapsed div.entry-icons div.item-star{position:relative !important;top:6px !important}div.single-source div.collapsed h2.entry-title{display:block !important;clear:both !important;margin-top:5px !important;line-height:18px !important;font-size:16px !important;margin-bottom:6px !important}div.result-snippet,div#entries.search div.search-result,div.collapsed span.snippet{font-size:12px !important;line-height:18px !important;color:rgb(148,150,152) !important}div#entries.list div#current-entry div.entry-actions,div#entries.single-source.list div#current-entry div.entry-actions{border:0 !important;background:transparent !important;padding-bottom:24px !important;border-bottom:1px solid rgb(240,238,236) !important;padding-left:24px !important;margin-left:4% !important}div.collapsed div.entry-icons{top:7px !important}div#current-entry.expanded div.entry-actions{height:24px !important}div#entries.list div.entry-container,div#entries.list div.entry-container div.entry-actions{background:transparent !important;width:92% !important;margin-left:4% !important}div.samedir span.entry-source-title{padding-top:2px !important}div.samedir div#current-entry div.collapsed{height:28px !important;border-top:none !important}div.samedir div#entries.list div#current-entry.expanded div.collapsed{height:11px !important;margin-top:18px !important}div.single-source div#current-entry.expanded{margin-top:4px !important}div.single-source div#current-entry div.collapsed{height:28px !important;margin-top:-4px !important}div.samedir div#entries.list.single-source div#current-entry.expanded div.collapsed{height:25px !important;margin-top:0px !important}div.single-source.list div#current-entry div.entry-icons{top:6px !important}div.single-source.list div#current-entry h2.entry-title{margin-top:10px !important}div.single-source div#current-entry h2.entry-title{margin-top:7px !important}div.interruption.self-interruption{padding:16px!important;background:rgb(242,242,243) !important;border-top:1px solid rgb(255,255,255) !important;border-bottom:1px solid rgb(201,200,198) !important;-webkit-box-shadow:rgba(0,0,0,.2) 0 0 4px !important;-moz-box-shadow:rgba(0,0,0,.2) 0 0 4px !important;margin-bottom:1em !important}div.interruption.self-interruption a,div.interruption.self-interruption .link{text-decoration:none !important}div.interruption.self-interruption div.goog-button-body{margin-right:-16px !important}div.interruption.self-interruption div.tag-container{margin-bottom:1em !important}div.interruption.self-interruption div.self-interruption-info,div.interruption.self-interruption div.self-interruption-header{margin-bottom:0.5em !important}span.self-interruption-name{font-weight:500 !important;text-shadow:rgb(255,255,255) 0 1px 0;color:rgb(80,80,80)}span.self-interruption-favicons{float:right;margin-right:-16px}span.self-interruption-favicons a{margin-left:6px !important}td.self-interuption-description{padding-left:50px}div.entry-annotation-body{display:block;font-size:14px;line-height:19px;padding:0 16px;color:rgb(100,100,100);font-style:normal}div.entry-annotation{max-width:100% !important;margin-bottom:2em !important}div.created div.entry-body{background:transparent !important}div#entries.list div.expanded div.entry-author{display:none !important}div#entries.list div.expanded h2.entry-title{margin-bottom:1em !important}div.entry-annotation{padding:22px 18px !important;background:rgb(250,250,245) !important;-webkit-box-shadow:rgba(0,0,0,.3) 0px 1px 3px !important;margin:6px !important}div.entry-annotation div.entry-annotation-body{line-height:20px !important;font-size:14px !important;color:rgb(102,100,100) !important;font-style:italic !important}div.comment-add textarea{width:96% !important;border-radius:4px !important}div#quick-add-input-div input#quickadd,div.interruption input.tags,div.interruption .title-container .title,div.comment-add textarea,div.interruption.self-interruption textarea{-moz-border-radius:4px !important;border-radius:4px !important;border:1px solid rgb(204,204,204) !important;outline:none !important;padding:6px 8px !important;color:rgb(70,70,70) !important;-webkit-transition-duration:300ms;-moz-transition-duration:300ms}div#quick-add-input-div input#quickadd:focus,div#search input#search-input:focus,div.interruption input.tags:focus,div.interruption .title-container .title:focus,div.comment-add textarea:focus,div.interruption.self-interruption textarea:focus{border:1px solid rgb(130,210,242) !important;-webkit-box-shadow:rgba(130,210,242,.5) 0 0 3px;-moz-box-shadow:rgba(130,210,242,.5) 0 0 3px}div#quick-add-input-div input#quickadd{width:204px !important}div#quick-add-btn > div{margin-top:1px !important}div#entries.cards div.entry-likers,span.bookmarklet-callout,div.search-result a.entry-original,div.item-link-drop-down-arrow,div.gbd,div#nav div.selector-icon,div#nav > div:nth-child(5) div#lhn-subscriptions-minimize,div#nav > div:nth-child(2) div#lhn-selectors-minimize,div#nav > div:nth-child(2) div:nth-child(5) div:nth-child(4),div#nav > div:nth-child(2) div:nth-child(5) div:nth-child(3),div#nav > div:nth-child(2) ul#your-items-tree div.toggle,div#nav > div:nth-child(2) ul#your-items-tree a#your-items-tree-item-0-link,div#entries.single-source span.entry-source-title,a#your-items-tree-item-2-link span.icon,a#your-items-tree-item-1-link span.icon,div.tree-item-action-container,div#team-messages,div#tips,div#lhn-selectors-menubutton,div#guser nobr:nth-child(1) :nth-child(6),div.collapsed a.entry-original,span.like.link,span.star.link,span.tag.link,div#chrome-header span#chrome-title a span,div#viewer-details-toggle,div.entry-title-go-to,span.subscribe-button,span.folder-icon,div#viewer-footer,xxxxdiv#lhn-friends,div#lhn-recommendations,div.gbh,div#search-submit,div#search-restrict,a#logo-container,div#gbar{display:none !important}div#entries span.subscribe-button{display:block !important}div.collapsed span .snippet,div#scroll-filler div.scroll-filler-message div:first-child,div#home div#overview div.label,.entry .entry-body div.item-body h2,.entry .entry-body div.item-body h3,.collapsed div.entry-date,div.entry-container div.entry-date,div#home div.overview-header span a,div#chrome-header span#chrome-title a{font-family:"Helvetica Neue","Helvetica","Arial" !important}.entry .item-body,div.collapsed h2.entry-title,div.single-source div.collapsed h2.entry-title,div#home div#overview span.item-title,.entry .entry-body blockquote,div#home div#overview span.overview-item-link,.entry .entry-body{font-family:"Helvetica Neue","Helvetica","Arial" !important}div.entry-annotation div.entry-annotation-body,.entry .entry-body blockquote{font-family:"Georgia","Palatino",serif !important}div#chrome-header span#chrome-title a{font-size:14px}.entry .item-body,.entry .entry-body{font-size:16px !important;line-height:28px !important;color:rgb(100,100,100) !important;font-weight:400 !important;text-shadow:rgb(255,255,255) 0 1px 0}div#home div#overview span.overview-item-link{font-size:13px !important;line-height:20px !important}div#entries.search div.search-result span.entry-date,div.collapsed span.entry-source-title,.collapsed div.entry-date,div.entry-container div.entry-date{color:rgb(180,180,180) !important}div#entries.search div.search-result span.entry-date,.collapsed div.entry-date,div.entry-container div.entry-date{font-size:11px !important;text-transform:uppercase}.entry .entry-body blockquote{font-style:italic !important}div#home div#overview span.item-title{font-size:18px !important;line-height:22px !important;color:rgb(50,50,50) !important;margin-bottom:0.4em !important}div#home div#overview div.overview-metadata{margin-bottom:2em !important}div#footer{font-family:"Helvetica Neue",sans-serif;line-height:24px !important;font-size:12px !important;color:rgb(150,150,150) !important;text-shadow:rgb(255,255,255) 0 1px 0 !important}div#footer a{text-decoration:none !important}div#footer a b{font-weight:400 !important}div#single-item-bottom-links{display:none !important}div#scroll-filler{position:absolute !important;padding:0 !important;line-height:1.6em;margin-top:0em !important;margin-bottom:2em !important}div#scroll-filler div.scroll-filler-message{height:80px !important;padding:2em 0 1em !important}div#scroll-filler div.scroll-filler-message div:first-child{font-size:24px;margin-bottom:0.3em;color:rgb(104,102,100);font-weight:600 !important;text-shadow:rgb(255,255,255) 0 1px 1px !important}div#scroll-filler a{text-decoration:none !important}div.feed-info,div#entries.search a.entry-source-title,div#footer a,div#home div#overview div.label a,div.entry-author a{color:rgb(130,140,150) !important;-webkit-transition-duration:400ms;-moz-transition-duration:400ms}div#entries.search a.entry-source-title{font-style:italic !important}div#home span.link{color:rgb(80,80,90) !important;-webkit-transition-duration:400ms;-moz-transition-duration:400ms}div#home span.link:hover{color:rgb(0,0,10) !important}div.entry-author a:hover,span.directory-return-link,div.search div.preview-interruption span.try-search-on-feeds-link,div.interruption.self-interruption a,div.interruption.self-interruption .link,div.friends-bubble-contents a,div#scroll-filler a,.entry .entry-body a{color:rgb(16,122,155) !important;text-decoration:none !important;text-shadow:rgb(255,255,255) 0 1px 0;-webkit-transition-duration:400ms;-moz-transition-duration:400ms}span.directory-return-link:hover,div.search div.preview-interruption span.try-search-on-feeds-link:hover,div#entries.search a.entry-source-title:hover,div.interruption.self-interruption a:hover,div.interruption.self-interruption .link:hover,div.friends-bubble-contents a:hover,div#footer a:hover,div#home div#overview div.label a:hover,div#scroll-filler a:hover,.entry .entry-body a:hover{color:rgb(42,162,185) !important}div.entry-actions span.link{-webkit-transition-duration:0 !important-moz-transition-duration:0 !important;}span#sub-tree-header,.lhn-section-footer a,div#no-entries-msg span.link{color:rgb(103,101,99) !important}div#no-entries-msg span.link:hover{color:rgb(93,91,89) !important}div#no-entries-msg span.link:active{color:rgb(0,0,0) !important}span#sub-tree-header:hover,.lhn-section-footer a:hover{color:rgb(71,70,69)!important;text-shadow:rgb(255,255,255) 0 1px 0}#home #overview a.label-link b,#home #overview a.label-link{font-weight:500 !important}div.interruption.self-interruption a.bookmarklet-link{color:rgb(80,80,80) !important;font-weight:500 !important;-webkit-border-radius:4px !important;-moz-border-radius:4px !important;border-bottom:1px solid rgba(150,150,150,.7) !important;-webkit-box-shadow:rgb(255,255,255) 0 1px 0px;-moz-box-shadow:rgb(255,255,255) 0 1px 0px;font-size:12px}li#your-items-tree-item-0-main div.toggle.folder-toggle{top:0px !important;left:0px !important}li.expanded div.toggle-d-1{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYtJREFUeNpi/P//PwMpgImBRECyBhYYo7y0ZDUHO1sIKysrAwsQg8C/f/8Yfvz4wfDj5881Xd29oSgaKquqv69eufwfKxsrEzsbOwMjIwPDr1+/GH79/vMvJDT8O0wdI5KnhW/funnx8sXz0jw8PAyMQPj5y2cGXX3Dp6pq6vpA+bfofngLlMiQlJL+wcrCysDExMgAYoPEYIqxeXqLjp7+6i/fvv779v3HPxAbJIaiAuQkNCx888aNJzdvXH8CYqPLM+KIOB+YjegSjIMvpkc1jGqgiYaCvNwVQCxKtAZBQYFwIL5eU1URiEsDSgaaPLHvPxuwiPn16yfD+/fv13z69CWrp6//NW4b+AUYxESEGSQlJBikJCRDhIUEr1eUFgdiLfnAHDZWBh5eXgZmZhZwucTCwsKvrqlpBpRaj1UD2HlQLCkt9cPTyOQBFxf3cZw2/P39h+HPn7//1LV0PsnJK6wDCpUhF2IY5dLmjeu/f/369TqQ7YelvIK5AEVgLrbCi5iCjHpJAyDAAIUM7JLSKg4VAAAAAElFTkSuQmCC) !important;background-position:6px 5px !important;background-repeat:no-repeat}li.collapsed div.toggle-d-1{background-position:6px -19px !important}div#viewer-top-controls div#stream-prefs-menu,div#lhn-subscriptions-menubutton{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjlERTYyRkJGODZCMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjlERTYyRkNGODZCMTFERjlBRURDODgzNDUwQUZDMUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERUVBRDA0MEY4MzIxMURGOUFFREM4ODM0NTBBRkMxRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOURFNjJGQUY4NkIxMURGOUFFREM4ODM0NTBBRkMxRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkfAWAEAAAQBSURBVHjaxFVtTFtlFH7vbW9L77394H7YJgOpKwSTMhPgp0qy/WJD3KT7SFxmtrhmQmIQsokGNXEajSNjbCYzg00DE+PcRJYssB86/OP+TUgWkmVSpc4lllsYFi6sLe3rOddCkLQ1TUh8kyf3vOc59/Tc8573KUspJZsBlmzSMhf6woH9gQGWZQ8xDEsY2KdpmqTT9DKbPXgvRWTjLn3eP1VSUqoLvI3wAk9KSkv13r6LIaOifXubtkD6HpZhW658c00rslrJapYD+wJqmtAL4Hj96rWhh+A6+VpzS03vhc8asaLgsebvnU7XKSMRz9surqRS9VaO2xY8euQ30S4aScC+LohCZSKRrDSbTDZw7RRF0SqK5a0NLzT6MJHPV94Kj2UGOx6J/Hmmp/t0MLYQEzjOTCwWq/H98WSCJBNJ4nA49Tfa2vvcbk/buq+szzxvrjUbAt6XZHl/Kr0ilD1ZNr+zofFX9I+O3Nga/j3s8ng8sxizoV0312+YVw69TKFcAp9ALGaOtLYd71NVtRtJTdPaz/acDiagsqVFnSwsLJD+y18x2Q6BtVoshLNwkMRMGJYhP479cBb89xBoM/AaB5wRA4eQa2GPxtD44lJv1VRoSoHG3orFYgfxZx0OxyD0bEdF5dPa4cOvTmbe2Z4rEek40a5KsjQJCVRdXyJLS8sGibNi43nidDq02dk5/6mubi1XRcZAwnT2x/6KqZIk636/P2rji2AkikjVtmdmZFnWkcOYvCOPFf3x4MG58+c/jc7NzX0N+5NvdxynCFjvoQ85jMl3aVcNBfAxwIX7dzo76LuADOfKcEq+REaPsqyxfI0t5PZvL1QVNk2PCk7EMMwAgG7AAJsj2AjIxsEpTlVXV+uKIhME2pFIJGR03Gw2bwFcBai45ziOIjKcChjCmMwJWcfHfx6ue/7ZVF3dcym0wWczEsmyNCoIPHW5nPfgAo/a7SJFgH0dfYIgUIxZd9xlIyM37iLQXpujUCh0BkpchFtP3e4nqMfj/gdgow85jNkwO/UZ/GsgXQ0Nux76fFvp7t0vPrp9+6c7CLTRFwgEwqvDmnMgKyrKKQc6xJlNhDWZyNB3w31er9fQo+np6faml/YE06kUSa4gkuT+/V+y6xH0gjicduJwOYndYSeDg1+u6RHa6EMOY+wZLc+rR52db1WNj08o8LG3Fhf1g+gTRWEQ/j121NbWah98+NF/61GgaY+qKMrk/Pwj9fHjOInH4wZpBUVEFBcXa9Fo1P/t0LCW967BMfcnkwnV631KlyRpeWICKyOktqZmBjIIUW1GxRhw7cqrR+Hw9Lmurk+is9GooUctzccoAvUIfchhTMF69OaJNtoB+F/06G8BBgA9wc5yNk0sGwAAAABJRU5ErkJggg==) !important;background-repeat:no-repeat}div#viewer-top-controls div#stream-prefs-menu{margin-top:0px !important}span#view-list,span#view-cards{background-image:url(data:image/png;base64,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) !important;text-indent:-623em !important;height:21px !important;width:26px !important;display:block !important;float:left !important;background-repeat:no-repeat;position:absolute !important;top:0 !important}span#view-cards.link-selected{background-position:0 bottom !important}span#view-list{background-position:-26px bottom !important;left:30px}span#view-list.link-selected{background-position:-26px top !important}div#viewer-top-controls div#stream-prefs-menu{background-position:0 0 !important;width:22px !important;height:16px !important}div#lhn-subscriptions-menubutton{background-position:0px 1px !important;width:18px !important;height:16px !important;margin-right:2px !important;margin-top:1px !important}div#lhn-subscriptions-menubutton:active{background-position:0px -15px !important}div#nav > div:nth-child(2) a#your-items-tree-item-1-link,div#nav > div:nth-child(2) a#your-items-tree-item-2-link,div#lhn-selectors div.selector a.link{display:block !important;width:28px !important;height:22px !important;overflow:hidden;background-image:url(data:application/octet-stream;base64,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) !important;text-indent:-623em !important;background-repeat:no-repeat !important;margin-top:-1px !important}div#lhn-selectors div:first-child > a.link{background-position:3px 0px !important}div#lhn-selectors div.selected a.link{background-position:3px -22px !important}div#lhn-selectors div#reading-list-selector a.link{background-position:-28px 0px !important}div#lhn-selectors div#reading-list-selector.selected a.link{background-position:-28px -22px !important}div#lhn-selectors div#star-selector a.link{background-position:-60px 0px !important}div#lhn-selectors div#star-selector.selected a.link{background-position:-60px -22px !important}div#nav > div:nth-child(2) a#your-items-tree-item-1-link{background-position:-87px 2px !important;width:25px !important}div#nav > div:nth-child(2) a#your-items-tree-item-1-link.tree-link-selected{background-position:-87px -20px !important}div#nav > div:nth-child(2) a#your-items-tree-item-2-link{background-position:-119px 2px !important}div#nav > div:nth-child(2) a#your-items-tree-item-2-link.tree-link-selected{background-position:-119px -20px !important}div#your-items-tree-container{width:72px}div#your-items-tree-container li{width:36px !important}li#your-items-tree-item-1-main,li#your-items-tree-item-2-main{padding:0 !important;width:36px !important}div#viewer-refresh{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAaCAYAAACO5M0mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvlJREFUeNqUU11IU2EY/s7/2eZsqWOmbkPdQLds6UjmCgdmRqaupbOxkEgzkYpEEAyjvBCGSMQoMuyiuyK3IVZCbDZwQZAXQZmiwbCV3Yg3HZP9nM3Td479zJ+bPni+n+d9v5/3/Z4XcBwHdqKl+cxkS7OtMJ1D+G5nO+90QAuIbSZTrmQqOeLxTkT/Ora2nLXgJNFLEYSRIMl8nmOTScCybJhNsNdxnnCcs/eTNOWiKQrQNC0AgXyCZQGG4YrCoiId4nDYLdAQFIvFwNpoDRuPVK7dc9+pwnBi02A4/LXu5KlZaHfj+2Wyu3Az2tRkXYDkTTh/o1IXLtafbljIzT3wGK6fQMRxDMX0OIEDk8k8CIkJ/intHZ2P4HAf4ntX16WBWDTahlIUiWIYBoLBQCAt8Bu80+XODnmSZYcIgixG5QoFw1tCMzPOnWkS0VQ3juFArVIxyOzsO5/n2VNbLBZjfzBMTzweh9cjgCQJp1giGaZIEmtru+Dl82iYevHc5/e/KobOIBaPC6cJqRKJQO2JunBjo9X2J+HO+flPfcHgdMG3SCQTIAhQqdRMTc3xFZ3+4AgfefoXGvgPgij5vV6EGIf4IKz2EgVskxDbRLGnI0EQHEmSURzHb0GItqlHIpFY4NN6EQQxwqjzt24XbGHosyWK7OysfpGIdkEngKIo4Ec+RRy3CbKyshVHzVU6kJeXZ1EqlSmNRpNyu92fI5HIW61Ww+n1+tTg4O3l9fX1Z/BEM6goL3+vKy3hRkcfzEPCBpHT0d6+trS0FILzixCU8DyzuSpuMlVyq6ur9rSAXBD5/NxorBgwGMoW0X2ZUlQqlQKPZ3yXKKqrj8lpmhqSyWTFqEarZTIkYvA64N8lCnlOTneGRAJ0ulIGCYVmfGNjD22JeILd2PjZk0gkJ/g6IHDcKaLpYVg/2JWr17ZE4fWO+6amXgqigBuE00iKFGqnob4h3Gxv/SeKubmPfdMBf0Hky3Imn0ulWs3U1tatlJUd+j9R/BJgAL81dOUPnY83AAAAAElFTkSuQmCC) !important;background-repeat:no-repeat;text-indent:-623em !important;width:20px !important;height:14px !important;background-position:5px 1px !important;margin-top:2px !important}div#viewer-refresh:active{background-position:5px bottom !important}div#viewer-top-controls div#stream-prefs-menu:active{background-position:left bottom !important}div#mark-all-as-read{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAaCAYAAACD+r1hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6VJREFUeNqcU1toHGUUPv/8/1yys9nZrLFkuyz0oUYXLN2NfWjajS+9pCi1am5NRVNQwvhSEUkqCg2zYGiJj3lq962iaFKLLcF6eWjsgqCtrPgQbSwu1Dbr5rYVgsvOPzOeMzaliE/+8DHL2XP9zndYEARAb7D/RY0pbJQxpR+/3Qxtvh98C4E/6/nB2ZnZT5vkxyhgaLAvJYQ6xznfKQQHRVEA0O4jpPTAk/JH6clnP/7kwh02ONCnGS1GWRUiYxgGaJoGHIPoea6EputCo9EAV8qFxl+NrEBn29D1jGma0NJigCpUoCrUqed70NW1q0JBX175PIM5bOWRRMIm56gZgTAo0gKaroOqqbB7957Kc0deKPxZXy8baE/E22whpeyMRk3o3ttT4VyB8g83tgW+D7ncU5XeQ88U3n3nZDoI/Od1VaPWOoWuqYzjkPW11fLwS69cCvzgFLID5Pz2ybfSOLijcoGzqQAKA/b+1Ol6vb5uMcbA8/yJ9ybP3KaBx8beTPue76iqCIkgmmNWW51dvHjh2vXvv8sTvU23iRS6E1SBK9zh6KzjPBq243sSsl27SuLgwUPTv91azK2tr5sKVpE+OFRNwXnI2SCaOQfTim8cONA7TYsTtVrt/EcffnB4daVmIt/h0lRVBR33Qs4xy9oY6D96+dEtW15m96XR7rruVKn0TX7x5i/t1aWlOBcKJJOpe9u3P7bcvSdfwgRj6LeyGUBPII4gehA779t+QswjPkPITafwYd8oIEgisojuTTPiJkJ5kJh+CCFSSF0Zywb/BfqPfMiXmWZEU1WtLKWbIXYIDz/ccqgrVPOC6zazorW11fY8L6PrWijrfweMjByvUOZisYhq1m0lmdxqYxDEYrEHsCwr/L5u25XJyclCtVotR6NRZC1psx07npSoJT587FiFss/OzGyjzH39A5Xx8fFCVy6L4gscHwUJAXgCMzFS6drqSvn0malLuN1TFHDixBuFfH5vOmJGHGo1ILmgHxsdfa1+5/fbFjZPjE3MzV0Jxdfbuz+NBocpPDwoeqlUqs6K585e+/qrL/J0v3i7IFGxAdbmjDkkC44SwfMFamnfvv0lMXR0ePrWr4u52jLqCE/RdaUTbhSzapoOeC8hc/G2xMbg0PA/4qsu3T1fLJ47XKv9YeIFhusVlBlBVRKJxMbI8Vcvd3R0PCy+5tT8/NX8zwsL7dXq3biCStmaSt3rfPyJ5Z6ep1F82v8T398CDAB9g5Q0ik32gwAAAABJRU5ErkJggg==) !important;background-repeat:no-repeat;text-indent:-623em !important;width:20px !important;height:14px !important;background-position:5px 1px !important;margin-top:2px !important}div#mark-all-as-read:active{background-position:5px -12px !important}div.arr,span.item-link,#mark-all-as-read-options,div#chrome-lhn-toggle-icon,div.star,span.read-state,span.email,span.broadcast-with-note,span.broadcast-active,span.broadcast-inactive,.goog-option-selected div.goog-menuitem-checkbox{background-image:url(data:image/png;base64,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) !important;background-repeat:no-repeat;text-indent:-623em !important;width:14px !important;height:14px !important}.goog-option-selected div.goog-menuitem-checkbox{background-position:0px -143px !important;margin-top:5px !important}.goog-option-selected:hover div.goog-menuitem-checkbox{background-position:-14px -143px !important}span.item-link,span.broadcast-inactive,span.broadcast-active,span.broadcast-with-note,span.email,span.read-state{width:14px !important;padding-left:18px !important}span.broadcast-inactive{background-position:0px -7px !important}span.broadcast-active{background-position:0px -29px !important}span.broadcast-with-note{margin-left:8px;background-position:0px -51px !important}span.email{margin-left:8px;background-position:0px -72px !important}span.item-link-active,span.email.email-active{background-color:transparent !important;border-bottom:0 !important}span.read-state-not-kept-unread{margin-left:8px;background-position:0px -95px !important}span.read-state-kept-unread{margin-left:8px;background-position:0px -117px !important}div.star{width:16px !important;height:16px !important}div.item-star.empty{background-position:0px -160px !important}div.item-star-active{background-position:-17px -160px !important}div#chrome-lhn-toggle-icon{width:12px !important;background-position:-2px -187px !important;border-color:rgba(0,0,0,0) !important}.lhn-hidden div#chrome-lhn-toggle-icon{background-position:-20px -187px !important}span.item-link.link{margin-left:8px;background-position:0px -205px !important}#mark-all-as-read-options{background-position:-3px -230px !important}div.arr{width:8px !important;height:16px !important;background-position:0px -182px !important}div#quick-add-close{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REVFQUQwM0ZGODMyMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REVFQUQwM0VGODMyMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDo5NkE1MzY4ODQ5MjA2ODExOEY2Mjg3MjY4MUQ3M0Q1OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NkE1MzY4ODQ5MjA2ODExOEY2Mjg3MjY4MUQ3M0Q1OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvj6EF4AAAB+SURBVHjanJLRCcAgDESNdK+QzbqZuFgtEZFr9D5qQImej5wh0lpLR3ECdgZAHYvF1J3JIHhuBNahZWbVxTvAOu4MGembSIT9cYFzhTMFU7D8gXZ/xHhIPmNXUcFeAtsVK16ke9Gege2lq0v3WLfjABiBFj2Cv0ZOTof8FWAA7zxP3d5Ag5sAAAAASUVORK5CYII=) !important;display:block !important;width:14px !important;height:14px !important}li.tag a span{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEFBMENBNkNGODZGMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEFBMENBNkRGODZGMTFERjlBRURDODgzNDUwQUZDMUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QUEwQ0E2QUY4NkYxMURGOUFFREM4ODM0NTBBRkMxRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0QUEwQ0E2QkY4NkYxMURGOUFFREM4ODM0NTBBRkMxRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiZcwQ4AAACgSURBVHjaYvz//z8DqYCJgRxAqk0g9SxIfF80+XNA/JQY5x2HYhDQBWIuYjQxIYmxArEhEDOia2JB45uj8YWAWBWIb+Gy6QEOv6sBsSAuTVeA+A0WTSDnGUGdi6EJFPZngPgrFo2gANHBFRC/gfgklEYGf5FdwQiKLEZGjAASAWILqNO+QF3wGZ4Y8KQIBSA2QA9hQppwJiNGuqVygAADAMv0MUrALAGkAAAAAElFTkSuQmCC) !important;display:block !important;background-repeat:no-repeat !important;width:0px !important;background-position:0px 6px}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-button:start:decrement,::-webkit-scrollbar-button:end:increment {height:4px;display:block;background-color:transparent}::-webkit-scrollbar-thumb:vertical{background:rgba(100,100,102,.3);border-radius:4px;height:80px}::-webkit-scrollbar-track-piece:vertical{background-color:#fff;border-left:1px solid rgba(210,210,210,.2)}#gb{background:-webkit-gradient(		 linear,	 left top,	 left bottom,	 color-stop(0,rgb(74,73,72)),	 color-stop(0.3,rgb(64,63,62)),	 color-stop(0.7,rgb(54,53,52)),		color-stop(1,rgb(34,33,32))) !important;background:-moz-linear-gradient(		top,	rgb(74,73,72),		 rgb(64,63,62) 30%,			rgb(54,53,52) 70%,		 rgb(34,33,32)) !important}.gbtb2,#gbi4 .gbma,#gbz,#gbx1,#gbx2,#gbx3,#gbx4,.gbtcb{display:none !important}.gbts,#gbg5,.gbtb,.gbgt,#gbg4{border:0 !important}#search,#main{margin-top:0 !important}#gbi4 span{color:#aaa !important;font-weight:normal !important;font-size:11px !important;text-transform:uppercase;position:relative !important;top:1px}.gbto #gbgs4 span{color:#36c !important}#gbg{z-index:1010 !important}#gbg4,#gbg5{height:30px !important;-webkit-transition-duration:.5s;-moz-transition-duration:.5s}#gbg4:hover,#gbg5:hover{background:rgba(0,0,0,.3) !important;border:0 !important}#gbg5 #gbi5{background-position:0px -20px !important;opacity:.8}.gbto #gbg5 #gbi5{background-position:0px 1px !important}.gbto{-webkit-box-shadow:none !important;-moz-box-shadow:none !important}body.gecko{	overflow:visible}';

var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
var rules = document.createTextNode(pureReaderCSS);

style.type = 'text/css';

if(style.styleSheet) {
	style.styleSheet.cssText = rules.nodeValue;
} else {
	style.appendChild(rules);
}
head.appendChild(style);

// =======
// Uncompressed CSS rules of Pure Reader for Firefox
// =======
// body{
//	font-family: "Helvetica Neue", "Helvetica", sans-serif !important;
//	text-rendering: optimizeLegibility;
// }
// 
// /* @group Popover */
// div#message-area-outer,
// div#loading-area{
//	/*display: block !important;*/
// }
// table.info-bubble{
//	background: rgb(255,255,255) !important;
// }
// div#loading-area div,
// div#message-area-outer div{
//	background:transparent !important;
//	color: rgb(210, 208, 206) !important;
//	font-weight: 500 !important;
//	text-shadow: rgb(0,0,0) 0 -1px 1px !important;
//	padding-bottom: 6px !important;
//	text-transform: uppercase !important;
//	margin-top: 0px !important;
// }
// div#guser nobr a,
// div#guser nobr a u,
// div#message-area-outer div a{
//	color:rgb(150, 150, 150) !important;
//	text-decoration: none !important;
//	-webkit-transition-duration:400ms;
//	-moz-transition-duration:400ms;
// }
// div#guser nobr a:hover,
// div#message-area-outer div a:hover{
//	color:rgb(180, 180, 180) !important;
//	text-decoration: none !important;
// }
// 
// div#loading-area div.message-area-text-container,
// div#message-area-outer div.message-area-text-container{
//	padding-top: 8px !important;
// }
// div.message-area-bottom-1,
// div.message-area-bottom-2,
// div.message-area-bottom-3{
//	display: none !important;
// }
// table#chrome-viewer-container{
//	z-index: 1200 !important;
// }
// 
// div#quick-add-success{
//	position: relative !important;
//	margin-top: -1px !important;
//	padding: 9px 18px 12px !important;
//	-webkit-box-shadow:rgba(0,0,0,.3) 0 1px 2px !important;
//	-moz-box-shadow:rgba(0,0,0,.3) 0 1px 2px !important;
//	background: rgba(243, 241, 239, .8) !important;
//	border-top: 1px solid rgba(255,255,255,1) !important;
//	border-bottom: 1px solid rgb(167, 162, 160) !important;
//	color: rgb(88, 88, 88) !important;
//	text-shadow: rgb(255,255,255) 0 1px 0 !important;
//	z-index: 1000 !important;
// }
// div nobr .gbm,
// div.goog-menu{
//	z-index: 1010;
// }
// div#stream-prefs-menu-menu{
//	top: 55px !important;
// }
// 
// div#guser nobr .gbm{
//	position: absolute !important;
//	top: 20px !important;
//	width: auto !important;
//	padding: 0 !important;
//	margin: 0 !important;
// }
// div#guser nobr #gbg{
//	right: 62px !important;
// }
// div#guser nobr #gb2{
//	right: 142px !important;
// }
// 
// div#guser nobr .gbm a,
// div#guser nobr .gbm b{
//	padding:0 !important;
//	margin:0 !important;
//	color: rgb(30,30,30) !important;
//	-webkit-transition-duration:0 !important;
//	-moz-transition-duration:0 !important;
// }
// div#guser nobr .gbm,
// div.goog-menu{
//	border: 1px solid rgb(255,255,255) !important;
//	-moz-border-radius:4px !important;
//	border-radius:4px !important;
//	-webkit-box-shadow:rgba(0,0,0,.5) 0 1px 4px !important;
//	-moz-box-shadow:rgba(0,0,0,.5) 0 1px 4px !important;
//	background: rgb(255,255,255) !important;
//	z-index:1009 !important;
//	/*display: block !important;*/
// }
// div#guser nobr .gbm .gb2,
// div.goog-menu .goog-menuitem-content{
//	line-height: 24px !important;
//	margin: 0 6px !important;
// }
// div#guser nobr .gbm .gb2,
// div.goog-menu .goog-menuitem{
//	padding: 0 18px 0 20px !important;
// }
// 
// div.goog-menuitem-content span.goog-submenu-arrow{
//	margin-right: 6px !important;
//	font-size: 10px !important;
// }
// .gbm .gb2:first-child,
// div.goog-menu .goog-menuitem:first-child{
//	 -moz-border-radius-topleft: 4px;
//	 -moz-border-radius-topright: 4px;
//	border-top-left-radius:4px;
//	border-top-right-radius:4px;
// }
// .gbm .gb2:last-child,
// div.goog-menu .goog-menuitem:last-child{
//	 -moz-border-radius-bottomleft: 4px;
//	 -moz-border-radius-bottomright: 4px;
//	border-bottom-left-radius:4px;
//	border-bottom-right-radius:4px;
// }
// div#guser nobr .gbm a.gb2:hover,
// div.goog-menuitem-highlight,
// div.goog-menu .goog-menuitem:hover{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(74, 73, 72)),
//			color-stop(0.3, rgb(64, 63, 62)),
//			color-stop(0.7, rgb(54, 53, 52)),
//			color-stop(1, rgb(34, 33, 32))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(74, 73, 72),
//			rgb(64, 63, 62) 30%,
//			rgb(54, 53, 52) 70%,
//			rgb(34, 33, 32)
//	) !important;
//	color: rgb(255,255,255) !important;
// }
// 
// div#explore-promo a,
// div.small-interruption a,
// div.small-interruption span.link{
//	text-decoration: none !important;
//	color: rgb(60,60,60) !important;
// }
// div.small-interruption div{
//	line-height: 22px !important;
//	font-size: 12px !important;
// }
// div.small-interruption{
//	padding: 16px 20px !important;
// }
// div#explore-promo,
// div.small-interruption,
// div#no-entries-msg,
// div.preview-interruption{
//	border: 0 !important;
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(239, 237, 235)),
//			color-stop(0.3, rgb(244, 242, 240)),
//			color-stop(0.95, rgb(249, 247, 245)),
//			color-stop(1, rgb(255, 255, 255))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(239, 237, 235),
//			rgb(244, 242, 240) 30%,
//			rgb(249, 247, 245) 95%,
//			rgb(255, 255, 255)
//	) !important;
//	-webkit-box-shadow:rgba(0,0,0,.34) 0 1px 4px, inset 0 0px 12px rgba(255,255,255,.5);
//	-moz-box-shadow:rgba(0,0,0,.34) 0 1px 4px, inset 0 0px 12px rgba(255,255,255,.5);
//	border-top: 1px solid rgba(255,255,255,.7) !important;
//	font-size: 12px !important;
//	line-height: 1.5em !important;
//	-moz-border-radius: 0 !important;
//	border-radius: 0 !important;
// }
// div#explore-promo{
//	padding: 8px 20px 8px 20px !important;
//	color: rgb(90,100,110) !important;
//	width: 96% !important;
// }
// div.small-interruption a,
// div.small-interruption span.link,
// div#no-entries-msg span.link{
//	padding: 4px 16px !important;
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(256, 254, 252)),
//			color-stop(0.1, rgb(246, 244, 242)),
//			color-stop(0.9, rgb(233, 231, 229)),
//			color-stop(1, rgb(223, 221, 219))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(256, 254, 252),
//			rgb(246, 244, 242) 10%,
//			rgb(233, 231, 229) 90%,
//			rgb(223, 221, 219)
//	) !important; 
//	border: 1px solid rgb(203,201,199) !important;
//	-moz-border-radius:12px !important;
//	border-radius:12px !important;
//	-webkit-box-shadow:rgb(255,255,255) 0 1px 0 !important;
//	-moz-box-shadow:rgb(255,255,255) 0 1px 0 !important;
//	font-size: 12px !important; 
//	text-shadow: rgb(255,255,255) 0 1px 0 !important;
// }
// div#quick-add-input-div div.goog-button-body:hover,
// span.dismiss-link.link:hover,
// div.interruption.self-interruption div.goog-button-body:hover,
// div.fr-modal-dialog-buttons button:hover,
// div.goog-button-body span.subscribe-button:hover,
// div.entry-conversation div.goog-button-base-outer-box div div.goog-button-body:hover,
// div.small-interruption a:hover,
// div.small-interruption span.link:hover,
// div#no-entries-msg span.link:hover{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(246, 244, 242)),
//			color-stop(0.1, rgb(236, 234, 232)),
//			color-stop(0.9, rgb(223, 221, 219)),
//			color-stop(1, rgb(213, 211, 209))
//	) !important; 
//	background: -moz-linear-gradient(
//			top,
//			rgb(246, 244, 242),
//			rgb(236, 234, 232) 10%,
//			rgb(223, 221, 219) 90%,
//			rgb(213, 211, 209)
//	) !important; 
//	border: 1px solid rgb(183,181,179) !important;
// }
// div#quick-add-input-div div.goog-button-body:active,
// span.dismiss-link.link:active,
// div.interruption.self-interruption div.goog-button-body:active,
// div.fr-modal-dialog-buttons button:active,
// div.goog-button-body span.subscribe-button:active,
// div.entry-conversation div.goog-button-base-outer-box div div.goog-button-body:active,
// div.small-interruption a:active,
// div.small-interruption span.link:active,
// div#no-entries-msg span.link:active{
//	-webkit-box-shadow:rgb(255,255,255) 0 1px 0, inset rgba(0,0,0,.7) 0 2px 5px !important;
//	-moz-box-shadow:rgb(255,255,255) 0 1px 0, inset rgba(0,0,0,.7) 0 2px 5px !important;
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(206, 204, 202)),
//			color-stop(0.1, rgb(196, 194, 192)),
//			color-stop(0.9, rgb(173, 171, 169)),
//			color-stop(1, rgb(153, 151, 149))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(206, 204, 202),
//			rgb(196, 194, 192) 10%,
//			rgb(173, 171, 169) 90%,
//			rgb(153, 151, 149)
//	) !important;
//	border: 1px solid rgb(123, 121, 119) !important;
//	text-shadow: rgba(255,255,255,.5) 0 1px 0 !important;
//	color: rgb(85,85,85) !important;
// }
// div.preview-interruption div.preview-interruption-related-streams{
//	background: transparent !important;
//	border: 0 !important;
//	border-left: 1px dotted rgb(205, 203, 202) !important;
//	padding-left: 20px !important;
//	margin-left: 20px !important;
// }
// 
// div#no-entries-msg h2,
// div.preview-interruption h3.header,
// div.preview-interruption .interruption-header{
//	color: rgb(42,41,40) !important;
//	text-shadow: rgba(255,255,255,1) 0 1px 0;
// }
// div.preview-interruption div div span{
//	margin-bottom: 0.5em;
//	display: block;
// }
// div#no-entries-msg span.link,
// div.preview-interruption div.related-streams a span{
//	color:rgb(70,80,90) !important;
//	text-decoration: none !important;
// }
// div#no-entries-msg span.link:hover,
// div.preview-interruption div.related-streams a:hover span{
//	color:rgb(20,30,40) !important;
//	text-decoration: none !important;
// }
// div#no-entries-msg h2{
//	font-size: 22px !important;
//	line-height: 30px !important;
// }
// div#explore-promo-close{
//	margin-top: 8px !important;
//	margin-right: 6px !important;
// }
// table.info-bubble{
//	background: none !important;
// }
// table.info-bubble td.arrow{
//	display: none !important;
// }
// div#quick-add-bubble-holder,
// div.fr-confirm-dialog.fr-modal-dialog,
// div.friends-bubble-contents{
//	background: rgb(243, 241, 239) !important;
//	padding: 14px 20px !important;
//	-moz-border-radius:4px !important;
//	border-radius:4px !important;
//	-webkit-box-shadow:rgba(0,0,0,.5) 0 1px 4px;
//	-moz-box-shadow:rgba(0,0,0,.5) 0 1px 4px;
// }
// div.fr-confirm-dialog.fr-modal-dialog div{
//	background: transparent !important;
// }
// div.fr-confirm-dialog.fr-modal-dialog{
//	border: 0 !important;
//	font-size: 14px !important;
//	color: rgb(100,100,100) !important;
// }
// div.friends-bubble-contents a{
//	text-decoration: none !important;
// }
// div#quick-add-bubble-holder{
//	z-index:1010 !important;
//	padding: 10px !important;
//	top: 34px !important;
//	left: 4px !important;
// }
// 
// div.entry-comments{
//	background: transparent !important;
//	padding: 0 40px !important;
//	margin-bottom: 2em !important;
// }
// div.entry-conversation{
//	border-top: 1px solid rgb(230,230,230) !important;
//	border-bottom: 1px solid rgb(230,230,230) !important;
// }
// div.entry-conversation span.generic-comments-header{
//	color: rgb(171,170,170) !important;
//	font-weight: 400 !important;
//	font-size: 14px !important;
// }
// div.entry-conversation span.add-comment-link{
//	float: right !important;
//	text-decoration: none !important;
//	color: rgb(120,120,120) !important;
//	font-size: 12px !important;
// }
// div.comment-add span.add-comment-warning{
//	margin-left: 2px !important;
//	font-size: 11px !important;
// }
// div.entry-conversation div.goog-button-base-outer-box div{
//	padding: 0 !important;
//	margin: 0 !important;
// }
// div.goog-button-body span.subscribe-button{
//	margin-left:-6px !important;
// }
// div.fr-modal-dialog-buttons button{
//	outline: none !important;
//	margin: 0 2px !important;
// }
// div#quick-add-input-div div.goog-button-body,
// span.dismiss-link.link,
// div.interruption.self-interruption div.goog-button-body,
// div.fr-modal-dialog-buttons button,
// div.goog-button-body span.subscribe-button,
// div.entry-conversation div.goog-button-base-outer-box div div.goog-button-body{
//	color: rgb(100,100,100) !important;
//	padding: 1px 12px !important;
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(256, 254, 252)),
//			color-stop(0.1, rgb(246, 244, 242)),
//			color-stop(0.9, rgb(233, 231, 229)),
//			color-stop(1, rgb(223, 221, 219))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(256, 254, 252),
//			rgb(246, 244, 242) 10%,
//			rgb(233, 231, 229) 90%,
//			rgb(223, 221, 219)
//	) !important;
//	border: 1px solid rgb(203,201,199) !important;
//	-moz-border-radius:12px !important;
//	border-radius:12px !important;
//	-webkit-box-shadow:rgb(255,255,255) 0 1px 0 !important;
//	-moz-box-shadow:rgb(255,255,255) 0 1px 0 !important;
//	font-size: 12px !important; 
//	text-shadow: rgb(255,255,255) 0 1px 0 !important;
//	text-decoration: none !important;
// }
// span.item-link-menuitem img.item-link-menuitem-image{
//	position: relative !important;
//	top: -2px !important;
//	left: -4px !important;
// }
// div#quick-add-input-div div.goog-button-body{
//	margin-top: 4px !important;
//	margin-left: -4px !important;
// }
// /* @end */
// 
// /* @group Buttons */
// div.goog-button-base-outer-box{
//	border: 0 !important;
// }
// div.goog-button-base-outer-box div{
//	background: transparent !important;
//	border: 0 !important;
// }
// .goog-menu-button:active .goog-button-base-outer-box,
// .goog-menu-button:active .goog-button-base-inner-box,
// .goog-combobox-active .goog-button-base-outer-box,
// .goog-combobox-active .goog-button-base-inner-box,
// .goog-menu-button.goog-button-base-open .goog-button-base-outer-box,
// .goog-menu-button.goog-button-base-open .goog-button-base-inner-box{
//	background: transparent !important;
// }
// .goog-menu-button:active .goog-button-base-content,
// .goog-comboxbox-active .goog-button-base-content,
// .goog-menu-button.goog-button-base-open .goog-button-base-content{
//	color: rgb(0,0,0) !important;
// }
// /* @end */
// 
// /* @group Search */
// div#search{
//	position: relative !important;
//	left: 0 !important;
//	top: 27px !important;
//	height: 22px !important;
//	padding: 8px 10px;
//	border-top: 1px solid rgb(200,200,200);
//	border-bottom: 1px solid rgb(140,140,140);
//	background: -webkit-gradient(
//			linear,
//			left bottom,
//			left top,
//			color-stop(0.05, rgb(216, 214, 212)),
//			color-stop(0.2, rgb(226, 224, 222)),
//			color-stop(0.4, rgb(236,234,232)),
//			color-stop(0.7, rgb(246,244,242)),
//			color-stop(0.99, rgb(256, 254, 252)),
//			color-stop(1, rgb(255,255,255))
//	);
//	background: -moz-linear-gradient(
//			bottom,			
//			rgb(216, 214, 212) 5%,
//			rgb(226, 224, 222) 20%,
//			rgb(236,234,232) 40%,
//			rgb(246,244,242) 70%,
//			rgb(256, 254, 252) 99%,
//			rgb(255,255,255)
//	);
//	width: 240px;
//	xxxxdisplay: none !important;
// }
// div#search input#search-input{
//	width: 222px !important;
//	-moz-border-radius:16px;
//	border-radius:16px;
//	padding:3px 8px !important;
//	border: 1px solid rgba(50,50,50,.5);
//	-webkit-box-shadow:rgba(255,255,255,.4) 0 1px 0;
//	-moz-box-shadow:rgba(255,255,255,.4) 0 1px 0;
//	outline: none;
// }
// body.lhn-hidden div#search{
//	display: none !important;
// }
// body.lhn-menu div#search{	
//	top: 32px !important;
//	left: 12px !important;
//	z-index: 1004 !important;
//	display: block !important;
// }
// .search-stream span#chrome-view-links{
// 
// }
// span#view-search-container{
//	
// }
// span#viewer-single-parent{
//	float: left !important;
//	margin-top: -1px !important;
//	color: rgb(80,80,80) !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
// }
// span#viewer-single-parent b{
//	font-weight: 500 !important;
//	color: rgb(50,50,50) !important;
//	font-style: italic !important;
// }
// b.highlighted0{
//	background: rgb(255, 220, 0) !important;
//	color: rgb(50,50,50) !important;
//	font-weight: 400 !important;
//	padding: 0 4px;
//	-moz-border-radius:3px;
//	border-radius:3px;
//	-webkit-box-shadow: rgba(0,0,0,.5) 0 1px 2px;
//	-moz-box-shadow: rgba(0,0,0,.5) 0 1px 2px;
// }
// div#entries.search div.search-result a,
// div#entries.search div.search-result h2.entry-title a{
//	text-decoration: none !important;
// }
// div#entries.search div.entry-0 div.search-result h2.entry-title a,
// div#entries.search div#current-entry div.search-result h2.entry-title a{
//	margin-top: -2px !important;
// }
// div.results div.result a.result-title{
//	margin-bottom: 8px !important;
//	color: rgb(104,102,100) !important;
//	line-height: 28px !important;
//	font-size: 16px !important;
//	text-decoration: none;
//	font-weight: 500;
// }
// div#entries.search div.search-result h2.entry-title a{
//	margin-bottom: 8px !important;
//	color: rgb(104,102,100) !important;
//	display: block !important;
//	clear: both !important;
//	margin-top: -9px !important;
//	line-height: 18px !important;
//	font-size: 16px !important;
// }
// div#entries.search div.entry-attribution{
//	margin-top: 1em !important;
//	margin-bottom: 1em !important;
//	font-size: 12px !important;
// }
// div.search-result{
//	border-bottom: 1px solid rgb(240, 238, 236) !important;		
// }
// div.search .entry{
//	width: 92% !important;
//	margin: 0 auto !important;	
// }
// div#chrome.search-stream.item-stream div#chrome-header{
//	height: 14px;
// }
// span#viewer-single-item-parent{
//	display: block !important;
//	z-index: 1009 !important;
//	position: relative !important;
//	top: -2px !important;
//	left: 5px !important;
// }
// span#viewer-single-item-parent span{
//	text-decoration: none;
//	color: rgb(80,80,80) !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
// }
// div.result-snippet{
//	margin: 2px 0 8px !important;
// }
// div.feed-result-stats{
//	color: rgb(120,120,120) !important;
//	font-size: 11px;
// }
// div.feed-result-stats span.number{
//	color: rgb(80,80,80) !important;
//	font-size: 18px !important; 
//	font-weight: 500 !important;
// }
// span#chrome-view-links span#view-search{
//	display: none !important;
// }
// /* @end */
// 
// /* @group Nav */
// div#guser{
//	display: block !important;
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(94, 93, 92)),
//			color-stop(0.1, rgb(84, 83, 82)),
//			color-stop(0.5, rgb(54, 53, 52)),
//			color-stop(1, rgb(34, 33, 32))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(94, 93, 92),
//			rgb(84, 83, 82) 10%,
//			rgb(54, 53, 52) 50%,
//			rgb(34, 33, 32)
//	) !important;
//	height: 26px !important;
//	z-index: 1001 !important;
//	clear: both !important;
//	position: relative !important;
//	padding-bottom: 0 !important;
// }
// div#guser nobr{
//	opacity: 0;
//	-webkit-transition-duration:500ms;
//	-moz-transition-duration:500ms;
//	position: relative;
//	font-size: 12px;
//	top: 2px;
//	color:rgba(255,255,255,0) !important;
// }
// div#guser nobr b{
//	color: rgb(240, 238, 236) !important;
//	font-weight: 400 !important;
//	font-size: 12px !important; 
// }
// div#guser:hover nobr{
//	opacity: 1;
// }
// div#guser nobr a{
//	margin: 0 2px !important;
// }
// div#nav > div:nth-child(2){
//	position: fixed !important;
//	z-index: 1001;
//	top: 2px !important;
//	left: 4px !important;
//	border-top: 0 !important;
// }
// div#nav > div:nth-child(2) div{
//	float: left !important;
// }
// div#nav > div:nth-child(2) div a{
//	background: transparent !important;
// }
// div#nav > div:nth-child(2) div:nth-child(5) div:nth-child(2) a{
//	padding: 0px 0px 2px 24px !important;
// }
// 
// div#nav > div:nth-child(2) div.selector{
//	padding: 2px 4px !important;
//	margin: 0 !important;
// }
// 
// div#lhn-selectors{
//	background: transparent !important;
// }
// 
// div#nav > div:nth-child(2) a.link span{
//	color: rgb(158, 156, 154) !important;
//	text-shadow: rgb(16, 16, 16) 0 -1px 0;
//	font-weight: 400 !important;
//	-webkit-transition-duration:300ms;
//	-moz-transition-duration:300ms;
//	padding-left: 0 !important;
// }
// 
// div#nav > div:nth-child(2) div.selected{
//	background: transparent !important;
// }
// div#nav > div:nth-child(2) li.tree-selected span,
// div#nav > div:nth-child(2) div.selected a.link span{
//	color: rgb(255, 255, 255) !important; 
// }
// div#nav > div:nth-child(2){
//	z-index: 1004 !important;
// }
// div#nav > div:nth-child(2) ul#your-items-tree{
//	width: 300px !important;
// }
// 
// 
// div#nav > div:nth-child(2) ul#your-items-tree > li ul{
//	display: block !important;
//	float: left !important;
//	width: 400px !important;
// }
// div#nav > div:nth-child(2) ul#your-items-tree > li ul li{
//	float: left;
//	background: transparent !important;
// }
// div#nav > div:nth-child(2) ul#your-items-tree > li ul li a{
//	padding: 2px 8px !important;
// }
// div#nav > div:nth-child(2) ul#your-items-tree > li ul li a span.icon{
//	top: 4px !important;
//	left: 7px !important;
// }
// div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-1-main,
// div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-2-main,
// #lhn-selectors .selector{
//	opacity: .5 !important;
//	-webkit-transition-duration:400ms;
//	-moz-transition-duration:400ms;
// }
// 
// div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-1-main.tree-selected,
// div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-2-main.tree-selected,
// div#nav > div:nth-child(2) div.selected,
// #lhn-selectors .selector.selected{
//	background: rgba(0,0,0,.2) !important;
//	-moz-border-radius:4px;
//	border-radius:4px;
//	-webkit-box-shadow: inset rgba(0,0,0,.5) 0 1px 3px;
//	-moz-box-shadow: inset rgba(0,0,0,.5) 0 1px 3px;
//	opacity: 1 !important;
// }
// div#nav > div:nth-child(2) ul#your-items-tree > li ul li:hover,
// #lhn-selectors .selector:hover{
//	background: transparent !important;
//	opacity: 1 !important;
// }
// 
// div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-1-main:hover,
// div#nav > div:nth-child(2) ul#your-items-tree li#your-items-tree-item-2-main:hover{
//	opacity: 1 !important;
// }
// 
// 
// div#nav > div:nth-child(2) ul#your-items-tree > li ul li:hover span.name-text,
// #lhn-selectors .selector:hover span.text{
//	color: rgb(255,255,255) !important;
// }
// #mark-all-as-read-options{
//	margin-top: -2px !important;
//	width: 8px !important;
//	margin-right: 3px !important;
// }
// body div#nav > div:nth-child(2){
//	margin-left: 6px !important;
// }
// /* @group Full Column View */
// 
// body.lhn-hidden div#chrome-header{
//	z-index: 1001 !important;
//	margin-top: 1px !important;
//	margin-bottom: -14px !important;
//	width: 80px;
// }
// 
// body.lhn-hidden div#chrome-header span#chrome-view-links{
//	left: -14px !important;
//	top: 6px !important;
//	margin-bottom: -5px !important;
// }
// body.lhn-hidden.lhn-menu div#nav{
//	z-index:1003 !important;
//	top: -21px !important;
//	border: 1px solid rgba(255,255,255,0) !important;
//	-webkit-box-shadow:rgba(0,0,0,.6) 0 1px 5px;
//	-moz-box-shadow:rgba(0,0,0,.6) 0 1px 5px;
//	-moz-border-radius:4px;
//	border-radius:4px;
// }
// body.lhn-hidden div#nav > div:nth-child(2){
//	margin-left: 88px !important; 
// }
// body.lhn-hidden div#viewer-header{
//	margin-top: -11px !important;
//	z-index: 1004 !important;
// }
// body.lhn-hidden div#viewer-header div#viewer-top-controls{
//	margin-left: 100px !important;
//	margin-top: 0px !important;
// }
// 
// 
// div#chrome-lhn-menu div.goog-button-body{
//	position: fixed;
//	top: 5px !important;
//	color: rgb(255,255,255);
// }
// /* @end */
// 
// 
// /* @end */
// 
// /* @group Sidebar */
// div#nav{
//	position: absolute !important;
//	top: 0px !important;
// }
// div#nav > div:nth-child(5){
//	border-top: 0 !important;
// }
// div#nav > div:nth-child(5) div.lhn-section-primary{
//	display: block !important;
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(256, 254, 252)),
//			color-stop(0.1, rgb(246, 244, 242)),
//			color-stop(0.9, rgb(233, 231, 229)),
//			color-stop(1, rgb(223, 221, 219))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(256, 254, 252),
//			rgb(246, 244, 242) 10%,
//			rgb(233, 231, 229) 90%,
//			rgb(223, 221, 219)
//	) !important;
//	height: 25px !important;
//	margin-left: 0 !important;
//	text-indent: 10px !important;
//	font-size: 12px;
//	line-height: 26px !important;
//	color: rgb(100,100,100) !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
//	border-top: 1px solid rgb(255,255,255);
//	padding-top: 1px !important;
// }
// div.lhn-section-primary span{
//	font-weight: 500 !important;
// }
// div#nav ul#sub-tree{
//	top: 40px !important;
//	margin-bottom: 40px !important;
//	background: rgb(250,248,245) !important;
// }
// div#nav > div:nth-child(5) li{
//	background: transparent !important;
//	line-height: 28px !important;
// }
// 
// div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded a.link{
//	margin-left: 0 !important;
//	padding-left: 22px !important;
// }
// 
// div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded span.favicon,
// div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded span.sub-icon,
// div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded a.link .favicon{
//	top: 6px !important;
//	background-color: transparent !important;
// }
// span.sub-name span.name-text,
// div#nav > div:nth-child(5) ul#sub-tree li.folder ul li.expanded span.name-text-d-2{
//	padding-left: 4px !important;
//	font-weight: 400 !important;
//	font-size: 12px;
//	color: rgb(90,95,100) !important;
// }
// div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a{
//	border-top: 1px solid rgb(255, 255, 255) !important;	
//	border-bottom: 1px solid rgb(240, 238, 236) !important;
// }
// div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a:hover{
//	background: rgb(255,255,255) !important;
//	border-top: 1px solid rgb(255, 255, 255) !important;	
// }
// div#nav > div:nth-child(5) ul#sub-tree li.folder > a{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(256, 254, 252)),
//			color-stop(0.1, rgb(246, 244, 242)),
//			color-stop(1, rgb(233, 231, 229))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(256, 254, 252),
//			rgb(246, 244, 242) 10%,
//			rgb(233, 231, 229)
//	) !important; 
//	border-bottom: 1px solid rgb(181, 180, 178) !important;
//	padding-left: 22px !important;
// }
// div#nav > div:nth-child(5) ul#sub-tree li.folder > a span{
//	padding-left: 1px !important;
// }
// div#nav > div:nth-child(5) ul#sub-tree > li.expanded > ul > li.expanded{
//	border-bottom: 1px solid rgb(190, 188, 187) !important;
// }
// .scroll-tree li.tag.tree-selected a:hover,
// .scroll-tree li.tag a.tree-link-selected,
// div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a.tree-link-selected{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(103, 102, 101)),
//			color-stop(0.1, rgb(113, 112, 111)),
//			color-stop(0.6, rgb(135, 133, 132)),
//			color-stop(1, rgb(152, 150, 149))
//	) !important;
//	border-bottom: 1px solid rgb(133, 131, 130) !important; 
//	border-top: 1px solid rgb(95, 94, 93) !important;
//	-webkit-box-shadow: inset 0 1px 20px rgba(0,0,0,.25);
// } 
// div#nav li.tag.tree-selected span:nth-child(1),
// div#nav > div:nth-child(5) ul#sub-tree li.folder > ul li.sub > a.tree-link-selected span{
//	color: rgb(255,255,255) !important;
//	text-shadow: rgb(95,94,93) 0 1px 2px;
//	font-weight: 500 !important;
// }
// div li.sub span.sub-unread-count,
// div span.unread-count-d-1,
// div span.unread-count-d-2{
//	font-weight: 400 !important;
//	float: right;
//	margin-right: 10px;
// }
// div span.unread-count-d-2{
//	font-size: 12px !important;
// }
// 
// div span.unread-count-d-1,
// span.folder-name-text.name-text-d-1{
//	color: rgb(71, 70, 69)!important;
//	font-weight: 500 !important;
//	font-size: 13px !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
// }
// div.folder-toggle{
//	position: relative;
//	top: 4px !important;
// }
// div.tree-item-action-container{
//	background: transparent !important;
//	top: 4px !important;
//	right: 4px !important;
// }
// .lhn-section-footer{
//	height: 28px !important;
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(256, 254, 252)),
//			color-stop(0.1, rgb(246, 244, 242)),
//			color-stop(0.9, rgb(233, 231, 229)),
//			color-stop(1, rgb(223, 221, 219))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(256, 254, 252),
//			rgb(246, 244, 242) 10%,
//			rgb(233, 231, 229) 90%,
//			rgb(223, 221, 219)
//	) !important;
//	border-top: 1px solid rgb(203, 201, 199);
// }
// .lhn-section-footer a{
//	position: relative !important;
//	top: 4px !important;
// }
// div#nav > div:nth-child(5) ul#sub-tree li.folder > a.tree-link-selected{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(246, 244, 242)),
//			color-stop(0.1, rgb(236, 234, 232)),
//			color-stop(0.9, rgb(223, 221, 219)),
//			color-stop(1, rgb(213, 211, 209))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(246, 244, 242),
//			rgb(236, 234, 232) 10%,
//			rgb(223, 221, 219) 90%,
//			rgb(213, 211, 209)
//	) !important;
// }
// div#nav > div:nth-child(5) ul#sub-tree li.tree-selected li.sub a.link{
//	background: rgba(102,101,100,.1) !important;
//	border-top: 1px solid rgba(0,0,0,.05) !important;
// }
// a.link.tree-link-selected span.name-text-d-1{
//	color: rgb(0,0,0) !important;
// }
// div#nav li.tag{
//	margin-left: -18px !important;
//	padding-left: 2px !important;
// }
// div#nav li.tag span:nth-child(1){
//	padding-left: 0px !important;
//	font-size: 11px !important;
//	text-transform: uppercase !important;
//	font-weight: 500 !important;
//	text-shadow: rgba(255,255,255,.9) 0 1px 1px;
//	color: rgb(90,90,90) !important;
// }
// .scroll-tree li.tag a:hover{
//	background: rgb(255,255,250) !important;
// }
// div#lhn-friends{
//	z-index: 2000 !important;
//	border: none !important;
//	height: 24px !important;
//	margin-bottom: 24px !important;
//	position: relative;
//	display: none !important;
// }
// div#lhn-friends .folder{
//	background: transparent !important;
//	border: none !important;
// }
// div#lhn-friends .folder a{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(256, 254, 252)),
//			color-stop(0.1, rgb(246, 244, 242)),
//			color-stop(1, rgb(233, 231, 229))
//	) !important;
//	border-bottom: 1px solid rgb(181, 180, 178) !important;
//	padding-left: 22px !important;
//	line-height: 28px;
// }
// /* @end */
// 
// 
// /* @group Home & Main */
// div#main{
//	top: 30px !important;
// }
// div#lhn-add-subscription-section{
//	position: absolute;
//	top: -23px;
//	z-index: 1001;
// }
// div#lhn-add-subscription-section > div{
//	margin: 0;
// }
// div#viewer-container{
//	position: relative !important;
//	top:10px !important;
//	z-index: 1;
// }
// div#viewer-page-container{
//	background: transparent !important;
//	margin-bottom: 1em !important;
// }
// div#home .overview-item-link,
// div#home div#overview .item-title .link{
//	text-decoration: none !important;
//	color: rgb(100,100,100) !important;
// }
// 
// div#home div.overview-header span a{
//	display: block;
//	padding: 3px 6px;
//	color: rgb(86, 86, 85) !important;
//	font-weight: 600 !important;
//	border-top: 1px dotted rgb(196, 193, 191) !important; 
//	border-bottom: 1px dotted rgb(196, 193, 191) !important;
//	font-size: 16px !important;
//	line-height: 30px !important;
//	margin: 20px 0 10px !important;
//	-webkit-transition-duration:500ms;
//	-moz-transition-duration:500ms;
//	text-shadow: rgb(255,255,255) 0 1px 0;
//	font-weight:500 !important;
// }
// div#home div.overview-header span a:hover{
//	background: rgba(240, 238, 236, .5);
// }
// div#home div.overview-header span.unread span{
//	color: rgba(0,0,0,0) !important;
//	float: right;
//	font-size: 1px !important;
// }
// div#home div.overview-header span.unread span b{
//	color: rgb(106, 106, 105) !important;
//	font-weight: normal;
//	font-size: 14px;
//	top: -2px;
//	right: 3px;
//	position: relative;
// }
// div#home div#overview span.item-title{
//	display: block !important;
// }
// div.overview-metadata{
//	padding: 0 6px !important;
//	margin-bottom: 1.2em !important;
// }
// div#home div#overview div.label{
//	margin-right: 6px !important;
//	margin-top: 1em !important;
//	font-size: 14px !important;
//	color: rgb(150,150,150) !important;
//	font-style: italic !important;
// }
// div.overview-section-header,
// td#right-section,
// div#recent-activity{
//	display: none;
// }
// div#home div#overview{
//	padding: 0 2% !important;
// }
// #overview .overview-segment img{
//	max-width:40% !important;
//	height: auto !important;
//	margin: 0.5em;
//	clear: right !important;
// }
// /* @end */
// 
// /* @group Entries */
// div#home,
// div.card div.entry-container{
//	width: 95% !important;
//	margin: 0 auto !important;
// }
// body.lhn-hidden div#home,
// body.lhn-hidden div.card div.entry-container{
//	width: 90% !important;
//	margin: 0 auto !important;
// }
// div#entries{
//	top: -10px !important;
// }
// div#viewer-top-controls{
//	height: 16px !important;
//	min-width: 400px !important;
// }
// div#chrome{
//	border-left: 1px solid rgb(146, 147, 147) !important;
//	background: rgb(250, 249, 248) !important;
// }
// div.card-actions,
// div#viewer-top-controls,
// div#viewer-container,
// div.entry,
// table#chrome-viewer-container tr td,
// span#chrome-view-links,
// div#viewer-header,
// div#chrome-header{
//	background: transparent !important;
//	border: 0 !important;
// }
// div#viewer-header{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(256, 254, 252)),
//			color-stop(0.1, rgb(246, 244, 242)),
//			color-stop(0.9, rgb(233, 231, 229)),
//			color-stop(1, rgb(223, 221, 219))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(256, 254, 252),
//			rgb(246, 244, 242) 10%,
//			rgb(233, 231, 229) 90%,
//			rgb(223, 221, 219)
//	) !important;
//	height: 26px;
//	margin-top: -2px !important;
//	border-top: 1px solid rgb(255,255,255) !important;
//	border-bottom: 1px solid rgb(181, 180, 178) !important;
//	margin-left:-8px !important;
//	z-index: 1001 !important;
// }
// div.card{
//	border: 0 !important;
//	background: transparent !important;
// }
// #current-entry .card .card-content,
// .card .card-content{
//	padding: 1em 0 0 !important;
// }
// div.entry div.entry-main{
//	margin-left: 24px !important;
// }
// div.entry-main p iframe{
//	display: none;
// }
// a.entry-title-link{
//	background: transparent !important;
// }
// div.card{
//	-webkit-box-shadow:none !important;
//	-moz-box-shadow:none !important;
//	margin-top: 1em !important;
// }
// div#viewer-top-controls div#mark-all-as-read{
//	margin-left: 12px !important;
// }
// div#viewer-top-controls div#stream-prefs-menu,
// div#viewer-top-controls div#viewer-refresh,
// div#viewer-top-controls div#mark-all-as-read{
//	z-index: 1000;
//	position: relative !important;
//	top: -2px !important;
// }
// div#viewer-top-controls div#stream-prefs-menu div,
// div#viewer-top-controls div#viewer-refresh div,
// div#viewer-top-controls div#mark-all-as-read div{
//	margin: 0 1px !important;
//	padding: 0 !important;
// }
// div#viewer-top-controls div#stream-prefs-menu{
//	margin-left: 8px !important;
// }
// div#viewer-top-controls div#stream-prefs-menu div{
//	display: none;
// }
// div#chrome-header span#chrome-title a{
//	color: rgb(130,130,130);
//	text-shadow: rgb(255,255,255) 0 1px 0;
// }
// .entry .entry-body div.item-body{
//	margin-top: 0.8em !important;
// }
// .entry .entry-body div.item-body h3{
//	clear: both;
//	margin-top: 1em !important;
// }
// .entry .entry-body div.item-body ol,
// .entry .entry-body div.item-body ul{
//	display: block !important;
//	padding-left: 0 !important;
//	margin-left: 2em !important;
//	clear: left;
// }
// .entry .entry-body div.item-body ol li,
// .entry .entry-body div.item-body ul li{
//	margin-bottom: 0.8em !important;
// }
// .entry .entry-body div.item-body dt{
//	color: rgb(0,0,0) !important;
// }
// div.entry-author,
// .collapsed div.entry-date,
// div.entry-container div.entry-date{
//	color: rgb(150,150,150) !important;
// }
// div.entry-container div.entry-date{
//	xxxxfloat: left !important;
//	margin-top: 5px !important;
// }
// .collapsed div.entry-date{
//	margin-top: 2px !important;
//	margin-right: 8px !important;
// }
// div.single-source .collapsed div.entry-date{
//	margin-top: 10px !important;
// }
// h2.entry-title{
//	clear: left;
//	display: block;
// }
// div.card-content h2.entry-title{
//	-webkit-transition-duration:400ms !important;
//	-moz-transition-duration:400ms !important;
//	opacity: .6 !important;
//	top: 24px !important;
//	position: relative;
//	margin-bottom: 36px !important;
// }
// div.single-source.cards div.card-content h2.entry-title{
//	top: -3px !important;
//	margin-bottom: 0 !important;
// }
// div#entries.single-source.cards div#current-entry div.card-content h2.entry-title{
//	top: -10px !important;
//	margin-bottom: -7px !important;
// }
// h2.entry-title a{
//	color: rgb(46, 46, 45) !important;
//	font-size: 24px;
//	line-height: 28px;
//	font-weight: 500 !important;
// }
// div#current-entry h2.entry-title{
//	opacity: 1 !important;
// }
// .entry .item-body,
// .entry .entry-body,
// .entry .entry-title,
// .entey .entry-likers{
//	max-width: 96% !important;
// }
// div.entry-main{
//	overflow: hidden !important;
// }
// div.entry-author{
//	position: absolute !important;
//	top: 4px !important;
//	font-size: 12px !important;
//	clear: left !important;
//	display: block !important;
// }
// .state-stream div.entry-author div.entry-via{
//	display: none !important;
// }
// div.single-source.cards div.entry-author{
//	display: none !important;
// }
// span.entry-author-parent{
//	display: none !important;
//	font-style: italic !important;
// }
// div.card-actions{
//	-moz-border-radius:0 !important;
//	border-radius:0 !important;
//	border-bottom: 1px dotted rgb(196, 193, 191) !important;
//	padding-bottom: 3.2em !important;
//	padding-left: 22px !important;
// }
// div.entry-actions{
//	margin-left:2.1% !important;
// }
// div.entry-actions span{
//	color: rgb(124, 122, 121) !important;
//	opacity: 0;
// }
// div#current-entry.expanded div.entry-actions span,
// div.entry:hover div.card-actions span,
// div#current-entry div.card-actions span{
//	opacity: 1;
// }
// div.entry-body span.link.popout{
//	display: none;
// }
// span#chrome-view-links{
//	float: right !important;
//	position: relative !important;
//	top: 8px !important;
//	z-index: 1002 !important;
//	font-size: 9px !important;
//	letter-spacing: -1px;
//	color: rgba(255,255,255,0);
//	width: 52px;
//	height: 21px;
//	right: -16px !important;
// }
// span#chrome-view-links span.link{
//	font-size: 12px !important;
//	letter-spacing: 0px !important;
// }
// div#chrome-header{
//	margin-bottom: -22px !important;
//	margin-top: 0px !important;
// }
// div#chrome-header span#chrome-title{
//	display: none !important;
// }
// div#viewer-all-new-links{
//	text-indent: -10px !important;
//	color: rgba(255,255,255,0);
//	z-index: 1000;
//	position: relative !important;
//	font-size: 9px !important;
//	letter-spacing: -2px;
//	top: -3px !important;
// }
// div#viewer-all-new-links span.link{
//	font-size: 12px !important;
//	font-weight: normal !important;
//	padding: 2px 8px !important;
//	-moz-border-radius: 12px;
//	border-radius: 12px;
//	color: rgb(136, 134, 133) !important;
//	letter-spacing: 0px !important;
// }
// div#viewer-all-new-links span.link-selected{
//	background: rgb(136, 134, 133) !important;
//	color: rgb(251, 248, 246) !important;
//	text-shadow: rgba(0,0,0,.7) 0 1px 0;
//	-webkit-box-shadow: rgba(255,255,255,.7) 0 2px 0, inset 0 1px 4px rgba(0,0,0,.5);
//	-moz-box-shadow: rgba(255,255,255,.7) 0 2px 0, inset 0 1px 4px rgba(0,0,0,.5);
// }
// div.entry-0{
//	padding-top: 0 !important;
// }
// .entry .item-body,
// .entry .entry-body{
//	padding-top: 0 !important;
//	color: rgb(70,70,69) !important;
// }
// .entry .item-body p,
// .entry .entry-body p{
//	margin-bottom: 2em !important;
// }
// .entry .item-body p em,
// .entry .entry-body p em{
//	color: rgb(70,70,75) !important;
// }
// .entry .entry-body p strong{
//	color: rgb(70,70,70) !important;
//	font-weight: 500;
// }
// .entry .entry-body code pre{
//	padding: 16px 24px;
//	background: rgb(245, 243, 243) !important;
//	-moz-border-radius: 4px !important;
//	border-radius: 4px !important;
//	-webkit-box-shadow: rgb(255,255,255) 0 1px 0 !important;
//	-moz-box-shadow: rgb(255,255,255) 0 1px 0 !important;
//	color: rgb(50,50,50) !important;
//	text-shadow: rgb(255,255,255) 0 0 3px;
//	line-height: 22px !important;
// }
// .entry .entry-body p img{
//	margin: 1em 4px !important;
//	clear:both !important;
//	display: block !important;
//	max-width: 100% !important;
//	height: auto !important;
// }
// .entry .entry-body hr{
//	height: 0 !important;
//	border: none;
//	border-top: 1px solid rgb(170,170,175);
//	border-bottom: 1px solid rgb(255,255,255);	
// }
// div.entry blockquote{
//	border-left: 1px dotted rgba(136, 134, 133,.4);
//	margin-left: 4px !important;
//	padding-left: 36px !important;
//	color: rgb(70,70,75) !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
// }
// div.entry ul li,
// div.entry ol li{
//	margin-bottom: 0.7em !important;
// }
// div.entry-body div dl dd{
//	margin-left: 1.2em !important;
//	margin-bottom: 0.5em !important;
// }
// /* @end */
// 
// /* @group Collapsed Entries (List view)*/
// div.collapsed,
// div.collapsed .entry-date,
// div.collapsed .entry-secondary{
//	/*-webkit-transition-duration:400ms;*/
// }
// div.collapsed{
//	height: 72px !important;
//	background: transparent !important;
//	border-left: 0 !important;
//	border-right: 0 !important;
//	border-top: 1px solid rgb(255, 255, 255) !important;	
//	border-bottom: 1px solid rgb(240, 238, 236) !important;
//	padding: 6px 0 !important;
//	/*-webkit-transition-duration:300ms;*/
//	width: 92% !important;
//	margin-left: 4% !important;
// }
// div#current-entry div.collapsed{
//	height: 14px !important;
// }
// div.samedir div#current-entry.expanded div.collapsed,
// div.single-source div#current-entry.expanded div.collapsed{
//	border-bottom: 0 !important;	
// }
// div.samedir div#entries.list div#current-entry div.collapsed{
//	height: 72px !important;
// }
// 
// div.single-source div#current-entry.expanded div.collapsed{
//	margin-bottom: -36px !important;
// }
// div.single-source div#current-entry.expanded div.collapsed h2.entry-title{
//	height: 21px !important;
//	overflow: hidden !important;
//	opacity: 0 !important;
// }
// div.samedir div#current-entry.expanded div.collapsed .entry-secondary,
// div.single-source div#current-entry.expanded div.collapsed .entry-date,
// div.single-source div#current-entry.expanded div.collapsed .entry-secondary{
//	opacity: 0 !important;
// }
// div.single-source div#current-entry.expanded div.collapsed div.entry-icons{
//	margin-top: 10px !important;
// }
// .samedir #entries.list .collapsed .entry-secondary{
//	width: 88% !important;
//	margin: 0 48px 0 24px !important;
//	height: 66px !important;
//	display: block !important;
//	padding-top: 5px !important;
// }
// 
// div.collapsed span.entry-source-title{
//	display: block !important;
//	clear: both !important;
//	position: relative !important;
//	left: 0 !important;
//	top: 0px !important;
//	font-size: 13px !important;
//	height: 24px !important;
//	width: auto !important;
//	text-indent: 1px !important;
// }
// div.collapsed h2.entry-title{
//	display: block !important;
//	clear: both !important;
//	margin-top: 22px !important;
//	line-height: 18px !important;
//	font-size: 16px !important;
//	margin-bottom: 6px !important;
// }
// div.collapsed h2.entry-title{
//	font-weight: 400 !important;
//	color: rgb(44,42,40) !important;
// }
// div.read div.collapsed h2.entry-title{
//	color: rgb(144,142,140) !important;
// }
// div.single-source div.collapsed div.entry-icons div.item-star-active,
// div.single-source div.collapsed div.entry-icons div.item-star{
//	position: relative !important;
//	top: 6px !important;
// }
// div.single-source div.collapsed h2.entry-title{
//	display: block !important;
//	clear: both !important;
//	margin-top: 5px !important;
//	line-height: 18px !important;
//	font-size: 16px !important;
//	margin-bottom: 6px !important;
// }
// div.result-snippet,
// div#entries.search div.search-result,
// div.collapsed span.snippet{
//	font-size: 12px !important;
//	line-height: 18px !important;
//	color: rgb(148,150,152) !important;
// }
// div#entries.list div#current-entry div.entry-actions,
// div#entries.single-source.list div#current-entry div.entry-actions{
//	border: 0 !important;
//	background: transparent !important;
//	padding-bottom: 24px !important;
//	border-bottom: 1px solid rgb(240, 238, 236) !important;
//	padding-left: 24px !important;
//	margin-left: 4% !important;
// }
// div.collapsed div.entry-icons{
//	top: 7px !important;
// }
// div#current-entry.expanded div.entry-actions{
//	height: 24px !important;
// }
// div#entries.list div.entry-container,
// div#entries.list div.entry-container div.entry-actions{
//	background: transparent !important;
//	width: 92% !important;
//	margin-left: 4% !important;
// }
// div.samedir span.entry-source-title{
//	padding-top: 2px !important;
// }
// div.samedir div#current-entry div.collapsed{
//	height: 28px !important;
//		border-top: none !important;
// }
// div.samedir div#entries.list div#current-entry.expanded div.collapsed{
//	height: 11px !important;
//	margin-top: 18px !important;
// }
// div.single-source div#current-entry.expanded{
//	margin-top: 4px !important;
// }
// div.single-source div#current-entry div.collapsed{
//	height: 28px !important;
//	margin-top: -4px !important;
// }
// div.samedir div#entries.list.single-source div#current-entry.expanded div.collapsed{
//	height: 25px !important;
//	margin-top: 0px !important;
// }
// div.single-source.list div#current-entry div.entry-icons{
//	top: 6px !important;
// }
// div.single-source.list div#current-entry h2.entry-title{
//	margin-top: 10px !important;
// }
// div.single-source div#current-entry h2.entry-title{
//	margin-top: 7px !important;
// }
// /* @end */
// 
// /* @group Share */
// div.interruption.self-interruption{
//	padding: 16px!important;
//	background: rgb(242, 242, 243) !important;
//	border-top: 1px solid rgb(255, 255, 255) !important;
//	border-bottom: 1px solid rgb(201, 200, 198) !important;
//	-webkit-box-shadow:rgba(0,0,0,.2) 0 0 4px !important;
//	-moz-box-shadow:rgba(0,0,0,.2) 0 0 4px !important;
//	margin-bottom: 1em !important;
// }
// div.interruption.self-interruption a,
// div.interruption.self-interruption .link{
//	text-decoration: none !important;
// }
// div.interruption.self-interruption div.goog-button-body{
//	margin-right: -16px !important;
// }
// div.interruption.self-interruption div.tag-container{
//	margin-bottom: 1em !important;
// }
// div.interruption.self-interruption div.self-interruption-info,
// div.interruption.self-interruption div.self-interruption-header{
//	margin-bottom: 0.5em !important;
// }
// span.self-interruption-name{
//	font-weight: 500 !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
//	color: rgb(80,80,80);
// }
// span.self-interruption-favicons{
//	float: right;
//	margin-right: -16px;
// }
// span.self-interruption-favicons a{
//	margin-left: 6px !important;
// }
// td.self-interuption-description{
//	padding-left: 50px;
// }
// div.entry-annotation-body{
//	display: block;
//	font-size: 14px;
//	line-height: 19px;
//	padding: 0 16px;
//	color: rgb(100,100,100);
//	font-style: normal;
// }
// 
// div.entry-annotation{
//	max-width: 100% !important;
//	margin-bottom: 2em !important;
// }
// div.created div.entry-body{
//	background: transparent !important;
// }
// div#entries.list div.expanded div.entry-author{
//	display: none !important;
// }
// div#entries.list div.expanded h2.entry-title{
//	margin-bottom: 1em !important;
// }
// div.entry-annotation{
//	padding: 22px 18px !important;
//	background: rgb(250,250,245) !important;
//	-webkit-box-shadow: rgba(0,0,0,.3) 0px 1px 3px !important;
//	margin: 6px !important;
// }
// div.entry-annotation div.entry-annotation-body{
//	line-height: 20px !important;
//	font-size: 14px !important;
//	color: rgb(102,100,100) !important;
//	font-style: italic !important;
// }
// /* @end */
// 
// /* @group Forms */
// div.comment-add textarea{
//	width: 96% !important;
//	border-radius:4px !important;
// }
// div#quick-add-input-div input#quickadd,
// div.interruption input.tags,
// div.interruption .title-container .title,
// div.comment-add textarea,
// div.interruption.self-interruption textarea{
//	-moz-border-radius:4px !important;
//	border-radius:4px !important;
//	border: 1px solid rgb(204, 204, 204) !important;
//	outline: none !important;
//	padding: 6px 8px !important;
//	color: rgb(70,70,70) !important;
//	-webkit-transition-duration:300ms;
//	-moz-transition-duration:300ms;
// }
// div#quick-add-input-div input#quickadd:focus,
// div#search input#search-input:focus,
// div.interruption input.tags:focus,
// div.interruption .title-container .title:focus,
// div.comment-add textarea:focus,
// div.interruption.self-interruption textarea:focus{
//	border: 1px solid rgb(130, 210, 242) !important;
//	-webkit-box-shadow: rgba(130, 210, 242,.5) 0 0 3px;
//	-moz-box-shadow:	rgba(130, 210, 242,.5) 0 0 3px;
// }
// 
// div#quick-add-input-div input#quickadd{
//	width: 204px !important;
// }
// div#quick-add-btn > div{
//	margin-top: 1px !important;
// }
// /* @end */
// 
// 
// /* @group Hide*/
// div#entries.cards div.entry-likers,
// span.bookmarklet-callout,
// div.search-result a.entry-original,
// div.item-link-drop-down-arrow,
// div.gbd,
// div#nav div.selector-icon,
// div#nav > div:nth-child(5) div#lhn-subscriptions-minimize,
// div#nav > div:nth-child(2) div#lhn-selectors-minimize,
// div#nav > div:nth-child(2) div:nth-child(5) div:nth-child(4),
// div#nav > div:nth-child(2) div:nth-child(5) div:nth-child(3),
// div#nav > div:nth-child(2) ul#your-items-tree div.toggle,
// div#nav > div:nth-child(2) ul#your-items-tree a#your-items-tree-item-0-link,
// div#entries.single-source span.entry-source-title,
// a#your-items-tree-item-2-link span.icon,
// a#your-items-tree-item-1-link span.icon,
// div.tree-item-action-container,
// div#team-messages,
// div#tips,
// div#lhn-selectors-menubutton,
// div#guser nobr:nth-child(1) :nth-child(6),
// div.collapsed a.entry-original,
// span.like.link,
// span.star.link,
// span.tag.link,
// div#chrome-header span#chrome-title a span,
// div#viewer-details-toggle,
// div.entry-title-go-to,
// span.subscribe-button,
// span.folder-icon,
// div#viewer-footer,
// xxxxdiv#lhn-friends,
// div#lhn-recommendations,
// div.gbh,
// div#search-submit,
// div#search-restrict,
// a#logo-container,
// div#gbar{
//	display: none !important;
// }
// div#entries span.subscribe-button{
//	display: block !important;
// }
// /* @end */
// 
// /* @group Fonts */
// div.collapsed span .snippet,
// div#scroll-filler div.scroll-filler-message div:first-child,
// div#home div#overview div.label,
// .entry .entry-body div.item-body h2,
// .entry .entry-body div.item-body h3,
// .collapsed div.entry-date,
// div.entry-container div.entry-date,
// div#home div.overview-header span a,
// div#chrome-header span#chrome-title a{
//	/*font-family: "Palatino",serif !important;*/
//	font-family:"Helvetica Neue", "Helvetica", "Arial" !important;
// }
// 
// .entry .item-body,
// div.collapsed h2.entry-title,
// div.single-source div.collapsed h2.entry-title,
// div#home div#overview span.item-title,
// .entry .entry-body blockquote,
// div#home div#overview span.overview-item-link,
// .entry .entry-body{
//	/*font-family: "Georgia","Palatino",serif !important;*/
//	font-family:"Helvetica Neue", "Helvetica", "Arial" !important;
// }
// div.entry-annotation div.entry-annotation-body,
// .entry .entry-body blockquote{
//	font-family: "Georgia","Palatino",serif !important;
// }
// div#chrome-header span#chrome-title a{
//	font-size: 14px;
// }
// .entry .item-body,
// .entry .entry-body{
//	font-size: 16px !important; 
//	line-height: 28px !important;
//	color: rgb(100,100,100) !important;
//	font-weight: 400 !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
// }
// div#home div#overview span.overview-item-link{
//	font-size: 13px !important; 
//	line-height: 20px !important;
// }
// div#entries.search div.search-result span.entry-date,
// div.collapsed span.entry-source-title,
// .collapsed div.entry-date,
// div.entry-container div.entry-date{
//	color: rgb(180,180,180) !important;
// }
// div#entries.search div.search-result span.entry-date,
// .collapsed div.entry-date,
// div.entry-container div.entry-date{
//	font-size: 11px !important;
//	text-transform: uppercase;
//	/*font-style: italic !important;*/
// }
// .entry .entry-body blockquote{
//	font-style: italic !important;
// }
// div#home div#overview span.item-title{
//	font-size: 18px !important;
//	line-height: 22px !important;
//	color: rgb(50,50,50) !important;
//	margin-bottom: 0.4em !important;
// }
// div#home div#overview div.overview-metadata{
//	margin-bottom: 2em !important;
// }
// /* @end */
// 
// /* @group Footer */
// div#footer{
//	font-family: "Helvetica Neue", sans-serif;
//	line-height: 24px !important;
//	font-size: 12px !important;
//	color: rgb(150,150,150) !important;
//	text-shadow: rgb(255,255,255) 0 1px 0 !important;
// }
// div#footer a{
//	text-decoration: none !important;
// }
// div#footer a b{
//	font-weight: 400 !important;
// }
// div#single-item-bottom-links{
//	display: none !important;
// }
// div#scroll-filler{
//	position: absolute !important;
//	padding: 0 !important;
//	line-height: 1.6em;
//	margin-top: 0em !important;
//	margin-bottom: 2em !important;
// }
// div#scroll-filler div.scroll-filler-message{
//	height: 80px !important;
//	padding: 2em 0 1em !important;
// }
// div#scroll-filler div.scroll-filler-message div:first-child{
//	font-size: 24px;
//	margin-bottom: 0.3em;
//	color: rgb(104,102,100);
//	font-weight: 600 !important;
//	text-shadow: rgb(255,255,255) 0 1px 1px !important;
// }
// div#scroll-filler a{
//	text-decoration: none !important;
// }
// /* @end */
// 
// /* @group Links */
// 
// div.feed-info,
// div#entries.search a.entry-source-title,
// div#footer a,
// div#home div#overview div.label a,
// div.entry-author a{
//	color: rgb(130,140,150) !important; 
//	-webkit-transition-duration:400ms;
//	-moz-transition-duration:400ms;
// }
// div#entries.search a.entry-source-title{
//	font-style: italic !important;
// }
// div#home span.link{
//	color: rgb(80,80,90) !important;
//	-webkit-transition-duration:400ms;
//	-moz-transition-duration:400ms;
// }
// div#home span.link:hover{
//	color: rgb(0,0,10) !important;	
// }
// div.entry-author a:hover,
// span.directory-return-link,
// div.search div.preview-interruption span.try-search-on-feeds-link,
// div.interruption.self-interruption a,
// div.interruption.self-interruption .link,
// div.friends-bubble-contents a,
// div#scroll-filler a,
// .entry .entry-body a{
//	color: rgb(16, 122, 155) !important;
//	text-decoration: none !important;
//	text-shadow: rgb(255,255,255) 0 1px 0;
//	-webkit-transition-duration:400ms;
//	-moz-transition-duration:400ms;
// }
// span.directory-return-link:hover,
// div.search div.preview-interruption span.try-search-on-feeds-link:hover,
// div#entries.search a.entry-source-title:hover,
// div.interruption.self-interruption a:hover,
// div.interruption.self-interruption .link:hover,
// div.friends-bubble-contents a:hover,
// div#footer a:hover,
// div#home div#overview div.label a:hover,
// div#scroll-filler a:hover,
// .entry .entry-body a:hover{
//	color: rgb(42, 162, 185) !important;
// }
// div.entry-actions span.link{
//	-webkit-transition-duration: 0 !important
//	-moz-transition-duration: 0 !important;;
// }
// span#sub-tree-header,
// .lhn-section-footer a,
// div#no-entries-msg span.link{
//	color: rgb(103,101,99) !important;
// }
// div#no-entries-msg span.link:hover{
//	color: rgb(93,91,89) !important;	
// }
// div#no-entries-msg span.link:active{
//	color: rgb(0,0,0) !important; 
// }
// span#sub-tree-header:hover,
// .lhn-section-footer a:hover{
//	color: rgb(71, 70, 69)!important;
//	text-shadow: rgb(255, 255, 255) 0 1px 0;	
// }
// #home #overview a.label-link b,
// #home #overview a.label-link{
//	font-weight: 500 !important;
// }
// div.interruption.self-interruption a.bookmarklet-link{
//	color: rgb(80,80,80) !important;
//	font-weight: 500 !important;
//	-webkit-border-radius:4px !important;
//	-moz-border-radius:4px !important;
//	border-bottom: 1px solid rgba(150,150,150,.7) !important;
//	-webkit-box-shadow:rgb(255,255,255) 0 1px 0px;
//	-moz-box-shadow:rgb(255,255,255) 0 1px 0px;
//	font-size: 12px;
// }
// /* @end */
// 
// 
// /* @group Icons */
// li#your-items-tree-item-0-main div.toggle.folder-toggle{
//	top: 0px !important;
//	left: 0px !important;
// }
// li.expanded div.toggle-d-1{
//	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAYtJREFUeNpi/P//PwMpgImBRECyBhYYo7y0ZDUHO1sIKysrAwsQg8C/f/8Yfvz4wfDj5881Xd29oSgaKquqv69eufwfKxsrEzsbOwMjIwPDr1+/GH79/vMvJDT8O0wdI5KnhW/funnx8sXz0jw8PAyMQPj5y2cGXX3Dp6pq6vpA+bfofngLlMiQlJL+wcrCysDExMgAYoPEYIqxeXqLjp7+6i/fvv779v3HPxAbJIaiAuQkNCx888aNJzdvXH8CYqPLM+KIOB+YjegSjIMvpkc1jGqgiYaCvNwVQCxKtAZBQYFwIL5eU1URiEsDSgaaPLHvPxuwiPn16yfD+/fv13z69CWrp6//NW4b+AUYxESEGSQlJBikJCRDhIUEr1eUFgdiLfnAHDZWBh5eXgZmZhZwucTCwsKvrqlpBpRaj1UD2HlQLCkt9cPTyOQBFxf3cZw2/P39h+HPn7//1LV0PsnJK6wDCpUhF2IY5dLmjeu/f/369TqQ7YelvIK5AEVgLrbCi5iCjHpJAyDAAIUM7JLSKg4VAAAAAElFTkSuQmCC) !important;
//	background-position:6px 5px !important;
//	background-repeat: no-repeat;
// }
// li.collapsed div.toggle-d-1{
//	background-position:6px -19px !important; 
// }
// div#viewer-top-controls div#stream-prefs-menu,
// div#lhn-subscriptions-menubutton{
//	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjlERTYyRkJGODZCMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjlERTYyRkNGODZCMTFERjlBRURDODgzNDUwQUZDMUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERUVBRDA0MEY4MzIxMURGOUFFREM4ODM0NTBBRkMxRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOURFNjJGQUY4NkIxMURGOUFFREM4ODM0NTBBRkMxRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkfAWAEAAAQBSURBVHjaxFVtTFtlFH7vbW9L77394H7YJgOpKwSTMhPgp0qy/WJD3KT7SFxmtrhmQmIQsokGNXEajSNjbCYzg00DE+PcRJYssB86/OP+TUgWkmVSpc4lllsYFi6sLe3rOddCkLQ1TUh8kyf3vOc59/Tc8573KUspJZsBlmzSMhf6woH9gQGWZQ8xDEsY2KdpmqTT9DKbPXgvRWTjLn3eP1VSUqoLvI3wAk9KSkv13r6LIaOifXubtkD6HpZhW658c00rslrJapYD+wJqmtAL4Hj96rWhh+A6+VpzS03vhc8asaLgsebvnU7XKSMRz9surqRS9VaO2xY8euQ30S4aScC+LohCZSKRrDSbTDZw7RRF0SqK5a0NLzT6MJHPV94Kj2UGOx6J/Hmmp/t0MLYQEzjOTCwWq/H98WSCJBNJ4nA49Tfa2vvcbk/buq+szzxvrjUbAt6XZHl/Kr0ilD1ZNr+zofFX9I+O3Nga/j3s8ng8sxizoV0312+YVw69TKFcAp9ALGaOtLYd71NVtRtJTdPaz/acDiagsqVFnSwsLJD+y18x2Q6BtVoshLNwkMRMGJYhP479cBb89xBoM/AaB5wRA4eQa2GPxtD44lJv1VRoSoHG3orFYgfxZx0OxyD0bEdF5dPa4cOvTmbe2Z4rEek40a5KsjQJCVRdXyJLS8sGibNi43nidDq02dk5/6mubi1XRcZAwnT2x/6KqZIk636/P2rji2AkikjVtmdmZFnWkcOYvCOPFf3x4MG58+c/jc7NzX0N+5NvdxynCFjvoQ85jMl3aVcNBfAxwIX7dzo76LuADOfKcEq+REaPsqyxfI0t5PZvL1QVNk2PCk7EMMwAgG7AAJsj2AjIxsEpTlVXV+uKIhME2pFIJGR03Gw2bwFcBai45ziOIjKcChjCmMwJWcfHfx6ue/7ZVF3dcym0wWczEsmyNCoIPHW5nPfgAo/a7SJFgH0dfYIgUIxZd9xlIyM37iLQXpujUCh0BkpchFtP3e4nqMfj/gdgow85jNkwO/UZ/GsgXQ0Nux76fFvp7t0vPrp9+6c7CLTRFwgEwqvDmnMgKyrKKQc6xJlNhDWZyNB3w31er9fQo+np6faml/YE06kUSa4gkuT+/V+y6xH0gjicduJwOYndYSeDg1+u6RHa6EMOY+wZLc+rR52db1WNj08o8LG3Fhf1g+gTRWEQ/j121NbWah98+NF/61GgaY+qKMrk/Pwj9fHjOInH4wZpBUVEFBcXa9Fo1P/t0LCW967BMfcnkwnV631KlyRpeWICKyOktqZmBjIIUW1GxRhw7cqrR+Hw9Lmurk+is9GooUctzccoAvUIfchhTMF69OaJNtoB+F/06G8BBgA9wc5yNk0sGwAAAABJRU5ErkJggg==) !important;
//	background-repeat: no-repeat;
// }
// div#viewer-top-controls div#stream-prefs-menu{
//	margin-top: 0px !important; 
// }
// span#view-list,
// span#view-cards{
//	background-image: url(data:image/png;base64,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) !important;
//	text-indent:-623em !important;
//	height: 21px !important;
//	width: 26px !important;
//	display: block !important;
//	float: left !important;
//	background-repeat:no-repeat;
//	position: absolute !important;
//	top: 0 !important;
// }
// span#view-cards.link-selected{
//	background-position: 0 bottom !important;
// }
// span#view-list{
//	background-position: -26px bottom !important;
//	left: 30px;
// }
// span#view-list.link-selected{
//	background-position: -26px top !important;
// }
// div#viewer-top-controls div#stream-prefs-menu{
//	background-position:0 0 !important;
//	width: 22px !important;
//	height: 16px !important;
// 
// }
// div#lhn-subscriptions-menubutton{
//	background-position:0px 1px !important;
//	width: 18px !important;
//	height: 16px !important;
//	margin-right: 2px !important;
//	margin-top: 1px !important;
// }
// div#lhn-subscriptions-menubutton:active{
//	background-position:0px -15px !important;
// }
// div#nav > div:nth-child(2) a#your-items-tree-item-1-link,
// div#nav > div:nth-child(2) a#your-items-tree-item-2-link,
// div#lhn-selectors div.selector a.link{
//	display: block !important;
//	width: 28px !important;
//	height: 22px !important;
//	overflow: hidden;
//	background-image: url(data:application/octet-stream;base64,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) !important;
//	text-indent:-623em !important;
//	background-repeat: no-repeat !important;
//	margin-top: -1px !important;
// }
// div#lhn-selectors div:first-child > a.link{
//	background-position: 3px 0px !important;
// }
// div#lhn-selectors div.selected a.link{
//	background-position: 3px -22px !important;
// }
// div#lhn-selectors div#reading-list-selector a.link{
//	background-position: -28px 0px !important;
// }
// div#lhn-selectors div#reading-list-selector.selected a.link{
//	background-position: -28px -22px !important;	
// }
// div#lhn-selectors div#star-selector a.link{
//	background-position: -60px 0px !important;
// }
// div#lhn-selectors div#star-selector.selected a.link{
//	background-position: -60px -22px !important;
// }
// div#nav > div:nth-child(2) a#your-items-tree-item-1-link{
//	background-position: -87px 2px !important;
//	width: 25px !important;
// }
// div#nav > div:nth-child(2) a#your-items-tree-item-1-link.tree-link-selected{
//	background-position: -87px -20px !important;	
// }
// div#nav > div:nth-child(2) a#your-items-tree-item-2-link{
//	background-position: -119px 2px !important;
// }
// div#nav > div:nth-child(2) a#your-items-tree-item-2-link.tree-link-selected{
//	background-position: -119px -20px !important;
// }
// div#your-items-tree-container{
//	width: 72px;
// }
// div#your-items-tree-container li{
//	width: 36px !important;
// 
// }
// li#your-items-tree-item-1-main,
// li#your-items-tree-item-2-main{
//	padding: 0 !important;
//	width: 36px !important;
// }
// 
// div#viewer-refresh{
//	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAaCAYAAACO5M0mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvlJREFUeNqUU11IU2EY/s7/2eZsqWOmbkPdQLds6UjmCgdmRqaupbOxkEgzkYpEEAyjvBCGSMQoMuyiuyK3IVZCbDZwQZAXQZmiwbCV3Yg3HZP9nM3Td479zJ+bPni+n+d9v5/3/Z4XcBwHdqKl+cxkS7OtMJ1D+G5nO+90QAuIbSZTrmQqOeLxTkT/Ora2nLXgJNFLEYSRIMl8nmOTScCybJhNsNdxnnCcs/eTNOWiKQrQNC0AgXyCZQGG4YrCoiId4nDYLdAQFIvFwNpoDRuPVK7dc9+pwnBi02A4/LXu5KlZaHfj+2Wyu3Az2tRkXYDkTTh/o1IXLtafbljIzT3wGK6fQMRxDMX0OIEDk8k8CIkJ/intHZ2P4HAf4ntX16WBWDTahlIUiWIYBoLBQCAt8Bu80+XODnmSZYcIgixG5QoFw1tCMzPOnWkS0VQ3juFArVIxyOzsO5/n2VNbLBZjfzBMTzweh9cjgCQJp1giGaZIEmtru+Dl82iYevHc5/e/KobOIBaPC6cJqRKJQO2JunBjo9X2J+HO+flPfcHgdMG3SCQTIAhQqdRMTc3xFZ3+4AgfefoXGvgPgij5vV6EGIf4IKz2EgVskxDbRLGnI0EQHEmSURzHb0GItqlHIpFY4NN6EQQxwqjzt24XbGHosyWK7OysfpGIdkEngKIo4Ec+RRy3CbKyshVHzVU6kJeXZ1EqlSmNRpNyu92fI5HIW61Ww+n1+tTg4O3l9fX1Z/BEM6goL3+vKy3hRkcfzEPCBpHT0d6+trS0FILzixCU8DyzuSpuMlVyq6ur9rSAXBD5/NxorBgwGMoW0X2ZUlQqlQKPZ3yXKKqrj8lpmhqSyWTFqEarZTIkYvA64N8lCnlOTneGRAJ0ulIGCYVmfGNjD22JeILd2PjZk0gkJ/g6IHDcKaLpYVg/2JWr17ZE4fWO+6amXgqigBuE00iKFGqnob4h3Gxv/SeKubmPfdMBf0Hky3Imn0ulWs3U1tatlJUd+j9R/BJgAL81dOUPnY83AAAAAElFTkSuQmCC) !important;
//	background-repeat:no-repeat;
//	text-indent: -623em !important;
//	width: 20px !important;
//	height: 14px !important;
//	background-position: 5px 1px !important;
//	margin-top: 2px !important;
// }
// div#viewer-refresh:active{
//	background-position: 5px bottom !important; 
// }
// div#viewer-top-controls div#stream-prefs-menu:active{
//	background-position: left bottom !important;		
// }
// div#mark-all-as-read{
// background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAaCAYAAACD+r1hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6VJREFUeNqcU1toHGUUPv/8/1yys9nZrLFkuyz0oUYXLN2NfWjajS+9pCi1am5NRVNQwvhSEUkqCg2zYGiJj3lq962iaFKLLcF6eWjsgqCtrPgQbSwu1Dbr5rYVgsvOPzOeMzaliE/+8DHL2XP9zndYEARAb7D/RY0pbJQxpR+/3Qxtvh98C4E/6/nB2ZnZT5vkxyhgaLAvJYQ6xznfKQQHRVEA0O4jpPTAk/JH6clnP/7kwh02ONCnGS1GWRUiYxgGaJoGHIPoea6EputCo9EAV8qFxl+NrEBn29D1jGma0NJigCpUoCrUqed70NW1q0JBX175PIM5bOWRRMIm56gZgTAo0gKaroOqqbB7957Kc0deKPxZXy8baE/E22whpeyMRk3o3ttT4VyB8g83tgW+D7ncU5XeQ88U3n3nZDoI/Od1VaPWOoWuqYzjkPW11fLwS69cCvzgFLID5Pz2ybfSOLijcoGzqQAKA/b+1Ol6vb5uMcbA8/yJ9ybP3KaBx8beTPue76iqCIkgmmNWW51dvHjh2vXvv8sTvU23iRS6E1SBK9zh6KzjPBq243sSsl27SuLgwUPTv91azK2tr5sKVpE+OFRNwXnI2SCaOQfTim8cONA7TYsTtVrt/EcffnB4daVmIt/h0lRVBR33Qs4xy9oY6D96+dEtW15m96XR7rruVKn0TX7x5i/t1aWlOBcKJJOpe9u3P7bcvSdfwgRj6LeyGUBPII4gehA779t+QswjPkPITafwYd8oIEgisojuTTPiJkJ5kJh+CCFSSF0Zywb/BfqPfMiXmWZEU1WtLKWbIXYIDz/ccqgrVPOC6zazorW11fY8L6PrWijrfweMjByvUOZisYhq1m0lmdxqYxDEYrEHsCwr/L5u25XJyclCtVotR6NRZC1psx07npSoJT587FiFss/OzGyjzH39A5Xx8fFCVy6L4gscHwUJAXgCMzFS6drqSvn0malLuN1TFHDixBuFfH5vOmJGHGo1ILmgHxsdfa1+5/fbFjZPjE3MzV0Jxdfbuz+NBocpPDwoeqlUqs6K585e+/qrL/J0v3i7IFGxAdbmjDkkC44SwfMFamnfvv0lMXR0ePrWr4u52jLqCE/RdaUTbhSzapoOeC8hc/G2xMbg0PA/4qsu3T1fLJ47XKv9YeIFhusVlBlBVRKJxMbI8Vcvd3R0PCy+5tT8/NX8zwsL7dXq3biCStmaSt3rfPyJ5Z6ep1F82v8T398CDAB9g5Q0ik32gwAAAABJRU5ErkJggg==) !important;
//	background-repeat:no-repeat;
//	text-indent: -623em !important;
//	width: 20px !important;
//	height: 14px !important;
//	background-position: 5px 1px !important;
//	margin-top: 2px !important;
// }
// div#mark-all-as-read:active{
//	background-position: 5px -12px !important;	
// }
// div.arr,
// span.item-link,
// #mark-all-as-read-options,
// div#chrome-lhn-toggle-icon,
// div.star,
// span.read-state,
// span.email,
// span.broadcast-with-note,
// span.broadcast-active,
// span.broadcast-inactive,
// .goog-option-selected div.goog-menuitem-checkbox{
// background-image: url(data:image/png;base64,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) !important;	background-repeat:no-repeat;
//	text-indent: -623em !important;
//	width: 14px !important;
//	height: 14px !important;
// }
// .goog-option-selected div.goog-menuitem-checkbox{
//	background-position: 0px -143px !important;
//	margin-top: 5px !important;
// }
// .goog-option-selected:hover div.goog-menuitem-checkbox{
//	background-position: -14px -143px !important; 
// }
// span.item-link,
// span.broadcast-inactive,
// span.broadcast-active,
// span.broadcast-with-note,
// span.email,
// span.read-state{
//	width: 14px !important;
//	padding-left: 18px !important;
// }
// span.broadcast-inactive{
//	background-position: 0px -7px !important;
// }
// span.broadcast-active{
//	background-position: 0px -29px !important;
// }
// span.broadcast-with-note{
//	margin-left: 8px;
//	background-position: 0px -51px !important;
// }
// span.email{
//	margin-left: 8px;
//	background-position: 0px -72px !important;
// }
// span.item-link-active,
// span.email.email-active{
//	background-color: transparent !important;
//	border-bottom: 0 !important;
// }
// span.read-state-not-kept-unread{
//	margin-left: 8px;
//	background-position: 0px -95px !important;
// }
// span.read-state-kept-unread{
//	margin-left: 8px;
//	background-position: 0px -117px !important;
// }
// div.star{
//	width: 16px !important;
//	height: 16px !important;
// }
// div.item-star.empty{
//	background-position: 0px -160px !important;
// }
// div.item-star-active{
//	background-position: -17px -160px !important;
// }
// div#chrome-lhn-toggle-icon{
//	width: 12px !important;
//	background-position: -2px -187px !important;
//	border-color: rgba(0,0,0,0) !important;
// }
// .lhn-hidden div#chrome-lhn-toggle-icon{
//	background-position: -20px -187px !important;
// }
// span.item-link.link{
//	margin-left: 8px;
//	background-position: 0px -205px !important; 
// }
// #mark-all-as-read-options{
//	background-position: -3px -230px !important;	
// }
// div.arr{
//	width: 8px !important;
//	height: 16px !important;
//	background-position: 0px -182px !important;
// }
// div#quick-add-close{
//	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REVFQUQwM0ZGODMyMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REVFQUQwM0VGODMyMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDo5NkE1MzY4ODQ5MjA2ODExOEY2Mjg3MjY4MUQ3M0Q1OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NkE1MzY4ODQ5MjA2ODExOEY2Mjg3MjY4MUQ3M0Q1OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvj6EF4AAAB+SURBVHjanJLRCcAgDESNdK+QzbqZuFgtEZFr9D5qQImej5wh0lpLR3ECdgZAHYvF1J3JIHhuBNahZWbVxTvAOu4MGembSIT9cYFzhTMFU7D8gXZ/xHhIPmNXUcFeAtsVK16ke9Gege2lq0v3WLfjABiBFj2Cv0ZOTof8FWAA7zxP3d5Ag5sAAAAASUVORK5CYII=) !important;
//	display: block !important;
//	width: 14px !important;
//	height: 14px !important;
// }
// 
// li.tag a span{
//	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEFBMENBNkNGODZGMTFERjlBRURDODgzNDUwQUZDMUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEFBMENBNkRGODZGMTFERjlBRURDODgzNDUwQUZDMUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QUEwQ0E2QUY4NkYxMURGOUFFREM4ODM0NTBBRkMxRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0QUEwQ0E2QkY4NkYxMURGOUFFREM4ODM0NTBBRkMxRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiZcwQ4AAACgSURBVHjaYvz//z8DqYCJgRxAqk0g9SxIfF80+XNA/JQY5x2HYhDQBWIuYjQxIYmxArEhEDOia2JB45uj8YWAWBWIb+Gy6QEOv6sBsSAuTVeA+A0WTSDnGUGdi6EJFPZngPgrFo2gANHBFRC/gfgklEYGf5FdwQiKLEZGjAASAWILqNO+QF3wGZ4Y8KQIBSA2QA9hQppwJiNGuqVygAADAMv0MUrALAGkAAAAAElFTkSuQmCC) !important;
//	display:block !important;
//	background-repeat: no-repeat !important;
//	width: 0px !important;
//	background-position: 0px 6px;
// }
// /* @end */
// 
// /* @group Scrollbar */
// ::-webkit-scrollbar {
//	width: 4px;
// }
// ::-webkit-scrollbar-button:start:decrement,
// ::-webkit-scrollbar-button:end:increment	 {
//	height: 4px;
//	display: block;
//	background-color: transparent;
// }
// ::-webkit-scrollbar-thumb:vertical {
//	background: rgba(100,100,102,.3);
//	border-radius:4px;
//	height: 80px;
// }
// ::-webkit-scrollbar-track-piece:vertical {
//	background-color: #fff;
//	border-left: 1px solid rgba(210,210,210,.2);
// }
// /* @end */
// 
// /* @group QuickFix */
// #gb{
//	background: -webkit-gradient(
//			linear,
//			left top,
//			left bottom,
//			color-stop(0, rgb(74, 73, 72)),
//			color-stop(0.3, rgb(64, 63, 62)),
//			color-stop(0.7, rgb(54, 53, 52)),
//			color-stop(1, rgb(34, 33, 32))
//	) !important;
//	background: -moz-linear-gradient(
//			top,
//			rgb(74, 73, 72),
//			rgb(64, 63, 62) 30%,
//			rgb(54, 53, 52) 70%,
//			rgb(34, 33, 32)
//	) !important;
// }
// .gbtb2,
// #gbi4 .gbma,
// #gbz,#gbx1,#gbx2,#gbx3,#gbx4,
// .gbtcb{
//	display:none !important;
// }
// .gbts, #gbg5, .gbtb, .gbgt, #gbg4{
//	border:0 !important;
// }
// #search, #main{
//	margin-top:0 !important;
// }
// #gbi4 span{
//	color:#aaa !important;
//	font-weight:normal !important;
//	font-size:11px !important;
//	text-transform:uppercase;
//	position:relative !important;
//	top:1px;
// }
// .gbto #gbgs4 span{
//	color:#36c !important;
// }
// #gbg{
//	z-index:1010 !important;
// }
// #gbg4, #gbg5{
//	height:30px !important;
//	-webkit-transition-duration:.5s;
//	-moz-transition-duration:.5s;
// }
// #gbg4:hover, #gbg5:hover{
//	background:rgba(0,0,0,.3) !important;
//	border:0 !important;
// }
// #gbg5 #gbi5{
//	background-position: 0px -20px !important;
//	opacity:.8;
// }
// .gbto #gbg5 #gbi5{
//	background-position: 0px 1px !important;
// }
// .gbto{
//	-webkit-box-shadow:none !important;
//	-moz-box-shadow:none !important;
// }
// /* @end */
// 
// 
// /* Firefox-specific */
// body.gecko{
//	 overflow: visible;
// }