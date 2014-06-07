// Copyright (c) 2014, summivox. (MIT Licensed)
// ==UserScript==
// @name          renren-markdown
// @namespace     http://github.com/smilekzs
// @version       1.2.0
// @description   Powerful markdown-based editor for blog.renren.com
// @grant         GM_xmlhttpRequest
// @match         *://blog.renren.com/blog/*Blog*
// @match         *://blog.renren.com/blog/*edit*
// @match         *://blog.renren.com/*Entry*
// ==/UserScript==
// vim: set nowrap ft= : 

// http://stackoverflow.com/questions/4190442/run-greasemonkey-script-only-once-per-page-load
if (window.top != window.self) return;  //don't run on frames or iframes

/*!
  html2canvas 0.4.0 <http://html2canvas.hertzen.com>
  Copyright (c) 2013 Niklas von Hertzen (@niklasvh)

  Released under MIT License
*/
!function(window,document,undefined){"use strict";function h2clog(a){_html2canvas.logging&&window.console&&window.console.log&&window.console.log(a)}function backgroundBoundsFactory(prop,el,bounds,image,imageIndex,backgroundSize){var topPos,left,percentage,val,bgposition=_html2canvas.Util.getCSS(el,prop,imageIndex);if(1===bgposition.length&&(val=bgposition[0],bgposition=[],bgposition[0]=val,bgposition[1]=val),-1!==bgposition[0].toString().indexOf("%"))percentage=parseFloat(bgposition[0])/100,left=bounds.width*percentage,"backgroundSize"!==prop&&(left-=(backgroundSize||image).width*percentage);else if("backgroundSize"===prop)if("auto"===bgposition[0])left=image.width;else if(bgposition[0].match(/contain|cover/)){var resized=_html2canvas.Util.resizeBounds(image.width,image.height,bounds.width,bounds.height,bgposition[0]);left=resized.width,topPos=resized.height}else left=parseInt(bgposition[0],10);else left=parseInt(bgposition[0],10);return"auto"===bgposition[1]?topPos=left/image.width*image.height:-1!==bgposition[1].toString().indexOf("%")?(percentage=parseFloat(bgposition[1])/100,topPos=bounds.height*percentage,"backgroundSize"!==prop&&(topPos-=(backgroundSize||image).height*percentage)):topPos=parseInt(bgposition[1],10),[left,topPos]}function h2cRenderContext(width,height){var storage=[];return{storage:storage,width:width,height:height,clip:function(){storage.push({type:"function",name:"clip",arguments:arguments})},translate:function(){storage.push({type:"function",name:"translate",arguments:arguments})},fill:function(){storage.push({type:"function",name:"fill",arguments:arguments})},save:function(){storage.push({type:"function",name:"save",arguments:arguments})},restore:function(){storage.push({type:"function",name:"restore",arguments:arguments})},fillRect:function(){storage.push({type:"function",name:"fillRect",arguments:arguments})},createPattern:function(){storage.push({type:"function",name:"createPattern",arguments:arguments})},drawShape:function(){var shape=[];return storage.push({type:"function",name:"drawShape",arguments:shape}),{moveTo:function(){shape.push({name:"moveTo",arguments:arguments})},lineTo:function(){shape.push({name:"lineTo",arguments:arguments})},arcTo:function(){shape.push({name:"arcTo",arguments:arguments})},bezierCurveTo:function(){shape.push({name:"bezierCurveTo",arguments:arguments})},quadraticCurveTo:function(){shape.push({name:"quadraticCurveTo",arguments:arguments})}}},drawImage:function(){storage.push({type:"function",name:"drawImage",arguments:arguments})},fillText:function(){storage.push({type:"function",name:"fillText",arguments:arguments})},setVariable:function(variable,value){storage.push({type:"variable",name:variable,arguments:value})}}}function h2czContext(zindex){return{zindex:zindex,children:[]}}var previousElement,computedCSS,_html2canvas={};_html2canvas.Util={},_html2canvas.Util.trimText=function(isNative){return function(input){return isNative?isNative.apply(input):((input||"")+"").replace(/^\s+|\s+$/g,"")}}(String.prototype.trim),_html2canvas.Util.parseBackgroundImage=function(value){var method,definition,prefix,prefix_i,block,c,quote,args,whitespace=" \r\n	",results=[],mode=0,numParen=0,appendResult=function(){method&&('"'===definition.substr(0,1)&&(definition=definition.substr(1,definition.length-2)),definition&&args.push(definition),"-"===method.substr(0,1)&&(prefix_i=method.indexOf("-",1)+1)>0&&(prefix=method.substr(0,prefix_i),method=method.substr(prefix_i)),results.push({prefix:prefix,method:method.toLowerCase(),value:block,args:args})),args=[],method=prefix=definition=block=""};appendResult();for(var i=0,ii=value.length;ii>i;i++)if(c=value[i],!(0===mode&&whitespace.indexOf(c)>-1)){switch(c){case'"':quote?quote===c&&(quote=null):quote=c;break;case"(":if(quote)break;if(0===mode){mode=1,block+=c;continue}numParen++;break;case")":if(quote)break;if(1===mode){if(0===numParen){mode=0,block+=c,appendResult();continue}numParen--}break;case",":if(quote)break;if(0===mode){appendResult();continue}if(1===mode&&0===numParen&&!method.match(/^url$/i)){args.push(definition),definition="",block+=c;continue}}block+=c,0===mode?method+=c:definition+=c}return appendResult(),results},_html2canvas.Util.Bounds=function(el){var clientRect,bounds={};return el.getBoundingClientRect?(clientRect=el.getBoundingClientRect(),bounds.top=clientRect.top,bounds.bottom=clientRect.bottom||clientRect.top+clientRect.height,bounds.left=clientRect.left,bounds.width=clientRect.width||clientRect.right-clientRect.left,bounds.height=clientRect.height||clientRect.bottom-clientRect.top,bounds):void 0},_html2canvas.Util.getCSS=function(el,attribute,index){function toPX(attribute,val){var left,rsLeft=el.runtimeStyle&&el.runtimeStyle[attribute],style=el.style;return!/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(val)&&/^-?\d/.test(val)&&(left=style.left,rsLeft&&(el.runtimeStyle.left=el.currentStyle.left),style.left="fontSize"===attribute?"1em":val||0,val=style.pixelLeft+"px",style.left=left,rsLeft&&(el.runtimeStyle.left=rsLeft)),/^(thin|medium|thick)$/i.test(val)?val:Math.round(parseFloat(val))+"px"}var val,isBackgroundSizePosition=attribute.match(/^background(Size|Position)$/);if(previousElement!==el&&(computedCSS=document.defaultView.getComputedStyle(el,null)),val=computedCSS[attribute],isBackgroundSizePosition)if(val=(val||"").split(","),val=val[index||0]||val[0]||"auto",val=_html2canvas.Util.trimText(val).split(" "),"backgroundSize"!==attribute||val[0]&&!val[0].match(/cover|contain|auto/)){if(val[0]=-1===val[0].indexOf("%")?toPX(attribute+"X",val[0]):val[0],val[1]===undefined){if("backgroundSize"===attribute)return val[1]="auto",val;val[1]=val[0]}val[1]=-1===val[1].indexOf("%")?toPX(attribute+"Y",val[1]):val[1]}else;else if(/border(Top|Bottom)(Left|Right)Radius/.test(attribute)){var arr=val.split(" ");arr.length<=1&&(arr[1]=arr[0]),arr[0]=parseInt(arr[0],10),arr[1]=parseInt(arr[1],10),val=arr}return val},_html2canvas.Util.resizeBounds=function(current_width,current_height,target_width,target_height,stretch_mode){var output_width,output_height,target_ratio=target_width/target_height,current_ratio=current_width/current_height;return stretch_mode&&"auto"!==stretch_mode?current_ratio>target_ratio^"contain"===stretch_mode?(output_height=target_height,output_width=target_height*current_ratio):(output_width=target_width,output_height=target_width/current_ratio):(output_width=target_width,output_height=target_height),{width:output_width,height:output_height}},_html2canvas.Util.BackgroundPosition=function(el,bounds,image,imageIndex,backgroundSize){var result=backgroundBoundsFactory("backgroundPosition",el,bounds,image,imageIndex,backgroundSize);return{left:result[0],top:result[1]}},_html2canvas.Util.BackgroundSize=function(el,bounds,image,imageIndex){var result=backgroundBoundsFactory("backgroundSize",el,bounds,image,imageIndex);return{width:result[0],height:result[1]}},_html2canvas.Util.Extend=function(options,defaults){for(var key in options)options.hasOwnProperty(key)&&(defaults[key]=options[key]);return defaults},_html2canvas.Util.Children=function(elem){var children;try{children=elem.nodeName&&"IFRAME"===elem.nodeName.toUpperCase()?elem.contentDocument||elem.contentWindow.document:function(array){var ret=[];return null!==array&&function(first,second){var i=first.length,j=0;if("number"==typeof second.length)for(var l=second.length;l>j;j++)first[i++]=second[j];else for(;second[j]!==undefined;)first[i++]=second[j++];return first.length=i,first}(ret,array),ret}(elem.childNodes)}catch(ex){h2clog("html2canvas.Util.Children failed with exception: "+ex.message),children=[]}return children},_html2canvas.Util.Font=function(){var fontData={};return function(font,fontSize,doc){if(fontData[font+"-"+fontSize]!==undefined)return fontData[font+"-"+fontSize];var baseline,middle,metricsObj,container=doc.createElement("div"),img=doc.createElement("img"),span=doc.createElement("span"),sampleText="Hidden Text";return container.style.visibility="hidden",container.style.fontFamily=font,container.style.fontSize=fontSize,container.style.margin=0,container.style.padding=0,doc.body.appendChild(container),img.src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=",img.width=1,img.height=1,img.style.margin=0,img.style.padding=0,img.style.verticalAlign="baseline",span.style.fontFamily=font,span.style.fontSize=fontSize,span.style.margin=0,span.style.padding=0,span.appendChild(doc.createTextNode(sampleText)),container.appendChild(span),container.appendChild(img),baseline=img.offsetTop-span.offsetTop+1,container.removeChild(span),container.appendChild(doc.createTextNode(sampleText)),container.style.lineHeight="normal",img.style.verticalAlign="super",middle=img.offsetTop-container.offsetTop+1,metricsObj={baseline:baseline,lineWidth:1,middle:middle},fontData[font+"-"+fontSize]=metricsObj,doc.body.removeChild(container),metricsObj}}(),function(){_html2canvas.Generate={};var reGradients=[/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,/^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,/^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,/^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/];_html2canvas.Generate.parseGradient=function(css,bounds){var gradient,i,m1,stop,m2,m2Len,step,m3,tl,tr,br,bl,len=reGradients.length;for(i=0;len>i&&!(m1=css.match(reGradients[i]));i+=1);if(m1)switch(m1[1]){case"-webkit-linear-gradient":case"-o-linear-gradient":if(gradient={type:"linear",x0:null,y0:null,x1:null,y1:null,colorStops:[]},m2=m1[2].match(/\w+/g))for(m2Len=m2.length,i=0;m2Len>i;i+=1)switch(m2[i]){case"top":gradient.y0=0,gradient.y1=bounds.height;break;case"right":gradient.x0=bounds.width,gradient.x1=0;break;case"bottom":gradient.y0=bounds.height,gradient.y1=0;break;case"left":gradient.x0=0,gradient.x1=bounds.width}if(null===gradient.x0&&null===gradient.x1&&(gradient.x0=gradient.x1=bounds.width/2),null===gradient.y0&&null===gradient.y1&&(gradient.y0=gradient.y1=bounds.height/2),m2=m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))for(m2Len=m2.length,step=1/Math.max(m2Len-1,1),i=0;m2Len>i;i+=1)m3=m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/),m3[2]?(stop=parseFloat(m3[2]),stop/="%"===m3[3]?100:bounds.width):stop=i*step,gradient.colorStops.push({color:m3[1],stop:stop});break;case"-webkit-gradient":if(gradient={type:"radial"===m1[2]?"circle":m1[2],x0:0,y0:0,x1:0,y1:0,colorStops:[]},m2=m1[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/),m2&&(gradient.x0=m2[1]*bounds.width/100,gradient.y0=m2[2]*bounds.height/100,gradient.x1=m2[3]*bounds.width/100,gradient.y1=m2[4]*bounds.height/100),m2=m1[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g))for(m2Len=m2.length,i=0;m2Len>i;i+=1)m3=m2[i].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/),stop=parseFloat(m3[2]),"from"===m3[1]&&(stop=0),"to"===m3[1]&&(stop=1),gradient.colorStops.push({color:m3[3],stop:stop});break;case"-moz-linear-gradient":if(gradient={type:"linear",x0:0,y0:0,x1:0,y1:0,colorStops:[]},m2=m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/),m2&&(gradient.x0=m2[1]*bounds.width/100,gradient.y0=m2[2]*bounds.height/100,gradient.x1=bounds.width-gradient.x0,gradient.y1=bounds.height-gradient.y0),m2=m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g))for(m2Len=m2.length,step=1/Math.max(m2Len-1,1),i=0;m2Len>i;i+=1)m3=m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/),m3[2]?(stop=parseFloat(m3[2]),m3[3]&&(stop/=100)):stop=i*step,gradient.colorStops.push({color:m3[1],stop:stop});break;case"-webkit-radial-gradient":case"-moz-radial-gradient":case"-o-radial-gradient":if(gradient={type:"circle",x0:0,y0:0,x1:bounds.width,y1:bounds.height,cx:0,cy:0,rx:0,ry:0,colorStops:[]},m2=m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/),m2&&(gradient.cx=m2[1]*bounds.width/100,gradient.cy=m2[2]*bounds.height/100),m2=m1[3].match(/\w+/),m3=m1[4].match(/[a-z\-]*/),m2&&m3)switch(m3[0]){case"farthest-corner":case"cover":case"":tl=Math.sqrt(Math.pow(gradient.cx,2)+Math.pow(gradient.cy,2)),tr=Math.sqrt(Math.pow(gradient.cx,2)+Math.pow(gradient.y1-gradient.cy,2)),br=Math.sqrt(Math.pow(gradient.x1-gradient.cx,2)+Math.pow(gradient.y1-gradient.cy,2)),bl=Math.sqrt(Math.pow(gradient.x1-gradient.cx,2)+Math.pow(gradient.cy,2)),gradient.rx=gradient.ry=Math.max(tl,tr,br,bl);break;case"closest-corner":tl=Math.sqrt(Math.pow(gradient.cx,2)+Math.pow(gradient.cy,2)),tr=Math.sqrt(Math.pow(gradient.cx,2)+Math.pow(gradient.y1-gradient.cy,2)),br=Math.sqrt(Math.pow(gradient.x1-gradient.cx,2)+Math.pow(gradient.y1-gradient.cy,2)),bl=Math.sqrt(Math.pow(gradient.x1-gradient.cx,2)+Math.pow(gradient.cy,2)),gradient.rx=gradient.ry=Math.min(tl,tr,br,bl);break;case"farthest-side":"circle"===m2[0]?gradient.rx=gradient.ry=Math.max(gradient.cx,gradient.cy,gradient.x1-gradient.cx,gradient.y1-gradient.cy):(gradient.type=m2[0],gradient.rx=Math.max(gradient.cx,gradient.x1-gradient.cx),gradient.ry=Math.max(gradient.cy,gradient.y1-gradient.cy));break;case"closest-side":case"contain":"circle"===m2[0]?gradient.rx=gradient.ry=Math.min(gradient.cx,gradient.cy,gradient.x1-gradient.cx,gradient.y1-gradient.cy):(gradient.type=m2[0],gradient.rx=Math.min(gradient.cx,gradient.x1-gradient.cx),gradient.ry=Math.min(gradient.cy,gradient.y1-gradient.cy))}if(m2=m1[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))for(m2Len=m2.length,step=1/Math.max(m2Len-1,1),i=0;m2Len>i;i+=1)m3=m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/),m3[2]?(stop=parseFloat(m3[2]),stop/="%"===m3[3]?100:bounds.width):stop=i*step,gradient.colorStops.push({color:m3[1],stop:stop})}return gradient},_html2canvas.Generate.Gradient=function(src,bounds){if(0!==bounds.width&&0!==bounds.height){var gradient,grad,i,len,canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");if(canvas.width=bounds.width,canvas.height=bounds.height,gradient=_html2canvas.Generate.parseGradient(src,bounds))if("linear"===gradient.type){for(grad=ctx.createLinearGradient(gradient.x0,gradient.y0,gradient.x1,gradient.y1),i=0,len=gradient.colorStops.length;len>i;i+=1)try{grad.addColorStop(gradient.colorStops[i].stop,gradient.colorStops[i].color)}catch(e){h2clog(["failed to add color stop: ",e,"; tried to add: ",gradient.colorStops[i],"; stop: ",i,"; in: ",src])}ctx.fillStyle=grad,ctx.fillRect(0,0,bounds.width,bounds.height)}else if("circle"===gradient.type){for(grad=ctx.createRadialGradient(gradient.cx,gradient.cy,0,gradient.cx,gradient.cy,gradient.rx),i=0,len=gradient.colorStops.length;len>i;i+=1)try{grad.addColorStop(gradient.colorStops[i].stop,gradient.colorStops[i].color)}catch(e){h2clog(["failed to add color stop: ",e,"; tried to add: ",gradient.colorStops[i],"; stop: ",i,"; in: ",src])}ctx.fillStyle=grad,ctx.fillRect(0,0,bounds.width,bounds.height)}else if("ellipse"===gradient.type){var canvasRadial=document.createElement("canvas"),ctxRadial=canvasRadial.getContext("2d"),ri=Math.max(gradient.rx,gradient.ry),di=2*ri;for(canvasRadial.width=canvasRadial.height=di,grad=ctxRadial.createRadialGradient(gradient.rx,gradient.ry,0,gradient.rx,gradient.ry,ri),i=0,len=gradient.colorStops.length;len>i;i+=1)try{grad.addColorStop(gradient.colorStops[i].stop,gradient.colorStops[i].color)}catch(e){h2clog(["failed to add color stop: ",e,"; tried to add: ",gradient.colorStops[i],"; stop: ",i,"; in: ",src])}ctxRadial.fillStyle=grad,ctxRadial.fillRect(0,0,di,di),ctx.fillStyle=gradient.colorStops[i-1].color,ctx.fillRect(0,0,canvas.width,canvas.height),ctx.drawImage(canvasRadial,gradient.cx-gradient.rx,gradient.cy-gradient.ry,2*gradient.rx,2*gradient.ry)}return canvas}},_html2canvas.Generate.ListAlpha=function(number){var modulus,tmp="";do modulus=number%26,tmp=String.fromCharCode(modulus+64)+tmp,number/=26;while(26*number>26);return tmp},_html2canvas.Generate.ListRoman=function(number){var v,romanArray=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],decimal=[1e3,900,500,400,100,90,50,40,10,9,5,4,1],roman="",len=romanArray.length;if(0>=number||number>=4e3)return number;for(v=0;len>v;v+=1)for(;number>=decimal[v];)number-=decimal[v],roman+=romanArray[v];return roman}}(),_html2canvas.Parse=function(images,options){function documentWidth(){return Math.max(Math.max(doc.body.scrollWidth,doc.documentElement.scrollWidth),Math.max(doc.body.offsetWidth,doc.documentElement.offsetWidth),Math.max(doc.body.clientWidth,doc.documentElement.clientWidth))}function documentHeight(){return Math.max(Math.max(doc.body.scrollHeight,doc.documentElement.scrollHeight),Math.max(doc.body.offsetHeight,doc.documentElement.offsetHeight),Math.max(doc.body.clientHeight,doc.documentElement.clientHeight))}function getCSSInt(element,attribute){var val=parseInt(getCSS(element,attribute),10);return isNaN(val)?0:val}function renderRect(ctx,x,y,w,h,bgcolor){"transparent"!==bgcolor&&(ctx.setVariable("fillStyle",bgcolor),ctx.fillRect(x,y,w,h),numDraws+=1)}function textTransform(text,transform){switch(transform){case"lowercase":return text.toLowerCase();case"capitalize":return text.replace(/(^|\s|:|-|\(|\))([a-z])/g,function(m,p1,p2){return m.length>0?p1+p2.toUpperCase():void 0});case"uppercase":return text.toUpperCase();default:return text}}function noLetterSpacing(letter_spacing){return/^(normal|none|0px)$/.test(letter_spacing)}function drawText(currentText,x,y,ctx){null!==currentText&&_html2canvas.Util.trimText(currentText).length>0&&(ctx.fillText(currentText,x,y),numDraws+=1)}function setTextVariables(ctx,el,text_decoration,color){var align=!1,bold=getCSS(el,"fontWeight"),family=getCSS(el,"fontFamily"),size=getCSS(el,"fontSize");switch(parseInt(bold,10)){case 401:bold="bold";break;case 400:bold="normal"}return ctx.setVariable("fillStyle",color),ctx.setVariable("font",[getCSS(el,"fontStyle"),getCSS(el,"fontVariant"),bold,size,family].join(" ")),ctx.setVariable("textAlign",align?"right":"left"),"none"!==text_decoration?_html2canvas.Util.Font(family,size,doc):void 0}function renderTextDecoration(ctx,text_decoration,bounds,metrics,color){switch(text_decoration){case"underline":renderRect(ctx,bounds.left,Math.round(bounds.top+metrics.baseline+metrics.lineWidth),bounds.width,1,color);break;case"overline":renderRect(ctx,bounds.left,Math.round(bounds.top),bounds.width,1,color);break;case"line-through":renderRect(ctx,bounds.left,Math.ceil(bounds.top+metrics.middle+metrics.lineWidth),bounds.width,1,color)}}function getTextBounds(state,text,textDecoration,isLast){var bounds;if(support.rangeBounds)("none"!==textDecoration||0!==_html2canvas.Util.trimText(text).length)&&(bounds=textRangeBounds(text,state.node,state.textOffset)),state.textOffset+=text.length;else if(state.node&&"string"==typeof state.node.nodeValue){var newTextNode=isLast?state.node.splitText(text.length):null;bounds=textWrapperBounds(state.node),state.node=newTextNode}return bounds}function textRangeBounds(text,textNode,textOffset){var range=doc.createRange();return range.setStart(textNode,textOffset),range.setEnd(textNode,textOffset+text.length),range.getBoundingClientRect()}function textWrapperBounds(oldTextNode){var parent=oldTextNode.parentNode,wrapElement=doc.createElement("wrapper"),backupText=oldTextNode.cloneNode(!0);wrapElement.appendChild(oldTextNode.cloneNode(!0)),parent.replaceChild(wrapElement,oldTextNode);var bounds=_html2canvas.Util.Bounds(wrapElement);return parent.replaceChild(backupText,wrapElement),bounds}function renderText(el,textNode,stack){var metrics,textList,ctx=stack.ctx,color=getCSS(el,"color"),textDecoration=getCSS(el,"textDecoration"),textAlign=getCSS(el,"textAlign"),state={node:textNode,textOffset:0};_html2canvas.Util.trimText(textNode.nodeValue).length>0&&(textNode.nodeValue=textTransform(textNode.nodeValue,getCSS(el,"textTransform")),textAlign=textAlign.replace(["-webkit-auto"],["auto"]),textList=!options.letterRendering&&/^(left|right|justify|auto)$/.test(textAlign)&&noLetterSpacing(getCSS(el,"letterSpacing"))?textNode.nodeValue.split(/(\b| )/):textNode.nodeValue.split(""),metrics=setTextVariables(ctx,el,textDecoration,color),options.chinese&&textList.forEach(function(word,index){/.*[\u4E00-\u9FA5].*$/.test(word)&&(word=word.split(""),word.unshift(index,1),textList.splice.apply(textList,word))}),textList.forEach(function(text,index){var bounds=getTextBounds(state,text,textDecoration,index<textList.length-1);bounds&&(drawText(text,bounds.left,bounds.bottom,ctx),renderTextDecoration(ctx,textDecoration,bounds,metrics,color))}))}function listPosition(element,val){var originalType,bounds,boundElement=doc.createElement("boundelement");return boundElement.style.display="inline",originalType=element.style.listStyleType,element.style.listStyleType="none",boundElement.appendChild(doc.createTextNode(val)),element.insertBefore(boundElement,element.firstChild),bounds=_html2canvas.Util.Bounds(boundElement),element.removeChild(boundElement),element.style.listStyleType=originalType,bounds}function elementIndex(el){var i=-1,count=1,childs=el.parentNode.childNodes;if(el.parentNode){for(;childs[++i]!==el;)1===childs[i].nodeType&&count++;return count}return-1}function listItemText(element,type){var text,currentIndex=elementIndex(element);switch(type){case"decimal":text=currentIndex;break;case"decimal-leading-zero":text=1===currentIndex.toString().length?currentIndex="0"+currentIndex.toString():currentIndex.toString();break;case"upper-roman":text=_html2canvas.Generate.ListRoman(currentIndex);break;case"lower-roman":text=_html2canvas.Generate.ListRoman(currentIndex).toLowerCase();break;case"lower-alpha":text=_html2canvas.Generate.ListAlpha(currentIndex).toLowerCase();break;case"upper-alpha":text=_html2canvas.Generate.ListAlpha(currentIndex)}return text+=". "}function renderListItem(element,stack,elBounds){var x,text,listBounds,ctx=stack.ctx,type=getCSS(element,"listStyleType");if(/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)){if(text=listItemText(element,type),listBounds=listPosition(element,text),setTextVariables(ctx,element,"none",getCSS(element,"color")),"inside"!==getCSS(element,"listStylePosition"))return;ctx.setVariable("textAlign","left"),x=elBounds.left,drawText(text,x,listBounds.bottom,ctx)}}function loadImage(src){var img=images[src];return img&&img.succeeded===!0?img.img:!1}function clipBounds(src,dst){var x=Math.max(src.left,dst.left),y=Math.max(src.top,dst.top),x2=Math.min(src.left+src.width,dst.left+dst.width),y2=Math.min(src.top+src.height,dst.top+dst.height);return{left:x,top:y,width:x2-x,height:y2-y}}function setZ(zIndex,parentZ){var newContext;return parentZ?"auto"!==zIndex?(newContext=h2czContext(zIndex),parentZ.children.push(newContext),newContext):parentZ:newContext=h2czContext(0)}function renderImage(ctx,element,image,bounds,borders){var paddingLeft=getCSSInt(element,"paddingLeft"),paddingTop=getCSSInt(element,"paddingTop"),paddingRight=getCSSInt(element,"paddingRight"),paddingBottom=getCSSInt(element,"paddingBottom");drawImage(ctx,image,0,0,image.width,image.height,bounds.left+paddingLeft+borders[3].width,bounds.top+paddingTop+borders[0].width,bounds.width-(borders[1].width+borders[3].width+paddingLeft+paddingRight),bounds.height-(borders[0].width+borders[2].width+paddingTop+paddingBottom))}function getBorderData(element){return["Top","Right","Bottom","Left"].map(function(side){return{width:getCSSInt(element,"border"+side+"Width"),color:getCSS(element,"border"+side+"Color")}})}function getBorderRadiusData(element){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(side){return getCSS(element,"border"+side+"Radius")})}function bezierCurve(start,startControl,endControl,end){var lerp=function(a,b,t){return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}};return{start:start,startControl:startControl,endControl:endControl,end:end,subdivide:function(t){var ab=lerp(start,startControl,t),bc=lerp(startControl,endControl,t),cd=lerp(endControl,end,t),abbc=lerp(ab,bc,t),bccd=lerp(bc,cd,t),dest=lerp(abbc,bccd,t);return[bezierCurve(start,ab,abbc,dest),bezierCurve(dest,bccd,cd,end)]},curveTo:function(borderArgs){borderArgs.push(["bezierCurve",startControl.x,startControl.y,endControl.x,endControl.y,end.x,end.y])},curveToReversed:function(borderArgs){borderArgs.push(["bezierCurve",endControl.x,endControl.y,startControl.x,startControl.y,start.x,start.y])}}}function parseCorner(borderArgs,radius1,radius2,corner1,corner2,x,y){radius1[0]>0||radius1[1]>0?(borderArgs.push(["line",corner1[0].start.x,corner1[0].start.y]),corner1[0].curveTo(borderArgs),corner1[1].curveTo(borderArgs)):borderArgs.push(["line",x,y]),(radius2[0]>0||radius2[1]>0)&&borderArgs.push(["line",corner2[0].start.x,corner2[0].start.y])}function drawSide(borderData,radius1,radius2,outer1,inner1,outer2,inner2){var borderArgs=[];return radius1[0]>0||radius1[1]>0?(borderArgs.push(["line",outer1[1].start.x,outer1[1].start.y]),outer1[1].curveTo(borderArgs)):borderArgs.push(["line",borderData.c1[0],borderData.c1[1]]),radius2[0]>0||radius2[1]>0?(borderArgs.push(["line",outer2[0].start.x,outer2[0].start.y]),outer2[0].curveTo(borderArgs),borderArgs.push(["line",inner2[0].end.x,inner2[0].end.y]),inner2[0].curveToReversed(borderArgs)):(borderArgs.push(["line",borderData.c2[0],borderData.c2[1]]),borderArgs.push(["line",borderData.c3[0],borderData.c3[1]])),radius1[0]>0||radius1[1]>0?(borderArgs.push(["line",inner1[1].end.x,inner1[1].end.y]),inner1[1].curveToReversed(borderArgs)):borderArgs.push(["line",borderData.c4[0],borderData.c4[1]]),borderArgs}function calculateCurvePoints(bounds,borderRadius,borders){var x=bounds.left,y=bounds.top,width=bounds.width,height=bounds.height,tlh=borderRadius[0][0],tlv=borderRadius[0][1],trh=borderRadius[1][0],trv=borderRadius[1][1],brv=borderRadius[2][0],brh=borderRadius[2][1],blh=borderRadius[3][0],blv=borderRadius[3][1],topWidth=width-trh,rightHeight=height-brv,bottomWidth=width-brh,leftHeight=height-blv;return{topLeftOuter:getCurvePoints(x,y,tlh,tlv).topLeft.subdivide(.5),topLeftInner:getCurvePoints(x+borders[3].width,y+borders[0].width,Math.max(0,tlh-borders[3].width),Math.max(0,tlv-borders[0].width)).topLeft.subdivide(.5),topRightOuter:getCurvePoints(x+topWidth,y,trh,trv).topRight.subdivide(.5),topRightInner:getCurvePoints(x+Math.min(topWidth,width+borders[3].width),y+borders[0].width,topWidth>width+borders[3].width?0:trh-borders[3].width,trv-borders[0].width).topRight.subdivide(.5),bottomRightOuter:getCurvePoints(x+bottomWidth,y+rightHeight,brh,brv).bottomRight.subdivide(.5),bottomRightInner:getCurvePoints(x+Math.min(bottomWidth,width+borders[3].width),y+Math.min(rightHeight,height+borders[0].width),Math.max(0,brh-borders[1].width),Math.max(0,brv-borders[2].width)).bottomRight.subdivide(.5),bottomLeftOuter:getCurvePoints(x,y+leftHeight,blh,blv).bottomLeft.subdivide(.5),bottomLeftInner:getCurvePoints(x+borders[3].width,y+leftHeight,Math.max(0,blh-borders[3].width),Math.max(0,blv-borders[2].width)).bottomLeft.subdivide(.5)}}function getBorderClip(element,borderPoints,borders,radius,bounds){var backgroundClip=getCSS(element,"backgroundClip"),borderArgs=[];switch(backgroundClip){case"content-box":case"padding-box":parseCorner(borderArgs,radius[0],radius[1],borderPoints.topLeftInner,borderPoints.topRightInner,bounds.left+borders[3].width,bounds.top+borders[0].width),parseCorner(borderArgs,radius[1],radius[2],borderPoints.topRightInner,borderPoints.bottomRightInner,bounds.left+bounds.width-borders[1].width,bounds.top+borders[0].width),parseCorner(borderArgs,radius[2],radius[3],borderPoints.bottomRightInner,borderPoints.bottomLeftInner,bounds.left+bounds.width-borders[1].width,bounds.top+bounds.height-borders[2].width),parseCorner(borderArgs,radius[3],radius[0],borderPoints.bottomLeftInner,borderPoints.topLeftInner,bounds.left+borders[3].width,bounds.top+bounds.height-borders[2].width);break;default:parseCorner(borderArgs,radius[0],radius[1],borderPoints.topLeftOuter,borderPoints.topRightOuter,bounds.left,bounds.top),parseCorner(borderArgs,radius[1],radius[2],borderPoints.topRightOuter,borderPoints.bottomRightOuter,bounds.left+bounds.width,bounds.top),parseCorner(borderArgs,radius[2],radius[3],borderPoints.bottomRightOuter,borderPoints.bottomLeftOuter,bounds.left+bounds.width,bounds.top+bounds.height),parseCorner(borderArgs,radius[3],radius[0],borderPoints.bottomLeftOuter,borderPoints.topLeftOuter,bounds.left,bounds.top+bounds.height)}return borderArgs}function parseBorders(element,bounds,borders){var borderSide,bx,by,bw,bh,borderArgs,x=bounds.left,y=bounds.top,width=bounds.width,height=bounds.height,borderRadius=getBorderRadiusData(element),borderPoints=calculateCurvePoints(bounds,borderRadius,borders),borderData={clip:getBorderClip(element,borderPoints,borders,borderRadius,bounds),borders:[]};for(borderSide=0;4>borderSide;borderSide++)if(borders[borderSide].width>0){switch(bx=x,by=y,bw=width,bh=height-borders[2].width,borderSide){case 0:bh=borders[0].width,borderArgs=drawSide({c1:[bx,by],c2:[bx+bw,by],c3:[bx+bw-borders[1].width,by+bh],c4:[bx+borders[3].width,by+bh]},borderRadius[0],borderRadius[1],borderPoints.topLeftOuter,borderPoints.topLeftInner,borderPoints.topRightOuter,borderPoints.topRightInner);break;case 1:bx=x+width-borders[1].width,bw=borders[1].width,borderArgs=drawSide({c1:[bx+bw,by],c2:[bx+bw,by+bh+borders[2].width],c3:[bx,by+bh],c4:[bx,by+borders[0].width]},borderRadius[1],borderRadius[2],borderPoints.topRightOuter,borderPoints.topRightInner,borderPoints.bottomRightOuter,borderPoints.bottomRightInner);break;case 2:by=by+height-borders[2].width,bh=borders[2].width,borderArgs=drawSide({c1:[bx+bw,by+bh],c2:[bx,by+bh],c3:[bx+borders[3].width,by],c4:[bx+bw-borders[2].width,by]},borderRadius[2],borderRadius[3],borderPoints.bottomRightOuter,borderPoints.bottomRightInner,borderPoints.bottomLeftOuter,borderPoints.bottomLeftInner);break;case 3:bw=borders[3].width,borderArgs=drawSide({c1:[bx,by+bh+borders[2].width],c2:[bx,by],c3:[bx+bw,by+borders[0].width],c4:[bx+bw,by+bh]},borderRadius[3],borderRadius[0],borderPoints.bottomLeftOuter,borderPoints.bottomLeftInner,borderPoints.topLeftOuter,borderPoints.topLeftInner)}borderData.borders.push({args:borderArgs,color:borders[borderSide].color})}return borderData}function createShape(ctx,args){var shape=ctx.drawShape();return args.forEach(function(border,index){shape[0===index?"moveTo":border[0]+"To"].apply(null,border.slice(1))}),shape}function renderBorders(ctx,borderArgs,color){"transparent"!==color&&(ctx.setVariable("fillStyle",color),createShape(ctx,borderArgs),ctx.fill(),numDraws+=1)}function renderFormValue(el,bounds,stack){var textValue,textNode,valueWrap=doc.createElement("valuewrap"),cssPropertyArray=["lineHeight","textAlign","fontFamily","color","fontSize","paddingLeft","paddingTop","width","height","border","borderLeftWidth","borderTopWidth"];cssPropertyArray.forEach(function(property){try{valueWrap.style[property]=getCSS(el,property)}catch(e){h2clog("html2canvas: Parse: Exception caught in renderFormValue: "+e.message)}}),valueWrap.style.borderColor="black",valueWrap.style.borderStyle="solid",valueWrap.style.display="block",valueWrap.style.position="absolute",(/^(submit|reset|button|text|password)$/.test(el.type)||"SELECT"===el.nodeName)&&(valueWrap.style.lineHeight=getCSS(el,"height")),valueWrap.style.top=bounds.top+"px",valueWrap.style.left=bounds.left+"px",textValue="SELECT"===el.nodeName?(el.options[el.selectedIndex]||0).text:el.value,textValue||(textValue=el.placeholder),textNode=doc.createTextNode(textValue),valueWrap.appendChild(textNode),body.appendChild(valueWrap),renderText(el,textNode,stack),body.removeChild(valueWrap)
}function drawImage(ctx){ctx.drawImage.apply(ctx,Array.prototype.slice.call(arguments,1)),numDraws+=1}function getPseudoElement(el,which){var elStyle=window.getComputedStyle(el,which);if(elStyle&&elStyle.content&&"none"!==elStyle.content&&"-moz-alt-content"!==elStyle.content){var content=elStyle.content+"",first=content.substr(0,1);first===content.substr(content.length-1)&&first.match(/'|"/)&&(content=content.substr(1,content.length-2));var isImage="url"===content.substr(0,3),elps=document.createElement(isImage?"img":"span");return elps.className=pseudoHide+"-before "+pseudoHide+"-after",Object.keys(elStyle).filter(indexedProperty).forEach(function(prop){try{elps.style[prop]=elStyle[prop]}catch(e){h2clog(["Tried to assign readonly property ",prop,"Error:",e])}}),isImage?elps.src=_html2canvas.Util.parseBackgroundImage(content)[0].args[0]:elps.innerHTML=content,elps}}function indexedProperty(property){return isNaN(window.parseInt(property,10))}function injectPseudoElements(el,stack){var before=getPseudoElement(el,":before"),after=getPseudoElement(el,":after");(before||after)&&(before&&(el.className+=" "+pseudoHide+"-before",el.parentNode.insertBefore(before,el),parseElement(before,stack,!0),el.parentNode.removeChild(before),el.className=el.className.replace(pseudoHide+"-before","").trim()),after&&(el.className+=" "+pseudoHide+"-after",el.appendChild(after),parseElement(after,stack,!0),el.removeChild(after),el.className=el.className.replace(pseudoHide+"-after","").trim()))}function renderBackgroundRepeat(ctx,image,backgroundPosition,bounds){var offsetX=Math.round(bounds.left+backgroundPosition.left),offsetY=Math.round(bounds.top+backgroundPosition.top);ctx.createPattern(image),ctx.translate(offsetX,offsetY),ctx.fill(),ctx.translate(-offsetX,-offsetY)}function backgroundRepeatShape(ctx,image,backgroundPosition,bounds,left,top,width,height){var args=[];args.push(["line",Math.round(left),Math.round(top)]),args.push(["line",Math.round(left+width),Math.round(top)]),args.push(["line",Math.round(left+width),Math.round(height+top)]),args.push(["line",Math.round(left),Math.round(height+top)]),createShape(ctx,args),ctx.save(),ctx.clip(),renderBackgroundRepeat(ctx,image,backgroundPosition,bounds),ctx.restore()}function renderBackgroundColor(ctx,backgroundBounds,bgcolor){renderRect(ctx,backgroundBounds.left,backgroundBounds.top,backgroundBounds.width,backgroundBounds.height,bgcolor)}function renderBackgroundRepeating(el,bounds,ctx,image,imageIndex){var backgroundSize=_html2canvas.Util.BackgroundSize(el,bounds,image,imageIndex),backgroundPosition=_html2canvas.Util.BackgroundPosition(el,bounds,image,imageIndex,backgroundSize),backgroundRepeat=getCSS(el,"backgroundRepeat").split(",").map(function(value){return value.trim()});switch(image=resizeImage(image,backgroundSize),backgroundRepeat=backgroundRepeat[imageIndex]||backgroundRepeat[0]){case"repeat-x":backgroundRepeatShape(ctx,image,backgroundPosition,bounds,bounds.left,bounds.top+backgroundPosition.top,99999,image.height);break;case"repeat-y":backgroundRepeatShape(ctx,image,backgroundPosition,bounds,bounds.left+backgroundPosition.left,bounds.top,image.width,99999);break;case"no-repeat":backgroundRepeatShape(ctx,image,backgroundPosition,bounds,bounds.left+backgroundPosition.left,bounds.top+backgroundPosition.top,image.width,image.height);break;default:renderBackgroundRepeat(ctx,image,backgroundPosition,{top:bounds.top,left:bounds.left,width:image.width,height:image.height})}}function renderBackgroundImage(element,bounds,ctx){for(var image,backgroundImage=getCSS(element,"backgroundImage"),backgroundImages=_html2canvas.Util.parseBackgroundImage(backgroundImage),imageIndex=backgroundImages.length;imageIndex--;)if(backgroundImage=backgroundImages[imageIndex],backgroundImage.args&&0!==backgroundImage.args.length){var key="url"===backgroundImage.method?backgroundImage.args[0]:backgroundImage.value;image=loadImage(key),image?renderBackgroundRepeating(element,bounds,ctx,image,imageIndex):h2clog("html2canvas: Error loading background:",backgroundImage)}}function resizeImage(image,bounds){if(image.width===bounds.width&&image.height===bounds.height)return image;var ctx,canvas=doc.createElement("canvas");return canvas.width=bounds.width,canvas.height=bounds.height,ctx=canvas.getContext("2d"),drawImage(ctx,image,0,0,image.width,image.height,0,0,bounds.width,bounds.height),canvas}function setOpacity(ctx,element,parentStack){var opacity=getCSS(element,"opacity")*(parentStack?parentStack.opacity:1);return ctx.setVariable("globalAlpha",opacity),opacity}function createStack(element,parentStack,bounds){var ctx=h2cRenderContext(parentStack?bounds.width:documentWidth(),parentStack?bounds.height:documentHeight()),stack={ctx:ctx,zIndex:setZ(getCSS(element,"zIndex"),parentStack?parentStack.zIndex:null),opacity:setOpacity(ctx,element,parentStack),cssPosition:getCSS(element,"position"),borders:getBorderData(element),clip:parentStack&&parentStack.clip?_html2canvas.Util.Extend({},parentStack.clip):null};return options.useOverflow===!0&&/(hidden|scroll|auto)/.test(getCSS(element,"overflow"))===!0&&/(BODY)/i.test(element.nodeName)===!1&&(stack.clip=stack.clip?clipBounds(stack.clip,bounds):bounds),stack.zIndex.children.push(stack),stack}function getBackgroundBounds(borders,bounds,clip){var backgroundBounds={left:bounds.left+borders[3].width,top:bounds.top+borders[0].width,width:bounds.width-(borders[1].width+borders[3].width),height:bounds.height-(borders[0].width+borders[2].width)};return clip&&(backgroundBounds=clipBounds(backgroundBounds,clip)),backgroundBounds}function renderElement(element,parentStack,pseudoElement){var image,bounds=_html2canvas.Util.Bounds(element),bgcolor=ignoreElementsRegExp.test(element.nodeName)?"#efefef":getCSS(element,"backgroundColor"),stack=createStack(element,parentStack,bounds),borders=stack.borders,ctx=stack.ctx,backgroundBounds=getBackgroundBounds(borders,bounds,stack.clip),borderData=parseBorders(element,bounds,borders);switch(createShape(ctx,borderData.clip),ctx.save(),ctx.clip(),backgroundBounds.height>0&&backgroundBounds.width>0&&(renderBackgroundColor(ctx,bounds,bgcolor),renderBackgroundImage(element,backgroundBounds,ctx)),ctx.restore(),borderData.borders.forEach(function(border){renderBorders(ctx,border.args,border.color)}),pseudoElement||injectPseudoElements(element,stack),element.nodeName){case"IMG":(image=loadImage(element.getAttribute("src")))?renderImage(ctx,element,image,bounds,borders):h2clog("html2canvas: Error loading <img>:"+element.getAttribute("src"));break;case"INPUT":/^(text|url|email|submit|button|reset)$/.test(element.type)&&(element.value||element.placeholder).length>0&&renderFormValue(element,bounds,stack);break;case"TEXTAREA":(element.value||element.placeholder||"").length>0&&renderFormValue(element,bounds,stack);break;case"SELECT":(element.options||element.placeholder||"").length>0&&renderFormValue(element,bounds,stack);break;case"LI":renderListItem(element,stack,backgroundBounds);break;case"CANVAS":renderImage(ctx,element,element,bounds,borders)}return stack}function isElementVisible(element){return"none"!==getCSS(element,"display")&&"hidden"!==getCSS(element,"visibility")&&!element.hasAttribute("data-html2canvas-ignore")}function parseElement(el,stack,pseudoElement){isElementVisible(el)&&(stack=renderElement(el,stack,pseudoElement)||stack,ignoreElementsRegExp.test(el.nodeName)||_html2canvas.Util.Children(el).forEach(function(node){1===node.nodeType?parseElement(node,stack,pseudoElement):3===node.nodeType&&renderText(el,node,stack)}))}function svgDOMRender(body,stack){function parseDOM(el){var attr,a,alen,elm,i,children=_html2canvas.Util.Children(el),len=children.length;for(i=0;len>i;i+=1)if(elm=children[i],3===elm.nodeType)html+=elm.nodeValue.replace(/</g,"&lt;").replace(/>/g,"&gt;");else if(1===elm.nodeType&&!/^(script|meta|title)$/.test(elm.nodeName.toLowerCase())){if(html+="<"+elm.nodeName.toLowerCase(),elm.hasAttributes())for(attr=elm.attributes,alen=attr.length,a=0;alen>a;a+=1)html+=" "+attr[a].name+'="'+attr[a].value+'"';html+=">",parseDOM(elm),html+="</"+elm.nodeName.toLowerCase()+">"}}var img=new Image,docWidth=documentWidth(),docHeight=documentHeight(),html="";parseDOM(body),img.src=["data:image/svg+xml,","<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='"+docWidth+"' height='"+docHeight+"'>","<foreignObject width='"+docWidth+"' height='"+docHeight+"'>","<html xmlns='http://www.w3.org/1999/xhtml' style='margin:0;'>",html.replace(/\#/g,"%23"),"</html>","</foreignObject>","</svg>"].join(""),img.onload=function(){stack.svgRender=img}}function init(){var stack=renderElement(element,null);return support.svgRendering&&svgDOMRender(document.documentElement,stack),Array.prototype.slice.call(element.children,0).forEach(function(childElement){parseElement(childElement,stack)}),stack.backgroundColor=getCSS(document.documentElement,"backgroundColor"),body.removeChild(hidePseudoElements),stack}window.scroll(0,0);var element=options.elements===undefined?document.body:options.elements[0],numDraws=0,doc=element.ownerDocument,support=_html2canvas.Util.Support(options,doc),ignoreElementsRegExp=new RegExp("("+options.ignoreElements+")"),body=doc.body,getCSS=_html2canvas.Util.getCSS,pseudoHide="___html2canvas___pseudoelement",hidePseudoElements=doc.createElement("style");hidePseudoElements.innerHTML="."+pseudoHide+'-before:before { content: "" !important; display: none !important; }'+"."+pseudoHide+'-after:after { content: "" !important; display: none !important; }',body.appendChild(hidePseudoElements),images=images||{};var getCurvePoints=function(kappa){return function(x,y,r1,r2){var ox=r1*kappa,oy=r2*kappa,xm=x+r1,ym=y+r2;return{topLeft:bezierCurve({x:x,y:ym},{x:x,y:ym-oy},{x:xm-ox,y:y},{x:xm,y:y}),topRight:bezierCurve({x:x,y:y},{x:x+ox,y:y},{x:xm,y:ym-oy},{x:xm,y:ym}),bottomRight:bezierCurve({x:xm,y:y},{x:xm,y:y+oy},{x:x+ox,y:ym},{x:x,y:ym}),bottomLeft:bezierCurve({x:xm,y:ym},{x:xm-ox,y:ym},{x:x,y:y+oy},{x:x,y:y})}}}(4*((Math.sqrt(2)-1)/3));return init()},_html2canvas.Preload=function(options){function isSameOrigin(url){link.href=url,link.href=link.href;var origin=link.protocol+link.host;return origin===pageOrigin}function start(){h2clog("html2canvas: start: images: "+images.numLoaded+" / "+images.numTotal+" (failed: "+images.numFailed+")"),!images.firstRun&&images.numLoaded>=images.numTotal&&(h2clog("Finished loading images: # "+images.numTotal+" (failed: "+images.numFailed+")"),"function"==typeof options.complete&&options.complete(images))}function proxyGetImage(url,img,imageObj){var callback_name,script,scriptUrl=options.proxy;link.href=url,url=link.href,callback_name="html2canvas_"+count++,imageObj.callbackname=callback_name,scriptUrl+=scriptUrl.indexOf("?")>-1?"&":"?",scriptUrl+="url="+encodeURIComponent(url)+"&callback="+callback_name,script=doc.createElement("script"),window[callback_name]=function(a){"error:"===a.substring(0,6)?(imageObj.succeeded=!1,images.numLoaded++,images.numFailed++,start()):(setImageLoadHandlers(img,imageObj),img.src=a),window[callback_name]=undefined;try{delete window[callback_name]}catch(ex){}script.parentNode.removeChild(script),script=null,delete imageObj.script,delete imageObj.callbackname},script.setAttribute("type","text/javascript"),script.setAttribute("src",scriptUrl),imageObj.script=script,window.document.body.appendChild(script)}function loadPseudoElement(element,type){var style=window.getComputedStyle(element,type),content=style.content;"url"===content.substr(0,3)&&methods.loadImage(_html2canvas.Util.parseBackgroundImage(content)[0].args[0]),loadBackgroundImages(style.backgroundImage,element)}function loadPseudoElementImages(element){loadPseudoElement(element,":before"),loadPseudoElement(element,":after")}function loadGradientImage(backgroundImage,bounds){var img=_html2canvas.Generate.Gradient(backgroundImage,bounds);img!==undefined&&(images[backgroundImage]={img:img,succeeded:!0},images.numTotal++,images.numLoaded++,start())}function invalidBackgrounds(background_image){return background_image&&background_image.method&&background_image.args&&background_image.args.length>0}function loadBackgroundImages(background_image,el){var bounds;_html2canvas.Util.parseBackgroundImage(background_image).filter(invalidBackgrounds).forEach(function(background_image){"url"===background_image.method?methods.loadImage(background_image.args[0]):background_image.method.match(/\-?gradient$/)&&(bounds===undefined&&(bounds=_html2canvas.Util.Bounds(el)),loadGradientImage(background_image.value,bounds))})}function getImages(el){var elNodeType=!1;try{_html2canvas.Util.Children(el).forEach(function(img){getImages(img)})}catch(e){}try{elNodeType=el.nodeType}catch(ex){elNodeType=!1,h2clog("html2canvas: failed to access some element's nodeType - Exception: "+ex.message)}if(1===elNodeType||elNodeType===undefined){loadPseudoElementImages(el);try{loadBackgroundImages(_html2canvas.Util.getCSS(el,"backgroundImage"),el)}catch(e){h2clog("html2canvas: failed to get background-image - Exception: "+e.message)}loadBackgroundImages(el)}}function setImageLoadHandlers(img,imageObj){img.onload=function(){imageObj.timer!==undefined&&window.clearTimeout(imageObj.timer),images.numLoaded++,imageObj.succeeded=!0,img.onerror=img.onload=null,start()},img.onerror=function(){if("anonymous"===img.crossOrigin&&(window.clearTimeout(imageObj.timer),options.proxy)){var src=img.src;return img=new Image,imageObj.img=img,img.src=src,proxyGetImage(img.src,img,imageObj),void 0}images.numLoaded++,images.numFailed++,imageObj.succeeded=!1,img.onerror=img.onload=null,start()}}var pageOrigin,methods,i,timeoutTimer,images={numLoaded:0,numFailed:0,numTotal:0,cleanupDone:!1},count=0,element=options.elements[0]||document.body,doc=element.ownerDocument,domImages=doc.images,imgLen=domImages.length,link=doc.createElement("a"),supportCORS=function(img){return img.crossOrigin!==undefined}(new Image);for(link.href=window.location.href,pageOrigin=link.protocol+link.host,methods={loadImage:function(src){var img,imageObj;src&&images[src]===undefined&&(img=new Image,src.match(/data:image\/.*;base64,/i)?(img.src=src.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),imageObj=images[src]={img:img},images.numTotal++,setImageLoadHandlers(img,imageObj)):isSameOrigin(src)||options.allowTaint===!0?(imageObj=images[src]={img:img},images.numTotal++,setImageLoadHandlers(img,imageObj),img.src=src):supportCORS&&!options.allowTaint&&options.useCORS?(img.crossOrigin="anonymous",imageObj=images[src]={img:img},images.numTotal++,setImageLoadHandlers(img,imageObj),img.src=src,img.customComplete=function(){this.img.complete?this.img.onerror():this.timer=window.setTimeout(this.img.customComplete,100)}.bind(imageObj),img.customComplete()):options.proxy&&(imageObj=images[src]={img:img},images.numTotal++,proxyGetImage(src,img,imageObj)))},cleanupDOM:function(cause){var img,src;if(!images.cleanupDone){cause&&"string"==typeof cause?h2clog("html2canvas: Cleanup because: "+cause):h2clog("html2canvas: Cleanup after timeout: "+options.timeout+" ms.");for(src in images)if(images.hasOwnProperty(src)&&(img=images[src],"object"==typeof img&&img.callbackname&&img.succeeded===undefined)){window[img.callbackname]=undefined;try{delete window[img.callbackname]}catch(ex){}img.script&&img.script.parentNode&&(img.script.setAttribute("src","about:blank"),img.script.parentNode.removeChild(img.script)),images.numLoaded++,images.numFailed++,h2clog("html2canvas: Cleaned up failed img: '"+src+"' Steps: "+images.numLoaded+" / "+images.numTotal)}window.stop!==undefined?window.stop():document.execCommand!==undefined&&document.execCommand("Stop",!1),document.close!==undefined&&document.close(),images.cleanupDone=!0,cause&&"string"==typeof cause||start()}},renderingDone:function(){timeoutTimer&&window.clearTimeout(timeoutTimer)}},options.timeout>0&&(timeoutTimer=window.setTimeout(methods.cleanupDOM,options.timeout)),h2clog("html2canvas: Preload starts: finding background-images"),images.firstRun=!0,getImages(element),h2clog("html2canvas: Preload: Finding images"),i=0;imgLen>i;i+=1)methods.loadImage(domImages[i].getAttribute("src"));return images.firstRun=!1,h2clog("html2canvas: Preload: Done."),images.numTotal===images.numLoaded&&start(),methods},_html2canvas.Renderer=function(parseQueue,options){function createRenderQueue(parseQueue){var queue=[],sortZ=function(zStack){var subStacks=[],stackValues=[];zStack.children.forEach(function(stackChild){stackChild.children&&stackChild.children.length>0?(subStacks.push(stackChild),stackValues.push(stackChild.zindex)):queue.push(stackChild)}),stackValues.sort(function(a,b){return a-b}),stackValues.forEach(function(zValue){var index;subStacks.some(function(stack,i){return index=i,stack.zindex===zValue}),sortZ(subStacks.splice(index,1)[0])})};return sortZ(parseQueue.zIndex),queue}function getRenderer(rendererName){var renderer;if("string"==typeof options.renderer&&_html2canvas.Renderer[rendererName]!==undefined)renderer=_html2canvas.Renderer[rendererName](options);else{if("function"!=typeof rendererName)throw new Error("Unknown renderer");renderer=rendererName(options)}if("function"!=typeof renderer)throw new Error("Invalid renderer defined");return renderer}return getRenderer(options.renderer)(parseQueue,options,document,createRenderQueue(parseQueue),_html2canvas)},_html2canvas.Util.Support=function(options,doc){function supportSVGRendering(){var img=new Image,canvas=doc.createElement("canvas"),ctx=canvas.getContext===undefined?!1:canvas.getContext("2d");if(ctx===!1)return!1;canvas.width=canvas.height=10,img.src=["data:image/svg+xml,","<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>","<foreignObject width='10' height='10'>","<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>","sup","</div>","</foreignObject>","</svg>"].join("");try{ctx.drawImage(img,0,0),canvas.toDataURL()}catch(e){return!1}return h2clog("html2canvas: Parse: SVG powered rendering available"),!0}function supportRangeBounds(){var r,testElement,rangeBounds,rangeHeight,support=!1;return doc.createRange&&(r=doc.createRange(),r.getBoundingClientRect&&(testElement=doc.createElement("boundtest"),testElement.style.height="123px",testElement.style.display="block",doc.body.appendChild(testElement),r.selectNode(testElement),rangeBounds=r.getBoundingClientRect(),rangeHeight=rangeBounds.height,123===rangeHeight&&(support=!0),doc.body.removeChild(testElement))),support}return{rangeBounds:supportRangeBounds(),svgRendering:options.svgRendering&&supportSVGRendering()}},window.html2canvas=function(elements,opts){elements=elements.length?elements:[elements];var queue,canvas,options={logging:!1,elements:elements,background:"#fff",proxy:null,timeout:0,useCORS:!1,allowTaint:!1,svgRendering:!1,ignoreElements:"IFRAME|OBJECT|PARAM",useOverflow:!0,letterRendering:!1,chinese:!1,width:null,height:null,taintTest:!0,renderer:"Canvas"};return options=_html2canvas.Util.Extend(opts,options),_html2canvas.logging=options.logging,options.complete=function(images){("function"!=typeof options.onpreloaded||options.onpreloaded(images)!==!1)&&(queue=_html2canvas.Parse(images,options),("function"!=typeof options.onparsed||options.onparsed(queue)!==!1)&&(canvas=_html2canvas.Renderer(queue,options),"function"==typeof options.onrendered&&options.onrendered(canvas)))},window.setTimeout(function(){_html2canvas.Preload(options)},0),{render:function(queue,opts){return _html2canvas.Renderer(queue,_html2canvas.Util.Extend(opts,options))},parse:function(images,opts){return _html2canvas.Parse(images,_html2canvas.Util.Extend(opts,options))},preload:function(opts){return _html2canvas.Preload(_html2canvas.Util.Extend(opts,options))},log:h2clog}},window.html2canvas.log=h2clog,window.html2canvas.Renderer={Canvas:undefined},_html2canvas.Renderer.Canvas=function(options){function createShape(ctx,args){ctx.beginPath(),args.forEach(function(arg){ctx[arg.name].apply(ctx,arg.arguments)}),ctx.closePath()}function safeImage(item){if(-1===safeImages.indexOf(item.arguments[0].src)){testctx.drawImage(item.arguments[0],0,0);try{testctx.getImageData(0,0,1,1)}catch(e){return testCanvas=doc.createElement("canvas"),testctx=testCanvas.getContext("2d"),!1}safeImages.push(item.arguments[0].src)}return!0}function isTransparent(backgroundColor){return"transparent"===backgroundColor||"rgba(0, 0, 0, 0)"===backgroundColor}function renderItem(ctx,item){switch(item.type){case"variable":ctx[item.name]=item.arguments;break;case"function":if("createPattern"===item.name){if(item.arguments[0].width>0&&item.arguments[0].height>0)try{ctx.fillStyle=ctx.createPattern(item.arguments[0],"repeat")}catch(e){h2clog("html2canvas: Renderer: Error creating pattern",e.message)}}else"drawShape"===item.name?createShape(ctx,item.arguments):"drawImage"===item.name?item.arguments[8]>0&&item.arguments[7]>0&&(!options.taintTest||options.taintTest&&safeImage(item))&&ctx.drawImage.apply(ctx,item.arguments):ctx[item.name].apply(ctx,item.arguments)}}options=options||{};var doc=document,safeImages=[],testCanvas=document.createElement("canvas"),testctx=testCanvas.getContext("2d"),canvas=options.canvas||doc.createElement("canvas");return function(zStack,options,doc,queue,_html2canvas){var storageContext,i,queueLen,newCanvas,bounds,fstyle,ctx=canvas.getContext("2d");if(canvas.width=canvas.style.width=options.width||zStack.ctx.width,canvas.height=canvas.style.height=options.height||zStack.ctx.height,fstyle=ctx.fillStyle,ctx.fillStyle=isTransparent(zStack.backgroundColor)&&options.background!==undefined?options.background:zStack.backgroundColor,ctx.fillRect(0,0,canvas.width,canvas.height),ctx.fillStyle=fstyle,options.svgRendering&&zStack.svgRender!==undefined)ctx.drawImage(zStack.svgRender,0,0);else for(i=0,queueLen=queue.length;queueLen>i;i+=1)storageContext=queue.splice(0,1)[0],storageContext.canvasPosition=storageContext.canvasPosition||{},ctx.textBaseline="bottom",storageContext.clip&&(ctx.save(),ctx.beginPath(),ctx.rect(storageContext.clip.left,storageContext.clip.top,storageContext.clip.width,storageContext.clip.height),ctx.clip()),storageContext.ctx.storage&&storageContext.ctx.storage.forEach(renderItem.bind(null,ctx)),storageContext.clip&&ctx.restore();return h2clog("html2canvas: Renderer: Canvas renderer done - returning canvas obj"),queueLen=options.elements.length,1===queueLen&&"object"==typeof options.elements[0]&&"BODY"!==options.elements[0].nodeName?(bounds=_html2canvas.Util.Bounds(options.elements[0]),newCanvas=doc.createElement("canvas"),newCanvas.width=bounds.width,newCanvas.height=bounds.height,ctx=newCanvas.getContext("2d"),ctx.drawImage(canvas,bounds.left,bounds.top,bounds.width,bounds.height,0,0,bounds.width,bounds.height),canvas=null,newCanvas):canvas}}}(window,document);
/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

/*!
 * Kisume 1.0.0
 * Cross-browser library providing reliable `window` access for userscripting
 * https://github.com/summivox/kisume
*/
!function(){var COFFEE_RUNTIME,KISUME_BOTTOM,Kisume,bailout,quote,san_func,strings,unique,_class,_ref,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__slice=[].slice,__hasProp={}.hasOwnProperty;quote=function(s){return JSON.stringify(s)},unique=function(a){var last,x,_i,_len,_results;for(_results=[],_i=0,_len=a.length;_len>_i;_i++)x=a[_i],x!==last&&_results.push(last=x);return _results},strings=function(a){var s,x,_i,_len,_results;for(_results=[],_i=0,_len=a.length;_len>_i;_i++)x=a[_i],(s=null!=x?x.toString():void 0)&&_results.push(s);return _results},san_func=function(f){return f instanceof Function?f:function(){}},bailout=function(cb,err){throw"function"==typeof cb&&cb(err),err},Kisume=function(){function Kisume(){return this._listener=__bind(this._listener,this),_ref=_class.apply(this,arguments)}var _run;return Kisume.prototype.VERSION="1.0.0",_class=function(){var _;return _=function(W,instanceName,opt,cb){var instanceNameTag,script;return this instanceof Kisume?((null!=W?W.top:void 0)instanceof Window||bailout(cb,Error("Kisume: must be initialized on Window instance")),instanceName=instanceName.replace(/[^\w]/g,"_"),instanceNameTag="kisume_"+instanceName,this.instanceName=instanceName,this.options=opt||{},this._W=W,this._D=W.document,this._tran={},this._init_cb=san_func(cb),this.closure=function(instanceName){return function(script){return"(function(ENV){"+script+"})("+instanceName+".ENV);"}}(instanceName),this._D.head.dataset[instanceNameTag]?bailout(cb,Error("Kisume: instance with same name already initialized on this window")):(this._W.addEventListener("message",this._listener),script="("+KISUME_BOTTOM+")('"+instanceName+"');",script=this.options.coffee?""+COFFEE_RUNTIME+";(function(){"+script+";})();":"(function(){"+COFFEE_RUNTIME+";"+script+";})();",this.inject(script),this._D.head.dataset[instanceNameTag]=this.VERSION)):new Kisume(W,instanceName,opt,cb)},function(){var W,instanceName,x;switch(W=arguments[0],instanceName=arguments[1],x=3<=arguments.length?__slice.call(arguments,2):[],x.length){case 0:case 1:return _.call.apply(_,[this,W,instanceName,{}].concat(__slice.call(x)));case 2:return _.apply(this,arguments)}}}(),Kisume.prototype.inject=function(script){var el;return el=this._D.createElement("script"),el.textContent=script,this._D.head.appendChild(el)},Kisume.prototype.set=function(ns,includes,o,cb){var f,i,name,q,v,x,_i,_len;f="",v=[];for(name in o)if(__hasProp.call(o,name))switch(x=o[name],!1){case!(x instanceof Function):f+=""+ns+"["+quote(name)+"] = ("+x+");\n";break;case!(x instanceof Node):break;default:v.push({name:name,value:x})}if(f){for(includes=unique((includes||[]).concat(ns).sort()),q="",_i=0,_len=includes.length;_len>_i;_i++)i=includes[_i],q+="var "+i+" = ENV("+quote(i)+");\n";this.inject(this.closure(""+q+";"+f+";"))}return this._Q_dn(cb,{type:"set",ns:ns,v:v})},Kisume.prototype.get=function(ns,names,cb){return names=strings(names),this._Q_dn(cb,{type:"get",ns:ns,names:names})},_run=function(async){var _bound,_iife;return _iife=function(){var args,cb,f,n,_i;return f=arguments[0],args=3<=arguments.length?__slice.call(arguments,1,_i=arguments.length-1):(_i=1,[]),cb=arguments[_i++],n=this._Q_dn(),this.inject(this.closure(""+this.instanceName+".iife["+n+"] = ("+f+");")),this._Q_dn(cb,{type:"run",async:async,iife:n,args:args})},_bound=function(){var args,cb,name,ns,_i;return ns=arguments[0],name=arguments[1],args=4<=arguments.length?__slice.call(arguments,2,_i=arguments.length-1):(_i=2,[]),cb=arguments[_i++],this._Q_dn(cb,{type:"run",async:async,ns:ns,name:name,args:args})},function(){var x,xs;return x=arguments[0],xs=2<=arguments.length?__slice.call(arguments,1):[],function(){switch(typeof x){case"function":return _iife;case"string":return _bound;default:return function(){}}}().apply(this,arguments)}},Kisume.prototype.run=_run(!1),Kisume.prototype.runAsync=_run(!0),Kisume.prototype._Q_dn=function(){var n;return n=0,function(cb,o){return++n,cb&&(this._tran[n]=san_func(cb)),null!=o&&(o._kisume_v1_instanceName=this.instanceName,o._kisume_v1_Q_dn=n,this._W.postMessage(o,this._W.location.origin)),n}}(),Kisume.prototype._A_up=function(n,o){var cb;switch(cb=this._tran[n],o.type){case"init":this._init_cb.call(this);break;case"set":case"get":case"run":o.async?cb.apply(null,[o.err].concat(__slice.call(o.rets))):cb(o.err,o.ret)}return delete this._tran[n]},Kisume.prototype._listener=function(e){var n,o;if(e.origin===window.location.origin&&null!=(o=e.data)&&o._kisume_v1_instanceName===this.instanceName)switch(!1){case null==(n=o._kisume_v1_A_up):return this._A_up(n,o)}},Kisume}(),KISUME_BOTTOM=function(instanceName){/*! Kisume 1.0.0*/
var kisumeInstance;if(!window[instanceName])return window[instanceName]=kisumeInstance=new(function(){function _Class(){var _this=this;this.instanceName=instanceName,this.iife={},this._tran={},this._ENV={},this.ENV=function(x){var ns,_base;return(ns=null!=x?x.toString():void 0)?(_base=_this._ENV)[ns]||(_base[ns]={}):_this._ENV}}return _Class.prototype.VERSION="1.0.0",_Class.prototype.TRACE="true",_Class.prototype._err=function(e){switch(!1){case!(e instanceof Error):return function(){var message,name,stack;return name=e.name,message=e.message,stack=e.stack,{name:name,message:message,stack:stack}}();case null==e:return e;default:return!0}},_Class.prototype._A_up=function(n,o){o._kisume_v1_instanceName=this.instanceName,o._kisume_v1_A_up=n,window.postMessage(o,window.location.origin)},_Class.prototype._Q_dn=function(n,o){var e,f,name,ret,t,value,x,_i,_j,_len,_len1,_ref1,_ref2,_ref3,_this=this;try{switch(o.type){case"set":for(x=this.ENV(o.ns),_ref1=o.v,_i=0,_len=_ref1.length;_len>_i;_i++)_ref2=_ref1[_i],name=_ref2.name,value=_ref2.value,x[name]=value;this._A_up(n,{type:"set"});break;case"get":for(x=this.ENV(o.ns),ret={},_ref3=o.names,_j=0,_len1=_ref3.length;_len1>_j;_j++)name=_ref3[_j],ret[name]=function(v){switch(!1){case!(v instanceof Function):return v.toString();case!(v instanceof Node):return"Node";case!(v instanceof Error):return this._err(v);default:return v}}(x[name]);this._A_up(n,{type:"get",ret:ret});break;case"run":null!=o.iife?(f=this.iife[o.iife],t=this._ENV):(f=this.ENV(o.ns)[o.name],t=this.ENV(o.ns)),f instanceof Function?o.async?f.call.apply(f,[t].concat(__slice.call(o.args),[function(){var err,rets;return err=arguments[0],rets=2<=arguments.length?__slice.call(arguments,1):[],_this._A_up(n,{type:"run",async:!0,err:err,rets:rets})}])):(ret=f.apply(t,o.args),this._A_up(n,{type:"run",async:!1,ret:ret})):this._A_up(n,{type:"run",err:"KISUME: function not found"})}}catch(_error){e=_error,this._A_up(n,{type:o.type,async:!1,err:this._err(e)})}},_Class}()),window.addEventListener("message",function(e){var n,o;if(e.origin===window.location.origin&&null!=(o=e.data)&&o._kisume_v1_instanceName===instanceName)switch("true"===kisumeInstance.TRACE&&(null!=o.err?console.warn(o):console.info(o)),!1){case null==(n=o._kisume_v1_Q_dn):return kisumeInstance._Q_dn(n,o)}}),kisumeInstance._A_up(0,{_kisume_v1_instanceName:instanceName,type:"init"})},function(exports){return exports.Kisume=Kisume}("undefined"!=typeof exports&&null!==exports?exports:this),COFFEE_RUNTIME="var __slice=[].slice,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1},__hasProp={}.hasOwnProperty,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};window.iced={Deferrals:function(){function _Class(_arg){this.continuation=_arg;this.count=1;this.ret=null}_Class.prototype._fulfill=function(){if(!--this.count){return this.continuation(this.ret)}};_Class.prototype.defer=function(defer_params){var _this=this;++this.count;return function(){var inner_params,_ref;inner_params=1<=arguments.length?__slice.call(arguments,0):[];if(defer_params!=null){if((_ref=defer_params.assign_fn)!=null){_ref.apply(null,inner_params)}}return _this._fulfill()}};return _Class}(),findDeferral:function(){return null},trampoline:function(_fn){return _fn()}};"}.call(this);
/*!
https://github.com/smilekzs/lru-minimal/
!
*/
!function(){var Lru,SMap,__hasProp={}.hasOwnProperty;SMap=function(){var bailout,esc,str,unesc;return str=function(k){return null!=k?k.toString():void 0},esc=function(s){return"\0"+s},unesc=function(s){return s.slice(1)},bailout=function(){throw Error("SMap: invalid key")},SMap=function(){function SMap(){this.clear()}return SMap.prototype.clear=function(){this.o={},this.size=0},SMap.prototype.set=function(k,v){var ek,ret,sk;return null==(sk=str(k))&&bailout(),ek=esc(sk),(ret=!(ek in this.o))&&++this.size,this.o[ek]=v,ret},SMap.prototype.get=function(k){var sk;return null==(sk=str(k))&&bailout(),this.o[esc(sk)]},SMap.prototype.has=function(k){return null!=this.get(k)},SMap.prototype["delete"]=function(k){var ek,ret,sk;return null==(sk=str(k))&&bailout(),ek=esc(sk),(ret=ek in this.o)&&(--this.size,delete this.o[ek]),ret},SMap.prototype.forEach=function(cb){var ek,sk,v,_ref;_ref=this.o;for(ek in _ref)__hasProp.call(_ref,ek)&&(v=_ref[ek],sk=unesc(ek),cb(sk,v))},SMap.prototype.toArray=function(){var ek,sk,v,_ref,_results;_ref=this.o,_results=[];for(ek in _ref)__hasProp.call(_ref,ek)&&(v=_ref[ek],sk=unesc(ek),_results.push([sk,v]));return _results},SMap}()}(),Lru=function(){var bump,insert,link,unlink;return insert=function(p,n,k,v){var x;return link(p,n,x={p:p,n:n,k:k,v:v}),x},link=function(p,n,x){return x.p=p,x.n=n,p.n=n.p=x,x},unlink=function(x){return x.p.n=x.n,x.n.p=x.p,x},bump=function(x,head){return unlink(x),link(head,head.n,x)},Lru=function(){function Lru(cap){this.cap=cap,this.clear()}return Lru.prototype.clear=function(){return this.map=new SMap,this.size=0,this.head={p:null,n:null,k:null,v:null},this.tail={p:null,n:null,k:null,v:null},this.head.n=this.tail,this.tail.p=this.head},Lru.prototype.set=function(k,v){var x;return(x=this.map.get(k))?(bump(x,this.head),x.k=k,x.v=v,!1):(this.map.size>=this.cap&&this.shift(),x=insert(this.head,this.head.n,k,v),this.map.set(k,x),this.size=this.map.size,!0)},Lru.prototype.get=function(k){var x;return(x=this.map.get(k))?(bump(x,this.head),x.v):void 0},Lru.prototype.has=function(k){return null!=this.get(k)},Lru.prototype["delete"]=function(k){var x;return(x=this.map.get(k))?(unlink(x),this.map["delete"](k),this.size=this.map.size,!0):!1},Lru.prototype.shift=function(){var x;return x=this.tail.p,x.p?(unlink(x),this.map["delete"](x.k),this.size=this.map.size,[x.k,x.v]):void 0},Lru.prototype.forEach=function(cb){var x,_results;for(x=this.head.n,_results=[];x.n;)cb(x.k,x.v),_results.push(x=x.n);return _results},Lru.prototype.toArray=function(){var ret,x;for(ret=[],x=this.head.n;x.n;)ret.push([x.k,x.v]),x=x.n;return ret},Lru}()}(),function(exp){return exp.SMap=SMap,exp.Lru=Lru}(function(){switch(!1){case!("undefined"!=typeof module&&null!==module?module.exports:void 0):return module.exports;case"undefined"==typeof window||null===window:return window}}())}.call(this);
/*!
 * marked - a markdown parser
 * Copyright (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 * 
 * MathJax syntax by smilekzs
 * https://github.com/smilekzs/marked
 */
!function(){function Lexer(options){this.tokens=[],this.tokens.links={},this.options=options||marked.defaults,this.rules=block.normal,this.options.gfm&&(this.rules=this.options.tables?block.tables:block.gfm)}function InlineLexer(links,options){if(this.options=options||marked.defaults,this.links=links,this.rules=inline.normal,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.rules=this.options.breaks?inline.breaks:inline.gfm:this.options.pedantic&&(this.rules=inline.pedantic)}function Parser(options){this.tokens=[],this.token=null,this.options=options||marked.defaults}function escape(html,encode){return html.replace(encode?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function replace(regex,opt){return regex=regex.source,opt=opt||"",function self(name,val){return name?(val=val.source||val,val=val.replace(/(^|[^\[])\^/g,"$1"),regex=regex.replace(name,val),self):new RegExp(regex,opt)}}function noop(){}function merge(obj){for(var target,key,i=1;i<arguments.length;i++){target=arguments[i];for(key in target)Object.prototype.hasOwnProperty.call(target,key)&&(obj[key]=target[key])}return obj}function marked(src,opt,callback){if(callback||"function"==typeof opt){callback||(callback=opt,opt=null),opt&&(opt=merge({},marked.defaults,opt));var tokens,pending,highlight=opt.highlight,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(hi){var out,err;hi!==!0&&delete opt.highlight;try{out=Parser.parse(tokens,opt)}catch(e){err=e}return opt.highlight=highlight,err?callback(err):callback(null,out)};if(!highlight||highlight.length<3)return done(!0);if(!pending)return done();for(;i<tokens.length;i++)!function(token){return"code"!==token.type?--pending||done():highlight(token.text,token.lang,function(err,code){return null==code||code===token.text?--pending||done():(token.text=code,token.escaped=!0,--pending||done(),void 0)})}(tokens[i])}else try{return opt&&(opt=merge({},marked.defaults,opt)),Parser.parse(Lexer.lex(src,opt),opt)}catch(e){if(e.message+="\nPlease report this to https://github.com/chjj/marked.",(opt||marked.defaults).silent)return"<p>An error occured:</p><pre>"+escape(e.message+"",!0)+"</pre>";throw e}}var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){3,} *\n*/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def|math))+)\n*/,text:/^[^\n]+/,math:/^ *(\${3,}) *([\s\S]+?)\s*\1 *(?:\n+|$)/};block.bullet=/(?:[*+-]|\d+\.)/,block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,block.item=replace(block.item,"gm")(/bull/g,block.bullet)(),block.list=replace(block.list)(/bull/g,block.bullet)("hr",/\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)(),block._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b",block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)(),block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)("math",block.math)(),block.normal=merge({},block),block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|")(),block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),Lexer.rules=block,Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)},Lexer.prototype.lex=function(src){return src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(src,!0)},Lexer.prototype.token=function(src,top){for(var next,loose,cap,bull,b,item,space,i,l,src=src.replace(/^ +$/gm,"");src;)if((cap=this.rules.newline.exec(src))&&(src=src.substring(cap[0].length),cap[0].length>1&&this.tokens.push({type:"space"})),cap=this.rules.code.exec(src))src=src.substring(cap[0].length),cap=cap[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?cap:cap.replace(/\n+$/,"")});else if(cap=this.rules.fences.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"code",lang:cap[2],text:cap[3]});else if(cap=this.rules.math.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"math",text:cap[2]});else if(cap=this.rules.heading.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});else if(top&&(cap=this.rules.nptable.exec(src))){for(src=src.substring(cap[0].length),item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")},i=0;i<item.align.length;i++)item.align[i]=/^ *-+: *$/.test(item.align[i])?"right":/^ *:-+: *$/.test(item.align[i])?"center":/^ *:-+ *$/.test(item.align[i])?"left":null;for(i=0;i<item.cells.length;i++)item.cells[i]=item.cells[i].split(/ *\| */);this.tokens.push(item)}else if(cap=this.rules.lheading.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"heading",depth:"="===cap[2]?1:2,text:cap[1]});else if(cap=this.rules.hr.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"hr"});else if(cap=this.rules.blockquote.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"blockquote_start"}),cap=cap[0].replace(/^ *> ?/gm,""),this.token(cap,top),this.tokens.push({type:"blockquote_end"});else if(cap=this.rules.list.exec(src)){for(src=src.substring(cap[0].length),bull=cap[2],this.tokens.push({type:"list_start",ordered:bull.length>1}),cap=cap[0].match(this.rules.item),next=!1,l=cap.length,i=0;l>i;i++)item=cap[i],space=item.length,item=item.replace(/^ *([*+-]|\d+\.) +/,""),~item.indexOf("\n ")&&(space-=item.length,item=this.options.pedantic?item.replace(/^ {1,4}/gm,""):item.replace(new RegExp("^ {1,"+space+"}","gm"),"")),this.options.smartLists&&i!==l-1&&(b=block.bullet.exec(cap[i+1])[0],bull===b||bull.length>1&&b.length>1||(src=cap.slice(i+1).join("\n")+src,i=l-1)),loose=next||/\n\n(?!\s*$)/.test(item),i!==l-1&&(next="\n"===item[item.length-1],loose||(loose=next)),this.tokens.push({type:loose?"loose_item_start":"list_item_start"}),this.token(item,!1),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(cap=this.rules.html.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===cap[1]||"script"===cap[1],text:cap[0]});else if(top&&(cap=this.rules.def.exec(src)))src=src.substring(cap[0].length),this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};else if(top&&(cap=this.rules.table.exec(src))){for(src=src.substring(cap[0].length),item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")},i=0;i<item.align.length;i++)item.align[i]=/^ *-+: *$/.test(item.align[i])?"right":/^ *:-+: *$/.test(item.align[i])?"center":/^ *:-+ *$/.test(item.align[i])?"left":null;for(i=0;i<item.cells.length;i++)item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(item)}else if(top&&(cap=this.rules.paragraph.exec(src)))src=src.substring(cap[0].length),this.tokens.push({type:"paragraph",text:"\n"===cap[1][cap[1].length-1]?cap[1].slice(0,-1):cap[1]});else if(cap=this.rules.text.exec(src))src=src.substring(cap[0].length),this.tokens.push({type:"text",text:cap[0]});else if(src)throw new Error("Infinite loop on byte: "+src.charCodeAt(0));return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#$+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`$]| {2,}\n|$)/,math:/^\$\$\s*([\s\S]*?[^\$])\s*\$\$(?!\$)/};inline._inside=/(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/,inline._href=/\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)(),inline.reflink=replace(inline.reflink)("inside",inline._inside)(),inline.normal=merge({},inline),inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()}),inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()}),InlineLexer.rules=inline,InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)},InlineLexer.prototype.output=function(src){for(var link,text,href,cap,out="";src;)if(cap=this.rules.escape.exec(src))src=src.substring(cap[0].length),out+=cap[1];else if(cap=this.rules.autolink.exec(src))src=src.substring(cap[0].length),"@"===cap[2]?(text=":"===cap[1][6]?this.mangle(cap[1].substring(7)):this.mangle(cap[1]),href=this.mangle("mailto:")+text):(text=escape(cap[1]),href=text),out+='<a href="'+href+'">'+text+"</a>";else if(cap=this.rules.url.exec(src))src=src.substring(cap[0].length),text=escape(cap[1]),href=text,out+='<a href="'+href+'">'+text+"</a>";else if(cap=this.rules.tag.exec(src))src=src.substring(cap[0].length),out+=this.options.sanitize?escape(cap[0]):cap[0];else if(cap=this.rules.link.exec(src))src=src.substring(cap[0].length),out+=this.outputLink(cap,{href:cap[2],title:cap[3]});else if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){if(src=src.substring(cap[0].length),link=(cap[2]||cap[1]).replace(/\s+/g," "),link=this.links[link.toLowerCase()],!link||!link.href){out+=cap[0][0],src=cap[0].substring(1)+src;continue}out+=this.outputLink(cap,link)}else if(cap=this.rules.strong.exec(src))src=src.substring(cap[0].length),out+="<strong>"+this.output(cap[2]||cap[1])+"</strong>";else if(cap=this.rules.em.exec(src))src=src.substring(cap[0].length),out+="<em>"+this.output(cap[2]||cap[1])+"</em>";else if(cap=this.rules.code.exec(src))src=src.substring(cap[0].length),out+="<code>"+escape(cap[2],!0)+"</code>";else if(cap=this.rules.math.exec(src))src=src.substring(cap[0].length),out+='<script type="math/tex">'+cap[1]+"</script>";else if(cap=this.rules.br.exec(src))src=src.substring(cap[0].length),out+="<br>";else if(cap=this.rules.del.exec(src))src=src.substring(cap[0].length),out+="<del>"+this.output(cap[1])+"</del>";else if(cap=this.rules.text.exec(src))src=src.substring(cap[0].length),out+=escape(this.smartypants(cap[0]));else if(src)throw new Error("Infinite loop on byte: "+src.charCodeAt(0));return out},InlineLexer.prototype.outputLink=function(cap,link){return"!"!==cap[0][0]?'<a href="'+escape(link.href)+'"'+(link.title?' title="'+escape(link.title)+'"':"")+">"+this.output(cap[1])+"</a>":'<img src="'+escape(link.href)+'" alt="'+escape(cap[1])+'"'+(link.title?' title="'+escape(link.title)+'"':"")+">"},InlineLexer.prototype.smartypants=function(text){return this.options.smartypants?text.replace(/--/g,"—").replace(/'([^']*)'/g,"‘$1’").replace(/"([^"]*)"/g,"“$1”").replace(/\.{3}/g,"…"):text},InlineLexer.prototype.mangle=function(text){for(var ch,out="",l=text.length,i=0;l>i;i++)ch=text.charCodeAt(i),Math.random()>.5&&(ch="x"+ch.toString(16)),out+="&#"+ch+";";return out},Parser.parse=function(src,options){var parser=new Parser(options);return parser.parse(src)},Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options),this.tokens=src.reverse();for(var out="";this.next();)out+=this.tok();return out},Parser.prototype.next=function(){return this.token=this.tokens.pop()},Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},Parser.prototype.parseText=function(){for(var body=this.token.text;"text"===this.peek().type;)body+="\n"+this.next().text;return this.inline.output(body)},Parser.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return"<hr>\n";case"heading":return"<h"+this.token.depth+">"+this.inline.output(this.token.text)+"</h"+this.token.depth+">\n";case"code":if(this.options.highlight){var code=this.options.highlight(this.token.text,this.token.lang);null!=code&&code!==this.token.text&&(this.token.escaped=!0,this.token.text=code)}return this.token.escaped||(this.token.text=escape(this.token.text,!0)),"<pre><code"+(this.token.lang?' class="'+this.options.langPrefix+this.token.lang+'"':"")+">"+this.token.text+"</code></pre>\n";case"math":return'<script type="math/tex; mode=display">'+this.token.text+"</script>";case"table":var heading,i,row,cell,j,body="";for(body+="<thead>\n<tr>\n",i=0;i<this.token.header.length;i++)heading=this.inline.output(this.token.header[i]),body+=this.token.align[i]?'<th align="'+this.token.align[i]+'">'+heading+"</th>\n":"<th>"+heading+"</th>\n";for(body+="</tr>\n</thead>\n",body+="<tbody>\n",i=0;i<this.token.cells.length;i++){for(row=this.token.cells[i],body+="<tr>\n",j=0;j<row.length;j++)cell=this.inline.output(row[j]),body+=this.token.align[j]?'<td align="'+this.token.align[j]+'">'+cell+"</td>\n":"<td>"+cell+"</td>\n";body+="</tr>\n"}return body+="</tbody>\n","<table>\n"+body+"</table>\n";case"blockquote_start":for(var body="";"blockquote_end"!==this.next().type;)body+=this.tok();return"<blockquote>\n"+body+"</blockquote>\n";case"list_start":for(var type=this.token.ordered?"ol":"ul",body="";"list_end"!==this.next().type;)body+=this.tok();return"<"+type+">\n"+body+"</"+type+">\n";case"list_item_start":for(var body="";"list_item_end"!==this.next().type;)body+="text"===this.token.type?this.parseText():this.tok();return"<li>"+body+"</li>\n";case"loose_item_start":for(var body="";"list_item_end"!==this.next().type;)body+=this.tok();return"<li>"+body+"</li>\n";case"html":return this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);case"paragraph":return"<p>"+this.inline.output(this.token.text)+"</p>\n";case"text":return"<p>"+this.parseText()+"</p>\n"}},noop.exec=noop,marked.options=marked.setOptions=function(opt){return merge(marked.defaults,opt),marked},marked.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1},marked.Parser=Parser,marked.parser=Parser.parse,marked.Lexer=Lexer,marked.lexer=Lexer.lex,marked.InlineLexer=InlineLexer,marked.inlineLexer=InlineLexer.output,marked.parse=marked,"object"==typeof exports?module.exports=marked:"function"==typeof define&&define.amd?define(function(){return marked}):this.marked=marked}.call(function(){return this||("undefined"!=typeof window?window:global)}());
/*!
Calculates the specificity of CSS selectors
http://www.w3.org/TR/css3-selectors/#specificity

Originally from: https://github.com/keeganstreet/specificity
Simplified by: smilekzs

Returns: []{selector: '...', specificity: [a, b, c]}
*/
var getSpecificity;getSpecificity=function(){var attributeRegex,calculate,calculateSingle,classRegex,elementRegex,idRegex,pseudoClassRegex,pseudoClassWithBracketsRegex,pseudoElementRegex;return attributeRegex=/(\[[^\]]+\])/g,idRegex=/(#[^\s\+>~\.\[:]+)/g,classRegex=/(\.[^\s\+>~\.\[:]+)/g,pseudoElementRegex=/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,pseudoClassWithBracketsRegex=/(:[\w-]+\([^\)]*\))/gi,pseudoClassRegex=/(:[^\s\+>~\.\[:]+)/g,elementRegex=/([^\s\+>~\.\[:]+)/g,calculateSingle=function(selector){var findMatch,s,specificity;return s=selector,specificity=[0,0,0],findMatch=function(regex,type){var match,matches,_i,_len,_results;if(matches=s.match(regex)){for(_results=[],_i=0,_len=matches.length;_len>_i;_i++)match=matches[_i],specificity[type]++,_results.push(s=s.replace(match,Array(match.length+1).join(" ")));return _results}},s.replace(/:not\(([^\)]*)\)/g," $1 "),findMatch(attributeRegex,1),findMatch(idRegex,0),findMatch(classRegex,1),findMatch(pseudoElementRegex,2),findMatch(pseudoClassWithBracketsRegex,1),findMatch(pseudoClassRegex,1),s=s.replace(/[\*\s\+>~]/g," "),s=s.replace(/[#\.]/g," "),findMatch(elementRegex,2),{selector:selector,specificity:specificity}},calculate=function(str){return str.split(",").filter(function(s){return s.length}).map(calculateSingle)}}();
;var PACKED_CSS={"cssbase.css":"h1{font-size:138.5%}h2{font-size:123.1%}h3{font-size:108%}h1,h2,h3{margin:1em 0}h1,h2,h3,h4,h5,h6,strong{font-weight:700}abbr,acronym{border-bottom:1px dotted #000;cursor:help}em{font-style:italic}blockquote,ul,ol,dl{margin:1em}ol,ul,dl{margin-left:2em}ol{list-style:decimal outside}ul{list-style:disc outside}dl dd{margin-left:1em}th,td{border:1px solid #000;padding:.5em}th{font-weight:700;text-align:center}caption{margin-bottom:.5em;text-align:center}p,fieldset,table,pre{margin-bottom:1em}input[type=text],input[type=password],textarea{width:12.25em;*width:11.9em}#yui3-css-stamp.cssbase{display:none}","cssreset.css":"html{color:#000;background:#FFF}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td{margin:0;padding:0}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:400}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400}q:before,q:after{content:''}abbr,acronym{border:0;font-variant:normal}sup{vertical-align:text-top}sub{vertical-align:text-bottom}input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit}input,textarea,select{*font-size:100%}legend{color:#000}#yui3-css-stamp.cssreset{display:none}","markdown.css":"/*!\n * renren-markdown default markdown styling\n * derived from github.com, modified for consistent inlined display\n */.rrmd{font-size:15px;line-height:1.7;overflow:hidden}.rrmd>:first-child{margin-top:0!important}.rrmd>:last-child{margin-bottom:0!important}.rrmd p,.rrmd blockquote,.rrmd ul,.rrmd ol,.rrmd dl,.rrmd table,.rrmd pre{margin:15px 0}.rrmd blockquote{border-left:4px solid #DDD;padding:0 15px;color:#777}.rrmd blockquote>:first-child{margin-top:0}.rrmd blockquote>:last-child{margin-bottom:0}.rrmd table{width:100%;overflow:auto;display:block}.rrmd table th{font-weight:700}.rrmd table th,.rrmd table td{border:1px solid #ddd;padding:6px 13px}.rrmd table tr{border-top:1px solid #ccc;background-color:#fff}.rrmd table tr:nth-child(2n){background-color:#f8f8f8}.rrmd h1,.rrmd h2,.rrmd h3,.rrmd h4,.rrmd h5,.rrmd h6{margin:1em 0 15px;padding:0;font-weight:700;line-height:1.7;cursor:text;position:relative}.rrmd h1{font-size:2.5em;border-bottom:1px solid #ddd}.rrmd h2{font-size:2em;border-bottom:1px solid #eee}.rrmd h3{font-size:1.5em}.rrmd h4{font-size:1.2em}.rrmd h5{font-size:1em}.rrmd h6{color:#777;font-size:1em}.rrmd li p.first{display:inline-block}.rrmd ul,.rrmd ol{padding-left:30px}.rrmd ul ul,.rrmd ul ol,.rrmd ol ol,.rrmd ol ul{margin-top:0;margin-bottom:0}.rrmd ol{list-style:decimal outside}.rrmd ul{list-style:disc outside}.rrmd code,.rrmd pre{font-family:Consolas,\"Liberation Mono\",Courier,monospace;font-size:12px}.rrmd h1 tt,.rrmd h1 code,.rrmd h2 tt,.rrmd h2 code,.rrmd h3 tt,.rrmd h3 code,.rrmd h4 tt,.rrmd h4 code,.rrmd h5 tt,.rrmd h5 code,.rrmd h6 tt,.rrmd h6 code{font-size:inherit}.rrmd code,.rrmd tt{margin:0 2px;padding:0 5px;border:1px solid #ddd;background-color:#f8f8f8;border-radius:3px}.rrmd code{white-space:nowrap}.rrmd pre>code{margin:0;padding:0;white-space:pre;border:0;background:transparent}.rrmd .highlight pre,.rrmd pre{background-color:#f8f8f8;border:1px solid #ddd;font-size:13px;line-height:19px;overflow:auto;padding:6px 10px;border-radius:3px}.rrmd pre code,.rrmd pre tt{margin:0;padding:0;background-color:transparent;border:0}.rrmd img{max-width:100%;-moz-box-sizing:border-box;box-sizing:border-box}.rrmd hr{background:transparent url(http://assets.github.com/images/modules/pulls/dirty-shade.png) repeat-x 0 0;border:0 none;color:#ccc;height:4px;padding:0;margin:15px 0}.rrmd s,.rrmd del{text-decoration:line-through;color:#ccc}.rrmd sup{vertical-align:super;font-size:smaller}.rrmd sub{vertical-align:sub;font-size:smaller}","ui.css":"/*!\n * renren-markdown ui stylesheet\n */*{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}#left{position:absolute;top:0;left:0;width:50%;height:100%;z-index:10}#right{position:absolute;top:0;right:0;width:50%;height:100%;z-index:10}#area{font-family:Consolas,Inconsolata,'Courier New',Courier,monospace}#preview{border:0}.full{position:relative;top:0;left:0;width:100%;height:100%}.pad{padding:10px 15px}#commit{position:absolute;right:10px;top:10px;z-index:2147483647;padding:2px 4px}"};

;var PACKED_HTML={"ui-button.html":"<input type=\"button\" id=\"rrmd-ui-open\" value=\"\" onclick=\"kisume_rrmd.ENV('util').launchFullScreen(this);return false;\" style=\"\n    background: no-repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAADQCAYAAAB2pO90AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABANSURBVHic7d1/zCVVfcfx91n2B5SKSFrrKtQ0WKnlKclmlxDQFpudESqosYhWqdCGVmwrWa1IIRrA/lCjtMnGSF1oqmzTaNJYReumZkZFKxDCbqlkC9nEpLEoWNtiYyp1n93l9I8zd7nP3efee2bOmd+fV3KT3ee5c+bMd+b7zMx3zswYay3LGGO2ACvAdmBH8VkBNi2dWKT7jgAHgf3F5wBw0Fp7eOmU1tq5H1yCvB84DFh99BnR5zBu29+0KEfMvD2QMWYF2AtsW/cLIuPwMHC1tfbger/cMPsDY8xJxpibcLsxJY+M3TbggDHmJmPMSbO/XLMHKr7wZeDi5von0htfA3Zaa49NfjC7B3oPSh6ReS7G5chxx/dAxTnPAWBz8/0S6Y1VYPvknGgDgDFmE65goOQRWWwzsLfImeOHcO9DBQMRX9twOYMBtgA/RHsfkTJWgdM24kYUlEmeQ8Bu3BXbR7yu1op0VDHK5jzc6JpdwDmek24GVjbihuf42gtcZ639caleinRUsQN4CHjIGPMJYA9wtefk2zfgMs/HIZQ8MmDFtn0dblv3saNMAu1W8sjQFdv4bs+v79iAOwfysb9al0R6x3dbXzG4kac+TlbBQMagKCx4HW15J5C11oR0SqRPjDFeeXHCaGwR8acEEgmgBBIJoAQSCaAEEgmgBBIJoAQSCaAEEgmgBBIJoAQSCaAEEgmwse0ONMGk+Sbg7AqT/q/Nku/E7k/fKH7zjSKBgBcBj1WY7kvApZH70keK3xw6hBMJoAQSCaAEEgmgBBIJoAQSCaAEEgmgBBIJoAQSCTCWBDrh1Xye9BZyR/GbYywJVHVF6o0VjuI3x1gSqOqK3BK1F/2l+M2hBKpnuqFR/OZQAi12etRe9JfiN8dYEui5Faf7qai96C/Fbw4l0GKnmjQf/HG8B8VvDiXQci+I1ov+UvzmGEsCPS9g2ip3Yg6N4jfHWBLoZwKmHfQG4Enxm2MsCfTCgGkHvQF4UvzmUAIt9wvRetFfit8cY0mgswKm3R6tF/2l+M0x+Fc8mjQ/BfgRblmreoHNkv+I1KVeGWv89IrHZ72UsJUPcEGMjvSU4rfAGBLonAht7IzQRl8pfguMIYFWIrQx6IcDLqH4LTCGBNoRoY2XmjT/uQjt9JHit8AYEuj8SO28IVI7faP4LTDoBDJp/hLijQh+c6R2ekPxW27QCQS8KmJb20yaD/qi4DoUvyWGnkCXRG7vtyO313WK3xKDvZBq0nwz8F/AcyI2+xRwps2S/4vYZieNPX66kAq/RtyVD3AG8NbIbXaV4udhyAn0mzW1e4NJ86rPSesTxc/DIBPIpPnzgMtrav7ngWtqarsTFD9/g0wg4HeBk2ts/5aB3+uv+HkaXAKZNN8IvKPm2bwYeG/N82iF4lfO4BIIuIqw+1d83WTS/JcamE/TFL8SBlXGLg4LDuH+wjVhP3ChzZKjDc2vVorfs8Zaxv49mlv54AZafrDB+dVN8StpMHsgk+ZbgX+l2iOYHgHOqzhrC7zGZskXK07fCYrfWmPcA32c6s8vuwb4p4rTGuBvB3A8r/hVMIgEMml+FfDaipN/xWbJvwDvwXNvvI7nAvtMmp9ZcfpWKX7V9T6BTJr/IvCXAU18GMBmyYPAXwW0cybwjybNfzqgjcYpfmF6nUAmzU8H7qH6mK1v2Cz50tT/b8INoKzqXOCrJs1DnuTZGMUvXG8TyKT5JuDTwEsCmllzMc9myVPAjSH94tmNYGtgO7VS/OLoZQIVV8s/Tdj9Kv9gs+Trsz+0WfIJ4AsB7QK8DHjQpHnVylStFL94epdAxcr/G+DXA5pZBd614Pe/A3w/oH1wV/PvM2l+WWA7USl+cfUqgUyanwbsA34jsKk/t1nyrXm/tFnyfdxGEOongc+bNL/NpHnrsVb84utkp9Zj0vxngfuANLCpQ8CfLPuSzZIvAHcEzgtcjG8FcpPmrb1sSvGrRy8SyKT5rwAPEv6Qv2PANSVuKX4ncH/gPCd+FfimSfPXRWrPm+JXn04P5SnuXLwFV+2JcRfjB2yWlBpGX1SD/pm4ryr8O+D6uh+4rvhV5zuUp7MJZNL8XOBO4KJITX4d2Fll5K9J84uAHDglUl/APWDjvcBdNkuORWwXUPxC9TaBTJqfijvmfSewKVKz3wO22Sz5XkC/Xgv8PXH+kk87CPyhzZIsRmOKXxy9S6DicOMq4E+Je0PXj4CLbZYcCG3IpPm1hA1XWeSLwLttlhyqMrHiFxa/Wb1JIJPmBngTcBtxXqUx7Rng9TZLPh+rQZPmNwMfiNXejKPAx4D32yz5gWd/FL9nlY7fPL24ncGk+etx95J8ivgrH+APYq58AJslHwTeF7PNKRuBXcC3TJovfX6a4neCUvGLoZUEMml+qUnzh3DHxDHeP7Oed9ks+XgdDdss+TPghjraLjwH+Ld5v1T8lloYv5gaPYQzaX428EngFaFtLfFHNks+XPM8MGn++8BHif+H6B02Sz62zvwUPz/rxq+Mrh7CfRt3UlqXZ4C3N7HyAWyW3IEbUxZzme5esPIVv+UWxS+6RhOouIbwBiC4orOOHwNvtFmyp4a257JZcg/wy8B3IzR3AHj7gnkpfostjF8dWqnCmTR/Pm6Ix9mRmvwOrlq0P1J7pZk0fxHwOaq/EvE/gR02S/7dY16K34m84+fVn44ewgHHR+teilvoUPfhAtfaygewWfJd4OW4Y/qyjgFv8l35it8JSsUvplavA5k0Px/4KnBqhcmfwd2Pf4vNkiNROxaoKC//NXC65yTvtlnyFxXmo/g5leK3sA89upB6GW7XvbHEZE8Ab7VZ8pU6+hSDSfMXA3ex/PaBT9kseUvAfC7DPdegzBAZxW/Z/Lt8CDeteKCe74mfxQX13C6vfACbJd+2WfIq4Frgf+Z87ZsE3nim+EW5ca+y1vdAxzuS5rfhBkHO8yjuyvi9dfajDibNX4h7cOFrpn7838D5NkuiXPBT/CLPsy+HcNNMmt/FiX9RfoAb53VHFx9CXkbxAMPduGP7S22W5JHbV/xizaunCXQS8FncX5pjuPtZbrFZEvKssU4pnnl2kc2Sz9bQtuIXaz59TCAAk+anALcDe2yWPNLEPIdE8Yujtwkk0gW9qcKJ9JkSSCSAEkgkgBJIJIASSCSAEkgkgBJIJIASSCSAEkgkgBJIJECZm9ii8h0qUcJ11to7I7cZhTHmbUDUh3V0aWhV7HXZpWVbprWxcDUk0CrwSmvtA5HbDWKMuRC4F9gcs90ubWRDTKDODyatIYEAngS2W2ufrKHt0owxW3GPWor+xukubGQTY06goZ0DbQU+Y4yJ+te+iqIPn6GG5JHuGFoCAVxItUcjxfZRXF9kwIaYQABvK07cW1HMu7X5S3OGdg40rZWiQl1Fg1ldOE+YGPM50JATCBouKtRZNJjVhY1sYswJNNRDuInGigoqGozT0BMImisqqGgwQmNIIKi5qKCiwXgN/RxoWi1FhaaKBrO6cJ4wMeZzoDElEEQuKjRZNJjVhY1sYswJNJZDuIloRQUVDQTGl0AQr6igooGMMoEgsKigooFMjO0caFqlokJbRYNZXThPmBjzOdCYEwhKFhXaLBrM6sJGNjHmBBrrIdyEd1FBRQNZz9gTCPyLCioayAmUQM7CooKKBjLP2M+Bpq1bVOhK0WBWF84TJsZ8DqQEWmtNUaFLRYNZXdjIJsacQDqEW+t4UUFFA/HR2nPhOmy6qKCigSykQ7ie6sJhzoQO4USkEiWQSAAlkEiAISVQJx8sX+hy3yTAkIoIW3AXPLtWOXsAeCVwOGajXTjRnlARYQCstavAFbiLoV3xJHBF0TcZoMEkEEAxguAK3LCctq3ikqdLCS2RDSqBAIqxbNe33Q/g+q69q0jiG1wCARRvqmvzxP3Orr4tT+KzPh9rLTE/vvOt2j/c6On7Y8/H43M/sLnp5S0Z+4+0EJe2Ph+pefusf4W1kUDFPLYCTzS4sp4Atra1vCVib4C7W9qgm/zcDZg6t89BHsJNNFxU6E3RwLot5FpgX9t9qdE+4NpiWWsz6AQCmiwq9KpoYK09ClyJu041NA8AVxbLWLvaDxm6cEiDe818XYcKe7q2vCXWwxnAozXGpunPo8AZTW2fgxmJsKx/xQ1y9xJ/pMIDuFvBFx4mdvlqvTHmLOA+4KxYbbbkceDl1trHQxsa3UiEZWw9IxUGMdKg2OAuAZ5quy8BngIuiZE8ZYwmgYDYRYXeFA18WGsfAy4Hnm67LxU8DVxeLEOjRpVAQMyiQq+KBj6K5bkSaOTkO5KjuIJBK+tidAkEYMNHKgx2pIG1dh+uxB31nK0mFleqbrUc32jVpytVKaqPVFh3pEHXl7dCf2+I3ecaPjfUuPxefRjlHggqFxUGUTTwYa29Hbi97X4scHvRx1aNNoGgdFFhUEUDTzcCe9vuxDr24vrWulEnEJQqKgyuaLCMdccyXRvy08gQHV+jTyDwKioMtmiwjO3WkJ9Gh+j4GM1IhGUWjFTwGmng0X6nlrcsY8wZwDeAlzU53ymPAa+w1jZysXd0D5eP0b91HiZf6g12S9ru3PKW1eKQn2hDdHxpKE8FM0WFMRYNFrLtDPlpZYiOL+2B1jF52VbM854uL29ZxTuTcuAnap7V00DSRvFGh3AdM7TlNca8GriH+t7wcRR4nW1plIEO4aRWtt4hP5YODNHxoQSSyqy1dV3QvLFou/OUQBKkhiE/nRii40vnQA0Z8vIaYwzwSeDqwKb2Ar/VhVEGKiJ0zNCX1xizEVdUeHXFJvbhigadGGWgIoI0KnDIT+eG6PhSAkk01tqncbeFl7m1+jHc7dh9vJVcCSRxFWPVLsENv1nmcdwog94+zEQJJNF5Dvnp9BAdX0ogqYVd/JSf1p6iE5sSSGpj13/KT6tP0YlNCSS1mhny05shOr7qGggocpy1dq8x5vmTf7fdn5hau5Aq0mW6kCrSACWQSAAlkEgAJZBIACWQSAAlkEgAJZBIACWQSAAlkEgAJZBIACWQSAAlkEgAJZBIAO8EMsZsqbMjIl1RZlvfABzx/O551boj0ju+2/qRDcBBzy/vqNgZkb7x3dYPbgD2e355lzHm5IodEumFYhvf5fn1/WUS6Bxgj5JIhqrYtvfgtnUf+w2wHf8kAjgE7C6mecRae7hUL0U6pCgYnIc7bNuFf/IA7DDAFuCHwOb43RMZrFXgtA3FHuRDbfdGpGc+ZK09bKy1GGM2AQ8C29rulUgPPAxcYK09YibvMjLGrAAH0KGcyCKrwHZr7UGYGolQ/ODWtnol0hO3TpIHwEy/Tc8YcxLwZeDiFjom0nVfA3Zaa49NfrBmLFzxi53AzbhdlYi4XLiZmeSBmT3Qml+4c6K9qLAg4/YwcPX0Ydu0uaOxiwkuAP4Y7Y1kfFZx2/4F85IHFuyB1nzJXa1dwY1a2FF8VoBNUboq0q4juEHV+4vPAeCgzyib/weubzzdQQ6AVQAAAABJRU5ErkJggg==');\n    border: none;\n    margin: 0;\n    position: relative;\n    top: -8px;\n    left: 0px;\n    width: 40px;\n    height: 40px;\n    background-size: 40px;\n    background-color: #fff;\n    float: none;\n    clear: both;\n\" />\n\n","ui-loader.html":"<iframe id=\"rrmd-ui-loader\" allowfullscreen=\"true\" style=\"\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0;\n    margin: 0;\n    padding: 0;\n    z-index: 2147483647;\n\"></iframe>\n","ui-main.html":"<html>\n<head>\n<style id=\"css-clear\"></style>\n<style id=\"css\"></style>\n</head>\n<body>\n<div id=\"wrap\" class=\"full\">\n    <input type=\"button\" id=\"commit\" value=\"commit\" onclick=\"kisume_rrmd.ENV('util').cancelFullScreen();return false;\"/>\n    <div id=\"left\" class=\"pad\">\n        <textarea id=\"area\" name=\"area\" class=\"full\"></textarea>\n    </div>\n    <div id=\"right\" class=\"pad\">\n        <iframe id=\"preview\" class=\"full\"></iframe>\n    </div>\n</div>\n</body>\n</html>\n","ui-preview.html":"<!doctype HTML>\n<html>\n<head>\n<style id=\"css-clear\"></style>\n<style id=\"css\"></style>\n</head>\n<body>\n<div id=\"wrap\" style=\"\n    position:absolute;\n    left:0;top:0;width:100%;height:100%;\n    overflow-x:auto;overflow-y:scroll;\n    \">\n<span></span>\n</div>\n</body>\n</html>\n","mathjax-dummy.html":"<div id=\"rrmd-pp-mathjax-dummy\" style=\"opacity:0;position:absolute;width:0;height:0;clip:rect(0px,0px,0px,0px);\"></div>\n","mathjax-loadscript.html":"<script type=\"text/x-mathjax-config\">\nMathJax.Hub.Config({\n    jax: [\"input/TeX\",\"output/HTML-CSS\"],\n    //extensions: [\"tex2jax.js\",\"MathMenu.js\",\"MathZoom.js\"],\n    TeX: {\n        extensions: [\"AMSmath.js\",\"AMSsymbols.js\",\"noErrors.js\",\"noUndefined.js\"]\n    },\n    skipStartupTypeset: true\n});\n</script>\n<script src=\"http://cdn.mathjax.org/mathjax/latest/MathJax.js\"></script>\n"};


/*!
boot
!
*/
var censor, core, cron, css, markdown, postproc, process, tinymce, ui, unsafeWindow, util, xhr,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

window.iced = {
  Deferrals: (function() {
    function _Class(_arg) {
      this.continuation = _arg;
      this.count = 1;
      this.ret = null;
    }

    _Class.prototype._fulfill = function() {
      if (!--this.count) {
        return this.continuation(this.ret);
      }
    };

    _Class.prototype.defer = function(defer_params) {
      var _this = this;
      ++this.count;
      return function() {
        var inner_params, _ref;
        inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (defer_params != null) {
          if ((_ref = defer_params.assign_fn) != null) {
            _ref.apply(null, inner_params);
          }
        }
        return _this._fulfill();
      };
    };

    return _Class;

  })(),
  findDeferral: function() {
    return null;
  },
  trampoline: function(_fn) {
    return _fn();
  }
};
window.__iced_k = window.__iced_k_noop = function() {};

if (typeof unsafeWindow === "undefined" || unsafeWindow === null) {
  unsafeWindow = window;
}

$(function() {
  var ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = __iced_k_noop;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  console.log('### renren-markdown starting');
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral
    });
    window.kisume = Kisume(unsafeWindow, 'kisume_rrmd', {
      coffee: true
    }, __iced_deferrals.defer({
      lineno: 9
    }));
    __iced_deferrals._fulfill();
  })(function() {
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral
      });
      window.kisume.set('util', [], util, __iced_deferrals.defer({
        lineno: 10
      }));
      __iced_deferrals._fulfill();
    })(function() {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral
        });
        css.init(__iced_deferrals.defer({
          lineno: 12
        }));
        ui.init(__iced_deferrals.defer({
          lineno: 13
        }));
        tinymce.init(__iced_deferrals.defer({
          lineno: 14
        }));
        postproc.init(__iced_deferrals.defer({
          lineno: 15
        }));
        __iced_deferrals._fulfill();
      })(function() {
        cron.init();
        markdown.init();
        ui.listen();
        return console.log('### renren-markdown ready');
      });
    });
  });
});


