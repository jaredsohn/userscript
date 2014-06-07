// ==UserScript==
// @name       Herp Derp
// @namespace  http://reddit.com/u/neveroc
// @version    0.1
// @description  Removes the shit from the new google+ youtube comments
// @match      https://apis.google.com/*
// @copyright  2013+, NeverOC
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).on('ready', function() {
    $('.Ct').each(function() {
        var commentorig = $(this).html();
        comment = commentorig.split(' ');
        var comlen = comment.length;
        var i = 1;
        var newstr='';
        var herpderp =['herp','derp', 'herpy', 'HERP!', 'DERP?' 'derples'];
        while(i<comlen) {
            var randomnumber=Math.floor(Math.random()*herpderp.length)
            newstr = newstr+=herpderp[randomnumber]+' ';
            i++;
        }
        $(this).html('<div class="thiscomment" style="cursor:pointer;"><div class="origcomment" style="display:none;">'+commentorig+'</div><div class="herpcomment">'+newstr+'</div></div>');
    });
    $('.thiscomment').on('click', function() {
        if($(this).find('.origcomment').is(":visible")) {
            console.log('isvis');
        	$(this).find('.origcomment').hide();
        	$(this).find('.herpcomment').show();           
        } else {
       	 	$(this).find('.origcomment').show();
       		$(this).find('.herpcomment').hide();            
        }
        console.log(this);

    });
});
