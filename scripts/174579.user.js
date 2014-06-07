// ==UserScript==
// @name       Draft-o-matic
// @namespace   http://userscripts.org/users/526468
// @description Fast forward time with the draft-o-matic
// @include     http://www.simdynasty.com/draft.jsp
// @version     1
// @grant       none
// @include        http://simdynasty.com/*
// @include        http://*.simdynasty.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js
// @resource       uiCss    http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/themes/base/jquery-ui.css
// @version        1.0.3
// ==/UserScript==
// ==/UserScript==

alert('stuff');

//MASTER!
$(document).ready(function() {
    // Managing Age
    // Grabs the players row and finds the age column and leaves only the OS age.
    $('#draft-table tr').each(function() {
        var age = $(this).find('td:eq(4)');
        // after finding the age, it takes the age and removes the current age and ()'s, then adds 1 since it will be 1 year older once its actually on your team.
        ageInt = parseInt(age.text().substring(4,6)) + 1;
        // actually does the html replacement on the screen
        age.replaceWith('<td class="age">' + ageInt + '</td>');
        
        // Calculate Improvements
        var improves = 0;
        switch (ageInt) {
            case 18:
            improves = 40;
            case 19:
            improves = 32;
            case 20:
            improves = 24;
            case 21:
            improves = 18;
            case 22:
            improves = 16;
            case 23:
            improves = 14;
            case 24:
            improves = 12;
            case 25:
            improves = 8;
        }
        
        // Grab the td that CvR is in
        //DEBUGGER
        // var cvr = $('#playerrow0').find('td:eq(11)');
        var cvr = $(this).find('td:eq(11)');
        cvr.css('background-color','yellow');
        // Grab the players CvR skill and convert it to text.
        var cvrInt = ($(this).find('td:eq(11)')).text();
           
        // function which takes a letter and converts it to its number value
        function letterToNumber(letter) {
            switch (letter) {
                case "F":
                return 1;
                case "D-":
                return 4;
                case "D":
                return 12;
                case "D+":
                return 20;
                case "C-":
                return 28;
                case "C":
                return 36;
                case "C+":
                return 44;
                case "B-":
                return 52;
                case "B":
                return 60;
                case "B+":
                return 68;
                case "A-":
                return 76;
                case "A":
                return 84;
                case "A+":
                return 92;
            }
        }

// DEBUG - REPLACE PLAYER ROW NUMBER WITH PLAYER NUMBER
/*
        var debug = $('#playerrow3').find('td:eq(11)').text();
        console.log(debug);
        var newSkilldebug = (improves + (letterToNumber(cvrInt)));
        var age = $(debug).find('td:eq(4)');
*/
// END DEBUG
      
        var newSkill = (improves + (letterToNumber(cvrInt)));

        function numberToLetter(number) {
                if (number <= 3) {
                    return 'F';
                } 
                if (number >= 4 && number <= 11) {
                    return 'D-';
                }
                if (number >= 12 && number <= 19) {
                    return 'D';
                }
                if (number >= 20 && number <= 27) {
                    return 'D+';
                }
                if (number >= 28 && number <= 35) {
                    return 'C-';
                }
                if (number >= 36 && number <= 43) {
                    return 'C';
                }
                if (number >= 44 && number <= 51 ) {
                    return 'C+';
                }
                if (number >= 52 && number <= 59) {
                    return 'B-';
                }
                if (number >= 60 && number <= 67) {
                    return 'B';
                }
                if (number >= 68 && number <= 75) {
                    return 'B+';
                }
                if (number >= 76 && number <= 83) {
                    return 'A-';
                }
                if (number >= 84 && number <= 91) {
                    return 'A';
                }
                if (number >= 92) {
                    return 'A+';
                }   
            }

        var finalSkill = numberToLetter(newSkill);
        cvr.replaceWith('<td class="CvR">' + finalSkill + '</td>');
    });
});

/*
Exception: prompt aborted by user
@425
*/