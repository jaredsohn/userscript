// ==UserScript==
// @name           Kat.ph Remove Ads and Redirect.
// @version        1.5.6
// @author         Nitrus
// @namespace      http://userscripts.org/users/oskybb
// @description    Removes Ads, and add some fix.
// @grant          none
// @include        http://www.kat.ph/*
// @include        http://kat.ph/*
// @include        http://www.katmirror.com/*
// @include        http://katmirror.com/*
// @include        http://www.katmirror.co/*
// @include        http://katmirror.co/*
// @include        http://www.ka.tt/*
// @include        http://ka.tt/*
// @include        http://www.kickass.to/*
// @include        http://kickass.to/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=122438
// @icon           https://kat.ph/favicon.ico
// @updateURL      https://userscripts.org/scripts/source/167897.meta.js
// ==/UserScript==

/*THIS SCRIPT IS AN UPDATE and MODIFIED VERSION OF THIS: https://userscripts.org/scripts/show/122438 
  Created by: Prashanth Devaraj - https://userscripts.org/users/santaduda */

(function() {
	var $ajaxLinks = document.evaluate("//a[contains(@href, '/confirm/url/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	 
	for (var $i=0; $i < $ajaxLinks.snapshotLength; $i++) {	  
	  $ajaxLinks.snapshotItem($i).href = $ajaxLinks.snapshotItem($i).text; 
	  $ajaxLinks.snapshotItem($i).className = "";
	  $ajaxLinks.snapshotItem($i).target = "_blank";
	}
}) ();
    //Remove Feedback Button
{
    setInterval(function(){
	var ids = ['feedback'];
	
	for (var id in ids)
		document.getElementById(ids[id]).style.display = "none";}, 100);}


$(document).ready(function() {

    // Function to remove IdeaBox section.
    function removeIdeaBox(){ 

    //Remove the sidebar section completely
    $(".sidebarCell").remove();

    // You can hide individual section according to your preference.
    // Note above line has to be commented first if you are uncommenting below lines

    // Hide Advertising and Footer Animations sections
    //$(".advertising").remove();
    //$(".sliderbox").remove(); // Will add options latter to hide individual blog , news etc.

    }
    
    function removeAds(){

        //Remove the annoying flash animation that appears in the footer section
        $("#ad_footer").remove();

        //Remove the horizontal add that appears in torrent category section
        $('.advertising').remove();

        //Remove the add section with Download button in torrent detail page.
        $('#ad_details').remove();
    }

    function removeTagCloud()
    {
        // Move the tag cloud to the footer section
        //$('#tagcloud').insertBefore('.footer');
        
        //Remove tag cloud in home page. - Optimized for smaller screen
        $('.showmore').remove();
        $('#tagcloud').remove();
    }
    
    function modifyTableDesign()
    {
        // Adds rounded corners and shadows for data table.
        data_tables = $('table.data');
        data_tables.each(function() {
            //division = $(this).parent();
            $(this).css({
                "border-radius": "10px 10px 10px 10px",
                "box-shadow": "2px 2px 8px #888888",
                "padding": "10px",
                "margin":"10px 0px 20px 0px",
                "width":"auto"
            }); 
        });
    }

    function modifyTorrentDetailDesign()
    {
        // Add rounded corners and shadows for data in torrent detail page
        data_sections = $('div.data');
        data_sections.each(function(){
            $(this).children(":first").insertBefore($(this)); //Move section heading outside the rouded division
            $(this).css({
                "border-radius": "10px 10px 10px 10px",
                "box-shadow": "2px 2px 8px #888888",
                "padding": "10px 10px",
                "margin":"10px 0px 20px 0px",
                "width":"auto"
            }); 
        });
        
        //Rounded corner section with shadows for the torrent files table  
        $('.torrent_files').css({
            "border-radius": "10px 10px 10px 10px",
            "box-shadow": "2px 2px 8px #888888",
            "padding": "10px 10px",
            "margin":"10px 0px 20px 0px",
            "width":"auto"
        }); 

        //Adds a frame around movie cover image.
        $('.movieCover').each(function()
        {
            $(this).children(":first").css({
                "padding": "5px" , 
                "border": "solid 1px #EFEFEF"
            });
        });
        
        //Increase spacing between the movie cover and the text
        $('.dataList').css({
            "padding":"0 0 0 20px"
        });

        //Rounded corner section with shadows for all comments in the torrent detail page.
        comments = $('.comments');
        comments.each(function(){
            if($.trim($(this).html()).length) //Hack to hide empty top comments
            {
                if($(this).children(":first").is("h2"))
                {
                    $(this).children(":first").insertBefore($(this)); //Hack to move Top Comments heading outside the widget.
                }
                $(this).css({
                    "border-radius": "10px 10px 10px 10px",
                    "box-shadow": "2px 2px 8px #888888",
                    "padding": "10px 10px",
                    "margin":"10px 0px 20px 10px",
                    "width":"auto"
                });     
            }
        });
    }

    //Function to display images in lightbox and add lightbox trigger to cover image
    function enableLightbox()
    {
        // Import jquery for colorbox - Hack to attach jquery load event for importing colorbox js
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);

        // Actions to be performed after jQuery is loaded
        script.addEventListener('load', function(){ 
            jQuery = unsafeWindow['jQuery'];
            jQuery.noConflict();
            //Import colorbox css. To change lightbox css use replace example1 either example2 or example3 or example4 or example5
            jQuery('head').append('<link rel="stylesheet" href="http://jacklmoore.com/colorbox/example1/colorbox.css" type="text/css" />');
                    jQuery.getScript('http://jacklmoore.com/colorbox/colorbox/jquery.colorbox.js', function(data, textStatus){
                        jQuery("#desc img").each(function() {
                            jQuery(this).wrap("<a class='lightbox links' href='"+jQuery(this).attr('src')+"'></a>");
                        });
                        jQuery('.links').hide();
                        coverImage = jQuery("#desc img:first-child");
                        jQuery('#desc').prepend("<center><a class='lightbox' href='"+coverImage.attr('src')+"'><img src='"+coverImage.attr('src')+"' />'</a></center><br>");
                        jQuery('.lightbox').colorbox({rel:"slide",maxHeight:"800",maxWidth:600});
            });
            
        }, false);
       
    }

    //Removes the IdeaBox section - Optimized for smaller screen
    removeIdeaBox();

    //Removes ads in all the screens
    removeAds();

    //Removes the tag cloud that appears in home page. Comment the below line if you want to keep the tag cloud.
    removeTagCloud();

    modifyTableDesign();

    modifyTorrentDetailDesign();
    
    // Display images in torrent description section in lightbox
    enableLightbox();
});// End of ready function