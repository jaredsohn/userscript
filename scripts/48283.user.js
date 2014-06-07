// ==UserScript==
// @version        1.1
// @name           New .Moar Files Alert for ForumWarz
// @author         Emilien Klein
// @namespace      http://emilien.klein.st/gmscripts/
// @description    Forumwarz.com - Tells you when new .moar files are available
// @include        http://www.forumwarz.com/characters/me
// @include        http://forumwarz.com/characters/me
// ==/UserScript==

// Note more information available at http://userscripts.org/users/83206 along with other script downloads

/*

History:

19/02/2009 - v1.1 - Updated to adapt to a code change from ForumWarz
06/02/2009 - v1.0 - First version uploaded to userscripts.org

*/

//unsafeWindow.console.log("XX");

var numNewDotMoarFiles = 0;

updateHomeTabs();

function updateHomeTabs(){
    //Add a new tab link on the home page (cloning the "Items/.moar files" link)
    var newA = document.getElementById("_moar_files_tab").cloneNode(false);
    newA.id = "ndmf_moar_files_tab";
    newA.innerHTML = "No new .moar files";
    var newLi = document.createElement("li");
    newLi.id = "ndmf_new_moar_link";
    newLi.appendChild(newA);
    document.getElementById("gutter_home_tab").appendChild(newLi);
    
    //Watch for when we come back to the home tab...
    unsafeWindow.document.getElementById('home_tab').watch('className', elmChangedStatus);
    
    //Check if there are new .moar files waiting
    getNewDotMoarFilesList();
}

function getNewDotMoarFilesList(){
    GM_xmlhttpRequest({
        method:"GET",
        url:"http://www.forumwarz.com/characters/moar",
        onload:function(response) {
            if(response.status == 200){
                var tempArray = response.responseText.split("\\n\\u003C/tr\\u003E\\n\\u003Ctr\\u003E\\n ");
                var tempArray2 = null;
                var tempArray3 = null;
                for(i=1; i<tempArray.length; i++){
                    tempArray2 = tempArray[i].split("\\u003C/td\\u003E");
                    tempArray3 = tempArray2[tempArray2.length-2].split("\\u003E");
                    //if this array has more than 2 elements, it means that it is a file to extract!
                    if(tempArray3.length > 2){
                        numNewDotMoarFiles++;
                    }
                }
                /*
                //To perform tests, set the number of new .moar files to be the current seconds
                var tmp = new Date();
                numNewDotMoarFiles = tmp.getSeconds();//*/
                if(numNewDotMoarFiles > 0){
                    document.getElementById("ndmf_moar_files_tab").style.color="red";
                    document.getElementById("ndmf_moar_files_tab").innerHTML = numNewDotMoarFiles + " new .moar file" + (numNewDotMoarFiles>1 ? "s" : "") + "!";
                }
            }
        }
    });
}

function elmChangedStatus(prop, oldval, newval){
    //We're coming back on the home tab
    if(prop == "className" && newval == "current" && numNewDotMoarFiles > 0){
        //Only if there were new moar files
        //Hide the link as the information may be outdated.
        //It is not possible to call directly getNewDotMoarFilesList()
        //(Greasemonkey access violation: unsafeWindow cannot call GM_xmlhttpRequest.)
        document.getElementById("ndmf_new_moar_link").style.display = "none";
    }
    return newval;
}
