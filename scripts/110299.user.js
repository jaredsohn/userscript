// ==UserScript==
// @name            OkCh TEST VERSION
// @version         1.00.00
// @namespace       http://mienaikage.co.uk
// @description     A script that allows you to modify gender, orientation and relationship status on OkCupid.
// @include         http://www.okcupid.com/profile*
// @match           http://www.okcupid.com/profile*
// ==/UserScript==


var Agender = document.body.innerHTML.match(/\&nbsp\;\[\[Agender\]\]/ig);

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

var Asexual = document.body.innerHTML.match(/\&nbsp\;\[\[Asexual\]\]/ig);

	{if (Asexual != null)
		{
			{if (Asexual.length > 0)
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Asexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Asexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Asexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Asexual ');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Asexual ');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Asexual ');
			}
		}
	}

var Butch = document.body.innerHTML.match(/\&nbsp\;\[\[Butch\]\]/ig);

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
	
var Demisexual = document.body.innerHTML.match(/\&nbsp\;\[\[Demisexual\]\]/ig);

	{if (Demisexual != null)
		{
			{if (Demisexual.length > 0)
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Demisexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Demisexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Demisexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Demisexual ');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Demisexual ');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Demisexual ');
			}
		}
	}

var Femme = document.body.innerHTML.match(/\&nbsp\;\[\[Femme\]\]/ig);

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


var GenderFluid = document.body.innerHTML.match(/\&nbsp\;\[\[Gender fluid\]\]/ig);

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
	
var Genderless = document.body.innerHTML.match(/\&nbsp\;\[\[Genderless\]\]/ig);

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

var GenderNeutral = document.body.innerHTML.match(/\&nbsp\;\[\[Gender Neutral\]\]/ig);

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
	
var Genderqueer = document.body.innerHTML.match(/\&nbsp\;\[\[Genderqueer\]\]/ig);

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
	
var GreyAsexual = document.body.innerHTML.match(/\&nbsp\;\[\[Grey-Asexual\]\]/ig);

	{if (GreyAsexual != null)
		{
			{if (GreyAsexual.length > 0)
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Grey-Asexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Grey-Asexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Grey-Asexual</span>');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Grey-Asexual ');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Grey-Asexual ');
				document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Grey-Asexual ');
			}
		}
	}
	
var Handfasted = document.body.innerHTML.match(/\&nbsp\;\[\[Handfasted\]\]/ig);

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
	}	

var Heteroflexible = document.body.innerHTML.match(/\&nbsp\;\[\[Heteroflexible\]\]/ig);

	{if (Heteroflexible != null)
		{
			{if (Heteroflexible.length > 0)
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Heteroflexible</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Heteroflexible</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Heteroflexible</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Heteroflexible ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Heteroflexible ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Heteroflexible ');
			}
		}
	}
		
var Homoflexible = document.body.innerHTML.match(/\&nbsp\;\[\[Homoflexible\]\]/ig);

	{if (Homoflexible != null)
		{
			{if (Homoflexible.length > 0)
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Homoflexible</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Homoflexible</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Homoflexible</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Homoflexible ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Homoflexible ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Homoflexible ');
			}
		}
	}

var Intersex = document.body.innerHTML.match(/\&nbsp\;\[\[Intersex\]\]/ig);

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
	
var Neutrois = document.body.innerHTML.match(/\&nbsp\;\[\[Neutrois\]\]/ig);

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

var NonMonogamous = document.body.innerHTML.match(/\&nbsp\;\[\[Non-Monogamous\]\]/ig);

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
	}

var Pansexual = document.body.innerHTML.match(/\&nbsp\;\[\[Pansexual\]\]/ig);

	{if (Pansexual != null)
		{
			{if (Pansexual.length > 0)
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Pansexual</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Pansexual</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Pansexual</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Pansexual ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Pansexual ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Pansexual ');
			}
		}
	}

var Polyamorous = document.body.innerHTML.match(/\&nbsp\;\[\[Polyamorous\]\]/ig);

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
	}

var Queer = document.body.innerHTML.match(/\&nbsp\;\[\[Queer\]\]/ig);

	{if (Queer != null)
		{
			{if (Queer.length > 0)
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Queer</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Queer</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Queer</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Queer ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Queer ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Queer ');
			}
		}
	}

var Sapiosexual = document.body.innerHTML.match(/\&nbsp\;\[\[Sapiosexual\]\]/ig);

	{if (Sapiosexual != null)
		{
			{if (Sapiosexual.length > 0)
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Straight<\/span>/g,'<span id="ajax_gender">Sapiosexual</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Gay<\/span>/g,'<span id="ajax_gender">Sapiosexual</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/<span id=\"ajax_orientation\">Bisexual<\/span>/g,'<span id="ajax_gender">Sapiosexual</span>');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Straight /g,'\/ Sapiosexual ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Gay /g,'\/ Sapiosexual ');
			document.body.innerHTML = document.body.innerHTML.replace(/\/ Bisexual /g,'\/ Sapiosexual ');
			}
		}
	}

var Separated = document.body.innerHTML.match(/\&nbsp\;\[\[Separated\]\]/ig);

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
	}

var Transgender = document.body.innerHTML.match(/\&nbsp\;\[\[Transgender\]\]/ig);

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

var Transman = document.body.innerHTML.match(/\&nbsp\;\[\[Trans man\]\]/ig);

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
	
var Transsexual = document.body.innerHTML.match(/\&nbsp\;\[\[Transsexual\]\]/ig);

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
	
var Transwoman = document.body.innerHTML.match(/\&nbsp\;\[\[Trans woman\]\]/ig);

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