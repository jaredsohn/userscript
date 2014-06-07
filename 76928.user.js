// ==UserScript==
// @name           petpoint.com - intake release form
// @namespace      http://www.petpoint.com
// @description    fixes invisible waiver section on intake form for Firefox
// @include        http://*.petpoint.com/*ReportID=*
// ==/UserScript==

//get the page request information from the URL
var query = window.location.search.substring(1);
//split the different parameters
var parms = query.split('&');
//set up the array
var replace_text_report = []
//initialize the report id
var report_id = 0;
for (var i=0; i<parms.length; i++) {
	var pos = parms[i].indexOf('=');
	if (pos > 0) {
		if (parms[i].substring(0,pos) == 'ReportID') {
			report_id = parms[i].substring(pos+1);
		}
	}
}


//report 6 spay/neuter waiver
replace_text_report[6] = '<HR /><BR />Signature ______________________&nbsp;&nbsp;Extended Date __________________&nbsp;&nbsp;Clinic Name____________________<BR /><BR /> \
*This waiver must be sent in within 30 days of adoption in order to extend your spay or neuter surgery date.&nbsp;&nbsp;Once the surgery is complete within the extended period, you must send in the voucher to confirm the surgery.<BR />';


//report 7 spay/neuter voucher
replace_text_report[7] = '<HR /><BR />Signature ______________________&nbsp;&nbsp;Date _____________________&nbsp;&nbsp;Stamp _______________________&nbsp;&nbsp;<BR /><BR /> \
*This certificate of confirmation must be sent to the Lee County Humane Society within 30 days of your adoption date to verify that your animal has been spayed or neutered.&nbsp;&nbsp;If the waiver has been sent in to extend the 30 days, then this certificate of confirmation must be sent in after the surgery is complete, but still within the extended time period allocated by your veterinarian.<BR /> \
<B>** Spay or neuter surgeries will be performed at the adopters expense. The purpose of this certificate is to provide confirmation that the adopter is in compliance with the mandatory spay or neuter requirement of the LCHS.**</B><BR /> \
<B>**This is not a coupon and therefore does not represent a discount for the spay or neuter surgery.**</B><BR />';


//report 9 receipt print
replace_text_report[9] = '<style type="text/css"> \
	tr.head td { \
		font-style: normal; \
		font-weight: bold; \
	} \
	tr td { \
		font-style: italic; \
	} \
</style> \
<HR> \
<TABLE> \
	<TR class=\'head\'> \
		<TD width=\'20%\'>Initials:</TD> \
		<TD width=\'10%\'>P/F</TD> \
		<TD width=\'20%\'>Initials:</TD> \
		<TD width=\'10%\'>P/F</TD> \
		<TD width=\'25%\'>Grade</TD> \
		<TD width=\'15%\'>&nbsp;</TD> \
	</TR> \
	<TR class=\'head\'> \
		<TD>Health Assessment</TD> \
		<TD>Y/N</TD> \
		<TD>RW Behavior Test</TD> \
		<TD>Grade</TD> \
		<TD>Unfavorable --- Favorable</TD> \
		<TD>Initials:</TD> \
	</TR> \
	<TR> \
		<TD>Wounds/Scarring</TD> \
		<TD>____</TD> \
		<TD>Kennel</TD> \
		<TD>____</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Eye/Nasal Discharge</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Tumors/Lumps</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Skin Conditions</TD> \
		<TD>____</TD> \
		<TD>Yard</TD> \
		<TD>____</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Swelling</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Diarrhea/Vomiting</TD> \
		<TD>____</TD> \
		<TD>Reaction</TD> \
		<TD>____</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Coughing</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Leash Walking</TD> \
		<TD>____</TD> \
		<TD>Food</TD> \
		<TD>____</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Limping/Abnormal Gait</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Temperature</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Pregnancy</TD> \
		<TD>____</TD> \
		<TD>Toy</TD> \
		<TD>____</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Spay/Neuter</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Ear Filth</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Teeth</TD> \
		<TD>____</TD> \
		<TD>Body Handling</TD> \
		<TD>____</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Age</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Handling</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Pyrantel</TD> \
		<TD>____</TD> \
		<TD>Dog-Dog</TD> \
		<TD>____</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Da2PPv</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Bordatella</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
	<TR> \
		<TD>Heartworm Tests</TD> \
		<TD>____</TD> \
		<TD>&nbsp;</TD> \
		<TD>&nbsp;</TD> \
		<TD align=\'center\'>1 --- 2 --- 3 --- 4 --- 5</TD> \
		<TD>____</TD> \
	</TR> \
</TABLE>';


