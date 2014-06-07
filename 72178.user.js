// ==UserScript==
// @name           protonFlattener
// @namespace      http://userscripts.org/users/127372
// @description    flatten proton radio tracklists
// @include        http://www.protonradio.com/show.php*
// @version        2010-03-23
// ==/UserScript==

window.script = function (url)
{
    document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src = url;
}

script('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');

var ProtonRadioTracklistFlattener = function()
{
    /* Helpers */
    String.prototype.trim = function()
    {
        return this.replace(/\n|\r|(^\s+)|(\s+$)/g,'').replace(/\s+/g,' ');
    }

    window._ = function(tagname)
    {
        return document.createElement(tagname);
    }

    /* Tracklist flattener */

    window.Tracklist = function()
    {
        this.show = null;
        this.buildButton();
    }

    Tracklist.prototype.buildButton = function()
    {
        var self = this;

        document.getElementsByTagName('head')[0].innerHTML +=
        ['<style type="text/css">',
            '#tracklist-button { position: fixed; top: 5px; right: 5px; padding: 5px; background-color: white; border: 1px solid silver; color : black; }',
            '#tracklist-button:hover { background-color: beige; cursor : pointer; }',
         '</style>'].join('');

        $(document.body).append($(_('div')).attr('id','tracklist-button').html('Convert tracklist')
        .one('click',function()
        {
            $(this).html('Please wait...');
            setTimeout(function() { self.parsePage(); self.plain(); },0);
        }).context);
    }

    /* Methods to distinguish tracklist parts */

    Tracklist.prototype.is_tracklist_info = function(node)
    {
        return !!($(node).find('.tagged_btn, [class*="tag_it_btn"]').length);
    }

    Tracklist.prototype.is_tracklist_spacer = function(node)
    {
        return !!($(node).find('img').length);
    }

    /* Parse the web page */

    Tracklist.prototype.parsePage = function()
    {
        var self = this;
        if (!this.findBoxes()) { alert('Error parsing page!'); return null; }

        var show =
        {
            title     : $.trim($('title').html()),
            info      : $(this.boxes.show_info).text().trim().replace(/\(read more\)/g,''),
            tracklist : [ ]
        };

        $(this.boxes.tracklist).children('table').each(function()
        {
            if (self.is_tracklist_info(this))
            {
                show.tracklist.push({ info : $(this).find('b').text().trim() });
                $(this).find('.tagged_btn').length && show.tracklist.push({ genre : $(this).find('.tagged_btn').text().trim() });
            }
            else if (!self.is_tracklist_spacer(this))
            {
                $(this).find('> tbody > tr').each(function(i,row)
                {
                    show.tracklist.push({ track : $(this).text().trim() });
                });
            }
        });
        this.show = show;
        return show;
    }

    /* Find relevant dom nodes */

    Tracklist.prototype.findBoxes = function()
    {
        var boxes = { };

        $('td.content-cell').each(function()
        {
            if ($(this).find('[class*="tag_it_btn"], .tagged_btn').length)
            {
               boxes.tracklist = this;
            }
            else if ($(this).find('span.header'))
            {
                boxes.show_info = this;
            }
        });

        this.boxes = boxes;
        return !!boxes.tracklist && !!boxes.show_info;
    }

    /* Output plain text tracklist */

    Tracklist.prototype.plain = function()
    {
        var flags = { in_info : false };
        $('head').html('<style type="text/css">body { font-family: monospace; }</style>');

        var text = '<p class="show-title">[b]'+this.show.title + '[/b]</p>';
        text += '<p class="show-info">' + this.show.info + '</p>';
        $.each(this.show.tracklist, function()
        {
            if (this.info)
            {
                flags.in_info = true;
                text += '<p class="tracklist-info">[b]' + this.info +'[/b]';
            }
            else if (this.genre)
            {
                text += ' [' + this.genre + "]</p>";
                flags.in_info = false;
            }
            else if (this.track)
            {
                if (flags.in_info) { text += '</p>'; }
                flags.in_info = false;
                text += '<div class="track">' + this.track + '</div>';
            }
        });

        $('body').attr('style','').html(text);
    }

    /* Go */

    new Tracklist();
}

/* Delay script execution until jquery is available */

function wait_for_jquery()
{
    if (!unsafeWindow.jQuery) { setTimeout(function() { wait_for_jquery(); }, 500); return; }
    document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).innerHTML = '('+ProtonRadioTracklistFlattener+')();';
}

wait_for_jquery();