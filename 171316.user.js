// ==UserScript==
// @name           Betaseries.com - Torrent/DPStream recherche
// @description    Recherche un épisode rapidement sur des sites de torrents
// @namespace      fr.korri.torrents
// @match          http://www.betaseries.com/*
// @match          https://www.betaseries.com/*
// @version        2.2.0
// ==/UserScript==

function main() {
/**
* jQuery PostBlank Plugin 1.0.0
*
* Copyright 2011, pac1250@gmail.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/
    (function(a){a.postblank=function(c){c=a.extend({method:"POST",action:document.location.href,target:"_blank",enctype:"application/x-www-form-urlencoded",data:{}},c);var b=a('<form id="jQueryPostBlankPluginForm"></form>').appendTo("body");for(param in c){if(param!="data"){b.attr(param,c[param])}}for(name in c.data){a('<input type="hidden" />').appendTo("#jQueryPostBlankPluginForm").attr("name",name).attr("value",c.data[name])}b.submit().remove();return this};a.fn.postblank=a.postblank})(jQuery);
    
    
    
    // jQuery PostBlank end
    
    $('<style id="torrent_css" type="text/css">'
      + ' div.torrent-links-div { position: absolute; border: 1px solid #DDDDDD; background-color: #FFFFFF; z-index: 3; }'
      + ' div.torrent-links-div div.torrent-links-div-div { line-height: 16px; padding: 2px; cursor: pointer; }'
      + ' div.torrent-links-div div.torrent-links-div-div:hover { background-color: #EEEEEE; }'
      + ' div.torrent-links-div div.torrent-links-div-div img { vertical-align: middle; }'
      + ' div.torrent-links-div div.torrent-links-div-div span { vertical-align: middle; padding: 0 5px; }'
      + '</style>').appendTo('head');
    
    var torrent_data = {
        dps : {
            name: 'DpStream Serie',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODA1OUIwN0FEMzBFMTFFMjlGMURCNjE2ODkyOEU5QzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODA1OUIwN0JEMzBFMTFFMjlGMURCNjE2ODkyOEU5QzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MDU5QjA3OEQzMEUxMUUyOUYxREI2MTY4OTI4RTlDMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MDU5QjA3OUQzMEUxMUUyOUYxREI2MTY4OTI4RTlDMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pghq2HgAAAK9SURBVHjaXJNNaFxVFMd/982dNzPJTKYkTkIg8SsY0NiULlos6cKNuhQElbjTpSCYlWjUhaLgql0EXEiXtqsSShVsNy1m/IJIwJDoxIgE8qG1JJ2vpvPmvXt6biaGJANn7jn33HvO//zf/xr5aAKS9iiB/RxjzqARmJjDP3PgpdRCRJZwyTSp8Fcrhb4x49xvpGygib1TcuSOD45EGgdDuPglnLxoCbs+IJsPFMVBO3P8AnIUjs8HKSSOpgNKjz4ngTaPW4hLOtbe7Rwq9EEmr7k2kvic01yEwtf9bigOPGuNzaXdqXPIwIg2cjphF9Lcwfz+PanNZdzwSdzTbylqRZbOICaFqZQJ/lmBnv40btKstecuSyIibbWWWrTvy80vJfluRmJ1k2O5uHxF5M2encCsCtHiz2zrdNG1LwinxzGzn+E/Q3TuNVyuQOT91XnCD8ewU8Pcb9SoP3ket1HD0g9xNqGqh9J/LsGNRWx5kXrQRfPlKXI7d2nVIux6hfCnZSI9X91VLkxGJ0AL5KDt2tS0wImCsq1U8EA7bv/HTlNFoXy5lR+pjbzA5tcOVzQkStVjl94gSP4vIG2qWiHZ1Zv6AVCC66Uh6ndq5KtrNOzzsLHEifUyic3S88d1SpU5KPkCWY8g5v5duNf3BPmxXrZGJ6mMvc3gwgx9a9+yOvEJg5WveHz2Y3xD1SI80pGEJY15YELuNVosPfMuC6c/xaUy9P59i/Ef3qGVH2adIl1hEc/XXgFzINXAj5AMbN3k7O3XsckukgqxcYPSv/PYlo7VXWXixqsUm3/h0R7WuCo/NvI+V2nxiieO4JBiFaZk9p9VYx92rqNq8WqWPfeXQMV3QcdACmrdHfMk+j2jbIsv2qNr9tCTkIMHd8HqWlbvvO5cVP8ptZYmnTn2hPbv+e2c/q3r+p5G3zwUYAAwVj0HjdEQCwAAAABJRU5ErkJggg==',
            auto_markas: true,
            search: function(title, episode) {
                var data = 'recherchem=' + encodeURIComponent(title),
                    parts = episode.match(/S([0-9]+)E([0-9]+)/),
                    episode = parts[2],
                    season = parts[1].replace(/^0/, '');
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://www.dpstream.net/serie.html',
                    data: data,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    onreadystatechange: function(http) {
                        if(http.readyState == 4) {
                            var href = $(http.responseText).find('a.t').attr('href');
                            if(href) {
                                var url = 'http://www.dpstream.net/serie-%i-aj.html#js%i-,-%s-,-%e [VOST FR]',
                                    id = Number(href.match(/[0-9]+/g));
                                
                                url = url.replace(/%i/g, id).replace(/%e/g, episode).replace(/%s/g, season);
                                GM_openInTab(url);
                            }
                        }
                    }
                });
            }
        },
        dpm : {
            name: 'DpStream Manga',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODA1OUIwN0FEMzBFMTFFMjlGMURCNjE2ODkyOEU5QzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODA1OUIwN0JEMzBFMTFFMjlGMURCNjE2ODkyOEU5QzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MDU5QjA3OEQzMEUxMUUyOUYxREI2MTY4OTI4RTlDMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MDU5QjA3OUQzMEUxMUUyOUYxREI2MTY4OTI4RTlDMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pghq2HgAAAK9SURBVHjaXJNNaFxVFMd/982dNzPJTKYkTkIg8SsY0NiULlos6cKNuhQElbjTpSCYlWjUhaLgql0EXEiXtqsSShVsNy1m/IJIwJDoxIgE8qG1JJ2vpvPmvXt6biaGJANn7jn33HvO//zf/xr5aAKS9iiB/RxjzqARmJjDP3PgpdRCRJZwyTSp8Fcrhb4x49xvpGygib1TcuSOD45EGgdDuPglnLxoCbs+IJsPFMVBO3P8AnIUjs8HKSSOpgNKjz4ngTaPW4hLOtbe7Rwq9EEmr7k2kvic01yEwtf9bigOPGuNzaXdqXPIwIg2cjphF9Lcwfz+PanNZdzwSdzTbylqRZbOICaFqZQJ/lmBnv40btKstecuSyIibbWWWrTvy80vJfluRmJ1k2O5uHxF5M2encCsCtHiz2zrdNG1LwinxzGzn+E/Q3TuNVyuQOT91XnCD8ewU8Pcb9SoP3ket1HD0g9xNqGqh9J/LsGNRWx5kXrQRfPlKXI7d2nVIux6hfCnZSI9X91VLkxGJ0AL5KDt2tS0wImCsq1U8EA7bv/HTlNFoXy5lR+pjbzA5tcOVzQkStVjl94gSP4vIG2qWiHZ1Zv6AVCC66Uh6ndq5KtrNOzzsLHEifUyic3S88d1SpU5KPkCWY8g5v5duNf3BPmxXrZGJ6mMvc3gwgx9a9+yOvEJg5WveHz2Y3xD1SI80pGEJY15YELuNVosPfMuC6c/xaUy9P59i/Ef3qGVH2adIl1hEc/XXgFzINXAj5AMbN3k7O3XsckukgqxcYPSv/PYlo7VXWXixqsUm3/h0R7WuCo/NvI+V2nxiieO4JBiFaZk9p9VYx92rqNq8WqWPfeXQMV3QcdACmrdHfMk+j2jbIsv2qNr9tCTkIMHd8HqWlbvvO5cVP8ptZYmnTn2hPbv+e2c/q3r+p5G3zwUYAAwVj0HjdEQCwAAAABJRU5ErkJggg==',
            auto_markas: true,
            search: function(title, episode, absolute) {
                var data = 'recherchem=' + encodeURIComponent(title),
                    parts = episode.match(/S([0-9]+)E([0-9]+)/),
                    season = parts[1].replace(/^0/, ''),
                    absolute = absolute;
                if(!absolute) {
                    alert('Vous devez activer la numérotation absolue pour pouvoir utiliser les manga !');
                    return;
                }
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://www.dpstream.net/manga.html',
                    data: data,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    onreadystatechange: function(http) {
                        if(http.readyState == 4) {
                            var href = $(http.responseText).find('a.t').attr('href');
                            if(href) {
                                while(absolute.length < 3) {
                                    absolute = '0'+absolute;
                                }
                                var url = 'http://www.dpstream.net/manga-%i-episode-%e [VOST FR].html',
                                    id = Number(href.match(/[0-9]+/g));
                                
                                url = url.replace(/%i/g, id).replace(/%e/g, absolute);
                                GM_openInTab(url);
                                
                            }
                        }
                    }
                });
            }
        },
        tpb : {
            name: 'The Pirate Bay',
            icon: 'data:image/gif;base64,R0lGODlhEAAQAMZlAAAAAAEBAQICAgMDAwUFBQsLCw0NDQ8PDxAQEBERERISEhMTExQUFBkZGRsbGx4eHh8fHyAgICEhISMjIyYmJicnJyoqKisrKy0tLTY2Njc3Nzk5OTw8PD09PT8/P0BAQEFBQUJCQkNDQ0lJSVJSUlRUVFdXV1hYWFlZWVpaWltbW19fX2BgYGFhYWVlZWxsbG5ubnFxcXJycnd3d3p6eoKCgoODg4aGhoiIiImJiYuLi46OjpeXl5iYmJycnJ2dnaSkpKWlpaampqenp6ioqKqqqqurq62tra6urq+vr7GxsbKysra2trm5ub29vb+/v8HBwcLCwsXFxcjIyNHR0dLS0tTU1NfX19nZ2d3d3eLi4uXl5efn5+zs7O/v7/Hx8fPz8/r6+vv7+/z8/P7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEAAQAAAHwoBlgmVkhYaGg4JXIyAijo8hIUSJRgCWl5gliUmWBAILCAMDAQApmwAYVStLWC5LOAAoiUgAGVsoEBUTVDcAJok+lgeYBgO1YYPBlhAFABQElhfIVjE9xholDgArHAkAIGRjTwA1O0FMRUJBQEdJSls8KjTfHiw7VGKCXlI/NgsfTV58GDKDAQAGGyQ06IAihIUKZbggiBDChAsdOUhY6ADjQQsoZcAokPElUZkvUU4AmCJojJMuJgdpGZElpk1CggIBADs=',
            auto_markas: false,
            search: function(title, episode) {
                $.postblank({
                    method: 'GET',
                    action: 'https://thepiratebay.sx/s/',
                    data: {
                        q: (title + ' ' + episode),
                        category: 0,
                        page: 0,
                        orderby: 7
                    }
                });
            }
        },
        eztv : {
            name: 'EZTV.it',
            icon: 'data:image/gif;base64,R0lGODlhEAAQAKUfAA9/8B9/8Cd/8B+I8Ux/8C+Q8liI8T+Z82SQ8k+h9HCZ83yh9F+q9Yiq9W+y9pSy9n+796C794/D+KvD+J/M+bfM+a/U+r/d+8/d+8/l/Nvl/N/u/efu/e/2/vP2/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKACAALAAAAAAQABAAAAZ/wI9wSCwOMwcAwPG5KJ8FYadw+VAAEgtFeBhkhJKnkjF0ACxDSdQYlhDDm2HVAiATN4PD90LJ5IcJcgcBAhAfSWJrQh4IFUaPCgQECJIEHBWSRgSOHAaOHw8Ymp8RD0INj5tCGAYeGBOpnx+NDxypE7AfEwsLjx8Nqh8aBLlCQQA7',
            auto_markas: false,
            search: function(title, episode) {
                $.postblank({
                    method: 'POST',
                    action: 'https://eztv.it/search/',
                    data: {
                        SearchString: '',
                        SearchString1: (title + ' ' + episode),
                        search: 'Search'
                    }
                });
            }
        },
        torrentz : {
            name: 'Torrentz.eu',
            icon: 'data:image/ico;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACZZjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8IAAA/DcAAPw7AAD8PQAA/CAAAPw/AAD8PwAA/D8AAPw/AAD8PwAA/D8AAPw/AAB8PgAAAAAAAAAAAACAAQAA',
            auto_markas: false,
            search: function(title, episode) {
                $.postblank({
                    method: 'GET',
                    action: 'https://torrentz.eu/search',
                    data: {
                        f: (title + ' ' + episode)
                    }
                });
            }
        },
        kickass : {
            name: 'Kickass Torrent',
            icon: 'data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdscPEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9FgZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeBk/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAAAC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9UkKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Smtf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv////////////////////////////////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn//////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9nobL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAAAAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAAAAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIABAADAAQAAxjMAAA==',
            auto_markas: false,
            search: function(title, episode) {
                $.postblank({
                    method: 'GET',
                    action: 'http://kat.ph/usearch/' + encodeURIComponent(title) + ' ' + encodeURIComponent(episode) +'/',
                    data: {
                        field: 'seeders',
                        sorder: 'desc'
                    }
                });
            }
        },
    };
    
    function torrent_clean_title(title) {
        return title.replace(/'s\b/gi, ' ')
        .replace(/:/gi, '')
        .replace(/^The /gi, '')
        .replace(/ \(20[0-9][0-9]\)/gi, '')
        .replace(/20[0-9][0-9]/gi, '')
        .replace(/CSI NY/gi, 'CSI New York');
    }
    
    var htmlAfter = '<div class="torrent-links-div">';
    for(torrent_site in torrent_data) {
        var site_data = torrent_data[torrent_site];
        htmlAfter += '<div class="torrent-links-div-div">';
        htmlAfter += '    <img src="' + site_data.icon + '" />';
        htmlAfter += '    <span>' + site_data.name + '</span>';
        htmlAfter += '    <input type="hidden" name="site" value="' + torrent_site + '">';
        htmlAfter += '</div>';
    }
    htmlAfter += '</div>';
    
    var popup = $(htmlAfter);
    popup.find('.torrent-links-div-div').click(torrent_click);
    
    var checking = false;
    function torrent_check() {
        if(checking) {
            return;
        }
        checking = true;
        
        var htmlBefore = '<span class="torrent-links"><a>↓ Chercher l\'épisode ↓</a></span> &mdash; ';
        
        $('div.item div.titre a.ep:not(.torrent-checked)').each(function(index, Element) {
            $(this)
            .addClass('torrent-checked')
            .siblings('span.srtlinks')
            .before(htmlBefore)
            .siblings('.torrent-links');
        });
        checking = false;
    }
    
    var current_popup = null;
    var current_episode = false;
    var current_id = false;
    var current_title = false;
    var current_absolute = false;
    
    function toggle_popup() {
        //Create popup
        var _this = $(this);
        var _container = _this.closest('.item');
        var id = _container.attr('id');
        var _aep = _container.find('a.ep');
        
        if(current_popup == id) {
            popup.hide();
        	current_popup = false;
        }else {
            _this.after(popup);
            popup.show();
            current_id = id;
            current_title = torrent_clean_title(_aep.text());
            current_episode = _aep.next('a').text();
            current_absolute = _container.find('.titre').text().match(/#([0-9]+) /);
            current_absolute = current_absolute ? current_absolute[1] : false;
        }
    }
    
    function torrent_click() {
        popup.hide();
        current_popup = false;
        var site = torrent_data[$(this).find('input').val()];
        site.search(current_title, current_episode, current_absolute);
        var theid = current_id;
        if(site.auto_markas) {
            setTimeout(function() {
                var _container  = $('#' + theid);
                _container.find('.markas').show().find('.markas_img').click();
                var oldShow = showUndo;
                showUndo = function() {
                    oldShow.apply(this, arguments);
                    showUndo = oldShow;
                    _container.find('.torrent-links')
                        .removeClass('torrent-links')
                        .find('a')
                        .attr('href', arguments[1])
                        .text('Marqué comme lu, cliquez ici pour annuler');
                }
                /*
                    */
            }, 100);
        }
    }
    
    $(document).ready(function() {
        torrent_check();
        $(document).bind('DOMNodeInserted', torrent_check);
        $(document).on('click', '.torrent-links', toggle_popup);
    });
    
}
main();