// ==UserScript==
// @name       NowTV film ratings (IMDB, Rotten Tomatoes)
// @namespace  http://www.georgenixon.co.uk
// @version    0.1
// @description  Adds movie ratings to Sky's NowTV movie lists.
// @include     http://www.nowtv.com/watch-movies*
// @include     http://www.nowtv.com/movies*
// ==/UserScript==
(function() {
  var addRating, applyImdbInfoToElement, getImdbInfo, getRTSearchUrl, getUrl, t, titles, url, _i, _len;

  getUrl = function(title) {
    var titleParts, url;

    titleParts = title.split(' ');
    return url = 'http://www.omdbapi.com/?tomatoes=true&i=&t=' + titleParts.join('+');
  };

  getRTSearchUrl = function(title) {
    var search, titleParts, url;

    titleParts = title.split(' ');
    search = titleParts.join('+');
    return url = "http://www.rottentomatoes.com/search/?search=" + search + "&sitesearch=rt";
  };

  getImdbInfo = function(url, callback) {
    return GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: function(details) {
        var res;

        res = eval('(' + details.responseText + ')');
        return callback(res);
      }
    });
  };

  addRating = function(node, name, rating, url, unit) {
    var div;

    div = document.createElement('div');
    div.innerHTML = "" + name + " rating: <a href='" + url + "' target='_blank'        style='color:blue'>" + rating + unit + "</a>";
    if (node.nextSibling) {
      return node.parentNode.insertBefore(div, node.nextSibling);
    } else {
      return node.parentNode.appendChild(div);
    }
  };

  applyImdbInfoToElement = function(info) {
    var imdbUrl;

    if (!(((info != null ? info.imdbRating : void 0) != null) && (info.imdbID != null))) {
      return;
    }
    imdbUrl = "http://www.imdb.com/title/" + info.imdbID + "/";
    addRating(this, 'IMDB', info.imdbRating, imdbUrl, '/10.0');
    return addRating(this, 'Rotten Tomatoes', info.tomatoMeter, getRTSearchUrl(info.Title), '%');
  };

  titles = document.querySelectorAll(".title[itemprop=name]");

  if (!titles.length) {
    titles = document.querySelectorAll('.programme-title');
  }

  for (_i = 0, _len = titles.length; _i < _len; _i++) {
    t = titles[_i];
    url = getUrl(t.innerHTML);
    getImdbInfo(url, applyImdbInfoToElement.bind(t));
  }

}).call(this);


