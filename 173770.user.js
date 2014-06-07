// ==UserScript==
// @description Currently supports: IKEA helpdesk, Bill and Cleverbot.
// @name Ben - Chatbots for Omegle.
// @author Jord Nijhuis
// @version 3.2.1
// @match http://omegle.com/
// @match http://*.omegle.com/
// @match http://107.6.108.4/
// @require http://code.jquery.com/jquery-1.10.2.min.js
// @require http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/md5.js
// ==/UserScript==

var bots = {},
    requests = 0,
    conversation = 0;

function htmlspecialchars(str) {
    if (typeof(str) == "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&quot;/ig, '"');
        str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
    }
    return str;
}


IKEA = function () {
    this.name = "IKEA";

    bots.IKEA = this;

    this.sendMessage = function (message) {
        setTimeout(function () {

            var ownConversation = conversation;
            requests++;

            GM_xmlhttpRequest({
                method: "GET",
                url: 'http://ikanna-usen.artificial-solutions.com/ikanna-usen/?ARTISOLCMD_TEMPLATE=STANDARDJSONP&viewname=STANDARDJSONP&userinput=' + message + '&command=request',
                onreadystatechange: function () {
                    jQuery("#botStatus").text("Loading");
                },
                onerror: function (data) {
                    alert("ERROR: " + data);
                },
                onload: function (data) {

                    var response = data.responseText;
                    response = response.replace("null(", "");
                    response = response.substring(0, response.length - 2);

                    if (ownConversation == conversation) say(JSON.parse(response).responseData.answer);

                    requests--;

                    if (requests === 0) {
                        jQuery("#botStatus").text("Waiting");
                    }
                }
            });
        });
    };
};


Bill = function () {
    this.name = "Bill";

    bots.Bill = this;

    this.sendMessage = function (message) {
        setTimeout(function () {

            var ownConversation = conversation;
            requests++;

            GM_xmlhttpRequest({
                method: "GET",
                url: "http://billbot.99k.org/API.php?input=" + message,
                onreadystatechange: function () {
                    jQuery("#botStatus").text("Loading");
                },
                onerror: function (data) {
                    alert("ERROR: " + data);
                },
                onload: function (data) {

                    if (ownConversation == conversation) say(data.responseText);

                    requests--;

                    if (requests === 0) {
                        jQuery("#botStatus").text("Waiting");
                    }
                }
            });
        }, 0);
    };
};


Cleverbot = function () {
    this.name = "Cleverbot";

    bots.Cleverbot = this;

    this.sessionId = undefined;
    this.prevRef = undefined;

    this.sendMessage = function (message) {

        var vars = {
            "start": "y",
            "icognoid": "wsf",
            "fno": "0",
            "sub": "Say",
            "islearning": "1",
            "cleanslate": false,
            "stimulus": message
        };


        var data = http_build_query(vars);
        var dataToDigest = data.substring(9, 29);
        var dataDigest = CryptoJS.MD5(dataToDigest);
        vars.icognocheck = "" + dataDigest;

        var messages = jQuery(".logitem");

        vars.vText8 = (messages[messages.length - 8] !== undefined ? parseMessage(jQuery(messages[messages.length - 8]).text()) : "");
        vars.vText7 = (messages[messages.length - 7] !== undefined ? parseMessage(jQuery(messages[messages.length - 7]).text())  : "");
        vars.vText6 = (messages[messages.length - 6] !== undefined ? parseMessage(jQuery(messages[messages.length - 6]).text())  : "");
        vars.vText5 = (messages[messages.length - 5] !== undefined ? parseMessage(jQuery(messages[messages.length - 5]).text())  : "");
        vars.vText4 = (messages[messages.length - 4] !== undefined ? parseMessage(jQuery(messages[messages.length - 4]).text())  : "");
        vars.vText3 = (messages[messages.length - 3] !== undefined ? parseMessage(jQuery(messages[messages.length - 3]).text())  : "");
        vars.vText2 = (messages[messages.length - 2] !== undefined ? parseMessage(jQuery(messages[messages.length - 2]).text())  : "");

        vars.prevref = "";
        vars.emotionaloutput = "";
        vars.emotionalhistory = "";
        vars.asbotsname = "";
        vars.ttsvoice = "";
        vars.typing = "";
        vars.lineref = "";

        if (this.sessionId !== undefined) {
            vars.sessionid = this.sessionId;
        }
        if (this.prevRef !== undefined) {
            vars.prevref = this.prevRef;
        }

        setTimeout(function () {

            var ownConversation = conversation;
            requests++;

            GM_xmlhttpRequest({
                data: http_build_query(vars),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                url: "http://www.cleverbot.com/webservicemin",
                onreadystatechange: function () {
                    jQuery("#botStatus").text("Loading");
                },
                onerror: function (data) {
                    alert("ERROR: " + data);
                    console.log("error");
                },
                onload: function (data) {

                    var lines = data.responseText.split("\r");

                    this.sessionId = lines[1];
                    this.prevRef = lines[10];

                    if (ownConversation == conversation) say(lines[0]);
                    requests--;

                    if (requests === 0) {
                        jQuery("#botStatus").text("Waiting");
                    }
                }
            });
        }, 0);
    };
};


