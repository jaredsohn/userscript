// ==UserScript==
// @name Twitch Chat Emotes
// @namespace #Cletus
// @version 0.5.15
// @description Adds a button to Twitch that allows you to "click-to-insert" an emote.
// @copyright 2011+, Ryan Chatham (http://userscripts.org/users/cletus)
// @icon http://www.gravatar.com/avatar.php?gravatar_id=6875e83aa6c563790cb2da914aaba8b3&r=PG&s=48&default=identicon
// @license Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @grant none
// @include http://*.twitch.tv/*
// @exclude http://api.twitch.tv/*
// @exclude http://*.twitch.tv/*/profile*
// ==/UserScript==

// Start wrapper.
(function wrapper(window, injectNeeded, undefined) {
	'use strict';

	// Script injection if needed.
	if (injectNeeded) {
		var script = document.createElement('script');
		script.textContent = '(' + wrapper + ')(window, false)';
		document.body.appendChild(script);
		document.body.removeChild(script);
		return;
	}

/* Third-party scripts minified. */
var Hogan={};!function(a,b){function c(a){return String(null===a||void 0===a?"":a)}function d(a){return a=c(a),j.test(a)?a.replace(e,"&amp;").replace(f,"&lt;").replace(g,"&gt;").replace(h,"&#39;").replace(i,"&quot;"):a}a.Template=function(a,c,d,e){this.r=a||this.r,this.c=d,this.options=e,this.text=c||"",this.buf=b?[]:""},a.Template.prototype={r:function(){return""},v:d,t:c,render:function(a,b,c){return this.ri([a],b||{},c)},ri:function(a,b,c){return this.r(a,b,c)},rp:function(a,b,c,d){var e=c[a];return e?(this.c&&"string"==typeof e&&(e=this.c.compile(e,this.options)),e.ri(b,c,d)):""},rs:function(a,b,c){var d=a[a.length-1];if(!k(d))return void c(a,b,this);for(var e=0;e<d.length;e++)a.push(d[e]),c(a,b,this),a.pop()},s:function(a,b,c,d,e,f,g){var h;return k(a)&&0===a.length?!1:("function"==typeof a&&(a=this.ls(a,b,c,d,e,f,g)),h=""===a||!!a,!d&&h&&b&&b.push("object"==typeof a?a:b[b.length-1]),h)},d:function(a,b,c,d){var e=a.split("."),f=this.f(e[0],b,c,d),g=null;if("."===a&&k(b[b.length-2]))return b[b.length-1];for(var h=1;h<e.length;h++)f&&"object"==typeof f&&e[h]in f?(g=f,f=f[e[h]]):f="";return d&&!f?!1:(d||"function"!=typeof f||(b.push(g),f=this.lv(f,b,c),b.pop()),f)},f:function(a,b,c,d){for(var e=!1,f=null,g=!1,h=b.length-1;h>=0;h--)if(f=b[h],f&&"object"==typeof f&&a in f){e=f[a],g=!0;break}return g?(d||"function"!=typeof e||(e=this.lv(e,b,c)),e):d?!1:""},ho:function(a,b,c,d,e){var f=this.c,g=this.options;g.delimiters=e;var d=a.call(b,d);return d=null==d?String(d):d.toString(),this.b(f.compile(d,g).render(b,c)),!1},b:b?function(a){this.buf.push(a)}:function(a){this.buf+=a},fl:b?function(){var a=this.buf.join("");return this.buf=[],a}:function(){var a=this.buf;return this.buf="",a},ls:function(a,b,c,d,e,f,g){var h=b[b.length-1],i=null;if(!d&&this.c&&a.length>0)return this.ho(a,h,c,this.text.substring(e,f),g);if(i=a.call(h),"function"==typeof i){if(d)return!0;if(this.c)return this.ho(i,h,c,this.text.substring(e,f),g)}return i},lv:function(a,b,d){var e=b[b.length-1],f=a.call(e);return"function"==typeof f&&(f=c(f.call(e)),this.c&&~f.indexOf("{{"))?this.c.compile(f,this.options).render(e,d):c(f)}};var e=/&/g,f=/</g,g=/>/g,h=/\'/g,i=/\"/g,j=/[&<>\"\']/,k=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)}}("undefined"!=typeof exports?exports:Hogan);
var templates = {};
templates['emote'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"userscript_emoticon\" data-emote=\"");_.b(_.v(_.f("text",c,p,0)));_.b("\" title=\"");_.b(_.v(_.f("text",c,p,0)));_.b("\">\r");_.b("\n" + i);_.b("	");_.b(_.t(_.f("image",c,p,0)));_.b("\r");_.b("\n" + i);_.b("</div>\r");_.b("\n");return _.fl();;});
templates['emoteButton'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");if(_.s(_.f("isEmber",c,p,1),c,p,0,12,134,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("	<button class=\"newlayout emotemenu button normal_button\" title=\"Emote Menu\" id=\"chat_emote_dropmenu_button\"></button>\r");_.b("\n");});c.pop();}if(!_.s(_.f("isEmber",c,p,1),c,p,1,0,0,"")){_.b("	<a class=\"dropdown_glyph\" id=\"chat_emote_dropmenu_button\"><span>emotes</span></a>\r");_.b("\n");};return _.fl();;});
templates['emoteGroupHeader'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");if(_.s(_.f("isAddonHeader",c,p,1),c,p,0,18,232,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("	<div class=\"userscript_emoticon_header addon-emotes-header\" title=\"Below are emotes added by an addon. Only those who also have the same addon installed can see these emotes in chat.\">\r");_.b("\n" + i);_.b("		Addon Emotes\r");_.b("\n" + i);_.b("	</div>\r");_.b("\n");});c.pop();}_.b("\r");_.b("\n" + i);if(!_.s(_.f("isAddonHeader",c,p,1),c,p,1,0,0,"")){_.b("	<div class=\"userscript_emoticon_header\" data-emote-channel=\"");_.b(_.v(_.f("channel",c,p,0)));_.b("\"><img src=\"");_.b(_.v(_.f("badge",c,p,0)));_.b("\" />");_.b(_.v(_.f("channel",c,p,0)));_.b("</div>\r");_.b("\n");};return _.fl();;});
templates['menu'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<div class=\"dropmenu\" id=\"chat_emote_dropmenu\">\r");_.b("\n" + i);_.b("	<div class=\"draggable\"></div>\r");_.b("\n" + i);_.b("	<div class=\"userscript_emoticon_header\">All Emotes</div>\r");_.b("\n" + i);_.b("	<div class=\"scroll scroll-dark emotes-all\">\r");_.b("\n" + i);_.b("		<div class=\"tse-content emotes-container\"></div>\r");_.b("\n" + i);_.b("	</div>\r");_.b("\n" + i);_.b("	<div class=\"userscript_emoticon_header\">Popular Emotes</div>\r");_.b("\n" + i);_.b("	<div class=\"scroll emotes-popular\">\r");_.b("\n" + i);_.b("		<div class=\"tse-content emotes-container\"></div>\r");_.b("\n" + i);_.b("	</div>\r");_.b("\n" + i);_.b("	<p class=\"dropmenu_alt_section\">\r");_.b("\n" + i);_.b("		<a class=\"left icon github\" href=\"https://github.com/cletusc/Userscript--Twitch-Chat-Emotes\" target=\"_blank\" title=\"Visit the project page on Github\"></a>\r");_.b("\n" + i);_.b("		<a class=\"left icon popular-emotes-location\" title=\"Change popular emotes location\"></a>\r");_.b("\n" + i);_.b("		<a class=\"reset\" title=\"Reset the popularity of the emotes back to default\">Reset Popularity</a>\r");_.b("\n" + i);_.b("		<a class=\"right icon resize-handle\"></a>\r");_.b("\n" + i);_.b("	</p>\r");_.b("\n" + i);_.b("</div>\r");_.b("\n");return _.fl();;});
templates['newsMessage'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("\r");_.b("\n" + i);_.b("<div class=\"twitch-chat-emotes-news\">\r");_.b("\n" + i);_.b("	[");_.b(_.v(_.f("scriptName",c,p,0)));_.b("] News: ");_.b(_.t(_.f("message",c,p,0)));_.b(" (<a href=\"#\" data-command=\"twitch-chat-emotes:dismiss-news\" data-news-id=\"");_.b(_.v(_.f("id",c,p,0)));_.b("\">Dismiss</a>)\r");_.b("\n" + i);_.b("</div>\r");_.b("\n");return _.fl();;});
templates['style'] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("#chat_emote_dropmenu_button:not(.newlayout) span {\r");_.b("\n" + i);_.b("	background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKUSURBVDhPfZTNi1JRGMZvMIsWUZts5SIXFYK0CME/IGghxVC7WUoU1NBixI+mRSD4MQzmxziKO3XUBhRmUGZKdBG40XEGU6d0GFGZcT4qxW1hi7fzvNwZqKwDD5z7vs/vueeee+6VMJxO5wUhhdvtfuHz+T4tLS2NhegfGsMDLxiwHIIhLi57PJ75VCr1Y39/n4bDIY1Go4lCDx54wYCVYzjoVjQa/dxutyfCkwSvYJpgOSQf708tuBa1yWRy/L+V/Cl4wYBFhhTxfLhum/esiiJ1u12KRCJksVhofX2dTk5OzkHMUUMPHnjB2F55VpEhPde/Lbx8FqBEIkHpdJoMBgNptVrS6XRUqVTOg7a3t2lmZob0ej2p1Wr2ggGLDOnJ3QSZH4coHo/TysoKhygUCtJoNFQsFmkwGLAwR7hSqSSVSsVeMGCRIT29F6fXJi8Xy+Uymc1mmp6eJofDQfV6nU5PT1mY2+127uHxSqUSh4FFhhQLvrvtcrm+YpkHBwdUrVZpa2uLarUadTodOjw8ZGGOGnrwwAsGLDLw1i4uLrzRYeOOj49pb2+Pdnd3qdVq8StGAIQ5ao1Ggz3wggGLDD4C4izcEcWfR0dHbMrlcrSxscGbjVAIK8lms7S5ucmB/X6fXz9YDsEQFzdjsVit2Wzyqc1kMrwfVquVjEYjzc3NkclkIpvNRmtra+yBVzAfBXtDjuGgS8FgcFbc8QvuhjNSKBQoFAqR6LFEn/L5PPfggXd5eXkWrBzDQdC1QCBgFoeut7Ozw/tyBp2FQzhPwtOFFwzY34Yo4A9wRXzdD8LhcE48wncE9no9Fuaoid574bkPLxgZ/3uI5pTQVfFlP/L7/Wmhb7JSXq/3IXrwyHZ5SNIvGCnqyh+J7+gAAAAASUVORK5CYII=\") no-repeat 50%;\r");_.b("\n" + i);_.b("	cursor: pointer;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu_button.newlayout {\r");_.b("\n" + i);_.b("	background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKUSURBVDhPfZTNi1JRGMZvMIsWUZts5SIXFYK0CME/IGghxVC7WUoU1NBixI+mRSD4MQzmxziKO3XUBhRmUGZKdBG40XEGU6d0GFGZcT4qxW1hi7fzvNwZqKwDD5z7vs/vueeee+6VMJxO5wUhhdvtfuHz+T4tLS2NhegfGsMDLxiwHIIhLi57PJ75VCr1Y39/n4bDIY1Go4lCDx54wYCVYzjoVjQa/dxutyfCkwSvYJpgOSQf708tuBa1yWRy/L+V/Cl4wYBFhhTxfLhum/esiiJ1u12KRCJksVhofX2dTk5OzkHMUUMPHnjB2F55VpEhPde/Lbx8FqBEIkHpdJoMBgNptVrS6XRUqVTOg7a3t2lmZob0ej2p1Wr2ggGLDOnJ3QSZH4coHo/TysoKhygUCtJoNFQsFmkwGLAwR7hSqSSVSsVeMGCRIT29F6fXJi8Xy+Uymc1mmp6eJofDQfV6nU5PT1mY2+127uHxSqUSh4FFhhQLvrvtcrm+YpkHBwdUrVZpa2uLarUadTodOjw8ZGGOGnrwwAsGLDLw1i4uLrzRYeOOj49pb2+Pdnd3qdVq8StGAIQ5ao1Ggz3wggGLDD4C4izcEcWfR0dHbMrlcrSxscGbjVAIK8lms7S5ucmB/X6fXz9YDsEQFzdjsVit2Wzyqc1kMrwfVquVjEYjzc3NkclkIpvNRmtra+yBVzAfBXtDjuGgS8FgcFbc8QvuhjNSKBQoFAqR6LFEn/L5PPfggXd5eXkWrBzDQdC1QCBgFoeut7Ozw/tyBp2FQzhPwtOFFwzY34Yo4A9wRXzdD8LhcE48wncE9no9Fuaoid574bkPLxgZ/3uI5pTQVfFlP/L7/Wmhb7JSXq/3IXrwyHZ5SNIvGCnqyh+J7+gAAAAASUVORK5CYII=\") !important;\r");_.b("\n" + i);_.b("	background-position: 50%;\r");_.b("\n" + i);_.b("	cursor: pointer;\r");_.b("\n" + i);_.b("	margin-left: 7px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu {\r");_.b("\n" + i);_.b("	padding: 5px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu {\r");_.b("\n" + i);_.b("	background-color: #202020;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu h4 {\r");_.b("\n" + i);_.b("	text-align: center;\r");_.b("\n" + i);_.b("	padding: 3px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .emotes-popular {\r");_.b("\n" + i);_.b("	height: 38px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .draggable {\r");_.b("\n" + i);_.b("	background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255, 255, 255, 0.05) 5px, rgba(255, 255, 255, 0.05) 10px);\r");_.b("\n" + i);_.b("	cursor: move;\r");_.b("\n" + i);_.b("	height: 7px;\r");_.b("\n" + i);_.b("	margin-bottom: 3px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .draggable:hover {\r");_.b("\n" + i);_.b("	background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255, 255, 255, 0.1) 5px, rgba(255, 255, 255, 0.1) 10px);\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b(".twitch-chat-emotes-news {\r");_.b("\n" + i);_.b("	border: 1px solid rgba(100, 65, 165, 0.5);\r");_.b("\n" + i);_.b("	padding: 2px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b(".twitch-chat-emotes-news a {\r");_.b("\n" + i);_.b("	color: #6441a5 !important;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .userscript_emoticon_header {\r");_.b("\n" + i);_.b("	border-top: 1px solid black;\r");_.b("\n" + i);_.b("	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset;\r");_.b("\n" + i);_.b("	background-image: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.5));\r");_.b("\n" + i);_.b("	padding: 2px;\r");_.b("\n" + i);_.b("	text-align: center;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .userscript_emoticon_header img {\r");_.b("\n" + i);_.b("	margin-right: 8px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .userscript_emoticon {\r");_.b("\n" + i);_.b("	display: inline-block;\r");_.b("\n" + i);_.b("	padding: 2px;\r");_.b("\n" + i);_.b("	margin: 1px;\r");_.b("\n" + i);_.b("	cursor: pointer;\r");_.b("\n" + i);_.b("	border-radius: 5px;\r");_.b("\n" + i);_.b("	text-align: center;\r");_.b("\n" + i);_.b("	width: 32px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .userscript_emoticon .emoticon {\r");_.b("\n" + i);_.b("	max-width: 32px;\r");_.b("\n" + i);_.b("	margin: 0 !important;\r");_.b("\n" + i);_.b("	height: 32px;\r");_.b("\n" + i);_.b("	background-size: contain;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .userscript_emoticon:hover {\r");_.b("\n" + i);_.b("	background-color: rgba(255, 255, 255, 0.1);\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section a {\r");_.b("\n" + i);_.b("	cursor: pointer;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section .left {\r");_.b("\n" + i);_.b("	float: left;\r");_.b("\n" + i);_.b("	margin-right: 5px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section .right {\r");_.b("\n" + i);_.b("	float: right;\r");_.b("\n" + i);_.b("	margin-left: 5px;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section a.icon {\r");_.b("\n" + i);_.b("	height: 16px;\r");_.b("\n" + i);_.b("	width: 16px;\r");_.b("\n" + i);_.b("	opacity: 0.5;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section a.icon:hover {\r");_.b("\n" + i);_.b("	opacity: 1.0;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section a.github {\r");_.b("\n" + i);_.b("	/**\r");_.b("\n" + i);_.b("	 * \"The mark\": inverted color to suit dark theme and resized to 16x16.\r");_.b("\n" + i);_.b("	 * @attribution Github, Inc. (https://github.com/logos)\r");_.b("\n" + i);_.b("	 */\r");_.b("\n" + i);_.b("	background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAALiIAAC4iAari3ZIAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAWpJREFUOE+F0ssrRGEYx/EZBhs2ssHCrCasFf4DFiKyERuytRMZESl3WxsbK0s2FlKKxkIJOyRpEgtyv19yfH/H87qm86tPvee9POd5z0zodzzPK8I4NnFuNjCKmG37GxbTMYEXrKMb9aYHKviMYaTZsY8wocPzOEENbOUrzIWhYmeYQ8SW/MUxnKICekMhNJ+FTBvraiOohK414A7HoNbqUAvlCcd4NRprj1KFBmhPVAWGsAXXYlCqkYJt9KnAGvrhxkFJWOe66ooGaq8REdwgKBdQBy1IqsARmqArqFhQktC5VhxosIpBa2sKQZm0vfrPLGmg++uD5KAYKvhflpGNVOwjrgIFeEAbZhFFGXbhkkAJwvZ2tX+HPD1rohdXtnAI/axvcPE/nO0thT52p39Y4UEtzeAS7SjHI1zUYQaacY1p+AU/w4SKxHEPfRP9A1003sEt9IKfh7+HxXx0YRF7ZgEdyLVtllDoHUPsDkVplXakAAAAAElFTkSuQmCC\") no-repeat 50%;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section a.popular-emotes-location {\r");_.b("\n" + i);_.b("	background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAClSURBVEhL7ZRBDoAgEAN9uj9fKaFkl61EiN5sMgcLnYMHDjObcTbUWUWWDQyZW4ksC37MSEkqCmrMJEn4KMzGTJCsjpku2RkzVbI7Zk4KFGPUnSpQ4HAMunQ3FY1f8IIAYOBRd74TYDBGSlLR+AWLAhwoxqg7/T3YTX8PdiTYhH+wIqlj4AVPJX0M/JjMJGEMwodDSdIYpMLhJXIMZOnA8HZsZscFnEfNs2qCgdQAAAAASUVORK5CYII=\") no-repeat 50% top;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section a.popular-emotes-location.popular-on-bottom {\r");_.b("\n" + i);_.b("	background-position: bottom;\r");_.b("\n" + i);_.b("}\r");_.b("\n" + i);_.b("#chat_emote_dropmenu .dropmenu_alt_section a.resize-handle {\r");_.b("\n" + i);_.b("	background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAX0lEQVQ4T6WPUQ7AIAhDPfpuzuyHxpGK7SR5IVYeCS0irqChAw0daOhAQwcaijyAfShARv1aMOWOfcJHBnmgIsvo8glMRkkLtnLneEIpg3U4c5LRtycoMqpcMIaLd7QXl2chH51cR7QAAAAASUVORK5CYII=\") no-repeat 50%;\r");_.b("\n" + i);_.b("	cursor: nwse-resize;\r");_.b("\n" + i);_.b("}\r");_.b("\n");return _.fl();;});

	// Script-wide variables.
	//-----------------------
	var emotes = {
			usable: [],
			get raw() {
				if (window.CurrentChat) {
					return window.CurrentChat.emoticons
				}
				else if (window.App) {
					return window.App.__container__.lookup('controller:emoticons').get('emoticons');
				}
				return [];
			},
			subscriptions: {
				badges: {},
				emotes: {}
			}
		},
		emotePopularity = false,
		$,
		jQuery,
		isInitiated = false,

		elemChatButton,
		elemChatButtonsContainer,
		elemChatInput,
		elemEmoteButton,
		elemEmoteMenu,

		SCRIPT_NAME = 'Twitch Chat Emotes',
		DEBUG = location.hash === '#twitch-chat-emotes-debug',
		NEWLAYOUT = false,
		MESSAGES = {
			ALREADY_RUNNING: 'There is already an instance of this script running, cancelling this instance.',
			NO_CHAT_ELEMENT: 'There is no chat element on the page, unable to continue.',
			NOT_LOGGED_IN: 'You are not logged in, please log in first before using the emote menu.',
			OBJECTS_NOT_LOADED: 'Needed objects haven\'t loaded yet.',
			TIMEOUT_SCRIPT_LOAD: 'Script took too long to load. Refresh to try again.'
		};

	// Quick manipulation of script-wide variables.
	//---------------------------------------------
	// Prefix all messages with script name.
	for (var message in MESSAGES) {
		if (MESSAGES.hasOwnProperty(message)) {
			MESSAGES[message] = '[' + SCRIPT_NAME + ']: ' + MESSAGES[message];
		}
	}

	// Only enable script if we have the right variables.
	//---------------------------------------------------
	(function init(time) {
		var	loggedIn = window.Twitch && window.Twitch.user.isLoggedIn(),
			routes = window.App && (window.App.ChannelRoute || window.App.ChatRoute),
			objectsLoaded = (
				window.Twitch !== undefined &&
				(
					// OLDLAYOUT
					(
						window.CurrentChat !== undefined &&
						window.CurrentChat.emoticons !== undefined &&
						window.CurrentChat.emoticons.length
					) ||
					// NEWLAYOUT
					(
						window.App !== undefined &&
						window.App.__container__ !== undefined &&
						window.App.__container__.lookup('controller:emoticons').get('emoticons') !== undefined &&
						window.App.__container__.lookup('controller:emoticons').get('emoticons').length
					)
				) &&
				window.$j !== undefined &&
				// Chat button.
				document.querySelector('#chat_speak, .send-chat-button')
			);
		if (!isInitiated && routes) {
			var activate = {
				activate: function () {
					this._super();
					init(50);
				}
			};

			if (window.App.ChannelRoute) {
				window.App.ChannelRoute.reopen(activate);
				isInitiated = true;
			}
			if (window.App.ChatRoute) {
				window.App.ChatRoute.reopen(activate);
				isInitiated = true;
			}
		}
		if (document.querySelector('#chat_emote_dropmenu_button')) {
			console.warn(MESSAGES.ALREADY_RUNNING);
			return;
		}
		if (!objectsLoaded || !loggedIn || !routes) {
			// Errors in approximately 102400ms.
			if (time >= 60000) {
				console.error(MESSAGES.TIMEOUT_SCRIPT_LOAD);
				adminMessage(MESSAGES.NOT_LOGGED_IN);
				return;
			}
			if (time >= 10000) {
				if (!loggedIn) {
					console.error(MESSAGES.NOT_LOGGED_IN);
					adminMessage(MESSAGES.NOT_LOGGED_IN);
					return;
				}
				if (!objectsLoaded) {
					console.warn(MESSAGES.OBJECTS_NOT_LOADED);
				}
			}
			setTimeout(init, time, time * 2);
			return;
		}
		setup();
	})(50);

	// Start of functions.
	//--------------------
	/**
	 * Runs initial setup of DOM and variables.
	 */
	function setup() {
		NEWLAYOUT = typeof window.CurrentChat === 'undefined';
		$ = jQuery = window.$j;

		if (NEWLAYOUT) {
			elemChatButton = $('.send-chat-button');
			elemChatButtonsContainer = $('.chat-buttons-container .chat-option-buttons');
			elemChatInput = $('.chat-interface textarea');
		}
		else {
			elemChatButton = $('#chat_speak');
			elemChatButtonsContainer = $('#control_buttons');
			elemChatInput = $('#control_input');
		}

		// No chat, just exit.
		if (!elemChatButton.length) {
			console.warn(MESSAGES.NO_CHAT_ELEMENT);
			return;
		}

		loadPlugins();
		createMenuElements();
		addStyle(templates.style.render());
		bindListeners();
		showNews();

		// Get active subscriptions.
		window.Twitch.api.get("/api/users/:login/tickets").done(function (api) {
			debug(api, 'Response from `/api/user/:login/tickets`.', true);
			api.tickets.forEach(function (ticket) {
				// Get subscriptions with emotes.
				if (ticket.product.emoticons && ticket.product.emoticons.length) {
					var badge = ticket.product.features.badge,
						channel = ticket.product.owner_name;
					// Add channel badges.
					if (badge) {
						emotes.subscriptions.badges[channel] = 'http://static-cdn.jtvnw.net/jtv_user_pictures/' + [badge.prefix, badge.owner, badge.type, badge.uid, badge.sizes[0]].join('-') + '.' + badge.format;
					}
					// Add emotes channel.
					ticket.product.emoticons.forEach(function (emote) {
						emotes.subscriptions.emotes[getEmoteFromRegEx(new RegExp(emote.regex))] = {
							channel: channel,
							url: emote.url
						};
					});
				}
			});
		});
	}

	/**
	 * Creates the initial menu elements
	 */
	function createMenuElements() {
		elemEmoteButton = $(templates.emoteButton.render({isEmber: NEWLAYOUT}));
		if (NEWLAYOUT) {
			elemEmoteButton.appendTo(elemChatButtonsContainer);
		}
		else {
			elemEmoteButton.insertBefore(elemChatButton);
		}
		elemEmoteButton.hide();
		// Animate for non-channel pages (dashboard, popout, etc.).
		// Works on dashboard only on new layout.
		if (elemChatButton.hasClass('cap')) {
			elemChatInput.animate({'margin-right': '175px'});
			elemChatButtonsContainer.css('width', '175px');
			elemChatButton.animate({'margin-right': '51px'}, {
				complete: function () {
					elemChatButton.css('margin-right', '5px');
					elemEmoteButton.css('margin-right', '5px').fadeIn();
				}
			});
		}
		// Animate for channel page.
		// Works on popout for new layout as well.
		else {
			if (NEWLAYOUT) {
				// Only correct styling for non-BetterTTV.
				if (window.BetterTTV) {
					elemEmoteButton.fadeIn();
				}
				else {
					elemChatButton.animate({'left': '121px'}, {
						complete: function () {
							elemEmoteButton.fadeIn();
						}
					});
				}
			}
			else {
				elemChatButton.css('float', 'right').animate({'width': '149px'}, {
					complete: function () {
						elemEmoteButton.fadeIn();
					}
				});
			}
		}

		// Create emote menu.
		elemEmoteMenu = $(templates.menu.render());
		elemEmoteMenu.appendTo(document.body);
	}

	/**
	 * Bind event listeners.
	 */
	function bindListeners() {
		// Handle popup.
		elemEmoteButton.popup('click_to_close', elemEmoteMenu, {
			above: true
		});

		// Toggle buttons.
		elemEmoteButton.on('click', function () {
			elemEmoteMenu.removeClass('has_moved');
			if (elemEmoteMenu.is(':visible')) {
				$(this).addClass('active');
				if (elemEmoteMenu.hasClass('not_default_location')) {
					elemEmoteMenu.offset(JSON.parse(elemEmoteMenu.attr('data-offset')));
				}
				else {
					var diff = elemEmoteMenu.height() - elemEmoteMenu.find('.emotes-all').height();
					var elemChatLines = null;
					if (NEWLAYOUT) {
						elemChatLines = $('.chat-messages');
					}
					else {
						elemChatLines = $('#chat_lines');
					}
					// Adjust the size and position of the popup.
					elemEmoteMenu.height(elemChatLines.outerHeight() - (elemEmoteMenu.outerHeight() - elemEmoteMenu.height()));
					// On NEWLAYOUT, change `$('#speak, .chat-messages')` to `elemChatLines`.
					elemEmoteMenu.width($('#speak, .chat-messages').outerWidth() - (elemEmoteMenu.outerWidth() - elemEmoteMenu.width()));
					elemEmoteMenu.offset(elemChatLines.offset());
					// Fix `.emotes-all` height.
					elemEmoteMenu.find('.emotes-all').height(elemEmoteMenu.height() - diff);
					elemEmoteMenu.find('.emotes-all').width(elemEmoteMenu.width());

					elemEmoteMenu.find('.scroll.emotes-all').TrackpadScrollEmulator('recalculate');
				}
			}
			else {
				$(this).removeClass('active');
			}
			populateEmotesMenu();
		});

		// Restore outside clicks to close popup, but only when it hasn't been moved.
		elemEmoteMenu.on('clickoutside', function () {
			if (!$(this).hasClass('has_moved') && $(this).is(':visible')) {
				elemEmoteButton.click();
			}
		});

		// Make draggable.
		elemEmoteMenu.draggable({
			handle: '.draggable',
			start: function () {
				$(this).addClass('has_moved');
				$(this).addClass('not_default_location');
			},
			stop: function () {
				elemEmoteMenu.attr('data-offset', JSON.stringify(elemEmoteMenu.offset()));
			},
			containment: $(document.body)
		});

		elemEmoteMenu.resizable({
			resize: function () {
				$(this).addClass('has_moved');
				$(this).addClass('not_default_location');
				elemEmoteMenu.find('.scroll.emotes-all').TrackpadScrollEmulator('recalculate');
			},
			alsoResize: elemEmoteMenu.find('.emotes-all'),
			containment: $(document.body),
			minHeight: 180,
			minWidth: 200
		});

		// Enable the popularity reset.
		elemEmoteMenu.find('.dropmenu_alt_section a.reset').on('click', function () {
			emotePopularityClear();
			populateEmotesMenu();
		});

		// Enable the popular emotes location changing button.
		elemEmoteMenu.find('.dropmenu_alt_section a.popular-emotes-location').on('click', function () {
			var current = +getSetting('emote-popular-on-top', 0);
			setSetting('emote-popular-on-top', current ? 0 : 1);
			fixPopularEmotesLocation(!current);
		});

		// Enable emote clicking (delegated).
		elemEmoteMenu.on('click', '.userscript_emoticon', function () {
			insertEmoteText($(this).attr('data-emote'));
		});

		// Create custom scroll bar.
		elemEmoteMenu.find('.scroll.emotes-all').TrackpadScrollEmulator({
			scrollbarHideStrategy: 'rightAndBottom'
		});
	}

	/**
	 * Populates the popup menu with current emote data.
	 */
	function populateEmotesMenu() {
		var container;

		fixPopularEmotesLocation(+getSetting('emote-popular-on-top', false));
		refreshUsableEmotes();

		// Add popular emotes.
		container = elemEmoteMenu.find('.emotes-popular .emotes-container');
		container.html('');
		emotes.usable.sort(sortByPopularity);
		emotes.usable.forEach(function (emote) {
			createEmote(emote, container);
		});

		// Add all emotes.
		container = elemEmoteMenu.find('.emotes-all .emotes-container');
		container.html('');
		emotes.usable.sort(sortBySet);
		emotes.usable.forEach(function (emote) {
			createEmote(emote, container, true);
		});

		/**
		 * Sort by popularity: most used -> least used
		 */
		function sortByPopularity(a, b) {
			var aGet = emotePopularityGet(a.text),
				bGet = emotePopularityGet(b.text),
				aNumber = typeof aGet === 'number',
				bNumber = typeof bGet === 'number';
			if (aNumber && !bNumber) {
				return -1;
			}
			if (bNumber && !aNumber) {
				return 1;
			}
			if (aGet < bGet) {
				return 1;
			}
			if (aGet > bGet) {
				return -1;
			}
			return sortByNormal(a, b);
		}

		/**
		 * Sort by alphanumeric in this order: symbols -> numbers -> AaBb... -> numbers
		 */
		function sortByNormal(a, b){
			a = a.text;
			b = b.text;
			if (a.toLowerCase() < b.toLowerCase()) {
				return -1;
			}
			if (a.toLowerCase() > b.toLowerCase()) {
				return 1;
			}
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		}

		/**
		 * Sort by emoticon set: basic smileys -> no set -> subscription emotes
		 */
		function sortBySet(a, b){
			// Override for turbo emotes.
			if (
				(a.channel && a.channel === 'Twitch Turbo') &&
				(!b.channel || (b.channel && b.channel !== 'Twitch Turbo'))
			) {
				return -1;
			}
			if (
				(b.channel && b.channel === 'Twitch Turbo') &&
				(!a.channel || (a.channel && a.channel !== 'Twitch Turbo'))
			) {
				return 1;
			}
			// Override for basic emotes.
			var basicEmotes = [':(', ':)', ':/', ':D', ':o', ':p', ':z', ';)', ';p', '<3', '>(', 'B)', 'R)', 'o_o'];
			if (basicEmotes.indexOf(a.text) >= 0 &&	basicEmotes.indexOf(b.text) < 0) {
				return -1;
			}
			if (basicEmotes.indexOf(b.text) >= 0 &&	basicEmotes.indexOf(a.text) < 0) {
				return 1;
			}
			// Sort by channel name.
			if (a.channel && !b.channel) {
				return 1;
			}
			if (b.channel && !a.channel) {
				return -1;
			}
			if (a.channel && b.channel) {
				// Force addon emote groups below standard Twitch groups.
				if (emotes.subscriptions.badges[a.channel] && !emotes.subscriptions.badges[b.channel]) {
					return -1;
				}
				if (emotes.subscriptions.badges[b.channel] && !emotes.subscriptions.badges[a.channel]) {
					return 1;
				}

				var channelSort = sortByNormal({text: a.channel}, {text: b.channel}),
					normalSort = sortByNormal(a, b);
				if (channelSort === 0) {
					return normalSort;
				}
				return channelSort;
			}
			// Get it back to a stable sort.
			return sortByNormal(a, b);
		}
	}

	/**
	 * Moves the popular emotes based on whether it should be on top.
	 * @param  {boolean} onTop Should the popular emotes be on top? `true` = on top, `false` = on bottom.
	 */
	function fixPopularEmotesLocation(onTop) {
		var body = elemEmoteMenu.find('.emotes-popular'),
			header = elemEmoteMenu.find('.emotes-popular').prev(),
			all = elemEmoteMenu.find('.emotes-all'),
			icon = elemEmoteMenu.find('.popular-emotes-location');
		if (onTop) {
			header.insertBefore(all.prev());
			body.insertBefore(all.prev());
			icon.removeClass('popular-on-bottom');
		}
		else {
			body.insertAfter(all);
			header.insertAfter(all);
			icon.addClass('popular-on-bottom');
		}
	}

	/**
	 * Refreshes the usable emotes. An emote is deemed usable if it either has no set or the set is in your user info. For turbo sets, it will use the turbo if in your user info, otherwise fall back to default.
	 */
	function refreshUsableEmotes() {
		emotes.usable = [];
		emotes.raw.forEach(function (emote) {
			// Allow hiding of emotes from the menu.
			if (emote.hidden) {
				return;
			}
			if (!emote.text) {
				emote.text = getEmoteFromRegEx(emote.regex);
			}
			if (emotes.subscriptions.emotes[emote.text]) {
				emote.channel = emotes.subscriptions.emotes[emote.text].channel;
			}
			var defaultImage;
			emote.images.some(function (image) {
				if (image.emoticon_set === null) {
					defaultImage = image;
				}
				if (emotes.subscriptions.emotes[emote.text] && image.url === emotes.subscriptions.emotes[emote.text].url) {
					emote.image = image;
					return true;
				}
			});
			emote.image = emote.image || defaultImage;
			// Fix missing image.html on new layout.
			if (emote.image && !emote.image.html) {
				emote.image.html = '<img src="' + emote.image.url + '">';
			}

			// Only add the emote if there is a URL.
			if (emote.image && emote.image.url !== null) {
				emotes.usable.push(emote);
			}
		});
	}

	/**
	 * Adds / sets popularity of an emote. Note: saves popularity data to storage each time this is called.
	 * @param {string} text          The text of the emote (e.g. "Kappa").
	 * @param {number} [forceAmount] The amount of popularity to force the emote to have. If not specificed, popularity will increase by 1.
	 */
	function emotePopularityAdd(text, forceAmount) {
		emotePopularityInit();
		if (emotePopularity[text] === undefined) {
			emotePopularity[text] = 0;
		}
		if (typeof forceAmount === 'number' && forceAmount >= 0) {
			emotePopularity[text] = forceAmount;
		}
		else {
			emotePopularity[text]++;
		}
		setSetting('emote-popularity-tracking', JSON.stringify(emotePopularity));
	}

	/**
	 * Gets the current popularity of an emote.
	 * @param  {string} text The text of the emote (e.g. "Kappa").
	 * @return {number}      The amount of popularity. Possible to be 0 if it has been forced.
	 * @return {boolean}     `false` if the emote is not in the popularity tracking data (never been added by `emotePopularityAdd`).
	 */
	function emotePopularityGet(text) {
		emotePopularityInit();
		if (typeof emotePopularity[text] === 'number' && emotePopularity[text] >= 0) {
			return emotePopularity[text];
		}
		return false;
	}

	/**
	 * Clears the current emote popularity tracking data.
	 */
	function emotePopularityClear() {
		deleteSetting('emote-popularity-tracking');
		emotePopularity = false;
		emotePopularityInit();
	}

	/**
	 * Initiates the popularity tracking. This will pull data from storage, or if none exists, set some common defaults.
	 */
	function emotePopularityInit() {
		if (!emotePopularity) {
			emotePopularity = JSON.parse(getSetting('emote-popularity-tracking', '{}'));
			emotePopularityAdd('BibleThump', 0);
			emotePopularityAdd('DansGame', 0);
			emotePopularityAdd('FailFish', 0);
			emotePopularityAdd('Kappa', 0);
			emotePopularityAdd('Kreygasm', 0);
			emotePopularityAdd('SwiftRage', 0);
		}
	}

	/**
	 * Inserts an emote into the chat box.
	 * @param {string} text The text of the emote (e.g. "Kappa").
	 */
	function insertEmoteText(text) {
		emotePopularityAdd(text);
		// Get input.
		var element = document.querySelector('#chat_text_input, .chat-interface textarea');

		// Insert at cursor / replace selection.
		// https://developer.mozilla.org/en-US/docs/Code_snippets/Miscellaneous
		var selectionEnd = element.selectionStart + text.length;
		var currentValue = element.value;
		var beforeText = currentValue.substring(0, element.selectionStart);
		var afterText = currentValue.substring(element.selectionEnd, currentValue.length);
		// Smart padding, only put space at start if needed.
		if (
			beforeText !== '' &&
			beforeText.substr(-1) !== ' '
		) {
			text = ' ' + text;
		}
		// Always put space at end.
		text = beforeText + text + ' ' + afterText;
		// Set the text.
		if (NEWLAYOUT) {
			window.App.__container__.lookup('controller:chat').get('currentRoom').set('messageToSend', text);
		}
		else {
			element.value = text;
		}
		element.focus();
		// Put cursor at end.
		selectionEnd = element.selectionStart + text.length;
		element.setSelectionRange(selectionEnd, selectionEnd);

		// Close popup if it hasn't been moved by the user.
		if (!elemEmoteMenu.hasClass('has_moved')) {
			elemEmoteButton.click();
		}
		// Re-populate as it is still open.
		else {
			populateEmotesMenu();
		}
	}

	/**
	 * Creates the emote element and listens for a click event that will add the emote text to the chat.
	 * @param {object}  emote      The emote that you want to add. This object should be one coming from `emotes`.
	 * @param {element} container  The HTML element that the emote should be appended to.
	 * @param {boolean} showHeader Whether a header shouldbe created if found. Only creates the header once.
	 */
	function createEmote(emote, container, showHeader) {
		// Emote not usable or no container, can't add.
		if (!emote || !emote.image || !container.length) {
			return;
		}
		if (showHeader) {
			if (emote.channel && emote.channel !== 'Twitch Turbo') {
				var badge = emotes.subscriptions.badges[emote.channel] || emote.badge || 'https://static-cdn.jtvnw.net/jtv_user_pictures/subscriber-star.png';
				// Add notice about addon emotes.
				if (!emotes.subscriptions.badges[emote.channel] && !elemEmoteMenu.find('.userscript_emoticon_header.addon-emotes-header').length) {
					container.append(
						$(templates.emoteGroupHeader.render({
							isAddonHeader: true
						}))
					);
				}
				if (!elemEmoteMenu.find('.userscript_emoticon_header[data-emote-channel="' + emote.channel + '"]').length) {
					container.append(
						$(templates.emoteGroupHeader.render({
							badge: badge,
							channel: emote.channel
						}))
					);
				}
			}
		}

		container.append(
			$(templates.emote.render({
				image: emote.image.html,
				text: emote.text
			}))
		);
	}

	/**
	 * Show latest news.
	 */
	function showNews() {
		var dismissedNews = JSON.parse(getSetting('twitch-chat-emotes:dismissed-news', '[]')),
			cachedNews = JSON.parse(getSetting('twitch-chat-emotes:cached-news', '{}'));
		// Only poll news feed once per day.
		if (DEBUG || Date.now() - getSetting('twitch-chat-emotes:news-date', 0) > 86400000) {
			$.ajax('https://api.github.com/repos/cletusc/Userscript--Twitch-Chat-Emotes/contents/news.json', {
				dataType: 'json',
				headers: {
					'Accept': 'application/vnd.github.v3.raw+json',
					'User-Agent': 'cletusc/Userscript--Twitch-Chat-Emotes'
				}
			}).done(function (data) {
				cachedNews = data || cachedNews;
				setSetting('twitch-chat-emotes:cached-news', JSON.stringify(cachedNews));
			}).always(function () {
				handleNewsFeed();
				setSetting('twitch-chat-emotes:news-date', Date.now());
			});
		}
		else {
			handleNewsFeed();
		}

		// Handles displaying of news feed.
		function handleNewsFeed() {
			for (var newsId in cachedNews) {
				if (cachedNews.hasOwnProperty(newsId) && dismissedNews.indexOf(newsId) === -1) {
					adminMessage(templates.newsMessage.render({
						scriptName: SCRIPT_NAME,
						message: cachedNews[newsId],
						id: newsId
					}), true);
				}
			}
			$('#chat_lines, .chat-messages').on('click', 'a[data-command="twitch-chat-emotes:dismiss-news"]', function (evt) {
				evt.preventDefault();
				dismissedNews.push($(this).data('news-id'));
				setSetting('twitch-chat-emotes:dismissed-news', JSON.stringify(dismissedNews));
				$(this).parent().parent().remove();
			});
		}
	}

	/**
	 * Load jQuery plugins.
	 */
	function loadPlugins() {
		(function ($) {
			$.fn.resizable = function (options) {
				var settings = $.extend({
					alsoResize: null,
					alsoResizeType: 'both', // `height`, `width`, `both`
					containment: null,
					create: null,
					destroy: null,
					handle: '.resize-handle',
					maxHeight: 9999,
					maxWidth: 9999,
					minHeight: 0,
					minWidth: 0,
					resize: null,
					resizeOnce: null,
					snapSize: 1,
					start: null,
					stop: null
				}, options);

				settings.element = $(this);

				function recalculateSize(evt) {
					var data = evt.data,
						resized = {};
					data.diffX = Math.round((evt.pageX - data.pageX) / settings.snapSize) * settings.snapSize;
					data.diffY = Math.round((evt.pageY - data.pageY) / settings.snapSize) * settings.snapSize;
					if (Math.abs(data.diffX) > 0 || Math.abs(data.diffY) > 0) {
						if (
							settings.element.height() !== data.height + data.diffY &&
							data.height + data.diffY >= settings.minHeight &&
							data.height + data.diffY <= settings.maxHeight &&
							(settings.containment ? data.outerHeight + data.diffY + data.offset.top <= settings.containment.offset().top + settings.containment.outerHeight() : true)
						) {
							settings.element.height(data.height + data.diffY);
							resized.height = true;
						}
						if (
							settings.element.width() !== data.width + data.diffX &&
							data.width + data.diffX >= settings.minWidth &&
							data.width + data.diffX <= settings.maxWidth &&
							(settings.containment ? data.outerWidth + data.diffX + data.offset.left <= settings.containment.offset().left + settings.containment.outerWidth() : true)
						) {
							settings.element.width(data.width + data.diffX);
							resized.width = true;
						}
						if (resized.height || resized.width) {
							if (settings.resizeOnce) {
								settings.resizeOnce.bind(settings.element)(evt.data);
								settings.resizeOnce = null;
							}
							if (settings.resize) {
								settings.resize.bind(settings.element)(evt.data);
							}
							if (settings.alsoResize) {
								if (resized.height && (settings.alsoResizeType === 'height' || settings.alsoResizeType === 'both')) {
									settings.alsoResize.height(data.alsoResizeHeight + data.diffY);
								}
								if (resized.width && (settings.alsoResizeType === 'width' || settings.alsoResizeType === 'both')) {
									settings.alsoResize.width(data.alsoResizeWidth + data.diffX);
								}
							}
						}
					}
				}

				function start(evt) {
					evt.preventDefault();
					if (settings.start) {
						settings.start.bind(settings.element)();
					}
					var data = {
						alsoResizeHeight: settings.alsoResize ? settings.alsoResize.height() : 0,
						alsoResizeWidth: settings.alsoResize ? settings.alsoResize.width() : 0,
						height: settings.element.height(),
						offset: settings.element.offset(),
						outerHeight: settings.element.outerHeight(),
						outerWidth: settings.element.outerWidth(),
						pageX: evt.pageX,
						pageY: evt.pageY,
						width: settings.element.width()
					};
					$(document).on('mousemove', '*', data, recalculateSize);
					$(document).on('mouseup', '*', stop);
				}

				function stop() {
					if (settings.stop) {
						settings.stop.bind(settings.element)();
					}
					$(document).off('mousemove', '*', recalculateSize);
					$(document).off('mouseup', '*', stop);
				}

				if (settings.handle) {
					if (settings.alsoResize && ['both', 'height', 'width'].indexOf(settings.alsoResizeType) >= 0) {
						settings.alsoResize = $(settings.alsoResize);
					}
					if (settings.containment) {
						settings.containment = $(settings.containment);
					}
					settings.handle = $(settings.handle);
					settings.snapSize = settings.snapSize < 1 ? 1 : settings.snapSize;

					if (options === 'destroy') {
						settings.handle.off('mousedown', start);

						if (settings.destroy) {
							settings.destroy.bind(this)();
						}
						return this;
					}

					settings.handle.on('mousedown', start);

					if (settings.create) {
						settings.create.bind(this)();
					}
				}
				return this;
			};
		})(jQuery);

		if (!$.fn.TrackpadScrollEmulator) {
			/**
			 * TrackpadScrollEmulator
			 * Version: 1.0.2
			 * Author: Jonathan Nicol @f6design
			 * https://github.com/jnicol/trackpad-scroll-emulator
			 *
			 * The MIT License
			 *
			 * Copyright (c) 2012-2013 Jonathan Nicol
			 *
			 * Permission is hereby granted, free of charge, to any person obtaining a copy
			 * of this software and associated documentation files (the "Software"), to deal
			 * in the Software without restriction, including without limitation the rights
			 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
			 * copies of the Software, and to permit persons to whom the Software is
			 * furnished to do so, subject to the following conditions:
			 *
			 * The above copyright notice and this permission notice shall be included in
			 * all copies or substantial portions of the Software.
			 *
			 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
			 * THE SOFTWARE.
			 */(function(e){function n(n,r){function m(){if(s.hasClass("horizontal")){h="horiz";p="scrollLeft";d="width";v="left"}s.prepend('<div class="tse-scrollbar"><div class="drag-handle"></div></div>');a=s.find(".tse-scrollbar");f=s.find(".drag-handle");if(r.wrapContent){u.wrap('<div class="tse-scroll-content" />')}o=s.find(".tse-scroll-content");N();s.on("mouseenter",S);f.on("mousedown",g);o.on("scroll",w);E()}function g(t){t.preventDefault();var n=t.pageY;if(h==="horiz"){n=t.pageX}l=n-f.offset()[v];e(document).on("mousemove",y);e(document).on("mouseup",b)}function y(e){e.preventDefault();var t=e.pageY;if(h==="horiz"){t=e.pageX}var n=t-a.offset()[v]-l;var r=n/a[d]();var i=r*u[d]();o[p](i)}function b(){e(document).off("mousemove",y);e(document).off("mouseup",b)}function w(e){S()}function E(){var e=u[d]();var t=o[p]();var n=a[d]();var r=n/e;var i=Math.round(r*t)+2;var s=Math.floor(r*(n-2))-2;if(n<e){if(h==="vert"){f.css({top:i,height:s})}else{f.css({left:i,width:s})}a.show()}else{a.hide()}}function S(){E();x()}function x(){f.addClass("visible");if(typeof c==="number"){window.clearTimeout(c)}c=window.setTimeout(function(){T()},1e3)}function T(){f.removeClass("visible");if(typeof c==="number"){window.clearTimeout(c)}}function N(){if(h==="vert"){o.width(s.width()+C());o.height(s.height())}else{o.width(s.width());o.height(s.height()+C());u.height(s.height())}}function C(){var t=e('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');e("body").append(t);var n=e(t).innerWidth();var r=e("div",t).innerWidth();t.remove();return n-r}function k(){N();E()}function L(e,t){if(t){r[e]=t}else{return r[e]}}function A(){u.insertBefore(a);a.remove();o.remove();u.css({height:s.height()+"px","overflow-y":"scroll"});O("onDestroy");s.removeData("plugin_"+t)}function O(e){if(r[e]!==undefined){r[e].call(i)}}var i=n;var s=e(n);var o;var u=s.find(".tse-content");var a;var f;var l;var c;var h="vert";var p="scrollTop";var d="height";var v="top";r=e.extend({},e.fn[t].defaults,r);m();return{option:L,destroy:A,recalculate:k}}var t="TrackpadScrollEmulator";e.fn[t]=function(r){if(typeof arguments[0]==="string"){var i=arguments[0];var s=Array.prototype.slice.call(arguments,1);var o;this.each(function(){if(e.data(this,"plugin_"+t)&&typeof e.data(this,"plugin_"+t)[i]==="function"){o=e.data(this,"plugin_"+t)[i].apply(this,s)}else{throw new Error("Method "+i+" does not exist on jQuery."+t)}});if(o!==undefined){return o}else{return this}}else if(typeof r==="object"||!r){return this.each(function(){if(!e.data(this,"plugin_"+t)){e.data(this,"plugin_"+t,new n(this,r))}})}};e.fn[t].defaults={onInit:function(){},onDestroy:function(){},wrapContent:true}})(jQuery)
		}
	}

	/**
	 * Gets the usable emote text from a regex.
	 * @attribute http://userscripts.org/scripts/show/160183 (adaption)
	 */
	function getEmoteFromRegEx(regex) {
		if (typeof regex === 'string') {
			regex = new RegExp(regex);
		}
		return decodeURI(regex.source)
			.replace('&gt\\;', '>') // right angle bracket
			.replace('&lt\\;', '<') // left angle bracket
			.replace(/\(\?![^)]*\)/g, '') // remove negative group
			.replace(/\(([^|])*\|?[^)]*\)/g, '$1') // pick first option from a group
			.replace(/\[([^|])*\|?[^\]]*\]/g, '$1') // pick first character from a character group
			.replace(/[^\\]\?/g, '') // remove optional chars
			.replace(/^\\b|\\b$/g, '') // remove boundaries
			.replace(/\\/g, ''); // unescape
	}

	/**
	 * Message hook into Twitch "admin" message.
	 */
	function adminMessage(message, isHTML) {
		if (typeof window.CurrentChat !== 'undefined') {
			return window.CurrentChat.admin_message(message);
		}
		else if (NEWLAYOUT) {
			var controller = App.__container__.lookup("controller:chat");
			if (isHTML) {
				var id = location.href + '#admin-message-workaround-' + Math.random();
				controller.currentRoom.addTmiMessage(id);
				setTimeout(function () {
					$('a[href="' + id + '"]').get(0).outerHTML = message;
				}, 0);
				return true;
			}
			return controller.currentRoom.addTmiMessage(message);
		}
		else {
			return console.log(message);
		}
	}

	// Generic functions.
	//-------------------
	/**
	 * Adds a stylesheet to the document.
	 * @param {string} text The styles to be added.
	 */
	function addStyle(text) {
		var style = document.createElement('style');
		style.textContent = text;
		document.querySelector('head').appendChild(style);
	}

	/**
	 * Gets a storage value.
	 * @param  {string} aKey     The key you want to get.
	 * @param  {mixed}  aDefault The default value to return if there isn't anything in storage.
	 * @return {mixed}           The value in storage or `aDefault` if there isn't anything in storage.
	 */
	function getSetting(aKey, aDefault) {
		var val = localStorage.getItem(aKey);
		if (val === null && typeof aDefault !== 'undefined') {
			return aDefault;
		}
		return val;
	}
	/**
	 * Sets a storage value.
	 * @param {string} aKey The key you want to set.
	 * @param {mixed}  aVal The value you want to store.
	 */
	function setSetting(aKey, aVal) {
		localStorage.setItem(aKey, aVal);
	}

	/**
	 * Deletes a storage key.
	 * @param {string} aKey The key you want to set.
	 */
	function deleteSetting(aKey) {
		localStorage.removeItem(aKey);
	}

	/**
	 * Logs a message only when global `DEBUG` is true.
	 * @param {mixed}   obj                 The object to log.
	 * @param {string}  [description = '']  The message describing the debug.
	 * @param {boolean} [stringify = false] Whether `obj` should be passed through `JSON.stringify`.
	 */
	function debug(obj, description, stringify) {
		if (DEBUG) {
			console.log('[DEBUG][' + (SCRIPT_NAME || 'UNKNOWN SCRIPT') + ']: ' + (description || ''), (stringify ? JSON.stringify(obj) : obj));
		}
	}

// End wrapper.
})(this.unsafeWindow || window, window.chrome ? true : false);
