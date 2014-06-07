// Old Fashun'd Sigs
// version 1.1
// script created by CAVX
// then Iggyhopper came in and made the code all nice.
// after that CAVX added a few finishing touches.
//
// ==UserScript==
// @name          Old Fashun'd Sigs
// @description   More nostalgia!
// @include       http://*bungie.net/*posts.aspx*
// ==/UserScript==


var Posts = function()
{
    var A = []; //Array
    if (location.pathname.split("/")[location.pathname.split("/").length - 1] == "posts.aspx")
    {
        var S = document.getElementById("ctl00_mainContent_spamReportLoadingPanel"); //Starting node
        var L = function(N, I) //Looper
        {
            var IString = I < 10 ? "0" + I : I;
            A.push({
            Content: document.getElementById("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_PostBlock"),
            Signature: document.getElementById("ctl00_mainContent_postRepeater1_ctl" + IString + "_ctl00_postControl_skin_signatureLabel")
            });
            if (N.nextSibling.nextSibling.tagName == "BR")
            {
                return;
            }
            else
            {
                L(N.nextSibling.nextSibling, I + 1);
            }
        };
        L(S.nextSibling.nextSibling, 1); //Loop
    }
    else
    {
        return false;
    }
    return A;
}();

for (var I = 0; I < Posts.length; I++)
{
 if (Posts[I].Content)
 {
  if (Posts[I].Signature.innerHTML != "") {    Posts[I].Content.innerHTML += "<hr><div class='signature' style='overflow:inherit; height:inherit; border-style:dashed; margin-bottom:10px; background:#202020;'>" + Posts[I].Signature.innerHTML + "</div>";     }
 }
}

// if I was a meglomaniac
// and I'm not
// THAT'S where I'd be.