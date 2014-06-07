// ==UserScript==
// @name        twitch emoji
// @namespace   caerulius
// @description adds twitch emotes for eti (taken from ryan entro's script and refactored)
// @require 	http://code.jquery.com/jquery-1.8.0.min.js
// @include     /https?:\/\/((boards|archives)\.)?endoftheinter\.net\/(showmessages|postmsg|inboxthread)\.php/
// @version     0.07
// ==/UserScript==
// If you want to add new emoji to the script, it's pretty self explanatory. Add the ID and the image url in the format you see here.
// Make sure it's the direct link to the image. Warning though, if I update the script and you install the latest one, any changes to
// your emoji list will be lost, unless you yell at me to add the new emoji or change the id.
var emoji = [];
	emoji["4Head"] = "http://i3.endoftheinter.net/i/n/221f3c2e164c0bd4ef6138e8c5b10651/chansub-global-emoticon-76292ac622b0fc38-20x30.png";
	emoji["ArsonNoSexy"] = "http://i3.endoftheinter.net/i/n/a041b069efc2ae88ae57fbc31b9e3f78/chansub-global-emoticon-e13a8382e40b19c7-18x27.png";
	emoji["AsianGlow"] = "http://i4.endoftheinter.net/i/n/3b573d58d0df8357a6a4b0546c70378e/chansub-global-emoticon-a3708d1e15c3f197-24x30.png";
	emoji["BCWarrior"] = "http://i4.endoftheinter.net/i/n/77ed3dd414ea0212aec5e9cc88d8c33e/chansub-global-emoticon-1e3ccd969459f889-29x27.png";
	emoji["BORT"] = "http://i1.endoftheinter.net/i/n/c6a98af59a055b6564c84da48bc8f62a/chansub-global-emoticon-6f9fa95e9e3d6a69-19x30.png";
	emoji["BibleThump"] = "http://i2.endoftheinter.net/i/n/9444108b87abb15f474e47eabd25561a/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png";
	emoji["BigBrother"] = "http://i4.endoftheinter.net/i/n/bd095393ce6bfdbceea813dc7a42981d/chansub-global-emoticon-63c10b84aaddd77c-24x30.png";
	emoji["BionicBunion"] = "http://i3.endoftheinter.net/i/n/a0712cca0ce9ebcf4706ade89cfd16e7/chansub-global-emoticon-740242272832a108-30x30.png";
	emoji["BlargNaut"] = "http://i1.endoftheinter.net/i/n/07b37ba32a02cd4840d5d3faf0e1cd0c/chansub-global-emoticon-a5293e92212cadd9-21x27.png";
	emoji["BloodTrail"] = "http://i4.endoftheinter.net/i/n/388f1c5750a9a48780ae7c4f4ada241e/chansub-global-emoticon-f124d3a96eff228a-41x28.png";
	emoji["BrainSlug"] = "http://i1.endoftheinter.net/i/n/cc3c47398e70154bcd1236dbc2f8f4dd/chansub-global-emoticon-d8eee0a259b7dfaa-30x30.png";
	emoji["BrokeBack"] = "http://i4.endoftheinter.net/i/n/36d132b5b639d4faf3f08608b241e916/emoticon-4057-src-770e3d6c306dda14-28x28.png";
	emoji["CougarHunt"] = "http://i3.endoftheinter.net/i/n/a5b6e54d2744c0948b462c763c85e1c6/chansub-global-emoticon-551cd64fc3d4590a-21x27.png";
	emoji["DAESuppy"] = "http://i3.endoftheinter.net/i/n/22350a8c7ce3551073bec2999a7e734c/chansub-global-emoticon-ef2a16bdc037bc91-28x28.png";
	emoji["DBstyle"] = "http://i3.endoftheinter.net/i/n/6fe9686489cda58c34bbad9b8d7b3fc1/chansub-global-emoticon-1752876c0d0ec35f-21x30.png";
	emoji["DansGame"] = "http://i1.endoftheinter.net/i/n/8e7f9098ee37b80535468fa300895d23/chansub-global-emoticon-ce52b18fccf73b29-25x32.png";
	emoji["DatSheffy"] = "http://i2.endoftheinter.net/i/n/1a34deaebb57247093ea5182c3583422/chansub-global-emoticon-bf13a0595ecf649c-24x30.png";
	emoji["DogFace"] = "http://i1.endoftheinter.net/i/n/8d637766301ef8d6fc11e0a4d5cdbf5a/chansub-global-emoticon-d0134a612162a147-22x28.png";
	emoji["EagleEye"] = "http://i4.endoftheinter.net/i/n/f56b51fa8cd7e3c6f9160abcff586058/chansub-global-emoticon-95eb8045e7ae63b8-18x27.png";
	emoji["EleGiggle"] = "http://i4.endoftheinter.net/i/n/b87cc67c3b7bb0e8ab6cf88e67532c43/emoticon-4339-src-07433e94eae8754e-28x28.png";
	emoji["EvilFetus"] = "http://i1.endoftheinter.net/i/n/458bd6208e4bc11d02ca0e3f0ee229f1/chansub-global-emoticon-484439fc20e0d36d-29x30.png";
	emoji["FPSMarksman"] = "http://i3.endoftheinter.net/i/n/6381464122c6ddbeee007f7e9d2d0308/chansub-global-emoticon-6c26a3f04616c4bf-20x27.png";
	emoji["FUNgineer"] = "http://i3.endoftheinter.net/i/n/a8afd17ee703546632441906401e6ffd/chansub-global-emoticon-731296fdc2d37bea-24x30.png";
	emoji["FailFish"] = "http://i1.endoftheinter.net/i/n/481fcbb60dd9cedf93a3f1f9ec5e3956/chansub-global-emoticon-c8a77ec0c49976d3-22x30.png";
	emoji["FrankerZ"] = "http://i2.endoftheinter.net/i/n/9359026f90e63485b2b855c51f713860/chansub-global-emoticon-3b96527b46b1c941-40x30.png";
	emoji["FreakinStinkin"] = "http://i4.endoftheinter.net/i/n/3ce5a891b9be0b25125c3cd3843bbb38/chansub-global-emoticon-d14278fea8fad146-19x27.png";
	emoji["FuzzyOtterOO"] = "http://i2.endoftheinter.net/i/n/57accbec1463d90c79bd0edec4a44b7e/chansub-global-emoticon-d141fc57f627432f-26x26.png";
	emoji["GingerPower"] = "http://i4.endoftheinter.net/i/n/339229c9070f0492dc890e9492847027/chansub-global-emoticon-2febb829eae08b0a-21x27.png";
	emoji["GrammarKing"] = "http://i2.endoftheinter.net/i/n/91638e893a32ce7c0547bec3542ea125/emoticon-3632-src-c3bf1bef4de9bb99-28x28.png";
	emoji["HassanChop"] = "http://i1.endoftheinter.net/i/n/035860bf63c85f56325525e9fc07423d/chansub-global-emoticon-22c6299e539344a9-19x28.png";
	emoji["HotPokket"] = "http://i4.endoftheinter.net/i/n/36a80ae512cb7a9935a589b84a4a9058/chansub-global-emoticon-55873089390f4a10-28x30.png";
	emoji["ItsBoshyTime"] = "http://i4.endoftheinter.net/i/n/740913d864bfd20c65d05ddb70e90c46/chansub-global-emoticon-e8e0b0c4e70c4fb8-18x18.png";
	emoji["JKanStyle"] = "http://i4.endoftheinter.net/i/n/f8244e3e19c4d2e01f129444e67596dd/chansub-global-emoticon-3a7ee1bc0e5c9af0-21x27.png";
	emoji["Jebaited"] = "http://i4.endoftheinter.net/i/n/33ee7e0f5c580863278a0a6dfb9649e1/chansub-global-emoticon-39dff1bb9b42cf38-21x30.png";
	emoji["JonCarnage"] = "http://i3.endoftheinter.net/i/n/28b70568d40d6e965558a722e1d52da8/chansub-global-emoticon-6aaca644ea5374c6-20x27.png";
	emoji["KZassault"] = "http://i2.endoftheinter.net/i/n/55d4723c20af01886633a534de000e43/emoticon-5248-src-914192574ba9feec-28x28.png";
	emoji["KZcover"] = "http://i2.endoftheinter.net/i/n/9b5e0f50c0da372ce1410aa77508a905/emoticon-5249-src-c649b1d10e887587-28x28.png";
	emoji["KZguerilla"] = "http://i3.endoftheinter.net/i/n/256a01141a8c5ccb6083227c23a126c6/emoticon-5250-src-da9dd1029955070e-28x28.png";
	emoji["KZhelghast"] = "http://i4.endoftheinter.net/i/n/7d33f24ff303cbf8f7fe0aefa9a21c19/emoticon-5251-src-a1596431098da5d4-28x28.png";
	emoji["KZowl"] = "http://i3.endoftheinter.net/i/n/6f5975d45634d58c88655e41f46f8103/emoticon-5252-src-437c1b59f74e39bc-28x28.png";
	emoji["KZskull"] = "http://i2.endoftheinter.net/i/n/df39088264a9b650873bdcfe6dab4ed9/emoticon-5253-src-7358e7adaec32ecc-28x28.png";
	emoji["Kappa"] = "http://i2.endoftheinter.net/i/n/929edc775011984a84a2ae7731f8720e/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png";
	emoji["Keepo"] = "http://i3.endoftheinter.net/i/n/6334973238ddb296cdc4ada8695cc2c5/chansub-global-emoticon-8eed21805f6217ce-27x29.png";
	emoji["KevinTurtle"] = "http://i3.endoftheinter.net/i/n/ec10ef8714cb1346fd7f616bc2b88266/chansub-global-emoticon-d530ef454aa17093-21x27.png";
	emoji["Kippa"] = "http://i2.endoftheinter.net/i/n/97d84f51c7f34136c3706087cfa7b1b7/chansub-global-emoticon-56a84f0e87c3d3a5-24x28.png";
	emoji["Kreygasm"] = "http://i1.endoftheinter.net/i/n/81f6ea38fb3118716b6b09ddfadef67d/chansub-global-emoticon-3a624954918104fe-19x27.png";
	emoji["MVGame"] = "http://i1.endoftheinter.net/i/n/82beab800146c6f8dbde5176af9c876c/chansub-global-emoticon-1a1a8bb5cdf6efb9-24x32.png";
	emoji["MrDestructoid"] = "http://i3.endoftheinter.net/i/n/29385e6d336a6ed0200bd1a08e4efabf/chansub-global-emoticon-ac61a7aeb52a49d3-39x27.png";
	emoji["NinjaTroll"] = "http://i2.endoftheinter.net/i/n/d492f8b4623242fa2c8b6a7997c8a4ec/chansub-global-emoticon-89e474822a976928-19x27.png";
	emoji["NoNoSpot"] = "http://i1.endoftheinter.net/i/n/0b05fc97a3fdcee86a4671405237b0b7/chansub-global-emoticon-179f310b0746584d-23x27.png";
	emoji["OMGScoots"] = "http://i1.endoftheinter.net/i/n/0751d146c4b7ecfe7cc0a5beda0e14ba/chansub-global-emoticon-e01723a9ae4fbd8b-22x28.png";
	emoji["OneHand"] = "http://i3.endoftheinter.net/i/n/624be42c5ba03c1b8de50955009126f1/chansub-global-emoticon-b6d67569a0c6340a-20x27.png";
	emoji["OpieOP"] = "http://i1.endoftheinter.net/i/n/81ddbd424ea0658bd9fa27c6ab886053/chansub-global-emoticon-21e708123d6a896d-21x30.png";
	emoji["OptimizePrime"] = "http://i3.endoftheinter.net/i/n/a6074fc75b8f223a977bd94b7007745e/chansub-global-emoticon-41f8a86c4b15b5d8-22x27.png";
	emoji["PJSalt"] = "http://i1.endoftheinter.net/i/n/8f27c53991dff904b4d824411be33054/chansub-global-emoticon-18be1a297459453f-36x30.png";
	emoji["PMSTwin"] = "http://i1.endoftheinter.net/i/n/88fbf4819acbffbaa0e6fc000f6917e4/chansub-global-emoticon-a33f6c484c27e249-23x30.png";
	emoji["PanicVis"] = "http://i1.endoftheinter.net/i/n/88e4fc2b3066f6f96229a40b82812fb6/emoticon-3668-src-f36f5a70b1c93a29-28x28.png";
	emoji["PazPazowitz"] = "http://i4.endoftheinter.net/i/n/7dc2503a9f3b02a1d7146a2c6fb43cd2/chansub-global-emoticon-521420789e1e93ef-18x27.png";
	emoji["PeoplesChamp"] = "http://i4.endoftheinter.net/i/n/b270ba24b4c0961aacadc2b796426f5f/emoticon-3412-src-76b6e3c79b31b696-28x28.png";
	emoji["PicoMause"] = "http://i4.endoftheinter.net/i/n/b270ba24b4c0961aacadc2b796426f5f/emoticon-3412-src-76b6e3c79b31b696-28x28.png";
	emoji["PipeHype"] = "http://i4.endoftheinter.net/i/n/f012c2fe08e02512c95be5aa287ec13f/emoticon-4240-src-d0c560fa27408dc7-28x28.png";
	emoji["PogChamp"] = "http://i2.endoftheinter.net/i/n/94e3041b03e57d6d46ca97cb381bc1ad/chansub-global-emoticon-60aa1af305e32d49-23x30.png";
	emoji["Poooound"] = "http://i2.endoftheinter.net/i/n/94e3041b03e57d6d46ca97cb381bc1ad/chansub-global-emoticon-60aa1af305e32d49-23x30.png";
	emoji["PunchTrees"] = "http://i3.endoftheinter.net/i/n/aa4070adb436ff83961717e44d0489f0/chansub-global-emoticon-b85003ffba04e03e-24x24.png";
	emoji["RalpherZ"] = "http://i3.endoftheinter.net/i/n/2cd11b438a2fe2c1de452c86077a8555/chansub-global-emoticon-3d9b59b17687288c-33x30.png";
	emoji["RedCoat"] = "http://i1.endoftheinter.net/i/n/4e3676507b87da9b00dcb0092f7fa9d4/chansub-global-emoticon-6b8d1be08f244e92-19x27.png";
	emoji["ResidentSleeper"] = "http://i3.endoftheinter.net/i/n/ec0f2310431275463c7d7a1097ecd492/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png";
	emoji["RitzMitz"] = "http://i4.endoftheinter.net/i/n/7951d5bd1b83ff78f4ff8a5d93ba0950/emoticon-4338-src-a741c02562405936-28x28.png";
	emoji["RuleFive"] = "http://i2.endoftheinter.net/i/n/1e2e0b0edd9d3a0f3e7d7ae00b37b7bb/chansub-global-emoticon-4e65703c52fb67b5-20x30.png";
	emoji["SMOrc"] = "http://i3.endoftheinter.net/i/n/2a860ee648fbaf8d86577ab70106aa5c/chansub-global-emoticon-9f276ed33053ec70-32x32.png";
	emoji["SMSkull"] = "http://i3.endoftheinter.net/i/n/6f129dfcf7eadcabfbcc0f0b8edd37ad/chansub-global-emoticon-50b9867ba05d1ecc-24x24.png";
	emoji["SSSsss"] = "http://i3.endoftheinter.net/i/n/6b3ae72b844f7a717b97ab915d5de002/chansub-global-emoticon-5d019b356bd38360-24x24.png";
	emoji["ShazBotstix"] = "http://i3.endoftheinter.net/i/n/6191dc2a3215a96e543aadeb3038e03f/chansub-global-emoticon-ccaf06d02a01a804-24x30.png";
	emoji["SoBayed"] = "http://i2.endoftheinter.net/i/n/97cbd6d8c8efbd2bd47649afa9d3ad9a/chansub-global-emoticon-efca3da7a499ac81-24x30.png";
	emoji["SoonerLater"] = "http://i4.endoftheinter.net/i/n/bafdbf3581456d7b43d4059dc2c47aa4/chansub-global-emoticon-696192d9891880af-23x30.png";
	emoji["StoneLightning"] = "http://i3.endoftheinter.net/i/n/e697cb04bcd85970b4f4f808ba1dcab3/chansub-global-emoticon-8b5aaae6e2409deb-20x27.png";
	emoji["StrawBeary"] = "http://i4.endoftheinter.net/i/n/fe6a9e4460c29385beb4d60e6dfbf2ca/chansub-global-emoticon-3dac9659e838fab2-20x27.png";
	emoji["SuperVinlin"] = "http://i3.endoftheinter.net/i/n/6187d28e2a79b5ecabd176345d787602/chansub-global-emoticon-92a1b848540e9347-23x27.png";
	emoji["SwiftRage"] = "http://i2.endoftheinter.net/i/n/9d24e489f8eeb4dc1689df6b039cea51/chansub-global-emoticon-680b6b3887ef0d17-21x28.png";
	emoji["TF2John"] = "http://i1.endoftheinter.net/i/n/0ba1efae9fbaac8d62ced7e73d59e380/chansub-global-emoticon-ffa884123ef70519-22x30.png";
	emoji["TehFunrun"] = "http://i4.endoftheinter.net/i/n/71ce77e3ea2f53e9356caae8864464e3/chansub-global-emoticon-a204e65775b969c5-27x27.png";
	emoji["TheRinger"] = "http://i1.endoftheinter.net/i/n/cc54ac72232ceaad042090cbc3878be2/chansub-global-emoticon-1903cc415afc404c-20x27.png";
	emoji["TheTarFu"] = "http://i4.endoftheinter.net/i/n/30f9b62e8537f6e578ad3d436ca3f688/chansub-global-emoticon-1fcfa48228bbd6ea-25x28.png";
	emoji["TheThing"] = "http://i4.endoftheinter.net/i/n/fd5372c27dbc1cdf64d9f5dc8284945f/emoticon-7427-src-f1278d0b66848536-28x28.png";
	emoji["ThunBeast"] = "http://i2.endoftheinter.net/i/n/d80fa5b99b401e3799fec1cd6627da5e/chansub-global-emoticon-1bae8ebfe6209a0c-26x28.png";
	emoji["TinyFace"] = "http://i2.endoftheinter.net/i/n/91708cfce07e32a9e6e90f52410f6feb/chansub-global-emoticon-b93007bc230754e1-19x30.png";
	emoji["TooSpicy"] = "http://i4.endoftheinter.net/i/n/3864921f14187c396382614d5d070e02/chansub-global-emoticon-f193772ca6e512f2-23x30.png";
	emoji["TriHard"] = "http://i3.endoftheinter.net/i/n/eef11f107d8375357d1d28651b984f8f/chansub-global-emoticon-6407e6947eb69e21-24x30.png";
	emoji["UleetBackup"] = "http://i2.endoftheinter.net/i/n/9d89a1af7406f98d97a399284e9f5e8a/chansub-global-emoticon-5342e829290d1af0-17x27.png";
	emoji["UnSane"] = "http://i3.endoftheinter.net/i/n/29afb41b839391417316c7887ac713ee/chansub-global-emoticon-4eea6f01e372a996-28x30.png";
	emoji["UncleNox"] = "http://i2.endoftheinter.net/i/n/9fc6e4cb1f70da28614794a88345b913/emoticon-3666-src-19af357000ae2b42-28x28.png";
	emoji["Volcania"] = "http://i3.endoftheinter.net/i/n/a656d45474c276d3d9cede78aea1f12e/chansub-global-emoticon-efbcc231b2d2d206-27x28.png";
	emoji["WTRuck"] = "http://i3.endoftheinter.net/i/n/e9d98d5bbeba2fd62c1ce82c35a42944/chansub-global-emoticon-f9ee1c9eb52375de-28x28.png";
	emoji["WholeWheat"] = "http://i4.endoftheinter.net/i/n/39d7cf63e77333ec7ffb0543a5ad0e1d/chansub-global-emoticon-89a30a213fe46f49-20x30.png";
	emoji["WinWaker"] = "http://i3.endoftheinter.net/i/n/2bcdbb20d8ba7660cd5bc09e0127684a/WinWaker.png";
	emoji["YouWHY"] = "http://i1.endoftheinter.net/i/n/c797d8eb4c96ff3d22ffd28b4db9e7b5/emoticon-4337-src-abba134ff81d77c7-28x28.png";
	emoji["aneleanele"] = "http://i4.endoftheinter.net/i/n/7edb2687e98dd83aab8a1a87b4149e50/emoticon-3792-src-1504dbbe3760173a-28x28.png";
