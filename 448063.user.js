// ==UserScript==
// @name        Pururin inline download
// @namespace   AtachiHayashime
// @include     http://pururin.com/gallery/*
// @version     1.1
// @grant       none
// ==/UserScript==

function formatPageNumber(page, digits) {
    var formated = String(page);
    while (formated.length < digits) {
        formated = '0' + formated;
    }
    return formated;
}

function sync_loop(index, max, viewerdata, zip) {
    var get = $('.btn-get');
    get.html('Loading files... ' + (index + 1) + '/' + max);
    if (index < max) {
        var url = 'http://pururin.com/f/' + viewerdata.images[index].f.split('.') [0] + '/' + viewerdata.slug + '-' + (index + 1) + '.' + viewerdata.images[index].f.split('.') [1];
        var file = viewerdata.slug + '-' + formatPageNumber(index + 1, String(max).length) + '.' + viewerdata.images[index].f.split('.') [1];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function (e) {
            if (this.readyState == 4 && this.status == 200) {
                var blob = new Blob([this.response], {
                    type: 'image/jpeg'
                });
                reader = new FileReader();
                reader.onload = function (event) {
                    if (event.loaded == event.total) {
                        zip.file(file, event.target.result, {
                            binary: true
                        });
                        sync_loop(index + 1, max, viewerdata, zip);
                    }
                }
                reader.readAsBinaryString(blob);
            }
        };
        xhr.send();
    } else {
        generateZip(zip);
    }
}
function generateInfo() {
    var text = $('.otitle') .text() + '\n';
    text += '\n';
    $('.table-info tr') .each(function () {
        var key = $('td:nth-child(1)', $(this)) .text();
        var value = $('.tag-list li', $(this)) .toArray() .map(function (li) {
            return $(li) .text();
        }).join(', ') || $('td:nth-child(2)', $(this)) .text();
        if (key != '' && key != 'Pages' && key != 'Ranking' && key != 'Rating') {
            text += key + ': ' + value + '\n';
        }
    });
    text += '\n';
    text += window.location;
    console.log(text);
    return text;
}
function generateZip(zip) {
    var title = $('.otitle') .text() .replace(/ \/.*/, '');
    var artist = $($('.tag-list') [0]) .text();
    zip.file('info.txt', generateInfo());
    var get = $('.btn-get');
    get.html('Building Zip...');
    var blob = zip.generate({
        type: 'blob'
    });
    get[0].href = window.URL.createObjectURL(blob);
    var filename = ('[' + artist + '] ' + title + ' (eng).zip').replace(/[\\\/:*?<>|]/, '_');
    get[0].download = filename;
    get.html('Zip ready');
}
$(function () {
    $('body') .append($('<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.0.0/jszip.js"></script>'));
    $('.btn-download') .unbind() .click(function () {
        $('.btn-download') .after($('<a class="btn btn-get"></a>'));
        var iframe = $('<iframe />');
        $('body') .append(iframe);
        iframe.css('display', 'none') .attr('src', $('.link-next') .attr('href')) .load(function (event) {
            var viewerdata = iframe[0].contentWindow.Pururin.ImageViewer2.data;
            var zip = new JSZip();
            sync_loop(0, viewerdata.images.length, viewerdata, zip);
        });
        return false;
    });
});
