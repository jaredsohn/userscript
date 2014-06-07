// ==UserScript==
// @name           Google Grooveshark Search
// @description    Adds a 'Search on Grooveshark' button to Google's black navigation bar
// @include        /(https?://)?(www\.)google\.\w{2,3}\.?\w{0,2}/*
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @grant          GM_addStyle
// @version        2.2
// Created by MickeyXD AKA 'SoullessWaffle' - http://stackoverflow.com/users/1233003/mickeyxd - with the help of Stack Overflow user Brock Adams - http://stackoverflow.com/users/331508/brock-adams
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0. It restores the sandbox.
*/
    
function addGroove(retrievedText) {
    //Set up the elements
    var bar = document.getElementById("gbzc");
    var grooveyImage = document.createElement("img");
    var link = document.createElement("a");
    var listy = document.createElement("li");
    grooveyImage.src = "https://photos-4.dropbox.com/t/0/AAACZP8YSa8DquwCnhQIA22ehN-rYuDeSAdeQXVSckHplg/12/65715725/png/1024x768/3/1372971600/0/2/GrooveyGoogleLogoGrey.png/AfWZVumqcBTZtqlGWquA3dybPtQa10i3xDgheZB9v28";
    grooveyImage.style.height = "28px";
    grooveyImage.id = "grvshrkimg";
    
    //Set the image to change when the cursor hovers over it
    grooveyImage.onmouseover = function onHover() {
        $("#grvshrkimg").attr('src', 'https://photos-1.dropbox.com/t/0/AABXFEzXsdiRBY7kexbHQ-e_SxCoMPfQrrkmxG3UbbLjPQ/12/65715725/png/1024x768/3/1372975200/0/2/GrooveyGoogleLogoWhite.png/RNPOe7ESqZ800ND5mAz1mgGJRBRpsiSkJPA0M2nu3Kg');
    };
    grooveyImage.onmouseout = function offHover() {
        $("#grvshrkimg").attr('src', 'https://photos-4.dropbox.com/t/0/AAACZP8YSa8DquwCnhQIA22ehN-rYuDeSAdeQXVSckHplg/12/65715725/png/1024x768/3/1372971600/0/2/GrooveyGoogleLogoGrey.png/AfWZVumqcBTZtqlGWquA3dybPtQa10i3xDgheZB9v28');
    };

    //Determine which href to use
    if (retrievedText === "") {
        link.href = "http://grooveshark.com";
    } else {
        link.href = "http://grooveshark.com/#!/search?q=" + retrievedText;
    }

    //Nest and display everything
    link.appendChild(grooveyImage);
    listy.appendChild(link);
    listy.id = "grvshrkbtn";
    listy.className = "gbt";
    if (!document.getElementById("grvshrkbtn")) {
        bar.appendChild(listy);
    } else {
        bar.replaceChild(listy, document.getElementById("grvshrkbtn"));
    }
}

//Initialize
$(document).ready(function () {
    addGroove(document.getElementById("gbqfq").value);
});

//Watch textfield for changes
$("#gbqfq").bind("input", function () {
    addGroove($(this).val());
});