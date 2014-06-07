// ==UserScript==
// @author         MJW 
// @version        1.5.
// @name           JiBan Task-Board for Jira 6.1
// @include        *Dashboard.jspa*
// ==/UserScript==
// steal JQuery from JIRA

// License
//   DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                    Version 2, December 2014
// 
// Copyright (C) 2014 Marcel Johann Wüstner <m.j.wuestner@gmail.com>
// 
// Everyone is permitted to copy and distribute verbatim or modified
// copies of this license document, and changing it is allowed as long
// as the name is changed.
// 
//            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
// 
//  0. You just DO WHAT THE FUCK YOU WANT TO.


var $ = unsafeWindow.jQuery;

// process top tabs & inject JIBAN tabs
var processTabs = function () {
    // replace vertical tabs with horizontal
    var $tabs = $('.vertical.tabs').first();
    $tabs.removeClass('vertical');
    $tabs.addClass('horizontal');
    
    $tabs.attr('id', 'dashboard-tabs');
};

// inject JIBAN own tab menu
var injectDropDown = function () {
    var $jibanTab = $('<div id="jiban-menu"></div>');
    $('#dashboard-content').first().parent().prepend($jibanTab);
    
    var $jibanDropDown = $(
        '<div id="jiban-dropdown">' + 
        '  <li class="aui-dd-parent dd-allocated">' +
        '    <a href="#" class="aui-dd-trigger aui-dd-link lnk"><span>A Dropdown</span></a>' + 
        '    <ul class="aui-dropdown standard aui-dropdown-right aui-box-shadow"">' +
        '      <li class="dropdown-item"><a class="item-link" href="#fullscreen">Trigger Fullscreen</a></li>' +
        '      <li class="dropdown-item"><a class="item-link" href="#theme-bright">Bright Theme</a></li>' +
        '      <li class="dropdown-item"><a class="item-link" href="#theme-print">Print Theme</a></li>' +
        '    </ul>' +
        '  </li>' +
        '</div>');
    
    // init dropdown
    $jibanTab.append($jibanDropDown);
    unsafeWindow.AJS.$('#jiban-dropdown').dropDown('Standard');
    
    // handle dropdown links
    $jibanDropDown.find('.item-link').click(function (event) {
        event.preventDefault();
        
        //  check which one is clicked
        switch ($(event.currentTarget).attr('href')) {
            case '#fullscreen':
                triggerFullScreen();
                break;
                
            case '#theme-print':
                GM_setValue('JIBAN_THEMES', THEMES_PRINT);
                location.reload();
                break;
                
            case '#theme-bright':
                GM_setValue('JIBAN_THEMES', THEMES_BRIGHT);
                location.reload();
                break;
        }
    });
    
};

// global variable for full screen
var isFullScreen = false;

// trigger full or normal screen
var triggerFullScreen = function () {
    isFullScreen = !isFullScreen;
    
    // inject or remove class
    var affectedElements = [
        '.aui-theme-default #content',
        '.aui-layout #header',
        '.aui-layout #footer',
        '#dash-options',
        '#dashboard-tabs',
        '#jiban-menu'
    ];
    if (isFullScreen) {
        affectedElements.forEach(function (element) {
            $(element).addClass('fullscreen');
        });        
    } else {
        affectedElements.forEach(function (element) {
            $(element).removeClass('fullscreen');
        });    
    }
};

// global variable for current & available Themes
var THEMES_BRIGHT = 'bright';
var THEMES_PRINT = 'print';
var AVAILABLE_THEMES = [THEMES_BRIGHT, THEMES_PRINT ];

// get it from GM API
var CURRENT_THEME = GM_getValue('JIBAN_THEMES', AVAILABLE_THEMES[0]);

