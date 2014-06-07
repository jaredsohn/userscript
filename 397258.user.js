// ==UserScript==
// @name        YTRating
// @namespace   ytr_EXT
// @description Youtube rating improved information
// @include     http://www.youtube.com/watch?v=*
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==

$(function() {
    function onlyNumbers(str) {
        var num = ""
        for (var i=0;i<str.length;i++) {
            var temp = parseInt(str[i])
            if (!(isNaN(temp))) {
                num = num+temp
            }
        }
        return parseInt(num)
    }
    
    watch_view_count = $(".watch-view-count")
    views = onlyNumbers(watch_view_count[0].innerHTML)
    
    if (isNaN(views)) {
       views = 0
    }
    
    likes_elem = $(".likes-count")
    if (likes_elem.length == 0) {
       likes = 0
    } else {
        likes = onlyNumbers(likes_elem[0].innerHTML)
    }
    
    dislikes_elem = $(".dislikes-count")
    if (dislikes_elem.length == 0) {
       likes = 0
    } else {
        dislikes = onlyNumbers(dislikes_elem[0].innerHTML)
    }
    
    likeRate = (100/(likes+dislikes))*likes
    disLikeRate = 100-likeRate
    
    yt_like_icon = $("#watch-stats-like");
    yt_dislike_icon = $("#watch-stats-dislike");
    
    status_area = $("<div></div>")
    status_area.attr({
        "title": "Created By EnderCrypt (UserScript.org)"
    })
    
    // like percentage //
    status_area.append(yt_like_icon.clone());
    var temp = $("<text></text>")
    temp.html(" "+(Math.round(likeRate*100)/100)+"%  ")
    temp.css({
        "margin-right": "16px"
    })
    status_area.append(temp);
    
    // dislike percentage //
    status_area.append(yt_dislike_icon.clone());
    var temp = $("<text></text>")
    temp.html(" "+(Math.round(disLikeRate*100)/100)+"%")
    status_area.append(temp);
    
    // newline //
    status_area.append($("<br>"));
    
    if (views == 301) {
        var temp = $("<text></text>")
        temp.html("Unable to calculate information, due to incorrect view count (301+)")
        temp.css({
            "color": "red"
        })
        status_area.append(temp);
    } else {
    
    // liked by every X //
    var temp = $("<text></text>")
    if (likes == 0) {
       temp.html("Nobody has liked this!")
    } else {
        temp.html("One out of every "+Math.round(views/likes)+"'th person liked this video")
    }
    
    status_area.append(temp);
    
    // newline //
    status_area.append($("<br>"));
    
    // disliked by every X //
    var temp = $("<text></text>")
    if (dislikes == 0) {
       temp.html("Nobody has disliked this!")
    } else {
       temp.html("One out of every "+Math.round(views/dislikes)+"'th person disliked this video")
    }
    status_area.append(temp);
    
    }
    
    status_area.css({
        "background-color": "white",
        "line-height": "1",
        //"border": "2px solid black",
        "font-family": "arial,sans-serif",
        "width":  "100%",
        "visibility": "visible",
        "position": "relative",
        "opacity": "1"
    })
    $("#watch7-views-info").append(status_area)
    
    $("#watch7-views-info").css({
        "position": "relative",
        "text-align": "center",
        "margin-left": "auto",
        "margin-right": "auto",
        "max-width": "95%"
    })
})