import Pokemon from './pokemon.js';
import { pokemons } from './pokemons.js';
import { random } from './utils.js';

class Game {
    constructor() {
        this.$control = document.querySelector('.control');
        
        this.player1 = new Pokemon({
            ...pokemons[0],
            selectors: 'player1'
        });

        this.enemyQueue = [...pokemons].filter(item => item.name !== this.player1.name);
        
        this.player2 = null;
        this.start();
    }

    start = () => {
        this.generateNextEnemy();
    }

    generateNextEnemy = () => {

        if (this.enemyQueue.length === 0) {
            this.endGame(true); 
            return;
        }

        const randomIndex = random(0, this.enemyQueue.length - 1);
        const enemyData = this.enemyQueue[randomIndex];

        this.enemyQueue.splice(randomIndex, 1);

        this.player2 = new Pokemon({
            ...enemyData,
            selectors: 'player2'
        });

        console.log(`Новий ворог: ${this.player2.name}. Залишилось ворогів: ${this.enemyQueue.length}`);
        this.renderAttacks();
    }

    renderAttacks = () => {
        this.$control.innerHTML = '';

        this.player1.attacks.forEach(attack => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn.innerText = `${attack.name} (${attack.maxCount})`;

            let clicks = attack.maxCount;

            $btn.addEventListener('click', () => {
                if (clicks > 0) {
                    clicks--;
                    $btn.innerText = `${attack.name} (${clicks})`;
                    
                    this.player2.changeHP(random(attack.minDamage, attack.maxDamage), () => {
                        this.checkGameState();
                    });

                    if (this.player2.hp.current > 0) {
                        const enemyAttack = this.player2.attacks[0];
                        this.player1.changeHP(random(enemyAttack.minDamage, enemyAttack.maxDamage), () => {
                            this.checkGameState();
                        });
                    }
                }
                if (clicks === 0) $btn.disabled = true;
            });

            this.$control.appendChild($btn);
        });
    }

    checkGameState = () => {

        if (this.player1.hp.current <= 0) {
            this.endGame(false);
            return;
        }

        if (this.player2.hp.current <= 0) {
            console.log(`${this.player2.name} подоланий!`);
            
            this.healPlayer(100);

            this.generateNextEnemy();
        }
    }

    healPlayer = (amount) => {
        this.player1.hp.current += amount;
        if (this.player1.hp.current > this.player1.hp.total) {
            this.player1.hp.current = this.player1.hp.total;
        }
        this.player1.renderHP();
    }

endGame = (isWin) => {

    this.$control.innerHTML = '';
    
    const $container = document.createElement('div');
    $container.classList.add('finish-container');

    const $msg = document.createElement('div');
    $msg.classList.add('finish-text');
    $msg.innerText = isWin 
        ? 'ВІТАЄМО! Ви перемогли всіх майстрів покемонів!' 
        : 'Гру закінчено! Ваш покемон програв.';

    const $resetBtn = document.createElement('button');
    $resetBtn.classList.add('reset-button');
    $resetBtn.innerText = 'Грати знову';
    $resetBtn.onclick = () => location.reload();

    $container.appendChild($msg);
    $container.appendChild($resetBtn);
    this.$control.appendChild($container);
}
}

const game = new Game();