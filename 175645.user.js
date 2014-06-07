// ==UserScript==
// @name       Dice12 Client
// @version    0.7.3
// @namespace  http://localhost
// @description  A browser-side userscript to simplify usage of dice12.
// @match      https://peerbet.org/list.php*
// ==/UserScript==

if (typeof $ === "undefined") {
    $ = unsafeWindow.jQuery;
}

// 1. Create the dice12 div
function dice12() {
    if (document.getElementById("dice12")) {
        // Already created; toggle visibility
        document.getElementById("dice12").style.display = document.getElementById("dice12").style.display === "block" ? "none" : "block";
    } else {
        // Not yet created; create
        var d12 = document.createElement("div");
        d12.id = "dice12";
        d12.style.display = "block";
        d12.style.boxSizing = "border-box";
        d12.style.backgroundColor = "rgba(25, 25, 25, 0.9)";
        d12.style.border = "1px #000000 dashed";
        d12.style.boxShadow = "3px 3px 0 rgba(0, 0, 0, 0.5)";
        d12.style.padding = "2em";
        d12.style.position = "fixed";
        d12.style.top = "20%";
        d12.style.left = "20%";
        d12.style.bottom = "20%";
        d12.style.width = "60%";
        d12.style.margin = "0 auto";
        
        d12.innerHTML = "<p>Get <select id=\"dice12_get\"></select> <button id=\"dice12_get_button\">Go</button></p>" +
            "<p>Set <select id=\"dice12_set\"></select> to <input type=\"text\" id=\"dice12_set2\" value=\"" + Math.round(Math.random() * 10000) + "\" /> <button id=\"dice12_set_button\">Go</button></p>" + 
            "<p>Bet <input type=\"number\" value=\"10\" id=\"dice12_bet\" /> satoshis <button id=\"dice12_double_button\">×2</button><button id=\"dice12_bet_button\">Go</button></p>" +
            "<p id=\"dice12_output\">...</p>";
        
        // Activate select boxes
        var getSelect = d12.querySelector("#dice12_get");
        var setSelect = d12.querySelector("#dice12_set");
        dice12.gets.forEach(function(get) {
            var getSelectOption = document.createElement("option");
            getSelectOption.value = get[0];
            getSelectOption.title = get[1];
            getSelectOption.textContent = get[0];
            getSelect.appendChild(getSelectOption);
        });
        dice12.sets.forEach(function(set) {
            var setSelectOption = document.createElement("option");
            setSelectOption.value = set[0];
            setSelectOption.title = set[1];
            setSelectOption.textContent = set[0];
            setSelect.appendChild(setSelectOption);
        });
        
        // Color properly on light theme
        Array.apply([], d12.querySelectorAll("p")).forEach(function(e) {
            e.style.color = "#FFFFFF";
        });
        
        // Activate buttons
        d12.querySelector("#dice12_get_button").onclick = dice12.get;
        d12.querySelector("#dice12_set_button").onclick = dice12.set;
        d12.querySelector("#dice12_bet_button").onclick = dice12.bet;
        d12.querySelector("#dice12_double_button").onclick = function() {
            d12.querySelector("#dice12_bet").value = d12.querySelector("#dice12_bet").value*2;
        };
        
        Array.apply([], d12.querySelectorAll("button")).forEach(function(b) {
            b.className = "btn btn-success";
        });
        
        d12.querySelector("#dice12_double_button").className = "btn btn-danger";
        d12.querySelector("#dice12_double_button").title = "Double the bet amount";
        
        // Close button
        var close = document.createElement("button");
        close.className = "btn btn-danger btn-mini";
        close.style.position = "absolute";
        close.style.top = "1em";
        close.style.right = "1em";
        close.textContent = "Close";
        close.onclick = dice12;
        d12.appendChild(close);
        
        document.body.appendChild(d12);
    }
}

// Dice12's data and functions
dice12.gets = [
    ["active", "Asks dice12 whether or not a session is in progress."],
    ["balance", "Gets dice12's approximate balance."],
    ["bet", "Gets the number of your next bet."],
    ["client", "Gets the currently-set client string."],
    ["globalstats", "Gets dice12's all-time betting statistics."],
    ["help", "Gets a link to a more comprehensive help document."],
    ["lastglobalstats", "Gets global stats for the last session."],
    ["longverification", "Gets verification information for the last session; use if verification does not work."],
    ["maximum", "Gets the maximum bet for the current odds."],
    ["minimum", "Gets the minimum bet for the current odds."],
    ["nonce", "Gets the nonce used for the last session."],
    ["noncehash", "Gets the current session's nonce hash."],
    ["odds", "Gets the currently-set odds."],
    ["payout", "A human-readable description of the chance of winning and the payout."],
    ["ping", "Pings dice12."],
    ["plus", "Gets whether or not you are a dice12+ user."],
    ["stats", "Gets all-time player stats."],
    ["target", "Gets the currently-set redirection target."],
    ["verification", "Gets verification information for the last session."],
    ["warning", "Gets whether dice12 sends you warnings."]
];

