// ==UserScript==
// @name           Trac Lighthouse Theme
// @namespace      http://agilous.net
// @description    Themes trac to look better, and adds some convenient functionality.
//    * Adds "Submit changes and go to next ticket" button to ticket detail pages (except for the last ticket in a given series, because it has no "next ticket").
//    * Click anywhere on a row to go to that ticket (or report).
//    * Everything looks better (including Search, Admin, and pagination).
//    * If you leave your browser on a report, it will refresh every 5 minutes so you're never looking at too stale of a report. (customizable via numMinutesBetweenRefreshes variable)
// @include        http://svnaccess.razorfishtc.com/projects/*
// @include        https://svnaccess.razorfishtc.com/projects/*
// @version        0.9.2
// ==/UserScript==

// only need jQuery to serialize the form for "Submit and Go to Next Ticket"
// with firefox 4, we can easily serialize the form using native methods.
// TODO: refactor to remove jquery dependency and remove jquery from the script.

// TODO: (probably) show the wiki formatting helper buttons
// TODO: clean up admin section some more ("hint" paragraphs especially)
// TODO: add autocomplete for usernames and email addresses
//       (and maybe also groups - both trac groups and subversion groups)
//       (and maybe also keywords - will need to scrape ALL TICKETS to obtain!!!)
// TODO: add edit-in-place [renaming] for components, priorities, resolutions, severities, ticket types
// TODO: add edit-in-place for versions info (versions is special, it has multiple fields, not just renaming)
// TODO: improve ui/ux for /projects/<project name>/admin/subversion/svnauthz/editgroup/devs
// TODO: improve ui for /projects/<project name>/admin/ticket/versions/<version name>
// TODO: add drag + drop to these Admin sections: Priorities, Resolutions, Severities, Ticket Types
// depending on the update interval, this could put a burden on the server:
// TODO: (tricky, involved) add gmail-like notification and add an 'update ticket' link/button
//       when someone (else) modifies a ticket while you are looking at it (title="2011-02-15T14:51:48-0600 in Timeline">9 days</a> ago)
//       ... will have to keep track of local modifications to the form and restore them after updating the page.
//       ... OR, might be able to just change <input type="hidden" name="ts" value="2011-02-24 19:30:55+00:00" /> to the current time.
// TODO: use custom radios and checkboxes

var version = "0.9.2";
var projectName = document.location.pathname.split("/")[2];
var tracbase = "/projects/" + projectName + "/";
var users = JSON.parse(GM_getValue(projectName+'_TRAC_USERS', null)); // JSON.parse(null) == null
console.log('<'+projectName+' users>',JSON.parse(GM_getValue(projectName+'_TRAC_USERS', null)),'</'+projectName+' users>');
var groups = JSON.parse(GM_getValue(projectName+'_TRAC_GROUPS', null)); // JSON.parse(null) == null
//console.log('<groups>',users,'</groups>');
var head = document.getElementsByTagName('head')[0];

// change this if you like
var numMinutesBetweenRefreshes = 5;

// check if this is the latest version of this script
autoUpdateFromUserscriptsDotOrg({
    name: 'Trac Pro',
    url: 'http://userscripts.org/scripts/source/95849.user.js', // was 37887
    version: version
});

// if the autcomplete user list is out of date or nonexistent, update or create it.
updateUserAutocompleteList( true ); // if users is null, "!users" is true (force update)

updateGroupAutocompleteList( !groups );

// make <projectName> the new main heading (H1), and link it to the "{7} My Tickets" report.
document.getElementById("header").innerHTML = "<h1><a href='/projects/"+projectName+"/report/7'>"+projectName+"</a></h1>";


// remove Trac Stylesheets
xpathForEach("//link[@rel='stylesheet']", function(i, item) {
    head.removeChild(item);
});

function addMyStylesheet(url, media) {
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = url;
    cssNode.media = media;
    head.appendChild(cssNode);
}

