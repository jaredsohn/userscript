// ==UserScript==
// @name           Regla
// ==/UserScript==
JSCore=function(){this.fnInit()};JSCore.prototype={fnInit:function(){this.aStack=new Array();
this.oInterval;this.bLoaded;this.aEventCache=new Array();this._fnLogInit()},addListener:function(d){var a;
var e;typeof d.sLabel!="undefined"?null:d.sLabel="";typeof d.oObj!="undefined"?null:d.oObj=null;
typeof d.mOverrideScope!="undefined"?null:d.mOverrideScope=null;if(d.mScope){if(d.mScope===true){a=d.oObj
}else{a=d.mScope}}else{a=d.mElement}e=function(f){if(!jsCore){return 0}else{d.fnCallback.call(a,jsCore._getEvent(f),d.oObj)
}return false};if(typeof(d.mElement)=="string"){var c=document.getElementById(d.mElement);
jsCore._addEvent({nNode:c,sType:d.sType,fnCallback:d.fnCallback,fnCallbackWrapped:e,sLabel:d.sLabel})
}else{if(d.mElement){if(d.mElement.nodeName||d.mElement==window){jsCore._addEvent({nNode:d.mElement,sType:d.sType,fnCallback:d.fnCallback,fnCallbackWrapped:e,sLabel:d.sLabel})
}else{for(var b=0;b<d.mElement.length;b++){jsCore._addEvent({nNode:d.mElement[b],sType:d.sType,fnCallback:d.fnCallback,fnCallbackWrapped:e,sLabel:d.sLabel})
}}}}},_addEvent:function(a){this.aEventCache[this.aEventCache.length++]={nNode:a.nNode,sType:a.sType,fnWrapped:a.fnCallbackWrapped,fn:a.fnCallback,sLabel:a.sLabel};
if(a.nNode.addEventListener){a.nNode.addEventListener(a.sType,a.fnCallbackWrapped,false)
}else{if(a.nNode.attachEvent){a.nNode.attachEvent("on"+a.sType,a.fnCallbackWrapped)
}}},removeListener:function(b){this.aiDelete=new Array();if(typeof b.sLabel=="string"){for(var a=0;
a<this.aEventCache.length;a++){if(this.aEventCache[a].sLabel==b.sLabel){jsCore._removeEvent({nNode:this.aEventCache[a].nNode,sType:this.aEventCache[a].sType,fn:this.aEventCache[a].fn})
}}}else{if(typeof b.mElement=="string"){nElement=document.getElementById(b.mElement);
jsCore._removeEvent({nNode:nElement,sType:b.sType,fn:b.fnCallback})}else{if(!b.mElement.length){jsCore._removeEvent({nNode:b.mElement,sType:b.sType,fn:b.fnCallback})
}else{for(var a=0;a<b.mElement.length;a++){jsCore._removeEvent({nNode:b.mElement[a],sType:b.sType,fn:b.fnCallback})
}}}}for(var a=this.aiDelete.length-1;a>=0;a--){this.aEventCache.splice(this.aiDelete[a],1)
}},_removeEvent:function(b){for(var a=0;a<this.aEventCache.length;a++){if(b.nNode==this.aEventCache[a].nNode&&b.sType==this.aEventCache[a].sType&&b.fn==this.aEventCache[a].fn){if(b.nNode.removeEventListener){b.nNode.removeEventListener(b.sType,this.aEventCache[a].fnWrapped,false)
}else{if(b.nNode.detachEvent){b.nNode.detachEvent("on"+b.sType,this.aEventCache[a].fnWrapped)
}}break}}this.aiDelete[this.aiDelete.length++]=a},_getEvent:function(a){return a||window.event
},getElementFromEvent:function(a){var b;if(a.target){b=a.target}else{if(a.srcElement){b=a.srcElement
}}if(b.nodeType==3){b=b.parentNode}return(b)},_log_aDatabase:new Array(),fnLog:function(b,a){},_fnLogInit:function(){if(document.addEventListener){document.addEventListener("keydown",this._fnLogShowHide,true)
}else{if(document.attachEvent){document.attachEvent("onkeydown",this._fnLogShowHide)
}}},_fnLogShowHide:function(a){a=a||window.event;var c=a.keyCode||a.which;var b=String.fromCharCode(c).toLowerCase();
if(a.ctrlKey&&a.shiftKey&&b=="l"){alert("target key store detected "+a.shiftKey+" "+b+" "+c)
}}};var jsCore=new JSCore();jsCore.bAvailable=true;if(typeof DesignCore!="undefined"){DesignCore=undefined
}var DesignCore={fnCreateBox:function(a){var b=document.createElement("div");b.setAttribute("style","position: absolute; ");
if(typeof a.sPosition!="undefined"){if(a.sPosition=="fixed"&&document.all&&!window.opera&&typeof document.body.style.maxHeight=="undefined"){b.style.position="absolute"
}else{b.style.position=a.sPosition}}else{b.style.position="absolute"}typeof a.sId!="undefined"?b.setAttribute("id",a.sId):null;
typeof a.sClass!="undefined"?b.className=a.sClass:null;typeof a.sBackgroundColour!="undefined"?b.style.backgroundColor=a.sBackgroundColour:null;
typeof a.sColour!="undefined"?b.style.color=a.sColour:null;typeof a.sColour!="undefined"?b.style.color=a.sColour:null;
typeof a.sTop!="undefined"?b.style.top=a.sTop:null;typeof a.sRight!="undefined"?b.style.right=a.sRight:null;
typeof a.sBottom!="undefined"?b.style.bottom=a.sBottom:null;typeof a.sLeft!="undefined"?b.style.left=a.sLeft:null;
if(typeof a.sTop=="undefined"||typeof a.sBottom=="undefined"){typeof a.sHeight!="undefined"?b.style.height=a.sHeight:null;
if(a.sHeight=="1px"){b.style.overflow="hidden"}}if(typeof a.sLeft=="undefined"||typeof a.sRight=="undefined"){typeof a.sWidth!="undefined"?b.style.width=a.sWidth:null
}typeof a.sMarginTop!="undefined"?b.style.marginTop=a.sMarginTop:null;typeof a.sMarginRight!="undefined"?b.style.marginRight=a.sMarginRight:null;
typeof a.sMarginBottom!="undefined"?b.style.marginBottom=a.sMarginBottom:null;typeof a.sMarginLeft!="undefined"?b.style.marginLeft=a.sMarginLeft:null;
typeof a.sPadding!="undefined"?b.style.padding=a.sPadding:null;typeof a.iZIndex!="undefined"?b.style.zIndex=a.iZIndex:null;
if(typeof a.fOpacity!="undefined"){typeof b.style.filter=="string"?b.style.filter="alpha(opacity="+a.fOpacity*100+")":b.style.opacity=a.fOpacity
}return b},fnGetPos:function(b){var c=0;var a=0;if(b.offsetParent){c=b.offsetLeft;
a=b.offsetTop;while(b=b.offsetParent){c+=b.offsetLeft;a+=b.offsetTop}}return[c,a]
},fnPageX:function(a){iX=a.pageX?a.pageX:a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
return iX},fnPageY:function(a){iY=a.pageY?a.pageY:a.clientY+document.body.scrollTop+document.documentElement.scrollTop;
return iY},fnGetElementFromEvent:function(a){var b;if(!a){var a=window.event}if(a==null){return null
}if(a.target){b=a.target}else{if(a.srcElement){b=a.srcElement}}if(b.nodeType==3){b=b.parentNode
}return(b)},fnGetElementsByClassName:function(g,e,d){if(e==null){e="*"}if(d==null){d=document
}var b=new Array();var h=new RegExp("\\b"+g+"\\b");var a=d.getElementsByTagName(e);
for(var f=0,c=a.length;f<c;f++){if(h.test(a[f].className)){b.push(a[f])}}return(b)
},fnSetSelectColourDisplay:function(a,b){var d=b.getElementsByTagName("div");var c=this.fnGetElementsByClassName("colour_selected","div",b);
if(c[0]){c[0].className="colour "+(c[0].className.split(" ")[1])}switch(a){case"#000000":case"rgb(0, 0, 0)":d[0].className="colour_selected c1";
break;case"#BF0303":case"#bf0303":case"rgb(191, 3, 3)":d[1].className="colour_selected c2";
break;case"#BF0361":case"#bf0361":case"rgb(191, 3, 97)":d[2].className="colour_selected c3";
break;case"#85026C":case"#85026c":case"rgb(133, 2, 108)":d[3].className="colour_selected c4";
break;case"#34176E":case"#34176e":case"rgb(52, 23, 110)":d[4].className="colour_selected c5";
break;case"#00438A":case"#00438a":case"rgb(0, 67, 138)":d[5].className="colour_selected c6";
break;case"#006066":case"rgb(0, 96, 102)":d[6].className="colour_selected c7";break;
case"#00734D":case"#00734d":case"rgb(0, 115, 77)":d[7].className="colour_selected c8";
break;case"#00892C":case"#00892c":case"rgb(0, 137, 44)":d[8].className="colour_selected c9";
break;case"#F3C300":case"#f3c300":case"rgb(243, 195, 0)":d[9].className="colour_selected c10";
break;case"#888A85":case"#888a85":case"rgb(136, 138, 133)":d[10].className="colour_selected c11";
break;case"#FFFFFF":case"#ffffff":case"rgb(255, 255, 255)":d[11].className="colour_selected c12";
break;default:console.log("Unkown colour: "+a);break}},fnGetSliderValue:function(b){var a=b.parentNode.offsetWidth-b.offsetWidth;
return(b.style.left.split("px")[0]/a)},fnSetSliderValue:function(c,b){var a=c.parentNode.offsetWidth-c.offsetWidth;
c.style.left=(a*b)+"px"},fnCreateCookie:function(b,e){var d=365;var a=new Date();
a.setTime(a.getTime()+(d*24*60*60*1000));var c="; expires="+a.toGMTString();document.cookie=b+"="+e+c+"; path=/"
},fnReadCookie:function(e){var a=e+"=";var d=document.cookie.split(";");for(var b=0;
b<d.length;b++){var f=d[b];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(a)==0){return f.substring(a.length,f.length)
}}return null},fnGetStyle:function(a,b){if(a.nodeName=="SCRIPT"){return""}var c="";
if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(d,e){return e.toUpperCase()
});c=a.currentStyle[b]}}return c},toJsonString:function(a){return this.toJsonStringArray(a).join("")
},toJsonStringArray:function(a,c){c=c||new Array();var b;switch(typeof a){case"object":if(a){if(a.constructor==Array){c.push("[");
for(var d=0;d<a.length;++d){if(d>0){c.push(",")}this.toJsonStringArray(a[d],c)}c.push("]");
return c}else{if(typeof a.toString!="undefined"){c.push("{");var f=true;for(var d in a){var e=c.length;
if(!f){c.push(",")}this.toJsonStringArray(d,c);c.push(":");this.toJsonStringArray(a[d],c);
if(c[c.length-1]==b){c.splice(e,c.length-e)}else{f=false}}c.push("}");return c}}return c
}c.push("null");return c;case"unknown":case"undefined":case"function":c.push(b);return c;
case"string":c.push('"');c.push(a.replace(/(["\\])/g,"\\$1").replace(/\r/g,"").replace(/\n/g,"\\n"));
c.push('"');return c;default:c.push(String(a));return c}}};if(typeof Juampi!="undefined"){Juampi=undefined
}var Juampi={oFirstClick:null,oSecondClick:null,_oDrag:{nTarget:null,iNodeStartX:null,iNodeStartY:null,iMouseStartX:null,iMouseStartY:null},oState:{sX:"50px",sY:"40px"},nDisplayTriangle:null,sColour:"blue",fnInit:function(){this.iBodyHeight=document.body.offsetHeight;
this.iBodyWidth=document.body.offsetWidth;this.iViewportHeight=document.documentElement.clientHeight;
this.iViewportWidth=document.documentElement.clientWidth;this.iContainerHeight=this.iViewportHeight>this.iBodyHeight?this.iViewportHeight:this.iBodyHeight;
jsCore.addListener({mElement:document,sType:"mousedown",fnCallback:this.fnMouseClick,oObj:this,mScope:true,sLabel:"Regla"});
var a=this.fnGetState();if(a!=null){this.oState=a}this.fnDrawHtml();document.body.style.cursor="crosshair";
document.body.ondrag=function(){return false};document.body.onselectstart=function(){return false
};jsCore.addListener({mElement:window,sType:"resize",fnCallback:function(){Juampi.fnReInit.call(Juampi)
},sLabel:"Regla"})},fnClose:function(){if(typeof Design!="undefined"){document.getElementById("JuampiSwitch").className="level2";
Design.oState.bJuampi=false;Design.fnSaveState()}if(this.nDisplayTriangle!=null){document.body.removeChild(this.nDisplayTriangle);
document.body.removeChild(this.nDisplayHoriz);document.body.removeChild(this.nDisplayVert)
}document.body.style.cursor="auto";jsCore.removeListener({sLabel:"Regla"});try{document.body.removeChild(this.nCanvas)
}catch(a){}try{document.body.removeChild(this.nFirstClickIndicator)}catch(a){}document.body.removeChild(this.nInfo);
Juampi=undefined},fnReInit:function(){this.iBodyHeight=document.body.offsetHeight;this.iBodyWidth=document.body.offsetWidth;
this.iViewportHeight=document.documentElement.clientHeight;this.iViewportWidth=document.documentElement.clientWidth;
this.iContainerHeight=this.iViewportHeight>this.iBodyHeight?this.iViewportHeight:this.iBodyHeight
},fnSaveState:function(){DesignCore.fnCreateCookie("SpryMediaUK_Juampi",DesignCore.toJsonString(this.oState))
},fnGetState:function(){try{var oObj=eval("("+DesignCore.fnReadCookie("SpryMediaUK_Juampi")+")");
return oObj}catch(err){return null}},fnMouseClick:function(b){var c=DesignCore.fnGetElementFromEvent(b);
var a=c.getAttribute("id");b.preventDefault?b.preventDefault():b.returnValue=false;
if(a=="JuampiInfo_Close"){this.fnClose();return}else{if(a=="JuampiInfo_DragHandle"){this._oDrag.nTarget=this.nInfo;
this._oDrag.iNodeStartX=this._oDrag.nTarget.offsetLeft;this._oDrag.iNodeStartY=this._oDrag.nTarget.offsetTop;
this._oDrag.iMouseStartX=b.clientX;this._oDrag.iMouseStartY=b.clientY;jsCore.addListener({mElement:document,sType:"mouseup",fnCallback:this.fnDragHandleRelease,oObj:this,mScope:true,sLabel:"Regla"});
jsCore.addListener({mElement:document,sType:"mousemove",fnCallback:this.fnDragHandleMove,oObj:this,mScope:true,sLabel:"Regla"});
return}else{if(this.fnDesignElement(c)===true){return}else{if(this.nDisplayTriangle!=null){document.body.removeChild(this.nDisplayTriangle);
document.body.removeChild(this.nDisplayHoriz);document.body.removeChild(this.nDisplayVert)
}else{document.getElementById("JuampiInfo_Info").style.display="none";document.getElementById("JuampiInfo_Difference").style.display="block"
}this.oInfoNodes.nDiff.innerHTML="0px";this.oInfoNodes.nDiffX.innerHTML="0px";this.oInfoNodes.nDiffY.innerHTML="0px";
this._oDrag.iMouseStartX=b.clientX;this._oDrag.iMouseStartY=b.clientY;this.nDisplayTriangle=DesignCore.fnCreateBox({sTop:b.clientY+"px",sLeft:b.clientX+"px",sWidth:"0px",sHeight:"0px",fOpacity:0.3});
this.nDisplayHoriz=DesignCore.fnCreateBox({sId:"JuampiRuleHoriz",sTop:(b.clientY-5)+"px",sLeft:b.clientX+"px",sWidth:"0px",sHeight:"11px"});
this.nDisplayVert=DesignCore.fnCreateBox({sId:"JuampiRuleVert",sTop:b.clientY+"px",sLeft:(b.clientX-5)+"px",sWidth:"11px",sHeight:"0px"});
this.nDisplayTriangle.style.borderStyle="solid";this.nDisplayTriangle.style.borderColor=this.sColour;
this.nDisplayTriangle.style.borderWidth="0px";document.body.appendChild(this.nDisplayTriangle);
document.body.appendChild(this.nDisplayHoriz);document.body.appendChild(this.nDisplayVert);
jsCore.addListener({mElement:document,sType:"mouseup",fnCallback:this.fnMouseUp,oObj:this,mScope:true,sLabel:"Regla"});
jsCore.addListener({mElement:document,sType:"mousemove",fnCallback:this.fnMouseMove,oObj:this,mScope:true,sLabel:"Regla"})
}}}},fnMouseUp:function(a){jsCore.removeListener({mElement:document,sType:"mouseup",fnCallback:this.fnMouseUp});
jsCore.removeListener({mElement:document,sType:"mousemove",fnCallback:this.fnMouseMove})
},fnMouseMove:function(f){var b=f.clientX-this._oDrag.iMouseStartX;var d=f.clientY-this._oDrag.iMouseStartY;
var a=f.keyCode?f.keyCode:f.which;var g=f.shiftKey;var c=Math.atan(d/b)*(180/Math.PI);
if(b>0&&d<0){c=c*-1}else{if(b<0&&d<0){c=180-c}else{if(b<0&&d>0){c=180+(c*-1)}else{if(b>0&&d>0){c=360-c
}}}}if(g){if(c<=22.5||(c>=157.5&&c<=202.5)||c>=337.5){d=0}else{if((c>=67.5&&c<=112.5)||(c>=247.5&&c<=292.5)){b=0
}else{if(c>22.5&&c<67.5){Math.abs(b)>Math.abs(d)?d=b*-1:b=d*-1}else{if(c>112.5&&c<157.5){Math.abs(b)>Math.abs(d)?d=b:b=d
}else{if(c>202.5&&c<257.5){Math.abs(b)>Math.abs(d)?d=b*-1:b=d*-1}else{if(c>292.5&&c<337.5){Math.abs(b)>Math.abs(d)?d=b:b=d
}}}}}}}this.oInfoNodes.nDiff.innerHTML=parseInt(Math.sqrt((b*b)+(d*d))*10)/10+"px";
this.oInfoNodes.nDiffX.innerHTML=Math.abs(b)+"px";this.oInfoNodes.nDiffY.innerHTML=Math.abs(d)+"px";
if(b>=0&&d<=0){this.nDisplayTriangle.style.left=this._oDrag.iMouseStartX+"px";this.nDisplayTriangle.style.top=(this._oDrag.iMouseStartY+d)+"px";
this.nDisplayTriangle.style.borderTopWidth=(d*-1)+"px";this.nDisplayTriangle.style.borderRightWidth=b+"px";
this.nDisplayTriangle.style.borderBottomWidth="0px";this.nDisplayTriangle.style.borderLeftWidth="0px";
this.nDisplayTriangle.style.borderTopColor="transparent";this.nDisplayTriangle.style.borderRightColor=this.sColour;
this.nDisplayTriangle.style.borderBottomColor="transparent";this.nDisplayTriangle.style.borderLeftColor="transparent"
}else{if(b>=0&&d>=0){this.nDisplayTriangle.style.left=this._oDrag.iMouseStartX+"px";
this.nDisplayTriangle.style.top=this._oDrag.iMouseStartY+"px";this.nDisplayTriangle.style.borderTopWidth=d+"px";
this.nDisplayTriangle.style.borderRightWidth="0px";this.nDisplayTriangle.style.borderBottomWidth="0px";
this.nDisplayTriangle.style.borderLeftWidth=b+"px";this.nDisplayTriangle.style.borderTopColor=this.sColour;
this.nDisplayTriangle.style.borderRightColor="transparent";this.nDisplayTriangle.style.borderBottomColor="transparent";
this.nDisplayTriangle.style.borderLeftColor="transparent"}else{if(b<=0&&d>=0){this.nDisplayTriangle.style.left=(this._oDrag.iMouseStartX+b)+"px";
this.nDisplayTriangle.style.top=this._oDrag.iMouseStartY+"px";this.nDisplayTriangle.style.borderTopWidth="0px";
this.nDisplayTriangle.style.borderRightWidth="0px";this.nDisplayTriangle.style.borderBottomWidth=d+"px";
this.nDisplayTriangle.style.borderLeftWidth=(b*-1)+"px";this.nDisplayTriangle.style.borderTopColor="transparent";
this.nDisplayTriangle.style.borderRightColor="transparent";this.nDisplayTriangle.style.borderBottomColor="transparent";
this.nDisplayTriangle.style.borderLeftColor=this.sColour}else{if(b<=0&&d<=0){this.nDisplayTriangle.style.left=(this._oDrag.iMouseStartX+b)+"px";
this.nDisplayTriangle.style.top=(this._oDrag.iMouseStartY+d)+"px";this.nDisplayTriangle.style.borderTopWidth=(d*-1)+"px";
this.nDisplayTriangle.style.borderRightWidth="0px";this.nDisplayTriangle.style.borderBottomWidth="0px";
this.nDisplayTriangle.style.borderLeftWidth=(b*-1)+"px";this.nDisplayTriangle.style.borderTopColor="transparent";
this.nDisplayTriangle.style.borderRightColor="transparent";this.nDisplayTriangle.style.borderBottomColor="transparent";
this.nDisplayTriangle.style.borderLeftColor=this.sColour}}}}if(b>=0){this.nDisplayHoriz.style.marginLeft="0px";
this.nDisplayHoriz.style.width=(b==0?1:b)+"px";this.nDisplayHoriz.style.backgroundPosition="center left"
}else{this.nDisplayHoriz.style.marginLeft=b+"px";this.nDisplayHoriz.style.width=(b==0?1:(b*-1))+"px";
this.nDisplayHoriz.style.backgroundPosition="center right"}if(d>=0){this.nDisplayVert.style.marginTop="0px";
this.nDisplayVert.style.height=d+"px";this.nDisplayVert.style.left=(this._oDrag.iMouseStartX+b-5)+"px";
this.nDisplayVert.style.backgroundPosition="top center"}else{this.nDisplayVert.style.marginTop=d+"px";
this.nDisplayVert.style.height=((d*-1)+1)+"px";this.nDisplayVert.style.left=(this._oDrag.iMouseStartX+b-5)+"px";
this.nDisplayVert.style.backgroundPosition="bottom center"}},fnDragHandleMove:function(a){this._oDrag.nTarget.style.left=(this._oDrag.iNodeStartX+a.clientX-this._oDrag.iMouseStartX)+"px";
this._oDrag.nTarget.style.top=(this._oDrag.iNodeStartY+a.clientY-this._oDrag.iMouseStartY)+"px"
},fnDragHandleRelease:function(a){jsCore.removeListener({mElement:document,sType:"mouseup",fnCallback:this.fnDragHandleRelease});
jsCore.removeListener({mElement:document,sType:"mousemove",fnCallback:this.fnDragHandleMove});
this.oState.sY=this.nInfo.style.top;this.oState.sX=this.nInfo.style.left;this.fnSaveState()
},fnDrawHtml:function(){this.nInfo=DesignCore.fnCreateBox({sId:"JuampiInfo",sClass:"SpryMedia_Design",sPosition:"fixed",sTop:this.oState.sY,sLeft:this.oState.sX});
document.body.insertBefore(this.nInfo,document.body.childNodes[0]);var c='			<div class="level1">				<div id="JuampiInfo_DragHandle"></div>				<div id="JuampiInfo_Close"></div>				<div id="JuampiInfo_Measurement" class="level2">					<div id="JuampiInfo_Info" class="level3">						<div class="level4">							<div class="level5">								<div id="JuampiInfo_InfoMessage" class="center">Haga click y arrastre entre las dos puntas a medir</div>								<div class="clear"></div>								<div class="level6"></div>							</div>						</div>					</div>										<div id="JuampiInfo_Difference" class="level3">						<div class="level4">							<div class="level5">								<div class="split1">Diferencia</div>								<div id="JuampiInfo_Diff" class="split2">0px</div>								<div class="clear"></div>																<div class="split1">Ancho</div>								<div id="JuampiInfo_XDiff" class="split2">0px</div>								<div class="clear"></div>																<div class="split1">Alto</div>								<div id="JuampiInfo_YDiff" class="split2">0px</div>								<div class="clear"></div>																<div class="clear"></div>								<div class="level6"></div>							</div>						</div>					</div>				</div>			</div>';
this.nInfo.innerHTML=c;if(navigator.userAgent.indexOf("WebKit")!=-1){var b=RegExp("( AppleWebKit/)([^.+ ]+)").exec(navigator.userAgent);
var a=b[2].split(".")[0]*1;if(a<523){this.nInfo.style.position="absolute"}}this.oInfoNodes={nDiffBlock:document.getElementById("JuampiInfo_Difference"),nDiff:document.getElementById("JuampiInfo_Diff"),nDiffX:document.getElementById("JuampiInfo_XDiff"),nDiffY:document.getElementById("JuampiInfo_YDiff")}
},fnDesignElement:function(a){while(a.parentNode){if(a.className=="SpryMedia_Design"){return true
}a=a.parentNode}return false}};Juampi.fnInit();if(document.getElementById("LoadingJuampi")){document.getElementById("LoadingJuampi").parentNode.removeChild(document.getElementById("LoadingJuampi"))
};