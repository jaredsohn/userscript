// ==UserScript==
// @name           LDR2Twitter
// @namespace      http://creazy.net/
// @description    Add Tweet This button behind entry dates on livedoor Reader
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==

(function(){
    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;

    w.twitter = function(tid) {
        document.getElementsByTagName('body')[0].setAttribute('tid',tid);
        var bitly_id  = 'ldr2twitter';
        var bitly_key = 'R_b1cf0ebeeecc0096ac2ce416462db4a4';
    
        var h = document.getElementById('head_'+tid);
        w.console.log(w.twitter_post_id);
        w.console.log(h.getElementsByTagName('a')[0].href);
        w.console.log(h.getElementsByTagName('a')[0].innerHTML);

        var api
            = 'http://api.bit.ly/shorten'
            + '?version=2.0.1'
            + '&format=json'
            + '&callback=twitterCallback'
            + '&login=' + bitly_id
            + '&apiKey=' + bitly_key
            + '&longUrl=' + encodeURIComponent(h.getElementsByTagName('a')[0].href);
            
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = api;
        document.body.appendChild(script);
    }
    w.twitterCallback = function(json) {
        var w = window;
        var d = document;
        var l = location;
        var h = document.getElementById('head_'+d.getElementsByTagName('body')[0].getAttribute('tid'));
        var u = json.results[h.getElementsByTagName('a')[0].href]['shortUrl'];

        var pre = 'Reading: ';
        var sep = ' ';
        var suf = ' #LDR';
    
        var title = h.getElementsByTagName('a')[0].innerHTML;
        title = title.replace("&lt;br /&gt;"," ");
        title = title.substring(0,140-(pre+sep+u+suf).length);
        var link
            = 'http://twitter.com/home/'
            + '?status=' + encodeURIComponent( pre+title+sep+u+suf );
        w.open(link,'_blank');
    }
    w.entry_widgets.add('hb_counter', function(feed, item){
        return '<span onclick="twitter(' + item.id + ');" style="color:#00f;text-decoration:underline;cursor:pointer;">Tweet This</span>';
    }, '');

})();