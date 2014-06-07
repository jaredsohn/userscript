// ==UserScript==
// @name          UserScripts Dark Blue
// @namespace     http://www.blackmilk.ch
// @description   userscripts.org in dark blue color
// @include       http://userscripts.org/*
// ==/UserScript==

x = '';
GM_addStyle(x);
document.images[0].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAAkCAIAAAAvurA1AAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAACEeSURBVHja7F0HfFTF1t%2B%2Bm91sEgIJLQgGpEqxfSLwsBAQHiCIhV4UVBTeQ5oUUSyYKCKgFMFCC6CgQIAI0h7Ko4OIIIROEhISQiBlW7It33%2FmbCY325Ig73vv83FZ97e5d%2BacmTP%2FOXPOmTNXuazeo7LKXQ%2FXtojfF%2FM1uTa17M71r7zknsvzZ0kJPuz6IwT93v8jNP9%2FXapKlht2X%2FEzL06pHVO%2FZs2aWq12c9K6jxcsOXNTfweU%2FzqgKxUKlUqJj1wmB9SdThc%2BLrf71kAPggoFaIJq2Rxyu90gWEryzw96pSy8QQUl5CV%2F76jsOWxyWHi1sLCwEH493LZdSbHp0LHTRS7FHXTedqwDkRq1yqDXGUP1RkOIQR8SotVo1Grcv2WsK5UKnVZDBEMNehDXgyijqSDA%2F1fINrgxA6yPeUzTZcAElUoVHR1dvXp1nU6H3xqNxmazPd2jy89XDHcAensv4A9YDzWEGAFJrYaUMSAOSBYV200Wq9liszucgGgVtBrHergx1BjKJg5okg2DxcJiLSowWUDT4XT%2B6RV8Bbr57x1V3QZPArijoqKqVasGMwZYJ32gVqurR4TeQedtV%2B2wNpgaNujVahXwDQA2aXgXvvEbd3A%2FRKcli6QKy4Wc0cQUgjFjtRXl5ZvwKTRZAXFQg5pXq5XlHIX%2FNtud63Vt10ETAetq%2FCK9TkKBGigoKLBYrTJZyB2M3m7tLgc0gcJiu717p7YzJgwPDwstKDRPm%2FX11t2HAE1bUTEgK3NVjaZKqVSrlFgWls2e0v7Be%2Bl%2B31Hvnj6XquYqDFD%2F01s0qkBYn9w1rPOACfgdGRkZERHhhXWz2bx3R9KVPFeV9FaQsECFT6mANExBT33X39KS5cqLyIZXIMKLry8XafMqw13aAK8%2B%2BTbAlztuwDeFFse31eaeMXFEuJGZi0A8cL95x36VgT1VKpVyp8u3rpSXVws5oOXklopiLk4ETxSe%2BiUoVvmeBh9r3ybdmvzLD4H%2FblYy3KTyj%2FVuYV0HTYJooNQJ62ru05AZYzKZftr6%2FdxFy87nh1XJ%2FcIokTRFWIBHGsrUj9dTChqwJvEYBXsu9xRwl7hR1StSQZKg%2BIOS%2FVdWHnJjBF1uXsFDtjRYoRB86Q4XqZxY4EO2b4XcRXX885RnNrJcNIBTc4lIiF%2FuqMX8R5WKGdYQjWTMgHjWO7kCT2Hc%2B%2BIGdQU70UL8QCnCOjkA0lpufofX5e0VLa%2Bop8EH2lcCfuXvO%2B4keqpFEnM4nAQRkpWSN1RKUwjTFzm%2BDfaGu0pRMulJY5cBE51OJxxTKdZBEYOVn5%2B%2FK2npvOWbzuYbHW55JbGOLul0GnheGEnqG5qDnliLiouLHfhTq1X7PrUV2e0Oh4LbsjoWmlAJuaAlkAPMWXxQhkAJRlB8KIfCAI3X%2FKEqKI4qqAGh4zFsBh3Hl0d5eAbM0wYs%2FSiKOyBGK35w7iCo0ag4d42Ks6fxIy0FzKCzqAGyABC5j17cFWxEGaDRfRSet2z9tL8PIaYLlm%2BgHyE6TWREGKiJ0SXlLTXomQCdTmohmqfhywWqoLXSoWF4cjrBETYS4azCngZCvAieCgnwRUgZSP5APvMoyqNCXn4hgqBgtqE4boIcI6vVSLvpogZxuNNN%2FIboUAf1HHztkja4HNz1KtfErtUf7zsWnGrUqCFsGGKPIQI2rbjSj1ws1NucisrrdfSqWrgxVB9CLlFps1w6q63QDAdAFhaqN5R%2FarezrgLxNBginiCZxCUQm8VaZLbagAzAF%2BOEkixsp2PjS%2FpM2hKSILd9IQsnCoWFGgx6HVMYpXxRgwCEXzqu0xSkOOUBuRcVwaEsweBi8oBaCIMwE5ovMpwhGG8HGoBv4I%2F7nWxiSLkTLCxWm7Wo6N25y%2F%2Bx79dH27bec%2FjE4eMpQDlahPmhVqukqzYpSy92%2BBNcOLacagZiJdqJjkuL4ZnZYoMLi3bwKBBmmjJ4TzFn%2FBqQpNTQHaLmKwGp%2FEENNDFGMNW8xl0YMCR%2F0EF5PCXFhIEIZDUJChRuAncKN%2FnX7lqle8KTkU%2F0G4cKvlh3OBzAOUx2rVYbN%2BLjHadf3XSq0v6BUokZbDSEQHAms83F1RLmPUAB0ZA8QiVPS9iSLQcIQrhKpz5A1BB0s0b1MTEwQ1IupDGFpVICXmigRVGE6iiOPzG06HBxsU2UB4WMrNyrObnMXePxbKY%2BGdzVGBf8sFg9KyZJuW7NqJg6UWABqDBqbjdAE4Q79A3KsO6weanGgAFVKI%2BBbHFPfRLCwV9PE3coP3yTdsdYAtkoLLgDEHVrRdWOjjx64izmMDqy%2B8CvPx08Di6QBmrR2DPrggtKXjrkbjbMrrb3NcdvaiGxA%2FIomgDQW5j6KAd39N1ksYIpiqEwHgEoQXoKUIGCF%2BIJ65gnIIJxxCjgJkmgTnSNmNo1fOWPHyRbr3GndQl6sfk9DTKzr%2Bfk5jMIaNRicjpskKqueaP6RDPz2nVlqZ1G1Wl5QSPQNawktAaWWZsUdwfWJ3aJ6PXS22AWGhpqNBpDQkKket1iseTl5aGaXq%2BHQX%2F2QuqH08dtPi2vjHZHi2tEhkdGGNGri3tXi0cNOwwIM%2BohX%2FxGHwpNVunT6Pt689VAhUUUsnt9xLOvDe5F9iuutMxrq5N2fvr19xAxBgNlMN4QItihk9HVI8a%2F3Hfg052lLaEqS9ZsgYIhS0fFl1pIdu3n71CZroMn9uj0yOhhfah86y4vEghALTh34JVsJ8gXxF%2Fs%2B9cBvePq160pbUDyrgNfrNr8y8lzOs9KrwCaWzRu8P3i93y5p2Zkx7bv%2F%2FbrQ98ZO4yefjBv5WdL1mEsgY81C6d3eKgl3e825I30qzlTRg0cJOlvQaF5YeJGdBYoBzMMK2SIWn%2F5n1a%2BY7Tn0IneI94ErLFCjnvp%2BSA9hb4sMFkgYbLfhBOMzmAEgV0QgQRgnbzQt5uXBKTyR%2B%2F5SsImEpqaemBNaR8T0zNzZk59hRpw%2F19fyi8wk3aAxnmgZeOJI%2FtJuwCaCfNXrkrauWX5R%2BI%2BhZuAq9y8AmhJqbuiIKxP6V7jhUlzYauAf1RUFODucV041qHUc3Jy8JTseJjvre9t%2Blb8vB7NSirvqpLpX95wdEFbMM%2BGqw2vpyazFZKFLKBjZr31KoZTjAEuyBF3tq%2BaRYYv9CjUCu5jPDDqx7Z%2B5YV1UeVI8uIOD7aELChEAdGTaUjXyEG9CG24krbthTrEJJz91qiKuTPlp4BwQRws8NQL67gA5U1L4hcljENvyZ5h6rbYHoi7r83g8d7K7wf1e%2BqJUzuXDSrfX7QWbVi3%2BD38KDRZ0F8Wwg9gdmNRgdwKzZZPAvcUcwbDxDdiVdIIPdnrZMMAvpgJqLLjm098JeAjfzZh0CoIQZRp0fjuxR%2BOpwb8dvrCmQvpwADaX2AyTx09ENLzmq6guShhfPLSBGOo3jfcJBz3cttM%2FVo5Boz5KDk5%2Bccff9y0adOWLVAJWGjUhPXCwsKMjIwiWG12e2ZmJn6vX78%2BPT0diH935sLuTasQiyypyp8YVD4G1j5d%2FzK4Txe%2FBFs1azh2xHOY%2BuQIAm1jhj%2Fz4ZRXgrQhIix01bxpsIYxnWCM4lvqvfV%2BsoP4vWLdNkyJgU%2FHDXn2ySDcXXxlR0kguNeTHUA8IizY7lvPuHbrv3jfZGGsmeUgiSdKuSeu367wclZkZUat9ObQZ7sG4oUWrpgzFc6vmXt8QcIqWJ3694ob8kwwOZMJKo3%2FEKqw4JANgyGIvasOQOk71b3k36tLeyz1mGBQ3lh2%2FMt%2F%2FXYn92GA%2BNeHPztq6NOBaD7atk2b5o0qZVdX1zn69u137Nix7OxsmDEQ8eXLlw8dOtS5c2cY68A6kA3Qh4WxmOO2bdvq1q0bHh6%2BZMmS0aNH39%2B6xVsJ80smjdpyTiW73RePV6G%2F8u6dHhE3scQv%2B%2B7Hx9q2eeyRNkwBpFz8eNE3GEXMDUjtgVZNpo4eJAofP3Vh%2Bfc%2FHj99Ab8hjjHDn20QU4sefR4%2FrnmnYZC1k%2FmF5byZ%2FELzy5NnxdarffZiOtZoDExluANMGOlF8eOkpFDgh10HoDVgB%2Ffo1K5%2BTE2hk1o2jU05n%2BYVBSfur0z%2BJPau2hcuZ2pKIzaVudIyrm3etR%2BKsF6daMwoMeVaN2%2BYMGnES2%2FMAqmV67f%2FfOj4kGeeFHKAfGAPXMnMAWp7dWkXqKcnUi7O%2FnIt2uKigKSsxGu%2FVs%2BXVjQ48dM3pbOdJIAfLZvE9uxcRh8q%2BddTF06fT8UAe8kf18QPFmES7D18kkWTnK72D7UQ4angZCuGe6Nqdre%2BduH1AmAdtgoLRWk0N27cgLFuMpkuXboETQ%2FbBh4qBuahhx7CZKhVq1bHjh0jIyOh8h9%2BoPXUGXPNE0btSb%2FN26sUXcJ3RHiZ%2BF4Y%2F%2BFPB46%2Fix%2FPd5v99qgBf3sfJgFkjVGAkp70an9REqOFwuJP1MKdOdNHD3uuK%2BmYkQN7vv%2FZCqaYXeUAN3LK7J8P%2FHbw2OmwUAN0YrVwY4Xc3dyXjZ80Qora%2FqPfO3byvE7HAmeYVO%2FMWfbuuBdeG9I7YcEqMqmNoSFFxSzh0Ys7WBw%2BnoJeg7s0kBrkmvFZIuAISwO6F5Snzfxq3vtjnurcXqj%2FGZ%2BtvHot99vN%2F4CgHn24jYD7yvU7yIcGZCPCAvZ00JgP4J%2FAnqHQsHSF4RsFzBWBunlpQA%2BpXn9lyifrt%2B6hgA9Mt4YL6yz8YGzrUjUMA71T%2F3Fi70lc85etX7p2C%2BxDTHSjQQ%2FcS9ccCBYi2rXvF0G2xsyIVZ9Ow6yubM5MicNSvXp1WO3ANBAPJzUiIgJQPn%2F%2BvM1mw5%2BA%2B4EDB7ACNG3atG3bthcuXGjXrh36SNZO%2B7YPjp80vXUN023PHmFBD6Viz8HfxM2ln0wmfQPsNnl0cHbOTRbh5gHumFpRHR9uLcAtxbqQ1Nh35%2BOb%2FoSJwrd8ynQVXTv3Hg0PM0DQMAexRu89crJC7miqlDsuYP1EyiXQgbcNFOIb0%2BbjRd%2B27Pzil6uTMU4UrSN714s7gI77odwb8Yq7%2Bb027dg39%2Bvvwo0GzE%2FUgveP%2FvztrU%2FTMrIlRkJ7T9xao5YuGBQMRV187zvqv6dNHx%2BSk5un1aqh2j1bFu4S6d4W%2BZ2Y0vBNBYVJ8Ys3bttLlNEqmOOpGddee3OO1AKpVzvad33b9vMRFh3mwuEJbWqptZYwf9VPB34VZCGr%2FALTwDEzKptMcSpXl3rw%2B0aNGsFcAYIBd71eDyWRkpICY4Z%2BQ8cfPHiwdu3aaWlp%2BA3EoyQaSoFVuLA9und9ununalrn7Uxv4CoH3V68erPAKNTS7jVz8cE6SzeZei5hRs8jD7QQdTFUJek%2F%2BX7yfk8WSy1IQRV5yXrPoRMwQvGh8CJ%2BLF27tarcsdRCr8N5Za6z1YaSXE%2FLMX8wNTCKcKIolsc3f5Q%2B3Fl0GQ%2B0XIFVKCjMIow9FCywCE5oDIgAkgsTN4oymIpKnurO508Z3uGhUUQFH6w5fnr6yH0FpTe9TH%2BxAwqEoC91omsI1Q46X6%2F5gfdXyaPsNhQAi4tpVzfv2C8dJt%2FuHPntDBSEik8haJP7771HqrC8yGKygGzujXwp2WBwNzuUSQfS0lIOt2rVSsn2PhncgWAYMwZ%2BZWVlbdiwITY2FhOgcePG3bp1A9yph3BeyYXFIvDq3yY8GOOqqrkCzcr2B2R%2BLFSoE0AzMiIMyrfHsMliJEhM%2F1gzZ%2FuqWUAGkASHDytp3VpRVZ1RDerV8llSZKRuocXwATjsDmfPF6ZUiTvMSi3bKGQhVBjTqIsPPDOMEBCJKpTESzarVNcSd1jDkAtDUuUyFM9eugK9QCFzsIO9oeDB39PnUqUOorzskuoUnrOgVuHb4XT1GObT029n%2F5j4MagV8f0%2BdJn2iz0pB%2FKysyIUX6cLtj6QCpqYe%2Bgs5jvbVlOyCXzy7KWyuEpMLd%2FusK0JtVr4weHGUClZPMIH6wwLM1hsdn9kKzBm9mdHbv9mLoAOHc927Lk9A6BD3%2B%2FduzcnJ4cMd9jrmAkAN7S%2BjV8OHtOgjDFULLQ61YoqJBJRwgMlV%2FDcjHKzBSoKXcXSDD8PWqHZE0PhV5X3x1v%2FsOwjpUpZaLJabDaX21V1e4kGq2z8%2Bd6cnM9ktveJ0cKYXUjNrCp3v7lfpTlPMr5x6ycqSGFZsbn4f3Bxjp69T0D5Ypr%2Fnm5aEg%2BM024UmWf4wTZidRq1JLPjNiWEKsQpFn9pdmX5UaUnAapw%2BJA11OZUJJ0L3Th3JCz4mJgYtt%2Bp1QLxv%2F%2F%2Be25ubmZm5t133929e%2FcaNWoA1kA5dD%2BgSasYRIA7RfyiEH5Q4cq8AF1st1OOit3uhB6V7pJg1vK0EyUdYDNbrMMnzoxt3x%2FWpCgGByX%2BjRGkNfMLzFJPS37XY4E%2BivqPKxs8oYmN23%2F0JLMlvKFJJgpldLnJf6iQe%2BqVMkO5ZZPYYr4LCwMjzGiA1Q7lSqE6Lc%2Fn4XDRkhnjd6SqBPYmsfXQAB7%2B14EdUIvG407zxg2kcZugyyzjSHldfnvaqllD%2BNmkocGierXwGvwTGW5kefl8OzIjK1daHiMrEiWgsJimZylDdghH0qrsYCs%2FF4KULEwyts4UY51RgiYseEgYzgTuSMN3FcCdETXrVv8qS5r9EjAdHR2NaXvq1CnodajzqKioNm3a4L6DZ2vB2lTzCywBeqHmYfzUjAgJdJaPPBIMyT8PnxA3H2zVBGs6mQ1Y8h5q3VRq%2FrL8CrsDnaEdGbjq6P7lK1mAstQN7dWlA8XG4J5WJhQtTVljGSs8cuK3AAwSZszweVgl7j07t2tYvw66BjrMS2MQ1KIU7mCQ0B1KemNrGstXdP9BdThxZD9ID7JiBzj0IUAYWKBTrw3uJcqcPHPJ7%2BkNSiqk2xB1kJ4CTyw1iSOeJybp6GwhpjG5vxnZOWmZ14TtNLxvd5PZCoTwPKIQsEb3IRZp3FAqNK%2FpB8lA16DW1ZxcQRbXexNeRGcdDieMJTLhQPb%2Bexu3btawCnDHdaFAv%2FSw85v4IUajMTIysl69enl5eVDt7du3b968OW08qfjF9xo8eh2GDZk0e5IWH88odvrLkRSZnxjg9Mwc6SYirLq8AtPN%2FMICk%2BWNkf2l2gjKgG1qmpnl9%2FbrQ7clzhSeUNK2veWtUpYpAeuNQuxkdC79ZLJvS%2BZMH%2F3O2GHVwkPRCT0%2FxYNv3%2BgHN1K1ACnEDVN7eiW4Z2Rd%2F%2Flg2eD9sPyjBjE1sUbBnWImtdmCgZ8xcTjut3uwBZ2%2Bo41xp9P1B%2BH%2BVOf26BfbfTRbYNHCuMIYbFqSILWMt%2Bw%2BJBI0y6WssRRFDCD7RquC9xSiKDCZ8YF9X6dmdXwAaIfDKRTE6qSdovyU0QOZm2uyMEfFaoMoIBB0XxSAuK5k5Sj8Hcui5GdIyM1TM6RkB%2FfpMvvtUbgPzNzMZ8h5qkv7bxe8Xdn4h%2FSPiwX6lb9YlTNf6DdlBSAO2x0Qr1mzJkZGinV8s5hUURHgjkdo7q51i%2Beu3nPVYgg0WdF0nmiqXJu8e%2BDTccIoPLl9SeL67dQN6fCsStpBRzMxHs91f2w031G7tO8brLCpGdkUOxcLIk9AZJkkk%2BIXb1v5Md1HmQYxtTZu3%2Bu7zTR97LBVG3bEL1gF94vA7dVaWLQgCc1XUGjp063jqIq4w4DFCE1K%2BOLgxoUCHPs2LNhz6Le9R05CPvVqR%2FeIe4SCQis%2FnbZqw84P5ifa2MLmSU37gxek1%2FF%2FWvvdZuKR7A05uXkUKZLmunCN7gRk4epBb%2Fd%2BskOQnuJPKCBMCbjCixPGD%2BrDchYAxCkffYllEIYQiHz97Q8DesXRbhoaABQG2Q96I34xJb35bjNRggkPFbCUsiVrtrw6uJfoETqLD2RLVlPwPexgcCcdv%2BywVZYwpP%2FUxNjYWDLTyXQRcMcdKHXAnZzL3UlL5q7afaHQ4AyQ%2Fg7NzkwCOxYg9dETZ2HPiMwHQNxrw4zH4347fPwMLVW1akcu%2FnC8eCQdgNKJsTOUZfxqYVIc%2B%2F3c%2FOUbRpfuNkPH%2Bw11MW2kUKAHlDslDxDyx%2FypXbP6wg%2FGBudOh0fR1MvpWSOnfLIoYbzU1pQG48uM%2B2ax8DQwR91u9%2B3ySQGy0f622U%2BkXJzz1VryHCgJ3ivfHahCE2pFR0pb7tvTxHXblcyplTW7pz5hHdeA3nGYGDk38ihwDPU0aMyMzUsTyvZ0mzX0a2ZAUPB2UAyogO73Z2Kx7GWKBWMp7D50ElYGKbL9CrYKxoxUxycecXybMORaZirlhEltGGGvQ6%2Fb7fad3y2au3LHxcBYJ5cDCyaWQsqSHTYuAWMQqEF4NGzch2QUQiFdv5H%2FqmRvwrfw0rVbaSzJcn1%2F7orJCYuD93nBiqTx7y1gOlnlOQhXLlQh9%2BRMw6rOunZj1LS5wbmjkRqNCtTwA6t%2FkNZ6NjI37Hjm5bdY9raOea7lPAe5LEjokYcm%2FSz9AJw0eujVwt4jpmEF4QnlLMbHNsUkIQM4mcx71mmuXb8ZXM5ffZOMQWEbtwqFj2fPxhe6H7KE0f%2FUi1Ol1rbvZh8Ybdy%2BzxgaEhZqiAhnSdO%2B8QzKhWa7E%2FwgwenzaXEDxqcGcG0hgUBuQMVwx3Uu37DtZOHlsycMBoNWqyXVLvQ6LnYEweHYvXHpvDV7zhcYgh9rovwtCw9R87xI97OvTE9YsKqg%2FCDhT9zEI%2FaaAx72wk1ozs079j32%2FOvJfE30LcyyauQsCZsSwQF9aNz7u42AuVLgAwIQeWr4m%2FHzVrIjHdxq1PAE9PJ6nSWvE0HYOZsqxd3OtzxYnC555%2F5A3Dfv3A8owOKCQOiEHh2q8OJOZ9u4BymXYouv7ErfgyYrvt%2FWqf%2B4Tdv3lUuhyWRbmF0GTiDzt7jYQRmRLIVTknim02oZiHXsO7icwRTKFW43AI3e0VMYM2cvXmEasMjOdxJcsOzAunP%2F8ajlBXqWk7wi6Yl%2BYyEiPfeLeAM0lMoq7abMczBNxa1Ez1w6fur8%2Fd1eGvvufIFszBzol8f7vg6XWqr4M7JyPQFKmc8xFL%2FvmammdX7xcpO%2FDIkvLCyMiIgQ%2BQIwYAjrMHL%2BufHLhev2n88PrcwRvtKjLlrAMURH1Fxexy8yr12nBGhKQRFrGWWco8tOn%2BMLlHBCp2PE8Q7KCKfygj5VAUGKE7v4oVE6PseOtNk9r22hPQ5YXxg8IqjmJkeF3MXxDqh50Vp2TKR080Uc76CADHGn4x0ORznudAqJhV%2BV%2FLgdMzZKaMOfNA7Yrf38HWEQxg0Yd%2FDYaTS1ekRYy6axstKzFEKYFCrFn2FGA2gw17TUv%2BSnnFToL21s0dlQp79jInQWiVL3UKBpw3psh%2BviFeov%2FGNbcTFIQf40gWl8pcc7xPiCFI%2B5OXmYMoTsFnHoh16tA%2FlTqBotz4PDyw%2BdBDL84JJd3v%2Bt%2BLPew89VCzfCJ%2BH57sXSF%2FL4yWSMCnEkjm%2F74DNTr%2FPr6tWrLVu2BEQoDoPKwPrutXMXbjp5qTDUWbnjqqTgIXf6TWEsdDsr5wY%2BnjkWbmTE%2BWEOdK%2FYbqdMDDLNSYhnL10RviDBAiUpmRsKkY2U20WH9zCvfOmzZvB4iJW5iQxSECAK64waz5kgJnq7yWyjMz4oUxnu7IiQrISjtoTmM3GHXyeqUKoZRUJg15UONjvmRvOfuAMHsGVBEMjgpLRirSezkCiU24ZUsSOIKAwoCXZQw9QX1kKe2EXzHCYEWCoMns0sfjyKbfSyk3L8bR%2BBekptBi%2FWO33I1WtMqmg%2BHf9DT5l7pnDQ0XO%2BCaUFOy8JsP270sN7aBs7YMmJoFXi6B2aBIJ4HMKDZnCf4DqLzkKdQ8FLrRqvKBxWJ9rQ4Oe93BUczWYuc5yuZY%2FxN2%2FezMvLs1gs165dQz0gnvQ6dPyub2YtTE5JNekriXUp4oFM5rk6HBROCXR0mp26Yqu5i2tWNiRw%2FykZSwQ3xdFjO4vfuPhNR%2BlpSI3XEWNZ6YsPUJh2QEi%2Foqb0cLSLHV72HAcm0VeFOywQlhpA3MnXEdat9Gi24I4Z4sudnSl2sCiWnT0tFtaLnCVWeChLBYv64hiRy05n1TykqIU8oldCrxKgE7pKzw6X5xQzzR90M3hPqc12hzZE5yQri6w%2B0h0sTI5%2FbnZmD4X9Hs128nhL6fi6aJTpdVHSI%2FmUms%2BVUcnV7FyYQK8N6S0S4vEB3Glfr02LRl6RmS9WJ6MiiPCDe%2B4KIjPhGmfD%2B7tAf9%2B4ccNsNsOYwfehQ4foTaho8Y7VsxZsTkkzVw3rZfFUl5t6Cxn5vhiDLZT8XRHibQqO0hpKqzLQiyWkp7PsfC0GqrxeICGqSN%2FK4OITgPZ9ZGUeEu57kv6qyp2WF%2BLOT2kFe%2FFGEO48dMuMHEw8gTxujehhMUnJUkiEjKJCk4UMdP46Dc9eh3hhBsRJ%2BYx%2BX4lKjQ%2FeU2bwOGV0Xlagk4yWMiZgXezG%2BCqVRb4v3iArTojXLWMncrDy%2BL5wBVWLilWk4Od89V2Hh1q2kkR4YL008Jdvs2D5hl9OnMXk53PY7ruF5w13hbzEUpgHPBYUFJhMJsAd31lZWVDtaNPWxJmfJ59ONRnctxo944gvcctLKN4c%2FLU7YpyY5mBOYbnCMp%2FX%2FdBvEKZzIb70RRnxTcQDbePfMnfYxhW%2BVqky3MXbNSiTh1ZnRlaaWKbwHIwkI43jssSvMKltgdlV3FNmdrPeuSQpQN5caHzR8kCvVZKWR5PsAZqESeU5O%2B9w9nn5rTnTR%2FeMC3aSI37%2Byk%2B%2FXgcjmZ2B4uuz10t1%2FMA9r1idcnR367ghpODz8%2FNzcnLq1q0LrG9cNOWrXZl%2FBOu%2BGRGVLFylNJIqla%2Bw2K1xr2SV4GW8npJq5El1ypTzaWIa2Pi7NEiRC21%2By%2Bz%2BeJkqCS1QGTYN7OwtCRS9QalXp86e%2FeXa57s%2Ffm%2FTu4WbXlBoPnHm0tbdh7bvOZpzI4%2B%2F18BNDpXfN7z6icw0jzSP7%2FdIq7ih6enp2dnZOp0uJibmi3kfHblozrCEuP9b3nz%2Fn3VRaAvDCYeP7U%2Fx12zISt%2BmxAaenV9mxoz7dmzT%2Fud0maJ5FDimXnvOD5YG6eX8HS1kgMGUJb%2BZy8HPtPfzfvebRWpT1mld%2Fu%2FK0Gg4HA7z9aVffn40zZlp0d2B%2Br8fBDL2gjs1S9RjHw4C9lINlmxX7PjTYF1igPEly1VCsObmDYtW0Skcel0ZbebQ28B5Hps90BLnP%2B6uUbrviy7b2j1zQ1tgV92B2r9d2%2FH%2FzYG6NKjlSc2ncEcxe0Wc608Gd9Fr2nJib6SidxGWc%2B7d%2FKQye70hBXyCmHP%2FK8AASq%2FwJADz%2FI4AAAAASUVORK5CYII%3D"

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// ---------- Common rules ----------
// ----------------------------------
addGlobalStyle(
'body {' +
'  background: #253960 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAFCCAMAAAAHcEfNAAABDlBMVEUAHT8jOWEiOGEhOGEkOWAbNmEgOGEeN2EZNWAdN2EcNmEBHkEIJ08XNF8NLFYfOGEEIkcKKVIOLVcJKFABH0IYNGAaNWEkOWEQL1oCIEQRL1sUMl0EIkgMK1UVM14WM18KKVEGJEsPLlgSMFsHJUwMK1QSMFwVMl4DIUUTMV0CH0QCH0IPLlkLKlMfN2IaNmEHJk4BHUEDIUcFJEoDIUYGJUsOLFcFI0gWM14GJUwYNWATMVwHJk0FI0kiOWENLFUGJEoEI0geN2IPLVgRMFsJKVELKVMWNF8QL1kLK1QRL1oFI0oUMl4AHUAIJ04XNGAIJk4DIEUfN2ELKVIJJ1AQLlkUMV0LKlQdNmEDIES4lXSdAAAAr0lEQVR4XsXFVW4FQRRDQT9mZggzMzMz8/43Esu6avWM8h+XrIP/3gNWKOepmzmZlY75wQumZZ1WqWz6coItOqA7rNExRmSDdmhc9mmZnvGIvPOOmrnAsFTMGy6xQF+4wYQMyBGKziZVzRlGZZ4+cI22uUXXnGNMJmWPZuQTPXOPKRmUbRqSKxScJzTMLqU9TbNEiYCs5xsZT0pOra9YpJKTDIiFREMOEflDS+K65xfVph0QhFefsgAAAABJRU5ErkJggg==") top left repeat-x ! important;' +
'  color: #FFFFFF ! important;' +
'  font-family: Tahoma, Arial, Helvetica, sans-serif ! important;' +			   
'}' +

'#header {' +
'  background: transparent ! important;' +
'  padding:3px 4% 3px 20px;' +
'  margin-bottom: 10px;' +
'  border-bottom:1px solid #253960;' +
'}' +

'hr.space {' +
'  background: transparent ! important;' +
'  color: none ! important;' +
'}' +

'hr {' +
'  background: transparent ! important;' +
'  color: none ! important;' +
'}' +

'#footer p em {' +
'  display: none ! important;' +
'}' +

'h1,h2,h3,h4,h5,h6 {' +
'  color:#FFFFFF ! important;' +
'}' +

'h6 {' +
'  font-size:1em ! important;' +
'  font-weight:700 ! important;' +
'  color: #FFFFFF ! important;' +
'}' +

'#content {' +
'  margin:1em 0 ! important;' +
'  width:70% ! important;' +
'  background: transparent ! important;' +
'  padding:25px ! important;' +
'  border:0px solid #eee ! important;' +
'  border-width:0 0px 0px 0 ! important;' +
'  float:left ! important;' +
'  min-width:425px ! important;' +
'  min-height:165px ! important;' +
'}' +

'div.pagination {' +
'  margin-bottom: .5em ! important;' +
'}' +

'table tr td.inv {' +
'  background: #112F5A ! important;' +
'}' +

'table tr th {' +
'  background: #001D3F ! important;' +
'  color:white ! important;' +
'  font-size:0.8em ! important;' +
'  padding:3px 10px ! important;' +
'  border:1px solid #001D3F ! important;' +
'}' +

'table {' +
'  border-collapse: collapse ! important;' +
'}' +

'table tr td {' +
'  padding:7px ! important;' +
'  border:1px solid #001D3F ! important;' +
'}' +

'table.posts tr.spacer td {' +
'  font-size:0px ! important;' +
'}' +

'table.posts {' +
'  border-bottom:1px solid #112F5A ! important;' +
'}' +

'.post .author {' +
'  border-top: 1px solid #001D3F ! important;' +
'  padding: 5px 10px ! important;' +
'  background: transparent ! important;' +
'  font-weight: bold ! important;' +
'  color: #333 ! important;' +
'  font-size: 0.9em ! important;' +
'  min-height: 32px ! important;' +
'  width: 10em ! important;' +
'  min-width: 8em ! important;' +
'  vertical-align: top ! important;' +
'}' +

'tr.by-author td.author {' +
'  background: #112F5A ! important;' +
'}' +

'tr.by-author td.body {' +
'  background: transparent ! important;' +
'}' +

'pre {' +
'  padding:5px 10px ! important;' +
'  border: 0px solid #001D3F ! important;' +
'}' +

'pre.sh_javascript {' +
'  background:#FFFFFF ! important;' +
'  color: #000000 ! important;' +
'}' +

'pre, code {' +
'  font-size:0.8em ! important;' +
'  background:#112F5A ! important;' +
'  font-family: "Monaco", "Bitstream Vera Sans Mono", "Courier New", serif ! important;' +
'}' +

'em {' +
'  background: transparent ! important;' +
'  color: #FFFFFF ! important;' +
'}' +

'input {' +
'  background:#112F5A ! important;' +
'  border:1px solid #82BDFF ! important;' +
'  color: #FFFFFF ! important;' +
'}' +

'div.cont {' +
'  background: transparent ! important;' +
'  border: 0px solid #001D3F ! important;' +
'}' +

'.colborder {' +
'  padding-right:24px ! important;' +
'  margin-right:25px ! important;' +
'  border-right:1px solid #001D3F ! important;' +
'}' +

'.error,.notice,.success {' +
'  background: #112F5A ! important;' +
'  color: #FFFFFF ! important;' +
'  margin-bottom:1em ! important;' +
'  border:1px solid #82BDFF ! important;' +
'  padding:.8em ! important;' +
'}' +

'a:link {' +
'  color: #82BDFF ! important;' +
'}' +

'a:visited {' +
'  color: #72ADDF ! important;' +
'}' +

'a:active {' +
'  color: #92CDFF ! important;' +
'}' +

'font, div, td {' +
'  color: #FFFFFF ! important;' +
'}');
