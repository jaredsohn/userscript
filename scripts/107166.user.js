// ==UserScript==
// @name           Internet Archive File Types
// @namespace      www.archive.org
// @description    A script to show you which file types are available for each identifier
// @include        https://archive.org/search.php*
// @include        https://archive.org/details/*
// @include        https://*.archive.org/search.php*
// @include        https://*.archive.org/details/*
// @include        http://archive.org/search.php*
// @include        http://archive.org/details/*
// @include        http://*.archive.org/search.php*
// @include        http://*.archive.org/details/*
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_addStyle
// @grant          GM_wait
// @version        3.0.2
// @author         Tom Anderson <tom.h.anderson@gmail.com>
// ==/UserScript==

/**
 * Do auto updating first
 * see http://userscripts.org/scripts/review/20145
 */
var IAFT_script_number = 107166;

try
{
    function updateCheck(forced)
    {
        // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
        if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime())))
        {
            try
            {
                GM_xmlhttpRequest(
                {
                    method: 'GET',
                    url: 'http://userscripts.org/scripts/source/' + IAFT_script_number + '.meta.js?' + new Date().getTime(),
                    headers: {'Cache-Control': 'no-cache'},
                    onload: function(resp)
                    {
                        var local_version, remote_version, rt, script_name;

                        rt=resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime()+'');
                        remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                        local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
                        if(local_version!=-1)
                        {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version)
                            {
                                if(confirm('There is an update available for "'+script_name+'."\nWould you like to go to the install page now?'))
                                {
                                    GM_openInTab('http://userscripts.org/scripts/show/'+IAFT_script_number);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            }
                            else if (forced)
                                alert('No update is available for "'+script_name+'."');
                        }
                        else
                            GM_setValue('SUC_current_version', remote_version+'');
                    }
                });
            }
            catch (err)
            {
                if (forced)
                    alert('An error occurred while checking for updates:\n'+err);
            }
        }
    }
    GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
    {
        updateCheck(true);
    });
    updateCheck(false);
}
catch(err)
{}

/**
 * End auto updating
 */

/**
 * CSS
 */
