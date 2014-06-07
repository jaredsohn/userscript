// ==UserScript==
// @name       Ultibot's Heartbot Refiller
// @namespace  http://kol.ultimater.net/heartbot-refiller
// @version    1.1
// @description  Makes it easy for you to refill Heartbot with gift items in your inventory via kmail.
// @include	http://www.kingdomofloathing.com/sendmessage.php*
// @include	*127.0.0.1:*/sendmessage.php*
// @author  ultimater at gmail dot com
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @copyright April 12th 2012
// ==/UserScript==


var gift_item_db="\nAll-purpose flower\nAmulet of Yendor\nAngel-food cake\nAnniversary balloon\nAnniversary gift box\nApathetic lizardman doll\nArrow'd heart balloon\nBabycakes\nBag of airline peanuts\nBeautiful soup\nBejeweled cufflinks\nBest joke ever\nBetter Than Cuddling Cake\nBindle of joy\nBirthday party jellybean cheesecake\nBlack candy heart\nBlack lotus\nBlack velvet box\nBlack-and-blue light\nBlended frozen swill with a fly in it\nBlue plasma ball\nBlue velvet cake\nBouquet of circular saw blades\nBoxing-glove-in-a-box\nBrick\nCalle de miel with a fly in it\nCheap studded belt\nChocolate box\nChocolate-covered diamond-studded roses\nClown hammer\nClub necklace\nCongratulatory cake\nCrimbo Candy Cookbook\nCryptic puzzle box\nCymbal syrup\nDaisy\nDeadly nightshade\nDefective skull\nDesigner handbag\nDevil's-food cake\nDiamond necklace\nDNOTC Box\nDouble daisy\nDaisy\nDeadly nightshade\nDefective skull\nDesigner handbag\nDevil's-food cake\nDiamond necklace\nDNOTC Box\nDouble daisy\nFake fake vomit\nFake hand\nFancy opera glasses\nFlavored foot massage oil\nFoam dart\nForeign box\nGarish pinky ring\nGiant designer sunglasses\nGiant diamond ring\nGiant stuffed bugbear\nGift-a-pult\nGift-a-pult Messages (A-E)\nGift-a-pult Messages (F-N)\nGift-a-pult Messages (O-Z)\nGift-a-pult Messages (stuffed)\nGilded lily\nGreen balloon\nHappy Birthday, Claude! cake\nHeart necklace\nHeart-shaped balloon\nHelm of the white knight\nHumpty Dumplings\nInnuendo\nInsane tophat\nJack-in-the-box\nJazz soap\nJoybuzzer\nKevlar balloon\nLeft half of a heart necklace\nLess-than-three-shaped box\nLobster qua Grill\nLong-stemmed rose\nLoudmouth Larry Lamprey\nMae West with a fly in it\nMagical ice cube with a fly in it\nMagnetic field\nMandarina colada with a fly in it\nMicroplushie: Bropane\nMicroplushie: Dorkonide\nMicroplushie: Ermahgerdic Acid\nMicroplushie: Fauxnerditide\nMicroplushie: Gothochondria\nMicroplushie: Hippylase\nMicroplushie: Hipsterine\nMicroplushie: Hobomosome\nMicroplushie: Otakulone\nMicroplushie: Raverdrine\nMicroplushie: Sororitrate\nMini-zeppelin\nMiniature coffin\nMiniature stuffed Goth Giant\nMissing wine\nMoist sack\nMood ring\nMr. Balloon\nMugcake\nMylar balloon\nMysterious present\nPeanut brittle shield\nPerpendicular hula with a fly in it\nPersonal massager\nPersonalized birthday cake\nPersonalized coffee mug\nPet rock \"Groucho\" disguise\nPet rock \"Snooty\" disguise\nPlain brown wrapper\nPlush alielf\nPlush alien hamsterpus\nPlush dogcat\nPlush ferrelf\nPlush hamsterpus\nPlush mutated alielephant\nPlush mutated alielf\nPotted cactus\nPotted fern\nPrussian cathouse with a fly in it\nPuff of smoke\nRaffle prize box\nRaggedy Hippy doll\nRat head balloon\nRed balloon\nRed Rover BB gun\nRed-and-green sweater\nRefrigerated biohazard container\nRight half of a heart necklace\nRockin' wagon with a fly in it\nRubber emo roe\nRubber WWBD? bracelet\nRubber WWJD? bracelet\nRubber WWSPD? bracelet\nRubber WWtNSD? bracelet\nSlap and tickle with a fly in it\nSolid asbestos box\nSolid chrome box\nSolid linoleum box\nSorority girl's box\nSpade necklace\nStick-on eyebrow piercing\nStuffed angry cow\nStuffed astral badger\nStuffed baby gravy fairy\nStuffed bandersnatch\nStuffed Baron von Ratsworth\nStuffed can of asparagus\nStuffed carpenter\nStuffed caterpillar\nStuffed Cheshire bitten\nStuffed club\nStuffed cocoabo\nStuffed crazy bastard sword\nStuffed dodecapede\nStuffed dodo\nStuffed flaming gravy fairy\nStuffed frozen gravy fairy\nStuffed ghuol whelp\nStuffed hand turkey\nStuffed Hodgman\nStuffed key\nStuffed MagiMechTech MicroMechaMech\nStuffed martini\nStuffed Meat\nStuffed mind flayer\nStuffed mink\nStuffed Mob Penguin\nStuffed monocle\nStuffed ninja snowman\nStuffed pocketwatch\nStuffed porpoise\nStuffed sabre-toothed lime\nStuffed scary death orb\nStuffed sleazy gravy fairy\nStuffed snowy owl\nStuffed spooky gravy fairy\nStuffed stab bat\nStuffed stinky gravy fairy\nStuffed teddy butler\nStuffed tin of caviar\nStuffed treasure chest\nStuffed undead elbow macaroni\nStuffed walrus\nStuffed yeti\nStuffed yo-yo\nStuffed zmobie\nTangarita with a fly in it\nTapped black lotus\nThe finger\nThought balloon\nThree-tiered wedding cake\nTrousers of the white knight\nTulip\nUrinal cake\nValentine\'s Day cake\nVenus flytrap\nVial of jus de larmes\nWalrus ice cream\nWarehouse 23 crate\nWhite balloon\nWhoopie cushion\nWind-up chattering teeth\nWristwatch of the white knight\nX-ray specs\nYellow snowcone\n";

