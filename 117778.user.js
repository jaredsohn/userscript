// ==UserScript==
// @name        Dark Theme for Grove.io
// @namespace   grove
// @description Customizations for grove.io
// @version     0.7
// @include     https://grove.io/app/Interworks-Tableau/Interworks-Tableau
// @include     http://grove.io/app/Interworks-Tableau/Interworks-Tableau
// @icon        http://s3.amazonaws.com/uso_ss/icon/116931/large.png
// ==/UserScript==

//User lists and names
GM_addStyle(".user a { color: #0f0; }  .users-column { border-left-color:#333; } #users a { color:#090; font-weight:bold; }");

//Input form
GM_addStyle("#js-message-form { background-color:#111; border-top-color:#333; } #js-message-form input[type=\"text\"] { color:#0f0; } input[type=\"text\"], input[type=\"password\"], input[type=\"email\"], textarea, select { background-color:#111; border-color:#090; } input[type=\"text\"]:focus, input[type=\"password\"]:focus, input[type=\"email\"]:focus, textarea:focus { border-color:#0f0; }");
GM_addStyle(".button:hover, button:hover, input[type=\"submit\"]:hover, input[type=\"reset\"]:hover, input[type=\"button\"]:hover { border-color:#333; border-top-color:#666; border-left-color:#666; color:#0f0; }");
GM_addStyle(".button, button, input[type=\"submit\"], input[type=\"reset\"], input[type=\"button\"] { border-color:#222; border-top-color:#444; border-left-color:#444; text-shadow: 0 1px rgba(0, 144, 0, .75); color:#0b0; }");

//Chat area
GM_addStyle("#chat-page { background-color: #111; color: #0f0; } .chat .datetime span { color:#0f0; background-color:#333; } .chat .datetime { border-bottom-color: #333; } .chat .user a { color:#090; }");

//Channel bar
GM_addStyle("#js-channel-info .name { background:url('https://www.interworks.com/favicon.ico') 4px 0px no-repeat; background-size:26px 26px; padding-left:40px; color: #0f0; }");
GM_addStyle("#js-channel-info .name strong { color: #0f0; }");
GM_addStyle("::-webkit-scrollbar-thumb { border-color: #666; background-color:#333; }");
GM_addStyle("#js-channel-info, #users-header { background-color: #555; background-image: -webkit-gradient(linear, left top, left bottom, from(#555), to(#333)); background-image: -webkit-linear-gradient(top, #555, #333); background-image: -moz-linear-gradient(top, #555, #333); background-image: -ms-linear-gradient(top, #555, #333); background-image: -o-linear-gradient(top, #555, #333); background-image: linear-gradient(top, #555, #333); filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#555555', EndColorStr='#333333'); text-shadow: 0px 1px 1px rgba(0, 144, 0, 1); -moz-text-shadow: 0px 1px 1px rgba(0,144,0,1); -webkit-text-shadow: 0px 1px 1px rgba(0,144,0,1); border-top-color:#666; border-bottom-color:#333;}");
GM_addStyle("#users-header h2 { color:#0f0; }");