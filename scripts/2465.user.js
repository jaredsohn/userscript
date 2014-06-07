// ==UserScript==
// @name          Westlaw Notepad & Utilities
// @namespace     
// @description   Take notes on cases; jump to recent cases; improved copy-with-ref
// @include       http://web2.westlaw.com*
// ==/UserScript==
//invoked at bottom:
//todo: fix automatic refresh of jump box on add cite;
//todo: fix add cite on popup pages



function _init() {
	var bottomBarRow, newElement;
	//alert(window.name);
	if (window.name=='docnav') {
		window.displayType = 'docnav';
	} else if (document.location.toString().match(/previewfooter/i)) {
		window.displayType = 'popup';
	} else if (window.name=='navbar') {
		window.displayType = 'navbar';
	} else if (window.name=='doccontext' || window.name=='top_frame') {
		window.displayType = 'doccontext';
	}
	
	if (window.name == 'top_frame') {
		window.windowNavbar = window.top.opener.top.frames[0];	
	} else {
		window.windowNavbar = window.top.frames[0];		
	}
	
	if (window.displayType) {
		window.researchHistory = new historyArray;
	}
	

//	alert(window.top.frames[0].name());

	if (window.displayType == 'navbar') {
		//alert(window.document.location)
		window.setTimeout(function() { window.document.location.reload() }, 1800000);
		
		var topRowFirstCell = document.getElementsByTagName('tr')[0].cells[0];
		topRowFirstCell.innerHTML='&nbsp;';
		topRowFirstCell.setAttribute('id','cellSelectProjects');
		topRowFirstCell.setAttribute('style','{width:40}');
		topRowFirstCell.setAttribute('onclick','');
		//document.getElementsByTagName('tr')[1].cells[0].innerHTML='&nbsp;';
		
		/*
		//var projectPickbox = 
		topRowFirstCell.innerHTML = '<a value="Clear all history" id="clear" href="javascript:return false;" style=""><font color="WHITE">[Load Project]</font></a>';
		var link = topRowFirstCell.childNodes[0];
		link.addEventListener('click', function() {window.researchHistory.loadProject('Old Project');fillJumpToCite();}, true);
		*/
		
		
		
		var topRowSecondCell = document.getElementsByTagName('tr')[0].cells[1];
		
		var newHTML = <table id="projectsTable"><tr>
				<td>
					<select id="selectJumpToCite"></select>
				</td><td>
					<font color="WHITE"><b> | </b></font>
				</td><td>
					<a id="linkNotes" href="javascript:var x=0;"><font color="WHITE">Notes</font></a>
				</td>
				</tr></table>
				
		topRowSecondCell.innerHTML = newHTML;	
		
		//var selectoptions='<select id="jumpToCite"></select>&nbsp;<a value="Clear all history" id="clear" href="javascript:return false;" style=""><font color="WHITE">[X]</font></a>&nbsp;<a id="notes" href="javascript:return false;"><font color="WHITE">[Notes]</font></a>"';
		//topRowSecondCell.innerHTML=selectoptions;
		window.projectHandler = new objProjectHandler;
		this.projectHandler.displayCurrentProjectName();
		
		window.jumpToCite = document.getElementById("selectJumpToCite");
		window.jumpToCite.addEventListener('change', function() {jumpToCite(document.getElementById('selectJumpToCite').value);}, true);
		fillJumpToCite() 

//					<a id="linkClear" value="Clear all history"  href="javascript:var x=0;" style=""><font color="WHITE">Clear</font></a>
//				</td><td>
//		var linkClear = document.getElementById("linkClear");
//		linkClear.addEventListener('click', function() {alert('Clear Project Data');window.researchHistory.clear();fillJumpToCite();}, true);

		var linkNotes = document.getElementById("linkNotes");
		linkNotes.addEventListener('click', function() {window.popupNotes();}, true);

	} 

	else if (window.displayType == 'doccontext') {
		window.currentCitation = new citation;
		currentCitation.addToHistory();
		fillJumpToCite();
		setupNotes();
	}

	if (window.displayType == 'docnav') 
	{
	    var bottomBarRow = document.getElementById('bodyControl').getElementsByTagName('tr')[0];
	    var newCell;
	    newCell = bottomBarRow.insertCell(bottomBarRow.cells.length);
	    newCell.setAttribute('nowrap','nowrap');
	    newCell.setAttribute('align','right');
	    newCell.setAttribute('width','15%');
	    newCell.innerHTML='<a title="Copy with Ref as Text" class="FeatureNavigation" href="#" ><font color="White">Text&nbsp;</font></a>&nbsp;';
	    newElement=newCell.childNodes[0];
	    newElement.addEventListener("click", copyQuoteAsText, true);

	    newCell = bottomBarRow.insertCell(bottomBarRow.cells.length);
	    newCell.setAttribute('nowrap','nowrap');
	    newCell.setAttribute('align','right');
	    newCell.setAttribute('width','15%');
	    newCell.innerHTML='<a title="Copy with Ref as Paren" class="FeatureNavigation" href="#" ><font color="White">Paren&nbsp;</font></a>&nbsp;';
	    newElement=newCell.childNodes[0];
	    newElement.addEventListener("click", copyQuoteAsParen, true);
	    //addCase();
	} 
	else if (window.displayType == 'popup')
	{
	    var bottomBarRow = document.getElementById('bodyControl').getElementsByTagName('tr')[0];
	    bottomBarRow.cells[1].width='12%';

	    newCell = bottomBarRow.insertCell(2);
	    newCell.setAttribute('nowrap','nowrap');
	    newCell.setAttribute('align','right');
	    newCell.setAttribute('width','8%');
	    newCell.innerHTML='<p align="left"><input name="mText" value="Text" id="mText" class="Button" type="button"></p>';
	    newElement=newCell.childNodes[0].childNodes[0];
	    newElement.addEventListener("click", copyQuoteAsText, true);

	    newCell = bottomBarRow.insertCell(3);
	    newCell.setAttribute('nowrap','nowrap');
	    newCell.setAttribute('align','right');
	    newCell.setAttribute('width','8%');
	    newCell.innerHTML='<p align="left"><input name="mParen" value="Paren" id="mParen" class="Button" type="button"></p>';


	    newElement=newCell.childNodes[0].childNodes[0];
	    newElement.addEventListener("click", copyQuoteAsParen, true);
	    //addCase();
	}
}


