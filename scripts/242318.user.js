// ==UserScript==
// @name       QuickAction
// @namespace  http://use.i.E.your.homepage/
// @description   add details link
// @version     0.4.9.9
// @updateURL	http://userscripts.org/scripts/source/242318.user.js
// @include http://*
// @include https://*
// @resource	jqueryModelCSS	http://dev.iceburg.net/jquery/jqModal/jqModal.css
// @resource	jqueryDataTableCSS	http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables.css
// @resource	jqueryDataTableThemeCSS	http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/css/jquery.dataTables_themeroller.css
// @require	    http://code.jquery.com/jquery-1.10.1.min.js
// @require     http://code.jquery.com/jquery-migrate-1.2.1.min.js
// @require     http://dev.iceburg.net/jquery/jqModal/jqModal.js
// @require		http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.js
// @grant       GM_getValue
// @iconURL https://2.gravatar.com/avatar/6657effd2b0f9b9fc1b7d50cc1856b01?d=https%3A%2F%2Fidenticons.github.com%2Fe7a350fa571a510003e41a5e750e7711.png&r=x&s=440
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @grant GM_getResourceText
// @copyright  2012+, You
// ==/UserScript==

GM_addStyle('div.jqmAlert{display:none;position:fixed;top:0;right:0;opacity:.7;}div.jqmAlertWindow{height:auto;width:auto;max-width:200px;background:#111;border:1px dotted #FFF;margin:auto;padding:0 10px 10px;}.jqmAlertTitle{height:20px;color:#FFF;margin:5px 2px;}.jqmAlertTitle h1{font-size:14px;text-transform:capitalize;letter-spacing:-1px;font-weight:700;color:#FFF;float:left;height:20px;margin:5px 2px;padding:0;}div.jqmAlert .jqmClose em{display:none;}div.jqmAlert .jqmClose{width:20px;height:20px;display:block;float:right;clear:right;background:transparent url(alert/close_icon_double.png) 0 0 no-repeat;}div.jqmAlert a.jqmClose:hover,div.jqmAlert a.jqmCloseHover{background-position:0 -20px;}div.jqmAlertContent{border-top:px;color:#FFF;font:11px/14pt arial;border:1px dotted #111;letter-spacing:0;background:#111;margin:5px;padding:5px 20px;}div.jqmAlertContent p,div.jqmAlertContent a{color:#FFF;font:11px/14pt arial;}.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}.clearfix{display:block;}* html .clearfix{height:1%;}');
 var $ = window.jQuery;
//============================Package end================
//Dock init by jQuery
$(document).ready(function() {
   
    $("body",top.document).append('<div class="jqmAlert" id="bookmarksTab" style="z-index: 3000;display: block;background-color:rgb(109, 109, 109)"> <input type="button" value="=" id="toolsShouldShow" ><input type="button" id="toolsShouldHide" name="隐藏" value="-" ><div id="ex3b" class="jqmAlertWindow"> <div class="jqmAlertTitle clearfix"> <h1>Welcome!</h1> </div> <div class="jqmAlertContent"> <p> <span id="toolGetCorpID">Fie,Xu</span></p> </div> <div class="jqmAlertTitle clearfix"> <h1>Quick Action</h1> </div> <div class="jqmAlertContent"><a id="ToolToHome" >Home</a> <br/><input type="text" id="toolCorpid" placeholder="Corp ID" value="" style="width:60px"/><br/><a id="quickDirectToWhw" >Whoswho</a> <br/><a id="ToolToBottom" >To Bottom</a> <br/><a id="ToolToTop" >To Top</a> <br/><a class="quickDirectToPPMC" >PPMC</a> <br/><a id="quickDirectToreportIT" >Take Ticket</a> <br/><a id="quickDirectToRibbit" >Ribbit</a> <br/><a id="quickDirectToOSM" >Office Supplies</a> <br/><a id="quickDirectToQC" >QC</a><br/><a id="quickDirectToLeave" >Leave</a></div> <div class="jqmAlertTitle clearfix"> <h1>More</h1> </div> <div class="jqmAlertContent"> <p>Thanks!<br/><a id="toolThanks" href="#" onclick="alert(\'你的支持是我最大的鼓励。\')">Donate</a> </p> </div> </div></div>');
    if(!localStorage.getItem("swichOption")||localStorage.getItem("swichOption")==1)
    	document.getElementsByClassName('jqmAlertWindow')[0].style.display='block';
    else
        document.getElementsByClassName('jqmAlertWindow')[0].style.display='none';
	$("#bookmarksTab #ToolToBottom").click(function(){
        $("html,body").animate({scrollTop:$(document).outerHeight()},1000);
			return false;
	});
var currentDay = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")[new Date().getDay()];
    if(currentDay =="Friday"){
        $("#toolGetCorpID").after( '<br/><span>Happy Friday! <br/><a class="quickDirectToPPMC" style="color:red;font-weight:bold">TimeSheet</a></span>');
    }else{
        $("#toolGetCorpID").after( '<br/><span>Hello World</span>');
}
    $("#bookmarksTab #toolsShouldHide").click(function(){
        document.getElementsByClassName('jqmAlertWindow')[0].style.display='none';
        localStorage.setItem("swichOption",0);
			return false;
	});
    $("#bookmarksTab #toolsShouldShow").click(function(){
        document.getElementsByClassName('jqmAlertWindow')[0].style.display='block';
        localStorage.setItem("swichOption",1);
			return false;
	});

    $("#bookmarksTab #ToolToHome").click(function(){
        window.open('http://fidelitycentral.fmr.com/', '_newtab');
			return false;
	});
	$("#bookmarksTab #ToolToTop").click(function(){
        $("html,body").animate({scrollTop:0},1000);;
			return false;
	});
    $("#bookmarksTab #quickDirectToWhw").click(function(){
        var toolOpenUrl = '';
        if($("#toolCorpid").val() != ""&&$("#toolCorpid").val()!=null&&/^[aA]\d{6}$/.test($("#toolCorpid").val()))
            toolOpenUrl = 'http://whoswho.fmr.com/fdir/employeeInfo?corpId='+$("#toolCorpid").val();
        else
            toolOpenUrl = 'http://whoswho.fmr.com/fdir/empHome';
        window.open(toolOpenUrl, '_newtab');
			return false;
	});
    
    $("#bookmarksTab #quickDirectToRibbit").click(function(){
        window.open('https://ribbit.fmr.com/actions', '_newtab');
			return false;
	});
    
    $("#bookmarksTab #quickDirectToreportIT").click(function(){
        window.open('http://reportit.fmr.com/SelfService/home', '_newtab');
			return false;
	});
    
    $("#bookmarksTab .quickDirectToPPMC").click(function(){
        window.open('http://ppmc.fmr.com/itg/tm/ShowCreateTimeSheet.do', '_newtab');
			return false;
	});
    $("#bookmarksTab #quickDirectToOSM").click(function(){
        window.open('http://sharepoint.fmr.com/sites/ctgdalian/Lists/OfficeSuppliesManagement/AllItems.aspx', '_newtab');
			return false;
	});
    $("#bookmarksTab #quickDirectToQC").click(function(){
        window.open('https://qcent.fmr.com/qcbin/start_a.jsp', '_newtab');
			return false;
	});
    $("#quickDirectToLeave").click(function(){
        window.open('https://hraccesschina.fmr.com/hra-space/portal/root', '_newtab');
			return false;
	});
$('#bookmarksTab').jqm({
        target: 'div.jqmAlertContent',
        overlay: 0
    });
    $('#bookmarksTab').jqmShow();
console.log('Jquery Enter;');   
});