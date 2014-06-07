// ==UserScript==
// @name        Outlook.com - Hide right hand side vertical pane
// @namespace   http://www.outlook.com
// @description Outlook.com - Hide right hand side vertical pane
// @include     https://*.mail.live.com/*
// @version     1.2
// ==/UserScript==

function hideRightHandPane()
{
    // Remove right hand side pane
    var verticalPane = document.getElementById('SkyscraperContent');
    verticalPane.style.visibility = 'hidden';

    // Expand message area width
    var mainContentArea = document.getElementById('MainContent');
    mainContentArea.style.right = 0;

    // Remove the top white header
    var headerPane = document.getElementById('c_header');
    var divToRemove = headerPane.childNodes[0];
    headerPane.removeChild(divToRemove);
}

window.addEventListener('load', hideRightHandPane);