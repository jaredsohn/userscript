// ==UserScript==
// @name          LiquidPlanner Better My Timesheet
// @description	  Improvements on the "My Timesheet" view for LiquidPlanner
// @author        kynatro
// @homepage      http://www.dtelepathy.com
// @include       https://app.liquidplanner.com/*

// ==/UserScript==
var _BLP;
(function() {
	if(document.URL.match('app.liquidplanner.com')){
		_BLP = {
			cookie_expire: 90,	// Days until the cookie expires
			elements: {},
			css: "@namespace url(http://www.w3.org/1999/xhtml); #timesheet_period_header th { border-top: none !important; } #timesheet_period_header th.label h1 { float:left; } #blp_sort_container { font-weight:bold; float:right; width:auto; } .separatorRow td { padding:5px 0; font-size:16px; font-weight:bold; background:#0070bf; border-top: 1px solid #ddd; color: #fff; } .completedSeparator td { background-color: #63AB0A } .vacationsSeparator td { background-color: #ffc000; color: #673601; }",
			
			sortOptions: [
				{
					value: 'priority',
					label: 'Priority',
					order: ['Highest','Lowest']
				},
				{
					value: 'client',
					label: 'Client',
					order: ['A-Z','Z-A']
				},
				{
					value: 'project',
					label: 'Project',
					order: ['A-Z','Z-A']
				}
			],
			
			isCompleted: function(e){
				var inputs = e.getElementsByTagName('input');
				for(var i=0, theInput; i<inputs.length; i++){
					var d = inputs[i];
					if(d.name == "is_done" && d.type == "checkbox"){
						theInput = d;
					}
				}
				r = false;
				try{
					r = theInput.checked;
				} catch(e){}
				return r;
			},
			
			isEvent: function(e){
				var icons = e.getElementsByTagName('img');
				for(var i=0, theIcon; i<icons.length; i++){
					var icon = icons[i];
					if(icon.className.indexOf('ti_event_icon') != -1){
						theIcon = icon;
					}
				}
				return (typeof(theIcon) != "undefined");
			},
			
			getElements: function(){
				this.elements.rows = [];
				var tb = document.getElementsByTagName('tbody');
				for(var i=0; i<tb.length; i++){
					if (tb[i].className.indexOf('task_body') != -1) {
						this.elements.rows.push(tb[i]);
					}
				}
			},
			
			getClientName: function(row){
				var tds = row.getElementsByTagName('td');
				for(var ir=0; ir < tds.length; ir++){
					if(tds[ir].className.indexOf('task_name') != -1){
						var spans = tds[ir].getElementsByTagName('span');
						for(var irs=0; irs < spans.length; irs++){
							if(spans[irs].className.indexOf("breadcrumb") != -1){
								var as = spans[irs].getElementsByTagName('a');
								return as[0].innerHTML;
							}
						}
					}
				}
			},
			
			getProjectName: function(row){
				var tds = row.getElementsByTagName('td');
				for(ir=0; ir < tds.length; ir++){
					if(tds[ir].className.indexOf('task_name') != -1){
						var spans = tds[ir].getElementsByTagName('span');
						for(irs=0; irs < spans.length; irs++){
							if(spans[irs].className.indexOf("breadcrumb") != -1){
								var as = spans[irs].getElementsByTagName('a');
								return as[1].innerHTML;
							}
						}
					}
				}
			},
			
			createElements: function(){
				var el_container = document.createElement('DIV');
					el_container.id = "blp_sort_container";
					el_container.appendChild(document.createTextNode("Sort By: "));
				var el_select_sort = document.createElement('SELECT');
					el_select_sort.id = "blp_select_sort";
				
				for(var i = 0; i < this.sortOptions.length; i++){
					el_select_sort.add(new Option(this.sortOptions[i].label, this.sortOptions[i].value), null)
				}
				el_container.appendChild(el_select_sort);
				el_container.appendChild(document.createTextNode(" "));

				for(var i = 0; i < this.sortOptions.length; i++) {
					var el_order = document.createElement('SELECT');
					el_order.id = "blp_select_order_" + this.sortOptions[i].value;
					for (x = 0; x < this.sortOptions[i]['order'].length; x++) {
						el_order.add(new Option(this.sortOptions[i].order[x], this.sortOptions[i].order[x]), null)
					}
					
					el_container.appendChild(el_order);
				}
				
				this.elements.header.appendChild(el_container);
				
				var selects = document.getElementById("blp_sort_container").getElementsByTagName('SELECT');
				for(var i = 0; i < selects.length; i++){
					if(i > 1){
						selects[i].style.display = "none";
					}
				}
				
				var heads = document.getElementsByTagName("head");
				if (heads.length > 0) {
					var node = document.createElement("style");
					node.type = "text/css";
					node.appendChild(document.createTextNode(this.css));
					heads[0].appendChild(node); 
				}
			},
			
			assignEvent: function(){
				document.getElementById('blp_select_sort').addEventListener('change',function(){
					var selects = document.getElementById("blp_sort_container").getElementsByTagName('SELECT');
					for(var i = 0; i < selects.length; i++){
						if(i > 0){
							selects[i].style.display = "none";
						}
					}

					var order = document.getElementById("blp_select_order_" + this.value);
					order.removeAttribute('style');
					switch(this.value){
						case "client":
							_BLP.sortByClient(order);
						break;
						case "priority":
							_BLP.sortByPriority(order);
						break;
						case "project":
							_BLP.sortByProject(order);
						break;
					}
				},false);
				
				for(var i = 0; i < this.sortOptions.length; i++){
					var order = document.getElementById("blp_select_order_" + this.sortOptions[i].value);
					order.addEventListener('change',function(){
						switch(this.id.split("_")[3]){
							case "client":
								_BLP.sortByClient(this);
							break;
							case "priority":
								_BLP.sortByPriority(this);
							break;
							case "project":
								_BLP.sortByProject(this);
							break;
						}
					},false);
				}
			},
			
			sortByClient: function(e){
				var sortedRows = this.elements.rows;
				var order = typeof e == "string" ? e : e.value;

				sortedRows.sort(function(a,b){
					var r = 0;
					
					var clientNameA = _BLP.getClientName(a).toLowerCase().replace('-','');
					var clientNameB = _BLP.getClientName(b).toLowerCase().replace('-','');
					
					if(clientNameA < clientNameB) r = -1;
					if(clientNameA > clientNameB) r = 1;
					if(clientNameA == clientNameB) r = 0;
					
					return r;
				});
				
				if(order == "Z-A"){
					sortedRows.reverse();
				}

				this.updateCookie("client",order);
				this.reorderRows(sortedRows);
			},
			
			sortByProject: function(e){
				var sortedRows = this.elements.rows;
				var order = typeof e == "string" ? e : e.value;

				sortedRows.sort(function(a,b){
					var r = 0;
					
					var projectNameA = _BLP.getProjectName(a).toLowerCase().replace('-','');
					var projectNameB = _BLP.getProjectName(b).toLowerCase().replace('-','');
					
					if(projectNameA < projectNameB) r = -1;
					if(projectNameA > projectNameB) r = 1;
					if(projectNameA == projectNameB) r = 0;
					
					return r;
				});
				
				if(order == "Z-A"){
					sortedRows.reverse();
				}

				this.updateCookie("client",order);
				this.reorderRows(sortedRows);
			},
			
			sortByPriority: function(e){
				var sortedRows = this.elements.rows.slice(0);
				var order = typeof e == "string" ? e : e.value;

				if(order == "Lowest"){
					sortedRows.reverse();
				}

				this.updateCookie("priority",order);
				this.reorderRows(sortedRows);
			},
			
			reorderRows: function(sortedRows){
				var el_active = [], el_completed = [], el_events = [], previousRowName = "";
				
				var tbodies = document.getElementsByTagName('TBODY');
				for(var i = 0; i < tbodies.length; i++){
					if(tbodies[i].className.indexOf("separatorRow") != -1){
						tbodies[i].parentNode.removeChild(tbodies[i]);
					}
				}
				
				// Sort Task Rows
				for(i=0;i<sortedRows.length;i++){
					var s = sortedRows[i];
					var isCompleted = this.isCompleted(s);
					var isEvent = this.isEvent(s);
					
					if(!isCompleted && !isEvent){
						el_active.push(s);
					} else if(isCompleted) {
						el_completed.push(s);
					} else if(isEvent) {
						el_events.push(s);
					}
				}
				
				// Vacations and Time off
				if(el_events.length > 0){
					this.elements.rows[0].parentNode.appendChild(this.makeSeparator("Vacations/Time Off"));
					
					for(i=0;i<el_events.length;i++){
						this.elements.rows[i].parentNode.appendChild(el_events[i]);
					}
				}
				
				// Active Tasks
				for(i=0;i<el_active.length;i++){
					var s = el_active[i];
					
					if(/client|project/.test(document.getElementById('blp_select_sort').value)){
						var thisRowName = "";
						switch(document.getElementById('blp_select_sort').value){
							case "client":
								thisRowName = this.getClientName(s);
							break;
							case "project":
								thisRowName = this.getProjectName(s);
							break;
						}
						
						if(thisRowName != previousRowName){
							this.elements.rows[i].parentNode.appendChild(this.makeSeparator(thisRowName));
						}
						previousRowName = thisRowName;
					}

					this.elements.rows[i].parentNode.appendChild(s);
				}
				
				// Completed Tasks
				if(el_completed.length > 0){
					this.elements.rows[0].parentNode.appendChild(this.makeSeparator("Completed Tasks"));
					
					for(i=0;i<el_completed.length;i++){
						this.elements.rows[i].parentNode.appendChild(el_completed[i]);
					}
				}
				
				sortedRows = [];
				
				var footer_row = document.getElementById('timesheet_period_footer').parentNode;
				footer_row.parentNode.appendChild(footer_row);
			},
			
			makeSeparator: function(thisRowName){
				var el_tbody = document.createElement('TBODY');
					el_tbody.className = "separatorRow";
					if(thisRowName == "Completed Tasks"){
						el_tbody.className+= " completedSeparator";
					}
					if(thisRowName == "Vacations/Time Off"){
						el_tbody.className+= " vacationsSeparator";
					}
				var el_tbody_row = document.createElement('TR');

				for(var r = 0; r < 3; r++){
					el_tbody_row.appendChild(document.createElement('TD'));
				}
				var el_tbody_col = document.createElement('TD');
					el_tbody_col.colspan = "2";
					el_tbody_col.appendChild(document.createTextNode(thisRowName));
				el_tbody_row.appendChild(el_tbody_col);

				for(var r = 4; r < 14; r++){
					el_tbody_row.appendChild(document.createElement('TD'));
				}
				el_tbody.appendChild(el_tbody_row);
				
				return el_tbody;
			},
			
			updateCookie: function(sort,order){
				var today = new Date();
				today.setTime( today.getTime() );
				var expires = this.cookie_expire * 1000 * 60 * 60 * 24;
				var expires_date = new Date( today.getTime() + (expires) );
				document.cookie = "BLP_sort=" + sort + ";expires=" + expires_date.toGMTString();
				document.cookie = "BLP_order=" + order + ";expires=" + expires_date.toGMTString();
			},
			
			getPreviousSort: function(){
				var crumbs = document.cookie.split(';');
				var sort = "";
				var order = "";

				for(var i = 0; i < crumbs.length; i++){
					var pieces = crumbs[i].split("=");
					switch(pieces[0].replace(/^\s+|\s+$/g, '')){
						case "BLP_sort":
							sort = pieces[1].replace(/^\s+|\s+$/g, '');
						break;
						case "BLP_order":
							order = pieces[1].replace(/^\s+|\s+$/g, '');
						break;
					}
				}
				
				var sort_select = document.getElementById('blp_select_sort');
				var order_select_client = document.getElementById('blp_select_order_client');
				var order_select_priority = document.getElementById('blp_select_order_priority');
				var order_select_project = document.getElementById('blp_select_order_project');
				
				sort_select.value = sort;
				for(s=0; s < sort_select.options.length; s++){
					sort_select.options[s].selected = sort_select.options[s].value == sort ? true : false;
				}
				switch(sort){
					case "client":
						order_select_client.style.display = 'inline';
						order_select_priority.style.display = 'none';
						order_select_project.style.display = 'none';
						order_select_client.value = order;
						for(s=0; s < order_select_client.options.length; s++){
							order_select_client.options[s].selected = order_select_client.options[s].value == order ? true : false;
						}
						this.sortByClient(order);
					break;
					case "priority":
						order_select_client.style.display = 'none';
						order_select_priority.style.display = 'inline';
						order_select_project.style.display = 'none';
						order_select_priority.value = order;
						for(s=0; s < order_select_priority.options.length; s++){
							order_select_priority.options[s].selected = order_select_priority.options[s].value == order ? true : false;
						}
						this.sortByPriority(order);
					break;
					case "project":
						order_select_client.style.display = 'none';
						order_select_priority.style.display = 'none';
						order_select_project.style.display = 'inline';
						order_select_project.value = order;
						for(s=0; s < order_select_project.options.length; s++){
							order_select_project.options[s].selected = order_select_project.options[s].value == order ? true : false;
						}
						this.sortByProject(order);
					break;
				}
			},
			
			setupAnchor: function(){
				var totals_row = document.getElementById('timesheet_period_header');
				var totals_row_parent = totals_row.parentNode;
				totals_row_parent.style.position = 'relative';
				totals_row.getElementsByTagName('TH')[0].style.width = totals_row.getElementsByTagName('TH')[0].clientWidth - 20 + 'px';
				totals_row.getElementsByTagName('TH')[totals_row.getElementsByTagName('TH').length-1].style.width = '20px';
				
				if(window.navigator.userAgent.match("Firefox")){
					window.addEventListener('DOMMouseScroll',function(event){
						_BLP.watchScroll();
					},false);
				} else {
					window.addEventListener('mousewheel',function(event){
						_BLP.watchScroll();
					},false);
				}
				window.addEventListener('scroll',function(event){
					_BLP.watchScroll();
				},false);
			},
			
			watchScroll: function(){
				var totals_row = document.getElementById('timesheet_period_header');
				var totals_row_parent = totals_row.parentNode;
				if(window.pageYOffset >= 219){
					totals_row_parent.style.width = totals_row.clientWidth + 'px';
					totals_row_parent.style.position = 'fixed';
					totals_row_parent.style.top = 0;
					totals_row_parent.style.zIndex = 10000;
				} else {
					totals_row_parent.style.position = 'relative';
				}
			},
			
			reInitialize: function(){
				this.elements.header = document.getElementById('timesheet_period_header').getElementsByTagName('th')[0];
				
				this.getElements();
				
				for(var i=0; i<this.elements.rows.length; i++){
					var tds = this.elements.rows[i].getElementsByTagName('td');
					for(ir=0; ir < tds.length; ir++){
						if(tds[ir].className.indexOf('task_name') != -1){
							var spans = tds[ir].getElementsByTagName('span');
							for(irs=0; irs < spans.length; irs++){
								if(spans[irs].className.indexOf("breadcrumb") != -1){
									spans[irs].style.fontSize = "11px";
									var as = spans[irs].getElementsByTagName('a');
									as[0].style.fontWeight = "bold";
									as[0].style.color = "#333333";
								}
							}
						}
					}
				}
				
				this.createElements();
				this.assignEvent();
				this.getPreviousSort();
			},
			
			initialize: function(){
				this.setupAnchor();
				this.reInitialize();
				
				document.getElementById('message_title').addEventListener('DOMCharacterDataModified',function(){
					_BLP.reInitialize();
				},false);
			}
		}
		
		// Initialize Better Liquid Planner Script
		_BLP.initialize();
	}
})();