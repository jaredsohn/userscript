// ==UserScript==
// @name       Drip Me some more Stats
// @version    0.1
// @description  Calculates and displays more stats in DripStat.
// @match      https://dripstat.com/game/
// ==/UserScript==

function init()
{
    //Keep track of the original names and descriptions
    localStats.powerUps.slice(0).forEach(function(powerUp){
   
        powerUp.upgrades.forEach(function(upgrade){
                upgrade.originalName = upgrade.name;
                upgrade.originalDesc = upgrade.desc;
        });
   
        powerUp.originalName = powerUp.name;
        powerUp.originalDesc = powerUp.desc;
       
    })
   
    //string (int) seconds to formatted time
    String.prototype.toHHMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        if(sec_num <= 0)
            return "Now";
       
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
   
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10 && hours > 0) {minutes = "0"+minutes;}
        if (seconds < 10 && minutes > 0) {seconds = "0"+seconds;}
       
        var output = "";
        if(hours > 0)
            output = hours+":";
        else if(minutes > 0)
            output += minutes+":"+seconds;
        else
            output = seconds+" seconds";
       
        return output;
    }
   
    String.prototype.formatBytes = function() {
        var bytes = parseFloat(this);
       
        var suffixes = [
            "bytes",
            "Kb",
            "Mb",
            "Gb",
            "Tb",
            "Pb"
        ];
       
        var loops = 0;
        while(bytes > 800 && loops < 6)
        {
            bytes = bytes / 1000;
            loops += 1;
        }
       
        return bytes.toFixed(2) + " " + suffixes[loops];
    }
   
    //Create the container div
    $('#bpsChartContainer').parent().append("<div id='next-purchase-container' style='width:100%; height:30px;'></div>");
    $("#next-purchase-container").html("Next Purchase:<div id='next-purchase-label'></div><div id='next-purchase-time'></div>");
}
 
function loop() {
    var upgradeCounter = 1;
    var powerupCounter = 1;
        var data = Array();
        var min = 999999999999;
        var next = min;
        var minObj = {};
        localStats.powerUps.slice(0).forEach(function(powerUp) {
           powerUp.position = "pu"+powerupCounter;
           
           var hasUpgrade = false;
                powerUp.upgrades.forEach(function(upgrade) {
                    hasUpgrade = true;
            upgrade.position = "upg"+upgradeCounter;
           
            var value = upgrade.price/(powerUp.totalBps * 0.1);
            upgrade.value = value;
           
            min = Math.min(min, value);
                if(value == min)
               minObj = upgrade;
 
                        upgrade.desc = String(value).formatBytes() + "<br>" + upgrade.originalDesc;
                });
               
                if(hasUpgrade)
                    upgradeCounter++;
               
           powerupCounter++;
 
                var time = Number((powerUp.currentPrice - localStats.byteCount)/localStats.bps).toFixed(0);
            if(powerUp.currentPrice > localStats.memoryCapacity)
            {
                var value = (powerUp.currentPrice + (powerUp.currentPrice - localStats.memoryCapacity))/powerUp.currentBps;
            }
            else
            {
                var value = powerUp.currentPrice/powerUp.currentBps;
            }
                powerUp.value = value;
 
                data.push(value);
 
                min = Math.min(min, value);
                if(value == min)
                  minObj = powerUp;
 
                //if(time > 0)
                        //powerUp.desc = originalText[powerUp.name] + "<br>" + time.toHHMMSS();
        });
       
        $('.storeItem, .upgcontainer').css('background-color', '');
       
        var selector = minObj.position;
        $("#"+selector).css('background-color', '#B2EDED');
 
        $('.storePrice').each(function(index){
                $(this).find('p').remove();
                var content = "<p style=\"display:inline; font-size:0.7em;\"> ("+String(data[index]).formatBytes()+")</p>";
                $(this).append(content)
        });
       
        var label = minObj.name;
        if(minObj.powerup) //check if it's an upgrade or not
        {
        label += " (Upgrade)";
        var price = minObj.price;
    }
    else
    {
        var price = minObj.currentPrice;
    }
   
    var time = Number((price - localStats.byteCount)/localStats.bps).toFixed(0);       
   
       
        $("#next-purchase-label").html(label+"<br>Cost: "+String(minObj.value).formatBytes()+" per byte");
        $("#next-purchase-time").html(String(time).toHHMMSS());
}
 
init();
setInterval(function(){loop();}, 500);