// ==UserScript==
// @name           Kraland Wysiwyg V6
// @namespace      ki
// @description    Ajoute une zone de prévisualisation dynamique à l'éditeur de kramail, au forum et aux déclarations in game et reformate un texte quoté.
// @version   1.0.2
// @include        http://www.kraland.org/*
// @grant       none
// ==/UserScript==

/*
***********************************************************************************************
                 Les options du scripts se règlent à la suite de cette ligne : */

var OPTION_FREQUENCE_PREVISUALISATION = 1;
// L'option fréquence permet de changer la fréquence selon laquelle la zone de prévisualisation est mise-à-jour.
//  1 indique qu'elle sera mise à jour à chaque caractère modifié.
//  0 indique que la zone sera mise-à-jour lors d'un déplacement de la souris.
//  Préférez 0 si vous rencontrez des problèmes de lenteurs.

var OPTION_REFORMATER_TEXTE = 1;
// L'option reformatage permet de reformater les textes des réponses dans les kramails ou les messages du forum
// 1 reformate le message
// 0 désactive cette option

var smiley = 1;
// L'option smiley permet d'ajouter directement dans les fenêtres d'ordre la liste des smileys
// 1 ajoute les smileys
// 0 désactive cette option

/* Fin des options
*********************************************************************************************** */


    var b_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHT4ACgoOEhYQEAACIiomLjgACiZKTlJICi5WZkJqcl5MDoKGVkZKiAKaWmKiZpImro6qgp6+tswOuspOeuLe2lLWmtJi2ob2WnJq7yLrLlYEAOw==";
    var i_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHXIACgoOEhYQEAACIiomLjgACiZKTlJICi5WZkJUYA54DGJSXlTEDMKGinDADMZmjk6WnrpQYq62umABAA0SolZGSGDsDO5qQmJ09vr+JnZ+gmq/GqdO/udWb2JOBADs=";
    var u_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHVYACgoOEhYQEAACIiomLjgACiZKTlJICi5IDmpqVkZOciaCWmACilZCVmisrp5eVK5udp4mwA5SumbahupaUoqaQpKWbvL2zs7i7xMWox63Czs3Rk4EAOw==";
    var s_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHXoACgoOEhYQEAACIiomLjgACiZKTlJICi5WZkJMYA54DGJmXiZ01iTqglZGkA6aaiaOsQkGhogCdn7metbCYkhg9qZSrtwNFp8KTsaXIvJacuc6Wvq/P1arU18TXkoEAOw==";
    var left_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHR4ACgoOEhYQEAACIiomLjgACiZKTlJICiAOZmpubkJWfk5cAnJyUkaCgoqSrA56on6qsraGvsJiynae1obesprumi8CuwwCBADs=";
    var center_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHSYACgoOEhYQEAACIiomLjgACiZKTlJICBAOZmpubiZGVoJaLnJyTn6Ggl6SrA56ooZeJrJmmr6mYs52QtpWxALm1vKaLwrvFiYEAOw==";
    var right_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHSYACgoOEhYQEAACIiomLjgACiZKTlJICBAOZmpubiZGVoJaLiZycnqGol6WrA6eooJeTrJmur5Sqs52QtpWxkrm1vJ6jwp/CiYEAOw==";
    var quote_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHaYACgoOEhYQEA4mKi4wWAgADhpIDFwKIhJGDigKUj5kCF6GTlZcCPIongpsDKZ6qqSCfmg2WkauJnLiUAJCShp29jMKcLa6+mMWXwoyclb3HmqS2y6vOssediNTCxQAEKeCh4g2h4C0tgQA7";
    var img_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHjoACgoOEhYQEAACIiomLjgACAAOTlJWWkAQDFZucmxYAOQAWA5CSnZ0sJgM/kpiap5smLCwDo6WvsAMsRjQAvQKZsJupJj+2kbinoKKtyJ6jr5+bOaTOFRYmFxc0FQMmm82ZnwPa5AMgIAMCx63Z2u/n6QAmt+QX9vjok7fv9+Xl+lxZGkipVKKDCBMmCgQAOw==";
    var url_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHYYACgoOEhYQEAACIiomLjgACiZKTlJICi5WZkJqcl5yZkQADo6OJpKWJlwMbAqwbo62xA6mrAqe3tbO2tiurG7+/A72vkLm4pKy6BLWusK62iJHLp6bUqZ+g2JWe2pbdk4EAOw==";
    var mail_str = "data:image/gif;base64,R0lGODlhEgARAMZHAP/6zJmZmf//+wAAAP//0gAAe3t7AFV3vCGcWlpaWtUAAPd0AF5DLXt7ewB7e3sAAO1hYfSsAHsAewBvACsr5Pn7gf/r64R7hO7MmfX7+Sgzls7OzmOcpYm44ns/Ozyc5r29vYTW3jdU0sa9vUIAAAALTAgAAL29xtb//4R7e87//5SUlISEQnuEe///AJQAAFJKUpx7e7UYIcnS6gAIAFJCQmNKSv/exicpTe/vkHNaWm9gYMa9xjk5OaUICIyEQq2EhJB7ezExMa0xMUJCQlJCSmRlSP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEgARAAAHoIACgoOEhYQAiIkfHYwEiYkCjwCMHR8aHZIAkQAaACIfM4sdA5kCHh4aGh+WIqgeraekAhqzIiIaBLm6NxkZsh4ZGp8aFrq5Qz6+msAlzSUDAsY+HgS/vde9xjc31Zq00cbY17+CxgQZOMIaJd2mGea6GjMdOMru8LmXHbi/A/7+z0qo2vdMFgBHiHB0mHFpFYASkCSlstVBRKlMqxxmCgQAOw==";


