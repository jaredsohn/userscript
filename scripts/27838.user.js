// ==UserScript==
// @name           Jira Comment Highlighter
// @namespace      http://home.comcast.net/~mailerdaemon
// @include        *jira*/browse/*-*
// @version        2.8
// @grant       GM_addStyle
// @grant       GM_log
// ==/UserScript==

//It took a hell of a lot of digging to find this:
//https://developer.atlassian.com/display/JIRADEV/Inline+Edit+for+JIRA+Plugins

const CollapsedAtStart = true;

const Colors = {
		".admin":"rgba(255, 255, 0, 0.2)",
		".reporter":"rgba(0, 255, 255, 0.2)",
		".iAssignee":"rgba(255, 0, 255, 0.2)",
		".reporter.iAssignee":"rgba(0, 0, 255, 0.106)",
		".admin.iAssignee":"rgba(255, 92, 128, 0.2)",
		".reporter.admin":"rgba(128, 255, 0, 0.15)",
		".me":"rgba(0, 255, 0, 0.106)",
		".critical":"rgba(255, 0, 0, 0.6)",
		".interest":"rgba(96, 96, 256, 0.5)",
	}

const CollapsableColor = "rgba(255, 140, 64, 0.45)";
const CommentColor = "orange";
const ChangeColor = "violet";

const domains = {
	"jira.secondlife.com": {
			admins: [
					"contains(text(), ' Linden')",
					"contains(text(), ' linden')",
//					"contains(text(), '.linden')",
//					"contains(text(), '.productengine')",
//					"contains(text(), ' productengine')",
					"contains(text(), ' ProductEngine')",
					"text()='ProductEngine Team'",
					"text()='lindenrobot'",
				].join(" or "),
			interest: ["Linden Lab Issue ID", "Approved By"],
		},
	"jira.atlassian.com": {
			admins: [
					"text()='Support Count Updater'",
					"text()='Brian Lane'", 
					"contains(text(), '[Atlassian]')", 
					"contains(text(), '[JIRA Product Manager]')",
				].join(" or "),
		},
	"jira.openmetaverse.org": {
			admins: "text()='Jira Administrator'",
		},
	get: function(name, default_value){
			if((a = this[document.location.host]) && (b = a[name]))
				return b;
			return default_value;
		},
	getArrayWith: function(name, array){
			if((a = this[document.location.host]) && (b = a[name]))
				return (array === null)?b:Array.concat(b, array);
			return array;
		},
	};

const interest = ["Priority", "Key", "Assignee", "Issue Type", "Type"];
const critical = ["Status", "Resolution", "Parent"];
const comment = ["Comment"]
const collapse = ["Description", "Comment", "Steps to Reproduce"]; 
const CombinedDiff = ["Description", "Steps to Reproduce"]
const SideBySideDiff = ["Summary", "Environment", "Labels"];

const Debug_diffString = 0;

const RearrangeSubversionCommits = true;

//Todo Write a function to double the a
function DoubleA(rgba){
	var split = /^[\s]*(rgba[\s]*\(.*\))[\s]*;?[\s]*$/;
	var m = split.exec(rgba);
	if(m) {
		try { rgba = eval("function rgba(r,g,b,a){return 'rgba('+r+','+g+','+b+','+(a*2)+')'}; "+m[1]); } catch(e) { }
	}
	return rgba;
}

const XPathProfilingLevel = 0;
const CompiledXPath = {};
if(XPathProfilingLevel > 0)
	log(CompiledXPath);

