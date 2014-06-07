// ==UserScript==
// @name           Enhanced Post Message
// @namespace      shoecream@luelinks.net
// @description    Gives you some baller options to post messages
// @include        http://endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        http://*.endoftheinter.net/*
// @include        https://*.endoftheinter.net/*
// @version        1
// ==/UserScript==

var mod = false;

function $ (id) {
   return document.getElementById(id);
}

var Buttons = {
   get dom() {
      if ($('edit-toolbar')) {
         return $('edit-toolbar');
      } else {
         var b = document.createElement('div');
         b.id = 'edit-toolbar';
         var m = $('message');
         if (!m) {
            // get first textarea? 
            m = document.getElementsByTagName('textarea')[0];
            if (!m) {
               return
            }
         }
         Buttons.msgbox = m;
         Buttons.msgbox.parentNode.insertBefore(b, m);
         this.createButtons();
         // mess with the selection of the box, lol
         try {
            m.selectionEnd = m.selectionStart = 0;
         } catch (e) { 
            // why does this throw an error? I don't really care
            // console.log (e) 
         };
         return b;
      }
   },
   createButtons: function() {
      var Bi = Buttons.images;
      Buttons.add(Bi.bold, 'bold', 'Bolded text', 'Bold text', '<b>', '</b>');
      Buttons.add(Bi.italic, 'italic', 'Italicized text', 'Italic text', '<i>', '</i>');
      Buttons.add(Bi.underline, 'underline', 'Underlined text', 'Underlined text', '<u>', '</u>');
      Buttons.add(Bi.pre, 'pre', 'Monospaced (preformatted) text', 'Monospaced text', '<pre>', '</pre>');
      Buttons.add(Bi.spoiler, 'spoiler', 'Spoiler tagged text', 'Spoiler text', '<spoiler caption="spoiler">', '</spoiler>');
      Buttons.add(Bi.quote, 'quote', 'Quoted text', 'Quoted text', '<quote>\n', '\n</quote>');

      var mods = [1, 994, 869, 1555, 978, 1996, 4438, 3618, 9163, 4148, 1408, 9068, 94, 2607, 10348, 1020, 4651, 10178, 6497];

      if (mod) {
         Buttons.dom.appendChild(document.createTextNode('\u00A0\u00A0\u00A0'));
         Buttons.add(Bi.mod, 'mod', 'Secret moderator messages', 'Secret message', '<mod>', '</mod>');
         Buttons.add(Bi.adm, 'adm', 'Unfiltered HTML', 'OMG wacky and zany mod hax here!!!<br /><blink>I\'m gay</blink>', '<adm>', '</adm>');
      }
   }
}

