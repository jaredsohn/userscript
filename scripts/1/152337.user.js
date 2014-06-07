// ==UserScript==
// @name           Additional Emoticons for Disco Forums
// @namespace      Alley
// @description    V1.0
// @include http://discoverygc.com/forums/newreply.php*
// @include http://discoverygc.com/forums/newthread.php*
// @include http://discoverygc.com/forums/private.php*
// @include http://discoverygc.com/forums/editpost.php*
// ==/UserScript==
var emoticon1url = "http://www.skype-emoticons.com/images/emoticon-00107-sweating.gif";
var emoticon2url = "http://www.skype-emoticons.com/images/emoticon-00100-smile.gif";
var emoticon3url = "http://www.skype-emoticons.com/images/emoticon-00101-sadsmile.gif";
var emoticon4url = "http://www.skype-emoticons.com/images/emoticon-00103-cool.gif";
var emoticon5url = "http://www.skype-emoticons.com/images/emoticon-00176-smoke.gif";
var emoticon6url = "http://www.skype-emoticons.com/images/emoticon-00178-rock.gif";
var emoticon7url = "http://www.skype-emoticons.com/images/emoticon-00113-sleepy.gif";
var emoticon8url = "http://www.skype-emoticons.com/images/emoticon-00133-wait.gif";
var emoticon9url = "http://i.imgur.com/4xvNJ.png";
var emoticon10url = "http://www.skype-emoticons.com/images/emoticon-00137-clapping.gif";
var emoticon11url = "http://www.skype-emoticons.com/images/emoticon-00142-happy.gif";
var emoticon12url = "http://www.skype-emoticons.com/images/emoticon-00147-emo.gif";
var emoticon13url = "http://i.imgur.com/TScyf.gif";
var emoticon14url = "http://www.skype-emoticons.com/images/emoticon-00126-nerd.gif";
var emoticon15url = "http://www.skype-emoticons.com/images/emoticon-00118-yawn.gif";
var emoticon16url = "http://i.imgur.com/1ACwd.gif";
var emoticon17url = "http://www.skype-emoticons.com/images/emoticon-00121-angry.gif";
var emoticon18url = "http://www.skype-emoticons.com/images/emoticon-00157-sun.gif";
var emoticon19url = "http://www.skype-emoticons.com/images/emoticon-00115-inlove.gif";
var emoticon20url = "http://www.skype-emoticons.com/images/emoticon-00174-bandit.gif";
var newElement = document.createElement("tbody");
document.getElementById('clickable_smilies').insertBefore(newElement, document.getElementById('inhalt'));
                
newElement.innerHTML = "<tr><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon1url + "[/img]\");';>  <img src='" + emoticon1url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon2url + "[/img]\");';>  <img src='" + emoticon2url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon3url + "[/img]\");';>  <img src='" + emoticon3url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon4url + "[/img]\");';>  <img src='" + emoticon4url + "'></a></td></tr><tr><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon5url + "[/img]\");';>  <img src='" + emoticon5url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon6url + "[/img]\");';>  <img src='" + emoticon6url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon7url + "[/img]\");';>  <img src='" + emoticon7url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon8url + "[/img]\");';>  <img src='" + emoticon8url + "'></a></td></tr><tr><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon9url + "[/img]\");';>  <img src='" + emoticon9url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon10url + "[/img]\");';>  <img src='" + emoticon10url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon11url + "[/img]\");';>  <img src='" + emoticon11url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon12url + "[/img]\");';>  <img src='" + emoticon12url + "'></a></td></tr><tr><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon13url + "[/img]\");';>  <img src='" + emoticon13url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon14url + "[/img]\");';>  <img src='" + emoticon14url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon15url + "[/img]\");';>  <img src='" + emoticon15url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon16url + "[/img]\");';>  <img src='" + emoticon16url + "'></a></td></tr><tr><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon17url + "[/img]\");';>  <img src='" + emoticon17url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon18url + "[/img]\");';>  <img src='" + emoticon18url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon19url + "[/img]\");';>  <img src='" + emoticon19url + "'></a></td><td><a href='javascript:void(0)' onclick='window.prompt (\"Ctrl+C then Ctrl+V in your post\", \"[img]" + emoticon20url + "[/img]\");';>  <img src='" + emoticon20url + "'></a></td></tr>";