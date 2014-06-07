// ==UserScript==
// @name           Technion - Better Grades
// @namespace      Technion
// @description    This script is meant to tackle some of the issues with the course enlistment issues that frustrated me. The first is that annoying need to click the 'search' button on the search page. The other issue was the grading tables. As if getting to them is not grueling enough, all you get is a plain white table full of numbers. This script allows you to get a colorized table from the course details page in a single click.
// @include			http://techmvs.technion.ac.il/cics/WMN/wmrns1x*
// @include			http://ug.technion.ac.il/rishum/mikdet.php*
// @include			http://techmvs.technion.ac.il:100/cics/wmn/wmnnut02*
// @include			http://ug.technion.ac.il/rishum/logout.php*
// @include			http://ug.technion.ac.il/rishum/search.php*
// ==/UserScript==


/*
LightWeightBox - Thom Shannon
http://www.ts0.com
V 1.0 2006
BSD License
Heavily modified by MasterAM, 2009
*/

var LightWeightBoxOn=false;
var LightWeightBox = function(ele){
	this.ele = ele || document.createElement('div');
	this.backgroundColor = '#CCC';
	this.opacity = 0.5;
};
var LP = LightWeightBox.prototype;
LP.render = function(el){
	if (!this.rendered){
		this.createBody();
	}
	el && this.setBody(el);
	this.show();

};

LP.setBody=function(el){
	this.body.replaceChild(el,this.ele);
	this.ele = el;
};
LP.createBody = function(el){
	var ce = document.createElement;
	var bgDiv =ce('div'),
		self = this;
	
	bgDiv.innerHTML = '';
	bgDiv.style.backgroundColor = this.backgroundColor;
	bgDiv.style.position='fixed';
	bgDiv.style.height='100%';
	bgDiv.style.width='100%';
	bgDiv.style.top=0;
	bgDiv.style.left='0';
	bgDiv.style.opacity=this.opacity;
	var wrap = document.createElement('div');
	wrap.style.position='fixed';
	wrap.style.border='1px solid #343';
	wrap.style.background='#F2F0FF';
	wrap.style.padding = '5px';
	wrap.style.right = '10%';
	var close = ce('a'),
		closeParent = ce('div');
	closeParent.appendChild(close);
	close.addEventListener('click',function(){
		self.hide();
	},false);
	close.appendChild(document.createTextNode('רוגס'));
	var body = ce('div');
	wrap.appendChild(closeParent);
	wrap.appendChild(body);
	
	body.appendChild(this.ele);
	this.body = body;
	body.style.overflow='auto';
	wrap.style.top='20px';
	body.style.height='350px';
	wrap.style.zIndex=1000;
	this.wrap=wrap;
	this.bgDiv=bgDiv;
	document.body.appendChild(wrap);
	document.body.appendChild(bgDiv);
	this.CheckSize();
	this.rendered = true;
	
};
LP.CheckSize = function(){
	if (this.ele.offsetHeight!=this.currentHeight) {
		this.offsetTop = (self.innerHeight/2)-(this.ele.offsetHeight/2);
		this.ele.style.top = this.offsetTop+'px';
		this.currentHeight=this.ele.offsetHeight;
	}
	if (this.ele.offsetWidth!=this.currentWidth) {
		this.offsetLeft = (self.innerWidth/2)-(this.ele.offsetWidth/2);
		this.ele.style.left = this.offsetLeft+'px';
		this.currentWidth=this.ele.offsetWidth;
	}
};

LP.Close=function(oSelf){
	document.body.removeChild(oSelf.bgDiv);
	document.body.removeChild(oSelf.ele);
	LightWeightBoxOn = false;
};
LP.hide=function(oSelf){
	this.wrap.style.setProperty('display','none',null);
	this.bgDiv.style.setProperty('display','none',null);
	this.hedden = true;
};
LP.show=function(oSelf){
	this.wrap.style.setProperty('display','',null);
	this.bgDiv.style.setProperty('display','',null);
	this.hedden = true;
};

////////////////////////////////////////////


