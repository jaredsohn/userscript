// ==UserScript==

// @name          StackExchange Oldest Answer Sort Order

// @namespace     yijiang

// @include       http://stackoverflow.com/questions/*

// @include       http://meta.stackoverflow.com/questions/*

// @include       http://superuser.com/questions/*

// @include       http://meta.superuser.com/questions/*

// @include       http://serverfault.com/questions/*

// @include       http://meta.serverfault.com/questions/*

// @include       http://askubuntu.com/questions/*

// @include       http://meta.askubuntu.com/questions/*

// @include       http://answers.onstartups.com/questions/*

// @include       http://meta.answers.onstartups.com/questions/*

// @include       http://nothingtoinstall.com/questions/*

// @include       http://meta.nothingtoinstall.com/questions/*

// @include       http://seasonedadvice.com/questions/*

// @include       http://meta.seasonedadvice.com/questions/*

// @include       http://crossvalidated.com/questions/*

// @include       http://meta.crossvalidated.com/questions/*

// @include       http://stackapps.com/questions/*

// @include       http://*.stackexchange.com/questions/*

// ==/UserScript==



if(!isNaN(parseInt(window.location.pathname.split('/')[2]), 10)){

	var answers = document.getElementById('answers').children,

		answerElements = [];

		pages = false,

		cookieName = 'oldest:pref';

	

	for(var i = answers.length - 1; i >= 0 ; i--){

		if((answers[i].className + ' ').indexOf('answer ') > -1){

			answerElements.push(answers[i]);

		} else if((answers[i].className + ' ').indexOf('pager-answers ') > -1){

			pages = true;

			break;

		}

	}

	

	if(!pages){

		var Cookie = {

			create: function (name,value,days) {

				var date = new Date();

				date.setTime(date.getTime()+(days*24*60*60*1000));

				var expires = "; expires="+date.toGMTString();

				

				document.cookie = name+"="+value+expires+"; path=/";

			},

			

			read: function(name) {

				var nameEQ = name + "=";

				var ca = document.cookie.split(';');

				for(var i=0;i < ca.length;i++) {

					var c = ca[i];

					while (c.charAt(0)==' ') c = c.substring(1,c.length);

					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);

				}

				

				return null;

			},

			

			erase: function(name) {

				this.create(name,"",-1);

			}

		}

		

		var tabs = document.getElementById('tabs').children,

			a = document.createElement('a'),

			sortedAnswer = [],

			acceptedAnswer;

		

		a.href = '#';

		a.innerHTML = 'oldest';

		document.getElementById('tabs').insertBefore(a, tabs[0]);

		

		for(var i = 0; i < answerElements.length; i++){

			var accepted = false;

			

			if(document.querySelectorAll){

				accepted = !!answerElements[i].querySelectorAll('.vote-accepted-on').length;

			} else {

				var spans = answerElements[i].getElementsByTagName('span');

				

				for (var i = 0; i < spans.length; i++){

					if((spans[i].className + ' ').indexOf('vote-accepted-on ') > -1){

						accepted = true;

						break;

					}

				}

			}

			

			if(accepted){

				acceptedAnswer = answerElements.splice(i, 1)[0];

				break;

			}

		}

		

		function oldest(){

			var answer = document.getElementById('answers'),

				header = document.getElementById('answers-header').nextSibling,

				i, j, l = answerElements.length;

				

			if(acceptedAnswer) answer.insertBefore(acceptedAnswer, header);

			

			for(i = 0; i < l; i++){

				var pos = answerElements.length - 1;

					lastAnswer = +answerElements[pos].id.substring(7);

				

				for(j = 0; j < answerElements.length; j++){

					if(+answerElements[j].id.substring(7) < lastAnswer){

						lastAnswer = +answerElements[j].id.substring(7);

						pos = j;

					}

				}

				

				answer.insertBefore(answerElements.splice(pos, 1)[0], header);

			}

			

			

			for(i = 0; i < tabs.length; i++){

				tabs[i].className = '';

			}

			

			a.className = 'youarehere';

			

			for(i = 0; i < answerElements.length; i++){

				answer.removeChild(answerElements[i]);

			}

			

			oldest = function(){};

		}

		

		if(Cookie.read(cookieName)){

			oldest();

		}

		

		a.addEventListener('click', function(evt){

			oldest();

			Cookie.create(cookieName, true, 3650);

			

			evt.preventDefault();

		}, false);

		

		for(var i = 1; i < tabs.length; i++){

			tabs[i].addEventListener('click', function(){

				Cookie.erase(cookieName);

			}, false);

		}

	}

}