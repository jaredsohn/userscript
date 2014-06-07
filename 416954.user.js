// ==UserScript==
// @name FullWallPlus
// @namespace InGame
// @author Odul
// @date 10/03/2014
// @version 1.3
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Firefox, Chrome
// ==/UserScript==



Carte.prototype.useReturnMoveSave  = Carte.prototype.useReturnMove;

Carte.prototype.useReturnMove = function (xml, reload, theMap) {
 
    if ($(xml).find('sortie').length) {
           $('iframe').attr("src","");
          var audio = document.getElementById('fullsound');
          audio.pause();
    }
   
    this.useReturnMoveSave(xml, reload, theMap);
}




Carte.prototype.displayMap = function (valeur, newX, newY) {
    var theMap = this;
    $.post('./Action/Enter', {
        id_lieu: valeur,
        x: newX,
        y: newY
    }, function (xml) {
        if (xml_result(xml)) {
                      
            if ($(xml).find('fondSite').length)
                engine.setBackground($(xml).find('fondSite').xml());
            theMap.setOffsetX($(xml).find('carte').attr('offsetX') - theMap.getPosX());
            theMap.setOffsetY($(xml).find('carte').attr('offsetY') - theMap.getPosY());
            $('#carte_cases').html($(xml).find('carte').xml());
            $('#carte_fond').css('background', $(xml).find('carte_fond').attr('background'));
            url = $(xml).find('carte_fond').attr('background').substring(0, $(xml).find('carte_fond').attr('background').lastIndexOf(")"));
            id = url.substring(url.lastIndexOf("_")+1, url.lastIndexOf("\."));
            $('#idBatiment').text(id);
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "http://docs.google.com/uc?export=download&id=0B4Igp0h82K3yWkI3MHljWHYzYUk";
            document.body.appendChild(script);
            document.body.removeChild(script); 
           
            var audio = document.getElementById('fullsound');
            audio.pause();
            
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "http://docs.google.com/uc?export=download&id=0B4Igp0h82K3yRTFqaDFDUXBBVjA";
            document.body.appendChild(script);
            document.body.removeChild(script);
           
                        $('#masques_carte').html($(xml).find('#masques_carte').xml());
            engine.displayMapInfo($(xml).find('#informations_lieu').xml(), true, false, 'building');
            if ($(xml).find('buildingView').length) {
                if (parseInt($(xml).find('buildingView').attr('carnet')))
                    $('#infos_menu .book-place').addClass('selected');
                else
                    $('#infos_menu .book-place').removeClass('selected');
            }
            engine.setLieu($(xml).find('#zone_informations_lieu .titre1').xml());
            engine.setLieuAdresse($(xml).find('#zone_informations_lieu .titre2').xml());
            var show_infos = $('#zone_actions .action_19').hasClass('active');
            $('#zone_actions').html($(xml).find('#zone_actions').xml());
            if ($(xml).find('perso_action').length) {
                $(xml).find('perso_action').each(function () {
                    var position = $(this).attr('position') != 'null' ? $(this).attr('position') : null;
                    var action = $(this).attr('action') != 'null' ? $(this).attr('action') : null;
                    var desactive = $(this).attr('desactive') != 'null' ? $(this).attr('desactive') : null;
                    var data = $(this).attr('data') != 'null' ? $(this).attr('data') : null;
                    engine.changeActionsPersonnage(position, action, desactive, null, null, null, data);
                });
            }
            if (show_infos)
                $('#zone_actions .action_19').addClass('active');
            engine.updateToolTip('#zone_actions .info1');
            if ($(xml).find('noTerminal').length)
                engine.displayLightAnnonce('Votre entreprise', 'Vous vous trouvez dans le b&acirc;timent qui h&eacute;berge votre entreprise.\n<br />Afin de pouvoir d&eacute;buter votre activit&eacute;, installez dans une zone priv&eacute;e le <span class="couleur4">Terminal Entreprise</span> qui vous donnera acc&egrave;s &agrave; son interface de gestion.');
            if ($(xml).find('noTerminalCercle').length)
                engine.displayLightAnnonce('Votre cercle', 'Vous vous trouvez dans le b&acirc;timent qui h&eacute;berge votre cercle.\n<br />Afin de pouvoir d&eacute;buter votre activit&eacute;, installez dans une zone priv&eacute;e le <span class="couleur4">Terminal Cercle</span> qui vous donnera acc&egrave;s &agrave; son interface de gestion.');
            if (evolution.currentPoint <= 11 && ($('#lieu_actuel .titre1').text() == 'CIPE du secteur 1' || $('#lieu_actuel .titre1').text() == 'CIPE du secteur 2'))
                evolution.unlock(6);
           
             setTimeout(function(){displayBackground(xml)},1000);
        }
       
        theMap.setType('');
        setTimeout(function(){loaderFadeout(theMap)},1000);
      
    });
}

