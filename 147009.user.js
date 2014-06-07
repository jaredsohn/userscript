// ==UserScript==
// @name        WMI Everlog
// @namespace   https://w3-05.sso.ibm.com/tools/wse/wmi/
// @description   add details link
// @include     https://w3-05.sso.ibm.com/tools/wse/wmi/*  
// @version     0.4.9.1
// @updateURL	https://w3-connections.ibm.com/files/form/anonymous/api/library/956c0e7f-1034-4a9e-b979-7eefe6247efd/document/5b925fdf-b3d5-4770-bb38-8ae5c9a4e035/media/WMITracking.user.js
// @resource	jqueryModelCSS	http://dev.iceburg.net/jquery/jqModal/jqModal.css
// @resource	jqueryDataTableCSS	http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables.css
// @resource	jqueryDataTableThemeCSS	http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables_themeroller.css
// @require	    http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.1.js
// @require     http://dev.iceburg.net/jquery/jqModal/jqModal.js
// @require		http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant GM_getResourceText
// ==/UserScript==
// ==/UserScript==
//var cssAboutJqm	=	GM_getResourceText('jqueryModelCSS');
/*   log
	update the function to get component name .
 */
//var	unsafeWindow = (typeof(unsafeWindow)=="undefined")?window:unsafeWindow;
var cssAboutJqm1	=	GM_getResourceText('jqueryDataTableCSS');
var cssAboutJqm2	=	GM_getResourceText('jqueryDataTableThemeCSS');
GM_addStyle(cssAboutJqm1);
GM_addStyle(cssAboutJqm2);
GM_addStyle('/* jqModal alert CSS courtesy of;   Alexandre Plennevaux <alexandre@pixeline.be>,   Brice Burgess <bhb@iceburg.net> */div.jqmAlert { /* contains + positions the alert window */  display: none;    position: fixed;  top: 0px;  right: 0px; opacity: .7;}    div.jqmAlertWindow {  height:auto;  width: auto;  margin: auto;    max-width:200px;  padding: 0 10px 10px;    background:#111;  border:1px dotted #FFF;}.jqmAlertTitle{  margin:5px 2px;  height:20px;  color:#FFF;}.jqmAlertTitle h1{  margin:5px 2px;  padding-left:5px;  padding:0;  font-size:14px;  text-transform:capitalize;  letter-spacing:-1px;  font-weight:bold;  color:#FFF;  float:left;  height:20px;}div.jqmAlert .jqmClose em{display:none;}div.jqmAlert .jqmClose {  width:20px;  height:20px;  display:block;  float:right;  clear:right;  background:transparent url(alert/close_icon_double.png) 0 0 no-repeat;}div.jqmAlert a.jqmClose:hover,div.jqmAlert a.jqmCloseHover{ background-position: 0 -20px; }div.jqmAlertContent{  border-top:px;  color:#FFF;  font:11px/14pt arial;  padding:5px 20px 5px;  margin:5px;  border:1px dotted #111;  letter-spacing:0px;  background:#111;}div.jqmAlertContent p, div.jqmAlertContent a{color:#FFF;  font:11px/14pt arial; }.clearfix:after {    content: ".";     display: block;     height: 0;     clear: both;     visibility: hidden;}.clearfix {display: inline-block;}/* Hides from IE-mac \*/* html .clearfix {height: 1%;}.clearfix {display: block;}/* End hide from IE-mac */');
if (typeof window.uneval === "undefined") { 
var $ = window.jQuery;
window.uneval = function(a){ 
return ("("+JSON.stringify(a)+")")||''; 
}; 
}
 var GM_xmlhttpRequestForIdefined = function (params) {
    var req = new XMLHttpRequest();
    
    req.open(params.method, params.url,false);
    
    for (var header in params.headers) {     if (!params.headers.hasOwnProperty(header)) continue;
        req.setRequestHeader(header, params.headers[header]);
    }
    
    req.onreadystatechange = function () {
            params.onload(req);
    };  
    req.send(params.data);
};
var Sys={};
var ua=window.navigator.userAgent.toLowerCase();
if (ua.indexOf("firefox")!=-1){
	Sys.browserNo = ua.match(/firefox\/([\d.]+)/)[1];
	Sys.browserName = "firefox";
}else{
	Sys.browserNo = ua.match(/chrome\/([\d.]+)/)[1];
	Sys.browserName = "chrome";
}
//============================Package end================
//==========WMI Tracking Tool code start=================
function setCookie(name,value)
{
var Days = 30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg)) return unescape(arr[2]);
else return null;
}
function getInformation()
{
	var element = {};
	element.input = [];
	element.textarea = [];
	element.option = [];
	var IsubmitFormInformation = document.forms[1];
	var inputs = IsubmitFormInformation.getElementsByTagName("input");
	var options = IsubmitFormInformation.getElementsByTagName("option");
	var textarea = IsubmitFormInformation.getElementsByTagName("textarea");
	for (var i=0; options[i]; i++)
	{
		if(options[i].selected)
		{
			element.option.push({id:options[i].id, name:options[i].parentNode.name, text: options[i].text, value:options[i].value});
		}
	}
	for(var j=0; inputs[j]; j++)
	{
		if(inputs[j].type!="hidden"&&inputs[j].type!="submit")
			element.input.push({id:inputs[j].id, name:inputs[j].name, value:inputs[j].value});
	}
	for(var k=0; textarea[k]; k++)
	{
		element.textarea.push({id:textarea[k].id, name:textarea[k].name, value:textarea[k].value});
	}
	return uneval(element);
}
var submitCallBackFun = function()
{
	
	var arg = {
		method: 'POST',
		url: sLocation + '/component',
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		"Content-Type": "application/x-www-form-urlencoded",
		},
		//synchronous: true, // FF will crash if the network is slow. 
		data: "",
		onload: function(responseDetails) {
		//alert("WMI Tracking: " + responseDetails.status +' ' + responseDetails.statusText);
		},
		onerror: function(e){
			alert(e);
		}
	};
	try
	{
		//alert(getCookie("wsewmiID"));
		//alert(GM_getValue("wsewmiID"));
		//alert(document.getElementById("cd_version").parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.value);
		var inputs = {};
		var submitFormToServer = document.forms[1];
		var inputs = submitFormToServer.getElementsByTagName("input");
		var listbox = submitFormToServer.getElementsByTagName("select");
		var textarea = submitFormToServer.getElementsByTagName("textarea");
		
		var cdVersion = document.getElementById("cd_version")?document.getElementById("cd_version"):document.getElementById("cdVersion")?document.getElementById("cdVersion"):document.getElementById("version")?document.getElementById("version"):document.getElementById("cdApplicationVersion");
		var cdApplication = document.getElementById("cd_application")?document.getElementById("cd_application"):document.getElementById("cdApplication")?document.getElementById("cdApplication"):document.getElementById("application");
		//var wsewmiID = getCookie("wsewmiID"); //by cookie
		//var wsewmiID = GM_getValue("wsewmiID"); //by GM
		//------------------------update for get component Name------------------------------------
		var componentId='';
		if(window.location.pathname.search(/formSwitch/)==-1){
            for (var i =0; i<inputs.length; i++) {
                if (inputs[i].type=='text') {
                    componentId = inputs[i].value;
                    break;
                
                }
            }
        }else{
            componentId = document.getElementById("cd_form").value;
        }
		/*if(document.getElementById("cd_text")){ // Text dictionary 
		componentId = document.getElementById("cd_text").value;
		}else if(document.getElementById("cd_menu_item")){ // Menu item
		componentId = document.getElementById("cd_menu_item").value;
		}else if(document.getElementById("cdDocumentFieldName")){ // DMF
		componentId = document.getElementById("cdDocumentFieldName").value;
		}else{
		componentId = cdVersion.parentNode.parentNode.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.value;
		}*/
		//-------------------------update end-------------------------------------
		var tempData = "uid="  + GM_getValue("wsewmiID") + "&componentId="+componentId+"&appName=" + cdApplication.value + "&version="+ cdVersion.value +"&content=" + getInformation();
		//alert(tempData);
		arg.data = tempData + "";
		if(Sys.browserName!="chrome")
			GM_xmlhttpRequest(arg);
		else
			GM_xmlhttpRequestForIdefined(arg);
	}
	catch(e)
	{
		alert(e+"");
	}
}
var loginCallBack = function()
{
	//setCookie("wsewmiID", document.getElementById("username").value); // by cookie
	GM_setValue("wsewmiID", document.getElementById("username").value); // by GM
}
var setSubmitCallBack = function(callBackFun)
{
	var forms = document.forms;
	for(var i=0; forms[i]; i++)
	{
		if(forms[i].method=="post")
		{
			forms[i].id = "wmi_submit_" + i;
			forms[i].onsubmit = callBackFun;
		}
	}
}
Array.prototype.inArray = function (value)
// Returns true if the passed value is found in the
// array.  Returns false if it is not.
{
    var i;
    for (i=0; i < this.length; i++) {
        // Matches identical (===), not just similar (==).
        if (this[i] === value) {
            return true;
        }
    }
    return false;
};
 
