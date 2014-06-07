// ==UserScript==
// @name           Comentarios sin efectos 20minutos
// @namespace      http://www.20minutos.es/*
// @description    Desactivar efectos en comentarios de 20minutos
// @include        http://www.20minutos.es/*
// ==/UserScript==


var comentarios20m=document.createElement('script');
comentarios20m.setAttribute('src','http://idefix.eup.uva.es/20m_comentarios.js?20080726');
document.body.appendChild(comentarios20m);