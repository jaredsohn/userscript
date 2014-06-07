// ==UserScript==
// @name           pq_ignore_all
// @namespace      quake.ingame.de
// @include        http://quake.ingame.de/forum/*
// ==/UserScript==


/* fix for chrome */
/* http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/ */
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}



var tables = document.getElementsByTagName("table");

function getList()
{
    var users = GM_getValue('pq.ignored_users');
    if (users == undefined)
    {
        GM_setValue('pq.ignored_users', '-0|-0');
    }
    return users.split("|");
}

function inList(id)
{
    var list = getList();
    for (i in list)
    {
        if (list[i] == id)
        {
            return true;
        }
    }
    return false;
}

function createFunAdd(id){
    return function() {
        var old = GM_getValue('pq.ignored_users');
        var newstr = old + "|" + id;
        GM_setValue('pq.ignored_users', newstr);
        alert("Hi und zwar, User mit ID " + id + " wird ignoriert.");
    }
}

function createFunDel(id){
    return function() {
        var old = GM_getValue('pq.ignored_users');
        var users = old.split("|");
        var newstr = users[0];
        for (var i in users)
        {
            if (i > 0 && users[i] != id)
            {
                newstr = newstr + "|" + users[i];
            }
        }
        GM_setValue('pq.ignored_users', newstr);
        alert("Hi und zwar, User mit ID " + id + " wird nicht mehr ignoriert.");
   }
}


/* ignore function */
for (i in tables)
{
    if (tables[i].className == "tborder")
    {
        if (tables[i].id.search(/post([0-9]+)/) != -1)
        {
            try
            {
                var id = tables[i].id.match(/post([0-9]+)/)[1];

                var poststrmen = "postmenu_" + id
                var tmp = document.getElementById(poststrmen).getElementsByTagName("a")[0];
                
                var userid = tmp.href.match(/\/benutzer\/(?:.*?)-([0-9]+)/)[1];
                var user = tmp.innerHTML;
            }
            catch(err)
            {
                userid = "";
            }

            var banned = inList(userid);
            if (banned == true)
            {
               var poststrpos = "post" + id;
               document.getElementById(poststrpos).style.display = "none";  

               var newTable = document.createElement("table");
               newTable.className = "tborder";
               newTable.style.border = "0";
               newTable.style.width = "100%";
               newTable.style.align = "center";
               newTable.style.cellpadding = "6";
               newTable.style.cellspacing = "1";

               var toggle = "document.getElementById('"+poststrpos+"').style.display = ''; parentNode.parentNode.parentNode.style.display = 'none';";
               newTable.innerHTML = '<tr title="Beitrag '+poststrpos+'"><td class="thead" style="font-weight:normal" ><a style="float:right" href="'+document.URL+'#'+poststrpos+'" rel="nofollow" onclick="'+toggle+'">Beitrag anzeigen</a><a name="post'+poststrpos+'-beitrag/"><img class="inlineimg" alt="'+user+'" border="0" /></a></td></tr><tr><td class="alt2" style="padding: 6px 0 10px 5px"><a href="member.php?u="> '+user+'</a></td></tr><tr><td class="alt1"><div class="smallfont">Diese Nachricht wird nicht angezeigt, da sich <strong>'+user+'</strong> auf deiner Ignorier-Alle-Liste befindet.</div></td></tr>';


               document.getElementById(poststrpos).parentNode.insertBefore(newTable, document.getElementById(poststrpos).nextSibling);

            }
        }
    }
}


/* add ignore and del ignore */
var divs = document.getElementsByTagName("div");

for (j in divs)
{
    try {
        if (divs[j].id.match(/postmenu_([0-9])+_menu/) != null)
        {
            var tbody = divs[j].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];

            // get user id
            var tmp = tbody.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
            var userid = tmp.href.match(/\/benutzer\/(?:.*?)-([0-9]+)/)[1];
            
            // Beautify
            fooTrAdd = document.createElement('tr');
            fooTdAdd = document.createElement('td');
            fooTdAdd.className = "vbmenu_hilite vbmenu_option_alink";
            fooTdAdd.style.cursor = "default";


            fooTrDel = document.createElement('tr');
            fooTdDel = document.createElement('td');
            fooTdDel.className = "vbmenu_hilite vbmenu_option_alink";
            fooTdDel.style.cursor = "default";

            // add block button
            var buttonAdd = document.createElement('a');
            buttonAdd.id = "ignore_button_" + userid;
            buttonAdd.innerHTML = "(User ignorieren)";
            buttonAdd.addEventListener('click', createFunAdd(userid), false);

            fooTdAdd.appendChild(buttonAdd);
            fooTrAdd.appendChild(fooTdAdd);
            tbody.appendChild(fooTrAdd);
            
            // del block button
            var buttonDel = document.createElement('a');
            buttonDel.id = "ignore_button_" + userid;
            buttonDel.innerHTML = "(User nicht mehr ignorieren)";
            buttonDel.addEventListener('click', createFunDel(userid), false);


            fooTdDel.appendChild(buttonDel);
            fooTrDel.appendChild(fooTdDel);
            tbody.appendChild(fooTrDel);

            
        }
    } catch (err) {}

}
