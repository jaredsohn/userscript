// ==UserScript==
// @name			EMTest
// @version			0.1
// @description		Conclave's test script
// @match			http://www.epicmafia.com/game/*
// @match			http://userscripts.org/scripts/source/*
// ==/UserScript==
$('#typebox').on("keypress", function (e) {
    if (e.which == 13) {
        var chatmsg = $("#typebox").val();

        console.log("Chat message: " + chatmsg);
        if (chatmsg == "/test") {
            console.log("Second Test log");
            $("#typebox").val("This is a test");
            send_msg();
        }
    }
}
);