/*!
censor
!
*/

censor = (function() {
  var ALPHABET, HIT;
  ALPHABET = {
    'C': '\u0421',
    'c': '\u0441',
    'E': '\u0415',
    'e': '\u0435',
    'I': '\u0406',
    'i': '\u0456',
    'O': '\u041e',
    'o': '\u043e',
    'P': '\u0420',
    'p': '\u0440',
    'S': '\u0405',
    's': '\u0455'
  };
  HIT = ['script(?=&gt;)'];
  return censor = function(s) {
    var hit, _i, _len;
    for (_i = 0, _len = HIT.length; _i < _len; _i++) {
      hit = HIT[_i];
      s = s.replace(RegExp("" + hit, "ig"), function($0) {
        var from, to;
        for (from in ALPHABET) {
          if (!__hasProp.call(ALPHABET, from)) continue;
          to = ALPHABET[from];
          $0 = $0.replace(RegExp("" + from), to + '\u200b');
        }
        return $0;
      });
    }
    return s;
  };
})();


/*!
core
!
*/

core = {};

core.inlineCss = (function() {
  var canOverride, inlineCss, prune, read, valid;
  valid = function(s) {
    return s && s[0] !== '-';
  };
  prune = function(s) {
    var m;
    if ((m = s.match(/^(.*)-value$/)) && s !== 'drop-initial-value') {
      return m[1];
    }
    return s;
  };
  read = function(style, key) {
    var _ref, _ref1;
    return {
      val: (_ref = style.getPropertyValue(key)) != null ? _ref.trim() : void 0,
      pri: (_ref1 = style.getPropertyPriority(key)) != null ? _ref1.trim() : void 0
    };
  };
  canOverride = function(curr, prev) {
    return valid(curr.val) && (!prev.val || (!prev.pri && curr.pri));
  };
  return inlineCss = function(rootEl, rules) {
    var curr, el, key, prev, r, sel, style, wrapper, _i, _j, _k, _len, _len1, _len2, _ref;
    wrapper = util.wrapped(rootEl);
    for (_i = 0, _len = rules.length; _i < _len; _i++) {
      r = rules[_i];
      sel = r.selectorText, style = r.style;
      _ref = util.arrayize(wrapper.querySelectorAll(sel));
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        el = _ref[_j];
        for (_k = 0, _len2 = style.length; _k < _len2; _k++) {
          key = style[_k];
          if (!valid(key)) {
            continue;
          }
          key = prune(key);
          curr = read(style, key);
          prev = read(el.style, key);
          if (canOverride(curr, prev)) {
            el.style.setProperty(key, curr.val, curr.pri);
          }
        }
      }
    }
    return util.unwrapped(rootEl);
  };
})();

