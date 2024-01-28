import { homePage } from '../../main';
import { getUser } from '../apiService/apiService';
import { loaderOff, loaderOn } from '../loader/loader';
import { login } from '../login/login';
import { User } from '../user/User';
import './Header.css'
import Swal from 'sweetalert2'

export const Header = () => {

  const header = document.createElement('header');
  header.id = 'header';
  document.body.appendChild(header);
  const logoDiv = document.createElement('div');
  logoDiv.className = 'logoHeader';
  const logo = document.createElement('img');
  logo.src = "public/assets/images/logo_tunetips.webp";

  header.appendChild(logoDiv);
  logoDiv.appendChild(logo);

  const infoDiv = document.createElement('div');
  infoDiv.className = "infoDiv";
  header.appendChild(infoDiv);
  const fullName = document.createElement('h3');
  infoDiv.appendChild(fullName);
  const userConfig = document.createElement('span');
  userConfig.className = "material-symbols-outlined"
  userConfig.textContent = "person";
  infoDiv.appendChild(userConfig);
  const logOut = document.createElement('span');
  logOut.className = "material-symbols-outlined"
  logOut.textContent = "logout";
  infoDiv.appendChild(logOut);

  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    homePage();
  });

  userConfig.addEventListener('click', (e) => {
    e.preventDefault();
    User()
  });

  async function userInit() {
    try {
      loaderOn()
      const user = await getUser();
      fullName.innerHTML = `${user.name} [${user.username}]`
      loaderOff();
    } catch (error) {
      loaderOff();
      login();
      Swal.fire({
        title: "Lo sentimos!",
        text: "Se ha cerrado la sesión. vuelve a loguearte!",
        icon: "error"
      });

    }
  }
  userInit();
};