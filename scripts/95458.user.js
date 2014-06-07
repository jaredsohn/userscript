// ==UserScript==
// @name           Google Search Filter Plus v2.0
// @namespace      http://userscripts.org/users/qwerty3794
// @description    Selected web-sites aren't displayed from Google search result, enhancement from original Google Search Filter Plus
// @include		http://www.google.*/search*
// @Note			
// ==/UserScript==

/**************************************************\
			Script Copyright:
====================================================
Written by smk
 
 Released under the CCL by-nc-na ja license.
 http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
\***************************************************/

/**************************************************\
			Thanks to (credits):
====================================================
Bug testers:
ekbookworldwide
\***************************************************/

/**************************************************\
		The Original Script Copyright:
====================================================
 Written by leva.
 http://note.openvista.jp/212/
 
 Released under the CCL by-nc-na ja license.
 http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
\***************************************************/


/***********************************************************************\
To-do:
	add syntax highlighting
	add filters group option: "add", "add in group": whenever in-group is selected
	add 'ok & update' option to filter composer
	fix the url thing: has weird string added each time use composer
	Add syntax checking
	Add test filter option (simply add another 'result' in google search)
\***********************************************************************/

/***********************************************************************\
History:
	v0.06 (19/01/09):
		fixed some problems regarding different search results (news items, etc.)
		fixed filter starting/ending with space problems (in filter editor);
	v0.05 (18/01/09):
		fixed 'summary' option error
	v0.04 (17/01/09):
		made filtering faster (by buffering nodes)
		added processing of exceptions
		add 'optimize' function in filter composer
		changed 'block' string to 'filter' (thanks to ekbookworldwide)
		whenever block a new site, show filter composer
		added 'search box' filter: searchstr
	v0.03 (08/01/09):
		Fixed initial filters problem
	v0.02 (04/01/09):
		Fixed title not showing original filter
	v0.01:
		Many changes to original script
\***********************************************************************/

