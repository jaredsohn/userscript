// ==UserScript==
// @name           Rage Faces all over Reddit
// @description    use rage face icons all over reddit, not just at /r/fffffffuuuuuuuuuuuu
// @include        http://www.reddit.com/r/*/comments/*
// @include        http://www.reddit.com/user/*
// @exclude        http://www.reddit.com/r/fffffffuuuuuuuuuuuu/*
// @version        2011-02-20
// ==/UserScript==

/* 
  Note: this script is a Firefox adaptation of other scripts posted at http://www.reddit.com/r/fffffffuuuuuuuuuuuu/comments/ej2z4/make_rage_faces_all_over_reddit_not_just_in/ 
*/    


// Load jQuery when it becomes available
function GM_wait() 
{  
    if ( typeof unsafeWindow.jQuery == 'undefined' )
    {
      window.setTimeout(GM_wait,100);
    } 
    else 
    {
      $ = unsafeWindow.jQuery;
      init();
    }
}

GM_wait();

function init() 
{
    $.get("http://www.reddit.com/r/fffffffuuuuuuuuuuuu/stylesheet.css",
        function(data) {
            var styles = [];
            var pos = 0, end = 0, i = 0;
            while ( ( pos = data.indexOf( "a[href=", end )) != -1 ) 
            {
                end = data.indexOf( "}", pos ) + 1;
                styles[i++] = data.slice( pos, end );
            }
            $('head').append( "<style type=\"text/css\" title=\"applied_subreddit_stylesheet\">" + styles.join("\n") + "</style>" );
        }
    );
}

