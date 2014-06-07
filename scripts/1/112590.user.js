// ==UserScript==
// @name           Ranking de flotas en vista de galaxia
// @namespace      ranking_flotas_galaxia
// @description    Ranking de flotas en vista de galaxia
// @include        http://*.ogame*/game/index.php?page=galaxy*
// @include        http://*.ogame*/game/index.php?page=overview*
// ==/UserScript==

var url = document.location.href;
uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
uni = uni ? uni[1] : '0';
uni = uni.replace('UNI', '');

/*VERSION*/var Version = '1.0.9';/*VERSION*/

if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
else 											{var FireFox = false;var nomScript='MarqueurGalaxieRedesign';}
if (navigator.userAgent.indexOf('Opera')>-1) 	var Opera = true;
else 											var Opera = false;
var AJours = GM_getValue(nomScript+"aJours",true);


if(!FireFox) 
{
	function GM_getValue(key,defaultVal) 
	{
		var retValue = localStorage.getItem(key);
		if ( !retValue ) 
		{
			return defaultVal;
		}
		return retValue;
	}

	function GM_setValue(key,value) 
	{
		localStorage.setItem(key, value);            
	}
}

if (location.href.indexOf('page=overview')>-1) {
   checkVersion();
}
        
if (location.href.indexOf('page=galaxy')>-1) {
   setInterval(function() {
    var sistema = document.getElementById('system_input').value;
        addRankInformation();
   }, 500);
}
array_users = new Array();

function inArray(user) {
    for(var i = 0; i < array_users.length; i++) {
        if(array_users[i].username == user) {
            return array_users[i];
        }
    }
    return false;
}

function checkVersion() {
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/source/100800.user.js',
    headers: {
    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
    },
    onload: function(responseDetails) {
        var vrs = responseDetails.responseText.split('/*VERSION*/');
        eval(vrs[1].replace('var Version', 'var Version2'));
        if(Version2 > Version) {
            var link = '<a style="color:red;position:absolute;right:10px;font-size:14px;text-decoration:underline" onclick="this.innerHTML=\'\';" href="http://userscripts.org/scripts/source/100800.user.js">Nueva versión de Puntos de flota en galaxia disponible. Instalar!</a>';
            document.getElementById('siteFooter').innerHTML = link + document.getElementById('siteFooter').innerHTML; 
            
        }
    }
    });    
}

function addToGalaxy(obj, where) {
    try{
        if(where.innerHTML.indexOf('class="rank_flota2"') == -1) {
    
            var newspan = document.createElement('span');
            newspan.setAttribute('class', 'rank_flota2');
            newspan.style.color = '#f48635';
            newspan.style.fontSize = '9px';
            var color = 'white';
            
            //rank = rank.replace('.', '');
            if(parseInt(obj.rank.replace('.', '')) < 801 && parseInt(obj.rank) > 0) {
                color = '#878A8C';
            }
            if(parseInt(obj.rank.replace('.', '')) < 401 && parseInt(obj.rank) > 0) {
                color = 'yellow';
            }                     
            if(parseInt(obj.rank.replace('.', '')) < 201 && parseInt(obj.rank) > 0) {
                color = '#F2134B';
            }
            if(parseInt(obj.rank.replace('.', '')) < 101 && parseInt(obj.rank) > 0) {
                color = '#FF0000';
            }
            
            var titulo = 'Rank: '+ obj.rank+' - Puntos de flota: '+obj.points;
            newspan.innerHTML = '<br />Puntos Flota: <span title="'+titulo+'" style="color:'+color+';font-size:11px">'+obj.points+'</span>';            
            where.appendChild(newspan);
        }        
    } catch(e) {
        
    } 
}

function putUserPoints(user, where) {
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ogame.gamestats.org/es/'+uni+'/details/player/'+user,
    headers: {
    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
    },
    onload: function(responseDetails) {

    
        try{
            var points = responseDetails.responseText.split('<table')[2].split('<tr>')[7].split('<td class=s>')[4].replace('</td></tr>', '');
            var rank = responseDetails.responseText.split('<table')[2].split('<tr>')[7].split('<td class=s>')[1].replace('</td>', '');           
        } catch(e) {
            return;
        }
        var aux = new Object();
        aux.username = user;
        aux.points = points;
        aux.rank = rank;
        addToGalaxy(aux, where);
        var mdate = new Date();
        GM_setValue(uni+"_"+user+"_"+getToday(), '{username:"'+aux.username.trim()+'", points:"'+aux.points.trim()+'", rank:"'+aux.rank.trim()+'"}');        
        array_users.push(aux);
    }
    });    
}

function getToday() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth();
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return year+"_"+month+"_"+day;
}


function addRankInformation() {
    var table_ranks = document.getElementById('galaxytable');
    if(table_ranks == null) return;
    var trs_ranks = table_ranks.getElementsByTagName('tr');

    for(var i = 1; i < trs_ranks.length; i++) {
        var tds = trs_ranks[i].getElementsByTagName('td');
        if(tds.length == 12) {
            if(typeof(tds[7].getElementsByTagName('a')[0]) == 'undefined') continue;
            var name = tds[7].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML;
            name = name.replace('...', '');
            if(name != '' ) {                
                var item_value = GM_getValue(uni+"_"+name+"_"+getToday());
                if(typeof(item_value) != 'undefined') {
                    obj = eval('('+item_value+')');
                    addToGalaxy(obj,  tds[7]);
                    continue;
                }
                obj = inArray(name);
                if( obj != false) {
                    addToGalaxy(obj,  tds[7]);                    
                } else {
                    putUserPoints(name, tds[7]);    
                }                
            }
        }
    }        
}