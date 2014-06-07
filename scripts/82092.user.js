// ==UserScript==
// @name           WTF!
// @namespace      Acceso directo
// @include        http://www.taringa.net/*
// ==/UserScript==

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//                                                      //
// NO EDITES ESTO ESTO ES PROPIEDAD DE Comunidad_wtf X( //
//     PORQUE CAMBIES DE POSICION LAS COSAS             //
//    O CAMBIES LOS NOMBRES SE NOTA QUE EL 99.99%       //
//       ES TODO MIO RASTRERO JAJAJAJAJJAJA             //
//                                                      //
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//                                                      //
// NO EDITES ESTO ESTO ES PROPIEDAD DE Comunidad_wtf X( //
//     PORQUE CAMBIES DE POSICION LAS COSAS             //
//    O CAMBIES LOS NOMBRES SE NOTA QUE EL 99.99%       //
//       ES TODO MIO RASTRERO JAJAJAJAJJAJA             //
//                                                      //
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//                                                      //
// LOKO, NO CAMBIES NADA TODO EL CREDITO ES MIO         //
//     POR FAVOR YA SABEMOS QUE APRENDISTE A EDITAR     //
//    PERO, CUANDO SUBAS UN SCRIPT TUYO EDITANDO ESTE   //
//       AUNQUE SEA DAME CREDITO COMO YO LO HAGO        //
//                                                      //
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

Inici = document.getElementById("subMenuPosts").innerHTML.indexOf("</li>") ;
Cabecera = document.getElementById("subMenuPosts").innerHTML.slice(0, Inici);
Final = document.getElementById("subMenuPosts").innerHTML.slice(Inici);
Infiltrado = "<li><a href=\"/comunidades/whatthefuck/\"><img alt="Mr. wtf" src="http://k01.kn3.net/29C4AF0A7.png"></a></li>";
document.getElementById("subMenuPosts").innerHTML = Cabecera + Infiltrado + Final;
