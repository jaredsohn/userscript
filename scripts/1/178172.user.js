// ==UserScript==
// @name        	eRepublik AutoFriender
// @namespace   	By Hori873 (Mlendea Horatiu)
// @description 	Automatically sends a Friendship Requests when you visiat a profile page in eRepublik
// @include			http://www.erepublik.com/en/citizen/profile/*
// @version			0.1
// ==/UserScript==

var ok = true;

function PreviousRequest()
{
    var tds = document.getElementsByTagName('td');
    
    for(var i = 0; i < tds.length; i++)
        if(tds[i].innerHTML == 'Your friendship request has been sent.')
        	return true;
        
    return false;
}

function Blacklisted()
{
    var bl =
        [
            '5703062', // zmeuNY
            '7442928', // Gica RoUni
            '5673321', // MugurCosmin
            '6304248', // Mosquetaire
            '6418047', // Xamolxes
            '5434081', // cristi4seby
            '4676938', // Doru Gradinaru
            'ANYID' // ANYONE
        ];
    
    var url = document.URL.split('/');
    var id = url[url.length-1];
    
    for(var i = 0; i < bl.length; i++)
        if(id == bl[i])
            return true;
        
    return false;
}

var ahrefs = document.getElementsByTagName('a');

for(var i = 0; i < ahrefs.length; i++)
{
    var ahref = ahrefs[i];

    if(ahref.className == 'action_friend tip')
    {
        if(Blacklisted() == false)
        	if(PreviousRequest() == false)
        		ahref.click();
           
        
        break;
    }
}
