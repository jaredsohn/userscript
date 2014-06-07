// Based on the original script by miss.mika (http://chrispy-cookies.blogspot.com/) 
// Modified by  (http://girlnamedtrish.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           smilies
// @namespace      http://www.girlnamedtrish.blogspot.com/
// @description    You can use emoticons in Blogger. by chrispy-cookies.blogspot.com
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	

buttons += emoticonButton(":001:", "http://i44.tinypic.com/f2itkp.jpg");
buttons += emoticonButton(":002:", "http://i42.tinypic.com/72px09.jpg");
buttons += emoticonButton(":003:", "http://i44.tinypic.com/21aaidx.jpg");
buttons += emoticonButton(":004:", "http://i42.tinypic.com/6qy9nt.jpg");
buttons += emoticonButton(":005:", "http://i41.tinypic.com/2eyues5.jpg");
buttons += emoticonButton(":006:", "http://i41.tinypic.com/152hmb4.jpg");
buttons += emoticonButton(":007:", "http://i39.tinypic.com/nqeb6o.jpg");
buttons += emoticonButton(":008:", "http://i39.tinypic.com/6e29n7.jpg");
buttons += emoticonButton(":009:", "http://i42.tinypic.com/300v6z5.jpg");
buttons += emoticonButton(":010:", "http://i41.tinypic.com/azi4ci.jpg");
buttons += emoticonButton(":011:", "http://i44.tinypic.com/nqafix.jpg");
buttons += emoticonButton(":012:", "http://i44.tinypic.com/2z70pxz.jpg");
buttons += emoticonButton(":013:", "http://i40.tinypic.com/n16scx.jpg");
buttons += emoticonButton(":014:", "http://i41.tinypic.com/qpfmrp.jpg");
buttons += emoticonButton(":015:", "http://i39.tinypic.com/5vtb8k.jpg");
buttons += emoticonButton(":016:", "http://i40.tinypic.com/14jq8h1.jpg");
buttons += emoticonButton(":017:", "http://i41.tinypic.com/2dij403.jpg");
buttons += emoticonButton(":018:", "http://i42.tinypic.com/30hqamd.jpg");
buttons += emoticonButton(":019:", "http://i39.tinypic.com/2vun1nl.jpg");
buttons += emoticonButton(":020:", "http://i40.tinypic.com/11u9ufc.jpg");
buttons += emoticonButton(":021:", "http://i44.tinypic.com/20i8jt3.jpg");
buttons += emoticonButton(":022:", "http://i44.tinypic.com/14v4eur.jpg");
buttons += emoticonButton(":023:", "http://i41.tinypic.com/11j6dkk.jpg");
buttons += emoticonButton(":024:", "http://i41.tinypic.com/op742.jpg");
buttons += emoticonButton(":025:", "http://i40.tinypic.com/24eruy8.jpg");
buttons += emoticonButton(":026:", "http://i39.tinypic.com/2co4jd2.jpg");
buttons += emoticonButton(":027:", "http://i40.tinypic.com/f2o7bq.jpg");
buttons += emoticonButton(":028:", "http://i42.tinypic.com/2ngrn08.jpg");
buttons += emoticonButton(":029:", "http://i39.tinypic.com/2l9qtud.jpg");
buttons += emoticonButton(":030:", "http://i43.tinypic.com/wqo3tf.jpg");
buttons += emoticonButton(":031:", "http://i44.tinypic.com/5zkymx.jpg");
buttons += emoticonButton(":032:", "http://i43.tinypic.com/29qm8g0.jpg");
buttons += emoticonButton(":033:", "http://i44.tinypic.com/3163hxt.jpg");
buttons += emoticonButton(":034:", "http://i39.tinypic.com/11ifse0.jpg");
buttons += emoticonButton(":035:", "http://i44.tinypic.com/2gtdddt.jpg");
buttons += emoticonButton(":036:", "http://i43.tinypic.com/zkfxux.jpg");
buttons += emoticonButton(":037:", "http://i43.tinypic.com/690yvl.jpg");
buttons += emoticonButton(":038:", "http://i42.tinypic.com/mct8id.jpg");
buttons += emoticonButton(":039:", "http://i42.tinypic.com/2luz47s.jpg");
buttons += emoticonButton(":040:", "http://i42.tinypic.com/v3m2a8.jpg");
buttons += emoticonButton(":041:", "http://i42.tinypic.com/e19ma9.jpg");
buttons += emoticonButton(":042:", "http://i40.tinypic.com/2mre1ko.jpg");
buttons += emoticonButton(":043:", "http://i44.tinypic.com/10z6bls.jpg");
buttons += emoticonButton(":044:", "http://i40.tinypic.com/v6kwfs.jpg");
buttons += emoticonButton(":045:", "http://i41.tinypic.com/9ay3qq.jpg");
buttons += emoticonButton(":046:", "http://i43.tinypic.com/vr6k2h.jpg");
buttons += emoticonButton(":047:", "http://i39.tinypic.com/2uejxfm.jpg");
buttons += emoticonButton(":048:", "http://i39.tinypic.com/1eu1j.jpg");
buttons += emoticonButton(":049:", "http://i39.tinypic.com/211qo7l.jpg");
buttons += emoticonButton(":050:", "http://i39.tinypic.com/al0tv6.jpg");
buttons += emoticonButton(":051:", "http://i43.tinypic.com/2v0ydqd.jpg");
buttons += emoticonButton(":052:", "http://i42.tinypic.com/2vj3p09.jpg");
buttons += emoticonButton(":053:", "http://i39.tinypic.com/2zswqbn.jpg");
buttons += emoticonButton(":054:", "http://i43.tinypic.com/opbb6t.jpg");
buttons += emoticonButton(":055:", "http://i40.tinypic.com/111i9ly.jpg");
buttons += emoticonButton(":056:", "http://i42.tinypic.com/6qcgo0.jpg");
buttons += emoticonButton(":057:", "http://i43.tinypic.com/212dfmw.jpg");
buttons += emoticonButton(":058:", "http://i44.tinypic.com/mr699l.jpg");
buttons += emoticonButton(":059:", "http://i42.tinypic.com/1z4wj0o.jpg");
buttons += emoticonButton(":060:", "http://i42.tinypic.com/23uo00.jpg");
buttons += emoticonButton(":061:", "http://i39.tinypic.com/20j1bev.jpg");
buttons += emoticonButton(":062:", "http://i44.tinypic.com/24fmej6.jpg");
buttons += emoticonButton(":063:", "http://i40.tinypic.com/sb3mmg.jpg");
buttons += emoticonButton(":064:", "http://i39.tinypic.com/erbl8k.jpg");
buttons += emoticonButton(":065:", "http://i44.tinypic.com/149v254.jpg");
buttons += emoticonButton(":066:", "http://i39.tinypic.com/308fsd1.jpg");
buttons += emoticonButton(":067:", "http://i40.tinypic.com/rlyf7o.jpg");
buttons += emoticonButton(":068:", "http://i44.tinypic.com/2r2b0aa.jpg");
buttons += emoticonButton(":069:", "http://i43.tinypic.com/2wem613.jpg");
buttons += emoticonButton(":070:", "http://i39.tinypic.com/71s106.jpg");
buttons += emoticonButton(":071:", "http://i41.tinypic.com/200v4gy.jpg");
buttons += emoticonButton(":072:", "http://i40.tinypic.com/wmmss9.jpg");
buttons += emoticonButton(":073:", "http://i42.tinypic.com/2ijtaax.jpg");
buttons += emoticonButton(":074:", "http://i43.tinypic.com/2s8gv0k.jpg");
buttons += emoticonButton(":075:", "http://i40.tinypic.com/1zveqnn.jpg");
buttons += emoticonButton(":076:", "http://i39.tinypic.com/hwev55.jpg");
buttons += emoticonButton(":077:", "http://i44.tinypic.com/s653r9.jpg");
buttons += emoticonButton(":078:", "http://i39.tinypic.com/35085ds.jpg");
buttons += emoticonButton(":079:", "http://i41.tinypic.com/aeps0h.jpg");
buttons += emoticonButton(":080:", "http://i43.tinypic.com/2rppkhz.jpg");
buttons += emoticonButton(":081:", "http://i40.tinypic.com/apjm6h.jpg");
buttons += emoticonButton(":082:", "http://i42.tinypic.com/wuqnp3.jpg");
buttons += emoticonButton(":083:", "http://i41.tinypic.com/2eaqdfb.jpg");
buttons += emoticonButton(":084:", "http://i39.tinypic.com/256u2rd.jpg");
buttons += emoticonButton(":085:", "http://i40.tinypic.com/ta6104.jpg");
buttons += emoticonButton(":086:", "http://i42.tinypic.com/2h72yh4.jpg");
buttons += emoticonButton(":087:", "http://i40.tinypic.com/28topd.jpg");
buttons += emoticonButton(":088:", "http://i39.tinypic.com/wml8v6.jpg");
buttons += emoticonButton(":089:", "http://i44.tinypic.com/fnfyub.jpg");
buttons += emoticonButton(":090:", "http://i43.tinypic.com/1zydbhl.jpg");
buttons += emoticonButton(":091:", "http://i42.tinypic.com/1o4w3m.jpg");
buttons += emoticonButton(":092:", "http://i39.tinypic.com/96hiz7.jpg");
buttons += emoticonButton(":093:", "http://i40.tinypic.com/szdfmx.jpg");
buttons += emoticonButton(":094:", "http://i41.tinypic.com/14ieh4p.jpg");
buttons += emoticonButton(":095:", "http://i43.tinypic.com/oi515j.jpg");
buttons += emoticonButton(":096:", "http://i42.tinypic.com/2q36jjd.jpg");
buttons += emoticonButton(":097:", "http://i41.tinypic.com/10hw2zb.jpg");
buttons += emoticonButton(":098:", "http://i39.tinypic.com/538u4g.jpg");
buttons += emoticonButton(":099:", "http://i44.tinypic.com/2zix11y.jpg");
buttons += emoticonButton(":100:", "http://i41.tinypic.com/nwx7ki.jpg");
buttons += emoticonButton(":101:", "http://i43.tinypic.com/2rzp1s6.jpg");
buttons += emoticonButton(":102:", "http://i40.tinypic.com/spuc92.jpg");
buttons += emoticonButton(":103:", "http://i42.tinypic.com/mcqjk6.jpg");
buttons += emoticonButton(":104:", "http://i44.tinypic.com/15hdiip.jpg");
buttons += emoticonButton(":105:", "http://i40.tinypic.com/de8k1x.jpg");
buttons += emoticonButton(":106:", "http://i44.tinypic.com/nm0sbc.jpg");
buttons += emoticonButton(":107:", "http://i40.tinypic.com/nwzipt.jpg");
buttons += emoticonButton(":108:", "http://i39.tinypic.com/4j5duv.jpg");
buttons += emoticonButton(":109:", "http://i43.tinypic.com/2mcazd2.jpg");
buttons += emoticonButton(":110:", "http://i39.tinypic.com/fjgvq1.jpg");
buttons += emoticonButton(":111:", "http://i42.tinypic.com/4hqqa1.jpg");
buttons += emoticonButton(":112:", "http://i43.tinypic.com/4sjk8k.jpg");
buttons += emoticonButton(":113:", "http://i42.tinypic.com/25tf4ud.jpg");
buttons += emoticonButton(":114:", "http://i39.tinypic.com/96ghg6.jpg");
buttons += emoticonButton(":115:", "http://i40.tinypic.com/28lunue.jpg");
buttons += emoticonButton(":116:", "http://i44.tinypic.com/9rm05y.jpg")
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(girlnamedtrish, http://girlnamedtrish.blogspot.com/) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);