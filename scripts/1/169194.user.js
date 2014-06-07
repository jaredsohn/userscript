// ==UserScript==
// @name       	Unixy : Log me fast
// @version    	0.1
// @description Ajoute un bouton de sauvegarde des identifiants ( sur votre machine ) et les place systématiquement. Possibilité de les supprimer.
// @include     unixy.fr
// @include     www.unixy.fr
// @include     	*.unixy.fr/index.php*
// @require		http://code.jquery.com/jquery-1.10.0.min.js
// @copyright  	2013+, Xavier BRIN
// ==/UserScript==


var univers = GM_getValue('univers');
var pseudo = GM_getValue('pseudo');
var password = GM_getValue('password');

if(univers == undefined && pseudo == undefined && password == undefined) {    
    $('form#loginform').after('<input id="storevalues" type="button" value="Save these values" style="position:relative;bottom:28px;left:690px;"/>');
    $('input#storevalues').click(function(){
        GM_setValue('univers',$('option:selected').val());
        GM_setValue('pseudo',$('input[name=pseudo]').val());
        GM_setValue('password',$('input[name=password]').val());
        alert('Values succesfully stored !');
    });
    
    /*GM_setValue('univers',univers);
    GM_setValue('pseudo', pseudo);
    GM_setValue('password', password);*/
} else {
    $('option[value='+univers+']').prop('selected',true);
    $('input[name=pseudo]').val(pseudo);
    $('input[name=password]').val(password);
    $('form#loginform').after('<input id="deletevalues" type="button" value="Delete Stored values" style="position:relative;bottom:28px;left:690px;"/>');
    $('input#deletevalues').click(function(){
        GM_deleteValue('univers');
        GM_deleteValue('pseudo');
        GM_deleteValue('password');
        alert('Values succesfully removed.');
    });
}