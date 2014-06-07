// ==UserScript==
// @name           STFU Skript
// @namespace      lethargolas
// @description    v0.2.0 || when ignore isn't enough
// @include        http://board.ogame.de/*
// @exclude       http://board.ogame.de/index.php?page=Portal
// ==/UserScript==

/*
    enter UserID into arrary for ignore
*/
    var bannedId = new Array();
/*
    bannedId[0] = '352553';    // ..Maxi..
    bannedId[1] = '342169';    // dabeste
    bannedId[2] = '74221';     // Conny
*/

function removeLog(removedPosts) {
    var partentElem = document.getElementById('userNote').firstChild;
    partentElem.parentNode.insertBefore(createSpanElement('red', removedPosts +' Postings entfernt.','8pt', 'center'), partentElem);
}

function errorLog(errMessage) {
    var partentElem = document.getElementById('userNote').firstChild;
    partentElem.parentNode.insertBefore(createSpanElement('red', errMessage, '12pt'), partentElem);
}

function urlParameterCheck(testString) {
    if(window.location.search.match(testString))
    {
        return true;
    } else {
        return false;
    }
}

function urlPathCheck(testString) {
    if(window.location.pathname.match(testString))
    {
        return true;
    } else {
        return false;
    }
}

function loadIds()
{
    idExist = false;
    idCount = GM_getValue('idCount', 0);
    for (i=0; i<idCount; i++)
    {
        newId = GM_getValue(i, 0);
        for (j=0; j<bannedId.length; j++)
        {
            if (bannedId[j] == newId)
            {
                idExist = true;
        //avoid unnecessary loops
                break;
            }
        }
        if(!idExist)
        {
            bannedId[bannedId.length] = newId;
        }
    idExist = false;
    }
}
       
function createSpanElement(elemColor, elemText, elemSize, elemAlign) {
    var elmNewContent = document.createElement('span');
    elmNewContent.style.color = elemColor;
    elmNewContent.style.fontSize = elemSize;
        elmNewContent.style.textAlign = elemAlign;
    elmNewContent.appendChild(document.createTextNode(elemText));
    return elmNewContent;
}

function removePostingRegistered()
{
    messageClass = document.getElementsByClassName('message');
    removedPosts = 0;
    for (i=0; i<messageClass.length; i++)
    {
        if (messageClass[i].className.match('messageMinimized') && !(messageClass[i].className.match('quickReply')))
    {
            messageClass[i].style.display = 'none';
        removedPosts++;
        }
    }
    removeLog(removedPosts);
}

function removePostingUnregistered()
{
    loadIds();
    messageClass = document.getElementsByClassName('message');
    removedPosts = 0;
    for (i=0; i<messageClass.length; i++)
    {
        messageAuthor = messageClass[i].getElementsByClassName('messageAuthor');
        for (j=0; j<bannedId.length; j++)
        {
            try {
            // unregistered users
                userUrl = messageAuthor[0].getElementsByTagName('a')[0].href;
            } catch (e) {
                userUrl = '';
            }
            if (userUrl.match(bannedId[j]))
            {
                messageClass[i].style.display = 'none';
                removedPosts++;
            }
        }
    }
    removeLog(removedPosts);
}

function removePostingEditView()
{
    loadIds();
    contentClass = document.getElementsByClassName('message content');
    removedPosts = 0;
    for (i=0; i<contentClass.length; i++)
    {
    
        for (j=0; j<bannedId.length; j++)
        {
            try {
            // unregistered users
                userUrl = contentClass[i].getElementsByClassName('containerIcon')[0].getElementsByTagName('a')[0].href;
            } catch (e) {
                userUrl = '';
            }
            if (userUrl.match(bannedId[j]))
            {    
                contentClass[i].style.display = 'none';
                removedPosts++;
            }
        }
    }
    removeLog(removedPosts);
}

function readBlackList() {
    beginMarker = 'remove=';
    endMarker = '&t=';
    idCount = 0;
    memberRemoveClass = document.getElementsByTagName('fieldset')[0].getElementsByClassName('memberRemove deleteButton');
    for(i=0; i<memberRemoveClass.length; i++)
    {
        GM_setValue(idCount, memberRemoveClass[i].href.substring(memberRemoveClass[i].href.indexOf(beginMarker) + beginMarker.length, memberRemoveClass[i].href.indexOf(endMarker)));
        idCount++;
    }
    GM_setValue("idCount", idCount);
    var partentElem = document.getElementsByTagName('fieldset')[0];
    partentElem.parentNode.insertBefore(createSpanElement('#00FF00', 'Erfolgreich '+ idCount +' IDs eingelesen.'), partentElem);    
    removeDeadIds();
}

function removeDeadIds()
{
    idCount = GM_getValue('idCount', 0);
    allVal = GM_listValues();
    for (i=0; i<allVal.length; i++)
    {
        val = allVal[i];
        switch(allVal[i])
        {
            case 'idCount':
                break;
            default:
                if (val >= idCount)
                {
                    GM_deleteValue(val);
                }
                break;
        }
    }
}

function removeFontStyle()
{
    messageBodyClass = document.getElementsByClassName('messageBody');
    for (i=0; i<messageBodyClass.length; i++)
    {
        spanTags = messageBodyClass[i].getElementsByTagName('span');
        for (j=0; j<spanTags.length; j++)
        {
            spanTags[j].style.fontSize = '';
            spanTags[j].style.color = '';
            spanTags[j].style.textDecoration = '';
            spanTags[j].style.font = '';
        }
    }
}
/* ########################################### */
if (document.getElementsByClassName('error').length < 1)
{
    if (document.getElementsByClassName('messageContent').length > 0)
    {
        if (document.getElementById('userMenuLogout'))
        {
            try {
                removePostingRegistered();
            } catch (e) {
                errorLog('unexpected error in removePostingRegistered()');
            }
        } else {
            try {
                removePostingUnregistered();
            } catch (e) {
                errorLog('unexpected error in removePostingUnregistered()');
            }
        }
        /*
       insert urlpath of a boardsection
        */
        if (urlPathCheck('board252-fragen-zum-spiel'))
        {
            try {
                removeFontStyle();
            } catch (e) {
                errorLog('unexpected error in removeFontStyle()');
            }
        }
    }

    if (urlParameterCheck('PostEdit') || urlParameterCheck('PostAdd'))
    {
        try {
            removePostingEditView();
        } catch (e) {
            errorLog('unexpected error in removePostingEditView()');
        }
    }
   
    if (urlParameterCheck('BlackListEdit'))
    {
        try {
            readBlackList();
        } catch (e) {
            errorLog('unexpected error in readBlackList()');
        }
    }
} else {
    errorLog('WBB error message detected no actions were taken.');
}