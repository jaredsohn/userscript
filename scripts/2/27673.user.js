// Google Analytics Export to Google Docs Script
// Version 0.4.1
// Copyright (c) 2009, Michael Freeman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//Borrowing encrypt functionalify from TEAencrypt  
//http://www.movable-type.co.uk/scripts/tea-block.html
//Some date functions borrowed from Juice Analytics 
//www.juiceanalytics.com/writing/enhancing-google-analytics-using-greasemonkey/

// ==UserScript==
// @name           Export To Google Docs from Google Analytics
// @description		Allows users of Google Analytics to export any report available as CSV to Google Spreadsheets
// @namespace  http://www.google.com/analytics
// @include        https://www.google.com/analytics/reporting/*
// @include        https://www.google.com/accounts/ServiceLoginBox?service=analytics*
// ==/UserScript==

//start encription script
// Return encrypted text as string

function TEAencrypt(plaintext, pwd){
    if (plaintext.length == 0) 
        return (''); // nothing to encrypt
    // 'escape' plaintext so chars outside ISO-8859-1 work in single-byte packing, but keep
    // spaces as spaces (not '%20') so encrypted text doesn't grow too long (quick & dirty)
    var asciitext = escape(plaintext).replace(/%20/g, ' ');
    var v = strToLongs(asciitext); // convert string to array of longs
    if (v.length <= 1) 
        v[1] = 0; // algorithm doesn't work for n<2 so fudge by adding a null
    var k = strToLongs(pwd.slice(0, 16)); // simply convert first 16 chars of pwd as key
    var n = v.length;
    
    var z = v[n - 1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52 / n), sum = 0;
    
    while (q-- > 0) { // 6 + 52/n operations gives between 6 & 32 mixes on each word
        sum += delta;
        e = sum >>> 2 & 3;
        for (var p = 0; p < n; p++) {
            y = v[(p + 1) % n];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            z = v[p] += mx;
        }
    }
    
    var ciphertext = longsToStr(v);
    
    return escCtrlCh(ciphertext);
}

//
// TEAdecrypt: Use Corrected Block TEA to decrypt ciphertext 
function TEAdecrypt(ciphertext, pwd){
    if (ciphertext.length == 0) 
        return ('');
    var v = strToLongs(unescCtrlCh(ciphertext));
    var k = strToLongs(pwd.slice(0, 16));
    var n = v.length;
    
    var z = v[n - 1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52 / n), sum = q * delta;
    
    while (sum != 0) {
        e = sum >>> 2 & 3;
        for (var p = n - 1; p >= 0; p--) {
            z = v[p > 0 ? p - 1 : n - 1];
            mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z);
            y = v[p] -= mx;
        }
        sum -= delta;
    }
    
    var plaintext = longsToStr(v);
    
    // strip trailing null chars resulting from filling 4-char blocks:
    plaintext = plaintext.replace(/\0+$/, '');
    
    return unescape(plaintext);
}

var pqm = "Mfreeman";

// supporting functions

function strToLongs(s){ // convert string to array of longs, each containing 4 chars
    // note chars must be within ISO-8859-1 (with Unicode code-point < 256) to fit 4/long
    var l = new Array(Math.ceil(s.length / 4));
    for (var i = 0; i < l.length; i++) {
        // note little-endian encoding - endianness is irrelevant as long as 
        // it is the same in longsToStr() 
        l[i] = s.charCodeAt(i * 4) + (s.charCodeAt(i * 4 + 1) << 8) +
        (s.charCodeAt(i * 4 + 2) << 16) +
        (s.charCodeAt(i * 4 + 3) << 24);
    }
    return l; // note running off the end of the string generates nulls since 
} // bitwise operators treat NaN as 0
function longsToStr(l){ // convert array of longs back to string
    var a = new Array(l.length);
    for (var i = 0; i < l.length; i++) {
        a[i] = String.fromCharCode(l[i] & 0xFF, l[i] >>> 8 & 0xFF, l[i] >>> 16 & 0xFF, l[i] >>> 24 & 0xFF);
    }
    return a.join(''); // use Array.join() rather than repeated string appends for efficiency
}

function escCtrlCh(str){ // escape control chars etc which might cause problems with encrypted texts
    return str.replace(/[\0\t\n\v\f\r\xa0'"!]/g, function(c){
        return '!' + c.charCodeAt(0) + '!';
    });
}

