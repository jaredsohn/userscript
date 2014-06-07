// ==UserScript==
// @name        cancan auto poster
// @namespace   http://userscripts.org/users/386397
// @description cancan auto comment poster
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-2.0.2.min.js
// @include     http://www.cancan.ro/*
// @version     1.6
// ==/UserScript==

var counter = GM_getValue('counter', 0),
    autopost = GM_getValue('autopost', false);
    loc = window.location.pathname.split('/'),
    allowed = ['actualitate', 'life-style', 'showbiz-intern', 'showbiz', 'multimedia', 'sport'];
    
GM_setValue('counter', ++counter);

console.log('This script has been run ' + counter + ' times.');

if (typeof(loc[1]) !== 'undefined' && allowed.indexOf(loc[1]) >= 0 && loc.length > 2) {
    var menuCss = {
        "width" : "240px", 
        "padding" : "5px 10px",
        "position" : "fixed", 
        "left" : "10px", 
        "top" : "10px",
        "background" : "#f3f3f3",
        "border" : "1px solid #9f9f9f",
        "border-radius" : "10px",
        "box-shadow" : "0 0 15px rgba(0,0,0,0.15)"
    };

    console.debug('start: add css');

    var history = JSON.parse(GM_getValue('history', JSON.stringify([])));

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://raw.github.com/vrtxf/FCCP/master/bootstrap/css/bootstrap.min.css?" + new Date().getTime(),
        onload: function(response) {
            var css = response.responseText + '.container:before, .container:after{display:none;}';
            
            $('#article_container, #Header_Group, #site').width(1000);
            $('#article_content').width(680).css('margin', 0);
            $('#right_column_group').width(300);
            GM_addStyle(css);
            console.debug('done: add css');
            
            if (autopost) {
                setTimeout(function(){
                    $('button#message-submit', menu).trigger('click');
                }, 2000);
            }
        }
    });

    var site = $('div#site'),
        menu = $(document.createElement('div')).css(menuCss).html('<form><fieldset><legend>Form details</legend><label>Name:</label><input type="text" placeholder="" value="' + GM_getValue('formName', '') + '"><span class="help-block">Enter the name you want to post by.</span><label>Message</label><textarea>' + GM_getValue('formMessage', '') + '</textarea><span class="help-block">Enter the message you want to post.</span><button type="submit" class="btn btn-primary" id="message-save">Save</button>   <button type="submit" class="btn" id="message-submit">Send</button>   <button type="submit" class="btn btn-' + (autopost ? 'success' : 'warning') + '" id="autopost-submit" data->Autopost <span>o' + (autopost ? 'n' : 'ff') + '</span></button></fieldset></form>').appendTo(site),
        clearfix = $(document.createElement('div')).css('clear', 'both').appendTo(site);

    $('button#message-save', menu).click(function(){
        var t = $(this),
            i = $('input', menu)
            m = $('textarea', menu),
            a = $('input#articleId', site);
        
        GM_setValue('formName', i.val());
        GM_setValue('formMessage', m.val());
        
        alert('Info saved');
                    
        return false;
    });
      
    $('button#message-submit', menu).click(function(){
        var t = $(this),
            i = $('input', menu)
            m = $('textarea', menu),
            a = $('input#articleId', site);
        
        GM_setValue('formName', i.val());
        GM_setValue('formMessage', m.val());

        if (typeof(a.val()) !== 'undefined') {
            /*if (history.indexOf(a.val()) >= 0) {
                alert('Comment already posted');
            } else {*/
                $.ajax({
                    type: "POST",
                    url: "http://www.cancan.ro/ajax/box/Article_Comments/ajaxAnonCommentProcess/?type=json",
                    data: {
                        "articleId" : a.val(),
                        "comment" : m.val(),
                        "guest" : i.val(),
                    },
                    success: function(response){
                        console.log(response);
                        
                        history.push(a.val());
                        
                        GM_setValue('history', JSON.stringify(history));
                        
                        alert('Comment added');
                    },
                    dataType: "json"
                });
            /*}*/
        }

        return false;
    });
    
    $('button#autopost-submit', menu).click(function(){
        var t = $(this),
            span = $('>span', t);

        if (autopost) {
            GM_setValue('autopost', false);
            this.className = 'btn btn-warning';
            span.text('off');
        } else {
            GM_setValue('autopost', true);
            this.className = 'btn btn-success';
            span.text('on');
        }
    });
}