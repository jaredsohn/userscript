// ==UserScript==
// @name       UTSW_WebC_GoToCurrentCourse
// @namespace  https://plus.google.com/107332279152288777803/
// @version    0.2
// @description  Automatically sends you to the current course instead of the homepage.
// @match      http://medschool.swmed.edu/index.php
// @match	   http://medschool.swmed.edu
// @copyright  2014+, Mark Kittisopikul
// ==/UserScript==

//get the current date
var today = new Date();
//url of the MS2 course start and end dates
var url = 'http://medschool.swmed.edu/schedules/ms2-courses.php';
//load the URL contents into a new div and call the linkCurrentCourse function
var d = $('<div />').load(url,linkCurrentCourse);


function linkCurrentCourse(r,t,x) {
    var rows = d.find('table:eq(1) tbody tr');
    //parse the table into a structure array for the course name, url, start date, and end date
    var courses = rows.map(function(i,r) {
        r = $(r);
        return {
            name: r.find('a').text(),
            href: r.find('a').attr('href'),
            start: new Date(r.find('div:eq(1)').contents().eq(2).text().trim()),
            end: new Date(r.find('div:eq(2)').contents().eq(2).text().trim())
        }
    });
    //find the index of the current course, which is the first course not comletely past
    for(var i=0; i < courses.length; i++) {
        if(! (today > courses[i].start && today > courses[i].end) )
            break;
    }
    
    //turn the 'Welcome to Web Curriclum' text into a a link to the current block
    //var currentCourse = $('<a/>',{href: courses[i].href,text: courses[i].name});
    //currentCourse.text('');
    //$('h2').wrapInner(currentCourse);
    
    //automatically redirect
    location.href = courses[i].href;
}