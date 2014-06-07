// ==UserScript==
// @name Salesforce UI Tweaks
// @namespace http://uscszoccocl2c/userscripts/
////////////////////////////////////////
// @version 1.3.12
// @date 2013-08-08
// @description By Chris Zocco (christopher.zocco@vce.com).
// @copyright 2012+, Chris Zocco
////////////////////////////////////////
// @downloadURL http://10.241.213.48/zsf/userscripts/zSalesforceUITweaks.user.js
// @updateURL http://10.241.213.48/zsf/userscripts/zSalesforceUITweaks.user.js
////////////////////////////////////////
// MAIN PAGE
// @match https://na7.salesforce.com/ui/support/servicedesk/ServiceDeskPage
////////////////////////////////////////
// NEW TASK
// @match https://na7.salesforce.com/00T/*
////////////////////////////////////////
// NEW COMMENT
// @match https://na7.salesforce.com/00a/*
////////////////////////////////////////
// SR QUEUE
// @match https://na7.salesforce.com/500?fcf=*
////////////////////////////////////////
// SR DETAILS
// @match https://na7.salesforce.com/500A*
////////////////////////////////////////
// EXCLUDES
// @exclude https://www.salesforce.com/*
// @exclude https://c.na7.visual.force.com/*
////////////////////////////////////////
// RESOURCES
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
////////////////////////////////////////
// ==/UserScript==

// GLOBAL CONTROLS
var _SR_DESCR_LIMIT = 1500;
var _DEBUG = false;
var _HOMEPAGE = "http://10.241.213.48/zsf/";
// for testing
//_HOMEPAGE = "http://uscszoccocl2c/zsf.html";

// CONSTANTS FOR DELIMITERS
var DELIMITER_FORWARD_SLASH = ' / ';
var DELIMITER_PIPE = ' | ';
var DELIMITER_EMAIL_SUBJECT = DELIMITER_FORWARD_SLASH;

// FUNCTIONS FOR CONVENIENCE
function buildMailto(toArray,subject,label) {
    return '<a href="mailto:'+toArray.join(';')+'?CC=support_notifications_reply-only@vce.com&Subject='+subject+'">'+label+'</a>';
}

function getData(uid) { debug("getData : "+uid); return $.trim($(uid).text()); }

// CONSTANTS FOR FIELD UNIQUE IDENTIFIERS
var UID_srNumber = '#00NA0000009EQa1_ileinner';//'h2.pageDescription'; // new values from B2B area, old value from page header
var UID_srSeverity = '#cas8_ileinner';
var UID_srSubject = '#cas14_ileinner';
var UID_srDescription = '#cas15_ileinner';
var UID_srContactName = '#cas3_ileinner';
var UID_srAccountName = '#cas4_ileinner';
var UID_srAdInfoType = '#cas5_ileinner';
var UID_srAdInfoInstallationStatus = '#00NA0000009D8Am_ileinner';
var UID_srComponent = '#00NA0000009EQZr_ileinner';

// email vars
var UID_srPrimeEngineerEmail = '#00NA0000009EQZm_ileinner';
var UID_srContactEmail = '#cas10_ileinner';            
var UID_srCustomerAdvocateEmail = '#00NA0000009D8Ag_ileinner';

// parent sr vars
var UID_srCisco  = '#00NA0000009EQZH_ileinner';
var UID_srEmc    = '#00NA0000009EQZY_ileinner';
var UID_srVmware = '#00NA0000009EQa2_ileinner';

////////////////////////////////////////



// JQUERY EXTENSIONS
$.fn.exists = function () {
    return this.length !== 0;
};


function debug(out){
    if(_DEBUG) console.log(out);
}

////////////////////////////////////////
// srdata object
////////////////////////////////////////
// initiate the 'global' srdata object which will hold sr info for us.
if (typeof window.parent != 'undefined')
{
    if (typeof window.parent.srdata == 'undefined')
    {
    	window.parent.srdata = {};
    }
}
// local pointer for convenience
var srdata = window.parent.srdata;
////////////////////////////////////////


var runTweaks = true;

// triggers needed for callcenter vs. serviceconsole
var in_iframe = true; 
var _tweakLinkStyle = "position: relative; top: -5px; font-size: 109%;";


if (window.top === window.self) {
    debug("main window hit");
    //--- Code to run when page is the main site...
    
    // triggers needed for callcenter vs. serviceconsole
    _tweakLinkStyle = "";
    in_iframe = false;
    
    var pathname = window.location.pathname;
    debug(pathname);
    
   
} else {
    //--- Code to run when page is in an iframe...
    debug("iframe hit");
}

