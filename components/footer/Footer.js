import './Footer.css'

export const Footer = () => {
  const footer = document.createElement('footer');
  footer.id = 'footer'
  document.body.appendChild(footer);

  const textFooter = document.createElement('p');
  textFooter.innerHTML = '© TuneTips by Jonathan Muñoz Arribas';
  footer.appendChild(textFooter);

};