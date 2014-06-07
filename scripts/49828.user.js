// ==UserScript==
// @name           SearchToBlip
// @namespace      http://blog.sheepr.org/
// @description    add search links to blip.fm
// @include        http://blip.fm/*
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
// auther:  yamy http://blog.sheepr.org/
// version: 1.1.0 2009-05-22
//

(function(){
    var sites = {
        youtube: {
            url: 'http://www.youtube.com/results?search_query=',
            img: 'data:image/x-icon;base64,'+
                 'AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAABAQEAERERACIiIgA+Pj4AVFRUAFpaWgB1dXUAhYWFAJiYmAChoaEAvr6+ANXV1QDa2toA'+
                 '6OjoAP7+/gAAAAAA7od3dnZ4eO7nVlVlVlN1buU+XOquqO0+5T5ceqesaD7lPlyKp6rdPuU+Paqu'+
                 'qs0+5T5mZdpTpV7jzuUz5TNajupTVVU1aMyu7u7u7u7u7u7u4L4gLiAO7u7gvisrCQ7u7uC+LhkL'+
                 'Du7uQE4gLgse7usJC+7u7u7u7g4O7u7u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        },
        lastfm: {
            url: 'http://www.last.fm/search?m=all&q=',
            img: 'data:image/x-icon;base64,'+
                 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAADAwMBIOTk55yUlJf8lJSX/JSUl/yUlJf8lJSX/JSUl/yUlJf8lJSX/JSUl/yUlJf8lJSX/'+
                 'JSUl/zk5OefAwMBIPj4+5SkpKf8pKSn/KSkp/ykpKf8pKSn/KSkp/ykpKf8pKSn/KSkp/ykpKf8p'+
                 'KSn/KSkp/ykpKf8pKSn/Pj4+5S0tLf8tLS3/LS0t/y0tLf8tLS3/LS0t/y0tLf8tLS3/LS0t/y0t'+
                 'Lf8tLS3/LS0t/y0tLf8tLS3/LS0t/y0tLf8yMjL/MjIy/zAwMP85OTn/VlZW/z4+Pv8vLy//MDAw'+
                 '/zAwMP8uLi7/TU1N/1ZWVv9TU1P/Li4u/zAwMP8yMjL/Nzc3/zQ0NP+cnJz//Pz8////////////'+
                 '2tra/0BAQP9qamr/5OTk/////////////////+bm5v9ZWVn/NjY2/zs7O/90dHT//////66urv89'+
                 'PT3/U1NT/6enp/9NTU3/+Pj4/9PT0/9TU1P/NTU1/1RUVP/6+vr/tLS0/zo6Ov8/Pz//sbGx////'+
                 '//9DQ0P/QUFB/0FBQf89PT3/qamp//z8/P9VVVX/Ozs7/1VVVf+Tk5P//////6ampv8/Pz//RERE'+
                 '/76+vv/x8fH/QUFB/0hISP9ISEj/RERE/+rq6v/Q0ND/WVlZ/9zc3P///////////7q6uv9UVFT/'+
                 'R0dH/0tLS/+rq6v//Pz8/1NTU/9MTEz/S0tL/3R0dP//////j4+P/7q6uv/4+Pj/gYGB/1VVVf9E'+
                 'RET/SkpK/01NTf9TU1P/cnJy///////CwsL/WVlZ/2xsbP/i4uL/7+/v/1BQUP+7u7v/7Ozs/11d'+
                 'Xf9ra2v/6enp/5WVlf9TU1P/Wlpa/1ZWVv+SkpL/9vb2////////////4ODg/3R0dP9WVlb/aWlp'+
                 '/+Xl5f///////////+fn5/9qamr/WVlZ/2BgYP9fX1//W1tb/1dXV/9sbGz/ZWVl/1hYWP9dXV3/'+
                 'X19f/11dXf9YWFj/cHBw/29vb/9YWFj/XV1d/19fX/9lZWX/ZWVl/2VlZf9lZWX/ZGRk/2RkZP9l'+
                 'ZWX/ZWVl/2VlZf9lZWX/ZWVl/2NjY/9jY2P/ZWVl/2VlZf9lZWX/aWlp/2lpaf9paWn/aWlp/2lp'+
                 'af9paWn/aWlp/2lpaf9paWn/aWlp/2lpaf9paWn/aWlp/2lpaf9paWn/aWlp/3p6eudtbW3/bW1t'+
                 '/21tbf9tbW3/bW1t/21tbf9tbW3/bW1t/21tbf9tbW3/bW1t/21tbf9tbW3/bW1t/3p6eufb29s+'+
                 'jY2NyXBwcP9wcHD/cHBw/3BwcP9wcHD/cHBw/3BwcP9wcHD/cHBw/3BwcP9wcHD/cHBw/42Njcnb'+
                 '29s+gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAgAEAAA=='
        },
        google: {
            url: 'http://www.google.co.jp/search?q=',
            img: 'data:image/x-icon;base64,'+
                 'AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAuLi4ALy8vADAwMAAxMTEAMjIyADMzMwA0NDQANTU1ADY2NgA3NzcAODg4ADo6OgA8PDwA'+
                 'PT09AD8/PwBCQkIAQ0NDAEZGRgBHR0cASUlJAEpKSgBLS0sATExMAE1NTQBOTk4AT09PAFFRUQBT'+
                 'U1MAVFRUAFVVVQBWVlYAV1dXAFhYWABZWVkAWlpaAFtbWwBcXFwAXV1dAF5eXgBgYGAAYWFhAGJi'+
                 'YgBjY2MAZGRkAGVlZQBmZmYAZ2dnAGhoaABpaWkAampqAGtrawBsbGwAbW1tAG5ubgBvb28AcHBw'+
                 'AHFxcQBycnIAc3NzAHZ2dgB5eXkAfHx8AIeHhwCIiIgAjIyMAI6OjgCPj48Anp6eAKSkpACmpqYA'+
                 'p6enAKioqACpqakAqqqqAKurqwCtra0Arq6uAK+vrwCysrIAs7OzALS0tAC2trYAt7e3ALi4uAC5'+
                 'ubkAurq6ALu7uwC8vLwAvb29AMLCwgDDw8MAyMjIAMzMzADOzs4A0tLSANPT0wDY2NgA2dnZANvb'+
                 '2wDc3NwA3d3dAOHh4QDk5OQA5eXlAOfn5wDp6ekA7OzsAO7u7gDv7+8A8PDwAPLy8gDz8/MA9fX1'+
                 'APr6+gD7+/sA/Pz8AP39/QD+/v4A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAd3BbVlJWXnFkKCMmJSQkd3NUSU9QUU1bdlkhKSkmJCNqRFVTUU9RTXFxMisrKygkcUVQWllY'+
                 'Sk51dDstMCspJnVpTExOS0hqdWYuMjAuKyhTa3ZtY11vdnNBLzQyLy0qESI8QGF2dm1CLzc0NDIu'+
                 'KhwZDw9odWk9NDg4NTQyLy0YEjBDdXZfIDo4OTU1MS8sH1d0blZldkonOjk2NjM1LWV2bCoUG1x2'+
                 'SSE2NzQvIA12dkQTHxc/dnEVDA8OCQMAdHQ6GiAZPnZ2NwYJCAYDAnZyKR0gGEd1dC4HCggFBQFz'+
                 'dj0WHh9ndWILCAkJBwQDd3NgHxBGdW8jAAkICAcFd4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
                 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAAA='
        }
    };

    function getSearchLinks(songInfos){
        var actions = [];
        for (var site in sites) {
            var url = sites[site].url + encodeURIComponent(songInfos[0]);
            var a = $('<a/>').attr('href', url).attr('target', 'blank')
                        .append(
                            $('<img/>').attr('src', sites[site].img)
                        )
            actions.push(a);
        };
        return actions;
    }

    function getDownloadLink(url) {
        if (url.indexOf("http") != -1)
            return $('<a/>').attr('href', url).attr('target', 'blank').text('DL');
        else // not download, maybe fuzzSong or YouTube
            return $('<a/>');
    }

    window.addEventListener('load', function(){
        $('div.song').each(function(){
            var span = $(this).children('span:first');
            var songInfos = $(span).html().split(' – '); // not [-]
            var links = getSearchLinks(songInfos);

            var div_actions = $(this).parent().children('div.actions');
            var id = div_actions.attr('id').replace('tweem','').replace('actions','');
            var node = unsafeWindow.Blip.control._nodesById[id].data;
            links.push( getDownloadLink(node.url) );

            var ul = div_actions.children('ul');
            for (var i = 0; i < links.length; i++) {
                var li = $('<li/>').append(links[i]);
                ul.prepend(li);
            };
        });
    }, false);
})();
