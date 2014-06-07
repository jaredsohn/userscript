// ==UserScript==
// @name       Pokemon Planet RPG Bot
// @namespace  http://userscripts.org/users/81733
// @description Auto Battler for Pokemon Planet RPG
// @version    0.1
// @match      http://pkmnplanet.net/rpg/battle.php
// @copyright  sssssssss

// ==/UserScript==


};

var spank = function() {
	$('input[value="Attack!"]:visible, input[value="Continue!"]:visible, input[value="Fight!"]:visible').click();
};
var respank = function() {
    $('a').filter(function(){return $(this).text().match(/Rebattle/i);}).click();
};
var breakCaptcha = function() {
    $('#siimage').addClass('fl1');
    var cform = $('#siimage').parents('form:first');
    cform.find('a, object').remove();
    cform.find('input[name="code"]').addClass('fl2').val('SOLVING...');

    $('#siimage').load(function(){
        var b64 = getImageB64($(this).get(0));
        
        (function(cb) {
            GM_xmlhttpRequest({method: 'POST', url:atob("aHR0cDovL2NhcHRjaGEubWlrdXNvLmNvbS9jYXB0Y2hhYjY0"),data:$.param({data:b64}),headers:{'Content-Type':'application/x-www-form-urlencoded'}, onload: function(r){
                if (r.status != 200) { cb(true); return; }
                cb(null, JSON.parse(r.responseText));
            }, onfail: function(r){
                cb(true);
            }});
        })(function(err, r){
            $('.fl1, .fl2').removeClass('fl1 fl2');
            cform.hide().fadeIn();
            cform.find('input[name="code"]').val(r.solution);
            setTimeout(function(){cform.submit();}, 1000);
        });
    });
};

var autoBattle = $('<label class="fsl"><input type="checkbox"> Enable Auto-Battler</label>').insertBefore('.sub-content').click(function(e){
    if ($(this).find('input').prop('checked')) { spank(); }
}).find('input');
var autoRebattle = $('<label class="fsl"><input type="checkbox"> Automatically Re-Battle Opponent</label>').insertBefore('.sub-content').find('input');

var hook = function() {
    var hookHandler = function(e){
        e.preventDefault();
        var method = ($(this).attr('method')||'').match(/post/i)?'post':'get';
        $('.sub-content').css('background','#666');
        $[method]($(this).attr('action')||$(this).attr('href')||w.location.href, $(this).is('form')?$(this).serialize():'', function(data){
            $('.sub-content').html($(data).find('.sub-content').html()).css('background','none');
            hook();
            if (autoBattle.prop('checked')) { spank(); }
            if (autoRebattle.prop('checked')) { respank(); }
            if ($('#siimage').length) { breakCaptcha(); }
        });
	};
    
    $('.sub-content form:visible').not('.hooked').addClass('hooked').submit(hookHandler);
    $('.sub-content a').not('.hooked').addClass('hooked').click(hookHandler);
};

hook();
if ($('#siimage').length) { breakCaptcha(); }