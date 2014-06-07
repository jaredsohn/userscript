// ==UserScript==
// @name           Add Weapon Tags (All RT)
// @namespace      trey_allen@hotmail.com
// @description    Adds Weapon Tags on all RT pages
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// ==/UserScript==

(function() {

    try {
        var forms = document.getElementsByTagName("form");
        var postBox;
        for(i in forms) {
            if(forms[i].name == "post") {
                postBox = forms[i];
                break;
            }
        }
        if(postBox.name == "post") {
            var postDiv = postBox.getElementsByTagName("div")[0];
            if(document.URL == "http://" + document.domain + "/members/" ||
               document.URL.match("http://" + document.domain + "/members/index.php") ||
               document.URL == "http://" + document.domain + "/members/journal/" ||
               document.URL.match("http://" + document.domain + "/members/journal/index.php")) {
                var postRow = postDiv.getElementsByTagName("tr")[4];
               } 
            else if(document.URL.match("http://" + document.domain + "/members/messaging/"))
                var postRow = postDiv.getElementsByTagName("tr")[3];
            else                 
                var postRow = postDiv.getElementsByTagName("tr")[1];

            var postTextBox = postBox.getElementsByTagName("textarea")[0];
            
            var characterArray = ["1st Cav Fist", "Chainsaw", "Cricket Bat", "Crowbar", "Flamethrower", "Laser", "Machete", "Nerd Nuke", "Noob Hammer", "OSTJH Sword", "Recon Shelter", "Report BR", "RPGG", "Shotgun", "Sass Sniper", "Truth Katana"];
            var characterSelect = document.createElement("select");
            var characterCell = document.createElement("td");
            characterCell.vAlign = "bottom";
            
            characterSelect.appendChild(document.createElement("option"));
            characterSelect.title = "Insert Weapon Image tags for the Anti-Noob weapons!";
            characterSelect.firstChild.innerHTML = "Weapons";
            
            for(i=1; i<characterArray.length + 1; i++) {
                characterSelect.appendChild(document.createElement("option"));
                characterSelect.childNodes[i].innerHTML = characterArray[i-1];
                characterSelect.childNodes[i].addEventListener("click", postColor, false);
                characterSelect.addEventListener("blur", function() { 
                    this.selectedIndex = 0; 
                }, false);
            }
            characterCell.appendChild(characterSelect);
            postRow.insertBefore(characterCell, postRow.childNodes[2]);
        }
    } catch(e) {console.log(e);}
})();

function postColor() {
    var postBox = document.getElementsByTagName("textarea")[0];
    
    var values = ["http://img.photobucket.com/albums/v289/TreyAllen/1stCavFist.jpg",
"http://img.photobucket.com/albums/v289/TreyAllen/ChainsawDoom.jpg",
 "http://img.photobucket.com/albums/v289/TreyAllen/CricketBat.jpg",
 "http://img.photobucket.com/albums/v289/TreyAllen/CrowbarOfG.jpg",
 "http://img.photobucket.com/albums/v289/TreyAllen/GhostFlameThrower.jpg",
 "http://img.photobucket.com/albums/v289/TreyAllen/LurkerLaser.jpg",
 "http://img.photobucket.com/albums/v289/TreyAllen/Machete.jpg",
"http://i465.photobucket.com/albums/rr12/BasselDaGr8/nuke.jpg",
"http://img.photobucket.com/albums/v289/TreyAllen/NoobHammer.jpg",
"http://images.roosterteeth.com/Filthykillz4990d068d6542.jpg",
"http://img.photobucket.com/albums/v289/TreyAllen/ReconShelter.jpg",
"http://img.photobucket.com/albums/v289/TreyAllen/ReportBR.jpg",
"http://img.photobucket.com/albums/v289/TreyAllen/RPGG.jpg",
"http://i465.photobucket.com/albums/rr12/BasselDaGr8/shotgunultimate.jpg",
"http://img.photobucket.com/albums/v289/TreyAllen/SOS.jpg",
"http://img.photobucket.com/albums/v289/TreyAllen/TruthKatana.jpg",];
    var chosenName = this.value;
    
    switch(chosenName) {
        case "1st Cav Fist":
            postBox.value += "[img]" + values[0] +"[/img]";
            break;
        case "Chainsaw":
            postBox.value += "[img]" + values[1] +"[/img]";
            break;
        case "Cricket Bat":
            postBox.value += "[img]" + values[2] +"[/img]";
            break;
        case "Crowbar":
            postBox.value += "[img]" + values[3] +"[/img]";
            break;
        case "Flamethrower":
            postBox.value += "[img]" + values[4] +"[/img]";
            break;
        case "Laser":
            postBox.value += "[img]" + values[5] +"[/img]";
            break;
        case "Machete":
            postBox.value += "[img]" + values[6] +"[/img]";
            break;
        case "Nerd Nuke":
            postBox.value += "[img]" + values[7] +"[/img]";
            break;
        case "Noob Hammer":
            postBox.value += "[img]" + values[8] +"[/img]";
            break;
        case "OSTJH Sword":
            postBox.value += "[img]" + values[9] +"[/img]";
            break;
        case "Recon Shelter":
            postBox.value += "[img]" + values[10] +"[/img]";
            break;
        case "Report BR":
            postBox.value += "[img]" + values[11] +"[/img]";
            break;
        case "RPGG":
            postBox.value += "[img]" + values[12] +"[/img]";
            break;
        case "Shotgun":
            postBox.value += "[img]" + values[13] +"[/img]";
            break;
        case "Sass Sniper":
            postBox.value += "[img]" + values[14] +"[/img]";
            break;
        case "Truth Katana":
            postBox.value += "[img]" + values[15] +"[/img]";
            break;
    }
}