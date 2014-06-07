// ==UserScript==
// @name        Its Learning - Open submissions in new tab
// @namespace   http://rasmuswriedtlarsen.com
// @copyright 	2014, Rasmus Wriedt Larsen
// @version     0.1
// @description Can open the individual page for all selected submissions
// @match       https://absalon.itslearning.com/essay/read_essay.aspx*
// @grant       GM_openInTab
// ==/UserScript==

function openAllSubmitted () {
    $("#EssayAnswers_EssayAnswers tr:contains('Afleveret (Submitted)') a[href^='/essay/']").each ( function () {
        GM_openInTab(this.href)
        //console.log(this.href)
    } );
}

$("div.toolbar").append("<a id='rasmus-hack'>Open all Submitted</a>")
$("#rasmus-hack").click( openAllSubmitted );