// ==UserScript==
// @name        FimFiction - Front Page Redesigned (companion script)
// @namespace   cic
// @description Companion script for the Stylish CSS of the same name, found at http://userstyles.org/styles/86309/fimfiction-front-page-redesigned-luna-version
// @include     http://www.fimfiction.net/
// @include     http://poni.0au.de/
// @grant       GM_log
// @version     1.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
// Credit: http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
 
// the guts of this userscript
function main() {

    $(document).ready(function() {
        
        // Warn the user if they don't have the CSS active
        // The message is simply hidden by the CSS
        
        $('body').append('<div id="css_warning" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0,0,0,0.9); text-align: center; vertical-align: center;"><div style="display: inline-block; box-sizing: border-box; width: 400px; height: 300px; border: 5px solid red; background-color: black; color: white; padding: 50px 75px; margin: 100px; font-weight: bold; text-align: left;"><h2 style="margin-bottom: 25px;">Warning: No Stylesheet</h2><p>If you can see this, the required stylesheet has not been applied.</p><ul style="margin-top: 25px;"><li>Install <a href="http://userstyles.org/help/stylish">Stylish</a></li><li>Apply <a href="http://userstyles.org/styles/86309/fimfiction-front-page-redesigned-luna-version">this user style</a>.</li></div></div>');
        
        var selected_featured_story = 0;
        function select_featured_story(i)
        {
            if(i==selected_featured_story)
            {
                if(i==2) { $("#featured_story_2").removeClass("expanded_description"); }
                else if(i==3) { $("#featured_story_3").removeClass("expanded_description"); }
                else if(i==4) { $("#featured_story_4").removeClass("expanded_description"); }
                else if(i==5) { $("#featured_story_5").removeClass("expanded_description"); }
                else if(i==6) { $("#featured_story_6").removeClass("expanded_description"); }
                else if(i==7) { $("#featured_story_7").removeClass("expanded_description"); }
                else if(i==8) { $("#featured_story_8").removeClass("expanded_description"); }
                else if(i==9) { $("#featured_story_9").removeClass("expanded_description"); }
                else if(i==10) { $("#featured_story_10").removeClass("expanded_description"); }
                
                selected_featured_story = 0; 
            } else
            {                
                if(i==2) { $("#featured_story_2").addClass("expanded_description"); }
                else { $("#featured_story_2").removeClass("expanded_description");  }
                if(i==3) { $("#featured_story_3").addClass("expanded_description"); }
                else { $("#featured_story_3").removeClass("expanded_description"); }
                if(i==4) { $("#featured_story_4").addClass("expanded_description"); }
                else { $("#featured_story_4").removeClass("expanded_description"); }
                if(i==5) { $("#featured_story_5").addClass("expanded_description"); }
                else { $("#featured_story_5").removeClass("expanded_description"); }
                if(i==6) { $("#featured_story_6").addClass("expanded_description"); }
                else { $("#featured_story_6").removeClass("expanded_description"); }
                if(i==7) { $("#featured_story_7").addClass("expanded_description"); }
                else { $("#featured_story_7").removeClass("expanded_description"); }
                if(i==8) { $("#featured_story_8").addClass("expanded_description"); }
                else { $("#featured_story_8").removeClass("expanded_description"); }
                if(i==9) { $("#featured_story_9").addClass("expanded_description"); }
                else { $("#featured_story_9").removeClass("expanded_description"); }
                if(i==10) { $("#featured_story_10").addClass("expanded_description"); }
                else { $("#featured_story_10").removeClass("expanded_description"); }
                
                selected_featured_story = i; 
            }
        }
        
        function featured_stories_add_handlers()
        {
            $('#featured_story_2 .story_image').click( function() { select_featured_story(2); } );
            $('#featured_story_3 .story_image').click( function() { select_featured_story(3); } );
            $('#featured_story_4 .story_image').click( function() { select_featured_story(4); } );
            $('#featured_story_5 .story_image').click( function() { select_featured_story(5); } );
            $('#featured_story_6 .story_image').click( function() { select_featured_story(6); } );
            $('#featured_story_7 .story_image').click( function() { select_featured_story(7); } );
            $('#featured_story_8 .story_image').click( function() { select_featured_story(8); } );
            $('#featured_story_9 .story_image').click( function() { select_featured_story(9); } );
            $('#featured_story_10 .story_image').click( function() { select_featured_story(10); } );
        }
        
        function featured_stories_add_expandable()
        {
            $('#featured_story_2 .story_image').addClass("expandable");
            $('#featured_story_3 .story_image').addClass("expandable");
            $('#featured_story_4 .story_image').addClass("expandable");
            $('#featured_story_5 .story_image').addClass("expandable");
            $('#featured_story_6 .story_image').addClass("expandable");
            $('#featured_story_7 .story_image').addClass("expandable");
            $('#featured_story_8 .story_image').addClass("expandable");
            $('#featured_story_9 .story_image').addClass("expandable");
            $('#featured_story_10 .story_image').addClass("expandable");
        }
    
        $('#featured_story_1').wrap("<div id=featured_header />");
        
        $('.front_page_right_column>div:nth-child(2)').appendTo('#featured_header').wrap('<div id=recent_news class=list_boxes />');
        
        $('#recent_news .styled_button').remove();
        
        $('.featured_box .right').wrap('<div id=paging_featured_wrapper />');
        
        $('#popular_stories').appendTo('.featured_box').wrap('<div id=paging_popular_wrapper />');
        
        $('.featured_box').addClass('paging_pos_center');
        
        $('#latest_stories').appendTo('.inner_padding').wrap('<div id=paging_latest_wrapper class=paging_pos_left/>');
        
        $('#new_stories').appendTo('.inner_padding').wrap('<div id=paging_new_wrapper class=paging_pos_right/>');
        
        $('<div class="paging_buttons paging_buttons_top" />').appendTo('.user_toolbar .inner');
        $('<div class="paging_buttons paging_buttons_bottom" />').appendTo('#popular_stories');
        $('<div class="paging_buttons paging_buttons_bottom" />').appendTo('#latest_stories');
        $('<div class="paging_buttons paging_buttons_bottom" />').appendTo('#new_stories');
        $('<a class="button page_left">◀</a>').appendTo('.paging_buttons');
        $('<a class="button paging_latest_button">Latest</a>').appendTo('.paging_buttons');
        $('<a class="button paging_featured_button paging_current">Featured</a>').appendTo('.paging_buttons');
        $('<a class="button paging_new_button">New</a>').appendTo('.paging_buttons');
        $('<a class="button page_right">▶</a>').appendTo('.paging_buttons');
        
        var paging_latest_firsttime = 1;
        var paging_new_firsttime = 1;
        
        var paging_page = 0;
        function paging_update() {
            if(paging_page == -1) {
                
                paging_load_latest();
            }
            if(paging_page == 0) {
                
                paging_load_featured();
            }
            if(paging_page == 1) {
                
                paging_load_new();
            }
        }
        
        $('.page_left').click(function() {
            if(paging_page > -1) {
                paging_page = paging_page - 1;
            } else {
                paging_page = 1;
            }
            paging_update();
        });
        $('.page_right').click(function() {
            if(paging_page < 1) {
                paging_page = paging_page + 1;
            } else {
                paging_page = -1;
            }
            paging_update();
        });
        $('.paging_latest_button').click(function() {
            paging_page = -1;
            paging_update();
        });
        $('.paging_featured_button').click(function() {
            paging_page = 0;
            paging_update();
        });
        $('.paging_new_button').click(function() {
            paging_page = 1;
            paging_update();
        });
        
        $('.paging_buttons_bottom').click(function() {
            $("html, body").animate({ scrollTop: 0 }, 1000);
        });
        
        function paging_load_latest()
        {
            function parse_thumbnails() {
                $("#latest_stories .story_image, #latest_stories .story_thumbnail").each(function(i, elem) {
                    var img = $(elem);
                    img.attr("src", img.attr("src").replace(/_t\./, '_r.'));
                    
                    img.prependTo(img.parent().children(".short_description"));
                });
            }
            
            $('.paging_latest_button').addClass('paging_loading');
            $('#paging_latest_wrapper').addClass('paging_loading');
            
            $('#latest_stories .list').load(window.location.pathname + " #latest_stories .list", function(){
                
                $(this).children(':first').unwrap();
                
                parse_thumbnails();

                $('.paging_latest_button').removeClass('paging_loading');
                $('#paging_latest_wrapper').removeClass('paging_loading');
            });
            
            if (paging_latest_firsttime) {
                parse_thumbnails();
                paging_latest_firsttime = 0;
            }
            
            $('#paging_latest_wrapper').removeClass('paging_pos_left_left');
            $('#paging_latest_wrapper').removeClass('paging_pos_left');
            $('#paging_latest_wrapper').addClass('paging_pos_center');
            $('#paging_latest_wrapper').removeClass('paging_pos_right');
            $('#paging_latest_wrapper').removeClass('paging_pos_right_right');
            
            $('.featured_box').removeClass('paging_pos_left_left');
            $('.featured_box').removeClass('paging_pos_left');
            $('.featured_box').removeClass('paging_pos_center');
            $('.featured_box').addClass('paging_pos_right');
            $('.featured_box').removeClass('paging_pos_right_right');
            
            $('#paging_new_wrapper').removeClass('paging_pos_left_left');
            $('#paging_new_wrapper').removeClass('paging_pos_left');
            $('#paging_new_wrapper').removeClass('paging_pos_center');
            $('#paging_new_wrapper').removeClass('paging_pos_right');
            $('#paging_new_wrapper').addClass('paging_pos_right_right');
            
            $('.paging_latest_button').addClass('paging_current');
            $('.paging_featured_button').removeClass('paging_current');
            $('.paging_new_button').removeClass('paging_current');
        }
        
        function paging_load_featured()
        {
            function parse_thumbnails()
            {
                $("#popular_stories .story_image, #popular_stories .story_thumbnail").each(function(i, elem) {
                    var img = $(elem);
                    var wrapper = $("<div />").addClass("thumb_wrapper");
                    var div = $("<div />").css({
                        backgroundImage: "url(" + img.attr("src").replace(/_t\./, '_r.') + ")"
                    }).addClass("div_thumbnail");
                    div.appendTo(wrapper);
                    img.replaceWith(wrapper);
                });
            }
            
            $('.paging_featured_button').addClass('paging_loading');
            $('#paging_featured_wrapper').addClass('paging_loading');
            $('#paging_popular_wrapper').addClass('paging_loading');
            
            
            $.get(window.location.pathname, function(data) {
                $('.featured_box .right').replaceWith($(data).find('.featured_box .right'));
                
                $('#featured_story_1').wrap("<div id=featured_header />");
                $('<div id=recent_news class=list_boxes><div class=content_box><h1><a href="/news">Recent News</a></h1><div class=main><ul class=list></ul></div></div></div>').appendTo('#featured_header');
                
                $('#recent_news .list').replaceWith($(data).find('.front_page_right_column .content_box:nth-child(2) .list'));
                $('#popular_stories .list').replaceWith($(data).find('#popular_stories .list'));
                
                parse_thumbnails();
                
                selected_featured_story = 0;
                
                featured_stories_add_handlers();
                featured_stories_add_expandable();
                
                $('.paging_featured_button').removeClass('paging_loading');
                $('#paging_featured_wrapper').removeClass('paging_loading');
                $('#paging_popular_wrapper').removeClass('paging_loading');
            });
            
            $('#paging_latest_wrapper').removeClass('paging_pos_left_left');
            $('#paging_latest_wrapper').addClass('paging_pos_left');
            $('#paging_latest_wrapper').removeClass('paging_pos_center');
            $('#paging_latest_wrapper').removeClass('paging_pos_right');
            $('#paging_latest_wrapper').removeClass('paging_pos_right_right');
            
            $('.featured_box').removeClass('paging_pos_left_left');
            $('.featured_box').removeClass('paging_pos_left');
            $('.featured_box').addClass('paging_pos_center');
            $('.featured_box').removeClass('paging_pos_right');
            $('.featured_box').removeClass('paging_pos_right_right');
            
            $('#paging_new_wrapper').removeClass('paging_pos_left_left');
            $('#paging_new_wrapper').removeClass('paging_pos_left');
            $('#paging_new_wrapper').removeClass('paging_pos_center');
            $('#paging_new_wrapper').addClass('paging_pos_right');
            $('#paging_new_wrapper').removeClass('paging_pos_right_right');
            
            $('.paging_latest_button').removeClass('paging_current');
            $('.paging_featured_button').addClass('paging_current');
            $('.paging_new_button').removeClass('paging_current');
        }
        
        function paging_load_new()
        {
            function parse_thumbnails()
            {
                $("#new_stories .story_image, #new_stories .story_thumbnail").each(function(i, elem) {
                    var img = $(elem);
                    img.attr("src", img.attr("src").replace(/_t\./, '_r.'));
                    
                    img.prependTo(img.parent().children(".short_description"));
                });
            }
            $('.paging_new_button').addClass('paging_loading');
            $('#paging_new_wrapper').addClass('paging_loading');
            $('#new_stories .list').load(window.location.pathname + " #new_stories .list", function(){
                
                $(this).children(':first').unwrap();
                parse_thumbnails();
                $('.paging_new_button').removeClass('paging_loading');
                $('#paging_new_wrapper').removeClass('paging_loading');
            });
            
            if (paging_new_firsttime) {
                parse_thumbnails();
                paging_new_firsttime = 0;
            }
            
            $('#paging_latest_wrapper').addClass('paging_pos_left_left');
            $('#paging_latest_wrapper').removeClass('paging_pos_left');
            $('#paging_latest_wrapper').removeClass('paging_pos_center');
            $('#paging_latest_wrapper').removeClass('paging_pos_right');
            $('#paging_latest_wrapper').removeClass('paging_pos_right_right');
            
            $('.featured_box').removeClass('paging_pos_left_left');
            $('.featured_box').addClass('paging_pos_left');
            $('.featured_box').removeClass('paging_pos_center');
            $('.featured_box').removeClass('paging_pos_right');
            $('.featured_box').removeClass('paging_pos_right_right');
            
            $('#paging_new_wrapper').removeClass('paging_pos_left_left');
            $('#paging_new_wrapper').removeClass('paging_pos_left');
            $('#paging_new_wrapper').addClass('paging_pos_center');
            $('#paging_new_wrapper').removeClass('paging_pos_right');
            $('#paging_new_wrapper').removeClass('paging_pos_right_right');
            
            $('.paging_latest_button').removeClass('paging_current');
            $('.paging_featured_button').removeClass('paging_current');
            $('.paging_new_button').addClass('paging_current');
        }
        
        
        $("#popular_stories .story_image, #popular_stories .story_thumbnail").each(function(i, elem) {
          var img = $(elem);
          var wrapper = $("<div />").addClass("thumb_wrapper");
          var div = $("<div />").css({
            backgroundImage: "url(" + img.attr("src").replace(/_t\./, '_r.') + ")"
          }).addClass("div_thumbnail");
          div.appendTo(wrapper);
          img.replaceWith(wrapper);
        });
        
        featured_stories_add_handlers();
        featured_stories_add_expandable();
        
        
        
    });

}
 
// load jQuery and execute the main function
addJQuery(main);