// #################################################################################
// # do not edit below this block unless you want to break things and ruin my life #
// #################################################################################
var emojiHidden = true;
// Janky way of counting an array that consists of string based keys since the .length property only works on 'normal' numeric indexed arrays.
Array.prototype.strCount = function () {
	var cnt = -1;
	for(var fieldName in this)
	{
		cnt++;
	} 
	return cnt;
}
var emojiCounts = emoji.strCount();
// This is the CSS for both the emoji icon and the entire emoji panel. Will probably have to adjust the width if we begin to add new emoji.
GM_addStyle( "#emojiIcons { position: absolute; width: auto; height: auto; display: inline-block; margin-left: 1px } #phoneSmilies { position: absolute; width: 800px; height: auto; padding: 5px; border: black 4px dashed; border-width: thin; margin-top: -175px }" )
// Create the little emoji icon button that open and closes the emoji panel :^)
var emojiIcons = document.createElement('img');
emojiIcons.id = "emojiIcons";
emojiIcons.src = "http://i2.endoftheinter.net/i/n/9359026f90e63485b2b855c51f713860/chansub-global-emoticon-3b96527b46b1c941-40x30.png";
// I don't know how stressful the emoji panel generating is on the browser, so I only generate it once if I can.
// Once it's generated, it gets stored in your browser's local storage until a change to the emoji array is detected (adding/removing an emoji).
if (GM_getValue("emojiPanels") == undefined || GM_getValue("emojiPanelsCount") != emojiCounts)
{
	// Time to generate the large emoji panel.
	var phoneSmilies = document.createElement('div');
	phoneSmilies.id = "phoneSmilies";
	for (var key in emoji)
	{
		if (emoji.hasOwnProperty(key)) 
		{
			var newEmoji = document.createElement('img');
			newEmoji.className = 'taigaEmote';
			newEmoji.id = key;
			newEmoji.alt = key;
			newEmoji.src = emoji[key];
			
			phoneSmilies.appendChild(newEmoji);
		}
	}
	phoneSmilies.innerHTML = phoneSmilies.innerHTML + "<br />";
	var autoInsertSpan = document.createElement('span');
	autoInsertSpan.style = "font-size=6px;";
	autoInsertSpan.innerHTML = "auto-insert emoji?";
	phoneSmilies.appendChild(autoInsertSpan);
	var autoInsertInput = document.createElement('input');
	autoInsertInput.type = "checkbox";
	autoInsertInput.id = "autoinsert";
	autoInsertInput.value = "on";
	phoneSmilies.appendChild(autoInsertInput);
	
	GM_setValue("emojiPanels", phoneSmilies.outerHTML)
	GM_setValue("emojiPanelsCount", emojiCounts)
} else {
	phoneSmilies = GM_getValue("emojiPanels");
}
// The emoji panel already existed or just finished generating, time to insert everything.
$("textarea[name=message]").before(emojiIcons);
$("#emojiIcons").after("<br />");
$("textarea[name=message]").before(phoneSmilies);
// Set the emoji panel's background CSS to match the user's current skin.
$("#phoneSmilies").css("background-color", $("body").css('background-color'));
// This block checks to see if we've already stored the value for auto-insert for option persistence. False is the default.
var autoInsert = false;
if (GM_getValue("auto-insert") == undefined)
{
	GM_setValue("auto-insert", true)
	autoInsert = true;
} else {
	var autoInsert = GM_getValue('auto-insert');
}
// These next three blocks are just defining how the various buttons will toggle and set values.
if (autoInsert == true)
{
	$("#autoinsert").attr('checked', true);
}
$("#autoinsert").click(function(event) {
	autoInsert = !autoInsert;
	GM_setValue("auto-insert", autoInsert)
});
$("#emojiIcons").click(function(event) {
	if (emojiHidden) {
		$("#phoneSmilies").show();
	} else {
		$("#phoneSmilies").hide();
	}
	emojiHidden = !emojiHidden;
});
$("#phoneSmilies").hide();
// Auto-hide the emoji panel when you click post or preview.
$("input[name=post]").click(function(event) {
	emojiHidden = true;
	$("#phoneSmilies").hide();
});
$("input[name=preview]").click(function(event) {
	emojiHidden = true;
	$("#phoneSmilies").hide();
});
// These next three functions I found on a few random blogs after testing at least 10 different functions for each of these because no one could decide on which was the best, these are the only 3 that reliably worked.
$.fn.insertAtCaret = function (tagName) {
	return this.each(function(){
		if (document.selection) {
			//IE support
			this.focus();
			sel = document.selection.createRange();
			sel.text = tagName;
			this.focus();
		}else if (this.selectionStart || this.selectionStart == '0') {
			//MOZILLA/NETSCAPE support
			startPos = this.selectionStart;
			endPos = this.selectionEnd;
			scrollTop = this.scrollTop;
			this.value = this.value.substring(0, startPos) + tagName + this.value.substring(endPos,this.value.length);
			this.focus();
			this.selectionStart = startPos + tagName.length;
			this.selectionEnd = startPos + tagName.length;
			this.scrollTop = scrollTop;
		} else {
			this.value += tagName;
			this.focus();
		}
	});
};
(function($) {
	$.fn.getCursorPosition = function() {
		var input = this.get(0);
		if (!input) return; // No (input) element found
		if ('selectionStart' in input) {
			// Standard-compliant browsers
			return input.selectionStart;
		} else if (document.selection) {
			// IE
			input.focus();
			var sel = document.selection.createRange();
			var selLen = document.selection.createRange().text.length;
			sel.moveStart('character', -input.value.length);
			return sel.text.length - selLen;
		}
	}
})(jQuery);
new function($) {
  $.fn.setCursorPosition = function(pos) {
	if ($(this).get(0).setSelectionRange) {
	  $(this).get(0).setSelectionRange(pos, pos);
	} else if ($(this).get(0).createTextRange) {
	  var range = $(this).get(0).createTextRange();
	  range.collapse(true);
	  range.moveEnd('character', pos);
	  range.moveStart('character', pos);
	  range.select();
	}
  }
}(jQuery);
// This whole carat business is what gave me the most trouble I think, the whole text box gets replaced as soon as an emoji is found, but it seems seamless since the text cursor gets placed back where it was.
$(".taigaEmote").click(function(event) {
	if (emoji.hasOwnProperty(event.target.id)){
		$("textarea[name=message]").insertAtCaret('<img src="' + emoji[event.target.id] + '" />');
	};
});
// The following is black magic.
var postCheck = setInterval(function() {
	if (!autoInsert) { return; }
	
	var post = $("textarea[name=message]").val();
	
	var emojiRegEx = post.match(/:(?:[^:/]*):/g);
	var addPos = 0;
	if (emojiRegEx)
	{
		var newpost = post;
		$.each(emojiRegEx, function(i, value)
		{
			var emojiId = value.substr(0, value.length-1).substr(1);
			if (emoji[emojiId])
			{
				var curPos = $("textarea[name=message]").getCursorPosition();
				var imgLink = "<img src=\"" + emoji[emojiId] + "\" />";
				newpost = newpost.replace(value, imgLink);
				addPos = addPos + imgLink.length - value.length;
				
				$("textarea[name=message]").val(newpost);
				$("textarea[name=message]").setCursorPosition(curPos + addPos);
			}
		});
	}
}, 100);