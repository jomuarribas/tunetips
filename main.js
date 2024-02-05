import { comunity } from './components/comunity/Comunity.js';
import { Footer } from './components/footer/Footer.js';
import { Header } from './components/header/Header';
import { login } from './components/login/login.js'
import { Nav } from './components/nav/Nav';
import './style.css'

export const homePage = () => {
  if (localStorage.getItem('id') === null) {
    return login()
  } else {
    document.body.innerHTML = ''
    Header();
    Nav();
    const main = document.createElement('main')
    main.id = 'main'
    document.body.appendChild(main)
    comunity();
    Footer();
  }
};

homePage()