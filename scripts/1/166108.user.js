	

    // ==UserScript==
    // @name           What.CD Bad Cover
    // @namespace      google.com
    // @description    Lets you know if a cover isn't on a good host.
    // @include        https://*what.cd/torrents.php?type=*
    // @include        https://*what.cd/torrents.php?page=*
    // @include        https://*what.cd/torrents.php?id=*
    // @include        https://*what.cd/torrents.php?action=editgroup&groupid=*
    // @include        https://*what.cd/artist.php?id=*
    // @include        https://*what.cd/artist.php?action=edit&artistid=*
    // @include        https://*what.cd/collage.php?id=*
    // ==/UserScript==
     
    //By death2y
    //Contributions by mcnellis, OhmG, parsec and HeroKid
    //Sonicloop - added main artist, collage (thanks  Wingman4l7), snatched, seeding and fixed some unhandled exceptions
     
    var goodhosts = [ //If you want more hosts to be "good", add them to this list as a RE matching their domain
        /whatimg\.com/,/what\.cd/,
    ];
     
    /******************************************************************************/
    if ( window.location.search.match(/action=edit/) || window.location.search.match(/action=report/)) {
     
    // Exclude these type of action pages
     
    }
     
    else if ( window.location.toString().search(/artist/) > 0) {
     
    // Artist main page - all releases
     
            var AlbumElementNodeList = document.getElementById("discog_table").querySelectorAll("div.group_image");
            var imgElement;
            for (var i = 0; i < AlbumElementNodeList.length; i++) {
                    imgElement = AlbumElementNodeList[i].getElementsByTagName('img')[0];
                    for (var j = 0; j < goodhosts.length; j++) {
                            if (imgElement.src.match(goodhosts[j])) {
                                    j = goodhosts.length;
                            }
                            else {
                                    imgElement.style.boxSizing = "border-box"; // inner border
                                    imgElement.style.border = ".3em solid red";
                            }
                    }
            }
     
    // Check artist image and allow replacement
     
        var imgElem = document.querySelector('div.box_image img');
            if (imgElem){ //Only process an image if there is one!
                    var artistImg = document.querySelector('div.box_image img').src;
                    var good = false;
                    for (var i=0; i<goodhosts.length; i++) {
                            if (artistImg.match(goodhosts[i])) {
                                    good = true;
                                    i = goodhosts.length;
                            }
                    }
                    if (!good) {
                            imgElem.style.border = ".5em outset red";
                            var link = document.createElement("a");
                            link.innerHTML = "WhatIMG & Edit it";
                            link.target = "_new"; //target feels so bad :( yeah it does :|
                            link.href=  "https://whatimg.com/index.php?url=1&img=" + artistImg;
                            link.addEventListener('click', function() {
                               var aid = /id=([^&]+)/.exec(window.location.href)[1];
                               window.location.href = window.location.protocol + '//' + window.location.host + '/artist.php?action=edit&artistid=' + aid + "#whatimg";
                            }, false);
                            //Put it in
                            imgElem.parentNode.insertBefore(link, imgElem);
                    }
            }
    }
     
    else if ( window.location.toString().search(/torrent/) > 0 &&
            ( window.location.toString().search(/type=snatched/) > 0 || window.location.toString().search(/type=seeding/) > 0)) {
     
    //Your snatched or seeding torrents
     
            var UpDownElementNodeList = document.getElementById("content").querySelectorAll("div.group_image");
            var imgElement;
            for (var i = 0; i < UpDownElementNodeList.length; i++) {
                    imgElement = UpDownElementNodeList[i].getElementsByTagName('img')[0];
                    for (var j = 0; j < goodhosts.length; j++) {
                            if (imgElement.src.match(goodhosts[j])) {
                                    j = goodhosts.length;
                            }
                            else {
                                    imgElement.style.boxSizing = "border-box"; // inner border
                                    imgElement.style.border = ".3em solid red";
                            }
                    }
            }
    }
     
    else if ( window.location.toString().search(/torrent/) > 0) {
     
    //Assume release detail page
     
        var cover = document.querySelector('div.box_image img').src;
        var good = false;
        for (var i=0; i<goodhosts.length; i++) {
            if (cover.match(goodhosts[i])) {
                good = true;
                i = goodhosts.length;
            }
        }
     
        var coverElem = document.querySelector('div.box_image img');
        if (!good) {
            coverElem.style.border = ".5em outset red";
            //Give a link to whatimg
            //Check if the size is okay
            /*GM_xmlhttpRequest({
                method: 'GET',
                   url: 'https://whatimg.com/Whatsize?fmt=json&img=' + escape(coverElem.src),
                onload: function(responseDetails) {
                            data = eval('('+responseDetails.responseText+')');
                            alert(data.width+'x'+data.height);
                },
               onerror: function(data) { alert("An unexpected error occured."); }
            });*/ //This doesn't exist yet! Sshhh
     
     
            var link = document.createElement("a");
            link.innerHTML = "WhatIMG & Edit it";
            link.target = "_new"; //target feels so bad :(
            link.href=  "https://whatimg.com/index.php?url=1&img=" + cover;
            link.addEventListener('click', function() {
               var tid = /id=([^&]+)/.exec(window.location.href)[1];
               window.location.href = window.location.protocol + '//' + window.location.host + '/torrents.php?action=editgroup&groupid=' + tid + "#whatimg";
            }, false);
            //Put it in
            coverElem.parentNode.insertBefore(link, coverElem);
        }
     
            var UpDownElementNodeList = document.getElementById("content").querySelectorAll("div.group_image");
            var imgElement;
            for (var i = 0; i < UpDownElementNodeList.length; i++) {
                    imgElement = UpDownElementNodeList[i].getElementsByTagName('img')[0];
                    for (var j = 0; j < goodhosts.length; j++) {
                            if (imgElement.src.match(goodhosts[j])) {
                                    j = goodhosts.length;
                            }
                            else {
                                    imgElement.style.boxSizing = "border-box"; // inner border
                                    imgElement.style.border = ".3em solid red";
                            }
                    }
            }
    }
     
    else if ( window.location.toString().search(/collage/) > 0 && window.location.search.match(/id=/)) {
     
    // Collage description page
       
            var CollElementNodeList = document.getElementById("content").querySelectorAll("[class^='image_group_']");
            var imgElement;
            for (var i = 0; i < CollElementNodeList.length; i++) {
                    imgElement = CollElementNodeList[i].getElementsByTagName('img')[0];
                    for (var j = 0; j < goodhosts.length; j++) {
                            if (imgElement.src.match(goodhosts[j])) {
                                    j = goodhosts.length;
                            }
                            else {
                                    imgElement.style.boxSizing = "border-box"; // inner border
                                    imgElement.style.border = ".3em solid red";
                            }
                    }
            }
    }
     
    else if (window.location.hash == "#whatimg") { //Torrent edit page
        var inputs = document.getElementsByTagName('input');
     
        for(var i = 0; i < inputs.length; i++ ) {
            if(inputs[i].getAttribute('name') == 'summary') {
                inputs[i].value = 'Image host changed to WhatIMG';
            } else if (inputs[i].getAttribute('name') == 'image') {
                inputs[i].value = '';
            }
        }
     
    }