// ==UserScript==
// @name YT Hide
// @description Adds the ability to hide (or, as one can say, mark as watched) videos on the subscription list on YouTube
// @include *www.youtube.com/my_subscriptions*
// @include *youtube.com/my_subscriptions*
// @include *.youtube.com/my_subscriptions*
// ==/UserScript==
// http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// http://documentcloud.github.com/underscore/underscore-min.js
// https://raw.github.com/andris9/jStorage/master/jstorage.js

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

function populateLocalStorage() {
  if($.jStorage.get('watchedVideos') === null) {
    $.jStorage.set('watchedVideos', []);
  }
}

// remove redundant video IDs from the localstorage
function cleanUpLocalStorage() {
  watchedVideos = $.jStorage.get('watchedVideos');
  videosOnPage = [];

  $('.vm-video-item').each(function (i) {
    videosOnPage.push(this.id);
  });

  watchedVideos = _.intersection(watchedVideos, videosOnPage);
  $.jStorage.set('watchedVideos', watchedVideos);
}

function markAsWatched(videoId) {
  watchedVideos = $.jStorage.get('watchedVideos');
  watchedVideos.push(videoId);
  $.jStorage.set('watchedVideos', watchedVideos);
}

function markAsNotWatched(videoId) {
  watchedVideos = $.jStorage.get('watchedVideos');
  watchedVideos = _.without(watchedVideos, videoId);
  $.jStorage.set('watchedVideos', watchedVideos);
}

function isWatched(videoId) {
  watchedVideos = $.jStorage.get('watchedVideos');
  return _.include(watchedVideos, videoId);
}

function checkedOrNot(videoId) {
  if(isWatched(videoId)) {
    return 'checked="checked"';
  } else {
    return '';
  }
}

$(document).ready(function() {

  // CSS
  $("<style type='text/css'>\
    .watched { opacity: 0.2;}\
    .watched:hover {opacity: 1;}\
  </style>").appendTo("head");

  $.getScript("http://documentcloud.github.com/underscore/underscore-min.js", function() {
    $.getScript("https://raw.github.com/andris9/jStorage/master/jstorage.js", function() {

      populateLocalStorage()

      $('.vm-video-item').each(function (i) {
        var videoLi = this;
        var videoId = this.id;
        
        // add a checkbox to a video
        // two different checkboxes for different layouts
        $('#'+videoId+' .vm-video-metrics').prepend('<input id="'+videoId+'-checkbox" data-id="'+videoId+'" type="checkbox" '+checkedOrNot(videoId)+'> <label for="'+videoId+'-checkbox">Hide</>');

        // determine if the checkbox is already added
        if($('#'+videoId+'-checkbox').length == 0) {
          $('#'+videoId+' .vm-video-info').prepend('<input id="'+videoId+'-checkbox" data-id="'+videoId+'" type="checkbox" '+checkedOrNot(videoId)+'> <label for="'+videoId+'-checkbox">Hide</>');
        }


        // determine if a video is watched or not and then adds (or not) a class
        if(isWatched(videoId)) {
          $(this).addClass('watched');
        }

        // add an event to the checkbox
        $('#'+videoId+'-checkbox').click (function() {
          if($(this).is (':checked')) {
            // user checked the checkbox
            $(videoLi).addClass('watched');
            markAsWatched(videoId);
          } else {
            // user unchecked the checkbox
            $(videoLi).removeClass('watched');
            markAsNotWatched(videoId);
          }
        });
      });

      cleanUpLocalStorage();

    });
  });
});
}

// load jQuery and execute the main function
addJQuery(main);