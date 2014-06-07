// ==UserScript==
// @name        OV Friend Requests
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Accept/Decline all friend requests at once.
// @include     http://www.onverse.com/profile/friends.php
// @require     http://code.jquery.com/jquery-1.6.2.min.js
// @version     1.1
// ==/UserScript==
var x=$('.cntCol .dataSection:first .dataFrameHLFB');
if(x.length > 1) {
    x.hide();
    $('.cntCol .dataSection:first label')
        .after($('<div>').addClass('dataFrameHLFB')
            .append($('<div>').addClass('userEntry')
                .append('<label>You have '+x.length+' friend requests. </label>')
                .append($('<div>').css({float:'right',display:'inline-block'})
                    .html($('<font size="1">').append($.map(x.first().find('td:nth-child(2n) a:not(.user)'),function(a,i){
                        return $('<div>').append($('<a>').attr({"class":$(a).attr('class'),href:'javascript:ajaxReqAll('+i+');'}).text(($(a).text().indexOf(' ')==-1?$(a).text()+' ':$(a).text().match(/.+ /)[0])+'All')).html();
                    }).join(' '))).prepend('<a href="javascript:(function(){$(\'.dataFrameHLFB\').show();$(\'.showallbutton\').remove();})();" class="linkbutton showallbutton">Show All</a> ')
                )
            )
        );
}
window.ajaxReqAll=function(i){
    var x=$('.cntCol .dataSection:first .dataFrameHLFB')
        .first().remove().end().slice(1).find('p:nth-child(3) a:nth-child(5n+'+(i+1)+')');
    window.queu=$.map(x,function(a){
		if($(a).parents('.dataFrameHLFB').css('display')!="none")
			return [[$(a).attr('href').substring(20,$(a).attr('href').indexOf('\',\'')),$(a).attr('href').match('\',\'.+')[0].slice(3,-3)]];
    });
    k();k();k();k();
};
window.k=function(a){
    if(a)
        $('#'+a).remove();
    a=window.queu.shift();
    if(a){
        $.get(a[0]).complete(function(){k(a[1]);});
    }
}