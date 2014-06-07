// ==UserScript==
// @name       Tweet Id Extract
// @namespace  http://blueblueblue.fool.jp/wp/archives/3376
// @version    1.0
// @description  ID of an open tweet is extracted
// @include    http://twitter.com/*
// @include    https://twitter.com/*
// @include    http://twilog.org/*
// @copyright  2012+, ebi
// ==/UserScript==

(function (loadedListener) {
    var doc, readyState;
  
    doc = document;
    readyState = doc.readyState;
  
    if (readyState === 'complete' || readyState === 'interactive') {
      loadedListener();
    } else {
      doc.addEventListener("DOMContentLoaded", loadedListener, false);
    }
})

(function() {
    function unique(array) {
        var storage = {};
        var uniqueArray = [];
        var i, value;
        for (i = 0; i < array.length; i++) {
            value = array[i];
            if (!(value in storage)) {
                storage[value] = true;
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
    }
    
    var _doc = document;
    var i;
        typeJSON = [ {"service":" for WP Quote Tweets"  ,"opt_h":"[quotetweet tweetid=" ,"opt_f":"]"} ,
                     {"service":" for WP BlackBirdPie"  ,"opt_h":"[blackbirdpie id="    ,"opt_f":"]"} ,
                     {"service":" for Hatena"           ,"opt_h":"[twitter:"            ,"opt_f":"]"} ,
                     {"service":" for HTML"             ,"opt_h":""                     ,"opt_f":"" } ,
                     {"service":""                      ,"opt_h":""                     ,"opt_f":"" }
                   ];

    var style = _doc.createElement("style");
    style.type = "text/css";
    style.innerHTML = "li.open {" +
                      "  border-right: solid 10px #fc9999 !important;" +
                      "}" +
                      "div#us-tweet-id-extract-result{" +
                      "  display: none;" +
                      "  background: #fcfcfc;" +
                      "  width: 400px; height: 300px;" +
                      "  border: solid 5px #cccccc;" +
                      "  position: fixed;" +
                      "  right: 20px; bottom: 20px;" +
                      "  padding: 0; margin: 0;" +
                      "}" +
                      "div#us-tweet-id-extract-result textarea.user{" +
                      "  width: 390px; height: 20px;" +
                      "  padding: 0; margin: 0;" +
                      "}" +
                      "div#us-tweet-id-extract-result textarea.data{" +
                      "  width: 390px; height: 240px;" +
                      "  padding: 0; margin: 0;" +
                      "}" +
                      "div#us-tweet-id-extract-result div{" +
                      "  display: inline;" +
                      "  float: right;" +
                      "  border: solid 1px #888888;" +
                      "  padding: 0px 5px; margin: 0;" +
                      "  text-align: center;" +
                      "  cursor: pointer;" +
                      "}" +
                      "div#us-tweet-id-extract-twilog{" +
                      "  width: 150px;" +
                      "  position: fixed;" +
                      "  top: 50px;" +
                      "  right: 5px;" +
                      "  padding: 0px 5px; margin: 0;" +
                      "  text-align: center;" +
                      "}";
    _doc.getElementsByTagName("head")[0].appendChild(style);

    var elem = _doc.createElement("div");
    elem.id = "us-tweet-id-extract-result";
    var elem_child = _doc.createElement("textarea");
    elem_child.id = "us-tweet-id-extract-result-user";
    elem_child.className = "user";
    elem.appendChild(elem_child);
    var elem_child = _doc.createElement("textarea");
    elem_child.id = "us-tweet-id-extract-result-data";
    elem_child.className = "data";
    elem.appendChild(elem_child);
    var elem_child = _doc.createElement("div");
    elem_child.innerHTML = "close";
    elem_child.onclick = function(){
        _doc.getElementById("us-tweet-id-extract-result").style.display = "none";
    }
    elem.appendChild(elem_child);
    var elem_child = _doc.createElement("div");
    elem_child.innerHTML = "reverse";
    elem_child.onclick = function(){
        var tmpArray = _doc.getElementById("us-tweet-id-extract-result-data").value.split(/\n|\r|\n\r/g);
        _doc.getElementById("us-tweet-id-extract-result-data").value = tmpArray.reverse().join("\n");
    }
    elem.appendChild(elem_child);
    _doc.getElementsByTagName("body")[0].appendChild(elem);

    var ul = _doc.getElementsByTagName("ul");
	if ( location.href.indexOf("http://twilog.org", 0) !== -1 ) {
	    var nav = _doc.createElement("div");
		nav.id = "us-tweet-id-extract-twilog";
	    _doc.getElementsByTagName("body")[0].appendChild(nav);
	} else {
	    for ( i = 0; i < ul.length; i++ ) {
	        if ( (" " + ul[i].className + " ").indexOf(" nav ", 0) !== -1 ) {
	            var nav = ul[i].getElementsByTagName("ul")[0];
	        }
	    }
	}
    var elem = _doc.createElement("li");
    elem.className = "divider";
    nav.appendChild(elem);

    for (i = 0; i < typeJSON.length; i++ ) {
        var elem = _doc.createElement("li");
        var elem_child = _doc.createElement("a");
        elem_child.class = "us-tweet-id-extract-call";
        elem_child.href = "#";
        elem_child.innerHTML = "Id Extract" + typeJSON[i].service;
        elem_child.setAttribute("data-header-text", typeJSON[i].opt_h);
        elem_child.setAttribute("data-footer-text", typeJSON[i].opt_f);
        if ( typeJSON[i].service !== " for HTML" ) {
            elem_child.onclick = function() {
                input_textarea(this.getAttribute("data-header-text"),this.getAttribute("data-footer-text"));
            }
        } else {
            elem_child.onclick = function() {
                input_textarea_html(this.getAttribute("data-header-text"),this.getAttribute("data-footer-text"));
            }
        }
        elem.appendChild(elem_child);
        nav.appendChild(elem);
    }
    
    function input_textarea( opt_h, opt_f ) {
        _doc = document;
		if ( location.href.indexOf("http://twilog.org", 0) !== -1 ) {
			var get_class = "tl-tweet";
			var get_id = "id";
			var get_split = "tw";
			var get_split_num = 1;
		} else {
			var get_class = "stream-item open";
			var get_id = "data-item-id";
			var get_split = "_";
			var get_split_num = 0;
		}
        var elm = _doc.getElementsByClassName(get_class);
        var id_list = new Array();
        var username_list = new Array();
        for ( i = 0; i < elm.length; i++ ) {
            id_list.push( elm[i].getAttribute(get_id).split(get_split)[get_split_num] );
			if ( location.href.indexOf("http://twilog.org", 0) == -1 ) {
	            sub_elm = elm[i].getElementsByClassName("original-tweet");
	            if ( sub_elm.length < 0 ) {
	                sub_elm = elm[i].getElementsByClassName("username");
	            } else {
	                sub_elm = sub_elm[0].getElementsByClassName("username");
	            }
	            username_list.push (sub_elm[0].innerText.replace("@", "") );
			}
        }
        username_list = unique(username_list);
        id_list = unique(id_list).sort( function(a,b) {return a-b;} );
        _doc.getElementById("us-tweet-id-extract-result").style.display = "block";
        _doc.getElementById("us-tweet-id-extract-result").getElementsByTagName("textarea")[0].value = "@" + username_list.join(" @");
        _doc.getElementById("us-tweet-id-extract-result").getElementsByTagName("textarea")[1].value = opt_h + id_list.join(opt_f + "\n" + opt_h) + opt_f;
    }

    function input_textarea_html( opt_h, opt_f ) {
        _doc = document;
        var elm = _doc.getElementsByClassName("stream-item open");
        var sub_elm, timestamp, avatar, fullname, username, tweet, str;
        var str_list = new Array();
        var username_list = new Array();
        for ( i = 0; i < elm.length; i++ ) {

            tweet_elm = elm[i].getElementsByClassName("original-tweet");
            if ( tweet_elm.length < 0 ) {
                tweet_elm = elm[i];
            } else {
                tweet_elm = tweet_elm[0];
            }

            sub_elm = tweet_elm.getElementsByClassName("tweet-timestamp");
            timestamp = sub_elm[0].getAttribute("title");

            sub_elm = tweet_elm.getElementsByClassName("avatar");
            avatar = sub_elm[0].getAttribute("src");
            
            sub_elm = tweet_elm.getElementsByClassName("fullname");
            fullname = sub_elm[0].innerText;
            
            sub_elm = tweet_elm.getElementsByClassName("username");
            username = sub_elm[0].innerText.replace("@", "");
            
            sub_elm = tweet_elm.getElementsByClassName("js-tweet-text");
            tweet = sub_elm[0].innerHTML.replace(/<s>|<\/s>/g, "").replace(/href=\"\//g, "href=\"https://twitter.com/");

            str = "<div class=\"tweet-id-extract-wrapper\">" +
                  "<div class=\"tweet-id-extract-left\">" +
                  "<img class=\"avatar\" src=\"" + avatar + "\" />" +
                  "</div>" +
                  "<div class=\"tweet-id-extract-right\">" +
                  "<div class=\"tweet-id-extract-name\">" +
                  "<strong class=\"fullname\" /><a href=\"https://twitter.com/#!/" + username + "\">" + fullname + "</a></strong>" +
                  "<span class=\"username\" />@" + username + "</span>" +
                  "</div>" +
                  "<div class=\"tweet-id-extract-tweet\">" +
                  "<span class=\"tweet-text\">" + tweet + "</span>" +
                  "</div>" +
                  "<div class=\"tweet-id-extract-footer\">" +
                  "<span class=\"timestamp\">" + timestamp + "</span>" +
                  "</div>" +
                  "</div>" +
                  "</div>";
            str_list.push( str );
            username_list.push( username );

        }
        username_list = unique(username_list);
        _doc.getElementById("us-tweet-id-extract-result").style.display = "block";
        _doc.getElementById("us-tweet-id-extract-result").getElementsByTagName("textarea")[0].value = "@" + username_list.join(" @");
        _doc.getElementById("us-tweet-id-extract-result").getElementsByTagName("textarea")[1].value = str_list.join("\n");
    }

})();
