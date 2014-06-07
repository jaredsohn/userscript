// ==UserScript==
// @name           GLB Mass DPC Delete
// @namespace      GLB
// @description    Deletes Checked DPC plays
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready( function() {

    //get team id
    var curwindow = window.location.href;
    var teamid = curwindow.substring(curwindow.indexOf('team_id=')+8,curwindow.length);
    if (isNaN(teamid)==true) {
        teamid = teamid.substring(0,teamid.indexOf('&'));
    }

    $('.nonalternating_color', 'table').each(function(q){
        //build header
        var delcell = document.createElement('td')
        delcell.setAttribute('width','5%');
        delcell.innerHTML = 'Delete';
        $(this).append(delcell);
    })


    $('.alternating_color1 , .alternating_color2', 'table').each(function(t){
        
        //get play id
        var rowhtml = $(this).html();

        var playid = rowhtml.substring(rowhtml.indexOf('delete=')+7,rowhtml.indexOf('"', rowhtml.indexOf('delete')));

        //build checkboxes
        var tablerow = document.createElement('td');
        tablerow.setAttribute('align', 'center');
        var chkbox = document.createElement('input');
        chkbox.setAttribute('type', 'checkbox');
        chkbox.setAttribute('id', 'del_' + playid);
        //chkbox.checked = true;
        tablerow.appendChild(chkbox);
        $(this).append(tablerow);
    })

    //build delete button
    var linebreak = document.createElement('br');
    var delbutton = document.createElement('input');
    delbutton.setAttribute('id', 'delbutton');
    delbutton.setAttribute('type', 'button');
    delbutton.setAttribute('value', 'Delete Plays');
    $('.clear:last').before(linebreak);
    $('.clear:last').before(linebreak);
    $('.clear:last').before(linebreak);
    $('.clear:last').before(linebreak);
    $('.clear:last').before(linebreak);
    $('.clear:last').before(linebreak);
    $('.clear:last').before(delbutton);

    delbutton.addEventListener('click', dodeletes,false);

    function dodeletes(){
        var checkedboxes = new Array;
        $('input[id*="del_"]').each(function(z){
            if ($(this).attr('checked')==true) {
                var thisid = $(this).attr('id');
                thisid = thisid.substring(4,thisid.length);
                checkedboxes.push(thisid);
            }
        })
        if (checkedboxes.length > 0) {
            var totalamount = checkedboxes.length;
            for (var w = 0; w<checkedboxes.length;w++) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://goallineblitz.com/game/team_create_defense.pl?team_id=' + teamid + '&delete=' + checkedboxes[w],
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                    },
                    onload: function() {
                         totalamount = totalamount -1;
                         if (totalamount==0) {
                             alert('All Selected Plays Deleted');
                             window.location.reload();
                         }
                    }
                    });
            }
        }else{
            alert('No boxes checked');
        }
    }

})
