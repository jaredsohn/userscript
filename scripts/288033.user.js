// ==UserScript==
// @name			VE Unit List
// @version			0.1
// @namespace		VirtonomicsEnhanced
// @include			http://virtonomic*.*/*/main/company/view/*/unit_list
// @author 			hitaishi/tantrik
// @icon			http://virtonomics.com/img/first/kubs.png
// @description		Uniit List rehaul for Virtonomics
// ==/UserScript==

//hack to get access to jQuery & DOM
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.head.appendChild(script);
}

 

var VE_Unit_List = function(){
	this.CurrentVersion = "0.1";
	this.server = location.href.match(/virtonomic*.*\/(.*)\/main|window/)[1];
	this.unitList = [];
	function addCss(cssString) { 
	var style = document.createElement("style");
	style.setAttribute("type","text/css");
	style.innerText = cssString;
	document.body.appendChild(style);
}
	addCss(	'nav a{position:relative;display:inline-block;outline:0;font-weight:400;text-shadow:0 0 1px rgba(255,255,255,.3);}nav a:focus,nav a:hover{outline:0;}.cl-effect-1 a::after,.cl-effect-1 a::before{display:inline-block;opacity:0;-webkit-transition:-webkit-transform .3s,opacity .2s;-moz-transition:-moz-transform .3s,opacity .2s;transition:transform .3s,opacity .2s}.cl-effect-1 a::before{margin-right:10px;content:"[";-webkit-transform:translateX(20px);-moz-transform:translateX(20px);transform:translateX(20px)}.cl-effect-1 a::after{margin-left:10px;content:"]";-webkit-transform:translateX(-20px);-moz-transform:translateX(-20px);transform:translateX(-20px)}.cl-effect-1 a:focus::after,.cl-effect-1 a:focus::before,.cl-effect-1 a:hover::after,.cl-effect-1 a:hover::before{opacity:1;-webkit-transform:translateX(0px);-moz-transform:translateX(0px);transform:translateX(0px)}');
	
	//Get a list of all unit rows
	var unit_list = $('table.unit-list>tbody> tr:gt(0)');
	//fix the header
	var tHeader = $('table.unit-list tr.u-th');
	var newHeader = $('<tr class="u-th"></tr>');
	$('<th class="u-f"></th>').append($('div.u-cl div.ordertool',tHeader)).appendTo(newHeader);
	var temp = $('<th class="u-c"></th>').append(
		$('th.u-f:first div.ordertool', tHeader),
		$('th.u-a div.ordertool', tHeader),
		$('div.u-ut div.ordertool',tHeader)
		);
	$('div.ordertool:nth(0)',temp).css({display:"inline-block", width:"40px"});
	$('div.ordertool:nth(1)',temp).css({display:"inline-block", width:"43px", padding:"0 0 0 20px"});
	$('div.ordertool:nth(2)',temp).css({display:"inline-block", width:"80px", padding:"0 0 0 10px"});
	temp.appendTo(newHeader);
	temp = $('th.u15', tHeader).removeClass('u15').addClass('u10');
	newHeader.append($('<th class="u10"></th>'),temp,$('th.u-e', tHeader),$('th.u-f:last', tHeader));
	
	tHeader.replaceWith(newHeader);
	//Rehaul the unit rows
	unit_list.each(function(index,row){
		var unitid = $('td:first i', this).text();
		var unitID = $('<span style="color:grey; padding-left: 10px">'+unitid+'</span>');
		var country = $('<span style="padding-left:10px; width:16px;'
				+'background-repeat:no-repeat" class="'+$('td:nth(1)', this).attr('class')
				+'" title="'+$('td:nth(1)', this).attr('title') +'"> &nbsp;&nbsp;</span>');
		var region = $('<span style="padding-left:10px; color:limegreen">'+$('td:nth(1) i',this).text()+'</span>');
		var city = $('<span style="padding-left:10px; color:maroon">'+$('td:nth(1) b',this).text()+'</span><br/>');
		var unitIcon = $('<td style="background-position:5px 3px !important; background-repeat:no-repeat;'
				+'width: 32px;" class="'+$('td:nth(2)', this).attr('class')+'" title="'
				+$('td:nth(2)', this).attr('title')+'"></td>');
		unitIcon.removeClass('u-c');
		var unitLink = $('td:nth(2) a:first', this);
		unitLink.css('padding-top','3px');
		unitLink = $('<nav class="cl-effect-1"></nav>').append(unitLink);
		var mfgLink = $('td:nth(3)', this);
		//Add additional buttons
		mfgLink.css('white-space','nowrap');
		var href = $('a',mfgLink).attr('href');
		if(href != null){
			var baselink = 'http://virtonomics.com/'+server+'/main/unit/view/'+unitid;
			//Add rename link to all units
			var renameLink = 'http://virtonomics.com/'+server+'/window/unit/changename/'+unitid;
				$('<a href="'+renameLink+'" onclick="return doWindow(this,800,320);"><img style="padding-left:3px" align="top" height="16" width="16" title="Rename Unit" alt="Rename Unit" '+
					'src="http://cdn.dustball.com/textfield_rename.png" /></a>').prependTo(mfgLink);
			if(href.search('manufacture') > 0) {
				$('<a href="'+baselink+'/sale"><img style="padding-left:3px" align="top" height="16" width="16" title="Sale" alt="Sale" '+
				'src="/img/storageClear.gif" /></a>').appendTo(mfgLink);
				$('<a href="'+baselink+'/supply"><img style="padding-left:3px" align="top" height="16" width="16" title="Supply" alt="Supply" '+
				'src="/img/supplier_add.gif" /></a>').appendTo(mfgLink);
			}else if(href.search('trading_hall') > 0) {
				$('<a href="'+baselink+'/supply"><img style="padding-left:3px" align="top" height="16" width="16" title="Supply" alt="Supply" '+
				'src="/img/supplier_add.gif" /></a>').appendTo(mfgLink);
			}else if(href.search('investigation') > 0) {
				$('<a href="'+baselink+'/project_create" onclick="return doWindow(this,800,320);"><img style="padding-left:3px" align="top" height="16" width="16" title="New Project" alt="New Project" '+
				'src="/img/artefact/icons/color/research.gif" /></a>').appendTo(mfgLink);
			}else {}
		}
		
		var unitSize = $('td:nth(4)', this);
		unitSize.text(unitSize.text().replace('work places','wp'));
		var products = $('td:nth(5)', this);
		var eff = $('td:nth(6)',this);
		var col2 = $('<td style="padding-left:7px"></td>').append(country, unitID, region, city, unitLink);
		var newtr = $('<tr></tr>').append(unitIcon,col2,mfgLink,unitSize,products,eff);
		if((index+1)%2==0) { newtr.addClass('o'); }
		$(this).replaceWith(newtr);
	});
};

addJQuery(VE_Unit_List);