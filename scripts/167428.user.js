// ==UserScript==
// @name            Reddit - League of Legends Riot Post Highlight
// @version         1.0
// @description     Highlights all post from Riot workers.
// @match           http://www.reddit.com/r/leagueoflegends/comments/*/*/
// @copyright       2013+, Nikita Bernthaler
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

jQuery.noConflict();
jQuery(function($) {
    "use strict";
    var post_background_color = "#FFE3E3",
    post_border_color = "#E01B6A",
    post_border_thickness = "1px",
    post_padding = "3px",

    arrow_background_color = "#838383",
    arrow_background_color_hover = "#FF8500",
    arrow_prev = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEMzRjkyNkRCMURFMTFFMjk1RDA5MjUxMDhFMUI0N0EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEMzRjkyNkVCMURFMTFFMjk1RDA5MjUxMDhFMUI0N0EiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QzNGOTI2QkIxREUxMUUyOTVEMDkyNTEwOEUxQjQ3QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0QzNGOTI2Q0IxREUxMUUyOTVEMDkyNTEwOEUxQjQ3QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi/JSxsAAAFmSURBVHja7FTBaoNAEN21WbXFEEqQ0Es+wIv4Eb16yyFf5id4yUlJIJ+QUwiEfEPrRQMejAa383IosrVoCjnVgcHZeW/m7crscikle6Rp7ME2CHTaqC05mUxayXVdP2uaRp/6gnVZlkzXdcY5Z1VVsfF4zJIk6RagBm1pEYZhgWC5XAr6VL2OgDFV3bIs1UUURTphFzhi5LB74Ni5aZrMtu0fvVoFUNhwEcfxSCqGHLA/CTR2rtNuDfmLAQPnbgEUkPP1ei1kh4ED7l0CRNY2m42pNjsej+9wNQ8uanoLBEHwpjbZ7/ev5DccsYqjhgQMtVfrmM7n83NzfTgcZovF4pbDvAshzqvVaua67mezxjAM3usmb7fbpzzPPyi87na7l6IocHual6Om5gkwcMBFTZqmV7UXb3uuPc+7YY7jcJoUEL5J0+kUJ2AkyrIs477v89PphF8oMXkk1i0wvKaDwD8T+BJgACfHw2ySZEWLAAAAAElFTkSuQmCC)",
    arrow_next = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDI5NTVFRDJCMURFMTFFMkJBMjE4M0VDRDExQTcxMzgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDI5NTVFRDNCMURFMTFFMkJBMjE4M0VDRDExQTcxMzgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0Mjk1NUVEMEIxREUxMUUyQkEyMTgzRUNEMTFBNzEzOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0Mjk1NUVEMUIxREUxMUUyQkEyMTgzRUNEMTFBNzEzOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtgQY1kAAAF+SURBVHja7FVNa8JAEJ1dsjFFgx+Q0JsXT17Uk7+gePPun/Bv5eAtor/BmwriD/BSepAiiiWmdTtPFMKqtVq8FAceG9+82bc7TKLQWtM9Q9Kd42HwMPh7WCaRyWRotVpRrVYT5XJZhGGoc7mcdhyH4jim+XyelItmsymm0yleJj0cDo8d8KIlkU6nrXa77S6Xy1f+HQ8GgyfwpVKJisXibgWYp30uhhY15l7AUYvy+bzVaDS++CbPuGG9Xl+Px2PfaKfkG/nIQQMtan7VoiiK9Gw2yya5SqXy1ul0CtVq9X00GoHKgktq9jXriy3yPI/4dLLf7zvaiMlk8gKYPLSoOdWicwbkuq7o9XpKXwhooGXQtQaYKJunKHVuc+SgweQBtxiQbduq2+1a5ubgkGPQAbcaYFV8WpvzEYBncIeT/3QDYf7h+L5PPNeklNoJNpvNzoRDBUHwiYdWq4Xpi82BQZ0Z1xiQlDK13W55kR+nZn6xWFw2eHxN/5/BtwADAEy7r1lOSpXcAAAAAElFTkSuQmCC)",

    content = $("#siteTable"),
    riot_posts = $(".noncollapsed > .tagline > .flair-riot").parent().parent(),
    riot_posts_length = riot_posts.length,
    collapsed_riot_posts = $(".collapsed > .flair-riot").parent(),

    current_riot_post = -1,
    current_offset = document.body.scrollTop,

    riotBox, riotBox_control, riotBox_prev, riotBox_next, riotBox_text, post_offset, riotBoxOffset;

    function checkControls() {
        if(current_riot_post < 0 && current_offset < 200) {
            riotBox_prev.hide();
        } else {
            riotBox_prev.show();
        }
        if(current_riot_post > riot_posts_length - 2) {
            riotBox_next.hide();
        } else {
            riotBox_next.show();
        }
        riotBox_text.text((current_riot_post + 1) + " of " + riot_posts_length);
    }

    function calculateCurrentPost() {
        var changed = false;
        for(var i = 0; i < riot_posts_length; i++) {
            post_offset = riot_posts.eq(i).offset().top;
            if(current_offset >= post_offset) {
                current_riot_post = i;
                changed = true;
            }
        }
        if(!changed) {
            current_riot_post = -1;
        }
        checkControls();
    }

    if(content.length > 0 && riot_posts_length > 0) {
        // Change document title
        document.title = "(" + riot_posts_length + ") " + document.title;

        // Prepare Reddit Layout
        content.css({
            position: "relative"
        });

        // Setup controls
        riotBox = $('<div/>', {
            id: 'greasemonkey_riot_post'
        }).css({
                position: "absolute",
                top: "5px",
                right: "10px",
                "text-align": "center"
            });
        riotBox_control = $('<div/>', {
            class: 'greasemonkey_riot_post_control'
        }).css({
                width: "24px",
                height: "24px",
                cursor: "pointer",
                margin: "0 auto",
                "border-radius": "40px",
                "-moz-border-radius": "40px",
                "-webkit-border-radius": "40px",
                "background-color": arrow_background_color
            });
        riotBox_prev = riotBox_control.clone().css({
            margin: "0 auto 5px auto",
            "background-image": arrow_prev
        });
        riotBox_next = riotBox_control.clone().css({
            "background-image": arrow_next
        });
        riotBox_text = $('<div/>', {
            class: 'greasemonkey_riot_post_text',
            text: '0 of ' + riot_posts_length
        }).css({
                height: "13px",
                "font-size": "8px"
            });

        // Add controls
        riotBox.append(riotBox_prev);
        riotBox.append(riotBox_text);
        riotBox.append(riotBox_next);
        content.append(riotBox);
        riotBoxOffset = riotBox.offset().top;

        // De-Collapse all Riot posts
        collapsed_riot_posts.hide();
        riot_posts.css({
            border: post_border_thickness + " solid " + post_border_color,
            padding: post_padding,
            "background-color": post_background_color
        }).show();

        // Calculate
        calculateCurrentPost();

        // Add handlers
        riotBox_prev.click(function() {
            if(current_riot_post > 0) {
                var current_post_height = riot_posts.eq(current_riot_post).height();
                var current_post_offset = riot_posts.eq(current_riot_post).offset().top;
                if(current_offset > (current_post_height + current_post_offset)) {
                    post_offset = riot_posts.eq(current_riot_post).offset().top;
                }
                else {
                    post_offset = riot_posts.eq(current_riot_post - 1).offset().top;
                }
                $('html, body').animate({
                    scrollTop: post_offset
                }, 1000);
            }
            else if(current_riot_post <= 0) {
                $('html, body').animate({scrollTop:0});
            }
            checkControls();
        });

        riotBox_next.click(function() {
            if(current_riot_post < riot_posts.length - 1) {
                post_offset = riot_posts.eq(current_riot_post + 1).offset().top;
                $('html, body').animate({
                    scrollTop: post_offset
                }, 1000);
            }
            checkControls();
        });

        $(".greasemonkey_riot_post_control").hover(function() {
            $(this).css({
                "background-color": arrow_background_color_hover
            });
        }, function() {
            $(this).css({
                "background-color": arrow_background_color
            });
        });

        $(window).scroll(function(){
            current_offset = document.body.scrollTop;
            if(current_offset > riotBoxOffset ) {
                riotBox.css({top: (current_offset - riotBoxOffset + 10) + "px"});
            } else {
                riotBox.css({top: "5px"});
            }
            calculateCurrentPost();
        });
    }
});