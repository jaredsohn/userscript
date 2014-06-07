// ==UserScript==
// @name           Netflix Ratings Export by James Wilson (james@jameswilson.name)
// @namespace      http://www.jameswilson.name
// @author         James Wilson (james@jameswilson.name)
// @description    Exports your Netflix ratings as JSON format
// @include        http://movies.netflix.com/MoviesYouveSeen*
// @include        https://movies.netflix.com/MoviesYouveSeen*
// ==/UserScript==
var bGreasemonkeyServiceDefined = false;
try {if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;}}catch (err) {}
if (typeof unsafeWindow === "undefined" || !bGreasemonkeyServiceDefined) {
    unsafeWindow = (function () {
        var dummyElem = document.createElement('p');
        dummyElem.setAttribute('onclick', 'return window;');
        return dummyElem.onclick();})();}
unsafeWindow.jQuery(function ($) {
    var $nfExport = $('<div>').css({'font-size':'larger',
        margin:'10px'}).append($('<button>Save/Export Ratings</button>').click(function () {
        $nfExport.html('<div>Loading the rest of the following pages... <img src="'
            + 'data:image/gif;base64,R0lGODlhDAAMAKU8AAAAABAQEBISEj09PT4+PkBAQEJCQkNDQ0lJSUpKSktLS01NTU5OTk9'
            + 'PT1FRUVNTU1tbW2hoaGlpaW1tbW9vb3BwcIODg4SEhIWFhYaGhoeHh4mJiYuLi42NjY6OjpCQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5i'
            + 'YmJmZmZqampubm6Ojo6SkpKqqqqurq6ysrK6urq+vr7CwsLq6ury8vL29vb+/v8HBwcLCwsPDw8XFxczMzP///////////////yH/C05'
            + 'FVFNDQVBFMi4wAwEAAAAh+QQJCgA/ACwAAAAADAAMAAAGLMCfcEgsGo/IZBGXRAASTQBCSVEpf4gGEXcbjhqOlumku3WHld8q01HSRMU'
            + 'gACH5BAkKAD8ALAAAAAAMAAwAAAYzwJ9wSCRCIEWjQIBMCgNM50/jkf4ihIvVUohYfx3Z9ycSoaQpDkaFwzl3P93t5pbibsUgACH5BAk'
            + 'KAD8ALAAAAAAMAAwAAAYwwJ9QiEAMj6MfBQA4CisNhuiQwDl/i8Z1yEpthSbQ6fsrXUhk4S39w1nJtzV7/g0CACH5BAkKAD8ALAAAAAA'
            + 'MAAwAAAYzwJ9QaIkMj6hfp1AY/SDDk0gki1w8AQFUyMEcBVphbmc6Qra42+3IVq/ZRxx8Tq/b7/MgACH5BAkKAD8ALAAAAAAMAAwAAAY'
            + 'twJ9QaDINj8PMZvWrHG84W03kcjRGQ+ixgUB6UxTvEQHoin+J8vmHW7vf8HMQACH5BAkKAD8ALAAAAAAMAAwAAAYxwJ9QiMMNj8LbDZf'
            + '7nZDE244jQkGFJozoeoR5uMILwQKWGCLg0IgLEQTAbQEEPgcfgwAh+QQJCgA/ACwAAAAADAAMAAAGLsCfcEgsGo/E2w0pxOGYQhv0V9O'
            + 'YmKMLiRmbMRULIy6BeC0eIyMAMPmljQhEMQgAIfkEAQoAPwAsAAAAAAwADAAABjHAn3BILBqPyKRyeFPebrgkDiqEQIioU64qEBBFqCF'
            + 'EEPhELq4LxiT+jQwDYeoYsRSDADs="></div>');
        loadNext();
    }));
    $('#yui-main').prepend($nfExport);
    function loadNext() {
        if (!$('span.next').length) {
            $('<span>').addClass('ratingsPage').hide().load($('.next').last().attr('href') + ' #yui-main', loadNext)
                .appendTo($('#yui-main'));
        } else {
            var ratings = [];
            $('tr.agMovie').each(function () {
                var $this = $(this), url = $this.find('.title a').attr('href'), rating = 0; //= "Not interested"
                url = url.slice(0, url.lastIndexOf('?'));
                if ($this.find('.sbmf-10').length) {
                    rating = 1;
                } else if ($this.find('.sbmf-20').length) {
                    rating = 2;
                }
                else if ($this.find('.sbmf-30').length) {
                    rating = 3;
                }
                else if ($this.find('.sbmf-40').length) {
                    rating = 4;
                }
                else if ($this.find('.sbmf-50').length) {
                    rating = 5;
                }
                ratings.push({title:$this.find('.title').text().trim(), id:url.slice(url.lastIndexOf('/') + 1),
                    url:url, rating:rating});
            });
            var winURL = window.webkitURL || window.URL,
                BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.BlobBuilder,
                bb = new BlobBuilder();
            bb.append(JSON.stringify(ratings));
            var file = bb.getBlob("application/json"), objUrl = winURL.createObjectURL(file);
            $nfExport.html($("<a>").attr('href','#').click(function(){
                $('.ratingsPage').fadeIn();
                return false;
            }).text('Show all for saving/printing')).append(' - ');
            $nfExport.append($("<a>").attr({download:'netflix-ratings.json', href:objUrl})
                .text('Download Ratings (JSON)'));
        }
    }
});