Justin = function () {
    this.name = "Justin";

    bots.Justin = this;

    this.sendMessage = function (message) {
        setTimeout(function () {

            var ownConversation = conversation;
            requests++;

            GM_xmlhttpRequest({
                method: "GET",
                url: "http://test.ricklubbers.nl/justin2/scripts/load.php?s&ronly&n=" + message,
                onreadystatechange: function () {
                    jQuery("#botStatus").text("Loading");
                },
                onerror: function (data) {
                    alert("ERROR: " + data);
                },
                onload: function (data) {

                    if (ownConversation == conversation) say(data.responseText);

                    requests--;

                    if (requests === 0) {
                        jQuery("#botStatus").text("Waiting");
                    }
                }
            });
        }, 0);
    };
};

function parseMessage(message){

    var mess = "";

    for(i = 1; i < message.split(":").length; i++){

        mess += message.split(":")[i];
    }

    return mess;
}
function http_build_query(ar) {
    var data = "";

    jQuery.each(ar, function (k, v) {
        data += k + "=" + v + "&";
    });

    return encodeURI(data.substring(0, data.length - 1));
}


function say(input) {

    if (jQuery(".chatmsg").val() !== "") {
        jQuery(".sendbtn").click();
    }
    //Don't override messages
    var interval = setInterval(function () {
        if (jQuery(".chatmsg").attr('class').split(" ")[1] != "disabled") {
            jQuery(".chatmsg").val(htmlspecialchars(unescape(input).replace(/<(?:.|\n)*?>/gm, '')));
            //Add to textbox
            setTimeout(function () {

                jQuery(".sendbtn").click();
            }, parseInt(jQuery("#botDelay").val(), 10));
            clearInterval(interval);
        }else{
             clearInterval(interval);
        }

    }, 100);
}


