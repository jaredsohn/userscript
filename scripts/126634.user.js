// ==UserScript==
// @name           hatebu-show-b-comments
// @namespace      hatebu@basyura.org
// @description    show hatebu comments
// @resource       jquery    http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js 
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==

(function (w) {
/*
 *
 */
(function() { 
  var head   = document.getElementsByTagName('head')[0]; 
  var script = document.createElement('script');
  script.type = 'text/javascript'; 
  var jQuery   = GM_getResourceText('jquery');
  //var jQueryUI = GM_getResourceText('jqueryui'); 
  //script.innerHTML = jQuery + jQueryUI;
  script.innerHTML = jQuery;
  head.appendChild(script); 
  $ = w.$; 
})();
/* */ 
const JSON_API_URL  = "http://b.hatena.ne.jp/entry/json/";
/* */ 
const TORIGGER_KEY  = "m";
/* */ 
const SCROLL_UP_KEY = "M";
/* */ 
const ID_COMMENT    = "hatena_bookmark_comment";
/* */ 
const CONTENTS_WIDTH_RATE    = 0.8;
/* */ 
const CONTENTS_HEIGHT_RATE   = 0.6;
/* */ 
const CONTENTS_SCROLL_HEIGHT = 40;
/*
 *
 */
w.addEventListener('keypress', function(e) {
    var key = String.fromCharCode(e.charCode)
    if (key != TORIGGER_KEY && key != SCROLL_UP_KEY) {
      removeComment();
      return true;
    }
    // exist comment area
    if(isExistComment()) {
       var contents = getComment().find('#' + ID_COMMENT);
       if(contents.get(0).scrollHeight <= contents.scrollTop() + getContentsHeight()) {
            removeComment();
        }
        var sc_top = contents.scrollTop() + ((key == TORIGGER_KEY) ? CONTENTS_SCROLL_HEIGHT : (- CONTENTS_SCROLL_HEIGHT));
        contents.scrollTop(sc_top);
        return;
    }
    // no comment area
    // check url
    var current = w.Hatena.Bookmark.Navigator.instance.getCurrentElement();
    if (current === undefined) {
      return;
    }
    // hatebu url
    var url = current.childNodes[3].href;
    getComment().html(createCommentBody({"title":"loading ...","count":-1,"bookmarks":[]}));
    (function (link) {
        var opt = {
          method: 'GET',
          url: JSON_API_URL + link,
          onload: function(res){
            if(!isExistComment()) {
              return;
            }
            var text = "(" + res.responseText +")";
            var bm = text == "(null)" ? {"title":"no comment" , "count":-1,"bookmarks":[]} : eval(text);
            getComment().html(createCommentBody(bm));
          },
          onerror: function(res) {
          },
        }
        w.setTimeout(GM_xmlhttpRequest, 10, opt);
      })(url);
}, true);
// private methods
/*
 *
 */
function removeComment() {
  $('#' + ID_COMMENT).remove();
}
/*
 *
 */
function isExistComment() {
  return $('#' + ID_COMMENT).size() != 0
}
/*
 *
 */
function getComment() {
    var comment = $('#' + ID_COMMENT);
    if(comment.size() == 0) {
        comment = $("<div/>")
          .attr("id"     , ID_COMMENT)
          .attr("align"  , "center")
          .css("position", "absolute")
          .css("width"   , "100%")
          .css('z-index' , 999999)
          .css("top"     , ($(document.documentElement).scrollTop() + w.innerHeight / 8) + "px")
          .appendTo($(document.body));
    }
    return comment;
}
/*
 *
 */
function createCommentBody(bm) {
    
    var container = $('<div/>')
      .css('width'           , getContentsWidth() + 'px')
      .css('border'          , '1px solid #2C6EBD')
      .css('border-radius'   , '5px 5px 5px 5px')
      .css('padding'         , '2px')
      .css('background-color', '#2C6EBD');

    //----- title

    var title = $('<div/>')
      .css('color'  , '#ffffff')
      .css('padding', '5px')
      .attr('align' , 'left')
      .html('&nbsp;' + bm.title + '&nbsp;&nbsp;')
      .appendTo(container);

    if (bm.count > 0) {
      title.append($('<span/>')
        .css('background-color', '#FFCCCC')
        .css('color'           , '#FF0000')
        .css('font-size'       , '10pt')
        .css('padding'         , '2px')
        .css('border-radius'   , '5px 5px 5px 5px')
        .html(bm.count + ' users'));
    }

    //----- comments

    var comment_outer = $('<div/>')
      .attr('id'             , 'hatena_bookmark_comment')
      .attr('align'          , 'center')
      .css('height'          , getContentsHeight() + 'px')
      .css('overflow-y'      , 'auto')
      .css('background-color', '#f0f0f0')
      .css('border'          , '3px solid #2C6EBD')
      .css('font-size'       , '10pt')
      .appendTo(container);

    var comment = $('<div/>')
      .attr('align' , 'left')
      .css('width'  , '95%')
      .css('padding', '3px')
      .appendTo(comment_outer);

    var bookmarks = bm.bookmarks.reverse();
    var buf = [];
    for(var i = 0 ; i < bookmarks.length ; i++) {
        var b = bookmarks[i];
        if(b.comment == "") {
            continue;
        }
        buf.push("<img src='http://www.hatena.ne.jp/users/ba/" + b.user + "/profile_s.gif'>");
        buf.push("&nbsp;");
        buf.push("<span style='color:blue;'>" + b.user + "</span>");
        buf.push("&nbsp;" + b.comment + "&nbsp;" + b.timestamp);
        buf.push("<hr style='color:#c9f6ff;'>");
    }
    comment.html(buf.join(""));

    return container;
}
/*
 *
 */
function getContentsHeight() {
   return Math.floor(w.innerHeight * CONTENTS_HEIGHT_RATE);
}
/*
 *
 */
function getContentsWidth() {
   return Math.floor(w.innerWidth  * CONTENTS_WIDTH_RATE);
}

})(this.unsafeWindow || this);
