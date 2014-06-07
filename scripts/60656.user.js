// BetterESB
// version 0.1
// 2009-10-23
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF BUTLER, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "BetterESB", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// - loads the Oracle ESB Console services section faster
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           BetterESB
// @namespace      http://xyz.org/projects/betteresb/
// @description    Performance and Usability enhancements to Oracle ESB Console
// @include        http://app-soasuite-dev.intranet.local:8150/esb/
// ==/UserScript==

(function() {
	var serviceList;
	var esbfns = {
		// retrieve service tree
		getServiceTree: function() {
			var href = document.location.href+"esbConfiguration/executeCommand?action=ExploreServices";
			var req = new XMLHttpRequest();
			req.open('GET',href,false);
			req.send(null);
			alert('Req success');
			serviceList = req.responseXML;
			esbfns.addServiceTree();
		},
		// Hide Service Tree
		hideServiceTree: function() {
			tree = document.getElementById('DivESB');
			parent = tree.parentNode;
			parent.removeChild(tree);
		},
		// Add custom Service Tree
		addServiceTree: function() {
			alert('adding svc tree');
			tree = document.createElement('div');
		  var systems = serviceList.evaluate("/metadata/system", serviceList, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var html = '<div width="30%"><p align="top">New Service Tree</p>';
      var script = 'function showhide(id){';
      script += 'var div = document.getElementById(id);';
      script += 'if(!div)';
      script += 'return;';
    	script += 'div.style.display=((div.style.display=="block")?"none":"block");';
      script += '}';
      head = document.getElementsByTagName("head")[0];
      jsfn = document.createElement("script");
      jsfn.setAttribute("type","text/javascript");
      jsfn.innerHTML = script;
      head.appendChild(jsfn);
			var system, i;
			while(system=systems.iterateNext()) {
				var sysName = system.getAttribute('name');
				html += '<a href="#" onclick="showhide(\'sys_'+sysName+'\');">'+sysName+'</a><br/>';
				html += '<div id="sys_'+sysName+'" style="display:none">';
			    var svcGrps = serviceList.evaluate("serviceGroup", system, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				var svcGrp;
				while(svcGrp=svcGrps.iterateNext()) {
					html += esbfns.addServiceGroupToTree(svcGrp,1);
				}
				var services = serviceList.evaluate("service", system, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				var service;
				while(service=services.iterateNext()) {
					html += esbfns.addServiceToTree(service,1);
				}
				html +='</div><hr/>';
			}
			html += '</div>'
			tree.innerHTML = html;
			document.body.insertBefore(tree,document.body.firstChild);
			alert('done');
		},
		addServiceGroupToTree: function(svcGrp,level) {
			var str = '';
			for(var i = 0; i < level; i++) {
				str += '&nbsp;-&nbsp;';
			}
			var grpQName = svcGrp.getAttribute('qname');
			var grpName = svcGrp.getAttribute('name');
 			str += '<a href="#" onclick="showhide(\'grp_'+grpQName+'\');">'+grpName +'</a><br/>';
			str += '<div id="grp_'+grpQName+'" style="display:none;">';
			var childGrps = serviceList.evaluate("serviceGroup",svcGrp,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
			if(childGrps.length != 0) {
				var childGrp;
				while(childGrp=childGrps.iterateNext()) {
					str += esbfns.addServiceGroupToTree(childGrp,level+1);
				}
			}
			var services = serviceList.evaluate("service", svcGrp, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var service;
			while(service=services.iterateNext()) {
				str += esbfns.addServiceToTree(service,level+1);
			}
			str += '</div>';
			return str;
		},
		addServiceToTree: function(service,level) {
			var str = '';
			for(var i = 0; i < level; i++) {
				str += '&nbsp;-&nbsp;';
			}
			return str+service.getAttribute('name')+'<br/>';
		}
 	}
	alert('go');
	esbfns.hideServiceTree();
	esbfns.getServiceTree();
})();
