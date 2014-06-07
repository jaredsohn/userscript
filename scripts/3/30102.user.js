// ==UserScript==
// @name	Douban ID Filter
// @namespace	http://www.wuyue.info/douban
// @description	script to ignore the posts of the specified ID(s)
// @include	http://*.douban.com/*
// ==/UserScript==
var info;
if(!info){
info={};
}else{
if(typeof info!="object"){
throw new Error("info already exists and is not an object");
}
}
if(!info.wuyue){
info.wuyue={};
}else{
if(typeof info.wuyue!="object"){
throw new Error("info.wuyue already exists and is not an object");
}
}
if(info.wuyue.douban){
throw new Error("info.wuyue.douban already exists");
}
info.wuyue.douban={XP_FIRST_NODE:XPathResult.FIRST_ORDERED_NODE_TYPE,XP_UNORDERD_LIST:XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,XP_ORDERD_LIST:XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,XP_UNORDERED_ITERATOR:XPathResult.UNORDERED_NODE_ITERATOR_TYPE,XP_ORDERED_ITERATOR:XPathResult.ORDERED_NODE_ITERATOR_TYPE,find:function(_1,_2,_3){
if(!_3){
_3=document;
}
var _4=document.evaluate(_1,_3,null,_2,null);
return ((_2==info.wuyue.douban.XP_FIRST_NODE)?_4.singleNodeValue:_4);
},extract_id:function(_5){
var _6=_5.match(/\/people\/(.*)\//);
return _6[1];
},Blacklist:function(){
var _7={};
_7=this.load();
this.getList=function(){
return _7;
};
this.add=function(id){
if(!(id in _7)){
_7[id]=true;
this.save();
}
};
this.remove=function(id){
if(id in _7){
delete _7[id];
this.save();
}
};
},Page:function(_a){
var _b=_a;
for(var _c in this.regx){
if(this.regx[_c].url.test(_b)){
this.type=_c;
}
}
},Post:function(e,_e,_f){
this.node=e;
this.callback=_f;
this.authorNode=info.wuyue.douban.find(_e,info.wuyue.douban.XP_FIRST_NODE,e);
this.authorID=info.wuyue.douban.extract_id(this.authorNode.getAttribute("href"));
this.injectDeleteButton();
}};
info.wuyue.douban.Blacklist.prototype.save=function(){
var _10=this.getList();
var _11="";
for(var id in _10){
_11+=(_11?",":"")+id;
}
GM_setValue("blacklist",_11);
};
info.wuyue.douban.Blacklist.prototype.load=function(){
var _13,i;
var ids=[];
var _16={};
_13=GM_getValue("blacklist");
if(_13){
ids=_13.split(",");
for(i=ids.length-1;i>=0;i--){
_16[ids[i]]=null;
}
}
return _16;
};
info.wuyue.douban.Blacklist.prototype.test=function(id){
var _18=this.getList();
return (id in _18);
};
info.wuyue.douban.Post.prototype.injectDeleteButton=function(){
var _19=document.createElement("span");
_19.innerHTML="<div>X</div>";
_19.setAttribute("class","gact");
_19.addEventListener("click",this.callback(this),false);
this.authorNode.parentNode.appendChild(_19);
};
info.wuyue.douban.Post.prototype.getAuthorID=function(){
return this.authorID;
};
info.wuyue.douban.Post.prototype.hide=function(_1a){
if(_1a){
this.node.style.visibility="hidden";
}else{
this.node.style.visibility="show";
}
};
info.wuyue.douban.Page.prototype.regx={thread:{url:/\/group\/topic/,element:["//table//table[@class=\"wr\"]"],author:[".//a[1]"]},settings:{url:/\/settings/,element:[],author:[]}};
info.wuyue.douban.Page.prototype.getPosts=function(){
switch(this.type){
case "thread":
var _1b=info.wuyue.douban.find(this.regx.thread.element[0],info.wuyue.douban.XP_UNORDERD_LIST);
return _1b;
case "settings":
break;
default:
}
return null;
};
info.wuyue.douban.Page.prototype.getByAuthor=function(id){
switch(this.type){
case "THREAD":
alert("this is a thread page");
break;
case "SETTINGS":
alert("this is a settings page");
break;
default:
alert("unknown location");
}
};
(function(){
var _1d=new info.wuyue.douban.Blacklist();
var _1e=new info.wuyue.douban.Page(location);
_1e.posts=[];
var _1f=_1e.getPosts();
var _20;
if(_1f){
for(var i=_1f.snapshotLength-1;i>=0;i--){
_20=new info.wuyue.douban.Post(_1f.snapshotItem(i),_1e.regx[_1e.type].author[0],function(p){
return function(){
_1d.add(p.getAuthorID());
p.hide(true);
for(var j=_1e.posts.length-1;j>=0;j--){
_1e.posts[j].hide(_1e.posts[j].authorID==p.getAuthorID());
}
};
});
_20.hide(_1d.test(_20.authorID));
_1e.posts[i]=_20;
}
}
})();
