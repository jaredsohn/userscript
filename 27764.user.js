// ==UserScript==
// @name           Vman Smileyliste
// @namespace      http://www.mathemaniac.org
// @include        http://www.virtualmanager.com/forum/reply.php*
// @include        http://www.virtualmanager.com/forum/edit.php*
// @include        http://www.virtualmanager.com/forum/*/*/new*
// @include        http://www.virtualmanager.com/mail/new.php*
// ==/UserScript==

// Custom smilies. Tilføj dine smilies her, hvis du har lyst. //////////////////
var customSmileyList = new Array(
    'http://www.vman.dk/gfx/accept.gif',
    'http://smilies.vidahost.com/contrib/blackeye/lol.gif',
    'http://smilies.vidahost.com/otn/funny/1poke.gif',
    'http://planetsmilies.net/sport-soccer-smiley-21.gif'
);
///////////////////////////////////////////////////////////////////
// Officiel smiley liste : //////////////////////////////////////////////
// Rør venligst ikke, tak. //////////////////////////////////////////////
var smileyList = new Array(
    [':)',          'http://www.vman.dk/gfx/moods/mood_7.gif'],
    [':(',          'http://www.vman.dk/gfx/moods/mood_3.gif'],
    [':D',          'http://www.vman.dk/gfx/moods/mood_9.gif'],
    ['D:',          'http://www.vman.dk/gfx/moods/mood_2.gif'],
    [':P',          'http://www.vman.dk/gfx/moods/mood_10.gif'],
    [':S',          'http://www.vman.dk/gfx/smileys/confused.gif'],
    [';)',          'http://www.vman.dk/gfx/smileys/wink.gif'],
    [':chok:',  'http://www.vman.dk/gfx/smileys/chok.gif'],
    [':ked:',    'http://www.vman.dk/gfx/smileys/sad.gif'],
    [':roll:',  'http://www.vman.dk/gfx/smileys/roll.gif'],
    [':hihi:',  'http://www.vman.dk/gfx/smileys/hihi.gif'],
    [':away:',  'http://www.vman.dk/gfx/smileys/away.gif'],
    [':back:',  'http://www.vman.dk/gfx/smileys/back.gif'],
    ['[w]',        'http://www.vman.dk/gfx/wonderkid.gif']
);
////////////////////////////////////////////////////////////////

for  each (var smiley in customSmileyList) {
    smileyList.push(['[img]'+smiley+'[/img]',smiley]);
}

GM_addStyle('.smileybtn { border: 0px; margin-right: 3px } ');

var xpath = '//tr[descendant::textarea]';
var it = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
var node = it.iterateNext();

var smileytr = document.createElement('tr');
var beskrivelsetd = document.createElement('td');
beskrivelsetd.className = 'top shrink';
beskrivelsetd.appendChild(document.createTextNode('Smilies'));
smileytr.appendChild(beskrivelsetd);

function smileyAddClickHandler(event) {
    var smileycode = event.target.getAttribute('alt');
    var textbox = document.evaluate('//textarea', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null).iterateNext();
    if (textbox.selectionStart || textbox.selectionStart == '0') {
        textbox.value = textbox.value.substring(0, textbox.selectionStart)+ smileycode+ textbox.value.substring(textbox.selectionEnd, textbox.value.length); 
    }
    else {
        textbox.value += smileycode; 
    }
     textbox.focus();
     event.preventDefault();
}

var smileytd = document.createElement('td');
for each (var smiley in smileyList) {
    var insertlink = document.createElement('a');
    insertlink.setAttribute('href','#');
    insertlink.addEventListener('click',smileyAddClickHandler,true);
    var smileyimg = document.createElement('img');
    smileyimg.className = 'smileybtn';
    smileyimg.src = smiley[1];
    smileyimg.setAttribute('alt',smiley[0]);
    insertlink.appendChild(smileyimg);
    smileytd.appendChild(insertlink);
}

smileytr.appendChild(smileytd);

node.parentNode.insertBefore(smileytr,node.nextSibling);