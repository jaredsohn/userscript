// ==UserScript==
// @name       BnetLike
// @namespace  http://gm.bungie.co/
// @version    0.1
// @description  Allows you to like/dislike posts.
// @match      http://*.bungie.net/*
// @match      https://*.bungie.net/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012, ctjl96 & acnboy34
// @updateURL  http://gm.bungie.co/ctjl96/BnetLike.meta.js
// @downloadURL  http://gm.bungie.co/ctjl96/BnetLike.user.js
// @icon       http://gm.bungie.co/ctjl96/images/bnetlike/icon.png
// ==/UserScript==
(function () {
    
    function getCookie(name) {
        var results = document.cookie.match(name + '=(.*?)(;|$)');
        if (results) {
            return (unescape(results[1]));
        }
        else {
            return null;
        }
    }
    
    if (location.pathname.match(/posts\.aspx/i)) {
        function getPostIds() {
            f = [];
            for (i = 0; i <= 25; i++) {
                var j = null;
                if (i < 10 && document.getElementById('ctl00_mainContent_postRepeater1_ctl0' +i + '_ctl00_postControl_skin_hlAnchor')) {
                    j = document.getElementById('ctl00_mainContent_postRepeater1_ctl0' +i + '_ctl00_postControl_skin_hlAnchor').name;
                }
                if (i >= 10 && document.getElementById('ctl00_mainContent_postRepeater1_ctl' +i + '_ctl00_postControl_skin_hlAnchor')) {
                    j = document.getElementById('ctl00_mainContent_postRepeater1_ctl' +i + '_ctl00_postControl_skin_hlAnchor').name;
                }
                if (j) {
                    f.push(j);
                }
            }
            return f;
        }
        
        function generateURL() {
            j = getPostIds();
            k = 'http://gm.bungie.co/scripts/like/getlikes.php?posts=';
            for (i=0;i<j.length;i++) {
                k+= (j[i] + ',');
            }
            k = k.substr(0,k.length-1);
            return k;
        }
        
        $('.date').next().next().after('<li><span class="dislikeCount"></span><a class="dislike" style="height: 17px;width:13px;background-image: url(http://gm.bungie.co/ctjl96/images/bnetlike/dislike.png);cursor: pointer;"></a><span class="likeCount"></span><a class="like" style="height: 12px;width: 13px;background-image:url(http://gm.bungie.co/ctjl96/images/bnetlike/like.png);cursor: pointer;"></a></li>');
        
        function getPostId(tulips) {
            if (tulips.parentElement.previousElementSibling.previousElementSibling.firstElementChild) {
                var j = tulips.parentElement.previousElementSibling.previousElementSibling.firstElementChild.href;
            }
            if (j) {
                return j.slice(j.indexOf(/postid=/i.exec(j)[0]),j.indexOf('&',j.indexOf(/postid=/i.exec(j)[0]))).slice(j.slice(j.indexOf
                                                                                                                               
                                                                                                                               (/postid=/i.exec(j)[0]),j.indexOf('&',j.indexOf(/postid=/i.exec(j)[0]))).indexOf('=') + 1);
            }
            else if (j == null) {
                var z = tulips.parentElement.parentElement.parentElement.id;
                z = z.substring(0, z.indexOf('postactionsDiv')) + 'hlAnchor';
                z = document.getElementById(z).name;
                return z;
            }
            else {
                var q = '0';
                return q;
            }
        }
        
        function like (liketype, button) {
            s = {
                username: getCookie('BungieDisplayName'),
                postid: getPostId(button),
                type: liketype
            }
                e = $.ajax({
                    url: 'http://gm.bungie.co/scripts/like/bnetlike.php',
                    data: s,
                    crossDomain: true,
                    method: 'POST',
                });
        }
        
        function updateAll() {
            b = $.ajax({
                url: generateURL(),
                dataType: 'json',
                success: function (response) {
                    var s = getPostIds();
                    for (i = 0; i < s.length; i++) {
                        f = document.getElementsByName(s[i])[0].id;
                        f = f.substring(0, f.indexOf('hlAnchor')) + 'postactionsDiv';
                        f = document.getElementById(f).firstElementChild.lastElementChild;
                        f.firstElementChild.innerHTML = response[i].dislikes || response.dislikes || '0';
                        f.children[2].innerHTML = response[i].likes || response.likes || '0';
                        if (response[i].locked == true && f.lastElementChild.className) {
                            $(f.lastElementChild).after('<a style="height: 13px;width: 10px;background-image: url(http://gm.bungie.co/ctjl96/lockedIcon.png);cursor: default;"></a>');
                            $('.like')[i].style.opacity = '0.5';
                            $('.dislike')[i].style.opacity = '0.5';
                            $('.like')[i].style.cursor = 'help';
                            $('.dislike')[i].style.cursor = 'help';
                            $(document.getElementsByClassName('like')[i]).unbind();
                            $(document.getElementsByClassName('dislike')[i]).unbind();
                            $(document.getElementsByClassName('like')[i]).click(function() { alert('This post is locked. It can no longer be liked nor disliked.'); });
                            $(document.getElementsByClassName('dislike')[i]).click(function() { alert('This post is locked. It can no longer be liked nor disliked.'); });
                        }
                    }
                }
            });
        }
        
        if (getCookie('BungieDisplayName')) {
            $('.like').click(function() {
                like(1, this);
                updateAll();
            });
            
            $('.dislike').click(function() {
                like(2, this);
                updateAll();
            });
        }
        
        if (!getCookie('BungieDisplayName')) {
            var k = $('.like');
            var p = $('.dislike');
            for (i = 0; i < k.length; i++) {
                $(k).unbind();
                $(p).unbind();
                
                k[i].style.cursor = 'help';
                p[i].style.cursor = 'help';
                
                $(k).click(function () { alert('You must be signed in to use this feature.') });
                $(p).click(function () { alert('You must be signed in to use this feature.') });
            }
            updateAll();
        }
        updateAll()
    }
})();