// ==UserScript==
// @name                IRCTC Ticket Booking Automation
// @description Book tickets without using the keyboard. Automates the Booking, Quick booking, Passenger details page.
// @namespace   IRCTC
// @include             http://*irctc.co.in/*
// @include             https://*irctc.co.in/*
// @version     1.1
// @author              Varunkumar Nagarajan. Thanks to Sharath and Nitin Kishen for the older(beta) versions
// ==/UserScript==

//================Settings================================
var defaultUsername = GM_getValue("defaultUsername", '');
var defaultPassword = GM_getValue("defaultPassword", '');
var defaultFromStation = GM_getValue("defaultFromStation", '');
var defaultToStation = GM_getValue("defaultToStation", '');
var defaultTrainNo = GM_getValue("defaultTrainNo", '2759');
var defaultTicketType = GM_getValue("defaultTicketType","eticket");
var defaultClass = GM_getValue("defaultClass","SL");
var defaultAvailDays = GM_getValue("defaultAvailDays","3");
var blockAds = GM_getValue("blockAds", true );
var autoLogin = GM_getValue("autoLogin", true );
var isFirstRun = GM_getValue("firstRun", true );

var keepAlive = GM_getValue("keepAlive", true);
var refreshInterval = GM_getValue("refreshInterval", 2 * 60 * 1000);
var captchaSource = "75X56X56X30X6eX69X64X39X69X51X33X49X3dX";
var captchaImage = "D44062V";
var passengerCount = 6;

//Remove the idiotic "Sorry, you do not have permission to right click." message on right click 
with (document.wrappedJSObject || document)
{
        onmouseup = null;
        onmousedown = null;
        oncontextmenu = null;
}

// Add jQuery for easy Javascripting :)
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


GM_wait();
var jQ = {};
function GM_wait()
{
        if(typeof unsafeWindow.jQuery == 'undefined')
        {
                window.setTimeout(GM_wait,100);
        }
        else
        {
                jQ = unsafeWindow.jQuery.noConflict(true);
                startAddingInfo();
                
                if (keepAlive) {
                        var now = new Date();
                        if (now.getHours() == 7 && now.getMinutes() >= 30) {
                                window.setTimeout(GM_keepAlive, refreshInterval);
                        } else {
                                var stTime = new Date();
                                stTime.setHours(7);
                                stTime.setMinutes(30);
                                if (now.getTime() > stTime.getTime()) {
                                        // Time has already crossed 7:30. Schedule it for the next morning (if the session is still alive ;) ).
                                        stTime = new Date(stTime.getTime() + (24 * 60 * 60 * 1000));
                                        stTime.setHours(7);
                                        stTime.setMinutes(30);
                                } 
                                window.setTimeout(GM_keepAlive, stTime.getTime() - now.getTime());
                        }
                }
        }
}

function GM_keepAlive() {
        var quickBookURL = jQ("a[href*='quickBook']")[0].href;
        window.location = quickBookURL;
        window.setTimeout(GM_keepAlive, refreshInterval);
}

function startAddingInfo()
{
        //Remove the annoying Ad banners
        if( blockAds )
        {
                jQ("img[src*=banner]").remove();
                jQ("iframe[src*=banner]").remove();
        }       
        
        
        //Add Swap stations link.
        var swapLink = jQ("<a href='#' style='font-size:15px; font-weight:bold; color:#0066BB; margin-left:10px;'>&larr;Swap&rarr;</a>");
        swapLink.click( function()
        {
                var fromStnInput = jQ("input[name='stationFrom']");
                var toStnInput = jQ("input[name='stationTo']");
                var tmp = fromStnInput.val();
                fromStnInput.val( toStnInput.val() );
                toStnInput.val( tmp );
                return false;
        });     
        var fromStnInput = jQ("input[name='stationFrom']");
        fromStnInput.parents("td:first").append( swapLink);
        
        

        //Make 'Train Reservation' link point to 'Plan My Travel' page.
        //jQ("a[href*='helpandinfo.html']").attr("href", jQ("a:contains('Plan')").attr("href") ).removeAttr("target");  
        
        //Auto-login if username and password is given
        if( jQ("input[value='Login']").length && defaultUsername.length && defaultPassword.length  )
        {
                jQ("input[name='userName']").val(defaultUsername);
                jQ("input[name='password']").val(defaultPassword);
                if( autoLogin )
                {
                        jQ("input[name='submit']").click();
                }
        }
        
        
        if( document.location.href.match('planner.do') || document.location.href.match('quickBook.do') )
        {
                loadDefaultSettings();

                if( isFirstRun )//Show the settings form for user to set if its a first run.
                {
                        IRCTCSettings();
                }               
        }
        
        if ( document.location.href.match('planner.do') )
        {               
                //Get the availability status of each train
                showAvailStatus();
                /*ToDo: Ajaxify the results for given form input.
                jQ("input[name='Submit']").click( function()
                {
                        jQ.post( jQ("form[name='BookTicketForm']").attr("action"), jQ("form[name='BookTicketForm']").serialize(), function(data)
                        {
                                alert(data ) ;
                        
                        });                     
                        return false;           
                });
                */              
        }
        
        if (document.location.href.match('bookticket.do')) {
                loadDefaultPassengerSettings();
        }
        
        if( jQ("td:contains('Your Session has Expired')").length )
        {       
                document.location.href = 'http://www.irctc.co.in';
        }
        else //If the re-enter password nag screen comes, here we re-enter :)
        if( jQ("td:contains('Re-enter Password')").length && defaultPassword.length )
        {
                jQ("input[name='password']").val(defaultPassword);
                if( autoLogin )
                {       
                        jQ("input[name='Submit']").click();
                }
                
        }

}

