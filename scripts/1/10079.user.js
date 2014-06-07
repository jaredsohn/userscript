// ==UserScript==
// @name          Netflix Customization: Adding IMDB and Rotten Tomatoes Links
// @namespace     http://gotzfamily.org/~gotz/scripts
// @description	  Adds custom features to Netflix
// @include       http://www.netflix.com/Movie/*
// ==/UserScript==

var ratingsdiv = document.getElementById('avgratings');

if (ratingsdiv != null) {
  var htmlcode = ratingsdiv.innerHTML;
  htmlcode = htmlcode + "<a href=\"Javascript:location.href='http://us.imdb.com/find? type=substring&q='+encodeURIComponent(document.title.substring(9,document.title.length))+'&sort=smart;tt=1';\"><img alt=\"IMDB\" style=\"height: 16px;\" src=\"http://i.imdb.com/favicon.ico\"></a> | ";

  var rottenTomatoesName = document.title.substring(9,document.title.length).toLowerCase().replace(/ /g,'_').replace(/:/g,'');
  var prefix = rottenTomatoesName.substr(0,4);
  if ('the_' == prefix) {
    rottenTomatoesName = rottenTomatoesName.substr(4, rottenTomatoesName.length-4);
  }

  htmlcode = htmlcode + "<a href=\"http://www.rottentomatoes.com/m/"+rottenTomatoesName+"/\"><img alt=\"RotTom\" style=\"height: 16px;\" src=\"http://images.rottentomatoes.com/images/tomatoes/fresh.gif\"></a><br>";
  ratingsdiv.innerHTML = htmlcode;


}
