// ==UserScript==
// @name        Path of Exile Tree Summary
// @namespace   PoETreeRecapSummary
// @description Path of Exile Tree Summary
// @include     http://www.pathofexile.com/passive-skill-tree/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       none
// @version     1.2
// ==/UserScript==

// Based on Path of Exile Tree Recap by Blackclaw
// Original version available at http://userscripts.org/scripts/show/158649
// Now requires sign in to pull updated node list from current character

"use strict";
// needed for chrome as well as the @require on jquery
var base64=(function($){var _PADCHAR="=",_ALPHA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_VERSION="1.0";function _getbyte64(s,i){var idx=_ALPHA.indexOf(s.charAt(i));if(idx===-1){throw"Cannot decode base64"}return idx}function _decode(s){var pads=0,i,b10,imax=s.length,x=[];s=String(s);if(imax===0){return s}if(imax%4!==0){throw"Cannot decode base64"}if(s.charAt(imax-1)===_PADCHAR){pads=1;if(s.charAt(imax-2)===_PADCHAR){pads=2}imax-=4}for(i=0;i<imax;i+=4){b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6)|_getbyte64(s,i+3);x.push(String.fromCharCode(b10>>16,(b10>>8)&255,b10&255))}switch(pads){case 1:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12)|(_getbyte64(s,i+2)<<6);x.push(String.fromCharCode(b10>>16,(b10>>8)&255));break;case 2:b10=(_getbyte64(s,i)<<18)|(_getbyte64(s,i+1)<<12);x.push(String.fromCharCode(b10>>16));break}return x.join("")}function _getbyte(s,i){var x=s.charCodeAt(i);if(x>255){throw"INVALID_CHARACTER_ERR: DOM Exception 5"}return x}function _encode(s){if(arguments.length!==1){throw"SyntaxError: exactly one argument required"}s=String(s);var i,b10,x=[],imax=s.length-s.length%3;if(s.length===0){return s}for(i=0;i<imax;i+=3){b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8)|_getbyte(s,i+2);x.push(_ALPHA.charAt(b10>>18));x.push(_ALPHA.charAt((b10>>12)&63));x.push(_ALPHA.charAt((b10>>6)&63));x.push(_ALPHA.charAt(b10&63))}switch(s.length-imax){case 1:b10=_getbyte(s,i)<<16;x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_PADCHAR+_PADCHAR);break;case 2:b10=(_getbyte(s,i)<<16)|(_getbyte(s,i+1)<<8);x.push(_ALPHA.charAt(b10>>18)+_ALPHA.charAt((b10>>12)&63)+_ALPHA.charAt((b10>>6)&63)+_PADCHAR);break}return x.join("")}return{decode:_decode,encode:_encode,VERSION:_VERSION}}(jQuery));

/////////////////////////////////////////////////////////////////////////
// script data

var baseDIV = '<div id="gm-skillrecapcontainer" class="flContainer">'
				+ '<h3 id="gm-skillsrecaplabel" style="cursor:pointer" class="label FontinBold">Skills Recap</h3>'
				+ '<div id="gm-skillsrecap">$Content$</div>'
				+ '<h3 id="gm-statsrecaplabel" style="cursor:pointer" class="label FontinBold">Stats Recap</h3>'
				+ '<div id="gm-statsrecap">$Content$</div>'
			+ '</div>'
			+ '<div class="clear"></div>';

var nodesjSON = [];

var arrURL = [], arrNodes = [];
var fullscreenFlag = false;
var permalink = '';

var targetNodes = [];
var MutationObserver = [];
var myObserver = [];
var obsConfig = [];

