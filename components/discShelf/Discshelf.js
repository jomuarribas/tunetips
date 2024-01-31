import { getUser } from '../apiService/apiService';
import './Discshelf.css'
import Swal from 'sweetalert2'

export const discShelf = () => {

  const main = document.getElementById('main');
  main.innerHTML = '';
  const discShelf = document.createElement('section');
  discShelf.className = 'discShelf';
  main.appendChild(discShelf);

  const fullName = document.createElement('h3');
  const imgUser = document.createElement('img');

  async function userInit() {
    try {
      const user = await getUser();
      imgUser.src = user.img
      fullName.innerHTML = `${user.name} ${user.surname}`
    } catch (error) {
      Swal.fire({
        title: "Lo sentimos!",
        text: "Se ha cerrado la sesión. vuelve a loguearte!",
        icon: "error"
      });
    }
  }
  userInit();

  const discShelfTitle = document.createElement('h2');
  discShelfTitle.className = 'discShelfTitle';
  discShelfTitle.innerHTML = "TU ESTANTERÍA"
  const discShelfInfo = document.createElement('div');
  discShelfInfo.className = 'exploreInfo';
  discShelfInfo.innerHTML = `
  <p>
    Aquí tienes tu musica favorita. A esta estantería se irán añadiendo tus discos favoritos y podrán ser vistos por el resto de la comunidad.
  </p>
  <p>
    Puedes añadir todos los que quieras y quien sabe lo mismo tus gustos sirven de inspiración para otras personas. Si aún no tienes ningún album añadido a tu estantería dirígete a la pestaña de "Explorar" y añade los discos que quieras.
  </p>
  `

  discShelf.appendChild(imgUser);
  discShelf.appendChild(fullName);
  discShelf.appendChild(discShelfTitle);
  discShelf.appendChild(discShelfInfo);

  const myAlbums = document.createElement('div');
  myAlbums.className = 'myAlbums';
  discShelf.appendChild(myAlbums);

  const searchMyAlbums = async () => {
    myAlbums.innerHTML = '';
    try {
      const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('id').replace(/^"(.*)"$/, '$1')}`);
      const data = await response.json();

      if (response.ok) {
        const albums = data.albums;
        for (let album of albums) {
          const response = await fetch(`http://localhost:3000/api/albums/${album}`);
          const data = await response.json();

          const albumDiv = document.createElement('div');
          const albumImg = document.createElement('img');
          albumImg.src = data.img
          const artistName = document.createElement('h3');
          artistName.innerHTML = data.artist;
          const albumTitle = document.createElement('p');
          albumTitle.innerHTML = `Album: ${data.album.slice(3)}`;
          const buttonDel = document.createElement('button');
          buttonDel.textContent = 'Eliminar album';
          const albumId = document.createElement('p');
          albumId.className = 'albumId';
          albumId.innerHTML = data._id;

          myAlbums.appendChild(albumDiv);
          albumDiv.appendChild(albumImg);
          albumDiv.appendChild(artistName);
          albumDiv.appendChild(albumTitle);
          albumDiv.appendChild(buttonDel);
          albumDiv.appendChild(albumId);

          buttonDel.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
              const response = await fetch(`http://localhost:3000/api/albums/${e.target.parentElement.children[4].innerText}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1'),
                  'Content-Type': 'application/json'
                },
              });

              if (!response.ok) {
                Swal.fire({
                  title: "Lo sentimos!",
                  text: "Tu usuario no ha podido eliminarse. Inténtalo de nuevo!",
                  icon: "error"
                });
                throw new Error(`Error al registrar usuario: ${response.status} - ${response.statusText}`);
              }

              if (response.ok) {
                const response2 = await
                  fetch(`http://localhost:3000/api/users/${localStorage.getItem('id').replace(/^"(.*)"$/, '$1')}/albums/${e.target.parentElement.children[4].innerText}`, {
                    method: 'DELETE',
                    headers: {
                      'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1'),
                      'Content-Type': 'application/json'
                    }
                  });
                if (response2.ok) {
                  searchMyAlbums();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tu album ha sido eliminado",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              };

            } catch (error) {

            }
          });

        }

      }

    } catch (error) {
      console.error('Error al mostrar la estantería:', error.message);
      Swal.fire({
        title: "Lo sentimos!",
        text: "No se ha podido mostar tu estantería. Inténtalo de nuevo!",
        icon: "error"
      })
    }

  };

  searchMyAlbums();

};