//collapses the extra whitespace
GM_addStyle([//{
		"div#issue_actions_container > br{ line-height:0px;}",
		"div.action-body, div.action-body :last-child { margin-bottom: 0;}",
		"div.action-links { background-color: transparent; padding-bottom: 4px;}",
		"table.commit td[bgcolor] { background-color: transparent;}",
		"div.action-details, div[id^=\"comment-\"][id$=\"-closed\"] > div.actionContainer > div.action-links { background-color: rgba(0, 0, 0, 0.05);}",
		"div#changehistory td { background-color: transparent;}",
		"div#changehistory td[bgcolor='#dddddd'], div.action-body > table.commit tr.darken > td { background-color: rgba(0, 0, 0, 0.13);}",
		
		"div.actionContainer.table div.action-body {margin: 0;}",
		
		".actionContainer { background-color:transparent; }",
		
		".collapsable .collapse {width:100%; overflow-y:auto; min-height:1.3em;} .collapsable .collapse[style*=\"height: 0px;\"]:hover { height:auto!important; }",
		".collapsable .sizer {cursor: s-resize; height: 4px; width:100%; background-color: rgba(255, 140, 64, 0.25); border-radius:3px 0 0;}",//rgba(0, 0, 0, 0.1)
		//".collapsable {background-color: "+CollapsableColor+";}",
		//must overwride div#changehistory td
//		".collapsable > td:first-child {padding:0 5px 5px 3px; }",
		".collapsable .collapse-toggle {background-color: "+CollapsableColor+" !important; -moz-user-select: none; padding: 0 2px; border-radius: 6px; margin-right:0.4ch; cursor: pointer;}",
		
		"tr.commit-meta { vertical-align:top; }",
		
		".diffed { padding:0!important; }",
		".diffed del.diff, .diffed-left del.diff { background-color: rgba(255, 0, 0, 0.3); text-decoration:none;"+CSSmulti("box-shadow", "0 0 2px rgba(255, 0, 0, 0.6)")+";}",
		".diffed ins.diff, .diffed-right ins.diff { background-color: rgba(0, 255, 0, 0.3); text-decoration:none;"+CSSmulti("box-shadow", "0 0 2px rgba(0, 255, 0, 0.6)")+";}",
		".diffed-right del.diff, .diffed-left ins.diff {display:none;}",
		
		".diffed .diff span.beforebr:before { content: \"\u21B2\"; opacity: 0.33;} ",//\u21B2 &#8626;
		
		"/*auto colors begin*/",
		[(selector + " { background-color: " + Colors[selector] +"; "+CSSmulti("box-shadow", "0 0 5px "+DoubleA(Colors[selector]))+"; }") for (selector in Colors)].join("\n"),
		"/*auto colors end*/",
		"a[href^='/secure/ViewProfile.jspa'], .user-hover, .colored a { text-shadow: 0 0 2px white, 0 0 2px white, 0 0 1px white; }",
		"#header-top a[href^='/secure/ViewProfile.jspa'], #header a[href^='/secure/ViewProfile.jspa'] { text-shadow: none; }",
/*
		"div#issue_actions_container .actionContainer { border-width: 0px 2px; border-style: solid; }",
		"div#issue_actions_container .actionContainer { border-color: "+ChangeColor+"; }",
		"div#issue_actions_container > div > .actionContainer { border-color: "+CommentColor+"; }",
*/
		".issue-data-block > .actionContainer { padding-left:1.25em; }",
		
		".transition-table td { background-color:transparent;} ",
		
		"#issue_actions_container > table.gridTabBox td { white-space: nowrap; }",
	].join("\n"));//}

init();
/*
const before = 'text()="';
const after = '"';
*/
/*
const before = '@href="/secure/ViewProfile.jspa?name='
const after = '"'
*/

const before = '(contains(concat(" ", @class, " "), " user-hover ") and @rel="'
const after = '")'

//TODO set Assignee.style.backgroundColor, Reporter.style.backgroundColor, etc in div and table parsers.

unsafeWindow.JIRA.bind(unsafeWindow.JIRA.Events.ISSUE_REFRESHED, function(e, context, reason) { run_amok(); });
run_amok();

