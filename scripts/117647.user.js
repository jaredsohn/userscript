// ==UserScript==
// @name          Omniture Dashboard Reformatter
// @namespace     http://journalistopia.com
// @description   A script to reformat Omniture reports so you don't have to wait for a slow PDF.
// @include       https://sc2.omniture.com*
// ==/UserScript==

var scriptElement = document.createElement('style');
scriptElement.type = 'text/css';
scriptElement.innerHTML =  '.logo, .page-num, .title-bar, div#left_nav_container, #suite_header_menu, #suite_header_toolbar, .NavigationMenu, #publishing_menu,.OWL_NavigationMenu,#report_toolbar,#company_logo,#product_header, #footer_top_container, #footer_logo, #copyright_container  {display: none !important;} .publishing_reportlet_data_table_body_border, .publishing_reportlet_data_table_body_border, .publishing_reportlet_data_table_body_event_count_border, .publishing_reportlet_data_table_body, .publishing_reportlet_data_table_body_event_border {font-size: 11.5px !important; padding: .3px 0 !important;} .Page {margin-bottom: 265px !important;}';
document.getElementsByTagName("head")[0].appendChild(scriptElement);

