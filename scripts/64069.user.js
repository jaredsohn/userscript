// ==UserScript==
// @name           viewBBGrades
// @include        https://courses.northwestern.edu/webapps/gradebook/do/student/viewCourses
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var courseDiv;
var replace = false;
var repContent = "";
for(var i=0; i<divs.length; i++)
{
	var someDiv = divs[i];
	if(someDiv.className == "landingPageColumn oneCol")
	{
		courseDiv = someDiv;
		replace = true;
		var courses = someDiv.getElementsByTagName("a");
		for(var j=0; j<courses.length; j++)
		{
			var cName = courses[j].innerHTML;
			var cLink = courses[j].href;
			repContent += "<div class='gradeDiv'>";
			repContent += "<h3><a href='" + cLink + "'>" + cName + "</a></h3>";
			repContent += "<center><iframe class='gradeFrame' width='95%' height = '400' src='" + cLink + "' style=' border:1px solid #000000;'></iframe></center>";
			repContent += "</div>";
		}
		i=divs.length;
	}
}
if(replace == true)
{
	var repDiv = document.createElement("div");
	repDiv.innerHTML = repContent;
	var parNode = courseDiv.parentNode;
	parNode.insertBefore(repDiv, courseDiv);
	parNode.removeChild(courseDiv);
}