function run_amok(){
	var Reporter = find("Reporter", "/a");
	var base = $X(compileXPath("//div[@id='issue_actions_container']"));
	//log(Reporter, base)
	if(Reporter && base) {
	//*
		{//Tag transition box if visibile for later workings
			$Z("./*/descendant-or-self::table[position() < 3 and tbody/tr[1]/td[1]/b[text()='Transition']]", function(r){
					r.className = (r.className + " transition-table").trim();
					/*
					if(!$X("parent::div[contains(concat(' ', @class, ' '), ' actionContainer ')]", r))
					{
						var div = document.createElement("div")
						div.className="actionContainer"
						p.replaceChild(div, r);
						div.appendChild(r);
					}//*/
				}, base)
		}
		
		{//Convert legacy bits into modern bits - imperfectly.
			//this code handles old extensions... sorta.		
			$Z("./div[@class='action-details']", function(details){
				//log(details)
				body = $X(compileXPath("./following-sibling::div[@class='action-body' and position()=1]"), details)
					//some plugins litter the box with thier bits so we fix them.
					var div = document.createElement("div");
						div.className="actionContainer"
					base.replaceChild(div, details);
					div.appendChild(details);
					div.appendChild(body);
					
					//div0 - 2008-07-30 14:04:43.0
					var m = /^(.*) - ([\d]{4})-([\d]{2})-([\d]{2}) ([\d]{2}):([\d]{2}):([\d]{2})\.([\d]+)$/.exec(details.textContent);
					if(m){
						//convert date into bastard JIRA format.
						var date = new Date(m[2], m[3] - 1, m[4], m[5], m[6], m[7], m[8]).toLocaleFormat("%d/%b/%y %I:%M %p");
						var user = urlencode(m[1]);
						
						//GM_log(user)
						div.className += " retro"
						
						var link = document.createElement("a");
							link.id="retro_"+user;
							//link.search = "?name="+user;
							link.href = "/secure/ViewProfile.jspa?name="+user;
						//	link.appendChild(document.createTextNode(user));
						var name = user;
						
						/**/
						var outer = document.createElement("span");
							outer.className="subText";
						var inner = document.createElement("span");
							inner.className="date";
						/*/
						var outer = document.createElement("font");
							outer.size="-2";
						var inner = document.createElement("font");
							inner.color="#336699";
						/**/
						
						outer.appendChild(inner);
						inner.appendChild(document.createTextNode(date));
						
						var text = "did something inderterminate";
					var patch = $X(compileXPath("./a[starts-with(@href, '../secure/viewDiff.jspa?')]"), body)
						if(patch)
						{//Latest 05/Oct/09 04:26 PM - Douglas R Miles
							text = "uploaded a patch";
						var file = $X(compileXPath("//table[@id='issueDetailsTable']/tbody/tr/td[@id='file_attachments']//a[text()='"+patch.textContent+"']"));
							name = file.title.replace(/^[^-]+- (.*)$/, "$1");
							//GM_log("'"+name + "' = '" + user + "'" ); 
						}
						
						link.appendChild(document.createTextNode(name));
						
						details.removeChild(details.firstChild);
						details.appendChild(link);
						details.appendChild(document.createTextNode(" " + text + " - "));
						details.appendChild(outer);
					}
				}, base)
			/*
			$Z("./table", function(table){
				log(table)
					//What is in the table?
					var div = document.createElement("div");
						div.className="actionContainer table"
					base.replaceChild(div, table);
					div.appendChild(table);
					
					var header = table.rows[0];
					if($X("./b", header.cells[0]).textContent == "Repository"){
						user = table.rows[1].cells[3].textContent;
						//unsafeWindow.mt = table.rows[1].cells[2].textContent
						var m = /^([A-Z][a-z]{2})( [A-Z][a-z]{2} )\s*([\d]{1,2})( [\d]{2}:[\d]{2}:[\d]{2}) .*?( [\d]{4})$/.exec(table.rows[1].cells[2].textContent);
						var date = new Date(m[1] + "," + m[2] + m[3] + m[5] + m[4]).toLocaleFormat("%d/%b/%y %I:%M %p")
						table.rows[2].className = header.className = "darken";
						
						table.className = "commit"
						table.rows[1].className = "commit-meta"
						
						table.rows[0].cells[1].width = table.rows[0].cells[3].width = table.rows[1].cells[1].width = table.rows[1].cells[3].width = "5%"
						table.rows[0].cells[2].width = table.rows[1].cells[2].width = "20%"
						
						
						Array.forEach(Array.slice(table.rows[1].cells, 1), function(td){td.removeAttribute("rowspan");});
						Array.forEach(Array.slice(table.rows, 2), function(tr){ tr.cells[0].setAttribute("colspan", 4); });
						
						var link = document.createElement("a");
							link.id="retro_"+user;
							link.href = "/secure/ViewProfile.jspa?name="+user;
							link.appendChild(document.createTextNode(user));
						
						//
						//var outer = document.createElement("span");
						//	outer.className="subText";
						//var inner = document.createElement("span");
						//	inner.className="date";
						//
						var outer = document.createElement("font");
							outer.size="-2";
						var inner = document.createElement("font");
							inner.color="#336699";
						//
						
						outer.appendChild(inner);
						inner.appendChild(document.createTextNode(date));
						
						var details = document.createElement("div");
							details.className='action-details'
						var body = document.createElement("div");
							body.className='action-body'
						
						details.appendChild(link);
						details.appendChild(document.createTextNode(" made some commits - "));
						details.appendChild(outer);
						
						div.appendChild(details);
						div.appendChild(body);
						body.appendChild(table);
						//TODO build an action-body and action-details (we have all the info), just need to parse the date ~_~
					}
				}, base)
			//*/
		}
			
		{//legacy and user coloring
			/* only color them if they do something noteworthy
			nodes.reporter.className = (nodes.reporter.className + " reporter").trim();
			if(nodes.assignee)
				nodes.assignee.className = (nodes.assignee.className + " iAssignee").trim();
			if(nodes.me)
				nodes.me.className = (nodes.me.className + " me").trim();
			//*/
		
			//this code needs to be simplified, so that it doesn't search so hard.
			
			var groups = {};
//			log(groups)
			function Group(name, node, id, className){
					if(node) {
//						log(arguments, this);
						this.node = node;
						this.name = node.textContent.trim();
						this.id = (id || function(node){return node.getAttribute("rel") || (parse_search(node.search).pairs.name);}).call(this, node, this.name);
						this.extraNodes = [];
						if(this.id) {
							for each(let group in groups) {//merge them if they are the same.
								if(this.id == group.id) {
									group.extraNodes.push(node);
									group.classList = group.classList.concat(className || name);
									return this;
								}
							}
							this.classList = [className || name];
							groups[name] = this;
						}
					}
				}
			
			function run(expr, classList) {
					for (gn in groups)
						for each(node in groups[gn].nodes)
							if($X(compileXPath(".["+expr+"]"), node))
								classList.forEach(function(p){ if(p) node.classList.add(p); });

					return $Z((".//div[contains(concat(' ', @class, ' '), ' actionContainer ') and div[contains(concat(' ', @class, ' '), ' action-details ') and a["+ expr +"]]]"+
						" | .//table[contains(concat(' ', @class, ' '), ' transition-table ')]/tbody/tr[position() > 1 and td[4]//a["+ expr +"]]"+
						" | //div[@id='attachmentmodule']//a["+ expr +"]"),
						function(r){
								//GM_log("'"+$X('./div[starts-with(@class,"action-details")]/a['+ expr +']/text()', r).nodeValue + "' = '" + classList +"' ~ '" + expr + "'" ); 
								r.classList.add("colored");
								classList.forEach(function(p){ if(p) r.classList.add(p); });
								return 1;
							}, base);
				}
				
			Group.prototype = {
					run: function(){ run(before+this.id+after, this.classList); },
					get nodes(){ return [this.node].concat(this.extraNodes); },
				};
				
			new Group("assignee", find("Assignee","/a"), undefined, "iAssignee");
			new Group("reporter", Reporter);
			new Group("approvedBy", find("Approved By","//a"));
			new Group("me", $X("//div[@id='header-top']//a[(starts-with(@id,'user_nav_bar_') or @id='header-details-user-fullname' or not(@id)) and starts-with(@href,'/secure/ViewProfile.jspa')]"+" | "+
				"//header//a[@id='header-details-user-fullname']"),//"//a[starts-with(@id,'user_nav_bar_')]"
				function(node, name){
				return node.getAttribute("rel") || node.getAttribute("data-username") ||  parse_search(node.search || ((temp = $X(compileXPath("//a[starts-with(@href,'/secure/ViewProfile.jspa?name=') and text()='"+name+"']"))) && temp.search)).pairs.name || temp.getAttribute("rel") || temp.getAttribute("data-username");
				});
		
			let admins = domains.get("admins");
			if(admins)
				run(admins, ["admin"])
			for each(var group in groups)
				group.run();
//			log(groups);
		}
		
		{//extra coloring
			go(".//table[starts-with(@id,'changehistory_')]//tr[td[position()=1 and descendant-or-self::*[", "contains(text(),'", domains.getArrayWith("interest", interest), "')", "]]]", 
					function(r,i){r.className = (r.className + " interest").trim(); return 1;}, base);
			go(".//table[starts-with(@id,'changehistory_')]//tr[td[position()=1 and descendant-or-self::*[", "contains(text(),'", domains.getArrayWith("critical", critical), "')", "]]]", 
					function(r,i){r.className = (r.className + " critical").trim(); return 1;}, base);//*/
			go(".//table[starts-with(@id,'changehistory_')]//tr[td[position()=1 and descendant-or-self::*[", "contains(text(),'", domains.getArrayWith("comment", comment), "')", "]]]", 
					function(r,i){
						r.className = (r.className + " comment").trim();
						var td = r.cells[1];
						td.innerHTML=td.textContent.replace(/^\s*\[\s*/g,"").replace(/\s*\]\s*$/g,"");
					}, base);//*/
			go(".//table[starts-with(@id,'changehistory_')]//tr[td[position()=1 and descendant-or-self::*[", "contains(text(),'", domains.getArrayWith("CombinedDiff", CombinedDiff).concat(domains.getArrayWith("comment", comment)), "')", "]]]", 
					function(r,i){
//						debug("CombinedDiff", r);
						let left = r.cells[1];
						let right = r.cells[2];
						r.classList.add("diff-combined");
						right.classList.add("diffed");
						right.colSpan="2";
						right.width="80%";
						remove(left);
						right.innerHTML = diffString(left, right);
						return diffCleanup(right);
					}, base);
			go(".//table[starts-with(@id,'changehistory_')]//tr[td[position()=1 and descendant-or-self::*[", "contains(text(),'", domains.getArrayWith("SideBySideDiff", SideBySideDiff), "')", "]]]", 
					function(r,i){
	//					debug("SideBySideDiff", r);
						let left = r.cells[1];
						let right = r.cells[2];
						r.classList.add("diff-sidebyside");
						left.classList.add("diffed-left");
						right.classList.add("diffed-right");
						left.innerHTML = right.innerHTML = diffString(left, right);
						return diffCleanup(left);
					}, base);
			//*
			go(".//table[starts-with(@id,'changehistory_')]//tr[td[position()=1 and descendant-or-self::*[", "contains(text(),'", domains.getArrayWith("collapse", collapse), "')", "]]]", 
					function(r,i){
					//TODO disable when initial.scrollHeight < window.getComputedStyle(.collapse).height
						r.className = (r.className + " collapsable").trim();
						var td = document.createElement("td"); td.colSpan="2"; td.width="80%"; td.style.paddingBottom=td.style.paddingRight="0";
						var div = document.createElement("div"); div.className="collapse"; 
						//log(r)
						var name = $X(compileXPath("./td[1]/descendant-or-self::*[string-length(translate(text(), ' \t', '')) > 4]"), r);
						if($X(compileXPath("self::td"), name))
						{
							var span = document.createElement("span");
							while(name.firstChild)
								span.appendChild(name.firstChild);
							name.appendChild(span);
							name = span;
						}
						name.innerHTML = name.innerHTML.trim();//whitespace influences CSS border
						name.title = "Double click to toggle full and collapsed modes."
						name.className = (name.className + " collapse-toggle").trim();
						
						td.appendChild(div);
						while(r.cells[1])
							div.appendChild(r.cells[1]);
						
						var sizer = document.createElement("div");
						sizer.className="sizer";
						sizer.title = "Drag to manually resize. " + name.title;
						
						td.appendChild(sizer);
						r.appendChild(td);
						
						addEvent(sizer, "mousedown", down);
						addEvent(sizer, "click", stop);
						addEvent(sizer, "dblclick", auto);
						addEvent(r.cells[0], "dblclick", auto);
						
						//addEvent(div, "dblclick", auto);
						
						if(CollapsedAtStart)
							auto({originalTarget:sizer}, true);
						return 1;
					}, base);//*/
		}
	}
}