// process the layout & columns, add addtional anchors & links
var processLayout = function () {
    // get the layout
    var $layout = $('#dashboard-content .layout').first();    
    
    // check how many columns
    var numOfColumns = 0;
    if ($layout.hasClass('layout-a')) {
        numOfColumns = 1;
    } else if ($layout.hasClass('layout-aa') || $layout.hasClass('layout-ab') || 
               $layout.hasClass('layout-ba')) {
        
        numOfColumns = 2;
    } else if ($layout.hasClass('layout-aaa')) {
        numOfColumns = 3;
    }
        //console.log('layout info: columns=' + numOfColumns);
        
        var $columns = $layout.find('ul.column');
    //console.log($columns);
    for (var i = 0; i < numOfColumns; i++) {
        var column = $columns[i];
        
        // prepare column navigator
        var $navigator = $('<div />').attr({
            'class': 'col-navigator',
            id: 'navigator-col-' + i
        });
        if (i > 0) {
            $navigator.append($('<a />').attr({
                href: '#navigator-col-' + (i - 1),
                'class': 'link-navigator icon icon-previous',
                'title': 'go to the previous column'
            }).text(''));
        }
        if (i < (numOfColumns - 1)) {
            $navigator.append($('<a />').attr({
                href: '#navigator-col-' + (i + 1),
                'class': 'link-navigator icon icon-next',
                'title': 'go to the next column'
            }).text(''));
        }
        
        $(column).prepend($navigator);        
    }
    
    // register script to handle column navigator, with animation
    $('.link-navigator').click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollLeft: $(this.hash).offset().left - 40
        }, 500);
    });    
};

// process the widget header
var processWidgetHeader = function () {
    
    // internal function to process header title
    var REMOVED_TITLE_STRINGS = [ 'Filter Results: ', 'ultats du filtre : ', 
                                 'Filterergebnisse: ', 'Resultado del Filtro: ' ];
    var removeUnnecessaryTitle = function (event) {
        var $theHeader = $(this);
        $theHeader.unbind('DOMNodeInserted');
        
        // parse the title
        var headerTitle = $theHeader.text();
        REMOVED_TITLE_STRINGS.forEach(function (removeThisString) {
            var trimIndex = headerTitle.indexOf(removeThisString);
            if (trimIndex !== -1) {
                headerTitle = headerTitle.slice(trimIndex + removeThisString.length);
            }
        });
        $theHeader.text(headerTitle);
        
        // just in case it's changed again
        $theHeader.bind('DOMNodeInserted', removeUnnecessaryTitle);
    }
    
    // get headers
    var $widgetsHeaders = $('#dashboard-content .dashboard-item-title');
    $widgetsHeaders.each(function () {
        var $widgetsHeader = $(this);
        $widgetsHeader.bind('DOMNodeInserted', removeUnnecessaryTitle);
    });
};

// inject specific style to defined target.
// if styleId is defined, the style element will have id. If style element the given id has existed on 
// $target, then the old one will be replaced with this one
var injectStyle = function ($target, newStyle, styleId) {
    var $newStyle = $('<style type="text/css">' + newStyle + '</style>');
    if (styleId) {
        $newStyle.attr('id', styleId);
        
        // remove the existed style from $target
        $target.find('#' + styleId).remove();
    } 
    
    $target.append($newStyle);
};

// inject the iFrame script 
var injectScript = function ($target, injectedScript) {
    var theScript = document.createElement('script');
    theScript.appendChild(document.createTextNode('('+ injectedScript +')();'));
    $target[0].appendChild(theScript);
};

