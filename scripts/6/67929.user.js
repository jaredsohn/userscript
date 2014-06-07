// ==UserScript==
// @name           Wretch Album Expander for Google Chrome Browser
// @namespace      http://blog.wu-boy.com/2010/02/03/1997/
// @description    Expand wretch album
// @include        http://www.wretch.cc/album/album.php*
// @include        http://www.wretch.cc/album/*
// ==/UserScript==

// ==============================================
// Wretch AD remover
// ==============================================

function wretch_ad_remover()
{
    var p;
    p = document.getElementById("ad_banner");
    if (p)
        p.parentNode.removeChild(p);

    p = document.getElementById("ad_button");
    if (p)
        p.parentNode.removeChild(p);
}

// ==============================================
// Wretch Album Expander
// ==============================================

function album_expander(user_id)
{
  var p = document.getElementById("ad_square");
  var id_check = "/.*" + user_id.toLowerCase() + ".*/";
  var ImgList = p.getElementsByTagName("img");
  var aLink = p.getElementsByTagName("a");
  var imgs = '';
  for(var i = 0; i < ImgList.length; i++)
  {    
    if(ImgList[i].src.toLowerCase().match(id_check))
    {
      var imgsrc = ImgList[i].src.replace(/\/thumbs\/t?/, '/');
      imgs += '<a href="' + aLink[i] + '"><img alt="" src="' + imgsrc + '"></a><br />';   
    }
  }
  var showResult = document.getElementById("MySpace");
  showResult.innerHTML = imgs;
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
var UserID = getUrlVars()["id"];
album_expander(UserID);
wretch_ad_remover();
