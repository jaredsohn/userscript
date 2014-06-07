// ==UserScript==
// @name           dA_name_info
// @namespace      dA_name_info
// @description    Gives details about a deviant when hovering over his name
// @include        *.deviantart.*
// @version        2.2
// @author         dediggefedde
// ==/UserScript==

(function(){
var backaltimg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAABsCAYAAADuUrfKAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAGYktHRAD%2FAP8A%2F6C9p5MAAAAJcEhZcwAAFxIAABcSAWef0lIAAAAHdElNRQfcBRkULSKivPE2AAAJg0lEQVR42u2dXWxbZxnH%2F%2B85tuN8t0u6hX6ksMG6orGxgXZTTTAJmk3TqKqOlgaJXUQguN3NEBeISySkXiGQBi0IpIhVqBogjXUVG7BuSZOUqowlZSkbSUuahCZLnA879jnvw4VfZ7ZpWidOfOzz%2Fn%2FtqfPpVD7nl%2Bfj%2FThKREAIqRwOXwJCKB0hlI4QQukIoXSEEEpHCKUjhFA6QipOpJQvOvrkwYL3u3q6V98%2Be7JXAVAA1JeeO%2Fqw4ziPAWofFJr48pIaIzdTJAlgWCl1qfvQkYHiL3ruK0fu%2BESnX31tzc%2BpUmakFEuXkwyAe%2BDI03vrm5u%2B7bru8R1t7TvvbmtHa3MLIm6Ep5DUJL7vY25hHjMfzmLyv9OTAHoB%2FPSR%2Bx66eqfv%2FeH3vntH6dZrhjIpqQsg8sXjh481tjSf%2BtxnPos9O3cjHo1Bi0CL5pkjNc1edMJxFDJeuuPajYnnB%2F9%2B6fm%2FXb38zUfue%2BjnFUkvi4SLAIi37mhrbmhqOtX1%2BBNoadkG3%2FexkknzbJFwRDv4gA8opbB3Vyfat7fhlT%2Bf%2B9nA8NBLn3%2Fg0YVynttZp3QRAPUAmj994LFv7f%2FU%2FWht2QbP8yCMbiSMRZ4IPN9DU2MjHrx%2FP6J1se%2F4vo%2B1js2UTpmUsg5AE4C74o0NT%2B3p2AVf%2BxAIxFShPHiE8fC0j86du6CUOnbiB99X5UgX2aB02x3X2V0fj0OLgIuDSNjRIqivqweATmQbkBu%2B7NcjXcRI1wigWUFFleuAyhE78kzAcRwAiAFQWm%2B8nFqvdDFT09ULREHExF%2BKR8KOQl5wc%2FxSc8kypHPwUecyhvUPNRASKgPL2XFhI0MGuUOtxl2mmMQyygh065Yu%2F8gWmHz9iR0lXYEL5dR0G5nwrHgKiI3a%2BdkQ09LV0526nrghtzjOdPV0f3kzI92txRNhB5PYoZ0AXzt0BK5ybinDxPTU4dff%2FqsCcG4rpLtt7CUklHWc%2BPDT%2F1%2FLuY6LTHoF54f64WUyLxoPZYukE1pHrMZRDiIKONf%2FFhbnEy%2B80Xvm9a2VTj4Ku4TYJ5xCLBLFW0MXMHXjxot%2Feel3v0AJfZJIuc7RN2IjSilEI1EMj%2F4TIyMjZ87%2F9g8nSlViE2o6tlGIZcIBiLgupm9Oo3%2FwQt9I3%2BBPAKwA8JAdRZOtk87MAmN%2BSWzCdV0kl5M4P3QBsxOTp2f%2BM3kNwJIRz99a6cxzM9YRa4RzHLjKwZsDfZgav37iH29eOAtgHsAygAxKmC%2FC3cAIKRFHKdRFYnj74gCujY39ZvCVP%2F3SCLcEIF1KlCtbOi5d5WHTEXFdDI9ewZWRkd%2F3vfzHHxUJ5z117HhJKV%2FZ3UsNdjCJHc0TB8Dl4XdTV%2Fov%2FhjAHIBFACkAXtdXj0mp8zHL715y3IBYYZ3K9Qv9mYnJcQALyO6P6R189qhez1KfTWqkEBJ2JBfyBEAiv3Gy3hUHmzBkIOAtlIkNCabp0osRLg3Af%2BLQYVnv2jquACdk%2FWQAeF945pBsZF1deY0UzncmVmWYAqWUANCPP%2F2MbHQha5ndS4EG19MRq6o6AJBKbddwG%2FUoHbGLSmzBRwjJiy3BRbrcnpfsXpKwowBxq0C6XE2nmV6S8DtXEOoCrukIYU1X0UgnbKQQa0o6CV66gknYhNgkYIW2VWekI9bHuuBrOhHTvKR0xK7oFuw4nXDCM7GPgBsprOmIBagqSi%2B1aGjeu4eE3TlRBbElwMFxQqyq6qqjphPNmo5Ykl5KFdR0WrSZCsb0koQbB6rgOg90GpisbvNMSIgTy6JboQaXXpr995hektBnlxqQPM8CjHTZziWlI2FHFw0ZBL6IldPASOgjnVRLeglAhHs8EwtqOlSJdBoCLQKtKR0JeaRTgJYqmJEihf8QEmbtqiW91Nl4x0YKCb1zGvm3ngt0yEDrwrBLSBhxqmXIYHUBK6UjIUeK5oGtFelUJWo64W5gxIZIVzTZca2SauulMwtYWdOR0Ee6IpvWSi%2BdrZYuG2c595JYIF1RNhlo9zL3h5Awo6AKMrrgGikiZmd1hjoSdumA6pl7Sd%2BIjelmYPteaoFoH6KZXpKQS6ZUdlD6Tumls8XS5cIc00sSdrQqHKdbWzp369NL7u9MLIl1VZJert7HgNqR0OeXBROvAt1sVosu6z9ASC2gFApmXgW7MRH3SCFWSFd4jQd4q6zc7EtCwl7RVYl0AnBGCrGnpquOwXEz2ZmhjoTfuSqJdNlQB%2BEeKSTsNR2QndxfFZGOYY7YEOmKErrAupfZzfc0tLCmIyGPdEpB8noXgQ2Or6aYjHbEggRTCq77oGakgEMGxKb8smruT1dYYBIS0vyysLTiynFCtjq5REFNF%2Bjcy%2BxfRjpiU0UX6DQwLjIgVhV2eSVegN1Lxjlih25SHfccz25KxFBH7EswA00vtfbh%2B2ykkJAr5xTuZB6EdAIRT%2Fs%2BlFI8I8QG6%2BB7GiKSCUI6AYDMSnomsbS8IxaNYsXL8KSQUBONRrCwuASIjFVSOsk%2FZiYmL07t6nhg%2F75PIJlKwuMAOQkpjqNwV2MTrv7rOjIr6ZcBSKW6l2YhD3wAeqRvqH%2F3vk9%2BfW5uHu3btmN2IYFMxuMdfEh4ZAMQjUaxrbEJi0tJzM4lMNI3dKpSkS53G0oPQAaAp32d%2BeCdkV8ppb6xo307Pr6nA7FYFMvpNNLpDFcekNqVTTmIxVw0xOJIZzyMX5%2FE9PQsEjdnX5j8YHwZgFRCOjHCpQEkzZF6b%2BDS4PTYtfF7H37wwMTE1KMNjfWtDfE6xOvjcEvYdJOQakSLj%2BRyCslUGsvLyfml%2BcQbE6P%2F%2FvXYu1cGjQe6nPRSlfLNR5886ACIAWgG0AbgHvPYCqAegAvA6bh37562j93TWd%2FSdLfrunU8faS2yG75pbWfTi4sTiRuzl4dHxm9DGAGwJR5XACwAtx%2BwvHpV1%2FblEjnmx%2B2aARU5mMN5v3I5Ptj702%2BPzaK0m5ISUg1IXl9C89c68sAEgA%2BNLKlzOfKalxsVDqYH54C0AigDkDUPJ9D6UiNSpdrFGbMtb1kZEuYt1fM5ysiXX5dlzRvZ8xvgrg5ctK5lI7UqHS%2BOdJGsJS5xlPm%2FbKj3Eak03ni5X4bRIuEY6QjtR7pcl363OGZj%2Buunm45e7K3YtLl%2FzbIHz5w8mTLCUfpSC3XdDrvOvcBSFdP96YNQG9o7qX5DwgAffZkryoSrfiRkFoQrvhxU0XLR%2FHmH4RUFocvASGUjhBKRwjZPP4HqzJY0nI0qSEAAAAASUVORK5CYII%3D";
var backimg="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAABsCAYAAADuUrfKAAAACXBIWXMAABcSAAAXEgFnn9JSAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAACZNJREFUeNrsnVtsHFcdxr8ze%2FE9dmw3Td3UQHMRKQhUBEWlCqYpxI1Qm0aCRLXEC0GVwiN9KE8I8YBASHlCCFG50D44JKhtwgOJW3pT2zhN7ZS0oZsotMFx49qN3fjuvcw5fx521lm7JDvOjMe7M98vOlnLm%2ByOdubb738554wSERBCgsPiR0AIRUcIRUcIoegIoegIIRQdIRQdIYSiIyRw4jd6cs%2BDO0q%2BwNN%2Ff%2FYzv%2Bs5%2Buw9InI3gLsA1Di%2FVvy4SUUhmAHkvDHm1D%2BfPnwGgACQzn1dCzNKert7Fv2Xw8df8Ca6Aj%2F%2F9W%2Bu%2B1zq7AUAwDsfvLsJwH4AXetvWbe%2BZW0zmhoaEYvFePJIRWJrG5PTU%2FhkfAyd%2B7qGtdYH56dn%2Ftjb3TMIQBdE6KvTLQi%2BxFSxdz549yfJZPLJb3zlbtxxWxsS8SSMERgYnjlS2fmXsmAphXQu2zY0%2FNHjA%2B%2F96%2FHvPLr7x68efP4QANsRn1mO%2BFyJzpjri6f%2F3OmG2vq6J3d2fBd1tXXQRiOTy%2FJskVCgoRfEd2f7F9DatBbHX3v5qcZbWl6cvDI%2BDSDtiM%2B18FwVUrTW1x2JquT%2BL2%2FZivq6OtjaBidQk1Cmd2Jg2zYa1zRh6%2BYtuOu%2Bex4D0ODULOLLqVl4Et2BX%2F5CKaX2trfdDtvohQCXgyOcQ6CNxh3rb0d1Xe1OAM0A6gFUAYi5FZ7XnE4BaK%2BpqoEWAT2OhB0jgprqalgxawOAtQCyADLOo3YTYnrN6RSApGVZ0EbzjJDwh5kQqJgFBZVwwssZZ8wDyPnmdFrrG4anIuLom15Hwo4CRCAQ5eRzNQCSy8nr%2FAgvCYkq8SLBWW5rJF6dbpHx0ulItCxvQWjWcgzIj5wu%2F294EkgkcrpF6lJLhj%2Bi69zX9b2Ppj7eD2D3%2F3ku74TLa8gTEjbHW3ZMWoqfbv%2FWtx9pW3frgtIXhZ5iYNsabBiQSChMvAnOjeiUncv96Y3%2Bk4%2Fs7HgAiWQVWwOEvuaRUtUW9dIzf3t5ZnLqiVdPvom4AiylwLkJHBw3j5vw0nql57k%2Fd%2BzdtfHE6f7H7vv6N5HJZWE4x5JE1eg8Xvpu%2BgoCQF47dPRAKpV67v0L55GIJ6AUW3QkevjRGIu7eA%2BD%2FNKFTKrv7T9YMeu25qame1tbWpGzbZZPSMSczvsV70Z0GvkJnbPjl0eGPh0eOfxG%2F1v3dm7bjqrqKtiahRUSJadTSyuYK5LTGeQncs4BsM6%2B%2FlZvTUP9gddP9f2ss2M7jGWgDVvjJEI5nUfc5nQa%2BaULswAm3%2F7HS38ZGhz864mBU6iKJ52KJiHEL6fDzr2PyrFDB21H6LMA4n1Hjv3Osqza5qamh7ds3ISsneOnSSISYq6808EYg84f7hXkCypp5NcPTZw7OfD7M%2B%2F%2FO20VHQwHR5iHCUp0IgIRwY4f7ClUMucBTI8Pj1wCoPMtO8UzwsG%2BuF%2Fh5ZJVBsWFlXihhiqcfUkiUUiRYERXvJ7u%2Fl275ZWjzxcKK3MorKN13JCQcOdzy1rF4y2nKx4dD%2B0q5HesnhAShOiMMdj2%2FYcEgFFKCQp7pHBwRGBIAM3xG23XINeqlszqSPgx8N4g97yt%2BjX1UXQkCoUUeJadPxsTUWuEBCs6AQDjQ7BLSCVYnSoD0QECw%2FCSRAQrgJXjrnI6QkiAopOiP4SEmUKlfsVF52qmCTd4JiTYnI5OR%2Bh0QYaXwrmXJCqiU0C5FFIoOhIZryuXlkHxAyGhlZwKKLx00xw3YpjTkYgkdQFMAysdXlJsJFq6W33RCSCGOR2JQngpLhfErXB4aWAgzt%2BEhBkFBSNm5UXnbmkPo0wSEacLIrwsWUgxABhekqgkdCYA0bkppBhQdCT8GBjPqvNvlYFwGhghAed0nPFMIhBdiglGdCWrlyIwzOlIFFDiuUrv8yJWio6E3erKpTnu9OnodCT8BFRIcdMyECMwFB0Je3TpXXPenE4Vea4IuBsYiUB0Kau7XYMqMlxOAyORcDofGmOewktr6TcAnY6E3el8WKztX5%2FOj1tUElLumHKZeymF4JKqI2EPLwsJ1ao7XX5LdYaXJPThJRBMeEkxEVKkulUNL60FK4QYNsdJRJzOrObGRFZs4VAMHZHQ7oINL7mwh0RDbgFVL0vv8Azu10AiY3Krfc%2FxvCghMMb4staIkHLGKFUe9zJYMF7mdCTsRhdU9dLtynFKjjC%2BDCqng8AIJzyTCISXUOWyiJV1FBKV8NL7XkD%2BiM5Ift9LQ9WRkKPKpHrJ9askOhldQE5XqiqZX2PAaWAkCqLzvFuDX6L77E%2BEhDOn8%2F4aPt0qy7nnOM8JiUSAWS7NccPEjkRAcsr7a%2FjUpzML96gjJMwYKJTPDUQ4J4VEI7pc3S34lhwJ6ygkCprzfJ37d89x%2BhyJjuzKIafz74AIKWvJlcsNRAwEYjQ0p4GRkGNBr354KSI5bRtAWQA0zwoJNUopGK0BEftmQzvvTicyOD0z25JIxJHTNs8KCTXJRAJTs3PIZbLjN5tTea1eSi6TPTIyMva1TRs3IJ3JwDDEJCElbik01dUjdf4ixodHBnCtZr%2Bs2r1np0v19T9V9cC2X83MzqN1TSMmZmeQy%2BXYJichyuMUEok4mhvWYGJiEpNTM0j19Z9EvkuuUbhxVUCik5GLl%2Bamxj59InUOv123rhntG9YjmYhjLptGNqthuFkRqVSxKQvJZAK1ySSy2Rz%2BOzSCK2NXcfG91DNGmxwAG0Dh0fXtIr2GlwaAfeLIsYOf%2B9IX%2FzOx%2BfM%2Funx59P7a2prGmuokamqrYakYzx6pSLTRSM%2BnMZfOYG52fvLqyJXTH545%2B%2BbE6NgogDSAeWdkHeG5cjt1o9kmex7cUdp5gSoADQBaANwKoKV96%2Bavrmlt3lTTUN9mWbGkI13F00gqSnRaZ%2BanZj4Z%2F3j00siHg0NF4eQ8gEkA4wBGncdpANnDx18o6XZxj8cljsLTzpsmAahLqQsDAFKOIOOOOBWK75hMSGVQKJJo51rPAphzRHcVwAyAjPO8K6fzQ3TaedNZR1S2801QB6AaQAJArEh4hFSa6ExR%2Fla41qecEbjoit1u3jm4wjdBteN0SUd0MYqOVKjodJHo0kX5XOHnZTXKPYuuc1%2BX9Hb3GOeATNGBJZwRp9OREDhdsfAKw8ZKtQzcCA%2BAdsRXODCrSGzM6Uil53QGi%2FtyGje5oC3u59E54hMApre7Ry0R2tJHQipBcEsfxbnOAQC93T3LflHFbfMICRaLHwEhFB0hFB0hxD%2F%2BNwBFk8Zq9QdsNgAAAABJRU5ErkJggg%3D%3D";


var userdata = new Object();
var thumbdata = new Object();
var users = new Array;
var user="";
var thumb="";
var altthumb="";
var altnam="";
var multiblock=false;
var showit=new Array();
var verz;
var aktthumb=false;
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
GM_addStyle("#dA_nameinfo{text-decoration:none;border:none!important;line-height:12pt!important;z-index: 1;text-align:left;margin-top: -15px;background-repeat: no-repeat!important;display: none;font: 8pt verdana;color:#304030;padding-left: 23px;padding-right: 10px;padding-top: 15px;position: absolute;width: 180px;background-size:105% 110%;} a.u:hover #dA_nameinfo {display:inline;} #dA_nameinfo div.dA_nameinfo_links{font: 10pt/20px verdana;color:#304030;font-weight:bold;padding-right:5px;display:inline;} #dA_nameinfo div.dA_nameinfo_links div{background-image: url('http://st.deviantart.net/minish/main/more.png?7')!important;float: left;height: 20px;width: 20px;} #dA_nameinfo div.dA_nameinfo_links a{font: 10pt/20px  verdana;color:#6f756e!important;float:left;} #dA_nameinfo div.dA_nameinfo_i2{background-position:-840px 0!important;} #dA_nameinfo hr {margin: 3px 0px;}");

var links=$();
var breit=$(document).width();
function hoverset(){

	if($("body #dA_nameinfo").length==0){
		$("body").append("<div id='dA_nameinfo' style='z-index:999;'>###0###<br>###1###<br>###2###<hr><div class='dA_nameinfo_links'><div class='dA_nameinfo_i1'></div><a href='http://###3###.deviantart.com/gallery/'>Gallery</a><div class='dA_nameinfo_i2'></div><a href='http://###3###.deviantart.com/favourites/'>Favourites</a></div>");
	}
	links.mousemove(function(arg){
		if(arg.pageX>breit-$("#dA_nameinfo")[0].offsetWidth){
			$("#dA_nameinfo").css("background-image","url('"+backaltimg+"')");
			$("#dA_nameinfo").css("left",(arg.pageX-$("#dA_nameinfo")[0].offsetWidth)+"px");
		}else{
			$("#dA_nameinfo").css("background-image","url('"+backimg+"')");
			$("#dA_nameinfo").css("left",(arg.pageX+1)+"px");
		}
		$("#dA_nameinfo").css("top",arg.pageY+"px");
	});
	links.hover(hov,out);
	links.attr("dA_nameinfo","false");
	$("#dA_nameinfo").hover(hov,out);
}
function hov(arg){
		var el=$(this);
		if(arg.shiftKey != 1)return true;
        if (typeof el.attr("title") != 'undefined' && el.attr("title") !== false) {
            el.attr("deaktitle",el.attr("title"));
            el.attr("title","");
        }
    
		el.attr("showit","true");		
		if(el.id!="dA_nameinfo"){
			if($("#dA_nameinfo").css("display")=="block")return true;
			$("#dA_nameinfo").css("display","block");
			if(arg.pageX>breit-$("#dA_nameinfo")[0].offsetWidth){
				$("#dA_nameinfo").css("background-image","url('"+backaltimg+"')");
				$("#dA_nameinfo").css("left",(arg.pageX-$("#dA_nameinfo")[0].offsetWidth)+"px");
			}else{
				$("#dA_nameinfo").css("background-image","url('"+backimg+"')");
				$("#dA_nameinfo").css("left",(arg.pageX+1)+"px");
			}
			$("#dA_nameinfo").css("top",arg.pageY+"px");
		}
		if(typeof el.attr("href")!="undefined"&&el.attr("href")!="" && el.context.tagName=="A"){
			user=el.attr("href").match(/http:\/\/(.*)\.deviantart/i);
			if(user)user=user[1].toLowerCase();
		}else if(typeof el.attr("class")!="undefined"&&el.context.tagName=="DD"){
			user=el.attr("class").match(/dAmnChatMember un-(.*?) ffc/i)[1];
			
		}		
        if((typeof el.attr("href")!='undefined' )&& ((el.attr("href").search(/^http:\/\/[^.]*?\.deviantart.com\/art\//)>-1)||(el.attr("href").search(/^http:\/\/fav\.me\/\w+$/)>-1))){
            aktthumb=true;
            $("#dA_nameinfo").css("width","300px");
            $("#dA_nameinfo").css("padding-left","30px");
            thumb=el.attr("href").match(/^http:\/\/[^.]*?\.deviantart.com\/art\/.*?(\d+).*?$/);
			if(!thumb)thumb=el.attr("href").match(/^http:\/\/fav\.me\/(\w+)$/)[1];else thumb=thumb[1];
            if(typeof thumbdata[thumb]=="undefined"){
                $("#dA_nameinfo").html("Please Wait!<br>Deviation-data are being fetched<br>...<hr><div class='dA_nameinfo_links'><div class='dA_nameinfo_i1'></div><a href='http://www.deviantart.com'>Gallery</a><div class='dA_nameinfo_i2'></div><a href='http://www.deviantart.com'>Favourites</a><br style='clear:both;margin-bottom:7px;'/></div>");
			    getdevdata(el);
                return false;
            }
            var arg=thumbdata[thumb];	            
     		$("#dA_nameinfo").html($("#dA_nameinfo").html().replace("###0###",thumbdata[thumb][0]).replace("###1###",thumbdata[thumb][1]).replace("###2###",thumbdata[thumb][2]).replace(/###3###/g,thumbdata[thumb][3]).replace("###4###",thumbdata[thumb][4]));
            el.attr("dA_nameinfo","true");
        }else if(typeof el.attr("href")=="undefined"&&aktthumb){
            var arg=thumbdata[thumb];	            
     		if(typeof thumbdata[thumb]=="undefined"){
                $("#dA_nameinfo").html("Please Wait!<br>Deviation-data are being fetched<br>...<hr><div class='dA_nameinfo_links'><div class='dA_nameinfo_i1'></div><a href='http://www.deviantart.com'>Gallery</a><div class='dA_nameinfo_i2'></div><a href='http://www.deviantart.com'>Favourites</a><br style='clear:both;margin-bottom:7px;'/></div>");
                getdevdata(el);
                return false;
            }
            $("#dA_nameinfo").html($("#dA_nameinfo").html().replace("###0###",thumbdata[thumb][0]).replace("###1###",thumbdata[thumb][1]).replace("###2###",thumbdata[thumb][2]).replace(/###3###/g,thumbdata[thumb][3]).replace("###4###",thumbdata[thumb][4]));
            el.attr("dA_nameinfo","true");
        }else{
            aktthumb=false;
            $("#dA_nameinfo").css("width","");
            $("#dA_nameinfo").css("padding-left","");
            if(typeof userdata[user]=="undefined"){
                $("#dA_nameinfo").html("Please Wait!<br>User-data are being fetched<br>...<hr><div class='dA_nameinfo_links'><div class='dA_nameinfo_i1'></div><a href='http://www.deviantart.com'>Gallery</a><div class='dA_nameinfo_i2'></div><a href='http://www.deviantart.com'>Favourites</a><br style='clear:both;margin-bottom:7px;'/></div>");
                getdata(el);
                return false;
            }
                
            var arg=userdata[user].split("|");	
            if(arg[1].length>30){arg[1]=arg[1].substr(0,25)+" ...";}
            var formerly="";
            if(arg[3]!="")formerly="<br>Former "+arg[3];
            $("#dA_nameinfo").html($("#dA_nameinfo").html().replace("###0###",arg[1]).replace("###1###",arg[2]).replace("###2###",arg[0]).replace(/###3###/g,user).replace("###4###",formerly));
            el.attr("dA_nameinfo","true");
        }
}
function out(){
	$("[deaktitle]").attr("title",$(this).attr("deaktitle"));
	$("[deaktitle]").removeAttr("deaktitle");
  $(this).removeAttr("showit");
	if($("[showit]").length==0){
		$("#dA_nameinfo").css("display","none");
		$("#dA_nameinfo").html("###0###<br>###1###<br>###2######4###<hr><div class='dA_nameinfo_links'><div class='dA_nameinfo_i1'></div><a href='http://###3###.deviantart.com/gallery/'>Gallery</a><div class='dA_nameinfo_i2'></div><a href='http://###3###.deviantart.com/favourites/'>Favourites</a><br style='clear:both;margin-bottom:7px;'/></div>");
	}
}	
	
function getdevdata(el){
	el.attr("dA_nameinfo","false");
	if(typeof el.attr("href")=="undefined")return false;
	//if(el.parent(":contains('#')").length>0){return true;}
    if(altthumb==thumb)return false;
	altthumb=thumb;
	setTimeout(function(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: el.attr("href"),
		onload: function (responseDetails) {
            var rex=/<span class="comments"><span class="iconcommentsstats"><\/span>Comments:<\/span>(.+?)<br><span class="favourites"><span class="iconcommentsstats"><\/span>Favourites:<\/span>.*?([\d,]+?)</
            var rex2=/<meta name="title" content="(.*?) on deviantART"/
            var rex3=/<td class="f dcats">(<a  class="h".*?<\/a>)<\/td>/
			var rex4=/<label>Submitted:<\/label> <span title=".*?" ts="(\d+)" offset/
            var ergs=rex.exec(responseDetails.responseText);
            var ergs2=rex2.exec(responseDetails.responseText);
            var ergs3=rex3.exec(responseDetails.responseText);
            var ergs4=rex4.exec(responseDetails.responseText);
			if(ergs4!=null){var d=new Date(ergs4[1]*1000); ergs4="<br/>Submitted: "+d.toLocaleString();}else ergs4="";
            if(ergs!=null){
                thumbdata[thumb]=new Array(ergs2[1],ergs3[1],ergs[1]+" comments and "+ergs[2]+" favourites",ergs2[1].match(/by .(.+?)$/)[1],ergs4);
                $("#dA_nameinfo").html("###0###<br>###1###<br>###2######4###<hr><div class='dA_nameinfo_links'><div class='dA_nameinfo_i1'></div><a href='http://###3###.deviantart.com/gallery/'>Gallery</a><div class='dA_nameinfo_i2'></div><a href='http://###3###.deviantart.com/favourites/'>Favourites</a><br style='clear:both;margin-bottom:7px;'/></div>");
				$("#dA_nameinfo").html($("#dA_nameinfo").html().replace("###0###",thumbdata[thumb][0]).replace("###1###",thumbdata[thumb][1]).replace("###2###",thumbdata[thumb][2]).replace(/###3###/g,thumbdata[thumb][3]).replace("###4###",thumbdata[thumb][4]));
            }else{
                console.log("Error: can't fetch data!");
                console.log("Data:"+responseDetails.responseText);
            }			
        },
		onerror:function(error){
			GM_log(error);
		}
		});
	},0);
}
    
function getdata(el){
	el.attr("dA_nameinfo","false");
	if(typeof el.attr("href")=="undefined")return false;
	if(el.parent(":contains('#')").length>0){return true;}
	if(altnam==user)return false;
	altnam=user;
	setTimeout(function(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+user+'.deviantart.com',
		onload: function (responseDetails) {
				var rex = /<span style="display:table-cell;\*display:inline-block;padding-right:16px">[\s\S]*?<strong class="f">([\s\S]*?)<\/strong>[\s\S]*?<strong class="f">[\s\S]*?<\/strong>[\s\S]*?<\/span>[\s\S]*?<span style="display:table-cell;\*display:inline-block"><strong class="f">([\s\S]*?)<\/strong>([\s\S]*?)<\/span>/gi
				var ergs=rex.exec(responseDetails.responseText);
				rex=/<a class="u" href="http:\/\/(.*?).deviantart.com">.*?<\/a>/i
				var rex2 =/<div class="grurename"><span>Formerly <strong>(.*?)<\/strong><\/span><\/div>/i
				var ergs2=rex2.exec(responseDetails.responseText);
				if(ergs2!=null){
					$("a[href='"+el.attr("href")+"']").parent(".cc-name").after("<span class='alterego' style='margin:0px -10px 0px 10px;font-size: 8.25pt;color: #778584; white-space: nowrap;'>Formerly "+ergs2[1]+"<span style='border-left: 1px dotted #778584; margin:0px 0px 0px 5px'>&nbsp;</span></span>");
				}
				if(ergs!=null){
					userdata[rex.exec(responseDetails.responseText)[1].toLowerCase()]=ergs[1]+"|"+ergs[2]+"|"+ergs[3]+"|";
					if(ergs2!=null)userdata[rex.exec(responseDetails.responseText)[1].toLowerCase()]+=ergs2[1];
					users.push(rex.exec(responseDetails.responseText)[1].toLowerCase());
					$("#dA_nameinfo").html("###0###<br>###1###<br>###2######4###<hr><div class='dA_nameinfo_links'><div class='dA_nameinfo_i1'></div><a href='http://###3###.deviantart.com/gallery/'>Gallery</a><div class='dA_nameinfo_i2'></div><a href='http://###3###.deviantart.com/favourites/'>Favourites</a><br style='clear:both;margin-bottom:7px;'/></div>");
					if(ergs[2].length>30){ergs[2]=ergs[2].substr(0,25)+" ...";}
					var formerly="";
					if(ergs2!=null&&ergs2[1]!="")formerly="<br>Former "+ergs2[1];
					$("#dA_nameinfo").html($("#dA_nameinfo").html().replace("###0###",ergs[2]).replace("###1###",ergs[3]).replace("###2###",ergs[1]).replace(/###3###/g,rex.exec(responseDetails.responseText)[1].toLowerCase()).replace("###4###",formerly));
					el.attr("dA_nameinfo","true");
				}else{
					console.log("Error: can't fetch data!");
				}
				
			},
		onerror:function(error){
			GM_log(error);
		}
		});
	},0);
}
		
function urlpruf(){	
	links=$("a[href],dd").not("[dA_nameinfo]").filter(function(){
		if($(this).hasClass("dAmnChatMember"))return true;
		if(typeof $(this).attr("href")=="undefined")return false;
		if($(this).attr("href").search(/^http:\/\/[^.]*?\.deviantart.com\/$/)>-1)return true;
		if($(this).attr("href").search(/^http:\/\/fav\.me\/\w+$/)>-1)return true;
        if($(this).attr("href").search(/^http:\/\/[^.]*?\.deviantart.com\/art\//)>-1)return true;
	});
	if(links.length>0){hoverset();return true;}
}
setInterval(urlpruf,500);
})();