const { Console } = require('@woowacourse/mission-utils');

const Component = require('../core/Component');

class LottoPayment extends Component {
  constructor({ count, lottos }) {
    super();

    this.state = {
      count,
      lottos,
    };
  }

  print() {
    const { count, lottos } = this.state;

    Console.print(`${count}개를 구매했습니다.`);
    [...lottos].forEach(lotto => {
      const result = JSON.stringify(lotto.sort((x, y) => x - y)).replace(
        /,/g,
        ', ',
      );
      Console.print(result);
    });
  }
}

module.exports = LottoPayment;