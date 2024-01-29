import { homePage } from '../../main';
import { getUser } from '../apiService/apiService';
import { loaderOff, loaderOn } from '../loader/loader';
import Swal from 'sweetalert2'
import './User.css'
import { login } from '../login/login';

export const User = () => {

  const main = document.getElementById('main');
  main.innerHTML = '';
  const user = document.createElement('section');
  user.className = 'user';

  const userTitleDiv = document.createElement('div');
  userTitleDiv.className = 'userTitleDiv';
  const userTitle = document.createElement('h2');
  userTitle.textContent = "TUS DATOS"

  const userImgDiv = document.createElement('div');
  userImgDiv.className = 'userImgDiv';
  const userImg = document.createElement('img');

  const userInfoDiv = document.createElement('div');
  userInfoDiv.className = "userInfoDiv";

  const userId = document.createElement('p');
  const userName = document.createElement('p');
  const fullName = document.createElement('p');
  const email = document.createElement('p');
  const rol = document.createElement('p');
  const logOut = document.createElement('button');
  logOut.textContent = 'Cerrar sesión';
  const deleteUser = document.createElement('p');
  deleteUser.textContent = 'Eliminar usuario';
  deleteUser.className = 'deleteUser';

  async function userInit() {
    try {
      const user = await getUser();
      userImg.src = user.img
      userId.innerHTML = `ID: <span class="userInfo">${user._id}</span>`
      userName.innerHTML = `Nombre de usuario: <span class="userInfo">${user.username}</span>`
      fullName.innerHTML = `Nombre: <span class="userInfo">${user.name} ${user.surname}</span>`
      email.innerHTML = `email: <span class="userInfo">${user.email}</span>`
      rol.innerHTML = `Rol: <span class="userInfo">${user.rol}</span>`

    } catch (error) {
    }
  }
  userInit()


  main.appendChild(user);
  user.appendChild(userTitleDiv);
  userTitleDiv.appendChild(userTitle);
  user.appendChild(userImgDiv);
  userImgDiv.appendChild(userImg);

  user.appendChild(userInfoDiv);
  userInfoDiv.appendChild(userId);
  userInfoDiv.appendChild(userName);
  userInfoDiv.appendChild(fullName);
  userInfoDiv.appendChild(email);
  userInfoDiv.appendChild(rol);
  userInfoDiv.appendChild(logOut);
  userInfoDiv.appendChild(deleteUser);

  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    homePage();
  });

  deleteUser.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      loaderOn();
      const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('id').replace(/^"(.*)"$/, '$1')}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1'),
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        loaderOff()
        Swal.fire({
          title: "Lo sentimos!",
          text: "Tu usuario no ha podido eliminarse. Inténtalo de nuevo!",
          icon: "error"
        });
        throw new Error(`Error al registrar usuario: ${response.status} - ${response.statusText}`);
      }

      if (response.ok) {
        loaderOff();
        login();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tu usuario ha sido eliminado",
          showConfirmButton: false,
          timer: 1500
        });
      };

    } catch (error) {
      loaderOff();
      console.error('Error al eliminar el usuario:', error.message);
      Swal.fire({
        title: "Lo sentimos!",
        text: "Tu usuario no ha podido eliminarse. Inténtalo de nuevo!",
        icon: "error"
      });
    }
  });

  const userForm2 = document.createElement('form');
  userForm2.id = 'userForm2';
  const changeImgText = document.createElement('p');
  changeImgText.textContent = 'Cambiar imagen de perfil';
  const changeImg = document.createElement('input');
  changeImg.type = "file";
  changeImg.name = 'img';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Cambiar';

  userImgDiv.appendChild(userForm2);
  userForm2.appendChild(changeImgText);
  userForm2.appendChild(changeImg);
  userForm2.appendChild(submitBtn);

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      loaderOn();
      const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('id').replace(/^"(.*)"$/, '$1')}`, {
        method: 'PUT',
        body: new FormData(e.target.form),
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token').replace(/^"(.*)"$/, '$1'),
        }
      });

      if (!response.ok) {
        loaderOff()
        Swal.fire({
          title: "Lo sentimos!",
          text: "La imagen no ha podido cambiarse. Inténtalo de nuevo!",
          icon: "error"
        });
        throw new Error(`Error al cambiar la imagen: ${response.status} - ${response.statusText}`);
      }

      if (response.ok) {
        const data = await response.json();
        loaderOff();
        User()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Imagen cambiada",
          showConfirmButton: false,
          timer: 1500
        });
      };

    } catch (error) {
      loaderOff();
      console.error('Error al cambiar la imagen:', error.message);
      Swal.fire({
        title: "Lo sentimos!",
        text: "La imagen no ha podido cambiarse. Inténtalo de nuevo!",
        icon: "error"
      });
    }
  });







};