var changeUser = function(){
	username = prompt("Please input your intranet id");
	GM_setValue("wsewmiID", username); //by GM
}
/*
Script Start
*/
var IgnoreURL = ["https://w3-05.sso.ibm.com/tools/wse/wmi/protect/menu.wss?id=23","/tools/wse/wmi/protect/select-applicationConfigured.wss"];
//var username = getCookie("wsewmiID"); //by cookie
var username = GM_getValue("wsewmiID"); //by GM
var sLocation = "http://9.115.144.254:821" // server root location
//alert(username);
//alert(window.location.href + "/" + IgnoreURL.inArray(window.location.href))
if(document.getElementById("username")){
	setSubmitCallBack(loginCallBack);
	//GM_setValue("wsewmiID", username)
	//setCookie("wsewmiID", username);
}else{
	if(username == null || username == "null") {
	username = prompt("Please input your intranet id");
	GM_setValue("wsewmiID", username); //by GM
	//setCookie("wsewmiID", username); //by cookie
	}
	if(!(IgnoreURL.inArray(window.location.href)||IgnoreURL.inArray(window.location.pathname))){
	//alert("addsubmit");
	setSubmitCallBack(submitCallBackFun);
	}else{
		console.log('already here.');//
		var cmdButton_Confirm = document.getElementsByName('cmd')[0];
		cmdButton_Confirm.onclick=function(){
			var formTable = document.getElementsByName('selectApplicationForm')[0].getElementsByTagName('table')[1].getElementsByTagName('input');
			var keyValue = 1;
			sessionStorage.clear();
			for(var i=0;i<formTable.length;i++){
				if(formTable[i].type.toUpperCase()=="CHECKBOX"&&formTable[i].checked ==true){
					sessionStorage.setItem('key'+keyValue,formTable[i].parentNode.parentNode.getElementsByTagName('td')[1].innerHTML);
					sessionStorage.setItem('value'+keyValue,formTable[i].parentNode.parentNode.getElementsByTagName('td')[2].innerHTML);
					keyValue++;
				}
			}
		}
	}
	//GM_setValue("wsewmiID", username)
	//
	}
	