GM_addStyle("\
        div.iaftDetails { \
            float: left; \
        } \
        section.iaft { \
            float:left; \
            padding-bottom: 5px; \
        } \
        section.iaft h1 { \
            font-weight: bold; \
            font-size: 1.25em; \
            color: white; \
            margin: 0px; \
            spacing: 0px; \
            padding: 0px; \
            height: 16px; \
            padding-left: 15px; \
            padding-right: 15px; \
            padding-top: 5px; \
            padding-bottom: 5px; \
            margin-left: 10px; \
            border: solid; \
            border-width: 1px; \
            border-top-left-radius: 10px; \
            border-top-right-radius: 10px; \
            background-color: #aaaaaa; \
            border-color: #aaaaaa; \
        } \
        \
        section.iaft.software { \
            border-color: #999966; \
        } \
        \
        section.iaft.software h1 { \
            background-color: #999966; \
            border-color: #999966; \
        } \
        \
        section.iaft.movies { \
            border-color: #115500; \
        } \
        \
        section.iaft.movies h1 { \
            background-color: #115500; \
            border-color: #115500; \
        } \
        \
        section.iaft.etree { \
            border-color: #385C74; \
        } \
        \
        section.iaft.etree h1 { \
            background-color: #385C74; \
            border-color: #385C74; \
        } \
        \
        section.iaft.audio { \
            border-color: #385C74; \
        } \
        \
        section.iaft.audio h1 { \
            background-color: #385C74; \
            border-color: #385C74; \
        } \
        \
        section.iaft.texts { \
            border-color: #93092D; \
        } \
        \
        section.iaft.texts h1 { \
            background-color: #93092D; \
            border-color: #93092D; \
        } \
        \
        section#actions.software, section#actions.texts, section#actions.movies { \
            display: none; \
        }\
        \
        section.iaft ul { \
            border: solid; \
            border-width: 1px; \
            border-color: #385C74; \
            background-color: white; \
            border-bottom-left-radius: 10px; \
            border-bottom-right-radius: 10px; \
            padding: 5px; \
            margin: 0px; \
            margin-left: 10px; \
        } \
        section.iaft ul li { \
            display: inline; \
            position: relative; \
            padding: 5px; \
            cursor: pointer; \
        } \
        \
        button.iaft { \
            font-weight: bold; \
            width: 48px; \
            height: 48px; \
        } \
        .IAFTLightboxMask { \
            display: none; \
            position: absolute; \
            top: 0%; \
            left: 0%; \
            width: 100%; \
            height: 100%; \
            background-color: black; \
            z-index:1001; \
            -moz-opacity: 0.8; \
            opacity:.80; \
            filter: alpha(opacity=80); \
        } \
          \
        .IAFTLightboxBody { \
            display: none; \
            position: absolute; \
            top: 10%; \
            left: 10%; \
            width: 80%; \
            height: 80%; \
            padding: 16px; \
            border: 3px solid #385C74; \
            background-color: #F1FBFD; \
            color: #385C74; \
            -moz-border-radius: 10px; \
            border-radius: 10px; \
            z-index:1002; \
            overflow: auto; \
        } \
        .betterTitle { \
            font-size: 16pt; \
            display: block; \
            padding-bottom: 10px; \
            text-decoration: none; \
        } \
        p.copy { \
            font-size: 8pt; \
        } \
        .iaft_form {   \
            background:#fff;   \
            width:840;   \
            border-radius: 10px; \
            margin:5px auto;   \
            padding:0;   \
            overflow:auto;   \
        }   \
         \
        dl.iaft_form { \
            border: solid; \
            border-color: #EF9B49; \
            border-radius: 15px; \
        } \
         \
        .iaft_form dt{   \
            padding:0;   \
            clear:both;   \
            width:20%;   \
            float:left;   \
            text-align:right;   \
            margin:5px 12px 5px 0;   \
            font-weight: bold; \
        }   \
         \
        .iaft_form dd{   \
            padding:0;   \
            float:left; \
            text-align:left; \
            width:68%;   \
            margin:5px 2px 5px 0;   \
        }   \
         \
        .iaft_form ul.errors li { \
            margin: 0 0.15em; \
            color: #ff0000; \
            list-style-type:none;  \
        } \
         \
        .iaft_form p{   \
            padding:0;   \
            margin:0;   \
        }   \
         \
        .iaft_form p.description { \
            font-style:italic;  \
        } \
         \
        .iaft_form input, .iaft_form textarea{   \
            margin:0 0 2px 0;   \
            padding:0;   \
        }   \
        \
        ul.IAFTfilelist { \
            clear: both; \
            font-family: courier; \
            list-style: none; \
        } \
        \
        ul.IAFTfilelist li { \
            padding-top: 5px; \
        } \
        \
        div.iaft_noicon { \
            position: absolute; \
            left: 14px; \
            top: 34px; \
            font-size: 14px; \
            font-weight: bold; \
            color: #8A8A8A; \
        } \
        \
        div.iaft_filecount { \
            border: solid; \
            border-radius: 4px; \
            border-color: #385C74; \
            background-color: #385C74; \
            opacity: 0.7; \
            position: absolute; \
            font-size: 12px; \
            color: white; \
            left: 10px; \
            top: 5px; \
        }\
\
        ul.IAFTfilelist li { \
            border: solid; \
            border-radius: 5px; \
            padding: 5px; \
            margin: 5px; \
            border-color: #385C74; \
            font-size: 1.5em; \
            background-color: #ffffff; \
        } \
        \
        ul.IAFTfilelist li:hover { \
            border-color: #92AED3; \
        } \
        \
        ul.IAFTfilelist.li:hover table { \
        } \
        \
        ul.IAFTfilelist li:hover a { \
        } \
        ul.IAFTfilelist li a { \
            text-decoration: none; \
        }\
        tr.more { \
            display: none; \
        } \
        a.more:hover { \
            cursor: pointer; \
        } \
        a.closeButton { \
            position:absolute; \
            top: 40px; \
            left: 10px; \
            height:24px; \
            width:24px; \
            display: none; \
            z-index:1050; \
            background-image:url(http://db.etree.org/images/other/lightbox-close.png); \
        } \
        a.closeButton:hover { \
            background-image:url(http://db.etree.org/images/other/lightbox-close-hover.png); \
        } \
        \
        \
        div.IAFTbreadcrumbs {\
            padding-bottom: 10px;\
        } \
        div.IAFTbreadcrumbs b { \
            display: block; \
            font-size: 2em; \
            padding-top: 10px; \
        } \
");

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
// MIT License
function parseUri (str) {
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

// http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

/**
 * jQuery startup from http://joanpiedra.com/jquery/greasemonkey/
 */
var $;
(function() {
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        letsJQuery();
    }
}

/**
 * This function is triggered by an img not loading it's src
 * This has to be in the main window for img onerror to see it and early
 * in the script so it fires correctly
 */
unsafeWindow.handleIconError = function(node) {
    ext = $(node).attr('title');
//    button = $('<button class="iaft">' + ext + '</button>');
//    $(node).after(button);
//    $(node).remove();

    // Create floating text

    float = $('<div class="iaft_noicon">' + ext.toUpperCase() + '</div>');
    $(node).attr('src', 'http://db.etree.org/images/ico/filetype iaft.png');
    $(node).after(float);
}

unsafeWindow.handleSmallIconError = function(node) {
    $(node).attr('src', 'http://db.etree.org/images/ico/filetype iaft.png');
}

// This is akin to $(function() {});
function letsJQuery() {
//    alert($.jquery); // check jQuery version

    // Check browser version
    if (parseInt($.browser.version, 10) < 5) {
        alert("IAFT works with Firefox 5.0 and greater.  No support is offered for legacy browsers. "
              + "You are running version " + $.browser.version
        );
        return;
    }

    IAFT = {
        xmlUrl: '',
        rebuildSection: function(identifier) {
            a = $('a.betterTitle[href="/details/' + identifier + '"]');
            if ($(a).length) {
                $(a).parent('.hitCell').find('.iaft').remove();

                this.buildSections(a);
            } else {
                $('div.iaft').remove();

                uri = parseUri(document.location);
                if (uri.file != 'search.php') {
                    $('#begPgSpcr').each(function(index, node) {
                        div = IAFT.buildSections(node, uri.path.substr(9), this, 'prepend');
                        $(div).addClass('iaftDetails');
                        $(div).find('li.showFiletypes').click();
                    });
                }
            }

        },

        buildSections: function(node, identifier, parent, attach) {
            // Get the archive identifier
            if (typeof identifier == 'undefined') {
                identifier = $(node).attr('href').substr(9);
            }
            var identifier_slug = string_to_slug(identifier);
            // Find the parent
            if (typeof parent == 'undefined') {
                parent = $(node).parent();
            }
            // Default the attachment
            if (typeof attach == 'undefined') {
                attach = 'append';
            }

            div = $('<div class="iaft ' + identifier_slug + '"></div>');
            switch(attach) {
                case 'after':
                    $(parent).after(div);
                    break;
                case 'append':
                    $(parent).append(div);
                    break;
                case 'prepend':
                    $(parent).prepend(div);
                    break;

            }

            // Make the search result titles bigger & better
            $('.titleLink').removeClass('titleLink').addClass('betterTitle');

            // Section References
            section = document.createElement('section');
            section.id = 'references';
            section.className = 'iaft';
            section.style.display = 'both';
            $(section).append('<h1>References</h1>');
            $(div).append(section);

            references_ul = document.createElement('ul');
            $(section).append(references_ul);

            // Section file types
            section = document.createElement('section');
            section.id = 'fileTypes';
            section.className = 'iaft';
            $(section).append('<h1>Files</h1>');
            filetype_ul = document.createElement('ul');
            $(section).append(filetype_ul);
            $(div).append(section);


            // Populate file types
            li = $('<li class="showFiletypes"><button class="iaft">Show</button></li>');
            $(li).data('identifier', identifier);
            $(filetype_ul).append(li);

            // Section Other Sources
            section = document.createElement('section');
            section.id = 'other-sources';
            section.className = 'iaft';
            section.style.display = 'both';
            $(section).append('<h1>Other Sources</h1>');
            filetype_ul = document.createElement('ul');
            $(section).append(filetype_ul);
            $(div).append(section);

            // Populate references
            this.checkDb(references_ul, identifier);

            return div;
        },

        //  See if the source is on db.etree.org
        checkDb: function(node, identifier) {
            server = 'http://www.archive.org/details/' + identifier;

            var identifier_slug = string_to_slug(identifier);

            // Add info IAFTLightbox icon
            li = $('<li class="archiveEntry_lightbox"></li>');
            $(li).data('identifier', identifier);
            $(li).append('<img height="48" align="top" src="http://db.etree.org/images/ico/info.png" border="0">');

            // If we are viewing details don't show
            uri = parseUri(document.location);
            if (uri.path.substr(9) != identifier) $(node).append(li);

            $.ajax({
                url: 'http://db.etree.org/rest/iaft.php?method=lookupIdentifier&archive_identifier=' + identifier,
                dataType: 'xml',
                crossDomain: true,
                success: function (data, textStatus, jqXHR) {

                    // Unwrap greasemonkey object
                    data = data.wrappedJSObject;
                    shninfo_key = $(data).find('shninfo_key').first().text();

                    // Hide references if there are none
                    if (!Number(shninfo_key)) $('section.iatf#references').hide();

                    // db returns other sources, if any, for the same date.  Add these to references
                    if (!$(data).find('db_sources').children().length && !$(data).find('ia_sources').children().length) {
                        $('div.' + identifier_slug + ' #other-sources').remove();
                    }


                    if (Number(shninfo_key) > 0) {
                        li = $('<li class="dbSource"></li>');
                        $(li).data('shninfo_key', shninfo_key);
                        $(li).append('<img align="top" height="48" src="http://db.etree.org/etreedb.png" '
                                       + 'title="db.etree.org shnid ' +  shninfo_key + '">');
                        $(li).append('<div class="iaft_filecount">' + shninfo_key + '</div>');
                        $(node).append(li);

                        // IA sources
                        $(data).find('ia_sources').children().each(function() {
                            li = $('<li class="archiveEntry"></li>');
                            $(li).data('identifier', $(this).find('archive_identifier').text());
                            $(li).append('<img height="48" align="top" title="' +
                                ($(this).find('comments').text().replace(/"/g,'&quot;')) +
                                '" src="http://db.etree.org/images/ico/info.png" border="0">');
                            $(li).append('<div class="iaft_filecount">' + $(this).find('shninfo_key').text() + '</div>');
                            //$(node).append(li);
                            $('div.' + identifier_slug + ' #other-sources').find('ul').append(li);
                        });

                        // db sources
                        $(data).find('db_sources').children().each(function() {
                            li = $('<li class="dbEntry"></li>');
                            $(li).data('shninfo_key', $(this).find('shninfo_key').text());
                            $(li).append('<img height="48" align="top" title="' +
                                ($(this).find('comments').text().replace(/"/g,'&quot;')) +
                                '" src="http://db.etree.org/etreedb.png" border="0">');
                            $(li).append('<div class="iaft_filecount">' + $(this).find('shninfo_key').text() + '</div>');
                            //$(node).append(li);
                            $('div.' + identifier_slug + ' #other-sources').find('ul').append(li);
                        });

                        // Check bt.etree.org
                        $.ajax({
                                url: 'http://db.etree.org/rest/iaft.php?method=getTorrentBySource&shninfo_key=' + shninfo_key,
                                dataType: 'xml',
                                crossDomain: true,
                                success: function (data, textStatus, jqXHR) {
                                    // Unwrap greasemonkey object
                                    data = data.wrappedJSObject;
                                    torrent_id = $(data).find('id').text();
                                    if (torrent_id > 0)
                                    {
                                        li = $('<li class="btTorrent"></li>');
                                        $(li).data('torrent_id', torrent_id);
                                        $(li).append('<img align="top" height="48" src="http://db.etree.org/images/bt.png" '
                                                       + 'title="bt.etree.org torrent id ' +  torrent_id + '">');
                                        $(li).append('<div class="iaft_filecount">' + $(data).find('peers').text() + '</div>');
                                        $(node).append(li);
                                    }
                                }
                            });

                        // Check Lossless Legs
                        $.ajax({
                            url: 'http://www.shnflac.net/rest/ll.php?method=iaftFetchSourceTorrent&source_key=' + shninfo_key,
                            dataType: 'xml',
                            crossDomain: true,
                            success: function (data, textStatus, jqXHR) {

                                data = data.wrappedJSObject;

                                torrent_id = $(data).find('id').text();
                                if (torrent_id)
                                {
                                    li = $('<li class="llTorrent"></li>');
                                    $(li).data('torrent_id', torrent_id);
                                    $(li).append('<img align="top" height="48" src="http://db.etree.org/images/ll.png" '
                                                   + 'title="www.shnflac.net torrent id ' +  torrent_id + '">');
                                    $(li).append('<div class="iaft_filecount">' + $(data).find('peers').text() + '</div>');
                                    $(node).append(li);
                                }
                            }
                        });

                    } else {
                        // Hide references if there are none
                        if (uri.path.substr(9) == identifier) $('section#references').hide();
                    }
                }
            });
        },

        // Get the archive xml from yahoo
        checkArchive: function(node, identifier) {

            var identifier_slug = string_to_slug(identifier);

            // Fetch archive xml url
            $.ajax({
                url: 'http://db.etree.org/rest/iaft.php?method=getIdentifierUrl&identifier=' + encodeURIComponent(identifier),
                datatype: 'xml',
                crossDomain: true,
                success: function(data, textStatus, jqXHR) {
                    IAFT.xmlUrl = $(data).find('response').text();

                    $.ajax({
                        url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27'
                             + encodeURIComponent(IAFT.xmlUrl) + '%27',
                        crossDomain: true,
                        dataType: 'xml',
                        success: function (data, textStatus, jqXHR) {
                            // Unwrap greasemonkey object
                            data = data.wrappedJSObject;

                            xml = data;

                            if (!$(data).find('metadata').length) {
                                $(node).find('button').html('Out of Order');
                                return false;
                            }

                            $(node).empty();
                            formats = new Array();

                            // Get a unique sorted list of file extensions
                            $(data).find('file').each(function(index, file) {
                                filename = $(file).attr('name').toLowerCase();
                                ext =

                                formats[formats.length] = /[^.]+$/.exec(filename);
                            });

                            // Get a unique list of formats
                            var o = {}, i, l = formats.length, r = [];
                            for(i=0; i<l;i+=1) o[formats[i]] = formats[i];
                            for(i in o) r.push(o[i]);
                            formats = r;
                            formats = formats.sort();

                            // Add all files
                            members = new Array();
                            ext = 'all';
                            $(data).find('file').each(function(index, file) {
                                members[members.length] = file; //$(file).attr('name');
                            });

                            src = 'http://db.etree.org/images/ico/filetype ' + ext + '.png';
                            li = document.createElement('li');
                            li.className = 'filetype';
                            $(li).data('identifier', identifier);
                            $(li).data('ext', ext);
                            $(li).data('files', members);
                            $(li).data('path', 'http://' + $(data).find('results results').attr('server') + $(data).find('results results').attr('dir'));
                            $(li).append('<img class="icon" onerror="handleIconError(this);  " align="top" src="'
                                           + src + '" alt="' + ext + '" height="48" title="'
                                           + ext + '" border="0">');
                            $(li).append('<div class="iaft_filecount">' + members.length + '</div>');
                            $(node).append(li);

                            // Gather all file names
                            for (type in formats) {
                                members = new Array();
                                ext = formats[type];
                                $(data).find('file').each(function(index, file) {
                                    filename = $(file).attr('name').toLowerCase();
                                    fext = /[^.]+$/.exec(filename);
                                    if ($.trim(fext) == $.trim(ext)) {
                                        members[members.length] = file;
                                    }
                                });

                                src = 'http://db.etree.org/images/ico/filetype ' + ext + '.png';
                                li = document.createElement('li');
                                li.className = 'filetype';
                                $(li).data('identifier', identifier);
                                $(li).data('ext', ext);
                                $(li).data('files', members);
                                $(li).data('path', 'http://' + $(data).find('results results').attr('server') + $(data).find('results results').attr('dir'));
                                $(li).append('<img class="icon" onerror="handleIconError(this);  " align="top" src="'
                                               + src + '" alt="' + ext + '" height="48" title="'
                                               + ext + '" border="0">');
                                $(li).append('<div class="iaft_filecount">' + members.length + '</div>');
                                $(node).append(li);
                            }

                            // Add the add to db link if no db link found and show exists
                            if (!$(node).parent().parent().find('li.dbSource').length) {

                                // Does the artist and show exist on db?
                                $.ajax({
                                    url: 'http://db.etree.org/rest/iaft.php',
                                    type: 'post',
                                    data: {
                                        method: 'doesShowExist',
                                        name: $(data).find('metadata creator').text(),
                                        date: $(data).find('metadata date').text()
                                    },
                                    success: function (data, textStatus, jqXHR) {
                                        section = document.createElement('section');
                                        section.id = 'actions';
                                        // Add identifier as class name
                                        $(section).addClass('iaft');
                                        $(section).addClass(identifier_slug);

                                        $(node).parent().parent().append(section);

                                        $(section).append('<h1>Actions</h1>');

                                        actions_ul = document.createElement('ul');
                                        $(section).append(actions_ul);

                                        li = $('<li class="addToDb"><img align="top" height="48" src="http://db.etree.org/images/etreedb_upload.png"></li>');
                                        $(li).data('identifier', identifier);
                                        $(actions_ul).append(li);

                                        $(xml).find('collection').each(function(index, node) {
                                            $('div.iaft.' + identifier_slug + ' section.iaft').addClass($(this).text());
                                        });
                                        $(xml).find('mediatype').each(function(index, node) {
                                            $('div.iaft.' + identifier_slug + ' section.iaft').addClass($(this).text());
                                        });
                                        $(xml).find('identifier').each(function(index, node) {
                                            $('div.iaft.' + identifier_slug + ' section.iaft').addClass(string_to_slug($(this).text()));
                                        });
                                    }
                                });
                            }
                            $(xml).find('collection').each(function(index, node) {
                                $('div.iaft.' + identifier_slug + ' section.iaft').addClass($(this).text());
                            });
                            $(xml).find('mediatype').each(function(index, node) {
                                $('div.iaft.' + identifier_slug + ' section.iaft').addClass($(this).text());
                            });
                            $(xml).find('identifier').each(function(index, node) {
                                $('div.iaft.' + identifier_slug + ' section.iaft').addClass(string_to_slug($(this).text()));
                            });
                        },
                        error: function() {
                            $(node).append('<li>Error fetching metadata.  This can happen (blame Yahoo!) '
                                           + 'if you make too many <br>requests in a row.  You may need to wait 10 minutes or longer before '
                                           + 'requests will work again.</li>');
                        }
                    });
                }
            });
        },

        /**
         * Show the add to db.etree.org form
         */
        shninfoForm: function(xml) {
            // Begin by building the form and dl
            form = document.createElement('form');
            $(form).addClass('iaft_form');
            dl = $('<dl></dl>');
            $(dl).addClass('iaft_form');
            var i = 0;

            // Add data about this xml for db use.
            $(form).data('identifier', $(xml).find('metadata identifier').text());
            $(form).data('path', 'http://' + $(xml).find('results results').attr('server')
                                 + $(xml).find('results results').attr('dir'));
            $(form).data('name', $(xml).find('metadata creator').text());
            $(form).data('date', $(xml).find('metadata date').text());

            $(xml).find('files file').each(function(index, node) {

                // Exclude file types we know we don't care about
                filename = $(node).attr('name').toLowerCase();
                ext = /[^.]+$/.exec(filename);

                switch (ext) {
                    case 'flac':
                    case 'shn':
                    case 'xml':
                    case 'mpg':
                    case 'mp3':
                    case 'mp4':
                    case 'ogv':
                    case 'm3u':
                    case 'conf':
                    case 'ogg':
                    case 'gif':
                    case 'jpg':
                    case 'jpeg':
                    case 'skt':
                    case 'zip':
                        return;
                        break;
                    default:
                        break;
                }
                if (ext == 'flac') return;
                if (ext == 'shn') return;
                if (ext == 'xml') return;
                if (ext == 'mpg') return;
                if (ext == 'mp3') return;
                if (ext == 'mp4') return;
                if (ext == 'ogv') return;
                if (ext == 'm3u') return;
                if (ext == 'conf') return;
                if (ext == 'ogg') return;
                if (ext == 'gif') return;
                if (ext == 'jpg') return;
                if (ext == 'jpeg') return;
                if (ext == 'skt') return;
                if (ext == 'zip') return;

                // Add each file
                i++;

                // Build radio arrays
                dt = $('<dt>Infodoc</dt>');
                radio1 = $('<input type="radio" class="dbfiles infodoc" name="files' + i + '">');
                $(radio1).data('filename', $(node).attr('name'));

                radio2 = $('<input type="radio" class="dbfiles checksum" name="files' + i + '">');
                $(radio2).data('filename', $(node).attr('name'));
                radio3 = $('<input type="radio" class="dbfiles ignore" CHECKED name="files' + i + '">');

                $(dt).append(radio1);
                $(dt).append('<br>Checksum ');
                $(dt).append(radio2);
                $(dt).append('<br>Ignore ');
                $(dt).append(radio3);
                $(dl).append(dt);

                path = $(form).data('path') + '/' + $(node).attr('name')
                $(dl).append('<dd><label for="files' + i + '"><a href="'
                             + path + '">' + $(node).attr('name') + '</a></label></dd>');
            });

            $(dl).append('<dt></dt>');
            $(dl).append('<dd><input type="submit" value="Upload to db"></dd>');

            $(form).append(dl);

            wrapper = $('<div></div>');
            $(wrapper).append('<img src="http://db.etree.org/images/etreedb_upload.png" align="left"><h1>Upload Source to db.etree.org</h1>'
                              + '<p>Select the file type for each file using the radio buttons.  db only wants infodoc files, the txt files with each distribution, '
                              + 'and checksum files.  Leave all other files as Ignore.</p>'
            );
            $(wrapper).append(form)

            this.Lightbox.show(wrapper);
        },

          /**
           * Convert number of bytes into human readable format
           *
           * @param integer bytes     Number of bytes to convert
           * @param integer precision Number of digits after the decimal separator
           * @return string
           */
          bytesToSize: function(bytes, precision)
          {
              var kilobyte = 1024;
              var megabyte = kilobyte * 1024;
              var gigabyte = megabyte * 1024;
              var terabyte = gigabyte * 1024;

              if ((bytes >= 0) && (bytes < kilobyte)) {
                  return bytes + ' B';

              } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
                  return (bytes / kilobyte).toFixed(precision) + ' KB';

              } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
                  return (bytes / megabyte).toFixed(precision) + ' MB';

              } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
                  return (bytes / gigabyte).toFixed(precision) + ' GB';

              } else if (bytes >= terabyte) {
                  return (bytes / terabyte).toFixed(precision) + ' TB';

              } else {
                  return bytes + ' B';
              }
          },


        randomString: function() {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            var string_length = 20;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }

            return randomstring;
        },

        /**
         * Show the lightbox with all files of the selected type
         */
        buildFileContent: function(li) {

            files = $(li).data('files');
            files.sort(function(a, b) {
                if ($(a).attr('name') == $(b).attr('name')) return 0;
                if ($(a).attr('name') > $(b).attr('name')) return 1;
                return -1;
            });

            path = $(li).data('path');
            ext = $(li).data('ext');
            identifier = $(li).data('identifier');
            var content = 'Internet Archive File Types for directory <a href="' + path + '">' + path + '</a>'
                          + '<ul class="IAFTfilelist">';
            for (i in files) {
                file = $(files[i]);
                ext = file.attr('name').split('.').pop();
                content += '<li><img width="32" title="' + ext + '" onerror="handleSmallIconError(this);" src="http://db.etree.org/images/ico/filetype ' + ext + '.png">'
                         + '<a class="file" href="' + path + '/' + file.attr('name') + '">' + file.attr('name') + '</a>'
                         + '<table width="100%"><tr>';
                content += '<td width="10%"><b>Size:</b> ';
                if (file.find('size').text()) content += this.bytesToSize(file.find('size').text());
                content += '</td><td width="40%"><b>Last Update:</b> ';
                if (file.find('mtime').text()) {
                    date = new Date(file.find('mtime').text() * 1000);
                    content += date.toString();
                }
                content += '</td><td width="40%"><b>MD5:</b> ';
                if (file.find('md5').text()) content += file.find('md5').text();
                rand = this.randomString();
                content += '</td><td width="10%" align="right"><a class="more" href="#" id="' + rand + '">Details</a> ';
                content += '</td></tr>';

                content  += '<tr id="' + rand + '_tr" class="more"><td>';

                    $(file).children().each (function(index, node) {
                        content += '<b>' + node.nodeName + ':</b>  ' + $(node).text() + '<BR>';
                    });

                content += '</td></tr>'
                         + '</table>'
                         + '</li>';
            }
            content += '</ul>';

            if (ext == 'mp3') {
                content += '<div><a href="/download/' + identifier + '/' + identifier + '_vbr.m3u">Stream All MP3s</a></div>';
            }

            // Build FlashGot promo
            content += '<br><b>Thanks for installing IAFT.  I recommend you also install '
                + '<a href="http://flashgot.net/">FlashGot</a>.  Using FlashGot you can select all these files '
                + 'as though you were copying the text, right click, and start a download for all selected links '
                + 'using the browsers download manager or an external one.</b>';

            return content;
        },

        Lightbox: {
            init: function() {
                /**
                 * Add the lightbox
                 */
                $('body').append('<a class="closeButton" /><div id="light" class="IAFTLightboxBody">'
                                 + ''
                                 + '<span class="content">This is the IAFTLightbox content. </span></div>');

                $('body').append('<div id="fade" class="IAFTLightboxMask"></div>');

               /**
                * Move the IAFTLightbox on resize
                */
               $(window).resize(function(node) {
                    // Center the centering div
                    $('.IAFTLightboxBody').css('left', (($(window).width() - $('.IAFTLightboxBody').width()) / 2));
                    $('.IAFTLightboxMask').css('height', $(window.document).height());

                    // Center vertically
                    var minTop = 30;
                    var top = (($(window).height()  - $('.IAFTLightboxBody').height()) / 2);
                    if (top < minTop) top = minTop;
                    top += $(document).scrollTop();
                    $('.IAFTLightboxBody').css('top', top);


                    var width = (($(window).width()  - $('.IAFTLightboxBody').width()) / 2);

                    offset = $('.IAFTLightboxBody').offset();
                    var width = $('.IAFTLightboxBody').width(); // + $('.IAFTLightboxBody').left();

                    $('.closeButton').css('top', offset.top - 10);
                    $('.closeButton').css('left', offset.left -10);

                    $('.closeButton').show();

                });

                // Close the IAFTLightbox
                $('.closeButton').live('click', function(event) {
                    IAFT.Lightbox.close();
                });
            },

            show: function(content) {
                this.empty();

                $('#light .content').append(content);
                var copy = '<p class="copy iaft_about">'
                           + '&copy ' + new Date().getFullYear() + ' <a href="#" class="iaft_about">Internet Archive File Types</a></p>';

                $('#light .content').append(copy);

                // Bind esc to close IAFT.Lightbox
                $(document).bind('keypress', function(event) {
                    if (event.keyCode == 27) {
                        $('.closeButton').click();
                    }
                });

                $('#light').show();
                $('#fade').show();
                $(window).resize();
            },

            empty: function() {
                $('#light .content').empty();
            },

            close: function() {
                $(document).unbind('keypress', false);
                $('#light').hide();
                $('#fade').hide();
                $('.closeButton').hide();

            }
        }
    }

    // Live event definitions

    // Show file details
    $('section.iaft ul li.filetype').live('click', function(event) {
        IAFT.Lightbox.show(IAFT.buildFileContent(this));
    });

    // Show file detail details
    $('ul.IAFTfilelist a.more').live('click', function(event) {
        $('#' + $(this).attr('id') + '_tr').toggle();
        return false;
    });


    // Show details for all IAFT blocks
    $('.showAllFiletypes').live('click', function(event) {
        $(this).attr('disabled', 'disabled');
        $('.showFiletypes').each(function(index, node){
            $(this).click();
        });
    });

    // Get the details from archive.org
    $('.showFiletypes').live('click', function(event) {
        $(this).find('button').html('Load ing');
        IAFT.checkArchive($(this).parent(), $(this).data('identifier'));
    });

    // Show the add to db form
    $('.addToDb').live('click', function(event) {
        li = this;

         $.ajax({
            url: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%27'
                 + encodeURIComponent(IAFT.xmlUrl) + '%27',
            crossDomain: true,
            dataType: 'xml',
            success: function (data, textStatus, jqXHR) {
                // Unwrap greasemonkey object
                data = data.wrappedJSObject;

                if (!$(data).find('metadata').length) {
                    alert("Unable to fetch data from IA.  This is likely due to invalid syntax in their xml. "
                          + "If you can click the I and the entry comes up ok it's probably not their xml. "
                          + "There are other causes such as an old version of Firefox or "
                          + "another Firefox plugin blocking cross scripting "
                          + "(which can been seen as an attack or the future of internet services such as IAFT)."
                    );

                    $(li).parent().parent().parent().find('section#actions').remove();
                    return false;
                }

                IAFT.shninfoForm(data);
            }
        });
    });

    // Show a db source detail
    $('.dbSource').live('click', function(event) {
        shninfo_key = $(this).data('shninfo_key');
        IAFT.Lightbox.show($('<iframe style="border: none;" width="100%" height="100%" src="http://db.etree.org/shn/' + shninfo_key + '"></iframe>'));
    });

    // Show a bt torrent detail
    $('.btTorrent').live('click', function(event) {
        torrent_id = $(this).data('torrent_id');
        IAFT.Lightbox.show($('<iframe style="border: none;" width="100%" height="100%" src="http://bt.etree.org/details.php?id=' + torrent_id + '"></iframe>'));
    });

    // Show a shnflac torrent detail
    $('.llTorrent').live('click', function(event) {
        torrent_id = $(this).data('torrent_id');
        IAFT.Lightbox.show($('<iframe style="border: none;" width="100%" height="100%" src="http://www.shnflac.net/details.php?id=' + torrent_id + '"></iframe>'));
    });

    // Show an archive entry detail (in a light box)
    $('.archiveEntry_lightbox').live('click', function(event) {
        identifier = $(this).data('identifier');
        IAFT.Lightbox.show($('<iframe style="border: none;" width="100%" height="100%" src="http://www.archive.org/details/' + identifier + '"></iframe>'));
    });

    // Show an archive entry detail (in a light box)
    $('.archiveEntry').live('click', function(event) {
        identifier = $(this).data('identifier');
        window.location = "http://www.archive.org/details/" + identifier;
    });

    // Show an archive entry detail (in a light box)
    $('.dbEntry').live('click', function(event) {
        shninfo_key = $(this).data('shninfo_key');
        IAFT.Lightbox.show($('<iframe style="border: none;" width="100%" height="100%" src="http://db.etree.org/shn/' + shninfo_key + '"></iframe>'));
    });

    // Show the reviews
    $('a#show-reviews').live('click', function() {
        $('p.review').show();
        $(this).hide();
        return false;
    });

    // Show the about screen
    $('.iaft_about').live('click', function(event) {
        IAFT.Lightbox.close();
        IAFT.Lightbox.show(' \
        <div><h1><img src="http://db.etree.org/images/ico/filetype arc.png" align="left"> Internet Archive File Types</h1> \
        \
            <p> \
                The home page for IAFT is <a href="http://userscripts.org/scripts/show/107166">http://userscripts.org/scripts/show/107166</a> \
                <br> \
                There is a changelog there if you\'d like to see what\'s new in each version. \
            </p> \
            <p> \
                IAFT is open sourced under the <a href="http://www.gnu.org/copyleft/gpl.html">GNU General Public License</a>. \
                \
                IAFT is able to work it\'s magic by leveraging <a href="http://developer.yahoo.com/yql/">YQL</a> and  \
                <a href="http://en.wikipedia.org/wiki/Cross-site_scripting">cross-site scripting</a>. \
            </p> \
            <p> \
                The icons used are from and based on the <i><a href="http://goo.gl/0QkHG">kearone\'s Icons goes Apple "Filetypes"</a></i> library. \
                To contribute icons please use this library and email your contribution to <a href="mailto:tom.h.anderson@gmail.com">tom.h.anderson@gmail.com</a>. \
            </p> \
            <p> \
               IAFT is a project of Tom Anderson.  \
               <br> \
               Produced by <a href="http://db.etree.org/">db.etree.org</a>.  \
           </p> \
        </div> \
        ');
    });


    /**
     * Submit code to db.etree.org
     * @references actions.submit.to.db
     */
    $('form.iaft_form').live('submit', function(event) {

        if ($('input.infodoc:checked').length != 1) {
            alert('You must have only have one file selected as the infodoc.');
            return false;
        }

        if (!$('input.checksum:checked').length) {
            alert('You must select at least one checksum to submit this source.  If this source does not have any checksums it is not'
                  + ' submitable to db.etree.org.');
            return false;
        }

        infodoc = $('input.infodoc:checked').first();

        var checksums = new Array();
        $('input.checksum:checked').each(function(index, node) {
            checksums[checksums.length] = $(this).data('filename');
        });

        form = this;

        // Disable the submit button on submit
        $('input[type=submit]', this).attr('disabled', 'disabled');

        $.ajax({
            type: 'post',
            url: 'http://db.etree.org/rest/iaft.php',
            data: {
                method: 'importArchiveSource',
                infodoc: $(infodoc).data('filename'),
                identifier: $(form).data('identifier'),
                path: $(form).data('path'),
                name: $(form).data('name'),
                date: $(form).data('date'),
                checksums: checksums
            },
            success: function(data, textStatus, jxQHR) {
                // Unwrap greasemonkey object
                data = data.wrappedJSObject;
                error = $(data).find('error').text();
                if (error) {
                    alert(error);
                }

                shninfo_key = $(data).find('response').text();
                if (!shninfo_key && !error) {
                    alert('An unknown error occured.  We may be unable to reach db or something else went wrong.');
                }

                $('.closeButton').click();
                IAFT.rebuildSection($(form).data('identifier'));
            },
            error: function() {
                alert("There was a problem submitting this source information.  Please try again another time.");
                $('.closeButton').click();
                IAFT.rebuildSection($(form).data('identifier'));
            }
        });

        return false;
    });

    /**
     * Resize the lightbox when the window is resized
     */
    $(window).resize(function(node) {

        // Set left margin for movie modal if window is resized, is larger than document window
        var documentWidth = $(window).width();

        $('div.light').css('height', $(window.document).height());

        // Center movie vertically
        var minTop = 30;
        var top = (($(window).height()  - $('div.light').height()) / 2);
        if (top < minTop) top = minTop;
        top += $(document).scrollTop();
        $('div.light').css('top', top);
    });


    /**
     * Begin code to build IAFT
     * main script
     */
    IAFT.Lightbox.init();

    // Determine if we are on a details or search page
    if ($('a.titleLink').length) {
        // Search Page

        // Clear all search terms
        $('.searchTerm').removeClass('searchTerm');

        $('a.titleLink').each(function(index, node) {
            IAFT.buildSections(node);
        });

        $('#begPgSpcr').append('<button class="showAllFiletypes">Show All Filetypes</button>');
        $('td.thumbCell').empty();
    } else {
        // Details Page

        document.documentElement.addEventListener('DOMAttrModified', function(e){
          if (e.attrName === 'style') {
            if ($(e.explicitOriginalTarget).attr('id')  == 'mwplayer_displayarea') {
                // Fix sectoin widths
                $('div#col1').css('margin-left', '0px');
                $('div#midcol').removeAttr('style');
                $('div#col1').css('width', $(e.explicitOriginalTarget).css('width'));
                $('div#col1').width($('div#col1').width() + 33);

                $('div#midcol').css('margin-left', $('div#col1').width() - 5);
            }
          }
        }, false);

        // Find identifier
        uri = parseUri(document.location);
        identifier = uri.path.substr(9);

        // Make room for IAFT
        $('.breadcrumbs').after('<BR style="clear:both;">');
        $('.breadcrumbs').addClass('IAFTbreadcrumbs');

        // Move AV player
        if ($('#avplaycontainer').length) {
            $('#avplaycontainer').detach().insertAfter('div#col1 div.box h1:first');
        }

        // Reformat reviews
        $('<div id="reviews" class="box"><h1>Reviews</h1></div>').appendTo('div#midcol');
        reviewHeader = $('h2[style="font-size:125%;"]').detach().appendTo('#reviews').css('font-size', '1em');
        reviewWrite = $(reviewHeader).find('.rightmost').detach();
        reviewStars = $(reviewHeader).find('span:last').detach().css('font-size', '1em');
        $(reviewHeader).html(reviewStars);

        $(reviewWrite).html('<a href="/write-review.php?identifier=' + identifier + '">Write a review</a>');
        $(reviewHeader).append($(reviewWrite));

        // Reformat individual reviews
        $('p[style="margin:3px; padding:4px; border:1px solid #ccc;"]').addClass('review')
            .detach()
            .appendTo('#reviews')
            .hide()
            .first()
            .before('<a href="#" id="show-reviews">Reviews are hidden.  Show Reviews</a>');

        // Fix the ia footer
        $('div#iafootdiv').detach().insertAfter('div#midcol');
        $('p#iafoot').detach().appendTo('div#iafootdiv');

        // Change details box header
        $('span.x-archive-meta-title').parent().html('Details');

        // Change streaming box header
        $('div#col1 div.box h1:first').html('Stream');

        // Remove crap
        $('div#map').remove();
        $('div#midcol div.box div p.content:first').remove();
        $('p#iframeVidso').remove();
        $('img#thumbnail').parent().remove();
        $('#begPgSpcr').remove();

        // Run IAFT sections
        $('.breadcrumbs').each(function(index, node) {
            div = IAFT.buildSections(node, identifier, this, 'after');
            $(div).addClass('iaftDetails');
            $(div).find('li.showFiletypes').click();
        });

    }
}
