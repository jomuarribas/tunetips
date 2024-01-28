import { homePage } from '../../main';
import { comunity } from '../comunity/Comunity';
import { discShelf } from '../discShelf/Discshelf';
import { Explore } from '../explore/Explore';
import './Nav.css'

export const Nav = () => {
  const nav = document.createElement('nav');
  nav.id = 'nav';
  document.body.appendChild(nav);
  const explore = document.createElement('a');
  explore.innerHTML = 'Explorar';
  const miEstanteria = document.createElement('a');
  miEstanteria.innerHTML = 'Mi estantería';
  const comunityLink = document.createElement('a');
  comunityLink.innerHTML = 'Comunidad';


  nav.appendChild(explore);
  nav.appendChild(comunityLink);
  nav.appendChild(miEstanteria);

  explore.addEventListener('click', (e) => {
    e.preventDefault();
    Explore();
  });

  miEstanteria.addEventListener('click', (e) => {
    e.preventDefault();
    discShelf()
  });

  comunityLink.addEventListener('click', (e) => {
    e.preventDefault();
    comunity();
  });

};