// deserialize the params in URL
var deserialize = function(paramStr){
	var tempArr = [];
	var paramStrArr = paramStr.split("&");
	for(var i=0; i< paramStrArr.length;i++){
		
		tempParam = paramStrArr[i].split("=");
		tempArr[tempParam[0]] = tempParam[1];
		//alert(tempParam[0] + "/" + tempParam[1]);
	}
	
	return tempArr;
	
}
//getDatafor
 function getDataSet() {  
        var aDataSet = new Array();  
        $.ajaxSetup( {  
            async : false//设置get、post同步  
           // timeout: 5000
        }); 
        var urlString,componentId= '';
        var queryStrToMongo = {};
		var submitFormToServer = document.forms[1];
		if (submitFormToServer!=undefined) {
		    var inputs = submitFormToServer.getElementsByTagName("input");
	        var forms = document.forms;
			for (var i=0; forms[i]; i++){
				if(forms[i].method=="post"){
					 if(window.location.pathname.search(/formSwitch/)==-1){
			            for (var i =0; i<inputs.length; i++) {
			                if (inputs[i].type=='text') {
			                    componentId = inputs[i].value;
			                    break;
			                
			                }
			            }
			        }else{
			            componentId = document.getElementById("cd_form").value;
	     		   }
				}
			}
		}
        if(2==sessionStorage.length){
        	console.log("A");
        	queryStrToMongo.appName = sessionStorage.key1;
        	queryStrToMongo.version = sessionStorage.value1;
    	}else if(sessionStorage.length>2){
    		console.log("B");
			var keyWantFind = parseInt(prompt("Please input your wanted find column number"));	
			if(isNaN(keyWantFind)||keyWantFind>sessionStorage.length/2){
				console.log("C");
  				queryStrToMongo.appName = sessionStorage.key1;
        		queryStrToMongo.version = sessionStorage.value1;
  			}else{
  				console.log("D");
  				queryStrToMongo.appName = sessionStorage.getItem('key'+keyWantFind);
        		queryStrToMongo.version = sessionStorage.getItem('value'+keyWantFind);
  			}
  		}else{
  			console.log("E");
  			queryStrToMongo.appName	=	"SorryToArray";
  			queryStrToMongo.version	=	"V8";
  		}
  		if(componentId!='')
  			queryStrToMongo.componentId = componentId;
  			urlString = "http://9.115.144.254:821/component/listbyqueryNolimit/"+JSON.stringify(queryStrToMongo);
		   	console.log('test ajax');
		   	var arg = {
				method: 'GET',
				url: urlString,
				//synchronous: true, // FF will crash if the network is slow. 
				headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				"Content-Type": "application/x-www-form-urlencoded",
				},
				data: "",
				onload: function(responseDetails) {
		            var data = eval("("+responseDetails.responseText+")"); 
		          if (responseDetails.statusText=='OK'||responseDetails.status==200) {
		            for(var i=0;i<data.length;i++){
		            	var obj=[data[i].uid,data[i].componentId,data[i].appName,data[i].version,data[i].content,data[i].SubmitTime];//,data[i].content,
		            	aDataSet.push(obj);
		            }
		          oTable = $('#exampleDataGrid').dataTable({ 
					 "aaData":aDataSet,
			    	 "aoColumns": [
			            { "sTitle": "uid" },
			            { "sTitle": "componentId" /*,
			            "fnRender": function(obj) {
				                    var sReturn = "<a href='<a href='http://9.115.144.254:821"+obj.aData[4]+"' title='"+obj.aData[4]+"' alt='"+obj.aData[4]+"'>"+obj.aData[1]+"</a>";//obj.iDataColumn列號
				                    return sReturn;
					                }*/
			        	},
			            { "sTitle": "appName" },
			            { "sTitle": "Version"},
			            { "sTitle": "Content",
			             "bVisible": false},
			            {"sTitle": "SubmitTime"}
			        ],
			        "bStateSave" : true, 
			        "bRegex" : true,
			        "bJQueryUI" : true, 
			        "iDisplayLength" : 10, 
			        "bProcessing" : true,
			        "iCookieDuration":1800,
			        "iScrollLoadGap":10,
			        "bAutoWidth":true,
			        "bFilter":true,
			        "bLengthChange":false,
			        "sPaginationType" : "full_numbers"
	   			});
				oTable.$('tr').click(function () {
						       var aData = oTable.fnGetData( this );
						       window.open ("http://9.115.144.254:821"+aData[4], "newwindow", "height=800, width=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
						     });
					}
				},
				onerror: function(e){
					console.log(e);
				}
			};
			if(Sys.browserName =="chrome"){
				$.get(urlString).success(function(data) { 
	        	console.log('success');	 
	            data = eval(data); 
	            for(var i=0;i<data.length;i++){
	            	var obj=[data[i].uid,data[i].componentId,data[i].appName,data[i].version,data[i].content,data[i].SubmitTime];//,data[i].content
	            	aDataSet.push(obj);
	            }
	           oTable = $('#exampleDataGrid').dataTable({ 
					 "aaData":aDataSet,
			    	 "aoColumns": [
			            { "sTitle": "uid" },
			            { "sTitle": "componentId" /*,
				        "fnRender": function(obj) {
				                    var sReturn = "<a href='http://9.115.144.254:821"+obj.aData[4]+"' title='"+obj.aData[4]+"' alt='"+obj.aData[4]+"'>"+obj.aData[1]+"</a>";//obj.iDataColumn列號
				                    return sReturn;
					                }*/
				        },
			            { "sTitle": "appName"},
			            { "sTitle": "Version"},
			            { "sTitle": "Content",
			             "bVisible": false},
			            {"sTitle": "SubmitTime"}
			        ],
			        "bStateSave" : true, 
			        "bRegex" : true,
			        "bJQueryUI" : true, 
			        "iDisplayLength" : 10, 
			        "bProcessing" : true,
			        "iCookieDuration":1800,
			        "iScrollLoadGap":10,
			        "bAutoWidth":true,
			        "bFilter":true,
			        "bLengthChange":false,
			        "sPaginationType" : "full_numbers"
	    });
		oTable.$('tr').click(function () {
		       var aData = oTable.fnGetData( this );
		       window.open ("http://9.115.144.254:821"+aData[4], "newwindow", "height=800, width=400, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");
		     });
	        }).error(function() { console.log("error"); }).complete(function() { console.log("complete"); });
			}else{
				GM_xmlhttpRequest(arg);
			}  
    }  
    
