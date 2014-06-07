// ==UserScript==
// @name       SiN Trustee Manager
// @namespace  http://outwardb.com
// @version    1.0
// @description  This tool is used to manage trustees for your crew. Just get your crew members to install this and this will handle the rest!
// @author    Shady
// @include      *.outwar.com*
// @copyright  None
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==
var sHost;
var sToTrustee;

$(document).ready(function(){
    sHost = window.location.hostname;
    EmbedGUI();
    GetAccounts();
	LoadTrustees();
    
    $('#tmTrustee').click(function(){
        Trustee();
    });
	
	$(".content").hide();
	$('#outerdiv').css('height', 'auto');
	//toggle the component with class msg_body
	$(".heading").click(function(){
		$(this).next(".content").slideToggle(500);
	});
});

function EmbedGUI(){
    var css = "<link rel='stylesheet' type='text/css' href='http://outwardb.com/shady/TFO/tmstyle.css'>";
    var html = "<br><div class='heading'><div id='tmLine'></div><div id='tmHeader'></div><div id='tmLine'></div></div>\
                <div class='content'><div id='tmAccounts'></div>\
                <div id='tmNav'><input type='button' value='Trustee' id='tmTrustee'/></div><div id='tmLine'></div></div>";
    $('#outerdiv').html(css + html);
}

function GetAccounts(){
    $('#toolbar_uid option').each(function(index, row){
        if($(row).attr('value') == '0'){ //Ignores trustees
                return false;
        }
        var newEle = $(document.createElement('div'));
        newEle.html('<input type="checkbox" />' + $(row).text());
        newEle.attr('id',$(this).attr('value'));
        $('#tmAccounts').append(newEle);
    });
}

function LoadTrustees(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://outwardb.com/shady/TFO/t.php",
		onload: function(response) {
			sToTrustee = eval(response.responseText.toLowerCase());
		}
	});
}

function Trustee(){
    $('#tmAccounts input[type="checkbox"]:checked').each(function(index, row){
        $(sToTrustee).each(function(index, toTrustee){
            Request("GET", "trust.php", {}, TrusteeAccount, [$(row).parent().attr('id'), toTrustee]);
        });
		Request("GET", "trust.php", {t_serv: 1, t_char: $(row).parent().attr('id')}, UpdatePermission);
    });
}

function TrusteeAccount(data, oArgs){
    var formHash = $(data).find('input[name="form-nonce"]').val();
    var data = {
        t_serv: $(data).find('input[name="t_serv"]').val(),
        t_char: oArgs[0],
        add: oArgs[1],
        'form-nonce': formHash
    };
    Request("POST", "trust.php", data);
}

function UpdatePermission(data){
    var postData;
    postData = {
        'form-nonce':$(data).find('input[name="form-nonce"]').val(),
        update:1,
        t_char: $(data).find('input[name="t_char"]').val(),
        t_serv: $(data).find('input[name="t_serv"]').val()
    };
    $(data).find('input[value="Update Permissions"]').siblings('table').find('a').each(function(index, row){
        var temp, temp2, found = false;
        
        temp = $(this).parent().text();
		temp = $.trim(temp.split('\n')[2]);
        temp2 = $(this).attr('href').split('remove=');

		if(sToTrustee.indexOf(temp.toLowerCase()) > -1){
			postData['potion[' + temp2[1] + ']'] = 1;
			postData['lingbuff[' + temp2[1] + ']'] = 1;
			postData['teleport[' + temp2[1] + ']'] = 1;
			found = true;
		}

        if(!found){
            $(this).parent().parent().find('input[type="checkbox"]').each(function(index, row){
                var val = 0;
                if($(this).is(':checked')){
                    val = 1;
                }
                postData[$(this).attr('name')] = val;
            });
        }
    });
    Request("POST", "trust.php", postData, FinishTrustee, $(data).find('input[name="t_char"]').val());
}

function FinishTrustee(data, oArgs){
    $('#tmAccounts div[id="' + oArgs + '"]').addClass('done');
}

function Request(sType, sPage, sData, fCallback, oArgs){
    $.ajax({
        type: sType,
        url: 'http://' + sHost + '/' + sPage,
        data: sData,
        success: function(data){
            if(fCallback != undefined)
                fCallback(data, oArgs);
        },
        async: false
    });
}