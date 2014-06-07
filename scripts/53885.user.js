// ==UserScript==
// @name           mainjsworkaround
// @namespace      http://spxza/resistorbeterminated/mainjsworkaround
// @description    A workaround for typos in mainjs.js on resistorbeterminated.com
// @include        http://resistorbeterminated.com/simulator/*
// ==/UserScript==


//Function taken from http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page
function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
} 

//Here starts mainjs.js, with bad characters taken out.
//minusimage = new Image();
//plusimage = new Image();
//minusimage.src = '/images/icons/minus.gif';
//plusimage.src = '/images/icons/plus.gif';

function switchImage(obj, childID){
	minusimage = new Image();
	plusimage = new Image();
	minusimage.src = '/images/icons/minus.gif';
	plusimage.src = '/images/icons/plus.gif';

	if(obj.src == plusimage.src) 
		obj.src = minusimage.src;
	else
		obj.src = plusimage.src;				
	
	// now change the style of the child block
	if(document.getElementById(childID).style.display == '')
		document.getElementById(childID).style.display = 'none';
	else
		document.getElementById(childID).style.display = '';			
}	
function show(exID)
{
	var show=document.getElementById(exID)
	show.style.display="block";
}

function hide(exID)
{
	var hide=document.getElementById(exID)
	hide.style.display="none";
}

function checkUnitDelete(frm)
{
	if (frm.action.value == 'delete')
	{
		return confirm("Are you sure you wish to delete these units?");
	}
	else
	{
		return true;
	}
}

//Here ends mainjs.js, with bad characters taken out.

//Embed the above functions into the document
embedFunction(switchImage);
embedFunction(show);
embedFunction(hide);
embedFunction(checkUnitDelete);


