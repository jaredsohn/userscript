// ==UserScript==
// @name         None
// @namespace     MySpace.com/jonathan_blanco
// @description	  NONe
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==
// @credits       All credit goes to Brandon/


if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

//Hide things
s+= "frame,iframe,#SquareAd,.googleafc,#header iframe,#header frame,#UserHomeSwitch,#home_featured_comedy,#header a,#header form,#header embed,#header object,#home_coolNewVideos,#abipromo, #home_greybox,#home_activities,#header a img{display:none!important;}\n";




GM_addStyle(s);