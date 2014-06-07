 // ==UserScript==
                                                        // @name    Disable right click script
                                                        //visit http://www.rainbow.arch.scriptmania.com/scripts/
                                                        var message="Sorry, right-click has been disabled";
                                                        //@namespace     www.rainbowspace.com
                                                        //@include       http://apps.facebook.com/*
                                                        //@include       http://apps.new.facebook.com/*
                
                                                        // ==/UserScript==//
                                                        ///////////////////////////////////
                                                        function clickIE() {if (document.all) {(message);return false;}}
                                                        function clickNS(e) {if
                                                        (document.layers||(document.getElementById&&!document.all)) {
                                                        if (e.which==2||e.which==3) {(message);return false;}}}
                                                        if (document.layers)
                                                        {document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
                                                        else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
                                                        document.oncontextmenu=new Function("return false")