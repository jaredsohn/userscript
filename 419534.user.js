// ==UserScript==
// @name           AdminTool Lotto
// @author         Luke Diggins, zd3no
// @include        http://en*.the-west.net/*admin.php?*screen=character_tool*
// @version        0.3
// ==/UserScript==

function lotto_setDepositAmount(amount, category) {
    // Deduct amount
    var depositBox = document.getElementsByName('deposit')[0];
    var currentValue = depositBox.value * 1;
    depositBox.value = currentValue + (amount * 1000);
    // Increment counter
    var counter;
    var currentCount;
    var total = document.querySelector('.total');
    switch (amount*1000)
	{
        case(-15000):
            counter = document.querySelector('.a15kCount');
            currentCount=document.querySelector('.a15kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) + 1;
            break;
        case(15000):
            counter = document.querySelector('.a15kCount');
            currentCount=document.querySelector('.a15kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) - 1;
            break;
        case(-150000):
            counter = document.querySelector('.a15kCount');
            currentCount=document.querySelector('.a15kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) + 10;
            break;
        //case(150000/2):
        //    counter = document.querySelector('.a15kCount');
        //    currentCount=document.querySelector('.a15kCount').textContent * 1;
    	//	counter.textContent = (currentCount * 1) - 10;
       //   break;
        case(-10000):
            if(category == 0){
            counter = document.querySelector('.a10kCount');
            currentCount=document.querySelector('.a10kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) + 1;
            }
            else if(category ==1){
            counter = document.querySelector('.Single');
            currentCount=document.querySelector('.Single').textContent * 1;
    		counter.textContent = (currentCount * 1) + 1;
            }
            break;
		case(10000):
            counter = document.querySelector('.a10kCount');
            currentCount=document.querySelector('.a10kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) - 1;
            break;
        case(-100000):
            counter = document.querySelector('.a10kCount');
            currentCount=document.querySelector('.a10kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) + 10;
            break;
        //case(100000/2):
        //    counter = document.querySelector('.a10kCount');
        //    currentCount=document.querySelector('.a10kCount').textContent * 1;
    	//	counter.textContent = (currentCount * 1) - 10;
        //    break;
        case(-5000):
            counter = document.querySelector('.a5kCount');
            currentCount=document.querySelector('.a5kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) + 1;
            break;
		case(5000):
            counter = document.querySelector('.a5kCount');
            currentCount=document.querySelector('.a5kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) - 1;
            break;
        case(-50000):
            counter = document.querySelector('.a5kCount');
            currentCount=document.querySelector('.a5kCount').textContent * 1;
    		counter.textContent = (currentCount * 1) + 10;
            break;
        //case(50000/2):
        //    counter = document.querySelector('.a5kCount');
        //    currentCount=document.querySelector('.a5kCount').textContent * 1;
    	//	counter.textContent = (currentCount * 1) - 10;
        //    break;
	}//end switch
        
    //increment total
    var x = total.textContent * 1;
    total.textContent = x + amount*1000;
    
}

function copyToLocalStorage()
{
    //fetch Name
   var name = "";
   var world = "";
    for (i=0; i<document.getElementsByTagName("h2").length; i++)
    {
        if(document.getElementsByTagName("h2")[i].innerHTML.indexOf("Character:") > -1)
        {
            name = '"'+document.getElementsByTagName("h2")[i].innerHTML.slice(11,50)+'"';
            break;
        }//end if
    }//end for
    
    //fetch World
    var menu = document.getElementsByTagName("a");
    for (i=0; i<menu.length; i++)
    {
        if(menu[i].className == "current")
        {
            world = '"'+menu[i].innerHTML+'"'
            break;
        }//end if
    }//end for
        
    //create string with entries
    var singleCount = document.querySelector('.Single').textContent * 1;
    var eliteCount = document.querySelector('.a15kCount').textContent * 1;
    var proCount = document.querySelector('.a10kCount').textContent * 1;
    var generalCount = document.querySelector('.a5kCount').textContent * 1;
    var paste = "";
    if (eliteCount != 0)
    {
        for (i=0; i<eliteCount; i++)
        {
            paste = (paste +'"Elite" ' +name+" "+world+String.fromCharCode(13));
        }
    }
    if(proCount != 0)
    {
        for (j=0; j<proCount; j++)
        {
            paste = (paste + '"Pro" '+name+" "+world+String.fromCharCode(13));
        }
    }
    if(generalCount !=0 )
    {
        for (k=0; k<generalCount; k++)
        {
            paste = (paste + '"General" '+name+" "+world+String.fromCharCode(13));
        }
    }
    if(singleCount !=0)
    {
        for (l=0; l<singleCount; l++)
        {
            paste = (paste + '"Single" '+name+" "+world+String.fromCharCode(13));
        }
    }
    
     //save to local storage
    //var xa = "";
    //xa = localStorage.getItem("names_local_storage");
    //xa = xa + paste;
    //localStorage.setItem("names_local_storage", xa);
    //alert(xa);
    document.getElementById("myTextarea").innerHTML=paste;
    document.getElementById("myTextarea").select();
    
}//end function copyToLocalStorage()

//function results()
//{
//    document.write('<hr><h1>The local storage has now be reset. Save this data or it will be lost.</h1><hr>' + localStorage.getItem("names_local_storage"));
//    localStorage.setItem("names_local_storage", "");
//}

function lotto_initialiseUI(event) {
    if (document.getElementsByName('deposit').length == 1) {
        // Fetch elements and data
        var container = document.getElementsByName('deposit')[0].parentNode;
        document.getElementsByName('deposit')[0].style.backgroundColor = '#FFFFCC';
        // Create insert element
        var quicklinks = document.createElement('div');
        quicklinks.style.display = 'inline-block';
        quicklinks.style.marginBottom = '-7.3em';
        quicklinks.style.marginTop = '-2em';
        quicklinks.style.position = 'relative';
        quicklinks.style.top = '-1em';
        quicklinks = container.appendChild(quicklinks);
        var table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.textAlign = 'center';
        table = quicklinks.appendChild(table);
        // Add insert links
        var trow = table.appendChild(document.createElement('tr'));
        trow.insertAdjacentHTML('beforeend', '<td class="sng lottoEnter"><button type="button" style="background-color:#9a5389;font-size:11px;" onclick="javascript:lotto_setDepositAmount(-10,1);">Sng</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto15k lottoEnter"><button type="button" style="background-color:#FFCC00;font-size:11px;" onclick="javascript:lotto_setDepositAmount(-15,0);">Eli</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto10k lottoEnter"><button type="button" style="background-color:#99FF66;font-size:11px;" onclick="javascript:lotto_setDepositAmount(-10,0);">Pro</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto5k lottoEnter"><button type="button" style="background-color:#99CCFF;font-size:11px;" onclick="javascript:lotto_setDepositAmount(-5,0);">Gen</button></td>');
        trow = table.appendChild(document.createElement('tr'));
        trow.insertAdjacentHTML('beforeend', '<td class="lotto15k lottoEnter"><button type="button" style="background-color:#FFCC00;font-size:11px;" onclick="javascript:lotto_setDepositAmount(-150,0);">10Eli</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto10k lottoEnter"><button type="button" style="background-color:#99FF66;font-size:11px;" onclick="javascript:lotto_setDepositAmount(-100,0);">10Pro</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto5k lottoEnter"><button type="button" style="background-color:#99CCFF;font-size:11px;" onclick="javascript:lotto_setDepositAmount(-50,0);">10Gen</button></td>');
        trow = table.appendChild(document.createElement('tr'));
        trow.insertAdjacentHTML('beforeend', '<td class="lotto15k lottoEnter"><button type="button" style="background-color:#FF6C47;font-size:11px;" onclick="javascript:lotto_setDepositAmount(15,0);">-Eli</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto10k lottoEnter"><button type="button" style="background-color:#FF6C47;font-size:11px;" onclick="javascript:lotto_setDepositAmount(10,0);">-Pro</button></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="lotto5k lottoEnter"><button type="button" style="background-color:#FF6C47;font-size:11px;" onclick="javascript:lotto_setDepositAmount(5,0);">-Gen</button></td>');
        trow = table.appendChild(document.createElement('tr'));
        trow.insertAdjacentHTML('beforeend', '<td class="Single">0</td>');
        trow.insertAdjacentHTML('beforeend', '<td class="a15kCount">0</td>');
        trow.insertAdjacentHTML('beforeend', '<td class="a10kCount">0</td>');
        trow.insertAdjacentHTML('beforeend', '<td class="a5kCount">0</td>');
        trow = table.appendChild(document.createElement('tr'));
        trow.insertAdjacentHTML('beforeend', '<td><a href="javascript:copyToLocalStorage();">[COPY]</a></td>');
        trow.insertAdjacentHTML('beforeend', '<td class="total">0</td>');      
        //trow.insertAdjacentHTML('beforeend', '<td class="Results"><a href="javascript:results();">Write</a></td>'); 
        trow.insertAdjacentHTML('beforeend', '<td class="Results"><textarea id="myTextarea" cols="5"></textarea></td>');
        // Inject script
        var script = document.createElement('script');
        script.type = 'text/javascript';
        //script.appendChild(document.createTextNode("var paste = new String();"));
        script.appendChild(document.createTextNode(lotto_setDepositAmount));
        script.appendChild(document.createTextNode(copyToLocalStorage));
        //script.appendChild(document.createTextNode(results));
        document.head.appendChild(script);
        //inject modernizr script
        var script1 = document.createElement('script');
        script1.src='http://ajax.cdnjs.com/ajax/libs/modernizr/1.7/modernizr-1.7.min.js';
        document.head.appendChild(script1);
    }
}

if (document.readyState == 'complete' || document.readyState == 'loaded' || document.readyState == 'interactive' || !document.readyState)
    lotto_initialiseUI(null);
else
    document.addEventListener('DOMContentLoaded', lotto_initialiseUI, false);