String.prototype.splitTwice = function(recordDelim, fieldDelim) {
	outputArray = new Array();
	
	if (this.length > 0) {
		var tempArray=this.split(recordDelim);
		for (i=0;i<tempArray.length;i++) {
			outputArray[i]=tempArray[i].split(fieldDelim);
		}
	}
	return outputArray;

	//o.__defineGetter__("b", function() { return this.a+1; });
	//o.__defineSetter__("c", function(x) { this.a = x/2; });
	//for new objects, use get / set in place of "function"
}

Array.prototype.joinTwice = function(recordDelim, fieldDelim) {
		var output = '';
		for (i=0;i<this.length;i++) {
			if (output.length>0) {
				output+=recordDelim;
			}
			output+=this[i].join(fieldDelim);
		}
		return output;
}
/*
Element.prototype.toggle  = function() {
	//var el = document.getElementById(obj);
	var el = this;
	if ( el.style.display != 'none' ) {
		el.style.display = 'none';
	}
	else {
		el.style.display = '';
	}	
}
*/


function jumpToCite(cite) {
	var goto='http://web2.westlaw.com/find/default.wl?rs=WLW5.12&cite=~&fn=_top&vr=2.0&sv=Split&rp=%2ffind%2fdefault.wl'
	//var goto='http://web2.westlaw.com/find/default.wl?rs=WLW5.12&cite=~&fn=_top&vr=2.0&sv=Split&rp=%2ffind%2fdefault.wl'
	//var goto='http://web2.westlaw.com/find/context.aspx?fn=_top&sv=Split&rp=%2ffind%2fdefault.wl&vr=2.0&rs=WLW5.12&cite=~';
	
	//var goto='http://www.westlaw.com/find/default.wl?cite=~&RS=ITK3.0&VR=1.0&FindType=F&ForceAction=Y&SV=Full"'


	cite=cite.replace(/ /g,'');
	cite=cite.replace(/\./g,'');
	//alert(cite);
	goto=goto.replace(/~/,cite);
	window.top.location=goto;
}


function objProjectHandler() {

	
	this.displayCurrentProjectName = function() {
		var cell = window.windowNavbar.document.getElementById('cellSelectProjects');

		var data = '<table><tr><td><a id = "linkChangeProject" href="javascript:var x=0"><font color="white" style="font-size: 9pt;font-weight: bold;font-family: verdana;color: white;}">' + researchHistory.currentProject.value.replace(/ /g,'&nbsp;') + '</font></a>' +
			   '</td></tr></table>';
//				'</td><td><a id = "linkChangeProject" href="javascript:return false;"><font color="white">Change</font></a>' +
//				'</td><td><a id = "linkNewProject" href="javascript:return false;"><font color="white">New</font></a></small>' +

		cell.innerHTML = data;
		document.getElementById('linkChangeProject').addEventListener("click", function() {window.projectHandler.makeSelectProjects();}, true);
//		document.getElementById('linkNewProject').addEventListener("click",function() {window.projectHandler.makeNewProject()}, true);
	}
	
	this.makeNewProject = function() {
		var cell = window.windowNavbar.document.getElementById('cellSelectProjects');
		var data = '<table><tr>' +
						'<td><input type="text" id="textNewProject">' +
						'</td><td>&nbsp;<a id = "linkProjectOK" href="javascript:return false;"><font color="white">OK</font></a>' +
						'</td><td>&nbsp;<a id = "linkDisplayCurrentProjectName" href="javascript:return false;"><font color="white">Cancel</font></a>' +
					'</td></tr></table>';
		cell.innerHTML = data;
		document.getElementById('linkDisplayCurrentProjectName').addEventListener('click', function() {window.projectHandler.displayCurrentProjectName()}, true);
		document.getElementById('linkProjectOK').addEventListener('click', function() {window.projectHandler.loadProject(document.getElementById('textNewProject').value);window.projectHandler.displayCurrentProjectName();}, true);
	}
	
	this.makeSelectProjects = function() {		
		var cell = window.windowNavbar.document.getElementById('cellSelectProjects');
		var data = '<table><tr>' +
						'<td><select id= "selectProjects" ></select>' +
						'</td><td><a id = "linkDisplayCurrentProjectName" href="javascript:return false"><font color="white">Cancel</font></a>' +
					'</td></tr></table>'
//						'</td><td>&nbsp;<a id = "linkProjectOK" href="javascript:return false;"><font color="white">OK</font></a>' +

		cell.innerHTML = data;
		window.projectHandler.fillSelectProjects();
		document.getElementById('selectProjects').addEventListener('change', function() {window.projectHandler.loadProject(document.getElementById('selectProjects').value);}, true);
		//document.getElementById('linkProjectOK').addEventListener('click', function() {window.projectHandler.loadProject(document.getElementById('selectProjects').value);window.projectHandler.displayCurrentProjectName();}, true);
		document.getElementById('linkDisplayCurrentProjectName').addEventListener('click', function() {window.projectHandler.displayCurrentProjectName()}, true);
	}
	
	this.fillSelectProjects = function() {
	
		var sel = window.windowNavbar.document.getElementById('selectProjects');

		if (sel) {
			var opts = sel.options;
			opts.length = 0;

			var o = document.createElement('option');
			o.value = ''; 
			//o.text='Current Project: ' + GM_getValue('currentproject','Default Project');
			o.text='Current Project: ' + researchHistory.currentProject.value;
			opts[0] = o;


			var ps = researchHistory.getProjects().project;

			for each (var p in ps) {
				//alert(p);	
				if (p.@name!=researchHistory.currentProject.value) {
					o = document.createElement('option');
					o.value = p.@name; 
					o.text= '' + p.@name + ' (' + p..source.length() + ' cases)';
					opts[opts.length] = o;
				}
			}

			o = document.createElement('option');
			o.value = '!!newproject'; 
			o.text='Create new...'
			opts[opts.length] = o;
		}
	}
	
	this.loadProject = function(str) {
		if (str == '!!newproject') {
			projectHandler.makeNewProject();
		} else {
			researchHistory.loadProject(str);
			window.projectHandler.displayCurrentProjectName();
//			window.projectHandler.fillSelectProjects();
			window.fillJumpToCite();
		}
	}
}


