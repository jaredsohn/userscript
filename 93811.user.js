// ==UserScript==
// @name           Quick License v2 
// @namespace      Quick License
// @include        *callofduty.wikia.com/wiki/File:*
// @include        *callofduty.wikia.com/*File:*&action=edit*
// ==/UserScript==
if (document.location.href.indexOf("wiki/File:") != -1)
{
    document.getElementById('filetoc').innerHTML += 
    "<li><a href='"+(document.getElementsByTagName('link')[2].href+"&Public&Save")+"'>Public domain (PMG)</a></li> "+
    "<li><a href='"+(document.getElementsByTagName('link')[2].href+"&CM&Save")+"'>Game screenshot</a></li> "+
    "<li><a href='"+(document.getElementsByTagName('link')[2].href+"&Fairuse&Save")+"'>Fair use</a></li>";
}
else if(document.location.href.indexOf("&action=edit") != -1)
{
    if(document.location.href.substr(-5)!="&Save")
    {
        document.getElementById('toolbar').innerHTML += "<select onchange=\"document.getElementById('wpTextbox1').value +=(this.value);\">" +
        "<option value=''>Licenses</option>"+
        "<option value='\n{{PD}}'>Public domain (PMG)</option>"+
        "<option value='\n{{CM}}'>Game Screenshot</option>"+
        "<option value='\n{{FU}}'>Fair use</option>"+
        "</select>";
    }
    else
    {
        if(document.location.href.indexOf("&Fairuse") != -1)
        {
            document.getElementById('wpTextbox1').value +="{{FU}}";
        }
        else if(document.location.href.indexOf("&CM") != -1)
        {
            document.getElementById('wpTextbox1').value +="{{CM}}";
        }
        else if(document.location.href.indexOf("&Public") != -1)
        {
            document.getElementById('wpTextbox1').value +="{{PD}}";
        }
        document.getElementById('wpTextbox1').value = document.getElementById('wpTextbox1').value.replace("{{No license}}","").replace("{{NL}}","");
        document.all("wpSave").click();
    }
}