// ==UserScript==
// @name           eRepublik Message GET Fix by JasonStiltner
// @description    Fixes the GET variables admins removed in an update
// @version        1.5
// @include        http://www.erepublik.com/*/main/messages-compose/*
// @include        http://erepublik.com/*/main/messages-compose/*
// ==/UserScript==

// Note here, this will replace + signs with spaces.
// Some url encoding does this to spaces, but url encoding will also encode plus signs
// so it's up in the air.

function cleanGetData(s)
{
   return decodeURI(s.replace(new RegExp("\\+","g")," "));
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
 
    return vars;
}

(function() {
   var urlVariables = getUrlVars();

   if(typeof(urlVariables["citizen_subject"]) != 'undefined') {
      document.getElementById("citizen_subject").value = cleanGetData(urlVariables["citizen_subject"]);
   }
   
   if(typeof(urlVariables["citizen_message"]) != 'undefined') {
      document.getElementById("citizen_message").innerHTML = cleanGetData(urlVariables["citizen_message"]);
   }
})();