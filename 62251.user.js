// ==UserScript==
// @name           GLB Basic Settings Import/Export
// @namespace      GLB
// @description    GLB to Import/Export Basic Settings
// @include        http://goallineblitz.com/game/team_tactics.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){

    function doExport(){

        var exportline = '';
        $('input[type="text"], select', $('div[class*="tactic_container"]')).each(function(i){
            exportline += $(this).attr('value') + ';';
        })
        exportline = exportline.substring(0,(exportline.length-1));
        var newwindow2 = window.open('',"Builds Viewing List", "width=600,height=200,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
        if (!newwindow2.opener) newwindow2.opener = self;
        newwindow2.document.writeln(exportline);

    }

    function doImport(){

        //prompt for distribution list with default value of what is currently in the to box
    	var importlist = prompt("Enter import string from previous export:",'')
        if (importlist==null) {
    		return 0;
    	}
        importlist = importlist.replace(/ /g,'');
        // if distribution list is empty exit function
    	if (importlist.length == 0) {
    		alert('Invalid Import String');
    		return 0;
    	}
        var importarray = importlist.split(';');
        if(importarray.length!=42){
            alert('Incomplete Import String');
    		return 0;
        }
        $('input[type="text"], select', $('div[class*="tactic_container"]')).each(function(i){
            if($(this).attr('tagName')=='SELECT'){
                $('option[value="'+importarray[i]+'"]',$(this)).attr('selected','selected');
            }else{
                $(this).attr('value',importarray[i]);
            }
        })
        alert('Import Successful. Remember to click Update to save changes.');

    }

    var expbutton = document.createElement('input');
    expbutton.setAttribute('id', 'expbutton');
    expbutton.setAttribute('type','button');
    expbutton.setAttribute('name', 'expbutton');
    expbutton.setAttribute('value', 'Export');
    expbutton.addEventListener('click', doExport, false);

    var impbutton = document.createElement('input');
    impbutton.setAttribute('id', 'impbutton');
    impbutton.setAttribute('type','button');
    impbutton.setAttribute('name', 'impbutton');
    impbutton.setAttribute('value', 'Import');
    impbutton.addEventListener('click', doImport, false);

    $('.small_head:first').prepend('<br><br>');
    $('.small_head:first').prepend(expbutton);
    $('.small_head:first').prepend(impbutton);
    

    

})

