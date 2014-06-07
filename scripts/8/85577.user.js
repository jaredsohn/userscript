// ==UserScript==
// @name STP System Scanner
// @namespace stp
// @description n.a.
// @include http://universe*.strivetopower.de/galaxy.php*
// @version 0.30
// ==/UserScript==

(function() {
    var body            = document.body;
    var nav5            = document.getElementById("navlin5");
    var galaxyTable     = nav5.getElementsByTagName("table")[1];
    
    // insert link
    var linkLocation    = nav5.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[0];
    linkLocation.innerHTML = '<a id="startScanLink" href="#">&raquo; unbewohnte Planeten scannen</a>';

    // base64 encoded images
    var spySuccess      = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiVJREFUeNpi/P//PwMlgIlUDS2ro4SAmJksAxqXh+WwMLK+/ff37x8g2wkkxkisF2oWBeZzsfNM8DKNZvj47S3D3gvrGf79++sJd0HZbG82XJqBcvksDGwT3I3CGN5/vs3AyvSLwUk3gOHv77/bwQYUTHGtA3J+gmggRjEIyM9nYWSb4GEazvDi/TWG919eA+n7DA9fXmH48eMnA/Mrnr0VwrziLSGOqQx/fv9yfPryvv7WY/M/eFsl3cnqsc1nZ+Gc4GMVzfD8/WWGL9/fM/z+84vh+evnDJdvXQaq/23LmNpq8T/MPZXh8ZsLDNIiWgzfv/9h2HVsDcOPX98qebj42v0d4xievLnI8P3XZ7CL3r5/z3Dv4SMGYNjZzq05dYRZw1Lw572nV13YuZgZXn98xMAEjCBzHXeGT18+utibeDHcfXESGGhvGH4BbX7x+jXDnbsPGH4DbV7YcO4IPBZCStS7eHi4ShWUpRiYmJgYONh4GNRlzBnuPDvD8PXHR7DNH95/Znj88AXY5jU9N4/AwggejX458l3cPJylssriYEOQwcf3XxiePXwN1rxpysMjyHIo6cAjVbKLi5ezVFpJhIGRiREs9vn9V4YXD9+BNe+Y/fwIehRjJCSnOOFeLl6OIillIYYvH38wvHzwHqx536K3R7ClEawp0TaSr5edi63o1/ffIM0Oh5d/OogziYIMwIYtQzgNgJgZlzwMM1KanQECDABGPi0ENq7EYAAAAABJRU5ErkJggg%3D%3D" alt="succeeded" title="spy succeeded">';
    var spyFailed       = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmtJREFUeNqMU0toE2EQ/naTqDSPkoc2pbSlWpAG9ODrkosoLfV1EEUwJ0GwpAQtSEpBvAlCCxIfmKsnb6KCj5ioCKJotVDRSsVqqTUmJtkNyea9u1n//7eJq+nBgW9nmfnm25llhtM0DXqLuq0O4k4R7CLYTmAgmFlBeCgppfV8Ti8QcVsvmixtE517vLBt6oWlrwccz0FaXEaBIP74OeR8YWo4KY23CDxwW686tg4EPCM+cOIS6rk06vkMy/FWJ3ibC1jfh/kbt5Ceng3vT0qjNGekj3sdtguubVsCHt8Qaq/uIHrzIwaP9f/pU8ojFoph8PgANh/ZTSX9pKZw8Gd+nL/bYevizW3n+g95UZp+hLcfTPDFU5iZN0OVVQb6zmJza1B6E8XGfTthtLcHWa2qwd+114vq3EsoVRnDD2Pso9TPfrEx6GNKTUXl/Qt0eneA1vIquAMWCyAXikRAQSp0ptk5LWgUU6M5ypGLZVjtRpDaw7yiwcOVMkRZYci/foLEVAD/Go3RXIOHXAKktp92UCun0pCp8grePf3UIkBjek5FFGkHIAJYKOarUCoyw1K5+6+29ePQXINXzlWJAL7REe5nJTRb0xd/PX+SQS/S4GUljY4QoSOEk4kiamWF/aDPEycYmXrhWYRBH2M/saLg+48iHSHMNjHstE/abcZg7wYD/seW0yqEnHLZL2THmqt8zWm/bjdz/m6nAWT9V7U6ocbFOoRCPRwQsqMtx3TF6Zg0Gbigy6yhfR2w1vg7TnYHuTKQKXGoKdql04J4dtVrpBZyOHqI8xMcJWgcxCLBbXrOY6K4oOf/EmAAfyhg+goYmG4AAAAASUVORK5CYII%3D" alt="failed" title="spy failed">';

    // onload handler, checks spy status
    var spyStatus = function(evt) {
    	var iFrame = evt.target;
        var nav5     = iFrame.contentDocument.getElementById("navlin5");
        var message  = nav5.getElementsByTagName("div")[0].getElementsByTagName("font")[0].innerHTML;
        
    	var row      = galaxyTable.getElementsByTagName("tr")[iFrame.id];
    	var username = row.getElementsByTagName("td")[3];
    	
    	if (message.indexOf("Sonde gestartet") > -1) {
            username.innerHTML = username.innerHTML + " " + spySuccess;
            row.setAttribute("processed", "1");
    	} else {
            username.innerHTML = username.innerHTML + " " + spyFailed;
    	}
    }

    // starts system scan
    var startScan = function (evt) {
        // proceed each line
        var emptyKoords = galaxyTable.getElementsByTagName("tr");

        for (var i = 0; i < emptyKoords.length; i++) {
            var row = emptyKoords[i];
            
            if (row.className == "empty" && row.getAttribute("processed") != "1") {
                var scanUrl = row.getElementsByTagName("td")[8].getElementsByTagName("a")[0];

                // create iFrame
                var iFrame = document.createElement("iframe");
                iFrame.id               = i;
                iFrame.name             = "frame" + i;
                iFrame.style.display    = "none";

                body.appendChild(iFrame);

                // reset status image
                var username = row.getElementsByTagName("td")[3];
                username.innerHTML = username.innerHTML.split("<img")[0];

                // set the iFrame url to start a scan
                iFrame.src = scanUrl;

                iFrame.addEventListener("load", spyStatus, false);
            }
        }
    }

    // add link listener
    var link = document.getElementById("startScanLink");
    link.addEventListener("click", startScan, false);
})();