// ==UserScript==
// @name           TF2R progression
// @author         keywc
// @description    You're not raffling enough. GET TO 100% NOW
// @version        1.1
// @include        http://tf2r.com/user/*
// ==/UserScript==


    // Fixes the rank progression because the tf2r staff will never do it
    currentRep = document.getElementsByClassName('participant_font upvb')[0].innerHTML.match(/\d+/g);
    var progression = 1;
    if(currentRep < 1000)
    {
        progression = currentRep / 1000;
    } else if(currentRep < 2500)
    {
        progression = (currentRep - 1000) / 1500;
    } else if(currentRep < 5000)
    {
        progression = (currentRep - 2500) / 2500;
    } else
    {
        progression = currentRep / 5000;
    }
    progression *= 100;
    
    // CSS that breaks every week
    var rankText = document.getElementsByTagName('td')[6].getElementsByTagName('div')[0].getElementsByTagName('div')[1];
    rankText.style.textAlign = 'center';
    rankText.style.color = '#EBE2CA';
    rankText.style.position = 'relative';
    rankText.style.top = '-18px';
    rankText.innerHTML = Math.round(progression) + '%';
    
    var rankBar = document.getElementsByTagName('td')[6].getElementsByTagName('div')[0].getElementsByTagName('div')[0];
    rankBar.innerHTML = 'I'; // spaces are ignored for some reason now
    if(progression > 100)
    {
        progression = 100;
    }
    rankBar.style.color = '#007300';
    rankBar.style.width = Math.round(progression) + '%';