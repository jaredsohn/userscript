// ==UserScript==
// @name        facebook feed filter
// @namespace   surkasu
// @description highlights or removes post that contain selected words
// @include     http://www.facebook.com/
// @include     http://www.facebook.com/?ref=logo
// @include		http://www.facebook.com/home.php
// @version     1
// @run-at document-end
// ==/UserScript==

/*
TO EDIT WORD LIST WITHOUT ABOUT:CONFIG:

change the word list down in the functions remove and highlight
this code is heavly commented, follow the comments "//"

*/

defaultlist = ['put_a_word_here','another','word','etc'];

if(!GM_getValue("high_list"))
{
	GM_setValue("high_list",JSON.stringify(defaultlist));
	alert("Highlight word list is empty.\nTo change go to about:config in your firefox browser\nSearch for facebook feed filter and edit the list\nKeep words inside qoutations and seperate with a comma inside brackets");
}

if(!GM_getValue("del_list"))
{
	GM_setValue("del_list",JSON.stringify(defaultlist));
	alert("deleted word list is empty.\nTo change go to about:config in your firefox browser\nSearch for facebook feed filter and edit the list\nKeep words inside qoutations and seperate with a comma inside brackets");
}


if(!GM_getValue("high_color"))
{
	GM_setValue("high_color",'#ff0000');
	alert("Highlight color set to red.\nTo change go to about:config in your firefox browser\nSearch for facebook feed filter and edit the entry for the desired HEX code color\n#ff0000 = red\n#00ff00 = blue\n#0000ff = grean");
	}

//node declaration:
var high_node = document.createElement ('div');
var remove_node = document.createElement ('div');
high_node.innerHTML = '<button id="high_button" type="button">Filter - Highlight</button>';
remove_node.innerHTML = '<button id="remove_button" type="button">Filter - Remove</button>';

high_node.setAttribute ('id', 'high_container');
document.body.appendChild (high_node);
remove_node.setAttribute ('id', 'remove_container');
document.body.appendChild (remove_node);


document.getElementById ("high_button").addEventListener ("click", highlight, false);
document.getElementById ("remove_button").addEventListener ("click", remove, false);



GM_addStyle ( (<><![CDATA[
    #high_container 
	{
        position:               fixed;
        top:                    72px;
        left:                   -10px;
        font-size:              20px;
        background:             white;
        border:                 3px outset black;
        margin:                 10px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 14.5px;
    }
    #high_button 
	{
        cursor:                 pointer;
    }
    #high_container p 
	{
        color:                  red;
        background:             white;
    }
]]></>).toString () );

GM_addStyle ( (<><![CDATA[
    #remove_container 
	{
        position:               fixed;
        top:                    28px;
        left:                   -10px;
        font-size:              20px;
        background:             white;
        border:                 3px outset black;
        margin:                 10px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 14.5px;
    }
    #remove_button 
	{
        cursor:                 pointer;
    }
    #remove_container p 
	{
        color:                  red;
        background:             white;
    }
]]></>).toString () );



function remove() {
var elm = document.getElementsByClassName("userContent");//Facebook uses this calss for user posts
var del_count = 0;
var del_words = JSON.parse(GM_getValue("del_list"));//calls the word list from firefox storage, to edit, manualy replace after the equals sign: i.e. ["delete","hide"];
var Rempost = [];
if(del_words.length > 0){
	for(i = 0; i < elm.length; i++) //itterate elements
	{
	
		for(j = 0; j < del_words.length; j++)//itterate words in list
		{
			if(elm[i].innerHTML.search(del_words[j]) != -1) //scans innerHTML for string
			{
				Rempost[del_count] = i; //ques for removal
				del_count++;//increments count of post removed
			}
		}
	}
	//removing the posts in que
	for(k = 0; k < Rempost.length; k++)
	{
		elm[Rempost[k]-k].parentNode.removeChild(elm[Rempost[k]-k]);
		
	}
alert("posts removed: " + del_count);
} else {
alert("No word list found.");
}
}

function highlight() {
var elm = document.getElementsByClassName("userContent");//Facebook uses this calss for user posts
var high_count = 0;
var high_words = JSON.parse(GM_getValue("high_list"));//calls the word list from firefox storage, to edit, manualy replace after the equals sign: i.e. ["high","words"];
var highpost = [];
if(high_words.length > 0){
	for(i = 0; i < elm.length; i++) //itterate elements
	{
	
		for(j = 0; j < high_words.length; j++)//itterate words in list
		{
			if(elm[i].innerHTML.search(high_words[j]) != -1) //scans innerHTML for string
			{
				highpost[high_count] = i; //ques for highlighting
				high_count++;//increments count of post removed
			}
		}
	}
	//highlighting the posts in que
	for(k = 0; k < highpost.length; k++)
	{
		var temp_elm = document.createElement("span");
		var temp_parent = elm[highpost[k]-k].parentNode;
		temp_elm.textContent = elm[highpost[k]-k].innerHTML;
		var temp_color = GM_getValue("high_color");
		temp_elm.style.color = temp_color;
		temp_parent.insertBefore(temp_elm , elm[highpost[k]-k]);
		elm[highpost[k]-k].parentNode.removeChild(elm[highpost[k]-k]);
		
	}
alert("posts highlighted: " + high_count);
} else {
alert("No word list found.");
}
}