// ==UserScript==
// @name           Memrise Item Totals on Home Page
// @description    This will add the number of items (learned & total) to the tooltip of each course and category
// @match          http://www.memrise.com/home/*
// @version        0.2
// @updateURL      https://userscripts.org/scripts/source/174993.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174993.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
  
  var displayCourseTotals = function(data) {
    if (data!=undefined) MEMRISE.course_progress = data.courses;
    
    MEMRISE.category_progress = {};
    for (i in MEMRISE.course_progress) {
      var progress_bar    = $( ".pinned[data-course-id='" + MEMRISE.course_progress[i].id + "'] .progress" );
      var current_tooltip = progress_bar.attr("data-original-title");
      if (MEMRISE.course_progress[i].percent_complete==100) progress_bar.attr("data-original-title", current_tooltip + " (" + MEMRISE.course_progress[i].num_things + " items)").tooltip();
      else                                                  progress_bar.attr("data-original-title", current_tooltip + " (around " + parseInt(MEMRISE.course_progress[i].num_things*MEMRISE.course_progress[i].percent_complete/100, 10) + " out of " + MEMRISE.course_progress[i].num_things + ")").tooltip();
      
      if (MEMRISE.category_progress[ MEMRISE.course_progress[i].target.name ]==undefined) MEMRISE.category_progress[ MEMRISE.course_progress[i].target.name ] = {total:0, learned:0};
      MEMRISE.category_progress[ MEMRISE.course_progress[i].target.name ].total   +=          MEMRISE.course_progress[i].num_things;
      MEMRISE.category_progress[ MEMRISE.course_progress[i].target.name ].learned += parseInt(MEMRISE.course_progress[i].num_things*MEMRISE.course_progress[i].percent_complete/100, 10);
    }
    
    for (var k=0; k<$(".water-categories h3 a").size(); k++) {
      var category_name = $(".water-categories h3 a").eq(k).text();
      $(".water-categories li").eq(k).attr("title", "You have learned around " + MEMRISE.category_progress[category_name].learned + " out of " + MEMRISE.category_progress[category_name].total + " items").tooltip();
    }
    
    setTimeout(updateCourseTotals, 3000); //Repeat a second time in case "extra" pinned courses have been loaded by another user script
  };
  
  var updateCourseTotals = function() {
    for (i in MEMRISE.course_progress) {
      var progress_bar    = $( ".pinned[data-course-id='" + MEMRISE.course_progress[i].id + "'] .progress" );
      var current_tooltip = progress_bar.attr("data-original-title");
      if ( current_tooltip==undefined  ) continue;
      if ( current_tooltip.match(/\(/) ) continue;
      if (MEMRISE.course_progress[i].percent_complete==100) progress_bar.attr("data-original-title", current_tooltip + " (" + MEMRISE.course_progress[i].num_things + " items)").tooltip();
      else                                                  progress_bar.attr("data-original-title", current_tooltip + " (around " + parseInt(MEMRISE.course_progress[i].num_things*MEMRISE.course_progress[i].percent_complete/100, 10) + " out of " + MEMRISE.course_progress[i].num_things + ")").tooltip();
    }
  };
  
  if (MEMRISE.course_progress==undefined) $.getJSON('http://www.memrise.com/api/course/learning/?with_progress=true', displayCourseTotals);
  else displayCourseTotals();
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
injectWithJQ(onLoad);