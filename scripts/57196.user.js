// ==UserScript==
// @name           Jira Change Combiner
// @namespace      http://home.comcast.net/~mailerdaemon
// @include        *jira*/browse/*-*
// @description    Combine changes made by the same author
// @version        1.7
// @grant       GM_addStyle
// @grant       GM_log
// ==/UserScript==

const Flatten = ["Link", "Affects Version/s", "Fix Version/s", "Component/s", "Attachment", "Resolution", "Labels"];//"Workflow"
const HideBetween = ["Description"];
const Squash = ["Status", "Resolution"];

//Do not run Squash on user entered text fields.
//Changes in whitespace will be ignored which could lead to inappropriate squashing.

//Setting the sensativity time to lessthan or equal to zero will turn off flatten.
const FlattenTimeSensativity = 5; //5 min // Infinity

//To always flatten set value as Infinity

//todo
//1) ordering ~ http://jira.secondlife.com/browse/VWR-14528
//              I'm not sure if this should be fixed.

const XPathProfilingLevel = 0;
const CompiledXPath = {};
if(XPathProfilingLevel > 0)
	log(CompiledXPath);

GM_addStyle([//{
		"tr.dated > td:first-child { white-space: nowrap; }",
		"tr.sameDate > td:first-child span.jcc-field-date {opacity:0.2;}",
		"tr.sameDate > td:first-child.flattened span.jcc-field-date {opacity:0.3;}",
		"tr.sameDate > td:first-child span.jcc-field-date:hover {opacity:0.45;}",
		".hideRowDates tr.dated > td:first-child span.jcc-field-date {display:none;}",
		".jcc-field-date, #date { font-size:80%; }",
//		"table[id^=\"changehistory_\"] > tbody > tr > td:first-of-type { min-width: 12em;}",
//		"table[id^=\"changehistory_\"] > tbody > tr > td:nth-of-type(n+2) { width: 50%;}",
		"tr.overline > td { border-top: 1px dotted gray; }",
		"tr.dated > td:first-child span.jcc-field-name { float:left; }",
		"tr.dated > td:first-child span.jcc-field-date { float:right; }",
	].join("\n\n"));//}

unsafeWindow.JIRA.bind(unsafeWindow.JIRA.Events.ISSUE_REFRESHED, function(e, context, reason) { run_amok(); });
run_amok();