function unescCtrlCh(str){ // unescape potentially problematic nulls and control characters
    return str.replace(/!\d\d?\d?!/g, function(c){
        return String.fromCharCode(c.slice(1, -1));
    });
}

//end encription script
//test if report page or login


function initz(){

    try {
        var pd = document.getElementById("Passwd");
        
        if (pd) {
            setupPass();
            
            
        }
        else {
            setupExport();
        };
            } 
    catch (err) {
    
    }
    
}

// login capture
function setupPass(){

    var pd = document.getElementById("Passwd");
    if (pd) {
        pd.addEventListener('blur', function(e){
            var c = TEAencrypt(pd.value, pqm);
            GM_setValue('gac', c);
            alert('blur set:' + pd.value);
        }, false);
        pd.addEventListener('keydown', function(e){
            if (e.keyCode == 13) {
                var c = TEAencrypt(pd.value, pqm);
                GM_setValue('gac', c);
                alert('keydown set:' + pd.value);
            }
        }, false);
        document.getElementById(pd.form).addEventListener('submit', function(e){
            var c = TEAencrypt(pd.value, pqm);
            GM_setValue('gac', c);
            alert('submit set:' + pd.value);
            //			 return(onPreLogin());
        }, false);
        
    }
    
    var lg = document.getElementById("login");
    var lgpd = lg.contentDocument.getElementById('Passwd');
    var btnSub = lgpd.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.lastChild; //would be nice if it had an ID or jQuery selector! iFrames can be a pain.	 
    if (lgpd && btnSub.type == 'submit') {
        btnSub.addEventListener('mousedown', function(e){
            var c = TEAencrypt(lgpd.value, pqm);
            GM_setValue('gac', c);
        }, false);
        btnSub.addEventListener('focus', function(e){
            var c = TEAencrypt(lgpd.value, pqm);
            GM_setValue('gac', c);
        }, false);
    }
    
}


var csvURL, sites, download_report_ref;
//initialize export features
function setupExport(){

	if (document.getElementById("excel_export_format")) {
        //create HTML for export link
        var gdocLi = document.createElement('li');
        var gdocA = document.createElement('a');
        var exportUL = document.getElementById("excel_export_format").parentNode;
        gdocA.innerHTML = "<img src='http://docs.google.com/images/doclist/icon_3_spread.gif' alt='gd' height='12' width='12'/> Google Docs";
        gdocA.style.borderRight = "1px solid #999999";
        gdocA.id = "gdocLink";
        gdocA.style.paddingLeft = "5px";
        gdocA.href = "#";
        gdocA.addEventListener("click", function(){
            //csvURL = document.getElementById("tsv_export_format").href;
            csvURL = unsafeWindow.VisualizationModule.exportGdocUpdated('fmt=2');
//			unsafeWindow.console.log(csvURL);
            exportGD();
        }, true);
        gdocLi.appendChild(gdocA);
        exportUL.appendChild(gdocLi);
        // get export url command
        //var csvLi = document.getElementById("excel_export_format");
        var csvLi = document.getElementById("tsv_export_format");
        csvURL = csvLi.href;
        //optain the name of current profile
        sites = document.getElementById('profile');

        download_report_ref = sites.options[sites.selectedIndex].text + ' - ' + document.title;
        
        //add second link because it will be safe up above
        var gdocASafe = document.createElement('a');
        gdocASafe.id = "gdocSafeLink";
        gdocASafe.innerHTML = "<img src='http://docs.google.com/images/doclist/icon_3_spread.gif' alt='gd' height='12' width='12'/> Export to Google Docs";
        gdocASafe.href = "#";
        gdocASafe.style.cssText = "display:inline-block;height:1.3em;margin-left:5px;padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:5px;width:auto; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF;";
        gdocASafe.addEventListener("click", function(){
            //csvURL = document.getElementById("tsv_export_format").href;
            csvURL = unsafeWindow.VisualizationModule.exportGdocUpdated('fmt=2');
			//window.console.log(csvURL);
            exportGD();
        }, true);


        var profileBar = document.getElementById("account_profile_nav");
        var profileForm = document.getElementById("profile_nav");
		profileForm.appendChild(gdocASafe);

        /* HTML to add Prefs in the future
         //create HTML for gdoc export preferences
         var expPrefLi = document.createElement('li');
         var expPrefA = document.createElement('a');
         //create HTML for pref window
         var expPrefWrapper = document.createElement('div');
         */
        //laoding layer
        var gDocLoading = document.createElement('div');
        var gDocLoadTxt = document.createElement('div');

        gDocLoading.style.cssText = "width:100%;height:100%;opacity:.65;position:absolute;z-Index:9999;display:none;background:#3F3F3F;color:#FFFFFF;font-weight:bold;font-size:2em;text-align:center;padding:100px 0px;";
        gDocLoadTxt.style.cssText = "padding:20px;text-align:center; border:1px solid #FFFFFF;opacity:1;width:400px;position:relative;left:30%;background:#000000;";
        gDocLoadTxt.innerHTML = "Uploading data to Google Docs, please be patient...";
        gDocLoading.id = "loadingDiv";
        gDocLoading.appendChild(gDocLoadTxt);
        document.body.appendChild(gDocLoading);

    }
}


