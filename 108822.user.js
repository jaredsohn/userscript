// ==UserScript==
// @name              Neowin Pegasus Logo Reversion
// @namespace         
// @description     
//
// @version           1.1
// @include           http://*.neowin.net/*
// @match             http://*neowin.net/*

// ==/UserScript==
#branding > hgroup > h1 > a {
    background: url("http://f.cl.ly/items/1k1X0X0s032X0L3e0i3E/neowin%20lowercase.png")
}
.c-darkside #branding > hgroup > h1 > a {
    background-image: url("http://f.cl.ly/items/0q0O3e170N1v0r3D1J1q/neowin%20white.png");
}
.c-legacy #branding > hgroup > h1 > a {
    background-image: url("http://f.cl.ly/items/1b2f1v1e0A460N381O1I/legacy.png");}
}


