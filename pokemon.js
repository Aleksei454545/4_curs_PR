class Pokemon {
  constructor({ name, maxHP, hpId, barId, logger, onDead }) {
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = maxHP;

    this.elHP = document.getElementById(hpId);
    this.elBar = document.getElementById(barId);

    this.logger = logger;   
    this.onDead = onDead;   
  }

  get isAlive() {
    return this.currentHP > 0;
  }

  renderHPLife() {
    if (this.elHP) {
      this.elHP.innerText = `${this.currentHP} / ${this.maxHP}`;
    }
  }

  renderProgressbarHP() {
    if (!this.elBar) return;

    const percent = (this.currentHP / this.maxHP) * 100;
    this.elBar.style.width = percent + '%';

    if (percent > 60) this.elBar.className = 'health';
    else if (percent > 20) this.elBar.className = 'health low';
    else this.elBar.className = 'health critical';
  }

  render() {
    this.renderHPLife();
    this.renderProgressbarHP();
  }

  takeDamage(count, attackerName) {
    const prevHP = this.currentHP;

    if (this.currentHP <= count) {
      this.currentHP = 0;

      if (this.logger) {
        this.logger({
          attacker: attackerName,
          target: this.name,
          damage: prevHP,
          left: 0,
          total: this.maxHP,
        });
      }

      this.render();
      alert(`${this.name} повержен!`);

      if (this.onDead) {
        this.onDead(this);
      }
    } else {
      this.currentHP -= count;

      if (this.logger) {
        this.logger({
          attacker: attackerName,
          target: this.name,
          damage: count,
          left: this.currentHP,
          total: this.maxHP,
        });
      }

      this.render();
    }
  }
}
