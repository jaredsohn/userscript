// ==UserScript==
// @name        FlickrLoadRemoteImages
// @grant       GM_getValue
// @grant		GM_setValue
// @namespace   http://vispillo.org
// @description Automatically load remotely hosted images on flickr.com
// @require 	http://userscripts.org/scripts/source/78952.user.js
// @require     http://simplemodal.googlecode.com/files/jquery.simplemodal.1.4.1.min.js
// @include     http://www.flickr.com/*
// @include     https://secure.flickr.com/*
// @version     1
// ==/UserScript==

jQuery.noConflict();
var cssStyle = '\
#basic-modal-content {display:none;}\
/* Overlay */\
#simplemodal-overlay {background-color:#000; cursor:wait;}\
\
/* Container */\
#simplemodal-container {height:430px; width:600px; color:#000; background-color:#fff; border:1px dotted lightgrey; padding:5px;}\
#simplemodal-container .simplemodal-data {padding:8px;}\
#simplemodal-container a.modalCloseImg {background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAdCAYAAABfeMd1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8xJREFUeNqclktIVFEYx%2BfO%2BGjUGqw0S%2FIRGtTKENtkqJTkooUwC0EQNNpEEiJYoISbKAhcCYogagvBlbRQW%2FkAIdAkbRGIi3RiNIfJR%2Bqk4zxO%2F2%2F4zu3cOw%2BtA7%2B5c8%2Fj%2B5%2FvfN8592hCCMspSy4o4acXLIHVU40kkQTkglfgm4hd3KAb3PxfESf4KU5XAuBRPA0tznINgCa1Yn193bK0tBR5ZmVlWUpKSiyFhYXmcfPgiaZpn0%2FyZEKd4vLysqioqKCZRAEhMTc3Z%2Fbqy0nL9Uzt3dXVJex2e0wBic1mEx0dHcLv96tDX8cTyVN7tbW1JTRupr6%2B3uzR7Vgib2Tr5ORklJHa2lrDe0FBgVhcXDTUDw8PqyIfY4m4ZGt5ebnB4OrqaqS%2BsrJSj8XOzk6kbnBwUO9XVFQkgsGgKmTTRQ4PD%2FNlrcvlivKis7Mz0kZiJBRLQDI7O%2Fs3rwOBu7oI1B%2FKhrGxsaiBtDTSsCyxBIj%2B%2Fn69D%2Bw%2BJg0r%2FYTD4Wy5fF6vNyoD19bWLENDQ4b3pqammBtPHQ%2BdiF0rNo4GxT3Z4HA4ogbSxmtsbNTf4ZnhXS1Ief1%2FKBQ6og0f2fXIkuJ4MVGDLBOACtVRW6KYuN3ue7oISIc3btmoDp6enjYYbWlp0Y3Qf1UAx40hu0pLSx0yJPRz1uPxvJONo6OjhswiAZm%2BBBlX3yU9PT26gM%2Fno%2FPrHLDpIr29vQ%2FU7GloaDBk10k7vrq62uDF%2BPg4ZYbDIAKuzc%2FPD8hOdBbRUXGaI6Wmpkbs7%2B%2FrAltbW19RX2wWSQd54A6WzaV6REcFjvSYxikGtESqBwcHB7vt7e30bSngyVtl4M%2BAHHCrubn5%2BcbGxqb5tFtYWBB9fX2iu7s78pyZmYn6ciF2e62trS9hpwxcAWlqdqWA8%2BA6uA%2BejoyMfBL%2FUFZWVjbr6ureYmwNuAEugtSIff4y0rpl8CWhFDjBC6fT%2BR4BdB8dHYXiGZ%2BamvJgY35A%2F3ZQB%2BiIv8pLlaR%2FfrHpad2S2b1McJk75vPzUlVVVV5ZWdmF5ORkGw6%2BEL6YvyYmJlyIxyba3eA7swG2gQ8E6NSSIhoHKIWTgISyWSyH%2F2fyJMjrMPgNdvl6REI%2FgAfsgANwTCcLJYh%2BkWAhGwulcfplcqwyeWPZuQ8NpnNpn41uM3vsAQkEOQuNtxWTUCp7lcHPNK6zsifH7I2PZ%2B5j4QBPIhz3SqQsXRLHKZVFU%2Fhd4xkGWcjPT7k8IelBwnsXC0kxK3tn4%2F9SJKwYDTPCLJDocmcWlPtJUy86isGERv4IMACaz3RmXeGcqwAAAABJRU5ErkJggg%3D%3D\') no-repeat; width:25px; height:29px; display:inline; z-index:3200; position:absolute; top:-10px; right:-10px; cursor:pointer;}\
#FLRIheader {margin-bottom: 5px; height:50px;}\
#FLRIheader p { margin: 0px; }\
#simplemodal-container {text-align:left;-moz-border-radius:7px;border-radius:7px;}\
#simplemodal-container h3 { font-size:25px; margin-top:3px; font-weight:bold; color:#000}\
#FLRIeditarea {margin-top:10px;-moz-border-radius:4px;border-radius:4px;margin-top:5px;padding:5px;background-color:#DDF}\
#FLRIeditarea label { float:left;text-align:right; width:15%;clear:both;font-size:12px; }\
#FLRIeditarea input {margin-top:-2px;margin-left:5px;}\
#FLRIeditarea td {vertical-align:top;}\
#FLRIeditarea textarea {-moz-border-radius:3px;border-radius:3px;border:1px solid #AAA;margin-top:2px;width:100%}\
#FLRIimport {margin-top:10px;-moz-border-radius:4px;border-radius:4px;margin-top:5px;padding:5px;background-color:#DDF}\
#FLRIimport textarea {-moz-border-radius:3px;border-radius:3px;border:1px solid #AAA;margin-top:2px;width:100%}\
#simplemodal-container img.deletex {background:url("http://l.yimg.com/g/images/delete_x_small_sprite.gif") no-repeat scroll 3px 4px transparent;float:right;cursor:pointer;}\
#simplemodal-container img.deletex:hover { background-position:3px -34px; }\
#tabs span.New { cursor:pointer;margin:0 3px;float:right; }\
span.inactive { background-color:#ddd; color:#bbb;cursor:default !important; }\
li.closed > div.content-preview { display:none;margin:3px;padding:3px;background-color:#CCC }\
li.open > div.content-preview { display:block;margin:3px;padding:3px;background-color:#CCC }\
span.previewtitle { cursor:pointer; }\
p.previewpara { background-color: #DDDDDD; margin: 5px; padding: 2px; text-align: center; width: 98%;}\
#FLRIsettings ul { list-style-type: disc; padding-left: 15px; }\
';

