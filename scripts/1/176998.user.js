// ==UserScript==
// @name           TVChaosUK.com static favicon
// @description    Display static favicon.
// @include        *tvchaosuk.com*
/*change favicon*/
var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');
icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABa0lEQVQ4jaWTwUsCQRjFv23zIJsR1aEoaBHEQwZBdJNWqz/AU1AGZYdudRD8O+pQxyC6CeE5CLxE16AOSyBWBJFkkiIo7o7f61BNLuym4cAHM/OG38y8eUPMjH6KvISmECAyIGy7NwCRASIDN7NhMDPKb+8gMmBZXwBFWcKAuoh4dNkdoGkJEBlSqGTS2Ng8kGNbUSCI/r7C2ckpxkYmsTA6jvCUjqAeQlAPQRAhnz1Hcm29dw86K6iHvD1oNhp4vL1Dqd5CJZNGdX4OtqKAmRELDMuFtWpN9iORnV/AvqbhSlUhiBzFzEgGhpB30XIXRWmmvMLe9q6kluuWBOR8PpRsGwXTBDN7v8JPZS8/cK2qEjA9MYPnlzI0LdE9SIII98dHYGZspQ5ht9tgZhRME0QGNO3VGyCIULcF1MGIBHTmgsiA359C8eHJHbBirDqF72TGonHHfFcPZPJaluME//5Mbru5AtBHY2Z8AgCtXcltPGixAAAAAElFTkSuQmCC');
head.appendChild(icon);
// ==/UserScript==