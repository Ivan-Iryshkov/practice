export default class Card {
  _open = false
  _success = false

  constructor(container, number, actionFn) {
    this.card = document.createElement('div');
    this.cardNumber = document.createElement('div');
    this.card.classList.add('card')
    this.cardNumber.classList.add('card__number');
    this.cardNumber.textContent = number;
    this.number = number;
    this.card.append(this.cardNumber);

    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true;
        actionFn(this);
      }
    })
    container.append(this.card);
  }

  set open(value) {
    this._open = value;
    if (value == true) {
      this.card.classList.add('open')
      this.cardNumber.classList.add('open')
    } else {
      this.card.classList.remove('open')
      this.cardNumber.classList.remove('open')
    }
  }
  get open() {
   return this._open
  }

  set success(value) {
    this._success = value
    if (value == true) {
      this.card.classList.add('success')
      this.cardNumber.classList.add('success')
     } else {
       this.card.classList.remove('success')
       this.cardNumber.classList.remove('success')
     }
  }
  get success () {
    return this._success
  }
}