dice12.sets = [
    ["client", "A client-set string to ensure provable fairness."],
    ["odds", "The odds, out of 255, for subsequent bets."],
    ["target", "The redirection target for subsequent bets. Do not use unless you know what you are doing."],
    ["warning", "Enables or disables dice12's warnings."]
];

dice12.out = function(message) {
    document.getElementById("dice12_output").innerHTML = message;
};

dice12.get = function() {
    var toGet = document.getElementById("dice12_get").value;
    $.post("control/chat.php", {action: 'post', place: chatPlace, id: entityID, security: security, message: "%dice12, get " + toGet.trim()}, function() {});
    dice12.out("Waiting...");
};

dice12.set = function() {
    var toSet = document.getElementById("dice12_set").value;
    var setTo = document.getElementById("dice12_set2").value;
    $.post("control/chat.php", {action: 'post', place: chatPlace, id: entityID, security: security, message: "%dice12, set " + toSet.trim() + " " + setTo.trim()}, function() {});
    dice12.out("Waiting...");
};

dice12.bet = function() {
    var toBet = Math.round(+document.getElementById("dice12_bet").value);
    if (toBet <= 0 || !toBet) {
        dice12.out("Malformed bet request.");
    } else if (toBet > Math.round(unsafeWindow.balance * 1e8)) {
        dice12.out("Insufficient funds.");
    } else {
        $.post("profile-transfer.php", {recipient: 'dice12', amount: toBet * 1e-8, security: security}, function() {
            dice12.out("Transfer sent; awaiting response...");
        });
        unsafeWindow.balance -= dice12.convert(toBet);
        $('#user-balance').html(unsafeWindow.formatBaseCurrency(unsafeWindow.balance));
        dice12.out("Waiting...");
    }
};

// dice12's currency converter
dice12.convert = function(satoshis) {
    if (currency === "mBTC") {
        return satoshis * 1e-5;
    } else if (currency === "\u03BCBTC") {
        return satoshis * 1e-2;
    } else {
        return satoshis * 1e-8;
    }
};

// 2. Prepare the script
onload = function() {
    // 2.1. Import all necessary variables into window
    var imports = ["chatPlace", "currency", "entityID", "isLightTheme", "lastMessageID", "security"];

    imports.forEach(function(i) {
        if (typeof window[i] === "undefined") {
            window[i] = unsafeWindow[i];
        }
    });
    
    // 2.2. Overwrite getchatmessages to capture dice12 messages
    // Note: getChatMessages originally part of Peerbet
    unsafeWindow.getChatMessages = function() {
        $.post("control/chat.php", {action: 'get', place: chatPlace, id: entityID, lastID: lastMessageID, security: security}, function(msg) {
            
            var json = JSON.parse(msg);
            var res = $("#chat-area").html();
            var chatOriginal = res;
            
            var mutedColor = '#666666';
            if(isLightTheme)
                mutedColor = '#BBBBBB';
            
            var privateColor = '#73C2FB';
            if(isLightTheme)
                privateColor = '#0000CD';
            
            for(i = 0; i < json.length; i++) {
                var message = '';
                var user = json[i]['posted_by'];
                
                
                // BEGIN OVERWRITE CODE
                if (user === "dice12" && document.getElementById("dice12")) {
                    // Check to see if it's a win
                    if (json[i].message_body.match(/Sent ([0-9]+)/)) {
                        unsafeWindow.balance += dice12.convert(+json[i].message_body.match(/Sent ([0-9]+)/)[1]);
                        $('#user-balance').html(unsafeWindow.formatBaseCurrency(unsafeWindow.balance));
                    }
                    dice12.out(json[i].message_body);
                }
                // END OVERWRITE CODE
                
                message += '<span class="chat-username" onclick="replyChatMessage(\'' + user + '\')">';
                if(json[i]['my']) {
                    message += '<strong class="muted">' + user + '</strong>';
                }
                else {
                    message += '<strong>' + user + '</strong>';
                }
                if(json[i]['private'] && json[i]['my'])
                    message += ' <span class="muted">[To ' + json[i]['recipient'] + '] </span>';
                message += '</span>: ';
                
                message += unsafeWindow.urlifyRaffles(unsafeWindow.addSmileys(json[i]['message_body'], json[i]['private']));
                
                if(json[i]['private']) {
                    message = '<span style="color: ' + privateColor + ';">' + message + '</span>';
                    
                }
                else if(json[i]['bot'] == 1) {
                    message = '<span style="color: ' + mutedColor + ';">' + message + '</span>';
                }
                    
                    res += message + '<br/>';
                lastMessageID = json[i]['message_id'];
            }
            
            if(chatOriginal !== res)
                $("#chat-area").html(res);
            
            if(unsafeWindow.scrollEnabled)
                $("#chat-area").scrollTop($("#chat-area")[0].scrollHeight);
            
            timer = setTimeout(unsafeWindow.getChatMessages, 1000);
        });
    };
    
    var link = document.createElement("li");
    link.innerHTML = "<a href=\"#\">dice12</a>";
    link.onclick = dice12;
    document.getElementsByClassName("nav")[0].appendChild(link);
};