core.spanify = (function() {
  var DUMMY, TAG_DISP, disp, getTextNodes, spanify, spanifyPost, spanifyPre, spanifyRecur, tagName, tagNames, _i, _j, _len, _len1, _ref, _ref1, _ref2;
  DUMMY = '<span style="display:none;">&ensp;</span>';
  TAG_DISP = {};
  _ref = [['a', 'inline'], ['hr', 'block'], ['s, del', 'inline'], ['sup, sub', 'inline'], ['pre', 'block'], ['code', 'inline'], ['div, p, blockquote, q, article', 'block'], ['h1, h2, h3, h4, h5, h6', 'block'], ['td, th', 'table-cell'], ['tr', 'table-row'], ['caption', 'table-caption'], ['col', 'table-column'], ['col-group', 'table-column-group'], ['thead', 'table-header-group'], ['tbody', 'table-row-group'], ['tfoot', 'table-footer-group'], ['table', 'table'], ['ol, ul', 'block'], ['li', 'list-item']];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    _ref1 = _ref[_i], tagNames = _ref1[0], disp = _ref1[1];
    _ref2 = tagNames.toUpperCase().split(', ');
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      tagName = _ref2[_j];
      TAG_DISP[tagName] = disp;
    }
  }
  getTextNodes = function(rootEl) {
    var find, ret;
    ret = [];
    find = function(node) {
      var n, _k, _len2, _ref3;
      if (node.nodeType === 3) {
        ret.push(node);
      } else {
        _ref3 = node.childNodes;
        for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
          n = _ref3[_k];
          find(n);
        }
      }
    };
    find(rootEl);
    return ret;
  };
  spanifyPre = function(el) {
    var cssText, i, innerHTML, innerText, t, t2, _k, _len2, _ref3, _ref4;
    if (el == null) {
      return;
    }
    tagName = el.tagName, innerHTML = el.innerHTML, innerText = el.innerText, (_ref3 = el.style, cssText = _ref3.cssText);
    switch (tagName) {
      case 'PRE':
        el.innerHTML = innerHTML.toString().replace(/^[\n\r]+/, '');
        _ref4 = getTextNodes(el);
        for (i = _k = 0, _len2 = _ref4.length; _k < _len2; i = ++_k) {
          t = _ref4[i];
          t2 = document.createElement('span');
          t2.innerHTML = t.data.toString().replace(/\&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\t/g, '        ').replace(/\ /g, '&ensp;').replace(/[\n\r]/g, '<br/>');
          $(t).replaceWith(t2);
        }
        el.style.whiteSpace = '';
        break;
      case 'CODE':
        el.style.whiteSpace = 'nowrap';
        break;
      case 'S':
      case 'DEL':
        el.style.textDecoration = 'line-through';
    }
    return el;
  };
  spanifyPost = function(el) {
    var cssText, innerHTML, innerText, ret, _base, _ref3;
    if (el == null) {
      return $(DUMMY);
    }
    tagName = el.tagName, innerHTML = el.innerHTML, innerText = el.innerText, (_ref3 = el.style, cssText = _ref3.cssText);
    if ((disp = TAG_DISP[tagName]) == null) {
      return el;
    }
    innerHTML = innerHTML.trim();
    if (innerText.match(/^\s*$/)) {
      innerHTML = innerHTML.replace(/&nbsp;/g, '&ensp;');
    }
    if (!innerHTML) {
      innerHTML = DUMMY;
    }
    if (tagName === 'A') {
      innerHTML = "<span style=\"" + cssText + "\">" + el.outerHTML + "</span>";
    }
    ret = document.createElement('span');
    ret.style.cssText = util.dquote_to_squote(cssText).trim();
    (_base = ret.style).display || (_base.display = disp);
    ret.innerHTML = innerHTML;
    return ret;
  };
  spanifyRecur = function(el) {
    var child, el2;
    if (el == null) {
      return;
    }
    el = spanifyPre(el);
    child = el.firstElementChild;
    while (child) {
      child = spanifyRecur(child).nextElementSibling;
    }
    el2 = spanifyPost(el);
    if (el !== el2) {
      $(el).replaceWith(el2);
      el = el2;
    }
    return el;
  };
  return spanify = function(el) {
    $(el).children().each(function() {
      return spanifyRecur(this);
    });
    return el;
  };
})();

