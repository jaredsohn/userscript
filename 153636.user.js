// ==UserScript==
// @author      qazuor (Leandro Asrilevich)
// @name        mantisChanserNotesFold
// @namespace   mantis.enhacements
// @include     https://*mantis.xcade.net/view.php?id=*
// @version     1
// ==/UserScript==

var notes = document.querySelectorAll('.bugnote');

for (var i = 0; i < notes.length; ++i) {
    if (notes[i].childNodes[1].childNodes[3].textContent.trim() == 'chanser') {
        (function(noteElement) {
            var visible = false;
            function moveAllChildren(fromNode, toNode) {
                while (fromNode.childNodes.length > 0) {
                    var child = fromNode.firstChild;
                    fromNode.removeChild(child);
                    toNode.appendChild(child);
                }
            }
            var noteContent = noteElement.childNodes[3];
            var noteContentContainer = document.createElement('div');
            var noteTitleContainer = document.createElement('div');
            var noteTitle = noteElement.childNodes[3].childNodes[0];
            noteTitle.parentNode.removeChild(noteTitle);
            noteTitleContainer.appendChild(noteTitle);
            if (noteTitle.textContent.trim().substring(0,4) == 'FAIL') {
                var noteTitleExtra = noteElement.childNodes[3].childNodes[0];
                noteTitleExtra.parentNode.removeChild(noteTitleExtra);
                noteTitleContainer.appendChild(noteTitleExtra);
            } else if (noteTitle.textContent.trim() == '') {
                var noteTitleExtra = noteElement.childNodes[3].childNodes[0];
                noteTitleExtra.parentNode.removeChild(noteTitleExtra);
                noteTitleContainer.appendChild(noteTitleExtra);
            }
            
            moveAllChildren(noteContent, noteContentContainer);
            noteContent.appendChild(noteTitleContainer);
            noteContent.appendChild(noteContentContainer);
            noteContentContainer.style.display = 'none';
            
            var noteHeader = noteElement.childNodes[1];
            noteHeader.removeChild(noteHeader.childNodes[0]);
            noteHeader.removeChild(noteHeader.childNodes[0]);
            noteHeader.removeChild(noteHeader.childNodes[0]);
            noteHeader.removeChild(noteHeader.childNodes[1]);
            noteHeader.removeChild(noteHeader.childNodes[3]);
            noteHeader.removeChild(noteHeader.childNodes[3]);
            noteHeader.removeChild(noteHeader.childNodes[3]);
            noteHeader.removeChild(noteHeader.childNodes[3]);
            
            var expandLinkText = document.createTextNode('Expand');
            var expandLink = document.createElement('a');
            expandLink.style.color = 'black';
            expandLink.style.fontSize = '12px';
            expandLink.style.display = 'inline-block';
            expandLink.style.width = '100px';
            expandLink.style.textAlign = 'right';
            expandLink.href = '#';
            expandLink.onclick = function(event) {
                event.preventDefault();
                event.stopPropagation();
                noteContentContainer.style.display = visible ? 'none' : '';
                expandLinkText.nodeValue = visible ? 'Expand' : 'Collapse';
                visible = !visible;
            }
            expandLink.appendChild(expandLinkText);
            noteHeader.appendChild(expandLink);
            
            
        })(notes[i]);
    }
}