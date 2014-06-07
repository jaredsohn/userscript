// ==UserScript==
// @name Wybieranie afilianta na podstawie ID
// @description Wybiera afilianta o podanym ID
// @include http://system.netsales.pl/admin/offer_account_settings/add/offer/*
// @grant none
// ==/UserScript== 

function buttonClick(event)
{
    var data = document.querySelector('#OfferAccountSettingsForm #AffiliateId');
    var number = document.getElementById('inputNumber').value;

    for (var i = 1; i < data.length; i++)
    {
            if (data.options[i].value == number)
            {
                data.selectedIndex = i;
                break;
            } 
            if(i==data.length-1)
                alert('Brak Afilianta o podanym ID');
    }
    var temp=document.createElement('button');
    temp.setAttribute('style','display:none');
    document.getElementById('inputNumber').parentNode.appendChild(temp);
    temp.click();
}

var mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', 'mainDiv');
    mainDiv.setAttribute('class', 'select_med');
    mainDiv.setAttribute('style', 'margin-left:300px');
    var input = document.createElement('textarea');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'inputNumber');
input.setAttribute('style', 'height:14px;width:50px;resize:none;margin-top:3px');
    var button = document.createElement('a');
    //button.setAttribute('style', 'width:100px;height:50px;display:inline;position:absolute;margin-left:2em;margin-top:5em');
    button.addEventListener('click', buttonClick, false);
    button.innerHTML = 'Wybierz';
    
    mainDiv.appendChild(input);
    mainDiv.appendChild(button);

	$("#OfferAccountSettingsForm div ol li:nth-child(2)").append(mainDiv);