function showAvailStatus()
{
        var bv_SessionIDValue = getURLParameter('BV_SessionID');
        var bv_EngineIDValue = getURLParameter('BV_EngineID');


        var trainTable = jQ(".TrainBackGround").eq(0).find("table:last");       
        // Holds the train numbers in an array
        var trainNoArr = Array();       
        
        var row = 0;    
        if( trainTable.find("tr").length ==0 )
        return;
        trainTable.find("tr").each( function()
        {       
                if( row != 0)//ignore first row (header).
                {
                        trainNoArr[row-1] = jQ(this).children("td").eq(2).find("div").eq(0).html().trim();
                }
                row++;
        });
        
        var headerRow = jQ(trainTable).find("tr:first");
        jQ(headerRow).children("td:last").attr("colspan", "7");//fix the silly excess colspan for last column.
        newColumnHeader = document.createElement("td");
        newColumnHeader.className = 'boldEleven';
        //Append the Status text to the td
        jQ(newColumnHeader).text("Status");     
        //Append the status td to the tr.
        jQ(headerRow).append( newColumnHeader);
        
        // Get the Date
        var date = jQ("input[name='JDate1']").val();            
        var hdnMonth = date.split('/')[1];// Get the month      
        var hdnDay = date.split('/')[0];// Get the Date 
        var hdnYear = date.split('/')[2];// Get the year
        
        // Get the class code
        var hdnClasscode = jQ("select[name='classCode']").find("option:selected").val();
        
        var fromStation;
        var fromStationCode;    
        var toStation;
        var toStationCode;
        
        // Get the Quota information.   
        var quota =  jQ("input[name='quota']").val();   
        
        var i =0;       
        trainTable.find("tr").each( function()
        {

                if( i++ != 0 )//ignore first row (header).
                {
                        var onclickAttr = jQ(this).children("td").eq(1).find("div:first").html();
                        var startIndex = onclickAttr.indexOf('(') +1;
                        var endIndex = onclickAttr.indexOf(')');
                        var onClickArg = onclickAttr.substring(startIndex,endIndex);
                        var splitter =  onClickArg.split(',');
                        
                        // Get the From station
                        fromStation = splitter[splitter.length-2];
                        fromStationCode = fromStation.substring(1,fromStation.length-1);

                        // Get the To Station
                        toStation = splitter[splitter.length-1];
                        toStationCode = toStation.substring(1,toStation.length-1);

                        // Get the train number
                        var hdnTrnNo = trainNoArr[i-2];                                                 
                        
                        ////// AJAX for ticket availabilty /////                        
                        var url = "/cgi-bin/bv60.dll/irctc/enquiry/avail.do";
                        var getParams = {'BV_SessionID':bv_SessionIDValue,
                                'BV_EngineID':bv_EngineIDValue ,
                                'trainToStation': true,
                                'availabilityPop': true,
                                'hdnTrnNo':hdnTrnNo,
                                'hdnDay':hdnDay,
                                'hdnMonth':hdnMonth,
                                'hdnYear':hdnYear,
                                'hdnClasscode':hdnClasscode,
                                'fromStation':fromStationCode,
                                'toStation':toStationCode,
                                'hdnQuota':quota
                        };
                        
                        var busyIcon = document.createElement("td");
                        jQ(busyIcon).addClass("autocomplete_text_busy");                        
                        jQ(this).append(busyIcon);
                        

                        var thisRow = this;
                        jQ.get(url, getParams, function(data)
                        {
                                /*
                                var availResultTd = jQ(data).find("td:contains('Status'):last").parent().next().find("td").eq(2);                               
                                availResultTd.removeAttr("width");                              
                                jQ(thisRow).children(".autocomplete_text_busy").remove();
                                jQ(thisRow).append(availResultTd);                              
                                */
                                if( data.length == 0)
                                {
                                        jQ(thisRow).children(".autocomplete_text_busy").removeClass().addClass("boldFourteen").html("Error");                           
                                }
                                else
                                {
                                        var availResultRow = jQ(data).find("td:contains('Status'):last").parent();
                                        var statusHtml = "";
                                        var i = 1; 
                                        while( i++ <= defaultAvailDays )
                                        {
                                                availResultRow = availResultRow.next();
                                                var availDate = availResultRow.find("td").eq(1).html().split("-");
                                                if( jQ.trim(availDate[0]).length == 1 )//Make single digit date to pad with zero (for alignment).
                                                {
                                                        availDate[0] = "0" + jQ.trim(availDate[0]);
                                                }
                                                statusHtml = statusHtml + availDate[0] + "-" + jQ.trim(availDate[1]) + ":" + availResultRow.find("td").eq(2).html() + "<br/>";

                                        }
                                        jQ(thisRow).children(".autocomplete_text_busy").removeClass().addClass("boldFourteen").html(statusHtml).css("width", "150px");
                                }
                                //jQ(thisRow).append(availResultTd);                                                            
                        });                                             
                        
                }
                
        });
        
}

