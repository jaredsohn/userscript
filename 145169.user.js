// ==UserScript==
// @id             devidmarker
// @name           deviantArt ID marker
// @version        1.5
// @namespace      http://www.puramaldad.com/devidmarker
// @author         Willy Galleta
// @description    Marks specific users in the message center in group views.
// @include        http://my.deviantart.com/messages/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
// @run-at         document-end
// ==/UserScript==

function deserialize(name) {
  return eval(localStorage.getItem(name));
}

function serialize(name, val) {
  localStorage.setItem(name, uneval(val));
}

var badusers = deserialize('badusers');
var t;
if(badusers == null||badusers == false){badusers = [];serialize('badusers',badusers);}
if(eval(sessionStorage.badusers)){serialize('badusers',eval(sessionStorage.badusers));sessionStorage.badusers = false; badusers = deserialize('badusers');}
function intersect(a,b){
    r = [];
    for(x in a){
        if(b.indexOf(a[x])!=-1&&r.indexOf(a[x])==-1){r.push(a[x])}
    }
    r.sort()
    return r;
};
function recurr(){
    if($('.banButton').length!=$('.mcbox-thumb').length){
        $('.markedUser').removeClass('markedUser');
        $('.URBan').removeClass('URBan');
        mix = intersect(badusers,$('div.stream div[username]').map(function(){return $(this).attr('username').toLowerCase()}).get());
        for(u in mix){
            $('div.stream div[username]').filter(function(index){return $(this).attr('username').toLowerCase() == mix[u].toLowerCase()}).parents(".mc-ctrl").addClass('markedUser');
        }
        $('.mcbox-thumb .mc-ctrl').each(function(){if(!$(this).find('.banButton').length){$('<span class="banButton"></span>').prependTo($(this)).click(banThis)}});
        if(badusers.indexOf($('#artist-comments a.u').eq(0).text().toLowerCase())!=-1){$('#artist-comments a.u').eq(0).addClass('URBan');}
        if($('.username-link').length!=$('.mcbox-thumb').length){
            $('.mcbox-thumb .mcb-line').each(function(){
                u=$(this).parents('.mc-ctrl').find('[username]').attr('username');
                if(!$(this).parents('.mc-ctrl').find('.username-link').length&&$(this).parents('.mc-ctrl').find('.mcb-who a.u').text()!=u){
                    $('<span> by </span><a class="username-link" href="http://'+u+'.deviantart.com/">'+u+'</a>').insertAfter($(this).find('.mcb-title'))
                };
            })
        };
    };
    if($('#artist-comments').length){
        if(!$('.banButton2').length){$('<span class="banButton banButton2"></span>').appendTo($('#artist-comments a.u').eq(0).parent()).click(banUser);}
    };
    clearTimeout(t);
    t = setTimeout(recurr,200);
};
function reset(){
    clearTimeout(t);
    recurr();
};
$(function(){
    $('head').append('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>');
    $('head').append('<style>#MarkList{overflow:auto;height:calc(100% - 20px);margin-bottom:3px;}#MarkList p{margin:1px;padding:0px;font-size:10px;}#MarkList p:hover{background-color:red;}'+
    '#MarkListDialog form,#MarkListDialog input{width:calc(100% - 30px);}.markedUser{box-shadow:0px 0px 8px 0px red;}'+
    '.banButton{width:15px;height:15px;background:red;border-radius:10px;position:absolute;top:4px;right:40px;}'+
    '.banButton2{background:red !important;right:0px;top:0px;}.URBan{text-shadow:0px 0px 3px red;}'+
    '.mcbox-thumb span.mcb-line{font-size:8pt !important;}</style>');
    recurr();
    $('body').append('<div id="MarkListDialog" title="Marked users"></div>')
    //openMarkList();
});
function openMarkList(){
    $('#MarkListDialog').dialog('close');
    $('#MarkListDialog').html('');
    $('#MarkListDialog').attr('title','Marked users ('+badusers.length+')');
    $('#MarkListDialog').append('<div id="MarkList"></div>');
    for(u in badusers){
        $('<p>'+badusers[u]+'</p>').appendTo('#MarkList').data('value',badusers[u]);
    }
    $('#MarkListDialog').append('<form><input type="text"/></form>');
    $('#MarkListDialog input').val($('#artist-comments a.u').eq(0).text());
    $('#MarkList p').click(clickOnList);
    $('#MarkListDialog form').submit(submitInput);
    $('#MarkListDialog').dialog({height:400});
};
function clickOnList(){
    //console.log($(this).data('value'));
    $('#MarkListDialog input').val($(this).data('value'))
    $(this).fadeOut();
    badusers.splice(badusers.indexOf($(this).data('value')),1);
    serialize("badusers",badusers);
    reset();
};
function submitInput(){
    userName = $('#MarkListDialog input').val().toLowerCase()
    $('<p>'+userName+'</p>').prependTo('#MarkList').click(clickOnList).data('value',userName);
    badusers.push(userName);
    badusers.sort();
    serialize("badusers",badusers);
    $('#MarkListDialog input').val('');
    reset();
    return false;
};
function banThis(){
    userToAdd = $(this).parents('.mc-ctrl').find('[username]').attr('username').toLowerCase();
    if(badusers.indexOf(userToAdd)==-1){
        badusers.push(userToAdd);
    }else{
        badusers.splice(badusers.indexOf(userToAdd),1);
    }
    badusers.sort();
    serialize('badusers',badusers);
    $(this).remove();
    reset();
};
function banUser(){
    userToAdd = $(this).siblings('a.u').text().toLowerCase();
    if(badusers.indexOf(userToAdd)==-1){
        badusers.push(userToAdd);
    }else{
        badusers.splice(badusers.indexOf(userToAdd),1);
    }
    badusers.sort();
    serialize('badusers',badusers);
    $(this).remove();
    reset();
};
GM_registerMenuCommand('Manage user markers',openMarkList);
$('body').keypress(function(event){if(event.keyCode==119&&!(event.shiftKey||event.ctrlKey||event.altKey)){openMarkList();}});