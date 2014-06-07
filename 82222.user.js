// ==UserScript==
// @name           Reddit crosspost helper
// @namespace      tag:brainonfire.net,2010-07-25:reddit-crosspost
// @description    Add a "crosspost" link to the toolbar on posts to go to a pre-populated submission page. You will be prompted for a subreddit to post to.
// @include        *.reddit.com/r/*/comments/*
// @include        *.reddit.com/r/*/submit*type=*
// @license        EPL
// @version        1.2
// @changelog      Since 1.1: Work on https; work with query strings; change license to EPL
// ==/UserScript==

/** Run entire script inside page. From http://wiki.greasespot.net/Content_Scope_Runner */
if(typeof __PAGE_SCOPE_RUN__ == 'undefined') {
   (function page_scope_runner() {
      var script = document.createElement('script');
      script.setAttribute("type", "application/javascript");
      script.textContent = "(function() { var __PAGE_SCOPE_RUN__ = 'yes'; (" + page_scope_runner.caller.toString() + ")(); })();";
      document.documentElement.appendChild(script);
      document.documentElement.removeChild(script);
   })();
   return;
}

/*== Dispatch ==*/

//TODO: Don't require /r/foo URL structure? What about multis?
var re_post = /^https?:\/\/[a-z]+\.reddit\.com\/r\/[a-z0-9_]+\/comments\/([a-z0-9]+)\/[a-z0-9_]+\/(\?.*)?$/gi;
var is_post = re_post.exec(location.href);

var re_sub = /^https?:\/\/[a-z]+\.reddit\.com\/r\/[a-z0-9_]+\/submit.*[?&]type=(self|link)(&|$)/gi;
var is_sub = re_sub.exec(location.href);

if(is_post) {
   var thingID = is_post[1];
   addCrosspostLink();
} else if(is_sub) {
   var type_str = is_sub[1];
   submissionHelper();
}

/*== Case: Comments page ==*/

function addCrosspostLink() {
   $('<li><a href="javascript:void(0)">Cross-post</a></li>')
      .appendTo('#siteTable .thing .entry .buttons')
      .find('a')
      .click(grabMetadata);
}

function grabMetadata(ev) {
   $.getJSON('/comments/'+thingID+'/_/.json', undefined, goToSubmit);
}

function goToSubmit(data) {
   var data = data[0].data.children[0].data;
   var nextReddit = window.prompt("Crosspost to which subreddit?") || "";
   if(nextReddit == "") { return; }
   if(data.is_self) {
      var kv_type = "type=self";
      var kv_data = "text="+encodeURIComponent(data.selftext);
   } else {
      var kv_type = "type=link";
      var kv_data = "url="+encodeURIComponent(data.url);
   }
   var kv_title = "title="+encodeURIComponent(data.title+" [xpost/"+data.subreddit+"]");
   document.location = "/r/"+nextReddit+"/submit?"+kv_type+"&"+kv_title+"&"+kv_data;
}

/*== Case: Submit page ==*/

function submissionHelper() {
   var typeInfo = {'link': {tabdex:1, is_self: false, dataField:'#url-field input#url'},
                   'self': {tabdex:2, is_self: true,  dataField:'#text-field textarea[name=text]'}}[type_str];
   if($(typeInfo.dataField).size() === 0) {
      $('#text-desc, #link-desc').text("You can't "+type_str+"-post in this subreddit. Sorry. :-(")
                                 .css({'color': 'red', 'background-color': 'black', 'font-weight': 'bold'})
                                 .attr('id', "");
      return;
   }
   // Try switching to the appropriate tab, even if already there.
   setTimeout(function(){ $('#newlink .tabmenu > li:nth-child('+typeInfo.tabdex+') a').click(); }, 10);
   if(typeInfo.is_self) {
      injectSelfText(typeInfo.dataField);
   }
}

function injectSelfText(fieldPath) {
   self_data = document.location.search.match(/.*[?&]text=([^&]*).*$/);
   if(self_data) {
      $(fieldPath).text(decodeURIComponent(self_data[1]))
   }
}

