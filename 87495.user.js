// ==UserScript==
// @name           counter clicker
// @include        http://course.uceusa.com/Courses/Content/*
// ==/UserScript==
function getText() {
	var text = document.getElementById("TimeRemainingClock").innerHTML;
	if (text == '00:00:00') {
		//introduce delay since server doesn't always correspond to exact timer
		window.setTimeout(clickButton,2000);
	} else {
		window.setTimeout(getText,2000);
	}
}

function clickButton() {
	var button = document.getElementById("next_top").parentNode;
	document.location = button.getAttribute('href');
}
getText();