// script which will be injected by injectScript function
// will be injected to iFrame body
var SCRIPT_IFRAME = function () {
    // steal JIRA's jQuery
    var $ = AJS.$;
    
    // check if the JIRA result is available
    var checkJiraTableLoaded = function () {
        var $jiraResult = $('#jira .results-wrap');
        if ($jiraResult.length) {
            console.log('JIRA is loaded');            
            
            parseJiraResult($jiraResult);
            removeJiraResult($jiraResult);
            
            // check if this JIRA result is removed (due to refresh or pagination)
            $('.view').bind('DOMNodeRemoved', function (event) {
                // check if it's the JIRA
                if (event.target.id == 'jira') {
                    console.log('jiban-table has been removed! refresh or pagination has been detected');
                    
                    // unbind
                    $(event.currentTarget).unbind('DOMNodeRemoved');
                    
                    // ready to re-parse
                    setTimeout(checkJiraTableLoaded, 150);
                }
            });
            
        } else {
            // check for other type of gadget
            var $viewVontent = $('.view div');
            if  ($viewVontent.length) {
                // has other result
                console.log('Gadget is not a JIRA Filter');
            } else {
                // JIRA table is not loaded yet
                console.log('JIRA is NOT yet loaded');
                
                setTimeout(checkJiraTableLoaded, 150);
            }
        }
    };
    
    // parse & update result
    var parseJiraResult = function ($jiraResult) {
        // prepare the result container
        var $resultContainer = $('<div id="jiban-table"></div>');
        
        // parse table & get rows
        var $result_row = $jiraResult.find('.issuerow');
        $result_row.each(function () {
            var $row = $(this);
            
            // create wrapper div
            var $row_container = $('<div />').attr({
                'class': 'row-container'
            });            
            var $issuerow = $('<div />').attr({
                'class': $row.attr('class')
            });
            $row_container.append($issuerow);
            
            // get the fields
            var fields = ['issuekey', 'issuetype', 'priority', 'dueDate', 'fixVersion',
                          'issue_actions', 'summary', 'assignee'];
            fields.forEach(function (fieldKey) {
                var $field = $row.find('.' + fieldKey).first();
                
                var $res = $('<div />');
                $res.attr('class', $field.attr('class'));
                
                // handle special field
                switch (fieldKey) {
                    case 'issuekey':
                        _processFieldIssueKey($field, $res, $issuerow);
                        break;
                        
                    case 'assignee':
                        _processFieldAssignee($field, $res);
                        break;
                        
                    case 'issue_actions':
                        _processFieldActionMenu($field, $res);
                        break;
                        
                    default:
                        // just inject HTML as it is
                        $res.html($field.html());
                        break;
                }
                $issuerow.append($res);
            });
            $resultContainer.append($row_container);
        });
        
        // re-inject the result
        var $target = $jiraResult.find('>div').first();
        $target.append($resultContainer);
    };
    
    // Remove the original JIRA result, for optimization
    var removeJiraResult = function ($jiraResult) {
        $jiraResult.find('#issuetable').remove();
    };
    
    // internal function used by parseJiraResult to handle field assignee    
    // $field contains the original JIRA result which is already filtered for this field
    // $target is where you append the result
    // $parentContainer is the parent container of $target
    var _processFieldIssueKey = function ($field, $target, $parentContainer) {
        $target.html($field.html());
        
        // get the issue key        
        var issuekey = $target.find('a').first().text();
        
        // parse and remove number
        var separatorIdx = issuekey.indexOf('-');
        if (separatorIdx >= 0) {
            issuekey = issuekey.substring(0, separatorIdx);
        }        
        
        // inject class based on project
        $parentContainer.addClass('project-' + issuekey);
    };
    
    // internal function used by parseJiraResult to handle field assignee    
    // $field contains the original JIRA result which is already filtered for this field
    // $target is where you append the result
    var _processFieldAssignee = function ($field, $target) {
        var $alink = $field.find('a').first();
        var userName = $alink.text();
        var avatarId = $alink.attr('rel');
        
        // create avatar image
        var $avatarImg = $('<img />').attr({
            width: '32',
            height: '32',
            alt: userName,
            title: userName,
            // image avatar 32x32 with format (https://extranet.iconmobile.com/jira/secure/useravatar?size=medium&ownerId=srezic)
            src: '/secure/useravatar?size=small&ownerId=' + avatarId
        });
        $alink.empty();
        // if (avatarId)
        //  {
        //  $alink.append($avatarImg); 
        //  }
        // else
        //    {
        // 	$alink.append(userName);
        //  }
        $alink.append(userName);
        $target.html($alink);
    };
    
    // internal function used by parseJiraResult to handle field action menu
    // $field contains the original JIRA result which is already filtered for this field
    // $target is where you append the result
    var _processFieldActionMenu = function ($field, $target) {        
        $target.html($field.html());
        
        // modify the icon, icon enlargement!!
        var $linkIcon = $target.find('.issue-actions-trigger');
        // $linkIcon.removeClass('icon-tools-small');
        // $linkIcon.addClass('icon-tools');
        
        // create drop down menu
        AJS.Dropdown.create({
            trigger: $linkIcon,
            autoScroll: false,
            ajaxOptions: {
                dataType: "json",
                cache: false,
                formatSuccess: JIRA.FRAGMENTS.issueActionsFragment
            }
        });    
    };    
    
    checkJiraTableLoaded();
};