function run_amok(){
	if(p = $X("//div[@id='issue_actions_container']")) {
		var cache = new Cache();
		var mode = 0;
		var counter = 0;
		var r, n;
		var base = null;
		
		$Z("*", function(r,i){
			if(rr = $X(compileXPath("descendant-or-self::*[position() < 3 and contains(concat(' ', @class, ' '), ' actionContainer ') and div[@id='changehistory' or contains(concat(' ', @class, ' '), ' changehistory ')]]"), r))
			{
				base = null;
				//span is used by comments, font by changes!
				//r.date = $X(".//div[@class='action-details']/node()[self::span or self::font]", r);
				r.date = $X(compileXPath(".//div[@class='action-details']/*[self::font or self::span[contains(concat(' ', @class, ' '), ' date ')]]"), rr);
				if(!r.date)
					return;
				r.user = $X(compileXPath(".//div[@class='action-details']/a[@id]"), rr).textContent.trim();
				let time = $X(compileXPath("./time"), r.date);
				r.time = time?new Date(time.getAttribute("datetime")):JiraTimeStringToDate(r.date.textContent.trim());
				r.counter = ++counter;
	//			log(r, rr, r.date, r.user, r.time, r.counter)
				cache.process(r);
			}
			else if(r.id.lastIndexOf("comment-", 0) == 0)
			{
				cache.release();
				base = null;
			}
			else if($X(compileXPath("self::table[not(descendant::*[(self::td or self::th)][1][descendant::text()='Transition'] or contains(concat(' ', @class, ' '), ' gridTabBox '))]"), r))
			{
				//log(r, r.parentNode)
				cache.release();
				
				r.rows[0].cells[1].width = r.rows[0].cells[3].width = r.rows[1].cells[1].width = r.rows[1].cells[3].width = "5%"
				r.rows[0].cells[2].width = r.rows[1].cells[2].width = "20%"
				
				Array.slice(r.rows[1].cells, 1).forEach(function(td){td.removeAttribute("rowspan");});
				Array.slice(r.rows, 2).forEach(function(tr){ tr.cells[0].setAttribute("colspan", 4); });
				
				if(base)
				{
					r.rows[1].className="overline"
					Array.slice(r.rows,1).forEach(base.appendChild);
					remove(r);
				}
				else
				{
					base = $X(compileXPath("./tbody",r));
					var div = document.createElement("div")
					div.className="actionContainer"
					p.replaceChild(div, r);
					div.appendChild(r);
				}
			}
		}, p)
		cache.release();
	}
}
function Cache(base) {
	let that = this;
	this.counter = 0;//don't reset this, evah!!!
	this.ready = null;
	this.setup = function(b){
			this.flush(true);
			this.previous = this.base = b;
			this.elements = new Object();
			this.slack = [];
			this.ready = b != null;
			this.mixed = false;
			this.last = null;
		}
	this.release = function(){
			this.flush(true);
			this.ready = false;
		}
	this.addItem = function(group, item){
			var a = this.elements[group];
			if(typeof(a) == "undefined")
				a = this.elements[group] = [];
			a.push(item);
			return a;
		}
	this.flush = function(finished){
			if(this.ready)
			{
				if(!finished)
					this.mixed = true;
				
				var last = this.last, tbody = this.base.tbody;
				if(!last)
					last = {name:null, date:null, datechild:null};
//				else log(last, last.name, last.time, last.date);
					
				for (var e in this.elements)
				{
					var elements = this.elements[e];
					if(elements.length > 1 && Flatten.indexOf(e) != -1)
					{
						var elm = this.elements[e].map(function(f){ return {a: f.cells[1], b: f.cells[2], f:f};});
						for(var p = 0, q = 1; q < elm.length; p=q++)
						{
							var a = elm[p];
							var b = elm[q];
							var aa = Simplify(a.a.textContent), ab = Simplify(a.b.textContent);
							var ba = Simplify(b.a.textContent), bb = Simplify(b.b.textContent);
							//log({aa:aa, ab:ab, ba:ba, bb:bb, aat:(aa == ""), abt:(ab == ""), });
							if(aa == "" || ab == "")
							{
								if((aa == bb) != (ab == ba))//make sure they aren't equal, it looks really weird when you flatten equals.
								{
									if(aa == "")
									{
										swap(a.a, b.a);
										a.a = b.a;
									}
									else
									{
										swap(a.b, b.b);
										a.b = b.b;
									}
									//Post flattening, this shows the time change. I don't want to discard this but I don't like how it looks.
									/**/
									if((a.f.time - b.f.time))
									{
										insertAfter(b.f.date.cloneNode(true), insertAfter(document.createTextNode(" ~ "), a.f.datechild));
										a.f.classList.add("flattened");
									}
									/**/
									//log({a:[a.f.date.textContent], b:[b.f.date.textContent]});
									remove(b.f);
									elm.splice(q,1)//.map(function(f){remove(f.f)});
								}
							}
						}
						elements = elm.map(function(f){return f.f;});
					}
					elements.forEach(function(f){
							if(f.name == last.name){
								f.classList.add("sameType");
								if((f.time - last.time == 0) && (FlattenTimeSensativity >= 0))
									f.classList.add("sameDate");
							}
							tbody.appendChild(remove(last = f));
						});
				}
				if(last.name)
					this.last = last;
				
				this.elements = new Object();
				
				if(finished)
				{
					if(this.mixed)
					{
						var last_container = this.base.date.parentNode;
						last_container.appendChild(document.createTextNode(" ~ "));
						last_container.appendChild(this.slack[this.slack.length - 1].date.cloneNode(true));
					}
					else
						this.base.classList.add("hideRowDates");
					this.slack.forEach(remove);
				}
			}
		}
	this.process = function(r){
			if(!this.ready || r.user != this.base.user)
				this.setup(r);
			else if((diff = Math.abs(r.time - this.previous.time)) || FlattenTimeSensativity <= 0)
			{
				//log({e:this.previous.date.textContent, r:r.date.textContent, diff:diff, flush:(diff > TimeSensativity)});
				if(diff > (FlattenTimeSensativity * 60000))
					this.flush(false);
				else
					this.mixed = true;
			}
			var u = null;
			let dirty = [];
			
			$Z(compileXPath(".//div[@id='changehistory' or contains(concat(' ', @class, ' '), ' changehistory ')]//tbody/tr/td[position()=1 and not(@bgcolor='#dddddd')]"), function(td,c){
					var name = td.textContent.trim();
					var tr = td.parentNode;
//					if(Squash.indexOf(name) != -1)
//						log({left:Simplify(tr.cells[1].textContent), right:Simplify(tr.cells[2].textContent)});
					if((Squash.indexOf(name) != -1) && (Simplify(tr.cells[1].textContent) == Simplify(tr.cells[2].textContent)))
					{
						dirty.push($X("./ancestor::tbody[1]", tr));
						remove(tr);
					}
					else
					{
						u = tr;
						tr.name = name;
						tr.date = r.date;
						tr.time = r.time;
	//					tr.counter = r.counter;
	//					tr.sortkey = ++this.counter;
						tr.row = tr;
						tr.classList.add("dated");

						that.addItem(name, tr);
						var d = document.createElement("span");
							d.classList.add("jcc-field-date");
							d.appendChild(tr.datechild = tr.date.cloneNode(true));
						td.appendChild(d);
						
						var text = findTextElementContaining(name, td);
						var span = $X("ancestor::span", text);
						if(!span)
							span = insertAsParent(document.createElement("span"), SplitTextNode(text, name));
						span.classList.add("jcc-field-name");
					}
				}, r);
			
			if(dirty.length > 0)//I never thought I would see dirty data!
				for each(var dirt in dirty)
					if(!$X("tr", dirt)){
						let block = $X("./ancestor::div[contains(concat(' ', @class, ' '), ' issue-data-block ')]", dirt);
						if(block.parentNode)
							remove(block);
					}
			
			if(u)
			{
				this.previous = r;
				if(r == this.base)
					this.base.tbody = u.parentNode;
				else
					this.slack.push(r);
			}
			else
			{
				//remove(r);

				//since we don't want to screw up the dates we need to trash the container
				//easiest way is to trick it into thinking it's not ready.
				//The next time process is called it will run setup.
				if(r == this.base)
					this.ready = false;
			}
		}
	this.setup(base);
}

