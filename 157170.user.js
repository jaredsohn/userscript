// ==UserScript==
// @name        Enlightened Intel+
// @include	http://www.ingress.com/intel*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant	none
// @version     0.2.1
// ==/UserScript==

/*!
 * tablesort v1.6.0 (2013-01-09)
 * http://tristen.ca/tablesort/demo
 * Copyright (c) 2013 ; Licensed MIT
*/

;(function () {
    function Tablesort(el, options) {
        if (el.tagName !== 'TABLE') {
            throw new Error('Element must be a table');
        }

        this.init(el, options || {});
    }

    Tablesort.prototype = {

        init: function(el, options) {
            var that = this,
                firstRow;
            this.thead = false;
            this.options = options;
            this.options.d = options.descending || false;

            if (el.rows && el.rows.length > 0) {
                if(el.tHead && el.tHead.rows.length > 0) {
                    firstRow = el.tHead.rows[el.tHead.rows.length - 1];
                    that.thead = true;
                } else {
                    firstRow = el.rows[0];
                }
            }

            if (!firstRow) {
                return;
            }

            var onClick = function (e) {
                // Delete sort classes on headers that are not the current one.
                var siblings = getParent(cell, 'tr').getElementsByTagName('th');
                for(var i = 0; i < siblings.length; i++) {
                    if(hasClass(siblings[i], 'sort-up') || hasClass(siblings[i], 'sort-down')) {
                        if(siblings[i] !== this) {
                            siblings[i].className = siblings[i].className.replace(' sort-down', '')
                                .replace(' sort-up', '');
                        }
                    }
                }
                that.current = this;
                that.sortTable(this);
            };

            // Assume first row is the header and attach a click handler to eech.
            for(var i = 0; i < firstRow.cells.length; i++) {
                var cell = firstRow.cells[i];
                if(!hasClass(cell, 'no-sort')) {
                    cell.className += ' sort-header';
                    addEvent(cell, 'click', onClick);
                }
            }
        },

        sortTable: function(header, update) {
            var that = this;
            var column = header.cellIndex;
            var sortFunction;
            var t = getParent(header, 'table');
            var item = '', i = 0;

            if (t.rows.length <= 1) {
                return;
            }

            while (item === '' && i < t.tBodies[0].rows.length) {
                item = getInnerText(t.tBodies[0].rows[i].cells[column]);
                item = trim(item);
                // Exclude cell values where commented out HTML exists
                if(item.substr(0, 4) === '<!--' || item.length === 0) {
                    item = '';
                }
                i++;
            }

            if (item === '') {
                return;
            }

            // Possible sortFunction scenarios
            var sortCaseInsensitive = function (a, b) {
                var aa = getInnerText(a.cells[that.col]).toLowerCase();
                var bb = getInnerText(b.cells[that.col]).toLowerCase();

                if(aa === bb) {
                    return 0;
                }

                if(aa < bb) {
                    return 1;
                }

                return -1;
            };

            var sortNumber = function (a, b) {
                var aa = getInnerText(a.cells[that.col]);
                aa = cleanNumber(aa);
                var bb = getInnerText(b.cells[that.col]);
                bb = cleanNumber(bb);
                return compareNumber(bb, aa);
            };

            var sortDate = function(a, b) {
                var aa = getInnerText(a.cells[that.col]).toLowerCase(),
                    bb = getInnerText(b.cells[that.col]).toLowerCase();
                return parseDate(bb) - parseDate(aa);
            };

            // Sort as number if a currency key exists or number
            if (item.match(/^-?[£\x24Û¢´]\d/) || item.match(/^-?(\d+[,\.]?)+(E[\-+][\d]+)?%?$/)) {
                sortFunction = sortNumber;
            } else if (testDate(item)) {
                sortFunction = sortDate;
            } else {
                sortFunction = sortCaseInsensitive;
            }

            this.col = column;
            var firstRow = [],
                newRows = [],
                k, j;

            for (k = 0; k < t.tBodies.length; k++) {
                for(i = 0; i < t.tBodies[k].rows[0].length; i++) {
                    firstRow[i] = t.tBodies[k].rows[0][i];
                }
            }

            for (k = 0; k < t.tBodies.length; k++) {
                if (!that.thead) {
                    // skip the first row
                    for(j = 1; j < t.tBodies[k].rows.length; j++) {
                        newRows[j - 1] = t.tBodies[k].rows[j];
                    }
                } else {
                    // don't skip the first row
                    for(j = 0; j < t.tBodies[k].rows.length; j++) {
                        newRows[j] = t.tBodies[k].rows[j];
                    }
                }
            }

            newRows.sort(sortFunction);

            if (!update) {
                if(that.options.d) {
                    if(hasClass(header, 'sort-up')) {
                        header.className = header.className.replace(/ sort-up/, '');
                        header.className += ' sort-down';
                    } else {
                        header.className = header.className.replace(/ sort-down/, '');
                        header.className += ' sort-up';
                    }
                } else {
                    if(hasClass(header, 'sort-down')) {
                        header.className = header.className.replace(/ sort-down/, '');
                        header.className += ' sort-up';
                    } else {
                        header.className = header.className.replace(/ sort-up/, '');
                        header.className += ' sort-down';
                    }
                }
            }

            // Before we append should we reverse the new array or not?
            if(hasClass(header, 'sort-down')) {
                newRows.reverse();
            }

            // append rows that already exist rather than creating new ones
            for(i = 0; i < newRows.length; i++) {
                // Don't sort on rows specified. TODO might want to
                // do this more upstream.
                if(!hasClass(newRows[i], 'no-sort')) {
                    t.tBodies[0].appendChild(newRows[i]);
                }
            }
        },

        refresh: function() {
            if (this.current !== undefined) {
                this.sortTable(this.current, true);
            }
        }
    };

    var week = /(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\.?\,?\s*/i,
        commonDate = /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/,
        month = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i;

    var testDate = function(date) {
            return (
                date.search(week) !== -1 ||
                date.search(commonDate) !== -1  ||
                date.search(month !== -1)
            ) !== -1 ;
        },

        parseDate = function (date) {
            date = date.replace(/\-/g, '/');
            date = date.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, '$1/$2/$3'); // format before getTime
            return new Date(date).getTime();
        },

        getParent = function (el, pTagName) {
            if (el === null) {
                return null;
            } else if (el.nodeType === 1 && el.tagName.toLowerCase() === pTagName.toLowerCase()) {
                return el;
            } else {
                return getParent(el.parentNode, pTagName);
            }
        },

        getInnerText = function (el) {
            var that = this;

            if (typeof el === 'string' || typeof el === 'undefined') {
                return el;
            }

            var str = el.getAttribute('data-sort');

            if (str) {
                return str;
            }
            else if (el.textContent) {
                return el.textContent;
            }
            else if (el.innerText) {
                return el.innerText;
            }

            var cs = el.childNodes,
                l = cs.length;

            for (var i = 0; i < l; i++) {
                switch (cs[i].nodeType) {
                    case 1:
                        // ELEMENT_NODE
                        str += that.getInnerText(cs[i]);
                    break;
                    case 3:
                        // TEXT_NODE
                        str += cs[i].nodeValue;
                    break;
                }
            }

            return str;
        },

        compareNumber = function (a, b) {
            var aa = parseFloat(a);
            a = isNaN(aa) ? 0 : aa;
            var bb = parseFloat(b);
            b = isNaN(bb) ? 0 : bb;
            return a - b;
        },

        trim = function (s) {
            return s.replace(/^\s+|\s+$/g, '');
        },

        cleanNumber = function (i) {
            return i.replace(/[^\-?0-9.]/g, '');
        },

        hasClass = function (el, c) {
            return(' ' + el.className + ' ').indexOf(' ' + c + ' ') > -1;
        },

        // http://ejohn.org/apps/jselect/event.html
        addEvent = function (object, event, method) {
            if(object.attachEvent) {
                object['e' + event + method] = method;
                object[event + method] = function () {
                    object['e' + event + method](window.event);
                };
                object.attachEvent('on' + event, object[event + method]);
            } else {
                object.addEventListener(event, method, false);
            }
        };

    window.Tablesort = Tablesort;
	
})();