Buttons.images = {//{{{
   adm: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACgklEQVQ4y6WVPU8bQRCGnzVYWIizscFXgCJqx04VpfAPwFKEEir%2BAMJ%2FwFSJUpM0uKBDZ1KmcJASWtJQJC1JYUQZIXEo2JBPjIQFOymcPd%2BXkygZaXW3s7tz77zz7pwSEVlaWmJhYQHLsri5uWGYKaWG%2BkdGRuh2u2xtbbG3twciIpubm%2FKvprUWrbU339jYEEBGAcbGxgA8tFprAEQErTUiEjvMmjmTy%2BVIpVIAjPoDmmBmo3n3B%2FPvM9T4P359fT0IbBD6NxgL%2BwzS8JpSKrCWCKceHuMfXzAxMYFlWViWRTqd5uVxJpJFeJ7wp%2B9fTKV%2B8PbJOKpU7UN3WrSc%2Fmu1pMhuuwGuDfoAYn9g8zxo2FTqA0k55SLFsjNwVEus7esI77%2BlYrz7judVv1JrzNmAPUfN561XnvGBfEQhscUDoH1EoSV8u%2FXdR88XPstdHp%2Bd8UiE6WnhzarNUXudO1NB2UWoMNY5OaRaUmQyTY4zmUA2ANOnr1GqT9XhSSdARaB4fsRaa%2FIzBUMkJaXYdie9Q1OfXg0KChRm8gHZBRBHzM9lbZfFIuj9NZ6%2BFzr2oqcOcCgXGS43%2F1XWWvM1eY%2FlX4ed5XnyBw3sSp16xWannffUUdtdZNJ1I9fcK16c3IorbXYPd5ihEUi9Wlplrr2M47S4f7sXaQFmPhqWm3menyeYXy%2FTUKUQT3UqdoGWrIDrRooWkFscYhGh07F5eHrKg5irjutGGpXW2qM1omPTTP40hvWWAMdxLXNYJwsHDNOYSCQGgS8vLwHIZrN%2FhTTuwyJCOp3m6upqELjZbDI7O4tlWfR6PeKyMBTF%2BUSEZDLJxcUFzWazvyYiMuwn%2BT%2F2E4a07WPJ1%2BNWAAAAAElFTkSuQmCC',
   bold: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAAC7ElEQVQ4y52VT0szVxTGf3NnyESrGbUoBougEt%2BFIooYcCFxUxBEofgN%2Bj267t6VKxfdqQhdCYKgUBAXAd24EBcKbUIqSMB0JuTO%2FdPNO2mcTLp4DwzMvffMuc95znPOOAAHBwc%2F7%2B7u%2FlooFPJKKcUAcxwnc18IgRBChGHoHB8f%2F3Zzc%2FMLAEdHR1X7jWaMscaY7vrw8PAf4CcPwPd9H0BrDYAxBgBrLcYYrLWZT3KWfDMxMUE%2Bn88B33tfA%2BokrV7H5L03WK9fQk3v5UopAxivF2GvQ2LpvQRp%2BsxxnE9nXi%2FK3hQ%2FPj5otVpIKbHW4vs%2BWmuiKMLzPKanp3Fdd2BWmYGVUtRqNe7u7nh5ecFxHDY2NvA8j%2Fv7e1qtFuVymc3NTUZGRj4FTVgV6WIBuK7LwsICs7OzdDodfN9nZWWF7e1ttra2iKKIs7Mzrq%2Bv%2B3gfSEW6MFprjDG4rovjOORyuS6f7%2B%2FvmcXuQ2yM6TporVFKEccxnU6HKIoIw5BqtUqtVmN0dJTFxcVM2XURJ4u05JLgzWaTarVKs9nk9vYWKSWVSoW1tbU%2BKj4Vrxdx4qC1Jo5jpJQMDQ1RKpUYGxsjl8txcXHB%2Bfk5Qgh2dnYypSiyej9xVEohpURrTRAEFItF9vf3mZubo9FocHl5ydPTU6bcRLqVE76MMV3EUkriOMYYQz6fJwgCpJS8vb1Rr9f72vx%2FVZGIv91udy%2B21lKv13l9fSWKIoIgoFQq9c2UgYGllDw%2BPvL8%2FIwQgna7zdXVFZOTkzw8PNBoNKhUKuzt7VEsFvvGwMDAAMPDw5TLZVZXV1FK4bouQgiWlpZYX19neXmZqampvkmYZOelOXYcp9t58%2FPzA0dmeghlcux8bbO0yLMmWVoB6XEghPgvcBiGAmB8fHwgwjTS9MXWWgqFAlJKAQgP4PT09PeZmZkvhULBlVKaLE0n8yFrz1qL53mEYeidnJz8Bfyd%2FB2%2FA34EfgA0324u8Cfwx7%2BVZRmnW%2FQjsAAAAABJRU5ErkJggg%3D%3D',
   italic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAAChklEQVQ4y52VsU4jMRCGPzurkOVggZwSCUhBFxShlIgXOFFQnahoKO49rr6eioriOqjuBRCgE6I5KQUVVEgXIUWELWAdBctrX8PmzGaXgpEsj72%2Fx%2BOZf2YFwO7u7rednZ0fURTVjDGGEhFCFO5LKZFSSqWUODo6%2Bnl%2Bfv4dgMPDwz%2Fug2Ktddbayfrg4CABvgYAMzMzMwBpmgJgrQXAOYe1Fudc4ci%2BZWfq9Tq1Wq0KfA5eDabZs3xgpvvGfFwWGv9yY4wFbOB76AMy0Vrz%2BPjI8%2FMzxpjJWF5eZnFxcYIXQkxeARD4XuY9e%2FWA29tbTk9PieMYKSWNRoPt7W0WFhZKz8oyw9ZarLVUq1U6nQ5SSowxdLtd9vf3WV9fn8I65yZ5CvLJ8udMHw6HxHFMkiR0u10ajUYptjQU%2BXk0GtHr9Xh6emJlZYV6vV6YYF%2BfhMJPXgbIdKUUvV6PJElot9vMz89P0TB%2FwZThPOUAHh4euLu7Yzwe0%2Bl0mJ2dncqJfy5bT9HNB4xGI66vr3l5eaHZbNJsNqeSnGfRG4%2FzkgHjOOby8hLnHBsbG4RhSBGLiugWlJWyc477%2B3tubm4QQrC1tcXc3Fxhiftn3mVFkiT0%2B32urq7QWiOEQCnFeDymWq0WGs5XbaHhwWDAxcUFw%2BGQzc1NtNacnZ2xtrb2hsNFScuk0HCr1WJvb480TZFSYq3FGEMYhqXczcLwpvL8GAshqFQqhGFY2i6LElYYY%2FHa%2F%2FIk94FlbTTfDqSU%2Fw0rpSTA0tLSu16%2Bd7FzjiiK0FpLQAYAJycnv1ZXV9tRFFW01raI01m%2FLdpzzhEEAUqp4Pj4uA8Msr%2FjJ%2BAL0AJSPi4V4C%2Fw%2Bx%2BNdi1yEob21wAAAABJRU5ErkJggg%3D%3D',
   mod: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB30lEQVQ4y52VvYrbQBSFv5FkW0uQ8c92Ttr4LdKlcpXCTbJV3iN1YFlCcOfCTUpVeYJgWNKlTV4gCyE2MRhkg43n3jSSrD%2FL670wSJrRnDn33DMzRlUZj8fvR6PRxyAIfGvtgRNhjDnZ77qus9lszGw2%2BzKfzz%2Bgqkyn0x%2F6xBARFZH0ezKZRMAbD6DVarUArLUAiAgAqoqIoKqVLRlL5vR6PXzfbwJ9Jwa0SVqqCr9mNJpN3J%2FHBZKW%2Fc8YgzEmN344HAQQL8swZSdH%2FfyrK2rj83f%2B3QzTBRIsr5i6qqJoQotNFFXKkyVSlZWXpp8bjHFr9K3TvRI4%2BwQIgqBeik%2F3LG6GpWxKUuSAVVmv11TVIVeTgkNKwKUFLpQii%2BEVU4%2BJptHpdOqluJvz590wV6OzjFFhtVo9umDZd6eKRGq3ms1RZFhpt%2FJWjgGspd%2B%2Frpfi9hsPb19ebrflcvlo%2F57U%2BAhMZdrFvqJc2ahmfP0CC6jKWWtl54pIKmvJFcYYtPeK1WJx1rNntzRgsowvOXCKMjqOcwTebrcOQLfbvWh3FYHb7Ta73c4BHA8gDMOvg8FgGASBu9%2FvpViY5F4r1iJ7yDcaDaIo8sIwfAD%2BmvgmeAa8Bp4DlqeHC%2FwG7v8D5%2BYG6k4HfUYAAAAASUVORK5CYII%3D',
   pre: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACaElEQVQ4y6WVTWgTQRTHf7vZmlCztZtoA41HMYLnQj20giiIPUiRehAt4sGDB0UQKq1Rq4JHIYiSQ6VaRAwUPXj0I9WT6NV%2BiDfrwRIrlLTQkn3jpRM3091Q64NhZ9%2FMvM%2F%2Ff8ZSSjEwMHCur6%2Fvruu6Cd%2F3a0SIZVmR%2BlgsZi8vL1tjY2NPyuVyHqUUxWLxs9qiiIgSkfp%2FoVCoAv0OQDwejwP4vg%2BAiACglEJEUEqFDr2mz6RSKRKJxDYg7awb9HVawY16HjQW3KdLE3Req9UEECcYYXCDFlOnIzXXLMtqWHPM1E0jwXmYLiorJ%2BzQ%2FwwdpG0aDn6b6aL0kaVolrbZ1Kh5PeJgMx61tjI0NEQymcR1r%2FK2opDpcTzPY3h4mHQ6zc6JGUSEcr6DTCZDJjPBbMDBhhoDnP10n2SX4uPSEvumx9nxaobfg4N8nZxl7%2BvDVCq3ERF%2BTeU5WdSnrvDs%2FVG6j3uNzQtGjCgodJETQZQCTQTg3qneesqi4PzzL9zs8UKhaIeS%2F2I37e3teAfmmDyWo1K%2BRu7EQy737KKjI89URZHuHeXQm%2F10dnaSzWZ5OhcCtwYqK%2BHCi2%2FcOZha965QvbdYWBg1YKXoufGD%2BeuNjY6E2%2BPuSzzo38PIu8o%2FYdtk6Aa4nVlc5HQE40xsh%2BFai9MMv81G2EUlIvWybkCFvkw2Y7gZpR39CJjsirrJTIMma23b%2Fmt4ZWXFBvA8b9MlMB0rpWhra2N1ddUGbAegVCq9zGazOdd1Y2tra2I2Rr9rZi%2BCZWtpaaFarTqlUmke%2BGmtX9LbgSPAbsBn6xIDvgMf%2FgDpHEJyEUDo8wAAAABJRU5ErkJggg%3D%3D',
   quote: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACUklEQVQ4y52UQWgTQRSGv91sTUS3kGwJQvTa9KI3b1K8WISIINKD4smDBWsvCgqiB8HqpYgEpPQQWooX46UoeKol0qPelKYeBEFRaiMUmhZasvM8NBMns7u19sHA7nvz3vzvn%2F%2BNIyIMDw9fLZVKj33fz4Rh2CLBHMdJ9KdSKXdjY8OpVCqztVrtPiLC1NTUB9mnKaVEKdX5L5fLTeCCB5BOp9MAYRgCoJQCQERQSiEisUvHdE4ulyOTyRwAAq9dMNRtmRv1t1nM3KepMQ9vtVoKUJ6J0NygzfZppHbMcZyumGu3vrNWmb%2Bd4eD0EiJCfeYw%2FsxSIiVxXXlm%2BzqwNH2Mc%2BUxXn0t0li4w8kbo8x9GdiVb5P3DmKzMI23zFwHxoY40Vfn9flnMDrE8aCb364cw59Mhd5VPELQ%2BMnyTqRdrMHC3SxBcI93v6E%2B20c%2Bn%2Bf5crdCOlSYl0H2NI%2FW1xkXQUk%2F42trPNRtimqn9ZPPqjaIEQpBt%2BwiVNiSi%2FDf%2BMj8JIy8PEuRz7y%2FCUxcYjAXpSiK2Lphc9XfXGTyySIrgzlWa0%2B5de0Fny73RwaqU9g2G7FeA1dW%2BdVODgYf8OOU2l1ucaNsnv4vicXlRHQcJ6e9FLYn1LORJuk07kLjdN0ltyTEe0VpXpymNaIK%2FZj8D69xI61V4dhPZtJLZhe0aXRd92%2Fhzc1NFyCbze6ZAvtgEaG3t5etrS0XcD2AarU6VygUir7vp7a3t1WcpjVFcT4Roaenh2az6VWr1e%2FAitN%2BpA8BZ4CjQMj%2BLQV8Axb%2FAAWASr8Fmse%2BAAAAAElFTkSuQmCC',
   spoiler: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAABuUlEQVQ4y6WVTY7aQBCFv4bhx8qYYAtpJsORWHMxdiy4gE%2FBYQZHkT0LJEACQVUWpE273TZR0lJLtst%2B9erV67JRVV0ulywWC%2BI45na70baMMa3P%2B%2F0%2Bx%2BORzWbDdrsFVdX1eq3%2FukRERaS6X61WCugLwGg0AqjYiggAqoqIoKrBbWP2mzRNGY%2FHAPRcQAsGMBgOGf5J6IK5702ThCRNa%2FHr9foAtgxFpNp2jaOoBmqZfp9Oa0mMMVUM4MUv3W4DWH7fXl9x26bO9VdZBqvqueXbQBRF924HwFxQA8xms6pKl3EDuGGlFqYh43VKEfTpE1DfIQ1gt2m0MLX3Lrhvu4YUz0BNRzK3R6122%2B%2F3raA%2BeJ7ntUNU0ziY2bNU4TT4lwhv7%2B8A%2FPj4IN%2FtwnZzj7LfBOOU6MZ%2F5nlDggZj3272gAAURdE6K3afn%2FdvvJnS0NgvpyzLoMf9ZvtzpJNxURSdk823mZXBytrwsR0mz7ZfYacrfJO7L%2FrsfKBK217vAXw6nQBIkuSvmIYSqyqTyYTz%2BfwAzrKM%2BXxOHMdcLhdCVViJQs9UlcFgwOFwIMuye0xVte0n%2BT%2FrN%2FEjqtwGjLDtAAAAAElFTkSuQmCC',
   underline: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsSAAALEgHS3X78AAACDklEQVQ4y52Uv4sTQRTHP7vZmEDckERME1svvVh6pVUqkRT%2BqAT%2FAUshoJXNFZJGUgR%2FgM1WVlbCBa69QhA8rVWIxjIJJGTfs7hMbnZ21oN7MOzMm9nvvO%2F3vXmBqtLv9x%2F1er0XcRxX0zTdUGBBEBT6S6VSuFgsgvF4%2FG4ymQxQVUaj0bFe0ERERWS3Hg6Hc%2BBOBFCpVCoAaZoCICIAqCoigqp6h9kz%2F7RaLarV6iXgSrQFTA0t%2B6CZ22D2OSONfflmsxFAIjtC%2B4Ax12cidfeCIMjshS717PjK61qNy29OLN%2BMw6cNGo23nDgX2gFENv08sKAA6uh8erpQ913ENrD9tS2rb5H%2FDDhypcgx2CLZSd0BOVVhX5JLXlYSyQBnpciXoY0R%2BqgXSbFjInmfuz4nYvUkT7zJczUOfW8%2FF%2FH3KX%2FPY%2BFcErpP2SRBREjT69x8Cby6y8dvpz6ZfeHTCDi4wd5%2Fyi0qrIbtvPtgxpFcZX%2B%2FzRMT6sEhv%2B7t5ZJWqLEPWFXpPvzD9L7kdPRJkim3oohVlUG7zcjbhR%2Fz%2FvOAW81s4oysuaowzcSM59MpzzxauvS9GgOB2zKLOpnLyJUxDMMz4OVyGQI0m83Cpu57XS5wvV5ntVqFQBgBJEnyodPpdOM4Lq3Xa%2FHVtJHI51NVyuUy8%2Fk8SpLkJ%2FA72DbpGnAbuAakXNxKwA%2Fg6B8mHSSOtqeYhAAAAABJRU5ErkJggg%3D%3D',
};//}}}

