// ==UserScript==
// @name        aP# - Name color changer
// @author      YesIMaDesigner
// @description With this sctipt you can change your user name color on the forum. Only you can see this! 
// @include     http://www.asylum-project.eu/forum/*
// @include     http://www.asylum-project.eu/*
// @version     1.0
// @grant       none
// ==/UserScript==


for(var i=0;i<document.all.length;i++) {
    document.all[i].removeAttribute("title");
}
    



var url = "YOUR_PRIFLE_URL";    //Rename the YOUR_PRIFLE_URL to your profile url. 
                                //Example:  http://www.asylum-project.eu/forum/index.php?action=profile;u=53

var color = "FONT_COLOR";       //Rename the FONT_COLOR to your favourite color
                                //Example: #FF00D8 (pink color)
                                //HEXA color generator: http://hexcolorgenerator.com/

var yourname = "YOUR_NAME";     //Rename the YOUR_NAME to your username




var body = document.getElementsByTagName('body')[0].innerHTML;


//Rename the YOUR_NAME text to your username!
body = body.replace(/YOUR_NAME/g, "<span style=\"color: "+color+" !important;\">"+ yourname +"</span>")  

document.getElementsByTagName('body')[0].innerHTML = body;

function addGlobalStyle(css){

    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('[href="' + url + '"]{color: '+ color +' !important;}')
