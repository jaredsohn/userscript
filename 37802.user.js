// ==UserScript==
// @name           WestStats++
// @namespace      http://discon@gmail.com/weststats/
// @description    Enhances The West Stats (weststats.com) job calculator.
// @include        http://weststats.com/*
// @include        http://www.weststats.com/*
// ==/UserScript==
// 
// Enchancements:
// 1) Job calculator. Even better if you have imported your skills.
//
//
//
(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function __tf(template, name) {
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				if (elName == name)
					return(p);
				if (p.children)
				{
					var q = __tf(p.children, name);
					if (q)
						return(q);
				}
			}
		}
		return(null);
	}
	function dc(template, parent)
	{
		// { thead: { el:null, attrs:{}, children: {} } }
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				p.el = doc.createElement(p.tag);
				if (parent)
					parent.appendChild(p.el);
				
				if (p.attrs)
				{
					for(var atName in p.attrs)
					{
						if (p.attrs.hasOwnProperty(atName))
						{
							var atValue = p.attrs[atName];
							if (atName == "text")
								p.el.textContent = atValue;
							else if (atName == "html")
								p.el.innerHTML = atValue;
							else
								p.el.setAttribute(atName, atValue);
						}
					}
				}
				
				if (p.children)
				{
					dc(p.children, p.el);
				}
			}
		}
		template.find = function(name) {
			return(__tf(template, name));
		};
		return(template);
	}
	
	
	function doJobs()
	{
//		GM_addStyle('#middle table img.tipity[src*="/images/jobs/"], #middle table img.tipity[src*="/img.php?type=skill"] { width: 32px; height: 32px; } #middle table img[src*="/img.php?type=compare"] { width: 96px; height: 32px; }');
		var tbl = $("middle").getElementsByClassName("table")[1];

		var template = {
			"0": {
				tag: "thead",
				children: {
					"00": {
						tag: "tr",
						children: {
							"000": {
								tag: "td",
								attrs: {
									"colSpan": 8
								},
								children: {
									"0000": {
										tag: "div"
									}
								}
							}
						}
					}
				}
			}
		};
		
		tbl.insertBefore(dc(template)["0"].el, tbl.firstChild);
		var div = template.find("0000").el;
		
		var money = xp1('//img[@class="tipity"][@alt="Money"]', tbl).cloneNode(false);
		var experience = xp1('//img[@class="tipity"][@alt="Experience"]', tbl).cloneNode(false);
		var luck = xp1('//img[@class="tipity"][@alt="Luck"]', tbl).cloneNode(false);
		var danger = xp1('//img[@class="tipity"][@alt="Danger"]', tbl).cloneNode(false);
		
		template = {
			"0": {
				tag: "table",
				children: {
					"head": {
						tag: "tr",
						children: {
							"head1": {
								tag: "th",
								attrs: { 
									title: "WestStats++",
									colSpan: 2,
									text: "Increase the values you care about to sort the jobs"
								}
							}
						}
					},
					"money": {
						tag: "tr",
						children: {
							"money1": {
								tag: "td",
								attrs: { title: "Money" }
							},
							"money2": {
								tag: "td",
								children: {
									"moneybar": {
										tag: "canvas",
										attrs: {
											id: "++money",
											width: "400",
											height: "19"
										}
									}
								}
							}
						}
					},
					"experience": {
						tag: "tr",
						children: {
							"experience1": {
								tag: "td",
								attrs: { title: "Experience" }
							},
							"experience2": {
								tag: "td",
								children: {
									"experiencebar": {
										tag: "canvas",
										attrs: {
											id: "++experience",
											width: "400",
											height: "19"
										}
									}
								}
							}
						}
					},
					"luck": {
						tag: "tr",
						children: {
							"luck1": {
								tag: "td",
								attrs: { title: "Luck" }
							},
							"luck2": {
								tag: "td",
								children: {
									"luckbar": {
										tag: "canvas",
										attrs: {
											id: "++luck",
											width: "400",
											height: "19"
										}
									}
								}
							}
						}
					},
					"danger": {
						tag: "tr",
						children: {
							"danger1": {
								tag: "td",
								attrs: { title: "Danger" }
							},
							"danger2": {
								tag: "td",
								children: {
									"dangerbar": {
										tag: "canvas",
										attrs: {
											id: "++danger",
											width: "400",
											height: "19"
										}
									}
								}
							}
						}
					},
					"dhead": {
						tag: "tr",
						children: {
							"dhead1": {
								tag: "th",
								attrs: { 
									title: "WestStats++",
									colSpan: 2,
									text: "Decrease to filter out jobs that you can't do"
								}
							}
						}
					},
					"difficulty": {
						tag: "tr",
						children: {
							"difficulty1": {
								tag: "td",
								attrs: { 
									title: "Difficulty",
									text: "Dif"
								}
							},
							"difficulty2": {
								tag: "td",
								children: {
									"difficultybar": {
										tag: "canvas",
										attrs: {
											id: "++difficulty",
											width: "400",
											height: "19"
										}
									}
								}
							}
						}
					}
				}
			}
		};
		dc(template, div);
		template.find("money1").el.appendChild(money);
		template.find("experience1").el.appendChild(experience);
		template.find("luck1").el.appendChild(luck);
		template.find("danger1").el.appendChild(danger);
		
		var bars = [
			new Bar("++money", 50, {tbl: tbl, bars: null, col: 2} ),
			new Bar("++experience", 50, {tbl: tbl, bars: null, col: 3} ),
			new Bar("++luck", 50, {tbl: tbl, bars: null, col: 4} ),
			new Bar("++danger", 50, {tbl: tbl, bars: null, col: 5} ),
			new Bar("++difficulty", 50, {tbl: tbl, bars: null, col: 6} )
		];
		for(var i=0; i<bars.length; i++)
		{
			var bar = bars[i];
			bar.data.bars = bars;
			bar.enable(jobSort);
		}
		
		var body = tbl.tBodies[0];
		for(var i=0; i<body.rows.length; i++)
		{
			var el = document.createElement(i > 0 ? "td" : "th");
			body.rows[i].insertBefore(el, body.rows[i].firstChild);
		}
		body.rows[0].firstChild.textContent = "Score";
		
		jobSort(bars[0]);
	}
	function jobSort(bar)
	{
		var rowData = [];
		var bars = bar.data.bars;
		var body = bar.data.tbl.tBodies[0];
		var difBar = null;
		for(var i=0; i<bars.length; i++)
		{
			if (bars[i].id == "++difficulty")
			{
				difBar = bars[i];
				break;
			}
		}
		var rexPlus = /plus=(\d+)/;
		var rexMinus = /minus=(\d+)/;
		var maxValue = 0, minValue = 99999999;
		for(var i=1; i<body.rows.length; i++)
		{
			var data = { row: body.rows[i], value: 0 };
			
			var v = 0;
			for(var b=0; b<bars.length; b++)
			{
				var lbar = bars[b];
				if (lbar != difBar)
				{
					v = parseInt(data.row.cells[lbar.data.col].textContent);
					if (lbar.id == "++danger")
						v = 100-v;
					v *= lbar.value / 100;
					data.value += v;
				}
			}
			
			//
			var tmpdivs = data.row.cells[difBar.data.col].getElementsByTagName("div");
			var skills = parseInt(tmpdivs[0].textContent);
			var requir = parseInt(tmpdivs[1].textContent);
			var showRow = true;
			
			if (!isNaN(skills) && !isNaN(requir) && requir > 0)
			{
				if (skills > requir)
				{
					showRow = true;
				}
				else
				{
					var deviation = 100 - skills / requir * 100;
					if (deviation >= difBar.value)
						showRow = false;
				}
			}
			
			data.row.style.display = showRow ? "" : "none";
			data.visible = showRow;
			if (data.visible)
			{
				if (data.value > maxValue)
					maxValue = data.value;
				if (data.value < minValue)
					minValue = data.value;
			}

			//
			rowData.push(data);
		}
		rowData.sort(function(a, b) {
			return -(a.value - b.value);
		});
		for(var i=0, si=0; i<rowData.length; i++)
		{
			var row = rowData[i].row;
			row.parentNode.appendChild(row);
			if (rowData[i].visible)
				si++;
			row.className = (si%2) ? "r1" : "r2";

			var score = (rowData[i].value - minValue) / (maxValue - minValue) * 100;
			row.cells[0].textContent = Math.round(score);
		}
	}
	
	function Bar(canvasId, value, data)
	{
		this.id = canvasId;
		this.canvas = $(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.value = value;
		this.data = data;
		
		var v = GM_getValue(this.id, this.value);
		if (!isNaN(v) && v >= 0 && v <= 100)
			this.value = v;
		
		this.title = "Priority";
		if (this.id == "++difficulty")
			this.title = "Maximum deviation";
		
		this.redraw();
	}
	Bar.prototype = {
		redraw: function() {
			this.value = this.value || 0;
			var v = this.canvas.width * this.value / 100;
			this.ctx.fillStyle = "#222222";
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.fillStyle = "#44bb44";
			this.ctx.fillRect(0, 0, v, this.canvas.height);
			
			var text = this.value.toString() + "%";
			if (this.ctx.fillText)
			{
				var tw = this.ctx.measureText(text).width;
				this.ctx.fillStyle = "#fff";
				this.ctx.fillText(text, (this.canvas.width - tw) / 2, this.canvas.height-3);
			}
			else if (this.ctx.mozDrawText)
			{
				var tw = this.ctx.mozMeasureText(text);
				this.ctx.fillStyle = "#fff";
				this.ctx.save();
				this.ctx.translate((this.canvas.width - tw) / 2, this.canvas.height-3);
				this.ctx.mozDrawText(text);
				this.ctx.restore();
			}
			
			this.ctx.strokeStyle = "#0f0";
			this.ctx.beginPath();
			this.ctx.moveTo(v, 0);
			this.ctx.lineTo(v, this.canvas.height);
			this.ctx.stroke();
			
			this.canvas.title = this.title + ": " + this.value + "%";
		},
		enable: function(fn) {
			this.callback = fn;
			var _this = this;
			this.canvas.addEventListener("click",
				function(ev) { _this.onClick(ev);  },
				false);
		},
		onClick: function(ev) {
			var xpos = Math.floor(ev.clientX - this.canvas.getBoundingClientRect().left);
			this.value = Math.round(xpos * 100 / this.canvas.width);
			this.redraw();
			this.callback(this);
			GM_setValue(this.id, this.value);
		}
	};
	
	//
	// Start up
	//
	var loc = doc.location;
	if (
			(loc.pathname == "/Jobs/"
			||
			loc.href.indexOf("?page=jobs") > 0
			)
		&&
			(loc.search.indexOf("type=personal") > 0)
		)
	{
		doJobs();
	}
	
})();
