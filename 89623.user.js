// ==UserScript==
// @name           vKontakte Album Full Sized Downloader
// @namespace      gakuen@gmail.com
// @description    Add "Download Album" link, witch can load all photos in one page, link all thumbnail with full sized photos and generate list of photos and list of renaming.
// @include        http://vkontakte.ru/album*
// @include        http://vk.com/album*
// @require        http://mesak-project.googlecode.com/files/jquery.142.gm.js
// ==/UserScript==

var dl_bar = {
    create: function() {
        if (!this.getIds()) return;

        $("div.summary").append(this.constructSplit()).append(this.constructButton());
        $('#dl_bar').click(function() {
            dl_bar._getOnClick();
            return false;
        });
	},
    getIds: function(){
        var urlRegex = /id=(\d+).+oid=([\d\-]+)/ig;
        var picRegex = /photo-?([\d\_]+)/ig;

        var match = urlRegex.exec($('div.summary a:eq(1)').attr('href'));
        if (!match || match.length < 3) return false;
       	this.oid = match[2];
       	this.aid = match[1];

        match = picRegex.exec($('#searchResults a:first').attr('href'));
        if (!match || match.length < 2) return false;
       	this.pid = match[1];
        return true;
    },
	constructButton: function() {
        return $('<a id="dl_bar" class="notbold">').text('Download Album');
	},
	constructSplit: function() {
        return $('<span class="divider">').text('|');
	},

    _getOnClick: function() {
        var  url;
        if (this.aid) {
            url = '/photos.php?act=a_album&oid=%oid%&aid=%aid%&pid=%pid%';
        } else {
            url = '/photos.php?act=a_album&oid=%oid%&pid=%pid%';
        }
        url = url.replace('%oid%', this.oid).replace('%aid%', this.aid).replace('%pid%', this.pid);
        $.getJSON(url, this.changeImagesWithFullList);
	},

    changeImagesWithFullList: function(photoList){
        var img = $('<table><tbody>');
        var row = $('<tr>');
        var links = "";
        var rename = "";
        for (i = 0, j = 0; i < photoList.length; i++){
            var cell = $('<td>');
            var imUrl = (photoList[i].length < 5)? photoList[i][3] : photoList[i][5];
            cell.append($('<a>').attr('href', imUrl).append($('<img>').attr('src', photoList[i][2])));
            row.append(cell);
            links += imUrl + "\n";
            var spfile = imUrl.split('/');
            rename += 'ren ' + spfile[spfile.length - 1] + " " + photoList[i][0].split('_')[1] + ".jpg\n";
            if (j++ > 2) {
                j = 0;
                img.append(row);
                row = $('<tr>');
            }
        }
        $('div#album table').replaceWith(img);
        $('ul.pageList').remove();
        $('#dl_bar').replaceWith($("<span>Now all pics link to max resolution images!</span>"));
        $('div#album').append($('<textarea id="photo_links">').css({'width' : '100%', 'height' : '100px'}).text(links));
        $('div#album').append($('<textarea id="photo_rename">').css({'width' : '100%', 'height' : '100px'}).text(rename));
    }
}

$(function() {
    dl_bar.create();
});