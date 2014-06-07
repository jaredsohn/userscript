// ==UserScript==

// @name           Add Character Color tags

// @namespace      ACCT@kwierso.com

// @include        http://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*

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

            

            var characterArray = ["Church", "Tucker", "Caboose", "Sarge", "Grif", "Simmons", "Donut"];

            var characterSelect = document.createElement("select");

            var characterCell = document.createElement("td");

            characterCell.vAlign = "bottom";

            

            characterSelect.appendChild(document.createElement("option"));

            characterSelect.title = "Insert [color] tags for common RvB characters!";

            characterSelect.firstChild.innerHTML = "Characters";

            

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

    

    var values = ["steelblue", "teal", "blue", "red", "orange", "maroon", "hotpink"];

    var chosenName = this.value;

    

    switch(chosenName) {

        case "Church":

            postBox.value += "[b][color=" + values[0] +"] [/color][/b]";

            break;

        case "Tucker":

            postBox.value += "[b][color=" + values[1] +"] [/color][/b]";

            break;

        case "Caboose":

            postBox.value += "[b][color=" + values[2] +"] [/color][/b]";

            break;

        case "Sarge":

            postBox.value += "[b][color=" + values[3] +"] [/color][/b]";

            break;

        case "Grif":

            postBox.value += "[b][color=" + values[4] +"] [/color][/b]";

            break;

        case "Simmons":

            postBox.value += "[b][color=" + values[5] +"] [/color][/b]";

            break;

        case "Donut":

            postBox.value += "[b][color=" + values[6] +"] [/color][/b]";

            break;

    }

}