(function(){
	var SearchFilter = {
		// == Config ==================
		
		// Default blocked sites
		// CAUTION: Script DO NOT use this list if you used "Filters Editor".
		filters: [
		],
		
		// Default blocked hidden mode
		hidden: false,
		// Font color(CSS's value)
		fontColor: "#999",
		// Font size(CSS's value)
		characterSize: "90%",
		// Use "Filters Editor"
		useEditor: true,
		
		// == Config end ==============
		
		
		list: [],
		
		init: function(){
			Language.init();
			
			SearchFilter.hidden=GM_getValue("mode", SearchFilter.hidden);
			SearchFilter.list=eval(GM_getValue("filter")) || SearchFilter.filters.sort();
			
			if(SearchFilter.useEditor) EditFilter.init();
			
			SearchFilter.doFiltering(getSearchResults());
			addFilter(function(elm){
				for(var i = 0, l = elm.length; i < l; i++){
					if(elm[i].firstChild.className != "g") continue;
					SearchFilter.doFiltering($X(".//div[@class='g']", elm[i]));
					break;
				}
			});
		},
		
		doFiltering: function(results,actualPage){
			var i,j,b,l;
			var result=results.length;
			var typeOptions=[];
			var blockedList=new Array(results.length);
			var matchedFilter=new Array(results.length);
			var searchBoxValue=getSearchBox().value;
			var title;
			for(i=0,l=results.length;i<l;i++){
				title=getSearchTitle(results[i]);
				typeOptions.push({
					'node': results[i],
					'title': title,
					'anchor': getSearchAnchor(title),
					'description': getSearchDescription(results[i]),
				});
			}
			var filtersOptz=SearchFilter.optimize(SearchFilter.list);
			var filters=filtersOptz[1];
			var allowFilters=filtersOptz[3];
			l=results.length;
			for(i=0;i<l;i++){
				for(j=0,b=filters.length;j<b;j++){
					if(SearchFilter.match(filters[j],searchBoxValue,typeOptions[i])){
						blockedList[i]=false;
						matchedFilter[i]=filtersOptz[0][j];
						break;
					}
				}
			}
			for(i=0;i<l;i++){
				for(j=0,b=allowFilters.length;j<b;j++){
					if(SearchFilter.match(allowFilters[j],searchBoxValue,typeOptions[i])){
						blockedList[i]=true;
						matchedFilter[i]=null;
						break;
					}
				}
			}
			if(actualPage!=false){
				for(i=0;i<l;i++){
					if(blockedList[i]==false){
						SearchFilter.hideNode(typeOptions[i],SearchFilter.list[matchedFilter[i]]);
					}
					else{
						if(SearchFilter.useEditor) EditFilter.createLink(typeOptions[i]);
					}
				}
			}
			return blockedList.length;
		},
		
		optimize: function(origFilters){
			var allowFilters=[];
			var index=[],allowIndex=[];
			var i,j;
			if(origFilters==null) throw "Argument error";
			filters=origFilters.concat();
			for(i=0,j=0;i<filters.length;i++,j++){
				//remove comment
				filters[i]=filters[i].replace(/\!.*?[^\\]\!/g,"").replace(/^[\s\t]+/,"").replace(/[\s\t]+$/,"");
				//null or comment filter
				if(filters[i]=="" || filters[i].charAt(0)=='!'){
					filters.splice(i,1);
					i--;
				}else{
					if(/^@@/.test(filters[i])){
						allowIndex.push(j);
						allowFilters.push(filters[i].substr(2));
						filters.splice(i,1);
						i--;
					}else{
						index.push(j);
					}
				}
			}
			return [index,filters,allowIndex,allowFilters];
		},
		
		match: function(filter,searchBoxValue,typeOptions){
			if(filter==null || typeof(filter)!='string') throw "Argument error";			
			if(/^\{.*\}$/.test(filter)){
				//programmable filter
				filter=filter.replace(/([^\w\.\\])(match\(.*?\")\)/g,"$1SearchFilter.$2,searchBoxValue,typeOptions)").replace(/^\{(.*)\}$/,"$1");
				return eval("hide=function(){\
							"+filter+
						"}();"
					);
			}
			if(/\$[\w,]+$/.test(filter)){
				var options=filter.match(/\$((\w+,)*\w+)$/)[1].toLowerCase().split(",");
				filter=filter.match(/^(.*)\$[\w,]+$/)[1];
				for(var k=0;k<options.length;k++){
					regexp=createRegex(filter);
					switch(options[k]){
						case "summary": if(regexp.test(typeOptions.description.innerHTML.match(/(.*?)<cite>/)[1].replace(/<[^>]+>/g,""))) return true;
						case "title": if(regexp.test(typeOptions.title.textContent)) return true;
						case "searchstr": if(regexp.test(searchBoxValue)) return true;
					}
				}
			}else{
				regexp=createRegex(filter);
				if(regexp.test(typeOptions.anchor.href)) return true;
			}
			return false;
		},
		
		hideNode: function(typeOptions,matchedFilter){
			if(SearchFilter.hidden){
				typeOptions.node.style.display="none";
			}else{
				with(typeOptions){
					anchor.style.color=SearchFilter.fontColor; // for other scripts
					title.style.color=SearchFilter.fontColor;
					title.style.fontSize=SearchFilter.characterSize;
					description.style.display="none";
				}
				//add "show" to title
				var show=document.createElement("a");
				with(show){
					innerHTML=Language[Language.lang].show;
					href="javascript:void(0);";
					style.color=SearchFilter.fontColor;
					style.fontSize="90%";
					title=matchedFilter;
					setAttribute('hide',1);
				}
				with(typeOptions.title.nextSibling){
					innerHTML+='&nbsp;-&nbsp;';
					appendChild(show);
				}
				show.addEventListener("click",function(e){
					var res=this;
					while(!isSearchResult(res)) res=res.parentNode;
					if(this.getAttribute('hide')==1){
						this.innerHTML=Language[Language.lang].hide;
						getSearchDescription(res).style.display='';
						this.setAttribute('hide',0);
					}else{
						this.innerHTML=Language[Language.lang].show;
						getSearchDescription(res).style.display='none';
						this.setAttribute('hide',1);
					}
				},false);
			}
			return true;
		},
	}
	
	var EditFilter = {
		list: [],
		filter: "",
		exprtJoin: "\n",
		timer: null,
		
		init: function(){
			EditFilter.list = eval(SearchFilter.list.toSource());
			//add filter options
			var place = document.getElementById("ss-box").parentNode;
			with(place){
				parentNode.style.position = "relative";
				appendChild(document.createElement("br"));
				innerHTML += "&nbsp;&nbsp;";
			}
			var link = document.createElement("a");
			with(link){
				setAttribute("href", "javascript:void(0);");
				appendChild(document.createTextNode(Language[Language.lang].config));
				addEventListener("click", EditFilter.toggleDisplayList, false);
			}
			place.appendChild(link);
			
			var field = document.createElement("div");
			with(field){
				id = "google-search-filter";
				with(style){
					position = "absolute";
					top = place.parentNode.offsetTop + place.parentNode.offsetHeight + 10 + "px";
					right = "8px";
					width = place.parentNode.offsetWidth - 26 + "px";
					maxWidth = width;
					minWidth = "250px";
					padding = "8px";
					border = "1px solid #000";
					backgroundColor = "#eee";
					display = "none";
				}
			}
			
			var input = document.createElement("input");
			with(input){
				id = "filter-edit-area";
				setAttribute("name", "filter-edit-area");
				setAttribute("type", "text");
				addEventListener("focus", EditFilter.setTimer, false);
				addEventListener("blur", EditFilter.clearTimer, false);
				style.width = (place.parentNode.offsetWidth-100)+"px";
				style.minWidth = "150px";
				style.fontFamily = "'Lucida Console', 'Courier New', Courier, Monaco, monospace";
				style.fontSize = "80%";
			}
			field.appendChild(input);
			field.appendChild(document.createElement("br"));
			
			var select = document.createElement("select");
			with(select){
				id = "filter-list";
				setAttribute("name", "filter-list");
				setAttribute("size", 7);
				addEventListener("change", EditFilter.selectFilter, false);
				style.width = input.style.width;
				style.minWidth = "150px";
				style.maxWidth = "350px";
				style.height = "175px";
				style.cssFloat = "left";
			}
			
			var option = document.createElement("option");
			select.appendChild(option);
			EditFilter.list.forEach(function(value){
				option = document.createElement("option");
				option.appendChild(document.createTextNode(value));
				select.appendChild(option);
			});
			
			field.appendChild(select);
			
			["add", "edit", "remove", "reset", "imprt", "exprt"].forEach(function(value){
				var button = document.createElement("input");
				button.id = "filter-" + value;
				button.setAttribute("name", "filter-" + value);
				button.setAttribute("type", "button");
				button.setAttribute("value", Language[Language.lang][value]);
				if(["reset","imprt","exprt"].indexOf(value)==-1) button.setAttribute("disabled", "disabled");
				with(button.style){
					width = "60px";
					marginLeft = "8px";
					marginBottom = "4px";
				}
				button.addEventListener("click", EditFilter[value + "Filter"], false);
				field.appendChild(button);
				field.appendChild(document.createElement("br"));
			});
			
			var mode = document.createElement("label");
			mode.style.clear = "left";
			mode.style.cssFloat = "left";
			mode.style.fontSize = "90%";
			var check = document.createElement("input");
			check.id = "filter-mode";
			check.setAttribute("name", "filter-mode");
			check.setAttribute("type", "checkbox");
			if(SearchFilter.hidden) check.setAttribute("checked", "checked");
			mode.appendChild(check);
			mode.appendChild(document.createTextNode(" " + Language[Language.lang].mode));
			field.appendChild(mode);
			
			var p = document.createElement("p");
			p.style.clear = "left";
			p.style.margin = "0";
			p.style.paddingTop = "8px";
			p.style.borderTop = "1px solid #ccc";
			p.style.textAlign = "right";
			["ok", "cancel"].forEach(function(value){
				var button = document.createElement("input");
				button.id = "filter-" + value;
				button.setAttribute("name", "filter-" + value);
				button.setAttribute("type", "button");
				button.setAttribute("value", Language[Language.lang][value]);
				button.addEventListener("click", EditFilter[value + "Editing"], false);
				button.style.width = "75px";
				button.style.height = "27px";
				p.appendChild(button);
				p.appendChild(document.createTextNode(" "));
			});
			field.appendChild(p);
			
			place.parentNode.appendChild(field);
		},
		
		createLink: function(typeOptions){
//			var span = document.createElement("span");
//			span.className = "bl";
//			var link = document.createElement("a");
//			link.className = "fl2";
//			link.setAttribute("href", "#" + typeOptions.anchor.host);
//			link.appendChild(document.createTextNode(Language[Language.lang].block));
//			link.addEventListener("click", EditFilter.addFromLink, false);
//			span.appendChild(document.createTextNode(" - "));
//			span.appendChild(link);
//			var position=typeOptions.description;
//			position.appendChild(span);

			var button = document.createElement("input");
			button.id = "instant-add";
			button.setAttribute("name", "instant-add");
			button.setAttribute("type", "button");
			button.setAttribute("value", "+");
			button.setAttribute("title", "#" + typeOptions.anchor.host);
			with(button.style){
				width = "20px";
				marginLeft = "8px";
				marginBottom = "4px";
			}
			button.addEventListener("click", EditFilter["addInstant"], false);
			var position=typeOptions.description;
			position.appendChild(button);
		},
		
		addFromLink: function(event){
			var filter=event.target.href.match(/#([\w.-]+)$/)[1];
			alert(filter);
			EditFilter.toggleDisplayList(event);
			document.getElementById("filter-edit-area").value=filter;
			var button=document.getElementById("filter-add");
			button.removeAttribute("disabled");
			event.preventDefault();
		},
	
		addList: function(filter){
			if(EditFilter.isFilterAdded(filter) == null) return;
			EditFilter.list.push(filter);
			EditFilter.updateFilterList();
			SearchFilter.list = eval(EditFilter.list.toSource());
			GM_setValue("filter", SearchFilter.list.toSource());
		},
		
		addFilter: function(event){
			var filter=EditFilter.getEditedFilter().replace(/^\s+/,'').replace(/\s+$/,'');
			EditFilter.setEditedFilter(filter);
			EditFilter.filter=filter;
			if(EditFilter.isFilterAdded(filter) == null) return;
			EditFilter.list.push(filter);
			EditFilter.updateFilterList(filter);
			EditFilter.resetEnableButton();
		},
		addInstant: function(event){
			var filter=event.target.title.match(/#([\w.-]+)$/)[1];
			if(EditFilter.isFilterAdded(filter) == null) return;
			EditFilter.list.push(filter);
			EditFilter.updateFilterList(filter);
			SearchFilter.list = eval(EditFilter.list.toSource());
			GM_setValue("filter", SearchFilter.list.toSource());
			GM_setValue("mode", document.getElementById("filter-mode").checked);
			history.go(0);
		},
		
		isFilterAdded: function(filter){
			for(var i = 0, l = EditFilter.list.length; i < l; i++){
//				var regexp = regexp(EditFilter.list[i]);
//				if(("http://" + filter + "/").match(regexp) != null){
				if(filter == EditFilter.list[i]){
					alert(Language[Language.lang].addedPrefix + filter + Language[Language.lang].addedSuffix);
					return null;
				}
			}
			return 1;
		},
		
		editFilter: function(event){
			var filter = EditFilter.getEditedFilter();
			if(EditFilter.filter == filter){
				alert("'" + filter + "' " + Language[Language.lang].notEdited);
				return;
			}
			for(var i = 0, l = EditFilter.list.length; i < l; i++){
				if(EditFilter.filter == EditFilter.list[i]){
					EditFilter.list[i] = filter;
					break;
				}
			}
			EditFilter.filter = filter;
			EditFilter.updateFilterList(filter);
			EditFilter.resetEnableButton();
		},
		
		removeFilter: function(event){
			var filter = EditFilter.getEditedFilter();
			for(var i = 0, l = EditFilter.list.length; i < l; i++){
				if(filter == EditFilter.list[i]){
					EditFilter.list.splice(i, 1);
					EditFilter.updateFilterList();
					EditFilter.filter = document.getElementById("filter-edit-area").value = "";
					event.target.setAttribute("disabled", "disabled");
					return;
				}
			}
			alert("'" + filter + "' " + Language[Language.lang].notFound);
		},
		
	imprtFilter: function(event){
		$X('.//button[@name="ok"]',EditFilter.editWhole(EditFilter.list.join(EditFilter.exprtJoin)))[0].addEventListener('click',function(e){
			EditFilter.list=$X('.//textarea[@name="txt"]',this.parentNode)[0].value.split(EditFilter.exprtJoin);
			for(var i=0;i<EditFilter.list.length;i++)
				if(EditFilter.list[i]==''){
					EditFilter.list.splice(i,1);
					i--;
				}
			if(EditFilter.list.length==0) EditFilter.list=['!null!'];
			EditFilter.updateFilterList();
		},false);
	},
	
	exprtFilter: function(event){
		if(!SearchFilter.list || SearchFilter.list.length==0) alert(Language[Language.lang].noFilters);
		else EditFilter.editWhole(EditFilter.list.join(EditFilter.exprtJoin));
		},
		
	editWhole: function(text){
		var exprt=document.createElement('div');
		exprt.innerHTML='<textarea name="txt" rows="5" style="width:100%;overflow-y:scroll;overflow-x:hidden;" wrap="virtual">'+text+'</textarea>';
		with(exprt.style){
			position='absolute';
			zIndex=65535;
			left='0'; top='0'; width='100%';
		}
		var close=document.createElement('button');
		close.style.width="50%";
		close.name="ok";
		close.setAttribute("onclick","this.parentNode.parentNode.removeChild(this.parentNode);return false");
		close.innerHTML=Language[Language.lang].ok;
		exprt.appendChild(close);
		close=close.cloneNode(1);
		close.name="cancel";
		close.innerHTML=Language[Language.lang].cancel;
		exprt.appendChild(close);
		document.body.appendChild(exprt);
		exprt.firstChild.focus();
		exprt.firstChild.select();
		return exprt;
	},
	
		getEditedFilter: function(){
			return document.getElementById("filter-edit-area").value;
		},
		
		setEditedFilter: function(val){
			return document.getElementById("filter-edit-area").value=val;
		},
		
		resetFilter: function(event){
			if(confirm(Language[Language.lang].init)){
				EditFilter.list = SearchFilter.filters.sort()
				SearchFilter.list = eval(EditFilter.list.toSource());
				EditFilter.updateFilterList();
				EditFilter.filter = document.getElementById("filter-edit-area").value = "";
			}
		},
		
		okEditing: function(event){
			SearchFilter.list = eval(EditFilter.list.toSource());
			GM_setValue("filter", SearchFilter.list.toSource());
			GM_setValue("mode", document.getElementById("filter-mode").checked);
			EditFilter.toggleDisplayList(event);
			history.go(0);
		},
		
		cancelEditing: function(event){
			EditFilter.list = eval(SearchFilter.list.toSource());
			EditFilter.updateFilterList();
			EditFilter.toggleDisplayList(event);
		},
		
		updateFilterList: function(filter){
			EditFilter.list.sort();
			var list = document.getElementById("filter-list");
			while(list.firstChild){
				list.removeChild(list.firstChild);
			}
			var option = document.createElement("option");
			list.appendChild(option);
			EditFilter.list.forEach(function(value){
				var option = document.createElement("option");
				option.appendChild(document.createTextNode(value));
				list.appendChild(option);
			});
			if(filter){
				for(var i = 0, l = list.childNodes.length; i < l; i++){
					if(filter == list.childNodes[i].value){
						list.childNodes[i].selected = true;
						return;
					}
				}
			}
		},
		
		selectFilter: function(event){
			EditFilter.filter = document.getElementById("filter-edit-area").value = event.target.value;
			EditFilter.resetEnableButton();
			if(event.target.value == "")
				document.getElementById("filter-remove").setAttribute("disabled", "disabled");
		},
		
		setTimer: function(event){
			EditFilter.timer = setInterval(EditFilter.checkValue, 250);
		},
		
		clearTimer: function(event){
			clearInterval(EditFilter.timer);
			EditFilter.timer = null;
		},
		
		checkValue: function(){
			var add = document.getElementById("filter-add");
			var edit = document.getElementById("filter-edit");
			var filter = document.getElementById("filter-edit-area").value;
			if(filter == ""){
				[add, edit].forEach(function(button){
					button.setAttribute("disabled", "disabled");
				});
			}
			else if(EditFilter.filter == "" && filter != ""){
				add.removeAttribute("disabled");
			}
			else if(filter != EditFilter.filter){
				[add, edit].forEach(function(button){
					button.removeAttribute("disabled");
				});
			}
			else{
				[add, edit].forEach(function(button){
					if(!button.hasAttribute("disabled")) button.setAttribute("disabled", "disabled");
				});
			}
		},
		
		resetEnableButton: function(){
			["add", "edit"].forEach(function(value){
				var button = document.getElementById("filter-" + value);
				if(!button.hasAttribute("disabled")){
					button.setAttribute("disabled", "disabled");
				}
			});
			button = document.getElementById("filter-remove");
			if(button.hasAttribute("disabled")){
				button.removeAttribute("disabled");
			}
		},
		
		toggleDisplayList: function(event){
			var list = document.getElementById("google-search-filter");
			list.style.display = list.style.display == "none" ? "block" : "none";
			event.preventDefault();
		},
	}
	
	var Language = {
		lang: "en",
		
		init: function(){
			var lang = navigator.language.substring(0,2);
			Language.lang = Language[lang] ? lang : "en";
		},
		
		ja: {
		config			: "\u30d5\u30a3\u30eb\u30bf\u8a2d\u5b9a",
		add				: "\u8ffd\u52a0",
		edit			: "\u7de8\u96c6",
		remove			: "\u524a\u9664",
		reset			: "\u521d\u671f\u5024",
		mode			: "\u30d5\u30a3\u30eb\u30bf\u306b\u30de\u30c3\u30c1\u3057\u305f\u7d50\u679c\u3092\u975e\u8868\u793a",
		ok				: "OK",
		cancel			: "\u30ad\u30e3\u30f3\u30bb\u30eb",
		show			: "\u898b\u305b\u308b",
		hide			: "\u96A0\u3059",
		block			: "\u30d6\u30ed\u30c3\u30af",
		blocked			: "\u30d6\u30ed\u30c3\u30af\u6e08!",
		addPrefix		: "'",
		addSuffix		: "' \u3092\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3057\u307e\u3059\u304b?",
		addedPrefix		: "'",
		addedSuffix		: "' \u306f\u65e2\u306b\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3055\u308c\u3066\u3044\u307e\u3059\u3002",
		notEdited		: "\u306f\u7de8\u96c6\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002",
		notFound		: "\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002",
		init			: "\u30d5\u30a3\u30eb\u30bf\u30ea\u30b9\u30c8\u3092\u521d\u671f\u5316\u3057\u307e\u3059\u304b\uff1f",
		},
		
		en: {
		config			: "Config Filters",
		add				: "Add",
		edit			: "Edit",
		remove			: "Delete",
		reset			: "Reset",
		imprt			: "Import",
		exprt			: "Export",
		mode			: "Completely hide filtered result",
		ok				: "OK",
		cancel			: "Cancel",
		show			: "Show",
		hide			: "Hide",
		block			: "Filter",
		blocked			: "Filtered!",
		addPrefix		: "Add '",
		addSuffix		: "' to filter list?",
		addedPrefix		: "Filter'",
		addedSuffix		: "'already exists.",
		notEdited		: "isn't edited.",
		notFound		: "isn't found.",
		init			: "Are you sure you want to reset all your filters?",
		},
	
	fr: {
		config			: "Conf. Filtres URL",
		add				: "Ajouter",
		edit			: "Editer",
		remove			: "Effacer",
		reset			: "R�Z",
		mode			: "Filtrer le r�sultat",
		ok				: "Valider",
		cancel			: "Annuler",
		show			: "Montrer",
		hide			: "Masquer",
		block			: "-Bloquer-",
		blocked			: "Bloqu� !",
		addPrefix		: "Ajouter '",
		addSuffix		: "' aux filtres?",
		addedPrefix		: "'",
		addedSuffix		: "' est ajout� aux filtres.",
		notEdited		: "Non �dit�.",
		notFound		: "Pas trouv�.",
		init			: "Voulez vous vraiment r�initialiser vos filtres?",
	},
	}
	
	/*
	 * $X function from nulog
	 * http://lowreal.net/logs/2006/03/16/1
	 *
	 * Thanks, cho45.
	 */
	function $X (exp, context) {
		if (!context) context = document;
		var resolver = function(prefix){
			var o = document.createNSResolver(context)(prefix);
			return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
		}
		var exp = document.createExpression(exp, resolver);
		
		var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
		switch(result.resultType){
			case XPathResult.STRING_TYPE : return result.stringValue;
			case XPathResult.NUMBER_TYPE : return result.numberValue;
			case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
			case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
				result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var ret = [];
				for(var i = 0, len = result.snapshotLength; i < len ; i++){
					ret.push(result.snapshotItem(i));
				}
				return ret;
			}
		}
		return null;
	}
	
	function $(e) document.getElementById(e);
	
	// For Autopagerize 0.0.12
	function addFilter(filter, i) {
		i = i || 4;
		if(window.AutoPagerize && window.AutoPagerize.addFilter){
			window.AutoPagerize.addFilter(filter);
		}
		else if(i > 1){
			setTimeout(arguments.callee, 1000, filter, i - 1);
		}
	}
	
	function getSearchResults() $X("//*[contains(@class,'g w')]")
								.concat($X("//*[contains(@class,'g s w')]"))
								.concat($X("//div[@class='g']"))
								.concat($X("//li[@class='g']"));
	function isSearchResult(e) /^g\sw/.test(e.getAttribute('class'));
	function getSearchBox() $X('//input[@type="text" and @title="Search"]')[0];
	function getSearchAnchor(title) $X(".//a", title)[0];
	function getSearchTitle(results) $X(".//h2[@class='r']", results)[0] || $X(".//h3[@class='r']", results)[0];
	function getSearchDescription(results) $X(".//*[@class='s' or @class='s hc' or @class='std']", results)[0] || $X(".//*[cite]", results)[0];
	function createRegex(filter){
		if(/^\/.*\/\w*$/.test(filter)) return eval(filter);
		/*custom flags:
			h: half-regex: accepts all regex symbols except "."
			u: url: adds into form of url
		*/
		if(/\|([a-z]+)$/.test(filter)){
			var flags=filter.match(/\|([a-z]+)$/)[1];
			filter=filter.replace("|"+flags,"");
			if(/h/.test(flags)) filter.replace(/\./g,"\\.");
			if(/u/.test(flags)) filter="^https?:\/\/" + filter + "\/";
			return new RegExp(filter,flags.replace(/[hu]/g,""));
		}
		return new RegExp(normToRegex(filter),"i");
	}
	//"**" means + in regex
	function normToRegex(reg) reg.replace(/(\.|\(|\)|\[|\]|\{|\}|\\|\^|\||\?|\=|\$)/g, "\\$1").replace(/\*\*/g, ".+").replace(/\*/g, ".*").replace(/\s/g,"\\s");

	if(document.body) SearchFilter.init();
})();
