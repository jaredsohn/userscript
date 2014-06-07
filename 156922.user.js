// ==UserScript==
// @name            ImagesOnly
// @author          Yoplitein
// @namespace       http://people.beniesbuilds.com/yoplitein/
// @description     Shows only images in 4chan threads.
// @license         WTFPL
// @version         0.2
// @include         http*://boards.4chan.org/*/*
// @compatible      Greasemonkey
// @grant           none
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

//prevent our jQuery from ballsing up the page
this.$ = this.jQuery = jQuery.noConflict(true);

(function()
{
    function imagesOnly()
    {
        this.setupButton("Images only", function(parent)
            {
                parent.showImages();
            });
    };
    
    imagesOnly.prototype.setupButton = function(text, callback)
    {
        var divStyle = "\"position: fixed; top: 100px; right: 0px; background-color: #d0d0d0; cursor: pointer;\""
        $("body").append('<div id="imagesOnlyButton" style=' + divStyle + '>' + text + "</div>");
        var parent = this;
        $("#imagesOnlyButton").click(function()
        {
            callback(parent);
        });
    };
    
    imagesOnly.prototype.showImages = function()
    {
        var images = this.findImages();
        var onclickCode = "window.prompt('Copy to clipboard', this.src);";
        
        if(images.length < 1)
        {
            alert("No images found/the script is broken.");
            return;
        }
        
        $("body").html("");
        $("body").append("<span style='font-weight: bold; font-size: 200%'>Hint: click on images to copy URL</span><br />");
        
        for(var iii = 0; iii < images.length; iii++)
        {
            $("body").append('<img onclick="' + onclickCode + '" src="' + images[iii] + '" /><br />');
        }
        
        this.setupButton("Take me back!", function(parent)
        {
           document.location.reload();
        });
    }
    
    imagesOnly.prototype.findImages = function()
    {
        var images = []
        
        $("a.fileThumb img").each(function(parent)
        {
            images.push($(this).parent().attr("href"));
        });
        
        return images;
    }
    
    //instantiate and run 
    var imagesOnlyObj = new imagesOnly();
})();
