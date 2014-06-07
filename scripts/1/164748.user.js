// ==UserScript==
// @name       Dumpert video download button
// @namespace  dumpert.nl_downloadbuttonbydroplul
// @version    0.1.337
// @description  Nope!
// @match      http*://www.dumpert.nl/mediabase/*
// @include    http*://dumpert.nl/mediabase/*
// @copyright  2012+, Droplul
// ==/UserScript==

function selectAttribute(elem, name) {
	
    for(var i = 0; i < elem.attributes.length; i++) {
        var a = elem.attributes[i];
        if(a.name == name) return a.value;
    }
    
    return 0;
    
}

window.addEventListener('load', function() {

    var c = document.getElementById('iteminfo');
    var p = '<div style="padding-top: 120px; text-align: center;"><select id="downloadSelect" name="download"><option value="0">Download</option>';
    var l = [];
    var v = document.querySelectorAll('div.video');
    
    if(v.length == 0) return 0;
    
    for(var i = 0; i < v.length; i++) {
   		l[i] = selectAttribute(v[i], 'data-vidurl');
   		p += '<option value="'+l[i]+'">Video #'+(i+1)+'</option>';
    }
    
    p += '</select> <a></a></div>';
    c.innerHTML += p;
    
    s = document.getElementById('downloadSelect');
    s.addEventListener('change', function() {
        if(this.value == 0) return 0;
    	var a = this.parentNode.querySelector('a');
        a.innerHTML = 'Right-click -> Save as';
        a.href = this.value;
    });

});
