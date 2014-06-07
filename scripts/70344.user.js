// ==UserScript== 
// @name                           DSForumNewSmileys 
// @author                         pinjam, C1B1SE 
// @description                    Fügt im DS-Forum neue Smileys hinzu. 
// @include                        http://forum.die-staemme.de/editpost.php?* 
// @include                        http://forum.die-staemme.de/newreply.php?* 
// @include                        http://forum.die-staemme.de/newthread.php?* 
// ==/UserScript== 

function einfuegen() { 
        if(document.getElementById('vB_Editor_001_textarea').style.display != 'none') 
                document.getElementById('vB_Editor_001_textarea').value += '[img]http://forum.staemme.ch/images/phpbb_smilies/icon_rolleyes.gif[/img]'; 
        else 
                document.getElementById('vB_Editor_001_iframe').contentDocument.body.innerHTML += "[img]http://forum.staemme.ch/images/phpbb_smilies/icon_rolleyes.gif[/img]"; 
} 


function newsmiley() { 
        var td = document.createElement('td'); 
        var img = document.createElement('img'); 
        img.src = 'http://forum.staemme.ch/images/phpbb_smilies/icon_rolleyes.gif'; 
        img.title = "Rolleyes"; 
        img.border = "0"; 
        img.class = "inlineimg"; 
        img.addEventListener('click',einfuegen,false); 
        td.appendChild(img); 
        document.getElementById('vB_Editor_001_smilie_17').parentNode.parentNode.insertBefore(td, document.getElementById('vB_Editor_001_smilie_17').parentNode.nextSibling); 
} 


if(document.getElementById('vB_Editor_001_smilie_17')) 
        newsmiley(); 