//{Xpath
function $W(_xpath, node, array, transform){
	array = array || [];
	var res;
	if(_xpath instanceof XPathExpression){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return;
		}
	}

	if(transform) {
		var args = Array.slice(arguments, 4);
		for (let j, i = 0; i < res.snapshotLength; ++i)
			if((j = transform.apply(null, [res.snapshotItem(i), i].concat(args))) !== undefined)
				array.push(j);
	}
	else
		for (let i = 0; i < res.snapshotLength; ++i)
			array.push(res.snapshotItem(i));
	return array;
}

function $X(_xpath, node, result){//to search in a frame, you must traverse it's .contentDocument attribute.
	if(_xpath instanceof XPathExpression){
		return _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			return doc.evaluate(_xpath, node, null, result || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return null;
		}
	}
}

function $Y(_xpath, node, transform){
	var res;
	if(_xpath instanceof XPathExpression){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return;
		}
	}
	if(transform) {
		var args = Array.slice(arguments, 3);
		for (let i = 0, j; i < res.snapshotLength; ++i)
			if((j = transform.apply(null, [res.snapshotItem(i), i].concat(args))) !== undefined)
				yield j;
	}
	else
		for (let i = 0; i < res.snapshotLength; ++i)
			yield res.snapshotItem(i);
}

function $Z(_xpath, func, node){
	var res;
	if(_xpath instanceof XPathExpression){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return null;
		}
	}
	var args = Array.prototype.slice.call(arguments, 3);
	var i = 0;
	for (; i < res.snapshotLength; ++i)
		func.apply(null, [res.snapshotItem(i), i].concat(args));
	return i;
}
function compileXPath(_xpath, namespaceURLMapper){
	if(_xpath instanceof XPathExpression)
		return _xpath;//dipshit, you don't need to compile this!
	
	if(CompiledXPath.hasOwnProperty(_xpath)){
		let expr = CompiledXPath[_xpath];
		if(XPathProfilingLevel > 0)
			++expr.lookups;
		return expr;
	}
	let expr;
	try{
		expr = document.createExpression(_xpath, namespaceURLMapper);
	}
	catch(e){
		log([e].concat(Array.slice(arguments)));
		return null;
	}
	switch(XPathProfilingLevel){
		case 1:
			if(typeof(expr.evaluate.bind) === "function"){
				expr = {
					__proto__:expr,
					source:_xpath,
					lookups:1,
					evaluate:expr.evaluate.bind(expr),
					evaluateWithContext:expr.evaluateWithContext.bind(expr),
				};
				break;
			}//if you don't have bind, fall through to the next level that doesn't require bind.
		case 2:
			expr = {
				__proto__:expr,
				source:_xpath,
				lookups: 1,
				evaluated: 0,
				evaluate:function(){ this.evaluated++; return this.__proto__.evaluate.apply(this.__proto__, arguments); },
				evaluateWithContext: function(){ this.evaluated++; return this.__proto__.evaluateWithContext.apply(this.__proto__, arguments); },
			};
			break;
	}
	return CompiledXPath[_xpath] = expr;
}
//}

