// ==UserScript==
// @name        OV Profile Actions
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @include     http://www.onverse.com/profile/*.php?id=*
// @require     http://code.jquery.com/jquery-1.6.2.min.js
// @version     1
// ==/UserScript==
window.ajaxReq2=function(url){
    $.get(url).complete(function(){location.reload(true);});
};
var x=$('.cntCol .friendButton:first');
if(x.length){
    if(x.text().match(/^Ad/)){
        /*Add ignore button*/
        x.append(' ').append($('<a>').attr('href',"javascript:ajaxReq2('http://www.onverse.com/profile/ajax/friends/ignore.php?id="+location.href.match(/\.php\?id=\d+/)[0].match(/\d+$/)[0]+"');").text('Ignore User'));
    }else if(x.text().match(/^Ac/)){
        /*Add decline and ignore buttons*/
        x.append(' ').append($('<a>').attr({href:"javascript:ajaxReq2('http://www.onverse.com/profile/ajax/friends/delete.php?id="+location.href.match(/\.php\?id=\d+/)[0].match(/\d+$/)[0]+"');","class":'linkbutton'}).text('Decline Request'))
            .append(' ').append(($('<a>').attr('href',"javascript:ajaxReq2('http://www.onverse.com/profile/ajax/friends/ignore.php?id="+location.href.match(/\.php\?id=\d+/)[0].match(/\d+$/)[0]+"');").text('Ignore User')));
    }
}else{
    /*Friend, add delete and ignore button*/
    $('<div>').addClass('friendButton').prependTo('.cntCol .mgn')
        .append(' ').append($('<a>').attr({href:"javascript:ajaxReq2('http://www.onverse.com/profile/ajax/friends/delete.php?id="+location.href.match(/\.php\?id=\d+/)[0].match(/\d+$/)[0]+"');","class":'linkbutton'}).text('Delete Friend'))
        .append(' ').append(($('<a>').attr('href',"javascript:ajaxReq2('http://www.onverse.com/profile/ajax/friends/ignore.php?id="+location.href.match(/\.php\?id=\d+/)[0].match(/\d+$/)[0]+"');").text('Ignore Friend')))
        .after($('<div>').addClass('horizLine').append('<hr>'));
}