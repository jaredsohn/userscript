// ==UserScript==
// @name           Something Awful Ignorator
// @namespace      http://steelpangolin.example.org/
// @description    Smarter ignore list for Something Awful. Automatically hides posts from 2007s, stupid newbies, and other goon trash. Hidden posts can be seen with a click, good 2007s may be whitelisted, and other posters may be blacklisted. SALR-compatible.
// @include        http://forums.somethingawful.com/showthread.php?*
// ==/UserScript==

var icons = {
	'Approve'   : "data:image/gif;base64,R0lGODdhPQAUAPcAAAeYNwaTOQeSRACORwWPSwmQThODSA2cPgmTTheYVBicUx6dVi%2BaXjg4OEREREtLSzBiVVBQUFxcXFw7WXI8UYRCQIlUQ5FXQXZwVpBYQQDEAADDAgC%2BEwDXAQDICADHFwLKFgbOExDiABTOECXIFRjaBSPeAAKmHwSyIwe1JASzKwyzMwSjNg%2BiQxGrMTXJG0HMGxGiRhWhSxefURqhUxp4dRx6eyt8iTBgnS9mmi9pnDJkoTRlpDVoqDVoqDZqrDZrrThtsV02Z1s2ZlY7ZGRTcGdnZ2hoaHNzc3R0dHh4eD5Vjk9kmjturUp4shaIaCilXkSvcVSzflR/tVaAtV6Dsl%2BGt2GIuly3hWm7kl%2BmmXKonH5%2BfoCAgImJiYuLi4yMjJKSkpaWlnXDlYPFoIXHpoumyY2nyI/Hq5bQsLpcEcFkBM5dANVkAs5kC89lEJZUNZlqFMJxOdN6MtN7NNeFOs6JTOCZKuCbLeOiPN%2BQPeGiPuOjQNeKTNKVVeWiVeWnRuaqTeaiUeatVJeYZpeXl5iYmJmZmaKioqOjo9WXXcmcZt2rXtmsZNqubd%2BwaeKzaeOiVuiqXeuqW%2BWuXOy4aPG9b/O%2Bceu8dOy9dO/AdfPGgPnHgPbLivDOmaSkpK6urq6urp2rvrCwsLGxsbW1tbi4uLq6ury8vL29vcXFxcbGxqbWvLTYxbLbx8fHx8jIyMjh1MnJyczMzNLS0sjf08vk19PT09zc3ODg4OHh4ejo6Ojo6Ovr6%2Bjs6uft6u3t7e7u7u/v7/Dw8PHx8fLy8vPz8/D08u/18vT09PX19fb29vf39/j4%2BPn5%2Bfr6%2Bvv7%2B/z8/P39/f7%2B/vcA/67//67//67///X///X//////////////////////////4gA/4gA/4gA//cA//cA/67//67//67///X///X//////////////////////////4gA/4gA/4gA/////////%2BT//%2BT//%2BT//6n//6n//%2Bv//%2Bv//%2Bv//%2Bv//%2Bv//%2BH//ywAAAAAPQAUAAAI/wDFCBxIsKDBgwgTKjworaHDhxAjSpxIseJDgdEyarTDxk0fjSBDihxJsuRIgdBSpqwjqNMlSXRUypxJs6bNmzQFPtv5TNGkTZgCadIzh6fRo0iTKl16VKCzp87acMrkaVAeSmygPkXmSqvXr2DDinUmsJnZZmssAYKEZ8%2BjN2fNRskSt67du3jzNhPIrC8zQn8q3eHTyI8cv8zGDCjjF9aovrkMSc4VWfIsyYZy9R1l6FMvZqhQ%2BS0URjKsvgKXqV5GIUMkRo4WXaiwmlWLGcdWR2iQa9mrBq%2B4RPgd/AFw4cskIHlVyEEuUA5U5zL%2B6lXvZQKVaR9ipgiGOGrgWP%2B4MkSZLRkr0mhXRitChELKfscH3mB%2B/VMO8PfSbuRLLwegKPOFEvWtp4xAySQzxBk/BLGFAAyI0sMOVxBBwwdQJJggF4ggEkEyqzSwigRfhDgigWIAKIYRGq6YDBdIJBNBKQ0YYQQtCQpkjDETXNEDEFrA8EICOuDQhAEgxBDLjsbs4oAXXjRgiioNiAGKMVRaSaUpDdCCiARMeoGEMbQ08CWVTO4oUDHFDGEFDz3YQIIJIxSQwxMopIAFm2yCgoQqqiDBBZV8EloMoV5IgEsDqhTjJChsRgCgoXwKRAwxQ1TBwxI1uFCCCCEQwIIHCvxy6aUSqHIplag0cCqVq7qI6iQipkRgRARinIpIA7tQaaMXlwo0zDBDUDEFE07cgIAKHXCwQQCtDCvttNRWa%2B212AokzLZDdOstBABocIIU25Zr7rnopqvuusIIFMy78MZLxgEL%2BBLvvfjmq%2B%2B%2B%2BAoEzL8ABwwMGrUIbPDBCCesMDAC9eLwwxBHLPHEFFdsMcQLZazxxhkHBAA7",
	'Delete'    : "data:image/gif;base64,R0lGODlhDgAOAPQAAKUAAKQCAqUCAqcEBM0AAKciIc4FBc4GBqwrKbUvL/8A/7c2NsgzM8o0NNc1Ndg3N9k9PdpBQeBlZeFnZ%2BqQkP///wAAAAAAAAgICBUWFwAAAAAAAAwMDBUWFwAAAAAAACH5BAEAAAoALAAAAAAOAA4AAAVVoFIEQGmWQqIgjOS%2BMLMIkkHc%2BG1IAiARBkguYpOUfo4K5UapOAhGH1PZXEKPuKYSF/1Nt7fulFINY5PW5lNsiOQgRQDNlsPtBIsWbC9TJHonJikKIQA7",
	'Expand'    : "data:image/gif;base64,R0lGODdhPQAUAPYAADg4OERERFBQUFxcXGdnZzVmpTZnpTZmpDdopjhopjhopTtqp2hoaHNzc35%2BfoCAgImJiYuLi4yMjJaWlpeXl5eXl5mZmaOjo6WlpUBuqURxq0Zyq0t2rkx3rk54rld/slyCs1%2BEtGeLuW%2BRvXqYwIOfw4umyZCqypmwzJ%2B0z5610a6urrCwsLGxsaC0z6K2z6a61LfH27q6ury8vL29vcLCwsXFxcbGxsfHx8jIyMnJydDQ0NDQ0NPT07nH2L3L3MrW5NXV09TU1NfX19bU19fX2dbY19zc3N7e3uDg4OHh4efn5%2Bnp6enp6evr6%2Bzs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4%2BPn5%2Bfr6%2Bvv7%2B/z8/P39/f7%2B/v///////f///%2BOjQOWnRuaiUeaqTeWiVeiqXeuqW%2BatVOWuXOy4aJeXl5mZmaKioqSkpK2trdqubd6rq%2Balpa6urq6urrGxseu8dOy9dPG9b%2B/AdfO%2BcfPGgCwAAAAAPQAUAAAH/4ATgoOEhYaHiImKh2CNjo%2BQkZKTlJWPgl%2BZmpucnZ6foKGbgl6lNaeop6WrrK2ur7CxrIJdXTViuLliQzW1vr/AwcLDxL6CXFy3YWIFzQW8zgXI09TV1tfY2IJbWzVguM0GY7xbBs3c6Onq6%2Bzt7YJaWreNBQYaIbweGQoF8f5JFALmuDAj3gUhAAMmiZeDRTyAT%2BJR0JKQgkN/grJkuSUmzAEwIEq8QEHiQxYDGlPiAIADB5IVAZDIGJBlJQ4HAjQKAICkJoAIGgH4xCGDAE2NgrBgUSYGzDIXPn6kUEqV6sqqBAgE6IHl6tUeAgRQ6LoTBxYAXdFiYRJghVJBV/%2Bu1FjWCNeJGEBgxN279waArD2uIPkZ1%2B%2BNARGuOLhwQcCVGwQmCGAC4HHluJHjCrJihSOYA2E6iDChYgQHKwU4q7YBQLUVGQEELLHCesIKK0sCQIAAQIYNAlYG8KbdmvOAC5wFVaniucCBBRt4aTBXYLl11tZz2xAAoQr25Ssa2LDRwMHvKjsAAPC%2B3nuAI8sFUaFSg4kTJ86G8KLibL5/1llB0MAEVLC2A2v%2BDWDDfKzNQMB8EwBQ4F8DDLCDf4JMMUV9TDARDTTOaCjiiCSWaOKJJwoihRQ1POGEfkMQYUQQNaxo44045qjjjjzaKEgUQKaSCpBEFmnkkUgmqWQnkYJA4eSTUEYp5ZRUVmkllII8oeWWXHbp5Zdghikml4uUaeaZZQYCADs%3D",
	'History'   : "data:image/gif;base64,R0lGODdhPQAUAPYAAC81NzI4Ojg4ODg%2BQDk%2BQDtAQkBGSEFHSERERFBQUEpQUkxRU01SVFZYVFxcXGJkYGRmYmVnY2dnZ2hoaGlrZ25wbHN1cXNzc3Nzc31/en%2BBfYCAgIGEhYmLhouLi4yMjJOVkZaWlpeXl5iYmJWXmJmZmZucmqGhoaKjoKCio6KioqSkpKWlpampqaqrqKyuqqysrK2tra6urq%2Bvr7CxrrCwsLCys7i4uLi5t7m5ubq7uby8vL29vcHBwcPEwsPEwsLExMXFxcbGxsXGxsfHx8jIyMnJycrKycjJysnJysrLys7Pzs/Qz8/Pz9LS0tLS0tPT09fX19nZ2dzc3ODg4OHh4eLi4uLi4uPj4uTk5OXl5efn5%2Bjo6Orq6uvr6%2Bzs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4%2BPn5%2Bfr6%2Bvv7%2B/v7%2Bvz8/P39/f7%2B/v///9N7NNeFOs6JTOCZKuCbLeOiPN%2BQPeGiPuOjQNeKTNKVVeWiVSwAAAAAPQAUAAAH/4AhgoOEhYaHiImKh3GNjo%2BQkZKTlJWPgnCZcC8omTkdnqCao6SlpqeomYJurB2ur7CvrLO0tba3uLiCbW0dcx0%2Bc79RjR3Ev7zJysvMzc7Ngmxsvh0gWlquWNgdWr/S3%2BDh4uPk44Jra75RUtdRUVla7lG/6PX29/j5%2BvmCamoZc7RkQcLBygIDNrZs6ZbBnz8qIx6OgOivyIgVLUZo1KimxsUvaiBqpLJiR0WTagSlSQMwjBYGAKiQKKLg2pI5GVauJCJgpwCeaXYg2DGjB5ENDogQcXCBiAgEVHgeTaACgRcvCKCsFIQGTUstVGICOZDi2hGcXbvyVPtTABoVCf%2B6pBUhAY1QuWgkeFgrFI2DDR48pBV05gyFgGBjBkgyRMuSYBQKFxYiQIIEBwIoF/aAIEThEBLOgJYMmnIIBDLOUEbAhXQIM2YOXwtLpQCBAY4hw4YdRABvAb13O3HgwQxoMyoc7PZwoXcOAU5gS3i9W1CZMg8CYsFCBUuV79HjvHlw/Xpv88AFlC/DvAzoMlOAl9mCIMZ5Dw6uT18viAwZCAFx8UUYZDimBA5m0GACBP7515uD6ZEBgwMSJNAEGaD5d0MCFYZAxoP0nUDGdA1iGMIYYwAozIoszuFCBRCgKOOMNNZo4402CiKGGBY84OOPQP6owY5EFmnkkUgmiaRBIGE0CUAHDUQp5ZQANGnllVhmqeWWWwoCxpcAhCnmmGJ%2BaeaZaKap5pprCvLFm3DGKeecdNZp551xLqLnnnzqGQgAOw%3D%3D",
	'Ignore'    : "data:image/gif;base64,R0lGODdhPQAUAPcAADg4OERERERERFBQUFFRUVw7WXI8UYRCQFxcXFxcXItrWLwnLrwrMsFkBLxiGcJxOZFXQbgxOq5MX5BYQZlaPLpkXc0AAM0CAssCAssEBM0EBM5dAMwvMtQ0NNU7O9hPT9VdXcxeBNVkAs5kC89lENN6MtN7NNeFOt%2BQPc6JTNeKTNKVVV02Z2FNfjlnoT5Vjk9kmjJjoTNkojRlpDVoqDVoqTZqrDZrrThtsUBxr0R0sEp4slR/tVaAtVyDtV6Dsl%2BGt2CHuWI8a2RTcGdnZ2hoaGlpaXNzc3Nzc39/f4GBgWuLtGaMvIqKio9wj5mIpY2NjZaWlpeXl6FYbZxbdaRketp%2Bf%2BONjeOOjpeYZsmcZtWXXd2rXtmsZOCZKuCbLeGiPuOiVt%2BwaeKzaeOiPOOjQOWnRuaiUeaqTeWiVeiqXeuqW%2BatVOWuXOy4aJeXl5mZmaKioqSkpK2trdqubd6rq%2Balpa6urq6urrGxseu8dOy9dPG9b%2B/AdfO%2BcfPGgPnHgPbLiuevr/DOmeu0tIumyY2nyKumu6C20bC2y7i4uMXFxcbGxrTB08fHx8jIyMnJyc/H0crKytDQ0NPT09TU1NbW1t3d3dbb497e3uDg4Oy2tui9veDg4Ojo6Ovr6%2B3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4%2BPn5%2Bfr6%2Bvv7%2B/z8/P39/f7%2B/ogA/%2BMA/%2BMA/7cA/7cA/7cA/5P//5P//9r//9r//9r//%2Bv//%2Bv///X//4gA/4gA/4gA//cA//cA/64A/64A/64A//X///X//////////////////////////4gA/4gA/4gA//cA//cA/67//67//67///X///X//////////////////////////4gA/4gA/4gA//cA//cA/67//67//67///X///X//////////////////////////4gA/4gA/4gA/////////%2BT//%2BT//%2BT//6n//6n//%2Bv//%2Bv//%2Bv//%2Bv//%2Bv//%2BH//ywAAAAAPQAUAAAI/wCjCBxIsKDBgwgTKjwIq6HDhxAjSpxIseJDga8yakyxYYQKjSBDihxJsuRIga5SpjxxJpAfNSZUypxJs6bNmzQFttrZasuaP3rQ9EFRgqfRo0iTKl16VCCrp6xEANoziA2ZNhugat3KtavXr1sFrhq7qgEfM2O%2BgBFDgqxbspBAwYVUaWzcsaDqrgIF6e6qvn4B%2BxWoqrCqLGnceCnTZcUDw5ANA3ikKs8AKFIQSFEFoEjhR54tQ4EyIA/nJEkCVDotRYqmwgJTyY5kYEIYLnS0QDggu7fvVAAcZQr%2BG0CAOKkcERnuSLYjAMxTEZECvLlvgahQRWJRaIiCEA4oVP9gIgTVpuzoswePgyC9%2BjgBPilnnx5BnOCfAjhCBSCOI0roCXTKKSwYYgMOibRwCAcWTMGEBBZ8MOCEpwDASBRETEhJJhWeQsQRjBCBIYUiAoBAAFEMCEASUdwxoUCmmFJAEDTcgAgmT2RggQUL7GgBITEGCcAicwwQpIimAGDKJQE0QUSRQZoywBxDHnFEjENGaYpApZTCAhAy0FBDIz44gYGPFmDR5ZqlDOkJil2K2GaXUQBAxJtxdAmfJ24e1%2BYibJYiECmksPCDDC/IsEQMLkTgoweERkrokKRMQsQAl85BCgCRIkBEpUQg4Okkmy5CiiIBTGIiEU8SKtAoo7Bx0AMPMOyQgw5VoGnBFbD26uuvwAYrrLACiWIsC8giS4WPDFywox3GRivttNRWa221AoWi7bbbgmCBFaEIokEH3JZr7rnopsutQKC06%2B67dbjLybv01mvvvfjSK9An/Pbr778AByzwwAT7u9DBCCd8cEAAOw%3D%3D",
	'Lists'     : "data:image/gif;base64,R0lGODdhPQAUAPYAADg4OERERFBQUFlZWVlZWVxcXGJiYmdnZ2hoaGlpZmpqamtra2xsbHNzc3d3d39/f4KCgoWFhYmJiYuLi4yMjJCQkJKSkpaWlpeXl5eXl5mZmZ2dnZ6enqSkpKWlpampqaurq62tra2trbCwsLGxsbW1tbq6ury8vMHBwcXFxcbGxsfHx8jIyMnJydDQ0NLSzNLS0tPT09TU1NbW1tzc3N/f3%2BHh4evr6%2Bzs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4%2BPn5%2Bfr6%2Bvv7%2B/z8/P39/f7%2B/v///83Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3NzSwAAAAAPQAUAAAH/4AXgoOEhYaHiImKh0mNjo%2BQkZKTlJWPgkiZEJucnZuZoKGio6SlpoJHRxBLrK2urBCpsrO0tba3t4JGRqs4N7%2B/ODg5PEsQu8jJysvMzc2CRUWrNynVKtcqK8UQ0d3e3%2BDh4uKCRETTvwjqMDk62%2Bbw8fLz9PX1gkND0ykqIwP/2bblG0iw4MAaGA4mHMICQ4cPGCJGZOgQx0BBQoRMQwADBwwECXC4M5axpMmTJVcASLnSRAATI1CseFBgxQqXMGuUFBQkyLR//hQoeDESQs%2BjSJMeVbkUQJAOAm4cxXCgJ1SpSAUBAdJLHQKhQmds20q2rFmyKgCgVQtkQoALW84vHCDrFi5ZQT9%2B9PL3758BBjSM5R1MuPDgFAAOJ87rooCEH3IJN36cV5APH73a6dghw0GEChuMXR5NuvRoxKcBkJbQwIfc0qxHC%2BrRY1WObCtYsChhgQMIY7SDCx8eHPGBAxIQ9wBR4IAAFz3k0mbuHDptQTx42G63Y0f2GiFMGMtOvrz58%2BjTpxfUfdWr9xC6y59Pv779%2B/cF6djvqT%2BE/QAGKOCABBZooCA5JKjgggw26OCDEEa4oCDCVGjhhRhmqOGGHF64yIcghvhhIAA7",
	'Message'   : "data:image/gif;base64,R0lGODdhPQAUAPYAADg4OERERFBQUFxcXGdnZ2hoaGtra3Nzc39/f39/f4mJiYmLhouLi4yMjJaVj5OSkpaWlpeXl5iYmJmZmaOjo6SkpKWlpaajnqmooquqqKysrLCvra6urq6urrCwsLGxsbOyr7e1tLq5tLi4uLm5uby8vL%2B%2BusLAu729vcXFxcbGxsrIwsfHx8jIyMrIxcnJyc/Oy8/Pz9DQ0NLS0tPT09rX0dzb2tzc3ODg4OHh4ePj4OLi4ufm4%2BXl5Ofn5%2Bjo6Ovr6%2Bzs7O3t7O3t7e7u7u/v7/Hw7vDw8PHx8fLy8vPz8/T09PX19fj28vb29vn38/f39/j4%2BPn5%2Bfv69/r6%2Bvz7%2BPz8%2Bfv7%2B/z8/P39/f7%2B/v///35%2BfoCAgImJiYuLi4yMjJKSkpaWlnXDlYPFoIXHpoumyY2nyI/Hq5bQsLpcEcFkBM5dANVkAs5kC89lEJZUNZlqFMJxOdN6MtN7NNeFOs6JTOCZKuCbLeOiPN%2BQPeGiPuOjQNeKTNKVVeWiVSwAAAAAPQAUAAAH/4AQgoOEhYaHiImKh1mNjo%2BQkZKTlJWPgliZmpucnZ6foKGbglelplcLqaqnrK2ur7CuglS0tQtbuLkLtby9vr/AwbWCUsXFtzUrJycrNVsLxtHS09TV1sWCUdpRyBgmMDAmGM4L2%2Bbn6Onq61GCUO8LPSIONkFMTEE2DiI9C%2B84EnC8KyEBCkAJElq0kFAhyMKG71p4eDcQoYeDCd8JcsLR3wYmuXIx2QBlAUcWABhwFADACUoWLDQEKMFBJk0cKwHgdDKAQAkWEV6y2CnoHpNbPDIAAZIjx9IMPJ7dQxmAyQwAAJigvEdBABAmXb/emyFAQAQmJQKI1ZrVKBNBS//i3qqi40GIuyEe6KjyLK6KAQE4MBgAYIkKAAQIzGAQAMISxo6XIKDQdQkEAnH9IlYcV5CSz3ONXKhCusoFI3wXfE5BAMEBARoAKEkh%2B7MSGQMU3M79I4ACBQBIUBjwWQYB2rY/C0rC/NYUEKVLg5jyjDlrGQAG0E6ynTlzBQe%2BH9BwIEWKAwhuANDAHUB374KQyL/lokqTKU3uN6ni4pl81khAYB4ASNCWmAE9mZVgDNr9B4APIwgwwIQGEqCAfIIcoeECR4Tk4RZHcKjhiCSWaOKJKJooSBEsFqHKizC2KOOMNNZo441FCELEjjz26OOPQAYp5JA9CjLEkUgmqeQekkw26eSTSQoSxJRUVmnllVhmqeWWVS7i5ZdgehkIADs%3D",
	'Profile'   : "data:image/gif;base64,R0lGODdhPQAUAPYAAFxjBl9nCDg4OGNpDm9jLHRnM2VsD2dtE214DnR%2BEXiFFIKOGoKPHURERFBQUFxcXGdnZ2hoaHJycnNzc3V1dYCAgImJiYmLhomLhIuLi4yMjI5QBJNWBZxPAZ5RAp9SA6BTBKJhHatqKa5vLrBvMLJxMuSoQeWmR42SWaGmcKSpdKiteOW7TOawSuW5S5aWlpeXl5eXl5mZmZmZmaGhoaKioqOjo6SkpK6urq6urrGxsbOzs7a2sri4uLm5uby8vMHBwcXFxcbGxsfHx8jIyMjIyM/Pz9LS0tPT09TU1NXV1djY2NjY2Nra2tzc3N7e3uDg4OXm3OHh4ejo6Ovr6%2B3t7e7u7vjo2%2B/v7%2B/v7vDw8PDw7/Hx8fLy8vPz8/T09PX19fb29vf39/j4%2BPn5%2Bfr6%2Bvv7%2B/z8/P39/f7%2B/v////////z8/P39/f7%2B/v///////5lqFMJxOdN6MtN7NNeFOs6JTOCZKuCbLeOiPN%2BQPeGiPuOjQNeKTNKVVeWiVSwAAAAAPQAUAAAH/4AvgoOEhYaHiImKh2iNjo%2BQkZKTlJWPgmeZmpucnZ6foKGbgmalF6eoqamlrK2ur7CxsIJlZRdquLm6uhi1vr/AwcLDwYJkZLdqVyQfJFdqadC4aRfH1tfY2drb2YJjY8kkJiwmImhKSzzpahff7u/w8fLz8YJiYskgLictHmZAMmzsQMLunhgoMBJCQajQoA4YN6gcTAhDB8KJ9xjCIGJQUJgwyUaYaGEiBBkxYcB46YLmwscwQwQMqeAg5kwHHx9MGAKjwRObQ5DEhCngI9AnLwWBAXNrRQEOHTYQSPHliFUjtpaCiblVpgAwPxqAbUBlKYQMXJdyTZtWKxhBX/%2B%2B3DrAYIGCBAgGeNHCF0vLuF%2BECBDyIIPgFw1wfHkBATBjwRAgHBEcWEBcyJIdv/Di5ZYKAwFCA0DB5cmS02YucPYSRMALHKwF%2BBBwxEuNB6stSGi9mjfv2KtXC%2BrS5RaXLVGSZ%2BGixUoVKlTOXCDepTV16xYedHEiIEiXKYmtE7cuXjz1LoK4cLmF5TxxvvBbqufSen598DS49HAAwcEL%2BgLYF2BrkVEgQGQWzCcIX7fI0soF8EUo4YQUVlihIFhkqMqGqGTo4YcghijiiCIKYsWJKKao4oostujiiykKUsWMNNZo44045qjjjjUKAt2PQAYp5JBEFmlkkIskqeQEkkkGAgA7",
};
	