window.fillJumpToCite = function() {
	
	var sel = window.windowNavbar.document.getElementById('selectJumpToCite');
	
	if (sel) {
		var opts = sel.options;
   		opts.length = 0;
   		
   		var o = document.createElement('option');
   		o.value = ''; 
   		o.text='Jump to Cite';
		opts[0] = o;

		
		var cits = researchHistory.data..source;

		for each (var c in cits) {
			o = document.createElement('option');
			o.value = c.reporterlocation; 
			o.text= c.shortform;
			opts[opts.length] = o;
		}

	}
}



function setupNotes() {
	window.editNotes = function() {
	}
	
	window.saveNotes = function() {

		researchHistory.findSource(currentCitation.citation).notes = notesEditor.value;
		researchHistory.save();
	}

	window.toggleNotesDisplay = function() {
		//window.style.height+=200;
		heights = window.parent.document.body.rows.split(',');
		if (shownotes.innerHTML!='hide notes') {;
			heights[0]=190;
			shownotes.innerHTML='hide notes';
		} else {
			heights[0]=100;
			shownotes.innerHTML='show notes';
		}
		window.resize='manual';
		window.parent.document.body.rows=heights.join(',');
	}
	
	//window.citedata = researchHistory.getRowByCite(currentCitation.citation);
	//alert(researchHistory.data);
	var notes = researchHistory.data..source.(reporterlocation==currentCitation.citation).notes;
	//alert(notes);
	var bookCell = document.getElementById('mDocContext__ctl0_mBookIconCell');
	//alert(bookCell.childNodes[1]);
	var cell = bookCell.childNodes[1].rows[1].cells[0]
	
//	cell.setAttribute('colspan',table.rows[0].cells.length-1);
	
	window.shownotes = document.createElement('a');
	shownotes.id = 'shownotes';
	shownotes.setAttribute("style", '{font-family:\'courier\';font-size:10pt;}');
	shownotes.innerHTML='show notes';
	cell.appendChild(shownotes);
	shownotes.addEventListener('click', function() {toggleNotesDisplay()}, true)
	var table = bookCell.parentNode.parentNode.parentNode;
	table.setAttribute('style','{height:100%}');
	table.insertRow(1);
	var row = table.insertRow(2);	
	//row.setAttribute('height','100%');
	row.setAttribute('style','{height:100%}');
	
	var cell = row.insertCell(0);
	cell.setAttribute('colspan',table.rows[0].cells.length);
	//cell.setAttribute('height','100%');
	cell.setAttribute('style','{height:100%}');
	//cell.innerHTML = '<center>' + citedata[3] + '</center>';
	// overflow:auto -moz-scrollbars-vertical
	cell.innerHTML = '<textarea id="notes" style="{font-family:\'courier\';font-size:10pt;width:100%;height:100%;overflow:auto}">' + notes + '</textarea>';
	window.notesEditor = cell.childNodes[0];
	notesEditor.addEventListener('change', function() {saveNotes()}, true)
	if (notes && notes.toString().length > 0) {
		//alert('notes');
		toggleNotesDisplay();
	} else {
		//alert('no notes');
		heights = window.parent.document.body.rows.split(',');
		heights[0]=100;
		window.parent.document.body.rows=heights.join(',');
	}
	//var cell = row.insertCell(1);
	////cell.setAttribute('colspan',table.rows[0].cells.length-1);
	//cell.innerHTML = '<a id="savenotes" >save</a>';
	//var savebutton = cell.childNodes[0];
	//savebutton.addEventListener('click', saveNotes, true)
	//var cell = table.insertRow(2).insertCell(0);
	//cell.setAttribute('colspan',table.rows[0].cells.length);	
}


