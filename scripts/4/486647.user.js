// ==UserScript==
// @name       Reddit Quick Switch
// @version    1
// @description  Quickly switch to a new subreddit without editing subs or typing in the url!
// @match      http://www.reddit.com/*
// @copyright  2014+, You
// ==/UserScript==
window.onload = function() {
	var maindiv = document.getElementById('header-bottom-left');
	maindiv.innerHTML += '<form id="quick" action="javascript:this.form.click();"><input type="text" id="quicksw"> </input> <input type="submit" id="quickswsub" value="Go!"></input></form>';
    
	var quicksw = document.getElementById('quicksw');
	var quickswsub = document.getElementById('quickswsub');
    var maindivheight = (maindiv.offsetHeight/4);
    
    quicksw.setAttribute("style","position:absolute;width: 150px; right:25%; bottom:" + maindivheight + "px;text-decoration:none;outline:none;");
    quickswsub.setAttribute("style","position:absolute;width: 50px; right:25%; bottom:" + maindivheight + "px;text-decoration:none;");
    
	quickswsub.onclick=function(){
		newUrl = quicksw.value;
        //alert(newUrl);
		window.location.href = '/r/' + newUrl;
	};
}

document.onkeypress = function() {quicksw.focus();}