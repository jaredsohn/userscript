// HighLearn user script
// version 2.6
// 2009-06-29
// Copyright (c) 2007-2009, Yehuda B.
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
//
// ==UserScript==
// @name           HighLearn
// @namespace      http://yehudab.com
// @description    Fix display issues, navigation and search for High Learn web application used by some of the Universities in Israel. Version: 2.6
// @include        http://virtual*.tau.ac.il/*
// @include        http://ivirtual*.tau.ac.il/*
// @include        https://ivirtual*.tau.ac.il/*
// @include        http://owl.huji.ac.il/*
// @include        http://virtualnew.haifa.ac.il/*
// @include        https://virtualnew.haifa.ac.il/*
// @include        http://portal.colman.ac.il/*
// @include        http://portali.colman.ac.il/*
// @include        http://www.hl.derby.co.il/*
// @include        http://hl2.bgu.ac.il/*
// @include        http://highlearn2002.cet.ac.il/*
// @include        http://elearn.sce.ac.il/*
// @include        http://hl2.biu.ac.il/*
// @include        https://learn.sapir.ac.il/*
// @include        http://learn.sapir.ac.il/*
// @include        http://e-learn.jct.ac.il/*
// @include        http://highlearn.afeka.ac.il/*
// @include        https://highlearn.afeka.ac.il/*
// @include        http://highlearn.smkb.ac.il/*
// @include        http://hl.hit.ac.il/*
// @include        http://elearn.netanya.ac.il/*
// @include        http://highlearn.bezalel.ac.il/*
// @include        http://online.haifa.ac.il/
// @unclude        http://highlearn.macam.ac.il/*
// ==/UserScript==
var uWindow;
if (typeof unsafeWindow == 'undefined')
	uWindow = window;
else
	uWindow = unsafeWindow;
function fixEditAssignments()
{
	var StudentsList = document.getElementById("StudentsList");
	if (StudentsList != null)
	{
		StudentsList.style.position = "static";
	}
}
function fixForum()
{
	var vcCourseGUID="";
	var vcCourseID="";
	var id="";
	var thisUrlParams = window.location.href.substr(window.location.href.indexOf("?")+1);
	var paramsArr = thisUrlParams.split("&");
	var i, paramPair, paramHash = new Array();
	for (i = 0; i < paramsArr.length; i++)
	{
		paramPair = paramsArr[i].split("=");
		paramHash[paramPair[0]] = paramPair[1];
	}
	vcCourseGUID = paramHash["vcCourseGUID"];
	vcCourseID = paramHash["vcCourseID"];
	id = paramHash["id"];
	uWindow.ToggleMessage = function(MsgID)
	{
		var TrCloseMsg;
		var TDCloseMsg;

		TrCloseMsg=document.getElementById("MsgTR_"+MsgID);
		TDCloseMsg=document.getElementById("MsgTD_"+MsgID);
		if(TrCloseMsg.style.display=="")
		{
			TrCloseMsg.style.display="none";
		}
		else
		{
			if(TDCloseMsg.innerHTML.match(/^\s*$/))
			{
				var MsgOrder=TDCloseMsg.pos;
				
				var Url="GetMessageBody.asp?page=1&LeStatus=1&searchType=&substring=" +
					"&vcCourseGUID=" + vcCourseGUID + 
					"&vcCourseID=" + vcCourseID + 
					"&id=" + id + 
					"&openForum=&FromItem=&Sentfrom=" +
					"&MsgOrder=" + MsgOrder +
					"&MsgID=" + MsgID;
				var ResultHTML=uWindow.sendXml(Url,null);
				TDCloseMsg.innerHTML=ResultHTML; //xmlhttprequest-fill in message data
			}

			TrCloseMsg.style.display="";
		}
	}
}
function fixBoardsAddMsg()
{
	fixAddMsg();
}
function fixForumAddMsg()
{
	fixAddMsg();
}	
function fixAddMsg()
{
	var msgBody = document.getElementById("body");	
	if (msgBody == null)
	{
		var bodyArr = document.getElementsByName("body");
		if (bodyArr.length > 0) 
		{
			msgBody = bodyArr[0];
			msgBody.id = "body";
			msgBody.style.display = "none";
		}
	}
	if (msgBody != null)
	{
		var myBody = msgBody.cloneNode(true);
		msgBody.parentNode.insertBefore(myBody, msgBody);
		myBody.id = "myBody";
		myBody.name = "myBody";
		myBody.style.display = "inline";
		myBody.style.width = "83.3333%";
		myBody.style.height = "280px";
		myBody.className = "textbox";
		if (myBody.value.match(/^\s*$/))
		{
			myBody.value = "";
		}
		var editor = document.getElementById("edwin");
		if (editor != null) 
		{
			editor.style.display = "none";
			editor.src = "about:blank";
		}
		var iframeAttach = document.getElementById("iframeAttach");
		if (iframeAttach != null)
		{
			iframeAttach.scrolling = "no";
		}	
		var subjects = document.getElementsByName("subject");
		if (subjects.length > 0) 
		{
			subjects[0].style.width = "80%";
		}
	}
	uWindow.check = function() {
	    // fileName = trim(iframeAttach.iframeUpload.FormUplaodFile.fileUpload.value);
		fileName = "";
		// var form = document.getElementById("frmMessage");
		var subjects = document.getElementsByName("subject");
		if (subjects.length > 0 && uWindow.trim(subjects[0].value) == "") {
	        alert("\u05D9\u05E9 \u05DC\u05D4\u05E7\u05DC\u05D9\u05D3 \u05DB\u05D5\u05EA\u05E8\u05EA");
	        return false;
	    }
		// frames.edwin.savetext();
	    if (uWindow.trim(document.getElementById("myBody").value) == "") {
	        alert("\u05D9\u05E9 \u05DC\u05D4\u05E7\u05DC\u05D9\u05D3 \u05D0\u05EA \u05EA\u05D5\u05DB\u05DF \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4");
	        return false;
	    }
	    document.getElementById("body").value = fixHtml(document.getElementById("myBody").value);
	    if (fileName != "") {
	        alert("\u05D9\u05E9 \u05DC\u05DC\u05D7\u05D5\u05E5 \u05E2\u05DC \u05DB\u05E4\u05EA\u05D5\u05E8 \u05D4\u05D4\u05D5\u05E1\u05E4\u05D4 \u05DC\u05E6\u05D5\u05E8\u05DA \u05D4\u05D5\u05E1\u05E4\u05EA \u05E7\u05D9\u05E9\u05D5\u05E8");
	        return false;
	    }
	    document.getElementById("imgSubmit").disabled = true;
	    return true;
	}
}
function fixForumAddAttch()
{
	fixAttachments();
}

