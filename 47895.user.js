// ==UserScript==
// @name           Atorian Plain Looking
// @namespace      http://userscripts.org/scripts/show/47895
// @description    Makes Atorian display a plain theme
// @version        Version 0.1.1f
// @include        http://www.atorian.com/*
// @include        http://atorian.com/*
// @exclude        http://www.atorian.com/community/*
// @exclude        http://atorian.com/community/*
// ==/UserScript==

var divList = new Array;
divList = ["divHeader", "divPSM"];

for (var i=0; i<divList.length; i++)
{
    var temp = document.getElementById(divList[i]);
    if (temp != null)
    {
        temp.parentNode.removeChild(temp);
    }
}

var css = new Array();
function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here
addStyle("a {color: #0000FF ! important;}");
addStyle("body {background: #EEEEEE ! important; color: #000000 ! important;}");
addStyle("h1 {background: #EEEEEE ! important; color: #000000 ! important;}");
addStyle("td {background:none ! important; background-image: none ! important; color:#000000 ! important;}");
addStyle("td #mainHeaderValue {color:#FF0000 ! important;}"); //stats
addStyle("td #menu a {color: #000033 ! important;}"); //left nav bar
addStyle("td #panelHighlightOne {background-color:#FFFFFF ! important; border-bottom: solid ! important; border-bottom-width: thin ! important;}");
addStyle("td #panelHighlightTwo {background-color:#FFFFFF ! important; border-bottom: solid ! important; border-bottom-width: thin ! important;}");
addStyle("td #planeText {background-color:#FFFFFF ! important;}"); // Mail, misspelled paneltext?
addStyle("td #menu #menuSub a {color: #0000FF ! important;}"); //left nav bar sub categories
addStyle("#loginForm {top: 170px;}");
addStyle("#newsMilitary {color:#FF0000 ! important;}");
addStyle("#newsPolitics {color:#FF0000 ! important;}");
addStyle("divHomepage {background: #EEEEEE ! important; color: #000000 ! important;}");
addStyle("#divHomepage #divComments {top: 50px;}");
addStyle("#divHomepage #divComments span {color: #000033 ! important;}");
addStyle("#divHomepage #divIntro {border-right:0px;}");
addStyle("#divNav {color: #000000; background-image:none;}");
addStyle("#panel {border-collapse: collapse;}");
addStyle("#panel a {color: #0000FF ! important;}"); //news links 
addStyle("#panelHeader {background-color: #EEEEEE ! important; color: #000000 ! important; text-decoration: underline;)");
addStyle("#panelInfoOne {background-color: #EEEEEE ! important; color: #000000 ! important; border-bottom: solid ! important; border-bottom-width: thin ! important;}");
addStyle("#panelInfoTwo {background-color: #CCCCCC ! important; color: #000000 ! important; border-bottom: solid ! important; border-bottom-width: thin ! important;}");
addStyle("#panelListOne {background-color: #CCCCCC ! important; color: #000000 ! important; border-bottom: solid ! important; border-bottom-width: thin ! important;}");
addStyle("#panelListTwo {background-color: #EEEEEE ! important; color: #000000 ! important; border-bottom: solid ! important; border-bottom-width: thin ! important;}");
addStyle("#panelText {background-color: #FFFFFF ! important; color:#000000 ! important;}");
addStyle(".attack {color: #FF0000 ! important;}");
addStyle(".deffend {color: #0000FF ! important;}");
addStyle(".textwhite {background: #EEEEEE ! important; color: #000000 ! important;}");
addStyle("a span.textwhite {background: #EEEEEE ! important; color: #0000FF ! important;}"); //Council update

// Writes CSS to the document
writeStyle(css);

//Quickly block the remaining background images
var image, blacklist = new Array(
"/media/in_game/template/header_top_left.jpg",
"/media/in_game/template/header_right.jpg",
"/media/in_game/template/menu_bottom.jpg"
);

for(var i=document.images.length-1; i>=0; i--) {
    image = document.images[i];
    for(var x=blacklist.length-1; x>=0; x--) {
        if(image.src.indexOf(blacklist[x])!=-1) image.parentNode.removeChild(image);
    }
}

//Automatically load when switching empires
if (document.body.textContent.match(/Click here to continue to play\./)) {
    window.location.pathname = 'summary.php';
}

//Remove unnecessary white space
document.body.innerHTML= document.body.innerHTML.replace(/(<\/span>(\.)?|<\/b>)<br>(\.)?(\s*)?<br>/ig,'$1<br>');  // the first . corrects a missformat in the comments
document.body.innerHTML= document.body.innerHTML.replace(/(<br>\s*<br>(?!Server|<a|<b>|<span|Moon|Opt)(\s*<br>(?!<b>))?)*/ig,'');
document.body.innerHTML= document.body.innerHTML.replace(/<br>(<br>)(Server|<span|<b>|Moon|Opt)/ig,'$1$2');
document.body.innerHTML= document.body.innerHTML.replace(/<br>(<p>)/ig,'$1'); // for building ships error messages
document.body.innerHTML= document.body.innerHTML.replace(/sessions.*|.*<br>(<html>)/ig,'$1'); //new player page, corrects inproper text rendering
