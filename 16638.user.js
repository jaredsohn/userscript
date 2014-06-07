// ==UserScript==

// @name           Unibanco Auto-Login

// @namespace      http://isnotworking.com/

// @description    Auto-login em contas correntes no Unibanco online (pessoas físicas).

// @include        http://www.unibanco.com.br/hom/index.asp

// @include        https://www.unibanco.com.br/hom/index.asp

// @include        http://unibanco.com.br/hom/index.asp

// @include        https://unibanco.com.br/hom/index.asp

// @include        http://www.unibanco.com.br/*

// @include         http://www.unibanco.com.br/vste/_exc/_hom/index.asp    

// ==/UserScript==


// Copyright (c) 2007, Ricardo Niederberger Cabral (ricardo.cabral at imgseek.net)
// Released under the BSD license:
// http://www.opensource.org/licenses/bsd-license.php

// Default variables

var agDiv = null;

var ccDiv = null;

var ccdvDiv = null;

var button  = null;


function getVars ()

{	

	agDiv = document.getElementById('Agencia');

	ccDiv = document.getElementById('Conta');

	ccdvDiv = document.getElementById('DigConta');

	button  = document.getElementById('btnSubmit');

	var ag = GM_getValue ("ag", null);

	if (ag == null) { setAg () }



	var cc = GM_getValue ("cc", null);

	if (cc == null) { setCc () }



	var ccdv = GM_getValue ("ccdv", null);

	if (ccdv == null) { setccDv () }



	GM_registerMenuCommand ("Agencia", setAg);

	GM_registerMenuCommand ("Conta corrente", setCc);

	GM_registerMenuCommand ("Digito verificador", setccDv);



	// Enter form values if not entered

	if (agDiv.value.length == 0) { agDiv.value = ag }

	if (ccDiv.value.length == 0) { ccDiv.value = cc }

	if (ccdvDiv.value.length == 0) { ccdvDiv.value = ccdv }



	// Login

	button.click ();


}

addEventListener('load',getVars,false); 


// Settings

function setAg ()

{

    uag = prompt ("Entre sua agencia (4 dígitos)", "");

    ag = uag;

    GM_setValue ("ag", ag);

}

function setCc ()

{

    ucc = prompt ("Entre sua conta corrente (sem dígito verificador: 6 dígitos)", "");

    cc = ucc;

    GM_setValue ("cc", cc);

}

function setccDv ()

{

    uccdv = prompt ("Entre o dígito verificador da conta corrente (1 digito)", "");

    ccdv = uccdv;

    GM_setValue ("ccdv", ccdv);

}

