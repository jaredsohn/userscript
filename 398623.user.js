// ==UserScript==
// @name       UTSW_WebC_Compact_Schedule
// @namespace  https://plus.google.com/107332279152288777803/
// @version    0.585
// @description  Modify medschool.swmed.edu for navigation
// @match	   http://medschool.swmed.edu/courses/*/schedule.php
// @match      http://medschool.swmed.edu/schedules/ms*-current.php
// @match      http://medschool.swmed.edu/schedules/ms*-entire.php
// @copyright  2014+, Mark Kittisopikul
// ==/UserScript==

//minified load and execute code for loading jQuery if needed
//from here: http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

//the followling line of code would reload jQuery and then execute main
//loadAndExecute("//medschool.swmed.edu/assets/js/libs-core/jquery-1.7.2.min.js",main);

//however, jQuery is already loaded by the page
//we can just execute the code by inserting the function into the page
execute(main);

function main() {

//SECTION 0: Add additional CSS styles
$('<style type="text/css">\
@media only screen and (min-width: 1240px) { \
div#wrapper-global-inner {\
  max-width: none; \
  border: 0px; \
  padding: 0px; \
  }\
}\
@media only screen and (min-width: 768px) { \
body { \
  background: #FCFDFD; \
  } \
  tbody div.schedule-col1 { \
width: 12em; \
margin-bottom: 0em; \
  } \
div.schedule-col2 { \
float: none; \
  margin-left: 13em; \
width: inherit; \
padding-right: 1.5em; \
}\
.clearfix:before, .clearfix:after { \
content: none; \
} \
} \
  td.compact { \
  	padding: 0em !important; \
  }\
  div.compact { \
line-height: 1.5em; \
padding-top: 0.25em;\
padding-bottom: 0.25em;\
  } \
  tr.date { \
    text-align: center; \
    background-color: rgb(184,203,227); \
  } \
 span.links { \
float: right; \
} \
span.firstline:hover,tr.date td b:hover, div.schedule-col1:hover { \
text-decoration: underline; \
}\
tr.date b { \
   //padding-top: 50px; \
   //margin-top: -50px; \
} \
select { \
font-size: 100%; \
  } \
span#eyebrow-login a { \
  color: rgb(51, 51, 51); \
padding: 0.25em 0.5em; \
text-decoration: none; \
  }\
span#eyebrow-login a:hover { \
background-color: rgb(78, 129, 190);\
color: rgb(255, 255, 255); \
} \
div#bottom-nav { \
background-color: #DBE4F0;\
border-bottom: 1px solid #B8CBE3;\
border-top: 2px solid #B8CBE3;\
float: left;\
padding: 0 0 0 0;\
width: 100%;\
  } \
  </style>').appendTo('head');

//SECTION 1: Allow the Name property to toggle visibility of event details
//Given the firstline of an event as a parameter, toggle the visibility of the details
function toggleEvent(firstline) {
    if(firstline.currentTarget)
        firstline = $(firstline.currentTarget);
    //toggle visibility of the later lines
    firstline.siblings('span.details').toggle();
    firstline.siblings('span.links').toggle();
    //toggle visibility of the Name: label
    firstline.children(':first').toggle();
    firstline.parent().prev().toggleClass('compact').parent().toggleClass('compact');
    firstline.toggleClass('compact');
    //console.log(firstline);
}
//select all divs containing event details
var events = $('div.schedule-col2:gt(0)');
//find the index of the <br> tag to identify the first line
var breaks = events.map( function(i,e) { return $(e).contents().index($(e).find('br:first')); } );

events.each( function(i,e) {
    e = $(e);
    //divide the event details into first line and the details
    var firstline = e.contents().slice(0,breaks[i]);
    var details = e.contents().slice(breaks[i]+1);
    //wrap the two sections in spans with classes as labels
    firstline.wrapAll('<span />').parent().addClass('firstline');
    details.wrapAll('<span />').parent().addClass('details');
});
var details = $('span.details');
var firstlines = $('span.firstline');
//hide the details by default
details.hide();
//hide the name label by default
firstlines.find(':first-child').hide();
//add the firstline event handler
firstlines.click(toggleEvent);
//make the time a toggle for the event
$('div.schedule-col1').click( function(e) {
    $(e.currentTarget).parent().find('span.firstline').click();
});


//SECTION 2: Eliminate repetition of the date unless an event occurs on a new date
//It is probably easier to do this in PHP rather than using jQuery

//select the dates (bolded)
dates = $('div.schedule-col1 b');
//hide the dates and the following br
dates.slice(1).filter( function(i,d) { return d.innerHTML == dates[i].innerHTML } ).hide().next().hide();


//SECTION 3: Put the date into a separate row and apply a compact style
//select the rows that have a new date, including the first row
var rows = $('tbody tr').filter( function(i,row) { return i == 0 || dates[i].innerHTML != dates[i-1].innerHTML; } )
//add a new row before each of those rows
rows.before('<tr><td></td></tr>')
var dateRows = rows.prev();
dateRows.each( function(i,row) {
    row = $(row);
    //find the date in the row and move it it's own row
    var date = row.next().find('b:first');
    date.next().hide();
    date.appendTo(row.children());
    row.addClass('date');
});
//make the date a toggle for all the events that day
dateRows.click( function(e) {
    var row = $(e.currentTarget);
    row.nextUntil('tr.date').find('span.firstline').click();
});
//apply the compact class by default
//do not apply compact class to date rows
$('tr:not(.date) td').toggleClass('compact');
$('tr:not(.date) td div').toggleClass('compact');


//SECTION 4: Create a drop down date menu for navigation purposes
//get a list of the new dates
//do it in a way not as dependent of the above code
//newDates = dates.filter( function(i,a) { return $(a).css('display') != 'none'; });
//newDates = dates.filter( function(i,d) { return i == 0 || d.innerHTML != dates[i-1].innerHTML } );
function scrollTo(anchor) {
    location.hash = '#' + anchor;
    $('body').scrollTop($('#' + anchor).offset().top-$('div#wrapper-bread').outerHeight());
}
function processHash(hash) {
    console.log(hash);
    if($('#' + hash).length) {
        //if id exists, scrollTo it
        scrollTo(hash);
    } else if(hash == 'currentBlock') {
        console.log(getCurrentBlock());
        scrollTo($('b[id ^= lecture'+getCurrentBlock()+'-]').parents('tr').prev('tr.date').find('b:first').attr('id'));
    } else {
        //otherwise, assume it is a date and go to the date
        hash = hash.replace(/([0-9]{1,2})([0-9]{4})$/,' $1, $2');
        goToDate(new Date(hash));
    }
    
}
function getCurrentBlock() {
    var currentDate = $('select.dateSelector:visible option:selected').val();
    return $('#' + currentDate).parent().parent().nextUntil('tr.date').find('b.lecture-number').first().attr('id').match(/[0-9]+/)[0];
}
$(window).bind( 'hashchange', function(e) { processHash(location.hash.substr(1)); });
var newDates = dateRows.find('b');
var s = $('<select class="dateSelector"/>');
//for each new date, assign the compact date as an id, and create a menu option
newDates.each( function(i,a) { 
    var id = a.innerHTML.replace(/ |,/g,'');
    $(a).attr('id',id);
    $('<option/>',{value: id,text: a.innerHTML}).appendTo(s);
});
//when the user changes the selection, navigate to the date anchor
s.change( function(e) {
    scrollTo($(e.currentTarget).find('option:selected').attr('value'));
    //location.href = '#'+$(e.currentTarget).find('option:selected').attr('value')
});


//SECTION 5: Make the navigation div fixed
$('div#wrapper-bread').css('position','fixed').css('max-height','34px');
$('div#wrapper-bread span.hide-below-768').append(" &gt; ");
$('div#wrapper-bread span.hide-below-768').append(s);
$('span#eyebrow-login').appendTo('div#wrapper-bread');
$('div#wrapper-eyebrow').css('height','50px');
bottomS = s.clone();
bottomS.css('margin-left','auto');
bottomS.css('margin-right','auto');
bottomS.css('display','block');
bottomS.change( function(e) {
    scrollTo($(e.currentTarget).find('option:selected').attr('value'));
    //location.href = '#'+$(e.currentTarget).find('option:selected').attr('value')
});
var bottomDiv = $('<div id="bottom-nav"/>').append(bottomS);
bottomDiv.addClass('hide-above-600');
bottomDiv.css('position','fixed').css('bottom','0').css('width','100%');
$('#wrapper-global-outer').append(bottomDiv);

//SECTION 6: Add links to the first line
firstlines.after('<span class="links hide-below-1024"/>');
$('div.schedule-col2').each( function(i,div) {
    div = $(div);
    div.find('a').clone().appendTo(div.find('span.links'));
});
//by popular request, link the pathology slides and images
var virtualSlideEvent = $('span.firstline:contains("Virtual Slide")').next();
virtualSlideEvent.append('<a href="http://tlinux.swmed.edu/svgs/recordlist.php?-max=25&-skip=0&-link=Record+List">Path Slides</a>');
virtualSlideEvent.append('<a href="http://tlinux.swmed.edu/cases-1/findrecords.php?-link=Find">Images</a>')
$('span.links a').before(' | ');
virtualSlideEvent = $('span.firstline:contains("Virtual Slide")').siblings('span.details');
virtualSlideEvent.append('| <a href="http://tlinux.swmed.edu/svgs/recordlist.php?-max=25&-skip=0&-link=Record+List">Path Slides</a>');
virtualSlideEvent.append('| <a href="http://tlinux.swmed.edu/cases-1/findrecords.php?-link=Find">Images</a>')

//SECTION 7
//by popular request, add the day of the week
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
$('tr.date b').each( function(i,b) { var date = new Date(b.innerHTML); $(b).prepend(weekdays[date.getDay()]+' '); });

//SECTION 8
//by popular request, scroll to the current day
function goToDate(date) {
    if(!date)
        date = new Date();
    var index = 0;
    //each will break when function returns false
    $('tr.date b').each( function(i,b) { index = i; return date >= (new Date(b.innerHTML)); });
    //ensure index is at least 1
    index = Math.max(index,1);
    //get the date id
    var dateId = $($('tr.date b')[index-1]).attr('id');
    //scroll to the current day
    scrollTo(dateId);
    //$('body').scrollTop($('#' + dateId).offset().top-$('div#wrapper-bread').outerHeight());
    //location.href = '#' + dateId;
    //set the date selectors to the current day
    $('select.dateSelector').val(dateId);
}

//label the lectures for reference
$('span.firstline b').each( function(i,b) {
    b = $(b);
    if(b.text().match(/[0-9]+-[0-9]+/)) {
    	b.attr('id','lecture'+b.text().slice(0,-1));
        b.addClass('lecture-number');
    } else {
        b.attr('id',b.parents('tr').prevAll('tr.date:first').find('b').attr('id')+b.text().slice(0,-1));
    }
});
//label those without a bold label
$('span.firstline').not($('span.firstline b').parent()).each( function(i,s) {
    s = $(s);
    //restrict labels to numbers and letters
    var id = s.contents().last().text().replace(/[^0-9A-Za-z]/g,'');
    s.attr('id',s.parents('tr').prevAll('tr.date:first').find('b').attr('id')+id);
});

//delay hash processing for 100 ms and until the document is ready
hash = '';
$(document).ready(function() { setTimeout(function () { 
    if(location.hash) {
        //if there is already a hash, toggle it
        hash = location.hash;
        //location.hash = '';
        processHash(hash.substring(1));
    } else {
        //otherwise, go to today
        goToDate();
    }
 },100); });
    
goToDate = goToDate;

//SECTION 9
//link courses and disciplines
var url_ms2 = 'http://medschool.swmed.edu/courses/ms2/index.php';
var url_ms1 = 'http://medschool.swmed.edu/courses/ms1/index.php'
var d = $('<div/>');
var systemLabels;
var systemLinks;
courses = new Object();

//load MS2 links
d.load(url_ms2 + ' h4 + ul a',function () {
    //map MS2 courses to their URLs
    d.find('a').each( function(i,a) {
        var name = a.innerHTML.replace(/ /g,'');
        courses[name] = a.href;
    } );
	//systemLinks.parent().each( function(i,a) { a = $(a); a.attr('href',courses[a.text().replace(/ /g,'')]); });
    //load MS1 links
    d.load(url_ms1 + ' h3 + ul a',function () {
        //map MS1 courses to their URLs
        d.find('a').each( function(i,a) {
            var name = a.innerHTML.replace(/ /g,'');
            courses[name] = a.href;
        } );
        //locate System, Discipline, and Course labels
		systemLabels = $('span.details span:contains(System)').add('span.details span:contains(Discipline)').add('span.details span:contains(Course)');
        //get the text after those labels and link them to their respective pages
		systemLinks = systemLabels.map( function(i,l) { l = $(l); var contents = l.parent().contents(); return contents[contents.index(l)+1] });
		systemLinks.wrap('<a/>');
        systemLinks.parent().each( function(i,a) { a = $(a); a.attr('href',courses[a.text().replace(/ /g,'')]); });
        //currently discipline filter looks for links and needs to be loaded after they have been created
        createDisciplineFilter();
    });
});
    
function createDisciplineFilter() {

//SECTION 10
//filter disciplines
//disciplines = $('span.details:contains(Discipline:)').map( function(i,s) {
//    return $(s).contents()[1].nodeValue.trim();
disciplines = $('span.details span:contains(Discipline:) + a').map( function(i,a) {
    return a.innerHTML.trim();
} ).get().sort().filter( function(v,i,a) {
    return v != a[i+1];
});
target = $('<div class="schedule-key clearfix"><b>Filter:</b></div>');
$('div.schedule-key').after(target);
for(var discipline in disciplines) {
    var keyspan = $('<span class="key-category"/>');
    keyspan.append(disciplines[discipline]);
    keyspan.append($('<input/>',{type: 'checkbox',id: disciplines[discipline],checked: 1}));
    target.append(keyspan);
}
$('div.schedule-key input').change( function (e) {
    $('tr:not(.date):contains('+e.currentTarget.id+')').toggle();
});
    
} //end of main
    
}
