// utils.js

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const countBtn = (maxCount, $btn) => {
    let count = maxCount;
    const originalText = $btn.innerText.trim();
    $btn.innerText = `${originalText} (${count})`;
    
    return function() {
        if (count > 0) {
            count--;
            $btn.innerText = `${originalText} (${count})`;

            if (count === 0) {
                $btn.disabled = true;
            }
            return true;
        }
        return false;
    }
};