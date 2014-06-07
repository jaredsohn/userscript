// ==UserScript==
// @name           netbynet_outgoing_traffic
// @namespace      
// @description    Adds missing field "total outgoing traffic" at user statistics page of Moscow inetrnet operator netbynet.ru
// @include        http://stat.netbynet.ru/?page=ainfo&cnum=*
// ==/UserScript==

function toBytes(val,unit) {
    var mult = 1
    if ( unit == 'К' ) {
//        mult = 1024.0;
          mult = 1000.0
    }
    else if ( unit == 'М' ) {
//        mult = 1048576.0
          mult = 1000000.0
    }
    else if ( unit == 'Г' ) {
//        mult = 1073741824.0;
          mult = 1000000000.0;
    }
    return val*mult
}

function toGigabytes(val) {
//    return (val/(1073741824.0)).toFixed(2) + " Гб"
      return (val/(1000000000.0)).toFixed(2) + " Гб" // netbynet.ru counting style
}

function traf(type) {
    if ( type == 'in' ) {
        len = 15
    }
    else if ( type == 'out' ) {
        len = 16
    }
    else { return false; }
    var totalGb = ''
    var collect_next = 0
    var total = 0
    var t = document.getElementsByTagName('strong')
    for ( i=0; i<t.length; i++ ) {
        var val = t[i].childNodes[0].data
        var result=null
        if ( collect_next && ( result = val.match(/(\d+\.\d\d*)\s*(.).$/) ) ) {
            total += toBytes(result[1],result[2])
            collect_next = 0;
        }
        if ( val.length == len  ) {
            collect_next = 1
        }
    }
    return toGigabytes(total);
}

function where_insert_outgoing(value) {
    var t = document.getElementsByTagName('td');
    var class;
    for ( i=0; i<t.length; i++ ) {
        if ( (class = t[i].getAttribute('class')) && class == 'personal_text') {
            if ( t[i].childNodes[0].data.search(/Входящий трафик:/) != -1 ) {
               var tr = document.createElement('tr');
               var container =  t[i].parentNode.parentNode
               container.insertBefore(tr,container.lastChild);
               tr.innerHTML = '<td class="personal_text" style="background:yellowgreen">Исходящий трафик:' + 
                              '<td class="personal_text" style="background:greenyellow">'+value
            }
        }
    }
}


// window.onload = function() { where_insert_outgoing(traf('out')); }
window.addEventListener('load',function() { where_insert_outgoing(traf('out')) },true)
