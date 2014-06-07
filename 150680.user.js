// ==UserScript==
// @name       Additional buttons for Lists, Posts and PMs
// @version    1.9
// @include      https://rateyourmusic.com/lists/new_item*
// @include      https://rateyourmusic.com/board_new_message?*
// @include      https://rateyourmusic.com/messages/compose?*
// @include      https://rateyourmusic.com/collection/*
// @include      http://rateyourmusic.com/collection/*
// @include      https://rateyourmusic.com/~*
// @include      https://rateyourmusic.com/list/*
// @exclude      https://rateyourmusic.com/collection/*/stag/*
// @exclude      http://rateyourmusic.com/collection/*/stag/*
// @grant        metadata
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require      http://github.com/brandonaaron/livequery/raw/master/jquery.livequery.js
// ==/UserScript==



var textArea;
if (document.URL.indexOf("/list/") > 0) {
    flag = document.getElementsByClassName('fav0')[0];
    if (flag != undefined) {
        listId = flag.getAttribute('id').split('_')[1]
    }
    textArea = 'comments_list_comments_s_c_'+listId;
    
    $('.commentbutton:eq(0)').parent().attr('style','height:75px;')
    $('#list_comments_dummybutton').attr('style','height:75px;width:100%;')
    
} else if (document.URL.indexOf("~") > 0) {
    userId = $('#shoutbox_assoc_id').val();
    textArea = 'comments_shoutbox_u_c_' + userId;
    $('.commentbutton:eq(0)').parent().attr('style','height:75px;')
    $('#list_comments_dummybutton').attr('style','height:75px;width:100%;')
} else {
    var boxTypes = ['msg_body', 'item_description','body'];
    i = -1;
    while (textBox == undefined && i < boxTypes.length) {
        i++;
        var textBox = document.getElementById(boxTypes[i]);
        textArea = boxTypes[i];
    }
}
if (textArea != undefined){addButtons(textArea)}

