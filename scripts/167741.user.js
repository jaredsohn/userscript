// ==UserScript==
// @author			Jakub Jerabek
// @name			Jednodussi prihlasovani na souteze CSTS
// @description                 Predvyplni IDT partnera a partnerky behem prihlasovani na soutez
// @include			https://www.csts.cz/cs/PrihlaseniNaSoutez/Soutezni/*
// @include			http://www.csts.cz/cs/PrihlaseniNaSoutez/Soutezni/*
// @version			1.1
// ==/UserScript==

/**
 * Changelog
 * v1.1
 *  - vydano 2012-05-17
 *  - ukladani IDT do cookies
 *  - dotaz na automaticke odeslani formulare a ulozeni do cookies
 * v1.0
 *  - vydano 2013-05-17
 **/

// Automaticky odeslat formulář s vyplněnými IDT?
var auto_submit = false;

// IDT partnera a partnerky
var idt_he = null;
var idt_she = null;

// get IDTs
getIDTs();

// auto submit?
getAutoSubmit();

// fill text input with his and her IDT
document.getElementById("IdtPartner").value = idt_he;
document.getElementById("IdtPartnerka").value = idt_she;

// submit form
if (!checkErrors() && (auto_submit == 'true' || auto_submit === true)){
    document.forms[0].submit();
}

/***
 * Checks source code whether an error occured
 **/
function checkErrors(){
    var elems = document.getElementsByTagName('div'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' validation-summary-errors ') > -1) {
            return true;
        }
    }
    return false;
}

/**
 * Gets IDT numbers from cookies or via prompt dialog from user
 **/
function getIDTs(){
    // read cookie
    idt_he = readCookie("csts_idt_he");
    
    // if cookie isn't set, prompt dialog
    if (idt_he == null || idt_he == ""){
        
        idt_he = prompt("Zadejte IDT partnera:", "");
        if (idt_he != null && idt_he != ""){
            // save entered IDT
            setCookie("csts_idt_he", idt_he);
        }
    }else{
        // refresh cookie with IDT
        setCookie("csts_idt_he", idt_he);
    }

    // read cookie
    idt_she = readCookie("csts_idt_she");
    
    // if cookie isn't set, prompt dialog
    if (idt_she == null || idt_she == ""){

        idt_she = window.prompt("Zadejte IDT partnerky:", "");
        if (idt_she != null && idt_she != ""){
            // save entered IDT
            setCookie("csts_idt_she", idt_she);
        }
    }else{
        // refresh cookie with IDT
        setCookie("csts_idt_she", idt_she);
    }
}

function getAutoSubmit(){
    // read cookie
    auto_submit = readCookie("csts_auto_submit");
    
    // if cookie isn't set, prompt dialog
    if (auto_submit == null || auto_submit == ""){

        auto_submit = window.prompt("Automaticky odesílat vyplněný formulář? (ano/ne)", "");
        if (auto_submit != null && auto_submit != ""){
            // save entered IDT
            auto_submit = (auto_submit.toLowerCase() == "ano" ? true : false);
            setCookie("csts_auto_submit", auto_submit);
        }
    }else{
        // refresh cookie with IDT
        setCookie("csts_auto_submit", auto_submit);
    }    
}

/**
 * Reads cookie's value
 * @param name - name of the cookie
 **/
function readCookie(name)
{
    name += '=';
    var parts = document.cookie.split(/;\s*/);
    for (var i = 0; i < parts.length; i++)
    {
        var part = parts[i];
        if (part.indexOf(name) == 0)
            return part.substring(name.length)
    }
    return null;
}

/**
 * Sets new cookie
 * @param name - name of the cookie
 * @param value - value of the cookie
 **/
function setCookie(name, value)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 365);
    var c_value=escape(value) + ("; expires="+exdate.toUTCString());
    document.cookie=name + "=" + c_value;
}

