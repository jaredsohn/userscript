// ==UserScript==
// @name        Golightly feedly
// @version      1.0.2
// @description  Cleaned up feedly
// @author       Fred Golightly
// @include        *.feedly.com*
// ==/UserScript==

.wikiWidgetSave {
    position: absolute;
	top: 4px;
	left: -30px;
    display:none;
    }

.wikiWidgetSave.saved {
    display: inline;
    }

.bottomWikiWidget {
	margin-top: 0 !important;
    height: 0 !important;
    }

body {
    font: 11px arial, sans-serif;
    line-height: 1.2em;
	}


h3 {
    font-size: 14px;
    }
        
.label h2 {
    display: none !important;
    }
            
.profeature {
    display: none; /* Hide Pro ad */
	}

#navSelectorHolder,
.sideAreaModule,
.websiteCallForAction,
.nbrRecommendations, .toBeTagged {
    display: none !important; /* Hide You might also like */
	}
            
#feedlyFrame {
    width: auto !important;
    }

#mainBar {
    margin-left: 150px !important;
    }
            
#feedlyTabs {
    padding: 0 !important;
    width: 150px !important;
    overflow-y: hidden;
	}
            
#feedlyPart {
    width: 90%;
            }
            
#feedlypage {
    width: 100% !important;
    }
            
#feedlyTabsHolder {
    line-height: 1em;
    width: 150px !important;
    opacity: 0.3 !important;
    color: #000 !important;
	}
#feedlyTabsHolder:hover {
    opacity: 0.9 !important;
    }
                
.u100Frame {
    padding: 0 !important;
    border: 0 !important;  
	}

.entryholder {
    opacity: 1;
    }
    
.u100frame.selectedEntry .entryholder{
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    opacity: 1;
    }
                    
.u100frame.selectedEntry a.title {
    color: #4d90f0 !important;
	}
                            
.u100Entry {
	padding: 8px !important;
	}
                                
.entryBody {
    color: #222 !important;
    font-size: 11px !important;
    line-height: 1.2 !important;
    font-family: arial, sans-serif !important;
	}
                            
.tab .feedIndex {
    padding-left: 0px !important;
    }
        
.entryTitle,
.title unread,
.title read,
.u100Entry .title {
    font-size: 14px !important;
	}
        
.u100Entry .title {
    display: inline !important;
    margin-bottom: 0 !important;
    line-height: 1.1em !important;
	}

.entryHolder {
    border: 1px solid #ddd !important;
    }
    
.metadata {
    font-size: 0.8em !important;
    padding-top: 5px;
    width: auto !important;
	}

.metadata span.action {
    display:none !important;
    }
    
.metadata {
    color: transparent !important;
	}
        
.sourceTitle {
    color: #bbb !important;
    }