// ==UserScript==
// @name           UPC kontaktni formular
// @namespace      upc.local
// @description    Predvyplni obtezujici kontaktni formular na webu UPC
// @include        http://web.upc.cz/*
// @include        http://www.upc.cz/*
// @include        http://upc.cz/*
// @version        0.0.2
// ==/UserScript==


// vlastni nastaveni promennych
var jmeno         = 'Jméno';
var prijmeni      = 'Příjmení';
var ulice         = 'Ulice';
var cislo_popisne = '1';
var mesto         = 'Praha';
var cislo_smlouvy = '123456';
var email         = 'prijmeni@example.com';
var mobilni_tel   = '';
var pevna_linka   = '';


// vyplneni formulare
if (document.getElementById('tx_jmeno'))      { document.getElementById('tx_jmeno').value     = jmeno;          }
if (document.getElementById('tx_prijmeni'))   { document.getElementById('tx_prijmeni').value  = prijmeni;       }
if (document.getElementById('tx_ulice'))      { document.getElementById('tx_ulice').value     = ulice;          }
if (document.getElementById('tx_cispop'))     { document.getElementById('tx_cispop').value    = cislo_popisne;  }
if (document.getElementById('tx_mesto'))      { document.getElementById('tx_mesto').value     = mesto;          }
if (document.getElementById('tx_csmlouvy'))   { document.getElementById('tx_csmlouvy').value  = cislo_smlouvy;  }
if (document.getElementById('tx_email'))      { document.getElementById('tx_email').value     = email;          }
if (document.getElementById('tx_telmobil'))   { document.getElementById('tx_telmobil').value  = mobilni_tel;    }
if (document.getElementById('tx_teldomu'))    { document.getElementById('tx_teldomu').value   = pevna_linka;    }

// uzka textarea pres celou stranku
if (document.getElementById('tx_text')) {
    document.getElementById('tx_text').style.width = '100%';
}

// primy odkaz na formular = zadne popupy, nova okna
var windowOpenRemove = document.evaluate('//a[contains(@href, "klpoz")]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var i=0 ; i < windowOpenRemove.snapshotLength; i++ )
{
  link = windowOpenRemove.snapshotItem(i);
  link.setAttribute ("onclick", null);
  link.setAttribute ("target", "_self");
}
