import './register.css'
import Swal from 'sweetalert2'
import { login } from '../login/login.js';
import { loaderOff, loaderOn } from '../loader/loader';

export const register = () => {
  document.body.innerHTML = "";

  const register = document.createElement('section');
  register.className = 'register';
  const formDiv = document.createElement('div');
  formDiv.className = 'registerForm';
  const userForm = document.createElement('form');
  userForm.id = 'userForm';
  const logoDiv = document.createElement('div');
  logoDiv.className = 'logoDiv';
  const logo = document.createElement('img');
  logo.src = '/assets/images/logo_tunetips.webp';
  register.appendChild(logoDiv);
  logoDiv.appendChild(logo);

  document.body.appendChild(register);
  register.appendChild(formDiv);
  formDiv.appendChild(userForm);

  const createInput = (labelText, inputType, inputName, isRequired = false, minlength = 3) => {
    const label = document.createElement('label');
    label.textContent = labelText;
    userForm.appendChild(label);

    const input = document.createElement('input');
    input.type = inputType;
    input.name = inputName;

    if (inputType === 'text' || inputType === 'password') {
      input.minLength = minlength
    }
    if (isRequired) {
      input.required = true;
    }
    userForm.appendChild(input);
  }

  createInput('Nombre de usuario:', 'text', 'username', true);
  createInput('Nombre:', 'text', 'name', true);
  createInput('Apellidos:', 'text', 'surname');
  createInput('Correo electrónico:', 'email', 'email', true);
  createInput('Contraseña:', 'password', 'password', true, 8);
  createInput('Imagen de perfil:', 'file', 'img');

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Registrar';
  userForm.appendChild(submitBtn);

  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      loaderOn();
      const formData = new FormData(userForm);
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        body: formData,
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
      }

      if (response.ok) {
        const data = await response.json();
        loaderOff();
        login();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tu usuario ha sido registado",
          showConfirmButton: false,
          timer: 2000
        });
      };

    } catch (error) {
      loaderOff();
      Swal.fire({
        title: "Lo sentimos!",
        text: `Error al registrar usuario`,
        icon: "error"
      });
    }
  });

  const returnLogin = document.createElement("p");
  returnLogin.innerHTML = "Volver al login"
  userForm.appendChild(returnLogin);

  returnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });
}