function fixAttachments()
{
	var iframeUpload = document.getElementById("iframeUpload");
	if (iframeUpload != null)
	{
		iframeUpload.scrolling = "no";
	}
	uWindow.SendAttach = function() {
	    fileName = uWindow.trim(uWindow.iframeUpload.document.forms[0].fileUpload.value);
	    if (fileName == "") {
	        alert("\u05D9\u05E9 \u05DC\u05E6\u05E8\u05E3 \u05E7\u05D5\u05D1\u05E5");
	        return false;
	    }
	    return true;
	}
}

function fixShowAssignment()
{
	fixAttachments();
}
function fixHtml(s)
{
	s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	var httpRE = /((([\w]+:)?\/\/)(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.,\d\w]|%[a-fA-f\d]{2,2})*)*(\?((&amp;)?([-+_~.,\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.,\d\w]|%[a-fA-f\d]{2,2})*)?)/g; 
	
	s = s.replace(httpRE, "<a href=\"$1\" target=\"_blank\" dir=\"ltr\">$1</a>");
	return s;
}

function fixFileUpload()
{
	var fileUpload = document.getElementById("fileUpload");
	if (fileUpload != null)
		fileUpload.size = "";
}

function fixBareketUploadFile()
{
	uWindow.ReturnValue = function(Command) {
	    var FieldName = "Name" + Command;
		var fileUploadField = uWindow.frames[0].document.forms[0].fileUpload;
	    if (document.getElementById("ExtractFiles").checked) {
	        document.getElementById("ExtractFilesHidden").value = 1;
	    }
	    if (Command == "UploadFile") {
	        filename = uWindow.trim(fileUploadField.value);
	        if (filename == "" || (filename == "http://")) {
	            alert("\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D4\u05E9\u05D0\u05D9\u05E8 \u05D0\u05EA \u05D4\u05E9\u05DD \u05E8\u05D9\u05E7");
	            return false;
	        }
	    }
	    if (Command == "AddLink") {
	        uWindow.top.opener.document.getElementById("io_media_one").value = document.getElementById(FieldName).value;
	        uWindow.top.opener.document.forms[0].FolderType.value = "other";
	        uWindow.top.opener.document.forms[0].MediaTarget.value = "other";
	        uWindow.top.opener.focus();
	        uWindow..close();
	        return false;
	    } else {
	        fileName = uWindow.trim(fileUploadField.value);
			var ThisForm = uWindow.document.forms["ThisForm"];
	        if (fileName.indexOf("#") != -1) {
	            alert("\u05D4\u05E9\u05DD \u05DE\u05DB\u05D9\u05DC \u05EA\u05D5\u05D5\u05D9\u05DD \u05DC\u05D0 \u05D7\u05D5\u05E7\u05D9\u05D9\u05DD");
	            return false;
	        }
			ThisForm.elements["Action"].value = "Submit";
	        currFolder = ThisForm.elements["Folder"].value;
	        if (top.opener.location.href.toLowerCase().indexOf("editdocument.asp") > -1) {
				var MediaTarget = uWindow.top.opener.document.forms[0].elements["MediaTarget"];
	            Media = MediaTarget.value;
	            if (currFolder.toLowerCase().indexOf("library") != -1) {
	                MediaTarget.selectedIndex = 0;
	            } else if (currFolder.toLowerCase().indexOf("campus\\media") != -1) {
	                MediaTarget.selectedIndex = 2;
	            } else {
	                MediaTarget.selectedIndex = 1;
	            }
	        }
	        flag = uWindow.CommandUploadFile_Exec(currFolder, fileName);
	        if (flag) {
	            uWindow.showLoader();
	        }
	    }
	    return true;
	}
	uWindow.CommandUploadFile_Exec = function(CurrentFolder, SubmitValue) {
	    var ReturnValue = 0;
	    ReturnValue = uWindow.CheckFileType(SubmitValue);
	    var Result;
	    if (ReturnValue != 0) {
	        return false;
	    }
	    NewFileName = CurrentFolder;
		var ThisForm = uWindow.document.forms["ThisForm"];
	    Action = ThisForm.Action.value;
	    Folder = escape(ThisForm.Folder.value);
	    Caller = ThisForm.Caller.value;
	    FileType = ThisForm.FileType.value;
	    ExtractFilesHidden = ThisForm.ExtractFilesHidden.value;
	    DefaultFolderNum = ThisForm.DefaultFolderNum.value;
	    DefaultFolder = escape(ThisForm.DefaultFolder.value);
	    Command = "undefined";
		var fileUploadField = uWindow.frames[0].document.forms[0].fileUpload;
		fileName = uWindow.trim(fileUploadField.value);
	    var UrlToComeBack = "/Bareket/uploadfile.asp?Action=" + Action + "&Folder=" + Folder + "&Caller=" + Caller + "&FileType=" + FileType;
	    UrlToComeBack = UrlToComeBack + "&ExtractFilesHidden=" + ExtractFilesHidden + "&DefaultFolderNum=" + DefaultFolderNum + "&DefaultFolder=" + DefaultFolder;
	    UrlToComeBack = UrlToComeBack + "&Command=" + Command + "&fileName=" + escape(fileName);
	    try {
	        uWindow.frames[0].submitForm(escape(CurrentFolder), escape(UrlToComeBack), 0);
	    } catch (e) {
	        alert("*****Couldn't write the file");
	        return false;
	    }
	    return true;
	}
	
	var iframeUpload = document.getElementById("iframeUpload");
	if (iframeUpload != null)
	{
		iframeUpload.scrolling = "no";
	}	
	
}

