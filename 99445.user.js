// ==UserScript==
// @name           PS_MWE_Rob
// @author         All credit to PS MWE devs
// @description    BM based on the PS MWE clear board robbing code.
// ==/UserScript==


var Slot0;
var Slot1;
var Slot2;
var Slot3;
var Slot4;
var Slot5;
var Slot6;
var Slot7;
var Slot8;
var RobBoardWin = 0;
var RobBoardLoss = 0;
var xw_sig;
var xw_user;

function GetXW(){
		xw_user = (/p\|([\d]+)/.exec(page))[1];
		xw_sig = (/local_xw_sig = '([\da-f]+)/.exec(page))[1];
/**		name = (/currentUserInfo":\{"name":"(.+) /.exec(page))[1];
		debug(name+'<br>'+xw_user+'<br>'+xw_sig);
**/
}


function GetRobs(){
	page = document.getElementsByTagName('html')[0].innerHTML;


	RobBtn = document.evaluate( "//a[@class='sexy_button_new short red'][contains(string(),'Rob')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );	
	Slot0 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(0).onclick))[0];
	Slot0 = 'html_server.php?'+Slot0;
	Slot1 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(1).onclick))[0];
	Slot1 = 'html_server.php?'+Slot1;
	Slot2 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(2).onclick))[0];
	Slot2 = 'html_server.php?'+Slot2;
	Slot3 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(3).onclick))[0];
	Slot3 = 'html_server.php?'+Slot3;
	Slot4 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(4).onclick))[0];
	Slot4 = 'html_server.php?'+Slot4;
	Slot5 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(5).onclick))[0];
	Slot5 = 'html_server.php?'+Slot5;
	Slot6 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(6).onclick))[0];
	Slot6 = 'html_server.php?'+Slot6;
	Slot7 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(7).onclick))[0];
	Slot7 = 'html_server.php?'+Slot7;
	Slot8 = (/xw_controller=robbing&xw_action=rob([&\w\d\=]+)/.exec(RobBtn.snapshotItem(8).onclick))[0];
	Slot8 = 'html_server.php?'+Slot8;
	PreRob(Slot0, Slot1, Slot2, Slot3, Slot4, Slot5, Slot6, Slot7, Slot8);
	
}

function PreRob(Slot0, Slot1, Slot2, Slot3, Slot4, Slot5, Slot6, Slot7, Slot8){
	RobCount = 0;
	send = 'ajax=1&liteload=1&sf_xw_user_id=p%7C'+xw_user+'&sf_xw_sig='+xw_sig;
	XHRrob(Slot0, send, "0");
	XHRrob(Slot1, send, "1");
	XHRrob(Slot2, send, "2");
	XHRrob(Slot3, send, "3");
	XHRrob(Slot4, send, "4");
	XHRrob(Slot5, send, "5");
	XHRrob(Slot6, send, "6");
	XHRrob(Slot7, send, "7");
	XHRrob(Slot8, send, "8");

}	

function XHRrob(url, send, slot){
	var client = new XMLHttpRequest();
	client.open("POST", url, true);
	client.setRequestHeader("X-Requested-With","XMLHttpRequest");
	client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	client.send(send);
	client.onreadystatechange = function() {
		if(this.readyState == 4) {
			response = client.responseText;
			if((/user_cash_nyc":"/.test(response))){
				RobCount++;
				if((/SUCCESS!/.test(response))){
					RobBoardWin = RobBoardWin + 1;
				}
				if((/FAILED/.test(response))){
					RobBoardLoss = RobBoardLoss + 1;
				}
				if(RobBoardWin + RobBoardLoss == 9){
					RefBrd();
					return
				}
				else if(RobCount == 9 && RobBoardWin + RobBoardLoss != 9){GetRobs()};
			}		
		}
	}
}

function RefBrd(){
	window.location.href = 'javascript:(function(){do_ajax(\'mw_city_wrapper\',\'remote/html_server.php?xw_controller=robbing&xw_action=refresh\');}())'
	p('1000');
}

GetXW();
GetRobs();