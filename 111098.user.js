// ==UserScript==
// @name           DownNicoComment
// @namespace      http://www12.atpages.jp/~lottz/pukiwikiplus
// @include        http://www.nicovideo.jp/watch/*
// @author    lottz
// @version   0.0.1
// ==/UserScript==



(function(){

//====================
/// Constants.
//====================
 
 
// The URL of API to get comment.
const API_URL_BASE = "http://www.nicovideo.jp/api/getflv/";

// The URL of API to get the thread key to get channel comment.
const channel_comment_url = "http://flapi.nicovideo.jp/api/getthreadkey?thread=";

//====================
/// Functions.
//====================

/**
 *  The method to get the channel comment.
 * 
 * */
function get_channel_comment(comment_url, thread_id, user_id, org_url, title){

    GM_xmlhttpRequest({
      method: 'POST',
      headers: {
          'Content-Type': 'text/xml'
      },
      url: channel_comment_url + thread_id,
      onload: function(responseDetails) {
        if(responseDetails.status != 200){
          alert('unexpected response code:' + responseDetails.status + ' ' + responseDetails.statusText);
          return;
        }
        var param = parse_response(responseDetails.responseText);
        get_comment(comment_url, thread_id, user_id, org_url, title, param.threadkey, param.force_184);
      },
      onerror: function(e){
        alert(e);
      }
    }); // GM_xmlhttpRequest({

} // eof


/**
 * The method to get the comment and save that comment to the xml file.
 * If the comment is empty, this method trying to get the channel comment.
 * If the parameter threadkey is specified, this method trying to get the channel comment instead of usual comment.
 * */
function get_comment(comment_url, thread_id, user_id, org_url, title, threadkey, force_184){

  var bChannelComment = threadkey ? true : false;
  var version = "20090904";

  // Set the default force_184 param.
  if(bChannelComment && ( force_184 == undefined || force_184 == null || force_184 == "")){
    force_184 = "1";
  }

  comment_url = comment_url.replace(/%3A/g,":");
  comment_url = comment_url.replace(/%2F/g,"/");

    GM_xmlhttpRequest({
      method: 'POST',
      headers: {
          'Content-Type': 'text/xml'
      },
      url: comment_url,
// Switch the destination by bChannelComment flag.
      data: bChannelComment ? 
        "<packet>"+
        "<thread thread=" + q(thread_id) + " version=" + q(version) + " user_id=" + q(user_id) + " threadkey=" + q(threadkey) + " force_184=" + q(force_184) + " />" + 
        "<thread_leaves thread=\"" +thread_id+"\" user_id=\"" +user_id+"\" threadkey=\"" + threadkey + "\" force_184=\"" + force_184 + "\"  >0-41:100,1000</thread_leaves></packet>"
        : "<packet><thread_leaves thread=\"" +thread_id+"\" user_id=\"" +user_id+"\">0-41:100,1000</thread_leaves></packet>",

      onload: function(responseDetails) {
        if(responseDetails.status != 200){
          alert('unexpected response code:' + responseDetails.status + ' ' + responseDetails.statusText);
          return;
        }
        var res = responseDetails.responseText;
        var pre = res.substring(0,res.lastIndexOf("</packet>"));
        // If the comments not found.

        if(res.indexOf("</chat>") == -1 && ! bChannelComment) {
          // Trying to get channel comment.
          GM_log("chat tags not found in the normal comment and trying to get channel comment.");
          get_channel_comment(comment_url, thread_id, user_id, org_url, title);
          return;
        }

        // Save the comment to the local file.
        location.href = 'data:application/octet-stream,' + encodeURIComponent(pre + "\n<meta url=\"" + org_url + "\" title=\"" + title + "\" />\n</packet>\n");
      },
      onerror: function(e){
        alert(e);
      }
    }); // GM_xmlhttpRequest({
} // eof


//====================
/// Utility functions.
//====================

// Quote the passed param and return.
function q(s){
  return "\"" + s + "\"";
}

// Parse url param.
function parse_response(res){
  var obj=new Object();
  var pairs = res.split('&');

  for(var idx in pairs){
    var pair = pairs[idx].split('=');
    obj[pair[0]] = pair[1];
  }
  return obj;
} // eof


// Add the user script menu.
GM_registerMenuCommand('Download Comment',function(){

    var urlArr = location.href.split('/');
    var tailElem = urlArr[urlArr.length -1];

    // Trying to get normal commnent using comment API.
    GM_xmlhttpRequest({
      method: 'GET',
      url: API_URL_BASE + tailElem,
      onload: function(responseDetails) {
        if(responseDetails.status != 200){
          alert('unexpected response code:' + responseDetails.status + ' ' + responseDetails.statusText);
          return;
        }
        var param = parse_response(responseDetails.responseText);
        get_comment(param.ms, param.thread_id, param.user_id,location.href, document.title);
      },
      onerror: function(e){
        alert(e);
      }
    });

}); // GM_registerMenuCommand('Download Comment',function(){

}
)();
