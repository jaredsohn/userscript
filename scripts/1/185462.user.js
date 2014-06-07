// ==UserScript==
// @name Prevent multiple clicks
// @description Prevents a user from clicking a link or button multiple times.
// ==/UserScript==
var hasBeenClicked = false;
document.addEventListener('click', function(e){
	if(e.button===0){
		var tgt=e.target;
		if((tgt.tagName.match(/a|button/ig)||
			(tgt.tagName.match(/input/ig)
				&&tgt.getAttribute("type")==="submit"))&&hasBeenClicked){
			e.preventDefault();
		} else {
			hasBeenClicked = true;
		}
	}
});