function urlencode (str) {
    // URL-encodes string  
    // 
    // version: 1004.2314
    // discuss at: http://phpjs.org/functions/urlencode    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Joris
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior    // %        note 2: Please be aware that this function expects to encode into UTF-8 encoded strings, as found on
    // %        note 2: pages served as UTF-8
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    str = (str+'').toString();
        // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
                                                                    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function debug(t, r) {
	var u = $X(compileXPath("ancestor::*[contains(concat(' ', @class, ' '), ' actionContainer ')]/div[@class='action-details']/a[@id and @href]"), r).textContent.trim();
	var n = $X(compileXPath("./b"), r.cells[0]).textContent.trim();
	return log({type:t, user:u, name:n});
}

//function GetNextSiblingNode(child, bad) {while((child = child.nextSibling) && child.nodeType != 1);return child?child:bad;}

function CSSmulti(name, value){
	var m = name+": "+value+"; ";
	return ["-moz-" + m, "-webkit-" + m, "-ie-" + m, "-o-" + m, m].join("");
}


function find(feild, extra){
	return $X(compileXPath("//table[@id='issuedetails']/tbody/tr[td[position()=1 and b[text()='"+feild+":']]]/td[2]" + extra + " | "+
		"//div[@id='peoplemodule']//ul[@id='peopledetails']/li[contains(concat(' ', @class, ' '), ' people-details ')]/dl[dt[text()='"+feild+":']]/dd" + extra + " | " +
		"//dl[dt[text()='"+feild+":']]/dd/span/span"));
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

function merge(group, b, a) {
	return b+group.join(a+" or "+b)+a;
}

function diffCleanup(td) {
	if(document.evaluate("./del or ./ins", td, null, XPathResult.BOOLEAN_TYPE , null).booleanValue)
		return 1;
	var tr = $X(compileXPath("ancestor::tr[1]"), td);
	var tbody = $X(compileXPath("ancestor::tbody[1]"), tr);
	tr.parentNode.removeChild(tr);
	if(tbody.rows.length <= 0)
		if(d = $X(compileXPath("ancestor::div[contains(concat(' ', @class, ' '), ' actionContainer ')]"), tbody))
			d.parentNode.removeChild(d);
	return 0;
}

function go(left, mleft, array, mright, right, func, base) {
//*
	if(array && array.length > 0)
		$Z((left+merge(array, mleft, mright)+right), func);
/*/ // I don't remember what the purpouse of this choice.
	if(array && array.length && array.length > 0)
		$Z(left+merge(array, mleft, mright)+right, function(r,i,p){ if(i == 1) return func(r,i,p); return 0;});
//*/
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
	
//	if(JSON && JSON.stringify) arg = JSON.stringify(arg);
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) != "undefined")
		unsafeWindow.console.log(arg);
	else if(typeof(GM_log) != "undefined")
		GM_log(arg);
	return arg;
}

