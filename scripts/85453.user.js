// ==UserScript==
// @name			TibiaML VIP List
// @namespace		http://en.tibiaml.com
// @description		This script will implement an integrated VIP list in TibiaML similar to Tibia's but Online on your favorite fansite. You can look for anyone in any world, it isn't restricted to your own like in Tibia!
// @version			1.3
// @author			Jiwe a.k.a (Raydramon)
// @include			http://*.tibiaml.com/*
// @exclude			http://*.tibiaml.com/forum/*
//
// @history 1.3		Bugfix: Fixed Player Name search pattern in order not to match partially equal names.
// @history 1.2		Look & Feel: New colors and images as well as new font size to fit better.
// @history 1.2		Features: Add Friend Button, Delete Friend Button, Refresh Button.
// @history 1.1		Bugfix: Fixed VIP position so it doesn't stay above the menu anymore on lower resolutions.
// ==/UserScript==
//
// Browser Compatibility
// 		- Firefox
//
// ****************************************
// *    Thank You Beejay for the Idea!    *
// ****************************************
//
// Add: http://www.oobgolf.com/images/icons/16x16/w_add2.png
// Delete: http://www.palasathena.org/loja/images/btn_delete.png
//

// Checks if its the first time
if(GM_getValue('counter') == null)
{
	GM_setValue('counter', 1);
}


/*       Global Variables       \/ */


// Total Friends
var Total = GM_getValue('counter');

// VIP State
var State = 'hidden';
var AddState = 'hidden';
var DelState = 'hidden';

// Create DIVs
var Wrapper = document.createElement('DIV');
var VIP = document.createElement('DIV');
var Show = document.createElement('DIV');
var Add = document.createElement('IMG');
var Del = document.createElement('IMG');
var Refresh = document.createElement('IMG');
var WrapForm = new Array();
var Form = new Array();
var Click = new Array();
var Stack = new Array();


/*       Global CSS       \/ */


// Properties
VIP.style.width = '137px';
VIP.style.height = '25px';
VIP.style.background = 'white';
VIP.style.lineHeight = '2';
VIP.style.textAlign = 'center';
VIP.style.border = '1px solid #8FA9C3';
VIP.style.color = '#8FA9C3';
VIP.innerHTML = '<img src="http://admin.tibiaml.com/images/uploads/uynadw2w.gif" style="height: 23px; float: left; margin-left: 10px;"></img><strong style="width: 100px;">TibiaML VIP</strong>';
VIP.style.cursor = 'pointer';

Show.style.width = '137px';
Show.style.height = '184px';
Show.style.background = 'white';
Show.style.textAlign = 'center';
Show.style.border = '1px solid #8FA9C3';
Show.style.color = 'black';
Show.style.display = 'none';
Show.style.overflow = 'auto';

Add.style.cssFloat = 'left';
Add.style.display = 'none';
Add.src = 'http://www.oobgolf.com/images/icons/16x16/w_add2.png';

Del.style.cssFloat = 'left';
Del.style.display = 'none';
Del.src = 'http://www.palasathena.org/loja/images/btn_delete.png';

Refresh.style.cssFloat = 'left';
Refresh.style.display = 'none';
Refresh.src = 'http://www.gsmfans.com.br/IMGModificada/view-refresh.png';

WrapForm[0] = document.createElement('DIV');
Form[0] = document.createElement('DIV');
Click[0] = document.createElement('A');

WrapForm[0].style.display = 'none';
Form[0].innerHTML = 'Name: <input id="aname" type="text" style="width: 80px;"></input> <br/> World: <input id="aworld" type="text" style="width: 80px;"></input>';
Click[0].innerHTML = 'Add Friend';

WrapForm[0].style.marginTop = '5px';
WrapForm[0].style.textAlign = 'center';

WrapForm[1] = document.createElement('DIV');
Form[1] = document.createElement('DIV');
Click[1] = document.createElement('A');

