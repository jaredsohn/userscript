// ==UserScript==
// @name           Additional Smilies
// @namespace      wes1190@hotmail.com
// @author	       Wes (Orion)
// @description    Adds additional smiley links to the General, IC, and Alliance Chats (can be configured to add/remove specific smileys)
// @include        http://chat.pardus.at/chat.php*
// @exclude        http://chat.pardus.at/chattext.php*
// @exclude 	   http://chat.pardus.at/chat.php?channel=trade
// @version        3.0
// ==/UserScript==

//Don't touch me, I make sure images are not added to the Trade Chat//
var tradeChatCheck = document.getElementsByTagName("img");

if(tradeChatCheck.length < 40){
/////////////You can edit past this point/////////////////////////////



	//TURN THIS TO FALSE WHEN YOU READ THIS.
	var instructions = true;
		
	//Where do you want the new smilies? true = end, false = beginning
	var topBottom = true;

	//Do you use an offline image pack?
	var onlineImages = true;

	//If you do, paste it's location here. format - file://c:/pardus/images
	var offlineLocation = 'file://c:/pardus/images';


	//Links you want added to the chat
	var credits = true;
	var chems = true;
	var drugs = true;
	var stims = true;
	var elects = true;
	var ematter = true;
	var embros = true;
	var energy = true;
	var explosives = true;
	var food = true;
	var fuel = true;
	var gas = true;
	var gems = true;
	var liquor = true;
	var med = true;
	var metal = true;
	var ore = true;
	var packages = true;
	var plastics = true;
	var robots = true;
	var slaves = true;
	var water = true;
	var weapons = true;
	var bweapons = true;
	var optics = true;
	var driods = true;
	var rads = true;
	var bio = true;
	var neuraltissue = true;
	var clods = true;
	var leech = true;
	var xparts = true;
	var drone = true;
	var nStim = true;
	var vip = true;
	var crystals = true;
	var intestines = true;
	var limbs = true;
	var brains = true;
	var bones = true;
	var jFed = true;
	var jEmp = true;
	var jUni = true;

	/****************************************************************************/
	/* Don't modify anything past this point unless you know what you are doing */
	/****************************************************************************/
	var numberAdded = 0;
	var instructionOffset = 0;

	function modifyDoc(changesMade){


		//This will be what is used to replace the string 'smilies: '
		var whatNeedsAdded = "smilies: ";

		//Defaults the location to that of the offlineLocation.
		var location = offlineLocation;

		//check to use offlineIP, if false, set location to use the static stdhq smilies.
		if(onlineImages == true)
			location = 'http://static.pardus.at/img/stdhq';

		var first = '<a href="#" onclick="addChatText(';
		location = ');">' + "<img src='" + location;
		var end = "border='0' style='vertical-align:middle' alt=''></a>";

		//Adds Instructions
		if(instructions == true){
		   whatNeedsAdded  += 'These new image links are fully customizable, <b><a href="http://i.imgur.com/frGUN.png">you can modify the script</a></b> to remove unwanted smiley links (this message can be turned off aswell).<BR>';
		   instructionOffset += 1;
		}
		   
		//if true, add the image link   
		if(jUni == true){
		   whatNeedsAdded  += first + "':jewels-uni:'" + location + "/chat/jewels_uni.png'" + end;
		   numberAdded += 1;
		}

		if(jEmp == true){
		   whatNeedsAdded  += first + "':jewels-emp:'" + location + "/chat/jewels_emp.png'" + end;
		   numberAdded += 1;
		}
		
		if(jFed == true){
		   whatNeedsAdded  += first + "':jewels-fed:'" + location + "/chat/jewels_fed.png'" + end;
		   numberAdded += 1;
		}

		if(bones == true){
		   whatNeedsAdded  += first + "':bones:'" + location + "/chat/rashkir_bones.png'" + end;
		   numberAdded += 1;
		}

		if(brains == true){
		   whatNeedsAdded  += first + "':brains:'" + location + "/chat/keldon_brains.png'" + end;
		   numberAdded += 1;
		}

		if(limbs == true){
		   whatNeedsAdded  += first + "':limbs:'" + location + "/chat/skaari_limbs.png'" + end;
		   numberAdded += 1;
		}

		if(intestines == true){
		   whatNeedsAdded  += first + "':intestines:'" + location + "/chat/human_intestines.png'" + end;
		   numberAdded += 1;
		}

		if(crystals == true){
		   whatNeedsAdded  += first + "':crystal:'" + location + "/chat/exotic_crystal.png'" + end;
		   numberAdded += 1;
		}

		if(vip == true){
		   whatNeedsAdded  += first + "':vip:'" + location + "/chat/vip.png'" + end;
		   numberAdded += 1;
		}

		if(nStim == true){
		   whatNeedsAdded  += first + "':stimulator:'" + location + "/chat/neural_stimulator.png'" + end;
		   numberAdded += 1;
		}

		if(drone == true){
		   whatNeedsAdded  += first + "':drone:'" + location + "/chat/x993_repairdrone.png'" + end;
		   numberAdded += 1;
		}

		if(xparts == true){
		   whatNeedsAdded  += first + "':xparts:'" + location + "/chat/cybernetic_x993_parts.png'" + end;
		   numberAdded += 1;
		}

		if(leech == true){
		   whatNeedsAdded  += first + "':leech:'" + location + "/chat/leech_baby.png'" + end;
		   numberAdded += 1;
		}

		if(clods == true){
		   whatNeedsAdded  += first + "':clods:'" + location + "/chat/nutrient_clods.png'" + end;
		   numberAdded += 1;
		}

		if(neuraltissue == true){
		   whatNeedsAdded  += first + "':neuraltissue:'" + location + "/chat/neural_tissue.png'" + end;
		   numberAdded += 1;
		}

		if(bio == true){
		   whatNeedsAdded  += first + "':bio:'" + location + "/chat/biowaste.png'" + end;
		   numberAdded += 1;
		}

		if(rads == true){
		   whatNeedsAdded  += first + "':radio:'" + location + "/chat/radioactive_cells.png'" + end;
		   numberAdded += 1;
		}

		if(driods == true){
		   whatNeedsAdded  += first + "':droids:'" + location + "/chat/droid_modules.png'" + end;
		   numberAdded += 1;
		}

		if(optics == true){
		   whatNeedsAdded  += first + "':optical:'" + location + "/chat/optical_components.png'" + end;
		   numberAdded += 1;
		}

		if(bweapons == true){
		   whatNeedsAdded  += first + "':bweapons:'" + location + "/chat/battleweapon_parts.png'" + end;
		   numberAdded += 1;
		}

		if(weapons == true){
		   whatNeedsAdded  += first + "':weapons:'" + location + "/chat/weapons.png'" + end;
		   numberAdded += 1;
		}

		if(water == true){
		   whatNeedsAdded  += first + "':water:'" + location + "/chat/water.png'" + end;
		   numberAdded += 1;
		}

		if(slaves == true){
		   whatNeedsAdded  += first + "':slaves:'" + location + "/chat/slaves.png'" + end;
		   numberAdded += 1;
		}

		if(robots == true){
		   whatNeedsAdded  += first + "':robots:'" + location + "/chat/robots.png'" + end;
		   numberAdded += 1;
		}

		if(plastics == true){
		   whatNeedsAdded  += first + "':plastics:'" + location + "/chat/plastics.png'" + end;
		   numberAdded += 1;
		}

		if(packages == true){
		   whatNeedsAdded  += first + "':package:'" + location + "/chat/package.png'" + end;
		   numberAdded += 1;
		}

		if(ore == true){
		   whatNeedsAdded  += first + "':ore:'" + location + "/chat/ore.png'" + end;
		   numberAdded += 1;
		}

		if(metal == true){
		   whatNeedsAdded  += first + "':metal:'" + location + "/chat/metal.png'" + end;
		   numberAdded += 1;
		}

		if(med == true){
		   whatNeedsAdded  += first + "':med:'" + location + "/chat/med.png'" + end;
		   numberAdded += 1;
		}

		if(liquor == true){
		   whatNeedsAdded  += first + "':liquor:'" + location + "/chat/liquor.png'" + end;
		   numberAdded += 1;
		}

		if(gems == true){
		   whatNeedsAdded  += first + "':gems:'" + location + "/chat/gems.png'" + end;
		   numberAdded += 1;
		}

		if(gas == true){
		   whatNeedsAdded  += first + "':gas:'" + location + "/chat/gas.png'" + end;
		   numberAdded += 1;
		}

		if(fuel == true){
		   whatNeedsAdded  += first + "':fuel:'" + location + "/chat/fuel.png'" + end;
		   numberAdded += 1;
		}

		if(food == true){
		   whatNeedsAdded  += first + "':food:'" + location + "/chat/food.png'" + end;
		   numberAdded += 1;
		}
		
		if(explosives == true){
		   whatNeedsAdded  += first + "':explosives:'" + location + "/chat/explosives.png'" + end;
		   numberAdded += 1;
		}

		if(energy == true){
		   whatNeedsAdded  += first + "':energy:'" + location + "/chat/energy.png'" + end;
		   numberAdded += 1;
		}

		if(embros == true){
		   whatNeedsAdded  += first + "':embryos:'" + location + "/chat/embryos.png'" + end;
		   numberAdded += 1;
		}

		if(ematter == true){
		   whatNeedsAdded  += first + "':ematter:'" + location + "/chat/ematter.png'" + end;
		   numberAdded += 1;
		}

		if(elects == true){
		   whatNeedsAdded  += first + "':electronics:'" + location + "/chat/electronics.png'" + end;
		   numberAdded += 1;
		}

		if(stims == true){
		   whatNeedsAdded  += first + "':stimchip:'" + location + "/chat/stim_chip.png'" + end;
		   numberAdded += 1;
		}

		if(drugs == true){
		   whatNeedsAdded  += first + "':drugs:'" + location + "/chat/drugs.png'" + end;
		   numberAdded += 1;
		}
		   
		if(chems == true){
		   whatNeedsAdded  += first + "':chem:'" + location + "/chat/chem.png'" + end;
		   numberAdded += 1;
		}

		if(credits == true){
		   whatNeedsAdded  += first + "':$:'" + location + "/chat/credits_16x16.png'" + end;
		   numberAdded += 1;
		}

	   
		//finds any occurance of 'smilies: ' and replaces it with the added images.
		changesMade = changesMade.replace(/smilies: /g, whatNeedsAdded);
		
		//returns changesMade
		return changesMade;
	}

	//calls the modifyDoc function
	document.body.innerHTML = modifyDoc(document.body.innerHTML);

	//this will re-order the images
	var whatToAddAfter = document.getElementsByTagName("a");
	var endLink = whatToAddAfter[whatToAddAfter.length-2];
	var linkToAdd = document.createElement('a');

	var x = 1;
	if(topBottom == false)
		endLink = whatToAddAfter[whatToAddAfter.length-31];
		
	while(x<=numberAdded){
		linkToAdd = whatToAddAfter[instructionOffset];
		endLink.parentNode.insertBefore(linkToAdd, endLink.nextSibling);
		x += 1;
	}
}