$(document).ready(
    function() { 
        //Check if logged in
        if($(".loggedOut").length > 0) {
            alert("This user script requires you to be logged in.  Please login and reload the page");
        } else {
            targetNodes = $("#inventory-controls");
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            myObserver = new MutationObserver(mutationHandler);
            obsConfig = { childList: true, characterData: true, attributes: true, subtree: true };
            targetNodes.each (function () { myObserver.observe(this,obsConfig); });
            
            function mutationHandler(mutationRecords) 
            {
                arrURL = document.URL.split("/");
            
                if (arrURL[2] != "www.pathofexile.com" || arrURL[3] != "passive-skill-tree")
                {
                    alert("This user script is only meant for the passive tree skill page of the Path of Exile website.");
                }
                else
                {
                    // insert the basic structure in the DOM
                    $("div.characterClassContainer").before(baseDIV);
        			
                    $.getJSON("/character-window/get-passive-skills?reqData=true&character="+$(".characterName").text(),function(data) {
                        var nodes = data.skillTreeData.nodes;
                        for(var i = 0; i < nodes.length; i++) { 
                            var currNode = nodes[i];
                            var appendNode = {};
                            appendNode["ks"]=currNode.ks;
                            appendNode["not"]=currNode.not;
                            appendNode["dn"]=currNode.dn;
                            appendNode["sd"]=currNode.sd;
                            arrNodes[currNode.id]=appendNode;
                       	}
                  		//arrNodes
                        permalink = arrURL[4];
                    	buildRecap(permalink);
                    });
                    
                    
                    if (fullscreenFlag)
                    {
                        $('div#gm-skillsrecap').hide();
                        $('div#gm-statsrecap').hide();
                    }
                    else
                    {
                        $('div#gm-skillsrecap').show();
                        $('div#gm-statsrecap').show();
                    }
                }
                
                $("h3#gm-skillsrecaplabel").click(function(event)
                {
                    $("div#gm-skillsrecap").slideToggle();
                });
                
                $("h3#gm-statsrecaplabel").click(function(event)
                {
                    $("div#gm-statsrecap").slideToggle();
                });
                
                $('#toggleFullScreen').click(function(event)
                {
                    fullscreenFlag = !fullscreenFlag;
                    
                    if (fullscreenFlag)
                    {
                        $('div#gm-skillsrecap').hide();
                        $('div#gm-statsrecap').hide();
                    }
                    else
                    {
                        $('div#gm-skillsrecap').show();
                        $('div#gm-statsrecap').show();
                    }
                });
        
                $('#resetSkillTree').click(function(event)
                {
                    $("div#gm-statsrecap").html('No skill.');
                    $("div#gm-skillsrecap").html('No skill.');
                });
            
                // click on the tree in fullscreen
                $('#poe-popup-container').click(refresh);
                // click on the tree in normal
                $('#passiveSkillTree').click(refresh);
            }
        }
    }
);

function refresh(event)
{
	arrURL = document.URL.split("/");
			
	if (permalink != arrURL[4])
	{
		permalink = arrURL[4];
		buildRecap(permalink);
		
		return true;
	}

	return false;
}

