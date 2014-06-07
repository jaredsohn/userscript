// ==UserScript==
// @name           Zeta auto select
// @namespace      ikariam
// @description    Selection automatique de l'univers Zeta dans le formulaire de connexion.
// @include        http://ikariam.fr/
// @include        http://www.ikariam.fr/
// @include        http://ikariam.fr/index.php
// ==/UserScript==
opts = document.getElementById('universe').getElementsByTagName('option');
// Changer l'index d'opts de 0 a� 7 (alpha a� theta) pour changer l'univers par défaut
opts[5].selected = true;