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

Asenna Node.js ja suorita:

```sh
npm ci
npm start
```

Sovellus avautuu osoitteeseen http://localhost:3000.

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

Testit kattavat ydintoiminnot, suodatuksen, selaintallennuksen, arkistoinnin ja tyhjän tehtävälistan tunnisteet. Käyttöliittymä käyttää Reactia ja tavallista CSS:ää. Palvelinta, kirjautumista tai monen käyttäjän yhteiskäyttöä ei ole toteutettu.
