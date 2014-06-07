// ==UserScript==
// @name        AHS_MAP
// @namespace   vlad_krasovsky
// @include     https://www.ahsvendor.com/dispatchStatus/*
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery.min.js
// ==/UserScript==

//  metodo_JQ(1);

var br = document.forms['dispatchStatusUpdateForm'].getElementsByTagName("table")[0].getElementsByTagName("table")[0].getElementsByTagName("tr");
for (var i = 1; i < br.length; i++)
{
    bs = br[i].getElementsByTagName("td");
    
    var child = bs[2].firstChild.innerHTML;
    
    //deleting unused symbols
    var addr = child.replace(/[\r\n]/g, ' ');
    var addr = addr.replace(/&nbsp;/gi, '');
    var addr = addr.replace("<br>", '');
    
    // deliting unused spaces
    var addr = addr.replace(/\s{2,}/g, ' ');
    
    
    
    //creating checkbox
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name" + i;
    checkbox.value = "value" + i;
    checkbox.id = "id" + i;
    
    //creating label with checkbox number
    var label = document.createElement('label')
    label.htmlFor = "id" + i;
    label.appendChild(document.createTextNode(i));
    
    //hidden data input to save out address data
    var data = document.createElement('input')
    data.type = "hidden";
    data.name = "address" + i;
    data.id = "id" + i;
    data.value = addr;
    
    bs[0].appendChild(checkbox);
    bs[0].appendChild(label);
    checkbox.appendChild(data);
    
    
    //checkbox event function
    checkbox.onclick = function()
    {
        if (this.checked)
                {
                    if (!window.document.getElementById("start"))
                    {
                        this.id = "start";

                    }
                    else
                    if (!window.document.getElementById("end"))
                    {
                        this.id = "end";

                    }
                    else
                    {
                        this.setAttribute("class","waypoints")

                    }
                    
                    var children = this.childNodes;
                    this.parentNode.parentNode.style.background = "yellow";
                    this.value = children[0].value;

                }
                else
                {
                    this.id = "0";
                    this.setAttribute("class","none");
                    this.parentNode.parentNode.style.background = "white";
                }
                
               calcRoute();
        
    };
}

//working with map

API_js_callback = "http://maps.google.com/maps/api/js?sensor=false&region=BR&callback=initialize";

var script = document.createElement('script');
script.src = API_js_callback;
var head = document.getElementsByTagName("head")[0];
(head || document.body).appendChild(script);

// if (document.getElementsByTagName('TABLE')[0] != null) {
//     var Tabela_1 = document.getElementsByTagName('TABLE')[0];
//     var Tabela_1_cel = Tabela_1.getElementsByTagName('TD');
//     var Tabela_1_lin = Tabela_1.getElementsByTagName('TR');
// }

// if (document.getElementsByTagName('TABLE')[1] != null) {
//     var Tabela_2 = document.getElementsByTagName('TABLE')[1];
//     var Tabela_2_cel = Tabela_2.getElementsByTagName('TD');
//     var Tabela_2_lin = Tabela_2.getElementsByTagName('TR');
// }


var div = document.createElement('div');
div.type = 'div';
div.style.position = 'fixed';
div.style.padding = '1';
div.style.right = '1%';
div.style.top = '1%';
div.innerHTML = "Map On/Off";

var CHECKbox = document.createElement('input');
CHECKbox.type = 'checkbox';
//     CHECKbox.style.position = 'fixed';
//     CHECKbox.style.padding = '1';
//     CHECKbox.style.right = '1%';
//     CHECKbox.style.top = '1%';
CHECKbox.checked = true;



var DIVmapa = document.createElement('div');
DIVmapa.id = 'DIVmapa';
DIVmapa.style.border = '2px coral solid';
DIVmapa.style.cursor = 'pointer';
DIVmapa.style.display = '';
DIVmapa.style.height = '50%';
DIVmapa.style.margin = '1';
DIVmapa.style.position = 'fixed';
DIVmapa.style.padding = '1';
DIVmapa.style.right = '1%';
DIVmapa.style.top = '17%';
DIVmapa.style.width = '32%';
DIVmapa.style.zIndex = '99';
//  DIVmapa.style.display='none' ;

var DIVinterna = document.createElement('div');
DIVinterna.id = 'DIVinterna';
DIVinterna.style.height = '100%';
DIVinterna.style.width = '100%';
DIVinterna.style.zIndex = '999';


document.body.appendChild(DIVmapa);
DIVmapa.appendChild(DIVinterna);
document.body.appendChild(div);
div.appendChild(CHECKbox);



// if (Tabela_1 || Tabela_2) {
//     document.body.appendChild(DIVmapa);
//     DIVmapa.appendChild(DIVinterna);
// }

initialize = setTimeout(function () {
  
   
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    
    var vanNuys = new google.maps.LatLng(34.185257, -118.453705);
    var myOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: vanNuys
    }
    
    map = new google.maps.Map(document.getElementById("DIVinterna"), myOptions);
    directionsDisplay.setMap(map);
    
    calcRoute();
}, 1000);

function calcRoute() {
    var start = window.document.getElementById("start").value;
    var end = window.document.getElementById("end").value;
    var waypts = [];
    var checkboxArray = document.getElementsByClassName('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) {
        waypts.push({
            location:checkboxArray[i].value,
            stopover:true});
    }
    
    
    var request = {
        origin: start, 
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {directionsDisplay.setDirections(response)};
        //alert(status);
    });
}

CHECKbox.onclick = function(){
    if (this.checked)
    {
        document.getElementById("DIVmapa").style.display='inline-block';
        //var map =  this.parentNode;
        //map.style.visibility='visible' ;
    }
    else
    {
        //var map =  this.parentNode;
        //map.style.visibility='hidden';
        document.getElementById("DIVmapa").style.display='none';
    }
    
}