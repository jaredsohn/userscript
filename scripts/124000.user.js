// ==UserScript==
// @name           Shit Reddit Says smileys over Reddit
// @description    use SRS smileys all over reddit, not just at /r/shitredditsays
// @include        http://www.reddit.com/r/*/comments/*
// @include        http://www.reddit.com/user/*
// @exclude        http://www.reddit.com/r/shitredditsays/*
// @version        2013-05-26
// ==/UserScript==

/*
  Note: this script is a Firefox adaptation of other scripts posted at http://www.reddit.com/r/fffffffuuuuuuuuuuuu/comments/ej2z4/make_rage_faces_all_over_reddit_not_just_in/
*/

function init()
{
    $.getJSON("/r/shitredditsays/about/stylesheet.json",
        function (json)
        {
            var html = {gt:'>',lt:'<',quot:'"',amp:'&'};
            var data = json.data.stylesheet
                .replace(/&([a-z]+);/g, function (g, entity) { return html[entity]; }) // unescape html
                .replace(/\n/g, ' ') // normalise whitespace
                .replace(/\/\*.*?\*\//g, ' '); // remove comments

            // get link styles
            var styles = [];
            var pos = 0, end = 0, i = 0;
            while ( ( pos = data.indexOf( "a[href=", end )) != -1 )
            {
                end = data.indexOf( "}", pos ) + 1;
                styles[i++] = data.slice( pos, end );
            }
            var insert = styles.join('\n');

            // put images into insert
            var images = json.data.images;
            var imagesMap = {};
            for (var i = 0; i < images.length; i++)
                imagesMap[images[i].name] = images[i].url;
            insert = insert.replace(/%%([^%\n\*]+)%%/g, function (g0, name) { return imagesMap[name]; });

            $('head').append( "<style type=\"text/css\" title=\"applied_subreddit_stylesheet\">" + insert + "</style>" );
        }
    );
}

function exec(fn)
{
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

exec(init);
