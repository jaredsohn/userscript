// ==UserScript==
// @name           Quick Twitter in Tumblr Dashboard
// @namespace      http://creazy.net/
// @include        http://www.tumblr.com/*
// ==/UserScript==

(function(){

    var d = document;
    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var l = location;
    
    /**
     * escape HTML specialchars
     */
    function esc(str) {
        str = str.replace(/&/g,'&amp;');   // &
        str = str.replace(/</g,'&lt;');    // <
        str = str.replace(/>/g,'&gt;');    // >
        str = str.replace(/\"/g,'&quot;'); // "
        str = str.replace(/\'/g,'&#039;'); // '
        return str;;
    }

    /* Add update form */
    function addTwitterUpdateForm() {
        var posts = d.getElementById('posts').getElementsByTagName('li');
        var post_form = document.createElement('li');
        post_form.setAttribute('class','post same_user_as_last');
        post_form.innerHTML
            ='<div id="twitter_status_characters_remaining" class="post_controls">140</div>'
            +'<div class="post_info" style="color:#79848F;" id="twitter_status_label">What are you doing?</div>'
            +'<form method="post" action="/twitter/update">'
            +'<input type="hidden" name="redirect_to" value="/twitter" />'
            +'<input type="hidden" id="reply_to_tweet_id" name="reply_to_tweet_id" value="" />'
            +'<textarea name="twitter_status" id="twitter_status" class="text_field" style="width:484px;max-width:484px;max-height:50px;height:50px;"></textarea>'
            +'<div style="text-align:right;">'
            +'<input type="submit" value="Update" class="big_button" style="font-size:14px;font-weight:bold;height:30px;line-height:30px;margin:0px;width:100px;" />'
            +'</div>'
            +'</form>';
        d.getElementById('posts').insertBefore(post_form, posts[0]);
    }

    /* Add search form */
    function addTwitterSearchForm() {
        var sides = d.getElementById('right_column').getElementsByTagName('div');
        for ( var i=0; i<sides.length; i++ ) {
            if ( sides[i].getAttribute('class').indexOf('twitter') > -1 ) {
                sides[i].innerHTML
                    += '<div>'
                    +  '<form action="http://search.twitter.com/search" method="get" target="_blank">'
                    +  '<input name="q" type="search" value="" style="width:120px" />'
                    +  '<input type="submit" value="Search" />'
                    +  '</form>'
                    +  '</div>';
                break;
            }
        }
    }

    /* Add ReTweet form */
    function addReTweetButton() {
        var posts = d.getElementById('left_column').getElementsByTagName('li');
        for ( var j=0; j<posts.length; j++ ) {
            if ( posts[j].getAttribute('quicked') ) continue;
            RT = '';
            if ( posts[j].getAttribute('class') && posts[j].getAttribute('class').indexOf('post') > -1 && !posts[j].getAttribute('id') ) {
                is_twitter = 0;
                imgs = posts[j].getElementsByTagName('img');
                for ( var k=0; k<imgs.length; k++ ) {
                    if ( imgs[k].src == 'http://assets.tumblr.com/images/twitter_reply.png' ) {
                    imgs[k].chk = 1;
                        is_twitter = 1;
                        break;
                    }
                }
                
                if ( is_twitter ) {
                    RT = posts[j].innerHTML.replace(/(\t|\r\n|\r|\n|\s{2,})/g,' ');   // trim tab and CR/LF
                    RT = RT.replace(/(<div\sclass=\"post_controls\">.+?<\/div>)/,''); // remove post controls right above
                    RT = RT.replace(/(<div\sclass=\"post_info\">.+?<\/div>)/,'');     // remove post info left above
                    RT = RT.replace(/(<div.+?<\/div>)/,'');                           // remove other 'div's
                    RT = RT.replace(/(<\/?p>)/g,'');                                  // remove 'p's
                    RT = RT.replace(/(<blockquote>.+<\/blockquote>)/,'');             // remove blockquotes
                    RT = RT.replace(/@(<a\s.+?>(.+?)<\/a>):?/g,'@$2');                // unlink replays
                    RT = RT.replace(/(<a\s.*?href=\"(.+?)\".*?>.+?<\/a>)/g,'$2');     // back to tinyurl
                    RT = RT.replace(/(^\s{2,}|\s{2,}$)/g,'');                         // trim space

                    // Twitter Page
                    if ( posts[j].getElementsByTagName('div')[0].innerHTML.match(/twitter_reply\(\'(.+?)\'/) ) {
                        postedby = RegExp.$1;
                    }
                    // Dashboard
                    else if ( posts[j].getElementsByTagName('div')[0].innerHTML.match(/\/twitter\/reply\/(.+?)\//) ) {
                        postedby = RegExp.$1;
                    } else {
                        continue;
                    }

                    rtscript
                        = 'javascript:'
                        + 'document.getElementById(\'twitter_status\').value=\'RT @'+postedby+': '+RT+'\';'
                        + 'location.hash=\'twitter_status\';'
                        + 'void(0);';

                    rttag = d.createElement('a');
                    rttag.setAttribute('href',rtscript);
                    rttag.setAttribute('title','ReTweet');
                    rttag.innerHTML = 'RT';
                    posts[j].getElementsByTagName('div')[0].insertBefore(
                        rttag,
                        posts[j].getElementsByTagName('div')[0].getElementsByTagName('a')[1]
                     );
                }
                posts[j].setAttribute('quicked',1);
            }
        }
    }

    /* counter for update form */
    function countCharactersRemaining() {
        var value   = document.getElementById('twitter_status').value;
        var counter = document.getElementById('twitter_status_characters_remaining');
        counter.style.color = '#a8b1ba';
        
        if (value.length) {
            counter.innerHTML = 140 - value.length;
            if (140 - value.length < 0) {
                counter.style.color = '#c00';
            } else if (140 - value.length <= 10) {
                counter.style.color = '#D6850B';
            }
        } else {
            counter.innerHTML = 140;
        }
    }

    function changeTwitterLogo() {
        d.getElementById('logo').src = 'http://assets0.twitter.com/images/twitter_logo_header.png';
        d.getElementById('dashboard_twitter').style.background = '#9AE4E8 url(http://static.twitter.com/images/themes/theme1/bg.gif) no-repeat fixed left top';
    }


    /* add eventLister for cross browser */
    function _AddEventListener(e, type, fn) {
        if (e.addEventListener) {
            e.addEventListener(type, fn, false);
        }
        else {
            e.attachEvent('on' + type, function() {
                fn(window.event);
            });
        }
    }

    // Dashboard
    if ( l.pathname.match(/\/dashboard/) ) {
        addTwitterUpdateForm();
        addTwitterSearchForm();
        _AddEventListener(document.getElementById('twitter_status'),'keydown',countCharactersRemaining);
        addReTweetButton();

        // for Auto Pager
        var scrollHeight = d.documentElement.scrollHeight;
        _AddEventListener(
            d,
            'scroll',
            function(e){
                if(d.documentElement.scrollHeight - scrollHeight > 100){
                    scrollHeight = d.documentElement.scrollHeight;
                    addReTweetButton();
                }
            },
            false
        );
    }
    // Twitter
    else if ( l.pathname.match(/\/twitter/) ) {
        changeTwitterLogo();
        addTwitterSearchForm();
        addReTweetButton();

        // for Auto Pager
        var scrollHeight = d.documentElement.scrollHeight;
        _AddEventListener(
            d,
            'scroll',
            function(e){
                if(d.documentElement.scrollHeight - scrollHeight > 100){
                    scrollHeight = d.documentElement.scrollHeight;
                    addReTweetButton();
                }
            },
            false
        );
    }

})();