function remove(node) {
	return node.parentNode.removeChild(node);
}

function outerHTML(node) {
   var attrs = node.attributes;
   var str = "<" + node.tagName;
   for (var i = 0; i < attrs.length; i++)
      str += " " + attrs[i].name + "=\"" + attrs[i].value.escapeHTML() + "\"";
   return str + (node.innerHTML?">" + node.innerHTML + "</" + node.tagName + ">":"/>");
}

function pairs(str) {
	str = str.replace(/&nbsp;/g, "\u00A0").escapeHTML();
	var resplit = /([\\\/!=.,{}]+|[^\s\u2060(){}@%\^\*~|+\-:;\[\]\\\/!=.,]*(?:[()\[\]]+|[@%\^\*~|+\-]+|[:;]+)?)([\s\u2060^\n\r]*|[\n\r]*)/y;
	resplit.lastIndex = 0;
	var text = [], whitespace = [], m;
	while((m = resplit.exec(str)) && m[0] != "")
	{
		text = text.concat(m[1]);
		whitespace = whitespace.concat(m[2]);
	}
	var out = { characters: text, spaces: whitespace, string:str, lastmatch:m};
	if(str != "" && text == []) unsafeWindow.console.log(out);
	return text.length > 0 ?out:null;
}

function split(node, p) {
	if(typeof(node) == "string"){
		return pairs(node);
	}
	else
	{
		var i = 0;
		var os = { type: p, characters: [], spaces: [] };
		for(e = node.lastChild, d = c = node.firstChild; c; c = c.nextSibling)
		{
			if(c.nodeType == c.TEXT_NODE)
			{
				var a = c.nodeValue;
				var f = (c == d);
				var g = (c == e);
				if(f && g)
					a = a.replace(/^\s*|\s*$/g,"");
				else if(f)
					a = a.replace(/^\s*/,"");
				else if(g)
					a = a.replace(/\s*$/,"");
				var t = pairs(a);
				if(t)
				{
					os.characters = os.characters.concat(t.characters);
					os.spaces = os.spaces.concat(t.spaces);
				}
			}
			else if(c.nodeType == c.ELEMENT_NODE)
			{
				if(c.nodeName == "BR")
				{
					os.characters = os.characters.concat("");
					os.spaces = os.spaces.concat("<span class='beforebr'></span><br/>");
				}
				else
				{
					os.characters = os.characters.concat(outerHTML(c));
					os.spaces = os.spaces.concat("");
				}
			}
			else
				unsafeWindow.console.log("Unknown node type: " + c.nodeType);
		}
		return os;
	}
}