function fixToc()
{
	uWindow.setMainStatus = function()
	{
		uWindow.MainStatus = 'open';
	}
	var allA = document.getElementsByTagName("A");
	var i, clickScript, l = allA.length;
	for (i = 0; i < l; i++)
	{
		if (allA[i].href == "javascript:NoOp();" || allA[i].href == "javascript:void(0)")
		{
			allA[i].href = "#";
			clickScript = allA[i].previousSibling.previousSibling.getAttribute("onclick") + ";return false";
			allA[i].setAttribute("onclick", clickScript);
			//allA[i].addEventListener('click',function (e) {
			//	alert(e.target.previousSibling.previousSibling.tagName);
			//	}, false);
		}
	}
	addGlobalStyle(".hdn {display: block !important}");	
}

function fixSearch()
{
	uWindow.initForm = function () {
		 uWindow.updateForm();
		 uWindow.resetForm();
//		 toggleSearchMethod();
//		 updateFields();
//		 resizeForm();
	}
	uWindow.keyPressed = function() {}
	uWindow.myKeyPressed = function(e) {
	}
	var Phrase = document.getElementById("Phrase");
	if (Phrase != null)
	{
		Phrase.addEventListener('keypress',function (e) {
			var key = e.which;
			if ( key == 13 ) {
				uWindow.searchItems();
			}
		},false);
//		Phrase.onkeypress = uWindow.myKeyPressed;
//		if (Phrase.captureEvents) 
//			Phrase.captureEvents(Event.KEYPRESS);
	}
	uWindow.updateItemType = function() {return true;}
	uWindow.updateClientType = function() {return true;}

	
	uWindow.searchItems = function() {
	    uWindow.InitKBItem();
	    uWindow.InitTest();
	    uWindow.checkForm();
	    if (!uWindow.errorsExist()) {
	        //var tree = uWindow.parent.frames.SubjectTree;
	        //var LIElem = uWindow.parent.frames.SubjectTree.document.getElementsByTagName("LI");
	        //if (LIElem.length == 0 && KBItemID == null) {
	            //uWindow.errorsAppend("KB_SEARCH_ERROR_KB_EMPTY");
	            //uWindow.errorsShow();
	            //return;
	        //}
	        var FieldArray = document.getElementsByName("Field");
	        var index = 0;
	        searchFields = uWindow.EMPTY;
	        var field;
	        while (index < FieldArray.length) {
	            field = FieldArray[index];
	            uWindow.setFieldValidState(field, true);
	            field.isValidated = false;
	            index++;
	        }
	        index = 0;
	        var minField, maxField;
	        var baseId;
	        while (index < FieldArray.length) {
	            field = FieldArray[index];
	            if (!field.isValidated) {
	                baseId = "Field_" + field.FieldId + "_";
	                switch (field.ftype) {
	                  case "date":
	                    minField = field.attrib == "MinValue" ? field : document.getElementById(baseId + "Min");
	                    maxField = field.attrib == "MaxValue" ? field : document.getElementById(baseId + "Max");
	                    if (!uWindow.validateDateField(minField, maxField, uWindow.EMPTY, uWindow.EMPTY)) {
	                        errorsShow();
	                        return;
	                    }
	                    minField.isValidated = true;
	                    maxField.isValidated = true;
	                    if (!uWindow.isEmpty(minField.sqlValue)) {
	                        searchFields += uWindow.getFieldSearchParam(minField.FieldId, minField.attrib, minField.sqlValue);
	                    }
	                    if (!isEmpty(maxField.sqlValue)) {
	                        searchFields += uWindow.getFieldSearchParam(maxField.FieldId, maxField.attrib, maxField.sqlValue);
	                    }
	                    break;
	                  case "number":
	                    minField = field.attrib == "MinValue" ? field : document.getElementById(baseId + "Min");
	                    maxField = field.attrib == "MaxValue" ? field : document.getElementById(baseId + "Max");
	                    if (!uWindow.validateNumberField(minField, maxField)) {
	                        uWindow.errorsShow();
	                        return;
	                    }
	                    minField.isValidated = true;
	                    maxField.isValidated = true;
	                    if (!uWindow.isEmpty(minField.value)) {
	                        searchFields += uWindow.getFieldSearchParam(minField.FieldId, minField.attrib, minField.value);
	                    }
	                    if (!uWindow.isEmpty(maxField.value)) {
	                        searchFields += uWindow.getFieldSearchParam(maxField.FieldId, maxField.attrib, maxField.value);
	                    }
	                    break;
	                  case "text":
	                    var fieldValue = uWindow.validateTextControl(field, null, "KB_SEARCH_ERROR_WORDS_TOO_SHORT");
	                    if (fieldValue == null) {
	                        uWindow.errorsShow();
	                        return;
	                    }
	                    if (!uWindow.isEmpty(fieldValue)) {
	                        searchFields += uWindow.getFieldSearchParam(field.FieldId, field.attrib, fieldValue + "*");
	                    }
	                    break;
	                  default:
	                    if (!field.attrib) {
	                        field.attrib = uWindow.EMPTY;
	                    }
	                    if (!uWindow.isEmpty(field.value)) {
	                        searchFields += uWindow.getFieldSearchParam(field.FieldId, field.attrib, field.value);
	                    }
	                    break;
	                }
	            }
	            index++;
	        }
	        // var handler = KBItemID != null && KBItemID != "" ? "KBItemHandler" : tree ? tree.Handler : uWindow.EMPTY;
	        var handler = "EditHandler";
	        if (document.getElementById("SearchBranchSelected").checked) {
	            var subjectSearch = "&ssubject=" + (uWindow.searchSubject != null ? uWindow.searchSubject : uWindow.simpleSearchSubject);
	        } else {
	            var subjectSearch = "&ssubject=" + uWindow.simpleSearchSubject;
	        }
	        if (document.getElementById("ClientType").options.length != 0) {
	            if (document.getElementById("ClientType").options[0].selected) {
	                uWindow.searchClientType = uWindow.EMPTY;
	            }
	        }
	        if (document.getElementById("ItemType").options[0].selected) {
	            uWindow.searchItemType = uWindow.EMPTY;
	        }
	        var qs = "handler=" + handler + 
				"&sphrase=" + escape(uWindow.searchPhrase.replace(/\+/g, "$P$")) + 
				"&swords=" + escape(uWindow.searchWords) + 
				"&scontent=" + uWindow.searchContent.toString() + 
				"&sfromdate=" + uWindow.searchDateFrom + 
				"&stodate=" + uWindow.searchDateTo + 
				"&sitemtype=" + uWindow.searchItemType + 
				"&sclienttype=" + (uWindow.isMetaDataEnabled() ? uWindow.searchClientType : uWindow.EMPTY) + 
				"&sfields=" + escape(searchFields) + 
				"&scourse=" + (uWindow.searchEnviro != null ? uWindow.searchEnviro : uWindow.simpleSearchEnviro) + subjectSearch + 
				"&senvirotype=" + (uWindow.searchEnviroType != null ? uWindow.searchEnviroType : uWindow.EMPTY) + 
				"&spermission=" + (uWindow.searchPermission != null ? uWindow.searchPermission : uWindow.EMPTY) + 
				"&KBItemID=" + (uWindow.KBItemID != null ? uWindow.KBItemID : uWindow.EMPTY) + 
				"&KBItemLetter=" + (uWindow.KBItemLetter != null ? escape(uWindow.KBItemLetter) : uWindow.EMPTY) + 
				"&TestID=" + (uWindow.TestID != null ? uWindow.TestID : uWindow.EMPTY) + 
				"&sQuestionStatus=" + (uWindow.searchQuestionStatus != null ? uWindow.searchQuestionStatus : uWindow.EMPTY);
	        var main = uWindow.parent;
	        if (main) {
	            uWindow.showStatus(true);
	            //main.LoadItemMenu("caller=search&" + qs);
				main.frames[0].location.href = '/BareketNet/ItemMenu.aspx?caller=search&' + qs+'&LinkBoardSID=';
	        }
	    }
	    if (uWindow.errorsExist()) {
	        uWindow.errorsShow();
	    }
	}
}