function getForm(n)
{
    var forms=document.getElementsByTagName('form');
    for(var i=0;i<forms.length;i++)if(forms[i].getAttribute('name')==n)return forms[i];
    return null;
}
function getElByName(form,name)
{
    var inputs=form.getElementsByTagName('*');
    for(var i=0;i<inputs.length;i++)if(inputs[i].getAttribute('name')==name)return inputs[i];
    return null;
}

//1189
var form=getForm('messagesend');

function activateGiftMode()
{
    //var pwdInput=getInputElementByName(form,'pwd');
    //var pwd=pwdInput.value;
var e=getElByName(form,'whichitem1');
var options=e.getElementsByTagName('option');
var found=[];
function itemTextToItemAndNumber(str,id,i)
{
    var m=str.match(/^(.+) \((\d+)\)$/);
    if(m)
        return {name:m[1],number:m[2],id:id,i:i};
    return {name:'',number:0,id:0,i:0};
}

var item_db_lowercase=gift_item_db.toLowerCase();
for(var i=1;i<options.length;i++)
{
    var item=itemTextToItemAndNumber(options[i].text,options[i].value,i);
    if(item_db_lowercase.indexOf("\n"+item.name.toLowerCase()+"\n")!==-1)found.push(item);
}

/*
    var x=new XMLHttpRequest();
var forPurpose='Ultibot-inventory-gift-item-list-kmail-sender-to-heart-bot';
//x.open('GET','/api.php');
    x.open('GET','/api.php?what=item&id='+1189+'&for='+forPurpose);//?what=inventory&for=Ultibot-inventory-gift-item-list-kmail-sender-to-heart-bot');
    //x.setRequestHeader(header, params.headers[header]);
    x.withCredentials = true;
    x.onreadystatechange=function()
    {
        if(x.readyState!=4)return;
        alert(x.responseText);
    };
    x.send(null);
*/

Array.prototype.shuffle = function() {
 	var len = this.length;
	var i = len;
	 while (i--) {
	 	var p = parseInt(Math.random()*len);
		var t = this[i];
  	this[i] = this[p];
  	this[p] = t;
 	}
};

found.shuffle();

getElByName(form,'towho').value='heartbot';
for(var i=0;i<found.length&&i<11;i++)
{
if(i>0&&document.getElementById("item11").innerHTML.length<1){unsafeWindow.addlist();}
getElByName(form,'whichitem'+(i+1)).selectedIndex=found[i].i;
getElByName(form,'howmany'+(i+1)).value=found[i].number;
}


}


var e=document.createElement('input');
e.type='button';
e.value='Refill Heartbot';
e.onclick=function(){
activateGiftMode();
};
var t=getElByName(form,'message');
var br=document.createElement('br');
t.parentNode.insertBefore(br,t.nextSibling);
t.parentNode.insertBefore(e,br.nextSibling);