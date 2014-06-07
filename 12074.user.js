// ==UserScript==
// @name        LDR Memorize Compact State
// @namespace   http://userscripts.org/users/7010
// @include     http://reader.livedoor.com/reader/
// ==/UserScript==

// 2007/09/12 style change
// 2007/09/08 auto open

var OPEN_ALL_ITEM = false;

GM_addStyle(<><![CDATA[
	.compact .item{
		background-color : #ddd !important;
	}
	.compact .padding{
		margin : 0 !important;
	}
]]></>);

var sids = load('sids', {});

// -- [Application] ----------------------------------------------------------------------
with(unsafeWindow){
	addBefore(Control, 'compact', function(){
		var sid = get_active_feed().subscribe_id;
		if(isCompact()){
			delete sids[sid];
		} else {
			sids[sid] = true;
		}
		save('sids', sids);
	})
	
	register_hook('BEFORE_PRINTFEED', function(feed) {
		var sid = feed.subscribe_id;
		
		sids[sid] ? compact() : uncompact();
		
		if(OPEN_ALL_ITEM && sids[sid]){
			var queue = new Queue();
			foreach(feed.items, function(item){
				queue.push(function(){
					GM_openInTab(item.link);
				});
			});
			queue.interval = 200;
			queue.exec();
		}
	});
	
	function isCompact(){
		return hasClass('right_body', 'compact');
	}
	function compact(){
		addClass('right_body', 'compact')
	}
	function uncompact(){
		removeClass('right_body', 'compact')
	}
}

// -- [Utility] ----------------------------------------------------------------------
function load(name, def){
	var obj = eval(GM_getValue(name));
	return obj ? obj : def;
}

function save(name, obj){
	GM_setValue(name, obj.toSource());
}

function addBefore(target, name, before) {
	var original = target[name];
	target[name] = function() {
		before.apply(this, arguments);
		return original.apply(this, arguments);
	}
}