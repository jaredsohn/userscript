// ==UserScript==
// @name       Asterisk User Portal html5 audio player
// @namespace  http://www.faithhack.com/
// @version    0.2
// @description  allow Asterisk User Portal to play with html5 player, found at   http://www.freepbx.org/forum/tips-and-tricks/greasemonkey-script-to-use-html5-audio-instead-of-quicktime-for-vms
// @match      http://*/recordings/index.php*
// @copyright  2014, Adam7288 
// ==/UserScript==
$( document ).ready(function() {
   
    $('#vmail_table tr').each(function() { 
        
        row = $(this);
        
        var link = $(this).find('td:eq(8) a').attr('href');
        var img = $(this).find('td:eq(7) a').first();
       
        img.removeAttr('onclick');
        
        img.click(function() {

            
            //delete any existing rows
            $('.playback_row').remove();
            
            //insert playback row
            row.after('<tr class="playback_row"><td colspan="9"><audio controls id="audio_player"><source src="' + link + '" type="audio/wav"></audio></td></tr>');
            $('#audio_player')[0].play();
        });  
    });
});