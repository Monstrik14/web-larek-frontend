import './scss/styles.scss';

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

// функция осздания карточки 

function createCard(template: HTMLTemplateElement, name: string) {
  const cardElement = template.content.querySelector('.card-preview').cloneNode(true) as HTMLElement;
  return cardElement 
}