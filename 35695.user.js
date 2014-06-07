//-----------------------------------------------------------------------------
//  Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name          Conquer Club - Classic Map
// @namespace     http://dunnswap.co.cc/conquer
// @description   Classic map by dunnsearch.net
// @include       http://*conquerclub.com*
// ==/UserScript==

#include <iostream>
#include <stdio.h>
#include <string>

using namespace std;


string Replace(string a,string b,string c)
{
    int pos ;
    do
    {
        pos = a.find(b);
        if (pos!=-1)  a.replace(pos, b.length(), c);
    }
    while (pos!=-1);
    return a;
}

int main()

{
    std::cout << Replace("http://www.conquerclub.com/maps/Classic_Shapes.L.jpg","http://www.conquerclub.com/maps/Classic_Shapes.L.jpg","http://i34.tinypic.com/2z9kw2t.gif");
}