// ==UserScript==
// @name           Voltage  Input
// @namespace      voltageinput
// @description    Voltage - Input
// @include        http://search.digikey.com/scripts/DkSearch/dksus.dll?*
// ==/UserScript==

PValue = "PV127";
contdiv = document.getElementById('content');
formdiv = document.createElement('div');
formdiv.title = 'myform';
formdiv.style.border = "1px solid black";
formdiv.style.background = "lightgray";
formdiv.style.MozBorderRadius = "15px";
formdiv.innerHTML =  '\ <br><INPUT type="text" VALUE="0" name="dim1" id="dim1">Disired Input V</INPUT><BR>\
 <INPUT type="button" VALUE="Select" label="anything"><BR> ';
//if(document.getElementsByName(PValue).length >0)
if(doesExist(PValue,contdiv.innerHTML))
{window.addEventListener('load', main(), true);}


function main(){
    alert('main running for '+PValue);
    var    Vopt = getOptions();

    alert('number of options '+Vopt.length);
    var Vatt= new Array(Vopt.length);

    alert(parseSingle(Vopt[2].innerHTML)[0]+"  "+parseSingle(Vopt[2].innerHTML)[1] + ' sizeof '+ parseSingle(Vopt[2].innerHTML).length);
    for (var i=0;i<Vatt.length;i++){  //debug set to i<Vatt.length 
        Vatt[i] = new Attributes();        // new constructor for each attribute instanc
    }
    processInfo(Vopt,Vatt);

    alert('this is' +Vatt[0].vmin);
    addForm(Vopt,Vatt,formdiv);
    alert('end');
}
    
function getOptions(){
    var boxOfInterest = document.getElementsByName(PValue);
    var theOptions = boxOfInterest[0].options;
    return theOptions;
}

function addForm(theOption,theAtt,formd){
    var mytable = contdiv.getElementsByTagName('table')[1];
    var mycol = mytable.getElementsByTagName('th')[4];
    mycol.appendChild(formd);
    formd.getElementsByTagName('INPUT')[1].addEventListener('click', function(){selectOptions(theOption,theAtt,formd)}, false);
}
//inputForm.getElementsByTagName('INPUT')[0].value
function selectOptions(opArray, opAtt, formd){
	var desiredv = parseFloat(formd.getElementsByTagName('INPUT')[0].value);
	for (var i=0;i<opAtt.length;i++){
		if(opAtt[i].vmin<=desiredv && opAtt[i].vmax>=desiredv){opArray[i].selected= true;}
	}
//voltageOptions[0].selected = true;
}

function processInfo(opArray,opAtt){
     
    for (var i=0;i<opAtt.length;i++){                    //for    (var i=0;i<opAtt.length;i++){
        if(doesExist('~', opArray[i].innerHTML) && !doesExist(',', opArray[i].innerHTML)){
		//alert('exist');
			var singlevalue = [];
			singlevalue = parseSingle(opArray[i].innerHTML);
			opAtt[i].vmin = singlevalue[0];
			opAtt[i].vmax = singlevalue[1];
			if(singlevalue.length > 2){
				opAtt[i].v2min = singlevalue[2];
				opAtt[i].v2max = singlevalue[3];
			}
			if(singlevalue[1] < singlevalue[0]){
				opAtt[i].vmin = singlevalue[1];
				opAtt[i].vmax = singlevalue[0];
			}
		}
		
		if(doesExist('own to', opArray[i].innerHTML)){
			var temp = opArray[i].innerHTML.split('to');
			opAtt[i].vmin = parseFloat(temp[1]);
			opAtt[i].vmax = 0;
		}
		
		if(doesExist('p to', opArray[i].innerHTML)){
			var temp = opArray[i].innerHTML.split('to');
			opAtt[i].vmin = 0;
			opAtt[i].vmax = parseFloat(temp[1]);
		}
		
    }
    //return opAtt;
}

//parseSingle  pass it the innerHTML of the Option element  will parse a single range and return either two or 4 values depending on whether plusminus is present
function parseSingle(input){
    if(doesExist('±', input)){
        
        var nopm =    input.replace('±','');
        var irsplit = nopm.split('~');
        var inputreturn = [parseFloat(irsplit[0]), parseFloat(irsplit[1]), 
                                     -parseFloat(irsplit[0]), -parseFloat(irsplit[1])];
        return (inputreturn);
    }
    else{
        var irsplit = input.split('~');
        var inputreturn = [parseFloat(irsplit[0]), parseFloat(irsplit[1])];
        return (inputreturn);
    }
    
}
// doesExist pass it any substring and the innerHTML of the element you are looking in.
function doesExist(astring, inelement){
    return (inelement.indexOf(astring) != -1);
}
function Attributes(){
    this.multirail
    this.vmin = null;
    this.vmax = null;
    this.v2min = null;
    this.v2max = null;
}



//requirements
// handle *, split on comma, then split, Down to, plusminus, dash, Adj down to, Adjustable, Multiple 