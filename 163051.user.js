// ==UserScript==
// @name        Youtube Download By TitDjeck
// @description Youtube Download, inspired by derekbailey - Youtube Download Button Generator
// @namespace   http://github.com/TitDjeck
// @include     http*://www.youtube.com/watch*
// @version     0.2
// @run-at document-end
// @copyright  2012+, TitDjeck
// ==/UserScript==
(function() {
    
    // define here you preference as type-quality, it will take the first
    var preference = ['3gp-large','mp4-large','flv-large','3gp-medium','mp4-medium', 'flv-medium','3gp-small', 'flv-small','mp4-small','webm-large','webm-medium','webm-small','videoplayback-large','videoplayback-medium','videoplayback-small'];
    
    var getData = function(){
        //unsafeWindow.ytplayer.config.args.url_encoded_fmt_stream_map
        var title = unsafeWindow.ytplayer.config.args.title.replace(/\s+/g,' ');
        var videos = unsafeWindow.ytplayer.config.args.url_encoded_fmt_stream_map.split(',')
        .map(function(elem, index){
            var res =  YTURLtoJSON(elem);
            return res;
        })
        .sort(function(a,b){ 
            var d; if(a.type < b.type) {d = -1;} else if(a.type > b.type) {d = 1;} else if(a.quality == 'large' || b.quality == 'small') {d = -1;} else {d = 1;} return d;  
        });
        
        return {
            title : title,
            videos : videos
        };
    };
    
    var YTURLtoJSON = function(str){
        var obj = {};
        
        unescape(str).replace(/\?/gi,"&").replace(/sig=/gi,"signature=").replace(/;\+/gi,"&").replace(/3gpp/gi,"3gp").replace(/x-flv/gi,"flv").replace(/video\//gi,"")
        .split("&").map(function(elem, index){
            var tmp = /(.+)=(.+)/.exec(elem);
            obj[tmp[1]] = tmp[2];            
        });
        return obj;
    };
    
    var formatedURL = function(obj){
        
        var array = [];
        for(var key in obj){
            if(obj.hasOwnProperty(key) && key !== "url"){
                array.push(key + '=' + obj[key]);   
            }
        }
        
        return obj.url + '?' + array.join('&');
    };
    
    var checkPreference = function(pref, data){
        
        for(var i in data.videos){
            if(data.videos[i].type + "-" + data.videos[i].quality == pref) return data.videos[i];
        }
        return false;
    };
    
    var addButton = function(title, video){
        
        debugger;
        var data = getData();
        var prefered;
        var topprefered;
        while(preference.length){
            prefered = preference.shift();
            
            if((topprefered = checkPreference(prefered, data))) {break;}
        }
        
        if(!topprefered) return;
        
        
        var mainButton = document.createElement("a");
        var mainButtonContent = document.createElement("span");
        
        mainButton.appendChild(mainButtonContent);
        
        mainButton.title = "Download this video ?";
        mainButton.className = "yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip";
        mainButtonContent.textContent = "Download";
        mainButton.href = formatedURL(topprefered) + "&title=" + data.title;
        mainButton.type = "octet-stream";
        //mainButton.target = '_blank';
        document.querySelector('#watch-like-dislike-buttons').appendChild(mainButton);
    };
    
    var main = function(){
        addButton();
    };
    
    main();
    
})();