var Previews = new Array();
var n_prevs = 0;

/****************************************
*		SECURED FUNCTIONS				*
*****************************************/

// Returns 0 or 1 whether the input is checked or not
// @param area the current textArea
function isItalic(textArea)
{
	var italic = 0;
	try
	{
	//      area p          td         div           input
	textArea.parentNode.parentNode.childNodes[3].childNodes[0].checked == true ? 1 : 0;
	}
	// NULLPOINTER
	catch(err)
	{
	}
	return italic;
}

// Returns true if we are in the popup window
function isPopupFrame()
{
	return document.title == "Kraland - Passer un Ordre";
}

// Returns true if we are in the kramail window or in the forum post window
function isMainFrame()
{
	var forms = document.getElementsByTagName('form');
	for (var i=0; i<forms.length; i++)
	{
		if (forms[i].name == "post_msg") return 1;
	}
	return 0;
}

// Returns true if we are in the help popup's previsualisation
function isPrevisualisationWindow()
{
	if( document.title != "Kraland Interactif - Aide" ) return false;
    return (document.getElementsByTagName('textarea')[0].name == "message");
}

// Callback function
// @param evt a click event
function mouseUp(evt)
{
	setTimeout(key_up, 50, evt);
}

// Sets the width and height of every textarea in the popup window to 100% and 400px.
function extendTextArea()
{
	var areas = document.getElementsByTagName("textarea");
	for (var i=0; i<areas.length; i++)
	{
		areas[i].style.width = "450px";
		areas[i].style.height = "400px";
	}
}

// Called when the smiley is clicked and display the next set of smileys
// @param areaId the current textArea's id
function displaySmileysArea(areaId)
{
	tab1 = document.getElementById(areaId+"smile0");
	tab2 = document.getElementById(areaId+"smile1");
	tab3 = document.getElementById(areaId+"smile2");
	tab4 = document.getElementById(areaId+"smile3");
	tab5 = document.getElementById(areaId+"smile4");

	if (tab1.style.display == "block")
	{
		tab1.style.display = "none";
		tab2.style.display = "block";
		tab2.style.height = "30px";
	}
	else if (tab2.style.display == "block")
	{
		tab2.style.display = "none";
		tab3.style.display = "block";
		tab3.style.height = "30px";
	}
	else if (tab3.style.display == "block")
	{
		tab3.style.display = "none";
		tab4.style.display = "block";
		tab4.style.height = "30px";
	}
	else if (tab4.style.display == "block")
	{
		tab4.style.display = "none";
		tab5.style.display = "block";
		tab5.style.height = "30px";
	}
	else if (tab5.style.display == "block")
	{
		tab5.style.display = "none";
		tab1.style.height = "30px";
	}
	else tab1.style.display = "block";
}

