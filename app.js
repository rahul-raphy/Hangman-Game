let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabet = document.getElementById('alphabet');
const passwordBoard = [
  'A picture is worth a thousand words',
  'Curiosity killed the cat',
  'Dont put all your eggs in one basket',
  'Every man is the architect of his own fortune',
  'Fortune favors the bold',
  'If the shoe fits wear it',
  'Laughter is the best medicine',
  'Necessity is the mother of invention',
  'Practice makes perfect',
  'A bad workman always blames his tools',
  'A bird in hand is worth two in the bush',
  'An apple a day keeps the doctor away',
  'Better to wear out than to rust out',
  'Dont judge a book by its cover',
  'Good things come to those who wait.',
  'If you cant beat them, join them',
  'Its no use crying over spilt milk',
  'Actions speak louder than words',
  'A penny saved is a penny earned',
  'All fair in love and war',
  'Beggars cant be choosers',
  'Better late than never',
  'Dont count your chickens before they hatch',
  'Every cloud has a silver lining',
  'Honesty is the best policy',
  'If it aint broke dont fix it',
  'Its a piece of cake',
  'Kill two birds with one stone',
  'Let sleeping dogs lie',
  'Rome wasnt built in a day',
  'The early bird catches the worm',
  'There is no smoke without fire',
  'Two wrongs dont make a right',
  'You reap what you sow'
];
const passwordDiv = document.querySelector('#board');
const imgDiv = document.querySelector('#hangin-dude');
const random = Math.floor(Math.random() * passwordBoard.length);
const password = passwordBoard[random];
const yes = new Audio('yes.wav');
const no = new Audio('no.wav');
const win = new Audio('nice-work.wav');
const lose = new Audio('oh-my-god-1.wav');
let fail = 1;
let countDown;

const start = function () {
  letters.split('').forEach(letter => {
    const html = `<div class="letter">${letter}</div>`;
    alphabet.insertAdjacentHTML('beforeend', html);
  });
  showPassword();
  showHangman(fail);
};
window.onload = start;

const passwordDashed = password.split('').map(letter => {
  if (letter === ' ') return ' ';
  else if (letter === '???') return '???';
  else if (letter === ',') return ',';
  else return '_';
});
const showPassword = function () {
  passwordDiv.innerHTML = passwordDashed.join('');
};
const showHangman = function (nr) {
  imgDiv.innerHTML = `<img src="img/${nr}.svg" alt="" />`;
};

const checkForLetter = function (e) {
  if (e.target.classList.contains('letter')) {
    if (password.toUpperCase().split('').includes(e.target.textContent)) {
      yes.play();
      password
        .toUpperCase()
        .split('')
        .forEach((letter, i, arr) => {
          if (letter === e.target.textContent) {
            passwordDashed[i] = letter;
            showPassword();
          }
        });

      deactivateLetter(true, e.target);
    } else {
      no.play();
      fail++;
      showHangman(fail);
      deactivateLetter(false, e.target);
    }
    if (fail == 6) {
      finish(false);
    }
    if (password.toUpperCase() === passwordDashed.join('')) {
      finish(true);
    }
  }
};
alphabet.addEventListener('click', checkForLetter);
const deactivateLetter = function (hit, letter, audio) {
  letter.style.border = hit
    ? '1px solid rgb(50, 177, 149)'
    : '1px solid rgba(255, 0, 0, 0.338)';
  letter.style.backgroundColor = hit
    ? 'rgb(50, 177, 149)'
    : 'rgba(255, 0, 0, 0.338)';
  letter.style.color = 'white';
  letter.style.cursor = 'default';
};

const finish = function (succes) {
  if (succes) {
    alphabet.innerHTML = `<h1>NICE WORK!</h1><div class='btn'>PLAY AGAIN</div>`;
    win.play();
    clearInterval(countDown);
  } else {
    alphabet.innerHTML = `<h1>YOU LOST!</h1><div class='btn'>TRY AGAIN</div>`;
    lose.play();
    clearInterval(countDown);
  }
  document
    .querySelector('.btn')
    .addEventListener('click', () => location.reload());
};

const timer = function () {
  const timer = document.querySelector('#timer');
  let time = new Date(60000);
  const options = {
    minute: '2-digit',
    second: '2-digit',
  };
  const tick = function () {
    time -= 1000;
    timer.textContent = Intl.DateTimeFormat('en-US', options).format(time);
    if (time == 0) {
      finish(false);
      clearInterval(countDown);
    }
  };
  tick();
  countDown = setInterval(tick, 1000);
  return countDown;
};
timer();