// Blueprint 0.8 with slight increase to base font size (102% from 100%)
addMyStylesheet("data:text/css;charset=utf-8;base64,LyogDQogQmx1ZXByaW50IENTUyBGcmFtZXdvcmsgMC44DQogaHR0cDovL2JsdWVwcmludGNzcy5vcmcNCg0KICAgKiBDb3B5cmlnaHQgKGMpIDIwMDctUHJlc2VudC4gU2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mby4NCiAgICogU2VlIFJFQURNRSBmb3IgaW5zdHJ1Y3Rpb25zIG9uIGhvdyB0byB1c2UgQmx1ZXByaW50Lg0KICAgKiBGb3IgY3JlZGl0cyBhbmQgb3JpZ2lucywgc2VlIEFVVEhPUlMuDQogICAqIFRoaXMgaXMgYSBjb21wcmVzc2VkIGZpbGUuIFNlZSB0aGUgc291cmNlcyBpbiB0aGUgJ3NyYycgZGlyZWN0b3J5Lg0KDQoqLw0KDQovKiByZXNldC5jc3MgKi8NCmh0bWwsIGJvZHksIGRpdiwgc3Bhbiwgb2JqZWN0LCBpZnJhbWUsIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSwgYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgY29kZSwgZGVsLCBkZm4sIGVtLCBpbWcsIHEsIGRsLCBkdCwgZGQsIG9sLCB1bCwgbGksIGZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLCB0YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCB7bWFyZ2luOjA7cGFkZGluZzowO2JvcmRlcjowO2ZvbnQtd2VpZ2h0OmluaGVyaXQ7Zm9udC1zdHlsZTppbmhlcml0O2ZvbnQtc2l6ZToxMDIlO2ZvbnQtZmFtaWx5OmluaGVyaXQ7dmVydGljYWwtYWxpZ246YmFzZWxpbmU7fQ0KYm9keSB7bGluZS1oZWlnaHQ6MS41O30NCnRhYmxlIHtib3JkZXItY29sbGFwc2U6c2VwYXJhdGU7Ym9yZGVyLXNwYWNpbmc6MDt9DQpjYXB0aW9uLCB0aCwgdGQge3RleHQtYWxpZ246bGVmdDtmb250LXdlaWdodDpub3JtYWw7fQ0KdGFibGUsIHRkLCB0aCB7dmVydGljYWwtYWxpZ246bWlkZGxlO30NCmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLCBxOmJlZm9yZSwgcTphZnRlciB7Y29udGVudDoiIjt9DQpibG9ja3F1b3RlLCBxIHtxdW90ZXM6IiIgIiI7fQ0KYSBpbWcge2JvcmRlcjpub25lO30NCg0KLyogdHlwb2dyYXBoeS5jc3MgKi8NCmJvZHkge2ZvbnQtc2l6ZTo3NSU7Y29sb3I6IzIyMjtiYWNrZ3JvdW5kOiNmZmY7Zm9udC1mYW1pbHk6IkhlbHZldGljYSBOZXVlIiwgQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjt9DQpoMSwgaDIsIGgzLCBoNCwgaDUsIGg2IHtmb250LXdlaWdodDpub3JtYWw7Y29sb3I6IzExMTt9DQpoMSB7Zm9udC1zaXplOjNlbTtsaW5lLWhlaWdodDoxO21hcmdpbi1ib3R0b206MC41ZW07fQ0KaDIge2ZvbnQtc2l6ZToyZW07bWFyZ2luLWJvdHRvbTowLjc1ZW07fQ0KaDMge2ZvbnQtc2l6ZToxLjVlbTtsaW5lLWhlaWdodDoxO21hcmdpbi1ib3R0b206MWVtO30NCmg0IHtmb250LXNpemU6MS4yZW07bGluZS1oZWlnaHQ6MS4yNTttYXJnaW4tYm90dG9tOjEuMjVlbTt9DQpoNSB7Zm9udC1zaXplOjFlbTtmb250LXdlaWdodDpib2xkO21hcmdpbi1ib3R0b206MS41ZW07fQ0KaDYge2ZvbnQtc2l6ZToxZW07Zm9udC13ZWlnaHQ6Ym9sZDt9DQpoMSBpbWcsIGgyIGltZywgaDMgaW1nLCBoNCBpbWcsIGg1IGltZywgaDYgaW1nIHttYXJnaW46MDt9DQpwIHttYXJnaW46MCAwIDEuNWVtO30NCnAgaW1nLmxlZnQge2Zsb2F0OmxlZnQ7bWFyZ2luOjEuNWVtIDEuNWVtIDEuNWVtIDA7cGFkZGluZzowO30NCnAgaW1nLnJpZ2h0IHtmbG9hdDpyaWdodDttYXJnaW46MS41ZW0gMCAxLjVlbSAxLjVlbTt9DQphOmZvY3VzLCBhOmhvdmVyIHtjb2xvcjojMDAwO30NCmEge2NvbG9yOiMwMDk7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTt9DQpibG9ja3F1b3RlIHttYXJnaW46MS41ZW07Y29sb3I6IzY2Njtmb250LXN0eWxlOml0YWxpYzt9DQpzdHJvbmcge2ZvbnQtd2VpZ2h0OmJvbGQ7fQ0KZW0sIGRmbiB7Zm9udC1zdHlsZTppdGFsaWM7fQ0KZGZuIHtmb250LXdlaWdodDpib2xkO30NCnN1cCwgc3ViIHtsaW5lLWhlaWdodDowO30NCmFiYnIsIGFjcm9ueW0ge2JvcmRlci1ib3R0b206MXB4IGRvdHRlZCAjNjY2O30NCmFkZHJlc3Mge21hcmdpbjowIDAgMS41ZW07Zm9udC1zdHlsZTppdGFsaWM7fQ0KZGVsIHtjb2xvcjojNjY2O30NCnByZSB7bWFyZ2luOjEuNWVtIDA7d2hpdGUtc3BhY2U6cHJlO30NCnByZSwgY29kZSwgdHQge2ZvbnQ6MWVtICdhbmRhbGUgbW9ubycsICdsdWNpZGEgY29uc29sZScsIG1vbm9zcGFjZTtsaW5lLWhlaWdodDoxLjU7fQ0KbGkgdWwsIGxpIG9sIHttYXJnaW46MCAxLjVlbTt9DQp1bCwgb2wge21hcmdpbjowIDEuNWVtIDEuNWVtIDEuNWVtO30NCnVsIHtsaXN0LXN0eWxlLXR5cGU6ZGlzYzt9DQpvbCB7bGlzdC1zdHlsZS10eXBlOmRlY2ltYWw7fQ0KZGwge21hcmdpbjowIDAgMS41ZW0gMDt9DQpkbCBkdCB7Zm9udC13ZWlnaHQ6Ym9sZDt9DQpkZCB7bWFyZ2luLWxlZnQ6MS41ZW07fQ0KdGFibGUge21hcmdpbi1ib3R0b206MS40ZW07d2lkdGg6MTAwJTt9DQp0aCB7Zm9udC13ZWlnaHQ6Ym9sZDt9DQp0aGVhZCB0aCB7YmFja2dyb3VuZDojYzNkOWZmO30NCnRoLCB0ZCwgY2FwdGlvbiB7cGFkZGluZzo0cHggMTBweCA0cHggNXB4O30NCnRyLmV2ZW4gdGQge2JhY2tncm91bmQ6I2U1ZWNmOTt9DQp0Zm9vdCB7Zm9udC1zdHlsZTppdGFsaWM7fQ0KY2FwdGlvbiB7YmFja2dyb3VuZDojZWVlO30NCi5zbWFsbCB7Zm9udC1zaXplOi44ZW07bWFyZ2luLWJvdHRvbToxLjg3NWVtO2xpbmUtaGVpZ2h0OjEuODc1ZW07fQ0KLmxhcmdlIHtmb250LXNpemU6MS4yZW07bGluZS1oZWlnaHQ6Mi41ZW07bWFyZ2luLWJvdHRvbToxLjI1ZW07fQ0KLmhpZGUge2Rpc3BsYXk6bm9uZTt9DQoucXVpZXQge2NvbG9yOiM2NjY7fQ0KLmxvdWQge2NvbG9yOiMwMDA7fQ0KLmhpZ2hsaWdodCB7YmFja2dyb3VuZDojZmYwO30NCi5hZGRlZCB7YmFja2dyb3VuZDojMDYwO2NvbG9yOiNmZmY7fQ0KLnJlbW92ZWQge2JhY2tncm91bmQ6IzkwMDtjb2xvcjojZmZmO30NCi5maXJzdCB7bWFyZ2luLWxlZnQ6MDtwYWRkaW5nLWxlZnQ6MDt9DQoubGFzdCB7bWFyZ2luLXJpZ2h0OjA7cGFkZGluZy1yaWdodDowO30NCi50b3Age21hcmdpbi10b3A6MDtwYWRkaW5nLXRvcDowO30NCi5ib3R0b20ge21hcmdpbi1ib3R0b206MDtwYWRkaW5nLWJvdHRvbTowO30NCg0KLyogZ3JpZC5jc3MgKi8NCi5jb250YWluZXIge3dpZHRoOjk1MHB4O21hcmdpbjowIGF1dG87fQ0KLnNob3dncmlkIHtiYWNrZ3JvdW5kOnVybChzcmMvZ3JpZC5wbmcpO30NCi5jb2x1bW4sIGRpdi5zcGFuLTEsIGRpdi5zcGFuLTIsIGRpdi5zcGFuLTMsIGRpdi5zcGFuLTQsIGRpdi5zcGFuLTUsIGRpdi5zcGFuLTYsIGRpdi5zcGFuLTcsIGRpdi5zcGFuLTgsIGRpdi5zcGFuLTksIGRpdi5zcGFuLTEwLCBkaXYuc3Bhbi0xMSwgZGl2LnNwYW4tMTIsIGRpdi5zcGFuLTEzLCBkaXYuc3Bhbi0xNCwgZGl2LnNwYW4tMTUsIGRpdi5zcGFuLTE2LCBkaXYuc3Bhbi0xNywgZGl2LnNwYW4tMTgsIGRpdi5zcGFuLTE5LCBkaXYuc3Bhbi0yMCwgZGl2LnNwYW4tMjEsIGRpdi5zcGFuLTIyLCBkaXYuc3Bhbi0yMywgZGl2LnNwYW4tMjQge2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OjEwcHg7fQ0KLmxhc3QsIGRpdi5sYXN0IHttYXJnaW4tcmlnaHQ6MDt9DQouc3Bhbi0xIHt3aWR0aDozMHB4O30NCi5zcGFuLTIge3dpZHRoOjcwcHg7fQ0KLnNwYW4tMyB7d2lkdGg6MTEwcHg7fQ0KLnNwYW4tNCB7d2lkdGg6MTUwcHg7fQ0KLnNwYW4tNSB7d2lkdGg6MTkwcHg7fQ0KLnNwYW4tNiB7d2lkdGg6MjMwcHg7fQ0KLnNwYW4tNyB7d2lkdGg6MjcwcHg7fQ0KLnNwYW4tOCB7d2lkdGg6MzEwcHg7fQ0KLnNwYW4tOSB7d2lkdGg6MzUwcHg7fQ0KLnNwYW4tMTAge3dpZHRoOjM5MHB4O30NCi5zcGFuLTExIHt3aWR0aDo0MzBweDt9DQouc3Bhbi0xMiB7d2lkdGg6NDcwcHg7fQ0KLnNwYW4tMTMge3dpZHRoOjUxMHB4O30NCi5zcGFuLTE0IHt3aWR0aDo1NTBweDt9DQouc3Bhbi0xNSB7d2lkdGg6NTkwcHg7fQ0KLnNwYW4tMTYge3dpZHRoOjYzMHB4O30NCi5zcGFuLTE3IHt3aWR0aDo2NzBweDt9DQouc3Bhbi0xOCB7d2lkdGg6NzEwcHg7fQ0KLnNwYW4tMTkge3dpZHRoOjc1MHB4O30NCi5zcGFuLTIwIHt3aWR0aDo3OTBweDt9DQouc3Bhbi0yMSB7d2lkdGg6ODMwcHg7fQ0KLnNwYW4tMjIge3dpZHRoOjg3MHB4O30NCi5zcGFuLTIzIHt3aWR0aDo5MTBweDt9DQouc3Bhbi0yNCwgZGl2LnNwYW4tMjQge3dpZHRoOjk1MHB4O21hcmdpbjowO30NCmlucHV0LnNwYW4tMSwgdGV4dGFyZWEuc3Bhbi0xLCBzZWxlY3Quc3Bhbi0xIHt3aWR0aDozMHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTIsIHRleHRhcmVhLnNwYW4tMiwgc2VsZWN0LnNwYW4tMiB7d2lkdGg6NTBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi0zLCB0ZXh0YXJlYS5zcGFuLTMsIHNlbGVjdC5zcGFuLTMge3dpZHRoOjkwcHghaW1wb3J0YW50O30NCmlucHV0LnNwYW4tNCwgdGV4dGFyZWEuc3Bhbi00LCBzZWxlY3Quc3Bhbi00IHt3aWR0aDoxMzBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi01LCB0ZXh0YXJlYS5zcGFuLTUsIHNlbGVjdC5zcGFuLTUge3dpZHRoOjE3MHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTYsIHRleHRhcmVhLnNwYW4tNiwgc2VsZWN0LnNwYW4tNiB7d2lkdGg6MjEwcHghaW1wb3J0YW50O30NCmlucHV0LnNwYW4tNywgdGV4dGFyZWEuc3Bhbi03LCBzZWxlY3Quc3Bhbi03IHt3aWR0aDoyNTBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi04LCB0ZXh0YXJlYS5zcGFuLTgsIHNlbGVjdC5zcGFuLTgge3dpZHRoOjI5MHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTksIHRleHRhcmVhLnNwYW4tOSwgc2VsZWN0LnNwYW4tOSB7d2lkdGg6MzMwcHghaW1wb3J0YW50O30NCmlucHV0LnNwYW4tMTAsIHRleHRhcmVhLnNwYW4tMTAsIHNlbGVjdC5zcGFuLTEwIHt3aWR0aDozNzBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi0xMSwgdGV4dGFyZWEuc3Bhbi0xMSwgc2VsZWN0LnNwYW4tMTEge3dpZHRoOjQxMHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTEyLCB0ZXh0YXJlYS5zcGFuLTEyLCBzZWxlY3Quc3Bhbi0xMiB7d2lkdGg6NDUwcHghaW1wb3J0YW50O30NCmlucHV0LnNwYW4tMTMsIHRleHRhcmVhLnNwYW4tMTMsIHNlbGVjdC5zcGFuLTEzIHt3aWR0aDo0OTBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi0xNCwgdGV4dGFyZWEuc3Bhbi0xNCwgc2VsZWN0LnNwYW4tMTQge3dpZHRoOjUzMHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTE1LCB0ZXh0YXJlYS5zcGFuLTE1LCBzZWxlY3Quc3Bhbi0xNSB7d2lkdGg6NTcwcHghaW1wb3J0YW50O30NCmlucHV0LnNwYW4tMTYsIHRleHRhcmVhLnNwYW4tMTYsIHNlbGVjdC5zcGFuLTE2IHt3aWR0aDo2MTBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi0xNywgdGV4dGFyZWEuc3Bhbi0xNywgc2VsZWN0LnNwYW4tMTcge3dpZHRoOjY1MHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTE4LCB0ZXh0YXJlYS5zcGFuLTE4LCBzZWxlY3Quc3Bhbi0xOCB7d2lkdGg6NjkwcHghaW1wb3J0YW50O30NCmlucHV0LnNwYW4tMTksIHRleHRhcmVhLnNwYW4tMTksIHNlbGVjdC5zcGFuLTE5IHt3aWR0aDo3MzBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi0yMCwgdGV4dGFyZWEuc3Bhbi0yMCwgc2VsZWN0LnNwYW4tMjAge3dpZHRoOjc3MHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTIxLCB0ZXh0YXJlYS5zcGFuLTIxLCBzZWxlY3Quc3Bhbi0yMSB7d2lkdGg6ODEwcHghaW1wb3J0YW50O30NCmlucHV0LnNwYW4tMjIsIHRleHRhcmVhLnNwYW4tMjIsIHNlbGVjdC5zcGFuLTIyIHt3aWR0aDo4NTBweCFpbXBvcnRhbnQ7fQ0KaW5wdXQuc3Bhbi0yMywgdGV4dGFyZWEuc3Bhbi0yMywgc2VsZWN0LnNwYW4tMjMge3dpZHRoOjg5MHB4IWltcG9ydGFudDt9DQppbnB1dC5zcGFuLTI0LCB0ZXh0YXJlYS5zcGFuLTI0LCBzZWxlY3Quc3Bhbi0yNCB7d2lkdGg6OTQwcHghaW1wb3J0YW50O30NCi5hcHBlbmQtMSB7cGFkZGluZy1yaWdodDo0MHB4O30NCi5hcHBlbmQtMiB7cGFkZGluZy1yaWdodDo4MHB4O30NCi5hcHBlbmQtMyB7cGFkZGluZy1yaWdodDoxMjBweDt9DQouYXBwZW5kLTQge3BhZGRpbmctcmlnaHQ6MTYwcHg7fQ0KLmFwcGVuZC01IHtwYWRkaW5nLXJpZ2h0OjIwMHB4O30NCi5hcHBlbmQtNiB7cGFkZGluZy1yaWdodDoyNDBweDt9DQouYXBwZW5kLTcge3BhZGRpbmctcmlnaHQ6MjgwcHg7fQ0KLmFwcGVuZC04IHtwYWRkaW5nLXJpZ2h0OjMyMHB4O30NCi5hcHBlbmQtOSB7cGFkZGluZy1yaWdodDozNjBweDt9DQouYXBwZW5kLTEwIHtwYWRkaW5nLXJpZ2h0OjQwMHB4O30NCi5hcHBlbmQtMTEge3BhZGRpbmctcmlnaHQ6NDQwcHg7fQ0KLmFwcGVuZC0xMiB7cGFkZGluZy1yaWdodDo0ODBweDt9DQouYXBwZW5kLTEzIHtwYWRkaW5nLXJpZ2h0OjUyMHB4O30NCi5hcHBlbmQtMTQge3BhZGRpbmctcmlnaHQ6NTYwcHg7fQ0KLmFwcGVuZC0xNSB7cGFkZGluZy1yaWdodDo2MDBweDt9DQouYXBwZW5kLTE2IHtwYWRkaW5nLXJpZ2h0OjY0MHB4O30NCi5hcHBlbmQtMTcge3BhZGRpbmctcmlnaHQ6NjgwcHg7fQ0KLmFwcGVuZC0xOCB7cGFkZGluZy1yaWdodDo3MjBweDt9DQouYXBwZW5kLTE5IHtwYWRkaW5nLXJpZ2h0Ojc2MHB4O30NCi5hcHBlbmQtMjAge3BhZGRpbmctcmlnaHQ6ODAwcHg7fQ0KLmFwcGVuZC0yMSB7cGFkZGluZy1yaWdodDo4NDBweDt9DQouYXBwZW5kLTIyIHtwYWRkaW5nLXJpZ2h0Ojg4MHB4O30NCi5hcHBlbmQtMjMge3BhZGRpbmctcmlnaHQ6OTIwcHg7fQ0KLnByZXBlbmQtMSB7cGFkZGluZy1sZWZ0OjQwcHg7fQ0KLnByZXBlbmQtMiB7cGFkZGluZy1sZWZ0OjgwcHg7fQ0KLnByZXBlbmQtMyB7cGFkZGluZy1sZWZ0OjEyMHB4O30NCi5wcmVwZW5kLTQge3BhZGRpbmctbGVmdDoxNjBweDt9DQoucHJlcGVuZC01IHtwYWRkaW5nLWxlZnQ6MjAwcHg7fQ0KLnByZXBlbmQtNiB7cGFkZGluZy1sZWZ0OjI0MHB4O30NCi5wcmVwZW5kLTcge3BhZGRpbmctbGVmdDoyODBweDt9DQoucHJlcGVuZC04IHtwYWRkaW5nLWxlZnQ6MzIwcHg7fQ0KLnByZXBlbmQtOSB7cGFkZGluZy1sZWZ0OjM2MHB4O30NCi5wcmVwZW5kLTEwIHtwYWRkaW5nLWxlZnQ6NDAwcHg7fQ0KLnByZXBlbmQtMTEge3BhZGRpbmctbGVmdDo0NDBweDt9DQoucHJlcGVuZC0xMiB7cGFkZGluZy1sZWZ0OjQ4MHB4O30NCi5wcmVwZW5kLTEzIHtwYWRkaW5nLWxlZnQ6NTIwcHg7fQ0KLnByZXBlbmQtMTQge3BhZGRpbmctbGVmdDo1NjBweDt9DQoucHJlcGVuZC0xNSB7cGFkZGluZy1sZWZ0OjYwMHB4O30NCi5wcmVwZW5kLTE2IHtwYWRkaW5nLWxlZnQ6NjQwcHg7fQ0KLnByZXBlbmQtMTcge3BhZGRpbmctbGVmdDo2ODBweDt9DQoucHJlcGVuZC0xOCB7cGFkZGluZy1sZWZ0OjcyMHB4O30NCi5wcmVwZW5kLTE5IHtwYWRkaW5nLWxlZnQ6NzYwcHg7fQ0KLnByZXBlbmQtMjAge3BhZGRpbmctbGVmdDo4MDBweDt9DQoucHJlcGVuZC0yMSB7cGFkZGluZy1sZWZ0Ojg0MHB4O30NCi5wcmVwZW5kLTIyIHtwYWRkaW5nLWxlZnQ6ODgwcHg7fQ0KLnByZXBlbmQtMjMge3BhZGRpbmctbGVmdDo5MjBweDt9DQpkaXYuYm9yZGVyIHtwYWRkaW5nLXJpZ2h0OjRweDttYXJnaW4tcmlnaHQ6NXB4O2JvcmRlci1yaWdodDoxcHggc29saWQgI2VlZTt9DQpkaXYuY29sYm9yZGVyIHtwYWRkaW5nLXJpZ2h0OjI0cHg7bWFyZ2luLXJpZ2h0OjI1cHg7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZWVlO30NCi5wdWxsLTEge21hcmdpbi1sZWZ0Oi00MHB4O30NCi5wdWxsLTIge21hcmdpbi1sZWZ0Oi04MHB4O30NCi5wdWxsLTMge21hcmdpbi1sZWZ0Oi0xMjBweDt9DQoucHVsbC00IHttYXJnaW4tbGVmdDotMTYwcHg7fQ0KLnB1bGwtNSB7bWFyZ2luLWxlZnQ6LTIwMHB4O30NCi5wdWxsLTYge21hcmdpbi1sZWZ0Oi0yNDBweDt9DQoucHVsbC03IHttYXJnaW4tbGVmdDotMjgwcHg7fQ0KLnB1bGwtOCB7bWFyZ2luLWxlZnQ6LTMyMHB4O30NCi5wdWxsLTkge21hcmdpbi1sZWZ0Oi0zNjBweDt9DQoucHVsbC0xMCB7bWFyZ2luLWxlZnQ6LTQwMHB4O30NCi5wdWxsLTExIHttYXJnaW4tbGVmdDotNDQwcHg7fQ0KLnB1bGwtMTIge21hcmdpbi1sZWZ0Oi00ODBweDt9DQoucHVsbC0xMyB7bWFyZ2luLWxlZnQ6LTUyMHB4O30NCi5wdWxsLTE0IHttYXJnaW4tbGVmdDotNTYwcHg7fQ0KLnB1bGwtMTUge21hcmdpbi1sZWZ0Oi02MDBweDt9DQoucHVsbC0xNiB7bWFyZ2luLWxlZnQ6LTY0MHB4O30NCi5wdWxsLTE3IHttYXJnaW4tbGVmdDotNjgwcHg7fQ0KLnB1bGwtMTgge21hcmdpbi1sZWZ0Oi03MjBweDt9DQoucHVsbC0xOSB7bWFyZ2luLWxlZnQ6LTc2MHB4O30NCi5wdWxsLTIwIHttYXJnaW4tbGVmdDotODAwcHg7fQ0KLnB1bGwtMjEge21hcmdpbi1sZWZ0Oi04NDBweDt9DQoucHVsbC0yMiB7bWFyZ2luLWxlZnQ6LTg4MHB4O30NCi5wdWxsLTIzIHttYXJnaW4tbGVmdDotOTIwcHg7fQ0KLnB1bGwtMjQge21hcmdpbi1sZWZ0Oi05NjBweDt9DQoucHVsbC0xLCAucHVsbC0yLCAucHVsbC0zLCAucHVsbC00LCAucHVsbC01LCAucHVsbC02LCAucHVsbC03LCAucHVsbC04LCAucHVsbC05LCAucHVsbC0xMCwgLnB1bGwtMTEsIC5wdWxsLTEyLCAucHVsbC0xMywgLnB1bGwtMTQsIC5wdWxsLTE1LCAucHVsbC0xNiwgLnB1bGwtMTcsIC5wdWxsLTE4LCAucHVsbC0xOSwgLnB1bGwtMjAsIC5wdWxsLTIxLCAucHVsbC0yMiwgLnB1bGwtMjMsIC5wdWxsLTI0IHtmbG9hdDpsZWZ0O3Bvc2l0aW9uOnJlbGF0aXZlO30NCi5wdXNoLTEge21hcmdpbjowIC00MHB4IDEuNWVtIDQwcHg7fQ0KLnB1c2gtMiB7bWFyZ2luOjAgLTgwcHggMS41ZW0gODBweDt9DQoucHVzaC0zIHttYXJnaW46MCAtMTIwcHggMS41ZW0gMTIwcHg7fQ0KLnB1c2gtNCB7bWFyZ2luOjAgLTE2MHB4IDEuNWVtIDE2MHB4O30NCi5wdXNoLTUge21hcmdpbjowIC0yMDBweCAxLjVlbSAyMDBweDt9DQoucHVzaC02IHttYXJnaW46MCAtMjQwcHggMS41ZW0gMjQwcHg7fQ0KLnB1c2gtNyB7bWFyZ2luOjAgLTI4MHB4IDEuNWVtIDI4MHB4O30NCi5wdXNoLTgge21hcmdpbjowIC0zMjBweCAxLjVlbSAzMjBweDt9DQoucHVzaC05IHttYXJnaW46MCAtMzYwcHggMS41ZW0gMzYwcHg7fQ0KLnB1c2gtMTAge21hcmdpbjowIC00MDBweCAxLjVlbSA0MDBweDt9DQoucHVzaC0xMSB7bWFyZ2luOjAgLTQ0MHB4IDEuNWVtIDQ0MHB4O30NCi5wdXNoLTEyIHttYXJnaW46MCAtNDgwcHggMS41ZW0gNDgwcHg7fQ0KLnB1c2gtMTMge21hcmdpbjowIC01MjBweCAxLjVlbSA1MjBweDt9DQoucHVzaC0xNCB7bWFyZ2luOjAgLTU2MHB4IDEuNWVtIDU2MHB4O30NCi5wdXNoLTE1IHttYXJnaW46MCAtNjAwcHggMS41ZW0gNjAwcHg7fQ0KLnB1c2gtMTYge21hcmdpbjowIC02NDBweCAxLjVlbSA2NDBweDt9DQoucHVzaC0xNyB7bWFyZ2luOjAgLTY4MHB4IDEuNWVtIDY4MHB4O30NCi5wdXNoLTE4IHttYXJnaW46MCAtNzIwcHggMS41ZW0gNzIwcHg7fQ0KLnB1c2gtMTkge21hcmdpbjowIC03NjBweCAxLjVlbSA3NjBweDt9DQoucHVzaC0yMCB7bWFyZ2luOjAgLTgwMHB4IDEuNWVtIDgwMHB4O30NCi5wdXNoLTIxIHttYXJnaW46MCAtODQwcHggMS41ZW0gODQwcHg7fQ0KLnB1c2gtMjIge21hcmdpbjowIC04ODBweCAxLjVlbSA4ODBweDt9DQoucHVzaC0yMyB7bWFyZ2luOjAgLTkyMHB4IDEuNWVtIDkyMHB4O30NCi5wdXNoLTI0IHttYXJnaW46MCAtOTYwcHggMS41ZW0gOTYwcHg7fQ0KLnB1c2gtMSwgLnB1c2gtMiwgLnB1c2gtMywgLnB1c2gtNCwgLnB1c2gtNSwgLnB1c2gtNiwgLnB1c2gtNywgLnB1c2gtOCwgLnB1c2gtOSwgLnB1c2gtMTAsIC5wdXNoLTExLCAucHVzaC0xMiwgLnB1c2gtMTMsIC5wdXNoLTE0LCAucHVzaC0xNSwgLnB1c2gtMTYsIC5wdXNoLTE3LCAucHVzaC0xOCwgLnB1c2gtMTksIC5wdXNoLTIwLCAucHVzaC0yMSwgLnB1c2gtMjIsIC5wdXNoLTIzLCAucHVzaC0yNCB7ZmxvYXQ6cmlnaHQ7cG9zaXRpb246cmVsYXRpdmU7fQ0KLnByZXBlbmQtdG9wIHttYXJnaW4tdG9wOjEuNWVtO30NCi5hcHBlbmQtYm90dG9tIHttYXJnaW4tYm90dG9tOjEuNWVtO30NCi5ib3gge3BhZGRpbmc6MS41ZW07bWFyZ2luLWJvdHRvbToxLjVlbTtiYWNrZ3JvdW5kOiNFNUVDRjk7fQ0KaHIge2JhY2tncm91bmQ6I2RkZDtjb2xvcjojZGRkO2NsZWFyOmJvdGg7ZmxvYXQ6bm9uZTt3aWR0aDoxMDAlO2hlaWdodDouMWVtO21hcmdpbjowIDAgMS40NWVtO2JvcmRlcjpub25lO30NCmhyLnNwYWNlIHtiYWNrZ3JvdW5kOiNmZmY7Y29sb3I6I2ZmZjt9DQouY2xlYXJmaXg6YWZ0ZXIsIC5jb250YWluZXI6YWZ0ZXIge2NvbnRlbnQ6Ii4iO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjA7Y2xlYXI6Ym90aDt2aXNpYmlsaXR5OmhpZGRlbjt9DQouY2xlYXJmaXgsIC5jb250YWluZXIge2Rpc3BsYXk6YmxvY2s7fQ0KLmNsZWFyIHtjbGVhcjpib3RoO30NCg0KLyogZm9ybXMuY3NzICovDQpsYWJlbCB7Zm9udC13ZWlnaHQ6Ym9sZDt9DQpmaWVsZHNldCB7cGFkZGluZzoxLjRlbTttYXJnaW46MCAwIDEuNWVtIDA7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO30NCmxlZ2VuZCB7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MS4yZW07fQ0KaW5wdXQudGV4dCwgaW5wdXQudGl0bGUsIHRleHRhcmVhLCBzZWxlY3Qge21hcmdpbjowLjVlbSAwO2JvcmRlcjoxcHggc29saWQgI2JiYjt9DQppbnB1dC50ZXh0OmZvY3VzLCBpbnB1dC50aXRsZTpmb2N1cywgdGV4dGFyZWE6Zm9jdXMsIHNlbGVjdDpmb2N1cyB7Ym9yZGVyOjFweCBzb2xpZCAjNjY2O30NCmlucHV0LnRleHQsIGlucHV0LnRpdGxlIHt3aWR0aDozMDBweDtwYWRkaW5nOjVweDt9DQppbnB1dC50aXRsZSB7Zm9udC1zaXplOjEuNWVtO30NCnRleHRhcmVhIHt3aWR0aDozOTBweDtoZWlnaHQ6MjUwcHg7cGFkZGluZzo1cHg7fQ0KLmVycm9yLCAubm90aWNlLCAuc3VjY2VzcyB7cGFkZGluZzouOGVtO21hcmdpbi1ib3R0b206MWVtO2JvcmRlcjoycHggc29saWQgI2RkZDt9DQouZXJyb3Ige2JhY2tncm91bmQ6I0ZCRTNFNDtjb2xvcjojOGExZjExO2JvcmRlci1jb2xvcjojRkJDMkM0O30NCi5ub3RpY2Uge2JhY2tncm91bmQ6I0ZGRjZCRjtjb2xvcjojNTE0NzIxO2JvcmRlci1jb2xvcjojRkZEMzI0O30NCi5zdWNjZXNzIHtiYWNrZ3JvdW5kOiNFNkVGQzI7Y29sb3I6IzI2NDQwOTtib3JkZXItY29sb3I6I0M2RDg4MDt9DQouZXJyb3IgYSB7Y29sb3I6IzhhMWYxMTt9DQoubm90aWNlIGEge2NvbG9yOiM1MTQ3MjE7fQ0KLnN1Y2Nlc3MgYSB7Y29sb3I6IzI2NDQwOTt9", "screen");

