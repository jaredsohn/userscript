// ==UserScript==
// @name           Digg Me Later v1.0
// @namespace      http://blog.dujodu.com
// @description    Save the Digg!
// @include    *
// @exclude	http://*digg.com*
// ==/UserScript==

// only execute if the link has come from digg

if(((document.referrer.indexOf("http://www.digg.com") == 0) || (document.referrer.indexOf("http://digg.com") == 0)) == true) {
    
    var imgIcon = 'data:image/gif;base64,' +
    'R0lGODlhKQAWAOYAAP///8zer/7+/cvdrczers7fss7gs9XkvcjbqP7//u3z48rdreHs0ODrz9Pi' +
    'ucrdrO705Pf688fbqNzpyff68v///sjbqc3fsc/gtNflwfz9+sbapeLs0szesMncq9LiuMvdrNPj' +
    'utHht9flv+Pt083estblv8rdq9PiwMncqfr7/93pycvers7gtM7gsfv7/+Tu1s7ftPj68+Hr0Ozy' +
    '69rnzd7p0Pr89+zy6tblwOLs0/n7+tvmztPju/3+/NflwPn6/cfap+zz4tHhufb4+u705u/15dXk' +
    'vvv8//r7/c3er9Tjvcbap/3+/9Liufz9/8rcrO/08N3pyunw5t7q0Pj69OLs0d/q0drnxtvnxuHr' +
    '0tDhtdjlwtrmzM7fsc3fstjmw9Pivczdru704+Tt1e/15tHhttvnzNvox87fs/39+83etPb5+cnc' +
    'rdDgtdbkvsXZpMfapsncqODq2uTt4P3+++nw4/39/d3o0djlweHrz/H18uLs0M3fs8/gs/z9+yH5' +
    'BAAAAAAALAAAAAApABYAAAf/gAUBgwEnPDsAAG9rUYkAMxaEkpOUkx+SFkWOB0eOAFqRlaKVl4QW' +
    'EJsmjmwoJ6Ovkh8EswQSqIkmfgy7KCkdAbTBs4TCtINbXwbKA0aOP3ISCwtKFwQDacrZ2QEDHdra' +
    'gmdEAuQCFY4jHnN35A1BNUnl8mouHVPy8kIIL579B2FNHDVYoKKfIwEDbBh0pADBwk0HPDUYcG6h' +
    'gAV8HgJo6ChBiABlIEockCCRDGVVEl1k4AgGCCwMHSZKYIDJLQAHIgokmYiCBw8RVC5gmcgKnBwx' +
    'O2KwJXJnSQAUHjwICmClIw4bMiSdufRmzpFPo04VShQAVq2JOHJlmuir055St6laTXR2K4AEXZsm' +
    'mhg2LtmrWe0mcHNKLwC+PQcMkDvUkY44XOwC+KNBgGE9PAFU0KCh4lwAPjTUkWxwic5EVAZovEhC' +
    'o9qFdKCMcEQjRgApKyboRnND5YUQuXVnIRMzj4PjyB046QDCC/I+IGqVKEA9gNwWKdpQLyAGTEwz' +
    'isOHJzAoPAtueJ4srOCiBI6HYxCIgCWJRQskD4E8uKLRDoIe2wUo4HYXiFBRPyp0YUFrC+0xxAWB' +
    'AAA7';
    
    var imgClose = 'data:image/gif;base64,' +
    'R0lGODlhDgAOAOYAAI+hcrnLnJCic83fsN3vwLjKm7PFlpKkdYaYaczer7TGl7DCk5Smd4mbbJ2v' +
    'gIyeb7bImaGzhLLEldzuv5qsfZGjdH2PYIKUZYGTZICSY5epeputfq2/kNTmt4udbo2fcM7gsZmr' +
    'fNfpuo6gcXqMXZ6wgau9jtDis6e5irXHmKO1hoeZaoOVZp+xgtvtvrHDlJyuf9nrvNLktdrsvam7' +
    'jNHjtMjaq3mLXHiKW8bYqc/hsq/Bkqq8jcTWp3+RYoSWZ3eJWqCyg7rMnYWXaNPltqy+j9XnuAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
    'BAAAAAAALAAAAAAOAA4AAAe0gAlCGgCFhoUMLwkFMDkgA5CRIDYwRRoQAZkFmpuZBwIQBgYLBRIG' +
    'CgqiKRsAoQsnEwULMTGoKSEPChIQEwQTIgQECyULGggSOxwvM8EEKggN0RgcJiY0Mi4uIgweIwAI' +
    'FjwoKCcdRjUdRA4CBz84KhEtPToODwMJFOw+QA4bAiwUEHgA8OFBhQMZLBxcMQTagxEfBLAjEcIC' +
    'AwobHJRoEaFjkBUVEjAggSFDyQsoWdwQkCAQADs=';
    
    // intercept click event for closing bar
    document.addEventListener ('click', function(event) {
        if(event.target == document.getElementById("diggMeLaterClose")) {
            var e = document.getElementById('diggMeLater');
            e.parentNode.removeChild (e);
            document.body.style.paddingTop = '0';
        }
    }, true);
    
    // don't execute inside of iframes (otherwise it gets caught by advertisements)
    if(parent.location.href ) {
            var u = window.location.href;
            var diggMeLater = document.createElement("div");
            diggMeLater.innerHTML = '<div id="diggMeLater" style="background:#ccdeaf;text-align:right;border-bottom: 1px solid #888888;margin-bottom:10px;padding:5px;color:white;position:fixed;width:100%;top:0;left:0;z-index:99999;display:block;">'+
            '<div style="float:left;margin: 1px 0 0 5px;"><a href="http://www.digg.com/"><img id="diggMeLaterIcon" style="padding:0; margin:0; line-height:0; float:left; border:0;" /></a></div>' +
            "<img id='diggMeLaterClose' style='float: right;border:0; line-height:0; cursor: pointer;margin: 5px 15px 0 0' /><iframe src='http://digg.com/tools/diggthis.php?u="+escape(u)+"&k=ccdeaf&s=compact' style='height:18px; width:120px;margin: 4px 4px 0 0;float:right;' frameborder='0' scrolling='no'></iframe>"+
			'</div>';
            document.body.style.paddingTop = '29px';
            document.body.insertBefore(diggMeLater, document.body.firstChild);
            var diggMeLaterIcon = document.getElementById("diggMeLaterIcon");
            var diggMeLaterClose = document.getElementById("diggMeLaterClose");
            
            diggMeLaterIcon.src = imgIcon;
            diggMeLaterClose.src = imgClose;
    }
}