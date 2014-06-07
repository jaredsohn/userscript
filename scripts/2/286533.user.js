// ==UserScript==
// @name        TodoistCondensed
// @namespace   hellochameleon.com
// @description UPDATE: Adjustments for Todoist's in-house attempt at fluid layout. Dumped the cute project/label/filter icons<br /> Strips out empty days, condenses row height, general UI improvements, fluid width, two breakpoints to adjust columns for screen use.
// @include     https://todoist.com/app*
// @version     1.7
// ==/UserScript==

var styleFix = document.createElement('style');
styleFix.innerHTML="body, body .mini_version { max-width: 996px; width: auto; margin: 0 auto; padding:0!important; background-color: #F9F9EE}";
styleFix.innerHTML+="body.mini_version { background-color: #fff; }";
styleFix.innerHTML+="body, #list, .items li, a { font-size:12px; }";
styleFix.innerHTML+="#all_holder { margin:0!important; max-width:none; padding:0 12px!important; }";
styleFix.innerHTML+="body.mini_version > #all_holder { padding: 0 !important; }";
styleFix.innerHTML+="#td_logo, #td_logo .invisible_bg { background: transparent; }";
styleFix.innerHTML+="#top_right { padding: 10px 2px 10px 0; position: relative; background-color:inherit; border-bottom: 0px solid; border-left: 0px solid; }";
styleFix.innerHTML+="#list { margin: 0 18px 12px 0; }";
styleFix.innerHTML+="#td_logo { height:auto; width:auto; position:relative; border-bottom:none; } #top_filters { margin: 0; padding: 12px 0 0; } #list_holder { margin:0; }";
styleFix.innerHTML+="#left_menu { width:206px; margin-top:0; padding: 14px 24px 0 0; }";
styleFix.innerHTML+="#left_menu_tabs { border-bottom:none; } #left_menu_tabs .control { border-bottom: 1px solid #fff; } .show_projects .projects, .show_labels .labels, .show_filters .filters { border-bottom: 1px solid #998 !important; }";
styleFix.innerHTML+="#left_menu li { border-radius: 3px; } .filter:hover, #left_menu .items li:hover { background-color: #fff!important; } #left_menu li + li { margin-top:3px; }";
styleFix.innerHTML+="#left_menu li.current { background-color: #eaeada!important; border-radius: 4px 0 0 4px; padding-left: 9px; padding-right: 0; width: 195px; }";
styleFix.innerHTML+=".counter_count { color:#aa9; } .counter_color { margin-top:0; height:12px; width:12px; border-radius:12px; } img.object_color { display:none; }";
styleFix.innerHTML+="#content, #top_bar { background-color:transparent; }";
styleFix.innerHTML+="#content, .mini_version #content { padding: 12px 12px 0; background-color:#fff; }";
styleFix.innerHTML+="#content { margin-left:240px; }";
styleFix.innerHTML+="#top_bar { position:relative; width:100%!important; border:none; margin-bottom:12px; padding-top:9px; }";
styleFix.innerHTML+=".GB_top_arrow_fixed { top:30px!important; } #GB_window { top:44px!important; }";
styleFix.innerHTML+="#editor, #info_container { padding: 0 0 75px !important; vertical-align: top; width: 100% !important; }";
styleFix.innerHTML+=".cmp_search { margin-right: 6px!important; padding:0!important; width:17px; }";
styleFix.innerHTML+=".input_q, .mini_version .input_q { width:auto!important; padding: 6px; border-radius:4px; }";
styleFix.innerHTML+="#agenda li { padding: 0; }";
styleFix.innerHTML+="#agenda_box .item_table { margin: 12px 0; white-space: nowrap; }";
styleFix.innerHTML+="a.action, #project_man a.action, #pe_items_controller a.action { background-color: #CBF0EF; border-radius: 3px; color: #777766 !important; margin-top: 6px; padding: 3px 6px; text-decoration: none; }";
styleFix.innerHTML+="a.action:hover { color:inherit; text-decoration:none!important; box-shadow: 0 0 3px #35BBB7 inset; }";
styleFix.innerHTML+="#list_holder a.action img, .cmp_plus_red, #add_link, .today_count { display:none; }";
styleFix.innerHTML+=".items li { padding: 6px; }";
styleFix.innerHTML+=".section_header { border-radius: 3px; padding: 4px !important; }";
styleFix.innerHTML+=".section_header, .section_header a { background: none repeat scroll 0 0 #eaeada; border-bottom: none; font-size: 10px !important; letter-spacing: 1px; text-transform: uppercase }";
styleFix.innerHTML+=".h2_date { font-size: inherit; }";
styleFix.innerHTML+=".task_item:hover, .task_item:hover .content, .task_item:hover .menu, .task_item:hover .project { background-color: #F9F9EE; border-bottom:none; }";
styleFix.innerHTML+="#agenda_view ul { margin-bottom: 0; }";
styleFix.innerHTML+="#editor .items li { padding: 0 5px; } #agenda_view li { font-size: 13px; }";
styleFix.innerHTML+="li.task_item + li.task_item { border-top: 1px dotted #DDDDCC; }";
styleFix.innerHTML+=".task_item td { padding-bottom: 6px; padding-top: 6px; }";
styleFix.innerHTML+=".task_item .content, .task_item .project, .task_item .time { border-bottom: none; }";
styleFix.innerHTML+=".no_tasks, .no_tasks li, .no_tasks .date { display: none; }";
styleFix.innerHTML+="#bottom_bar { background:transparent; }";
styleFix.innerHTML+=".mini_version #editor { min-width:0; padding-top:0!important; }";
styleFix.innerHTML+=".mini_version #left_menu { background-color:#fff; }";
styleFix.innerHTML+=".super_mini #search_bar {max-width:none!important;}";
styleFix.innerHTML+="@media only screen and (max-width: 528px) { #completed_items { display:none; } }";
styleFix.innerHTML+="@media only screen and (max-width: 372px) { #notifications_counter, #completed_items { display:none; } .mini_version #top_bar #top_icons { padding-right:0; } .cmp_gear { position:fixed; bottom: 5px; right: 72px; } .mini_version #content, .mini_version #top_bar, .mini_version #bottom_bar { min-width:0!important; } #GB_window { left:0!important; } #GB_window > .GB_Window_holder { width: 100%!important; }  }";

document.body.appendChild(styleFix);