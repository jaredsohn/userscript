// ==UserScript==
// @name	   Bugzilla: Check Priority
// @namespace      http://www.ucw.cz/
// @description    Alert a warning Prio == P5 when committing new comment
// @include	   https://bugzilla.novell.com/show_bug.cgi?id=*
// @include	   https://bugzilla.novell.com/process_bug.cgi
// ==/UserScript==

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

function check_prio() {
	var me = getLoginName();
	if (me == false)
		return;
	var commitobj = document.evaluate("//form[contains(@name,'changeform')]//input[contains(@type,'submit')]",document,null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var x=0;x<commitobj.snapshotLength;x++) {
		commitobj.snapshotItem(x).setAttribute("onClick",'if(this.form.assigned_to.value=="' + me + '" && this.form.priority.value == "P5 - None") return confirm("Bug has P5 selected, is that intended?"); else return true;');
	}
}

check_prio();
