// ==UserScript==
// @name           11
// @namespace      11
// @description    Add some links in orkut bar
// @include        http://*.orkut.*/*
/*
 * @author Bruno Leonardo Michels for menu script & Prashant for Login!
 * @profile http://www.orkut.co.in/Profile.aspx?uid=17618220612205038709
 */
// ==/UserScript==

/// account 1 user id n password! //

var a2 = 'username';
var a4 = 'password';

/// account 2 user id n password! //

var b2 = 'username';
var b4 = 'password';

/// account 3 user id n password! //

var c2 = 'username';
var c4 = 'password';


/// Account names in menu bar dont make it too long!
var n1 = '1'; 
var n2 = '2';
var n3 = '3';


// Don't Edit anything below this //

var a1 = 'https://www.google.co.in/accounts/ServiceLoginAuth?continue=http://www.orkut.co.in/RedirLogin.aspx?&service=orkut&Email=';
var a3 = '&Passwd=';
var a5 = '&skipvpage=true&sendvemail=false&rmShown=1&signIn=Sign+in';



var rmAux = 0;
var removeLinks = new Array(2);

function RemoveLink(desc)
{
    removeLinks[rmAux] = desc;
    ++rmAux;
}
/// <summary>
/// RemoveLinks
/// </summary>

RemoveLink("Friends");

/// <summary>
/// RemoveLinks END
/// </summary>

function getXPATH(path)
{
    return document.evaluate(
        path,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

var menu;
var items;
function BuildMenu()
{
    menu = document.getElementById("headerin");
    menu = menu.getElementsByTagName("ul");
    menu = menu[1];

    items = menu.getElementsByTagName("li");

    var i = 1;

    while (items[i])
    {
        var lnk = items[i].getElementsByTagName("a")[0];
        if (removeLinks.length > 0 && removeLinks.indexOf(lnk.innerHTML) != -1)
            lnk.parentNode.style.display = "none";
        if (lnk.innerHTML.indexOf("P�gina de recados") != -1)
            lnk.innerHTML = lnk.innerHTML.replace("P�gina de recados", "Recados");
        ++i;
    }

    items[i-1].innerHTML += " | ";
}

function AddNewLink(link, desc, sep)
{
    var e = document.createElement("li");
    e.innerHTML = "&nbsp;<a href='" + link + "'>" + desc + "</a>" + sep;
    items[0].parentNode.appendChild(e);
}

try
{
    BuildMenu();
}
catch (Ex) { }

/// <summary>
/// User settings
/// </summary>


AddNewLink(a1+a2+a3+a4+a5, n1, " | ");
AddNewLink(a1+b2+a3+b4+a5, n2, " | ");
AddNewLink(a1+c2+a3+c4+a5, n3, " | ");
AddNewLink("/Main#CommApprove.aspx", "CA", " | ");

