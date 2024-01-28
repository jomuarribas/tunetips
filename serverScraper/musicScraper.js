const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());

app.get('/scrape/:search', async (req, res) => {
  try {
    const url = `https://www.deezer.com/search/${req.params.search}/album`;

    const browser = await puppeteer.launch({
      headless: "new",
      defaultViewport: null,
      executablePath: '/path/a/chrome',
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    const cookies = await page.cookies();

    for (let cookie of cookies) {
      await page.setCookie({
        name: cookie.name,
        value: '',
        domain: cookie.domain,
        value: 0,
      })
    }

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const acceptButtonSelector = 'button[data-testid="gdpr-btn-accept-all"]';
    await page.waitForSelector(acceptButtonSelector);
    const acceptButton = await page.$('#gdpr-btn-accept-all');
    if (acceptButton) {
      await acceptButton.click();
    }

    await page.waitForSelector('.thumbnail-col');

    const img = await page.$$eval('.thumbnail-col figure div img', (nodes) =>
      nodes.map((n) => n.src)
    );

    const album = await page.$$eval('.thumbnail-col .thumbnail-caption .heading-4', (nodes) =>
      nodes.map((n) => n.innerText)
    );

    const artist = await page.$$eval('.thumbnail-col .thumbnail-caption .heading-4-sub a', (nodes) =>
      nodes.map((n) => n.innerText)
    );

    const musicAlbums = album.map((value, index) => {
      return {
        img: img[index],
        album: album[index],
        artist: artist[index],
      }
    });

    // await browser.close();
    res.json({ albums: musicAlbums });
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Puppeteer server listening at http://localhost:${port}`);
});