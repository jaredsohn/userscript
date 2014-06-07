// ==UserScript==
// @name        Arbetsförmedlingen title rewrite
// @namespace   http://chrio.se
// @description Changes the title of job ad pages to something more useful
// @include     http://www.arbetsformedlingen.se/For-arbetssokande/Lediga-jobb.html*
// @version     1
// @grant       none
// ==/UserScript==

if (/ctl00_cphRubrik_labelAntalPlatsannonser/i.test (document.body.innerHTML) )
{
    document.title = document.getElementById("ctl00_cphRubrik_labelAntalPlatsannonser").textContent + " - Arbetsförmedlingen";
}
document.title = document.querySelector(".showJobPosting-head").textContent;
