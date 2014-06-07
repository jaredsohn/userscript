// ==UserScript==
// @name           FB font reset
// @description    Resets the status reporting font size in facebook to 10pt
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.tld/*
// @include        http://facebook.tld/*
// @include        https://*.facebook.tld/*
// @include        https://facebook.tld/*
  
// ==/UserScript==
/*
v2
(c) 2010 Matt Holbrook-Bull
http://matthb.net

*/
 var styleNode = document.createElement('style');
   styleNode.type = "text/css";
   // browser detection (based on prototype.js)
   if(!!(window.attachEvent && !window.opera)) {
    	styleNode.styleSheet.cssText = 'span.messageBody, span.UIStory_Message, h6.uiStreamMessage, div.mall_post_body_text, UIRecentActivity_Body, div.UIImageBlock_Content, uiStreamPassive {font-size: 10pt !important;} div.UIImageBlock_Content span {font-size: 10pt !important;}';
   } else {
    	var styleText = document.createTextNode('span.messageBody, span.UIStory_Message, div.mall_post_body_text, h6.uiStreamMessage, UIRecentActivity_Body, div.UIImageBlock_Content, uiStreamPassive {font-size: 10pt !important;} div.UIImageBlock_Content span {font-size: 10pt !important;}');
    	styleNode.appendChild(styleText);
   }
   document.getElementsByTagName('head')[0].appendChild(styleNode);


