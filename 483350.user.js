// ==UserScript==
// @name       PLAYED.to Download Button
// @namespace  http://sabinico.com/
// @version    0.1
// @description  Add a button into PLAYED.to to DOWNLOAD the VIDEO
// @match      http://played.to/*
// @copyright  2014+, Sabinico
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function GetURLParameter(direccion,sParam)
{
    var sPageURL = direccion;
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}


$(function(){
	//OnLoad - Obtain URL to Download
    var data = $('#flvplayer_wrapper object param[name=flashvars]').attr('value');
    var decoded = decodeURIComponent(data);
    var urlFLV = GetURLParameter(decoded,'file'); 
	var url = urlFLV.replace(".flv","");
    var button = '<a target="_blank" href="'+url+'" id="downloadsabinico" style="display: inline;margin-left:3px;" class="btn btn-danger nrc">DOWNLOAD by Sabinico :)</a>';
    
    //Create button to download
    $('#div_extra td:first-child').append(button);
});