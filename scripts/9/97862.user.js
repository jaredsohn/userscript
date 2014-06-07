// ==UserScript==
// @name           MeFi Notepad
// @namespace      A-thanatos
// @description    Helps you keep track of posts you want to make and questions you want to ask later
// @include        http://s*.gr.ikariam.com/*
// ==/UserScript==
//
// DONE 2010-03-15:
// * Support MeFi blue
//
// TODO:
// * Growable textarea
//

var posttype = "post";
if (location.host.indexOf("ask") == 0) posttype = "question";

String.prototype.ucFirst = function () {
    return this.substr(0,1).toUpperCase() + this.substr(1,this.length);
};

//
// aqp_init()
//
function aqp_init() {
    
    var url = location.pathname;

    if (url.indexOf('/contribute/post') == 0) {
        // Post form - show ideas under "Posting as"
        aqp_initpost();

        // Show the add question to pad form
        aqp_refreshlist();
    }

    // Modify the "New question" link in the header to
    // show the number of questions on the pad
    aqp_updateheader();
}

//
