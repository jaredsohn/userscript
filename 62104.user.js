// ==UserScript==
// @name          Torrent Linker and Imdb Ratings for Movies in Wikipedia
// @namespace     http://gigpeppers.com
// @description   Shows torrent links (from Btjunkie.org) and IMDB ratings for a movie listed in Wikipedia. The rating is shown next to the heading in blue color. The torrents are loaded just below the heading. Clicking on the â€œTorrentsâ€ link will open up the top 10 torrents for that movie from btjunkie. Clicking on the â€œTorrentsâ€ heading will collapse the torrents listing.
// @include       http*://*.wikipedia.org/wiki/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @require       http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @require       http://buzzy.260mb.com/AutoUpdater.js
// @resource      tableCss  http://webfx.eae.net/dhtml/sortabletable/css/sortabletable.css
// @version       0.06
// @date          11/29/09
// @attribution   http://webfx.eae.net/dhtml/sortabletable/demo.html for the table css
// @attribution   http://btjunkie.org/ for the torrent source data
// @copyright     2009+, Cherian Thomas 
// ==/UserScript==
$(function() {

  autoUpdate (62104, "0.07");

  const DEBUG = true;


  function debug() {
    if (DEBUG && console) {
      console.log.apply(this, arguments);
    }
  }

  GM_addStyle(GM_getResourceText("tableCss"));

  GM_addStyle(
    "#bttorrent { z-index: 5;}\
    #torrentTable{ }"
  );

  var evenCss = {
    '-moz-background-clip':'border',
    '-moz-background-inline-policy':'continuous',
    '-moz-background-origin':'padding',
    'background':'#EEEEEE none repeat scroll 0 0'
  }

  var headingObj = $("#firstHeading");
  console.log(headingObj);
  var imdbUrl = $("h2").find("span[id='External_links']").closest("h2").nextAll("ul").find("a[href*='imdb']").attr("href");
  if(imdbUrl && imdbUrl.indexOf("title") != -1) {
    headingObj.append(' <span id="imdbrating" style="color:#002BB8;"><a href="' + imdbUrl +'"></a></span>');
    debug("The imdb url is %s ", imdbUrl);
    GetTorrentFromBtjunkie(headingObj);
    // Gets the imdb ratings thru YQL
    var imdbYql = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'" + imdbUrl +"'and%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22tn15rating%22%5D%2F%2Fdiv%5B%40class%3D%22starbar-meta%22%5D'&format=json"; 
    console.log(imdbYql);
    $.getJSON(
      imdbYql,
      function(data) {
        data = data.query;
        if(data.results && data.results.div && data.results.div.strong) {
          debug("The rating is %s", data.results.div.strong);
          $("#imdbrating a",headingObj).text("Imdb Rating: " + data.results.div.strong + "");
        }
      }
    );
  }

  function GetTorrentFromBtjunkie(titleObj) {
    var titleText = titleObj.text();
    //debug("Title is %s",titleText);
    // removes brackets from the text. e.g. Public Enemies (2009 film)
    titleText = (titleText.indexOf("(") != -1) ?  $.trim(titleText.slice(0, titleText.indexOf("("))) : titleText;
    debug("Sanitized title %s", titleText);
    titleText = titleText.split(" ").join("%2B");

    headingObj.after("<span id='bttorrent'> Loading torrents <img src='http://img35.imageshack.us/img35/4914/ajaxloaderm.gif'/></span>");
    // This is freaking awesome. The earlier code with $.load took in all the html data and I had to siff through a lot of junk. With yql I get the exact 
    // info. Lesser data over the pipe!
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20href%2Ccontent%20from%20html%20where%20url%3D%22http%3A%2F%2Fbtjunkie.org%2Fsearch%3Fq%3D" + titleText + "%22%20and%20xpath%3D%22%2F%2Ftable%2F%2Fa%5B%40class%3D'BlckUnd'%5D%22%20limit%2010&format=json",
      function(data){
        if(data.query.results){
          debug("In bt junkie response data ", data);
          $("#bttorrent").empty().append("<table id='torrentTable' class='sort-table'><thead><th>Torrents</th></thead></table>");
          var list = data.query.results.a;
          if(list){
            var temp = "<tbody>";
            for(var i=0;i<list.length;i++){
              var link = list[i].href;
              if(list[i].content) var content = list[i].content.split("\n").join(" ");
              if(list && content) temp += "<tr><td><a href='http://btjunkie.org" + link +"'>" + content +"</a></td></tr>";
            }
            temp += "</tbody>";
            $("#torrentTable").append(temp)
              .find("thead")
                .css("cursor","pointer").css("cursor","hand")
                .click(function(){ $("tbody", $(this).parent()).toggle("fast"); }).click();

            //This is not working at the moment. dig up 
            $("tr:even").css(evenCss);
            $("tr:even").css("background-color", "#bbbbff");
          }
        } else {
          $("#bttorrent").replaceWith("No Torrents").fadeOut("slow");
        }
      })
  }
});