if(runTweaks) {   
    $(function(){
        var msg;
       
        if ( $('body.caseTab.detailPage').size() > 0) {
            msg = 'details page';
            
            // cache injection points
            var srHeader = $('h2.pageDescription');
            var links = $('div.links');
            
			////////////////////////////////////////
            // ext link and version display
			////////////////////////////////////////
            if (in_iframe) $('img.helpIcon').height('20'); // have to tweak styling of the help icon if in service console view, but not call center view
            $(links).prepend('<div style="display: inline; margin-right: 12px; '+_tweakLinkStyle+'">'+ // save as above 
                             '<a href="'+_HOMEPAGE+'" target="_blank" title="You are using the zSF userscript to improve your SF experience. Click to learn more."'+
                             'class="configLinks">zSF_'+GM_info.script.version+'</a>'+
                             '</div>');
            ////////////////////////////////////////

            
            
			////////////////////////////////////////
            // srdata fetch
			////////////////////////////////////////
            // SR Number is the KEY for srdata
            var srNumber = getData(UID_srNumber);//$.trim($('h2.pageDescription').text());
            
            // other srdata
            var srSeverity = getData(UID_srSeverity);
            var srSubject = getData(UID_srSubject);
            var srDescription = getData(UID_srDescription);
            var srContactName = getData(UID_srContactName);
            var srAccountName = getData(UID_srAccountName);
            var srAdInfoType = getData(UID_srAdInfoType);
            var srAdInfoInstallationStatus = getData(UID_srAdInfoInstallationStatus);
			var srComponent = getData(UID_srComponent);

            // email vars
            var srPrimeEngineerEmail = getData(UID_srPrimeEngineerEmail);
            var srContactEmail = getData(UID_srContactEmail);
            var srCustomerAdvocateEmail = getData(UID_srCustomerAdvocateEmail);
            ////////////////////////////////////////

            
            
            ////////////////////////////////////////
            // save case data to srdata object
			////////////////////////////////////////
            // persist srdata in the global space
            // might also add a property to store the triggered action, 
            // i.e. I click a button for "accept text" which launches New comment page and directs it to automatically put template info in
            srdata[srNumber] = {
                srNumber: srNumber,
                srSeverity: srSeverity,
                srSubject: srSubject,
                srDescription: (srDescription.length > _SR_DESCR_LIMIT ? ($.trim(srDescription.substring(0,_SR_DESCR_LIMIT))+"...") : srDescription), // special handling to try to keep under rare 2k limit
                srContactName: srContactName,
                srContactEmail: srContactEmail
            };
            
            debug("dump srdata");
            debug(srdata);
            debug(srdata[srNumber]);
            
            
            
            ////////////////////////////////////////
            // vcekeys link embedding
			////////////////////////////////////////
            // this is just appending srNumber to the vcekeys external link
            // need to redo as a POST to the page so that large data can be provided
            $('<a target="_blank" href="http://wolverine.int.voyence.com/vcekeys/?'+$.param(srdata[srNumber])+'" style="margin-left: 10px;" class="vcekeyslink" type="button" title="Launch VCE Keys">Launch VCE Keys</a>').insertAfter("input.btn[name='newComment']");
            // in order to decode 
            // $.param(srdata[srNumber])
            // properly, use 
            // decodeURIComponent($.param(srdata[srNumber]).replace(/\+/g, "%20")));
            
          
			////////////////////////////////////////
			// new email indicator
			////////////////////////////////////////
            var countOfNewEmails = $('div[id*=RelatedEmailMessageList_body] table th.dataCell:contains("New")').size();
            
            var emailColor = "gray";
            var emailMessage = "no new emails";
            if ( countOfNewEmails > 0 ){
                emailColor = "red";
                emailMessage = "check new emails";
            }
            
            var emailCheckMsg = '<a style="color: '+emailColor+';" href="#'+$('a[name*=RelatedEmailMessageList_target]').attr('name')+'">'+emailMessage+'</a>';
            
			
            ////////////////////////////////////////
			// FIELD MONITORING
			////////////////////////////////////////
            // incident categorization is set; do not use product = other
            
            var STYLE_WARNING = "color: red;";
            
            var style_srAdInfoType = "";
            if (srAdInfoType == "")
            {
                srAdInfoType = "IS NOT SET";
                style_srAdInfoType = STYLE_WARNING;
            }
            
            var style_srAdInfoInstallationStatus = "";
            if (srAdInfoInstallationStatus == "")
            {
                srAdInfoInstallationStatus = "IS NOT SET";
                style_srAdInfoInstallationStatus = STYLE_WARNING;
            }
            
            var style_srComponent = "";
            if (srComponent == "" || srComponent == "Other" )
            {
                if (srComponent == "")
                	srComponent = "IS NOT SET";
                
                style_srComponent = STYLE_WARNING;
            }
            
            /*
            $('body div.bPageTitle:first') // changed this to append very specifically here instead of "body" so that it is correctly placed in Call Center view
            .append('<div id="zsf_fieldMonitor" style="width: 100%; position: absolute; top: 0px; padding-top: 5px; white-space: pre; text-align: center; ">'+	// removed nested divs; have new centering solution
                    '<a href="#cas5_ileinner" title="Click to jump to this field." style="'+style_srAdInfoType+'"><h3>Type:</h3> '+srAdInfoType+'</a> | '+
                    '<a href="#00NA0000009D8Am_ileinner" title="Click to jump to this field." style="'+style_srAdInfoInstallationStatus+'"><h3>Installation Status:</h3> '+srAdInfoInstallationStatus+'</a> | '+
                    '<a href="#head_01BA000000cUEsl_ep" title="Click to jump to this field." style="'+style_srComponent+'"><h3>Customer Product:</h3> '+srComponent+'</a>'+
                    '</div>')
            .css('position','relative'); // fixes width display bug which caused bottom slider bar to always appear; negates bad 100% width display issue in Call Center view; bar is properly centered now
            */
            

            ////////////////////////////////////////
			// usage statistics
			////////////////////////////////////////
            var user = $('#userNavLabel',top.document);
            debug("USERNAME: "+user.text());
            srdata['user'] = user;
            $.post(_HOMEPAGE+"usage.php",{user:user.text(),srNumber:srNumber,version:GM_info.script.version},function(result){});
            
            
            ////////////////////////////////////////
			// sr info rip
			////////////////////////////////////////
            // rip out the SR information
            var docloc = document.location;     
            var srOidExp = /https:\/\/na7.salesforce.com\/(.*?)(\?|$)/; // fixed to match top level pages with no parameters
            var match = srOidExp.exec(docloc);
            var srOid = match[1];
			
            var srOidRef = srOid.substr(0,5) +srOid.substr(10,5); // fixed to only capture 5 chars from pos 10; was bugging when working with brandnew SRs, as the URL string had 3 junk chars after ref OID boundary            
         	var sfdcEmailRef = '[ ref:_00DA0Zzip._'+srOidRef+':ref ]';
            var sfdcSrDirectUrl = 'https://na7.salesforce.com/'+srOid;
            
            var srParentString = "";
            var srCisco  = getData(UID_srCisco);
            var srEmc    = getData(UID_srEmc);
            var srVmware = getData(UID_srVmware);
            

           	// start building the email subject
            var emailSubjectArray = new Array();
            emailSubjectArray.push('VCE SR# '+srNumber);
            
            if (srCisco.length > 1)
            {
                srParentString += ' <a target="_blank" href="https://tools.cisco.com/ServiceRequestTool/query/QueryCaseSearchAction.do?endCustomerNumber=&casesearchsubmit=Search&SRNumber='+srCisco+'&caseType=ciscoServiceRequest&method=doQueryByCase" title="View Cisco SR in TAC SR Tool">Cisco</a> ' + srCisco + ' |';
                emailSubjectArray.push('Cisco SR# '+srCisco);
            }
            
            if (srEmc.length > 1) 
            {
                srParentString += ' <a target="_blank" href="http://qtool-itops.lss.emc.com/viewsr/'+srEmc+'/" title="View EMC SR in QTOOL">EMC</a>'+
                    '(<a target="_blank" href="https://support.emc.com/servicecenter/srManagement/'+srEmc+'" title="View EMC SR in Service Center">alt</a>) '+srEmc+ ' |';
                emailSubjectArray.push('EMC SR# '+srEmc);
            }
            
            if (srVmware.length > 1)
            {
                srParentString += ' VMware ' + srVmware + ' |';
                emailSubjectArray.push('VMware SR# '+srVmware);
            }
            
            if (srParentString != "")
            {
                srParentString = srParentString.substr(1, srParentString.length - 3) + '<br/>';
            }
            
            // push the rest of the SR subject content
			emailSubjectArray.push(srComponent,srAccountName,srSubject,sfdcEmailRef);
          	
            // build the email suject with the DELIMITER between pieces, encode URI to protect the links from odd characters
            var emailSubject = encodeURIComponent(emailSubjectArray.join(DELIMITER_EMAIL_SUBJECT));
            
            ////////////////////////////////////////
            // inject parent sr links and email helpers
            ////////////////////////////////////////
            // push everything into linkArray that will go below the parent SR line
            var linkArray = new Array();
            linkArray.push('<a target="_blank" href="'+sfdcSrDirectUrl+'" title="Direct Link to SR">'+sfdcSrDirectUrl+'</a>',
                           buildMailto(new Array(),emailSubject,'Email (blank)'),
                           buildMailto(new Array(srContactEmail),emailSubject,'Email Customer'),
                           buildMailto(new Array(srCustomerAdvocateEmail),emailSubject,'Email CA'),
                           buildMailto(new Array(srContactEmail,srCustomerAdvocateEmail),emailSubject,'Email Customer &amp; CA'), 
                           emailCheckMsg);
                
            
            $('<div style="padding-left: 40px; white-space: nowrap;">' +
              srParentString +
              linkArray.join(DELIMITER_PIPE) + '<br/>' +
              '<a href="'+UID_srAdInfoType+'" title="Click to jump to this field." style="'+style_srAdInfoType+'"><h3>Type:</h3> '+srAdInfoType+'</a> | '+
              '<a href="'+UID_srAdInfoInstallationStatus+'" title="Click to jump to this field." style="'+style_srAdInfoInstallationStatus+'"><h3>Installation Status:</h3> '+srAdInfoInstallationStatus+'</a> | '+
              '<a href="#head_01BA000000cUEsl_ep" title="Click to jump to this field." style="'+style_srComponent+'"><h3>Customer Product:</h3> '+srComponent+'</a>'+
              '<br/>' +
              sfdcEmailRef +
              '</div>').insertAfter(srHeader);
        }
        else if ( $('body.caseTab.editPage').size() > 0)
        {
            msg = 'add comment';
            
            //console.log("logging from edit page");
            //console.log(window.location.href.slice(window.location.href.indexOf('?') + 1));
            
            // grab the srNumber that appears in this frame
            var srNumber = $.trim($('h2.pageDescription').text()).split(' ')[2];
            
            // NEW FUNCTIONALITY
            // retrieve the srdata and provide vcekeys functionality here
            
            //console.log("srnumber from edit page: "+srNumber);
            //console.log(srdata);
            //console.log(srdata[srNumber]);
        }
        else if ( $('body.taskTab.editPage').size() > 0)   
        {
            msg = 'new task';
        }
        else if ( $('body.caseTab.listPage').size() > 0)  
        {
            msg = 'console list';
            setInterval(function() {
                //console.log("===============");
                $('div.x-grid3-col-00NA0000009EQZY:not(.zmodified)').each(function () {
                    var srEmc = $(this).text();
                    
                    if (srEmc.length > 1)  
                    {
                        //console.log("creating links for EMC SR " + sr);
                        $(this).html('<a target="_blank" href="http://qtool-itops.lss.emc.com/viewsr/'+srEmc+'/" title="View EMC SR in QTOOL">'+srEmc+'</a>'+
                    '(<a target="_blank" href="https://support.emc.com/servicecenter/srManagement/'+srEmc+'" title="View EMC SR in Service Center">alt</a>)')
                            .addClass('zmodified');
                    }
                });
                
                $('div.x-grid3-col-00NA0000009EQZH:not(.zmodified)').each(function () {
                    var srCisco = $(this).text();
                    
                    if (srCisco.length > 1)
                    {
                        $(this).html('<a target="_blank" href="https://tools.cisco.com/ServiceRequestTool/query/QueryCaseSearchAction.do?endCustomerNumber=&casesearchsubmit=Search&SRNumber='+srCisco+'&caseType=ciscoServiceRequest&method=doQueryByCase" title="View Cisco SR in TAC SR Tool">'+srCisco+'</a>')
                            .addClass('zmodified');
                    }
                    
                });
            }, 5000);
        }
        //if (! (typeof(msg) === 'undefined') ) { console.log(new Date().toISOString() + ' [' + msg + '] - classList = ' + $('body').attr('class')); }
    });
}

debug("done");
