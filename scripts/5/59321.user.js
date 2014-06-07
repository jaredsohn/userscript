/*      _____ _____ _____ _____ _   _ _____        _____ _____     
       |  _  |  _  |  _  |  ___| | | |  ___|      |  ___|  _  |                       
       | |_| | |_| | |_| | |   | |_| | |___   __  | |_  | |_| |   v0.3.0                      
       |  _  |  ___|  _  | |   |  _  |  ___| |__| |  _| |  _ |  Build: 738                    
       | | | | |   | | | | |___| | | | |___       | |   | |_| |   (Alpha)                 
       |_| |_|_|   |_| |_|_____|_| |_|_____|      |_|   |_____|
----------------------------------------------------------------------------       
            A Facebook Customisation Mod By: -={Apache}=-
---------------------------------------------------------------------------- 
 * Adds a "Pokes" menu in the menubar which update every 30 seconds.
   New pokes are displayed in alphabetical order and the poke count is 
   shown like the Inbox notification on the menu itself.

 * AJAX poking means you can pokeback in one click. (I'm a firm believer
   that "auto-refresh" poking destroys any point in a poke war, you've 
   got to put some effort into it at least!)
 
 * Hides the un-needed "Profile" and "Home" buttons from the menu bar.
 
 * Hides the "Sponsored" panel from the News Feed.
 
 * Hides all ads panels from Facebook.
----------------------------------------------------------------------------  
                              Copyright:   
----------------------------------------------------------------------------  
 Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
 You are free to use this code in part or in whole alongside your own.
 The author only asks that you give credit to them if you use this script,
 in whole or in part and that you add Copyleft protection to your own
 work. Proprietary use of this script is forbidden unless with the
 authors written consent and an agreed legal contract between both parties
 is signed pertaining to royalties. Please respect the wishes of the author
 and the traditions of the General Public License. 
----------------------------------------------------------------------------  
               Dedications, Thanks and Honourable Mentions:     
---------------------------------------------------------------------------- 
 Michael Soh, Lukas Fragodt, diveintogreasemonkey.org, sizzlemctwizzle,
 Jason Chu, mozdev.org, elated.com, Wizputer
----------------------------------------------------------------------------
                               DISCLAIMER:  
----------------------------------------------------------------------------   
 This script is still heavily under construction and has only just reached
 Beta Phase testing. This script has been shown to occasionally cause large
 memory leakage problems in Firefox, many of which have now been plugged 
 with a complete re-write in v0.3.0. Please use this script with caution, 
 if you find a flaw in it, please tell me. This work is experimental and 
 any advice more experienced coders can give me will be very helpful.
 This script is my first ever attempt at Javascript.
----------------------------------------------------------------------------  
                               Known Bugs:     
---------------------------------------------------------------------------- 
 There are a few known bugs in the script that will need ironing out.
 However while it is still under development, this is only to be expected.
 If you find any bugs not listed here, please send me a message at
 www.userscripts.com/ApacheLQ and I'll see what I can do about it. If you
 make any hotfixes to the script, please let me know so I can update the
 original.
 
 * [08/10/09] I have tried to keep overheads to a minimum during coding this
 script however it still runs slower than I would like it to.  There are
 still some performance issues, but it's now stable enough for an open Beta
 release.
---------------------------------------------------------------------------- 
                               Version History
----------------------------------------------------------------------------
 * [08/10/09] v0.3.0(Beta) Released: Stable. 
---------------------------------------------------------------------------- 
                           UserScript Compulsaries
----------------------------------------------------------------------------
// ==UserScript==                                      
// @name          -={Apache}=- Facebook Custom Mod v0.3.0
// @version       0.3.0.738      
// @namespace     ApacheLQ                               
// @description   Custom layout and content for Facebook. By: -={Apache}=-
// @include       *.facebook.com*       
// @exclude       *.facebook.com*login.php*                   
// @contributor   -={Apache}=-                           
// ==/UserScript== 
----------------------------------------------------------------------------*/  

