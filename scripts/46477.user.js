// ==UserScript==
        // @name          Nightcode Channel
        // @namespace     Nightcode Channel
        // @description   Nightcode Channel (Motote Clon Channel)
        // @include       http://www.justin.tv/nightcode
        // ==/UserScript==
        
        window.addEventListener(
            'load', 
            function() { 
        	document.getElementById("adaptvDiv").innerHTML='<object type="application/x-shockwave-flash" id="jtv_player_flash" data="http://www.justin.tv/widgets/jtv_player.swf?channel=motote" bgcolor="#000000" width="468" height="383"><param name="allowFullScreen" value="true"><param name="movie" value="http://www.justin.tv/widgets/jtv_player.swf"><param name="flashvars" value="channel=motote&amp;auto_play=true&amp;start_volume=15"></object>';
        	},
            true);