// ==UserScript==
// @name           Podaj.net blacklist
// @namespace      http://draakhan.info/greasemonkey/
// @description    Blacklista for, tematow i uzytkownikow
// @include        http://podaj.net/forum/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js
// ==/UserScript==

(function () {
	// Zasoby
	var gfxDeleteIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gJDQsoKzB3NkUAAABIdEVYdENvbW1lbnQAKGMpIDIwMDYgSmFrdWIgU3RlaW5lcgoKY3JlYXRlZCB3aXRoIHRoZSBHSU1QIDo6IGh0dHA6Ly9naW1wLm9yZyP%2FWEAAAAGwSURBVDjLrZS%2FbhNBEIe%2FXdvnBPMAyAWJxBtEAR7ARZoUFhRpUkNPmdSRojR0luihBLkAkRp4i4iC4D7snc%2F31%2FtLcdjy6YglrEyzo9ndb2d%2BM1q4JzMAz54%2FffXi5fDdJoAvn7%2B%2B%2Bf7tx1sAzi%2FOtKmdX5wJoL1Kn0wm%2F5VNv99f%2BjWQ8rxaiwKKAuZz5D1IGGuh1YJ2G9NuQ6dTg9ZBcVxB8hyKAiNhJEBgLFiDWp0K0g3WgKZTSFPIc3YODgC4Ho8BeDwcAvD78hIFAeo9wHt%2FB2g2g3iKzfJlbAFYnglDCAKsNbW4rc1CksCfEDnHr9GoIe71aIRxDsIQZinz%2BfzfGZEkKAqr8rKsAdLNDQoCzPY2pvewVlotI%2BIYogg5x%2B7JSQO0c3qKnMM7h2Yx2cpjdY3SBB9GmFm8jP08PgbEk%2FcfAPDOYcoSkmRN15IUxVMURVwdHaEkqcYAuDo8xGxtYXo98B6l6RpQllWzNK1gPo4rrSTMQhsJa20DVNOou7eHFlAJJCRRuVpsgER3f%2F%2FujB4NBjAYNERe7U5Zlku%2FIfanj%2BPXwEbfyN%2B792e3KMsdIBSVLRAAAAAASUVORK5CYII%3D';
	var cssListTitle = {
		backgroundColor : '#7AAAC4',
		color : '#fff',
		margin : '10px 0px',
		textAlign : 'center',
		padding : '2px 10px',
		fontSize : '12px'
	}
	i18n = {
		addForumToBlacklist : 'Dodaj podforum na czarną listę',
		addTopicToBlacklist : 'Dodaj temat na czarną listę',
		blacklistedForums : 'Podfora na czarnej liście',
		blacklistedTopics : 'Tematy na czarnej liście',
		deleteForumFromBlacklist : 'Usuń podforum z czarnej listy',
		deleteTopicFromBlacklist : 'Usuń temat z czarnej listy',
		hideBlacklistsPreferences : 'Ukryj ustawienia czarnych list',
		noBlacklistedForums : 'Żadne podforum nie zostało dopisane do czarnej listy.',
		noBlacklistedTopics : 'Żaden temat nie został dopisany do czarnej listy',
		seeForum : 'Zobacz podforum',
		seeTopic : 'Zobacz temat',
		showBlacklistsPreferences : 'Pokaż ustawienia czarnych list'
	}
	var savedBlacklistedForums = GM_getValue('blacklistedForums', '');
	var savedBlacklistedTopics = GM_getValue('blacklistedTopics', '');

	// Utworzenie kontenera do konfiguratora czarnych list.
	var $blackListContainer = $(document.createElement('div'));
	$blackListContainer
		.attr('id', 'gmkBlackListContainer')
		.addClass('forumline');

	// Utworzenie nagłówka listy blacklistowanych podfor.
	var $blacklistedForumsTitle = $(document.createElement('p'));
	$blacklistedForumsTitle
		.css(cssListTitle)
		.append('<strong>' + i18n.blacklistedForums + '</strong>');

	// Jeśli żadne podforum nie jest blacklistowane, to wypisujemy informację o tym
	if ('' === savedBlacklistedForums) {
		var $forumsList = $(document.createElement('p'));
		$forumsList
			.css({
				margin : '0px 0px 10px 0px',
				textAlign : 'center'
			})
			.append(i18n.noBlacklistedForums);
	} else {
		// Tworzymy htmlową listę blacklistowanych podfor i dodajemy wszystkie takie podfora.
		var arrBlacklistedForums = savedBlacklistedForums.slice(1, savedBlacklistedForums.length - 1).split('#');
		var $forumsList = $(document.createElement('ol'));
		for (var i in arrBlacklistedForums) {
			// Link umożliwiający podejrzenie blacklistowanego podforum.
			var blacklistedForum = arrBlacklistedForums[i].split('%');
			var $seeForumLink = $(document.createElement('a'));
			$seeForumLink
				.attr('href', 'viewforum.php?f=' + blacklistedForum[0])
				.attr('title', i18n.seeForum)
				.attr('alt', i18n.seeForum)
				.append(blacklistedForum[1]);
			// Link do usunięcia podforum z czarnej listy.
			var $deleteIcon = $(document.createElement('img'));
			$deleteIcon
				.attr('src', gfxDeleteIcon)
				.attr('title', i18n.deleteForumFromBlacklist)
				.attr('alt', i18n.deleteForumFromBlacklist)
				.css({
					verticalAlign : 'middle',
					marginRight : '5px'
				});
			var $removeForumFromBlacklistLink = $(document.createElement('a'));
			$removeForumFromBlacklistLink
				.attr('href', '#')
				.attr('forumId', blacklistedForum[0])
				.attr('forumName', blacklistedForum[1])
				.append($deleteIcon)
				.click(function(e) {
					var forumToRemoveRegExp = new RegExp('#' + $(this).attr('forumId') + '%' + $(this).attr('forumName') + '#');
					savedBlacklistedForums = savedBlacklistedForums.replace(forumToRemoveRegExp, '#');
					if ('#' == savedBlacklistedForums) {
						savedBlacklistedForums = '';
					}
					GM_setValue('blacklistedForums', savedBlacklistedForums);
					window.location.reload();
					e.preventDefault();
					e.stopPropagation();
				});
			// Dodanie elementu htmlowego do listy podfor.
			var $blacklistedForumItem = $(document.createElement('li'));
			$blacklistedForumItem
				.append($removeForumFromBlacklistLink)
				.append($seeForumLink)
				.css({
					lineHeight : '20px'
				});
			$forumsList
				.css({
					textAlign : 'left'
				})
				.append($blacklistedForumItem);
		}
	}

	// Utworzenie nagłówka listy blacklistowanych tematów.
	var $blacklistedTopicsTitle = $(document.createElement('p'));
	$blacklistedTopicsTitle
		.css(cssListTitle)
		.append('<strong>' + i18n.blacklistedTopics + '</strong>');

	// Jeśli żaden temat nie jest blacklistowany, to wypisujemy informację o tym
	if ('' === savedBlacklistedTopics) {
		var $topicsList = $(document.createElement('p'));
		$topicsList
			.css({
				margin : '0px 0px 10px 0px',
				textAlign : 'center'
			})
			.append(i18n.noBlacklistedTopics);
	} else {
		// Tworzymy htmlową listę blacklistowanych tematów i dodajemy wszystkie takie tematy.
		var arrBlacklistedTopics = savedBlacklistedTopics.slice(1, savedBlacklistedTopics.length - 1).split('#');
		var $topicsList = $(document.createElement('ol'));
		for (var i in arrBlacklistedTopics) {
			// Link umożliwiający podejrzenie blacklistowanego tematu.
			var blacklistedTopic = arrBlacklistedTopics[i].split('%');
			var $seeTopicLink = $(document.createElement('a'));
			$seeTopicLink
				.attr('href', 'viewtopic.php?t=' + blacklistedTopic[0])
				.attr('title', i18n.seeTopic)
				.attr('alt', i18n.seeTopic)
				.append(blacklistedTopic[1]);
			// Link do usunięcia tematu z czarnej listy.
			var $deleteIcon = $(document.createElement('img'));
			$deleteIcon
				.attr('src', gfxDeleteIcon)
				.attr('title', i18n.deleteTopicFromBlacklist)
				.attr('alt', i18n.deleteTopicFromBlacklist)
				.css({
					verticalAlign : 'middle',
					marginRight : '5px'
				});
			var $removeTopicFromBlacklistLink = $(document.createElement('a'));
			$removeTopicFromBlacklistLink
				.attr('href', '#')
				.attr('topicId', blacklistedTopic[0])
				.attr('topicTitle', blacklistedTopic[1])
				.append($deleteIcon)
				.click(function(e) {
					var topicToRemoveRegExp = new RegExp('#' + $(this).attr('topicId') + '%' + $(this).attr('topicTitle') + '#');
					savedBlacklistedTopics = savedBlacklistedTopics.replace(topicToRemoveRegExp, '#');
					if ('#' == savedBlacklistedTopics) {
						savedBlacklistedTopics = '';
					}
					GM_setValue('blacklistedTopics', savedBlacklistedTopics);
					window.location.reload();
					e.preventDefault();
					e.stopPropagation();
				});
			// Dodanie elementu htmlowego do listy tematów.
			var $blacklistedTopicItem = $(document.createElement('li'));
			$blacklistedTopicItem
				.append($removeTopicFromBlacklistLink)
				.append($seeTopicLink)
				.css({
					lineHeight : '20px'
				});
			$topicsList
				.css({
					textAlign : 'left'
				})
				.append($blacklistedTopicItem);
		}
	}

	// Utworzenie kontenera panelu zarządzania blacklistami i podpięcie do niego
	// list z blacklistowanymi forami i tematami.
	var $blackListPreferences = $(document.createElement('div'));
	$blackListPreferences
		.attr('id', 'gmkBlackListPreferences')
		.append($blacklistedForumsTitle)
		.append($forumsList)
		.append($blacklistedTopicsTitle)
		.append($topicsList)
		.hide();

	// Utworzenie przełącznika widoczności panelu zarządzania blacklistami.
	var $toggler = $(document.createElement('a'));
	$toggler
		.attr('href', '#')
		.append(i18n.showBlacklistsPreferences)
		.click(function(e) {
			$blackListPreferences.toggle();
			if (0 == $('#gmkBlackListPreferences:visible').length) {
				$(this).text(i18n.showBlacklistsPreferences);
			} else {
				$(this).text(i18n.hideBlacklistsPreferences);
			}
			e.preventDefault();
			e.stopPropagation();
		});

	// Uzupełnienie kontenera panelu zarządzania blacklistami i podpięcie go
	// pod nagłówek forum.
	$blackListContainer
		.append($toggler)
		.append($blackListPreferences);
	$('#content .forumline:eq(0)').after($blackListContainer);

	// Obsługa strony głównej forum.
	var url = document.location.toString().replace(/http:\/\/podaj\.net\/forum\//, '');
	if ('' === url ||  0 <= url.indexOf('index.php')) {
		// Iterujemy przez wszystkie podfora na głównej.
		$('.lastTR').each(function(i) {
			// Sprawdzenie czy podforum jest blacklistowane i jeśli tak, to ukrycie go.
			var $forumLink = $(this).find('.row1h .forumlink');
			var forumId = $forumLink.attr('href').slice(16);
			var forumName = $forumLink.text().replace(/\\|\||\/|\{|\}|\.|\,|\(|\)|\+|\?|\:|\!|\[|\]|\^|\$/g, '');
			var forumToCheck = '#' + forumId + '%';
			if (0 <= savedBlacklistedForums.indexOf(forumToCheck)) {
				$(this).hide();
				if (0 === $(this).parent().find('.lastTR:visible').length) {
					$(this).parent().parent().parent().hide();
				}
				return true;
			}
			// Jeśli podforum nie jest blacklistowane, to dodajemy linka
			// umożliwiającego blacklistowanie.
			var $addForumToBlacklistLink = $(document.createElement('a'));
			$addForumToBlacklistLink
				.attr('href', '#')
				.append(i18n.addForumToBlacklist)
				.click(function(e) {
					if (-1 == savedBlacklistedForums.indexOf(forumToCheck)) {
						if ('' === savedBlacklistedForums) {
							savedBlacklistedForums += '#';
						}
						savedBlacklistedForums += forumId + '%' + forumName + '#';
						GM_setValue('blacklistedForums', savedBlacklistedForums);
					}
					window.location.reload();
					e.preventDefault();
					e.stopPropagation();
				});
			// Podpięcie linka do blacklistowania podforum do spana umieszczonego
			// pod wykazem moderatorów podforum.
			$(this).find('.moderators').append('<br />');
			var $addForumToBlacklistSpan = $(document.createElement('span'));
			$addForumToBlacklistSpan.append($addForumToBlacklistLink);
			$(this).find('.row1h').append($addForumToBlacklistSpan);
		});
	}

	// Obsługa strony z listą tematów na forum
	if (0 <= url.indexOf('viewforum.php')) {
		// Iterujemy przez wszystkie tematy
		$('.topiclink a').each(function() {
			var topicId = $(this).attr('href').slice(16);
			if (parseInt(topicId) != topicId) {
				return true;
			}
			var topicTitle = $(this).text().replace(/\\|\||\/|\{|\}|\.|\,|\(|\)|\+|\?|\:|\!|\[|\]|\^|\$/g, '');
			var topicToCheck = '#' + topicId + '%';

			if (0 <= savedBlacklistedTopics.indexOf(topicToCheck)) {
				$(this).parent().parent().parent().hide();
				return true;
			}

			var $deleteIcon = $(document.createElement('img'));
			$deleteIcon
				.attr('src', gfxDeleteIcon)
				.attr('title', i18n.addTopicToBlacklist)
				.attr('alt', i18n.addTopicToBlacklist)
				.css({
					verticalAlign : 'middle',
					marginRight : '5px'
				});

			var $addTopicToBlacklistLink = $(document.createElement('a'));
			$addTopicToBlacklistLink
				.attr('href', '#')
				.append($deleteIcon)
				.click(function(e) {
					if (-1 == savedBlacklistedTopics.indexOf(topicToCheck)) {
						if ('' === savedBlacklistedTopics) {
							savedBlacklistedTopics += '#';
						}
						savedBlacklistedTopics += topicId + '%' + topicTitle + '#';
						GM_setValue('blacklistedTopics', savedBlacklistedTopics);
					}
					window.location.reload();
					e.preventDefault();
					e.stopPropagation();
				});

			$(this).parent().find(':first')
				.before($addTopicToBlacklistLink);
		});
	}

	// Obsługa strony z wynikami wyszukiwania i postami od ostatniej wizyty.
	if (0 <= url.indexOf('search.php')) {
		// Ukrycie tematów z blacklistowanych podfor.
		var counter = 0;
		$('a.forumlink').each(function(i) {
			var forumId = $(this).attr('href').slice(16);
			if (0 <= savedBlacklistedForums.indexOf('#' + forumId + '%')) {
				$(this).parent().parent().parent().hide();
				counter++;
			}
		});
		$('a.topictitle').each(function(i) {
			// Ukrycie blacklistowanych tematów.
			var topicId = parseInt($(this).attr('href').slice(16));
			var topicToCheck = '#' + topicId + '%';
			if (0 <= savedBlacklistedTopics.indexOf(topicToCheck)) {
				$(this).parent().parent().parent().hide();
				counter++;
				return true
			}
			var topicTitle = $(this).text().replace(/\\|\||\/|\{|\}|\.|\,|\(|\)|\+|\?|\:|\!|\[|\]|\^|\$/g, '');

			var $deleteIcon = $(document.createElement('img'));
			$deleteIcon
				.attr('src', gfxDeleteIcon)
				.attr('title', i18n.addTopicToBlacklist)
				.attr('alt', i18n.addTopicToBlacklist)
				.css({
					verticalAlign : 'middle',
					marginRight : '5px'
				});

			var $addTopicToBlacklistLink = $(document.createElement('a'));
			$addTopicToBlacklistLink
				.attr('href', '#')
				.append($deleteIcon)
				.click(function(e) {
					if (-1 == savedBlacklistedTopics.indexOf(topicToCheck)) {
						if ('' === savedBlacklistedTopics) {
							savedBlacklistedTopics += '#';
						}
						savedBlacklistedTopics += topicId + '%' + topicTitle + '#';
						GM_setValue('blacklistedTopics', savedBlacklistedTopics);
					}
					window.location.reload();
					e.preventDefault();
					e.stopPropagation();
				});

			$(this).parent().find(':first')
				.before($addTopicToBlacklistLink);
		});
		// Zamiana tekstu informującego o ilości wyników.
		var foundPosts = parseInt($('h2').text().slice(11).replace(/wyników|wyniki|wynik/, '')) - counter;
		if (1 == foundPosts) {
			resultsText = 'wynik';
		} else if (2 <= foundPosts && 4 >= foundPosts) {
			resultsText = 'wyniki';
		} else {
			resultsText = 'wyników';
		}
		resultsText = 'Znaleziono ' + foundPosts + ' ' + resultsText;
		$('h2').text(resultsText);
		$('.nav-current').text(resultsText);
		if (0 === foundPosts) {
			$('#content .table table').hide();
		}
	}

	// Obsługa strony z wyświetleniem treści tematu.
	if (0 <= url.indexOf('viewtopic.php')) {
		var topicId = parseInt(url.slice(url.search(/t=\d*/) + 2));
		var topicToCheck = '#' + topicId + '%';
		var topicTitle = $('h2').text().replace(/\\|\||\/|\{|\}|\.|\,|\(|\)|\+|\?|\:|\!|\[|\]|\^|\$/g, '');

		var $deleteIcon = $(document.createElement('img'));
		$deleteIcon
			.attr('src', gfxDeleteIcon)
			.attr('title', i18n.addTopicToBlacklist)
			.attr('alt', i18n.addTopicToBlacklist)
			.css({
				verticalAlign : 'middle',
				marginRight : '5px'
			});

		var $addTopicToBlacklistLink = $(document.createElement('a'));
		$addTopicToBlacklistLink
			.attr('href', '#')
			.append($deleteIcon)
			.click(function(e) {
				if (-1 == savedBlacklistedTopics.indexOf(topicToCheck)) {
					if ('' === savedBlacklistedTopics) {
						savedBlacklistedTopics += '#';
					}
					savedBlacklistedTopics += topicId + '%' + topicTitle + '#';
					GM_setValue('blacklistedTopics', savedBlacklistedTopics);
				}
				window.location.reload();
				e.preventDefault();
				e.stopPropagation();
			});

		$('h2').append($addTopicToBlacklistLink);
	}
}());
