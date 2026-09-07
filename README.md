# Projektinhallinta

Reactilla toteutettu projektinhallintademo. Voit luoda ja muokata projekteja, arkistoida ja palauttaa niitä sekä lisätä, muokata ja poistaa tehtäviä.

## Käyttö

- Projektikortit näyttävät tehtävien määrän ja valmistumisasteen.
- Tehtäviä voi hakea nimellä ja suodattaa tilan tai vastuuhenkilön mukaan.
- Projektin osoitteen voi kopioida. Linkki toimii samat tiedot sisältävässä selaimessa; tietoja ei jaeta käyttäjien välillä.
- Muutokset tallennetaan selaimen localStorageen. Tallennus ei ole varmuuskopio: selaintietojen tyhjennys poistaa tiedot.
- Palauta esimerkkidata korvaa tämän selaimen projektit ja tehtävät vahvistuksen jälkeen.
- Arkistointi piilottaa projektin aktiivisten listasta. Arkistoitua projektia voi edelleen muokata ja sen voi palauttaa aktiiviseksi.
- Dialogit tukevat näppäimistöä, Escape-sulkemista ja fokuksen palauttamista.

## Kehitys

Kehitys- ja rakennustyökalu on Vite, ja testit suoritetaan Vitestillä.
Käytä Node.js-versiota 22.22.2+, 24.15.0+ tai 26+ (tuetut versiosarjat
on määritelty package.json-tiedoston engines-kohdassa). Suorita:

```sh
npm ci
npm start
```

Sovellus toimii osoitteessa http://localhost:3000. Myös `npm run dev`
käynnistää saman palvelimen. Portti on kiinteä: jos se on varattu, sulje
vanha kehityspalvelin ennen käynnistystä. Käytä samaa osoitetta kuin aiemmin,
sillä selaintallennus on osoite- ja porttikohtainen.

```sh
npm test
npm run test:watch
npm run build
npm run preview
```

Testit kattavat ydintoiminnot, suodatuksen, selaintallennuksen, arkistoinnin ja tyhjän tehtävälistan tunnisteet. Käyttöliittymä käyttää Reactia ja tavallista CSS:ää. Palvelinta, kirjautumista tai monen käyttäjän yhteiskäyttöä ei ole toteutettu.

`npm test` ajaa testit kerran, ja `npm run test:watch` seuraa muutoksia.
Tuotantorakennus syntyy `dist`-hakemistoon. `npm run preview` palvelee sitä
paikallisesti osoitteessa http://localhost:4173; sillä on oma selaintallennuksensa.
Julkaise `dist`-hakemiston sisältö staattiseen palveluun sivuston juureen.

HTML-aloitustiedosto on juuren `index.html`, joka lataa `src/index.jsx`-tiedoston.
Viten ja Vitestin asetukset ovat tiedostossa `vite.config.js`. Testien DOM-tarkistukset
ja siivous alustetaan tiedostossa `src/setupTests.js`.
