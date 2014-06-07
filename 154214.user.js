// ==UserScript==                                                               
// @name Add Search to GSAPP Courses
// @include http://www.arch.columbia.edu/courses/course-schedule*
// ==/UserScript==                                                              
//
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	var querybefore = "'http://search.columbia.edu/search?&q=";
	var queryafter = "&site=Directory_of_Classes&num=20&sort=date%3AD%3AL%3Ad1&filter=0&entqr=0&ud=1&output=xml_no_dtd&client=DoC&proxystylesheet=DoC&oe=UTF-8&ie=UTF-8&proxyreload=1'";
  var ourDiv = $(".tmpltzr-module #mytable tr").each(function() {
	var thiscourse = $(this).find("td:nth-child(9)");
	thiscourse.html("<a href=" + querybefore + thiscourse.html() + queryafter + ">" + thiscourse.html() + "</a>")	
	  
  });

});

//  ourDiv.innerHTML = "<a href=http://search.columbia.edu/search?&q=31223&site=Directory_of_Classes&num=20&sort=date%3AD%3AL%3Ad1&filter=0&entqr=0&ud=1&output=xml_no_dtd&client=DoC&proxystylesheet=DoC&oe=UTF-8&ie=UTF-8&proxyreload=1>" + ourDiv.innerHTML + "</a>";

