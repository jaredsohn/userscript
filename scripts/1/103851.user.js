// ==UserScript==
// @name                Gmail
// @namespace        http://brianliu.net
// @include            http://mail.google.com/*
// @include            https://mail.google.com/*
// @require            https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require            https://use.typekit.com/cmf5exx.js
// ==/UserScript==

/*

body {
  font-family: arial, san-serif;
  font-size: 14px;
}

a {
  text-decoration: none;
  color: #000000;
}

#newComponents {
  clear: both;
  margin: 10px;
}

#newEmailButton {
   background: url("https://cdn-gmail.appspot.com/images/button.png") no-repeat scroll center center transparent;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: bold;
  height: 38px !important;
  line-height: 38px;
  padding: 4px 0px;
  text-align: center;
  width: 110px !important;
  float: left;
  cursor: pointer;
}

#searchBar {
  background: url("https://cdn-gmail.appspot.com/images/searchbar.png") no-repeat scroll 0 0 transparent;
  padding: 3px;
  margin: 10px;
  float: left;
}

#searchInput {
  border-style: none;
  font-size: 12px;
  width: 166px;
}

#searchButton {
  background: url("https://cdn-gmail.appspot.com/images/magnifying_glass.png") no-repeat scroll center center transparent;
  float: right;
  height: 22px;
  padding-right: 10px;
  width: 20px;
}

#navBar {
  clear: both;
  padding: 20px 0px;
  vertical-align: center;
  height: 40px;
}

#mainBox {
  font-size: 16px;
  font-weight: bold;
  float: left;
  line-height: 42px;
}
  
#tags {
  clear: both;
  font-size: 14px;
}

.leftnav {
  float: left;
  width: 110px;
  text-align: center;
  margin-right: 10px;
}

.rightnav {
  float: left;
}

.tag {
  cursor: pointer;
}

#dateBox {
  background: url("https://cdn-gmail.appspot.com/images/date.png") no-repeat scroll center center transparent;
  float: left;
  height: 40px;
  width: 40px;
  font-size: 12px;
  line-height: 17px;
  padding-top: 5px;
  text-align: center;
}

#month {
  color: #FFFFFF;
}

#date {
  color: #626169;  
}

#progressBar {
  background: url("https://cdn-gmail.appspot.com/images/progress_container.png") no-repeat scroll 0 0 transparent;
  width: 112px;
  height: 22px;
  float: left;
  margin: 10px 20px;
  text-align: center;
  font-size: 12px;
  line-height: 23px;
  color: #626169;
}

#progress {
  background: url("https://cdn-gmail.appspot.com/images/progress.png") no-repeat scroll 0 0 transparent;
  height: 22px;
  width: 40%;
  overflow: hidden;
  margin-top: -23px;
}

.mail {
  width: 300px;
  padding: 10px;
  margin-bottom: 30px;
}

.read {
  background-color: #ccccff;
}

.mail_meta {
  margin-bottom: 20px;
}

.sender {
  float: left;
  font-weight: bold;
}

.time {
  float: right;
  color: #626169;
  font-size: 12px;
}

.title {
  clear: both;
}

.message {
  clear: both;
  color: #626169;
}

iframe {
  border-style: none;
}

*/

