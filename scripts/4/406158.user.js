// ==UserScript==
// @name       WaniKani Example Sentences
// @namespace
// @version    1.1
// @description  Displays additional examples sentences for the given vocabulary.
// @match      *://www.wanikani.com/*vocabulary/*
// @match      *://www.wanikani.com/review/session*
// @match      *://www.wanikani.com/lesson/session*
// @require https://raw.github.com/flaviusmatis/simplePagination.js/master/jquery.simplePagination.js
// @copyright  2014 jeshuam
// ==/UserScript==

// Store the CSS in here to make the script Firefox compatable.
var CSS = "/**" + 
"* CSS themes for simplePagination.js" +
"* Author: Flavius Matis - http://flaviusmatis.github.com/" +
"* URL: https://github.com/flaviusmatis/simplePagination.js" +
"*/" +
"" +
"ul.simple-pagination {" +
"    list-style: none;" +
"}" +
"" +
".simple-pagination {" +
"    display: block;" +
"    overflow: hidden;" +
"    padding: 0 5px 5px 0;" +
"    margin: 0;" +
"}" +
"" +
".simple-pagination ul {" +
"    list-style: none;" +
"    padding: 0;" +
"    margin: 0;" +
"}" +
"" +
".simple-pagination li {" +
"    list-style: none;" +
"    padding: 0;" +
"    margin: 0;" +
"    float: left;" +
"}" +
"" +
"/*------------------------------------*\\" +
"    Compact Theme Styles" +
"\*------------------------------------*/" +
"" +
".compact-theme a, .compact-theme span {" +
"    float: left;" +
"    color: #333;" +
"    font-size:14px;" +
"    line-height:24px;" +
"    font-weight: normal;" +
"    text-align: center;" +
"    border: 1px solid #AAA;" +
"    border-left: none;" +
"    min-width: 14px;" +
"    padding: 0 7px;" +
"    box-shadow: 2px 2px 2px rgba(0,0,0,0.2);" +
"    background: #efefef; /* Old browsers */" +
"    background: -moz-linear-gradient(top, #ffffff 0%, #efefef 100%); /* FF3.6+ */" +
"    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffffff), color-stop(100%,#efefef)); /* Chrome,Safari4+ */" +
"    background: -webkit-linear-gradient(top, #ffffff 0%,#efefef 100%); /* Chrome10+,Safari5.1+ */" +
"    background: -o-linear-gradient(top, #ffffff 0%,#efefef 100%); /* Opera11.10+ */" +
"    background: -ms-linear-gradient(top, #ffffff 0%,#efefef 100%); /* IE10+ */" +
"    background: linear-gradient(top, #ffffff 0%,#efefef 100%); /* W3C */" +
"}" +
"" +
".compact-theme a:hover {" +
"    text-decoration: none;" +
"    background: #efefef; /* Old browsers */" +
"    background: -moz-linear-gradient(top, #efefef 0%, #bbbbbb 100%); /* FF3.6+ */" +
"    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#efefef), color-stop(100%,#bbbbbb)); /* Chrome,Safari4+ */" +
"    background: -webkit-linear-gradient(top, #efefef 0%,#bbbbbb 100%); /* Chrome10+,Safari5.1+ */" +
"    background: -o-linear-gradient(top, #efefef 0%,#bbbbbb 100%); /* Opera11.10+ */" +
"    background: -ms-linear-gradient(top, #efefef 0%,#bbbbbb 100%); /* IE10+ */" +
"    background: linear-gradient(top, #efefef 0%,#bbbbbb 100%); /* W3C */" +
"}" +
"" +
".compact-theme li:first-child a, .compact-theme li:first-child span {" +
"    border-left: 1px solid #AAA;" +
"    border-radius: 3px 0 0 3px;" +
"}" +
"" +
".compact-theme li:last-child a, .compact-theme li:last-child span {" +
"    border-radius: 0 3px 3px 0;" +
"}" +
"" +
".compact-theme .current {" +
"    background: #bbbbbb; /* Old browsers */" +
"    background: -moz-linear-gradient(top, #bbbbbb 0%, #efefef 100%); /* FF3.6+ */" +
"    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#bbbbbb), color-stop(100%,#efefef)); /* Chrome,Safari4+ */" +
"    background: -webkit-linear-gradient(top, #bbbbbb 0%,#efefef 100%); /* Chrome10+,Safari5.1+ */" +
"    background: -o-linear-gradient(top, #bbbbbb 0%,#efefef 100%); /* Opera11.10+ */" +
"    background: -ms-linear-gradient(top, #bbbbbb 0%,#efefef 100%); /* IE10+ */" +
"    background: linear-gradient(top, #bbbbbb 0%,#efefef 100%); /* W3C */" +
"    cursor: default;" +
"}" +
"" +
".compact-theme .ellipse {" +
"    background: #EAEAEA;" +
"    padding: 0 10px;" +
"    cursor: default;" +
"}" +
"" +
"/*------------------------------------*\\" +
"    Light Theme Styles" +
"\*------------------------------------*/" +
"" +
".light-theme a, .light-theme span {" +
"    float: left;" +
"    color: #666;" +
"    font-size:14px;" +
"    line-height:24px;" +
"    font-weight: normal;" +
"    text-align: center;" +
"    border: 1px solid #BBB;" +
"    min-width: 14px;" +
"    padding: 0 7px;" +
"    margin: 0 5px 0 0;" +
"    border-radius: 3px;" +
"    box-shadow: 0 1px 2px rgba(0,0,0,0.2);" +
"    background: #efefef; /* Old browsers */" +
"    background: -moz-linear-gradient(top, #ffffff 0%, #efefef 100%); /* FF3.6+ */" +
"    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffffff), color-stop(100%,#efefef)); /* Chrome,Safari4+ */" +
"    background: -webkit-linear-gradient(top, #ffffff 0%,#efefef 100%); /* Chrome10+,Safari5.1+ */" +
"    background: -o-linear-gradient(top, #ffffff 0%,#efefef 100%); /* Opera11.10+ */" +
"    background: -ms-linear-gradient(top, #ffffff 0%,#efefef 100%); /* IE10+ */" +
"    background: linear-gradient(top, #ffffff 0%,#efefef 100%); /* W3C */" +
"}" +
"" +
".light-theme a:hover {" +
"    text-decoration: none;" +
"    background: #FCFCFC;" +
"}" +
"" +
".light-theme .current {" +
"    background: #666;" +
"    color: #FFF;" +
"    border-color: #444;" +
"    box-shadow: 0 1px 0 rgba(255,255,255,1), 0 0 2px rgba(0, 0, 0, 0.3) inset;" +
"    cursor: default;" +
"}" +
"" +
".light-theme .ellipse {" +
"    background: none;" +
"    border: none;" +
"    border-radius: 0;" +
"    box-shadow: none;" +
"    font-weight: bold;" +
"    cursor: default;" +
"}" +
"" +
"/*------------------------------------*\\" +
"    Dark Theme Styles" +
"\*------------------------------------*/" +
"" +
".dark-theme a, .dark-theme span {" +
"    float: left;" +
"    color: #CCC;" +
"    font-size:14px;" +
"    line-height:24px;" +
"    font-weight: normal;" +
"    text-align: center;" +
"    border: 1px solid #222;" +
"    min-width: 14px;" +
"    padding: 0 7px;" +
"    margin: 0 5px 0 0;" +
"    border-radius: 3px;" +
"    box-shadow: 0 1px 2px rgba(0,0,0,0.2);" +
"    background: #555; /* Old browsers */" +
"    background: -moz-linear-gradient(top, #555 0%, #333 100%); /* FF3.6+ */" +
"    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#555), color-stop(100%,#333)); /* Chrome,Safari4+ */" +
"    background: -webkit-linear-gradient(top, #555 0%,#333 100%); /* Chrome10+,Safari5.1+ */" +
"    background: -o-linear-gradient(top, #555 0%,#333 100%); /* Opera11.10+ */" +
"    background: -ms-linear-gradient(top, #555 0%,#333 100%); /* IE10+ */" +
"    background: linear-gradient(top, #555 0%,#333 100%); /* W3C */" +
"}" +
"" +
".dark-theme a:hover {" +
"    text-decoration: none;" +
"    background: #444;" +
"}" +
"" +
".dark-theme .current {" +
"    background: #222;" +
"    color: #FFF;" +
"    border-color: #000;" +
"    box-shadow: 0 1px 0 rgba(255,255,255,0.2), 0 0 1px 1px rgba(0, 0, 0, 0.1) inset;" +
"    cursor: default;" +
"}" +
"" +
".dark-theme .ellipse {" +
"    background: none;" +
"    border: none;" +
"    border-radius: 0;" +
"    box-shadow: none;" +
"    font-weight: bold;" +
"    cursor: default;" +
"}";

