// ==UserScript==
// @name       Megaplan url-o-images auto loader
// @namespace  http://dev.dalee.ru/
// @version    0.1.1.3
// @description  Useful inline image viewer for megaplan webui.
// @match      http://*megaplan*.ru/task*
// @copyright  2012+, Alex Yaroshevich <ya@dalee.ru>
// ==/UserScript==
var w = unsafeWindow;
(function($){
    var precache = [];
    var imgpopup = function (src) {
        var bg = $('<div style="background:rgba(0,0,0,0.5);position:fixed;left:0;top:0;width:100%;height:100%;z-index:10000;display:none;" />');
        var img = $('<div style="background:transparent url('+src+') no-repeat 50% 50%;position:absolute;width:100%;height:100%;" />');
        bg.appendTo(unsafeWindow.document.body).append(img);
        $('.b-autoimg').clearQueue().fadeOut(100);
        bg.fadeIn(200, function(){
            img.click(function(e){
                e.preventDefault();
                bg.clearQueue().fadeOut(200, function(){
                    img.remove();
                    bg.remove();
                    delete img;
                    delete bg;
                    delete precache;
                });
            });
        });
    }
    $('.comment-item, .task-card-statement').find('a[href$=.png],a[href$=.gif],a[href$=.jpg]')
        .each(function(i,a){
            var li=$(a).closest('.file-list-item'),
                ul=li.parent();
            li.remove();
            if (!ul.children().length) {
                ul.remove();
            }})
        
        .each(function(k,a){
            var i='autoimg'+Math.floor(100000+Math.random()*899999);
            $(a).data('imgid',i);
            $('<img style="position:absolute;border-radius:5px;border:3px solid #aaa;padding:3px;background-color:whitesmoke;display:none;position:absolute;z-index:9999;max-width:400px;max-height:300px" class="b-autoimg" />')
                .attr('id',i)
                .attr('src', $(a).attr('href'))
                .appendTo($(a));

        }).click(function(e){
            e.preventDefault();
            var src = $(this).attr('href');
            precache.push(new Image(src));
            imgpopup(src);

        }).mouseenter(function(e){
            $('.b-autoimg').clearQueue().fadeOut(100);
            $('#'+$(this).data('imgid')).fadeIn(200);

        }).mouseleave(function(e){
            $('.b-autoimg').clearQueue().fadeOut(100);
            $('#'+$(this).data('imgid')).fadeOut(200);
        });

    var firstField;
	if ((firstField = $('div.comment-form-field:first')).length > 0 && $('div.comment-form-field.field-work').length == 0) {
        w.sdf.jsManager.require( '/z/js/sdf/common/v/html/_js/jquery/jquery.ui.datepicker-sdf.js' );
        w.sdf.jsManager.require('/z/js/sdf/common/v/html/_js/jquery/jquery.ui.datepicker-modified.js');
        w.sdf.jsManager.require('/z/js/sdf/common/v/html/_js/jquery/i18n/jquery.ui.datepicker-ru.js');
        w.sdf.cssManager.require('/z/css/sdf/common/v/html/_css/jquery/jquery.ui.datepicker-sdf.css');
        var twentyDaysAgo = (new w.Date()), now = (new w.Date());
        twentyDaysAgo.setTime(Date.now()-20*86400*1000);
        var dp = $('<div class="comment-form-field field-work"><div class="comment-form-ttl"><div class="work-title">Потрачено часов</div><div class="work-date"><div class="wdt"><input id="dpx0123456789" name="model[WorkDate]" type="text" value="" /></div></div></div><div class="comment-form-inp"><div class="wdt"><input name="model[Work]" value="" style="" class="input-text work" /><div class="hint">Пример: 2 недели 3 дня, 4 дня 3 часа 30 минут, 2ч 15м</div></div></div><div class="help"></div></div>')
            .insertAfter(firstField);
        $(w).ready(function(){
            dp.find('#dpx0123456789').sdfDatepicker({"clearText":"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c","specifyTimeText":"\u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c \u0432\u0440\u0435\u043c\u044f","removeTimeText":"\u0443\u0431\u0440\u0430\u0442\u044c \u0432\u0440\u0435\u043c\u044f","initialDate":"2012-04-19","beautifulValue":"\u0441\u0435\u0433\u043e\u0434\u043d\u044f","required":true,"minDate":twentyDaysAgo.format('Y-m-d H:i:s'),"maxDate":now.format('Y-m-d H:i:s'),"time":null,"timeRequired":true,"timeOn":false,"minDateId":"","maxDateId":""});
        });
	}
})(w.jQuery);
