// ==UserScript==
// @name        Emotttek
// @namespace   http://www.wykop.pl/ludzie/kolakao/
// @description Duże ilości naraz emotków
// @uthor		kolakao
// @version     1.0.2
// @grant       none
// @include		http://www.wykop.pl/mikroblog*
// @include		http://www.wykop.pl/wpis*
// @include		http://www.wykop.pl/tag*
// @include		http://www.wykop.pl/ludzie*
// @include		http://www.wykop.pl/dodatki*
// @include		http://www.wykop.pl/wiadomosc-prywatna/konwersacja*
// @include		http://www.wykop.pl/link*
// ==/UserScript==

// Popełnione na szybko w godzinkę :] 

/*
                            (\. -- ./)
                        O-0)))--|     \                  EXTERMINATE!!!
                          |____________|
                           -|--|--|--|-
                           _T~_T~_T~_T_
                          |____________|
                          |_o_|____|_o_|
                       .-~/  :  |   %  \
                .-..-~   /  :   |  %:   \
                `-'     /   :   | %  :   \
                       /   :    |#   :    \
                      /    :    |     :    \
                     /    :     |     :     \
                 . -/     :     |      :     \- .
                |\  ~-.  :      |      :   .-~  /|
                \ ~-.   ~ - .  _|_  . - ~   .-~ /
                  ~-.  ~ -  . _ _ _ .  - ~  .-~
                       ~ -  . _ _ _ .  - ~
                                                                              */

btnEmo = '<div class="emotttek hid" style="border-top: 1px solid #DADADA !important; padding-top: 5px !important">' + 
	'<s>&#92;&#47;</s>' +
	'<b>( ͡° ͜ʖ ͡°)</b>' +
	'<b>( ͡º ͜ʖ͡º)</b>' + 
	'<b>( ͡° ʖ̯ ͡°)</b>' +
	'<b>( ˘ ³˘)❤</b>' + 
	'<b>ಥ_ಥ</b>' +
	'<b>~(=^‥^)/</b>' +
	'<b>◕‿◕ </b>' +	
	'<b>( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)</b>' + 
	'<b>(・へ・)</b>' + 
	'<b>ლ(ಠ_ಠ ლ)</b>' + 
	'<b>(╥﹏╥)</b>' + 
	'<b>(╯°□°）╯︵ ┻━┻</b>' + 
	'<b>(ʘ‿ʘ)</b>' + 
	'<b>(｡◕‿‿◕｡)</b>' + 
	'<b>ᕦ(ò_óˇ)ᕤ</b>' + 	
	'<b>ᕙ(⇀‸↼‶)ᕗ</b>' + 	
	'<b>﴾͡๏̯͡๏﴿</b>' + 	
	'<b>(✌ ﾟ ∀ ﾟ)☞</b>' + 
	'<b>ಠ_ಠ</b>' + 
	'<b>ლ(́◉◞౪◟◉‵ლ)</b>' + 
	'<b>ب_ب</b>' + 
	'<b>(∪_∪)｡｡｡zzz</b>' +
	'<b>(⌐ ͡■ ͜ʖ ͡■)</b>' + 	
	'<b>(ﾉ´ヮ´)ﾉ*:･ﾟ✧</b>' + 
	'<b>ᶘᵒᴥᵒᶅ</b>' + 
	'<b>ヾ(⌐■_■)ノ♪</b>' + 
	'<b>(⌒(oo)⌒)</b>' + 
	'<b>ᄽὁȍ ̪ őὀᄿ</b>' + 
	'<b>( ͡€ ͜ʖ ͡€)</b>' + 
	'<b>ヽ༼ຈل͜ຈ༽ﾉ</b>' +
	'<b>(。ヘ°)</b>' + 
	'<b>(︶︹︺)</b>' + 	 
	'<b>(ᵔᴥᵔ)</b>' +
	'<b>♥‿♥</b>' +
	'<b>٩◔̯◔۶</b>' +
	'<b>⊙﹏⊙</b>' +
	'<b>💋</b>' +
	'<b>☕</b>' +
	'<b>(ಥ﹏ಥ)</b>' +
	'<b>凸(-_-)凸</b>' +
	'<b>٩(⁎❛ᴗ❛⁎)۶</b>' +
	'<b>̿ ̿ ̿\'̿\'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/\'̿\'̿ ̿</b>' +
	'<b>(ノಠ益ಠ)ノ彡┻━┻</b>' +								 	 
	'<b>(¬‿¬)</b>' + 		
	'<b>(ง •̀_•́)ง</b>  '+
	'<u>?</u>' +
	'<style type="text/css">' +
	'.emotttek b, .emotttek u, .emotttek s {' +	
    'cursor: pointer;' +
    'font-family: Arial;' +
    'height: 25px;' +
    'padding-right: 8px;' +     
    'font-size: 10px;' +
    'line-height: 25px;' +    
    'display: inline-block;' +
    'font-weight: normal;' +	 	 	 	   
    '}' +
    '.emotttek b:hover {' +
    'color: red;' +
    '}' +
    '.emotttek u {'+
    'background-color: gray;' +
    'color: white;' +    
    'text-decoration: none;' +
    'padding: 0 3px 0 3px;' + 
	'float: right;' +   
    '}' +
    '.emotttek s {'+
    'background-color: gray;' +
    'color: white;' +    
    'text-decoration: none;' +
    'padding: 0 3px 0 3px;' +
    'margin-left: 0;' +
    'margin-right: 8px;' +		 
    '}' +    
    '.emotttek.hid {' +
    'height: 25px;' +
    'overflow: hidden;' +
    '}' +
    '</style>' +
	'</div>';

$('.addcommentin textarea, .addcomment textarea').after(btnEmo).css('min-height', '50px');
$(document).ready(function()
{
	$('.emotttek b').live('click', function()
	{
		var thiz = $(this);
		var el = thiz.parent().parent().find('textarea');
		el.val(el.val() + thiz.html()+' ' ).keyPress().focus();		                              	
	});
	$('.emotttek s').live('click', function()
	{
		$(this).parents('.emotttek').toggleClass('hid');	                              	
	});	
	$('.emotttek u').live('click', function()
	{
		alert('Nie dziaua? Męcz kolakao!');		                              	
	});		
});