Buttons.instances = {};

Buttons.add = function (img, id, title, sample, start, end) {
   var button = document.createElement('img');
   button.style.cursor = 'pointer';
   button.src = img;
   button.id = 'button-' + id;
   button.title = title;
   button.alt = id;
   button.addEventListener('click', Buttons.onClick, false);
   Buttons.instances[id] = {
      dom: button,
      sample: sample,
      start: start,
      end: end,
      title: title,
      img: img
   }
   Buttons.dom.appendChild(button);
}

Buttons.onClick = function (e) {
   e.preventDefault();
   if (Buttons.msgbox.disabled) return;
   var id = Buttons.instances[e.target.alt]
   Buttons.insertTags(id.start, id.end, id.sample);
}

Buttons.insertTags = function (tagOpen, tagClose, sampleText) {
   var txtarea = Buttons.msgbox;
   var selText, isSample = false;

   if (document.selection  && document.selection.createRange) { // IE/Opera

      //save window scroll position
      if (document.documentElement && document.documentElement.scrollTop)
         var winScroll = document.documentElement.scrollTop
      else if (document.body)
      var winScroll = document.body.scrollTop;
      //get current selection
      txtarea.focus();
      var range = document.selection.createRange();
      selText = range.text;
      //insert tags
      checkSelectedText();
      range.text = tagOpen + selText + tagClose;
      //mark sample text as selected
      if (isSample && range.moveStart) {
         if (window.opera)
            tagClose = tagClose.replace(/\n/g,'');
         range.moveStart('character', - tagClose.length - selText.length);
         range.moveEnd('character', - tagClose.length);
      }
      range.select();
      //restore window scroll position
      if (document.documentElement && document.documentElement.scrollTop)
         document.documentElement.scrollTop = winScroll
      else if (document.body)
      document.body.scrollTop = winScroll;

   } else if (txtarea.selectionStart || txtarea.selectionStart == '0') { // Mozilla

      //save textarea scroll position
      var textScroll = txtarea.scrollTop;
      //get current selection
      txtarea.focus();
      var startPos = txtarea.selectionStart;
      var endPos = txtarea.selectionEnd;
      selText = txtarea.value.substring(startPos, endPos);
      // pretend that we actually selected text
      if (!selText) {
         selText = sampleText;
      }
      // clean up trailing whitespace
      // we have to capture here otherwise it only matches one space
      var regex = /(\s*)$/;
      var trailing = selText.match(regex)[1];
      if (trailing.length) {
         // remove trailing whitespace from what we think is the selection
         selText = selText.replace(regex, '');
         // and move our end position back
         endPos -= trailing.length;
      }
      // insert our tags
      // use join here b/c this is inefficient for large strings
      txtarea.value = [txtarea.value.substring(0, startPos),
      tagOpen, selText, tagClose, txtarea.value.substring(endPos)].join('');
      //set new selection
         txtarea.selectionStart = startPos + tagOpen.length;
         txtarea.selectionEnd = txtarea.selectionStart + selText.length;
      //restore textarea scroll position
      txtarea.scrollTop = textScroll;
   }

   // leave in for Opera compat
   function checkSelectedText() {
      if (!selText) {
         selText = sampleText;
         isSample = true;
      } else if (selText.match(/\s+$/)) { // exclude all trailing whitespace
         var t;
         [selText, t] = selText.match(/(.*?)(\s+)$/).slice(1,3);
         tagClose += t;
      }
   }
}

