// ==UserScript==
// @name           Megafree.kz NoTimer v1.1
// @date           8.08.2010
// @namespace      http://timur.idhost.kz
// @description    Allow to get direct link on megafree.kz without need to wait.
// @author         Ibraev Timur aka h3x[KZ]
// @include        http://megafree.kz/*
// ==/UserScript==

//---------------------------------------------------------------------
// Control visibility
// Author: Sanito
//---------------------------------------------------------------------
function showControl(ctrl, visibility_only)
{
	if (arguments.length == 1)
	{
		visibility_only = false;
	}
	if (typeof(ctrl) == "string")
	{
		ctrl = document.getElementById(ctrl);
	}

	ctrl.style.visibility = "";
	if (!visibility_only)
	{
		ctrl.style.display = "";
	}
}
function hideControl(ctrl, visibility_only)
{
	if (arguments.length == 1)
	{
		visibility_only = false;
	}
	if (typeof(ctrl) == "string")
	{
		ctrl = document.getElementById(ctrl);
	}

	ctrl.style.visibility = "hidden";
	if (!visibility_only)
	{
		ctrl.style.display = "none";
	}
}
//---------------------------------------------------------------------

if (/\/delayfile[0-9]+\//i.test(document.location.pathname))
{
    // Successful match
    //var myregexp = /link[0-9a-z]{1,6}/ig;
    var myregexp = /var *([a-z0-9]+) *= *new Array/ig;
    var x = document.body.innerHTML;
    var match = myregexp.exec(x);

    if (match != null)
    {
        var str = "tmpLink = unsafeWindow." + match[1] + ";";
        eval(str);
        var megaLink = String(tmpLink);
        var megaLink = megaLink.replace(/,/g, "");
        switch (megaLink)
        {
          case '/':
          alert('Похоже файл недоступен попробуйте позже.');
          break;
          
          default:
          hideControl(document.getElementById("block_timer"));
          showControl(document.getElementById("block_link"));
	  document.getElementById("url").href = megaLink;
          document.location.href = megaLink;
        }
        
    }
}
//-END-