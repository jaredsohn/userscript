// ==UserScript==
// @name           CrowdFlower
// @namespace      au.lach
// @include        https://crowdflower.com/judgments/*
// ==/UserScript==

var geoNameTemplateURL = "http://www.geonames.org/advanced-search.html?q={query}&country=PK&featureClass=&continentCode=&fuzzy=0.6";
var elementPrefix;

function insertLink(text, link)
{
	var div, newElement;
	div = document.getElementsByName(elementPrefix + '[sms_ambiguous]')[0].parentNode.parentNode;
	if (div) {
	    newElement = document.createElement('a');
            newElement.href = link;
            newElement.innerHTML = text;
            newElement.target = '_blank';
	    div.appendChild(newElement);
	}
}

function ExecuteRegex(regex, group, text)
{
	var matches = regex.exec(text);
	if (matches !== null)
	{
		return matches[group];
	}
	return '';
}

function SetSelectOptionSelected(name, values)
{
	//select dosen't work for this element
	//var element = document.getElementsByName(name);
	var element = document.getElementsByTagName('select')[0];
	for (var x = 0; x < values.length; x++)
	{
		var value = values[x];

		for (var i = 0; i < element.options.length; i++) {
                        var option = element.options[i];
			if(option.value == value)
			{
				option.selected = true;
			}
		}
	}
}

function SetAidCategorySelected(values)
{
	var aidCategoryElementName = elementPrefix + '[category][]';
	SetSelectOptionSelected(aidCategoryElementName, values);
}

function SetAidCategories(smsText)
{
	var aidCategories = [];
	if (smsText.indexOf('Village is still flooded') > -1)
	{
		aidCategories.push('Logistics and extent of flooding | Flooded area');
	}
	if (smsText.indexOf('have been destroyed') > -1 || smsText.indexOf('damaged') > -1)
	{
		aidCategories.push('Logistics and extent of flooding | Collapsed structure');
	}
	SetAidCategorySelected(aidCategories);
}

function SetElementCheck(name, value)
{
        var element;
	var elements = document.getElementsByName(name);
	for (var i = 0; i < elements.length; i++) {
                element = elements[i];
		if(element.value == value)
		{
			element.checked = true;
		}
	}
}


function SetLanguageCheck(value)
{
	var languageElementName = elementPrefix + '[language]';
	SetElementCheck(languageElementName, value);
}

function SetElementValue(name, value)
{
	var elements = document.getElementsByName(name);
	elements[0].value = value;
}

function SetExplainOtherValue(value)
{
	var explainOtherValueElementName = elementPrefix + '[explain_other_here_if_the_category_is_not_listed_above_specify_the_type_of_aid_that_is_needed]';
	SetElementValue(explainOtherValueElementName, value);
}

function SetLocationNameValue(value)
{
	var locationElementName = elementPrefix + '[location_name]';
	SetElementValue(locationElementName, value);
}

function ExtractVillage(smsText)
{
	var myRegex = /Assessment: ([\w|\s|,|\.]*)/;
	var matches = myRegex.exec(smsText);
	return matches[1];
}

function ExtractUC(smsText)
{
	var myRegex = /\(UC ([\w|\s]*)\)/;
	var matches = myRegex.exec(smsText);
	return matches[1];
}


function SetOtherText(smsText)
{
	var otherText = '';
	
	otherText += ExecuteRegex(/((?:\d+)% of crops destroyed)/, 1, smsText);

	SetExplainOtherValue(otherText);
}

function ExtractSMSText()
{
	h3tags = document.getElementsByTagName('h3');
	if (h3tags.length > 1)
	{
		return h3tags[0].innerHTML;
	}	
}

function SetSMSTranslation(smsText)
{
	var smsTranslationElementName = elementPrefix + '[sms_translation]';
	smsText = smsText.replace('The SMS: [ ', '');
	smsText = smsText.replace(' ]', '');
	SetElementValue(smsTranslationElementName, smsText);
}

function GenerateGeoNamesLink(query)
{
	var trimmedQuery = query.replace(/^\s+|\s+$/g, '') ;
	return geoNameTemplateURL.replace('{query}', trimmedQuery);
}

function ProcessSMSText(smsText)
{
	SetLanguageCheck('English');
	
	var village = ExtractVillage(smsText);
	var UC = ExtractUC(smsText);

	SetLocationNameValue(village);

	SetOtherText(smsText);

	SetAidCategories(smsText);

	SetSMSTranslation(smsText);

	insertLink('Village Search ', GenerateGeoNamesLink(village));
	insertLink('UC Search ', GenerateGeoNamesLink(UC));
}



function ExtractID()
{	
	var divtag = document.getElementsByTagName('div');
	if (divtag.length > 1)
	{
		return divtag[5].id;
	}	
}



elementPrefix = ExtractID();
var smsText = ExtractSMSText();
ProcessSMSText(smsText);