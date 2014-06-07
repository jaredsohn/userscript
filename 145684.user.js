// ==UserScript==
// @name        Absalon Fag
// @namespace   http://rasmuswriedtlarsen.com
// @description Edit the links to your Absalon courses on the landing page of KUnet, and have them displayed when the requests fail
// @include     https://intranet.ku.dk/Sider/default.aspx
// @version     1.1.3
// @copyright 	2012, Rasmus Wriedt Larsen
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==

var GM_getSetID = "Absalon_Fag_Whatever";

/*
console.log("is not saving to GM right now");
GM_deleteValue(GM_getSetID);
//*/

var baseCourseURL = "https://pabsws.ku.dk/index.aspx?starturl=main.aspx%26CourseId%3d";

var innerJoin = "#¤%&#";
var outerJoin = "@#!/=)";

function createObscureFormat(enalbed, URLs, namesNew, namesOld)
{
	return [enalbed.join(innerJoin),URLs.join(innerJoin),namesNew.join(innerJoin),namesOld.join(innerJoin)].join(outerJoin);
}

var linksEnalbled;
var linksURLs;
var linkNamesNew;
var linkNamesOld;

var originalHTML;

function populateArrays()
{
	var obscureFormat = GM_getValue(GM_getSetID,"");

	var firstSplit = obscureFormat.split(outerJoin);

	if ( firstSplit.length < 4)
	{
		linksEnalbled = []
		linksURLs = []
		linkNamesNew = []
		linkNamesOld = []
	}
	else
	{
		linksEnalbled = firstSplit[0].split(innerJoin);
		linksURLs = firstSplit[1].split(innerJoin);
		linkNamesNew = firstSplit[2].split(innerJoin);
		linkNamesOld = firstSplit[3].split(innerJoin);
	}
}

function replace()
{
	populateArrays();
	originalHTML = $('.minilisting').html();

	var hasAddedElements = false;

	$('.minilisting tr').each ( function () { 
				if ( $(this).find('a').length == 0 ) 
				{ 
					return; 
				}

				var elem = $(this).find('a')[0];

				var linksToKeepIndex = linksURLs.indexOf(elem.href);
				if ( linksToKeepIndex == -1 )
				{
					hasAddedElements = true;

					linksEnalbled.push( "true" );
					linksURLs.push( elem.href );
					linkNamesOld.push(elem.text);
					linkNamesNew.push( elem.text.slice( elem.text.indexOf(";")+1 ) );

					linksToKeepIndex = linksURLs.length -1;
				}

				if ( linksEnalbled[linksToKeepIndex] == "true")
				{
					$(elem).html( linkNamesNew[linksToKeepIndex] );
				}
				else
				{
					$(this).remove();
					return;
				}

				// date formating
				var jQdateChild = $($(this).children().last());
				var spanChildren = jQdateChild.children().length != 0;
				var str;
				if ( spanChildren )
				{
					str = jQdateChild.children()[0].innerHTML;
				} 
				else
				{
					str = jQdateChild[0].innerHTML;
				}
				
				var newStr = str.slice(0,2) +"/"+str.slice(3,5) + str.slice(10);
				if ( spanChildren )
				{
					jQdateChild.children()[0].innerHTML = newStr;
				}
				else
				{
					jQdateChild[0].innerHTML = newStr;
				}
		} );

	
	$(".minilisting tr :contains('Fag')").css("width","39%");
	$(".minilisting").css("padding-bottom", "10px");

	if ( hasAddedElements )
	{
		var newSettingsString = createObscureFormat(linksEnalbled, linksURLs, linkNamesNew, linkNamesOld);
		GM_setValue(GM_getSetID, newSettingsString);
		populateArrays()
	}
}

var afterSettingsUpdateFunction;
var isReplacing = false;

var kuWorking = "Absalon";
var kuFailing = "Adgang til Absalon";

// KU net is working
if ( $('nobr :contains("'+kuWorking+'")').length == 1 )
{
	var masterTable = $( $('nobr :contains("'+kuWorking+'")').parents("table")[1] );

	addSettings(masterTable);
	setTimeout(replace, 0);

	afterSettingsUpdateFunction = function(){
		$('.minilisting').html(originalHTML);
		replace()
	}
}
// KU net fail
else if ( $('nobr :contains("'+kuFailing+'")').length == 1 )
{
	isReplacing = true;

	var masterTable = $( $('nobr :contains("'+kuFailing+'")').parents("table")[1] );

	addSettings(masterTable);
	writeLinksToTable(masterTable);

	afterSettingsUpdateFunction = function(){
		writeLinksToTable(masterTable);
	}
}