// default trac styles for styling code and diffs
addMyStylesheet(tracbase + "chrome/common/css/code.css", "screen");
//addMyStylesheet(tracbase + "/chrome/common/css/changeset.css", "screen");
addMyStylesheet(tracbase + "chrome/common/css/diff.css", "screen");


function cleanWhitespace(node) {
    for (var i=0; i<node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if(child.nodeType == 3 && !/\S/.test(child.nodeValue)) {
            node.removeChild(child);
            i--;
        }
        if(child.nodeType == 1) {
            cleanWhitespace(child);
        }
    }
    return node;
}

function xpathForEach(xpath, fn){
    var nodelist = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var item;
    for (var i=0, l=nodelist.snapshotLength; i<l; i++) {
        item = nodelist.snapshotItem(i);
        fn.apply(item, [i, item]);
    }
}

// add a clearing element after tabcontent
xpathForEach('//div[@id="tabcontent"]', function(i, item){
    var parent = item.parentNode;
    var clearfixEl = document.createElement('div');
    clearfixEl.setAttribute('style', 'display:block;clear:both;line-height:0;height:0;');
    parent.appendChild(clearfixEl);
});

xpathForEach('//div[@id="tabcontent"]/h2[1]', function(i, item){
    var gparent = item.parentNode.parentNode;
    gparent.insertBefore(item, document.getElementById('tabs'));
});

