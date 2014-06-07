// ==UserScript==
// @name           Compilacion de scritpts para ogame.com.es
// @namespace      http://qqklan.forogratis.es
// @include        http://*game*.*/*
// @include        http://forum.xs-games.ir/*

// ==/UserScript==

    <script type="text/javascript">
    var yekan  = new Array( "صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه" );
    var dahgan = new Array( "", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود" );
    var dahyek = new Array( "ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده");
    var sadgan = new Array( "", "یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد" );
    var basex  = new Array( "", "هزار", "میلیون", "میلیارد", "تریلیون");

    function getnum3(num3)
    {
        var s = "";
        var d3, d12;
        d12 = num3 % 100;
        d3 = parseInt(num3 / 100);
        if (d3 != 0)
            s = sadgan[d3] + " و ";
        if ((d12 >= 10) && (d12 <= 19))
        {
            s = s + dahyek[d12 - 10];
        }
        else
        {
            var d2 = parseInt(d12 / 10);
            if (d2 != 0)
                s = s + dahgan[d2] + " و ";
            var d1 = d12 % 10;
            if (d1 != 0)
                s = s + yekan[d1] + " و ";
            s = s.substring(0, s.length - 3);
        }
        return s;
    }

    function num2str(snum)
    {
        //Text2.value = snum;
        var stotal = "";
        if (snum == "0")
        {
            return yekan[0];
        }
        else
        {
            for (var i = snum.length; i < (parseInt((snum.length - 1) / 3) + 1) * 3; i++)
                snum = "0" + snum;
            var L = parseInt(snum.length / 3) - 1;
            for (var i = 0; i <= L; i++)
            {
                var b = parseFloat(snum.substring(i * 3, (i + 1) * 3));
                if (b != 0)
                    stotal = stotal + getnum3(b) + " " + basex[L - i] + " و ";
            }
            stotal = stotal.substring(0, stotal.length - 3);
        }
        return stotal;
    }
    
    function Button1_onclick() 
    {
        document.getElementById("Text2").value = num2str(document.getElementById("Text1").value);
        //Text2.value = num2str(Text1.value);
        //document.write((x.substring(3, 6)));
        //document.getElementById("Text2").value = getnum3(document.getElementById("Text1").value);
    }

////////////////
// BEGIN HERE //
////////////////

get_parts_from_web ();
document.getElementById("forum_compactation").select();