// ==UserScript==
// @name           Perlish Friends'n'Foes Icons
// @version        0.02
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/
// @description    Uses Perl-themed icons for friends and foes 
// @include        http://use.perl.org/*
// ==/UserScript==
//
// Changes
// 0.02 - Nov 28, 2007
// * fixed silly bug in xpath expression
// 0.01 - Nov 28, 2007
// * initial release


/* The images of the camel, llama, dog, panther and ram
 * are all trademarks of O'Reilly (www.perl.com).
 */

var dog = "data:image/png;base64,"
+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/"
+"AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggZAxcK8sLV"
+"lwAAAxZJREFUOMttk99rW3UYxj/fc05yfqQ5+XWS1CbrOtZlbTUOu4Gg80IQ"
+"wQliGegfMBCHV/4H9UbwRrzUCxX/gAkTvLCl04lepkOQxNIfli5pS5p1rck5"
+"TfPNOd9drEhkPvBcve9z8fI+H8H/SCkFIEY8qgh4uiDEf4cjQQ3ISSkvPj46"
+"Kh+0DzSFolwqdVOp1IYQ4iHQB5RQSmmAAcTOwvEwDKfq9cb7d+/+8Gar1Rof"
+"hqHQNR3LtoKpqak/377x1teXLk0vAydCSlluNpuv2Y5TMXQj7vu+u76x8eKd"
+"O99X814+vb29LZxEAtu20XWdeDw+SKXc329/+MFnyWTyN/3dhYU3vvn2u0/c"
+"VPoGile++PKra/ut1oWT4MTRNE34gU+hUOBc+RwDKRkfL+pra2vPOY5zsVgo"
+"7hvlUqmnCRHLezlHj8XE5anzrK+vkxgbo9PpYFk2URTR2t0l8H36/T7ZTNZa"
+"+mn5ZTmQHwul1Pna6oNPwzB8p/PoMNHrdsX9+7+iVIRpmkg5REqJZVlEUcjE"
+"RIlerwdAGIZDfXFxMXCTyd1YLOaEkZrQDSORz3uUy2UajQZXr17j8PCQbDaL"
+"oes4jkO/30dKiWHomgGoeNwc1mqramVlhfZBB8/zyGYyVKtVABKJBKZpEkUh"
+"2WyG4+MjgsCnWq1iAMbm1uaVer3+ev/0NFuamDh1U27gJl3Zbrczw+FezDRN"
+"ut0ulmUShiGu67Kzs0O73cYABpcrlV8qlcrk3NzcTDqd3isUC39l0uno3r2f"
+"bz0+Opo/OOgI3/cRQBQpej0fy7SwTAsDiDRN27x5c+FzwD5rWDAchheareZ7"
+"W1t/k8t5CASFYhFd18jlcmxsrJMv5NGEEAAhcAi0gEdAfzA4NY+P/xkbDAYU"
+"8nl0XcO2racvbTVJJl2iSKH9C8WIAUzT3L1+/dXlVCq173leNJCSer1OrVZj"
+"b3eP2ZkZPC/3DGmjUOlAafXBH7d83/9oaWk512w+JAgC5ufnmZ6ehjPqntHI"
+"Wc35l6786Nh2s/rC8yqdTjM7O8vk5CS+79OoN3gCgYhOydXGBoIAAAAASUVO"
+"RK5CYII=";