// Common style (dashboard, header, menu, ...)
var STYLE_COMMON = 
        '.dashboard ul.column li.gadget { border: none; margin-left: 5px; padding-left: 5px; border-right: 1px dashed grey; width: 260px} ' +

    '#dashboard { width:5000px; } ' +
    '.gadget-container, .gadget {' +
    '  min-height: 1200px; ' +
    '  display:inline-block; ' +
    '  float:left; ' +
    '  margin-top: 10px; ' +
    '} ' +
    '.layout .column {' +
    '  margin: 0; ' +
    '} ' +
    '.aui-page-header{' +
    ' padding: 10px 0px 0px 10px !important'+
    '} ' +  
    '.layout { padding:10px !important; } ' +
    
    '.page-type-dashboard #dashboard.v-tabs ul.vertical { width:100%; } ' +
    '.vertical > li { display: inline; float:left } ' +
    '.dashboard { padding:0 !important;} ' +
    
    // Common style (dashboard, header, menu, ...)    
    'ul#dashboard-tabs {' +
    'z-index:1000;'+  
    ' padding: 10px;' +
    ' margin: 0 10px 0 0;' +
    ' color: #fff;' +
    ' position: fixed;' +    
    ' width: 100%;' +
    ' }' +
    ' ul#dashboard-tabs li { display: inline; }' +
    ' ul#dashboard-tabs li a {' +
    ' padding: .25em 1em;' +
    ' background-color: #333;' +
    ' color: #fff;' +
    ' text-decoration: none;' +
    ' float: right;' +
    ' border-bottom: solid 1px #fff;' +
    ' border-top: solid 1px #fff;' +
    ' border-right: solid 1px #fff;' +
    ' }' +
    ' a:link, a:visited { color: #fff; }' +
    ' ul#dashboard-tabs li a:hover {' +
    ' color: #000;' +
    ' background-color: #fff;' +
    ' }     ' +
    ' ul#dashboard-tabs li.active {' +
    'padding:5px;'+
    'font-size: 20px !important;'+
    'color: black !important;'+
    'display: none;'+    
    ' }     ' +
    
    // dashboard backgound
    '#dashboard-content { ' +
    '  background: url(' + 'http://static.tumblr.com/yrtczpi/vQWmen4v1/bg.jpg' + ') !important ' +    
    '}' + 
    
    // transparent background for columns & item
    '.dashboard-item-content  { background: none !important; border: none !important } ' +
    '.dashboard div.gadget .gadget-container { border: none !important } ' +
    '.dashboard div.gadget .gadget-hover { background: none } ' +
    
    
    // dashboard option
    '#dash-options { ' +
    '  right: 0; ' +
    '  top: 80px; ' +
    '  position: fixed; ' +
    '  z-index: 1000; ' +
    '}  ' +
    
    // column header
    '.dashboard-item-header>h3 { ' +
    '  height: 45px; ' + 
    '} ' +
    '.dashboard-item-title { ' +
    '  font-size: 1em !important; ' +
    '  line-height: 1.2em !important; ' +
    '}' +
    
    // fixed top header
    '.aui-theme-default #content { ' +
    '   padding: 41px 0px ' +
    '} ' +
    '.aui-layout #header { ' +
    '   position: fixed; ' +
    '   z-index: 1000; ' +
    '   width: 100%; ' +    
    
    '} ' +
    
    // JIBAN menu
    '#jiban-menu { ' +
    '  right: 0px; ' +
    '  top: 5px;' +
    '  margin: 5px; ' +
    '  padding: 5px; ' +   
    '  position: fixed; ' +
    '  z-index: 5000; ' +
    '  background-color: black; ' +
    '} ' +
    
    // What changed during FULLscreen mode, hiding top header & footers
    '.aui-theme-default #content.fullscreen { ' +
    '   padding: 0px; ' +
    '} ' +
    '.aui-layout #header.fullscreen, .aui-layout #footer.fullscreen, #dash-options.fullscreen, #dashboard-tabs.fullscreen { ' +
    '   display: none; ' +
    '} ' +
    '#jiban-menu.fullscreen { top: 5px; } ' +
    
    '';

