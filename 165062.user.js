// ==UserScript==
// @name        ConsolidatedSlices
// @namespace   Rackspace
// @description Adds a line that consolidates the RAM slice counts so that support can know how much RAM a customer is using
// @include     https://us.cloudcontrol.rackspacecloud.com/customer/*/servers
// @include     https://lon.cloudcontrol.rackspacecloud.com/customer/*/servers
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

var j;

j = jQuery.noConflict();

j(document).ready(function () {
    var items, slicePattern;
    
    items = [];
    totalSliceSpace = 0;
    formattedSliceSpace = '0 MB';
    slicePattern = new RegExp(/(\d+)(TB|GB)?/);
    
    j('#DataTables_Table_0>tbody>tr>td:nth-child(7)').each(function(){
        sliceTxt = j(this).text()
        matched = slicePattern.exec(sliceTxt);
        if (matched[2] === 'GB') {
            totalSliceSpace += parseInt(matched[1], 10) * 1024;
        } else if (matched === 'TB') {
            totalSliceSpace += (parseInt(matched[1], 10) * 1024) * 1024;
        } else {
            totalSliceSpace += parseInt(matched[1], 10);
        }
        
        if (totalSliceSpace >= 1048576) {
            formattedSliceSpace = totalSliceSpace / 1048576;
            formattedSliceSpace += 'TB';
        } else if (totalSliceSpace >= 1024) {
            formattedSliceSpace = totalSliceSpace / 1024;
            formattedSliceSpace += 'GB';
        } else {
            formattedSliceSpace = totalSliceSpace + 'MB';
        }
    });

    flavorField = j('th.sorting')[6];
    flavorFieldTxt = j(flavorField).text();
    
    j(flavorField).html(flavorFieldTxt + ' (' + formattedSliceSpace + ')');
});