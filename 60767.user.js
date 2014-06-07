// ==UserScript==
// @name           Add Character Avatars
// @namespace      ACA@kwierso.com
// @include        http://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// @include        http://strangerhood.com/*
// @include        http://roosterteethcomics.com/*
// @include        http://captaindynamic.com/*
// ==/UserScript==

// This is where we create and add the dropdown of character names
(function() {
    try {
        // Find the post form
        var forms = document.getElementsByTagName("form");
        var postBox;
        for(i in forms) {
            if(forms[i].name == "post") {
                postBox = forms[i];
                break;
            }
        }

        // Find the row in the post form that has all the other formatting buttons.
        if(postBox.name == "post") {
            var postDiv = postBox.getElementsByTagName("div")[0];
            var postRows = postDiv.getElementsByTagName("tr");
            for(var i in postRows) {
                if(postRows[i].firstElementChild.innerHTML == "Body") {
                    var postRow = postRows[i];
                    break;
                }
            }

////////////// This is where you can add items to the dropdown. Just make sure the name is in quotes
            // and that it has a comma between it and any other names.
            var characterArray = ["Sarge", "Simmons", "Grif", "Donut", "Lopez", "Church", "Tucker", "Caboose",
                                  "Agent Texas", "Sheila", "Doc", "O'Malley", "Vic", "Agent Wyoming", "Gary", 
                                  "Andy", "The Alien", "Agent York", "Sister", "Delta", "Agent Washington", 
                                  "Agent South", "The Meta", "CT", "Epsilon"];
////////////// Everything else you'd need to change is in the second function down at the bottom...

            // Create the dropdown.
            var characterSelect = document.createElement("select");
            var characterCell = document.createElement("td");
            characterCell.vAlign = "bottom";

            characterSelect.appendChild(document.createElement("option"));
            characterSelect.title = "Insert TheRecreator's character avatar images!";
            characterSelect.firstChild.innerHTML = "Characters";

            // Populate the dropdown with the character names.
            for(i=1; i<characterArray.length + 1; i++) {
                characterSelect.appendChild(document.createElement("option"));
                characterSelect.childNodes[i].innerHTML = characterArray[i-1];
                characterSelect.childNodes[i].addEventListener("click", postColor, false);
                characterSelect.addEventListener("blur", function() { 
                    this.selectedIndex = 0; 
                }, false);
            }

            // Add the dropdown to the post form.
            characterCell.appendChild(characterSelect);
            postRow.insertBefore(characterCell, postRow.childNodes[2]);
        }
    } catch(e) {console.log(e);}
})();

// This is where the text gets added to the post.
function postColor() {
    var postBox = document.getElementsByTagName("textarea")[0];
    var tag = "[img]http://i395.photobucket.com/albums/pp32/The_Recreator/RvB_icon/REPLACETHIS.png[/img]";
    var chosenName = this.value;

    // Turn the names to lowercase, and remove the words "agent", "the", and any apostrophes in the names.
    chosenName = chosenName.toLowerCase();
    chosenName = chosenName.replace("agent ", "");
    chosenName = chosenName.replace("'", "");
    chosenName = chosenName.replace("the ", "");

    // If, after lowercasing and removing those words, the name still doesn't match the filename for that image,
    // just change it manually.
    // Remember, the transformations have already occurred, so "Agent Texas" is currently "texas"!
    switch(chosenName) {
        case "texas":
            chosenName = "tex";
            break;
        case "washington":
            chosenName = "wash";
            break;
    }
    postBox.value += tag.replace("REPLACETHIS", chosenName);
    postBox.focus();
}
