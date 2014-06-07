// ==UserScript==
// @name Single Timeline
// @namespace Single Time Line
// @copyright (C) Rui Fujiwara 2012.
// @author David Cabrera http://www.facebook.com/edacmo
// @version 1.40
// @description Modify the new Facebook Timeline to show all post in an unique block.
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=722A7249QKS2G
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// ==/UserScript==

/* CHANGES:
 * # Fixed box borders css style.
 * 
 * # Fixed a change in liked_pages.
 * 
 * # Fixed images moved to left, maximum width added.
 * 
 * # Fixed all embed videos to fit the maximum width. 
 * # Fixed all external shared videos to center. 
 * 
 * # Added changes to support navigation to the past.
 * # Modified the filter button to the left of the screen.
 * # Fixed to center the navigation buttons to the past.
 * # Fixed to center all Cover, Profile and normal Photos
 * # Fixed to center all Videos.
 * # Fixed all preview of Text, Notes, Links, etc... 
 */


(function(timeline) {
    if (!document.getElementById('globalContainer') || document.getElementById('sweetGadget')) {
        return;
    }
    var AppInfo = {
        name: 'Rui Fujiwara',
        version: '666',
        url: 'http://userscripts.org/scripts/show/129894'
    }
    var CssText = atob(
    'Ym9keSB7DQpiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50Ow0KfQ0KI3JpZ2h0Q29sQ29udGVudCAucGFnZXNUaW1lbGluZUJ1'+
    'dHRvblBhZ2VsZXQgew0KYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDsNCn0NCiNzd2VldEdhZGdldCB7DQp3aWR0'+
    'aDogMjAwcHg7DQpwb3NpdGlvbjogYWJzb2x1dGU7DQpoZWlnaHQ6IGF1dG87DQptYXJnaW4tdG9wOiAxNXB4Ow0KfQ0KI3N3ZWV0'+
    'R2FkZ2V0ID4gZGl2IHsNCmJvcmRlcjogMXB4IHNvbGlkICNDNENERTA7DQptYXJnaW46IDBweCAwcHggMTBweCAwcHg7DQpwYWRk'+
    'aW5nOiA0cHg7DQp9DQojc3dlZXRHYWRnZXQgLm9nUmVjZW50VGl0bGUgew0KbWFyZ2luOiAwcHggIWltcG9ydGFudDsNCn0NCiNz'+
    'd2VldEdhZGdldCAudGltZWxpbmVSZXBvcnRIZWFkZXIgew0KYmFja2dyb3VuZDogI0YxRjFGMTsNCmJvcmRlci1ib3R0b206IDFw'+
    'eCBzb2xpZCAjRTVFNUU1Ow0KbWFyZ2luOiAwcHggMHB4IDVweDsNCnBhZGRpbmc6IDVweCAwIDVweCAxMnB4Ow0KfQ0KI3N3ZWV0'+
    'R2FkZ2V0IHRhYmxlIHsNCndpZHRoOiAxOTBweCAhaW1wb3J0YW50Ow0KfQ0KI3N3ZWV0R2FkZ2V0IHRhYmxlIHRkIHsNCmRpc3Bs'+
    'YXk6IGlubGluZS1ibG9jazsNCndpZHRoOiAxODhweCAhaW1wb3J0YW50Ow0KfQ0KI3N3ZWV0R2FkZ2V0IHRhYmxlIHRkIC5mcmll'+
    'bmRMaXN0aW5nIHsNCndpZHRoOiBhdXRvICFpbXBvcnRhbnQ7DQp9DQojc3dlZXRHYWRnZXQgdGFibGUgdGQgZGl2Lm1icy5tcm0s'+
    'ICNzd2VldEdhZGdldCB0YWJsZSB0ZCBkaXYuY2FwdGlvbiB7DQpmbG9hdDogbGVmdDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVu'+
    'dCBvbC5mYlRpbWVsaW5lQ2Fwc3VsZSwgI3BhZ2VsZXRfZXNjYXBlX2hhdGNoIHsNCm1hcmdpbi1sZWZ0OiAyMDVweCAhaW1wb3J0'+
    'YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50ICNwYWdlbGV0X2VzY2FwZV9oYXRjaCAudGltZWxpbmVFc2NhcGVIYXRjaCAu'+
    'ZmJUaW1lbGluZUVzY2FwZVNlY3Rpb25Cb2R5IHsNCm92ZXJmbG93LXg6IGF1dG87DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQg'+
    'b2wuZmJUaW1lbGluZUNhcHN1bGUgPiBsaSB7DQp3aWR0aDogMTAwJSAhaW1wb3J0YW50Ow0KYm94LXNoYWRvdzogMHB4IDBweCA4'+
    'cHggI0M0Q0RFMDsNCi13ZWJraXQtYm94LXNoYWRvdzogMHB4IDBweCA4cHggI0M0Q0RFMDsNCi1tb3otYm94LXNoYWRvdzogMHB4'+
    'IDBweCA4cHggI0M0Q0RFMDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAuZmJUaW1lbGluZUNhcHN1bGUgeyANCmJhY2tncm91'+
    'bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVTZWN0aW9uRXhw'+
    'YW5kZXIgew0KbWFyZ2luLWJvdHRvbTogNDVweDsNCm1hcmdpbi1sZWZ0OiAyMDVweDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVu'+
    'dCAuZmJUaW1lbGluZUNvbnRlbnRIZWFkZXIgew0KbWFyZ2luLWxlZnQ6IDIwNXB4Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50'+
    'IC5mYlRpbWVsaW5lRmlsdGVycyB7DQptYXJnaW4tdG9wOiA1cHg7DQpwYWRkaW5nLXRvcDogMHB4Ow0KfQ0KI3RpbWVsaW5lX3Rh'+
    'Yl9jb250ZW50IC5mYlRpbWVsaW5lQ2Fwc3VsZSAuYm90dG9tQm9yZGVyIHsNCndpZHRoOiBhdXRvICFpbXBvcnRhbnQ7DQpiYWNr'+
    'Z3JvdW5kOiAjQzRDREUwICFpbXBvcnRhbnQ7DQpoZWlnaHQ6IDJweDsNCmJvcmRlci1yYWRpdXM6IDBweCAwcHggM3B4IDNweDsN'+
    'Ci13ZWJraXQtYm9yZGVyLXJhZGl1czogMHB4IDBweCAzcHggM3B4Ow0KLW1vei1ib3JkZXItcmFkaXVzOiAwcHggMHB4IDNweCAz'+
    'cHg7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVDYXBzdWxlIC50b3BCb3JkZXIgew0Kd2lkdGg6IGF1dG8g'+
    'IWltcG9ydGFudDsNCmJhY2tncm91bmQ6ICNDNENERTAgIWltcG9ydGFudDsNCmhlaWdodDogMXB4Ow0KYm9yZGVyLXJhZGl1czog'+
    'M3B4IDNweCAwcHggMHB4Ow0KLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAzcHggM3B4IDBweCAwcHg7DQotbW96LWJvcmRlci1yYWRp'+
    'dXM6IDNweCAzcHggMHB4IDBweDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAudGltZWxpbmVVbml0Q29udGFpbmVyIC51aUNv'+
    'bW1lbnRDb250YWluZXIgew0Kd2lkdGg6IGF1dG8gIWltcG9ydGFudDsNCm1hcmdpbjogMHB4IDBweCA1cHggIWltcG9ydGFudDsN'+
    'CnBhZGRpbmc6IDBweCAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lVW5pdEFjdG9yIC51'+
    'aVByb2ZpbGVQaG90b01lZGl1bSB7DQp3aWR0aDogNTBweCAhaW1wb3J0YW50Ow0KaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7DQp9'+
    'DQojcmlnaHRDb2xDb250ZW50IC5mYlRpbWVsaW5lU2NydWJiZXIsIC5zcGluZVBvaW50ZXIsIC5mYlRpbWVsaW5lU3BpbmUgew0K'+
    'ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lU2VjdGlvblRyYW5z'+
    'cGFyZW50IHsNCnBhZGRpbmctdG9wOiAwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAuZmJUaW1lbGlu'+
    'ZVRpbWVQZXJpb2Qgew0KYmFja2dyb3VuZDogd2hpdGUgIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAuZmJU'+
    'aW1lbGluZVR3b0NvbHVtbiAudGltZWxpbmVVbml0Q29udGFpbmVyLA0KLmZiVGltZWxpbmVDYXBzdWxlIGRpdi5mYlRpbWVsaW5l'+
    'Q29tcG9zZXJVbml0IHsNCndpZHRoOiBhdXRvICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgew0KcGFkZGlu'+
    'Zy1ib3R0b206IDBweCAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50ICNwYWdlbGV0X3BhZ2VfbW9zdF9yZWNl'+
    'bnRfc3RyZWFtX3dyYXBwZXIgLnVpU2Nyb2xsYWJsZUFyZWEsDQojdGltZWxpbmVfdGFiX2NvbnRlbnQgI3BhZ2VsZXRfcGFnZV9t'+
    'b3N0X3JlY2VudF9zdHJlYW1fd3JhcHBlciAudWlTY3JvbGxhYmxlQXJlYUJvZHkgew0Kd2lkdGg6IDE5MHB4ICFpbXBvcnRhbnQ7'+
    'DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgI3BhZ2VsZXRfcGFnZV9tb3N0X3JlY2VudF9zdHJlYW1fd3JhcHBlciAubWFpbldy'+
    'YXBwZXIgew0Kd2lkdGg6IDE4MHB4ICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgI3BhZ2VsZXRfcGFnZV9t'+
    'b3N0X3JlY2VudF9zdHJlYW1fd3JhcHBlciAuc3RvcnlDb250ZW50IC5zdG9yeUlubmVyQ29udGVudCB7DQpvdmVyZmxvdzogaGlk'+
    'ZGVuOw0KZGlzcGxheTogaW5saW5lICFpbXBvcnRhbnQ7DQp3aWR0aDogYXV0byAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3Rh'+
    'Yl9jb250ZW50IC5zdG9yeUNvbnRlbnQgLm1haW5XcmFwcGVyIHsNCm1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7DQpwYWRkaW5nOiAw'+
    'cHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAuc3RvcnlDb250ZW50IC5tdm0gew0KbWFyZ2luLWJvdHRv'+
    'bTogMHB4ICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnByb2ZpbGVQaWNDaGFuZ2VVbml0LCANCiN0aW1l'+
    'bGluZV90YWJfY29udGVudCAuY292ZXJQaG90b0NoYW5nZVVuaXQsDQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnBob3RvVW5pdCwN'+
    'CiN0aW1lbGluZV90YWJfY29udGVudCAudmlkZW9Vbml0ICB7DQptYXgtd2lkdGg6IDYxNXB4ICFpbXBvcnRhbnQ7DQptYXJnaW46'+
    'IGF1dG8gIWltcG9ydGFudDsNCmJhY2tncm91bmQ6ICNGMkYyRjIgIWltcG9ydGFudDsNCndpZHRoOiAxMDAlOw0KfQ0KI3RpbWVs'+
    'aW5lX3RhYl9jb250ZW50IC52aWRlb1VuaXQgLnN3Zk9iamVjdCB7DQp3aWR0aDogMTAwJSAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVs'+
    'aW5lX3RhYl9jb250ZW50IC50aW1lbGluZVVuaXRDb250YWluZXIgLmV4dGVybmFsU2hhcmVVbml0V3JhcHBlciB7DQpiYWNrZ3Jv'+
    'dW5kOiAjRjJGMkYyOyANCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAudGltZWxpbmVVbml0Q29udGFpbmVyIC5leHRlcm5hbFNo'+
    'YXJlVW5pdFdyYXBwZXIgLmV4cGxvZGVkIHsNCm1hcmdpbjogYXV0byAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250'+
    'ZW50IC5waG90b1VuaXQgLnBob3RvV2lkdGgxIC5waG90b1dyYXAgew0Kd2lkdGg6IDYwNXB4ICFpbXBvcnRhbnQ7DQp0ZXh0LWFs'+
    'aWduOiBjZW50ZXI7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnBob3RvVW5pdCAucGhvdG9XaWR0aDIgLnBob3RvV3JhcCB7'+
    'DQp3aWR0aDogMzAwcHggIWltcG9ydGFudDsNCnRleHQtYWxpZ246IGNlbnRlcjsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAu'+
    'cGhvdG9Vbml0IC5waG90b1dpZHRoMyAucGhvdG9XcmFwIHsNCndpZHRoOiAyMDBweCAhaW1wb3J0YW50Ow0KdGV4dC1hbGlnbjog'+
    'Y2VudGVyOw0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5waG90b1VuaXQgLnBob3RvV3JhcCBpbWcgew0KbGVmdDogMHB4ICFp'+
    'bXBvcnRhbnQ7DQptYXgtd2lkdGg6IDYwMHB4Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lT25lQ29sdW1u'+
    'IC5leHRlcm5hbFNoYXJlVGV4dCB7DQp3aWR0aDogYXV0byAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5m'+
    'YlRpbWVsaW5lT25lQ29sdW1uIC5oYXNJbWFnZSAuZXh0ZXJuYWxTaGFyZVRleHQgew0Kd2lkdGg6IDQ4MHB4ICFpbXBvcnRhbnQ7'+
    'DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmxpa2VVbml0IC5saWtlVW5pdFRvb2x0aXAgew0KaGVpZ2h0OiAxMzBweDsgIWlt'+
    'cG9ydGFudDsNCn0=');
    
    var SweetGadget = null, StyleDoc = document.createElement('style');
    StyleDoc.setAttribute('type', 'text/css');
    StyleDoc.appendChild(document.createTextNode(CssText));
    document.head.appendChild(StyleDoc);
    timeline=CssText=StyleDoc=null;
    
    if (addGadget() === true) {
        dockPages(document);
    }
    
    document.addEventListener('DOMSubtreeModified', function(e) {
        if (!document.getElementById('sweetGadget')) {
            if (addGadget() !== true) {
                return;
            }
        }
        if (e.target) {
            if (e.target.id=='pagelet_timeline_recent'
            || /fbTimelineCapsule/.test(e.target.className)) {
                dockPages(e.target);
            }
        }
    }, false);
    
    function addGadget() {
        var ContentDoc = document.getElementById('timeline_tab_content');
        var div = document.createElement('div');
        if (!ContentDoc || !document.querySelector('ol.fbTimelineCapsule')) {
            return false;
        }
        SweetGadget = document.createElement('div');
        SweetGadget.setAttribute('id', 'sweetGadget');
        ContentDoc.insertBefore(SweetGadget, ContentDoc.firstChild);
        div.setAttribute('id', 'sweet_version_info');
        div.setAttribute('style', 'text-align: center;');
        div.innerHTML = '<a href="'+AppInfo.url+'" target="_blank">'+AppInfo.name +' v'+ AppInfo.version +'</a>';
        SweetGadget.appendChild(div);
        return true;
    }
    function dockPages(target) {
        if (!SweetGadget) {
            return;
        }
        var element;
        if ((element = target.querySelector('.fbTimelineFilters'))) {
            document.getElementById('sweet_version_info').appendChild(element);
        }
        if ((element = target.querySelector('.pageFriendSummaryContainer'))) {
            element.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }            
        if ((element = target.querySelector('#pagelet_page_most_recent_unit_wrapper'))) {
            element.style.display = 'none';
            element = element.querySelector('.timelineUnitContainer');
            if (element) {
                SweetGadget.appendChild(element);
            }
        }            
        if ((element = target.querySelector('#liked_pages_timeline_unit_list'))) {
            element.parentNode.parentNode.style.display = 'none';
            SweetGadget.appendChild(element.parentNode);
        }            
        if ((element = target.querySelector('#pagelet_timeline_friends_unit'))) {
            element.parentNode.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }
        if ((element = target.querySelector('.recentActivityUnit'))) {
            element.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }
        if ((element = target.querySelector('.recentAppsHeader'))) {
            element = element.parentNode.parentNode;
            element.parentNode.style.display = 'none';
            SweetGadget.appendChild(element);
        }
        
        if ((element = target.querySelector('.videoUnit a.videoThumb[href*=max_width]'))) {
            var width = /max_width=(\d+)/i.exec(element.href);
            if (width && parseInt(width[1]) > 614) {
                element.href = element.href.replace(/max_width=(\d+)/i, 'max_width=614');
            }
        }
    }
})();
