// ==UserScript==
// @name       snob2000 song selector
// @namespace  http://snob2000.excudo.net/
// @version    0.1
// @description  Add your favourite songs to an overview, while you go through the 'keuzelijst'. This makes it a lot easier to extract 10 favourite songs.
// @match      http://ondergewaardeerdeliedjes.nl/onze-keuzelijst-2013/*
// @copyright  2013+, Excudo
// @require http://code.jquery.com/jquery-latest.js
// @require https://raw.github.com/isocra/TableDnD/master/stable/jquery.tablednd.js
// ==/UserScript==

$(document).ready(function() {
    /***
     * create a sortable table
     * this table will be made sortable (again) after every add and delete action
     */
    var table = $('<table id="tracksTable" style="position: absolute; top: 0px; margin-top: 5px; right: 5px; width: 450px; background-color: #FAFAFA; border-radius: 15px;"></table>'),
        thead = $('<thead style="font-weight: bold;"><tr><td>Artist</td><td>Song</td><td></td></tr></thead>'),
        tbody = $('<tbody id="tracks"></tbody>'),
        link = $('<a id="cpTracksLink" style="margin: 10px; 15px; cursor: pointer;">show copy-pastable list</a>').click(function() {
            if ($(this).text().substring(0,4) == 'show') {
                $(this).text('hide copy-pastable list');
                var rows = $('tr', $('#tracks')), text='';
                rows.each(function() {
                    var tds = $('td', $(this)), entry;
                    console.log(tds);
                    console.log(tds[0]);
                    entry = $(tds[0]).text()+' - '+$(tds[1]).text();
                    text += entry+'\n';
                });
                $('#cpTracks').text('').show(1000);
                $('#cpTracks').text(text);
            }
            else {
                $(this).text('show copy-pastable list');
                $('#cpTracks').hide(1000);
            }
        }),
    tfoot = $('<tfoot><tr><td colspan="3"><textarea id="cpTracks" style="width: 400px; display: none;">old text</textarea></td></tr></tfoot>');
    tfoot.prepend(link);
    table.append(thead).append(tbody).append(tfoot);
    $('body').append(table);
    
    /**
     *  get all alphabetical paragraphs,
     * instantiate tracklist-placeholder (where they are showed once they are added)
     * and create convenience function for hiding the textarea after every add and delete action
     */
    var elements = $('p', $('div#primary')), trackList = $("#tracks"), hideCopyPastableList = function() {
        $('#cpTracks').hide(500);
        $('#cpTracksLink').text('show copy-pastable list');
    };
    
    /**
     * loop through the paragraphs and add functionality to add items (songs) to the overview
     */
    elements.each(function() {
		// going to convert ugly text-list to proper unsorted list and add before mentioned functionality        
        var i, parts = $(this)[0].innerHTML.split('<br>'), list = $('<ul style="list-style-type: none;"></ul>');
        for (i=0; i<parts.length; i++) {
            // entry will hold a 'artist - song' string.
            var entry = $.trim(parts[i]), properList, li, span;
            // going to create a button for adding the artist-song
            span = $('<span style="border-radius: 4px; background-color: rgb(41, 112, 202); color: rgb(215, 236, 238); padding: 0px 6px 0px 5px; margin-right: 10px; cursor: pointer;">add</span>');
            span.click(function() {
                // hide text-area so it will be refreshed when the user opens it again
                hideCopyPastableList();
                var details = $(".track", $(this).parent()).text().split(' – '), artist, song, tr=$('<tr style="display: none;"></tr>'), tdDel=$('<td style="cursor: pointer; color: red;"> X </td>');
                artist = details[0], song=details[1];
                // add artist-song to the overview-table
                tr.append('<td>'+artist+'</td><td>'+song+'</td>');
                // button to remove it from the overview
                tdDel.click(function() {
                    tr.hide(500, function() {
                        $(this).remove();
                    });
                    hideCopyPastableList();
                });
                tr.append(tdDel);
                trackList.append(tr.show(500));
                // make it dragable (so songs can be ordered)
                $('#tracksTable').tableDnD({
                    onDragClass: "dragMe"
                });
            });
            li = $('<li><span class="track">'+entry+'</span></li>').prepend(span);
            list.append(li);
        }
        $(this)[0].innerHTML = '';
        $(this).append(list);
    });
    
    /**
     * Make sure the overview-table is always visible at the top
     * I know this is not the most elegant way to implement that, but it's good enough for now.
     */
    $(window).scroll(function() {
        $('#tracksTable').css('top', $(this).scrollTop() + "px");
    });
});