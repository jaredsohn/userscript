// ==UserScript==
// @name           GameFAQs Post Preview+Link
// @author         Awesumness (GFAQS:Poo Poo Butter)
// @Notes          Enjoy.
// @include        http://www.gamefaqs.com/boards/genmessage*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var url = window.location.toString();
var pageNum;
var postsPerPage;
var page1;

  


$(document).ready(function() {

  if(pageNum = url.match(/page=\d+/i)){
    pageNum = parseInt(pageNum[0].match(/\d+/i)[0]);
    postsPerPage = (parseInt($("td.author").attr("id").match(/\d+/i)) - 1) / pageNum;
  }else{
    postsPerPage = 9001;
  }



  $('.message i > p > strong')
  .hover(imaGen)
  .mousemove(imaGen)
  .mouseout( function() {
    if(post){
      post.css({"display":"none"})
    }
  });
});


function imaGen(e) {
  boardNum = url.match(/board=\d+/i)[0].match(/\d+/i)[0];
  topicNum = url.match(/topic=\d+/i)[0].match(/\d+/i)[0];
  threadNum = $(this).attr("href");
  if(postNum = $(this).text().match(/#\d+/i)){
    postNum = postNum[0].match(/\d+/i)[0];
    post = $("body > [id='" + postNum + "awe']");

    if ( post.length < 1){
      $("body").append($("[id='p" + postNum + "'] + td").clone().attr("id",postNum+"awe"));
      post = $("body > [id='" + postNum + "awe']");
      page1 = "http://www.gamefaqs.com/boards/genmessage.php?board=" + boardNum + "&topic=" + topicNum + "&page=" + Math.floor(parseInt(postNum)/postsPerPage) + "#p" + postNum;
      if ( post.length < -3 ){
        $("body").append("<table id='" + postNum + "awe']></table>");
        $("body > [id='" + postNum + "awe']").load(page1 + " .author + td");
        $("body > [id='" + postNum + "awe'] td").slice(0,parseInt(postNum) - Math.floor(parseInt(postNum)/50)).remove();
        $("body > [id='" + postNum + "awe'] td").slice(1).remove();
        post = $("body > [id='" + postNum + "awe']");
      }
      post.css({
      "position":"fixed",
      "z-index":"9001",
      "background":"#250025",
      "border":"1px solid #FFF"});
      
      $(this)//.attr("title", page1)
      .click( function(){
        if( Math.floor(parseInt(postNum)/postsPerPage) == pageNum){
          window.location = url.replace(/#p\d*/i,'') + "#p" + postNum;
        }else{
          window.location = page1;
        }
      });
    }

    post.css({"display":"table"});

    

    x = e.pageX + 20 - window.pageXOffset;
    y = e.pageY + 20 - window.pageYOffset;
    post.css({
    "left":x,
    "top":y});
  }
}