function init(){
	String.prototype.escapeHTML = function () { return this.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); };
}

function Buffer() { 
	let running = "";
	let str=""; 

	this.toString = function (){return running?str + "</"+running+">":str;};
	this.append = function (tag, text) {
			if(text != "" || (Debug_diffString & 1)) {
				var tagging = "";
				if(running != tag || (Debug_diffString & 2))
				{
					if(running) tagging += "</"+running+">";
					if(running = tag) tagging += "<"+running+" class='diff'>";
				}
				str += tagging + text;
			}
			return this;
		};
}

function parse_search(search, forceLowerCaseKeys, forceLowerCaseSingles){
	var c = 0;
	var pairs = {};
	var singles = [];
	var f;
	if(search)
	{
		if(forceLowerCaseKeys && forceLowerCaseSingles)
			f = function(a){
					var b = a.indexOf('=');
					if(b >= 0)
						pairs[a.substr(0, b).toLowerCase()] = a.substr(b + 1);
					else
						singles.push(a.toLowerCase());
					++c;
				};
		else if(!forceLowerCaseKeys && forceLowerCaseSingles)
			f = function(a){
					var b = a.indexOf('=');
					if(b >= 0)
						pairs[a.substr(0, b)] = a.substr(b + 1);
					else
						singles.push(a.toLowerCase());
					++c;
				};
		else if(forceLowerCaseKeys && !forceLowerCaseSingles)
			f = function(a){
					var b = a.indexOf('=');
					if(b >= 0)
						pairs[a.substr(0, b).toLowerCase()] = a.substr(b + 1);
					else
						singles.push(a);
					++c;
				};
		else if(!forceLowerCaseKeys && !forceLowerCaseSingles)
			f = function(a){
					var b = a.indexOf('=');
					if(b >= 0)
						pairs[a.substr(0, b)] = a.substr(b + 1);
					else
						singles.push(a);
					++c;
				};
		((search[0] == "?")?search.substr(1):search).split("&").forEach(f);
	}
	return {pairs:pairs, singles:singles, count:c};
}

