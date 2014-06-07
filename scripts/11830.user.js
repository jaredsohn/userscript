// ==UserScript==
// @name           ldr_auto_compactor
// @description    this GM be compact (hotkey:'c') specified feeds automatically. you can get subscribe id of current feed by using command ":sid".
//                 the command will show subscribe id into the status balloon on top of screen and add it following array subsIdList.
// @author         Yuki KODAMA (Twitter: kuy)
// @namespace      http://endflow.net/
// @include        http://reader.livedoor.com/reader/*
// @version        0.1.0 [07-08-15]
// ==/UserScript==

(function(){

// ################# define a list of compact feed #################
//  [i.e.] var subsIdList = [5090717, 5111602, 5111603, 5111605];
var subsIdList = [/* add here */];
// #################################################################

var w = unsafeWindow;
var _onload = w.onload;
function isCompact(){return w.contain(w.$("right_body").className, "compact");}
function compact(){isCompact() || w.Control.compact();}
function uncompact(){isCompact() && w.Control.compact();}
var onload = function(){with(w){
	// replace default read function
	var _read = Control.read;
	Control.read = function(sid, todo){
		_read(sid, todo);
		(subsIdList.indexOf(parseInt(sid)) != -1) ? compact() : uncompact();
	}
	// add vi command to display subscribe id into the status balloon
	register_command("sid",function(){
		var id = get_active_feed().subscribe_id;
		var msg = (typeof id == "undefined") ? "フィードが表示されていません" : ("このフィードの購読ID : " + id);
		message(msg);
	});
}}
w.onload = function(){
	_onload();
	onload();
}
})();
