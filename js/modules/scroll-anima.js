import { debounce } from './debounce.js';

export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    // Coloca a função dentro de um debounce e
    // faz um bind de si mesma mudando o escopo de this
    this.checkDistance = debounce(this.checkDistance.bind(this), 200);
  }

  // [3] - Verifica a distância em cada objeto em relação ao scroll do site
  checkDistance() {
    this.distance.forEach((section) => {
      if (window.scrollY > section.offset) {
        section.element.classList.add('ativo');
      }
    });

    if (window.scrollY > this.distance[this.distance.length - 1].offset) {
      this.stop();
    }
  }

  // [2] - Pega a distância de cada item em relação ao topo site
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;

      return {
        element: section,
        offset: Math.floor(offset) - this.windowMetade,
      };
    });
  }

  // [1] - Inicia o scroll-anima
  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  // [4] - Remove o event de Scroll
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