var camel = "data:image/png;base64,"
+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAA"
+"AAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggZAjkjurUu"
+"4AAAAy1JREFUOMuFk81LK2cYxc/7ZBKTSRyjc2swGkxG70JpjFGxLqJuFARL"
+"XZQuClbovgsX3bb+A4Xu/AfaLlJpcVnBgIsIERHTqDWBuijmS+4kvUlM6ny9"
+"bxeFi1Joz+7h4fzgwDkM/yPHcci2bdnlclmMMcvlcvHnf+m/zIZh9N3e3q7n"
+"8/mPer2enUwmjzjnvxCR8S+AEIIBcAGgf07Rd35+njg+Pv767u4uXq/XqVKp"
+"pB4eHl7Ztv2DJElP7wCWZUn7+/ufcM7Xp6enu51O56/r6+ulUqkU1TRteH19"
+"ve/k5ARE9DqXy30Ri8W6nPOfiMiShBDs4ODg45ubm+/8fr8rEAiY1WqVjYyM"
+"uI+OjuDxeDA/P4+ZmRmUy2WvLMuTuVxut9VqFQD8Rr1e79XZ2dm3siy71tbW"
+"MDY25tne3nYnEglsbm6i0WggnU7D5/NBkiTU6/WAruvj4XA4wDlnrr29Pck0"
+"zU/L5fJwu92GJElQVRWhUAimacLr9UJRFMiyjFqthkwmg2w2GwgEAtHFxcWf"
+"Jbfb/Tg4OPiZoihfttvt0Ww2+/rw8PC95eVlt9frZTs7O3j79i3S6TTK5TJm"
+"Z2fx9PSEZrP5QbfbHZGIiHPOf02lUp8DoFqtFtvd3f2+0WhENU1Tq9Uqer0e"
+"Hh8foaoqisUiIpEI4vE4CSFsCQCISACwHMdh+XzeWygUhlVVtavVKhzHweXl"
+"JTKZDObm5pBKpXB6egrTNP/s7+9/86JIQghfOp3+6v7+fqxSqTgbGxsgIui6"
+"jtXVVcRiMQghsLW1Bbfb3SAi+x2Ac84uLi4WCoXCqqZpdjAY5KVSiQzDoJWV"
+"FTDG4PF4YJomWq0W/H6/IYR40UR3p9P50LIs/9LSkpFIJKShoSHSdR2cc1xd"
+"XaHZbGJiYgLhcLg7Pj7+DRHZ9CyBXSwWHUVRPMlkMqCqqndychK6riOfzyMY"
+"DMI0TZimCUVRcoqinDLG+IstENH7Pp+PSqUSRkdHAQDtdhsDAwNgjEFRFHDO"
+"uWVZP0aj0TeMMUHPIxCRXK/XIcsyQqEQDMPAwsICIpEI/H6/iMfj5tTU1B+a"
+"pv0uhHABwN+Mln4mnmBz1gAAAABJRU5ErkJggg=="
;