function editTextareaTwo(addBefore, addAfter) {
    var c = document.getElementById(textArea);
    if (document.selection) {
        var g = document.selection.createRange().text;
        c.focus();
        var e = document.selection.createRange();
        e.text = addBefore + g + addAfter
    } else {
        if (c.selectionStart | c.selectionStart == 0) {
            if (c.selectionEnd > c.value.length) {
                c.selectionEnd = c.value.length
            }
            var h = c.selectionStart;
            var b = c.selectionEnd + addBefore.length;
            c.value = c.value.slice(0, h) + addBefore + c.value.slice(h);
            c.value = c.value.slice(0, b) + addAfter + c.value.slice(b);
            c.selectionStart = h + addBefore.length;
            c.selectionEnd = b;
            c.focus()
        }
    }
}
function addButtons(prev) {
    msg_body = document.getElementById(prev);
    if ($('#'+prev)) {
        var btnContents = [['bold','strong','<b>B</b>'],['italic','emphasis','<i>I</i>'],['link','a_href','link']];
        var btnTemplate = '<a id="ID_HERE" href="javascript:void(0);" class="ratingbutton" title="ID_HERE"';
        btnTemplate += '>TEXT_HERE</a>';
        if (document.URL.indexOf("/board_new_message?") < 0){
            $.each(btnContents, function() {
                $('#'+prev).before(btnTemplate.replace(/ID_HERE/g,this[0]).replace('TEXT_HERE',this[2]))
                $('#'+this[0]).attr('onClick','return pnhEditTextarea(\''+prev+'\',\''+this[1]+'\')')
            });
        }
        if (document.URL.indexOf("~") < 0 && document.URL.indexOf("/list/") < 0) {
            $('#'+prev).before(btnTemplate.replace(/ID_HERE/g,'note').replace(/TEXT_HERE/g,'note'))
            $('#note').livequery('click', function(){editTextareaTwo('[note]','[/note]')}, false)
        }
        
        $('#'+prev).prev().before(btnTemplate.replace(/ID_HERE/g, 'spoiler').replace(/TEXT_HERE/g, 'spoiler'))
        $('#spoiler').livequery('click', function(){editTextareaTwo('[spoiler]','[/spoiler]')}, false)
        $('#'+prev).before(btnTemplate.replace(/ID_HERE/g, 'strikethrough').replace(/TEXT_HERE/g, '<s>S</s>'))
        $('#strikethrough').livequery('click', function(){editTextareaTwo('[s]','[/s]')}, false)                
        
        if (document.URL.indexOf("~") < 0 && document.URL.indexOf("/list/") < 0) {
            
            $('#'+prev).before('<select name="colour" id="colour_box">')
            $('#'+prev).before(btnTemplate.replace(/ID_HERE/g, 'colours').replace(/TEXT_HERE/g, 'colours'))
            $('#colours').livequery('click', function(){editTextareaTwo('[color '+$('#colour_box').val()+']', '[/color]')}, false)
            var colours = ['red', 'green', 'blue', 'purple', 'pink', 'skyblue'];
            $.each(colours, function(){$('#colour_box').append('<option value="'+this+'">'+this+'</option>')})
            
            $('#'+prev).before(btnTemplate.replace(/ID_HERE/g, 'rand_wi').replace(/TEXT_HERE/g, 'random wi: code')+'<br>')
            $('#rand_wi').livequery('click', function(){editTextareaTwo('', '[wi:' + Math.random().toString(36).replace(/[^a-z]+/g, '') + ']')}, false)
            
            
        }
    }
}
// FOR LISTS
if (document.URL.indexOf("/new_item") >= 0) {
    var previewButton = '<a href="javascript:void(0);" class="ratingbutton"';
    previewButton += ' onclick="previewO(\'item_description\')";>preview</a>';
    $("#item_description").prev().before(previewButton)    
    
    var previewArea = '<br><br><span style="font-size: large; font-weight: bold;">Preview</span>';
    previewArea += '<div style="padding:20px;border:#aaa 1px solid;"id="item_description_preview"></div>';
    $('#list_new_item_btn').after(previewArea)
}
// PM'S
if (document.URL.indexOf("rateyourmusic.com/messages/compose?") >= 0) {
    body = document.getElementById("body");
    body.parentNode.insertBefore(document.createElement('br'), body.previousSibling);
}
// COLLECTION BUTTONS
else if (document.URL.indexOf("rateyourmusic.com/collection/") >= 0) {    
    banner = document.getElementById('breadcrumb');
    if (banner) {
        var relTypes = [['bootlegs','typb'],['videos','typd'],['compilations','typc'],['eps','type'],['singles','typi'],['albums','typs']];
        var btnTemplate = '<a id="TYPEBtn" href="javascript:void(0);" class="printbutton" title="limit to TYPE only">TYPE</a>';
        //var btnTemplate = '<a id="TYPEBtn" href="javascript:void(0);" class="printbutton" title="limit to TYPE only">TYPE</a>';
        $.each(relTypes, function() {
            var rlsTypes = ["typi", "type", "typs", "typd", "typb", "typc"];
            var x = window.location.toString().split('/');
            for (var i = 0, j = rlsTypes.length; i < j; i++) {
                if (x[5].indexOf(rlsTypes[i]) >= 0) {
                    x[5] = x[5].replace(rlsTypes[i], this[1]);
                    break;
                }
            }
            if (x[5].indexOf(this[1]) < 0) {x[5] = x[5] + ',' + this[1]}
            if (!isNaN(x[6])) {if (parseInt(x[6]).length == x[6].length) {x[6] = ''}}
            if (!isNaN(x[7])) {if (parseInt(x[7]).length == x[7].length) {x[7] = '1'}}
            x = x.join("/");
            $('#breadcrumb').after(btnTemplate.replace(/TYPE/g, this[0], 3));
            $("#"+this[0]+'Btn').attr('href',x)
            //$("#"+this[0]+'Btn').bind('click', (function(n) {return function (e) {changeCollectionView(n)}})(this[1]), false);
        });
    }
}