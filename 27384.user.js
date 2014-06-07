// ==UserScript==
// @name           CBReport_Graylist
// @namespace      org.userscripts
// @description    Hides comments from annoying users on thecarpetbaggerreport.com
// @include        http://www.thecarpetbaggerreport.com/archives/*
// ==/UserScript==


function addUpdateForm()
{
    var form = document.createElement('form');

    var span = document.createElement('div');
    span.innerHTML = "Enter a comma separated list of screen names. " +
        "If a name contains a comma, it may be escaped using a " +
        "backslash, e.g. ACME\, Inc.";
    form.appendChild(span);

    var userText = document.createElement('input');
    userText.type = 'text';
    userText.id = 'users_list';
    userText.name = 'users_list';
    userText.value = GM_getValue('users', '');
    userText.size = 60;
    form.appendChild(userText);

    function userButtonHandler()
    {
        var users = document.getElementById('users_list').value;
        GM_setValue('users', users);
        hideAnnoyingComments();
        alert("Updated. If you've removed users from the list, you " +
              "will need to reload the page to see results.");
    }

    var button = document.createElement('input');
    button.type = 'button';
    button.name = 'btn';
    button.value = 'Update';
    button.addEventListener('click', userButtonHandler, true); 
    form.appendChild(button);

    var span = document.createElement('div');
    span.innerHTML = "Enter a comma separated list of keywords to avoid. " +
        "If a keyword contains a comma, it may be escaped using a " +
        "backslash, e.g. ACME\, Inc.";
    form.appendChild(span);

    userText = document.createElement('input');
    userText.type = 'text';
    userText.id = 'kw_list';
    userText.name = 'kw_list';
    userText.value = GM_getValue('keywords', '');
    userText.size = 60;
    form.appendChild(userText);

    function keywordButtonHandler()
    {
        var keywords = document.getElementById('kw_list').value;
        GM_setValue('keywords', keywords);
        hideAnnoyingComments();
        alert("Updated. If you've removed users from the list, you " +
              "will need to reload the page to see results.");
    }

    button = document.createElement('input');
    button.type = 'button';
    button.name = 'kwbtn';
    button.value = 'Update';
    button.addEventListener('click', keywordButtonHandler, true); 
    form.appendChild(button);

    var div = document.createElement('div');
    span = document.createElement('span');
    span.className = 'heading';
    span.innerHTML = "Tiresome users";
    div.appendChild(span);
    div.appendChild(form);

    var commentsDiv = document.getElementById("comments");
    commentsDiv.appendChild(div);
}

function hideAnnoyingComments()
{
    var userString = GM_getValue('users', '');
    var kwString = GM_getValue('keywords', '');
    if (userString.length > 0 || kwString.length > 0)
    {
        var userList = splitList(userString);
        var kwList = splitList(kwString);
        var commentsDiv = document.getElementById("comments-section");
        var headings = commentsDiv.getElementsByTagName("cite");
        for (var i = 0; i < headings.length; i++)
        {
            var heading = headings[i];
            var b = heading.getElementsByTagName("b")[0];
            var aArray = b.getElementsByTagName("a");
            var username = (aArray == null || aArray.length == 0) ?
            trim(b.innerHTML) : trim(aArray[0].innerHTML);
            if (contains(username, userList))
            {
                substituteLink(heading);
            }

            var divs = heading.parentNode.getElementsByTagName('div');
            var max = divs.length;
            for (var j = 0; j < max; j++)
            {
                var e = divs[j];
                if (e.className && e.className == 'comment-content'
                    && e.style.display != 'none')
                {
                    var content = e.innerHTML.toLowerCase();
                    for (var k = 0; k < kwList.length; k++)
                    {
                        if (content.indexOf(kwList[k].toLowerCase()) >= 0)
                        {
                            subLink(e);
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }
}

function substituteLink(heading)
{
    var divs = heading.parentNode.getElementsByTagName('div');
    var max = divs.length;
    for (var j = 0; j < max; j++)
    {
        var e = divs[j];
        if (e.className && e.className == 'comment-content'
            && e.style.display != 'none')
        {
            subLink(e);
            break;
        }
    }
}

function subLink(e)
{
                var note = document.createElement('div');
/*
                var a = document.createElement('a');
                a.href = '#';
                a.addEventListener('click', hiddenContentHandler, true); 
                a.innerHTML = "Click to view comment.";
                //note.appendChild(a);
                //note.hiddenContent = e;
*/
                note.innerHTML="<a href=\"#\" onclick=\"this.parentNode" +
                    ".nextSibling.style" +
                    ".display='block'; this.style.display='none'; " +
                    "return false;\">Click to view comment.</a>";

                // Give the link a different look, so it is not confused
                // with the normal links on the site.
                var a = note.getElementsByTagName('a')[0];
                a.style.color = 'chocolate';

                e.style.display = 'none';
                e.parentNode.insertBefore(note, e);
}

function trim(str)
{
    return str.replace(/^\s+|\s+$/g, '');
}

function splitList(s)
{
    var list = [];
    if (s.length > 0)
    {
        var a = s.split(',');
        for (var i = 0; i < a.length; i++)
        {
            var u = a[i];
            while (u.charAt(u.length - 1) == '\\')
            {
                u = u.substring(0, u.length - 1) + ',' + a[++i];
            }
            u = trim(u);
            list.push(u);
        }
    }
    return list;
}

function hiddenContentHandler(event)
{
    var t = event.currentTarget;
    t.nextSibling.style.display='block'; 
    t.style.display='none';
    event.preventDefault();
}

function contains(s, a)
{
    var b = false;
    for (var i = 0; i < a.length; i++)
    {
        if (s.toLowerCase() == a[i].toLowerCase())
        {
            b = true;
            break;
        }
    }
    return b;
}

addUpdateForm();
hideAnnoyingComments();
