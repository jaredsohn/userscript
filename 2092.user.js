// ==UserScript==
// @name          Yahoo! Finance Stock Screen
// @namespace     http://seifi.org
// @description	  Quickly identify the next long candidate in your yahoo stock watch list. Click on the flash star to show TA charts.
// @include       http://finance.yahoo.com/p?v&k=pf_*
// @include		  http://finance.yahoo.com/p?k=pf_*
// @include		  http://finance.yahoo.com/p?v&k=pf_*&d=v*
// @version       1.0
// @GM_version    0.6.4
// @FF_version    1.5
// ==/UserScript==

var GMDebug = false;

var CustomizeYahoo = {
	re : [ 	/^http\:\/\/finance\.yahoo\.com\/p\?v\&k=pf_\d+$/,
		/^http\:\/\/finance\.yahoo\.com\/p\?k=pf_\d+/,
		/^http\:\/\/finance\.yahoo\.com\/p\?v\&k=pf_\d+\&d=v\d+$/],
		
	// imgFrame: document,
	
	//iconOn: 'http://mail.google.com/mail/images/star_on_sm_2.gif',
	//iconOff: 'http://mail.google.com/mail/images/star_off_2.gif',
	iconOn: 'http://us.i1.yimg.com/us.yimg.com/i/us/fi/03rd/up_g.gif',
	iconOff: 'http://us.i1.yimg.com/us.yimg.com/i/us/fi/03rd/down_r.gif',
	
	iconIds: [],
	iconSymbs: [],
	
	/*
	 * return true if by the defined rule, the symbol is good to pick
	 *
	 * p	price
	 * tp	target price
	 * PE	P/E
	 * vol	today's volumn
	 * aVol average volumn
	 * f	float
	 * MC	market capital
	 * fr   percentage of float in total market capital
	 * EPS	EPS
	 * nEPS	estimated next year EPS
	 * rEPS	percentage increase of EPS
	 */
	analysis: function(p, tp, PE, vol, aVol, f, MC, fr, EPS, nEPS, rEPS ) {
		return (rEPS > PE);
	},

	extractNum : function(obj) {
		var str = obj;
		if (typeof obj.innerHTML != 'undefined')
			str = obj.innerHTML;
		if (GMDebug) GM_log("extractNum : " + str);
		
		if (/\<\//.test(str)) {
			var m = str.match(/\>([0-9\.\,\-]+)\<\//);
			str = m[m.length-1];
		}
			
		var s = "";
		for (var i = 0; i < str.length; i++) {
			var c = str.charAt(i);
			if (c >= '0' && c <='9')
				s += c;
			else if (c == '.')
				s += c;
			else if (c == '-')
				s += c;
		}
		var f = parseFloat(s);
		if (str.charAt(str.length-1) == 'B')
			f = f * 1e9;
		else if (str.charAt(str.length-1) == 'M')
			f = f * 1e6;
			
		if (GMDebug) GM_log("get " + f);
		return f;
	},

	editTbl: function(tbl) {
		var tbody = tbl.tBodies[0];
		var nRow = tbody.rows.length+1;
		var nCol = tbody.rows[0].cells.length;
		var iSymbol = -1;
		var iLast = -1;
		var iTargetP = -1;
		var iVol = -1;
		var iAvol = -1;
		var iFloat = -1;
		var iMCap = -1;
		var iEPS = -1;
		var iEPSEst = -1;
		var iNyEPSEst = -1;
		var iPE = -1;
		var iCol = 0;
		var debug = GMDebug;
		
		// install element of stock chart
		try{
			var imgDiv = document.createElement('div');
			imgDiv.id = 'gmStockChartDiv';
			imgDiv.style.position='absolute';
			imgDiv.style.visibility='hidden';
			imgDiv.style.zIndex = 1500;
			imgDiv.style.backgroundColor = 'white';
			//imgDiv..setAttribute('style','position:absolute;z-index:1500;visibility:hidden;background-color:white;border:5px outset black');
			
			
			var imgFrame = document.createElement('img');
			imgFrame.id='gmStockChart';
			imgFrame.src=this.getStockChartURL('');
			
			imgDiv.appendChild(imgFrame);
			
			document.body.firstChild.insertBefore(imgDiv, document.body.firstChild.firstChild);
			
			CustomizeYahoo.imgDiv = imgDiv;
			CustomizeYahoo.imgFrame = imgFrame;

			if (GMDebug) GM_log("img installed: " + imgFrame);
			
			try {
				var oImg = imgFrame.wrappedJSObject;
				if (GMDebug) GM_log("img = " + oImg + ", img.tagName = " + oImg.tagName);
				oImg.addEventListener('click',GMC_closeChart,false);
			}
			catch(e) {
				GM_log("GM_log: install unclick failed: " + e);
			}
			
		}
		catch(e) {
			GM_log("GM_log: " + e);
		}

		// modify the table elements, detect column 
					
		for (var i = 0; i < tbody.rows[0].cells.length; i++) {
			var colName = tbody.rows[0].cells[i].innerHTML;
			if (debug) GM_log('Col[' + i + '] = ' + colName);

			if (colName == 'Symbol')
				iSymbol = iCol;
			else if (colName == 'Trade')
				iLast = iCol;
			else if (colName == 'P/E')
				iPE = iCol;
			else if (colName == 'Change')
				iCol ++;
			else if (colName == 'Volume')
				iVol = iCol;
			else if (colName == 'Avg Vol (3m)')
				iAvol = iCol;
			else if (colName == 'Float')
				iFloat = iCol;
			else if (colName == 'Market Cap')
				iMCap = iCol;
			else if (colName == '1y Target Est')
				iTargetP = iCol;
			else if (colName == 'Pct from 50d MA')
				tbody.rows[0].cells[i].innerHTML = '% 50MA';
			else if (colName == 'EPS (ttm)')
				iEPS = iCol;
			else if (colName == 'EPS Est (current yr)')
				iEPSEst = iCol;
			else if (colName == 'EPS Est (next yr)')
				iNyEPSEst = iCol;
			
			iCol ++;
		}
	
		// the real modification
		
		var iIcon = 0;

		for (var i = 1; i < nRow - 1; i++) {
				var row = null;
				var symb = '';
				var p = 1;
				var tp = 0;
				var pe = -1;
				var v = 0;
				var av = 0;
				var f = 0;
				var mc = 0;
				var fr = 0;
				var EPS = 0;
				var EPSEst = 0;
				var NyEPSEst = 0;
				var rEPS = -1;
			try {
				if (tbody.rows[i].cells[iSymbol].className == 'nosymbol') {
					tbody.rows[i].cells[iSymbol].innerHTML = '<hr>'; 
					continue;
				}

				row = tbody.rows[i];
				symb = row.cells[iSymbol].firstChild.innerHTML;
				
				if (i%2 == 0)
					row.style.background = '#eeeeee';
					
				if (iLast != -1) {
					p = this.extractNum(row.cells[iLast]);
					if (debug) GM_log('p[' + symb + '] = ' + p);
				}
				if (iPE != -1) {
					pe = this.extractNum(row.cells[iPE]);					
					if (debug) GM_log('PE[' + symb + '] = ' + pe);
				}
				if (iTargetP != -1) {
					tp = this.extractNum(row.cells[iTargetP]);
					if (debug) GM_log('targetP[' + symb + '] = ' + tp);
				}
				if (iVol != -1 && iAvol != -1) {
					v = this.extractNum(row.cells[iVol]);
					av = this.extractNum(row.cells[iAvol]);
					var vr = Math.round(v * 1e2 / av);
					row.cells[iVol].innerHTML =  vr + "%";
					if (debug) GM_log('v[' + symb + '] = ' + v);
					if (debug) GM_log('av[' + symb + '] = ' + av);
				}
				if (iFloat != -1 && iMCap != -1) {
					f = this.extractNum(row.cells[iFloat]);
					mc = this.extractNum(row.cells[iMCap]);
					fr = Math.round(p * f * 1e2 / mc);
					row.cells[iFloat].innerHTML =  fr + "%";
					if (debug) GM_log('fr[' + symb + '] = ' + fr);
				}
				if (iLast != -1 && iTargetP != -1) {
					var pr = Math.round(p * 100 / tp);
					row.cells[iLast].innerHTML += ' / ' + pr + '%';
					if (debug) GM_log('pr[' + symb + '] = ' + pr);
				}

				if (iEPS != -1 && iEPSEst != -1 && iNyEPSEst != -1) {
					EPS = this.extractNum(row.cells[iEPS]);
					EPSEst = this.extractNum(row.cells[iEPSEst]);
					NyEPSEst = this.extractNum(row.cells[iNyEPSEst]);
					rEPS = Math.round((NyEPSEst-EPSEst) * 1e3 / (EPSEst)) / 10 ;
					row.cells[iNyEPSEst].innerHTML += ' (' + rEPS + '%)';
				}
			}
			catch(e) {
				tbody.rows[i].cells[0].innerHTML = '<hr>';
				GM_log("GM_log: " + e);
			};

				try {
					// '<a href=javascript:document.updateChart("' + symb + '",this.parentNode)>';
					
					var iconId = 'gmcIcon' + i;
					var iconSymb = symb;
					
					var appendSrc = '<img id=' + iconId + ' src=';
					try {
						if (this.analysis(p, tp, pe, v, av, f, mc, fr, EPS, EPSEst, rEPS))
							appendSrc += this.iconOn;
						else
							appendSrc += this.iconOff;
					}
					catch(e) {
						GM_log("GM_log: Fail to analyze");
						appendSrc += this.iconOff;
					}
					appendSrc += '>';

					if (GMDebug) GM_log("to append: " + appendSrc);
					
					row.cells[iSymbol].innerHTML += appendSrc;
					
					CustomizeYahoo.iconIds[iIcon] = iconId;
					CustomizeYahoo.iconSymbs[iIcon] = symb;
					iIcon ++;
				}
				catch(e) {
					GM_log("GM_log: " + e);
				}
		}
		
		
		for(var i = 0; i < CustomizeYahoo.iconIds.length; i++) {
			var oIcon = document.getElementById(CustomizeYahoo.iconIds[i]);
			oIcon.addEventListener('click',GMC_updateChart,false);
		}
	},
	
	detectTbl: function() {
		var i = 0;
		var urlQualified = false;
		
		for (i = 0; i < this.re.length && !urlQualified; i++)
			urlQualified = this.re[i].test(window.location);
			
		if (!urlQualified) {
			alert("not qualified url" + window.location);
			return;
		}
		
		targetTbl = document.getElementById('yfi_columnar_data');
		/*
		var tables = document.getElementsByTagName("table");
		if (GMDebug) GM_log("total table number: " + tables.length);
		var targetTbl = null;
		for (i = 0; i < tables.length && targetTbl == null; i++) {
			try {
				var oCell = tables[i];
				if (GMDebug) GM_log(oCell.className);
				
				if (oCell.className == 'portfolio_data simple') {
					targetTbl = oCell;
				}
			}
			catch (e) {}
		}
		*/
		if (targetTbl) {
			if (GMDebug) GM_log("start editting table");
			try{
				this.editTbl(targetTbl);
			}
			catch(e) {
				if (GMDebug) GM_log(e);
			}
			if (GMDebug) GM_log("end editting table");
		}
		
	},
	
	getStockChartURL: function(symb) {
		if (symb.length == 0)
			return '';
			
		var pOB = symb.indexOf('.OB');
		if (pOB > 0)
			symb = symb.substring(0, pOB);
			
		// http://www.stockta.com/cgi-bin/candle.pl?cobrand=&symb=APFCX&size=analysis&trend=
		
		var url = "http://www.stockta.com/cgi-bin/candle.pl?cobrand=&symb=" + symb + "&size=analysis&trend=";
		var img = CustomizeYahoo.imgFrame;
		if (GMDebug) GM_log("img url = " + url);

		try {
			img = img.wrappedJSObject;
		}
		catch(e) {}
		img.src = url;
		
		var div = CustomizeYahoo.imgDiv;
		try {
			div = div.wrappedJSObject;
		}
		catch(E) {}
		div.style.visibility = 'visible';
		
		return '';

		/*
		var req = {
  			method:"POST",
  			url:"http://stockcharts.com/h-sc/ui",
  			headers:{
    			"User-Agent":"Mozilla",
    			"Accept":"text/html,text/xml",
    			"Content-Type":"application/x-www-form-urlencoded",
    		},
    		data: "s="+symb+"&p=WEEKLY",
    		onload:function(details) {
    			var res = details.responseText;
    			
    			if (GMDebug) 
					GM_log([
						details.status,
				    	details.statusText,	
				    	details.readyState,
				    	details.responseHeaders,
				    	res
				    ].join("\n"));
				
				var pattern = '<img id="chartImg" src="';
				var pIndex = res.indexOf(pattern) + pattern.length;
				var qIndex = res.indexOf('" />', pIndex);
				
				var img = CustomizeYahoo.imgFrame;
				var url = 'http://stockcharts.com' + res.substr(pIndex, qIndex - pIndex);
				if (GMDebug) GM_log("img url = " + url);

				try {
					img = img.wrappedJSObject;
				}
				catch(e) {}
		

				img.src = url;
				img.style.visibility = 'visible';
			},
		};	
		
		GM_xmlhttpRequest(req);				

		return '';
		*/
	}
};

CustomizeYahoo.detectTbl();

function GMC_updateChart(e) {
	
	var srcEle = e.currentTarget;	
						
	if (GMDebug) GM_log("srcEle.id = " + srcEle.id);
	
	var i = 0;
	for (i = 0; i < CustomizeYahoo.iconIds.length; i++) {
		if (CustomizeYahoo.iconIds[i] == srcEle.id)
			break;
	}
	
	if (i == CustomizeYahoo.iconIds.length)
		return;
		
	var symb = CustomizeYahoo.iconSymbs[i];
	
	var url = CustomizeYahoo.getStockChartURL(symb);
		
	if (GMDebug) GM_log("get stock chart for " + symb);
		
	var div = CustomizeYahoo.imgDiv;

	try {
		div = div.wrappedJSObject;
	}
	catch(e) {}
		

	var t = srcEle.offsetHeight;
	var l = 0;
	var p = srcEle;
	while(p) {
		t += p.offsetTop;
		l += p.offsetLeft;
		p = p.offsetParent;
	}
	t += 10;
	if (GMDebug) GM_log("top = " + t + ", left = " + l);
			
	div.style.position='absolute';
	div.style.top = t +'px';
	div.style.left = l + 'px';
	// img.style.visibility = 'visible';
				
}
	
function GMC_closeChart(e) {
	var div = CustomizeYahoo.imgDiv;

	try {
		div = img.wrappedJSObject;
	}
	catch(e) {}
		
	div.style.visibility = 'hidden';
}