WrapForm[1].style.display = 'none';
Form[1].innerHTML = 'Name: <input id="dname" type="text" style="width: 80px;"></input>';
Click[1].innerHTML = 'Delete Friend';

WrapForm[1].style.marginTop = '5px';
WrapForm[1].style.textAlign = 'center';

// Positioning
Wrapper.style.marginBottom = '5px';

VIP.style.marginLeft = '10px';

Show.style.marginLeft = '10px';
Show.style.marginBottom = '5px';

Add.style.marginLeft = '10px';
Add.style.marginTop = '5px';
Add.style.marginBottom = '5px';

Del.style.marginLeft = '10px';
Del.style.marginTop = '5px';
Del.style.marginBottom = '5px';

Refresh.style.marginLeft = '10px';
Refresh.style.marginTop = '5px';
Refresh.style.marginBottom = '5px';


/*       Global Events       \/ */


// Create Events
VIP.addEventListener('mouseover', function(event){
	VIP.style.color = 'black'; VIP.style.border = '1px solid black';}, false);
	
VIP.addEventListener('mouseout', function(event){
	VIP.style.color = '#8FA9C3'; VIP.style.border = '1px solid #8FA9C3';}, false);
	
VIP.addEventListener('click', function(event){
	if(State === 'hidden'){Show.style.display = 'block';
	Add.style.display = 'block';
	Del.style.display = 'block';
	Refresh.style.display ='block'; State = 'shown';}
	else{Show.style.display = 'none';
	Add.style.display = 'none';
	Del.style.display = 'none';
	Refresh.style.display ='none'; State = 'hidden';}
		
	AddState = 'hidden';
	DelState = 'hidden';
	
	WrapForm[0].style.display = 'none';
	WrapForm[1].style.display = 'none';}, false);

Add.addEventListener('mouseover', function(event){
	Add.style.cursor = 'pointer';}, false);

Add.addEventListener('click', function(event){
	if(AddState == 'hidden')
	{
		AddState = 'shown';
		WrapForm[0].style.display = 'block';
	}
	else
	{
		AddState = 'hidden';
		WrapForm[0].style.display = 'none';
	}}, false);
	
Del.addEventListener('mouseover', function(event){
	Del.style.cursor = 'pointer';}, false);
	
Del.addEventListener('click', function(event){
	if(DelState == 'hidden')
	{
		DelState = 'shown';
		WrapForm[1].style.display = 'block';
	}
	else
	{
		DelState = 'hidden';
		WrapForm[1].style.display = 'none';
	}}, false);

Refresh.addEventListener('mouseover', function(event){
	Refresh.style.cursor = 'pointer';}, false);

Refresh.addEventListener('click', function(event){
	Reload();}, false)
	
Click[0].addEventListener('mouseover', function(event){
	Click[0].style.cursor = 'pointer';}, false);
	
Click[0].addEventListener('click', function(event){
	Total = GM_getValue('counter');
	
	var PlayerName = document.getElementById('aname');
	var PlayerWorld = document.getElementById('aworld');
	
	if(PlayerName != '' && PlayerWorld != '')
	{
		alert("Friend Added!");

		GM_setValue('p' + Total, PlayerName.value);
		GM_setValue('w' + Total, PlayerWorld.value);
		GM_setValue('counter', parseInt(Total+1));
		
		PlayerName.value = '';
		PlayerWorld.value = '';
		
		Total = GM_getValue('counter');
		
		Reload();
	}
	
	else
	{
		alert("Fill in both fields!");
	}}, false);

Click[1].addEventListener('mouseover', function(event){
	Click[1].style.cursor = 'pointer';}, false);
Click[1].addEventListener('click', function(event){
	var PlayerName = document.getElementById('dname');
	
	if(PlayerName != '')
	{
		alert("Friend Deleted!");

		DeleteFriend(PlayerName.value);
		
		PlayerName.value = '';
	}
	
	else
	{
		alert("Fill in the field!");
	}}, false);
	
		