function buildRecap(URL)
{
	var decodedData = base64.decode(URL.replace(/-/g, "+").replace(/_/g, "/"));
	var versionOffset = 0, classOffset = 4, fullscreenOffset = 5, hashesOffset = 6;
	var treeVersion = readInt32(versionOffset, decodedData);
	var skillsRecap = '', statsRecap = '';

	// compare with the current version (2)
	if (treeVersion == 2)
	{
		var characterClass = readInt8(classOffset, decodedData);
		fullscreenFlag = readInt8(fullscreenOffset, decodedData);
		var dataLength = decodedData.length;
		var position = hashesOffset;

		var arrKeystones = [], arrNotables = [], arrMisc = [], arrNodeStats = [];
		var keystoneList = '', notableList = '', miscList = '';      
		var currentID, currentNode, currentEffect;
		var numberParser = /(?:\d*\.?\d+)/g;
		var arrNodeValues = [];
		var valueTotal = 0;

		while (position < dataLength)
		{
			currentID = parseInt(readInt16(position, decodedData));
			currentNode = arrNodes[currentID];

			if (currentNode.ks)
				pushNode(arrKeystones, currentNode);
			else if (currentNode.not)
				pushNode(arrNotables, currentNode);
			else
				pushNode(arrMisc, currentNode);

			for (var i = 0; i < currentNode.sd.length; i++)
			{
				// replace all the numerical values from the effect by $
				currentEffect = currentNode.sd[i].replace(numberParser, "$");
				// retrieve all the numerical values
				arrNodeValues = currentNode.sd[i].match(numberParser);

				if (arrNodeStats[currentEffect] == undefined) 
				{
					arrNodeStats[currentEffect] = Object();
					arrNodeStats[currentEffect].values = Array()
				}
				// merge the values for the current effect
				arrNodeStats[currentEffect].values = arrNodeStats[currentEffect].values.concat(arrNodeValues)
			}	

			position +=2;
		}

		arrKeystones = sortObj(arrKeystones);
		arrNotables = sortObj(arrNotables);
		arrMisc = sortObj(arrMisc);

		keystoneList = printNodes(arrKeystones);
		notableList = printNodes(arrNotables);
		miscList = printNodes(arrMisc);

		if (keystoneList != '')
			skillsRecap += '<div id="gm-keystonelist" class="flContainer"><span class="FontinRegular">Keystones:</span><ul>'+keystoneList+'</ul></div>';
		if (notableList != '')
			skillsRecap += '<div id="gm-notablelist" class="flContainer"><span class="FontinRegular">Notable skills:</span><ul>'+notableList+'</ul></div>';
		if (miscList != '')
			skillsRecap += '<div id="gm-misclist" class="flContainer"><span class="FontinRegular">Misc. skills:</span><ul>'+miscList+'</ul></div>';

		if (skillsRecap != '')
			skillsRecap += '<div class="clear"></div>';
		else
			skillsRecap = 'No skill.';

		arrNodeStats = sortObj(arrNodeStats);

		for (var key in arrNodeStats)
		{
			currentEffect = key;
			valueTotal = 0;

			if (arrNodeStats[key].values.length > 0)
			{
				// add all the values together
				for (var i = 0; i < arrNodeStats[key].values.length; i++) 
					if (arrNodeStats[key].values[i] != null)
						valueTotal += parseFloat(arrNodeStats[key].values[i]);
				// replace $ by the total value
				currentEffect = currentEffect.replace(/\$/g, valueTotal);
			}

			statsRecap += "<li>" + currentEffect + "</li>";
		}
		
		if (statsRecap != '') 
			statsRecap = '<div id="gm-statslist" class="flContainer"><ul style="margin:0">' + statsRecap + '</ul></div>';
		else
			statsRecap = 'No skill.';
	}
	else
	{
		skillsRecap = '<p>This URL is using a different version of the passive skill tree.</p>';
	}

	// insert the content of the recap
	$('div#gm-skillsrecap').html(skillsRecap);
	$('div#gm-statsrecap').html(statsRecap);
}



/////////////////////////////////////////////////////////////////////////
// code adapted from the javascript of the Path of Exile site

function readInt(arrURL, position, dataString)
{
    arrURL = arrURL || 4;

    var decodedData = position + arrURL;
    if (decodedData > dataString.length) throw "Integer read exceeds bounds";
    var n = [];
    
    for (; position < decodedData; ++position) {
        n.push(dataString.charAt(position).charCodeAt(0));
    }
    
    return bytesToInt(n, arrURL);
}

function readInt8(position, dataString)
{
  return readInt(1, position, dataString);
}

function readInt16(position, dataString)
{
  return readInt(2, position, dataString);
}

function readInt32(position, dataString)
{
  return readInt(4, position, dataString);
}

function bytesToInt(arrURL, decodedData)
{
    decodedData = decodedData || 4;
    var n = 0;
    for (var r = 0; r < decodedData; ++r) {
        n += arrURL[r], r < decodedData - 1 && (n <<= 8);
    }
    return n;
}

/////////////////////////////////////////////////////////////////////////
// script functions
function pushNode(array, node)
{
  if (array[node.dn] == undefined)
  {
    array[node.dn] = Object();
    array[node.dn].count = 0;
  }

  array[node.dn].desc = node.sd.join('\n');
  array[node.dn].count++; 
}

function printNodes(array)
{
  var string = '';

  for (var key in array)
  {
    if (key != '')
    {
      string += '<li';
      
      if (array[key].desc != '' && array[key].desc != undefined)
        string += ' title="'+array[key].desc+'">';
      else
        string += '>';
        
      string += key;

      if (array[key].count > 1)
        string += ' x'+array[key].count;
        
      string += '</li>';
    }
  }
  
  return string;
}

function sortObj(arr)
{
	// Setup Arrays
	var sortedKeys = Array();
	var sortedObj = {};

	// Separate keys and sort them
	for (var i in arr){
		sortedKeys.push(i);
	}
	sortedKeys.sort();

	// Reconstruct sorted obj based on keys
	for (var i in sortedKeys){
		sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
	}
	return sortedObj;
}