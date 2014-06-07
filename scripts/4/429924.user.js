// ==UserScript==
// @name       MCBProduction.SetReturnDestination
// @version    1.0
// @description  Set support case's returning URI to current user's support list
// @copyright  2012+, You
// ==/UserScript==


var $itv = window.setInterval(manipulateParentURI,1000);

function manipulateParentURI(){
    if($('#informationContent').children().length > 0){
        var $parentUri = $('#parentUri').val(), 
            $workloadHref = $('th.col-workload a').attr('href'), 
            $userGuid = $workloadHref.substring($workloadHref.indexOf('?'), $workloadHref.indexOf('&'));
        
        if($parentUri.indexOf('?') !== -1){
            $parentUri = $parentUri.substring(0, $parentUri.indexOf('?'));
        }
        $('#parentUri').val($parentUri + $userGuid);
        
        window.clearInterval($itv);       
    }
}