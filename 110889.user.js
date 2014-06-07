// ==UserScript==
// @id             txtonlyctn
// @name           Text-only Collection
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Allows you to show only the Valenth pets you need on the Collection page or reduce it to a text checklist.
// @version        1.0b
// @include        http://valenth.com/collection*
// @include        http://www.valenth.com/collection*
// ==/UserScript==


// Note to iryska: since you're trying to learn how to program, I put in a few comments to explain what each section does.

/* Variables in use throughout script; note that sometimes you can't use methods of regexes unless you store them in a variable */

console = unsafeWindow.console;
reggie = /\?view=checklist/;
regina = /\?view=need/;

GM_addStyle('ul.hideme { display: none; }');
GM_addStyle('ul.showme { display: block; }');
GM_addStyle('li.form { margin-left: 30px; }');
GM_addStyle('ul.checklist { margin-left: 20%; }');


/* Creation of links div at the top and bolding of the current 'page' (note that my script doesn't really create any 
new pages; I just do special stuff when the URL corresponds to one of the links I insert below) */

Links = document.createElement('center');

TakeOutGot = document.createElement('a');
TakeOutGot.href = '/collection.php?view=need';

Checklist = document.createElement('a');
Checklist.href = '/collection.php?view=checklist';

NormalView = document.createElement('a');
NormalView.href = '/collection.php';

if (regina.test(document.URL)) {
	TakeOutGot = document.createElement('strong');
}

else if (reggie.test(document.URL)) {
	Checklist = document.createElement('strong');
}

else {
	NormalView = document.createElement('strong');
}

TakeOutGot.innerHTML = 'Remaining sets';
Checklist.innerHTML = 'Remaining sets (text view)';
NormalView.innerHTML = 'All';

Links.appendChild(NormalView);
Links.appendChild(document.createTextNode(' | '));
Links.appendChild(TakeOutGot);
Links.appendChild(document.createTextNode(' | '));
Links.appendChild(Checklist);
Links.appendChild(document.createElement('br'));
Links.appendChild(document.createElement('br'));

Bannera = document.getElementById('content_section').childNodes[1].childNodes[4];
Bannera.parentNode.insertBefore(Links,Bannera.nextSibling.nextSibling);


/* Loop through all divs and images to find out which ones are in collection (making a list of them called 'Get');
also, count how many total adoptable forms there are (alphas included) */

divs = document.getElementsByTagName('div');
Get = new Array();
SpeciesNames = new Array();
//SpeciesID = 0; // <-- May use that in future versions somehow; not using right now
SpeciesName = '';
deleteus = new Array();
Haveit = false;
Seen = 0;
Caught = 0;

for (i in divs) {
	if (divs[i] != undefined && divs[i].className == 'inline' && divs[i].style.width == '350px') {
		//SpeciesID = divs[i].childNodes[1].childNodes[0].textContent.replace(/\. [A-Za-z0-9-]+/,'');
		SpeciesName = divs[i].childNodes[1].childNodes[0].textContent.replace(/[0-9]+\.\s/,'');
		
		SpeciesNames.push(SpeciesName);
		Get.push(new Array());
		
		for (j in divs[i].childNodes) {
			if (divs[i].childNodes[j].nodeName == 'IMG') {
				if (divs[i].childNodes[j].style.opacity == '0.2') {
					Haveit = false;
				}
					
				else {
					Haveit = true;
					Caught++;
				}
					
				Get[Get.length - 1].push(Haveit);
				Seen++;
			}
		}
		
		if (reggie.test(document.URL) || (regina.test(document.URL) && (Get[Get.length - 1][1] == true && Get[Get.length - 1][2] == true && Get[Get.length - 1][3] == true && Get[Get.length - 1][4] == true))) {
			divs[i].innerHTML = '';
			deleteus.push(divs[i]);
		}
	}
}


/* Even though the divs get emptied, you apparently can't actually remove them from the page in a 'for in' loop. Thus, 
I use a 'for' loop to actually remove them (don't feel bad if you don't understand that; I just learned it today!) */

if (reggie.test(document.URL) || regina.test(document.URL)) { 
	for (k in deleteus) {
		deleteus[k].parentNode.removeChild(deleteus[k]);
	}
}


/* Create that div under the menu links telling you how many adoptable forms you have */

SeenCaught = document.createElement('div');
SeenCaught.style.textAlign = 'center';
SeenCaught.innerHTML = '<em>Forms Known: '+Seen+'&nbsp;&nbsp;&nbsp;&nbsp;Forms on Hand: '+Caught+'</em><br /><br />';

if (!reggie.test(document.URL)) {
	SeenCaught.innerHTML += '<br />';
}

section = document.getElementById('content_section').childNodes[1];
section.insertBefore(SeenCaught,Links.nextSibling);


/* Start creating the list for checklist view - if not in checklist view, then don't! */

if (reggie.test(document.URL)) {
	UL = document.createElement('ul');
	UL.className = 'checklist';
	
	NewLi = '';
	NewUl = '';
	NewItem = '';
	Got = false;
	
	for (n in SpeciesNames) {
		if (Get[n][1] == true && Get[n][2] == true && Get[n][3] == true && Get[n][4] == true) {
			Got = true;
		}
		
		else {
			Got = false;
		}
		
		if (Got == false) {
			NewLi = document.createElement('li');
			NewLi.innerHTML = SpeciesNames[n];
			
			NewUl = document.createElement('ul');
			NewUl.className = 'hideme';
			
			if (Get[n][1] == false) {
				NewItem = document.createElement('li');
				NewItem.innerHTML = 'Beta';
				NewItem.className = 'form';
				NewUl.appendChild(NewItem);
			}
			
			if (Get[n][2] == false) {
				NewItem = document.createElement('li');
				NewItem.innerHTML = 'Vital';
				NewItem.className = 'form';
				NewUl.appendChild(NewItem);
			}
			
			if (Get[n][3] == false) {
				NewItem = document.createElement('li');
				NewItem.innerHTML = 'Natural';
				NewItem.className = 'form';
				NewUl.appendChild(NewItem);
			}
			
			if (Get[n][4] == false) {
				NewItem = document.createElement('li');
				NewItem.innerHTML = 'Tainted';
				NewItem.className = 'form';
				NewUl.appendChild(NewItem);
			}
			
			NewLi.appendChild(NewUl);
			NewLi.appendChild(document.createElement('br'));
			UL.appendChild(NewLi);
			NewLi.addEventListener('click',showForms,false);
		}
	}
	
	section.appendChild(UL);
	unsafeWindow.stop();
	
	/* ^ Due to an odd bug, the images would normally keep loading even though they AREN'T IN THE DOCUMENT TREE! This 
	stops the page so they won't do that. */
}


/* Function to show/hide sublists in checklist view */

function showForms() {
	if (this.childNodes[1].className == 'hideme') {
		this.childNodes[1].className = 'showme';
	}
	
	else {
		this.childNodes[1].className = 'hideme';
	}
}
