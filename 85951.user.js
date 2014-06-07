// ==UserScript==
// @name           UD Travel
// @namespace      www.ray3k.com
// @description    Whenever there is a groan or flare, you can click on a link that will take you there. You can type in coordinates to travel faster.
// @include        http://www.urbandead.com/map.cgi*
// @include        http://*urbandead.com/map.cgi*
// @exclude        http://www.urbandead.com/map.cgi?logout
// @exclude        http://*urbandead.com/map.cgi?logout
// ==/UserScript==

//create the travel form to allow manual entry
createTravelForm();
//transform all groan and flare messages to links that will travel the player
transformGroansFlares();

//finds the donation link on the page
function findDonateLink() {
    //find the donate link
    var allDonateLinks, donateLink;
    allDonateLinks = document.evaluate(
        "//a[@href='donate.html']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    //if the donate link was found
    if (allDonateLinks.snapshotLength > 0) {
        donateLink = allDonateLinks.snapshotItem(0);
        return donateLink;
    }
    //the donate link was not found
    else return null;
}

//finds the map table on the page
function findMapTable() {
    //find the map table
    var allMapTables, mapTable;
    allMapTables = document.evaluate(
        "//table[@class='c']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    //if the map table was found
    if (allMapTables.snapshotLength > 0) {
        mapTable = allMapTables.snapshotItem(0);
        return mapTable
    }
    //the donate link was not found
    else return null;
}

//creates the Travel Form() and places itself on to the page
function createTravelForm() {
    //find the donation link
    var donateLink = findMapTable();
    //if the donate link was found
    if (donateLink != null) {
        //create the travel form
        var travelForm = document.createElement("form");
        travelForm.className = "a";
        travelForm.id = "travelform";

        //create the travel button
        var travelButton = document.createElement("input");
        travelButton.type = "submit";
        travelButton.value = "Travel";
        travelButton.className = "m";

        //create the field for x position
        var xInput, yInput;
        xInput = document.createElement("input");
        xInput.type = "text";
        xInput.maxLength = 2;
        xInput.size = 2;

        //create the field for y position
        yInput = document.createElement("input");
        yInput.type = "text";
        yInput.maxLength = 2;
        yInput.size = 2;

        //add the elements to the form
        travelForm.appendChild(travelButton);
        travelForm.appendChild(document.createTextNode(" "));
        travelForm.appendChild(xInput);
        travelForm.appendChild(document.createTextNode(" "));
        travelForm.appendChild(yInput);

        //create an event listener to respond to the clicking of the travel button
        travelButton.addEventListener("click", function(event) {
            //travel to the manually entered values
            travelTo(xInput.value, yInput.value);
            //prevent the normal operation of the button
            event.stopPropagation();
            event.preventDefault();
        }, true);

        //insert the travelLink after the donateLink
        donateLink.parentNode.insertBefore(travelForm, donateLink.nextSibling);
        //insert a space character between donate and travel
        donateLink.parentNode.insertBefore(document.createTextNode(" "), donateLink.nextSibling);
    }
}

//returns the travel form element
function findTravelForm() {
    return document.getElementById("travelform");
}

//xpos = target x;
//ypos = target y;
function travelTo(xpos, ypos) {
    //x and y are the player's current position. xpos and ypos are the target position
    var x, y;
    
    //get the current position
    var position = getGPSLoc();
    x = position[0];
    y = position[1];
    
    //create a text node to show status
    var textNode = document.createTextNode("Travelling...");
    
    //place the text node in place of the travel form
    var travelForm = findTravelForm();
    travelForm.parentNode.insertBefore(textNode, travelForm);
    travelForm.parentNode.removeChild(travelForm);
    
    //create a variable as reference to check if the player has moved successfully
    var ref = "empty";
    
    //check the values of xpos and ypos
    if (isNaN(xpos) || xpos < 0 || xpos > 99 || isNaN(ypos) || ypos < 0 || ypos > 99) {
        textNode.nodeValue = "Travel target is not valid.";
        //reload the page
        location.replace("http://" + location.hostname + "/map.cgi");
    }
    else {
        //if standing
        if (checkIfStanding()) {
            //start moving the player
            travel();
        }
        //not standing
        else {
            //update the text node
            textNode.nodeValue = "Travelling... Standing up";

            //command the player to stand up
            GM_xmlhttpRequest({
                method: 'GET',
                url: "http://" + location.hostname + '/map.cgi?rise',
                onload: function(responseDetails) {
                    //if standing was successful
                    if (responseDetails.status == 200) {
                        //start moving the player
                        travel();
                    }
                    else {
                        //error when trying to move player
                        textNode.nodeValue = "Failure! Please wait for refresh.";
                        //reload the page
                        location.replace("http://" + location.hostname + "/map.cgi");
                    }
                }
            });
        }
    }
    
    //commands the player to move towards target and ensures the move was successful
    function travel() {
        //if player needs to move east, move east 1
        if (x < xpos) x++;
        //player needs to move west, move west 1
        else if (x > xpos) x--;
        
        //if player needs to move south, move south 1
        if (y < ypos) y++;
        //player needs to move north, move north 1
        else if (y > ypos) y--;
        
        //move player to new position
        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://" + location.hostname + '/map.cgi?v=' + x + '-' + y,
            onload: function(responseDetails) {
                //if the movement was successful
                if (responseDetails.status == 200 && checkMovement(responseDetails.responseText)) {
                    //if player has arrived at the target
                    if (x == xpos && y == ypos) {
                        //notify player
                        textNode.nodeValue = "Arrival at (" + xpos + "," + ypos + ") Please wait for refresh.";
                        //refresh page
                        location.replace("http://" + location.hostname + "/map.cgi");
                    }
                    //player has not arrived at target
                    else {
                        //notify player of current position
                        textNode.nodeValue = "Travelling...(" + x + "," + y + ")";
                        //call travel again
                        travel();
                    }
                }
                //movement was not successful or event in game prevents movement
                else {
                    //error when trying to move player
                    textNode.nodeValue = "Failure! Please wait for refresh.";
                    //refresh page
                    location.replace("http://" + location.hostname + "/map.cgi");
                }
            }
        });
    }

    //checks if the move was succesful by using a reference variable
    function checkMovement(bodyString) {
        //create a new reference
        var newRef = bodyString.match(/"\d{1,2}-\d{1,2}"/);
        
        //if the bodyString found a match and the player did not run out of AP
        if (newRef != null && newRef[0] != null && ref != newRef[0] && bodyString.match("You have run out of Action Points") == null) {
            //update the reference variable
            ref = newRef[0];
            //movement is unhindered.
            return true;
        }
        else {
            //if the target is on the map border
            if ((xpos == 0 && x == 0) || (xpos == 99 && x == 99) || (ypos == 0 && y == 0) || (ypos == 99 && y == 0)) {
                if (bodyString.match("You have run out of Action Points") == null) {
                    //movement is unhindered
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                //movement has failed
                return false;
            }
        }
    }
}

//returns the players gps location in an int array. -1 will be returned if there
//is an error
function getGPSLoc() {
    var position = new Array();
    
    //find all inputs within the map table
    var allInputs;
    allInputs = document.evaluate(
        "//table[@class='c']//input[@type='hidden']",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    //when all of the map is visible, there should be 8 nodes
    if (allInputs.snapshotLength == 8) {
        var gpsString = allInputs.snapshotItem(0).value;
        position[0] = parseInt(gpsString.match(/\d+/)) + 1;
        position[1] = parseInt(gpsString.replace(/\d+-/, "")) + 1;
    }
    //when at an edge and not a corner, there would be 5 nodes
    else if (allInputs.snapshotLength == 5) {
        var gpsString = allInputs.snapshotItem(0).value;
        //place the first reading as the gps location
        position[0] = parseInt(gpsString.match(/\d+/));
        position[1] = parseInt(gpsString.replace(/\d+-/, ""));
        
        //if at a left edge
        if (position[0] == 0) {
            if (position[1] < 1) {
                gpsString = allInputs.snapshotItem(1).value;
                position[0] = parseInt(gpsString.match(/\d+/));
                if (position[0] == 2) {
                    position[0] = 1;
                    position[1] = 0;
                }
                else {
                    position[0] = 0;
                    position[1] = 1;
                }
            }
            else if (position[1] == 98) {
                position[0] = 1;
                position[1] = 99;
            }
            else {
                position[1] += 1;
            }
        }
        //if at right edge
        else if (position[0] == 98) {
            //correct the x coordinate
            position[0] = 99;
            //correct the y coordinate
            position[1] += 1;
        }
        //if at a top edge
        else if (position[1] == 0) {
            //correct the x coordinate
            position[0] += 1;
        }
        //if at bottom edge
        else if (position[1] == 98) {
            //correct the x coordinate
            position[0] += 1;
            //correct the y coordinate
            position[1] = 99;
        }
    }
    //when in a corner, there would be only 3 nodes
    else if (allInputs.snapshotLength == 3) {
        var gpsString = allInputs.snapshotItem(0).value;
        //place the first reading as the gps location
        position[0] = parseInt(gpsString.match(/\d+/));
        position[1] = parseInt(gpsString.replace(/\d+-/, ""));
        
        //correct the x coordinate
        if (position[0] == 98)  position[0] = 99;
        else if (position[0] == 1) position[0] = 0;
        
        //correct the y coordinate
        if (position[1] == 98) position[1] = 99;
        else if (position[1] == 1) position[1] = 0;
    }
    //error handling
    else {
        position[0] = -1;
        position[1] = -1;
    }
    
    return position;
}

//transforms all groan and flare messages to links that will call travelTo to the
//corresponding position.
function transformGroansFlares() {
    //collect all the li elements
    var groans = document.getElementsByTagName("li");
    for (i = 0; i < groans.length; i++) {
        
        //solve issue with "familiar" groans
        //if the 2nd child is a bold tag
        var boldTag = groans[i].childNodes[1];
        //if it is a bold tag and it matches the word "familiar"
        if (boldTag.nodeName == "B" && boldTag.firstChild.nodeValue.match("familiar")) {
            groans[i].removeChild(boldTag);
            //if the first and second nodes now are text nodes
            if (groans[i].firstChild.nodeValue != null && groans[i].childNodes[1].nodeValue != null) {
                //combine the nodes so the following code will work
                groans[i].firstChild.nodeValue += "FAMILIAR" + groans[i].childNodes[1].nodeValue;
                groans[i].removeChild(groans[i].childNodes[1]);
            }
        }
        
        //get the first child of the li element
        var textNode = groans[i].firstChild;
        //check that the node exists and that the word "groaning" is within the node
        if (textNode != null && (textNode.nodeValue.match(/groaning/) != null || textNode.nodeValue.match(/flare was fired/))) {
            //create an anchor element
            var anchor = document.createElement('a');
            anchor.href = "map.cgi";
            //create an event listener to capture clicks
            anchor.addEventListener("click", function (event) {
                //get the player coordinates
                var position = getGPSLoc();
                var newX = position[0];
                var newY = position[1];
                
                //evaluate the node for an east or west value
                var textString = event.target.firstChild.nodeValue.match(/\d{1,2}.*(west|east)/);
                //if the value was found
                if (textString != null) {
                    //store as string, not array
                    textString = textString[0];
                    //if the groan was from the west
                    if (textString.match(/west/) != null) {
                        //subtract the value from the x coordinate
                        newX -= parseInt(textString.match(/\d{1,2}/)[0]);
                    }
                    //the groan was from the east
                    else {
                        //add the value to the x coordinate
                        newX += parseInt(textString.match(/\d{1,2}/)[0]);
                    }
                }
                
                //evaluate the node for a north or south value FOLLOWING an east or west value
                textString = event.target.firstChild.nodeValue.match(/(west|east).*\d{1,2}.*(north|south)/);
                //if the value was found
                if (textString != null) {
                    //store as string, not array
                    textString = textString[0];
                    //if the groan was from the north
                    if (textString.match(/north/) != null) {
                        //subtract the value from the x coordinate
                        newY -= parseInt(textString.match(/\d{1,2}/)[0]);
                    }
                    //the groan was from the south
                    else {
                        //add the value to the x coordinate
                        newY += parseInt(textString.match(/\d{1,2}/)[0]);
                    }
                }
                //could not find a north or south value following an east or west value
                else {
                    //evaluate the node for a north or south value WITHOUT an east or west value
                    textString = event.target.firstChild.nodeValue.match(/\d{1,2}.*(north|south)/);
                    //if the value was found
                    if (textString != null) {
                        //store as string, not array
                        textString = textString[0];
                        //if the groan was from the north
                        if (textString.match(/north/) != null) {
                            //subtract the value from the x coordinate
                            newY -= parseInt(textString.match(/\d{1,2}/)[0]);
                        }
                        //the groan was from the south
                        else {
                            //add the value to the x coordinate
                            newY += parseInt(textString.match(/\d{1,2}/)[0]);
                        }
                    }
                }
                
                //command the player to travel to the calculated position of the groan
                travelTo(newX, newY);
                
                //stop the regular action from happening
                event.stopPropagation();
                event.preventDefault();
            }, true);
            
            //insert the created anchor as the first element
            groans[i].insertBefore(anchor, textNode);
            //remove the textNode
            groans[i].removeChild(textNode);
            //insert the textNode inside the anchor
            anchor.appendChild(textNode);
        }
    }
}

//returns true if the player is standing
function checkIfStanding() {
    var allInputs, thisLink;
    //get all the inputs with a value of "Stand up"
    allInputs = document.evaluate(
        "//input[@value='Stand up']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    //if such an input exists, the player is not standing
    if (allInputs.snapshotLength > 0) return false;
    //the player is not standing
    else return true;
}