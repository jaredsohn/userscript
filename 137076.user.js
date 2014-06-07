// ==UserScript==
// @name        FIX forecast tool
// @namespace   forecast fixer
// @include     http://forecast.realdecoy.com/Forecast.aspx
// @require     http://forecast.realdecoy.com/js/jquery-1.7.1.min.js
// @version     1
// ==/UserScript==



$("<style type='text/css'> .oddodd {background-color: lightblue;} </style>").appendTo("head");
$("<style type='text/css'> .oddeven {background-color: rgba(28, 166, 219, 0.1)} </style>").appendTo("head");
$("<style type='text/css'> .eveneven\n {\n background-color: white; \n} \n</style>").appendTo("head");
$("<style type='text/css'> .evenodd {background-color: lightgray;} </style>").appendTo("head");
$("<style type='text/css'> .first { border-top:thick double #000000; } </style>").appendTo("head");

$('#ctl00_content_ForecastView_ctl02_EmployeeDropDown').attr('onchange', '');

console.log(document.getElementById('ctl00_content_ForecastView_ctl02_EmployeeDropDown').onchange)

function paintRow( employeeName, TRrow )
{
		var first = '';
		if(employeeName != lastEmployee)
			{
					lastEmployee = employeeName;
					first = "first ";
					className = (className == 'odd' ? 'even' : 'odd');
					
			}
			row = (row == 'odd' ? 'even' : 'odd');
		paintRowhelper( employeeName, TRrow, first + className, row )
}
function paintRowhelper( employeeName, TRrow, employeeClass, rowClass )
{

	$(TRrow).removeClass().addClass(employeeClass+rowClass);
}

var names = new Object();
$('#ctl00_content_ForecastView_ctl02_EmployeeDropDown').change( fixRows );


function fixRows(){



var selectedName = $("#ctl00_content_ForecastView_ctl02_EmployeeDropDown option:selected").text();

names[selectedName] = true;

			window.lastEmployee = '';
			window.className = 'odd';
			window.row='odd';


$('#ctl00_content_ForecastView tbody tr')
    .hide()
    .filter(
        function()
		{
			//getNameOfemployee
			var employeeName = $(this).find('td:nth-child(6)').text().replace(/^\s*/,'').replace(/\s+$/,'');
			if( selectedName == 'All Employees' )//return everything no filtering required
			{
				paintRow( employeeName, this )
				names = new Array();
				return this;
			}

			
			for ( var name in names )
			{
					if ( name == employeeName )
					{
						paintRow( employeeName, this )
							first = "";
							//fix formatting
							$(this).find('td:nth-child(1)').css('width', '133px');
							$(this).find('td:nth-child(2)').css('width', '103px');
							$(this).find('td:nth-child(3)').css('width', '151px');
							$(this).find('td:nth-child(4)').css('width', '258px');
							$(this).find('td:nth-child(5)').css('width', '252px');
							$(this).find('td:nth-child(6)').css('width', '197px');

							for (var i=7; i<18; i++)
							{
								$(this).find('td:nth-child('+i+')').css('width', '52px');
							}
							//end fid formatting
					
							return this;
					}
			}

        })
    .show();



}
fixRows();