function fixArik()
{
	var l = window.location;
	var url=l.protocol + "//" + l.host + "/bareket/ExerciseFrames.asp?user=student&random=" + Math.floor(Math.random()*100000);
	l.href = url;
}
function fixCourseLinks()
{
	var allLinks = document.getElementsByTagName("a");
	var i, a, l = allLinks.length;
	var j, m, qs, qsArr, paramArr;
	var courseId = "";
	var courseName = "";
	for (i = 0; i < l; i++)
	{
		a = allLinks[i];
		if (a.href.match(/\/eClass\/Announcements\.asp/i))
		{
			qs = a.href.split("?")[1];
			qsArr = qs.split("&");
			m = qsArr.length;
			for (j = 0; j < m; j++)
			{
				paramArr = qsArr[j].split("=");
				if (paramArr[0] == "vcCourseID")
					courseId = paramArr[1];
				else if	(paramArr[0] == "vcCourseName")
					courseName = paramArr[1];
			}
			addLink(a.parentNode, a.id, courseId, courseName);
			break;
		}
	}
	
}

function addLink(after, id, courseId, courseName)
{
	var href = "/bareket/fromArik.asp?language=100&goto=ExerciseFrames.asp?user=student&vcCourseID=" + courseId +
	 "&vcCourseName=" + courseName;
	var idArr = id.split("@");
	var i, newId, found = false;
	for (i = 1; i < 40; i++)
	{
		newId = (parseInt(idArr[0], 10) + i) + "@" + idArr[1];
		if (document.getElementById(newId) == null)
		{
			found = true;
			break;
		}
	}
	if (!found)
	{
		GM_log("Unable to add link");
		return;
	}

	var newTd = after.cloneNode(true);
	var a, l = newTd.childNodes.length;
	for (i = 0; i < l; i++)
	{
		a = newTd.childNodes[i];
		if (a.tagName == "A")
		{
			a.id = newId;
			a.href = href;
			a.innerHTML = "\u05de\u05d0\u05d2\u05e8&nbsp;\u05d4\u05d9\u05d3\u05e2"; // "מאגר&nbsp;הידע";
			a.title = "\u05d7\u05d5\u05de\u05e8\u05d9 \u05d4\u05dc\u05d9\u05de\u05d5\u05d3"; // "חומרי הלימוד";
			break;
		}
	}
	var sep = after.nextSibling.nextSibling.cloneNode(true);
	after.parentNode.insertBefore(newTd, after.nextSibling);
	after.parentNode.insertBefore(sep, after.nextSibling);
}