var RPortalMap = [];
var EPortalMap = [];
var NPortalMap = [];
var RFieldMap = [];
var EFieldMap = [];
var fields = [];
var sidebar_width = 400;

function addToSidebar(element){
	var sidebar = document.getElementById("sidebar");
	if(sidebar === null){
		document.getElementById("dashboard_container").style.left=sidebar_width+20+"px";
		
		//The block below keeps all the other crap from loading.
		//document.getElementById("dashboard_container").style.display="none";
		//document.getElementById("header").style.display="none";
		//document.getElementById("map_canvas").style.display="none";
		//document.getElementById("player_stats").style.display="none";
		//document.getElementById("game_stats").style.display="none";
		//document.getElementById("geocode_search").style.display="none";
		//document.getElementById("comm").style.display="none";
		//document.getElementById("redeem_reward").style.display="none";
		//document.getElementById("zoom_level_data").style.display="none";
		//document.getElementById("footer").style.display="none";
		sidebar = document.createElement("div");
		sidebar.style.width=sidebar_width + "px";
		sidebar.style.position="absolute";
		sidebar.style.overflowY="scroll";
		sidebar.className="color_orange";
		sidebar.id="sidebar";
		sidebar.style.fontSize="8pt";
		document.body.appendChild(sidebar);
		window.onresize=function(){
			document.getElementById("sidebar");
			sidebar.style.height=window.innerHeight-(54)+"px";
		};
		window.onresize();
	}
	if(element != null){
		sidebar.appendChild(element);
	}
}

