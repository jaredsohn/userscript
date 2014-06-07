// ==UserScript==
// @name        Return to Top
// @namespace   FB Return To Top
// @include     http://wwww.facebook.com*
// @include     https://wwww.facebook.com*
// @updateURL		http://userscripts.org/scripts/source/160737.meta.js
// @downloadURL		http://userscripts.org/scripts/source/160737.user.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     3.0.2
// ==/UserScript==

<body>
<a href='#' id='toTop'><img src='https://lh4.googleusercontent.com/-KtPSpIn4uls/UXskz9a18iI/AAAAAAAAAFs/p_LCVdY5WZE/s52/cats.png'> </img></a>
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js' type='text/javascript'/> 
<script type='text/javascript'>     
/*-----------------------      
* jQuery Plugin: Scroll to Top      
* by Craig Wilson, Ph.Creative (http://www.ph-creative.com)      
*       
* Copyright (c) 2009 Ph.Creative Ltd.      
* Description: Adds an unobtrusive &quot;Scroll to Top&quot; link to your page with smooth scrolling.      
* For usage instructions and version updates to go http://blog.ph-creative.com/post/jquery-plugin-scroll-to-top.aspx      
*       
* Version: 1.0, 12/03/2009      
-----------------------*/ 
$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr(&quot;href&quot;);if($(window).scrollTop()!=&quot;0&quot;){$(this).fadeIn(&quot;slow&quot;)}var   scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()==&quot;0&quot;){$(scrollDiv).fadeOut(&quot;slow&quot;)}else{$(scrollDiv).fadeIn(&quot;slow&quot;)}});$(this).click(function(){$(&quot;html,  body&quot;).animate({scrollTop:0},&quot;slow&quot;)})}}); 
&nbsp; $(function() {     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $(&quot;#toTop&quot;).scrollToTop();      
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; });      
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </script>
</body>