var Gradient = {
	/**
	 * Calculates a color that matches the given value from a linear gradient.
	 * The gradient is an object which includes
	 * @param {Object} v Value to be calculeted
	 * @param {Object} g The gradient object
	 */
	calculateGradient:function(v,g){
		var smallVal,smallCol,largeVal,largeCol,k,ratio;

		for(k in g){
			if(!g.hasOwnProperty(k)){continue;}
			if (v > k) {
				smallVal = k;
				smallCol = g[k];				
			}else if(k == v){
				return g[k];
			}
			else{
				largeVal = k;
				largeCol = g[k];				
				break;
			}
		}
		
		if(typeof smallVal === 'undefined'){
			return g[k];
		}
		if(typeof largeVal === 'undefined'){
			return smallCol;
		}
		
		ratio = (v-smallVal)/(largeVal - smallVal);
		return this.rgbAverage(ratio,smallCol,largeCol);

	},
	
	/**
	 * Returns an average color between required values
	 * @param {float} ratio The wanted position between the low and high value. 0 is the low, 1 is the high, any value between is calculated. 
	 * @param {string} low The 'low' color
	 * @param {string} high The 'high' color
	 */
	rgbAverage:function(ratio,low,high){
		low = this.splitCol(low);
		high = this.splitCol(high);
		var i,result='';
		for(i=0;i<3;i++){
			result += String.leftPad(this.getColPct(ratio,low[i],high[i]).toString(16), 2, '0');
		}
		return result;
	},
	
	getColPct:function(ratio,low,high){
		return Math.round(low+((high-low)*(ratio)));
	},
	/**
	 * Splits a hex string into 3 r,g,b decimal value
	 * @param {string} col The color code in 3 or 6 hex digits.
	 * @return array the r,g,b decimal values.
	 */
	splitCol:function(col){
		if(col.length === 3){
			col = col.replace(/([0-F])([0-F])([0-F])/i,'$1$1$2$2$3$3');
		}

		return [parseInt(col.substr(0,2),16),parseInt(col.substr(2,2),16),parseInt(col.substr(4,2),16)];
	}
	
};

var tableColorer = {
	init:function(){
		
		if(this.isForm()){return;}
		var table = this.getTable();
		if(!table){return document.createElement('div');}
		
		this.processTable(table);
	},
	isForm:function(){
		return (document.forms && document.forms[0]);
	},
	getTable:function(){
		var table;
		return (table = document.getElementsByTagName('table') ) && table.langth && table[1];
		
	},
	gradient:{
		//0:'FF4040',
		100:'F30F0F',
		200:'F38989',
		300:'F3BE1E',
		400:'CEE339',
		500:'4EC33D'
	},
	processTable:function(table){
		var i,
			rows = table.rows,
			len=rows.length,
			row;
		for(i=1;i<len;i++){
			row = rows[i];


			this.processRow(row);
		}	
	},
	
	processRow:function(row){
		var cell,i,
			cells=row.cells,color,
			val,
			len = cells.length-4;
			if(cells.length === 0){return;}
		for(i=0;i<len;i++){
			cell = cells[i];
			val = parseFloat(cell.innerHTML,10);
			//temporarily use the color map, later will be converted to gradient...
			val = (Math.floor(val*100));
			try{
				if(typeof (color = Gradient.calculateGradient(val,this.gradient)) === 'undefined'){
					color = 'eee';
				}
				
			}catch(e){
				
			}
			
			cell.style.setProperty('background-color','#'+color,null); 
		}
	},
	
	processCell:function(cell){
	
	}
	
	
};


var listEnhancer = {
	cache:{},
	linkCell:5,
	
	/**
	 * Creates the status and details entry elements. 
	 */
	init:function(){
		
		//preserve scope
		var self = this;
		var handleTableClick = function(e){
			self.onTableClick.apply(self,arguments);
		};
		var status = GM_getValue('name',false) ? 1 : 0,
			messages = ['תוהדזהל תנמ-לע <a href="http://techmvs.technion.ac.il:100/cics/wmn/wmnnut02?OP=LI">ןאכ</a> ץחל .אמסיסהו שמתשמה םש תא ריכמ אל טפירקסה .ליעפ אל רשעומ בצמ','לעפומ רשעומ בצמ'],
			//['מצב מועשר לא פעיל. הסקריפט לא מכיר את שם המשתמש והסיסמא. ','מצב מועשר מופעל'], http://techmvs.technion.ac.il:100/cics/wmn/wmnnut02?OP=LI
			div = document.createElement('div'),
			tbl = document.getElementsByTagName('table')[1];
		//div.appendChild(document.createTextNode(messages[status]));	
		div.innerHTML = messages[status];	
		tbl.parentNode.insertBefore(div,tbl);
		//get the last table and attach the event listeners to each link.
		tbl = document.getElementsByTagName('table');
		tbl = tbl[tbl.length-1];
		tbl.addEventListener('click',{
			handleEvent: handleTableClick
			,scope:this
		},false);
		document.body.addEventListener('keypress',{
			handleEvent: this.handleEscapeClick
			,scope:this
		},false);
		
		
		this.tbl = tbl;
	},
	handleEscapeClick:function(e){
		if(e && e.keyCode === 27){
			this.scope.lightBox && this.scope.lightBox.hide();
		}
	},
	onTableClick:function(e){
		var target = e.target,
			self = this;
		
		if(target.tagName.toLowerCase() === 'a' && target.parentNode.cellIndex === this.linkCell)
		{
			var href = target.getAttribute('href');
			var params = this.getQueryString(href),
				data = this.mergeQueryString(params),
				tbl,
				request = {
				    url:'http://techmvs.technion.ac.il/cics/WMN/wmrns1x',
				    data: data,//'ID=01234567&PASS=12345678&PGRP=10&PLAST=882&PSEM=010901&PSUB=104012&SGLID=YES',
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					overrideMimeType:"text/html; charset=VISUAL",

				    method:'POST',
					onload: function(response) {
						var div = document.createElement('div');
						div.innerHTML = response.responseText;
						var tbl= div.getElementsByTagName('table');
						tbl = tbl && tbl.length && tbl[1];
						
						if (tbl) {
							tableColorer.processTable(tbl);
						}else{
							tbl = document.createElement('div');
							tbl.appendChild(document.createTextNode('No data'));
						}
						self.cache[params.PLAST] = tbl;	
						self.updateBox(tbl);
						//document.body.appendChild(div);
					}
					

				};
			e.preventDefault();
			if((tbl = this.cache[params.PLAST])){
				this.updateBox(tbl);
				return;
			}
			
			if(!params.PASS){
				return;
			}
			this.request = GM_xmlhttpRequest(request);
			
		}
	},
	
	updateBox:function(tbl){
		var div = document.createElement('div');
		div.appendChild(tbl);
		var lb = this.getLightBox();
		lb.render(div);
		
	},
	getQueryString:function(url){
		url=url.split('?')[1].split('&');
		
		var output = {},
			required = ['PGRP','PLAST','PSEM','PSUB'];
		
		
		url.forEach(function(param){
			param = param.split('=');
			if(required.indexOf(param[0]) >= 0){
				output[param[0]] = param[1];
			}
		});
		
		output.PSEM = '01'+output.PSEM.slice(2);
		output.SGLID = 'YES';
		output.ID = GM_getValue('name',false);
		output.PASS = GM_getValue('pass',false);
		
		return output;
		
	},
	mergeQueryString:function(qo){
		var output = [];
		for(var k in qo){
			if(!qo.hasOwnProperty(k)){continue;}
			output.push(k+'='+qo[k]);
		}
		return output.join('&');
	},
	getLightBox:function(){
		return this.lightBox || (this.lightBox = new LightWeightBox());
	},
	/**
	 * Checks whether this is a search window or a course detail window.
	 */
	isSearch:function(){
		if(window.location.pathname.indexOf('search.php') < 0 )
		{
			return false;
		}
		var imgs = document.getElementsByTagName('img');
		return !(imgs.length > 2 && imgs[2].src.indexOf('title_mikdet.gif') >= 0);
	}
	
	
	
};


