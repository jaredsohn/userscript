// ==UserScript==
// @name           Size Dimension Selector
// @namespace      boxinator
// @description    Size Dimension Selector
// @include        http://search.digikey.com/scripts/DkSearch/dksus.dll?Cat=*
// ==/UserScript==

contdiv = document.getElementById('content');
sizeDimensionID = 'PV46';

if(document.getElementsByName(sizeDimensionID).length >0)
{window.addEventListener('load', size_dimension_selector(sizeDimensionID), true);}

function size_dimension_selector(myID){
/* Create new div for the custom input form.  This will be placed inline with main form on the page.*/
	
	var formdiv = document.createElement('div');
	formdiv.title = 'myform';
	formdiv.innerHTML =  '\ <INPUT type="text" VALUE="0" name="dim1" id="dim1">Side 1(inches)</INPUT><BR>\
	<INPUT type="text" name="hello" VALUE="0" id="dim2">Side 2(inches)</INPUT><BR>\
	<INPUT type="text" name="hello" VALUE="0" id="dim3">Side 3(inches)</INPUT><BR>\
	<INPUT type="button" VALUE="select with at least" label="anything"><BR> Will find anything with outer demensions bigger than input values regardless of H,L,W orientation. If only one or two dimensions are important leave others 0.';
	var tableHeaderArray = getHeaders(contdiv);
	var selectBoxArray = getSelectBoxes(contdiv);
	var itID = getItterationID(myID, selectBoxArray);

	/*  Grab the correct table that contains the headings and correct table header for the size/dimension category */		
	tableHeaderArray[itID].appendChild(formdiv);
	
	var DimensionOptions = selectBoxArray[itID].options;
	var Datt= new Array(DimensionOptions.length);
		formdiv.getElementsByTagName('INPUT')[itID].addEventListener('click', function(){selectAttributes(Datt,DimensionOptions,formdiv)}, false);
	var englishsplit  = null;
	for (var i=1;i<Datt.length;i++){  //debug set to i<Vatt.length 
		Datt[i] = new DimensionAttributes();		// new constructor for each attribute instance
		englishsplit = DimensionOptions[i].innerHTML.split('H');
		var dimsplit = englishsplit[0].split('x');
		Datt[i].ldim = parseFloat(dimsplit[0]);
		Datt[i].wdim = parseFloat(dimsplit[1]);
		Datt[i].hdim = parseFloat(dimsplit[2]);
	}
	
	
	function DimensionAttributes(){
	this.ldim = null;
	this.wdim = null;
	this.hdim = null;
	}
	function selectAttributes(attributes, dimoptions, inputForm){
	var dim1 = parseFloat(inputForm.getElementsByTagName('INPUT')[0].value);
	var dim2 = parseFloat(inputForm.getElementsByTagName('INPUT')[1].value);
	var dim3 = parseFloat(inputForm.getElementsByTagName('INPUT')[2].value);
	for(var j=1;j<attributes.length;j++){
		if(attributes[j].ldim >=dim1 && attributes[j].wdim >=dim2 && attributes[j].hdim >=dim3){dimoptions[j].selected = true;}
		if(attributes[j].ldim >=dim2 && attributes[j].wdim >=dim3 && attributes[j].hdim >=dim1){dimoptions[j].selected = true;}
		if(attributes[j].ldim >=dim3 && attributes[j].wdim >=dim1 && attributes[j].hdim >=dim2){dimoptions[j].selected = true;}
	}
}
	
}

function getHeaders(contentdiv){
	var attributesTable = contentdiv.getElementsByTagName('table')[1];    					// Returns the table that contains the attributes form
	var attributesTableBody = attributesTable.getElementsByTagName('tbody')[0];			// Returns the table body
	var attributesTableRows = attributesTableBody.getElementsByTagName('tr');			// Returns array of the two rows in the body that contain heading and select box 
	return attributesTableRows[0].getElementsByTagName('th');			// Returns array of headings elements
}

function getSelectBoxes(contentdiv){
	var attributesTable = contentdiv.getElementsByTagName('table')[1];    					// Returns the table that contains the attributes form
	var attributesTableBody = attributesTable.getElementsByTagName('tbody')[0];			// Returns the table body
	var attributesTableRows = attributesTableBody.getElementsByTagName('tr');			// Returns array of the two rows in the body that contain heading and select box 
	var SelectBoxElemArray = attributesTableRows[1].getElementsByTagName('select');	// Returns array select box elements
	return SelectBoxElemArray;
}

function getItterationID (somestring, inelementarray){
	for (var i=0; i<inelementarray.length; i++){
		if (somestring == inelementarray[i].name ){
			return i;
		}
	}
	return false;
}





// function DimensionAttributes(){
	// this.ldim = null;
	// this.wdim = null;
	// this.hdim = null;
// }
