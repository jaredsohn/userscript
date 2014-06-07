// ==UserScript==
// @name           LoU City Sort
// @description    Sorts your cities by their reference
// @namespace      bx2
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.2.5
// ==/UserScript==

(function(){
var LoUSortMain = function(){
	function createSorter() {
		var louSort = {};
		qx.Class.define("louSort.main", {
			type: "singleton",
			extend: qx.core.Object,
			members: {
				citySelect: null,
				initialize: function(){
				
					var srvBar = qx.core.Init.getApplication().serverBar;
					btn = new qx.ui.form.Button("S");

					window.p.getPrevNextCity = function(next){
						var cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
						var curc = cityList.getSelection();
						var cities = cityList.getSelectables();
						var ncity = "";
						for(var i=0;i < cities.length; i++){
							if(cities[i].getModel() == curc[0].getModel() && next){
								if(i+1 < cities.length){
									ncity = cities[i+1].getModel();
								}else{
									ncity = cities[0].getModel();
								}
							}else if(cities[i].getModel() == curc[0].getModel() && !next){
								if(i-1 > -1){
									ncity = cities[i-1].getModel();
								}else{
									ncity = cities[cities.length-1].getModel();
								}
							}
						}
						return ncity;
					}
					
					function sortCityList(){
						var cityList = qx.core.Init.getApplication().cityBar.citiesSelect;
						var prevc = cityList.getSelection();
						function sortList(a,b){
							var al = a.$$user_label;
							var bl = b.$$user_label;
							if(al.substr(al.indexOf("[")) < bl.substr(bl.indexOf("["))) return -1;
							if(al.substr(al.indexOf("[")) > bl.substr(bl.indexOf("["))) return 1;
							return 0;
						}
						var sorted = cityList.getSelectables().sort();
						sorted = sorted.sort(sortList);
						for(var i=0;i<sorted.length; i++){
							cityList.addAt(sorted[i], i);
						}
						
						function sortObject(o) {
							function sortName(a,b){
								if(o[a].name<o[b].name)return -1;
								if(o[a].name>o[b].name)return 1;
								return 0;
							}
							function sortRef(a,b){
								if(o[a].reference<o[b].reference)return -1;
								if(o[a].reference>o[b].reference)return 1;
								return 0;
							}
							var sorted = {},
							key, a = [];

							for (key in o) {
								if (o.hasOwnProperty(key)) {
										a.push(key);
								}
							}

							a.sort(sortName);
							a.sort(sortRef);

							for (key = 0; key < a.length; key++) {
								sorted[a[key]] = o[a[key]];
							}
							return sorted;
						}
						window.p.cities = sortObject(window.p.cities);
						cityList.setSelection(prevc);
					}
					sortCityList();
					btn.set({width: 30, appearance: "button-text-small", toolTipText: "Sort city list"});
					btn.addListener("click", sortCityList);
					srvBar.add(btn, {top: 2, left: 425});

				}
			}
		});
	}
	
	//Code from LoUTweak
	function LS_checkIfLoaded() {
		try {
			if (typeof qx != 'undefined') {
				a = qx.core.Init.getApplication(); // application
				c = a.cityInfoView;
				ch = a.chat;
				wdst = webfrontend.data.ServerTime.getInstance().refTime;
				if (a && c && ch && wdst) {
					createSorter();
					window.louSort.main.getInstance().initialize();
				} else
					window.setTimeout(LS_checkIfLoaded, 1000);
			} else {
				window.setTimeout(LS_checkIfLoaded, 1000);
			}
		} catch (e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	}
	if (/lordofultima\.com/i.test(document.domain))
		window.setTimeout(LS_checkIfLoaded, 1000);
}
	//Code from LoUTweak
	var louSortScript = document.createElement("script");
	louSortScript.id = "testing";
	txt = LoUSortMain.toString();
	if (window.opera != undefined)
		txt = txt.replace(/</g,"&lt;"); // rofl Opera
	louSortScript.innerHTML = "(" + txt + ")();";
	louSortScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(louSortScript);

})();