function historyArray() {	
	
	//called at end;
	this._init = function() {
		this._internalString = this._getString();
		
		if (GM_getValue('projectXML','none')=='') {
			GM_setValue('projectXML','<sources></sources>');			
		}
		
		var tempData = GM_getValue('projectXML','<sources></sources>')
		
		try {
			this.data = new XML(tempData);
		} catch (e) {
			this.data = <sources></sources>;
		}		
	}
	
	this.refresh = function() {
		this._init();
	}
	this.toString = function() {
		return this._getString();
	}
	
	this._getString = function() {
		return GM_getValue('cites','')
	}
	this._setString = function(str) {
		GM_setValue('cites',str);
	}
	
	
	this.save = function() {

		GM_setValue('projectXML', this.data.toString());
	}
	
	this.addCite = function(cit) {
		
		if (this.data..source.length[0] || this.data..source.(reporterlocation==cit.citation).length()==0) {
			this.data.appendChild(cit.data());
		} else {
		}
		this.save();
	}
	
	this.clear = function() {
		this.data = new XML(<sources></sources>);
		this.save();
	}
	
	this.findSource = function(strReporterLocation) {
		return this.data..source.(reporterlocation==strReporterLocation);
	}

	this.getProjects = function() {
			if (this._projects) {
				return this._projects;
			} else {
				//GM_setValue('allProjectsXML','<projects></projects>')
				if (GM_getValue('allProjectsXML','')=='') {
					GM_setValue('allProjectsXML','<projects></projects>');		
				}
				//alert(GM_getValue('allProjectsXML','<projects></projects>'));
				this._projects = new XML(GM_getValue('allProjectsXML','<projects></projects>'));
				return this._projects;
			}
	}

	this.saveProjects = function() {
		GM_setValue('allProjectsXML',this.getProjects().toString());
		this._projects = null;
	}
	
	this.currentProject = {
		value:'',
		get value() {
			return GM_getValue('currentproject','Default Project');
		},
		set value(str) {
			GM_getValue('currentproject','str');
		}
	}

	this.clearProjects =function() {
		GM_setValue('allProjectsXML','<projects></projects>');		
		this._projects = null;
	}
	
	this.loadProject = function(loadProjectName) {
		//this.clearProjects();
		//this.clear();
		this.refresh();
		
		if (GM_getValue('currentproject','')==loadProjectName) {
			loadProjectName='Default Project'
		}

		
		//alert(GM_getValue('projects','nope'));
				
		var currentProjectName = GM_getValue('currentproject','Default Project');
		
		//alert(this.getProjects().toString());

		var projects = this.getProjects();
		if (projects.project.length() > 0 && projects.project.(@name==currentProjectName).length() > 0) {
			//alert('replacing project');
			//alert(projects.project.(@name==currentProjectName).sources);			
			
			delete projects.project.(@name==currentProjectName).sources;
			//alert(projects.project.(@name==currentProjectName));
			projects.project.(@name==currentProjectName).appendChild(<sources>{this.data}</sources>);
			//alert(projects.project.(@name==currentProjectName).sources);			

		} else {
			projects.appendChild(<project name={currentProjectName}>{this.data}</project>);
		}

		GM_setValue('allProjectsXML',projects.toString());

		if (projects.project.(@name==loadProjectName).length() > 0) {
			GM_setValue('projectXML', projects.project.(@name==loadProjectName).toString());
		} else {
			GM_setValue('projectXML', '<sources></sources>');
		}
		this.saveProjects();

		GM_setValue('currentproject',loadProjectName)


		//alert(GM_getValue('allProjectsXML',''));
		//alert(GM_getValue('projectXML',''));
		this.refresh();
/*
//		var newArray = new Array();
		var newArray = rawProjectData.splitTwice('<endproject>','<endprojectfield>')


		
		for (i=0; i<newArray.length ; i++) {
			if (newArray[i][0]==loadProjectName) {
				newProjectData=newArray[i][1];
				newArray.remove(i);
			}
		}

		
		newArray[newArray.length]=[currentProjectName, this._getString()];

		var output='';
		for (i=0;i<newArray.length;i++) {
			if (output.length>0) {
				output+='<endproject>';
			}
			output+=this.array[i].join('<endprojectfield>');
		}
		GM_setValue('projects',output); 
		
		this._setString(newProjectData);
		GM_setValue('currentproject',loadProjectName);
		this.refresh();
*/
	}
	
	this._init();

}

function copyQuoteAsText() {
	copyQuote('text');
}
function copyQuoteAsParen() {
	copyQuote('paren');
}

window.copyQuote = function(style) {
    var cit;
    cit = new citation;

      var generator=window.open('','name','height=400,width=500,top=200,left=200,scrollbars=yes');      
      generator.document.write('<html><head><title>Copy with ref</title>');
      generator.document.write('</head><body><div style="{font-family:\'courier\';font-size:12pt;}">');
      generator.document.write('<center>[<a href="javascript:self.close()">close</a>]</center><br><br>');
      generator.document.write(cit.toString(style)+'<br><br>');
      generator.document.write('</div></body></html>');
      generator.document.close();
      generator.addEventListener("onblur", function() {self.close();}, true);
      generator.focus();
      //generator.citation = cit;
}