// Returns a smiley's string
// @param index the smiley's position in the array
function getSmiley(index)
{
    var tab = [':)', ';)', '8)', ':]', ':D', ':p', ':6', '3)', ':,', ':(', ':[', ')[', '!(', '^]', 'x(', '8(', 'o)', '%(', ':o', ':|', ')|', ';(', ';[', ':f', ';o', ';|', '[(', '0)', ':B', ':=', '8]', '|)', 'O)', '8î', '8Î', 'j)', 'p)', '^)', ')f', ':î', ':Î', '%)', '8O', 'OX', ')%', 'oX', ':.', 'o(', 'hp', ':n', ':P', ':x', '8p', 'j|', 'kD', 'k]', ';p', ':l', ':+', ':-', 'VV', '%%', 'Q)', 'fr', 'en', 'de', 'es', 'it', 'nl', 'ca', 'sw', 'jp', '*t', '*j', '*o', '*r', '*v', '*c', '*b', '*m', '*n', '=o', '=n', '=S', 'ty', 'mt', 'so', 'iz', 'jo', 'tk', 'pk', 'ka', 'ke', '3i', '+)', 'st', '§c', '§o', '§g', 'co', '§p', '=)', '=!', '=k', '=y' ];
    return tab[index];
}

// Creates a html table with 21 smileys in it on the top of a textarea
// @param tableNum the table's number
// @param areaId the current textArea's id
function createSmileysTable(tableNum, areaId)
{
	var SMILEY_COUNT = 21;
	var currentSmiley = (SMILEY_COUNT * tableNum);

	// Converts numbers in hexadecimal string
	function base10ToBase16 ()
	{
		// Here is the conversion
		var str = (++currentSmiley).toString(16);
		str = str.toUpperCase();
		if (currentSmiley < 16) str = '0' + str;
		return str;
	}

	var tr = document.createElement('tr');
		for (var i=0; i < SMILEY_COUNT; i++)
		{        
			var td = document.createElement('td');
			var a = document.createElement('a');
			a.href = 'javascript:add2tag(' + "'" + getSmiley((SMILEY_COUNT*tableNum)+i) + "'" + ', "'+ areaId +'","0")';
			a.areaId = areaId.substr("area".length, areaId.length);

			var image = document.createElement('img');
			image.src = 'http://www.kramages.org/s/' + base10ToBase16() +'.gif'
			a.appendChild(image);
			td.appendChild(a);
			tr.appendChild(td);
		}
	return tr;
}

// Creates and display the previsualisation area
// @param textarea the textarea to be previsualised
function createPreview(textarea)
{
    var id = n_prevs++;

    textarea.id = "area" + id;
    Previews[textarea.id] = textarea;

    var container = textarea.parentNode;

	// Add the keyup event listener to the textarea
    if (OPTION_FREQUENCE_PREVISUALISATION == 1)
	{
		textarea.addEventListener('keyup', key_up, false );
	}

    var prev = document.createElement('div');
    prev.id = "preview" + id;
    prev.className = "bigcadre";
    prev.style.marginLeft = "0";
    prev.style.width = "97%";
    prev.style.padding = "5px";
    prev.innerHTML = "";
    
	// Add the mouseover event listener to the textarea and the previsualisation area
    if (OPTION_FREQUENCE_PREVISUALISATION == 0)
    {
        prev.addEventListener('mouseover', key_up, false );
        textarea.addEventListener('mousemove', key_up, false );
    }

    var footer = document.createElement('div');
    footer.id = "footer" + id;
    
	// This one is used as a container
    var paragraph = document.createElement('p');
    textarea.parentNode.insertBefore(paragraph, textarea);
    paragraph.parentNode.removeChild(textarea);
    paragraph.appendChild(textarea);
    paragraph.appendChild(prev);
    paragraph.appendChild(footer);
}

