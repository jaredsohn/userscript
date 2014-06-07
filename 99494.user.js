// ==UserScript==
// @name				Ikariam Recruit Booster
// @namespace		Ikariam-Recruit-Booster
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require			http://jquery-ui.googlecode.com/svn/tags/1.8.11/ui/minified/jquery-ui.min.js
// @require			http://jquery-ui.googlecode.com/svn/tags/1.8.11/ui/minified/jquery.ui.core.min.js
// @require			http://jquery-ui.googlecode.com/svn/tags/1.8.11/ui/minified/jquery.ui.position.min.js
// @require			http://jquery-ui.googlecode.com/svn/tags/1.8.11/ui/minified/jquery.ui.widget.min.js
// @resource		uicss http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.11/themes/sunny/jquery-ui.css
// @include			http://*.ikariam.*/*
// @exclude			http://board.ikariam.*/*
// @author			salomone
// @description	Add recruiter fields to the top of the screen - No scroll down required to manage recruiting
// @version			v.99.3
// @history			v.99.3	Release date: 2011.04.03
// @history			v.99.3	Added mine auto updater
// @history			v.99.1	Release date: 2011.03.31
// @history			v.99.1	Added current army overview above the new list
// @history			v.99	Release date: 2011.03.21
// @history			v.99	Initial upload
// ==/UserScript==

currentUrl = window.location.href;
hidePremium = false;
versionStr = 'v.99.3';
scriptId = 99494

var img_src = 'data:image/gif;base64,' +
		'R0lGODlhCwAPAOejAAcAAAgAAA0AABEAABgAABYFDSQJACoLETMQADgRDDgUADUYBkMWEFQaDk8fEVIg' +
		'CVQkDVMlGFEmFl0lDk0rElgoFGYoEWcoF1kvGWUrH2ksF2QuInIsEnAuFmgzFGozHnwvG3UzG3kxJWk4' +
		'GG84Gnw2HXU8Hnw7H484JIg7H4Q8I4U+KHVEJo4+J4BELIlEJ2xNMJJDJYlJJZpGIZ5EKntTL59LH5pO' +
		'Gn9UNKVKK5pNL4JWJaZMKqdML5xPM4RXLYlWK4JXN4dXL5tTIahPJYxYJrFNKYlZKJFXKZBYM69PNo5c' +
		'HaZUL45dIq9SM6lTPKtWLbNTOoxhLKhYM71VMLVWQsFXLbxZMsBYM7JdOKxgL8VZM7ReO8xZLLpdPrde' +
		'QMRcN7lfPbdhMMhcNcddNcxcN8FgNc1eMMlePr9iOcVfSMNhPsxfOMZhRb5kQcZiQrtnOcxiOsFlPsRl' +
		'OcpjQMZlOsllM9BiP8ZmPNFiRNliOslnQNJlPshqNtFnP8xpQs5qSNlpO7B2NtFrQ95oQs5tQtlsQbd7' +
		'POFyIN97JcaBPOt7Gd1+KtaDN9SFQN6DPPmAI9+GNvuAIP6CIv+EJP2EK/uFLv+FKP+HH/+JH/+IKf+I' +
		'KviMMf+ML/ePLv2ONPqRNf+RQv6USP//////////////////////////////////////////////////' +
		'////////////////////////////////////////////////////////////////////////////////' +
		'////////////////////////////////////////////////////////////////////////////////' +
		'////////////////////////////////////////////////////////////////////////////////' +
		'////////////////////////////////////////////////////////////////////////////////' +
		'/yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAP8ALAAAAAALAA8AAAi8AKU4ivQoUSJGjRQdEtRkUiZM' +
		'kCRR2vSJ06IllUB56qTpkqVQohDhQBABwwkaPGwYifKhRggICgoEELBgQosnRbrYuRNGxosqat5gOUKm' +
		'DiBCRJi0QRPnTBANIFLkiGGCBQkPI2AYaNBhhhMfLjIkAJCkx5pCaahsGVMmj5IfV+C4obOHjZ5AhsDs' +
		'4LCBgoMIEipYKLECCAoRDw4MIMDgggodSKzw8dPnxhA5f+aYEaJFDJ5BUKZ88cIlS0AAOw==';