function fixXml(){
	if (typeof uWindow.sendXml == "undefined")
		return;
	if (uWindow.sendXml.toString().indexOf("XMLHttpRequest") < 0)
	{
		uWindow.sendXml = function( page, message ) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open( 'GET', page, false );
			xmlhttp.send( message );
			return xmlhttp.responseText;
		}
	}	
}

function fixMenu()
{
	if (typeof uWindow.menuShow == "undefined")
		return;
	if (uWindow.menuShow.toString().match(/^function menuShow\(evnt/))
		return;

	var lastMenu = null;
	var skipHide = false;
	uWindow.MenuItemForm = document.getElementById("MenuItemForm");
	document.body.addEventListener('click', 
		function(e) {
			if (lastMenu != null)
			{
				lastMenu.style.top = e.clientY+"px";
				lastMenu.style.left = e.clientX+"px";
				lastMenu.style.display = uWindow.styleVisible;
				lastMenu = null;
			}
		},
		false);
	cmdSubMenu = function(e) {
	    var menuLevel = this.menuLevel ? this.menuLevel : 0;
	    var itemID = this.itemID ? this.itemID : 0;
	    var itemIDorig = this.itemIDorig ? this.itemIDorig : 0;
	    var subjectID = this.subjectID ? this.subjectID : 0;
	    var subjectIDorig = this.subjectIDorig ? this.subjectIDorig : 0;
	    var headerType = this.headerType ? this.headerType : 0;
	    var headerTypeOrig = this.headerTypeOrig ? this.headerTypeOrig : 0;
	    uWindow.menuShow(this.menuStr, this.menuName, this.menuLevel, this.itemID, this.itemIDorig, this.subjectID, this.subjectIDorig, this.headerType, this.headerTypeOrig, this.itemName, this.questionID, this.courseGUID, this.courseID, null, this);
	}
	uWindow.menuShow = function(strFunc, menuName, menuLevel, lItemID, lItemIDorig, lSubjectID, lSubjectIDorig, lHeaderType, lHeaderTypeOrig, lItemName, lQuestionID, lCourseGUID, lCourseID, lHasFields4StudentUpdate, eventTarget) {
		var dir = uWindow.dir;
	    if (strFunc.indexOf("_PageNum_") != -1) {
	        pageNum = strFunc.substr(strFunc.indexOf("_PageNum_") + 9, strFunc.length);
	        strFunc = strFunc.substr(0, strFunc.indexOf("_PageNum_"));
	    } else {
	        pageNum = 0;
	    }
	    if (uWindow.ready) {
	        var menuID = "menu" + menuName;
	        var menu = uWindow.menuInit(menuID);
	        uWindow.menuHide();
	
	        uWindow.HideMenues(menuID, menuLevel);
			skipHide = true;
	        var frameHeight = window.frameElement ? window.frameElement.height : window.height;
	        var useCourseGUID = uWindow.caller == uWindow.callerSearch ? lCourseGUID : uWindow.gCourseGUID;
	        var useCourseID = uWindow.caller == uWindow.callerSearch ? lCourseID : uWindow.gCourseID;
	        if (uWindow.thisMenu != menuID) {
	            uWindow.setVariables(menu, menuName, menuLevel, lItemID, lItemIDorig, lSubjectID, lSubjectIDorig, lHeaderType, lHeaderTypeOrig, lItemName, lQuestionID, useCourseGUID, useCourseID, lHasFields4StudentUpdate);
	            while (menu.rows.length > 0) {
	                menu.deleteRow(0);
	            }
	            uWindow.thisMenu = menuID;
	            uWindow.menuCreate(menu, unescape(strFunc), menuName);
	        }
			menu.style.top = "0px";
	        var EMPTY_TEXT = document.getElementById("EmptyDocumentstr").value;
	        if (menuLevel == 3 &&
	            menuName.substr(menuName.length - 1, 1) == "0" &&
	            menu.innerHTML.indexOf(EMPTY_TEXT) == -1) {
	            str = menu.innerHTML;
	            if (menu.menuName.indexOf("EMPTYITEM") == -1) {
	                var tbody = menu.children[0];
	                var tr;
	                var oCell_1;
	                var oCell_2;
	                tr = tbody.insertRow(0);
	                oCell_1 = tr.insertCell();
	                oCell_1.colSpan = "2";
	                oCell_1.innerHTML = "<HR width=100% size=2>";
	                tr.style.height = "12px";
	                tr = tbody.insertRow(0);
	                oCell_1 = tr.insertCell();
	                oCell_2 = tr.insertCell();
	                oCell_2.innerText = document.getElementById("EmptyDocumentstr").value;
	                tr.style.height = "18px";
	                tr.onmouseover = uWindow.cmdMouseOver;
	                tr.onmouseout = uWindow.cmdMouseOut;
	                tr.onclick = uWindow.cmdAddItemGeneral;
	                tr.style.cursor = cursorHand;
	            } else {
	                var tbody = menu.children[0];
	                var tr = tbody.children[0];
	                var oCell_1 = tr.insertCell();
	                var td = tr.children[0];
	                td.innerText = document.getElementById("EmptyDocumentstr").value;
	                tr.style.height = "18px";
	                tr.onmouseover = uWindow.cmdMouseOver;
	                tr.onmouseout = uWindow.cmdMouseOut;
	                tr.onclick = uWindow.cmdAddItemGeneral;
	                tr.style.cursor = cursorHand;
	            }
	        }

			var x = 0;
			var y = 0;
			var parent = eventTarget;
			while (parent != null)
			{
				y += parent.offsetTop;
				x += parent.offsetLeft;
				parent = parent.offsetParent;
			}
			// y += this.offsetHeight;
	        //menu.style.pixelTop = y + document.body.scrollTop + 2;
			if (eventTarget)
			{
		        var menuHeight = menu.scrollHeight;
		        var totalHeight = y + menuHeight;
		        if (totalHeight > frameHeight) {
		            if (menuHeight > frameHeight) {
		                y = 0;
		            } else {
		                y = y + frameHeight - totalHeight - 10;
		            }
		        }
				menu.style.top = y+"px";
				menu.style.left = (x + eventTarget.offsetWidth + 2)+"px";
		        menu.style.display = uWindow.styleVisible;
			}
			else
			{
				lastMenu = menu;				
			}
	        if (uWindow.globalTree.toLowerCase() == "yes") {
	            if (lCourseGUID != "" && lCourseID != "") {
	                if (lCourseGUID.indexOf("0x") == -1) {
	                    lCourseGUID = "0x" + lCourseGUID;
	                }
	                var ACTION_Page = "/Bareket/SetCookies.asp?vcCourseID=" + lCourseID + "&vcCourseGuid=" + lCourseGUID;
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.open( 'GET', ACTION_Page, false );
					xmlhttp.send("<root></root>");
					var result =  xmlhttp.responseText;
	                //var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	                //xmlhttp.Open("GET", ACTION_Page, false);
	                //xmlhttp.Send("<root></root>");
	                //var result = xmlhttp.responseText;
	            }
	        }
	    }
	}
	uWindow.menuAddItem = function(menu, type, cmd, title, sub, menuName) {
	    var height = 0;
	    if (cmd) {
	        var row = menu.insertRow(-1);
	        var id = type + "r" + row.rowIndex + uWindow.getRandom();
	        if (title != null) {
	            var titles = title.split("^");
	            var tooltip = titles.length > 1 ? titles[1] : "";
	            if (tooltip != "") {
	                row.title = tooltip;
	            }
	            title = titles[0];
	        }
	        var cell = uWindow.menuAddItemCell(row, id, menu, type, cmd, title, sub);
	        if (menuName.indexOf("Presentation") != -1) {
	            var insertPic;
	            insertPic = uWindow.checkIfTheRowChosen(cmd);
	            if (insertPic) {
	                uWindow.menuAddItemPicV(row, cell, id, type, cmd);
	            } else {
	                uWindow.menuAddItemPic(row, cell, id, type, cmd);
	            }
	        }
	        if (type != 0) {
	            if (type != uWindow.tMenuBrk) {
	                uWindow.menuAddItemPic(row, cell, id, type, cmd);
					row.addEventListener('click',type == uWindow.tMenuSub ? cmdSubMenu : eval("unsafeWindow." + cmd) ,false);
	            }
	        }
	        uWindow.setRowStyle(row, type);
			height = 16;
	    }
	    return height;
	}
	uWindow.menuAddItemCell = function(row, id, menu, type, cmd, title, sub) {
	    var cell = row.insertCell(-1);
	    var height = 0;
	    cell.id = id;
	    if (type == uWindow.tMenuCmd) {
	        uWindow.menuAddCommand(cell, cmd, title, sub);
	    } else if (type == uWindow.tMenuBrk) {
	        uWindow.menuAddBreak(cell);
	        cell.colSpan = 2;
	    } else if (type == uWindow.tMenuSub) {
	        uWindow.menuAddSubMenu(cell, title, sub, menu);
	    }
	    return cell;
	}
	uWindow.menuAddCommand = function(cell, cmd, title, extra) {
	    cell.innerHTML = title;
	    cell.parentNode.extra = extra;
	    uWindow.setHeight(cell, uWindow.heightCmd);
	}
	uWindow.setHeight = function(obj, height) {
	    obj.parentNode.style.height = height + "px";
	}
	uWindow.menuAddSubMenu = function(cell, title, sub, menu) {
	    var height = uWindow.menuAddCommand(cell, uWindow.functions[uWindow.fncSubMenu], title, sub);
	    var newLevel = menu.menuLevel;
	    ++newLevel;
	    uWindow.setVariables(cell.parentNode, menu.menuName + "sub" + cell.parentNode.rowIndex, newLevel, menu.itemID, menu.itemIDorig, menu.subjectID, menu.subjectIDorig, menu.headerType, menu.headerTypeOrig, menu.itemName, menu.questionID, menu.courseGUID, menu.courseID, menu.HasFields4StudentUpdate);
	    cell.parentNode.menuStr = sub;
	    cell.parentNode.menuLevel = newLevel;
	    uWindow.setHeight(cell, uWindow.heightCmd);
	}
	uWindow.cmdMouseOver = function() {
	    this.style.backgroundColor = uWindow.colorCmdOn;
	}
	uWindow.cmdMouseOut = function() {
	    this.style.backgroundColor = uWindow.colorCmdOff;
	}
	uWindow.getMenu = function(obj) {
		return obj.parentNode.parentNode;
	}
	uWindow.menuHide = function() {
		if (skipHide)
			return;
		var thisMenu = uWindow.thisMenu;
	    if (document.getElementById(thisMenu)) {
	        if (thisMenu.indexOf("add") == -1) {
	            if (thisMenu.indexOf("item") != -1 &&
	                (thisMenu.indexOf("sub") == -1)) {
	                return;
	            }
	            document.getElementById(thisMenu).style.display = uWindow.styleInvisible;
	        }
	    }
	}
	uWindow.HideAllMenues = function() {
		if (skipHide)
		{
			skipHide = false;
			return;
		}			
		var thisMenu = uWindow.thisMenu;
		if(thisMenu == -1)
			return;
	
		if( (thisMenu.indexOf("add") == -1) && (thisMenu.indexOf("item") == -1) )
			return;
	
		var basicMenuName;
		var subIndex = thisMenu.indexOf("sub");
		if(subIndex == -1)
		 	basicMenuName = thisMenu;
		else
		 	basicMenuName = thisMenu.substr(0,subIndex);
	
		if(basicMenuName.indexOf("item") != -1)
			uWindow.HideSingleMenu(basicMenuName);
		else
		{
			uWindow.HideMenuesByLevel(basicMenuName,0);
			uWindow.HideMenuesByLevel(basicMenuName,1);
			uWindow.HideMenuesByLevel(basicMenuName,2);
			uWindow.HideMenuesByLevel(basicMenuName,3);
		}
	}
	uWindow.HideSingleMenu = function(menuName) {
	    if (document.getElementById(menuName)) {
	        document.getElementById(menuName).style.display = uWindow.styleInvisible;
	    }
	}
	uWindow.setRowStyle = function(row, type) {
	    if (type != uWindow.tMenuBrk) {
	        row.addEventListener('mouseover', uWindow.cmdMouseOver, false);
	        row.addEventListener('mouseout', uWindow.cmdMouseOut, false);
	        row.style.cursor = uWindow.cursorHand;
	    }
	}
}

function fixReadyState(){
	uWindow.checkReadyState = function( ) {
	}
}
function fixStyles()
{
//	addGlobalStyle(".Link_Buttons {height: auto !important; display: block}");
	addGlobalStyle(".Buttons_With_Img  {padding: 1px 2px !important; vertical-align: middle !important}");
	addGlobalStyle(".img {vertical-align: middle !important}");
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function fixHaifaFFBlock() {
	var title = "\u05db\u05e0\u05d9\u05e1\u05d4 \u05dc\u05de\u05e2\u05d8\u05e4\u05ea HighLearn"; // כניסה למעטפת HighLearn
	var imgs = document.getElementsByTagName('img');
	if (imgs != null)
	{
		var i, l = imgs.length;
		for (i = 0; i < l; i++)
		{
			var img = imgs[i];
			if (img.src.match(/images\/BannerHighLearnBrowser\.gif/ig)) {
				img.style.cursor = "pointer";
				img.src= "images/BannerHighLearn.gif";
				img.title = title;
				img.alt = title;
				img.addEventListener('click', function() {uWindow.openHL();}, false);
				break;
			}

		}
	}
}

if (window.location.href.match(/\/Eclass\/courseTop\.asp/i))
	fixCourseLinks();
else if (window.location.href.match(/\/bareket\/fromArik\.asp/i))
	fixArik();
else if (window.location.href.match(/\/HighLearnNet\/KB\/Search\.aspx/i))
	fixSearch();
else if (window.location.href.match(/\/BareketNet\/toc\.aspx/i))
	fixToc();
else if (window.location.href.match(/\/forums\/forum\.asp/i))
	fixForum();
else if (window.location.href.match(/\/forums\/add_message\.asp/i))
	fixForumAddMsg();
else if (window.location.href.match(/\/boards\/add_message\.asp/i))
	fixBoardsAddMsg();
else if (window.location.href.match(/\/kb\/uploadFilesIframe\.asp/i))
	fixFileUpload();
else if (window.location.href.match(/\/forums\/add_attach\.asp/i))
	fixForumAddAttch();
else if (window.location.href.match(/\/Assignments\/ShowAssignment\.asp/i)	||
		window.location.href.match(/\/Assignments\/StudentUploadPaper\.asp/i))
	fixShowAssignment();
else if (window.location.href.match(/\/Assignments\/EditAssignments\.asp/i))
	fixEditAssignments();
else if (window.location.href.match(/\/bareket\/uploadfile\.asp/i))
	fixBareketUploadFile();
else if (window.location.href.match(/\/online\.haifa\.ac\.il\//i))
	fixHaifaFFBlock();

fixXml();
fixReadyState();
fixStyles();
fixMenu();
