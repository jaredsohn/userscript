// ==UserScript==
// @name          UD Avatar
// @description   Adds Avatars to UD Profiles

// @include       http://*urbandead.com/profiles.cgi*
// @exclude       http://*urbandead.com/profiles.cgi?mode=edit*
// ==/UserScript==

var profile= location.href 
profile= profile.match(/[0-9]+/) //Gets UDID


 GM_xmlhttpRequest({
   method:"GET",
   url:"http://jmk.onlinewebshop.net/avatar.php?udid="+profile,
   headers:{
        			"Accept": "text/html",
			"Content-type": "application/x-www-form-urlencoded",
			"Connection": "close"
   },
    onload: function(responseDetails) {

var url= responseDetails.responseText

if (url == 'nothing')
{
return;
}


url=encodeURI(url)

document.body.innerHTML= document.body.innerHTML.replace(/<td class="slim" colspan="2" height="250">/,"<td class=\"slim\" colspan=\"2\" height=\"250\"><img src='"+url+"' width='250px\" height=\"255x\"><div style=\"width:200px;height:250px;text-align:center\">") //Puts image in profile.

    }
});
