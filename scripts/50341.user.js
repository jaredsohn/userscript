// ==UserScript==
// @name           Google Sites - Pale Blue Background
// @description    Google Search Results with Pale-Blue background and Mediumblue links. Also applies to other Google applications & services like google images, news, video, groups & more.
// @include       http://*.google.com/*
// ==/UserScript==


{

a:link { color: mediumblue !important }

a:visited { color: purple !important } 

a:hover, a:active { color: #8F006A!important }


font { color: black !important } /* text */

body 

,div.div-footer 

,div#searchagain 

,div#videoheader  

,div#guser

{background-color:#A1C5EF!important; } /* Bright-Blue Background */


div#ssb, div#bsf, div.gbh 

{background-color:#519AEA!important; }



div.med#tbd{ background-color: #83C5EA !important }



div.f { color: maroon  !important } /* dates of forum posts */

u { color:maroon !important } /* google bar - 'more' & stumble upon topics*/



a {color: mediumblue !important } /* for google rebar script */

  

div#prs { background-color: #F7E413!important } /* Show options in yellow */



span.f { color: maroon  !important }  /* show options - dates */



span.wct { color: #CF4D33!important }  /* search wiki comments */

span.wcu { color: #CF4D33!important }  /* search wiki comment - date */

a.wcz.fl{ color:  #CF3333 !important }  /* number of comments*/



span.source { color: maroon  !important }  /* google News - sources */

font.l { color: maroon  !important }  /* google News - sources */

span.relatedBlogTitle { color: maroon  !important }  /* google blogsearch */

span.rl-age { color: maroon  !important }  /* google video - video age*/


}