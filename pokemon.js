
export default class Pokemon {
    constructor({ name, hp, type, selectors, attacks = [], img }) {
        this.name = name;
        this.type = type;
        this.img = img;
        
        this.hp = {
            current: hp,
            total: hp,
        };
        this.attacks = attacks; 
        this.selectors = selectors;

        this.elHP = document.getElementById(`health-${selectors}`);
        this.elProgress = document.getElementById(`progressbar-${selectors}`);
        this.elName = document.getElementById(`name-${selectors}`);
        this.elImg = document.getElementById(`img-${selectors}`); 

        this.renderName();
        this.renderHP();
        this.renderImg(); 
    }

    get isAlive() {
        return this.hp.current > 0;
    }

    renderHP = () => {
        if (!this.elProgress || !this.elHP) return;

        const percent = (this.hp.current / this.hp.total) * 100;
        this.elProgress.style.width = `${percent}%`;
        this.elHP.innerText = `${this.hp.current} / ${this.hp.total}`;
        
        this.elProgress.classList.remove('low', 'critical');
        if (percent <= 60 && percent > 20) {
            this.elProgress.classList.add('low');
        } else if (percent <= 20) {
            this.elProgress.classList.add('critical');
        }
    }

    renderImg = () => {
        if (this.elImg && this.img) {
            this.elImg.src = this.img; 
        }
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;
        if (this.hp.current < 0) {
            this.hp.current = 0;
        }

        this.renderHP();
        if (cb) cb(count); 
    }
    
    renderName = () => {
        if (this.elName) this.elName.innerText = this.name;
    }
}