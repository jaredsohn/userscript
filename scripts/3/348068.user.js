// ==UserScript==
// @name                Node Maker
// @namespace           http://userscripts.org/users/419370
// @description         Creates nodes
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @updateURL           http://userscripts.org/scripts/source/141050.meta.js
// @version             1.0
// @grant               none
// ==/UserScript==

if ('undefined' == typeof __RTLM_PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __RTLM_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
      document.body.appendChild(script);
      document.body.removeChild(script);
    }, 1000);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}
var version = "0.45";

// Generic DOM element creation
function createElement(p, type, className) {
	var e = document.createElement(type);
	if (p)
		p.appendChild(e);
	if (className != undefined)
		e.className = className;
	return e;
}

wme_et = Class.extend({
	init: function() {
		this.tb = $("#edit-buttons");
		this.buttons = [];

		this.logger = $('<div id="logger">')
			.css('width', '500')
			.css('background-color', 'rgba(0, 0, 0, 0.6)')
			.css('color', 'white')
			.css('font-size', '15px')
			.css('font-weight', 'bold')
			.css('margin-left', 'auto')
			.css('margin-right', 'auto')
			.appendTo($('#toolbar'));
	},
	log: function(msg, delay) {
		this.logger.append($('<div id="mylog">')
			.append(new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + " : " + msg));//.show().delay(5000).fadeOut(100);
		setTimeout(function() {
			$('#logger').children().first().remove();
		}, delay ? delay : 5000);
	},
	add_menu_bt: function(id) {
		var myMenuBt = $('<div id=' + id + '>')
			.addClass("toolbar-button toolbar-submenu")
			.addClass("toolbar-group-drawing")
			.addClass("ItemInactive");
		this.tb.width = parseInt(this.tb.css("width")) + 2 + (parseInt(this.tb.css("width")) / $(".toolbar-button", this.tb).length);
		this.tb.css("width", this.tb.width + "px");
		myMenuBt.menu = $('<menu class="submenu">');
		myMenuBt.append(myMenuBt.menu);
		this.tb.append(myMenuBt);
		this.buttons[id] = myMenuBt;
		return myMenuBt;
	},
	add_menu_entry: function(menu, title, callback, tooltip) {
		ret = $("<div>").addClass("drawing-toolbar-button ItemInactive")
			.appendTo(menu).attr("title", tooltip).append("<span>" + title + "</span>")
			.click(function(e)
		{
			if (callback && typeof(callback) === "function") {
				callback();
			}
		});
		return ret;
	},
	add_submenu_entry: function(menu, title, tooltip) {
		ret = $("<div>").addClass("drawing-toolbar-button ItemInactive")
			.attr("title", tooltip).attr("style", "height:32px")
			.append("<span>" + title + "</span>")
			.hover(function() {
			$(this).children("div:first").show();
		},
			function() {
				$(this).children("div:first").hide();
			})
			.appendTo(menu);
		$("<div id='submen'>")
			.addClass("drawing-toolbar-button ItemInactive")
			.attr("style", "position: relative; bottom: " + ret.height()
			.toString() + "px !important; left: " + ret.width()
			.toString() + "px !important")
			.hide()
			.appendTo(ret);

		return ret;
	},
	add_submenu_item: function(submenu, title, callback, args, tooltip) {
		submenu.children("div:first").append($("<div>")
			.addClass("drawing-toolbar-button ItemInactive")
			.attr("title", tooltip)
			.append("<span>" + title + "</span>")
			.click(function(e)
		{
			if (callback && typeof(callback) === "function") {
				callback(args);
			}
		}));
	}
});

function getSelectedLandMark() {
	var lmList = [];
	for (var i = 0; i < selectionManager.selectedItems.length; i++) {
		var m = selectionManager.selectedItems[i];
		if (m.type == Waze.Model.ObjectType.LANDMARK)
			lmList.push(m.geometry);
	}

	if (lmList.length == 0) {
		for (var id in Waze.model.landmarks.objects) {
			if (id < 0) {
				var curLm = Waze.model.landmarks.objects[id];
				var curFid;
				if (lmList.length == 0 || id < curFid) {
					lmList[0] = curLm.geometry;
					curFid = id;
				}
			}
		}
	}
	return lmList;
}

