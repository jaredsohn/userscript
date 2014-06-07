// ==UserScript==
// @name           1channel fix
// @namespace      fleshTH
// @description    1channel.ch fixing some things and adding new features
// @author         fleshTH
// @include        http://www.1channel.ch/*
// @include        http://www.1channel.li/*
// @version        0.4
// @run-at         document-end
// ==/UserScript==
/*****
    Bits of info:
        this script does not use jQuery. I really don't like it so i made a
        lite framework to deal with simple tasks.
        
        This userscript fixes some things with 1channel.ch as well as adds
        new features.

        
        List of features:
         0.4 -
        Added: ***EXPERIMENTAL**** "watched" "To Watched" image overlays
            when browsing items.
            
        fixed: minor bugs
    
         0.3  - 
		Fixed: auto=completer. 
		Added: hover menu item for TV shows to jump
			to the last episode.
		Fixed: fixed A few quirks in my framework.

         0.2 - 
		edited a few things and fixed cross browser compatibility.
                 Native chrome doesn't fully work yet, but TamperMonkey works.

         0.1

            * I added ajax requests to a lot of different things including
                ** Comment "thumbs up/down"
                ** Adding/deleting to/from favorites/To Watch/Watched

            * Adding to Favorites/To watch/Watched and playlists from the
                browse page using the youtube style 'hover menu'.
            
            * Added "Watched" button for tv episodes. This feature should not
                be 100% relied upon. This feature uses GreaseMonkey (or equivalent)
                storage and can be subject to lost data based on settings. The 
                information is not stored on the server, it is stored locally 
                by the extension. There is also a size limit (although i don't
                see that really being an issue, but it could) to storage in 
                some userscript extensions.
                
            * Added auto-complete to search inputboxes. This auto-complete feature
                is available natively on the site, but it's used only for searching
                in playlists so i added it to every page and normal search.
                
            * IMDb rating

                
                

    


*****/
(function ($) {


    var lobject = $('.logged_username a').get()
    if (!lobject) {
        $('.warning_message').append($('<div>').css({
            color: 'red'
        }).setText("You must be logged in for this userscript to work").get())
        return
    }
    var queryString = (function (s) {
        var q = s.split('?')[1]
        var qs = {}
        if (q) {
            q.split('&').forEach(function (o) {
                var t = o.split('=');
                qs[unescape(t[0])] = unescape(t[1])
            })
        }
        return qs
    })(document.URL)
    var groups = __getValue('groups');

    //   $('.header_search').swap($('.nav_tabs'))
    var uname = lobject.innerHTML;
    var DEBUG = false;
    var __groups = ['fav','towatch','watched'];
    if (!('watched' in groups) ) {
        set_up();
    }
    function set_up() { 

        $('<div>').attr('id','blanket').css({
            'position':'absolute',
            'backgroundColor':'#666',
            'opacity':'0.5',
            'left':'0px',
            'top':'0px',
            'width':'100%',
            'height':'100%'
        }).appendTo(document.body)
        $('<div>').attr('id','fs_info_box').css({
            'backgroundColor':'white',
            'width':'600px',
            'border':'1px solid black',
            'borderRadius': '20px',
            'margin':'auto',
            'height':'400px',
            'position':'absolute',
            'top':'25%',
            'left':'25%',
            'padding':'5px',
            'fontSize':'14px'
        }).setText('1channel.ch Fix needs to set up. We need to get the list of Watched To Watch and Favorite groups so when browsing you can see which are in what group.')
        .append($('<ul>').css({'padding':'50px'})
            .append($('<li>').attr('id','fav').setText('Favorites').append($('<b>')).append($('<progress>')))
            .append($('<li>').attr('id','watched').setText('Watched').append($('<b>')).append($('<progress>')))
            .append($('<li>').attr('id','towatch').setText('To Watch').append($('<b>')).append($('<progress>')))
        )
        .appendTo(document.body)
        $('#fs_info_box ul li').css({'opacity':'1'})
        $('#fs_info_box progress').attr('value','0').attr('max','100').css({'display':'block'});
        var _groups = ['fav','watched','towatch'];
        $(document.body).css({
            'overflowY':'hidden'
        })
        get_page();
        function get_page(page,n) {
            var page = page||_groups.shift()
            if (page) {
                groups[page] = groups[page]||[]
                var n = n||1
                var o = $('#'+page)
                _get('/profile.php?user='+uname+'&'+page+'=&page='+n,function(r) {
                    var s = r.responseText;
                    var tot = s.match(/\(( [1-9]\d* )\)<\/strong>/i) && RegExp.$1;

                    if (tot) {
                        var l_page = s.match(/&page=(\d+)"> >>/) && RegExp.$1

                        var done = !l_page
                        o.children('b',1).clear().setText(tot + " total items page: "+n+'/'+(l_page||n));
                        var reg = /class="index_item"> <a href="\/(?:tv|watch)-(\d+)/g,t
                        while ((t = reg.exec(s)) !== null) { 
//                            console.log("Group: '%s' Item: '%s'",page,t[1])
                              groups[page].push(t[1]);
                        }
                        o.children('progress',1).attr('max',l_page||n).attr('value',n)

                        if (done) {
                            get_page()
                        }
                        else {
                            get_page(page,++n)
                        }
                    }
                    else {
                        console.log(s)
                        o.children('b',1).clear().setText(' No Items');
                        o.children('progress',1).attr('value',100);
                        get_page()
                    }
                });
            }
            else {
                $('#fs_info_box').append($('<h1>').setText('DONE'));
                __setValue('groups',groups);
                setTimeout(function() {
                    $('#fs_info_box,#blanket').fadeOut(1,function() {
                        this.remove()
                        $(document.body).css({'overflow-y':'auto'});
                    });
                },1000)
            }
        }        
        
    }
    
    GM_addStyle('x-btn-icon { \
width: 11px;\
height: 13px;\
}\
.x-btn:active,.options_menu + .x-btn { \
border-color: #999 !important;\
background: #DDD !important;\
background-image: -moz-linear-gradient(top,#cccccc,#ffffff) !important;\
background-image: -webkit-gradient(linear,left top,left bottom,from(#cccccc),to(#ffffff)) !important;\
filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#cccccc,endColorStr=#ffffff) !important;\
opacity:1 !important\
}\
.x-btn:hover { \
border-color: #999;\
background: #F3F3F3;\
background-image: -moz-linear-gradient(top,#ffffff,#ebebeb);\
background-image: -webkit-gradient(linear,left top,left bottom,from(#ffffff),to(#ebebeb));\
filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ffffff,endColorStr=#ebebeb);\
outline: 0;\
-moz-box-shadow: 0 0 3px #999;\
-webkit-box-shadow: 0 0 3px #999;\
box-shadow: 0 0 3px #999;\
}\
.x-btn,.options_menu {\
padding: 0 .5em;\
height: 2.0833em;\
border: 1px solid #CCC;\
color: black;\
background: #F6F6F6;\
background-image: -moz-linear-gradient(top,#ffffff,#efefef);\
background-image: -webkit-gradient(linear,left top,left bottom,from(#ffffff),to(#efefef));\
filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ffffff,endColorStr=#efefef);\
-moz-border-radius: 3px;\
-webkit-border-radius: 3px;\
border-radius: 3px;\
white-space: nowrap;\
vertical-align: middle;\
cursor: pointer;\
overflow: visible;\
opacity:0;\
}\
.episode_prev_next button {\
padding:0 .5em;\
-moz-border-radius: 3px;\
-webkit-border-radius: 3px;\
border-radius: 3px;\
}\
.index_item:hover .x-btn,.featured_movie_item:hover .x-btn,.item_similar:hover .x-btn {\
opacity:1 !important;\
}\
.index_item {\
max-height:305px;\
min-height:305px;\
}\
.index_item img { \
display:block !important;\
width:150px;\
min-height:222px\
}\
.index_container { \
    \
}\
.options_menu { \
position: absolute;\
height: auto !important;\
width: auto !important;\
opacity:1 !important;\
top: 2.2em;\
list-style:none;\
width:100px;\
}\
\
.options_menu li:not(.label) { \
font-size: 12px;\
padding-left:5px;\
\
}\
.options_menu li:not(.label):hover {\
background-color: #EFFFEF;\
color:black;\
}\
.options_menu li {\
min-width:100px;\
}\
.options_menu li.label { \
font-size: 12px;\
color: white;\
padding:0px;\
background-color: #3c3c3c;\
height:10px\
line-height:20px;\
font-weight:bold;\
border:1px solid black;\
}\
.loader {\
opacity: .5;\
position:absolute;\
top:0;\
left:5;\
background-color:#EFEFEF;\
}\
.hide {\
display:none !important;\
}\
.comments_box_vote { position: relative; }\
#autoc {\
    position:absolute;\
    padding:3px;\
    border:2px solid black;\
    padding:5px;\
    background-color: #fff; \
    border: 2px solid #666;\
    border-top:none;\
   -webkit-border-radius: 0px 30px 30px;  \
   -moz-border-radius: 0px 30px 30px;  \
    border-radius: 0px 30px 30px;  \
   -webkit-box-shadow: 2px 15px 15px #888;  \
   -moz-box-shadow: 2px 15px 15px #888;  \
    box-shadow: 2px 15px 15px #888;\
    width: 320px;\
    z-index:200;\
    display:none;\
}\
#autoc li {\
\
 list-style: none;\
 background-color: white;\
 border: 1px solid #EEE;\
 color: black;\
 padding:2px;\
}\
#autoc li:first-child {\
border-top-right-radius: 30px;\
}\
\
#search_term:focus ~ ul {\
  display: block !important;\
}\
#autoc:hover {\
  display: block !important;\
}\
#autoc li:last-child {\
border-bottom-right-radius: 30px;\
border-bottom-left-radius: 30px;\
}\
#autoc li:hover,#autoc li.current {\
 background-color:#E8F0F4;\
}\
  ');
    var waiting_image = "data:image/gif;base64,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%3D%3D"
    var host = window.location.host;

    var show_menu = false

    function kill_menu(n) {
        
        setTimeout(function () {
            if (show_menu) return show_menu = false
            $('.options_menu').remove()
        }, 10);
    }
    $('body').listen('click', kill_menu);

    $('.search_container').css({
        'position': 'relative'
    }).append($('<ul>').listen('click', function (e) {
        $(e.currentTarget).clear()
    }).attr('id', 'autoc'));
    $('#search_term').listen(['keyup', 'focus'], function (e) {
        if ([40, 38].indexOf(e.keyCode) > -1) return
        clearTimeout(_alist_t);
        if (this.value.trim().length > 2) _alist_t = setTimeout(Alist, 50);
        if (this.value.trim() === "") $('#autoc').clear();

    }).listen('keydown', function (e) {
        switch (e.keyCode) {
        case 40:
            $('#autoc li.current').removeClass('current').nextSibling(1).addClass('current')
            $('#search_term').get().value = $($('#autoc li.current').get() || $('#autoc li:first-child').get()).addClass('current').get().textContent
            break;
        case 38:
            $('#autoc li.current').removeClass('current').previousSibling(1).addClass('current')
            $('#search_term').get().value = $($('#autoc li.current,#autoc li:last-child').get()).addClass('current').get().textContent
            break;
        }
    }).listen('click', function () {

    }).listen('keydown', function (e) {
        clearTimeout(_alist_t);
    });
    var _alist, _alist_t, _alist_o = {};

    function Alist() {
        try {
            _alist.abort()
        }
        catch (err) {}
        var value = $('#search_term').addClass('ac_loading').get().value.trim();
        if (_alist_o[value.toLowerCase()]) return Ac(_alist_o[value.toLowerCase()]);
        $('#search_term').addClass('ac_loading')
        _alist = new XMLHttpRequest();
        _alist.open('GET', '/_get_active_movies.php?all&limit=10&q=' + encodeURIComponent(value), true);
        _alist.onreadystatechange = function (e) {
            if (_alist.readyState === 4) {
                if (_alist.status === 200) {
                    $('#search_term').removeClass('ac_loading')
                    Ac((_alist_o[value.toLowerCase()] = _alist.responseText.trim().split(/\n/)))
                }
            }
        }
        _alist.send()
    }

    function Ac(l) {
        var ac = $('#autoc').clear()
        l.forEach(function (o) {
            ac.append($('<li>').setText(o).listen('click', function (e) {
                e.preventDefault()
                $('#search_term').get().value = this.textContent;
            }))
        });
    }
    function XmlhttpRequest(obj) {
        if (obj.url.indexOf("http://") === 0 && obj.url.indexOf('http://'+host) === -1) { 
            GM_xmlhttpRequest(obj)
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.open(obj.method, obj.url, true);
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4) {
                    obj.onload(xhr)                    
                }
            }
            xhr.send(obj.data||null)
        }

    }
    function _get(url, cb, postData, headers) {
        XmlhttpRequest({
            method: postData ? 'POST' : 'GET',
            url: url,
            data: postData,
            headers: headers || null,
            onload: function (r) {
                cb(r);
            }
        });
    }

    function do_watched(what, action, id, page) {

        var url = "/addto" + (page || "watched") + ".php?whattodo=" + what + "&action=" + action + "&id=" + id;
        do_action.call(this, url)

    }

    function do_action(url, cb) {
        
        if (!$(this).children('.loader').length) {
            $(this).append($('<div>').attr('class', 'loader hide').append($('<img>').attr('src', waiting_image).get()).get())
        }
        $($(this).children('.loader')[0]).show()
        _get(url, function (r) {
            var ok = get_ok(r.responseText);
            if (ok) {
                var m = url.split('?')
                var t = m[0].match(/addto(.*?)s?\.php/i) && RegExp.$1,q={}
                m[1].split("&").forEach(function(i) {
                    var v = i.split('=');
                    q[v[0]] = v[1];
                })
                var g = q['action'] || t;
                console.log(url,g,q);
                if (q['whattodo'] == 'delete') {
                    groups[g].splice(groups[g].indexOf(q['id']),1);
                    
                }
                else if(q['whattodo'] == 'add') {
                    if (g === 'watched' && (m = groups['towatch'].indexOf(q['id'])) > -1) {
                       groups['towatch'].splice(m,1);
                    }
                    groups[g].indexOf(groups[g]) === -1 && groups[g].push(q['id'])
                }
                __setValue('groups',groups);
            }
            $($(this).children('.loader')[0]).hide()
            $(this).append($('<div>').css({
                'backgroundColor': ok?'#EFFFEF':'red',
                "width": "100%",
                "position": "absolute",
                "top": "40%",
                "left": "0px"
            }).setText(ok || "An Error Occurred").get())
            if (cb) cb(ok)
        }.bind(this), null, {
            "Referer": document.URL
        });
    }

    function _menu(obj) {
        $('.options_menu').remove()
        var ul = $('<ul>').attr('class', 'options_menu')
        for (var i in obj) {
            if (/^wait/.test(i)) {
                var li = $('<li>').attr('class', 'wait').setText(i)
                ul.append(li)
                obj[i].call(null, li)
            }
            else {
                ul.append($('<li>').setText(i).attr('class', obj[i] ? '' : 'label').listen('click', typeof obj[i] == 'function' && obj[i]).get())
            }

        }
        return ul;
    }

    function build_menu(id) {
        // .bind(a)
        // look for playlists
        return _menu({
            "add To:": null,
            "To Watch": function () {
                do_watched.call(this, 'add', 'towatch', id)
            }.bind(this),
            "Watched": function () {
                do_watched.call(this, 'add', 'watched', id)
            }.bind(this),
            "Favorite": function () {
                do_watched.call(this, 'add', '', id, 'favs')
            }.bind(this),
            "wait1": function (xli) {
                if ('tv' in queryString || queryString['search_section'] == "2") {
                    xli.addClass('label').clear().setText('Go To:')
                    xli.insertAfter($('<li>').setText('Last Episode').listen('click', function (e) {
                        show_menu = true
                        $(e.target).clear().setText("Getting Last Page")
                        _get("/watch-" + id, function (r) {
                            var s = r.responseText,
                            t = /href="(.*?)"/g
                            if ((lI = s.lastIndexOf('tv_episode_item"> <a href="')) > -1) {
                                t.lastIndex = lI
                                var m = t.exec(s)

                                window.location.assign("http://" + host + m[1])
                            }
                            else alert('No Episodes Found') && kill_menu()
                        }.bind(this))
                    }.bind(this)).get())


                }
                else {
                    xli.remove()
                }
            }.bind(this),
            "Playlists": null,
            "wait2": function (xli) {
                xli.clear()
                xli.setText("waiting for playlists")
                var ul = xli.get().parentNode;
                var li = xli.get()
                _get('/playlists/' + uname, function (r) {
                    var t = r.responseText;
                    var reg = /"\/playlists\.php\?id=(\d+?)">([^<]+)<\/a>/g,
                        m
                    var has = false;
                    while ((m = reg.exec(t)) !== null) {
                        has = true
                        var pid = m[1];
                        var pname = m[2];
                        ul.insertBefore($('<li>').setText(pname).listen('click', function () {

                            do_action.call(ul.parentNode, 'http://' + host + '/playlists.php?user=' + uname + '&edit=' + pid + '&plistitemid=' + id + '&whattodo=add_existing')

                        }).get(), li)
                    }
                    if (!has) {
                        ul.insertBefore($('<li>').setText('No Playlists').get(), li)
                    }
                    xli.clear()
                });
/*
                _get('http://' + host + '/playlists.php?create', function (r) {
                    var s = r.responseText;
                    var n = s.match(/<input name="play_title".*?value"(.*?)"/)
                    xli.clear().setText((n && n[1]) || "Create New Playlist").listen('click', function (e) {
                        if (n) {
                            do_action.call(ul.parentNode, 'http://www.1channel.ch/playlists.php?plistitemid=' + id + '&whattodo=add')
                        } else {
                            show_menu = true
                            e.stopPropagation()
                            $(this).clear().append($('<input>').attr('placeholder', 'Type PlaylistName').listen('keypress', function (e) {
                                if (e.keyCode == 13) {
                                    //do_action.call(ul.parentNode, 'http://' + host + '/playlists.php?user=' + uname + '&edit=' + pid + '&plistitemid=' + id + '&whattodo=add_existing')
                                    _get('http://' + host + '/playlists.php?create', function (r) {
                                        if (r.responseText.match(/<input name="play_title".*?value"(.*?)"/)) {
                                            $(this).clear().setText(RegExp.$1);
                                            do_action.call(ul.parentNode, 'http://www.1channel.ch/playlists.php?plistitemid=' + id + '&whattodo=add', function () {
                                                show_menu = false
                                                kill_menu();
                                            })
                                        } else {
                                            alert('no');
                                        }
                                    }.bind(this), "play_title=" + encodeURIComponent(this.value) + "&type=1&play_submit=Search");
                                }
                            }))

                        }
                    })
                });
*/
            }.bind(this)


        });
    }


    function __getValue(key) {
        var s = GM_getValue(key);
        return (s && JSON.parse(s)) || {}
    }

    function __setValue(key, value) {
        setTimeout(function() {
            GM_setValue(key, JSON.stringify(value));
            },0);
    }

    function get_ok(txt) {
        return txt.match(/<div class='ok_message'>(.*?)<\/div>/i) && RegExp.$1

    }
    __groups.forEach(function(o) { if (o === 'fav') return
        var lists = groups[o].map(function(oo) {
            return 'a[href*="-'+oo+'-"] img';
        });
        var rib = (o === 'towatch' && 'to_watch') || o
        $(lists.join(',')).i(function(o) {
            var tt  = $(o)
            var im = tt.attr('src')
            if (im.indexOf('/images/ribbon') === -1) {
                tt.attr('height',tt.get().offsetHeight);                
                tt.attr('src','/images/ribbon_'+rib+'.png').css({'background':'url('+im+')'})
            }
        });
    });
    $('a[href*="http://www.imdb.com/title/"]').i(function (o) {
        _get(o.href, function (r) {
            var t = r.responseText,
                w, txt = 'xx'

            if (w = t.match(/href="ratings"   title="(\d+).*?([\d./]+)"/)) {
                //$('.movie_ratings').append($('<b>').setText('IMDb: ')).append($('<span>').setText(w[2] + ' ('+w[1]+')'))
                txt = w[2] + ' (' + w[1] + ')'
            }
            else {
                txt = "No Rating";
            }
            //$('.movie_ratings').append($('<b>').setText('IMDb Rating: ')).append($('<span>').setText(txt))
            $('.movie_info table tr:last-child').insertBefore($('<tr>').append($('<td>').attr('width', '80').append($('<strong>').setText('IMDb Rating:'))).append($('<td>').setText(txt)).get())

        });
    })
    $('a[href*="commentvote="]').listen('click', function (e) {
        e.preventDefault();
        do_action.call(this.parentNode.parentNode, this.href);


    });
    $('.favs_deleted a').listen('click', function (e) {
        e.preventDefault()
        do_action.call($(this).parent(1).parent(), this.href, function (ok, txt) {
            if (ok) {
                var t = $(this).parent(1).parent(1)
                var opts = {
                    prop: 'opacity',
                    from: 1,
                    to: 0,
                    time: .1,
                    delta: function (p) {
                        return 1 - Math.sin(Math.acos(p))
                    }
                }
                t.animate(opts).__registerListener('animationEnd', function () {
                    this.remove()
                })
            }
            else {
                alert("Could Not Complete Action");
            }
        }.bind(this))


    });
    $('.index_item,.featured_movie_item,.item_similar a').i(function (o) {

        $(o).css({
            'position': 'relative'
        }).append($('<button>').attr('class', 'x-btn').setText("+").css({
            "position": "absolute",
            "left": "0px",
            "top": "0px",
            "textSize": "2em"
        }).listen('click', function (e) {
            show_menu = true
            if (this.parentNode.tagName.toLowerCase() == 'a') {
                e.preventDefault()
            }

            var id = (this.parentNode.href || this.parentNode.querySelector('a').href).match(/(?:tv|watch)-(\d+)/)[1];
            this.parentNode.insertBefore(build_menu.call(o, id).get(), this)

        }).get());

    });
    $('.index_item + .clearer').remove();
    $('.pagination').css({
        'clear': 'both'
    })

    if (document.URL.match(/\/tv-(\d+).*?\/season-(\d+)-episode-(\d+)/i)) {

        var id = RegExp.$1,
            s = [Number(RegExp.$2), Number(RegExp.$3)].join("x");
        var tv = __getValue('watched');
        $('.episode_prev_next').append($('<button>').setText('Watched').listen('click', function () {
            var tv = __getValue('watched');
            if (!tv[id]) {
                tv[id] = {}
            }

            tv[id][s] = !tv[id][s];
            __setValue('watched', tv);
            this.style.backgroundColor = (tv[id] && tv[id][s]) ? "#EFFFEF" : "#FFF"
        }).css({
            backgroundColor: (tv[id] && tv[id][s]) ? "#EFFFEF" : "#FFF"
        }).get())


    }
    else if ($('.movie_navigation a').get() && $('.movie_navigation a').get().href.match(/\/tv-(\d+)/i)) {
        var id = RegExp.$1
        var tv = __getValue("watched");

        $('a[href*="/season-"]').i(function (o) {
            if (o.href.match(/\/tv-.*?\/season-(\d+)-episode-(\d+)/i)) {
                var s = [Number(RegExp.$1), Number(RegExp.$2)].join("x")
                if (tv[id][s]) {
                    o.parentNode.style.backgroundColor = "#EFFFEF !important"
                }
            }
        });
    }

})((function () {
    var __matches = (function () {
        var dE = document.documentElement
        return dE && dE.nodeType && (dE.matchesSelector || dE.webkitMatchesSelector || (dE.mozMatchesSelector &&
        function (sel) {
            return this.mozMatchesSelector(sel)
        }))
    })();
    var fs = function (m, el) { return new fs.fn(m,el) }
    fs.fn = function(m,el) {
            m = m || '';
            this.obj = []
            if (typeof (m) == 'object' && m.nodeType) {
                this.obj.push(m)
            }
            else if (m.match(/^<([^>]+)>$/)) {
                this.obj.push(document.createElement(RegExp.$1))
            }
            else {
                this.obj = Array.prototype.slice.call(m == '' ? [] : (el || document).querySelectorAll(m) || [], 0)
            }
            return this
        }
    fs.Extend = function (o) {
        for (var i in o) {
            fs.fn.prototype[i] = o[i];
        }
    }
    fs.isArray = function (o) {
        return typeof o === 'object' && o instanceof Array
    }
    fs.animate = function (opts) {

        var start = new Date
        var id = setInterval(function () {
            var timePassed = new Date - start
            var progress = timePassed / opts.duration

            if (progress > 1) progress = 1

            var delta = opts.delta(progress)
            opts.step(delta)

            if (progress == 1) {
                clearInterval(id)
                if (opts.onEnd) {
                    opts.onEnd()
                }
            }
        }, opts.delay || 10)

    }
    fs.Animate = {
        linear: function (p) {
            return p
        },
        circ: function (progress) {
            return 1 - Math.sin(Math.acos(progress))
        }
    }
    fs.isObject = function (o) {
        return typeof o.__isFSObject === 'function' && o.__isFSObject();
    }
    fs.fn.prototype = {
        toString: function() {
            return this.obj.toString()
        },
        matches: function (sel) {
            if (__matches) return __matches.apply(this.get(), [sel])
        },
        __isFSObject: function () {
            return this instanceof fs.fn
        },
        append: function (e) {
            e = fs.isObject(e) ? e.get() : e;
            this.get().appendChild(e);
            return this
        },
        insertBefore: function (e) {
            this.parent().insertBefore(fs.isObject(e) ? e.get() : e, this.get());
        },
        insertAfter: function (e) {
            this.parent().insertBefore(fs.isObject(e) ? e.get() : e, this.get().nextSibling)
        },
        loaded: function (cb) {
            this.listen('DOMContentLoaded', cb);
        },
        clear: function () {
            this.i(function (o) {
                while (o.firstChild) {
                    o.removeChild(o.firstChild)
                }
            });
            return this
        },
        get: function () {
            return this.obj[0];
        },
        appendTo: function (e) {
            if (typeof e === 'string') {
                e = $(e).get()
            }
            else if (fs.isObject(e)) {
                e = e.get()
            }
            e.appendChild(this.get());

        },

        children: function (sel,n) {
            var sel = sel || '*',
                cn = this.get().childNodes,
                length = cn.length,
                m = []
            for (var i = 0; i < length; i++) {
                if (cn[i].nodeType === 1 && fs(cn[i]).matches(sel)) m.push(cn[i])
            }
            if (n) { var x = fs('');x.obj = m;return x }
            return m;
        },
        listen: function (e, cb, cBool) {
            if (!fs.isArray(e)) {
                e = [e]
            }
            this.i(function (o) {
                e.forEach(function (ee) {
                    o.addEventListener(ee, function (e) {
                        cb.call(e.target || e.srcElement, e)
                    }, cBool || false)
                })
            });
            return this
        },
        i: function (cb) {
            for (var i = 0; i < this.obj.length; i++) {
                cb(this.obj[i]);
            }
            return this;
        },
        nextSibling: function (f) {
            var ns = this.get();
            while (ns && (ns = ns.nextSibling) && ns.nodeType != 1) {}
            return f ? fs(ns) : ns
        },
        previousSibling: function (f) {
            var ps = this.get();
            while (ps && (ps = ps.previousSibling) && ps.nodeType != 1) {}
            return f ? fs(ps) : ps
        },
        parent: function (n) {
            var p = this.get().parentNode
            return n ? fs(p) : p
        },
        parents: function (until) {
            var m = fs('');
            m.obj = []
            var o = this.get();
            var p
            while ((o = o.parentNode) && ((until && !fs(o).matches(until)) || !until)) m.obj.push(o);

            return m;
        },
        attr: function (a, s) {
            if (s == null) {
                return this.get().getAttribute(a)
            }
            else {
                this.i(function (o) {
                    o.setAttribute(a, s)
                });
            }
            return this;
        },
        setText: function (t) {
            this.i(function (o) {
                o.appendChild(document.createTextNode(t));
            });
            return this
        },
        toggle: function (cn, bool) {
            this.i(function (o) {
                if (typeof (bool) === "boolean") {
                    if (bool) o.classList.add(cn)
                    else {
                        o.classList.remove(cn)
                    }
                }
                else {
                    o.classList.toggle(cn || "hide")
                }
            });
            return this
        },
        addClass: function (cn) {
            this.i(function (o) {
                o.classList.add(cn)
            });
            return this
        },
        removeClass: function (cn) {
            this.i(function (o) {
                o.classList.remove(cn)
            });
            return this
        },
        __listener: {},
        __registerListener: function (evt, cb) {
            this.__listener[evt] = this.__listener[evt] || [];
            this.__listener[evt].push(cb);
        },
        __fireListener: function (evt, cb) {
            if (this.__listener[evt]) {
                this.__listener[evt].forEach(function (o) {
                    o.call(this)
                }, this);
            }
        },
        animate: function (aopts) {
            var a = aopts.to - aopts.from;

            fs.animate({
                delay: 10,
                duration: (aopts.duration || 1) * 1000,
                // 1 sec by default
                delta: aopts.delta || fs.Animate.linear,
                step: function (delta) {
                    var p = aopts.from + (a * delta) + (aopts.unit || '');
                    var o = new Object();
                    o[aopts.prop] = p;
                    this.css(o)
                }.bind(this),
                onEnd: function () {
                    this.__fireListener('animationEnd');
                }.bind(this)
            });
            return this
        },
        fadeOut: function (time, cb) {
            if (cb) {
                this.__registerListener('animationEnd', cb)
            }
            this.animate({
                prop: 'opacity',
                duration: time,
                from: 1,
                to: 0
            });
        },
        remove: function () {
            this.i(function (o) {
                o.parentNode.removeChild(o);
            });
        },
        hide: function () {
            this.addClass('hide');
        },
        show: function () {
            this.removeClass('hide');
        },
        is: function (sel) {
            this.obj = this.obj.filter(function (o) {
                return fs(o).matches(sel);
            });
            return this
        },
        computed: function (attr) {
            return document.defaultView.getComputedStyle(this.get(), null).getPropertyValue(attr);
        },
        __getWH: function (s) {
            var c = parseFloat(this.computed('width'));
            var opts = ['margin-left', 'margin-right', 'border-left-width', 'border-right-width'];
            for (var i = 0, length = opts.length; i < length; ++i) {
                c -= parseFloat(this.computed(opts[i]));
            }
            return c;
        },
        width: function (n) {
            if (n != null) {
                this.css({
                    width: parseFloat(n) + "px !important"
                });
            }
            else {
                return this.__getWH('w');
            }
        },
        swap: function (el) {
            var o = (el instanceof HTMLElement ? $(el) : el)
            var c = o.clone()
            var p = this.clone();
            o.replace(p);
            this.replace(c)
            return this

        },
        replace: function (el) {
            var o = (fs.isObject(el) ? el.get() : el)
            this.parent().replaceChild(o, this.get())
        },
        clone: function () {
            return this.get() && this.get().cloneNode(true)
        },
        css: function (s) {
            this.i(function (o) {
                for (var i in s) {
                    try {
                        o.style[i] = s[i]
                    }
                    catch (err) {}
                }
            });
            return this
        },
        count: function () {
            return this.obj.length;
        }
    }
    return fs
})());