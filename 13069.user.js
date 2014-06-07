// ==UserScript==
// @name          7FvRed
// @namespace     MySpace.com/insanity model
// @description	  Gives you a shiny, gradient filled home page. :]
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==
// @credits       I got the idea for this from Herpe at joyboner, he takes the credit for the bottom part of the script/


if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

//Set the default text color and put in the background
s = "body,#wrap,table,td,tr,span{color:#640000!important; background:#000 url(http://i192.photobucket.com/albums/z56/SevenFaces666/Homepage/vRed.png) center center repeat-y!important;}\n";
s+= "div{background-color:transparent!important;}\n";

//Change the links colors
s+= "a{color:#640000!important; font-variant:small-caps!important;}\n";

//mess around with the navigation bar
s+= "#topnav{background:#000 url(http://i192.photobucket.com/albums/z56/SevenFaces666/Homepage/topnavbg-1.png) repeat-x; letter-spacing:-1px!important;}\n";
s+= "#topnav:hover{background:#000 url(http://i192.photobucket.com/albums/z56/SevenFaces666/Homepage/topnavhoverv2-1.png) center center repeat-x; height:13px;}\n";

//Replace the ad with my banner
s+= "#header{margin-left:-5px!important; background:#000 url(http://i192.photobucket.com/albums/z56/SevenFaces666/Homepage/vRedHeader.png)!important; display:block; width:800px; font-size:0px!important; height:150px!important;}\n";

//Hide things
s+= "frame,iframe,#SquareAd,.googleafc,#header iframe,#header frame,#UserHomeSwitch,#home_featured_comedy,#header a,#header form,#header embed,#header object,#header a img{display:none;}\n";

//Move the mood status box and featured videos up
s+= "#StatusBox{z-index:100; margin-top:-280px; margin-left:320px; position:absolute;}\n";
s+= "#home_coolNewVideos{z-index:100; position:absolute; margin-top:140px; margin-left:-4px; width:306px; height:135px!important; overflow:hidden;}\n";

//Change the header and border colors
s+= ".section{border:1px solid #640000!important}\n";
s+= "h4,h5{color:#640000!important; background-color:#000!important; border-bottom:1px solid #640000}\n";
s+= ".cols tr td{border:1px solid #640000!important;}\n";
s+= ".cols tr th{color:#000!important; border:0px!important}\n";
s+= "#home_infoBar span{color:#640000!important; border-right:3px double; border-top:3px double #222; border-bottom:3px double #111}\n";
s+= ".cols,#home_bulletins .cols, #home_shows .cols {border:3px solid #640000;}\n"; 

//Replace the link box with links to whatever you want, the hello text
document.getElementById('home_greybox').innerHTML = ' ';
html = document.body.innerHTML.replace(/Hello,/, "Woo! It's "); 
document.body.innerHTML = html;


GM_addStyle(s);


