// ==UserScript==
// @name           Topsy in Hatebu Entry
// @namespace      http://creazy.net/
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==

(function() {

    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var d = w.document;
    var l = w.location;
    var $ = function(id) { return d.getElementById(id); };

    //------------------------------------------------------------
    // Functions
    //------------------------------------------------------------
    /**
     * Callback Function for Topsy
     */
    w.topsy_got   = 0;
    w.topsy_total = 0;
    w.topsyCallback = function(json) {
        //console.log(json);
        res = json.response;

        // no tweets
        if ( !res.total ) {
            if ( document.getElementById('topsy_counter') ) {
                document.getElementById('topsy_counter').innerHTML = '';
            }
            if ( document.getElementById('topsy_trackbacks') ) {
                document.getElementById('topsy_trackbacks').innerHTML = 'No tweets.';
            }
            return false;
        }

        // exists tweets
        if ( document.getElementById('topsy_counter') ) {
            document.getElementById('topsy_counter').innerHTML = res.total;
        }
        topsy_got = eval(document.getElementById('topsy_got').innerHTML) + res.list.length;
        window.topsy_got += res.list.length;
        html = '';
        for ( var i=0; i<res.list.length; i++ ) {
            tweet     = res.list[i];
            thumb     = tweet.author.photo_url.replace(/(normal)\.([a-z]{3,4})$/i,'mini.$2');
            author_id = tweet.author.url.replace('http://twitter.com/','');
            html
                += '<li style="margin:0;padding:1px;">'
                +  '<a href="'+tweet.author.url+'" target="_blank">'
                +  '<img src="'+thumb+'" alt="'+tweet.author.name+'" style="border:0;vertical-align:middle;width:24px;height:24px;" />'
                +  '</a> '
                +  '<a href="'+tweet.permalink_url+'" target="_blank">'
                +  author_id
                +  '</a> '
                +  tweet.content.replace(/(\r\n|\r|\n)/g,'')
                +  ' <span class="timestamp">(' + tweet.date_alpha + ')</span>'
                +  '</li>';
        }
        if ( document.getElementById('topsy_trackbacks') ) {
            document.getElementById('topsy_trackbacks').innerHTML += html;
        }

        if ( topsy_got == 100 ) {
            // got max result
            document.getElementById('topsy_status').innerHTML = 'Show recent 100 tweets.';
        } 
        else if ( res.total > topsy_got ) {
            document.getElementById('topsy_got').innerHTML   = topsy_got;
            document.getElementById('topsy_total').innerHTML = res.total;
            // get entry_url
            var entry_url = document.getElementById('head-entry-link').href;
            var next_page = (topsy_got/10)+1;
            
            // Kick API
            var script  = document.createElement('script');
            script.type = 'text/javascript';
            script.src  = 'http://otter.topsy.com/trackbacks.js?callback=window.topsyCallback&url='+encodeURIComponent(entry_url)+'&page='+next_page;
            document.getElementsByTagName('head')[0].appendChild(script);
        } else {
            // finish loading
            document.getElementById('topsy_status').style.display = 'none';
        }
    }
    
    //------------------------------------------------------------
    // Controll
    //------------------------------------------------------------

    // Add Topsy Block
    var div  = d.createElement('div');
    div.innerHTML
        ='<h2>'
        +'<span>このエントリーを含むツイート <span class="count">(<em id="topsy_counter">?</em>)</span>'
        +'</h2>'
        +'<div class="curvebox-body">'
        +'<div id="topsy_status">Loading ... (<span id="topsy_got">0</span>/<span id="topsy_total">0</span>)</div>'
        +'<ul id="topsy_trackbacks" style="list-style:none;margin:0 0 5px 0;padding:0;"></ul>'
        +'<div style="text-align:right;">powered by <a href="http://topsy.com/" target="_blank">Topsy</a></div>'
        +'</div>'
        +'<div class="curvebox-bottom"><div></div></div>';
    d.getElementById('bookmarked_user').parentNode.parentNode.insertBefore(
        div,
        d.getElementById('bookmarked_user').parentNode.nextSibling.nextSibling
    );

    // get entry_url
    var entry_url = d.getElementById('head-entry-link').href;

    // Kick API
    var script  = d.createElement('script');
    script.type = 'text/javascript';
    script.src  = 'http://otter.topsy.com/trackbacks.js?callback=window.topsyCallback&url='+encodeURIComponent(entry_url);
    d.getElementsByTagName('head')[0].appendChild(script);

})();