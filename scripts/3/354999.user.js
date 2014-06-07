// ==UserScript==
// @name          HackBCWD
// @namespace     https://github.com/abusalam/HackBCWD
// @description   Auto Approval for SDO: http://castcertificatewb.gov.in/
// @include       http://castcertificatewb.gov.in/*
// @grant         none
// @downloadURL   https://github.com/abusalam/HackBCWD/raw/master/HackBCWD.user.js
// @updateURL     https://github.com/abusalam/HackBCWD/raw/master/HackBCWD.user.js
// @version       1.0
// @icon          http://www.gravatar.com/avatar/43f0ea57b814fbdcb3793ca3e76971cf
// ==/UserScript==

/**
 * Function that loads jQuery and calls a callback function
 * when jQuery has finished loading
 *
 * How can I use jQuery in Greasemonkey scripts in Google Chrome?
 * All Credits to Original Author for this wonderfull function.
 *
 * @author  Erik Vergobbi Vold & Tyler G. Hicks-Wright
 * @link    http://stackoverflow.com/questions/2246901
 * @param   {reference} callback
 * @returns {undefined}
 */
function jQueryInclude(callback) {
  var jQueryScript = document.createElement("script");
  var jQueryCDN = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
  jQueryScript.setAttribute("src", jQueryCDN);
  jQueryScript.addEventListener('load', function() {
    var UserScript = document.createElement("script");
    UserScript.textContent = 'window.jQ=jQuery.noConflict(true);'
            + 'var BaseURL = "http://castcertificatewb.gov.in/";'
            + '(' + callback.toString() + ')();';
    document.head.appendChild(UserScript);

  }, false);
  document.head.appendChild(jQueryScript);
}

