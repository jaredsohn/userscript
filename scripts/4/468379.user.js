// ==UserScript==
// @name Select an affiliate by ID
// @description Select an affiliate
// @include http://system.netsales.pl/admin/offers/*
// @grant none
// ==/UserScript== 

function buttonClick(event)
{
    var data = document.querySelector('#generate-tracking-panel #affiliate_selector');
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
		
	$("#affiliate_selector").change();
}

var mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', 'mainDiv');
    //mainDiv.setAttribute('class', 'select_med');
    mainDiv.setAttribute('style', 'display:block;position:absolute;margin-left:482px');
    var input = document.createElement('textarea');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'inputNumber');
input.setAttribute('style', 'height:14px;width:50px;resize:none');
    var button = document.createElement('a');
    button.addEventListener('click', buttonClick, false);
    button.innerHTML = 'Wybierz';
    
    mainDiv.appendChild(input);
    mainDiv.appendChild(button);
	$('[id=generate-tracking-panel].body>ol>li')[0].appendChild(mainDiv);