// ==UserScript==
// @name           PEmagic
// @namespace      http://editor.persgroep.nl/
// @description    Publishing Engine helpscript
// @include        http://editor.persgroep.nl/editor/editor/editor.do*
// ==/UserScript==

var vktitle = document.getElementById("title");
var vkbody = document.getElementById("text");
var vkintro = document.getElementById("introduction");
var myArea = document.getElementById("introduction");
var introopen = document.getElementById('introOpen');
var ondertekst = document.getElementById('addtablebutton');
var vkauteur = document.getElementById('author');
var newElement

//navigation page hacks
var vknavform = document.getElementById('navigationItems[2].selected1');
if (vknavform) {
	var vkresetnav = document.createElement('div');
	vknavform.parentNode.insertBefore(vkresetnav, vknavform);
	vkresetnav.style.cssFloat = "right";
	vkresetnav.innerHTML = "<a href=# onClick=\"document.getElementById('navigationItems2.priority').value = '6';document.getElementById('navigationItems2664.priority').value = '6'\">Reset</a>";
}

//add source on fotoreeks pages
//var vkdescr = document.getElementById('description');
//if (vkdescr && !vkdescr.value) {
//	vkdescr.value = vkdescr.value + 'Foto\'s: Reuters, ANP, EPA, AFP, AP, Photonews.';
//}

// add div for source (just a gimmick)
if (introopen) {
    newElement = document.createElement('div');
    introopen.parentNode.insertBefore(newElement, introopen);
    newElement.style.color = "green";
    newElement.innerHTML = "selecteer tekst + CTRL-k, CTRL-m (adam), CTRL-y (dh), CTRL-q (quotes), CTRL + home (cursor top). werkt alleen in introveld";

}

// add div for standard text to be copied
if (ondertekst) {
    newElement2 = document.createElement('div');
    ondertekst.parentNode.insertBefore(newElement2, ondertekst);
    //newElement2.style.color = "green";
    newElement2.innerHTML = "<p><em><a target='_blank' href='http://twitter.com/volkskrant'>Volg de Volkskrant op Twitter</a></em></p><p><em><a target='_blank' href='http://facebook.com/volkskrant'>Word vriend van de Volkskrant op Facebook</a></em></p><p><em><a target='_blank' href='http://www.volkskrant.nl/vk-online/'>Lees meer in de Volkskrant</a></em></p>";

}

// add div with author links
if (vkauteur) {

    vkauteur.size = "50";
    sourcelinks = document.createElement('div');
    vkauteur.parentNode.insertBefore(sourcelinks, vkauteur);
    sourcelinks.innerHTML = "<a href=\"#\" onClick=\"javascript:document.getElementById('author').value = \'ANP\';\">ANP</a> <a href=\"#\" onClick=\"javascript:document.getElementById('author').value = \'Novum\';\">Novum</a> <a href=\"#\" onClick=\"javascript:document.getElementById('author').value = \'AP\';\">AP</a> <a href=\"#\" onClick=\"javascript:document.getElementById('author').value = \'Novum/AP\';\">Novum/AP</a> <a href=\"#\" onClick=\"javascript:document.getElementById('author').value = \'ANP/Reuters\';\">ANP/Reuters</a> <a href=\"#\" onClick=\"javascript:document.getElementById('author').value = \'Redactie \';\">Red</a>";
}