(function() {
  var tag;
  tag = 'http://dummy/$rrmd$';
  core.embed = function(s) {
    return "<span style=\"display:none;\"><br/>\n  <br/>== powered by renren-markdown ==\n  <br/><span style=\"background-image:url('" + tag + "')\">" + (util.str_to_b64(s)) + "</span>\n  <br/>\n</span>";
  };
  return core.unembed = function(h) {
    var b64, e, el, _i, _len, _ref, _ref1;
    h = h != null ? h.trim() : void 0;
    if (!h) {
      return '';
    }
    _ref = $(h).find("span[style*='" + tag + "']");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      b64 = (_ref1 = el.innerHTML) != null ? _ref1.trim() : void 0;
      if (!b64) {
        continue;
      }
      try {
        return util.b64_to_str(b64);
      } catch (_error) {
        e = _error;
        continue;
      }
    }
    return '';
  };
})();

core.rasterize = function(el, cb) {
  if (!(el instanceof Element)) {
    return typeof cb === "function" ? cb(null) : void 0;
  }
  return html2canvas([el], {
    onrendered: function(canvas) {
      return typeof cb === "function" ? cb(canvas.toDataURL('image/png')) : void 0;
    }
  });
};

core.relayDataUrl = (function() {
  var prefix, re, relayDataUrl;
  re = /data:([^;])+;base64,([\w\+\/\=]+)/;
  prefix = 'http://emhvb.blahgeek.com/?';
  return relayDataUrl = function(dataUrl) {
    var b64, m;
    if (m = dataUrl.match(re)) {
      b64 = m[2];
      dataUrl = prefix + b64;
    }
    return dataUrl;
  };
})();

