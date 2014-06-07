// ==UserScript==
// @name		Notatkowator 2000 
// @namespace		http://www.wykop.pl/ludzie/piokom123/
// @description		Szybki podgląd notek
// @author		piokom123
// @version		1.0.2
// @grant		none
// @include		http://www.wykop.pl/*
// @run-at 		document-end
// ==/UserScript==
// Ukłony dla @parasolki za nadanie dodatkowi tej boskiej nazwy ;)

function main() {
    var addedNicks = [];
    var loggedInNick = $('.avatar.quickpoint a.fright').attr('title');
    var lastFetchedIndex = -1;

    function addNick(nick) {
        if ($.inArray(nick, addedNicks) === -1) {
            addedNicks[addedNicks.length] = nick;
        }
    }

    function fetchNextNote() {
        lastFetchedIndex++;

        if (lastFetchedIndex >= addedNicks.length) {
            return;
        }

        fetchNote(addedNicks[lastFetchedIndex]);
    }

    function fetchNote(nick) {
        setTimeout(function() {
            $.ajax('http://www.wykop.pl/ajax/profile/summary/' + nick)
            .done(function(data) {
                var note = parseNote(data);
                
                showNote(nick, note);

                fetchNextNote();
            });
        }, 100);
    }

    function parseNote(content) {
        var parsedNote = '';
        var match = content.match(/name="profile\[note\]"(.*?)>(.*?)<\//);
        match = match[2];

        if (match.indexOf('|') === -1) {
            parsedNote = match;
        } else {
            match = match.split('|');
            parsedNote = match[0];
        }

        parsedNote = activateLinks(parsedNote);

        return parsedNote;
    }

    function activateLinks(content) {
        if (content.indexOf('http://') !== -1 || content.indexOf('https://') !== -1) {
            content = content.replace(/(https?:\/\/([^\s]+))/g, '<a href="$1" target="_blank">$1</a>');
        }

        return content;
    }

    function showNote(nick, note) {
        if ($('.notesFor' + nick).length > 0) {
            $('.notesFor' + nick).html(note);
        }
    }

    $(document).ready(function() {
        if (typeof loggedInNick === 'undefined') {
            return;
        }

        if ($('blockquote header .showProfileSummary').length > 0) {
            $('blockquote header .showProfileSummary').each(function(index, node) {
                var nick = node.href.replace('http://www.wykop.pl/ludzie/', '').replace('/', '');

                if (nick !== loggedInNick) {
                    addNick(nick);
                    node.parentNode.innerHTML += '<span class="notesFor' + nick + ' small">ładuję</span>';
                }
            });

            fetchNextNote();
        }
    });
}

if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		// Chrome
		addJQuery(main);
	}
} else {
	// Opera >.>
	main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}