// ==UserScript==
// @name          Emoji Replacer
// @namespace     http://www.dunkelstern.de/
// @description   Makes iPhone Emoji caracters viewable in firefox, speed optimized version 0.2, runs in background, works in FIrefox and Safari (with Greasekit)
// ==/UserScript==

var replacements, key, textnodes, target, targetchar, idx, idxIncrement, warn, warnImg, fade;

replacements = [
'E001','E002','E003','E004','E005','E006','E007','E008','E009','E00A',
'E00B','E00C','E00D','E00E','E00F','E010','E011','E012','E013','E014',
'E015','E016','E017','E018','E019','E01A','E01B','E01C','E01D','E01E',
'E01F','E020','E021','E022','E023','E024','E025','E026','E027','E028',
'E029','E02A','E02B','E02C','E02D','E02E','E02F','E030','E031','E032',
'E033','E034','E035','E036','E037','E038','E039','E03A','E03B','E03C',
'E03D','E03E','E03F','E040','E041','E042','E043','E044','E045','E046',
'E047','E048','E049','E04A','E04B','E04C','E04D','E04E','E04F','E050',
'E051','E052','E053','E054','E055','E056','E057','E058','E059','E05A',
'E101','E102','E103','E104','E105','E106','E107','E108','E109','E10A',
'E10B','E10C','E10D','E10E','E10F','E110','E111','E112','E113','E114',
'E115','E116','E117','E118','E119','E11A','E11B','E11C','E11D','E11E',
'E11F','E120','E121','E122','E123','E124','E125','E126','E127','E128',
'E129','E12A','E12B','E12C','E12D','E12E','E12F','E130','E131','E132',
'E133','E134','E135','E136','E137','E138','E139','E13A','E13B','E13C',
'E13D','E13E','E13F','E140','E141','E142','E143','E144','E145','E146',
'E147','E148','E149','E14A','E14B','E14C','E14D','E14E','E14F','E150',
'E151','E152','E153','E154','E155','E156','E157','E158','E159','E15A',
'E201','E202','E203','E204','E205','E206','E207','E208','E209','E20A',
'E20B','E20C','E20D','E20E','E20F','E210','E211','E212','E213','E214',
'E215','E216','E217','E218','E219','E21A','E21B','E21C','E21D','E21E',
'E21F','E220','E221','E222','E223','E224','E225','E226','E227','E228',
'E229','E22A','E22B','E22C','E22D','E22E','E22F','E230','E231','E232',
'E233','E234','E235','E236','E237','E238','E239','E23A','E23B','E23C',
'E23D','E23E','E23F','E240','E241','E242','E243','E244','E245','E246',
'E247','E248','E249','E24A','E24B','E24C','E24D','E24E','E24F','E250',
'E251','E252','E253','E301','E302','E303','E304','E305','E306','E307',
'E308','E309','E30A','E30B','E30C','E30D','E30E','E30F','E310','E311',
'E312','E313','E314','E315','E316','E317','E318','E319','E31A','E31B',
'E31C','E31D','E31E','E31F','E320','E321','E322','E323','E324','E325',
'E326','E327','E328','E329','E32A','E32B','E32C','E32D','E32E','E32F',
'E330','E331','E332','E333','E334','E335','E336','E337','E338','E339',
'E33A','E33B','E33C','E33D','E33E','E33F','E340','E341','E342','E343',
'E344','E345','E346','E347','E348','E349','E34A','E34B','E34C','E34D',
'E401','E402','E403','E404','E405','E406','E407','E408','E409','E40A',
'E40B','E40C','E40D','E40E','E40F','E410','E411','E412','E413','E414',
'E415','E416','E417','E418','E419','E41A','E41B','E41C','E41D','E41E',
'E41F','E420','E421','E422','E423','E424','E425','E426','E427','E428',
'E429','E42A','E42B','E42C','E42D','E42E','E42F','E430','E431','E432',
'E433','E434','E435','E436','E437','E438','E439','E43A','E43B','E43C',
'E43D','E43E','E43F','E440','E441','E442','E443','E444','E445','E446',
'E447','E448','E449','E44A','E44B','E44C','E501','E502','E503','E504',
'E505','E506','E507','E508','E509','E50A','E50B','E50C','E50D','E50E',
'E50F','E510','E511','E512','E513','E514','E515','E516','E517','E518',
'E519','E51A','E51B','E51C','E51D','E51E','E51F','E520','E521','E522',
'E523','E524','E525','E526','E527','E528','E529','E52A','E52B','E52C',
'E52D','E52E','E52F','E530','E531','E532','E533','E534','E535','E536',
'E537'];

