// ==UserScript==
// @name AutoPRSFill
// @description This script automatically completes your UBS PRS timesheet
// @description Version - 1.0
// @description Author - Scott Rahner
// @include http://pslwpo01.nt.pwj.com/*
// ==/UserScript==


(function() {

	//array elements of the format [ project name, # of hours, row offset ]
	var projects = new Array(["Sample Project One",4,0], ["Sample Project Two",3,0], ["ISD STAFF - LUNCH",1,0]);

	if(document.location == 'http://pslwpo01.nt.pwj.com/PRS/poslogin.cfm'){

		window.addEventListener('submit', newsubmit, true);
		unsafeWindow.CheckLogin = newsubmit;

	}

	function newsubmit(event){

			var target = event ? event.target : this;
			var month;

			autoConfirm = confirm("Do you wish to fill out your Timesheet automatically?");

			GM_setValue('autoConfirm', autoConfirm);

			if(autoConfirm){
				month = prompt("Which month would you like to auto complete? (curr/last)");
			}

			startDate = new Date();
			startDate.setDate("1");

			if(month == 'last') {
					startDate.setMonth(startDate.getMonth() - 1);
			} 

			GM_setValue('startDate', (startDate.getMonth()+1)+"/"+startDate.getDate()+"/"+startDate.getFullYear());

			document.forms[0].submit();
	}

	if(GM_getValue('autoConfirm')){

		if(document.location == 'http://pslwpo01.nt.pwj.com/PRS/timesheet.cfm'){

			if(GM_getValue('startDate') != 'done'){

				timeSheetFormHead = document.forms.namedItem("frmTimeSheet");
				beginDateElement = timeSheetFormHead.elements.namedItem('period_begin');
				endDateElement = timeSheetFormHead.elements.namedItem('period_ending');

				beginDateElement.value = GM_getValue('startDate'); 
				startDate = new Date(beginDateElement.value);
				endDate = new Date();

				while( endDate > startDate ){

					endDateElement.selectedIndex -= 1;

					endDate = endDateElement.options[endDateElement.selectedIndex].value
					dateParts = endDate.split('-', 3);


					endDate = new Date();
					endDate.setMonth(dateParts[1]-1);
					endDate.setDate(dateParts[2].substr(0,2));
					endDate.setFullYear(dateParts[0]);

				}

				endDateElement.selectedIndex += 1;

				GM_setValue('startDate', 'done');

				timeSheetFormHead.submit();

			}else{

				timeSheetForm = document.forms.namedItem("frmTimeSheetAll");
				timeSheetFormHead = document.forms.namedItem("frmTimeSheet");

				beginDate = new Date(timeSheetFormHead.elements.namedItem('period_begin').value);

				beginDay = beginDate.getDay();

				for(h=0; h<projects.length; h++){
					yourProject = projects[h][0];
					hours = projects[h][1];
					offset = projects[h][2];
					projectQuery = (document.evaluate("//td[contains(.,'"+ yourProject +"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null));
					projectHeader = projectQuery.snapshotItem(projectQuery.snapshotLength - 1);
					projectElements = projectHeader.parentNode.parentNode.rows[projectHeader.parentNode.rowIndex + offset].childNodes;

					var elements = new Array();

					for( i = 0; i < projectElements.length; i++ ){
						temp = projectElements[i].childNodes;
						for( j = 0; j < temp.length; j++ )
							if(temp[j].name)
								elements.push(temp[j]);

					}

					for( x = (beginDay-4)%6; x < elements.length-1 && x < ((beginDay-4)%6)+5; x++ ){

					elements[x].value=hours;

					}
				}
				period_new = timeSheetFormHead.elements.namedItem("period_ending").value;
				timeSheetForm.action="timesheet_save.cfm?flag1=1&period_new=" + period_new;
				timeSheetForm.method = 'post';
				timeSheetForm.submit();
			}
		}


		if(document.location.search.indexOf('period_ending') > -1){

			timeSheetFormHead = document.forms.namedItem("frmTimeSheet");
			beginDateElement = timeSheetFormHead.elements.namedItem('period_begin');
			endDateElement = timeSheetFormHead.elements.namedItem('period_ending');
			beginDate = new Date(beginDateElement.value);
			splitEndDate = endDateElement.value.split('-', 3);

			if( splitEndDate[2].substr(0,2) < 28 ){

				beginDate.setDate(beginDate.getDate()+7);
				beginDateElement.value = (beginDate.getMonth()+1)+"/"+beginDate.getDate()+"/"+beginDate.getFullYear();
				endDateElement.selectedIndex += 1;
				timeSheetFormHead.submit();

			}
			else{
				unsafeWindow.MissingDates();
			}

		}

		if(document.location.pathname == '/PRS/Missing_Time_Entry.cfm'){

		GM_setValue('autoConfirm', false);
		unsafeWindow.Retrieve_OnClick('Missing_Time_Entry');

		}

	}else{}

})();