var content = '<h3>FlickrLoadRemoteImages - Configuration</h3>\
<div id="FLRIheader"><p id="FLRInumitems"></p>\
</div>\
<div id="FLRItabs" style="positionr:relative">\
<ul class="options" id="FLRItabslist">\
<li class="open"><h4><span class="expando_list_caret"></span>Local Whitelist</h4>\
<div id="FLRImanage">\
<div id="FLRIeditarea">\
<div id="FLRIeditarea-header">\
Here you can define pages on Flickr where images embedded from remote sites should automatically be retrieved.<br /> Simply add one item per line, e.g. flickr.com/groups/, to permit loading all images matching that pattern.<br />\'*\' will auto-load remote pictures embedded anywhere on Flickr\
</div>\
<textarea rows="8" cols="35" name="localwhitelist" style=""></textarea>\
</div>\
</li>\
<li class="closed"><h4><span class="expando_list_caret"></span>Remote Whitelist</h4>\
<div id="FLRIimport">\
<div id="FLRIimport-header">\
Here you can define sites from which images should automatically be retrieved.<br /> Simply add one item per line, e.g. imgur.com, to permit loading all images matching that pattern, subject to the local whitelist defined above.<br />\'*\' will load images from all external sites\
</div>\
<div>\
<textarea rows="8" cols="35" name="remotewhitelist" style=""></textarea>\
</div>\
</div>\
</li>\
</ul>\
<input id="FLRIsavebutt" type="button" class="SmallButt" value="Save and close" style="position:absolute;bottom:10px;right:10px;">\
</div>\
';