var llama = "data:image/png;base64,"
+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/"
+"AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggZAw0XIelD"
+"lQAAAzpJREFUOMtlks9LK3cUxc/3OzNJzExjTC0mjfKUQDKpqZIQi1AQf7Q0"
+"kpEWShdW6NKN738RCl10JUpBFw0qJkilVBTBjbXUhShS80OfrybhJUE088PJ"
+"fYvoo7ze3V2czzn3chjem1wuByKCpmnY3t7mpmkyp9MpuVwufXx8HPv7+9y2"
+"bZqYmCAAYM/CbDYLxtorEX1k23by5ubm+1qtpiiKoj4+Pq5FIpFfAOSJiACQ"
+"pmltQDabBRFxxtgnx8fHo5ubm98S0bggCK5wOIypqSksLy9TJBIp9PT07CuK"
+"8ruqqn9yzs/Y1tYWz+fzXxcKhc8rlcrk2dnZp4wxcXp6GktLSwiFQjg5OcHC"
+"wgJ8Ph/q9ToODg7sWCyWj8fjPwp9fX0/Pzw8/HB7e/tNKBQKqKrKdV3H3t4e"
+"ZmdnUalU0Nvbi0QigZWVFeRyOQQCAe73+32yLJ+Koij+uru7O1Cr1V5kMpkP"
+"BEGAYRhwuVxgjGFsbAwbGxs4PDxEs9mELMv6xcWFKUlSRVXVD1kul+NE5Flf"
+"X/9tbW3tM6/Xi/n5eVxdXWFnZwfhcBiNRgO2bbei0ag5Ojr6d39//0uHw/GP"
+"aZq2mE6nW9lsVlQU5ZXT6YQoijBNE5OTkzBNE5lMBqlUqqhp2k9ut/u11+vd"
+"tSzrtWVZrZmZGYgAwBhzW5al6LqOYDAIXdfR0dEBVVURjUaNubm57yRJ+otz"
+"zoaHhy2/3/+uN8+AV4FA4A9BEL40DAPVahXlchmxWAy6ruuyLF9ZlvWYTqff"
+"710bYNt2q1QqfQwAsiwjFothZGQEsiyju7vbXSwWA11dXf8+lYwBoOfScQDQ"
+"NI0SicQbj8cDzjnq9To8Hg+cTicajYY1ODjIU6kUiAhExP+XoNVq4f7+3goG"
+"gxAEAclkEtfX1zBNE/V6ncXj8QcicrSvZeaz+7sEROQpFotf3d3dwbIsNBoN"
+"LC4uolAowOfzuU5PT8MACIABwPGkARG1Ac1m01GtViXDMOB2u9FsNpFMJlEu"
+"l1EqlVqdnZ13RNR6cmZEJD2BXKJt2x2rq6tfXF5eJgYGBjA0NITz83NIkoSj"
+"oyOEw2EejUZfMMYEADZjTP/vD94COSd1+T2H/iwAAAAASUVORK5CYII="
;

var panther = "data:image/png;base64,"
+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/"
+"AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggZAxQTvYQu"
+"lAAAAvBJREFUOMuFk89rXFUYhp9zzr2TOzNmbmZMmiaLEISQzbQLCRpxZxrc"
+"udBUCq1CYxcuG6F24aorV5FWW6lUoWAmgm3B6EL/DCFoDGghmikkk8xwufPj"
+"3nvOPcdFmlAU9Ft/z8v7fnyv4B/jnGN7e/uFRw8erqw3Gu+nSeJJKQEQQgCg"
+"lML3fbIsQzwLW2vFrZs3X/nm67X7CDHj+z5CCIwxtNvtk70gCFBKYa3Fewbm"
+"++825h5+++B+fzCYEULgnGN4eJhKpYJzjjzPybIMYwxaa8bGxpDHtlut1uh6"
+"o3E3S9OZYrGIlBJjDHEcA1CtVun1evi+z/T0NKVSiX6/j3DOEUXR6IfXrn3+"
+"269b55VSBEGA1ppuHHMco1QqkaYpSimazSZKKTzPO3LwyerqlcODw6V+v8+g"
+"36fT6WC0phKGaK0RQqC1Js9zoihCCIG1Fufc0Q2MNs/lWotSsYgxhnK5jOd5"
+"5NaeCCRJQpqmR5DnnYhI5xxxHM+eOn2a2ugoSZIwNTWFXyjgPY0ThiHGGIQQ"
+"hGGIlJI0TZFSIoUQxHH8y5PdXYpBQFit8sfjxwDs7e0RRRGtVos0TQHIsozB"
+"YIAxhjAMn0jnHKVS6ZQQAr9QYHZ2loLv89fOnwwGA6y1ZFmGtZZKpUKaJAwF"
+"QfTS/MurX3z15atekiTh5ubmG8/XakxMTNBut6mfOcP+/j7dOGZnZ4dut0u5"
+"XCY3Bn9oKL544cKlqytXf1JKGa/X63mTk5M2KBSQUjI+Pk6tViNJU7IsY2Rk"
+"5MRypvXvb55fur7ywcqPSqkcwKvVaof1ev2jHzY27nU6nSGd5xit8X0frTXl"
+"cnnw4tzco2q1unXxnUv35ufn21LK/PiDhbUWnFN3bt+5IT31Xvuwvbu9tTXX"
+"bDaxeZ7Uz569/untz+5KKbVzzh0X618NtNZ66431dxcXzuVXLi+7c68tJMuX"
+"l29Zaz3nHP87zjkODg6Kb7+19PHri4s/N9bWFvI896y1/8n9DesWhI304Xzm"
+"AAAAAElFTkSuQmCC"
;

