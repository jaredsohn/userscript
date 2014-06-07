// ==UserScript==
// @name           fbbookmark
// @namespace      david
// @include        http://www.facebook.com/*
// ==/UserScript==


function menu(prev,id,url,title)
{
navbar = document.getElementById(prev);
if (navbar) {
    newElement = document.createElement('li');
    newElement.className = 'fb_menu';
    newElement.id = id;
    newElement.innerHTML = '<div class="fb_menu_title"><a target="float_iframe" onclick="document.getElementById(\'iframe\').style.display = \'inline\';document.getElementById(\'content\').style.display = \'none\'; document.title = \'' + title + ' - Facebook\';document.getElementById(\'fb_iframe_close\').style.display = \'inline\';" href="' + url + '">' + title + '</a></div>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}
}

content = document.getElementById('content');
if (content) {
    var iheight = document.body.clientHeight-54
    newElement = document.createElement('div');
    newElement.style.width = '100%';
    newElement.id = 'iframe';
    newElement.innerHTML = '<div style="position: absolute; left:20px; top: -15px;"><a href="" onclick="javascript:document.getElementById(\'iframe\').style.display = \'none\';document.getElementById(\'content\').style.display = \'inline\';document.title =\'Facebook\'; document.getElementById(\'fb_iframe_close\').style.display = \'none\'; return false;">Close</a></div><iframe id="float_iframe" name="float_iframe" style="width: 99.7%; height: ' + iheight + 'px;"></iframe>';
    content.parentNode.insertBefore(newElement, content);
}

// Each one of these lines creates a new album
// The first variable is the ID of the buton before it, it is fb_menu_inbox for the first one
// The second variable is the ID of the new buton
// The third variable is the url of the link
// The forth variable is the label

menu('fb_menu_inbox','fb_menu_hulu','http://www.hulu.com','Hulu');
menu('fb_menu_hulu','fb_menu_vimeo','http://www.vimeo.com','Vimeo');
menu('fb_menu_vimeo','fb_menu_youtube','http://www.youtube.com','Youtube');

// Show Button
navbar = document.getElementById('fb_menu_settings');
if (navbar) {
    newElement = document.createElement('li');
    newElement.className = 'fb_menu';
    newElement.id = 'fb_iframe_show';
    newElement.style.display = 'none';
    newElement.innerHTML = '<div class="fb_menu_title"><a target="float_iframe" onclick="document.getElementById(\'fb_iframe_close\').style.display = \'inline\'; document.getElementById(\'iframe\').style.display = \'inline\';document.getElementById(\'content\').style.display = \'none\'; document.getElementById(\'fb_iframe_show\').style.display = \'none\'; return false;" href="">Show</a></div>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}

// Hide Button
navbar = document.getElementById('fb_menu_settings');
if (navbar) {
    newElement = document.createElement('li');
    newElement.className = 'fb_menu';
    newElement.id = 'fb_iframe_close';
    newElement.style.display = 'none';
    newElement.innerHTML = '<div class="fb_menu_title"><a target="float_iframe" onclick="document.getElementById(\'fb_iframe_close\').style.display = \'none\';document.getElementById(\'iframe\').style.display = \'none\'; document.getElementById(\'content\').style.display = \'inline\'; document.getElementById(\'fb_iframe_show\').style.display = \'inline\'; return false;" href="">Hide</a></div>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#iframe {' +
'  margin-top: 29px;' +
'  position: absolute;' +
'  z-index: 10;' +
'  display: none;' +
'}' +
'#fb_menu_account, #fb_menu_home {' +
'  display: none !important;' +
'}'
);