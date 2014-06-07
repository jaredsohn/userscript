// ==UserScript==
// @name            Screen Scrape
// @namespace       http://www.tolmera.com
// @description     Screen Scrpaer for Astro Empires
// @include         *.astroempires.com/map.aspx?loc=*
// @downloadURL     http://skm.tolmera.com/modules/filestore/files/10/Screen_Scrape.user.js
// @updateURL       http://skm.tolmera.com/modules/filestore/files/10/Screen_Scrape.user.js
// @version         1.1
// ==/UserScript==

    var BodyInfo = document.documentElement.innerHTML;
    var IFrameAEDatabase = document.createElement('IFrame');
//    IFrameAEDatabase.src="http://skm.tolmera.com/modules/command_line/striptags.php";
    IFrameAEDatabase.name="IFrameAEDatabase"
    IFrameAEDatabase.height="30px";
    IFrameAEDatabase.width="300px";
    
//    var myDiv = document.createElement('div');
//    myDiv.innerHTML = '<form name="AEDatabaseForm" action="http://skm.tolmera.com/modules/command_line/striptags.php" method="POST" target="IFrameAEDatabase"><textarea name="subject" rows="1" cols="30">' + BodyInfo + '</textarea><input type="submit"></form>';
    document.body.appendChild(IFrameAEDatabase);
//    document.body.appendChild(myDiv);


    var MyForm = document.createElement("form");
    MyForm.action = "http://skm.tolmera.com/modules/command_line/striptags.php";
    MyForm.method = "POST";
    MyForm.target = "IFrameAEDatabase";
    MyForm.innerHTML = '<textarea name="subject" rows="1" cols="30">' + BodyInfo + '</textarea>';
    document.body.appendChild(MyForm);
    MyForm.submit();
