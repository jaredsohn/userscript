// ==UserScript==
// @name        Youtube History
// @namespace   http://lo3.eu
// @include     http://www.youtube.com/feed/history
// @version     1
// @grant       none
// @downloadURL http://lo3.eu/mark/greasemonkey/youtube_history.user.js
// @description Collects all youtube history feed data and presents the option to download the data. Takes upwards of 3 minutes(for 10k history) with no visible progress, open up a debug console and look for ajax requests if you want to see if it's working.
// ==/UserScript==

function inject(source){
    if('function' != typeof source){
        alert('\'function\' != typeof source');
        return;
    }
    
    source = '(' + source + ')();';
    
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = source;
    
    document.body.appendChild(script);
    document.body.removeChild(script);
}

function inject_jquery(source){
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.setAttribute('src', source);
    
    document.body.appendChild(script);
}

function init(){
    youtube_history_data = [];
    youtube_history_paging = 0;
    main = function(){
        if(null == youtube_history_paging){
            alert("youtube_history_download");
            youtube_history_blob = new Blob([JSON.stringify(youtube_history_data)], {'type':'Application/octet-stream'});
            youtube_history_a = document.createElement("a");
            youtube_history_a.href = window.URL.createObjectURL(youtube_history_blob);
            youtube_history_a.download = "youtube_history_data";
            $("body").append(youtube_history_a);
            youtube_history_a.click();
            return;
            
        }
        $.get("http://www.youtube.com/feed_ajax?action_load_personal_feed=1&feed_name=history&paging=" + youtube_history_paging, function(data){
            youtube_history_data.push(data);
            youtube_history_paging = data.paging;
            main();
        }, "json").fail(function(){
            main();
        });
    };
    
    init_wait = window.setInterval(function(){
        if($){
            window.clearInterval(init_wait);
            main();
        }
    }, 1000);
}

inject_jquery("//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js");
inject(init);