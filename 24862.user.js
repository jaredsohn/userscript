// ==UserScript==
// @name           FS ATtack
// @namespace      chaoticxz
// @description    auto
// @include        *
// ==/UserScript==
(

function()
{

// ---- Place Standard B.S. Above


// *******************************************************************
// Beta recruiter Loop
// *******************************************************************

   if ((window.location.host == "www.fallensword.com") &&
      (window.location.pathname == "/index.php?cmd=world&subcmd=viewcreature&creature_id="))
   {
      window.setTimeout(function()
      {
         window.document.title = 'FS Bang!';
         var test = document.getElementById("Attack Creature");
         if (test != null)
            test.click();
      }
      
      , 3000);
      
      window.document.title = 'FS Start';
   }
   
// *******************************************************************
// Omega recruiter Loop
// *******************************************************************

   if ((window.location.host == "omega.darkthrone.com") &&
      (window.location.pathname == "/recruiterloop.dt"))
   {
      window.setTimeout(function()
      {
         window.document.title = 'Omega Bang!';
         var test = document.getElementById("recruiter_nextimg");
         if (test != null)
            test.click();
      }
      
      , 3000);
      
      window.document.title = 'Omega Start';
   }


// ---- Place Standard B.S. Below

}

)();
