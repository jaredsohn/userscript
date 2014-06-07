// ==UserScript==
// @name           Shitty Link Untagger
// @namespace      shoecream@luelinks.net
// @description    Gets rid of those ugly and stupid [MOVIE] etc tags in front of links. Editable whitelist.
// @include        http://links.endoftheinter.net/links.php?*
// @include        https://links.endoftheinter.net/links.php?*
// ==/UserScript==

// exact matches, case insensitive
// technical detail: compares using match.toLowerCase() === tag.toLowerCase()
var exact_matches = [];

// "exact phrase" regular expressions, case insensitive
// technical detail: /asdf/ becomes /^asdf$/i
// technical detail: for begins and ends with use /asdf.*/ and /.*asdf/
var regex_matches = []; 

// games
exact_matches.push('pc');
exact_matches.push('mac');
exact_matches.push('wii');
exact_matches.push('gamecube');
exact_matches.push('dreamcast');
exact_matches.push('dc');
regex_matches.push(/xbox.*?/);
regex_matches.push(/ps[x123]/);
regex_matches.push(/playstation[x123]/);
regex_matches.push(/n?ds/);
regex_matches.push(/gcn?/);

// optional sets, uncomment to whitelist

/* sports */
// exact_matches.push('soccer');
// exact_matches.push('mlb');
// exact_matches.push('baseball');
// exact_matches.push('nba');
// exact_matches.push('basketball');
// exact_matches.push('nfl');
// exact_matches.push('football');
// exact_matches.push('soccer');
// exact_matches.push('wrestling');
// exact_matches.push('mma');

/* misc */
// regex_matches.push(/(audio|e)?books?/);
// regex_matches.push(/comics?/);
// regex_matches.push(/soundtracks?/);
// exact_matches.push('ost');

/* pornography */
// regex_matches.push(/porno?/);
// exact_matches.push('hentai');
// exact_matches.push('gay porn');
// exact_matches.push('furry porn');
// exact_matches.push('gay furry porn');

/* irony */
// exact_matches.push('request');
// exact_matches.push('tv');
// regex_matches.push(/movies?/);
// exact_matches.push('music');

/* no user-servicable parts beyond this line */
///////////////////////////////////////////////

// transforms our regular expressions into case insensitive "exact" matches
regex_matches.forEach(function (ee, ii, aa) {
        var new_reg = '^' + ee.source + '$';
        aa[ii] = new RegExp(new_reg, 'i');
});

function filtration (token) {
    function eq(ee) { return (ee.toLowerCase() === token.toLowerCase()); }
    function rg(ee) { return ee.test(token); }
    return exact_matches.some(eq) || regex_matches.some(rg);
}

function each_row (row) {
    var anchors = row.getElementsByTagName('a');
    [].forEach.call(anchors, each_link);
}

function each_link (link) {
    if (/linkme\.php\?/.test(link.href)) {
        var obj = parse_link(link.textContent);
        obj.tokens = [].filter.call(obj.tokens, filtration);
        link.textContent = rebuild_title(obj);
    }
}

// given a parse_link object, rebuilds it into a single title string.
// does some normalization as well - [a][b][c] => [a/b/c]
function rebuild_title (title_obj) {
    var build = '';
    if (title_obj.tokens.length) {
        build += '[' + title_obj.tokens.join('/') + ']';
    }
    build += title_obj.title;
    return build;
}

// splits a link title into individual [tags] and a title
function parse_link (text) {
    var build = [];
    // regular expression splits a link into a [tags] and title portion
    var matched = text.match(/^((?:\s*[\[({][^\]})]+[\]})])+)(.+)/);
    if (matched) {
        // split a [tag1][tag2/tag3] into tag1,tag2,tag3
        var splat = matched[1].slice(1,-1).split(/\\|\/|]\[|\||,/);
        build = build.concat(splat);
        return {'tokens': build, 'title': matched[2]};
    } else {
        return {'tokens': [], 'title': text};
    }
}

var rows = document.getElementsByTagName('tr');
[].forEach.call(rows, each_row);
