// ==UserScript==
// @name           Raids list and import GUI - Raid Catcher Addon
// @namespace      tag://kongregate
// @description    Kongregate's Dawn of the Dragons Raids list and import GUI - Raid Catcher Addon
// @author         Berbelucha
// @version        1.0.0
// @date           24.05.2013
// @grant          none
// @include        *kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// @include        *web*.dawnofthedragons.com/kong*
// @include        http://userscripts.org/scripts/review/168300
// ==/UserScript==

function rcGUImain() {
    var gm = false;
    try {
        if (typeof Components.interfaces.gmIGreasemonkeyService === "object")
            gm = true;
    }catch (err) {}
    if (typeof unsafeWindow === "undefined" || !gm) {
        unsafeWindow = (function() {
            var el = document.createElement('p');
                el.setAttribute('onclick', 'return window;');
                return el.onclick();
        })();
    }

    window.rcGUI = {
        config: (function(){
            try {
                var tmp = JSON.parse(GM_getValue("rcGUI","{}"));
            }catch (e) {
                var tmp = {};
            }
            tmp.lActive = (typeof tmp.lActive == 'boolean'?tmp.lActive:false);
            tmp.rActive = (typeof tmp.rActive == 'boolean'?tmp.rActive:false);
            tmp.active = (typeof tmp.active == 'boolean'?tmp.active:false);
//            tmp.active = true;
            tmp.parents = (typeof tmp.parents == 'object'?tmp.parents:{});
            tmp.save = function (b) {
                GM_setValue("rcGUI",JSON.stringify(rcGUI.config));
                if(b) setTimeout("rcGUI.config.save();",5000);
            }
            return tmp;
        })(),
        init: function(t) {
            var rc = unsafeWindow.RaidCatcher;
            this.config;
            if (typeof rc === 'object' && document.getElementById("ImportingExpirationTimesDiv") !== null) {//Raidcatcher is found, tab can be created.
                this.initCSS();
                this.initLayout();
                this.initOptions();
                if(this.config.active) this.show();
                this.config.save(true);
            } else {
                if (t < 10) setTimeout("rcGUI.init(" + (++t) + ")", 1000, ++t);
            }
        },
        initLayout: function(){
            var rcGUI_left = document.createElement('div');
            rcGUI_left.id = "rcGUI_leftBox";
            rcGUI_left.className = "rcGUI_Box";
            if(rcGUI.config.lActive) rcGUI_left.className += " active";
            rcGUI_left.innerHTML = '<div class="inner"></div><div class="toggle" onclick="rcGUI.toggle(\'left\'); return false;"></div>';

            var rcGUI_right = document.createElement('div');
            rcGUI_right.id = "rcGUI_rightBox";
            rcGUI_right.className = "rcGUI_Box";
            if(rcGUI.config.rActive) rcGUI_right.className += " active";
            rcGUI_right.innerHTML = '<div class="inner"></div><div class="toggle" onclick="rcGUI.toggle(\'right\'); return false;"></div>';

    //        document.getElementById("");
    //        rcGUI_left.appendChild();

            document.body.insertBefore(rcGUI_left,document.body.childNodes[0]);
            document.body.insertBefore(rcGUI_right,document.body.childNodes[0]);

            

        },
        initCSS: function(){
            var style = ".rcGUI_Box{ display: none; width: auto; height: 100%; position: fixed; top: 0; z-index: 500; box-shadow: 0 0 10px #000000; }";
            style += ".rcGUI_Box .inner{ margin: 10px; box-shadow: inset 0 0 10px #000000; padding: 10px; overflow: scroll; width: 285px; height: calc(100% - 40px); }";
            style += ".rcGUI_Box .toggle{ position: absolute; width: 22px; height: 22px; top: 50%; margin-top: -11px; cursor: pointer; }"
            style += "#rcGUI_leftBox .toggle { right: 3px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1NjQzRjVCQzQ3RDExRTJCMEMxOUMwNzVDQTQzNTk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1NjQzRjVDQzQ3RDExRTJCMEMxOUMwNzVDQTQzNTk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzU2NDNGNTlDNDdEMTFFMkIwQzE5QzA3NUNBNDM1OTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzU2NDNGNUFDNDdEMTFFMkIwQzE5QzA3NUNBNDM1OTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4srNFIAAAA2ElEQVR42mJmYGA4DMTcQHwZiP8wUBHUAfF/IH4FxDlAzEktg1WgBv9HsqCIWhYcQzMc2QIeSgzOwWIwVSwQAuKfeAwH4bfkWrCRgMHIFpSSYkEIkQYjW1BBjAWgVPCBRMNhFlQDMT8+w+eQYTBRFjhRYDAMg3xdzYQlOCgF74D4KbrgCgpcehuIE4CYGd1QUOx+I8PAG7gMhIEEMg0kCPaSYGAssQEuDS2LCRkYRWpMluIx8Co5BsLAeSwGXqLEQBDQpbaBMNCFZGAINeu8LUAcyEBlABBgAMQVv375GHVnAAAAAElFTkSuQmCC); }";
            style += "#rcGUI_rightBox .toggle { left: 3px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdBNEE0OTU3QzQ3RDExRTI5RTJERTI0MDc0QzUyMTEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdBNEE0OTU4QzQ3RDExRTI5RTJERTI0MDc0QzUyMTEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0E0QTQ5NTVDNDdEMTFFMjlFMkRFMjQwNzRDNTIxMTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0E0QTQ5NTZDNDdEMTFFMjlFMkRFMjQwNzRDNTIxMTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xI6w7AAAAzElEQVR42mJgoC7gBOIcID5MbQNfAfF/IK6jhoH5SAbCsAq5BvIAcREWA0H4GLUNhOEccgx8i8dAEP4JxELEGlhKhIEwvJEYAytIMBCGQ/AZWE2GgSD8AZpKUAA/BQbC8Bx0Q6uhtv2nEDshG8oExE+B+B2Vch8GYAbiBCC+QYGLV+CzlRILvkEjnyAgx4IEUsIulgQLdpETOVFEWPAHiKXJjX2QBVfxGF5KafICWXAJi8HnqVV7hGOxQJea9V0IkgVdDDQAgUC8HSDAAPYUvgrrKMTZAAAAAElFTkSuQmCC); }";
            style += "#rcGUI_leftBox.active .toggle{ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdBNEE0OTU3QzQ3RDExRTI5RTJERTI0MDc0QzUyMTEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdBNEE0OTU4QzQ3RDExRTI5RTJERTI0MDc0QzUyMTEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0E0QTQ5NTVDNDdEMTFFMjlFMkRFMjQwNzRDNTIxMTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0E0QTQ5NTZDNDdEMTFFMjlFMkRFMjQwNzRDNTIxMTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xI6w7AAAAzElEQVR42mJgoC7gBOIcID5MbQNfAfF/IK6jhoH5SAbCsAq5BvIAcREWA0H4GLUNhOEccgx8i8dAEP4JxELEGlhKhIEwvJEYAytIMBCGQ/AZWE2GgSD8AZpKUAA/BQbC8Bx0Q6uhtv2nEDshG8oExE+B+B2Vch8GYAbiBCC+QYGLV+CzlRILvkEjnyAgx4IEUsIulgQLdpETOVFEWPAHiKXJjX2QBVfxGF5KafICWXAJi8HnqVV7hGOxQJea9V0IkgVdDDQAgUC8HSDAAPYUvgrrKMTZAAAAAElFTkSuQmCC); }";
            style += "#rcGUI_rightBox.active .toggle{ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1NjQzRjVCQzQ3RDExRTJCMEMxOUMwNzVDQTQzNTk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1NjQzRjVDQzQ3RDExRTJCMEMxOUMwNzVDQTQzNTk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzU2NDNGNTlDNDdEMTFFMkIwQzE5QzA3NUNBNDM1OTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzU2NDNGNUFDNDdEMTFFMkIwQzE5QzA3NUNBNDM1OTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4srNFIAAAA2ElEQVR42mJmYGA4DMTcQHwZiP8wUBHUAfF/IH4FxDlAzEktg1WgBv9HsqCIWhYcQzMc2QIeSgzOwWIwVSwQAuKfeAwH4bfkWrCRgMHIFpSSYkEIkQYjW1BBjAWgVPCBRMNhFlQDMT8+w+eQYTBRFjhRYDAMg3xdzYQlOCgF74D4KbrgCgpcehuIE4CYGd1QUOx+I8PAG7gMhIEEMg0kCPaSYGAssQEuDS2LCRkYRWpMluIx8Co5BsLAeSwGXqLEQBDQpbaBMNCFZGAINeu8LUAcyEBlABBgAMQVv375GHVnAAAAAElFTkSuQmCC); }";
            style += "#rcGUI_leftBox{ left: -316px; border-right: 1px solid #CACACA; padding-right: 20px; background: #fcfff4; /* Old browsers */ background: -moz-linear-gradient(left,  #fcfff4 0%, #dfe5d7 40%, #b3bead 100%); /* FF3.6+ */ background: -webkit-gradient(linear, left top, right top, color-stop(0%,#fcfff4), color-stop(40%,#dfe5d7), color-stop(100%,#b3bead)); /* Chrome,Safari4+ */ background: -webkit-linear-gradient(left,  #fcfff4 0%,#dfe5d7 40%,#b3bead 100%); /* Chrome10+,Safari5.1+ */ background: -o-linear-gradient(left,  #fcfff4 0%,#dfe5d7 40%,#b3bead 100%); /* Opera 11.10+ */ background: -ms-linear-gradient(left,  #fcfff4 0%,#dfe5d7 40%,#b3bead 100%); /* IE10+ */ background: linear-gradient(to right,  #fcfff4 0%,#dfe5d7 40%,#b3bead 100%); /* W3C */ filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fcfff4', endColorstr='#b3bead',GradientType=1 ); /* IE6-9 */ }";
            style += "#rcGUI_rightBox{ right: -316px; border-left: 1px solid #CACACA; padding-left: 20px; background: #b3bead; /* Old browsers */ background: -moz-linear-gradient(left,  #b3bead 0%, #dfe5d7 60%, #fcfff4 100%); /* FF3.6+ */ background: -webkit-gradient(linear, left top, right top, color-stop(0%,#b3bead), color-stop(60%,#dfe5d7), color-stop(100%,#fcfff4)); /* Chrome,Safari4+ */ background: -webkit-linear-gradient(left,  #b3bead 0%,#dfe5d7 60%,#fcfff4 100%); /* Chrome10+,Safari5.1+ */ background: -o-linear-gradient(left,  #b3bead 0%,#dfe5d7 60%,#fcfff4 100%); /* Opera 11.10+ */ background: -ms-linear-gradient(left,  #b3bead 0%,#dfe5d7 60%,#fcfff4 100%); /* IE10+ */ background: linear-gradient(to right,  #b3bead 0%,#dfe5d7 60%,#fcfff4 100%); /* W3C */ filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b3bead', endColorstr='#fcfff4',GradientType=1 ); /* IE6-9 */ }";
            style += "#rcGUI_leftBox.active{ left: 0px; }";
            style += "#rcGUI_rightBox.active{ right: 0px; }";
            style += ".rcGUI_Box .help_icon { display:inline-block; padding-left:3px;width:12px; height:12px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QERFgId/iptggAAAftJREFUKM89kstLVGEcQM/33esMjjM6vq5j0UIzDCJopBpciAVuigajdZCLoEXh/AktahnUUMsg124KpxIkspY3haG3UDoVPcjGmRrvvJx7v18Lo/MfnMNR/EOqpejSy8/pSlMyX0rVpADDTizfFbayJ0b6clbPoAegAGR78+CNx+/mljYqqddlgUgEFbbpDSuSfSHG+9vci2OJmdDAvjUljd/Ra/MrT26v/kp19A+K0xnGnR1XACcfFMS2LOx6VU3H6+6lY3um9OLKenrhzc/Ur8AWg1Lu7Lj6vvUHgOWzQ8qytDLRmLhlUs/Wt9K6XPUzqx+LaG1Ra8Hhmy+YvPcKgPm1IihQSvG+YvBaktGFzUoS0SCijAjFuuH8cAiA+xuVXU2FIhziW7mR1LuJDOILvh8g9TpXz6W4/vQDX1s2u2UUCCgl6CEnlscEiO9La8fHaIszd56zUPAIBGqB0AiMNOsNBrva87q7oy17dH8v7Oxg/BZ20+PhlUkuHIrT9A2+QL1lGIlAxJasPnV8ODd9ZK/bia+k0ZTtli2nby1zN18mZGsxgZFQs6YmHMudGnVytgp3e1LdmhHF3KO3pZT7Y5PFRoxYj8GpeSrZF2bCsd3LYwMzKp7w1P81mqXo4sqndLkWZArFalJrxYFEVz7errNTo05OxRMewF8GHurvcyGirgAAAABJRU5ErkJggg==) center no-repeat;}\
                    .rcGUI_Box.active div.tab_head{background-color:white;cursor:default;text-decoration:none;}\
                    .rcGUI_Box div.tab_head{font-family: Verdana, Arial, sans-serif;font-size: 10px;padding: 3px 5px 4px 5px;background-color: silver;cursor: pointer;text-decoration: underline;margin-right: 1px;}\
                    .rcGUI_Box.active div.tab_pane{position: absolute;display: block;left: 0px;}\
                    .rcGUI_Box div.tab_pane{padding-left:5px;background-color: white;display: none; width:'+RaidCatcher.ui.baseTabPaneWidth+'px; height:'+RaidCatcher.ui.baseTabPaneHeight+'px;}\
                    .rcGUI_Box div#dotd_raid_list {width:98%; height:'+RaidCatcher.ui.baseRaidListHeight+'px;overflow-y:auto;overflow-x:hidden;text-align:left;}\
                    .rcGUI_Box div.DotDRaidItem{width:99%; border-bottom:1px solid #666666; padding:1px 0px 1px 3px;}\
                    .rcGUI_Box div.DotDRaidItem span{padding:0px;float:left; padding-right:2px;}\
                    .rcGUI_Box div.DotDRaidItem .visited{float:right}\
                    .rcGUI_Box div.DotDRaidItem .delete{float:right}\
                    .rcGUI_Box div.RaidDiff1{background-color:#d5e8c7;}\
                    .rcGUI_Box div.RaidDiff1 .diff{color:#8db86d; font-weight:bold;}\
                    .rcGUI_Box div.RaidDiff2{background-color:#eae9cf;}\
                    .rcGUI_Box div.RaidDiff2 .diff{color:#878431; font-weight:bold;}\
                    .rcGUI_Box div.RaidDiff3{background-color:#decaca;}\
                    .rcGUI_Box div.RaidDiff3 .diff{color:#a64343; font-weight:bold;}\
                    .rcGUI_Box div.RaidDiff4{background-color:#e0d6df;}\
                    .rcGUI_Box div.RaidDiff4 .diff{color:#702a69; font-weight:bold;}\
                    .rcGUI_Box div.DotDRaidItem .diff{width:25px;}\
                    .rcGUI_Box div.DotDRaidItem > span {float:left; padding-left:3px;}\
                    .rcGUI_Box div.DotDRaidItem .visited{float:right; padding-right:3px;}\
                    .rcGUI_Box div.DotDRaidItem .raidHead{width:100%; cursor:pointer;}\
                    .rcGUI_Box div.DotDRaidItem .moreInfo{ width:100%; padding:5px; padding-bottom:3px;}\
                    .rcGUI_Box div.DotDRaidItem .moreInfo > div{margin:10 auto;width:95%; background-color:white;}\
                    .rcGUI_Box span.OpenRaidSize {padding-left:12px; background-repeat:no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QMeFAYw/r5jqwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAM0lEQVQY02NkQAK8J+X/w9ifzR8ywtiM6JLo4LP5Q0YmBiIAIz5TYIAok4izjnoOJyacAI78EgKhinQ9AAAAAElFTkSuQmCC);}";
            document.getElementsByTagName('style')[0].innerHTML += style;
        },
        toggle: function(type){
            if(type.localeCompare("left") == 0){
                if(document.getElementById("rcGUI_"+type+"Box").className.match("active") !== null){
                    document.getElementById("rcGUI_"+type+"Box").className = "rcGUI_Box";
                } else {
                    document.getElementById("rcGUI_"+type+"Box").className += " active";
                }
            } else {
                if(document.getElementById("rcGUI_"+type+"Box").className.match("active") !== null){
                    document.getElementById("rcGUI_"+type+"Box").className = "rcGUI_Box";
                } else {
                    document.getElementById("rcGUI_"+type+"Box").className += " active";
                }
            }
        },
        initOptions: function(){
            html = '<br><input type="checkbox" id="rcGUI_options_active"'+((this.config.active)?' checked="checked"':'')+' onclick="rcGUI.activate();"> Activate new GUI?<br>'
            html += '<input type="checkbox" id="rcGUI_options_lActive"'+((this.config.lActive)?' checked="checked"':'')+' onclick="rcGUI.activateL();"> Left box open on start<br>'
            html += '<input type="checkbox" id="rcGUI_options_rActive"'+((this.config.rActive)?' checked="checked"':'')+' onclick="rcGUI.activateR();"> Right box open on start<br>'
            document.getElementById("ChatOptionsDiv").innerHTML += html;
        },
        show: function(){
            rcGUI_left = document.getElementById("rcGUI_leftBox").childNodes[0];
            
            this.getParents();
            
            rcGUI_left.appendChild(document.getElementById("DotDStatusOutput"));
            rcGUI_left.appendChild(document.getElementById("ImportingExpirationTimesDiv"));
            rcGUI_left.appendChild(document.getElementById("ImportingDiv"));
            rcGUI_left.appendChild(document.getElementById("ImportingSubmissionDiv"));
            rcGUI_left.appendChild(document.getElementById("RaidSearchDiv"));
            rcGUI_left.appendChild(document.getElementById("RaidSortingDiv"));
            rcGUI_left.appendChild(document.getElementById("RaidJoinDiv"));
            rcGUI_left.appendChild(document.getElementById("dotd_raid_list"));

            rcGUI_right = document.getElementById("rcGUI_rightBox").childNodes[0];
            rcGUI_right.appendChild(document.getElementById("RaidListOptionsDiv"));
            rcGUI_right.appendChild(document.getElementById("ToolbarOptionsDiv"));
            rcGUI_right.appendChild(document.getElementById("ChatOptionsDiv"));
            rcGUI_right.appendChild(document.getElementById("dotd_raid_filters"));
            
            document.getElementById("rcGUI_leftBox").style.display = "block";
            document.getElementById("rcGUI_rightBox").style.display = "block";
        },
        hide: function(){
            document.getElementById(this.config.parents['tab0']).appendChild(document.getElementById("DotDStatusOutput"));
            
            document.getElementById(this.config.parents['tab1']).appendChild(document.getElementById("RaidSearchDiv"));
            document.getElementById(this.config.parents['tab1']).appendChild(document.getElementById("RaidSortingDiv"));
            document.getElementById(this.config.parents['tab1']).appendChild(document.getElementById("RaidJoinDiv"));
            document.getElementById(this.config.parents['tab1']).appendChild(document.getElementById("dotd_raid_list"));
            
            var par = document.getElementById(this.config.parents['tab2']);
            var ch = par.childNodes[0];
            par.insertBefore(document.getElementById("ImportingExpirationTimesDiv"),ch);
            par.insertBefore(document.getElementById("ImportingDiv"),ch);
            par.insertBefore(document.getElementById("ImportingSubmissionDiv"),ch);
            
            document.getElementById(this.config.parents['tab3']).appendChild(document.getElementById("RaidListOptionsDiv"));
            document.getElementById(this.config.parents['tab3']).appendChild(document.getElementById("ToolbarOptionsDiv"));
            document.getElementById(this.config.parents['tab3']).appendChild(document.getElementById("ChatOptionsDiv"));
            
            document.getElementById(this.config.parents['tab4']).appendChild(document.getElementById("dotd_raid_filters"));
            
            document.getElementById("rcGUI_leftBox").style.display = "none";
            document.getElementById("rcGUI_rightBox").style.display = "none";
        },
        activate: function(){
            if(this.config.active){
                this.config.active = false;
                this.hide();
            } else {
                this.config.active = true;
                this.show();
            }
            this.config.save(false);
        },
        activateL: function(){
            if(this.config.lActive) this.config.lActive = false;
            else this.config.lActive = true;
            this.config.save(false);
        },
        activateR: function(){
            if(this.config.rActive) this.config.rActive = false;
            else this.config.rActive = true;
            this.config.save(false);
        },
        getParents: function(){
            document.getElementById("DotDStatusOutput").parentNode.id = "rcGUI_tab0";
            this.config.parents['tab0'] = document.getElementById("DotDStatusOutput").parentNode.id;
            
            document.getElementById("RaidSearchDiv").parentNode.id = "rcGUI_tab1";
            this.config.parents['tab1'] = document.getElementById("RaidSearchDiv").parentNode.id;
            
            document.getElementById("ImportingExpirationTimesDiv").parentNode.id = "rcGUI_tab2";
            this.config.parents['tab2'] = document.getElementById("ImportingExpirationTimesDiv").parentNode.id;
            
            document.getElementById("RaidListOptionsDiv").parentNode.id = "rcGUI_tab3";
            this.config.parents['tab3'] = document.getElementById("RaidListOptionsDiv").parentNode.id;
            
            document.getElementById("dotd_raid_filters").parentNode.id = "rcGUI_tab4";
            this.config.parents['tab4'] = document.getElementById("dotd_raid_filters").parentNode.id;
            
            this.config.save(false);
        }
    };

    window.rcGUI.init(1);
}
if (/^http:\/\/www\.kongregate\.com\/games\/5thplanetgames\/dawn-of-the-dragons(?:\/?$|\?|#)/i.test(document.location.href)) {//main
    var script = document.createElement("script");
    script.appendChild(document.createTextNode('('+rcGUImain+')()'));
    (document.head || document.body || document.documentElement).appendChild(script);
}                              