// ==UserScript==
// @version        1.5
// @name           SuperKosherCrazyCareers for Opera
// @author         Emilien Klein
// @namespace      http://emilien.klein.st/gmscripts/
// @description    Forumwarz.com - Enables you to sort and filter the available jobs proposed by Hershel Jewstein's Kosher Crazy Careers.
// @include        http://*.forumwarz.com/job_board
// @include        http://forumwarz.com/job_board
// ==/UserScript==

/*

History:

22/10/2009 - v1.5 - Fixed streak marker bug with unicode characters
20/09/2009 - v1.4 - Updated to make it compatible with the fan system
19/02/2009 - v1.3 - Updated to adapt to a code change from ForumWarz
04/02/2009 - v1.2 - Corrected sorting order and improved text
04/02/2009 - v1.1 - Added the possibility to filter out the already streaked forums
02/02/2009 - v1.0 - First version uploaded to userscripts.org

*/

//unsafeWindow.console.log("XX");

var jobsDiv = null;
var jobsTable = null;
var headerRow = null;
var origRows = null;
var streakedForums = null;
var alreadyFilteredStreakedForums = false;
var numUnstreakedForums = 0;

var forumRows = null;
var sortForumReverseOrder = true; //By default, the names would be ordered from highest to lowest, we want the exact opposite...

var descriptionRows = null;
var sortDescriptionReverseOrder = false;

var difficultyRows = null;
var sortDifficultyReverseOrder = false;

var rewardRows = null;
var sortRewardReverseOrder = false;

var jobPointsRows = null;
var sortJobPointsReverseOrder = false;

prepareJobsTable();

