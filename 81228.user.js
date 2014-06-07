// ==UserScript==
// @name           Neopets : Scorchy Slots Page Adjuster
// @namespace      http://userscripts.org/users/59662
// @description    Adjusts Scorchy Slots page
// @include        http://www.neopets.com/games/slots.phtml*
// ==/UserScript==

setTimeout(function()
{

	var forms = document.getElementsByTagName("form");
	for(var i = 0; i < forms.length; i++)
    {
        if (forms[i].getAttribute('action') == "process_slots2.phtml")
        {
            try
            {
                var inputs = forms[i].getElementsByTagName("input");
                for (field = 0; field < inputs.length; field++)
                {
                    if (inputs[field].getAttribute("type") == "submit")
                    {
                        // Make the button larger
                        inputs[field].style.height = "100px";
                        inputs[field].style.width = "300px";
                        
                        // Move any text (Erupts!, Won, etc) to below the button
                        var centerTag = inputs[field].parentNode;
                        var previous = centerTag.previousSibling;   // P
                        var previous = previous.previousSibling;    // P
                        var previous = previous.previousSibling;    // CENTER
                        if (previous.tagName.toLowerCase() == "center")
                        {
                            var topLevel = centerTag.parentNode;
                            topLevel.removeChild(previous);
                            // Add a break so the text isn't up against the button
                            topLevel.appendChild(document.createElement("br"));
                            topLevel.appendChild(previous);
                        }
                        
                        break;
                    }
                }
            }
            catch (e) { }
            break;
        }
	}
},0);