function authGoogleDocs(content){


    //var gauthURL = 'https://www.google.com/accounts/AuthSubRequest??scope=http%3A%2F%2Fdocs.google.com%2Ffeeds%2Fdocuments&amp;session=1&amp;secure=0&amp;next='; + encodeURIComponent(window.location.href);
    var gauthURL = 'https://www.google.com/accounts/ClientLogin';
    var gToken = '';
    var loginInfo = 'accountType=HOSTED_OR_GOOGLE&service=writely&source=FreeEnterprise-ExportGDoc-1.00';
    loginInfo = loginInfo + '&Email=' + document.getElementById('f_email').innerHTML;
    loginInfo = loginInfo + '&Passwd=' + TEAdecrypt(GM_getValue('gac', 'none'), pqm);
    //unsafeWindow.console.log("email: "+ document.getElementById('f_email').innerHTML);
    //unsafeWindow.console.log('pass: ' +GM_getValue('gac','none'));
    //unsafeWindow.console.log(loginInfo);
    //unsafeWindow.console.log(gauthURL);
    
    GM_xmlhttpRequest({
        method: 'POST',
        url: gauthURL,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: loginInfo,
        
        onload: function(responseDetails){
        
            if (responseDetails.status == 200) {
                tokenText = responseDetails.responseText;
                gToken = tokenText.match(/Auth=[a-z0-9_-]+/i);
                //put code here to extract gToken
                upload2GDocs(gToken, content);
            }
            else {
                if (responseDetails.status == 403) {
                    passWindow(responseDetails, content);
                }
                else {
                    alert('Whoops! There was a problem logging you into Google Docs \n\n   Error: ' + responseDetails.status + ': ' + responseDetails.statusText +
                    '\n\n  Please try uploading again or you may need to re-login to Google Analytics');
                };
                showLoad(false);
            };
            
                    },
        onerror: function(responseDetails){
            alert('There seems to be a problem connecting...\n' + responseDetails.status + ': ' + responseDetails.statusText);
            
            
        },
        onreadystatechange: function(responseDetails){
            //	unsafeWindow.console.log('Ready State AuthSub: ' +responseDetails.readyState); 
        }
    });
    
}

//thanks to Eric from Google for this function!!!
function constructContentBody(docTitle, docType, contentBody, contentType) {  
  var atom = ["<?xml version='1.0' encoding='UTF-8'?>",  
              '<entry xmlns="http://www.w3.org/2005/Atom">',  
              '<category scheme="http://schemas.google.com/g/2005#kind"',  
              ' term="http://schemas.google.com/docs/2007#', docType, '"/>',  
              '<title>', docTitle, '</title>',  
              '</entry>'].join('');  
               
  var body = ['--END_OF_PART\r\n',  
              'Content-Type: application/atom+xml;\r\n\r\n',  
              atom, '\r\n',  
              '--END_OF_PART\r\n',  
              'Content-Type: ', contentType, '\r\n\r\n',  
              contentBody, '\r\n',  
              '--END_OF_PART--\r\n'].join('');  
  return body;  
}  




