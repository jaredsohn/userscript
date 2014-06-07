// ==UserScript==
// @name        Brilliant Baraholka
// @namespace   http://userscripts.org/users/Shtucer
// @description Коробка для правки постов
// @include     http://baraholka.leprosorium.ru/mod*
// @require     http://code.jquery.com/jquery-1.9.1.js
// @require     http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @downloadURL http://userscripts.org/scripts/source/176750.user.js
// @updateURL   http://userscripts.org/scripts/source/176750.meta.js
// @grant       all
// @version     1.5
// ==/UserScript==
//


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://baraholka.leprosorium.ru/css/main.css?rev=69';
document.getElementsByTagName("HEAD")[0].appendChild(link);

link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href='http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var buttons = ["http://pit.dirty.ru/lepro/2/2013/08/12/10405-190804-12ef983aba0848305442a16cf12f903b.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190813-be9eba5b79da3a56cddbf29d4bcbbbe0.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190850-7f7e9aa4e5bb3371da5520bea06e0b5f.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190734-f55d1376cd65f354d3142a48cf8b5686.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190830-cd33032777eadccb55db01a2f486f4b1.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190909-f17d0d01cb1ca91af736fc9964b5b41b.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190745-df1e5b343e33ed2e126dff179fc3495c.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190722-e9effeab6e22bd3573eae3e976cdeae7.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190838-594115f559abe199270d5aabd8bba47a.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-214156-4c701c97c4fd7ea91db1a20a926e9a2b.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190901-a5390175f3a8e4e2566f42271e1a666d.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190917-849ab594d4ac31360a793edc09ce054d.png",
"http://pit.dirty.ru/lepro/2/2013/08/12/10405-190821-0febbbb3f8e311b34ae7cbdb0277a54f.png"
];

var secret=$("input[name=wtf]").attr("value");
var new_editor=function(){/*
    <div class="editor" style="padding-left: 52px; width: 1000px;">
        <span id="mode">
            <input type="radio" name="post2do" value="edit" checked="checked" id="radio" /><label for="radio">Редактировать</label>
            <input type="radio" name="post2do" id="radio2" value="del" /><label for="radio2">Удалить</label>
        </span>
        <span class="btn-toolbar" id="format" style="width: 700px;">
            <a href="#" onclick="return insert_text('b');"><span><b>B</b></span></a>
            <a href="#" onclick="return insert_text('i');"><span><i>I</i></span></a>
            <a href="#" onclick="return insert_text('u');"><span><u>U</u></span></a>
            <a href="#" onclick="return insert_text('sup');"><span>x<sup>2</sup><span></a>
            <a href="#" onclick="return insert_text('sub');"><span>x<sub>2</sub></span></a>
            <a href="#" onclick="return insert_text('irony');"><span style="font-style:italic; color:#CC3333;">I</span></a>
        </span>
        <span id="moderate">
            <a href="#" onclick="return insert_text('h2');"><span style="color:#326CCD;">h2</span></a>
            <a href="#" onclick="return insert_text('moderator');"><span style="font-style:italic; color:#666666;">M</span></a>
        </span>
        <span id="service" >
            <a href="#" id="link" onclick="insert_link(); return false;">Link</a>
            <a href="#" id="image" onclick="insert_image(); return false;">Image</a>
            <a href="#" id="preview" >Чокаво</a>
            <a href="#" id="cartoons" >Модни картонки</a>
        </span>
        <div id="textarea" style="width: 700px; margin-right: 10px; float: left;">
            <textarea name="newbody" id="textarea2" style="resize: none; width: 100%; height: 500px;"></textarea>
            <p id="final_buttons"><span><a href="#" id="robot_rule"><span>Слава роботам!</span></a><input type="image" id="submit" src="http://img.dirty.ru/d3/yarrr.gif"><span></p>
        </div>
        <div id="cartoons-picker" style="width:280px;float: right; display: none;"></div>
        <div style="clear: both;"></div>
    </div>
*/}.toString().slice(14,-3);

new_editor = "<input type='hidden' name='wtf' value='" + secret +"' />" + new_editor;