// custom iFrame style (columns, issues) for BRIGHT THEME
var STYLE_IFRAME_BRIGHT = 

    '.duedate  {' +
    ' position: absolute; ' +
    ' padding: 5px; ' +
    ' right: 0px; ' +
    ' top: 24px; ' +
    'font-weight: bold;' +
    '} ' +
    '.fixversion  {' +
    ' background-color: green; ' +
    ' position: absolute; ' +
    ' padding: 5px; ' +
    ' right: 10px; ' +
    ' top: 32px; ' +
    
    '} ' +
    '.count-pagination { clear:both;padding:8px 0;table-layout:auto; } ' +
    '.count-pagination .pagination { text-align:right; white-space:nowrap; } ' +
    '.count-pagination .pagination a.icon { margin:0; vertical-align:top; } ' +
    '#issuenav .count-pagination{padding:0 16px;} ' +
    'span .results-count-total{font-weight:normal;} ' +
    '#jiban-table .issuerow .summary a {' +
    'color: black;' +
    '}' +
    '.gadget-iframe   {height:1000px !important}'+
    '#issuetable{background:#fff;border-collapse:collapse;margin:8px 0;width:100%;} ' +
    '#issuetable{margin:8px 0;width:100%;} ' +
    'body { background: none !important; }' +
    
    // pagination on top
    '.empty-results, .count-pagination { height: 40px; }' +
    
    // Hide original JIRA result
    '#jira .results-wrap #issuetable { display: none }' +
    
    // jiban-table style    
    '#jiban-table { margin:8px 0 ;width:99%; } ' +
    '#jiban-table .row-container, #jiban-table .rowHeader { ' +
    '    display: inline-block; ' +  
    '     margin: 7px 0px; ' +
    '     padding: 0px 0px; ' +
    '}' +
    '#jiban-table .row-container { ' +
    '  width: 100%; background-image: url(http://subtlepatterns.com/patterns/paper_2.png); ' + 
    '} ' +
    
    // default background color
    '#jiban-table .issuerow { float: left; width:100%; padding-top: 10px; padding-bottom:10px; ' +
    '  background:-webkit-radial-gradient(center, rgba(255, 255, 255, 0.1), rgba(150, 150, 150, 0.5));' +
    '  background:-moz-radial-gradient(center, rgba(255, 255, 255, 0.1), rgba(150, 150, 150, 0.5));' +
    '  background:-ms-radial-gradient(center, rgba(255, 255, 255, 0.1), rgba(150, 150, 150, 0.5));' +
    '  background:-o-radial-gradient(center, rgba(255, 255, 255, 0.1), rgba(150, 150, 150, 0.5));' +
    '  background:radial-gradient(center, rgba(255, 255, 255, 0.1), rgba(150, 150, 150, 0.5));' +
    '} ' +
    
    //  background colors based on project
    '#jiban-table .project-IBER { background-color: rgba(255, 0, 0, 0.5); border: 1px solid rgba(255, 0, 0, 0.4); border-radius:3px }' +
    '#jiban-table .project-EFM { background-color: rgba(215, 0, 96, 0.5); border: 1px solid rgba(215, 0, 96, 0.4); border-radius:3px } ' +
    '#jiban-table .project-ITOOLS { background-color: rgba(241, 141, 5, 0.5); border: 1px solid rgba(241, 141, 5, 0.4); border-radius:3px } ' +
    '#jiban-table .project-BOAEXT { background-color: rgba(17, 63, 140, 0.5); border: 1px solid rgba(17, 63, 140, 0.4); border-radius:3px } ' +
    '#jiban-table .project-KBBAP{ background-color: rgba(97, 174, 36, 0.5); border: 1px solid rgba(97, 174, 36, 0.4); border-radius:3px } ' +
    '#jiban-table .project-KBBFR { background-color: rgba(0, 161, 203, 0.5); border: 1px solid rgba(0, 161, 203, 0.4); border-radius:3px } ' +
    '#jiban-table .project-IFB { background-color: rgba(120, 41, 203, 0.5); border: 1px solid rgba(120, 41, 203, 0.4); border-radius:3px } ' +
    '#jiban-table .project-BFS { background-color: rgba(5, 200, 213, 0.5); border: 1px solid rgba(5, 200, 213, 0.4); border-radius:3px } ' +
    '#jiban-table .project-ENR { background-color: rgba(215, 0, 96, 0.5); border: 1px solid rgba(215, 0, 96, 0.4); border-radius:3px } ' +
    
    
    '#jiban-table .issuerow .issuekey { float: left; font-weight:bold; height:auto;margin-left: 10px; font-size: large; } ' +
    '#jiban-table .issuerow .issuekey a { color:black; text-shadow: 1px 1px 2px rgba(195, 195, 195, 1); } ' +
    '#jiban-table .issuerow .issuetype { float: left; padding-left: 5px; padding-top: 4px; height:auto; } ' +
    '#jiban-table .issuerow .priority { float: right; height:auto; margin-right: 5px; margin-left:5px; background-color:white; border: 1px solid grey; border-radius:3px} ' +
    '#jiban-table .issuerow .assignee { float: right; margin-top:5px; padding: 2px; background-color: white; border: 1px solid #ccc; height:auto; margin-right: 10px} ' +
    '#jiban-table .issuerow .issue_actions { float: right; width: 18px; height: 20px; overflow: hidden; height:auto; } ' +
    '#jiban-table .issuerow .summary { float: left; clear: right; width:78%; height:auto; margin-left: 10px; border-top: 1px dashed #222;  margin-top:10px; padding-top:10px; margin-bottom:10px } ' +
    '#jiban-table .issuerow   { ' +  
    '  position: relative; ' +
    '} ' +
    '#jiban-table .parentissue { ' +
    '  background: transparent url(/jira/s/en_US4g7h0s/731/7/1.0/_/download/resources/jira.webresources:issue-table/../../../images/icons/icon_separator.png) no-repeat scroll 100% 2px; ' +
    '  padding-right: 10px; ' +
    '} ' +
    '.row-container :before, .row-container :after { ' +  
    '  z-index: -1;' + 
    '  position: absolute;' + 
    '  content: "";' + 
    '  bottom: 19px;' + 
    '  left: 8px;' + 
    '  height: 8px;' + 
    '  width: 49%;' + 
    '  max-width:300px;' + 
    '  background: transparent;' + 
    ' -webkit-box-shadow: 0 15px 10px #777;' + 
    ' -moz-box-shadow: 0 15px 10px #777;' + 
    '  box-shadow: 0 15px 10px #777;' + 
    '  -webkit-transform: rotate(-2deg);' + 
    '  -moz-transform: rotate(-2deg);' + 
    '  -o-transform: rotate(-2deg);' + 
    '  -ms-transform: rotate(-2deg);' + 
    '  transform: rotate(-2deg);' + 
    '} ' +
    '.row-container :after   { ' +  
    '  -webkit-transform: rotate(3deg);' + 
    '  -moz-transform: rotate(3deg);' + 
    '  -o-transform: rotate(3deg);' + 
    '  -ms-transform: rotate(3deg);' + 
    '  transform: rotate(3deg);' + 
    '  right: 10px;' + 
    '  left: auto;' + 
    '} ' + 
    '';

