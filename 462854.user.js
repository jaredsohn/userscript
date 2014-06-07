// ==UserScript==
// @name                    [TS] USO-Author's Script History
// @namespace               TimidScript
// @description             Sufferin Succotash
// @include                 http://userscripts.org/home/scripts
// @include                 http://userscripts.org/home/scripts?page*
// @version                 1.0.10
// @versioninfo             Major bug fixes
// @icon                    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFeUlEQVR42r2XD0zUZRjHvz/uDk7kDsVODlIQMVFrpRPXtBS1zGpqlJRimp0xEZxmYJKZW5o5jaGCuZkKUyFiUgtQ5580yZQhoqLGJrMhcHgpdxz/7h/c/e563vuBCp16h9i7Pdvvd3t/7+f7PM/7PO97HPpmiMj43nzIPSE4Vi6Trvs0MUpp0reofzlSubXmn7a8/0vAykEB/bcV5ceJJo0fAmi1uHb2L/vryb9Ha5sth5+mAPbN2mCl/6ZjBfHcixHPAK2tQE0N0NaKVfuqLqUXVE2gOY6nIYDN3xiklK87dTiBGxMeIMBrawneBljMyLwAc1zqyQE0r6OvBXiRpQ4LGZh0onAZRob4Ay0tQF0dYDA44UZxEGalVhYWny+P7usUsF2+M2KEIuFE0TKEBvYHmpoAtRowMrgFbaJnEZNedfxkcUkMzTX2pQAJ2d4xowIX/0bw4AApoNcD9QxuAtotQEAEtp9vNiatzx5Nc9UeRPWxAnzIsiPHDX3/6M9xGCwnLTodcLseMDF4O6B4ARgdDt6oQdKGExUZBy69Qd9o+0KAjCx/yqThMwvzVBjgwzlLDRoNYO6EK8cBI4fS+x3nO0+WnPpnRXrOVbdFPEwA1RaORE8d/vKPGdHwlUmFnDc0ODebEz6EKm24kuB3hXerFbDZwNt4rN5RWrEj95pbIlwJEJOdmTJx7KvZ2xbDytkQSJH3u1Mi5NtK1RUyEQgdSHBtNzjsdqp+B3i7A6szytwS4UpArLe3d275qVQE+lajTmuGQ9wfL0n7wft2KRA2hbz3JXjjfTjP34N3DZ4eP0svq9iZ++h0uBKQFRo6TFXzRyIt2Ay1zgJ1gwFhg0YgSEzeB1JFmqkKOjoEr13AwXFOs4nEWLX7esWuH84+VIQrARl+fn4r6i9vg7+oGgZysFbTilERoyHiqeuZm7rDGbgn3It6loiESiSwKYORsKbo0r7Mc1Fw0R9cCRhPVpK4NNb7+5QIemx3NnUvh10I94P5ZtZttU64WOyEw4eqWKGAyerA5OnpWy5fVa91RwAbKrK961NUog1xQ8DxJsHbLq/5zqP/Qc8ZuCfcl/aKv79zr2xNO6354pvjVLOwuyOAjY+ZiC+TPxJvWhIErqPtvteOHgddF5yBvb0F69cPkMsF0dSqM7PLTHHJhVQ63Q+px3XCRWxTpqxcIN68RAkvq8HlZnPmm3nOwMxzBpfJhEgRnEVAlVRUvP/QlWnupuDBsYBsf/LyDyTffRIML5vxv/Auz6VSwRicRaoTfvTkDct7S/OndnTYLvRGABvzyLJXxcdI0uKHwos3dtvpTq+7jIWdwVmPIAGlZbW22aqfFuv0plxXC3tyH2DHbM7yuLk+6StG0Pls7A7v8pylqBN+/Vq9Y44qL7Gmvnn3wxb19Eb0DllevOpd6a61YyESW+7n3M9PmNEJr7551zFj/sGvquuaNj9qwd7cCfMUCsW8G/lfIyCSlZ1NiATznDUogmtqtHgz9mDa9aqGz/GYu6GnAmZwHHfs0MZ4UYyhGJg8G3j7eUJYhHIj7/WaRsxZmJN5vrxuKXrU/JMKoBsoriya+1bIgSgLuEZ2NBN0+lzgtVDqkO0w6lowa17Wr8Ult9imtbqzqCcCtshkspRb+xZi0J2LdCYQ3GwVMKvXUMNuwPwP958uOFZJYYHZ3UU9EXA8MnLCzItrhtGdkG7C7fw9EfyiBMRvzCnPPFg6g+Y1e7CmRwKy5HK56u8DS6DQl5HnvFOEQxKA5Erfm9t3FUymOXc9gXsq4Dmyc1GvTBiclRiJMIkOFrsUm88Yar/dUzDN4XDc8hTuqQA26E8gEiUSSXB4eJijUa+/qW3Q7aHfdL2B90ZAn49/AcsAWj+uzY09AAAAAElFTkSuQmCC
// ==/UserScript==