var row = $('table').find($('tr')[1]);
row.attr('valign', 'top');
row.append($('<td class="buttons">'));
var column = $('td.buttons');

var post = $("#textarea2").val();

$('table').attr('width','800');
$('body').append($('<div>').addClass('post ord popup').css('width', '800px').html(post));
$('.popup').dialog({
    modal: true,
    width: 810,
    position: {my: "left top", at: "left top", of: window},
    autoOpen: false,
    show: 'fade',
    hide: 'fade',
    buttons: [
        {
            text: "Close",
            click: function() {$(this).dialog("close");}
        }
    ]
});

$('document').ready(function (){
    $('.wysiwyg').append($('<a>').attr('href', '#').text('Чокаво').click(
                                                                         function() {
                                                                             var newPost = $('#textarea2').val();
                                                                             $('.popup').html(newPost);
                                                                             $('.popup').dialog('open');
                                                                             return false;
                                                                         }
                                                                        ));

    for(var i = 0; i < buttons.length; i++)
    {
        $("#cartoons-picker").append($("<img>").attr("src", buttons[i]).css("max-width", "80px").click(function (){
            addCartoon(this);
        }));
    }
    $("#cartoons-picker>img").wrap($("<p>"));

    document.forms['modform'].elements['newbody'].onkeydown = function (e) {
            if (!e) e = window.event;
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 13 && validate(document.forms['modform'])) {
                document.forms['modform'].submit();
            }
        }
});

$("form").html(new_editor);
$("#mode").buttonset();
$("#format").buttonset();
$("#format span sup").css("vertical-align","text-top").css("font-size","x-small");
$("#format span sub").css("vertical-align","text-bottom").css("font-size","x-small");
$("#moderate").buttonset();
$("#service").buttonset();
$("#textarea2").val(post);
$("#submit").button();
$("#robot_rule").button();
$("#robot_rule").button("option", {icons: {primary: "ui-icon-gear"}, text: false});
$("#link").button("option", {icons: {primary: "ui-icon-link"}, text: false});
$("#image").button("option", {icons: {primary: "ui-icon-image"}, text: false});
$("#preview").button("option", {icons: {primary: "ui-icon-search"}, text: false});
$("#radio").button("option", {icons: {primary: "ui-icon-pencil"}, text: false});
$("#radio2").button("option", {icons: {primary: "ui-icon-trash"}, text: false});
$("#cartoons").button("option", {icons: {primary: "ui-icon-folder-collapsed"}, text: false});

$("#preview").click(
                    function() {
                        var newPost = $('#textarea2').val();
                        $('.popup').html(newPost);
                        $('.popup').dialog('option', 'buttons', [{text: "Close", click: function (){$(this).dialog('close');}}]);
                        $('.popup').dialog('open');
                        return false;
                    }
                   );

$("#cartoons").click(
                     function (){
                         $("#cartoons-picker").slideToggle("fast");
                     }
                    );

$("#robot_rule").click(
                        function (){
                            var post = "<div>" + $("#textarea2").val() + "</div>";
                            post = $.parseHTML(post);
                            
                            $($('img', post).filter(function (index){
                                
                               return !(buttons.indexOf($(this).attr('src')) >= 0 );
                            })).each(function (index, obj){
                                if(index > 0) {$(this).remove();}
                               
                                height = this.height;
                                width = this.width;
                                var ratio = Math.min(500/width, 500/height);
                                if(ratio < 1){
                                    $(this).attr({'width': width*ratio, 'height': height*ratio});
                                }
                            });
                            $('.popup').html($(post).html());
                            $('.popup').dialog('option', 'buttons', [
                                               {text: "Парсер молодец!", click: function () {$('#textarea2').val($(post).html()); $(this).dialog('close');}},
                                               {text: "Нифига, я сделаю лучше!", click: function () {$(this).dialog('close');}},
                                               ]);
                            $('.popup').dialog('open');
                            return false;
                        }
                       );

function addCartoon(crtn) {
    var post = '<div>' + $('#textarea2').val() + '</div>';

    var pst = $.parseHTML(post);
    $(pst).append($('<img>').attr('src', $(crtn).attr('src')));
    $('#textarea2').val($(pst).html());
}