if ( currentUrl.indexOf('view=barracks') > 0 || currentUrl.indexOf('view=shipyard') > 0 )	{
	
	if ( hidePremium )	{
		$('div#premium_btn').hide();
	}
	
	baseImgName = 'skin/characters/military/x40_y40/y40_###UNITNAME###_faceright.gif';
	
	/*	
	max number of units x original input field width : 14 x 60 ==> 840
	number of units to fit x original input field width : 11 x 60 ==> 660
	preferred maximum width for new input fields : 660 / 14 ==> 47 ===> 45
	*/
	
	widthAttr = '40px';
	if ( currentUrl.indexOf('view=shipyard') > 0 )	{
		baseImgName = 'skin/characters/fleet/40x40/###UNITNAME###_r_40x40.gif';
		widthAttr = '60px';
	}
	
	containerTable = $('<table></table>');
	unitCountContainerTr = $('<tr></tr>');
	unitCountContainerTr.css('background', 'url("' + img_src + '")');
	unitCountContainerTr.css('color', '#fee5bd');
	//unitCountContainerTr.css('color', '#fceac6');
	unitCountContainerTr.css('font-weight', 'bold');
	unitCountContainerTr.css('text-align', 'center');
	imageContainerTr = $('<tr></tr>');
	inputBoxContainerTr = $('<tr></tr>');			
	
	$('#units').find('li[class^="unit"]').each(function()	{
		
		unitCount = $(this).find('div.unitinfo').find('div.unitcount').text().replace(/\D/g, '');		
		unitCountCell = $('<td></td>');
		
		unitCountCell.append(unitCount);
		unitCountContainerTr.append(unitCountCell);
		
		actualClass = $(this).attr('class');			
		unitName = actualClass.replace('unit ', '');
	
		imgName = baseImgName.replace('###UNITNAME###', unitName);
		imageCell = $('<td></td>');
		img =  $('<img></img>');
		img.attr('src', imgName);
		imageCell.append(img);
		
		imageContainerTr.append(imageCell);
		
		originalInputDiv = $(this).find('div.forminput');
		clonedInputDiv = originalInputDiv.clone(true);
		clonedInputDiv.find('.textfield').css('width', widthAttr);			
		clonedId = 'irb_' + clonedInputDiv.find('.textfield').attr('id');
		clonedInputDiv.find('.textfield').attr('id', clonedId);
		clonedInputDiv.find('.setMax').attr('name', clonedId);
		inputBoxCell = $('<td></td>');			
		inputBoxCell.append(clonedInputDiv);
		inputBoxContainerTr.append(inputBoxCell);
		
		originalInputDiv.find('.textfield').change(function() {
			id = $(this).attr('id');
			$('#irb_' + id ).val( $(this).val() );
		});
		
		clonedInputDiv.find('.textfield').change(function() {
			id = $(this).attr('id').replace('irb_', '') ;
			$('#' + id ).val( $(this).val() );
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent('click', true, true ); // event type,bubbling,cancelable
			document.getElementById( id ).dispatchEvent(evt);				
			if ( $('#' + id ).val() != $(this).val() )	{
				$(this).val( $('#' + id ).val() );	// If we set more then available
			}			
		});	
		
		clonedInputDiv.find('.setMax').click(function(){						
			unitName = $(this).attr('name').replace('irb_textfield_', '');				
			unitCount = $('#sliderbg_' + unitName).attr('title');
			$('#irb_textfield_' + unitName).val ( unitCount );
		});	// Set value to max	with NEW max str
			
	});
	
	$('a.setMin').click(function(){
		unitName = $(this).parent().parent().attr('class').replace('unit ', '');
		$('#irb_textfield_' + unitName).val ( 0 );
	});	// Set value to 0	with slider button
	
	$('a.setMax').click(function(){				
		unitName = $(this).parent().parent().attr('class').replace('unit ', '');				
		unitCount = $(this).parent().parent().find('#sliderbg_' + unitName).attr('title');
		$('#irb_textfield_' + unitName).val ( unitCount );
	});	// Set value to max	with max str or slider button	
	
	$('div[id^="sliderbg"]').click(function(){				
		unitName = $(this).attr('id').replace('sliderbg_', '');				
		//unitCount = $(this).attr('title');
		unitCount = $('#textfield_' + unitName).val();
		$('#irb_textfield_' + unitName).val ( unitCount );
	});	// Set value to max	with max str or slider button		
	
	containerTable.append(unitCountContainerTr);
	containerTable.append(imageContainerTr);
	containerTable.append(inputBoxContainerTr);
	
	$('#selected_units').before(containerTable);	
	
	var updater = new ScriptUpdater();
	updater.init(scriptId, versionStr);
	
}

