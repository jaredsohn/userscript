// ==UserScript==
// @name          Naxos Music Library to twitter
// @namespace     http://d.hatena.ne.jp/okamog/
// @include       http://library-chiyoda.ml.naxos.jp/album/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

(function() {

    var post_after = 5;

    function post_twitter(status){
      GM_xmlhttpRequest({
        method : 'POST',
        url: 'http://@twitter.com/statuses/update.json',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        data   : 'status=' + encodeURIComponent(status),
        onload : function(res) {
          GM_log('twittered!');
        },
        onerror: function(res) {
          var err = 'Failed - ' + res.status + ': ' + res.statusText;
          GM_log(err);
        },
      });
    }

    function start(){
      var title = '#nowplaying ' + $("#album-intro h2").html().replace(/^\s+|\s+$/g, "") + ' on NML';

        post_twitter(title);
    }

	$("#idAllPlay").bind("click", function(){
		setTimeout(start, post_after * 1000);
	});

	$("#idPlay").bind("click", function(){
		setTimeout(start, post_after * 1000);
	});

}());