//report 10 owner/guardian surrender
replace_text_report[10] = '<HR> \
<b>Please read and initial:</b><br /> \
<br /> \
<br /> \
<br /> \
I hereby relinquish all ownership rights to the animal described herein to the custody of the Lee County Humane Society for disposition at their discretion.<br /> \
<br /> \
Initial:__________<br /> \
<br /> \
<br /> \
I certify that to the best of my knowledge this animal has not bitten anyone in the last 14 days.<br /> \
<br /> \
Initial:____________<br /> \
<br /> \
<br /> \
I also understand that no further information will be given out to me concerning this animal.<br /> \
<br /> \
Initial:____________<br /> \
<br /> \
<br /> \
<br /> \
<br /> \
I would like to make a donation to the Lee County Humane Society to contribute to the care of this animal and the more than 6,000 animals that visit LCHS each year:<br /> \
<br /> \
<br /> \
Donation amount:_____________________<br /> \
<br /> \
Thank you for your generosity!<br /> \
<br /> \
<br /> \
<br /> \
Signature ________________________<br />';

//report 11 transfer in
replace_text_report[11] = '';

//report 12 return
replace_text_report[12] = '<HR /><BR /><B>Please read and initial:</B><BR /><BR /><BR /><BR />I hereby relinquish all ownership rights to the animal described herein to the custody of the Lee County Humane Society for disposition at their discretion.<BR /><BR />Initial:__________<BR /><BR />I certify that to the best of my knowledge this animal has not bitten anyone in the last 14 days.<BR /><BR />Initial:____________<BR /><BR />I also understand that no further information will be given out to me concerning this animal.<BR /><BR />Initial:____________<BR /><BR /><BR /><BR />Donation $_____________<BR /><BR /><BR /><BR />Signature ________________________________________________<BR />';

//report 13 stray
replace_text_report[13] = '<HR /><BR /><B>Please read and initial:</B><BR /><BR /><BR /><BR />I hereby relinquish all ownership rights to the animal described herein to the custody of the Lee County Humane Society for disposition at their discretion.<BR /><BR />Initial:__________<BR /><BR />I certify that to the best of my knowledge this animal has not bitten anyone in the last 14 days.<BR /><BR />Initial:____________<BR /><BR />I also understand that no further information will be given out to me concerning this animal.<BR /><BR />Initial:____________<BR /><BR /><BR /><BR />Donation $_____________<BR /><BR /><BR /><BR />Signature ________________________________________________<BR />';