function Table(columnSpec){
	this.table = document.createElement("table");
	this.columnSpec = columnSpec;
	this.rows = [];
	
	var head = document.createElement("thead");
	this.table.appendChild(head);
	var headRow = document.createElement("tr");
	head.appendChild(headRow);
	
	this.tbody = document.createElement("tbody");
	//this.tbody.appendChild(headRow);				//This seems to be needed for the JQuery Tablesorter
	this.table.appendChild(this.tbody);
	
	for(var i=0;i<columnSpec.length;i++){
		colHead = document.createElement("th");
		colHead.className = "Sort-header";
		colHead.appendChild(document.createTextNode(columnSpec[i]["label"]));
		headRow.appendChild(colHead);
	};
	
	this.sort = new Tablesort(this.table);
};

Table.prototype.plugins = [];

/*
Table.prototype.plugins["portalNameView"] = function(data){
		var titleLink = document.createElement("a");
		titleLink.appendChild(document.createTextNode(data["descriptiveText"]));

		titleLink.href = "javascript: window.panto("+data["lngLat"][0]+", "+data["lngLat"][1]+");";
		titleLink.className = "RESISTANCE"; 
		return titleLink;
}
*/

Table.prototype.addRow = function(rowSpec){
	//check portalid as index against undefined or empty?
	var row;
	
	if(rowSpec["portalId"] in this.rows)
	{
		row = this.rows[rowSpec["portalId"]];
	}
	else
	{
		row = document.createElement("tr");
		this.rows[rowSpec["portalId"]] = row;
		this.tbody.appendChild(row);
		
		// create tds
		for(var i=0;i<this.columnSpec.length;i++)
		{
			var value = document.createElement("td");
			row.appendChild(value);
		};
	}
	
	// update row
	for(var i=0;i<this.columnSpec.length;i++)
	{
		var value = row.childNodes.item(i);
		var data = rowSpec[this.columnSpec[i]["id"]];
		switch(this.columnSpec[i]["type"]){
			case "string":
				value.textContent = data;
				break;
			case "portalNameView":
			    while ( value.childNodes.length >= 1 ) {
					value.removeChild( value.firstChild );       
				} 
				var titleLink = document.createElement("a");
				titleLink.appendChild(document.createTextNode(data["descriptiveText"]));

				titleLink.href = "javascript: window.panto("+data["lngLat"][0]+", "+data["lngLat"][1]+");";
				titleLink.className = data["owner"];
				value.appendChild(titleLink);				
				break;
			case "HPBarView":
			    while ( value.childNodes.length >= 1 ) {
					value.removeChild( value.firstChild );       
				} 
			
				HPBar = document.createElement("div");
				HPBar.style.width='80px';
				HPBar.style.position="relative";
				HPBar.percent = document.createElement("span");
				HPBar.percent.style.position = "absolute";
				HPBar.percent.style.width = "100%";
				HPBar.percent.style.textAlign = "center";
				HPBar.percent.appendChild(document.createTextNode(Math.floor(data["curHP"])+"/"+data["maxHP"]));
				HPBar.appendChild(HPBar.percent);
				HPBar.bar = document.createElement("div");
				HPBar.bar.style.background = "#990000";
				HPBar.bar.style.width = 100*data["curHP"]/data["maxHP"]+"%";
				HPBar.bar.style.height = "1.2em"
				HPBar.appendChild(HPBar.bar);
				value.appendChild(HPBar);
				break;
			default:
				alert("WTF?");
				break;
		}
	}
	
	
	//this.sort.refresh();
}


Table.prototype.clear = function() {
    while ( this.tbody.childNodes.length >= 1 ) {
        this.tbody.removeChild( this.tbody.firstChild );       
    } 
};


var infoTable = new Table(
	[
		{
			"label": "Portal Name",
			"id": "title",
			"type": "portalNameView"
		},
		{	
			"label": "Level",
			"id": "level",
			"type": "string"
		},
		{
			"label": "#R",
			"id": "resonators",
			"type": "string"
		},
		{
			"label": "HP",
			"id": "HP",
			"type": "HPBarView"
		},
		{
			"label": "AP Gain",
			"id": "apGain",
			"type": "string"
		},
	]);
	
addToSidebar(infoTable.table);

