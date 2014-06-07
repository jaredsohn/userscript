// ==UserScript==
// @name           Gamin SE Black Edition [Beta]
// @namespace      http://userscripts.org/users/drakee
// @include        http://gaming.stackexchange.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('* { text-shadow: none !important; } ')
addGlobalStyle('html { background-color: #101010 !important;}')
addGlobalStyle('body, h1, h2, h3, h4, h5, h6, p, td { color: #f5f5f5 !important; }')
addGlobalStyle('a { color: #35A928 !important; } ')
addGlobalStyle('blockquote, code, pre { background-color: #202020 !important; color: #f5f5f5 !important; } ')
addGlobalStyle('#bounty-link { color: #101010 !important; }')
addGlobalStyle('.subheader a:hover {  color: #f5f5f5 !important; } ')
addGlobalStyle('.subtabs a, .page-numbers { border: #222222 solid 1px !important; color: #aaaaaa !important; }')
addGlobalStyle('.subtabs a:hover, a:hover > .page-numbers { border: #aaaaaa solid 1px !important; color: #f5f5f5 !important; }')
addGlobalStyle('.subtabs > .youarehere, .page-numbers.current { border: #35A928 solid 1px !important; color: #35A928 !important; }')
addGlobalStyle('.youarehere { color: #f5f5f5 !important; }')
addGlobalStyle('.action-selected, #tag-menu { background: #202020 !important; }')
addGlobalStyle('#content, #sidebar, .container, .subheader, .editing-help, .rep-breakdown-row { background: #101010 !important; border: 0 !important;}')
addGlobalStyle('div[class*=ad] { background-color: transparent !important; border: 0 !important;}')
addGlobalStyle('#mainbar, #footer, .share-tip, .popup, .note, .profile-popup { background: #101010 !important;}')
addGlobalStyle('.question-summary { background: #101010 !important; border: #202020 1px solid !important;  }')
addGlobalStyle('.label-key { color: #f5f5f5 !important; }')
addGlobalStyle('.tags { background: transparent !important; }')
addGlobalStyle('.tagged-ignored { background-color: #101010 !important; opacity: 0.15 !important; }')
addGlobalStyle('.tagged-interesting  { background-color: #202020 !important; opacity: 1.0 !important; }')
addGlobalStyle('.spoiler { background-color: #202020 !important; }')
addGlobalStyle('.spoiler > p {  color: #202020 !important; }')
addGlobalStyle('.vote-count-post, .viewcount { color: #f5f5f5 !important;  } ')
addGlobalStyle('.unanswered { color: #d3293d !important; }')
addGlobalStyle('.answer-votes { background-color: #202020 !important; color: #a5a5a5 !important;}')
addGlobalStyle('.answered-accepted { background: #229e11 !important; color: #f5f5f5 !important;}')
addGlobalStyle('.post-tag { background: #1b4072 !important; border: 0 !important; color: #f5f5f5 !important;}')
addGlobalStyle('.post-tag:hover { box-shadow: none !important; background: #2D69BC !important;} ')
addGlobalStyle('tr.comment-hover { background-color: #202020 !important; }')
addGlobalStyle('a.comment-user.owner { background-color: transparent !important; color: #00afef !important; }')
addGlobalStyle('.comments { color: #aaaaaa !important; }')
addGlobalStyle('.owner a { color: #00afef !important; }')
addGlobalStyle('#wmd-container { background-color: #f5f5f5 !important; color: #000 !important; }')
addGlobalStyle('.revision > td { background-color: #222 !important; }')
addGlobalStyle('.owner-revision > td { background-color: #333322 !important; }')
addGlobalStyle('.reputation-score, .badgecount, .comment { color: #a5a5a5 !important; }')
addGlobalStyle('.post-signature, .date-span, .date_brick { background: #202020 !important; }')
addGlobalStyle('.badge, .badge-tag { background: #444 !important; color: #f5f5f5 !important;}')
addGlobalStyle('.question-status { background-color: #1b4072 !important; }')
addGlobalStyle('.revision-comment { background-color: #202020 !important; color: #f5f5f5 !important;}')
addGlobalStyle('.seContainer, .seNav { background: #101010 !important; }')
addGlobalStyle('.seCurrent, .seIntro, .seFooter { background: #202020 !important; }')
addGlobalStyle('.error-notification { background-color: #d3293d !important; box-shadow: none !important;}')
addGlobalStyle('.wmd-prompt-dialog { background-color: #202020 !important; color: #f5f5f5 !important; border: 3px solid #1b4072 !important; } ')
addGlobalStyle('.wmd-mini-button.selected {background-color: #1b4072 !important; } ')
addGlobalStyle('.spaces, .hi { background-color: #1b4072 !important; } ')
addGlobalStyle('.profile-popup { background: #101010 !important; border: 0 !important;}')
addGlobalStyle('.profile-popup > tr {border: 0 !important;}')