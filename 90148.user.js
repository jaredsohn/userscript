// ==UserScript==
// @name           Vimeo Comment Order Reverser
// @namespace      yijiang
// @description    Reverses the order of the comments on Vimeo video pages
// @include        http://vimeo.com/*
// ==/UserScript==

(function(){
	if(window.location.pathname.match(/^\/[0-9]+$/)){
		var id = window.location.pathname.match(/^\/[0-9]+$/)[0].substring(1),
			seemore = document.getElementById('show_more_comments_link');
		
		function resort(){
			var comments = document.getElementById('comments_' + id), 
				pullCurrent = comments.lastElementChild, 
				pushCurrent = comments.firstElementChild,
				i = 0;

			while(i < comments.childElementCount - 3){
				var commentSet = [];
				
				while(pullCurrent.className !== 'parent'){
					commentSet.push(pullCurrent);
					pullCurrent = pullCurrent.previousElementSibling;
					i++;
				}
				
				commentSet.reverse().push(pullCurrent);
				pullCurrent = pullCurrent.previousElementSibling;
				i++;
				
				for(var l = commentSet.length - 1; l >= 0; l--){
					comments.insertBefore(commentSet[l], pushCurrent);
				}
			}
			
			comments.firstElementChild.className = 'parent first';
			var last = comments.lastElementChild;
			
			for(var i = 0; i < comments.childElementCount; i++){
				if(last.className.indexOf('first') > -1){
					last.className = 'parent';
					break;
				}
				
				last = last.previousElementSibling;
			}
		}
		
		if(seemore != null){
			var script = document.createElement('script');
			script.innerHTML = "show_all_comments(2000, 'clip', " + id + ")";
			document.body.appendChild(script);
			
			setTimeout(function(){
				document.body.removeChild(script);
			}, 50);
			
			var t = setInterval(function(){
				if(!document.getElementById('show_more_comments_link')){
					clearInterval(t);
					resort();
				}
			}, 250);
		} else {
			resort();
		}
	}
})();