// make ROWS clickable. (do not make form rows clickable though, there are too many possible actions, and no obvious default action)
xpathForEach('//div[@id="content"]/table[contains(@class,"listing")]', function(i, item){
    item.addEventListener('click', function(e){
        //console.log('ticket listing clicked', event);
        e = e || window.event;
        var target = e.originalTarget;
        var tr;
        var depth = 0;
        var maxDepth = 5;
        console.log('ticket listing clicked ', target);
        if(!target || target.nodeName == 'INPUT'){
            return;
        }
        while(target && depth++ < maxDepth){
            if(target.nodeName == "TR" && target.parentNode.nodeName != "THEAD"){
                tr = target;
            }
            target = target.parentNode;
        }
        if(tr){
            location.href = tr.getElementsByTagName('a')[0].getAttribute('href');
        }
    }, false);
});

// remove the Preview button.
xpathForEach('//input[@value="Preview"]', function(i, item){
    var parent = item.parentNode;
    parent.removeChild(item);
    cleanWhitespace(parent);
});

// add ↑ into the "Back to Query" link.
xpathForEach('//div[@id="ctxtnav"]/ul/li[2]/a', function(i, item){
    var itemHTML = item.innerHTML;
    if(itemHTML.indexOf('Back to Query') != -1){
        item.innerHTML = '↑ ' + itemHTML;
    }
});

// move the ← into the .prev link.
xpathForEach('//div[@id="ctxtnav"]//a[@class="prev"]', function(i, item){
    item.innerHTML = '← ' + item.innerHTML;
    var clone = item.cloneNode(true);
    var parent = item.parentNode;
    parent.innerHTML = "";
    parent.appendChild(clone);
});

// move the → into the .next link.
xpathForEach('//div[@id="ctxtnav"]//a[@class="next"]', function(i, item){
    item.innerHTML += ' →';
    var clone = item.cloneNode(true);
    var parent = item.parentNode;
    var nextTicketUrl = item.getAttribute('href');
    parent.innerHTML = "";
    parent.appendChild(clone);
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // "submit and go to next" button
    // TODO: "submit and go back to query" button also and or if there is no next
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    xpathForEach('//input[@value="Submit changes"]', function(j, submitChangesButton){
        var parent = submitChangesButton.parentNode;
        var submitAndGoToNext = document.createElement('a');
        
        submitAndGoToNext.setAttribute('href', 'javascript:;');
        submitAndGoToNext.setAttribute('class', 'button');
        submitAndGoToNext.innerHTML = 'Submit Changes & Go To Next Ticket';
        parent.appendChild(submitAndGoToNext);
        
        // FormData built-in object introduced in firefox 4
        //var formElement = document.getElementById("myFormElement");
        //var xhr = new XMLHttpRequest();
        //xhr.open("POST", "submitform.php");
        //xhr.send(new FormData(formElement));
        
        submitAndGoToNext.addEventListener('click', function(){
            var form = document.getElementById('propertyform');
            var ajaxIndicator = document.createElement('span');
            
            ajaxIndicator.innerHTML = 'saving...';
            ajaxIndicator.setAttribute('class', 'ajaxIndicator loading');
            parent.appendChild(ajaxIndicator);
            
            console.log('jquery(form).serialize(): '+jQuery(form).serialize());
            console.log("url = " + location.protocol + '//' + location.host + form.getAttribute('action'));
            
            GM_xmlhttpRequest({
                method: "POST",
                url: location.protocol + '//' + location.host + form.getAttribute('action'),
                data: jQuery(form).serialize(),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: function(response) {
                    // todo: check for a "valid" response (no errors)
                    //if (response.responseText.indexOf("VALIDATION-DETERMINANT STRING GOES HERE") > -1) {
                        //it's valid...
                    //}
                    //alert('form submitted, '+response.status);
                    if(parseInt(response.status/100, 10) == 2){
                        ajaxIndicator.innerHTML = 'Success!';
                        ajaxIndicator.setAttribute('class', 'ajaxIndicator ajaxSuccess');
                    } else {
                        ajaxIndicator.innerHTML = 'Failure!';
                        ajaxIndicator.setAttribute('class', 'ajaxIndicator ajaxFailure');
                    }
                    setTimeout(function(){
                        location.href = nextTicketUrl;
                    }, 300);
                }
            });
            
        }, false);
        
    });
});

// normalize custom query filters "Status" filter checkboxes
(function(){
    function normalizeStatusFilterInputs(){
        xpathForEach("//td[@class='filter'][@colspan='2']//input", function(i, item){
            var label = item.nextSibling;
            var labelText;
            var spacerTextNode = document.createTextNode(' ');
            while(label.nodeName && label.nodeName != 'LABEL'){
                label = label.nextSibling;
            }
            labelText = label.innerHTML;
            label.innerHTML = '';
            label.appendChild(item);
            label.innerHTML += ' ' + labelText;
            if(i>0){
                label.parentNode.insertBefore(spacerTextNode, label);
            }
        });
    }
    normalizeStatusFilterInputs();
    
    var addFilter = document.getElementById('add_filter');
    if(addFilter){
        addFilter.addEventListener('click', function(e){
            // TODO: only invoke the function if the Status filters were added.
            normalizeStatusFilterInputs();
        }, false);
    }
})();


/* 2/2/2011 - DH - significantly refactored */
// add a speech bubble image next to "comments" that actually have a comment (and are not just notations of actions)
xpathForEach("//div[@id='changelog']//div[contains(@class,'comment')]", function(i, item){
    var commentParagraphs = item.getElementsByTagName('p');
    var hasComments = commentParagraphs.length;
    var speechBubbleImg;
    if(hasComments){
        item.className += ' hasComment';
        speechBubbleImg = document.createElement('img');
        speechBubbleImg.setAttribute('src', 'data:image/png;base64,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');
        speechBubbleImg.setAttribute('class', 'speechBubbleImg');
        item.insertBefore(speechBubbleImg, item.firstChild);
    }
});


// move .buttons up into the fieldset (admin pages) for a more consistent look
xpathForEach("//div[@class='admin']//div[@class='buttons']", function(i, item){
    var prev = item.previousSibling;
    while( prev && prev.nodeType != 1 ){
        prev = prev.previousSibling;
    }
    if(prev && prev.nodeName.toLowerCase() == "fieldset"){
        prev.appendChild(item);
    }
});


// change the wording of the label for a description on admin pages.
xpathForEach("//div[@class='admin']//label[@for='description']", function(i, item){
    
    item.innerHTML = 'Description: <em>(You may use <a tabindex="42" href="' + tracbase + 'wiki/WikiFormatting">WikiFormatting</a> here.)</em>';
    
});


// If you are looking at a report, refresh every 5 minutes (every numMinutesBetweenRefreshes).
// (Might be annoying if it refreshes while you are typing something on a ticket detail - don't auto-refresh ticket detail pages!)
// todo: listen for some event that indicates the user has typed something in a comment form, and disable auto-refresh, unless the user backed out the change.
if(/.*?\/(report)\/.*/.test(location.pathname)){
    setTimeout(function(){
        location.href = location.href;
    }, numMinutesBetweenRefreshes * 60 * 1000);
}


// when viewing a ticket make the milestone name link to the query showing all tickets in this milestone
/** /
if (document.getElementById("ticket")) {
    var milestoneHeading = document.getElementById("h_milestone");
    var ticketMilestone = milestoneHeading.nextSibling.nextSibling.textContent; // newline followed by the actual value
    var milestoneLink = tracbase + "query?status=~&order=keywords&milestone="+escape(ticketMilestone);
    milestoneHeading.nextSibling.nextSibling.innerHTML = "<a href="+milestoneLink+">"+ticketMilestone+"</a>";
}
/**/


/**
 * todo: autocomplete for...
 *          #gp_subject (username),
 *          #sg_subject (username),
 *          #sg_group (group),
 *          "#changepassword (type=text | name=change_user)" (username)
 *          #addgroup (.textwidget | type=text | name=groupname)
 *
 * todo: autocomplete for... (this will be difficult)
 *          #addpath (.textwidget | type=text | name=path)
**/
function updateGroupAutocompleteList( force ) {
    
    // todo: implement. (parse the permissions table, looking for any permissions that are not all uppercase - i.e., groupname)
    
    return;
    
    try {
        // avoid a flood of dialogs e.g. when opening a browser with multiple tabs
        var DoS_PREVENTION_TIME = 2 * 60 * 1000; // 2 minutes
        var isPendingXHR = GM_getValue(projectName+'_CHECKING_GROUPS', null);
        var now = new Date().getTime();
        GM_setValue(projectName+'_CHECKING_GROUPS', now.toString());
        
        // check every week
        var ONE_DAY = 24 * 60 * 60 * 1000;
        var ONE_WEEK = 7 * ONE_DAY;
        var lastChecked = GM_getValue(projectName+'_LAST_CHECKED_GROUPS', null);
        
        if (!force && ((lastChecked && (now - lastChecked) < ONE_WEEK) || (isPendingXHR && (now - isPendingXHR) < DoS_PREVENTION_TIME))){
            return;
        }
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: location.protocol + '//' + location.host + tracbase + "admin/accounts/users",
            onload: function(result) {
                
                // obtain just the 'innerHTML' of the table from the string.
                var text = result.responseText.replace(/.*<table class="listing" id="accountlist">(.*?)<\/table>.*/, "$1");
                
                // "normalize" the markup string for easier parsing
                text = text.replace(/\r/gi, '').replace(/\n/gi, ' ').replace(/\s+/gi, ' ').replace(/> </gi, '><');
                
                var groups = [];
                
                var rows = text.split('<tr>');
                
                if(rows.length > 1){
                    
                    for( var i=2,l=rows.length; i<l; i++ ){
                        
                        cells = rows[i].replace(/<\/td>/gi, '').split('<td>');
                        
                        groups.push(cells[2]);
                        
                    }
                    
                    GM_setValue(projectName+'_TRAC_GROUPS', JSON.stringify(groups) || "");
                    
                }
                
            }
        });
        
        GM_setValue(projectName+'_LAST_CHECKED_GROUPS', now.toString());
        
    } catch (ex) {
    }
}


function updateUserAutocompleteList( force ) {
    console.log('updateUserAutocompleteList( force = ' + force + ' )');
    //try {
        // avoid a flood of dialogs e.g. when opening a browser with multiple tabs
        var DoS_PREVENTION_TIME = 2//2 * 60 * 1000; // 2 minutes
        var isPendingXHR = GM_getValue(projectName+'_CHECKING_USERS', null);
        var now = new Date().getTime();
        GM_setValue(projectName+'_CHECKING_USERS', now.toString());
        
        // check every week
        var ONE_DAY = 24 * 60 * 60 * 1000;
        var ONE_WEEK = 7 * ONE_DAY;
        var lastChecked = GM_getValue(projectName+'_LAST_CHECKED_USERS', null);
        
        if (!force && ((lastChecked && (now - lastChecked) < ONE_WEEK) || (isPendingXHR && (now - isPendingXHR) < DoS_PREVENTION_TIME))){
            //return;
        }
        
        console.log('get users url = ' + location.protocol + '//' + location.host + tracbase + "admin/accounts/users");
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: location.protocol + '//' + location.host + tracbase + "admin/accounts/users",
            onload: function(result) {
                
                console.log('get users completed', result);
                
                // obtain just the 'innerHTML' of the table from the string.
                var text = result.responseText.replace(/.*<table class="listing" id="accountlist">(.*?)<\/table>.*/, "$1");
                
                // "normalize" the markup string for easier parsing
                text = text.replace(/\r/gi, '').replace(/\n/gi, ' ').replace(/\s+/gi, ' ').replace(/> </gi, '><');
                
                var users = [];
                
                var rows = text.split('<tr>');
                
                if(rows.length > 1){
                    
                    for( var i=2,l=rows.length; i<l; i++ ){
                        
                        cells = rows[i].replace(/<\/td>/gi, '').split('<td>');
                        
                        users.push({
                            username: cells[2],
                            realname: cells[3],
                            email: cells[4]
                        });
                        
                    }
                    
                    GM_setValue(projectName+'_TRAC_USERS', JSON.stringify(users) || "");
                    
                }
                
            }
        });
        
        GM_setValue(projectName+'_LAST_CHECKED_USERS', now.toString());
        
    //} catch (ex) {
    //}
}


