// ==UserScript==
// @name        ExcludeUnrelatedMajors
// @namespace   http://userscripts.org/users/476753
// @description This is a simple script I wrote for my dad. it deletes a few options from a select element.
// @include     http://200.200.254.2/
// @version     1
// ==/UserScript==

alert("Greasemonkey script is running on this page...");
var CmbCourse = unsafeWindow.frames[1].document.querySelector('#CmbCourse');
if (CmbCourse) {
	var tmp = null, ind = null, c = 0;
	//list of all allowed courses
	var allowedCourses = ["540", "86330032", "86330031", "550"];
	var rest = new Array(CmbCourse.options.length - allowedCourses.length);
	//finding option elements for allowed courses
	for (var i=0; i<CmbCourse.options.length; i++){
		tmp = CmbCourse.options[i].value;
		ind = allowedCourses.indexOf(tmp)    
		if (ind > -1) {
			allowedCourses[ind] = CmbCourse.options[i];
		} else {
			rest[c++] = CmbCourse.options[i];
		}    
	}
	//deleting all options
	CmbCourse.options.length = 0;
	//adding allowed courses to the beginnig and the rest after them
	for (var i=0; i<allowedCourses.length + rest.length; i++){
		if (i < allowedCourses.length){
			CmbCourse.options[i] = allowedCourses[i];
		}else{
			CmbCourse.options[i] = rest[i - allowedCourses.length];
		}
	}
	
	alert("Finished reordering courses...");
}