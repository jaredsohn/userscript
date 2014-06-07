// ==UserScript==
// @name        VKdisableSmiles
// @namespace   http://vk.com/~noSmiles
// @include     http://vk.com*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

GM_addStyle((<><![CDATA[
   img.emoji_css { background: url(/images/blank.gif) no-repeat; }
   #im_emoji_block, #im_smile { display: none !important; }
]]></>).toString());

(function(){

        var interval;

        jQuery.event.special.contentchange = {
        setup: function(){
            var self = this,
            $this = $(this),
            $originalContent = $this.text();
            interval = setInterval(function(){
                if($originalContent != $this.text()) {
                        $originalContent = $this.text();
                    jQuery.event.handle.call(self, {type:'contentchange'});
                }
            },100);
        },
        teardown: function(){
            clearInterval(interval);
        }
    };

})();

var smiles = {
'D83DDE0A':':)',
'D83DDE03':':D',
'D83DDE09':';)',
'D83DDE06':'xD',
'D83DDE1C':';P',
'D83DDE0B':';p',
'D83DDE0D':'8)',
'D83DDE0E':'B)',
'D83DDE12':':(',
'D83DDE0F':':]',
'D83DDE14':'3(',
'D83DDE22':":'-(",
'D83DDE2D':':_(',
'D83DDE29':':((',
'D83DDE28':':o',
'D83DDE10':':|',
'D83DDE0C':'3)',
'D83DDE20':'>(',
'D83DDE21':'>((',
'D83DDE07':'O:)',
'D83DDE30':';o',
'D83DDE32':'8|',
'D83DDE33':'8o',
'D83DDE37':':X',
'D83DDE1A':':*',
'D83DDE08':'>:)',
'2764':'<3',
'D83DDC4D':':like:',
'D83DDC4E':':dislike:',
'261D':':up:',
'270C':':v:',
'D83DDC4C':':ok:'
};

function smilesReplace() {
    $('.emoji').each(function(){
        var emoji = $(this).attr('emoji');
        if (smiles[emoji]) {
            $(this).replaceWith(smiles[emoji]);
	}
    });    
}

$('#im_rows').bind('contentchange', function() {
    smilesReplace();
});

setInterval(smilesReplace, 1000);