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

   if ((window.location.host == "beta.darkthrone.com") &&
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
// Test recruiter Loop
// *******************************************************************

   if ((window.location.host == "www.darkthrone.com") &&
      (window.location.pathname == "/recruiter/recruit"))
   {
      window.setTimeout(function()
      {
         window.document.title = 'Dark Throne Recruit!';
         var test = document.getElementById("recruit");
         if (test != null)
            test.click();
      }
      
      , 3000);
      
      window.document.title = 'Dark Throne Recruit';
   }


// ---- Place Standard B.S. Below

}

)();
