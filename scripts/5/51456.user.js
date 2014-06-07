// ==UserScript==
// @name             Random Colored Border Fashun'd Signatures
// @namespace  Random Colored Border Fashun'd Signatures
// @description   Originally by CAVX, but all his script are belong to me nao.
// @include          http://*bungie.net/*posts.aspx*
// ==/UserScript==


function randomColor() {
	var c="#";
	for(var i=5;i>=0;--i)
		c+= "0123456789ABCDEF".charAt(Math.random() * 16);
	return c;
}


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
  if (Posts[I].Signature.innerHTML != "") {    Posts[I].Content.innerHTML += "<hr><div class='signature' style='overflow:inherit; height:inherit; border-style:dashed; border-width:3px; border-color:" + randomColor() + "; margin-bottom:10px; background:#202020;'>" + Posts[I].Signature.innerHTML + "</div>";     }
 }
}

// molvania.com/video_medium_2.html