function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
    try {
        if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
        
        // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
        // and a script with * includes or opening a tabgrop
        var DoS_PREVENTION_TIME = 2 * 60 * 1000;
        var isSomeoneChecking = GM_getValue('CHECKING_FOR_SCRIPT_UPDATE', null);
        var now = new Date().getTime();
        GM_setValue('CHECKING_FOR_SCRIPT_UPDATE', now.toString());
        
        if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
        
        // check every two weeks
        var ONE_DAY = 24 * 60 * 60 * 1000;
        var ONE_WEEK = 7 * ONE_DAY;
        var TWO_WEEKS = 2 * ONE_WEEK;
        var lastChecked = GM_getValue('LAST_CHECKED_FOR_SCRIPT_UPDATE', null);
        
        if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
            onload: function(result) {
                if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header
                
                var theOtherVersion = parseFloat(RegExp.$1);
                if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site
                if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
                    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
                }
            }
        });
        GM_setValue('LAST_CHECKED_FOR_SCRIPT_UPDATE', now.toString());
    } catch (ex) {
    }
}

window.addEventListener('load', function(){
    
    if(!users) return;
    
    var usernames = [];
    var emails = [];
    var realnames = [];
    var user;
    
    for(var i=0,l=users.length; i<l; i++){
        user = users[i];
        usernames.push(user.username);
        emails.push(user.email);
        realnames.push(user.realname);
    }
    
    //console.log(usernames);
    
    // "onjQueryAvailable"
    (function(){
        
        if(unsafeWindow.jQuery){
            
            var jQuery = unsafeWindow.jQuery;
            var $ = jQuery;
            
            // add autocomplete plugin
            (function($){$.fn.extend({autocomplete:function(urlOrData,options){var isUrl=typeof urlOrData=="string";options=$.extend({},$.Autocompleter.defaults,{url:isUrl?urlOrData:null,data:isUrl?null:urlOrData,delay:isUrl?$.Autocompleter.defaults.delay:10,max:options&&!options.scroll?10:150},options);options.highlight=options.highlight||function(value){return value;};options.formatMatch=options.formatMatch||options.formatItem;return this.each(function(){new $.Autocompleter(this,options);});},result:function(handler){return this.bind("result",handler);},search:function(handler){return this.trigger("search",[handler]);},flushCache:function(){return this.trigger("flushCache");},setOptions:function(options){return this.trigger("setOptions",[options]);},unautocomplete:function(){return this.trigger("unautocomplete");}});$.Autocompleter=function(input,options){var KEY={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};var $input=$(input).attr("autocomplete","off").addClass(options.inputClass);var timeout;var previousValue="";var cache=$.Autocompleter.Cache(options);var hasFocus=0;var lastKeyPressCode;var config={mouseDownOnSelect:false};var select=$.Autocompleter.Select(options,input,selectCurrent,config);var blockSubmit;$.browser.opera&&$(input.form).bind("submit.autocomplete",function(){if(blockSubmit){blockSubmit=false;return false;}});$input.bind(($.browser.opera?"keypress":"keydown")+".autocomplete",function(event){hasFocus=1;lastKeyPressCode=event.keyCode;switch(event.keyCode){case KEY.UP:event.preventDefault();if(select.visible()){select.prev();}else{onChange(0,true);}break;case KEY.DOWN:event.preventDefault();if(select.visible()){select.next();}else{onChange(0,true);}break;case KEY.PAGEUP:event.preventDefault();if(select.visible()){select.pageUp();}else{onChange(0,true);}break;case KEY.PAGEDOWN:event.preventDefault();if(select.visible()){select.pageDown();}else{onChange(0,true);}break;case options.multiple&&$.trim(options.multipleSeparator)==","&&KEY.COMMA:case KEY.TAB:case KEY.RETURN:if(selectCurrent()){event.preventDefault();blockSubmit=true;return false;}break;case KEY.ESC:select.hide();break;default:clearTimeout(timeout);timeout=setTimeout(onChange,options.delay);break;}}).focus(function(){hasFocus++;}).blur(function(){hasFocus=0;if(!config.mouseDownOnSelect){hideResults();}}).click(function(){if(hasFocus++>1&&!select.visible()){onChange(0,true);}}).bind("search",function(){var fn=(arguments.length>1)?arguments[1]:null;function findValueCallback(q,data){var result;if(data&&data.length){for(var i=0;i<data.length;i++){if(data[i].result.toLowerCase()==q.toLowerCase()){result=data[i];break;}}}if(typeof fn=="function")fn(result);else $input.trigger("result",result&&[result.data,result.value]);}$.each(trimWords($input.val()),function(i,value){request(value,findValueCallback,findValueCallback);});}).bind("flushCache",function(){cache.flush();}).bind("setOptions",function(){$.extend(options,arguments[1]);if("data"in arguments[1])cache.populate();}).bind("unautocomplete",function(){select.unbind();$input.unbind();$(input.form).unbind(".autocomplete");});function selectCurrent(){var selected=select.selected();if(!selected)return false;var v=selected.result;previousValue=v;if(options.multiple){var words=trimWords($input.val());if(words.length>1){var seperator=options.multipleSeparator.length;var cursorAt=$(input).selection().start;var wordAt,progress=0;$.each(words,function(i,word){progress+=word.length;if(cursorAt<=progress){wordAt=i;return false;}progress+=seperator;});words[wordAt]=v;v=words.join(options.multipleSeparator);}v+=options.multipleSeparator;}$input.val(v);hideResultsNow();$input.trigger("result",[selected.data,selected.value]);return true;}function onChange(crap,skipPrevCheck){if(lastKeyPressCode==KEY.DEL){select.hide();return;}var currentValue=$input.val();if(!skipPrevCheck&&currentValue==previousValue)return;previousValue=currentValue;currentValue=lastWord(currentValue);if(currentValue.length>=options.minChars){$input.addClass(options.loadingClass);if(!options.matchCase)currentValue=currentValue.toLowerCase();request(currentValue,receiveData,hideResultsNow);}else{stopLoading();select.hide();}};function trimWords(value){if(!value)return[""];if(!options.multiple)return[$.trim(value)];return $.map(value.split(options.multipleSeparator),function(word){return $.trim(value).length?$.trim(word):null;});}function lastWord(value){if(!options.multiple)return value;var words=trimWords(value);if(words.length==1)return words[0];var cursorAt=$(input).selection().start;if(cursorAt==value.length){words=trimWords(value)}else{words=trimWords(value.replace(value.substring(cursorAt),""));}return words[words.length-1];}function autoFill(q,sValue){if(options.autoFill&&(lastWord($input.val()).toLowerCase()==q.toLowerCase())&&lastKeyPressCode!=KEY.BACKSPACE){$input.val($input.val()+sValue.substring(lastWord(previousValue).length));$(input).selection(previousValue.length,previousValue.length+sValue.length);}};function hideResults(){clearTimeout(timeout);timeout=setTimeout(hideResultsNow,200);};function hideResultsNow(){var wasVisible=select.visible();select.hide();clearTimeout(timeout);stopLoading();if(options.mustMatch){$input.search(function(result){if(!result){if(options.multiple){var words=trimWords($input.val()).slice(0,-1);$input.val(words.join(options.multipleSeparator)+(words.length?options.multipleSeparator:""));}else{$input.val("");$input.trigger("result",null);}}});}};function receiveData(q,data){if(data&&data.length&&hasFocus){stopLoading();select.display(data,q);autoFill(q,data[0].value);select.show();}else{hideResultsNow();}};function request(term,success,failure){if(!options.matchCase)term=term.toLowerCase();var data=cache.load(term);if(data&&data.length){success(term,data);}else if((typeof options.url=="string")&&(options.url.length>0)){var extraParams={timestamp:+new Date()};$.each(options.extraParams,function(key,param){extraParams[key]=typeof param=="function"?param():param;});$.ajax({mode:"abort",port:"autocomplete"+input.name,dataType:options.dataType,url:options.url,data:$.extend({q:lastWord(term),limit:options.max},extraParams),success:function(data){var parsed=options.parse&&options.parse(data)||parse(data);cache.add(term,parsed);success(term,parsed);}});}else{select.emptyList();failure(term);}};function parse(data){var parsed=[];var rows=data.split("\n");for(var i=0;i<rows.length;i++){var row=$.trim(rows[i]);if(row){row=row.split("|");parsed[parsed.length]={data:row,value:row[0],result:options.formatResult&&options.formatResult(row,row[0])||row[0]};}}return parsed;};function stopLoading(){$input.removeClass(options.loadingClass);};};$.Autocompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,delay:400,matchCase:false,matchSubset:true,matchContains:false,cacheLength:10,max:100,mustMatch:false,extraParams:{},selectFirst:true,formatItem:function(row){return row[0];},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",highlight:function(value,term){return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>");},scroll:true,scrollHeight:180};$.Autocompleter.Cache=function(options){var data={};var length=0;function matchSubset(s,sub){if(!options.matchCase)s=s.toLowerCase();var i=s.indexOf(sub);if(options.matchContains=="word"){i=s.toLowerCase().search("\\b"+sub.toLowerCase());}if(i==-1)return false;return i==0||options.matchContains;};function add(q,value){if(length>options.cacheLength){flush();}if(!data[q]){length++;}data[q]=value;}function populate(){if(!options.data)return false;var stMatchSets={},nullData=0;if(!options.url)options.cacheLength=1;stMatchSets[""]=[];for(var i=0,ol=options.data.length;i<ol;i++){var rawValue=options.data[i];rawValue=(typeof rawValue=="string")?[rawValue]:rawValue;var value=options.formatMatch(rawValue,i+1,options.data.length);if(value===false)continue;var firstChar=value.charAt(0).toLowerCase();if(!stMatchSets[firstChar])stMatchSets[firstChar]=[];var row={value:value,data:rawValue,result:options.formatResult&&options.formatResult(rawValue)||value};stMatchSets[firstChar].push(row);if(nullData++<options.max){stMatchSets[""].push(row);}};$.each(stMatchSets,function(i,value){options.cacheLength++;add(i,value);});}setTimeout(populate,25);function flush(){data={};length=0;}return{flush:flush,add:add,populate:populate,load:function(q){if(!options.cacheLength||!length)return null;if(!options.url&&options.matchContains){var csub=[];for(var k in data){if(k.length>0){var c=data[k];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub.push(x);}});}}return csub;}else if(data[q]){return data[q];}else if(options.matchSubset){for(var i=q.length-1;i>=options.minChars;i--){var c=data[q.substr(0,i)];if(c){var csub=[];$.each(c,function(i,x){if(matchSubset(x.value,q)){csub[csub.length]=x;}});return csub;}}}return null;}};};$.Autocompleter.Select=function(options,input,select,config){var CLASSES={ACTIVE:"ac_over"};var listItems,active=-1,data,term="",needsInit=true,element,list;function init(){if(!needsInit)return;element=$("<div/>").hide().addClass(options.resultsClass).css("position","absolute").appendTo(document.body);list=$("<ul/>").appendTo(element).mouseover(function(event){if(target(event).nodeName&&target(event).nodeName.toUpperCase()=='LI'){active=$("li",list).removeClass(CLASSES.ACTIVE).index(target(event));$(target(event)).addClass(CLASSES.ACTIVE);}}).click(function(event){$(target(event)).addClass(CLASSES.ACTIVE);select();input.focus();return false;}).mousedown(function(){config.mouseDownOnSelect=true;}).mouseup(function(){config.mouseDownOnSelect=false;});if(options.width>0)element.css("width",options.width);needsInit=false;}function target(event){var element=event.target;while(element&&element.tagName!="LI")element=element.parentNode;if(!element)return[];return element;}function moveSelect(step){listItems.slice(active,active+1).removeClass(CLASSES.ACTIVE);movePosition(step);var activeItem=listItems.slice(active,active+1).addClass(CLASSES.ACTIVE);if(options.scroll){var offset=0;listItems.slice(0,active).each(function(){offset+=this.offsetHeight;});if((offset+activeItem[0].offsetHeight-list.scrollTop())>list[0].clientHeight){list.scrollTop(offset+activeItem[0].offsetHeight-list.innerHeight());}else if(offset<list.scrollTop()){list.scrollTop(offset);}}};function movePosition(step){active+=step;if(active<0){active=listItems.size()-1;}else if(active>=listItems.size()){active=0;}}function limitNumberOfItems(available){return options.max&&options.max<available?options.max:available;}function fillList(){list.empty();var max=limitNumberOfItems(data.length);for(var i=0;i<max;i++){if(!data[i])continue;var formatted=options.formatItem(data[i].data,i+1,max,data[i].value,term);if(formatted===false)continue;var li=$("<li/>").html(options.highlight(formatted,term)).addClass(i%2==0?"ac_even":"ac_odd").appendTo(list)[0];$.data(li,"ac_data",data[i]);}listItems=list.find("li");if(options.selectFirst){listItems.slice(0,1).addClass(CLASSES.ACTIVE);active=0;}if($.fn.bgiframe)list.bgiframe();}return{display:function(d,q){init();data=d;term=q;fillList();},next:function(){moveSelect(1);},prev:function(){moveSelect(-1);},pageUp:function(){if(active!=0&&active-8<0){moveSelect(-active);}else{moveSelect(-8);}},pageDown:function(){if(active!=listItems.size()-1&&active+8>listItems.size()){moveSelect(listItems.size()-1-active);}else{moveSelect(8);}},hide:function(){element&&element.hide();listItems&&listItems.removeClass(CLASSES.ACTIVE);active=-1;},visible:function(){return element&&element.is(":visible");},current:function(){return this.visible()&&(listItems.filter("."+CLASSES.ACTIVE)[0]||options.selectFirst&&listItems[0]);},show:function(){var offset=$(input).offset();element.css({width:typeof options.width=="string"||options.width>0?options.width:$(input).width(),top:offset.top+input.offsetHeight,left:offset.left}).show();if(options.scroll){list.scrollTop(0);list.css({maxHeight:options.scrollHeight,overflow:'auto'});if($.browser.msie&&typeof document.body.style.maxHeight==="undefined"){var listHeight=0;listItems.each(function(){listHeight+=this.offsetHeight;});var scrollbarsVisible=listHeight>options.scrollHeight;list.css('height',scrollbarsVisible?options.scrollHeight:listHeight);if(!scrollbarsVisible){listItems.width(list.width()-parseInt(listItems.css("padding-left"))-parseInt(listItems.css("padding-right")));}}}},selected:function(){var selected=listItems&&listItems.filter("."+CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);return selected&&selected.length&&$.data(selected[0],"ac_data");},emptyList:function(){list&&list.empty();},unbind:function(){element&&element.remove();}};};$.fn.selection=function(start,end){if(start!==undefined){return this.each(function(){if(this.createTextRange){var selRange=this.createTextRange();if(end===undefined||start==end){selRange.move("character",start);selRange.select();}else{selRange.collapse(true);selRange.moveStart("character",start);selRange.moveEnd("character",end);selRange.select();}}else if(this.setSelectionRange){this.setSelectionRange(start,end);}else if(this.selectionStart){this.selectionStart=start;this.selectionEnd=end;}});}var field=this[0];if(field.createTextRange){var range=document.selection.createRange(),orig=field.value,teststring="<->",textLength=range.text.length;range.text=teststring;var caretAt=field.value.indexOf(teststring);field.value=orig;this.selection(caretAt,caretAt+textLength);return{start:caretAt,end:caretAt+textLength}}else if(field.selectionStart!==undefined){return{start:field.selectionStart,end:field.selectionEnd}}};})(jQuery);
            
            xpathForEach("//form[@id='changepassword']//input[@name='change_user']", function(i, item){
                $(item).autocomplete(usernames);
            });
            
            xpathForEach("//input[@id='gp_subject']", function(i, item){
                $(item).autocomplete(usernames);
            });
            
            xpathForEach("//input[@id='sg_subject']", function(i, item){
                $(item).autocomplete(usernames);
            });
            
            xpathForEach("//input[@id='field-cc']", function(i, item){
                $(item).autocomplete(emails, {multiple: true});
            });
            
            xpathForEach("//input[@id='action_reassign_reassign_owner']", function(i, item){
                $(item).autocomplete(usernames);
            });
            
            //setTimeout(function(){
            //    $('#notice').fadeOut();
            //}, 2000);
            
        } else {
            setTimeout(arguments.callee, 50);
        }
        
    })();

}, false);


