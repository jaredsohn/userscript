// ==UserScript==
// @name           depositfiles.com downloader
// @namespace      Joris Voorn
// @version        1.0
// @creator        Joris Voorn
// @date           2009-06-06
// @description    Removes download wait delay, shows direct link to the file and/or automatically redirects to the file
// @include        http://depositfiles.com/*
// @include        http://www.depositfiles.com/*
// ==/UserScript==
//--------- [ Settings ] ----------
var autostart = true; //automatically redirect to the downloaded file?
//--------[ End Settings ]---------
function ajaxGetFormQuery(obj, rQuery)
{
  if (typeof rQuery == "undefined")
    var rQuery = new Array();

  var p = new Array();
  var o;
  var v;
  var count = -1;
  for(var i = 0; i < obj.elements.length; i++)
  {
    count++;
  	o = obj.elements[i];
	  v = rQuery.indexOf(o.name);
	  if (v != -1)
	  {
	    o.value = rQuery[v+1];
	    rQuery.slice(v, 2);
	  }
  	switch(o.tagName)
  	{
    	case "TEXTAREA":
        	p[count] = o.name + "=" + escape(o.value);
      	break;

    	case "SELECT":
         	p[count] = o.name+"="+escape(o.options[o.selectedIndex].value);
    	  break;

    	case "INPUT":
    	  switch(o.type) 
    	  {
      	  case "text":
          	  p[count] = o.name + "=" + escape(o.value);
        	  break;

      	  case "password":
      	      p[count] = o.name + "=" + escape(o.value);
      	    break;

      	  case "radio":
          	  if (o.checked)
          	  {
          	    p[count] = o.name + "=" + escape(o.value);
          	  }
          	  else
          	  {
          	    count--;
          	  }
        	  break;

      	  case "checkbox":
          	  if (o.checked)
          	  {
          	    p[count] = o.name + "=" + escape(o.value);
          	  }
          	  else
          	  {
          	    count--;
          	  }
        	  break;

      	  case "hidden":
          	  p[count] = o.name + "=" + escape(o.value);
        	  break;

      	  default:
      	      count--;
      	    break;
    	  }
    	break;	
  	default:
    	  count--;
  	  break;
  	}	
  }
  v = p.length;
  for(i = 0; i < rQuery.length; i = i + 2)
  {
     p[v+1] = rQuery[i] + "=" + escape(rQuery[i+1]);
  }
  p = p.join("&") + "&" + new Date().getTime();
  return p.replace("&&", "&");
}
function dispResult(txt)
{
  if (!obj)
    return;
  var d = document.createElement("div");
  d.innerHTML = txt;
  d.style.cssText = "white-space:nowrap; overflow: hidden; margin: 3px; padding: 3px; border: 1px solid black;";
  d.setAttribute("colspan", 2);
  d.setAttribute("width", "100");
  d.setAttribute("nowrap", true);
  obj.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(d);
}
var obj = null;
window.addEventListener('load', function(e) {
  var l = document.getElementsByTagName("form");
  var f = null;
  var url = null;
  for(var i in l)
  {
    if (l[i].method == "post" && window.location.href == l[i].action)
    {
      f = l[i];
      break;
    }
  }
  if (!f)
  {
    if (l = document.getElementById("download_url"))
    {
      f = l.getElementsByTagName("form")[0];
      url = f.action;
    }
  }
  if (f || url)
  {
    obj = f;
    if (!url)
    {
      var d = ajaxGetFormQuery(f);
      var req = new XMLHttpRequest();
      req.open('POST', f.action, false); 
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.setRequestHeader("Content-Length", d.length);
      req.setRequestHeader("User-Agent", navigator.userAgent);
      req.send(d);
      var file = req.responseText.match(/<b title="([^"]+)">[^<]+<\/b>/);
      if (file)
        file = file[1];
      var d = document.createElement("div");
      d.innerHTML = req.responseText;//.match(/<body[^>]*>((.|\s)*)<\/body>/)[1];
      ff = d.getElementsByTagName("form");
      for(var i in ff)
      {
        if (ff[i].action.match(file))
        {
          url = ff[i].action;
        }
      }
    }
    if (url)
    {
      dispResult('<a href="'+url+'" style="font-size: 1em;font-family: arial;">'+url+'</a><br /><br /><input onclick="this.select();" value="'+url+'" style="border: 0; width:100%; background: transparent; font-size: 1em;font-family: arial;"/>');
      if (autostart)
      {
        location.href = url;
      }
    }
    else
    {
      dispResult("Error retrieving file address");
    }
  }
}, false);

//Special Thanks To V@no (http://userscripts.org/users/82008)