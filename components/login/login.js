import { register } from '../register/register';
import Swal from 'sweetalert2'
import './login.css'
import { loaderOff, loaderOn } from '../loader/loader';
import { homePage } from '../../main';

export const login = () => {
  document.body.innerHTML = "";

  const loginDiv = document.createElement('section');
  loginDiv.className = 'login';
  const formDiv = document.createElement('div');
  formDiv.className = 'loginForm';
  const userForm = document.createElement('form');
  userForm.id = 'userForm';
  const logoDiv = document.createElement('div');
  logoDiv.className = 'logoDiv';
  const logo = document.createElement('img');
  logo.src = '/assets/images/logo_tunetips.webp';

  document.body.appendChild(loginDiv);
  loginDiv.appendChild(logoDiv);
  logoDiv.appendChild(logo);
  loginDiv.appendChild(formDiv);
  formDiv.appendChild(userForm);

  const createInput = (labelText, inputType, inputName, isRequired = false) => {
    const label = document.createElement('label');
    label.textContent = labelText;
    userForm.appendChild(label);

    const input = document.createElement('input');
    input.type = inputType;
    input.name = inputName;
    if (isRequired) {
      input.required = true;
    }
    userForm.appendChild(input);
  }

  const welcome = document.createElement('h2');
  welcome.innerHTML = '¡Bienvenid@!'
  userForm.appendChild(welcome);

  createInput('Nombre de usuario:', 'text', 'username', true);
  createInput('Contraseña:', 'password', 'password', true);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Entrar';
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      loaderOn()
      const formData = new FormData(userForm);
      const jsonData = Object.fromEntries(Array.from(formData.entries()));
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        loaderOff();
        return response.json().then(data => {
          Swal.fire({
            title: "Lo sentimos!",
            text: data.error,
            icon: "error"
          });
          throw new Error(errorMessage);
        });
      } else {
        loaderOff()
        const data = await response.json();
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('id', JSON.stringify(data.user._id));
        homePage()
      };

    } catch (error) {
      console.error('Error al entrar:', error.message);
      loaderOff()
      Swal.fire({
        title: "Lo sentimos!",
        text: "Tu usuario no ha podido loguearse. Inténtalo de nuevo!",
        icon: "error"
      });
    }
  });

  userForm.appendChild(submitBtn);

  const noCount = document.createElement("p");
  noCount.innerHTML = '¿No tienes cuenta? Regístrate';
  userForm.appendChild(noCount);

  noCount.addEventListener("click", (e) => {
    e.preventDefault();
    register();
  });

};