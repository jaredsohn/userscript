// MAL Anime Edit Tweaks!
// version 1.2
// 2009-04-05
// Copyright (c) 2009, Bastvera <bastvera@gmail.com>
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
// select "MAL Anime Edit Tweaks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Anime Edit Tweaks
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/editlist.php?*
// @description    This script adds new functions to Anime Edit page
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==

//Fansub textbox search
var allElements;
allElements = document.evaluate(
    "//input[@name='fansub_group']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var FanGroupTextBox;
for (var i = 0; i < allElements.snapshotLength; i++){
    FanGroupTextBox = allElements.snapshotItem(i);
}

//Tags textbox search
var TagsTextBox = document.getElementById("tagtext");
	
//Anime link search	
allElements = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var allLink, AnimeLink;
for (i = 0; i < allElements.snapshotLength; i++){
    allLink = allElements.snapshotItem(i);
    var convert = allLink.href;
    var finder = convert.search('http://myanimelist.net/anime.php\\?id=');
    if(finder!=-1)
        AnimeLink = convert;
}

//Element placing
var newElement, newCombo, checkbox1, checkbox2, checkbox3, TagCombo;

//Tags ComboBox
newElement = document.createElement('BR');
TagsTextBox.parentNode.insertBefore(newElement, TagsTextBox.nextSibling);
	
TagCombo = document.createElement('SELECT');
TagsTextBox.parentNode.insertBefore(TagCombo, TagsTextBox.nextSibling);
	
newElement = document.createElement('BR');
TagsTextBox.parentNode.insertBefore(newElement, TagsTextBox.nextSibling);
	
TagCombo.style.width = '265px';

var position = document.createElement('option');
position.text = "No tags found...";
TagCombo.add(position, null);

//Language checkbox
newElement = document.createElement('label');
newElement.setAttribute('for','firstName');
newElement.appendChild(document.createTextNode('Language'));
FanGroupTextBox.parentNode.insertBefore(newElement, FanGroupTextBox.nextSibling);
	
checkbox3 = document.createElement('input');
checkbox3.type = 'checkbox';
checkbox3.disabled=true;
FanGroupTextBox.parentNode.insertBefore(checkbox3, FanGroupTextBox.nextSibling);

//Short name checkbox
newElement = document.createElement('label');
newElement.setAttribute('for','firstName');
newElement.appendChild(document.createTextNode('Short Name'));
FanGroupTextBox.parentNode.insertBefore(newElement, FanGroupTextBox.nextSibling);
	
checkbox2 = document.createElement('input');
checkbox2.type = 'checkbox';
checkbox2.disabled=true;
FanGroupTextBox.parentNode.insertBefore(checkbox2, FanGroupTextBox.nextSibling);

//Full name checkbox
newElement = document.createElement('label');
newElement.setAttribute('for','firstName');
newElement.appendChild(document.createTextNode('Full Name'));
FanGroupTextBox.parentNode.insertBefore(newElement, FanGroupTextBox.nextSibling);
	
checkbox1 = document.createElement('input');
checkbox1.type = 'checkbox';
checkbox1.disabled=true;
FanGroupTextBox.parentNode.insertBefore(checkbox1, FanGroupTextBox.nextSibling);

//Funsub ComboBox
newElement = document.createElement('BR');
FanGroupTextBox.parentNode.insertBefore(newElement, FanGroupTextBox.nextSibling);
	
newCombo = document.createElement('SELECT');
FanGroupTextBox.parentNode.insertBefore(newCombo, FanGroupTextBox.nextSibling);
	
newElement = document.createElement('BR');
FanGroupTextBox.parentNode.insertBefore(newElement, FanGroupTextBox.nextSibling);
	
newCombo.style.width = '273px';
	
position = document.createElement('option');
position.text = "Fansubbing Groups are empty...";
newCombo.add(position, null);

//Anime data
GM_xmlhttpRequest({
    method: 'GET',
    url: AnimeLink,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails){
	
        var text = responseDetails.responseText;
		
        //Tags Process
        var tagcount = 25;													//Max number of tags entries
        var tags = [];														//Array for tags storing
        var tagreg=/anime\.php\?tag=\S*/g;									//Tag entries
        for (var i = 0; i < tagcount; i++){
            var linkGet = tagreg.exec(text);
            if(linkGet==null){
                tagcount=i;
                break;
            }
            else{
                linkGet = "" + linkGet;										//Str convert;
                linkGet = linkGet.replace(/anime\.php\?tag=|"/g, "");		//Exact tag
                tags[i] = linkGet;
                if(i==0){													//Empty list detector
                    TagCombo.remove(0);
                    var position = document.createElement('option');
                    position.text = "Choose one tag...";
                    TagCombo.add(position, null);
                }
                position=document.createElement('option');					//Tags populate
                position.text=tags[i];
                TagCombo.add(position,null);
            }
        }
			
        //Tag Adding Listener
        TagCombo.addEventListener('change',function () {
	
            if(TagCombo.selectedIndex!=0){
                var selected = TagCombo.selectedIndex;
			
                var str = "";
			
                str = tags[selected-1];
									
                if(TagsTextBox.value=="" || TagsTextBox.value.charAt(0)=="0")
                    TagsTextBox.value = str;
                else
                    TagsTextBox.value = TagsTextBox.value + ", " + str;
            }
        },false)
	
        var counter = 50;												//Max number of groups to process
        var table = [];													//Array for storing Full Lenght Groups name
        var tab = [];													//2D Array for storing segments from table
        var funreg=/fansub-groups.php\?id=\d{1,}.*\n/g;					//Funsub  entries
        for (i = 0; i < counter; i++){
            linkGet = funreg.exec(text);
            if(linkGet==null){
                counter=i;
                break;
            }
            else{
                linkGet = "" + linkGet;
                linkGet = linkGet.replace(/fansub-groups.php\?id=\d{1,}">|<a href.*/g, "");	//Left/Right cut
                linkGet = linkGet.replace(/<small>|<\/small>|<\/a>/gi, "$%"); 				//Tags replacer
                linkGet = linkGet.replace(/\[\]|\(\)/gi, ""); 								//Empty Brackets
                for (var j = 0; j < 5; j++)													//Multiple space & tabs remover
                    linkGet = linkGet.replace(/\t|  /gi, " ");
					
                if(i==0){																	//Empty list detector
                    newCombo.remove(0);
                    position = document.createElement('option');
                    position.text = "Choose one group...";
                    newCombo.add(position, null);
					checkbox1.disabled=false;
					checkbox2.disabled=false;
					checkbox3.disabled=false;
                }
				
                table[i] = linkGet;
				
                position=document.createElement('option');									//Funsub populate
                var BoxName = table[i].replace(/\$%/gi, "");								//Custom Tags remover
                position.text = BoxName;
                newCombo.add(position,null);
				
                tab[i] = new Array(3);														//2nd Dimension for storing segments
                var cursor;
				
                //1st segment
                cursor = table[i].indexOf("$%");
                tab[i][0] = table[i].slice(0,cursor);
							
                //2nd segment
                table[i] = table[i].substr(cursor+2);
                cursor = table[i].indexOf("$%");
                table[i] = table[i].substr(cursor+2);
                cursor = table[i].indexOf("$%");
                tab[i][1] = table[i].slice(0,cursor);
			
                //3rd segment
                table[i] = table[i].substr(cursor+2);
                cursor = table[i].indexOf("$%");
                table[i] = table[i].substr(cursor+2);
                cursor = table[i].indexOf("$%");
                tab[i][2] = table[i].slice(0,cursor);
            }
        }

        //Get or Set status of checkbox
        var checkboxmem1 = GM_getValue('checkboxmem1'); //Get chceckbox status
        var checkboxmem2 = GM_getValue('checkboxmem2'); //Get chceckbox status
        var checkboxmem3 = GM_getValue('checkboxmem3'); //Get chceckbox status
        if(checkboxmem1==null || checkboxmem2==null || checkboxmem3==null){
            checkboxmem1=false;
            checkboxmem2=true;
            checkboxmem3=false;
            GM_setValue('checkboxmem1', checkboxmem1);
            GM_setValue('checkboxmem2', checkboxmem2);
            GM_setValue('checkboxmem3', checkboxmem3);
            checkbox1.checked=checkboxmem1;
            checkbox2.checked=checkboxmem2;
            checkbox3.checked=checkboxmem3;
        }
        else{
            checkbox1.checked=checkboxmem1;
            checkbox2.checked=checkboxmem2;
            checkbox3.checked=checkboxmem3;
        }
				
        //Fansub Adding Listener
        newCombo.addEventListener('change',function () {
	
            if(newCombo.selectedIndex!=0){
                var selected = newCombo.selectedIndex;
			
                var first = "", second = "", third = "", str = "";
			
                if(checkbox1.checked==true && tab[selected-1][0]!="")
                    first = tab[selected-1][0];
			
                if(checkbox2.checked==true && tab[selected-1][1]!="")
                    second = " " + tab[selected-1][1];
			
                if(checkbox3.checked==true && tab[selected-1][2]!="")
                    third = " " + tab[selected-1][2];
			
                str = first + second + third;
						
                if(str.charAt(0)==" ")
                    str = str.substr(1);
				
                if(FanGroupTextBox.value=="" || FanGroupTextBox.value.charAt(0)=="0")
                    FanGroupTextBox.value = str;
                else if(str!="")
                    FanGroupTextBox.value = FanGroupTextBox.value + ", " + str;
            }
        },false)
		
        checkbox2.addEventListener('change',function () {
		
            if(checkbox2.checked==false && checkbox1.checked==false){
                checkbox1.checked=true;
            }
			GM_setValue('checkboxmem1', checkbox1.checked);
            GM_setValue('checkboxmem2', checkbox2.checked);
            GM_setValue('checkboxmem3', checkbox3.checked);
        },false)
		
        checkbox1.addEventListener('change',function () {
		
            if(checkbox2.checked==false && checkbox1.checked==false){
                checkbox2.checked=true;
            }
			GM_setValue('checkboxmem1', checkbox1.checked);
            GM_setValue('checkboxmem2', checkbox2.checked);
            GM_setValue('checkboxmem3', checkbox3.checked);
        },false)
		
		 checkbox3.addEventListener('change',function () {
		
   			GM_setValue('checkboxmem1', checkbox1.checked);
            GM_setValue('checkboxmem2', checkbox2.checked);
            GM_setValue('checkboxmem3', checkbox3.checked);
        },false)
    }
});