GM_addStyle("/*#search, #ctxtnav,*/ #ctxtnav h2, #footer, #content a.anchor, #content span.inlinebuttons, #anydiff { display: none; }");
//if (document.location.pathname.indexOf("browser")>0 || document.location.pathname.indexOf("report")>0) {
    GM_addStyle("#ctxtnav {\
        display: block;\
        float: right;\
        padding: 8px 24px 0 0;\
        color: #fff;\
        font-size: 11px;\
    }\
    #ctxtnav ul, #ctxtnav li {\
        display: inline;\
        margin-bottom: 0;\
        margin-left: 8px;\
        margin-right: 0;\
    }\
    #ctxtnav a {\
        color: #fff;\
        margin: 0 5px;\
        padding: 2px 0;\
    }\
    #ctxtnav span a, #ctxtnav .missing {\
        text-decoration: none;\
        padding: 0 12px 0;\
        margin: 0;\
    }\
    #ctxtnav .prev {\
        padding-left: 9px;\
    }\
    #ctxtnav .next {\
        padding-right: 9px;\
    }\
    #ctxtnav span a {\
        color: #222;\
        -moz-box-shadow:1px 1px 1px #222222;\
        text-decoration: none;\
        /*text-shadow: 1px 1px #555;*/\
        margin: 0;\
        -moz-border-radius:4px 4px 4px 4px;\
        background: rgba(200,200,200,.9);\
        border-color:#D3D3D3 #AAAAAA #888888;\
        border-style:solid;\
        -moz-border-radius: 9px;\
        border-width:1px;\
        display:inline-block;\
    }\
    #ctxtnav .missing {\
        cursor: default;\
        color: #ccc;\
        text-shadow: none;\
        border-color:#888888;\
        padding-right:0 !important;\
    }\
    #ctxtnav h2 {\
        display: none;\
    }");