function upload2GDocs(authToken, content){
    //function used to upload the content to GDocs
    var gdocURL = 'http://docs.google.com/feeds/documents/private/full';
    //unsafeWindow.console.log(content);
	authToken = authToken.toString();
    if (authToken.length > 1) {
        //unsafeWindow.console.log("attempting to upload");
        //unsafeWindow.console.log(content);
        GM_xmlhttpRequest({
            method: 'POST',
            url: gdocURL,
			headers: {
				'Authorization': 'GoogleLogin ' + authToken,
		        //'Content-Length': content.length,
				//'Content-Type': 'text/csv; charset=ISO-8859-1',
                'Content-Type': 'multipart/related; boundary=END_OF_PART',
                'Slug': download_report_ref+'.csv'
				
			
            },
            data: constructContentBody(download_report_ref, 'spreadsheet', content, 'text/csv'),
            onreadystatechange: function(responseDetails){
			//unsafeWindow.console.log(responseDetails.readyState);
            },
            onload: function(responseDetails){
			//window.console.log(responseDetails.status + ': '+ responseDetails.statusText);
			//unsafeWindow.console.log(responseDetails.responseHeaders);
			//window.console.log(responseDetails.responseText);
                //wait till the file is downloaded, and execute this when ready
                if (responseDetails.status == 201) {
                    var ans = confirm('Successfully uploaded to Google Docs \nFilename: ' + download_report_ref + '\n\n Click OK to open Google Docs in a new tab \n\n(you must allow popups from www.google.com)');
                    if (ans) {
                        window.open("http://docs.google.com/#all", 'external');
                    }
                    
                }
                else {
                    //unsafeWindow.console.log(responseDetails.responseHeaders);
                    //unsafeWindow.console.log(responseDetails.responseText);					
                    if (responseDetails.status == 400) {
                        retryLessWin(responseDetails);
                    }
                    else {
                        alert('Whoops! There was a problem \n\n   Error: ' + responseDetails.status + ': ' + responseDetails.statusText);
                    };
                                    };
                
                showLoad(false);
            },
            onerror: function(responseDetails){
                alert('There seems to be a problem connecting...\n' + responseDetails.status + ': ' + responseDetails.statusText);
                showLoad(false);
            }
            
        });
        
        
    }
    
}

//main function that is called if button is clicked
function exportGD(lim){
    showLoad(true);
    var name = prompt("Please name your exported report. \n \nIf you leave this blank it will appear like this:\n\n" + download_report_ref + "\n  ");
    
    if (name != null && name != "") {
        download_report_ref = name;
    }
    
    var limit = lim > 0 ? lim : 10000;
    //unsafeWindow.console.log(csvURL);
    csvURL = "https://www.google.com/analytics/reporting/" + csvURL + '&limit=' + limit.toString();
	console.log(csvURL);
    GM_xmlhttpRequest({
        method: 'GET',
        url: csvURL,
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.3',
            'Accept': 'application/atom+xml,application/xml,text/xml, application/csv;',
            'Cookie': document.cookie
        },
        onload: function(responseDetails){
            //wait till the file is downloaded, and execute this when ready
            fulldata = responseDetails.responseText;
			//	unsafeWindow.console.log(responseDetails.responseHeaders);
            authGoogleDocs(fulldata);
        },
        onreadystatechange: function(responseDetails){
            //unsafeWindow.console.log('Ready State ExportGD: ' +responseDetails.readyState); 
        }
    });
    
    //end function
}

function passWindow(response, content){
    
    var gpassDiv = document.createElement('div');
    
    gpassDiv.style.cssText = "position:absolute;width:430px;height:200px; border:4px solid #FF6D06; background-color:#E4E4E4; top:15%; left:28%; z-index:9999; padding:30px 20px 10px; text-align:center;";
    gpassDiv.innerHTML = "Whoops! There was a problem logging you into Google Docs:<br/><br/> Error: " + response.status + ': ' + response.statusText +
    "<br/><br/>Please enter your Google Docs Password<br/><br/>";
    var gpassIn = document.createElement('input');
    var gpassOk = document.createElement('a');
    var gpassCls = document.createElement('a');
    var gpassOkTxt = document.createElement('span');
    var gpassClsTxt = document.createElement('span');
    gpassOk.style.cssText = "border:1px solid blue; padding: 2px; display: inline-block; text-align: center; width: 50px;";
    gpassOkTxt.innerHTML = '&nbsp;&nbsp;&nbsp; ';
    gpassClsTxt.innerHTML = 'or click Close to cancel &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ';
    gpassIn.type = "password";
    gpassOk.href = "#";
    gpassCls.href = "#";
    gpassOk.innerHTML = "Retry";
    gpassCls.innerHTML = "Close";
    gpassDiv.appendChild(gpassIn);
    gpassOkTxt.appendChild(gpassOk);
    gpassDiv.appendChild(gpassOkTxt);
    gpassDiv.appendChild(document.createElement('br'));
    gpassDiv.appendChild(document.createElement('br'));
    gpassDiv.appendChild(gpassClsTxt);
    gpassDiv.appendChild(gpassCls);
    document.body.appendChild(gpassDiv);
    gpassOk.addEventListener('click', function(){
        var c = TEAencrypt(gpassIn.value, pqm);
        GM_setValue('gac', c);
        gpassDiv.style.display = 'none';
        //unsafeWindow.console.log('passWindow Called - set new password: '+ gpassIn.value);
        authGoogleDocs(content);
    }, false);
    
    gpassCls.addEventListener('click', function(){
        gpassIn.value = "";
        gpassDiv.style.display = 'none';
        //unsafeWindow.console.log('Close clicked: '+ gpassIn.value);
    }, false);
	    
}