textnodes = document.evaluate(
    "//text()[string-length(translate(normalize-space(), ' &#9;&#xA;&#xD;','')) > 0]", // only use nodes that actually have content
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var newNodes = new Array(); // save newly created nodes here

function replaceChar(node)
{	// replace the current char within node 
	var pos, s;
	s = node.data;
	pos = s.indexOf(targetchar);	// find occurence of char

	if (pos >= 0)
	{	node.data = "";
		while(pos >= 0)
		{
			// create a new img tag element
			var newimg = document.createElement('img');
			newimg.setAttribute('src', 'http://www.dunkelstern.de/projects/emoji/emoji-'+target+'.png');
			newimg.setAttribute('style', "width: 20px; height: 20px;");
			node.data = s.substr(0,pos);
			if (node.nextSibling)
				node.parentNode.insertBefore(newimg, node.nextSibling);
			else
				node.parentNode.appendChild(newimg);
	
			// new string is found char + 1 until end
			s = s.substr(pos+1);
			pos = s.indexOf(targetchar);
	
			node = document.createTextNode("");
			if (newimg.nextSibling)
				newimg.parentNode.insertBefore(node, newimg.nextSibling);
			else
				newimg.parentNode.appendChild(node);
				
			// save this node too
			newNodes.push(node);
	
		}
		node.data = s;
	}
}

// split the work into small pieces to not hang firefox
function backgroundTask()
{
	var endindex;
	if (idx < replacements.length)
	{
		// fade in the working sign
		if (fade < 1)
		{
			fade += 0.1;
			warn.setAttribute("style", "-webkit-border-radius: 8px; -moz-border-radius: 8px; -moz-opacity: "+ fade +"; opacity: "+ fade
						      + "; padding: 10px; background-color: #ffa0a0; position: fixed; right: 0px; top: 0px;");
		}

		if (idx + idxIncrement < replacements.length)
			endindex = idx + idxIncrement;
		else
			endindex = replacements.length;

		// loop through all replacements
		for( var j = idx; j < endindex; j++)
		{
			target = replacements[j];
			targetchar = eval('"\\u' + target + '"');
		
			// loop through all text nodes
			for (var i = 0; i < textnodes.snapshotLength; i++)
				replaceChar(textnodes.snapshotItem(i));		
		
			// loop through all new nodes
			for (var i = 0; i < newNodes.length; i++)
				replaceChar(newNodes[i]);		
		}
		
		idx = endindex;
		window.setTimeout(arguments.callee, 100);
		return;
	}
	
	// fade out the working sign
	if (fade > 0.2)
	{
		fade -= 0.1;
		warn.setAttribute("style", "-webkit-border-radius: 8px; -moz-border-radius: 8px; -moz-opacity: "+ fade +"; opacity: "+ fade
					      + "; padding: 10px; background-color: #ffa0a0; position: fixed; right: 0px; top: 0px;");
		window.setTimeout(arguments.callee, 100);
		return;
	} else
		document.getElementsByTagName("body")[0].removeChild(warn);			
}

// display a working sign
warn = document.createElement('div');
warnImg = document.createElement('img');
warnImg.setAttribute("src", "http://www.dunkelstern.de/projects/emoji/emoji-E056.png");
warnImg.setAttribute("title", "Replacing Emoji...");
warnImg.setAttribute("alt", "Replacing Emoji...");
warn.appendChild(warnImg);
warn.setAttribute("style", "-webkit-border-radius: 8px; -moz-border-radius: 8px; -moz-opacity: 0; opacity: 0; display: none; padding: 10px; background-color: #ffa0a0; position: fixed; right: 0px; top: 0px;");
var body=document.getElementsByTagName("body");
if (body.length < 1)
	return;
else
	body[0].appendChild(warn);
idx = 0;

// determine how many emoji to replace in one run
if (textnodes.snapshotLength > 0)
	idxIncrement = Math.ceil(2500 / textnodes.snapshotLength);
else
	idxIncrement = 100;
fade = 0;

// send the task to the background
window.setTimeout(backgroundTask, 100);
