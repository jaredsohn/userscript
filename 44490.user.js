// ==UserScript==

// @name			facebook.com - external apps blocker

// @namespace		www.reeloo.net

// @description		blocks all external apps stories (ie. quizzes) on homepage

// @include			http://www.facebook.com/*

// @include			http://www.new.facebook.com/*

// @version			0.2

// ==/UserScript==





//removes all external stories

function remove_external_stories(){

	

	var url = location.href;

	var block = false;

	if (url.indexOf('#/home.php') >= 0){

		block = true;

	}

	else if (url.indexOf('.facebook.com/home.php') >= 0 && url.indexOf('#') == -1){

		block = true;

	}

	else {

		block = false;

	}

	

	if (block == true){

		var streams_wrapper = document.getElementsByClassName('UIIntentionalStream_Content')[0];

		var streams = streams_wrapper.getElementsByClassName('UIStream');

		var streams_count = streams.length;

		

		//goes through all stories

		for (var i = streams_count - 1; i >= 0; i--){

			var stories = streams[i].getElementsByClassName('UIStory');

			var stories_count = stories.length;

			for (var j = stories_count - 1; j >= 0; j--){

				//this is not precise at all as it can take off even "good" stories

				if (stories[j].innerHTML.indexOf('apps.facebook.com') >= 0 || stories[j].innerHTML.indexOf('quiz.applatform.com') >= 0){

					//hides the element

					stories[j].style.display = 'none';

				}

			}

		}

	}

}





//initiates timer to remove matching stories

function starter(){

	//t - time in ms

	t = setInterval(remove_external_stories, 1000);

	//to disable timer and execute script only once at pageload, comment line above and uncomment line below, and vice-versa

	//remove_external_stories();

}





//waits till page is loaded

window.addEventListener('load', starter, false);