unsafeWindow.$(document).ajaxSuccess(
    function(event, xhr, settings) 
	{  
		// if we're getting game data
        if(settings.url == "/rpc/dashboard.getThinnedEntitiesV2" )
        {
			var responseText = jQuery.parseJSON(xhr.responseText);
					
			if (typeof(responseText.error) == "undefined")
			{
				for( m in responseText.result.map )
				{
					for( g in responseText.result.map[m].gameEntities )
					{
						if (responseText.result.map[m].gameEntities[g][2].hasOwnProperty("capturedRegion"))
						{
							fields[responseText.result.map[m].gameEntities[g][0]] = responseText.result.map[m].gameEntities[g];
						}
						
						if (responseText.result.map[m].gameEntities[g][2].hasOwnProperty("turret"))
						{
							if(responseText.result.map[m].gameEntities[g][2].controllingTeam.team == "RESISTANCE")
								RPortalMap[(responseText.result.map[m].gameEntities[g])[0]] = responseText.result.map[m].gameEntities[g];
							else if(responseText.result.map[m].gameEntities[g][2].controllingTeam.team == "ALIENS")
								EPortalMap[(responseText.result.map[m].gameEntities[g])[0]] = responseText.result.map[m].gameEntities[g];
							else 
								NPortalMap[(responseText.result.map[m].gameEntities[g])[0]] = responseText.result.map[m].gameEntities[g];
						}
						
						/*
						else if(responseText.result.map[m].gameEntities[g][2].hasOwnProperty("edge"))
						{
							links[responseText.result.map[m].gameEntities[g][0]] = responseText.result.map[m].gameEntities[g];
						}
						*/
					}
				} 
			}
        }
		/*
		// if we're updating COMMS
		else if(settings.url == "/rpc/dashboard.getPaginatedPlextsV2" )
		{
			//console.log("COMMs updated.");
		}
		*/
		
		
		//clear the field maps;
		RFieldMap = [];
		EFieldMap = [];
		
		//loop through all fields and increment each portal.
		for( f in fields)
		{
			
			if((fields[f])[2].controllingTeam.team == "RESISTANCE")
			{
				for ( v in (fields[f])[2].capturedRegion )
				{
					var pGuid = fields[f][2].capturedRegion[v].guid;

					if(!RFieldMap[pGuid])
					{
						RFieldMap[pGuid] = 0;
					}
					RFieldMap[pGuid]++;
				}
			}
			
			//else
			//{
			//	for ( v in fields[f][2].capturedRegion )
			//	{
			//		EFieldMap[v]++;
			//	}
			//}
			
		}
		
		for(var portalId in RPortalMap)
		{
			var p = RPortalMap[portalId][2];
			var lng = (p.locationE6.latE6)/1000000;
			var lat = (p.locationE6.lngE6)/1000000;
			var owner = "RESISTANCE";
			
			var maxHP = 0;
			var curHP = 0;
			var portalLevel = 0;
			var resCount = 0;
			var ap = 0;
			
			var resArray = RPortalMap[portalId][2].resonatorArray.resonators;
			for(var i=0; i < resArray.length; i++)
			{
				if(resArray[i])
				{
				resCount++;
					portalLevel += resArray[i].level;
					curHP += resArray[i].energyTotal;
					maxHP += 500+resArray[i].level*500+((resArray[i].level>5)?(resArray[i].level-5)*500:0)
				}
			}
			portalLevel /= 8;
			portalLevel = Math.floor(portalLevel);
			if(!portalLevel) portalLevel = 1;
			
			ap = ( resCount * 75 ) + ( p.portalV2.linkedEdges.length * 187 );
				
			ap += (typeof(RFieldMap[portalId]) != "undefined") ? (RFieldMap[portalId] * 750) : 0; 
				

			infoTable.addRow({
				"portalId": portalId, 
				"title": {"descriptiveText": p.portalV2.descriptiveText.TITLE, "owner": owner, "lngLat": [lng,lat]},
				"level": portalLevel,
				"resonators": resCount,
				"HP": {"curHP": curHP, "maxHP": maxHP},
				"apGain": ap,
				});
		}
		
		for(var portalId in NPortalMap)
		{
			var p = NPortalMap[portalId][2];
			var lng = (p.locationE6.latE6)/1000000;
			var lat = (p.locationE6.lngE6)/1000000;
			var owner = "NEUTRAL";
			
			var maxHP = 0;
			var curHP = 0;
			var portalLevel = 1;
			var resCount = 0;
			var ap = 0;
			
			infoTable.addRow({
				"portalId": portalId, 
				"title": {"descriptiveText": p.portalV2.descriptiveText.TITLE, "owner": owner, "lngLat": [lng,lat]},
				"level": portalLevel,
				"resonators": resCount,
				"HP": {"curHP": curHP, "maxHP": maxHP},
				"apGain": ap,
				});
		}
		infoTable.sort.refresh();
    }
);
