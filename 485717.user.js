// ==UserScript==
// @name Adjust Stats
// @description Select an affiliate and offer by ID
// @include http://system.netsales.pl/admin/leads
// @grant none
// ==/UserScript== 

function buttonClick(event)
{
    var data = document.querySelector('#AdjustmentOfferId');
    var number = document.getElementById('inputNumber').value;

    for (var i = 1; i < data.length; i++)
    {
            if (data.options[i].value == number)
            {
                data.selectedIndex = i;
                break;
            } 
            if(i==data.length-1)
                alert('Brak Kampanii o podanym ID');
    }
}

	var mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', 'mainDiv');
    mainDiv.setAttribute('style', 'display:block;position:absolute;margin-left:660px');
    var input = document.createElement('textarea');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'inputNumber');
	input.setAttribute('style', 'height:14px;width:50px;resize:none');
    var button = document.createElement('a');
    button.addEventListener('click', buttonClick, false);
    button.innerHTML = 'Wybierz';
    
    mainDiv.appendChild(input);
    mainDiv.appendChild(button);
	$('[id=LeadIndexForm]>div.form>ol>li:nth-child(3)').append(mainDiv);
	
	
	function buttonClick1(event)
	{
		var data = document.querySelector('#AdjustmentAffiliateId');
		var number = document.getElementById('inputNumber1').value;

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
	}
	
	var mainDiv1 = document.createElement('div');
    mainDiv1.setAttribute('id', 'mainDiv1');
    mainDiv1.setAttribute('style', 'display:block;position:absolute;margin-left:800px');
    var input1 = document.createElement('textarea');
    input1.setAttribute('type', 'number');
    input1.setAttribute('id', 'inputNumber1');
	input1.setAttribute('style', 'height:14px;width:50px;resize:none');
    var button1 = document.createElement('a');
    button1.addEventListener('click', buttonClick1, false);
    button1.innerHTML = 'Wybierz';
    
    mainDiv1.appendChild(input1);
    mainDiv1.appendChild(button1);
	$('[id=LeadIndexForm]>div.form>ol>li:nth-child(5)').append(mainDiv1);