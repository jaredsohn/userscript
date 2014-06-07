// ==UserScript==
// @name           AnandTech Bench - Better On Top
// @namespace      http://sites.google.com/site/kenscode/
// @description    Rearranges the AnandTech Benchmark reports so the better product is on top on each graph
// @include        http://www.anandtech.com/bench/Product/*
// @version        2.1
// @grant          none
// ==/UserScript==
var rows = document.getElementById('benches').children;
for (var row in rows) {
  row = rows[row];
  if(row.children != undefined && row.children[0] != undefined) {
    var graph = [];
    for(var i=0; i < row.children.length; i++) {
      if(row.children[i].className.substr(0,12) == 'rating_value') {
        graph.push(row.children[i]);
      }
    }
    var rating_text = row.children[0].textContent.toLowerCase();
    var tophigher = parseFloat(graph[0].textContent) > parseFloat(graph[1].textContent);
    var higherbetter = rating_text.indexOf("higher is better") > 0;
    var lowerbetter = rating_text.indexOf("lower is better") > 0;
    // Verify that either higher or lower was found.  If not, do some more processing.
    if(!higherbetter && !lowerbetter) {
      // Power, temperature, and noise-based benchmarks are always lower-is-better.
      // Time is usually lower-is-better as well, unless it refers to hours of battery life.
      // Otherwise we default to higher-is-better.
      higherbetter = (rating_text.indexOf("hours ") >= 0 ||
          rating_text.indexOf("time ") < 0) &&
        rating_text.indexOf("power ") < 0 &&
        rating_text.indexOf("temperature ") < 0 &&
        rating_text.indexOf("noise ") < 0;
    }
    if(graph[0].textContent != graph[1].textContent) {
      row.children[0].children[0].style.color='#343434';
      // This if is for Mozilla bug 849551
      if(row.children[0].style.background == '') {
        row.children[0].style.background = 'url("/Content/images/rating_bg.jpg") repeat-y scroll right top #9CD5E0';
      }
      if(tophigher ^ higherbetter) {
        // Swap the rating values and colors.
        graph[0].className = "rating_value halforange";
        graph[1].className = "rating_value half";
        //graph[1].style.clear = 'both';
        temp = graph[0].style.width;
        graph[0].style.width = graph[1].style.width;
        graph[1].style.width = temp;
        temp = graph[0].innerHTML;
        graph[0].innerHTML = graph[1].innerHTML;
        graph[1].innerHTML = temp;
        // Add the better color to the label.
        row.children[0].style.background = 'url("/Content/images/rating_bg_orange.jpg") repeat-y scroll right top #F39F7A';
      }
    }
  }
}
