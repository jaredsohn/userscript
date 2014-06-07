// ==UserScript==
// @name           DTRemoveSideBar
// @namespace      IsNaiTeR
// @description    Remove side bar of DarkThrone
// @include        *
// ==/UserScript==
(

function()
{

// ---- Place Standard B.S. Above

// Remove Side Ads
   if (window.location.host.indexOf('darkthrone')>0)
   {
          var foo = window.document.getElementsByTagName('TD');
          var c = 0;
         
          while (c<foo.length)
          {
            if (foo[c].innerHTML.indexOf('frameadvertisement')>0)
            {
               foo[c].parentNode.removeChild(foo[c]);
               c = foo.length // quit
            }
            
            c++;
          }
   }

// ---- Place Standard B.S. Below

}

)();