$(function() {
    // Add the CSS to the page.
    $('head').append('<style>' + CSS + '</style>');
    
    //
    // Given a jQuery container, activate all tooltips within the container.
    //
    function ActivateTooltips(container) {
        if (container && container.tooltip) {
           container.find('span[rel="tooltip"]').tooltip();
        }
    }

    //
    // Extract the Kanji from the current page. This will have a switch for each type of page, and
    // will do something different for each. This will only include vocabulary pages, reviews and
    // lessons.
    //
    function GetVocabularyKanjiFromPage() {
        // Vocabulary information page.
        if (url.indexOf('vocabulary') != -1) {
            return $('header span.vocabulary-icon span').text().trim();
        }

        // Review page.
        else if (url.indexOf('review/session') != -1) {
            return $.jStorage.get('currentItem').voc;
        }

        // Lesson page.
        else if (url.indexOf('lesson/session') != -1) {
            return $.jStorage.get('l/currentLesson').voc;
        }

        // Not on a valid page.
        else {
            return null;
        }
    }

    //
    // Extract the kana from the current page. This will have a switch for each type of page, and
    // will do something different for each. This will only include vocabulary pages, reviews and
    // lessons.
    //
    function GetVocabularyKanaFromPage() {
        // Vocabulary information page.
        if (url.indexOf('vocabulary') != -1) {
            return $('section.vocabulary-reading p').text().trim();
        }

        // Review page.
        else if (url.indexOf('review/session') != -1) {
            return $.jStorage.get('currentItem').kana[0];
        }

        // Lesson page.
        else if (url.indexOf('lesson/session') != -1) {
            return $.jStorage.get('l/currentLesson').kana[0];
        }

        // Not on a valid page.
        else {
            return null;
        }
    }

    //
    // Get the data from the remote URL for the given vocabulary.
    //
    function GetExampleSentencesForVocabulary(vocabulary, complete) {
        $('section#example-sentences-section').detach();
        $.get('https://jeshuam.pythonanywhere.com/wanikani-sentences/' + vocabulary, complete);
    }

    function GetSectionWithExamplesSentences(data) {
        // Build the basic sentence structure.
        var section = $('<section id="example-sentences-section" />')
            .append('<h2>Example Sentences</h2>')
            .append('<div id="example-sentences"><div></div></div>');

        return section;
    }

    function SetupPaginationOnSectionWithSentenceData(section, data) {
        // Setup pagination on the section.
        var NUMBER_OF_ITEMS_PER_PAGE = 3;

        //
        // Display the given page within the div.
        //
        function DisplaySamplesSentencesPage(pageNumber, div) {
            div.find('ol').detach();

            // Extrac the vocab and kana from the page.
            var kanji = GetVocabularyKanjiFromPage();
            var kana = GetVocabularyKanaFromPage();

            // Slice out the data items we are interested in. This is assuming
            // that `pageNumber` is indexed from 1.
            var pageData = div.data('sentences').slice(
                (pageNumber - 1) * NUMBER_OF_ITEMS_PER_PAGE,
                (pageNumber * NUMBER_OF_ITEMS_PER_PAGE));

            // Replace all sentences with the next page.
            div.find('div').last().before('<ol>');
            $.each(pageData, function(_, sentence) {
                // If we are up to a filler, just add the space.
                if (sentence == null) {
                    div.find('ol').append('<li style="list-style-type: none; margin-left: -20px"><p>&nbsp;</p><div style="margin: -5px 10px">&nbsp;</div></li>');
                    return;
                }

                // Pre-process the sentence.
                var japanese = sentence.jpn
                    .replace(new RegExp(kanji, 'g'), '<span class="vocabulary-highlight highlight-vocabulary" rel="tooltip" data-original-title="' + kana + '">' + kanji + '</span>');

                div.find('ol').append('<li style="list-style-type: none; margin-left: -20px"><p>' + japanese + '</p>' + '<div style="margin: -5px 10px">↳&nbsp;' + sentence.eng + '</div></li>');
            });

            // Activate the tooltips.
            ActivateTooltips(div);
        }

        // If the data doesn't contain the correct number of elements, pad it
        // with additional &nbsp;'s. This is apparently the modulo operator.
        // Seriously, fuck JavaScript.
        var n = NUMBER_OF_ITEMS_PER_PAGE;
        var padding = n - (data.length % n);
        if (padding == n) {
            padding = 0;
        }

        for (var i = 0; i < padding; i++) {
            data.push(null);
        }

        var div = section.find('div#example-sentences');
        div.data('sentences', data);
        div.find('div').pagination({
            // Decide how many pages there are.
            items: data.length,
            itemsOnPage: NUMBER_OF_ITEMS_PER_PAGE,

            // Always start on page 1.
            currentPage: 1,

            // Change the page manually.
            onPageClick: function(pageNumber, event) {
                DisplaySamplesSentencesPage(pageNumber, div);
            },

            // Display page 1 on init.
            onInit: function() {
                DisplaySamplesSentencesPage(1, div);
            }
        });
    }

    // Switch based on the content of the URL.
    var url = document.URL;

    // Process the vocabulary page.
    if (url.indexOf('vocabulary') != -1) {
        var vocabulary = $('header span.vocabulary-icon span').text();

        GetExampleSentencesForVocabulary(vocabulary, function(data) {
            if (data.length == 0) {
                return;
            }

            var section = GetSectionWithExamplesSentences(data);
            $('section.vocabulary-reading').after(section);
            SetupPaginationOnSectionWithSentenceData(section, data);
        });
    }

    // Process the review page.
    else if (url.indexOf('review/session') != -1) {
        // Display the information when the current item changes. Don't do this if they are
        // supposed to enter the reading.
        $.jStorage.listenKeyChange('currentItem', function(key) {
            GetExampleSentencesForVocabulary($.jStorage.get(key).voc, function(data) {
                if (data.length == 0) {
                    return;
                }

                if ($('#answer-form input').attr('lang') != 'ja') {
                    var section = GetSectionWithExamplesSentences(data);
                    $('div#all-info').before(section.prepend('<br />'));
                    SetupPaginationOnSectionWithSentenceData(section, data);
                }
            });
        });

        // If the 'all-info' button is pressed, then display it.
        $('div#all-info').on('click', function() {
            GetExampleSentencesForVocabulary($.jStorage.get('currentItem').voc, function(data) {
                if (data.length == 0) {
                    return;
                }

                var section = GetSectionWithExamplesSentences(data);
                $('div#all-info').before(section.prepend('<br />'));
                SetupPaginationOnSectionWithSentenceData(section, data);
            });
        });
    }

    // Process the lesson page.
    else if (url.indexOf('lesson/session') != -1) {
        $.jStorage.listenKeyChange('l/currentLesson', function(key) {
            GetExampleSentencesForVocabulary($.jStorage.get(key).voc, function(data) {
                if (data.length == 0) {
                    return;
                }

                var section = GetSectionWithExamplesSentences(data);
                $('div#supplement-voc-meaning').append(section.prepend('<br />'));
                SetupPaginationOnSectionWithSentenceData(section, data);
            });
        });
    }
});