function JiraTimeStringToDate(str) {
	return new Date(str.replace(/^(\d{2})\/([A-Z][a-z]{2})\/(\d{2})/, "$2 $1 20$3"));
}
//{
/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 */

//The diff alg is ok but the diffString is a pain in the butt.
//these functions have been tweaked and rewritten for this context.

function diffString( o, n ) {
	var buffer = new Buffer();
	
	var os = split(o, "old");
	var ns = split(n, "new");
		
	var out = diff(os.characters, ns.characters);
//	log(os, ns, out);
	
	if (out.n.length == 0) {
		for(i = 0; i < out.o.length; i++)
			buffer.append("del", out.o[i] + os.spaces[i]);
	}
	else {
		if (out.n[0].text == null)
			for (n = 0; n < out.o.length && out.o[n].text == null; n++)
				buffer.append("del", out.o[n] + os.spaces[n]);

		for ( var i = 0; i < out.n.length; i++ ) {
			if(out.n[i].text == null)
				buffer.append("ins", out.n[i] + ns.spaces[i]);
			else
			{
				buffer.append("", out.n[i].text);
				
				let n = out.n[i].row;
				let mns = ns.spaces[i], mos = os.spaces[n];
				let len = mns.length - mos.length;
				if(len > 0){
					if(mns.lastIndexOf(mos, 0) == 0)
						buffer.append("", mos).append("ins", mns.substring(mos.length));
					else if(mns.indexOf(mos, len) != len)
						buffer.append("ins", mns.substring(0, len)).append("", mos);
					else
						buffer.append("ins", mns).append("del", mos);
				}
				else if(len < 0){
					if(mos.lastIndexOf(mns, 0) == 0)
						buffer.append("", mns).append("del", mos.substring(mns.length));
					else if(mos.indexOf(mns, -len) != -len)
						buffer.append("del", mos.substring(0, -len)).append("", mns);
				else
						buffer.append("ins", mns).append("del", mos);
				}
				else if(mns != mos)
					buffer.append("ins", mns).append("del", mos);
				else
					buffer.append("", mns);
				
				for(n++; n < out.o.length && out.o[n].text == null; n++)
					buffer.append("del", out.o[n] + os.spaces[n]);
			}
		}
	}
	return buffer.toString();
}

