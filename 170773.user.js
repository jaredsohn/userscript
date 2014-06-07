// ==UserScript==
// @name           ESPN Chat Extension
// @namespace      rabidchinchillas
// @description    Customize your ESPN Chat experience
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.js
// @include        http://espn.go.com/community/conversation*
// @include        http://*.espn.go.com/*/conversation*
// @include        http://espn.go.com/community/conversation*
// @include        http://*.espn.go.com/*/conversation*
// @include        http://espn.go.com/blog/*
// @include        http://espn.go.com/*/conversations
// @include        http://espn.go.com/*/conversation* 
// @include        http://*.espn.go.com/*/group*
// @updateURL  	   http://userscripts.org/scripts/source/170773.meta.js
// @version        1.1.0
// @run-at         document-start
// ==/UserScript==


var currentAuthor;
var ignoredAuthors = {};
var isGroup = location.pathname.match(/\/group$/);
var myAuthorName = '';


var s = GM_getValue('ignored_authors');

if (s !== 'undefined' && s)
{
    s = s.split(',');
    
    for (var i = 0; i < s.length; i++)
        ignoredAuthors[s[i]] = 1;
}


function htmlify(s)
{
    s = s.replace('<', '&lt;');
    s = s.replace('>', '&gt;');
    s = s.replace('"', '&quot;');
    s = s.replace("'", '&#39;');
    return s;
}

function ignoreAuthor(author)
{
	var ok = confirm('This will ignore all posts from ' + author + '.');
    
    if (!ok)
        return;
    
    setAuthorIgnored(author, true);
}

function parseEchoItemContent(content)
{
    var contentQuery = $(content);
    var containerQuery = contentQuery.find('.echo-item-container').first();

    // Use our "tag" to find out if we need to do any work.
    if (containerQuery.hasClass('bb'))
        return;
    containerQuery.addClass('bb');
    
    var authorQuery = containerQuery.find('.echo-item-authorName a');
    var author = authorQuery.text().toLowerCase();
    
    if (ignoredAuthors[author])
        contentQuery.attr('style', 'display:none;');
    
    if (author != myAuthorName)
    {
        var controlsQuery = containerQuery.find('.echo-item-controls');
        controlsQuery.append(
            '<span class="echo-item-control-delim"> · </span><a class="echo-item-control echo-clickable echo-item-control-ignore">Ignore</a>'
        );
        controlsQuery.find('.echo-item-control-ignore').click(
            onIgnoreAuthorClicked
        );
    }
    
    var textQuery = containerQuery.find('.echo-item-text');

    textQuery.find('sub').remove();
    textQuery.find('sup').remove();

    textQuery.find('a').each(
        function(index) 
        {
  			var link = $(this);
            var url = link.attr('href');
            
            if (!url)
                return;
            
            link.removeAttr('onclick');
            
            link.click(
                function()
                {
                    var ok = confirm(
                        'This link will take you to the following site:\n' + url + '\n\n'
                    	+ 'If this is not what you want to do, click "Cancel".');
                    
                    if (ok)
                        window.open(url, '_blank');
                    
                    return false;
                }
            );
		}
    );
}

function setAuthorIgnored(author, isIgnored)
{
    var wasIgnored = ignoredAuthors[author];
    
    if (isIgnored == wasIgnored)
        return;
 
    if (isIgnored)
        ignoredAuthors[author] = 1;
    else
        delete ignoredAuthors[author];
    
    updateIgnoredAuthors(author, true);
    
    var contentQuery = $('.echo-item-content');
    
    contentQuery.each(
        function()
        {
            var contentQuery = $(this);
            var authorQuery = contentQuery.find('.echo-item-authorName a').first();
            var currentAuthor = authorQuery.text().toLowerCase();
            
            if (currentAuthor == author)
            {
                if (isIgnored)
                	contentQuery.attr('style', 'display:none;');
                else
                	contentQuery.removeAttr('style');
            }
        }
    );
}

function setGroupShown(isShown)
{
    var contentQuery = $('#games-content');
    
	if (isShown)
    {
        contentQuery.find('.left_col').removeAttr('style');
        contentQuery.find('.right_col').removeAttr('style');
    }
    else
    {
        contentQuery.find('.left_col').attr('style', 'display:none;');
        contentQuery.find('.right_col').attr('style', 'width:100%;');
    }
}

function updateGroupShown()
{
	setGroupShown(GM_getValue('group_shown'));
}

