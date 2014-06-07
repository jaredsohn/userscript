// ==UserScript==
// @name           Eotect Golbal Panel
// @namespace      eotect@myplace
// @description    Create a panel on top of the page.
// @include        http*
// @exclude			*ikeepu.com*
// ==/UserScript==

const PANEL_ID = "xrlin_panel";
const PANEL_BOX_ID = "xrlin_panel_pbox";
const PANEL_HOLDER_ID = "xrlin_panel_holder";
const SEPARATOR_TEXT="&nbsp;&nbsp;";// &nbsp; &nbsp;";
const PANEL_CONTROL_ID = 'xrlin_panel_control';
    function debugPrint(text) {
        //GM_log("Eotect Golbal Panel:" + text);
		return true;
    }
    
var XRZPanel = {
	TEXT_SHOW : '+',
	TEXT_HIDE : '-',
    DOMParent : null,
    DOMPanel : null,
    DOMBox : null,
    DOMHolder : null,
    DOMControl : null,
    init : function() {
        debugPrint("Start on " + document.location);
        if(parent != window) {
            debugPrint("In a frame? Stop here!");
            return false;
        }
        if(document.getElementById(PANEL_ID)) {
            debugPrint("Panel already created? Stop here!");
            this.DOMParent = document.body;
            this.DOMPanel = document.getElementById(PANEL_ID);
            this.DOMBox = document.getElementById(PANEL_BOX_ID);
            this.DOMHolder = document.getElementById(PANEL_HOLDER_ID);
			this.DOMControl = document.getElementById(PANEL_CONTROL_ID);
            return true;
        }
        panelwidth="100%";
        panelheight="40px";
        var panel=document.createElement("table");
        panel.id=PANEL_ID;
        //panel.style.margin="20px";
        panel.style.padding="2px";
        panel.style.margin="0px";
        panel.style.zIndex='32768';
        panel.style.top="30px";
        panel.style.right="0px";
        panel.style.width='auto';
//        panel.style.position="fixed"; 
        panel.style.position="absolute";        
//        panel.style.position='relative';
        panel.style.textAlign='right';
        panel.style.align='right';
		
		panel.style.font = '13px helvetica, arial, clean, sans-serif';
        //panel.style.width=panelwidth;
        //panel.style.height=panelheight;
        panel.style.display = "block";
        
        var tr = document.createElement('tr');
        tr.style.border="1px solid black";

        /*
        var td = document.createElement('td');
        var control = document.createElement('span');
        control.id = 'panel_delete';

        control.innerHTML = '&nbsp;-';
        control.style.cursor = 'pointer';
        control.addEventListener('click',function() {
                    XRZPanel.delete();return 1;
                },
                false);
        td.appendChild(control);   
        tr.appendChild(td);
        */
        var td = document.createElement('td');
        var control = document.createElement('span');
        control.id = PANEL_CONTROL_ID;

        control.innerHTML = this.TEXT_HIDE;//'&lt;&lt;&lt;';
        control.style.cursor = 'pointer';
        control.addEventListener('click',function() {
                    XRZPanel.toggle();return 1;
                },
                false);
        td.appendChild(control);
        
        tr.appendChild(td);
        
        
        var linkbox=document.createElement("td");
        linkbox.id= PANEL_BOX_ID;
        linkbox.style.margin="0px";
        linkbox.style.padding="0px";
        //linkbox.style.top="5px";
        //linkbox.style.right="20px";
        linkbox.style.textAlign="center";
        //linkbox.style.position="fixed";
        //linkbox.style.backgroudColor='darkblue';
        
		//linkbox.style.font = '13px/27px Arial,sans-serif';
		linkbox.style.font = '13px helvetica, arial, clean, sans-serif';
//        linkbox.style.fontSize="12px";
        linkbox.style.display = 'none';
        // var holder = document.createElement("div");
        // holder.id = PANEL_HOLDER_ID;
        // holder.style.height=panelheight;
        // holder.style.display = "none";
        tr.appendChild(linkbox);
        
        
        
        panel.appendChild(tr);
        
        panel.style.border="1px solid black";
        panel.style.backgroundColor="#FEFEFE";
        panel.style.color='#010101';
        linkbox.style.color='#030303';
        //panel.style.backgroundColor="white";
        //panel.style.color='#111111';
        
        // var ss = document.createElement('style');
        // ss.innerText = '.a {color:black;cursor:bean;    }';
        // panel.appendChild(ss);
        
        //document.body.insertBefore(holder,document.body.firstChild);
        document.body.insertBefore(panel,document.body.firstChild);
        debugPrint("Panel box created");
        this.DOMParent = document.body;
        //this.DOMHolder = document.getElementById(PANEL_HOLDER_ID);
        this.DOMPanel = document.getElementById(PANEL_ID);
        this.DOMBox = document.getElementById(PANEL_BOX_ID);
        this.DOMControl = document.getElementById(PANEL_CONTROL_ID);
        
        return true;
    },

    add : function(elm,space) {
        if(this.DOMBox) {
            this.DOMBox.appendChild(elm);
            if(space) {this.addSpace()};
            return 1;
        }
        return null;
    },
    addSpace : function(count) {
        if(this.DOMBox) {
            var separator = document.createElement("span");
			if(count) {
				var space = '';
				for(var i=0;i<count;i++) {
					space = space + '&nbsp;';
				}
				separator.innerHTML = space;				
			}
			else {
				separator.innerHTML = SEPARATOR_TEXT;
			}
            return this.DOMBox.appendChild(separator);
        }
        return null;
    },
    hide : function() {
        this.DOMBox.style.display = "none";
        this.DOMControl.innerHTML = this.TEXT_SHOW;//'&lt;&lt;&lt;';
    //    this.DomPanel.style.width='200px';
    },
    show : function() { 
        this.DOMBox.style.display = "block";
        this.DOMControl.innerHTML = this.TEXT_HIDE;//'&gt;&gt;&gt;';
        //this.DOMPanel.style.width='100%';
    },
    toggle : function() {
        if(this.DOMBox.style.display == "none") 
            this.show();
        else
            this.hide();
    },
    delete : function() {
        //this.DOMParent.removeChild(this.DOMHolder);
        this.DOMParent.removeChild(this.DOMPanel);
    }
}

XRZPanel.init();

if(!unsafeWindow.XRZ) {
	unsafeWindow.XRZ = {Panel:XRZPanel};
}
else {
	unsafeWindow.XRZ.Panel = XRZPanel;
}
// if(unsafeWindow.xrlin_jquery) {
	// unsafeWindow.xrlin_jquery('#' + PANEL_ID).addClass('ui-button ui-button-text-only ui-widget ui-state-default ui-corner-all');
// }