function IRCTCSettings()
{
        mySpan=document.createElement('span');
        mySpan.id='settingsSpan';               
        document.body.appendChild(mySpan);
        mySpan.setAttribute("style", "position:fixed; width:100%; height: 100%; z-index:101; left: 0; top: 0; background-color: #444; opacity:.75; display:none;");                     
        var myDiv = document.createElement('div');
        myDiv.id = 'settingsDiv';

        myDiv.setAttribute("style","position:fixed; width:650px; height: 650px; z-index: 102; background-color: #D9E6F7; border:8px solid #C1D9FF; text-align:center; display:none;font-family:verdana;font-weight:bold;-moz-border-radius: 10px;-webkit-border-radius: 10px;");
        document.body.appendChild(myDiv);
        myDiv.innerHTML="<span style='font-size:18px; color:#444; line-height:35px;'>IRCTC Ticket Booking Automation</span><br/><br/>\
        <div style='padding-left:55px; font-size:10pt;line-height:22px;height:550px;'>\
                <form name='defSettingsForm' id='defSettingsForm'>\
                <div id='innerDiv1' style='float:left;text-align:left; background:#fff;color:#000;padding:16px; width:510px; height:520px;-moz-border-radius: 5px;-webkit-border-radius: 5px;'>\
                <h4 style='background:#E0EDFE; color:#000;-moz-border-radius: 3px;-webkit-border-radius: 3px; padding-left:5px;'>Set Default Settings Here:</h4>\
                <label style='display:inline-block; width:80px; height:30px;'>Username:</label>\
                <input type='text' name='defUsername' id='defUsername'><br/>\
                <label style='display:inline-block; width:80px; height:30px;'>Password:</label>\
                <input type='password' name='defPassword' id='defPassword'><br/>\
                <label style='display:inline-block; width:80px; height:30px;'>From:</label>\
                <input type='text' name='defFromStn' id='defFromStn'>\
                <img id='fetchFromStation' src='/Images/station_code.gif' style='vertical-align: middle;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                <label style='display:inline-block; width:35px; height:30px;'>To:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                <input type='text' name='defToStn' id='defToStn'>\
                <img id='fetchToStation' src='/Images/station_code.gif' style='vertical-align: middle;'><br/>\
                <label style='display:inline-block; width:80px; height:30px;'>Class:</label>\
                <select name='classCode' id='defClass'>\
                        <option value='SL' id='SL'>Sleeper Class(SL)</option>\
                        <option value='1A' id='1A'>First Class AC(1A)</option>\
                        <option value='FC' id='FC'>First Class(FC)</option>\
                        <option value='2A' id='2A'>AC 2-tier sleeper(2A)</option>\
                        <option value='3A' id='3A'>AC 3 Tier(3A)</option>\
                        <option value='CC' id='CC'>AC chair Car(CC)</option>\
                        <option value='2S' id='2S'>Second Sitting(2S)</option>\
                        <option value='3E' id='3E'>AC 3 Tier Economy(3E)</option>\
                </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                <label style='display:inline-block; width:90px; height:30px;'>Train No:</label>\
                <input type='text' name='defTrainNo' id='defTrainNo'><br/>\
                <label style='display:inline-block; width:180px; height:30px;'>Show Avilability Days:</label>\
                <select name='defAvailDays' id='defAvailDays'>\
                        <option value='1' id='availDays1'>1</option>\
                        <option value='2' id='availDays2'>2</option>\
                        <option value='3' id='availDays3'>3</option>\
                        <option value='4' id='availDays4'>4</option>\
                        <option value='5' id='availDays5'>5</option>\
                        <option value='6' id='availDays6'>6</option>\
                </select><br/>\
                <label style='display:inline-block; width:95px; height:30px;'>Ticket Type:</label> <input type='radio' name='defTicketType' id='eticketRadio' value='eticket'>e-ticket <input type='radio' name='defTicketType' id='iticketRadio' value='iticket'>i-ticket<br/>\
                <input type='checkbox' name='blockAdsEnable' id='blockAdsEnable' /><label>Remove Ads</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
                <input type='checkbox' name='autologinEnable' id='autologinEnable'/><label>Login/Relogin automatically</label><br/>\
                <input type='checkbox' name='keepAliveEnable' id='keepAliveEnable' /><label>Keep Alive (the session between 07:30 to 08:00 for Tatkal booking)</label><br/>\
                <h4 style='background:#E0EDFE; color:#000;-moz-border-radius: 3px;-webkit-border-radius: 3px; padding-left:5px;'>Set Passenger Details Here:</h4>\
                <table width='500' cellspacing='1' cellpadding='0' border='0' bgcolor='#ffffff'>  <tbody>    <tr>      <td width='8%' height='23' class='boldEleven'>        <div align='center'>SNo        </div>      </td>      <td width='16%' height='23' class='boldEleven'>        <div align='center'>Name        </div>      </td>      <td width='7%' height='23' class='boldEleven'>        <div align='center'>Age        </div>      </td>      <td width='13%' height='23' class='boldEleven'>        <div align='center'>Sex        </div>      </td>      <td width='18%' height='23' class='boldEleven'>        <div align='center'>Berth Preference        </div>      </td>      </tr>    <tr>      <td width='8%' height='26' class='boldFourteen'>        <div align='center'>1        </div>      </td>      <td width='16%' height='26'>        <div align='center'>          <input type='text' class='formText135' value='' size='22' maxlength='16' id='spassengers[0].passengerName'>        </div>      </td>      <td width='7%' height='26'>        <div align='center'>          <input type='text' class='formText135'  value='' size='3' maxlength='3' id='spassengers[0].passengerAge'>        </div>      </td>      <td width='13%' height='26'>        <div align='center'>          <select class='formText135'  id='spassengers[0].passengerSex'>            <option selected='' value=''>Select            </option>            <option value='m'>Male            </option>            <option value='f'>Female            </option>          </select>        </div>      </td>      <td width='18%' height='26'>         <div align='center'>          <select class='formText135'  id='spassengers[0].berthPreffer'>            <option selected='' value=''>Choose Berth            </option>            <option value='Lower'>Lower            </option>            <option value='Middle'>Middle            </option>            <option value='Upper'>Upper            </option>            <option value='Side_Upper'>Side upper            </option>            <option value='Side_Lower'>Side lower            </option>          </select>        </div>      </td>    </tr>    <tr>      <td width='8%' height='26' class='boldFourteen'>        <div align='center'>2        </div>      </td>      <td width='16%' height='26'>        <div align='center'>          <input type='text' class='formText135' value='' size='22' maxlength='16' id='spassengers[1].passengerName'>        </div>      </td>      <td width='7%' height='26'>        <div align='center'>          <input type='text' class='formText135'  value='' size='3' maxlength='3' id='spassengers[1].passengerAge'>        </div>      </td>      <td width='13%' height='26'>        <div align='center'>          <select class='formText135'  id='spassengers[1].passengerSex'>            <option selected='' value=''>Select            </option>            <option value='m'>Male            </option>            <option value='f'>Female            </option>          </select>        </div>      </td>      <td width='18%' height='26'>         <div align='center'>          <select class='formText135'  id='spassengers[1].berthPreffer'>            <option selected='' value=''>Choose Berth            </option>            <option value='Lower'>Lower            </option>            <option value='Middle'>Middle            </option>            <option value='Upper'>Upper            </option>            <option value='Side_Upper'>Side upper            </option>            <option value='Side_Lower'>Side lower            </option>          </select>        </div>      </td>    </tr>    <tr>      <td width='8%' height='26' class='boldFourteen'>        <div align='center'>3        </div>      </td>      <td width='16%' height='26'>        <div align='center'>          <input type='text' class='formText135' value='' size='22' maxlength='16' id='spassengers[2].passengerName'>        </div>      </td>      <td width='7%' height='26'>        <div align='center'>          <input type='text' class='formText135'  value='' size='3' maxlength='3' id='spassengers[2].passengerAge'>        </div>      </td>      <td width='13%' height='26'>        <div align='center'>          <select class='formText135'  id='spassengers[2].passengerSex'>            <option selected='' value=''>Select            </option>            <option value='m'>Male            </option>            <option value='f'>Female            </option>          </select>        </div>      </td>      <td width='18%' height='26'>         <div align='center'>          <select class='formText135'  id='spassengers[2].berthPreffer'>            <option selected='' value=''>Choose Berth            </option>            <option value='Lower'>Lower            </option>            <option value='Middle'>Middle            </option>            <option value='Upper'>Upper            </option>            <option value='Side_Upper'>Side upper            </option>            <option value='Side_Lower'>Side lower            </option>          </select>        </div>      </td>    </tr>    <tr>      <td width='8%' height='26' class='boldFourteen'>        <div align='center'>4        </div>      </td>      <td width='16%' height='26'>        <div align='center'>          <input type='text' class='formText135' value='' size='22' maxlength='16' id='spassengers[3].passengerName'>        </div>      </td>      <td width='7%' height='26'>        <div align='center'>          <input type='text' class='formText135'  value='' size='3' maxlength='3' id='spassengers[3].passengerAge'>        </div>      </td>      <td width='13%' height='26'>        <div align='center'>          <select class='formText135'  id='spassengers[3].passengerSex'>            <option selected='' value=''>Select            </option>            <option value='m'>Male            </option>            <option value='f'>Female            </option>          </select>        </div>      </td>      <td width='18%' height='26'>         <div align='center'>          <select class='formText135'  id='spassengers[3].berthPreffer'>            <option selected='' value=''>Choose Berth            </option>            <option value='Lower'>Lower            </option>            <option value='Middle'>Middle            </option>            <option value='Upper'>Upper            </option>            <option value='Side_Upper'>Side upper            </option>            <option value='Side_Lower'>Side lower            </option>          </select>        </div>      </td>    </tr>    <tr>      <td width='8%' height='26' class='boldFourteen'>        <div align='center'>5        </div>      </td>      <td width='16%' height='26'>        <div align='center'>          <input type='text' class='formText135' value='' size='22' maxlength='16' id='spassengers[4].passengerName'>        </div>      </td>      <td width='7%' height='26'>        <div align='center'>          <input type='text' class='formText135'  value='' size='3' maxlength='3' id='spassengers[4].passengerAge'>        </div>      </td>      <td width='13%' height='26'>        <div align='center'>          <select class='formText135'  id='spassengers[4].passengerSex'>            <option selected='' value=''>Select            </option>            <option value='m'>Male            </option>            <option value='f'>Female            </option>          </select>        </div>      </td>      <td width='18%' height='26'>         <div align='center'>          <select class='formText135'  id='spassengers[4].berthPreffer'>            <option selected='' value=''>Choose Berth            </option>            <option value='Lower'>Lower            </option>            <option value='Middle'>Middle            </option>            <option value='Upper'>Upper            </option>            <option value='Side_Upper'>Side upper            </option>            <option value='Side_Lower'>Side lower            </option>          </select>        </div>      </td>    </tr>    <tr>      <td width='8%' height='26' class='boldFourteen'>        <div align='center'>6        </div>      </td>      <td width='16%' height='26'>        <div align='center'>          <input type='text' class='formText135' value='' size='22' maxlength='16' id='spassengers[5].passengerName'>        </div>      </td>      <td width='7%' height='26'>        <div align='center'>          <input type='text' class='formText135'  value='' size='3' maxlength='3' id='spassengers[5].passengerAge'>        </div>      </td>      <td width='13%' height='26'>        <div align='center'>          <select class='formText135'  id='spassengers[5].passengerSex'>            <option selected='' value=''>Select            </option>            <option value='m'>Male            </option>            <option value='f'>Female            </option>          </select>        </div>      </td>      <td width='18%' height='26'>         <div align='center'>          <select class='formText135'  id='spassengers[5].berthPreffer'>            <option selected='' value=''>Choose Berth            </option>            <option value='Lower'>Lower            </option>            <option value='Middle'>Middle            </option>            <option value='Upper'>Upper            </option>            <option value='Side_Upper'>Side upper            </option>            <option value='Side_Lower'>Side lower            </option>          </select>        </div>      </td>    </tr>  </tbody></table>\
                </div>\
                </form>\
                </div>\
        <div style='text-align:center; padding-top:12px;'><input type='button' id='cancelBtn' value='Cancel'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='saveSettings' value='Save and Exit'></div>\
        ";
        jQ('#settingsSpan').show();
        jQ('#settingsDiv').css('top', parseInt( (jQ(window).height() - jQ('#settingsDiv').height() ) / 2) )
                .css('left', parseInt( (jQ(window).width() - jQ('#settingsDiv').width() ) / 2) )
                .show();
                
        /*var url = "";
        jQ.get(url, null, function(data)
        {
                if( data.length == 0)
                {
                        jQ("#spnPassenger").html("Error");
                }
                else
                {
                        jQ("#spnPassenger").html(data);
                }
        });*/
        
        setTimeout( getDefaultsToSettingsForm, 0);
        
        jQ('#fetchFromStation').click( function()
        {               
                var bv_SessionIDValue = getURLParameter('BV_SessionID');
                var bv_EngineIDValue = getURLParameter('BV_EngineID');
                var stationCode = jQ("#defFromStn" ).val()
                window.open("../enquiry/stationnames.do?BV_SessionID="+bv_SessionIDValue+"&BV_EngineID="+bv_EngineIDValue+"&stnName="+escape(stationCode)+"&formName=defSettingsForm&fieldName=defFromStn&leftWidth=0","","dependent=yes,width=350,height=375,screenX=200,screenY=300,titlebar=no,scrollbars=auto,maximize=no");
        });

        jQ('#fetchToStation').click( function()
        {               
                var bv_SessionIDValue = getURLParameter('BV_SessionID');
                var bv_EngineIDValue = getURLParameter('BV_EngineID');
                var stationCode = jQ("#defToStn" ).val()
                window.open("../enquiry/stationnames.do?BV_SessionID="+bv_SessionIDValue+"&BV_EngineID="+bv_EngineIDValue+"&stnName="+escape(stationCode)+"&formName=defSettingsForm&fieldName=defToStn&leftWidth=0","","dependent=yes,width=350,height=375,screenX=200,screenY=300,titlebar=no,scrollbars=auto,maximize=no");
        });

        jQ('#saveSettings')[0].addEventListener('click',function()
        {
                GM_setValue("defaultUsername", document.getElementById('defUsername').value );
                GM_setValue("defaultPassword", document.getElementById('defPassword').value );
                GM_setValue("defaultFromStation", document.getElementById('defFromStn').value );
                GM_setValue("defaultToStation", document.getElementById('defToStn').value );
                GM_setValue("defaultTrainNo", document.getElementById('defTrainNo').value );
                GM_setValue("defaultClass", document.getElementById('defClass').value );                
                GM_setValue("defaultAvailDays", document.getElementById('defAvailDays').value );
                
                if( document.getElementById('eticketRadio').checked )
                {
                        GM_setValue("defaultTicketType", document.getElementById('eticketRadio').value );
                }
                else
                if( document.getElementById('iticketRadio').checked )
                {
                        GM_setValue("defaultTicketType", document.getElementById('iticketRadio').value );
                }
                
                
                if( document.getElementById("blockAdsEnable").checked )
                {
                        GM_setValue("blockAds", true );
                }
                else
                {
                        GM_setValue("blockAds", false );
                }
                
                if( document.getElementById("autologinEnable").checked )
                {
                        GM_setValue("autoLogin", true );
                }
                else
                {
                        GM_setValue("autoLogin", false );                       
                }

                if( document.getElementById("keepAliveEnable").checked )
                {
                        GM_setValue("keepAlive", true );
                }
                else
                {
                        GM_setValue("keepAlive", false );
                }
                
                // get the passenger details
                for (var i = 0; i < passengerCount; i++) {
                        GM_setValue("passengers[" + i + "].passengerName", document.getElementById("spassengers[" + i + "].passengerName").value);
                        GM_setValue("passengers[" + i + "].passengerAge", document.getElementById("spassengers[" + i + "].passengerAge").value);
                        
                        var sexMap = {m: 'Male', f: 'Female', s: 'Select'};
                        var val = document.getElementById("spassengers[" + i + "].passengerSex").value;
                        if (val == null || val == '')
                                val = 's';
                        GM_setValue("passengers[" + i + "].passengerSex", sexMap[val]);
                        
                        var berthMap = {s: 'Choose Berth', Lower: 'Lower', Middle: 'Middle', Upper: 'Upper', Side_Upper: 'Side upper', Side_Lower: 'Side lower'};
                        val = document.getElementById("spassengers[" + i + "].berthPreffer").value;
                        if (val == null || val == '')
                                val = 's';
                        GM_setValue("passengers[" + i + "].berthPreffer", berthMap[val]);
                }
                
                GM_setValue("firstRun", false );
                jQ("#settingsSpan").remove();
                jQ("#settingsDiv").remove();                    
        }, false);
        
        jQ('#cancelBtn')[0].addEventListener('click',function()
        {
                GM_setValue("firstRun", false );
                jQ("#settingsSpan").remove();
                jQ("#settingsDiv").remove();

        }, false);              
        
        
        
}

