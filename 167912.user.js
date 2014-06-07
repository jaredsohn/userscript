// ==UserScript==
// @name       Pokemon Planet RPG Bot
// @namespace  http://userscripts.org/users/81733
// @description Auto Battler for Pokemon Planet RPG
// @version    0.1
// @match      http://pkmnplanet.net/rpg/battle.php
// @copyright  2013+, Flamescape
// @icon       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAQAAABHeoekAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAORJREFUGBkFwbFKAgEYAOBPAr0zT2wxEt3EB2nuIaIXCNqdAl9AobW2MrBSpDiaok3QhssGJWiuIXqBv+8jMdACAABNAxkc+nICAODYpyOAoTCWAEiMhREADYUwk4LUVHjTAICetTBXVTUTCl0AgJ618GguFLoAANBTCOFdFwCoS0BdLoRcBsr2gL5n+zK5sLIUcpmmJ+dAyaW1hbDS0bYUFj5c2QFI/AgbHdC2Eb4lAGXXwq+tA9Cy9SfcKkPFRHhQc+FFTc2rkV1z4U6FqTCRoqSvraUPUlNhxqkbCQAASN07+wdliU2+PJG43gAAAABJRU5ErkJggg==
// @license    Simplified BSD License
// ==/UserScript==

/*
    Copyright (c) 2012-2013, Flamescape
    All rights reserved.
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met: 
    
    1. Redistributions of source code must retain the above copyright notice, this
       list of conditions and the following disclaimer. 
    2. Redistributions in binary form must reproduce the above copyright notice,
       this list of conditions and the following disclaimer in the documentation
       and/or other materials provided with the distribution. 
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL FLAMESCAPE BE LIABLE FOR ANY DIRECT, INDIRECT,
    INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
    LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
    LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
    OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
    ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var w = (unsafeWindow||window);
var $ = w.jQuery;
$('head').append('<style>@-webkit-keyframes fl1k {0%{-webkit-transform:rotate(0deg);}50%{-webkit-transform:rotate(180deg) scale(0.2);}100%{-webkit-transform: rotate(360deg)}} @-webkit-keyframes fl2k {0%{-webkit-transform:rotate(10deg);}50%{-webkit-transform:rotate(-10deg);}100%{-webkit-transform: rotate(10deg)}} .fl1{-webkit-animation:fl1k linear 1s infinite;} .fl2{-webkit-animation:fl2k 1s infinite;} header h1 {height:70px;} .fsl { background: #3CB955; padding: 5px 10px; border-radius: 10px; margin: 0 10px 10px; font-size: 12pt; font-family: Arial; cursor:pointer; } .hooked {outline: 1px dashed #999;}</style>');

var getImageB64 = function(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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