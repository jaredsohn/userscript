// ==UserScript==
// @name       RSquashScript
// @include    http://plug.dj/rsquash/
// @namespace  http://plug.dj/rsquash/
// @version    1.05
// @description  Plug.dj Automation Tool
// @copyright  2014, Kevin Navero
// ==/UserScript==

/*
 RSquashScript: Small Javascript extension used for plug.dj to automate some features 
 Copyright (C) 2014 Kevin Navero

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// TODO: add in up and down arrow keys for accessing previous commands

window.setTimeout(function() {
    var users = API.getUsers();
    var idMap = createHashMap(users, "id");
    var statusMap = createHashMap(users, "status");
    var stMsgMap = createHashMap(users, "stMsg");
    var userStatusMsg = "";


    /*
    * Description: This function creates a <username>, <value> hashmap with a given 
    * list of users and a value describing the type of value associating to the key.
    * Parameter: users is the user Object list usually retrieved from API.getUsers()
    * Parameter: value is string that describes the data mapped to the username keys (options: "id", "status", "stMsg").
    *    "id" describes the user id, "status" describes the user status enum, and "stMsg" describes the user status message. 
    *    For example, createHashMap(API.getUsers(), "id") would create a hashmap from the usernames returned by API.getUsers(). 
    *    The usernames are the keys, and they will be mapped to each user's id. 
    * Return: returns either a <username>,<id> hashmap or a <username>,<status> hashmap
    */
    function createHashMap(users, value) {
        var usersHashMap = new Object();

        if (value == "id") 
            for (var i in users) 
                usersHashMap[users[i].username] = users[i].id;
        else if (value == "status") 
            for (var i in users) 
                usersHashMap[users[i].username] = users[i].status;
        else if (value == "stMsg") 
            for (var i in users) 
                usersHashMap[users[i].username] = "";
        else {
            API.chatLog("Error: value does not exist");
            usersHashMap = null;
        }

        return usersHashMap;
    }

    /*
    * Description: parseStatusGivenValue parses the API.STATUS data constant and returns the 
    * status referenced to as a string
    * Parameter: status is the integer value (i.e. the API.STATUS data constant) 
    * mapped to the status
    * Return: returns the status as a string that the API.STATUS data constant maps to
    */
    function parseStatusGivenValue(status) {
        var s; 

        switch (status) {
        case 0:
            s = "Available";
            break;
        case 1:
            s = "AFK";
            break;
        case 2:
            s = "Working";
            break;
        case 3:
            s = "Gaming";
            break;
        default:
            s = -1;
            break;
        }

        return s;
    }

    /*
    * Description: parseStatusGivenString parses the input status string and returns the 
    * status referenced to as a number (one of the API.STATUS data constants)
    * Parameter: status is the string mapped to the API.STATUS data constant
    * Return: returns the status as the associating API.STATUS data constant 
    */
    function parseStatusGivenString(status) {
        if (status == "Available")
            return 0;
        else if (status == "AFK")
            return 1;
        else if (status == "Working")
            return 2;
        else if (status == "Gaming")
            return 3;
        else {
            return -1;
        }
    }

    /*
    * Description: displays the status list mapped to all the users in the room
    */
    function displayStatusList() {
        users = API.getUsers();

        API.sendChat(" ");
        API.sendChat("Automated message: Status list for current people in the room: ");

        for (var i = 0; i < users.length; i++) {
            if (API.hasPermission(API.getUser(null).id, API.ROLE.HOST)) {
                API.sendChat("Automated message: " + users[i].username + " is " + 
                    parseStatusGivenValue(users[i].status) + ": " + stMsgMap[users[i].username]);
            }
            else {
                API.sendChat("Automated message: " + users[i].username + " is " + 
                    parseStatusGivenValue(users[i].status));
            }
        }
        
        API.sendChat(" ");
    }

    /*
    * Description: displays the status list mapped to all the users in the room
    */
    function displayStatusListHidden() {
        users = API.getUsers();

        API.chatLog(" ", false);
        API.chatLog("Automated message: Status list for current people in the room: ", false);

        for (var i = 0; i < users.length; i++) {
            if (API.hasPermission(API.getUser(null).id, API.ROLE.HOST)) {
                API.chatLog("Automated message: " + users[i].username + " is " + 
                    parseStatusGivenValue(users[i].status) + ": " + 
                    stMsgMap[users[i].username], false);
            }
            else {
                API.chatLog("Automated message: " + users[i].username + " is " + 
                    parseStatusGivenValue(users[i].status), false);
            }
        }
        
        API.chatLog(" ", false);
    }

    /*
    * Description: performs a specific set of actions based on the chat command passed in as an 
    * argument. Use as a callback.
    * Parameter: value contains the string containing the chat command to be parsed
    */
    var displayingStatusListCmd = false;

    function command(value) {
        cmd = value.split(" ");

        if (cmd[0] == "/skip") 
            API.moderateForceSkip();      

        else if (cmd[0] == "/vol") 
            API.setVolume(parseInt(cmd[1])); 

        else if (cmd[0] == "/showst") 
            displayStatusListHidden();

        else if (cmd[0] == "/add") {
            var hmap = createHashMap(API.getUsers(), "id"); 
            cmd[1] = cmd[1].split("@")[1];

            if (hmap.hasOwnProperty(cmd[1])) {
                if (cmd[1] == API.getUser(null).username) {
                    API.djJoin();
                    API.chatLog(API.getUser(null).username + 
                        " was added to the wait list", false);
                }
                else 
                    API.moderateAddDJ(hmap[cmd[1]]);
            }
            else
                API.chatLog("Error: Cannot add user to wait list. Does the user exist?");
        }

        else if (cmd[0] == "/rm") {
            var hmap = createHashMap(API.getWaitList(), "id");
            hmap[API.getDJ().username] = API.getDJ().id;
            cmd[1] = cmd[1].split("@")[1];

            if (hmap.hasOwnProperty(cmd[1])) {
                if (cmd[1] == API.getUser(null).username) {
                    API.djLeave(); 
                    API.chatLog(API.getUser(null).username + 
                        " was removed from the wait list", false);
                }
                else 
                    API.moderateRemoveDJ(hmap[cmd[1]]);
            }

            else 
                API.chatLog("Error: Cannot remove user from wait list or booth." + 
                    "Is the user on the wait list or booth?");
        }

        else if (cmd[0] == "/getwl") {
            var waitlist = API.getWaitList();

            API.chatLog(" ", false);
            API.chatLog("Automated message: Waitlist: ", false);
            API.chatLog("Automated message: " + API.getDJ().username, false);

            for (var i in waitlist) {
                API.chatLog("Automated message: " + waitlist[i].username, false);
            }

            API.chatLog(" ", false);
        }

        else if (cmd[0] == "/setstmsg") {
            userStatusMsg = "";
            for (var i = 1; i < cmd.length; i++) {
                userStatusMsg += cmd[i] + " "; 
            }

            API.sendChat("Automated message: " + API.getUser(null).username + " set status message: " + userStatusMsg);
        }

        else if (cmd[0] == "/getstmsg") 
            API.chatLog("Automated message: your status message is: " + userStatusMsg, false);

        else if (cmd[0] == "/ban") {
            var hmap = createHashMap(API.getUsers(), "id");
            cmd[1] = cmd[1].split("@")[1];

            if (hmap.hasOwnProperty(cmd[1]))
                API.moderateBanUser(hmap[cmd[1]], 1);
            else
                API.chatLog("Error: Cannot add user to wait list. Does the user exist?");
        }

        else if (cmd[0] == "/setst") {
            var s = parseStatusGivenString(cmd[1]);

            if (s >= 0 && s < 4) {
                API.setStatus(s);
                API.chatLog("Automated message: successfully switched status to " + cmd[1], 
                    false);
            }
            else 
                API.chatLog("Error: Invalid status input. Try 'Available'," + 
                    " 'AFK', 'Working', or 'Gaming'. Status input is case sensitive.", false);
        }

        else if (cmd[0] == "/getst") {
            var u = API.getUser();
            API.chatLog("Automated message: your status is " + parseStatusGivenValue(u.status));
        }

        else if (cmd[0] == "/rmstaff") {
            var hmap = createHashMap(API.getUsers(), "id");
            cmd[1] = cmd[1].split("@")[1];

            if (hmap.hasOwnProperty(cmd[1]))
                API.moderateSetRole(hmap[cmd[1]], API.ROLE.NONE);
            else
                API.chatLog("Error: Cannot remove user from staff. User has to be in the room.");
        }

        else if (cmd[0] == "/dance") {
            _$context.trigger("settings:show");
            $(".item.s-dancing").click();
            _$context.trigger("settings:hide");
        }

        else if (cmd[0] == "/roll") {
            _$context.trigger("settings:show");
            $(".item.s-avatar").click();
            _$context.trigger("settings:hide");
        }

        else if (cmd[0] == "/bg") {
            _$context.trigger("settings:show");
            $(".item.s-bg").click();
            _$context.trigger("settings:hide");
        }

        else if (cmd[0] == "/av") {
            _$context.trigger("settings:show");
            $(".item.s-av").click();
            _$context.trigger("settings:hide");
        }

        else if (cmd[0] == "/notif") {
            _$context.trigger("settings:show");
            $(".item.s-dj").click();
            $(".item.s-score").click();
            $(".item.s-fan").click();
            $(".item.s-tt").click();
            _$context.trigger("settings:hide");
        }

        else if (cmd[0] == "/tall") {
            command("/dance");
            API.sendChat("/cap 1");
            command("/av");
            command("/notif");
        }

        else 
            API.chatLog(value + " is an invalid chat command.");

        setTimeout(function() {
            pollStatusChange(statusMap);
        }, 1000);
    }

    /*
    * Description: checks for status changes
    * Parameter: oldUsersHashMap contains a <username>,<status> hashmap snapshot of the previously
    * most recent user list
    */
    function pollStatusChange(oldUsersHashMap) {
        if (API.hasPermission(API.getUser(null).id, API.ROLE.HOST)) {
            var newUsers = API.getUsers();

            for (var i in newUsers) {
                if (oldUsersHashMap.hasOwnProperty(newUsers[i].username) && 
                    newUsers[i].status != oldUsersHashMap[newUsers[i].username]) {
                    API.sendChat("Automated message: " + newUsers[i].username + 
                        " changed status to " + parseStatusGivenValue(newUsers[i].status));
                }
            }

            statusMap = createHashMap(newUsers, "status");
        }
    }

    /*
    * Description: autowoots on the advancement of a track. Use as a callback.
    * Parameter: obj is an array of user objects and the current media object
    */
    function autowoot(obj) {
        $("#woot").click();
        pollStatusChange(statusMap);
    }

    /*
    * Description: sets everyone in the room to bouncer permissions
    */
    function setEveryoneRole() {
        users = API.getUsers();

        for (var i = 0; i < users.length; i++) {
            API.moderateSetRole(users[i].id, API.ROLE.BOUNCER);
        } 

        pollStatusChange(statusMap);
    }

    /*
    * Description: callback function when a new user joins the room
    * Parameter: user is the user who just entered the room
    */
    function usrJoin(user) {
        stMsgMap[user.username] = "";

        if (API.hasPermission(API.getUser(null).id, API.ROLE.HOST)) {
            API.moderateSetRole(user.id, API.ROLE.BOUNCER);
            API.sendChat("Automated message: " + user.username + " joined the room! :)");
            displayStatusList();
        }
        
        pollStatusChange(statusMap);
    }

    /*
    * Description: callback function when a user leaves the room
    * Parameter: user is the user who just left the room
    */
    function usrLeave(user) {
        stMsgMap[user.username] = ""; 

        if (API.hasPermission(API.getUser(null).id, API.ROLE.HOST)) {
            API.sendChat("Automated message: " + user.username + " left the room! :(");
            displayStatusList();
        }

        pollStatusChange(statusMap);
    }

    var expectedStr = "";
    var inputStr = "";

    function chatArrival(data) {
        if (API.hasPermission(API.getUser(null).id, API.ROLE.HOST)) {
            var shouldSetStatusStr = true;
            inputStr = data.message.split(" ");

            // check for if user set a new status message
            expectedStr = "Automated message: " + data.from + " set status message: ";    
            expectedStr = expectedStr.split(" ");

            for (var i = 0; i < expectedStr.length - 1; i++) {
                if (inputStr[i] != expectedStr[i]) {
                    shouldSetStatusStr = false;
                    break;
                }
            }

            // if user set a new status message then update the hashmap holding the status messages
            if (shouldSetStatusStr) {
                var outputStr = "";
                for (var i = expectedStr.length - 1; i < inputStr.length; i++) {
                    outputStr += inputStr[i].replace("&#39;", "'") + " ";
                }

                stMsgMap[data.from] = outputStr;
            }
        }

        pollStatusChange(statusMap);
    }

    API.chatLog("Setting up plug.js...");

    autowoot(null);
    setEveryoneRole();
    API.djJoin();

    API.on(API.CHAT_COMMAND, command);
    API.on(API.DJ_ADVANCE, autowoot);
    API.on(API.USER_JOIN, usrJoin);
    API.on(API.USER_LEAVE, usrLeave);
    API.on(API.CHAT, chatArrival);

    API.chatLog("plug.js script setup finished!");
}, 10000);