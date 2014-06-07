// ==UserScript==
// @name           Kajmera Timers
// @author         Stasik0
// @namespace      Nothing
// @description    Kajmera Timers for dirty.ru, these timers show an average id of user commenting posts and an average comment rating
// @include        http://dirty.ru/*
// @include        http://*.dirty.ru/*
// ==/UserScript==
			
			var original_post = document.getElementsByClassName("ord", "div");
			if(original_post.length==1){
				//we seem to view comments
				var comments = document.getElementsByClassName("tree", "div");
				var count = 0;
				var acc = 0;
				var timer = "";
				for(var i=0;i<comments.length;i++){
					uid = comments[i].className.match(/(.*)u([0-9]+)/)[2];
					if(isNumeric(uid)){
						acc += parseInt(uid);
						count++;
					}
				}
				if(count > 0){
					timer=Math.round((acc/count)*10)/10
					document.getElementsByClassName("p", "div", original_post[0])[0].innerHTML += " | &#216;id " + timer;
				};
				//average rating
				acc=0;
				count=0;
				ratings = document.getElementsByClassName("rating", "span");
				for(var i=1;i<ratings.length;i++){
					number = ratings[i].innerHTML.match(/<em(.*)>(.*)<(.*)/i)[2];
					if(isNumeric(number)){
						acc += parseInt(number);
						count++;
					}
				}
				if(count > 0){
					timer=Math.round((acc/count)*10)/10
					document.getElementsByClassName("p", "div", original_post[0])[0].innerHTML += " | &#216;&#177; " + timer;
				};
			};
	
			function isNumeric(input)
			{
				 return (input - 0) == input && input.length > 0;
			}

	
