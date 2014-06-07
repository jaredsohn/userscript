// ==UserScript==
// @name            Deviantart Activity Filter
// @namespace       dev_hide_mes
// @match			*://*.deviantart.com/messages/*
// @grant        	GM_registerMenuCommand
// @grant        	GM_getValue
// @grant        	GM_setValue
// @grant        	GM_xmlhttpRequest
// @updateURL		http://userscripts.org/scripts/source/104103.meta.js
// @downloadURL		http://userscripts.org/scripts/source/104103.user.js
// @version       	1.3
// ==/UserScript==

if(navigator.appName=="Opera"){window.onload=laden;}else{laden();} //Opera...
function laden(){

var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
var deakt=false;
if(GM_getValue('dev_hide_mes_akt')){deakt=GM_getValue('dev_hide_mes_akt');}
function keyHandler(e){
	if (e.which ==78 &&e.altKey){verschw();return false;}else{return true;}
}
function verschw(){
	deakt=!deakt;
	GM_setValue('dev_hide_mes_akt',deakt);
	if(deakt==true){location.reload();}else{pruf();req(0);}
}
GM_registerMenuCommand("Disable/Enable Deviantart Activity Filter", verschw,"N","","D");
window.addEventListener('keydown', keyHandler, false);

var devakt=["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjFBQjg0MUQwQUQzMTFFMDlGNEJBQTYxODAyODQ0Q0MiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjFBQjg0MUUwQUQzMTFFMDlGNEJBQTYxODAyODQ0Q0MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MUFCODQxQjBBRDMxMUUwOUY0QkFBNjE4MDI4NDRDQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MUFCODQxQzBBRDMxMUUwOUY0QkFBNjE4MDI4NDRDQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI%2FPsMpo20AAARhSURBVHjapFVbTxtHFD4zu%2Btdr23WNhhjG2QMIdTQUolIuajqA2qrJFKlKFJaNVUfKvUhvyB9qPLYp%2F6HPkSqqqip1ItUKRFPSIFWpEASCKSUSx0qIOAbNl6vd3dmOmNvm5JWgJSRj3Z9Lt85882cs3Lv6VHo2H4GR62edPsn2Wz8xtLSs883coUvj%2FLPd8UBwzGWEWuLBwLy1XRqLy2eRiwUP04cPkYFyAj6PuxN%2BzMfXGasN61nxH%2Bhf2nwyG6%2BIxiQL118S82EAhRdfFvJBAPKJaF%2FafBYxH8llVASo9kCACEwOlSEVFJJtoe1K0fFyocZz715Ypi57rXzY2pKlU0ACqAqAOfHtGR1v%2BMahfjE9NTa4lHgUS4DGKP2SFQ%2FaRj%2BXstykoi4g5lud%2FDMsOUDyriLEApnR%2Fb02Qe%2BV9Y30NfJlLEcDKprhUJtu1Q0lyllfIvwO5ci4lcRX%2BjW7qiq1JlORx3Or6875dcMQ4ZktNzTZeQ0VbG9Gjg4YoD4UVqOD21X0vXNQmSjXLbhz03L2q%2B5du6PktJouDt3N%2BwLonJFxvVgts%2Bf%2Bfh9FlIViwEtAGMMAS1xMwd2vdPhwEA5NxxdlWqQjq76e2LhkwwjrtJ4Qhlu3rIri781OIeSIsDR7IZ9vVqtfOEj26evvqtIqs8rVGLeCy9V0IIEMAaGCc8hbHVgDhfMoO5QuPU9dX%2F5VV5YKfk%2F5cFICqcSrApyuVKDJ2bZHtqvkK5sL8Yypq0qqWBDVEyafDMOyhht7YyrGWFg2Rz4B%2BZO3MczC3n9Rh5pD7mz1QTnL66F5ULVREtm2RkqFEl4ZAD5moWzJkIzUTMHbWYToEjsxnIJ3PwW9icf4IePC4HPypI2wx32uRABLmYLM4NBhyfI75bYAqmzQdtyIiP9TG3SwUS1rEkN8xJxJRL623egOjWvTE9vBq7XfNojAczxKMd73kRCIQx1XZ99tE5%2FatgqA9KiRVAhGojwpyiYcFpcToeQuqOSuWV2t6Gpi38DH7jnYoJ5SxjMuKFGTySZRjk4ETdE%2FLB4tDinghZMmgGpGPJHdMXYA6iJ%2BH9h%2FbdDz2ZjyF5pjLQpFSBOq3H%2BaR%2BJAsWt%2B97cDV9hv8UCWmj4WO1fXdmKGz4IhHRen6CF38KnuwBTC4jOr8ulV%2FtI5MxrFCc6WrtvC1EucmTYcroeO8rmoeCY0b6QjsOpCEXlKoV785I1Pidt7VSl1TrSZla3rVOTC27%2F2KiTeGOE%2BBMRigN%2BCFct1s%2FDDwVHioQGOg2I%2FvgzakzMK1tFU17bsvTbOdDHub0BEFTTJfOdvUnzvYk5t%2B%2Fc6yTaEUbt%2BT0Y4PZ7HoP%2FD44kVDZrJpt6Iq%2FvkuBX9y3tO64Xc0AcmDhFKcf0b3J1ffyUz7o8vVj9SJJqEZCC5VYrPwcXg%2BsAOJcQl04B4oFWWgMG6AvfATEk2sT3xEu6I47ssMpbAwNgy3u3vUD2gh9tUQRFrxuR53vA7y8BBgAmTyJY%2F3idRQAAAABJRU5ErkJggg%3D%3D",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sGAw4aBJQGD8oAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAABDFJREFUOMudlFtsVFUUhr9zm3N65tK5wHTaoSJUh5Zya4qCWkgFDQStQeMlwRjUBHyCGOMtMb4Y9MGYGH3RwKNBeJEYSQzwIsTwVBRFgcIUOqVXSjtM59Y5M%2Bec7YNTUsyUEleyk72zs%2F78a%2F3rXxILRGdMP%2BfT5c6goexLpp1TPtW9EqxT8pF6I3HkfHqspy0gHb%2BcFdxvrIsZ0Y1LjNSlb1vFwHet4v0nQhPPtfquDR5ZLS590yJ2tPqKqyOe7fPlK%2FN9xIOqoyENTw06mzofV31dO9u83TtWhBrrp%2Fn6q1sMZ52PMzPixOSMXeD%2FxKqI1rdnvU%2BkTm4Q%2BQvPik%2B31YvOmC4SISMK0NMWkGrlqQsBm7oi66aH8ydSaJ5hSosa0LUhVE0KcJuJ%2BforLwRsVQS7d4WILQ9zU2%2Fio8%2BfQZahmLPumbcgsK7JHPoyhTcc4M39W8j3%2F4oQICmee%2BYt2ApXuLQnFpP8KcnN00nW9rQBICncH%2BNdj0RqiiBJsts%2FnCHoFbRvXIIQEDRkgl71%2Fhh%2F3zslHosbnwjEy0AOEACOYGnZdhASeAwNFwWrLMjnyrdnp6KWgHeAV%2Fo5sPe15ftaOxsDTllCUjUMTeXt985geHX84QDFTBGkAgf2mBw4XDy6omJ8cPxy9veajDua%2FV6vxv7dz8c%2F3Lo5pERDHuE4iuS6Lj%2F3Zli%2FzEv3QzrhiImVt1D1Ch2bYuhHbzxleqwEUBu4JeyEVJfPurY8iDE%2BLK6f7JdmTBOnUuHgsSy7uxtYHNEpOQ51pgvICDdKe2AISq57fnIeS7%2FTrXjahbv19NlsVCQdJW%2F5uJDVuV7w0v1wiLSt0Tcho9dVaGp2kBSdXNaBwclhv1Y%2BfGpQpGqKPnt5ssW8snFZMLG9MYDHEfRpHtZZNhd1lZsVmdVLi3Q8qiOkMK%2B%2F28v1tIj3pUujB1%2FwSnuPFcS84%2FbKElvtqbMRCEY8MmvtMr%2F5VFpth7jtEIyBPyJQFZsXHxC8scE1AWqB3jUVb71UXtP5hfuDISa2tXk1mhoiXLwxQmDljDjU75NiAzY7f7HEkUuGlCyZWIqhw6gKuFWCEuBU38w1hRyLhH6MN3p7YlGToYEciTURxq6OMzhlH1VxI%2FGI%2FrS%2FsZ6%2Byxkmc6VX8%2Fn8ADBTXb8qMAVMAIW59lFlRNS%2FyEOkpU70JW9L7V3N%2FPV3mslMIaUqWinYYNK1uYnklQxuubIM8P2nA2VgDPhzruOlOo%2Bm1xlq%2B%2FQtK1jM2Thli6mxIlbFPqcphLyGsqo4bZOenKFQKp%2Bp2E6hWvXsUQEvULwD3JF4QFwbvXXBKjBdyNstwnVHbqSy40KITMVxziqKbDkVNzw6khuSJCYKVrnXtp3y3H0FlIBxoP%2BuxbMu0Sz9cXVIqZZoVllos4JUxbEBHdAkMMW%2FwjnVNuSre6b4D8z2vtECqxtCAAAAAElFTkSuQmCC",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sGAw8UF4%2F5Ca0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAA%2FRJREFUOMutlF1sFFUUx393ZnZmp1223Xa3Ai1QoJVCm4B9wMSalmAiGAx%2BJL70UYkxGIMxERKVF30g4YUXDIbENxMCUZMaTDQiBEhEQVswYEuVdvvB0u9uuzu787VzfeiCFrdFE08ymTM3k9%2F533P%2F90CJUJvUmL5WT2l1mgytC33B%2FxJlbFVqlYlkKilzuZw89uVxSYwf2YjxXzDKP1YEYQISETOCaZqy0oiBQx13cFqqeX9zNZdbErx3%2F%2Fc9uw1RctcPsnYEQ4CgQmryzfaOdqRbEFf7e%2Fh98FenybQyb72692BHx7Yta1aWt2Sn7o7Xxem%2FcK3glwI%2FXE03GoyXTc041db2JKZqUtvYIBvqYuLTdw9zrnuU6kRt8Edvj%2FLSM61oKonro0yVAmuLvqIcKDfKj17sOsfQ9ABnv%2F6W0Tv3hDU9RSAhk56horpWcWwLVZBRtRKtLNljiaYIgaGHAYU1G%2BuJxRNkbXB8uHZ8P3dPHyRy4wSnDmwqN9XQtS2r2flosEbBztt8d%2FkbMnmLVavryEwOM%2F7TeY68voenG3Xyt86TGRqkz48p6Zxc6%2Fms%2FTeuCKmqStO6ZpysTzgcwSzM46VSvPja26xqe4rEuhrCVRXkLReJJAD%2F0eA86YqaStq276DvVj8Xr1xhMm0RDmnY1ixeziWyKkK0PorjS6QsaYASh2fz8fT8TF9FY%2FScYzvgQ5mEjliI22dO0NBah2aE6U%2FOcC%2FtIxeoyvKK2xcqW8PZSSfrsKvzWbbv3EG8cgWJWITmd87gVLcxMpHl0g8DdJ297QlVHArK6Fpe8SVkccUQmqDzuVfAUjmZS3Op%2Fzdu9v3Chc9O447c5OekxZjteuN5Tjp50ntfMMRXXY5cuhV%2Fi3lvjmo9zpgWIjnt0rlnN5tqNDxUJiyfeEQUGps14%2FvLHg9DS88K%2BVcSSNDEwtnoOnxyeBenju1jf%2FsGHF%2BKTMZTAb34sLxiiSalxJmxmfamZOuGrSKaE8x2X2Uua2EpObqHsszn0VKDbAYcwAamgWGgUBqs00vAoQ8%2FOHok8AIlCCSKkFRJCUKiKgVUAvwAOTtHM2ACbnH354FewFYXQdsQ9GJj0eN4bqPreZOe5%2FW6rj9Zo7Nm3%2FPrQV8hUwPjIjdngxaMZz05VQjwgRzwePE9tRg88iCL4aHichWXlFlgQFHZ2voY5XNzGSFtD7NMUbuHrW2OL1NegRmgrKh%2BBEiKZYZTPfAEUAuUA8H6uPJGIZD1QQCAP2vzkWXLcaCq2NY88DmQXMpuATAIzADRopLERDbwZEDj%2FQGQcxkqOsIqXu3rwNiS93yJMIoFokAIiAMrBehywQk3gNGiS%2FgT7UCwv1UMRR4AAAAASUVORK5CYII%3D"];
var devdeakt=["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAYAAAArdgcFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAOASURBVEhLpZVJSJtBFMeT2NLS0gqFttD2ZIOixQ3FqDWuuFVxibig4pIiNiJSMQH14K5xN64Igoh46qE99SIKuSiCh8ajhSBpjz3YVDEW9Zv%2B%2Fx%2BJBNuagMKfycz33m%2FevHnzDFD4%2BZecnPw2NTX1Y2Bg4LHD4fjip5tvM41G8zQ7O3ujsbFR4si5by%2F%2FLJSIuLWystI%2BMzNzUVVVZU9JSWmFq9I%2F92us1Gr145ycHGt%2Ff7%2B0uLgo9fX1SZxz%2FcbwuLg4Q0VFxT6ilhYWFiSOmH%2BNjY013AheWlr6SqfT2Xp6eo7n5%2BdlONXd3X3M9eLi4jCfG4SFhT0KDg7WhIaGvkGk79PT0y1JSUkfSkpK9urr60%2Fn5uYkwin%2BpriO7zbaZWZmDtOP%2FuSQ59lUVVRUtF5WVmZraWnZNZlMe8PDw0zDPqI8mZ2dvQTyt5cENjuh3dDQ0L7RaNxrbm7exWlthYWF64CrFLiYOwUFBdsGg8G5uroqra2tXSwvL1NypMyxt6anp%2BU5RoETiKWlJVkrKysCPqKhocGZn5%2B%2FTa4iMjLybnR09GuU21Ztbe3Z5OTkJYwgL5hksVjkOcepqSlBwV5MTEwInFagTM%2Fw2LbII1eB%2FARAgREREen4sFNTU3MGYxngLYAIlMXvBF4FI%2F875JBHrpz3qxsggqPx8fFLGE%2FjEdfdEhiF2WwW5eXlR%2F8Ee5WSKjw8%2FCE2wgNMsSJFPz1ARuqBjo6OSm4JjAIn%2FYWUbqBSNPSXL%2FI%2Ff6qoqKgHISEhprq6ukNCuQHBY2NjMnRkZERCtBJzTFVXVx%2FSnn7XgS9ThJo1t7W1uTxADxQwGTw4OEgJqqmp6RQXOOATTDpScgsX%2Bxn17mKUFKEU6lkGDwwMUILC23DFx8d%2F8guu1Wqf44VaOzs7XYySam9vl3D8c7TbH7jsc2ws9fb2CgqPx5WWlmZFUM98tgLcujY3N9cG6GlXV5ek1%2BtPcGF2RLeOPm6G1gGyY7OTjo4OgT7zG12SbUDrC66Eox5P%2BBt6hxMnOEhMTNyMiYl5h0t7iWp4wZHzhISETWx6gJM40cS%2BI5V6Xz1eBQddXl6eIysry4aNjISxEfE58z44cs51AI0ZGRk22DrwTecr70rWKqQGIATjE%2FkZ%2F127Kq7zu9tO7a7x6%2F874ci3g4KC7qN13mOk1xyVKbxFO9rT72rO%2FwAJ2DoMsxrvMwAAAABJRU5ErkJggg%3D%3D",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAAAXNSR0IArs4c6QAAAAJiS0dEAP%2BHj8y%2FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wYDDhoQjtzbtwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACOElEQVQoz3WS30tTcRjGP99zth3dxnDTbfirlOEUQSUoC%2FtBoGl0UXch4W03UV0FeRNBSP9B3dVNil7UfRF0lyZFNMNINFKbzZbidM5tx7PzduHCuez5Xn15Hh6e531fKEPDh4h03KyLHpG29Mla6FIcjoZQ0%2BJTmZDeZOe35%2FJEOnbCF0t5vfQTKKh4%2FGy395Kn31%2FFY1L3si8zGf6P8NfT8kpm5LI0SDh0MIajXGxolbzBRRUuXD6SMdnntHKxxSBNaIyg2C7j%2FhE7eISfG3xHDhY6LIYQ5TXT9Je3%2F%2BvcU1JC2ct4OYHgxnOY86Q0PeAqaUSQoxaKCsAkswFdar%2BiAyAwcu3WMZ%2BJjsEwHvxsUuA6zyZyd2MfS5ybPc7bV4bP6QEpKGGKCK1Uk0Gnh%2FE%2BV5RScY3ffnieDZlSLnYZp48gFpUAVGPaidJ1D7hcvVOhuJ5njS3aMUlgUIdOmkTcNTa%2FWFIeoHWuJRpB2MWJRZ5GjqNxh%2FX6Xz%2BH1KgcGF2LI4hgU4FgoBHEj06UM24YlbLRDXbef8GAnzBLdMpnNcs7%2BaTSaAYObDQUBeyieChbY9biY452Ympt4nf11oUg62x14SOLjoN1kmQcRf%2BQn0ZZUN3Mklp05IKcYp7dZrzFBCYJYnuHZFtjqeUvSpikgFHhrMwzDSgdVXwG9dTrAG0Sn8lubkdkZWlVUtZbPW8FVn5oydx7y9wzI8cqC8UTalVzOl7cKJzYQAELAyduNAqYbJNm5w9Oasy17W5UmAAAAABJRU5ErkJggg%3D%3D",
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAAAXNSR0IArs4c6QAAAAJiS0dEAP%2BHj8y%2FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wYDDxQnqSA5AQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAACQ0lEQVQoz4WTz0tUURTHP%2Fe%2BN298Tin%2BmFHThorshwomtGgRIUG4iCJa9AcEUeCiXUbhqiBoXZtqGbWpRaS0iSD6QVhgUThhNY4mg%2BOoOaO%2B92bej9titBl%2FQN%2FNPRw%2B9%2FA959wL%2FxSva0pHVdNT%2Fq9wd8PstLLUIxX5sCO8NSPXAlGlotWYqhqvLV2IXY%2B9ab4G0CfKsAbQJWahVvb34ooxfhW2L124cqyjpWs%2BExsf8crw2j2j9Wzo8VE09qq4GOQT0SAhT6BHJ%2BfKsF46zMvm7WEyvCAl%2FqDI0SAdxJIut%2FKsCwxgN%2FU4uDxgiJ9cjciPrcc3wZpv8xqLFuYZpZ8OxkljSTvuxTdXDmnswcYkIMN5DhOnFgsF3ia4sNjIEcZ4yyIGyzjEaMNDlUdQbtC9m%2Fsef2kTIGjhOT0YpFhAVWxiNewSMJNd4Ry91FHPRWqY4T1DrjZQ9WxD5W8KZFjjNA73%2BcEYD0mTZMW17tmLJ8WwWmejJAcDn1lO0YQgzzb%2FQPgda2iFo1ImQCIxuMkd%2BnDFsoaBsaFBQFfkCNR%2B4fOVPJDE1lMHKeAwzxR%2BBRxKBAODtzwZIFAIJKBUrhOTIpJXJHC0Etopphxn1G0vZr2ElzV3niGkJkQeLVOcCzws9mExtwpnAep8zRvx0iRld1skL4qYWvKQm%2FYXqMbkNymx7lHtoodWIgTRS8EuhfLsG06GenRsnpCqHF3ABAvUYBJdcoN2wC5OYrCC4DMz6zZf%2BSExqSFEI80Y%2BHxhmgL8BSus3CP%2BH3LSAAAAAElFTkSuQmCC"];
var devnams=["devfavbut","devllamabut","devwatchbut"];
var userid= /{"(\d+),oq:/.exec(document.body.innerHTML)[1];
var hintlist=new Array();
var fulllist=new Array();
var evaluator = new XPathEvaluator();
var akt=[true,true,true];
var rest=100;
var aktpage=0;
var sortacc=true;
var schritt=10;

if(!deakt){pruf();req(0);}

function pruf(){
	setTimeout(pruf, 1000);
	var ri= evaluator.evaluate("//h2[contains(., 'Activity')]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(!document.getElementById('devfavbut')&&ri.singleNodeValue){
		if(location.href.indexOf("#view=feedback")!=-1){
			schritt=10;
		}else{
			if(location.href.indexOf("#view=activity")!=-1){
			schritt=20;
			}
		}
		butinit();
	}
}
function butinit(){
	var neutab = document.createElement("span");
	neutab.ClassName='stackSwitch';
	neutab.innerHTML='<div class="dvl"></div>'+
	'<a id="devfavbut" onclick="return false;" style="background-image:url('+devakt[0] +') !important;background-repeat:no-repeat;background-position:0px 0px 0px 0px;" title="Favs-Switch" href=""></a>'+
	'<a id="devllamabut" onclick="return false;" style="background-image:url('+devakt[1] +') !important;background-repeat:no-repeat;background-position:0px 0px 0px 0px;" title="Llamas-Switch" href=""></a>'+
	'<a id="devwatchbut" onclick="return false;" style="background-image:url('+devakt[2] +') !important;background-repeat:no-repeat;background-position:0px 0px 0px 0px;" title="Watches-Switch" href=""></a>';
	var mview=evaluator.evaluate("//h2[contains(., 'Activity')]/div[@class='mcviews']", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	mview.singleNodeValue.appendChild(neutab);
	binder();
}
function umschalt(i){
	if(akt[i]){
		akt[i]=false;
		document.getElementById(devnams[i]).style.setProperty('background-image','url('+devdeakt[i] +')',"important");
	}else{
		akt[i]=true;	
		document.getElementById(devnams[i]).style.setProperty('background-image','url('+devakt[i] +')',"important");
	}
	adlist();anzeiger();blatter(0);
}

function req(offset){
	GM_xmlhttpRequest({
        method: 'GET',
        url: 
		"http://www.deviantart.com/global/difi.php?c[]=MessageCenter;get_views;"+userid+",oq:fb_activity:"+offset+":100:f&t=json",
        onload: function (response) {		
			var res = eval('('+response.responseText+')');
			var coms = res.DiFi.response.calls[0].response.content[0].result.hits;
			console.log(res);
			rest = res.DiFi.response.calls[0].response.content[0].result.matches - offset-100;
			for(var i=0;i< coms.length;i++){
				fulllist.push(coms[i]);
			}
			if(rest<0){adlist();anzeiger();}else{req(offset+100);}
		}
    });
}

function adlist(){
	hintlist=[];
	if((akt[0]==true)&&(akt[1]==true)&&(akt[2]==true)){hintlist=fulllist;}else{
		for(var i=0;i<fulllist.length;i++){
			if(
				!(!akt[0]&&(fulllist[i].display_class[0]=="collect"))&&
				!(!akt[1]&&(fulllist[i].display_class[0]=="badge"))&&
				!(!akt[2]&&(fulllist[i].display_class[0]=="watched"))
			){
				hintlist.push(fulllist[i]);
			}
		}
	}
}

function zeiter(milisecs){
	var dats = new Date(milisecs*1000);
	var mname=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	ruckdate= mname[dats.getMonth()]+" "+dats.getDate()+", "+dats.getFullYear()+", ";
	if(dats.getMinutes()<10){var mmin="0"+dats.getMinutes();}else{var mmin=dats.getMinutes();}
	if(dats.getHours()>11){ruckdate = ruckdate + (dats.getHours()-12) + ":" + mmin + " PM";}else{ ruckdate = ruckdate + dats.getHours() + ":" + mmin + " AM";}
	return ruckdate;
}

function binder(){
	if(document.getElementById('devfavbut')){
	document.getElementById('devfavbut').addEventListener('click', function(){umschalt(0)},false);
	document.getElementById('devllamabut').addEventListener('click', function(){umschalt(1)},false);
	document.getElementById('devwatchbut').addEventListener('click', function(){umschalt(2)},false);
	}else{return}

	var sortbut=evaluator.evaluate("//h2[contains(., 'Activity')]/div[@class='mcviews']/span[2]/a[1]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var sortbut2=evaluator.evaluate("//h2[contains(., 'Activity')]/div[@class='mcviews']/span[2]/a[2]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	sortbut.singleNodeValue.setAttribute("onclick","return false;");
	sortbut.singleNodeValue.addEventListener('click',sorten,false);
	sortbut2.singleNodeValue.setAttribute("onclick","return false;");
	sortbut2.singleNodeValue.addEventListener('click',sorten,false);

	var selallbut = evaluator.evaluate("//h2[contains(., 'Activity')]/../div[2]/table/tbody/tr[2]/td[2]/a[3]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	selallbut.singleNodeValue.className="gmbutton disabledbutton";
	selallbut.singleNodeValue.onclick="return false;";
	
	var zahlspan = evaluator.evaluate("//h2[contains(., 'Activity')]/..//span[@class='shadow']", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(!zahlspan.singleNodeValue){return}
	var zahlen = zahlspan.singleNodeValue.getElementsByTagName('a');
	for(var x=0;x<zahlen.length;x++){
		switch(zahlen[x].innerHTML){
			case "Previous Page":
				zahlen[x].addEventListener('click', function(){blatter(aktpage-1)},false);
				break;
			case "Next Page":
				zahlen[x].addEventListener('click', function(){blatter(aktpage+1)},false);
				break;
			default:
				zahlen[x].addEventListener('click', function(evt){blatter(evt.target.innerHTML.match(/\d*/)[0]-1)},false);
			}		
	}	
	
}

function sorten(){
	sortacc = !sortacc;

	var sortbut=evaluator.evaluate("//h2[contains(., 'Activity')]/div/span[2]/a[1]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var sortbut2=evaluator.evaluate("//h2[contains(., 'Activity')]/div/span[2]/a[2]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(sortacc){
		sortbut.singleNodeValue.style.setProperty('background-position','-240px -42px',"important");
		sortbut.singleNodeValue.title="Switch to Oldest First";
		sortbut2.singleNodeValue.style.setProperty('background-position','-240px -42px',"important");
		sortbut2.singleNodeValue.title="Switch to Oldest First";
	}else{
		sortbut.singleNodeValue.style.setProperty('background-position','-216px -42px',"important");
		sortbut.singleNodeValue.title="Switch to Newest First";
		sortbut2.singleNodeValue.style.setProperty('background-position','-216px -42px',"important");
		sortbut2.singleNodeValue.title="Switch to Oldest First";
	}
	
	hintlist=hintlist.reverse();
	anzeiger();
}

function blatter(wohin){
	aktpage=wohin;
	anzeiger();
}

function butbrows(){
	var bbtext='';
	if((aktpage>1&&aktpage<=(Math.floor(hintlist.length/schritt)-4))){
		var anf=aktpage-1;
	}else{
		if(aktpage>(Math.floor(hintlist.length/schritt)-4)&&(Math.floor(hintlist.length/schritt)>4)){
			var anf=Math.floor(hintlist.length/schritt)-4;
		}else{
			var anf=0;}
		}
	if(hintlist.length>schritt){
	if(aktpage==0){bbtext='<del class="l">Previous Page</del>';}else{bbtext='<a href="" onclick="return false;" class="l">Previous Page</a>';}
	for(var x=anf;x<hintlist.length/schritt && x<anf+5;x++){
		if(x==aktpage){
			bbtext=bbtext + '<strong>'+(x+1)+'</strong>';
		}else{
			if((x!=Math.floor(hintlist.length/schritt))&&(x==anf+4||(x==anf&&aktpage>1))){var inpu='...';}else{var inpu='';}
				bbtext = bbtext + '<a htmlpage="'+(x)+'" href="" onclick="return false;">'+(x+1)+inpu+'</a>';
			}
		}
	if(aktpage==Math.floor(hintlist.length/schritt)){bbtext=bbtext+'<del class="r page">Next Page</del>';}else{bbtext=bbtext+'<a href="" onclick="return false;" class="r page">Next Page</a>';}
	}

	var zahlspan = evaluator.evaluate("//h2[contains(., 'Activity')]/..//span[@class='shadow']", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(zahlspan.singleNodeValue){zahlspan.singleNodeValue.innerHTML=bbtext;}
}
var notfallzeil=0;
var notfallpar=0;
function anzeiger(){
	// var nanz = evaluator.evaluate("//h2[contains(., 'Activity')]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	// if(!nanz.singleNodeValue){return;}
	// nanz.singleNodeValue.innerHTML = nanz.singleNodeValue.innerHTML.replace(/^\d*/,hintlist.length);
	var titl=$("div#messages.messages table.messages tbody tr td.f div.messages-right div.mczone h2:contains('Activity Message')");
	titl.html(titl.html().replace(/^\d*/,hintlist.length));
	// var el = evaluator.evaluate("//h2[contains(., 'Activity')]/../div[@class='mczone-inner']", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	
	var entrs=$("div#messages.messages table.messages tbody tr td.f div.messages-right div.mczone:contains('Activity Message') div.mczone-inner div.mcbox");
	if(entrs.length>0){notfallzeil=entrs.first().clone(true,true);notfallpar=entrs.parent();}
		else if(notfallzeil==0)return;
	var centr=notfallzeil;
	var pcentr=notfallpar;
	// while (el.singleNodeValue.childNodes[0]) {
    // el.singleNodeValue.removeChild(el.singleNodeValue.childNodes[0]);
	// }
	
	for(var i=aktpage*schritt;i< hintlist.length && i<(aktpage+1)*schritt;i++){
	
		var who ="<span class='mcb-who'>"+hintlist[i].who+"</span>";
		var title="<span class='mcb-title'>"+hintlist[i].title+"</span>";
		var collection="<span class='mcb-collection'>"+hintlist[i].collection+"</span>";
		var basetitle="<span class='mcb-base_title'>"+hintlist[i].base_title+"</span>"
		
		centr=centr.clone(true,true);
		centr.find("span.mcb-who").html(hintlist[i].who);
		centr.find("span.mcb-title").html(hintlist[i].who);
		centr.find("span.mcb-collection").html(hintlist[i].collection);
		centr.find("span.mcb-base_title").html(hintlist[i].base_title);
		centr.find("span.mcb-ts span").html(zeiter(hintlist[i].ts));
		centr.find("span.mcb-icon").html(hintlist[i].icon);
		centr.find("span.mcb-line").html(hintlist[i].line[1].replace("%who%",who).replace("%title%",title).replace("%collection%",collection).replace("%base_title%",basetitle).replace("%client:you%","you").replace("%pricepoints%",hintlist[i].pricepoints).replace("%source%",""));
		pcentr.append(centr);
		centr.click(function(){
			$("div.mcbox-sel").removeClass("mcbox-sel mcbox-sel-list mcbox-sel-list-generic");
			$(this).addClass("mcbox-sel mcbox-sel-list mcbox-sel-list-generic");
		});
		centr.find("span.mcx:not([hintlistid])").attr("hintlistid",i).attr("onclick","").click(function(event){
			event.stopPropagation()
			event.preventDefault();
			var lastakt=hintlist[$(this).attr("hintlistid")].msgid;
			var lastind=$(this).attr("hintlistid");
			console.log(lastakt);
				unsafeWindow.DiFi.pushPost("MessageCenter", "trash_messages", [userid, "id:fb_activity:"+lastakt],function(a,s){
				console.log(a);
				console.log(s);				
				console.log(hintlist.splice(parseInt(lastind),1),parseInt(lastind));
				anzeiger();
				// $(this).parent(".mcbox").remove();			
			});	
			unsafeWindow.DiFi.send();
		});
		// var zdiv=document.createElement("div");
		// zdiv.className='mcbox ch mcbox-list mcbox-list-generic';
		// zdiv.setAttribute("onmousedown","MessageBox.pubEvent(this, window.event || arguments[0])");
		// var texx='<div class="ch-ctrl mc-ctrl">'+'<span onclick="MessageBox.pubEvent(this, window.event || arguments[0], \'watch\')" class="mcdx" style="display: none;"></span>'+
			// '<span onclick="MessageBox.pubEvent(this, window.event || arguments[0], \'x\')" class="mcx" style="display: block;"></span>'+
			// '<div class="mcbox-inner mcbox-inner-list mcbox-inner-list-generic">'+'<span class="mcb-ts">'+'<span>'+zeiter(hintlist[i].ts)+'</span></span>'+
			// '<span class="mcb-icon">'+hintlist[i].icon+'</span><span class="mcb-line">'+
			// hintlist[i].line[1].replace("%who%",who).replace("%title%",title).replace("%collection%",collection).replace("%base_title%",basetitle).replace("%client:you%","you").replace("%source%","")+
			// '</span> </div></div>';
		// zdiv.innerHTML=texx;
		// el.singleNodeValue.appendChild(zdiv);
	}
	entrs.remove();
	butbrows();
	binder();
}
};

// {"DiFi":{"status":"SUCCESS","response":{"calls":[{"request":{"class":"MessageCenter","method":"trash_messages","args":["1305938","id:fb_activity:2:298766207:1965597:0"]},"response":{"status":"SUCCESS","content":"trashed"}}]}}}
// {"DiFi":{"status":"SUCCESS","response":{"calls":[{"request":{"class":"MessageCenter","method":"trash_messages","args":["1305938","id:fb_activity:2:298766207:7270611:0"]},"response":{"status":"SUCCESS","content":"trashed"}}

// "17:2486103:28390274:262"
// 17:2486103:24282845:255