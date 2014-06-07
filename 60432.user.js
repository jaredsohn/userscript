// ==UserScript==
// @name           Nettby Dashboard
// @namespace      Tag:
// @description    Linker Logg, Varsler, Status til Dashboard
// @include        http://www.nettby.no/*

var link=document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

function modifyLink (ExpectedName, DesiredName, DesiredTarget, RegexEnabled){
	if (RegexEnabled != 1){
		toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
		ExpectedName = ExpectedName.replace(toReplace, "\\$1");
		ExpectedName = "^" + ExpectedName + "$";
	}
	re = new RegExp(ExpectedName)
	for(i = 0; i < link.snapshotLength; i++) {
		tmp = link.snapshotItem(i);
		if(re.test(tmp.innerHTML)){
			if (DesiredName != ""){
				tmp.innerHTML = DesiredName;
			}
			if (DesiredTarget != ""){
				tmp.href = DesiredTarget;
			}
		}
                else if(re.test(tmp.href)){
			if (DesiredName != ""){
				tmp.innerHTML = DesiredName;
			}
			if (DesiredTarget != ""){
				tmp.href = DesiredTarget;
			}
		}
	}				
}

// ==/UserScript==

modifyLink ("http://www.nettby.no/user/action_log.php", "Logg", "/user/dashboard_action_log.php?user_id=",0);
modifyLink ("http://www.nettby.no/user/action_private_log.php", "Varsler", "/user/dashboard_action_private_log.php",0);
modifyLink ("http://www.nettby.no/user/friends_status.php", "Status", "/user/dashboard_status.php?user_id=", 0);