main();

function clone(what) {
	var r = new Array(what.length);
	for (q in what) {
		r[q] = what[q];
	}
	return r;
}

function cloneX(what) {
	var r = new Array(what.snapshotLength);
	for (var q = 0; q < what.snapshotLength; q++) {
		r[q] = what.snapshotItem(q);
	}
	return r;
}

function xpath(context, query) {
	return cloneX(document.evaluate(query, context, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null));
}

function xpath1(context, query) {
	var result = xpath(context, query);
	if (result.length == 0) {
		return null;
	} else {
		return result[0];
	}
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function getAuthor(post) {
	return xpath1(post, ".//dt[@class='author']/text()").nodeValue;
}

function getList(listName) {
	var list = GM_getValue('sax' + listName)
	if (list == null) {
		return new Array();
	}
	else {
		return list.split('\n');
	}
}

function listAuthor(listName, author) {
	var list = getList(listName);
	list.push(author);
	GM_setValue('sax' + listName, list.join('\n'));
}

function delistAuthor(listName, author) {
	var list = getList(listName);
	var newList = new Array();
	for (i in list) {
		if (list[i] != author) {
			newList.push(list[i]);
		}
	}
	GM_setValue('sax' + listName, newList.join('\n'));
}

function foldPost(post) {
	xpath1(post, ".//tr[1]").style.display = 'none';
	var postdate = xpath1(post, ".//td[@class='postdate']");
	postdate.style.display = 'none';
	var userlabel = document.createElement('td');
	userlabel.setAttribute('class', 'userinfo');
	userlabel.innerHTML
		= "<dl class='userinfo'>"
		+ "<dt class='author'>" + getAuthor(post) + "</dt>"
		+ "</dl>";
	postdate.parentNode.insertBefore(userlabel, postdate);
}

function unfoldPost(post) {
	xpath1(post, ".//tr[1]").style.display = 'table-row';
	xpath1(post, ".//td[@class='postdate']").style.display = 'table-cell';
	detachNode(xpath1(post, ".//tr[2]/td[@class='userinfo']"));
}

function click(thing) {
	// buttons have click() but links don't?
	var e = document.createEvent('MouseEvents');
	e.initEvent('click', true, true);
	thing.dispatchEvent(e);
}

function makeIconButton(author, name) {
	button = document.createElement("a");
	button.innerHTML = "<img alt='" + name + "'"
		+ " src='" + icons[name] + "'"
		+ " style='border: 0; padding: 0px 3px 0px 0px'/>";
	button.setAttribute('class', 'sax' + name + 'Button');
	button.title = author;
	button.href = '#';
	return button;
}

function disableListers(author) {
	var whitelisters = xpath(document, "//a[@class='saxApproveButton']");
		for (r in whitelisters) {
		if (whitelisters[r].title == author) {
			detachNode(whitelisters[r]);
		}
	}
	
	var blacklisters = xpath(document, "//a[@class='saxIgnoreButton']");
	for (r in blacklisters) {
		if (blacklisters[r].title == author) {
			detachNode(blacklisters[r]);
		}
	}
}

function addListItemHead(list, node) {
	var li = document.createElement('li');
	li.appendChild(node);
	list.insertBefore(li, list.getElementsByTagName('li')[0]);
}

function addListItemTail(list, node) {
	var li = document.createElement('li');
	li.appendChild(node);
	list.appendChild(li);
}

function addFilteredControls(post) {
	var author = getAuthor(post);
	var profilelinks = xpath1(post, ".//ul[@class='profilelinks']");
	var postbuttons = xpath1(post, ".//ul[@class='postbuttons']");
	
	foldPost(post);

	var whitelister = makeIconButton(author, 'Approve');
	var revealer = makeIconButton(author, 'Expand');
	
	addListItemTail(profilelinks, whitelister);
	whitelister.addEventListener('click', function(event) {
		event.preventDefault(true);
		listAuthor('Whitelist', author);
		disableListers(author);
		
		// activate all revealers
		var revealers = xpath(document, "//a[@class='saxExpandButton']");
		for (r in revealers) {
			if (revealers[r].title == author) {
				click(revealers[r]);
			}
		}
	}, true);
	
	addListItemHead(postbuttons, revealer);
	revealer.addEventListener('click', function(event) {
		event.preventDefault(true);
		unfoldPost(post);
		detachNode(revealer);
	}, true);
}

function addUnfilteredControls(post) {
	var author = getAuthor(post);
	var profilelinks = xpath1(post, ".//ul[@class='profilelinks']");

	var blacklister = makeIconButton(author, 'Ignore');
	
	addListItemTail(profilelinks, blacklister);
	blacklister.addEventListener('click', function(event) {
		event.preventDefault(true);
		listAuthor('Blacklist', author);
		disableListers(author);
	}, true);
}

function addBlacklistedControls(post) {
	var author = getAuthor(post);
	var profilelinks = xpath1(post, ".//ul[@class='profilelinks']");
	var postbuttons = xpath1(post, ".//ul[@class='postbuttons']");
	
	foldPost(post);
	
	var revealer = makeIconButton(author, 'Expand');
	
	addListItemHead(postbuttons, revealer);
	revealer.addEventListener('click', function(event) {
		event.preventDefault(true);
		unfoldPost(post);
		detachNode(revealer);
	}, true);
}

function addWhitelistedControls(post) {
	// don't need to do anything yet
}

function patchProfileControls(post) {
	var profilelinks = xpath1(post, ".//ul[@class='profilelinks']");
	profilelinks.style.padding = "3px 3px 0";
	xpath1(profilelinks, ".//a[text()='Profile']").innerHTML
		= "<img alt='Profile' style='border: 0'"
		+ " src='" + icons['Profile'] + "'/>";
	xpath1(profilelinks, ".//a[text()='Message']").innerHTML
		= "<img alt='Message' style='border: 0'"
		+ " src='" + icons['Message'] + "'/>";
	xpath1(profilelinks, ".//a[text()='Post History']").innerHTML
		= "<img alt='History' style='border: 0'"
		+ " src='" + icons['History'] + "'/>";
}

function populateListBox(listBox) {
	listBox.appendChild(makeListTable('Whitelist'));
	listBox.appendChild(makeListTable('Blacklist'));
}

function makeListTable(listName) {
	var list = getList(listName);
	var listTable = document.createElement('table');
	listTable.setAttribute('class', 'sax' + listName + 'Table');
	listTable.innerHTML = "<caption style=''>" + listName + "</caption>";
	listTable.style.width = "100%";
	for (i in list) {
		listTable.appendChild(makeListTableRow(listName, list[i], i));
	}
	return listTable;
}

function makeListTableRow(listName, author, i) {
	var row = document.createElement('tr');
	var cell = document.createElement('td');
	if (i % 2 == 0) {
		cell.setAttribute('class', "altcolor1");
	} else {
		cell.setAttribute('class', "altcolor2");
	}
	row.appendChild(cell);
	
	var deleteButton = makeIconButton(author, 'Delete');
	deleteButton.addEventListener('click', function(event) {
		event.preventDefault(true);
		delistAuthor(listName, author);
		detachNode(row);
	}, true);
	cell.appendChild(deleteButton);
	
	var authorLink = document.createElement('a');
	authorLink.setAttribute('class', "author");
	authorLink.href
		= "http://forums.somethingawful.com/member.php?&action=getinfo&username="
		+ escape(author);
	authorLink.appendChild(document.createTextNode(author));
	cell.appendChild(authorLink);
	
	return row;
}

function autoWhitelist(post) {
	if (xpath1(post, ".//img[@src='http://fi.somethingawful.com/star_admin.gif']")) {
		// mod
		return true;
	} else if (xpath1(post, ".//img[@src='http://fi.somethingawful.com/star_moderator.gif']")) {
		// admin
		return true;
	} else {
		return false;
	}
}

function postFilter(post) {
	if (xpath1(post, ".//dd[@class='registered' and contains(., '2007')]")) {
		// 2007 regdate
		return true;
	} else if (xpath1(post, ".//img[@src='http://forumimages.somethingawful.com/images/newbie.gif']")) {
		// stupid newbie
		return true;	
	} else {
		return false;
	}
}

function main() {
	// detect SALR
	var salrStyles = xpath1(document,
		"//link[starts-with(@href, 'chrome://salastread/')]");
	
	var postsQuery;
	if (salrStyles) {
		postsQuery = "//table[starts-with(@class, 'post ')]";
	} else {
		postsQuery = "//table[@class='post']";
	}
	var posts = xpath(document, postsQuery);
	var whitelist = getList('Whitelist');
	var blacklist = getList('Blacklist');
	for (i in posts) {
		var post = posts[i];
		
		// patch common controls for all posts
		patchProfileControls(post);
		
		// classify post and add controls for that type
		var done = false;
		var author = getAuthor(post);
		for (w in whitelist) {
			if (author == whitelist[w]) {
				addWhitelistedControls(post);
				done = true;
				break;
			}
		}
		if (done) { continue; }
		for (w in blacklist) {
			if (author == blacklist[w]) {
				addBlacklistedControls(post);
				done = true;
				break;
			}
		}
		if (done) { continue; }
		if (autoWhitelist(post)) {
			addWhitelistedControls(post);
		} else if (postFilter(post)) {
			addFilteredControls(post);	
		} else {
			addUnfilteredControls(post);
		}
	}
	
	// add expand-all button
	var topButtons = xpath1(document,
		"//div[@class='threadbar top']//ul[@class='postbuttons']");
	var expandAll = makeIconButton('', 'Expand');
	addListItemHead(topButtons, expandAll);
	expandAll.childNodes[0].alt = "Expand All";
	expandAll.addEventListener('click', function(event) {
		event.preventDefault(true);
		detachNode(expandAll);
		var revealers = xpath(document, "//a[@class='saxExpandButton']");
		for (r in revealers) {
			click(revealers[r]);
		}
	}, true);
	
	// add list management control
	var bottomButtons = xpath1(document,
		"//div[@class='threadbar bottom']//ul[@class='postbuttons']");
	var toggleListBox = makeIconButton('', 'Lists');
	addListItemHead(bottomButtons, toggleListBox);
	toggleListBox.childNodes[0].alt = "Expand All";
	var listBox = document.createElement('div');
	listBox.setAttribute('class', 'saxListBox forumbar');
	listBox.style.display = 'none';
	listBox.style.marginLeft = 'auto';
	listBox.style.marginRight = 'auto';
	listBox.style.width = '20%';
	listBox.style.background = "#006699";
	var bottomBar = xpath1(document,
		"//div[@class='threadbar bottom']");
	bottomBar.parentNode.insertBefore(listBox, bottomBar.nextSibling);
	toggleListBox.addEventListener('click', function(event) {
		event.preventDefault(true);
		// toggle list management control visibility
		if (listBox.style.display == 'none') {
			GM_log('deploying');
			listBox.style.display = 'block';
			if (listBox.childNodes.length == 0) {
				GM_log('populating');
				populateListBox(listBox);
			}
		} else {
			listBox.style.display = 'none';
		}
	}, true);
	
	// now that posts are folded, go to the fragment if present
	var urlChunks = document.URL.split('#');
	if (urlChunks.length == 2) {
		document.getElementById(urlChunks[1]).scrollIntoView(true);
	}
}