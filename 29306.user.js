// ==UserScript==
// @name           uni-karlsruhe dukath web-login
// @description    Clickt automatisch auf den Login-Button der Dukath Website
// @namespace      https://dukath-www.rz.uni-karlsruhe.de
// @include        https://dukath-www.rz.uni-karlsruhe.de/
// @include        https://dukath-www.rz.uni-karlsruhe.de/cgi-bin/logout.pl
// @author         Veysel Oezer
// ==/UserScript==
//
login_button= document.evaluate('/html/body/table[2]/tbody/tr[2]/td/table[3]/tbody/tr/td[3]/table/tbody/tr[3]/td/input',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (login_button!=null){
	login_button.click();
}
else{


login_button= document.evaluate('/html/body/table[2]/tbody/tr[2]/td/table[3]/tbody/tr/td[3]/ul/table/tbody/tr[3]/td/input',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);



if (login_button!=null){
	login_button.click();
}
}