core.relayAllImg = function(rootEl) {
  var el, _i, _len, _ref, _results;
  _ref = util.arrayize(rootEl.querySelectorAll("img[src^='data']"));
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    el = _ref[_i];
    _results.push(el.src = core.relayDataUrl(el.src));
  }
  return _results;
};


/*!
cron
!
*/

cron = {};

cron.inited = false;

cron.init = function() {
  cron.hasUpdate = false;
  cron.mainPeriod = 100;
  cron.mainid = null;
  cron.heat = 0;
  cron.heatPeriod = 125;
  cron.heatId = setInterval(cron.heatHandler, cron.heatPeriod);
  return cron.inited = true;
};

cron.trig = function() {
  cron.hasUpdate = true;
  cron.heat++;
  if (!cron.mainId) {
    return cron.mainId = setTimeout(cron.mainHandler, cron.mainPeriod);
  }
};

cron.mainHandler = (function() {
  var mainHandler, n, n0;
  n = n0 = 8;
  return mainHandler = function() {
    if (--n === 0) {
      cron.mainId = null;
      console.log('cron.mainHandler: async');
      process.async();
    } else {
      cron.mainId = setTimeout(cron.mainHandler, cron.mainPeriod);
      if (cron.hasUpdate) {
        cron.hasUpdate = false;
        n = n0;
        process.sync();
      }
    }
  };
})();