var ram = "data:image/png;base64,"
+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/"
+"AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggZAx4DWtzW"
+"egAAA0pJREFUOMttkk1IK2cUht/vy+Q/mZgfnbTVwNVIE0QIGEltoTQopLSQ"
+"Krro5i66KSjcTSldKN2Vbqy466ZCl92WStXdJca6CEaMMQT/IMb/SeNokptJ"
+"ZibzdeP13sJ94OzOeXnPOS/BI51Oh2qaZt7Z2QkHg8Gax+OpGgyGB0qp/rpH"
+"13UwxsyaplkB2Aghrzi8gS4uLv5weHj4Y29vr+ZyuYoTExMvGGP/6LpOVFXl"
+"l5aWvvJ4PJ9TSsdNJpO5Xq9X6etpxpgtnU7Hi8WiweFwmGu1WmRjY+M3RVH6"
+"9/b2wslkcn1tbe13SZK+ttvt3ZVKhVdV9dmTA0KIpijKValUQrvdhiAIcDqd"
+"H25vbz9fXl7+WJKkj6LRKEKhEHieh9FohCiKoG+toAmCcN1sNnFycoJGowGn"
+"00mOj4+fPzw8fNbV1QVBEGCz2UAIQb1eR6vVwv8c8Dx/r+s68vk8KpUKMpkM"
+"8vl8PwCMjY1BlmUQQpDL5ZDL5XB1dfVGgDHGVavV9x0OBy4vL3FxcYFWqwVK"
+"Kfr6+pBOpzE1NYVMJoP7+3tYrVZYLBbl7SPSer3+ns/nAyEEjLGnajQaiMVi"
+"2NzcxM3NDba2tiAIApuZmfmG63Q6HKVUkyTJUiqVBimlGBwcRLlcBqUUfr8f"
+"IyMj6OnpAcdxcLvdGBoagizLW/F4/C+Dqqrf393duRYWFr6VJOmLRqNBGGNI"
+"JpMYHh6G2WxGIBCAKIowGAxoNpuoVCp6JBKZHR0dveYsFotwcHDwU7vd5hRF"
+"IS6XS0kkEkooFHKYzWbUajWcnp6iv78f3d3dyGazkGWZFovF5Pz8/Hc0Ho//"
+"cn5+/tLn8+mU0vvJyck/GGMPt7e3CAQCYIzh7OwMhUIBu7u7sNvtUBQFqqo6"
+"eJ6PEV3XSbvdtqZSqU+8Xu+/kUjkanZ29lfG2FQwGCSpVArX19fw+Xxwu90I"
+"hUJYWVlBLBb702g0npPHDwAAeUqUpnnm5ua+bLVaP6+vr38gCAKi0SjC4TBW"
+"V1dRKBQgCEIzkUj8TfAOHgXp9PT0S1mWPx0fH4fX68X+/j6y2SzK5TIGBgYg"
+"iiK4dwk85oD5/X6V4ziIoohOpwOTyQSPxwOn0wmr1YqjoyP8B1IvkDMaU1sT"
+"AAAAAElFTkSuQmCC"
;

set_image( 'Friend', camel );
set_image( 'Friend of Friend', llama );
set_image( 'Fan', dog );
set_image( 'Foe', panther );

function set_image( relationship, image ) {

    var imgs = document.evaluate( "//img[@alt='" + relationship + "']",
                   document, null,
                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                   null );

    for ( var i = 0; i < imgs.snapshotLength; i++ ) {
        imgs.snapshotItem(i).src = image;
    }

}
