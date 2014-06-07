// ==UserScript==
// @name           FP OIFY Link
// @namespace      
// @description    Places a link to the OIFY on front page.
// @include        *
// Copyright (C) 2008 Joscpe
// Updated by sloppy_joes
// ==/UserScript==

icon="data:image/gif;base64,R0lGODlhEwATAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAATABMAAAj/APcJFLhM0o0AMADEmKRsoEOBYmBEkndPHj55l1SgebhP34GJ8kKGjBcyUoxlA6OtuCTvmLx4yGC2DHkpxkAxZxaFCUZyZKRFZ15GErNPGYww+9AAEEbymBhlygCEoRhAX5pIafZlihHmYrBJ0fbFiBFMHlaymQZOjRepoUBlE+PFACAvjBg0OGmKuSsGR1l8AGCI7CkzHj6SJGPONRumcZicYXRGDuNSHoAbL1cUKvRnS+dCVQptqSLsZQw0E8OEtlKItetCK8piXQYDWaQqWzhvMbQ79IqYMFCKiYQvzB8ufxq5W35ry9ShA2NEkluFkTt6xOpJChOvpsNoMYI2IJ40qdFjszHCPhSj4hK7YJdka+Q4UFmagzBW3ECD0mFAADs="

var allNav, thread, indicator, oify;
allNav = document.getElementsByClassName('navbarlink');
nav = allNav[allNav.length - 1];
oifyText = '<a href="http://www.facepunch.com/forumdisplay.php?f=56"><img src="'+icon+'" width="33" height="35" alt="OIFY" />OIFY - INTERNET!</a>';
oify = document.createElement("div");
oify.setAttribute("class","navbarlink");
oify.innerHTML = oifyText;
nav.parentNode.insertBefore(oify, nav.nextSibling);