// ==UserScript==
// @name           RunkeeperFixGarminUpload
// @namespace      http://userscripts.org/users/392389
// @description    Fixes the upload of activities from Garmin devices on runkeeper.com
// @include        http://runkeeper.com/jsp/widgets/importGarmin.jsp
// @version        0.3
// ==/UserScript==


// We are overwriting functions by appending a repaired version of it to the script element in the head element
//
// List of overwritten functions
// uploadSelectedTrack - send only the selected activity, not the whole set of activities
// processTcx          - 
// onStartFindDevices  - Replaced status message to read "Fishing for Garmin devices"; allows to see if rewriting worked
// onFinishFindDevices - can now handle multiple devices (uses track selector to pick one) and ignores storage devices

var scriptCode = new Array();   // this is where we are going to build our new script



scriptCode.push(
	'function uploadSelectedTrack(){                                                   '+
	// Start with original code
	'                                                                                  '+
	'  var file_type = "tcx";                                                          '+
	// The following block replaces functionality in uploadSelectedTrack()
	'  var sel_activity_name = jQuery("#activitySelector").val();                      '+
	'  var sel_activities = new Array();                                               '+
	'  for (var i = 0; i < activities.length; i++)                                     '+
	'  {                                                                               '+
	'    if (activities[i].getAttribute("activityName") == sel_activity_name)          '+
	'    {                                                                             '+
	'      sel_activities.push(activities[i]);                                         '+
	'    }                                                                             '+
	'  }                                                                               '+
	'  trackData = Garmin.TcxActivityFactory.produceString(sel_activities);            '+
	// continue with original code
	'  var boundary = Math.random();                                                   '+
	'  var contentType = "multipart/form-data; boundary=\\"" + boundary + "\\"";       '+

	'  postData  = "--" + boundary + "\\r\\n";                                         '+
	'  postData += "Content-Disposition: form-data; name=\\"file_type\\"\\r\\n\\r\\n"; '+
	'  postData += file_type + "\\r\\n";                                               '+
	'  postData += "--" + boundary + "\\r\\n";                                         '+
	'  postData += "Content-Disposition: form-data; name=\\"trackId\\"\\r\\n\\r\\n";   '+
	'  postData += jQuery("#activitySelector").val() + "\\r\\n";                       '+
	'  postData += "--" + boundary + "\\r\\n";                                         '+
	'  postData += "Content-Disposition: form-data; name=\\"trackFile\\"; filename=\\"garmin_communicator_data.tcx\\"\\r\\n\\r\\n";      '+
	'  postData += trackData + "\\r\\n";                                               '+
	'  postData += "--" + boundary + "--";                                             '+

	'  jQuery.ajax({                                                                   '+
	'     type: "POST",                                                                '+
	'     url: "/trackFileUpload",                                                     '+
	'     contentType: contentType,                                                    '+
	'     data: postData,                                                              '+
	'     processData: false,                                                          '+
	'     dataType: "json",                                                            '+
	'     success: function(response)                                                  '+
	'     {                                                                            '+
	'       parent.processTrackUploadResponse(response);                               '+
	'     },                                                                           '+
	'     error: function(XMLHttpRequest, textStatus, errorThrown)                     '+
	'     {                                                                            '+
	'        alert("Error: "+errorThrown);                                             '+
	'        setStatusText("import failed " + errorThrown);                            '+
	'     }                                                                            '+
	'  });                                                                             '+
	'}');

scriptCode.push(
	'function processTcx(){'+
	'   if (fileTypeRead == Garmin.DeviceControl.FILE_TYPES.tcx)'+
	'   {'+
	'      activities = Garmin.TcxActivityFactory.parseDocument(garminController.gpsData);'+
	'      if (activities.length > 0)'+
	'      {'+
	'         jQuery("#statusText").css("font-size", "14px").css("margin-top", "20px");'+
	'         setStatusText("<span>" + activities.length + "</span> tracks found on device.");'+
	'         var optionsValues = "";'+
	' 	  activities.sort(function(lhs, rhs) { '+
	'	    return (rhs.getSummaryValue(Garmin.Activity.SUMMARY_KEYS.startTime).getValue().getDate().getTime() - lhs.getSummaryValue(Garmin.Activity.SUMMARY_KEYS.startTime).getValue().getDate().getTime()); '+
	'	  }); '+
	'         for (var i = 0; i < activities.length; i++)'+
	'         {'+
	'            var activity = activities[i];'+
	'            var activityLabel = activity.getAttribute("activitySport") + " " + activity.getSummaryValue(Garmin.Activity.SUMMARY_KEYS.startTime).getValue().getDateString() '+
	'                                + " (" + "Duration: " + activity.getStartTime().getDurationTo(activity.getEndTime()) + ")";'+
	'            var activityName = activity.getAttribute("activityName");'+
	'            optionsValues += "<option value=\\"" + activityName + "\\">" + activityLabel + "</option>";'+
	'         }'+
	'         jQuery("#activitySelector").append(optionsValues);'+
	'      }'+
	'      else'+
	'      {'+
	'         setStatusText("No tracks found on device.");'+
	'      }'+
	'   }'+
	'}');