window.popupNotes = function() {
      var generator=window.open('','notes','height=400,width=500,top=200,left=200,scrollbars=yes');      
      researchHistory.refresh();
      var cites = researchHistory.data..source;
      
      //var output = <html><head><title>Copy with ref</title>
      //			</head><body><div style="{font-family:\'courier\';font-size:12pt;}">
      //			<p><center>[<a href="javascript:self.close()">close</a>]</center></p><p></p>
      
      
      generator.document.write('<html><head><title>Copy with ref</title>');
      generator.document.write('</head><body><div style="{font-family:\'courier\';font-size:12pt;}">');
      generator.document.write('<center>[<a href="javascript:self.close()">close</a>]</center><br><br>');
      for each (var c in cites) {
	      generator.document.write(c.longform+'<br>');	      
	      //generator.document.write('Project: ' + arr[i][2]+'<br><br>');	      
	      generator.document.write(c.notes+'<br>');	   
	      generator.document.write('<br><br>------------------------------<br>');	   	      
      }
      generator.document.write('</div></body></html>');
      generator.document.close();
      generator.addEventListener("onblur", function() {self.close();}, true);
      generator.focus();
}

window.citation = function() {

	
	this._init = function() {
		this.documentWindow = window;
		this.contextWindow = window.parent.frames[0];
		this.contextDocument = this.contextWindow.document;

		this.HTML = '';
		this.priorStarPage= '';
		this.lastStarPage = '';
		this.citation = '';
		this.rawCourt = '';
		this.year = '';
		this.rawText='';

		try {
			if (window.parent.frames[1].getSelection().rangeCount > 0) {
				this.rawText = window.parent.frames[1].getSelection().toString();
				this.findStarPages();
			}

			//this should all be done using range.toString();
			//see http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Creating

			//var contextDoc = focusedWindow.parent.doccontext.document ;
			var r = this.contextDocument.createRange();

			var spans = this.contextDocument.getElementById("mDocContext__ctl0_mDocumentTitlePanel").getElementsByTagName("SPAN");

			var contents = new Array();

			for (i = 0; i < spans.length ; i++) {
			    r.selectNodeContents(spans[i]);
			    r.setStartAfter(spans[i].getElementsByTagName("SCRIPT")[0]);
			    var a = "" + r.toString();
			    contents[i] = a;
			}

			this.rawCasename = contents[0];
			var strCite = contents[1];
			var strDateAndCourt = contents[2];

			this.rawCitation = strCite;

			if (strCite.indexOf(',')>0) {
				var commaAt = strCite.indexOf(',');
				strCite = strCite.substring(0,commaAt);
			}
			strCite = strCite.replace(/ (Mem)/ig,'');
			this.citation=strCite

			var reCourt = /([\s\S]*)[, ]\d{4}/i;
			var reYear = /\d{4}/i;
			if (strDateAndCourt.match(reCourt)[1]) {
			    this.rawCourt = strDateAndCourt.match (reCourt)[1];
			}

			if (strDateAndCourt.match(reYear)[0]) {
			    this.year = strDateAndCourt.match(reYear)[0];
			}
			this.complete = true;
		} 
		catch (e) {
			this.complete = false;
		}
	}
	
	this.addToHistory = function() {
		window.researchHistory.addCite(this);
	}

	this.casename = function() {
		var output;

		output = this.rawCasename;

		//output = '<u>' + output + '</u>';
		output = output.replace(/U\.S\. v\./i, 'United States v.');
		output = output.replace(/v\. U\.S\./i, 'v. United States');
		//output = output.replace(/ v\. /i, '</u> v. <u>');
		output = output.replace(/(City of |County of|State of)/i, '');

		var ar = this.getBluebookArray();
		for (i=0;i<ar.length;i++) {
			output = output.replace(ar[i][0],ar[i][1]);
		}

		return output;	
	}

	this.shortname = function() {
		temp=this.casename();
		sides=temp.split(' v. ');
		//alert(sides[0] + '//' + sides[1]);
		if (sides[0].match(/United States/i)) {
			return sides[1];
		} else {
			return sides[0];
		}
	}
	
	this.court = function() {
		var output='';

		if (this.rawCourt.match(/U\.S\./i)) {
		    output='U.S.';
		} else
		if (this.rawCourt.match(/C\.A\.1 /i)) {
		    output='1st Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(2|N\.Y\.)/i)) {
		    output='2d Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(3)/i)) {
		    output='3d Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(4)/i)) {
		    output='4th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(5)/i)) {
		    output='5th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(6)/i)) {
		    output='6th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(7)/i)) {
		    output='7th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(8)/i)) {
		    output='8th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(9)/i)) {
		    output='9th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(10)/i)) {
		    output='10th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.(11)/i)) {
		    output='11th Cir.';
		} else
		if (this.rawCourt.match(/C\.A\.D\.C\./i)) {
		    output='D.C. Cir.';
		} else
		{
		output=this.rawCourt+' ';
		}

		return output;
	}

	this.courtForParen = function() {
		var output;

		if (this.court().match(/U\.S\./i)) {
		    	output='';
		} else {
			output=this.court()+' ';
		}

		return output;
	}

	this.toString = function(format) {
	    var output = "";

	    function fullcitation(cit) {
		return cit.casename() + ", " + cit.citation + " (" + cit.courtForParen() + cit.year + ")"
	    }

	    function pincitation(cit) {
		return cit.casename() + ", " + cit.citation + cit.pincite() + " (" + cit.courtForParen() + cit.year + ")"
	    }

	    function shortcitation(cit) {
		return cit.shortname() + ", " + cit.citation + " (" + cit.courtForParen() + cit.year + ")"
	    }

	    if (format=='text') {
		    output+="\"" + this.text() + "\"";
		    if (this.complete==true) {
			output+="&nbsp;&nbsp;" + pincitation(this);
		    }
	    } else if (format=='paren') {
		    if (this.complete==true) {
			output+=pincitation(this);
		    }
		    output+=" (\"" + this.text() + "\")";
	    } else if (format=='fullcitation') {
		    if (this.complete==true) {
			output+=fullcitation(this);
		    }
	    } else if (format=='shortcitation') {
		    if (this.complete==true) {
			output+=shortcitation(this);
		    }
	    }
	    return output;
	}

	this.text = function() {
		var output = this.rawText.toString();
		output = output.replace(/FN\d+/ig,' ');
		output = output.replace(/ *\*+\d+ */g,' ');
		output = output.replace(/ Cir\.(\d)/g,' Cir. $1');
		output = output.replace(/^\s+/i, '');
		output = output.replace(/\s+$/i, '');
		output = output.replace(/([^A-Zv])\. ([A-Z])/g, '$1.&nbsp;&nbsp;$2');
		output = output.replace(/(\u201C|\u201D)/g, '~~');
		output = output.replace(/(\u2018|\u2019( ))/g, '"$2');
		output = output.replace(/\u2019/g, '\'');
		output = output.replace(/~~/g, '\'');
		output = output.replace(/\n/g, '<BR>');
		return output;

		/*
		ALT-0145   &#8216;   Ã½    Left Single Quotation Mark
		ALT-0146   &#8217;   Ã½    Right Single Quotation Mark
		ALT-0147   &#8220;   Ã½    Left Double Quotation Mark
		ALT-0148   &#8221;   Ã½    Right Double Quotation Mark

		U+2018	LEFT SINGLE QUOTATION MARK	Ã½ 	 
		U+2019	RIGHT SINGLE QUOTATION MARK	Ã½ 	this is the preferred character to use for apostrophe
		U+201C	LEFT DOUBLE QUOTATION MARK	Ã½ 	 
		U+201D	RIGHT DOUBLE QUOTATION MARK	Ã½ 	 
		*/
	}

	this.pincite = function() {
	    var output = "";
	    if (this.priorStarPage != "") {
		output += ", " + this.priorStarPage;
		if ( this.lastStarPage != "" && this.priorStarPage != this.lastStarPage) {
		    output += "-" + this.lastStarPage;
		}
	    }
	    return output;
	}

	this.findStarPages = function() {
		if (window.parent.frames[1].getSelection().rangeCount > 0) {
			var range = window.parent.frames[1].getSelection().getRangeAt(0);
			var ancestorContainer = range.commonAncestorContainer;
			var doc = ancestorContainer.ownerDocument;

			var startContainer = range.startContainer;
			var endContainer = range.endContainer;
			var startOffset = range.startOffset;
			var endOffset = range.endOffset;

			var strFound = range.toString();

			var rangeBefore = doc.createRange();
			rangeBefore.setStart(doc.firstChild,0);
			rangeBefore.setEnd(startContainer,startOffset);

			var strBefore = rangeBefore.toString();
			if (strBefore.length>4000) {
				strBefore = strBefore.substring(strBefore.length-4000);
			}

			var cites;

			var reStarPages = /[^\*]\*(\d+)/gim;
			var reStarPage = /[^\*]\*(\d+)/i;

			cites = strBefore.match(reStarPages);
			if (cites) {
				this.priorStarPage = cites[cites.length-1].match(reStarPage)[1];
				cites = strFound.match(reStarPages)
				if (cites) {
					this.lastStarPage = cites[cites.length-1].match(reStarPage)[1];
				}
			}
		}
		return;
	}
	
	this.data = function() {
		return  <source>
				<reporterlocation>{this.citation}</reporterlocation>
				<shortform>{this.toString('shortcitation')}</shortform>
				<longform>{this.toString('fullcitation')}</longform>
				<fullname>{this.casename()}</fullname>
				<shortname>{this.shortname()}</shortname>
				<court>{this.court()}</court>
				<year>{this.year}</year>
				<notes></notes>
			</source>;
	}

	this.getBluebookArray = function() {
		if (this.bluebookArray) {
			return this.bluebookArray;
			}
		else {
			var ar = new Array();
			var i = 0;
			ar[i++]=[/Academy/i,'Acad.']; 
			ar[i++]=[/(Administrative|Administration)/i,'Admin.']; 
			ar[i++]=[/Administratrix/i,'Adm\'x']; 
			ar[i++]=[/Administrator/i,'Adm\'r']; 
			ar[i++]=[/Advertising/i,'Adver.']; 
			ar[i++]=[/(Agriculture|Agricultural)/i,'Agric.']; 
			ar[i++]=[/(America|American)/i,'Am.']; 
			ar[i++]=[/ And /i,' & ']; 
			ar[i++]=[/Associate/i,'Assoc.']; 
			ar[i++]=[/Association/i,'Ass\'n']; 
			ar[i++]=[/Atlantic/i,'Atl.']; 
			ar[i++]=[/Authority/i,'Auth.']; 
			ar[i++]=[/(Automobile|Automotive)/i,'Auto.']; 
			ar[i++]=[/Avenue/i,'Ave.']; 
			ar[i++]=[/Bankruptcy/i,'Bankr.']; 
			ar[i++]=[/Board/i,'Bd.']; 
			ar[i++]=[/(Broadcast|Broadcasting)/i,'Broad.']; 
			ar[i++]=[/Brotherhood/i,'Bhd.']; 
			ar[i++]=[/Brothers/i,'Bros.']; 
			ar[i++]=[/Building/i,'Bldg.']; 
			ar[i++]=[/Business/i,'Bus.']; 
			ar[i++]=[/Casualty/i,'Cas.']; 
			ar[i++]=[/(Center|Centre)/i,'Ctr.']; 
			ar[i++]=[/Central/i,'Cent.']; 
			ar[i++]=[/Chemical/i,'Chem.']; 
			ar[i++]=[/College/i,'Coll.']; 
			ar[i++]=[/Commission/i,'Comm\'n']; 
			ar[i++]=[/Commissioner/i,'Comm\'r']; 
			ar[i++]=[/Committee/i,'Comm.']; 
			ar[i++]=[/Community/i,'Cmty.']; 
			ar[i++]=[/Company/i,'Co.']; 
			ar[i++]=[/Compensation/i,'Comp.']; 
			ar[i++]=[/Condominium/i,'Condo.']; 
			ar[i++]=[/(Congress|Congressional)/i,'Cong.']; 
			ar[i++]=[/Consolidated/i,'Consol.']; 
			ar[i++]=[/Construction/i,'Constr.']; 
			ar[i++]=[/Continental/i,'Cont\'l']; 
			ar[i++]=[/Cooperative/i,'Coop.']; 
			ar[i++]=[/Corporation/i,'Corp.']; 
			ar[i++]=[/(CorrectionCorrectional|Corrections)/i,'Corr.']; 
			ar[i++]=[/Defense/i,'Def.']; 
			ar[i++]=[/Department/i,'Dep\'t']; 
			ar[i++]=[/Detention/i,'Det.']; 
			ar[i++]=[/Development/i,'Dev.']; 
			ar[i++]=[/Director/i,'Dir.']; 
			ar[i++]=[/Discount/i,'Disc.']; 
			ar[i++]=[/(Distributor|Distributing)/i,'Distrib.']; 
			ar[i++]=[/District/i,'Dist.']; 
			ar[i++]=[/Division/i,'Div.']; 
			ar[i++]=[/(East|Eastern)/i,'E.']; 
			ar[i++]=[/(Economic|Economical|Economics|Economy)/i,'Econ.']; 
			ar[i++]=[/(Education|Educational)/i,'Educ.']; 
			ar[i++]=[/(Electric|Electrical|Electricity|Electronic)/i,'Elec.']; 
			ar[i++]=[/Engineer/i,'Eng\'r']; 
			ar[i++]=[/Engineering/i,'Eng\'g']; 
			ar[i++]=[/Enterprise/i,'Enter.']; 
			ar[i++]=[/Entertainment/i,'Entm\'t']; 
			ar[i++]=[/Environment/i,'Env\'t']; 
			ar[i++]=[/Environmental/i,'Envtl.']; 
			ar[i++]=[/Equality/i,'Equal.']; 
			ar[i++]=[/Equipment/i,'Equip.']; 
			ar[i++]=[/Examiner/i,'Exam\'r']; 
			ar[i++]=[/Exchange/i,'Exch.']; 
			ar[i++]=[/(Executor|Executrix)/i,'Ex\'[r,x]']; 
			ar[i++]=[/(Export|Exportation|Exporter)/i,'Exp.']; 
			ar[i++]=[/Federal/i,'Fed.']; 
			ar[i++]=[/Federation/i,'Fed\'n']; 
			ar[i++]=[/Fidelity/i,'Fid.']; 
			ar[i++]=[/(Finance|Financial|Financing)/i,'Fin.']; 
			ar[i++]=[/Foundation/i,'Found.']; 
			ar[i++]=[/General/i,'Gen.']; 
			ar[i++]=[/Government/i,'Gov\'t']; 
			ar[i++]=[/Guaranty/i,'Guar.']; 
			ar[i++]=[/Hospital/i,'Hosp.']; 
			ar[i++]=[/Housing/i,'Hous.']; 
			ar[i++]=[/(Import|Importation|Importer)/i,'Imp.']; 
			ar[i++]=[/Incorporated/i,'Inc.']; 
			ar[i++]=[/Indemnity/i,'Indem.']; 
			ar[i++]=[/Independent/i,'Indep.']; 
			ar[i++]=[/(Industry|Industries|Industrial)/i,'Indus.']; 
			ar[i++]=[/Information/i,'Info.']; 
			ar[i++]=[/(Institute|Institution)/i,'Inst.']; 
			ar[i++]=[/Insurance/i,'Ins.']; 
			ar[i++]=[/International/i,'Int\'l']; 
			ar[i++]=[/Investment/i,'Inv.']; 
			ar[i++]=[/Laboratory/i,'Lab.']; 
			ar[i++]=[/Liability/i,'Liab.']; 
			ar[i++]=[/Limited/i,'Ltd.']; 
			ar[i++]=[/Litigation/i,'Litig.']; 
			ar[i++]=[/(Machine|Machinery)/i,'Mach.']; 
			ar[i++]=[/Maintenance/i,'Maint.']; 
			ar[i++]=[/Management/i,'Mgmt.']; 
			ar[i++]=[/Manufacturer/i,'Mfr.']; 
			ar[i++]=[/Manufacturing/i,'Mfg.']; 
			ar[i++]=[/Maritime/i,'Mar.']; 
			ar[i++]=[/Market/i,'Mkt.']; 
			ar[i++]=[/Marketing/i,'Mktg.']; 
			ar[i++]=[/(Mechanic|Mechanical)/i,'Mech']; 
			ar[i++]=[/(Medical|Medicine)/i,'Med.']; 
			ar[i++]=[/Memorial/i,'Mem\'l']; 
			ar[i++]=[/(Merchant|Merchandise|Merchandising)/i,'Merch.']; 
			ar[i++]=[/Metropolitan/i,'Metro.']; 
			ar[i++]=[/Municipal/i,'Mun.']; 
			ar[i++]=[/Mutual/i,'Mut.']; 
			ar[i++]=[/National/i,'Nat\'l']; 
			ar[i++]=[/National Labor Relations Board/i,'NLRB']; 
			ar[i++]=[/(North|Northern)/i,'N.']; 
			ar[i++]=[/Number/i,'No.']; 
			ar[i++]=[/(Organization|Organizing)/i,'Org.']; 
			ar[i++]=[/Pacific/i,'Pac.']; 
			ar[i++]=[/Partnership/i,'P\'ship']; 
			ar[i++]=[/(Person|Personal|Personnel)/i,'Pers.']; 
			ar[i++]=[/(Pharmaceutics|Pharmaceuticals)/i,'Pharm.']; 
			ar[i++]=[/(Preserve|Preservation)/i,'Pres.']; 
			ar[i++]=[/Probation/i,'Prob.']; 
			ar[i++]=[/(Product|Production)/i,'Prod.']; 
			ar[i++]=[/(Professional)/i,'Prof\'l']; 
			ar[i++]=[/Property/i,'Prop.']; 
			ar[i++]=[/Protection/i,'Prot.']; 
			ar[i++]=[/Public/i,'Pub.']; 
			ar[i++]=[/Publication/i,'Publ\'n']; 
			ar[i++]=[/Publishing/i,'Publ\'g']; 
			ar[i++]=[/Railroad/i,'R.R.']; 
			ar[i++]=[/Railway/i,'Ry.']; 
			ar[i++]=[/Refining/i,'Ref.']; 
			ar[i++]=[/Regional/i,'Reg\'l']; 
			ar[i++]=[/Rehabilitation/i,'Rehab.']; 
			ar[i++]=[/(Reproduction|Reproductive)/i,'Reprod.']; 
			ar[i++]=[/(Resource|Resources)/i,'Res.']; 
			ar[i++]=[/Restaurant/i,'Rest.']; 
			ar[i++]=[/Retirement/i,'Ret.']; 
			ar[i++]=[/Road/i,'Rd.']; 
			ar[i++]=[/Savings/i,'Sav.']; 
			ar[i++]=[/(School|Schools)/i,'Sch.']; 
			ar[i++]=[/Science/i,'Sci.']; 
			ar[i++]=[/Secretary/i,'Sec\'y']; 
			ar[i++]=[/(Security|Securities)/i,'Sec.']; 
			ar[i++]=[/Service/i,'Serv.']; 
			ar[i++]=[/Shareholder/i,'S\'holder']; 
			ar[i++]=[/Social/i,'Soc.']; 
			ar[i++]=[/Society/i,'Soc\'y']; 
			ar[i++]=[/(South|Southern)/i,'S.']; 
			ar[i++]=[/(Steamship|Steamships)/i,'S.S.']; 
			ar[i++]=[/Street/i,'St.']; 
			ar[i++]=[/Subcommittee/i,'Subcomm.']; 
			ar[i++]=[/Surety/i,'Sur.']; 
			ar[i++]=[/(System|Systems)/i,'Sys.']; 
			ar[i++]=[/Technology/i,'Tech.']; 
			ar[i++]=[/Telecommunication/i,'Telecomm.']; 
			ar[i++]=[/(Telephone|Telegraph)/i,'Tel.']; 
			ar[i++]=[/Temporary/i,'Temp.']; 
			ar[i++]=[/Transcontinental/i,'Transcon.']; 
			ar[i++]=[/(Transport|Transportation)/i,'Transp.']; 
			ar[i++]=[/Trustee/i,'Tr.']; 
			ar[i++]=[/Turnpike/i,'Tpk.']; 
			ar[i++]=[/Uniform/i,'Unif.']; 
			ar[i++]=[/University/i,'Univ.']; 
			ar[i++]=[/Utility/i,'Util.']; 
			ar[i++]=[/Village/i,'Vill.']; 
			ar[i++]=[/(West|Western)/i,'W.'];

			this.bluebookArray = ar;
			return ar;
		}
	}
	
	this._init();
}

window.popupDebug = function(str) {
      var generator=window.open('','debug','height=400,width=500,top=200,left=200,scrollbars=yes');      
      generator.document.write('<html><head><title>Debug</title>');
      generator.document.write('</head><body><div style="{font-family:\'courier\';font-size:12pt;}">');
      generator.document.write('<center>[<a href="javascript:self.close()">close</a>]</center><br><br>');
      generator.document.write(str+'<br><br>');
      generator.document.write('</div></body></html>');
      generator.document.close();
}

_init();