function addSettings(masterTable)
{
	var tabOrderSoFar = 1;
	var title = $(masterTable.find("h3 span")[0]);
	title.append(' <a title="Change Absalon Fag UserScript Settings" style="text-transform:none;color:#aaaaaa;" id="AbsalonFagWhatever-Button">Settings</a>');
	$("#AbsalonFagWhatever-Button").click( openSettings );

	function openSettings() 
	{
		// BLACK BG
		var buildString = '<div id="AbsalonFagWhatever-bgdiv" style="position: fixed; top:0px;left:0px;width:100%; height:100%; background:rgba(0,0,0,0.75)">';
		buildString += '</div>';

		// START DIVS
		buildString += '<div id="AbsalonFagWhatever-topdiv" style="position: absolute;top: 150px;left: 50%;">';
		buildString += '<div style="position: relative; left: -300px; width: 600px; min-height: 100px; background: #FFFFFF;">';
		buildString += '<div style="padding:15px;padding-top:5px;">';
		buildString += '<h2>Change Settings</h2>';
		buildString += '<div id="Absalon_Fag_Whatever-settings-inner">';

		var hasBeenRunBefore = (linksURLs.length != 0)

		if ( hasBeenRunBefore )
		{
			//TABLE
			buildString += '<table id="AbsalonFagWhatever-table" style="padding-bottom:20px;">';

			//HEADER
			buildString += '<thead>';
			buildString += '<th>Active?</th>';
			buildString += '<th>URL</th>';
			buildString += '<th>New Name</th>';
			buildString += '</thead>';

			//BODY
			buildString += '<tbody id="AbsalonFagWhatever-tablebody">';

			for (var i = 0; i < linksURLs.length; i++) 
			{
				buildString += createSettingsTableRow(linksURLs[i], linksEnalbled[i], linkNamesNew[i], linkNamesOld[i]);
			}

			buildString += '</tbody>';
			buildString += '</table>';

			// BUTTONS
			buildString += '<input id="AbsalonFagWhatever-Edit-RefrestButton" type="button" value="Refresh Course List"/>';
			buildString += '<input id="AbsalonFagWhatever-Edit-ClearButton" type="button" value="Clear Settings"/>';
			buildString += '<input style="float:right;" id="AbsalonFagWhatever-Edit-SaveButton" type="button" value="Save"/>';
			buildString += '<input style="float:right;" id="AbsalonFagWhatever-Edit-CancelButton" type="button" value="Cancel"/>';
		}

		// END DIVS
		buildString += '</div>';
		buildString += '</div>';
		buildString += '</div>';
		buildString += '</div>';

		$('body').append(buildString);

		$('#AbsalonFagWhatever-bgdiv').click( editClose );

		$('#AbsalonFagWhatever-Edit-RefrestButton').click( refreshCourseList );
		$('#AbsalonFagWhatever-Edit-ClearButton').click( clearSettings );
		$('#AbsalonFagWhatever-Edit-CancelButton').click( editCancel );
		$('#AbsalonFagWhatever-Edit-SaveButton').click( editSave );
		
		if(!hasBeenRunBefore && isReplacing)
		{
			refreshCourseList();
		}
	}

	function createSettingsTableRow(URL, show, newName, oldName) 
	{
		buildString = "";
		buildString += '<tr>';

		buildString += '<td>';
		buildString += '<input class="check" type="checkbox"'+(show=="true" ? 'checked="checked"' : "")+'/>';
		buildString += '</td>';

		buildString += '<td>';
		buildString += '<a href="'+URL+'">'+oldName+'</a>';
		buildString += '</td>';

		buildString += '<td>';
		buildString += '<input class="inputtext" placeholder="the text you want displayed" type="text" tabindex="'+tabOrderSoFar+'" value="'+newName+'"/>';
		buildString += '</td>';

		buildString += '</tr>';

		tabOrderSoFar++;

		return buildString;
	}

	function clearSettings() {
		GM_deleteValue(GM_getSetID);
		editClose();
		$('.minilisting').html(originalHTML);
		replace();
	}

	function refreshCourseList() {

		$('#Absalon_Fag_Whatever-settings-inner')[0].innerHTML = "<p>loading...</p>";

		GM_xmlhttpRequest({	
		  method: "GET",
		  url: "http://pabsws.ku.dk",
		  onload: responseFromKU,
		  onerror: errorInHTMLLoad
		});
	}

	function responseFromKU(response){

		$('#Absalon_Fag_Whatever-settings-inner')[0].innerHTML = "<p>still loading...</p>";

		GM_xmlhttpRequest({	
		  method: "GET",
		  url: "https://absalon.itslearning.com/Course/AllCourses.aspx",
		  onload: parseCourseResponse,
		  onerror: errorInHTMLLoad
		});
	}

	function errorInHTMLLoad(response)
	{
		buildString = "";
		buildString += "<p>" + "We encountered an error updating the course list." + "<br/>"
					+ "Please try again. If that does not work, try clearing your cookies for ku.dk and try once more :)" + "<br/>"
					+ "<br/>"
					+ "If that does not work either, something is probably wrong with the extension." + "<br/>"
					+ "I (Rasmus -- the Developer) will probably notice and update it in a couple of days :)" + "<br/>"
					+ "If I don't, shoot me an email at info (the at sign) rasmuswriedtlarsen d-o-t com"
					+ "</p>";
		
		$('#Absalon_Fag_Whatever-settings-inner')[0].innerHTML = buildString;
	}

	function parseCourseResponse(response)
	{
		var newLinksEnalbed = [];
		var newLinksURLs = [];
		var newLinkNamesNew = [];
		var newLinkNamesOld = [];

		var index = 0;

		$(response.responseText).find('#ctl24_ctl01 a[href^="/"]').each(function() {

			var splitted = this.href.split("=");
			var pabswsURL = baseCourseURL + splitted[splitted.length-1];

			var oldIndex = linksURLs.indexOf(pabswsURL);
			if ( oldIndex != -1 )
			{
				newLinksEnalbed.push(linksEnalbled[oldIndex]);
				newLinksURLs.push(linksURLs[oldIndex]);
				newLinkNamesNew.push(linkNamesNew[oldIndex]);
				newLinkNamesOld.push(linkNamesOld[oldIndex]);
			}
			else
			{
				// TODO: only enable those with star?
				newLinksEnalbed.push( index < 2 );
				newLinksURLs.push( pabswsURL );
				newLinkNamesOld.push(this.text);
				newLinkNamesNew.push( this.text.slice( this.text.indexOf(";")+1 ) );
			}

			index++;
		});

		var newSettingsString = createObscureFormat(newLinksEnalbed, newLinksURLs, newLinkNamesNew, newLinkNamesOld);
		GM_setValue(GM_getSetID, newSettingsString);

		editClose(); 
		afterSettingsUpdateFunction()
		openSettings();
	}

	function editCancel () {
		editClose();
	}

	function editClose() {
		$('#AbsalonFagWhatever-bgdiv').remove();
		$('#AbsalonFagWhatever-topdiv').remove();
	}

	function editSave() {
		var newLinksEnalbed = [];
		var newLinksURLs = [];
		var newLinkNamesNew = [];
		var newLinkNamesOld = [];

		$('#AbsalonFagWhatever-table tbody tr').each ( function() {
			var isChecked = $(this).find(".check").is(':checked');
			var url = $(this).find("a")[0].href;
			var newName = $(this).find(".inputtext")[0].value;
			var oldName = $(this).find("a")[0].text;

			newLinksEnalbed.push(isChecked);
			newLinksURLs.push(url);
			newLinkNamesNew.push(newName);
			newLinkNamesOld.push(oldName);
		});

		var newSettingsString = createObscureFormat(newLinksEnalbed, newLinksURLs, newLinkNamesNew, newLinkNamesOld);

		GM_setValue(GM_getSetID, newSettingsString);
		editClose();
		
		afterSettingsUpdateFunction();
	}
}

function writeLinksToTable(masterTable)
{
	populateArrays();

	var subTable = $(masterTable.find(".ms-WPBody"));

	var buildString = '<div class="SimpleRadeditor webpart-border-bottom">';

	if ( linksURLs.length == 0)
	{
		buildString += '<em>Click the "Settings" link above to set up which courses should be shown</em>';
	}
	else
	{
		buildString += '<table>';

		//HEADER
		buildString += '<thead>';
		buildString += '<th>Fag</th>';
		buildString += '</thead>';

		// BODY
		buildString += '<tbody>';
		for (var i = 0; i < linksURLs.length; i++) {
			if ( linksEnalbled[i] == "false" ) continue;

			buildString += '<tr>';

			buildString += '<td>';
			buildString += '<a href="'+linksURLs[i]+'" target="_blank">'+linkNamesNew[i]+'</a>';
			buildString += '</td>';

			buildString += '</tr>';
			
		};

		buildString += '</tbody>';
		buildString += '</table>';
	}


	buildString += '</div>';

	subTable[0].innerHTML = buildString;
}
