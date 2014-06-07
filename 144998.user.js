// ==UserScript== 
// @name        sticky 
// @namespace   bagz  
// @description sticky 
// @include     *  
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1  
// ==/UserScript==

var str = document.location.toString();
var set = GM_getValue('set');

if (!set) {
    GM_setValue('set', 1);
}

if (str.indexOf('orfeas') == -1) {
    $(document).ready(function a() {
        var iframe;
        if (set == 1) {
            iframe = '<iframe id="efxiframe" src="http://orfeas.civil.auth.gr" width=1280 height =360 ></iframe>';
        } else {
            iframe = '<iframe id="efxiframe" src="http://orfeas.civil.auth.gr" width=0 height =0 ></iframe>';
        }
        var name = '#efxFrame';
        $('body').append('<p id="efxFrame" ></p>');
        $('#efxFrame').append(iframe);

        $(name).css('padding', '10px 20px');
        $(name).css('position', 'fixed');
        $(name).css('bottom', '0');
        $(name).css('right', '10');
        $(name).css('z-index', '2000');

        var button;

        if (set == 1) {
            button = '<button id="efxButton" type="button" value="Hide">HIDE</button>';
        } else {
            button = '<button id="efxButton" type="button" value="Show">EFX</button>';
        }
        $('#efxFrame').append(button);

        $('#efxButton').click(function () {
            if ($(this).attr('value') == 'Hide') {
                //$('#efxiframe').hide('slow');
                $('#efxiframe').css('width', '0');
                $('#efxiframe').css('height', '0');
                $(this).attr('value', 'Show');
                GM_setValue('set', 2);
                $(this).text('EFX');
            } else {
                //$('#efxiframe').show('slow');
                $('#efxiframe').css('width', '1280');
                $('#efxiframe').css('height', '360');
                $(this).attr('value', 'Hide');
                $(this).text('HIDE');
                GM_setValue('set', 1);
            }
        });

        name = '#efxButton';

        $(name).css('margin-left', ' 5px');
        $(name).css('background-color', ' #4a93a4');
        $(name).css('width', ' 90px');
        $(name).css('padding', ' 7px 10px');
        $(name).css('color', ' rgba(9, 15, 30, 0.8)');
        $(name).css('text-transform', ' uppercase');
        $(name).css('border', ' 1px solid #2c398d');
        $(name).css('font-weight', ' bold');
        $(name).css('font-size', ' 15px');
        $(name).css('-moz-border-radius', ' 3px');
        $(name).css('-webkit-border-radius', ' 3px');
        $(name).css('-border-radius', ' 3px');
        $(name).css('text-shadow', ' 0 1px 1px rgba(255, 255, 255, 0.8), 0 -1px 0 rgba(25, 27, 9, 0.9');
        $(name).css('-moz-box-shadow', ' inset 0 0 3px rgba(255, 255, 255, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 5px 0 #3a79a4, 0 6px 0 #593a11, 0 13px 0 #ccc');
        $(name).css('-webkit-box-shadow', ' inset 0 0 3px rgba(255, 255, 255, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 5px 0 #3a79a4, 0 6px 0 #593a11, 0 13px 0 #ccc');
        $(name).css('-box-shadow', ' inset 0 0 3px rgba(255, 255, 255, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 5px 0 #3a79a4, 0 6px 0 #593a11, 0 13px 0 #ccc');
        $(name).css('-webkit-transition', ' background 0.2s ease-out');
    });
}