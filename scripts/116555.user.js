// MMHK-Forums
//
// This is a GreaseMonkey user file.
// It can only be used in the GreaseMonkey extension for Firefox.
// See http://greasemonkey.mozdev.org/ and http://mozilla.org
//
// This script is in public domain.
// Author: Gnous, based on script of Sebastien SAUVAGE, webmaster of http://sebsauvage/net
//
// ==UserScript==
// @name          MMHK-Forums
// @description	Modifie les pages du forum MMHK (FR)
// @include       http://forums-mightandmagicheroeskingdoms.ubi.com/fr/*
// @version       1.3
// ==/UserScript==


(function () {
    // Removes all occurences of elements whose XPath is provided from the document.
    //
    // Example: Remove all tables which use the CSS class 'toto':
    //          removeElement("//table[@class='toto']");
    function removeElement(ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
        {
            element = alltags.snapshotItem(i);
            element.parentNode.removeChild(element);  // Remove this element from its parent.
        }
    }  
    
    // Removes an attribute from all occurences of elements whose XPath is provided.
    // (All occurences of this elements are processed.)
    //
    // Example: Remove the bgcolor of all <table>:
    //          removeAttributeOfElement('bgcolor',"//table[@bgcolor]")
    //          Remove the fixed with of all tables or cells::
    //          removeAttributeOfElement('width',"//table[@width]|//td[@width]")
    function removeAttributeOfElement(attributeName,ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
            alltags.snapshotItem(i).removeAttribute(attributeName);    
    }
    
    // Set an attribute from all occurences of elements to a specified value.
    // The previous value of this attribute is discarded.
    // (All occurences of this elements are processed.)
    //
    // Example: Set with to 80 columns on all texteareas:
    //          setAttributeOfElement('cols',80,"//textarea")
    function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
            alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
    }    
      
    // Inject your own CSS in the page.
    // Example: Do not underline link:
    //          injectCSS("a{text-decoration: none;}")
    function injectCSS(cssdata)
    {
        head = document.getElementsByTagName("head")[0];
        style = document.createElement("style");
        style.setAttribute("type", 'text/css');
        style.innerHTML = cssdata;
        head.appendChild(style);
    }
      
    try
    {
        // Agrandissement de la zone de saisie du message
//        setAttributeOfElement('rows','40',"//textarea[@name='message']");
//        setAttributeOfElement('cols','120',"//textarea[@name='message']");
        
        // Dans la liste des discussion, on met en gras les discussion qui n'ont re�u aucune r�ponse.
//        setAttributeOfElement('style','font-weight:normal;',"//a[text()='Challenges']/a");    
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-heritage-du-dragon/index.php?991']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-terres-ravagees/index.php?1031']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-assemblee-des-zombies/index.php?1071']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-grondement-du-griffon/index.php?1111']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-chiens-de-l-apocalypse/index.php?1161']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-rage-du-rakshasa/index.php?1201']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-peste-fantome/index.php?1241']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-chute-de-l-ange/index.php?1321']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-soulevement-des-gremlins/index.php?1361']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-inquisition-des-diablotins/index.php?1401']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-alliance-des-anges/index.php?1482']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-regne-de-la-faucheuse/index.php?1442']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-lamentation-des-djinns/index.php?1532']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-demons-de-la-fosse/index.php?1281']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/une-legion-d-archiliches/index.php?1572']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-promesse-des-archidiables/index.php?1811']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-silence-de-la-succube/index.php?1621']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-clameur-des-inquisiteurs/index.php?1711']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-impact-des-golems/index.php?1671']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-promesse-des-archidiables/index.php?1811']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-archers-rassembles/index.php?1851']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-souffrance-des-mages/index.php?1891']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-spectre-oublie/index.php?1931']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-demon-enflamme/index.php?1971']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-charge-du-paladin/index.php?2091']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/empreinte-du-titan-1/index.php?2011']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/empreinte-du-titan-2/index.php?2051']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/empreinte-du-titan-3/index.php?2191']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-gargouille-grimacante/index.php?2151']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-murmure-des-squelettes/index.php?2241']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-05-aout-apres-midi/index.php?2301']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-18-aout-1/index.php?2501']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-18-aout-2/index.php?2551']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-galop-des-destriers/index.php?2661']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-25-aout-1/index.php?2711']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-25-aout-2/index.php?2761']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-01-septembre-1/index.php?2811']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-01-septembre-2/index.php?2861']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-04-septembre-1/index.php?2911']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/challenge-04-septembre-2/index.php?2961']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/heritage-du-dragon-2/index.php?3061']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-oasis-du-fantassin/index.php?3011']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/terres-ravagees-2/index.php?3111']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-defense-du-champion/index.php?3161']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-assemblee-des-zombies-2/index.php?3211']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-croissance-des-treants/index.php?3261']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-grondement-du-griffon-2/index.php?3311']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-rage-du-rakshasa-2/index.php?3411']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-peste-fantome-2/index.php?3461']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-chute-de-l-ange-2/index.php?3552']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-chant-des-dryades-2/index.php?3511']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-soulevement-des-gremlins-2/index.php?3602']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-invasion-de-titan-1/index.php?3652']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-invasion-de-titan-2/index.php?3702']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-inquisition-des-diablotins-2/index.php?3752']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-forteresses-du-titan/index.php?3852']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-alliance-des-anges-2/index.php?3901']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/aux-licornes-fringantes-2/index.php?3981']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/le-regne-de-la-faucheuse-2/index.php?4031']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/la-trace-du-chasseur-2/index.php?4131']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-vestiges-du-titan-pvp-/index.php?4081']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-crevasses-du-titan-coop-/index.php?4172']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-election-du-roi-nain-1/index.php?4272']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-election-du-roi-nain-2/index.php?4322']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-election-du-roi-nain-3/index.php?4371']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-election-du-roi-nain-4/index.php?4421']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-election-du-roi-nain-5/index.php?4471']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-election-du-roi-nain-6/index.php?4531']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-election-du-roi-nain-8/index.php?4581']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-eveil-d-arkath-1/index.php?4631']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-eveil-d-arkath-2/index.php?4681']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-eveil-d-arkath-3/index.php?4731']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-eveil-d-arkath-4/index.php?4781']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/l-eveil-d-arkath-5/index.php?4831']/../.."); 
        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/les-vestiges-du-titan-pvp-/index.php?4222']/../.."); 
        removeElement("//a[@href='']/../.."); 
        removeElement("//a[@href='']/../.."); 
        removeElement("//a[@href='']/../.."); 



        removeElement("//a[@href='http://forums-mightandmagicheroeskingdoms.ubi.com/fr/list.php?2291']/../.."); 
    }
        
    catch (e)
    {
        alert("UserScript exception:\n" + e);
    }

})();