function prepareJobsTable(){
    jobsDiv = document.getElementById("jobs");
    
    //Add a new div to place the link that enables to filter out the already streaked forums
    addFilterStreakedForumsDiv();
    
    var xpathResult = document.evaluate("table/tbody/tr", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var thisNode = xpathResult.iterateNext();
    origRows = new Array();
    var i=0;
    while(thisNode){
        if(i==0){
            headerRow = thisNode;
        } else {
            origRows.push(thisNode);
        }
        thisNode = xpathResult.iterateNext();
        i++;
    }
    
    //Edit the header row to enable sorting and filtering
    headerRowHTML = headerRow.innerHTML;
    headerRowHTML = headerRowHTML.replace(/<th>\s<\/th>/gi, "<th><a id='skcc_resetLink' href='' title='Reset the jobs list'>Reset</a></th>");
    headerRowHTML = headerRowHTML.replace(/<th>Forum<\/th>/gi, "<th><a id='skcc_forumLink' href='#' title='Order by forum name'>Forum</a></th>");
    headerRowHTML = headerRowHTML.replace(/<th>Description<\/th>/gi, "<th><a id='skcc_descriptionLink' href='#' title='Order by job description'>Description</a></th>");
    headerRowHTML = headerRowHTML.replace(/<th>Difficulty<\/th>/gi, "<th><a id='skcc_difficultyLink' href='#' title='Order by difficulty'>Difficulty</a></th>");
    headerRowHTML = headerRowHTML.replace(/<th>Reward<\/th>/gi, "<th><a id='skcc_rewardLink' href='#' title='Order by Flezz reward'>Reward</a></th>");
    headerRowHTML = headerRowHTML.replace(/<th>JP<\/th>/gi, "<th><a id='skcc_jobPointsLink' href='#' title='Order by Job Points'>JP</a></th>");
    headerRow.innerHTML = headerRowHTML;
    
    populatejobsTable(origRows, false);
    
    //Link with the events
    document.getElementById('skcc_filterStreakedForumsLink').addEventListener("click", filterStreakedForums, false);
    document.getElementById('skcc_forumLink').addEventListener("click", function(evt){updateJobsTable(evt, "forum");}, false);
    document.getElementById('skcc_descriptionLink').addEventListener("click", function(evt){updateJobsTable(evt, "description");}, false);
    document.getElementById('skcc_difficultyLink').addEventListener("click", function(evt){updateJobsTable(evt, "difficulty");}, false);
    document.getElementById('skcc_rewardLink').addEventListener("click", function(evt){updateJobsTable(evt, "reward");}, false);
    document.getElementById('skcc_jobPointsLink').addEventListener("click", function(evt){updateJobsTable(evt, "jobPoints");}, false);
    
    //Prepare the ordered tables
    getOrderedJobs();
    
    //Get the list of already streaked forums
    getStreakList();
}

function filterStreakedForums(evt){
    evt.preventDefault();
    if(!alreadyFilteredStreakedForums){
        //Remove streaked forums from the original rows and display them
        origRows = deleteStreakedForums(origRows);
        //Remember that we have filtered out the already streaked forums
        alreadyFilteredStreakedForums = true;
        if(origRows.length > 0){
            populatejobsTable(origRows, false);
            //Remove streaked forums from the other (already sorted) rows
            forumRows = deleteStreakedForums(forumRows);
            sortForumReverseOrder = true;
            descriptionRows = deleteStreakedForums(descriptionRows);
            sortDescriptionReverseOrder = false;
            difficultyRows = deleteStreakedForums(difficultyRows);
            sortDifficultyReverseOrder = false;
            rewardRows = deleteStreakedForums(rewardRows);
            sortRewardReverseOrder = false;
            jobPointsRows = deleteStreakedForums(jobPointsRows);
            sortJobPointsReverseOrder = false;
        } else {
            //Remove the jobs table
            jobsDiv.removeChild(jobsDiv.childNodes[4]);
        }
        document.getElementById("skcc_filterStreakedForums").innerHTML = "There " + (numUnstreakedForums > 1 ? "are" : "is") + " <b>" + (numUnstreakedForums > 0 ? numUnstreakedForums : "no") + " unstreaked forum" + (numUnstreakedForums > 1 ? "s" : "") + "</b> available! <a href=''>Reload the page</a>.";
        //Remember that we have filtered out the already streaked forums
        alreadyFilteredStreakedForums = true;
    }
}

function deleteStreakedForums(rows){
    var newRows = new Array();
    var forumNames = new Array();
    for(var i in rows){
        if (!rows[i].childNodes) continue;
        var forumName = rows[i].childNodes[2].childNodes[0].innerHTML;
        //Remove spaces
        forumName = forumName.replace(/[^\w]/g, "");
        var forumStreaked = false;
        for(var j in streakedForums){
            if(forumName == streakedForums[j]){
                forumStreaked = true;
            }
        }
        if(!forumStreaked){
            newRows.push(rows[i]);
            forumNames.push(forumName);
        };
    }
    if(!alreadyFilteredStreakedForums){
        //Count the number of unstreaked forums
        var unstreakedForumNames = new Array();
        for(var k in forumNames){
            var newUnstreakedForum = false;
            for(var l in unstreakedForumNames){
                if(unstreakedForumNames[l] == forumNames[k]){
                    newUnstreakedForum = true;
                }
            }
            if(!newUnstreakedForum){
                unstreakedForumNames.push(forumNames[k]);
            }
        }
        numUnstreakedForums = unstreakedForumNames.length;
    }
    return newRows;
}

function addFilterStreakedForumsDiv(){
    var el = document.createElement("div");
    el.innerHTML = "<a id='skcc_filterStreakedForumsLink' href='#'>Filter out forums that are already in your streak</a>";
    el.id = "skcc_filterStreakedForums";
    el.style.visibility = "hidden";
    el.style.margin = "10px";
    var xpathResult = document.evaluate("table", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    jobsDiv.insertBefore(el, xpathResult.iterateNext());
}

function populatejobsTable(rows, reverseOrder){
    //Delete the content of the jobs table
    emptyJobsTable();
    //Add the header row
    jobsTable.appendChild(headerRow);
    //Add the job elements
    var i = (reverseOrder ? rows.length-1 : 0);
    while(rows[i]){
        jobsTable.appendChild(rows[i]);
        (reverseOrder ? i-- : i++);
    }
}

function emptyJobsTable(){
    var xpathResult = document.evaluate("table", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var tmpJobsTable = xpathResult.iterateNext();
    tmpJobsTable.removeChild(tmpJobsTable.firstChild);
    tbody = document.createElement("tbody");
    tmpJobsTable.appendChild(tbody);
    jobsTable = tmpJobsTable.firstChild;
}

function updateJobsTable(evt, type){
    evt.preventDefault();
    var rows = null;
    var reverseOrder = false;
    switch(type){
        case "forum":
            rows = forumRows;
            reverseOrder = sortForumReverseOrder;
            sortForumReverseOrder = !sortForumReverseOrder;
            sortDescriptionReverseOrder = false;
            sortDifficultyReverseOrder = false;
            sortRewardReverseOrder = false;
            sortJobPointsReverseOrder = false;
            break;
        case "description":
            rows = descriptionRows;
            reverseOrder = sortDescriptionReverseOrder;
            sortDescriptionReverseOrder = !sortDescriptionReverseOrder;
            sortForumReverseOrder = true;
            sortDifficultyReverseOrder = false;
            sortRewardReverseOrder = false;
            sortJobPointsReverseOrder = false;
            break;
        case "difficulty":
            rows = difficultyRows;
            reverseOrder = sortDifficultyReverseOrder;
            sortDifficultyReverseOrder = !sortDifficultyReverseOrder;
            sortForumReverseOrder = true;
            sortDescriptionReverseOrder = false;
            sortRewardReverseOrder = false;
            sortJobPointsReverseOrder = false;
            break;
        case "reward":
            rows = rewardRows;
            reverseOrder = sortRewardReverseOrder;
            sortRewardReverseOrder = !sortRewardReverseOrder;
            sortForumReverseOrder = true;
            sortDescriptionReverseOrder = false;
            sortDifficultyReverseOrder = false;
            sortJobPointsReverseOrder = false;
            break;
        case "jobPoints":
            rows = jobPointsRows;
            reverseOrder = sortJobPointsReverseOrder;
            sortJobPointsReverseOrder = !sortJobPointsReverseOrder;
            sortForumReverseOrder = true;
            sortDescriptionReverseOrder = false;
            sortDifficultyReverseOrder = false;
            sortRewardReverseOrder = false;
            break;
    }
    if(rows){
        populatejobsTable(rows, reverseOrder);
    }
}

function getOrderedJobs(){
    forumRows = new Array();
    descriptionRows = new Array();
    difficultyRows = new Array();
    rewardRows = new Array();
    jobPointsRows = new Array();
    var tempForumRows = new Array();
    var tempDescRows = new Array();
    var tempDifficultyRows = new Array();
    var tempRewardRows = new Array();
    var tempJobPointsRows = new Array();
    var i=0;
    while(origRows[i]){
        //Forum name
        var forum = document.evaluate("table/tbody/tr[" + (i+2) + "]/td[3]", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext().innerHTML;
        forum = forum.replace("</a>", "");
        forum = forum.split(">")[1];
        tempForumRows.push(Array(forum, origRows[i]));
        
        //Description
        var description = document.evaluate("table/tbody/tr[" + (i+2) + "]/td[4]", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext().innerHTML;
        //Remove spaces and new lines
        description = description.replace(/\s/gi, "");
        if(description == "PwnForum!"){
            descriptionRows.push(origRows[i]);
        } else if (description.indexOf("PwnForuminlessthan") >= 0) {
            numSeconds = description.replace("PwnForuminlessthan", "");
            numSeconds = numSeconds.replace("s", "");
            tempDescRows.push(Array(numSeconds, origRows[i]));
        } else if (description.indexOf("Gain") >= 0) {
            numSeconds = description.replace("Gain", "");
            numSeconds = numSeconds.replace("fans", "");
            tempDescRows.push(Array(numSeconds, origRows[i]));
        }
        
        //Difficulty
        var difficulty = document.evaluate("table/tbody/tr[" + (i+2) + "]/td[5]", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext().innerHTML;
        difficulty = difficulty.replace(/<a href="\/spoilers\/wiki\/Forum_Difficulty"><img alt="Difficulty Level /gi, "");
        difficulty = difficulty.split("\"")[0];
        difficulty = parseInt(difficulty);
        tempDifficultyRows.push(Array(difficulty, origRows[i]));
        
        //Reward
        var reward = document.evaluate("table/tbody/tr[" + (i+2) + "]/td[6]", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext().innerHTML;
        reward = reward.replace(/<span class="flezz">/gi, "");
        reward = reward.replace(/<\/span>/gi, "");
        reward = reward.replace(",", "");
        reward = parseInt(reward);
        tempRewardRows.push(Array(reward, origRows[i]));
        
        //Job Points
        var jobPoints = document.evaluate("table/tbody/tr[" + (i+2) + "]/td[7]", jobsDiv, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext().innerHTML;
        jobPoints = parseInt(jobPoints);
        tempJobPointsRows.push(Array(jobPoints, origRows[i]));
        
        //Next job
        i++;
    }
    
    //tempForumRows contains the name of the forums. Sort them by name.
    while(origRows.length > forumRows.length){
        i=0;
        var lowestName = "";
        var lowestNameRow = null;
        while(tempForumRows[i]){
            //Detect the highest name
            if(tempForumRows[i][0] > lowestName){
                lowestName = tempForumRows[i][0];
                lowestNameRow = i;
            }
            i++;
        }
        forumRows.push(tempForumRows[lowestNameRow][1]);
        tempForumRows[lowestNameRow][0] = "";
    }
    
    //descriptionRows now contains all the simple "Pwn Forum!" jobs.
    //tempDescRows contains the other "Pwn Forum in less than XXs" jobs. Sort them by seconds.
    var tempDescOrderedRows = new Array();
    while(tempDescRows.length > tempDescOrderedRows.length){
        i=0;
        var longestTime = 0;
        var longestTimeRow = null;
        while(tempDescRows[i]){
            //Detect the longest time
            if(tempDescRows[i][0] > longestTime){
                longestTime = tempDescRows[i][0];
                longestTimeRow = i;
            }
            i++;
        }
        tempDescOrderedRows.push(tempDescRows[longestTimeRow][1]);
        tempDescRows[longestTimeRow][0] = 0;
    }
    descriptionRows = descriptionRows.concat(tempDescOrderedRows);
    
    //tempDifficultyRows contains the value of difficulty. Sort them by difficulty.
    while(origRows.length > difficultyRows.length){
        i=0;
        var highestDifficulty = 0;
        var highestDifficultyRow = null;
        while(tempDifficultyRows[i]){
            //Detect the highest difficulty
            if(tempDifficultyRows[i][0] > highestDifficulty){
                highestDifficulty = tempDifficultyRows[i][0];
                highestDifficultyRow = i;
            }
            i++;
        }
        difficultyRows.push(tempDifficultyRows[highestDifficultyRow][1]);
        tempDifficultyRows[highestDifficultyRow][0] = 0;
    }
    
    //tempRewardRows contains the value of the rewards. Sort them by Flezz.
    while(origRows.length > rewardRows.length){
        i=0;
        var highestFlezz = 0;
        var highestFlezzRow = null;
        while(tempRewardRows[i]){
            //Detect the highest reward
            if(tempRewardRows[i][0] > highestFlezz){
                highestFlezz = tempRewardRows[i][0];
                highestFlezzRow = i;
            }
            i++;
        }
        rewardRows.push(tempRewardRows[highestFlezzRow][1]);
        tempRewardRows[highestFlezzRow][0] = 0;
    }
    
    //tempJobPointsRows contains the value of the Job Points. Sort them by JB.
    while(origRows.length > jobPointsRows.length){
        i=0;
        var highestJobPoints = 0;
        var highestJobPointsRow = null;
        while(tempJobPointsRows[i]){
            //Detect the highest reward
            if(tempJobPointsRows[i][0] > highestJobPoints){
                highestJobPoints = tempJobPointsRows[i][0];
                highestJobPointsRow = i;
            }
            i++;
        }
        jobPointsRows.push(tempJobPointsRows[highestJobPointsRow][1]);
        tempJobPointsRows[highestJobPointsRow][0] = 0;
    }
}

function getStreakList(){
    new Ajax.Request("/bookmarks/streak", {
        method: "get",
        asynchronous: true,
        evalJSON: false,
        evalJS: false,
        onComplete: function(response) {
            if(response.status == 200){
                //Extract the names of the already streaked forums
                var tempArray = response.responseText.split("\\u003Ctd\\u003E");
                streakedForums = new Array();
                var forumName = "";
                for(i=1; i<tempArray.length; i=i+2){
                    forumName = tempArray[i].replace("\\u003C/td\\u003E\\n", "");
                    //Remove spaces
                    forumName = forumName.replace(/\u[0-9a-f]{4}/g, "").replace(/[^\w]/g, "");
                    streakedForums.push(forumName);
                }
                //If the streak is empty, don't allow to filter, duh!
                if(streakedForums.length == 0){
                    document.getElementById("skcc_filterStreakedForums").innerHTML = "Your streak is currently 0 forums long... So you're not allowed to filter! <a href=''>Reload the page</a>.";
                }
                //Show the link to filter out the already streaked forums
                document.getElementById("skcc_filterStreakedForums").style.visibility = "visible";
            }
        }
    });
}
