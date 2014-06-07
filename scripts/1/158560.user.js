// ==UserScript==
// @name            Bash.org tweaks
// @description     Eases bash.org navigation
// @author          The Danner
// @author          xav0989
// @include         http://bash.org/*
// @include         https://bash.org/*
// @include         http://www.bash.org/*
// @include         https://www.bash.org/*
// @version         4.3.1
// 
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
//
// @grant           GM_addStyle
// @grant           GM_listValues
// @grant           GM_deleteValue
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

/*
TODO:
- Add controls for the colorizing.
- Hide/Disable vote links.
  - Don't use hide()/show()/toggle() because that would mess up the spacing?
*/

/*
Change log:
2013-02-13  4.3.1  - Added alternate bash.org URLs
2013-02-07  4.3.0  - Ajaxified voting
                   - Added grant keywords.
2012-10-16  4.2.0  - Simplify options.
                   - Settings are saved and applied as changed (on blur in the case of a score
                     change).
2012-10-10  4.1.3  - Update to jQuery 1.8.2.
                   - Use .prop('checked').
                   - Standardize quotes (use ' instead of " in most cases).
2012-01-09  4.1.2  - Update to jQuery 1.7.1.
2011-11-07  4.1.1  - Fix an unhandled exception getting thrown if the quote has a blank line.
                     (fixes #239439, though the nick is complicated enough that highlighting
                      still doesn't work.)
2011-11-03  4.1.0  - Add a setting for the fancy formatting (does not affect the word wrap).
                   - Add a "Set & Apply" link.
                   - Other misc. internal enhancements.
2011-11-02  4.0.1  - Fix typo in flag link remover.
2011-11-02  4.0.0  - Colorize the speakers (beta).
2011-11-01  3.2.0  - Remove the flag link. To flag a quote, go to the quote page itself.
                     Flagging isn't going to happen terribly often if the filter is being applied.
2011-09-16  3.1.0  - Fix bugs that were already fixed...
                   - "Set" doesn't change the checked state of the "Hide quotes..." option.
                   - "Apply" applies the current settings without saving.
                   - Add a "Reset" (load saved settings) option.
                   - Only show the controls on the search page if there is an actual query.
                   - Fix score match regex to work on negative scores.
                   - Rename "Set" to "Save".
2011-09-14  3.0.5  - Also work on the ?search page.
2011-09-08  3.0.4  - Remove the "T" in the individual quote toggle links (saves space).
2011-09-08  3.0.3  - Upgrade jQuery version to 1.6.3.
                   - Add more TODOs.
2011-09-06  3.0.2  - Tweak the handling of the long runs of text (prevent the split char from being
                     inserted as the last character in the sequence if it happens to be the exact
                     length.
2011-09-06  3.0.1  - Add an "anchor" link.
                   - Change author so it's more appropriate for the rest of the world.
                   - Replace the vote + and - signs with html entities for plus and minus.
                   - Moar button links: "Set & Apply", "Set", "Apply", "Show All", "Hide All".
2011-09-02  3.0.0  - Hide quotes below a configurable threshold.
                   - Toggle arbitrary quotes.
                   - Saved settings.
2011-09-01  2.1.0  - Best of both worlds! Go back to splitting runs of 20+ chars of non-whitespace,
                     using the text node method.
2011-08-01  2.0.0  - Different way. Uglier, but hey...gotta do what you gotta do.
2011-08-22  1.0.0  - Initial.
*/

