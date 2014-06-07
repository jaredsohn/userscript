// ==UserScript==
// @name           Add symbolic link
// @description    Add current page as a symbolic link to another page
// @author         Dan Dudley
// @include        http://*localhost*FrontPage*
// @exclude        http://*?properties
// @version        1.0
// @require        http://code.jquery.com/jquery-1.5.min.js
// ==/UserScript==

var symbolicLinkPrefix = "file://FitNesseRoot/";

$(document).ready(function() {
    var testLink = $('a[href$="test"]');
    if (testLink.length == 0) {
      return;
    }

    $(".actions").append('<a id="symbolicLink" href="javascript:void(0);">Link to Me</a>');

    $("#symbolicLink").click(function() {
        var suitePage = prompt("What page would you like to add the symbolic link to this page to?\n\nexample: FrontPage.IntegrationTests",
                               "");
        if (suitePage != null && suitePage != "") {
            var symbolicLinkName = prompt("What name do you want to give the symbolic link?\n\nPlease follow the standard FitNesse page naming convention.", "");

            if (symbolicLinkName != null && symbolicLinkName != "") {
                // convert the given path to the symbolic link syntax
                var frontPageIndex = document.location.toString().indexOf("FrontPage");
                var currentFitnessePage = document.location.toString().substring(frontPageIndex);
                var symbolicLinkPath = symbolicLinkPrefix + currentFitnessePage.replace(/\./g, "/");

	
		// make ajax request to tell the parent page to make a symbolic link to the current page
                $.ajax({
                           url: suitePage,
                           data: {
                               responder: "symlink",
                               linkName: symbolicLinkName,
                               linkPath: symbolicLinkPath
                           },
                           dataType: "html"
                       });
            }
        }
    });
});
