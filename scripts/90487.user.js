// ==UserScript==
// @name           Titleizer
// @namespace      Titleizer
// @description    Gives Facepunch users the title they always wanted.
// @include        http://www.facepunch.com/threads/*
// @include        http://facepunch.com/threads/*
// Code originally taken from FurryFlagger, an addon by Siemens: http://www.facepunch.com/threads/1026437-FurryFlagger-Greasemonkey-Chrome-Userscript-extension
// @version		   1.2
// @require http://sizzlemctwizzle.com/updater.php?id=90487 id&days=1
/*
Copyright 2010 Charlie Somerville. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY CHARLIE SOMERVILLE ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHARLIE SOMERVILLE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Charlie Somerville.
*/
// ==/UserScript==


(function($,window,document,undefined) {


	$("li").each(function() {
			var $this = $(this);
			var username = $this.find("a.username").text();

			//BEGIN USER TITLE AREA
			if(username == "Computermaster"){
				titlePost($this, "", "<a href=\"http://www.facepunch.com/threads/1026464-Titleizer-Get-the-title-you-always-wanted\">Title Man</a>", "", "Blue", "18px", "bold");
			}
			if(username == "Forumaster"){
				titlePost($this, "", "<a href=\"http://www.facepunch.com/threads/1026464-Titleizer-Get-the-title-you-always-wanted\">Title Man</a>", "", "Blue", "18px", "bold");
			}
			if(username == "zatox9632"){
				titlePost($this, "Annoying 12 year old", "", "", "Blue", "16px", "");
			}
			if(username == "wingless"){
				titlePost($this, "Has a dickhead dad", "", "", "BlueViolet", "20px", "");
			}
			if(username == "The mouse"){
				titlePost($this, "Right Wing Hero", "", "", "Black", "16px", "");
			}
			if(username == "commander204"){
				titlePost($this, "General Weaboo", "<img src='http://www.facepunch.com/fp/emoot/3.gif'>", "<img src='http://www.facepunch.com/fp/emoot/3.gif'>", "Black", "16px", "");
			}
			if(username == "helpiminabox"){
				titlePost($this, "A title that gives me a self inflated sense of pride and ego on an internet forum for myself only", "", "", "Black", "16px", "");
			}
			if(username == "The mouse"){
				titlePost($this, "Right Wing Hero", "", "", "Black", "16px", "");
			}
			if(username == "SHOH"){
				titlePost($this, "Absolute Cock", "", "", "Black", "16px", "");
			}
			if(username == "MrAfroShark70"){
				titlePost($this, "I try to be smart when I can", "", "", "Black", "16px", "");
			}
			if(username == "Kaliber"){
				titlePost($this, "loser", "", "", "Black", "16px", "");
			}
			if(username == "triFeral"){
				titlePost($this, "lebron gaymes", "", "", "Black", "16px", "");
			}
			if(username == "itsDivine"){
				titlePost($this, "heh fake title wooh wait shit", "", "", "Black", "16px", ""); //Make it scroll once I figure that shit out
			}
			if(username == "littleicyman"){
				titlePost($this, "Blight on Humanity", "", "", "Black", "16px", "");
			}
			if(username == "Gorillaz"){
				titlePost($this, "Retarded Jap", "", "", "Black", "16px", "");
			}
			if(username == "SergeantDead"){
				titlePost($this, "Craptasket + BHB for Mod 2010", "", "", "Red", "24px", "");
			}
			if(username == "PrusseluskenV2"){
				titlePost($this, "Self-declared Mr. Awesome", "", "", "Black", "16px", "");
			}
			if(username == "CyrusTehSage"){
				titlePost($this, "Fucking Pikey", "", "", "Black", "16px", "");
			}
			if(username == "knutmora"){
				titlePost($this, "AKA DaMoggen", "", "", "Black", "16px", "");
			}
			if(username == "geogzm"){
				titlePost($this, "this script is for egotistical faggots", "", "", "Black", "16px", "");
			}
			if(username == "DainBramageStudios"){
				titlePost($this, "Beige Member", "", "", "Beige", "16px", "");
			}
			if(username == "Aide"){
				titlePost($this, "Platinum Member", "", "", "Silber", "16px", "");
			}
			if(username == "worm"){
				titlePost($this, "Orw orw, do us a trick Benji", "", "", "Black", "16px", "");
			}
			if(username == "Signature"){
				titlePost($this, "That was very special needs of you.", "", "", "Black", "16px", "");
			}
			if(username == "massaki"){
				titlePost($this, "Bastard Extraordinaire", "", "", "Black", "16px", "");
			}
			if(username == "MrOwn1"){
				titlePost($this, "LAL", "", "", "Red", "16px", "bold");
			}
			if(username == "Murkat"){
				titlePost($this, "God-Emporer of Dinosaurs", "", "", "Black", "16px", "");
			}
			if(username == "Pikablu07"){
				titlePost($this, "stutid fuckass", "", "", "Black", "16px", "");
			}
			if(username == "DuncanFrost"){
				titlePost($this, "weed owns", "", "", "Green", "16px", "");
			}
			if(username == "PILLS HERE!"){
				titlePost($this, "HOLY SHIT A 370Z VROOOOOOOM", "", "", "Black", "16px", "");
			}
			if(username == "Dachande"){
			titlePost($this, "NICEST GUY IN THE TF2 SECTION", "", "", "Violet", "18px", "bold");
			}
			if(username == "brickbox"){
			titlePost($this, "FUCKS ANYTHING THAT MOVES", "", "", "Red", "20px", "");
			}
			if(username == "Dalndox"){
			titlePost($this, "Cleanest ban history on FP", "", "", "Black", "14px", "");
			}
			if(username == "tisseman890"){
			titlePost($this, "Crime Rider", "", "", "Black", "16px", "");
			}
			if(username == "Smas"){
			titlePost($this, "The Fastest FireFox", "", "", "Black", "16px", "");
			}
			if(username == "Inacio"){
			titlePost($this, "Arrogant Brazilian Faggot", "", "", "Orange", "10px", "");
			}
			if(username == "Lord of Ears"){
			titlePost($this, "Professor of Wumbology", "", "", "Magenta", "16px", "");
			}
			if(username == "kayOkay"){
			titlePost($this, "Anarchy is not chaos", "", "", "Black", "16px", "");
			}
			if(username == "ashzu" || username == "ashxu"){
			titlePost($this, "K-on erryday", "", "", "Black", "16px", "");
			}
			if(username == "Elizer"){
			titlePost($this, "Aspiring Comedian", "", "", "Orange", "14px", "");
			}
			if(username == "Bomber9900"){
			titlePost($this, "I'm a bad poster and I don't give a shit.", "", "", "Black", "16px", "");
			}
			if(username == "onforty"){
			titlePost($this, "Flying Penis of Doom", "", "", "Black", "16px", "");
			}
			if(username == "Asaratha"){
			titlePost($this, "Blue Member", "", "", "Black", "16px", "");
			}
			if(username == "bODYbAGZ"){
			titlePost($this, "BLAAAAA", "", "", "Red", "20px", "");
			}
			if(username == "nanutek"){
			titlePost($this, "You're one ugly motherfucker", "", "", "Black", "16px", "bold");
			}
			if(username == "QuickSnapz"){
			titlePost($this, "Can I cook mine?", "", "", "Blue", "16px", "bold");
			}
			if(username == "minicunga"){
			titlePost($this, "Pink Member", "", "", "Pink", "10px", "");
			}
			if(username == "tehMuffinMan"){
			titlePost($this, "if i call someone an idiot it;s ironic", "", "", "Red", "16px", "bold");
			}
			if(username == "Zondac"){
			titlePost($this, "Weeabro", "", "", "Black", "16px", "");
			}
			if(username == "Suzune"){
			titlePost($this, "Blue Member", "", "", "Blue", "16px", "");
			}
			if(username == "ham!"){
			titlePost($this, "I'm an Arse", "", "", "Red", "20px", "bold");
			}
			if(username == "coolrider102"){
			titlePost($this, "Gold Mebner", "", "", "Gold", "12px", "");
			}
			if(username == "Onyx3173"){
			titlePost($this, "Fucking Cacodemons, how do they work?", "", "", "Orange", "10px", "");
			}
			if(username == "Mac2468"){
			titlePost($this, "GOLDEN FAGGOT", "", "", "Gold", "16px", "bold");
			}
			if(username == "DiscoBiscut"){
			titlePost($this, "LET'S GO MUDDIN!", "", "", "Red", "16px", "bold");
			}
			if(username == "Conro101"){
			titlePost($this, "Robot Ocarina Doctor", "", "", "Black", "16px", "");
			}
			if(username == "Corporal Yippie"){
			titlePost($this, "stop the car", "", "", "Red", "16px", ""); //Flashy
			}
			if(username == "Skunky"){
			titlePost($this, "I'm not a fucking furfag.", "", "", "Orange", "16px", "");
			}
			if(username == "Adrien Brody."){
			titlePost($this, "I want my name to be Spaghetti", "", "", "Black", "12px", "");
			}
			if(username == "Lebowski"){
			titlePost($this, "Jewish Rage Machine", "", "", "Blue", "16px", "bold");
			}
			if(username == "TheSpy"){
			titlePost($this, "I'm a god damn Cuban!", "", "", "Black", "16px", "");
			}
			if(username == "Nerdrage"){
			titlePost($this, "Internet wise-ass", "", "", "Black", "16px", "");
			}
			if(username == "WeekendWarrior"){
			titlePost($this, "+5 Renegade", "", "", "Red", "16px", "bold");
			}
			if(username == "Hunterdnrc"){
			titlePost($this, "Holy balls I have a title", "", "", "Black", "16px", "");
			}
			if(username == "Atokniro"){
			titlePost($this, "THE MAN", "", "", "Black", "16px", "bold");
			}
			if(username == "TehSpah"){
			titlePost($this, "sandvich.no-ip.org - Minecraft", "", "", "Black", "16px", "");
			}
			if(username == "Saza"){
			titlePost($this, "100% GEENYUS", "", "", "Black", "16px", "bold");
			}
			if(username == "Nohj"){
			titlePost($this, "I tried spelling the name john backwards and this is what I ended up with.", "", "", "Black", "16px", "");
			}
			if(username == "ROFLBURGER"){
			titlePost($this, "Shitposter of the Year", "", "", "Black", "16px", "");
			}
			if(username == "FFStudios"){
			titlePost($this, "Ragnar", "", "", "Black", "16px", "");
			}
			if(username == "Jack Trades"){
			titlePost($this, "Self-Proclaimed Mastermind", "", "", "Black", "16px", "");
			}
			if(username == "gerbile5"){
			titlePost($this, "I play drums, also tf2 is gay", "", "", "Black", "16px", "");
			}
			if(username == "silentjubjub"){
			titlePost($this, "Get This Fucking Title Off Of Me", "", "<img src='http://www.facepunch.com/fp/emoot/mad.gif'>", "Red", "16px", ""); 
			}
			if(username == "little.sparrow"){
			titlePost($this, "COMPLETE WUSS", "", "", "Black", "16px", "");
			}
			if(username == "Leaf Runner"){
			titlePost($this, "Internet Nerd Famous", "<img src='http://www.facepunch.com/fp/emoot/c00lbert.gif'>", "<img src='http://www.facepunch.com/fp/emoot/c00lbert.gif'>", "Green", "18px", "");
			}
			if(username == "CSG172"){
			titlePost($this, "Totally Random Title", "", "", "Black", "16px", "");
			}
			if(username == "Louis"){
			titlePost($this, "Flaming Homosexual", "", "", "Red", "16px", "bold");
			}
			if(username == ".kurozael"){
			titlePost($this, "Lua King Since 2004", "", "", "Aqua", "16px", "");
			}
			if(username == "Zantze"){
			titlePost($this, "Keijo The Man", "", "", "Black", "16px", "");
			}
			if(username == "Baldr"){
			titlePost($this, "Troll", "", "", "Black", "16px", "");
			}
			if(username == "Matthew0505"){
			titlePost($this, "BLUE FAGGOT", "", "", "Blue", "16px", "bold");
			}
			if(username == "darth-veger"){
			titlePost($this, "JC, it's a bong", "", "", "Green", "16px", "");
			}
			if(username == "sphinxa279"){
			titlePost($this, "", "<a href=\"http://www.facepunch.com/threads/1014830-The-Bivium-Part-1-Map\">Thread Derailer Extraordinaire</a> ", "", "Blue", "18px", ""); 
			}
			if(username == "One Silly Mouse"){
			titlePost($this, "DealExtreme Erryday", "", "", "Black", "16px", "");
			}	
			if(username == "FPChris"){
			titlePost($this, "Problem?", "", "", "Black", "16px", "");
			}
			if(username == "psychocyclone85"){
			titlePost($this, "Odd Fellow", "", "", "Red", "16px", "");
			} 
			if(username == "H4lf-D3ad"){
			titlePost($this, "H4lf-Al1ve", "", "", "Red", "16px", "");
			} 
			if(username == "Asphyxia"){
			titlePost($this, "Philosophy", "", "", "Green", "18px", "");
			} 
			if(username == "hamberglar"){
			titlePost($this, "International diamond thief", "", "", "Black", "16px", "");
			} 
			if(username == "rapperkid04"){
			titlePost($this, "I can make you a PUA. Ask me how!", "", "", "Black", "10px", "");
			} 
			if(username == "The Advisor"){
			titlePost($this, "BEEF", "", "", "Black", "16px", "");
			} 
			if(username == "Rellow"){
			titlePost($this, "", "<a href=\"http://www.facepunch.com/threads/1027053-Facepunch-US-Server?p=26172772&viewfull=1#post26172772\">Onii-chan</a>", "", "Black", "16px", "");
			} 
			if(username == "BobbyHill"){
			titlePost($this, "Handsome British since 1989", "", "", "Black", "16px", "");
			} 
			if(username == "radiomonster"){
			titlePost($this, "WHAT DO THE NUMBERS MEAN", "", "", "Red", "16px", "");
			} 
			if(username == "Firegod522"){
			titlePost($this, "Releases everything but a map", "", "", "Black", "16px", "");
			} 
			if(username == "billyman"){
			titlePost($this, "Releases everything but a map", "", "", "Black", "16px", "");
			} 
			if(username == "Fatfatfatty"){
			titlePost($this, "", "<a href=\"http://www.facepunch.com/threads/1029056-Microsoft-claims-Linux-at-end-of-life-cycle?p=26204110&viewfull=1#post26204110\">I managed to fuck up Ubuntu</a>", "", "Purple", "16px", "bold");
			} 
			if(username == "qwerty000"){
			titlePost($this, "", "<img src='http://www.facepunch.com/fp/emoot/pcgaming.gif'>", "", "Black", "16px", "");
			} 
			if(username == "WebOfTrust"){
			titlePost($this, "Web Of LIES", "", "", "Black", "16px", "");
			}
			if(username == "Pyth"){
			titlePost($this, "The Ekete", "", "", "Black", "16px", "");
			}
			if(username == "Moosey Fate!"){
			titlePost($this, "I'm not a malefactor, I'm a lagomorph!", "", "", "Black", "11px", "Bold");
			}
			if(username == "mars7a"){
			titlePost($this, "Fourth Planet from the Sun", "", "", "Dark Red", "10px", "Bold");
			}
			if(username == "MOEWTFLOL"){
			titlePost($this, "OH GOD HOW DID THIS HAPPEN I AM NOT GOOD WITH COMPUTER", "", "", "Black", "16px", "");
			}
			if(username == "Itsjustguy"){
			titlePost($this, "Merry X-Mas FP!", "", "", "Red", "16px", "");
			}
			
		});
		
		/*Default title settings for copypasta
		if(username == ""){
			titlePost($this, "", "", "", "Black", "16px", "");
			}                               */

	function titlePost(post, UserTitle, append, prepend, color, size, weight)
	{		
		var userinfo = post.find(".userinfo");
		var title = userinfo.find(".usertitle");	
		var FW;
		if(weight == ""){
			FW = "normal";
		}
		else{
			FW = weight;
		}
		title.text(UserTitle).css("font-weight", FW).css("font-size", size).css("color", color);
		$(prepend).prependTo(title);
		$(append).appendTo(title);
	}

})(unsafeWindow.jQuery, window, window.document);