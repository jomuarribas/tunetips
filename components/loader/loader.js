import './loader.css'

const loader = document.createElement('div');

export const loaderOn = () => {
  loader.className = 'loader';
  document.body.appendChild(loader);
}

export const loaderOff = () => {
  loader.className = 'loaderOff';
}