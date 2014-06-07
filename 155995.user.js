// ==UserScript==
// @name        Hills Bank Custom Descriptions
// @namespace   paulyon
// @description Lets you add your own descriptions to those forgotten bank transactions.
// @include     https://cm.netteller.com/*/AccountTransactions.aspx
// @version     1.2
// ==/UserScript==

function hashCode(string)
{
    var hash = 0;
    if (string.length == 0) return hash;
    for (i = 0; i < string.length; i++)
    {
        char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
}

function addEdit()
{
    var a = document.querySelectorAll(".TransactionsDataGrid")[0];
    var b = a.getElementsByTagName("tr");
    var c = new Array();
    
    for (var i = 1; i < b.length-1; i++)
    {
        var date = b[i].getElementsByTagName("td")[0];
        var c = b[i].getElementsByTagName("td")[3];
        var bal = b[i].getElementsByTagName("td")[10];
        var hashValue = hashCode(date.innerHTML + c.innerHTML + bal.innerHTML);
        var cookie = getCookie(hashValue);
        var italic = document.createElement("i");
        c.appendChild(italic);
        if (cookie != null && cookie != "")
            italic.innerHTML = "<br>" + cookie + "&nbsp;";
        var child = document.createElement("a");
        child.href = "javascript: test(" + i + ", " + hashValue + ");";
        child.innerHTML = "edit";
        italic.appendChild(child);
    }
}

function test(i, hashValue)
{
    var a = document.querySelectorAll(".TransactionsDataGrid")[0];
    var b = a.getElementsByTagName("tr");
    var c = b[i].getElementsByTagName("a")[1];
    c.href = "javascript: submitChange(" + i + ", " + hashValue + ");";
    c.innerHTML = "change";
    var br = document.createElement("br");
    var inputBox = document.createElement("input");
    inputBox.style.width = "100%";
    var cookie = getCookie(hashValue);
    if (cookie != null)
        inputBox.value = cookie;
    inputBox.addEventListener("keydown", function(e) {
        if (e.keyCode == 13)
        {
            e.preventDefault();
            submitChange(i, hashValue);
        }
    })
    c.parentNode.appendChild(br);
    c.parentNode.appendChild(inputBox);
    inputBox.focus();
}

function submitChange(i, hashValue)
{
    var a = document.querySelectorAll(".TransactionsDataGrid")[0];
    var b = a.getElementsByTagName("tr");
    var e = b[i].getElementsByTagName("input")[0];
    var italic = b[i].getElementsByTagName("i")[0];
    setCookie(hashValue, e.value, 3650);
    if (e.value != "")
        italic.innerHTML = "<br>" + e.value + "&nbsp;";
    else
        italic.innerHTML = "";
    var child = document.createElement("a");
    child.href = "javascript: test(" + i + ", " + hashValue + ");";
    child.innerHTML = "edit";
    italic.appendChild(child);
}

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
            return unescape(y);
    }
}

if (window['paulsCommenter'] == undefined)
{
    addEdit();
    var funcs = document.createElement("script");
    funcs.innerHTML = test;
    funcs.innerHTML += submitChange;
    funcs.innerHTML += setCookie;
    funcs.innerHTML += getCookie;
    funcs.innerHTML += hashCode;
    document.head.appendChild(funcs);
    window['paulsCommenter'] = true;
}
