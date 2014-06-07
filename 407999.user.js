// ==UserScript==
// @name            Native Windows Form Controls
// @author          Adam Stiskala
// @namespace       http://adam.stiskala.id.au/
// @description     Changes the default look and feel of the radio and checkbox form controls to the native Windows 8 style.
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         *
// @released        2014-03-08
// @updated         2014-03-08
// ==/UserScript==
 
(function()
{
    function updateStyles()
    {
        // Radio
        this.appendStylesheet('input[type="radio"]:before { background: #fff; border: 1px solid #707070; -webkit-border-radius: 11px; content: ""; display: block; height: 11px; position: relative; width: 11px; }');
        this.appendStylesheet('input[type="radio"]:after { content: ""; display: block; height: 11px; left: 1px; position: relative; top: -12px; width: 11px; }');
        this.appendStylesheet('input[type="radio"]:checked:after { background: #000; border: 1px solid #000; -webkit-border-radius: 5px; content: ""; width: 5px; height: 5px; margin: 2px; }');
        this.appendStylesheet('input[type="radio"]:disabled:before { border-color: #BABABA; background-color: #E5E5E5; }');
        this.appendStylesheet('input[type="radio"]:not(:disabled):hover:before { border-color: #26A0DA; }');
        this.appendStylesheet('input[type="radio"]:not(:disabled):active:before { border-color: #000; background-color: #000; }');
        
        // Checkbox
        this.appendStylesheet('input[type="checkbox"]:before { background: #fff; border: 1px solid #707070; content: ""; display: block; height: 11px; position: relative; width: 11px; }');
        this.appendStylesheet('input[type="checkbox"]:after { content: ""; display: block; height: 11px; left: 1px; position: relative; top: -12px; width: 11px; }');
        this.appendStylesheet('input[type="checkbox"]:checked:after { background-image:  url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAIAAAAmzuBxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAIVJREFUKFN1jzERBCEQBM8KFrCCFBygAAMIICcnJsYGHvjm556vq+I6Ympmh91rvjDG6L3zeE14740xpZRzotaKDa21Q4J+ay12jBG5Eiklhr7uQv3OOclrF/IlekutuRJ0aghCCOqnVTbce+ApBLtf/DfNOSux+8XjFlYhd4sfh2sfzPkBoKoeojCLW+4AAAAASUVORK5CYII=\'); }');
        this.appendStylesheet('input[type="checkbox"]:disabled:before { border-color: #BABABA; background-color: #E5E5E5; }');
        this.appendStylesheet('input[type="checkbox"]:not(:disabled):checked:hover:after { background-image:  url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAIAAAAmzuBxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAIVJREFUKFN1jzERBCEQBM8KFrCCFBygAAMIICcnJsYGHvjm556vq+I6Ympmh91rvjDG6L3zeE14740xpZRzotaKDa21Q4J+ay12jBG5Eiklhr7uQv3OOclrF/IlekutuRJ0aghCCOqnVTbce+ApBLtf/DfNOSux+8XjFlYhd4sfh2sfzPkBoKoeojCLW+4AAAAASUVORK5CYII=\'); }');
        this.appendStylesheet('input[type="checkbox"]:not(:disabled):hover:before { border-color: #26A0DA; }');
        this.appendStylesheet('input[type="checkbox"]:not(:disabled):active:before { border-color: #000; background-color: #000; }');
        this.appendStylesheet('input[type="checkbox"]:not(:disabled):checked:active:after { border-color: #000; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAIAAAAmzuBxAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTFH80I3AAAAeElEQVQoU42QwQ3AIAwD2YE1ePPmz58BsgATsAGjsAorMEstxUCF2qr3c+yYCPOGtdY5R/FIrXWMEWOkPgghwAbee47uoL/3DjvnzJGIYIli9rfWqFehPrnkPhOdugRKKdqPVtoLeBoCu/8gpaSJr2/AKchR/MWYC5GCSwShcbf/AAAAAElFTkSuQmCC\'); }');
        this.appendStylesheet('input[type="checkbox"]:not(:disabled):checked:active:before { border-color: #000; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAIAAAAmzuBxAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTFH80I3AAAAeElEQVQoU42QwQ3AIAwD2YE1ePPmz58BsgATsAGjsAorMEstxUCF2qr3c+yYCPOGtdY5R/FIrXWMEWOkPgghwAbee47uoL/3DjvnzJGIYIli9rfWqFehPrnkPhOdugRKKdqPVtoLeBoCu/8gpaSJr2/AKchR/MWYC5GCSwShcbf/AAAAAElFTkSuQmCC\'); }');
    };
 
    updateStyles.prototype.appendStylesheet = function(css)
    {
        var styletag = document.createElement("style");
        styletag.setAttribute('type', 'text/css');
        styletag.setAttribute('media', 'screen');
        styletag.appendChild(document.createTextNode(css));
 
        document.getElementsByTagName('head')[0].appendChild(styletag);
    };

    var updateStyles = new updateStyles();

})();