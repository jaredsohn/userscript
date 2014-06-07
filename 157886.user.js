// ==UserScript==
// @name       Nokia Publishing Items For NEW
// @namespace  http://www.inodesoft.com
// @version    1.1
// @description  Agregar Items a Publish Nokia
// @match      https://publish.nokia.com/download_items/show/*#distribution
// @copyright  Leo Sanchez, Jaime Enriquez, Inode Entertainment 2013
// ==/UserScript==

function isNullElement(val){
    return (val==null || val===false);
}
var numberItems = 20;
setTimeout(function(){
    var someTest = document.getElementById("compatibility_proposal_template_loading");
    if (!isNullElement(someTest)) {
    
        try
        {
        //Run some code here
        var template = document.getElementById("template_id");
        for (var i=template.options.length; i <= numberItems; i++) {
            template.options[template.options.length] = new Option("No Elegir" + i, "\"" + i + "\"");
        }
        template[1].value = 617466;
        template[1].text = "BT Normal";
        template[2].value = 617479;
        template[2].text = "CUI Normal";
        template[3].value = 617499;
        template[3].text = "FT Normal";
        template[4].value = 617502;
        template[4].text = "SUI Normal";
        template[5].value = 617504;
        template[5].text = "TNT Normal";
        template[6].value = 617505;
        template[6].text = "WT Normal";
	template[7].value = 617092;
	template[7].text = "---------------";
        template[8].value = 617465;
        template[8].text = "BT Navi y Sexy";
        template[9].value = 617478;
        template[9].text = "CUI Navi y Sexy";
        template[10].value = 617484;
        template[10].text = "FT Navi y Sexy";
        template[11].value = 617487;
        template[11].text = "SUI Navi y Sexy";
        template[12].value = 617490;
        template[12].text = "TNT Navi y Sexy";
        template[13].value = 617493;
        template[13].text = "WT Navi y Sexy";
	template[14].value = 617092;
	template[14].text = "---------------";
        template[15].value = 617092;
        template[15].text = "BT Religioso";
        template[16].value = 617097;
        template[16].text = "CUI Religioso";
        template[17].value = 617098;
        template[17].text = "FT Religioso";
        template[18].value = 617102;
        template[18].text = "SUI Religioso";
        template[19].value = 617105;
        template[19].text = "TNT Religioso";
        template[20].value = 617109;
        template[20].text = "WT Religioso";
        window.alert("  !!!MAGIC!!!  " + template[1].value);
    }
    catch(err)
    {
        window.alert("Error happened");
    } 
    }
        
},5000);