function insertAsParent(new_parent, node) {
	return new_parent.appendChild(node.parentNode.replaceChild(new_parent, node)) && new_parent;
}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}
function remove(node){return node.parentNode.removeChild(node);}
function swap(a, b, comment){
	if(a != b)
	{
		var c = a.nextSibling; 
		var ap = a.parentNode;
		var bp = b.parentNode;
		bp.insertBefore(ap.removeChild(a), b);
		ap.insertBefore(bp.removeChild(b), c);
//		GM_log([comment, a.src?a.src:a, b.src?b.src:b].join("\n"));
	}
}

function GetParentNodeBy(child, func, bad) {
	var i = 0;
	while((child = child.parentNode) && !func(child, i)) i++;
	return child?child:bad;
}

function JiraTimeStringToDate(str) {
	return new Date(str.replace(/^(\d{2})\/([A-Z][a-z]{2})\/(\d{2})/, "$2 $1 20$3"));
}

function Simplify(str){
	return str.replace(/\s+/g," ").trim();
}

function findTextElementContaining(text, root, extraXpathTest, postfix, prefix, startsWithNotContains) {
	let s = false, d = false;
	if(Array.some(text, function(c){ switch(c){ case "\"": d = true; break; case "\'": s = true; break; } return s && d; })) {//bloody hell it uses both
		if(startsWithNotContains){
			if(postfix) {
				let f = compileXPath(postfix);
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()["+postfix+"]" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.lastIndexOf(text, 0) == 0)
						return $X(f, node);
			}
			else
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.lastIndexOf(text, 0) == 0)
						return node;
		}
		else {
			if(postfix) {
				let f = compileXPath(postfix);
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()["+postfix+"]" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.indexOf(text) > -1)
						return $X(f, node);
			}
			else
				for(let node in $Y((prefix!=null?prefix:"descendant-or-self::")+"text()" + (extraXpathTest?"["+extraXpathTest+"]":""), root))
					if(node.nodeValue.indexOf(text) > -1)
						return node;
		}
	}
	else if(s)
		return $X((prefix!=null?prefix:"descendant-or-self::")+"text()["+(startsWithNotContains?"starts-with":"contains")+"(., \""+text+"\")]" + (extraXpathTest?"["+extraXpathTest+"]":"")+(postfix?"/"+postfix:""), root);
	else// if(d)
		return $X((prefix!=null?prefix:"descendant-or-self::")+"text()["+(startsWithNotContains?"starts-with":"contains")+"(., '"+text+"')]" + (extraXpathTest?"["+extraXpathTest+"]":"")+(postfix?"/"+postfix:""), root);
	return;
}

function SplitTextNode(node, str, replace){
	let p;
	if(node && node.nodeValue && (p = node.nodeValue.indexOf(str)) > -1) {
		if(before = node.nodeValue.substring(0, p))
			insertBefore(document.createTextNode(before), node);
		if(after = node.nodeValue.substring(p + str.length))
			insertAfter(document.createTextNode(after), node);
		node.nodeValue = (replace == null)?str:replace;
		return node;
	}
	return;
}

function log() {
	var arg;
	switch(arguments.length)
	{
		case 1:
			arg = arguments[0];
			break;
		case 0:
			arg = null;
			break;
		default:
			arg = arguments;
			break;
	}
	/*
	var f = JSON.stringify(arg);
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) != "undefined")
		unsafeWindow.console.log(f);
	else
		GM_log(f);
	/*/
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) != "undefined")
		unsafeWindow.console.log(arg);
	else
		GM_log(JSON.stringify(arg));
	//*/
	return arg;
}
