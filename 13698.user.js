// ==UserScript==
// @name           Flickr - Stealth Mode
// @namespace      http://userscripts.org/users/36992/scripts
// @description    Reduces the size of fonts and links and uses opacity to dim objects so that co-workers nearby do not continue to recognize that you're on Flickr all the time.
// @author         Kwame Jeffers aka LordSnooze
// @version        0.45 : 16-May-2009 Updated @namespace
// @include        http://*.flickr.com/*
// @include        http://flickr.com/*
// @include        https://login.yahoo.com/config/login?.src=flickr*
// ==/UserScript==
/*

Credits
============
Included Lenny Domnitser's Flickr remove spaceball (Version 0.2) from UserScripts.org
============

About
============
This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here:
http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
============

Installation
-------------
First you need firefox...
http://mozilla.org/firefox
then you need to install GreaseMonkey...
http://greasemonkey.mozdev.org
============

History
-------------
0.45 : 16-May-2009 Updated @namespace
0.44 : 30-Aug-2008 Edited name to include " - " (space dash space)
0.44 : 04-Apr-2008 Added Include for Flickr login screen 
0.43 : 10-Dec-2007 Modified @namespace to use userscripts.org profile
0.42 : 11-Nov-2007 This was renamed from Flickr Obscure (Low-Profile)
0.41 : 01-Nov-2007 Initial release
============

Known Issues
-------------
(none)
============

Unnecessary Comments
-------------
Come to think of it, maybe I should just put an jpg of the Microsoft Word toolbar at the top of every Flickr page and switch to full screen. haha. But I guess it would have to be in a frameset so it wouldn't scroll up. the problem is...I hate framesets! Grr!
============
*/

function s(myStyle) {
    var head;
    var style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = myStyle;
    head.appendChild(style);
}
s('BODY          {font-size:9pt;color:#C0C0C0;}');
s('SELECT        {text-decoration:none;color:#C0C0C0;}');
s('INPUT         {-moz-opacity:0.4;}');
s('a:VISITED     {text-decoration:underline;color:#C0C0C0;font:normal 9pt Arial,sans-serif;}');
s('a:VISITED img {-moz-opacity:0.4;}');
s('a:LINK        {text-decoration:underline;color:#AEAEB6;font:normal 9pt Arial,sans-serif;}');
s('a:LINK    img {-moz-opacity:0.4;}');
s('a:HOVER       {background-color: transparent;text-decoration:none;color:#C0C0C0;font:normal 9pt Arial,sans-serif;}');
s('a:HOVER   img {-moz-opacity:1.0;}');
s('a:ACTIVE      {text-decoration:underline;color:#C0C0C0;font:normal 9pt Arial,sans-serif;}');
s('a:ACTIVE  img {-moz-opacity:0.4;}');
s('a.Plain       {font-size:9pt;color:#C0C0C0}');
s('a:Link.Warning{font-size:9pt;color:#FEB8B8}');

//Quit Group text
s('a:HOVER.Warning   {background-color: transparent;text-decoration:none;color:#C0C0C0;font:normal 9pt Arial,sans-serif;}');

s('img                         {-moz-opacity:0.4;}');
s('h1                          {-moz-opacity:0.4;font-size:9pt}');
s('h2                          {font-size:9pt;-moz-opacity:0.4;}');//can't get a handle on color
s('h3                          {-moz-opacity:0.4;font-size:9pt}');
s('h4                          {font-size:9pt;color:#C0C0C0}');
s('.New                        {color:#C0C0C0}');

s('.Plain                      {font-size:9pt;color:#C0C0C0}');//-moz-opacity:0.4; //covers too much, problem maker

s('.FlickrLogo                 {-moz-opacity:0.02;}');//hehe...we're really hidding this. I call it, Slickr!

//Class is not labelled on every buddy icon ....grr
s('.xBuddyIcon                 {-moz-opacity:0.1;}');//Depends on the darkness/lightness of your buddyicon

s('td#Unread                   {background-color: transparent}');

s('div.Editorial               {-moz-opacity:0;}'); //Hiding the "Groups we've noticed" - Looks like ads


//Organize
s('div#tabl_empty_msg_div1     {font-size:14pt;-moz-opacity:0.4}');
s('div#tabl_empty_msg_div2     {font-size:14pt;-moz-opacity:0.4}');
s('.tabl_tab_active            {-moz-opacity:0.4;}');
s('.tabl_tab                   {-moz-opacity:0.4;}');
s('.group_name                 {-moz-opacity:0.4;}');

//You can set this to 0.0 and just scroll in phototreams if you want.
s('.reflect        {-moz-opacity:0.2;}');//The photo being viewed
s('.reflect:HOVER  {-moz-opacity:1.0;}');
s('p:HOVER img     {-moz-opacity:1.0;}');

s('.exploreMapForm {-moz-opacity:0.2;}');

//We're just going to set the color and font here...not the opacity.
s('td              {font-size:9pt;color:#C0C0C0}');
s('p               {font-size:9pt;color:#C0C0C0}');

s('th              {-moz-opacity:0.2;}'); //use on your account

s('p.confirm       {-moz-opacity:0.2;}');
s('p.Stats         {-moz-opacity:0.2;}');

//Current page - navagation text
s('.In             {-moz-opacity:.3}');
s('.here           {-moz-opacity:.3}');
s('.no_menu_li     {font-size:10pt;color:#C0C0C0;-moz-opacity:.40}');
s('.menu_li        {font-size:10pt;color:#C0C0C0;-moz-opacity:.40}');
s('.Found          {-moz-opacity:.3}');
s('.this-page      {-moz-opacity:.3}');
s('.who            {font-size:9pt;color:#C0C0C0}');
s('td.BigNumber    {font-size:12pt;color:#C0C0C0}');



var spaceball = document.evaluate('//img[contains(@src, "/images/spaceball.gif")]', document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(spaceball) {
  spaceball.style.visibility = 'hidden';
}
