// ==UserScript==
// @name          Stack Underflow
// @description   Designed to tidy up Stack Overflow's site by making it wider, standardising the font size.
// @version       6
// @include       http://stackoverflow.com/*
// @include       http://www.stackoverflow.com/*
// ==/UserScript==

function addGlobalStyle(css) { //Courtesy of Dive into Greasemonkey
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/* Global */
addGlobalStyle("* { font-size: small !important; }"); //Remove wacky font sizes, noramlise to small
addGlobalStyle(".container { width: 100%; }"); //The main outside container, normally 950px set in a style tag
addGlobalStyle("[width='950'] { width: 100% !important; }"); //Resizes anything with width hard-set at 950px. Includes header and stuff on user page
addGlobalStyle("#content { padding: 10px; }"); //Add padding around the edges of the content

/* Header */
addGlobalStyle(".header-table table { float: right; margin-right: 10px; }"); //This moves the search bar to the right. Comment out if you don't want this
addGlobalStyle("[width='260'] { padding-top: 5px !important; }"); //Remove padding at top of logo
addGlobalStyle("#header { padding-bottom: 0px; }"); //

/* Used on main question/answer page */
addGlobalStyle(".answer { width: 100% }"); //Resizes answers on question page to 100%
addGlobalStyle("#question { width: 100% !important;}"); //Resizes question on question page. In local tag, so need important
addGlobalStyle(".answer table { width: 100% !important; }"); //Resizes question table width
addGlobalStyle("#answer-header { width: 100%; }"); //Resizes question table width. No important as in CSS
addGlobalStyle("[width='710'] { width: 100% !important; }");  //makes main question wider

//Below is ultimately a dirty hack, since we assume everything else will sort out the 5%
addGlobalStyle("#mainbar { width: 75% !important; }"); //Mainbar is the container of the answers. 75% is a guess. We use #subheader to #mainbar otherwise ugly things happen on 
addGlobalStyle("#sidebar { width: 20% !important; }"); //Guess the sidebar is 20% in size. 

//Front page
addGlobalStyle(".question-summary { width: 100%; }"); //Extend the question summary on the front page
addGlobalStyle(".narrow .summary { width: 100% !important; float: none;}");  //Needs !important otherwise .narrow .summary is higher. Removes float to fix alignment

//Search page
addGlobalStyle("#mainbar-full { width: 100% !important; }"); //Mainbar-full is the main wrapper around content on the search page
addGlobalStyle(".summary { width: 100% !important; float: none; }"); //Needs !important otherwise .narrow .summary is highte

//question page
addGlobalStyle("#subheader + #question { width: 75% !important; }"); //If question follows subheader, we know it's a question page so resize question so sidebar will fit
addGlobalStyle(".excerpt { float: none !important; }"); //Needs float removing to fix alignment. Important as it's in local style tag


//Users page

//Nothing... yet

//Ask a question page
addGlobalStyle("input[tabindex] { width: 100%; }"); //If input has size property, make 100%. Avoids problems with checkbox
addGlobalStyle("textarea { width: 100%; }"); 
addGlobalStyle(".form-item { width: 100% !important; }");  //for live preview