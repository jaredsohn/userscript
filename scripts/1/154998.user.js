// ==UserScript==
// @name greader
// ==/UserScript==

#gb { display: none !important; }

    
    #logo-container, #logo-section { display: none !important; }

    
    #top-bar
    {
        height: 0px !important;
        position: static !important;
    }

    
    #search
    {
        margin-left: 0px !important;
        min-width: 0px !important;
        padding-bottom: 0px !important;
        padding-top: 0px !important;
        position: absolute !important;
        right: 0px !important;
        z-index: 999 !important;
    }

    
    #search-input
    {
        float: none !important;
        margin-top: 2px !important;
        width: auto !important;
    }
    #search .search-restrict
    {
        float: none !important;
        margin-left: 2px !important;
        margin-right: 2px !important;
        margin-top: -4px !important;
        width: auto !important;
    }

    
    #search .jfk-button { display: none !important; }

    
    body.no-chrome { margin-top: -26px !important; }

    
    #viewer-header, #sections-header, #lhn-add-subscription-section { height: 28px !important; }

    
    #sections-header { margin-bottom: 5px !important; }

    
    #lhn-add-subscription
    {
        left: 2px !important;
        margin-left: 0px !important;
        margin-top: 1px !important;
        top: 0px !important;
        width: auto !important;
    }

    
    #sections-header .contents, #viewer-top-controls-container
    {
        padding-top: 1px !important;
        margin-top: 0px !important;
        top: 0px !important;
    }

    
    #settings-button-container { float: none !important; }
    #sections-header .settings-button-container { float: none !important;}
    .fullscreen #settings-button-container { float: right !important; }

    
    #item-up-down-buttons, #chrome-view-links, #gbqfb  { display: none !important; }
    .fullscreen #item-up-down-buttons, .fullscreen #chrome-view-links { display: block !important; }

    
    #nav, #logo-container, #lhn-add-subscription-section, #scrollable-sections-top-shadow, #scrollable-sections-bottom-shadow
    {
        max-width: 180px !important;
        width: 180px !important;
    }

    
    #nav a.tree-link-selected, #nav div.selected { background-color: #EEEEEE !important; }

    
    #nav div[id|="sub-tree-item"][id$="name"] { max-width: 100px !important; }

    
    #nav div[id|="sub-tree-item"][id$="unread-count"] { color: #D24231 !important; }

    
    #home-section
    {
        padding-bottom: 0px !important;
        padding-top: 0px !important;
    }
    #overview-selector
    {
        padding-bottom: 2px !important;
        padding-top: 2px !important;
    }

    
    #reading-list-selector a:first-child { height: 30px !important; }
    #nav .selectors-footer
    {
        margin-bottom: 0px !important;
        margin-left: 0px !important;
        padding-bottom: 0px !important;
    }

    
    #recommendations-tree > li
    {
        margin-bottom: 0px !important;
        margin-top: 0px !important;
    }
    #nav .lhn-section-footer
    {
        margin-bottom: 0px !important;
        margin-left: 0px !important;
        padding-bottom: 0px !important;
        padding-left: 16px !important;
    }

    
    #chrome { margin-left: 180px !important; }
    .lhn-hidden #chrome { margin-left: 0px !important; }

    
    .entry .entry-body, .entry .entry-title { max-width: none !important; }

    
    .entry .entry-main
    {
        padding-left: 10px !important;
        padding-right: 10px !important;
    }

    
    .entry .entry-icons { display: inline !important; }

    
    .entry .entry-icons .star
    {
        vertical-align: middle !important;
        margin-right: 0px !important;
    }

    
    .RIL-checkmark
    {
        vertical-align: middle !important;
        margin-right: 5px !important;
    }

    
    #title-and-status-holder { padding: 0.5ex 0 0.5ex 0.5em !important; }

    
    scrollbar { opacity: 0.3 !important; }



body,div,table,td {
text-shadow: 1px 1px white;
color: #3E4147;
font-size: 16px;
}

::selection {
color: #08D;
background: #DCDCDC;
}

@charset "utf-8";
/* Name:HuYan */

body,table,div,td{background-color: #efefef !important;}