cron.heatHandler = function() {
  var dh;
  dh = Math.ceil(cron.heat / 8);
  cron.heat -= dh;
  return cron.mainPeriod = 100 + Math.floor(cron.heat * dh);
};


/*!
css
!
*/

css = {};

css.inited = false;

css.init = function(autocb) {
  var doc, ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = autocb;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral,
      funcname: "init"
    });
    util.makeIframe(document, 'rrmd-css', __iced_deferrals.defer({
      assign_fn: (function() {
        return function() {
          return doc = arguments[0];
        };
      })(),
      lineno: 303
    }));
    __iced_deferrals._fulfill();
  })(function() {
    css.doc = doc;
    autocb(css.inited = true);
    return;
  });
};

css.parse = function(cssText) {
  var s;
  s = css.doc.createElement('style');
  s.textContent = cssText;
  css.doc.body.appendChild(s);
  return s.sheet.cssRules;
};

css.aug = function(cssRules) {
  var idx, r, ret, selector, specificity, _i, _j, _len, _len1, _ref, _ref1;
  ret = [];
  idx = 0;
  for (_i = 0, _len = cssRules.length; _i < _len; _i++) {
    r = cssRules[_i];
    _ref = getSpecificity(r.selectorText);
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      _ref1 = _ref[_j], selector = _ref1.selector, specificity = _ref1.specificity;
      idx = ret.push({
        selectorText: selector,
        style: r.style,
        specificity: specificity,
        idx: idx
      });
    }
  }
  return ret.sort(function(a, b) {
    var c, i, _k;
    for (i = _k = 0; _k <= 2; i = ++_k) {
      if ((c = b.specificity[i] - a.specificity[i])) {
        return c;
      }
    }
    return b.idx - i.idx;
  });
};