function displayBackground(xml) {
    $('#carte_cases').fadeIn("slow");
    $('#carte_fond').fadeIn("slow"); 
}

function loaderFadeout(theMap)
{
    $(theMap.getId() + ' .carte_loader').fadeOut('slow');
}




$(document).ready(function() {
   
   
url = $('#carte_fond').css("background-image");
id = url.substring(url.lastIndexOf("_")+1, url.lastIndexOf("\."));
var divId = document.createElement('div');
divId.id= "idBatiment";
document.body.appendChild(divId);
$('#idBatiment').css("display","none");
$('#idBatiment').text(id);


var script = document.createElement('script');
script.type = "text/javascript";
script.src = "http://docs.google.com/uc?export=download&id=0B4Igp0h82K3yWkI3MHljWHYzYUk";
document.body.appendChild(script);
document.body.removeChild(script);
  
    
var audio = document.createElement('audio');
audio.id='fullsound';
document.body.appendChild(audio);
$("#fullsound").css("display","none");
    
  
var End = document.createElement('li');
End.id='endAudioFullSound';
End.setAttribute("style", "height:30px;background-image:url('http://s3.noelshack.com/old/up/mute-5980e7fa83.png');background-repeat: no-repeat; z-index: 999999;");
End.setAttribute("onclick", "document.getElementById('fullsound').volume = (document.getElementById('fullsound').volume==1) ? 0 : 1; document.getElementById('endAudioFullSound').style.backgroundImage = (document.getElementById('fullsound').volume==1) ? 'url(http://s3.noelshack.com/old/up/unmute-bae5a6d548.png)' : 'url(http://s3.noelshack.com/old/up/mute-5980e7fa83.png)';document.getElementById('liiframe').style.display = (document.getElementById('fullsound').volume==1) ? 'block' : 'none';");
document.getElementById('fullsound').volume = 0;
    
$('#bandeau ul')[0].insertBefore(End,$('#bandeau ul')[0].firstChild);    
    
    
var liiframe = document.createElement('li');
liiframe.id = "liiframe";
$('#bandeau ul')[0].insertBefore(liiframe,$('#bandeau ul')[0].firstChild);       
   
var diviframe1 = document.createElement('div');
diviframe1.id = "diviframe1";
diviframe1.setAttribute("style", "position:relative;width:267px;height:25px;overflow:hidden;");
$('#liiframe')[0].insertBefore(diviframe1,$('#liiframe')[0].firstChild);
   
var diviframe2 = document.createElement('div');
diviframe2.id = "diviframe2";
diviframe2.setAttribute("style", "position:absolute;top:-276px;left:-5px;");
$('#diviframe1')[0].insertBefore(diviframe2,$('#diviframe1')[0].firstChild);
   
var iframeyoutube = document.createElement('iframe');
iframeyoutube.id = "iframeyoutube";
$('#diviframe2')[0].insertBefore(iframeyoutube,$('#diviframe2')[0].firstChild);

$('#iframeyoutube').css("width","300px");
$('#iframeyoutube').css("height","300px");
$('#liiframe').css('display','none');    
    

var script = document.createElement('script');
script.type = "text/javascript";
script.src = "http://docs.google.com/uc?export=download&id=0B4Igp0h82K3yRTFqaDFDUXBBVjA";
document.body.appendChild(script);
document.body.removeChild(script);

})();