//get (anp) out of textarea body. executed before wysiwyg turns textarea into iframe 
//if (vkbody.value.search(/\(anp\)/gi) > -1) {
//		newElement.innerHTML = "ANP";	
                vkbody.value = vkbody.value.replace(/\(anp\)/gi, '');
                //replace quotes
	        vkbody.value = vkbody.value.replace(/\"/gi, '\'');
	        vkbody.value = vkbody.value.replace(/\'\'/gi, '\'');
	        vkbody.value = vkbody.value.replace(/\,,/gi, '\'');
	        vkbody.value = vkbody.value.replace(/\"/gi, '\'');
	        vkbody.value = vkbody.value.replace(/\'\'/gi, '\'');
                vkbody.value = vkbody.value.replace(/\,,/gi, '\'');

//}


//gets text that is selected within textarea introduction
function getSelectedText() {
    var selection = myArea.value.substr(myArea.selectionStart, myArea.selectionEnd - myArea.selectionStart);
    return selection;
}

//copies to clipboard
function copyToClipboard(s)
			{
				if( window.clipboardData && clipboardData.setData )
				{
					clipboardData.setData("Text", s);
				}
				else
				{
					// You have to sign the code to enable this or allow the action in about:config by changing user_pref("signed.applets.codebase_principal_support", true);
					netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

					var clip = Components.classes['@mozilla.org/widget/clipboard;[[[[1]]]]'].createInstance(Components.interfaces.nsIClipboard);
				   if (!clip) return;
				   
				   // create a transferable
				   var trans = Components.classes['@mozilla.org/widget/transferable;[[[[1]]]]'].createInstance(Components.interfaces.nsITransferable);
				   if (!trans) return;
				   
				   // specify the data we wish to handle. Plaintext in this case.
				   trans.addDataFlavor('text/unicode');
				   
				   // To get the data from the transferable we need two new objects
				   var str = new Object();
				   var len = new Object();
				   
				   var str = Components.classes["@mozilla.org/supports-string;[[[[1]]]]"].createInstance(Components.interfaces.nsISupportsString);
				   
				   var copytext=meintext;
				   
				   str.data=copytext;
				   
				   trans.setTransferData("text/unicode",str,copytext.length*[[[[2]]]]);
				   
				   var clipid=Components.interfaces.nsIClipboard;
				   
				   if (!clip) return false;
				   
				   clip.setData(trans,null,clipid.kGlobalClipboard);	   
				}
			}




//listens for shortcuts and takes appropriate action
var instrumentTextarea = function(textarea) {
 var centerTextarea = function() {
    if (textarea.scrollIntoView) {
        textarea.scrollIntoView(false);
    } else {
        textarea.wrappedJSObject.scrollIntoView(false);
    }
    };
   
    var textareaKeydown = function(e) {
        if (e.shiftKey && e.ctrlKey && e.keyCode == 13) {
        // shift-ctrl-enter
            textarea.rows -= 1;
            centerTextarea();
        }
        else if (e.shiftKey && e.ctrlKey && e.keyCode == 32) {
        // shift-ctrl-space
            textarea.cols -= 1;
            centerTextarea();
        }
        else if (e.ctrlKey && e.keyCode == 13) {
        // ctrl-enter
            if (textarea.offsetHeight < window.innerHeight - 40) {
                textarea.rows += 1;
            }
            centerTextarea();
        }
	else if (e.ctrlKey && e.keyCode == 77) {
        // ctrl-m
		vkintro.value = "AMSTERDAM - " + vkintro.value;
        }
	else if (e.ctrlKey && e.keyCode == 89) {
        // ctrl-y
		vkintro.value = "DEN HAAG - " + vkintro.value;
        }
	else if (e.ctrlKey && e.keyCode == 81) {
        // ctrl-q
	    vkintro.value = vkintro.value.replace(/\"/gi, '\'');
	    vkintro.value = vkintro.value.replace(/\'\'/gi, '\'');
                vkintro.value = vkintro.value.replace(/Myanmar/gi, 'Birma');
                vkintro.value = vkintro.value.replace(/al-qaeda/gi, 'Al Qaida');
                vkintro.value = vkintro.value.replace(/Myanmar/gi, 'Birma');
                vkintro.value = vkintro.value.replace(/al-qaeda/gi, 'Al Qaida');
                vkintro.value = vkintro.value.replace(/Kaddafi/gi, 'Kadhafi');
                vkintro.value = vkintro.value.replace(/Gaddafi/gi, 'Kadhafi');
                vkintro.value = vkintro.value.replace(/Muammar/gi, 'Moammar');

        }
        else if (e.ctrlKey && e.keyCode == 75) {
        // ctrl-k
            vktitle.value = getSelectedText();
            vkintro.value = vkintro.value.replace(getSelectedText(), '');
	    vkintro.value = vkintro.value.replace(/\"/gi, '\'');
	    vkintro.value = vkintro.value.replace(/\'\'/gi, '\'');
	    vkintro.value = vkintro.value.replace(/\,,/gi, '\''); 
            vkintro.value = vkintro.value.replace(/Myanmar/gi, 'Birma');
            vkintro.value = vkintro.value.replace(/al-qaeda/gi, 'Al Qaida');   
            //cuts out the spaces at the start of a line
	    vkintro.value = vkintro.value.replace(/^\s+|\s+$/g, '');
            vkintro.value = vkintro.value.replace(/\n([A-Za-z0-9])/gi, '\n\n$1');    
            vkintro.value = vkintro.value.replace(/\n[ ]/gi, '\n');    
                vkintro.value = vkintro.value.replace(/Myanmar/gi, 'Birma');
                vkintro.value = vkintro.value.replace(/al-qaeda/gi, 'Al Qaida');
                vkintro.value = vkintro.value.replace(/Myanmar/gi, 'Birma');
                vkintro.value = vkintro.value.replace(/al-qaeda/gi, 'Al Qaida');
                vkintro.value = vkintro.value.replace(/Kaddafi/gi, 'Kadhafi');
                vkintro.value = vkintro.value.replace(/Gaddafi/gi, 'Kadhafi');
                vkintro.value = vkintro.value.replace(/Gadhafi/gi, 'Kadhafi');
                vkintro.value = vkintro.value.replace(/Muammar/gi, 'Moammar');

		//cleans up the mess before the city
		//var regpl1 = /\n[ ]?[A-Z][A-Z]+[ ]\(/g
		var regpl1 = /[A-Z][A-Z ]+[ ]\(/g
		if (vkintro.value.match(regpl1)) {
			var plmatch = vkintro.value.match(regpl1);
			var plsplit = vkintro.value.split(plmatch);
			vkintro.value = plmatch + plsplit[1];
		}


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////



            if (vkintro.value.search(/\(anp\)/gi) > -1) {
		newElement.innerHTML = "ANP";	
                vkintro.value = vkintro.value.replace(/\(anp\)\s/gi, '');

		//places cleaned tekst on clipboard in IE
		//copyToClipboard('test');
		vkintro.focus();
		vkintro.select();
		//vkintro.execCommand("Copy");

	    }
	    if (vkintro.value.search(/\(Novum\)/gi) > -1) {
		newElement.innerHTML = "Novum";	
                vkintro.value = vkintro.value.replace(/\(Novum\)\s/gi, '');
		vkintro.value = "AMSTERDAM " + vkintro.value.replace(/^\s+|\s+$/g, '');
		vkintro.value = vkintro.value.replace(/\n/gi, '\n\n');
	    }
	    if (vkintro.value.search(/\(ap\)/gi) > -1) {
		newElement.innerHTML = "AP";	
                vkintro.value = vkintro.value.replace(/\(ap\)\s/gi, '');
		vkintro.value = vkintro.value.replace(/,\s[0-9]\s[a-z][a-z][a-z]\.\s/gi, '');
	        vkintro.value = vkintro.value.replace(/^\s+|\s+$/g, '');
		//&lt;br /&gt; moet &lt;br /&gt;&lt;br /&gt; worden
		//vkintro.value = vkintro.value.replace(/.lt.br\s..gt./gi, '&lt;br /&gt;&lt;br /&gt;');
		vkintro.value = vkintro.value.replace(/\n/gi, '\n\n');
		//vkintro.value = vkintro.value.substring(0,vkintro.value.length-1);
	    }
	    if (vkintro.value.search(/\(ANP\/RTR\)/gi) > -1) {
		newElement.innerHTML = "ANP/RTR";	
                vkintro.value = vkintro.value.replace(/[ ]\(ANP\/RTR\)/gi, '');
	    }
	    if (vkintro.value.search(/\(ANP\/[A-Z\/]+\)/gi) > -1) {
		newElement.innerHTML = "ANP";	
                vkintro.value = vkintro.value.replace(/[ ]\(ANP\/[A-Z\/]+\)/gi, '');
	    }
            vkintro.rows = "10";
            //centerTextarea();
	    event.returnValue = false;
            return false; 
        }
        else if (e.ctrlKey && e.keyCode == 32) {
       // ctrl-space
            if (textarea.offsetWidth < window.innerWidth - 40) {
                textarea.cols += 1;
            }
            centerTextarea();
        }
    };
   
    textarea.addEventListener("keydown", textareaKeydown, 0);
}

var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++)
{
   instrumentTextarea(textareas[i]);
}