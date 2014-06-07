// ==UserScript==
// @name           etree on LMA
// @namespace      http://code.google.com/p/etree-on-lma/
// @include        http://www.archive.org/details/*    
// ==/UserScript==


if (location.href.match(/\.(?!0)\d+\./)) {
   addJQuery(linkEtree);
}

function linkEtree() {
   shnStr = location.href.match(/\.(?!0)\d+\./);
   shnId = shnStr[0].match(/\d+/);
   appendLink = '<a target="_dbe" href="http://db.etree.org/shn/' + shnId[0] + '"><img style="width:16px;height:16px;vertical-align:middle" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH1gcYFRoYlpL15AAAAhBJREFUOE99kz9MU1EUxn/nvVde/1DaiprUMKiDi5qiDg4OjIgR44DEpErCYqKbk0RjXIzBRUwgMrgYCYMaZdCBBTUMrmiMiYMaB41/MW15lLa09zi8lkBf4bfdk/ude7+c84mq0kx+Oqta/BeoS3Qbiey0bKitb+C9GNHqj3cBYTNOOkN773UIxcRqFLcSJ86MI5Ek0hYjOfwUrZXRSg6AtQabie3t+9DaKpgqicFJ8lNZ4idu4s3eAuoW8tPnVIuLLdQOiYEJCs+v0XF6lOW5MWqLn1GzCsYg0U7/By3FgLTFMEvfEaQuSKHVMhhDQ2eV3k4Fx1AncfYB3txd3Ew/xvuF8YIPWVpaaiH1qX57g1Y83L09rCzMUPvzMXDHknB83ckG8cfsdB3B7ugCy0ErBao/34PtBBqIqpK736fYIZJDj2DVw3t5h9ixYQozV5BwiljPBaz4LhCL/OOLYGpQ3x8LwE7tITE4yfL8GIVnl4l094NRcFwiRwex04eRcAoJxYj3XsVO7vZfb0whPnBPJLqT2uJXtJLHezWORDp9O2KDtEHItyqhCFj++oQP9LFmypu9Qcep25jcF1SV/JNLaMWj+HqCeLQTrZawdxyk/GkeXcnhpDO4mawEs/D7A5abxBT/shlOOkP7yVGBpjA12CqN7v7jhLvPryWyZYMGpYWHqmUPcdsJHxraEOMG/wHFBtuYqW6yvQAAAABJRU5ErkJggg%3D%3D" border="0" title="Link to db.etree.org Record" /></a> shnid: <a target="_dbe" href="http://db.etree.org/shn/' + shnId[0] + '">'+ shnId[0] +'</a><br />';
   $("h1:contains('Resources')").closest('div').append(appendLink);
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-1.4.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

