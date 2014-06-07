// ==UserScript==
// @name           ROSI Tools
// @namespace      http://userscripts.org/
// @description    A set of tools to make working with UoT's ROSI a little easier.
// @include        https://sws.rosi.utoronto.ca/sws/*
// @exclude        https://sws.rosi.utoronto.ca/sws/reg/course/list.do?listCourses.dispatch
// ==/UserScript==
ROSITools = {}

ROSITools.checkCourse = function() {
	// no courses entered yet - show the prompt
	if ((GM_getValue('ROSI_courseList') == false) || (typeof(GM_getValue('ROSI_courseList')) == 'undefined'))	{
        // previously entered value of list
        enteredList = (GM_getValue('ROSI_enteredList')) ? GM_getValue('ROSI_enteredList') : '';
		courses = prompt("Enter all courses you want to check availability in, separated by commas:",
                enteredList);
		if (!courses) return

		courses = this.processInput(courses)
        GM_setValue('ROSI_courseList', courses.join(',')) // comma separated list of courses
        GM_setValue('ROSI_enteredList', courses.join(',')) // save the entered list for later
	}
	
	courses = GM_getValue('ROSI_courseList').split(',')
    c = true
	/* uncomment me to present user with a confirmation dialogue. turn into a preference?
     * c = confirm('Now checking: ' + courses[courses.length-1] + '.\n\nStill to go: ' +
	 	courses.slice(0, courses.length-1) + '\n\nClick Cancel to stop the whole thing and start over.')*/
	
	// user chose to cancel the process	
	if (c == false) {
		GM_setValue('ROSI_courseList', '')
		ROSITools.redirectToEnroll()
		return
	}
	document.getElementById('code').value = this.removeCourse()
	document.getElementById('sectionCode').value = 'S'
	// click submit. Submitting the parent courseForm form doesn't work for some reason.
	document.getElementsByName('viewCourse.dispatch')[0].click() 
}

/**
 * Remove whitespace, empty elements and return array of courses
 */
ROSITools.processInput = function(courses) {
	courses = courses.replace(/\s/g, '');
	courses = courses.split(',')
	i = courses.length
	while (i>=0) {
		if ((courses[i] == '') || (courses[i] == null)) { 
			courses.splice(i, 1)
		}
		i--
	}
	return courses
}
/**
 * Remove course from the list, save back to GM and return the removed course
 */
ROSITools.removeCourse = function() {
	courses = GM_getValue('ROSI_courseList').split(',')
	c = courses.pop()
	GM_setValue('ROSI_courseList', courses.join(',')) // save the list back
	return c
}

ROSITools.courseListPrompt = function() {
	// we are on the code entering page - yay
	if (document.getElementById('code') != null) {
        // a typo was made in a course name - reset the list
        if (document.getElementById('content').innerHTML.search('incorrect') > 0) {
            alert("You probably made a mistake in one of the course names")
            GM_setValue('ROSI_courseList', '')
            GM_setValue('ROSI_enteredList', '')
            this.redirectToEnroll()
        }
		this.checkCourse() 	
	// we are NOT on the code entering page 
	} else {
		// we are on the 'try a different course' page. click the link and try the next course on the list
		if (GM_getValue('ROSI_courseList') != false)	{
			if (document.getElementById('content').innerHTML.search('try a different course') > 0) {
				// get the link
				l = document.getElementById('content').getElementsByClassName('section')[0].getElementsByTagName('a')[0]
				// 'click' it, after half a sec to ease the load on ROSI a little
			    this.redirect('http://sws.rosi.utoronto.ca' + l.getAttribute('href'))	
            // already enrolled in course. continue onto next
			} else if (document.getElementById('content').innerHTML.search('You currently have') > 0) {
				this.redirectToEnroll()
            }
			
		// we are done with the list.
		} else {
			alert("Done checking all courses.");
			this.redirectToEnroll()
		}
	}
}

/**
 * A shortcut for redirecting to the Course Enrolment page
 */
ROSITools.redirectToEnroll = function() {
	this.redirect('https://sws.rosi.utoronto.ca/sws/reg/main.do?main.dispatch')
}

/**
 * Redirect to a page after a delay to ease the load on ROSI
 */
ROSITools.redirect = function(link) {
    setTimeout( function() {
        location.href = link
        }, 500)
}

/**
 * Redirect to personal timetable after 2 minutes to prevent session expiry
 */
ROSITools.preventTimeout = function() {
	this.refreshInterval = setInterval( function() { 
            location.href = 'https://sws.rosi.utoronto.ca/sws/timetable/main.do?main.dispatch'
            }, 3*60*1000)
}

ROSITools.run = function() {
	this.preventTimeout()
	// load course list prompt if we're managing courses
	if (location.href.search('/reg/course/') > 0) {
		this.courseListPrompt()
	}
}

ROSITools.run()