/*!
markdown
!
*/

markdown = function(md) {
  return markdown.render(markdown.convert(md));
};

markdown.convert = function(md) {
  var el;
  el = document.createElement('span');
  el.className = 'rrmd';
  el.innerHTML = marked(md, this.settings);
  return el;
};

markdown.render = function(el) {
  if (!markdown.inited) {
    return null;
  }
  return core.inlineCss(el, markdown.cssRules);
};

markdown.settings = {
  gfm: true,
  tables: true,
  breaks: true,
  smartLists: true
};

markdown.cssClearText = PACKED_CSS['cssreset.css'] + '\n' + PACKED_CSS['cssbase.css'];

markdown.setCss = function(cssText) {
  markdown.cssText = cssText;
  return markdown.cssRules = css.aug(css.parse(cssText));
};

markdown.inited = false;

markdown.init = function() {
  markdown.setCss(PACKED_CSS['markdown.css']);
  return markdown.inited = true;
};


/*!
postproc
!
*/

postproc = [];

postproc.register = function(name, sel, init) {
  return this.push({
    enabled: true,
    name: name,
    sel: sel,
    init: init,
    handler: (function() {})
  });
};

postproc.init = function(cb) {
  var enabled, entry, init, ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = __iced_k_noop;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  (function(__iced_k) {
    var _i, _len;
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral,
      funcname: "init"
    });
    for (_i = 0, _len = _this.length; _i < _len; _i++) {
      entry = _this[_i];
      enabled = entry.enabled, init = entry.init;
      if (enabled) {
        init(__iced_deferrals.defer({
          assign_fn: (function(__slot_1) {
            return function() {
              return __slot_1.handler = arguments[0];
            };
          })(entry),
          lineno: 395
        }));
      }
    }
    __iced_deferrals._fulfill();
  })(function() {
    return typeof cb === "function" ? cb() : void 0;
  });
};

postproc.run = (function() {
  var run, tag;
  tag = 'rrmd-pp';
  return run = function(rootEl) {
    var async, changed, ct, el, el2, enabled, handler, sel, _i, _j, _len, _len1, _ref, _ref1, _ref2;
    ct = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      _ref = this[_i], enabled = _ref.enabled, sel = _ref.sel, handler = _ref.handler;
      if (!enabled) {
        continue;
      }
      _ref1 = util.arrayize(rootEl.querySelectorAll(sel));
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        el = _ref1[_j];
        if (__indexOf.call(el.classList, tag) < 0) {
          _ref2 = handler(el), changed = _ref2.changed, el2 = _ref2.replaceWith, async = _ref2.async;
          if (changed) {
            el.classList.add(tag);
            el2 = el;
          } else if (el2 instanceof Element) {
            el2.classList.add(tag);
            $(el).replaceWith(el2);
          }
          if (async instanceof Function) {
            ct.push({
              async: async,
              el2: el2
            });
          }
        }
      }
    }
    return function(cb) {
      var err, i, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      err = new Array(ct.length);
      (function(__iced_k) {
        var _k, _len2, _ref3;
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral
        });
        for (i = _k = 0, _len2 = ct.length; _k < _len2; i = ++_k) {
          _ref3 = ct[i], async = _ref3.async, el2 = _ref3.el2;
          async(el2, __iced_deferrals.defer({
            assign_fn: (function(__slot_1, __slot_2) {
              return function() {
                return __slot_1[__slot_2] = arguments[0];
              };
            })(err, i),
            lineno: 420
          }));
        }
        __iced_deferrals._fulfill();
      })(function() {
        return typeof cb === "function" ? cb(err) : void 0;
      });
    };
  };
})();


/*!
process
!
*/

process = {};

process.sync = function() {
  var el, md;
  md = ui.getSource();
  el = markdown.convert(md);
  process._async = postproc.run(el);
  return ui.setPreview(el);
};

process._async = (function() {});

process.async = function(cb) {
  var el;
  markdown.render(el = ui.getPreview());
  process._async(cb);
  return process._async = (function() {});
};

process.open = function() {
  return tinymce.call('getContent', function(err, ret) {
    var md;
    md = core.unembed(ret);
    ui.setSource(md);
    ui.setPreviewCss(markdown.cssText);
    cron.trig();
    return ui.show();
  });
};

process.commit = function() {
  var cont, el, embed, md, ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = __iced_k_noop;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  process.sync();
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral,
      funcname: "commit"
    });
    process.async(__iced_deferrals.defer({
      lineno: 453
    }));
    __iced_deferrals._fulfill();
  })(function() {
    md = ui.getSource();
    el = ui.getPreview();
    core.relayAllImg(el);
    core.spanify(el);
    cont = censor(el.innerHTML);
    embed = core.embed(md);
    tinymce.call('setContent', cont + embed, (function() {}));
    return ui.hide();
  });
};


/*!
tinymce
!
*/

tinymce = {};

tinymce.inited = false;

tinymce.init = function(autocb) {
  var err, ret, ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = autocb;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral,
      funcname: "init"
    });
    window.kisume.runAsync((function(cb) {
      var editor,
        _this = this;
      editor = null;
      return this.util.pollUntil(200, (function() {
        var _ref, _ref1;
        return editor = (_ref = window.tinymce) != null ? (_ref1 = _ref.editors) != null ? _ref1[0] : void 0 : void 0;
      }), function() {
        ENV('tinymce').editor = editor;
        return cb();
      });
    }), __iced_deferrals.defer({
      assign_fn: (function() {
        return function() {
          err = arguments[0];
          return ret = arguments[1];
        };
      })(),
      lineno: 478
    }));
    __iced_deferrals._fulfill();
  })(function() {
    if (err) {
      console.error(err);
      autocb(false);
      return;
    }
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        funcname: "init"
      });
      window.kisume.set('tinymce', ['util'], {
        setContent: function(s) {
          this.editor.setContent(s);
          return true;
        },
        getContent: function() {
          return this.editor.getContent();
        }
      }, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return err = arguments[0];
          };
        })(),
        lineno: 486
      }));
      __iced_deferrals._fulfill();
    })(function() {
      if (err) {
        console.error(err);
        autocb(false);
        return;
      }
      autocb(tinymce.inited = true);
      return;
    });
  });
};

tinymce.call = function() {
  var arg, _ref;
  arg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  return (_ref = window.kisume).run.apply(_ref, ['tinymce'].concat(__slice.call(arg)));
};


/*!
ui
!
*/

ui = {};

ui.inited = false;

