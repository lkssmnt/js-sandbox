const testBtn = document.querySelector('.test-btn');

const images = document.querySelector('.images');
const goal = document.querySelector('.goal-div');

testBtn.addEventListener('click', e => {
    goal.appendChild(images);
})