//report 16 adoption contract
replace_text_report[16] = '<HR /><BR />The Lee County Humane Society (LCHS) cannot guarantee the health or character of any animal adopted from the shelter. <BR /> \
We believe this animal to be of sound temperament and in good physical condition; however we suggest you take it to your veterinarian for a complete check-up as soon as possible. <BR /> \
Initial: ______<br /> \
<BR /> \
I hereby adopt this animal in its present condition and agree to care for it in a humane manner, providing food, water shelter and proper veterinary care at all times.<BR /> \
<BR /> \
I promise not to use this animal for vivisection or in any inhumane way.  If such time arises that I am no longer able to care for this animal I agree to return it to the LCHS.<BR /> \
Initial: ______<br /> \
<BR /> \
I promise not to allow this animal to breed.  I agree to have the animal surgically altered by the above due date in accordance with the LCHS spay/neuter policy which states that it is mandatory for all animals adopted or placed through the LCHS to be surgically altered within 30 days.<BR /> \
Initial: ______<br /> \
<BR /> \
I am willing to undergo any further investigation of the animal\'s welfare, including but not limited to routine follow-up calls and will cooperate fully with any officer of the LCHS.<BR /> \
<BR /> \
I understand and agree that the transfer of this animal is conditional upon my compliance with these statements.  I understand that the LCHS may reacquire this animal on demand and that I may face possible legal action should I not comply with this agreement.<BR /> \
Initial: ______<br /> \
<BR /> \
Signature:____________________________________________<BR /> \
<BR /> \
Date:_________________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee:________________________<BR />';


//report 17 transfer out
replace_text_report[17] = '<HR /><BR />The Lee County Humane Society (LCHS) cannot guarantee the health or character of any animal adopted from the shelter.  We suggest you take it to your veterinarian for a complete check-up as soon as possible. <BR /> \
Initial:____________  <BR /> \
<BR /> \
I hereby adopt this animal in its present condition and agree to care for it in a humane manner, providing food, water shelter and proper veterinary care at all times.  I promise not to use this animal for vivisection or in any inhumane way.  If such time arises that I am no longer able to care for this animal I agree to return it to the LCHS. <BR /> \
Initial:___________ <BR /> \
<BR /> \
I promise not to allow this animal to breed.  I agree to have the animal surgically altered in accordance with the LCHS spay/neuter policy which states that it is mandatory for all animals adopted or placed through the LCHS to be surgically altered within 30 days of transfer or by six months of age. <BR /> \
Initial:__________ <BR /> \
<BR /> \
I am willing to undergo any further investigation of the animal\'s welfare, including but not limited to routine follow-up calls and will cooperate fully with any officer of the LCHS.  I understand and agree that the transfer of this animal is conditional upon my compliance with these statements.  I understand that the LCHS may reacquire this animal on demand and that I may face possible legal action should I not comply with this agreement.  <BR /> \
Initial:___________ <BR /> \
<BR /> \
<BR /> \
Signature:____________________________________________<BR /> \
<BR /> \
Date:_________________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee:________________________<BR />';

//report 18 return to owner/guardian
replace_text_report[18] = '<h3>I have circled and read the following law or ordinance that applies:</h3><br /> \
<BR /> \
<div style=\'font-family:Arial\'> \
LEE COUNTY<BR /> \
Code of Alabama<BR /> \
<BR /> \
Every person owning or having in charge any dog or dogs shall at all times confine such dog or dogs to the limits of his own premises or the premises on which such dog or dogs is or are regularly kept.<BR /> \
Nothing in this section shall prevent the owner of any dog or dogs or other person or persons having such dog or dogs in his or their charge from allowing such dog or dogs to accompany such owner or other person or persons elsewhere than on the premises on which such dog or dogs is or are regularly kept. Any person violating this section shall be guilty of a misdemeanor and shall be fined.<BR /> \
<BR /> \
OPELIKA<BR /> \
Dogs or Cats at Large<BR /> \
City of Opelika<BR /> \
 Code 4-5<BR /> \
No dog or cat shall run at large within the city as defined under this chapter.  Any person who owns, harbors, keeps, maintains or has custody of any dog or cat which is running at large shall be in violation of this section, regardless of the knowledge, intent or culpability of the owner.<BR /> \
It shall be unlawful for any person to allow a female dog or cat, when it is breeding season, to go upon or have access to the streets, roads or public areas of Opelika, AL. Female dogs and cats shall be confined in such places and manner as will avoid nuisances by the attraction of male dogs or cats to the premises of others under any circumstances.<BR /> \
Animal at large, defined: any animal which is not controlled by any adequate leash or tether, or otherwise under the owner’s physical control, as defined in this section, while the animal is off the owner’s premises. No animal shall be deemed "running at large" when said animal is upon the property of the owner.<BR /> \
<BR /> \
AUBURN<BR /> \
Dogs Under Restraint<BR /> \
City of Auburn<BR /> \
 Code 4-24<BR /> \
Constant restraint required. A dog owner shall keep his or her dog under restraint at all times.<BR /> \
Restraint: A dog is considered to be under restraint when any one of the following conditions exist:<BR /> \
(1) The dog is confined in a building or fenced pen or yard on its owner\'s property or on the property of another person with the other person\'s consent.<BR /> \
(2) The dog is leashed and securely tied on its owner\'s property or on the property of another person with the other person\'s consent, in such position that the dog cannot gain access to public property or other private property.<BR /> \
(3) The dog, whether on leash or not, is under the immediate and effective control of a responsible person; provided that the dog shall not be considered under restraint if it is on the property of a person other than its owner without the consent of the other person. <BR /> \
<BR /> \
<BR /> \
SIGNATURE: ________________________________________<BR />';


