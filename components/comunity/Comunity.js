import { getUser } from '../apiService/apiService';
import { login } from '../login/login';
import Swal from 'sweetalert2'
import './Comunity.css'

export const comunity = () => {

  const main = document.getElementById('main');
  main.innerHTML = '';
  const comunitySection = document.createElement('section');
  comunitySection.className = 'comunity';
  main.appendChild(comunitySection);

  const infoHeader = document.createElement('div');
  const imgDiv = document.createElement('div');
  imgDiv.className = 'comunityImgDiv';
  const imgUser = document.createElement('img');
  const infoDiv = document.createElement('div');
  infoDiv.className = 'comunityInfoDiv';
  const userName = document.createElement('h3');
  const publications = document.createElement('p');
  const fullName = document.createElement('p');

  const infoUser = async () => {
    try {
      const user = await getUser();

      if (!user.posts) {
        publications.innerHTML = `0 publicaciones`
      } else {
        publications.innerHTML = `${user.posts.length} publicaciones`
      }

      imgUser.src = user.img
      userName.innerHTML = user.username;
      fullName.innerHTML = `${user.name} ${user.surname}`
    } catch (error) {
      login();
      Swal.fire({
        title: "Lo sentimos!",
        text: "Se ha cerrado la sesión. vuelve a loguearte!",
        icon: "error"
      });

    }
  };
  infoUser()

  comunitySection.appendChild(infoHeader);
  infoHeader.appendChild(imgDiv);
  infoHeader.appendChild(infoDiv);
  imgDiv.appendChild(imgUser);
  infoDiv.appendChild(userName);
  infoDiv.appendChild(publications);
  infoDiv.appendChild(fullName);

  const allUsers = document.createElement("div");
  allUsers.className = "allUsers";
  comunitySection.appendChild(allUsers);

  const allUsersFunction = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1'),
          'Content-Type': 'application/json'
        }
      });
      const users = await response.json();
      for (let user of users) {
        const oneUserDiv = document.createElement("div");
        const oneUser = document.createElement("img");
        const oneUserUsername = document.createElement("p");
        oneUser.src = user.img
        oneUserUsername.innerText = user.username

        allUsers.appendChild(oneUserDiv);
        oneUserDiv.appendChild(oneUser);
        oneUserDiv.appendChild(oneUserUsername);

        oneUser.addEventListener("click", (e) => {
          e.preventDefault();

          if (document.querySelector(".popUpAlbums")) {
            const popUpAlbums2 = document.querySelector(".popUpAlbums");
            popUpAlbums2.remove();
          }
          if (user.albums.length == 0) {
            if (document.querySelector(".popUpAlbums")) {
              const popUpAlbums2 = document.querySelector(".popUpAlbums");
              popUpAlbums2.remove();
            } else { return }
          }

          const popUpAlbums = document.createElement("div");
          popUpAlbums.className = "popUpAlbums";
          posts.parentNode.insertBefore(popUpAlbums, posts);

          const closeText = document.createElement("p");
          closeText.textContent = "Close X";
          popUpAlbums.appendChild(closeText);
          closeText.addEventListener("click", (e) => {
            e.preventDefault();
            const popUpAlbums2 = document.querySelector(".popUpAlbums")
            popUpAlbums2.remove();
          });

          const popUpUserText = document.createElement("h3");
          popUpUserText.textContent = `-- ${user.username} --`;
          popUpAlbums.appendChild(popUpUserText);

          const albumDiv = document.createElement("div");
          const userAlbums = user.albums
          for (const album of userAlbums) {
            const albumImgDiv = document.createElement("div");
            const albumImg = document.createElement("img");
            albumImg.src = album.img
            albumDiv.appendChild(albumImgDiv);
            albumImgDiv.appendChild(albumImg);
            const albumText = document.createElement("p");
            albumText.innerHTML = `${album.album.slice(3)}`
            albumImgDiv.appendChild(albumText);
          }
          popUpAlbums.appendChild(albumDiv)

        });
      }


    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error.message);

    }
  }
  allUsersFunction();

  const posts = document.createElement("div");
  posts.className = "posts";
  comunitySection.appendChild(posts)
  const textDiv = document.createElement("div");
  const textPostsDiv = document.createElement("div");
  textPostsDiv.className = "textPostsDiv";
  comunitySection.appendChild(textPostsDiv);

  const textPosts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1')
        }
      });
      const posts = await response.json();
      const invertPosts = posts.reverse()
      for (const post of invertPosts) {
        const postUserImgDiv = document.createElement('div');
        const postUserImg = document.createElement('img');
        postUserImg.src = post.user.img
        const postUsername = document.createElement('p');
        postUsername.innerText = post.user.username
        const postInfDiv = document.createElement('div');
        const postInfo = document.createElement('p');
        postInfo.innerText = post.text

        textPostsDiv.appendChild(postUserImgDiv);
        postUserImgDiv.appendChild(postUserImg);
        postUserImgDiv.appendChild(postUsername);
        textPostsDiv.appendChild(postInfDiv);
        postInfDiv.appendChild(postInfo);
      }

    } catch (error) {

    }
  };
  textPosts()

  const textFormTitle = document.createElement('h3');
  textFormTitle.innerHTML = "¿Que quieres decir?";
  const textForm = document.createElement("form");
  const textareaElement = document.createElement('textarea');
  textareaElement.rows = 4;
  textareaElement.cols = 50;
  textareaElement.placeholder = 'Escribe aquí...';
  const textButton = document.createElement("button")
  textButton.innerText = "Enviar";

  posts.appendChild(textDiv);
  posts.appendChild(textForm);
  textForm.appendChild(textFormTitle);
  textForm.appendChild(textareaElement);
  textForm.appendChild(textButton);

  textButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1')
        },
        body: JSON.stringify({
          text: e.target.parentElement[0].value,
          user: localStorage.getItem('id').replace(/^"(.*)"$/, '$1')
        })
      })

      if (response.ok) {
        const data = await response.json();
        const response2 = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('id').replace(/^"(.*)"$/, '$1')}/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1')
          },
          body: JSON.stringify({
            posts: data,
          }),
        });
        if (response2.ok) {
          textareaElement.value = "";
          textPostsDiv.innerHTML = "";
          comunity()
        }

      }
    } catch (error) {
      Swal.fire({
        title: "Lo sentimos!",
        text: "No hemos podido enviar el mensaje, vuelta a intentarlo!",
        icon: "error"
      });
    }
  });
};