jQuery('<dd><a id="extconfig" href="#" title="LoadRemote" class="ft-facebook"><span class="icon" style="background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wKGwsxDKc+GrMAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAZlJREFUKM+dk1FP2zAQx+/OTtKmlRqSVpkU1PEA7BW+/0dgEntpiwSI0kmZ1Jd2FMdziH08mIXQSZOKXyyf/buz7/83Oufg8CGdc9fXPw5iLi8v8OrqOzMfhCGi9FMb8imiXoSAAGCtresaEbtnAEB2F9baJBkVRRGGoY8456qqenxcNU3TJWW3znQ6zb/kzcsLACCRIELEKIrSNJ0vFupZtaRsmfE4E4Lms7lSipn7cX+cZUVR+FZ/Oztf3NxorT1JbbVer79a/dRaE5GUsjZ1Wf66u78nImYmQXmet4fJ9yBJks12EwRBGIVhFAZhQESIuN1sd7udr5Bl6Ye3xYP45OSrtRb+Xh0Rl8vl0+8nAFBKDYdDZvZl3zFBQggh5Yeu+shgOBBCtCKNkpGzTilF/5HVWpul6WQy8T1j5rPTU59dAgAg7Knpl8z88LCsKn18XCCic242mxtj3rDa1Ov1es9A5o/xZFmWQRCk6dHt7Z0xxmd88+S/tmwN5XfjOG5Fe5d775Jdf/pdrXUbQURsmuYzH+dz3/QVFdTQG8cyF8QAAAAASUVORK5CYII=)"></span><span class="link-text">Configure</span></a></dd>').appendTo('div.last dl');
jQuery('body').append(jQuery('<div id="FLRIcontent" style="display:none"></div>').html(content));
jQuery('head').append('<link type="text/css" rel="stylesheet" href="http://l.yimg.com/g/css/c_help_with.css"/>');
jQuery('head').append(jQuery('<style type="text/css" />').html(cssStyle));
jQuery('#extconfig').click ( function () {
	jQuery('#FLRIcontent').modal();
	var rwhitelist = GM_getValue('remote_whitelist','*').replace(/\|/g,"\n");
	jQuery('textarea[name=remotewhitelist]').html(rwhitelist);
	var lwhitelist = GM_getValue('local_whitelist','*').replace(/\|/g,"\n");
	jQuery('textarea[name=localwhitelist]').html(lwhitelist);
});
jQuery('#FLRIsavebutt').click ( function () {
	GM_setValue('remote_whitelist',jQuery('textarea[name=remotewhitelist]').val().replace(/\n/g,'|'));
	GM_setValue('local_whitelist',jQuery('textarea[name=localwhitelist]').val().replace(/\n/g,'|'));
	jQuery.modal.close();
});

jQuery('#FLRItabslist li h4').live('click', function() {
  jQuery(this).parent().siblings().removeClass('open').addClass('closed');
  jQuery(this).parent().toggleClass('open closed');
});

jQuery.each(GM_getValue('local_whitelist','*').split('|'), function () {
	var loc = this;
	if (document.location.href.indexOf(loc) != -1 || loc == '*') {
		jQuery('img.blocked-image').each(function(i) {
			var that = jQuery(this);
			jQuery.each(GM_getValue('remote_whitelist','*').split('|'), function () {
				var rem=this
				if (that.attr('data-blocked-src').indexOf(rem) != -1 || rem == '*') {
					that.attr('src',that.attr('data-blocked-src'));
					that.toggleClass('blocked-image');
					that.toggleClass('blocked-loaded');
					return false;
				}
			});
		});
	}	
});

