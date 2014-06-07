// ==UserScript==
// @name STO Gateway Holdings Leaderboard Downloader
// @version 0.6
// @description Downloads CSV of all holdings leaderboards
// @match http://gateway.startrekonline.com/*
// ==/UserScript==


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

function downloadURL(url,fname) {
    linky=document.createElement('a');
    linky.download=fname;
    linky.href=url;
    linky.click();
};

// function navigateToHolding(tag) {
//    fleetname=window.location.hash.split('/')[0];
//    window.location.href='/' + fleetname + '/holdings/' + tag + '/leaderboard';
// };
    
function processHolding() {

    // place=document.getElementById('leaderboard_table_info').innerText;  

    // navigateToHolding(tag);

    csv = '';
    prv=document.getElementById('leaderboard_table_previous');
    nxt=document.getElementById('leaderboard_table_next');

    while (!hasClass(prv,'paginate_button_disabled')) {prv.click();} // Ensure we're on page one.

    while (true) {
        entries=document.querySelectorAll('tr.odd,tr.even');
        for (var i=0 ; i < entries.length ; i++) {
            entry=entries[i];
            name=entry.getElementsByClassName('leaderboard-name-text')[0].innerText;
            nameParts=name.split('@');
            toon=nameParts[0]; acct=nameParts[1];
            score=entry.getElementsByClassName('leaderboard-contributions-cell')[0].innerText;
            score=parseInt(score.replace(/,/g, ''), 10)
            csvLine=[toon,acct,score].join(',') + '\r\n';
            csv += csvLine;
        }
        if (hasClass(nxt,'paginate_button_disabled')) { break; }
        nxt.click();
    }
    return csv;
};


function getCSV() {
    csv=processHolding();
    //csvBase64=btoa(csv);
    //csvUrl="data:text/csv;charset=utf-8;base64," + encodeURIComponent(csvBase64);
    csvUrl="data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    downloadURL(csvUrl,'leaderboard.csv');
}

window.addEventListener('hashchange', function() {
    var getCSVlink = document.getElementById('getCSVlink');
    if (getCSVlink === null) {
        getCSVlink = document.createElement('a');
        getCSVlink.id = 'getCSVlink';
        var getCSVlinkText = document.createTextNode("Download Leaderboard");
        getCSVlink.appendChild(getCSVlinkText);
        getCSVlink.title = "Download Leaderboard";
        getCSVlink.onclick=function(){getCSV();}
        document.body.appendChild(getCSVlink);
    }
    if (/#fleet\(.*\)\/holdings\/.*\/leaderboard/.test(window.location.hash)) {
        getCSVlink.style.display = 'block';
    }
    else {
        getCSVlink.style.display = 'none';
    }
});
