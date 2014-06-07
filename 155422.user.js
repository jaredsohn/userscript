// ==UserScript==
// @name        What.cd Last.fm Improved
// @description Turns the current text-of-wall implementation of Last.fm on profile pages into a more delicate solution.
// @include        http://what.cd/user.php?id=*
// @include        https://what.cd/user.php?id=*
// @include        https://ssl.what.cd/user.php?id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @grant          GM_info
// @version        0.9.2
// @author         What.cd build team
// @author         Etheryte
// ==/UserScript==
(function() {
    //GM cross-browser jQuery by Brock Adams, Erik Vergobbi Vold & Tyler G. Hicks-Wright.
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    // The guts of this userscript
    function main() {
        //this.jQ = this.jQuery = jQuery.noConflict(true);
        var div=jQ('#lastfm_div');
        var username = jQ('#lastfm_username').text();
        //Only work on profiles which have Last.fm
        if( div.length===1 ){
            //Change the div classes to match those of the other sidebar boxes
            div.removeClass("pad");
            div.addClass("box box_lastfm");
            //Remove the now-obsolete parent element
            div.parent().replaceWith(div);
            //Move the element to the sidebar, after the stats.
            div.insertAfter(".box.box_userinfo_stats");
            //Manage the contents, snafucate.
            var html = '<ul class="stats nobullet">'
            html += '<div class="head colhead_dark">Last.fm</div>'
            html += '<li>Username: '+username+'</li>';
            //Fetch the last played data from the already existing data for adding in later.
            var lastplayed = '<li>Last played: '+jQ(".lastfm_recent_tracks").children('ul').children().first().children().first()[0].outerHTML+' - '+jQ(".lastfm_recent_tracks").children('ul').children().first().children(':nth-child(2)')[0].outerHTML+'</li>'
            //How many entries to show per each category.
            var showcount = 3;
            //Get compatibility
            jQ.get('user.php?action=lastfm_compare_users&username=' + username, function (response) {
                //Get top artists, nested because I'm a lazy coder.
                jQ.get('user.php?action=lastfm_top_artists&username=' + username, function (response) {
                    //Fetch top albums, same note as before.
                    jQ.get('user.php?action=lastfm_top_albums&username=' + username, function (response) {
                        //Get top tracks.
                        jQ.get('user.php?action=lastfm_top_tracks&username=' + username, function (response) {
                            var json = JSON.parse(response);
                            var j = json['toptracks']['track'];
                            if (j != null) {
                                html += '<li>Top Tracks:</li><li><ul class="nobullet">';
                                var l;
                                if (j.length < showcount)
                                    l = j.length;
                                else
                                    l = showcount;
                                for (var i = 0; i < l; i++) {
                                    html += '<li><a href="torrents.php?searchstr=' + j[i]['artist']['name'] + '">' + j[i]['artist']['name'] + '</a> - <a href="torrents.php?searchstr=' + j[i]['name'] + '">' + j[i]['name'] + '</a></li>'
                                }
                                html += '</ul></li>';
                                //Close the surrounding box.
                                html += '</ul>'
                                div.html(html);
                            }
                            else {
                            }
                        });
                        var json = JSON.parse(response);
                        if (json != null && json['error']) {
                            html += '<li>'+json['message']+'</li>';
                        }
                        else if (json == null) {
                        }
                        else {
                            var j = json['topalbums']['album'];
                            html += '<li>Top Albums:</li><li><ul class="nobullet">';
                            var l;
                            if (j.length < showcount)
                                l = j.length;
                            else
                                l = showcount;
                            for (var i = 0; i < l; i++) {
                                html += '<li><a href="torrents.php?searchstr=' + j[i]['artist']['name'] + '">' + j[i]['artist']['name'] + '</a> - <a href="torrents.php?searchstr=' + j[i]['name'] + '">' + j[i]['name'] + '</a></li>'
                            }
                            html += '</ul></li>';
                            div.html(html+'<li>Loading...</li>');
                        }
                    }); 
                    var json = JSON.parse(response);
                    if (json != null && json['error']) {
                        html += '<li>'+json['message']+'</li>';
                    }
                    else if (json == null) {
                    }
                    else {
                        var j = json['topartists']['artist'];
                        html += '<li>Top Artists:</li><li><ul class="nobullet">';
                        var l;
                        if (j.length < showcount)
                            l = j.length;
                        else
                            l = showcount;
                        for (var i = 0; i < l; i++) {
                            html += '<li><a href="torrents.php?searchstr=' + j[i]['name'] + '">' + j[i]['name'] + '</a></li>'
                        }
                        html += '</ul></li>';
                        div.html(html+'<li>Loading...</li>');
                    }  
                }); 
                var json = JSON.parse(response);
                if (json != null && json['error']) {
                    html += '<li>'+json['message']+'</li>';
                }
                else if (json == null) {
                }
                else {
                    var j = json['comparison']['result'];
                    var a = j['artists']['artist'];
                    var compatibility = Math.round(j['score'] * 100);
                    var background;
                    if  (compatibility < 50){
                        background = 'rgb(255, '+Math.floor(255*compatibility/50)+', 0)'
                    } else {
                        background = 'rgb('+Math.floor((1-(compatibility-50)/50)*255)+', 255, 0)'
                    }
                    html += '<li>Compatibility: ' + compatibility + '%</li>';
                    html += '<li><div class="compatibilitybar_container" style="display: block; height: 5px; width: 100%; background: rgb(150, 150, 150);"><div class="compatibilitybar" style="display: block; height: 100%; width: '+compatibility+'%; background: '+background+';"></div></div></li>'
                    html += lastplayed;
                    html += '<li>Shared artists:</li><li><ul class="nobullet">'
                    var l;
                    if (a.length < showcount)
                        l = a.length;
                    else
                        l = showcount;
                    for (var i = 0; i < l; i++) {
                        html += '<li><a href="torrents.php?searchstr=' + a[i]['name'] + '">' + a[i]['name'] + '</a></li>'
                    }
                    html += '</ul></li>';
                    div.html(html+'<li>Loading...</li>');
                }
            });
            //Make sure all the fetched content is appended.
            div.html(html);
        }
    }

    // load jQuery and execute the main function
    addJQuery(main);
})();