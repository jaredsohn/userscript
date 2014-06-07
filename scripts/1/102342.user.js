// ==UserScript==
// @name          Fanfiction Tools
// @author        Ewino
// @version       1.7.2
// @description   Enhances fanfiction.net.
// @namespace     http://userscripts.org/scripts/show/102342
// @include       http://*.fanfiction.net/*
// @include       https://*.fanfiction.net/*
// @downloadURL   //userscripts.org/scripts/source/102342.user.js
// @updateURL     //userscripts.org/scripts/source/102342.meta.js
// @resource      miniColorsCss https://github.com/claviska/jquery-miniColors/blob/master/jquery.minicolors.css
// @history       1.7.2 Small fixes for site changes (more time formatting and pages moved to https)
// @history       1.7 Removed the "no-copy" limitation, Fixed FF.net color problems (extra-contrasted buttons and mismatched backgrounds), adjusted for new date formats (thanks phelougu!), small changes in chapter separators.
// @history       1.62 Tweaked the autoloading feature a bit. So now it works and is more precise. Also changed the text and buttons color on dark backgrounds
// @history       1.6 Added color choosers. Now you can customize the date and word-mark colors (i.e. to work better with the dark theme)
// @history       1.55 Some style changes (changed the chapter titles/separators), Made the combineReview and shortenFavsFollows toggles work (thanks phelougu!)
// @history       1.5 Changes to accomodate to ff.net's structure and style changes (yay! no more annoying menus!). If you find a feature that doesn't work for you, please let me know.
// @history       1.4 Introduced language filtering, shortened the new favs/follows line, and started using GM's built-in updater.
// @history       1.39 A new fix for the site changes. Thanks afoongwl!
// @history       1.38 No major update yet. Adapting to the site's new layout.
// @history       1.37 Added the average update interval.
// @history       1.36 Fixed a bug in Firefox 3.6 where the menu would not open
// @history       1.35 Fixed a bug (following a site update) where marking information in several lists (like a user's favorite stories tab) didn't work.
// @history       1.3 Added options to auto-close menus only on click, and not hide the chapter navigator (also fixed a small bug with list auto-loading)
// @history       1.2 Added an options window and fixed a small bug.
// @history       1.1 Fixed a bug with updating the url-hashes.
// @history       1.05 FF.net introduced "Share" links in the beginning of each chapter, which broke the auto-loading feature. This fixes it.
// @history       1.0 First version. Rewritten from "Power Fanfiction.net" by Ultimer (http://userscripts.org/scripts/show/61979)
// ==/UserScript==

/*jshint smarttabs:true */
/*global utils:true, features:true, GM_setValue: true, GM_getValue: true, GM_addStyle: true, unsafeWindow: true*/

/* 
 * IMPORTANT:
 * ====================
 * For all those who are looking to change the script's settings, there's now a menu called
 * "Fanfiction Tools Options" at the top right of every ff.net window (right next to the site's "help" menu)
 * Click on it to access your settings.
 * ====================
 */
var settings = {};

/* DO NOT CHANGE THIS!  IT WILL DO NOTHING */
var defaultSettings = {
	colorDate:  true,	/** Color the dates. [true/false] */
	colorComplete:  true,	/** Add a unique color to completed stories. [true/false] */
	dateFormat: 1,	/** Format of the date. [0/1] 0:US date format, 1:UK date format */
	dateOrder: 0,	/** Order of the date. [0/1] 0: Published-Updated, 1: Updated-Published */
	sep:  '/',	/** Separator of the dates. (i.e. '-' would result in 1-2-2000). */
	fullStoryLoad:  false,	/** Load the entire story when opening a story. [true/false] */
	loadAsYouGo: true,	/** Load the next chapter as you read [true/false]. Ignored when fullStoryLoad: true. */
	loadListsAsYouGo: true,	/** Load the next page in a list as you pass through it. [true/false] */
	markWords: 'rape|death|MPREG',	/** Words that are marked in the story summary. [an array of words] */
	combineReview: true,	/** Combine the review link with the review count. [true/false] */
	shouldRelativeDate: true,	/** use relative dates. [true/false] */
	showPostingFrequency: true,	/** show the average posting frequency. [true/false] */
    hideChaptersNavigator: true,	/** Hide the chapters drop-down menu. [true/false] */
    shortenFavsFollows: true,	/** Whether to shorten favs/follows info to small symbols. [true/false] */
	viewLanguages: '',	/** The preferred languages. Stories not of these languages won't be shown (disabled if empty) [an array of language names] */
	showFirstChapterSeparator: true, /** Whether to show the separator/title of the first (non-ajax-loaded) chapter. [true/false] */
	colors_shade1: '#00B500', // Light Green
	colors_shade2: '#008000', // Dark Green
	colors_shade3: '#4060DD', // Light Blue
	colors_shade4: '#0000AD', // Dark Blue
	colors_shade5: '#800090', // Purple
	colors_shade6: '#FF8C00', // Orange
	colors_shade7: '#FF0000', // Red
	colors_complete: '#00EEEE', // Cyan
	colors_marked_words: '#FF0000'
};

var env = {
	/** The chapter we currently view. */
	currentChapter: 1,

	/** The amount of chapters in this story. */
	totalChapters: 1,
	
	/** The current chapter, or the one last loaded through AJAX. */
	lastLoadedChapter: -1,
	
	/** Whether the current story is complete. */
	isComplete: false,
	
	/** The URL to load the next page in a paged list. */
	nextListPageUrl: '',

	/** The ~real~ window element. The unsafe one if we use GM */
	w: (unsafeWindow || window),

	/** A shortcut function to use for logging */
	log: null
};

env.log = env.w.console.log;

/** This will be called after the environment finishes initialization. it's the start-point. */
function load() {
	// for some reason we also run for the sharing iframe. this prevents that.
	if (!unsafeWindow || unsafeWindow.location.host.indexOf('fanfiction.net') === -1) { return; }
	loadJQuery();

	$('head').append('<link type="text/css" rel="stylesheet" href="//cdn.jsdelivr.net/jquery.minicolors/2.0.4/jquery.minicolors.css">');
	$.getScript('//cdn.jsdelivr.net/jquery.minicolors/2.0.4/jquery.minicolors.js', function() {
		// This is needed because the script tag (containing the js lib) takes time
		// to load, and the setup function needs it.
		features.optionsMenu.setup();
	});
	unsafeWindow.storylist_render = features.favStoriesRender;
	features.settings.load();
	
	features.fixStyles();
	
	// all selectors
	var chapterNavigator = utils.getChapterNavigator(), storyTextEl = $('#storytext'), zlists = $('.z-list');
	
	if (storyTextEl.length > 0) { // we're in a story page
		
		features.formatting.doStoryPageInfo($('#profile_top span:contains(Rated:)').last());
		
		if (chapterNavigator.length > 0) { // the story has multiple chapters!
			if ((settings.loadAsYouGo || settings.fullStoryLoad) && settings.hideChaptersNavigator) { chapterNavigator.hide(); }
			env.totalChapters = utils.chapters.getCount();
			var currentChapter = env.currentChapter = utils.chapters.getCurrent();
			
			// setup dom helper elements
			storyTextEl.prepend('<div id="story-start" style="display: none"></div>').append('<div id="story-end" style="display: none"></div>');
			if (settings.fullStoryLoad || (settings.loadAsYouGo && settings.showFirstChapterSeparator)) {
				$('#story-start').after(features._getChapterSeparator(currentChapter, null));
			}
			var currentSep = $('header.fftools-chapter-sep:first').addClass('current-chapter');
			features._addEndOfStorySeparatorIfNeeded(currentChapter);
			$('.a2a_kit').prependTo(currentSep);
			
			var hash = utils.getLocationHash();
			if (hash !== '' && isFinite(hash) && hash > currentChapter) { features.redirectToChapter(hash); return; }
			
			if (settings.fullStoryLoad) { features.autoLoad.loadFullStory(); }
			else if (settings.loadAsYouGo) { features.setLoadAsYouGo(); }
		}
		
	} else if (zlists.length > 0) { // we're in a page containing lists
		
		zlists.each(function () { features.formatting.doListEntry(this); });
		
		if (settings.loadListsAsYouGo) { features.autoLoad.autoLoadLists(); }
		
	}
}

/***************** Features *****************/