(function($) 
{
    // --
    // Constants
    var DEBUG = false;
    
    var MAX_RUN_LENGTH = 20;
    
    // 8203 = zero-width space (i.e. <wbr />)
    //  173 = soft hyphen (&shy;)
    var REPLACE_STRING = String.fromCharCode(173);
    
    GM_addStyle([
        '.useFancyFormatting .firstLine {',
        '  border-top-left-radius: 5px;',
        '  border-top-right-radius: 5px;',
        '}',
        '.useFancyFormatting .lastLine {',
        '  border-bottom-left-radius: 5px;',
        '  border-bottom-right-radius: 5px;',
        '}',
        '.useFancyFormatting .firstOrInnerLine {',
        '  border-bottom: 1px solid #DDD;',
        '}'
    ].join(''));
    
    // This construct prevents other instances from being created.
    var Prefs = new (function ()
    {
        // Use when accessing this. methods from private methods.
        var _this = this;
        
        var UseScoreFilter = 
        {
            keyName : 'useScoreFilter',
            type : 'boolean',
            defaultValue : true
        };
        
        var MinScore =
        {
            keyName : 'minScore',
            type : 'int',
            defaultValue : 300
        };
        
        var UseFancyFormatting =
        {
            keyName : 'useFancyFormatting',
            type : 'boolean',
            defaultValue : true
        };
        
        this.getUseScoreFilter = function ()
        {
            return getBoolean(UseScoreFilter);
        };
        
        this.setUseScoreFilter = function (value)
        {
            setBoolean(UseScoreFilter, value);
        };
        
        this.getMinScore = function ()
        {
            return getInt(MinScore);
        };
        
        this.setMinScore = function (value)
        {
            setInt(MinScore, value);
        }
        
        this.getUseFancyFormatting = function ()
        {
            return getBoolean(UseFancyFormatting);
        };
        
        this.setUseFancyFormatting = function (value)
        {
            setBoolean(UseFancyFormatting, value);
        }
        
        this.deleteAll = function ()
        {
            var keys = GM_listValues();
            for (var i = 0, key = null; key = keys[i]; i++)
            {
                GM_deleteValue(key);
            }
        };
        
        var getString = function (prefInfo)
        {
            var rawValue = GM_getValue(prefInfo.keyName, prefInfo.defaultValue);
            
            return (rawValue || prefInfo.defaultValue).toString();
        };
        
        var setString = function (prefInfo, value)
        {
            GM_setValue(prefInfo.keyName, value.toString());
        };
        
        var getBoolean = function (prefInfo)
        {
            var rawValue = GM_getValue(prefInfo.keyName, prefInfo.defaultValue);
            
            return !!rawValue;
        };
        
        var setBoolean = function (prefInfo, value)
        {
            GM_setValue(prefInfo.keyName, !!value);
        };
        
        var getInt = function (prefInfo)
        {
            var rawValue = GM_getValue(prefInfo.keyName, prefInfo.defaultValue);
            
            return parseInt(rawValue, 10);
        };
        
        var setInt = function (prefInfo, value)
        {
            var parsed = parseInt(value, 10);
            
            if (!isNaN(parsed))
            {
                GM_setValue(prefInfo.keyName, value);
            }
            else
            {
                throw 'value is not an int: ' + value;
            }
        };
        
        var getFloat = function (prefInfo)
        {
            var rawValue = GM_getValue(prefInfo.keyName, prefInfo.defaultValue);
            
            return parseFloat(rawValue || prefInfo.defaultValue);
        };
        
        var setFloat = function (prefInfo, value)
        {
            var parsed = parseFloat(value);
            
            if (parsed)
            {
                GM_setValue(prefInfo.keyName, value);
            }
            else
            {
                throw 'value is not an int: ' + value;
            }
        };
    })();
    
    var Form = new (function ()
    {
        this.getUseScoreFilter = function ()
        {
            return getCheckboxChecked('#useScoreFilter');
        }
        
        this.setUseScoreFilter = function (value)
        {
            setCheckboxChecked('#useScoreFilter', value);
        }
        
        this.getMinScore = function ()
        {
            return parseInt($('#minScore').val(), 10);
        }
        
        this.setMinScore = function (value)
        {
            $('#minScore').val(parseInt(value), 10);
        }
        
        this.getUseFancyFormatting = function ()
        {
            return getCheckboxChecked('#useFancyFormatting');
        }
        
        this.setUseFancyFormatting = function (value)
        {
            setCheckboxChecked('#useFancyFormatting', value);
        }
        
        
        // Private helpers.
        
        var getCheckboxChecked = function (selector)
        {
            return $(selector).prop('checked');
        }
        
        var setCheckboxChecked = function (selector, newValue)
        {
            $(selector).prop('checked', !!newValue);
        }
    })();
    
    var isCurrentPage = function ()
    {
        var pageNames = $.makeArray(arguments);
        
        if (0 == pageNames.length)
        {
            return false;
        }
        
        for (var i = 0; i < pageNames.length; i++)
        {
            var pageName = pageNames[i];
            
            if (window.location.search.substring(1).match(pageName))
            {
                return true;
            }
        }
        
        return false;
    }
    
    //Faster Trim in Javascript, Flagrant Badassery
    //http://blog.stevenlevithan.com/archives/faster-trim-javascript
    
    var trim = function (str)
    {
        str = str.replace(/^\s\s*/, '');
        var ws = /\s/;
        var i = str.length;
        while (ws.test(str.charAt(--i))) {}
        return str.slice(0, i + 1);
    };
    
    $.fn.breakWords = function (maxRunLength, replaceStr)
    {
        this.each(function ()
        {
            if (this.nodeType !== 1) // Process text nodes only.
            {
                return;
            }
            
            if (this.currentStyle && typeof this.currentStyle.wordBreak === 'string')
            {
                //Lazy Function Definition Pattern, Peter's Blog
                //From http://peter.michaux.ca/article/3556
                this.runtimeStyle.wordBreak = 'break-all';
            }
            else if (document.createTreeWalker)
            {
                var insertSplits = function (str, maxRunLength, splitStr)
                {
                    if (maxRunLength <= 1)
                    {
                        str.split('').join(splitStr);
                    }
                    
                    // Make sure there is at least 1 char after the end of the string.
                    // If the string ends, there's no reason to split.
                    // Chrome has trouble with long runs of periods. It seems to ignore
                    // and silently remove soft hyphen characters in the middle of periods as
                    // they're inserted into the DOM.
                    var regexp = new RegExp('\\S{' + (maxRunLength - 1) + ',}\\S+');
                    var stringParts = [];
                    
                    var matchFound = true;
                    var searchString = str;
                    
                    //log('Starting search for splits');
                    
                    while (matchFound && searchString.length > 0)
                    {
                        //log(
                        //	'Searching in string '',
                        //	searchString.substr(0, 40), "[...]"');
                        
                        var matchStart = searchString.search(regexp);
                        
                        if (matchStart >= 0)
                        {
                            var splitLocation = matchStart + maxRunLength;
                            
                            //log(
                            //	'Split location found at ', splitLocation,
                            //	' = "', searchString.substr(splitLocation, 5), "[...]"');
                            
                            matchFound = true;
                            
                            stringParts.push(searchString.substr(0, splitLocation));
                            
                            searchString = searchString.substring(splitLocation);
                        }
                        else
                        {
                            //log('No split location found');
                            
                            matchFound = false;
                            
                            stringParts.push(searchString);
                        }
                    }
                    
                    if (stringParts.length > 1)
                    {
                        //log('String split into the following parts: ', stringParts);
                        
                        return stringParts.join(splitStr);
                    }
                    else
                    {
                        //log('Original string did not need to be split');
                        
                        return str;
                    }
                }
                
                // Lazy Function Definition Pattern, Peter's Blog
                // From http://peter.michaux.ca/article/3556
                
                //For Opera, Safari, and Firefox
                var dWalker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, false);

                while (dWalker.nextNode())
                {
                    var node = dWalker.currentNode;
                    
                    // We need to trim the string, otherwise Firefox will display
                    // incorect text-indent with space characters.
                    var originalValue = trim(node.nodeValue);
                    
                    var processedString = insertSplits(originalValue, maxRunLength, replaceStr);
                    
                    node.nodeValue = processedString;
                }
            }
        });
        
        return this; 
    };
    
    function decodeHtmlToText(html)
    {
        var $tempElem = $(document.createElement('div')).html(html);
        return $tempElem.text();
    }
    
    function encodeTextAsHtml(text)
    {
        var $tempElem = $(document.createElement('div')).text(text);
        return $tempElem.html();
    }
    
    var SpeakerColorizer = new (function (MAX_SPEAKER_COUNT)
    {
        var MAX_SPEAKER_COUNT = 0;
        
        var currentColorIndex = 0;
        var speakerToIndexMapping = {};
        var currentlyAllocatedSpeakers = 0;
        
        this.getSpeakerFromLine = function (line)
        {
            // Pattern parts:
            // 1. "*** ..." (notifications; do not match)
            // 2. "(name)" or "<name>" (occasionally the opening symbol will be missing).
            //    A "@" or "+" beffore "name" will be tolerated.
            // 3. "* name" (emote).
            // 4. "name":
            // 5. First word token
            // This can't easily handle status changes...live with it :).
            // Note that the repetition symbols should be lazy in most cases,
            // not the default of greedy (hence the '?' in /pattern+?/).
            var pattern = /(?:\s*\*\*\*\s+)|[<\[\(]?[@\+]?(.+?)[>\]\)]|\s*\*\s+(.+?)\s+|(.+?):|(\w+?)/;
            var nameParts = pattern.exec(line);
            
            if (null == nameParts)
            {
                return null;
            }
            
            // Find the first capturing group that got a match.
            var nameIndex = arrayCoalesceIndex(nameParts, 1);
            
            // Keep things consistent: turn undefined into null.
            var name = nameParts[nameIndex];
            if ('undefined' === typeof(name))
            {
                name = null;
            }
            
            if (null != name)
            {
                //console.log(
                //	'Extracted name "', name, '" from line "', line,
                //	'"; matched pattern type "', nameIndex);
            }
            else
            {
                console.warn('No speaker found on line ', line);
                
                return null;
            }
            
            return name;
        }
        
        this.getIndexForSpeaker = function (speaker)
        {
            //console.log(
            //	'Getting index for speaker "', speaker,
            //	'"; currently have: ', speakerToIndexMapping);
            
            // We can't do a simple if because 0 evaluates to false, so
            // speakers with index 0 will never be found.
            // This solution seems more natural than starting the index at 1
            // instead of 0.
            if ('undefined' === typeof(speakerToIndexMapping[speaker]))
            {
                //console.log('"', speaker, '" is a new speaker; getting new index');
                
                speakerToIndexMapping[speaker] = currentColorIndex;
                currentColorIndex++;
                currentlyAllocatedSpeakers++;
                
                //if (currentlyAllocatedSpeakers >= MAX_SPEAKER_COUNT)
                //{
                //	console.warn(
                //		'OMG! we ran out of free colors for speakers. ' +
                //		'Starting at the beginning again.');
                //}
                
                if (currentColorIndex >= MAX_SPEAKER_COUNT)
                {
                    currentColorIndex = 0;
                }
            }
            //else
            //{
            //	console.log('"', speaker, '" already has a color code; getting it');
            //}
            
            return speakerToIndexMapping[speaker];
        }
        
        this.reset = function ()
        {
            clearSavedSpeakers();
            
            currentColorIndex = 0;
        }
        
        this.clearSavedSpeakers = function ()
        {
            speakerToIndexMapping = {};
            currentlyAllocatedSpeakers = 0;
        }
        
        var arrayCoalesceIndex = function (array, start)
        {
            for (var i = start; i < array.length; i++)
            {
                var element = array[i];
                
                if ('null'      !== typeof(element) &&
                    'undefined' !== typeof(element))
                {
                    return i;
                }
            }
            
            return null;
        }
        
        var addStyles = function ()
        {
            var maxSpeakerCount = 0;
            GM_addStyle([
                '.useFancyFormatting .speaker', maxSpeakerCount++, ' { background-color: #CFF; }',
                '.useFancyFormatting .speaker', maxSpeakerCount++, ' { background-color: #FCF; }',
                '.useFancyFormatting .speaker', maxSpeakerCount++, ' { background-color: #FFC; }',
                '.useFancyFormatting .speaker', maxSpeakerCount++, ' { background-color: #CFC; }',
                '.useFancyFormatting .speaker', maxSpeakerCount++, ' { background-color: #FCC; }',
                '.useFancyFormatting .speaker', maxSpeakerCount++, ' { background-color: #CCF; }'
            ].join(''));
            
            MAX_SPEAKER_COUNT = maxSpeakerCount;
        }
        addStyles();
    })();
    
    $.fn.colorizeSpeakers = function ()
    {
        SpeakerColorizer.clearSavedSpeakers();
        
        $(this).each(function ()
        {
            _this = $(this);
            
            var lines = decodeHtmlToText(_this.html().replace(/<br>/g, '\n')).split('\n');
            var stylizedLines = new Array(lines.length);
            
            for (var lineNum = 0; lineNum < lines.length; lineNum++)
            {
                var line = lines[lineNum];
                
                var speaker = SpeakerColorizer.getSpeakerFromLine(line);
                
                var speakerIndex = SpeakerColorizer.getIndexForSpeaker(speaker);
                
                var trimmedText = trim(line);
                if (0 == trimmedText.length)
                {
                    // Blank lines won't get rendered properly.
                    line = decodeHtmlToText('&nbsp;');
                }
                
                var $lineElement = $(document.createElement('div')).text(line);
                
                if (null != speaker)
                {
                    $lineElement.addClass('speaker' + speakerIndex)
                }
                
                stylizedLines[lineNum] = $lineElement;
            }
            
            stylizedLines[0].addClass('firstLine');
            stylizedLines[stylizedLines.length - 1].addClass('lastLine');
            
            for (var lineNumForStyle = 0;
                 lineNumForStyle < stylizedLines.length - 1;
                 lineNumForStyle++)
            {
                stylizedLines[lineNumForStyle].addClass('firstOrInnerLine');
            }
            
            _this.empty();
            
            for (var lineNumToAdd = 0;
                 lineNumToAdd < stylizedLines.length;
                 lineNumToAdd++)
            {
                var lineToAdd = stylizedLines[lineNumToAdd];
                _this.append(lineToAdd);
            }
        });
        
        return this;
    };
    
    $.fn.showNextQuote = function ()
    {
        this.next('p.qt').show();
        
        this.setExpandOrCollapseLabel();
        
        return this;
    }
    
    $.fn.hideNextQuote = function ()
    {
        this.next('p.qt').hide();
        
        this.setExpandOrCollapseLabel();
        
        return this;
    }
    
    $.fn.toggleNextQuote = function ()
    {
        var actualQuote = this.next('p.qt');
        
        actualQuote.toggle();
        
        this.setExpandOrCollapseLabel();
        
        return this;
    }
    
    $.fn.setExpandOrCollapseLabel = function ()
    {
        var actualQuote = this.next('p.qt');
        
        if (actualQuote.filter(':visible').size() > 0)
        {
            // Quote is visible, show the - to collapse it.
            this.find('span.expandOrCollapse').html('&minus;');
        }
        else
        {
            // Quote is hidden, show the + to expand it.
            this.find('span.expandOrCollapse').html('&plus;');
        }
    }
     
    var ajaxVote = function(e)
    {
        e.preventDefault();
        
        $.ajax($(this).attr("href"), {
            context: {t: this, u: e.data.u},
            success: function(str) {
                results = $(str).filter("center").has("font.bodytext").first();
                
                if (results.text().substring(0, 5) == "Done!")
                {
                    span = $(this.t).siblings('span.score');
                    score = parseInt(trim(span.text()).slice(1, -1), 10);
                    if (this.u) {
                        score++;
                    } else {
                        score--;
                    }
                    
                    span.text("(" + score + ")");
                }
            }
        });
    }

    var resetAllQuotes = function ()
    {
        showAllQuotes();
        hideSelectiveQuotes(Form.getMinScore());
    }

    var showAllQuotes = function ()
    {
        $('p.quote').showNextQuote();
    }
    
    var hideAllQuotes = function ()
    {
        $('p.quote').hideNextQuote();
    }
    
    var hideSelectiveQuotes = function (minScore)
    {
        $('p.quote').each(function (index, element)
        {
            _this = $(this);
            var score = parseInt(_this.text().match(/\((\-?\d+)\)/)[1], 10);
            
            //console.log('Comparing ', score, ' to ', minScore);
            if (score < minScore)
            {
                //console.log('hiding!');
                _this.hideNextQuote();
            }
        });
    }
    
    var hideQuotes = function ()
    {
        var minScore = Prefs.getMinScore();
        hideSelectiveQuotes(minScore);
    }
    
    var applySettingsToPage = function (usePrefs)
    {
        if ('undefined' === typeof(usePrefs))
        {
            usePrefs = true;
        }
        else
        {
            usePrefs = !!usePrefs;
        }
        
        //console.log('in applySettingsToPage, usePrefs = ', usePrefs)
        var settingsSource;
        
        if (usePrefs)
        {
            //console.log('getting settings from Prefs');
            
            settingsSource = Prefs;
        }
        else
        {
            //console.log('getting settings from Form');
            
            settingsSource = Form;
        }
        
        // Duck Typing FTW!
        var useScoreFilter = settingsSource.getUseScoreFilter();
        var minScore = settingsSource.getMinScore();
        var useFancyFormatting = settingsSource.getUseFancyFormatting();
        
        //console.log('use score filter = ', useScoreFilter);
        //console.log('minScore = ', minScore);
        //console.log('use fancy formatting filter = ', useFancyFormatting);
        
        showAllQuotes();
        
        if (useScoreFilter)
        {
            hideSelectiveQuotes(minScore);
        }
        
        if (useFancyFormatting)
        {
            $('body').addClass('useFancyFormatting');
        }
        else
        {
            $('body').removeClass('useFancyFormatting');
        }
    }
    
    var setFancyFormatting
    

    if (isCurrentPage('random', 'random1', 'browse', 'top', 'top2', 'search='))
    {	
        var saveSettings = function ()
        {
            var useFilter = Form.getUseScoreFilter();
            var minScore = Form.getMinScore();
            var useFancyFormatting = Form.getUseFancyFormatting();

            try
            {
                Prefs.setUseScoreFilter(useFilter);
                Prefs.setMinScore(minScore);
                Prefs.setUseFancyFormatting(useFancyFormatting);
            }
            catch (e)
            {
                // TODO: indicate that there was an error.
                console.error('Error saving settings:', e);
            }
                    
            // Show the user the actual values that were used.
            updateInputValueFields();
        }
        var handleSettingChanged = function ()
        {
            saveSettings();
            applySettingsToPage(false);
        }
        var updateInputValueFields = function ()
        {
            Form.setUseScoreFilter(Prefs.getUseScoreFilter());
            Form.setMinScore(Prefs.getMinScore());
            Form.setUseFancyFormatting(Prefs.getUseFancyFormatting());
        }
        // End helper functions.

        var useScoreFilterCheckBox = $('<input type="checkbox" />')
            .attr('id', 'useScoreFilter')
            .attr('name', 'useScoreFilter')
            .on('change', function () {
                handleSettingChanged();
            });

        var minScoreTextBox = $('<input type="text" />')
            .attr('id', 'minScore')
            .attr('name', 'minScore')
            .attr('size', 2)
            .css('text-align', 'right')
            .on('blur', function () {
                var $score = $(this);
                var value = $score.val();

                var scoreMin = parseInt(value, 10);

                if (!isNaN(scoreMin))
                {
                    handleSettingChanged();
                }
                else
                {
                    $score.val(Prefs.getMinScore());
                }
            });

        var useFancyFormattingTextBox = $('<input type="checkbox" />')
            .attr('id', 'useFancyFormatting')
            .attr('name', 'useFancyFormatting')
            .on('change', function () {
                handleSettingChanged();
            });

        var resetAllQuotesLink = $(document.createElement('a'))
            .attr('id', 'resetAllQuotesLink')
            .attr('href', 'javascript:void(0);')
            .text('Reset All')
            .on('click', function () {
                resetAllQuotes();
                return false;
            });

        var showAllQuotesLink = $(document.createElement('a'))
            .attr('id', 'showAllQuotesLink')
            .attr('href', 'javascript:void(0);')
            .text('Show All')
            .on('click', function () {
                showAllQuotes();
                return false;
            });

        var hideAllQuotesLink = $(document.createElement('a'))
            .attr('id', 'hideAllQuotesLink')
            .attr('href', 'javascript:void(0);')
            .text('Hide All')
            .on('click', function () {
                hideAllQuotes();
                return false;
            });

        var toggleNextQuoteLink = $(document.createElement('a'))
            .attr('href', 'javascript:void(0);')
            .attr('title', 'toggle quote')
            .addClass('qa')
            .addClass('quoteToggle')
            .on('click', function ()  {
                $(this).parents('p.quote').toggleNextQuote();
                return false;
            });

        var quoteExpandOrCollapse = $(document.createElement('span'));
        quoteExpandOrCollapse.attr('class', 'expandOrCollapse');

        toggleNextQuoteLink
            .append('[')
            .append(quoteExpandOrCollapse)
            .append(']');

        $('p.quote').each(function ()
        {
            var _this = $(this);
            
            var quoteId = parseInt(_this.find('a > b').text().substring(1), 10);
            
            _this.data('quoteID', quoteId);
            
            _this
                .contents()
                .filter(function() {return this.nodeType == 3})
                .filter(function() {return trim(this.textContent) != ""})
                .wrap('<span class="score" />');
            
            var anchorName = 'quote_' + quoteId;
            
            var anchorLink = $(document.createElement('a'))
                .attr('href', '#' + anchorName)
                .attr('name', anchorName)
                .addClass('anchorLink')
                .append($('<b>#</b>'));
            
            // This needs to be in an each block because of the clone() call.
            _this
                .prepend(' - ')
                .prepend(anchorLink)
                .append(' ')
                .append(toggleNextQuoteLink.clone(true))
                .setExpandOrCollapseLabel()
                ;
            
            _this.find('a.qa').each(function ()
            {
                up = true;
                voteLink = $(this);
                text = trim(voteLink.text());
                
                if ('+' == text)
                {
                    up = true;
                    voteLink.html('&plus;');
                }
                else if ('-' == text)
                {
                    up = false;
                    voteLink.html('&minus;');
                }
                
                voteLink.click({u: up}, ajaxVote);
            });
        });

        $('p.quote a.qa:contains("[X]")').remove();
        
        var settingsContainer = $(document.createElement('div'))
            .attr('id', 'settingsContainer')
            .addClass('toplinks')
            .append(useScoreFilterCheckBox)
            .append($('<label for="useScoreFilter">Hide quotes with a score lower than</label>'))
            .append(minScoreTextBox)
            .append('<br />')
            .append(useFancyFormattingTextBox)
            .append($('<label for="useFancyFormatting">Use fancy formatting</label>'))
            .append('<br />')
            .append(resetAllQuotesLink)
            .append(' | ')
            .append(showAllQuotesLink)
            .append(' | ')
            .append(hideAllQuotesLink)
            .append($('<br />'));

        if (DEBUG)
        {
            var debugClearLink = $(document.createElement('a'))
                .attr('href', 'javascript:void(0);')
                .html('Wipe settings')
                .on('click', function () {
                    //console.log('Wiping settings and resetting toggled quotes');

                    Prefs.deleteAll();

                    updateInputValueFields();

                    applySettingsToPage(true);
                    return false;
                });
            
            settingsContainer
                .append(debugClearLink)
                .append($('<br />'));
        }

        settingsContainer.append($(document.createElement('br')));
        
        $('body > center:first').prepend(settingsContainer);
        
        updateInputValueFields();
        
        applySettingsToPage(true);
    }
    
    $('p.qt')
        .breakWords(MAX_RUN_LENGTH, REPLACE_STRING)
        .colorizeSpeakers();
}
)(jQuery);