var Passworder = {
	enrichLogin: function(){
		var tbl = document.getElementsByTagName('table')[1],
			row = tbl.insertRow(tbl.rows.length - 1),
			checkbox = document.createElement('input');
		
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('name', 'remember');
		checkbox.selected = 1;
		row.setAttribute('align', 'right');
		var c1 = row.insertCell(0);
		c1.appendChild(checkbox);
		var c2 = row.insertCell(1), label = document.createElement('label');
		label.setAttribute('for', 'remember');
		label.appendChild(document.createTextNode('טפירקסב םיטרפב שמתשה'));
		//השתמש בפרטים בסקריפט
		c2.appendChild(label);
		
		document.forms[0].addEventListener('submit', {
			handleEvent: function(e){
				var frm = unsafeWindow.document.forms[0];
				if (frm.remember.checked) {
					this.scope.storeData(frm.UID.value, frm.PWD.value);
				}
			},
			scope: this
		}, false);
		
		
		
		'<td><input type="checkbox" checked="1" name="remember"/></td><td>המסיס רוכז</td>';
		//checkbox = checkbox.childNodes[0];
	
	},
	/**
	 * Removes the user name and password data from the script storage
	 */
	logout:function(){
		GM_deleteValue('name');
		GM_deleteValue('pass');
		
	},
	/**
	 * Stores the user name and password in consistent storage for the script
	 * @param {Object} user
	 * @param {Object} pass
	 */
	storeData:function(user,pass){
				GM_setValue('name', user );
				GM_setValue('pass', pass);		
	}
};

String.leftPad = function(d, b, c){
	var a = String(d);
	if (!c) {
		c = " ";
	}
	while (a.length < b) {
		a = c + a;
	}
	return a;
};

var SearchEnhancer = {
	/**
	  * Removes that srupid script that makes the form submit badly when 'enter' is pressed
	  *
	  */
	removeEnterAnnoyance:function(){
		var frm = unsafeWindow.document.forms[0];
		frm.onkeypress = null;
		frm.addEventListener('keypress',{
			handleEvent: this.handleKey
			,scope:this
		},false);
		//document.getElementById('search_button').click();
	},
	handleKey:function(e){
		if(e.keyCode == 13){
			document.getElementById('search_button').click();
		}
	}
	
};



/**
 * a very dirty init...
 */
function init(){
	
	if (window.location.pathname.indexOf('logout.php') >= 0) {
		Passworder.logout();		
	} else if(window.location.pathname.indexOf('rishum') >0) {

		if(!listEnhancer.isSearch() ) {
			listEnhancer.init();
		}else{
			SearchEnhancer.removeEnterAnnoyance();
		}
	} else if( window.location.host.indexOf('techmvs') >= 0 ){
		Passworder.enrichLogin();
	}else{
		tableColorer.init();
	}
}

init();