// @require                 http://userscripts.org/scripts/source/159301.user.js
// @resource  meta          http://userscripts.org/scripts/source/462854.meta.js

/* Information
********************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/100610
Script's Homepage:              http://userscripts.org/scripts/show/462854

Search for  "[VYCS]" for variable you can set.

----------------------------------------------
    Version History
----------------------------------------------
1.0.10 (2014-04-25)
 - Major bug fix: Broke the script in last update by comparing stats1 with stats1 instead of stats2
1.0.9 (2014-04-24)
 - Major Bug Fix: Not all timestamps were being displayed
 - Major Bug Fix: Needed to check if stats1[id] exists when new scripts are added
1.0.8 (2014-04-17)
 - Bug Fix: Corrected date difference
1.0.7 (2014-04-16)
 - Altered CSS
 - Added minutes to hours
1.0.6 (2014-04-16)
 - Added time difference
 - Changed interface slightly
1.0.5 (2014-04-15)
 - Added function on RemoveTimeStamp
 - Removed current timestamp delete option
1.0.4 (2014-04-15)
 - Improved the history interface by grouping times by date
 - Added the ability to remove saved data set
1.0.3 (2014-04-15)
 - Bug fix not showing oldest history 
 - Added variable to set size of history. By default it is set to 5 records
 - Added USO-Updater (Removed it due to issues with USO)
1.0.2 (2014-04-12)
 - Added links
 - Added history
 - Possible issue if multiple pages of scripts exists. Currently I have no clue how the URL looks so I guessed
1.0.1 (2014-04-12)
 - Initial Release (without history or links) 
**********************************************************************************************/

/* [VYCS] VARIABLE YOU CAN SET
**********************************************************************************************/
//GM_setValue("HistorySize", 6); //Size of history. By default it is set to 6.

/*********************************************************************************************/

var currentStatsTime;

function DisplayChanges(previousStatsTime)
{    
    var counters = document.querySelectorAll("span.TSConPos, span.TSConNeg");
    for (var i = counters.length - 1; i >= 0; i--)
    {
        if (counters[i].previousElementSibling.tagName == "BR") counters[i].parentElement.removeChild(counters[i].previousElementSibling);
        counters[i].parentElement.className = counters[i].parentElement.className.replace(/\s*(TSConPos|TSConNeg)/, "");
        counters[i].parentElement.removeChild(counters[i]);
        
    }
        
    stats1 = JSON.parse(GM_getValue(previousStatsTime));
    stats2 = JSON.parse(GM_getValue(currentStatsTime));    
    
    var pos = [0, 0, 0, 0];
    var neg = [0, 0, 0, 0];    
    var rows = document.querySelectorAll("[id^=scripts-]");    
    for (var i = 0; i < rows.length; i++)
    {
        var row = rows[i];
        var id = "i" + row.id.match(/\d+/)[0];
        
        for (var j = 0; j < 4; j++)
        {
            
            var dif = (stats1[id]) ? stats2[id][j] - stats1[id][j] : stats2[id][j];
            if (dif)
            {                
                if (dif > 0) pos[j] += dif;
                else neg[j] += dif;
                CreateCounter(row.cells[j + 2], (stats2[id][j] - stats1[id][j]), true);
            }
        }
    }    

    var headers = document.body.getElementsByTagName("th");
    for (var j = 0; j < 4; j++)
    {
        if (pos[j]) CreateCounter(headers[j + 2], pos[j], true);
        if (neg[j]) CreateCounter(headers[j + 2], neg[j], !(pos[j]));
    }
}