/*---------------*\
|Utility Functions|
\*---------------*/
document.getElementsByAttribute=function(elementAttribute,value,rootNode){if(rootNode==undefined){rootNode=document.getElementsByTagName('body')[0];}else rootNode = document.getElementById(rootNode);var allElements=rootElement.getElementsByTagName("*");var matches=[];for(i=0;i<allElements.length;i++){var currentElement=allElements[i];if(currentElement.getAttribute(elementAttribute)==value){matches.push(currentElement);}}if (matches.length>=1){return matches;}else return;}
document.getElementsByClassName=function(elementClassName,rootNode){if(rootNode==undefined){rootNode=document.getElementsByTagName('body')[0];}var allElements=rootNode.getElementsByTagName("*");var matches=[];for (i=0;i<allElements.length;i++){var currentElement=allElements[i];if(currentElement.getAttribute('class')==elementClassName){matches.push(currentElement);}}if (matches.length>=1){return matches;}else return;}
document.getElementsById=function(elementId,rootNode){if(rootNode==undefined){rootNode=document.getElementsByTagName('body')[0];}var allElements=rootNode.getElementsByTagName("*");var matches=[];for (i=0;i<allElements.length;i++){var currentElement = allElements[i];if(currentElement.getAttribute('id')==elementId){matches.push(currentElement);}}if(matches.length>=1){return matches;}else return;}
function displayToggle(element,value){if(!document.getElementById(element)){return;}if(value!='block'&&value!='inline'&&value!='none'){return;}if(document.getElementById(element).style.display!=value){ document.getElementById(element).style.display=value; }}
function injectHTML(elementId,htmlString){try{elementId.innerHTML=htmlString}catch(x){elementId.innerText=htmlString;}}

/*------*\
|ApacheFB|
\*------*/
function AjaxPokesRequest(){ if(self!=top){return;}
    GM_xmlhttpRequest({
        method:'GET',
        url:'http://www.facebook.com/home.php',
        headers:{ 'User-Agent':window.navigator.userAgent, 'Accept':'text/html' },
        onload: function(responseDetails) { 
            if (responseDetails.status == 200) {
            
                //--Create Div to parse responseText as HTML--//
                var responseHTML = document.createElement('div');
                    responseHTML.setAttribute('id','responseHTML');
                    injectHTML(responseHTML, responseDetails.responseText);
                    document.getElementsByTagName('body')[0].appendChild(responseHTML);    
                    displayToggle('responseHTML', 'none');
                    
                //--Set Values--//
                GM_setValue('post_form_id', document.getElementById('post_form_id').value);
                if (document.getElementsByClassName('ind_poke', document.getElementById('responseHTML'))) {
                    GM_setValue('pokesDivs', document.getElementsByClassName('ind_poke', document.getElementById('responseHTML'))[0].parentNode.innerHTML);
                    GM_setValue('pokesCount', document.getElementsByClassName('ind_poke', document.getElementById('responseHTML')).length);
                } else { 
                    GM_setValue('pokesDivs', "No Pokes!");
                    GM_setValue('pokesCount', "0");
                }
                //--Remove responseHTML Div as to not clutter page--//
                document.getElementsByTagName('body')[0].removeChild(document.getElementById('responseHTML'));
                
                //--Refresh the page--//
                refreshPage();
            }    
        },
        onerror: function(responseDetails) {
            GM_log('Error retrieving poke information.');
            alert('Failed to update poke information.');
            return;
        }
    });
}

