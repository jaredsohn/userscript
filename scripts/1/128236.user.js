// ==UserScript==
// @name            Font Preset
// @namespace       Font Preset
// @description     Makes text your preset.
// @include         *hackforums.net/newreply.php*
// @include         *hackforums.net/showthread.php*
// @version         2.0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
//editable  variables
var opening = "[font=Arial][color=#32CD32]";
var closing = "[/color][/font]";

//DO not change anything below here unless you know what you are doing
var x = 1//required

if (window.location.href.indexOf("showthread.php*") === -1) {//find out what 

page we are on
var checkboxCell = $("#content input[name^='postoptions']").parents 

("span.smalltext");
}
else
{
var checkboxCell    = $("#quickreply_e td:eq(0) span.smalltext");
}

if (checkboxCell.length) {//add checkbox
    checkboxCell.append (
        '<br><label><input type="checkbox" class="checkbox" 

name="myVeryOwnCheckbox" value="1" checked="checked" />'
        + '&nbsp;<strong>Post preset</strong></label>'
    );

    $("#quickreply_e input[name='myVeryOwnCheckbox']").change 

(myCheckboxChangeHandler);
	$("#content input[name='myVeryOwnCheckbox']").change 

(myCheckboxChangeHandler);
}





function myCheckboxChangeHandler () {//handle when the checkbox is changed
    this.checked ? x=1 : x=0;
	//return ((this.checked ? 1 : 0));
}




function form_submit (event) {//for catching the form submit and 'ingecting' the 

code

    var form, bClickNotSubmit;

    if (event  &&  event.type == 'click') {
        bClickNotSubmit = true;
        form            = document.getElementById ('quick_reply_form');
    }
    else {
        bClickNotSubmit = false;
        form            = event ? event.target : this;
    }

	
	
		var arTextareas = form.getElementsByTagName ('textarea');
		
	if(x === 1){
		for (var i = arTextareas.length - 1; i >= 0; i--) {
			var elmTextarea     = arTextareas[i];
			if (elmTextarea.value.indexOf(opening) == -1){
			elmTextarea.value   = opening + elmTextarea.value + 

closing;
			}
		}
	}
	
	
	
	
    if ( ! bClickNotSubmit ) {
        form._submit();
    }
}

window.addEventListener ('submit', form_submit, true);
document.getElementById ('quick_reply_submit').addEventListener ('click', 

form_submit, true);

HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;