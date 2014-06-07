// ==UserScript==
// @name           Google Docs Styler
// @namespace      http://jarmark.org/greasemonkey/gds
// @description    Allows you to apply your own custom CSS stylesheet(s) to GoogleDoc's document.
// @include        http://docs.google.com/*
// @include        https://docs.google.com/*
// ==/UserScript==

/* 
** Google Docs Styler
** version 0.1
** Copyright (c) 2007, Daniel Owsianski daniel-at-jarmark-d0t-org
*/

if( typeof(Function.bind) == 'undefined' ){
	Function.prototype.bind = function(object) {
		var __method = this;
		return function() {
			return __method.apply(object, arguments);
		}
	}
}

//module namespace
if( typeof(JarmarkOrg) == 'undefined' ){
 JarmarkOrg = {};
}

JarmarkOrg.GoogleDocsStyler = {
	debug: true, // when true Greasemonkey logger is used to display log messages
	
	urlValidator: new RegExp("^(http|https):\/\/.+", "i"),
	userStylesheets: null, //all custom stylesheets as string with URLs separated by pipe '|' charcter
	currentStylesheet: '', //current selected stylesheet's url
	lastSelectedIndex: 0,  //last used select index
	
	install: function(){
		this.userStylesheets = this.load()||'';
		this.log("Initializing... userStylesheets from GM storage: ["+this.userStylesheets+"]")
		
		var html = '<div id="gds"><nobr>'+
		'	<select id="gds_select" style="font-size:11px !important;max-width:180px;">'+
		// all options are created by method this.buildStylesheet()
		'	</select>'+
		'	<a href="javascript:void(0);" id="gds_remove" style="font-size:11px !important;">Remove</a>'+
		'</nobr></div>';
		
		//find toolbar table cells via xpath
		var cells = document.evaluate(
			"//table[@id='mainToolbar']/tbody/tr/td",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
			
		//new cell at the end of row
		var lastCell = cells.snapshotItem(cells.snapshotLength-1);
		if(lastCell){
			var td = document.createElement('td');
			td.innerHTML=html;
			lastCell.parentNode.insertBefore(td, lastCell.nextSibling);
			this.attachEventHandlers();
			this.buildStylesheetList();
		}
	},

	// -- protected
	log: function(msg){
		if( this.debug ){
			GM_log(msg)
		}
	},
	isBlank: function(str){
		return str==null || /^\s*$/.test(str)
	},
	load: function(){
		return GM_getValue('gds_stylesheets')
	},
	store: function(){
		GM_setValue('gds_stylesheets', this.userStylesheets)
	},
	buildStylesheetList: function(){
		var html='<option value="">default builtin CSS</option><option value="">-------------------</option>';
		var selectedIndex = 0;
		
		if( this.userStylesheets){
			//little trick - if option has no value attribute, its contents (text node) is returned as value
			//build options from pipe '|'  string stored in userStylesheets
			var urls = this.userStylesheets.split('|')
			urls.sort();
			var cnt =0;
			for(var i=0; i<urls.length; i++){
				var url = decodeURI(urls[i])
				//skip empty entries
				if( !this.isBlank(url) ){
					html+='<option>'+url+'</option>'
					if( url==this.currentStylesheet ){
						selectedIndex = cnt+2;
					}
					cnt++;
				}
			}
		}
		html+='<option value="">-------------------</option><option value="add">Add stylesheet URL</option>';
		this.select.innerHTML = html;
		this.select.selectedIndex = selectedIndex;
	},
	
	// -- Events releated methods
	attachEventHandlers: function(){
		this.select = document.getElementById('gds_select');
		this.select.addEventListener('change' , this.selectChanged.bind(this), true);
		this.removeButton = document.getElementById('gds_remove');
		this.removeButton.addEventListener('click' , this.removeClicked.bind(this), true);
	},
	selectChanged: function(){
		var sel = this.select
		var val = sel.options[sel.selectedIndex > -1 ? sel.selectedIndex : 0].value
		if( val=='add' ){
			this.addStylesheet();
		}else if( this.currentStylesheet!=encodeURI(val) ){
			this.lastSelectedIndex = sel.selectedIndex;
			this.currentStylesheet = encodeURI(val);
			this.applyStylesheet();
		}
	},
	removeClicked:function(){
		//when currentStylesheet IS user defined stylesheet - remove it from storage and rebuild select options
		if( this.urlValidator.test(this.currentStylesheet) ){
			var enc = encodeURI(this.currentStylesheet)
			var index = this.userStylesheets.indexOf(enc);
			if( index != -1 ){
				var before = this.userStylesheets.substring(0, index);
				//+1 for separator char '|'
				var after = this.userStylesheets.substring(index+enc.length+1);
				this.log('Removing currentStylesheet from userStylesheet index:'+index+' before:['+before+'] after:['+after+']')
				this.userStylesheets = before+after;
			}
			this.store();
			this.buildStylesheetList();

			//set current stylesheet to default value
			this.currentStylesheet = '';
			this.lastSelectedIndex =0;
			this.select.selectedIndex = this.lastSelectedIndex;
			this.applyStylesheet();
		}
	},
	
	// -- Core methods
	addStylesheet: function(){
		var url = prompt('Enter stylesheet URL to add:', 'http://');
		this.log("User entered: '"+url+"'")
		// null is returned when user cancel prompt window
		if( url ){
			if( this.urlValidator.test(url) ){
				this.userStylesheets += encodeURI(url)+'|'
				this.store();
				this.currentStylesheet = url;
				this.buildStylesheetList();
				this.applyStylesheet();
				return;
			}else{
				alert("Oooops\nYour given URL is invalid!");
			}
		}
		// reset select position to previous 
		this.select.selectedIndex = this.lastSelectedIndex;
	},
	applyStylesheet: function(){
		this.log('About to apply stylesheet: ['+this.currentStylesheet+']')
		var editorDocument = document.getElementById('wys_frame').contentDocument;
		var styles = editorDocument.getElementsByTagName('style');

		if( styles.length==1 && !this.isBlank(this.currentStylesheet)){
			// first switch to custom stylesheet - there is no custom style element yet...
			var head = editorDocument.getElementsByTagName('head')[0];
			var style = editorDocument.createElement('style');
			style.type = 'text/css';
			style.innerHTML = "@import url("+this.currentStylesheet+");";
			head.appendChild(style);
			styles[0].setAttribute('media', 'print');
			style.setAttribute('media', 'screen');
		}
		
		if(styles.length==2){
			if( this.isBlank(this.currentStylesheet) ){
				styles[0].setAttribute('media', 'screen');
				styles[1].setAttribute('media', 'print');
			}else{
				styles[0].setAttribute('media', 'print');
				styles[1].innerHTML = "@import url("+this.currentStylesheet+");";
				styles[1].setAttribute('media', 'screen');
			}
		}
	}
};


JarmarkOrg.GoogleDocsStyler.install();