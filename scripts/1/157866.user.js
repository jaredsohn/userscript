// ==UserScript==
// @name       Nokia Publishing Items For OLD
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
        template[1].value = 616979;
        template[1].text = "BT Normal";
        template[2].value = 616989;
        template[2].text = "CUI Normal";
        template[3].value = 616991;
        template[3].text = "FT Normal";
        template[4].value = 616993;
        template[4].text = "SUI Normal";
        template[5].value = 616998;
        template[5].text = "TNT Normal";
        template[6].value = 617002;
        template[6].text = "WT Normal";
        template[7].value = 617002;
        template[7].text = "--------------------";    
        template[8].value = 617080;
        template[8].text = "BT Navi y Sexy";
        template[9].value = 617084;
        template[9].text = "CUI Navi y Sexy";
        template[10].value = 617087;
        template[10].text = "FT Navi y Sexy";
        template[11].value = 617089;
        template[11].text = "SUI Navi y Sexy";
        template[12].value = 617094;
        template[12].text = "TNT Navi y Sexy";
        template[13].value = 617100;
        template[13].text = "WT Navi y Sexy";
        template[14].value = 617002;
        template[14].text = "--------------------"; 
        template[15].value = 617115;
        template[15].text = "BT Religioso";
        template[16].value = 617116;
        template[16].text = "CUI Religioso";
        template[17].value = 617119;
        template[17].text = "FT Religioso";
        template[18].value = 617120;
        template[18].text = "SUI Religioso";
        template[19].value = 617122;
        template[19].text = "TNT Religioso";
        template[20].value = 617124;
        template[20].text = "WT Religioso";
        window.alert("  !!!MAGIC!!!  " + template[1].value);
    }
    catch(err)
    {
        window.alert("Error happened");
    } 
    }
        
},5000);