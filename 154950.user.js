// ==UserScript==
// @name        Memrise practice indicator
// @namespace   
// @description	Click on the blue bar to "Pratise"

// @author	mandarin_sites

// @include     /^http://www.memrise.com/course/[0-9]+/[^\/]+/$/
// @version     0.01

// @grant       unsafeWindow
// ==/UserScript==

//- 

var $ = unsafeWindow.jQuery;

var s_level_title = document.getElementsByClassName('level-title');
var s_progress	  = document.getElementsByClassName('progress');
var progress      = {};

for ( var a_progress = 1; a_progress < s_progress.length; a_progress += 1) {
  var a_level = s_progress[a_progress].parentNode.parentNode;
  progress[ Number( a_level.getElementsByClassName('level-index')[0].textContent ) ] = s_progress[a_progress];
}

var course_title  = document.URL.match(/[0-9]+\/([^\/]+)/)[1].replace('-', '_');

//set cookie
var exdate=new Date();
exdate = new Date(exdate.valueOf() + 43200000);

for ( a_progress in progress) {

  var th = Number( progress[a_progress].parentNode.parentNode.childNodes[1].textContent );
//get cookie
  if (!isNaN( th )) if ( th % 2 == 0 && $.cookie( course_title + th ) != null) {
    var a_level = progress[th].parentNode.parentNode;
    a_level.getElementsByClassName('level-icon')[0].style.setProperty('height', '20px');
    a_level.innerHTML += '<a href="' + document.URL +th+'/garden/review/"><div class="level-status"><div class="progress"><div class="bar bar-success" style="width: ' + Math.floor( Number($.cookie( course_title + th ))/7 * 100) + '%; background-color: #73C7F4;"></div></div></div></a>';
    continue;
  };
  if (!isNaN( th )) if ( th % 2 == 0 ) $.get( 'http://www.memrise.com/garden/ajax/session/?course_id='+ document.URL.match(/[0-9]+/g)[0] +'&level_index=' + th + '&session_slug=review', function(data) { var min_interval = null;
for (item in data.things) {
  var current_interval = data.things[item].thingusers[3][1].interval;
  if ( current_interval == 0 ) {continue; };
  if ( current_interval < min_interval || min_interval == null ) {
    min_interval = current_interval;
  }
}
var a_level = progress[data.session.level_index].parentNode.parentNode;
a_level.getElementsByClassName('level-icon')[0].style.setProperty('height', '20px');
if (min_interval > 7) { min_interval = 7; }
a_level.innerHTML += '<a href="' + document.URL +data.session.level_index+'/garden/review/"><div class="level-status"><div class="progress"><div class="bar bar-success" style="width: ' + Math.floor( min_interval/7 * 100) + '%; background-color: #73C7F4;"></div></div></div></a>';
$.cookie( course_title + data.session.level_index, min_interval, {expires: 1});

    });
//end for
}
