// ==UserScript==
// @name           HSBC Login
// @namespace      Mina Magdy (Thanks to Jo De Boeck,Mohammed Azmy)
// @include        https://www.hsbc.com.eg/1/2/!ut/*
// ==/UserScript==

unsafeWindow.enterPressed = function (myfield,e)
{
  fillFields();
}

function fillFields ()
{ 
name2num = new Array();
name2num["first"] = 1;
name2num["second"] = 2;
name2num["third"] = 3;
name2num["fourth"] = 4;
name2num["fifth"] = 5;
name2num["sixth"] = 6;
name2num["seventh"] = 7;
name2num["eighth"] = 8;
name2num["ninth"] = 9;
name2num["tenth"] = 10;

  pwd = document.getElementById("pwd").value;
  for (i=1; i < 4; i++) 
  {
    var field = document.getElementById("RCCfield" + i);
    var text = field.parentNode.children[2].innerHTML;
    var indx = null;
    if (text.indexOf("last") > 0)
    {
      text = text.replace(" last","")
      indx = pwd.length - parseInt(name2num[text]) + 1;
    }
    else if (text == "last")
    {
      indx = pwd.length
    }
    else
    {
       indx = name2num[text];
    }
    if ((indx == null)||(indx < 1) || (indx > pwd.length))
    {
      field.value = '';
      continue;
    }
    field.value = pwd[indx - 1];
  }
}

//Only show the input box in the login page
if (document.getElementById("RCCfield1"))
{
  p = document.getElementsByTagName("form")[0].parentNode
  p.innerHTML = "<tr><td colspan='3'>Password : <input type='password' id='pwd' onKeyUp='enterPressed(this,event)'><BR></tr>\n" + p.innerHTML;
}