// ==UserScript==
// @name        Preview first image included in a self-posts
// @namespace   http://userscripts.org/users/brainflakes
// @include     http://www.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

var imageCache = new Array();

function showImagePreview($tag, imageHtml)
{
    $tag.html(imageHtml);
}

$("a.title").hover(
    function(){
        var $link = $(this);
        var href = $link.attr("href");        
        if (href.indexOf("/r/") == 0){
            $link.append("<div style='position:absolute; background-color:white; color:black; padding:4px; font-size:0.8em; border:1px solid silver;' class='brainPreviewImage'>Loading</div>");
            var $popupDiv = $link.find(".brainPreviewImage");
            
            if (imageCache[href]){
                showImagePreview($popupDiv, imageCache[href]);
            }else{
                $.ajax({
                    url: href + ".json",
                    type: "GET",
                    dataType : "json", 
                    success:function(data) {
                        var allText = data[0].data.children[0].data.selftext;
                        var previewText = $("<div/>").html(data[0].data.children[0].data.selftext).text(); // strip html with jquery
                        
                        if (previewText.length > 200) {
                            previewText = previewText.substring(0, 200) + "...";
                        }
                        
                        previewText = "<div style='max-width: 500px'>" + previewText + "</div>";
                        
                        var imageLinks = allText.match("http[s]?://[^) ]+\.(jpg|jpeg|png|gif)");
                        var imgurGalleryLink = allText.match("http[s]?://imgur.com/([0-9a-zA-Z]+)");
                        if (imageLinks){
                            imageCache[href] = previewText + "<img src='" + imageLinks[0] + "'/>";
                        }else if (imgurGalleryLink){
                            imageCache[href] = previewText + "<img src='" + imgurGalleryLink[0] + ".jpg'/>";
                        }else{
                            imageCache[href] = previewText + "(No Image)";
                        }
                        showImagePreview($popupDiv, imageCache[href]);
                    }
                });
            }
        }
    },
    function(){
        var $link = $(this);
        $link.find(".brainPreviewImage").remove();
    });