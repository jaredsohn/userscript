// LinkBucks Skipper
// version 0.5.0
// Last edit: Complete rework. Everything should function as intended. Added a fresh link of their service links.
// 6-24-2013
//
//
// version 0.4.1
// Last edit: Checked the link skipping. Seems to working fine. Also added another one of their websites.
// 3-14-2010
//
//
// version 0.4.0
// Last edit: Fixed the link grabbing part. I haven't look at this in ages. Sorry
// Also added new linkbucks websites and excluded linkbucks if you are making links
// 8-17-2009
// Copyright (c) 2008-2013 Josh Margolis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          LinkBucks Skipper
// @description   Why wait for ads? Skip them.
// @version        0.5.0
// @run-at         document-start
// @include       *.linkbucks.com*
// @include       *.baberepublic.com*
// @include       *.blahetc.com*
// @include       *.linkgalleries.net*
// @include       *.linkseer.net*
// @include       *.placepictures.net*
// @include       *.picturesetc.com*
// @include       *.ugalleries.net*
// @include       *.qvvo.com*
// @include       *.realfiles.net*
// @include       *.seriousfiles.com*
// @include       *.seriousurls.com*
// @include       *.thatsprime.com*
// @include       *.thesegalleries.com*
// @include       *.thesefiles.com*
// @include       *.thosegalleries.com*
// @include       *.tinybucks.net*
// @include       *.uberpicz.com*
// @include       *.ubervidz.com*
// @include       *.ubucks.net*
// @include       *.urlpulse.net*
// @include       *.viraldatabase.com*
// @include       *.youfap.com*
// @include       *.zxxo.net*
// @exclude       *www.linkbucks.com*
// ==/UserScript==

//Kill external script
window.addEventListener('beforescriptexecute', function(e) {

    //for external script:
	src = e.target.src;
	if (src.search(/link\.js/) != -1) {
		e.preventDefault();
		e.stopPropagation();
	};
	
}, true);

//Wait for load and pop to new link
document.addEventListener ("readystatechange", FireWhenReady, true);
function FireWhenReady () {
    this.fired  = this.fired || false;

    if (    document.readyState != "uninitialized"
        &&  document.readyState != "loading"
        &&  ! this.fired
    ) {
        this.fired = true;

        document.body.onload  = function () {
            var bod = document.body.innerHTML;
			var link = bod.match(/Lbjs\.TargetUrl = \'(.*?)\'/);
			window.location = link[1];
        };
    }
}