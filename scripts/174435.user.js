// ==UserScript==
// @name           Memrise Home Page - Pin Extra Courses
// @description    By configuring the code in the user script, more courses can be shown on the home page (in addition to the three already allowed)
// @match          http://www.memrise.com/home/
// @version        0.1.1
// @updateURL      Automatic updating is disabled, to avoid overwriting user configurations
// @downloadURL    https://userscripts.org/scripts/source/174435.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  var addBelowPinned = true;
  var addedCourses = [];
  
  $.getJSON('http://www.memrise.com/api/course/learning/?with_progress=true', function(data) {
    var alreadyPinned = [parseInt($(".pinned").eq(0).attr("data-course-id")), parseInt($(".pinned").eq(1).attr("data-course-id")), parseInt($(".pinned").eq(2).attr("data-course-id"))];
    $.each(data.courses, function(key, val) {
      if (($.inArray(val.id, addedCourses)!=-1 || addedCourses.length==0) && $.inArray(val.id, alreadyPinned)==-1) {
        var h = "";
        h += '<div class="course-progress-box pinned " data-role="course-progress-box" data-course-id="'+val.id+'" data-course-name="'+val.name+'" data-pinned="true">';
        h += '  <div class="inner clearfix">';
        h += '    <img class="course-photo" src="'+val.photo_small+'" alt="" title="Pinned by userscript.  Edit the userscript to change or remove.">';
        h += '    <div class="detail">';
        h += '      <h3><a href="'+val.url+'">'+val.name+'</a></h3>';
        h += '      <div class="progress" data-placement="bottom" title="'+val.percent_complete+'% in long term memory"><span class="bar-success bar-abs bar" style="width:'+val.percent_complete+'%;"></span></div>';
        h += '    </div>';
        h += '    <div class="course-actions btn-group" data-role="course-actions">';
        if (val.percent_complete<100) {
          h+='      <a href="/course/next/'+val.id+'" class="btn btn-success" data-placement="top" title="Learn new items">&nbsp; Plant&nbsp;</a>';
        }
        h += '      <a href="'+val.url+'garden/water/" class="btn btn-primary" data-placement="top" title="Review items">Water ('+val.num_ready_to_water+')</a>';
        h += '    </div>';
        h += '  </div>';
        h += '</div>';
        if (addBelowPinned) $(".pinned-courses").append(h);
        else                $(".pinned-courses").prepend(h);
      }
    });
  });
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
injectWithJQ(onLoad);

/*
<div class="course-progress-box pinned " data-role="course-progress-box" data-course-id="111422" data-course-name="Mandarin Tones" data-pinned="true">
  <div class="inner clearfix">
    <img class="course-photo" src="http://media.memrise.com/img/400sqf/from/uploads/course_photos/43457_Tones.png" alt="">
    <div class="detail">
      <h3><a href="/course/111422/mandarin-tones/">Mandarin Tones</a></h3>
      <div class="progress" data-placement="bottom" data-original-title="75% in long term memory"><span class="bar-success bar-abs bar" style="width:75%;"></span></div>
    </div>
    <div class="course-actions btn-group" data-role="course-actions">
      <a href="/course/next/111422" class="btn btn-success" data-placement="top" data-original-title="Learn new items">&nbsp; Plant&nbsp;</a>
      <a href="/course/111422/mandarin-tones/garden/water/" class="btn btn-primary" data-placement="top" data-original-title="Review items">Water (51)</a>
    </div>
  </div>
</div>
*/