scriptCode.push('garminDeviceListener.onStartFindDevices = function(json) { setDeviceStatusText("<span>Fishing for Garmin devices ...</span>"); };');

scriptCode.push(
	'function kickoffRead(){'+
	'  fileTypeRead = Garmin.DeviceControl.FILE_TYPES.tcx;'+
	'  try {'+
	'    garminController.readDataFromDevice(fileTypeRead);'+
	'  }'+
	'  catch(e) {'+
	'    alert(e+"\\n\\nFIT-only Garmin devices are not supported, yet.\\nBug RunKeeper to add support.\\nOr try the FIT2app Health Graph App at http://exnihili.com/fit2app/.");'+
	'  };'+
	'  setStatusText("Reading from device...");'+
	'  jQuery(".progressBar.garmin").fadeIn();'+
	'}');

scriptCode.push(
	'garminDeviceListener.onFinishFindDevices = function(json) {'+
        '  var devices = garminController.devices;'+
	'  var numdevices = 0;'+
	'  console.debug("Devices found: "+devices);'+
	'  for (i=0; i < devices.length; ) {'+
	'    if (devices[i].getId() == 0xFFFFFFFF)'+
	'      devices.splice(i,1);'+
	'    else'+
	'      i++;'+
	'  }'+
	'  setDeviceStatusText("");'+
	'  if (devices.length > 1) {'+
	'    $("activitySelector").options.length = 0;'+
	'    $("activitySelector").options[0] = new Option("Select device ...", "");'+
	'    for (i=0; i < devices.length; i++) '+
	'      $("activitySelector").options[i+1] = new Option(devices[i].getDisplayName(), i); '+
	'    jQuery("#activitySelector").show();'+
	'    $("activitySelector").onchange = function() {'+
	'      var devsel = $("activitySelector").value;'+
	'      garminController.setDeviceNumber(devices[devsel].getNumber());'+
	'      console.debug("Selected "+devsel+" "+devices[devsel]);'+
	'      $("activitySelector").options.length = 0;'+
	'      $("activitySelector").options[0] = new Option("Select track to upload ...", "");'+
	'      jQuery("#activitySelector").hide(); $("activitySelector").onchange = null;'+
	'      setDeviceStatusText("<div class=\'label\'>Connected to:</div><div class=\'content\'> " + devices[devsel].getDisplayName() + "</div>");'+
	'      kickoffRead();'+
	'    }.bind(this);'+
	'  }'+
	'  else if (devices.length == 1) {'+
	'    console.debug("Selected "+devices[0]);'+
	'    garminController.setDeviceNumber(devices[0].getNumber());'+
	'    setDeviceStatusText("<div class=\'label\'>Connected to:</div><div class=\'content\'> " + devices[0].getDisplayName() + "</div>");'+
	'    kickoffRead();'+
	'  }'+
	'  else {'+
	'    setDeviceStatusText("<div class=\'noDeviceTitle\'>No Garmin devices are connected.</div><div class=\'noDeviceText\'>Please make sure your device is connected to your computer and try again.</div><div id=\'tryAgainButton\' class=\'blueButton-medium\'><div class=\'l\'></div><div class=\'m\'><div class=\'mainText\'>Connect to Garmin device</div></div><div class=\'r\'></div></div> ");'+
	'    jQuery("#tryAgainButton").click(function(){ location.reload(); });'+
	'  }'+
	'}');

// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;                            // recover the memory we used to build the script
    
// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <head> tag on the page
// 2. adds the new script just before the </head> tag
document.getElementsByTagName('head')[0].appendChild(script); 

// alert('Fix applied');
