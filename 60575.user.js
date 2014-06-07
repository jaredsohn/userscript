// ==UserScript==
// @name Travian-carriers
// @description Travian: calculate carriers need (v1.1)
// @version 1.1
// @include http://*.travian.*/*
// @date 2009-06-16
// ==/UserScript==
// (c) Anton Fedorov aka DataCompBoy, 2006-2009
// Clan S4 <KazakiYuV2>.

(function(){
  getElementsByClass = function (searchClass,node,tag) {
	  var classElements = new Array();
	  if ( node == null )
		  node = document;
	  if ( tag == null )
		  tag = '*';
	  var els = node.getElementsByTagName(tag);
	  var elsLen = els.length;
	  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	  for (i = 0, j = 0; i < elsLen; i++) {
		  if ( pattern.test(els[i].className) ) {
			  classElements[j] = els[i];
			  j++;
		  }
	  }
	  return classElements;
  }

  var d = document.wrappedJSObject ? document.wrappedJSObject : document;
  var w = window.wrappedJSObject ? window.wrappedJSObject : window;
  if(w.carry) {
	  var x = 0;
	  if (w.upd_res && !w.rupd_res) {
		  w.rupd_res = w.upd_res;
		  w.upd_res = function() {
			var w = window.wrappedJSObject ? window.wrappedJSObject : window;
			var res = w.rupd_res.apply(this,arguments);
			w.calcRes();
			return res;
		  }
		  x = 1;
	  }

	  if (w.add_res && !w.radd_res) {
		  w.radd_res = w.add_res;
		  w.add_res = function() {
			var w = window.wrappedJSObject ? window.wrappedJSObject : window;
			var res = w.radd_res.apply(this,arguments);
			w.calcRes();
			return res;
		  }
		  x = 1;
	  }

	  if (x && !w.calcRes) {
		  var tb = getElementsByClass("f10",document.body,"table");
		  if (!tb || !tb.lenfth) { tb = document.getElementById('send_res'); if(tb) tb = [ tb ]; }
		  if (tb[0]) {
			  var tr = document.createElement('tr');
			  var td;
			  td = document.createElement('td'); tr.appendChild(td);
			  td = document.createElement('td'); tr.appendChild(td);
			  td.appendChild(document.createTextNode('Total:'));
			  td = document.createElement('td'); tr.appendChild(td);
			  td.id = 'rT'; td.class = 'fm'; td.className = 'fm';
			  td.setAttribute('colspan', 2);
			  var w = window.wrappedJSObject ? window.wrappedJSObject : window;
			  td.appendChild(document.createTextNode('0/0 x 0'));
			  tb[0].tBodies[0].appendChild(tr);
			  w.calcRes = function() {
				var w = window.wrappedJSObject ? window.wrappedJSObject : window;
				var r1 = parseInt(document.getElementById('r1').value); if (!r1) r1 = 0;
				var r2 = parseInt(document.getElementById('r2').value); if (!r2) r2 = 0;
				var r3 = parseInt(document.getElementById('r3').value); if (!r3) r3 = 0;
				var r4 = parseInt(document.getElementById('r4').value); if (!r4) r4 = 0;
				var total = r1+r2+r3+r4;
				var need = Math.ceil(total/w.carry);
				document.getElementById('rT').innerHTML = total+'/'+(w.carry*need)+'&nbsp;('+need+')';
			  }
		  }
	  }
  }
})();
