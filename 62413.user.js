// ==UserScript==
// @name           Steel Legion(StLo)
// @version        v1.0
// @namespace      Steel Legion(StLo)
// @description    Steel Legion(StLo)
// @author         Rascal

// ==/UserScript==

<form name="prestigeTrade" id="prestigeTrade" method="post" action="?location=wappen&amp;action=wappen"><div id="prestigeTrader" class="slider" style="margin: 10px auto;"><div style="left: 0px;" class="handle selected" id="handle_prestigeTrader"></div></div><script type="text/javascript"> prestigeTraderSlider = new Control.Slider('handle_prestigeTrader', 'prestigeTrader', { range: $R(0, 7), onSlide: function(sValue) { $('prestigeTradeVal').value = Math.floor(sValue); $('sirriTradeVal').value=Math.floor(sValue * 150); }, onChange: function(sValue) { $('prestigeTradeVal').value = Math.floor(sValue); $('sirriTradeVal').value=Math.floor(sValue * 150); } }); </script> <input name="prestigeTradeVal" id="prestigeTradeVal" maxlength="5" size="5" onkeyup="prestigeTraderSlider.setValue(parseInt(this.value.search(/^[0-9]+$/) == -1 ? 0 : this.value, 10));" type="text"> <img src="images/de/grafikpack-full/icons/36x36/wappen.png" alt="Ruhm"> <img src="images/de/grafikpack-full/icons/arrow_right.gif" alt=""> <input name="sirriTradeVal" id="sirriTradeVal" maxlength="5" size="5" onkeyup="prestigeTraderSlider.setValue(parseInt(this.value.search(/^[0-9]+$/) == -1 ? 0 : this.value, 10) * 15);" type="text"> <img src="images/de/grafikpack-full/icons/36x36/sirrilin.png" alt="Sirriline"> <input name="perform" value="Umtauschen!" type="submit"></form>