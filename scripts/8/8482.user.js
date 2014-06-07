// ==UserScript==
// @name           Undo new facebook redesign
// @namespace      znerp
// @description    undoes some of the recent changes; puts menu back on the left, sorts out the banner.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

foo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAWCAIAAAAqztkuAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYA" +
      "AICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAALVJREFUSEtj%2FP79OwOJoKx3L4k6GBiA1pAKclu2kIpGrSE1xIDqRwNt6ARaftsWq8gZyKiybydaxkLzTXn39v%2BooGHyHjQ1WJIAmj" +
      "WYmRcz0K7cfgm3CMjGVIDFmvT6DXCbgGxirClo3QK3BsgmyhqguXBrsJZDWJPA6cuPgTYBSayy2PNNTNkqoE1AknhrUqrXAa0BkiRYAzS9ado%2BXEUqrgTdMesgLqnRUmDolALE1KQj3jcAaCBIo4" +
      "ZrEHsAAAAASUVORK5CYII%3D"

sidebar = document.evaluate("//div[@id='sidebar_content']/div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
if (whatever = document.evaluate("//ul[@id='nav_unused_1' and @class='main_set']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
  sidebar.appendChild(whatever.parentNode.removeChild(whatever));

var css = "@namespace url(http://www.w3.org/1999/xhtml);"+
          "#sidebar ul.main_set { "+
          "  font-size: 11px!important;" +
          "  float: left!important;" +
          "  display: block!important;" +
          "  list-style: none!important;" +
          "  margin: 0px!important;" +
          "  padding: 0px!important; }" +
          "#sidebar .main_set li { "+
          "  float: left!important;" +
          "  display: block!important;" +
          "  margin: 0px 10px 0px 0px!important;" +
          "  font-weight: bold!important; }" +
          "#sidebar .main_set li a { "+
          "  padding: 3px 5px!important;" +
          "  line-height: 200% !important; }" +
          "#sidebar .app_list {" +
          "  padding-top: 0px; }" +
          "#sidebar .main_set li a.active, " +
          "#sidebar .main_set li a:hover, "+
          "#sidebar .app_list h3 a:hover { "+ 
          "  text-decoration: none !important;"+
          "  background: #6D84B4 !important;"+
          "  color: white !important; }" +
          "#sidebar .app_list h3 a {"+
          "  color:#3B5998 !important;"+
          "  text-decoration:none !important;}"+
          "#sidebar .main_set li a.edit_link, "+
          "#sidebar .app_list a.edit_apps { "+
          "  color: #999999 !important;" +
          "  font-weight: normal !important; }" +
          "#sidebar .main_set li a.edit_link:hover,"+
          "#sidebar .app_list a.edit_apps:hover { "+
          "  background: #6D84B4 !important;"+
          "  color: white !important; }" +
          "#sidebar .app_list a.edit_apps, "+
          "#sidebar .app_list h3 a {"+
          "  float: left !important; "+
          "  text-decoration: none !important; "+
          "  width: auto !important;"+
          "  padding: 3px 5px !important;}"+
          "#sidebar .main_set li a.global_menu_arrow," +
          "#sidebar .main_set li a.global_menu_arrow_active {" +
          "  position: relative !important;" +
          "  float: right !important;" +
          "  width: 13px !important;" +
          "  margin: -20px -4px 1px -2px !important;" +
          "  padding: 0px 0px 6px 4px !important;" +
          "  height: 16px !important;" +
          "  background: url('"+foo+"') no-repeat 0px center !important; }"+
          "#sidebar .main_set li a.global_menu_arrow_active {" +
          "  border-top: solid 1px #3B5998 !important;" +
          "  border-right: solid 1px #3B5998 !important; }" +
          "#sidebar .main_set li a.global_menu_arrow_active," +
          "#sidebar .main_set li a.global_menu_arrow:hover," +
          "#sidebar .main_set li a.global_menu_arrow_active:hover {" +
          "  background: #6D84B4 url('"+foo+"') no-repeat -17px center !important; }" +
          "#sidebar .navigator_menu {" +
          "  margin: -1px!important;" +
          "  position: absolute!important;" +
          "  z-index: 100!important;" +
          "  background: white!important;" +
          "  border: solid 1px #3b5998!important;}" +
          "#sidebar .navigator_menu.friends {" + 
          "  max-width: 140px!important;}" +
          "#sidebar .navigator_menu ul {" +
          "  font-size: 11px!important;" + 
          "  line-height: 1em!important;" +
          "  font-weight: normal!important;" +
          "  list-style: none!important;" +
          "  padding: 5px 0px!important;" +
          "  margin: 0px!important; }" +
          "#sidebar .navigator_menu li {" +
          "  float: none!important;" +
          "  cursor: pointer!important;" +
          "  font-weight: normal!important;" +
          "  padding: 0px!important;" +
          "  margin: 0px!important; }" +
          "#sidebar .navigator_menu li.menu_divider {" +
          "  display: block!important;" +
          "  margin: 4px 10px!important;" +
          "  font-size: 1px!important;" +
          "  line-height: 1px!important;" +
          "  cursor: default!important;" +
          "  border-bottom: solid 1px #eee!important; }" +
          "#sidebar .navigator_menu li a {" +
          "  display: block!important;" +
          "  color: #3b5998!important;" +
          "  border-right: solid 1px white!important;" +
          "  border-left: solid 1px white!important;" +
          "  padding: 4px 25px 4px 10px!important; "+
          "  line-height: 100% !important; }" +
          "#sidebar .navigator_menu a:hover {" +
          "  text-decoration: none!important;" +
          "  background: #3b5998!important;" +
          "  border-right: solid 1px #6d84b4!important;" +
          "  border-left: solid 1px #6d84b4!important;" +
          "  color: white!important; }" +
          "#sidebar #global_friends_link, " +
          "#sidebar #nav_inbox {" +
          "  display: -moz-inline-stack !important;" +
          "  display: inline-block !important;" +
          "  padding: 2px 3px 3px 5px !important;" +
          "  border-top: solid 1px #f7f7f7 !important;" +
          "  margin-right: 2px !important;" +
          "  line-height: 13px !important; }" +
          "#sidebar #global_friends_link:hover, " +
          "#sidebar #nav_inbox:hover {" +
          "  background: #6D84B4 !important;" +
          "  color: white !important;" +
          "  text-decoration: none !important; }" +
          "#sidebar #global_friends_link.active," +
          "#sidebar #global_friends_link.active:hover, " +
          "#sidebar #nav_inbox.active, " +
          "#sidebar #nav_inbox.active:hover {" +
          "  position: relative !important;" +
          "  background: #6D84B4 !important;" +
          "  color: white !important;" +
          "  margin-right: 1px !important;" +
          "  left: -1px !important; " +
          "  text-decoration: none !important;" +
          "  border-top: solid 1px #3B5998 !important;" +
          "  border-left: solid 1px #3B5998 !important; }" +
          "#sidebar .global_menu_arrow span," +
          "#sidebar .global_menu_arrow_active span {" +
          "  text-indent: -99px !important;" +
          "  display: none !important; }" +

          /** 
           * Code to make 'Photos', 'Notes', etc. go blue on mouseover.
           * Not sure I like it though, so it's commented out.
           * Remove comments as per your taste.
          **/

          /*
          "#sidebar_content .container:hover a {" +
          "  background-color: #6D84B4 !important;"+
          "  color: white !important;"+
          "  text-decoration: none !important;"+
          "  padding-right: 3px !important;"+
          "  width: auto !important; "+
          "  display: inline !important; }" +
          */

          // End of commented code.

          "#navigator {"+
          "  background: transparent !important;" +
          "  background-color: #3b5998 !important;" +
          "  height: 37px !important;" +
          "  width: 648px !important;" +
          "  position: relative !important;" +
          "  border-bottom: 5px solid #6D84B4 !important;" +
          "  border-right: 1px solid #e5e5e5 !important; }"+
          "#new_stuff_content, #new_stuff_non_content, .nextstep, .divider_bar, .invitefriends, .more_section, #ssponsor, .rooster_story, .social_ad {"+
          "  display: none !important; }"+
          "#expandable_more {"+
          "  display: block !important; "+
          "  padding-top: 0px !important; }" +
          "#sidebar { border-bottom: 1px solid #DDDDDD; border-left: 1px solid #E5E5E5; }" +
          "#sidebar_content { border-bottom: 1px solid #3B5998; border-left: 1px solid #B7B7B7; margin-bottom: 0px; }" +
          "#book { width: 800px !important; }";

if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.innerHTML = css;
    heads[0].appendChild(node);
  }
}

window.addEventListener(
  'load',
  function(event) {
    widebarHeight = document.defaultView.getComputedStyle(document.getElementById("widebar"),null).getPropertyValue("height").match(/\d+/)[0];
    sidebarHeight = document.defaultView.getComputedStyle(document.getElementById("sidebar"),null).getPropertyValue("height").match(/\d+/)[0];
    if (widebarHeight - 15 > sidebarHeight) {
      document.getElementById("sidebar").style.height =  widebarHeight - 61 + 'px';
      document.getElementById("sidebar_content").style.height = widebarHeight - 116 + 'px';
      window.addEventListener(
        'mouseup',
        function(event) {
          window.setTimeout(
            function() {
              widebarHeight = document.defaultView.getComputedStyle(document.getElementById("widebar"),null).getPropertyValue("height").match(/\d+/)[0];
              document.getElementById("sidebar").style.height =  widebarHeight - 61 + 'px';
              document.getElementById("sidebar_content").style.height = widebarHeight - 116 + 'px';
            },
            5);
        },
        'false');
    } else {
      document.getElementById("page_body").style.height =  '100%';
      document.getElementById("page_body").style.background =  '#F7F7F7 none repeat scroll 0%';
      document.getElementById("content_shadow").style.height =  '100%';
      document.getElementById("content").style.height =  '100%';
      document.getElementById("widebar").style.height =  sidebarHeight - 56 + 'px';
    }
  },
  'false');
