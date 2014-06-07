// ==UserScript==
// @name        TesteGM
// @match      http://gabrielecirulli.github.io/2048/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @version     1.25
// @grant none
// ==/UserScript==


// this code will be included in the
//var jq = document.createElement('script');
//jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
//document.getElementsByTagName('head')[0].appendChild(jq);

MAX_WIDTH_TABLE = 4;   

function sleep(millis, callback) {
    setTimeout(function() { callback(); }    , millis);
}

// get scores in each tiles and return a array with that
function getCurrentScores() {
    var scores = {};
    var tiles = $("div.tile:not([class~='tile-merged'])");
    
    for(i=1; i<= MAX_WIDTH_TABLE ; i++) {
        scores[i] = {};
        for(j=1; j<= MAX_WIDTH_TABLE ; j++) {        
            scores[i][j] = 0;            
            tiles.filter(".tile-position-" + i + "-" + j).each( function() {
               $.each($(this).attr("class").split(" "), function(k, v) {
                    if(v.match(/tile-[0-9]/) != null) {
                      scores[i][j] += parseInt(v.substring(5));
                    }
               });
            });                
        }
    }                
    return scores;
}

//#####################################################
//##########   Functions to Detail Array  #############
//#####################################################

function countQtdTilesFilled(a) { 
    var qtd = 0;

    for(i=1; i<=MAX_WIDTH_TABLE; i++)
        for(j=1; j<=MAX_WIDTH_TABLE; j++) {
            if (a[i][j] > 0)
                qtd += 1;
        }
    return qtd;
}

function countTwo(a) {
    var qtd = 0;

    for(i =1; i<=MAX_WIDTH_TABLE; i++) 
        for(j =1; j<=MAX_WIDTH_TABLE; j++)
            if (a[i][j] == 2)
                qtd += 1;      
    return qtd;
}

function countTwoCouples(a) {
    var qtdTwoCouples = 0
    
    for(col = 2; col <= MAX_WIDTH_TABLE; col++) 
        for(line = 1; line <= MAX_WIDTH_TABLE; line++)
            if (a[col][line] == 2 && a[col - 1][line] == a[col][line])
                qtdTwoCouples += 1;
    for(line = 2; line <= MAX_WIDTH_TABLE; line++)                
        for(col = 1 ; col <= MAX_WIDTH_TABLE; col++)
            if (a[col][line] == 2 && a[col][line - 1] == a[col][line])
                qtdTwoCouples += 1;
    return qtdTwoCouples;
}

function detailArray(a, name) {
    var detailsObj = new Object();                       
    
    detailsObj.countTwos = countTwo(a);    
    detailsObj.countTwoCouples = countTwoCouples(a);    
    detailsObj.countQtdTilesFilled = countQtdTilesFilled(a);
    detailsObj.totalPoints = (detailsObj.countTwos * -1000) + (detailsObj.countTwoCouples * 200) + (detailsObj.countQtdTilesFilled * (-20));
    detailsObj.name = name;
    return detailsObj;
}

function calculateBestChoice(choicesDetails) {
    var bestCount = -999999;
    var bestChoice = 0;
    var oldTotalPoints = -999999;
    var draw = false;
    
    for (i=0; i< choicesDetails.length; i++) {
        if (choicesDetails[i].totalPoints > bestCount) {
            bestCount = choicesDetails[i].totalPoints;
            bestChoice = i;
        }
        draw = (oldTotalPoints == -999999 || oldTotalPoints == choicesDetails[i].totalPoints);
        oldTotalPoints = choicesDetails[i].totalPoints;        
    }
    return (draw ? 'draw' : choicesDetails[bestChoice].name);
}

