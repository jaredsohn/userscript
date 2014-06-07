// ==UserScript==
// @name		Internal/Public view on the forum
// @namespace		gPotato
// @description		The script adds an internal/public button to the Flyff Forum
// @include		http://fr.forum.gpotato.eu/*
// @copyright		None really. Do whatever you like with it.
// @version		0.131
// ==/UserScript==

//wait for the page to load, otherwise it's kind of retarded
window.addEventListener ("load", addInternalPublicButtons, false);

function addInternalPublicButtons(){
    //catch the bottom menu
    var bottomMenu = document.getElementById('ctl02_WPHMng'); //div containing Erase, Confirm, Move, Lock, Unlock etc...
    if(bottomMenu.value != "")
    {        
        //old javascript function that toggles internal/public view by changing the url (very subtle)
        var gotoInternal='FnLink(\'AS\', \'N\')';
        
        //add the link for Internal. btn_type5 is the style used for the other buttons from the bottom menu
        var a = document.createElement('a');
        a.setAttribute('id','link_internal');
        a.setAttribute('class','btn_type5');
        a.setAttribute('onclick',gotoInternal);
         //append the text displayed for the link
        a.appendChild(document.createTextNode('Interne'));
        //append the a itself....
        bottomMenu.appendChild(a);	
        
        //old javascript function that toggles internal/public view by changing the url (very subtle)
        var gotoPublic='FnLink(\'AS\', \'Y\')';
        
        //add the link for Public. btn_type5 is the style used for the other buttons from the bottom menu
        var a2 = document.createElement('a');
        a2.setAttribute('id','link_public');
        a2.setAttribute('class','btn_type5');
        a2.setAttribute('onclick',gotoPublic);
        //append the text displayed for the link
        a2.appendChild(document.createTextNode('Publique'));
        //append the a itself....
        bottomMenu.appendChild(a2);	
        
        //clean up!
        window.removeEventListener ("load", addInternalPublicButtons, false);
    }
}