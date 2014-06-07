// ==UserScript==
// @name       RTM on steroids
// @version    0.3.1
// @description  Little big tweaks for RTM
// @match      https://www.rememberthemilk.com/*
// @require http://code.jquery.com/jquery-latest.min.js 
// @copyright  2013+, gellu
// ==/UserScript==

var RTMTagColors = {'code':'#E27C7C',
                 	'web':'#98D7E4',
                    'project':'#27AA15',
                    'rekrutacja':'#E27C7C',
                    'phone':'#FFB430'}

GM_addStyle("input:focus { outline: none; } .xtabs_grey li {background: none; } .xtabs_grey a { background: none; color: #fff !important; } div#tasktabs li { background-position: 0 -150px; } div#tasktabs li a { color: #000 !important; background-position: 100% -150px; } ul.abr-listtabs li.xtab_selected { background-color: #fff !important; font-weight: bold !important;} .abr-listtabs a { color: #575757 !important; } .xtr_hover { background-color: #f9f9f9; } .colorful_tags { padding: 0px; margin-left: 2px; padding:2px 5px; font-size: 8px; border-radius: 3px; color: #fff; margin-right: 5px; } .smart_tag { background-color: #999; font-weight: normal; }");
GM_addStyle(".xtoolbox_button { font-size: 1.0em; background-color: #428bca; border-color: #357ebd; color: #fff; border: 1px solid transparent; vertical-align: middle; padding: 3px 11px 4px 11px !important; cursor: pointer; border-radius: 3px; margin-right: 10px;} .xtoolbox_button:hover {background-color: #3276b1; border-color: #285e8e;} ");
GM_addStyle("div.xtoolbox_actions select { float: right; margin-right: 10px; }");
GM_addStyle("div#listtoolbox, div#notetoolbox, div#onlinehelpwrap, div#detailsduration, div#detailsshared, div#detailsnotes {display: none !important;}");

var RTMListTweaks = function() {
	
    RTMSmartTags();
    
    $('td.xtd_arr').remove();
    $('col.col_arr').remove();
    $('td.xtd_prio').css({'border-right':'0'});
    $('.taskduetoday').css({'font-weight':'normal'});
    $('.taskoverdue').css({'font-weight':'normal'});
    $('.xtable').css({'background-color':'#fff'});
    $('td.xtd_text').css({'padding-top':'2px','padding-bottom':'2px'});
    $('#details').css({'background-color':'#fff'});
    $('div#tasktabs').removeClass('xtabs_grey');
    
    $('tr.xtr').each(function() {
        if ($(this).find('td.xtd_date').html() == 'Dzisiaj') {
            $(this).find('td.xtd_date').html('<span style="color: #5cb85c">' + $(this).find('td.xtd_date').html().toLowerCase() + '</span>');
        }
    });
    
}

var RTMSmartTags = function() {

    var tag;
   
    for (var key in RTMTagColors) 
    {
        tag = key; 	
        $('span.xtd_tag').each(function() {
            if($(this).html() == tag) {
                $(this).removeClass('xtd_tag').addClass('colorful_tags');
                $(this).css('background-color', RTMTagColors[tag]);
            }
        });
    }  
    
    $('span.xtd_task_name').each(function() {
        if($(this).html().indexOf(':') != '-1') 
        {
           var strArr = $(this).html().split(':');
           $(this).html('<span class="colorful_tags smart_tag">' + strArr[0] + '</span>' + strArr[1].replace(/^\s+|\s+$/g, ''));
        }
    });
    
};

function RTMSteroidize() 
{
	$('div.appfootercontent').remove();
    $('div#appheader').remove();
    $('div#statusbox').css('margin-top', '0');
    $('div#sorting').hide();
    $('div#tasksToolbox div.xtoolbox_selector').hide();
    $('div#tasksToolbox div.xtoolbox_actions').css('margin-top', '5px');
	$('img#add-helpicon').remove();
    $('div#add-box div.ab1').css({'width':'650px'});
    $('div#tools').css({'background-color':'#F9F9F9'});
    $('div#tools_spacer').css({'padding-top':'0'});
    $('div#detailsstatuswrap').hide();
    $('div#listAdder').remove();
    $('input.xtoolbox_button').each(function() {
        if($(this).val() == 'Przełóż') {
            $(this).css({'background-color':'#f0ad4e', 'border-color':'#eea236'});
        }
    });
    
    
	with(this.unsafeWindow){
        messageBus.subscribe(RTMListTweaks, taskTabs.getUniqueMessageBusName() + 'tabChanged');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksDetailsDueDone');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksDetailsDurationDone');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksDetailsLocationDone');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksDetailsReoccurrenceDone');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksDetailsTagsDone');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksDetailsURLDone');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksRenamed');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksSetPriority');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksPostponed');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksUncompleted');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'tasksMoved');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'loadFinished');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'loadBlitted');
        messageBus.subscribe(RTMListTweaks, taskList.getUniqueMessageBusName() + 'viewChanged');
        messageBus.subscribe(RTMListTweaks, 'rtm.fields.detailsdue.editFinished');
        
    }
    
    RTMListTweaks();
    
    function $x(x,c){c=c||document;var d=c.ownerDocument||c;
    var r=d.evaluate(x,c,null,4,null);for(var i,n=[];i=r.iterateNext();n.push(i)); return n}

}

setTimeout(RTMSteroidize, 1500);