//#####################################################
//##########   Functions for Right Move   #############
//#####################################################
function tryRightFistStep(a) {
    var first_position = 0;
    var second_position = 0;    

    for (line = 1; line<=MAX_WIDTH_TABLE; line++) {
        first_position =second_position =0;    
        for (col = 1; col<=MAX_WIDTH_TABLE; col++) {        
            if(a[col][line] > 0) {
                 if(first_position == 0)
                    first_position = col;
                 else 
                    second_position = col; 
            }
            if ( first_position > 0 && second_position > 0) {                
                if (a[first_position][line] == a[second_position][line]) {
                    a[second_position][line] = a[first_position][line] + a[second_position][line];
                    a[first_position][line] = 0;
                    first_position = second_position = 0;
                } else { 
                    first_position = second_position;
                    second_position = 0;
                }
            } 
        }        
    } 
    return a;
}

function tryRightSecondStep(a) {
    var empty_position = 0;
   
    for (line = 1; line <= MAX_WIDTH_TABLE; line++) {
        empty_position = 0;
        for (col = MAX_WIDTH_TABLE; col >= 1; col--) {        
            if(a[col][line] == 0 && empty_position == 0) {    
                empty_position = col;
            }
            if(a[col][line] > 0 && empty_position > 0) {    
                a[empty_position][line] = a[col][line];
                a[col][line] = 0;
                ep = empty_position;
                empty_position =0;
                for (k = ep + 1; k >= col; k--) {
                   if(a[col][line] == 0) {
                      empty_position = col;
                   }
                }                
            }    
        }
    }             
    return a;
}

function tryRight(a) {
    var na = $.extend(true, {}, a);
    na = tryRightFistStep(na);
    na = tryRightSecondStep(na);        
    return detailArray(na, 'right');
}

//#####################################################
//##########   Functions for Left Move   #############
//#####################################################

function tryDownFistStep(a) {
    var first_position = 0;
    var second_position = 0;    
    for (col = 1; col <= MAX_WIDTH_TABLE; col++) {            
        first_position =second_position =0;
        for (line = 1; line <= MAX_WIDTH_TABLE; line++) {
             if(a[col][line] > 0) {
                 if(first_position == 0) {
                    first_position = line;
                 } else {
                    second_position = line;                 
                    if (a[col][first_position] == a[col][second_position]) {
                        a[col][second_position] = a[col][first_position] + a[col][second_position];
                        a[col][first_position] = 0;
                        first_position = second_position = 0;
                    } else { 
                        first_position = second_position;
                        second_position = 0;
                    }
                }
            }
        }
    }
    return a;
}

function tryDownSecondStep(a) {
    var empty_position = 0;

    for (col = 1; col<=MAX_WIDTH_TABLE; col++) {   
        empty_position = 0;
        for (line = MAX_WIDTH_TABLE; line>=1; line--) {  
            if(a[col][line] == 0 && empty_position == 0) {    
                empty_position = line;
            }
            if(a[col][line] > 0 && empty_position > 0) {    
                a[col][empty_position] = a[col][line];
                a[col][line] = 0;
                ep = empty_position;
                empty_position =0;
                for (k = ep + 1; k >= col; k--) {
                   if(a[col][line] == 0) {
                      empty_position = line;
                   }
                }                
            }    
        }
    }             
    return a;
}

function tryDown(a) {
    var na = $.extend(true, {}, a);
    na = tryDownFistStep(na);
    na = tryDownSecondStep(na);    
    return detailArray(na, 'down');
}

function bestChoice() {
    var scores = getCurrentScores();
    var aRight = tryRight(scores);   
    var aDown = tryDown(scores);    
    var choices = [aRight, aDown];
    return calculateBestChoice(choices);
}

// ... give time for script to load, then type.
function countTotalPoints() {
    var total = 0 ;
    for (i=1; i<= 10; i++) {
        var two_potential_value = Math.pow(2,i);
        eval("var points"+i+" = "+two_potential_value+"* $(\"div.tile-"+two_potential_value+":not([class~='tile-merged'])\").size();");
        eval("total += points"+i+";");
    }
    return total;
}

$(document).unbind('keydown');
$("#my-status").remove();
$(".grid-container").append("<div id='my-status'><b>My Score:</b><span id='my-score'></span><br>Moves:<span id='my-move'></span></div>")
$(document).bind('keydown', function(e) {
    $("#my-score").html(countTotalPoints());
});

