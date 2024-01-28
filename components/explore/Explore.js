import { loaderOff, loaderOn } from '../loader/loader';
import Swal from 'sweetalert2'
import './Explore.css'

export const Explore = () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  const explore = document.createElement('section');
  explore.className = 'explore';
  main.appendChild(explore);

  const exploreTitle = document.createElement('h2');
  exploreTitle.className = 'exploreTitle';
  exploreTitle.innerHTML = "EXPLORA TU MÚSICA..."
  const exploreInfo = document.createElement('div');
  exploreInfo.className = 'exploreInfo';
  exploreInfo.innerHTML = `
  <p>
    En esta sección podrás buscar tus albumes favoritos. Puedes buscar tanto por artista como por album y cuando lo encuentres solo tienes que añadirlo a tu estantería.
  </p>
  <p>
    ¿Cual es tu música favorita?
  </p>
`

  const exploreFormDiv = document.createElement('div');
  exploreFormDiv.className = "exploreFormDiv"
  const exploreForm = document.createElement('form');
  exploreForm.className = "exploreForm";
  const exploreSearchInput = document.createElement('input');
  exploreSearchInput.type = "text";
  exploreSearchInput.name = "exploreSearch";
  exploreSearchInput.placeholder = "Busca aquí tu música";
  const exploreSearchButton = document.createElement('button');
  exploreSearchButton.textContent = "Buscar";
  exploreSearchButton.type = "submit";

  explore.appendChild(exploreTitle);
  explore.appendChild(exploreInfo);
  explore.appendChild(exploreFormDiv);
  exploreFormDiv.appendChild(exploreForm);
  exploreForm.appendChild(exploreSearchInput);
  exploreForm.appendChild(exploreSearchButton);

  const searchAlbums = document.createElement('div');
  searchAlbums.className = 'searchAlbums';
  explore.appendChild(searchAlbums);

  exploreSearchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    searchAlbums.innerHTML = '';
    const loadResponse = document.createElement('p');
    loadResponse.className = 'loadResponse';
    loadResponse.innerHTML = "Cargando discos..."
    searchAlbums.appendChild(loadResponse);
    try {
      const response = await fetch(`https://tunetips-webscraper.onrender.com/scrape/${e.target.form[0].value}`);
      const data = await response.json();

      if (response.ok) {
        loadResponse.remove();
        for (let album of data.albums) {
          const albumDiv = document.createElement('div');
          const albumImg = document.createElement('img');
          albumImg.src = album.img
          const artistName = document.createElement('h3');
          artistName.innerHTML = album.artist;
          const albumTitle = document.createElement('p');
          albumTitle.innerHTML = `Album: ${album.album}`;
          const buttonAdd = document.createElement('button');
          buttonAdd.textContent = 'Añadir a mi estantería'

          searchAlbums.appendChild(albumDiv);
          albumDiv.appendChild(albumImg);
          albumDiv.appendChild(artistName);
          albumDiv.appendChild(albumTitle);
          albumDiv.appendChild(buttonAdd);

          buttonAdd.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
              loaderOn();
              const response = await fetch('https://tunetips-api.onrender.com/api/albums/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1')
                },
                body: JSON.stringify({
                  artist: e.target.parentElement.children[1].innerHTML,
                  album: e.target.parentElement.children[2].innerHTML.replace("Album:", '$1'),
                  img: e.target.parentElement.children[0].src,
                  users: localStorage.getItem('id').replace(/^"(.*)"$/, '$1'),
                }),
              });

              if (!response.ok) {
                loaderOff()
                Swal.fire({
                  title: "Lo sentimos!",
                  text: "No se ha podido añadir a tu estantería. Inténtalo de nuevo!",
                  icon: "error"
                });
                throw new Error(`Error al añadir album: ${response.status} - ${response.statusText}`);
              }

              if (response.ok) {
                const data = await response.json();
                const response2 = await fetch(`https://tunetips-api.onrender.com/api/users/${localStorage.getItem('id').replace(/^"(.*)"$/, '$1')}/albums`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1')
                  },
                  body: JSON.stringify({
                    albums: data,
                  }),
                });

                loaderOff();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Tu diso ha sido añadido",
                  showConfirmButton: false,
                  timer: 2000
                });

              };

            } catch (error) {
              loaderOff();
              console.error('Error al añadir el album:', error.message);
              Swal.fire({
                title: "Lo sentimos!",
                text: "No se ha podido añadir a tu estantería. Inténtalo de nuevo!",
                icon: "error"
              });
            }
          })
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  });



};