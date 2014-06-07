// ==UserScript==
// @name VousAvezUnMessage
// @namespace InGame
// @author Gideon, Sÿ (correctif), Odul (MAJ pour nouvelle interface)
// @date 29/11/2011
// @version 2.5.1
// @description Une voix vous signale la reception d'un message.
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Firefox, Chrome
// ==/UserScript==


(function() {
var audio = document.createElement('audio');
audio.id = "one";
$('#bandeau ul')[0].insertBefore(audio,$('#bandeau ul')[0].firstChild);
$('#one').attr('src', 'http://www.memoclic.com/medias/sons-wav/1/422.wav');
$('#one').css('display','none');

MenuMessagerie.prototype.messageReceived=function(content){
    $(content).each(function(){
        if(!isset($(this)[0].tagName))
            return true;
    var folder_id=$(this)[0].tagName.toLowerCase().replace('folder_','');
    if(folder_id==$('#current_folder').attr('data-id'))
        nav.getMessagerie().openFolder(folder_id);
    $('#zone_messagerie').trigger({type:'nouveauMessage',id_conversation:$(this).attr('id_conversation'),folder_id:folder_id,quantity:$(this).attr('quantite')});
    
	var audio = document.getElementById('one');
	audio.load();
    audio.play();
})
};


var End = document.createElement('div');
End.id='endAudio';
End.setAttribute("style", "width:32px;height:30px;background-image:url('http://s3.noelshack.com/old/up/unmute-bae5a6d548.png');background-repeat: no-repeat;background-position: 33px 0;position: absolute; right: 0px;z-index: 999999;");

var mess = document.getElementById('zone_messagerie');
mess.appendChild(End);
$('#endAudio').css('background-position','0px 0px').css('left','123px').css('top','12px').css('background-size','29px 20px').addClass('link');

End.onclick = function(){
    document.getElementById('one').volume = (document.getElementById('one').volume==1) ? 0 : 1; 
    document.getElementById('endAudio').style.backgroundImage = (document.getElementById('one').volume==1) ? 'url(http://s3.noelshack.com/old/up/unmute-bae5a6d548.png)' : 'url(http://s3.noelshack.com/old/up/mute-5980e7fa83.png)';
};
})();
//v1.1:: 'You've got a message' when you have got a new message.
//v2.2:: Mute or unmute the voice.
//v2.3:: Show and hide the mute bouton.
//v2.3.1:: Update by Sÿ following the update of an update of Dreadcast game.
//v2.5 : update for the new interface
//v2.5.1 bug fix