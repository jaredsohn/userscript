// ==UserScript==
// @name           kat.ph ads remover
// @version        1.7
// @author         Prashanth Devaraj
// @namespace      http://userscripts.org/users/santaduda
// @description    Removes the ads section and the flash animation advertisement in the footer.
// @include        http://www.kat.ph/*
// @include        http://kat.ph/*
// @include        http://kickass.to/*
// @include        http://www.kickass.to/*
// @resource       customCSS http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @require        http://code.jquery.com/jquery-1.9.1.js
// @require        http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @require        http://sizzlemctwizzle.com/updater.php?id=122438
// ==/UserScript==

$(document).ready(function() {
    //Include the Jquery UI Css for tabs.
    var newCSS = GM_getResourceText ("customCSS");
    GM_addStyle (newCSS);
    
    //CSS to modify the default Jquery UI tabs style.
    GM_addStyle(".ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default { background : -moz-linear-gradient(center top , #E1CF78 0%, #CFBC63 100%) repeat scroll 0 0 transparent; } .ui-tabs .ui-tabs-nav li.ui-tabs-active{ background: white} .ui-widget-content a{ text-shadow:none}");
    
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
        
        // Wait for 2 seconds and remove the adds that is appended to the document with ajax request.
        setTimeout(function() {
          $('div[id^="MarketGidComposite"]').parent().remove();
          $('div[id^="AdskeeperComposite"]').parent().remove();
        }, 2000 );
        
        //Remove the report a bug
        $("a#feedback").remove();
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
                //"border-radius": "10px 10px 10px 10px",
                //"box-shadow": "2px 2px 8px #888888",
                //"padding": "10px",
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
            jQuery('head').append('<link rel="stylesheet" href="http://www.jacklmoore.com/colorbox/example1/colorbox.css" type="text/css" />');
                    jQuery.getScript('http://www.jacklmoore.com/colorbox/jquery.colorbox.js', function(data, textStatus){
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
    
    //Function to construct tabs for the tables in home page.
    function createHomePageTabs(){
        var url = window.location.pathname.split("/")[1];
        if( url == '' ) {
          //HTML to construct tabs for home page with the help of jquery ui tabs.
          $(".mainpart").prepend('<div id="tabs"><ul><li><a id="movies-tab-link" href="#movies-tab">Movie torrents</a></li><li><a id="tvshow-tab-link" href="#tvshow-tab">TV show torrents</a></li><li><a id="music-tab-link" href="#music-tab">Music torrents</a></li><li><a id="games-tab-link" href="#games-tab">Games torrents</a></li><li><a id="applications-tab-link" href="#applications-tab">Applications torrents</a></li><li><a id="anime-tab-link" href="#anime-tab">Anime torrents</a></li><li><a id="books-tab-link" href="#books-tab">Books torrents</a></li></ul><div id="movies-tab"><h3><a href="/movies">All Movie Torrents</a></h3></div><div id="tvshow-tab"><h3><a href="/tv">All TV Show Torrents</a></h3></div><div id="music-tab"><h3><a href="/music">All Music Torrents</a></h3></div><div id="games-tab"><h3><a href="/games">All Game Torrents</a></h3></div><div id="applications-tab"><h3><a href="/applications">All Application Torrents</a></h3></div><div id="anime-tab"><h3><a href="/anime">All Anime Torrents</a></h3></div><div id="books-tab"><h3><a href="/books">All TV Book Torrents</a></h3></div></div>');
          $( "#tabs" ).tabs();
					
					//Move all the Movies, Tv shows etc torrents table to their respective tabs.
          $("table.data:eq(0)").appendTo($("#movies-tab"));
          $("table.data:eq(1)").appendTo($("#tvshow-tab"));
          $("table.data:eq(2)").appendTo($("#music-tab"));
          $("table.data:eq(3)").appendTo($("#games-tab"));
          $("table.data:eq(4)").appendTo($("#applications-tab"));
          $("table.data:eq(5)").appendTo($("#anime-tab"));
          $("table.data:eq(6)").appendTo($("#books-tab"));

					//Move the RSS feed links for Movies, Tvs hows etc next to the Torrent Name table header.
          $("a.rsssign:eq(0)").appendTo($("#movies-tab table tbody tr.firstr th:first"));
          $("a.rsssign:eq(1)").appendTo($("#tvshow-tab table tbody tr.firstr th:first"));
          $("a.rsssign:eq(2)").appendTo($("#music-tab table tbody tr.firstr th:first"));
          $("a.rsssign:eq(3)").appendTo($("#games-tab table tbody tr.firstr th:first"));
          $("a.rsssign:eq(4)").appendTo($("#applications-tab table tbody tr.firstr th:first"));
          $("a.rsssign:eq(5)").appendTo($("#anime-tab table tbody tr.firstr th:first"));
          $("a.rsssign:eq(6)").appendTo($("#books-tab table tbody tr.firstr th:first"));
          $("a.rsssign").css({"margin-left":"10px"});

					//Modify the style of tabs.
          $(".ui-tabs").css({"padding":"0px", "box-shadow":"2px 2px 8px #888888"});
          $(".ui-widget-header").css({"background":"#594C2D"});
          $(".ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br").css({"border-bottom-right-radius":"0px","border-bottom-left-radius":"0px"});
          
          //Remove the default Movies Torrents, TV shows Torrents etc links, as we have already included this in the Tabs.
          $("table.doublecelltable").remove();
        }
    }

    createHomePageTabs();

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


