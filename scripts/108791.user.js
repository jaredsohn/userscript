// ==UserScript==
// @name OkChoices
// @version 1.1.4
// @namespace http://mitarashidango.net
// @description A script that allows you to modify gender, orientation and relationship status on OkCupid.
// @include http://www.okcupid.com/profile*
// @match http://www.okcupid.com/profile*
// @updateURL http://userscripts.org/scripts/source/108791.meta.js
// @downloadURL https://gist.github.com/raw/1131952/okchoices.user.js
// ==/UserScript==


var Agender = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Agender\"\>Agender\<\/a\>/ig);

{if (Agender != null)
{
{if (Agender.length > 0)

document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">Agender</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">Agender</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ Agender ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ Agender ');
}
}
}

var Androgyne = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Androgyne\"\>Androgyne\<\/a\>/ig);

{if (Androgyne != null)
{
{if (Androgyne.length > 0)

document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">Androgyne</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">Androgyne</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ Androgyne ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ Androgyne ');
}
}
}

var Asexual = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Asexual\"\>Asexual\<\/a\>/ig);

{if (Asexual != null)
{
{if (Asexual.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Asexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Asexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Asexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Asexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Asexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Asexual ');
}
}
}

var Butch = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Butch\"\>Butch\<\/a\>/ig);

{if (Butch != null)
{
{if (Butch.length > 0)

document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">Butch</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">Butch</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ Butch ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ Butch ');
}
}
}

var Demisexual = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Demisexual\"\>Demisexual\<\/a\>/ig);

{if (Demisexual != null)
{
{if (Demisexual.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Demisexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Demisexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Demisexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Demisexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Demisexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Demisexual ');
}
}
}

var FemaleToMale = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Female\-to\-Male\"\>Female\-to\-Male\<\/a\>/ig);

{if (FemaleToMale != null)
{
{if (FemaleToMale.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">FtM</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">FtM</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ FtM ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ FtM ');
}
}
}

var Femme = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Femme\"\>Femme\<\/a\>/ig);

{if (Femme != null)
{
{if (Femme.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">Femme</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">Femme</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ Femme ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ Femme ');
}
}
}


var GenderFluid = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Gender\+Fluid\"\>Gender Fluid\<\/a\>/ig);

{if (GenderFluid != null)
{
{if (GenderFluid.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">GF</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">GF</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ GF ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ GF ');
}
}
}

var Genderless = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Genderless\"\>Genderless\<\/a\>/ig);

{if (Genderless != null)
{
{if (Genderless.length > 0)

document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">Genderless</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">Genderless</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,' ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,' ');
}
}
}

var GenderNeutral = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Gender\+Neutral\"\>Gender Neutral\<\/a\>/ig);

{if (GenderNeutral != null)
{
{if (GenderNeutral.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">Neutral</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">Neutral</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,' ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,' ');
}
}
}

var Genderqueer = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Genderqueer\"\>Genderqueer\<\/a\>/ig);

{if (Genderqueer != null)
{
{if (Genderqueer.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">GQ</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">GQ</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ GQ ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ GQ ');
}
}
}

var GreyAsexual = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Grey\-Asexual\"\>Grey\-Asexual\<\/a\>/ig);

{if (GreyAsexual != null)
{
{if (GreyAsexual.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Grey-Asexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Grey-Asexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Grey-Asexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Grey-Asexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Grey-Asexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Grey-Asexual ');
}
}
}

/*var Handfasted = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Handfasted\"\>Handfasted\<\/a\>/ig);

{if (Handfasted != null)
{
{if (Handfasted.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Single<\/span>/g,'<span id="ajax_status">Handfasted</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Available<\/span>/g,'<span id="ajax_status">Handfasted</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Seeing someone<\/span>/g,'<span id="ajax_status">Handfasted</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Married<\/span>/g,'<span id="ajax_status">Handfasted</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Single /g,'\/ Handfasted ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Available /g,'\/ Handfasted ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Seeing someone /g,'\/ Handfasted ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Married /g,'\/ Handfasted ');
}
}
}*/

var Heteroflexible = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Heteroflexible\"\>Heteroflexible\<\/a\>/ig);

{if (Heteroflexible != null)
{
{if (Heteroflexible.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Heteroflexible</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Heteroflexible</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Heteroflexible</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Heteroflexible ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Heteroflexible ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Heteroflexible ');
}
}
}

var Homoflexible = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Homoflexible\"\>Homoflexible\<\/a\>/ig);

{if (Homoflexible != null)
{
{if (Homoflexible.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Homoflexible</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Homoflexible</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Homoflexible</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Homoflexible ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Homoflexible ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Homoflexible ');
}
}
}

var Intersex = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Intersex\"\>Intersex\<\/a\>/ig);

{if (Intersex != null)
{
{if (Intersex.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">IS</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">IS</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ IS ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ IS ');
}
}
}

var MaleToFemale = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Male\-to\-Female\"\>Male\-to\-Female\<\/a\>/ig);

{if (MaleToFemale != null)
{
{if (MaleToFemale.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">MtF</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">MtF</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ MtF ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ MtF ');
}
}
}

var Neutrois = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Neutrois\"\>Neutrois\<\/a\>/ig);

{if (Neutrois != null)
{
{if (Neutrois.length > 0)

document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">Neutrois</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">Neutrois</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ Neutrois ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ Neutrois ');
}
}
}

/*var NonMonogamous = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Non\-Monogamous\"\>Non\-Monogamous\<\/a\>/ig);

{if (NonMonogamous != null)
{
{if (NonMonogamous.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Single<\/span>/g,'<span id="ajax_status">Non-Monogamous</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Available<\/span>/g,'<span id="ajax_status">Non-Monogamous</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Seeing someone<\/span>/g,'<span id="ajax_status">Not Looking</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Married<\/span>/g,'<span id="ajax_status">Not Looking</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Single /g,'\/ Non-Monogamous ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Available /g,'\/ Non-Monogamous ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Seeing someone /g,'\/ Not Looking ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Married /g,'\/ Not Looking ');
}
}
}*/

var Panromantic = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Panromantic\"\>Panromantic\<\/a\>/ig);

{if (Panromantic != null)
{
{if (Panromantic.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Panromantic</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Panromantic</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Panromantic</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Panromantic ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Panromantic ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Panromantic ');
}
}
}

var Pansexual = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Pansexual\"\>Pansexual\<\/a\>/ig);

{if (Pansexual != null)
{
{if (Pansexual.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Pansexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Pansexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Pansexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Pansexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Pansexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Pansexual ');
}
}
}

/*var Polyamorous = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Polyamorous\"\>Polyamorous\<\/a\>/ig);

{if (Polyamorous != null)
{
{if (Polyamorous.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Single<\/span>/g,'<span id="ajax_status">Polyamorous</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Available<\/span>/g,'<span id="ajax_status">Polyamorous</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Seeing someone<\/span>/g,'<span id="ajax_status">Not Looking</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Married<\/span>/g,'<span id="ajax_status">Not Looking</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Single /g,'\/ Polyamorous ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Available /g,'\/ Polyamorous ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Seeing someone /g,'\/ Not Looking ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Married /g,'\/ Not Looking ');
}
}
}*/

var Polysexual = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Polysexual\"\>Polysexual\<\/a\>/ig);

{if (Polysexual != null)
{
{if (Polysexual.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Polysexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Polysexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Polysexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Polysexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Polysexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Polysexual ');
}
}
}

var Queer = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Queer\"\>Queer\<\/a\>/ig);

{if (Queer != null)
{
{if (Queer.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Queer</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Queer</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Queer</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Queer ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Queer ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Queer ');
}
}
}

var Sapiosexual = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Sapiosexual\"\>Sapiosexual\<\/a\>/ig);

{if (Sapiosexual != null)
{
{if (Sapiosexual.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_orientation">Sapiosexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_orientation">Sapiosexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_orientation">Sapiosexual</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Sapiosexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Sapiosexual ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Sapiosexual ');
}
}
}

/*var Separated = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Separated\"\>Separated\<\/a\>/ig);

{if (Separated != null)
{
{if (Separated.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Single<\/span>/g,'<span id="ajax_status">Separated</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Available<\/span>/g,'<span id="ajax_status">Separated</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Seeing someone<\/span>/g,'<span id="ajax_status">Separated</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_status\">Married<\/span>/g,'<span id="ajax_status">Separated</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Single /g,'\/ Separated ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Available /g,'\/ Separated ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Seeing someone /g,'\/ Separated ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ Married /g,'\/ Separated ');
}
}
}*/

var Transgender = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Transgender\"\>Transgender\<\/a\>/ig);

{if (Transgender != null)
{
{if (Transgender.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">TG</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">TG</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ TG ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ TG ');
}
}
}

var Transman = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Trans\+man\"\>Trans man\<\/a\>/ig);

{if (Transman != null)
{
{if (Transman.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">TM</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">TM</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ TM ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ TM ');
}
}
}

var Transsexual = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Transsexual\"\>Transsexual\<\/a\>/ig);

{if (Transsexual != null)
{
{if (Transgender.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">TS</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">TS</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ TS ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ TS ');
}
}
}

var Transwoman = document.body.innerHTML.match(/\&nbsp\;\<a class\=\"ilink\" href\=\"\/interests\?i\=Trans\+woman\"\>Trans woman\<\/a\>/ig);

{if (Transwoman != null)
{
{if (Transwoman.length > 0)
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">F<\/span>/g,'<span id="ajax_gender">TW</span>');
document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_gender\">M<\/span>/g,'<span id="ajax_gender">TW</span>');
document.body.innerHTML = document.body.innerHTML.replace(/\/ F /g,'\/ TW ');
document.body.innerHTML = document.body.innerHTML.replace(/\/ M /g,'\/ TW ');
}
}
}