// the guts of this userscript
jQueryInclude(function() {

  if (window.location.href === BaseURL) {
    var URL = BaseURL + "jsp/user_module/user.html";
    window.open(URL, "_self");
    localStorage.setItem("TryLogin", "Yes");
  }

  // Note, jQ replaces $ to avoid conflicts.
  jQ("#uid").val("WB1502");
  jQ("#pwd").val("sdojhar123").blur();
  //jQ("#appid").hide(); //.val("<AppID>").blur();
  jQ("#process tr:nth-child(1) font").html("Please enter all the "
          + "Application IDs separated by comma: ','");
  var formCtrlShow = '';
  var formCtrl = '<input type="button" id="CmdAppIDs" value="Start Job..."/>'
          + '<input type="button" id="CmdStatus" value="Show Status"/>';
  var fromPrintCtrl = '<input type="button" id="CmdPrint" value="Prepare" />'
          + '<input type="button" id="CmdList" value="Show List"/>';

  if (jQ("#process_cert").is(":visible")) {
    formCtrlShow = fromPrintCtrl;
  } else if (jQ("#process").is(":visible")) {
    formCtrlShow = formCtrl;
  }

  if (formCtrlShow !== '') {
    var formElem = '<textarea id="AppIDs" rows="20" cols="60"></textarea><br/>'
            + formCtrlShow
            + '<input type="button" id="CmdClear" value="Clear Status"/>';
    jQ("#appid").parent().append(formElem);
    jQ("#retrieveDataFprApp").prependTo("#process");
    localStorage.setItem("TryLogin", "No:Job Started");
  }

  /**
   * Try for Login if Login Button is enabled
   * Only till TryLogin = Yes
   *
   * @returns {Boolean}
   */
  var TryLogin = function() {
    console.log("Trying For Login");
    if (jQ('#Login').is(":enabled")) {
      jQ("#Login").click();
      jQ("#Login").attr('disabled', 'disabled');
    } else if (localStorage.getItem("TryLogin") === "Yes") {
      setTimeout(TryLogin, 2000);
      return true;
    }
  };

  /**
   * Switch to module according to last working state
   * Only if NewsDiv is visible.
   *
   * @returns {Boolean}
   */
  var SwitchToJob = function() {
    if (jQ('#NewsDiv').is(":visible")) {
      //@todo Switch To Job Properly
      localStorage.setItem("TryLogin", "No:NewsDiv");
      var URL = '';
      if (localStorage.getItem("LastJob") === "Print") {
        URL = BaseURL + 'jsp/cert_module/process_certNew.jsp'
      } else {
        URL = BaseURL + 'jsp/user_module/processApplication.jsp'
      }
      parent.location.href = URL;
      console.log("NewsDiv:" + URL);
      setTimeout(SwitchToJob, 2000);
      return true;
    }
  };

  /**
   * Continious Polling for Server Response
   *
   * @returns {Boolean}
   */

  var RefreshOnWait = function() {
    var RespDate = new Date(), TimeOut;
    var CurrentTime = RespDate.getTime();
    CurrentTime = CurrentTime - localStorage.getItem("LastRespTime");
    TimeOut = localStorage.getItem("RefreshTimeOut");
    if (TimeOut === null) {
      TimeOut = 300000;
    } else {
      TimeOut = 5000 + 60000 * TimeOut; // 5sec is minimum
      localStorage.removeItem("RefreshTimeOut");
    }

    if (CurrentTime > TimeOut) {

      var LastRespTime = new Date();
      localStorage.setItem("LastRespTime", LastRespTime.getTime());
      localStorage.setItem("TryLogin", "Yes");
      var URL = BaseURL + "jsp/user/login.jsp";
      parent.window.open(URL, "_self");
    }
    setTimeout(RefreshOnWait, TimeOut);
    return true;
  };

  RefreshOnWait();
  TryLogin();
  SwitchToJob();

  /**
   * Register Events using jQuery
   *
   * @returns {undefined}
   */

  jQ("#CmdClear").click(function() {
    localStorage.clear();
  });
  /**
   * Load Stored AppIDs
   */
  var LoadStoredAppIDs = function() {

    var Status = [];
    var LastIndex = localStorage.getItem("LastIndex");
    var IsProcessed, AppIDs = [], AppID;
    for (i = 1; i < LastIndex; i++) {
      IsProcessed = localStorage.getItem("AppID_" + i + "_Status");
      AppID = localStorage.getItem("AppID_" + i);
      if (AppID.length > 0) {
        AppIDs.push(AppID);
        Status.push(AppID + " : " + IsProcessed);
      }
    }

    if (jQ("#AppIDs").val().length === 0) {
      jQ("#AppIDs").val(AppIDs.join(","));
    }
    return Status;
  };
  // Function to Process to Next Step

  var StoreAppDetails = function() {
    console.log("StoreAppDetails");
    var AppName = jQ("#nameValue").html();
    if (AppName.length > 5) {
      var AppIndex = localStorage.getItem("CurrentIndex");
      var AppName = jQ("#nameValue").html();
      localStorage.setItem("AppID_" + AppIndex + "_Name", AppName);
      jQ("#btn").click();
    } else {

      //If AppName doesn't come up in 1min again trigger for it
      var TimeNow = new Date();
      if ((TimeNow.getTime() - localStorage.getItem("LastRespTime")) > 60000) {
        var AppIndex = localStorage.getItem("CurrentIndex");
        var AppID = localStorage.getItem("AppID_" + AppIndex);

        jQ("#appid").val(AppID).blur();
        localStorage.setItem("LastRespTime", TimeNow.getTime());
      }

      setTimeout(StoreAppDetails, 5000);
      return;
    }
  };
  // Function to Process First Non-Processed AppID

  var ProcessFirstAppID = function() {
    var LastIndex = localStorage.getItem("LastIndex");
    for (var i = 1; i < LastIndex; i++) {
      var IsProcessed = localStorage.getItem("AppID_" + i + "_Status");
      if (IsProcessed === "Pending") {
        var AppID = localStorage.getItem("AppID_" + i);
        jQ("#appid").val(AppID).blur();
        localStorage.setItem("CurrentIndex", i);
        localStorage.setItem("AppID", AppID);
        localStorage.setItem("CurrentStatus", "Wait");
        var LastRespTime = new Date();
        localStorage.setItem("LastRespTime", LastRespTime.getTime());
        break;
      }
    }
    StoreAppDetails();
  };
  // Function to Process to Next Step

  var StorePrintAppDetails = function() {
    var CertNo = jQ("#cert_no").val();
    if (CertNo.length > 5) {
      var AppIndex = localStorage.getItem("PrintIndex");
      var AppName = jQ("tr.alt_tr > td:nth-child(2)").html();
      localStorage.setItem("AppID_" + AppIndex + "_CertNo", CertNo);
      localStorage.setItem("AppID_" + AppIndex + "_CertName", AppName);
      localStorage.setItem("AppID_" + AppIndex + "_PrintStatus", "Ready");
      localStorage.setItem("CurrentStatus", "PrintNext");
      var URL = BaseURL + "jsp/cert_module/process_certNew.jsp";
      window.open(URL, "_self");
    } else {
      console.log("Waiting for StorePrintDetails");
      setTimeout(StorePrintAppDetails, 2000);
      return;
    }
  };
  /**
   * Waits after providing AppID
   * until Show Button is enabled
   *
   */
  var ShowCertNo = function() {
    if (jQ('#btnOption').is(":enabled")) {
      localStorage.setItem("CurrentStatus", "PrintStoreWait");
      jQ('#btnOption').click();
      jQ("#Login").attr('disabled', 'disabled');
    } else {
      setTimeout(ShowCertNo, 2000);
      return;
    }
  };
  // Function to Print First Non-Printed AppID

  var PrintFirstAppID = function() {
    var LastIndex = localStorage.getItem("PrintLastIndex");
    for (var i = 1; i < LastIndex; i++) {
      var IsPrinted = localStorage.getItem("AppID_" + i + "_PrintStatus");
      if (IsPrinted === "Wait") {
        var AppID = localStorage.getItem("AppID_" + i + "_Print");
        jQ("#appid").val(AppID).blur();
        localStorage.setItem("PrintIndex", i);
        localStorage.setItem("AppID", AppID);
        localStorage.setItem("CurrentStatus", "PrintWait");
        var LastRespTime = new Date();
        localStorage.setItem("LastRespTime", LastRespTime.getTime());
        break;
      }
    }
    ShowCertNo();
  };
  /**
   * Click : [Start Processing]
   *
   * Batch Process Applications
   */
  jQ("#CmdAppIDs").click(function() {
    localStorage.setItem("LastJob", "Approve");
    jQ("#CmdAppIDs").attr('disabled', 'disabled');
    var AppIDs = "" + jQ("#AppIDs").val();
    var AllIDs = AppIDs.replace(/\r\n+|\r+|\n+|\s+/gm, '').split(",");
    // Store All AppIDs

    var AppIndex = 1;
    var LastIndex = localStorage.getItem("LastIndex");
    jQ.each(AllIDs, function(index, value) {
      if (value.length > 0) {
        localStorage.setItem("AppID_" + AppIndex, value);
        localStorage.setItem("AppID_" + AppIndex + "_Status", "Pending");
        AppIndex++;
      }
    });
    //Store the Total no of AppIDs

    if ((LastIndex === null) || (LastIndex < AppIndex)) {
      localStorage.setItem("LastIndex", AppIndex);
    }
    ProcessFirstAppID();
  });
  /**
   *  Click : [Show Status]
   *
   *  Display the Status of the applications
   */
  jQ("#CmdStatus").click(function() {

    if (jQ("#CmdStatus").val() === "Show Status") {

      jQ("#CmdStatus").val("Hide Status");
      jQ("#AppIDs").hide();
      var vals = LoadStoredAppIDs();
      var StatusDiv = document.createElement("div");
      StatusDiv.setAttribute("id", "AppStatus");
      jQ("#appid").parent().append(StatusDiv);
      jQ("#AppStatus").html("<ol><li>" + vals.join("</li><li>")
              + "</li></ol>");
    } else {

      jQ("#AppStatus").remove();
      jQ("#AppIDs").show();
      jQ("#CmdStatus").val("Show Status");
    }

  });
  /**
   * Load Stored AppIDs for Printing
   */
  var LoadPrintAppIDs = function() {

    var Status = [];
    var CertURL = BaseURL + "servlet/servAcknoReport?msg=CERT&appid=";
    var LastIndex = localStorage.getItem("PrintLastIndex");
    var IsPrinted, AppIDs = [], AppID, CertNo, CertName, PrintLink;
    for (i = 1; i < LastIndex; i++) {
      IsPrinted = localStorage.getItem("AppID_" + i + "_PrintStatus");
      AppID = localStorage.getItem("AppID_" + i + "_Print");
      CertNo = localStorage.getItem("AppID_" + i + "_CertNo");
      CertName = localStorage.getItem("AppID_" + i + "_CertName");
      if (IsPrinted === "Ready") {
        PrintLink = '<a href="' + CertURL + CertNo + '" target="_blank">'
                + CertNo + '</a>';
      } else {
        PrintLink = IsPrinted;
      }
      if (AppID.length > 0) {
        AppIDs.push(AppID);

        Status.push(AppID + " : " + CertName + " : " + PrintLink);
      }
    }

    if (jQ("#AppIDs").val().length === 0) {
      jQ("#AppIDs").val(AppIDs.join(","));
    }
    return Status;
  };
  /**
   * Click : [Print]
   *
   * Batch Process Applications for Printing
   */
  jQ("#CmdPrint").click(function() {
    localStorage.setItem("LastJob", "Print");
    jQ("#CmdPrint").attr('disabled', 'disabled');
    var AppIDs = "" + jQ("#AppIDs").val();
    var AllIDs = AppIDs.replace(/\r\n+|\r+|\n+|\s+/gm, '').split(",");
    // Store All AppIDs

    var AppIndex = 1;
    var LastIndex = localStorage.getItem("PrintLastIndex");
    jQ.each(AllIDs, function(index, value) {
      if (value.length > 0) {
        localStorage.setItem("AppID_" + AppIndex + "_Print", value);
        localStorage.setItem("AppID_" + AppIndex + "_PrintStatus", "Wait");
        AppIndex++;
      }
    });
    //Store the Total no of AppIDs

    if ((LastIndex === null) || (LastIndex < AppIndex)) {
      localStorage.setItem("PrintLastIndex", AppIndex);
    }
    PrintFirstAppID(); //@todo Process Printing
  });

  /**
   *  Click : [Show List]
   *
   *  Display the List of the applications to Print
   */
  jQ("#CmdList").click(function() {

    if (jQ("#CmdList").val() === "Show List") {

      jQ("#CmdList").val("Hide List");
      jQ("#AppIDs").hide();
      var vals = LoadPrintAppIDs();
      var StatusDiv = document.createElement("div");
      StatusDiv.setAttribute("id", "AppStatus");
      jQ("#appid").parent().append(StatusDiv);
      jQ("#AppStatus").html("<ol><li>" + vals.join("</li><li>")
              + "</li></ol>");
    } else {

      jQ("#AppStatus").remove();
      jQ("#AppIDs").show();
      jQ("#CmdList").val("Show List");
    }

  });

  /**
   *  Waiting for PrintCertificate interface to come
   */
  var PrintWait = localStorage.getItem("CurrentStatus");
  if (PrintWait === "PrintStoreWait") {
    StorePrintAppDetails();
  } else if (PrintWait === "PrintNext") {
    PrintFirstAppID();
  } else if (PrintWait === "Next") {
    ProcessFirstAppID();
  }

  if (jQ("#action").is(":visible")) {
    var CurrentStatus = localStorage.getItem("CurrentStatus");
    if (CurrentStatus === "Next") {
      ProcessFirstAppID();
    } else {
      jQ("#action").val("A06");
      jQ("#comment").val("[Approved]");
      jQ("#btnOpt").val("Submit");
      jQ("#btnSubmit").attr('disabled', 'disabled');
      jQ("#comsubmit").trigger("submit");

      localStorage.setItem("CurrentStatus", "IsApproved");
      localStorage.setItem("RefreshTimeOut", 2);
    }
  } else if (jQ("#process tr:nth-child(3) font").is(":visible")) {

    var Msg = jQ("#process tr:nth-child(3) font").html();
    if (Msg.indexOf("not allowed") > 0) {
      var i = localStorage.getItem("CurrentIndex");
      localStorage.setItem("AppID_" + i + "_Status", "Not Allowed!");
      ProcessFirstAppID();
    }
    console.log("AppID_" + i + "_Status " + Msg);
  }

  /**
   * Continiously Poll until Approved
   * Only if CurrentStatus = IsApproved
   */
  var CheckApproval = function() {
    if (localStorage.getItem("CurrentStatus") === "IsApproved") {
      if (jQ("#btnSubmit").val() === "Go Back") {
        // Application Approved

        var Msg = jQ("#comsubmit div tr:last-child td:last-child").text();

        if (Msg.indexOf("Approved") >= 0) {
          var i = localStorage.getItem("CurrentIndex");
          localStorage.setItem("CurrentStatus", "Next");

          localStorage.setItem("AppID_" + i + "_Status", "Approved");
          jQ("#btnOpt").val("Go Back");
          jQ("#btnSubmit").click();
          jQ("#btnSubmit").attr('disabled', 'disabled');
          console.log("CheckApproval: Approved " + Msg);
          jQ("#comsubmit").trigger("submit");
        } else {
          console.log("CheckApproval:" + Msg + document.body + Msg.indexOf("Approved"));
          //location.reload(true);
        }
      } else {
        setTimeout(CheckApproval, 5000);
        return true;
      }
    }
  };

  CheckApproval();

  var TimeNow = new Date();
  localStorage.setItem("LastRespTime", TimeNow.getTime());
});
