// ==UserScript==
// @name           Elegant Eenadu
// @namespace 
// @description    Avoids browser refresh when you click on "Full Story"
// @include        http://www.eenadu.net/*
// @include        http://eenadu.net/*
// ==/UserScript==

function requestPage(src)
{
  var xhr = new window.XMLHttpRequest();
  xhr.onreadystatechange = function() { onStateChange(xhr); };
  xhr.open("GET", src);
  xhr.overrideMimeType("text/html; charset=ISO-8859-1");
  xhr.send(null);
}

function onStateChange(xhr)
{
  if (xhr.readyState == 4 && xhr.status == 200)
  {
    var responseText = xhr.responseText;
    var part1 = responseText.substr(responseText.indexOf('<center><font face="Eenadu"'));
    var part2 = part1.substr(0,part1.indexOf("</td>"));
    document.getElementById("content_pane").innerHTML = part2;
  }
}

function addGlobalStyle(css)
{
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function createDialog()
{
  // Add styles for dialog window
  addGlobalStyle('.common { position: absolute; }.dialog_window { background:#FFFFFF none repeat scroll 0%; left:80px; top:100px; border:2px solid lightblue; display:none; width:550px; height:350px; -moz-border-radius:2em }.dialog_close_link { top:5px; left:525px; width:25px; height:25px; font-size:14pt; }.content_pane { top:25px; left:25px; width:500px; height:300px; overflow:auto; }');
  // Create dialog window
  var dialog = document.createElement("div");
  dialog.innerHTML = '<div id="dialog_window" class="common dialog_window"><div class="common dialog_close_link"><a href="#" id="close_dialog" style="text-decoration:none">x</a></div><div id="content_pane" class="common content_pane"></div></div>';
  document.body.insertBefore(dialog, document.body.firstChild);
}

function showDialog()
{
  var dialog_window = document.getElementById("dialog_window");
  dialog_window.style.display = "block";
}

function hideDialog()
{
  var dialog_window = document.getElementById("dialog_window");
  dialog_window.style.display = "none";
}

function adjustDialog()
{
  var dialog_window = document.getElementById("dialog_window");
  dialog_window.style.top = window.scrollY + 100 + "px";
}

function onUserClick(event)
{
  preventDefaultAction = false;
  
  // handle 'Full Story' links
  if(event.target.nodeName == 'FONT' && event.target.parentNode.href)
  {
    preventDefaultAction = true;
    document.getElementById("content_pane").innerHTML = "";
    requestPage(event.target.parentNode.href);
    showDialog();
  }

  // handle 'anchor' links
  if(event.target.nodeName == 'A')
  {
    preventDefaultAction = true;
    if (event.target.id == "close_dialog")
    {
      hideDialog();
    }
    else
    {
      document.getElementById("content_pane").innerHTML = "";
      requestPage(event.target.href);
      showDialog();
    }
  }

  if (preventDefaultAction)
  {
    event.stopPropagation();
    event.preventDefault();
  }
}

// Create dialog window
createDialog();

// Intercept user clicks and open a dialog window
document.addEventListener('click', onUserClick, true);

// Adjust dialog box settings on window scroll
window.addEventListener('scroll', adjustDialog, true);
