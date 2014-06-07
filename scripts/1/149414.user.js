// ==UserScript==
// @name        TinyPic No Captcha
// @namespace   z0fa.tinypic
// @include     http://tinypic.com/
// @include     http://plugin.tinypic.com/plugin/*
// @version     1.5
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle = function(css) 
{
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
    if (!head) {return}
    style.type = 'text/css';
    try {style.innerHTML = css} catch(x) {style.innerText = css}
    head.appendChild(style);
}

if(window.location.href == "http://tinypic.com/") location.replace('http://plugin.tinypic.com/plugin/index.php?popts=l,wide|t,both|c,forum|i,en|s,true');

GM_addStyle("body { text-align:center; margin:auto; background-image:url('https://si0.twimg.com/images/themes/theme1/bg.png'); background-repeat:no-repeat; background-color:#C0DEED; padding:50px; font-family:sans-serif; }");
GM_addStyle("#content { background:#FFFFFF; border-radius:5px; margin:3px; border: 1px solid #909090; }");
GM_addStyle("#header { border-radius:5px; margin:3px; border:1px solid #002090; }");
GM_addStyle("body.wide div#content { height: 350px; }");
GM_addStyle("body.wide #code-form input.input-text { width:445px; border:1px solid #909090; background:#FFFFFF; text-align:centeR; }");
GM_addStyle("body.wide form.search input[type='text'] { width:448px; border:1px solid #909090; background:#FFFFFF; }");
GM_addStyle("form.search #search-type-container ul { margin-bottom:3px; }");
GM_addStyle("body.wide form.search input[type='text'] { margin-bottom:3px; }");
GM_addStyle("form#uploadForm fieldset { background: none repeat scroll 0% 0% #FFFFFF; }");
GM_addStyle("body.wide form#uploadForm input.input-text { border:1px solid #909090; background:#FFFFFF; }");
GM_addStyle("form#uploadForm fieldset { border-bottom:0px; }");
GM_addStyle("#footer { border-top:0px; margin-bottom:-3px; }");

document.getElementById('direct-link').value = document.getElementById('direct-link').value.replace('[IMG]','').replace('[/IMG]','')