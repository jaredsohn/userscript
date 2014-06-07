// ==UserScript==
// @name           Bugzilla hidden fields expander
// @namespace      http://www.ucw.cz/
// @description    Expand fields hidden behind 'edit' pseudolinks on show_bug page
// @include	   https://bugzilla.novell.com/show_bug.cgi?id=*
// @include	   https://bugzilla.novell.com/process_bug.cgi
// @include	   https://bugzilla.novell.com/post_bug.cgi
// @include	   https://bugzilla.novell.com/attachment.cgi
// ==/UserScript==
// Author: Milan Vancura <mvancura@suse.cz>
// Version: 1.1
//
function getLoginName() {
        var x;
        var m;

        var s = document.getElementById("header");
        if(!s) { return false; }

        var loginre=/^(?:.|\n)*Log(?:\s|&nbsp;)out(?:\s|\n)*<\/a>(?:\s|\n)*(.*)(?:\s|\n)*$/mi;
        var itags = s.getElementsByTagName("li");

        for (x=0;x<itags.length;x++) {
                if(itags[x].parentNode.className=="links") {
                        m = itags[x].innerHTML;
                        if (m.match(loginre)) {
                                m = m.replace(loginre,"$1");
				return m;
                        }                          
                }                                   
        }
        return false;
}

function showEditableField (off,on) {
    document.getElementById(off).style.display='none';
    document.getElementById(on).style.display='inline';
    document.getElementById(on).className=document.getElementById(on).className.replace(/bz_default_hidden/,"");
}

showEditableField('bz_assignee_edit_container', 'bz_assignee_input');
showEditableField('bz_qa_contact_edit_container', 'bz_qa_contact_input');
showEditableField('bz_url_edit_container', 'bz_url_input_area');
showEditableField('dependson_edit_container', 'dependson_input_area');
showEditableField('blocked_edit_container', 'blocked_input_area');
showEditableField('cc_edit_area_showhide_container', 'cc_edit_area');
showEditableField('summary_alias_container','summary_alias_input');

// Add "Assign to me" pseudolink
var email=getLoginName();

if(email) {
	var o = document.getElementById("bz_assignee_input");
	o.innerHTML = o.innerHTML + '<br><a href="#" onclick="var o = document.getElementsByName(\'assigned_to\');o[0].value=\'' + email + '\'; o = getElementsByName(\'bug_status\')[0]; if(o.options[o.selectedIndex].value==\'NEW\' || o.options[o.selectedIndex].value==\'REOPENED\') { var i; for(i=0;i<o.length;i++) { if(o.options[i].value==\'ASSIGNED\'){break;}} o.selectedIndex=i;} return false;">Assign to me</a>';
}

//GM_addStyle(".bz_comment_text a {white-space: nowrap;}");
//GM_addStyle(".bz_comment_text {width: 60em;}");