function getURLParameter(name)
{
        return unescape(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
}

function getDefaultsToSettingsForm()
{
        //Enable Autocomplete on from and to stations.
        document.location.href="javascript:xmlhttpPost(document.getElementById('defFromStn'));xmlhttpPost(document.getElementById('defToStn'));";

        document.getElementById("defUsername").value = GM_getValue("defaultUsername", '' );
        document.getElementById("defPassword").value = GM_getValue("defaultPassword", '' );             
        document.getElementById("defFromStn").value = GM_getValue("defaultFromStation", '' );           
        document.getElementById("defToStn").value = GM_getValue("defaultToStation", '' );
        document.getElementById("defTrainNo").value = GM_getValue("defaultTrainNo", '');

        if( GM_getValue("defaultTicketType","eticket") == "iticket"     )
        {
                document.getElementById('iticketRadio').checked = true;
        }
        else
        if( GM_getValue("defaultTicketType","eticket") == "eticket"     )
        {
                document.getElementById('eticketRadio').checked = true;
        }
        
        document.getElementById( GM_getValue("defaultClass","SL") ).selected = true;
        
        document.getElementById( "availDays" + GM_getValue("defaultAvailDays","3") ).selected = true;   
        
        if( GM_getValue("blockAds", true ) )
        {
                document.getElementById("blockAdsEnable").checked = true;
        }
        
        if( GM_getValue("autoLogin", true  ) )
        {
                document.getElementById("autologinEnable").checked = true;              
        }       
        
        if( GM_getValue("keepAlive", true ) )
        {
                document.getElementById("keepAliveEnable").checked = true;
        }
        
        // Passenger details
        for (var i = 0; i < passengerCount; i++) {
                // get the passenger details
                for (var i = 0; i < passengerCount; i++) {
                        document.getElementById("spassengers[" + i + "].passengerName").value = GM_getValue("passengers[" + i + "].passengerName", '');
                        document.getElementById("spassengers[" + i + "].passengerAge").value = GM_getValue("passengers[" + i + "].passengerAge", '');
                        jQ("select[id='spassengers[" + i + "].passengerSex'] option:contains(" + GM_getValue("passengers[" + i + "].passengerSex", 'Select') + ")").attr("selected", true);
                        jQ("select[id='spassengers[" + i + "].berthPreffer'] option:contains(" + GM_getValue("passengers[" + i + "].berthPreffer", 'Choose Berth') + ")").attr("selected", true);
                }
        }
}

function loadDefaultSettings() //Load default settings given to the search input form.
{
        var settingsLink = jQ( document.createElement('a') );
        settingsLink.attr("href", "javascript:;");
        settingsLink.text("IRCTC Ticket Booking Automation Settings");
        settingsLink.css({'color':'#f2ff22', 'font-weight':'bold', 'padding':'3px', 'text-decoration':'underline'});
        settingsLink.click(IRCTCSettings);              
        jQ("td:contains('Mandatory'):last").html("").append(settingsLink);

        //Set default values according to user settings.
        /*if(jQ("input[name='ticketType']:checked").length == 0)//Select default ticket type.
        {
                jQ("input[value='"+defaultTicketType+"']").click();
        }*/
        jQ("input[value='"+defaultTicketType+"']").click();
        
        if( jQ("select[name='classCode'] option:selected").val() == "")
        {
                jQ("select[name='classCode'] option:contains("+defaultClass+")").attr("selected", true);//Select default class
        }
        
        if( jQ("input[name='stationFrom']").val() == "" || jQ("input[name='stationFrom']").val().match('Enter') )
        {
                jQ("input[name='stationFrom']").val(defaultFromStation);
        }

        if( jQ("input[name='stationTo']").val() == "" || jQ("input[name='stationTo']").val().match('Enter') )   
        {       
                jQ("input[name='stationTo']").val(defaultToStation);    
        }
        
        if (document.location.href.match('quickBook.do')) {
                loadDefaultPassengerSettings();
                jQ("input[name='boardPoint']").val(defaultFromStation);
                jQ("input[name='trainNo']").val(defaultTrainNo);
                
                window.setTimeout(showQuickBookAvailability, 2 * 1000);
                
        }
}

function showQuickBookAvailability() {
        var bv_SessionIDValue = getURLParameter('BV_SessionID');
        var bv_EngineIDValue = getURLParameter('BV_EngineID');
        
        // Getting the station code
        var fromStationCode = jQ("input[name='stationFrom']").val();
        if(fromStationCode.indexOf("(")>0)
                fromStationCode = fromStationCode.substring(fromStationCode.indexOf("(")+1,fromStationCode.indexOf(")")); 
        var toStationCode = jQ("input[name='stationTo']").val();
        if(toStationCode.indexOf("(")>0)
                toStationCode = toStationCode.substring(toStationCode.indexOf("(")+1,toStationCode.indexOf(")")); 
        
        // Get the Date
        var date = jQ("input[name='JDate1']").val();            
        var hdnMonth = date.split('/')[1];// Get the month      
        var hdnDay = date.split('/')[0];// Get the Date 
        var hdnYear = date.split('/')[2];// Get the year
        
        var hdnTrnNo = jQ("input[name='trainNo']").val();
        var hdnClasscode = jQ("select[name='classCode'] option:selected").val();
        var hdnQuota = jQ("input[name='quota']").val();
        
        ////// AJAX for ticket availabilty /////                        
        var url = "/cgi-bin/bv60.dll/irctc/enquiry/avail.do";
        var getParams = {'BV_SessionID':bv_SessionIDValue,
                'BV_EngineID':bv_EngineIDValue ,
                'trainToStation': true,
                'availabilityPop': true,
                'hdnTrnNo':hdnTrnNo,
                'hdnDay':hdnDay,
                'hdnMonth':hdnMonth,
                'hdnYear':hdnYear,
                'hdnClasscode':hdnClasscode,
                'fromStation':fromStationCode,
                'toStation':toStationCode,
                'hdnQuota':hdnQuota
        };
        
        var busyIcon = document.createElement('span');
        busyIcon.id = 'busyIcon';
        document.body.appendChild(busyIcon);
        busyIcon.setAttribute("style", "position:absolute; width:150; height: 40; left: 100; top: 310; border: 2px solid #C1D9FF;");                    
        busyIcon.setAttribute("class", "autocomplete_text_busy");
        jQ('#busyIcon').css('left', parseInt( (jQ(window).width() - jQ('#busyIcon').width() ) / 2 + 250)).show();               
        
        jQ.get(url, getParams, function(data)
        {
                if( data.length == 0)
                {
                        jQ("#busyIcon").removeClass().addClass("boldFourteen").html("Error");
                }
                else
                {
                        var availResultRow = jQ(data).find("td:contains('Status'):last").parent();
                        var statusHtml = "";
                        var i = 1; 
                        while( i++ <= defaultAvailDays )
                        {
                                availResultRow = availResultRow.next();
                                var availDate = availResultRow.find("td").eq(1).html().split("-");
                                if( jQ.trim(availDate[0]).length == 1 )//Make single digit date to pad with zero (for alignment).
                                {
                                        availDate[0] = "0" + jQ.trim(availDate[0]);
                                }
                                statusHtml = statusHtml + availDate[0] + "-" + jQ.trim(availDate[1]) + ":" + availResultRow.find("td").eq(2).html() + "<br/>";

                        }
                        jQ("#busyIcon").removeClass().addClass("boldFourteen").html(statusHtml).css("width", "150px");
                }
        });
        
        
        /*window.open("../enquiry/avail.do?BV_SessionID=@@@@1974207299.1282168940@@@@&BV_EngineID=ccceadelfdkihdkcefecehidfgmdfhm.0&QuickNav=true&trainToStation=true&availabilityPop=true&hdnTrnNo="+document.forms[0].trainNo.value+"&hdnDay="+document.forms[0].day.value+"&hdnMonth="+document.forms[0].month.value+"&hdnYear="+document.forms[0].year.value+"&hdnClasscode="+document.forms[0].classCode.value+"&fromStation="+sf+"&toStation="+st+"&hdnQuota="+document.forms[0].qt.value+"&leftWidth=0","","dependent=yes,width=500,height=375,screenX=200,screenY=300,titlebar=no,scrollbars=yes,maximize=no");*/
}

function loadDefaultPassengerSettings() {
        // Entering the passenger details
        for (var i = 0; i < passengerCount; i++) {
                if (jQ("input[name='passengers[" + i + "].passengerName']").val() == "") {
                        jQ("input[name='passengers[" + i + "].passengerName']").val(GM_getValue("passengers[" + i + "].passengerName", ''));
                }
                
                if (jQ("input[name='passengers[" + i + "].passengerAge']").val() == "") {
                        jQ("input[name='passengers[" + i + "].passengerAge']").val(GM_getValue("passengers[" + i + "].passengerAge", ''));
                }
                
                if( jQ("select[name='passengers[" + i + "].passengerSex'] option:selected").val() == "")
                {
                        jQ("select[name='passengers[" + i + "].passengerSex'] option:contains(" + GM_getValue("passengers[" + i + "].passengerSex", 'Select') + ")").attr("selected", true);
                }
                
                if( jQ("select[name='passengers[" + i + "].berthPreffer'] option:selected").val() == "")
                {
                        jQ("select[name='passengers[" + i + "].berthPreffer'] option:contains(" + GM_getValue("passengers[" + i + "].berthPreffer", 'Choose Berth') + ")").attr("selected", true);
                }
        }
        
        // Breaking the Captcha
        //jQ("input[name='captchaImage']").val(captchaImage);
        
        jQ("input[name='Submit']").click(function() {
                //jQ("img[src*='../recaptcha/articleGenImg.jsp?imageText=']").attr("src", "../recaptcha/articleGenImg.jsp?imageText=" + captchaSource);
                //jQ("input[name='imgPath']").val("../recaptcha/articleGenImg.jsp?imageText=" + captchaSource);
                //jQ("input[name='imgValueReal']").val(captchaSource);
                return incrementClicks();
        });
}

GM_registerMenuCommand("IRCTC Ticket Booking Automation Settings", IRCTCSettings);