var ARROW_DOWN_CODE = 40;
var ARROW_UP_CODE = 38;
var ARROW_LEFT_CODE = 37;
var ARROW_RIGHT_CODE = 39;
var validOptions = [ARROW_LEFT_CODE, ARROW_RIGHT_CODE, ARROW_UP_CODE];

function dispatchKeyDown(keycode) {
    var customEvent;
    var type = 'keydown';
    var bubbles = true;
    var cancelable = true;
    var view = window;
    var ctrlKey = false;
    var altKey = false;
    var shiftKey = false;
    var metaKey = false;
    var keyCode = keycode;
    var charCode = keycode;

    try {

        //try to create key event
        customEvent = document.createEvent("KeyEvents");

        /*
         * Interesting problem: Firefox implemented a non-standard
         * version of initKeyEvent() based on DOM Level 2 specs.
         * Key event was removed from DOM Level 2 and re-introduced
         * in DOM Level 3 with a different interface. Firefox is the
         * only browser with any implementation of Key Events, so for
         * now, assume it's Firefox if the above line doesn't error.
         */
        //TODO: Decipher between Firefox's implementation and a correct one.
        customEvent.initKeyEvent(type, bubbles, cancelable, view, ctrlKey,
            altKey, shiftKey, metaKey, keyCode, charCode);

    } catch (ex /*:Error*/){

        /*
         * If it got here, that means key events aren't officially supported.
         * Safari/WebKit is a real problem now. WebKit 522 won't let you
         * set keyCode, charCode, or other properties if you use a
         * UIEvent, so we first must try to create a generic event. The
         * fun part is that this will throw an error on Safari 2.x. The
         * end result is that we need another try...catch statement just to
         * deal with this mess.
         */
        try {

            //try to create generic event - will fail in Safari 2.x
            customEvent = document.createEvent("Events");

        } catch (uierror /*:Error*/){

            //the above failed, so create a UIEvent for Safari 2.x
            customEvent = document.createEvent("UIEvents");

        } finally {

            customEvent.initEvent(type, bubbles, cancelable);

            //initialize
            customEvent.view = view;
            customEvent.altKey = altKey;
            customEvent.ctrlKey = ctrlKey;
            customEvent.shiftKey = shiftKey;
            customEvent.metaKey = metaKey;
            customEvent.keyCode = keyCode;
            customEvent.charCode = charCode;
            customEvent.which = keycode;

        }

    }

    //fire the event
    document.dispatchEvent(customEvent);
}

okright = true;
okdown = true;
t = 'right';

function playRobot() {
    
    switch(t) {
        case 'right':
            var oldpoints = countTotalPoints();
            sleep(400, function() {
                playRobotRight();
                var points = countTotalPoints();
                okright = (oldpoints != points);
                var direction = bestChoice();
                t = ((okright || okdown) ? (direction == 'draw' ? 'down' : direction) :  'left');
                playRobot();
            });
        break;
        case 'down':
            var oldpoints = countTotalPoints();
            sleep(400, function() {
                playRobotDown();
                var points = countTotalPoints();
                okdown = (oldpoints != points);
                var direction = bestChoice();
                t = ((okright || okdown) ? (direction == 'draw' ? 'right' : direction) : 'left');
                playRobot();
            });
        break;
        case 'left':
            sleep(400, function() {
                playRobotLeft();
                t ='right';
                okright = true;
                okdown = true;
                playRobot();
            });

        break;
    }
    if($('.game-message').css('display') !='none') {
        $('.retry-button').trigger('click');
    }
}

function playRobotRight() {
    dispatchKeyDown(ARROW_RIGHT_CODE);
}

function playRobotDown() {
    dispatchKeyDown(ARROW_DOWN_CODE);
}

function playRobotLeft() {
    dispatchKeyDown(ARROW_LEFT_CODE);
}

document.tagName='document';

playRobot();