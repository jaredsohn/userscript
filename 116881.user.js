// ==UserScript==
// @name           Viaplay IMDB Api
// @namespace      https://wonderlab.se/
// @include        http://viaplay.se/*
// @include        http://viaplay.no/*
// @include        http://viaplay.dk/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// 
// ==/UserScript==
var numberOfMovies = 0;
var locationhref = document.location.href;
var vals = {};
var valsQueue = [];
var processedMovies = [];
var ajaxQueue = [];

for each (var val in GM_listValues()) {
  vals[val] = GM_getValue(val);
}

var processAjaxQueue = function(){
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      GM_xmlhttpRequest(obj);
    }
    ajaxQueue = [];
  }
  
  if (valsQueue.length > 0) {
    for (val in valsQueue) {
      var obj = valsQueue[val];
      GM_setValue(obj.key, obj.value);
      vals[obj.key] = obj.value;
    }
    valsQueue = [];
  }
}
setInterval(function(){
  processAjaxQueue();
}, 100);

setInterval(function() {
  cool();
}, 500);



 
function gmAjax(obj){
  ajaxQueue.push(obj);
}

function gmSetVal(key, value){
  valsQueue.push({key: key, value: value});
}

function gmGetVal(key, defaultvalue){
  if (vals[key]) {
    return vals[key];
  }
  else {
    return defaultvalue;
  }
}

function GM_setCachedDataValue(key, value){
  // key is the name of the value stored
  // value is the value to be stored
  var currentTime = new Date().valueOf();
  var raw = currentTime.valueOf();
  gmSetVal(key, value);
  gmSetVal(key + '_cacheDate',raw.toString());
}

function GM_getCachedDataValue(key, maxDuration){
  // key is the name of the value stored
  // maxDuration is Maximum Duration (or how old) in milliseconds the cached data can be
  // note fillter for  about:config is greasemonkey.scriptvals.http://www.FollowRank.com/
  if (typeof maxDuration != "number") {
    console.error('maxDuration is NOT a number, but rather a ' + typeof maxDuration);
    return "";
  }
  var currentTime = new Date();
  var raw = gmGetVal(key + '_cacheDate', ""); // get the age of the cache
  if (raw != "") {
    var cache_dt = new Date(parseInt(raw));
    var age = currentTime.getTime() - cache_dt.getTime();
    var allowed_age = maxDuration;
    if (age <= allowed_age) {
      // if the age is less than the max allowed age the get and return the cached value
      return gmGetVal(key, "");
    }
    else {// if the age is greater than the max then blank out the cache date and value and return black
      gmSetVal(key, "");
      gmSetVal(key + '_cacheDate',"");
      console.info('GM cahaced data was too old so I killed it! Age was = ' + age + ' and allowed aged was =' + allowed_age);
    }
  }
  return "";
}


var $jq = unsafeWindow.jQuery;

$jq(document).ready(function() {
  cool();
  var articles = $jq('body.movies div.article-content').get();
  
  $jq.each(articles, function(i, article) {
    var objectSelf = $jq(article);
    var id = $('body #productSelect').attr('data-product-id');
    console.log(id);
    var title = objectSelf.find('header').find('hgroup').find('h1').html();
    console.log(title);
    if(GM_getCachedDataValue(id, 1296000000) != "") {
        objectSelf.find('header').find('hgroup').find('h1').append('<span class="imdb-rating">' + vals[id] + ' / 10</span>');
        $jq('article aside dl:last').append('<dt>IMDB</dt><dd>' + vals[id] + ' / 10</dd>');
      }
      else {

        gmAjax({
          method: "GET",
          url: "http://www.imdbapi.com/?t=" + title,
          onload: function(response) {
            var imdbData = response.responseText;
            var imdbJSON = eval("(" + imdbData + ")");
            // Returns Movie Title
            if (!imdbJSON.imdbRating) {
              imdbJSON.imdbRating = 'N/A';
            }
            objectSelf.find('header').find('hgroup').find('h1').append('<span class="imdb-rating">' + imdbJSON.imdbRating + ' / 10</span>');
            $jq('article aside dl:last').append('<dt>IMDB</dt><dd>' + imdbJSON.imdbRating + ' / 10</dd>');
            GM_setCachedDataValue(id, imdbJSON.Rating);
            

          }
        });
      }
  });
});

function cool() {
  var movies = $jq('ul.movies li').get();
  
  $jq.each(movies, function(i, movie) {
    var objectSelf = $jq(movie);
    var title = objectSelf.find('.media-tooltip').find('h3').find('.title').html();
    title = jQuery.trim(title);
    var id = objectSelf.attr('data-product-id');
    
    if (jQuery.data(movie, 'processed') == true) {
      
    }
    else {
      //processedMovies.push(id);
      jQuery.data(movie, 'processed', true);

      if(GM_getCachedDataValue(id, (15 + Math.floor(Math.random()*20)) * 86400000) != "") {
        objectSelf.find('a').find('div.meta').append(' <span class="imdb-rating">' + vals[id] + ' / 10</span>');
      }
      else {

        gmAjax({
          method: "GET",
          url: "http://www.imdbapi.com/?t=" + title,
          onload: function(response) {
            var imdbData = response.responseText;
            var imdbJSON = eval("(" + imdbData + ")");
            // Returns Movie Title
            if (!imdbJSON.imdbRating) {
              imdbJSON.imdbRating = 'N/A';
            }
            objectSelf.find('a').find('div.meta').append(' <span class="imdb-rating">' + imdbJSON.imdbRating + ' / 10</span>');
            GM_setCachedDataValue(id, imdbJSON.imdbRating);
            

          }
        });
      }
    }
  });  
}


$jq('<style>.imdb-rating { float: right; color: #A58500; font-weight: bold; } h1 .imdb-rating { margin-left: 20px; float: none; color: #A58500; font-weight: bold; }</style>').appendTo('head');
