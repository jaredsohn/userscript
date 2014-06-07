// ==UserScript==
// @name Jellybeans 2012 
// @namespace http://joecitizenonthebass.com/jellybeans2012/
// @description For those who would prefer to read posts about Jellybeans 2012 on Facebook.
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			M8R-r092ij
// @version			0.2
// ==/UserScript==


var word={"kony":"Jellybeans","":""};String.prototype.prepareRegex=function(){return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g,"\\$1");};function isOkTag(tag){return(",pre,blockquote,code,input,button,textarea".indexOf(","+tag)==-1);}var regexs=new Array(),replacements=new Array();for(var word in words){if(word!=""){regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b",'gi'));replacements.push(words[word]);}}var texts=document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null),text="";for(var i=0,l=texts.snapshotLength;(this_text=texts.snapshotItem(i));i++){if(isOkTag(this_text.parentNode.tagName.toLowerCase())&&(text=this_text.textContent)){for(var x=0,l=regexs.length;x<l;x++){text=text.replace(regexs[x],replacements[x]);this_text.textContent=text;}}}