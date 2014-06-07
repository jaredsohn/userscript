// ==UserScript==
// @name           SafePixivTweet
// @namespace      http://kataho.net/
// @description    Change the tweet text on bookmarking an image on pixiv, adding X-raged warning.
// @include        http://www.pixiv.net/bookmark_add.php
// ==/UserScript==


// つぶやきのテンプレートと注意を変更するにはここを書き換える
var tweetFormat = 'pixivでブックマークしました $WARNING[pixiv] $TITLE $URL #pixivtweet';
var R18_warning  = '[R-18注意]';
var R18G_warning = '[R-18G注意]';
// var tweetFormat = 'Bookmarked on pixiv $WARNING[pixiv] $TITLE $URL #pixivtweet';
// var R18_warning  = '[X-rated!]';
// var R18G_warning = '[Grotesque!]';

function changeComment(warning, title, url) {
  var tweetLink;

  var as = document.getElementsByTagName('a');
  for (var i = 0; i < as.length; ++i) {
    if (as[i].href.indexOf('http://twitter.com/home?status=') == 0) {
      tweetLink = as[i];
      break;
    }
  }

  if (!tweetLink) {
    return;
  }

  var tweet = tweetFormat.replace('$WARNING', warning).replace('$TITLE', title).replace('$URL', url);
  tweetLink.href = 'http://twitter.com/home?status=' + encodeURIComponent(tweet);
}

function main() {
  var imageUrl;
  var title;

  var forms = document.getElementsByTagName('form');
  for (var i = 0; i < forms.length; ++i) {
    if (forms[i].action.indexOf('bookmark_add.php') >= 0) {
      return;
    }
  }

  var sts = document.getElementsByTagName('strong');
  for (var i = 0; i < sts.length; ++i) {
    if (sts[i].className == 'link_visited') {
      var imageLink = sts[i].getElementsByTagName('a')[0];
      imageUrl = imageLink.href;
      title = imageLink.textContent;
      break;
    }
  }

  if (!imageUrl) {
    return;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var response = xmlhttp.responseText;
      var m = response.match('<span class="text_red">\\[ (R-18G?) \\]</span>');
      var warning = '';
      if (m != null) {
        warning = (m[1] == 'R-18G' ? R18G_warning : R18_warning);
      }
      changeComment(warning, title, imageUrl);
    }
  };
  xmlhttp.open('GET', imageUrl, true);
  xmlhttp.send(null);
}

main();
