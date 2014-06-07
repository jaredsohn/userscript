// ==UserScript==
// @version       1.0.2
// @name          Mirko ankieta
// @namespace     http://www.wykop.pl/ludzie/piokom123/#mirkoankieta
// @description   Dodaje mozliwosc tworzenia i glosowania w ankietach na mirko
// @include       http://www.wykop.pl/moj/*
// @include       http://www.wykop.pl/mikroblog/*
// @include       http://www.wykop.pl/wpis/*
// @match         http://www.wykop.pl/moj/*
// @match         http://www.wykop.pl/mikroblog/*
// @match         http://www.wykop.pl/wpis/*
// @grant         none
// @run-at        document-end
// ==/UserScript==

console.log('mirkoAnkieta loading');

var mirkoAnkietaCode = function() {
	var mirkoAnkieta = {
		pluginUrl: "http://www.wykop.pl/dodatki/pokaz/534/",
		pluginHtmlUrl: '<a href="http://www.wykop.pl/dodatki/pokaz/534/">http://www.wykop.pl/dodatki/pokaz/534/</a>',
		infoText: "[[ Jeśli widzisz ten tekst to znaczy, że nie masz zainstalowanego dodatku obsługującego ankiety. Znajdziesz go tutaj: {url} ]]",
		pluginInfoText: "Ankieta została dodana przy pomocy pluginu mirkoAnkieta.",
		answers: [],
		votes: [],
		maxVotes: 1, // moze kiedys bede mial czas, zeby skorzystac z tej opcji.. ;)
		greenAllowed: true
	};

	mirkoAnkieta.init = function() {
		try {
			if (mirkoAnkieta.isNewEntryFormAvailable()) {
				console.log('mirkoAnkieta new entry for detected');
				mirkoAnkieta.addNewPollForm();
			}

			if (mirkoAnkieta.isCurrentEntryPoll()) {
				console.log('mirkoAnkieta poll detected');
				mirkoAnkieta.replaceInfoText();

				mirkoAnkieta.loadConfig();

				mirkoAnkieta.showAnswers();
			}

			console.log('mirkoAnkieta initiated');
		} catch(e) {
			console.log('Caught error (mirkoAnkieta.init):' + e.message);
		}
	};

	mirkoAnkieta.loadConfig = function() {
		if ($('#activities-stream blockquote:first').html().indexOf('Zieloni nie mogą głosować w tej ankiecie!')) {
			mirkoAnkieta.greenAllowed = false;
		} else {
			mirkoAnkieta.greenAllowed = true;
		}
	};

	mirkoAnkieta.isCurrentEntryPoll = function() {
		if (!/wykop\.pl\/wpis/i.test(document.location.href)) {
			return false;
		}

		if ($('#activities-stream blockquote:first').html().indexOf(mirkoAnkieta.infoText.replace('{url}', mirkoAnkieta.pluginHtmlUrl)) !== -1) {
			return true;
		}

		return false;
	}

	mirkoAnkieta.replaceInfoText = function() {
		$('#activities-stream blockquote:first').html($('#activities-stream blockquote:first').html().replace(mirkoAnkieta.infoText.replace('{url}', mirkoAnkieta.pluginHtmlUrl), mirkoAnkieta.pluginInfoText));
	}

	mirkoAnkieta.showAnswers = function() {
		mirkoAnkieta.loadAnswers();

		if (mirkoAnkieta.answers.length === 0) {
			return;
		}

		mirkoAnkieta.loadVotes();

		var answersString = '<div style="width: 100%; padding-left: 55px; padding-top: 25px"><div style="font-size: 12px; color: #888; font-weight: normal; border-bottom: 1px solid #888; width: 50%">Odpowiedzi:</div>'
			+ '<div style="width: 100%; padding-top: 15px">';

		for (var i = 0; i < mirkoAnkieta.answers.length; i++) {
			answersString += '<div style="cursor: pointer" class="newtag pollAnswer" id="pollAnswer' + i + '">'
				+ '<span>' + mirkoAnkieta.answers[i] + '</span>&nbsp;<span class="number">' + mirkoAnkieta.getVotesCount(i) + '</span></div><br />';
		}

		answersString += '</div></div>';

		$('#activities-stream blockquote:first').after(answersString);

		$('.pollAnswer').on('click', function() {
			mirkoAnkieta.sendVote(parseInt(this.id.replace('pollAnswer', '')));
			return false;
		});
	}

	mirkoAnkieta.loadAnswers = function() {
		var regexp = /[0-9]+\. (.*?)<br/g;
		var answers = [];
		var question = $('#activities-stream blockquote:first').html();
		var currentFound = null;

		while (currentFound = regexp.exec(question)) {
			answers[answers.length] = currentFound[1];
		}

		mirkoAnkieta.answers = answers;
	}

	mirkoAnkieta.loadVotes = function() {
		var answers = $('.subcomments blockquote').toArray().reverse();
		mirkoAnkieta.votes = [];
		var voters = [];
		var voter = '';

		for (var i = 0; i < answers.length; i++) {
			voter = $('header strong', answers[i]).html();

			if (!mirkoAnkieta.canVoterVote(voter, voters)) {
				continue;
			}

			for (var j = 0; j < mirkoAnkieta.answers.length; j++) {
				if (answers[i].innerHTML.indexOf("[Odpowiedź] " + (j + 1) + ". " + mirkoAnkieta.answers[j]) !== -1) {
					mirkoAnkieta.votes[j] = mirkoAnkieta.getVotesCount(j) + 1;

					voters[voters.length] = voter;

					break;
				}
			}
		}
	}

	mirkoAnkieta.canVoterVote = function(voter, voters) {
		if (mirkoAnkieta.maxVotes <= 1) {
			return $.inArray(voter, voters) === -1;
		}

		var votes = 0;
		for (var i = 0; i < voters.length; i++) {
			if (voters[i] === voter) {
				votes++;

				if (votes >= mirkoAnkieta.maxVotes) {
					return false;
				}
			}
		}

		if (votes >= mirkoAnkieta.maxVotes) {
			return false;
		}

		return true;
	}

	mirkoAnkieta.getVotesCount = function(id) {
		if (typeof mirkoAnkieta.votes[id] === 'undefined') {
			return 0;
		}

		return mirkoAnkieta.votes[id];
	}

	mirkoAnkieta.isNewEntryFormAvailable = function() {
		if ($('#add-comment-profile:visible').length === 0) {
			return false;
		}

		return true;
	}

	mirkoAnkieta.addNewPollForm = function() {
		$('#add-comment-profile').after('<div style="width: 100%; margin-top: 10px; text-align: center">'
		+ '<a href="#" class="button" style="padding: 0px 10px 0px 10px; margin-bottom: 5px;" id="addPollButton">dodaj ankietę</a>'
		+ '<div id="pollFormContainer" style="display: none">'
		+ '<form class="default">'
	//	+ '<div style="padding-top: 10px"><label>Czy zieloni mogą głosować?</label> <select id="pollConfigGreenAllowed">'
	//	+ '<option value="1">tak</option><option value="0">nie</option></select></div>'
		+ mirkoAnkieta.generateAnswerField()
		+ '<a href="#" class="button" style="padding: 0px 10px 0px 10px; margin-top: 5px;" id="addPollAnswerButton">kolejna odpowiedź</a>'
		+ '</form>'
		+ '</div>'
		+ '</div>');
		
		$('input[type=submit]', $('#add-comment-profile')).on('click', function(event) {
			try {
				mirkoAnkieta.updateNewEntryContent();
			} catch(e) {
				console.log(e.message);
			}
		});
		
		$('#addPollButton').on('click', function() {
			mirkoAnkieta.toggleNewPollFormVisibility();
		});

		$('#addPollAnswerButton').on('click', function() {
			$('#addPollAnswerButton').before(mirkoAnkieta.generateAnswerField());
		});
	}

	mirkoAnkieta.generateAnswerField = function() {
		var currentCount = $('.pollAnswers').length;

		return '<div class="pollAnswers" style="padding-top: 10px"><label>Odpowiedź ' + (currentCount + 1) + ':</label> <input type="text" style="width: 500px" /></div>';
	}

	mirkoAnkieta.toggleNewPollFormVisibility = function() {
		if ($('#pollFormContainer').css('display') === 'none') {
			$('#addPollButton').html('usuń ankietę');
			$('#pollFormContainer').fadeIn();
		} else {
			mirkoAnkieta.hideNewPollForm();
		}
	}

	mirkoAnkieta.hideNewPollForm = function() {
		$('#addPollButton').html('dodaj ankietę');
		$('#pollFormContainer').fadeOut(function() {
			mirkoAnkieta.clearNewPollForm();
		});
	}

	mirkoAnkieta.clearNewPollForm = function() {
		$('.pollAnswers').remove();
		$('#addPollAnswerButton').click();
	}

	mirkoAnkieta.updateNewEntryContent = function() {
		var answers = [];

		if ($('#pollFormContainer').css('display') === 'none') {
			return;
		}

		var answersInputs = $('.pollAnswers input');
		for (var i = 0; i < answersInputs.length; i++) {
			if (answersInputs[i].value.trim().length > 0) {
				answers[answers.length] = answersInputs[i].value.trim();
			}
		}

		if (answers.length === 0) {
			return;
		}

		$('textarea[name=entry\\[body\\]]').val(
			$('textarea[name=entry\\[body\\]]').val()
			+ "\n\n\n"
		//	+ mirkoAnkieta.buildConfig()
			+ mirkoAnkieta.buildAnswersList(answers)
			+ "\n\n#mirkoankieta "
			+ "\n\n\n\n"
			+ mirkoAnkieta.infoText.replace('{url}', mirkoAnkieta.pluginUrl)
		);
		$('textarea[name=entry\\[body\\]]').change();

		mirkoAnkieta.hideNewPollForm();
	}

	mirkoAnkieta.sendVote = function(id) {
		$('textarea[name=entry\\[body\\]]:last').val(
			"[Odpowiedź] " + (id + 1) + ". " + mirkoAnkieta.answers[id]
		);
		$('textarea[name=entry\\[body\\]]:last').change();
		$('.replyForm form').submit();
	}

	mirkoAnkieta.buildAnswersList = function(answers) {
		var answersString = "Odpowiedzi: \n\n";

		for (var i = 0; i < answers.length; i++) {
			answersString += (i + 1) + ". " + answers[i] + "\n";
		}

		return answersString;
	}

	mirkoAnkieta.buildConfig = function(answers) {
		var string = "";

		if ($('#pollConfigGreenAllowed').val() == 0) {
			string = "Zieloni nie mogą głosować w tej ankiecie!\n\n\n";
		}

		return string;
	}

	$(document).ready(function() {
		mirkoAnkieta.init();
	});
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + mirkoAnkietaCode.toString() + ")();";
	document.body.appendChild(script);
}

try {
	// http://userscripts.org/scripts/review/167012
	if (typeof $ == 'undefined') {
		if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
			// Firefox
			var $ = unsafeWindow.jQuery;
			mirkoAnkietaCode();
		} else {
			// Chrome
			addJQuery(mirkoAnkietaCode);
		}
	} else {
		// Opera >.>
		mirkoAnkietaCode();
	}
} catch(e) {
	console.log(e.message);
}

console.log('mirkoAnkieta loaded');