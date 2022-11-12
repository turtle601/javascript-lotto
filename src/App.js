const { Console } = require('@woowacourse/mission-utils');

const Lotto = require('./Lotto');

const Bonus = require('./domain/Bonus');
const LottoStore = require('./domain/LottoStore');
const LottoAdjustment = require('./domain/LottoAdjustment');
const LottoDrawFactory = require('./domain/LottoDrawFactory');

const { LOTTO_QUESTION } = require('../utils/constants');
const { validateLottoRange } = require('../utils/method');

class App {
  #lottoStore;

  #lotto;

  #bonus;

  constructor() {
    this.#lottoStore = null;
    this.#lotto = null;
    this.#bonus = null;
  }

  #buyLotto() {
    Console.readLine(LOTTO_QUESTION.money, input => {
      this.#lottoStore = new LottoStore(input);

      this.#drawLotto();
    });
  }

  #drawLotto() {
    Console.readLine(LOTTO_QUESTION.lotto, input => {
      const inputNumArr = input
        .split(',')
        .map(value => validateLottoRange(value));

      this.#lotto = new Lotto(inputNumArr);

      this.#drawBonus();
    });
  }

  #drawBonus() {
    Console.readLine(LOTTO_QUESTION.bonus, input => {
      this.#bonus = new Bonus(input);

      const lottoPayment = new LottoAdjustment(
        new LottoDrawFactory({
          lotto: this.#lotto,
          bonus: this.#bonus,
          lottoStore: this.#lottoStore,
        }),
      );

      lottoPayment.print();
    });
  }

  play() {
    this.#buyLotto();
  }
}

module.exports = App;
