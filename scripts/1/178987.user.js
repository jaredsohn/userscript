    // ==UserScript==
    // @name       Virtual Manager - Untraind Youth Hack
    // @namespace  http://www.virtualmanager.com
    // @match      http://www.virtualmanager.com/free_transfer_listings*
    // ==/UserScript==
     
    //By Olof. The one and only. The Legend.
     
    function isUntrained(trainingPage)
    {
        if (trainingPage.search("No training data found.") >= 0)
        {
            return true;
        }
       
        return false;
    }
     
    var i;
    var url = new Array(20);
     
    for (i = 0; i < 20; i++)
    {
        var player = document.getElementsByClassName("result")[i].getElementsByClassName("player")[0].getElementsByClassName("name")[0].getElementsByTagName("a")[0];
        url = "http://www.virtualmanager.com" + player.getAttribute("href") + "/training";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
       
        var trainingPage = xmlhttp.responseText;
       
        var untrained = isUntrained(trainingPage);
       
        if (untrained)
        {
            player.innerHTML = "Untrained";
            player.style.color = "red";
        }
        else
        {
            player.innerHTML = "Trained";
        }
    }
    /*
    Exception: document.getElementsByClassName(...)[i] is undefined
    @Scratchpad/5:22
    */

