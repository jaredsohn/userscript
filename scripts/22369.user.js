//
//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
//                    Version 2, December 2004 
//
// Copyright (C) 2004 Sam Hocevar 
//  14 rue de Plaisance, 75014 Paris, France 
// Everyone is permitted to copy and distribute verbatim or modified 
// copies of this license document, and changing it is allowed as long 
// as the name is changed. 
//
//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
//   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 
//
//  0. You just DO WHAT THE FUCK YOU WANT TO.
//
//
// Please see http://userscripts.org/scripts/show/22369 for changelogs and other info.
//
// ==UserScript==
// @name           WaffleBrainz
// @author         Wizzcat @ Waffles and What
// @namespace      http://userscripts.org/users/44680
// @description    Creates album descriptions out of thin air, *poof*!
// @include        *waffles.fm/upload.php
// @include        *waffles.fm/edit.php*
// @include        *what.cd/upload.php
// @include        *what.cd/edit.php*
// @version        0.50
// @date           2008-02-06
// ==/UserScript==
//



var waffleBrainz = function()
{
    var self = this;
    var artists = {};
    var albums = {};
    var currentArtist;
    var currentAlbum;
    var textfield;
    var artistfield;
    var albumfield;
    var datefield;
    var xhr;
    var fieldActivity = 0;
    var url = new String(window.location).match('waffles.fm') ? 'forums.php?action=viewtopic&topicid=358' : 'forums.php?action=viewtopic&topicid=2508';
    var urlText = ['Because making descriptions is [b]boring[/b]!',
                'It\'s good for you!',
                'Now with a hint of cinnamon!',
                'Look behind you, a Three-Headed Monkey!',
                'Just install it damnit!',
                'Endorsed by nine out of ten uploaders!',
                'Wait, what?',
                'BRAAAAAAAAAAAAAAAAAAINZ!',
                'You know you want to!',
                'Making the internet a safer place for the children.',
                'Changing the world, one torrent at a time.',
                'Join the war on lousy descriptions!'];
    var albumTypes = {'Compilation': 'Comp',
                    'Live': 'Live',
                    'EP': 'EP',
                    'Single': 'Single'};
    var win = window.opera ? window : unsafeWindow;; // fu gm

    if(typeof(GM_xmlhttpRequest) != 'undefined')
    {
        xhr = function(url, callback)
        {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://musicbrainz.org/ws/1/' + url,
                onload: function(result){
                    // Check if we found anything
                    if(result.status != 200)
                    {
                        throwError();
                    }
                    else
                    {
                        callback(result.responseText);
                    }
                },
                onerror: throwError
            });
        }
    }
    else
    {
        self.requestCallback = [null];
        
        xhr = function(params, callback) {
            var index = requestCallback.length;
            requestCallback[index] = callback;
            
            var remoteScript=document.createElement('script');
            remoteScript.id = 'rs' + index;
            remoteScript.setAttribute('type','text/javascript');
            remoteScript.setAttribute('src','http://folk.ntnu.no/peroyvo/brainz.php?params=' + escape(params) + '&index=' + index);
            var hd=document.getElementsByTagName('head')[0];
            
            hd.appendChild(remoteScript);
        }
    }

    // Hook for what.cd which opens wafflebrainz whenever a music album is selected
    if(win.ajax_handleResponse)
    {
        var oldResponse = win.ajax_handleResponse;
        win.ajax_handleResponse = function() {
            oldResponse();
            if(win.ajax_http.readyState == 4)
            {
                if(win.ajax_http.responseText.match(/artist/))
                {
                    if(document.getElementById('brainz'))
                    {
                        document.getElementById('brainz').style.display =  'table-row';
                    }
                    else
                    {
                        openBrainz();
                    }
                }
                else if(document.getElementById('brainz'))
                {
                    document.getElementById('brainz').style.display =  'none';
                }
            }
        }
    }
    else
    {
        openBrainz();
    }
    
    this.importer = function(index, data)
    {
        var rs = document.getElementById('rs' + index);
        rs.parentNode.removeChild(rs);
        
        requestCallback[index](data);
    }
    
    function openBrainz()
    {
        var info = document.getElementById('info') || document.getElementById('uploadInner');
        
        textfield = document.getElementsByTagName('textarea')[0];
        artistfield = info.getElementsByTagName('input')[0];
        albumfield = info.getElementsByTagName('input')[1];
        datefield = info.getElementsByTagName('input')[2];
        
        var node = document.createElement('tr');
        node.id = 'brainz';
        node.appendChild(document.createElement('td'));
        node.lastChild.className = 'heading';
        node.lastChild.appendChild(document.createTextNode('WaffleBrainz'));
        node.lastChild.style.textAlign = 'right';
        
        var footer = getSetting('footer') ? ' checked="checked" ' : '';
        var replace = getSetting('replace') ? ' checked="checked" ' : '';

        var td = document.createElement('td');
        td.style.padding = '10px';
        td.style.overflow = 'auto';
        td.innerHTML = ['<style type="text/css">#brainzSettings input { margin: 0 20px 0 3px;} #brainz {text-align: left;}</style>',
                        '<img src="http://i28.tinypic.com/j6h1tt.png" alt="WaffleBrainz" id="brainzCover" style="border: 1px solid #b7ae94; float: left; width: 100px; height: 100px; padding: 0; margin-right: 10px;" />',  
                        '<div id="brainzInput"><select type="text" id="artistSelect" disabled="disabled" style="width: 100px;"></select>',
                        '<select type="text" id="albumSelect" disabled="disabled" style="margin-left: 5px; width: 33%;"></select>',
                        '<button type="button" id="brainSearch" style="margin-left: 5px;">Search</button>',
                        '<div style="color: red; font-weight: bold;">Always check that the tracklist matches your upload!</div></div>',
                        '<div style="font-weight: bold; margin-top: 20px;">Settings:</div>',
                        '<a href="http://musicbrainz.org"><img src="http://i26.tinypic.com/16b0m8j.png" alt="MusicBrainz" style="float: right; border: 0;" /></a></div>',
                        '<div id="brainzSettings">Include footer<input type="checkbox" id="WBfooter" ' + footer + 'onchange="waffleBrainz.saveSetting(this)"></input>',
                        'Replace text<input type="checkbox" id="WBreplace" ' + replace+ 'onchange="waffleBrainz.saveSetting(this)"></input>'].join('');
        node.appendChild(td);

        
        info = info.parentNode.parentNode;
        info.parentNode.insertBefore(node, info.nextSibling);
        
        document.getElementById('brainSearch').addEventListener('click', buttonClicked, false);
        document.getElementById('artistSelect').addEventListener('change', function(e){
            showArtist(e.target.value);
        }, false);
        document.getElementById('albumSelect').addEventListener('change', function(e){
            showAlbum(e.target.value);
        }, false);
    }
    
    function buttonClicked()
    {
        disabled(true);
        currentArtist = trimW(artistfield.value.toLowerCase());
        currentAlbum = trimW(albumfield.value.toLowerCase());
        
        if(currentArtist != '')
        {
            searchArtist();
            return;
        }
        else if(currentAlbum != '')
        {
            searchAlbum();
            return;
        }
        else
        {
            var field = info.parentNode.parentNode.parentNode.getElementsByTagName('input')[0];
            if(field.type == 'file')
            {
                var val = field.value;
                
                if(val != '' && val.match(/.*\.torrent/))
                {
                    val = val.match(/(.*)\.torrent/)[1];
                    if(val.match(' - '))
                    {
                        currentArtist = val.split(' - ', 1);
                        searchArtist();
                    }
                    else if(val.match('-'))
                    {
                        currentArtist = val.split('-', 1);
                        searchArtist();
                    }
                    else
                    {
                        currentArtist = val;
                        searchArtist();
                    }
                    return;
                }
                else
                {
                    throwError('Nothing to search for.')
                }
            }
        }
        // TODO: else throw error   
    }
    
    function fetchAlbum(id)
    {
        xhr('release/' + id + '?type=xml&inc=tracks+release-events+labels+artist', processAlbum);
    }
    function fetchMultiAlbum(id)
    {
        var counter = 0;
        var target = albums[id].multi.length;
        if(target == 0)
        {
            // Shouldn't really happen, but it does in some rare cases where only one disc is returned
            return fetchAlbum(id);
        }
        for(var i=0, album; album = albums[albums[id].multi[i]]; i++)
        {
            xhr('release/' + album.id + '?type=xml&inc=tracks+release-events+labels+artist', function(data) {
                processAlbum(data, true);
                counter++;
                
                if(counter == target) fetchAlbum(id);
            });
        }
    }
    function fetchArtist(id)
    {
        xhr('artist/' + id + '?type=xml&inc=sa-Official', processArtist);
    }
    function searchArtist()
    {
        if(currentArtist == 'various artists') return throwError('Sorry, you can\'t search for various artists.');
        xhr('artist/?type=xml&name=' + escape(currentArtist), processArtistSearch);
    }
    function searchAlbum()
    {
        xhr('release/?type=xml&releasetypes=Official&limit=75&title=' + escape(currentAlbum), processAlbumSearch);
    }    
    function processArtistSearch(data)
    {
        if(!data.match(/artist/))
        {
            return throwError('No artist found.');
        }
        data = data.replace(/&amp;/g, '&');
        data = data.replace(/&quot;/g, '"');
        
        var string = new Array();
        var expression = /\<artist(.*?)\<\/artist\>/g;
        var release;
        while(release = expression.exec(data))
        {
            var name = release[1].match(/\<name\>(.*?)\<\/name\>/)[1];
            var id = release[1].match(/id="(.*?)"/)[1];
            var disam = release[1].match(/\<disambiguation\>(.*?)\<\/disambiguation\>/);
            disam = disam ? ' (' + disam[1] + ')' : '';
            
            artists[id] = {name: name};
            string.push('<option value="' + id + '">' + name + disam + '</option>');
        }
        
        var select = document.getElementById('artistSelect');
        select.innerHTML = string.join('');
        select.selectedIndex = 0;
        
        fieldActivity = 2;
        showArtist(select.value);
    }
    function processArtist(data)
    {
        data = data.replace(/&amp;/g, '&');
        data = data.replace(/&quot;/g, '"');
        
        var types = new Object();
        var expression = /\<release(.*?)\<\/release\>/g;
        var release;
        var multidisc = new Object();
        while(release = expression.exec(data))
        {
            var type = release[1].match(/type="(.*?) /)[1];
            var title = release[1].match(/\<title\>(.*?)\<\/title\>/)[1];

            var id = release[1].match(/id="(.*?)"/)[1];

            albums[id] = {title: title, id: id, type: type, artist: artists[currentArtist].name};
            
            var multi = title.match(/(.*?)\(disc ([0-9]).*?\)/);
            if(multi)
            {
                if(!multidisc[multi[1]])
                {
                    multidisc[multi[1]] = id;
                    albums[id].multi = new Array();
                    if(!types[type]) types[type] = new Array();
                    types[type].push(id);
                }
                else
                {
                    albums[multidisc[multi[1]]].multi.push(id);
                }
            }
            else
            {
                if(!types[type]) types[type] = new Array();
                types[type].push(id);                
            }
        }
        
        for(var i in types)
        {
            types[i] = types[i].sort(function(x, y) {
                if(albums[x].title < albums[y].title) return -1;
                else if (albums[x].title > albums[y].title) return 1;
                else return 0;
            });
        }
        
        artists[currentArtist].types = types;
        showArtist(currentArtist);
    }
    function processAlbumSearch(data)
    {
        if(!data.match(/artist/))
        {
            return throwError('No album found.');
        }
        data = data.replace(/&amp;/g, '&');
        data = data.replace(/&quot;/g, '"');

        var string = new Array('<option selected="selected" disabled="disabled" value="null">Please select release...</option>');
        var expression = /\<release(.*?)\<\/release\>/g;
        var release;
        var multidisc = new Object();
        while(release = expression.exec(data))
        {
            var type = release[1].match(/type="(.*?) /)[1];
            var title = release[1].match(/\<title\>(.*?)\<\/title\>/)[1];
            var id = release[1].match(/id="(.*?)"/)[1];
            var artist = release[1].match(/\<name\>(.*?)\<\/name\>/)[1];
            albums[id] = {title: title, id: id, type: type, artist: artist};
            
            var multi = title.match(/(.*?)\(disc ([0-9]+).*?\)/);
            if(multi)
            {
                if(!multidisc[multi[1]])
                {
                    multidisc[multi[1]] = id
                    albums[id].multi = new Array();
                    string.push('<option value="' + id + '">' + multi[1] + '(n discs)</option>');
                }
                else
                {
                    albums[multidisc[multi[1]]].multi.push(id);
                }
            }
            else
            {
                string.push('<option value="' + id + '">' + title + '</option>');
            }
        }
        
        var select = document.getElementById('albumSelect');
        select.innerHTML = string.join('');
        select.selectedIndex = 0;
        fieldActivity = 1;
        disabled(false);
    }
    function processAlbum(data, multi)
    {
        data = data.replace(/&amp;/g, '&');
        var id = data.match(/id="(.*?)"/)[1];
        var album = albums[id];
        
        album.asin = data.match(/\<asin\>(.*?)\<\/asin\>/);
        album.asin = album.asin ? album.asin[1] : null;
        album.tracks = new Array();
        album.length = 0;
        
        var events = data.match(/\<release-event-list.*?\<\/release-event-list\>/);
        if(events)
        {
            var parser=new DOMParser();
            var doc=parser.parseFromString(events[0],"text/xml");
            events = doc.getElementsByTagName('event');
            var finalEvent = events ? events[0] : null;
            for(var i=1, event; event = events[i]; i++)
            {
                if(event.getAttribute('date').length > finalEvent.getAttribute('date').length)
                {
                    finalEvent = event;
                }
                if(finalEvent.length == 10) break;
            }
            
            if(finalEvent != '')
            {
                if(finalEvent.childNodes.length > 0)
                {
                    album.label = finalEvent.getElementsByTagName('name')[0].firstChild.nodeValue;
                }
                album.date = finalEvent.getAttribute('date') || null;
                album.country = finalEvent.getAttribute('country') || null;  
            }
        }
        
        var trackExpression = /\<track.*?\<\/track\>/g;
        var track;
        while(track = trackExpression.exec(data))
        {
            var object = {title: track[0].match(/\<title\>(.*?)\<\/title\>/)[1]};
            var duration = track[0].match(/\<duration\>(.*?)\<\/duration\>/);
            if(duration)
            {
                object.dur = Math.round(parseInt(duration[1])/1000);
                album.length += object.dur;
            }
            var artist = track[0].match(/\<name\>(.*?)\<\/name\>/);
            if(artist)
            {
                object.artist = artist[1];
            }
            
            album.tracks.push(object);
        }
        
        if(!multi)
        {
            showAlbum(id);
        }
    }
      
    function showArtist(id)
    {
        disabled(true);
        currentArtist = id;
        if(!artists[id].types)
        {
            fetchArtist(id);
            return;
        }
        
        var artist = artists[id];
        artistfield.value = artist.name;
        var select = document.getElementById('albumSelect');
        select.innerHTML = '';
        select.options[0] = new Option('Please select release...', null);
        select.options[0].disabled = 'disabled';
        document.getElementById('brainzCover').src = 'http://i28.tinypic.com/j6h1tt.png';
        
        var groups = new Array();
        for(var i in artist.types)
        {
            var group = document.createElement('optgroup');
            group.label = i;
            var type = artist.types[i];
            
            for(var p=0, album; album = albums[type[p]]; p++)
            {
                var title = album.title;
                if(album.multi)
                {
                    title = title.match(/(.*?)\(disc ([0-9]).*?\)/)[1] + '(' + (album.multi.length + 1) + ' discs)';
                }
                group.appendChild(new Option(title, album.id));
            }
            groups.push(group);
        }
        groups.sort(function(a, b) {
            if(a.label == b.label) return 0;
            return a.label > b.label ? 1 : -1;
        });
        for(var i=0; i < groups.length; i++) select.appendChild(groups[i]);
        select.selectedIndex = 0;
        disabled(false);
    }
    
    function showAlbum(id)
    {
        disabled(true);
        
        var album = albums[id];
        if(!album.tracks)
        {
            if(album.multi) fetchMultiAlbum(id);
            else fetchAlbum(id);
            return;
        }
        
        var result = new Array();
        var title = album.multi ? album.title.match(/(.*?) \(disc [0-9].*/)[1] : album.title;
        albumfield.value = albumTypes[album.type] ? title + ' [' + albumTypes[album.type] + ']' : title;
        artistfield.value = album.artist;
        
        if(album.asin)
        {
            document.getElementById('brainzCover').src = 'http://ec1.images-amazon.com/images/P/' + album.asin + '.jpg';
            result.push('[center][img]http://images.amazon.com/images/P/' + album.asin + '.01.L.jpg[/img][/center]\n\n');
        }
        else
        {
            document.getElementById('brainzCover').src = 'http://i28.tinypic.com/j6h1tt.png';
        }
        
        result.push('[center][b][size=4]' + album.artist + '\n' + title + '[/size][/b][/center]');
        if(album.date)
        {
            datefield.value = album.date.match(/[0-9]{4}/);
            result.push('\n[b]Release:[/b]\t' + album.date);
        }
        if(album.label)
        {
            result.push('\n[b]Label:[/b]\t' + album.label);
        }
        if(album.country)
        {
            result.push('\n[b]Country:[/b]\t' + album.country);
        }
        result.push('\n[b]Type:[/b]\t' + album.type);
        
        var discs = album.multi ? album.multi.concat([album.id]) : [album.id];
        var length = 1;
        for(var i=0, disc; disc = albums[discs[i]]; i++)
        {
            if(length && disc.length) length += disc.length;
            else length = false;
        }
        if(length)
        {
            length--;
            var min = (length % 60 < 10) ? '0' + (length % 60) : length % 60;
            result.push('\n[b]Length:[/b]\t' + Math.floor(length / 60) + ':' + min);                
        }
        
        result.push('\n\n[b][size=3]Tracklist:[/size][/b]\n');
        var tracklist = [];
        
        for(var i=0, disc; disc = albums[discs[i]]; i++)
        {
            var localRes = [];
            var index = 0;
            
            if(discs.length > 1)
            {
                index = parseInt(disc.title.match(/disc ([0-9]+)/)[1]);
                localRes.push('\n[b][size=2]' + disc.title.match(/.*?\((.*?)\)/)[1] + '[/size][/b]\n');
            }
            
            for(var p=0, track; track = disc.tracks[p]; p++)
            {
                var dur = '';
                if(track.dur)
                {
                    var min = Math.floor(track.dur / 60);
                    var sec = track.dur % 60;
                    if(sec < 10)
                    {
                        sec = '0' + sec;
                    }
                    dur = ' (' + min + ':' + sec + ')';
                }
                var artist = track.artist ? '[i]' + track.artist + '[/i] - ' : '';
                var number = p < 9 ? '&nbsp;&nbsp;' + (p+1) : p+1;
                localRes.push('[b]' + number + '.[/b]&nbsp;&nbsp;' + artist + track.title + dur + '\n');
            }
            tracklist[index] = localRes.join('');
        }
        result.push(tracklist.join(''));
        
        if(getSetting('WBfooter'))
        {
            var index = Math.random() * (urlText.length);
            while(index == urlText.length) index = Math.random() * (urlText.length);
            result.push('\n[center][size=1][b][url=' + url + ']WaffleBrainz[/url][/b] - ' + urlText[Math.floor(index)] + '[/size][/center]');
        }
        
        if(getSetting('WBreplace'))
        {
            textfield.value = result.join('');
        }
        else
        {
            textfield.value += '\n\n' + result.join('');
        }
        disabled(false);
    }
    
    function disabled(bool)
    {
        var status = bool ? 'disabled' : false;
        if(fieldActivity == 2 || bool === true)
        {
            document.getElementById('artistSelect').disabled = status;
        }
        if(fieldActivity > 0 || bool === true)
        {
            document.getElementById('albumSelect').disabled = status;
        }
        document.getElementById('brainSearch').disabled = status;
    }
    
    function trimW(s)
    {
        s = s.replace(/(^\s*)|(\s*$)/gi,"");
        s = s.replace(/[ ]{2,}/gi," ");
        s = s.replace(/\n /,"\n");
        return s;
    }
    
    function throwError(msg)
    {
        alert(msg || 'Something went wrong! MusicBrainz might be down.');
        disabled(false);
    }
    
    function getSetting(name) {
        var test = document.cookie.match(name + '=(true|false)');
        if(test)
        {
            return (test[1] == 'true') ? true : false;
        }
        else
        {
            return true;
        }
    }
    
    this.saveSetting = function(node) {
        var date = '; expires=Sun, 13 Sep 2020 12:26:39 GMT';
        document.cookie = node.id+"="+node.checked+date+"; path=/";
    }
    
    return this;
}();