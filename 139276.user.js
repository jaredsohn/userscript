// ==UserScript==
// @name          Douban Photo Flipper
// @author        xiaoyao
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @namespace     http://www.douban.com/people/hard2think
// @description   Enable flipping back a photo on douban.com when clicking on the left side of the photo
// @include       http://www.douban.com/photos/photo/*
// @match         http://www.douban.com/photos/photo/*
// @include       http://movie.douban.com/photos/photo/*
// @match         http://movie.douban.com/photos/photo/*
// @include       http://site.douban.com/widget/photos/*
// @match         http://site.douban.com/widget/photos/*
// @include       http://site.douban.com/widget/public_album/*/photo/*
// @match         http://site.douban.com/widget/public_album/*/photo/*
// @include       http://www.douban.com/online/*/photo/*
// @match         http://www.douban.com/online/*/photo/*
// @include       http://www.douban.com/event/photo/* 
// @match         http://www.douban.com/event/photo/*
// @include       http://www.douban.com/location/drama/photo/*
// @match         http://www.douban.com/location/drama/photo/*
// @include       http://site.douban.com/widget/biz_album/*/photo/*
// @match         http://site.douban.com/widget/biz_album/*/photo/*
// @version       1.3
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
    var nextPhotoLink = jQuery('#next_photo').attr('href');
    var prevPhotoLink = jQuery('#pre_photo').attr('href');
    var thePhoto = jQuery('.mainphoto>img');

    //display cursor title
    thePhoto.mousemove(function(e){
        
        var positionX = e.pageX-thePhoto.offset().left; //relative x position on the img
        var positionY = e.pageY-thePhoto.offset().top;  //relative y position on the img

        //mouse on left side
        if(positionX>0 && positionX<thePhoto.width()/2 && positionY>0 && positionY<thePhoto.height()){  
            thePhoto.attr('title','Previous'); 
        }
        //mouse on right side
        else if(positionX>=thePhoto.width()/2 && positionX<thePhoto.width() && positionY>0 && positionY<thePhoto.height()){ 
            thePhoto.attr('title','Next'); 
        }
    });

    thePhoto.mousedown(function(e){ 

        var positionX = e.pageX-thePhoto.offset().left; //relative x position on the img
        var positionY = e.pageY-thePhoto.offset().top;  //relative y position on the img

        //mouse on left side
        if(positionX>0 && positionX<thePhoto.width()/2 && positionY>0 && positionY<thePhoto.height()){  
            thePhoto.parent().attr('href',prevPhotoLink); 
        }
        //mouse on right side
        else if(positionX>=thePhoto.width()/2 && positionX<thePhoto.width() && positionY>0 && positionY<thePhoto.height()){ 
            thePhoto.parent().attr('href',nextPhotoLink);
        } 
    }); 

}

// load jQuery and execute the main function
addJQuery(main);
