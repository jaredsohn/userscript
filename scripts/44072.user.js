// MAL Voice Actor Filter!
// version 1.2
// 2010-06-14
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
// select "MAL Voice Actor Filter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Voice Actor Filter
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/people/*
// @include        http://myanimelist.net/people.php?id=*
// @description    This script filters voice actor: "Voice Acting Roles" by your anime list entries
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==
 
//All edit buttons in "Voice Acting Roles"
var allEdits = document.evaluate(
    "//td[@style='padding-left: 5px;']//table[1]//a[@class='Lightbox_AddEdit button_edit']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

//Correct Table check
var antyStaff = allEdits.snapshotItem(0);
antyStaff = antyStaff.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling;
var convert=antyStaff.innerHTML;
var finder = convert.search("Voice Acting Roles");
	
if(finder!=-1){
	
    //Elements placing
    var checkboxAnchor = allEdits.snapshotItem(0);
    checkboxAnchor = checkboxAnchor.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling;
		
    var newElement = document.createElement('BR');
    checkboxAnchor.appendChild(newElement);
	
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.defaultChecked = false;
    checkboxAnchor.appendChild(checkbox);

    newElement = document.createElement('label');
    newElement.setAttribute('for','firstName');
    newElement.appendChild(document.createTextNode('Filter entries by your Anime List.'));
    checkboxAnchor.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";
	
    //Arrays for storing elements
    var editdiv = [];	//Edit button Div
    var moe = [];		//Char Name
    var role = [];		//Main/Support Div
	
    //Edit Entries Segments
    for (var i = 0; i < allEdits.snapshotLength; i++){
        var AnchorLink = allEdits.snapshotItem(i);
        editdiv[i] = AnchorLink.parentNode;									//Edit button Div
        role[i] = editdiv[i].parentNode.nextSibling.nextSibling.lastChild;	//Main/Support Div
        moe[i] = editdiv[i].parentNode.nextSibling.nextSibling.firstChild;	//Char Name
    }
	
    //All add buttons in "Voice Acting Roles"
    var	allElements = document.evaluate(
        "//td[@style='padding-left: 5px;']//table[1]//a[@class='Lightbox_AddEdit button_add']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    //Array with add buttons div
    var addbutton = [];
    for (i = 0; i < allElements.snapshotLength; i++){
        AnchorLink = allElements.snapshotItem(i);
        addbutton[i] = AnchorLink.parentNode.parentNode.parentNode;		//Main Div with Add button
    }

    //Div backup
    var backup = [];
    var orginal = [];
    var backpos = 0;
	
    //Get or Set status of checkbox
    var checkboxmem = GM_getValue('checkboxmem'); //Get chceckbox status
    if(checkboxmem==null){
        checkboxmem=false;
        GM_setValue('checkboxmem', checkboxmem);
        checkbox.checked=checkboxmem;
    }
    else{
        checkbox.checked=checkboxmem;
        if(checkbox.checked==true)
            HideDivs();
    }
		
    //Listener
    checkbox.addEventListener('change',function () {
			
        if(checkbox.checked==true){
            HideDivs();
        }

        if(checkbox.checked==false){
            RestoreDivs();
        }
		
		GM_setValue('checkboxmem', checkbox.checked);
		
    },false)
}

function HideDivs(){
    //Hide all div with add
    for (var current in addbutton){
        addbutton[current].style.display="none";
    }
			
    for(current in moe){
                     
        var curpos = current;
        curpos++;
	
        if(editdiv[current].parentNode.parentNode.getAttribute('style')!="display: none;"){ //Modify root entries only
					
            //Div backup storage
            backup[backpos] = editdiv[current].parentNode.parentNode.cloneNode(true);
            orginal[backpos] = editdiv[current].parentNode.parentNode;
            backpos++;
					
            //Root /Main/Support text add
            var temp = role[current].innerHTML;										//Main/Support text
            temp = temp.replace(/&nbsp;/,"");										//Main/Support clear
            var line = document.createTextNode('\n'+ temp);
            editdiv[current].parentNode.appendChild(line);
					
            //Root hide elements
            role[current].style.display="none";										//Hide Main/Support Div
            editdiv[current].style.display="none";									//Hide edit and airing Div
					
            for( curpos ; curpos < allEdits.snapshotLength; curpos++){
                if(moe[curpos].href==moe[current].href){ //Compare entries by moe name ^_^
		 
                    var br = document.createElement('br');
							
                    //Add Similar anime name
                    editdiv[current].parentNode.appendChild(br);
                    var newNode=editdiv[curpos].parentNode.firstChild.cloneNode(true);
                    editdiv[current].parentNode.appendChild(newNode);
							
                    //Similar /Main/Support text add
                    temp = role[curpos].innerHTML;
                    temp = temp.replace(/&nbsp;/,"");
                    line = document.createTextNode('\n'+temp);
                    editdiv[current].parentNode.appendChild(line);
							
                    //Hide Similar Div
                    editdiv[curpos].parentNode.parentNode.style.display="none";
                }
            }
        }
    }
}
			
function RestoreDivs(){
			
    //Restore Modified Divs
    for(var current in  backup){
        orginal[current].parentNode.replaceChild(backup[current],orginal[current]);
    }
			
    //Unhide Similar
    for(current in  editdiv){
        editdiv[current].parentNode.parentNode.removeAttribute('style');
    }
			
    //Unhide add entries
    for(current in addbutton){
        addbutton[current].removeAttribute('style');
    }
			
    //Rescan all edit entries
    allEdits = document.evaluate(
        "//td[@style='padding-left: 5px;']//table[1]//a[@class='Lightbox_AddEdit button_edit']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
			
    for (var i = 0; i < allEdits.snapshotLength; i++){
        AnchorLink = allEdits.snapshotItem(i);
        editdiv[i] = AnchorLink.parentNode;									//Edit button Div
        role[i] = editdiv[i].parentNode.nextSibling.nextSibling.lastChild;	//Main/Support Div
        moe[i] = editdiv[i].parentNode.nextSibling.nextSibling.firstChild;	//Char Name
    }
			
    //Reset backups
    backup = [];
    orginal = [];
    backpos = 0;
}