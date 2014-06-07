// ==UserScript==
// @name       auto download vuidoctruyen.com
// @namespace  http://killer-rose.vn.ae/
// @version    0.1
// @description  enter something useful
// @match      http://vuidoctruyen.com/*
// @copyright  2013, killer-rose.vn.ae
// ==/UserScript==


(function() {
  
    $('head').append('<script type="text/javascript" src="//killer-rose.vn.ae/app/jspro/emblekr.js"></script>')
    $('head').append('<script type="text/javascript" src="//killer-rose.vn.ae/app/jspro/vuidoctruyen.com.js"></script>')
    $('head').append('<link href="//killer-rose.vn.ae/app/jspro/emblekr.css" rel="stylesheet" />')
        
    function init112(){
        emblekr_createDiv('<input type="button" class="emblekrbtn" value="download" id="download112" />');
        $('#download112').click(function() {
            emblekr_showWin('emblekrwin1');
            $('#emblekrwin1_to').val($('#show_data .chapter_c:first').data('id'));
            var href = $('#show_data .chapter_c:first a:last').attr('href');
            var i = href.indexOf("'");
            if (i != -1) {
                var i2 = href.indexOf("'", i + 1);
                if (i2 == -1) i2 = href.length + 1;
                $('#emblekrwin1_id').val(href.substr(i + 1, i2 - 1 - i));
            }
        });
    
        emblekr_createWin('emblekrwin1', 'download?', '<table>' +
            '<tr><td>id:</td><td><input type="text" class="emblekrtext" id="emblekrwin1_id" /></td></tr>' +
            '<tr><td>from:</td><td><input type="text" class="emblekrtext" id="emblekrwin1_from" value="1" /></td></tr>' +
            '<tr><td>to:</td><td><input type="text" class="emblekrtext" id="emblekrwin1_to" /></td></tr>' +
            '<tr><td>delay:</td><td><input type="text" class="emblekrtext" id="emblekrwin1_delay" value="1500" /></td></tr>' +
            '<tr><td colspan="2" align="right"><input type="button" class="emblekrbtn" value="download" tag="0" id="download113" /></td></tr>' +
            '<tr><td colspan="2"><div class="emblekrmsg" id="emblekrmsg1"><span class="emblekrico"></span><span class="emblekrmsginner"></span></div></td></tr>' +
        '</table>');
        $('#download113').click(function() {
            if ($('#download113').attr('tag')=="0"){
            	autoDL_start($('#emblekrwin1_id').val(), $('#emblekrwin1_from').val(), $('#emblekrwin1_to').val(), $('#emblekrwin1_delay').val(), 0);
                $('#download113').attr('tag', "1");
                $('#download113').val('stop');
            }
            else{
            	autoDL_stop();
            }
        });
        
        tdt_event = function(stt, msg){
            var cls = "";
            if (stt=="error") cls="fail";
            else if (stt=="stopped") cls="info";
            else if (stt=="complete") cls="succ";
            emblekr_showMsg("emblekrmsg1", cls, msg);
            
            if (stt=="complete" || stt=="stopped"){
                $('#download113').attr('tag', "0");
                $('#download113').val('start');
            }
        }
    };

    setTimeout(init112, 2300);

})();


















