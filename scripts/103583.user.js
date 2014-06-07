// ==UserScript==
// @name           Geocaching.com - Hint in a box v1.1
// @namespace      raverave.hintbox
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

var BGColor = "DCF1FC"
var BorderColor = "4FB7EE"
var BorderWidth = "1"

var HintText = document.getElementById("div_hint")
var HintKey = document.getElementById("dk")

buildHintBox()

function deleteHint() // Removes the originaly displayed hint elements
{
var HintATag = document.getElementById("ctl00_ContentBody_lnkDH")
var HintPTag = HintATag.parentNode


if ( HintPTag.hasChildNodes() )
{
    while ( HintPTag.childNodes.length >= 1 )
    {
        HintPTag.removeChild( HintPTag.firstChild );       
    } 
return(HintPTag)
}
}

function buildHintBox()
{
var HintText = document.getElementById("div_hint")
var HintKey = document.getElementById("dk")



HintText.parentNode.removeChild(HintText)
HintKey.parentNode.removeChild(HintKey)

var HintBox = document.createElement('fieldset');
var HintBoxClass = document.createAttribute("class")
var HintBoxStyle = document.createAttribute("style")
HintBoxClass.nodeValue = "NotesWidget"
HintBoxStyle.nodeValue = 'background-color: #' + BGColor +'; border: ' + BorderWidth + 'px solid #' + BorderColor + ';'
HintBox.setAttributeNode(HintBoxClass) 
HintBox.setAttributeNode(HintBoxStyle)
HintBox.innerHTML = '<legend id="MyHintBox" class="note"> Additional Hints <a id="ctl00_ContentBody_lnkDH" href="#" title="Decrypt" onclick="dht(this);return false;">Decrypt</a> </legend>'

var HintParent = deleteHint()
HintParent.appendChild(HintBox)
HintBox.appendChild(HintText)

var HintLegend = document.getElementById("MyHintBox")
HintLegend.setAttribute("style", 'background: url("../images/silk/help.png") no-repeat scroll 0 0 transparent;')

HintKey.setAttribute("class", "span-8 WrapFix")
HintBox.appendChild(HintKey)
}