function refreshPage() { if(self!=top){return;}
 
    //--Load Settings--//
    try {
        var pokesCount = GM_getValue('pokesCount');
        var pokesDivs = GM_getValue('pokesDivs');
        var post_form_id = GM_getValue('post_form_id');
    } catch(x) {
        alert('Failed to load settings, exiting script.\n\nFailure: '+x);
        GM_log('Failed to load settings, exiting script. Failure:'+x);
        return;
    }
    
    //--If there are any pokes, display them--//
    if (pokesCount>0) {
        
        /*--Inject an invisible Div onto the page 
            to parse the pokes as HTML so we can
            crawl the DOM Tree.--*/
        if (!document.getElementById('pokesDiv')) {
            var pokesDiv = document.createElement('div');
                pokesDiv.setAttribute('id', 'pokesDiv');
                pokesDiv.style.display = 'none';
                document.body.appendChild(pokesDiv);
        }
        injectHTML(pokesDiv, pokesDivs);
        
        //--Strip information from pokesDiv into a sorted Array--//
        function pokeDetails(name, profileLink, uid, tagID) {
            this.name = name;
            this.profileLink = profileLink;
            this.uid = uid;
            this.tagID = tagID;
        }
        var pokedBy = [];
        for (i=0; i<pokesCount; i++) {
            pokedBy.push(new pokeDetails(
                pokesDiv.childNodes[i].childNodes[0].innerHTML,                                       //--Name
                pokesDiv.childNodes[i].childNodes[0].getAttribute('href'),                            //--Profile Link
                pokesDiv.childNodes[i].childNodes[2].getAttribute('href').match(/id=([0-9]*)/)[1] ,   //--UID
                pokesDiv.childNodes[i].childNodes[2].getAttribute('id')                               //--Poke Tag ID
            ));
        }
        pokedBy.sort(function(a, b) {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0;
        });
        
        //--Create new menubar menu elements--//
        var fb_menu_pokes = document.createElement('li'); 
            fb_menu_pokes.setAttribute('id', 'fb_menu_pokes'); 
            fb_menu_pokes.setAttribute('class', 'fb_menu'); 
        var fb_menu_pokes_title = document.createElement('a'); 
            fb_menu_pokes_title.setAttribute('id', 'fb_menu_pokes_title'); 
            fb_menu_pokes_title.setAttribute('class', 'fb_menu_link'); 
            fb_menu_pokes_title.setAttribute('href', '#'); 
            fb_menu_pokes_title.setAttribute('accesskey', '5'); 
            fb_menu_pokes_title.innerHTML = 'Pokes <span class="fb_menu_count_holder" id="poke_menu_count_holder"><span class="in_start" id="poke_menu_count">'+pokesCount+'</span><span class="in_end"> </span></span>';
        var fb_menu_pokes_dropdown = document.createElement('div');
            fb_menu_pokes_dropdown.setAttribute('id', 'fb_menu_pokes_dropdown');
            fb_menu_pokes_dropdown.setAttribute('class', 'fb_menu_dropdown clearfix'); 
      
        //--Build menubar dropdown menu containing the poke(s)--//
        for (i=0; i<pokesCount; i++) {
            var ind_poke_menu = document.createElement('div');
                ind_poke_menu.setAttribute('id', 'ind_poke');
                ind_poke_menu.setAttribute('class', 'fb_menu_item');
                ind_poke_menu.innerHTML='<span class="fb_menu_item_link"><a href="'+pokedBy[i].profileLink+'">'+pokedBy[i].name+'</a> (<a id="'+pokedBy[i].tagID+'" href="'+window.location.href+'">Poke</a>)</span>';
                fb_menu_pokes_dropdown.appendChild(ind_poke_menu);
        }

        //--Build and inject new menu if it doesn't exist already, if it does, update it--//
        fb_menu_pokes.appendChild(fb_menu_pokes_title);
        fb_menu_pokes.appendChild(fb_menu_pokes_dropdown);     
        if (!document.getElementById('fb_menu_pokes')) { 
            document.getElementById('fb_menubar_core').appendChild(fb_menu_pokes); 
        }
        if (document.getElementById('fb_menu_pokes')) { 
            document.getElementById('fb_menubar_core').replaceChild(fb_menu_pokes, document.getElementById('fb_menu_pokes'));
        }
        
        //--Add Click Events for poke buttons now they've been injected into the page--//
        //--NB: This is more for streamlining. adding the listeners before now caused errors.
        for (i=0; i<pokesCount; i++) { 
            var currentNode = pokedBy[i]
            var pokeId = pokedBy[i].uid;
            var pokeNode = document.getElementById(pokedBy[i].tagID);
            if (document.getElementById(currentNode.tagID)) {
                document.getElementById(currentNode.tagID).addEventListener("click", function() {
                    GM_xmlhttpRequest({
                        method: 'POST', 
                        url: 'http://www.facebook.com/ajax/poke.php', 
                        headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
                        data:'uid=' + pokeId + '&pokeback=1&post_form_id=' + post_form_id,
                        onerror: function (responseDetails) {
                            alert("Poke Failed - Response Status "+responseDetails.status+"\n\nResponse: "+responseDetails.responseText);
                        }
                    });
                    setTimeout(AjaxPokesRequest, 2000);
                }, false);
             } 
        }
    }
        else
    //--If there's no pokes, hide the menubar.
    if (document.getElementById('fb_menu_pokes')) {
        document.getElementById('fb_menu_pokes').style.display = 'none';
    }
    
    //--Hide Sponsored Panel from News Feed--//
    if (document.getElementById('home_sponsor_nile')) { 
        document.getElementById('home_sponsor_nile').parentNode.parentNode.style.display = 'none';
    }
        
    //--Hide Ads Panels from Profile--//  TODO: [0.3.1] Add sizzlemctwizzle's css ads remover in place of this.
    if (document.getElementById('sidebar_ads')) {
        document.getElementById('sidebar_ads').innerHTML='';
    }
    
    //--Hide "Home" and "Profile" from top menu bar--//
    if (document.getElementById('fb_menu_home')) { 
        document.getElementById('fb_menu_home').style.display = 'none'; 
    }
    if (document.getElementById('fb_menu_profile')) { 
        document.getElementById('fb_menu_profile').style.display = 'none';
    }
    
    //--Hide Pokes tab if it is showing--//
    if (document.getElementsByClassName('ind_poke')) {
        document.getElementsByClassName('ind_poke')[0].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none'; 
    } 
    
//--Recurse script every 30 seconds--//
setTimeout(AjaxPokesRequest, 30000);
}

//--Runs the script--//
window.addEventListener('load', AjaxPokesRequest,false);