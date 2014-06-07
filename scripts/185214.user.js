// ==UserScript==
// @name        Overdrive Search Fixer
// @namespace   http://contentreserve.com/
// @description Convert old search.overdrive links to contentreserve, and vice versa
// @include     http*://www.contentreserve.com/TitleInfo.asp?*
// @include     http*://*bibliotik.org/requests/*
// @include     http*://b*b*.org/requests.php?action=viewrequest&id=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// ==/UserScript==

// Old: http://search.overdrive.com/classic/TitleInfo.asp?TitleReserveID=CAPS-UUID&TitleFormatID=NUMBER
// New: http://www.contentreserve.com/TitleInfo.asp?ID={lowercase-uuuid}&Format=NUMBER

var uuid_re = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/i;

function cvt_link(ind, href) {
    return href
        .replace('//search.overdrive.com/classic/', '//www.contentreserve.com/')
        .replace('TitleReserveID=','ID=').replace('TitleFormatID=','Format=')
        .replace(uuid_re, function(m) {return '{'+m.toLowerCase()+'}';});
}

// Get plain (non-anonymized) links
$('a[href*="//search.overdrive.com/classic/TitleInfo.asp?"]').prop('href', cvt_link);

// Handle dereferer/anonymized links
$('a[href*="%2F%2Fsearch.overdrive.com%2Fclassic%2FTitleInfo.asp%3F"]')
    .prop('href', function(ind,href) {
        var parts = href.split('?');
        href = cvt_link(ind, decodeURIComponent(parts.slice(1).join('?')));
        return [parts[0], encodeURIComponent(href)].join('?');
    }
);

// Turn the "OverDrive Content Reserve" logo on contentresever pages into a
// link to search for the same book on search.overdrive.com

$('img[alt="OverDrive Content Reserve"]').wrap(
    $('<a target="_top"></a>').attr('href',
        location.href.replace('www.contentreserve.com/TitleInfo.asp?ID=',
                              'search.overdrive.com/search?q=')
    )
);
