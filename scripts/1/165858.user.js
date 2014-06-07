// ==UserScript==
// @name        Cortex' Brain
// @namespace   cortexs-brain
// @include     http://metatalk.metafilter.com/*
// @version     0.1
// ==/UserScript==

function activate_cortex(){
    var comments = document.getElementsByClassName('comments');

    if(0 < comments.length){
        var comment = comments[0];
    } else {
        console.log('failure');
        return;
    }
    console.log(comment);

    var new_comment = document.createElement('div');
    new_comment.className = 'comments';
    new_comment.innerHTML = ('I see where you\'re coming from, but I really feel like you need to consider that <a href="http://www.foddy.net/Athletics.html">QWOP</a>.<br>' +
        '<span class="smallcopy">posted by <a target="_self" href="http://www.metafilter.com/user/7418">cortex</a> <a style="text-decoration:none;" class="staff" href="http://faq.metafilter.com/33/Who-is-in-charge-here-Are-there-admins-and-moderators-like-other-sites"><span class="staffp">(</span>staff<span class="staffp">)</span></a> at <a target="_self" href="/20481/Do-you-remember-my-favorite-Flash-game#871269">16:53</a> on March 22, 2011 <span id="fav6871269">[<a title="Save this comment as a favorite" target="_self" onclick="javascript:addFav(871269,20481,6,7418,\';6A668CC00DFC5735E2E4746EDE64981D\');return false;" id="plusminus6871269" href="#">+</a>]<span id="favmsg6871269"></span></span><span id="flag6871269">[<a class="flag" title="Flag this post" target="_self" style="font-weight:normal;" onclick="flagpost(871269,20481,6);return false;" href="#">!</a>]</span> </span>');

    console.log(new_comment);

    comment.parentNode.insertBefore(new_comment, comment);
    comment.parentNode.insertBefore(document.createElement('br'), comment);
}

activate_cortex();