// ==UserScript==
// @name           Twitter yonda4 Icon for Profile
// @namespace      http://4kwh.net/
// @description    An icon on twitter profile indicating the user is using yonda4.
// @version        0.0.2
// @license        The MIT License: http://www.opensource.org/licenses/mit-license.php
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/#search?q=*
// @exclude        https://twitter.com/#search?q=*
// ==/UserScript==

//TODO:
//    animated popup appear/disappear

//HISTORY:
//    26-09-09 fixed not work on https
//    30-07-09 prettier popup
//    29-07-09 popup for display books (0.0.2)
//    25-07-09 first version

(function(realWindow) {
var $ = realWindow.jQuery;

//Popup Class
var y4Popup = function() {
    this.initialize.apply(this, arguments);
};
y4Popup.prototype = {
    trigerId: "",
    id: "",
    node: "",
    $pu: "",
    bookClass: "",
    tipClass: "",
    popupElem: "<div id='y4popup' style='display:none;position:absolute;z-index:1;'></div>",
    bookElem: "<div class='y4book'><a href='{HREF}' target='_y4'>{BOOK_NAME}</a></div>",
    tipElem: "<div class='y4tip'>{TIP}</div>",
    //each book data is hashed texts, and hash keys are; guid, link, title, description, pubDate, asin, user (27-07-09)
    books : [],
    initialize : function(books, max) {
        var self = this;
        
        this.$pu = $(this.popupElem);
        this.id = this.$pu.attr("id");
        this.bookClass = $(this.bookElem).attr("class");
        this.tipClass = $(this.tipElem).attr("class");

        this.$pu.append(this.tipElem.replace(/{TIP}/, "最新" + max + "件"));
        this.books = books;
        for(var cnt=0; cnt<this.books.length ; cnt++) {
            this.$pu.append(this.bookElem.replace(/{HREF}/, this.books[cnt].link).replace(/{BOOK_NAME}/, this.books[cnt].title));
        }
    },
    appear : function() {
        this.node.style.display = "block";
    },
    disappear : function() {
        this.node.style.display = "none";
    },
    addTriger : function(triger) {
        var self = this;
        
        $(triger).after(this.$pu);
        
        this.node = document.getElementById(this.id);
        $(triger).hover(function(){self.appear();}, function(){self.disappear();});
        $("#" + this.id).hover(function(){self.appear();}, function(){self.disappear();});
        $("." + this.bookClass).hover(function(){self.appear();}, function(){self.disappear();});
        $("." + this.tipClass).hover(function(){self.appear();}, function(){self.disappear();});
    }
};
GM_addStyle("div .y4book { background-color: #e8e8e8; border: 2px solid #B20404; font-size:x-large; }\
            div .y4tip { background-color: #B20404; color: #e8e8e8; text-align: right; }\
            div #y4popup { border: 2px solid #B20404; }");

//main
var maxBookNum = 20;
var beforeElemOnProfile = "h2.thumb";
var y4Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEWAAABGTyZaAAAADElEQVQImWNgIA0AAAAwAAFDlLdnAAAAAElFTkSuQmCC";
var y4TitleOnProfile = "Click to open yonda4.com user page.";
var y4Elem = "<div id='y4iconp'></div>";
var y4LinkElem = "<a id='y4' href='{HREF}' title='{TITLE}' target='_y4'><img id='y4icon' src='" + y4Icon + "'/></a>";
//GM_addStyle("a#y4:hover { border-bottom: 3px solid #B20404; }"); //under line when focus
//check if specified user is using yonda4, using REST API
//userName: string, callback: function(result, api data, yonda4 user url, error)
var hasBooksOnY4 = function(userName, callback) {
    var y4URL = "http://yonda4.com/user/" + userName;
    
    var errCb = function(res){
        console.log("Http request has failed with status: " + res.status + " " + resStatusText + " " + res.readyState);
        callback(false, false,"", true); //is it ok to return false as object?
    };
    
    var cb = function(res) {
        try {
            var resObj = eval("("+ res.responseText +")");
        } catch(e) { console.log(e); }

        if(resObj.value.items.length) callback(true, resObj, y4URL, false);
        else callback(false, resObj, "", false);
    };
    
    var y4API = "http://yonda4.com/api/user/" + userName + "?num=" + maxBookNum;
    GM_xmlhttpRequest({ //$.get and $.ajax method seems not working for cross domain.
		                  method: "GET",
		                  url: y4API,
		                  headers: {'User-Agent': 'Mozilla/5.0 (compatible) Greasemonkey',
			                        'Content-type': 'application/x-www-form-urlencoded'},
                          onerror: errCb,
		                  onload: cb
	                  });
};
var y4OnLoad = function() {
    var url = location.href;
    var lastStr = url.match(/https?:\/\/twitter\.com\/(\w*)/)[1];

    switch(lastStr) {
    case "home":
    case "":
        break;
    default: //profile page
        hasBooksOnY4(lastStr, function(result, data, url, error) {
                         if(result && !error) {
                             $(beforeElemOnProfile).after(
                                 $(y4Elem).append(y4LinkElem.replace(/{HREF}/, url).replace(/{TITLE}/, y4TitleOnProfile))
                             );
                             var pu = new y4Popup(data.value.items, maxBookNum);
                             pu.addTriger("#y4");
                         } else if(error) {
                             $(beforeElemOnProfile).append("<div id='y4iconp_error'>error</div>");
                         }
                     });
        break;
    }
};
$(window.setTimeout(y4OnLoad, 0)); //cant use GM_xmlhttpRequest in unsafeWindow

// jQuery Import Logic from "Endless Tweet" Thanks,
// get a reference to the jQuery object, even if it requires
// breaking out of the GreaseMonkey sandbox in Firefox
// (we need to trust Twitter.com)
})(typeof jQuery == "undefined" ? unsafeWindow : window);
