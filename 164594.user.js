// ==UserScript==
// @name           tumblr copy tags
// @description    copy tags when you reblog
// @namespace      http://waltzy.tumblr.com
// @include        http://*.tumblr.com/*
// @version        0.1.2
// @date           2011-03-03
// @creator        waltzy
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

(function() {
   var isFF = (navigator.userAgent && navigator.userAgent.indexOf("Firefox") != -1);

   jQuery.noConflict();
   
   function LS_getValue(key,defVal) {
      var retval = window.localStorage.getItem(key);
      if (retval == undefined || retval == null || retval == "") {
         return defVal;
      }
      return retval;
   }
   
   function LS_setValue(key,val) {
      window.localStorage.setItem(key,val);
   }
   
   
   function tags_getValue() {
      var retval = window.localStorage.getItem("copyTagsOnReblog");
      if (retval == undefined || retval == null || retval == "")
         return new Array();
      else
         return retval.split(",");
   }
   
   function tags_setValue(ar) {
      window.localStorage.setItem('copyTagsOnReblog',ar.join(","));
   }
   
   function tags_clearValue() {
      window.localStorage.removeItem('copyTagsOnReblog');
   }
   

function clearTags() {
    jQuery(".tag_editor .tags .tag").remove();
}
function fillInTags() {
 var tags = tags_getValue();
	      if (tags.length > 0) {
	         var txt = "";
	        document.getElementsByClassName("post_tags")[0].value = tags.join(",");
	         for (i=0; i<tags.length; i++) {
	            if (tags[i] != null && tags[i] != '') {
	               txt += '<span class="tag">' + tags[i] + '</span>';
	            }
	         }
	         if (txt != '') {
	            jQuery(".tags .editor_wrapper").before(txt);
	         }
		 jQuery(".close").before("<a href='#' id='cleartaglink'>Clear Tags</a>");
	      }   
	      tags_clearValue();
}


   var trr_settings;

 
	jQuery('.editor').live('focus', function(e) {
fillInTags();}); 
jQuery('#post_form').live('click', function(e) {
fillInTags();}); 
jQuery("#cleartaglink").live('click', function(e) {
	e.preventDefault();
	clearTags();
});;




 
   jQuery('.reblog_button').live('click', function(e) {

		 var tags = new Array();
		jQuery(this).parents(".post_wrapper").find(".tags .tag").each( function(index) {
			if (jQuery(this).html != undefined)
				tags.push(jQuery(this).html().replace("#",""));
		});
		tags_setValue(tags);

   });
  
  
   
}());