# H1 NodeJs & Gulp

Gulp är ett program som bygger på Node.js, det är ett program som man används för att automatisera olika processer inför publicering av till exempel webbplatser.
Syftet är att med Gulp kunna skapa olika processer så som att komprimera filer, slå ihop filer och så vidare. Något som annars skulle ta väldigt
lång tid om man skulle behöva göra det manuellt.

### De tasks jag skapat, vad de gör och vilka paket jag använd:
* **HTML-task:**
Tar HTML-filerna i mappen "src" och minifierar dessa, alltså tar bort alla mellanrum, kommentarer och så vidare för att göra filen så liten som möjligt. Skickar sedan dessa vidare till "pub"-mappen.  
Paketen som används är "gulp htmlmin" för att minifiera HTML-filerna, den verkade väldigt enkel och var ganska populär, vilket brukar vara ett bra tecken.
* **Js-task:**
Tar js-filerna i mappen "src/js" och slår ihop dessa till en och samma fil, minifierar den filen och skriver den till "pub/js" mappen och döper den till "main.js".  
Paketen som används är "gulp-concat" som slår ihop alla filerna med varandra, använder den då det var ett tips av Mattias. Sedan för att minifiera filerna används "gulp uglify es", som även det var ett tips av Mattias.
* **CSS-task:**
Exakt samma sak sker med dessa filer som för js-filerna fast css-filerna hittas i "src/css" och slutgiltiga filen läggs istället i "pub/css" och heter "main.css.  
Paketen som används är även där "gulp-concat" för att slå ihop filerna. För att minifiera CSS-filen används paketet "gulp-cssnano" för att den var väldigt simpel och många nedladdningar.
* **Image-task:**
Jag gjorde ett försök att automatisera komprimering av olika bildfiler, det går säkert att lägga till någon inställning för att komprimera mer men har enbart använt standard inställningarna. Bild-filerna tas från mappen "src/images", här tas **alla** filer som ligger i den mappen, så här ska det enbart läggas JPG, SVG, GIF eller PNG filer.
Filerna hämtas då in, komprimeras och skickas till "pub/images".  
Det paket jag använd heter "gulp-imagemin" och jag använder den dels för att den kom högt upp när jag sökte efter bildomptimerings verktyg men också för att den verkade enkel.

För att man enkelt ska kunna sitta och utveckla sin sida utan att behöva ladda om sin webbbläsare för varje ändring man gör i någon fil har jag lagt in en live-reload. Jag försökte först med paketet "gulp-livereload" men fick det inte att funka. Efter tips av Mattias provade jag programmet "browser-sync" vilket gjorde att det funkade. 
Browser-sync känner då av när någon av filerna i "pub" mappen har ändrats och uppdaterar då webbläsaren automatiskt.
* **SASS-task**
Gör om scss-kod till css kod och lägger det i CSS-mappen i pub. Minifierar även koden. 
### Systemet:
Systemet jag då har skapat innehåller en grundstruktur på en HTML-fil som man enkelt kan dublicera om man behöver fler HTMl-filer. I HTML-filen finns sökvägen för CSS-filen och JS-filen som ligger i "pub"-mappen.
Alltså för att se ändringar du gör i CSS och JavaScript måste du använda HTML-filerna i "pub"-mappen, alltså mappen för publicering. Så du arbetar med filerna i "Src"-mappen och kollar på resultatet i "pub"-mappen.
För att starta upp systemet skriver du "npm install" i terminalen(_obs du måste ha Node.js installerat_) när du befinner dig i mappen som innehåller filen som heter "package.json". Då installeras alla packet jag använd och även Gulp.

För att starta gulp skriver du "gulp" i terminalen när du står i samma mapp som innan. Sen är du redo, alla ändringar du gör i antingen HTML, CSS, JS eller bidlfiler kommer att behandlas och läggas i "pub"-mappen automatiskt. Var noga med att placera filerna på rätt ställe i "src"-mappen.
