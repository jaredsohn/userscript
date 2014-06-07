// ==UserScript==
// @name        Google Images To Wikipedia
// @namespace   Reeywhaar
// @description Shows images from Google under article header
// @include     *.wikipedia.org/wiki/*
// @version     0.2
// ==/UserScript==

function GoogleImagesToWikipedia(){
    var $ = unsafeWindow.jQuery;
    
    //holders
    var openEl = $('<span class="googleImagesOpen"><span class="pseudo">Google Images</span><span>');
    var imagesEl = $('<div class="googleImagesHolder"><div class="googleImagesFooter"><span id="moreGoogleImages" class="pseudo">More...</span><div style="display:inline-block;float:right;"><span class="goToSearch" style="margin-right:15px;"><a href="">View on Google</a></span><span class="googleImagesClose pseudo">Close</span></div></div></div>');
    
    //vars
    var title = unsafeWindow.wgPageName;
    var response = [];
    var numberOfImages = 15;
    var imagesLoaded = 0;
    var imagesShown = 0;
    
    //style
    var style = '<style>';
    style += '.googleImagesOpen {font-size:80%;display:block;}'
    style += '.googleImagesOpen span{color:#0645AD;cursor:pointer;font-style:italic;}'
    style += '.googleImagesHolder {background:#f4f4f4;border:1px solid rgba(0,0,0,0.1);padding:2px;margin-bottom:4px;}';
    style += '.googleImagesHolder img{diplay:inline-block;height:100px;border:1px solid rgba(0,0,0,0.3);margin:2px;}'
    style += '.googleImagesFooter{padding:2px;padding-bottom:0px;padding-right:4px;}'
    style += '.googleImagesFooter .pseudo{color:#0645AD;cursor:pointer;font-style:italic;}';
    style += '</style>';
    
    function processData(){
        if((imagesShown+numberOfImages) > imagesLoaded){
           retrieveData();
        } else {
           dealResponse();
        }
    }
    
    function dealResponse(){
        var toShow = imagesShown+numberOfImages;
        for(i=imagesShown; i<toShow; i++){
           var url = response[i].tbUrl;
           var link = response[i].url;
           var el = $('<a href="'+link+'"><img src="'+url+'"></a>');
           $('.googleImagesFooter').before(el);
        }
        
        imagesShown = imagesShown+numberOfImages;
    }
    
    function retrieveData(){
       start = 0 + imagesLoaded;
       var url = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+title+"&start="+start;
       $.getJSON(url+'&callback=?', function(data){
           results = data.responseData.results;
           for(i in results) {
              response.push(data.responseData.results[i]);
           }
           imagesLoaded = imagesLoaded + 4;
           processData();
       });
    }
    
    function handleEvents(){
        style = $(style);
        $(document.head).append(style);
        
        $('#siteSub').after(openEl);
        $(openEl).after(imagesEl);
        
        $(openEl).click(function(){$(imagesEl).slideToggle(333);});
        $(imagesEl).slideUp(0);
        $('.googleImagesClose').click(function(){$(imagesEl).slideUp(333);});
        
        $('.goToSearch a').attr('href', 'https://www.google.com/search?hl=en&site=imghp&tbm=isch&q='+title);
        
        $('#moreGoogleImages').click(function(){processData();});
    }
    
    function init(){
        title = title.split('_').join('+');
        
        handleEvents();
        processData();
    }
    
    init();
}

if(unsafeWindow.wgCanonicalNamespace === ""){
    var googleImagesToWikipedia = new GoogleImagesToWikipedia();
};