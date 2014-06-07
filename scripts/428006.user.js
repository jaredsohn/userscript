// ==UserScript==
// @name Zaznaczanie wielu wydawców
// @description Zaznacza wielu wydawców
// @include http://system.netsales.pl/admin/offers/*
// @grant none
// ==/UserScript== 
function buttonClick()
{
    var data = document.querySelector('#OfferAccessApproveForm #AffiliateId');
	var data2 = document.querySelector('#OfferAccessUnapproveForm #AffiliateId');
    var numbers = document.getElementById('inputNumbers') .value.split(/[ ,\n]+/);
    var info = document.getElementById('error');
	info.innerHTML="";
	var info2=document.getElementById('error2');
	var info3=document.getElementById('selected_info');
	info2.innerHTML="";
	info3.innerHTML="";
    info.style.display = 'block';
	//info2.style.display = 'block';
    //var lastInfo = info.innerHTML;
    for (var i = 0; i < data.length; i++)
    data.options[i].selected = false;
    for (var i = 0; i < numbers.length; i++)
    {
		var alreadyExist=false;
		for(var a=0;a<data2.length;a++)
		{
			if(data2.options[a].value==numbers[i])
			{
				info2.innerHTML+="Element: "+numbers[i]+" jest już na liście<br>";
				alreadyExist=true;
			}
		}
        for (var j = 0; j < data.length && !alreadyExist; j++)
        {
			
            if (data.options[j].value == numbers[i])
            {
                data.options[j].selected = true;
				info3.innerHTML+="Zaznaczono element: "+numbers[i] + '<br>';
                break;
            }
			
            if (j == data.length - 1 && numbers[i] != '')
            info.innerHTML += 'Brak elementu: '+numbers[i] + '<br>';
        }
    }
	/*if(info.innerHTML!="")
		info.setAttribute('margin-left','40px');
	else
		info.setAttribute('margin-left','none');*/
    // (info.innerHTML == lastInfo)
    //info.style.display = 'none';
}
if (document.getElementById('mainContainer') == null)
{
    
    var mainDiv=document.createElement('div');
    mainDiv.setAttribute('id','mainContainer');
    mainDiv.setAttribute('style', 'clear:both;overflow:auto;display:block');
    var input = document.createElement('textarea');
    input.setAttribute('type', 'number');
    input.setAttribute('id', 'inputNumbers');
       input.setAttribute("class","liquid-wrap-i");
    input.setAttribute('style', 'margin-left:0px;resize:none;float:right;margin-right:19px;width:120px;height:150px;');
    var button = document.createElement('a');
    button.setAttribute('style', 'width:100px;height:50px;float:right;background-color:white;margin-right:28px;margin-top:65px');
    button.addEventListener('click', buttonClick, false);
    button.innerHTML = 'Zaznacz';
	var p=document.createElement('p');
	p.setAttribute('style','clear:both;float:right;margin-right:55px;width:220px');
    var info = document.createElement('h5');
	info.setAttribute('style', 'color:red');
    info.setAttribute('id', 'error');
	var info2=document.createElement('h5');
    info2.setAttribute('style', 'color:orange');
    info2.setAttribute('id', 'error2');
	var info3=document.createElement('h5');
    info3.setAttribute('style', 'color:green');
    info3.setAttribute('id', 'selected_info');
	p.appendChild(info3);
	p.appendChild(info2);
	p.appendChild(info);
    mainDiv.appendChild(button);
    mainDiv.appendChild(input);
    
    mainDiv.appendChild(p);

    //$("#content-col div.grid_6 div:nth-child(3) .body") .append(mainDiv);
    document.getElementById('OfferAccessApproveLink') .parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(mainDiv);
}