//Dock init by jQuery
//*
$(document).ready(function() {
function getPageOperation(){
    	var pageOperation = {};
		var pageOperationArr = document.getElementsByTagName('table')[1].getElementsByTagName('a');
		var judageCondition ='';
		var judageConditionNext = '';
		if (pageOperationArr!=undefined&&pageOperationArr.length>1) {
		 judageCondition = pageOperationArr[0].innerHTML.trimLeft().trimRight();
		 judageConditionNext = pageOperationArr[1].innerHTML.trimLeft().trimRight();
		}else if (pageOperationArr!=undefined&&pageOperationArr.length==1) {
			judageCondition = pageOperationArr[0].innerHTML.trimLeft().trimRight();
		}
		if(judageCondition=="&lt;&nbsp; Previous"&&judageConditionNext=="Next &gt;&nbsp;") {
			pageOperation.pagePreviousDisplay = "";
			pageOperation.pageNextDisplay = "";
		}else if(judageCondition == "&lt;&nbsp; Previous"&&judageConditionNext != "Next &gt;&nbsp;") {
			pageOperation.pagePreviousDisplay = "";
			pageOperation.pageNextDisplay = "none";
		}else if(judageCondition == "Next &gt;&nbsp;") {
			pageOperation.pagePreviousDisplay = "none";
			pageOperation.pageNextDisplay = "";
		}else{
			pageOperation.pagePreviousDisplay = "none";
			pageOperation.pageNextDisplay = "none";
		}
		return pageOperation;
    } 
	$("body").append('<div class="jqmAlert" id="WMIbackup"><input type="button" value="=" onclick="document.getElementsByClassName(\'jqmAlertWindow\')[0].style.display=\'block\'"><input type="button" name="隐藏" value="-" onclick="document.getElementsByClassName(\'jqmAlertWindow\')[0].style.display=\'none\'"><div id="ex3b" class="jqmAlertWindow"><div  class="jqmAlertTitle clearfix"><h1>Welcome!</h1></div><div class="jqmAlertContent"><p><span id="WMIbackupUID">'+ username+'</span><br /><a id="notyou" href="#">It\'s not you?</a></p></div><div class="jqmAlertTitle clearfix"><h1>Quick Action</h1></div><div class="jqmAlertContent"><p><a id="WMIbackupSubmit" href="#">Submit</a><br /><a id="WMIbackupToBottom" href="#">To Bottom</a><br /><a id="WMIbackupToTop" href="#">To Top</a><br style="display:'+getPageOperation().pagePreviousDisplay+'"/><a id="WMIbackupPreP" style="display:'+getPageOperation().pagePreviousDisplay+'" href="#">Previous</a><br /><a id="WMIbackupNextP" style="display:'+getPageOperation().pageNextDisplay+'"  href="#">Next</a><br style="display:'+getPageOperation().pageNextDisplay+'"><a id="WMIbackupRegP" href="#" style="display:none">RegExp To Change "Class"</a></p></div><div class="jqmAlertTitle clearfix"><h1>History</h1></div><div class="jqmAlertContent"><p><a id="WMIbackupAppLog" href="#">Application log</a></p></div></div></div>');
	//<div class="jqmAlertTitle clearfix"><h1>Quick Action</h1></div>
	//<div class="jqmAlertContent"><p><a id="WMIbackupToBottom" href="#">To Bottom</a></p></div>
	$("#WMIbackupAppLog").click(function(){
		if (document.getElementById("mybg")) {
			document.getElementById("mybg").parentNode.removeChild(document.getElementById("mybg"));
			document.body.style.overflow = "scroll";
		}else{
		 mybg = document.createElement("div");
		 mybg.setAttribute("id","mybg");
		 mybg.style.background = "gray",
		 mybg.style.width = "70%";
		 mybg.style.height = "60%";
		 mybg.style.position = "absolute";
		 mybg.style.top = "0";
		 mybg.style.left = "0";
		 mybg.style.zIndex = "500";
		 mybg.style.opacity = "0.9";
		 mybg.style.filter = "Alpha(opacity=90)";
		 document.body.appendChild(mybg);
		 var mybg = document.getElementById('mybg');
		 document.body.style.overflow = "hidden";
		 $('#mybg').append("<div align='right'><input id='closeDivOverTable' type='button'  value='X'></p>");
		 $('#mybg').append('<table align="left" cellpadding="0" width="95%" height="100%" cellspacing="0" border="0" id="exampleDataGrid"></table>');
          getDataSet();  
$("#closeDivOverTable").click(function(){
	document.getElementById("mybg").parentNode.removeChild(document.getElementById("mybg"));
	document.body.style.overflow = "scroll";
	return false
		});
}
})
	$("#WMIbackupRegP").click(function(){
		var tempChangeMain = function (frm, ifr,urlPara,changeField) {
		//id #### regExp format;g/i/m #### replaceValue)
		var paramArr = changeField.split("####");
		ifr.src =urlPara[pageNo].href.toString();
		var regStr = new RegExp(paramArr[1].split(";tt;")[0],(typeof(paramArr[1].split(";tt;")[1])=="undefined")?"":paramArr[1].split(";tt;")[1]);
		ifr.onload = function () {
			var repalaceStr = frm.document.getElementById(urlPara[0]).value;
			if (repalaceStr.search(regStr) != -1) {
						frm.document.getElementById(urlPara[0]).value = repalaceStr.replace(regStr,paramArr[2]);
						var sumArr = frm.document.getElementsByName("cmd");
						var sum = '';
						for (var i = 0; i < sumArr.length; i++) {
							if (sumArr[i].value == "Save and return" && sumArr[i].type == "submit") {
								sum = sumArr[i];
								break;
							}
						}
						sum.click();
						ifr.onbeforeunload() = function () {
							pageNo++;
							tempChangeMain(frm, ifr,urlPara,changeField);	
						};
					} else {
						pageNo++;
						tempChangeMain(frm, ifr,urlPara,changeField);
					}
		};						
	};
		var aTagInTable=document.getElementsByTagName('form')[1].getElementsByTagName('table')[1].getElementsByTagName('a');
		if(aTagInTable.length!=0&&typeof(aTagInTable)!="undefined"){
			var changeField= prompt("Please input params as format(img_button####d{3}(;tt;g)####ibm-btn-arrow-sec):");
			var paramArr = changeField.split("####");
			var regexpArr = paramArr[1].split(';tt;');
			var regexpStr = new RegExp(regexpArr[0],(typeof(regexpArr[1])=="undefined")?"":regexpArr[1]);
			if (paramArr.length==3 && typeof(regexpStr)!='undefined') {
				var frmto = document.createElement("iframe");
				document.body.appendChild(frmto);
				frmto.id = "name";
				frmto.name = 'fileUploaderEmptyHole';
				frmto.width = '100%';
				frmto.height = 1000;
				frmto.marginHeight = 600;
				frmto.marginWidth = 800;
				var ifr = frames.document.getElementById("name");
				var frm = frames.document.getElementById("name").contentWindow;
				var pageNo = 0;
				tempChangeMain(frm, ifr,aTagInTable,changeField);
			}else{
				alert("The format of the input field value is error.");
			}
		}else{
			alert("No records can edit.");
		}
		return false;
	})
	$("#WMIbackupSubmit").click(function(){
			var sumArr=document.getElementsByName("cmd");
			var sum='';
			for (var i=0; i < sumArr.length; i++) {
			if(sumArr[i].value=="Save"&&sumArr[i].type=="submit"){
				sum = sumArr[i];
				break;
			  }
			}
			sum.click();
			return false
	})
	
	$("#notyou").click(function(){
			username = prompt("Please input your intranet id");
			GM_setValue("wsewmiID", username); //by GM
			$("#WMIbackupUID").html(username);
			return false
	}) 
	
	$("#WMIbackupToBottom").click(function(){
		
		$(document).scrollTop($(document).outerHeight());
			
			return false
	}) 
	
	$("#WMIbackupToTop").click(function(){
		
		$(document).scrollTop(0);
			
			return false
	}) 
	
	var pagNav = $("#wmi_submit_1 a.blue-med-dark[role='navigation']");
	//alert(pagNav[0].href);
	var pageParam = window.location.href.split("?");
	
	if(pageParam.length == 2){
	pageParam = deserialize(pageParam[1]);
	}
	
	//alert(pagNav.length);
	if(pagNav.length>0){
	if(pagNav.length == 1){
	if(pageParam['page']){
		$("#WMIbackupNextP").click(function(){
		alert("This is the last page.");
			//$("#wmi_submit_1").submit();
			return false
		});
	
		$("#WMIbackupPreP").attr('href',pagNav[0].href);
		}else{
		$("#WMIbackupPreP").click(function(){
		alert("This is the first page.");
			//$("#wmi_submit_1").submit();
			return false
		});
	
		$("#WMIbackupNextP").attr('href',pagNav[0].href);
		}
	}else if(pagNav.length == 2){
		$("#WMIbackupPreP").attr('href',pagNav[0].href);
		$("#WMIbackupNextP").attr('href',pagNav[1].href);
	}
	}else{
		$("#WMIbackupPreP").click(function(){
			var pageOperationArr = document.getElementsByTagName('a');
			for (var i = 0; i < pageOperationArr.length; i++) {
				var judageConditionNext = pageOperationArr[i].innerHTML.trimLeft().trimRight();
				if(judageConditionNext == "&lt;&nbsp; Previous") {
					pageOperationArr[i].click();
				}
			}
			//$("#wmi_submit_1").submit();
			return false
		});
		$("#WMIbackupNextP").click(function(){
			var pageOperationArr = document.getElementsByTagName('a');
			for (var i = 0; i < pageOperationArr.length; i++) {
				var judageConditionNext = pageOperationArr[i].innerHTML.trimLeft().trimRight();
				if(judageConditionNext=="Next &gt;&nbsp;") {
					pageOperationArr[i].click();
				}
			}
		
			//$("#wmi_submit_1").submit();
			return false
		});
	}
	
	
	$('#WMIbackup').jqm({
    target: 'div.jqmAlertContent',
    overlay: 0
    }); 
	$('#WMIbackup').jqmShow();
}); 
//*/