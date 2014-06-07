// ==UserScript==
// @name        Bee Happy - collecteur info ruche
// @namespace   beehappy_molo
// @description Bee Happy ++ Ajoute un bouton pour collecter les données de la ruche en cours.
// @include     http://bee-happy.fr/*
// @include     http://*.bee-happy.fr/*
// @version     1
// @grant       GM_log
// ==/UserScript==

console.log('début');

var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">Stats ruche</button>';
zNode.setAttribute ('id', 'myContainer');

var bloc_liens = document.getElementsByClassName('bloc_liens');
var mynode = bloc_liens[0];

// add	
mynode.appendChild(zNode, mynode);

// add code for the button
document.getElementById ("myButton").addEventListener ("click", doMonkey, false);


	/*
	var elmNewContent = document.createElement('a');
	elmNewContent.href = 'http://www.example.com/';
	elmNewContent.appendChild(document.createTextNode('click here'));
	
	var snapFoo = document.getElementsByClassName('bloc_liens');
	var mynode = snapFoo[0];
	
	mynode.appendChild(elmNewContent, mynode);
	*/

function doMonkey()
{
	//do something
	
    var but_data = ["cpollen", "cnectar", "cmiel", "pollen", "nectar", "eau", "resine"];	
    var snapFoo;
    var butinage = '';
    var data = '';
    var val;
    
    for(var i = 0; i < but_data.length; i++)
    {
        data = but_data[i];
        snapFoo = document.evaluate("//span[@data-bind='text: " + data + "']",
    		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		val = snapFoo.innerHTML;
        butinage =  butinage + val + "\t";

        console.log(data + ':' + val);

    }
    
    var couv_data = [ "ouvrieres_oeufs", "ouvrieres_larves", "ouvrieres_nymphes",
        "faux_bourdons_oeufs", "faux_bourdons_larves", "faux_bourdons_nymphes" ];
        
    for(var i = 0; i < couv_data.length; i++)
    {
        data = couv_data[i];
        var xpath = "//span[@data-bind='text: " + data + "']";
        
        snapFoo = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		val = snapFoo.innerHTML;
		
        butinage =  butinage + val + "\t";
    }
    
    
    var nb = 0;
    for(var i = 0; i <= 8; i++)
    {
        var xpath = "//span[@data-bind='text: nb_ouv_role_" + i + "']";
        console.log(xpath);
        
        snapFoo = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		val = snapFoo.innerHTML;
		
		// skip nourrisse royales et cirières
		if(i != 2 && i != 3)
		{
    		nb = nb + parseInt(val);
    	}
		
        console.log(data + ':' + snapFoo);
        
        if(i == 8)
        {
            butinage =  butinage + val + "\t";
        }
    }
    
    // nb ouv
    butinage =  butinage + nb + "\t";
    
    
    // FB
    var nb_fb = document.evaluate("//div[@class='to_toggle_col_fxb']/span[@data-bind='text: faux_bourdons']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;

    butinage =  butinage + nb_fb + "\t";
    
    
    window.alert(butinage);
}