var Update = {};
Update.id         = 42023;
Update.curVersion = 20;
Update.callback   = function () {
}
Update.check = function () {
   if (!Update.id)         { return; }
   if (!Update.curVersion) { return; }
   if (Update.keys && Update.keys['version'])  { Update.callback(); }
   var url = 'http://userscripts.org/scripts/source/'+Update.id+'.meta.js';
   XHR.get(url, Update.onXHR);
}
Update.onXHR = function (response) {
   var splat = response.responseText.split(/[\r\n]/);
   var keys = {};   
   for (i in splat) {
      if (!splat[i]) continue;
      var matches = splat[i].match(/@([\w:]+)\s+(.+)/);
      if (!matches) continue;
      keys[matches[1]] = matches[2];
   }
   // set update keys
   Update.keys = keys;
   if (keys['version'] && (keys['version'] != Update.curVersion)) {
      Update.callback();
   }
}

// string utility function
String.prototype.format = function format () {
   var string = this;
   Array.prototype.forEach.call(arguments, function (e, i) {
         string = string.replace('{' + i + '}', e, 'g');
      });
   return string;
}

var XHR = {};

XHR.createQueryString = function (obj) {
   var ret = [];
   for (var i in obj) {
      ret.push([i, encodeURIComponent(obj[i])].join('='));
   }
   return ret.join('&');
}

XHR.createDoc = function (r, callback) {
   var doc = document.implementation.createDocument('','',null);
   var html = document.createElement('html');
   html.innerHTML = r.responseText;
   doc.appendChild(html);
   r.doc = doc;
   callback(r);
}

// adds an extra 'doc' property to the response object that contains
// the document element of the response
XHR.post = function (url, callback, data) {
   GM_xmlhttpRequest({
         method: 'POST',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': XHR.createQueryString(data).length,
         },
         data: XHR.createQueryString(data),
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

XHR.get = function (url, callback) {
   GM_xmlhttpRequest({
         method: 'GET',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}


Buttons.dom

