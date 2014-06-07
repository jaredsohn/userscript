// ==UserScript==
// @name           solid steel radio tracklist converter
// @version        2010-01-25 #8
// @author         tmb_oti
// @namespace      http://userscripts.org/users/127372
// @include        http://www.ninjatune.net/solidsteel/*
// ==/UserScript==

var Tracklist = function()
{
    // Helpers
    window.defined = function(what) { return typeof(what) != 'undefined'; }

    window.trim = function(str)
    {
        return htmldecode(decodeURIComponent(str)).replace(/^(\s)+/,'').replace(/(\s)+$/,'');
    }

    window.htmldecode = function(str)
    {
        htmldecode.decoder.innerHTML = str;
        return htmldecode.decoder.value;
    }

    htmldecode.decoder = document.createElement('textarea');

    window.map = function(array, fn)
    {
        var mapped = [ ];
        for (var i=0; i < array.length; i++)
        {
            var ret = fn ? fn(array[i],i) : array[i];
            defined(ret) && mapped.push(ret);
        }
        return mapped;
    }

    // The tracklist converter
    window.Tracklist = function()
    {
        var self     = this;
        this.parts   = [ ];

        // Get performing artist information and air date
        this.artists = this.getArtists();
        this.date    = this.getDate();

        // Get tracklist information for each part
        map($$('div.column_middle div.entry_releases'), function(part)
        {
            // Sanitize DOM structure
            part.cleanWhitespace();
            // Create a new tracklist part hash with title
            self.currentPart = { title : trim(part.firstChild.innerHTML), tracks : [ ] };

            map(part.select('tr'), function(row,i)
            {
                // Skip header
                if (!i) { return; }
                // Get artist, title and label information from table cells
                var info = map(row.childElements(), function(cell,i) { return i==0 || i==2 || i==4 ? trim(cell.innerHTML) : undefined });
                // Store new track information
                self.currentPart.tracks.push({ artist : info[0], title : info[1], label : info[2] });
            });
            // Store part including the track infos
            self.parts.push(self.currentPart);
        });

        // Generate output
        this.output('plain');
    }

    Tracklist.prototype.output = function(mode)
    {
        // Create the output string, add BBCode information in BBCode mode, default to plain text
        mode = mode || 'plain';

        // Create header with air date and artists
        var artists = mode == 'bbcode' ? '[b]'+this.artists+'[/b]' : this.artists;
        var output  = 'SOLID STEEL RADIO - ' + this.date + '<br/>' + artists + '<br/>';

        // Create elements for each show part
        map(this.parts, function(part)
        {
            // Create part header
            var title = mode=='bbcode' ? '[b]'+part.title+'[/b]' : part.title;
            output  += '<br/>' + title + '<br/><br/>';

            // Create track elements
            map(part.tracks, function(track)
            {
                var artist  = track.artist                     || '';
                var title   = track.title                      || '';
                var label   = track.label ? '['+track.label+']' : '';
                var spacer  = artist && title ? ' - '           : '';
                var spacer2 = label ? ' '                       : '';

                var youtube_url = 'http://www.youtube.com/results?search_query=' + encodeURIComponent(artist + spacer + title);

                if (mode == 'plain')
                {
                    output += '<a class="tracklink" href="' + youtube_url + '" target="_blank">' + artist + spacer + title + '</a>' + spacer2 + label +'<br/>';
                }
                else if (mode =='bbcode')
                {
                    output += '[url='+youtube_url+']' + artist + spacer + title + '[/url]' + spacer2 + label + '<br/>';
                }
            });
        });

        // Create tracklist stylesheet
        var head = document.getElementsByTagName('head')[0];
        head.innerHTML =
        [
            '<style type="text/css">',
                'a.tracklink { color: black; text-decoration : none; }',
                'a.tracklink:hover { text-decoration : underline; }',
            '</style>'
        ].join('');

        // Create mode switchers and tracklist
        document.body.innerHTML =
        [
            '<pre>',
                '<a href="javascript:tracklist.bbcode()">BBCode</a>&nbsp;',
                '<a href="javascript:tracklist.plain()">Plain text</a>&nbsp;',
                '<a href="javascript:tracklist.original()">Original site</a>',
                '<br/><br/>',output,
            '</pre>'
        ].join('');
    }

    // Get performing artists information
    Tracklist.prototype.getArtists = function() { return trim(($$('.column_middle div.entry h4')[0].innerHTML)); }

    // Get air date information
    Tracklist.prototype.getDate= function() { return trim($$('div.column_middle h2 font')[0].innerHTML).replace(/[^0-9\/]/g,''); }

    // Switch to BBCode mode
    Tracklist.prototype.bbcode = function() { this.output('bbcode'); }

    // Switch to plain text mode
    Tracklist.prototype.plain = function() { this.output('plain'); }

    // Reload original page
    Tracklist.prototype.original = function() { window.location.reload(); }

    // Create converter button

    // Inject converter button stylesheet
    var head       = document.getElementsByTagName('head')[0];
    head.innerHTML = head.innerHTML + '<style type="text/css">#tracklist_button { position: fixed; top: 5px; right: 5px; padding: 5px; background-color: black; border: 1px solid silver; cursor : pointer; } #tracklist_button:hover { background-color: silver; color : black; }</style>';

    // Inject converter button
    var button       = document.createElement('div');
    button.innerHTML = 'Convert tracklist';
    button.id        = 'tracklist_button';
    button.onclick   = function() { window.tracklist = new Tracklist(); };
    
    document.body.appendChild(button);
}

document.body.appendChild(document.createElement('script')).innerHTML = '('+Tracklist+')();';
