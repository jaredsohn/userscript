// ==UserScript==
// @name          LUEbar
// @description   Makes the menubar follow you
// @namespace	http://links.endoftheinter.net/linkme.php?l=250599
// @include http://*endoftheinter.net/*
// @include https://*endoftheinter.net/*
// @exclude http://u.endoftheinter.net/u.php*
// @exclude https://u.endoftheinter.net/u.php*
// @exclude http://wiki.endoftheinter.net/*
// @exclude https://wiki.endoftheinter.net/*
// ==/UserScript==

// Version 1.7
// ~Kalphak

config = new Array();

// ========================
// CONFIG STUFF - EDIT THIS BIT

// Display home icon?
config['icon'] = true;

// If you want the home button on the left, enter 'left'. However, this will interfere with FOXlinks I believe.
config['iconposition'] = "right";

// Make userbar float?
config['userbar'] = true;

// Have a bottom border on the userbar?
config['border'] = true;

// Colour for the toggle highlight
// You can also use an HTML colour code (remember the #)
config['highlight'] = "skyblue";
// ========================




// DON'T EDIT BELOW THIS LINE








var ub = new Array();
var divs = document.getElementsByTagName('div');
for(var i=0; i<divs.length; i++){
if (divs[i].className == 'userbar'){
    ub.push(divs[i]);
}
}
var onoff = (ub.length > 0) ? true : false;
// br
var top = document.getElementsByTagName("h1")[0];
top.style.marginTop = ((config['userbar']) && (onoff)) ? '60px' : '37px';
// Bar
var mb = document.getElementsByTagName("div")[1];
mb.style.position = "absolute";
mb.style.top = '0px';
mb.style.left = '0px';
mb.style.position = 'fixed';
mb.style.width = '100%';
mb.style.paddingBottom = '3px';
mb.style.borderBottom = '1px black solid';
mb.style.display = 'block';
mb.setAttribute('id','usermenu');
// Bar 2
if (config['userbar']){
var ubar = ub[0];
if (onoff){
ubar.style.position = "absolute";
ubar.style.top = '37px';
ubar.style.left = '0px';
ubar.style.position = 'fixed';
ubar.style.width = '100%';
ubar.style.paddingBottom = '3px';
ubar.style.display = 'block';
ubar.setAttribute('id','userbar');
if (config['border'])
ubar.style.borderBottom = '1px black solid';
}
}
// Icon
if (config['icon']){
var mba = document.getElementsByTagName("small")[0];
var homed = document.createElement("div");
homed.innerHTML = '<div id="home"><a href="http://endoftheinter.net/main.php"><img src="http://i4.endoftheinter.net/i/n/bc8ec59b9a0e6b6f96df1bb30cf93941/home-icon.png" height="30" width="30"></a></div>';
mba.parentNode.insertBefore(homed, mba.nextSibling);
var hm = document.getElementById("home");
hm.style.position = "absolute";
hm.style.top = '1px';
if (config['iconposition'] == "right")
hm.style.right = '0px';
else
hm.style.left = '3px';
hm.style.position = 'fixed';
hm.style.padding = '3px';
}
if (onoff){
var sm = document.getElementsByTagName("small")[0];
var too = document.createElement("div");
too.innerHTML = '<div id="too"><a href="javascript:function shoide(id){ obj = document.getElementById(id); obj.style.display = (obj.style.display == \'none\') ? \'block\' : \'none\'; } shoide(\'usermenu\'); shoide(\'home\');  shoide(\'userbar\');">Hide/Unhide</a></div>';
sm.parentNode.insertBefore(too, sm.nextSibling);
var to = document.getElementById("too");
to.style.position = "absolute";
to.style.top = '42px';
to.style.right = '5px';
to.style.position = 'fixed';
to.style.background = config['highlight'];
}
// PM me with whatever