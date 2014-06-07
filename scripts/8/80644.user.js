// ==UserScript==
// @name           BF:Heroes Quick Reply
// @namespace      Freeze-18
// @description    Adds more options to the quick reply box on the BF:Heroes forums.
// @include        http://www.battlefieldheroes.com/en/forum/showthread.php?tid=*
// ==/UserScript==

if(document.getElementById('top-login-form')) return;
if(unsafeWindow.GM_log == GM_log) (unsafeWindow = (function() {var e = document.createElement('a');e.setAttribute('onclick', 'return window;');return e.onclick();}()));
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://cdn.battlefieldheroes.com/static/modules/forum/js/editor.js');
head.appendChild(script);
function add() { if(unsafeWindow.messageEditor) window.location.href = 'javascript:new messageEditor("message", {lang: {title_bold: "Insert bold text",title_italic: "Insert italic text",title_underline: "Insert underlined text",title_left: "Align text to the left",title_center: "Align text to the center",title_right: "Align text to the right",title_justify: "Justify text",title_numlist: "Insert numbered list",title_bulletlist: "Insert bulleted list",title_image: "Insert image",title_hyperlink: "Insert hyperlink",title_email: "Insert email address",title_quote: "Insert quoted text",title_code: "Insert formatted code",title_php: "Insert formatted PHP code",title_close_tags: "Close any open MyCode tags that you currently have open",enter_list_item: "Enter a list item. Click cancel or leave blank to end the list.",enter_url: "Please enter the URL of the website.",enter_url_title: "Optionally, you can also enter a title for the URL.",enter_email: "Please enter the email address you wish to insert.",enter_email_title: "Optionally, you may also enter a title for the email address.",enter_image: "Please enter the remote URL of the image you wish to insert.",enter_video_url: "Please enter the URL of the video.",video_dailymotion: "Dailymotion",video_googlevideo: "Google Video",video_metacafe: "MetaCafe",video_myspacetv: "MySpace TV",video_vimeo: "Vimeo",video_yahoo: "Yahoo Video",video_youtube: "YouTube",size_xx_small: "XX Small",size_x_small: "X Small",size_small: "Small",size_medium: "Medium",size_large: "Large",size_x_large: "X Large",size_xx_large: "XX Large",font: "Font",size: "Text Size",color: "Text Color"}, rtl: 0, theme: "default", height: "300px"});void(0);'; else setTimeout(add, 100); }
add();
var old = unsafeWindow.Thread['multiQuotedLoaded'];
unsafeWindow.Thread['multiQuotedLoaded'] = function(request) { var e = document.getElementById('message_new'); e.id = 'message'; old(request); e.id = 'message_new'; var s = document.getElementById('spinner'); s.parentNode.removeChild(s); };