function ScriptUpdater() {
	// Inspired by PhasmaExMachina's Script Updater
	
	var scriptId, currentVersion, lastCheck, lastCheckVariableName, interval, details;
	
	this.init = function(scriptId, currentVersion)	{
		this.details = {}; 	
		this.scriptId = scriptId;
		this.currentVersion = currentVersion;
		lastCheckVariableName = 'lastCheck' + scriptId
		this.lastCheck = parseInt(GM_getValue(lastCheckVariableName, 0));
		var d = new Date();
		if ( this.lastCheck == 0 )	{			
			GM_setValue(lastCheckVariableName, d.getTime()+'');
			this.lastCheck = d.getTime();
		}
		//													sec		min		hour	day
		this.interval =		1000 *	60 *	60 *	24 *	1;		
		//this.interval = 1;	// for debugging only
		
		if ( d - this.interval > this.lastCheck )	{			
			GM_setValue(lastCheckVariableName, d.getTime()+'');
			getAvailableVersion(this.currentVersion);			
		}
	}
	
	var getAvailableVersion = function(currentVersion)	{
		GM_xmlhttpRequest ({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/' + this.scriptId + '.meta.js',
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
			onload: function (response) {
				this.details = parseMetaData(response.responseText);		
				if (this.details.version != currentVersion)	{
					showInfoBox(this.details);
				}
			}
		});
	}
	
	var showInfoBox = function(details)	{
		$(document).ready(function() {
			var uicss = GM_getResourceText('uicss');
			uicss = uicss.replace(/images/g, 'http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.10/themes/sunny/images');	
			GM_addStyle(uicss);			
					
			var $dialog = $('<div></div>');
			$dialog.attr('id', 'dialog');
			$dialog.dialog({
				autoOpen: true,
				modal: true,
				height:340,
				width:400,
				buttons: {
					"Install": function() {
						$( this ).dialog( "close" );
						document.location = 'http://userscripts.org/scripts/source/' + details['uso:script'] + '.user.js';
					},
					Cancel: function() {
						$( this ).dialog( "close" );
					}
				},
				title: 'New version ' + details.version + ' is available for ' + details.name
			});
			
			$dialog.html( buildWindowContent(details) );
			
			$("#dialog").dialog();
			
		} )	
	}
	
	var buildWindowContent = function(details)	{
		var $res = $('<span></span>');
		var $head = $('<h2></h2>');
		$head.append(details.description);
		$res.append($head);
		$res.append( $('<hr/>') );
		$res.append( 'History' );
		
		var $list = $('<ul></ul>');
		$list.css('text-align', 'left');
		var $ele = $('<li></li>');
		var i = j = 0;
		var parts;
		var hisList = {};
		for ( i = 0; i != details.history.length; i++ )	{			
			parts = details.history[i].split('\t');
			putDataToMap(hisList, parts[0], parts[1]);
		}		
		
		for ( hisKey in hisList )	{
			$list = $('<ul></ul>');
			$list.css('text-align', 'left');			
			$list.append(hisKey);
			for ( i = 0; i != hisList[hisKey].length; i++ )	{
				$ele = $('<li></li>');
				$ele.css('list-style-type', 'circle');
				$ele.css('list-style-position', 'inside');
				$ele.append( hisList[hisKey][i] );
				$list.append( $ele );
			}
			$res.append($list);
		}
		return $res;
	}
	
	var parseMetaData = function(metaData)	{
		var detailText = metaData.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
		var details = {};
		if (detailText)	{
			var detailLines = detailText[0].match(/@(.*?)(\n|\r)/g);
			var i = 0;
			var currentLine = key = value = '';
			for ( i = 0; i != detailLines.length; i++ )	{
				currentLine = detailLines[i].match(/^@([^\s]*?)\s+(.*)/);
				key = currentLine[1];
				value = currentLine[2];	
				putDataToMap(details, key, value);
				
			}
		}
		return details;
	}
	
	var putDataToMap = function(targetMap, key, value)	{
		// If we already have a simple valu with this key, replace the simple value with an array
		if (targetMap[key] && !(targetMap[key] instanceof Array)) {
			targetMap[key] = new Array(targetMap[key]);
		}
		
		if (targetMap[key] instanceof Array) {
			targetMap[key].push(value);
		}
		else {
			targetMap[key] = value;
		}
	}
	
}