(function() {
var new_css = ' body { font-family: arial, san-serif; font-size: 14px; } a { text-decoration: none; color: #000000; } #newComponents { clear: both; margin: 10px; } #newEmailButton { background: url("https://cdn-gmail.appspot.com/images/button.png") no-repeat scroll center center transparent; color: #FFFFFF; font-size: 13px; font-weight: bold; height: 38px !important; line-height: 38px; padding: 4px 0px; text-align: center; width: 110px !important; float: left; cursor: pointer; } #searchBar { background: url("https://cdn-gmail.appspot.com/images/searchbar.png") no-repeat scroll 0 0 transparent; padding: 3px; margin: 10px; float: left; } #searchInput { border-style: none; font-size: 12px; width: 166px; } #searchButton { background: url("https://cdn-gmail.appspot.com/images/magnifying_glass.png") no-repeat scroll center center transparent; float: right; height: 22px; padding-right: 10px; width: 20px; } #navBar { clear: both; padding: 20px 0px; vertical-align: center; height: 40px; } #mainBox { font-size: 16px; font-weight: bold; float: left; line-height: 42px; } #tags { clear: both; font-size: 14px; } .leftnav { float: left; width: 110px; text-align: center; margin-right: 10px; } .rightnav { float: left; } .tag { cursor: pointer; } #dateBox { background: url("https://cdn-gmail.appspot.com/images/date.png") no-repeat scroll center center transparent; float: left; height: 40px; width: 40px; font-size: 12px; line-height: 17px; padding-top: 5px; text-align: center; } #month { color: #FFFFFF; } #date { color: #626169;  } #progressBar { background: url("https://cdn-gmail.appspot.com/images/progress_container.png") no-repeat scroll 0 0 transparent; width: 112px; height: 22px; float: left; margin: 10px 20px; text-align: center; font-size: 12px; line-height: 23px; color: #626169; } #progress { background: url("https://cdn-gmail.appspot.com/images/progress.png") no-repeat scroll 0 0 transparent; height: 22px; width: 40%; overflow: hidden; margin-top: -23px; } .mail { width: 300px; padding: 10px; margin-bottom: 30px; } .read { background-color: #ccccff; } .mail_meta { margin-bottom: 20px; } .sender { float: left; font-weight: bold; } .time { float: right; color: #626169; font-size: 12px; } .title { clear: both; } .message { clear: both; color: #626169; } iframe { border-style: none; }';
var loadCSS = function(css) {
  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
    console.log("css : GM_addStyle");
  } else if (typeof addStyle != "undefined") {
    addStyle(css);
    console.log("css : addStyle");
  } else {
    var heads = document.getElementsByTagName("head");
    console.log("css : head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }
}
loadCSS(new_css);
})();

/*

functionality / links

compose - .z0 > .J-Zh-I.J-J5-Ji.L3 https://mail.google.com/mail/?ui=2&shva=1#compose
inbox - #:r3.z9.z8 https://mail.google.com/mail/?hl=en&shva=1#inbox
contacts - #"r2.z9.ou https://mail.google.com/mail/?hl=en&shva=1#contacts
tasks - #:r1.T3

advanced search - toxOdd:first-child https://mail.google.com/mail/?hl=en&shva=1#advanced-search/from=sdf&subset=all&within=1d
filter - toxOdd:last-child create-filter https://mail.google.com/mail/?hl=en&shva=1#create-filter/from=dsf
search - https://mail.google.com/mail/?hl=en&shva=1#searc
*/

setTimeout(function() {
    try{Typekit.load();}catch(e){};
    $(".cP").append('<div id="newComponents">' +
        '<a href="mail/?ui=2&shva=1#compose">' +
          '<div id="newEmailButton" class="newButton">' +
            'New Email' +
          '</div>' +
        '</a>' +
        '<div id="searchBar">' +
          '<input type="text" id="searchInput"></input>' +
          '<div id="searchButton"></div>' +
        '</div>' +
        '<div id="navBar">' +
          '<a href="?hl=en&shva=1#inbox">' +
            '<div id="mainBox" class="leftnav">All Email</div>' +
          '</a>' +
          '<div id="dateBox"><span id="month">Mar</span><br /><span id="date">25</span></div>' +
          '<div id="progressBar">' + 
            '42/100 Read' +
            '<div id="progress">' + 
            '</div>' +
          '</div>' +
        '</div>' +
        '<div id="tags" class="leftnav">' +
          '<a href="mail/?ui=2&shva=1#drafts">' +
            '<div class="tag">Sent Email</div>' +
          '</a>' +
          '<a href="mail/?ui=2&shva=1#compose">' +
            '<div class="tag">Drafts</div>' +
          '</a>' +
        '</div>' +
        '<div id="preview" class="rightnav">' +
          '<a target="mail" href="mail/?hl=en&shva=1#inbox/130325b832ac87b1">' +
            '<div class="mail read">' +
              '<div class="mail_meta">' +
                '<div class="sender">' +
                  'Tom Waits' +
                '</div>' +
                '<div class="time">' +
                  'Today 3:43pm' +
                '</div>' +
                '<div class="title">' +
                  'Thanks for your letter' +
                '</div>' +
              '</div>' +
              '<div class="message">' +
                'Your sister has great taste, and you as well. Now go seize the world by storm...' +
              '</div>' +
            '</div>' +
          '</a>' +
          '<a target="mail" href="mail/?hl=en&shva=1#inbox/130325b832ac87b1">' +
            '<div class="mail">' +
              '<div class="mail_meta">' +
                '<div class="sender">' +
                  'Tom Waits' +
                '</div>' +
                '<div class="time">' +
                  'Today 3:43pm' +
                '</div>' +
                '<div class="title">' +
                  'Thanks for your letter' +
                '</div>' +
              '</div>' +
              '<div class="message">' +
                'Your sister has great taste, and you as well. Now go seize the world by storm...' +
              '</div>' +
            '</div>' +
          '</a>' +
          '<a target="mail" href="mail/?hl=en&shva=1#inbox/130325b832ac87b1">' +
            '<div class="mail">' +
              '<div class="mail_meta">' +
                '<div class="sender">' +
                  'Tom Waits' +
                '</div>' +
                '<div class="time">' +
                  'Today 3:43pm' +
                '</div>' +
                '<div class="title">' +
                  'Thanks for your letter' +
                '</div>' +
              '</div>' +
              '<div class="message">' +
                'Your sister has great taste, and you as well. Now go seize the world by storm...' +
              '</div>' +
            '</div>' +
          '</a>' +
        '</div>' +
        '<div id="mail" class="rightnav">' +
          '<iframe name="mail" class="rightnav"></iframe>' +
        '</div>' +
    '</div>');    
}, 3000);
