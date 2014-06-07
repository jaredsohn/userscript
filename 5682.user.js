// ==UserScript==
// @name           DTRecruiter
// @namespace      IsNaiTeR
// @description    Recruiter for DarkThrone
// @include        *
// ==/UserScript==
(

function()
{

// ---- Place Standard B.S. Above


// *******************************************************************
// Beta recruiter Loop
// *******************************************************************

   if ((window.location.host == "www.darkthrone.com") &&
      (window.location.pathname == "/recruiter/recruitloop.dt"))
   {
      window.setTimeout(function()
      {
         window.document.title = 'DT Bang!';
         var test = document.getElementById("nextimg");
         if (test != null)
            test.click();
      }
      
      , 3000);
      
      window.document.title = 'DT Start';
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
