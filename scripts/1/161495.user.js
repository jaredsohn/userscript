// ==UserScript==
// @name            OGame:SaveCoordinates
// @namespace       localhost
// @author          Asiman
// @include         http://*.ogame.*/game/index.php?page=*
// @copyright		2013, LogServer.net
// @license         GNU
// @version 		1.3
// @homepage        http://userscripts.org/scripts/show/161495
// ==/UserScript==

var $ = unsafeWindow.$;

$.getScript( '/cdn/js/greasemonkey/version-check.js', function()
{
    (unsafeWindow || window).oGameVersionCheck('SaveCoordinates','5.3.4','http://userscripts.org/scripts/show/161495');
} );

function SaveCoor(x,y,z)
{
        if (x&&y&&z&&x<=9&&y<=499&&z<=15)
            {
                var id = x+''+y+''+z;
                var ids = localStorage.getItem('ids');
                if (!ids)
                    {
                        var ids = x+''+y+''+z;
                    } else
                    {
                        var ids = ids+','+x+''+y+''+z;
                    }
                var show = '';
                    show += '<tr height="35">';
                    show += '   <td align="center">';
                    show += '       <a href="javascript:showGalaxy('+x+','+y+','+z+')" class="btn_blue" style="display:inline; padding:2px 5px; min-width: 100px;">'+x+':'+y+':'+z+'</a>';
                    show += '   </td>';
                    show += '   <td align="center">';
                    show += '       <a href="index.php?page=fleet1&galaxy='+x+'&system='+y+'&position='+z+'&type=1&mission=1" class="btn_blue" style="display:inline; padding:2px 5px; min-width: 10px;">A</a>';
                    show += '   </td>';
                    show += '   <td align="center">';
                    show += '       <a href="javascript:void(0);" onclick="sendShips(6,'+x+','+y+','+z+',1,3);return false" class="btn_blue" style="display:inline; padding:2px 5px; min-width: 10px;">S</a>';
                    show += '   </td>';
                    show += '   <td align="center">';
                    show += '       <a href="index.php?page=fleet1&galaxy='+x+'&system='+y+'&position='+z+'&type=1&mission=3" class="btn_blue" style="display:inline; padding:2px 5px; min-width: 10px;">T</a>';
                    show += '   </td>';
                    show += '   <td align="center">';
                    show += '       <input type="button" id="del'+id+'" name="'+id+'" class="btn_blue" style="display:inline; padding:2px 5px; min-width: 10px;" value="x" />';
                    show += '   </td>';
                    show += '</tr>';

                localStorage.setItem('ids', ids);
                localStorage.setItem(id, show);
            }
}
function AddGalaxyCoor()
{
	var item = $('span[id*="pos-planet"]').text().replace(/\[/g,'').split(']');
	var items = $('span[id*="pos-planet"]');
	for (var i = 0; i < items.length; i++)
	{
        if (!($("#g"+i).val()))
        {
            var core = item[i].split(':');
            items.eq(i).after('<input type="text" id="g'+i+'" value="1" style="display:none;" size="3" /><input type="button" id="id'+i+'" class="btn_blue" style="display:inline; padding:2px 5px; min-width: 10px;" name="'+item[i]+'" value="+" />');
$("#id"+i).click((function()
    {
        var item = this.name;
        var core = item.split(':');
        var x = core[0];
	    var y = core[1];
	    var z = core[2];
        SaveCoor(x,y,z);
        document.location.href = window.location.href;
    }));
    }
}
}

if (document.URL.indexOf('galaxy')>-1)
{
    setInterval (AddGalaxyCoor, 1000);
}

var ids = localStorage.getItem('ids');
if (!ids)
    {
        var btn_scclear = '';
    } else {
        var btn_scclear = ' <input type="button" id="scclear" class="btn_blue" value="Clear" />';
    }
var showTable = '';
    showTable += '<table>';
    if (ids)
    {
        var ids = localStorage.getItem('ids').split(',');
        for (var i = 0; i < ids.length; i++)
            {
                var showIds = localStorage.getItem(ids[i]);
                if (showIds) {showTable += showIds;}
            }
    }
    showTable += '<tr>';
    showTable += '  <th colspan="4" align="center">';
    showTable += '      <input type="text" id="x" size="3" />';
    showTable += '      <input type="text" id="y" size="3" />';
    showTable += '      <input type="text" id="z" size="3" />';
    showTable += '  </th';
    showTable += '</tr>';
    showTable += '<tr>';
    showTable += '  <th colspan="4" align="center">';
    showTable += '      <input type="button" id="scsave" class="btn_blue" value="Add" />';
    showTable +=        btn_scclear;
    showTable += '  </th>';
    showTable += '</tr>';
    showTable += '</table>';

  $("#toolLinksWrapper").after(showTable);

$("#scsave").click((function()
    {
	    var x = $("#x").val();
	    var y = $("#y").val();
	    var z = $("#z").val();
        SaveCoor(x,y,z);
        document.location.href = window.location.href;
    }));

$("#scclear").click((function()
    {
        localStorage.clear();

        document.location.href = window.location.href;
    }));

var ids = localStorage.getItem('ids').split(',');
for (var i = 0; i < ids.length; i++)
{
 $("#del"+ids[i]).click(function()
    {
        var item = this.name;
        localStorage.removeItem(item);

        var ids = localStorage.getItem('ids').replace(new RegExp(item), "");
        localStorage.setItem('ids', ids);

        document.location.href = window.location.href;
    });
}