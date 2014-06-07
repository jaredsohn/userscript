// ==UserScript==
// @name           Taringa 2021 BETA
// @namespace      taringa2021
// @description    Taringa 2021 - @electrocrookers Taringa!
// @require        
// @require        
// @require        
// @resource       
// @include        http://www.taringa.net*
// ==/UserScript==

#compose-navitem {
    display: none;
}

#favorites-box {
    left: 96px;
    top: 44px;
}

#footer {
    position: relative;
    top: 12px;
}

#header {
    background: url(http://brianvalente.com.ar/taringa2021/fondo-header-taringa.jpg) top center fixed;
    border: none;
    height: 50px;
    left: 0;
    margin: auto;
    position: fixed;
    right: 0;
    z-index: 10000;
}

#logo {
    -webkit-transform: scale(.5);
    background: url(http://k41.kn3.net/D166A3D54.png)
;
    left: -20px;
    position: relative;
    width: 186px;
}

#main {
    position: relative;
    top: 50px;
}

#mensajes-box {
    left: 91px;
    top: 44px;
}

#nav {
    background: none;
    left: -210px;
    margin: auto;
    position: fixed;
    right: 0;
    top: 5px;
    width: 420px;
    z-index: 10000;
}

#nav .floatR {
    display: none;
}

#nav .wrapper {
    width: 470px;
}

#notifications-box {
    left: 86px;
    top: 44px;
}

#search {
    display: none;
}

.active#menu-section-mi .home {
    background-position: -152px -119px;
}

.navbar {
    left: 500px;
    position: relative;
    top: 10px;
    z-index: 10000;
}

.navbar .navitem.active, .navbar .navitem.active:hover {
    background: rgba(180,180,180,.4);
    border-radius: 40px;
    cursor: pointer;
}

.navbar .navitem.nohide:hover {
    background: rgba(200,200,200,.4);
    border-radius: 40px;
    cursor: pointer;
}

.navbar .navitem:hover {
    background: rgba(200,200,200,.4) ;
    border-radius: 40px;
    cursor: pointer;
}

.navitem {
    margin-left: 5px;
}

.navitem .nick {
    display: none;
}

.navitem, .navbar, .navitem:hover, .navitem.active, .navitem.active:hover, .useritem.hover {
    background: none;
    border: none;
    border-radius: none;
}

.navitem.useritem ul {
    background: none;
    border-radius: 3px;
    left: 60px;
    list-style-type: none;
    position: absolute;
    top: 0px;
    width: 300px;
}

.navitem.useritem ul li {
    background: none;
    border: none;
    float: left;
    margin-left: 10px;
    padding: 6px 12px 6px 12px;
}

.navitem.useritem ul li:hover {
    background: rgba(200,200,200,.4);
    border-radius: 40px;
    text-decoration: none;
}

.navitem.useritem ul:after {
    border: 10px solid transparent;
    border-top-color: #333;
    content: ' ';
    height: 0;
    left: 10px;
    position: absolute;
    top: 100%;
    width: 0;
}

.navitem.useritem.hover div {
    background: rgba(200,200,200,.4);
    border: none;
    border-radius: 40px;
}

.useritem {
    left: 30px;
    position: relative;
}

.useritem ul {
    position: absolute;
    width: 152px;
}

ul.floatL a {
    background: none;
    color: rgb(230,230,230);
}

ul.floatL a:hover, ul.floatL .active a {
    background: rgba(200,200,200,.4);
    border-radius: 40px;
    text-decoration: none;
}