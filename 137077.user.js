// ==UserScript==
// @name           fix timefox reporting
// @namespace      Timefox frame
// @description    Adds comments/time breakdown into personnel report
// @include        https://fox3.functionfox.com/timefox/per_mon_rep.asp*
// ==/UserScript==



function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function constructDateString()
{
	var urlsParameters = getUrlVars();
	return 'd11='+urlsParameters['d11'] + '&'+
			'd12='+urlsParameters['d12'] + '&' +
			'd13='+urlsParameters['d13'] + '&' +
			'd21='+urlsParameters['d21'] + '&' +
			'd22='+urlsParameters['d22'] + '&' +
			'd23='+urlsParameters['d23'] 
}

var projects = new Object();
function createProjects ( data ) {
		try {  
				data += ""
				endlineRemoved = data.replace(/(\r\n|\n|\r)/gm, " ");

				/--Select Client--<\/option>(.+?)<\/select/g.exec(endlineRemoved) 
				jq( RegExp.$1 )
				.each(function (index){
						var fixed = jq(this).text().replace("_", "");
						fixed = fixed.replace( /-.*/, "");
						projects[fixed] = jq(this).val();
				})
		}
		catch(e){
				console.log("Error "+ e)
		}
}
var clientProjects = false
function getClientProjects(){
		if( !clientProjects )
		{
				var tableRows = document.evaluate( '/html/body/table[2]/tbody/tr', document, null, XPathResult.ANY_TYPE, null );  
				var thisNode = tableRows .iterateNext();  
				clientProjects = new Object();
				var i = 1;
				var done = {};
				while (thisNode) 
				{  
						if ( thisNode.className != 'trRepHdr' || thisNode.className != 'trDataTotal')
						{
								if ( thisNode.childNodes[0].innerHTML )
								{
										var projectName  =  thisNode.childNodes[0].innerHTML;
										projectName = projectName.replace(/\([^(]+\)/g,"");//remove '([client])' to be consitent
										var projectShortName = 'RD';
										clientProjects[projectName] = "/html/body/table[2]/tbody/tr["+i+"]";
										projectName = projectName.replace("_","");
										if(projectName == "ADMIN TIME-Internal RealDecoy tracking")
										{
											projectShortName = 'RD';
										}
										else
										{
											/^([^-]+)(-[\d]+)(-.*)/.exec( projectName ) 
											projectShortName = RegExp.$1;
										}
										if ( !done[projectShortName] )
										{
												done[projectShortName] = true; 
												jQuery.ajax({
														url : "https://fox3.functionfox.com/timefox/job_rep.asp?streaming_extension=xls&stream_to_file=false&job_cd=-1&dt_asc=&factor=100&co_width=100&r1=r3&nbs=&costs=&tmp=change_cln&range=3&cln_cd2="+projects[projectShortName]+"&"+constructDateString()+"&sa=", 
														success: getProjectData( projectShortName ),
														async: false
												});
										}
								}
						}
						thisNode = tableRows.iterateNext();  
						i++;
				}   
		}
		return clientProjects;
}

function getProjectData( project ){
		return function ( data ) { return getProjectDataHelper( data, project ) };

}
window.sub_projects = new Object();
function getProjectDataHelper( data, project ){
	
		try {  
				data += ""
				endlineRemoved = data.replace(/(\r\n|\n|\r)/gm, " ");

				/--Select Project--<\/option>(.+?)<\/select/g.exec(endlineRemoved) 
				jq( RegExp.$1 )
				.each(function (index){
						var fixed = jq(this).text().replace(/\([^(]+\)/g,"");
						if(	!sub_projects[project] )
						{
							sub_projects[project] = {}
						}
						sub_projects[project][fixed] = jq(this).val();
				})
		}
		catch(e){
				console.log("Error "+ e)
		}
}
function getInfo( projectRow ){
		var projectShortName = 'RD';
		projectRow = projectRow.replace(/\([^(]+\)/g,"")
		if(projectRow == "_ADMIN TIME-Internal RealDecoy tracking")
		{
			projectShortName = 'RD';
		}else
		{
			/^([^-]+)/.exec(projectRow);
			projectShortName = RegExp.$1;
		}
		var projectURL = createCommentReportUrl(projectShortName, projectRow );
	/*	
		jQuery.ajax({
				url: projectURL, 
				success : parseInfoHelper(projectRow),
				async: false
		});
		*/

		jQuery.get(projectURL, parseInfoHelper(projectRow));
		try{
		var projectColumn = document.evaluate(getClientProjects()[projectRow] +"/td[1]", document, null, XPathResult.ANY_TYPE, null ); 
		var projectColumnTD = projectColumn.iterateNext();
		var newLink  = document.createElement('a');
		newLink.setAttribute('href', projectURL)
		newLink.setAttribute('target', "_blank")
		newLink.appendChild(
						document.createTextNode('link')
					  );
		projectColumnTD.appendChild(newLink);
		}catch(e) { console.log(e, getClientProjects()[projectRow], projectRow, getClientProjects()) ; }

		
}
function createCommentReportUrl(projectShortName, projectRow )
{
	//	console.log( "createCommentReportUrl",sub_projects,projectRow,sub_projects[projectShortName][projectRow],projects[projectShortName]);
	return "https://fox3.functionfox.com/timefox/treports/jobOut.asp?job_cd="+sub_projects[projectShortName][projectRow]+"&r1=r3&range=3&cln_cd2="+projects[projectShortName]+"&"+constructDateString();
}
window.getInfo = getInfo;

function parseInfoHelper( projectRow ){
		return function ( data) {
			parseInfo( data , projectRow)
		}
}
var startDate = false;
function getStartDate()
{
	if( !startDate )
	{
			var fullDateRange = document.evaluate("/html/body/table/tbody/tr/td/table/tbody/tr/td[2]", document, null, XPathResult.ANY_TYPE, null ); 
			var dateString = fullDateRange.iterateNext().innerHTML;
			/(\d\d)\/(\d\d)\/(\d\d\d\d)/.exec(dateString);
			startDate = new Date(RegExp.$3, RegExp.$1-1, RegExp.$2, 0, 0, 0, 0);
	}
	return startDate
	
}

function parseInfo( data , projectRow){
	var nameNode = document.evaluate("/html/body/table/tbody/tr/td/table/tbody/tr[2]/td[2]", document, null, XPathResult.ANY_TYPE, null ); 
	var name =  nameNode.iterateNext().innerHTML; 
	var i = 0;
	data += ""
	var endlineRemoved = data.replace(/(\r\n|\n|\r)/gm, " ");
	data = endlineRemoved.replace(/^(.*)\/head>/,"");
	jq(".even, .odd", data).each(function(){
		/([^,]*), (.*)/.exec(this.childNodes[1].innerHTML)
		var currentName = RegExp.$2 + " "+RegExp.$1;
		if(currentName == name )
			{
					var task = new TfTask(this);
					decorateTableCells( projectRow, task );

					i++;
			}

	});
}
function TfTask( row )
{
	this.getDoerName = function(){ 
			return row.childNodes[1].innerHTML.replace(/([^,]*), (.*)/, RegExp.$2 + " "+RegExp.$1); 
	}();
	this.getDate = function(){ 
			var rawDate = /(\d\d)\/(\d\d)\/(\d\d\d\d)/.exec(row.childNodes[7].innerHTML);
			return new Date(RegExp.$3, RegExp.$1-1, RegExp.$2, 0, 0, 0, 0);
	}();
	this.getComment = function(){ 
			return row.childNodes[5].innerHTML; 
	}();
	this.getTask = function(){ 
			return row.childNodes[3].innerHTML; 
	}();	
	this.getTime = function(){ 
			return row.childNodes[11].innerHTML; 
	}();	
}
function decorateTableCells( projectRow, info )
{
	
			//get date cell
	try{
			var hourColumn = document.evaluate(getClientProjects()[projectRow] +"/td[" + getColumn(info)+ "]", document, null, XPathResult.ANY_TYPE, null ); 
			var parnetDiv = document.createElement("div");
			var taskDiv = document.createElement("div")
			taskDiv.appendChild(document.createTextNode( info.getTask));
			taskDiv.appendChild(document.createTextNode( " " + info.getTime));
			taskDiv.setAttribute("style", "background-color:grey");
			taskDiv.style.width= "200px";
			parnetDiv.appendChild(taskDiv);
			var commentDiv = document.createElement("div")
			commentDiv.appendChild(document.createTextNode( info.getComment));
			parnetDiv.appendChild(commentDiv);			
			var dateString = hourColumn.iterateNext().appendChild( 	parnetDiv );
			//console.log(getClientProjects()[projectRow]+"/td[" + getColumn(info)+ "]", projectRow, info.getDate);
	}
	catch(e)
	{
			console.log(getClientProjects()[projectRow]+"/td[" + getColumn(info)+ "]",info, projectRow, e);
	}

}
function getColumn( task ){
		var dateNeedle =new Date(getStartDate());
		
		var i = 0;
		while(  task.getDate >= dateNeedle )
		{
			i++;
			dateNeedle.setDate(dateNeedle.getDate() + 1); //increment day by 1
		}

		return 1 + i;
}
var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jq = jQuery.noConflict();
    jQuery.ajax({
			url: 'https://fox3.functionfox.com/timefox/job_rep.asp', 
			success: createProjects,
			async: false
	});
	getStartDate();
    // find out what projects where worked on 
	var clients = getClientProjects();
	for(var i in clients)
		{
				//console.log(i);
				getInfo(i);
		}

	//console.log(clientProjects);
	//
	// https://fox3.functionfox.com/timefox/treports/jobOut.asp?job_cd=736877&r1=r3&range=3&cln_cd2=30066&d11=01&d12=29&d13=12&d21=02&d22=4&d23=12
	//
	//
	// foreach project make the sells have mouse over.
	//
	
	//

}, false);
// 
