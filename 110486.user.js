// ==UserScript==
// @name          YouTube Comment Helper
// @description   Shows the target user's past comments when the mouse hovers over the @username link.
// @include       http://*.youtube.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


// Initialize the hash which holds the comment values
var comments = new Array();

// A function taken from http://www.netlobo.com/url_query_string_javascript.html
// Easy way to Get Url Parameters
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// Populates the comments array, executed on the comment's "li" element
function getComments(index) {
            
    // Get the author, message and time in a comment string
    var author = $.trim($(this).attr("data-author"));
    var text = $.trim($(this).find("div.comment-text").text());
    var time = $.trim($(this).find("span.time").text());
    var comment = text + "\r\n" + author + " " + time;
    
    if (comments[author] == null) {
        // Just set it if there is no previous message
        comments[author] = comment;
    } else {
        // Append if there previous message exists
        comments[author] = comments[author] + "\n\n" + comment;
    }
    
}

// Insert the comment history 
function updateAtLinkTitle() {

    // Set the link titles in all comments section
    $(".watch-comment-atlink").each( function(index) {
    
        // Trim the @ sign at the start of the at-link
        var username = $(this).text();
        username = username.substring(1, username.length);
        
        if (comments[username]) {
            // Insert the comment at the link title
            $(this).attr("title", comments[username]);
        } else {
            // Put "No data available" if no comment's available
            $(this).attr("title", "No data available");
        }
    });
}

// Execute when document's ready
$(function() {
    
    // Extract videoID from the video URL
    var videoID = gup("v");

    if (videoID) {

        // Set all @username link titles to "Loading.."
        $(".watch-comment-atlink").attr("title", "Loading..");
        
        // Send XMLHttpRequest for the comment page using the videoID
        $.ajax({
          url: "http://www.youtube.com/all_comments?v=" + videoID,
          cache: false,
          success: function(data){
            
            // The regex to match the script list we want to remove
            var re = /<script.*?>[^]*?<\/script>/g;
            
            // Remove all the script from our response data
            var list = data.replace(re,'');
            
            // A quick way to parse the HTML string 
            var allElements = $("<div>").html(list).find("li.yt-tile-default");
            allElements.each(getComments);
            
            // Update the at-link titles at that page
            updateAtLinkTitle();
            
          }
        });
        
        // Update the links if user navigates comment pages
        document.addEventListener("DOMSubtreeModified", updateAtLinkTitle, false);
        
    }

 });

