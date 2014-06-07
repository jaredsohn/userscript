// ==UserScript==
// @name	Hegnar Online Forum Mute Script
// @match	http://forum.hegnar.no/*
// @version 1.2
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", function() {
	var ignoredUsers = JSON.parse(localStorage.getItem("ignoredUsers")) || new Object();
	
	function handler(event) { 
		var link = $(event.currentTarget).parent().find('a').attr('href');
		var userId = link.substr(link.lastIndexOf('=') + 1, link.length - link.lastIndexOf('=') - 1);
		ignoredUsers[userId] = !ignoredUsers[userId];
		localStorage.setItem('ignoredUsers', JSON.stringify(ignoredUsers));
		checkUsers(false);
	}	
	
	$('div.postCreatedBy').prepend(function() {
		return $('<img src="/images/person_bilde.gif" title="Toggle user mute On/Off" />').click(handler);
	});
	
	function checkUsers(firstRun) {
		var animateDuration = firstRun ? 0 : 700;
		for(userId in ignoredUsers) {
			console.log(userId);
			var userLinks = $('div.postCreatedBy a[href$="brukerinfo.asp?userid=' + userId + '"]');
			var userPosts = userLinks.closest('div.post');
			var userBodies = userPosts.find('.postBody');
			if(ignoredUsers[userId]) {
				userPosts.css({ opacity: 0.5 });
				userBodies.css({ backgroundColor : 'black' } );
			} else {
				userBodies.css({ backgroundColor : '', opacity: 1 });
				userPosts.css({ opacity: 1 });
				delete ignoredUsers[userId];
			}
		}
		localStorage.setItem('ignoredUsers', JSON.stringify(ignoredUsers));
	}

	checkUsers(true);
});


