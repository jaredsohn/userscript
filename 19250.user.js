// ==UserScript==
// @name           Orkut champ-heart Shaped Name
// @author         Orkut Champ
// @description    Heart Shape Scrap Generator.
// ==/UserScript==

function createHeart(sourceId, resultId) {
    objSource = window.document.getElementById(sourceId);
    objResult = window.document.getElementById(resultId);

    if(objSource.value.length == 0) {
        alert("Please Type Your name in the Text Box!");
        return false;
    }

    string = objSource.value;

    heart = "";
    heart = ". [red][b] \n";
    heart += "_________"               + partString(string, 8)  + "____________" + partString(string, 9)  + "\n";
    heart += "______"                  + partString(string, 14) + "_______"      + partString(string, 16) + "\n";
    heart += "____"                    + partString(string, 19) + "___"          + partString(string, 19) + "\n";
    heart += "___"                     + partString(string, 32) + "_______"      + partString(string, 4)  + "\n";
    heart += "__"                      + partString(string, 32) + "_________"    + partString(string, 4)  + "\n";
    heart += "_"                       + partString(string, 36) + "_______"      + partString(string, 4)  + "\n";
    heart += "_"                       + partString(string, 40) + "______"       + partString(string, 1)  + "\n";
    heart +=                             partString(string, 44) + "__"           + partString(string, 3)  + "\n";
    heart +=                             partString(string, 47) + "_"            + partString(string, 1)  + "\n";
    heart +=                             partString(string, 49)                                           + "\n";
    heart +=                             partString(string, 49)                                           + "\n";
    heart += "_"                       + partString(string, 47)                                           + "\n";
    heart += "__"                      + partString(string, 45)                                           + "\n";
    heart += "____"                    + partString(string, 42)                                           + "\n";
    heart += "______"                  + partString(string, 37)                                           + "\n";
    heart += "_________"               + partString(string, 31)                                           + "\n";
    heart += "____________"            + partString(string, 25)                                           + "\n";
    heart += "______________"          + partString(string, 20)                                           + "\n";
    heart += "_________________"       + partString(string, 13)                                           + "\n";
    heart += "___________________"     + partString(string, 9)                                            + "\n";
    heart += "_____________________"   + partString(string, 6)                                            + "\n";
    heart += "______________________"  + partString(string, 4)                                            + "\n";
    heart += "_______________________" + partString(string, 2)                                            + "\n";
    heart += "orkutchamp.blogspot.com";


    objResult.value = heart;
}
function partString(string, num) {
    if(string.length >= num)
        return string.substring(0, num);

    repeat = Math.ceil(num / string.length);

    newString = "";

    for(i = 0; i < repeat; i++)
        newString += string;

    return newString.substring(0, num);
}