function updateIgnoredAuthors(selectedAuthor, isPersist)
{
    var authors = [];
    for (var otherAuthor in ignoredAuthors)
        authors.push(otherAuthor);
    authors.sort();
    
    if (isPersist)
    	GM_setValue('ignored_authors', authors.join(','));

    var containerQuery = $('#ignored_authors_container');
    
    if (authors.length != 0)
    {
        var ignoredAuthorsQuery = $('#ignored_authors');
        
        ignoredAuthorsQuery.find('option').remove();
        for (var i = 0; i < authors.length; i++)
        {
            var otherAuthor = authors[i];
            var otherAuthorEncoded = encodeURIComponent(otherAuthor);
            ignoredAuthorsQuery.append('<option value="' + otherAuthorEncoded + '">' + htmlify(otherAuthor) + '</option>');
        }
        
        var optionQuery = ignoredAuthorsQuery.find('option');
        
        if (selectedAuthor)
        {
            optionQuery.each(
                function()
                {
                    var optionQuery = $(this);
                    var otherAuthor = optionQuery.attr('value');
                    otherAuthor = decodeURIComponent(otherAuthor);
                    
                    if (otherAuthor == selectedAuthor)
                        optionQuery.attr('selected', 'true');
                }
            );
        }
        else
        {
            optionQuery.first().attr('selected', 'true');
        }
        
        ignoredAuthorsQuery.change();
		containerQuery.removeAttr('style');
    }
    else
    {
        containerQuery.attr('style', 'display:none;');
    }
}


function onEchoItemContentInserted(content, isParseDescendents)
{
    parseEchoItemContent(content);
    
    if (!isParseDescendents)
        return;
    
    var contentQuery = $(content);

    contentQuery.find('.echo-item-children .echo-item-content').each(
        function()
        {
            content = this;
            onEchoItemContentInserted(content, false);
        }
    );
}

function onEchoPluginControlsInserted(controls)
{
    // Create and add our controls above the echo plugin controls.
    
    var html = '<div id="bb_controls"><form>'
        + '<b><a href="http://userscripts.org/scripts/show/170773" target="_blank">ESPN Chat Extension</a> is active.</b>';
    
    if (isGroup)
        html += '<div><br/>Show Group Results: <input type="checkbox" id="show_group" /></div>';
    
    html += '<div id="ignored_authors_container" style="display:none;"><br/>'
    	+ 'Ignored Users: <select id="ignored_authors"></select> <a href="#" id="unignore_author">Unignore</a></div>';
    
    html += '</form></div><br/>';
    
    myAuthorName = $('.echo-auth-name').first().text();
    
    if (myAuthorName)
        myAuthorName = myAuthorName.toLowerCase();
    
    var controlsQuery = $(controls);
    controlsQuery.addClass('bb');
    controlsQuery.before(html);
    
    var controlsQuery = $('#bb_controls');

    if (isGroup)
    {
        var showGroupQuery = controlsQuery.find('#show_group');
       
    	showGroupQuery.attr('checked', GM_getValue('group_shown'));
    
        showGroupQuery.change(
            function()
            {
                var isShown = this.checked;
                GM_setValue('group_shown', isShown);
                setGroupShown(isShown);
            }
        );
    }
    
    updateIgnoredAuthors(null, false);
    
    var unignoreAuthorQuery = controlsQuery.find('#unignore_author');
    unignoreAuthorQuery.click(
    	function()
        {
            var author = controlsQuery.find('#ignored_authors :selected').attr('value');
            author = decodeURIComponent(author);
            setAuthorIgnored(author, false);
            return false;
        }
    );
}

function onGamesContentInserted(content)
{
    updateGroupShown();
}

function onIgnoreAuthorClicked()
{
    var contentQuery = $(this).parents('.echo-item-content').first();
    var authorQuery = contentQuery.find('.echo-item-authorName a').first();
    var author = authorQuery.text().toLowerCase();
    
    ignoreAuthor(author);
}


console.log("Started ESPN Chat Extension.");

if (isGroup)
{
    // Listen for the group results to be added.
    var gamesContentInsertedListener =
        function()
        {
            onGamesContentInserted(this);
    
            $(document).off(
                'DOMNodeInserted', 
                '#games-content', 
                gamesContentInsertedListener
            );
            
            gamesContentInsertedListener = null;
        };
    $(document).on(
        'DOMNodeInserted', 
        '#games-content', 
        gamesContentInsertedListener
    );
}

// Listen for the echo plugin controls to be added.
var echoPluginControlsInsertedListener = 
    function()
    {
        onEchoPluginControlsInserted(this);
        
        $(document).off(
    		'DOMNodeInserted', 
    		'.echo-plugin-HeaderControls', 
    		echoPluginControlsInsertedListener
		);
        
        echoPluginControlsInsertedListener = null;
    };
$(document).on(
    'DOMNodeInserted', 
    '.echo-plugin-HeaderControls', 
    echoPluginControlsInsertedListener
);

// Listen for new echo items to be added.
$(document).on(
    'DOMNodeInserted', 
    '.echo-item-content', 
    function()
    {
        onEchoItemContentInserted(this, true);
    }
);