// Removes every stupid '>' that cut the post's sentences is pieces.
// @param textarea the textarea to be cleaned
function removeBadQuotes(textarea)
{
    textarea.value = textarea.value.replace(/ \n(?:> )+(?=[\wéàçèäâêë\[])/g, " ");
    textarea.value = textarea.value.replace(/  /g," ");
}

// Update the previsualisation area and display the character's counter when the keyup event is triggered
// @param event the keyup event
function key_up (event)
{
	var area;

	// If the event was triggered by the user
	if (event != null)
	{
		area = Previews[event.target.id];
	}
	// If the script made a call to this function by itself
	else
	{
		area = document.getElementsByClassName('forum-message')[0].getElementsByTagName('textarea')[0];
		if (area == null) return;
	}
	var doc = document;

	// Ok maybe we don't have a textarea everytime, pretty sure we are in the kraland's previsualisation tool
	if (area == null)
	{	
		doc = parent.document;
		var post = doc.getElementsByClassName('forum-message')[0];

		if (post == null && !is_tool_frame())
		{
			zarea = event.target.parentNode.parentNode.getElementsByTagName('textarea')[0];
			if (area == null) area = document.getElementById("area"+event.target.parentNode.id);
			if (area == null) alert("putain de bordel de merde"); // <----- Rico replies : OH SHIT WE'RE SCREWED :D ! IT'S A TRAP !
		}
		else
		{
			if (post == null)
			{
				doc = opener.document;
				var ln = document.getElementsByTagName('a')[0];
				var orderId = ln.href.substr(ln.href.lastIndexOf('=')+1, ln.href.length);
				var area = doc.getElementsByName('order' + orderId)[0].getElementsByTagName('textarea')[0];
			}
			else
			{
				area = post.getElementsByTagName('textarea')[0];
			}
		}
	}

	// Simple check for the italic checkbox, only in the popup window
	if (isItalic(area))
	{
		var str = convert('[i]'+area.value+'[/i]');
	}
	else
	{
		var str = convert(area.value);
	}

	var id = area.id.substr("area".length, area.id.length);
	var prev = doc.getElementById('preview' + id);
	var foot = doc.getElementById('footer' + id);

	// Replace some shit with true badass <br/> tags ! Beware of the <br/> tags, they could kill you while you're sleeping
	// Rico is tired ^
	var endl = /(\r\n|\n\r|\r|\n)/g;
	var count = 0;
	prev.innerHTML = str.replace( endl, function(match, g1, g2, position, input)
	{
		count++;
		return "<br/>"; 
	});

	// This one is not used anymore, Kraland is ok with '<' and '\' now
	//var alert_carac = "";
	//if (area.value.search(new RegExp(/(\\|<\S)/)) != -1) alert_carac = "<p align='right'><font color='red'><b>Aaaaaaaaaaaahhhh un < ou un \ ! Vade retro satanas !</b></font></p>";

	var nbCarac = area.value.match(new RegExp(/\"/g));
	if (nbCarac != null) count=count+5*nbCarac.length;

	nbCarac = area.value.match(new RegExp(/(\>|\<)/g));
	if (nbCarac != null) count=count+3*nbCarac.length;

	foot.innerHTML = area.value.length + count + " caractères"; // Not used anymore : + alert_carac;
}

// The main function
function main()
{
	if (isMainFrame())
	{
		if (OPTION_REFORMATER_TEXTE == 1)
		{
			removeBadQuotes(document.getElementsByClassName('forum-message')[0].getElementsByTagName('textarea')[0]);
		}
		// Tools, smileys etc...
		var left_toolbar = document.getElementsByClassName('forum-cartouche');
		// This add some rare characters, could be useful.
		if (left_toolbar.length != 0)
		{
			var help_text = document.createElement('p');
			help_text.innerHTML = "— « » À É";
			left_toolbar[0].appendChild(help_text);
		}
		createPreview(document.getElementsByClassName('forum-message')[0].getElementsByTagName('textarea')[0]);
		key_up();
	}
	else if (isPopupFrame())
	{
		extendTextArea();
		var areas = document.getElementsByTagName('textarea');
		for (var i=0; i<areas.length; i++)
		{
			createPreview(areas[i]);
			add_toolbar(areas[i]);
		}
	}
	// Removed because the minichat is bugged.
	/*else if (isPrevisualisationWindow)
	{   
		var nodes = document.getElementsByTagName('textarea');
		for (var i=0; i<nodes.length; i++)
		{
			nodes[i].addEventListener('mouseup', mouseUp, true );
			createPreview(nodes[i]);
			add_toolbar(nodes[i]);
		}
	}*/
}

/****************************************
*		END SECURED FUNCTIONS			*
*****************************************/

function add_toolbar (area) {
    var toolbar = document.createElement('span');

    document.body.appendChild(document.createElement('script')).innerHTML = "var tagopen;\n" + add2tag ;
    document.body.appendChild(document.createElement('script')).innerHTML = "var tagopen;\n" + displaySmileysArea ;

    var c = new Array();
    c[0] = new Array('b', b_str);
    c[1] = new Array('i', i_str);
    c[2] = new Array('u', u_str);
    c[3] = new Array('strike', s_str);
    c[4] = new Array('left', left_str);
    c[5] = new Array('center', center_str);
    c[6] = new Array('right', right_str);
    c[7] = new Array('quote', quote_str);
    c[8] = new Array('img', img_str);
    c[9] = new Array('url', url_str);
    c[10] = new Array('mail', mail_str);
    c[11] = new Array("yellow", "#f4ac00");
    c[12] = new Array("orange", "#f77400");
    c[13] = new Array("fuschia", "#ed6161");
    c[14] = new Array("red", "#d50000");
    c[15] = new Array("maroon", "#7b0000");
    c[16] = new Array("brown", "#5e432d");
    c[17] = new Array("purple", "purple");
    c[18] = new Array("navy", "#00007b");
    c[19] = new Array("smiley", "smiley");
    c[20] = new Array("blue", "#2b2be4");
    c[21] = new Array("lightblue", "#5577bc");
    c[22] = new Array("teal", "#007b7b");
    c[23] = new Array("lightgreen", "#219c5a");
    c[24] = new Array("green", "#006f00");
    c[25] = new Array("olive", "#7b7b00");
    c[26] = new Array("gray", "#7b7b7b");
    c[27] = new Array("darkgray", "#5a5a5a");
    

    var table = document.createElement('table');
    table.style.display = "inline";
    table.style.border = "0";
    table.cellSpacing = 1;
    table.cellPadding = 0;

    var tr = document.createElement('tr');
    
    for (var i=0; i<c.length; i++)
    {
        if (i == 20)
        {
            table.appendChild(tr);
            tr = document.createElement('tr');
        }

        var td = document.createElement('td');
        td.style.border = "1px solid #999999";
        var is_image;
        if (i < 11)
        {
            is_image = true;
            td.width = "18px";
            td.height = "17px";
            td.rowSpan = "2";
        }
        else
        {
            is_image = false;
            td.width = "8px";
            td.height = "8px";
        }
        if (i != 19) add_tool(td, c[i][1], c[i][0], area.id, is_image);
        else if (!smiley) continue;
        else
        {
            var a = document.createElement('a');
            a.href = 'javascript:displaySmileysArea("' + area.id +'")';
            a.id = area.id.substr("area".length, area.id.length);
        
            var image = document.createElement('img');
            image.src = 'http://www.kramages.org/s/' + "01" +'.gif'
            td.style.border = "1px solid #999999";
            td.rowSpan =2;
            a.appendChild(image);
            td.appendChild(a);
        }
        tr.appendChild(td);
    }

    table.appendChild(tr);
    toolbar.appendChild(table);
    
    if (smiley == 1)
    {
        for (var i=0; i<5; i++)
        {
            var table = document.createElement('table');
            table.style.display = "none";
            table.style.border = "0";
            table.cellSpacing = 1;
            table.cellPadding = 0;
            table.id = area.id + "smile" + i;
            table.appendChild(createSmileysTable(i, area.id));
            toolbar.appendChild(table);
        }
    }

    area.parentNode.parentNode.insertBefore(toolbar, area.parentNode);
}


function add_tool (node, str, tag, id, is_image)
{
    var a = document.createElement('a');
    a.href = 'javascript:add2tag("'+ tag +'", "'+ id +'","1")';
    a.id = id.substr("area".length, id.length);

    if (is_image)
    {
        var image = document.createElement('img');
        image.src = str;
        a.appendChild(image);
    }
    else
    {
        var div = document.createElement('div');
        div.style.margin = "0";
        div.style.width = "8px";
        div.style.height = "8px";
        div.style.backgroundColor = str;
        a.appendChild(div);
    }

    a.addEventListener('mouseup', mouseUp, true );
    node.appendChild(a);
}

function add2tag(tag, id, tagtype) {
    textselect = document.getElementById(id);
    if (textselect == null) return;
    
    if ( tag == "mail" )
    {
        textselect.value = "[/i]" + textselect.value + "[i]";

        textselect.focus();	
        return;
    }
	
    if( tag == "url" )	{
        eq = "=";
    }
    else {
        eq = "";
    }
    var selLength = textselect.textLength;
    var selStart = textselect.selectionStart;
    var selEnd = textselect.selectionEnd;

    if (selEnd == 1 || selEnd == 2)
	selEnd = selLength;

    var s1 = (textselect.value).substring(0,selStart);
    var s2 = (textselect.value).substring(selStart, selEnd);
    var s3 = (textselect.value).substring(selEnd, selLength);
    if (textselect.selectionEnd &&
	(textselect.selectionEnd - textselect.selectionStart > 0)
	&& tagtype == 1 ) {
	textselect.value = s1 + "[" + tag + eq + "]" + s2 + "[/" + tag + "]" + s3;
	textselect.selectionStart = s1.length;
	textselect.selectionEnd = textselect.textLength - s3.length;
    } 
    else {
	if ( tagopen == tag && tagtype == 1 ) {
	    textselect.value = s1 + "[/" + tag + "]" + s3;
	    tagopen = '';
	} 
	else {
	    textselect.value = s1 + "[" + tag + eq + "]" + s3;
	    tagopen = tag;
	}
	textselect.selectionStart = textselect.textLength - s3.length;
	textselect.selectionEnd = textselect.textLength - s3.length;
    }
    textselect.focus();	
}

function convert (S) {

    if (S.indexOf('[') < 0) return S;
    
    function X(p, f) { return new RegExp(p, f) }
    function D(s) { return rD.exec(s) }
    function R(s) { return s.replace(rB, P) }
    function A(s, p) { for (var i in p) s = s.replace(X(i, 'g'), p[i]); return s; }

    function P($0, $1, $2, $3) {
        if ($3 && $3.indexOf('[') > -1) $3 = R($3);
        switch ($1) {
            case 'spoiler':
              return '<div><div class="pre-spoiler"><span style="float: left; padding-top: 2px;">Spoiler</span> <input value="Voir" class="see-spoiler" onclick="if (this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display != \'\') { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'\';this.innerText = \'\'; this.value = \'Cacher\'; } else { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'none\'; this.value =\'Voir\';}" type="button"></div><div><div class="spoiler" style="display: none;">' + $3 + '</div></div></div>';
            case 'url':
            case 'mail':
              return '<a '+ L[$1] + ($2||$3) +'" target="_blank">'+ $3 +'</a>';
            case 'img':
              var d = D($2);
              return '<img src="'+ $3 +'"'+ (d ? ' width="'+ d[1] +'" height="'+ d[2] +'"' : '') +' alt="'+ (d ? '' : $2) +'" />';
            case 'left':
            case 'right':
              return '<p align="'+ $1 +'">'+ $3 +'</p>';
            case 'center':
              return '<center>'+ $3 +'</center>';
            case 'quote':
              return '<br><div align=right><hr width=250><i>' + $3 + '<br></i><hr width=250></div>';
            case 'b':
	          case 'i':
	          case 'u':
	          case 'strike':
	            return '<'+ $1 +'>'+ $3 +'</'+ $1 +'>';
        }
        return '['+ $1 + ($2 ? '='+ $2 : '') +']'+ $3 +'[/'+ $1 +']';
    }

    var rB = X('\\[([a-z][a-z0-9]*)(?:=([^\\]]+))?]((?:.|[\r\n])*?)\\[/\\1]', 'g'), rD = X('^(\\d+)x(\\d+)$');
    var L = {url: 'href="', mail: 'href="mailto: '};
    var C = {pre: [{'<': '&lt;'}, '<pre>', '</pre>']};
    var Cols = {
	yellow: '#f4ac00',
	orange: '#f77400',
	fuschia: '#ed6161',
	red: '#d50000',
	maroon: 'maroon',
	brown: '#5e432d',
	purple: 'purple',
	navy: 'navy',
	blue: '#2b2be4',
	teal: 'teal',
	lightgreen: '#219c5a',
	lightblue: '#5577bc',
	green: '#006f00',
	olive: 'olive',
	gray: 'gray',
	darkgray: '#5a5a5a',
	aqua: 'aqua'
    };
    var llc = 0;
    function nhex () {
	var str = (++llc).toString(16);
	str = str.toUpperCase();
	if (llc < 16) str = '0' + str;
	return str;
    }
    var Sm = {
	':[)]' : nhex(),
	';[)]' : nhex(),
	'8[)]' : nhex(),
	':\]' : nhex(),
	':D' : nhex(),
	':p' : nhex(),
	':6' : nhex(),
	'3[)]' : nhex(),
	':,' : nhex(),
	':[(]' : nhex(),
	':[[]' : nhex(),
	'[)][[]' : nhex(),
	'![(]' : nhex(),
	'[ù^]\]' : nhex(),
	'x[(]' : nhex(),
	'8[(]' : nhex(),
	'o[)]' : nhex(),
	'%[(]' : nhex(),
	':o' : nhex(),
	':[|]' : nhex(),
	'[)][|]' : nhex(),
	';[(]' : nhex(),
	';[[]' : nhex(),
	':f' : nhex(),
	';o' : nhex(),
	';[|]' : nhex(),
	'[[][(]' : nhex(),
	'0[)]' : nhex(),
	':B' : nhex(),
	':=' : nhex(),
	'8\]' : nhex(),
	'[|][)]' : nhex(),
	'O[)]' : nhex(),
	'8î' : nhex(),
	'8Î' : nhex(),
	'j[)]' : nhex(),
	'p[)]' : nhex(),
	'[ù^][)]' : nhex(),
	'[)]f' : nhex(),
	':î' : nhex(),
	':Î' : nhex(),
	'[%][)]' : nhex(),
	'8O' : nhex(),
	'OX' : nhex(),
	'[)]%' : nhex(),
	'oX' : nhex(),
	':[.]' : nhex(),
	'o[(]' : nhex(),
	'hp' : nhex(),
	':n' : nhex(),
	':P' : nhex(),
	':x' : nhex(),
	'8p' : nhex(),
	'j[|]' : nhex(),
	'kD' : nhex(),
	'k\]' : nhex(),
	';p' : nhex(),
	':l' : nhex(),
	':[+]' : nhex(),
	':-' : nhex(),
	'VV' : nhex(),
	'%%' : nhex(),
	'Q[)]' : nhex(),
	'fr' : nhex(),
	'en' : nhex(),
	'de' : nhex(),
	'es' : nhex(),
	'it' : nhex(),
	'nl' : nhex(),
	'ca' : nhex(),
	'sw' : nhex(),
	'jp' : nhex(),
	'[*]t' : nhex(),
	'[*]j' : nhex(),
	'[*]o' : nhex(),
	'[*]r' : nhex(),
	'[*]v' : nhex(),
	'[*]c' : nhex(),
	'[*]b' : nhex(),
	'[*]m' : nhex(),
	'[*]n' : nhex(),
	'=o' : nhex(),
	'=n' : nhex(),
	'=S' : nhex(),
	'ty' : nhex(),
	'mt' : nhex(),
	'so' : nhex(),
	'iz' : nhex(),
	'jo' : nhex(),
	'tk' : nhex(),
	'pk' : nhex(),
	'ka' : nhex(),
	'ke' : nhex(),
	'3i' : nhex(),
	'[+][)]' : nhex(),
	'st' : nhex(),
	'[§]c' : nhex(),
	'[§]o' : nhex(),
	'[§]g' : nhex(),
	'co' : nhex(),
	'[§]p' : nhex(),
	'=[)]' : nhex(),
	'=!' : nhex(),
	'=k' : nhex(),
	'=y' : nhex()
    };
    var I = {}, B = {};

    for (var i in C) I['\\[('+ i +')]((?:.|[\r\n])*?)\\[/\\1]'] = function($0, $1, $2) {return C[$1][1] + A($2, C[$1][0]) + C[$1][2]};
    for (var i in Cols) {B['\\[('+ i +')]'] = '<font color="'+ Cols[i] +'">'; B['\\[/'+ i +']'] = '</font>';}
    for (var i in Sm) {B['\\[('+ i +')]'] = '<img src="http://www.kramages.org/s/' + Sm[i] +'.gif">'; }
    return R(A(A(S, I), B));
}


main();
