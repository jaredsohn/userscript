// ==UserScript==
// @name           FreeMobile Legacy Login Form
// @description    Permet de ne pas utiliser le clavier virtuel pour se logger à l'espace abonné de FreeMobile
// @version        20120225F
// @author         GCN - https://twitter.com/gilcn
// @license        GNU GPL
// @namespace      https://mobile.free.fr/
// @include        https://mobile.free.fr/moncompte/
// @include        https://mobile.free.fr/moncompte/index.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// @source         http://userscripts.org/scripts/show/126492
// @identifier     http://userscripts.org/scripts/source/126492.user.js
// @run-at         document-end
// ==/UserScript==



/**************
** Functions **
**************/
// https://raw.github.com/josefrichter/jquery-grayscale/master/js/grayscale.js
(function( $ ){
    $.fn.grayscale = function() {
        return this.each(function(){
            var $this = $(this);
            $this.load(function(){
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var imgObj = new Image();
                imgObj.src = $this.attr('src');
                canvas.width = imgObj.width;
                canvas.height = imgObj.height;
                ctx.drawImage(this, 0, 0);
                var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for(var y = 0; y < imgPixels.height; y++){
                    for(var x = 0; x < imgPixels.width; x++){
                        var i = (y * 4) * imgPixels.width + x * 4;
                        var avg = (imgPixels.data[i + 0] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                        imgPixels.data[i + 0] = avg;
                        imgPixels.data[i + 1] = avg;
                        imgPixels.data[i + 2] = avg;
                    }
                }
                ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
                $this.attr('src',canvas.toDataURL());
            });
        });
    };
})( jQuery );

function ident_encode_id() {
    var mapping = new Array();
    var digitsOrder = $('#digits_order').val();
    for (i = 0; i < digitsOrder.length; i++) {
        mapping[digitsOrder.substring(i, i+1)] = i;
    }

    var clearLogin = $('#ident_clear').val();
    var encoded = '';
    for (i = 0; i < clearLogin.length; i++) {
        encoded += mapping[clearLogin.substring(i,i+1)];
    }
    $('#ident_pos').val(encoded);
}



/****************
** Page tweaks **
****************/
// Add a new <input /> to the <form />
$('#ident_txt_identifiant').hide();
$('#ident_pos').parent().append('<input type="text" id="ident_clear" value="" name="login_clear" />');

// F*ck*ng keypad !
$('#ident_chiffre img').grayscale();
$('#ident_chiffre img').each(function() {
    $(this).removeAttr('onclick');
    $(this).attr('class', 'ident_chiffre_img');
});
$('#ident_chiffre').css({'width':'460', 'margin-left':'-12px'});
$('form br').first().hide();
$('form p').first().replaceWith('<p class="strong" style="display:none; margin-bottom:10px; color:green;">Entrez les chiffres tels qu\'ils apparaissent ci-dessous:</p>');
$('form p').first().fadeIn(1000);
$('form p').after('<input type="text" id="digits_order" value="" name="keypad_digits" autocomplete="off" style="margin-bottom:20px; width:300px; display:none" />');
$('form input').fadeIn(1000);

// Insert script name + version into the webpage
$('#ident_blocg').append('<p style="display:none; font-weight:bold; text-align:center;"><a href="http://userscripts.org/scripts/show/126492">'+GM_info.script.name+" - v"+GM_info.script.version+'</a></p>');
$('#ident_blocg p').fadeIn(2000);

// Bind Click Event
$('#ident_btn_submit').on('click', ident_encode_id);



// EOF - vim:ts=4:sw=4:et: