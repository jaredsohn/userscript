// ==UserScript==
// @name           Craigslist Dropdown
// @namespace      tekdemo
// @description    A dropdown preview page for craigslist 
// @url            http://userscripts.org/scripts/show/66348
// @update         http://userscripts.org/scripts/source/66348.user.js
// @include        http://*.craigslist.org/*
// @include        http://*.craigslist.ca/*
// @exclude        http://*.craigslist.org/*.html
// @exclude        http://*.craigslist.ca/*.html
// @version        1.4.1
// ==/UserScript==

(function(){
scrolling=GM_getValue('scrolling',true)
hijack=GM_getValue('hijack',true)
underline=GM_getValue('underline',true)

if(scrolling){
	GM_registerMenuCommand('Disable scrolling on click',function(){GM_setValue('scrolling',false)})
	}
else{
	GM_registerMenuCommand('Enable scrolling on click',function(){GM_setValue('scrolling',true)})
	}
if(hijack){
	GM_registerMenuCommand('Disable link hijacking',function(){GM_setValue('hijack',false)})
	}
else{
	GM_registerMenuCommand('Enable link hijacking',function(){GM_setValue('hijack',true)})
	}
if(underline){
	GM_registerMenuCommand('Remove link underline',function(){GM_setValue('underline',false)})
	}
else{
	GM_registerMenuCommand('Add  link underline',function(){GM_setValue('underline',true)})
	}
//import parent jquery
$=unsafeWindow.$  


$("<style>					\
a.preview{					\
     color:grey					\
     }						\
div.preview{					\
     margin:2em;				\
     margin-top:0px;				\
     border:1px solid black;			\
     border-top:0px;				\
     -moz-border-radius-bottomright:1em;	\
     -moz-border-radius-bottomleft:1em;		\
     padding:1em;				\
     padding-top:0em;				\
     overflow:auto;				\
     max-height:30em;				\
     }						\
     span.dropdown{margin-right:1em;}	\
</style>").appendTo("head")



slideSpeed=750
scrollSpeed=600
//create a div for loading things into later
$("body>blockquote p>a").parent().append("<div class=preview></div>").find('div').hide()
//Select elements to use as a dropdown selector

if(!hijack){
	$("body>blockquote p>a:first-child").each(function(){
		$(this).clone().html('[ > ]')
			.css('float','left').css('margin-right','.5em')
			.insertBefore($(this))
		})
	}
$("body>blockquote p>a:first-child").live('click',function(e){
     div=$(this).addClass('preview').siblings('div.preview')
     if(div.css('display')=='none'){
	  if(div.html()==""){
	       div.load(this.href+' a[href^=mailto:],#userbody',function(e){
		    $(this).slideDown(slideSpeed)
	       })
	  }else{	div.slideDown(slideSpeed)}
	  scrolling && $("body").animate({scrollTop:$(this).offset().top},scrollSpeed, 'swing')
     }else { 
	  div.slideUp(slideSpeed)
	  $(this).removeClass('preview')    
	  }
     return false
     })
    underline || $("body>blockquote p>a").css('text-decoration','none')
})()

