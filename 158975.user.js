// ==UserScript==
// @name         XPLR Reddit Recommender
// @namespace    https://xplr.com/
// @version      0.1
// @description  Get recommended subreddits for the subreddit you are in
// @match        http://*reddit.com/r/*
// @copyright    2012+, Xplr
// @domain       http://demo.xplr.com
// ==/UserScript==

function populateRecommendedBox(reddits) {

  var recommenderBox = document.getElementById("xplr_list"),
      content = "";

  recommenderBox.innerHTML = "";

  for(i = 0; i < reddits.length; i++) {
    content += "<li style='display:inline-block;padding:2px 5px;'><a href='/r/" + reddits[i] + "'>" + reddits[i] + "</a></li>";
  }

  recommenderBox.innerHTML = content;
}

function fetchRecommendedReddits() {

  var reddit = window.location.pathname.split('/')[2].toLowerCase();

  GM_xmlhttpRequest({
    method: "GET",
    headers: {"Accept": "application/json"},
    url: "http://demo.xplr.com/xplr/rreddit/topics.php?searchtags=*.*&timefilter=all&format=json&insubreddit=" + reddit,
    onload: function(res) {
      var reddits = eval('(' + res.responseText + ')').recommended_reddit;
      if(reddits.length > 0) {
        populateRecommendedBox(reddits);
      } else {
        document.getElementById("xplr_list").innerHTML = "<li>No recommended subreddit found.</li>";
      }
    }
  });

}

function buildRecommenderBox() {

  var recommenderBox = document.createElement("div");

  recommenderBox.setAttribute("class", "spacer");
  recommenderBox.innerHTML = "<div class='sidecontentbox'>\
                              <a class='helplink' href='https://xplr.com' target='_blank'>what is this?</a>\
                              <div class='title'><h1>XPLR Recommender</h1></div> \
                              <ul class='content' id='xplr_list'><li>Loading...</li></li></div>";

  return recommenderBox;

}

(function() {

  var firstSpacer = document.getElementsByClassName("spacer")[0],
      sidebar = firstSpacer.parentNode;

  sidebar.insertBefore(buildRecommenderBox(), firstSpacer);
  fetchRecommendedReddits();

})();