function CreateCounter(cell, val, br)
{
    if (br) cell.appendChild(document.createElement("br"));

    var span = document.createElement("span");
    span.textContent = ((val > 0) ? "(+" : "(") + val + ")";
    span.className = (val > 0) ? "TSConPos" : "TSConNeg";
    cell.className += (val > 0) ? " TSConPos" : " TSConNeg";
    cell.appendChild(span);
}

function LoadHistory(e)
{
    DisplayChanges(this.id);
    var tabs = document.getElementsByClassName("TStimeTab")
    for (var i = 0; i < tabs.length; i++) tabs[i].className = "TStimeTab";
    this.className += " TStimeSelected";    
}

function RemoveTimeStamp(e)
{
    e.stopImmediatePropagation();    
    var stamp = this.parentElement;

    var date = new Date(parseInt(stamp.id));                
    if (confirm("Are you sure you wish to remove timestamp " + date.toLocaleTimeString() + " (" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + ")"))
    {                                        
        GM_deleteValue(stamp.id);                
        stamp.parentElement.removeChild(stamp);        
    }
}

(function ()
{
    GM_addStyle("td.TSConPos {background-color: #E1FDE1 !important; } td.TSConNeg {background-color: #FBDFE3 !important;}");
    GM_addStyle("span.TSConPos {color: #0BA20B !important; } span.TSConNeg {color: #F00;}");    
    
    var stats1; //Contains old content    
    var stats2 = {}; //New content
    var previousStatsTime = 0;    

    names = GM_listValues(); //Load history.
    names.sort();
    for (var i = names.length - 1; i >= 0; i--) //Get the last saved stats
    {        
        if (!names[i].match(/\d+i$/i)) names.splice(i, 1);
        else if (previousStatsTime < parseInt(names[i])) previousStatsTime = parseInt(names[i]);            
    }
        
    previousStatsTime = previousStatsTime + "i";    
    stats1 = GM_getValue(previousStatsTime);    
    if (stats1)
    {        
        stats1 = JSON.parse(stats1);        
        stats2 = JSON.parse(GM_getValue(previousStatsTime)); //Reason for this because some authors have multiple pages of scripts. We need to keep all ids.     
    }            
    
    var changed = false;
    var rows = document.querySelectorAll("[id^=scripts-]");    
    for (var i = 0; i < rows.length; i++)
    {
        var row = rows[i];
        var id = "i" + row.id.match(/\d+/)[0];

        stats2[id] = new Array();
        stats2[id].push((row.cells[2].children.length == 2) ? parseInt(row.cells[2].lastElementChild.textContent) : 0);
        stats2[id].push(parseInt(row.cells[3].textContent));
        stats2[id].push(parseInt(row.cells[4].textContent));
        stats2[id].push(parseInt(row.cells[5].textContent));

        addQuickLink("http://userscripts.org/scripts/discuss/" + id.match(/\d+/)[0], row.cells[3]);
        addQuickLink("http://userscripts.org/scripts/fans/" + id.match(/\d+/)[0], row.cells[4]);
                
        if (!stats1 || !stats1[id]) continue;        
        for (var j = 0; j < 4; j++) if (stats1[id][j] - stats2[id][j]) changed = true;                    
    }

    
    currentStatsTime = new Date().getTime() + "i"; //New saved time
    GM_setValue(currentStatsTime, JSON.stringify(stats2));

    var historySize = 1 + GM_getValue("HistorySize",5); 
    if (!changed) GM_deleteValue(previousStatsTime); //Delete the last stored status as no changes. So keep the latest date.                
    else
    {
        if (names.length >= historySize) GM_deleteValue(names[0]);
        DisplayChanges(previousStatsTime);
    }
    
    GM_addStyle(".TSremove{cursor: pointer;} .TSremove:hover{background-color:#FFD65C;}");
    GM_addStyle(".TSdateBox{display: inline-block;  padding: 5px; background-color:#000; border-right: 2px solid gray; color:lime;}");
    GM_addStyle(".TStimeTab {margin: 0 0 0 5px;  border: 1px solid gray; color:white; cursor:pointer;} .TStimeTab:hover, .TStimeSelected{background-color:yellow; color:black;} ");
           
    var table = document.getElementsByTagName("table")[0];
    var tabs = document.createElement("div");
    tabs.setAttribute("style", "background-color:#323333; color:#FFF;");
    table.parentElement.insertBefore(tabs, table);

    var dateCurrent = new Date(parseInt(currentStatsTime));   
    for (var i = 0; i < names.length; i++)
    {        
        if (i == 0 && names.length == historySize) continue;

        var date1 = new Date(parseInt(names[i]));
        var group = document.createElement("span");
        group.className = "TSdateBox";
        var date = document.createElement("span");
        date.textContent = date1.getFullYear() + "-" + date1.getMonth() + "-" + date1.getDate() + ":";        

        while (i < names.length)
        {                       
            var date2 = new Date(parseInt(names[i]));

            if (date1.getFullYear() != date2.getFullYear() || date1.getMonth() != date2.getMonth() || date1.getDate() != date2.getDate())
            {
                i--;
                break;
            }              
            var diffMins = Math.round((dateCurrent - date2) / 60000);            
            var diffHrs = Math.floor(diffMins / 60) % 24;
            var diffDays = Math.floor((diffMins / 60) / 24);
            var diffMins = Math.floor(diffMins % 60);
            var diff = " (-" + ((diffDays) ? diffDays + "d" : "") + ((diffHrs) ? diffHrs + "h" : "") + ((!diffDays) ? diffMins + "m" : "") + ") ";            
            
            var time = document.createElement("span");
            time.className = "TStimeTab";
            time.textContent = date2.toLocaleTimeString() + ((diffDays || diffHrs || diffMins) ? diff : "");
            time.id = names[i];

            var remove = document.createElement("span");
            remove.className = "TSremove";
            remove.style.color = "red";
            remove.textContent = "[X]";
            
            group.insertBefore(remove, group.firstElementChild);
            group.insertBefore(time, group.firstElementChild);
            time.appendChild(remove);

            time.onclick = LoadHistory;
            remove.onclick = RemoveTimeStamp            
            i++;
        }

        group.insertBefore(date, group.firstElementChild);
        tabs.insertBefore(group, tabs.firstElementChild);
                                                                
    } 
    document.getElementById(previousStatsTime).className += " TStimeSelected";    
    if (!changed) document.getElementById(previousStatsTime).id = currentStatsTime; //previousStatsTime has been overwritten 
    var remove = document.getElementById(currentStatsTime).lastElementChild;
    if (remove)
    {
        remove.onclick = null;
        remove.className = null;
        remove.style.color = "gray";
    }

    function addQuickLink(url, cell)
    {        
        var el = document.createElement("a");
        el.textContent = cell.textContent;        
        el.href = url;
        cell.textContent = "";
        cell.appendChild(el);
    }
})();

