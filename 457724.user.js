// ==UserScript==
// @name       Hide Completed Courses in Codecademy
// @namespace  http://cyst.me/
// @version    0.35
// @description  Allows hidding completed Codecademy courses
// @match      http://www.codecademy.com/courses/*
// @copyright  2014, mikenon
// ==/UserScript==

var thisId = '__courses_app_1__', data = [], stored, hoverEleme = undefined, hidden=false;

function hasLocalStorage(){
	return [('localStorage' in unsafeWindow), (unsafeWindow['localStorage'] !== null), (thisId in localStorage)];
}

function getStorage(){ return JSON.parse(localStorage.getItem(thisId)); }

function setStorage(data){
	s = JSON.stringify(data); 
	return localStorage.setItem(thisId, s ); 
}

function scan(){
	var ret = []
	$(".course_item").each(function() {
		allClass = $('span.badge', this).attr('class').split(' ');
		courseId = allClass[allClass.length-1];
		courseLink = $('a', this).attr('href');
    	courseComplete = $(this).html().search('completed_badge') > -1 ? true : false;
		courseTitle = $('.title_container h3', this).text().trim();
		courseInfo = $('.title_container p', this).text().trim().replace('\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t','');
	    
		$(this).attr('data-id', courseId);
		$(this).attr('data-complete', courseComplete);
		
		ret.push({courseId:courseId, courseLink:courseLink, courseComplete:courseComplete, courseTitle:courseTitle, courseInfo:courseInfo});
	});
	return ret;
}

function sort(data){
	if(hasLocalStorage()[0] && hasLocalStorage()[2]){
		stored = getStorage();
	}
}

function hideCompleted(){
	$('div[data-complete="true"]').css('display','none');
	hidden = true;
}

function showCompleted(){
	$('div[data-complete="true"]').css('display','block');
	hidden = false;
}

function breakdown(result){
	var passed = total = 0;
	for(var x in result){
		total += 1;
		if(result[x].courseComplete){
			passed += 1;
		}
	}
	log('Completed '+passed+' of '+total);
}

function go(){
	data = scan();
	if(hasLocalStorage()[0]){
		log('Saving local');
		setStorage(data);
	}
	breakdown(data);
}


function KeyCheck(e) {
	var code = e.keyCode || e.which;
	if(code==72 || code==104){
		v = $(hoverEleme).attr('data-complete')=='false' ? 'true' : 'false';
		$(hoverEleme).attr('data-complete', v)
		hideCompleted();
	}
}

function waitForFnc(){
	if(! !!$.prototype.live){
		log(!!$.prototype.live);
		window.setTimeout(waitForFnc,500);
	}
	else{
		go();
		window.addEventListener('keydown', KeyCheck, true);
		// $('.container').append('<input type="button" value="Hide Completed" id="btnHide">')
		$('.course_item').live('mouseenter', function() { hoverEleme = this; });
	}
}

$('ul.cf').first().append('<li><a id="btnHide" href="#">Hide Completed</a></li>')
waitForFnc();


$('#btnHide').click(function(e){
	e.preventDefault();
	if(hidden){
		$('#btnHide').text('Hide Completed');
		showCompleted()
	} else {
		$('#btnHide').text('Show Completed');
		hideCompleted();
	}
});

function log(msg){
    unsafeWindow.console && unsafeWindow.console.log(msg);
}