// Overriding common style (dashboard, header, menu, ...) for the PRINT theme
var STYLE_COMMON_PRINT = 
    
  
 '.dashboard ul.column li.gadget { border: none; margin-left: 5px; padding-left: 5px; border-right: 1px dashed grey; width: 520px} ' +
'    .gadget-container, .gadget {' +
'border: none !important;' +
'width: 520px !important;' +
'}' +
    // dashboard backgound for print theme
    '#dashboard-content { ' +
    '  background: white !important ' +    
    '}' + 
    // column header
    '.dashboard-item-title { ' +
    '  font-size: large !important; ' +
    '}' +
    '';

// custom iFrame style (columns, issues) for PRINT THEME
var STYLE_IFRAME_PRINT = 

    '.count-pagination { clear:both;padding:8px 0;table-layout:auto; color: black; } ' +
    '.count-pagination .pagination { text-align:right; white-space:nowrap; } ' +
    '.count-pagination a, .count-pagination a:link, .count-pagination a:visited { color: black;} ' +
    '.count-pagination .pagination a.icon { margin:0; vertical-align:top; } ' +
    '#issuenav .count-pagination{padding:0 16px;} ' +
    'span .results-count-total{font-weight:normal;} ' +
    
    //'#issuetable{background:#fff;border-collapse:collapse;margin:8px 0;width:100%;} ' +
    '#issuetable{margin:8px 0;width:100%;} ' +
    'body { background: none !important; }' +
    
    // pagination on top
    '.empty-results, .count-pagination { height: 40px; }' +
    
    // Hide original JIRA result
    '#jira .results-wrap #issuetable { display: none }' +
    
    // jiban-table style    
    '#jiban-table { margin:8px 0;width:100%; } ' +
    '#jiban-table .row-container, #jiban-table .rowHeader { ' +
    '    display: inline-block; ' +  
    '     margin: 7px 0px; ' +
    '     padding: 0px 0px; font-size:large' +
    '}' +
    '#jiban-table .row-container { ' +
    '  width: 100%; ' + 
    '} ' +
    
    // default background color
    '#jiban-table .issuerow { height:530px; width: 99%; float: left; padding-top: 10px; padding-bottom:10px; ' +
    '-webkit-border-radius: 2px;' +
    'background: white;' +
    'border-top: 1px solid black;' +
    'border-left: 1px solid black;' +
    
    '} ' +
    
    //  background colors based on project
    '#jiban-table .issuekey{ } ' +
    '#jiban-table .issuerow{margin-bottom:215px} ' +
    '#jiban-table .issuerow .issuekey {margin-top: 72px; font-weight:bold;text-align:center; margin-bottom: 15px; height:auto;   } ' +
    '#jiban-table .issuerow .issuekey a { color:black; font-size: 68px; } ' +
    '#jiban-table .issuerow .issuekey a:hover { text-decoration: none; text-decoration:underline } ' +
    '#jiban-table .issuerow .issuetype { position: absolute; top: 20px; left: 20px; height:auto; } ' +
    '#jiban-table .issuerow .priority { position: absolute; top: 20px; right: 20px; height:auto;} ' +
    '#jiban-table .issuerow .assignee { display: none;} ' +
    '#jiban-table .issuerow .issue_actions { display:none; } ' +
    '#jiban-table .issuerow .summary { font-size:44px; float: left; clear: right;  height:auto; margin: 20px; } ' +
    '#jiban-table .issuerow .summary a { color:black;  } ' +
    '#jiban-table .issuerow .summary a:hover { text-decoration: none;  } ' +
    '#jiban-table .issuerow   {' +  
    '  position: relative; ' +
    '} ' +
    '.duedate  {' +
    ' position: absolute; ' +
    ' padding: 5px; ' +
    ' left: 15px; ' +
    ' bottom: 24px; ' +
    ' font-size: 36px; ' +
    ' font-weight: bold;' +
    '} ' +
    '.fixversion  {' +
    ' background-color: transparent; ' +
    ' position: absolute; ' +
    ' padding: 5px; ' +
    ' right: 20px; ' +
    ' top: 32px; ' +
    '} ' +  
    '#jiban-table .parentissue { ' +
    '  background: transparent url(/jira/s/en_US4g7h0s/731/7/1.0/_/download/resources/jira.webresources:issue-table/../../../images/icons/icon_separator.png) no-repeat scroll 100% 2px; ' +
    '  padding-right: 10px; ' +
    '} ' +
     'img, a img, fieldset {' +
    'border: 0;' +
    'width: 56px;' +
    'height: 56px;' +
    '}' +
     '.dashboard div.gadget .gadget-container{width:100% !important;} '+
    '.dashboard-item-header {display: none} '+   
    
    '';

