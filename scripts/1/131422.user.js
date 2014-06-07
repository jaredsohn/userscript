// ==UserScript==
// @name Zaman Tüneli ++
// @copyright (C) DoctoR.Ossi (Osman APLAK)
// @author Osman APLAK https://www.facebook.com/DoctoR.Ossi
// @version 1.1
// @description Facebook zaman tüneline yep yeni bir görünüm katın.
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @require  http://sizzlemctwizzle.com/updater.php?id=131422
// ==/UserScript==



(function(timeline) {
    if (!document.getElementById('globalContainer') || document.getElementById('sweetGadget')) {
        return;
    }
    var AppInfo = {
        name: 'DoctoR.Ossi',
        version: ' 1.1',
        url: 'https://www.facebook.com/DoctoR.Ossi'
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
    'b2wuZmJUaW1lbGluZUNhcHN1bGUgPiBsaSB7DQp3aWR0aDogMTAwJSAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250'+
    'ZW50IC5mYlRpbWVsaW5lQ2Fwc3VsZSB7IA0KYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDsNCn0NCiN0aW1lbGlu'+
    'ZV90YWJfY29udGVudCAuZmJUaW1lbGluZVNlY3Rpb25FeHBhbmRlciB7DQptYXJnaW4tYm90dG9tOiA0NXB4Ow0KbWFyZ2luLWxl'+
    'ZnQ6IDIwNXB4Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lQ29udGVudEhlYWRlciB7DQptYXJnaW4tbGVm'+
    'dDogMjA1cHg7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVGaWx0ZXJzIHsNCm1hcmdpbi10b3A6IDVweDsN'+
    'CnBhZGRpbmctdG9wOiAwcHg7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVDYXBzdWxlIC5ib3R0b21Cb3Jk'+
    'ZXIgew0Kd2lkdGg6IGF1dG8gIWltcG9ydGFudDsNCmJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDNENERTA7DQpiYWNrZ3JvdW5k'+
    'LXBvc2l0aW9uOiAwcHggMHB4ICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVDYXBzdWxl'+
    'IC50b3BCb3JkZXIgew0Kd2lkdGg6IGF1dG8gIWltcG9ydGFudDsNCmJvcmRlci1yaWdodDogMXB4IHNvbGlkICNDNENERTA7DQpi'+
    'YWNrZ3JvdW5kLXBvc2l0aW9uOiAwcHggLTVweCAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC50aW1lbGlu'+
    'ZVVuaXRDb250YWluZXIgLnVpQ29tbWVudENvbnRhaW5lciB7DQp3aWR0aDogYXV0byAhaW1wb3J0YW50Ow0KbWFyZ2luOiAwcHgg'+
    'MHB4IDVweCAhaW1wb3J0YW50Ow0KcGFkZGluZzogMHB4ICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZi'+
    'VGltZWxpbmVVbml0QWN0b3IgLnVpUHJvZmlsZVBob3RvTWVkaXVtIHsNCndpZHRoOiA1MHB4ICFpbXBvcnRhbnQ7DQpoZWlnaHQ6'+
    'IDUwcHggIWltcG9ydGFudDsNCn0NCiNyaWdodENvbENvbnRlbnQgLmZiVGltZWxpbmVTY3J1YmJlciwgLnNwaW5lUG9pbnRlciwg'+
    'LmZiVGltZWxpbmVTcGluZSB7DQpkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLmZi'+
    'VGltZWxpbmVTZWN0aW9uVHJhbnNwYXJlbnQgew0KcGFkZGluZy10b3A6IDBweCAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3Rh'+
    'Yl9jb250ZW50IC5mYlRpbWVsaW5lVGltZVBlcmlvZCB7DQpiYWNrZ3JvdW5kOiB3aGl0ZSAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVs'+
    'aW5lX3RhYl9jb250ZW50IC5mYlRpbWVsaW5lVHdvQ29sdW1uIC50aW1lbGluZVVuaXRDb250YWluZXIsDQouZmJUaW1lbGluZUNh'+
    'cHN1bGUgZGl2LmZiVGltZWxpbmVDb21wb3NlclVuaXQgew0Kd2lkdGg6IGF1dG8gIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90'+
    'YWJfY29udGVudCB7DQpwYWRkaW5nLWJvdHRvbTogMHB4ICFpbXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgI3Bh'+
    'Z2VsZXRfcGFnZV9tb3N0X3JlY2VudF9zdHJlYW1fd3JhcHBlciAudWlTY3JvbGxhYmxlQXJlYSwNCiN0aW1lbGluZV90YWJfY29u'+
    'dGVudCAjcGFnZWxldF9wYWdlX21vc3RfcmVjZW50X3N0cmVhbV93cmFwcGVyIC51aVNjcm9sbGFibGVBcmVhQm9keSB7DQp3aWR0'+
    'aDogMTkwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAjcGFnZWxldF9wYWdlX21vc3RfcmVjZW50X3N0'+
    'cmVhbV93cmFwcGVyIC5tYWluV3JhcHBlciB7DQp3aWR0aDogMTgwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29u'+
    'dGVudCAjcGFnZWxldF9wYWdlX21vc3RfcmVjZW50X3N0cmVhbV93cmFwcGVyIC5zdG9yeUNvbnRlbnQgLnN0b3J5SW5uZXJDb250'+
    'ZW50IHsNCm92ZXJmbG93OiBoaWRkZW47DQpkaXNwbGF5OiBpbmxpbmUgIWltcG9ydGFudDsNCndpZHRoOiBhdXRvICFpbXBvcnRh'+
    'bnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnN0b3J5Q29udGVudCAubWFpbldyYXBwZXIgew0KbWFyZ2luOiAwcHggIWlt'+
    'cG9ydGFudDsNCnBhZGRpbmc6IDBweCAhaW1wb3J0YW50Ow0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5zdG9yeUNvbnRlbnQg'+
    'Lm12bSB7DQptYXJnaW4tYm90dG9tOiAwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAucHJvZmlsZVBp'+
    'Y0NoYW5nZVVuaXQsIA0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC5jb3ZlclBob3RvQ2hhbmdlVW5pdCwNCiN0aW1lbGluZV90YWJf'+
    'Y29udGVudCAucGhvdG9Vbml0LA0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC52aWRlb1VuaXQgIHsNCm1heC13aWR0aDogNjE1cHgg'+
    'IWltcG9ydGFudDsNCm1hcmdpbjogYXV0byAhaW1wb3J0YW50Ow0KYmFja2dyb3VuZDogI0YyRjJGMiAhaW1wb3J0YW50Ow0Kd2lk'+
    'dGg6IDEwMCU7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnZpZGVvVW5pdCAuc3dmT2JqZWN0IHsNCndpZHRoOiAxMDAlICFp'+
    'bXBvcnRhbnQ7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnRpbWVsaW5lVW5pdENvbnRhaW5lciAuZXh0ZXJuYWxTaGFyZVVu'+
    'aXRXcmFwcGVyIHsNCmJhY2tncm91bmQ6ICNGMkYyRjI7IA0KfQ0KI3RpbWVsaW5lX3RhYl9jb250ZW50IC50aW1lbGluZVVuaXRD'+
    'b250YWluZXIgLmV4dGVybmFsU2hhcmVVbml0V3JhcHBlciAuZXhwbG9kZWQgew0KbWFyZ2luOiBhdXRvICFpbXBvcnRhbnQ7DQp9'+
    'DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnBob3RvVW5pdCAucGhvdG9XaWR0aDEgLnBob3RvV3JhcCB7DQp3aWR0aDogNjA1cHgg'+
    'IWltcG9ydGFudDsNCnRleHQtYWxpZ246IGNlbnRlcjsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAucGhvdG9Vbml0IC5waG90'+
    'b1dpZHRoMiAucGhvdG9XcmFwIHsNCndpZHRoOiAzMDBweCAhaW1wb3J0YW50Ow0KdGV4dC1hbGlnbjogY2VudGVyOw0KfQ0KI3Rp'+
    'bWVsaW5lX3RhYl9jb250ZW50IC5waG90b1VuaXQgLnBob3RvV2lkdGgzIC5waG90b1dyYXAgew0Kd2lkdGg6IDIwMHB4ICFpbXBv'+
    'cnRhbnQ7DQp0ZXh0LWFsaWduOiBjZW50ZXI7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQgLnBob3RvVW5pdCAucGhvdG9XcmFw'+
    'IGltZyB7DQpsZWZ0OiAwcHggIWltcG9ydGFudDsNCm1heC13aWR0aDogNjAwcHg7DQp9DQojdGltZWxpbmVfdGFiX2NvbnRlbnQg'+
    'LmZiVGltZWxpbmVPbmVDb2x1bW4gLmV4dGVybmFsU2hhcmVUZXh0IHsNCndpZHRoOiBhdXRvICFpbXBvcnRhbnQ7DQp9DQojdGlt'+
    'ZWxpbmVfdGFiX2NvbnRlbnQgLmZiVGltZWxpbmVPbmVDb2x1bW4gLmhhc0ltYWdlIC5leHRlcm5hbFNoYXJlVGV4dCB7DQp3aWR0'+
    'aDogNDgwcHggIWltcG9ydGFudDsNCn0NCiN0aW1lbGluZV90YWJfY29udGVudCAubGlrZVVuaXQgLmxpa2VVbml0VG9vbHRpcCB7'+
    'DQpoZWlnaHQ6IDEzMHB4OyAhaW1wb3J0YW50Ow0KfQ==');
    
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
