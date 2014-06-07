// ==UserScript==
// @name        Ninja wide frame
// @namespace   freddo
// @include 	*://apps.facebook.com/ninjakingdom/*
// @description Makes window wide and hide chat.
// @version     0.99a
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(".fbDockWrapper { display: none !important; }");
javascript: (function () {
    try {
            if (document.getElementById('iframe_canvas')) {
            try{
                            if (document.getElementById('contentCol'))
                                document.getElementById('contentCol').removeChild(document.getElementById('rightCol'));
			}catch(e){}


			try{
                            if (document.getElementById('pagelet_canvas_content')){
                                    document.getElementById('pagelet_canvas_content').style.width = "100%";
                                    document.body.style.backgroundColor = "black";
                            }
			}catch(e){}


			try{
                            if (document.getElementById('iframe_canvas')){
                                document.getElementById('iframe_canvas').style.height = '3000px';
			}
                        }catch(e){}

			try{
            if (document.getElementById('rightCol')){
                            var ScrareyCreepBox = document.getElementById('rightCol');
                            ScrareyCreepBox.parentNode.removeChild(ScrareyCreepBox);
                        }
			}catch(e){}
            return;
        }

    } catch (e) {}
})()