features = {

	fixStyles: function() {
		this.fixTheme();
		
		GM_addStyle(
			'.nocopy { -moz-user-select: inherit !important; } ' +
			
			'#storytextp, #storytext { -moz-user-select: inherit !important; }'
		);
	},

    /**
     * Called on theme switch (light/dark) and fixes some design problems (dark links on dark background etc)
     */
    fixTheme: function() {
        var originalFunc = env.w['_fontastic_change_theme'];

        GM_addStyle(
            'body.dark #content_parent .btn {' +
                'background-color: #555;' +
                'background-image: linear-gradient(to bottom, #666, #444);' +
                'background-repeat: repeat-x;' +
                'border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);' +
                'color: #FFFFFF;' +
                'text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);' +
            '}' +
			'body.dark #content_parent div#alert_subs {' +
				'color: #eee;' +
			'}' +
			'body.dark .lc-left {' +
				'background-color: #333;' +
			'}' +
            'body.dark #content_parent select {' +
                'background-color: #555;' +
                'color: #eee;' +
                'border-color: #777;' +
            '}' +
            'body.dark #content_parent a, body.dark #content_parent a:link, ' +
            'body.dark #content_parent a:active, body.dark #content_parent a:visited {' +
                'color: #6AB7FF' +
            '}'
        );

        function changeTheme(theme) {
            originalFunc.apply(this, arguments);
            if (theme == 'light') {
                $(env.w.document.body).removeClass('dark');
            } else {
                $(env.w.document.body).addClass('dark');
            }
        }
        env.w._fontastic_change_theme = changeTheme;
    },
	
	/**
	 * This is a copy of the original storylist_render function, but with some (highlighted) changes.
	 * It is used to write certain lists like a user's Favorite Stories list.
	 * Note: some unhighlighted changes are that some functions have to be called now through the unsafeWindow.
	 */
	favStoriesRender: function (story_array, startrow, show_cat, show_author) {
		var buffer = [];
		var story;

		for(var i = story_array.length, c = startrow; i > 0; i--, c++) {
			story = story_array[i-1];
			/*************************** CHANGE ***************************/
			/* Here we store the old buffer in a temp var and use our own buffer for this single entry html. */
			var mainBuffer = buffer;
			buffer = [];
			/************************ END OF CHANGE ***********************/

			buffer[buffer.length] = c + ". <a  href='/s/" + story.storyid + "/1/" + story.stitleu + "'>";
            buffer[buffer.length] = story.stitle + "</a> ";

			if(story.chapters > 1) {
				buffer[buffer.length] = " <a style='text-decoration:none;' href='/s/" + story.storyid + "/"+ story.chapters +"/" + story.stitleu + "'>&#187;</a> ";
			}

			if(show_author === 1) { buffer[buffer.length] = "by <a href='/u/" + story.userid + "/" + story.pennameu + "'>" + story.penname + "</a> "; }

			if(story.ratingtimes > 0) { buffer[buffer.length] = "<a class=reviews href='/r/" + story.storyid + "/'>reviews</a>"; }
			buffer[buffer.length] = "<blockquote>" + story.summary + "<br><span class='gray' style='font-size=11px'>";
			
			if(show_cat === 1) {
				if(story.crossover > 0) {
					buffer[buffer.length] = "Crossover - " + story.category + " - ";
				}
				else {
					buffer[buffer.length] = story.category + " - ";
				}
			}

			buffer[buffer.length] = unsafeWindow.array_censors[story.censorid] + " - ";
			buffer[buffer.length] = unsafeWindow.array_languages[story.languageid] + " - ";

			if(story.genreid > 0) {
				buffer[buffer.length] = unsafeWindow.array_genres[story.genreid];
				if(story.subgenreid > 0) {
					buffer[buffer.length] =  "/" + unsafeWindow.array_genres[story.subgenreid];
				}
			}
			else if(story.subgenreid > 0) {
				buffer[buffer.length] = unsafeWindow.array_genres[story.subgenreid] + " - ";
			}
			
			buffer[buffer.length] = " - Chapters: " + story.chapters + " - Words: " + unsafeWindow.addCommas(story.wordcount) + " - Reviews: " + story.ratingtimes + " - Updated: " + story.dateupdatetext + " - Published: " + story.datesubmittext;

			if(story.chars.length) { buffer[buffer.length] =  " - " + story.chars; }
			if(story.statusid === 2) { buffer[buffer.length] =  " - Complete"; }
			
			buffer[buffer.length] = "</span></blockquote>";
			
			/*************************** CHANGE ***************************/
			/* Now that we have the entry's html, we can reformat it like any normal list entry.
			 * Also, return the buffer to be what it was. */
			var entryEl = $('<div />').html(buffer.join(''))[0];
			features.formatting.doListEntry(entryEl);
			
			buffer = mainBuffer;
			buffer.push(entryEl.innerHTML);
			/************************ END OF CHANGE ***********************/
		}
		return buffer.join("");
	},

	shouldHideListEntry: function(listEntry) {
		if (settings.viewLanguages == null || settings.viewLanguages.length === 0) { return false; }
		
		var html = listEntry.html();
		var matcher = html.match(/Rated: .*? - (.*?) - /);
		if (!matcher) { return false; }
		
		if (matcher[1]) {
			var storyLang = matcher[1].toLowerCase();
			for (var i = 0; i < settings.viewLanguages.length; i++) {
				var vl = settings.viewLanguages[i].toLowerCase();
				if (vl === storyLang) {
					return false;
				}
			}
			return true;
		}
	},
	
	formatting: {

		doStoryPageInfo: function(elementToFormat) {
			elementToFormat.attr('id', 'details-line');
			this.formatInfo(elementToFormat, undefined, true);
		},

		doListEntry: function(listEntry) {
			listEntry = $(listEntry);
			if (features.shouldHideListEntry(listEntry)) {
				listEntry.remove();
				return false;
			}
			
			var reviewLink = listEntry.children('a[href^="/r/"]');
			if (settings.combineReview) { reviewLink.hide(); }
			var reviewsUrl = reviewLink.attr('href') || '';
			
			if (reviewsUrl === '') {
				var storyLink = listEntry.children('a[href^="/s/"]');
				var storyUrl = storyLink.attr('href') || '';
				var urlMatch = storyUrl.match(/\/s\/(\d+)/);
				if (urlMatch && urlMatch[1]) {
					var storyId = urlMatch[1];
					reviewsUrl = '/r/' + storyId + '/';
				}
			}
			
			listEntry[0].innerHTML = utils.markWords(listEntry[0].innerHTML, settings.markWords);
			this.formatInfo(listEntry.find('.z-padtop2,.gray,.xgray'), reviewsUrl);
			return true;
		},

		formatInfo: function(detailsLine, reviewsUrl, saveIsComplete) {
			// arguments verification.
			if ((detailsLine = $(detailsLine)).length === 0) { return; }
			if (!reviewsUrl) { reviewsUrl = detailsLine.children('a[href^="/r/"]').attr('href') || ''; }

			var html = detailsLine[0].innerHTML,
				bCompleted = false,
				matcher; // for general purposes :)
			
			if (settings.viewLanguages != null && settings.viewLanguages.length === 1 && settings.viewLanguages[0].indexOf('-') === -1) {
				html = html.replace(new RegExp(' - ' + settings.viewLanguages[0] + ' - ', 'i'), ' - ');
			}

            matcher = html.match(/Rated: (<a [^>]+>)?(Fiction\s+)?([\w+]+)(<\/a>)?/);
			if (matcher) {
				html = html.replace(matcher[0], features.formatting._getRatingTagString(matcher[3]));
			}

			// if a Complete text exists, remove it and keep note of it.
            matcher = html.match(/[\s\-]*(Status: )?Complete([\s\-]*)/);
			if (matcher) {
				bCompleted = true;
				html = html.replace(matcher[0], matcher[2]);
			}

			// set the review link
            matcher = html.match(/Reviews: (<a[^>]+>)?([\d,]+)(<\/a>)?/);
			if (matcher && settings.combineReview) {
				var reviewLink = 'Reviews: ' + utils.getReadableNumber(matcher[2]);
				if (reviewsUrl) { reviewLink = '<a href="' + reviewsUrl + '" style="color: gray;border-bottom: 1px dashed">' + reviewLink + '</a>'; }
				html = html.replace(matcher[0], reviewLink);
			}
			
			var totalChapters = env.totalChapters;
			if (env.totalChapters === 1) { totalChapters = 0; }

			// set the words/chapter
            matcher = html.match(/Chapters: ([\d,]+) +- Words: ([\d,]+)/);
			if (matcher) {
				totalChapters = utils.parseNum(matcher[1]);
				var wordsPerChapter = utils.getReadableNumber(Math.round( utils.parseNum(matcher[2]) / totalChapters ));
				html = html.replace(matcher[0], 'Size: <abbr title="Average: ' + wordsPerChapter + ' words per chapter">' + matcher[1] + '/' + utils.getReadableNumber(matcher[2]) + '</abbr>');
			}

            // format favorites and followers text
            matcher = html.match(/( - Favs: [\d,]+| - Follows: [\d,]+){1,2}/); // either favs, follows, or both in either order
			if (matcher && settings.shortenFavsFollows) {
				var orig = matcher[0];
				var favs = (matcher = orig.match(/Favs: ([\d,]+)/)) ? matcher[1] : 0, 
					follows = (matcher = orig.match(/Follows: ([\d,]+)/)) ? matcher[1] : 0;
				html = html.replace(orig, features.formatting._getFavsFollowsString(utils.parseNum(favs), utils.parseNum(follows)));
			}

			matcher = html.match(/( - (?:Updated: (.+?) - )?Published: (.+?))(?: -|$)/);  // 0 - all, 1 - part to replace, 2 - Updated/undefined 3 - Published
			if (matcher) {
				var publishDate = matcher[3], updateDate = matcher[2];
				html = html.replace(matcher[1], features.formatting._getUpdatedPublishedString(publishDate, updateDate, bCompleted, totalChapters));
			}

			env.isComplete = bCompleted;
			detailsLine[0].innerHTML = html;
		},

		/**
		 * Gets the " - Updated: x/y/z - Published: a/b/c" string, formatted per the user's settings.
		 * @param publishDate The raw FF.net formatted date of this story's publishing.
		 * @param updateDate The raw FF.net formatted date of this story's last update (or null, for single chapter stories).
		 * @param completed whether this story is complete.
		 * @param totalChapters The number of total chapters in the story.
		 */
		_getUpdatedPublishedString: function(publishDate, updateDate, completed, totalChapters) {
			publishDate = utils.dates.parseFFDate(publishDate);
			updateDate = updateDate ? utils.dates.parseFFDate(updateDate) : null;

			// in case there was no update date specified (i.e. for a oneshot or a story that was never updated)
			if (!updateDate) { return ' - ' + utils.dates.formatDateExtended(publishDate, completed, 'Published: '); }
			
			var avgPostingFrequency = 0;
			if (totalChapters > 0) {
				var storyLifespan = (updateDate - publishDate) / 1000 / 24 / 3600;
				avgPostingFrequency = storyLifespan / totalChapters;
			}

			// declare the final strings.
			var publishedPart = ' - Published: ' + utils.dates.formatDate(publishDate),
				updatedPart = ' - ' + utils.dates.formatDateExtended(updateDate, completed, 'Updated: ', avgPostingFrequency);

			return (settings.dateOrder === 1) ? updatedPart + publishedPart : publishedPart + updatedPart;
		},
		
		_getFavsFollowsString: function(favsCount, followsCount) {
			return ' - <abbr title="Favorited by ' + utils.getReadableNumber(favsCount) + ' people">&#x2661;' + utils.getReadableNumber(favsCount) + '</abbr> ' +
					'<abbr title="Followed by ' + utils.getReadableNumber(followsCount) + ' people">&#x2606;' + utils.getReadableNumber(followsCount) + '</abbr>';
		},
		
		_getRatingTagString: function(rating) {
			var description = 'Unknown rating';
			switch(rating.toLowerCase()) {
				case 'k':
					description = 'Intended for general audience 5 years and older. Content should be free of any coarse language, violence, and adult themes.';
					break;
				case 'k+':
					description = 'Suitable for more mature childen, 9 years and older, with minor action violence without serious injury. May contain mild coarse language. Should not contain any adult themes.';
					break;
				case 't':
					description = 'Suitable for teens, 13 years and older, with some violence, minor coarse language, and minor suggestive adult themes.';
					break;
				case 'm':
					description = 'Not suitable for children or teens below the age of 16 with non-explicit suggestive adult themes, references to some violence, or coarse language.\n\n' +
						'Fiction M can contain adult language, themes and suggestions. Detailed descriptions of physical interaction of sexual or violent nature is considered Fiction MA.';
					break;
				case 'ma':
					description = 'Content is only suitable for mature adults. May contain explicit language and adult themes.';
			}
			
			return '<abbr title="' + description.replace('"', '') + '">Rated: ' + rating + '</abbr>';
		}
	},
	
	/**
	 * Redirects the browser to the specified chapter's page.
	 * @param chapterNum The chapter to navigate to.
	 */
	redirectToChapter: function(chapterNum) {
		utils.infoBar.setText('-- Jumping to chapter ' + chapterNum + ': ' + utils.chapters.getTitle(chapterNum) + ' --');
		document.location = utils.chapters.getLink(chapterNum);
	},

	autoLoad: {

		/** Starts the process of loading all chapters of a story (using a recursive function). */
		loadFullStory: function() {
			this._fullStoryLoadStep(1);
		},

		/**
		 * Loads a chapter with the intention of loading the next one after it (until all chapters are loaded).
		 * @param chapterNum The chapter to load.
		 */
		_fullStoryLoadStep: function(chapterNum) {
			var chapNum = chapterNum;

			// if we're not at the end, be prepared to load the next chapter after loading this one.
			var callback = (chapNum < env.totalChapters) ? function() { features.autoLoad._fullStoryLoadStep(chapNum + 1); } : null;

			if ($('#GEASEMONKEYSEPARATOR' + chapNum).length === 0) { // the chapter hasn't been loaded yet
				features._loadChapterContent(chapNum, /* addBefore: */ chapNum < env.currentChapter, callback);
			} else {
				if (callback) { callback(); }
			}
		},

		autoLoadLists: function( ) {
			env.nextListPageUrl = this._getNextLinkPageUrl($(document.body));
			if (!env.nextListPageUrl) { return; } // if we don't have a "next" link, there's no place to load from.

			var interval = -1;

			interval = setInterval(function() {

				// stop this if we don't have a next page url, or we'll try to load from an empty string (bad but funny - it then loads this page which leads to circular loading)
				if (!env.nextListPageUrl) {
					clearInterval(interval);
					return;
				}

				if (utils.pos.getScreenfullsLeft() < 0.5 && !utils.infoBar.isShown()) {
					features.autoLoad._loadListPage(env.nextListPageUrl);
				}

			}, 100);
		},

		_loadListPage: function(pageUrl) {
			utils.infoBar.setText('-- Loading next page --');
			
			var nextLinkFunc = this._getNextLinkPageUrl;
			
			utils.httpRequest({
				url: pageUrl,
				onload: function(responseDetails) {
				
					var responseBody = responseDetails.responseText.match(/<body[\s\S]*<\/body>/gi);
					if (!responseBody || !responseBody[0])  { // the body was not found :(
						utils.infoBar.setText('-- Error loading page --');
						return;
					}
					
					responseBody = responseBody[0];
					responseBody = responseBody.replace(/^<body/i, "<div").replace(/\/body>$/, '/div>');
					responseBody = $(responseBody).first();
					
					env.nextListPageUrl = nextLinkFunc(responseBody);

					responseBody.find('.z-list')
						.filter(function() { return features.formatting.doListEntry(this); }) // format the entry's text, and include only the non-hidden entries
						.hover(
							function() { $(this).addClass('z-high'); },
							function() { $(this).removeClass('z-high'); }) // add the z-high class at hover
						.insertAfter('.z-list:last');

					responseBody.empty().remove(); // clean up the loaded DOM.

					utils.infoBar.hide();
				}
			});
		},

		/**
		 * Finds the target of the "next" link of the list.
		 * @param parent The element that should contain the list (dom or textual)
		 */
		_getNextLinkPageUrl : function(parent) {
			// finds links with their text ~exactly~ "next" or "Next \u00bb" (») or "Next »"
			var anchors = $(parent).find('a:contains("next"),a:contains("Next \u00bb"),a:contains("Next »")')
					.filter(function() {return $(this).text() === 'Next \u00bb' || $(this).text() === 'next'; } );
			return anchors.last().attr('href');
		}
	},
	
	setLoadAsYouGo: function() {
		if (!settings.loadAsYouGo) { return; }
		
		env.lastLoadedChapter = env.currentChapter;
		
		var chapterLoadInterval = 0, refreshHashInterval = 0;
		
		chapterLoadInterval = setInterval(loadChapterIfNeeded, 100);
		refreshHashInterval = setInterval(refreshHash, 50);
		
		var storytextp = $('#storytextp')[0];
		
		function loadChapterIfNeeded() {
			if (env.lastLoadedChapter >= env.totalChapters) { // stop when you've loaded all chapters.
				clearInterval(chapterLoadInterval);
				chapterLoadInterval = -1;
			}
			
			if (env.lastLoadedChapter < env.totalChapters && !utils.infoBar.isShown() && utils.pos.getScreenfullsLeft(storytextp) < 1.5)  {
				features._loadChapterContent(env.lastLoadedChapter + 1, false /* do not add before */, function() { env.lastLoadedChapter++; });
			}
		}
		
		function refreshHash() {
		
			var currentHash = utils.parseNum(utils.getLocationHash()) || 0;
			if (currentHash >= (utils.parseNum(env.totalChapters) || 0)) {
				/* If there won't be anymore chapters loaded, we can stop checking for hashes.
				 * Otherwise, a new chapter might raise the totalChapters count and more hash refreshing will be needed. */
				if (chapterLoadInterval === -1) {
					clearInterval(refreshHashInterval);
					refreshHashInterval = -1;
				}
				return;
			}
			
			$('header.fftools-chapter-sep:not(.current-chapter)').each(function() {
				var chapId = utils.parseNum($(this).attr('data-chapterid')) || 0;
				if (chapId <= currentHash) { return; } // wev'e already passed this separator.
				if (utils.pos.getRelativeHeight(this) < 100) { // the separator is either in the top 100 pixels of the screen, or we've passed it.
					document.location.hash = chapId;
				}
			});
		}
	},
	
	/**
	 * Retrieves a chapter from the server asynchronously, parses it's contents,
	 * and inserts the chapter text before or after the current chapter's one.
	 * Note: This function also updates the environment's totalChapters with fresh info from the server.
	 * @param chapterNum The number of the chapter to load.
	 * @param addBefore Whether to add this chapter before the current one, or append it to the end.
	 * @param callback An optional function to call after the loading is complete.
	 */
	_loadChapterContent: function(chapterNum, addBefore, callback) {
		var chapterTitle = utils.chapters.getTitle(chapterNum);
		utils.infoBar.setText('-- Loading chapter ' + chapterNum + '/' + env.totalChapters + ': ' + chapterTitle + ' --');
		
		utils.httpRequest({
			url: utils.chapters.getLink(chapterNum),
			onload: function(responseDetails) {
				var regmatch = responseDetails.responseText.match(/<div class='storytext[^']*' id='storytext'>([\s\S]*?)<\/div>/i);
				if (regmatch == null || !regmatch[1]) { utils.infoBar.setText('Error loading next page'); return; }
				
				// calculating new maximum chapter, in case another chapter was added.
				// this is not necessary when loading full stories, since the chances for an update during load are slim, and this is a somewhat costly operation
				if (!settings.fullStoryLoad) {
					env.totalChapters = utils.chapters.getCountFromHtmlString(responseDetails.responseText);
				}
				
				var storytext = regmatch[1];
				var sharetext = '';
				
				// if we have a "Share" div, we remove it from the story text so we can put it /before/ the separator.
				var sharematch = storytext.match(/<div class='a2a_kit [\s\S]*?<\/div>/i);
				if (sharematch) {
					sharetext = sharematch[0];
					storytext = storytext.replace(sharetext, '');
				}
				
				// NOTE: I deliberately do not put the sharetext here (before the separator where it belongs) because a JS function must be called to initialize it, which I cannot found for now. I have to see if the share links are really nessecary
				
				// we insert 'before' the story-end so the 'end' would move to after the ~new~ chapter, and the next one will load after this new chapter and not after the original one.
				$(addBefore ? '#story-start' : '#story-end').before(features._getChapterSeparator(chapterNum, chapterTitle) + storytext);
				
				features._addEndOfStorySeparatorIfNeeded(chapterNum);
				
				utils.infoBar.hide();
				if (callback) { callback(); }
			}
		});
	},
	
	/***************** Options Menu *****************/

	settings: {
		load: function() {
		
			function _innerLoad(settName, parseFunc) {
                parseFunc = parseFunc || null;
				var value = GM_getValue(settName);
				if (value !== undefined && parseFunc) { value = parseFunc(value); }
				if (value === undefined) {
					value = defaultSettings[settName];
					GM_setValue(settName, value);
				}
				settings[settName] = value;
			}
			
			function _splitWOEmptyParts(separator) {
				return function(val) {
					var split = val.split(separator);
					var arr = [];
					for (var i = 0; i < split.length; i++) {
						if (split[i] !== '' && split[i] != null) {
							arr.push(split[i]);
						}
					}
					return arr;
				};
			}

			if (GM_getValue('colorDate') === undefined) { features.settings.save(defaultSettings); }
			_innerLoad('colorDate');
			_innerLoad('colorComplete');
			_innerLoad('dateFormat');
			_innerLoad('dateOrder');
			_innerLoad('sep');
			_innerLoad('fullStoryLoad');
			_innerLoad('loadAsYouGo');
			_innerLoad('loadListsAsYouGo');
			_innerLoad('markWords', _splitWOEmptyParts('|'));
			_innerLoad('combineReview');
			_innerLoad('shouldRelativeDate');
			_innerLoad('showPostingFrequency');
			_innerLoad('hideChaptersNavigator');
            _innerLoad('shortenFavsFollows');
			_innerLoad('viewLanguages', _splitWOEmptyParts('|'));
			_innerLoad('showFirstChapterSeparator');
			_innerLoad('colors_shade1');
			_innerLoad('colors_shade2');
			_innerLoad('colors_shade3');
			_innerLoad('colors_shade4');
			_innerLoad('colors_shade5');
			_innerLoad('colors_shade6');
			_innerLoad('colors_shade7');
			_innerLoad('colors_complete');
			_innerLoad('colors_marked_words');
		},

		save: function(sett) {
			var s2s /* settings to set */ = sett || settings;
			function _innerSet(settName, serFunc) {
				var value = s2s[settName];
				if (serFunc) { value = serFunc(value); }
				GM_setValue(settName, value);
			}
			_innerSet('colorDate');
			_innerSet('colorComplete');
			_innerSet('dateFormat');
			_innerSet('dateOrder');
			_innerSet('sep');
			_innerSet('fullStoryLoad');
			_innerSet('loadAsYouGo');
			_innerSet('loadListsAsYouGo');
			_innerSet('markWords', function(val) { return val.join('|'); });
			_innerSet('combineReview');
			_innerSet('shouldRelativeDate');
			_innerSet('showPostingFrequency');
			_innerSet('hideChaptersNavigator');
            _innerSet('shortenFavsFollows');
			_innerSet('viewLanguages', function(val) { return val.join('|'); });
            _innerSet('showFirstChapterSeparator');
			_innerSet('colors_shade1');
			_innerSet('colors_shade2');
			_innerSet('colors_shade3');
			_innerSet('colors_shade4');
			_innerSet('colors_shade5');
			_innerSet('colors_shade6');
			_innerSet('colors_shade7');
			_innerSet('colors_complete');
			_innerSet('colors_marked_words');
		}
	},
	
	/** This is used to create a menu at the top of the page, that opens a configuration window. */
	optionsMenu: {
	
		/** This sets up the menu (both the actual menu and the button that opens it) */
		setup: function() {
			$('.zui td:last-child').append('<div id="menu-fftools" class="xmenu_item"><a class="dropdown-toggle" href="" onclick="return false;">Fanfiction Tools Options</a></div>');
			$('#menu-fftools').click(features.optionsMenu.show);
			
			GM_addStyle(
				'#menu-fftools { display: inline-block; margin-top: 4px; float: right; text-decoration: underline; }' +
				'#ffto-mask { top: 0; left: 0; width: 100%; height: 100%; position: fixed; opacity: 0.75; background-color: #777; z-index: 5; }' +
				'#ffto-menu-wrapper { border: 1px solid #CDCDCD; background-color: #F6F7EE; padding: 4px; width: 500px;' +
					'position: absolute; top: 50px; left: 50%; margin-left: -250px; z-index: 5; }' +
				'#ffto-menu { background-color: white; min-height: 150px; border: 1px solid #CDCDCD; }' +
				'#ffto-menu .tabs { background-color: #F0F1E6; margin-bottom: 2px; padding-bottom: 2px; }' +
				'#ffto-menu .tabs > ul { background-color: #F6F7EE; border-bottom: 1px solid #CDCDCD; }' +
				'#ffto-menu .tabs li { display: inline-block; padding: 0; }' +
				'#ffto-menu .tabs li:first-child { padding-left: 5px; }' +
				'#ffto-menu .tabs li.active { background-color: #F0F1E6; border-bottom: 1px solid #F0F1E6; border-left: 1px solid #CDCDCD; border-right: 1px solid #CDCDCD; margin-bottom: -1px; }' +
				'#ffto-menu .tabs li:first-child.active { border-left: none; }' +
				'#ffto-menu .tabs li a { display: inline-block; padding: 5px 8px; margin: 2px 1px; cursor: pointer; text-decoration: none; color: #000; }' +
				'#ffto-menu .tabs li a:hover { text-decoration: underline; border-bottom: none; }' +
				'#ffto-menu INPUT { width: auto; }' +
				'#ffto-menu-title { color: white; background-color: #339; font-weight: bold; font-size: 15px; padding: 5px 10px; }' +
				'.fftools-options-body { font-size: 12px; padding: 5px; }' +
				'.ffto-title { letter-spacing: 1px; margin-left: 3px; font-size: 16px; margin-top: 2px; margin-bottom: 2px; }' +
				'.ffto-sect { padding: 5px 2px; margin: 5px 0; border-top: 1px solid #CDCDCD; border-bottom: 1px solid #CDCDCD }' +
				'.ffto-sect:last-of-type { border-bottom: none }' +
				'#ffto-menu UL { padding: 0; margin: 0; list-style: none; }' +
				'#ffto-menu SELECT { font-size: 12px; }' +
				'#ffto-menu LABEL { display: inline-block; margin-top: 4px; margin-right: 5px; }' +
				'#ffto-menu INPUT[type=text] { font-size: 12px; padding: 2px; margin-right: 5px; }' +
				'#ffto-menu INPUT[type=checkbox] { margin-top: 0; }' +
				'#ffto-menu .comment { font-size: 9px; display: inline-block; }' +
				'#ffto-menu .help { float: right; border: 1px solid #339; border-radius: 10px; height: 18px; width: 18px; text-align: center; cursor: help; }' +
				'#ffto-sect-dates > UL { margin-bottom: 5px; }' +
				'#ffto-sect-dates > UL > LI { display: inline-block; width: 49%; }' +
				'#ffto-sect-dates > DIV { display: inline-block; margin: 0 5px; margin-top: 5px; }' +
				'#ffto-date-sep { text-align: center; }' +
				'#ffto-autoload-stories, #ffto-autoload-lists { margin-left: 5px; }' +
				'#ffto-first-chap-sep { margin-left: 10px; }' +
				'#ffto-sect-info LI { margin: 3px 0 }' +
				'#ffto-menu-footer { font-size: 10px; margin-top: 2px; position: relative }' +
				'#ffto-link-to-script { display: inline-block; right: 0pt; position: absolute; bottom: 0 }' +
				'#ffto-buttons { text-align: center; }' +
				'#ffto-buttons INPUT[type=button] { margin: 3px }' +
				'#ffto-menu-close-x { float: right; color: white; border: medium none; font-weight: inherit; }');
			
			var col1_desc = 'Shows when the fic was updated within the last week',
				col2_desc = 'Shows when the fic was updated in the last two weeks',
				col3_desc = 'Shows when the fic was updated in the last month',
				col4_desc = 'Shows when the fic was last updated in the last two months',
				col5_desc = 'Shows when the fic was last updated in the last three months',
				col6_desc = 'Shows when the fic was last updated in the last six months',
				col7_desc = 'Shows when the fic was NOT updated at all in the last six months',
				col_complete_desc = 'Shows when the fic is complete';
			
			$(env.w.document.body).append(
				'<div id="ffto-mask" style="display: none"></div>' +
				'<div id="ffto-menu-wrapper" style="display: none">' +
					'<div id="ffto-menu">' +
						'<div id="ffto-menu-title"><a id="ffto-menu-close-x" href="#" onclick="return false">X</a>Fanfiction Tools Options</div>' +
						'<div class="tabs"><ul><li class="active main-tab"><a>Main</a></li><li class="colors-tab"><a>Colors</a></li></ul></div>' +
						'<div class="fftools-options-body main-tab">' +
							'<div class="ffto-title">Dates</div>' +
							'<div class="ffto-sect" id="ffto-sect-dates">' +
								'<ul>' +
									'<li><input id="ffto-color-dates" type="checkbox"' + (settings.colorDate ? ' checked="checked"' : '') + '/> <label for="ffto-color-dates">Color Dates</label></li>' +
									'<li><input id="ffto-color-complete" type="checkbox"' + (settings.colorComplete ? ' checked="checked"' : '') + '/> <label for="ffto-color-complete">Color Complete Stories</label></li>' +
									'<li><input id="ffto-relative-dates" type="checkbox"' + (settings.shouldRelativeDate ? ' checked="checked"' : '') + '/> <label for="ffto-relative-dates">Show Relative Dates</label></li>' +
									'<li><input id="ffto-posting-frequency" type="checkbox"' + (settings.showPostingFrequency ? ' checked="checked"' : '') + '/> <label for="ffto-posting-frequency">Show Posting Frequency</label></li>' +
								'</ul>' +
								'<div>' +
									'<label for="ffto-date-format">Date Format:</label>' +
									'<select id="ffto-date-format">' +
										'<option' + (settings.dateFormat === 0 ? ' selected="selected"' : '') + ' value="0">US - 12/31/2000</option>' +
										'<option' + (settings.dateFormat === 1 ? ' selected="selected"' : '') + ' value="1">UK - 31/12/2000</option>' +
									'</select>' +
								'</div>' +
								'<div>' +
									'<label for="ffto-date-sep">Separator:</label>' +
									'<input id="ffto-date-sep" type="text"  size="2" value="' + settings.sep + '"/>' +
								'</div>' +
								'<div>' +
									'<label for="ffto-dates-order">Dates order:</label>' +
									'<select id="ffto-dates-order">' +
										'<option' + (settings.dateOrder === 1 ? ' selected="selected"' : '') + ' value="1">Updated-Published</option>' +
										'<option' + (settings.dateOrder === 0 ? ' selected="selected"' : '') + ' value="0">Published-Updated</option>' +
									'</select>' +
								'</div>' +
							'</div>' +
							'<div class="ffto-title">Auto Loading</div>' +
							'<div class="ffto-sect">' +
								'<table><tbody>' +
									'<tr>' +
										'<td><label for="ffto-autoload-stories">Stories:</label></td>' +
										'<td>' +
											'<select id="ffto-autoload-stories">' +
												'<option' + ((!settings.loadAsYouGo && !settings.fullStoryLoad) ? ' selected="selected"' : '') + ' value="none">No autoloading</option>' +
												'<option' + ((settings.loadAsYouGo && !settings.fullStoryLoad) ? ' selected="selected"' : '') + ' value="chapter">Autoload next chapter</option>' +
												'<option' + (settings.fullStoryLoad ? ' selected="selected"' : '') + ' value="full">Autoload full story</option>' +
											'</select>' +
											'<input id="ffto-first-chap-sep" type="checkbox"' + (settings.showFirstChapterSeparator ? ' checked="checked"' : '') + '/> ' +
											'<label for="ffto-first-chap-sep">Show title for first chapter</label>' +
										'</td>' +
									'</tr>' +
									'<tr>' +
										'<td><label for="ffto-autoload-lists">Lists:</label></td>' +
										'<td><input id="ffto-autoload-lists" type="checkbox"' + (settings.loadListsAsYouGo ? ' checked="checked"' : '') + '/> <label for="ffto-autoload-lists">Enable Autoload</label></td>' +
									'</tr>' +
								'</tbody></table>' +
							'</div>' +
							'<div class="ffto-title">Story Info</div>' +
							'<div class="ffto-sect" id="ffto-sect-info">' +
								'<ul>' +
									'<li>' +
										'<label for="ffto-marked-words">Words to mark:</label>' +
										'<input id="ffto-marked-words" type="text" value="' + settings.markWords.join('|') + '" size="30" />' +
										'<div class="comment"> - pipe-sign ("|") separated</div>' +
									'</li>' +
									'<li>' +
										'<div class="help" title="Show only stories of these languages. Empty list shows all languages">?</div>' +
										'<label for="ffto-view-langs">Story Languages:</label>' +
										'<input id="ffto-view-langs" type="text" value="' + settings.viewLanguages.join('|') + '" size="25" />' +
										'<div class="comment"> - pipe-sign ("|") separated</div>' +
									'</li>' +
									'<li><input id="ffto-combine-reviews-link" type="checkbox"' + (settings.combineReview ? ' checked="checked"' : '') + '/> <label for="ffto-combine-reviews-link">Combine the link to the reviews with reviews count</label></li>' +
									'<li><input id="ffto-shorten-favs-follows" type="checkbox"' + (settings.shortenFavsFollows ? ' checked="checked"' : '') + '/> <label for="ffto-shorten-favs-follows">Shorten favs and follows info into small symbols</label></li>' +
								'</ul>' +
							'</div>' +
							'<div class="ffto-title">Misc.</div>' +
							'<div class="ffto-sect">' +
								'<ul>' +
									'<li><input id="ffto-hide-chapters-navigator" type="checkbox"' + (settings.hideChaptersNavigator ? ' checked="checked"' : '') + '/> <label for="ffto-hide-chapters-navigator">Hide chapters drop-down list when autoloading is on</label></li>' +
								'</ul>' +
							'</div>' +
						'</div>' +
						'<div class="fftools-options-body colors-tab">' +
							'<div class="ffto-title">Story Status <span class="comment">(click in the text boxes to open a color chooser)</span></div>' +
							'<div class="ffto-sect" id="ffto-sect-color-status">' +
								'<table>' +
									'<tr>' +
										'<td><label title="' + col1_desc + '" for="ffto-colors-s1">Shade 1:</label></td>' +
										'<td><input type="text" title="' + col1_desc + '" id="ffto-colors-s1" class="color" value="' + settings.colors_shade1 + '"/></td>' +
										'<td><label title="' + col5_desc + '" for="ffto-colors-s5">Shade 5:</label></td>' +
										'<td><input type="text" title="' + col5_desc + '" id="ffto-colors-s5" class="color" value="' + settings.colors_shade5 + '"/></td>' +
									'</tr>' +
									'<tr>' +
										'<td><label title="' + col2_desc + '" for="ffto-colors-s2">Shade 2:</label></td>' +
										'<td><input type="text" title="' + col2_desc + '" id="ffto-colors-s2" class="color" value="' + settings.colors_shade2 + '"/></td>' +
										'<td><label title="' + col6_desc + '" for="ffto-colors-s6">Shade 6:</label></td>' +
										'<td><input type="text" title="' + col6_desc + '" id="ffto-colors-s6" class="color" value="' + settings.colors_shade6 + '"/></td>' +
									'</tr>' +
									'<tr>' +
										'<td><label title="' + col3_desc + '" for="ffto-colors-s3">Shade 3:</label></td>' +
										'<td><input type="text" title="' + col3_desc + '" id="ffto-colors-s3" class="color" value="' + settings.colors_shade3 + '"/></td>' +
										'<td><label title="' + col7_desc + '" for="ffto-colors-s7">Shade 7:</label></td>' +
										'<td><input type="text" title="' + col7_desc + '" id="ffto-colors-s7" class="color" value="' + settings.colors_shade7 + '"/></td>' +
									'</tr>' +
									'<tr>' +
										'<td><label title="' + col4_desc + '" for="ffto-colors-s4">Shade 4:</label></td>' +
										'<td><input type="text" title="' + col4_desc + '" id="ffto-colors-s4" class="color" value="' + settings.colors_shade4 + '"/></td>' +
										'<td><label title="' + col_complete_desc + '" for="ffto-colors-complete">Complete:</label></td>' +
										'<td><input type="text" title="' + col_complete_desc + '" id="ffto-colors-complete" class="color" value="' + settings.colors_complete + '"/></td>' +
									'</tr>' +
								'</table>' +
							'</div>' +
							'<div class="ffto-title">Marked Words Colors</span></div>' +
							'<div class="ffto-sect" id="ffto-sect-color-misc">' +
								'<label for="ffto-colors-marked">Text Color:</label>' +
								'<input type="text" id="ffto-colors-marked" class="color" value="' + settings.colors_marked_words + '"/>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div id="ffto-menu-footer">' +
						'<a id="ffto-link-to-script" href="http://userscripts.org/scripts/show/102342" target="_blank">Fanfiction Tools by Ewino</a>' +
						'<div id="ffto-buttons">' +
							'<input type="button" id="ffto-cancel-button" value="Cancel"/>' +
							'<input type="button" id="ffto-save-button" value="Save Changes & Refresh"/>' +
						'</div>' +
					'</div>' +
				'</div>');
				
			$('#ffto-mask').click(features.optionsMenu.hide);
			$('#ffto-menu-close-x').click(features.optionsMenu.hide);
			$('#ffto-cancel-button').click(features.optionsMenu.hide);
			$('#ffto-save-button').click(features.optionsMenu._setChanges);
			$('#ffto-menu .tabs .main-tab a').click(function() { features.optionsMenu._changeTab('main-tab'); });
			$('#ffto-menu .tabs .colors-tab a').click(function() { features.optionsMenu._changeTab('colors-tab'); });
		},
		
		_changeTab: function(tabToActivate) {
			$('.fftools-options-body').hide();
			$('.fftools-options-body.' + tabToActivate).show();
			$('#ffto-menu .tabs li').removeClass('active');
			$('#ffto-menu .tabs li.' + tabToActivate).addClass('active');
		},
		
		_loadColors: function() {
			$('#ffto-menu INPUT[type=text].color').each(function() {
				var el = $(this);
				el.minicolors({ defaultValue: el.val() });
			});
			features.optionsMenu._loadColors = $.noop;
		},
		
		/** Opens up the menu. */
		show: function() {
			features.optionsMenu._loadColors();
			features.optionsMenu._changeTab('main-tab');
			$('#ffto-mask').show();
			$('#ffto-menu-wrapper').show();
		},
		
		/** Hides the menu. */
		hide: function() {
			$('#ffto-mask').hide();
			$('#ffto-menu-wrapper').hide();
		},
		
		/**
		 * Update the script's settings with the selected values in the menu.
		 * Refreshes the page afterwards to apply the changes.
		 */
		_setChanges: function() {
			settings.colorDate = $('#ffto-color-dates')[0].checked;
			settings.colorComplete = $('#ffto-color-complete')[0].checked;
			settings.dateFormat = utils.parseNum($('#ffto-date-format')[0].value) || 0;
			settings.dateOrder = utils.parseNum($('#ffto-dates-order')[0].value) || 0;
			settings.sep = $('#ffto-date-sep')[0].value;
			settings.fullStoryLoad = ($('#ffto-autoload-stories')[0].value === 'full');
			settings.loadAsYouGo = ($('#ffto-autoload-stories')[0].value === 'chapter');
			settings.showFirstChapterSeparator = ($('#ffto-first-chap-sep')[0].checked);
			settings.loadListsAsYouGo = $('#ffto-autoload-lists')[0].checked;
			settings.markWords = $('#ffto-marked-words')[0].value.split('|');
			settings.combineReview = $('#ffto-combine-reviews-link')[0].checked;
			settings.shouldRelativeDate = $('#ffto-relative-dates')[0].checked;
			settings.showPostingFrequency = $('#ffto-posting-frequency')[0].checked;
			settings.hideChaptersNavigator = $('#ffto-hide-chapters-navigator')[0].checked;
			settings.viewLanguages = $('#ffto-view-langs')[0].value.split('|');
            settings.shortenFavsFollows = $('#ffto-shorten-favs-follows')[0].checked;
			settings.colors_shade1 = $('#ffto-colors-s1').val();
			settings.colors_shade2 = $('#ffto-colors-s2').val();
			settings.colors_shade3 = $('#ffto-colors-s3').val();
			settings.colors_shade4 = $('#ffto-colors-s4').val();
			settings.colors_shade5 = $('#ffto-colors-s5').val();
			settings.colors_shade6 = $('#ffto-colors-s6').val();
			settings.colors_shade7 = $('#ffto-colors-s7').val();
			settings.colors_complete = $('#ffto-colors-complete').val();
			settings.colors_marked_words = $('#ffto-colors-marked').val();
			
			// we use a timeout to ensure that we we don't set the settings from a 3rd party script (and therefore at risk).
			// actually GreaseMonkey throws an exception if we don't ensure that :)
			setTimeout(function() {
				features.settings.save();
				location.reload();
				features.optionsMenu.hide();
			}, 0);
		}
	},
	
	/***************** Separators *****************/
	
	/**
	 * Add CSS rules for chapter separators.
	 * This method is only called once and self destructs afterwards.
	 */
	addSeparatorsStyling: function() {
		GM_addStyle(
			'.fftools-chapter-sep { display: block; border-bottom: 1px solid; padding: 0 18px 5px; margin: 50px -15px 20px; font-weight: 100; font-size: 24px; }' +
			'.fftools-chapter-sep .prog-marker {float: right; font-size: 14px; margin-top: 4px;}' +
			'.fftools-end-marker { display: block; border-bottom: 1px solid; border-top: 1px solid; padding: 10px 15px; margin: 50px -15px; ' + 
									'font-weight: 100; font-size: 24px; text-align: center }'
			);
		features.addSeparatorsStyling = $.noop;
	},
	
	
	/**
	 * Returns an HTML string of a chapter-separator element.
	 * @param chapterNum The number of the chapter (to identify the separator).
	 * @param chapterTitle The optional title of the chapter to view in the separator text. If not given, it fetches the chapter's title itself :)
	 * @return An HTML string.
	 */
	_getChapterSeparator: function(chapterNum, chapterTitle) {
		features.addSeparatorsStyling();
		if (chapterTitle == null) { chapterTitle = utils.chapters.getTitle(chapterNum); }
		var id = 'GEASEMONKEYSEPARATOR' + chapterNum,
			separatorText = 'Chapter ' + chapterNum;
		if (chapterTitle != separatorText) { // We have a chapter title!
			separatorText += ': ' + chapterTitle;
		}
		return '<header id="' + id + '" class="fftools-chapter-sep" data-chapterid="' + chapterNum + '">' 
			+ '<div class="prog-marker">(' + chapterNum + '/' + env.totalChapters + ')</div>'
			+ separatorText 
			+ '</header>';
	},
	
	/**
	 * Adds an "End of story"/"To be continued" remark/separator at the end of the story, if the given chapter is the last one.
	 * @param chapterNum The number of chapter being inserted.
	 */
	_addEndOfStorySeparatorIfNeeded: function(chapterNum) {
		var id = 'GEASEMONKEYSEPARATOR_END';
		if (chapterNum >= env.totalChapters && $('#' + id).length === 0) {
			features.addSeparatorsStyling();
			
			var text = env.isComplete ? 'End of story' : 'To be continued...';
			
			$('#story-end').after('<footer class="fftools-end-marker" id="' + id + '">' + text + '</footer>');
		}
	}
};



/***************** Utils *****************/

utils = {
	/** The date right now. */
	now: new Date(),
	
	/** Returns the hash part of the location */
	getLocationHash: function() {
		return location.hash.substr(1);
	},
	
	parseNum: function(num) {
		if (typeof(num) === "number") { return num; }
		
		if (typeof(num) === "string") {
			return Number(num.trim().replace(/,/g, ''));
		}
		
		return Number(num);
	},
	
	/**
	 * Adds commas after every 3 digits in the number.
	 * @param num The number to format
	 */
	getReadableNumber: function(num) {
		var str = (num+"").split("."), // stringify the number and split it by dots.
			full = str[0].replace(/(\d)(?=(\d{3})+\b)/g,"$1,"), // adding commas to the part before the dot
			dec = str[1] || ""; // getting the part after the dot, if exists
		return (dec) ? full + '.' + dec : full;
	},
	
	getLocation: function() {
		var canonical = $('link[rel="canonical"]');
		var url = canonical.length > 0 ? canonical[0].href : document.location();
		return (url || '').replace('//fanfiction.net/', '//www.fanfiction.net/');
	},

	/**
	 * Performs an AJAX request
	 * @param configObj Object an object containing request the information:
	 * @cfg object headers A dictionary of headers to be sent with the request.
	 * @cfg string method The type of method to use in the request. Defaults to GET.
	 * @cfg string url The url to request.
	 * @cfg Function onload The callback to call when the request is done. Passed the response object.
	 */
	httpRequest: function (configObj) {
		if (!configObj.headers) { configObj.headers = {}; }
		configObj.headers['User-Agent'] = 'Mozilla/4.0 (compatible) Greasemonkey';

		var req = new XMLHttpRequest();
		req.open(configObj.method || 'GET', configObj.url, true);
		req.onreadystatechange = function () {
		  if (req.readyState === 4) {
			configObj.onload(req);
		  }
		};
		req.send(null);
	},
	
	chapters: {
		
		/** Returns the current chapter by the page's url. It doesn't use the navigator because there isn't one in single-chapter stories. */
		getCurrent: function() {
			// http://www.fanfiction.net/s/6261249/2/Konoha_At_His_Fingertips
			var loc = /(.*\/s\/\d+\/)(\d+)(\/[^#]*)?/i.exec(utils.getLocation());
			return (loc && loc[2]) ? utils.parseNum(loc[2]) : 1;
		},
		
		/**
		 * Formats a link to a specific chapter.
		 * @param chapterNum The number of the chapter to link to.
		 */
		getLink: function(chapterNum) {
			var loc = /(.*\/s\/\d+\/)(\d+)(\/[^#]*)?/i.exec(utils.getLocation());
			return loc[1] + chapterNum + (loc[3] || '');
		},
		
		/**
		 * Returns the title of a chapter.
		 * @param chapterNum The number of the chapter to link to.
		 */
		getTitle: function(chapterNum) {
			var navigator = utils.getChapterNavigator();
			if (navigator.length < 1) { return 'Unknown title. No navigation combo-box found'; }
			var children = $(navigator[0]).children('option[value="' + chapterNum + '"]');
			if (children.length < 1) { return 'Unknown title. Chapter not found in navigation combo-box.'; }
			
			// strip the chapter number from the option text and return it.
			return children[0].text.replace(new RegExp('^' + chapterNum + '\\.\\s*'), '');
		},
		
		/**
		 * Returns the id of the last chapter of the story (by returning the last option in this page's chapterNavigator.
         * (via getChapterNavigator())
		 */
		getCount: function() {
			var lastChapterEl = utils.getChapterNavigator().first().children('option:last-child');
			if (lastChapterEl.length > 0) { return lastChapterEl[0].value; }
		},

        /**
         * Parse the string to find the navigator and the max chapter.
         * If nothing is found, the last option in this page's chapterNavigator is returned. (via getChapterNavigator())
         * @param htmlString The HTML text to parse for a chapter navigator
         */
        getCountFromHtmlString: function(htmlString) {
            var chapterOptions = htmlString.match(/<SELECT title='chapter navigation'[^>]*>([^\n]+)<\/select>/); // get all options in a "chapter navigation" combo-box.
            if (chapterOptions && chapterOptions.length > 1) {
                var lastOption = chapterOptions[1].match(/.*<option\s+value="?(\d+)"?[^>]*>/); // get the LAST option's value.
                if (lastOption && lastOption.length > 1) {
                    return lastOption[1];
                }
            }

            // If we're here, we failed to parse the HTML string.
            // In which case - let's get the last chapter from our own navigator!
            return utils.chapters.getCount();
        }
	},
	
	dates: {
	
		/**
		 * Parses an FF.net formatted date (in the form of mm-dd-yym or a span with a data-xutime) into a JS date.
		 * @param dateString A string representing a date formatted in mm-dd-yy or an html tag text with a data-xutime.
		 * @return A JavaScript date.
		 */
		parseFFDate: function(dateString) {
			if (dateString.match(/.*data-xutime.*/)) {
				// Multiply with 1000 because Unix timestamps are in seconds but date in javascript works with milliseconds. Thanks phelougu!
				timestamp = $(dateString)[0].getAttribute("data-xutime") * 1000;
				return new Date(timestamp);
			} else {
				var parts = dateString.match("([01]?\\d)-([0-3]?\\d)-(\\d\\d)"),
					year = (parts[3] < 50 ? '20' : '19') + parts[3],
					month = (parts[1] - 1),
					day = parts[2];
				return new Date(year, month, day, utils.now.getHours(), utils.now.getMinutes(), utils.now.getSeconds());
			}
		},
	
		/**
		 * Formats a date into the user's specified format (US/UK and its chosen separator).
		 * @param date A JavaScript date.
		 * @return string A date formatted string.
		 */
		formatDate: function(date) {
			if (!date) { return ''; }
            if (settings.dateFormat === 0) {
                return (date.getMonth() + 1) + settings.sep + date.getDate() + settings.sep + date.getFullYear(); // US date format
            } else {
                return date.getDate() + settings.sep + (date.getMonth() + 1) + settings.sep + date.getFullYear(); // UK date format
            }
		},
		
		/**
		 * Formats a date and colors it by the user's specifications (normal or relative formats).
		 * Also adds a tooltip for extra information if needed.
		 * @param date The date to format.
		 * @param isComplete Whether the story is complete.
		 * @param prefix A string to write before to the formatted date (not prepended if isComplete is true!)
		 * @param avgPostingFrequency A number noting the average number of days between chapters posting.
		 * @return An HTML string of the formatted date.
		 */
		formatDateExtended: function(date, isComplete, prefix, avgPostingFrequency) {
            avgPostingFrequency = avgPostingFrequency || 0;
			var isRelative = settings.shouldRelativeDate,
				isColor = (isComplete && settings.colorComplete) || (!isComplete && settings.colorDate);
			
			var daysPassed = Math.round((utils.now - date) / 1000/60/60/24),
				relativeDate = this.getRelativeDate(daysPassed),
				strDate = this.formatDate(date);
			
			if (settings.showPostingFrequency && (new Date() - date) / 1000/60/60/24 < 10 * avgPostingFrequency) {
				relativeDate += ' (' + this.getTextualFrequency(avgPostingFrequency) + ')';
			}
			
			// if complete, write Complete. otherwise, print the normal or relative date.
			var text = isComplete ? 'Complete' : isRelative ? relativeDate : strDate,
				abbr = '';
			
			// abbr for non-normal dates is the normally formatted date. for complete with relative date, also add the relative one.
			if (isRelative || isComplete) { abbr = strDate; }
			if (isRelative && isComplete) { abbr += ' - ' + relativeDate; }
			
			// apply the abbreviation tag if set
			if (abbr) { text = '<abbr title="' + abbr + '">' + text + '</abbr>'; }
			
			// apply colors if set
			if (isColor) { text = '<span style="color: ' + this.colorDates(daysPassed, isComplete, settings.showPostingFrequency ? avgPostingFrequency : 0) + ';">' + text + '</span>'; }
			
			// add the prefix if story's not completed.
			if (prefix && !isComplete) { text = prefix + text; }
			
			return text;
		},
		
		/**
		 * Returns the color to draw dates in (according to how long ago they occurred)
		 * @param daysPassed How many days passed since the date (indicates the color used).
		 * @param isComplete Whether the story is complete (hence it should get a "completed" color)
		 * @return A CSS color string.
		 */
		colorDates: function(daysPassed, isComplete, avgFrequecy) {
			var completeColor = settings.colors_complete;
			var colors = [
				settings.colors_shade1,
				settings.colors_shade2,
				settings.colors_shade3,
				settings.colors_shade4,
				settings.colors_shade5,
				settings.colors_shade6,
				settings.colors_shade7
			];
			if (isComplete) { return completeColor; }
			
			// compute the score.
			var score = 0;
			if (avgFrequecy) {
				if (daysPassed <= 0.75 * avgFrequecy) { score = 0; }
				else if (daysPassed < 1.1 * avgFrequecy) { score = 1; }
				else if (daysPassed < 1.7 * avgFrequecy) { score = 2; }
				else if (daysPassed < 2.5 * avgFrequecy) { score = 3; }
				else if (daysPassed < 3 * avgFrequecy) { score = 4; }
				else if (daysPassed < 5 * avgFrequecy) { score = 5; }
				else { score = 6; }
			} else {
				if (daysPassed < 7) { score = 0; }
				else if (daysPassed < 14) { score = 1; }
				else if (daysPassed < 31) { score = 2; }
				else if (daysPassed < 60) { score = 3; }
				else if (daysPassed < 90) { score = 4; }
				else if (daysPassed < 180) { score = 5; }
				else { score = 6; }
			}
			
			return colors[score];
		},
		
		/**
		 * Gets a string indicating how much time has passed in English.
		 * @param daysPassed The number of days passed.
		 */
		getRelativeDate: function(daysPassed) {
			switch (daysPassed) {
				case 0:
					return "Today";
				case 1:
					return "Yesterday";
				default:
					return this.getTextualTimespan(daysPassed) + ' ago';
			}
		},
		
		/**
		 * Gets a string indicating how much time has passed in English.
		 * @param days The number of days passed.
		 */
		getTextualFrequency: function(days) {
			if (days <= 0) {
				return 'infinitely';
			} else if (days < 1.5) {
				return 'daily';
			} else if (days < 2.5) {
				return 'every couple of days';
			} else if (days < 5) {
				return 'twice a week';
			} else if (days < 9) {
				return 'weekly';
			} else if (days < 18) {
				return 'twice a month';
			} else if (days < 36) {
				return 'monthly';
			} else if (days < 72) {
				return 'bimonthly';
			} else {
				return ('every ' + this.getTextualTimespan(days)).replace('every about', 'about every');
			}
		},
		
		/**
		 * Gets a string indicating the amount of time in English.
		 * @param days The number of days to mark.
		 */
		getTextualTimespan: function(totalDays) {
			var result = '';
			
			var approximate = false;
			
			var totalMonths = Math.floor(totalDays / 30);
			var daysInsideMonth = totalDays - (totalMonths * 30);
			if (totalMonths > 0 && daysInsideMonth != 0) {
				if (daysInsideMonth < 6) {
					// it's still the start of the month, round the days down.
					totalDays -= daysInsideMonth;
					approximate = true;
				} else if (daysInsideMonth > 25) {
					// it's the end of the month, round the days up!
					totalDays += (30 - daysInsideMonth);
					totalMonths += 1;
					approximate = true;
				} else {
					// It's valid enough, we'll include the days inside the month.
				}
			}
			
			var years = Math.floor(totalDays / 365);
			
			var months = totalMonths - (years * 12);
			if (months > 0) {
				// since months are calculated as always 30 days, it's always an approximate.
				approximate = true;
				if (months <= Math.min(years, 3)) {
					// it's the start of the year, round the months down
					totalDays -= months * 30;
					months = 0;
				} else if (months > 7 + (7 - Math.min(years, 7))) {
					// it's the end of the year, round the months down
					totalDays += (12 - months) * 30;
					months = 0;
					years += 1;
				}
			}
			
			var weeks = Math.floor(((totalDays % 365) % 30) / 7);
			var days = Math.floor(totalDays % 7);
			
			if (years > 0) { result += ', ' + years + " year" + (years > 1 ? 's' : ''); }
			if (months > 0) { result += ', ' + months + " month" + (months > 1 ? 's' : ''); }
			if (years == 0 && weeks > 0) { result += ', ' + weeks + " week" + (weeks > 1 ? 's' : ''); }
			if (years == 0 && months == 0 && days  > 0) { result += ', ' + days + " day" + (days  > 1 ? 's' : ''); }
			// remove the heading comma
			result = result.substr(2);
			
			if (approximate) result = 'about ' + result;
			return result;
		}
	},
	
	infoBar: {
	
		/** The element used for signalling ajax operations */
		bar: null,
		
		/** 
		 * Shows the loading bar with the specified text in it.
		 * @param text The text to show in the bar.
		 */
		setText: function(text) {
			if (!this.bar) { utils.infoBar._init(); }
			this.bar.innerHTML = text;
			this.bar.style.display = 'block';
		},
		
		/** Hides the loading bar. */
		hide: function() {
			if (!this.bar) { return; } // nothing to hide if it weren't initialized.
			this.bar.style.display = 'none';
		},
		
		/** Returns whether the bar is initialized and shown. */
		isShown: function() {
			if (!this.bar) { return false; } // if the bar wasn't initialized, it's practically hidden :)
			return (this.bar.style.display !== 'none');
		},
		
		/** Initializes the loading bar. */
		_init: function() {
			if (this.bar) { return; }
			this.bar = document.createElement('div');
			this.bar.innerHTML = '-- Loading --';
			var style = utils.infoBar.bar.style;
			style.position = 'fixed';
			style.left = '0px';
			style.right = '0px';
			style.bottom = '0px';
			style.backgroundColor = 'black';
			style.border="3px solid red";
			style.color = 'white';
			style.padding = '4px';
			style.textAlign = 'center';
			style.display = 'none';
			document.body.appendChild(this.bar);
		}
	},

	pos: {

		/**
		 * Returns the distance to the bottom of the page or element,
		 * divided by screen height.
		 * This is useful when we want something to happen when the
		 * user is getting close to the end of the page or element.
		 * @param el The element to measure the length of. Defaults to the body
		 */
		getScreenfullsLeft: function(el) {
			if (!el) el = env.w.document.body;
			var distance = this._getElementBottom(el) - this._screenBottom();
			return distance / this._screenHeight();
		},

		getRelativeHeight: function(el) {
			return el.offsetTop - this._screenOffset();
		},
		
		_getElementBottom: function(el) {
			return el.offsetTop + el.scrollHeight;
		},

		_bodyLength: function() {
			return env.w.document.body.scrollHeight;
		},

		_screenBottom: function() {
			return env.w.pageYOffset + this._screenHeight();
		},

		_screenOffset: function() {
			return env.w.pageYOffset;
		},

		_screenHeight: function() {
			return env.w.innerHeight;
		}
	},
	
	/**
	 * Marks the specified words in the text in a red color and returns the formatted text.
	 * This is not a simple replace function since we don't want to perform replaces for words inside HTML tags and attributes 
	 * (since marking these will break the HTML and the rest of the marking). i.e. we don't want to mark <a href="/s/123/WordToMark_bla_bla">
	 * @param text The text to mark the words in.
	 * @param wordsToMark An array of words to mark in the text.
	 * @return The text with the specified words marked in coloring tags.
	 */
	markWords: function(text, wordsToMark) {
		var prefix = '<span style="color: ' + settings.colors_marked_words + ';">', suffix = '</span>';
		for (var i = 0; i < wordsToMark.length; ++i)
		{
			var lcaseWord = wordsToMark[i].toLowerCase(), 
				wordLength = lcaseWord.length;
				
			if (lcaseWord.trim() === '') { continue; } // apparently, trying to mark an empty string crashes Firefox. go figure :)
			
			var index = text.toLowerCase().indexOf(lcaseWord);
				
			while (index > -1) {
				var foundWord = text.substr(index, wordLength), // the word that was found (we need it to keep the found word's case)
					textBefore = text.substr(0, index); // the text from the start of the text till the start of the word.
				
				if (textBefore.split('<').length <= textBefore.split('>').length) { // if we're not in a middle of a tag (we have more or same amount of closing brackets than starting brackets)
					text = textBefore + prefix + foundWord + suffix + text.substr(index + wordLength); // perform the replace.
				}
				index = text.toLowerCase().indexOf(lcaseWord, index + prefix.length + wordLength + suffix.length);
			}
		}
	
		return text;
	},
	
	/** Hides the chapter navigation box (chapter combo box) at the end of a story page. */
	getChapterNavigator: function() {
		var result = $('select[title="Chapter Navigation"]');
		utils.getChapterNavigator = function() { return result; }; // cache the navigator
		return result;
	}
};

function loadJQuery() {
	if (window.jQuery) { return; }
	
	// if we have jQuery or we have an unsafeWindow (inside GreaseMonkey)
	if ((env.w.jQuery)) {
		window.$ = window.jQuery = env.w.jQuery; // Access the FF.net jQuery lib
	}
}

load();
