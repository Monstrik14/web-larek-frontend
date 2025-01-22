import './scss/styles.scss';

interface IPage {
  catalog: HTMLElement[];
}
class Page implements IPage {
  protected _catalog: HTMLElement;

  constructor(protected container: HTMLElement){
    this._catalog = this.container.querySelector('.gallery')
  }
}

class ProductView {
  constructor () {
  }

  set title(value:string) {
    this.setText(this.container, value)
  }
}

// api
 const product = new ProductItem(добавить такой класс)
Api. метод отображения товара (){
  .then(res => {
    product.(метод)(res)
  })
  .catch (err = > {
    console.error(err)
  })
}
