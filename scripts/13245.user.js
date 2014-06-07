// ==UserScript==
// @name          America2
// @namespace     MySpace.com/jonathan_blanco
// @description	  Aguilas del america
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==
// @credits       Brandon

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

//Set the default text color and put in the background
s = "body,#wrap,table,td,tr,span{color:yellow!important; background-color:blue!important;}\n";
s+= "div{background-color:transparent!important;}\n";

//Change the links colors
s+= "a{color:#fff!important; font-family:century gothic; font-variant:small-caps!important;}\n";

//mess around with the navigation bar
s+= "#topnav{background-color:transparent!important;}\n";
s+= "#topnav:hover{background-color:transparent;}\n";

//Replace the ad with my banner
s+= "#header{margin-left:-5px!important; background:blue url(http://i194.photobucket.com/albums/z215/webmaster09/ad.png)!important; display:block; width:800px; font-size:0px!important; height:150px!important;}\n";

//Hide things
s+= "frame,iframe,#SquareAd,.googleafc,#header iframe,#header frame,#UserHomeSwitch,#home_featured_comedy,#header a,#header form,#header embed,#header object,#header a img,#home_searchAddressBook,#home_infoBar{display:none!important;}\n";


//Move the mood status box and featured videos up
s+= "#home_coolNewVideos{display:none!important;}\n";

//Change the header and border colors
s+= ".section{border:3px groove yellow!important}\n";
s+= "h4,h5{color:blue!important; background-color:yellow!important; border-bottom:2px inset red}\n";
s+= ".cols tr td{border:1px groove red!important;}\n";
s+= ".cols tr th{color:blue!important; border:1px groove yellow!important}\n";
s+= "#home_infoBar span{color:yellow!important; border-right:3px groove; border-top:3px groove red; border-bottom:3px groove red}\n";



//Replace the link box with links to whatever you want, the hello text
document.getElementById('home_greybox').innerHTML = ' ';
html = document.body.innerHTML.replace(/Hello,/, "Hey Look! It's "); 
document.body.innerHTML = html;


GM_addStyle(s);


