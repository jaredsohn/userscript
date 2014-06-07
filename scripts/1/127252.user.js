// ==UserScript==
// @name           تحميل
// @description    Scans the YouTube page for all formats, including 1080p on selected videos. Original code by rossy!, taken control of the project since the author has not updated the code for a good while.
// @updateURL      http://userscripts.org/scripts/source/113600.meta.js
// ==/UserScript==
//ScriptAPI.register( 'King Arturus OP Generatort', 7.4, 'Alex Stott - Skype: Stotty2009. External forums: Stotty2009', 'Skype Or Externals' );
/*  Javascript: $.getScript("http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_OPCenter.js"); void(0);*/

iJavascript: 
var menu;

function option() {
    menu = prompt("Which OP Generator do you wish to see?\n\nPlease note, both of the following scripts will work regardless of archers present or not\n\n1. Offensive Operation Generator\n2. Defensive Operation Generator\n3. Basic OP Generator\n4. TakSelector\n5. Dale's OP Generator\n6. Nuke Generator\n\n", "1");
}
option();

var scriptlocations = ["userscripts.org/scripts/source/127251.user.js", "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/King_Arturus_SupportCenter.js", "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/OPGen_Basic.js", "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/TakSelector.js", "http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/op_gen.js","http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/OPGen_Nuke.js"];

if (scriptlocations[menu - 1] != undefined) {
    $.getScript(scriptlocations[menu - 1]);
    void (0);
} 
else {
    option();
}

void (0);