//}
GM_addStyle("hr { display: none; }\
th { background-color: inherit; }\
body { background: #000;  color: #333;  margin: 0 auto 40px; width: 1000px;}\
textarea, input[type=text], input[type=password], select {padding:3px; border:1px solid #999; -moz-border-radius: 3px 3px 3px 3px;margin:0 0 .5em;}\
textarea:focus, input[type=text]:focus, input[type=password]:focus, select:focus {border-color: rgb(0,125,260);}\
input[type=radio], input[type=checkbox] {margin-bottom:15px;margin-left:0;}\
label {white-space:nowrap;}\
#propertyform #properties th {vertical-align:top;}\
input[type=submit], a.button {\
    cursor: pointer;\
    -moz-box-sizing: content-box;\
    -moz-border-radius:4px 4px 4px 4px;\
    -moz-box-shadow:0 1px 4px rgba(150,150,150,.5);\
    background: -moz-linear-gradient(-90deg, rgb(237,237,237), rgb(161,161,161));\
    border-color:#D3D3D3 #AAAAAA #888888;\
    border-style:solid;\
    border-width:1px;\
    color:#222222;\
    display:inline-block;\
    font: bold 11px/14px 'Lucida Grande','Helvetica Neue',Helvetica,Arial,sans-serif;\
    padding:4px 12px;\
    text-shadow:0 1px 0 #FFFFFF;\
    text-transform:uppercase;\
    text-decoration:none;\
    white-space:nowrap;\
    width:auto;\
}\
a.button {padding:5px 13px;}\
input[type=submit]:hover, a.button:hover {\
    -moz-box-shadow:0 0 3px rgba(0,125,160,.8);\
    border-color: rgb(0,125,260);\
}\
.buttons input[type=submit], .buttons a.button {\
    font-size: 13px;\
    line-height: 16px;\
    padding: 6px 14px;\
    border-color: #999 #777 #555;\
    -moz-border-radius: 6px;\
    margin-right: 20px;\
}\
.buttons a.button {padding:7px 16px;}\
.buttons input[type=submit]:hover, .buttons a.button:hover {\
    -moz-box-shadow:0 0 8px rgba(0,125,160,.8);\
    border: 1px solid rgb(0,125,260);\
}\
/*input[type=radio]:checked {\
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAIAAAAn5KxJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5lJREFUeNrsmEFLckEUhrtqpp8RBFK5SUShghYRbqRti2gR7QTX%2FotoldgPqGV%2FQNpEVLSPdkEbQdqEBq1aJ5Wpvd998TDfzWzmKh8IcxZy7zj3znPfc2bOmXEymczEOFhgYkzMglpQC2pBLagFtaAW1IKaWGgkb%2Bl2uwP%2BdRxnBKDDvEX48JKfWNX3DzNWKBgMDkOp%2FqrtwuS4Ji2%2BWf2AehCF0nPtfLNhcEMwf5RinU4HLcvLy%2Fl8fmNjI5lM4rbRaNze3lYqlYeHB2AFAoG%2BxPrmZLNZU1CxdrsNynA4vL%2B%2Fv7Oz8%2FHx0Wq1yA2yyclJ%2FHV%2Bfn5wcIC%2F0ALveXANQHO5nA%2FKjmsAhUNOTk5WVlbe3t76PhKJRGq1WrFY%2FPz8BGjANR%2BswXQ6HTQxGYbce3t7cPf7%2B7vzg%2BFjEonE%2FPz8zc1NyDW8JNQz%2FXFDcJCRnBQSt7hYWlra3d19fX0drA0%2BA91OT08fHx8ZAJ4P1ppMU1NT%2BqCkxBgELRQKCEqdwdANncvlMhAhjcqqC4p41%2BzKuOTbcYGYW1tbY4vOs%2Bvr63hQ%2FC7xOmJQmeZMQhxmYWEBuJqqzM3Nid%2BFVd%2F7BqAiJ67BRzGMZi4lBCK8L6LqgmrGKEGpH6VF2L28vMTj8cEViSRSdGaAioHVANS3ohjm%2Fv5%2Ba2uLK%2FyvWqIzPc5E8D9AKS1GOjs7297e1lEUD6KzaOkH1Mj1jCrewvv1ev3q6gqsg0XFI%2BiGztPT0xHXMKgxqP6CzxWUrueCCl2Pjo4WFxdXV1cH1KPVahXdBDHsmqymuil0c3NTM3Oq6URkAOv19fXs7CyylFSfYuh%2FeXlZKpUgXiwW%2B%2BOa4JJVM5E6h4eHRvkTZJjvyIqoQprNJvJn07VUKoUYQC0GgdH%2F6enp7u7u4uIC9R75CPrd7yN2PT3LMFWLICqNUZ%2Bfn4%2BPjz1lHphmZmai0SgQo65RS1lE9Vdig8KZogb%2BNVJibEiFohN6CyjbQRbpmUpplJbMtiIUVYJVKKkcq2aW0tKNKxFxZUmi000Tm9meiYpyQZWsjeFbrrVdk80dO6h5SK1FTAtn4%2B2yOqMFFxztnnlA5XvE3bJ2moGaUnJ7icEEiBoTERdqO3HVmPa9uTM%2BKRFWVVoWfuqOWYAETk1CfrbLPs4CZMNEwWTl6nsA4Zk0%2Fg8gfJ%2BxqLh%2FU9xvk3LIE6hhD8lGcgBmz0ctqAW1oBbUgo4f6JcAAwAsSzPAlabfdgAAAABJRU5ErkJggg%3D%3D);\
}*/\
.inlinebuttons {\
    position:absolute;\
    bottom:10px;\
    left:10px;\
}\
.ajaxIndicator {\
    display:inline-block;\
    min-height:16px;\
    padding-left:20px;\
}\
.ajaxSuccess {\
    font-weight:bold;\
    color:#080;\
    text-shadow:0 0 2px #FFF;\
}\
.ajaxFailure {\
    font-weight:bold;\
    color:#C00;\
    text-shadow:0 0 2px #FFF;\
}\
.ajaxIndicator.loading {\
    background:url(data:image/gif;base64,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) 0% 50% no-repeat;\
}\
#header h1 { margin: 0px; padding: 10px 0 0 18px; float: left; }\
#header h1 a { color: #fff; text-shadow: 0 2px 3px #069; text-decoration: none; }\
#banner {\
  background: #5A9ECF;\
  height: 70px;\
  margin: 0;\
  text-align: left;\
  padding-top: 1px;\
  position: relative;\
  border-top: 1px solid #222;\
}\
#metanav {clear:right;}\
#banner #metanav ul {\
    margin: 0 20px 0 0;\
}\
#banner #metanav ul li {\
  font-size: 92%;\
  list-style: none;\
  float: right;\
  margin: 0 0 0 10px;\
}\
#mainnav {\
  background: #5A9ECF;\
  margin: 0 0 18px;\
  text-align: left;\
  padding-top: 1px;\
  position: relative;\
  -moz-border-radius: 0 0 5px 5px;\
}\
#mainnav ul {\
    width: 100%;\
    overflow: hidden;\
    margin: 0;\
}\
#mainnav li {\
  list-style: none;\
  float: left;\
}\
#mainnav a {\
    float:left;\
  background: #555;\
  color: #f0f0f0;\
  text-decoration: none;\
  text-shadow: 0 1px 1px #000;\
  font-weight: bold;\
  padding: 10px 18px 9px 15px;\
  border-right:1px solid #333;\
}\
#mainnav a:hover {\
  background: #666;\
  color: #fff;\
}\
#mainnav .active a {\
    background-color: #000;\
    /*background-image: url('data:image/png;base64,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');\
    background-repeat: no-repeat;\
    background-position: 9px 5px;\
    background-attachment: scroll;\
    padding-left: 20px;*/\
}\
#mainnav .first a {\
    margin-left: 18px;\
    -moz-border-radius: 5px 0 0 0;\
}\
#mainnav .last a {\
    -moz-border-radius: 0 5px 0 0;\
    border:0;\
}\
/* global search form */\
#search {float:right;margin:15px 20px 0 0;}\
#search label {display:none;}\
#search input[name=q] {padding:3px;margin-right:3px;border-color:#666;}\
#search input[name=q]:focus {border-color:rgb(0,85,190);}\
#search input[type=submit] {padding:2px 8px;border-color:#888 #666 #444;-moz-box-shadow:none;}\
#search input[type=submit]:hover {\
    -moz-box-shadow:0 0 3px rgba(0,35,65,.8);\
    /*border-color: rgb(0,125,260);*/\
}\
/* search page */\
#fullsearch {padding: 20px;}\
#fullsearch #q {padding: 5px; margin-right:10px;}\
#content {\
    background-color: #f0f0f0;\
    -moz-border-radius-topleft: 4px;\
    -moz-border-radius-topright: 4px;\
    margin-left: 18px;\
    margin-right: 18px;\
    margin-top: 7px;\
    padding-left: 0px;\
}\
#content h1 {\
    background: #006699 none repeat scroll 0 0;\
    -moz-border-radius-topleft: 4px;\
    -moz-border-radius-topright: 4px;\
    color: #fff;\
    font-size: 1.4em;\
    padding: 10px 15px;\
    margin-bottom: 0;\
}\
#content h1 a {\
    color: #fff;\
    margin-bottom: 0;\
}\
h1 .sep{\
    color: inherit;\
}\
#content h2 {\
    font-size:1.3em;\
    margin-bottom:0;\
    margin-left:16px;\
    margin-top:1.2em;\
}\
#content div#description {\
    background: #5A9ECF;\
    color: #fff;\
    padding: 15px;\
    margin-bottom: 0;\
}\
#content #description p {\
    margin-bottom: 0;\
}\
#content #description ul {\
    margin-bottom: 0;\
}\
#content form#prefs {\
    background: #5A9ECF;\
    color: #fff;\
    padding: 20px;\
    border-bottom:5px solid #777;\
}\
#content form#prefs > div {\
    display: inline-block;\
    vertical-align: bottom;\
    padding-right: 40px;\
}\
#content form#prefs fieldset {\
    padding: 0;\
    padding-top: 0.7em;\
    margin: 0;\
    border: none;\
}\
table.listing tr.even td {background: transparent;}\
table.listing tr:nth-child(2n+2) td {background: rgba(200,200,200,.4);}\
table.listing th:first-child,\
table.listing td:first-child {\
    padding-left:20px;\
}\
table.listing tr:hover td {\
    cursor: pointer;\
    background-color: rgba(160,160,160,.4);\
}\
table.listing tr:hover td:first-child a,\
table.listing tr:hover td.title a,\
table.listing tr:hover td.summary a,\
table.listing a:hover {\
    color: #009;\
}\
form table.listing tr:hover td {\
    cursor: inherit;\
}\
/* is this ever used? */ \
table.listing tr.color1-odd,\
table.listing tr.color1-even {\
    background-color: #EE8888;\
}\
table.listing tr.color2-odd,\
table.listing tr.color2-even {\
    background-color: #FFFFBB;\
}\
table.listing td > a,\
table.listing th a {\
    /* descendent selector means source browser still works */ \
    color: #3388BB;\
    text-decoration: none;\
    font-weight: bold;\
    display: block;\
}\
table.tickets td > a { color: #169; }\
#content #chglist .summary a {\
    display: inline;\
}\
table.listing th a {\
    text-decoration: underline;\
}\
table.listing td a:hover {\
    color: #009;\
}\
#content .buttons {\
    background: #5A9ECF;\
    background: #bbb;\
    padding: 10px 20px;\
}\
#content form#prefs .buttons {\
    padding-left: 0px;\
    background: transparent;\
}\
#content .buttons form,\
#content .buttons form div {\
    display: inline;\
}\
#content #newticket label[for=type],\
#content #newticket #type {\
    display: none;\
}\
textarea#comment,\
textarea#description,\
textarea#field-description {\
    width: 487px;\
    height: 200px;\
}\
#comment {\
    height: 150px;\
}\
#ticket {\
    padding: 7px;\
    background: #F7F7F7 none repeat scroll 0 0;\
    color: #333333;\
    border-bottom: 1px solid #777;\
}\
#ticket table.properties {\
    width: 50%;\
    margin-left: 3px;;\
}\
#ticket .description {\
    position: relative;\
    padding: 1.4em 10px 2em;\
    border-top: 1px dashed #ccc;\
}\
#ticket .description form {\
    position: absolute;\
    left: 0;\
    bottom: 0;\
    width: 600px;\
}\
#ticket .description .searchable {\
    width: 600px;\
}\
.ticket #properties table {\
    width: auto;\
}\
.ticket input[name=attachment] {\
    margin-left:20px;\
}\
#ticket .date{\
    float: right;\
}\
#ticket .date p {\
    display: inline;\
    margin: 0;\
}\
#ticket h2 {\
    margin-top: 0;\
    margin-bottom: 5px;\
    margin-left: 7px;\
}\
#ticket .description h3 {\
    display: none;\
}\
#ticket .description h4, #preview h4 {\
    font-weight: bold;\
}\
#ticket h2.summary {\
    color:#555555;\
    text-decoration: none;\
    font-size: 1.6em;\
    font-weight: bold;\
}\
#attachments {\
    padding: 10px 10px 20px 16px;\
    border-bottom: 1px solid #777;\
}\
#altlinks {\
    /*background-color: #CCCCCC;*/\
    text-align:right;\
    margin: 8px 18px;\
    padding: 10px 20px;\
    -moz-border-radius: 4px;\
}\
#altlinks h3 {\
    font-size: 11px;\
    display: inline;\
    color:#777;\
}\
#altlinks ul {\
    display: inline;\
    margin:0;\
}\
#altlinks ul li {\
    display: inline;\
    list-style: none;\
    margin-left: 10px;\
}\
#altlinks a {\
    font-size: 11px;\
    color:#777;\
    text-decoration: none;\
}\
#altlinks a:hover {\
    text-decoration: underline;\
}\
#changelog div.change {\
    border-bottom: 1px solid #ccc;\
    padding: 10px 0 30px 10px;\
    position:relative;\
}\
#changelog div.change .inlinebuttons {\
    left:56px;\
}\
#changelog .change h3 {\
    font-size: 13px;color:#444;\
    font-weight: bold;\
}\
#changelog .change ul {\
    font-size: 0.8em;\
}\
#changelog .change .comment,\
#changelog .change .changes,\
#changelog .change h3 {\
    margin-left: 47px;\
    list-style: none;\
}\
#changelog .change .comment {\
    width: 600px;\
    overflow: hidden;\
}\
#changelog .change .hasComment { min-height: 60px; }\
.speechBubbleImg { position: absolute; }\
.speechBubbleImg~p { margin-left: 60px; }\
#file-legend dd {\
    padding-bottom:4px;\
}\
#file-legend {\
    float: right; padding: 5px 0 1px 5px; border: 1px solid #777; margin: 7px 10px; line-height:11px;\
}\
.diff .legend .cp {\
    clear: left;\
}\
#chglist .add, #overview .add, /*.diff .legend .add,*/\
#chglist .edit, #overview .mod, /*.diff .legend .mod,*/\
#chglist .delete, #overview .rem /*.diff .legend .rem,*/ \
{display:inline-block;height:10px;width:10px;border:1px solid #ccc;}\
.files ul {list-style:none;margin:0;}\
#searchable > form > h3 {\
    display: none;\
}\
fieldset {\
    margin: 1.5em;\
    -moz-border-radius: 6px;\
}\
.iefix {\
    border: none;\
    padding-top: 0;\
    padding-bottom: 0;\
    margin-bottom: 0;\
}\
legend {\
    padding: 0 .5em;\
}\
div.wiki-toc {\
    float: left;\
}\
div.wikipage {\
    padding: 1.5em;\
}\
div.wikipage h1 {\
    /* I don't like using negative margins but this is the easiest route here I think */\
    margin: -1.1em;\
}\
div.timeline dl{\
    padding-left: 1.5em;\
}\
div.timeline dt.changeset, div.timeline dt.changeset a {\
    padding-top: 0px;\
    text-decoration: none;\
    display:block;\
}\
div.timeline dd {\
    padding-bottom: 15px;\
}\
div.timeline dt.changeset a {\
    background-repeat: no-repeat;\
    background-position: 0 4px;\
    padding-top: 0;\
    background-image: url("+tracbase+"chrome/common/changeset.png);\
    background-repeat: no-repeat;\
}\
div.timeline dt.closedticket a {\
    background-repeat: no-repeat;\
    background-position: 0 4px;\
    padding-top: 0;\
    background-image: url("+tracbase+"chrome/common/closedticket.png);\
    background-repeat: no-repeat;\
}\
div.timeline dt.newticket a {\
    background-repeat: no-repeat;\
    background-position: 0 4px;\
    padding-top: 0;\
    background-image: url("+tracbase+"chrome/common/newticket.png);\
    background-repeat: no-repeat;\
}\
div.timeline dt a {\
    padding:0 4px 2px 1.4em;\
    text-decoration: none;\
}\
a.closed {\
    text-decoration: line-through;\
}\
dt em {\
    border-bottom:1px dotted #BBBBBB;\
    font-style:normal;\
}\
span.time {\
    color: #555555;\
    font-weight: normal;\
}\
div.changeset > form > div  div.field {\
    display: inline;\
    padding-left: 1em;\
}\
div.changeset > dl#overview {\
    margin: 0;\
    position: relative;\
}\
div.report form div.field, div.ticket form div.field{\
    padding-left: 1.5em;\
}\
.ticket>#propertyform>h3{\
    display:none;\
}\
div#help {\
    display: none;\
    color: #555;\
    text-align: center;\
}\
table.progress td.closed {\
    background:#BAE0BA none repeat scroll 0 0;\
}\
table.progress td.open {\
    background:red none repeat scroll 0 0;\
    padding: 0;\
}\
div.roadmap ul.milestones {\
    list-style: none;\
}\
div#content.roadmap ul.milestones h2 {\
    margin-left: 0;\
}\
div#content table.progress {\
    height: 30px;\
    border: 1px solid #d5d5d5;\
    width: 60%;\
    margin-right: 5px;\
    margin-bottom: 0;\
    float: left;\
}\
div#content p.percent {\
    padding: 5px;\
    font-weight: bold;\
}\
div.roadmap dl,\
div.milestone dl {\
    clear: both;\
    margin-bottom: 0;\
}\
div.roadmap dt,\
div.roadmap dd,\
div.milestone dt,\
div.milestone dd {\
    display: inline;\
    font-style: italic;\
    margin-right: 5px;\
}\
div.roadmap p,\
div.milestone p {\
    margin: 0 0 0.5em;\
}\
div.milestone div.info{\
    margin: 0.5em 1.5em 1.5em;\
}\
div.milestone form#stats{\
    \
}\
div.milestone div.description{\
    margin: 0.5em 1.5em 1.5em;\
    font-size: 1.2em;\
    font-weight: bold;\
}\
div.query fieldset {\
    padding: 10px 20px 0;\
    margin: 20px;\
    width: 60%;\
}\
div.query #columns {\
    padding: 15px 20px 10px;\
}\
div.query td label,\
div.query #columns label {font-weight:normal;padding-right:20px;}\
div.query tr.status th {vertical-align:top;}\
div.query tr.actions td {text-align:left !important;border-top:1px solid #ccc;padding-top:15px;padding-bottom:0;}\
div.query tr.actions label {\
    -moz-border-radius:4px;\
    -moz-box-shadow:0 1px 4px rgba(150, 150, 150, 0.5);\
    -moz-box-sizing:content-box;\
    background-color:transparent;\
    background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAGCAYAAAARx7TFAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAA1SURBVAiZhcrBDQAgDMNAJ/vvHD5UKiDAT+sEhE9O3iYJBnSD88sAkg5YAMA1O+xgQRtU/wOGtBwBvVkMoQAAAABJRU5ErkJggg=='),-moz-linear-gradient(-90deg, #EDEDED, #A1A1A1);\
    background-position:90% 55%, 0 0;\
    background-repeat:no-repeat, no-repeat;\
    border-color:#D3D3D3 #AAAAAA #888888;\
    border-style:solid;\
    border-width:1px;\
    color:#222;\
    cursor:pointer;\
    display:inline-block;\
    font:bold 13px/16px 'Lucida Grande','Helvetica Neue',Helvetica,Arial,sans-serif;\
    padding:4px 12px;\
    text-decoration:none;\
    text-shadow:0 1px 0 #FFFFFF;\
    text-transform:uppercase;\
    border-color:#999 #777 #555;\
    padding:6px 27px 6px 14px;\
}\
div.query tr.actions select {position:absolute;z-index:10;margin:0 0 0 -126px;padding:0;opacity:0.01;cursor:pointer;}\
div.query tr.actions select option {padding:6px 21px;cursor:default;}\
div.query .option {\
    margin: 0 0 0 20px;\
    font-weight: bold;\
}\
div.query .option label {font-weight:normal;}\
div.query .option label[for]:first-child {font-weight:bold;}\
div.query .option label[for]:first-child {font-weight:bold;}\
.option + .option + .option label:after {content:':'}\
#query .buttons {margin-top:15px;}\
table#info td.message p,\
table#info,\
table#info ul.props {\
    margin-bottom: 0;\
}\
#jumprev {\
    float: right;\
    margin: 10px 10px -31px;\
}\
.admin #tabs {\
    -moz-border-radius:6px 6px 6px 6px;\
    border:1px solid #ccc;\
    float:left;\
    font-weight:bold;\
    margin:31px 0 20px 20px;\
    width:16%;\
}\
.admin #tabs ul,\
.admin #tabs li {\
    list-style: none;\
    margin:0;\
    padding:0;\
    text-indent: 10px;\
}\
.admin #tabs>ul:first-child {padding-top:5px}\
.admin #tabs ul {padding-bottom:5px}\
.admin #tabs>ul:last-child {padding-bottom:0;}\
.admin #tabs>ul:last-child ul {padding-bottom:0;}\
.admin #tabs>ul:last-child ul li:last-child a {-moz-border-radius:0 0 4px 4px;}\
.admin #tabs a {\
    text-indent: 0;\
    display: block;\
    /*background: #ccc;*/\
    font-size: 12px;\
    padding: 4px 10px;\
    text-decoration: none;\
    font-weight: normal;\
}\
.admin #tabs .active .active a,\
.admin #tabs a:hover {background:#ddd;}\
.admin .hint {clear:left;width:50%;}\
.admin .field fieldset {padding:0;margin:0;}\
.admin form.mod div.field label {display:block;width:13%;text-align:right;position:relative;min-height:2em;}\
.admin form.mod div.field label br {display:none;}\
.admin form.mod div.field input,\
.admin form.mod div.field select,\
.admin form.mod div.field textarea {position:absolute;left:100%;margin-left:13px;}\
.admin form.mod div.field textarea#description {position:relative;left:13%;}\
.admin #modbasic div.field:nth-child(4) {height: 260px;}\
.admin #modlog .help {font-size:11px;margin:0 0 1.5em 13%;padding-left:13px;width:60%;}\
.admin form.addnew {float:left;width:50%;}\
.admin form.addnew div.field {width:100%;overflow:hidden;clear:both;}\
.admin form.addnew div.field label {display:block;width:43%;text-align:right;position:relative;min-height:2em;}\
.admin form.addnew div.field label br {display:none;}\
.admin form.addnew div.field select,\
.admin form.addnew div.field input {position:absolute;left:100%;margin-left:13px;}\
.admin #addgroup     div.field label {width:36%;}\
.admin #addversion   div.field label {width:36%;}\
.admin #addpath      div.field label {width:27%;}\
.admin #addenum      div.field label {width:27%;}\
.admin #addcomponent div.field label {width:27%;}\
.admin #addmilestone div.field label {width:27%;}\
.admin #modcomp      div.field fieldset {position:relative;padding-top:3px;}\
.admin #modcomp      div.field fieldset label {position:absolute;}\
.admin #modcomp      div.field fieldset p {display:inline;}\
.admin #modcomp      div.field em,\
.admin #addmilestone div.field em,\
.admin #addversion   div.field em {position:absolute;left:100%;margin-left:15px;top:23px;font-size:11px;font-weight:normal;}\
.admin #modcomp      div.field em {left:0;margin:0;white-space:normal;}\
.admin #addmilestone div.field:nth-child(3) label,\
.admin #addversion   div.field:nth-child(3) label {height:2.8em;}\
.admin form.addnew tr.field th {text-align:right;}\
.admin form.addnew tr.field td {padding-right:0;}\
.admin form.addnew .help {display:none;}\
.admin .buttons {background:transparent !important;border-top:1px solid #ccc;margin:12px 0 0;padding:15px 0 0 !important;text-align:right;}\
.admin .buttons input {margin:0 0 0 20px;}\
.admin form.addnew fieldset {margin-left:0;margin-right:10px;}\
.admin form.addnew:nth-child(2) fieldset {margin-left:10px;margin-right:0;}\
.admin #grouplist+.buttons {margin:0 0 20px;}\
.admin table {margin:0;}\
.admin .listing {font-size:12px;}\
.admin .listing div {float:left;min-width:25%;padding-right:20px;font-size:12px;}\
.admin .listing label {font-weight:normal;}\
.admin .listing input[type=radio],\
.admin .listing input[type=checkbox] {margin:-1px 0 0 0;}\
.admin form {clear:both;border:1px solid #ccc;-moz-border-radius: 10px; padding: 20px;}\
.admin form.mod,\
.admin form.addnew {clear:none;border:0;-moz-border-radius:0;padding:0;}\
.admin #modbasic fieldset {margin-left:0;margin-right:0;}\
.admin #addenum+.help,\
.admin #addversion+.help {clear:left;width:50%;}\
.admin #enumtable .buttons,\
.admin #component_table .buttons {margin-top:35px;}\
.admin #enumtable .buttons+.help,\
.admin #component_table .buttons+.help {position:absolute;margin-top:-75px;font-size:11px;}\
.admin #tabcontent {float: right;width: 77%;margin-right: 20px;}\
#content.search h2 {margin:-20px 0 5px 20px;font-size:12px;}\
.paging {width:100%;overflow:hidden;padding:0 0 20px;}\
.paging>span{float:left;}\
.paging>span:first-child{margin-left:17px;}\
.paging .current, .paging a {color:#666;font:bold 16px trebuchet MS;margin:0 3px;padding:1px 7px;text-decoration:none;}\
.paging a:hover {color:#009;text-decoration:none;}\
.paging .current {color:#000;background:#ccc;}\
#report-notfound {padding: 20px 20px 40px;font-size:16px;}\
.search #notfound {padding: 0 20px 40px;margin-top:-20px;font-size:16px;}\
.search #results {padding: 0 20px;border-bottom:1px solid #ccc;}\
.search #results dt {font-size:16px;}\
.search #results dt a {text-decoration:none;}\
.search #results dd {color:#777;font-size:12px;margin-bottom:20px;}\
.search #results dd.searchable {color:#000;font-size:13px;margin-bottom:5px;}\
/*.wikitoolbar {padding-left:6px;}\
.wikitoolbar a {float: left;border:1px solid #ccc;border-width:1px 0 0 1px;height: 16px;width: 24px;background:url("+tracbase+"chrome/common/edit_toolbar.png) 0 0 no-repeat;}\
.wikitoolbar a:last-child {border-right-width:1px;}\
.wikitoolbar #strong {background-position: 0px -16px;}\
.wikitoolbar #heading {background-position: 0px -32px;}\
.wikitoolbar #link {background-position: 0px -48px;}\
.wikitoolbar #code {background-position: 0px -64px;}\
.wikitoolbar #hr {background-position: 0px -80px;}\
.wikitoolbar #np {background-position: 0px -96px;}\
.wikitoolbar #br {background-position: 0px -112px;}\
.wikitoolbar #img {background-position: 0px -128px;}*/\
\
.ac_results{border:1px solid #007DFF;-moz-border-radius:0 0 4px 4px;background-color:#FFF;overflow:hidden;z-index:9999;padding:4px 3px 3px;margin:-1px 0 0 0;}\
.ac_results ul{width:100%;list-style-position:outside;list-style:none;margin:0;padding:0;}\
.ac_results li{cursor:default;display:block;font:menu;font-size:12px;line-height:16px;overflow:hidden;margin:0;padding:2px 5px;}\
.ac_loading{content:'loading...';}\
.ac_odd{background-color:#eee;}\
.ac_over{background-color:#069;color:#FFF;}\
#field-cc{margin-top:-11px;position:absolute;width:487px;}\
/* this color, background image, and width will not be correct if there was an error, \
   this styling assumes the notice will always be for a 'success' message */\
#notice {\
    -moz-border-radius:0 0 5px 5px;\
    background:#069 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAodJREFUeNqkk0tME0Ecxr/Z3b4ADZRqAqQ2hJJSmhAfxKjUqIlXLujJqAe96NGee+Bi4kE5edHIyRhOcsEY4sGDotGEgxEBCUQpTVqgD0262310dtaZlcL25MFJvs3M7P/37X+y8xHHcfA/QxEP8jwCyIRLLEgvCCb4bIwruleX5/oAB7NwnAJsvrIdODfKfw08Yzyo+DOJvkQ8FomGOwIdQdGfZqonNku59Fph/YrZMKf41lxLB034cODQ5MXUhaQCOUQtCtVSm+/a4t0DbdGuaPe7lfeTNd3dd02kvYLegOTPnB8aS1p1M6SqKgzDaNHLwWegeiN0Jn466Se+jGAODKgzMdgzEDdUI6RpGnRdb9GDgaxbNn98hpvQUCwcjQvGa3Au0h4J12o1mKbpSnSxvbuNO8Hr6Ky0I5/P4+bru1heWQYzWFgwXoNjMuSgbdv4fGkexUoRuZ0cYqQPZ7tGoSgKpjdf4FX5DRpSA4ZlBAXjNQC1KW73X8PS0hLmh2dwMjKCJyMPXfhteQGPC9NACK6oQl3mwKDhbJW1kpH9eh+yLMPn8+Hp0CP4FB/W6z9wbzML1sH4v4Ari5iGYLwdfNwuFatyWEb6+7j71aaurt8COrEPCxm1elUwXoPZ31uVDQlEJ30Ep75dduHUYho40gozZutmUd8QzIEBcwq2Rqcqn4qrDmU6iRGkvnA4hv1zC7EG1dXF6iqr21OCcWMgwkQIz0GMB2FUGpf65Yw/2R73J9rCcpcSFEX2L2pYa/WqtaptsJ8cXmRzyNlw2T0DcaW7uSLolXowjDSOIsXD5d42Hp4CdrGMFSygwHb4TomrzFnaNJA8J1X+kWCRRY2rzln2R4ABABpvPoBuuSpnAAAAAElFTkSuQmCC') 30px 6px no-repeat;\
    color:#0e0;\
    font-weight:bold;\
    left:50%;\
    margin-left:-140px;\
    margin-top:38px;\
    padding:4px 10px 7px 30px;\
    position:absolute;\
    text-align:center;\
    width:240px;\
}\
");
