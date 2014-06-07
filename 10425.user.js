// ==UserScript==
// @name           deviantArt randomLinks
// @namespace      http://artbit.deviantart.com
// @description    Adds a link to the random deviant and random deviation under the deviantArt rockDock bar
// @include        http://*.deviantart.com*
// @exclude        http://chat.deviantart.com*
// ==/UserScript==
    // v0.47
    // The visual aspect of the script is heavily inspired by Zilla's "deviantART SuperTurboStealthMenuZilla"
    // Check out his amazing work at http://zilla774.deviantart.com/gallery/
    
    /* Encoded images */
    var imgFirstComment = 'data:image/gif;base64,'+
        'R0lGODlhFwAXAOMIAAAAAGx5cne6EpmirbzCybXjb9zf4/r/6f//////////////////////////'+
        '/////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAgALAAAAAAXABcAAASIEMlJq7006L3x3EAo'+
        'ihoWhEaqrmFgnSkhz3QKuBlg0Pw83LmdLEQgEmU/HALWaxKSH91QVDQigRKmkwfN6gDDanF8VS4B'+
        'B/B20PUeCgJ1k409vwtwAHvg+9VPBwJ4cHEhfH4lUSGChTcndGYfgHmJj3UVk3FmJ5c5gZqYkTkj'+
        'oh5ZHKapqqusEQA7';
    var imgNewComment   = 'data:image/gif;base64,'+
        'R0lGODlhFwAXAMIHAAAAAGx5cpmirf65GbzCyfvcj9zf4////yH+EUNyZWF0ZWQgd2l0aCBHSU1Q'+
        'ACH5BAEKAAcALAAAAAAXABcAAAN/eLrc/izIOeGaIGstYchGKI5Z4Hwhoa5sCJgRYLD0KrzxrGYE'+
        'z6s32AFVKxKCF9lO0/MBcQqikYaMKnfNnvYpHF6ngmryNj2KrYBBJiyw3aBJtVzTfncan3RB/fqE'+
        '4TEDAwWEggBeZzF6fDB5XYFpkUJ3HhmMFh4flJicnZ6YCQA7';
    var imgRndDeviant   = 'data:image/gif;base64,'+
        'R0lGODlhFwAXAOMAAAAAAGZwbWp4Y46hhbfCt8bGxrrMx9nZ2eXo6P///wAAAAAAAAAAAAAAAAAA'+
        'AAAAACH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAA8ALAAAAAAXABcAAASM8MlJg6U4V8CD/lIA'+
        'JCTggZhIriY6qUkBFOUJwgk31vdOyjSWbbMqGnPDB+54bIV8TJKBY0Aqd8BVdppAAKommI7FSUwR'+
        'hy8Slv3NzACBYDBqLZkAwmDeOd2NcQOCTi9QgHODSVdFWSN8ik9kI1M6kJExb1N7hBp3mgKcnT4m'+
        'AJuWG32lcqGdFyKVExEAOw==';
    var imgRndDeviation = 'data:image/gif;base64,'+
        'R0lGODlhFwAXAMIAAAAAAGZwbf+pJMbGxv7VPf/2m////wAAACH+EUNyZWF0ZWQgd2l0aCBHSU1Q'+
        'ACH5BAEKAAcALAAAAAAXABcAAAN+eLoczjA2QIO8KgDDgcWQxo0euIjGAAzdh6EGtbXvzKks6U5j'+
        '78e7A+z3K2VsRGIJhRs1b6sWClCwyUgU6YZKqEJzqShQQyl0r8kxtWAmdNnInlEjcNsFcd2kfQ6D'+
        'gSFcdV5ogHsCeIhVT0Z7FWVIjYEPDlk0JoEVmBIOQRAJADs=';
    var imgRndGallery = 'data:image/gif;base64,'+
	'R0lGODlhFwAXAMQAAGZwbd3oy/Lwys3FnOG4hsikd5FOAa2NaEIvG2NLM4ptT/DLpDUfD////8bG'+
	'xgAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEA'+
	'ABAALAAAAAAXABcAAAWeICSOJGCSaFo+LKC+IvA09OPCqEzvNj7qDcfDUbvBgA3WrHhc0oREnnG1'+
	'q1qTUwjyeu3FnFxuDwjdlZ/DIlDJY7WXNnIaHQ3Ox+CwtWfo+/t6TBAGBQQHBwICBoFegwIKAgsJ'+
	'inRVjYOSAgQIAYtJboIjBgMMiAwDnmeXIgYECQoKCQUGeausB6+Ss0i2rAmTAgkHBlpKWSR/fzEnMCEAOw==';
    var imgBlueArrow = 'data:image/gif;base64,'+
        'R0lGODlhBQADAIABAGOEuP///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAFAAMA'+
        'AAIFhB0XC1sAOw==';
    var imgGreenArrow = 'data:image/gif;base64,'+
        'R0lGODlhBQADAIABAAC2AP///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAFAAMA'+
        'AAIFhB0XC1sAOw==';
    var imgRedArrow = 'data:image/gif;base64,'+
        'R0lGODlhBQADAIABAO9XPf///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAFAAMA'+
        'AAIFhB0XC1sAOw==';
    var imgYellowArrow = 'data:image/gif;base64,'+
        'R0lGODlhBQADAIABAP7VPf///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAFAAMA'+
        'AAIFhB0XC1sAOw==';
    var topDiv = document.getElementById("output");
    if (topDiv){
    var top = -8;
    if (document.getElementsByTagName("body")[0].className.indexOf('with-apps') >= 0) {
        top += 26;
    }
    var style = [
        ".dalinks { position: absolute; top: "+top+"px; height: 50px;}"
        , ".dalinks #random_deviant, .dalinks #random_deviation, .dalinks #jumpto_1st_comment, .dalinks #jumpto_new_comment {position:absolute; bottom: -10px; width:40px; height:10px; z-index:102; display:block; outline: none; cursor:pointer; right: 30px; border-radius: 0px 0px 0px 0px; background-color: #374341; background-image:url('"+imgBlueArrow+"'); background-repeat: no-repeat; background-position: 17px 3px;}"
        , ".dalinks #random_deviant     {background-image:url('"+imgBlueArrow+"');   right: 30px;  border-radius: 0px 0px 4px 0px;}"
        , ".dalinks #random_deviation   {background-image:url('"+imgYellowArrow+"'); right: 60px;}"
        , ".dalinks #jumpto_1st_comment {background-image:url('"+imgGreenArrow+"');    right: 90px;}"
        , ".dalinks #jumpto_new_comment {background-image:url('"+imgRedArrow+"');  right: 120px;}"
        , ".dalinks { width: 90%; text-align: right; margin-left: auto, margin-right: auto;}"
        /* hover properties */
            , ".dalinks #random_deviant:hover, .dalinks #random_deviation:hover, .dalinks #jumpto_1st_comment:hover, .dalinks #jumpto_new_comment:hover{background-image:url('"+imgRndDeviant+"'); background-repeat: no-repeat; background-position: 10px 5px; background-color: #374341; bottom: -30px; height:30px; border-radius: 0px 0px 4px 4px;}"
            , ".dalinks #random_deviation:hover   {background-image:url('"+imgRndDeviation+"');}"
            , ".dalinks #random_gallery:hover     {background-image:url('"+imgRndGallery+"');}"
            , ".dalinks #jumpto_1st_comment:hover {background-image:url('"+imgFirstComment+"');}"
            , ".dalinks #jumpto_new_comment:hover {background-image:url('"+imgNewComment+"');}"
    ].join(" ");
    GM_addStyle(style);

    function createLink(id, href, title, onclick) {
        var link = document.createElement("a");
        link.setAttribute("id",id);
        link.setAttribute("href", href);
        link.setAttribute("title", title);
        if (onclick) {
            link.setAttribute("onclick", onclick);
        }
	return link;
    }
        
        var loc = window.location;
        var firstLink = "#random_deviation";
        
        var holder = document.createElement("div");
            holder.setAttribute("class","dalinks");
          
        holder.appendChild(createLink("random_deviant", "http://www.deviantart.com/random/deviant", "Random Deviant - Discover new artists, gain new friends"));
        holder.appendChild(createLink("random_deviation", "http://www.deviantart.com/random/deviation", "Random Deviation - Dive into this sea of art and find hidden pearls and lost treasures..."));
        
        if(document.getElementById("comments")) {
            holder.appendChild(createLink("jumpto_1st_comment",  loc+'#comments', "Jump to first comment"));
            firstLink = "#jumpto_1st_comment";
        }
        
        if(document.getElementById("commentbody")) {
            holder.appendChild(createLink("jumpto_new_comment",  loc+'#commentbody', "Add a devious comment."));
            firstLink = "#jumpto_new_comment";
        }
        
        GM_addStyle(".dalinks "+firstLink+" {border-radius: 0px 0px 0px 4px;}");
        topDiv.appendChild(holder);
        
    } else {
        GM_addStyle("#random_deviant     {display:none !important;}");
        GM_addStyle("#random_deviation   {display:none !important;}");
        GM_addStyle("#jumpto_1st_comment {display:none !important;}");
        GM_addStyle("#jumpto_new_comment {display:none !important;}");
    }
