1.	// ==UserScript==
2.	// @name           WoWArmory -> WoWHead Equipment List
3.	// @namespace      WHCP
4.	// @include        http://*wowhead.com/?item=*
5.	// ==/UserScript==
6.	
7.	var server = "US" //EU or US
8.	var name = "Damascus" //Your Character's Name
9.	var realm = "Zul’jin" //Your Character's Realm
10.	var default_visibility = "Hidden" //Hidden or Shown
11.	
12.	//Do not edit below here.
13.	
14.	function GetArmoryData(realm, character, host) {
15.	GM_xmlhttpRequest({
16.	    method: 'GET',
17.	    url: "http://"+host+"/character-sheet.xml?r="+realm+"&n="+character+"",
18.	    onload: function(responseDetails) {
19.	        var parser = new DOMParser();
20.	        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
21.	        var items = dom.getElementsByTagName('item');
22.	    GM_setValue('charname', dom.getElementsByTagName('character')[0].getAttribute('name'));
23.	        for (var i = 0; i < items.length; i++) {
24.	            item_id = items[i].getAttribute('id');
25.	            item_icon = items[i].getAttribute('icon');
26.	            item_slot = items[i].getAttribute('slot');
27.	        GM_setValue(item_slot, item_id);
28.	        GetItemData(item_id)
29.	        }
30.	    }
31.	});
32.	}
33.	
34.	function GetItemData(item_id) {
35.	GM_xmlhttpRequest({
36.	    method: 'GET',
37.	    url: "http://www.wowhead.com/?item="+item_id+"&xml",
38.	    onload: function(responseDetails) {
39.	        var parser = new DOMParser();
40.	        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
41.	        item_name = dom.getElementsByTagName('name')[0].textContent;
42.	        item_quality = dom.getElementsByTagName('quality')[0].getAttribute('id');
43.	        item_tooltip = dom.getElementsByTagName('htmlTooltip')[0].textContent;
44.	      test = GM_getValue(item_id, 0);
45.	      if (test == 0) {
46.	       GM_setValue(item_id, item_name);
47.	       GM_setValue(item_id+'_quality', item_quality);
48.	       GM_setValue(item_id+'_tooltip', item_tooltip);
49.	      }
50.	    }
51.	});
52.	}
53.	
54.	function GetHost() {
55.	    if (server == "US") { return 'www.wowarmory.com' } 
56.	    if (server == "EU") { return 'eu.wowarmory.com' }
57.	}
58.	
59.	function RefreshArmory() {
60.	      table = document.getElementById('CharData_itemtable');
61.	      td = document.getElementById('CharData_infotable');
62.	      if (table) 
63.	       table.parentNode.removeChild(table);
64.	    document.getElementById('CharData_titletext').innerHTML = "<img src=http://www.wowhead.com/images/loading.gif><img src=http://www.wowhead.com/images/loading2.gif>";
65.	
66.	for (var i = 0; i < 19; i++) {
67.	GM_setValue(i, 0);
68.	}
69.	GetArmoryData(realm, name, GetHost());
70.	setTimeout(PopulateItems, 5000)
71.	}
72.	
73.	ReturnTable();
74.	
75.	function ReturnTable() {
76.	    var minibox = document.createElement("div");
77.	    minibox.className = 'minibox';
78.	    minibox.style.width = '200px';
79.	    var div = document.createElement("div");
80.	    div.id = 'CharData';
81.	    div.style.marginTop = '-10px';
82.	    div.style.position = 'relative';
83.	
84.	    var table = document.createElement("table");
85.	    table.id = 'CharData_table';
86.	    table.width = '100%';
87.	    table.colSpacing = '0';
88.	    table.colPadding = '0';
89.	    table.style.margin = '0 0 0 0';
90.	    table.style.padding = '0 0 0 0';
91.	
92.	    var tr = document.createElement("tr");
93.	    var th = document.createElement("th");
94.	    th.style.padding = '4px';
95.	    th.width = '100%';
96.	
97.	    var a = document.createElement("a");
98.	    a.id = 'CharData_toggletext';
99.	    a.style.color = 'white !important';
100.	    a.style.textDecoration = 'none';
101.	    if (GM_getValue('charname', 0) != 0) {
102.	     if(default_visibility == 'Hidden') { a.innerHTML = '[+]'; } else { a.innerHTML = '[-]'; }
103.	        } else {
104.	         a.innerHTML = "";
105.	        }
106.	    a.addEventListener("click", Toggle, false);
107.	    a.href = "javascript:;";
108.	    a.style.cssFloat = 'right';
109.	
110.	    th.appendChild(a);
111.	    
112.	    var a = document.createElement("a");
113.	    a.id = 'CharData_titletext';
114.	    a.style.cssFloat = 'left';
115.	    a.style.color = 'white !important';
116.	    a.style.textDecoration = 'none';
117.	    if (GM_getValue('charname', 0) != 0) {
118.	     a.innerHTML = GM_getValue('charname', 0)+"'s Character Profile";
119.	      } else {
120.	       a.innerHTML = "Click Here.";
121.	      }
122.	    a.addEventListener("click", RefreshArmory, false);
123.	    a.href = "javascript:;";
124.	
125.	    th.appendChild(a);
126.	
127.	    tr.appendChild(th);
128.	    table.appendChild(tr);
129.	
130.	    var tr = document.createElement("tr");
131.	    tr.id = 'CharData_items';
132.	    tr.width='200px';
133.	
134.	    var td = document.createElement("td");
135.	    td.style.margin = '0 0 0 0';
136.	    td.style.padding = '0 0 0 0';
137.	    td.id = 'CharData_infotable';
138.	    td.width='200px';
139.	    tr.appendChild(td);
140.	    table.appendChild(tr);
141.	    div.appendChild(table);
142.	
143.	    minibox.appendChild(div);
144.	    getElementByClass(document.getElementById('main-contents'), 'div', 'text').insertBefore(minibox,document.getElementsByTagName('h1')[1])
145.	    if(default_visibility == 'Hidden') { Toggle() }
146.	    PopulateItems();
147.	}
148.	
149.	function getElementByClass(parent, type, name) {
150.	    var temp = parent.getElementsByTagName(type);
151.	    for (var i = 0; i < temp.length; i++) {
152.	        if (temp[i].className == name)
153.	         return temp[i];
154.	    }
155.	    return false;
156.	}
157.	
158.	function PopulateItems() {
159.	      table = document.getElementById('CharData_itemtable');
160.	      td = document.getElementById('CharData_infotable');
161.	    if (GM_getValue('charname', 0) != 0) {
162.	     document.getElementById('CharData_titletext').innerHTML = GM_getValue('charname', 0)+"'s Character Profile";
163.	      } else {
164.	       document.getElementById('CharData_titletext').innerHTML = "Click Here.";
165.	      }
166.	    var table = document.createElement("table");
167.	    table.id = 'CharData_itemtable';
168.	    table.style.width = '100%';
169.	    table.style.margin = '0 0 0 0';
170.	    table.style.border = '1px';
171.	    td.appendChild(table);
172.	
173.	    var tr2 = document.createElement("tr");
174.	    var td2 = document.createElement("td");
175.	    td2.style.margin = '0 0 0 0';
176.	    td2.style.padding = '0 0 0 0';
177.	    td2.colSpan = '2';
178.	    td2.style.borderTop = '1px solid #404040';
179.	    tr2.appendChild(td2);
180.	    table.appendChild(tr2);
181.	    table.cellPadding = '0';
182.	    table.cellSpacing = '0';
183.	    for (var i = 0; i < 19; i++)
184.	    {
185.	        item_id = GM_getValue(i, 0);
186.	        item_name = GM_getValue(item_id, 0);
187.	        item_tooltip = GM_getValue(item_id+'_tooltip', 0);
188.	        item_class = 'q'+GM_getValue(item_id+'_quality', 0);
189.	        if(item_id > 0) {
190.	        var tr = document.createElement("tr");
191.	        var td = document.createElement("td");
192.	        td.style.padding = '0 0 0 0';
193.	        td.style.borderTop = '0';
194.	        td.style.borderLeft = '1px solid #404040';
195.	        td.style.borderBottom = '1px solid #404040';
196.	        td.style.borderRight = '1px solid #404040';
197.	        var span = document.createElement("span");
198.	
199.	            var a = document.createElement("a");
200.	            a.innerHTML = "<- ";
201.	            a.href = "javascript:;";
202.	            a.id = item_id;
203.	            a.name = 'nottransfered';
204.	            a.style.textDecoration = 'none';
205.	            a.addEventListener('click', CompareItem, false);
206.	            span.appendChild(a);
207.	
208.	
209.	        var a = document.createElement("a");
210.	        a.innerHTML = item_name;
211.	        a.className = item_class;
212.	        a.style.textDecoration = 'none';
213.	        a.href = '?item=' + item_id;
214.	        a.setAttribute("onmouseover", "Tooltip.showAtCursor(event, '"+lolescape(item_tooltip)+"')");
215.	        a.setAttribute("onmousemove", "Tooltip.cursorUpdate(event)");
216.	        a.setAttribute("onmouseout", "Tooltip.hide()");
217.	        span.appendChild(a);
218.	        td.appendChild(span);
219.	        tr.appendChild(td);
220.	
221.	        table.appendChild(tr);
222.	  }
223.	}
224.	
225.	}
226.	
227.	
228.	function CompareItem(evt) {
229.	        if(document.getElementById('compared')) {
230.	        var div = document.getElementById('compared');
231.	        div.parentNode.removeChild(div);
232.	        }
233.	        var item_id = evt['currentTarget'].id;
234.	        var divs = document.getElementsByTagName("div");
235.	        for (var i = 0; i < divs.length; i++) {
236.	            if (divs[i].id.match(/tt(.+)/, i)) {
237.	                var divnum = i;
238.	            }
239.	            if (divs[i].id.match(/ic(.+)/, i)) {
240.	                var div2num = i;
241.	            }
242.	        }
243.	        var div = document.createElement("div");
244.	        div.id = 'compared';
245.	        div.className = 'tooltip';
246.	        div.style.width = '700px';
247.	        div.style.float = 'left';
248.	        div.style.paddingTop = '1px';
249.	        div.style.visibility = 'visible';
250.	        div.innerHTML = '<table><tbody><tr><td>'+GM_getValue(item_id + '_tooltip', 0)+'<th style="background-position: right top;"></th></tr><tr><th style="background-position: left bottom;"></th><th style="background-position: right bottom;"></th></tr></tbody></table>';
251.	         div.getElementsByTagName("b")[0].addEventListener('click', RemoveCompare, false);
252.	        if (div.getElementsByTagName("table")[1]) {
253.	         div.getElementsByTagName("table")[1].width = '100%';
254.	        }
255.	        divs[divnum].parentNode.insertBefore(div, divs[divnum].nextSibling);
256.	}
257.	
258.	function RemoveCompare(evt) {
259.	    if(document.getElementById('compared')) {
260.	    var div = document.getElementById('compared');
261.	    div.parentNode.removeChild(div);
262.	    }
263.	}
264.	
265.	function Toggle(evt) {
266.	    var div = document.getElementById('CharData_items');
267.	    if(div.style.visibility == 'hidden') { div.parentNode.parentNode.style.height = ''; div.style.visibility = 'visible'; document.getElementById('CharData_toggletext').innerHTML = '[-]'; }
268.	    else { div.style.visibility = 'hidden'; div.parentNode.parentNode.style.height = '24px'; document.getElementById('CharData_toggletext').innerHTML = '[+]'; }
269.	}
270.	
271.	function lolescape(text) {
272.	  if (!arguments.callee.sRE) {
273.	    var specials = [
274.	      '\'', '/', '.', '*', '+', '?', '|',
275.	      '(', ')', '[', ']', '{', '}', '\\'
276.	    ];
277.	    arguments.callee.sRE = new RegExp(
278.	      '(\\' + specials.join('|\\') + ')', 'g'
279.	    );
280.	  }
281.	  return text.replace(arguments.callee.sRE, '\\$1');
282.	}

