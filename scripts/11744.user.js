// ==UserScript==
// @name           Access Keys
// @namespace      http://0xDEADBEEF/
// @description    Makes access keys visible
// @include        *
// ==/UserScript==

//check features
if(document.implementation==undefined) return;
if(!(document.implementation.hasFeature("xpath","3.0")&&
document.implementation.hasFeature("Core","2.0")&&
document.implementation.hasFeature("CSS","2.0")))
 return;

//maintain XML
if(document.xmlVersion!=null){
 createElement=function(name){return document.createElementNS("http://www.w3.org/1999/xhtml",name)},
 getElementsByTagName=function(name){return document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",name)};
}else{
 createElement=document.createElement,
 getElementsByTagName=document.getElementsByTagName;
}

//workaround XPCNativeWrapper
NodeFilter.SHOW_TEXT=4;
NodeFilter.FILTER_ACCEPT=1;
NodeFilter.FILTER_REJECT=2;

function underline(node){
 key=node.accessKey.toLowerCase();
 var text,span,str,
 treewalker=document.createTreeWalker(node,
  NodeFilter.SHOW_TEXT,
  {acceptNode:function(text){
   var rslt=text.data.toLowerCase().search(key);
   if(rslt==-1) return NodeFilter.FILTER_REJECT;
   index=rslt;
   return NodeFilter.FILTER_ACCEPT;
  }},
  false
 );

 if(treewalker.nextNode()==null){
  str=" ("+key+")";
  key=/\w/;
   if(treewalker.nextNode()==null){
    node.appendChild(document.createTextNode(str));
    return;
   }
  while(treewalker.nextNode()!=null);
  text=treewalker.currentNode;
  index=text.data.lastIndexOf(":");
  if(index==-1)
   text.appendData(str);
  else
   text.insertData(index,str);
  return;
 }
 text=treewalker.currentNode.splitText(index);
 text.splitText(1);
 span=createElement("input2");
 span.style.textDecoration="underline";
 text.parentNode.insertBefore(span,text);
 span.appendChild(text);
}

var els=document.evaluate("//*[@accesskey]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null),
node,span,index,key;
for(var i=0;i<els.snapshotLength;i++){
 node=els.snapshotItem(i);
 if(node.tagName.toLowerCase()=="textarea") continue;
 if(node.tagName.toLowerCase()=="input"&&/^(?:submit|button)$/.test(node.getAttribute("type"))){
  //document.renameNode(node,node.namespaceURI,"button");
  span=createElement("input2");
  node.style.width=node.offsetWidth+"px";
  span.style.fontSize=window.getComputedStyle(node,null).getPropertyValue("font-size");
  span.appendChild(document.createTextNode(node.getAttribute("value")));
  node.style.fontSize=0;
  node.appendChild(span);
  node.addEventListener("DOMAttrModified",function(e){
   if(e.attrName=="value"){
    this.firstChild.textContent=e.newValue;
    underline(this);
   }
  },false);
 }
 underline(node);
}