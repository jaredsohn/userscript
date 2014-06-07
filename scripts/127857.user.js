// ==UserScript==
// @name          Avatar Mask for kaolyn 
// @namespace     http://userstyles.org
// @description   Miserarenaiyo!
// @author        kawau
// @match         http://heello.com/*
// @match         https://heello.com/*
// ==/UserScript==

(function(){
var parent;
var data = 'data:image/gif;base64,'+
'R0lGODlhSwBLAPcAAAAAAAgFAwwGDAwLCxQODRcNFxgSCRkVFxsUIhsiHR0iJCANHiIRDyMaGj8e'+
'HSQYJSwZMTIbNCQjHSgmJyswKywyNDYoKjYnNjkyLjg2NzolQTs8Qj5COTxCQk0tG1QzGkkjIUM5'+
'N1Y0N2Y9InQ9Knc8O0MoR0stUUc+QU40UlAvVFo2SVU0WFs3ZGQ8R2U5WmM5Z0hEPVJEP21EKG1C'+
'NnVCK3hEMkdERktPUkxUTFNJR1NOUVdWV1xaY1tgW2NJSGBSTWRYVHxMUHRWWWlGb2xCdmBcYHVF'+
'e3VcYGJiXXVjWWdnZm1wbXlnZXNvcnJwa3h5eHpJhX9Qhn6DfnqCgZ08PKI8PKE8QoVJK4VGN41R'+
'KY5YPJ1CPJZaOKNCPqZeOqxjPLNrPLtwP4hXVpxDQ5leRpRaXJxeY49iSYt3WpNlSoRsZ49ocIVy'+
'a4l4d51iaJJ4a5N5d6VGRqhKUKlUR6hTVLhWTbRZWK5cYbRdYqxhXapmaKppc7ZoaLhtcrxxa7t3'+
'd8RvPcJzPdh+P8NcTcddVMRuQ8ZhUsZzQ9N4ScRpZ8dza8V5eYdOjYlPk4hUjYlUk5JPiJJTlYN9'+
'grx+gtN/hIGAfZuJZpeCe6ufer+AetmDScyAfOuKTeyJUe2QS/GLTPOLUfSRTYKDg4WJhoSJiomF'+
'hYmEi46MhouLi4+Rj5iIhpCNkpOQj5iZmJ+fpp2lnKSLiKiQiqyYlr6CgrOVjbeal6ifpr6kn6eo'+
'p6mtsK+xr6uxtL6jora2tr6+w77AvsaHhsiMkMuTjseVlNmGi92HkdKQhdOZm9SeosCmntSindW6'+
'iMmops6wrMG1vtSnqNitstSzrdm2tOCEkuOzp+O7ucC+wN2/xOO+wtzFk8LBut3Bu+LFjuLFlejE'+
'vPDFu8jIx83RzcvR0N7AwtTP0tjZ193g3OrGw+fP1OTQzerX1/HHxOXc4+nk3PPi2uPk4+Po4+zi'+
'4+nn6O7p5Ozt7Ozu8e3y7evw8PPp6PXt8PTy7Pz9/AAAAAAAAAAAACH5BAEAAP8ALAAAAABLAEsA'+
'AAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDMOrIdqQ4YMo+BpHOnQ3g0LZ/i8ETEhHMmX'+
'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'+
'+dCPvvRhEhAAOw==';

if (location.pathname.substring(0, 9) == '/messages'){
    parent = '';
} else if (document.getElementById('single-ping')){
    parent = '';
} else {
    parent = '#pings .ping[data-username="kaolyn"]';
}

function iconMASK(){
    var elements = document.querySelectorAll(parent+':not([mask-added])');
    for(var i = 0; i < elements.length; ++i){
        var e = elements[i];
        var hakofugu = document.createElement('img');
        hakofugu.setAttribute('src', data);
        hakofugu.className = 'icon-mask';
        e.getElementsByClassName('avatar', 'div')[0].getElementsByTagName("a")[0].appendChild(hakofugu);
        e.setAttribute('mask-added', '1');
    }
}

if (parent){
    document.styleSheets[0].addRule('div.avatar', 'position: relative; left: 0px; top: 0px;');
    document.styleSheets[0].addRule('div.avatar a img.icon-mask', 'position: absolute; width: 50px; left: 0px; top: 0px;');
    iconMASK();
    setInterval(iconMASK, 1000);
}
})();