ui.init = function(cb) {
  var kisume, ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = __iced_k_noop;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  ui.cssClear = markdown.cssClearText;
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral,
      funcname: "init"
    });
    ui.el = new (function(autocb) {
      var ___iced_passed_deferral1, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral1 = iced.findDeferral(arguments);
      this.loader = $(PACKED_HTML['ui-loader.html']).appendTo('body')[0];
      this.mainDoc = this.loader.contentDocument;
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral1
        });
        $(_this.mainDoc).ready(__iced_deferrals.defer({
          lineno: 511
        }));
        __iced_deferrals._fulfill();
      })(function() {
        _this.mainDoc.write(PACKED_HTML['ui-main.html']);
        _this.mainCssClear = _this.mainDoc.getElementById('css-clear');
        _this.mainCssClear.textContent = ui.cssClear;
        _this.mainCss = _this.mainDoc.getElementById('css');
        _this.mainCss.textContent = PACKED_CSS['ui.css'];
        _this.preview = _this.mainDoc.getElementById('preview');
        _this.previewDoc = _this.preview.contentDocument;
        _this.previewWin = _this.preview.contentWindow;
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral1
          });
          $(_this.previewDoc).ready(__iced_deferrals.defer({
            lineno: 521
          }));
          __iced_deferrals._fulfill();
        })(function() {
          _this.previewDoc.write(PACKED_HTML['ui-preview.html']);
          _this.previewCssClear = _this.previewDoc.getElementById('css-clear');
          _this.previewCssClear.textContent = ui.cssClear;
          _this.previewCss = _this.previewDoc.getElementById('css');
          _this.area = _this.mainDoc.getElementById('area');
          _this.previewWrap = _this.previewDoc.getElementById('wrap');
          _this.commit = _this.mainDoc.getElementById('commit');
          _this.open = $(PACKED_HTML['ui-button.html']).prependTo('#title_bg')[0];
          autocb(_this.open.style.opacity = 0.2);
          return;
        });
      });
    })(__iced_deferrals.defer({
      lineno: 533
    }));
    __iced_deferrals._fulfill();
  })(function() {
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        funcname: "init"
      });
      kisume = Kisume(ui.el.loader.contentWindow, 'kisume_rrmd', {
        coffee: true
      }, __iced_deferrals.defer({
        lineno: 535
      }));
      __iced_deferrals._fulfill();
    })(function() {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "init"
        });
        kisume.set('util', [], util, __iced_deferrals.defer({
          lineno: 536
        }));
        __iced_deferrals._fulfill();
      })(function() {
        ui.inited = true;
        ui.active = false;
        return typeof cb === "function" ? cb() : void 0;
      });
    });
  });
};

ui.listen = function() {
  ui.el.open.style.opacity = 1;
  ui.el.open.addEventListener('click', function(e) {
    return process.open();
  });
  ui.el.area.addEventListener('input', function(e) {
    return cron.trig();
  });
  ui.el.commit.addEventListener('click', function(e) {
    return process.commit();
  });
  return ui.el.area.addEventListener('scroll', function(e) {
    return util.setScrollRatio(ui.el.previewWrap, util.scrollRatio(ui.el.area));
  });
};

(function() {
  var reflow;
  reflow = function(autocb) {
    var o, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = autocb;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    o = ui.el.open;
    o.style.float = 'left';
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        funcname: "reflow"
      });
      setTimeout(__iced_deferrals.defer({
        lineno: 557
      }), 50);
      __iced_deferrals._fulfill();
    })(function() {
      autocb(o.style.float = 'none');
      return;
    });
  };
  ui.show = function(cb) {
    var ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        funcname: "show"
      });
      $(ui.el.loader).fadeIn(250, __iced_deferrals.defer({
        lineno: 561
      }));
      __iced_deferrals._fulfill();
    })(function() {
      $('#container').hide();
      ui.active = true;
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "show"
        });
        reflow(__iced_deferrals.defer({
          lineno: 564
        }));
        __iced_deferrals._fulfill();
      })(function() {
        return typeof cb === "function" ? cb() : void 0;
      });
    });
  };
  return ui.hide = function(cb) {
    var ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    ui.active = false;
    $('#container').show();
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        funcname: "hide"
      });
      reflow(__iced_deferrals.defer({
        lineno: 570
      }));
      __iced_deferrals._fulfill();
    })(function() {
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          funcname: "hide"
        });
        $(ui.el.loader).fadeOut(250, __iced_deferrals.defer({
          lineno: 571
        }));
        __iced_deferrals._fulfill();
      })(function() {
        return typeof cb === "function" ? cb() : void 0;
      });
    });
  };
})();

ui.getSource = function() {
  return ui.el.area.value;
};

ui.setSource = function(s) {
  return ui.el.area.value = s;
};

ui.getPreview = function() {
  return ui.el.previewWrap.firstElementChild;
};

ui.setPreview = function(el) {
  return (function(wrap) {
    var orig;
    orig = wrap.firstElementChild;
    if (orig != null) {
      return wrap.replaceChild(el, orig);
    } else {
      return wrap.appendChild(el);
    }
  })(ui.el.previewWrap);
};

ui.getSourceScroll = function() {
  return util.scrollRatio(ui.el.area);
};

ui.setPreviewScroll = function(ratio) {
  return null;
};

ui.setPreviewCss = function(css) {
  return ui.el.previewCss.textContent = css;
};


/*!
util
!
*/

util = {};

util.arrayize = function(a) {
  if (a != null ? a.length : void 0) {
    return [].slice.call(a);
  } else {
    return [];
  }
};

util.squote_to_dquote = function(s) {
  return s.replace(/'/g, '"');
};

util.dquote_to_squote = function(s) {
  return s.replace(/"/g, "'");
};

util.wrapped = function(el) {
  return $(el).wrap('<span>').parent()[0];
};

util.unwrapped = function(el) {
  return $(el).unwrap()[0];
};

util.jsStr = function(s) {
  var e, hex_to_char, m, s2;
  if (!(s = s != null ? s.trim() : void 0)) {
    return null;
  }
  switch (false) {
    case !(m = s.match(/^"(.*)"$/)):
      try {
        return JSON.parse(s);
      } catch (_error) {
        e = _error;
        return null;
      }
      break;
    case !(m = s.match(/^'(.*)'$/)):
      s = m[1];
      hex_to_char = function($0, $1) {
        return String.fromCharCode(parseInt($1, 16));
      };
      while (true) {
        s2 = s.replace(/\\n/, '\n').replace(/\\r/, '\r').replace(/\\t/, '\t').replace(/\\x([0-9A-Fa-f]{2})/, hex_to_char).replace(/\\u([0-9A-Fa-f]{4})/, hex_to_char).replace(/\\([^nrtxu0])/, '$1');
        if (s2 === s) {
          break;
        }
        s = s2;
      }
      return s;
    default:
      return null;
  }
};

util.str_to_b64 = function(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
};

util.b64_to_str = function(b64) {
  return decodeURIComponent(escape(window.atob(b64)));
};

util.makeIframe = function(doc, id, cb) {
  var idoc, ifr;
  ifr = $("<iframe id=\"" + id + "\" style=\"position:fixed;width:0;height:0;\" />").appendTo(doc.body)[0];
  idoc = ifr.contentDocument;
  $(idoc).ready(function() {
    return typeof cb === "function" ? cb(idoc) : void 0;
  });
  return ifr;
};

util.canScroll = function(el) {
  return (el != null ? el.scrollHeight : void 0) != null;
};

util.scrollRange = function(el) {
  if (!this.canScroll(el)) {
    return null;
  }
  return el.scrollHeight - el.clientHeight;
};

util.scrollRatio = function(el) {
  if (!this.canScroll(el)) {
    return null;
  }
  return el.scrollTop / this.scrollRange(el);
};

util.setScrollRatio = function(el, ratio) {
  if (!this.canScroll(el)) {
    return null;
  }
  if (!isFinite(ratio)) {
    return null;
  }
  ratio = Math.min(Math.max(ratio, 0), 1);
  return el.scrollTop = ratio * this.scrollRange(el);
};

util.pollUntil = function(period, check, cb) {
  var iid;
  if (check instanceof Function && cb instanceof Function) {
    return iid = setInterval((function() {
      if (check()) {
        return cb(clearInterval(iid));
      }
    }), period);
  }
};

util.launchFullScreen = function(el) {
  switch (false) {
    case !el.requestFullScreen:
      return el.requestFullScreen();
    case !el.mozRequestFullScreen:
      return el.mozRequestFullScreen();
    case !el.webkitRequestFullScreen:
      return el.webkitRequestFullScreen();
    default:
      debugger;
  }
};

util.cancelFullScreen = function() {
  switch (false) {
    case !document.cancelFullScreen:
      return window.top.document.cancelFullScreen();
    case !document.mozCancelFullScreen:
      return window.top.document.mozCancelFullScreen();
    case !document.webkitCancelFullScreen:
      return window.top.document.webkitCancelFullScreen();
  }
};


/*!
xhr
!
*/

if (window.GM_xmlhttpRequest == null) {
  if ((typeof chrome !== "undefined" && chrome !== null ? chrome.extension : void 0) != null) {
    window.GM_xmlhttpRequest = function(o) {
      var xhr;
      xhr = new XMLHttpRequest();
      ['onreadystatechange', 'onabort', 'onerror', 'onload', 'onloadend', 'onloadstart', 'onprogress'].map(function(f) {
        if (o[f]) {
          return xhr[f] = function(progress) {
            var lengthComputable, loaded, readyState, responseHeaders, responseText, status, statusText, total, _ref;
            if (!(progress != null ? progress.target : void 0)) {
              return;
            }
            lengthComputable = progress.lengthComputable, loaded = progress.loaded, total = progress.total;
            _ref = progress.target, readyState = _ref.readyState, responseHeaders = _ref.responseHeaders, responseText = _ref.responseText, status = _ref.status, statusText = _ref.statusText;
            return o[f]({
              lengthComputable: lengthComputable,
              loaded: loaded,
              total: total,
              readyState: readyState,
              responseHeaders: responseHeaders,
              responseText: responseText,
              status: status,
              statusText: statusText
            });
          };
        }
      });
      xhr.open(o.method, o.url, true, o.user, o.password);
      return xhr.send(o.data);
    };
  } else {
    window.GM_xmlhttpRequest = function() {
      throw new Error('GM_xmlhttpRequest missing');
    };
  }
}

xhr = {};

xhr.get = function(url, cb) {
  var _cb;
  _cb = function(e) {
    if (e.status === 200) {
      return cb(null, e.responseText);
    } else {
      return cb(e.status);
    }
  };
  return GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: _cb,
    onerror: _cb
  });
};


/*!
postproc/gist
!
*/
var __iced_k, __iced_k_noop;

__iced_k = __iced_k_noop = function() {};

postproc.register('gist', 'a', function(autocb) {
  var cache, cssRules, cssText, handler, inited, makeUrl, parse, testUrl, urlRe, ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = autocb;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  urlRe = /^(?:(?:http|https)\:\/\/)?gist\.github\.com\/([\w\\/]+)/;
  makeUrl = function(id) {
    return "https://gist.github.com/" + id + ".js";
  };
  testUrl = makeUrl('5938692');
  cssText = "";
  cssRules = null;
  parse = (function() {
    var n;
    n = 0;
    return parse = function(js, cb) {
      return util.makeIframe(document, "rrmd-pp-gist-" + (++n), function(doc) {
        var cont, cssUrl;
        doc.open();
        doc.write("<script>" + js + "</script>");
        doc.close();
        cssUrl = doc.querySelector('link[href]').href;
        cont = doc.body.innerHTML;
        return typeof cb === "function" ? cb(cssUrl, cont) : void 0;
      });
    };
  })();
  cache = {};
  inited = false;
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral,
      filename: "src/postproc/gist.iced"
    });
    (function(autocb) {
      var cont, cssUrl, err, testJs, ___iced_passed_deferral1, __iced_deferrals, __iced_k, _cssText,
        _this = this;
      __iced_k = autocb;
      ___iced_passed_deferral1 = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral1,
          filename: "src/postproc/gist.iced"
        });
        xhr.get(testUrl, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              err = arguments[0];
              return testJs = arguments[1];
            };
          })(),
          lineno: 39
        }));
        __iced_deferrals._fulfill();
      })(function() {
        if (err || !testJs) {
          autocb(false);
          return;
        }
        (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral1,
            filename: "src/postproc/gist.iced"
          });
          parse(testJs, __iced_deferrals.defer({
            assign_fn: (function() {
              return function() {
                cssUrl = arguments[0];
                return cont = arguments[1];
              };
            })(),
            lineno: 42
          }));
          __iced_deferrals._fulfill();
        })(function() {
          if (!cont) {
            autocb(false);
            return;
          }
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral1,
              filename: "src/postproc/gist.iced"
            });
            xhr.get(cssUrl, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  err = arguments[0];
                  return _cssText = arguments[1];
                };
              })(),
              lineno: 45
            }));
            __iced_deferrals._fulfill();
          })(function() {
            if (err || !_cssText) {
              autocb(false);
              return;
            }
            cssText = _cssText;
            cssRules = css.aug(css.parse(cssText));
            autocb(true);
            return;
          });
        });
      });
    })(__iced_deferrals.defer({
      assign_fn: (function() {
        return function() {
          return inited = arguments[0];
        };
      })(),
      lineno: 51
    }));
    __iced_deferrals._fulfill();
  })(function() {
    if (!inited) {
      console.log('gist: fail to init');
      autocb(function() {
        console.log('gist: dead');
        return {
          changed: false
        };
      });
      return;
    }
    autocb(handler = function(el) {
      var cachedEl, id, m;
      if (el.href.trim() === el.innerHTML.trim() && (m = el.href.match(urlRe))) {
        id = m[1];
        if ((cachedEl = cache[id]) != null) {
          return {
            replaceWith: cachedEl.cloneNode(true)
          };
        } else {
          return {
            changed: true,
            async: function(el2, autocb) {
              var $cont, $md, cont, cssUrl, el3, err, js, md, ___iced_passed_deferral1, __iced_deferrals, __iced_k,
                _this = this;
              __iced_k = autocb;
              ___iced_passed_deferral1 = iced.findDeferral(arguments);
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral1,
                  filename: "src/postproc/gist.iced",
                  funcname: "async"
                });
                xhr.get(makeUrl(id), __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      err = arguments[0];
                      return js = arguments[1];
                    };
                  })(),
                  lineno: 69
                }));
                __iced_deferrals._fulfill();
              })(function() {
                if (err || !js) {
                  autocb(false);
                  return;
                }
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral1,
                    filename: "src/postproc/gist.iced",
                    funcname: "async"
                  });
                  parse(js, __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        cssUrl = arguments[0];
                        return cont = arguments[1];
                      };
                    })(),
                    lineno: 72
                  }));
                  __iced_deferrals._fulfill();
                })(function() {
                  var _i, _len, _ref;
                  if (!cont) {
                    autocb(false);
                    return;
                  }
                  $cont = $(cont);
                  $cont.find('.gist-data').each(function() {
                    var _base;
                    return (_base = this.style).whiteSpace || (_base.whiteSpace = 'nowrap');
                  });
                  _ref = $cont.find('article.markdown-body');
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    md = _ref[_i];
                    $md = $(md).addClass('rrmd');
                    markdown.render(md);
                    core.inlineCss(md, cssRules);
                    $md.parentsUntil('div.gist').last().replaceWith($md);
                  }
                  el3 = core.spanify(core.inlineCss($cont[0], cssRules));
                  $(el2).replaceWith(el3);
                  cache[id] = el3.cloneNode(true);
                  autocb(true);
                  return;
                });
              });
            }
          };
        }
      } else {
        return {
          changed: false
        };
      }
    });
    return;
  });
});


/*!
postproc/mathjax
!
*/
var __iced_k, __iced_k_noop;

__iced_k = __iced_k_noop = function() {};

$(function() {
  return $(PACKED_HTML['mathjax-loadscript.html']).appendTo(document.head);
});

postproc.register('mathjax', "script[type^='math/tex']", function(autocb) {
  var $dummy, cache, err, getImg, getTag, handler, n, ___iced_passed_deferral, __iced_deferrals, __iced_k,
    _this = this;
  __iced_k = autocb;
  ___iced_passed_deferral = iced.findDeferral(arguments);
  $dummy = $(PACKED_HTML['mathjax-dummy.html']).appendTo(document.body);
  n = 0;
  getTag = function(seq) {
    return "rrmd-pp-mathjax-" + seq;
  };
  cache = [new Lru(100), new Lru(100)];
  getImg = function(dataUrl, isDisplay) {
    var img;
    img = document.createElement('img');
    img.src = dataUrl;
    if (isDisplay) {
      return $(img).wrap('<span style="display:block;width:100%;text-align:center">').parent()[0];
    } else {
      return img;
    }
  };
  (function(__iced_k) {
    __iced_deferrals = new iced.Deferrals(__iced_k, {
      parent: ___iced_passed_deferral,
      filename: "src/postproc/mathjax.iced"
    });
    window.kisume.set('mathjax', [], {
      render: function(tag, cb) {
        var srcEl,
          _this = this;
        srcEl = document.getElementsByClassName(tag)[0];
        return MathJax.Hub.Queue([
          'Typeset', MathJax.Hub, srcEl, function() {
            return cb(null, _this.getRenderedSel(srcEl));
          }
        ]);
      },
      getRenderedSel: function(srcEl) {
        var j;
        j = window.MathJax.Hub.getJaxFor(srcEl);
        return "\#" + j.inputID + "-Frame span.math";
      }
    }, __iced_deferrals.defer({
      assign_fn: (function() {
        return function() {
          return err = arguments[0];
        };
      })(),
      lineno: 48
    }));
    __iced_deferrals._fulfill();
  })(function() {
    autocb(handler = function(el) {
      var dataUrl, isDisplay, seq, tag;
      isDisplay = el.type.match(/display/) ? 1 : 0;
      if (dataUrl = cache[isDisplay].get(el.textContent.toString().trim())) {
        return {
          replaceWith: getImg(dataUrl, isDisplay)
        };
      } else {
        seq = ++n;
        tag = getTag(seq);
        el.classList.add(tag);
        return {
          changed: true,
          async: function(el2, autocb) {
            var dataUrl, err, rendered, renderedSel, srcEl, ___iced_passed_deferral1, __iced_deferrals, __iced_k,
              _this = this;
            __iced_k = autocb;
            ___iced_passed_deferral1 = iced.findDeferral(arguments);
            srcEl = $(el2).clone().appendTo($dummy)[0];
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral1,
                filename: "src/postproc/mathjax.iced",
                funcname: "async"
              });
              window.kisume.runAsync('mathjax', 'render', tag, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    err = arguments[0];
                    return renderedSel = arguments[1];
                  };
                })(),
                lineno: 64
              }));
              __iced_deferrals._fulfill();
            })(function() {
              if (typeof err !== "undefined" && err !== null) {
                console.log('mathjax: render error');
                console.error(err);
                autocb();
                return;
              }
              rendered = document.querySelector(renderedSel);
              if (!(rendered instanceof Element)) {
                console.error("mathjax: can't find rendered math");
                autocb();
                return;
              }
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral1,
                  filename: "src/postproc/mathjax.iced",
                  funcname: "async"
                });
                core.rasterize(rendered, __iced_deferrals.defer({
                  assign_fn: (function() {
                    return function() {
                      return dataUrl = arguments[0];
                    };
                  })(),
                  lineno: 74
                }));
                __iced_deferrals._fulfill();
              })(function() {
                if (!dataUrl) {
                  console.error('mathjax: rasterize error');
                  autocb();
                  return;
                }
                $(rendered).parentsUntil($dummy).last().remove();
                $('.' + getTag(seq)).remove();
                $(el2).replaceWith(getImg(dataUrl, isDisplay));
                cache[isDisplay].set(el2.textContent.toString().trim(), dataUrl);
                autocb();
                return;
              });
            });
          }
        };
      }
    });
    return;
  });
});
