
//========================================================================================
// ==UserScript==
//
// @name          tinyMCE - custom elements
// @version       1.0
// @description   Addon for tinyMCE to add custom codes (or icons/smilies/emoticons)
//
// @match         http://*.*
// @run-at        document-end
//
// ==/UserScript==
//========================================================================================

// Inject this script into page
if ('undefined' == typeof __AgiCore_UserScript_tinyMCE_CustomInserts__)
{
  (function page_scope_runner()
  {
  var my_src = "(" + page_scope_runner.caller.toString() + ")();";
  var script = document.createElement('script');
  script.setAttribute("type", "text/javascript");
  script.textContent = "var __AgiCore_UserScript_tinyMCE_CustomInserts__ = true;\n" + my_src;
  setTimeout(function()
  {
    document.head.appendChild(script);
    document.head.removeChild(script);
  }, 0);
  })();
  return;
}

(function(){try{

  // this website doesnt use tinyMCE
  if (typeof tinyMCE != "object") return;

  // this is the textarea that tinyMCE uses
  // if that doesnt exist, then the side doesnt contain the editor
  if (!document.getElementById("text")) return;

  // http://ejohn.org/blog/flexible-javascript-events/
  function addEvent(obj,type,fn){if(obj.addEventListener){obj.addEventListener(type,fn,false);}else if(obj.attachEvent){obj["e"+type+fn]=fn;obj[type+fn]=function(){obj["e"+type+fn](window.event);};obj.attachEvent( "on"+type,obj[type+fn]);}}
  function removeEvent(obj,type,fn){if(obj.removeEventListener){obj.removeEventListener(type,fn,false);}else if(obj.detachEvent){obj.detachEvent("on"+type,obj[type+fn]);obj[type+fn]=null;obj["e"+type+fn]=null;}}

  function wait4(condition, callback, timeout, looptime)
    {if(typeof condition!="function")return;if(typeof callback!="function")return;if(typeof looptime!="number")looptime=100;if(typeof timeout!="number")timeout=false;if(timeout!==false&&timeout<0)callback(true);else if(condition())callback(false);else window.setTimeout(function(){wait4(condition,callback,timeout===false?false:timeout-looptime,looptime);},looptime);}

  window.tinyMCE_addCustom = function(tabTitle, tabId, list)
  {
    if (typeof list != "object" || typeof list.length != "undefined") return false;
    wait4(
      function(){return (typeof document.getElementById("tabMenuList") == "object");},
      function()
      {

        var tabMenuList = document.getElementById("tabMenuList");
        var tabContent = document.getElementById("tabContent");

        var tabMenuListLi = document.createElement("li");
        tabMenuListLi.className = "";
        tabMenuListLi.id = tabId+"Tab";
        tabMenuList.appendChild(tabMenuListLi);

        var tabMenuListLiLink = document.createElement("a");
        addEvent(tabMenuListLiLink, "click", function(){tabbedPane.openTab(tabId);});
        tabMenuListLi.appendChild(tabMenuListLiLink);

        var tabMenuListLiLinkSpan = document.createElement("span");
        tabMenuListLiLinkSpan.innerHTML = tabTitle;
        tabMenuListLiLink.appendChild(tabMenuListLiLinkSpan);

        var tabContentDiv = document.createElement("div");
        tabContentDiv.id = tabId;
        tabContentDiv.style.display = "none";
        tabContent.appendChild(tabContentDiv);

        tabbedPane.addTab(tabId, false);

        for (var i in list)
        {
          var a = document.createElement("a");
          a.innerHTML = list[i];
          eval("a.title = '"+i.replace(/'/g, "\\'").replace(/</, "&lt;").replace(/>/, "&gt;")+"';");
          tabContentDiv.appendChild(a);
          addEvent(a, "click", function(){tinyMCE.insertText(this.title);});
        }

      }
    );
    return true;
  };

}catch(e){alert(e);}})();
