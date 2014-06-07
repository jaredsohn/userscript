// ==UserScript==
// @name           Submit Data
// @namespace      http://0xDEADBEEF/
// @description    Shows submission data as a tooltip and adds accessKeys to them where necessary. Hold crtl to manipulate.
// @author         Dehstil
// @include        *
// ==/UserScript==

//check features
if(document.implementation==undefined) return;
if(!(document.implementation.hasFeature("xpath","3.0")&&
document.implementation.hasFeature("Core","2.0")&&
document.implementation.hasFeature("CSS","2.0")&&
document.implementation.hasFeature("Events","2.0")))
 return;

//maintain XML
if(document.xmlVersion!=null){
 createElement=function(name){return document.createElementNS("http://www.w3.org/1999/xhtml",name)};
 getElementsByTagName=function(name){return document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",name)};
}else{
 createElement=document.createElement;
 getElementsByTagName=document.getElementsByTagName;
}

function pop(e){
 el.form=this.form;
 update(this.form);
 el.innerHTML=this.form.tip;
 el.style.borderColor=this.form.onsubmit==undefined?"black":"orange";
 place(e);
 el.style.visibility="visible";
// el.style.height=el.offsetHeight+"px";
// el.style.width=el.offsetWidth+"px";
}
function place(e){
 if(e.ctrlKey) return;
 fakee.pageY=e.pageY;
 fakee.pageX=e.pageX;
//alert(e.screenY);
 el.style.top=e.pageY+15+"px";
 el.style.left=e.pageX+10+"px";
 el.style.width=window.getComputedStyle(el,null).getPropertyValue("width");
 if(outerHeight<e.screenY+15+el.offsetHeight) el.style.top=e.pageY-el.offsetHeight+"px";
 if(outerWidth<e.screenX+10+el.offsetWidth) el.style.left=e.pageX-el.offsetWidth+"px";
}
function unpop(e){
 if(e.ctrlKey||e.target==el) return;
 if(e.type=="mouseout"){
  var xy=getAbsolutePosition(this);
  if(xy[0]<e.clientX&&e.clientX<xy[0]+this.offsetWidth&&
     xy[1]<e.clientY&&e.clientY<xy[1]+this.offsetHeight-11){
   place(e);
   return;
  }
 }
 el.style.height=el.style.width="auto";
 el.style.visibility="hidden";
 el.style.top=el.style.left=-1000;
 el.style.opacity=.003;
}
function update(form){
 fakee.form=form;
 if(el.script&&form.onsubmit!=undefined){
  form.tip=form.onsubmit;
 }else{
  var data=[(form.method==""?"GET":form.method.toUpperCase())+"\xa0"+form.action];
  for(var i=0;i<form.length;i++){
   if(form[i].name==""||form[i].type=="radio"&&!form[i].checked) continue;
   data.push("\n",form[i].name,": ",form[i].value);
  }
  form.tip=data.join("");
 }
// form.tip=form.tip.replace(/[<&\s]/g,function(m){return "&#"+m.charCodeAt(0)+";"});
 if(el.form==form) el.innerHTML=form.tip;
}
function down(e){
 if(e.button==0&&e.type=="mousedown") el.down=true;
 if(e.ctrlKey&&el.down){
  getSelection().removeAllRanges();
  el.down=true;
  el.offmousey=el.mousey-el.style.top.slice(0,-2);
  el.offmousex=el.mousex-el.style.left.slice(0,-2);
 }
}
function move(e){
 el.mousey=e.pageY;
 el.mousex=e.pageX;
 if(e.ctrlKey&&el.down){
  el.style.top=e.pageY-el.offmousey+"px";
  el.style.left=e.pageX-el.offmousex+"px";
 }
}
function up(e){
 if(e.button==0) el.down=false;
}
function off(e){
 if(!e.ctrlKey) el.offmousey=el.offmousex=0;
}
function fade(){
 if(el.style.visibility=="visible"&&el.style.opacity<.768)
  el.style.opacity*=2;
}
function swap(e){
 if(!(e.shiftKey&&e.altKey&&e.keyCode==90)) return;
 unpop.call(document.body,fakee);
 el.script=!el.script;
 fakee.pop(fakee);
}

function getAbsolutePosition(element){
var x=0,y=0;
 while(element!=document.body){
  x+=element.offsetLeft;
  y+=element.offsetTop;
  element=element.offsetParent;
 }
 return [x,y];
}

function init(){
 var els=document.evaluate("//*[@accesskey]",document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),
 chars="(?=\\w)[^z",node;
 while((node=els.iterateNext())!=null)
  chars+=node.accessKey;
 var regex=new RegExp(chars+"]","i"),
 btn,match;
 els=document.evaluate("(//input|//button)[@type='submit']|(//input|//button)[@type='image']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 if(els.snapshotLength==0) return;
 el=createElement("div");
 el.setAttribute("style","position:absolute;border:thin solid black;background:white;padding:.5em;font-size:x-small;text-indent:-1em;padding-left:1.5em;color:black;z-index:999999999;-moz-border-radius:1.5em;text-align:left;width:auto;white-space:pre;");
 document.addEventListener("click",unpop,false);
 document.addEventListener("keydown",down,false);
 el.addEventListener("mousedown",down,false);
 document.addEventListener("mousemove",move,false);
 document.addEventListener("mouseup",up,false);
 el.script=false;
 document.addEventListener("keydown",swap,false);
 fakee={ctrlKey:false,relatedTarget:null,pop:pop};
 unpop.call(document.body,fakee);
 document.body.appendChild(el);
 setInterval(fade,50);
 for(var i=0;i<els.snapshotLength;i++){
  btn=els.snapshotItem(i);
  btn.addEventListener("mouseover",pop,false);
  btn.addEventListener("mousemove",place,false);
  btn.addEventListener("mouseout",unpop,false);
  for(var j=0;j<btn.form.length;j++)
   btn.form[j].addEventListener("change",function(){update(this.form)},false);
  if(btn.accessKey==""){
   match=regex(btn.value);
   if(match==null) continue;
   btn.setAttributeNS(btn.namespaceURI,"accesskey",match);
  }
  chars+=btn.accessKey;
  regex=new RegExp(chars+"]","i");
 }
}
init();