// ==UserScript==
// @name           letitbit.net helper v1.3 [2009-04-19]
// @namespace      V@no
// @version        1.3
// @creator        V@no
// @date           2009-04-19
// @description    Auto focus on code field, removes download wait delay and displays full path to the file
// @include        http://letitbit.net/*
// ==/UserScript==

/*--------- [ Changes ] -----------
v1.3
- fixed: support for new site design

v1.2
- added: links display automatically after entered security code (don't need press the download button)
- added: autostart ignore list by file extension
- changed: security code input field detection

v1.1
- no page refresh after submitting security code

--------- [ End Changes ] ---------*/

//--------- [ Settings ] ----------

var autoStart = true; //automatically redirect to the downloaded file? The server doesn't send out disposition header, so your browser might open the file in it's window.
var autoStartPopup = false; //open in new window
var autoStartIgnore = []; //["swf", "wmv"]; //list of file extensions that should not be autostarted

//--------[ End Settings ]---------

function ajaxGetFormQuery(obj, rQuery)
{
  if (typeof rQuery == "undefined")
    var rQuery = new Array();

  var p = new Array();
  var o;
  var v;
  var count = -1;
  for(var i in obj.elements)
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
function submitForm(e)
{
  if (typeof(submitForm.j) == "undefined")
  {
    submitForm.j = false;
  }
  if (submitForm.j || !frm)
    return;
  if (frm.elements.namedItem('cap').getAttribute('maxlength') && frm.elements.namedItem('cap').getAttribute('maxlength') != frm.elements.namedItem('cap').value.length)
    return false;
  var v = frm.elements.namedItem('cap').value;
  var d = ajaxGetFormQuery(frm);
  var req = new XMLHttpRequest();
  req.open('POST', frm.action, false); 
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.setRequestHeader("Content-Length", d.length);
  req.setRequestHeader("User-Agent", navigator.userAgent);
  req.send(d);
  var t = req.responseText.match(/link=([^"]+)"/i);
  if (t)
  {
    var txt = '<br /><div class="title" style="font-size:16px;"><div class="top"></div>Direct address to the file:</div><div class="cont c2"><br /><div style="white-space:nowrap; overflow: hidden; margin: 3px; padding: 3px;"><a href="'+t[1]+'" style="font-size: 1em;font-family: arial;">'+t[1]+'</a><br /><br /><input onclick="this.select();" value="'+t[1]+'" style="border: 0; width:100%; background: transparent; font-size: 1em;font-family: arial;"/></div></div>';
    if (document.getElementById("l"))
    {
      document.getElementById("l").innerHTML = txt;
    }
    else
    {
      var b = document.createElement("div");
      b.className = "dlBlock";
      b.setAttribute("id", "l");
      b.innerHTML = txt;
      frm.getElementsByTagName("div")[0].appendChild(b);
    }
    if (autoStart && autoStartIgnore.indexOf(t[1].substr(t[1].lastIndexOf(".")+1,t[1].length)) == -1)
    {
      if (autoStartPopup)
        window.open(t[1]);
      else
        location.href = t[1];
    }
  }
  else
  {
    submitForm.j = true;
    frm.setAttribute("onsubmit", "");
    frm.submit();
  }
  frm.elements.namedItem('cap').value = v;
  return false;
}

// focus on code input field.
var frm = document.getElementById("Premium");
if (frm)
{
  frm.setAttribute("onsubmit", "return false;");
  frm.addEventListener("submit", submitForm, false);
  frm.addEventListener("keyup", submitForm, false);
  frm.elements.namedItem('cap').focus();
}
var p = document.getElementById('ifree');
if (p)
{
  var a = new Array('isms','iplm','iweb','ifree','ires');
  for(var i = 0; i < a.length; i++)
  {
    if (!document.getElementById(a[i]))
      continue;
    document.getElementById(a[i]).style.backgroundColor='#b6bfc4';
    document.getElementById('dv'+a[i]).style.display = 'none';
  }
  p.style.backgroundColor = '#84b43a';
  p.style.Color = '#fff';
  p.title = p.style.backgroundColor;
  frm = document.getElementById('dv'+p.id);
  frm.style.display = 'block';
  frm.setAttribute("onsubmit", "return false;");
  frm.addEventListener("submit", submitForm, false);
  frm.addEventListener("keyup", submitForm, false);
  frm.elements.namedItem('cap').focus();
}
// detecting hidden link to the file, removing countdown and displaying link to the file
var l = document.getElementById('links')
if (l)
{
  window.clearInterval(unsafeWindow.action);
  document.getElementById('countdown').parentNode.removeChild(document.getElementById('countdown'));
  var a = l.getElementsByTagName('A')[0];
  var f = a.href;
  a.onclick='';
  l.innerHTML = '<a href="'+f+'" style="font-size: 1em;font-family: arial;">'+f+'</a><br /><input onclick="this.select();" value="'+f+'" style="border: 0; width:100%; background: transparent; font-size: 1em;font-family: arial;"/>';
  l.style.display='';
  if (autoStart && autoStartIgnore.indexOf(f.substr(f.lastIndexOf(".")+1,f.length)) == -1)
  {
    if (autoStartPopup)
      window.open(f);
    else
      location.href = f;
  }
}
