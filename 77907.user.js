// ==UserScript==
// @version        1.6
// @name           Do Some Shit
// @author         Emilien Klein, DG-Root
// @namespace      http://emilien.klein.st/gmscripts/
// @description    Forumwarz.com - Warns you when new .moar files are available
// @include        http://www.forumwarz.com/characters/me*
// @include        http://forumwarz.com/characters/me*
// ==/UserScript==

/*
History:
04.11.11 - v1.6 - Removed old method, for some reason .watch function wasn't working.
07.06.10 - v1.5 - Updated to reform function entirely, now does a ton of shit.
03.06.10 - v1.4 - Updated to definitely not extract all files when clicked.
29.05.10 - v1.3 - Updated to adapt to a code change from ForumWarz / Greasemonkey
11.09.09 - v1.2 - Updated to adapt to a code change from ForumWarz
19.02.09 - v1.1 - Updated to adapt to a code change from ForumWarz
06.02.09 - v1.0 - First version uploaded to userscripts.org
*/

window.numShitToDo = 0;
window.numNewDotMoarFiles = 0;
window.numNewFriendRequests = 0;
window.numBrokenItems = 0;
window.numDeliveredItems = 0;
window.arrShitToDo = [];

window.updateHomeTabs = function(){
    //Add a new tab link on the home page (cloning the "Items/.moar files" link)
    //var newA = document.getElementById("_moar_files_tab").cloneNode(false);
    var newA = document.createElement('a');
    newA.id = "shit_tab";
    newA.href = "#";
    newA.innerHTML = "0 Shit";
    var newLi = document.createElement("li");
    newLi.id = "shit_link";
    newLi.appendChild(newA);
    document.getElementById("gutter_home_tab").appendChild(newLi);
    document.getElementById("shit_tab").addEventListener("click", doSomeShit, true);

    //Gather a list of shit to do.
    getSomeShit();
}

window.getSomeShit = function(){
    //Call all gathering functions.
    getNewDotMoarFilesList();
    getNewDeliveriesList();
    getNewFriendRequestList();
    getBrokenItemsList();
}

window.considerSomeShit = function(varShitConsidered){
    //This function updates the counter, called inside each of the get functions
    //because GM_xmlhttprequest branches off and can't be waited on.
    if(!isNaN(varShitConsidered)){
        numShitToDo += varShitConsidered;
    }
    if(numShitToDo < 0){
        numShitToDo = 0;
    }

    //Display that there is shit to do.
    if(numShitToDo > 0){
        document.getElementById("shit_tab").style.color="red";
        document.getElementById("shit_tab").title=numBrokenItems+" broke; "+numNewDotMoarFiles+" .moar; "+numDeliveredItems+" item; "+numNewFriendRequests+" friend";
    }else{
        document.getElementById("shit_tab").style.color="black";
        document.getElementById("shit_tab").title="Number of shits given: zero.";
    }
    document.getElementById("shit_tab").innerHTML = numShitToDo + " Shit" + (numShitToDo>1 ? "s" : "");
}

window.doSomeShit = function(){
    for(i=0;i<arrShitToDo.length;i+=1){
        GM_xmlhttpRequest({
            method:"POST",
            url:arrShitToDo[i]
        });
    }
    considerSomeShit(-numShitToDo);
}

