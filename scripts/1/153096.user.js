// ==UserScript==
// @name           Dave LoU Winter
// @description    LoU Winter disable
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.4
// ==/UserScript==

(function() {

    var inject = function davelouwinter(h,j) {
        if (!window.webfrontend || !webfrontend.config || !window.ClientLib
            || !webfrontend.config.Config || !(h=webfrontend.config.Config.getInstance())
            || !ClientLib.File.FileManager || !(j=ClientLib.File.FileManager.GetInstance())
            || !j.VJ.l[0]
            ) {
            window.setTimeout(davelouwinter, 50);
            return;
        }
        try {
            var version="409443";
            console.info("dave.lou.winter change to version "+version);
            h.setImageSource(h.getImageSource().replace(/\d{6}/,version));
            j.VJ.l[0].XF=j.VJ.l[0].XF.replace(/\d{6}/,version);
        } catch (e) {
            console.error(e)
        }
        console.info("dave.lou.winter exit")
    } // end of inject

    console.info("dave.lou.winter inject");
    var script = document.createElement("script");
    script.innerHTML = "(" + inject.toString() + ")();";
    script.type = "text/javascript";
    script.title = "dave.lou.winter";
    document.getElementsByTagName("head")[0].appendChild(script);

})();



