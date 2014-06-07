    // ==UserScript==
    // @name           Sorts matis version fields
    // @namespace      http://mantis
    // @description    Ordena los combos/listas de versiones por orden alfabetico
    // @include        http://mantis/mantis/bug_change_status_page.php
    // @include        http://mantis/mantis/bug_update_advanced_page.php
    // @include        http://mantis/mantis/bug_update_advanced_page.php?*
    // @include        http://mantis/mantis/view_filters_page.php
    // @include        http://mantis/mantis/view_filters_page.php?*
    // @include        http://mantis/mantis/view_all_bug_page.php
    // @include        http://mantis/mantis/bug_report_advanced_page.php
    // ==/UserScript==
     
    var oldFunction = unsafeWindow.liveReqProcessReqChange;
    unsafeWindow.liveReqProcessReqChange = function(a, b) {
    	var r = oldFunction(a, b);
    	if (unsafeWindow.liveReq.readyState == 4) {
    		var x = [];
    		if (a == 'show_version_filter'){
    			x[0] = 'show_version[]'
    		}else{
    			x[0] = a.replace('show_','').replace('_filter','[]');
    		}
    		sortAllVersions(x);
    	}
    	return r;
    };
     
     
    var name=[];
    	name[0] = 'fixed_in_version';
    	name[1] = 'target_version';
    	name[2] = 'version';
    	name[3] = 'show_version[]';
    	name[4] = 'fixed_in_version[]';
    	name[5] = 'fixed_in_version[]';
    	name[6] = 'product_version';
     
    sortAllVersions(name);
     
    function sortAllVersions(name) { 
     
    	var fixedOrder = [];
    	fixedOrder['[Cualquiera]'] = 0; //spanish only, change
    	fixedOrder['[Ninguno]'] = 1; //spanish only, change
    	fixedOrder[''] = 2;
     
    	for (var z = 0; z < name.length; z++){
    		var components = document.getElementsByName(name[z]);
    		for (var i = 0; i < components.length; i++){
    			sort(components[i]);
    		}
    	}
     
    	function versionComparator(o1, o2){
    		var fo1=fixedOrder[o1.text];
    		var fo2=fixedOrder[o2.text];
    		if (typeof fo1 == "undefined"){
    			fo1 = -1;
    		}
    		if (typeof fo2 == "undefined"){
    			fo2 = -1;
    		}
     
    		if (fo1 != -1) {
    			if (fo2 != -1)
    				return fo2 - fo1;
    			return -1;
    		} else if (fo2 != -1){
    			return 1;
    		}
     
    		var modulo1 = getModulo(o1.text);
    		var modulo2 = getModulo(o2.text);
    		if (modulo1[0] > modulo2[0]){
    			return 1;
    		} else if (modulo1[0] < modulo2[0]){
    			return -1;
    		} 
    		var ver = 0;
    		for (var i = 1; (i < modulo1.length) && (ver == 0); i++) {
    			ver = modulo2[i] - modulo1[i];
    		}
    		return ver;
    	}
     
    	function getModulo (text){
			// ours versions are like: 
			//  (PRODUCT MODULE) v1.2.b3
			//  (PRODUCT MODULE) v1.2.b3.f4
			//  PRODUCT MODULE v1.2.b3
			//  PRODUCT MODULE v1.2.b3.f4
			//  PRODUCT MODULE 1.2.b3
			//  PRODUCT MODULE 1.2.b3.f4
			//  *(PRODUCT MODULE v1.2.b3)
			//  *(PRODUCT MODULE v1.2.b3.f4)
			//  *PRODUCT MODULE v1.2.b3
			//  *PRODUCT MODULE v1.2.b3.f4
			//  *PRODUCT MODULE 1.2.b3
			//  *PRODUCT MODULE 1.2.b3.f4
			//  >(PRODUCT MODULE) v1.2.b3
			//  >(PRODUCT MODULE) v1.2.b3.f4
			//  >PRODUCT MODULE v1.2.b3
			//  >PRODUCT MODULE v1.2.b3.f4
			//  >PRODUCT MODULE 1.2.b3
			//  >PRODUCT MODULE 1.2.b3.f4
			// as we don't care about () or * or >, just get rid of it :)
    		text = text.replace('(', '');
    		text = text.replace(')', '');
    		text = text.replace('*', '');
    		text = text.replace('>', '');
			

			//then search for MODULE v(optional)MAY.MIN.bBUILD.fFIX (.fFIX is optional)
    		var pat = /([a-zA-Z ]*) *v{0,1}([0-9]+)\.([0-9]+)\.b([0-9]*)(\.f([0-9]+)){0,1}/
    		var x = pat.exec(text);
    		if (x == null)
    			return text;
    		var ret = [];
			//take only the numbers and module name
    		ret[0] = x[1];
    		ret[1] = x[2];
    		ret[2] = x[3];
    		ret[3] = x[4];
     
			// if has not fix, then its fix 0
    		if (typeof x[6] == 'undefined'){
    			ret[4] = 0;
    		} else {
    			ret[4] = x[6];
    		}
    		return ret;
    	}
     
		// sort by module name, mayor, minor, build and fix
    	function sort(comp){
    		if (comp.options != null && comp.options.length > 1){
    			var arr = [];
    			for (var i = 0; i < comp.options.length;  i++){
    				arr[i] = comp.options[i];
    			}
    			arr.sort(versionComparator);
    			for (var i = 0; i < arr.length;  i++){
    				comp.options[i] = arr[i];
    			}
    		}
    	}
    }

