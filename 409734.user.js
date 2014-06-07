// ==UserScript==
// @name AlertChat
// @namespace InGame
// @author Odul
// @date 11/03/2014
// @version 1.05
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Firefox, Chrome
// ==/UserScript==

(function() {
    save = "";
	var audio = document.createElement('audio');
	audio.id='checkchat';
	document.body.appendChild(audio);
	$('#checkchat').attr('src', 'http://www.universal-soundbank.com/802a/805020000000000000000000000pkjn800000000000000000000000000000090/g/85055050505050505050505/k/4030.MP3');
	$("#checkchat").css("display","none");

  
	var End = document.createElement('li');
	End.id='endAudiocheckchat';
	End.setAttribute("style", 	"height:30px;background-image:url('http://s3.noelshack.com/old/up/mute-5980e7fa83.png');background-repeat: no-repeat; z-index: 999999;");
	End.setAttribute("onclick", "document.getElementById('checkchat').volume = (document.getElementById('checkchat').volume==1) ? 0 : 1; document.getElementById('endAudiocheckchat').style.backgroundImage = (document.getElementById('checkchat').volume==1) ? 'url(http://s3.noelshack.com/old/up/unmute-bae5a6d548.png)' : 'url(http://s3.noelshack.com/old/up/mute-5980e7fa83.png)';");
    $('#bandeau ul')[0].insertBefore(End,$('#bandeau ul')[0].firstChild);
    $('#endAudiocheckchat').css('background-size','29px 20px').css("top","5px").addClass('link');

    $("#endAudiocheckchat").text("CC").css("color","#999");
    
    document.getElementById('checkchat').volume = 0;

})();



MenuChat.prototype.update = function (xml) {
    
    if (!xml_result(xml))
        return false;

    $(xml).find('chat').each(function () {
        if ($(this).attr('key')) {
            $('#' + $(this).attr('key')).html($(this).xml());
        } else {
            $('#zone_chat .zone_infos').html($(this).xml());
            
            if(save != "" && $(this).xml() != save)
            {
                   var audio = document.getElementById('checkchat');
	               audio.load();
                   audio.play();
            }   
            save = $(this).xml();
        }
    });
    if ($(xml).find('connectes').length)
        $('#zone_chat .connectes').html($(xml).find('connectes').xml());
    var inner = $('#zone_chat .connectes').height();
    $('#zone_chat .zone_infos').css('height', 325 - inner);
    if ($(xml).find('chat').attr('time'))
        nav.getChat().setTimeCurrentRoom($(xml).find('chat').attr('time'));
}