function diff( o, n ) {
  var ns = new Object();
  var os = new Object();
  
  for ( var i = 0; i < n.length; i++ ) {
	var name = n[i];
	var t = ns[ name ];
    if ( t == null || t.rows == null )
      ns[ name ] = t = { rows: new Array(), o: null };
    t.rows.push( i );
  }
  
  for ( var i = 0; i < o.length; i++ ) {
	var name = o[i];
	var t = os[ name ];
    if ( t == null || t.rows == null )
      os[ name ] = t = { rows: new Array(), n: null };
    t.rows.push( i );
  }
  
  for ( var i in ns ) {
    if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows != null && os[i].rows.length == 1 ) {
      n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
      o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
    }
  }
  
  for ( var i = 0; i < n.length - 1; i++ ) {
    if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
         n[i+1] == o[ n[i].row + 1 ] ) {
      n[i+1] = { text: n[i+1], row: n[i].row + 1 };
      o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
    }
  }
  
  for ( var i = n.length - 1; i > 0; i-- ) {
    if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
         n[i-1] == o[ n[i].row - 1 ] ) {
      n[i-1] = { text: n[i-1], row: n[i].row - 1 };
      o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
    }
  }
  
  return { o: o, n: n };
}
//}
//{
	function stop(event){
		if (event)
		{
			if (typeof event.stopPropagation == "function")
				event.stopPropagation();
			if (typeof event.preventDefault == "function")
				event.preventDefault();
		}
		return false;
	}
	
	function down(event){
		addEvent(document, "mouseup", up);
		addEvent(document, "mousemove", movemouse);
		var e = event.originalTarget;
		var t = $X(compileXPath("./../div[@class='collapse']"), e);
		var h = parseInt(unsafeWindow.getComputedStyle(t, null).height.replace(/^(\d+)(?:\.\d*)?px$/, "$1"));
		startdrag = {y: event.pageY, h: h, t: t};
		return stop(event);
	}

	function up(event){
		removeEvent(document, "mousemove", movemouse);
		removeEvent(document, "mouseup", up);
		if(startdrag)
		{
			startdrag=null;
			return stop(event);
		}
	}

	function movemouse(event){
		if (startdrag)
		{
			var p = event.pageY + startdrag.h - startdrag.y;
			startdrag.t.style.height = (p<0?0:p) + "px";
			return stop(event);
		}
	}
	
	function auto(event, trick){
		var link = $X(compileXPath(".//div[@class='collapse']"), tr = $X(compileXPath("ancestor::tr[1]"), event.originalTarget));
		if(link.style.height != "")
		{
			link.style.height = "";
		}
		else
		{
			var pt = link;
			addEvent(pt, "click", function poke() { removeEvent(pt, "click", poke); if(link.style.height == "1px" || link.style.height == "0px") link.style.height = "";});
			if(trick == true)
			{
				link.style.height = "0px";
			}
			else
			{
				link.style.height = "1px";
				addEvent(link, "mouseout", function out(){ removeEvent(link, "mouseout", out); if(link.style.height == "1px") link.style.height = "0px"; });
			}
		}
		if(trick != true)
			return stop(event);
	}
	
	function addEvent( obj, type, fn, capture ) {
		obj.addEventListener( type, fn, capture?true:false );
	}
	
	function removeEvent( obj, type, fn, capture ) {
		obj.removeEventListener( type, fn, capture?true:false );
	}
//}