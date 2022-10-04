export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    this.checkDistance = this.checkDistance.bind(this);
  }

  // Pega a distância de cada item em relação ao topo site
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;

      return {
        element: section,
        offset: Math.floor(offset) - this.windowMetade,
      };
    });
  }

  // Verifica a distância em cada objeto em relação ao scroll do site
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

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  // Remove o event de Scroll
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
