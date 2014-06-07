// ==UserScript==
// @name       Bot de flood Pokebip
// @version    1.0
// @description  Ce script est un bot pour flooder le t'chat de pokébip
// @copyright  2012©, Abc222
// @include http://www.pokebip.com/pokemon/index.php?phppage=membres/chat/chat*
// @require http://www.pokebip.com/pokemon/skins/javascript/scriptaculous/ensemble.js
// ==/UserScript==
if(confirm('Voulez vous flooder?'))
{
    var msf = prompt('Message de flood?');
    var nbr = parseInt(prompt('Nombre de messages?'));
    for(var i=0;i<nbr;i++)
    {
        msg.value = msf;
        function valider()
        {
            new Ajax.Updater('envois_msg', 'index.php?phppage=membres/chat/envois&room=2', {encoding:'ISO-8859-1', postBody:Form.serialize('envoismsg')});
            envoismsg.reset();
        }
        valider();
    }
}