// the MAIN function
$(document).ready(function () {    
    var $head = $('head');
    
    // inject global style
    injectStyle($head, STYLE_COMMON);
    if (CURRENT_THEME == THEMES_PRINT) {
        injectStyle($head, STYLE_COMMON_PRINT, 'jiban-theme-print');
    }
    
    processTabs();
    injectDropDown();
    processWidgetHeader();
    processLayout();
    
    // process iFrame
    var $iframes = $('.gadget-iframe');
    $iframes.each(function (idx, theIframe) { 
        $(this).load(function () {
            var $iframeContents = $(this).contents();
            
            // get the iFrame body
            var $iframebody = $iframeContents.find('body').first();
            if (!$iframebody.length) {
                console.log('cannot access iframe\'s body');
                return;
            }
            //console.log($iframebody.html());
            
            // modify iframe style
            switch (CURRENT_THEME) {
                case THEMES_PRINT:
                    injectStyle($iframebody, STYLE_IFRAME_PRINT);
                    break;
                    
                case THEMES_BRIGHT:
                default:
                    injectStyle($iframebody, STYLE_IFRAME_BRIGHT);
                    break;
            }
            
            // remove old style
            $iframebody.find('link[href$="issue-table.css"]').remove();
            
            injectScript($iframebody, SCRIPT_IFRAME);
        });
    });
});
