// ==UserScript==
// @name       Fetch Alibaba Emails
// @namespace  com.sweetkiddy.userscript
// @version    0.6
// @description  通过逐页点击MESSAGE列表，再打开MESSAGE获得发件人EMAIL
// @match      http://us.message.alibaba.com/feedback/default.htm*
// @grant unsafeWindow
// @copyright  2013, Rex
// ==/UserScript==

(function(document) {
    var $, lastHash=null, retried=0, lastEmail=null;
    var currentOpening=0, totalToOpen=0, emails = [];
    var btnStart=null, btnStop=null, txtEmailsCount=null, resultsTextarea=null;
    var canceledByUser=false;
    //var currentPage=1, totalPages=10, messagesPerPage=20;
    function log(){
      //unsafeWindow.console.debug.apply(unsafeWindow.console,arguments);   
    }
    function waitForContactEmailLoaded(){
        var emailContainer = $('.allin-customer-info:visible:first .allin-customer-txt:first');
       var hashContainer = $("ul.detail-info:visible:first");
       var currentHash = $.trim(hashContainer.text());
       log('waitForContactEmailLoaded',currentOpening,totalToOpen,currentHash);
       if(currentHash==lastHash && retried++<3){
			if(!canceledByUser){
       			setTimeout(waitForContactEmailLoaded,1500);
       		}else{
            	backToMessageList();   
            }
       }else if(currentOpening<totalToOpen){
           //backToMessageList();
           currentOpening++;
           lastHash = currentHash;
       		emailContainer.children().remove();
       	   var email = $.trim(emailContainer.text());
           log(email);
           if(email!="" && email!=lastEmail){
               //log(email,lastEmail);
           		emails.push(email);
           		resultsTextarea.val(resultsTextarea.val()+email+'\n');
               lastEmail=email;
           }
           if(!canceledByUser){
       			openNextMessage(currentOpening);
           }else{
            	backToMessageList();   
           }
       }else{
           backToMessageList();
           log('Work done.',emails);   
       }
    }
    function openNextMessage(messageIndex){
        retried=0;
        log('openNextMessage',messageIndex);
        var btnNext=$('.allin-pager-bar:visible a[title=Next]:visible:first');
        if(btnNext.length>0){
            var ele = btnNext.get(0);
            if(ele.click){
                ele.click();
            }else if(ele.dispatchEvent){
                var evt = document.createEvent("MouseEvents"); 
　　			  evt.initEvent("click", false, false); 
                ele.dispatchEvent(evt);
            }else{
                return;   
            }
			setTimeout(waitForContactEmailLoaded,2000);
        }else{
            backToMessageList();
        }
    }
    function openMessage(messages,iToOpen){
        messages[iToOpen].click();
        setTimeout(waitForContactEmailLoaded,2000);
    }
    function stop(){
        canceledByUser=true;
    }
    function backToMessageList(){
        var btnBack = $('.allin-toolbar:visible:first a[title=Back]:visible:first');
        if(btnBack.length>0){
        	var ele=btnBack.get(0);
            if(ele.click){
                ele.click();
            }else if(ele.dispatchEvent){
                var evt = document.createEvent("MouseEvents"); 
　　			  evt.initEvent("click", false, false); 
                ele.dispatchEvent(evt);
            }
        }
    }
    /**
     * 打开当前页的消息，以获得其发件人邮箱
     **/
    function openMessagesOnPage(){
        log('Open messages.');
        var messages = $('#grid-body-inboxGrid:first .c-subject a');
        
        openMessage(messages,0);
    }
    function isOnDetailPage(){
      return $('#inboxGrid:visible').length==0;   
    }
    function start(){
        canceledByUser=false;
        currentOpening=0;
        lastHash=null;
        lastEmail=null;
        var messages = $('#grid-body-inboxGrid:first:visible .c-subject a');
        var limitByUser=parseInt(txtEmailsCount.val());
        if(isNaN(limitByUser) || limitByUser<=0){
            totalToOpen = messages.length;
        }else{
            totalToOpen = limitByUser;
        }
        if(totalToOpen<=0)
            totalToOpen=1;
        txtEmailsCount.val(totalToOpen);
        if(isOnDetailPage()){
            waitForContactEmailLoaded();
        }else{
        	openMessagesOnPage();
        }
    }
    function addCustomArea(){
        var customArea=$('<div class="allin-tree-title allin-tree allin-tree-wrap"></div>');
        btnStart=$('<a class="ui-button ui-button-normal"><span class="allin-text">Get Emails</span></a>');
        btnStop=$('<a class="ui-button ui-button-normal" style="margin-left:8px;"><span class="allin-text">Stop</span></a>');
        txtEmailsCount=$('<input type="text" style="margin-top:8px;" size="8"/>');
        txtEmailsCountWrapper=$('<label style=" vertical-align: bottom; font-size: 16px; ">Limit: </label>');
        txtEmailsCountWrapper.append(txtEmailsCount);
        resultsTextarea=$('<textarea rows="23" style="margin-top:8px;width:95%;word-wrap: normal;"></textarea>');
        btnStart.click(start);
        btnStop.click(stop);
        customArea.append(btnStart).append(btnStop).append('<br>').append(txtEmailsCountWrapper).append('<br>').append(resultsTextarea);
        customArea.appendTo('.col-sub:first');
		$("<hr>").insertBefore(customArea);
    }
    function waitForMessagesLoaded(){
        if($('#inboxTopBar:visible').length<1){
        	setTimeout(waitForMessagesLoaded,1500);
        }else{
        	addCustomArea();   
        }
    }
    function main(){
        log('Userscript ALIBABA emails loaded.');
        $=unsafeWindow.jQuery;
        waitForMessagesLoaded();
    }
    function addjQuery() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = main;
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    addjQuery();

})(window.document);