function retryLessWin(response){
    var gtryDiv = document.createElement('div');
    gtryDiv.style.cssText = "position:absolute;width:425px;height:230px; border:4px solid #FF6D06; background-color:#E4E4E4; top:14%; left:28%; z-index:9999; padding:30px 20px 10px; text-align:center;";
    gtryDiv.innerHTML = "Whoops! There was a problem uploading the file into Google Docs:<br/><br/> Error: " + response.status + ': ' + response.statusText +
    "<br/><br/>This happens sometimes when trying to export more records than your internet connection can upload cleanly to Google.<br/> Would you like to try again but with fewer records?<br/><br/>Please enter the # of records to export ";
    var gtryIn = document.createElement('input');
    gtryIn.value = 5000;
    var gtryOk = document.createElement('a');
    var gtryCls = document.createElement('a');
    var gtryOkTxt = document.createElement('span');
    var gtryClsTxt = document.createElement('span');
    gtryOk.style.cssText = "border:1px solid blue; padding: 2px; display: inline-block; text-align: center; width: 100px;font-weight:bold;";
    gtryOkTxt.innerHTML = '&nbsp;&nbsp;&nbsp; ';
    gtryClsTxt.innerHTML = 'or click Close to cancel &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ';
    gtryIn.type = "text";
    gtryIn.size = "1";
    gtryOk.href = "#";
    gtryCls.href = "#";
    gtryOk.innerHTML = "Yes, try again";
    gtryCls.innerHTML = "Close";
    gtryDiv.appendChild(gtryIn);
    gtryOkTxt.appendChild(gtryOk);
    gtryDiv.appendChild(gtryOkTxt);
    gtryDiv.appendChild(document.createElement('br'));
    gtryDiv.appendChild(document.createElement('br'));
    gtryDiv.appendChild(gtryClsTxt);
    gtryDiv.appendChild(gtryCls);
    document.body.appendChild(gtryDiv);
    gtryOk.addEventListener('click', function(){
        gtryDiv.style.display = 'none';
        exportGD(gtryIn.value);
        //unsafeWindow.console.log('ExportGD called: '+ gtryIn.value);
    }, false);
    
    gtryCls.addEventListener('click', function(){
        gtryIn.value = "";
        gtryDiv.style.display = 'none';
        //unsafeWindow.console.log('Close clicked: '+ gtryIn.value);
    }, false);
}

function showLoad(show){
    var docLoad = document.getElementById('loadingDiv');
    docLoad.style.display = show == true ? "block" : "none";
}

window.addEventListener("load", function(){
    //unsafeWindow.console.debug(unsafeWindow.VisualizationModule);
    unsafeWindow.VisualizationModule.exportGdocUpdated = function(params){
        var manager = unsafeWindow.analytics.PropertyManager._getInstance();
        var newPropertyManager = unsafeWindow.analytics.PropertyManager._getNewInstance();
        manager._set(unsafeWindow.analytics.Properties._EVENT_ID, '');
        newPropertyManager._addProperties(manager._getQueryString() + '&' + params);
        var action = 'UNKNOWN';
        if (params.indexOf('fmt=0') >= 0) {
            action = 'PDF';
        }
        else 
            if (params.indexOf('fmt=1') >= 0) {
                action = 'XML';
            }
            else 
                if (params.indexOf('fmt=2') >= 0) {
                    action = 'CSV';
                }
                else 
                    if (params.indexOf('fmt=3') >= 0) {
                        action = 'TSV';
                    }
        //unsafeWindow.console.log(action);
        unsafeWindow.analytics.EventTracker.trackEvent('Export', action, newPropertyManager._get(unsafeWindow.analytics.Properties._REPORT_NAME));
        newURL = 'export' + '?' + newPropertyManager._getQueryString();
       // unsafeWindow.console.log(newURL);
        return newURL;
    };
    initz();
}, false);

