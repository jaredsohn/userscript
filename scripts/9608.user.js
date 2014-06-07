window.addEventListener("load", function(e) {

        var title = document.title;
        var name = '';
        //change the . in the title to a dash to make a common delimiter
        name = title.replace(/·/g,"&");
        //split the title
        var nameArray = name.split("&");

        // splitting by dashes alone isn't stable enough because alot of people like putting dashes into the title names of their videos!
        //also the position of the name changes if the video is on a channel
        //for that reason we split by .'s, then find the string "Video and Download" and work backward from there.
        for(var x = 0; x < nameArray.length; x++)
        {
            var pos = nameArray[x].search(/Video and Download/i);
            if(pos != -1)
                name = nameArray[x].substring(1, pos - 3);
        }

        var vidURL = document.location + ' ';
        var vidURLarray = vidURL.split("/");
        if (vidURLarray[3] == "user") {
            var vidID = vidURLarray[6];
        }else{
            var vidID = vidURLarray[5];
        }
        //here we steal their download image and crop it for our needs. Also, we need to grab the vid-channel 
	//class, because people can change the color of the background and such, changing what color the text 
	//needs to be. background:none; on the a is to get rid of the TV icon.
        var ddLink = '<li style="background: url(http://includes.stage6.com/images/video/download.gif) 0px -25px no-repeat;"><a style="background:none;" href=" http://video.stage6.com/' + vidID + '/' + name + '.divx"  class="vid-channel function" id="video_control_add">Download</a></li>';
        //Then we make the switch.
	codeSnip = document.getElementById("share-video").innerHTML + ddLink;
        document.getElementById("share-video").innerHTML = codeSnip;
}, false);

// Script by defrex
// email: defrex0@gmail.com
// web: http://defrex.com/stage6-direct-downloader/

// ==UserScript==
// @name          Stage6 Direct Download
// @namespace     http://defrex.com
// @description   A script to add a direct download link to dtage6.fivx.com
// @include       http://stage6.divx.com/*
// ==/UserScript==