/*       Append Elements to the DOM       \/ */


// Add DIVs
WrapForm[0].appendChild(Click[0]);
WrapForm[0].appendChild(Form[0]);
WrapForm[1].appendChild(Click[1]);
WrapForm[1].appendChild(Form[1]);

Wrapper.appendChild(VIP);
Wrapper.appendChild(Add);
Wrapper.appendChild(Del);
Wrapper.appendChild(Refresh);
Wrapper.appendChild(Show);
Wrapper.appendChild(WrapForm[0]);
Wrapper.appendChild(WrapForm[1]);

document.getElementById('sidebar').insertBefore(Wrapper, document.getElementById('vs_lang'));


/*       Functions       \/ */


// Load Friends List
Load();

function Load()
{
	for(i=1; i<Total; i++)
	{
		if(GM_getValue('p' + i) != null)
		{
			Stack[i] = document.createElement('DIV');

			Stack[i].style.width = '140px';
			Stack[i].style.height = '22px';
			Stack[i].setAttribute('style', 'line-height: 22px');

			Stack[i].innerHTML = '<strong style="font-size: 11px;"><a onmouseover=this.style.textDecoration="underline" onmouseout=this.style.textDecoration="none" href=http://www.tibia.com/community/?subtopic=characters&name=' + GM_getValue('p' + i).replace(/\s/g, '+') + ' target="_blank" style="color: orange; text-decoration: none;">' + GM_getValue('p' + i) + '</a></strong>';
			
			Stack[i].setAttribute('onmouseover', 'this.style.background = "#DDDDDD";');
			Stack[i].setAttribute('onmouseout', 'this.style.background = "white";');

			Stack[i].title = 'World: ' + GM_getValue('w' + i);
			
			Show.appendChild(Stack[i]);
	
			LoadList(GM_getValue('p' + i), i, Stack[i]);
		}
	}
}

function Reload()
{
	while(Show.hasChildNodes())
	{
		Show.removeChild(Show.lastChild);
	}
	
	Load();
}

function LoadList(Player, n, Stack)
{
	GM_xmlhttpRequest
	({
		method: 'GET',
		url: 'http://www.tibia.com/community/?subtopic=whoisonline&world=' + GM_getValue('w' + n),
		onload: function(page)
		{
			var Exp = new RegExp('<A HREF="http://www.tibia.com/community/\\?subtopic=characters\\&name=' + GM_getValue("p" + n).replace(/\s/g, "\\+") + '">(.*?)</A>', 'gi');

			Name = Exp.exec(page.responseText);

			if(Name != null)
			{
				Stack.innerHTML = Stack.innerHTML + "|<b style='color: green; font-size: 11px;' title='Online'>ON</b>";
			}
			
			else
			{
				Stack.innerHTML = Stack.innerHTML + "|<b style='color: red; font-size: 11px;' title='Offline'>OFF</b>";
			}
		}
	});
}

// Delete Friend
function DeleteFriend(Name)
{
	var Pos = -1;
	
	Total = GM_getValue('counter');
	
	for(i=1; i<Total; i++)
	{
		if(GM_getValue('p' + i) == Name)
		{
			Pos = i;
		}
	}
	
	if(Pos >= 0)
	{
		for(i=Pos; i<Total; i++)
		{
			var NextPlayer = GM_getValue('p' + parseInt(i+1));
			var NextWorld = GM_getValue('w' + parseInt(i+1));
			
			if(NextPlayer != null)
			{
				GM_setValue('p' + i, NextPlayer);
				GM_setValue('w' + i, NextWorld);
			}
			
			else
			{
				GM_deleteValue('p' + i);
				GM_deleteValue('w' + i);
			}
		}
		
		GM_setValue('counter', parseInt(Total-1));
		
		Total = GM_getValue('counter');
		
		Reload();
	}
	
	else
	{
		return 'not found';
	}
}