// Collection functions.
window.getNewDotMoarFilesList = function(){
    GM_xmlhttpRequest({
        method:"GET",
        url:"http://www.forumwarz.com/characters/moar",
        onload:function(response){
            if(response.status == 200){
                var tempArray = response.responseText.split("\\u003Ctd\\u003E\\nComplete Files\\n\\u003C/td\\u003E\\n\\u003Ctd\\u003E");
                tempArray = tempArray[1].split("\\u003C/td\\u003E\\n\\u003Ctd\\u003E");
                numNewDotMoarFiles = (+tempArray[0]);
                if(numNewDotMoarFiles > 0){
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "http://www.forumwarz.com/characters/list_complete_files",
                        onload:function(response){
                            if(response.status == 200){
                                var tempArray = response.responseText.split("\\u003Cdiv id='moar_files'\\u003E\\n\\u003Ctable cellspacing=\\\"0\\\" class=\\\"highlighting\\\"\\u003E\\u003Ctr\\u003E\\n\\u003Cth\\u003EFilename\\u003C/th\\u003E\\n\\u003Cth\\u003EControls\\u003C/th\\u003E\\n\\u003C/tr\\u003E\\n");
                                if(tempArray.length>1){
                                    var tempArray = tempArray[1].split("\\n\\u003C/td\\u003E\\n\\u003C/tr\\u003E\\u003C/table\\u003E\\u003C/div\\u003E\\n\\u003Cdiv class='moar_nav'");
                                    var tempArray = tempArray[0].split("\\u003Ctd\\u003E\\n\\u003Cdiv class='full_name'\\u003E");
                                    for(i=1;i<=(tempArray.length-1);i+=1){
                                        tempArray[i] = tempArray[i].split("\\u003Edetails\\u003C/a\\u003E\\n|\\n\\u003Ca")[1];
                                        tempArray[i] = tempArray[i].split(")}, parameters:'authenticity_token=' + encodeURIComponent('");
                                        tempCode = tempArray[i][1].split("')}); return false;\\\"\\u003Eextract\\u003C/a\\u003E")[0];
                                        tempArray[i] = tempArray[i][0].split("', {asynchronous:true, ")[0];
                                        arrShitToDo.push("http://www.forumwarz.com" + tempArray[i].split(" href=\\\"#\\\" onclick=\\\"new Ajax.Request('")[1] + "?authenticity_token=" + encodeURIComponent(tempCode));
                                    }
                                }
                            }
                        }
                    });
                }
                considerSomeShit(numNewDotMoarFiles);
            }
        }
    });
}

window.getNewDeliveriesList = function(){
    GM_xmlhttpRequest({
        method:"GET",
        url:"http://www.forumwarz.com/characters/deliveries",
        onload:function(response){
            if(response.status == 200){
                var tempArray = response.responseText.split("\\u003E\\n\\u003Cdiv class='note' id='note_deliveries'\\u003E\\nLook at what was delivered overnight!\\n\\u003Ca href=\\\"#\\\" onclick=\\\"new Ajax.Request('");
                if(tempArray.length>1){
                    numDeliveredItems = tempArray[1].split("\\u003Cdiv class='delivery' ").length-1;
                    tempArray = tempArray[1].split("', {asynchronous:true, evalScripts:true, parameters:'authenticity_token=' + encodeURIComponent('");
                    arrShitToDo.push("http://www.forumwarz.com" + tempArray[0] + "?authenticity_token=" + encodeURIComponent(tempArray[1].split("')}); return false;")[0]));
                }
                considerSomeShit(numDeliveredItems);
            }
        }
    });
}

window.getNewFriendRequestList = function(){
    GM_xmlhttpRequest({
        method:"GET",
        url:"http://www.forumwarz.com/friends",
        onload:function(response){
            if(response.status == 200){
                var tempArray = response.responseText.split("\\u003EFriend Requests\\u003C/h1\\u003E");
                if(tempArray.length>1){
                    tempArray = tempArray[1].split("new Ajax.Request('/friends/approve/");
                    numNewFriendRequests = tempArray.length-1;
                    for(i=1;i<=(tempArray.length-1);i+=1){
                        arrShitToDo.push("http://www.forumwarz.com/friends/approve/"+tempArray[i].split('\', {asynchronous:true,')[0]+"?authenticity_token="+encodeURIComponent(tempArray[i].split("'authenticity_token=' + encodeURIComponent('")[1].split("')}); };")[0]));
                    }
                }
                considerSomeShit(numNewFriendRequests);
            }
        }
    });
}

window.getBrokenItemsList = function(){
    GM_xmlhttpRequest({
        method:"POST",
        url:"http://www.forumwarz.com/services/bruce",
        onload:function(response){
            if(response.status == 200){
                var tempArray = response.responseText.split("There's nothing I can do for you... unless you want a blowjob!");
                if(tempArray.length==1){
                    tempArray = response.responseText.split(" s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', '");
                    numBrokenItems = .5;
                    // GM_xmlhttprequest() can't read all of a page with a chunked transfer-encoding
                    // so this will just have to do.
                    arrShitToDo.push("http://www.forumwarz.com/services/fix_all"+"?authenticity_token="+encodeURIComponent(tempArray[1].split("'); f.appendChild(s);")[0]));
                }
                considerSomeShit(numBrokenItems);
            }
        }
    });
}

updateHomeTabs();