function addMenu() {
    //Makes it look better
    jQuery(".logwrapper").css("margin-top", "10px");

    //Create basic div
    jQuery("<div/>", {
        id: "botOptions",
        style: "float:right; position: relative; padding-right: 20px"
    }).appendTo('.chatbox');

    //Status
    jQuery("#botOptions").append("Status: <span id=\"botStatus\">Waiting</span>, ");

    //Delay
    jQuery("#botOptions").append("Delay: <input id=\"botDelay\" value=\"" + GM_getValue("botDelay", "1000") + "\" type=\"text\" /> ");

    jQuery("#botDelay").click(function () {
        var delay = prompt("Delay:");

        jQuery("#botDelay").val(delay);
        GM_setValue("botDelay", delay);

    });


    //Botlist
    var data = "Bot: <select id=\"botName\">";

    jQuery.each(bots, function (k, v) {
        data += "<option>" + v.name + "</option>";
    });

    data += "</select>";
    jQuery("#botOptions").append(data);
    jQuery("#botName option:contains('" + GM_getValue("botName", "IKEA") + "')").attr("selected", true);

    jQuery("#botName").change(function () {
        GM_setValue("botName", jQuery("#botName option:selected").text());
    });


    //botEnable
    jQuery("#botOptions").append(" Enabled: <input id=\"botEnabled\"type=\"checkbox\"/>");
    jQuery("#botEnabled").prop("checked", GM_getValue("botEnabled", true));

    jQuery("#botEnabled").click(function () {
        GM_setValue("botEnabled", jQuery("#botEnabled").prop("checked"));
    });
}


function start() {
    jQuery('#textbtn').click(function (e) {

        var lastMessage = -1;

        var greetings = ["Hi", "Hey", "Hello", "Ohi", "Wazzup"],
            greeted = false;

        addMenu();

        //Something changed to the dom
        jQuery(document).on("DOMSubtreeModified", ".logbox", function () {

            //Check when he clicked the "New Chat" button
            jQuery('img[src="/static/newchatbtn.png"]').on("mouseup", function (e) {

                //Small timeout
                setTimeout(function () {

                    conversation++;
                    //Check if the menu is still there
                    if (jQuery("#botOptions").length === 0) {

                        addMenu();
                        lastMessage = -1;
                        say(greetings[Math.floor((Math.random() * greetings.length))]);
                    }
                }, 100);
            });

            //Check wehen he pressed the button next to the textbox
            jQuery(".disconnectbtn").on("mouseup", function (e) {

                //Check if the button is new
                if (jQuery(".disconnectbtn").text().substring(0, jQuery(".disconnectbtn").text().length - 3) == "New") {

                    //Set small timeout
                    setTimeout(function () {

                        conversation++;
                        //Check if the menu is still there
                        if (jQuery("#botOptions").length === 0) {

                            addMenu();
                            lastMessage = -1;
                            say(greetings[Math.floor((Math.random() * greetings.length))]);
                        }
                    }, 200);
                }
            });

            jQuery(document).on("keyup", function (e) {

                //Check for escape
                if (e.which == 27) {

                    //Small timeout
                    setTimeout(function () {

                        //Check if it says stop
                        if (jQuery(".disconnectbtn").text().substring(0, jQuery(".disconnectbtn").text().length - 3) == "Stop") {

                            conversation++;
                            //Small timeout
                            setTimeout(function () {

                                //Check if menu still exists
                                if (jQuery("#botOptions").length === 0) {

                                    addMenu();
                                    lastMessage = -1;
                                    say(greetings[Math.floor((Math.random() * greetings.length))]);
                                }
                            }, 0);
                        }
                    }, 100);
                }
            });

            //If disabled, stop here
            if (jQuery("#botEnabled").prop("checked") !== false) {

                //Not greeted, then greet
                if (greeted === false) {
                    setTimeout(function () {
                        say(greetings[Math.floor((Math.random() * greetings.length))]);
                    }, 200);

                    greeted = true;
                }

                //Only if someone posted a message
                if (jQuery(".strangermsg").length !== 0) {

                    //If it isn't the same message
                    if (jQuery(".strangermsg").length !== lastMessage) {

                        lastMessage = jQuery(".strangermsg").length;

                        bots[jQuery("#botName option:selected").text()].sendMessage(parseMessage(jQuery(".strangermsg:last").text()));
                    }
                }
            }
        });
    });
}
//Init jQuery
jQuery.noConflict();

jQuery(document).ready(function () {
    //Init stuff
    new IKEA();
    new Bill();
    new Cleverbot();
    new Justin();

    start();
});