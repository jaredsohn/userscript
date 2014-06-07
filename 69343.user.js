// ==UserScript==
// @name           Webcomic Resizer
// @namespace      http://moonbase.rydia.net/software/
// @description    Resizes webcomics to fit the screen and provides better basic navigation.
// @include        http://girlgeniusonline.com/comic.php*
// @include        http://www.girlgeniusonline.com/comic.php*
// @include        http://gunnerkrigg.com/*
// @include        http://www.gunnerkrigg.com/*
// @include        http://requiem.seraph-inn.com/viewcomic.php*
// @include        http://www.meekcomic.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

(function () {

var GIRL_GENIUS = {
  page_image: "#MainTable img[alt='Comic']",
  previous_link: "#MainTable a img[alt='The Previous Comic']",
  next_link: "#MainTable img[alt='The Next Comic']"
};

var GUNNERKRIGG_COURT = {
  page_image: "span.rss-content span.rss-id img",
  previous_link: "img[alt='Previous']",
  next_link: "img[alt='Next']"
};

var PHOENIX_REQUIEM = {
  page_image: "div.main img[alt='Page']",
  previous_link: "div.main img[alt='Back']",
  next_link: "div.main img[alt='Next']"
};

var THE_MEEK = {
  page_image: "#comic img",
  previous_link: "#comicnavbar div.navfront a:contains('Previous')",
  next_link: "#comicnavbar div.navfront a:contains('Next')"
};

var COMICS = [
  [/^http:\/\/(www\.)?girlgeniusonline\.com\/comic\.php/, GIRL_GENIUS],
  [/^http:\/\/(www\.)?gunnerkrigg\.com\/(index2|archive_page)\.php/, GUNNERKRIGG_COURT],
  [/^http:\/\/requiem\.seraph-inn\.com\/viewcomic\.php/, PHOENIX_REQUIEM],
  [/^http:\/\/www\.meekcomic\.com\//, THE_MEEK]
];

function resize_comic(comic_id, natural_width, natural_height) {
  var div = $("#" + comic_id);
  var image = div.find("img");
  var view_width = $(window).width();
  var view_height = $(window).height();
  if (view_width < natural_width || view_height < natural_height) {
    var width_scale = view_width / natural_width;
    var height_scale = view_height / natural_height;
    if (width_scale < height_scale) {
      scale = width_scale;
    } else {
      scale = height_scale;
    }
  } else {
    scale = 1.0;
  }
  dims = {width: Math.round(natural_width * scale),
          height: Math.round(natural_height * scale)};
  div.css(dims);
  image.css(dims);
  unsafeWindow.location.hash = "#" + comic_id;
}

var resize_queued = false;
function queue_resize(comic_id, natural_width, natural_height) {
  if (!resize_queued) {
    setTimeout(function () {
      resize_queued = false;
      resize_comic(comic_id, natural_width, natural_height);
    }, 0);
    resize_queued = true;
  }
}

function setup() {
  var comic_rules = null;
  for (var i = 0; i < COMICS.length; i++) {
    if (String(window.location).match(COMICS[i][0])) {
      comic_rules = COMICS[i][1];
      break;
    }
  }
  if (!comic_rules) {
    return false;
  }
  var image = $(comic_rules.page_image);
  if (image.length == 0) {
    return false;
  }
  var comic_id = 'webcomic-resizer-comic';
  var div = $("<div id='" + comic_id + "'style='position: relative; margin-left: auto; margin-right: auto;'></div>");
  var pos = image.closest("a");
  if (pos.length == 0) {
    pos = image;
  }
  pos.before(div);
  div.append(image.clone());
  pos.remove();
  var prev_link = $(comic_rules.previous_link).closest("a").attr('href');
  if (prev_link) {
    var link = $("<a>&nbsp;</a>")
    link.attr('href', prev_link);
    link.css({display: 'block', position: 'absolute', top: '0px', bottom: '0px', left: '0px', width: '33%', textDecoration: 'none'});
    div.append(link);
  }
  var next_link = $(comic_rules.next_link).closest("a").attr('href');
  if (next_link) {
    var link = $("<a>&nbsp;</a>")
    link.attr('href', next_link);
    link.css({display: 'block', position: 'absolute', top: '0px', bottom: '0px', right: '0px', width: '33%', textDecoration: 'none'});
    div.append(link);
  }
  div.css('height', '2000px'); // size up to permit scrolling
  unsafeWindow.location.hash = "#" + comic_id;

  function setup_image() {
    var natural_width = parseInt(image.attr('width') || image.css('width'));
    var natural_height = parseInt(image.attr('height') || image.css('height'));
    if (!natural_width || !natural_height) {
      // if the natural size isn't immediately available, wait for image load
      image.load(setup_image);
      return;
    }
    resize_comic(comic_id, natural_width, natural_height);
    $(window).resize(function () {
      queue_resize(comic_id, natural_width, natural_height);
    });
  }

  setup_image();

  return true;
}

setup();

})();
