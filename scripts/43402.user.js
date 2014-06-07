// MAL Anime Recom Tweak!
// version 1.10
// 2011-10-12
// Copyright (c) 2011, Bastvera <bastvera@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MAL Anime Recom Tweak", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Anime Recom Tweak
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/anime/*/*/userrecs
// @include        http://myanimelist.net/anime.php?id=*
// @include        http://myanimelist.net/anime/*
// @exclude        http://myanimelist.net/anime/*/*/reviews
// @exclude        http://myanimelist.net/anime/*/*/stats
// @exclude        http://myanimelist.net/anime/*/*/characters
// @exclude        http://myanimelist.net/anime/*/*/pics
// @exclude        http://myanimelist.net/anime/*/*/moreinfo
// @exclude        http://myanimelist.net/anime/*/*/forum
// @description    This script hides recommendations that you already have on your list
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==

//Anchor search (Recom div)
var	allElements = document.evaluate(
    "//div[@class='borderClass']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
		
var AnchorLink = allElements.snapshotItem(0);

if(AnchorLink!=null){
	
    //Recommendations search edit
    allElements = document.evaluate(
        "//a[@class='Lightbox_AddEdit button_edit']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
		
	//Recommendations search add
    allElementsAdd = document.evaluate(
        "//a[@class='Lightbox_AddEdit button_add']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
	
    //Document URL test
    var docURL = document.URL;
    var docTest = docURL.search('/userrecs');
	
    //Element Placing
    var newElement;
	
    newElement = document.createElement('BR');
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(newElement);
		
    newElement = document.createElement('label');
    newElement.appendChild(document.createTextNode('Recommendations Tweak in Process. Please wait...'));
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";
	
    //Get username
    var allNavs = document.evaluate(
        "//div[@id='menu_left']//ul[@id='nav']//a",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var userName;
    for (var i = 0; i < allNavs.snapshotLength; i++){
        var linkNav = allNavs.snapshotItem(i);
        var userTest=/\/profile\/.*/;
        var getName = userTest.exec(linkNav);
        getName = "" + getName;
        getName = getName.replace(/\/profile\//,"");
        if(getName!='null')
            userName=getName;
    }

    var rssURL = "http://myanimelist.net/rss.php?type=rw&u=" + userName;
	
    //RSS change check
    GM_xmlhttpRequest({
        method: 'GET',
        url: rssURL,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails){
		
            //Cache test
            var cacheCheck = 0;
		
            var lastTime = /<pubDate>.*<\/pubDate>/;
            var modTime = lastTime.exec(responseDetails.responseText);
            var saveTime = GM_getValue('saveTime');
            modTime = "" + modTime;
            if(modTime!=saveTime){					//Cache time check
                GM_setValue('saveTime', modTime);
                newElement.style.display="none"; 				//Please wait off
                newElement = document.createElement('label');
                newElement.appendChild(document.createTextNode('Downloading List. Please wait...'));
                if(docTest!=-1)
                    AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
                else
                    AnchorLink.previousSibling.previousSibling.appendChild(newElement);
                newElement.style.fontWeight="normal";
                newElement.style.fontSize="10px";
            }
            else
                cacheCheck++;

            if(cacheCheck==0){
                //User list
				var animeURL = "http://myanimelist.net/malappinfo.php?u=" + userName + "&status=all";
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: animeURL,
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                    },
                    onload: function(responseDetails){
                        var text = responseDetails.responseText;
	
                        var key = ";";									//Chaching string

                        //Edit Anime links formating
                        var tagcount = 5000;													//Max number of anime entries
                        var plancount = 0;														//Counter "Plan to Watch" entries
                        var ListLinks = [];														//Array for anime entries storing
                        var anireg=/<series_animedb_id>\d{1,}<\/series_animedb_id>/g;		//Anime entries links
                        var anistatus=/<my_status>\d{1}<\/my_status>/g;		//Anime entries status
                        var exactlink=/\d{1,}/;													//Anime exact link

                        for (var i = 0; i < tagcount; i++){
                            var linkGet = anireg.exec(text); 
							if(linkGet==null){
                                tagcount=i;
                                break;
                            } 
							else {			
								var planDetect = anistatus.exec(text);
								if(planDetect=="<my_status>6</my_status>"){
									ListLinks[plancount] = linkGet;
									ListLinks[plancount] = exactlink.exec(ListLinks[plancount]);
									key = key + ListLinks[plancount] + ";";
									ListLinks[plancount] = "http://myanimelist.net/anime/" + ListLinks[plancount] + "/";
									plancount++;
                                }
							}   
						}							
                        GM_setValue('list', key); //Store Cache string
                        recom(ListLinks);
                    }
                });
            }
			
            else{
                var ListLinks = [];								//Anime Links Array
                var key = GM_getValue('list');					//Fetch link from Cache
                var exactlink=/\d{1,}/g;
                var tagcount = 5000;
                for (var i = 0; i < tagcount; i++){
                    var linkGet = exactlink.exec(key);
                    if(linkGet==null){
                        tagcount=i;
                        break;
                    }
                    else{
                        ListLinks[i]=linkGet;
                        ListLinks[i] = "http://myanimelist.net/anime/" + ListLinks[i] + "/";
                    }
                }
			
                recom(ListLinks);
            }
        }
    });
}
	
function recom(ListLinks){
    //More Element Placing
    var checkbox, checkbox2, checkbox3;

    newElement.style.display="none"; 				//Please wait off
	
	//On list
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
	checkbox.style.margin="3px 3px 3px 3px";
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(checkbox);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(checkbox);

    newElement = document.createElement('label');
    newElement.appendChild(document.createTextNode('Hide Recommendations that you have on your list.'));
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";
	
    //"Plan to Watch elements"
    newElement = document.createElement('BR');
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(newElement);
		
    checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.disabled=true;
	checkbox2.style.margin="3px 3px 3px 20px";
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(checkbox2);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(checkbox2);
		
    newElement = document.createElement('label');
    newElement.appendChild(document.createTextNode('Hide "Plan to Watch" entries.'));
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";
	
	//Not on list
    newElement = document.createElement('BR');
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(newElement);
		
    checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
	checkbox3.style.margin="3px 3px 3px 3px";
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(checkbox3);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(checkbox3);
		
    newElement = document.createElement('label');
    newElement.appendChild(document.createTextNode('Hide Recommendations that you do not have on your list.'));
    if(docTest!=-1)
        AnchorLink.previousSibling.previousSibling.previousSibling.appendChild(newElement);
    else
        AnchorLink.previousSibling.previousSibling.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";
		
    //Arrays for storing Divs Elements edit
    var editParent = [];		//Main Rec div
    var editSibling = [];		//Anime Link href for comparing
    var editPlan = [];			//Plan to Watch Rec div
		
    //Store all Divs edit
    for (var i = 0; i < allElements.snapshotLength; i++){
        var EditLink = allElements.snapshotItem(i);
        editParent[i] = EditLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        editSibling[i] = EditLink.previousSibling.previousSibling;
			
        //Store "Plan to Watch" Divs
        var convert = editSibling[i].href;
        for (var tcount in ListLinks){
            var finder = convert.search(ListLinks[tcount]);
            if(finder!=-1){
                editPlan.push(editParent[i]);
                break;
            }
        }
    }
	
	//Arrays for storing Divs Elements add
    var editParentAdd = [];		//Main Rec div
	
	//Store all Divs add
    for (var i = 0; i < allElementsAdd.snapshotLength; i++){
        var EditLinkAdd = allElementsAdd.snapshotItem(i);
        editParentAdd[i] = EditLinkAdd.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    }
    
    //Get or Set status of checkbox
    var checkboxmem = GM_getValue('checkboxmem'); //Get chceckbox status
    var checkboxmem2 = GM_getValue('checkboxmem2'); //Get chceckbox status
	var checkboxmem3 = GM_getValue('checkboxmem3'); //Get chceckbox status
    if(checkboxmem==null || checkboxmem2==null || checkboxmem3==null){
        checkboxmem=false;
        checkboxmem2=false;
		checkboxmem3=false;
        GM_setValue('checkboxmem', checkboxmem);
        GM_setValue('checkboxmem2', checkboxmem2);
		GM_setValue('checkboxmem3', checkboxmem3);
        checkbox.checked=checkboxmem;
        checkbox2.checked=checkboxmem2;
		checkbox3.checked=checkboxmem3;
    }
    else{
        checkbox.checked=checkboxmem;
        checkbox2.checked=checkboxmem2;
		checkbox3.checked=checkboxmem3;
        if(checkbox.checked==true){
            checkbox2.disabled=false;
            for (i in editParent){
                editParent[i].style.display="none";
            }
            if(checkbox2.checked==false){
                for (i in editPlan){
                    editPlan[i].removeAttribute('style');
                }
            }
        }
		if(checkbox3.checked==true){
            for (var i in editParentAdd){
                editParentAdd[i].style.display="none";
            }
        }		
    }
	
	//Not on list
    checkbox3.addEventListener('change',function () {
			
        if(checkbox3.checked==true){
            for (var i in editParentAdd){
                editParentAdd[i].style.display="none";
            }
        }
		
		if(checkbox3.checked==false){
            for (i in editParentAdd){
                editParentAdd[i].removeAttribute('style');
            }
        }
			
        GM_setValue('checkboxmem3', checkbox3.checked);	
    },false)
		
    //"Plan to Watch" Listener
    checkbox2.addEventListener('change',function () {
			
        if(checkbox2.checked==true){
            for (i in editPlan){
                editPlan[i].style.display="none";
            }
        }
			
        if(checkbox2.checked==false){
            for (i in editPlan){
                editPlan[i].removeAttribute('style');
            }
        }
			
        GM_setValue('checkboxmem', checkbox.checked);
        GM_setValue('checkboxmem2', checkbox2.checked);			
    },false)
		
    //Default Listener
    checkbox.addEventListener('change',function () {
		
        if(checkbox.checked==true){
            checkbox2.disabled=false;
            for (var i in editParent){
                editParent[i].style.display="none";
            }
            for (i in editPlan){
                editPlan[i].removeAttribute('style');
            }
        }
		
        if(checkbox.checked==false){
            checkbox2.disabled=true;
            checkbox2.checked=false;
            for (i in editParent){
                editParent[i].removeAttribute('style');
            }
        }
		
        GM_setValue('checkboxmem', checkbox.checked);
        GM_setValue('checkboxmem2', checkbox2.checked);
    },false)
}