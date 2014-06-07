// ==UserScript==
// @name		Ogame dodatni meni, v2.0 - za Ogame v0.80
// @namespace	Dodaje linkove u lijevom meniju za simulatore borbe, link za kruznu poruku, clanove saveza v2.0
// @description Dodaje linkove simulatora: DragoSim, SpeedSim, konvertor borbi takanacity, link za kruznu poruku, clanovi saveza... Radi na .ba i .org serverima.
// @author      unixash
// @date        2008-06-09
// @version     2.0
// @include http://uni*.ba.ogame.org*
// @include http://uni*.ogame.org*
// @include http://*/game/index.php?page=overview*
// @exclude	   
// ==/UserScript==    

//Start.Ogame_Menu.v2.0.js
//############################################################################

 
var sid = location.search.split('&')[1].split('=')[1];
// Begin of Configuration
var menu = false;
var external_links = false;
var internal_links = false;
var external_links = new Array(
 
    {name:'Drago-Sim', url:'http://drago-sim.com/index.php?lang=bosnian', color:'red'},
    {name:'Speed Sim', url:'http://websim.speedsim.net/index.php', color:'red'},
    {name:'Takana-Konvertor', url:'http://www.takanacity.com/main.php?tag=crconverter', color:'#ffffff'}
     );
var internal_links = new Array(
    {name:'Kruzna Poruka', url:'index.php?page=allianzen&session='+sid+'&a=17', color:'red'},
    {name:'Clanovi Saveza', url:'index.php?page=allianzen&session='+sid+'&a=4&sort1=3&sort2=1', color:'#ffffff'},
    {name:'Odskocna Vrata', url:'index.php?page=infos&session='+sid+'&gid=43', color:'#ffffff'}
    );
 
// End of Configuration
 
if (menu && location.search.indexOf('gid=43', 0) >= 0)
{
    var tables = document.getElementById('content').getElementsByTagName('table');
    if (tables.length > 4)
    {
        var regexp = /(\([0-9]+)/;
        var trs = tables[3].getElementsByTagName('tr');
        for (var i = 1; i < (trs.length - 1); i++)
        {
            var ths = trs[i].getElementsByTagName('th');
            ths[1].innerHTML += '<input id="buttonMax'+i+'" type="button" value="max" onclick="this.previousSibling.value='+ths[0].innerHTML.match(regexp)[0].substr(1)+'">';
        }
        trs[i].getElementsByTagName('th')[0].innerHTML += '&nbsp;<input type="button" value="All" onclick="for (var i = 1; i < '+(trs.length - 1)+'; i++)document.getElementById(\'buttonMax\'+i).click();">&nbsp;<input type="reset">';
    }
}
var elems = [''];
var td = document.getElementById('menu').getElementsByTagName('td');
for (var i = 0; i < td.length; i++)
    for (var elem in elems)
        if (td[i].innerHTML.indexOf(elems[elem], 0) >= 0)
        {
            if (elems[elem] == 'tutorial.')
                td[i].innerHTML = '<div style="text-align:center;"><a href="index.php?page=infos&session='+sid+'&gid=43">'+jump_gate_text+'</a></div>';
            else if (external_links && elems[elem] == 'ogame.com.hr','impressum.')
                var last_item = td[i].parentNode;
            else
                td[i].parentNode.removeChild(td[i]);
        }
if (external_links || internal_links)
{
    if (external_links)
        for (var key in external_links)
        {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = '<div style="text-align:center;"><a target="_blank" href="'+external_links[key].url+'" style="color:'+external_links[key].color+';">'+external_links[key].name+'</a></div>';
            tr.appendChild(td);
            last_item.parentNode.insertBefore(tr, last_item);
        }
    if (internal_links)
        for (var key in internal_links)
        {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = '<div style="text-align:center;"><a href="'+internal_links[key].url+'" style="color:'+internal_links[key].color+';">'+internal_links[key].name+'</a></div>';
            tr.appendChild(td);
            last_item.parentNode.insertBefore(tr, last_item);
        }
    last_item.parentNode.removeChild(last_item);
};