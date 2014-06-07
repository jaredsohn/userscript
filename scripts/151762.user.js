// ==UserScript==
// @name          Raycore Spam Bot
// @namespace     yiffyiffyiff.com
// @include       http://www.surveymonkey.com/*
// ==/UserScript==
  
   
var WORDS = new Array();
WORDS[0] = "system of capitalism presumes sound money, not fiat money manipulated by a central bank. Capitalism cherishes voluntary contracts and interest rates that are determined by savings, not credit creation by a central bank.";
WORDS[1] = "I am absolutely opposed to a national ID card. This is a total contradiction of what a free society is all about. The purpose of government is to protect the secrecy and the privacy of all individuals, not the secrecy of government. We don't need a national ID card.";
WORDS[2] = "When the federal government spends more each year than it collects in tax revenues, it has three choices: It can raise taxes, print money, or borrow money. While these actions may benefit politicians, all three options are bad for average Americans.";
WORDS[3] = "You wanna get rid of drug crime in this country? Fine, let's just get rid of all the drug laws."
WORDS[4] = "The moral and constitutional obligations of our representatives in Washington are to protect our liberty, not coddle the world, precipitating no-win wars, while bringing bankruptcy and economic turmoil to our people.";
WORDS[5] = "if you like small government you need to work hard at having a strong national defense that is not so militant. Personal liberty is the purpose of government, to protect liberty - not to run your personal life, not to run the economy, and not to pretend that we can tell the world how they ought to live.";
WORDS[6] = "I am just absolutely convinced that the best formula for giving us peace and preserving the American way of life is freedom, limited government, and minding our own business overseas.";
WORDS[7] = "Cliches about supporting the troops are designed to distract from failed policies, policies promoted by powerful special interests that benefit from war, anything to steer the discussion away from the real reasons the war in Iraq will not end anytime soon.";
WORDS[8] = "1913 wasn't a very good year. 1913 gave us the income tax, the 16th amendment and the IRS.";
WORDS[9] = "Deficits mean future tax increases, pure and simple. Deficit spending should be viewed as a tax on future generations, and politicians who create deficits should be exposed as tax hikers.";
WORDS[10] = "When one gets in bed with government, one must expect the diseases it spreads.";
WORDS[11] = "Setting a good example is a far better way to spread ideals than through force of arms.";
WORDS[12] = "Capitalism should not be condemned, since we haven't had capitalism.";
WORDS[13] = "have you noticed the debt is exploding? And it's not all because of Medicare.";
WORDS[14] = "Legitimate use of violence can only be that which is required in self-defense.";
WORDS[15] = "Our country's founders cherished liberty, not democracy.";
WORDS[16] = "Well, I don't think we should go to the moon. I think we maybe should send some politicians up there.";
WORDS[17] = "I have some help on tweeting.";
WORDS[18] = "I'd like to think of myself as the flavor of the decade.";
WORDS[19] = "I would say that I'm pretty mainstream.";
WORDS[20] = "I'd like to think of myself as the flavor of the decade.";
WORDS[21] = "You don't quit because you happen to be behind. You want to see how you do. And who knows? Maybe somebody will stumble.";
WORDS[22] = "The most important element of a free society, where individual rights are held in the highest esteem, is the rejection of the initiation of violence.";
WORDS[23] = "As recent as the year 2000 we won elections by saying we shouldn't be the policemen of the world, and that we should not be nation building. And its time we got those values back into this country.";
WORDS[24] = "Well, I don't think we should go to the moon. I think we maybe should send some politicians up there.";
WORDS[25] = "When things go badly, individuals look for scapegoats. I just do not believe that barbed-wire fences or guns on our border will solve any of our problems.";
WORDS[26] = "What is not conservative about saying, 'Don't go to war unless we go to war properly with a full declaration of war and no other way?";
WORDS[27] = "Throughout the 20th century, the Republican Party benefited from a non-interventionist foreign policy. Think of how Eisenhower came in to stop the Korean War. Think of how Nixon was elected to stop the mess in Vietnam.";
WORDS[28] = "Think of what happened after 9/11, the minute before there was any assessment, there was glee in the administration because now we can invade Iraq, and so the war drums beat.";
WORDS[29] = "There's nothing wrong with being a Conservative and coming up with a Conservative believe in foreign policy where we have a strong national defense and we don't go to war so carelessly.";
WORDS[30] = "DESU DESU DESU DESU DESU DESU DESU DESU DESU DESU DESU";
WORDS[31] = "MOAR HOMO";
WORDS[32] = "We are not from VTC. SMD.";
WORDS[33] =	"Come at me bro";
WORDS[34] = "Did you vote today?";
WORDS[35] = "Once apon a midnight";

function Bot()
{
	del_cookie("R_35846735");
	window.location = "http://www.surveymonkey.com/s/68X5GLG";
	var rand = Math.floor((Math.random()*8));
	document.getElementsByClassName("selImg")[rand].click();
	if(rand == 7)
	{
		document.getElementById("other_459780820_5350377820").value= "Rusty";
	} 
	var rand2 = Math.floor((Math.random()*36)); 
	document.getElementById("text_459781200_0").value= WORDS[rand2];
	document.getElementById("NextButton").click();	
}


function del_cookie(name)
{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

   (document.onload = function Loop() {
        var rand = Math.floor((Math.random()*1000)+ 2000);
        setTimeout(function() {
                Bot();
                Loop();  
        }, rand);
    }());