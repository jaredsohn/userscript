// ==UserScript==
// @name           The West Reporter
// @namespace      http://discon@gmail.com/reporter/
// @description    Converts duel reports to text format so you can paste them on the forums. Open a duel report and click the new "Convert" button.
// @include        http://*.the-west.*/game.php*
// ==/UserScript==
// 
(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function xp(x, p) {
		var r = doc.evaluate(x, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var len = r.snapshotLength;
		var ar = new Array(len);
		for(var i=0; i<len; i++) {
			ar[i] = r.snapshotItem(i);
		}
		return(ar);
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
	
	function repeat(c, n) {
		var s = "";
		for(var i=0; i<n; i++)
			s += c;
		return(s);
	}
	function padLeft(s, len, c) {
		c = c || " ";
		s = s.toString();
		if (s.length < len)
			s = repeat(c, len - s.length) + s;
		return(s);
	}
	function padRight(s, len, c) {
		c = c || " ";
		s = s.toString();
		if (s.length < len)
			s += repeat(c, len - s.length);
		return(s);
	}
	
	function convertDuelReport(div) {
		var x = {};
		x.p1 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[1]', div);
		x.loc = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[3]', div);
		x.p2 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[5]', div);
		x.hitsBody = xp1('./table/tbody/tr[2]/td[2]/div/div/table[2]/tbody', div);
		x.p1injuries = xp('./tr/td[1]/span', x.hitsBody);
		x.p2injuries = xp('./tr/td[3]/span', x.hitsBody);
		x.outcome = xp1('./table/tbody/tr[2]/td[2]/div/div/h4', div);
		
		var rex, m;
	
		rex = /[\n\t\r]+([^\n\t\r]+)[\n\t\r]+Level\s(\d+)[\n\t\r]+Dueling\slevel\s(\d+)/i;
		m = x.p1.textContent.match(rex);
		var p1 = { name: m[1], level: m[2], dlevel: m[3] };
		m = x.p2.textContent.match(rex);
		var p2 = { name: m[1], level: m[2], dlevel: m[3] };
		
		rex = /[\n\t\r]+Duel\slocation[\n\t\r]+([^\n\t\r]+)/i;
		m = x.loc.textContent.match(rex);
		var location = m[1];

		function getHits(pinj) {
			var rex1 = /Strike:\s(.+)/i;
			var rex2 = /-\s(\d+)\sHP/i;
			var rex3 = /(Total)\shealth/i;
			
			var injuries = [];
			var hit = null;
			
			for(var i=0; i<pinj.length; i++) {
				var t = pinj[i].textContent;
				m = t.match(rex1);
				if (m) {
					hit = { pos: m[1], damage: "" };
				} else {
					m = t.match(rex3);
					if (m) {
						hit = { pos: "Total", damage: "" };
					} else {
						m = t.match(rex2);
						if (m) {
							hit.damage = m[0];
							injuries.push(hit);
							hit = null;
						} else {
							hit = { pos: t, damage: "" };
							injuries.push(hit);
							hit = null;
						}
					}
				}
			}
			return(injuries);
		}
		
		p1.injuries = getHits(x.p1injuries);
		p2.injuries = getHits(x.p2injuries);
		
		var outcome = x.outcome.textContent;

		var fs = 25;
		var code = "[code]\n";
		code += "+-------------------------------------------------------+\n";
		code += "| " + padRight("Location: " + location, 53) + " |\n";
		code += "+-------------------------------------------------------+\n";
		code += "| " + padRight(p1.name, fs) + " | " + padRight(p2.name, fs) + " |\n";
		code += "| " + padRight("Level: " + p1.level, fs) + " | " + padRight("Level: " + p2.level, fs) + " |\n";
		code += "| " + padRight("Dueling level: " + p1.dlevel, fs) + " | " + padRight("Dueling level: " + p2.dlevel, fs) + " |\n";
		code += "+---------------------------+---------------------------+\n";
		for(var i=0; i<p1.injuries.length; i++) {
			var h1 = p1.injuries[i];
			var h2 = p2.injuries[i];
			if (i == p1.injuries.length - 1)
		code += "+---------------------------+---------------------------+\n";
			code += "| " + padRight(h1.pos, 15) + padLeft(h1.damage, 10) + " | " + padRight(h2.pos, 15) + padLeft(h2.damage, 10) +" |\n";
		}
		code += "+-------------------------------------------------------+\n";
		code += "[/code]\n\n";
		code += outcome;
		
		div.innerHTML = '<textarea style="width:100%;height:100%;">' + code + '</textarea>';
		div.childNodes[0].select();
	}
	
	function hookReport(div) {
		var titleRow = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		if (!titleRow) return;

		if (!titleRow.textContent.match(/Duel:/))
			return;
		
		var t = dc({
			"th": { 
				tag: "th", 
				children: {
					"btn": {
						tag: "button",
						attrs: {
							text: "Convert",
							title: "Convert to forum code"
						}
					}
				}
			}
		});
		titleRow.appendChild(t["th"].el);
		t.find("btn").el.addEventListener("click", function() { convertDuelReport(div); }, false);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookReport(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();