function mapModel(columns, segArray) {
	var map = new Object();
	for (var i = 0; i < segArray.length; i++) {
		if (segArray[i].type == Waze.Model.ObjectType.SEGMENT) {
			var maplvl = map;
			var seg = segArray[i];
			for (var j = 0, len = columns.length; j < len; j++) {
				var key = getAttr(columns[j], seg);
				var m = maplvl[key];
				if (m == null) {
					m = {};
					maplvl[key] = m;
				}
				maplvl = m;
			}
			var lSt = maplvl[null];
			if (lSt == null) {
				lSt = new Array();
				maplvl[null] = lSt;
			}
			lSt.push(seg);
		} else {
			et.log("Warning : not a segment :" + id.toString());
		}
	}

	return map;
}

function clearlist(segArray) {
	dlg.refresh(segArray);
}

function segmentList() {
	if (typeof(dlg) === 'undefined') {
		dlg = new lstdialog();
		dlg.opts.accordion({active: false});
	}
	dlg.refresh($.map(Waze.model.segments.objects, function(e, f) {
		return e;
	}));
	dlg.popup.dialog("open");
}

function CSelectLandMark(strictInclude) {
	var geoList = [];

	for (var i = 0; i < selectionManager.selectedItems.length; i++) {
		var m = selectionManager.selectedItems[i];
		if (m.type == Waze.Model.ObjectType.LANDMARK)
			geoList.push(m.geometry);
	}

	if (geoList.length == 0) {
		for (var id in Waze.model.landmarks.objects) {
			if (id < 0) {
				var curLm = Waze.model.landmarks.objects[id];
				var curFid;
				if (geoList.length == 0 || id < curFid) {
					geoList[0] = curLm.geometry;
					curFid = id;
				}
			}
		}
	}

	if (geoList.length > 0) {
		var lSeg = new Array();
		for (var id in Waze.model.segments.objects) {
			var seg = Waze.model.segments.objects[id];
			if (isSegmentInGeometries(geoList, seg, !strictInclude))
				lSeg.push(seg);
		}

		selectionManager.select(lSeg);
	}
	else {
		et.log("No new or selected landmark found");
	}
}

function isSegmentInGeometries(geoList, seg, partialAllowed) {
	for (var i = 0; i < seg.geometry.components.length; i++) {
		var p = seg.geometry.components[i];
		var found = false;
		for (var j = 0; j < geoList.length; j++) {
			var geo = geoList[j];
			if (geo.containsPoint(p)) {
				if (partialAllowed)
					return true;
				found = true;
				break;
			}
		}
		if (!partialAllowed && !found)
			return false;
	}
	return !partialAllowed;
}

function isInLanmarks(seg) {
	var val = null;
	for (var i = 0; i < seg.geometry.components.length; i++) {
		var p = seg.geometry.components[i];
		var v = 0;
		var lnmLst = getSelectedLandMark();
		for (var j = 0; j < lnmLst.length; j++) {
			if (lnmLst[j].containsPoint(p)) {
				v = 1;
				break;
			}
		}
		if (val == null)
			val = v;
		else if (val != v)
			return .5;
	}
	return val;
}

function mkNodes(){

  var lst = selectionManager.selectedItems.clone();
  if (lst.length==0){
    et.log("No segments selected");
  }else{
    mkNode(lst)
  }
}

function mkNode(segs){
//e = new Waze.Control.NodeCreator(Waze.model, layer, handler, segments);
  for(var i = 0; i < segs.length; i++) {
    for (var j = i+1; j < segs.length; j++){
      var splits = segs[i].geometry.split(segs[j].geometry,{edge: !0,mutual: !0});
      if (splits != null){
        var a = new Waze.Action.AddJunction([segs[i],segs[j]],splits );
        Waze.model.actionManager.add(a);
        segs.splice(i,1);
        segs.splice((j>i)?j-1:j,1);
        segs.push(a.sourceSplits[0],a.sourceSplits[1],a.targetSplits[0],a.targetSplits[1]);
        mkNode(segs)
      }
    }
  }
}

function mapObj(obj, f) {
	return Object.values(obj).map(f).filter(function(i) {
		return i;
	});
}

function refreshEdit() {
	dlgedt.refresh();
}

function PopupEdit() {
	if (typeof(dlgedt) === 'undefined') {
		dlgedt = new propertyDialog();
	}
	if (selectionManager.selectedItems.length == 0) {
		et.log("No segment selected");
	} else {
		dlgedt.refresh();
		dlgedt.popup.dialog("open");
	}
}

function initet() {
	et = new wme_et();
	var bt = et.add_menu_bt("Plugins");
	et.add_menu_entry(bt.menu, "Node Maker", mkNodes, "Create node on each segment intersection");
	});

	var user = Waze.loginManager.user;
	if (user !== null) {
		et.log("Hello " + user.userName + " (" + user.normalizedLevel + ")");
	} else {
		et.log("Hello Stranger");
	}
wait_et();