replace_text_report[25] = '<center><h2>Foster Care Contract</h2></center><br />\
<br /> \
<br /> \
I understand the goals and missions of the Lee County Humane Society and, as a LCHS foster parent, agree to work toward each of these goals and to represent this mission within the community on behalf of the organization.<br /> \
Initial: ______<br /> \
<br /> \
I understand that the LCHS is the sole guardian of all animals in foster care and that fostered animals must be returned to LCHS upon request.<br /> \
Initial: ______<br /> \
<br /> \
I understand that if I, as a foster parent, want to adopt any of my foster animals, I must go through the standard LCHS adoption process.  I understand that I cannot send any of my foster animals to an adoptive or potential adoptive home until the adoption process has been completed and approved by the LCHS.<br /> \
Initial: ______<br /> \
<br /> \
I understand that foster animals need to be taken to LCHS for any medical care.<br /> \
I also understand that LCHS provides only limited medical care and at times euthanasia is the best option.<br /> \
I understand that the Foster Coordinator, Animal Health Director, and the Executive Director have the authority to decide if a foster animal needs to be humanely euthanized.<br /> \
Initial: ______<br /> \
<br /> \
I understand that I am responsible to transport my foster animal(s) to the LCHS for routine medical care, including vaccinations.<br /> \
Initial: ______<br /> \
<br /> \
I understand that if I choose to take my foster animal(s) to a veterinary clinic or to an emergency veterinary hospital without prior approval, LCHS will not reimburse me for the expenses incurred.<br /> \
Initial: ______<br /> \
<br /> \
I understand that I, as a foster parent, am responsible for providing my foster animals with quality food, safe toys, and a loving and safe environment.<br /> \
Initial: ______<br /> \
<br /> \
I understand that foster cats/kittens should not be allowed outside under any circumstances.<br /> \
I understand that foster puppies that have not been fully vaccinated should not be allowed outside except in special circumstances approved by the Foster Coordinator.<br /> \
Initial: ______<br /> \
<br /> \
I understand that if my foster animal(s) becomes sick, gets injured, or escapes I must contact the LCHS immediately.<br /> \
Initial: ______<br /> \
<br /> \
I understand that the LCHS has the right to terminate this foster care agreement and relationship if I fail to comply with the LCHS policies and regulations. <br /> \
Initial: ______<br /> \
<br /> \
<br /> \
<br /> \
By signing below, I acknowledge that I have read the foster care contract and that I agree to abide by these policies.<br /> \
<br /> \
<br /> \
<br /> \
Parent:_____________________________________________________________________________<br />\
</div>';


var testNodes = document.getElementById("ctl00_cphWorkArea_txtRTB");
//testNodes.parentNode.innerHTML = replace_text;
testNodes.parentNode.innerHTML = replace_text_report[report_id];
