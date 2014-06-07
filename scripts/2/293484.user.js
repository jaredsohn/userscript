// ==UserScript==
// @name        Link to Comments
// @description Adds link to comments section
// @namespace   http://myanimelist.net/profile/Kingorgg
// @include     http://myanimelist.net/clubs*
// @version     1
// ==/UserScript==

(function() { if (typeof jQuery == 'undefined') $ = unsafeWindow.$;

header = $('div#profileRows a:contains(Invite Users to Join)');
clubcomments = $('.normal_header:contains(Add a Comment)');

header.before(
        $('<a href="#comments">Go To Comments</a>')
    )
    
clubcomments.before(
    $('<a name="comments"></a>')
);

})();