// ==UserScript==
// @name           Lof.cc Popupkiller
// @namespace      Trancefusion
// @include        http://*lof.cc/*
// ==/UserScript==
pcontainer = document.getElementsByTagName('p');
for(i=0;i<pcontainer.length;i++){
    inputs = pcontainer[i].getElementsByTagName('input');
    for(i2=0;i2<inputs.length;i2++){
        if(inputs[i2].type == "submit"){
            inputs[i2].style.display = 'none';
            pcontainer[i].innerHTML = '<input style="background-color:green;" class="button" value="Weiter zum Download" type="submit">';
        }
    }
}